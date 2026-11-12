// Figure additions: the Unit 4 and Unit 8 gap entries assign q.figure from their own drawn values.
// Math 7 pool-gap fill additions (November 9, 2026) question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 4166 to 4469).
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
    {txt:"A print shop charges a setup fee plus a charge per metre of banner. The total cost is given by the relation ", v:"m", thing:"number of metres", unit:"dollars"},
    {txt:"A trophy shop charges an engraving setup fee plus a charge per trophy. The total cost is given by the relation ", v:"t", thing:"number of trophies", unit:"dollars"}]);
  var a=ri(3,9), b=ri(4,24), k=ri(6,18), Tot=a*k+b;
  return numq(C.txt+"\\(C = "+u1Expr(a,b,C.v)+"\\) "+C.unit+". A customer pays exactly $"+Tot+". What is the "+C.thing+"? Show your solving steps.", k, 0,
    "Set the relation equal to the total and solve. \\[ \\begin{aligned} "+u1Expr(a,b,C.v)+" &= "+Tot+" \\\\ "+a+C.v+" &= "+Tot+" - "+b+" \\\\ "+a+C.v+" &= "+(Tot-b)+" \\\\ "+C.v+" &= "+k+" \\end{aligned} \\] The answer is <b>"+k+"</b>.",
    {a:a,b:b,k:k});
}, ["Set the relation equal to the given total to form an equation, then undo the operations in reverse order.", "Start by subtracting the constant term from both sides."]);

E("u1-gap-divisible-count-cr", 1, ["5.4"], 2, "gen", function(){
  var d=pick([3,4,6,8,9]); var L=ri(15,70); var R=L+ri(50,110);
  var upToR=Math.floor(R/d), belowL=Math.floor((L-1)/d), ans=upToR-belowL;
  return numq("How many integers from "+L+" to "+R+", inclusive, are divisible by "+d+"? Show your counting method.", ans, 0,
    "Count the multiples of "+d+" up to "+R+", then subtract the multiples below "+L+". \\[ \\begin{aligned} \\text{multiples up to "+R+"} &= "+upToR+" \\\\ \\text{multiples below "+L+"} &= "+belowL+" \\\\ \\text{count} &= "+upToR+" - "+belowL+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {d:d,L:L,R:R});
}, ["Count multiples over the whole range from 1, then remove the part of the range you do not want.", "Start by finding how many multiples of the divisor there are up to the larger end of the interval."]);

E("u1-gap-two-terms-cr", 1, ["7.11","7.7"], 2, "gen", function(){
  var a0=ri(2,10), d=ri(2,9), p=ri(8,14), q=p+ri(6,12);
  var tp=a0+(p-1)*d, tq=a0+(q-1)*d, ans=tp+tq;
  var terms=[a0,a0+d,a0+2*d];
  return numq("A number pattern begins \\("+terms.join(", ")+", \\ldots\\) Find the term in position "+p+" and the term in position "+q+", and give the sum of those two terms. Show your work.", ans, 0,
    "The step is \\("+d+"\\), so the term in position \\(n\\) is \\("+u1Expr(d,a0-d)+"\\) . \\[ \\begin{aligned} \\text{term}_{"+p+"} &= "+a0+" + ("+p+" - 1) \\times "+d+" = "+tp+" \\\\ \\text{term}_{"+q+"} &= "+a0+" + ("+q+" - 1) \\times "+d+" = "+tq+" \\\\ \\text{sum} &= "+tp+" + "+tq+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a0:a0,d:d,p:p,q:q});
}, ["Build a relation for the term in position n, use it twice, then combine the two results.", "Start by finding the step size from the first three terms."]);

E("u1-gap-budget-compare-cr", 1, ["7.3","7.5"], 2, "gen", function(){
  var fee=ri(10,40), rate=ri(4,12), n=ri(3,10), cost=fee+rate*n, under=ri(3,18), budget=cost+under;
  return numq("A bike rental costs a flat fee of $"+fee+" plus $"+rate+" per day. The total cost is given by the relation \\(C = "+u1Expr(rate,fee,"d")+"\\) dollars, where \\(d\\) is the number of days. A rider rents a bike for "+n+" days and has a budget of $"+budget+". How many dollars under budget is the rental? Show your work.", under, 0,
    "Evaluate the relation first, then compare with the budget. \\[ \\begin{aligned} C &= "+rate+" \\times "+n+" + "+fee+" = "+cost+" \\\\ \\text{amount under budget} &= "+budget+" - "+cost+" = "+under+" \\end{aligned} \\] The answer is <b>$"+under+"</b>.",
    {fee:fee,rate:rate,n:n});
}, ["Evaluate the relation for the given number of days first; the comparison with the budget is the second step.", "Start by substituting the number of days into the relation."]);

