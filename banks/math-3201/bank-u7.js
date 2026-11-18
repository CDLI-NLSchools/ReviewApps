// Math 3201 Unit 7 Set Theory question bank
// CRMARKS: u7-complement-elements=1
// CRMARKS: u7-deduction-mc=1
// CRMARKS: u7-error-correct=2
// CRMARKS: u7-error-venn=2
// CRMARKS: u7-exactly-two-cr=3
// CRMARKS: u7-operations=2
// CRMARKS: u7-region-meaning=1
// CRMARKS: u7-relations-count-cr=2
// CRMARKS: u7-search-logic=1
// CRMARKS: u7-subset-difference-cr=2
// CRMARKS: u7-symmetric-difference-cr=3
// CRMARKS: u7-three-set-problem=2
// CRMARKS: u7-two-set-notation=1
// CRMARKS: u7-two-set-problem=1
// CRMARKS: u7-two-set-totals-cr=3
// CRMARKS: u7-venn-fill=1
// CRMARKS: u7-venn-missing=2
// CRMARKS: u7-venn-read=1
// CRMARKS: u7-venn-three-read=2
/* ================= Unit 7: Set Theory ================= */
function roster(arr){return arr.length?"{"+arr.join(", ")+"}":"∅";}
var U7PROPS=[
  {n:"even numbers",f:function(x){return x%2===0;}},
  {n:"odd numbers",f:function(x){return x%2===1;}},
  {n:"multiples of 3",f:function(x){return x%3===0;}},
  {n:"multiples of 4",f:function(x){return x%4===0;}},
  {n:"prime numbers",f:function(x){return [2,3,5,7,11,13,17,19].indexOf(x)>=0;}},
  {n:"factors of 12",f:function(x){return 12%x===0;}},
  {n:"perfect squares",f:function(x){return [1,4,9,16].indexOf(x)>=0;}},
  {n:"numbers greater than 7",f:function(x){return x>7;}},
  {n:"numbers less than 5",f:function(x){return x<5;}},
  {n:"multiples of 5",f:function(x){return x%5===0;}}
];
function u7Universe(){var m=pick([10,12,15,20]),U=[];for(var i=1;i<=m;i++)U.push(i);return U;}
function u7set(p,U){return U.filter(p.f);}
function u7pair(filterFn,U){
  var pairs=[];U7PROPS.forEach(function(a){U7PROPS.forEach(function(b){if(a!==b)pairs.push([a,b]);});});
  pairs=shuffle(pairs);
  for(var i=0;i<pairs.length;i++){var A=u7set(pairs[i][0],U),B=u7set(pairs[i][1],U);if(filterFn(A,B,U))return {pa:pairs[i][0],pb:pairs[i][1],A:A,B:B};}
  return null;
}

