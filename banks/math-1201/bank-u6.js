// Math 1201 Unit 6 Systems of Linear Equations question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 3698 to 4138).
// CRMARKS: u6-solve-graph=3
// CRMARKS: u6-problem=3
// CRMARKS: u6-solve-algebra=3
// CRMARKS: u6-solution-count=2
// CRMARKS: u6-break-even=2
// CRMARKS: u6-solve-elimination=4
// CRMARKS: u6-word-problem=2
// CRMARKS: u6-mixture=2
// CRMARKS: u6-travel=2
/* Math 1201 Review, Unit 6: Systems of Linear Equations (tranche 2).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u6. Every entry returns the same question type on every draw.
   Every system is built solution-first: the integer solution is chosen first,
   then the equations are constructed around it, so keys verify exactly. */

/* ================= u6 helpers ================= */
function u6gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u6sgn(n){return n>0?(" + "+n):(n<0?(" - "+(-n)):"");}
function u6coefVar(c,v){if(c===1)return v;if(c===-1)return "-"+v;return c+v;}
function u6slopeTerm(m){return u6coefVar(m,"x");}
function u6yRHS(m,b){return u6slopeTerm(m)+u6sgn(b);}
function u6yEq(m,b){return "y = "+u6yRHS(m,b);}
function u6lhs(a,b){var s=u6coefVar(a,"x");if(b>0)s+=" + "+u6coefVar(b,"y").replace("-","");else if(b<0)s+=" - "+u6coefVar(-b,"y");return s;}
function u6std(a,b,c){return u6lhs(a,b)+" = "+c;}
function u6pair(x,y){return "("+x+", "+y+")";}
function u6pickD3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="number"&&isFinite(c)&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var k=2;while(out.length<3){var c2=ans+k;k++;if(c2!==ans&&!seen[c2]){seen[c2]=1;out.push(c2);}}
  return out;
}
function u6pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  return out;
}
/* Aligned solution chain for the shared solve of y = m1 x + b1 and y = m2 x + b2
   meeting at (X, Y); ask is "x" or "y". */
function u6meetSol(m1,b1,m2,b2,X,Y,ask){
  return "\\[ \\begin{aligned} "+u6yEq(m1,b1)+" \\\\ "+u6yEq(m2,b2)+" \\end{aligned} \\]"+
  " At the intersection the two \\(y\\) values are equal, so set the right sides equal and solve: \\["+
  "\\begin{aligned} "+u6yRHS(m1,b1)+" &= "+u6yRHS(m2,b2)+" \\\\ "+u6coefVar(m1-m2,"x")+" &= "+(b2-b1)+" \\\\ x &= "+X+" \\end{aligned} \\]"+
  " Substitute \\(x = "+X+"\\) into the first equation to get \\(y\\): \\["+
  "\\begin{aligned} y &= "+m1+"("+X+")"+u6sgn(b1)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
  " The point of intersection is \\("+u6pair(X,Y)+"\\) (check: the second equation also gives \\("+m2+"("+X+")"+u6sgn(b2)+" = "+Y+"\\), confirming the solution in both equations). The "+(ask==="x"?"x":"y")+"-value is <b>\\("+(ask==="x"?X:Y)+"\\)</b>.";
}

/* ================= 1. model a situation (4.50, L2, gen mcq) ================= */
E("u6-model",6,["4.50"],2,"gen",function(){
  var profs=[
    {intro:"A reader shops at a book fair.",n1:"paperback books",n2:"hardcover books",pair:[4,11]},
    {intro:"A gardener shops at a market stall.",n1:"bags of potatoes",n2:"bags of onions",pair:[5,8]},
    {intro:"A rider buys transit passes at a kiosk.",n1:"single ride passes",n2:"day passes",pair:[3,9]},
    {intro:"A pet owner shops at a supply store.",n1:"cans of cat food",n2:"bags of treats",pair:[2,6]},
    {intro:"A camper rents gear at an outfitter.",n1:"day rentals of kayaks",n2:"day rentals of canoes",pair:[12,18]}
  ];
  var pi=ri(0,profs.length-1),prof=profs[pi];
  var p=prof.pair[0],q=prof.pair[1];
  if(Math.random()<0.5){var tp=p;p=q;q=tp;}
  var X=ri(3,14),Y=ri(3,14),T=X+Y,S=p*X+q*Y;
  var key="\\(x + y = "+T+", \\quad "+p+"x + "+q+"y = "+S+"\\)";
  var d1="\\(x + y = "+S+", \\quad "+p+"x + "+q+"y = "+T+"\\)";
  var d2="\\(x + y = "+T+", \\quad "+q+"x + "+p+"y = "+S+"\\)";
  var d3="\\(x - y = "+T+", \\quad "+p+"x + "+q+"y = "+S+"\\)";
  var ds=u6pickS3(key,[d1,d2,d3]);
  return mcq(prof.intro+" Let \\(x\\) be the number of "+prof.n1+" bought and \\(y\\) be the number of "+prof.n2+" bought. One of the first item costs "+p+" dollars and one of the second item costs "+q+" dollars. In total, "+T+" items are bought for "+S+" dollars. Which system of equations models this situation?",
    key,ds,
    "The count of items gives one equation and the total cost gives the other: \\["+
    "\\begin{aligned} x + y &= "+T+" \\\\ "+p+"x + "+q+"y &= "+S+" \\end{aligned} \\]"+
    " The first equation counts the items, and the second adds each price times its count to reach the total cost in dollars. The system that models the situation is <b>"+key+"</b>.",
    {prof:pi,X:X,Y:Y,p:p,q:q,T:T,S:S,keyText:key});
});

