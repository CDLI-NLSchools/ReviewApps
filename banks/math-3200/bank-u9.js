// Math 3200 Unit 9 Permutations, Combinations, and the Binomial Theorem question bank
// CRMARKS: u9-binomial-expand=2
// CRMARKS: u9-counting-organizers=1
// CRMARKS: u9-factorial-notation=1
// CRMARKS: u9-fcp-apply=1
// CRMARKS: u9-fcp-meal-mc=1
// CRMARKS: u9-identical-elements=2
// CRMARKS: u9-not-adjacent-cr=3
// CRMARKS: u9-pascal-next-row=1
// CRMARKS: u9-pathways=2
// CRMARKS: u9-pathways-context=3
// CRMARKS: u9-perm-basic=2
// CRMARKS: u9-perm-or-comb=2
// CRMARKS: u9-perm-solve=2
// CRMARKS: u9-two-group-cr=3
// CRMARKS: u9-word-arrange-mc=1
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: u9-why-multiply=3
// CRMARKS: u9-why-n-ge-r=3
// BIMODAL: u9-perm-solve=a
// BIMODAL: u9-perm-or-comb=a
// BIMODAL: u9-binomial-expand=b
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: u9-why-multiply=b
// BIMODAL: u9-why-n-ge-r=b
/* ================= Unit 9: Permutations, Combinations, and the Binomial Theorem ================= */
/* ================= Unit 9: Permutations, Combinations, and the Binomial Theorem =================
   Tranche 2, final scope. Indicators MA3200.3.14 to 3.19 and MA3200.9.1 to 9.15.
   All stems, contexts, names and values are original. Helpers are prefixed u9;
   entries register through E(...). Every LaTeX fragment produced by a helper is
   only ever interpolated inside \(...\) or \[...\] delimiters. */

/* ---------- u9 helpers ---------- */
function u9fact(n){ var f=1,i; for(i=2;i<=n;i++) f*=i; return f; }
function u9perm(n,r){ var p=1,i; for(i=0;i<r;i++) p*=(n-i); return p; }
function u9comb(n,r){ if(r<0||r>n) return 0; if(r>n-r) r=n-r; var c=1,i; for(i=0;i<r;i++) c=c*(n-i)/(i+1); return c; }
function u9row(n){ var r=[1],i,j,nr; for(i=1;i<=n;i++){ nr=[1]; for(j=1;j<i;j++) nr.push(r[j-1]+r[j]); nr.push(1); r=nr; } return r; }
function u9big(n){ return String(n).replace(/\B(?=(\d{3})+(?!\d))/g,","); }
function u9binS(n,r){ return "\\binom{"+n+"}{"+r+"}"; }   /* raw fragment: delimiters at the call site */
function u9permS(n,r){ return "_"+n+"P_"+r; }            /* raw fragment: delimiters at the call site */
function u9opts(key,cands){ /* 3 distractors distinct from key and each other, or null */
  var out=[], seen={}, i, s; seen[String(key)]=1;
  for(i=0;i<cands.length;i++){ s=String(cands[i]); if(!seen[s]){ seen[s]=1; out.push(s); if(out.length===3) return out; } }
  return null;
}
function u9termBody(c,xe,yname,ye){ /* one expansion term, sign excluded, coefficient folded in */
  var a=Math.abs(c), s="";
  if(xe===0&&ye===0) return ""+a;
  if(a!==1) s+=""+a;
  if(xe>0) s+="x"+(xe>1?"^"+xe:"");
  if(ye>0) s+=yname+(ye>1?"^"+ye:"");
  return s;
}
function u9joinTerms(terms){ /* terms: [{c,xe,yname,ye}] joined with signs */
  var s="",i,t;
  for(i=0;i<terms.length;i++){ t=terms[i];
    if(i===0) s=(t.c<0?"-":"")+u9termBody(t.c,t.xe,t.yname,t.ye);
    else s+=(t.c<0?" - ":" + ")+u9termBody(t.c,t.xe,t.yname,t.ye);
  }
  return s;
}
function u9specTerms(sp){ /* sp: {A,B,yname,s,n}; term k uses y (or the constant) k times */
  var terms=[],k,c;
  for(k=0;k<=sp.n;k++){
    c=u9comb(sp.n,k)*Math.pow(sp.A,sp.n-k)*Math.pow(sp.B,k)*Math.pow(sp.s,k);
    terms.push({c:c, xe:sp.n-k, yname:sp.yname, ye:(sp.yname?k:0)});
  }
  return terms;
}
function u9specStr(sp){
  var xs=(sp.A===1?"x":sp.A+"x"), ys;
  if(sp.yname) ys=(sp.B===1?"y":sp.B+"y"); else ys=""+sp.B;
  return "("+xs+(sp.s<0?" - ":" + ")+ys+")^"+sp.n;
}
function u9pickSpec(allowMinus){
  var forms=[
    {A:1,B:1,yname:"y"}, {A:1,B:2,yname:"y"}, {A:1,B:3,yname:"y"},
    {A:2,B:1,yname:"y"}, {A:3,B:1,yname:"y"}, {A:2,B:2,yname:"y"},
    {A:1,B:1,yname:null}, {A:1,B:2,yname:null}, {A:1,B:3,yname:null},
    {A:2,B:1,yname:null}, {A:2,B:2,yname:null}, {A:3,B:2,yname:null}
  ];
  var sp=pick(forms), n=pick([2,3,3,4]);
  if(n===4&&(sp.A>2||sp.B>2)) n=3;
  sp={A:sp.A,B:sp.B,yname:sp.yname,s:(allowMinus&&Math.random()<0.4?-1:1),n:n};
  return sp;
}

/* ---------- 3.15: the next row of Pascal's triangle (L1) ---------- */
E("u9-pascal-next-row",9,["3.15"],1,"gen",function(){
  var mode=pick(["miss","full","kth","miss","kth"]);
  var n=ri(3,8), row=u9row(n), next=u9row(n+1);
  var rowS=row.join(", "), nextS=next.join(", ");
  var rule="Each entry of a new row is the sum of the two entries above it in the current row, and every row begins and ends with 1.";
  if(mode==="miss"){
    var j=ri(1,n), shown=next.slice(); shown[j]="?";
    return numq("One row of Pascal's triangle is "+rowS+". The row that follows it begins "+shown.join(", ")+". What is the missing entry?",
      next[j],0.001,
      rule+" The missing entry sits above "+row[j-1]+" and "+row[j]+", so it is \\("+row[j-1]+" + "+row[j]+" = "+next[j]+"\\).",
      {n:n,j:j,mode:mode});
  }
  if(mode==="kth"){
    var j2=ri(2,n), pos=["second","third","fourth","fifth","sixth","seventh","eighth","ninth"][j2-1];
    return numq("One row of Pascal's triangle is "+rowS+". What is the "+pos+" entry of the row that follows it?",
      next[j2],0.001,
      rule+" The next row is "+nextS+", and its "+pos+" entry is <b>"+next[j2]+"</b>.",
      {n:n,j:j2,mode:mode});
  }
  var bad1=next.slice(); var jj=ri(1,n); bad1[jj]=bad1[jj]+pick([1,2]);
  var bad2=u9row(n+2);
  var bad3=next.map(function(v,i){ return (i===0||i===next.length-1)?1:v*2; });
  var dis=u9opts(nextS,[bad1.join(", "),bad2.join(", "),bad3.join(", ")]);
  return mcq("One row of Pascal's triangle is "+rowS+". Which row comes next?",
    nextS,dis,
    rule+" Building the new row from "+rowS+" gives <b>"+nextS+"</b>.",
    {n:n,mode:mode});
});

/* ---------- 3.14, 3.16, 3.17: patterns in (x + y)^n, coefficients as combinations (L2) ---------- */
E("u9-patterns-coefficients",9,["3.14","3.16","3.17"],2,"gen",function(){
  var mode=pick(["coef","coef","pos","count","expsum","xpat","why"]);
  if(mode==="coef"){
    var n=ri(4,8), b=ri(1,n-1), a=n-b, v=u9comb(n,b);
    return numq("What is the coefficient of \\(x^{"+a+"} y^{"+b+"}\\) in the expansion of \\((x + y)^{"+n+"}\\)?",
      v,0.001,
      "The coefficients in the expansion of \\((x + y)^{"+n+"}\\) are the entries of row "+n+" of Pascal's triangle, the "+(n+1)+(n===3?"rd":n===1?"st":n===2?"nd":"th")+" row when the single 1 at the top is counted as the first row. The term \\(x^{"+a+"} y^{"+b+"}\\) has coefficient \\("+u9binS(n,b)+" = "+v+"\\).",
      {n:n,b:b,mode:mode});
  }
  if(mode==="pos"){
    var n2=ri(4,7), k=ri(2,n2), v2=u9comb(n2,k-1);
    return numq("What is the coefficient of the "+["second","third","fourth","fifth","sixth","seventh"][k-2]+" term in the expansion of \\((x + y)^{"+n2+"}\\)?",
      v2,0.001,
      "Term number "+k+" uses \\(y\\) exactly "+(k-1)+" time"+(k===2?"":"s")+", so its coefficient is \\("+u9binS(n2,k-1)+" = "+v2+"\\), read from row "+n2+" of Pascal's triangle.",
      {n:n2,k:k,mode:mode});
  }
  if(mode==="count"){
    var n3=ri(3,11);
    return numq("How many terms are in the expansion of \\((x + y)^{"+n3+"}\\)?",
      n3+1,0.001,
      "The exponent of \\(x\\) runs from "+n3+" down to 0, giving one term for each value: \\("+(n3+1)+"\\) terms in all, one more than the power.",
      {n:n3,mode:mode});
  }
  if(mode==="expsum"){
    var n4=ri(3,9);
    var dis=u9opts(""+n4,[""+(n4+1),""+(n4-1),""+(2*n4)]);
    return mcq("In the expansion of \\((x + y)^{"+n4+"}\\), the exponents of \\(x\\) and \\(y\\) in each term add to",
      ""+n4,dis,
      "Every term comes from multiplying "+n4+" factors of \\((x + y)\\), and each factor contributes either one \\(x\\) or one \\(y\\). So the exponents in every term add to <b>"+n4+"</b>, the power on the binomial.",
      {n:n4,mode:mode});
  }
  if(mode==="xpat"){
    var n5=ri(4,8);
    var dis2=u9opts("It decreases by 1 at each step",["It increases by 1 at each step","It stays the same at each step","It alternates between high and low values"]);
    return mcq("In the expansion of \\((x + y)^{"+n5+"}\\), what happens to the exponent of \\(x\\) as the terms are read from left to right?",
      "It decreases by 1 at each step",dis2,
      "The first term is \\(x^{"+n5+"}\\) and the last is \\(y^{"+n5+"}\\). Moving right, each term gives up one factor of \\(x\\) and gains one factor of \\(y\\), so the exponent of \\(x\\) drops by 1 at each step while the exponent of \\(y\\) rises by 1.",
      {n:n5,mode:mode});
  }
  var n6=pick([5,6,7]), b6=pick([2,3]), a6=n6-b6, v6=u9comb(n6,b6);
  var key="Each product that gives \\(x^{"+a6+"} y^{"+b6+"}\\) is formed by choosing which "+b6+" of the "+n6+" factors supply a \\(y\\), and there are \\("+u9binS(n6,b6)+"\\) such choices";
  var dis3=u9opts(key,[
    "The exponents "+a6+" and "+b6+" add to "+n6+", and adding exponents is how coefficients are counted, since each term is built by adding the exponents from the factors one at a time",
    "The coefficient is the "+(b6===2?"2nd":"3rd")+" entry of row "+n6+" of Pascal's triangle, counted from the left edge of the row",
    "Because "+n6+" - "+a6+" = "+b6+", the second exponent is the one used in the combination, and no other count is involved"
  ]);
  return mcq("The coefficient of \\(x^{"+a6+"} y^{"+b6+"}\\) in the expansion of \\((x + y)^{"+n6+"}\\) is \\("+u9binS(n6,b6)+" = "+v6+"\\). Why is the coefficient given by a combination?",
    key,dis3,
    "Expanding means choosing one term from each of the "+n6+" factors. A product equal to \\(x^{"+a6+"} y^{"+b6+"}\\) needs \\(y\\) from exactly "+b6+" factors and \\(x\\) from the rest, and the number of ways to choose those "+b6+" factors is \\("+u9binS(n6,b6)+" = "+v6+"\\).",
    {n:n6,b:b6,mode:mode});
});