/* --- concepts in context (2.1) --- */
E("u7-set-concepts",7,["2.1"],1,"var",varset([
  function(){return mcq("A teacher asks for the set of months of the year that have 32 days. What kind of set is this?",
    "The empty set, because no month has 32 days",
    ["The universal set, because it involves the whole calendar","A subset of the set of months with 31 days","A disjoint set, because the months are all different"],
    "The set contains no elements at all, which makes it the empty set, written ∅. A set with no members is not a universal set or a subset in the sense meant here; those terms describe relationships, and this set simply has nothing in it.",{});},
  function(){return mcq("In a school, let A be the set of students in the chess club and B be the set of students in the band. No student belongs to both. The sets A and B are called",
    "disjoint sets",
    ["equal sets","complementary sets","universal sets"],
    "Disjoint sets have no elements in common, and here the overlap is empty by the given information. The sets are not equal (they hold different students), and neither is the complement of the other unless together they covered every student, which is not stated.",{});},
  function(){return mcq("Let U be the set of all students in a school, and let G be the set of grade 9 students in that school. Which statement is true?",
    "G is a subset of U, because every grade 9 student in the school is a student in the school",
    ["U is a subset of G, because U is the bigger set and the bigger set always contains the smaller one","G is disjoint from U, because grade 9 is only one grade and different grades never overlap","G is the complement of U, because it names only the grade 9 students and leaves out all the rest"],
    "A set is a subset of another when every element of the first is also in the second. Every member of G is by definition a member of U, so G is a subset of U. The larger set is never a subset of the smaller one here.",{});},
  function(){return mcq("A survey asks the 28 students in one class about their weekend jobs. For this survey, the <b>universal set</b> is",
    "the 28 students in the class who were surveyed",
    ["all students in the school, in every grade level","all teenagers in the province, wherever they live","the students who have weekend jobs"],
    "The universal set is the set of everything under consideration for the problem at hand. Here every question is about the 28 surveyed students, so they form the universal set; the students with jobs are just a subset of it.",{});}
]));
E("u7-subset-relation",7,["2.1"],2,"gen",function(){
  var U=u7Universe();
  var got=u7pair(function(A,B){
    var subAB=A.every(function(x){return B.indexOf(x)>=0;}),subBA=B.every(function(x){return A.indexOf(x)>=0;});
    var eq=A.length===B.length&&subAB,disj=A.every(function(x){return B.indexOf(x)<0;});
    return !eq&&(subAB||subBA||disj);
  },U);
  var A=got.A,B=got.B;
  var subAB=A.every(function(x){return B.indexOf(x)>=0;}),subBA=B.every(function(x){return A.indexOf(x)>=0;});
  var correct=subAB?"A is a subset of B":subBA?"B is a subset of A":"A and B are disjoint";
  return mcq("Let U = {1, 2, ..., "+U.length+"}. A is the set of "+got.pa.n+" and B is the set of "+got.pb.n+". Which statement is true?",
    correct,
    ["A is a subset of B","B is a subset of A","A and B are disjoint","A and B are equal"].filter(function(s){return s!==correct;}),
    "List the sets: A = "+roster(A)+" and B = "+roster(B)+". "+(subAB?"Every element of A appears in B, so A is a subset of B.":subBA?"Every element of B appears in A, so B is a subset of A.":"The two lists share no element at all, so the sets are disjoint.")+" The sets are not equal, since their lists differ.",
    {a:got.pa.n,b:got.pb.n});
});
E("u7-disjoint-check",7,["2.1"],2,"gen",function(){
  var U=u7Universe();
  var got=u7pair(function(A,B){
    var inter=A.filter(function(x){return B.indexOf(x)>=0;});
    if(inter.length>1)return false;
    if(inter.length===1)return A.length>inter.length&&B.length>inter.length;
    return true;
  },U);
  var A=got.A,B=got.B,inter=A.filter(function(x){return B.indexOf(x)>=0;});
  var aOnly=A.filter(function(x){return B.indexOf(x)<0;}),bOnly=B.filter(function(x){return A.indexOf(x)<0;});
  var neither=U.filter(function(x){return A.indexOf(x)<0&&B.indexOf(x)<0;});
  if(inter.length===1)return mcq("Let U = {1, 2, ..., "+U.length+"}. A is the set of "+got.pa.n+" and B is the set of "+got.pb.n+". Which statement about A and B is true?",
    inter[0]+" is in both A and B, so A and B are not disjoint",
    [aOnly[0]+" is in both A and B, so A and B are not disjoint",bOnly[0]+" is in both A and B, so A and B are not disjoint","A and B are disjoint: they have no elements in common"],
    "A = "+roster(A)+" and B = "+roster(B)+". Comparing the lists, the only element appearing in both is "+inter[0]+", so the sets overlap but are not disjoint. "+aOnly[0]+" is only in A and "+bOnly[0]+" is only in B.",
    {a:got.pa.n,b:got.pb.n});
  return mcq("Let U = {1, 2, ..., "+U.length+"}. A is the set of "+got.pa.n+" and B is the set of "+got.pb.n+". Which statement about A and B is true?",
    "A and B are disjoint: they have no elements in common",
    [A[0]+" is in both A and B, so A and B are not disjoint",B[0]+" is in both A and B, so A and B are not disjoint",neither[0]+" is in both A and B, so A and B are not disjoint"],
    "A = "+roster(A)+" and B = "+roster(B)+". No element appears in both lists, so the sets are disjoint. Each distractor names an element from only one set (or from neither).",
    {a:got.pa.n,b:got.pb.n});
});
/* --- elements of operations (2.4) --- */
/* --- elements of operations (2.4) --- */
E("u7-complement-elements",7,["2.4"],1,"gen",function(){
  var n=pick([8,9,10,11,12]),U=[];for(var i=1;i<=n;i++)U.push(i);
  var size=pick([3,4,5,6]),A=shuffle(U.slice()).slice(0,size).sort(function(a,b){return a-b;});
  var comp=U.filter(function(x){return A.indexOf(x)<0;});
  var mod=comp.slice();mod.splice(0,1);mod.push(A[0]);mod.sort(function(a,b){return a-b;});
  var plus=comp.concat([A[1]]).sort(function(a,b){return a-b;});
  return mcq("Let U = {1, 2, ..., "+n+"} and A = "+roster(A)+". What is the complement of A, written A'?",
    roster(comp),
    [roster(A),roster(mod),roster(plus)],
    "The complement A' holds every element of the universal set that is not in A. Removing "+roster(A)+" from U leaves "+roster(comp)+". The second distractor swaps one element wrongly, and the third keeps an element of A in the complement.",
    {n:n,size:size});
});
E("u7-operations",7,["2.4"],2,"gen",function(){
  var ops=[
    {key:"union",label:"A \\cup B",calc:function(A,B,U){return U.filter(function(x){return A.indexOf(x)>=0||B.indexOf(x)>=0;});}},
    {key:"inter",label:"A \\cap B",calc:function(A,B,U){return A.filter(function(x){return B.indexOf(x)>=0;});}},
    {key:"compA",label:"A'",calc:function(A,B,U){return U.filter(function(x){return A.indexOf(x)<0;});}},
    {key:"compB",label:"B'",calc:function(A,B,U){return U.filter(function(x){return B.indexOf(x)<0;});}},
    {key:"compUnion",label:"(A \\cup B)'",calc:function(A,B,U){return U.filter(function(x){return A.indexOf(x)<0&&B.indexOf(x)<0;});}},
    {key:"interCompB",label:"A \\cap B'",calc:function(A,B,U){return A.filter(function(x){return B.indexOf(x)<0;});}},
    {key:"compInter",label:"(A \\cap B)'",calc:function(A,B,U){var inter=A.filter(function(x){return B.indexOf(x)>=0;});return U.filter(function(x){return inter.indexOf(x)<0;});}}
  ];
  var U=u7Universe(),got=null,op=null,result=null,tries=0;
  while(tries++<60){
    var g=u7pair(function(){return true;},U);if(!g)break;
    var o=pick(ops),res=o.calc(g.A,g.B,U);
    var others=ops.filter(function(x){return x!==o;}).map(function(x){return x.calc(g.A,g.B,U);});
    var seen={},cands=[];
    others.forEach(function(r){var k=r.join(",");if(k!==res.join(",")&&!seen[k]){seen[k]=1;cands.push(r);}});
    if(cands.length>=2){got=g;op=o;result=res;break;}
  }
  if(!got){got=u7pair(function(){return true;},U);op=ops[0];result=op.calc(got.A,got.B,U);}
  var distract=ops.filter(function(x){return x!==op;}).map(function(x){return x.calc(got.A,got.B,U);})
    .filter(function(r,idx,arr){return r.join(",")!==result.join(",")&&arr.findIndex(function(y){return y.join(",")===r.join(",");})===idx;}).slice(0,3);
  if(distract.length<3){var mod=result.slice();if(mod.length)mod.splice(mod.length-1,1);else mod=[1];distract.push(mod);}
  return mcq("Let U = {1, 2, ..., "+U.length+"}, A = the set of "+got.pa.n+", and B = the set of "+got.pb.n+". What is \\("+op.label+"\\)?",
    roster(result),
    distract.map(roster),
    "First list the sets: A = "+roster(got.A)+" and B = "+roster(got.B)+". Applying the operation gives "+roster(result)+". Each distractor is a different operation on the same two sets, so work out exactly which operation the question names before listing elements.",
    {op:op.key,a:got.pa.n,b:got.pb.n});
});
/* --- what a region represents (2.3) --- */
var U7CTX=[
  {lA:"Soccer",lB:"Hockey",aP:"play soccer",bP:"play hockey"},
  {lA:"Music",lB:"Art",aP:"take music",bP:"take art"},
  {lA:"French",lB:"Spanish",aP:"speak French",bP:"speak Spanish"},
  {lA:"Bicycle",lB:"Skateboard",aP:"own a bicycle",bP:"own a skateboard"},
  {lA:"Chess",lB:"Robotics",aP:"belong to the chess club",bP:"belong to the robotics club"},
  {lA:"Job",lB:"Volunteering",aP:"have a part-time job",bP:"volunteer at the food bank"}
];
var U7REGIONS=[
  {key:"Aonly",phrase:function(c){return "students who "+c.aP+" but do not "+c.bP;},notn:"A \\cap B'",mark:[66,80]},
  {key:"Bonly",phrase:function(c){return "students who "+c.bP+" but do not "+c.aP;},notn:"A' \\cap B",mark:[154,80]},
  {key:"both",phrase:function(c){return "students who "+c.aP+" and "+c.bP;},notn:"A \\cap B",mark:[110,80]},
  {key:"neither",phrase:function(c){return "students who do not "+c.aP+" and do not "+c.bP;},notn:"(A \\cup B)'",mark:[196,132]},
  {key:"either",phrase:function(c){return "students who "+c.aP+" or "+c.bP+" (or both)";},notn:"A \\cup B",mark:null},
  {key:"notA",phrase:function(c){return "students who do not "+c.aP;},notn:"A'",mark:null}
];
E("u7-region-meaning",7,["2.3"],1,"gen",function(){
  var c=pick(U7CTX),reg=pick(U7REGIONS),style=pick(["pos","phrase2not","not2phrase"]);
  if(style==="pos"&&!reg.mark)style="phrase2not";
  var others=shuffle(U7REGIONS.filter(function(r){return r!==reg;}));
  var fig=venn2(null,null,null,null,c.lA,c.lB,style==="pos"?reg.mark:null);
  var head="In a Venn diagram of a student survey, circle A represents students who "+c.aP+" and circle B represents students who "+c.bP+". ";
  if(style==="pos"){var q=mcq(head+"The region marked with a star represents",
    reg.phrase(c),
    [others[0].phrase(c),others[1].phrase(c),others[2].phrase(c)],
    "Read the star's position: it sits "+(reg.key==="Aonly"?"inside A but outside B":reg.key==="Bonly"?"inside B but outside A":reg.key==="both"?"inside both circles":"outside both circles")+", so it represents "+reg.phrase(c)+". In set notation this region is \\("+reg.notn+"\\).",
    {ctx:c.lA,reg:reg.key,style:style}); q.figure=fig; return q;}
  if(style==="phrase2not"){var q=mcq(head+"Which set notation represents: "+reg.phrase(c)+"?",
    MV(reg.notn),
    [MV(others[0].notn),MV(others[1].notn),MV(others[2].notn)],
    "\"And\" between conditions means intersection, \"or\" means union, and \"do not\" adds a complement. The description matches \\("+reg.notn+"\\): check each distractor by reading it back into words.",
    {ctx:c.lA,reg:reg.key,style:style}); q.figure=fig; return q;}
  var q=mcq(head+"Which description matches the set notation \\("+reg.notn+"\\)?",
    reg.phrase(c),
    [others[0].phrase(c),others[1].phrase(c),others[2].phrase(c)],
    "Read the notation piece by piece: \\(\\cap\\) is \"and\", \\(\\cup\\) is \"or\", and a prime means \"not\". That gives: "+reg.phrase(c)+".",
    {ctx:c.lA,reg:reg.key,style:style}); q.figure=fig; return q;
});