/* --- Unit 2 pool-gap fill --- */
E("u2-gap-chain-target-cr", 2, ["6.29"], 2, "gen", function(){
  var a=ri(-6,10), b=ri(3,12), c=ri(2,10), e=ri(2,9);
  var fin=a-b+c-e; var T=pick([-5,0,5]); var g=0;
  while(fin===T&&g++<20){ e+=2; fin=a-b+c-e; }
  var ans=Math.abs(fin-T);
  return numq("The temperature starts at "+a+" degrees. It drops "+b+" degrees, then rises "+c+" degrees, then drops "+e+" degrees. How many degrees is the final temperature from "+T+" degrees? Show your work.", ans, 0,
    "Work through the changes in order, then find the distance from the target. \\[ \\begin{aligned} \\text{final} &= "+a+" - "+b+" + "+c+" - "+e+" = "+fin+" \\\\ \\text{distance from "+T+"} &= |"+fin+" - "+u2Sg(T)+"| = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a:a,b:b,c:c,e:e});
}, ["Find the final value first; the distance from the target is a second, separate step.", "Start by applying the first change to the starting temperature."]);

E("u2-gap-missing-start-cr", 2, ["6.29","6.25"], 2, "gen", function(){
  var a=ri(3,14), b=ri(3,14), e=ri(-8,12), start=e-a+b;
  return numq("A game score changes twice: first it increases by "+a+" points, then it decreases by "+b+" points. The final score is "+e+" points. What was the starting score? Show your work.", start, 0,
    "Undo the two changes in reverse order, starting from the final score. \\[ \\begin{aligned} \\text{start} &= "+e+" + "+b+" - "+a+" \\\\ &= "+start+" \\end{aligned} \\] Check: \\("+start+" + "+a+" - "+b+" = "+e+"\\). The answer is <b>"+start+"</b>.",
    {a:a,b:b,e:e});
}, ["Work backwards from the final score, undoing each change with its opposite operation.", "Start by undoing the last change: add back the points that were taken away."]);

E("u2-gap-mean-target-cr", 2, ["6.29"], 2, "gen", function(){
  var v1=0,v2=0,v3=0,v4=0,m=0,g=0;
  while(g++<200){ v1=ri(-12,12); v2=ri(-12,12); v3=ri(-12,12); m=ri(-4,6); v4=4*m-(v1+v2+v3); if(v4>=-15&&v4<=15) break; }
  var dist=ri(2,7), T=m+pick([-1,1])*dist, ans=dist;
  var vals=[v1,v2,v3,v4];
  return numq("Four daily low temperatures are "+vals.join(", ")+" degrees. Find the mean of the four temperatures, then give how many degrees that mean is from "+T+" degrees. Show your work.", ans, 0,
    "Add the four values and divide by 4, then compare the mean with the target. \\[ \\begin{aligned} \\text{mean} &= \\frac{"+v1+" + "+u2Sg(v2)+" + "+u2Sg(v3)+" + "+u2Sg(v4)+"}{4} = \\frac{"+(4*m)+"}{4} = "+m+" \\\\ \\text{distance} &= |"+m+" - "+u2Sg(T)+"| = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {vals:vals,m:m});
}, ["The mean is only the first step; the question also asks for the distance from a target value.", "Start by adding the four temperatures, watching the signs."]);

E("u2-gap-order-ops-cr", 2, ["6.29"], 2, "gen", function(){
  var r=pick([2,3,4,5]), q0=ri(2,9), diff=r*q0, p=ri(5,20), qq=p-diff, s=ri(2,12);
  var ans=-q0+s;
  return numq("Evaluate \\(("+p+" - "+u2Sg(qq)+") \\div ("+(-r)+") + "+s+"\\). Show the order of operations you follow.", ans, 0,
    "Do the brackets first, then the division, then the addition. \\[ \\begin{aligned} ("+p+" - "+u2Sg(qq)+") \\div ("+(-r)+") + "+s+" &= "+diff+" \\div ("+(-r)+") + "+s+" \\\\ &= "+(-q0)+" + "+s+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {p:p,qq:qq,r:r,s:s});
}, ["Follow the order of operations: brackets, then division, then addition, and watch the sign when dividing by a negative.", "Start by evaluating the brackets."]);

E("u2-gap-round-trip-cr", 2, ["6.26","6.28"], 2, "gen", function(){
  var p1=-ri(2,15), p2=ri(2,18), dist=p2-p1, ans=2*dist;
  return numq("An elevator starts on floor "+p1+" and travels up to floor "+p2+", then returns to floor "+p1+". How many floors does the elevator travel in total? Show your work.", ans, 0,
    "The one-way distance is the difference of the two positions, and the return trip covers the same distance again. \\[ \\begin{aligned} \\text{one way} &= "+p2+" - "+u2Sg(p1)+" = "+dist+" \\\\ \\text{total} &= 2 \\times "+dist+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {p1:p1,p2:p2});
}, ["Find the one-way distance between the two signed positions first; the round trip is that distance twice.", "Start by subtracting the lower floor number from the higher one."]);

E("u2-gap-order-ops-sr", 2, ["6.29"], 2, "gen", function(){
  var a=ri(8,17), b=ri(2,a-3), c=ri(2,5), d=ri(2,10);
  var base=a-b, ans=base*(-c)+d;
  var signErr=base*c+d, orderErr=a+b*c+d, arithErr=ans+pick([2,-2,c+1]);
  var cands=[signErr,orderErr,arithErr]; var seen={}; seen[String(ans)]=1; var ds=[];
  var fbs={}; fbs[String(signErr)]="That keeps the size but drops the negative sign on the multiplier."; fbs[String(orderErr)]="That multiplies before doing the brackets; the brackets come first."; fbs[String(arithErr)]="That has the right method but an arithmetic slip in the final steps.";
  cands.forEach(function(z){ if(!seen[String(z)]&&ds.length<3){ seen[String(z)]=1; ds.push({t:String(z), fb:fbs[String(z)]||"Check the brackets and the sign of the product."}); } });
  var g=2; while(ds.length<3){ var z=ans+g; if(!seen[String(z)]){ seen[String(z)]=1; ds.push({t:String(z), fb:"Check the brackets first, then the sign of the product."}); } g++; }
  return mcq("What is \\(("+a+" - "+b+") \\times ("+(-c)+") + "+d+"\\)?",
    {t:String(ans), fb:"Correct: the brackets give "+base+", the product is "+(base*(-c))+", and adding "+d+" gives "+ans+"."},
    ds,
    "Do the brackets first, then multiply, then add. \\[ \\begin{aligned} ("+a+" - "+b+") \\times ("+(-c)+") + "+d+" &= "+base+" \\times ("+(-c)+") + "+d+" \\\\ &= "+(base*(-c))+" + "+d+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a:a,b:b,c:c,d:d});
}, ["Do the brackets first, then the multiplication, then the addition.", "Start by evaluating the brackets."]);

/* --- Unit 3 pool-gap fill --- */
E("u3-gap-discount-total-cr", 3, ["6.12","6.11"], 2, "gen", function(){
  var P=20*ri(3,12), p=pick([10,15,20,25,30,35,40,45]);
  var disc=P*p/100, ans=P-disc;
  var item=pick(["jacket","bicycle helmet","backpack"]);
  return numq("A "+item+" is priced at $"+P+". The store offers a discount of "+p+"%. How many dollars does a customer pay for the "+item+"? Show your work.", ans, 0,
    "Find the discount amount first, then subtract it from the price. \\[ \\begin{aligned} \\text{discount} &= "+p+"\\% \\text{ of } "+P+" = "+disc+" \\\\ \\text{amount paid} &= "+P+" - "+disc+" = "+ans+" \\end{aligned} \\] The answer is <b>$"+ans+"</b>.",
    {P:P,p:p});
}, ["Find the percent amount first; the amount paid is what remains after it is taken off.", "Start by calculating the discount in dollars."]);

E("u3-gap-tickets-left-cr", 3, ["6.9"], 2, "gen", function(){
  var pr=pick([[1,3],[2,3],[1,4],[3,4],[1,6],[5,6],[1,8],[3,8],[5,8],[7,8],[2,5],[3,5]]);
  var n=pr[0], d=pr[1], T=d*ri(6,14), part=T*n/d, ans=T-part;
  return numq("A school prints "+T+" raffle tickets. In the morning, \\("+FR(n,d)+"\\) of the tickets are sold. How many tickets are left to sell? Show your work.", ans, 0,
    "Find how many tickets were sold first, then take that away from the total. \\[ \\begin{aligned} \\text{sold} &= "+FR(n,d)+" \\text{ of } "+T+" = "+part+" \\\\ \\text{left} &= "+T+" - "+part+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {n:n,d:d,T:T});
}, ["Find the part that was sold first; what is left is the complement of that part.", "Start by finding the fraction of the total tickets."]);

E("u3-gap-decimal-fraction-cr", 3, ["3.12"], 2, "gen", function(){
  var pr=pick([[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8]]);
  var n=pr[0], d=pr[1], dec=n/d, Q=d*ri(6,14), ans=Q*n/d;
  return numq("Write "+fmt(dec,3)+" as a fraction in lowest terms, then find that fraction of "+Q+" kilograms. Give the final amount, in kilograms. Show your work.", ans, 0,
    "As a fraction, \\("+fmt(dec,3)+" = "+FR(n,d)+"\\) in lowest terms. Apply that fraction to the quantity. \\[ \\begin{aligned} "+FR(n,d)+" \\text{ of } "+Q+" &= "+Q+" \\div "+d+" \\times "+n+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {n:n,d:d,Q:Q});
}, ["Convert the decimal to a fraction first; only then can you apply it to the quantity.", "Start by writing the decimal as a fraction over 10, 100 or 1000 and reducing it."]);

E("u3-gap-compare-difference-cr", 3, ["3.5","3.3"], 2, "gen", function(){
  var pr=pick([[3,4],[5,8],[7,8],[2,5],[4,5],[9,10],[3,5],[1,4],[7,10],[3,8]]);
  var n=pr[0], d=pr[1], dec1=n/d;
  var off=pick([-0.15,-0.08,-0.06,0.07,0.09,0.12]); var dec2=Math.round((dec1+off)*1000)/1000;
  var ans=Math.round(Math.abs(dec1-dec2)*1000)/1000;
  var larger=off<0?("the fraction"):("the decimal");
  return numq("Compare \\("+FR(n,d)+"\\) and "+fmt(dec2,3)+". How much larger is the larger value than the smaller value? Show your work.", ans, 0.001,
    "Convert the fraction to a decimal first: \\("+FR(n,d)+" = "+fmt(dec1,3)+"\\). The larger value is "+larger+", and the difference is \\(|"+fmt(dec1,3)+" - "+fmt(dec2,3)+"| = "+fmt(ans,3)+"\\). The answer is <b>"+fmt(ans,3)+"</b>.",
    {n:n,d:d});
}, ["Convert both values to the same form before comparing them, then subtract to find the gap.", "Start by dividing the numerator by the denominator to get the fraction as a decimal."]);

/* --- Unit 4 pool-gap fill --- */
E("u4-gap-area-diameter-cr", 4, ["9.11","9.9"], 2, "gen", function(){
  var r=ri(3,14), d=2*r, area=Math.round(3.14*r*r*100)/100; var item=pick(["A circular rug","A round clock","A circular pizza pan","A round garden bed","A circular table"]);
  var q=numq(item+" has a diameter of "+d+" cm. Find its area, in square centimetres. Use 3.14 for pi. Show your work.", area, 0.1,
    "The radius is half the diameter, and the area uses the radius. \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ A &= 3.14 \\times "+r+"^2 = "+fmt(area,2)+" \\end{aligned} \\] The answer is <b>"+fmt(area,2)+"</b>.",
    {r:r,d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
}, ["Halve the diameter to get the radius before using the area formula.", "Start by dividing the diameter by 2."]);

E("u4-gap-rect-minus-circle-cr", 4, ["9.1","9.3"], 2, "gen", function(){
  var L=ri(12,20), W=ri(9,15), r=pick([2,3,4]);
  var rect=L*W, circ=Math.round(3.14*r*r*100)/100, ans=Math.round((rect-circ)*100)/100;
  var q=numq("A rectangular garden is "+L+" m long and "+W+" m wide. A circular pond with radius "+r+" m sits inside the garden. Find the area of the garden that is not covered by the pond, in square metres. Use 3.14 for pi. Show your work.", ans, 0.1,
    "Find the area of the rectangle and the area of the circle, then subtract. \\[ \\begin{aligned} A_{\\text{rectangle}} &= "+L+" \\times "+W+" = "+rect+" \\\\ A_{\\text{circle}} &= 3.14 \\times "+r+"^2 = "+fmt(circ,2)+" \\\\ \\text{remaining} &= "+rect+" - "+fmt(circ,2)+" = "+fmt(ans,2)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
    {L:L,W:W,r:r}); q.figure=figRectCircle(L,W,r,"m"); return q;
}, ["This is a rectangle area minus a circle area, so calculate each area separately first.", "Start with the area of the whole rectangle."]);

E("u4-gap-revolutions-cr", 4, ["9.7","9.10"], 2, "gen", function(){
  var r=pick([20,25,30,35,40,50]), C=Math.round(2*3.14*r*100)/100, k=ri(8,25);
  var ans=Math.round(C*k/100*100)/100;
  var q=numq("A bicycle wheel has a radius of "+r+" cm. The wheel turns "+k+" full revolutions. How many metres does the bicycle travel? Use 3.14 for pi. Show your work.", ans, 0.1,
    "One revolution covers one circumference, so find the circumference first, then multiply and convert. \\[ \\begin{aligned} C &= 2 \\times 3.14 \\times "+r+" = "+fmt(C,2)+" \\text{ cm} \\\\ \\text{distance} &= "+fmt(C,2)+" \\times "+k+" = "+fmt(C*k,2)+" \\text{ cm} = "+fmt(ans,2)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
    {r:r,k:k}); q.figure=u4circleFig("r = "+r+" cm","r"); return q;
}, ["One turn of the wheel covers one circumference; find that distance first, then scale it up and convert units.", "Start by using the radius to find the circumference."]);

/* --- Unit 5 pool-gap fill --- */
E("u5-gap-recipe-total-cr", 5, ["6.23","6.17"], 2, "gen", function(){
  var N=ri(5,15), f=pick([2,3]), ing=pick(["flour","sugar","rolled oats"]);
  var ans=(1+f)*N/4;
  return numq("A recipe uses "+u5M(N,4)+" cups of "+ing+" for one batch. A cook makes one batch, and then a second batch that is "+f+" times as large. How many cups of "+ing+" are used in all? Give your answer as a decimal number of cups. Show your work.", ans, 0.01,
    "Find the amount for the large batch first, then add the two batches. \\[ \\begin{aligned} \\text{second batch} &= "+f+" \\times "+u5disp(N,4)+" = "+u5disp(f*N,4)+" \\\\ \\text{total} &= "+u5disp(N,4)+" + "+u5disp(f*N,4)+" = "+u5disp((1+f)*N,4)+" = "+fmt(ans,2)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,2)+"</b>.",
    {N:N,f:f});
}, ["Scale the recipe amount for the second batch first; the total combines both batches.", "Start by multiplying the one-batch amount by the scale factor."]);

E("u5-gap-sub-mixed-dec-cr", 5, ["6.21","6.19"], 2, "gen", function(){
  var mode=pick(["q","e"]); var d, w1, n1, w2, n2;
  if(mode==="q"){ d=4; w1=ri(4,7); n1=pick([1,2]); w2=ri(1,3); n2=3; }
  else { d=8; w1=ri(4,7); n1=pick([1,2,3,4]); w2=ri(1,3); n2=pick([5,6,7]); }
  var startN=w1*d+n1, subN=w2*d+n2, ans=(startN-subN)/d;
  return numq("A tank holds "+u5M(startN,d)+" litres of water. A class uses "+u5M(subN,d)+" litres. How many litres are left in the tank? Give your answer as a decimal. Show your work.", ans, 0.001,
    "The fraction part being subtracted is larger, so borrow 1 whole from the whole-number part first. \\[ \\begin{aligned} "+u5disp(startN,d)+" - "+u5disp(subN,d)+" &= "+u5disp(startN-subN,d)+" \\\\ &= "+fmt(ans,3)+" \\end{aligned} \\] The answer is <b>"+fmt(ans,3)+"</b>.",
    {mode:mode,startN:startN,subN:subN,d:d});
}, ["Compare the fraction parts first; here the subtraction needs borrowing from the whole-number part.", "Start by rewriting the first mixed number with one whole borrowed into its fraction part."]);

E("u5-gap-grams-cr", 5, ["6.23"], 2, "gen", function(){
  var pr=pick([[3,4],[5,8],[3,8],[7,8],[2,5],[4,5],[3,5],[1,2]]);
  var n=pr[0], d=pr[1], M=ri(2,6), grams=M*1000, ans=grams*n/d; var item=pick(["flour","sugar","rice flour","cocoa powder"]);
  return numq("A bag of "+item+" has a mass of "+M+" kilograms. A baker uses \\("+FR(n,d)+"\\) of the bag. How many grams of "+item+" does the baker use? Show your work.", ans, 0,
    "Convert the mass to grams first, then take the fraction of that amount. \\[ \\begin{aligned} "+M+" \\text{ kg} &= "+grams+" \\text{ g} \\\\ "+FR(n,d)+" \\text{ of } "+grams+" &= "+grams+" \\div "+d+" \\times "+n+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {n:n,d:d,M:M});
}, ["Change the unit first so the final answer comes out in grams, then find the fraction of the converted amount.", "Start by multiplying the kilograms by 1000."]);

E("u5-gap-frac-of-frac-cr", 5, ["6.23","6.22"], 2, "gen", function(){
  var p1=pick([[1,2],[1,3],[2,3],[1,4],[3,4]]), p2=pick([[1,2],[1,4],[2,3],[3,4],[1,5],[2,5]]);
  var base=p1[1]*p2[1], Q=base*ri(4,9), step1=Q*p1[0]/p1[1], ans=step1*p2[0]/p2[1];
  return numq("A school prints "+Q+" pages for a booklet project. Of those pages, \\("+FR(p1[0],p1[1])+"\\) are set aside for booklets. Of the pages set aside, \\("+FR(p2[0],p2[1])+"\\) are printed in colour. How many pages are printed in colour? Show your work.", ans, 0,
    "Take the first fraction of the total, then take the second fraction of that result. \\[ \\begin{aligned} \\text{set aside} &= "+FR(p1[0],p1[1])+" \\text{ of } "+Q+" = "+step1+" \\\\ \\text{colour} &= "+FR(p2[0],p2[1])+" \\text{ of } "+step1+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {Q:Q,step1:step1});
}, ["Work in stages: the second fraction acts on the result of the first fraction, not on the original total.", "Start by finding the first fraction of the total pages."]);

/* --- Unit 6 pool-gap fill --- */
E("u6-gap-two-step-cr", 6, ["8.14"], 2, "gen", function(){
  var a=ri(3,9), x=ri(4,15), b=ri(3,20), c=a*x+b;
  return numq("A student buys notebooks at $"+a+" each and pays a delivery fee of $"+b+". The total cost is $"+c+". The cost is modelled by \\("+a+"x + "+b+" = "+c+"\\), where \\(x\\) is the number of notebooks. Solve the equation to find \\(x\\). Show your solving steps.", x, 0,
    "Undo the addition first, then undo the multiplication. \\[ \\begin{aligned} "+a+"x + "+b+" &= "+c+" \\\\ "+a+"x &= "+(c-b)+" \\\\ x &= "+x+" \\end{aligned} \\] The answer is <b>"+x+"</b>.",
    {a:a,b:b,x:x});
}, ["Undo the operations in reverse order: undo the addition before the multiplication.", "Start by subtracting the constant from both sides."]);

E("u6-gap-both-sides-cr", 6, ["8.14","8.3"], 2, "gen", function(){
  var a=ri(5,9), c2=ri(2,a-2), x=ri(3,12), b=ri(2,15), d2=b+(a-c2)*x;
  return numq("Solve \\("+a+"x + "+b+" = "+c2+"x + "+d2+"\\). Show your solving steps.", x, 0,
    "Collect the variable terms on one side first, then collect the constants, then divide. \\[ \\begin{aligned} "+a+"x + "+b+" &= "+c2+"x + "+d2+" \\\\ "+(a-c2)+"x &= "+(d2-b)+" \\\\ x &= "+x+" \\end{aligned} \\] The answer is <b>"+x+"</b>.",
    {a:a,c2:c2,x:x});
}, ["Get all the variable terms on one side and all the constants on the other before dividing.", "Start by subtracting the smaller variable term from both sides."]);

E("u6-gap-divide-form-cr", 6, ["8.14"], 2, "gen", function(){
  var a=ri(3,8), k=ri(6,15), b=ri(2,Math.min(10,k-2)), c=k-b, x=a*k;
  return numq("Solve \\(\\frac{x}{"+a+"} - "+b+" = "+c+"\\). Show your solving steps.", x, 0,
    "Undo the subtraction first, then undo the division by multiplying. \\[ \\begin{aligned} \\frac{x}{"+a+"} - "+b+" &= "+c+" \\\\ \\frac{x}{"+a+"} &= "+k+" \\\\ x &= "+a+" \\times "+k+" = "+x+" \\end{aligned} \\] The answer is <b>"+x+"</b>.",
    {a:a,k:k,b:b});
}, ["Undo the operations in reverse order: undo the subtraction before undoing the division.", "Start by adding the constant to both sides."]);

E("u6-gap-check-diff-cr", 6, ["8.17","8.11"], 2, "gen", function(){
  var a=ri(3,8), b=ri(2,15), xt=ri(4,12), c=a*xt+b;
  var delta=pick([2,3,-2,-3]); if(xt+delta<1) delta=-delta;
  var x0=xt+delta, lhs=a*x0+b, ans=lhs-c;
  return numq("A student claims that \\(x = "+x0+"\\) solves \\("+a+"x + "+b+" = "+c+"\\). Evaluate the left side at \\(x = "+x0+"\\), then give the value of left side minus right side. Show your work.", ans, 0,
    "Substitute the claimed value into the left side, then compare it with the right side. \\[ \\begin{aligned} \\text{left side} &= "+a+" \\times "+x0+" + "+b+" = "+lhs+" \\\\ \\text{left} - \\text{right} &= "+lhs+" - "+c+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {a:a,b:b,x0:x0});
}, ["Verification means substituting the claimed value and evaluating, then comparing the two sides.", "Start by replacing x with the claimed value in the left side."]);

/* --- Unit 7 pool-gap fill --- */
E("u7-gap-missing-mean-cr", 7, ["11.9"], 2, "gen", function(){
  var M=ri(8,16), known=[], missing=0, g=0;
  while(g++<300){ known=[]; var s=0; for(var i=0;i<5;i++){ var v=ri(4,20); known.push(v); s+=v; } missing=6*M-s; if(missing>=2&&missing<=24) break; }
  return numq("The mean of six quiz scores is "+M+". Five of the scores are "+known.join(", ")+". What is the sixth score? Show your work.", missing, 0,
    "The mean fixes the total of all six scores, so find that total and subtract the known scores. \\[ \\begin{aligned} \\text{total} &= 6 \\times "+M+" = "+(6*M)+" \\\\ \\text{sixth score} &= "+(6*M)+" - "+(6*M-missing)+" = "+missing+" \\end{aligned} \\] The answer is <b>"+missing+"</b>.",
    {M:M,known:known});
}, ["A stated mean tells you the total; work from the total back to the missing value.", "Start by multiplying the mean by the number of scores."]);

E("u7-gap-median-range-cr2", 7, ["11.6","11.7"], 2, "gen", function(){
  var m=ri(8,20);
  var low=[m-ri(4,7), m-ri(2,3), m-ri(1,2)], high=[m+ri(1,2), m+ri(3,4), m+ri(5,8)];
  var sorted=low.concat([m],high), range=sorted[6]-sorted[0], ans=m+range;
  var shown=shuffle(sorted);
  return numq("A data set is "+shown.join(", ")+". Find the median of the set and the range of the set, and give the sum of the median and the range. Show your work.", ans, 0,
    "Order the values first; the median is the middle value and the range is the spread. \\[ \\begin{aligned} \\text{ordered} &= "+sorted.join(", ")+" \\\\ \\text{median} &= "+m+" \\\\ \\text{range} &= "+sorted[6]+" - "+sorted[0]+" = "+range+" \\\\ \\text{sum} &= "+m+" + "+range+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {m:m,range:range});
}, ["Order the data first; both the median and the range come from the ordered set, then combine them.", "Start by writing the values in order from smallest to largest."]);

E("u7-gap-joint-pct-cr", 7, ["12.5","12.7"], 2, "gen", function(){
  var N=pick([40,50,80,100]);
  var J=ri(6,16), swimOnly=ri(5,20), S=J+swimOnly, pct=Math.round(100*J/N*100)/100;
  return numq("A survey asks "+N+" students about swimming and hockey. In total, "+S+" students swim. Of the students who swim, "+swimOnly+" do not play hockey. What percent of all "+N+" students both swim and play hockey? Show your work.", pct, 0.1,
    "Find the number who do both first, then write that count as a percent of all students. \\[ \\begin{aligned} \\text{both} &= "+S+" - "+swimOnly+" = "+J+" \\\\ \\text{percent} &= \\frac{"+J+"}{"+N+"} \\times 100 = "+fmt(pct,2)+"\\% \\end{aligned} \\] The answer is <b>"+fmt(pct,2)+"</b>.",
    {N:N,J:J,S:S});
}, ["The count who do both is not stated directly; extract it first, then convert the fraction of all students to a percent.", "Start by subtracting to find how many students both swim and play hockey."]);

E("u7-gap-expected-pct-cr", 7, ["12.6","12.7"], 2, "gen", function(){
  var p=pick([10,15,20,25,30,40,50,60,75,80]), N=pick([120,160,200,240,300,400]);
  var ans=N*p/100;
  return numq("A spinner lands on red "+p+"% of the time in the long run. The spinner is spun "+N+" times. How many red results should be expected? Show your work.", ans, 0,
    "Change the percent to a fraction of the trials, then apply it to the number of spins. \\[ \\begin{aligned} \\text{expected reds} &= "+p+"\\% \\text{ of } "+N+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {p:p,N:N});
}, ["An expected count applies the long-run percent to the actual number of trials.", "Start by finding what one percent of the trials is, or by writing the percent as a decimal."]);

/* --- Unit 8 pool-gap fill --- */
E("u8-gap-angle-chain-cr", 8, ["10.1"], 2, "gen", function(){
  var B=0,C=0,D=0,third=0,g=0;
  while(g++<200){ B=ri(35,120); C=180-B; D=ri(15,60); third=180-C-D; if(third>=10) break; }
  var q=numq("Angle P sits on a straight line with an angle of "+B+" degrees, so angle P and the "+B+" degree angle are supplementary. Angle P is one angle of a triangle whose second angle is "+D+" degrees. Find the third angle of the triangle, in degrees. Show your work.", third, 0,
    "Find angle P from the straight line first, then use the triangle angle sum. \\[ \\begin{aligned} P &= 180 - "+B+" = "+C+" \\\\ \\text{third angle} &= 180 - "+C+" - "+D+" = "+third+" \\end{aligned} \\] The answer is <b>"+third+"</b>.",
    {B:B,D:D}); q.figure=triAngSVG(C,D,third,{L:["","",""],ang:["P",D+"°","?"]}); return q;
}, ["Two angle facts are chained here: use the straight-line fact first, then feed its result into the triangle.", "Start by finding the supplementary angle on the straight line."]);

E("u8-gap-pythagoras-cr", 8, ["10.19"], 2, "gen", function(){
  var s=ri(1,3), ox=ri(-4,2), oy=ri(-3,3);
  var A=[ox,oy], B=[ox+3*s,oy], Cc=[ox+3*s,oy+4*s], hyp=5*s;
  var q=numq("Points A "+u8pair(A[0],A[1])+", B "+u8pair(B[0],B[1])+" and C "+u8pair(Cc[0],Cc[1])+" form a right triangle with the right angle at B. Find the length of the hypotenuse AC. Show your work.", hyp, 0,
    "Count the legs from the coordinate differences first, then use the Pythagorean relationship. \\[ \\begin{aligned} AB &= "+(3*s)+", \\quad BC = "+(4*s)+" \\\\ AC^2 &= "+(3*s)+"^2 + "+(4*s)+"^2 = "+(25*s*s)+" \\\\ AC &= "+hyp+" \\end{aligned} \\] The answer is <b>"+hyp+"</b>.",
    {s:s}); q.figure=figWideGrid([{x:A[0],y:A[1],label:"A"},{x:B[0],y:B[1],label:"B"},{x:Cc[0],y:Cc[1],label:"C"}],[[A,B,Cc]],null); return q;
}, ["Get the two leg lengths from the coordinates first; the hypotenuse comes from combining them.", "Start by finding how far apart the points are horizontally and vertically."]);

E("u8-gap-rotate-cr", 8, ["10.20","10.12"], 2, "gen", function(){
  var x=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]), y=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var cw=Math.random()<0.5;
  var step1=cw?[y,-x]:[-y,x], step2=[-x,-y];
  var askX=Math.random()<0.5, ans=askX?step2[0]:step2[1];
  var dirTxt=cw?"clockwise":"counterclockwise";
  var q=numq("Point P "+u8pair(x,y)+" is rotated 90 degrees "+dirTxt+" about the origin, and the image is then rotated another 90 degrees "+dirTxt+" about the origin. What is the "+(askX?"x":"y")+"-coordinate of the final image? Show your work.", ans, 0,
    "Apply the quarter-turn rule twice, updating the point after each turn. \\[ \\begin{aligned} \\text{start} &= "+u8pair(x,y)+" \\\\ \\text{after one turn} &= "+u8pair(step1[0],step1[1])+" \\\\ \\text{after two turns} &= "+u8pair(step2[0],step2[1])+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",
    {x:x,y:y}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
}, ["Apply the rotation one quarter turn at a time, updating the coordinates after each turn.", "Start by applying the first 90 degree turn to the original point."]);

E("u8-gap-grid-area-cr", 8, ["10.9"], 2, "gen", function(){
  var F=ri(9,20), H=pick([2,4,6,8,10]), s=pick([2,3,4]);
  var units=F+H/2, ans=units*s*s;
  var q=numq("A shape drawn on grid paper covers "+F+" whole grid squares and "+H+" half grid squares. Each grid square is "+s+" cm by "+s+" cm. Find the area of the shape, in square centimetres. Show your work.", ans, 0,
    "Combine the half squares into whole squares first, then multiply by the area of one square. \\[ \\begin{aligned} \\text{squares} &= "+F+" + "+H+" \\div 2 = "+units+" \\\\ \\text{area of one square} &= "+s+" \\times "+s+" = "+(s*s)+" \\\\ \\text{area} &= "+units+" \\times "+(s*s)+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {F:F,H:H,s:s}); q.figure=figGridArea(F,H); return q;
}, ["Turn the half squares into whole-square equivalents first, then apply the scale of one square.", "Start by pairing the half squares into whole squares."]);

E("u8-gap-parallel-angle-cr", 8, ["10.1"], 2, "gen", function(){
  var A=0,B=0,third=0,g=0;
  while(g++<200){ A=ri(40,110); B=ri(20,60); third=180-A-B; if(third>=10) break; }
  var q=numq("Two parallel lines are cut by a transversal. One angle formed is "+A+" degrees, and an alternate interior angle equal to it forms one angle of a triangle. A second angle of the triangle is "+B+" degrees. Find the third angle of the triangle, in degrees. Show your work.", third, 0,
    "Alternate interior angles formed by parallel lines are equal, so the triangle angle is "+A+" degrees; then use the triangle angle sum. \\[ \\begin{aligned} \\text{third angle} &= 180 - "+A+" - "+B+" = "+third+" \\end{aligned} \\] The answer is <b>"+third+"</b>.",
    {A:A,B:B}); q.figure=triAngSVG(A,B,third,{L:["","",""],ang:[A+"°",B+"°","?"]}); return q;
}, ["Use the parallel-line angle relationship first to get the triangle angle, then the triangle angle sum.", "Start by stating the size of the alternate interior angle."]);
