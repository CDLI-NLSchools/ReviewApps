// Math 1201 Unit 2 Roots and Powers question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 630 to 1441).
// CRMARKS: u2-gcf-lcm=2
// CRMARKS: u2-gcf-lcm-problem=3
// CRMARKS: u2-radical-mixed=2
// CRMARKS: u2-laws-integral=3
// CRMARKS: u2-laws-rational=2
// CRMARKS: u2-evaluate-exp=2
// CRMARKS: u2-error=2
// CRMARKS: u2-problem=3
/* Math 1201 Review, Unit 2: Roots and Powers (tranche 1).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u2. Every entry returns the same question type on every draw. */

/* ================= u2 helpers ================= */
function u2gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u2lcm(a,b){return a/u2gcd(a,b)*b;}
function u2red(n,d){var g=u2gcd(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}return [n,d];}
function u2fracS(n,d){var r=u2red(n,d);if(r[1]===1)return ""+r[0];return FR(r[0],r[1]);}
function u2radS(idx,rad){return idx===2?("\\sqrt{"+rad+"}"):("\\sqrt["+idx+"]{"+rad+"}");}
function u2isSq(n){var r=Math.round(Math.sqrt(n));return r*r===n;}
function u2isCu(n){var r=Math.round(Math.cbrt(n));return r*r*r===n;}
function u2isPrime(n){if(n<2)return false;for(var p=2;p*p<=n;p++){if(n%p===0)return false;}return true;}
function u2facMap(n){var m={},x=n,p=2;while(p*p<=x){while(x%p===0){m[p]=(m[p]||0)+1;x/=p;}p++;}if(x>1)m[x]=(m[x]||0)+1;return m;}
function u2mapStr(m){return Object.keys(m).map(function(p){return m[p]>1?p+"^"+m[p]:p;}).join(" \\times ");}
function u2facStr(n){return u2mapStr(u2facMap(n));}
function u2facList(n){var m=u2facMap(n),out=[];Object.keys(m).forEach(function(p){for(var i=0;i<m[p];i++)out.push(+p);});return out;}
function u2pickD3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="number"&&isFinite(c)&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2=ans+k;k++;if(!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u2pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  return out;
}
function u2cloneMap(m){var o={};Object.keys(m).forEach(function(k){o[k]=m[k];});return o;}
function u2nextPrime(p){var q=p+1;while(!u2isPrime(q))q++;return q;}

/* ================= 1. prime factorization (1.12, L1) ================= */
E("u2-prime-factor",2,["1.12"],1,"gen",function(){
  var n=ri(24,600),t=0;
  while((u2isPrime(n)||n<24)&&t<200){n=ri(24,600);t++;}
  var mode=ri(1,3),fm=u2facMap(n),list=u2facList(n);
  var primes=Object.keys(fm).map(Number);
  var expanded=list.join(" \\times ");
  var solSteps="Divide out prime factors one at a time until the quotient is \\(1\\). This gives \\["+
    "\\begin{aligned} "+n+" &= "+expanded+" \\\\ &= "+u2facStr(n)+" \\end{aligned} \\]";
  if(mode===1){
    var correct="\\("+u2facStr(n)+"\\)";
    var m1=u2cloneMap(fm);m1[primes[0]]=m1[primes[0]]+1;
    var m2=u2cloneMap(fm);var lp=primes[primes.length-1];
    if(m2[lp]>1){m2[lp]=m2[lp]-1;}else{delete m2[lp];m2[u2nextPrime(lp)]=1;}
    if(Object.keys(m2).length===0){m2[2]=1;m2[3]=1;}
    var m3=u2cloneMap(fm);var sp=primes[0];if(m3[sp]>1){m3[sp]=m3[sp]-1;}else{delete m3[sp];}
    var np=u2nextPrime(sp);m3[np]=(m3[np]||0)+1;
    var ds=u2pickS3(correct,["\\("+u2mapStr(m1)+"\\)","\\("+u2mapStr(m2)+"\\)","\\("+u2mapStr(m3)+"\\)",
      "\\("+u2mapStr(m1).replace(/ \\times /," \\times ")+"\\)"]);
    return mcq("What is the <b>prime factorization</b> of \\("+n+"\\)?",
      correct,ds,
      solSteps+" The prime factorization is <b>\\("+u2facStr(n)+"\\)</b>.",
      {n:n,mode:mode});
  }
  if(mode===2){
    var correct2="\\("+expanded+"\\)";
    var l1=list.slice();l1.splice(0,2,""+(list[0]*list[1]));
    var l2=list.slice(0,list.length-1);
    var l3=list.slice();l3[l3.length-1]=u2nextPrime(list[list.length-1]);
    var ds2=u2pickS3(correct2,["\\("+l1.join(" \\times ")+"\\)","\\("+l2.join(" \\times ")+"\\)","\\("+l3.join(" \\times ")+"\\)"]);
    return mcq("Which product of primes is equal to \\("+n+"\\)?",
      correct2,ds2,
      solSteps+" Written as a product of primes with no exponents, the value is <b>\\("+expanded+"\\)</b>. Each factor in the product must be prime, and no factor may be dropped or changed.",
      {n:n,mode:mode});
  }
  var correct3="\\(\\{"+list.join(", ")+"\\}\\)";
  var l1b=list.slice();l1b.splice(0,2,""+(list[0]*list[1]));
  var l2b=list.slice(0,list.length-1);
  var l3b=list.slice();l3b.push(list[0]);
  var ds3=u2pickS3(correct3,["\\(\\{"+l1b.join(", ")+"\\}\\)","\\(\\{"+l2b.join(", ")+"\\}\\)","\\(\\{"+l3b.join(", ")+"\\}\\)"]);
  return mcq("Which list gives <b>all</b> the prime factors of \\("+n+"\\), with repetition?",
    correct3,ds3,
    solSteps+" Listing each prime as many times as it occurs gives <b>\\(\\{"+list.join(", ")+"\\}\\)</b>.",
    {n:n,mode:mode});
});