/* ---------- 3.18: full binomial expansions (L2) ---------- */
E("u9-binomial-expand",9,["3.18"],2,"gen",function(){
  var att=0;
  while(att<80){
    att++;
    var sp=u9pickSpec(true), terms=u9specTerms(sp), key=u9joinTerms(terms);
    var cands=[], i, t2;
    for(i=1;i<sp.n;i++){ t2=terms.map(function(t){ return {c:t.c,xe:t.xe,yname:t.yname,ye:t.ye}; }); t2[i].c=terms[i-1].c; cands.push(u9joinTerms(t2)); }
    t2=terms.map(function(t){ var k=t.ye|| (sp.n-t.xe); return {c:u9comb(sp.n,sp.n-t.xe)*Math.pow(sp.A,Math.min(sp.n-t.xe,1))*Math.pow(sp.B,Math.min(k,1))*Math.pow(sp.s,k), xe:t.xe, yname:t.yname, ye:t.ye}; });
    cands.push(u9joinTerms(t2));
    for(i=1;i<=sp.n;i++){ t2=terms.map(function(t){ return {c:t.c,xe:t.xe,yname:t.yname,ye:t.ye}; }); t2[i].c=-terms[i].c; cands.push(u9joinTerms(t2)); }
    t2=terms.map(function(t){ return {c:t.c,xe:t.xe,yname:t.yname,ye:t.ye}; });
    var mid=ri(1,sp.n-1); t2[mid].xe=terms[mid].xe+1; if(t2[mid].ye>0) t2[mid].ye=terms[mid].ye-1;
    cands.push(u9joinTerms(t2));
    var dis=u9opts(key,cands);
    if(!dis) continue;
    var rowN=u9row(sp.n).join(", ");
    return mcq("Expand \\("+u9specStr(sp)+"\\).",
      "\\("+key+"\\)",dis.map(function(d){ return "\\("+d+"\\)"; }),
      "The coefficients come from row "+sp.n+" of Pascal's triangle: "+rowN+". Each term takes its coefficient from that row, the exponent of \\(x\\) falls from "+sp.n+" to 0, and the second part of the binomial is used one more time in each successive term.\\[ \\begin{aligned} "+u9specStr(sp)+" &= "+key+" \\end{aligned} \\]",
      {A:sp.A,B:sp.B,s:sp.s,n:sp.n});
  }
  return numq("How many terms are in the expansion of \\((x + y)^5\\)?",6,0.001,"The exponent of \\(x\\) runs from 5 down to 0, giving 6 terms.",{fallback:1});
});

/* ---------- 3.19: a specific term of a binomial expansion (L2) ---------- */
E("u9-binomial-term",9,["3.19"],2,"gen",function(){
  var att=0;
  while(att<80){
    att++;
    var sp=u9pickSpec(true); sp.n=pick([3,4,4,5]);
    if(sp.n===5&&(sp.A>2||sp.B>2)) continue;
    var terms=u9specTerms(sp);
    var mode=pick(["kth","kth","contains","coefnum"]);
    if(mode==="coefnum"&&sp.s<0) mode="kth";
    if(mode==="contains"){
      var m=ri(1,sp.n-1), j=sp.n-m;
      var xPow=(m===1?"x":"x^{"+m+"}");
      var tj=terms[j];
      var candsT=[terms[j-1],terms[j+1],
        {c:u9comb(sp.n,j+1)*Math.pow(sp.A,sp.n-j)*Math.pow(sp.B,j)*Math.pow(sp.s,j), xe:tj.xe, yname:tj.yname, ye:tj.ye},
        {c:u9comb(sp.n,j)*Math.pow(sp.A,Math.min(sp.n-j,1))*Math.pow(sp.B,Math.min(j,1))*Math.pow(sp.s,j), xe:tj.xe, yname:tj.yname, ye:tj.ye}];
      var keyT=(tj.c<0?"-":"")+u9termBody(tj.c,tj.xe,tj.yname,tj.ye);
      var disT=u9opts(keyT,candsT.map(function(t){ return (t.c<0?"-":"")+u9termBody(t.c,t.xe,t.yname,t.ye); }));
      if(!disT) continue;
      return mcq("What is the term containing \\("+xPow+"\\) in the expansion of \\("+u9specStr(sp)+"\\)?",
        "\\("+keyT+"\\)",disT.map(function(d){ return "\\("+d+"\\)"; }),
        "The term with \\("+xPow+"\\) uses the second part of the binomial "+j+" time"+(j===1?"":"s")+", so its coefficient is \\("+u9binS(sp.n,j)+"\\) together with the powers of the coefficients inside the binomial, giving \\("+keyT+"\\)\\.",
        {n:sp.n,j:j,mode:mode});
    }
    var k=ri(2,sp.n), jj=k-1, tk=terms[jj];
    if(mode==="coefnum"){
      return numq("What is the coefficient of the "+["second","third","fourth","fifth"][k-2]+" term in the expansion of \\("+u9specStr(sp)+"\\)?",
        tk.c,0.001,
        "Term "+k+" uses the second part of the binomial "+jj+" time"+(jj===1?"":"s")+". Its coefficient is \\("+u9binS(sp.n,jj)+"\\) multiplied by the powers of the coefficients inside the binomial: \\("+tk.c+"\\).",
        {n:sp.n,k:k,mode:mode});
    }
    var keyK=(tk.c<0?"-":"")+u9termBody(tk.c,tk.xe,tk.yname,tk.ye);
    var candsK=[terms[jj-1],terms[jj+1],
      {c:u9comb(sp.n,jj+1)*Math.pow(sp.A,sp.n-jj)*Math.pow(sp.B,jj)*Math.pow(sp.s,jj), xe:tk.xe, yname:tk.yname, ye:tk.ye},
      {c:u9comb(sp.n,jj)*Math.pow(sp.A,Math.min(sp.n-jj,1))*Math.pow(sp.B,Math.min(jj,1))*Math.pow(sp.s,jj), xe:tk.xe, yname:tk.yname, ye:tk.ye}];
    var disK=u9opts(keyK,candsK.map(function(t){ return (t.c<0?"-":"")+u9termBody(t.c,t.xe,t.yname,t.ye); }));
    if(!disK) continue;
    return mcq("What is the "+["second","third","fourth","fifth"][k-2]+" term in the expansion of \\("+u9specStr(sp)+"\\)?",
      "\\("+keyK+"\\)",disK.map(function(d){ return "\\("+d+"\\)"; }),
      "Counting from the left, term "+k+" uses the second part of the binomial "+jj+" time"+(jj===1?"":"s")+" and \\(x\\) the remaining "+(sp.n-jj)+" times. Its coefficient is \\("+u9binS(sp.n,jj)+"\\) together with the powers of the coefficients inside the binomial, giving \\("+keyK+"\\)\\.",
      {n:sp.n,k:k,mode:mode});
  }
  return numq("What is the coefficient of the third term in the expansion of \\((x + y)^4\\)?",6,0.001,"The coefficients are row 4 of Pascal's triangle: 1, 4, 6, 4, 1.",{fallback:1});
});