/* --- organizing information in Venn diagrams (2.2) --- */
var U7SURVEY=[
  {lA:"Soccer",lB:"Hockey",aP:"play soccer",bP:"play hockey"},
  {lA:"Music",lB:"Art",aP:"take music",bP:"take art"},
  {lA:"French",lB:"Spanish",aP:"study French",bP:"study Spanish"},
  {lA:"Band",lB:"Choir",aP:"are in the band",bP:"are in the choir"},
  {lA:"Basketball",lB:"Volleyball",aP:"play basketball",bP:"play volleyball"}
];
function u7regions(){return {aO:ri(3,16),both:ri(2,11),bO:ri(3,16),none:ri(0,11)};}
E("u7-venn-read",7,["2.2"],1,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions(),fig=venn2(r.aO,r.both,r.bO,r.none,c.lA,c.lB,null);
  var total=r.aO+r.both+r.bO+r.none,union=r.aO+r.both+r.bO;
  var target=pick(["aonly","both","bonly","none","inA","inB","union","total"]);
  var Q={
    aonly:["How many students "+c.aP+" but do not "+c.bP+"?",r.aO,"That is the region inside circle A only, which shows "+r.aO+"."],
    both:["How many students both "+c.aP+" and "+c.bP+"?",r.both,"That is the overlap region, which shows "+r.both+"."],
    bonly:["How many students "+c.bP+" but do not "+c.aP+"?",r.bO,"That is the region inside circle B only, which shows "+r.bO+"."],
    none:["How many students do neither activity?",r.none,"That is the region outside both circles, which shows "+r.none+"."],
    inA:["How many students "+c.aP+" (including those who do both)?",r.aO+r.both,"Everyone in circle A: the A-only region plus the overlap, \\("+r.aO+" + "+r.both+" = "+(r.aO+r.both)+"\\)."],
    inB:["How many students "+c.bP+" (including those who do both)?",r.bO+r.both,"Everyone in circle B: the B-only region plus the overlap, \\("+r.bO+" + "+r.both+" = "+(r.bO+r.both)+"\\)."],
    union:["How many students do at least one of the two activities?",union,"Add the three regions inside the circles: \\("+r.aO+" + "+r.both+" + "+r.bO+" = "+union+"\\). The outside region is excluded."],
    total:["How many students were surveyed in total?",total,"Add all four regions, including the students outside both circles: \\("+r.aO+" + "+r.both+" + "+r.bO+" + "+r.none+" = "+total+"\\)."]
  }[target];
  var q=numq("A survey of students produced this Venn diagram (A: "+c.lA+", B: "+c.lB+"). "+Q[0],
    Q[1],0.001,Q[2],{ctx:c.lA,target:target}); q.figure=fig; return q;
});
E("u7-venn-fill",7,["2.2"],2,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions();
  var nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var target=pick(["aonly","bonly","none","union"]);
  var head="In a survey of "+total+" students, "+nA+" "+c.aP+", "+nB+" "+c.bP+", and "+r.both+" do both. ";
  if(target==="aonly"){var q=numq(head+"How many students "+c.aP+" only?",
    r.aO,0.001,"Work from the overlap outwards: of the "+nA+" students in A, "+r.both+" are also in B, so \\[ \\begin{aligned} n(A \\cap B') &= n(A) - n(A \\cap B) \\\\ &= "+nA+" - "+r.both+" \\\\ &= "+r.aO+" \\end{aligned} \\]",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,c.lA,c.lB,null); return q;}
  if(target==="bonly"){var q=numq(head+"How many students "+c.bP+" only?",
    r.bO,0.001,"Work from the overlap outwards: of the "+nB+" students in B, "+r.both+" are also in A, so \\[ \\begin{aligned} n(A' \\cap B) &= n(B) - n(A \\cap B) \\\\ &= "+nB+" - "+r.both+" \\\\ &= "+r.bO+" \\end{aligned} \\]",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,c.lA,c.lB,null); return q;}
  if(target==="union"){var q=numq(head+"How many students do at least one of the two activities?",
    union,0.001,"Use the union formula so the overlap is not counted twice: \\[ \\begin{aligned} n(A \\cup B) &= n(A) + n(B) - n(A \\cap B) \\\\ &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\end{aligned} \\]",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,c.lA,c.lB,null); return q;}
  var q=numq(head+"How many students do neither activity?",
    r.none,0.001,"First the union, then subtract from the total surveyed: \\[ \\begin{aligned} n(A \\cup B) &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\\\ n((A \\cup B)') &= "+total+" - "+union+" \\\\ &= "+r.none+" \\end{aligned} \\]",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,c.lA,c.lB,null); return q;
});
E("u7-venn-missing",7,["2.2"],2,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions(),total=r.aO+r.both+r.bO+r.none;
  if(Math.random()<0.5){var q=numq("A Venn diagram for a survey (A: "+c.lA+", B: "+c.lB+") shows "+r.aO+" students in A only, "+r.both+" in both, "+r.bO+" in B only, and "+r.none+" in neither. How many students were surveyed?",
    total,0.001,"Every surveyed student sits in exactly one region, so add all four regions: \\("+r.aO+" + "+r.both+" + "+r.bO+" + "+r.none+" = "+total+"\\).",{ctx:c.lA}); q.figure=venn2(r.aO,r.both,r.bO,r.none,c.lA,c.lB,null); return q;}
  var q=numq("A survey of "+total+" students (A: "+c.lA+", B: "+c.lB+") has a Venn diagram showing "+r.both+" students in both sets, "+r.bO+" in B only, and "+r.none+" in neither. How many students are in A only?",
    r.aO,0.001,"The four regions must add to the total surveyed, so the missing region is \\("+total+" - "+r.both+" - "+r.bO+" - "+r.none+" = "+r.aO+"\\) students.",{ctx:c.lA}); q.figure=venn2("?",r.both,r.bO,r.none,c.lA,c.lB,null); return q;
});
E("u7-venn-three-read",7,["2.2"],1,"gen",function(){
  var r={a:ri(1,9),b:ri(1,9),c:ri(1,9),ab:ri(0,7),ac:ri(0,7),bc:ri(0,7),abc:ri(1,5),none:ri(0,9)};
  var fig=venn3(r.a,r.b,r.c,r.ab,r.ac,r.bc,r.abc,r.none,"Skiing","Skating","Hockey");
  var target=pick(["bonly","acnotb","allthree","atleasttwo","none"]);
  var Q={
    bonly:["How many students go skating only?",r.b,"The skating-only region of the diagram shows "+r.b+"."],
    acnotb:["How many students ski and play hockey but do not skate?",r.ac,"That region is inside the skiing and hockey circles but outside skating: it shows "+r.ac+"."],
    allthree:["How many students do all three activities?",r.abc,"The centre region, inside all three circles, shows "+r.abc+"."],
    atleasttwo:["How many students do at least two of the three activities?",r.ab+r.ac+r.bc+r.abc,"Add the regions that lie in two or more circles: \\("+r.ab+" + "+r.ac+" + "+r.bc+" + "+r.abc+" = "+(r.ab+r.ac+r.bc+r.abc)+"\\) (the three overlap-only regions plus the centre)."],
    none:["How many students do none of the three activities?",r.none,"That is the region outside all three circles, which shows "+r.none+"."]
  }[target];
  var q=numq("A survey about winter activities produced this three-set Venn diagram. "+Q[0],
    Q[1],0.001,Q[2],{target:target}); q.figure=fig; return q;
});
/* --- contextual problems with set notation (2.5) --- */
E("u7-two-set-problem",7,["2.5"],2,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions();
  var nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var target=pick(["none","aonly","bonly"]);
  var head="In a survey of "+total+" students, "+nA+" "+c.aP+", "+nB+" "+c.bP+", and "+r.both+" do both. ";
  var fig=venn2(r.aO,r.both,r.bO,r.none,"A","B");
  var fill="Fill the Venn diagram from the overlap out. The overlap is \\("+r.both+"\\). Taking it out of each set total leaves \\("+nA+" - "+r.both+" = "+r.aO+"\\) in A only and \\("+nB+" - "+r.both+" = "+r.bO+"\\) in B only, with \\("+r.none+"\\) outside both circles:<br><div style='text-align:center'>"+fig+"</div>";
  if(target==="none"){var q=numq(head+"How many students do <b>neither</b> activity?",
    r.none,0.001,fill+"Record the solution in set notation: \\[ \\begin{aligned} n(A \\cup B) &= n(A) + n(B) - n(A \\cap B) \\\\ &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\\\ n((A \\cup B)') &= "+total+" - "+union+" \\\\ &= "+r.none+" \\end{aligned} \\] The overlap is subtracted once in the union formula because those students were counted in both n(A) and n(B).",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,"A","B",null); return q;}
  if(target==="aonly"){var q=numq(head+"How many students "+c.aP+" <b>only</b>?",
    r.aO,0.001,fill+"In set notation the question asks for \\(n(A \\cap B')\\): \\[ \\begin{aligned} n(A \\cap B') &= n(A) - n(A \\cap B) \\\\ &= "+nA+" - "+r.both+" \\\\ &= "+r.aO+" \\end{aligned} \\] The students who do both must be removed from the A total.",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,"A","B",null); return q;}
  var q=numq(head+"How many students "+c.bP+" <b>only</b>?",
    r.bO,0.001,fill+"In set notation the question asks for \\(n(A' \\cap B)\\): \\[ \\begin{aligned} n(A' \\cap B) &= n(B) - n(A \\cap B) \\\\ &= "+nB+" - "+r.both+" \\\\ &= "+r.bO+" \\end{aligned} \\] The students who do both must be removed from the B total.",{ctx:c.lA,target:target}); q.figure=venn2(null,null,null,null,"A","B",null); return q;
});
E("u7-two-set-notation",7,["2.5"],2,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions();
  var nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var targets=[
    {label:"n(A \\cap B')",val:r.aO,why:"A but not B: the A total minus the overlap"},
    {label:"n(A' \\cap B)",val:r.bO,why:"B but not A: the B total minus the overlap"},
    {label:"n((A \\cup B)')",val:r.none,why:"outside both sets: the total surveyed minus the union"},
    {label:"n(A \\cup B)",val:union,why:"in at least one set: n(A) + n(B) minus the overlap"},
    {label:"n(A')",val:total-nA,why:"not in A: the total surveyed minus the A total"},
    {label:"n(B')",val:total-nB,why:"not in B: the total surveyed minus the B total"}
  ];
  var t=pick(targets);
  return numq("A survey of "+total+" students has \\(n(A) = "+nA+"\\), \\(n(B) = "+nB+"\\) and \\(n(A \\cap B) = "+r.both+"\\) (A: "+c.lA+", B: "+c.lB+"). Determine \\("+t.label+"\\).",
    t.val,0.001,"Translate the notation first: \\("+t.label+"\\) counts "+t.why+". Here that is \\("+t.val+"\\). Writing out what each symbol means before computing is the reliable route through notation questions.",{ctx:c.lA,target:t.label});
});
E("u7-three-set-problem",7,["2.5"],2,"gen",function(){
  var r={a:ri(2,12),b:ri(2,12),c:ri(2,12),ab:ri(1,8),ac:ri(1,8),bc:ri(1,8),abc:ri(1,5),none:ri(0,10)};
  var nA=r.a+r.ab+r.ac+r.abc,nB=r.b+r.ab+r.bc+r.abc,nC=r.c+r.ac+r.bc+r.abc;
  var pAB=r.ab+r.abc,pAC=r.ac+r.abc,pBC=r.bc+r.abc;
  var union=r.a+r.b+r.c+r.ab+r.ac+r.bc+r.abc,total=union+r.none;
  var head="A school surveyed "+total+" students about three activities: A (skiing), B (skating) and C (hockey). The counts are \\(n(A) = "+nA+"\\), \\(n(B) = "+nB+"\\), \\(n(C) = "+nC+"\\), \\(n(A \\cap B) = "+pAB+"\\), \\(n(A \\cap C) = "+pAC+"\\), \\(n(B \\cap C) = "+pBC+"\\) and \\(n(A \\cap B \\cap C) = "+r.abc+"\\). ";
  var fig=venn3(r.a,r.b,r.c,r.ab,r.ac,r.bc,r.abc,r.none,"A","B","C");
  var fill="Fill the Venn diagram from the centre out. The centre is \\("+r.abc+"\\). Each pair count includes the centre, so the pair-only regions are \\("+pAB+" - "+r.abc+" = "+r.ab+"\\), \\("+pAC+" - "+r.abc+" = "+r.ac+"\\) and \\("+pBC+" - "+r.abc+" = "+r.bc+"\\). Each single-only region is its set total minus the regions overlapping it, for example A only \\(= "+nA+" - "+r.ab+" - "+r.ac+" - "+r.abc+" = "+r.a+"\\). The completed diagram:<br><div style='text-align:center'>"+fig+"</div>";
  var target=pick(["exactlyone","exactlytwo","none","union"]);
  if(target==="exactlytwo"){var v=r.ab+r.ac+r.bc;var q=numq(head+"How many students do <b>exactly two</b> of the activities?",
    v,0.001,fill+"Exactly two of the activities means the three pair-only regions: \\[ \\begin{aligned} \\text{exactly two} &= "+r.ab+" + "+r.ac+" + "+r.bc+" \\\\ &= "+v+" \\end{aligned} \\]",{target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;}
  if(target==="exactlyone"){var v1=r.a+r.b+r.c;var q=numq(head+"How many students do <b>exactly one</b> of the activities?",
    v1,0.001,fill+"Exactly one activity means the three single-only regions: \\[ \\begin{aligned} \\text{exactly one} &= "+r.a+" + "+r.b+" + "+r.c+" \\\\ &= "+v1+" \\end{aligned} \\]",{target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;}
  if(target==="union"){var q=numq(head+"How many students do <b>at least one</b> of the activities?",
    union,0.001,fill+"At least one activity means every region inside the circles: \\[ \\begin{aligned} n(A \\cup B \\cup C) &= "+r.a+" + "+r.b+" + "+r.c+" + "+r.ab+" + "+r.ac+" + "+r.bc+" + "+r.abc+" \\\\ &= "+union+" \\end{aligned} \\]",{target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;}
  var q=numq(head+"How many students do <b>none</b> of the activities?",
    r.none,0.001,fill+"The regions inside the circles add to \\("+union+"\\), so the students outside all three circles are: \\[ \\begin{aligned} n((A \\cup B \\cup C)') &= "+total+" - "+union+" \\\\ &= "+r.none+" \\end{aligned} \\]",{target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;
});
/* --- errors in set solutions (2.6) --- */
E("u7-error-identify",7,["2.6"],2,"var",varset([
  function(){return mcq("In a class, 18 students take music and 14 take art, and 6 students take both. A student writes: <i>n(music ∪ art) = 18 + 14 = 32</i>. What is the error?",
    "The 6 students who take both were counted twice; the overlap must be subtracted once",
    ["The two numbers should have been multiplied instead of added to find the size of the union","There is no error; 32 is correct, since each student is counted only once in the two totals","The overlap should have been added a second time to give 38, since the 6 took both subjects"],
    "The 6 students taking both sit inside both the 18 and the 14, so adding counts them twice. The correct union is \\(18 + 14 - 6 = 26\\). Recognizing double counting is the most common fix needed in set problems.",{});},
  function(){return mcq("A school has 400 students, 130 of whom are in the band. One class in the school has 32 students, 9 of whom are in the band. Asked how many students <b>in the class</b> are not in the band, a student answers 400 − 130 = 270. What is the error?",
    "The student used the whole school as the universal set instead of the class named in the question",
    ["The student should have divided 400 by 32 first to find the size of one class in the whole school","There is no error; 270 is correct, because the complement is always taken from the largest group available","The student should have added 130 and 9, because both numbers count students who are in the band"],
    "A complement is always taken against the universal set of the problem. The question is about the class, so the complement is \\(32 - 9 = 23\\) students. The school-wide numbers are a distraction: they belong to a different universal set.",{});},
  function(){return mcq("Let A = {2, 4, 6, 8} and B = {2, 4, 8}. A student claims B is <b>not</b> a subset of A because B has fewer elements than A. What is the error?",
    "A subset does not need the same number of elements; every element of B is in A, so B is a subset of A",
    ["The student is right; subsets must have the same number of elements, so a smaller set can never be a subset","The error is that A is actually the empty set, because it contains no element that also belongs to B","The error is that 8 is not an element of A, because it appears only at the end of the list for B"],
    "Subset is about membership, not size: B is a subset of A whenever every element of B appears in A. Here 2, 4 and 8 all appear in A, so B is a (proper) subset of A, and its smaller size is exactly what makes it proper.",{});}
]));
E("u7-error-correct",7,["2.6"],3,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions(),kind=pick(["union","none","aonly"]);
  if(kind==="none")r.none=r.both+ri(0,8);
  var nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var head="In a survey of "+total+" students, "+nA+" "+c.aP+", "+nB+" "+c.bP+", and "+r.both+" do both. ";
  if(kind==="union")return numq(head+"A student writes: \"n(A ∪ B) = "+nA+" + "+nB+" = "+(nA+nB)+", so "+(nA+nB)+" students do at least one activity.\" What is the <b>correct</b> number of students who do at least one activity?",
    union,0.001,"The student's addition counts the "+r.both+" students who do both twice. Correct the error by subtracting the overlap once: \\[ \\begin{aligned} n(A \\cup B) &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\end{aligned} \\] Justification for Level 3: the flawed step has to be diagnosed before the correct value can be produced.",{ctx:c.lA,kind:kind});
  if(kind==="none")return numq(head+"A student writes: \"Students doing neither = "+total+" − "+nA+" − "+nB+" = "+(total-nA-nB)+".\" What is the <b>correct</b> number of students who do neither activity?",
    r.none,0.001,"The student subtracted the "+r.both+" overlap students twice (once inside each total). First find the true union, then subtract: \\[ \\begin{aligned} n(A \\cup B) &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\\\ \\text{neither} &= "+total+" - "+union+" \\\\ &= "+r.none+" \\end{aligned} \\] Justification for Level 3: the error is inside the student's method, not just the arithmetic, and it has to be undone before recomputing.",{ctx:c.lA,kind:kind});
  return numq(head+"A student writes: \"The number who "+c.aP+" only is "+nA+".\" What is the <b>correct</b> number who "+c.aP+" only?",
    r.aO,0.001,"The student reported all of A, including the "+r.both+" students who also "+c.bP+". Removing the overlap: \\[ \\begin{aligned} n(A \\cap B') &= "+nA+" - "+r.both+" \\\\ &= "+r.aO+" \\end{aligned} \\] Justification for Level 3: spotting that the given answer answers a different question (all of A, not A only) is the key step.",{ctx:c.lA,kind:kind});
});
E("u7-error-venn",7,["2.6"],1,"gen",function(){
  var c=pick(U7SURVEY),r=u7regions(),total=r.aO+r.both+r.bO+r.none;
  var kind=pick(["forgotNone","doubleBoth","forgotBoth"]);
  var wrong=kind==="forgotNone"?r.aO+r.both+r.bO:kind==="doubleBoth"?total+r.both:r.aO+r.bO+r.none;
  var why=kind==="forgotNone"?"forgot the "+r.none+" students outside both circles":kind==="doubleBoth"?"counted the "+r.both+" students in the overlap twice":"left out the "+r.both+" students in the overlap";
  var q=numq("A Venn diagram for a survey (A: "+c.lA+", B: "+c.lB+") shows "+r.aO+" students in A only, "+r.both+" in both, "+r.bO+" in B only, and "+r.none+" in neither region. A student reports that "+wrong+" students were surveyed. What is the <b>correct</b> total?",
    total,0.001,"The student "+why+". Every student belongs to exactly one region, so the correct total is \\("+r.aO+" + "+r.both+" + "+r.bO+" + "+r.none+" = "+total+"\\) students.",{ctx:c.lA,kind:kind}); q.figure=venn2(r.aO,r.both,r.bO,r.none,c.lA,c.lB,null); return q;
});
/* --- applications of set theory (2.7) --- */
E("u7-applications",7,["2.7"],1,"var",varset([
  function(){return mcq("A search engine query uses the terms <b>whales AND kayaking</b>. In set terms, the results page shows pages that are in",
    "the intersection of the two sets of pages, because each result must contain both terms",
    ["the union of the two sets of pages, because either term is enough for a page to appear","the complement of both sets of pages, because AND lists the pages that contain neither term","neither set, because AND removes all pages that contain only one of the two search terms"],
    "AND works like an intersection: a page qualifies only if it belongs to both sets at once. That is why adding an AND term narrows a search instead of widening it, a direct application of set theory in Internet searches.",{});},
  function(){return mcq("An online store filter is set to <b>size = large OR colour = red</b>. The items shown are those that",
    "satisfy at least one of the two conditions, including items that satisfy both",
    ["satisfy both conditions at the same time, just as an AND filter would require","satisfy neither condition, so only items that are not large and not red are shown","satisfy the first condition only, since the colour part of the filter is ignored"],
    "OR works like a union: an item needs to be in at least one of the two sets, and items in the overlap (large and red) are included once. Database and shopping filters are everyday uses of unions and intersections.",{});},
  function(){return mcq("A researcher analyzing survey data wants the respondents who are <b>not</b> in the control group. In set terms she needs",
    "the complement of the control group, taken within the set of all respondents",
    ["the intersection of the control group with the treatment group in the study","the union of all the groups in the study, covering everyone who took part in it","the empty set, because every respondent belongs to some group in the study"],
    "Everyone who is not in the control group, within the universal set of all respondents, is exactly the complement of the control group. Data analysis queries lean on complements in precisely this way.",{});}
]));
E("u7-search-logic",7,["2.7"],2,"gen",function(){
  var r=u7regions(),nA=r.aO+r.both,nB=r.bO+r.both,union=r.aO+r.both+r.bO,total=union+r.none;
  var board=pick(["job board","streaming service","library catalogue","classifieds site"]);
  var tags=pick([["remote","part-time"],["free shipping","on sale"],["fiction","award winner"],["pet friendly","furnished"]]);
  var target=pick(["or","andnot","neither"]);
  var head="On a "+board+", the tag \""+tags[0]+"\" matches "+nA+" listings, the tag \""+tags[1]+"\" matches "+nB+" listings, and "+r.both+" listings carry both tags. The board holds "+total+" listings in total. ";
  if(target==="or")return numq(head+"How many listings match \""+tags[0]+" OR "+tags[1]+"\"?",
    union,0.001,"OR is a union, and listings with both tags must not be counted twice: \\[ \\begin{aligned} n(A \\cup B) &= "+nA+" + "+nB+" - "+r.both+" \\\\ &= "+union+" \\end{aligned} \\] Search filters run on exactly this calculation.",{board:board,target:target});
  if(target==="andnot")return numq(head+"How many listings match \""+tags[0]+"\" but NOT \""+tags[1]+"\"?",
    r.aO,0.001,"Start with everything matching the first tag and remove the overlap: \\[ \\begin{aligned} n(A \\cap B') &= "+nA+" - "+r.both+" \\\\ &= "+r.aO+" \\end{aligned} \\] Excluding a tag in a search is a complement at work.",{board:board,target:target});
  return numq(head+"How many listings match <b>neither</b> tag?",
    r.none,0.001,"Listings with at least one tag number \\("+nA+" + "+nB+" - "+r.both+" = "+union+"\\), so the listings with neither tag are \\("+total+" - "+union+" = "+r.none+"\\).",{board:board,target:target});
});

/* ---------- Unit-test pool fix, Nov 9, 2026: one Level 3 MC generator (the unit had no Level 3 selected-response entry), two Level 3 CR entries (3 and 2 marks) and three Level 2 CR entries (3, 3 and 2 marks). ---------- */
E("u7-deduction-mc",7,["2.7","2.1"],3,"var",varset([
  function(){
    return mcq("Sets \\(A\\), \\(B\\) and \\(C\\) satisfy \\(A \\subseteq B\\) and \\(B \\cap C = \\varnothing\\). Which statement <b>must</b> be true?",
      "\\(A\\) and \\(C\\) are disjoint",
      ["\\(A\\) is a subset of \\(C\\)",
       "\\(A\\) and \\(C\\) share an element",
       "\\(B\\) is a subset of \\(A \\cup C\\)"],
      "Every element of \\(A\\) is an element of \\(B\\), and no element of \\(B\\) is in \\(C\\). So no element of \\(A\\) can be in \\(C\\): \\(A \\cap C = \\varnothing\\), which means \\(A\\) and \\(C\\) are disjoint.",
      {sc:"subset-chain"});
  },
  function(){
    return mcq("A researcher wants web pages that mention solar panels or wind turbines, but wants to exclude every page that mentions subsidies. Which search string does this?",
      "(solar panels OR wind turbines) NOT subsidies",
      ["solar panels OR (wind turbines NOT subsidies)",
       "solar panels AND wind turbines NOT subsidies",
       "NOT (solar panels OR wind turbines OR subsidies)"],
      "The NOT must apply to the whole OR group: pages about either topic, with subsidy pages removed. In the first distractor the NOT applies only to the wind turbine part, so subsidy pages about solar panels would still appear; the second requires both topics; the third excludes everything.",
      {sc:"search-group"});
  },
  function(){
    return mcq("A report claims that for sets \\(A\\) and \\(B\\), \\(n(A) = 12\\), \\(n(B) = 18\\) and \\(n(A \\cap B) = 15\\). Which statement is correct?",
      "The report is impossible: the intersection cannot have more elements than \\(A\\) itself",
      ["The report is possible if some elements are counted twice",
       "The union of \\(A\\) and \\(B\\) would contain 45 elements",
       "The intersection should be \\(12 + 18 = 30\\) elements"],
      "The intersection \\(A \\cap B\\) is a subset of \\(A\\), so \\(n(A \\cap B) \\leq n(A) = 12\\). A count of 15 is impossible, whatever the report says.",
      {sc:"impossible-data"});
  }
]));
E("u7-exactly-two-cr",7,["2.5"],3,"gen",function(){
  var CTX=[
    {A:"play soccer",B:"play hockey",C:"swim competitively"},
    {A:"take art",B:"take music",C:"study a second language"},
    {A:"play chess",B:"play basketball",C:"run cross country"}
  ];
  var cx=pick(CTX);
  var onlyA=ri(2,12), onlyB=ri(2,12), onlyC=ri(2,12), ab=ri(1,9), ac=ri(1,9), bc=ri(1,9), abc=ri(1,6), none=ri(0,10);
  var nA=onlyA+ab+ac+abc, nB=onlyB+ab+bc+abc, nC=onlyC+ac+bc+abc;
  var pAB=ab+abc, pAC=ac+abc, pBC=bc+abc;
  var total=onlyA+onlyB+onlyC+ab+ac+bc+abc+none;
  var target=pick(["two","one"]);
  var head="In a survey of "+total+" students, let \\(A\\) be the set of students who "+cx.A+", \\(B\\) the set of students who "+cx.B+", and \\(C\\) the set of students who "+cx.C+". The counts are \\(n(A) = "+nA+"\\), \\(n(B) = "+nB+"\\), \\(n(C) = "+nC+"\\), \\(n(A \\cap B) = "+pAB+"\\), \\(n(A \\cap C) = "+pAC+"\\), \\(n(B \\cap C) = "+pBC+"\\), and \\(n(A \\cap B \\cap C) = "+abc+"\\). ";
  if(target==="two"){var q=numq(head+"How many students are in <b>exactly two</b> of the three sets?",
    ab+ac+bc,0.001,
    "Each pairwise count includes the "+abc+" students who are in all three sets. Removing them from each pair gives the exactly-two regions: \\(("+pAB+" - "+abc+") + ("+pAC+" - "+abc+") + ("+pBC+" - "+abc+") = "+ab+" + "+ac+" + "+bc+" = \\)<b>"+(ab+ac+bc)+"</b>.",
    {target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;}
  var q=numq(head+"How many students are in <b>exactly one</b> of the three sets?",
    onlyA+onlyB+onlyC,0.001,
    "Work set by set, removing both pairwise overlaps and adding back the all-three group, which was removed twice: only \\(A\\): \\("+nA+" - "+pAB+" - "+pAC+" + "+abc+" = "+onlyA+"\\); only \\(B\\): \\("+nB+" - "+pAB+" - "+pBC+" + "+abc+" = "+onlyB+"\\); only \\(C\\): \\("+nC+" - "+pAC+" - "+pBC+" + "+abc+" = "+onlyC+"\\). The total in exactly one set is \\("+onlyA+" + "+onlyB+" + "+onlyC+" = \\)<b>"+(onlyA+onlyB+onlyC)+"</b>.",
    {target:target}); q.figure=venn3("","","","","","","","","A","B","C"); return q;
});
E("u7-relations-count-cr",7,["2.1","2.4"],3,"gen",function(){
  var nB=ri(12,30), nA=ri(10,30), U=nA+nB, nC=ri(3,nB-4), ans=nB-nC;
  return numq("Sets \\(A\\) and \\(B\\) are disjoint, with \\(n(A \\cup B) = "+U+"\\) and \\(n(A) = "+nA+"\\). Set \\(C\\) is a subset of \\(B\\), and \\(n(C) = "+nC+"\\). How many elements are in \\(B\\) but not in \\(C\\)?",
    ans,0.001,
    "Since \\(A\\) and \\(B\\) are disjoint, \\(n(B) = n(A \\cup B) - n(A) = "+U+" - "+nA+" = "+nB+"\\). Since \\(C \\subseteq B\\), the elements of \\(B\\) outside \\(C\\) number \\("+nB+" - "+nC+" = \\)<b>"+ans+"</b>.",
    {nA:nA,nB:nB,nC:nC});
});
E("u7-two-set-totals-cr",7,["2.2","2.4"],2,"gen",function(){
  var c=pick(U7SURVEY), r=u7regions();
  var nA=r.aO+r.both, total=r.aO+r.both+r.bO+r.none, union=r.aO+r.both+r.bO, nB=r.bO+r.both;
  return numq("In a survey of "+total+" students, "+nA+" "+c.aP+", "+r.both+" students do both activities, and "+r.none+" do neither. How many students "+c.bP+" in total?",
    nB,0.001,
    "The number doing at least one activity is \\("+total+" - "+r.none+" = "+union+"\\). Of the "+nA+" students in A, "+r.both+" are also in B, so A only is \\("+nA+" - "+r.both+" = "+r.aO+"\\). Then B only is \\("+union+" - "+r.aO+" - "+r.both+" = "+r.bO+"\\), and the total in B is \\("+r.bO+" + "+r.both+" = \\)<b>"+nB+"</b>.",
    {ctx:c.lA});
});
E("u7-symmetric-difference-cr",7,["2.3"],2,"gen",function(){
  var c=pick(U7SURVEY), r=u7regions();
  var nA=r.aO+r.both, nB=r.bO+r.both, ans=r.aO+r.bO;
  return numq("In a survey, "+nA+" students "+c.aP+", "+nB+" students "+c.bP+", and "+r.both+" students do both. How many students are in \\(A\\) or \\(B\\) but <b>not</b> in both (that is, they do exactly one of the two activities)?",
    ans,0.001,
    "Remove the overlap from each total: A only is \\("+nA+" - "+r.both+" = "+r.aO+"\\), and B only is \\("+nB+" - "+r.both+" = "+r.bO+"\\). Together, the students in exactly one set number \\("+r.aO+" + "+r.bO+" = \\)<b>"+ans+"</b>.",
    {ctx:c.lA});
});
E("u7-subset-difference-cr",7,["2.1"],2,"gen",function(){
  var nA=ri(25,60), nB=ri(5,nA-8), target=pick(["diff","inter","union"]);
  var head="Set \\(B\\) is a subset of set \\(A\\), with \\(n(A) = "+nA+"\\) and \\(n(B) = "+nB+"\\). ";
  if(target==="diff") return numq(head+"How many elements are in \\(A\\) but not in \\(B\\)?",
    nA-nB,0.001,
    "Every element of \\(B\\) is already in \\(A\\), so the elements of \\(A\\) outside \\(B\\) number \\("+nA+" - "+nB+" = \\)<b>"+(nA-nB)+"</b>.",
    {target:target});
  if(target==="inter") return numq(head+"What is \\(n(A \\cap B)\\)?",
    nB,0.001,
    "Since \\(B \\subseteq A\\), every element of \\(B\\) is in both sets, so \\(A \\cap B = B\\) and \\(n(A \\cap B) = \\)<b>"+nB+"</b>.",
    {target:target});
  return numq(head+"What is \\(n(A \\cup B)\\)?",
    nA,0.001,
    "Since \\(B \\subseteq A\\), the union adds nothing beyond \\(A\\) itself: \\(A \\cup B = A\\), so \\(n(A \\cup B) = \\)<b>"+nA+"</b>.",
    {target:target});
});
