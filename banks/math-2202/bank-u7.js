// Math 2202 Unit 7 Slope and Scale question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 3649 to 4218).
// CRMARKS: u7-cr-slope-points=2
// CRMARKS: u7-cr-rise-find=2
// CRMARKS: u7-cr-scale-actual=2
// CRMARKS: u7-cr-rate-problem=3
// CRMARKS: u7-cr-model-scale=3
// CRMARKS: u7-cr-run-find=3
// CRMARKS: u7-cr-angle-slope=2
// CRMARKS: u7-cr-create-scale=3
/* ===== Unit 7 ===== */
/* Unit 7 Slope and Scale, Math 2202 Review. Helpers prefixed u7. */
function u7RampFig(rise, run, title){
  var sc = Math.min(170/Math.max(run,1), 100/Math.max(rise,1));
  var dx = Math.max(40, run*sc), dy = Math.max(18, rise*sc);
  var x0=35, y0=135;
  var s='<svg viewBox="0 0 280 165" width="280" height="165" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<text x="140" y="14" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+title+'</text>';
  s+='<polygon points="'+x0+','+y0+' '+(x0+dx)+','+y0+' '+(x0+dx)+','+fmt(y0-dy,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.5" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+(x0+dx)+'" y1="'+y0+'" x2="'+(x0+dx)+'" y2="'+fmt(y0-dy,1)+'" stroke="'+FIG_ALT+'" stroke-width="2" stroke-dasharray="4 3"/>';
  s+='<text x="'+fmt(x0+dx/2,1)+'" y="'+(y0+16)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">run = '+fmt(run)+' </text>';
  s+='<text x="'+(x0+dx+6)+'" y="'+fmt(y0-dy/2,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">rise = '+fmt(rise)+'</text>';
  s+='</svg>'; return s;
}
function u7GraphFig(x1,y1,x2,y2,xlab,ylab){
  var mx=Math.max(x1,x2,4), my=Math.max(y1,y2,4);
  var sx=200/mx, sy=110/my, ox=35, oy=140;
  function X(v){return fmt(ox+v*sx,1);} function Y(v){return fmt(oy-v*sy,1);}
  var s='<svg viewBox="0 0 280 170" width="280" height="170" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="255" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+ox+'" y2="15" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+X(x1)+'" y1="'+Y(y1)+'" x2="'+X(x2)+'" y2="'+Y(y2)+'" stroke="'+FIG_ACC+'" stroke-width="2.4"/>';
  s+='<circle cx="'+X(x1)+'" cy="'+Y(y1)+'" r="4" fill="'+FIG_INK+'"/><circle cx="'+X(x2)+'" cy="'+Y(y2)+'" r="4" fill="'+FIG_ALT+'"/>';
  s+='<text x="'+X(x1)+'" y="'+fmt(oy-y1*sy-10,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">('+fmt(x1)+', '+fmt(y1)+')</text>';
  s+='<text x="'+X(x2)+'" y="'+fmt(oy-y2*sy-10,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">('+fmt(x2)+', '+fmt(y2)+')</text>';
  s+='<text x="250" y="'+(oy+16)+'" font-size="11" fill="'+FIG_INK+'" text-anchor="end">'+xlab+'</text>';
  s+='<text x="10" y="22" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">'+ylab+'</text>';
  s+='</svg>'; return s;
}
function u7RoofFig(a,b,c,d){
  var s='<svg viewBox="0 0 300 150" width="300" height="150" xmlns="http://www.w3.org/2000/svg" role="img">';
  function roof(ox,rise,run,label){
    var sc=Math.min(90/run,55/rise); var dx=run*sc, dy=rise*sc; var base=115;
    var t='<polygon points="'+ox+','+base+' '+(ox+dx)+','+base+' '+(ox+dx)+','+fmt(base-dy,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.45" stroke="'+FIG_INK+'" stroke-width="2"/>';
    t+='<text x="'+fmt(ox+dx/2,1)+'" y="132" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">run '+fmt(run)+'</text>';
    t+='<text x="'+(ox+dx+5)+'" y="'+fmt(base-dy/2,1)+'" font-size="11" fill="'+FIG_INK+'">rise '+fmt(rise)+'</text>';
    t+='<text x="'+fmt(ox+dx/2,1)+'" y="18" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+label+'</text>'; return t;
  }
  s+=roof(20,a,b,'Roof A'); s+=roof(165,c,d,'Roof B'); s+='</svg>'; return s;
}
function u7ScaleFig(drawnW, drawnH, label){
  var w=Math.max(60,Math.min(190,drawnW*14)), h=Math.max(30,Math.min(90,drawnH*14));
  var x0=fmt(140-w/2,1), y0=fmt(85-h/2,1);
  var s='<svg viewBox="0 0 280 165" width="280" height="165" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<rect x="'+x0+'" y="'+y0+'" width="'+fmt(w,1)+'" height="'+fmt(h,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.5" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="140" y="'+fmt(85+h/2+20,1)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">drawing width = '+fmt(drawnW)+' cm</text>';
  s+='<text x="140" y="18" font-size="12" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+label+'</text>';
  s+='</svg>'; return s;
}
function u7Frac(n,d){ var g=1; for(var i=2;i<=Math.min(n,d);i++){ if(n%i===0&&d%i===0) g=i; } return (n/g)+"/"+(d/g); }

E("u7-slope-contexts", 7, ["4.1"], 1, "var", varset([
  function(){ return mcq("A wheelchair ramp climbs from the sidewalk to a doorway. Which quantity describes how steep the ramp is?",
    {t:"Its slope, the rise compared with the run", fb:"Correct: steepness is the ratio of vertical rise to horizontal run."},
    [{t:"Its total length along the ground only, end to end", fb:"Length alone says nothing about steepness: a long ramp can be gentle."},
     {t:"The colour of its surface material", fb:"Colour does not measure steepness."},
     {t:"The width of the doorway at its base", fb:"Door width is a separate measurement, not steepness."}],
    "Slope compares vertical change (rise) with horizontal change (run), so it describes steepness. The answer is <b>its slope, the rise compared with the run</b>.", {}); },
  function(){ return mcq("A highway sign warns truck drivers about a steep hill ahead on the road to a ferry terminal. The warning is mainly about which feature of the road?",
    {t:"Its grade, which is its slope as a percent", fb:"Correct: road grade is slope written as a percent."},
    [{t:"Its speed limit in winter weather", fb:"A speed limit is a rule, not the steepness feature the sign describes."},
     {t:"The number of lanes on the road", fb:"Lane count does not describe steepness."},
     {t:"The distance to the next town along the road", fb:"Distance is length along the road, not steepness."}],
    "Road grade is the slope of the road, usually written as a percent. The answer is <b>its grade, which is its slope as a percent</b>.", {}); },
  function(){ return mcq("Water flows through a drainage pipe. The flow rate in litres per minute is an example of slope used as what?",
    {t:"A rate of change", fb:"Correct: a rate of change compares how one quantity changes as another changes, just like slope."},
    [{t:"A roof pitch", fb:"Roof pitch is a slope, but a flow rate is a rate of change, not a pitch."},
     {t:"A scale drawing", fb:"A scale drawing shrinks or enlarges an object; it is not a flow rate."},
     {t:"A right angle", fb:"A right angle is a fixed 90 degree angle, not a rate."}],
    "Litres per minute compares change in volume with change in time, which is a rate of change. The answer is <b>a rate of change</b>.", {}); },
  function(){ return mcq("A ski hill advertises that one trail drops much faster over the same horizontal distance than another trail. Which idea is being compared?",
    {t:"The slopes of the two trails", fb:"Correct: dropping faster over the same run means a larger slope."},
    [{t:"The areas of the two trails", fb:"Area measures surface covered, not how fast a trail drops."},
     {t:"The lengths of the lift lines", fb:"Line length is a queue measure, not steepness."},
     {t:"The prices of the lift tickets", fb:"Price does not describe the shape of a trail."}],
    "For the same run, a bigger drop means a bigger rise, so a bigger slope. The answer is <b>the slopes of the two trails</b>.", {}); },
  function(){ return mcq("At a skateboard park, builders compare a beginner ramp and an advanced ramp. The advanced ramp rises 2 m over a run of 2 m, and the beginner ramp rises 1 m over a run of 4 m. Which statement about slope fits?",
    {t:"The advanced ramp has the greater slope", fb:"Correct: 2/2 = 1 is greater than 1/4 = 0.25."},
    [{t:"Both ramps have the same slope", fb:"Their rise over run ratios differ: 1 compared with 0.25."},
     {t:"The beginner ramp has the greater slope", fb:"The beginner ramp rises less over a longer run, so its slope is smaller."},
     {t:"Neither ramp has a slope", fb:"Any ramp that rises over a run has a slope."}],
    "\\[ \\begin{aligned} \\text{advanced} &= 2/2 = 1 \\\\ \\text{beginner} &= 1/4 = 0.25 \\end{aligned} \\] The answer is <b>the advanced ramp has the greater slope</b>.", {}); }
]), ["Think about which option measures steepness or a rate, not size, price or appearance.", "Ask whether the option compares a vertical or amount change with a horizontal or time change."]);

E("u7-zero-undefined", 7, ["4.3"], 1, "gen", function(){
  var mode=pick(["horiz","vert","horiz2","vert2"]);
  var ctx=pick(["A level section of boardwalk","A flat section of warehouse floor","A level stretch of trail"]);
  var ctxV=pick(["A vertical ladder rail","A straight flagpole","A vertical elevator shaft wall"]);
  if(mode.indexOf("horiz")===0){
    var y=ri(2,12); var hx1=ri(0,4), hx2=hx1+ri(3,7);
    return mcq(ctx+" is graphed through the points ("+hx1+", "+y+") and ("+hx2+", "+y+"). What is its slope?",
      {t:"0", fb:"Correct: the rise is "+y+" minus "+y+", which is 0, so the slope is 0."},
      [{t:"Undefined", fb:"Undefined slope happens for a vertical line, where the run is 0. Here the run is "+(hx2-hx1)+"."},
       {t:"1", fb:"A slope of 1 needs equal rise and run. Here the rise is 0."},
       {t:String(hx2-hx1), fb:"That is the run, not the slope. Slope divides rise by run."}],
      "\\[ \\begin{aligned} m &= \\frac{"+y+" - "+y+"}{"+hx2+" - "+hx1+"} \\\\ &= \\frac{0}{"+(hx2-hx1)+"} = 0 \\end{aligned} \\] A flat (horizontal) line has slope 0. The answer is <b>0</b>.",
      {mode:mode,y:y});
  }
  var x=ri(2,12); var vy1=ri(0,4), vy2=vy1+ri(3,8);
  return mcq(ctxV+" is graphed through the points ("+x+", "+vy1+") and ("+x+", "+vy2+"). What is its slope?",
    {t:"Undefined", fb:"Correct: the run is "+x+" minus "+x+", which is 0, and division by 0 is undefined."},
    [{t:"0", fb:"Slope 0 happens when the rise is 0 (a horizontal line). Here the rise is "+(vy2-vy1)+"."},
     {t:"1", fb:"A slope of 1 needs equal rise and run. Here the run is 0."},
     {t:String(vy2-vy1), fb:"That is the rise, not the slope. Slope divides rise by run, and the run is 0."}],
    "\\[ \\begin{aligned} m &= \\frac{"+vy2+" - "+vy1+"}{"+x+" - "+x+"} \\\\ &= \\frac{"+(vy2-vy1)+"}{0} \\end{aligned} \\] Division by 0 is undefined, so a vertical line has undefined slope. The answer is <b>undefined</b>.",
    {mode:mode,x:x});
}, ["Picture the line: flat across, or straight up and down.", "Compute the rise and the run first, then see which one is zero."]);

E("u7-rise-run-intro", 7, ["4.4"], 1, "gen", function(){
  var rise=ri(1,6), run=ri(2,12); if(run===rise) run=run+3;
  var obj=pick(["garden ramp","deck step stringer","loading ramp","shed roof edge"]);
  var q=mcq("The diagram shows a "+obj+". What is its slope, written as rise over run?",
    {t:u7Frac(rise,run), fb:"Correct: slope is rise over run, "+rise+" over "+run+", which reduces to "+u7Frac(rise,run)+"."},
    [{t:u7Frac(run,rise), fb:"This swaps rise and run. Slope puts the rise on top."},
     {t:String(rise+run), fb:"Adding rise and run does not give slope. Slope is a ratio, rise divided by run."},
     {t:String(Math.max(1,rise*run)), fb:"Multiplying rise by run does not give slope. Divide the rise by the run."}],
    "Slope is rise over run. \\[ \\begin{aligned} m &= \\frac{\\text{rise}}{\\text{run}} = \\frac{"+rise+"}{"+run+"} \\\\ &= "+u7Frac(rise,run)+" \\end{aligned} \\] The answer is <b>"+u7Frac(rise,run)+"</b>.",
    {rise:rise,run:run});
  q.figure=u7RampFig(rise,run,"Rise and run"); return q;
}, ["The slope is a ratio: vertical change on top, horizontal change on the bottom.", "Read the rise and the run off the diagram, then write rise divided by run."]);

E("u7-rate-of-change-intro", 7, ["4.8"], 1, "gen", function(){
  var mode=pick([
    {u:"dollars per hour", s:"A worker earns $PLACE per hour of work. The pay rate is a slope because it compares", a:"money earned with time worked"},
    {u:"litres per minute", s:"A tank drains at PLACE litres per minute. The drainage rate is a slope because it compares", a:"volume drained with time passed"},
    {u:"kilometres per hour", s:"A delivery van travels at PLACE kilometres per hour. The speed is a slope because it compares", a:"distance travelled with time passed"},
    {u:"dollars per kilogram", s:"Fish at a market costs $PLACE per kilogram. The unit price is a slope because it compares", a:"cost with mass bought"}
  ]);
  var v=pick([8,10,12,15,18,20,24,25,30,36,40,45,50,60]);
  var prompt=mode.s.replace("PLACE", v)+":";
  return mcq(prompt,
    {t:mode.a, fb:"Correct: a rate with units like "+mode.u+" compares two quantities, exactly like rise over run."},
    [{t:"the colour with the size", fb:"Colour and size are not the two quantities in this rate."},
     {t:"the starting value with itself", fb:"A rate compares a change in one quantity with a change in another, not a value with itself."},
     {t:"the name with the address", fb:"Names and addresses are not quantities that change together in a rate."}],
    "A rate such as "+v+" "+mode.u+" is a slope: it is a change in one quantity divided by a change in another. The answer is <b>"+mode.a+"</b>.",
    {mode:mode.u,v:v});
}, ["Look for the two quantities named in the units of the rate.", "Units like per hour tell you the second quantity; the amount tells you the first."]);

E("u7-scale-contexts", 7, ["4.13"], 1, "var", varset([
  function(){ return mcq("A builder studies a floor plan of a cabin before cutting any lumber. The floor plan is an example of what?",
    {t:"A scale drawing", fb:"Correct: a floor plan shows a real building at a reduced, proportional size."},
    [{t:"A slope diagram", fb:"A slope diagram shows rise over run for steepness, not a whole building layout."},
     {t:"A rate table", fb:"A rate table lists quantities that change together; a floor plan is a proportional picture."},
     {t:"A full size template of the cabin", fb:"A cabin cannot be drawn full size on a plan sheet; the plan is reduced by a scale."}],
    "A floor plan keeps all proportions while changing size, so it is a scale drawing. The answer is <b>a scale drawing</b>.", {}); },
  function(){ return mcq("A toy company sells a model fishing boat that is built at 1:40. The 1:40 tells the buyer what?",
    {t:"Each unit on the model stands for 40 of the same units on the real boat", fb:"Correct: a scale of 1:40 means model measurements multiply by 40 to give real measurements."},
    [{t:"The model costs $40, the price marked on its box", fb:"The second number is a size ratio, not a price."},
     {t:"The model is 40 cm long from bow to stern", fb:"The ratio alone does not give a length until a model measurement is known."},
     {t:"Only 40 models were made in the whole production run for the boat club fleet", fb:"The ratio compares sizes, not how many were produced."}],
    "A scale compares the representation with the real object: 1 unit represents 40 units. The answer is <b>each unit on the model stands for 40 of the same units on the real boat</b>.", {}); },
  function(){ return mcq("A driver uses a road map where 1 cm represents 5 km to plan a trip across the island. The map is useful because it is what?",
    {t:"A scale representation of the real distances", fb:"Correct: map distances are proportional to real distances through the stated scale."},
    [{t:"A graph of fuel prices over the season", fb:"The map shows distances to scale; it is not a price graph."},
     {t:"A list of ferry schedules and fares", fb:"Schedules give times, not proportional distances."},
     {t:"A photo taken at ground level by the dock at noon", fb:"A ground photo does not keep map distances proportional in this way."}],
    "The map shrinks real distances by one fixed ratio, so it is a scale representation. The answer is <b>a scale representation of the real distances</b>.", {}); },
  function(){ return mcq("An architect builds a small physical copy of a community centre to show a town council. The copy is best described as what?",
    {t:"A scale model", fb:"Correct: a scale model is a 3-D representation built to a proportional scale."},
    [{t:"A slope", fb:"Slope describes steepness, not a proportional copy of a building."},
     {t:"A unit rate", fb:"A unit rate compares two quantities; the copy is a physical representation."},
     {t:"An exploded diagram only", fb:"An exploded diagram separates parts of one object; this copy shows the whole building to scale."}],
    "A proportional 3-D copy of a real object is a scale model. The answer is <b>a scale model</b>.", {}); },
  function(){ return mcq("A blueprint for a warehouse addition uses the scale 1 cm : 2 m. Why do the builders trust measurements taken from the blueprint?",
    {t:"Every length on the blueprint is the same fraction of the matching real length", fb:"Correct: a scale keeps one fixed proportion between drawing and object."},
    [{t:"The blueprint is the same size as the warehouse, so it could cover one wall of it", fb:"The blueprint is much smaller; it works because of proportion, not equal size."},
     {t:"Ink lines are always exact to the millimetre, so no measuring is needed", fb:"Trust comes from the stated scale and careful measuring, not from ink alone."},
     {t:"The warehouse will shrink to match the paper size when it is built", fb:"The building is built full size from the scaled measurements."}],
    "A scale drawing keeps one fixed ratio between drawn and real lengths. The answer is <b>every length on the blueprint is the same fraction of the matching real length</b>.", {}); }
]), ["Ask whether the item keeps the proportions of a real object while changing its size.", "A scale representation can be a drawing, a map or a model, as long as one fixed ratio links it to the real thing."]);

E("u7-scale-drawing-read", 7, ["4.13","4.14"], 1, "gen", function(){
  var rep=pick([2,4,5,10,20,25,50]);
  var drawn=ri(3,12);
  var actual=drawn*rep;
  var kind=pick(["floor plan of a small studio","map of a hiking trail","blueprint of a garage","plan of a community garden"]);
  var q=mcq("On a "+kind+", the scale is 1 cm : "+rep+" m. A part of the drawing is "+drawn+" cm long, as shown. What is the actual length, in metres?",
    {t:fmt(actual)+"", fb:"Correct: each centimetre stands for "+rep+" m, so "+drawn+" cm stands for "+drawn+" times "+rep+" m."},
    [{t:fmt(drawn+rep)+"", fb:"Adding the scale number is the error here. Scale problems multiply."},
     {t:fmt(actual*2)+"", fb:"This doubles the actual length. The scale factor "+rep+" is applied once, not twice."},
     {t:fmt(drawn)+"", fb:"That is the drawn length itself. The actual object is larger by the scale factor."}],
    "\\[ \\begin{aligned} \\text{actual} &= "+drawn+" \\times "+rep+" \\\\ &= "+actual+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmt(actual)+" m</b>.",
    {rep:rep,drawn:drawn});
  q.figure=u7ScaleFig(drawn, Math.max(2,Math.round(drawn/2)), "Scale drawing"); return q;
}, ["Each unit on the drawing stands for the number of units named in the scale.", "Multiply the drawn length by the number in the scale."]);

E("u7-pitch-compare", 7, ["4.2"], 2, "gen", function(){
  var a=ri(1,12), b=pick([3,4,6,12]), c=ri(1,12), d=pick([3,4,6,12]), guard=0;
  while(Math.abs(a/b - c/d) < 0.05 && guard<20){ c=ri(1,12); d=pick([3,4,6,12]); guard++; }
  if(Math.abs(a/b - c/d) < 0.05){ c=a+3; d=b; }
  var sa=a/b, sb=c/d; var steeper = sa>sb ? "A" : "B";
  var other = steeper==="A" ? "B" : "A";
  var q=mcq("Roof A has pitch "+a+":"+b+" (rise : run) and Roof B has pitch "+c+":"+d+", as shown in the diagram. Which roof is steeper, and why?",
    {t:"Roof "+steeper+", because its rise over run value is larger", fb:"Correct: "+fmt(Math.max(sa,sb))+" is larger than "+fmt(Math.min(sa,sb))+", so that roof climbs faster for the same run."},
    [{t:"Roof "+other+", because its rise over run value is larger", fb:"Compare the ratios: "+a+"/"+b+" = "+fmt(sa)+" and "+c+"/"+d+" = "+fmt(sb)+". The larger value belongs to the other roof."},
     {t:"They are equally steep, because both pitches use two numbers", fb:"Equal steepness needs equal ratios. These ratios are "+fmt(sa)+" and "+fmt(sb)+"."},
     {t:"Roof "+steeper+", because its run number is larger", fb:"A larger run alone makes a roof gentler, not steeper. Steepness is the whole ratio, rise over run."}],
    "\\[ \\begin{aligned} \\text{A} &= "+a+"/"+b+" = "+fmt(sa)+" \\\\ \\text{B} &= "+c+"/"+d+" = "+fmt(sb)+" \\end{aligned} \\] The larger ratio marks the steeper roof. The answer is <b>Roof "+steeper+", because its rise over run value is larger</b>.",
    {a:a,b:b,c:c,d:d});
  q.figure=u7RoofFig(a,b,c,d); return q;
}, ["Turn each pitch into a single number by dividing rise by run.", "Compute both ratios first, then compare them."]);

E("u7-slope-from-ramp", 7, ["4.4","2.1"], 2, "gen", function(){
  var rise=pick([30,40,50,60,75,80,90,100,120]);
  var run = rise * pick([4,5,6,8,10]);
  var slope=rise/run;
  var obj=pick(["access ramp at a clinic","loading ramp at a warehouse","boat launch ramp","pedestrian ramp at a school"]);
  var _bo0=balOpts({t:fmt(slope), fb:"Correct: slope is rise over run, "+rise+" divided by "+run+"."}, [{t:fmt(run/rise), fb:"This is run over rise, the ratio flipped. Slope puts rise on top."},
     {t:fmt(rise+run), fb:"Adding gives a total length in centimetres, not a slope ratio."},
     {t:fmt(slope*10), fb:"This is ten times too large. Divide "+rise+" by "+run+" directly."}]); var q=mcq("A "+obj+" rises "+rise+" cm over a horizontal run of "+run+" cm, as shown. What is the slope of the ramp?", _bo0[0], _bo0[1],
    "Apply the formula directly. \\[ \\begin{aligned} m &= \\frac{\\text{rise}}{\\text{run}} = \\frac{"+rise+"}{"+run+"} \\\\ &= "+fmt(slope)+" \\end{aligned} \\] The answer is <b>"+fmt(slope)+"</b>.",
    {rise:rise,run:run});
  q.figure=u7RampFig(rise/10, run/10, "Ramp, rise and run in cm scaled for drawing"); return q;
}, ["Slope is rise divided by run, using the same units top and bottom.", "Write the rise over the run as a fraction, then divide."]);

E("u7-constant-slope", 7, ["4.5"], 2, "gen", function(){
  var base=pick([1,2,3]); var k1=pick([2,3,4]); var k2=pick([5,6,8]);
  var r1=base*k1, u1=ri(2,6), run1=u1*k1;
  var r2=base*k2, u2=u1, run2=u2*k2;
  var obj=pick(["roof","ramp up to a stage","driveway"]);
  var q=mcq("A "+obj+" is checked at two places. Near the bottom it rises "+r1+" units over a run of "+run1+" units. Higher up it rises "+r2+" units over a run of "+run2+" units, as shown. What does this show about its slope?",
    {t:"The slope is constant, because both ratios equal "+u7Frac(r1,run1), fb:"Correct: "+r1+"/"+run1+" and "+r2+"/"+run2+" both reduce to "+u7Frac(r1,run1)+"."},
    [{t:"The slope increases higher up, because the rise is bigger there", fb:"The run also grows in the same proportion, so the ratio stays the same."},
     {t:"The slope decreases higher up, because the run is bigger there", fb:"Both parts grow together: the ratios are equal, so the slope does not decrease."},
     {t:"The slope cannot be compared, because the two sections have different sizes", fb:"Sections of different sizes can be compared through their ratios, and these ratios match."}],
    "\\[ \\begin{aligned} \\text{lower} &= "+r1+"/"+run1+" = "+u7Frac(r1,run1)+" \\\\ \\text{upper} &= "+r2+"/"+run2+" = "+u7Frac(r2,run2)+" \\end{aligned} \\] Equal ratios mean the slope is the same all along. The answer is <b>the slope is constant</b>.",
    {r1:r1,run1:run1,r2:r2,run2:run2});
  q.figure=u7RampFig(r2/2, run2/2, "Checked at two places"); return q;
}, ["Reduce each rise over run ratio and compare the reduced forms.", "Work out the lower ratio first, then the upper one."]);

E("u7-angle-elevation", 7, ["4.6"], 2, "gen", function(){
  var rise=pick([7,10,12,15,20,25,30,35,40,45]);
  var run=pick([50,80,100,100,100,120,150,200]);
  var ang=Math.round(Math.atan(rise/run)*180/Math.PI);
  var q=mcq("A ramp has slope "+rise+":"+run+" (rise : run). Using \\(\\tan(\\theta) = \\frac{\\text{rise}}{\\text{run}}\\), what is its angle of elevation, to the nearest degree?",
    {t:ang+"°", fb:"Correct: the angle whose tangent is "+rise+"/"+run+" is about "+ang+" degrees."},
    [{t:(ang+5)+"°", fb:"Check the ratio: \\(\\tan^{-1}("+fmt(rise/run)+")\\) is about "+ang+" degrees, a little less than this."},
     {t:Math.max(1,ang-4)+"°", fb:"This angle has a smaller tangent than "+fmt(rise/run)+". The angle for this slope is about "+ang+" degrees."},
     {t:(90-ang)+"°", fb:"That is the complement, measured from vertical. Angle of elevation is measured from horizontal."}],
    "\\[ \\begin{aligned} \\tan(\\theta) &= \\frac{"+rise+"}{"+run+"} = "+fmt(rise/run)+" \\\\ \\theta &= \\tan^{-1}("+fmt(rise/run)+") \\approx "+ang+"^{\\circ} \\end{aligned} \\] A gentle slope like this gives a small angle. The answer is <b>"+ang+"°</b>.",
    {rise:rise,run:run,ang:ang});
  q.figure=u7RampFig(rise/5, run/5, "Slope and angle of elevation"); return q;
}, ["The tangent of the angle of elevation equals rise over run.", "Divide rise by run, then use the inverse tangent to get the angle."]);

E("u7-ramp-safety", 7, ["4.7"], 2, "gen", function(){
  var maxSlope=pick([12,16,20]); /* 1 in maxSlope */
  var rise=pick([30,45,60,75,90]);
  var goodRun=rise*maxSlope;
  var factor=pick([0.5,0.6,0.75,1.5,2]);
  var run=Math.round(goodRun*factor);
  var meets = run>=goodRun;
  var slopeTxt=u7Frac(rise,run);
  return mcq("A building code stated for this project says an access ramp may have slope at most 1:"+maxSlope+" (1 unit of rise for each "+maxSlope+" units of run). A planned ramp rises "+rise+" cm over a run of "+run+" cm. Which statement is correct?",
    meets ? {t:"It meets the code, because its slope is gentler than or equal to 1:"+maxSlope, fb:"Correct: "+rise+"/"+run+" reduces to about 1:"+fmt(run/rise)+", which is no steeper than 1:"+maxSlope+"."}
          : {t:"It is too steep for the code, because its slope is greater than 1:"+maxSlope, fb:"Correct: "+rise+"/"+run+" is about 1:"+fmtF(run/rise,1)+", steeper than the 1:"+maxSlope+" limit, so the run must be lengthened."},
    [ meets ? {t:"It is too steep for the code, because its slope is greater than 1:"+maxSlope, fb:"Compare ratios: this ramp is about 1:"+fmt(run/rise)+", which is gentler than 1:"+maxSlope+", so it meets the code."}
            : {t:"It meets the code, because its slope is gentler than or equal to 1:"+maxSlope, fb:"Compare ratios: this ramp is about 1:"+fmtF(run/rise,1)+", steeper than the 1:"+maxSlope+" limit."},
      {t:"It meets the code, because any ramp with a run over 1 m is allowed", fb:"The code limits the ratio, not the run alone. Check rise over run against 1:"+maxSlope+"."},
      {t:"It is too steep, because all ramps over "+rise+" cm of rise are banned", fb:"The code limits the slope ratio, not the rise alone. A longer run can make this rise acceptable."}],
    "\\[ \\begin{aligned} \\text{ramp slope} &= \\frac{"+rise+"}{"+run+"} \\\\ \\text{limit} &= \\frac{1}{"+maxSlope+"} \\end{aligned} \\] Comparing the ratios gives the ruling. The answer is <b>"+(meets?"it meets the code":"it is too steep for the code")+"</b>.",
    {rise:rise,run:run,maxSlope:maxSlope,meets:meets?1:0});
}, ["Compare the ramp ratio with the code ratio, rise over run in both cases.", "Reduce the ramp slope first, then set it beside the stated limit."]);

E("u7-slope-two-points", 7, ["4.9","2.1","4.3"], 2, "gen", function(){
  var horiz = Math.random()<0.18;
  var x1=ri(0,3), dx=ri(2,6), x2=x1+dx;
  var y1=ri(1,8), dy=horiz?0:pick([-4,-3,-2,2,3,4,5,6]);
  var y2=y1+dy; if(y2<0){ y2=y1+Math.abs(dy); dy=y2-y1; }
  if(Math.abs(dy)===dx){ dy = dy>0 ? dy+2 : dy-2; y2=y1+dy; if(y2<0){ y2=y1+Math.abs(dy); dy=y2-y1; } }
  var m=dy/dx;
  var cand=[
    {v:(dy===0?null:dx/dy), fb:"This divides change in x by change in y, the ratio flipped. Slope is change in y over change in x."},
    {v:-m, fb:"Watch the sign and the order: subtract the first coordinates from the second ones in the same order top and bottom."},
    {v:dy+dx, fb:"Adding the changes does not give slope. Divide the change in y by the change in x."},
    {v:m+2, fb:"This is 2 more than the true slope. Divide the change in y by the change in x."},
    {v:Math.abs(m)+1, fb:"This is not the quotient of the changes. Divide the change in y by the change in x."},
    {v:m-2, fb:"This is 2 less than the true slope. Divide the change in y by the change in x."},
    {v:m+3, fb:"This is 3 more than the true slope. Divide the change in y by the change in x."}
  ];
  var ds=[], usedD={}; usedD[fmt(m)]=1;
  for(var ci2=0; ci2<cand.length && ds.length<3; ci2++){ var cv=cand[ci2].v; if(cv===null||cv===undefined) continue; var ks=fmt(cv); if(usedD[ks]) continue; usedD[ks]=1; ds.push({t:ks, fb:cand[ci2].fb}); }
  var _bo0=balOpts({t:fmt(m), fb:"Correct: change in y is "+dy+" and change in x is "+dx+", so the slope is "+fmt(m)+"."}, ds); var q=mcq("The graph shows a line through ("+x1+", "+y1+") and ("+x2+", "+y2+"). What is the slope of the line?", _bo0[0], _bo0[1],
    "\\[ \\begin{aligned} m &= \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} \\\\ &= \\frac{"+dy+"}{"+dx+"} = "+fmt(m)+" \\end{aligned} \\] "+(horiz?"The line is horizontal, so its slope is 0. ":"")+"The answer is <b>"+fmt(m)+"</b>.",
    {x1:x1,y1:y1,x2:x2,y2:y2});
  q.figure=u7GraphFig(x1,y1,x2,y2,"x","y"); return q;
}, ["Slope from two points is change in y divided by change in x.", "Subtract the y values, subtract the x values, then divide."]);

E("u7-error-slope", 7, ["2.5","4.9"], 2, "gen", function(){
  var x1=ri(1,4), x2=x1+ri(3,6), y1=ri(1,5), y2=y1+ri(4,9);
  var dy=y2-y1, dx=x2-x1; if(dy===dx){ dy=dy+2; y2=y1+dy; }
  var errMode=pick(["swap","order","add"]);
  var wrongTxt, errName;
  if(errMode==="swap"){ wrongTxt=fmt(dx/dy); errName="rise and run were swapped, giving run over rise"; }
  else if(errMode==="order"){ wrongTxt=fmt(-dy/dx); errName="the points were subtracted in opposite orders, flipping the sign"; }
  else { wrongTxt=fmt(dy+dx); errName="the changes were added instead of divided"; }
  return mcq("A student finds the slope between ("+x1+", "+y1+") and ("+x2+", "+y2+") and gets "+wrongTxt+". What error did the student make, and what is the correct slope?",
    {t:"Error: "+errName+"; correct slope is "+fmt(dy/dx), fb:"Correct: change in y is "+dy+" and change in x is "+dx+", so the slope is "+fmt(dy/dx)+"."},
    [{t:"Error: the points were read off the wrong axes; correct slope is "+fmt(dy/dx), fb:"The points are used correctly here. The error is in how the changes were combined."},
     {t:"Error: rise and run were swapped, giving run over rise; correct slope is "+fmt(dx/dy), fb:"That corrected value is itself run over rise. The slope must be change in y over change in x, which is "+fmt(dy/dx)+"."},
     {t:"No error; the slope is "+wrongTxt, fb:"Recompute: change in y is "+dy+" and change in x is "+dx+", and "+dy+" divided by "+dx+" is "+fmt(dy/dx)+"."}],
    "\\[ \\begin{aligned} m &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = \\frac{"+dy+"}{"+dx+"} \\\\ &= "+fmt(dy/dx)+" \\end{aligned} \\] The stated value came from this error: "+errName+". The answer is <b>correct slope "+fmt(dy/dx)+"</b>.",
    {errMode:errMode,x1:x1,x2:x2,y1:y1,y2:y2});
}, ["Recompute the slope yourself first, then match the stated wrong value to an error.", "Find the change in y and the change in x, then test each error description against them."]);

E("u7-equivalent-forms", 7, ["2.6","4.4"], 2, "gen", function(){
  var rise=pick([3,4,5,6,8,9,10,12]), run=pick([6,8,10,12,15,20,24]);
  var v=rise/run;
  var form=pick(["percent","decimal","ratio"]);
  var correctTxt, equivDesc;
  if(form==="percent"){ correctTxt=fmt(v*100)+"% grade"; equivDesc="as a percent"; }
  else if(form==="decimal"){ correctTxt=fmt(v); equivDesc="as a decimal"; }
  else { correctTxt=u7Frac(rise,run); equivDesc="in lowest terms"; }
  var _bo0=balOpts({t:correctTxt, fb:"Correct: "+rise+"/"+run+" equals "+fmt(v)+", which is the same slope in the requested form."}, [{t:(run===rise?(form==="percent"?fmt(2*v*100)+"% grade":form==="ratio"?u7Frac(2*rise,run):fmt(2*v)):(form==="percent"?fmt(run/rise*100)+"% grade":form==="ratio"?u7Frac(run,rise):fmt(run/rise))), fb:(run===rise?"That is double the true value "+fmt(v)+", not the same slope.":"That is run over rise, a different (flipped) slope.")},
     {t:(form==="percent"?fmt(v*1000)+"% grade":form==="ratio"?u7Frac(rise*10,run):fmt(v*10)), fb:"This is ten times the true value "+fmt(v)+". Convert carefully."},
     {t:(form==="percent"?fmt((v+0.5)*100)+"% grade":form==="ratio"?u7Frac(2*rise+run,2*run):fmt(v+0.5)), fb:"This value does not equal "+rise+"/"+run+" = "+fmt(v)+"."}]); return mcq("A driveway has slope "+rise+"/"+run+" (rise over run). Which value is the same slope written "+equivDesc+"?", _bo0[0], _bo0[1],
    "\\[ \\begin{aligned} \\frac{"+rise+"}{"+run+"} &= "+fmt(v)+" \\end{aligned} \\] Different forms of the same slope formula give the same value, so the forms are equivalent. The answer is <b>"+correctTxt+"</b>.",
    {rise:rise,run:run,form:form});
}, ["First turn the given slope into a decimal value.", "Then check which option has that same value in the requested form."]);

E("u7-trades-slope", 7, ["2.3","4.1"], 2, "var", varset([
  function(){ return mcq("A roofer checks a roof pitch of 4:12 before ordering shingles rated for that pitch. How is the slope formula being used in this trade?",
    {t:"The roofer compares rise with run to match materials to the steepness", fb:"Correct: pitch is rise over run, and shingle ratings depend on steepness."},
    [{t:"The roofer uses slope to find the colour of the shingles for the roof", fb:"Slope gives steepness, not colour."},
     {t:"The roofer uses slope to set the price per bundle only, nothing else", fb:"Price may depend on area, but the pitch check itself is about steepness for material ratings."},
     {t:"The roofer ignores rise and run and measures only the ridge length", fb:"Pitch is defined by rise and run; ridge length alone does not give it."}],
    "Roof pitch is the slope formula, rise over run, used to match materials to steepness. The answer is <b>the roofer compares rise with run to match materials to the steepness</b>.", {}); },
  function(){ return mcq("A carpenter building an access ramp uses the rule: run = rise times 12. Which slope does this rule build?",
    {t:"A slope of 1:12", fb:"Correct: with run equal to 12 times the rise, rise over run is 1/12, written 1:12."},
    [{t:"A slope of 12:1", fb:"That flips the ratio. Here the run is the larger number, 12 parts run to 1 part rise."},
     {t:"A slope of 1:1", fb:"A 1:1 slope needs run equal to rise, not 12 times the rise."},
     {t:"An undefined slope", fb:"Undefined slope is a vertical surface. This ramp has a long run, so its slope is small and defined."}],
    "\\[ \\begin{aligned} m &= \\frac{\\text{rise}}{\\text{run}} = \\frac{\\text{rise}}{12 \\times \\text{rise}} = \\frac{1}{12} \\end{aligned} \\] The answer is <b>a slope of 1:12</b>.", {}); },
  function(){ return mcq("A plumber must slope a drain pipe so water flows: the pipe drops 1 cm for every 100 cm of horizontal run. This trade rule is an application of which idea?",
    {t:"Slope as a small, controlled rate of drop", fb:"Correct: the drop over the run is a slope, chosen so flow works without siphoning or clogging."},
    [{t:"A scale drawing of the whole building site", fb:"The rule compares drop with run on the real pipe, not a drawing with the real object."},
     {t:"The surface area of the ground", fb:"The rule is about drop per run, not covering area."},
     {t:"The angle of a right triangle corner", fb:"The corner angle is fixed at 90 degrees; the working idea here is the drop rate."}],
    "Drop divided by run is slope, set small and steady so the drain works. The answer is <b>slope as a small, controlled rate of drop</b>.", {}); },
  function(){ return mcq("A road crew sets the grade of a new street at 6%. A new worker asks what the percent means. Which explanation should the crew give?",
    {t:"The road rises 6 m for every 100 m of horizontal run", fb:"Correct: percent grade is rise over run times 100."},
    [{t:"The road is 6 m long in total, from end to end", fb:"The percent is a ratio, not a total length."},
     {t:"The road rises 6 m for every 6 m of horizontal run along it", fb:"That would be a 100% grade. Percent uses 100 m of run as the base."},
     {t:"Six percent of the budget goes to grading the road", fb:"Grade here is steepness, not a budget share."}],
    "\\[ \\begin{aligned} \\text{grade} &= \\frac{\\text{rise}}{\\text{run}} \\times 100 = 6\\% \\end{aligned} \\] So the rise is 6 m over 100 m of run. The answer is <b>the road rises 6 m for every 100 m of horizontal run</b>.", {}); },
  function(){ return mcq("An excavator operator cuts a drainage swale (a shallow channel) that falls 0.5 m over 25 m. A trainee computes the slope as 0.5/25 = 0.02. How is the formula serving the trade here?",
    {t:"It confirms the channel falls steadily enough to move water", fb:"Correct: a small positive fall over the whole run means water drains along the channel."},
    [{t:"It gives the volume of soil removed from the channel bed", fb:"Volume needs area and depth of the cut; slope alone does not give it."},
     {t:"It sets the width of the channel at every point", fb:"Width is chosen separately; the slope checks the fall."},
     {t:"It proves the channel is level along its whole length, end to end", fb:"A slope of 0.02 is a gentle fall, not level. Level would be slope 0."}],
    "The slope formula checks the fall of the channel: 0.5 over 25 is a steady gentle slope that moves water. The answer is <b>it confirms the channel falls steadily enough to move water</b>.", {}); }
]), ["Think about what the worker is trying to control: steepness, fall or grade.", "Match the trade task to rise over run, the slope formula in working clothes."]);

E("u7-scale-actual", 7, ["4.14"], 2, "gen", function(){
  var rep=pick([3,5,8,10,15,20,40,50,100]);
  var drawn=pick([2,3,4,5,6,7,8,9,11,12,14,15]);
  var actual=drawn*rep;
  var ctx=pick([
    {o:"kitchen wall on a floor plan", u:"cm", s:"1 cm : "+rep+" cm"},
    {o:"fishing stage (a wooden platform) on a blueprint", u:"cm", s:"1 cm : "+rep+" cm"},
    {o:"trail segment on a park map", u:"m", s:"1 cm : "+rep+" m"},
    {o:"model boat hull length on its plan", u:"cm", s:"1 : "+rep}
  ]);
  var q=mcq("A "+ctx.o+" is drawn "+drawn+" cm long. The scale is "+ctx.s+". What is the actual length, in " + (ctx.u === "cm" ? "centimetres" : "metres") + "?",
    {t:fmt(actual)+"", fb:"Correct: multiply the drawn length by the scale factor "+rep+"."},
    [{t:fmt(drawn+rep)+"", fb:"Adding the scale factor is the error. Proportional reasoning multiplies."},
     {t:fmt(actual+rep)+"", fb:"This adds the scale factor to the answer instead of using it as the multiplier throughout."},
     {t:fmt(actual*2)+"", fb:"This doubles the actual length. The scale factor "+rep+" is applied once, not twice."}],
    "\\[ \\begin{aligned} \\text{actual} &= "+drawn+" \\times "+rep+" \\\\ &= "+actual+" \\text{ "+ctx.u+"} \\end{aligned} \\] The answer is <b>"+fmt(actual)+" "+ctx.u+"</b>.",
    {rep:rep,drawn:drawn});
  q.figure=u7ScaleFig(drawn, Math.max(2,Math.round(drawn/2)), "Drawn length"); return q;
}, ["Set up the proportion: drawn length times the scale factor gives the actual length.", "Multiply the drawn measurement by the number in the scale."]);

E("u7-model-dimensions", 7, ["4.15"], 2, "gen", function(){
  var factor=pick([10,20,25,50,100]);
  var obj=pick([
    {n:"fishing boat", d:"length", real:null},
    {n:"delivery truck", d:"length", real:null},
    {n:"community centre", d:"width", real:null},
    {n:"lighthouse", d:"height", real:null}
  ]);
  var modelDim=pick([12,15,18,20,24,30,36,40]);
  var real=modelDim*factor/10; /* real in metres if modelDim in cm and factor scaled */
  /* Use clean numbers: model cm = real m * 100 / factor */
  var realM=pick([6,8,10,12,15,18,20,24,30]);
  modelDim=realM*100/factor;
  return mcq("A scale model of a "+obj.n+" is built at 1:"+factor+". The real "+obj.d+" is "+realM+" m. What is the model "+obj.d+", in centimetres?",
    {t:fmt(modelDim)+"", fb:"Correct: convert "+realM+" m to "+fmt(realM*100)+" cm, then divide by the scale factor "+factor+"."},
    [{t:fmt(realM*100/factor*10)+"", fb:"This is ten times too large: a place value slip in the conversion or the division."},
     {t:fmt(realM+factor)+"", fb:"This adds the scale factor to the metre value instead of converting to centimetres and dividing by the scale."},
     {t:fmt(modelDim*1.5)+"", fb:"This inflates the model size by half again. Divide the centimetre value by "+factor+" exactly."}],
    "\\[ \\begin{aligned} "+realM+" \\text{ m} &= "+fmt(realM*100)+" \\text{ cm} \\\\ \\text{model} &= \\frac{"+fmt(realM*100)+"}{"+factor+"} = "+fmt(modelDim)+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmt(modelDim)+" cm</b>.",
    {factor:factor,realM:realM});
}, ["Work in one unit first: turn the real measurement into centimetres.", "Convert metres to centimetres, then divide by the scale factor."]);

E("u7-drawn-length-choice", 7, ["4.16"], 2, "gen", function(){
  var rep=pick([4,5,10,20,50]);
  var drawn=pick([3,4,5,6,8,9,10,12]);
  var actual=drawn*rep;
  var obj=pick(["garage","greenhouse","deck","storage shed","classroom"]);
  return mcq("You are drawing a scale diagram of a "+obj+" that is "+actual+" cm long in real life. The scale is 1 cm : "+rep+" cm. How long should the line for that side be in your diagram, in centimetres?",
    {t:fmt(drawn)+"", fb:"Correct: divide the actual length by the scale factor: "+actual+" divided by "+rep+" is "+drawn+" cm."},
    [{t:fmt(actual)+"", fb:"That is the full real length; the diagram must be reduced by the scale."},
     {t:fmt(drawn*2)+"", fb:"This doubles the right drawn length. Divide "+actual+" by "+rep+" exactly."},
     {t:fmt(Math.max(1,drawn-1))+"", fb:"Close, but the division "+actual+" / "+rep+" gives "+drawn+" cm exactly."}],
    "\\[ \\begin{aligned} \\text{drawn} &= \\frac{"+actual+"}{"+rep+"} \\\\ &= "+drawn+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmt(drawn)+" cm</b>.",
    {rep:rep,drawn:drawn});
}, ["Drawing goes the other way from measuring a plan: actual length divided by the scale factor.", "Divide the real length by the number in the scale."]);

E("u7-cr-slope-points", 7, ["4.9","2.1"], 2, "gen", function(){
  var x1=ri(0,4), dx=pick([2,4,5,8,10]), x2=x1+dx;
  var y1=ri(1,10), dy=pick([2,3,4,5,6,8,10,12,15,20]), y2=y1+dy;
  var ctx=pick(["plumber's fee","taxi fare","greenhouse temperature","snow depth"]);
  var unit=pick(["dollars","dollars","degrees","cm"]);
  var m=dy/dx;
  var q=numq("A graph for a "+ctx+" passes through ("+x1+", "+y1+") and ("+x2+", "+y2+"), as shown. Find the slope of the line. Give your answer as a number.",
    m, 0.01,
    "\\[ \\begin{aligned} m &= \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} \\\\ &= \\frac{"+dy+"}{"+dx+"} = "+fmt(m)+" \\end{aligned} \\] The answer is <b>"+fmt(m)+"</b>.",
    {x1:x1,x2:x2,y1:y1,y2:y2});
  q.figure=u7GraphFig(x1,y1,x2,y2,"x","y"); return q;
}, ["Use the two point slope formula from the formula sheet.", "Subtract the y values, subtract the x values, then divide."]);

E("u7-cr-rise-find", 7, ["2.2","4.4"], 2, "gen", function(){
  var run=pick([8,10,12,15,20,24,30,40,50,60]);
  var rise=pick([1,2,3,4,5,6,8,10]);
  var slope=rise/run;
  var obj=pick(["roof section","access ramp","driveway"]);
  return numq("A "+obj+" has slope "+fmt(slope)+" and a horizontal run of "+run+" m. Rearrange the slope formula to find the rise, in metres. Give your answer as a number.",
    rise, 0.01,
    "Rearrange slope equals rise over run to rise equals slope times run. \\[ \\begin{aligned} \\text{rise} &= "+fmt(slope)+" \\times "+run+" \\\\ &= "+rise+" \\text{ m} \\end{aligned} \\] The answer is <b>"+rise+" m</b>.",
    {run:run,slope:slope});
}, ["Rearrange the formula so the unknown rise is alone on one side.", "Multiply both sides by the run, then compute slope times run."]);

E("u7-cr-scale-actual", 7, ["4.17","4.14"], 2, "gen", function(){
  var rep=pick([5,10,15,20,25,40,50]);
  var drawn=pick([3,4,5,6,7,8,9,10,12,14,16]);
  var actual=drawn*rep;
  var ctx=pick(["On a map of a coastal trail, the scale is","On a floor plan of a library, the scale is","On a blueprint of a boathouse, the scale is"]);
  var unit=pick(["m","m","cm"]);
  return numq(ctx+" 1 cm : "+rep+" "+unit+". A measured length on the drawing is "+drawn+" cm. Find the actual length, in "+unit+". Give your answer as a number.",
    actual, 0.01,
    "\\[ \\begin{aligned} \\text{actual} &= "+drawn+" \\times "+rep+" \\\\ &= "+actual+" \\text{ "+unit+"} \\end{aligned} \\] The answer is <b>"+actual+" "+unit+"</b>.",
    {rep:rep,drawn:drawn});
}, ["Each centimetre on the drawing stands for the amount named in the scale.", "Multiply the measured length by the scale number."]);

E("u7-cr-rate-problem", 7, ["4.9","4.8"], 2, "gen", function(){
  var rate=pick([15,18,20,22,25,28,30,35,40]);
  var start=pick([40,60,80,100,120,150,200]);
  var hrs=pick([2,3,4,5,6,7,8]);
  var total=start+rate*hrs;
  return numq("A snow clearing service charges a $"+start+" call out fee plus $"+rate+" per hour. The total charge is the fee plus the hourly rate times the hours worked. This hourly rate is the slope of the charge graph. After how many hours is the total charge $"+total+"? Give your answer as a number of hours.",
    hrs, 0.01,
    "\\[ \\begin{aligned} "+total+" - "+start+" &= "+(rate*hrs)+" \\\\ \\text{hours} &= \\frac{"+(rate*hrs)+"}{"+rate+"} = "+hrs+" \\end{aligned} \\] The answer is <b>"+hrs+" hours</b>.",
    {rate:rate,start:start,total:total});
}, ["Subtract the fixed fee first; what remains was built up at the hourly rate.", "Take the fee off the total, then divide by the rate, which is the slope."]);

E("u7-cr-model-scale", 7, ["4.15","4.17"], 2, "gen", function(){
  var factor=pick([20,25,40,50,75,100]);
  var modelCm=pick([8,10,12,15,16,20,24,25,30,40]);
  var actualCm=modelCm*factor;
  var actualM=actualCm/100;
  var obj=pick(["model stagecoach","model fishing schooner","model fire truck","model farm tractor"]);
  return numq("A "+obj+" is built at scale 1:"+factor+". The model is "+modelCm+" cm long. Find the length of the real vehicle, in metres. Give your answer as a number.",
    actualM, 0.01,
    "\\[ \\begin{aligned} \\text{actual} &= "+modelCm+" \\times "+factor+" = "+actualCm+" \\text{ cm} \\\\ &= "+fmt(actualM)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmt(actualM)+" m</b>.",
    {factor:factor,modelCm:modelCm});
}, ["Multiply the model length by the scale factor, keeping units in centimetres first.", "Find the actual length in centimetres, then convert to metres by dividing by 100."]);

E("u7-cr-run-find", 7, ["2.2","4.7"], 2, "gen", function(){
  var riseCm=pick([25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100,110,120]);
  var maxSlope=pick([8,10,12,14,16,18,20,24]);
  var runCm=riseCm*maxSlope;
  var runM=runCm/100;
  var place=pick(["at a clinic entrance","at a public library","at an arena","at a school entrance"]);
  return numq("An access ramp "+place+" must rise "+riseCm+" cm, and the steepest slope allowed for this ramp is 1:"+maxSlope+". Rearrange the slope formula to find the shortest horizontal run the ramp may have, in metres. Give your answer as a number.",
    runM, 0.01,
    "At the steepest allowed slope, rise over run equals 1 over "+maxSlope+", so run equals rise times "+maxSlope+". \\[ \\begin{aligned} \\text{run} &= "+riseCm+" \\times "+maxSlope+" = "+runCm+" \\text{ cm} \\\\ &= "+fmt(runM)+" \\text{ m} \\end{aligned} \\] A shorter run would make the ramp steeper than allowed, which is a safety problem. The answer is <b>"+fmt(runM)+" m</b>.",
    {riseCm:riseCm,maxSlope:maxSlope});
}, ["At the limit, use the allowed slope as an equation with the run unknown.", "Set rise over run equal to the allowed ratio and solve for the run, then convert to metres."]);

E("u7-pitch-implications", 7, ["4.2","4.7"], 3, "gen", function(){
  var steep=pick([[7,12],[8,12],[9,12],[10,12],[11,12],[12,12],[6,10],[9,10]]);
  var gentle=pick([[2,12],[3,12],[4,12],[5,12],[3,10],[4,10]]);
  var ctx=pick(["a house in a snowy part of the province","a cabin that sheds heavy rain","a storage shed","a workshop near the coast","a barn on a farm","a community hall"]);
  var sv=steep[0]/steep[1], gv=gentle[0]/gentle[1];
  var q=mcq("Two roof pitches are proposed for "+ctx+": Roof X at "+steep[0]+":"+steep[1]+" and Roof Y at "+gentle[0]+":"+gentle[1]+", as shown. Which statement best explains the difference and its implication?",
    {t:"Roof X is steeper, so it sheds snow and rain faster but needs more roofing material and care working on it", fb:"Correct: "+steep[0]+"/"+steep[1]+" = "+fmt(sv)+" beats "+gentle[0]+"/"+gentle[1]+" = "+fmt(gv)+", and steeper roofs shed water and snow faster while being harder to work on."},
    [{t:"Roof Y is steeper, so it sheds snow and rain faster but needs more roofing material and care working on it", fb:"Compare the ratios: Roof Y is "+fmt(gv)+", the smaller value, so Roof Y is the gentler roof."},
     {t:"Both roofs are equally steep, so there is no practical difference between them in any way", fb:"The ratios "+fmt(sv)+" and "+fmt(gv)+" differ, so drainage and working conditions differ too."},
     {t:"Roof X is steeper, so it will hold snow longer and drain more slowly than the other roof does", fb:"The steepness call is right but the implication is backwards: steeper roofs shed snow and water faster."}],
    "\\[ \\begin{aligned} \\text{X} &= "+steep[0]+"/"+steep[1]+" = "+fmt(sv)+" \\\\ \\text{Y} &= "+gentle[0]+"/"+gentle[1]+" = "+fmt(gv)+" \\end{aligned} \\] Roof X is steeper, with the drainage and safety implications that follow. The answer is <b>Roof X is steeper and sheds snow and rain faster</b>.",
    {steep:steep.join(":"),gentle:gentle.join(":")});
  q.figure=u7RoofFig(steep[0],steep[1],gentle[0],gentle[1]); return q;
}, ["Turn both pitches into decimal slopes before judging any implication.", "Compute each rise over run, then think about drainage and working safety for the steeper one."]);

E("u7-create-solve-slope", 7, ["2.4","4.9"], 3, "gen", function(){
  var rate=pick([12,14,15,18,20,24,25,30]);
  var start=pick([100,150,200,250,300,400,500]);
  var t=pick([3,4,5,6,8,10]);
  var total=start+rate*t;
  var prompt="A problem is created from this situation: a tank starts with "+start+" L of water and fills steadily at "+rate+" L per minute, so the amount is start plus rate times minutes. How many litres are in the tank after "+t+" minutes?";
  return mcq(prompt,
    {t:fmt(total)+"", fb:"Correct: start "+start+" L plus "+rate+" times "+t+" L added while filling."},
    [{t:fmt(total-rate)+"", fb:"This is the amount after one fewer minute of filling. The rate acts for all "+t+" minutes."},
     {t:fmt(rate*t)+"", fb:"This forgets the "+start+" L that were in the tank at the start."},
     {t:fmt(total+rate)+"", fb:"This adds one extra minute of filling. Multiply the rate by exactly "+t+" minutes."}],
    "\\[ \\begin{aligned} \\text{amount} &= "+start+" + "+rate+" \\times "+t+" \\\\ &= "+start+" + "+(rate*t)+" = "+total+" \\text{ L} \\end{aligned} \\] The rate "+rate+" L per minute is the slope of the amount graph. The answer is <b>"+fmt(total)+" L</b>.",
    {rate:rate,start:start,t:t});
}, ["Build the expression first: starting amount plus rate times time.", "Multiply the rate by the time, then add the starting amount."]);

E("u7-constant-verify-advanced", 7, ["4.5","2.6"], 3, "gen", function(){
  var baseRun=pick([3,4,5,6,8,10,12]);
  var baseRise=pick([1,2,3,4]);
  var k=pick([2,3,4]);
  var same = Math.random()<0.5;
  var r2=baseRise*k + (same?0:pick([1,2]));
  var run2=baseRun*k;
  var v1=baseRise/baseRun, v2=r2/run2;
  return mcq("A long staircase is measured in two flights. The lower flight rises "+baseRise+" m over a run of "+baseRun+" m. The upper flight rises "+r2+" m over a run of "+run2+" m. A student claims the two flights have the same slope because the second flight is just a scaled copy of the first. Is the claim right?",
    same ? {t:"Yes: both flights have slope "+fmt(v1)+", so the forms describe one constant slope", fb:"Correct: "+r2+"/"+run2+" reduces to the same value as "+baseRise+"/"+baseRun+"."}
         : {t:"No: the upper slope is "+fmt(v2)+", not "+fmt(v1)+", so the slope changes", fb:"Correct: "+r2+"/"+run2+" = "+fmt(v2)+", which differs from "+baseRise+"/"+baseRun+" = "+fmt(v1)+"."},
    [ same ? {t:"No: the upper slope is different because its rise and run are larger numbers", fb:"Larger numbers can still form the same ratio. Here both ratios equal "+fmt(v1)+"."}
           : {t:"Yes: bigger rise and run always keep the same slope, whatever the flights", fb:"Not always: check the ratio. Here "+r2+"/"+run2+" = "+fmt(v2)+", not "+fmt(v1)+"."},
      {t:"Yes: any two flights in one staircase always share a slope, by design", fb:"That is an assumption, not a verification. Slopes must be checked by their ratios."},
      {t:"No: slopes can never be compared when the runs differ", fb:"Different runs are exactly what ratios handle. Compare rise over run for each flight."}],
    "\\[ \\begin{aligned} \\text{lower} &= "+baseRise+"/"+baseRun+" = "+fmt(v1)+" \\\\ \\text{upper} &= "+r2+"/"+run2+" = "+fmt(v2)+" \\end{aligned} \\] "+(same?"The values match, so the slope is constant and the two forms are equivalent.":"The values differ, so the slope is not constant.")+" The answer is <b>"+(same?"yes, the claim is right":"no, the claim is wrong")+"</b>.",
    {baseRise:baseRise,baseRun:baseRun,r2:r2,run2:run2,same:same?1:0});
}, ["Reduce both rise over run ratios to decimals and compare them.", "Work out the lower flight slope first, then the upper flight slope."]);

E("u7-scale-multi-step", 7, ["4.17","4.16"], 3, "gen", function(){
  var repKm=pick([2,5,10,20,25]);
  var drawn=pick([3,4,5,6,7,8,9,11,13,14]);
  var distKm=drawn*repKm;
  var speeds=[3,4,5,6,8,10,12,15,20,25,30,40,50,60,80,100].filter(function(sp){return distKm%sp===0;});
  if(!speeds.length) speeds=[distKm];
  var speed=pick(speeds);
  var timeH=distKm/speed;
  var _bo0=balOpts({t:fmt(timeH)+"", fb:"Correct: the map distance is "+drawn+" times "+repKm+" = "+distKm+" km, and "+distKm+" divided by "+speed+" km/h is "+fmt(timeH)+" hours."}, [{t:fmt(distKm)+"", fb:"That is the distance in kilometres, not the time. Divide the distance by the speed."},
     {t:fmt(timeH+1)+"", fb:"This adds an extra hour. Time is distance divided by speed exactly."},
     {t:fmt(timeH/2)+"", fb:"This halves the time. Divide the full distance "+distKm+" km by the speed "+speed+" km/h."}]); return mcq("On a road map with scale 1 cm : "+repKm+" km, two towns are "+drawn+" cm apart. A driver travels between them at an average of "+speed+" km/h. How long does the trip take, in hours?", _bo0[0], _bo0[1],
    "\\[ \\begin{aligned} \\text{distance} &= "+drawn+" \\times "+repKm+" = "+distKm+" \\text{ km} \\\\ \\text{time} &= \\frac{"+distKm+"}{"+speed+"} = "+fmt(timeH)+" \\text{ h} \\end{aligned} \\] The answer is <b>"+fmt(timeH)+" hours</b>.",
    {repKm:repKm,drawn:drawn,speed:speed});
}, ["Do the scale step first, then the travel step.", "Turn the map measurement into kilometres, then divide by the speed."]);

E("u7-cr-angle-slope", 7, ["4.6","2.2"], 3, "gen", function(){
  var rise=pick([1,2,3,4,5,6,7,8,9,10,12,15]);
  var run=pick([8,10,12,15,20,24,25,30,36,40,48,50,60,80,100]);
  var ang=Math.round(Math.atan(rise/run)*180/Math.PI*10)/10;
  var rampKind=pick(["boat launch ramp","driveway ramp","loading ramp","trailer ramp"]);
  return numq("A "+rampKind+" rises "+rise+" m over a horizontal run of "+run+" m. Find its angle of elevation, to the nearest degree. Give your answer as a number of degrees.",
    Math.round(ang), 1,
    "\\[ \\begin{aligned} \\tan(\\theta) &= \\frac{"+rise+"}{"+run+"} = "+fmt(rise/run)+" \\\\ \\theta &= \\tan^{-1}("+fmt(rise/run)+") \\approx "+Math.round(ang)+"^{\\circ} \\end{aligned} \\] The answer is <b>"+Math.round(ang)+" degrees</b>.",
    {rise:rise,run:run});
}, ["The tangent of the angle of elevation is rise over run.", "Divide rise by run, then use the inverse tangent and round to the nearest degree."]);

E("u7-cr-create-scale", 7, ["2.4","4.17"], 3, "gen", function(){
  var rep=pick([4,5,8,10,20,25,40]);
  var drawnW=pick([6,8,10,12,15,16,20]);
  var drawnH=pick([3,4,5,6,8,10]);
  var areaDrawn=drawnW*drawnH;
  var scaleArea=rep*rep;
  var actualArea=areaDrawn*scaleArea;
  var q=numq("A scale plan uses 1 cm : "+rep+" cm. On the plan, a rectangular garden plot measures "+drawnW+" cm by "+drawnH+" cm, as shown. Find the actual area of the plot, in square centimetres. Give your answer as a number.",
    actualArea, 0.5,
    "Each drawn length scales by "+rep+", so each actual length is the drawn length times "+rep+". \\[ \\begin{aligned} \\text{actual length} &= "+drawnW+" \\times "+rep+" = "+(drawnW*rep)+" \\text{ cm} \\\\ \\text{actual width} &= "+drawnH+" \\times "+rep+" = "+(drawnH*rep)+" \\text{ cm} \\\\ \\text{area} &= "+(drawnW*rep)+" \\times "+(drawnH*rep)+" = "+actualArea+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+actualArea+" cm²</b>.",
    {rep:rep,drawnW:drawnW,drawnH:drawnH});
  q.figure=u7ScaleFig(drawnW, drawnH, "Garden plot on the plan"); return q;
}, ["Lengths scale by the scale factor, so scale both sides before finding area.", "Find the actual length and the actual width first, then multiply them."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Clusters 13 and 14 (rate readiness, similarity and scale). Borrowed verbatim from Mathematics 8 (u5-express-rate, u5-identify-rate-example, u5-rate-problem-solve, u5-unit-rate-cost-gap), Mathematics 1202 (u7-similar-check, u7-corresponding-sides, u7-similar-missing-side-mc) and Mathematics 9 (u7-gap-scale-apply-cr); feeder helper copies ride in bank-helpers.js. ===== */
E("u7-pk-express-rate", 7, ["4.4"], 1, "gen", function () {
  var tmpls = [
    { desc: "A bus travels {A} km in {B} h", u1: "km", u2: "h", w1: "kilometres", w2: "hour" },
    { desc: "A tap fills {A} L in {B} min", u1: "L", u2: "min", w1: "litres", w2: "minute" },
    { desc: "A worker earns ${A} in {B} h", u1: "$", u2: "h", w1: "dollars", w2: "hour" },
    { desc: "A printer prints {A} pages in {B} min", u1: "pages", u2: "min", w1: "pages", w2: "minute" },
    { desc: "A car uses {A} L of fuel for {B} km driven", u1: "L", u2: "km", w1: "litres", w2: "kilometre" },
    { desc: "A ferry carries {A} passengers in {B} trips", u1: "passengers", u2: "trips", w1: "passengers", w2: "trip" },
    { desc: "A heart beats {A} times in {B} min", u1: "beats", u2: "min", w1: "beats", w2: "minute" },
    { desc: "Snow falls {A} cm in {B} h", u1: "cm", u2: "h", w1: "centimetres", w2: "hour" }
  ];
  var t = pick(tmpls), A = ri(4, 95), B = pick([2, 3, 4, 5, 6, 8, 10, 12]);
  var desc = t.desc.replace("{A}", A).replace("{B}", B);
  var corr = A + " " + t.u1 + "/" + B + " " + t.u2;
  var cands = [
    { t: B + " " + t.u2 + "/" + A + " " + t.u1, fb: "That reverses the rate; the amount measured goes first and the unit it is measured against goes second." },
    { t: A + " " + t.u2 + "/" + B + " " + t.u1, fb: "That swaps the two units; each number must keep the unit it was measured in." },
    { t: A + " " + t.u1 + " in total", fb: "That gives only the amount; a rate must also say what the amount is measured against." },
    { t: A + ":" + B, fb: "That is ratio notation for two amounts of the same kind; a rate keeps both units written in." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate joins an amount to the unit it is measured against: \\[ \\begin{aligned} \\text{rate} &= " + A + " \\text{ " + t.w1 + " per } " + B + " \\text{ " + t.w2 + "} \\end{aligned} \\] Written with symbols, the rate is <b>" + corr + "</b>.";
  return mcq(desc + ". Which expression records this rate with symbols?", { t: corr, fb: "Correct: the measured amount and its unit come first, then the unit it is measured against." }, ds, sol, { mode: "express-rate", a: A, b: B });
}, ["A rate compares two different units, and both units stay in the written rate.", "First write the measured amount with its unit, then a slash, then the second amount with its unit."]);

E("u7-pk-identify-rate", 7, ["4.1"], 1, "gen", function () {
  var tmpls = [
    { s: "Maya rode {A} km in {B} h on a coastal trail and paid a $12 trail fee.", A: [12, 60], B: [2, 6], corr: function (A, B) { return A + " km in " + B + " h"; }, rev: function (A, B) { return B + " h in " + A + " km"; }, wrong: "12 dollars for the trail fee", wfb: "The fee is a single amount with no second amount to compare it with, so it is not the rate in this example." },
    { s: "A pump moved {A} L of water in {B} min while a crew of 6 workers watched.", A: [20, 90], B: [2, 9], corr: function (A, B) { return A + " L in " + B + " min"; }, rev: function (A, B) { return B + " min in " + A + " L"; }, wrong: "6 workers on the crew", wfb: "The crew size is a single count with no comparison built in, so it is not the rate in this example." },
    { s: "Jonah earned ${A} for {B} h of yard work and bought a $9 snack afterward.", A: [30, 120], B: [2, 8], corr: function (A, B) { return "$" + A + " in " + B + " h"; }, rev: function (A, B) { return B + " h for $" + A; }, wrong: "$9 for the snack", wfb: "The snack price is a single amount, not a comparison of two amounts, so it is not the rate here." },
    { s: "A printer produced {A} pages in {B} min using 2 ink cartridges.", A: [30, 150], B: [2, 10], corr: function (A, B) { return A + " pages in " + B + " min"; }, rev: function (A, B) { return B + " min in " + A + " pages"; }, wrong: "2 ink cartridges", wfb: "The cartridge count is a single count, not a comparison of two amounts, so it is not the rate here." }
  ];
  var t = pick(tmpls), A = ri(t.A[0], t.A[1]), B = ri(t.B[0], t.B[1]);
  var corr = t.corr(A, B);
  var cands = [
    { t: t.rev(A, B), fb: "That reverses the comparison; the amount earned, moved or produced is described over the time it took." },
    { t: t.wrong, fb: t.wfb },
    { t: A + " to " + B + " as a ratio of the same kind", fb: "The two amounts here have different units, so together they form a rate, not a same-kind ratio." }
  ];
  var ds = u5pick3(corr, cands);
  var sol = "A rate is the pair of amounts with different units that go together in the example: \\[ \\begin{aligned} \\text{rate} &= \\text{two amounts measured in different units} \\end{aligned} \\] So the rate described is <b>" + corr + "</b>.";
  return mcq(t.s.replace("{A}", A).replace("{B}", B) + " Which pair of amounts gives the rate in this example?", { t: corr, fb: "Correct: those two amounts, with different units, are the ones compared in the example." }, ds, sol, { mode: "identify-rate", a: A, b: B });
}, ["A rate in an example is a pair of amounts with different units that belong together.", "First look for two amounts measured in different units that describe the same activity."]);

E("u7-pk-rate-problem", 7, ["4.9"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var u = ri(12, 28), h1 = ri(3, 9), h2 = ri(10, 20); if (h2 === h1) h2 += 3;
    var earned = u * h1, ans = u * h2;
    var sol = "Find the unit rate first, then use it for the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + earned + " \\div " + h1 + " = " + u + " \\text{ dollars per hour} \\\\ \\text{new earnings} &= " + u + " \\times " + h2 + " = " + ans + " \\end{aligned} \\] So the earnings are <b>$" + ans + "</b>.";
    return numq("Sam earned $" + earned + " for " + h1 + " h of work at a steady rate. At the same rate, how much will Sam earn for " + h2 + " h of work, in dollars?", ans, 0.01, sol, { mode: "rate-earn", u: u });
  }
  if (mode === 1) {
    var sp = pick([40, 50, 60, 70, 80, 90, 100]), t1 = ri(2, 5), D = sp * ri(3, 7), ansT = D / sp;
    var dist1 = sp * t1;
    var sol2 = "The speed is the unit rate, and time is distance divided by that rate: \\[ \\begin{aligned} \\text{time} &= " + D + " \\div " + sp + " = " + ansT + " \\text{ h} \\end{aligned} \\] So the trip takes <b>" + ansT + " h</b>.";
    return numq("A bus travels at a steady speed. It covers " + dist1 + " km in " + t1 + " h. At the same speed, how many hours will it take to travel " + D + " km?", ansT, 0.01, sol2, { mode: "rate-speed", sp: sp });
  }
  var u3 = ri(3, 12), m1 = ri(2, 8), m2 = ri(9, 20), vol = u3 * m1, ans3 = u3 * m2;
  var sol3 = "Find the flow per minute first, then multiply by the new time: \\[ \\begin{aligned} \\text{unit rate} &= " + vol + " \\div " + m1 + " = " + u3 + " \\text{ L per min} \\\\ \\text{new volume} &= " + u3 + " \\times " + m2 + " = " + ans3 + " \\end{aligned} \\] So the volume is <b>" + ans3 + " L</b>.";
  return numq("A hose delivers " + vol + " L of water in " + m1 + " min at a steady rate. At the same rate, how many litres will it deliver in " + m2 + " min?", ans3, 0.01, sol3, { mode: "rate-flow", u: u3 });
}, ["Every rate problem starts from the unit rate: the amount for one unit of the second quantity.", "First divide to get the amount per single hour, kilometre or minute in the problem."]);

E("u7-pk-unit-rate-cost", 7, ["4.9"], 2, "gen", function(){
  var goods=[["muffins","muffin"],["juice boxes","juice box"],["granola bars","granola bar"],["yogurt cups","yogurt cup"],["bagels","bagel"]];
  var g=pick(goods);
  var q1=pick([4,5,8,10,20,25]);
  var unit=pick([0.75,1.25,1.5,1.75,2.25,2.5,3.25,3.5,4.75]);
  var C=u5r2(q1*unit);
  var q2=ri(3,30); if(q2===q1) q2=q1+3;
  var ans=u5r2(unit*q2);
  return numq("A pack of "+q1+" "+g[0]+" costs $"+fmtF(C,2)+". At this rate, what is the cost of "+q2+" "+g[0]+", in dollars?", ans, 0.01,
    "Find the cost of one "+g[1]+" first: \\[ \\begin{aligned} \\text{unit rate} &= "+fmtF(C,2)+" \\div "+q1+" \\\\ &= "+fmtF(unit,2)+" \\text{ dollars per "+g[1]+"} \\end{aligned} \\] Then multiply by the new quantity: \\("+fmtF(unit,2)+" \\times "+q2+" = "+fmtF(ans,2)+"\\). The answer is <b>$"+fmtF(ans,2)+"</b>.",
    {mode:"unit-rate-cost", q1:q1, q2:q2});
}, ["The cost per single item is the bridge between the two quantities.", "Divide the pack cost by the pack size to get the unit rate, then multiply by the new quantity."]);

E("u7-pk-similar-check", 7, ["4.17"], 1, "gen", function(){
  var w=ri(2,9), h=ri(2,8), k=pick([2,3]), similar=Math.random()<0.5, w2, h2, tries=0;
  if(similar){ w2=w*k; h2=h*k; } else { w2=w*k; h2=h*k+ri(1,3); }
  var prompt="Rectangle A is "+w+" cm wide and "+h+" cm high. Rectangle B is "+w2+" cm wide and "+h2+" cm high. Are the two rectangles similar?";
  var sol="Compare the ratios of corresponding sides. Widths: \\("+w2+" \\div "+w+" = "+fmt(w2/w)+"\\). Heights: \\("+h2+" \\div "+h+" = "+fmt(h2/h)+"\\) . ";
  var q;
  if(similar){
    sol+="The ratios are equal and all angles are right angles, so the rectangles are <b>similar</b>.";
    q=mcq(prompt, {t:"Yes. The corresponding sides are in the same ratio and the angles are equal.", fb:"Correct: both side ratios equal "+fmt(k)+", and rectangles have equal corresponding angles."},
      [ {t:"No. The corresponding sides are not in the same ratio.", fb:"Check again: "+w2+" / "+w+" and "+h2+" / "+h+" both equal "+fmt(k)+"."},
        {t:"No. Rectangle B is larger, so the two cannot be similar.", fb:"Size does not rule out similarity: an enlargement of a shape is similar to it."},
        {t:"Yes. Any two rectangles are similar because all their angles are right angles.", fb:"Equal angles alone are not enough reasoning here: the side ratios must also match, and in this case they do."} ], sol, {mode:"similar"});
  } else {
    sol+="The ratios differ, so the rectangles are <b>not similar</b>.";
    q=mcq(prompt, {t:"No. The corresponding sides are not in the same ratio.", fb:"Correct: the width ratio is "+fmt(w2/w)+" but the height ratio is "+fmt(h2/h)+"."},
      [ {t:"Yes. The corresponding sides are in the same ratio and the angles are equal.", fb:"The angles are equal, but the side ratios are not: "+fmt(w2/w)+" versus "+fmt(h2/h)+"."},
        {t:"Yes. Any two rectangles are similar because all their angles are right angles.", fb:"Equal angles are not enough: corresponding sides must also be in the same ratio, and here they are not."},
        {t:"No. Rectangle B is larger, so size alone rules out similarity.", fb:"The verdict is right but the reason is wrong: larger shapes can be similar. The side ratios are what fail here."} ], sol, {mode:"notsimilar"});
  }
  q.figure=u7FigPair(w,h,"A: "+w+" by "+h, w2,h2,"B: "+w2+" by "+h2);
  return q;
}, ["Similar shapes need equal corresponding angles and corresponding sides in the same ratio.", "Divide the width of B by the width of A, then do the same for the heights, and compare."]);

E("u7-pk-corresponding-sides", 7, ["4.17"], 2, "gen", function(){
  var k=pick([2,3,4]), a1=ri(3,12), a2=ri(3,12), b1=a1*k, b2=a2*k, fromB=Math.random()<0.5;
  var prompt="Polygons A and B are similar. In polygon A, two sides measure "+a1+" cm and "+a2+" cm. The corresponding sides in polygon B measure "+b1+" cm and "+b2+" cm. What is the scale factor "+(fromB?"from B to A":"from A to B")+"?";
  var ans=fromB?1/k:k;
  var sol="Each B side divided by the matching A side gives the same value: \\("+b1+" \\div "+a1+" = "+k+"\\) and \\("+b2+" \\div "+a2+" = "+k+"\\). "+(fromB?"Going from B back to A uses the reciprocal, \\(1 \\div "+k+" = "+fmtF(1/k,2)+ "\\).":"")+" The scale factor is <b>"+fmtF(ans,2)+"</b>.";
  var opts=[ {t:fmtF(fromB?k:1/k,2), fb:"That is the scale factor in the opposite direction."},
             {t:String(b1-a1), fb:"That is the difference between the sides. A scale factor is a ratio, found by dividing, not subtracting."},
             {t:fmtF(k+0.5,2), fb:"Check the division: "+b1+" divided by "+a1+" is "+k+", not "+fmtF(k+0.5,2)+"."} ];
  var _bo0=balOpts({t:fmtF(ans,2), fb:"Correct: corresponding sides of similar polygons are all in the one ratio."}, opts); var q=mcq(prompt, _bo0[0], _bo0[1], sol, {k:k, fromB:fromB}); q.figure=u7FigPair(a1,a2,"A: "+a1+" and "+a2, b1,b2,"B: "+b1+" and "+b2); return q;
}, ["Corresponding sides of similar polygons are all in the same ratio.", "Divide a B side by its matching A side, then check the direction the question asks for."]);

E("u7-pk-similar-missing-side", 7, ["4.14"], 2, "gen", function(){
  var ctxs=[ {n:"a photo enlargement", u:"cm"}, {n:"a model of a fishing stage", u:"cm"}, {n:"a blueprint of a shed", u:"cm"}, {n:"a trail map drawing", u:"cm"}, {n:"a scaled drawing of a wharf", u:"cm"} ];
  var c=pick(ctxs), k=pick([2,3]), a=ri(2,10), b=a*k, s=ri(3,15), x=s*k;
  var prompt="In "+c.n+", the small figure and the large figure are similar. A side of "+a+" "+c.u+" on the small figure matches a side of "+b+" "+c.u+" on the large figure. Another side of the small figure measures "+s+" "+c.u+". What is the matching side length on the large figure, in "+c.u+"?";
  var sol="The scale factor is \\("+b+" \\div "+a+" = "+k+"\\), so multiply the small side by the same factor: \\[ "+s+" \\times "+k+" = "+x+" \\] The matching side is <b>"+x+" "+c.u+"</b>.";
  var _bo0=balOpts({t:String(x), fb:"Correct: scale factor "+k+" applied to "+s+" gives "+x+"."}, [ {t:String(s+(b-a)), fb:"That adds the difference of the known pair. Similarity scales by multiplying, not by adding."},
      {t:fmtF(s/k,2), fb:"That divides by the scale factor, which is the direction for going from large back to small."},
      {t:String(s+k), fb:"That adds the scale factor to the side. The scale factor multiplies the side instead."} ]); var q=mcq(prompt, _bo0[0], _bo0[1], sol, {k:k,s:s});
  q.figure=u7FigPair(a,s,"small: "+a+" and "+s, b,x,"large: "+b+" and ?");
  return q;
}, ["Find the scale factor from the pair of sides you know first.", "Divide the large known side by the small known side, then multiply the other small side by that factor."]);

E("u7-pk-scale-apply", 7, ["4.14"], 2, "gen", function () {
  var k = pick([1.5, 2, 2.5, 3]);
  var o1 = pick([6, 8, 10, 12]);
  var i1 = o1 * k;
  var o2 = pick([5, 7, 9, 11, 14]);
  var ans = Math.round(o2 * k * 100) / 100;
  var ctx = pick([
    "A poster is an enlargement of a drawing. One side of the drawing is " + o1 + " cm and the matching side of the poster is " + fmt(i1) + " cm. Another side of the drawing is " + o2 + " cm. How long is the matching side of the poster, in centimetres?",
    "A banner is an enlargement of a logo. One side of the logo is " + o1 + " cm and the matching side of the banner is " + fmt(i1) + " cm. Another side of the logo is " + o2 + " cm. How long is the matching side of the banner, in centimetres?"
  ]);
  var sol = "Find the scale factor from the known pair first, then apply it to the second side: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(i1) + " \\div " + o1 + " = " + fmt(k) + " \\\\ \\text{new side} &= " + o2 + " \\times " + fmt(k) + " = " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " cm</b>.";
  var q = numq(ctx, ans, 0.01, sol, { mode: "gap-scale-apply", k: k });
  q.figure = solBarsFig([{ name: "Original", len: o1, lab: fmt(o1) + " cm" }, { name: "Image", len: i1, lab: fmt(i1) + " cm" }, { name: "Original", len: o2, lab: fmt(o2) + " cm" }, { name: "Image", len: ans, lab: "?" }], "Matching sides of an original and its image as bars");
  return q;
}, ["The scale factor is not stated; it must be recovered from the pair of matching sides first.", "Divide the image side by its matching original side as the first step."]);

/* PK tranche metadata pass for Unit 7. The tranche's own entries are flagged here.  */
var PKT_U7_FOR=["4.1","4.2","4.3","4.4","4.5","4.6","4.7","4.8","4.9","4.13","4.14","4.15","4.16","4.17","2.1","2.2","2.3","2.4","2.5","2.6"];
var PKT_U7={
 "u7-pk-express-rate":{src:"math-8:3.16",group:"rate"},
 "u7-pk-identify-rate":{src:"math-8:3.17",group:"rate"},
 "u7-pk-rate-problem":{src:"math-8:6.29",group:"rate"},
 "u7-pk-unit-rate-cost":{src:"math-8:6.29",group:"rate"},
 "u7-pk-similar-check":{src:"math-1202:3.60",group:"similarity"},
 "u7-pk-corresponding-sides":{src:"math-1202:3.62",group:"similarity"},
 "u7-pk-similar-missing-side":{src:"math-1202:3.64",group:"scale"},
 "u7-pk-scale-apply":{src:"math-9:10.17",group:"scale"}
};
BANK.forEach(function(e){var t=PKT_U7[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U7_FOR.slice();e.pkGroup=t.group;}});

/* ===== Distinctness guard for u7-pk-similar-missing-side (borrowed from Mathematics 1202's u7-similar-missing-side-mc, whose bank wraps the generator in the identical guard; placed after the entry so the pass runs on the registered entry). ===== */
(function(){var e=BANK.filter(function(x){return x.id==="u7-pk-similar-missing-side";})[0];if(!e)return;var inner=e.gen;e.gen=function(){var q=inner(),tries=0;while(q&&q.options&&new Set(q.options.map(function(o){return String(o).trim();})).size<4&&tries<60){q=inner();tries++;}return q;};})();