/* ---------- 9.1, 9.4: counting with lists and tree diagrams (L1) ---------- */
E("u9-counting-organizers",9,["9.1","9.4"],1,"gen",function(){
  var mode=pick(["two","two","three","row","back"]);
  if(mode==="two"){
    var ctx=pick([
      {a:"juices",b:"cereals",w:"breakfasts"},
      {a:"shirts",b:"pairs of shorts",w:"outfits"},
      {a:"crusts",b:"sauces",w:"pizzas"},
      {a:"hats",b:"scarves",w:"winter outfits"},
      {a:" sandwich fillings",b:"breads",w:"sandwiches"},
      {a:"notebook colours",b:"pen colours",w:"notebook and pen pairs"}
    ]);
    var x=ri(2,5), y=ri(2,5);
    return numq("A list is used to count "+ctx.w+" made from "+x+" "+ctx.a.trim()+" and "+y+" "+ctx.b+". How many "+ctx.w+" are on the list?",
      x*y,0.001,
      "Each of the "+x+" "+ctx.a.trim()+" can be paired with each of the "+y+" "+ctx.b+", so the list has \\("+x+" \\times "+y+" = "+(x*y)+"\\) entries.",
      {x:x,y:y,mode:mode});
  }
  if(mode==="three"){
    var c3=pick([
      {parts:"2 kinds of bread, 3 fillings and 2 spreads",v:[2,3,2],w:"sandwiches",t:["Bread","Fillings","Spreads"]},
      {parts:"3 shirts, 2 pairs of pants and 2 pairs of shoes",v:[3,2,2],w:"outfits",t:["Shirts","Pants","Shoes"]},
      {parts:"2 soups, 4 mains and 2 desserts",v:[2,4,2],w:"meals",t:["Soups","Mains","Desserts"]},
      {parts:"3 juices, 2 cereals and 3 fruits",v:[3,2,3],w:"breakfasts",t:["Juices","Cereals","Fruits"]}
    ]);
    var tot=c3.v[0]*c3.v[1]*c3.v[2];
    var q=numq("A tree diagram is used to count the "+c3.w+" that can be made from "+c3.parts+". How many endpoints does the tree diagram have?",
      tot,0.001,
      "Each stage of the tree splits every branch again: \\("+c3.v[0]+" \\times "+c3.v[1]+" \\times "+c3.v[2]+" = "+tot+"\\) endpoints.",
      {mode:mode,tot:tot});
      q.figure=treeSVG(c3.v.map(function(n,i){var opts=[];for(var j=1;j<=n;j++)opts.push(""+j);return {title:c3.t[i],options:opts};}));
      return q;
  }
  if(mode==="row"){
    var c4=pick([
      {what:"different posters",n:3},{what:"different flags",n:3},{what:"different photographs",n:4},
      {what:"different books",n:4},{what:"runners",n:4},{what:"different cards",n:3}
    ]);
    var parts4=[]; for(var i4=c4.n;i4>=1;i4--) parts4.push(i4);
    var q=numq("A tree diagram is used to count the orders in which "+c4.n+" "+c4.what+" can be placed in a row. How many orders does the tree diagram show?",
      u9fact(c4.n),0.001,
      "At each stage of the tree, one fewer item remains: \\("+parts4.join(" \\times ")+" = "+u9fact(c4.n)+"\\) orders.",
      {n:c4.n,mode:mode});
      var letters=["A","B","C","D"].slice(0,c4.n), ord=["1st","2nd","3rd","4th"], stages=[];
      for(var si=0;si<c4.n;si++){(function(idx){stages.push({title:ord[idx]+" position",options:function(path){return letters.filter(function(L){return path.indexOf(L)<0;});}});})(si);}
      q.figure=treeSVG(stages);
      return q;
  }
  var pair=pick([[12,3],[12,4],[18,3],[20,4],[24,4],[24,6],[16,4],[15,3],[15,5],[20,5],[18,6],[14,2]]);
  return numq("A tree diagram for a two-stage choice has "+pair[0]+" endpoints. The first stage has "+pair[1]+" options. How many options are there at the second stage?",
    pair[0]/pair[1],0.001,
    "The endpoints are the first-stage options repeated for each second-stage option, so the second stage has \\("+pair[0]+" \\div "+pair[1]+" = "+(pair[0]/pair[1])+"\\) options.",
    {mode:mode,tot:pair[0],first:pair[1]});
});

/* ---------- 9.3: the Fundamental Counting Principle (L2) ---------- */
E("u9-fcp-apply",9,["9.3"],1,"gen",function(){
  var mode=pick(["meal","code","plate","stages","mealMC"]);
  if(mode==="mealMC"){
    var f=[ri(2,4),ri(3,5),ri(2,4)], key=f[0]*f[1]*f[2];
    var dis=u9opts(u9big(key),[u9big(f[0]+f[1]+f[2]),u9big((f[0]+1)*f[1]*f[2]),u9big((f[0]-1)*(f[1]-1)*(f[2]-1)),u9big(f[0]*f[1]+f[2])]);
    return mcq("A cafeteria offers "+f[0]+" soups, "+f[1]+" main dishes and "+f[2]+" drinks. How many different meals consist of one soup, one main dish and one drink?",
      u9big(key),dis,
      "The choices are independent stages, so the Fundamental Counting Principle multiplies them:\\[ \\begin{aligned} "+f[0]+" \\times "+f[1]+" \\times "+f[2]+" &= "+u9big(key)+" \\end{aligned} \\]",
      {f:f,mode:mode});
  }
  if(mode==="meal"){
    var c=pick([
      {t:"A food truck sells {a} wraps, {b} salads and {c} smoothies. How many different orders consist of one wrap, one salad and one smoothie?",lo:[2,3,2],hi:[4,5,4]},
      {t:"A bakery case holds {a} kinds of muffins, {b} kinds of tarts and {c} kinds of cookies. How many different treats consist of one muffin, one tart and one cookie?",lo:[2,3,2],hi:[5,4,4]}
    ]);
    var a=ri(c.lo[0],c.hi[0]), b=ri(c.lo[1],c.hi[1]), d=ri(c.lo[2],c.hi[2]);
    var stem=c.t.replace("{a}",a).replace("{b}",b).replace("{c}",d);
    return numq(stem,a*b*d,0.001,
      "Multiply the number of choices at each stage:\\[ \\begin{aligned} "+a+" \\times "+b+" \\times "+d+" &= "+u9big(a*b*d)+" \\end{aligned} \\]",
      {a:a,b:b,d:d,mode:mode});
  }
  if(mode==="code"){
    var sub=pick(["rep","norep","first"]);
    if(sub==="rep"){
      var L=pick([3,4]);
      return numq("A bike lock uses a code of "+L+" digits, and digits may be repeated. How many codes are possible?",
        Math.pow(10,L),0.001,
        "Each of the "+L+" positions can be filled in 10 ways, and repetition is allowed:\\[ \\begin{aligned} 10^{"+L+"} &= "+u9big(Math.pow(10,L))+" \\end{aligned} \\]",
        {sub:sub,L:L});
    }
    if(sub==="norep"){
      var v=u9perm(10,3);
      return numq("A door keypad code has 3 digits, and no digit may be used more than once. How many codes are possible?",
        v,0.001,
        "The first digit has 10 choices, the next has 9, and the last has 8:\\[ \\begin{aligned} 10 \\times 9 \\times 8 &= "+v+" \\end{aligned} \\]",
        {sub:sub});
    }
    var v2=9*10*10;
    return numq("A locker code has 3 digits. The first digit cannot be 0, and digits may be repeated. How many codes are possible?",
      v2,0.001,
      "The first digit has 9 choices (1 to 9), and each of the other two digits has 10:\\[ \\begin{aligned} 9 \\times 10 \\times 10 &= "+u9big(v2)+" \\end{aligned} \\]",
      {sub:sub});
  }
  if(mode==="plate"){
    var Lp=pick([2,3]), Dp=pick([2,3]), val=Math.pow(26,Lp)*Math.pow(10,Dp);
    return numq("A licence plate pattern uses "+Lp+" letters followed by "+Dp+" digits. Letters and digits may be repeated. How many plates fit the pattern?",
      val,0.001,
      "Each letter can be chosen in 26 ways and each digit in 10 ways:\\[ \\begin{aligned} 26^{"+Lp+"} \\times 10^{"+Dp+"} &= "+u9big(val)+" \\end{aligned} \\]",
      {Lp:Lp,Dp:Dp,mode:mode});
  }
  var c4b=pick([
    {t:"A hiker packs 1 of {a} tents, 1 of {b} sleeping bags, 1 of {c} stoves and 1 of {d} backpacks. How many different gear sets are possible?",lo:[2,2,2,2],hi:[3,4,3,3]},
    {t:"A trip is planned with {a} choices of town, {b} choices of inn, {c} choices of trail and {d} choices of ferry sailing. How many different trips are possible?",lo:[2,2,2,2],hi:[4,3,3,2]}
  ]);
  var w=ri(c4b.lo[0],c4b.hi[0]), x=ri(c4b.lo[1],c4b.hi[1]), y=ri(c4b.lo[2],c4b.hi[2]), z=ri(c4b.lo[3],c4b.hi[3]);
  var stem4=c4b.t.replace("{a}",w).replace("{b}",x).replace("{c}",y).replace("{d}",z);
  return numq(stem4,w*x*y*z,0.001,
    "Multiply the choices at the four stages:\\[ \\begin{aligned} "+w+" \\times "+x+" \\times "+y+" \\times "+z+" &= "+u9big(w*x*y*z)+" \\end{aligned} \\]",
    {mode:mode});
});