/* ================= 2. relate a system to its context (4.51, L1, var mcq) ================= */
E("u6-relate",6,["4.51"],1,"var",varset([
  function(){var key="It says that the total number of muffins and scones bought adds up to 18 items in total";
    return mcq("Leah buys muffins and scones at a bakery. Let \\(x\\) be the number of muffins and \\(y\\) be the number of scones. One equation in the system for her purchase is \\(x + y = 18\\). What does this equation represent?",
    key,
    ["It says that the total cost of the muffins and scones bought comes to 18 dollars in all",
     "It says that the number of muffins bought is 18 more than the number of scones she bought",
     "It says that one muffin and one scone bought together cost a combined 18 dollars in all"],
    "The variables \\(x\\) and \\(y\\) count items, not dollars, so their sum counts items. The equation \\(x + y = 18\\) adds the number of muffins and the number of scones, so <b>it says that the total number of muffins and scones bought adds up to 18 items in total</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It is the total cost, in dollars, of all the cars that used the parking lot that day";
    return mcq("A parking lot charges 20 dollars per car and 35 dollars per truck. Let \\(x\\) be the number of cars and \\(y\\) be the number of trucks that used the lot one day, with \\(x + y = 40\\) and \\(20x + 35y = 950\\). In the second equation, what does the term \\(20x\\) represent?",
    key,
    ["It is the total number of cars that used the parking lot on that particular busy day",
     "It is the cost, in dollars, of parking one single car in the lot for one full day there",
     "It is the total cost, in dollars, of all the trucks that used the lot that day instead"],
    "The term \\(20x\\) multiplies the price for one car, \\(20\\) dollars, by the number of cars, \\(x\\). A price times a count gives a total cost, so <b>it is the total cost, in dollars, of all the cars that used the parking lot that day</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It says the total amount spent on smoothies and salads together is exactly 84 dollars";
    return mcq("At a juice stand, a smoothie costs 6 dollars and a salad costs 9 dollars. Let \\(x\\) be the number of smoothies and \\(y\\) be the number of salads in one order. One equation for the order is \\(6x + 9y = 84\\). What does this equation represent?",
    key,
    ["It says the total number of smoothies and salads in the order together is 84 items",
     "It says one smoothie and one salad in the order together cost a combined 84 dollars",
     "It says the number of smoothies in the order is 84 more than the number of salads in it"],
    "Each term multiplies a price by a count: \\(6x\\) is the cost of the smoothies and \\(9y\\) is the cost of the salads. Their sum is a total cost, so <b>it says the total amount spent on smoothies and salads together is exactly 84 dollars</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The number of junior skaters at the session";
    return mcq("A skating rink records attendance at a session. Let \\(x\\) be the number of adult skaters and \\(y\\) be the number of junior skaters, with \\(x + y = 52\\) and \\(12x + 7y = 469\\). What does the variable \\(y\\) represent in this system?",
    key,
    ["The number of adult skaters at the session",
     "The total admission money collected at the session",
     "The admission price charged to one junior skater"],
    "The first equation, \\(x + y = 52\\), adds two counts of people to get the total attendance, so each variable counts one group of skaters. Since \\(x\\) counts the adult skaters, \\(y\\) is <b>the number of junior skaters at the session</b>.",
    {keyText:key});}
]));

/* ================= 3. meaning of the point of intersection (4.52, L2, var mcq) ================= */
E("u6-intersection",6,["4.52"],1,"var",varset([
  function(){var key="When 18 posters are printed, both plans charge the same total cost, which is 126 dollars";
    return mcq("Two printing plans are graphed with cost in dollars against the number of posters printed. The graphs cross at the point \\((18, 126)\\). What does this point mean for the two plans?",
    key,
    ["When 126 posters are printed, both plans charge the same total cost, which is 18 dollars",
     "After 18 posters are printed, one of the plans stops charging and the work becomes free",
     "When 18 posters are printed, the two plans together charge a combined cost of 126 dollars"],
    "On the graph, the first coordinate counts posters and the second coordinate gives cost in dollars. Where the graphs cross, both plans give the same cost for the same number of posters. So the point means: <b>when 18 posters are printed, both plans charge the same total cost, which is 126 dollars</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 3 hours of riding, both cyclists are the same distance of 24 km from the start line";
    return mcq("Two cyclists leave the same start line, and each rider has a graph of distance from the start against time. The graphs cross at the point \\((3, 24)\\). What does this point mean for the two cyclists?",
    key,
    ["After 24 hours of riding, both cyclists are the same distance of 3 km from the start line",
     "After 3 hours of riding, the two cyclists have covered 24 km when their distances are added",
     "After 3 hours of riding, one cyclist stops for a rest and the other rider carries on alone"],
    "The first coordinate is the time in hours and the second is the distance from the start in kilometres. At a crossing point, both graphs share the same time and the same distance. So the point means: <b>after 3 hours of riding, both cyclists are the same distance of 24 km from the start line</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 5 minutes of filling, both tanks hold the same amount of water, which is 40 litres";
    return mcq("Two water tanks are being filled, and each tank has a graph of the volume of water against time. The graphs cross at the point \\((5, 40)\\). What does this point mean for the two tanks?",
    key,
    ["After 40 minutes of filling, both tanks hold the same amount of water, which is 5 litres",
     "After 5 minutes of filling, the two tanks together hold a combined amount of 40 litres",
     "After 5 minutes of filling, one tank is completely full and the other tank is fully empty"],
    "The first coordinate is the time in minutes and the second is the volume in litres. Where the graphs cross, the two tanks are measured at the same time and hold the same volume. So the point means: <b>after 5 minutes of filling, both tanks hold the same amount of water, which is 40 litres</b>.",
    {stmt:true,keyText:key});},
  function(){var key="After 2 hours of hiking, both hikers stand at the same height of 150 m above the valley";
    return mcq("Two hikers climb from the same valley, and each hiker has a graph of height above the valley against time. The graphs cross at the point \\((2, 150)\\). What does this point mean for the two hikers?",
    key,
    ["After 150 hours of hiking, both hikers stand at the same height of 2 m above the valley",
     "After 2 hours of hiking, the two hikers have heights that add together to give 150 m",
     "After 2 hours of hiking, one hiker reaches the summit and the other turns back to camp"],
    "The first coordinate is the time in hours and the second is the height in metres. At a crossing point, both hikers share the same time and the same height. So the point means: <b>after 2 hours of hiking, both hikers stand at the same height of 150 m above the valley</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 4. solve graphically from line descriptions (4.53, L2, gen num, CR 3) ================= */
E("u6-solve-graph",6,["4.53"],2,"gen",function(){
  var X=ri(-4,8),Y=ri(-3,11);
  var slopes=[-3,-2,-1,1,2,3];
  var m1=pick(slopes),m2=pick(slopes),t=0;
  while(m2===m1&&t<50){m2=pick(slopes);t++;}
  var b1=Y-m1*X,b2=Y-m2*X;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y),mode=ri(1,2);
  if(mode===1){
    return numq("A graph shows two straight lines. The first line has slope \\("+m1+"\\) and \\(y\\)-intercept \\("+b1+"\\). The second line has slope \\("+m2+"\\) and \\(y\\)-intercept \\("+b2+"\\). The lines intersect at one point. By writing an equation for each line, determine the \\("+ask+"\\)-value of the point of intersection.",
      ans,0.001,
      "Write each line in slope-intercept form: "+u6meetSol(m1,b1,m2,b2,X,Y,ask),
      {mode:mode,m1:m1,b1:b1,m2:m2,b2:b2,X:X,Y:Y,ask:ask,ans:ans});
  }
  var dx1=ri(1,3),dx2=ri(1,3);
  var pts=[[X-dx1,Y-m1*dx1],[X+dx1,Y+m1*dx1],[X-dx2,Y-m2*dx2],[X+dx2,Y+m2*dx2]];
  return numq("A graph shows two straight lines. The first line passes through the points \\("+u6pair(pts[0][0],pts[0][1])+"\\) and \\("+u6pair(pts[1][0],pts[1][1])+"\\). The second line passes through the points \\("+u6pair(pts[2][0],pts[2][1])+"\\) and \\("+u6pair(pts[3][0],pts[3][1])+"\\). The lines intersect at one point. By writing an equation for each line, determine the \\("+ask+"\\)-value of the point of intersection.",
    ans,0.001,
    "Find the slope of each line from its two points, then write each equation. The first line has slope \\("+m1+"\\) and equation \\("+u6yEq(m1,b1)+"\\); the second line has slope \\("+m2+"\\) and equation \\("+u6yEq(m2,b2)+"\\). "+u6meetSol(m1,b1,m2,b2,X,Y,ask),
    {mode:mode,pts:pts,X:X,Y:Y,ask:ask,ans:ans});
});

/* ================= 5. problem solved by a system, setup not announced (4.54, L3, gen num, CR 3) ================= */
E("u6-problem",6,["4.54"],3,"gen",function(){
  var profs=[
    {intro:"A cafe sells baked goods to two customers on the same morning.",n1:"scones",n2:"muffins",buyer:"customer"},
    {intro:"A fruit stand sells bags of fruit to two shoppers on the same day.",n1:"bags of strawberries",n2:"bags of blueberries",buyer:"shopper"},
    {intro:"A craft shop sells supplies to two makers on the same afternoon.",n1:"balls of yarn",n2:"packs of buttons",buyer:"maker"},
    {intro:"A snack cart sells items to two students on the same lunch break.",n1:"granola bars",n2:"trail mix pouches",buyer:"student"},
    {intro:"A fish market sells fresh fish to two buyers on the same morning.",n1:"cod fillets",n2:"salmon portions",buyer:"buyer"},
    {intro:"A garden centre sells plants to two customers on the same afternoon.",n1:"tomato seedlings",n2:"pepper plants",buyer:"customer"}
  ];
  var pi=ri(0,profs.length-1),prof=profs[pi];
  var px=ri(2,7),py=ri(2,7),t0=0;
  while(py===px&&t0<50){py=ri(2,7);t0++;}
  var a1,b1,a2,b2,det=0,t=0;
  while(det===0&&t<200){a1=ri(1,6);b1=ri(1,6);a2=ri(1,6);b2=ri(1,6);det=a1*b2-a2*b1;t++;}
  var T1=a1*px+b1*py,T2=a2*px+b2*py;
  var askX=det>0,ask=askX?"x":"y",ans=askX?px:py,askName=askX?prof.n1:prof.n2;
  var solIntro="Let \\(x\\) be the price, in dollars, of one of the "+prof.n1+", and \\(y\\) be the price, in dollars, of one of the "+prof.n2+". The two purchases give the system \\["+
    "\\begin{aligned} "+u6lhs(a1,b1)+" &= "+T1+" \\\\ "+u6lhs(a2,b2)+" &= "+T2+" \\end{aligned} \\]";
  var sol;
  if(askX){
    sol=solIntro+" Eliminate \\(y\\): multiply the first equation by \\("+b2+"\\) and the second by \\("+b1+"\\), then subtract: \\["+
    "\\begin{aligned} "+u6lhs(a1*b2,b1*b2)+" &= "+(T1*b2)+" \\\\ "+u6lhs(a2*b1,b1*b2)+" &= "+(T2*b1)+" \\\\ "+u6coefVar(det,"x")+" &= "+(T1*b2-T2*b1)+" \\\\ x &= "+px+" \\end{aligned} \\]"+
    " The price of one of the "+prof.n1+" is <b>"+px+" dollars</b>.";
  }else{
    var detY=a2*b1-a1*b2;
    sol=solIntro+" Eliminate \\(x\\): multiply the first equation by \\("+a2+"\\) and the second by \\("+a1+"\\), then subtract the second result from the first: \\["+
    "\\begin{aligned} "+u6lhs(a1*a2,b1*a2)+" &= "+(T1*a2)+" \\\\ "+u6lhs(a2*a1,b2*a1)+" &= "+(T2*a1)+" \\\\ "+u6coefVar(detY,"y")+" &= "+(T1*a2-T2*a1)+" \\\\ y &= "+py+" \\end{aligned} \\]"+
    " The price of one of the "+prof.n2+" is <b>"+py+" dollars</b>.";
  }
  return numq(prof.intro+" The first "+prof.buyer+" buys "+a1+" of the "+prof.n1+" and "+b1+" of the "+prof.n2+", and pays "+T1+" dollars in total. The second "+prof.buyer+" buys "+a2+" of the "+prof.n1+" and "+b2+" of the "+prof.n2+", and pays "+T2+" dollars in total. Prices do not change between the two purchases. What is the price, in dollars, of one of the "+askName+"?",
    ans,0.001,sol,
    {prof:pi,a1:a1,b1:b1,a2:a2,b2:b2,T1:T1,T2:T2,px:px,py:py,ask:ask,ans:ans});
});

/* ================= 6. solve by substitution (4.55, L2, gen num, CR 3) ================= */
E("u6-solve-algebra",6,["4.55"],2,"gen",function(){
  var X=ri(-4,9),Y=ri(-3,10);
  var m=pick([-3,-2,-1,1,2,3]),mode=ri(1,2);
  var b=(mode===1)?(Y-m*X):(X-m*Y);
  var p,q,d,t=0;
  do{p=ri(-4,4);q=ri(-4,4);t++;}while(t<200&&((p===0||q===0)||(mode===1?(p+q*m===0):(q+p*m===0))));
  d=p*X+q*Y;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y);
  var givenEq,otherEq,sol;
  if(mode===1){
    givenEq=u6yEq(m,b);otherEq=u6std(p,q,d);
    var coef=p+q*m,rest=d-q*b;
    var qPart=(q>0?(" + "+(Math.abs(q)===1?"":Math.abs(q))+"("+u6yRHS(m,b)+")"):(" - "+(Math.abs(q)===1?"":Math.abs(q))+"("+u6yRHS(m,b)+")"));
    sol="The first equation is already solved for \\(y\\), so substitute its right side into the second equation: \\["+
    "\\begin{aligned} "+u6coefVar(p,"x")+qPart+" &= "+d+" \\\\ "+u6coefVar(coef,"x")+u6sgn(q*b)+" &= "+d+" \\\\ "+u6coefVar(coef,"x")+" &= "+rest+" \\\\ x &= "+X+" \\end{aligned} \\]"+
    " Substitute \\(x = "+X+"\\) back into \\("+givenEq+"\\) to get \\(y\\): \\["+
    "\\begin{aligned} y &= "+m+"("+X+")"+u6sgn(b)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
    " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+p+"("+X+")"+(q>0?(" + "+q+"("+Y+")"):(" - "+(-q)+"("+Y+")"))+" = "+d+"\\)). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  }else{
    givenEq="x = "+u6coefVar(m,"y")+u6sgn(b);otherEq=u6std(p,q,d);
    var coef2=q+p*m,rest2=d-p*b;
    var pPart=(p>0?((Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"):(" - "+(Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"));
    var lead=(p>0?pPart:(" - "+(Math.abs(p)===1?"":Math.abs(p))+"("+u6coefVar(m,"y")+u6sgn(b)+")"));
    /* build the substituted left side carefully: p*(x expression) followed by the q y term */
    var subLhs=(p>0?((p===1?"":p)+"("):("-"+(p===-1?"":(-p))+"("))+u6coefVar(m,"y")+u6sgn(b)+")"+(q>0?(" + "+u6coefVar(q,"y")):(" - "+u6coefVar(-q,"y")));
    sol="The first equation is already solved for \\(x\\), so substitute its right side into the second equation: \\["+
    "\\begin{aligned} "+subLhs+" &= "+d+" \\\\ "+u6coefVar(coef2,"y")+u6sgn(p*b)+" &= "+d+" \\\\ "+u6coefVar(coef2,"y")+" &= "+rest2+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
    " Substitute \\(y = "+Y+"\\) back into \\("+givenEq+"\\) to get \\(x\\): \\["+
    "\\begin{aligned} x &= "+m+"("+Y+")"+u6sgn(b)+" \\\\ x &= "+X+" \\end{aligned} \\]"+
    " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+p+"("+X+")"+(q>0?(" + "+q+"("+Y+")"):(" - "+(-q)+"("+Y+")"))+" = "+d+"\\)). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  }
  return numq("Solve this system of equations using substitution, and give the "+ask+"-value of the solution: \\[ \\begin{aligned} "+givenEq+" \\\\ "+otherEq+" \\end{aligned} \\]",
    ans,0.001,sol,
    {mode:mode,m:m,b:b,p:p,q:q,d:d,X:X,Y:Y,ask:ask,ans:ans});
});

/* ================= 7. choose a solving strategy (4.56, L2, var mcq) ================= */
E("u6-strategy",6,["4.56"],1,"var",varset([
  function(){var key="Use substitution, because the first equation already gives y directly in terms of x, so it drops right into the second equation";
    return mcq("A system begins with the equation \\(y = 3x - 2\\), followed by \\(2x + 5y = 31\\). Which strategy fits this system best, and why?",
    key,
    ["Use elimination, because the second equation has coefficients 2 and 5, and those numbers line up for adding right away here",
     "Use graphing, because the first equation already gives y directly in terms of x, and a picture is the only way to use that fact",
     "Use substitution, because the second equation has both variables in it, so the first equation cannot be used anywhere at all"],
    "Substitution works when one variable is already isolated. Here \\(y\\) is given directly as \\(3x - 2\\), so replacing \\(y\\) in the second equation leaves one equation in \\(x\\) alone. The best fit is <b>substitution, because the first equation already gives y directly in terms of x</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use elimination here, because the x terms are opposites, so adding the two equations removes x in a single step right away";
    return mcq("A system consists of \\(4x + 3y = 26\\) and \\(-4x + 5y = 6\\). Which strategy fits this system best, and why?",
    key,
    ["Use substitution, because the x terms are opposites, so one variable must be isolated before anything can be combined here",
     "Use elimination, because the y terms are opposites, so adding the two equations removes y in a single step right away here",
     "Use graphing, because the x terms are opposites, so only a picture can show what happens when the equations are combined"],
    "Elimination works when one pair of terms cancels on adding or subtracting. Here the \\(x\\) terms, \\(4x\\) and \\(-4x\\), are opposites, so adding the equations removes \\(x\\) at once and leaves a single equation in \\(y\\). The best fit is <b>elimination, because the x terms are opposites</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use graphing, because the question asks only for an estimate of where the lines meet, and the graph gives that estimate directly";
    return mcq("A question gives two lines drawn on a grid and asks for an estimate of the point where the two lines cross. Which strategy fits this task best, and why?",
    key,
    ["Use substitution, because the question asks only for an estimate of where the lines meet, and algebra gives exact values only",
     "Use elimination, because the question asks only for an estimate of where the lines meet, and the coefficients are already lined up",
     "Use graphing, because the question asks only for an exact algebraic answer, and a graph is the tool that produces exact values"],
    "When only an estimate is needed and the lines are already drawn, reading the crossing point off the graph is the direct route; algebra would give an exact answer the question did not ask for. The best fit is <b>graphing, because the question asks only for an estimate of where the lines meet</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use substitution, because the second equation already gives x directly in terms of y, so it drops right into the first equation";
    return mcq("A system consists of \\(3x - 2y = 12\\) and \\(x = 4y + 1\\). Which strategy fits this system best, and why?",
    key,
    ["Use elimination, because the first equation has coefficients 3 and 2, and those numbers line up for adding right away here",
     "Use graphing, because the second equation already gives x directly in terms of y, and a picture is the only way to use that fact",
     "Use substitution, because the first equation has both variables in it, so the second equation cannot be used anywhere at all"],
    "Substitution works when one variable is already isolated. Here \\(x\\) is given directly as \\(4y + 1\\), so replacing \\(x\\) in the first equation leaves one equation in \\(y\\) alone. The best fit is <b>substitution, because the second equation already gives x directly in terms of y</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Use elimination, because tripling the first equation lines the x terms up, so subtracting then removes x in one clean step";
    return mcq("A system consists of \\(2x + y = 9\\) and \\(6x - y = 7\\). Which strategy fits this system best, and why?",
    key,
    ["Use substitution, because tripling the first equation lines the x terms up, so one variable must be isolated beforehand",
     "Use elimination, because doubling the second equation lines the x terms up, so subtracting then removes x in one clean step",
     "Use graphing, because tripling the first equation lines the x terms up, so only a picture can show the two equations combined"],
    "Elimination also works after one equation is multiplied to line up a pair of terms. Tripling the first equation makes its \\(x\\) term \\(6x\\), matching the second equation, so subtracting removes \\(x\\). The best fit is <b>elimination, because tripling the first equation lines the x terms up</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 8. number of solutions (4.57, L3, gen mcq, CR 2) ================= */
E("u6-solution-count",6,["4.57"],3,"gen",function(){
  var m1=pick([-3,-2,-1,1,2,3]),b1=ri(-8,8);
  var cls=ri(1,3),m2,b2;
  if(cls===1){m2=pick([-3,-2,-1,1,2,3]);var t=0;while(m2===m1&&t<50){m2=pick([-3,-2,-1,1,2,3]);t++;}b2=ri(-8,8);}
  else if(cls===2){m2=m1;b2=ri(-8,8);var t2=0;while(b2===b1&&t2<50){b2=ri(-8,8);t2++;}}
  else{m2=m1;b2=b1;}
  var rep=ri(1,3);if(cls===3)rep=pick([2,3]);
  var eq2,q=ri(1,3);
  if(rep===1)eq2=u6yEq(m2,b2);
  else if(rep===2)eq2=u6std(-m2*q,q,q*b2);
  else eq2=(q===1?"y":q+"y")+" = "+u6coefVar(m2*q,"x")+u6sgn(q*b2);
  var ansText=(cls===1?"One solution":(cls===2?"No solution":"Infinitely many solutions"));
  var cmp=(cls===1?
    "The slopes are different (\\("+m1+"\\) and \\("+m2+"\\)) so the lines cross at exactly one point.":
    (cls===2?
    "The slopes are the same (\\("+m1+"\\)) but the \\(y\\)-intercepts are different (\\("+b1+"\\) and \\("+b2+"\\)) so the lines are parallel and never meet.":
    "The slopes are the same (\\("+m1+"\\)) and the \\(y\\)-intercepts are the same (\\("+b1+"\\)) so the two equations describe the very same line, and every point on it works."));
  return mcq("How many solutions does this system of equations have? First equation: \\("+u6yEq(m1,b1)+"\\). Second equation: \\("+eq2+"\\).",
    ansText,
    ["No solution","One solution","Infinitely many solutions","Exactly two solutions"].filter(function(s){return s!==ansText;}),
    "Rearrange the second equation into slope-intercept form: \\["+
    "\\begin{aligned} y &= "+u6yRHS(m2,b2)+" \\end{aligned} \\]"+
    " Now compare the two lines. "+cmp+" The system has <b>"+ansText.toLowerCase()+"</b>.",
    {m1:m1,b1:b1,m2:m2,b2:b2,cls:cls,rep:rep,ansText:ansText});
});

/* ================= 9. verify a proposed solution (4.53, 4.55, L1, gen mcq) ================= */
E("u6-verify",6,["4.53","4.55"],1,"gen",function(){
  var m1=pick([-3,-2,-1,1,2,3]),m2=pick([-3,-2,-1,1,2,3]),t=0;
  while(m2===m1&&t<50){m2=pick([-3,-2,-1,1,2,3]);t++;}
  var b1=ri(-8,8),b2=ri(-8,8),cat=ri(1,4),px,py;
  if(cat===1){px=ri(-5,8);py=m1*px+b1;b2=py-m2*px;}
  else if(cat===2){px=ri(-5,8);py=m1*px+b1;var g=0;while(py===m2*px+b2&&g<50){px++;py=m1*px+b1;g++;}}
  else if(cat===3){px=ri(-5,8);py=m2*px+b2;var g2=0;while(py===m1*px+b1&&g2<50){px++;py=m2*px+b2;g2++;}}
  else{px=ri(-5,8);py=m1*px+b1+pick([2,3,4]);var g3=0;while(py===m2*px+b2&&g3<50){py++;g3++;}}
  var key=(cat===1?"Yes, it is a solution because it satisfies both equations in the system":
    cat===2?"No, it is not a solution, because it satisfies the first equation alone":
    cat===3?"No, it is not a solution, because it satisfies the second equation only":
    "No, it is not a solution, because it satisfies neither of the equations");
  var all=["Yes, it is a solution because it satisfies both equations in the system",
    "No, it is not a solution, because it satisfies the first equation alone",
    "No, it is not a solution, because it satisfies the second equation only",
    "No, it is not a solution, because it satisfies neither of the equations"];
  var ds=all.filter(function(s){return s!==key;});
  var v1=m1*px+b1,v2=m2*px+b2;
  return mcq("Consider the system \\("+u6yEq(m1,b1)+"\\) and \\("+u6yEq(m2,b2)+"\\) (first equation listed first). Is the ordered pair \\("+u6pair(px,py)+"\\) a solution of the system?",
    key,ds,
    "A solution must satisfy both equations. Substitute \\(x = "+px+"\\) and \\(y = "+py+"\\) into each one: \\["+
    "\\begin{aligned} "+m1+"("+px+")"+u6sgn(b1)+" &= "+v1+" \\\\ "+m2+"("+px+")"+u6sgn(b2)+" &= "+v2+" \\end{aligned} \\]"+
    " The pair gives \\(y = "+v1+"\\) in the first equation and \\(y = "+v2+"\\) in the second, while the pair itself has \\(y = "+py+"\\). So the pair <b>"+(cat===1?"satisfies both equations and is a solution":(cat===2?"satisfies the first equation only, so it is not a solution":(cat===3?"satisfies the second equation only, so it is not a solution":"satisfies neither equation, so it is not a solution")))+"</b>.",
    {m1:m1,b1:b1,m2:m2,b2:b2,px:px,py:py,cat:cat,stmt:true,keyText:key});
});

/* ================= 10. break-even and cheaper plan (4.54, L3, gen num, CR 2) ================= */
E("u6-break-even",6,["4.54"],3,"gen",function(){
  var profs=[
    {intro:"A community gym offers two class passes.",unit:"classes attended",per:"class attended"},
    {intro:"A print studio offers two pricing plans for posters.",unit:"posters printed",per:"poster printed"},
    {intro:"A boat rental shop offers two pricing plans.",unit:"hours rented",per:"hour rented"},
    {intro:"A mobile provider offers two monthly data plans.",unit:"extra gigabytes used",per:"extra gigabyte used"},
    {intro:"A community hall offers two rental plans for events.",unit:"hours rented",per:"hour rented"},
    {intro:"A snow-clearing service offers two contracts for the winter season.",unit:"snowfalls cleared",per:"snowfall cleared"}
  ];
  var pi=ri(0,profs.length-1),prof=profs[pi];
  var U=ri(4,28),fA=ri(5,60),rB=ri(1,12),dd=ri(1,6);
  var rA=rB+dd,fB=fA+dd*U,mode=ri(1,2);
  var planText="Plan A charges a fee of "+fA+" dollars plus "+rA+" dollars for each "+prof.per+". Plan B charges a fee of "+fB+" dollars plus "+rB+" dollars for each "+prof.per+". Let \\(x\\) be the number of "+prof.unit+" and \\(y\\) be the total cost in dollars.";
  if(mode===1){
    var C=fA+rA*U;
    return numq(prof.intro+" "+planText+" At what number of "+prof.unit+" do the two plans cost exactly the same?",
      U,0.001,
      "The cost equations are \\(y = "+rA+"x"+u6sgn(fA)+"\\) for Plan A and \\(y = "+rB+"x"+u6sgn(fB)+"\\) for Plan B. Set the costs equal and solve: \\["+
      "\\begin{aligned} "+rA+"x"+u6sgn(fA)+" &= "+rB+"x"+u6sgn(fB)+" \\\\ "+u6coefVar(dd,"x")+" &= "+(fB-fA)+" \\\\ x &= "+U+" \\end{aligned} \\]"+
      " At that usage both plans cost \\("+C+"\\) dollars. The plans cost the same at <b>\\("+U+"\\)</b> "+prof.unit+".",
      {prof:pi,mode:mode,fA:fA,rA:rA,fB:fB,rB:rB,U:U,ans:U});
  }
  var U0=ri(3,32),g=0;
  while(U0===U&&g<50){U0=ri(3,32);g++;}
  var CA=fA+rA*U0,CB=fB+rB*U0,ans=Math.min(CA,CB),cheaper=(CA<CB?"Plan A":"Plan B");
  return numq(prof.intro+" "+planText+" When the usage is "+U0+" "+prof.unit+", what is the cost, in dollars, of the cheaper plan?",
    ans,0.001,
    "Use the cost equations \\(y = "+rA+"x"+u6sgn(fA)+"\\) for Plan A and \\(y = "+rB+"x"+u6sgn(fB)+"\\) for Plan B, and evaluate both at \\(x = "+U0+"\\): \\["+
    "\\begin{aligned} \\text{Plan A} &= "+fA+" + "+rA+"("+U0+") = "+CA+" \\\\ \\text{Plan B} &= "+fB+" + "+rB+"("+U0+") = "+CB+" \\end{aligned} \\]"+
    " The lower value is "+cheaper+" at \\("+ans+"\\) dollars (the plans would only tie at \\("+U+"\\) "+prof.unit+"). The cheaper plan costs <b>\\("+ans+"\\) dollars</b>.",
    {prof:pi,mode:mode,fA:fA,rA:rA,fB:fB,rB:rB,U:U,U0:U0,ans:ans});
});

/* ================= 11. solve by elimination (4.55, L2, gen num, CR 2) ================= */
E("u6-solve-elimination",6,["4.55"],2,"gen",function(){
  var X=ri(-5,9),Y=ri(-4,10);
  var a1=ri(-4,4),b1=ri(-3,3),t=0;
  while((a1===0||b1===0)&&t<100){a1=ri(-4,4);b1=ri(-3,3);t++;}
  var mode=ri(1,3),a2,b2,k=1;
  if(mode===1){b2=-b1;a2=ri(-4,4);var t1=0;while((a2===0||a2===-a1)&&t1<100){a2=ri(-4,4);t1++;}}
  else if(mode===2){b2=b1;a2=ri(-4,4);var t2=0;while((a2===0||a2===a1)&&t2<100){a2=ri(-4,4);t2++;}}
  else{k=pick([2,3]);b2=-k*b1;a2=ri(-4,4);var t3=0;while((a2===0||k*a1+a2===0)&&t3<100){a2=ri(-4,4);t3++;}}
  var c1=a1*X+b1*Y,c2=a2*X+b2*Y;
  var ask=pick(["x","y"]),ans=(ask==="x"?X:Y);
  var elimLine,firstLines;
  if(mode===1){
    firstLines=u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Add the two equations so the \\(y\\) terms cancel: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(a1+a2,"x")+" &= "+(c1+c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }else if(mode===2){
    firstLines=u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Subtract the second equation from the first so the \\(y\\) terms cancel: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(a1-a2,"x")+" &= "+(c1-c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }else{
    firstLines=u6std(k*a1,k*b1,k*c1)+" \\\\ "+u6std(a2,b2,c2);
    elimLine="Multiply the first equation by \\("+k+"\\) so the \\(y\\) terms become opposites, then add: \\["+
    "\\begin{aligned} "+firstLines+" \\\\ "+u6coefVar(k*a1+a2,"x")+" &= "+(k*c1+c2)+" \\\\ x &= "+X+" \\end{aligned} \\]";
  }
  var subTerm=(b1>0?(" + "+u6coefVar(b1,"y")):(" - "+u6coefVar(-b1,"y")));
  var sol=elimLine+" Substitute \\(x = "+X+"\\) into the first equation to get \\(y\\): \\["+
  "\\begin{aligned} "+(a1*X)+subTerm+" &= "+c1+" \\\\ "+u6coefVar(b1,"y")+" &= "+(c1-a1*X)+" \\\\ y &= "+Y+" \\end{aligned} \\]"+
  " The solution is \\("+u6pair(X,Y)+"\\) (check in the second equation: \\("+a2+"("+X+")"+(b2>0?(" + "+b2+"("+Y+")"):(" - "+(-b2)+"("+Y+")"))+" = "+c2+"\\), confirming the solution in both equations). The "+ask+"-value is <b>\\("+ans+"\\)</b>.";
  return numq("Solve this system of equations using elimination, and give the "+ask+"-value of the solution: \\[ \\begin{aligned} "+u6std(a1,b1,c1)+" \\\\ "+u6std(a2,b2,c2)+" \\end{aligned} \\]",
    ans,0.001,sol,
    {mode:mode,k:k,a1:a1,b1:b1,a2:a2,b2:b2,c1:c1,c2:c2,X:X,Y:Y,ask:ask,ans:ans});
});

/* ================= 12. direct word problems (4.54, L2, gen mcq, CR 2) ================= */
E("u6-word-problem",6,["4.54"],2,"gen",function(){
  var mode=ri(1,4);
  if(mode===1){
    var nL=ri(4,18),nT=ri(3,15),N=nL+nT,V=nL+2*nT;
    var askL=Math.random()<0.5,ans=askL?nL:nT,other=askL?nT:nL;
    var ds=u6pickD3(ans,[other,ans+1,ans-1,ans+2,N]).map(function(v){return ""+v;});
    return mcq("A jar holds only loonies and toonies. There are "+N+" coins in the jar, and their total value is "+V+" dollars. How many "+(askL?"loonies":"toonies")+" are in the jar?",
      ""+ans,ds,
      "Let \\(x\\) be the number of loonies and \\(y\\) be the number of toonies. The coin count and the value give the system \\["+
      "\\begin{aligned} x + y &= "+N+" \\\\ x + 2y &= "+V+" \\end{aligned} \\]"+
      " Subtract the first equation from the second to get \\(y = "+(V-N)+"\\), the number of toonies, and then \\(x = "+N+" - "+(V-N)+" = "+nL+"\\), the number of loonies. The number of "+(askL?"loonies":"toonies")+" is <b>"+ans+"</b>.",
      {mode:mode,N:N,V:V,ans:ans,askL:askL});
  }
  if(mode===2){
    var rtype=ri(1,2),W=ri(4,20),L,relText;
    if(rtype===1){var dd=ri(1,12);L=W+dd;relText="The length is "+dd+" cm more than the width.";}
    else{var kk=pick([2,3]);L=kk*W;relText="The length is "+kk+" times the width.";}
    var P=2*(L+W),askL2=Math.random()<0.5,ans2=askL2?L:W,other2=askL2?W:L;
    var ds2=u6pickD3(ans2,[other2,ans2+1,ans2-1,ans2+2,P/2]).map(function(v){return ""+v;});
    return mcq("The perimeter of a rectangle is "+P+" cm. "+relText+" What is the "+(askL2?"length":"width")+" of the rectangle, in centimetres?",
      ""+ans2,ds2,
      "Let \\(l\\) be the length and \\(w\\) be the width, in centimetres. The perimeter and the stated relation give the system \\["+
      "\\begin{aligned} 2l + 2w &= "+P+" \\\\ l &= "+(rtype===1?("w + "+dd):(kk+"w"))+" \\end{aligned} \\]"+
      " Halving the perimeter equation gives \\(l + w = "+(P/2)+"\\). Substituting the relation and solving gives \\(w = "+W+"\\) and \\(l = "+L+"\\). The "+(askL2?"length":"width")+" is <b>"+ans2+" cm</b>.",
      {mode:mode,rtype:rtype,P:P,dd:(rtype===1?dd:0),kk:(rtype===2?kk:0),ans:ans2,askL:askL2});
  }
  if(mode===3){
    var pa=pick([8,10,12,15]),pc=pick([4,5,6,7]),A=ri(5,25),C=ri(4,20);
    var N3=A+C,T3=pa*A+pc*C,askA=Math.random()<0.5,ans3=askA?A:C,other3=askA?C:A;
    var ds3=u6pickD3(ans3,[other3,ans3+1,ans3-1,ans3+2,N3]).map(function(v){return ""+v;});
    return mcq("A school sells tickets for a play. An adult ticket costs "+pa+" dollars and a child ticket costs "+pc+" dollars. In total, "+N3+" tickets are sold for "+T3+" dollars. How many "+(askA?"adult":"child")+" tickets are sold?",
      ""+ans3,ds3,
      "Let \\(x\\) be the number of adult tickets and \\(y\\) be the number of child tickets. The ticket count and the money collected give the system \\["+
      "\\begin{aligned} x + y &= "+N3+" \\\\ "+pa+"x + "+pc+"y &= "+T3+" \\end{aligned} \\]"+
      " Multiply the first equation by \\("+pc+"\\) and subtract it from the second: \\("+(pa-pc)+"x = "+(T3-pc*N3)+"\\), so \\(x = "+A+"\\) adult tickets, and then \\(y = "+N3+" - "+A+" = "+C+"\\) child tickets. The number of "+(askA?"adult":"child")+" tickets is <b>"+ans3+"</b>.",
      {mode:mode,N:N3,T:T3,pa:pa,pc:pc,ans:ans3,askA:askA});
  }
  var nD=ri(5,20),nQ=ri(4,16),N4=nD+nQ,V4=10*nD+25*nQ;
  var askD=Math.random()<0.5,ans4=askD?nD:nQ,other4=askD?nQ:nD;
  var ds4=u6pickD3(ans4,[other4,ans4+1,ans4-1,ans4+2,N4]).map(function(v){return ""+v;});
  return mcq("A piggy bank holds only dimes and quarters. There are "+N4+" coins in the bank, and their total value is "+V4+" cents. How many "+(askD?"dimes":"quarters")+" are in the bank?",
    ""+ans4,ds4,
    "Let \\(x\\) be the number of dimes and \\(y\\) be the number of quarters. The coin count and the value, in cents, give the system \\["+
    "\\begin{aligned} x + y &= "+N4+" \\\\ 10x + 25y &= "+V4+" \\end{aligned} \\]"+
    " Multiply the first equation by \\(10\\) and subtract it from the second: \\(15y = "+(V4-10*N4)+"\\), so \\(y = "+nQ+"\\) quarters, and then \\(x = "+N4+" - "+nQ+" = "+nD+"\\) dimes. The number of "+(askD?"dimes":"quarters")+" is <b>"+ans4+"</b>.",
    {mode:mode,N:N4,V:V4,ans:ans4,askD:askD});
});

/* ================= 13. mixture problems (4.54, L2, gen num, CR 2) =================
   Scenario arms harvested Nov 13, 2026 (build order step 9): the mixture
   class from the Pure Math 20 systems files, rewritten. Amounts are
   chosen first and the target concentration or price is read off them,
   so every key is an exact integer. */
E("u6-mixture",6,["4.54"],2,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var profs=[
      {who:"A lab technician",sub:"salt solution",verb:"mixes"},
      {who:"A pharmacist",sub:"antiseptic solution",verb:"mixes"},
      {who:"A groundskeeper",sub:"fertilizer solution",verb:"mixes"},
      {who:"A caterer",sub:"juice concentrate",verb:"mixes"}
    ];
    var prof=pick(profs);
    var a,b,x,y,V,c,t=0;
    do{
      a=pick([10,15,20,25]);b=pick([40,50,60,70,80]);x=ri(2,15);y=ri(2,15);V=x+y;t++;
    }while(t<300&&((a*x+b*y)%V!==0||(a*x+b*y)/V<=a||(a*x+b*y)/V>=b));
    c=(a*x+b*y)/V;
    var askA=Math.random()<0.5,ans=askA?x:y;
    var sol="Let \\(x\\) be the number of litres of the \\("+a+"\\)% solution and \\(y\\) be the number of litres of the \\("+b+"\\)% solution. The total volume and the total amount of dissolved substance give the system \\["+
    "\\begin{aligned} x + y &= "+V+" \\\\ "+a+"x + "+b+"y &= "+(c*V)+" \\end{aligned} \\]"+
    " (the second equation is the percent equation multiplied by \\(100\\): the mixture must contain \\("+c+"\\)% of \\("+V+"\\) litres of dissolved substance). Multiply the first equation by \\("+a+"\\) and subtract: \\("+(b-a)+"y = "+(c*V-a*V)+"\\), so \\(y = "+y+"\\), and then \\(x = "+V+" - "+y+" = "+x+"\\). The amount of the \\("+(askA?a:b)+"\\)% solution needed is <b>"+ans+" litres</b>.";
    return numq(prof.who+" "+prof.verb+" a \\("+a+"\\)% "+prof.sub+" with a \\("+b+"\\)% "+prof.sub+" to prepare \\("+V+"\\) litres of a \\("+c+"\\)% "+prof.sub+". How many litres of the \\("+(askA?a:b)+"\\)% solution are needed?",
      ans,0.001,sol,
      {mode:mode,a:a,b:b,x:x,y:y,V:V,c:c,askA:askA,ans:ans});
  }
  if(mode===2){
    var profs2=[
      {who:"A pool operator",sub:"chlorine solution",unit:"litres"},
      {who:"A lab technician",sub:"salt solution",unit:"litres"}
    ];
    var prof2=pick(profs2);
    var V0,a2,w,c2,t2=0;
    do{
      V0=ri(4,20);a2=pick([20,25,30,40,50,60]);w=ri(2,16);t2++;
    }while(t2<300&&((a2*V0)%(V0+w)!==0||(a2*V0)/(V0+w)<5||(a2*V0)/(V0+w)>=a2));
    c2=(a2*V0)/(V0+w);
    var sol2="Let \\(w\\) be the number of litres of water added. Adding water does not change the amount of dissolved substance, so the substance in the original \\("+V0+"\\) litres must equal the substance in the final \\("+V0+" + w\\) litres: \\["+
    "\\begin{aligned} "+a2+"("+V0+") &= "+c2+"("+V0+" + w) \\\\ "+(a2*V0)+" &= "+(c2*V0)+" + "+c2+"w \\\\ "+c2+"w &= "+(a2*V0-c2*V0)+" \\\\ w &= "+w+" \\end{aligned} \\]"+
    " The amount of water to add is <b>"+w+" litres</b>.";
    return numq(prof2.who+" has \\("+V0+"\\) litres of a \\("+a2+"\\)% "+prof2.sub+". Water is added to dilute it to a \\("+c2+"\\)% "+prof2.sub+". How many litres of water must be added?",
      w,0.001,sol2,
      {mode:mode,V0:V0,a:a2,w:w,c:c2,ans:w});
  }
  var profs3=[
    {who:"A bulk food shop",i1:"cashews",i2:"dried cranberries",blend:"trail mix"},
    {who:"A coffee roaster",i1:"dark roast beans",i2:"light roast beans",blend:"house blend"},
    {who:"A feed store",i1:"oats",i2:"barley",blend:"feed mix"}
  ];
  var prof3=pick(profs3);
  var p1,p2,x3,y3,W,m,t3=0;
  do{
    p1=pick([4,5,6,8]);p2=pick([12,14,16,18,20]);x3=ri(2,18);y3=ri(2,18);W=x3+y3;t3++;
  }while(t3<300&&((p1*x3+p2*y3)%W!==0||(p1*x3+p2*y3)/W<=p1||(p1*x3+p2*y3)/W>=p2));
  m=(p1*x3+p2*y3)/W;
  var ask1=Math.random()<0.5,ans3=ask1?x3:y3;
  var sol3="Let \\(x\\) be the number of kilograms of "+prof3.i1+" and \\(y\\) be the number of kilograms of "+prof3.i2+". The total mass and the total value give the system \\["+
  "\\begin{aligned} x + y &= "+W+" \\\\ "+p1+"x + "+p2+"y &= "+(m*W)+" \\end{aligned} \\]"+
  " Multiply the first equation by \\("+p1+"\\) and subtract it from the second: \\("+(p2-p1)+"y = "+(m*W-p1*W)+"\\), so \\(y = "+y3+"\\), and then \\(x = "+W+" - "+y3+" = "+x3+"\\). The amount of "+(ask1?prof3.i1:prof3.i2)+" needed is <b>"+ans3+" kilograms</b>.";
  return numq(prof3.who+" blends "+prof3.i1+" costing "+p1+" dollars per kilogram with "+prof3.i2+" costing "+p2+" dollars per kilogram to make "+W+" kilograms of "+prof3.blend+" worth "+m+" dollars per kilogram. How many kilograms of "+(ask1?prof3.i1:prof3.i2)+" are needed?",
    ans3,0.001,sol3,
    {mode:mode,p1:p1,p2:p2,x:x3,y:y3,W:W,m:m,ask1:ask1,ans:ans3});
});

/* ================= 14. rate and distance problems (4.54, L2, gen num, CR 2) =================
   Scenario arms harvested Nov 13, 2026 (build order step 9): the rate
   and distance class from the Pure Math 20 systems files, rewritten.
   Speeds and times are chosen first, so every key is an exact integer. */
E("u6-travel",6,["4.54"],2,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var skins=[
      {veh:"boat",med:"river",moving:"travels",still:"still water",flow:"current",down:"downstream",up:"upstream",unit:"km"},
      {veh:"plane",med:"air",moving:"flies",still:"still air",flow:"wind",down:"with the wind",up:"against the wind",unit:"km"}
    ];
    var sk=pick(skins);
    var u,v,D,t1,t2,t=0;
    do{
      if(sk.veh==="boat"){u=ri(12,40);t1=ri(1,6);t2=t1+ri(1,4);}
      else{u=pick([240,280,300,320,360,400,420,480]);t1=ri(1,3);t2=t1+ri(1,2);}
      D=u*t1;t++;
    }while(t<300&&(D%t2!==0||(v=D/t2)>=u||v<4||((u-v)%2)!==0));
    if(t>=300){u=30;t1=4;t2=6;D=120;v=20;}
    var s=(u+v)/2,cur=(u-v)/2;
    var askS=Math.random()<0.5,ans=askS?s:cur;
    var sol="Let \\(s\\) be the speed of the "+sk.veh+" in "+sk.still+" and \\(c\\) be the speed of the "+sk.flow+", in kilometres per hour. Travelling "+sk.down+", the speeds add; travelling "+sk.up+", they subtract: \\["+
    "\\begin{aligned} s + c &= "+u+" \\\\ s - c &= "+v+" \\end{aligned} \\]"+
    " (each right side is the distance \\("+D+"\\) km divided by its travel time). Adding the equations gives \\(2s = "+(u+v)+"\\), so \\(s = "+s+"\\); subtracting gives \\(2c = "+(u-v)+"\\), so \\(c = "+cur+"\\). The "+(askS?("speed of the "+sk.veh+" in "+sk.still):("speed of the "+sk.flow))+" is <b>"+ans+" km/h</b>.";
    return numq("A "+sk.veh+" "+sk.moving+" "+D+" "+sk.unit+" "+sk.down+" and then returns over the same route. The trip "+sk.down+" takes "+t1+" hour"+(t1===1?"":"s")+" and the return trip takes "+t2+" hours. The speed of the "+sk.veh+" in "+sk.still+" and the speed of the "+sk.flow+" stay constant. What is the "+(askS?("speed of the "+sk.veh+" in "+sk.still):("speed of the "+sk.flow))+", in kilometres per hour?",
      ans,0.001,sol,
      {mode:mode,skin:(sk.veh==="boat"?0:1),u:u,v:v,D:D,t1:t1,t2:t2,s:s,cur:cur,askS:askS,ans:ans});
  }
  if(mode===2){
    var skins2=[
      {who1:"cyclist",whoP:"cyclists",from1:"one town",from2:"a neighbouring town",verb:"ride towards each other",speeds:[12,15,18,20,24]},
      {who1:"snowmobiler",whoP:"snowmobilers",from1:"one cabin",from2:"another cabin",verb:"ride towards each other",speeds:[30,36,40,45,50,60]},
      {who1:"ferry",whoP:"ferries",from1:"one terminal",from2:"the other terminal",verb:"sail towards each other",speeds:[12,15,18,20,24,25,30]}
    ];
    var sk2=pick(skins2);
    var v1=pick(sk2.speeds),v2=pick(sk2.speeds);
    var tm=ri(1,5),D2=(v1+v2)*tm;
    var askT=Math.random()<0.5,ans2=askT?tm:(v1*tm);
    var sol2="Let \\(t\\) be the number of hours until the two "+sk2.whoP+" meet. Together they close the whole \\("+D2+"\\) km gap, at a combined rate of \\("+v1+" + "+v2+" = "+(v1+v2)+"\\) km/h: \\["+
    "\\begin{aligned} "+(v1+v2)+"t &= "+D2+" \\\\ t &= "+tm+" \\end{aligned} \\]"+
    " In that time the first "+sk2.who1+" covers \\("+v1+" \\times "+tm+" = "+(v1*tm)+"\\) km. The "+(askT?"time until they meet":"distance covered by the first "+sk2.who1)+" is <b>"+ans2+(askT?" hours":" km")+"</b>.";
    return numq("Two "+sk2.whoP+" leave "+sk2.from1+" and "+sk2.from2+" at the same time and "+sk2.verb+" along the same route, which is "+D2+" km long. The first travels at "+v1+" km/h and the second at "+v2+" km/h. "+(askT?"How many hours pass until they meet?":"How many kilometres does the first "+sk2.who1+" cover before they meet?"),
      ans2,0.001,sol2,
      {mode:mode,v1:v1,v2:v2,t:tm,D:D2,askT:askT,ans:ans2});
  }
  var skins3=[
    {veh:"delivery truck",cargo:"highway",speeds:[40,50,60,70,80,90],diffs:[5,10,15,20,25,30]},
    {veh:"ferry",cargo:"channel",speeds:[15,18,20,24,25,30],diffs:[2,3,4,5,6,10]},
    {veh:"bus",cargo:"highway",speeds:[40,50,60,70,80,90],diffs:[5,10,15,20,25,30]}
  ];
  var sk3=pick(skins3);
  var vA,diff,h,t3=0,tc;
  do{
    vA=pick(sk3.speeds);h=pick([1,2,3]);diff=pick(sk3.diffs);t3++;
  }while(t3<300&&((vA*h)%diff!==0||(vA*h)/diff>12));
  if(t3>=300){vA=60;h=1;diff=20;}
  tc=(vA*h)/diff;
  var vB=vA+diff,dist=vB*tc;
  var askT3=Math.random()<0.5,ans3b=askT3?tc:dist;
  var sol3="Let \\(t\\) be the number of hours the second "+sk3.veh+" travels before catching up. By then the first "+sk3.veh+" has travelled for \\(t + "+h+"\\) hours, and the two have covered the same distance: \\["+
  "\\begin{aligned} "+vB+"t &= "+vA+"(t + "+h+") \\\\ "+vB+"t &= "+vA+"t + "+(vA*h)+" \\\\ "+diff+"t &= "+(vA*h)+" \\\\ t &= "+tc+" \\end{aligned} \\]"+
  " The meeting point is \\("+vB+" \\times "+tc+" = "+dist+"\\) km from the start. The "+(askT3?"time for the second "+sk3.veh+" to catch up":"distance from the start where it catches up")+" is <b>"+ans3b+(askT3?" hours":" km")+"</b>.";
  return numq("A "+sk3.veh+" leaves a depot and travels along a "+sk3.cargo+" at "+vA+" km/h. "+h+" hour"+(h===1?"":"s")+" later, a second "+sk3.veh+" leaves the same depot and follows at "+vB+" km/h. "+(askT3?"How many hours after it leaves does the second "+sk3.veh+" catch up to the first?":"How far from the depot, in kilometres, does the second "+sk3.veh+" catch up to the first?"),
    ans3b,0.001,sol3,
    {mode:mode,vA:vA,vB:vB,h:h,t:tc,dist:dist,askT:askT3,ans:ans3b});
});

/* ---- Prior knowledge tranche entries (Nov 15, 2026) ----
   Borrowed verbatim from the feeder banks named in each entry's
   pkSrc (see the metadata pass at the end of this file), under the
   Math 1201 PK tranche spec. */
E("u6-pk-context-equation", 6, ["4.50"], 1, "gen", function () {
  var B = ri(3, 40), R = ri(2, 15), att = 0;
  while (B === R && att < 40) { B = ri(3, 40); R = ri(2, 15); att++; }
  if (B === R) { B = 12; R = 3; }
  var ctx = pick([
    "A taxi ride costs a base fee of $" + B + " plus $" + R + " for each kilometre driven. Let \\(x\\) be the number of kilometres and \\(y\\) be the total cost in dollars.",
    "A gym charges a sign-up fee of $" + B + " plus $" + R + " for each class attended. Let \\(x\\) be the number of classes and \\(y\\) be the total cost in dollars.",
    "A plumber charges a call-out fee of $" + B + " plus $" + R + " for each hour of work. Let \\(x\\) be the number of hours and \\(y\\) be the total cost in dollars.",
    "A snack cart charges $" + B + " for a tray plus $" + R + " for each drink on it. Let \\(x\\) be the number of drinks and \\(y\\) be the total cost in dollars."
  ]);
  var corr = "\\(y = " + u6lin(R, B, "x") + "\\)";
  var sol = "The fee of $" + B + " is paid once, and the $" + R + " charge is paid \\(x\\) times: \\[ \\begin{aligned} y &= " + B + " + " + fmt(R) + "x \\end{aligned} \\] So the equation is <b>" + corr + "</b>.";
  return mcq(ctx + " Which equation gives \\(y\\)?",
    { t: corr, fb: "Correct. The one-time fee is the start value and the per-unit charge is the step." },
    [
      { t: "\\(y = " + u6lin(B, R, "x") + "\\)", fb: "That swaps the two amounts. The fee is paid once, so it is not multiplied by x." },
      { t: "\\(y = " + B + " + " + R + " + x\\)", fb: "That adds the rate instead of multiplying it by the number of units." },
      { t: "\\(y = " + fmt(B + R) + "x\\)", fb: "That adds the fee and the rate together and multiplies the sum by x, so the fee gets charged every unit." }
    ], sol, { mode: "context-equation", B: B, R: R });
}, ["Decide which amount is paid once and which amount is paid for each unit.", "The amount paid for each unit multiplies x; the one-time amount stands alone."]);
E("u6-pk-break-even", 6, ["4.52"], 2, "gen", function () {
  var m1 = ri(2, 6), d = ri(2, 6), t = ri(3, 9);
  var m2 = m1 + d;
  var a2 = ri(5, 30), a1 = a2 + d * t;
  var prompt = "Plan A charges a fee of $" + a1 + " plus $" + m1 + " per hour. Plan B charges a fee of $" + a2 + " plus $" + m2 + " per hour. After how many hours do the two plans cost exactly the same?";
  var sol = "Set the two costs equal and solve: \\[ \\begin{aligned} " + a1 + " + " + m1 + "h &= " + a2 + " + " + m2 + "h \\\\ " + (a1 - a2) + " &= " + d + "h \\\\ h &= " + t + " \\end{aligned} \\] The answer is <b>" + t + "</b>.";
  return numq(prompt, t, 0.01, sol, { mode: "gap-break-even", t: t });
}, ["Break-even means the two total costs are equal, which gives an equation to solve.", "Write both plan costs with h hours and set them equal as the first step."]);
E("u6-pk-balance-model", 6, ["4.55"], 1, "gen", function () {
  var a = ri(1, 3), b = ri(1, 4), c = ri(b + 2, 10);
  function eq(x, y, z) { return "\\(" + u5lin(x, y) + "=" + fmt(z) + "\\)"; }
  var corr = eq(a, b, c);
  var cands = [
    { t: eq(a, c, b), fb: "That swaps the unit blocks: the left pan has " + fmt(b) + " unit blocks and the right pan has " + fmt(c) + "." },
    { t: eq(b, a, c), fb: "That swaps the counts: there are " + fmt(a) + " x blocks and " + fmt(b) + " unit blocks on the left pan." },
    { t: eq(a + 1, b, c), fb: "That counts one x block too many; the left pan shows " + fmt(a) + " x blocks." },
    { t: eq(a, b, c + 1), fb: "That counts one unit block too many on the right pan; it shows " + fmt(c) + "." },
    { t: eq(a, b + 1, c), fb: "That counts one unit block too many on the left pan; it shows " + fmt(b) + "." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "Count the blocks on each pan: \\[ \\begin{aligned} \\text{left pan} &= " + fmt(a) + " \\text{ x blocks} + " + fmt(b) + " \\text{ unit blocks} \\\\ \\text{right pan} &= " + fmt(c) + " \\text{ unit blocks} \\end{aligned} \\] The pans balance, so the model shows <b>" + corr + "</b>.";
  var q = mcq("The diagram shows a balance model. Each large block is labelled x and each small block is labelled 1. The pans balance. Which equation does the model show?", { t: corr, fb: "Correct: the left pan gives the x terms and units, and the right pan gives the total." }, ds, sol, { mode: "balance", a: a, b: b, c: c });
  q.figure = u5balance(a, b, c);
  return q;
}, ["Count the blocks on the left pan first: x blocks give the x term, small blocks give the constant.", "The left pan is one side of the equation and the right pan is the other side."]);
E("u6-pk-solve-two-step", 6, ["4.55"], 2, "gen", function () {
  var form = ri(0, 2);
  if (form === 0) {
    var a = ri(2, 9), x0 = ri(-9, 9); if (x0 === 0) x0 = 4;
    var b = ri(-12, 12); if (b === 0) b = 5;
    var c = a * x0 + b;
    var sol = "Undo the constant first, then undo the multiplication: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(c) + " \\\\ " + fmt(a) + "x &= " + fmt(c - b) + " \\\\ x &= " + fmt(x0) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
    return numq("Solve the equation \\(" + u5lin(a, b) + " = " + fmt(c) + "\\). What is the value of \\(x\\)?", x0, 0.01, sol, { mode: "ax+b", a: a, b: b, c: c });
  }
  if (form === 1) {
    var a2 = ri(2, 6), k = ri(-6, 6); if (k === 0) k = 3;
    var x1 = a2 * k, b2 = ri(-9, 9); if (b2 === 0) b2 = -4;
    var c2 = k + b2;
    var sol2 = "Undo the constant first, then undo the division: \\[ \\begin{aligned} " + FR("x", a2) + (b2 >= 0 ? "+" + fmt(b2) : "-" + fmt(-b2)) + " &= " + fmt(c2) + " \\\\ " + FR("x", a2) + " &= " + fmt(k) + " \\\\ x &= " + fmt(x1) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x1) + "\\)</b>.";
    return numq("Solve the equation \\(" + FR("x", a2) + (b2 >= 0 ? " + " + fmt(b2) : " - " + fmt(-b2)) + " = " + fmt(c2) + "\\). What is the value of \\(x\\)?", x1, 0.01, sol2, { mode: "x/a+b", a: a2, b: b2, c: c2 });
  }
  var x2 = ri(-8, 8); if (x2 === 0) x2 = 5;
  var a3 = ri(3, 9), c3 = ri(2, a3 - 1), b3 = (a3 - c3) * x2;
  var sol3 = "Collect the x terms on one side first: \\[ \\begin{aligned} " + fmt(a3) + "x &= " + u5lin(c3, b3) + " \\\\ " + fmt(a3 - c3) + "x &= " + fmt(b3) + " \\\\ x &= " + fmt(x2) + " \\end{aligned} \\] So the solution is <b>\\(x = " + fmt(x2) + "\\)</b>.";
  return numq("Solve the equation \\(" + fmt(a3) + "x = " + u5lin(c3, b3) + "\\). What is the value of \\(x\\)?", x2, 0.01, sol3, { mode: "ax=cx+b", a: a3, b: b3, c: c3 });
}, ["Undo the operations in reverse order: deal with the constant term before the term attached to x.", "First isolate the x term on one side, using the same operation on both sides."]);
E("u6-pk-which-is-solution", 6, ["4.53"], 1, "gen", function () {
  var a = ri(2, 7), x0 = ri(-6, 9), b = ri(-9, 9);
  var c = a * x0 + b;
  function fbFor(v) { return "Substituting \\(x = " + fmt(v) + "\\) gives a left side of " + fmt(a * v + b) + ", which is not " + fmt(c) + "."; }
  var cands = [
    { t: fmt(x0 + 1), fb: fbFor(x0 + 1) },
    { t: fmt(x0 - 1), fb: fbFor(x0 - 1) },
    { t: fmt(x0 + 2), fb: fbFor(x0 + 2) }
  ];
  var sol = "Substitute the value and compare the two sides: \\[ \\begin{aligned} " + u5lin(a, b) + " &= " + fmt(a) + "(" + fmt(x0) + ")" + (b >= 0 ? "+" + fmt(b) : "-" + fmt(-b)) + " \\\\ &= " + fmt(c) + " \\end{aligned} \\] Both sides match, so the solution is <b>\\(x = " + fmt(x0) + "\\)</b>.";
  return mcq("Which value is the solution of \\(" + u5lin(a, b) + " = " + fmt(c) + "\\)?", { t: fmt(x0), fb: "Correct: substituting it makes both sides equal." }, cands, sol, { mode: "which-sol", a: a, b: b, c: c });
}, ["A solution is a value that makes both sides equal when it is substituted.", "First substitute one value and work out the left side, then compare it with the right side."]);
E("u6-pk-table-equation", 6, ["4.50"], 2, "gen", function () {
  var S = ri(1, 12), P = ri(2, 7), att = 0;
  while (S === P && att < 40) { S = ri(1, 12); P = ri(2, 7); att++; }
  if (S === P) { S = 4; P = 3; }
  var x0 = pick([0, 0, 1]);
  var xs = [], ys = [];
  for (var k = 0; k < 5; k++) { xs.push(x0 + k); ys.push(S + P * (x0 + k)); }
  var corr = "\\(y = " + u6lin(P, S, "x") + "\\)";
  var startNote = x0 === 0
    ? "When \\(x = 0\\), \\(y = " + S + "\\), so the start value is " + S + "."
    : "Extending the pattern back one step, when \\(x = 0\\), \\(y = " + ys[0] + " - " + P + " = " + S + "\\), so the start value is " + S + ".";
  var sol = "The \\(y\\) values rise by the same amount each time \\(x\\) grows by 1: \\[ \\begin{aligned} \\text{step} &= " + ys[1] + " - " + ys[0] + " = " + fmt(P) + " \\end{aligned} \\] " + startNote + " So the equation is <b>" + corr + "</b>.";
  var prompt = "A table of values for a linear relation is shown.<br>x: " + xs.join(", ") + "<br>y: " + ys.join(", ") + "<br>Which equation fits the table?";
  return mcq(prompt,
    { t: corr, fb: "Correct. The step is " + fmt(P) + " and the start value is " + fmt(S) + "." },
    [
      { t: "\\(y = " + u6lin(S, P, "x") + "\\)", fb: "That swaps the start value and the step. Check it at the first table value." },
      { t: "\\(y = " + u6lin(P, -S, "x") + "\\)", fb: "That subtracts the start value. The y values are larger than the step alone, so the start is added." },
      { t: "\\(y = " + u6lin(P, S + P, "x") + "\\)", fb: "The step is right, but the start value is too big. Use the y value when x is 0." }
    ], sol, { mode: "table-equation", S: S, P: P, x0: x0 });
}, ["Find the step first: how much does y change when x grows by 1?", "The start value is the y value when x is 0; extend the pattern back if the table starts later."]);

/* PK tranche metadata pass for Unit 6. The tranche's own entries are flagged here.  */
var PKT_U6_FOR=["4.50","4.51","4.52","4.53","4.54","4.55","4.56","4.57"];
var PKT_U6={
 "u6-pk-context-equation":{src:"math-9:7.2",group:"break-even"},
 "u6-pk-break-even":{src:"math-9:7.2,7.10",group:"break-even"},
 "u6-pk-balance-model":{src:"math-9:8.17",group:"linear-equations"},
 "u6-pk-solve-two-step":{src:"math-9:8.18",group:"linear-equations"},
 "u6-pk-which-is-solution":{src:"math-9:8.20",group:"verify-solution"},
 "u6-pk-table-equation":{src:"math-9:7.4",group:"tables-and-graphs"}
};
BANK.forEach(function(e){var t=PKT_U6[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U6_FOR.slice();e.pkGroup=t.group;}});