/* ================= 2. why 0 and 1 have no prime factors (1.13, L1, var) ================= */
E("u2-zero-one",2,["1.13"],1,"var",varset([
  function(){var key="Its only positive divisor is \\(1\\), and \\(1\\) is not a prime number, so it has no prime divisor";
    return mcq("Why does the number \\(1\\) have no prime factors?",
    key,
    ["It is an odd number, and prime factors are only ever listed for numbers that are even",
     "It has too many divisors to list them all, so its prime factors are left out of the list entirely",
     "It is a perfect square, and perfect squares are not broken into prime factors at all"],
    "A prime factor of a number is a divisor of that number which is itself prime. The only positive divisor of \\(1\\) is \\(1\\), and \\(1\\) is not prime, because a prime has exactly two positive divisors. So \\(1\\) has <b>no prime factors</b>: its only divisor is not prime.",
    {stmt:true,keyText:key});},
  function(){var key="Every prime divides \\(0\\), and a product of primes is never \\(0\\), so no fixed set of primes builds \\(0\\)";
    return mcq("Why does the number \\(0\\) have no prime factors?",
    key,
    ["Zero is an even number, and even numbers take their prime factors from the number that is exactly half as big as it is",
     "Zero has no divisors at all, and a number without any divisors cannot have prime factors in a list",
     "Zero is less than every prime, and numbers below the smallest prime are given no prime factors"],
    "For any prime \\(p\\), \\(0 = p \\times 0\\), so every prime divides \\(0\\); there is no single set of prime divisors to name. Also, a product of primes is at least \\(2\\), never \\(0\\). So \\(0\\) has <b>no prime factors</b> and no prime factorization.",
    {stmt:true,keyText:key});},
  function(){var key="A prime factorization uses only prime numbers, and \\(1\\) is not a prime number";
    return mcq("A student writes: the prime factorization of \\(1\\) is \\(1\\). Which statement explains the mistake?",
    key,
    ["A prime factorization uses only even numbers, and \\(1\\) is an odd number here",
     "A prime factorization must start with \\(2\\), and this one starts with the number \\(1\\)",
     "A prime factorization must have two factors, and this one has only one factor"],
    "A prime factorization is a product in which every factor is prime. The number \\(1\\) is neither prime nor composite: it has only one positive divisor, while a prime has exactly two. So writing \\(1\\) on its own is <b>not a prime factorization</b>, because \\(1\\) is not prime.",
    {stmt:true,keyText:key});},
  function(){var key="\\(1\\) is not prime, and \\(0\\) cannot be built as a product of primes, so neither has prime factors";
    return mcq("Which statement correctly explains why \\(0\\) and \\(1\\) do not appear in prime factorizations?",
    key,
    ["\\(1\\) is too small to divide anything at all, and \\(0\\) is too small to be divided by prime numbers",
     "\\(0\\) and \\(1\\) are both even numbers, and even numbers are described without prime factors",
     "\\(0\\) and \\(1\\) have prime factors, but the factors are hidden and are never written down"],
    "The number \\(1\\) is not prime, so it cannot serve as a prime factor or be built from primes. A product of primes is always at least \\(2\\), so it can never equal \\(0\\), and every prime divides \\(0\\) anyway. So <b>neither \\(0\\) nor \\(1\\) has prime factors</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 3. perfect squares and cubes, roots (1.8, 1.9, 1.10, L1) ================= */
E("u2-perfect",2,["1.8","1.9","1.10"],1,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var cat=pick([1,2,3,4,4]),n,ansText;
    if(cat===1){var r=ri(3,35);n=r*r;var t=0;while((u2isCu(n)||!u2isSq(n))&&t<100){r=ri(3,35);n=r*r;t++;}ansText="Perfect square only";}
    else if(cat===2){var r2=ri(2,12);n=r2*r2*r2;var t2=0;while((u2isSq(n)||!u2isCu(n))&&t2<100){r2=ri(2,12);n=r2*r2*r2;t2++;}ansText="Perfect cube only";}
    else if(cat===3){n=pick([64,729,4096,15625,46656]);ansText="Both a perfect square and a perfect cube";}
    else{n=ri(10,2000);var t3=0;while((u2isSq(n)||u2isCu(n))&&t3<200){n=ri(10,2000);t3++;}ansText="Neither a perfect square nor a perfect cube";}
    var sqR=Math.round(Math.sqrt(n)),cuR=Math.round(Math.cbrt(n));
    var sol="Check both roots. The square root of \\("+n+"\\) is "+(u2isSq(n)?"exactly \\("+sqR+"\\), since \\("+sqR+"^2 = "+n+"\\)":"not a whole number, since \\("+sqR+"^2 = "+(sqR*sqR)+"\\) and \\("+(sqR+1)+"^2 = "+((sqR+1)*(sqR+1))+"\\) bracket it")+
      ". The cube root of \\("+n+"\\) is "+(u2isCu(n)?"exactly \\("+cuR+"\\), since \\("+cuR+"^3 = "+n+"\\)":"not a whole number, since \\("+cuR+"^3 = "+(cuR*cuR*cuR)+"\\) and \\("+(cuR+1)+"^3 = "+((cuR+1)*(cuR+1)*(cuR+1))+"\\) bracket it")+
      ". So \\("+n+"\\) is classified as: <b>"+ansText.toLowerCase()+"</b>.";
    return mcq("How is the number \\("+n+"\\) best classified?",
      ansText,
      ["Perfect square only","Perfect cube only","Both a perfect square and a perfect cube","Neither a perfect square nor a perfect cube"].filter(function(s){return s!==ansText;}),
      sol,{mode:mode,n:n,ansText:ansText});
  }
  if(mode===2){
    var r3=ri(4,40),n3=r3*r3;
    var ds=u2pickD3(r3,[r3-1,r3+1,r3+2,r3-2,2*r3]).map(function(v){return "\\("+v+"\\)";});
    return mcq("What is \\(\\sqrt{"+n3+"}\\)?",
      "\\("+r3+"\\)",ds,
      "Find the whole number that multiplies by itself to give \\("+n3+"\\): \\["+
      "\\begin{aligned} "+r3+" \\times "+r3+" &= "+n3+" \\\\ \\sqrt{"+n3+"} &= "+r3+" \\end{aligned} \\]"+
      " The square root is <b>\\("+r3+"\\)</b>.",
      {mode:mode,n:n3,ansVal:r3});
  }
  var r4=ri(3,15),n4=r4*r4*r4;
  var ds4=u2pickD3(r4,[r4-1,r4+1,r4+2,r4-2,2*r4]).map(function(v){return "\\("+v+"\\)";});
  return mcq("What is \\(\\sqrt[3]{"+n4+"}\\)?",
    "\\("+r4+"\\)",ds4,
    "Find the whole number that multiplies by itself three times to give \\("+n4+"\\): \\["+
    "\\begin{aligned} "+r4+" \\times "+r4+" \\times "+r4+" &= "+n4+" \\\\ \\sqrt[3]{"+n4+"} &= "+r4+" \\end{aligned} \\]"+
    " The cube root is <b>\\("+r4+"\\)</b>.",
    {mode:mode,n:n4,ansVal:r4});
});

/* ================= 4. index and radicand (1.1, L1) ================= */
E("u2-index",2,["1.1"],1,"gen",function(){
  var mode=ri(1,3);
  if(mode===3){
    var idx=pick([3,4,5]),base=ri(2,5),rad=Math.pow(base,idx);
    var radStr=u2radS(idx,rad);
    var key="Find a number that gives \\("+rad+"\\) when it is multiplied by itself \\("+idx+"\\) times";
    var d1="Find a number that gives \\("+rad+"\\) when it is multiplied by \\("+idx+"\\) exactly";
    var d2="Multiply the number \\("+rad+"\\) by itself \\("+idx+"\\) times and then report the complete result";
    var d3="Divide the number \\("+rad+"\\) into \\("+idx+"\\) equal groups and report the size";
    return mcq("In the radical \\("+radStr+"\\), what does the index tell you?",
      key,[d1,d2,d3],
      "The index of a radical tells how many equal factors of the radicand the root represents. Here the index is \\("+idx+"\\), so \\("+radStr+"\\) asks for a number which, used as a factor \\("+idx+"\\) times, gives \\("+rad+"\\): indeed \\("+base+"^"+idx+" = "+rad+"\\), so the root is \\("+base+"\\). The index tells you to <b>find a number that gives \\("+rad+"\\) when multiplied by itself \\("+idx+"\\) times</b>.",
      {mode:mode,idx:idx,rad:rad,stmt:true,keyText:key});
  }
  var idx2=ri(2,9),rad2=ri(10,999);
  var radStr2=u2radS(idx2,rad2);
  if(mode===1){
    var ds=u2pickD3(idx2,[idx2-1,idx2+1,idx2+2,2,3]).map(function(v){return "\\("+v+"\\)";});
    return mcq("What is the <b>index</b> of the radical \\("+radStr2+"\\)?",
      "\\("+idx2+"\\)",ds,
      "The index is the small number written in the notch of the radical sign"+(idx2===2?". When no index is written, the index is understood to be \\(2\\) (a square root)":", here \\("+idx2+"\\)")+". The number under the sign, \\("+rad2+"\\), is the radicand. The index is <b>\\("+idx2+"\\)</b>.",
      {mode:mode,idx:idx2,rad:rad2,ansVal:idx2});
  }
  var ds2=u2pickD3(rad2,[rad2-1,rad2+1,rad2+10,rad2-10,idx2]).map(function(v){return "\\("+v+"\\)";});
  return mcq("What is the <b>radicand</b> of the radical \\("+radStr2+"\\)?",
    "\\("+rad2+"\\)",ds2,
    "The radicand is the number under the radical sign, here \\("+rad2+"\\). The small number in the notch, \\("+idx2+"\\), is the index. The radicand is <b>\\("+rad2+"\\)</b>.",
    {mode:mode,idx:idx2,rad:rad2,ansVal:rad2});
});

/* ================= 5. GCF and LCM (1.14, L2) ================= */
E("u2-gcf-lcm",2,["1.14"],1,"gen",function(){
  var mode=ri(1,4),a,b,c,ans,kindWord,nums;
  if(mode===1){
    var g=ri(2,18),u=ri(2,9),v=ri(2,9),t=0;
    while(u2gcd(u,v)!==1&&t<100){u=ri(2,9);v=ri(2,9);t++;}
    a=g*u;b=g*v;ans=g;kindWord="greatest common factor";nums=[a,b];c=null;
  }else if(mode===2){
    var g2=ri(2,12),u2=ri(1,6),v2=ri(1,6),w2=ri(1,6),t2=0;
    while(u2gcd(u2gcd(u2,v2),w2)!==1&&t2<100){u2=ri(1,6);v2=ri(1,6);w2=ri(1,6);t2++;}
    a=g2*u2;b=g2*v2;c=g2*w2;ans=g2;kindWord="greatest common factor";nums=[a,b,c];
  }else if(mode===3){
    a=ri(4,40);b=ri(4,40);ans=u2lcm(a,b);kindWord="least common multiple";nums=[a,b];c=null;
  }else{
    a=ri(3,20);b=ri(3,20);c=ri(3,20);ans=u2lcm(u2lcm(a,b),c);kindWord="least common multiple";nums=[a,b,c];
  }
  var isGcf=(kindWord==="greatest common factor");
  var cand=isGcf?[ans+1,ans-1,2*ans,ans+2,nums[0],nums[1]]:[ans-nums[0],ans-nums[1],nums[0]*nums[1],ans+nums[0],u2gcd(a,b),ans+1];
  var ds=u2pickD3(ans,cand).map(function(v){return ""+v;});
  var facLines=nums.map(function(x){return x+" &= "+u2facStr(x);}).join(" \\\\ ");
  var reason=isGcf?
    "The answer is the largest value that divides evenly into "+(nums.length===3?"each of the three numbers":"both numbers")+". Matching the prime factorizations and keeping the shared primes at the lower exponent gives \\("+ans+"\\).":
    "The answer is the smallest value that "+(nums.length===3?"each of the three numbers":"both numbers")+" divides evenly into. Building it from the prime factorizations, keeping each prime at the higher exponent, gives \\("+ans+"\\).";
  return mcq("What is the <b>"+kindWord+"</b> of \\("+nums.join(", ")+"\\)?",
    ""+ans,ds,
    "Write each number as a product of primes: \\[ \\begin{aligned} "+facLines+" \\end{aligned} \\] "+reason+
    " The "+kindWord+" is <b>\\("+ans+"\\)</b>.",
    {mode:mode,a:a,b:b,c:c,ans:ans,isGcf:isGcf});
});

/* ================= 6. GCF / LCM problems (1.15, L2, num) ================= */
E("u2-gcf-lcm-problem",2,["1.15"],2,"gen",function(){
  var ctx=ri(1,3);
  if(ctx===1){
    var g=ri(6,30),u=ri(2,6),v=ri(2,6),t=0;
    while((u2gcd(u,v)!==1||u===v)&&t<100){u=ri(2,6);v=ri(2,6);t++;}
    var W=g*u,L=g*v;
    return numq("A rectangular floor measures \\("+W+"\\) cm by \\("+L+"\\) cm. It is to be covered exactly by the largest possible square tiles, with no cutting and no gaps. What is the side length, in centimetres, of one tile?",
      g,0.001,
      "The tile side must divide evenly into both \\("+W+"\\) and \\("+L+"\\), and it must be as large as possible, so this is a common divisor question. \\["+
      "\\begin{aligned} "+W+" &= "+u2facStr(W)+" \\\\ "+L+" &= "+u2facStr(L)+" \\end{aligned} \\]"+
      " The largest value dividing both is \\("+g+"\\). The side length is <b>\\("+g+"\\) cm</b>.",
      {ctx:ctx,W:W,L:L,ans:g,kind:"gcf"});
  }
  if(ctx===2){
    var a=ri(4,28),b=ri(4,28),t2=0;
    while((a===b||u2lcm(a,b)===Math.max(a,b))&&t2<100){a=ri(4,28);b=ri(4,28);t2++;}
    var ans=u2lcm(a,b);
    return numq("Two harbour ferries leave the same dock together at noon. One ferry then leaves every \\("+a+"\\) minutes and the other leaves every \\("+b+"\\) minutes. In how many minutes will the two ferries next leave the dock together?",
      ans,0.001,
      "The ferries leave together again at a time that is a multiple of both \\("+a+"\\) and \\("+b+"\\), and the first such time is the smallest common multiple. \\["+
      "\\begin{aligned} "+a+" &= "+u2facStr(a)+" \\\\ "+b+" &= "+u2facStr(b)+" \\end{aligned} \\]"+
      " The smallest value that both divide into is \\("+ans+"\\). They next leave together in <b>\\("+ans+"\\) minutes</b>.",
      {ctx:ctx,a:a,b:b,ans:ans,kind:"lcm"});
  }
  var g3=ri(4,20),p=ri(2,9),q=ri(2,9),t3=0;
  while(u2gcd(p,q)!==1&&t3<100){p=ri(2,9);q=ri(2,9);t3++;}
  var A=g3*p,B=g3*q;
  return numq("A caterer has \\("+A+"\\) apples and \\("+B+"\\) oranges. She packs identical baskets using all of the fruit, with the same number of apples in every basket and the same number of oranges in every basket. What is the greatest number of baskets she can pack?",
    g3,0.001,
    "The number of baskets must divide evenly into both \\("+A+"\\) and \\("+B+"\\), and she wants it as large as possible, so this is a common divisor question. \\["+
    "\\begin{aligned} "+A+" &= "+u2facStr(A)+" \\\\ "+B+" &= "+u2facStr(B)+" \\end{aligned} \\]"+
    " The largest value dividing both is \\("+g3+"\\). The greatest number of baskets is <b>\\("+g3+"\\)</b>.",
    {ctx:ctx,A:A,B:B,ans:g3,kind:"gcf"});
});

/* ================= 7. entire radical to mixed radical (1.16, L2) ================= */
E("u2-radical-mixed",2,["1.16"],1,"gen",function(){
  var idx=pick([2,2,3,3,4]),k,m,N,mlist;
  if(idx===2){k=ri(2,15);mlist=[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30,31,33,34,35,37,38,39];}
  else if(idx===3){k=ri(2,7);mlist=[2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,28,29,30,31,33,34,35,36,37,38,39,41,42];}
  else{k=ri(2,4);mlist=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,22,24,25,26,27,28,29,30,31];}
  m=pick(mlist);N=Math.pow(k,idx)*m;
  var key="\\("+k+u2radS(idx,m)+"\\)";
  var mAlt=pick(mlist.filter(function(x){return x!==m;}));
  var cands=["\\("+(k+1)+u2radS(idx,m)+"\\)","\\("+k+u2radS(idx,mAlt)+"\\)","\\("+(k*k)+u2radS(idx,m)+"\\)"];
  if(k>2)cands.push("\\("+(k-1)+u2radS(idx,m)+"\\)");
  cands.push("\\("+k+u2radS(idx,m*2)+"\\)");
  var ds=u2pickS3(key,cands);
  return mcq("Express \\("+u2radS(idx,N)+"\\) as a <b>mixed radical</b> in simplest form.",
    key,ds,
    "Pull out the largest perfect "+(idx===2?"square":idx===3?"cube":"fourth power")+" factor of \\("+N+"\\): \\["+
    "\\begin{aligned} "+u2radS(idx,N)+" &= "+u2radS(idx,Math.pow(k,idx)+" \\times "+m)+" \\\\ &= "+k+u2radS(idx,m)+" \\end{aligned} \\]"+
    " The mixed radical in simplest form is <b>\\("+k+u2radS(idx,m)+"\\)</b>.",
    {idx:idx,k:k,m:m,N:N});
});

/* ================= 8. mixed radical to entire radical (1.17, L2) ================= */
E("u2-radical-entire",2,["1.17"],1,"gen",function(){
  var idx=pick([2,2,3,3,4]),k,m,mlist;
  if(idx===2){k=ri(2,12);mlist=[2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26,29,30];}
  else if(idx===3){k=ri(2,6);mlist=[2,3,4,5,6,7,9,10,11,12,13,14,15,17,18,19,20,21,22,23,25,26,28,29,30];}
  else{k=ri(2,3);mlist=[2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,19,20,22,24,25,26,27,28,29,30,31];}
  m=pick(mlist);
  var ansN=Math.pow(k,idx)*m;
  var key="\\("+u2radS(idx,ansN)+"\\)";
  var candN=[k*m,Math.pow(k,idx+1)*m,Math.pow(k+1,idx)*m,Math.pow(k,idx)*(m+1),Math.pow(k,idx-1)*m];
  var ds=u2pickS3(key,candN.map(function(v){return "\\("+u2radS(idx,v)+"\\)";}));
  return mcq("Express \\("+k+u2radS(idx,m)+"\\) as an <b>entire radical</b>.",
    key,ds,
    "Bring the coefficient \\("+k+"\\) under the radical sign by writing it as a root: \\("+k+" = "+u2radS(idx,Math.pow(k,idx))+"\\). Then \\["+
    "\\begin{aligned} "+k+u2radS(idx,m)+" &= "+u2radS(idx,Math.pow(k,idx))+" \\times "+u2radS(idx,m)+" \\\\ &= "+u2radS(idx,ansN)+" \\end{aligned} \\]"+
    " The entire radical is <b>\\("+u2radS(idx,ansN)+"\\)</b>.",
    {idx:idx,k:k,m:m,ansN:ansN});
});

/* ================= 9. rational exponents and radicals (1.3, L2) ================= */
E("u2-rational-exp",2,["1.3"],1,"gen",function(){
  var n=ri(2,6),m=ri(1,9),t=0;
  while((u2gcd(m,n)!==1||m===n)&&t<200){m=ri(1,9);n=ri(2,6);t++;}
  var b=ri(2,25),mode=ri(1,2);
  function radPow(bb,mm,nn){
    if(mm===1)return u2radS(nn,bb);
    if(nn===2)return "\\sqrt{"+bb+"^"+mm+"}";
    return "\\sqrt["+nn+"]{"+bb+"^"+mm+"}";
  }
  if(mode===1){
    var key="\\("+radPow(b,m,n)+"\\)";
    var cands=[];
    if(m>1)cands.push("\\("+u2radS(n,b)+"\\)");
    cands.push("\\("+radPow(b,m,n+1)+"\\)");
    cands.push("\\("+radPow(b,m+1,n)+"\\)");
    if(m>=2)cands.push("\\("+radPow(b,n,m)+"\\)");
    cands.push("\\("+radPow(b,1,n)+"\\)");
    cands.push("\\("+radPow(b,m,n+2)+"\\)");
    var ds=u2pickS3(key,cands);
    return mcq("Express \\("+b+"^{"+FR(m,n)+"}\\) as a radical.",
      key,ds,
      "In a rational exponent, the denominator is the index of the root and the numerator is the power: \\["+
      "\\begin{aligned} "+b+"^{"+FR(m,n)+"} &= \\left("+u2radS(n,b)+"\\right)^"+m+" \\\\ &= "+radPow(b,m,n)+" \\end{aligned} \\]"+
      " As a radical, the expression is <b>\\("+radPow(b,m,n)+"\\)</b>.",
      {mode:mode,b:b,m:m,n:n,keyStr:key});
  }
  var key2="\\("+b+"^{"+FR(m,n)+"}\\)";
  var cands2=["\\("+b+"^{"+FR(n,m)+"}\\)","\\("+b+"^{"+FR(m+1,n)+"}\\)","\\("+b+"^{"+FR(m,n+1)+"}\\)","\\("+b+"^{"+(m*n)+"}\\)","\\("+b+"^{"+FR(m+2,n)+"}\\)"];
  if(m===1)cands2=cands2.filter(function(s){return s!==key2;});
  var ds2=u2pickS3(key2,cands2);
  return mcq("Express \\("+radPow(b,m,n)+"\\) as a power with a rational exponent.",
    key2,ds2,
    "The index of the root becomes the denominator of the exponent and the power on the radicand becomes the numerator: \\["+
    "\\begin{aligned} "+radPow(b,m,n)+" &= \\left("+b+"^"+m+"\\right)^{"+FR(1,n)+"} \\\\ &= "+b+"^{"+FR(m,n)+"} \\end{aligned} \\]"+
    " As a power, the expression is <b>\\("+b+"^{"+FR(m,n)+"}\\)</b>.",
    {mode:mode,b:b,m:m,n:n,keyStr:key2});
});

/* ================= 10. negative exponents (1.5, L2, num) ================= */
E("u2-negative-exp",2,["1.5"],1,"gen",function(){
  var mode=ri(1,4);
  var pattern="The pattern behind negative exponents comes from dividing by the base at each step: as the exponent drops by \\(1\\), the value is divided by the base. Continuing the pattern past zero gives reciprocals, so \\(a^{-n} = "+FR(1,"a^n")+"\\) for \\(a \\ne 0\\). ";
  if(mode===1){
    var a=ri(2,30),n=pick([2,2,3,3,4]);if(n===4)a=ri(2,12);
    var ans=Math.pow(a,n);
    return numq("When \\("+a+"^{-"+n+"}\\) is written in the form \\("+FR(1,"k")+"\\), what is the value of \\(k\\)?",
      ans,0.001,
      pattern+"Here \\["+"\\begin{aligned} "+a+"^{-"+n+"} &= "+FR(1,a+"^"+n)+" \\\\ &= "+FR(1,ans)+" \\end{aligned} \\]"+
      " So the value of \\(k\\) is <b>\\("+ans+"\\)</b>.",
      {mode:mode,a:a,n:n,ans:ans});
  }
  if(mode===2){
    var a2=ri(2,15),n2=ri(2,3),ans2=Math.pow(a2,n2);
    return numq("Evaluate \\(\\left("+FR(1,a2)+"\\right)^{-"+n2+"}\\).",
      ans2,0.001,
      pattern+"A negative exponent on a fraction flips the fraction first: \\["+
      "\\begin{aligned} \\left("+FR(1,a2)+"\\right)^{-"+n2+"} &= "+a2+"^{"+n2+"} \\\\ &= "+ans2+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans2+"\\)</b>.",
      {mode:mode,a:a2,n:n2,ans:ans2});
  }
  if(mode===3){
    var a3=pick([2,4,5,8,10,20,25]),n3=ri(1,3);
    var ans3=Math.round((1/Math.pow(a3,n3))*1e10)/1e10;
    return numq("Evaluate \\("+a3+"^{-"+n3+"}\\). Give the exact decimal value.",
      ans3,0.001,
      pattern+"Here \\["+"\\begin{aligned} "+a3+"^{-"+n3+"} &= "+FR(1,Math.pow(a3,n3))+" \\\\ &= "+ans3+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans3+"\\)</b>.",
      {mode:mode,a:a3,n:n3,ans:ans3});
  }
  var a4=ri(2,30),n4=ri(2,12);
  return numq("When \\("+FR(1,a4+"^{"+n4+"}")+"\\) is written as a single power of \\("+a4+"\\), what is the exponent?",
    -n4,0.001,
    pattern+"The reciprocal \\("+FR(1,a4+"^{"+n4+"}")+"\\) is the power with the exponent negated: \\("+a4+"^{-"+n4+"}\\). The exponent is <b>\\(-"+n4+"\\)</b>.",
    {mode:mode,a:a4,n:n4,ans:-n4});
});

/* ================= 11. why a^(m/n) is a root then a power (1.2, L2, var) ================= */
E("u2-rational-pattern",2,["1.2"],1,"var",varset([
  function(){var key="The denominator \\(3\\) names the root and the numerator \\(2\\) names the power: \\(\\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4\\)";
    return mcq("Which explanation correctly shows why \\(8^{"+FR(2,3)+"}\\) equals \\(4\\)?",
    key,
    ["The numerator \\(2\\) names the root and the denominator \\(3\\) names the power: \\(\\left(\\sqrt{8}\\right)^3\\) is about \\(4\\)",
     "The fraction \\("+FR(2,3)+"\\) means divide \\(8\\) by \\(3\\) and then round the result up to the whole number \\(4\\)",
     "The exponent means multiply \\(8\\) by itself \\(2\\) times and then divide the answer \\(64\\) by the number \\(3\\)"],
    "Use the pattern from the exponent laws: \\(8^{"+FR(1,3)+"}\\) must satisfy \\(\\left(8^{"+FR(1,3)+"}\\right)^3 = 8\\), so \\(8^{"+FR(1,3)+"} = \\sqrt[3]{8} = 2\\). Raising to the numerator power gives \\(2^2 = 4\\). Numeric check: \\(\\left(\\sqrt[3]{8}\\right)^2 = 2^2 = 4\\), matching \\(8^{"+FR(2,3)+"}\\). The denominator names the root and the numerator names the power, giving <b>\\(4\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Raising \\(a^{"+FR(1,"n")+"}\\) to the power \\(n\\) must give \\(a\\), so \\(a^{"+FR(1,"n")+"}\\) is the \\(n\\)th root of \\(a\\); raising that root to \\(m\\) gives the value";
    return mcq("A student asks why \\(a^{"+FR("m","n")+"} = \\left(\\sqrt[n]{a}\\right)^m\\). Which explanation uses the exponent laws correctly?",
    key,
    ["The fraction \\("+FR("m","n")+"\\) means the base \\(a\\) is multiplied by \\(m\\) and then divided by \\(n\\), and roots are just a shorter way to write that division",
     "The exponent laws say exponents in a fraction cancel out, so \\(a^{"+FR("m","n")+"}\\) is the same as \\(a\\), and the root form is only a different notation for \\(a\\)",
     "A root is defined as any fractional exponent, so the equality holds by definition and no exponent law is needed"],
    "By the power law, \\(\\left(a^{"+FR(1,"n")+"}\\right)^n = a^{"+FR(1,"n")+" \\times n} = a^1 = a\\). The only positive quantity raised to the power \\(n\\) that gives \\(a\\) is \\(\\sqrt[n]{a}\\), so \\(a^{"+FR(1,"n")+"} = \\sqrt[n]{a}\\). Then \\(a^{"+FR("m","n")+"} = \\left(a^{"+FR(1,"n")+"}\\right)^m = \\left(\\sqrt[n]{a}\\right)^m\\). Numeric check with \\(a = 27\\), \\(m = 2\\), \\(n = 3\\): \\(\\left(\\sqrt[3]{27}\\right)^2 = 3^2 = 9 = 27^{"+FR(2,3)+"}\\). The pattern is: <b>the \\(n\\)th root comes from the denominator, then raise to the numerator power</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Since \\(3^3 = 27\\), the cube root part gives \\(3\\), and the numerator power then gives \\(3^2 = 9\\), so both sides match";
    return mcq("Which statement best explains, using a pattern, why \\(27^{"+FR(2,3)+"}\\) equals \\(\\left(\\sqrt[3]{27}\\right)^2\\)?",
    key,
    ["Since \\(9^2 = 81\\), the square part gives \\(9\\), and the denominator root then adjusts the answer \\(81\\) back down to \\(9\\)",
     "Since \\(27\\) divided by \\(3\\) is \\(9\\), the denominator acts as a plain divisor in the calculation",
     "Since \\(2^3 = 8\\), the powers \\(2\\) and \\(3\\) trade places, and swapping them in any base gives the same value as the root form"],
    "Follow the denominator first: \\(27^{"+FR(1,3)+"} = \\sqrt[3]{27} = 3\\), because \\(3^3 = 27\\). The numerator then says to square: \\(3^2 = 9\\). So \\(27^{"+FR(2,3)+"} = \\left(\\sqrt[3]{27}\\right)^2 = 9\\), and the numeric check confirms the pattern: <b>root first from the denominator, then the numerator power, giving \\(9\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The fourth root of \\(16\\) is \\(2\\), because \\(2^4 = 16\\), and cubing that root gives \\(2^3 = 8\\), which matches the power";
    return mcq("Which explanation correctly shows why \\(16^{"+FR(3,4)+"}\\) equals \\(8\\)?",
    key,
    ["The square root of \\(16\\) is \\(4\\), because \\(4^2 = 16\\), and raising that root to \\(4\\) gives a value near \\(8\\)",
     "The fraction \\("+FR(3,4)+"\\) of \\(16\\) is \\(12\\), and subtracting the denominator \\(4\\) from that part gives the stated answer \\(8\\)",
     "The cube of \\(16\\) is very large, and taking the fourth root of that cube brings the value back down close to the number \\(8\\)"],
    "The denominator \\(4\\) names a fourth root: \\(\\sqrt[4]{16} = 2\\) since \\(2^4 = 16\\). The numerator \\(3\\) then cubes it: \\(2^3 = 8\\). Numeric check: \\(\\left(\\sqrt[4]{16}\\right)^3 = 2^3 = 8 = 16^{"+FR(3,4)+"}\\). The value is <b>\\(8\\)</b>, from the root named by the denominator followed by the power named by the numerator.",
    {stmt:true,keyText:key});}
]));

/* ================= 12. exponent laws, integral exponents (1.6, L2) ================= */
E("u2-laws-integral",2,["1.6"],2,"gen",function(){
  var mode=ri(1,6);
  if(mode===1){
    var a=ri(2,9),b=ri(2,9),t=0;
    while((a*b===a+b||Math.abs(a-b)===a+b||a+b+1===a*b)&&t<100){a=ri(2,9);b=ri(2,9);t++;}
    var key="\\(x^{"+(a+b)+"}\\)";
    var ds=u2pickS3(key,["\\(x^{"+(a*b)+"}\\)","\\(x^{"+Math.abs(a-b)+"}\\)","\\(x^{"+(a+b+1)+"}\\)","\\(x^{"+(a+b-1)+"}\\)"]);
    return mcq("Simplify: \\(x^{"+a+"} \\times x^{"+b+"}\\)",
      key,ds,
      "When multiplying powers with the same base, add the exponents: \\["+
      "\\begin{aligned} x^{"+a+"} \\times x^{"+b+"} &= x^{"+a+" + "+b+"} \\\\ &= x^{"+(a+b)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a+b)+"}\\)</b>.",
      {mode:mode,a:a,b:b,keyStr:key});
  }
  if(mode===2){
    var a2=ri(5,12),b2=ri(2,10),t2=0;
    while((a2-b2<1||a2+b2===a2||a2-b2+1===a2)&&t2<100){a2=ri(5,12);b2=ri(2,a2-2);t2++;}
    var key2="\\(x^{"+(a2-b2)+"}\\)";
    var ds2=u2pickS3(key2,["\\(x^{"+(a2+b2)+"}\\)","\\(x^{"+a2+"}\\)","\\(x^{"+(a2-b2+1)+"}\\)","\\(x^{"+(a2*b2)+"}\\)"]);
    return mcq("Simplify: \\("+FR("x^{"+a2+"}","x^{"+b2+"}")+"\\)",
      key2,ds2,
      "When dividing powers with the same base, subtract the exponents: \\["+
      "\\begin{aligned} "+FR("x^{"+a2+"}","x^{"+b2+"}")+" &= x^{"+a2+" - "+b2+"} \\\\ &= x^{"+(a2-b2)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a2-b2)+"}\\)</b>.",
      {mode:mode,a:a2,b:b2,keyStr:key2});
  }
  if(mode===3){
    var a3=ri(2,4),b3=ri(2,4);
    if(a3===2&&b3===2)a3=3;
    var key3="\\(x^{"+(a3*b3)+"}\\)";
    var ds3=u2pickS3(key3,["\\(x^{"+(a3+b3)+"}\\)","\\(x^{"+Math.pow(a3,b3)+"}\\)","\\(x^{"+Math.pow(b3,a3)+"}\\)","\\(x^{"+(a3*b3+2)+"}\\)"]);
    return mcq("Simplify: \\(\\left(x^{"+a3+"}\\right)^{"+b3+"}\\)",
      key3,ds3,
      "When a power is raised to a power, multiply the exponents: \\["+
      "\\begin{aligned} \\left(x^{"+a3+"}\\right)^{"+b3+"} &= x^{"+a3+" \\times "+b3+"} \\\\ &= x^{"+(a3*b3)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a3*b3)+"}\\)</b>.",
      {mode:mode,a:a3,b:b3,keyStr:key3});
  }
  if(mode===4){
    var a4=ri(2,6);
    var key4="\\(x^{"+a4+"}y^{"+a4+"}\\)";
    var ds4=u2pickS3(key4,["\\(x^{"+a4+"}y\\)","\\(xy^{"+a4+"}\\)","\\((xy)^{"+(a4*a4)+"}\\)"]);
    return mcq("Simplify: \\((xy)^{"+a4+"}\\)",
      key4,ds4,
      "A power of a product applies the exponent to each factor: \\["+
      "\\begin{aligned} (xy)^{"+a4+"} &= x^{"+a4+"}y^{"+a4+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+a4+"}y^{"+a4+"}\\)</b>.",
      {mode:mode,a:a4,keyStr:key4});
  }
  if(mode===5){
    var a5=ri(3,8),b5=ri(3,8),c5=ri(3,8),d5=ri(3,8);
    var key5="\\(x^{"+(a5+c5)+"}y^{"+(b5+d5)+"}\\)";
    var ds5=u2pickS3(key5,["\\(x^{"+(a5*c5)+"}y^{"+(b5*d5)+"}\\)","\\(x^{"+(a5+c5)+"}y^{"+(b5*d5)+"}\\)","\\(x^{"+(a5*c5)+"}y^{"+(b5+d5)+"}\\)","\\(x^{"+Math.abs(a5-c5)+"}y^{"+(b5+d5)+"}\\)"]);
    return mcq("Simplify: \\(x^{"+a5+"}y^{"+b5+"} \\times x^{"+c5+"}y^{"+d5+"}\\)",
      key5,ds5,
      "Group the powers base by base and add exponents for each base: \\["+
      "\\begin{aligned} x^{"+a5+"}y^{"+b5+"} \\times x^{"+c5+"}y^{"+d5+"} &= x^{"+a5+" + "+c5+"}y^{"+b5+" + "+d5+"} \\\\ &= x^{"+(a5+c5)+"}y^{"+(b5+d5)+"} \\end{aligned} \\]"+
      " The simplified form is <b>\\(x^{"+(a5+c5)+"}y^{"+(b5+d5)+"}\\)</b>.",
      {mode:mode,a:a5,b:b5,c:c5,d:d5,keyStr:key5});
  }
  var b6=ri(2,8),c6=pick([3,4,5,6,7]);
  var key6="\\("+c6+"y^{"+b6+"}\\)";
  var ds6=u2pickS3(key6,["\\(0\\)","\\("+c6+"xy^{"+b6+"}\\)","\\(y^{"+b6+"}\\)"]);
  return mcq("Simplify: \\("+c6+"x^0y^{"+b6+"}\\)",
    key6,ds6,
    "Any nonzero base to the exponent \\(0\\) equals \\(1\\), so \\(x^0 = 1\\) and the factor \\(x\\) drops out without changing the coefficient: \\["+
    "\\begin{aligned} "+c6+"x^0y^{"+b6+"} &= "+c6+"(1)y^{"+b6+"} \\\\ &= "+c6+"y^{"+b6+"} \\end{aligned} \\]"+
    " The simplified form is <b>\\("+c6+"y^{"+b6+"}\\)</b>.",
    {mode:mode,b:b6,c:c6,keyStr:key6});
});

/* ================= 13. exponent laws, rational exponents (1.6, L2) ================= */
function u2expStr(base,n,d){
  var r=u2red(n,d);
  if(r[0]===0)return "\\(1\\)";
  if(r[1]===1){if(r[0]===1)return "\\("+base+"\\)";return "\\("+base+"^{"+r[0]+"}\\)";}
  return "\\("+base+"^{"+FR(r[0],r[1])+"}\\)";
}
E("u2-laws-rational",2,["1.6"],2,"gen",function(){
  var base=pick(["x","y","z","t"]),mode=ri(1,3);
  var p=ri(1,7),q=pick([2,3,4,5,6]),r=ri(1,7),s=pick([2,3,4,5,6]),t=0;
  while(t<200){var rr1=u2red(p,q),rr2=u2red(r,s);if(rr1[1]>=2&&rr2[1]>=2)break;p=ri(1,7);q=pick([2,3,4,5,6]);r=ri(1,7);s=pick([2,3,4,5,6]);t++;}
  p=rr1[0];q=rr1[1];r=rr2[0];s=rr2[1];
  var eN,eD,lawText,exprStr;
  if(mode===1){eN=p*s+r*q;eD=q*s;lawText="When multiplying powers with the same base, add the exponents. Use a common denominator of \\("+(q*s)+"\\)";
    exprStr=base+"^{"+FR(p,q)+"} \\times "+base+"^{"+FR(r,s)+"}";}
  else if(mode===2){eN=p*s-r*q;eD=q*s;var t2=0;while(eN===0&&t2<50){r=ri(1,7);var rr3=u2red(r,s);r=rr3[0];s=rr3[1];eN=p*s-r*q;eD=q*s;t2++;}
    lawText="When dividing powers with the same base, subtract the exponents. Use a common denominator of \\("+(q*s)+"\\)";
    exprStr=FR(base+"^{"+FR(p,q)+"}",base+"^{"+FR(r,s)+"}");}
  else{var kk=pick([2,3]);eN=p*kk;eD=q;lawText="When a power is raised to a power, multiply the exponents";
    exprStr="\\left("+base+"^{"+FR(p,q)+"}\\right)^{"+kk+"}";}
  var er=u2red(eN,eD);eN=er[0];eD=er[1];
  var key=u2expStr(base,eN,eD);
  var candPairs;
  if(mode===1)candPairs=[[p*s-r*q,q*s],[p*r,q*s],[eN+eD,eD],[eN,eD+1]];
  else if(mode===2)candPairs=[[p*s+r*q,q*s],[p*r,q*s],[eN+eD,eD],[eN,eD+1]];
  else candPairs=[[p*2,q],[p*3,q],[p+1,q]];
  var seenV={},ds=[];
  candPairs.forEach(function(pr){
    if(ds.length>=3)return;
    var cr=u2red(pr[0],pr[1]);
    if(cr[0]*eD===eN*cr[1])return;
    var vk=cr[0]+"/"+cr[1];if(seenV[vk])return;seenV[vk]=1;
    ds.push(u2expStr(base,cr[0],cr[1]));
  });
  var pad=2;while(ds.length<3){var cr2=u2red(eN+pad*eD,eD);ds.push(u2expStr(base,cr2[0],cr2[1]));pad++;}
  return mcq("Simplify: \\("+exprStr+"\\)",
    key,ds,
    lawText+": \\[ \\begin{aligned} "+exprStr+" &= "+(key.slice(2,-2))+" \\end{aligned} \\]"+
    " The simplified form is <b>"+key+"</b>.",
    {mode:mode,base:base,p:p,q:q,r:r,s:s,eN:eN,eD:eD,keyStr:key});
});

/* ================= 14. evaluate powers (1.6, 1.3, L2, num) ================= */
E("u2-evaluate-exp",2,["1.6","1.3"],1,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var n=pick([2,3,4]),r,m,t=0;
    if(n===2)r=ri(2,14);else if(n===3)r=ri(2,7);else r=ri(2,4);
    m=ri(1,4);while(u2gcd(m,n)!==1&&t<60){m=ri(1,4);t++;}
    var b=Math.pow(r,n),ans=Math.pow(r,m);
    return numq("Evaluate \\("+b+"^{"+FR(m,n)+"}\\).",
      ans,0.001,
      "The denominator names the root and the numerator names the power: \\["+
      "\\begin{aligned} "+b+"^{"+FR(m,n)+"} &= \\left("+u2radS(n,b)+"\\right)^"+m+" \\\\ &= "+r+"^"+m+" \\\\ &= "+ans+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans+"\\)</b>.",
      {mode:mode,b:b,m:m,n:n,r:r,ans:ans});
  }
  if(mode===2){
    var fam=pick([2,5]),n2,m2,r2;
    if(fam===2){n2=pick([3,4,5]);r2=2;}else{n2=pick([2,3]);r2=5;}
    m2=ri(1,3);var tg2=0;while(u2gcd(m2,n2)!==1&&tg2<60){m2=ri(1,3);tg2++;}
    var b2=Math.pow(r2,n2),den=Math.pow(r2,m2),ans2=Math.round((1/den)*1e10)/1e10;
    return numq("Evaluate \\("+b2+"^{-"+FR(m2,n2)+"}\\). Give the exact decimal value.",
      ans2,0.001,
      "Take the root first, then the power, then the reciprocal for the negative exponent: \\["+
      "\\begin{aligned} "+b2+"^{-"+FR(m2,n2)+"} &= "+FR(1,b2+"^{"+FR(m2,n2)+" }")+" \\\\ &= "+FR(1,den+"")+" \\\\ &= "+ans2+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans2+"\\)</b>.",
      {mode:mode,b:b2,m:m2,n:n2,r:r2,ans:ans2});
  }
  if(mode===3){
    var nA=pick([2,3]),rA=nA===2?ri(2,10):ri(2,5),mA=ri(1,3),tgA=0;
    while(u2gcd(mA,nA)!==1&&tgA<60){mA=ri(1,3);tgA++;}
    var bA=Math.pow(rA,nA),vA=Math.pow(rA,mA);
    var nB=pick([2,3]),rB=nB===2?ri(2,10):ri(2,5),mB=ri(1,3),tgB=0;
    while(u2gcd(mB,nB)!==1&&tgB<60){mB=ri(1,3);tgB++;}
    var bB=Math.pow(rB,nB),vB=Math.pow(rB,mB),t3=0;
    while(bB===bA&&t3<50){rB=nB===2?ri(2,10):ri(2,5);bB=Math.pow(rB,nB);vB=Math.pow(rB,mB);t3++;}
    var ans3=vA+vB;
    return numq("Evaluate \\("+bA+"^{"+FR(mA,nA)+"} + "+bB+"^{"+FR(mB,nB)+"}\\).",
      ans3,0.001,
      "Evaluate each power separately, root first and then the power: \\["+
      "\\begin{aligned} "+bA+"^{"+FR(mA,nA)+"} &= "+vA+" \\\\ "+bB+"^{"+FR(mB,nB)+"} &= "+vB+" \\\\ "+vA+" + "+vB+" &= "+ans3+" \\end{aligned} \\]"+
      " The value is <b>\\("+ans3+"\\)</b>.",
      {mode:mode,bA:bA,mA:mA,nA:nA,bB:bB,mB:mB,nB:nB,ans:ans3});
  }
  var a4=ri(2,6),p4=ri(1,3),q4=p4+ri(1,4),ans4=Math.pow(a4,q4-p4);
  return numq("Evaluate \\("+a4+"^{-"+p4+"} \\times "+a4+"^{"+q4+"}\\).",
    ans4,0.001,
    "The bases are the same, so add the exponents (the negative exponent subtracts): \\["+
    "\\begin{aligned} "+a4+"^{-"+p4+"} \\times "+a4+"^{"+q4+"} &= "+a4+"^{"+(q4-p4)+"} \\\\ &= "+ans4+" \\end{aligned} \\]"+
    " The value is <b>\\("+ans4+"\\)</b>.",
    {mode:mode,a:a4,p:p4,q:q4,ans:ans4});
});