/* ---------- 9.2: why choices multiply rather than add (L3, var) ---------- */
E("u9-why-multiply",9,["9.2"],3,"var",varset([
  function(){
    return mcq("A diner offers 4 soups and 3 main dishes. Why is the number of soup-and-main pairs found by multiplying, \\(4 \\times 3\\), rather than by adding, \\(4 + 3\\)?",
      "Each of the 4 soups can be paired with each of the 3 mains, forming 4 equal groups of 3 pairs",
      ["Adding is only used for counting single items, and pairs are never single items",
       "The Fundamental Counting Principle says to multiply any two numbers that appear in a counting problem",
       "A tree diagram for the pairs would have only 7 endpoints, so addition must be wrong"],
      "Pairing is a two-stage choice. Fixing one soup still leaves 3 mains, and this happens for all 4 soups, so the pairs form 4 groups of 3. Counting equal groups is multiplication: \\(4 \\times 3 = 12\\) pairs. Adding counts the 7 dishes themselves, not the pairs.",
      {v:1});
  },
  function(){
    return mcq("A student claims that a meal made from 4 starters and 5 desserts can be chosen in \\(4 + 5 = 9\\) ways. What is the error?",
      "The 9 counts individual dishes; each starter pairs with all 5 desserts, giving 4 groups of 5 meals",
      ["The student should have divided 5 by 4, because the courses are different sizes",
       "The 9 is correct for meals, and multiplication is only needed when there are three courses",
       "The student used the wrong operation because meals are always counted with factorials, not with sums"],
      "A meal is a pair, one starter together with one dessert. For each of the 4 starters there are 5 desserts, so there are \\(4 \\times 5 = 20\\) meals. The sum \\(4 + 5\\) counts dishes, not pairs.",
      {v:2});
  },
  function(){
    return mcq("A tree diagram is drawn for choosing a size (3 options) and then a flavour (4 options). Why does the tree have 12 endpoints?",
      "Each of the 3 size branches splits into 4 flavour branches, making 3 equal groups of 4 endpoints",
      ["The tree has one endpoint for each option, and 3 and 4 make 12 when combined in any tree",
       "Endpoints are counted by adding the options at each stage, and the stages here are equal in size",
       "Each flavour appears on 4 branches, so the endpoints are counted 4 at a time until the total of 12 is reached"],
      "The first stage creates 3 branches. Every one of those branches is then split by the 4 flavours, so the endpoints come in 3 identical groups of 4: \\(3 \\times 4 = 12\\).",
      {v:3});
  },
  function(){
    return mcq("Which statement correctly explains when to multiply and when to add in a counting problem?",
      "Multiply when every outcome of one choice can be combined with every outcome of another; add when the outcomes come from separate cases that do not combine",
      ["Multiply when the problem mentions two or more objects being combined; add when it mentions only one object",
       "Multiply when order matters in the final arrangement being counted; add when order does not matter",
       "Multiply when the numbers are large enough that listing every possible outcome is slow and impractical; add when a list is short enough to write out in full on the page"],
      "Multiplication counts combinations of choices that happen together, because each outcome of one stage is repeated for every outcome of the next. Addition counts disjoint cases, where an outcome belongs to one case or the other but never both.",
      {v:4});
  }
]));

/* ---------- 9.5: factorial notation and direct evaluation (L1) ---------- */
E("u9-factorial-notation",9,["9.5"],1,"gen",function(){
  var mode=pick(["fact","quot","perm","which","whichexpr","quot","perm"]);
  if(mode==="fact"){
    var n=ri(3,10);
    return numq("Evaluate \\("+n+"!\\).",
      u9fact(n),0.001,
      "\\[ \\begin{aligned} "+n+"! &= "+(function(){ var p=[]; for(var i=n;i>=1;i--) p.push(i); return p.join(" \\times "); })()+" \\\\ &= "+u9big(u9fact(n))+" \\end{aligned} \\]",
      {n:n,mode:mode});
  }
  if(mode==="quot"){
    var n2=ri(5,11), k=pick([2,3,4]); if(k>=n2) k=2;
    var v=u9perm(n2,k), parts=[];
    for(var i=0;i<k;i++) parts.push(n2-i);
    return numq("Evaluate \\(\\frac{"+n2+"!}{"+(n2-k)+"!}\\).",
      v,0.001,
      "The factors from "+(n2-k)+" down to 1 cancel:\\[ \\begin{aligned} \\frac{"+n2+"!}{"+(n2-k)+"!} &= "+parts.join(" \\times ")+" \\\\ &= "+u9big(v)+" \\end{aligned} \\]",
      {n:n2,k:k,mode:mode});
  }
  if(mode==="perm"){
    var n3=ri(4,10), r3=pick([2,3,4]); if(r3>n3) r3=n3;
    var v3=u9perm(n3,r3), parts3=[];
    for(var i2=0;i2<r3;i2++) parts3.push(n3-i2);
    return numq("Evaluate \\("+u9permS(n3,r3)+"\\).",
      v3,0.001,
      "\\("+u9permS(n3,r3)+"\\) is a product of "+r3+" factors starting at "+n3+":\\[ \\begin{aligned} "+u9permS(n3,r3)+" &= "+parts3.join(" \\times ")+" \\\\ &= "+u9big(v3)+" \\end{aligned} \\]",
      {n:n3,r:r3,mode:mode});
  }
  if(mode==="whichexpr"){
    var n5=pick([4,5,6]), chain=[], rep=[], sum=[], i5;
    for(i5=n5;i5>=1;i5--){ chain.push(i5); rep.push(n5); sum.push(i5); }
    var disE=u9opts("\\("+chain.join(" \\times ")+"\\)",[
      "\\("+rep.join(" \\times ")+"\\)",
      "\\("+sum.join(" + ")+"\\)",
      "\\("+chain.join(" \\times ")+" \\times 0\\)"]);
    return mcq("Which expression is equal to \\("+n5+"!\\)?",
      "\\("+chain.join(" \\times ")+"\\)",disE,
      "The symbol \\("+n5+"!\\) is shorthand for the product of the integers from "+n5+" down to 1.",
      {n:n5,mode:mode});
  }
  var n4=pick([5,6,7]), v4=u9fact(n4);
  var dis=u9opts(u9big(v4),[u9big(u9fact(n4-1)),u9big(n4*n4),u9big(v4+100),u9big(u9perm(n4,2))]);
  return mcq("Which value is equal to \\("+n4+"!\\)?",
    u9big(v4),dis,
    "\\("+n4+"!\\) means the product of the integers from "+n4+" down to 1, which is \\("+u9big(v4)+"\\).",
    {n:n4,mode:mode});
});

/* ---------- 9.5, 9.6: permutations in context (L2) ---------- */
E("u9-perm-basic",9,["9.5","9.6"],1,"gen",function(){
  var mode=pick(["all","all","taken","taken","takenMC"]);
  if(mode==="all"){
    var c=pick([
      {t:"{n} different books are arranged in a row on a shelf. How many arrangements are possible?",w:"arrangements"},
      {t:"{n} students line up for a class photo. How many different lineups are possible?",w:"lineups"},
      {t:"{n} runners finish a race with no ties. How many different finishing orders are possible?",w:"orders"},
      {t:"{n} different flags are flown in a row on a line. How many different displays are possible?",w:"displays"}
    ]);
    var n=ri(5,8), stem=c.t.replace("{n}",n);
    var parts=[]; for(var i=n;i>=1;i--) parts.push(i);
    return numq(stem,u9fact(n),0.001,
      "Every position is filled, so the count is \\("+n+"!\\):\\[ \\begin{aligned} "+n+"! &= "+parts.join(" \\times ")+" \\\\ &= "+u9big(u9fact(n))+" \\end{aligned} \\]",
      {n:n,mode:mode});
  }
  if(mode==="takenMC"){
    var c2=pick([
      {t:"{r} of the {n} paintings in a show are hung in a row on one wall. How many different rows are possible?"},
      {t:"A DJ builds a set list by choosing {r} of {n} songs and playing them in order. How many different set lists are possible?"}
    ]);
    var n2=ri(6,9), r2=pick([2,3]);
    var key=u9perm(n2,r2);
    var dis=u9opts(u9big(key),[u9big(u9comb(n2,r2)),u9big(u9fact(n2)),u9big(u9perm(n2,r2-1)),u9big(Math.pow(n2,r2))]);
    if(!dis) return numq(c2.t.replace("{n}",n2).replace("{r}",r2),key,0.001,"The order on the wall matters, so this is a permutation.",{n:n2,r:r2,mode:mode});
    return mcq(c2.t.replace("{n}",n2).replace("{r}",r2),
      u9big(key),dis,
      "The positions in the row are distinct, so the count is a permutation: \\("+u9permS(n2,r2)+" = "+u9big(key)+"\\)\\.",
      {n:n2,r:r2,mode:mode});
  }
  var c3=pick([
    {t:"Gold, silver and bronze medals are awarded in a swim meet with {n} swimmers and no ties. How many different medal results are possible?",r:3},
    {t:"A club with {n} members elects a president and a treasurer. How many different outcomes are possible?",r:2},
    {t:"A baking contest with {n} entries awards a first prize and a second prize. How many different outcomes are possible?",r:2},
    {t:"From a class of {n} students, a captain and an assistant captain are chosen. How many different outcomes are possible?",r:2},
    {t:"A race has {n} runners. How many different results are possible for the first three finishers?",r:3}
  ]);
  var n3=ri(6,10), r3=c3.r, v3=u9perm(n3,r3), parts3=[];
  for(var i3=0;i3<r3;i3++) parts3.push(n3-i3);
  return numq(c3.t.replace("{n}",n3),v3,0.001,
    "The positions are distinct, so this is a permutation of "+n3+" taken "+r3+" at a time:\\[ \\begin{aligned} "+u9permS(n3,r3)+" &= "+parts3.join(" \\times ")+" \\\\ &= "+u9big(v3)+" \\end{aligned} \\]",
    {n:n3,r:r3,mode:mode});
});

/* ---------- 9.8: solving nP_r = k (L2) ---------- */
E("u9-perm-solve",9,["9.8"],2,"gen",function(){
  var mode=pick(["r2","r2","r3","r4","findr","npn"]);
  if(mode==="r2"||mode==="r3"||mode==="r4"){
    var r=(mode==="r2"?2:mode==="r3"?3:4);
    var n=ri(r+2,r+8), k=u9perm(n,r), parts=[];
    for(var i=0;i<r;i++) parts.push("n"+(i===0?"":" - "+i));
    var ctx=Math.random()<0.5;
    var stem=ctx
      ? "The number of ways to fill the first "+r+" places in a contest with \\(n\\) entrants is \\("+u9big(k)+"\\). What is \\(n\\)?"
      : "Solve for \\(n\\): \\("+u9permS("n",r)+" = "+u9big(k)+"\\).";
    var dis=u9opts(""+n,[""+(n-1),""+(n+1),""+(n+2),""+(n-2)]);
    var prodParts=[]; for(var i2=0;i2<r;i2++) prodParts.push(n-i2);
    return mcq(stem,""+n,dis,
      "\\("+u9permS("n",r)+"\\) is a product of "+r+" factors counting down from \\(n\\):\\[ \\begin{aligned} "+parts.join(" \\times ")+" &= "+u9big(k)+" \\\\ "+prodParts.join(" \\times ")+" &= "+u9big(k)+" \\end{aligned} \\] The first factor is \\(n = "+n+"\\)\\.",
      {n:n,r:r,mode:mode});
  }
  if(mode==="findr"){
    var n2=pick([5,6,7,8]), r2=pick([2,3,4]); if(r2>n2) r2=3;
    var k2=u9perm(n2,r2);
    var dis2=u9opts(""+r2,[""+(r2-1),""+(r2+1),""+(r2+2)]);
    return mcq("Solve for \\(r\\): \\("+u9permS(n2,"r")+" = "+u9big(k2)+"\\).",
      ""+r2,dis2,
      "Build the product down from "+n2+" until it reaches "+u9big(k2)+": \\("+n2+" \\times "+(n2-1)+(r2>=3?" \\times "+(n2-2):"")+(r2>=4?" \\times "+(n2-3):"")+" = "+u9big(k2)+"\\)\\. There are "+r2+" factors, so \\(r = "+r2+"\\)\\.",
      {n:n2,r:r2,mode:mode});
  }
  var n3=ri(4,7), k3=u9fact(n3);
  var dis3=u9opts(""+n3,[""+(n3-1),""+(n3+1),""+(n3+2)]);
  return mcq("Solve for \\(n\\): \\("+u9permS("n","n")+" = "+u9big(k3)+"\\).",
    ""+n3,dis3,
    "\\("+u9permS("n","n")+" = n!\\), and \\("+n3+"! = "+u9big(k3)+"\\)\\, so \\(n = "+n3+"\\)\\.",
    {n:n3,mode:mode});
});

