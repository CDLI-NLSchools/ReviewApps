// Math 1201 Unit 4 Relations and Functions question bank
// Cut verbatim from the standalone bank source
// (math-1201-review/bank-src.js, lines 2189 to 3075).
// CRMARKS: u4-domain-range=3
// CRMARKS: u4-rate-of-change=3
// CRMARKS: u4-intercepts=2
// CRMARKS: u4-intercepts-solve=2
// CRMARKS: u4-context-problem=3
// CRMARKS: u4-eval-function=2
// CRMARKS: u4-solve-input=2
// CRMARKS: u4-domain-decision=2
/* Math 1201 Review, Unit 4: Relations and Functions (tranche 2).
   All scenarios and numbers are original to this bank; sources gave types only.
   Helper prefix: u4. Every entry returns the same question type on every draw. */

/* ================= u4 helpers ================= */
function u4gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u4num(n){var v=Math.round(n*100)/100;return ""+v;}
function u4pickS3(ans,cands){
  var out=[],seen={};seen[ans]=1;
  for(var i=0;i<cands.length&&out.length<3;i++){var c=cands[i];if(typeof c==="string"&&c!==ans&&!seen[c]){seen[c]=1;out.push(c);}}
  var pad=[" (one reading of the graph)"," (a second reading of the graph)"," (a third reading of the graph)"];
  var k=0;while(out.length<3){out.push(ans+pad[k]);k++;}
  return out;
}
function u4term(m){
  if(m===1)return "x"; if(m===-1)return "-x";
  return u4num(m)+"x";
}
function u4lin(m,b){
  var s=u4term(m);
  if(b>0)s+=" + "+b; else if(b<0)s+=" - "+Math.abs(b);
  return s;
}
function u4setS(arr){return "\\{"+arr.join(", ")+"\\}";}
function u4pairS(x,y){return "("+u4num(x)+", "+u4num(y)+")";}
function u4pairsS(pairs){return "\\{"+pairs.map(function(p){return u4pairS(p[0],p[1]);}).join(", ")+"\\}";}
function u4interval(v,lo,hi){return "\\("+lo+" \\le "+v+" \\le "+hi+"\\)";}