/* ================= 15. error analysis (1.7, L3, var) ================= */
E("u2-error",2,["1.7"],3,"var",varset([
  function(){var key="The student added the exponents; a power raised to a power multiplies the exponents, so the correct simplification is \\(x^{12}\\)";
    return mcq("A student simplifies \\(\\left(x^3\\right)^4\\) and gets \\(x^7\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student multiplied the exponents; a power raised to a power adds the exponents, so the correct simplification is \\(x^7\\)",
     "The student added the exponents; a power raised to a power multiplies them, so the correct simplification is \\(x^{10}\\)",
     "There is no error in the work; adding exponents is the rule for a power of a power, and the correct simplification is \\(x^7\\), exactly as the student wrote"],
    "A power raised to a power keeps the base and multiplies the exponents: \\(\\left(x^3\\right)^4 = x^{3 \\times 4} = x^{12}\\). The student added \\(3 + 4\\) instead, which is the rule for multiplying powers with the same base. The error is <b>adding the exponents</b>, and the correct simplification is <b>\\(x^{12}\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student left the coefficient unchanged; the power applies to the whole base, so the correct simplification is \\(27x^6\\)";
    return mcq("A student simplifies \\(\\left(3x^2\\right)^3\\) and gets \\(3x^6\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student cubed the coefficient as well; the power applies only to the variable, so the correct simplification is \\(3x^6\\)",
     "The student left the coefficient unchanged; the power applies to the whole base, so the correct simplification is \\(9x^6\\)",
     "There is no error in the work; a coefficient is never raised to a power, and the correct simplification is \\(3x^6\\)"],
    "In \\(\\left(3x^2\\right)^3\\), the exponent \\(3\\) applies to every factor inside the brackets: \\(3^3 \\times \\left(x^2\\right)^3 = 27x^6\\). The student raised only the variable part to the power. The error is <b>leaving the coefficient unchanged</b>, and the correct simplification is <b>\\(27x^6\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student divided the exponents; dividing powers with the same base subtracts them, so the correct simplification is \\(x^3\\)";
    return mcq("A student simplifies \\("+FR("x^6","x^3")+"\\) and gets \\(x^2\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student subtracted the exponents; dividing powers with the same base divides them, so the correct simplification is \\(x^2\\)",
     "The student divided the exponents; dividing powers with the same base adds them, so the correct simplification is \\(x^9\\)",
     "There is no error in the work; exponents are divided in a quotient of powers, and the correct simplification is \\(x^2\\)"],
    "For a quotient of powers with the same base, subtract the exponents: \\("+FR("x^6","x^3")+" = x^{6 - 3} = x^3\\). The student divided \\(6\\) by \\(3\\) instead. The error is <b>dividing the exponents</b>, and the correct simplification is <b>\\(x^3\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student read the negative exponent as a negative answer; a negative exponent gives a reciprocal, so the correct value is \\("+FR(1,16)+"\\)";
    return mcq("A student evaluates \\(4^{-2}\\) and gets \\(-16\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student read the negative exponent as a negative answer; a negative exponent doubles the base, so the correct value is \\(32\\) for this power",
     "The student should have multiplied the base by the exponent; following that rule here, the correct value for the power is \\(-8\\)",
     "There is no error in the work; a negative exponent makes the value negative, and the correct value of the power is \\(-16\\)"],
    "A negative exponent means take the reciprocal, not a negative result: \\(4^{-2} = "+FR(1,"4^2")+" = "+FR(1,16)+"\\). The student treated the exponent as a sign on the answer and multiplied out \\(4^2\\) with a negative sign attached. The error is <b>reading the negative exponent as a negative answer</b>, and the correct value is <b>\\("+FR(1,16)+"\\)</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student multiplied the exponents; multiplying powers with the same base adds them, so the correct simplification is \\(x^9\\)";
    return mcq("A student simplifies \\(x^5 \\times x^4\\) and gets \\(x^{20}\\). Which statement identifies the error and gives the correct simplification?",
    key,
    ["The student added the exponents; multiplying powers with the same base multiplies them, so the correct simplification is \\(x^{20}\\)",
     "The student multiplied the exponents; multiplying powers with the same base subtracts them, so the correct simplification is \\(x^1\\)",
     "There is no error in the work; exponents are multiplied in a product of powers, and the correct simplification is \\(x^{20}\\)"],
    "When multiplying powers with the same base, add the exponents: \\(x^5 \\times x^4 = x^{5 + 4} = x^9\\). The student multiplied \\(5 \\times 4\\), which is the rule for a power raised to a power. The error is <b>multiplying the exponents</b>, and the correct simplification is <b>\\(x^9\\)</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 16. problems with powers and radicals (1.4, L3, num) ================= */
E("u2-problem",2,["1.4"],3,"gen",function(){
  var mode=ri(1,5);
  if(mode===1||mode===5){
    var prof=pick([
      {thing:"bacteria culture",start:pick([3,5,6,9,12,15,18,20]),startUnit:"bacteria",unit:"bacteria",per:"hour",mult:2,verb:"doubles"},
      {thing:"patch of algae on a pond",start:pick([2,4,5,8,10,12,16,20]),startUnit:"square centimetres",unit:"square centimetres of algae",per:"day",mult:2,verb:"doubles"},
      {thing:"photo post",start:pick([5,10,15,20,25,30,40,50]),startUnit:"views",unit:"views",per:"day",mult:2,verb:"doubles"},
      {thing:"forwarded message chain",start:pick([2,3,4,5,6]),startUnit:"people",unit:"people reached",per:"round",mult:3,verb:"triples"},
      {thing:"yeast colony",start:pick([2,3,4,5,6,8]),startUnit:"cells",unit:"cells",per:"hour",mult:3,verb:"triples"}
    ]);
    var t=prof.mult===2?ri(3,8):ri(3,6);
    var ans=prof.start*Math.pow(prof.mult,t);
    return numq("A "+prof.thing+" starts at \\("+prof.start+"\\) "+prof.startUnit+". The amount "+prof.verb+" every "+prof.per+". What is the total after \\("+t+"\\) "+prof.per+"s? Give the number of "+prof.unit+".",
      ans,0.001,
      "Each "+prof.per+" multiplies the total by \\("+prof.mult+"\\), so after \\("+t+"\\) "+prof.per+"s the total is the starting amount times \\("+prof.mult+"\\) raised to the power \\("+t+"\\): \\["+
      "\\begin{aligned} \\text{total} &= "+prof.start+" \\times "+prof.mult+"^{"+t+"} \\\\ &= "+prof.start+" \\times "+Math.pow(prof.mult,t)+" \\\\ &= "+ans+" \\end{aligned} \\]"+
      " The total is <b>\\("+ans+"\\)</b> "+prof.unit+".",
      {mode:mode,start:prof.start,mult:prof.mult,t:t,ans:ans});
  }
  if(mode===2){
    var r=ri(4,60),A=r*r;
    return numq("A square patio has an area of \\("+A+"\\) square metres. What is the side length, in metres, of the patio?",
      r,0.001,
      "For a square, the area is the side length multiplied by itself. Substitute the known area into the area formula and solve: \\["+
      "\\begin{aligned} s^2 &= "+A+" \\\\ s &= \\sqrt{"+A+"} = "+r+" \\end{aligned} \\]"+
      " The side length is <b>\\("+r+"\\) m</b>.",
      {mode:mode,r:r,A:A,ans:r});
  }
  if(mode===3){
    var r3=ri(3,30),V=r3*r3*r3;
    return numq("A cube-shaped storage box has a volume of \\("+V+"\\) cubic centimetres. What is the edge length, in centimetres, of the box?",
      r3,0.001,
      "For a cube, the volume is the edge length used as a factor three times. Substitute the known volume into the volume formula and solve: \\["+
      "\\begin{aligned} s^3 &= "+V+" \\\\ s &= \\sqrt[3]{"+V+"} = "+r3+" \\end{aligned} \\]"+
      " The edge length is <b>\\("+r3+"\\) cm</b>.",
      {mode:mode,r:r3,V:V,ans:r3});
  }
  var folds=ri(4,9),th=pick([0.08,0.1,0.12]),ans4=Math.round(th*Math.pow(2,folds)*100)/100;
  return numq("A sheet of paper is \\("+th+"\\) mm thick. It is folded in half, then folded in half again, and so on, for a total of \\("+folds+"\\) folds. How thick, in millimetres, is the folded stack?",
    ans4,0.01,
    "Each fold doubles the thickness, so after \\("+folds+"\\) folds the thickness is the original thickness times \\(2\\) raised to the power \\("+folds+"\\): \\["+
    "\\begin{aligned} \\text{thickness} &= "+th+" \\times 2^{"+folds+"} \\\\ &= "+th+" \\times "+Math.pow(2,folds)+" \\\\ &= "+ans4+" \\end{aligned} \\]"+
    " The folded stack is <b>\\("+ans4+"\\) mm</b> thick.",
    {mode:mode,folds:folds,th:th,ans:ans4});
});

/* ================= 17. sorting rational and irrational numbers (1.18, L2) ================= */
E("u2-sort-numbers",2,["1.18"],1,"gen",function(){
  function ratItem(){
    var kind=ri(1,5);
    if(kind===1){var p=ri(1,15),q=pick([2,3,4,5,6,7,8,9]),tg=0;while(u2gcd(p,q)!==1&&tg<60){p=ri(1,15);q=pick([2,3,4,5,6,7,8,9]);tg++;}return {str:"\\("+FR(p,q)+"\\)",rat:true};}
    if(kind===2){return {str:""+pick([0.5,1.25,2.75,3.4,0.125,5.6,7.05,0.9]),rat:true};}
    if(kind===3){var r=ri(2,12);return {str:"\\(\\sqrt{"+(r*r)+"}\\)",rat:true};}
    if(kind===4){return {str:"\\(0.\\overline{"+ri(2,9)+"}\\)",rat:true};}
    var r5=ri(2,6);return {str:"\\(\\sqrt[3]{"+(r5*r5*r5)+"}\\)",rat:true};
  }
  function irrItem(){
    var kind=ri(1,4);
    if(kind===1){var n=ri(2,60);var t=0;while(u2isSq(n)&&t<100){n=ri(2,60);t++;}return {str:"\\(\\sqrt{"+n+"}\\)",rat:false};}
    if(kind===2){var n2=ri(2,80);var t2=0;while(u2isCu(n2)&&t2<100){n2=ri(2,80);t2++;}return {str:"\\(\\sqrt[3]{"+n2+"}\\)",rat:false};}
    if(kind===3){return {str:"\\(\\pi\\)",rat:false};}
    return {str:pick(["1.01001000100001...","2.12112111211112...","0.123456789101112...","3.23223222322223..."]),rat:false};
  }
  var mode=ri(1,3);
  if(mode===3){
    function rawOf(it){var s=it.str;if(s.slice(0,2)==="\\("&&s.slice(-2)==="\\)")return s.slice(2,-2);return s;}
    function fragSet(wantBad){
      var frags=[],seenF={},g=0;
      while(frags.length<3&&g<300){g++;
        var it=(wantBad&&frags.length===2)?irrItem():ratItem();
        var f=rawOf(it);
        if(seenF[f])continue;seenF[f]=1;frags.push(f);}
      return shuffle(frags);
    }
    function setStr(frags){return "\\(\\{"+frags.join(", ")+"\\}\\)";}
    var good=setStr(fragSet(false));
    var bads=[],guard=0;
    while(bads.length<3&&guard<200){guard++;var bs=setStr(fragSet(true));if(bs!==good&&bads.indexOf(bs)<0)bads.push(bs);}
    return mcq("Which set contains <b>only</b> rational numbers?",
      good,bads,
      "A rational number can be written as a ratio of integers, which includes fractions, terminating decimals, repeating decimals, and roots of perfect powers. Roots of numbers that are not perfect powers, \\(\\pi\\), and decimals that go on without repeating are irrational. Only one set avoids all of those. The set with only rational numbers is <b>"+good+"</b>.",
      {mode:mode,keyStr:good});
  }
  var wantIrr=(mode===1);
  var items=[],seen={};
  function addItem(it){if(!it||seen[it.str])return;seen[it.str]=1;items.push(it);}
  if(wantIrr){
    addItem(irrItem());
    var g1=0;while(items.length<4&&g1<300){g1++;addItem(ratItem());}
  }else{
    addItem(ratItem());
    var g2=0;while(items.length<4&&g2<300){g2++;addItem(irrItem());}
  }
  var target=items.filter(function(x){return x.rat===!wantIrr;})[0];
  var others=items.filter(function(x){return x!==target;}).map(function(x){return x.str;});
  return mcq(wantIrr?"Which number is <b>irrational</b>?":"Which number is <b>rational</b>?",
    target.str,others,
    "Rational numbers are exactly the numbers that can be written as a ratio of two integers: fractions, terminating or repeating decimals, and roots that come out whole. A root of a number that is not a perfect power, the number \\(\\pi\\), and a decimal that continues without repeating are irrational. The "+(wantIrr?"irrational":"rational")+" number in the list is <b>"+target.str+"</b>.",
    {mode:mode,items:items,keyStr:target.str});
});

/* ================= 18. subsets of the real numbers (1.19, L2, var) ================= */
E("u2-subsets",2,["1.19"],1,"var",varset([
  function(){var key="Integers: the whole numbers, their negatives, and zero";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(-12\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Whole numbers: the counting numbers, together with zero","Rational numbers: ratios of two integers"],
    "The number \\(-12\\) is a negative whole value. It is not a natural number (the counting numbers start at \\(1\\)) and not a whole number (whole numbers are \\(0\\) and up). It is an integer, and although every integer is also rational, the most specific set that fits is the integers. The most specific subset is <b>integers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Whole numbers: the counting numbers, together with zero";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(0\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers"],
    "The number \\(0\\) is not a natural number, because the natural numbers are the counting numbers \\(1, 2, 3, \\ldots\\). It is a whole number, since the whole numbers are the natural numbers together with \\(0\\). It is also an integer and a rational number, but the most specific set that fits is the whole numbers. The most specific subset is <b>whole numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Rational numbers: ratios of two integers, with a nonzero denominator";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\("+FR(4,5)+"\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one and continuing without end","Whole numbers: the counting numbers, together with zero","Integers: the whole numbers, their negatives, and zero"],
    "The value \\("+FR(4,5)+"\\) is a ratio of two integers, which is exactly the definition of a rational number. It is not a counting number, a whole number, or an integer, because it lies between \\(0\\) and \\(1\\). The most specific subset is <b>rational numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Irrational numbers: real numbers that are not ratios of integers";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(\\sqrt{7}\\) belongs to?",
    key,["Natural numbers: the counting numbers, starting from one","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers, with a nonzero denominator, in lowest terms"],
    "The value \\(\\sqrt{7}\\) cannot be written as a ratio of two integers, because \\(7\\) is not a perfect square and its root is a non-terminating, non-repeating decimal. Numbers that are real but not rational form the irrational numbers. The most specific subset is <b>irrational numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Natural numbers: the counting numbers, starting from one";
    return mcq("What is the <b>most specific</b> subset of the real numbers that \\(9\\) belongs to?",
    key,["Whole numbers: the counting numbers, together with the number zero","Integers: the whole numbers, their negatives, and zero","Rational numbers: ratios of two integers"],
    "The number \\(9\\) is a counting number, so it is a natural number. Every natural number is also a whole number, an integer, and a rational number, since the sets nest inside each other, but the most specific set that fits is the smallest one containing it. The most specific subset is <b>natural numbers</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Every integer is also a rational number";
    return mcq("Which statement about the subsets of the real numbers is <b>true</b>?",
    key,
    ["Every rational number is an integer","Every whole number is also a natural number","Irrational numbers are rational numbers written in lowest terms"],
    "The subsets nest: natural numbers sit inside whole numbers, inside integers, inside rational numbers. So any integer \\(k\\) can be written as the ratio \\("+FR("k",1)+"\\), which makes it rational. The reverse claims fail: \\("+FR(1,2)+"\\) is rational but not an integer, \\(0\\) is whole but not natural, and irrational numbers cannot be written as ratios at all. The true statement is: <b>every integer is also a rational number</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 19. approximating irrationals (1.20, 1.21, L2, num) ================= */
E("u2-approx",2,["1.20","1.21"],2,"gen",function(){
  var roll=Math.random();
  if(roll<0.6){
    var n=ri(2,600),t=0;while(u2isSq(n)&&t<200){n=ri(2,600);t++;}
    var lo=Math.floor(Math.sqrt(n)),ans=Math.round(Math.sqrt(n)*10)/10;
    var dLo=n-lo*lo,dHi=(lo+1)*(lo+1)-n;
    return numq("Give the approximate value of \\(\\sqrt{"+n+"}\\) to one decimal place.",
      ans,0.051,
      "Locate \\(\\sqrt{"+n+"}\\) between consecutive perfect squares: \\["+
      "\\begin{aligned} "+(lo*lo)+" &< "+n+" < "+((lo+1)*(lo+1))+" \\\\ "+lo+" &< \\sqrt{"+n+"} < "+(lo+1)+" \\end{aligned} \\]"+
      " Since \\("+n+"\\) is closer to \\("+(dLo<dHi?(lo*lo):((lo+1)*(lo+1)))+"\\), the root is closer to \\("+(dLo<dHi?lo:(lo+1))+"\\), and checking tenths gives \\(\\sqrt{"+n+"} \\approx "+ans+"\\). On a number line it sits between \\("+lo+"\\) and \\("+(lo+1)+"\\), nearer \\("+(dLo<dHi?lo:(lo+1))+"\\). The approximate value is <b>\\("+ans+"\\)</b>.",
      {mode:2,n:n,ans:ans});
  }
  if(roll<0.9){
    var n3=ri(2,600),t3=0;while(u2isCu(n3)&&t3<200){n3=ri(2,600);t3++;}
    var lo3=Math.floor(Math.cbrt(n3)),ans3=Math.round(Math.cbrt(n3)*10)/10;
    var dLo3=n3-lo3*lo3*lo3,dHi3=(lo3+1)*(lo3+1)*(lo3+1)-n3;
    return numq("Give the approximate value of \\(\\sqrt[3]{"+n3+"}\\) to one decimal place.",
      ans3,0.051,
      "Locate \\(\\sqrt[3]{"+n3+"}\\) between consecutive perfect cubes: \\["+
      "\\begin{aligned} "+(lo3*lo3*lo3)+" &< "+n3+" < "+((lo3+1)*(lo3+1)*(lo3+1))+" \\\\ "+lo3+" &< \\sqrt[3]{"+n3+"} < "+(lo3+1)+" \\end{aligned} \\]"+
      " Since \\("+n3+"\\) is closer to \\("+(dLo3<dHi3?(lo3*lo3*lo3):((lo3+1)*(lo3+1)*(lo3+1)))+"\\), the root is closer to \\("+(dLo3<dHi3?lo3:(lo3+1))+"\\), and checking tenths gives \\(\\sqrt[3]{"+n3+"} \\approx "+ans3+"\\). On a number line it sits between \\("+lo3+"\\) and \\("+(lo3+1)+"\\). The approximate value is <b>\\("+ans3+"\\)</b>.",
      {mode:3,n:n3,ans:ans3});
  }
  var k=ri(2,9),ansP=Math.round(k*Math.PI*100)/100;
  return numq("Give the approximate value of \\("+k+"\\pi\\) to two decimal places.",
    ansP,0.011,
    "Use \\(\\pi \\approx 3.14159\\): \\["+
    "\\begin{aligned} "+k+"\\pi &\\approx "+k+" \\times 3.14159 \\\\ &\\approx "+ansP+" \\end{aligned} \\]"+
    " The approximate value is <b>\\("+ansP+"\\)</b>.",
    {mode:1,k:k,ans:ansP});
});

/* ================= 20. ordering irrationals (1.22, L3) ================= */
E("u2-order-irrational",2,["1.22"],3,"gen",function(){
  var pool=[];
  for(var n=2;n<=40;n++){if(!u2isSq(n))pool.push({frag:"\\sqrt{"+n+"}",val:Math.sqrt(n)});}
  for(var c=2;c<=80;c++){if(!u2isCu(c)&&Math.cbrt(c)<4.4)pool.push({frag:"\\sqrt[3]{"+c+"}",val:Math.cbrt(c)});}
  pool.push({frag:"\\pi",val:Math.PI});
  var items=null,guard=0;
  while(!items&&guard<500){
    guard++;
    var cand=shuffle(pool).slice(0,4);
    var ok=true;
    for(var i=0;i<4;i++)for(var j=i+1;j<4;j++){if(Math.abs(cand[i].val-cand[j].val)<0.35)ok=false;}
    var strs=cand.map(function(x){return x.frag;});
    if(new Set(strs).size<4)ok=false;
    if(ok)items=cand;
  }
  var sortedItems=items.slice().sort(function(x,y){return x.val-y.val;});
  function ordStr(arr){return arr.map(function(x){return "\\("+x.frag+"\\)";}).join(", ");}
  var key=ordStr(sortedItems);
  var rev=ordStr(sortedItems.slice().reverse());
  var sw1=sortedItems.slice();var tmp=sw1[0];sw1[0]=sw1[1];sw1[1]=tmp;
  var sw2=sortedItems.slice();var tmp2=sw2[2];sw2[2]=sw2[3];sw2[3]=tmp2;
  var ds=u2pickS3(key,[rev,ordStr(sw1),ordStr(sw2)]);
  var approxLines=sortedItems.map(function(x){return x.frag+" &\\approx "+(Math.round(x.val*100)/100);}).join(" \\\\ ");
  return mcq("The numbers "+ordStr(items)+" are to be placed on a number line. Which list orders them from <b>least to greatest</b>?",
    key,ds,
    "Approximate each number by comparing it with perfect squares and cubes: \\[ \\begin{aligned} "+approxLines+" \\end{aligned} \\]"+
    " Reading the approximations in increasing order gives the placement on the number line. From least to greatest: <b>"+key+"</b>.",
    {items:items.map(function(x){return {frag:x.frag,val:x.val};}),keyStr:key});
});

/* ---- Prior knowledge tranche entries (Nov 15, 2026) ----
   Borrowed verbatim from the feeder banks named in each entry's
   pkSrc (see the metadata pass at the end of this file), under the
   Math 1201 PK tranche spec. */
E("u2-pk-sqrt-perfect", 2, ["1.9"], 1, "gen", function(){
  var r=ri(2,20); var n=r*r;
  var ds=u1d3(r,[r+1,r-1,r+2,Math.max(r-2,1),r+3]);
  var opts=ds.map(function(d){return {t:String(d), fb:fmt(d)+" squared is "+(d*d)+", not "+n+": try another value."};});
  var mode=pick(["plain","area","pairs"]);
  var prompt=(mode==="plain")?("What is \\(\\sqrt{"+n+"}\\)?"):((mode==="area")?("A square has an area of "+n+" square centimetres. What is its side length, in centimetres?"):("A number multiplied by itself gives "+n+". What is the number?"));
  var q=mcq(prompt, {t:String(r), fb:"Yes: "+r+" times "+r+" equals "+n+"."}, opts,
    "Find the number that multiplies by itself to give "+n+": \\[ \\begin{aligned} "+r+" \\times "+r+" &= "+n+" \\\\ \\sqrt{"+n+"} &= "+r+" \\end{aligned} \\] The square root is <b>"+r+"</b>.",
    {r:r, n:n, mode:mode});
  q.figure=u1gridSVG(r);
  return q;
}, ["Think of the number that multiplies by itself to give the value under the root sign.", "Test small squares in order until one equals the number shown."]);
E("u2-pk-factors-root", 2, ["1.9"], 1, "gen", function(){
  var r=ri(4,16); var n=r*r;
  var facs=[]; for(var d=1;d<=n;d++){ if(n%d===0){facs.push(d);} }
  var others=facs.filter(function(d){return d!==r;});
  var wrong=pick(others);
  var opts=[
    {t:String(wrong), fb:wrong+" is a factor, but "+wrong+" times "+wrong+" is not "+n+", so it is not the square root."},
    {t:String(n), fb:n+" is a factor, but a square root must multiply by itself to give "+n+"."},
    {t:String(2*r===n?n+1:2*r), fb:"Check the factor pairs: a square root pairs with itself."}
  ];
  var seenOpts={}; var clean=[]; opts.forEach(function(o){if(o.t!==String(r)&&!seenOpts[o.t]){seenOpts[o.t]=1;clean.push(o);}});
  while(clean.length<3){var cand=String(ri(2,20)); if(cand!==String(r)&&!seenOpts[cand]){seenOpts[cand]=1;clean.push({t:cand, fb:"That value does not pair with itself to give "+n+"."});}}
  var fmode=pick(["pairs","which","area","def"]);
  var fprompt=(fmode==="pairs")?(n+" has factor pairs that multiply to "+n+". Which factor is the square root of "+n+"?"):((fmode==="which")?("Which factor of "+n+" is its square root?"):((fmode==="area")?("A square with area "+n+" has whole-number side lengths among the factors of "+n+". Which factor gives the side length?"):("The factors of "+n+" can be listed in pairs. Which factor is the square root of "+n+"?")));
  return mcq(fprompt, {t:String(r), fb:"Yes: "+r+" pairs with itself, since "+r+" times "+r+" equals "+n+"."}, clean.slice(0,3),
    "List the factor pairs of "+n+". Every pair has two different factors except one: \\("+r+" \\times "+r+" = "+n+"\\). A square root is the factor that pairs with itself. The square root is <b>"+r+"</b>.",
    {r:r, n:n});
}, ["A square root is the factor that multiplies by itself to give the number.", "Write out the factor pairs and find the pair where both factors are the same."]);
E("u2-pk-square-of-number", 2, ["1.8"], 1, "gen", function(){
  var n=ri(3,25); var sq=n*n;
  var ds=u1d3(sq,[2*n,sq+n,sq-n,(n+1)*(n+1),(n-1)*(n-1),sq+10]);
  var opts=ds.map(function(d){return {t:String(d), fb:"That is not "+n+" times "+n+": multiply the number by itself."};});
  var mode=pick(["plain","tile","product"]);
  var prompt=(mode==="plain")?("What is \\("+n+"^{2}\\)?"):((mode==="tile")?("A square tile has sides of "+n+" cm. What is the area of the tile, in square centimetres?"):("What is the value of \\("+n+" \\times "+n+"\\)?"));
  return mcq(prompt, {t:String(sq), fb:"Yes: "+n+" times "+n+" equals "+sq+"."}, opts,
    "Squaring means multiplying the number by itself: \\[ \\begin{aligned} "+n+"^{2} &= "+n+" \\times "+n+" \\\\ &= "+sq+" \\end{aligned} \\] The square is <b>"+sq+"</b>.",
    {n:n, mode:mode});
}, ["Squaring a number means multiplying it by itself.", "Write the number times itself and multiply."]);
E("u2-pk-estimate-between", 2, ["1.20"], 1, "gen", function(){
  var n=u1nonSquare(10,200); var k=Math.floor(Math.sqrt(n));
  var pairs=[[k,k+1],[k-1,k],[k+1,k+2],[k+2,k+3]];
  var opts=pairs.slice(1).map(function(pr){return {t:pr[0]+" and "+pr[1], fb:"Square both numbers: "+n+" does not lie between their squares."};});
  var q=mcq("The square root of "+n+" is between which two whole numbers?", {t:k+" and "+(k+1), fb:"Yes: "+n+" lies between "+(k*k)+" and "+((k+1)*(k+1))+"."}, opts,
    "Use the perfect squares on each side as benchmarks: \\[ \\begin{aligned} "+k+"^{2} &= "+(k*k)+" \\\\ "+(k+1)+"^{2} &= "+((k+1)*(k+1))+" \\end{aligned} \\] Since "+(k*k)+" is less than "+n+", which is less than "+((k+1)*(k+1))+", the root lies between <b>"+k+" and "+(k+1)+"</b>.",
    {n:n, k:k});
  q.figure=u1numLineSVG(Math.max(k-1,0),k+2);
  return q;
}, ["Find the perfect squares just below and just above the number.", "Square whole numbers in order until their squares bracket the number."]);
E("u2-pk-root-between", 2, ["1.20"], 1, "gen", function(){
  var a=ri(2,15); var b=a+1;
  var m=a*a+ri(1,2*a-1);
  var above=b*b+ri(1,12);
  var opts=[{t:String(a*a), fb:"Its square root is exactly "+a+", which is an endpoint, not between."},
            {t:String(b*b), fb:"Its square root is exactly "+b+", which is an endpoint, not between."},
            {t:String(above), fb:"Its square root is more than "+b+": square the endpoints to check."}];
  return mcq("Which number has a square root between "+a+" and "+b+"?", {t:String(m), fb:"Yes: "+m+" lies between "+(a*a)+" and "+(b*b)+"."}, opts,
    "Square the endpoints: \\("+a+"^{2} = "+(a*a)+"\\) and \\("+b+"^{2} = "+(b*b)+"\\). Only "+m+" lies between those squares, so the number is <b>"+m+"</b>.",
    {mode:"between", a:a, b:b});
}, ["Square the two given numbers to turn the question into a range for the number itself.", "Check which candidate falls between the two squares you just found."]);
E("u2-pk-factor-list", 2, ["1.14"], 1, "gen", function(){
  var n=0,f=[],g0=0;
  while(g0++<300){ n=ri(12,120); f=u1Factors(n); if(f.length>=4)break; }
  var full=f.join(", ");
  var drop=f.filter(function(x){return x!==1&&x!==n;}); var dv=pick(drop);
  var missing=f.filter(function(x){return x!==dv;}).join(", ");
  var extraVal=0,g=0; while(g++<100){ var c=ri(2,n-1); if(n%c!==0){ extraVal=c; break; } }
  var withExtra=f.concat([extraVal]).sort(function(a,b){return a-b;}).join(", ");
  var proper=f.filter(function(x){return x!==n;}).join(", ");
  var opts=[
    {t:missing, fb:"That list leaves out "+dv+", and "+dv+" divides "+n+" exactly."},
    {t:withExtra, fb:"That list includes "+extraVal+", and "+extraVal+" does not divide "+n+" exactly."},
    {t:proper, fb:"That list leaves out "+n+" itself; a number is always a factor of itself."}];
  return mcq("Which list gives ALL the factors of \\("+n+"\\)?",
    {t:full, fb:"Correct: every number in the list divides "+n+" exactly, and none are missing."}, opts,
    "Test the small numbers in order using the divisibility rules and record each factor pair. The factors of \\("+n+"\\) are "+full+". The answer is <b>"+full+"</b>.",
    {n:n});
}, ["Work through the small numbers in order and test each one.", "Start with 1 and the number itself, then test 2, 3, 4 and so on, recording pairs."]);
E("u2-pk-divisible-by", 2, ["1.12"], 1, "gen", function(){
  var d=pick([2,3,4,5,6,8,9,10]);
  var n=ri(12,140)*d;
  var ds=[],guard=0;
  while(ds.length<3&&guard++<300){ var m=ri(24,1400); if(m%d!==0&&m!==n&&ds.indexOf(m)<0)ds.push(m); }
  var opts=ds.map(function(m){ return {t:String(m), fb:fmt(m)+" is not divisible by "+d+": "+u1Why(m,d,false)+"."}; });
  return mcq("Which number is divisible by \\("+d+"\\)?",
    {t:String(n), fb:"Yes: "+u1Why(n,d,true)+", so \\("+n+" \\div "+d+"\\) has no remainder."}, opts,
    "Use the divisibility test for \\("+d+"\\): "+u1Why(n,d,true)+". So \\("+n+"\\) is divisible by \\("+d+"\\). The answer is <b>"+n+"</b>.",
    {d:d,n:n});
}, ["Pick the divisor first and recall its divisibility test.", "Start by applying the test to each number in turn until one passes."]);
E("u2-pk-repeated-mult", 2, ["1.3"], 1, "gen", function () {
  var b = ri(2, 12), e = ri(2, 6);
  var correct = u3MultStr(b, e);
  var cands = [
    { t: u3MultStr(b, e + 1), fb: "That uses one factor too many. Count the exponent." },
    { t: u3MultStr(b, e - 1), fb: "That uses one factor too few. Count the exponent." },
    { t: u3MultStr(e, e), fb: "That repeats the exponent. The base is the repeated factor." },
    { t: u3MultStr(b, b), fb: "That repeats the base as many times as its own value." },
    { t: u3MultStr(b + 1, e), fb: "That changes the base. Keep the base from the power." }
  ];
  var ds = [], seen = {}; seen[correct] = 1;
  for (var i = 0; i < cands.length && ds.length < 3; i++) { if (!seen[cands[i].t]) { seen[cands[i].t] = 1; ds.push(cands[i]); } }
  return mcq("What is \\(" + b + "^{" + e + "}\\) written as repeated multiplication?",
    { t: correct, fb: "Correct. The base repeats as many times as the exponent says." }, ds,
    "The base is \\(" + b + "\\) and the exponent is \\(" + e + "\\), so write \\(" + b + "\\) as a factor \\(" + e + "\\) times: \\[ " + correct.replace("\\(", "").replace("\\)", "") + " \\] So the repeated multiplication is <b>" + correct + "</b>.",
    { mode: "power-to-repeated", b: b, e: e });
}, ["The exponent tells you how many times the base appears as a factor.", "Write the base down, then keep multiplying by it until you have used the exponent count."]);
E("u2-pk-evaluate-power", 2, ["1.4"], 1, "gen", function () {
  var tuples = [];
  for (var pb = 2; pb <= 12; pb++) for (var pe = 2; pe <= 4; pe++) tuples.push([pb, pe, 1]);
  for (var qb = 2; qb <= 6; qb++) tuples.push([qb, 5, 1]);
  for (var nb2 = 2; nb2 <= 9; nb2++) for (var ne = 2; ne <= 3; ne++) tuples.push([nb2, ne, -1]);
  var tt = pick(tuples), b = tt[0], e = tt[1], mode = tt[2] < 0 ? "neg" : "pos";
  var val, shown;
  if (mode === "neg") { val = Math.pow(-b, e); shown = "(-" + b + ")^{" + e + "}"; }
  else { val = Math.pow(b, e); shown = b + "^{" + e + "}"; }
  var base = (mode === "neg") ? -b : b;
  var sol = "Expand as repeated multiplication and multiply step by step: \\[ \\begin{aligned} " + shown + " &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.";
  return numq("Evaluate \\(" + shown + "\\).", val, 0, sol, { mode: "evaluate-single", base: base, e: e });
}, ["Expand the power as repeated multiplication first.", "Multiply the base by itself, using the exponent as the count."]);
E("u2-pk-parentheses-sign", 2, ["1.4"], 1, "gen", function () {
  var b = ri(2, 9), e = ri(2, 4);
  if (b >= 8 && e === 4) e = 3;
  var form = pick(["bracket", "outside", "inside"]);
  var val, shown;
  if (form === "bracket") { val = Math.pow(-b, e); shown = "(-" + b + ")^{" + e + "}"; }
  else if (form === "outside") { val = -Math.pow(b, e); shown = "-" + b + "^{" + e + "}"; }
  else { val = -Math.pow(b, e); shown = "(-" + b + "^{" + e + "})"; }
  var ds = u3Pick3(val, [
    { v: -val, fb: "That has the opposite sign. Check what the brackets cover." },
    { v: Math.pow(b, e), fb: "That ignores the negative sign in the expression." },
    { v: -Math.pow(b, e), fb: "That puts the negative sign outside the power." },
    { v: b * e, fb: "That multiplies the base and exponent. Use repeated multiplication." },
    { v: val + b, fb: "That is close, but the sign or value is off. Expand carefully." },
    { v: val - b, fb: "That is close, but the sign or value is off. Expand carefully." }
  ]);
  var explain = form === "bracket" ? "The brackets make \\((-" + b + ")\\) the base, so the negative value is multiplied each time." : "The power applies to \\(" + b + "\\) first, and the negative sign stays outside.";
  return mcq("Evaluate \\(" + shown + "\\).",
    { t: fmt(val), fb: "Correct. You handled the brackets and the sign correctly." }, ds,
    explain + " \\[ \\begin{aligned} " + shown + " &= " + fmt(val) + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "parentheses-" + form, b: b, e: e });
}, ["Look at what the brackets cover. That tells you what the base is.", "Work out the power part first, then apply the sign the brackets give you."]);
E("u2-pk-product-law", 2, ["1.6"], 1, "gen", function () {
  var a = ri(2, 9), m = ri(2, 6), n = ri(1, 6);
  if (m === 2 && n === 2) n = 3;
  var ds = u3PowDist(a, m + n, [
    { v: m * n, fb: "That multiplies the exponents. The product law adds them." },
    { v: m + n + 1, fb: "That adds one extra. Add the two exponents only." },
    { v: m + n - 1, fb: "That is one too small. Add the two exponents." },
    { v: Math.abs(m - n), fb: "That subtracts the exponents. The product law adds them." },
    { v: m * n + 1, fb: "That multiplies and adds one. Add the exponents instead." }
  ]);
  return mcq("Write \\(" + a + "^{" + m + "}\\times " + a + "^{" + n + "}\\) as a single power.",
    { t: "\\(" + a + "^{" + (m + n) + "}\\)", fb: "Correct. Same base, so the exponents add." }, ds,
    "The bases match, so add the exponents: \\[ \\begin{aligned} " + a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + m + "+" + n + "} \\\\ &= " + a + "^{" + (m + n) + "} \\end{aligned} \\] So the single power is <b>\\(" + a + "^{" + (m + n) + "}\\)</b>.",
    { mode: "product-law", a: a, m: m, n: n });
}, ["Check whether the bases match. Matching bases use the product law.", "Add the two exponents and keep the same base."]);
E("u2-pk-two-laws", 2, ["1.6"], 1, "gen", function () {
  var mode = pick(["prod", "quot", "powpow"]);
  var a, expr, val, steps;
  if (mode === "prod") {
    a = ri(2, 6); var m = ri(2, 3), n = ri(2, 3);
    val = Math.pow(a, m + n);
    expr = a + "^{" + m + "}\\times " + a + "^{" + n + "}";
    steps = a + "^{" + m + "}\\times " + a + "^{" + n + "} &= " + a + "^{" + (m + n) + "} \\\\ &= " + fmt(val);
  } else if (mode === "quot") {
    a = ri(2, 7); var n2 = ri(1, 2), m2 = n2 + ri(3, 4);
    val = Math.pow(a, m2 - n2);
    expr = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "}";
    steps = a + "^{" + m2 + "}\\div " + a + "^{" + n2 + "} &= " + a + "^{" + (m2 - n2) + "} \\\\ &= " + fmt(val);
  } else {
    a = ri(2, 5); var m3 = ri(2, 3), n3 = 2;
    val = Math.pow(a, m3 * n3);
    expr = "(" + a + "^{" + m3 + "})^{" + n3 + "}";
    steps = "(" + a + "^{" + m3 + "})^{" + n3 + "} &= " + a + "^{" + (m3 * n3) + "} \\\\ &= " + fmt(val);
  }
  return numq("Evaluate \\(" + expr + "\\) by first writing it as a single power.", val, 0,
    "Apply the exponent law first, then evaluate: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the value is <b>" + fmt(val) + "</b>.",
    { mode: "two-laws-" + mode, a: a });
}, ["Use an exponent law to write the expression as one power first.", "Combine the exponents with the matching law, then evaluate that power."]);
E("u2-pk-sum-of-powers", 2, ["1.4"], 1, "gen", function () {
  var mode = pick(["same", "diff"]);
  var expr, val, steps;
  if (mode === "same") {
    var a = ri(2, 7), m = ri(3, 4), n = ri(2, 3);
    var v1 = Math.pow(a, m), v2 = Math.pow(a, n);
    val = v1 + v2; expr = a + "^{" + m + "}+" + a + "^{" + n + "}";
    steps = a + "^{" + m + "}+" + a + "^{" + n + "} &= " + fmt(v1) + "+" + fmt(v2) + " \\\\ &= " + fmt(val);
  } else {
    var a2 = ri(2, 7), b2 = ri(2, 7), m2 = ri(2, 3), n2 = ri(2, 3);
    var w1 = Math.pow(a2, m2), w2 = Math.pow(b2, n2);
    val = w1 + w2; expr = a2 + "^{" + m2 + "}+" + b2 + "^{" + n2 + "}";
    steps = a2 + "^{" + m2 + "}+" + b2 + "^{" + n2 + "} &= " + fmt(w1) + "+" + fmt(w2) + " \\\\ &= " + fmt(val);
  }
  return numq("Determine the sum \\(" + expr + "\\). Show the value of each power in your work.", val, 0,
    "Evaluate each power on its own first, then add: \\[ \\begin{aligned} " + steps + " \\end{aligned} \\] So the sum is <b>" + fmt(val) + "</b>.",
    { mode: "sum-" + mode });
}, ["Evaluate each power separately before you add anything.", "Find the value of the first power, then the second power, then add them."]);
E("u2-pk-order-four", 2, ["1.22"], 1, "gen", function () {
  var negPool = [
    { v: -2.5, f: "-" + FR(5, 2) }, { v: -1.75, f: "-" + FR(7, 4) }, { v: -1.5, f: "-" + FR(3, 2) },
    { v: -1.25, f: "-" + FR(5, 4) }, { v: -1.2, f: "-" + FR(6, 5) }, { v: -0.8, f: "-" + FR(4, 5) },
    { v: -0.75, f: "-" + FR(3, 4) }, { v: -0.5, f: "-" + FR(1, 2) }, { v: -0.4, f: "-" + FR(2, 5) },
    { v: -0.25, f: "-" + FR(1, 4) }
  ];
  var posPool = [
    { v: 0.2, f: FR(1, 5) }, { v: 0.25, f: FR(1, 4) }, { v: 0.4, f: FR(2, 5) }, { v: 0.5, f: FR(1, 2) },
    { v: 0.6, f: FR(3, 5) }, { v: 0.75, f: FR(3, 4) }, { v: 0.8, f: FR(4, 5) }, { v: 1.25, f: FR(5, 4) },
    { v: 1.5, f: FR(3, 2) }, { v: 1.75, f: FR(7, 4) }, { v: 2.25, f: FR(9, 4) }, { v: 2.5, f: FR(5, 2) },
    { v: 3.5, f: FR(7, 2) }
  ];
  var nNeg = ri(1, 2);
  var items = shuffle(negPool).slice(0, nNeg).concat(shuffle(posPool).slice(0, 4 - nNeg));
  items.forEach(function (it) { it.s = "\\(" + (Math.random() < 0.5 ? it.f : fmt(it.v)) + "\\)"; });
  var sorted = items.slice().sort(function (a, b) { return a.v - b.v; });
  function listOf(arr) { return arr.map(function (it) { return it.s; }).join(", "); }
  var correct = listOf(sorted);
  var rev = listOf(sorted.slice().reverse());
  var swapArr = sorted.slice(); var tmp = swapArr[0]; swapArr[0] = swapArr[1]; swapArr[1] = tmp;
  var swapped = listOf(swapArr);
  var shuf = listOf(shuffle(sorted));
  var guard = 0;
  while ((shuf === correct || shuf === rev || shuf === swapped) && guard < 60) { shuf = listOf(shuffle(sorted)); guard++; }
  if (shuf === correct || shuf === rev || shuf === swapped) { var s2 = sorted.slice(); var t2 = s2[2]; s2[2] = s2[3]; s2[3] = t2; shuf = listOf(s2); }
  var prompt = "Which set is ordered from least to greatest?";
  var solution = "Compare the values as decimals: \\[ \\begin{aligned} " + sorted.map(function (it) { return fmt(it.v); }).join(" &< ") + " \\end{aligned} \\] So the order from least to greatest is <b>" + correct + "</b>.";
  return mcq(prompt,
    { t: correct, fb: "Correct. The values increase steadily from left to right." },
    [
      { t: rev, fb: "This lists the numbers from greatest to least instead." },
      { t: swapped, fb: "The first two values are swapped, so it starts out of order." },
      { t: shuf, fb: "At least one pair in this list is out of order." }
    ],
    solution, { mode: "order-four", vals: sorted.map(function (it) { return it.v; }).join(",") });
}, ["Picture the numbers on a number line, with negatives on the left.", "Rewrite each fraction as a decimal, then compare the decimals."]);
E("u2-pk-between-two", 2, ["1.21"], 1, "gen", function () {
  if (Math.random() < 0.5) {
    var a = ri(-20, 24) / 4;
    var gap = ri(3, 10) / 4;
    var b = a + gap;
    var c = a + gap / 2;
    var low = a - ri(1, 4) / 4;
    var high = b + ri(1, 4) / 4;
    var promptD = "Which number is between \\(" + fmt(a) + "\\) and \\(" + fmt(b) + "\\)?";
    var solD = "The number must be greater than \\(" + fmt(a) + "\\) and less than \\(" + fmt(b) + "\\): \\[ \\begin{aligned} " + fmt(a) + " &< " + fmt(c) + " < " + fmt(b) + " \\end{aligned} \\] So the number between them is <b>\\(" + fmt(c) + "\\)</b>.";
    return mcq(promptD,
      { t: fmt(c), fb: "Correct. It is greater than the left endpoint and less than the right one." },
      fmtPairDs(fmt(c), [
        { v: low, fb: "That number is smaller than the left endpoint." },
        { v: high, fb: "That number is larger than the right endpoint." },
        { v: a, fb: "That is the left endpoint itself, not a number between them." }
      ]),
      solD, { mode: "between-dec", a: a, b: b });
  }
  var den = pick([6, 8, 10, 12]);
  var an = ri(-12, 12);
  var diff = ri(4, 10);
  var bn = an + diff;
  var cn = an + ri(1, diff - 1);
  var lowN = an - ri(1, 4);
  var highN = bn + ri(1, 4);
  var promptF = "Which number is between " + u1frac(an, den) + " and " + u1frac(bn, den) + "?";
  var solF = "With a common denominator, compare the numerators: \\[ \\begin{aligned} " + FR(an, den) + " &< " + FR(cn, den) + " < " + FR(bn, den) + " \\end{aligned} \\] So the number between them is <b>" + u1frac(cn, den) + "</b>.";
  return mcq(promptF,
    { t: u1frac(cn, den), fb: "Correct. Its numerator sits between the two given numerators." },
    [
      { t: u1frac(lowN, den), fb: "That number is smaller than the left endpoint." },
      { t: u1frac(highN, den), fb: "That number is larger than the right endpoint." },
      { t: u1frac(an, den), fb: "That is the left endpoint itself, not a number between them." }
    ],
    solF, { mode: "between-frac", a: an, b: bn, d: den });
}, ["A number between two others is bigger than the smaller one and smaller than the bigger one.", "Compare each choice with both endpoints, one at a time."]);
E("u2-pk-frac-to-decimal", 2, ["1.18"], 1, "gen", function(){
  var dens=[2,4,5,8,10,20,25,40,50];
  var d=pick(dens), w=ri(0,2), n=ri(1,d-1);
  var v=(w*d+n)/d;
  var pool=[v+0.1,v-0.1,v+0.02,v-0.02,v+1,v+0.5];
  var seen={}; seen[fmt(v,4)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var key=fmt(pool[i],4);
    if(seen[key])continue; seen[key]=1;
    ds.push({t:fmt(pool[i],3), fb:"That decimal has a different value: divide the numerator by the denominator to check."});
  }
  ds=precPair(fmt(v,3),ds);
  var num=w*d+n;
  return mcq("Write \\("+FR(num,d)+"\\) as a decimal.",
    {t:fmt(v,3), fb:"Yes: "+num+" divided by "+d+" gives this decimal."},
    ds,
    "\\[ \\begin{aligned} "+FR(num,d)+" &= "+num+" \\div "+d+" \\\\ &= "+fmt(v,3)+" \\end{aligned} \\] The answer is <b>"+fmt(v,3)+"</b>.",
    {num:num, d:d});
}, ["A fraction is a division: numerator divided by denominator.", "Start by dividing the top number by the bottom number."]);
E("u2-pk-decimal-to-fraction", 2, ["1.18"], 1, "gen", function(){
  var pl=pick([1,2,3]), max=Math.pow(10,pl)-1, lo=(pl===1?1:11);
  var m=ri(lo,max); while(m%10===0)m=ri(lo,max);
  var den=Math.pow(10,pl), s=u3simp(m,den), corV=m/den;
  var pool=[[m,den],[den,m],[m,10],[m,1000],[m+den,den],[m,den*10]];
  var seen={}; seen[fmt(corV,6)]=1; var seenT={}; seenT[s[0]+"/"+s[1]]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var cv=pool[i][0]/pool[i][1], ss=u3simp(pool[i][0],pool[i][1]), tk=ss[0]+"/"+ss[1];
    if(seen[fmt(cv,6)]||seenT[tk])continue;
    seen[fmt(cv,6)]=1; seenT[tk]=1;
    ds.push({t:"\\("+FR(ss[0],ss[1])+"\\)", fb:"That fraction has a different value: count the decimal places to choose the denominator."});
  }
  return mcq("Write "+fmt(corV,3)+" as a fraction in lowest terms.",
    {t:"\\("+FR(s[0],s[1])+"\\)", fb:"Yes: the decimal has "+pl+" decimal place(s), so write it over "+den+" and simplify."},
    ds,
    "\\[ \\begin{aligned} "+fmt(corV,3)+" &= "+FR(m,den)+" \\\\ &= "+FR(s[0],s[1])+" \\end{aligned} \\] The answer is <b>\\("+FR(s[0],s[1])+"\\)</b>.",
    {m:m, pl:pl});
}, ["The number of decimal places tells you the denominator: tenths, hundredths or thousandths.", "Start by writing the decimal as a fraction over 10, 100 or 1000."]);

/* PK tranche metadata pass for Unit 2. The tranche's own entries are flagged here.  */
var PKT_U2_FOR=["1.1","1.2","1.3","1.4","1.5","1.6","1.7","1.8","1.9","1.10","1.12","1.13","1.14","1.15","1.16","1.17","1.18","1.19","1.20","1.21","1.22"];
var PKT_U2={
 "u2-pk-sqrt-perfect":{src:"math-8:5.2",group:"square-roots"},
 "u2-pk-factors-root":{src:"math-8:5.1",group:"square-roots"},
 "u2-pk-square-of-number":{src:"math-8:5.3",group:"square-roots"},
 "u2-pk-estimate-between":{src:"math-8:6.30",group:"square-roots"},
 "u2-pk-root-between":{src:"math-9:6.8",group:"square-roots"},
 "u2-pk-factor-list":{src:"math-7:5.4",group:"factors-multiples"},
 "u2-pk-divisible-by":{src:"math-7:5.1",group:"factors-multiples"},
 "u2-pk-repeated-mult":{src:"math-9:3.6",group:"powers"},
 "u2-pk-evaluate-power":{src:"math-9:3.10",group:"powers"},
 "u2-pk-parentheses-sign":{src:"math-9:3.8",group:"powers"},
 "u2-pk-product-law":{src:"math-9:3.11",group:"exponent-laws"},
 "u2-pk-two-laws":{src:"math-9:3.12",group:"exponent-laws"},
 "u2-pk-sum-of-powers":{src:"math-9:3.13",group:"exponent-laws"},
 "u2-pk-order-four":{src:"math-9:3.1",group:"real-numbers"},
 "u2-pk-between-two":{src:"math-9:3.2",group:"real-numbers"},
 "u2-pk-frac-to-decimal":{src:"math-7:3.11",group:"real-numbers"},
 "u2-pk-decimal-to-fraction":{src:"math-7:3.12",group:"real-numbers"}
};
BANK.forEach(function(e){var t=PKT_U2[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U2_FOR.slice();e.pkGroup=t.group;}});