/* ---------- 9.9: permutations with identical elements (L2) ---------- */
E("u9-identical-elements",9,["9.9"],1,"gen",function(){
  var mode=pick(["tiles","tiles","compare","beads"]);
  if(mode==="compare"){
    var tot=pick([5,6,7]), rc=pick([2,3]);
    var key=u9fact(tot)/u9fact(rc);
    var dis=u9opts(u9big(key),[u9big(u9fact(tot)),u9big(u9fact(tot)/rc),u9big(u9fact(tot)-u9fact(rc)),u9big(key*rc)]);
    if(dis){
      return mcq("A shelf holds "+tot+" books, all different, giving \\("+u9big(u9fact(tot))+"\\) arrangements. If "+rc+" of the books are replaced by identical copies of one book, how many different arrangements are there?",
        u9big(key),dis,
        "Swapping the "+rc+" identical copies among themselves no longer creates a new arrangement. Each distinct arrangement was counted \\("+rc+"! = "+u9fact(rc)+"\\) times, so divide:\\[ \\begin{aligned} \\frac{"+tot+"!}{"+rc+"!} &= "+u9big(key)+" \\end{aligned} \\]",
        {tot:tot,rc:rc,mode:mode});
    }
  }
  var att=0;
  while(att<60){
    att++;
    var pattern=pick([[2,1,1],[2,2,1],[3,1,1],[3,2,1],[2,2,2],[4,1,1],[3,3],[4,2],[2,1,1,1],[3,2],[5,1,1],[3,2,2]]);
    var total=pattern.reduce(function(s,v){ return s+v; },0);
    if(total>8) continue;
    var letters=shuffle(["A","B","C","D","E","F","G","H","J","K"]).slice(0,pattern.length);
    var tiles=[], denom=[], i, j;
    for(i=0;i<pattern.length;i++){ for(j=0;j<pattern[i];j++) tiles.push(letters[i]); if(pattern[i]>1) denom.push(pattern[i]); }
    var key2=u9fact(total); denom.forEach(function(d){ key2=key2/u9fact(d); });
    var maxC=Math.max.apply(null,pattern);
    var cands=[u9fact(total), u9fact(total)/u9fact(maxC), key2*2, u9fact(total-1)];
    if(key2%2===0) cands.push(key2/2);
    var ctxS;
    if(mode==="beads"){
      var colours=shuffle(["red","blue","green","yellow","white","black"]).slice(0,pattern.length);
      var desc=pattern.map(function(cnt,i2){ return cnt+" "+colours[i2]; }).join(", ");
      ctxS="A bracelet is strung with "+desc+" beads. How many different sequences of beads are possible?";
    } else {
      ctxS="A set of letter tiles contains the letters "+tiles.join(", ")+". How many different sequences can be formed using all the tiles?";
    }
    var denomS=denom.map(function(d){ return d+"!"; }).join(" \\times ");
    var sol="If all "+total+" items were different there would be \\("+total+"! = "+u9big(u9fact(total))+"\\) sequences. Identical items can be swapped without changing the sequence, so divide by the internal arrangements of each repeated group:\\[ \\begin{aligned} \\frac{"+total+"!}{"+denomS+"} &= "+u9big(key2)+" \\end{aligned} \\]";
    if(Math.random()<0.5){
      return numq(ctxS,key2,0.001,sol,{pattern:pattern,mode:mode});
    }
    var dis2=u9opts(u9big(key2),cands.map(u9big));
    if(!dis2) continue;
    return mcq(ctxS,u9big(key2),dis2,sol,{pattern:pattern,mode:mode});
  }
  return numq("A set of letter tiles contains the letters A, A, B, C. How many different sequences can be formed using all the tiles?",
    12,0.001,"Divide by the arrangements of the two identical A tiles: \\(\\frac{4!}{2!} = 12\\)\\.",{fallback:1});
});

/* ---------- 9.10: permutations with constraints (L3) ---------- */
E("u9-perm-constraints",9,["9.10"],3,"gen",function(){
  var names=shuffle(["Maya","Liam","Noah","Ava","Ethan","Zoe","Owen","Ruby","Eli","Nora","Sam","Ivy"]);
  var A=names[0], B=names[1], C=names[2];
  var mode=pick(["together","apart","first","ends","together3"]);
  var n=ri(5,8);
  var scene=pick([
    n+" friends sit in a row of "+n+" seats at a theatre",
    n+" students stand in a row for a photograph",
    n+" runners pose in a row after a race"
  ]);
  var key, cands, sol;
  if(mode==="together"){
    key=2*u9fact(n-1);
    cands=[u9fact(n),u9fact(n-1),2*u9fact(n-2),key+u9fact(n-1)];
    sol="Treat "+A+" and "+B+" as one block. The block and the other "+(n-2)+" people make "+(n-1)+" objects, arranged in \\("+(n-1)+"!\\) ways, and the block itself has 2 internal orders:\\[ \\begin{aligned} 2 \\times "+(n-1)+"! &= "+u9big(key)+" \\end{aligned} \\]";
  } else if(mode==="apart"){
    key=u9fact(n)-2*u9fact(n-1);
    cands=[u9fact(n),2*u9fact(n-1),u9fact(n)-u9fact(n-1),u9fact(n-1)];
    sol="Count all arrangements and subtract the ones where "+A+" and "+B+" are together (the block method gives \\(2 \\times "+(n-1)+"!\\)):\\[ \\begin{aligned} "+n+"! - 2 \\times "+(n-1)+"! &= "+u9big(u9fact(n))+" - "+u9big(2*u9fact(n-1))+" \\\\ &= "+u9big(key)+" \\end{aligned} \\]";
  } else if(mode==="first"){
    key=u9fact(n-1);
    cands=[u9fact(n),2*u9fact(n-1),u9fact(n-2),key*n-2*u9fact(n-2)];
    sol="With "+A+" fixed at the front, the remaining "+(n-1)+" positions can be filled by the other "+(n-1)+" people in \\("+(n-1)+"! = "+u9big(key)+"\\) ways.";
  } else if(mode==="ends"){
    key=2*u9fact(n-2);
    cands=[u9fact(n-2),u9fact(n-1),2*u9fact(n-1),u9fact(n)];
    sol=A+" and "+B+" take the two end positions in 2 orders. The middle "+(n-2)+" positions are filled by the remaining people in \\("+(n-2)+"!\\) ways:\\[ \\begin{aligned} 2 \\times "+(n-2)+"! &= "+u9big(key)+" \\end{aligned} \\]";
  } else {
    key=u9fact(3)*u9fact(n-2);
    cands=[u9fact(n-2),u9fact(n),u9fact(n-1),u9fact(3)*u9fact(n-1)];
    sol="Treat "+A+", "+B+" and "+C+" as one block: the block and the other "+(n-3)+" people make "+(n-2)+" objects, and the block has \\(3! = 6\\) internal orders:\\[ \\begin{aligned} 3! \\times "+(n-2)+"! &= "+u9big(key)+" \\end{aligned} \\]";
  }
  var stems={
    together: scene+", and "+A+" and "+B+" insist on being next to each other. How many arrangements are possible?",
    apart: scene+", and "+A+" and "+B+" refuse to be next to each other. How many arrangements are possible?",
    first: scene+", and "+A+" must be at the front of the row. How many arrangements are possible?",
    ends: scene+", and "+A+" and "+B+" must take the two end positions. How many arrangements are possible?",
    together3: scene+", and "+A+", "+B+" and "+C+" must all be together. How many arrangements are possible?"
  };
  var stem=stems[mode].charAt(0).toUpperCase()+stems[mode].slice(1);
  if(Math.random()<0.45){
    var dis=u9opts(u9big(key),cands.map(u9big));
    if(dis) return mcq(stem,u9big(key),dis,sol,{n:n,mode:mode});
  }
  return numq(stem,key,0.001,sol,{n:n,mode:mode});
});

