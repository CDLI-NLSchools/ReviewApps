// Math 3202 Unit 2 Linear Relationships question bank
// CRMARKS: u2-cr-table-value=3
// CRMARKS: u2-cr-slope-rate=4
// CRMARKS: u2-cr-solve-input=5
// CRMARKS: u2-cr-write-equation=4
// CRMARKS: u2-cr-budget-solve=5
/* ===== Unit 2 ===== */
/* Math 3202 Unit 2: Linear Relationships. Helpers prefixed u2. Codes from ind-unit2.json. */
function u2Gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=a%b; a=b; b=t; } return a||1; }
function u2Frac(n,d){ if(d<0){n=-n;d=-d;} var g=u2Gcd(n,d); n/=g; d/=g; return d===1?String(n):(n+"/"+d); }
function u2EqTex(m,b,v){ v=v||"x"; var s="y = "; if(m===1)s+=v; else if(m===-1)s+="-"+v; else s+=m+v; if(b>0)s+=" + "+b; else if(b<0)s+=" - "+(-b); return s; }
function u2GridFig(xMax,yMax,pts,line,curve,xLab,yLab){
  var W=252,H=224,ox=36,oy=182,sx=(W-ox-14)/xMax,sy=(oy-24)/yMax;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  var yStep=yMax>12?2:1;
  for(var gy=0;gy<=yMax;gy+=yStep){ var Y=oy-gy*sy; s+='<line x1="'+ox+'" y1="'+fmt(Y,1)+'" x2="'+(W-10)+'" y2="'+fmt(Y,1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+(ox-5)+'" y="'+fmt(Y+3,1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+gy+'</text>'; }
  for(var gx=0;gx<=xMax;gx++){ var X=ox+gx*sx; s+='<line x1="'+fmt(X,1)+'" y1="18" x2="'+fmt(X,1)+'" y2="'+oy+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+fmt(X,1)+'" y="'+(oy+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+gx+'</text>'; }
  s+='<line x1="'+ox+'" y1="18" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(W-10)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  function PX(x){ return fmt(ox+x*sx,1); } function PY(y){ return fmt(oy-y*sy,1); }
  if(line){ s+='<line x1="'+PX(line[0])+'" y1="'+PY(line[1])+'" x2="'+PX(line[2])+'" y2="'+PY(line[3])+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>'; }
  if(curve&&curve.length>1){ var d=""; curve.forEach(function(p,i){ d+=(i===0?"M ":"L ")+PX(p[0])+" "+PY(p[1])+" "; }); s+='<path d="'+d+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2.2"/>'; }
  if(pts)pts.forEach(function(p){ s+='<circle cx="'+PX(p[0])+'" cy="'+PY(p[1])+'" r="4" fill="'+FIG_ACC+'"/>'; if(p[2])s+='<text x="'+fmt(ox+p[0]*sx+8,1)+'" y="'+fmt(oy-p[1]*sy-8,1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'">'+p[2]+'</text>'; });
  if(xLab) s+='<text x="'+fmt(ox+xMax*sx/2,1)+'" y="'+(H-2)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+xLab+'</text>';
  if(yLab) s+='<text x="11" y="'+fmt(oy-yMax*sy/2,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" transform="rotate(-90 11 '+fmt(oy-yMax*sy/2,1)+')">'+yLab+'</text>';
  return s+'</svg>';
}
function u2TableFig(rows){
  var cols=rows[0].length, W=300, rowH=28, H=rows.length*rowH+16, colW=(W-20)/cols;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  rows.forEach(function(r,i){ var y=8+i*rowH;
    s+='<rect x="10" y="'+y+'" width="'+(W-20)+'" height="'+rowH+'" fill="'+(i===0?FIG_SHADE:"none")+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    r.forEach(function(c,j){ var x=10+j*colW; if(j>0)s+='<line x1="'+fmt(x,1)+'" y1="'+y+'" x2="'+fmt(x,1)+'" y2="'+(y+rowH)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
      s+='<text x="'+fmt(x+colW/2,1)+'" y="'+(y+rowH/2+4)+'" font-size="12" '+(i===0?'font-weight="bold" ':"")+'fill="'+FIG_INK+'" text-anchor="middle">'+c+'</text>'; });
  });
  return s+'</svg>';
}

E("u2-linear-characteristics", 2, ["2.1"], 1, "gen", function(){
  var mode=ri(1,3);
  if(mode===1){
    var m=pick([-1,1,2]); var b=m>0?pick([0,1,2,3,4,5]):pick([6,8,9,10,11]);
    var scenesC=[
      {txt:"hours worked and pay earned", xl:"hours", yl:"pay ($)"},
      {txt:"time and the distance a bus has travelled", xl:"time (h)", yl:"distance (km)"},
      {txt:"filling time and the volume of water in a tank", xl:"time (min)", yl:"volume (L)"},
      {txt:"weeks and the height of a sunflower", xl:"weeks", yl:"height (cm)"}
    ];
    var scC=pick(scenesC);
    var yMax=0; var pts=[]; for(var x=0;x<=4;x++){ var y=m*x+b; pts.push([x,y]); if(y>yMax)yMax=y; }
    yMax+=1;
    var q=mcq("The graph shows a relation between "+scC.txt+". Which statement describes a characteristic of this linear relation?",
      {t:"The graph is a straight line, and equal steps in \\(x\\) give equal steps in \\(y\\).", fb:"Yes: a straight line with a constant step pattern is the mark of a linear relation."},
      [{t:"The graph curves, and the steps in \\(y\\) keep growing larger at each step.", fb:"The graph shown is straight, not curved."},
       {t:"The graph is a straight line, but the steps in \\(y\\) double each time \\(x\\) increases by 1.", fb:"On a straight line the steps stay equal: they do not double."},
       {t:"The points jump randomly from place to place with no pattern in the steps at all.", fb:"The points lie on a straight line with a regular step pattern."}],
      "A linear relation graphs as a straight line. Here each increase of 1 in \\(x\\) changes \\(y\\) by "+m+" every time. The answer is <b>the graph is a straight line with equal steps in \\(y\\)</b>.",
      {mode:1,m:m,b:b});
    q.figure=u2GridFig(5,yMax,pts,[0,b,4,4*m+b],null,scC.xl,scC.yl);
    return q;
  }
  if(mode===2){
    var m2=pick([1,2,3,4,5]); var b2=pick([0,1,2,3,5,7,10]);
    var xs=[0,1,2,3,4]; var rows=[["x"].concat(xs.map(String)),["y"].concat(xs.map(function(x){return String(m2*x+b2);}))];
    var q2=mcq("The table of values shows a relation. Which statement describes a characteristic of this linear relation?",
      {t:"The first differences are constant: \\(y\\) changes by "+m2+" each step.", fb:"Yes: constant first differences are the table mark of a linear relation."},
      [{t:"The first differences grow by "+m2+" each step, getting larger as the table goes on.", fb:"The differences stay at "+m2+": they do not grow."},
       {t:"The values of \\(y\\) are all the same at every step of the table.", fb:"The \\(y\\) values increase by "+m2+" each step."},
       {t:"There is no pattern connecting \\(x\\) and \\(y\\) anywhere in the table.", fb:"There is a clear pattern: add "+m2+" to \\(y\\) at each step."}],
      "\\[ \\begin{aligned} \\text{First differences} &= "+m2+",\\ "+m2+",\\ "+m2+",\\ "+m2+" \\end{aligned} \\] Constant first differences mean the relation is linear. The answer is <b>the first differences are constant at "+m2+"</b>.",
      {mode:2,m:m2,b:b2});
    q2.figure=u2TableFig(rows);
    return q2;
  }
  var d=pick([2,3,4,5,6,7,8,9]); var a=pick([1,2,3,4,5,7,9,10,12,15,18,20]);
  var seq=[0,1,2,3].map(function(i){return a+i*d;});
  var subj=pick(["A number pattern","A tile pattern (tiles per figure)","A bead pattern (beads per row)","A savings pattern (dollars saved each week, cumulative)"]);
  return mcq(subj+" starts: "+seq.join(", ")+", ... Which statement describes a characteristic of this linear pattern?",
    {t:"Each term is found by adding the same amount, "+d+", to the term before it.", fb:"Yes: a constant change from term to term is the pattern mark of linear growth."},
    [{t:"Each term is found by multiplying the term before it by "+d+", over and over.", fb:"Multiplying would make the gaps grow: here the gap stays at "+d+"."},
     {t:"Each term adds a larger amount than the term before it, every time.", fb:"The added amount stays at "+d+" each time."},
     {t:"The terms increase and then decrease in a repeating cycle.", fb:"The terms increase steadily by "+d+"."}],
    "The gaps are "+seq[1]+" minus "+seq[0]+", "+seq[2]+" minus "+seq[1]+", and so on: each gap is "+d+". The answer is <b>each term adds the same amount, "+d+"</b>.",
    {mode:3,a:a,d:d});
}, ["Look for what stays the same: the straightness of the graph, the first differences, or the gap between terms.", "Start by checking how the values change from one step to the next."]);

E("u2-sort-one", 2, ["2.2"], 1, "gen", function(){
  var mode=ri(1,3);
  var combos=[
    {t:"Linear, because the change is constant.", key:"linConst"},
    {t:"Linear, because the change keeps growing.", key:"linGrow"},
    {t:"Nonlinear, because the change is constant.", key:"nonConst"},
    {t:"Nonlinear, because the change keeps growing.", key:"nonGrow"}
  ];
  function build(prompt, correctKey, solution, params, fig){
    var correct=combos.filter(function(c){return c.key===correctKey;})[0];
    var opts=combos.filter(function(c){return c.key!==correctKey;}).map(function(c){return {t:c.t, fb:"That pairing does not fit: check both the type and the change pattern."};});
    var q=mcq(prompt, {t:correct.t, fb:"Yes: the type and the change pattern both match."}, opts, solution, params);
    if(fig)q.figure=fig;
    return q;
  }
  if(mode===1){
    var linear=Math.random()<0.5;
    var a=pick([2,3,4,5,6,7,8,9,11,13,15,20]); var seq, key, sol;
    if(linear){ var d=pick([2,3,4,5,6,7,9]); seq=[0,1,2,3].map(function(i){return a+i*d;}); key="linConst"; sol="The gaps between terms are all equal, so the change is constant and the pattern is linear. The answer is <b>linear, because the change is constant</b>."; }
    else { var nk=ri(1,2); if(nk===1){ var r=pick([2,3]); seq=[0,1,2,3].map(function(i){return a*Math.pow(r,i);}); } else { seq=[0,1,2,3].map(function(i){return a+i*i;}); } key="nonGrow"; sol="The gaps between terms grow as the terms grow, so the change is not constant and the pattern is nonlinear. The answer is <b>nonlinear, because the change keeps growing</b>."; }
    return build("Sort this number pattern: "+seq.join(", ")+", ... Which sorting is correct?", key, sol, {mode:1,linear:linear?1:0}, null);
  }
  if(mode===2){
    var lin2=Math.random()<0.5; var m=pick([2,3,4,5]); var b=pick([1,3,4,6,9]);
    var x0=pick([0,1,2]); var xs=[x0,x0+1,x0+2,x0+3]; var ys=xs.map(function(x){return lin2?m*x+b:(x-x0)*(x-x0)+b;});
    var rows=[["x"].concat(xs.map(String)),["y"].concat(ys.map(String))];
    var fig=u2TableFig(rows);
    var key2=lin2?"linConst":"nonGrow";
    var sol2=lin2?"The first differences of the \\(y\\) values are constant, so the table shows a linear relation. The answer is <b>linear, because the change is constant</b>.":"The first differences of the \\(y\\) values grow from step to step, so the table shows a nonlinear relation. The answer is <b>nonlinear, because the change keeps growing</b>.";
    return build("Sort the relation shown in the table of values. Which sorting is correct?", key2, sol2, {mode:2,linear:lin2?1:0}, fig);
  }
  var lin3=Math.random()<0.5;
  var pts=[], curve=null, line=null, yMax3=10;
  if(lin3){ var mm=pick([1,2,3]); var bb=pick([0,1,2,3,4]); for(var x3=0;x3<=4;x3++)pts.push([x3,mm*x3+bb]); line=[0,bb,4,4*mm+bb]; yMax3=4*mm+bb+1; }
  else { var cf=pick([0.5,1]); for(var x4=0;x4<=4;x4++)pts.push([x4,Math.round(x4*x4*cf)]); curve=pts; pts=[]; yMax3=Math.round(16*cf)+1; }
  var fig3=u2GridFig(5,yMax3,pts,line,curve,"x","y");
  var combosG=[
    {t:"Linear, because the graph is a straight line.", key:"linStraight"},
    {t:"Linear, because the graph curves.", key:"linCurve"},
    {t:"Nonlinear, because the graph is a straight line.", key:"nonStraight"},
    {t:"Nonlinear, because the graph curves.", key:"nonCurve"}
  ];
  var key3=lin3?"linStraight":"nonCurve";
  var correct3=combosG.filter(function(c){return c.key===key3;})[0];
  var opts3=combosG.filter(function(c){return c.key!==key3;}).map(function(c){return {t:c.t, fb:"That pairing does not fit the graph shown: check the shape first, then the label."};});
  var q3=mcq("Sort the relation shown in the graph. Which sorting is correct?", {t:correct3.t, fb:"Yes: the shape and the label match."}, opts3,
    lin3?"The plotted points lie on a straight line, which is the graph of a linear relation. The answer is <b>linear, because the graph is a straight line</b>.":"The plotted points follow a curve that gets steeper, which is a nonlinear relation. The answer is <b>nonlinear, because the graph curves</b>.",
    {mode:3,linear:lin3?1:0});
  q3.figure=fig3;
  return q3;
}, ["Sort by the change pattern or the shape, not by whether the values get bigger.", "Start by finding how the values change from step to step, or whether the graph is straight."]);

E("u2-connect-points", 2, ["2.3"], 1, "var", varset([
  function(){ return mcq("A graph shows the volume of water in a tank as it fills over 20 minutes. Should the plotted points be connected?",
    {t:"Yes: the volume takes every value in between as the tank fills steadily, so the in-between points have meaning.", fb:"Yes: filling is continuous, so connecting shows real values."},
    [{t:"Yes: points on every graph must always be connected, whatever the graph is showing or how the values behave.", fb:"Connecting is a choice based on the context, not a rule for every graph."},
     {t:"No: water volume can only be a whole number of litres, so parts of a litre can never appear as the tank fills.", fb:"Volume is not restricted to whole litres while the tank fills."},
     {t:"No: time cannot be shown on a graph, because graphs can only display amounts of things, never times of events.", fb:"Time is a standard axis quantity and can take any value in the interval."}],
    "Filling a tank is continuous: at every moment there is a volume. The answer is <b>yes, connect the points</b>.", {}); },
  function(){ return mcq("A graph shows the number of students on a bus at each stop along a route. Should the plotted points be connected?",
    {t:"No: the count of students changes only in whole students at stops, so in-between points would not describe any real moment.", fb:"Yes: student counts are whole numbers that change at stops only."},
    [{t:"Yes: connecting the points shows the bus moving between stops. The line would trace the trip as the bus travels from stop to stop.", fb:"The graph shows counts at stops, not the bus position between stops."},
     {t:"Yes: all plotted points should be joined to make a line, since a graph is not finished until its points are connected.", fb:"Joining is decided by the context: counts of people are discrete."},
     {t:"No: a bus route cannot be graphed at all, because the number of students is not the kind of value a graph can show.", fb:"The counts at each stop can be graphed as separate points."}],
    "Counts of people are discrete: they jump by whole students at stops. The answer is <b>no, do not connect the points</b>.", {}); },
  function(){ return mcq("A graph shows the temperature of a cup of tea cooling over one hour, measured every 10 minutes. Should the points be connected?",
    {t:"Yes: the temperature exists at every moment between measurements and changes gradually, so the line shows real values.", fb:"Yes: cooling is continuous even though it was measured at intervals."},
    [{t:"No: only the measured moments had a temperature. Between measurements, the temperature simply did not exist to be shown.", fb:"The tea had a temperature at every moment, measured or not."},
     {t:"Yes: connecting points makes any graph more accurate, because joined points always give a truer picture.", fb:"Connecting is right here because the quantity is continuous, not because it improves any graph."},
     {t:"No: temperature must be counted in whole degrees, so fractions of a degree cannot be part of the record.", fb:"Temperature can take decimal values and changes gradually."}],
    "Temperature changes continuously, so in-between points represent real temperatures. The answer is <b>yes, connect the points</b>.", {}); },
  function(){ return mcq("A graph shows the total cost of buying concert tickets, for 1, 2, 3, 4 or 5 tickets. Should the points be connected?",
    {t:"No: tickets are bought in whole numbers, so a point at 2.5 tickets would have no meaning.", fb:"Yes: ticket counts are whole numbers only."},
    [{t:"Yes: cost changes steadily as the ticket count grows, smoothly, ticket by ticket.", fb:"Cost jumps by one ticket price at a time: there is no steady in-between growth."},
     {t:"Yes: a connected line is easier to read, so the points should always be joined up.", fb:"Ease of reading does not give in-between points meaning."},
     {t:"No: cost cannot be placed on a graph axis, because money is not a measurable quantity at all.", fb:"Cost is a standard axis quantity: the issue is whole tickets."}],
    "You cannot buy part of a ticket in this context, so only whole-number points have meaning. The answer is <b>no, do not connect the points</b>.", {}); },
  function(){ return mcq("A graph shows the distance a cyclist is from home over a 3 hour ride, recorded every 15 minutes. Should the points be connected?",
    {t:"Yes: the cyclist is at some distance from home at every moment of the ride, so the in-between points are real.", fb:"Yes: distance from home varies continuously during a ride."},
    [{t:"No: distance only exists when it is recorded, so unrecorded moments have no distance at all.", fb:"The cyclist has a position at every moment, recorded or not."},
     {t:"Yes: cyclists always travel at a constant speed, so their distance graph is a straight line throughout the whole ride.", fb:"Speed may vary: connecting is justified because position is continuous, not because speed is constant."},
     {t:"No: rides longer than one hour cannot be connected, because the points stop belonging to one trip.", fb:"Length of the ride does not change whether the quantity is continuous."}],
    "Position during a ride is continuous. The answer is <b>yes, connect the points</b>.", {}); },
  function(){ return mcq("A graph shows how many buses a school needs for field trips of different sizes, plotted against the number of students going. Should the points be connected?",
    {t:"No: the number of buses is a whole number that jumps up when a size limit is passed, so in-between points have no meaning.", fb:"Yes: both student groups and bus counts work in whole numbers with jumps."},
    [{t:"Yes: more students always means part of a bus can be used. A fraction of a bus is a real option when groups are split up for trips.", fb:"A school cannot send part of a bus: the count jumps by whole buses."},
     {t:"Yes: connecting shows the sizes in order, because joining the points is what arranges the group sizes neatly.", fb:"Ordering the points does not make in-between values meaningful."},
     {t:"No: field trip data should never be graphed, since counts of students and buses do not belong on graphs.", fb:"The data can be graphed as separate points."}],
    "Bus counts are whole numbers that jump, a discrete relation. The answer is <b>no, do not connect the points</b>.", {}); }
]), ["Ask whether the quantities can take values between the plotted points.", "Start by deciding whether each quantity is continuous or counted in whole units."]);

E("u2-slope-from-graph", 2, ["2.4"], 2, "gen", function(){
  var pairs=[[1,2],[1,3],[2,3],[3,2],[1,4],[3,4],[2,5],[4,3],[5,2],[2,1],[3,1],[4,1],[5,3],[3,5],[4,5],[5,4],[1,5]];
  var pr=pick(pairs); var dy=pr[0], dx=pr[1];
  var x1=pick([0,1,2]); var y1=pick([0,1,2,3,4]);
  var x2=x1+dx, y2=y1+dy;
  var xMax=x2+1, yMax=y2+2;
  var slope=u2Frac(dy,dx), recip=u2Frac(dx,dy), half=u2Frac(dy,2*dx), plus=u2Frac(dy+dx,dx);
  function O(t,fb){ return {t:"\\("+t+"\\)", fb:fb}; }
  var q=mcq("The graph shows a line through the marked points \\(("+x1+", "+y1+")\\) and \\(("+x2+", "+y2+")\\). What is the slope of the line?",
    O(slope,"Yes: slope is rise over run, "+dy+" over "+dx+"."),
    [O(recip,"That is run over rise: the ratio is flipped."),
     O(half,"That uses twice the run: check the horizontal change between the points."),
     O(plus,"That adds an extra run to the rise before dividing.")],
    "\\[ \\begin{aligned} \\text{Slope} &= \\frac{\\text{rise}}{\\text{run}} = \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = \\frac{"+dy+"}{"+dx+"} \\end{aligned} \\] The answer is <b>\\("+slope+"\\)</b>.",
    {x1:x1,y1:y1,x2:x2,y2:y2});
  q.figure=u2GridFig(xMax,yMax,[[x1,y1,"P"],[x2,y2,"Q"]],[Math.max(0,x1-0),y1,x2,y2],null,"x","y");
  return q;
}, ["Slope is a ratio of vertical change to horizontal change.", "Start by finding the rise and the run between the two marked points."]);

E("u2-slope-rate-context", 2, ["2.4"], 2, "gen", function(){
  var scenes=[
    {ctx:"A cleaner is paid for jobs by the hour. A  {X1} hour job paid ${Y1} in wages for the cleaning time, and a {X2} hour job paid ${Y2}.", unit:"dollars per hour", ms:[8,10,12,15,18,20,25]},
    {ctx:"A delivery van uses fuel steadily. After {X1} L of fuel it had gone {Y1} km, and after {X2} L it had gone {Y2} km.", unit:"kilometres per litre", ms:[10,12,15,18,20]},
    {ctx:"A snowplow clears driveways at a steady rate. In {X1} hours it cleared {Y1} driveways, and in {X2} hours it cleared {Y2} driveways.", unit:"driveways per hour", ms:[2,3,4,5,6]},
    {ctx:"A bakery sells muffins in trays at a steady price. {X1} trays cost ${Y1}, and {X2} trays cost ${Y2}.", unit:"dollars per tray", ms:[4,5,6,8,10,12]}
  ];
  var sc=pick(scenes); var m=pick(sc.ms);
  var x1=pick([1,2,3]); var x2=x1+pick([2,3,4]); var base=m*ri(0,3);
  var y1=m*x1+base, y2=m*x2+base;
  var prompt=sc.ctx.replace("{X1}",x1).replace("{Y1}",y1).replace("{X2}",x2).replace("{Y2}",y2)+" What is the rate of change, in "+sc.unit+"?";
  function O(v,fb){ return {t:fmt(v)+" "+sc.unit, fb:fb}; }
  var third=Math.round((y2/x2)*10)/10;
  var poolR=[
    {v:y2-y1, fb:"That is the total change in the second quantity, before dividing by the change in the first."},
    {v:m+2, fb:"That is 2 more than the rate: divide the changes to check."},
    {v:third, fb:"That divides one total by the other total at a single point, which mixes in the starting amount."},
    {v:m+7, fb:"That is 7 more than the rate: divide the changes to check."},
    {v:m+3, fb:"That is 3 more than the rate: divide the changes to check."},
    {v:m+11, fb:"That is 11 more than the rate: divide the changes to check."}
  ];
  var seenR={}; seenR[m]=1; var opts=[];
  poolR.forEach(function(c){ if(opts.length<3&&!seenR[c.v]){ seenR[c.v]=1; opts.push(O(c.v,c.fb)); } });
  return mcq(prompt, O(m,"Yes: the rate is the change in the second quantity divided by the change in the first."), opts,
    "\\[ \\begin{aligned} \\text{Rate} &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} = "+m+" \\end{aligned} \\] The answer is <b>"+m+" "+sc.unit+"</b>.",
    {m:m,x1:x1,x2:x2});
}, ["Rate of change compares how much the second quantity changes for each unit of the first.", "Start by subtracting to find the change in each quantity."]);

E("u2-direct-partial-equation", 2, ["2.5"], 2, "gen", function(){
  var direct=Math.random()<0.5;
  var m=pick([2,3,4,5,6,7,8,9,10,11,12,13,15,18,20,25]); var b=direct?0:pick([2,3,4,5,6,8,10,12,15,18,20,25,30,40,50]);
  var eq=u2EqTex(m,b);
  var combos=[
    {t:"Direct variation: the equation has no added constant, so the graph passes through the origin.", key:"dir"},
    {t:"Direct variation: the equation has a fixed starting value added on.", key:"dirFix"},
    {t:"Partial variation: the equation has no added constant, so the graph passes through the origin.", key:"parOrg"},
    {t:"Partial variation: the equation has a fixed starting value added on.", key:"par"}
  ];
  var key=direct?"dir":"par";
  var correct=combos.filter(function(c){return c.key===key;})[0];
  var opts=combos.filter(function(c){return c.key!==key;}).map(function(c){return {t:c.t, fb:"That statement mixes the label with the wrong feature: check whether an amount is added to the \\(x\\) term."};});
  return mcq("Identify the relationship in the equation \\("+eq+"\\).",
    {t:correct.t, fb:"Yes: the label and the reason both match the equation."}, opts,
    direct?"In \\("+eq+"\\) there is no added constant, so when \\(x = 0\\), \\(y = 0\\): the graph passes through the origin. The answer is <b>direct variation</b>.":"In \\("+eq+"\\) the added "+b+" is a fixed starting value, so when \\(x = 0\\), \\(y = "+b+"\\). The answer is <b>partial variation</b>.",
    {m:m,b:b,direct:direct?1:0});
}, ["Look at what happens when the input is zero.", "Start by checking whether the equation has an added constant term."]);

E("u2-direct-partial-graph", 2, ["2.5"], 2, "gen", function(){
  var direct=Math.random()<0.5;
  var scenesG=[
    {txt:"The graph shows pay against hours worked for a part-time job.", xl:"hours", yl:"pay ($)"},
    {txt:"The graph shows the total cost against the number of items bought.", xl:"items", yl:"cost ($)"},
    {txt:"The graph shows the distance travelled against time for a delivery bike.", xl:"time (h)", yl:"distance (km)"},
    {txt:"The graph shows the water in a tank against filling time.", xl:"time (min)", yl:"volume (L)"},
    {txt:"The graph shows a plant's height against weeks of growth.", xl:"weeks", yl:"height (cm)"}
  ];
  var scG=pick(scenesG);
  var m=pick([1,2,3]); var b=direct?0:pick([1,2,3,4,5,6]);
  var pts=[]; for(var x=0;x<=4;x++)pts.push([x,m*x+b]);
  var combos=[
    {t:"Direct variation: the line passes through the origin.", key:"dir"},
    {t:"Direct variation: the line starts above the origin.", key:"dirUp"},
    {t:"Partial variation: the line passes through the origin.", key:"parOrg"},
    {t:"Partial variation: the line starts above the origin.", key:"par"}
  ];
  var key=direct?"dir":"par";
  var correct=combos.filter(function(c){return c.key===key;})[0];
  var opts=combos.filter(function(c){return c.key!==key;}).map(function(c){return {t:c.t, fb:"That pairing does not match the graph: check where the line meets the \\(y\\) axis."};});
  var q=mcq(scG.txt+" Identify its type of variation.",
    {t:correct.t, fb:"Yes: where the line meets the \\(y\\) axis decides the type."}, opts,
    direct?"The line passes through \\((0, 0)\\), so there is no fixed starting value. The answer is <b>direct variation</b>.":"The line meets the \\(y\\) axis at \\((0, "+b+")\\), a fixed starting value of "+b+". The answer is <b>partial variation</b>.",
    {m:m,b:b,direct:direct?1:0});
  q.figure=u2GridFig(5,4*m+b+1,pts,[0,b,4,4*m+b],null,scG.xl,scG.yl);
  return q;
}, ["Variation type is decided by the starting value on the graph.", "Start by finding where the line meets the vertical axis."]);

E("u2-table-missing", 2, ["2.6"], 2, "gen", function(){
  var m=pick([2,3,4,5,6]); var b=pick([1,2,3,4,7,9]);
  var xs=[0,1,2,3,4]; var k=ri(1,4); var xk=xs[k]; var ans=m*xk+b;
  var rows=[["x"].concat(xs.map(String)),["y"].concat(xs.map(function(x,i){return i===k?"?":String(m*x+b);}))];
  function O(v,fb){ return {t:String(v), fb:fb}; }
  var pool=[
    {v:m*xk, fb:"That multiplies by the coefficient but leaves out the added "+b+"."},
    {v:m*(xk+b), fb:"That multiplies after adding, which reverses the order in the equation."},
    {v:xk+b, fb:"That adds the input and the added amount instead of following the equation."},
    {v:ans+m, fb:"That adds the coefficient "+m+" a second time after computing the value."},
    {v:b*xk, fb:"That uses the added amount "+b+" as the multiplier instead of the coefficient "+m+"."},
    {v:ans+2, fb:"That is 2 more than the substituted result: recheck the arithmetic."},
    {v:ans+5, fb:"That is 5 more than the substituted result: recheck the arithmetic."},
    {v:ans-3, fb:"That is 3 less than the substituted result: recheck the arithmetic."},
    {v:(m+1)*xk+b, fb:"That uses a coefficient of "+(m+1)+" instead of "+m+"."}
  ];
  var seenD={}; seenD[ans]=1; var opts=[];
  pool.forEach(function(c){ if(opts.length<3&&!seenD[c.v]){ seenD[c.v]=1; opts.push(O(c.v,c.fb)); } });
  var q=mcq("Use the equation \\("+u2EqTex(m,b)+"\\) and the table of values. What is the missing value of \\(y\\) when \\(x = "+xk+"\\)?",
    O(ans,"Yes: substitute "+xk+" into the equation and follow the order of operations."), opts,
    "\\[ \\begin{aligned} y &= "+m+"("+xk+") + "+b+" \\\\ &= "+(m*xk)+" + "+b+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {m:m,b:b,xk:xk});
  q.figure=u2TableFig(rows);
  return q;
}, ["A table of values is built by substituting each input into the equation.", "Start by putting the given input value into the equation."]);

E("u2-pattern-differences", 2, ["2.1","2.2"], 2, "gen", function(){
  var linear=Math.random()<0.5; var seq, desc;
  var ctxP=pick(["tile counts for five figures","bead counts in five rows of a design","block counts in five stacks","sticker counts on five pages","chair counts in five rows of a hall"]);
  if(linear){ var a=pick([3,4,5,6,7,8,9,11,12,14,16,18,21,25]); var d=pick([2,3,4,5,6,7,8,9,11]); seq=[0,1,2,3,4].map(function(i){return a+i*d;}); desc="gaps of "+d; }
  else { var kind=ri(1,3); if(kind===1){ var a2=pick([1,2,3,4,5,6]); seq=[0,1,2,3,4].map(function(i){return a2+i*i;}); } else if(kind===2){ var a3=pick([2,3,4,5,7,9]); seq=[a3,a3+2,a3+6,a3+12,a3+20]; } else { var a4=pick([1,2,3,5]); var r4=pick([2,3]); seq=[0,1,2,3,4].map(function(i){return a4*Math.pow(r4,i);}); } desc="growing gaps"; }
  var combos=[
    {t:"The first differences are constant, so the pattern is linear.", key:"constLin"},
    {t:"The first differences are constant, so the pattern is nonlinear.", key:"constNon"},
    {t:"The first differences change, so the pattern is linear.", key:"changeLin"},
    {t:"The first differences change, so the pattern is nonlinear.", key:"changeNon"}
  ];
  var key=linear?"constLin":"changeNon";
  var correct=combos.filter(function(c){return c.key===key;})[0];
  var opts=combos.filter(function(c){return c.key!==key;}).map(function(c){return {t:c.t, fb:"That pairing does not fit: compute the first differences first, then match the type."};});
  var diffs=[]; for(var i=1;i<seq.length;i++)diffs.push(seq[i]-seq[i-1]);
  return mcq("A pattern of "+ctxP+" is: "+seq.join(", ")+". Which statement about the pattern is correct?",
    {t:correct.t, fb:"Yes: the first differences are "+diffs.join(", ")+"."}, opts,
    "First differences: "+diffs.join(", ")+". "+(linear?"They are all equal, which is the mark of a linear pattern.":"They change, which is the mark of a nonlinear pattern.")+" The answer is <b>"+(linear?"the first differences are constant, so the pattern is linear":"the first differences change, so the pattern is nonlinear")+"</b>.",
    {linear:linear?1:0,seq:seq.join("/")});
}, ["First differences are the gaps between consecutive terms.", "Start by subtracting each term from the next one."]);

E("u2-write-equation-context", 2, ["2.8","2.5"], 2, "gen", function(){
  var scenes=[
    {txt:"A taxi ride charges a pickup fee of ${B} plus ${M} per kilometre driven. Let \\(d\\) be the distance in kilometres and \\(C\\) the total cost in dollars.", v:"d", out:"C"},
    {txt:"A plumber charges a call-out fee of ${B} plus ${M} per hour of work. Let \\(h\\) be the hours worked and \\(C\\) the total cost in dollars.", v:"h", out:"C"},
    {txt:"A gym charges a joining fee of ${B} plus ${M} per month. Let \\(m\\) be the number of months and \\(C\\) the total cost in dollars.", v:"m", out:"C"},
    {txt:"A hall rental charges a booking fee of ${B} plus ${M} per guest. Let \\(g\\) be the number of guests and \\(C\\) the total cost in dollars.", v:"g", out:"C"},
    {txt:"A phone plan charges a base fee of ${B} plus ${M} per gigabyte of extra data. Let \\(g\\) be the gigabytes used and \\(C\\) the total cost in dollars.", v:"g", out:"C"}
  ];
  var sc=pick(scenes); var M=pick([2,3,4,5,6,8,10,12,15]); var B=pick([10,15,20,25,30,40,50,60]);
  var gB=0; while(B===M&&gB++<30)B=pick([10,15,20,25,30,40,50,60]); if(B===M)B=M+10;
  var prompt=sc.txt.replace("{B}",B).replace("{M}",M)+" Which equation gives the total cost?";
  function E2(eq,fb){ return {t:"\\("+eq+"\\)", fb:fb}; }
  var correct=E2(sc.out+" = "+M+sc.v+" + "+B, "Yes: the rate multiplies the changing quantity and the fee is added once.");
  var opts=[
    E2(sc.out+" = "+B+sc.v+" + "+M, "That swaps the roles: the fee is charged once, not per unit."),
    E2(sc.out+" = "+M+sc.v+" - "+B, "The fee is added to the bill, not subtracted."),
    E2(sc.out+" = "+(M+B)+sc.v, "That charges the fee again for every unit.")
  ];
  return mcq(prompt, correct, opts,
    "The cost per unit, $"+M+", multiplies the number of units, and the one-time fee of $"+B+" is added. \\[ "+sc.out+" = "+M+sc.v+" + "+B+" \\] The answer is <b>\\("+sc.out+" = "+M+sc.v+" + "+B+"\\)</b>.",
    {M:M,B:B});
}, ["Separate the part that changes with the quantity from the part charged once.", "Start by identifying the rate and the one-time fee."]);

E("u2-apply-formula", 2, ["2.7"], 2, "gen", function(){
  var scenes=[
    {txt:"The cost of renting a boat is given by \\(C = {M}h + {B}\\), where \\(h\\) is the hours rented and \\(C\\) is the cost in dollars.", v:"h", unit:" dollars"},
    {txt:"The volume of water in a tank is given by \\(V = {M}t + {B}\\), where \\(t\\) is the minutes of filling and \\(V\\) is the volume in litres.", v:"t", unit:" litres"},
    {txt:"A worker's pay is given by \\(P = {M}h + {B}\\), where \\(h\\) is the hours worked and \\(P\\) is the pay in dollars, including a tool allowance in the added amount.", v:"h", unit:" dollars"},
    {txt:"The distance a bus has travelled is given by \\(D = {M}t + {B}\\), where \\(t\\) is the hours of travel and \\(D\\) is the distance in kilometres from the depot route start.", v:"t", unit:" kilometres"}
  ];
  var sc=pick(scenes); var M=pick([5,8,10,12,15,20,25,40,60]); var B=pick([10,20,30,50,80]);
  var x=pick([2,3,4,5,6,7,8]); var ans=M*x+B;
  var prompt=sc.txt.replace("{M}",M).replace("{B}",B)+" Find the value when \\("+sc.v+" = "+x+"\\).";
  function O(v,fb){ return {t:fmt(v), fb:fb}; }
  var poolA=[
    {v:M*x, fb:"That leaves out the added amount of "+B+"."},
    {v:M+B+x, fb:"That adds all three numbers instead of multiplying first."},
    {v:M*(x+B), fb:"That multiplies the added amount as well, which the formula does not do."},
    {v:ans+M, fb:"That adds the coefficient a second time after computing the value."},
    {v:ans+10, fb:"That is 10 more than the substituted result: recheck the arithmetic."}
  ];
  var seenA={}; seenA[ans]=1; var opts=[];
  poolA.forEach(function(c){ if(opts.length<3&&!seenA[c.v]){ seenA[c.v]=1; opts.push(O(c.v,c.fb)); } });
  return mcq(prompt, O(ans,"Yes: multiply first, then add."), opts,
    "\\[ \\begin{aligned} \\text{Value} &= "+M+"("+x+") + "+B+" \\\\ &= "+(M*x)+" + "+B+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+sc.unit+"</b>.",
    {M:M,B:B,x:x});
}, ["Applying a formula means substituting the given value and following the order of operations.", "Start by replacing the variable with the given value."]);

E("u2-cr-table-value", 2, ["2.6"], 2, "gen", function(){
  var m=pick([2,3,4,5,6,7]); var b=pick([1,3,4,6,8,11,14]); var x=pick([2,3,4,5,6,7,8,9]);
  var ans=m*x+b;
  return numq("For the linear relation \\("+u2EqTex(m,b)+"\\), a table of values is being built. Find the value of \\(y\\) when \\(x = "+x+"\\). Show your work.",
    ans, 0.01,
    "\\[ \\begin{aligned} y &= "+m+"("+x+") + "+b+" \\\\ &= "+(m*x)+" + "+b+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {m:m,b:b,x:x});
}, ["Substitute the given input into the equation.", "Start by replacing the variable with the given value, then multiply before adding."]);

E("u2-cr-slope-rate", 2, ["2.4"], 2, "gen", function(){
  var scenes=[
    {txt:"A tank held {Y1} L of water after {X1} minutes of filling and {Y2} L after {X2} minutes.", unit:"litres per minute"},
    {txt:"A worker earned ${Y1} for {X1} hours of work and ${Y2} for {X2} hours of work at the same hourly rate with the same bonus added each week.", unit:"dollars per hour"},
    {txt:"A cyclist was {Y1} km from the start after {X1} hours and {Y2} km from the start after {X2} hours, riding at a steady pace on a route that began partway along the trail.", unit:"kilometres per hour"}
  ];
  var sc=pick(scenes); var m=pick([3,4,5,6,8,10,12,15,20]);
  var x1=pick([1,2,3,4]); var x2=x1+pick([2,3,5]); var base=m*ri(0,4);
  var y1=m*x1+base, y2=m*x2+base;
  return numq(sc.txt.replace("{Y1}",y1).replace("{X1}",x1).replace("{Y2}",y2).replace("{X2}",x2)+" Find the rate of change, in "+sc.unit+". Show your work.",
    m, 0.01,
    "\\[ \\begin{aligned} \\text{Rate} &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} = "+m+" \\end{aligned} \\] The answer is <b>"+m+" "+sc.unit+"</b>.",
    {m:m,x1:x1,x2:x2});
}, ["Rate of change is the change in one quantity divided by the change in the other.", "Start by finding the change in each quantity between the two given points."]);

E("u2-cr-solve-input", 2, ["2.7"], 2, "gen", function(){
  var scenes=[
    {txt:"The total cost of a repair is given by \\(C = {M}h + {B}\\), where \\(h\\) is the hours of labour. The total bill is ${OUT}.", v:"hours of labour"},
    {txt:"The amount of water in a pool is given by \\(V = {M}t + {B}\\), where \\(t\\) is the minutes of filling. The pool holds {OUT} L at the moment checked.", v:"minutes of filling"},
    {txt:"A savings account balance is given by \\(S = {M}w + {B}\\), where \\(w\\) is the weeks of saving. The balance reaches ${OUT}.", v:"weeks of saving"}
  ];
  var sc=pick(scenes); var M=pick([5,8,10,12,15,20,25]); var B=pick([10,20,30,40,50,60,100]);
  var x=pick([3,4,5,6,7,8,9,10]); var out=M*x+B;
  return numq(sc.txt.replace("{M}",M).replace("{B}",B).replace("{OUT}",out)+" Find the value of the input variable (the "+sc.v+"). Show your work.",
    x, 0.01,
    "\\[ \\begin{aligned} "+out+" &= "+M+"x + "+B+" \\\\ "+out+" - "+B+" &= "+M+"x \\\\ "+(out-B)+" &= "+M+"x \\\\ x &= "+x+" \\end{aligned} \\] The answer is <b>"+x+"</b>.",
    {M:M,B:B,x:x});
}, ["Work backwards from the given output using inverse operations.", "Start by subtracting the added amount from the total."]);

E("u2-wide-mixed", 2, ["2.8","2.7","2.4"], 3, "gen", function(){
  var mode=ri(1,4);
  if(mode===1){
    var m=pick([1,2,3]); var b=pick([0,1,2,3,5]);
    var pts=[]; for(var x=0;x<=4;x++)pts.push([x,m*x+b]);
    function OE(mm,bb,fb){ return {t:"\\("+u2EqTex(mm,bb)+"\\)", fb:fb}; }
    var pool1=[
      {mm:b, bb:m, fb:"That swaps the slope and the intercept."},
      {mm:m, bb:b+2, fb:"The intercept shown on the graph is "+b+", not "+(b+2)+"."},
      {mm:m+1, bb:b, fb:"The line rises "+m+" for each step of 1, not "+(m+1)+"."},
      {mm:m, bb:b+1, fb:"The intercept shown on the graph is "+b+", not "+(b+1)+"."},
      {mm:m+2, bb:b, fb:"The line rises "+m+" for each step of 1, not "+(m+2)+"."}
    ];
    var seen1={}; seen1[u2EqTex(m,b)]=1; var opts=[];
    pool1.forEach(function(c){ var s=u2EqTex(c.mm,c.bb); if(opts.length<3&&!seen1[s]){ seen1[s]=1; opts.push(OE(c.mm,c.bb,c.fb)); } });
    var q=mcq("The graph shows a linear relation. Which equation describes it?",
      OE(m,b,"Yes: the line meets the vertical axis at "+b+" and rises "+m+" per step."), opts,
      "The intercept is "+b+" and the slope is rise over run, which is "+m+". \\[ "+u2EqTex(m,b)+" \\] The answer is <b>\\("+u2EqTex(m,b)+"\\)</b>.", {mode:1,m:m,b:b});
    q.figure=u2GridFig(5,4*m+b+1,pts,[0,b,4,4*m+b],null,"x","y");
    return q;
  }
  if(mode===2){
    var m2=pick([2,3,4,5]); var b2=pick([2,4,6,10,14]);
    var xs=[0,1,2,3]; var rows=[["x"].concat(xs.map(String)),["y"].concat(xs.map(function(x){return String(m2*x+b2);}))];
    var pool2=[
      {mm:b2, bb:m2, fb:"That swaps the starting value and the rate of change."},
      {mm:m2, bb:b2+m2, fb:"The starting value in the table (at \\(x = 0\\)) is "+b2+"."},
      {mm:m2+1, bb:b2, fb:"The first differences in the table are "+m2+", not "+(m2+1)+"."},
      {mm:m2, bb:b2+1, fb:"The starting value in the table (at \\(x = 0\\)) is "+b2+"."},
      {mm:m2+2, bb:b2, fb:"The first differences in the table are "+m2+", not "+(m2+2)+"."}
    ];
    var seen2={}; seen2[u2EqTex(m2,b2)]=1; var opts2=[];
    pool2.forEach(function(c){ var s=u2EqTex(c.mm,c.bb); if(opts2.length<3&&!seen2[s]){ seen2[s]=1; opts2.push({t:"\\("+s+"\\)", fb:c.fb}); } });
    var q2=mcq("The table of values shows a linear relation. Which equation describes it?",
      {t:"\\("+u2EqTex(m2,b2)+"\\)", fb:"Yes: the value at \\(x = 0\\) is the intercept and the first differences give the slope."}, opts2,
      "At \\(x = 0\\), \\(y = "+b2+"\\), so the intercept is "+b2+". The first differences are "+m2+", so the slope is "+m2+". \\[ "+u2EqTex(m2,b2)+" \\] The answer is <b>\\("+u2EqTex(m2,b2)+"\\)</b>.", {mode:2,m:m2,b:b2});
    q2.figure=u2TableFig(rows);
    return q2;
  }
  if(mode===3){
    var M=pick([6,9,11,14,18,22,30]); var B=pick([5,15,25,35,45]); var x3=pick([3,4,5,6,7,9]); var ans=M*x3+B;
    function O3(v,fb){ return {t:String(v), fb:fb}; }
    var pool3=[
      {v:M*x3, fb:"That leaves out the fixed "+B+"."},
      {v:(M+B)*x3, fb:"That charges the fixed amount every hour."},
      {v:M+B+x3, fb:"That only adds the three numbers."},
      {v:ans+M, fb:"That adds the hourly rate a second time after computing the cost."},
      {v:ans+15, fb:"That is 15 more than the substituted result: recheck the arithmetic."}
    ];
    var seen3={}; seen3[ans]=1; var opts3=[];
    pool3.forEach(function(c){ if(opts3.length<3&&!seen3[c.v]){ seen3[c.v]=1; opts3.push(O3(c.v,c.fb)); } });
    return mcq("A service charges according to \\(C = "+M+"h + "+B+"\\), where \\(h\\) is hours. What is the cost for "+x3+" hours?",
      O3(ans,"Yes: substitute and follow the order of operations."),
      opts3,
      "\\[ \\begin{aligned} C &= "+M+"("+x3+") + "+B+" \\\\ &= "+(M*x3)+" + "+B+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.", {mode:3,M:M,B:B,x:x3});
  }
  var M4=pick([7,9,13,16,24]); var B4=pick([12,18,24,36,48]); var x4=pick([3,4,5,6,8]); var out4=M4*x4+B4;
  function O4(v,fb){ return {t:String(v), fb:fb}; }
  var pool4=[
    {v:x4+2, fb:"That is 2 too many: check the division after subtracting "+B4+"."},
    {v:x4-1, fb:"That is 1 too few: "+(out4-B4)+" divided by "+M4+" is "+x4+"."},
    {v:Math.round(out4/M4), fb:"That divides the whole total by the rate and forgets the fixed amount."},
    {v:x4+4, fb:"That is 4 too many: subtract the fixed amount first, then divide."},
    {v:x4+1, fb:"That is 1 too many: "+(out4-B4)+" divided by "+M4+" is "+x4+"."}
  ];
  var seen4={}; seen4[x4]=1; var opts4=[];
  pool4.forEach(function(c){ if(opts4.length<3&&c.v>0&&!seen4[c.v]){ seen4[c.v]=1; opts4.push(O4(c.v,c.fb)); } });
  return mcq("A club's total cost is \\(C = "+M4+"n + "+B4+"\\), where \\(n\\) is the number of members on a trip. The total cost is "+out4+". How many members went?",
    O4(x4,"Yes: subtract the fixed amount, then divide by the per-member rate."),
    opts4,
    "\\[ \\begin{aligned} "+out4+" &= "+M4+"n + "+B4+" \\\\ n &= \\frac{"+out4+" - "+B4+"}{"+M4+"} = \\frac{"+(out4-B4)+"}{"+M4+"} = "+x4+" \\end{aligned} \\] The answer is <b>"+x4+"</b>.", {mode:4,M:M4,B:B4,x:x4});
}, ["Decide first whether the question gives a graph, a table, an output or an input.", "Start by pulling out the slope and the starting value, or the given value to substitute."]);

E("u2-cr-write-equation", 2, ["2.8","2.5"], 3, "gen", function(){
  var scenes=[
    {txt:"A kayak rental charges a deposit of ${B} plus ${M} per hour. Let \\(h\\) be the hours rented and \\(C\\) the total cost in dollars.", v:"h", out:"C"},
    {txt:"A moving company charges a truck fee of ${B} plus ${M} per kilometre. Let \\(d\\) be the kilometres driven and \\(C\\) the total cost in dollars.", v:"d", out:"C"},
    {txt:"A caterer charges a setup fee of ${B} plus ${M} per guest. Let \\(g\\) be the number of guests and \\(C\\) the total cost in dollars.", v:"g", out:"C"},
    {txt:"A ski rental charges a fitting fee of ${B} plus ${M} per day. Let \\(d\\) be the days rented and \\(C\\) the total cost in dollars.", v:"d", out:"C"}
  ];
  var sc=pick(scenes); var M=pick([4,6,8,9,10,12,15,18,20]); var B=pick([10,15,20,25,30,40,50]);
  var core=sc.out+" = "+M+sc.v+" + "+B;
  var accepted=[core, sc.out+"="+M+sc.v+"+"+B, sc.out+" = "+M+sc.v+"+"+B, sc.out+"="+M+sc.v+" + "+B, core.toLowerCase()];
  return textq(sc.txt.replace("{B}",B).replace("{M}",M)+" Write the equation for the total cost, in the form shown by this pattern: C = (rate)(variable) + (fee), using the variables named in the problem.",
    accepted,
    "The rate, $"+M+", multiplies the variable, and the one-time fee of $"+B+" is added once. This is partial variation because of the fixed fee. \\[ "+core+" \\] The answer is <b>"+core+"</b>.",
    {M:M,B:B});
}, ["Build the equation from a rate part and a fixed part.", "Start with the amount charged per unit times the variable."]);

E("u2-cr-budget-solve", 2, ["2.7","2.8"], 3, "gen", function(){
  var scenes=[
    {txt:"A trailer rental charges a booking fee of ${B} plus ${M} per day. A customer pays a total of ${OUT}.", v:"days", unit:"days"},
    {txt:"A boat tour charges a harbour fee of ${B} per booking plus ${M} per passenger. A booking totals ${OUT}.", v:"passengers", unit:"passengers"},
    {txt:"A print shop charges a setup fee of ${B} plus ${M} per poster. An order totals ${OUT}.", v:"posters", unit:"posters"},
    {txt:"A tutor charges a materials fee of ${B} plus ${M} per session. A student pays a total of ${OUT}.", v:"sessions", unit:"sessions"}
  ];
  var sc=pick(scenes); var M=pick([12,15,18,20,24,25,30,35,40]); var B=pick([15,20,25,30,40,50,60]);
  var x=pick([3,4,5,6,7,8,9]); var out=M*x+B;
  return numq(sc.txt.replace("{B}",B).replace("{M}",M).replace("{OUT}",out)+" First write an equation for the total, then find how many "+sc.v+" the total covers. Give the number of "+sc.unit+" as your answer and show your work.",
    x, 0.01,
    "\\[ \\begin{aligned} C &= "+M+"n + "+B+" \\\\ "+out+" &= "+M+"n + "+B+" \\\\ "+M+"n &= "+out+" - "+B+" = "+(out-B)+" \\\\ n &= "+x+" \\end{aligned} \\] The answer is <b>"+x+" "+sc.unit+"</b>.",
    {M:M,B:B,x:x});
}, ["Write the cost equation first, then solve it for the unknown count.", "Start by setting the total equal to the rate times the count plus the fee."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 2 (linear relationships: slope, rate and pattern readiness). Borrowed verbatim from Mathematics 2202 (u7-rise-run-intro, u7-slope-from-ramp, u7-slope-two-points, u7-error-slope, u7-rate-of-change-intro) and Mathematics 9 (u6-table-equation, u6-point-on-graph, u5-balance-model); feeder helper copies ride in bank-helpers.js. ===== */
E("u2-pk-rise-run", 2, ["2.4"], 1, "gen", function(){
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

E("u2-pk-slope-ramp", 2, ["2.4"], 2, "gen", function(){
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

E("u2-pk-slope-two-points", 2, ["2.4"], 2, "gen", function(){
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

E("u2-pk-error-slope", 2, ["2.7"], 2, "gen", function(){
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

E("u2-pk-rate-of-change", 2, ["2.4"], 1, "gen", function(){
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

E("u2-pk-table-equation", 2, ["2.6"], 2, "gen", function () {
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

E("u2-pk-point-on-graph", 2, ["2.1"], 1, "gen", function () {
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

E("u2-pk-balance-model", 2, ["2.7"], 1, "gen", function () {
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

/* PK tranche metadata pass for Unit 2. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U2_FOR=["2.1","2.2","2.3","2.4","2.5","2.6","2.7","2.8"];
var PKT_U2={
 "u2-pk-rise-run":{src:"math-2202:4.4",group:"slope"},
 "u2-pk-slope-ramp":{src:"math-2202:4.4",group:"slope"},
 "u2-pk-slope-two-points":{src:"math-2202:4.9",group:"slope"},
 "u2-pk-error-slope":{src:"math-2202:4.9",group:"slope"},
 "u2-pk-rate-of-change":{src:"math-2202:4.8",group:"rate-of-change"},
 "u2-pk-table-equation":{src:"math-9:7.4",group:"tables-and-graphs"},
 "u2-pk-point-on-graph":{src:"math-9:7.7",group:"tables-and-graphs"},
 "u2-pk-balance-model":{src:"math-9:8.17",group:"linear-equations"}
};
BANK.forEach(function(e){var t=PKT_U2[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U2_FOR.slice();e.pkGroup=t.group;}});