/* ================= 1. situation for a described graph (4.1, L2, var) ================= */
E("u4-situation-graph",4,["4.1"],1,"var",varset([
  function(){var key="The greenhouse warms through the morning, holds its temperature at midday, then cools later on in the day";
    return mcq("A graph has time in hours on the horizontal axis and the temperature of a greenhouse on the vertical axis. The graph rises steadily, then stays level, then falls steadily. Which situation could this graph represent?",
    key,
    ["The greenhouse cools through the morning, holds its temperature at midday, then warms later on in the day",
     "The greenhouse warms through the morning, then keeps on rising faster and faster until the day is over now",
     "The greenhouse stays at one temperature all morning, then falls steadily, then rises again during the night"],
    "Read the shape in three parts. Rising means the temperature is increasing, a level part means it is holding steady, and falling means it is decreasing. Only one situation follows that order: warming, holding steady, then cooling. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A cyclist rides away from home at a steady pace, rests for a while at a park, then rides home at a steady pace";
    return mcq("A graph has time in minutes on the horizontal axis and distance from home on the vertical axis. The graph rises steadily, then stays level, then falls steadily back to zero. Which situation could this graph represent?",
    key,
    ["A cyclist rides away from home at a steady pace, rests for a while at a park, then rides on even farther away",
     "A cyclist stays at home for a while, then rides away at a steady pace, then rests for a while at a local park",
     "A cyclist rides toward home at a steady pace, rests for a while at a park, then rides away from home once more"],
    "Rising distance from home means moving away, a level part means the distance is not changing, so the cyclist is resting, and falling back to zero means returning home. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A tank is drained at a steady rate for a time, sits empty for a time, then is filled at a steady rate again";
    return mcq("A graph has time in minutes on the horizontal axis and the volume of water in a tank on the vertical axis. The graph falls steadily, then stays level at zero, then rises steadily. Which situation could this graph represent?",
    key,
    ["A tank is filled at a steady rate for a time, sits full for a time, then is drained at a steady rate again",
     "A tank sits empty for a time, then is drained at a steady rate, then is filled at a steady rate once again",
     "A tank is drained at a steady rate for a time, sits partly full for a while, then is drained completely dry"],
    "Falling volume means water is leaving the tank, a level part at zero means the tank sits empty, and rising volume means water is being added. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A seedling grows slowly during its first weeks, then grows much more quickly once its roots are established";
    return mcq("A graph has time in weeks on the horizontal axis and the height of a seedling on the vertical axis. The graph rises slowly at first, then rises more and more steeply. Which situation could this graph represent?",
    key,
    ["A seedling grows quickly during its first weeks, then grows much more slowly once its roots are established",
     "A seedling stays the same height for its first weeks, then grows at one steady rate for the rest of the time",
     "A seedling grows slowly during its first weeks, then shrinks back down once its roots are fully established"],
    "A graph that rises slowly and then more steeply shows a quantity increasing at a growing rate. The height increases slowly at first and then faster. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A phone battery drains at a steady rate while it is used, then charges at a steady rate when it is plugged in";
    return mcq("A graph has time in hours on the horizontal axis and the charge left in a phone battery on the vertical axis. The graph falls steadily, then rises steadily. Which situation could this graph represent?",
    key,
    ["A phone battery charges at a steady rate while it is used, then drains at a steady rate when it is plugged in",
     "A phone battery drains at a steady rate while it is used, then stays at the same low charge for the whole day",
     "A phone battery stays fully charged while it is used, then drains at a steady rate when it is plugged in too"],
    "Falling charge means the battery is draining, and rising charge means it is being charged. The order in the graph is drain first, then charge. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A hiker climbs a steady slope, walks along a flat ridge for a while, then climbs a second steady slope upward";
    return mcq("A graph has distance walked in kilometres on the horizontal axis and height above sea level on the vertical axis. The graph rises steadily, then stays level, then rises steadily again. Which situation could this graph represent?",
    key,
    ["A hiker climbs a steady slope, walks along a flat ridge for a while, then walks down a second steady slope now",
     "A hiker walks along a flat ridge for a while, climbs a steady slope, then walks along a second flat ridge top",
     "A hiker climbs a steady slope, walks down into a flat valley for a while, then climbs a second steady slope up"],
    "Rising height means climbing, a level part means walking on flat ground, and rising again means climbing a second slope. The situation is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 2. graph that fits a situation (4.2, L2, var) ================= */
E("u4-sketch-situation",4,["4.2"],1,"var",varset([
  function(){var key="The graph rises steadily, stays level for a while, rises steadily again, then stays level until the trip ends";
    return mcq("A school bus leaves its depot, drives steadily to a first stop, waits, drives steadily to a second stop, then waits there. A graph plots the distance from the depot against time. Which description matches a graph for this trip?",
    key,
    ["The graph rises steadily, stays level for a while, falls steadily back to zero, then stays level until it ends",
     "The graph stays level for a while, rises steadily the whole rest of the way, then falls steadily back to zero",
     "The graph rises more and more steeply the whole way, with no level parts anywhere along the trip at all today"],
    "Driving steadily away makes the distance rise steadily, and waiting at a stop makes it stay level. The pattern is rise, level, rise, level. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The graph rises steadily at first, then stays level for the rest of the time shown on the graph axes here";
    return mcq("A bathtub is filled with the tap fully open, then the tap is turned off and the water sits in the tub. A graph plots the depth of water against time. Which description matches a graph for this situation?",
    key,
    ["The graph falls steadily at first, then stays level for the rest of the time shown on the graph axes here",
     "The graph rises steadily at first, then falls steadily for the rest of the time shown on the graph axes here",
     "The graph stays level at first, then rises steadily for the rest of the time shown on the graph axes here"],
    "While the tap runs, the depth rises steadily. Once the tap is off, the depth stays level. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The graph falls quickly at first, then falls more and more slowly, levelling off near room temperature";
    return mcq("A mug of hot soup is left on a counter to cool toward room temperature. A graph plots the temperature of the soup against time. Which description matches a graph for this situation?",
    key,
    ["The graph rises quickly at first, then rises more and more slowly, levelling off near room temperature",
     "The graph falls at one steady rate the whole time, reaching room temperature in a single straight line",
     "The graph falls quickly at first, then rises more and more slowly, levelling off near room temperature"],
    "Hot soup cools fastest when it is hottest, then cools more slowly as it nears room temperature, so the graph falls quickly and then levels off. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The graph stays level, then falls steadily to zero, then stays level at zero for the rest of the time";
    return mcq("A full rain barrel sits unused, is then drained at a steady rate until it is empty, and is left empty. A graph plots the volume of water in the barrel against time. Which description matches a graph for this situation?",
    key,
    ["The graph stays level, then rises steadily to the top, then stays level at the top for the rest of time",
     "The graph falls steadily to zero right away, then rises steadily for the rest of the time shown here",
     "The graph stays level, then falls more and more steeply, then rises steadily for the rest of the time"],
    "Sitting unused keeps the volume level, draining at a steady rate makes it fall steadily to zero, and left empty it stays at zero. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The graph rises in equal steps, with a level part between each step, as each floor is passed in turn";
    return mcq("A lift in an office building stops at each floor on its way up, pausing at every floor. A graph plots the height of the lift against time. Which description matches a graph for this situation?",
    key,
    ["The graph rises in equal steps, getting steeper between each step, as each floor is passed in turn",
     "The graph rises steadily in one straight line the whole way up, as each floor is passed in turn",
     "The graph falls in equal steps, with a level part between each step, as each floor is passed by below"],
    "Between stops the lift rises, and at each floor it pauses, so the height stays level. Equal floors give equal steps with level parts between them. The matching description is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 3. connect the points or not (4.3, L3, var) ================= */
E("u4-connect-points",4,["4.3"],3,"var",varset([
  function(){var key="No: tickets are sold in whole numbers only, so points between the plotted values would have no meaning at all";
    return mcq("A graph plots the number of raffle tickets a student buys against the total cost of the tickets. Should the plotted points be connected?",
    key,
    ["Yes: tickets are sold one after another all day, so points between the plotted values would have meaning here",
     "No: the cost of the tickets goes up and down during the day, so points between the values change too much to use",
     "Yes: a connected graph is always the right choice, so points between the plotted values need no meaning at all"],
    "Between one ticket and two tickets there is no possible purchase: tickets come in whole numbers, so the values between the points cannot occur. The points should <b>not</b> be connected, because <b>tickets are sold in whole numbers only</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes: the temperature changes continuously between readings, so every point along the line has a real meaning";
    return mcq("A graph plots the temperature inside a cold storage room, read once each hour, against time. Should the plotted points be connected?",
    key,
    ["No: the temperature is read in whole hours only, so each point on the line would be a guess with no meaning",
     "Yes: the temperature changes all at once at each reading, so every point along the line has a real meaning too",
     "No: a connected graph is never the right choice, so every point along the line must be left out of the picture"],
    "The temperature does not jump from one reading to the next; it changes continuously the whole time, so the points between readings represent real temperatures. The points <b>should</b> be connected, because <b>the temperature changes continuously between readings</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No: people are counted in whole numbers only, so points between the plotted values would have no meaning at all";
    return mcq("A graph plots the number of members in a chess club at the end of each month against the month. Should the plotted points be connected?",
    key,
    ["Yes: members join the club a little at a time, so points between the plotted values would have a real meaning",
     "No: the club meets in a different room each month, so points between the plotted values change too much to use",
     "Yes: a connected graph is always the right choice, so points between the plotted values need no meaning at all here"],
    "A club cannot have a fractional member, and membership only takes whole number values, so the values between the points cannot occur. The points should <b>not</b> be connected, because <b>people are counted in whole numbers only</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes: the depth grows continuously as the water flows in, so every point along the line has a real meaning";
    return mcq("A graph plots the depth of water in a filling aquarium against time. Should the plotted points be connected?",
    key,
    ["No: the depth is measured in whole centimetres, so every point along the line would be a guess with no meaning",
     "Yes: the depth jumps up all at once at each minute, so each point on the line has a real meaning as well",
     "No: a connected graph is never the right choice, so every point along the line must be left out of the picture"],
    "As water flows in, the depth takes every value between one measurement and the next; nothing jumps. The points <b>should</b> be connected, because <b>the depth grows continuously as the water flows in</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No: goals are scored one whole goal at a time, so points between the plotted values would have no meaning here";
    return mcq("A graph plots the total goals scored by a hockey team, counted game by game, against the game number. Should the plotted points be connected?",
    key,
    ["Yes: goals build up a little at a time during play, so points between the plotted values would have real meaning",
     "No: the team plays in a different rink each game, so points between the plotted values change too much to use",
     "Yes: a connected graph is always the right choice, so points between the plotted values need no meaning here"],
    "The total can only change by whole goals, one at a time, so fractional totals between games cannot occur. The points should <b>not</b> be connected, because <b>goals are scored one whole goal at a time</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes: the plant grows continuously between measurements, so every point along the line has a real meaning";
    return mcq("A graph plots the height of a tomato plant, measured each Sunday, against time in weeks. Should the plotted points be connected?",
    key,
    ["No: the plant is measured in weeks only, so each point on the line would be a guess with no meaning",
     "Yes: the plant grows all at once each Sunday night, so every point along the line has a real meaning as well",
     "No: a connected graph is never the right choice, so every point along the line must be left out of the picture"],
    "The plant grows a little every day, not only on Sundays, so heights between the weekly measurements are real. The points <b>should</b> be connected, because <b>the plant grows continuously between measurements</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 4. convert between representations (4.4, L2, gen) ================= */
E("u4-represent",4,["4.4"],1,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var xs=shuffle([1,2,3,4,5,6,7,8]).slice(0,4).sort(function(a,b){return a-b;});
    var ys=xs.map(function(){return ri(1,15);});
    var pairs=xs.map(function(x,i){return [x,ys[i]];});
    var key="\\("+u4pairsS(pairs)+"\\)";
    var swapped=xs.map(function(x,i){return [x,ys[(i+1)%4]];});
    var rev=xs.map(function(x,i){return [ys[i],x];});
    var off=pairs.map(function(p,i){return i===0?[p[0],p[1]+1]:p;});
    var ds=u4pickS3(key,["\\("+u4pairsS(swapped)+"\\)","\\("+u4pairsS(rev)+"\\)","\\("+u4pairsS(off)+"\\)"]);
    return mcq("A relation is given in a table: the \\(x\\) values are \\("+xs.join(", ")+"\\) and the matching \\(y\\) values, in the same order, are \\("+ys.join(", ")+"\\). Which set of ordered pairs represents this relation?",
      key,ds,
      "Pair each \\(x\\) value with the \\(y\\) value in the same position: \\[ \\begin{aligned} "+pairs.map(function(p){return "("+p[0]+", "+p[1]+")";}).join(" \\\\ ")+" \\end{aligned} \\] As a set, the relation is <b>\\("+u4pairsS(pairs)+"\\)</b>.",
      {mode:mode,pairs:pairs,keyStr:key});
  }
  if(mode===2){
    var xs2=shuffle([1,2,3,4,5,6,7,8,9]).slice(0,3).sort(function(a,b){return a-b;});
    var ys2=xs2.map(function(){return ri(2,16);});
    var pairs2=xs2.map(function(x,i){return [x,ys2[i]];});
    function desc(prs){return prs.map(function(p){return p[0]+" is paired with "+p[1];}).join(", ");}
    var key2=desc(pairs2);
    var sw=pairs2.map(function(p,i){return [p[0],ys2[(i+1)%3]];});
    var rv=pairs2.map(function(p){return [p[1],p[0]];});
    var ds2=u4pickS3(key2,[desc(sw),desc(rv),desc(pairs2.map(function(p,i){return i===2?[p[0],p[1]+2]:p;}))]);
    return mcq("A relation is given as the set of ordered pairs \\("+u4pairsS(pairs2)+"\\). Which description states the same relation in words?",
      key2,ds2,
      "Read each ordered pair in order, first coordinate first: "+desc(pairs2)+". The description that states the same relation is: <b>"+key2+"</b>.",
      {mode:mode,pairs:pairs2,keyStr:key2});
  }
  var m=pick([-3,-2,-1,1,2,3]),b=ri(-6,8),x0=ri(1,6);
  var y0=m*x0+b,t=0;while((y0< -20||y0>25)&&t<50){b=ri(-6,8);y0=m*x0+b;t++;}
  var key3="\\("+u4pairS(x0,y0)+"\\)";
  var ds3=u4pickS3(key3,["\\("+u4pairS(x0,y0+1)+"\\)","\\("+u4pairS(x0+1,y0)+"\\)","\\("+u4pairS(y0,x0)+"\\)","\\("+u4pairS(x0,-y0)+"\\)","\\("+u4pairS(x0,m+b)+"\\)"]);
  return mcq("A relation is given by the equation \\(y = "+u4lin(m,b)+"\\). Which ordered pair belongs in a table of values for this relation?",
    key3,ds3,
    "Substitute the first coordinate into the equation and check the result: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ y &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+y0+" \\end{aligned} \\] The ordered pair that belongs is <b>\\("+u4pairS(x0,y0)+"\\)</b>.",
    {mode:mode,m:m,b:b,x0:x0,y0:y0,keyStr:key3});
});

/* ================= 5. is a set of pairs a function (4.5, L1, gen) ================= */
E("u4-is-function",4,["4.5"],1,"gen",function(){
  var isFunc=Math.random()<0.5;
  var xs=shuffle([0,1,2,3,4,5,6,7,8]).slice(0,4);
  var pairs,repX,repY1,repY2,outRep,outA,outB;
  if(isFunc){
    var yRep=ri(2,12);
    pairs=xs.map(function(x,i){return [x, i<2?yRep:ri(1,14)];});
    outRep=yRep;
  }else{
    var ys=shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14]).slice(0,5);
    pairs=[[xs[0],ys[0]],[xs[1],ys[1]],[xs[2],ys[2]],[xs[0],ys[3]]];
    repX=xs[0];repY1=ys[0];repY2=ys[3];
  }
  pairs=shuffle(pairs);
  var prompt="Consider the relation given by the set of ordered pairs \\("+u4pairsS(pairs)+"\\). Which statement correctly decides whether this relation is a function?";
  var yesKey="Yes, it is a function: each input value is paired with exactly one output value in this set";
  var yesAlt="Yes, it is a function: each output value is paired with exactly one input value in this set";
  var key,sol;
  if(isFunc){
    key=yesKey;
    var fa=pairs[0][0],fb=pairs[0][1],fc=pairs[1][1];
    var dNo="No, it is not a function: one input value, "+fa+", is paired with two outputs, "+fb+" and "+fc;
    var dNo2="No, it is not a function: one output value, "+fb+", is paired with two inputs, "+fa+" and "+fc;
    sol="Check the first coordinates: in \\("+u4pairsS(pairs)+"\\), no input value repeats, so each input has exactly one output. A repeated output is allowed and does not change this. The relation <b>is a function: each input value is paired with exactly one output value</b>.";
    return mcq(prompt,key,[dNo,dNo2,yesAlt],sol,{isFunc:true,pairs:pairs,keyText:key,stmt:true});
  }
  key="No, it is not a function: one input value, "+repX+", is paired with two outputs, "+repY1+" and "+repY2;
  var dNoAlt="No, it is not a function: one output value, "+repY1+", is paired with two inputs, "+repX+" and "+repY2;
  sol="Check the first coordinates: the input \\("+repX+"\\) appears twice, paired with \\("+repY1+"\\) and with \\("+repY2+"\\). One input with two different outputs breaks the rule for a function. The relation <b>is not a function: the input value "+repX+" is paired with two outputs</b>.";
  return mcq(prompt,key,[yesKey,yesAlt,dNoAlt],sol,{isFunc:false,pairs:pairs,repX:repX,repY1:repY1,repY2:repY2,keyText:key,stmt:true});
});

/* ================= 6. relations that are not functions (4.6, L3, var) ================= */
E("u4-relation-not-function",4,["4.6"],3,"var",varset([
  function(){var key="Every function is a relation, but a relation such as pairing one student with every course she takes is not a function";
    return mcq("Which statement correctly explains the link between relations and functions, using an example?",
    key,
    ["Every relation is a function, and a relation such as pairing one student with every course she takes shows this clearly",
     "Some functions are not relations, but a relation such as pairing one student with every course she takes is a function",
     "Every function is a relation, and a relation such as pairing one student with every course she takes is always one too"],
    "A relation is any pairing of inputs with outputs. A function is the special case where each input has exactly one output. One student paired with several courses has one input with several outputs, so that relation is not a function, while every function still counts as a relation. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="A relation fails to be a function when one input has more than one output, as when the number 4 is paired with both 2 and -2";
    return mcq("Which statement correctly explains why some relations are not functions, using an example?",
    key,
    ["A relation fails to be a function when one output has more than one input, as when the number 4 is paired with both 2 and -2",
     "A relation fails to be a function when its outputs are not all whole numbers, as when the number 4 is paired with 2 and -2",
     "A relation fails to be a function when it has more than one pair in it, as when the number 4 is paired with both 2 and -2"],
    "What matters is the inputs: one input may not lead to two different outputs. Pairing \\(4\\) with both \\(2\\) and \\(-2\\) gives one input two outputs, so that relation is not a function. Repeated outputs, by contrast, are allowed. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="All functions are relations because a function is a relation with one extra rule: each input has exactly one output value";
    return mcq("Which statement correctly explains why all functions are relations but not all relations are functions?",
    key,
    ["All relations are functions because a relation is a function with one extra rule: each input has exactly one output value",
     "All functions are relations because a function is a relation with one extra rule: each output has exactly one input value",
     "All functions are relations because a function is a relation with one extra rule: each input has at least one output value"],
    "Start with a relation, any pairing of inputs and outputs, and add the rule that each input has exactly one output: that special relation is a function. So every function is a relation, but a relation that breaks the rule is not a function. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Pairing each person in a class with their eye colour can fail as a function only if one person is given two different colours";
    return mcq("A relation pairs each person in a class with their eye colour. Which statement about this relation is correct?",
    key,
    ["Pairing each person in a class with their eye colour can fail as a function only if one colour is shared by two people",
     "Pairing each person in a class with their eye colour can fail as a function only if the class has more people than colours",
     "Pairing each person in a class with their eye colour can fail as a function only if one person has no colour listed at all here"],
    "Each person is an input and their colour is the output. The relation is a function unless one person, one input, is assigned two different outputs. Two people sharing one colour is a repeated output, which is allowed. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The relation pairing a whole number with its factors is not a function, since one input such as 6 is paired with 1, 2, 3 and 6";
    return mcq("Which statement correctly classifies the relation that pairs each whole number with its factors?",
    key,
    ["The relation pairing a whole number with its factors is a function, since one input such as 6 is paired with 1, 2, 3 and 6",
     "The relation pairing a whole number with its factors is not a function, since one output such as 1 is paired with many inputs in all",
     "The relation pairing a whole number with its factors is a function, since every whole number input has at least one factor"],
    "The number \\(6\\) is one input, and it is paired with several outputs: \\(1, 2, 3\\) and \\(6\\). One input with more than one output means the relation is not a function. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 7. sort described graphs (4.7, L2, var) ================= */
E("u4-sort-graphs",4,["4.7"],1,"var",varset([
  function(){var key="Graphs A and C only";
    return mcq("Four graphs are described. Graph A is a straight line with a positive slope. Graph B is a circle. Graph C is a parabola opening upward. Graph D is a vertical line. Which of these graphs represent functions?",
    key,["Graphs A and D only","Graphs B and C only","Graphs A, C and D only"],
    "Use the vertical line test. A straight slanted line and an upward parabola are each met once by any vertical line, so they are functions. A circle and a vertical line are each met more than once by some vertical line, so they are not. The functions are <b>graphs A and C only</b>.",
    {keyText:key});},
  function(){var key="Graphs B and D only";
    return mcq("Four graphs are described. Graph A is a parabola opening to the right. Graph B is a horizontal line. Graph C is a circle. Graph D is a straight line with a negative slope. Which of these graphs represent functions?",
    key,["Graphs A and B only","Graphs C and D only","Graphs B, C and D only"],
    "A horizontal line and a slanted line pass the vertical line test. A sideways parabola and a circle fail it, since a vertical line can meet each of them twice. The functions are <b>graphs B and D only</b>.",
    {keyText:key});},
  function(){var key="Graph C only";
    return mcq("Four graphs are described. Graph A is a vertical line. Graph B is an oval closed curve. Graph C is a parabola opening downward. Graph D is a sideways parabola opening left. Which of these graphs represent functions?",
    key,["Graph A only","Graph B only","Graphs C and D only"],
    "Only the downward parabola passes the vertical line test. A vertical line, a closed oval, and a sideways parabola are each met more than once by some vertical line. The only function is <b>graph C only</b>.",
    {keyText:key});},
  function(){var key="Graphs A, B and D only";
    return mcq("Four graphs are described. Graph A is a V shape opening upward. Graph B is a straight line through the origin. Graph C is a circle. Graph D is a parabola opening upward. Which of these graphs represent functions?",
    key,["Graphs A and B only","Graphs A, C and D only","Graphs B and D only"],
    "The V shape, the line through the origin, and the upward parabola are each met at most once by any vertical line. The circle fails the test. The functions are <b>graphs A, B and D only</b>.",
    {keyText:key});},
  function(){var key="Graphs B and C only";
    return mcq("Four graphs are described. Graph A is a vertical line segment. Graph B is a curve that rises, levels off, then rises again. Graph C is a horizontal line segment. Graph D is a closed oval curve. Which of these graphs represent functions?",
    key,["Graphs A and C only","Graphs A, B and C only","Graphs C and D only"],
    "The rising curve and the horizontal segment each give one height for each input. A vertical segment and a closed oval each fail the vertical line test. The functions are <b>graphs B and C only</b>.",
    {keyText:key});}
]));

/* ================= 8. the general function rule (4.8, L3, var) ================= */
E("u4-function-rule",4,["4.8"],3,"var",varset([
  function(){var key="A relation is a function when each input has exactly one output; on a graph, this means every vertical line meets it at most once";
    return mcq("Which statement gives the general rule for deciding whether a relation is a function, in both of its common forms?",
    key,
    ["A relation is a function when each output has just one input; on a graph, this means every horizontal line meets it at most once",
     "A relation is a function when each input has at least one output; on a graph, this means every vertical line meets it at least once",
     "A relation is a function when each input has exactly one output; on a graph, this means every horizontal line meets it at most once"],
    "The rule is about inputs: each input has exactly one output. On a graph, two points sharing an input lie on one vertical line, so the graph form of the rule is that every vertical line meets the graph at most once. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It is not a function: the input 5 appears with two different outputs, and one input may have only one output in a function";
    return mcq("A set of ordered pairs contains both \\((5, 2)\\) and \\((5, 9)\\). A student applies the general rule. Which conclusion follows?",
    key,
    ["It is a function: the input 5 appears with two different outputs, and one input may have several outputs in a function",
     "It is not a function: the output 2 appears with two different inputs, and one output may have only one input in a function",
     "It is a function: the input 5 appears with two different outputs, and outputs may repeat freely in any kind of relation"],
    "The general rule says each input has exactly one output. Here the single input \\(5\\) is paired with both \\(2\\) and \\(9\\), so the rule is broken. The correct conclusion is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="It is still a function: outputs may repeat, because the rule only requires each input to have exactly one output of its own";
    return mcq("A table of values has the output \\(7\\) appearing for two different inputs, and no input repeats. A student applies the general rule. Which conclusion follows?",
    key,
    ["It is not a function: outputs may not repeat, because the rule requires each output to belong to exactly one input of its own",
     "It is still a function: inputs may repeat, because the rule only requires each output to have exactly one input of its own",
     "It is not a function: outputs may repeat only in graphs, because the rule for tables requires each output to be used just once"],
    "The rule restricts inputs, not outputs. No input repeats, so each input has exactly one output, and a repeated output is allowed. The correct conclusion is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Draw a vertical line that meets the graph twice; two points at one input value show the relation is not a function at all";
    return mcq("To show that a graphed relation is not a function, which test uses the general rule correctly?",
    key,
    ["Draw a horizontal line that meets the graph twice; two points at one output value show the relation is not a function at all",
     "Draw a vertical line that meets the graph twice; two points at one output value show the relation is not a function",
     "Draw a horizontal line that meets the graph twice; two points at one input value show the relation is not a function at all"],
    "Two points on one vertical line share the same input value but have different outputs, which breaks the rule that each input has exactly one output. The correct test is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Check the first coordinates: if any first coordinate repeats with a different second coordinate, the relation is not a function";
    return mcq("Which procedure correctly applies the general rule to a set of ordered pairs?",
    key,
    ["Check the second coordinates: if any second coordinate repeats with a different first coordinate, the relation is not a function",
     "Check the first coordinates: if any first coordinate repeats with the same second coordinate, the relation is not a function",
     "Check the second coordinates: if any second coordinate repeats with the same first coordinate, the relation is not a function"],
    "The first coordinates are the inputs. A repeated input is a problem only when it comes with a different output; a repeated pair is still one output for that input. The correct procedure is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 9. domain or range of graphed data (4.9, L2, gen) ================= */
E("u4-graph-data",4,["4.9"],1,"gen",function(){
  var profs=[
    {name:"A weather station records the day number of a study and the high temperature that day, in degrees",xlab:"day",ylab:"temperature"},
    {name:"A coach records the week number of a training plan and the number of laps the team swam that week",xlab:"week",ylab:"laps"},
    {name:"A shop records the number of hours since opening and the number of loaves sold so far that day",xlab:"hours",ylab:"loaves"},
    {name:"A class records the number of school days since seeds were planted and the average seedling height, in centimetres",xlab:"days",ylab:"height"}
  ];
  var prof=pick(profs);
  var xs=shuffle([1,2,3,4,5,6,7]).slice(0,4).sort(function(a,b){return a-b;});
  var ys=[];while(ys.length<4){var y=ri(3,28);if(ys.indexOf(y)<0)ys.push(y);}
  var askRange=Math.random()<0.5;
  var vals=askRange?ys.slice().sort(function(a,b){return a-b;}):xs;
  var other=askRange?xs:ys.slice().sort(function(a,b){return a-b;});
  var key="\\("+u4setS(vals)+"\\)";
  var alt=vals.slice();alt[alt.length-1]=alt[alt.length-1]+2;
  var short=vals.slice(0,3);
  var ds=u4pickS3(key,["\\("+u4setS(other)+"\\)","\\("+u4setS(alt)+"\\)","\\("+u4setS(short)+"\\)"]);
  var pairs=xs.map(function(x,i){return [x,ys[i]];});
  return mcq(prof.name+". The data points are \\("+u4pairsS(pairs)+"\\), where the first coordinate is the "+prof.xlab+" value and the second is the "+prof.ylab+" value. What is the <b>"+(askRange?"range":"domain")+"</b> of this relation?",
    key,ds,
    "The domain is the set of first coordinates and the range is the set of second coordinates. From \\("+u4pairsS(pairs)+"\\), the "+(askRange?"second":"first")+" coordinates are \\("+vals.join(", ")+"\\). The <b>"+(askRange?"range":"domain")+" is \\("+u4setS(vals)+"\\)</b>.",
    {profName:prof.name,asked:askRange?"range":"domain",xs:xs,ys:ys,keyStr:key});
});

/* ================= 10. domain and range together (4.10, L2, gen, CR 3) ================= */
E("u4-domain-range",4,["4.10"],1,"gen",function(){
  var useTable=Math.random()<0.5;
  var xs=shuffle([0,1,2,3,4,5,6,7,8,9]).slice(0,4);
  var ys=[];while(ys.length<4){var y=ri(1,18);if(ys.indexOf(y)<0)ys.push(y);}
  var pairs=xs.map(function(x,i){return [x,ys[i]];});
  var dom=xs.slice(),rng=ys.slice();
  function drStr(d,r){return "Domain: \\("+u4setS(d)+"\\); range: \\("+u4setS(r)+"\\)";}
  var key=drStr(dom,rng);
  var altR=rng.slice();altR[0]=altR[0]+3;while(dom.indexOf(altR[0])>=0&&rng.indexOf(altR[0])>=0)altR[0]++;
  var ds=u4pickS3(key,[drStr(rng,dom),drStr(dom,altR),drStr(xs.slice(0,3),rng)]);
  var shown=useTable?("A table of values has \\(x\\) values \\("+xs.join(", ")+"\\) with matching \\(y\\) values, in the same order, \\("+ys.join(", ")+"\\)"):("A relation is given by the set of ordered pairs \\("+u4pairsS(pairs)+"\\)");
  return mcq(shown+". Which choice gives the domain and the range of this relation?",
    key,ds,
    "Collect the first coordinates for the domain and the second coordinates for the range, listing each value once: \\[ \\begin{aligned} \\text{Domain} &= "+u4setS(dom)+" \\\\ \\text{Range} &= "+u4setS(rng)+" \\end{aligned} \\] The domain and range are <b>domain \\("+u4setS(dom)+"\\) and range \\("+u4setS(rng)+"\\)</b>.",
    {pairs:pairs,dom:dom,rng:rng,keyStr:key});
});

/* ================= 11. independent and dependent variables (4.11, L1, gen) ================= */
E("u4-indep-dep",4,["4.11"],1,"gen",function(){
  var profs=[
    {ctx:"A plumber charges by the job",span:["jobs in a month",4,20],indep:"the number of hours the plumber works",dep:"the total charge for the work",extra:["the colour of the plumber van","the day of the week the work is booked"]},
    {ctx:"A bakery sells sourdough loaves at a set price per loaf",span:["days of sales records",3,21],indep:"the number of loaves sold",dep:"the money taken in from loaf sales",extra:["the name of the baker on shift","the colour of the bakery sign"]},
    {ctx:"A cyclist rides at a steady speed on a trail",span:["hours of riding recorded",2,14],indep:"the time spent riding",dep:"the distance covered on the trail",extra:["the brand of the bicycle used","the colour of the rider helmet"]},
    {ctx:"A hall rents tables for community suppers",span:["suppers in a year",4,16],indep:"the number of tables rented",dep:"the total rental cost for the tables",extra:["the menu served at the supper","the name of the hall caretaker"]},
    {ctx:"A student reads a novel at a steady pace",span:["days of reading logged",4,20],indep:"the number of days spent reading",dep:"the number of pages read so far",extra:["the cover design of the novel","the author of the novel"]},
    {ctx:"A greenhouse heater runs on cold nights",span:["nights in a season",10,40],indep:"the number of hours the heater runs",dep:"the amount of fuel the heater uses",extra:["the colour of the greenhouse frame","the type of plants in the beds"]},
    {ctx:"A ferry carries passengers across a harbour",span:["crossings in a week",8,32],indep:"the number of passengers carried",dep:"the total fare money collected",extra:["the name painted on the ferry","the colour of the harbour water"]},
    {ctx:"A knitter makes scarves to sell at a market",span:["weeks of knitting logged",2,14],indep:"the number of scarves finished",dep:"the total length of yarn used up",extra:["the pattern used for the scarves","the colour of the market stall"]},
    {ctx:"A dog walker takes dogs out in small groups",span:["walks in a month",6,24],indep:"the number of walks taken",dep:"the total distance walked with the dogs",extra:["the names of the dogs in the group","the colour of the walker coat"]},
    {ctx:"A guitar teacher gives lessons after school",span:["lessons in a term",8,30],indep:"the number of lessons given",dep:"the total lesson fees collected",extra:["the make of the teacher guitar","the room the lessons are held in"]},
    {ctx:"A market stall sells jars of homemade jam",span:["market days in a season",4,18],indep:"the number of jars sold",dep:"the money taken in from jam sales",extra:["the flavour of jam on display","the colour of the stall canopy"]},
    {ctx:"A lawn care worker mows lawns in a neighbourhood",span:["lawns in a month",10,36],indep:"the number of lawns mowed",dep:"the total mowing charges billed",extra:["the brand of the mower used","the street the lawns are on"]}
  ];
  var prof=pick(profs);
  var spanVal=ri(prof.span[1],prof.span[2]);
  var askDep=Math.random()<0.5;
  var key=askDep?prof.dep:prof.indep;
  var other=askDep?prof.indep:prof.dep;
  var ds=u4pickS3(key,[other,prof.extra[0],prof.extra[1]]);
  return mcq(prof.ctx+", and records are kept over "+spanVal+" "+prof.span[0]+". In this relation, which quantity is the <b>"+(askDep?"dependent":"independent")+" variable</b>?",
    key,ds,
    "The independent variable is the quantity that is chosen or that drives the relation, and the dependent variable is the quantity that results from it. Here "+prof.dep+" results from "+prof.indep+". The <b>"+(askDep?"dependent":"independent")+" variable is "+key+"</b>.",
    {profCtx:prof.ctx,askDep:askDep,keyText:key,spanVal:spanVal});
});

/* ================= 12. domain and range of a linear graph (4.12, L2, gen) ================= */
E("u4-dr-linear",4,["4.12"],1,"gen",function(){
  var x1=ri(-6,2),x2=x1+ri(3,9);
  var m=pick([-2,-1,1,2]),b=ri(-5,6);
  var y1=m*x1+b,y2=m*x2+b;
  var askRange=Math.random()<0.5;
  var lo=askRange?Math.min(y1,y2):x1, hi=askRange?Math.max(y1,y2):x2;
  var vname=askRange?"y":"x";
  var key=u4interval(vname,lo,hi);
  var oLo=askRange?x1:Math.min(y1,y2), oHi=askRange?x2:Math.max(y1,y2), oV=askRange?"x":"y";
  var ds=u4pickS3(key,[u4interval(oV,oLo,oHi),u4interval(vname,lo,hi+2),u4interval(vname,lo-1,hi)]);
  return mcq("The graph of a linear relation is the line segment joining the points \\("+u4pairS(x1,y1)+"\\) and \\("+u4pairS(x2,y2)+"\\), including both endpoints. What is the <b>"+(askRange?"range":"domain")+"</b> of this relation?",
    key,ds,
    "On a line segment, the domain runs from the smallest to the largest first coordinate and the range runs from the smallest to the largest second coordinate. The endpoints give \\(x\\) from \\("+x1+"\\) to \\("+x2+"\\) and \\(y\\) from \\("+Math.min(y1,y2)+"\\) to \\("+Math.max(y1,y2)+"\\): \\[ \\begin{aligned} \\text{Domain} &: "+x1+" \\le x \\le "+x2+" \\\\ \\text{Range} &: "+Math.min(y1,y2)+" \\le y \\le "+Math.max(y1,y2)+" \\end{aligned} \\] The <b>"+(askRange?"range":"domain")+" is "+key+"</b>.",
    {x1:x1,x2:x2,y1:y1,y2:y2,asked:askRange?"range":"domain",keyStr:key});
});

/* ================= 13. is a table linear (4.13, L2, gen) ================= */
E("u4-linear-table",4,["4.13"],2,"gen",function(){
  var isLin=Math.random()<0.5;
  var x0=ri(0,4),step=pick([1,2]),y0=ri(1,12);
  var xs=[0,1,2,3].map(function(i){return x0+i*step;});
  var ys,diffs;
  if(isLin){var d=pick([2,3,4,5,6,7]);ys=xs.map(function(x,i){return y0+i*d;});diffs=[d,d,d];}
  else{var d1=pick([2,3,4,5]),d2=d1+pick([1,2,3]);ys=[y0,y0+d1,y0+d1+d2,y0+d1+d2+d2];diffs=[d1,d2,d2];}
  function yesOpt(d){return "Yes, it is linear: the first differences of the outputs stay at "+d+" across the whole table of values shown";}
  function noOpt(a,b){return "No, it is not linear: the first differences of outputs move from "+a+" to "+b+" across the table shown";}
  var key=isLin?yesOpt(diffs[0]):noOpt(diffs[0],diffs[1]);
  var ds=isLin?[yesOpt(diffs[0]+1),noOpt(diffs[0],diffs[0]+1),noOpt(diffs[0]+1,diffs[0])]:[noOpt(diffs[1],diffs[0]),yesOpt(diffs[0]),yesOpt(diffs[1])];
  var dsF=u4pickS3(key,ds);
  return mcq("A table of values has \\(x\\) values \\("+xs.join(", ")+"\\) and matching \\(y\\) values, in the same order, \\("+ys.join(", ")+"\\). The \\(x\\) values increase by a constant step. Which statement correctly decides whether this relation is linear?",
    key,dsF,
    "Work out the first differences of the \\(y\\) values: \\[ \\begin{aligned} "+ys[1]+" - "+ys[0]+" &= "+diffs[0]+" \\\\ "+ys[2]+" - "+ys[1]+" &= "+diffs[1]+" \\\\ "+ys[3]+" - "+ys[2]+" &= "+diffs[2]+" \\end{aligned} \\] "+(isLin?"The differences are all the same, so the relation is linear.":"The differences are not all the same, so the relation is not linear.")+" The correct statement is: <b>"+key+"</b>.",
    {xs:xs,ys:ys,isLin:isLin,keyText:key,stmt:true});
});

/* ================= 14. is a described graph linear (4.14, L1, var) ================= */
E("u4-linear-graph",4,["4.14"],1,"var",varset([
  function(){var key="Yes, it is a linear relation: the graph is a straight line, so the rate of change is the same everywhere";
    return mcq("A graph is described as a single straight line rising from the lower left to the upper right. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["No, it is not a linear relation: the graph is a straight line, so the rate of change is the same",
     "Yes, it is a linear relation: the graph is a straight line, so the rate of change grows steadily everywhere",
     "No, it is not a linear relation: the graph is a straight line, so the rate of change changes from point to point"],
    "A linear relation graphs as a straight line, with a constant rate of change. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No, it is not a linear relation: the graph is a curve, so the rate of change is not the same everywhere on it";
    return mcq("A graph is described as a smooth curve that rises slowly at first and then more and more steeply. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["Yes, it is a linear relation: the graph is a curve, so the rate of change is the same everywhere along the graph",
     "No, it is not a linear relation: the graph is a curve, so the rate of change is exactly the same everywhere on it",
     "Yes, it is a linear relation: the graph is a curve, so the rate of change is not the same everywhere along it"],
    "A curve that steepens does not have a constant rate of change, and a linear relation must graph as a straight line. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes, it is a linear relation: a horizontal graph is a straight line, so its rate of change is a constant zero";
    return mcq("A graph is described as a single horizontal straight line. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["No, it is not a linear relation: a horizontal graph is a straight line, so its rate of change is a constant zero",
     "Yes, it is a linear relation: a horizontal graph is straight, so its rate of change is a changing value",
     "No, it is not a linear relation: a horizontal graph is a straight line, so its rate of change cannot be stated"],
    "A horizontal line is still a straight line, and its rate of change is constantly zero, so it is a linear relation. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="No, it is not a linear relation: the graph bends at its middle point, so it is not one straight line throughout";
    return mcq("A graph is described as two straight pieces joined at a point, rising steeply and then rising gently. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["Yes, it is a linear relation: the graph bends at its middle point, so it is not one straight line throughout",
     "No, it is not a linear relation: the graph bends at its middle point, so it is one straight line throughout it",
     "Yes, it is a linear relation: the graph bends at its middle point, so its rate of change stays constant overall"],
    "One linear relation has one constant rate of change and one straight line. Two pieces with different steepness have two different rates of change. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="Yes, it is a linear relation: the graph is a straight line, even though it falls rather than rises along its length";
    return mcq("A graph is described as a single straight line falling from the upper left to the lower right. Which statement correctly decides whether this graph represents a linear relation?",
    key,
    ["No, it is not a linear relation: the graph is a straight line, even though it falls rather than rises along it",
     "Yes, it is a linear relation: the graph is a straight line, even though it rises rather than falls along length",
     "No, it is not a linear relation: the graph is a straight line, and a falling line has a rate that changes slowly over time"],
    "Falling lines are straight lines with a constant negative rate of change, so they represent linear relations. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 15. is an equation linear (4.15, L2, gen) ================= */
E("u4-linear-equation",4,["4.15"],1,"gen",function(){
  var kind=pick(["linSlope","linSlope","linStd","linVert","sq","prod","recip","ysq","sqrt"]);
  var a=ri(2,6),b=ri(2,7),c=ri(3,12);
  var eqStr,isLin;
  if(kind==="linSlope"){eqStr="y = "+u4lin(pick([-3,-2,2,3,4]),ri(-6,6));isLin=true;}
  else if(kind==="linStd"){eqStr=a+"x + "+b+"y = "+c;isLin=true;}
  else if(kind==="linVert"){eqStr="x = "+ri(-5,7);isLin=true;}
  else if(kind==="sq"){eqStr="y = "+a+"x^2 + "+b;isLin=false;}
  else if(kind==="prod"){eqStr="xy = "+c;isLin=false;}
  else if(kind==="recip"){eqStr="y = "+FR(c,"x");isLin=false;}
  else if(kind==="ysq"){eqStr="y^2 = "+a+"x + "+b;isLin=false;}
  else{eqStr="y = \\sqrt{x} + "+b;isLin=false;}
  function yesOpt(w){return "Yes, it is linear: every variable in the equation appears only to the "+w+" power, with no products of variables";}
  function noOpt(w){return "No, it is not linear: the equation cannot be written with each variable only to the "+w+" power in every term";}
  var key=isLin?yesOpt("first"):noOpt("first");
  var ds=isLin?[yesOpt("third"),noOpt("first"),noOpt("third")]:[noOpt("third"),yesOpt("first"),yesOpt("third")];
  var dsF=u4pickS3(key,ds);
  var reason=isLin?"Every variable appears to the first power only, there is no product of variables, and no variable sits under a root or in a denominator, so the graph is a straight line.":
    "A squared variable, a product of the variables, a variable in a denominator, a squared \\(y\\), or a variable under a root all break the pattern of a linear equation, whose variables appear only to the first power.";
  return mcq("Consider the equation \\("+eqStr+"\\). Which statement correctly decides whether this equation represents a linear relation?",
    key,dsF,
    reason+" The correct statement is: <b>"+key+"</b>.",
    {kind:kind,isLin:isLin,keyText:key,stmt:true});
});

/* ================= 16. are ordered pairs linear (4.16, L2, gen) ================= */
E("u4-pairs-linear",4,["4.16"],2,"gen",function(){
  var isLin=Math.random()<0.5;
  var x0=ri(-3,3),step=pick([1,2,3]),y0=ri(-4,10);
  var xs=[0,1,2,3].map(function(i){return x0+i*step;});
  var ys,slopes;
  if(isLin){var m=pick([1,2,3]);ys=xs.map(function(x){return m*(x-x0)+y0;});slopes=[m,m,m];}
  else{var m1=pick([1,2,3]),m2=m1+pick([1,2]);ys=[y0,y0+m1*step,y0+m1*step+m2*step,y0+m1*step+2*m2*step];slopes=[m1,m2,m2];}
  var pairs=xs.map(function(x,i){return [x,ys[i]];});
  function yesOpt(v){return "Yes, it is linear: the rate of change between pairs stays at "+v+" from one pair to the next pair in the set";}
  function noOpt(a,b){return "No, it is not linear: the rate of change between pairs moves from "+a+" to "+b+" within the set of pairs";}
  var key=isLin?yesOpt(slopes[0]):noOpt(slopes[0],slopes[1]);
  var ds=isLin?[yesOpt(slopes[0]+1),noOpt(slopes[0],slopes[0]+1),noOpt(slopes[0]+1,slopes[0])]:[noOpt(slopes[1],slopes[0]),yesOpt(slopes[0]),yesOpt(slopes[1])];
  var dsF=u4pickS3(key,ds);
  return mcq("A relation is given by the ordered pairs \\("+u4pairsS(pairs)+"\\). The pairs are listed in order of increasing first coordinate. Which statement correctly decides whether this relationship is linear?",
    key,dsF,
    "Compare the change in the second coordinates with the change in the first coordinates between consecutive pairs: \\[ \\begin{aligned} \\text{rates} &= "+slopes.join(", ")+" \\end{aligned} \\] "+(isLin?"The rate of change is the same between every pair, so the relationship is linear.":"The rate of change changes between pairs, so the relationship is not linear.")+" The correct statement is: <b>"+key+"</b>.",
    {pairs:pairs,isLin:isLin,keyText:key,stmt:true});
});

/* ================= 17. rate of change (4.19, L2, gen, num, CR 3) ================= */
E("u4-rate-of-change",4,["4.19"],1,"gen",function(){
  var mode=ri(1,2);
  var m=pick([-3,-2,-1,-0.5,0.5,1,2,3,4]);
  var dx=pick([2,3,4,5]),x1=ri(0,6),x2=x1+dx;
  var y1=ri(1,15),y2=y1+m*dx;
  var prompt,solHead;
  if(mode===1){
    prompt="A table for a linear relation has two rows: when the input is \\("+x1+"\\), the output is \\("+y1+"\\), and when the input is \\("+x2+"\\), the output is \\("+y2+"\\). What is the rate of change of this relation?";
    solHead="The rate of change is the change in output divided by the change in input, using the two rows of the table:";
  }else{
    prompt="The graph of a linear relation passes through the points \\("+u4pairS(x1,y1)+"\\) and \\("+u4pairS(x2,y2)+"\\). What is the rate of change of this relation?";
    solHead="The rate of change is the change in the second coordinates divided by the change in the first coordinates:";
  }
  return numq(prompt,m,0.011,
    solHead+" \\[ \\begin{aligned} \\text{rate of change} &= "+FR(y2+" - "+y1,x2+" - "+x1)+" \\\\ &= "+FR(u4num(y2-y1),u4num(x2-x1))+" \\\\ &= "+u4num(m)+" \\end{aligned} \\] The rate of change is <b>\\("+u4num(m)+"\\)</b>.",
    {mode:mode,x1:x1,y1:y1,x2:x2,y2:y2,ans:m});
});

/* ================= 18. y-intercept from an equation, read off (4.28, L1, gen, num, CR 2; the read-off family kept when u4-intercepts was split under the ruling 8 principle, Nov 13, 2026) ================= */
E("u4-intercepts",4,["4.28"],1,"gen",function(){
  var askX=false;
  var m=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var xi=ri(-9,9);while(xi===0)xi=ri(-9,9);
  var b=-m*xi;
  var ans=askX?xi:b;
  var eq="y = "+u4lin(m,b);
  var sol=askX?
    "The \\(x\\)-intercept is where the graph meets the horizontal axis, so set the output to zero and solve: \\[ \\begin{aligned} 0 &= "+u4lin(m,b)+" \\\\ "+(-b)+" &= "+u4num(m)+"x \\\\ x &= "+xi+" \\end{aligned} \\] The \\(x\\)-intercept is <b>\\("+xi+"\\)</b>, at the point \\("+u4pairS(xi,0)+"\\)":
    "The \\(y\\)-intercept is where the graph meets the vertical axis, so use an input of zero: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ y &= "+u4num(m)+"(0) + ("+b+") \\\\ &= "+b+" \\end{aligned} \\] The \\(y\\)-intercept is <b>\\("+b+"\\)</b>, at the point \\("+u4pairS(0,b)+"\\)";
  return numq("A linear relation is given by the equation \\("+eq+"\\). What is the value of the "+(askX?"\\(x\\)-intercept":"\\(y\\)-intercept")+" of its graph?",
    ans,0.011,sol,{askX:askX,m:m,b:b,ans:ans});
});

/* ================= 18b. x-intercept from an equation, solved (4.28, L2, gen, num, CR 2; the solve family split from u4-intercepts under the ruling 8 principle, Nov 13, 2026) ================= */
E("u4-intercepts-solve",4,["4.28"],2,"gen",function(){
  var askX=true;
  var m=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  var xi=ri(-9,9);while(xi===0)xi=ri(-9,9);
  var b=-m*xi;
  var ans=askX?xi:b;
  var eq="y = "+u4lin(m,b);
  var sol=askX?
    "The \\(x\\)-intercept is where the graph meets the horizontal axis, so set the output to zero and solve: \\[ \\begin{aligned} 0 &= "+u4lin(m,b)+" \\\\ "+(-b)+" &= "+u4num(m)+"x \\\\ x &= "+xi+" \\end{aligned} \\] The \\(x\\)-intercept is <b>\\("+xi+"\\)</b>, at the point \\("+u4pairS(xi,0)+"\\)":
    "The \\(y\\)-intercept is where the graph meets the vertical axis, so use an input of zero: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ y &= "+u4num(m)+"(0) + ("+b+") \\\\ &= "+b+" \\end{aligned} \\] The \\(y\\)-intercept is <b>\\("+b+"\\)</b>, at the point \\("+u4pairS(0,b)+"\\)";
  return numq("A linear relation is given by the equation \\("+eq+"\\). What is the value of the "+(askX?"\\(x\\)-intercept":"\\(y\\)-intercept")+" of its graph?",
    ans,0.011,sol,{askX:askX,m:m,b:b,ans:ans});
});

/* ================= 19. how many intercepts (4.29, L1, var) ================= */
E("u4-intercept-count",4,["4.29"],1,"var",varset([
  function(){var key="A slanted line that does not pass through the origin";
    return mcq("Which described line has exactly two intercepts, one on each axis, at two different points?",
    key,["A horizontal line above the horizontal axis","A vertical line to the right of the vertical axis","The horizontal axis itself, taken as a line"],
    "A slanted line that misses the origin crosses the horizontal axis once and the vertical axis once, at two different points. A horizontal or vertical line off the axes crosses only one axis, and the horizontal axis meets the vertical axis once while lying along the other. The line is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="A horizontal line above the horizontal axis";
    return mcq("Which described line has exactly one intercept, on the vertical axis only?",
    key,["A slanted line that does not pass through the origin","The vertical axis itself, taken as a line","A vertical line to the right of the vertical axis"],
    "A horizontal line above the axis crosses the vertical axis once and never crosses the horizontal axis, so its only intercept is on the vertical axis. A slanted line missing the origin has two intercepts, the vertical axis coincides with one axis, and a vertical line crosses only the horizontal axis. The line is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The vertical axis itself, taken as a line";
    return mcq("Which described line has an infinite number of intercepts on one axis?",
    key,["A vertical line to the right of the vertical axis","A horizontal line above the horizontal axis","A slanted line that does not pass through the origin"],
    "A line that coincides with an axis meets that axis at every one of its points, giving infinitely many intercepts on that axis. Lines off the axes cross each axis at most once. The line is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="A slanted line that passes through the origin";
    return mcq("Which described line has its two intercepts at the same single point?",
    key,["A horizontal line above the horizontal axis","A vertical line to the left of the vertical axis","The horizontal axis itself, taken as a line"],
    "A slanted line through the origin crosses both axes at the origin, so its horizontal and vertical intercepts are the same point. The line is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="A vertical line to the left of the vertical axis";
    return mcq("Which described line has exactly one intercept, on the horizontal axis only?",
    key,["A horizontal line below the horizontal axis","A slanted line that does not pass through the origin","The vertical axis itself, taken as a line"],
    "A vertical line away from the vertical axis crosses the horizontal axis once and never reaches the vertical axis, so it has exactly one intercept, on the horizontal axis. The line is: <b>"+key+"</b>.",
    {keyText:key});}
]));

/* ================= 20. match a rate and intercept (4.30, L2, gen) ================= */
E("u4-match-slope-intercept",4,["4.30"],1,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-10,11);
  while(b===m||b===0)b=ri(-10,11);
  var mode=ri(1,2);
  if(mode===1){
    var key="\\(y = "+u4lin(m,b)+"\\)";
    var ds=u4pickS3(key,["\\(y = "+u4lin(-m,b)+"\\)","\\(y = "+u4lin(m,-b)+"\\)","\\(y = "+u4lin(b,m)+"\\)","\\(y = "+u4lin(m,b+2)+"\\)"]);
    return mcq("A linear relation has a rate of change of \\("+m+"\\) and a vertical intercept of \\("+b+"\\). Which equation represents this relation?",
      key,ds,
      "The rate of change is the coefficient of the input and the vertical intercept is the constant term: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\end{aligned} \\] The equation is <b>\\(y = "+u4lin(m,b)+"\\)</b>.",
      {mode:mode,m:m,b:b,keyStr:key});
  }
  function graphDesc(mm,bb){return "A line that "+(mm>0?"rises":"falls")+" as it moves right, crossing the vertical axis at \\("+bb+"\\)";}
  var key2=graphDesc(m,b);
  var ds2=u4pickS3(key2,[graphDesc(-m,b),graphDesc(m,-b),graphDesc(m,b+3)]);
  return mcq("A linear relation has a rate of change of \\("+m+"\\) and a vertical intercept of \\("+b+"\\). Which description matches its graph?",
    key2,ds2,
    "A "+(m>0?"positive":"negative")+" rate of change means the line "+(m>0?"rises":"falls")+" to the right, and the vertical intercept says where it crosses the vertical axis, at \\("+b+"\\). The matching description is: <b>"+key2+"</b>.",
    {mode:mode,m:m,b:b,keyStr:key2});
});

/* ================= 21. read a rate and intercept from points (4.31, L2, gen) ================= */
E("u4-read-graph",4,["4.31"],2,"gen",function(){
  var m=pick([-3,-2,-1,-0.5,0.5,1,2,3]),b=ri(-6,7);
  var x1=pick([1,2,3]),x2=x1+pick([2,3,4]);
  var y1=m*x1+b,y2=m*x2+b;
  function optStr(mm,bb){return "Rate of change \\("+u4num(mm)+"\\), vertical intercept \\("+bb+"\\)";}
  var key=optStr(m,b);
  var inv=(m!==0)?(Math.round((1/m)*2)/2):2; if(inv===m)inv=m+1;
  var ds=u4pickS3(key,[optStr(inv,b),optStr(m,-b),optStr(-m,b),optStr(m,b+2)]);
  return mcq("A line passes through the points \\("+u4pairS(x1,y1)+"\\) and \\("+u4pairS(x2,y2)+"\\). Which choice gives the rate of change and the vertical intercept of this line?",
    key,ds,
    "Divide the change in the second coordinates by the change in the first coordinates, then substitute one point to find the intercept: \\[ \\begin{aligned} \\text{rate} &= "+FR(u4num(y2-y1),u4num(x2-x1))+" = "+u4num(m)+" \\\\ b &= "+u4num(y1)+" - ("+u4num(m)+")("+x1+") = "+b+" \\end{aligned} \\] The rate of change is <b>\\("+u4num(m)+"\\)</b> and the vertical intercept is <b>\\("+b+"\\)</b>.",
    {x1:x1,y1:y1,x2:x2,y2:y2,m:m,b:b,keyStr:key});
});

/* ================= 22. contextual linear problem (4.32, L3, gen, CR 3) ================= */
E("u4-context-problem",4,["4.32"],3,"gen",function(){
  var profs=[
    {name:"A community hall rental",item:"rental",startLabel:"booking fee",startUnit:"dollars",rateLabel:"per hour",rateUnit:"dollars per hour",xlab:"hours of rental",ylab:"total cost in dollars"},
    {name:"A water tank on a farm",item:"tank",startLabel:"starting volume",startUnit:"litres",rateLabel:"per minute of draining",rateUnit:"litres per minute",xlab:"minutes of draining",ylab:"volume left in litres",drain:true},
    {name:"A savings jar",item:"jar",startLabel:"starting amount",startUnit:"dollars",rateLabel:"per week",rateUnit:"dollars per week",xlab:"weeks",ylab:"total saved in dollars"},
    {name:"A delivery cargo bike",item:"bike",startLabel:"starting charge",startUnit:"dollars",rateLabel:"per kilometre",rateUnit:"dollars per kilometre",xlab:"kilometres travelled",ylab:"total charge in dollars"}
  ];
  var prof=pick(profs);
  var start=prof.drain?ri(40,90):ri(5,30);
  var rate=prof.drain?pick([2,3,4,5]):pick([3,4,5,6,8,10]);
  var mode=ri(1,3);
  var promptBase=prof.name+" is modelled by a linear relation between "+prof.xlab+" (the input) and "+prof.ylab+" (the output). The relation starts at "+start+" "+prof.startUnit+" when the input is zero, and the output "+(prof.drain?"decreases":"increases")+" at "+rate+" "+prof.rateUnit+".";
  if(mode===1){
    var key="The value "+start+" is the starting amount: it is the output of the relation when the input value is exactly zero";
    var d1="The value "+start+" is the starting amount: it is the input of the relation when the output value is exactly zero";
    var d2="The value "+start+" is the largest amount: it is the greatest output the relation can reach at any input value used";
    var d3="The value "+start+" is the final amount: it is the output of the relation when the input reaches its largest value";
    var ds=u4pickS3(key,[d1,d2,d3]);
    return mcq(promptBase+" In this model, what does the vertical intercept represent?",
      key,ds,
      "The vertical intercept is the output when the input is zero. Here that output is \\("+start+"\\), the amount present before any "+prof.xlab+" have passed. The vertical intercept represents <b>the starting amount, the output when the input is exactly zero</b>.",
      {mode:mode,profName:prof.name,start:start,rate:rate,keyText:key,stmt:true});
  }
  if(mode===2){
    var key2="Each unit increase in the input changes the output by "+rate+" "+prof.rateUnit+", in the "+(prof.drain?"downward":"upward")+" direction each time";
    var d12="Each unit increase in the output changes the input by "+rate+" "+prof.rateUnit+", in the "+(prof.drain?"downward":"upward")+" direction each time";
    var d22="Each unit increase in the input sets the output to "+rate+" "+prof.rateUnit+", no matter what the input value is each time";
    var d32="Each unit increase in the input changes the output by "+rate+" "+prof.rateUnit+", in the "+(prof.drain?"upward":"downward")+" direction each time";
    var ds2=u4pickS3(key2,[d12,d22,d32]);
    return mcq(promptBase+" In this model, what does the rate of change represent?",
      key2,ds2,
      "The rate of change is the change in output for each one unit increase in input. Here the output "+(prof.drain?"falls":"rises")+" by \\("+rate+"\\) for each unit, while the starting value \\("+start+"\\) is the intercept, not the rate. The rate of change represents <b>a change of "+rate+" "+prof.rateUnit+" per unit of input</b>.",
      {mode:mode,profName:prof.name,start:start,rate:rate,keyText:key2,stmt:true});
  }
  var maxIn=prof.drain?Math.floor(start/rate):ri(6,12);
  var maxOut=prof.drain?0:start+rate*maxIn;
  var loOut=prof.drain?0:start, hiOut=prof.drain?start:maxOut;
  function domStr(a,b,whole){return "Domain: "+(whole?"whole numbers":"values")+" from "+a+" to "+b+"; range: values from "+loOut+" to "+hiOut;}
  var whole=prof.drain?false:(prof.item==="bike"?false:true);
  var key3=domStr(0,maxIn,whole);
  var ds3=u4pickS3(key3,[domStr(0,maxIn+5,whole),domStr(start,maxIn,whole),"Domain: "+(whole?"values":"whole numbers")+" from 0 to "+maxIn+"; range: values from "+loOut+" to "+hiOut]);
  return mcq(promptBase+" The model is used only for inputs from zero up to "+maxIn+". Which choice gives a sensible domain and range for the model in this use?",
    key3,ds3,
    "The input starts at zero and is used only up to \\("+maxIn+"\\), and the output then runs from \\("+loOut+"\\) to \\("+hiOut+"\\): \\[ \\begin{aligned} \\text{Domain} &: 0 \\text{ to } "+maxIn+" \\\\ \\text{Range} &: "+loOut+" \\text{ to } "+hiOut+" \\end{aligned} \\] The sensible choice is: <b>"+key3+"</b>.",
    {mode:mode,profName:prof.name,start:start,rate:rate,maxIn:maxIn,loOut:loOut,hiOut:hiOut,keyText:key3});
});

/* ================= 23. match representations of a line (4.37, L2, gen) ================= */
E("u4-match-representations",4,["4.37"],2,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-8,9);
  while(b===0)b=ri(-8,9);
  var mode=ri(1,2);
  var xs=[0,1,2];
  function tableStr(mm,bb){return "\\("+u4pairsS(xs.map(function(x){return [x,mm*x+bb];}))+"\\)";}
  if(mode===1){
    var key=tableStr(m,b);
    var ds=u4pickS3(key,[tableStr(-m,b),tableStr(m,-b),tableStr(m+1,b),tableStr(m,b+2)]);
    return mcq("A linear relation is given by the equation \\(y = "+u4lin(m,b)+"\\). Which set of ordered pairs is a table of values for the same relation?",
      key,ds,
      "Evaluate the equation at each input: \\[ \\begin{aligned} "+xs.map(function(x){return "x = "+x+" &\\Rightarrow y = "+(m*x+b);}).join(" \\\\ ")+" \\end{aligned} \\] The matching table is <b>"+key+"</b>.",
      {mode:mode,m:m,b:b,xs:xs,keyStr:key});
  }
  function graphDesc(mm,bb){return "A line that "+(mm>0?"rises":"falls")+" as it moves right, crossing the vertical axis at \\("+bb+"\\)";}
  var key2=graphDesc(m,b);
  var ds2=u4pickS3(key2,[graphDesc(-m,b),graphDesc(m,-b),graphDesc(-m,-b)]);
  return mcq("A linear relation is given by the equation \\(y = "+u4lin(m,b)+"\\). Which description matches the graph of the same relation?",
    key2,ds2,
    "The coefficient \\("+m+"\\) is "+(m>0?"positive, so the line rises":"negative, so the line falls")+", and the constant \\("+b+"\\) is the vertical intercept. The matching description is: <b>"+key2+"</b>.",
    {mode:mode,m:m,b:b,keyStr:key2});
});

/* ================= 24. write function notation (4.45, L1, gen) ================= */
E("u4-fn-notation",4,["4.45"],1,"gen",function(){
  var m=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),b=ri(-15,16);
  var key="\\(f(x) = "+u4lin(m,b)+"\\)";
  var ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(m,-b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(b===0?m+1:b,m)+"\\)"]);
  if(b===0)ds=u4pickS3(key,["\\(f(y) = "+u4lin(m,b)+"\\)","\\(f(x) = "+u4lin(-m,b)+"\\)","\\(f(x) = "+u4lin(m+1,b)+"\\)"]);
  return mcq("Rewrite the equation \\(y = "+u4lin(m,b)+"\\) using function notation.",
    key,ds,
    "Function notation names the output \\(f(x)\\) in place of \\(y\\), and the rule on the right side stays unchanged: \\[ \\begin{aligned} y &= "+u4lin(m,b)+" \\\\ f(x) &= "+u4lin(m,b)+" \\end{aligned} \\] In function notation, the equation is <b>\\(f(x) = "+u4lin(m,b)+"\\)</b>.",
    {m:m,b:b,keyStr:key});
});

/* ================= 25. convert from function notation (4.46, L1, gen) ================= */
E("u4-fn-convert",4,["4.46"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4]),b=ri(-8,9);
  var key="\\(y = "+u4lin(m,b)+"\\)";
  var ds=u4pickS3(key,["\\(x = "+u4lin(m,b)+"\\)","\\(y = "+u4lin(m,-b)+"\\)","\\(y = "+u4lin(-m,b)+"\\)","\\(y = "+u4lin(m,b+2)+"\\)"]);
  if(b===0)ds=u4pickS3(key,["\\(x = "+u4lin(m,b)+"\\)","\\(y = "+u4lin(-m,b)+"\\)","\\(y = "+u4lin(m+1,b)+"\\)"]);
  return mcq("Rewrite the function \\("+fn+"(x) = "+u4lin(m,b)+"\\) as a linear equation in two variables.",
    key,ds,
    "The value \\("+fn+"(x)\\) is the output, which is written as \\(y\\) in a two variable equation, and the rule stays unchanged: \\[ \\begin{aligned} "+fn+"(x) &= "+u4lin(m,b)+" \\\\ y &= "+u4lin(m,b)+" \\end{aligned} \\] As a two variable equation, it is <b>\\(y = "+u4lin(m,b)+"\\)</b>.",
    {fn:fn,m:m,b:b,keyStr:key});
});

/* ================= 26. evaluate a linear function (4.47, L2, gen, num, CR 2) ================= */
E("u4-eval-function",4,["4.47"],1,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),x0=ri(-5,8);
  var ans=m*x0+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). What is the value of \\("+fn+"("+x0+")\\)?",
    ans,0.011,
    "Substitute the given domain value into the function and simplify: \\[ \\begin{aligned} "+fn+"("+x0+") &= "+u4num(m)+"("+x0+") + ("+b+") \\\\ &= "+u4num(m*x0)+" + ("+b+") \\\\ &= "+ans+" \\end{aligned} \\] The value is <b>\\("+ans+"\\)</b>.",
    {fn:fn,m:m,b:b,x0:x0,ans:ans});
});

/* ================= 27. find the input for a given output (4.48, L2, gen, num, CR 2) ================= */
E("u4-solve-input",4,["4.48"],2,"gen",function(){
  var fn=pick(["f","g","h"]);
  var m=pick([-4,-3,-2,-1,1,2,3,4,5]),b=ri(-9,10),xAns=ri(-6,9);
  var target=m*xAns+b;
  return numq("A linear function is given by \\("+fn+"(x) = "+u4lin(m,b)+"\\). For what domain value is \\("+fn+"(x) = "+target+"\\)?",
    xAns,0.011,
    "Set the function equal to the given range value and solve for the input: \\[ \\begin{aligned} "+u4lin(m,b)+" &= "+target+" \\\\ "+u4num(m)+"x &= "+(target-b)+" \\\\ x &= "+xAns+" \\end{aligned} \\] The domain value is <b>\\("+xAns+"\\)</b>.",
    {fn:fn,m:m,b:b,target:target,ans:xAns});
});

/* ================= 28. describe the graph of a function (4.49, L2, var) ================= */
E("u4-sketch-fn",4,["4.49"],1,"var",varset([
  function(){var key="The graph rises to the right and crosses the vertical axis at 3";
    return mcq("A linear function is given by \\(f(x) = 2x + 3\\). Which description matches the graph of this function?",
    key,["The graph falls to the right and crosses the vertical axis at 3","The graph rises to the right and crosses the vertical axis at -3","The graph falls to the right and crosses the vertical axis at -3"],
    "The coefficient of \\(x\\) is \\(2\\), a positive rate of change, so the graph rises to the right. The constant \\(3\\) is the vertical intercept. The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph falls to the right and crosses the vertical axis at -4";
    return mcq("A linear function is given by \\(f(x) = -3x - 4\\). Which description matches the graph of this function?",
    key,["The graph rises to the right and crosses the vertical axis at -4","The graph falls to the right and crosses the vertical axis at 4","The graph rises to the right and crosses the vertical axis at 4"],
    "The coefficient of \\(x\\) is \\(-3\\), a negative rate of change, so the graph falls to the right. The constant \\(-4\\) is the vertical intercept. The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph falls to the right and crosses the vertical axis at 5";
    return mcq("A linear function is given by \\(g(x) = -x + 5\\). Which description matches the graph of this function?",
    key,["The graph rises to the right and crosses the vertical axis at 5","The graph falls to the right and crosses the vertical axis at -5","The graph rises to the right and crosses the vertical axis at -5"],
    "The coefficient of \\(x\\) is \\(-1\\), a negative rate of change, so the graph falls to the right. The constant \\(5\\) is the vertical intercept. The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph rises to the right and crosses the vertical axis at -2";
    return mcq("A linear function is given by \\(h(x) = 4x - 2\\). Which description matches the graph of this function?",
    key,["The graph falls to the right and crosses the vertical axis at -2","The graph rises to the right and crosses the vertical axis at 2","The graph falls to the right and crosses the vertical axis at 2"],
    "The coefficient of \\(x\\) is \\(4\\), a positive rate of change, so the graph rises to the right. The constant \\(-2\\) is the vertical intercept. The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph is a horizontal line crossing the vertical axis at 6";
    return mcq("A linear function is given by \\(f(x) = 6\\). Which description matches the graph of this function?",
    key,["The graph is a horizontal line crossing the vertical axis at -6","The graph rises to the right and crosses the vertical axis at 6","The graph falls to the right and crosses the vertical axis at 6"],
    "There is no \\(x\\) term, so the rate of change is zero and the output is always \\(6\\): the graph is horizontal, crossing the vertical axis at \\(6\\). The matching description is: <b>"+key+"</b>.",
    {keyText:key});},
  function(){var key="The graph rises to the right and passes through the origin";
    return mcq("A linear function is given by \\(g(x) = 5x\\). Which description matches the graph of this function?",
    key,["The graph falls to the right and passes through the origin","The graph rises to the right and crosses the vertical axis at 5","The graph falls to the right and crosses the vertical axis at 5"],
    "The coefficient of \\(x\\) is \\(5\\), a positive rate of change, so the graph rises to the right, and there is no constant term, so the vertical intercept is zero: the graph passes through the origin. The matching description is: <b>"+key+"</b>.",
    {keyText:key});}
]));

/* ================= 29. error analysis on a function claim (4.5, 4.8, L3, var) ================= */
E("u4-function-error",4,["4.5","4.8"],3,"var",varset([
  function(){var key="The student used the outputs; a repeated output is allowed, and the error is that the input 3 has two outputs, 4 and 7";
    return mcq("A student looks at the relation \\(\\{(3, 4), (5, 4), (3, 7)\\}\\) and says it is a function because the output \\(4\\) repeats in a tidy pattern. Which statement identifies the error and gives the correction?",
    key,
    ["The student used the inputs; a repeated input is allowed, and the error is that the output 4 has two inputs, 3 and 5 in it",
     "The student used the outputs; a repeated output is not allowed, and the error is that the output 4 appears twice in the set",
     "There is no error in the claim; a repeated output is allowed, and the relation is a function as the student says it is"],
    "Check the inputs first: the input \\(3\\) is paired with both \\(4\\) and \\(7\\), two different outputs, so the relation is not a function. A repeated output, such as \\(4\\) for inputs \\(3\\) and \\(5\\), is allowed. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student trusted the straight shape; a vertical line fails the vertical line test, so the graph is not a function";
    return mcq("A student graphs a vertical line and says it represents a function because the graph is a straight line. Which statement identifies the error and gives the correction?",
    key,
    ["The student trusted the straight shape; a vertical line passes the vertical line test, so the graph is not a function",
     "The student trusted the curved shape; a vertical line fails the horizontal line test, so the graph is not a function",
     "There is no error in the claim; a vertical line fails the vertical line test, so the graph is a function as claimed"],
    "Straightness is not the test for a function. A vertical line itself is a vertical line that meets the graph at many points, all sharing one input with many outputs. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student reversed the rule; outputs may repeat freely, and this table is a function since no input value repeats at all";
    return mcq("A table has inputs \\(1, 2, 3\\) with outputs \\(6, 6, 9\\). A student says the relation is not a function because the output \\(6\\) repeats. Which statement identifies the error and gives the correction?",
    key,
    ["The student reversed the rule; inputs may repeat freely, and this table is a function since no output value repeats at all",
     "The student reversed the rule; outputs may repeat freely, and this table is not a function since one input value repeats here",
     "There is no error in the claim; outputs may repeat freely, and this table is not a function as the student says it is here"],
    "The function rule limits inputs: each input needs exactly one output. It places no limit on outputs, so the repeated output \\(6\\) is fine, and since no input repeats, the table is a function. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student checked the outputs only; the correction is to check inputs, and here input 8 is paired with both 1 and 12";
    return mcq("A student checks the relation \\(\\{(8, 1), (2, 5), (8, 12)\\}\\), sees that all the outputs are different, and says it must be a function. Which statement identifies the error and gives the correction?",
    key,
    ["The student checked the inputs only; the correction is to check outputs, and output 1 is paired with both 8 and 12",
     "The student checked the outputs only; the correction is to check inputs, and here all of the inputs are different in the set",
     "There is no error in the claim; the correction is to check inputs, and here input 8 is paired with both 1 and 12 as said"],
    "Different outputs do not settle the question; inputs decide it. The input \\(8\\) appears with both \\(1\\) and \\(12\\), so the relation is not a function. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});},
  function(){var key="The student applied the wrong line test; a graph is checked with vertical lines, and this circle fails that test clearly";
    return mcq("A student draws a circle, checks it with a horizontal line, finds the line meets it twice, and says that alone proves it is not a function, with the right conclusion but the wrong test. Which statement identifies the error and gives the correction?",
    key,
    ["The student applied the wrong line test; a graph is checked with horizontal lines, and this circle passes that test clearly",
     "The student applied the right line test; a graph is checked with vertical lines, and this circle fails that test clearly",
     "There is no error in the work at all; a graph is checked with vertical lines, and this circle fails that test clearly too"],
    "The conclusion is right but the test is wrong: the vertical line test is the graph form of the function rule, since points on one vertical line share an input. A horizontal line meeting a graph twice only shows a repeated output, which is allowed. The correct statement is: <b>"+key+"</b>.",
    {stmt:true,keyText:key});}
]));

/* ================= 30. sensible domain or range decision (4.10, 4.12, L3, gen, CR 2) ================= */
E("u4-domain-decision",4,["4.10","4.12"],3,"gen",function(){
  var profs=[
    {name:"A theatre sells tickets for one show",thing:"tickets sold",unit:"tickets",discrete:true,capMin:80,capMax:240,outUnit:"dollars",outPer:12,outBase:0},
    {name:"A bakery sells muffins from one batch",thing:"muffins sold",unit:"muffins",discrete:true,capMin:24,capMax:96,outUnit:"dollars",outPer:3,outBase:0},
    {name:"A pool is filled from empty with a hose",thing:"time spent filling",unit:"minutes",discrete:false,capMin:30,capMax:120,outUnit:"litres",outPer:14,outBase:0},
    {name:"A hiker walks a coastal trail from the trailhead",thing:"time spent walking",unit:"hours",discrete:false,capMin:2,capMax:6,outUnit:"kilometres",outPer:4,outBase:0},
    {name:"A school rents chairs for an assembly",thing:"chairs rented",unit:"chairs",discrete:true,capMin:50,capMax:180,outUnit:"dollars",outPer:2,outBase:25},
    {name:"A kettle heats water from cold",thing:"time spent heating",unit:"minutes",discrete:false,capMin:3,capMax:9,outUnit:"degrees",outPer:11,outBase:8}
  ];
  var prof=pick(profs);
  var cap=ri(prof.capMin,prof.capMax);
  var askRange=prof.discrete?false:(Math.random()<0.5);
  var outMax=prof.outBase+prof.outPer*cap;
  var word=prof.discrete?"whole numbers":"all real values";
  var otherWord=prof.discrete?"all real values":"whole numbers";
  function domStr(w,hi){return "The "+(askRange?"range":"domain")+" is the "+w+" from "+(askRange?prof.outBase:0)+" to "+(askRange?outMax:cap);}
  var key=domStr(word,0);
  var twin="The "+(askRange?"range":"domain")+" is the "+word+" from "+(askRange?(prof.outBase+1):1)+" to "+(askRange?outMax:cap);
  var ds=u4pickS3(key,[domStr(otherWord,0),"The "+(askRange?"range":"domain")+" is the "+word+" from "+(askRange?prof.outBase:0)+" to "+((askRange?outMax:cap)+10),twin]);
  var prompt=prof.name+". The relation pairs "+prof.thing+" with the total in "+prof.outUnit+". "+prof.thing.charAt(0).toUpperCase()+prof.thing.slice(1)+" can run from 0 up to "+cap+" "+prof.unit+", and the total in "+prof.outUnit+" runs from "+prof.outBase+" to "+outMax+". Which statement gives the sensible "+(askRange?"range":"domain")+" for this relation?";
  return mcq(prompt,key,ds,
    "Decide two things: the values "+(prof.discrete?"are whole numbers, since the quantity is counted in whole units":"vary continuously, since the quantity can take any value in between")+", and the span runs from the starting value to the stated limit: \\[ \\begin{aligned} \\text{"+(askRange?"Range":"Domain")+"} &: "+(askRange?prof.outBase:0)+" \\text{ to } "+(askRange?outMax:cap)+" \\end{aligned} \\] The sensible "+(askRange?"range":"domain")+" is <b>"+key+"</b>.",
    {profName:prof.name,discrete:prof.discrete,cap:cap,outBase:prof.outBase,outMax:outMax,asked:askRange?"range":"domain",keyText:key,stmt:true});
});

/* ---- Prior knowledge tranche entries (Nov 15, 2026) ----
   Borrowed verbatim from the feeder banks named in each entry's
   pkSrc (see the metadata pass at the end of this file), under the
   Math 1201 PK tranche spec. */
E("u4-pk-pattern-figure", 4, ["4.4"], 2, "gen", function () {
  var item = pick(["tiles", "dots", "blocks", "counters"]);
  var m = ri(2, 6), b = ri(1, 8), att = 0;
  while (m === b && att < 40) { m = ri(2, 6); b = ri(1, 8); att++; }
  if (m === b) { m = 3; b = 2; }
  var counts = [b + m, b + 2 * m, b + 3 * m];
  var corr = "\\(" + u6lin(m, b, "n") + "\\)";
  var ds = [
    { t: "\\(" + u6lin(b, m, "n") + "\\)", fb: "That swaps the start value and the step. The count grows by " + fmt(m) + " each stage, so " + fmt(m) + " multiplies n." },
    { t: "\\(" + u6lin(m, -b, "n") + "\\)", fb: "That subtracts the start value. The start value is added, because Stage 1 is already more than one step." },
    { t: "\\(" + fmt(m + b) + "n\\)", fb: "That folds the start value into the step. The start value is added once, not once per stage." }
  ];
  var sol = "The counts grow by the same amount each stage: \\[ \\begin{aligned} \\text{step} &= " + counts[1] + " - " + counts[0] + " = " + fmt(m) + " \\\\ \\text{start} &= " + counts[0] + " - " + fmt(m) + " = " + fmt(b) + " \\end{aligned} \\] So the number of " + item + " at Stage \\(n\\) is <b>" + corr + "</b>.";
  var q = mcq("The diagram shows the first three stages of a pattern made with " + item + ". Which expression gives the number of " + item + " at Stage \\(n\\)?",
    { t: corr, fb: "Correct. The start value is " + fmt(b) + " and each new stage adds " + fmt(m) + "." }, ds, sol,
    { mode: "pattern-figure-expr", m: m, b: b, item: item });
  q.figure = u6stageFig(counts, item);
  return q;
}, ["Find how much the count grows from one stage to the next; that growth is the step.", "Work backwards from Stage 1 by subtracting one step to get the start value."]);
E("u4-pk-pattern-word", 4, ["4.4"], 1, "gen", function () {
  var S = ri(4, 48), r = ri(2, 9), N = ri(11, 30);
  var ctx = pick([
    "A savings jar starts with $" + S + ". Each week, $" + r + " is added to the jar. How much money, in dollars, is in the jar after " + N + " weeks?",
    "A tomato plant is " + S + " cm tall. It grows " + r + " cm each week. How tall, in centimetres, is the plant after " + N + " weeks?",
    "A reader has finished " + S + " pages of a novel. She reads " + r + " more pages each day. How many pages has she finished after " + N + " days?",
    "A water tank holds " + S + " litres. A hose adds " + r + " litres each hour. How many litres are in the tank after " + N + " hours?"
  ]);
  var ans = S + r * N;
  var sol = "Start with the opening amount, then add the step once for each stage: \\[ \\begin{aligned} \\text{total} &= " + S + " + " + fmt(r) + " \\times " + N + " \\\\ &= " + S + " + " + fmt(r * N) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the total after " + N + " stages is <b>" + fmt(ans) + "</b>.";
  return numq(ctx, ans, 0.01, sol, { mode: "pattern-word-total", S: S, r: r, N: N });
}, ["The total is the start amount plus the step, added once for each stage.", "First multiply the step by the number of stages."]);
E("u4-pk-table-equation", 4, ["4.4"], 2, "gen", function () {
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
E("u4-pk-point-on-graph", 4, ["4.9"], 1, "gen", function () {
  var kind = pick(["slope", "slope", "horiz", "vert"]);
  function pt(x, y) { return "(" + fmt(x) + ", " + fmt(y) + ")"; }
  if (kind === "slope") {
    for (var att = 0; att < 300; att++) {
      var b = ri(1, 5), m = ri(1, 3);
      var xmax = 6, ymax = b + m * xmax;
      var x0 = ri(2, 5), y0 = b + m * x0;
      var corr = pt(x0, y0);
      var raw = [[x0, y0 + 1], [x0, y0 - 1], [x0 + 1, y0], [x0 - 1, y0], [0, m], [y0, x0]];
      var cands = [];
      raw.forEach(function (c) {
        if (c[0] < 0 || c[1] < 0) return;
        if (b + m * c[0] === c[1]) return;
        cands.push({ t: pt(c[0], c[1]), fb: "That point is not on the line. At x = " + fmt(c[0]) + ", the line has y = " + fmt(b + m * c[0]) + "." });
      });
      var ds = u6pick3(corr, cands);
      if (!ds) continue;
      var sol = "Points on the line follow its pattern, starting at " + fmt(b) + " and rising by " + fmt(m) + " per step: \\[ \\begin{aligned} y(" + x0 + ") &= " + b + " + " + fmt(m) + "(" + x0 + ") \\\\ &= " + fmt(y0) + " \\end{aligned} \\] So a point on the graph is <b>" + corr + "</b>.";
      var q = mcq("Which point lies on the graph shown?", { t: corr, fb: "Correct. That point sits exactly on the line." }, ds, sol, { mode: "point-slope", b: b, m: m, x0: x0 });
      q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: "x", ylab: "y", lines: [{ pts: [[0, b], [xmax, ymax]] }] });
      return q;
    }
  } else if (kind === "horiz") {
    var c = ri(2, 9), x0 = ri(1, 5);
    var corrH = pt(x0, c);
    var rawH = [[x0, c + 1], [x0, c + 2], [x0 + 1, c - 1], [c, x0], [x0 + 2, c + 3]];
    var candsH = [];
    rawH.forEach(function (cc) {
      if (cc[1] === c || cc[1] < 0) return;
      candsH.push({ t: pt(cc[0], cc[1]), fb: "Every point on this line has y = " + fmt(c) + ", and that point has y = " + fmt(cc[1]) + "." });
    });
    var dsH = u6pick3(corrH, candsH);
    if (dsH) {
      var solH = "The graph is a horizontal line: \\[ \\begin{aligned} y &= " + fmt(c) + " \\end{aligned} \\] Every point on it has \\(y = " + fmt(c) + "\\), whatever its \\(x\\) value is. So a point on the graph is <b>" + corrH + "</b>.";
      var qH = mcq("Which point lies on the graph shown?", { t: corrH, fb: "Correct. Its y value is " + fmt(c) + ", like every point on the line." }, dsH, solH, { mode: "point-horiz", c: c, x0: x0 });
      qH.figure = u6graph({ xmax: 6, ymax: 12, xlab: "x", ylab: "y", lines: [{ pts: [[0, c], [6, c]] }] });
      return qH;
    }
  } else {
    var cv = ri(2, 5), y0v = ri(1, 10);
    var corrV = pt(cv, y0v);
    var rawV = [[cv + 1, y0v], [cv - 1, y0v], [y0v, cv], [cv + 2, y0v + 1]];
    var candsV = [];
    rawV.forEach(function (cc) {
      if (cc[0] === cv) return;
      candsV.push({ t: pt(cc[0], cc[1]), fb: "Every point on this line has x = " + fmt(cv) + ", and that point has x = " + fmt(cc[0]) + "." });
    });
    var dsV = u6pick3(corrV, candsV);
    if (dsV) {
      var solV = "The graph is a vertical line: \\[ \\begin{aligned} x &= " + fmt(cv) + " \\end{aligned} \\] Every point on it has \\(x = " + fmt(cv) + "\\), whatever its \\(y\\) value is. So a point on the graph is <b>" + corrV + "</b>.";
      var qV = mcq("Which point lies on the graph shown?", { t: corrV, fb: "Correct. Its x value is " + fmt(cv) + ", like every point on the line." }, dsV, solV, { mode: "point-vert", c: cv, y0: y0v });
      qV.figure = u6graph({ xmax: 6, ymax: 12, xlab: "x", ylab: "y", lines: [{ pts: [[cv, 0], [cv, 12]] }] });
      return qV;
    }
  }
  var qf = mcq("Which point lies on the graph shown?", { t: "(3, 7)", fb: "Correct. That point sits exactly on the line." },
    [
      { t: "(3, 6)", fb: "At x = 3, the line has y = 7." },
      { t: "(3, 8)", fb: "At x = 3, the line has y = 7." },
      { t: "(4, 7)", fb: "At x = 4, the line has y = 9." }
    ],
    "The line starts at 1 and rises by 2 per step, so at x = 3, y = 7. A point on the graph is <b>(3, 7)</b>.",
    { mode: "point-slope", b: 1, m: 2, x0: 3 });
  qf.figure = u6graph({ xmax: 6, ymax: 13, xlab: "x", ylab: "y", lines: [{ pts: [[0, 1], [6, 13]] }] });
  return qf;
}, ["For a sloped line, use its start and step to find the y value for a given x. For a flat or upright line, check which coordinate stays the same.", "First decide what kind of line it is: sloped, horizontal or vertical."]);
E("u4-pk-graph-describe", 4, ["4.1"], 2, "gen", function () {
  var ctxs = [
    { x: "hours", y: "km", xl: "hours", yl: "km" },
    { x: "minutes", y: "litres", xl: "minutes", yl: "L" },
    { x: "items", y: "dollars", xl: "items", yl: "$" },
    { x: "weeks", y: "centimetres", xl: "weeks", yl: "cm" }
  ];
  for (var att = 0; att < 300; att++) {
    var b = ri(1, 6), m = ri(1, 3), ctx = pick(ctxs);
    var corr = "It starts at " + fmt(b) + " and increases by " + fmt(m) + " each step.";
    var cands = [
      { t: "It starts at " + fmt(m) + " and increases by " + fmt(b) + " each step.", fb: "That swaps the start and the step. The line crosses the y-axis at " + fmt(b) + "." },
      { t: "It starts at " + fmt(b) + " and increases by " + fmt(m + 1) + " each step.", fb: "The start is right, but check the rise between two neighbouring points: it is " + fmt(m) + ", not " + fmt(m + 1) + "." },
      { t: "It starts at " + fmt(b + 1) + " and increases by " + fmt(m) + " each step.", fb: "The step is right, but the line crosses the y-axis at " + fmt(b) + ", not " + fmt(b + 1) + "." },
      { t: "It starts at " + fmt(b) + " and decreases by " + fmt(m) + " each step.", fb: "The line rises as x grows, so the values increase; they do not decrease." },
      { t: "It starts at 0 and increases by " + fmt(m) + " each step.", fb: "The step is right, but the line crosses the y-axis at " + fmt(b) + ", not at 0." }
    ];
    var ds = u6pick3(corr, cands);
    if (!ds) continue;
    var xmax = 5, ymax = b + m * xmax;
    var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
    var sol = "Read the start where the line crosses the y-axis, then the rise between neighbouring points: \\[ \\begin{aligned} \\text{start} &= " + fmt(b) + " \\\\ \\text{step} &= " + fmt(b + m) + " - " + fmt(b) + " = " + fmt(m) + " \\end{aligned} \\] So the pattern is <b>" + corr + "</b>";
    var q = mcq("The graph shows a linear relation. The x-axis is measured in " + ctx.x + " and the y-axis in " + ctx.y + ". Which sentence describes the pattern in the graph?",
      { t: corr, fb: "Correct. The y-intercept is the start, and the rise per step is the step." }, ds, sol,
      { mode: "graph-describe", b: b, m: m, ctx: ctx.x });
    q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
    return q;
  }
  var qf = mcq("The graph shows a linear relation. The x-axis is measured in hours and the y-axis in km. Which sentence describes the pattern in the graph?",
    { t: "It starts at 2 and increases by 1 each step.", fb: "Correct. The y-intercept is the start, and the rise per step is the step." },
    [
      { t: "It starts at 1 and increases by 2 each step.", fb: "That swaps the start and the step." },
      { t: "It starts at 2 and increases by 2 each step.", fb: "The rise between neighbouring points is 1, not 2." },
      { t: "It starts at 2 and decreases by 1 each step.", fb: "The line rises, so the values increase." }
    ],
    "The line crosses the y-axis at 2 and rises by 1 per step, so the pattern is <b>It starts at 2 and increases by 1 each step.</b>",
    { mode: "graph-describe", b: 2, m: 1, ctx: "hours" });
  var ptsf = []; for (var k2 = 0; k2 <= 5; k2++) ptsf.push({ x: k2, y: 2 + k2 });
  qf.figure = u6graph({ xmax: 5, ymax: 7, xlab: "hours", ylab: "km", lines: [{ pts: ptsf.map(function (p) { return [p.x, p.y]; }) }], points: ptsf });
  return qf;
}, ["The start value is where the line crosses the y-axis.", "Pick two neighbouring plotted points and find how much y rises from one to the next."]);
E("u4-pk-interpolate", 4, ["4.9"], 1, "gen", function () {
  var ctxs = [
    { xl: "hours", yl: "km", prompt: "The graph shows the distance a bus has travelled since leaving the depot. The x-axis is time in hours and the y-axis is distance in kilometres.", ask: "How many kilometres has the bus travelled after XQ hours?" },
    { xl: "minutes", yl: "L", prompt: "The graph shows the water in a tank as it fills. The x-axis is time in minutes and the y-axis is volume in litres.", ask: "How many litres are in the tank after XQ minutes?" },
    { xl: "photos", yl: "$", prompt: "The graph shows the cost of printing photos. The x-axis is the number of photos and the y-axis is the cost in dollars.", ask: "What is the cost of printing XQ photos, in dollars?" },
    { xl: "hours", yl: "cm", prompt: "The graph shows the depth of snow during a storm. The x-axis is time in hours and the y-axis is the depth of snow in centimetres.", ask: "What is the depth of snow after XQ hours, in centimetres?" }
  ];
  var ctx = pick(ctxs);
  var b = ri(2, 10), m = ri(2, 5), xmax = 6, xq = ri(2, 5);
  var ymax = b + m * xmax, ans = b + m * xq;
  var pts = []; for (var k = 0; k <= xmax; k++) pts.push({ x: k, y: b + m * k });
  var sol = "Read across from \\(x = " + xq + "\\) to the line, then down to the y-axis. The pattern starts at " + fmt(b) + " and steps by " + fmt(m) + ": \\[ \\begin{aligned} y &= " + b + " + " + fmt(m) + "(" + xq + ") \\\\ &= " + b + " + " + fmt(m * xq) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the value at \\(x = " + xq + "\\) is <b>" + fmt(ans) + "</b>.";
  var q = numq(ctx.prompt + " " + ctx.ask.replace("XQ", xq), ans, 0.01, sol, { mode: "interpolate", b: b, m: m, xq: xq, ctx: ctx.xl + "/" + ctx.yl });
  q.figure = u6graph({ xmax: xmax, ymax: ymax, xlab: ctx.xl, ylab: ctx.yl, lines: [{ pts: pts.map(function (p) { return [p.x, p.y]; }) }], points: pts });
  return q;
}, ["Go across from the given x value to the line, then straight down to read the y value.", "You can also use the pattern: start value plus step times x."]);
E("u4-pk-evaluate-expression", 4, ["4.47"], 1, "gen", function(){
  var a=ri(2,8), b=ri(2,12), x=ri(2,9), sub=pick([true,false]);
  if(sub&&a*x<=b){ b=a*x-1; if(b<1)b=1; }
  var val=sub?a*x-b:a*x+b, v=pick(["x","n","t"]);
  var shown="\\("+u1Expr(a,sub?-b:b,v)+"\\)";
  var cand=[sub?a*x+b:a*x-b, a*x, a+x+(sub?-b:b), val+ a];
  var seen={},ds=[]; cand.forEach(function(z){ if(z!==val&&!seen[z]&&ds.length<3){seen[z]=1;ds.push(z);} });
  var g=1; while(ds.length<3){ var z=val+g*2; if(z!==val&&!seen[z]){seen[z]=1;ds.push(z);} g++; }
  var fbFor=function(z){ if(z===a*x)return "That multiplies but forgets the constant term."; if(z===(sub?a*x+b:a*x-b))return "That uses the wrong operation on the constant term."; return "That does not follow substituting "+x+" and then following the order of operations."; };
  return mcq("Evaluate "+shown+" when \\("+v+" = "+x+"\\).",
    {t:String(val), fb:"Correct: "+a+" times "+x+" is "+(a*x)+", then "+(sub?"subtract ":"add ")+b+"."},
    ds.map(function(z){return {t:String(z), fb:fbFor(z)};}),
    "\\[ \\begin{aligned} "+u1Expr(a,sub?-b:b,v)+" &= "+a+" \\times "+x+(sub?" - ":" + ")+b+" \\\\ &= "+val+" \\end{aligned} \\] The answer is <b>"+val+"</b>.",
    {a:a,b:b,x:x,sub:sub});
}, ["Substitute first, then follow the order of operations.", "Start by replacing the variable with the given value everywhere it appears."]);
E("u4-pk-solve-two-step", 4, ["4.48"], 2, "gen", function () {
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

/* PK tranche metadata pass for Unit 4. The tranche's own entries are flagged here.  */
var PKT_U4_FOR=["4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.9","4.10","4.11","4.12","4.13","4.14","4.15","4.16","4.21","4.45","4.46","4.47","4.48","4.49"];
var PKT_U4={
 "u4-pk-pattern-figure":{src:"math-9:7.1",group:"patterns"},
 "u4-pk-pattern-word":{src:"math-9:7.1",group:"patterns"},
 "u4-pk-table-equation":{src:"math-9:7.4",group:"tables-and-graphs"},
 "u4-pk-point-on-graph":{src:"math-9:7.7",group:"tables-and-graphs"},
 "u4-pk-graph-describe":{src:"math-9:7.5",group:"tables-and-graphs"},
 "u4-pk-interpolate":{src:"math-9:7.8",group:"interp-extrap"},
 "u4-pk-evaluate-expression":{src:"math-7:7.8",group:"substitution"},
 "u4-pk-solve-two-step":{src:"math-9:8.18",group:"linear-equations"}
};
BANK.forEach(function(e){var t=PKT_U4[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U4_FOR.slice();e.pkGroup=t.group;}});