/* ---------- 9.11: permutation or combination (L3) ---------- */
E("u9-perm-or-comb",9,["9.11"],3,"gen",function(){
  var mode=pick(["values","values","expr","pair"]);
  var pScen=[
    {t:"Gold and silver medals are awarded to the top 2 finishers in a field of {n} skiers",r:2},
    {t:"A president and a secretary are elected from a council of {n} members",r:2},
    {t:"First, second and third prizes are awarded among {n} entries in a science fair",r:3},
    {t:"A captain and an assistant captain are picked from a team of {n} players",r:2},
    {t:"{r} books are chosen from {n} books and arranged in order on a display stand",r:3}
  ];
  var cScen=[
    {t:"A committee of {r} is chosen from {n} volunteers",r:3},
    {t:"{r} toppings are chosen from a menu of {n} pizza toppings",r:3},
    {t:"A student picks {r} of {n} novels to pack for a trip",r:2},
    {t:"{r} members are selected from a class of {n} to attend a workshop",r:3},
    {t:"A hand of {r} cards is dealt from a set of {n} distinct cards",r:4}
  ];
  if(mode==="pair"){
    var p=pick(pScen), c=pick(cScen);
    var keyP="The first is a permutation and the second is a combination";
    var dis=u9opts(keyP,["The first is a combination and the second is a permutation","Both are permutations, because both involve choosing","Both are combinations, because both involve choosing"]);
    return mcq("Situation A: "+p.t.replace("{n}","9").replace("{r}","3")+". Situation B: "+c.t.replace("{n}","9").replace("{r}","3")+". Which classification is correct?",
      keyP,dis,
      "In Situation A the chosen items take distinct positions or roles, so switching the order gives a different outcome: a permutation. In Situation B only the group matters, so switching the order changes nothing: a combination.",
      {mode:mode});
  }
  var isP=Math.random()<0.5;
  var sc=isP?pick(pScen):pick(cScen);
  var n=ri(7,11), r=sc.r;
  var stem=sc.t.replace("{n}",n).replace("{r}",r)+". How many different outcomes are possible?";
  var key=isP?u9perm(n,r):u9comb(n,r);
  if(mode==="expr"){
    var dis2=u9opts(isP?"\\("+u9permS(n,r)+"\\)":"\\("+u9binS(n,r)+"\\)",[
      isP?"\\("+u9binS(n,r)+"\\)":"\\("+u9permS(n,r)+"\\)",
      "\\("+n+"!\\)","\\("+n+"^{"+r+"}\\)"]);
    return mcq(sc.t.replace("{n}",n).replace("{r}",r)+". Which expression gives the number of different outcomes?",
      isP?"\\("+u9permS(n,r)+"\\)":"\\("+u9binS(n,r)+"\\)",dis2,
      (isP
        ?"The chosen items fill distinct positions, so the order in which they are picked matters. That makes the count a permutation, \\("+u9permS(n,r)+" = "+u9big(key)+"\\)\\."
        :"Only the set of chosen items matters, so the order in which they are picked does not create a new outcome. That makes the count a combination, \\("+u9binS(n,r)+" = "+u9big(key)+"\\)\\."),
      {n:n,r:r,isP:isP,mode:mode});
  }
  var other=isP?u9comb(n,r):u9perm(n,r);
  var dis3=u9opts(u9big(key),[u9big(other),u9big(u9fact(n)),u9big(u9perm(n,r-1)),u9big(u9comb(n,r+1))]);
  if(!dis3) return numq(stem,key,0.001,isP?"Order matters, so the count is a permutation.":"Order does not matter, so the count is a combination.",{n:n,r:r,isP:isP,mode:mode});
  return mcq(stem,u9big(key),dis3,
    (isP
      ?"The outcomes differ when the order changes, so this is a permutation:\\[ \\begin{aligned} "+u9permS(n,r)+" &= "+u9big(key)+" \\end{aligned} \\]"
      :"The outcomes are groups only, so this is a combination:\\[ \\begin{aligned} "+u9binS(n,r)+" &= "+u9big(key)+" \\end{aligned} \\]"),
    {n:n,r:r,isP:isP,mode:mode});
});

/* ---------- 9.12: combinations in context (L2) ---------- */
E("u9-comb-basic",9,["9.12"],2,"gen",function(){
  var mode=pick(["single","single","two","include","mc"]);
  if(mode==="two"){
    var c=pick([
      {t:"A trail crew is formed with {x} of {a} guides and {y} of {b} drivers. How many different crews are possible?",x:2,y:2},
      {t:"A display case is filled with {x} of {a} fossils and {y} of {b} minerals. How many different displays are possible?",x:3,y:2},
      {t:"A delegation is made up of {x} of {a} teachers and {y} of {b} students. How many different delegations are possible?",x:2,y:3}
    ]);
    var a=ri(6,8), b=ri(5,7), key=u9comb(a,c.x)*u9comb(b,c.y);
    return numq(c.t.replace("{a}",a).replace("{b}",b).replace("{x}",c.x).replace("{y}",c.y),key,0.001,
      "Choose from each group separately, then multiply, since every choice from the first group can be paired with every choice from the second:\\[ \\begin{aligned} "+u9binS(a,c.x)+" \\times "+u9binS(b,c.y)+" &= "+u9comb(a,c.x)+" \\times "+u9comb(b,c.y)+" \\\\ &= "+u9big(key)+" \\end{aligned} \\]",
      {a:a,b:b,mode:mode});
  }
  if(mode==="include"){
    var ex=Math.random()<0.5;
    var n=ri(8,12), r=pick([3,4]);
    var key2=ex?u9comb(n-1,r):u9comb(n-1,r-1);
    return numq("A committee of "+r+" is chosen from "+n+" volunteers. How many committees "+(ex?"do not include":"include")+" one particular volunteer, Ms. Adey?",
      key2,0.001,
      (ex
        ?"If Ms. Adey is not on the committee, all "+r+" members come from the other "+(n-1)+" volunteers: \\("+u9binS(n-1,r)+" = "+u9big(key2)+"\\)\\."
        :"Fix Ms. Adey on the committee, then choose the remaining "+(r-1)+" members from the other "+(n-1)+" volunteers: \\("+u9binS(n-1,r-1)+" = "+u9big(key2)+"\\)\\."),
      {n:n,r:r,ex:ex,mode:mode});
  }
  var c2=pick([
    {t:"A committee of {r} is chosen from {n} volunteers. How many different committees are possible?"},
    {t:"A student chooses {r} books from a shelf of {n} to take home. How many different choices are possible?"},
    {t:"A bowl is filled with {r} pieces of fruit chosen from {n} different pieces. How many different bowls are possible?"},
    {t:"A playlist is made by choosing {r} songs from a list of {n}. How many different playlists are possible?"}
  ]);
  var n2=ri(7,12), r2=pick([2,3,4]);
  var key3=u9comb(n2,r2);
  if(mode==="mc"){
    var dis=u9opts(u9big(key3),[u9big(u9perm(n2,r2)),u9big(u9comb(n2,r2+1)),u9big(u9comb(n2-1,r2)),u9big(u9comb(n2,r2-1))]);
    if(dis) return mcq(c2.t.replace("{n}",n2).replace("{r}",r2),u9big(key3),dis,
      "Only the group chosen matters, not the order, so the count is a combination: \\("+u9binS(n2,r2)+" = "+u9big(key3)+"\\)\\.",
      {n:n2,r:r2,mode:mode});
  }
  return numq(c2.t.replace("{n}",n2).replace("{r}",r2),key3,0.001,
    "Only the group chosen matters, not the order, so the count is a combination:\\[ \\begin{aligned} "+u9binS(n2,r2)+" &= "+u9big(key3)+" \\end{aligned} \\]",
    {n:n2,r:r2,mode:mode});
});

/* ---------- 9.14, 9.15: symmetry and solving combination equations (L2) ---------- */
E("u9-comb-symmetry-solve",9,["9.14","9.15"],2,"gen",function(){
  var mode=pick(["sym","sym","missing","why","solven2","solven3","smallerr"]);
  if(mode==="sym"){
    var n=ri(9,14), r=pick([2,3,4]), v=u9comb(n,r);
    if(Math.random()<0.5){
      return numq("Given that \\("+u9binS(n,r)+" = "+u9big(v)+"\\), what is \\("+u9binS(n,n-r)+"\\)?",
        v,0.001,
        "Choosing "+r+" items to include automatically chooses the "+(n-r)+" items to leave out, so the two counts are the same: \\("+u9binS(n,n-r)+" = "+u9big(v)+"\\)\\.",
        {n:n,r:r,mode:mode});
    }
    return numq("Given that \\("+u9binS(n,n-r)+" = "+u9big(v)+"\\), what is \\("+u9binS(n,r)+"\\)?",
      v,0.001,
      "Choosing the "+(n-r)+" items to leave out automatically chooses the "+r+" items to include, so the two counts are the same: \\("+u9binS(n,r)+" = "+u9big(v)+"\\)\\.",
      {n:n,r:r,mode:mode});
  }
  if(mode==="missing"){
    var n2=ri(8,13), r2=pick([2,3,4]);
    return numq("If \\("+u9binS(n2,r2)+" = "+u9binS(n2,"k")+"\\), what is the value of \\(k\\)?",
      n2-r2,0.001,
      "Equal combinations with the same top number have lower numbers that add to the top number: \\(k = "+n2+" - "+r2+" = "+(n2-r2)+"\\)\\. (The value \\(k = "+r2+"\\) gives the same combination itself, so the other value is "+(n2-r2)+".)",
      {n:n2,r:r2,mode:mode});
  }
  if(mode==="why"){
    var n3=pick([9,10,11,12]), r3=pick([3,4]);
    var key="Choosing which "+r3+" of the "+n3+" items to include also decides which "+(n3-r3)+" items are left out, so the two choices are counted by the same number";
    var dis=u9opts(key,[
      "The factorials in the two expressions are the same because "+n3+" is even and the two lower numbers are close in size to each other",
      "Both expressions simplify to the same product of factors because the larger lower number always cancels more factors from the top number",
      "Pascal's triangle is symmetric left to right, and the equality is true because the triangle says so, as it does in every row"]);
    return mcq("Why is \\("+u9binS(n3,r3)+" = "+u9binS(n3,n3-r3)+"\\)?",
      key,dis,
      "A combination counts selections. Selecting the "+r3+" items to take is the very same act as selecting the "+(n3-r3)+" items to leave behind: each selection of one kind corresponds to exactly one selection of the other kind, so the counts agree.",
      {n:n3,r:r3,mode:mode});
  }
  if(mode==="solven2"||mode==="solven3"){
    var r4=(mode==="solven2"?2:3);
    var n4=ri(r4+3,r4+9), k4=u9comb(n4,r4);
    var ctx=Math.random()<0.5;
    var stem=ctx
      ? "A selection count for choosing "+r4+" items at a time from \\(n\\) items is "+u9big(k4)+". What is \\(n\\)?"
      : "Solve for \\(n\\): \\("+u9binS("n",r4)+" = "+u9big(k4)+"\\).";
    var dis4=u9opts(""+n4,[""+(n4-1),""+(n4+1),""+(n4+2),""+(n4-2)]);
    var body=(r4===2
      ? "\\frac{n(n - 1)}{2} &= "+u9big(k4)+" \\\\ n(n - 1) &= "+u9big(2*k4)+" \\\\ "+n4+" \\times "+(n4-1)+" &= "+u9big(2*k4)
      : "\\frac{n(n - 1)(n - 2)}{6} &= "+u9big(k4)+" \\\\ n(n - 1)(n - 2) &= "+u9big(6*k4)+" \\\\ "+n4+" \\times "+(n4-1)+" \\times "+(n4-2)+" &= "+u9big(6*k4));
    return mcq(stem,""+n4,dis4,
      "Expand the combination as a product of "+r4+" counting-down factors over \\("+r4+"!\\):\\[ \\begin{aligned} "+body+" \\end{aligned} \\] So \\(n = "+n4+"\\)\\.",
      {n:n4,r:r4,mode:mode});
  }
  var n5=pick([6,7,8,9,10,11,12]), r5=pick([2,3]), k5=u9comb(n5,r5);
  var dis5=u9opts(""+r5,[""+(r5===2?3:2),""+(n5-r5),"1",""+(r5+2),""+(n5-1)]);
  var sol5="Trying small values: \\("+u9binS(n5,r5)+" = "+u9big(k5)+"\\)\\. By the symmetry of combinations, the other solution is \\(r = "+n5+" - "+r5+" = "+(n5-r5)+"\\), so the smaller value is \\("+r5+"\\)\\.";
  if(!dis5) return numq("Find the smaller value of \\(r\\) for which \\("+u9binS(n5,"r")+" = "+u9big(k5)+"\\).",
    r5,0.001,sol5,{n:n5,r:r5,mode:mode});
  return mcq("Find the smaller value of \\(r\\) for which \\("+u9binS(n5,"r")+" = "+u9big(k5)+"\\).",
    ""+r5,dis5,sol5,
    {n:n5,r:r5,mode:mode});
});

/* ---------- 9.7, 9.13: why n must be at least r (L3, var) ---------- */
E("u9-why-n-ge-r",9,["9.7","9.13"],3,"var",varset([
  function(){
    return mcq("Why must \\(n \\ge r\\) in the notation \\("+u9permS("n","r")+"\\)?",
      "A permutation arranges \\(r\\) distinct elements drawn from a set of \\(n\\), and a set cannot supply more distinct elements than it has",
      ["Because \\("+u9permS("n","r")+"\\) must always be smaller than \\(n!\\), whatever the values of \\(n\\) and \\(r\\) are in the arrangement",
       "Because the formula divides by \\(r!\\), and dividing by a larger factorial is not allowed in the formula as written",
       "Because \\(r\\) counts positions, and a row of positions is never longer than the number written first in the notation, by definition"],
      "The notation \\("+u9permS("n","r")+"\\) counts arrangements of \\(r\\) different elements chosen from \\(n\\) elements. If \\(r > n\\), there are not enough distinct elements to fill the arrangement, and the formula \\(\\frac{n!}{(n - r)!}\\) would also call for the factorial of a negative number.",
      {v:1});
  },
  function(){
    return mcq("Why must \\(n \\ge r\\) in the notation \\("+u9binS("n","r")+"\\)?",
      "A combination selects \\(r\\) distinct elements from \\(n\\) elements, and no subset of an \\(n\\)-element set has more than \\(n\\) elements",
      ["Because the two lower numbers in a combination must always add to the top number in every case, by the symmetry rule",
       "Because combinations are only defined when the answer is a whole number greater than 1, and that needs enough elements",
       "Because Pascal's triangle has no entries beyond the edges of a row, and a combination must name an entry of the triangle to be read off"],
      "The notation \\("+u9binS("n","r")+"\\) counts the subsets of size \\(r\\) in a set of \\(n\\) elements. A subset cannot contain more elements than the set itself, so \\(r\\) can be at most \\(n\\); equality is allowed, since the whole set is one valid selection.",
      {v:2});
  },
  function(){
    return mcq("A student tries to evaluate \\("+u9permS(4,6)+"\\) by writing \\(4 \\times 3 \\times 2 \\times 1 \\times 0 \\times (-1)\\). What is wrong with this?",
      "The product for \\("+u9permS("n","r")+"\\) has \\(r\\) factors counting down from \\(n\\), but the elements run out after 4 factors, so \\("+u9permS(4,6)+"\\) is not defined",
      ["Nothing is wrong with the working; the result is 0 because one of the factors in the product is 0, as the student says",
       "The student should have stopped at 1 and reported the value 24, since extra factors are ignored in a product like this, as a matter of convention",
       "The error is that the factors should count down from 6, not from 4, since 6 is the larger number of the two"],
      "A permutation of 6 distinct elements taken from only 4 elements cannot be formed: after 4 factors there are no elements left to place. The notation requires \\(n \\ge r\\), so \\("+u9permS(4,6)+"\\) has no value.",
      {v:3});
  },
  function(){
    return mcq("Which statement about the boundary case \\(r = n\\) is true?",
      "\\("+u9permS("n","n")+" = n!\\) and \\("+u9binS("n","n")+" = 1\\), so equality is allowed in both notations",
      ["\\("+u9permS("n","n")+"\\) is not allowed, because a permutation must leave some elements unused",
       "\\("+u9binS("n","n")+"\\) is not defined, because choosing everything is not a choice",
       "Both notations require \\(n > r\\), so \\(r = n\\) must be handled by a separate rule"],
      "Taking all \\(n\\) elements is a legitimate choice in both systems: they can be arranged in \\(n!\\) orders, and there is exactly 1 way to select all of them. This is why the condition is \\(n \\ge r\\) and not \\(n > r\\).",
      {v:4});
  }
]));

/* ============ Constructed-response fit (tagging pass, November 2026) ============ */
/* Exam Section B draws only from these entries (marks per question); every other
   entry is selected-response only in exam mode. Worksheet mode uses these plus
   all numeric-answer entries. */
/* ---------- Unit-test pool fix, Nov 9, 2026: two Level 1 MC generators (the unit's two mixed-mode generators could not reliably field four distinct Level 1 MC questions), one Level 2 CR entry (3 marks) and one Level 3 CR entry (3 marks, opens the 6 pick with the existing 3-mark entry). ---------- */
/* Math span fix (Nov 21, 2026): bold answer restatements in this file's solutions moved outside the TeX spans (a tag inside a span defeats KaTeX auto-render and shows raw TeX); guarded by tests/gate-mathspan.js. */
E("u9-fcp-meal-mc",9,["9.3"],1,"gen",function(){
  var CTX=[
    "A cafeteria offers %a soups, %b main dishes and %c drinks. How many different meals, each consisting of one soup, one main dish and one drink, are possible?",
    "A clothing rack holds %a shirts, %b pairs of pants and %c hats. How many different outfits, each consisting of one shirt, one pair of pants and one hat, are possible?",
    "A travel site lists %a flights, %b hotels and %c tours for a trip. How many different packages, each consisting of one flight, one hotel and one tour, are possible?"
  ];
  var a=2,b=2,c=2,key=0,d1=0,d2=0,d3=0,tries=0;
  do { a=ri(2,6); b=ri(2,6); c=ri(2,5); key=a*b*c; d1=a+b+c; d2=(a+1)*b*c; d3=a*b+c; tries++; }
  while(new Set([key,d1,d2,d3]).size<4 && tries<60);
  var stem=pick(CTX).replace("%a",a).replace("%b",b).replace("%c",c);
  return mcq(stem,
    ""+key,
    [""+d1,""+d2,""+d3],
    "Each stage is an independent choice, so the Fundamental Counting Principle says to multiply: \\("+a+" \\times "+b+" \\times "+c+" = \\)<b>"+key+"</b>.",
    {a:a,b:b,c:c});
});
E("u9-word-arrange-mc",9,["9.5"],1,"gen",function(){
  var w=pick(["MAPLE","TIGER","BRISK","PLANT","WOLF","FROG","BEAR","CAMP","JUMP","QUIZ"]);
  var n=w.length, key=u9fact(n);
  return mcq("In how many different ways can the letters of the word "+w+" be arranged?",
    ""+u9big(key),
    [""+u9big(u9fact(n-1)),""+u9big(u9fact(n+1)),""+u9big(n*n)],
    "The word "+w+" has "+n+" letters, all different, so the arrangements are the permutations of "+n+" objects: \\("+n+"! = \\)<b>"+u9big(key)+"</b>.",
    {w:w});
});
E("u9-two-group-cr",9,["9.12"],2,"gen",function(){
  var CTX=[
    function(n1,a,n2,b){ return "A library display will feature "+a+" novels chosen from "+n1+" available novels and "+b+" poetry collections chosen from "+n2+" available collections. How many different displays are possible?"; },
    function(n1,a,n2,b){ return "A hockey coach must choose "+a+" forwards from "+n1+" forwards and "+b+" defence players from "+n2+" defence players. How many different selections are possible?"; },
    function(n1,a,n2,b){ return "A committee is formed by choosing "+a+" junior students from "+n1+" juniors and "+b+" senior students from "+n2+" seniors. How many different committees are possible?"; }
  ];
  var n1=ri(6,10), a=ri(2,4), n2=ri(5,9), b=ri(2,3);
  var c1=u9comb(n1,a), c2=u9comb(n2,b), ans=c1*c2;
  return numq(pick(CTX)(n1,a,n2,b),
    ans,0.001,
    "The two choices are independent, so multiply the two combination counts: \\[ \\binom{"+n1+"}{"+a+"} \\times \\binom{"+n2+"}{"+b+"} = "+c1+" \\times "+c2+" = "+u9big(ans)+" \\] So the count is <b>"+u9big(ans)+"</b>.",
    {n1:n1,a:a,n2:n2,b:b});
});
E("u9-not-adjacent-cr",9,["9.10"],3,"gen",function(){
  var CTX=[
    function(n){ return n+" friends line up for a photo. In how many arrangements do two particular friends, Ava and Ben, <b>not</b> stand next to each other?"; },
    function(n){ return n+" different books are arranged in a row on a shelf. In how many arrangements are two particular books <b>not</b> placed side by side?"; },
    function(n){ return "All finishing orders of "+n+" horses in a race are counted. In how many orders do two particular horses <b>not</b> finish in consecutive positions?"; }
  ];
  var n=pick([5,6,7]), total=u9fact(n), together=2*u9fact(n-1), ans=total-together;
  return numq(pick(CTX)(n),
    ans,0.001,
    "Count every arrangement, then subtract the arrangements where the two are together. There are \\("+n+"! = "+u9big(total)+"\\) arrangements in total. Treating the pair as a single block gives "+(n-1)+" objects, which can be arranged in \\("+(n-1)+"! = "+u9big(u9fact(n-1))+"\\) ways, and the pair itself can be ordered in 2 ways, so the number with the two together is \\(2 \\times "+(n-1)+"! = "+u9big(together)+"\\). The number with the two apart is \\("+u9big(total)+" - "+u9big(together)+" = \\)<b>"+u9big(ans)+"</b>.",
    {n:n});
});

/* ---------- 9.12: pathways on a grid, combinations in disguise. Split by ruling 49 (Nov 13, 2026): the diagram arms (plain, straight waypoint) sit at Level 2 here; the blocked grid and the story arms sit at Level 3 in u9-pathways-context below. ---------- */
function u9pathSVG(m,n,opt){
  opt=opt||{};
  var cell=(m>5||n>5)?31:36;
  var L=30,R=30,T=20,B=20,W=L+m*cell+R,H=T+n*cell+B;
  function X(i){return L+i*cell;}
  function Y(j){return T+(n-j)*cell;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:'+Math.min(W,360)+'px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var i,j;
  for(i=0;i<=m;i++)out+='<line x1="'+X(i)+'" y1="'+Y(0)+'" x2="'+X(i)+'" y2="'+Y(n)+'" stroke="#a89f83" stroke-width="1.1"/>';
  for(j=0;j<=n;j++)out+='<line x1="'+X(0)+'" y1="'+Y(j)+'" x2="'+X(m)+'" y2="'+Y(j)+'" stroke="#a89f83" stroke-width="1.1"/>';
  for(i=0;i<=m;i++)for(j=0;j<=n;j++){
    if(opt.blk&&opt.blk[0]===i&&opt.blk[1]===j)continue;
    if(opt.wp&&opt.wp[0]===i&&opt.wp[1]===j)continue;
    out+='<circle cx="'+X(i)+'" cy="'+Y(j)+'" r="2.2" fill="'+FIG_INK+'"/>';
  }
  if(opt.blk){
    var bx=X(opt.blk[0]),by=Y(opt.blk[1]);
    out+='<line x1="'+(bx-6)+'" y1="'+(by-6)+'" x2="'+(bx+6)+'" y2="'+(by+6)+'" stroke="'+FIG_ALT+'" stroke-width="2.4"/>';
    out+='<line x1="'+(bx-6)+'" y1="'+(by+6)+'" x2="'+(bx+6)+'" y2="'+(by-6)+'" stroke="'+FIG_ALT+'" stroke-width="2.4"/>';
  }
  if(opt.wp){
    out+='<circle cx="'+X(opt.wp[0])+'" cy="'+Y(opt.wp[1])+'" r="5.2" fill="'+FIG_ACC+'" stroke="#fff" stroke-width="1.6"/>';
    out+='<text x="'+(X(opt.wp[0])+9)+'" y="'+(Y(opt.wp[1])-8)+'" font-size="12" fill="'+FIG_INK+'">P</text>';
  }
  out+='<circle cx="'+X(0)+'" cy="'+Y(0)+'" r="5" fill="'+FIG_INK+'"/>';
  out+='<text x="'+(X(0)-9)+'" y="'+(Y(0)+4)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">A</text>';
  out+='<circle cx="'+X(m)+'" cy="'+Y(n)+'" r="5" fill="'+FIG_INK+'"/>';
  out+='<text x="'+(X(m)+9)+'" y="'+(Y(n)+4)+'" font-size="12" fill="'+FIG_INK+'">B</text>';
  return out+'</svg>';
}
E("u9-pathways",9,["9.12"],2,"gen",function(){
  var arm=pick(["plain","waypoint"]);
  if(arm==="plain"){
    var m=ri(2,6),n=ri(2,6);if(m+n>11)n=11-m;
    var ans=u9comb(m+n,m);
    var qp=numq("A path travels from point A to point B along the lines of the grid in the diagram, moving only to the right or up. Point B is "+m+" moves to the right and "+n+" moves up from point A. How many different paths are there from A to B?",
      ans,0.001,
      "Every path uses "+(m+n)+" moves in total: "+m+" to the right and "+n+" up, in some order. Choosing which "+m+" of the "+(m+n)+" moves are the rightward ones fixes the whole path, so the count is a combination:\\[ \\begin{aligned} "+u9binS(m+n,m)+" &= "+u9big(ans)+" \\end{aligned} \\] The tempting wrong counts miss the structure: "+m+" \\times "+n+" = "+(m*n)+" counts the blocks of the grid, and "+(m+n)+" counts only the moves in a single path.",
      {arm:arm,m:m,n:n});
    qp.figure=u9pathSVG(m,n,{});
    return qp;
  }
  if(arm==="waypoint"){
    var m2=ri(3,6),n2=ri(3,6),px=ri(1,m2-1),py=ri(1,n2-1);
    var leg1=u9comb(px+py,px),leg2=u9comb((m2-px)+(n2-py),m2-px),ans2=leg1*leg2;
    var qw=numq("A path travels from point A to point B along the lines of the grid in the diagram, moving only to the right or up, and the path must pass through point P. How many different paths are there from A to B through P?",
      ans2,0.001,
      "Split the journey at P. From A to P the path makes "+px+" rightward and "+py+" upward moves, in any order: \\("+u9binS(px+py,px)+" = "+leg1+"\\) paths. From P to B it makes "+(m2-px)+" rightward and "+(n2-py)+" upward moves: \\("+u9binS((m2-px)+(n2-py),m2-px)+" = "+leg2+"\\) paths. Every first leg can be followed by every second leg, so multiply: \\("+leg1+" \\times "+leg2+" = "+u9big(ans2)+"\\).",
      {arm:arm,m:m2,n:n2,px:px,py:py});
    qw.figure=u9pathSVG(m2,n2,{wp:[px,py]});
    return qw;
  }
});

/* ---------- 9.12: pathways in context, the blocked grid and the grid hidden in a story (L3) ---------- */
E("u9-pathways-context",9,["9.12"],3,"gen",function(){
  var arm=pick(["blocked","context","ctxwp"]);
  if(arm==="blocked"){
    var m3=ri(3,6),n3=ri(3,6),bx=ri(1,m3-1),by=ri(1,n3-1);
    var tot=u9comb(m3+n3,m3),thru=u9comb(bx+by,bx)*u9comb((m3-bx)+(n3-by),m3-bx),ans3=tot-thru;
    var qb=numq("A path travels from point A to point B along the lines of the grid in the diagram, moving only to the right or up. The intersection marked with a cross cannot be used. How many different paths from A to B avoid the marked intersection?",
      ans3,0.001,
      "Count all the paths, then remove the ones that use the marked intersection. In total there are \\("+u9binS(m3+n3,m3)+" = "+tot+"\\) paths. A path through the marked intersection is two legs: A to the intersection in \\("+u9binS(bx+by,bx)+"\\) ways and onward to B in \\("+u9binS((m3-bx)+(n3-by),m3-bx)+"\\) ways, giving "+thru+" paths to remove. Avoiding it: \\("+tot+" - "+thru+" = "+u9big(ans3)+"\\).",
      {arm:arm,m:m3,n:n3,bx:bx,by:by});
    qb.figure=u9pathSVG(m3,n3,{blk:[bx,by]});
    return qb;
  }
  if(arm==="ctxwp"){
    var stp=pick(["the falls viewpoint","the picnic shelter","the duck pond","the gardens"]);
    var m5=ri(3,5),n5=ri(3,5),sx=ri(1,m5-1),sy=ri(1,n5-1);
    var sleg1=u9comb(sx+sy,sx),sleg2=u9comb((m5-sx)+(n5-sy),m5-sx),ans5=sleg1*sleg2;
    var qs=numq("In a park, trails run along the lines of the grid in the diagram. A walker travels from the gate at point A to the lookout at point B, following trails only to the right or up, and stops at "+stp+" on the way. The stop is marked as point P in the diagram: it is "+sx+" trail sections to the right and "+sy+" sections up from the gate, and the lookout is "+m5+" sections to the right and "+n5+" sections up from the gate. How many different routes can the walker take that pass the stop?",
      ans5,0.001,
      "Pull the grid out of the story first: rightward and upward sections are the moves, and the stop splits the walk into two legs. From the gate to "+stp+" the walker makes "+sx+" rightward and "+sy+" upward sections, in any order: \\("+u9binS(sx+sy,sx)+" = "+sleg1+"\\) routes. From the stop to the lookout the walker makes "+(m5-sx)+" rightward and "+(n5-sy)+" upward sections: \\("+u9binS((m5-sx)+(n5-sy),m5-sx)+" = "+sleg2+"\\) routes. Every first leg can be followed by every second leg, so multiply: \\("+sleg1+" \\times "+sleg2+" = "+u9big(ans5)+"\\). The trail grid is a combination in disguise on each leg: the sections travelled are chosen, not arranged one by one.",
      {arm:arm,m:m5,n:n5,px:sx,py:sy});
    qs.figure=u9pathSVG(m5,n5,{wp:[sx,sy]});
    return qs;
  }
  var m4=ri(2,5),n4=ri(2,5),ans4=u9comb(m4+n4,m4);
  var qc=numq("In a park, trails run along the lines of the grid in the diagram. A walker travels from the gate at point A to the lookout at point B, following trails only to the right or up. The lookout is "+m4+" trail sections to the right and "+n4+" trail sections up from the gate. How many different routes can the walker take?",
    ans4,0.001,
    "Lay the walk out as moves: every route makes "+m4+" rightward sections and "+n4+" upward sections, "+(m4+n4)+" sections in total, and the route is fixed once the positions of the "+m4+" rightward sections among the "+(m4+n4)+" are chosen:\\[ \\begin{aligned} "+u9binS(m4+n4,m4)+" &= "+u9big(ans4)+" \\end{aligned} \\] The trail grid is a combination in disguise: the sections travelled are chosen, not arranged one by one.",
    {arm:arm,m:m4,n:n4});
  qc.figure=u9pathSVG(m4,n4,{});
  return qc;
});
