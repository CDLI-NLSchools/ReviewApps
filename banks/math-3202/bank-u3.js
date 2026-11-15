// Math 3202 Unit 3 Graphing Data question bank
// CRMARKS: u3-interpolate-cr=3
// CRMARKS: u3-extrapolate-cr=4
// CRMARKS: u3-graph-reading-cr=5
// CRMARKS: u3-predict-advanced-cr=4
// CRMARKS: u3-scale-design-cr=5
/* ===== Unit 3 ===== */
/* Math 3202 Unit 3: Graphing Data (6.11-6.15). Helpers prefixed u3. */
function u3Plot(pts, xMax, yMax, xLab, yLab, line){
  var W=264,H=216,ox=38,oy=180,sx=(W-ox-12)/xMax,sy=(oy-22)/yMax;
  var xStep=xMax>10?2:1, yStep=yMax>50?10:(yMax>20?5:2);
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  for(var gy=0;gy<=yMax;gy+=yStep){ var Y=oy-gy*sy; s+='<line x1="'+ox+'" y1="'+fmt(Y,1)+'" x2="'+(W-10)+'" y2="'+fmt(Y,1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+(ox-5)+'" y="'+fmt(Y+3,1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+gy+'</text>'; }
  for(var gx=0;gx<=xMax;gx+=xStep){ var X=ox+gx*sx; s+='<line x1="'+fmt(X,1)+'" y1="18" x2="'+fmt(X,1)+'" y2="'+oy+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+fmt(X,1)+'" y="'+(oy+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+gx+'</text>'; }
  s+='<line x1="'+ox+'" y1="18" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(W-10)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  if(line){ var sp=pts.slice().sort(function(a,b){return a[0]-b[0];});
    for(var i=0;i<sp.length-1;i++){ s+='<line x1="'+fmt(ox+sp[i][0]*sx,1)+'" y1="'+fmt(oy-sp[i][1]*sy,1)+'" x2="'+fmt(ox+sp[i+1][0]*sx,1)+'" y2="'+fmt(oy-sp[i+1][1]*sy,1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; } }
  pts.forEach(function(p){ s+='<circle cx="'+fmt(ox+p[0]*sx,1)+'" cy="'+fmt(oy-p[1]*sy,1)+'" r="3.6" fill="'+FIG_ACC+'"/>'; });
  if(xLab) s+='<text x="'+fmt(ox+xMax*sx/2,1)+'" y="'+(H-2)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+xLab+'</text>';
  if(yLab) s+='<text x="11" y="'+fmt(oy-yMax*sy/2,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" transform="rotate(-90 11 '+fmt(oy-yMax*sy/2,1)+')">'+yLab+'</text>';
  return s+'</svg>';
}
function u3Noise(a){ return (Math.random()*2-1)*a; }
function u3NumDist(correct, cands, step){
  var out=[], seen={}; seen[fmt(correct)]=1;
  cands.forEach(function(c){ var k=fmt(c.v); if(out.length<3 && isFinite(c.v) && !seen[k]){ seen[k]=1; out.push({t:k, fb:c.fb}); } });
  var offs=[step,-step,2*step,-2*step,3*step,-3*step], i=0;
  while(out.length<3 && i<offs.length){ var v=correct+offs[i], k=fmt(v); i++;
    if(!seen[k]){ seen[k]=1; out.push({t:k, fb:"That value does not fit the pattern of the plotted points: check the reading or the calculation again."}); } }
  return out;
}
var u3Ctx=[
  {x:"Weeks", y:"Plants sold", who:"A garden centre in Mount Pearl records its sales over several weeks."},
  {x:"Days", y:"Cups of soup sold", who:"A cafe in Gander records its soup sales over several days."},
  {x:"Hours worked", y:"Items packed", who:"A warehouse in Corner Brook records packing over several shifts."},
  {x:"Weeks", y:"Lessons completed", who:"A music teacher in Clarenville records lessons over several weeks."},
  {x:"Days", y:"Trail passes sold", who:"A park office in Grand Falls-Windsor records trail passes over several days."},
  {x:"Months", y:"Members joined", who:"A community gym in Carbonear records new members over several months."},
  {x:"Weeks", y:"Bookings taken", who:"A tour operator in Twillingate records bookings over several weeks."},
  {x:"Days", y:"Repairs finished", who:"A bike shop in Stephenville records repairs over several days."}
];
function u3TrendPts(kind){
  var pts=[], i, x, y;
  for(i=0;i<9;i++){ x=i+1;
    if(kind==="inc") y=6+4.2*x+u3Noise(2.2);
    else if(kind==="dec") y=46-4.2*x+u3Noise(2.2);
    else if(kind==="linPos") y=5+4.5*x+u3Noise(2);
    else if(kind==="linNeg") y=47-4.5*x+u3Noise(2);
    else if(kind==="curve") y=4+0.55*x*x+u3Noise(1.2);
    else if(kind==="posStrong") y=5+4.6*x+u3Noise(1.1);
    else if(kind==="posWeak") y=10+3.4*x+u3Noise(6.5);
    else if(kind==="negStrong") y=47-4.6*x+u3Noise(1.1);
    else if(kind==="negWeak") y=42-3.4*x+u3Noise(6.5);
    else if(kind==="curveDown") y=48-0.55*x*x+u3Noise(1.2);
    else y=14+Math.random()*24;
    y=Math.max(1,Math.min(49,Math.round(y*10)/10)); pts.push([x,y]);
  }
  return pts;
}

E("u3-trend-describe", 3, ["6.11"], 1, "gen", function(){
  var ctx=pick(u3Ctx), kind=pick(["inc","dec","none"]);
  var pts=u3TrendPts(kind);
  var incT="As "+ctx.x.toLowerCase()+" increase, "+ctx.y.toLowerCase()+" tend to increase",
      decT="As "+ctx.x.toLowerCase()+" increase, "+ctx.y.toLowerCase()+" tend to decrease",
      noneT="There is no clear pattern linking "+ctx.x.toLowerCase()+" and "+ctx.y.toLowerCase(),
      curveT=ctx.y+" rise quickly at first, then fall back toward the start";
  var map={inc:{t:incT,fb:"Yes: the points climb from left to right, so the second quantity tends to grow with the first."},
           dec:{t:decT,fb:"Yes: the points fall from left to right, so the second quantity tends to shrink as the first grows."},
           none:{t:noneT,fb:"Yes: the points are scattered with no steady climb or fall from left to right."}};
  var all={inc:{t:incT,fb:"The points do not climb steadily: read the overall direction from left to right, not a few points."},
           dec:{t:decT,fb:"The points do not fall steadily: read the overall direction from left to right, not a few points."},
           none:{t:noneT,fb:"A pattern is present here: look at the overall direction of the cloud of points."},
           curve:{t:curveT,fb:"The points do not rise and then fall back: follow the overall direction across the whole plot."}};
  var keys=["inc","dec","none","curve"].filter(function(k){return k!==kind;});
  var opts=keys.map(function(k){return all[k];});
  var q=mcq(ctx.who+" The scatter plot shows "+ctx.y.toLowerCase()+" against "+ctx.x.toLowerCase()+". Which statement best describes the trend?",
    map[kind], opts,
    "Read the cloud of points from left to right and judge its overall direction, ignoring small wiggles. The trend is best described as follows: <b>"+map[kind].t+"</b>.",
    {kind:kind, ctx:ctx.who});
  q.figure=u3Plot(pts,10,50,ctx.x,ctx.y,false);
  return q;
}, ["Look at the overall direction of the points from left to right.", "Start by comparing the height of the points on the left with the height on the right."]);

E("u3-scatter-classify", 3, ["6.15"], 1, "gen", function(){
  var ctx=pick(u3Ctx), kind=pick(["linPos","linNeg","curve","none"]);
  var pts=u3TrendPts(kind);
  var correctTxt = kind==="none" ? "No trend" : (kind==="curve" ? "Nonlinear trend" : "Linear trend");
  var expl = kind==="none" ? "the points are scattered with no pattern to follow"
    : kind==="curve" ? "the points follow a curve that bends, not a straight band"
    : "the points follow a straight band from left to right";
  var cand=[
    {t:"Linear trend", fb:"A linear trend follows a straight band: check whether the points bend or scatter instead."},
    {t:"Nonlinear trend", fb:"A nonlinear trend follows a bending curve: check the shape the points make."},
    {t:"No trend", fb:"No trend means the points scatter with no pattern: check whether a pattern is present here."},
    {t:"A trend that cannot be sorted", fb:"Every scatter plot can be sorted as linear, nonlinear or no trend by the pattern its points make."}];
  var opts=cand.filter(function(c){return c.t!==correctTxt;});
  var q=mcq(ctx.who+" Sort this scatter plot by the trend it shows.",
    {t:correctTxt, fb:"Yes: "+expl+"."}, opts,
    "Sort by the pattern of the whole cloud of points. Here "+expl+". This scatter plot shows <b>"+correctTxt.toLowerCase()+"</b>.",
    {kind:kind});
  q.figure=u3Plot(pts,10,50,ctx.x,ctx.y,false);
  return q;
}, ["Decide whether the points follow a straight band, a curve, or no pattern.", "Start by tracing the overall shape of the cloud of points with your eye."]);

E("u3-context-graph-match", 3, ["6.13"], 1, "var", varset([
  function(){ var pts=[[0,2],[1,10],[2,18],[3,18],[4,18],[5,10],[6,2]];
    var q=mcq("The graph shows distance from home over time for one trip. Which trip does it match?",
      {t:"Walk to a shop, stay a while, then walk home", fb:"Yes: distance rises on the way there, stays level at the shop, then falls on the way home."},
      [{t:"Walk to a shop and stay there for the rest of the day", fb:"That trip would rise and then stay level: this graph falls back to the start at the end."},
       {t:"Drive in a circle around the block at a steady speed", fb:"That trip would keep changing distance in a repeating way: this graph has one rise, one level part and one fall."},
       {t:"Stay home all day and never leave the house", fb:"Staying home would keep the distance at zero the whole time: this graph rises well above zero."}],
      "The graph rises (moving away), levels off (staying at the shop), then falls back to zero (returning home). The answer is <b>Walk to a shop, stay a while, then walk home</b>.", {});
    q.figure=u3Plot(pts,6,20,"Time","Distance from home (km)",true); return q; },
  function(){ var pts=[[0,1],[1,4],[2,8],[3,11],[4,13],[5,14],[6,14]];
    var q=mcq("The graph shows the height of a tomato plant over several weeks. Which description matches the graph?",
      {t:"It grows quickly at first, then levels off", fb:"Yes: the graph climbs steeply early on and then flattens as growth slows."},
      [{t:"It grows by the same amount every week", fb:"Equal weekly growth would give a straight line: this graph bends and flattens."},
       {t:"It grows, then shrinks back to its first height", fb:"Shrinking back would bring the graph down to its starting height: this graph stays at its highest level."},
       {t:"It stays the same height for weeks, then grows", fb:"That would start flat and then climb: this graph climbs first and flattens later."}],
      "The height climbs fast in the early weeks and then the graph flattens, showing growth slowing to a stop. The answer is <b>It grows quickly at first, then levels off</b>.", {});
    q.figure=u3Plot(pts,6,16,"Weeks","Height (cm)",true); return q; },
  function(){ var pts=[[0,40],[1,32],[2,24],[3,16],[4,8],[5,2]];
    var q=mcq("The graph shows the fuel in a truck tank during a delivery run. Which description matches the graph?",
      {t:"Fuel is used steadily as the truck drives", fb:"Yes: the level falls in a steady straight line as fuel is burned."},
      [{t:"The tank is filled steadily at a depot", fb:"Filling would make the level rise: this graph falls the whole way."},
       {t:"The truck uses no fuel until the last hour", fb:"That would stay level and then drop at the end: this graph falls from the start."},
       {t:"Fuel rises and falls as the truck speeds up and slows down", fb:"This graph falls steadily in one direction: it never rises."}],
      "The fuel level falls steadily in a straight line, matching fuel being used at a steady rate. The answer is <b>Fuel is used steadily as the truck drives</b>.", {});
    q.figure=u3Plot(pts,5,50,"Hours","Fuel (L)",true); return q; },
  function(){ var pts=[[0,3],[1,9],[2,15],[3,21],[4,27],[5,33]];
    var q=mcq("The graph shows the water level in a tank as it is filled from a hose. Which description matches the graph?",
      {t:"The level rises by the same amount each minute", fb:"Yes: the graph is a straight rising line, so equal time steps add equal amounts."},
      [{t:"The level rises faster and faster each minute", fb:"That would give a curve bending upward: this graph is a straight line."},
       {t:"The level rises, then stays level while filling continues", fb:"Staying level would add a flat section: this graph rises the whole way."},
       {t:"The level starts high and drains away", fb:"Draining would make the graph fall: this graph rises from a low start."}],
      "A straight rising line means the same increase in each equal time step. The answer is <b>The level rises by the same amount each minute</b>.", {});
    q.figure=u3Plot(pts,5,40,"Minutes","Water level (cm)",true); return q; },
  function(){ var pts=[[0,18],[1,10],[2,4],[3,4],[4,10],[5,18]];
    var q=mcq("The graph shows the temperature in a greenhouse over one day. Which description matches the graph?",
      {t:"It cools, stays cold for a while, then warms up", fb:"Yes: the graph falls, levels off at its lowest, then rises back up."},
      [{t:"It warms steadily all day without a pause", fb:"Warming steadily would rise the whole way: this graph falls first."},
       {t:"It warms, stays warm for a while, then cools", fb:"That is the reverse shape: this graph starts by falling, not rising."},
       {t:"It stays at one temperature all day long", fb:"A constant temperature would be a flat line: this graph falls and rises."}],
      "The graph falls to a low level, stays there, then rises again. The answer is <b>It cools, stays cold for a while, then warms up</b>.", {});
    q.figure=u3Plot(pts,5,20,"Hours","Temperature",true); return q; },
  function(){ var pts=[[0,0],[1,6],[2,12],[3,12],[4,12],[5,12]];
    var q=mcq("The graph shows money in a savings account over several months. Which description matches the graph?",
      {t:"Deposits are made for two months, then the balance stays level", fb:"Yes: the balance rises while deposits are made, then flattens when they stop."},
      [{t:"Money is withdrawn steadily every month until the account is empty", fb:"Withdrawals would make the balance fall: this graph rises and then stays level."},
       {t:"The balance doubles every month as interest is added", fb:"Doubling would curve upward faster and faster: this graph rises straight, then flattens."},
       {t:"The balance stays level, then rises in the last month", fb:"That reverses the order: this graph rises first and levels off later."}],
      "The balance climbs for two months and then stays flat, matching deposits that stop after two months. The answer is <b>Deposits are made for two months, then the balance stays level</b>.", {});
    q.figure=u3Plot(pts,5,14,"Months","Balance ($)",true); return q; }
]), ["Read the shape of the graph in sections: rising, level or falling.", "Start by describing what the graph does from left to right in plain words."]);

E("u3-trend-strength", 3, ["6.11"], 2, "gen", function(){
  var ctx=pick(u3Ctx), kind=pick(["posStrong","posWeak","negStrong","negWeak"]);
  var pts=u3TrendPts(kind);
  var phrases={"posStrong":"Strong positive trend","posWeak":"Weak positive trend","negStrong":"Strong negative trend","negWeak":"Weak negative trend"};
  var why={"posStrong":"the points rise and hug a tight band","posWeak":"the points rise overall but spread widely around the rise",
           "negStrong":"the points fall and hug a tight band","negWeak":"the points fall overall but spread widely around the fall"};
  var opts=Object.keys(phrases).filter(function(k){return k!==kind;}).map(function(k){
    return {t:phrases[k], fb:"That choice gets the direction or the tightness wrong: judge both the direction and how tightly the points hug the pattern."}; });
  var q=mcq(ctx.who+" The scatter plot shows "+ctx.y.toLowerCase()+" against "+ctx.x.toLowerCase()+". Which description fits the trend best?",
    {t:phrases[kind], fb:"Yes: "+why[kind]+"."}, opts,
    "Judge two things: the direction of the pattern and how tightly the points follow it. Here "+why[kind]+". The answer is <b>"+phrases[kind]+"</b>.",
    {kind:kind});
  q.figure=u3Plot(pts,10,50,ctx.x,ctx.y,false);
  return q;
}, ["A trend description needs a direction and a strength.", "Start with the direction, then judge how tightly the points follow the pattern."]);

E("u3-interp-extrap-graph", 3, ["6.12"], 2, "gen", function(){
  var m=ri(2,4), b=ri(2,12), mode=pick(["interp","extrap"]);
  var pts=[]; for(var x=0;x<=5;x++) pts.push([x,m*x+b]);
  var yMax=Math.ceil((m*8+b)/10)*10;
  var xq = mode==="interp" ? pick([0.5,1.5,2.5,3.5,4.5]) : pick([6,7,8]);
  var ans=m*xq+b;
  var cands=[
    {v:m*Math.floor(xq)+b, fb:"That is the plotted value at the whole step just before: the question asks for a value using the pattern, so carry the pattern to the exact position asked."},
    {v:(m+1)*xq+b, fb:"That uses a steeper rise per step than the plotted points show: check the step pattern first."},
    {v:m*xq+b+m, fb:"That overshoots by one full step rise: apply the pattern once for the value asked, not an extra time."}];
  var opts=u3NumDist(ans,cands,m);
  var verb = mode==="interp" ? "Estimate" : "Predict, by extending the pattern,";
  var note = mode==="interp" ? "The value lies between two plotted points, so follow the pattern to the halfway position." : "The value lies beyond the plotted points, so extend the same pattern past the last point.";
  var _bo0=balOpts({t:fmt(ans), fb:"Yes: the plotted points rise by "+m+" litres each hour from a start of "+b+" litres, and that pattern gives "+fmt(ans)+" litres."}, opts); var q=mcq("A tank fills at a steady rate. The graph shows the volume of water after each hour. "+verb+" the volume after \\("+fmt(xq,1)+"\\) hours, in litres.", _bo0[0], _bo0[1],
    "The plotted points rise by \\("+m+"\\) litres per hour from \\("+b+"\\) litres. "+note+" \\[ \\begin{aligned} \\text{Volume} &= "+b+" + "+m+" \\times "+fmt(xq,1)+" \\\\ &= "+fmt(ans)+"\\text{ L} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" L</b>.",
    {m:m,b:b,xq:xq,mode:mode});
  q.figure=u3Plot(pts,5,yMax,"Hours","Volume (L)",true);
  return q;
}, ["Interpolation reads between plotted points; extrapolation extends the pattern beyond them.", "Start by finding how much the values rise from one plotted point to the next."]);

E("u3-context-match-gen", 3, ["6.13"], 2, "gen", function(){
  var shapes=[
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((3+2.6*x)*s*10)/10]); return p; },
     good:["Distance from a depot on a steady delivery drive","Water level in a tank filled at a steady rate","Savings balance with the same deposit each week"],
     why:"the graph rises steadily in a straight line"},
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((x<=3?3+5*x:18)*s*10)/10]); return p; },
     good:["Height of a plant that grows, then stops growing","Water level in a tank that fills, then stays full","Temperature of a room that warms, then holds steady"],
     why:"the graph rises and then levels off"},
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((x<=3?4+4.5*x:17.5-4.5*(x-3))*s*10)/10]); return p; },
     good:["Height of a ball thrown up and caught on the way down","Distance from home on a trip out and straight back","Temperature on a day that warms, then cools again"],
     why:"the graph rises and then falls"},
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((x<=3?20-4.5*x:6.5+4.5*(x-3))*s*10)/10]); return p; },
     good:["Water level in a tank drained, then refilled","Temperature on a night that cools, then warms at sunrise","Charge in a battery that is used, then recharged"],
     why:"the graph falls and then rises"},
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((20-2.8*x)*s*10)/10]); return p; },
     good:["Fuel left in a tank during a steady drive","Distance from home when walking straight back home","Money left in a gift card after steady spending"],
     why:"the graph falls steadily in a straight line"}];
  var si=ri(0,shapes.length-1), sh=shapes[si], scale=pick([0.8,0.9,1,1.1]);
  var pts=sh.pts(scale);
  var yMax=Math.ceil((Math.max.apply(null,pts.map(function(p){return p[1];}))+4)/5)*5;
  var correctTxt=pick(sh.good);
  var pool=[]; shapes.forEach(function(o,idx){ if(idx!==si) pool.push(pick(o.good)); });
  var opts=pool.slice(0,3).map(function(t){ return {t:t, fb:"That context would draw a different shape: compare its story with the rising, level and falling parts of this graph."}; });
  var q=mcq("The graph shows a quantity changing over time. Which context matches the shape of the graph?",
    {t:correctTxt, fb:"Yes: "+sh.why+", which matches that story."}, opts,
    "Describe the shape first: "+sh.why+". The context whose story follows that shape is the match. The answer is <b>"+correctTxt+"</b>.",
    {shape:si, scale:scale});
  q.figure=u3Plot(pts,6,yMax,"Time","Amount",true);
  return q;
}, ["Match the story to the shape, section by section.", "Start by saying whether the graph rises, levels off or falls in each part."]);

E("u3-create-scale", 3, ["6.14"], 2, "gen", function(){
  var nice=[1,2,5,10,20,25,50,100,200];
  var maxVal=0, intervals=5, idx=4, guard=0;
  while(guard++<200){ maxVal=ri(24,380); intervals=pick([4,5,6,8,10]); var raw=maxVal/intervals;
    idx=nice.findIndex(function(v){return v>=raw;});
    if(idx>=1 && idx<=nice.length-3) break;
    maxVal=86; intervals=5; idx=nice.findIndex(function(v){return v>=maxVal/intervals;}); }
  var inc=nice[idx];
  function T(v){ return fmt(v)+" units per grid line"; }
  var opts=[
    {t:T(nice[idx-1]), fb:"With that step the axis tops out below "+maxVal+", so the largest value would not fit on the graph."},
    {t:T(nice[idx+1]), fb:"That step fits, but it is larger than needed and squeezes the data into a small part of the axis."},
    {t:T(nice[idx+2]), fb:"That step is far larger than needed: the data would sit in a small corner of the graph."}];
  return mcq("A data set has a largest value of "+maxVal+". A graph axis is divided into "+intervals+" equal grid intervals. Which scale step is the best choice for the axis?",
    {t:T(inc), fb:"Yes: "+intervals+" steps of "+inc+" reach "+fmt(inc*intervals)+", the smallest tidy top that covers "+maxVal+"."}, opts,
    "The axis top must cover the largest value with a tidy step. \\("+intervals+" \\times "+inc+" = "+fmt(inc*intervals)+"\\), which covers "+maxVal+", and "+inc+" is the smallest tidy step that does so. The answer is <b>"+T(inc)+"</b>.",
    {maxVal:maxVal, intervals:intervals, inc:inc});
}, ["The scale step times the number of intervals must reach the largest value.", "Start by dividing the largest value by the number of intervals, then round up to a tidy step."]);

E("u3-create-type", 3, ["6.14"], 2, "gen", function(){
  var names=["Maya","Liam","Sofia","Noah","Ava","Lucas","Emma","Oliver"];
  var places=["Gander","Corner Brook","Mount Pearl","Clarenville","Stephenville","Carbonear","Twillingate","Marystown"];
  var kinds=[
    {type:"Bar graph", items:["goals scored by each team in a league","books borrowed in each genre at a library","vehicles of each colour in a parking lot","players in each age group at a tournament","meals of each kind sold at a canteen","dogs of each breed at a grooming shop"],
     fb:"Yes: the data compare separate categories, and bars make category comparisons clear."},
    {type:"Line graph", items:["temperature recorded each hour of a day","height of a sunflower measured each week","water level in a harbour recorded each day","weight of a puppy measured each month","snow depth recorded each week of winter","price of gas recorded each month"],
     fb:"Yes: the data show one quantity changing over time, and a line shows that change."},
    {type:"Scatter plot", items:["hours of practice and score for each player","temperature and hot drink sales for each day","age and resting heart rate for each volunteer","hours studied and quiz score for each student","rainfall and umbrella sales for each week","engine size and fuel use for each vehicle"],
     fb:"Yes: the data pair two number values for each case, and a scatter plot shows their relationship."},
    {type:"Circle graph", items:["share of a weekly budget spent on each item","share of votes for each candidate","share of a workday spent on each task","share of land used for each crop on a farm","share of team points scored by each player group","share of recycling made up of each material"],
     fb:"Yes: the data are parts of one whole, and a circle graph shows parts of a whole."}];
  var k=pick(kinds), item=pick(k.items), who=pick(names), place=pick(places);
  var types=["Bar graph","Line graph","Scatter plot","Circle graph"];
  var fbMap={"Bar graph":"A bar graph compares separate categories: it does not fit this data set.",
             "Line graph":"A line graph shows change over time: it does not fit this data set.",
             "Scatter plot":"A scatter plot pairs two number values for each case: it does not fit this data set.",
             "Circle graph":"A circle graph shows parts of one whole: it does not fit this data set."};
  var opts=types.filter(function(t){return t!==k.type;}).map(function(t){ return {t:t, fb:fbMap[t]}; });
  return mcq(who+" in "+place+" collects data on "+item+". Which graph type is the best choice to display this data?",
    {t:k.type, fb:k.fb}, opts,
    "Choose the graph by the kind of data: categories suit bars, change over time suits a line, paired numbers suit a scatter plot, and parts of a whole suit a circle graph. This data set calls for a <b>"+k.type.toLowerCase()+"</b>.",
    {type:k.type, item:item});
}, ["Choose the graph type from the kind of data, not from the topic.", "Start by asking whether the data are categories, change over time, paired numbers, or parts of a whole."]);

E("u3-interpolate-cr", 3, ["6.12"], 2, "gen", function(){
  var m=ri(2,5), b=ri(3,15);
  var xs=[0,1,2,3,4], ys=xs.map(function(x){return m*x+b;});
  var table="Hours: "+xs.join(", ")+" with volumes (L): "+ys.join(", ")+".";
  var ans=m*2.5+b;
  return numq("A tank fills at a steady rate. "+table+" Estimate the volume after 2.5 hours, in litres. Show your work on paper.",
    ans, 0.6,
    "The volumes rise by \\("+m+"\\) litres each hour, so halfway between hour 2 and hour 3 the volume is halfway between \\("+ys[2]+"\\) and \\("+ys[3]+"\\) litres. \\[ \\begin{aligned} \\text{Volume} &= "+b+" + "+m+" \\times 2.5 \\\\ &= "+fmt(ans)+"\\text{ L} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" L</b>.",
    {m:m,b:b});
}, ["Interpolation estimates a value between known values.", "Start by finding the hourly rise from the known values."]);

E("u3-extrapolate-cr", 3, ["6.12"], 2, "gen", function(){
  var m=ri(3,6), b=ri(2,12), xq=pick([6,7]);
  var xs=[0,1,2,3,4], ys=xs.map(function(x){return m*x+b;});
  var table="Weeks: "+xs.join(", ")+" with savings ($): "+ys.join(", ")+".";
  var ans=m*xq+b;
  return numq("A student saves at a steady rate. "+table+" Predict the savings after "+xq+" weeks, in dollars, by extending the pattern. Show your work on paper.",
    ans, 0.6,
    "The savings rise by $"+m+" each week from a start of $"+b+". Extending that pattern past the last known week gives the prediction. \\[ \\begin{aligned} \\text{Savings} &= "+b+" + "+m+" \\times "+xq+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>$"+ans+"</b>. Note: a prediction beyond the data is less certain than a value between known points, because the rate may change.",
    {m:m,b:b,xq:xq});
}, ["Extrapolation extends the pattern beyond the known values.", "Start by finding the weekly increase from the known values."]);

E("u3-graph-reading-cr", 3, ["6.11","6.12"], 2, "gen", function(){
  var h0=ri(4,8), g=ri(3,5);
  var plant=pick(["bean plant","tomato plant","sunflower","pea plant","corn plant","pumpkin vine"]);
  var grower=pick(["Maya","Liam","Sofia","Noah","Ava","Lucas"]);
  var startW=pick([0,1]), endH=pick([3.5,4.5,5.5]);
  var pts=[]; for(var w=0;w<=6;w++) pts.push([w,h0+g*w]);
  var yMax=Math.ceil((h0+g*6)/5)*5;
  var ans=(endH-startW)*g;
  var q=numq(grower+" grows a "+plant+". The graph shows its height at the end of each week. By how many centimetres does the plant grow between the end of week "+startW+" and week "+fmt(endH,1)+"? Give your answer in centimetres. Show your work on paper.",
    ans, 0.6,
    "The plant grows by \\("+g+"\\) cm each week. At week "+startW+" the height is \\("+fmt(h0+g*startW)+"\\) cm. At week "+fmt(endH,1)+" the pattern gives \\("+fmt(h0+g*endH)+"\\) cm. \\[ \\begin{aligned} \\text{Growth} &= "+fmt(h0+g*endH)+" - "+fmt(h0+g*startW)+" \\\\ &= "+fmt(ans)+"\\text{ cm} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" cm</b>.",
    {h0:h0,g:g,startW:startW,endH:endH,plant:plant});
  q.figure=u3Plot(pts,6,yMax,"Weeks","Height (cm)",true);
  return q;
}, ["Find both heights from the graph pattern, then subtract.", "Start by finding the weekly growth from two plotted points."]);

E("u3-trend-advanced", 3, ["6.11","6.15"], 3, "gen", function(){
  var ctx=pick(u3Ctx);
  var kind=pick(["posStrong","posWeak","negStrong","negWeak","curve","curveDown"]);
  var pts=u3TrendPts(kind);
  var isCurve=(kind==="curve"||kind==="curveDown");
  var dirWord=(kind==="negStrong"||kind==="negWeak"||kind==="curveDown")?"negative":"positive";
  var strWord=(kind==="posStrong"||kind==="negStrong")?"Strong":"Weak";
  var correctTxt = isCurve ? ("Nonlinear "+dirWord+" trend, curving "+(dirWord==="positive"?"upward":"downward"))
    : (strWord+" "+dirWord+" linear trend");
  var oppDir = dirWord==="positive"?"negative":"positive";
  var d1 = isCurve ? ("Linear "+dirWord+" trend in a straight band") : ("Nonlinear "+dirWord+" trend that curves");
  var d2 = isCurve ? ("Nonlinear "+oppDir+" trend, curving "+(oppDir==="positive"?"upward":"downward")) : ((strWord==="Strong"?"Weak":"Strong")+" "+dirWord+" linear trend");
  var d3 = isCurve ? ("No trend in the points") : (strWord+" "+oppDir+" linear trend");
  var opts=[
    {t:d1, fb:"That gets the shape wrong: check whether the points follow a straight band or a curve."},
    {t:d2, fb:"That gets the strength or direction wrong: judge the direction and the tightness separately."},
    {t:d3, fb:"That gets the direction or existence of the trend wrong: read the cloud from left to right."}];
  var why = isCurve ? "the points follow a bending curve, "+(dirWord==="positive"?"rising":"falling")+" overall"
    : "the points follow a straight band, "+(dirWord==="positive"?"rising":"falling")+" overall, and they "+(strWord==="Strong"?"hug the band tightly":"spread widely around it");
  var q=mcq(ctx.who+" The scatter plot shows "+ctx.y.toLowerCase()+" against "+ctx.x.toLowerCase()+". Which description of the trend is most complete?",
    {t:correctTxt, fb:"Yes: "+why+"."}, opts,
    "A complete description names the shape, the direction and, for a straight band, the strength. Here "+why+". The answer is <b>"+correctTxt+"</b>.",
    {kind:kind});
  q.figure=u3Plot(pts,10,50,ctx.x,ctx.y,false);
  return q;
}, ["A complete trend description names shape, direction and strength.", "Start by deciding whether the pattern is a straight band or a curve."]);

E("u3-predict-advanced-cr", 3, ["6.12"], 3, "gen", function(){
  var a=pick([1,2]), b=ri(1,4), c=ri(2,8);
  function Y(x){ return a*x*x+b*x+c; }
  var xs=[1,2,3,4,5], ys=xs.map(Y);
  var ans=Y(7);
  return numq("A science club models the number of visitors to an exhibit. Week: "+xs.join(", ")+" with visitors: "+ys.join(", ")+". The weekly increases themselves grow by the same amount each week. Predict the visitors in week 7 by extending the pattern of increases. Show your work on paper.",
    ans, 1.1,
    "First differences are "+ys.slice(1).map(function(v,i){return v-ys[i];}).join(", ")+", and they grow by \\("+(2*a)+"\\) each week. The next increases are \\("+(Y(6)-Y(5))+"\\) and \\("+(Y(7)-Y(6))+"\\). \\[ \\begin{aligned} \\text{Week 6} &= "+ys[4]+" + "+(Y(6)-Y(5))+" = "+Y(6)+" \\\\ \\text{Week 7} &= "+Y(6)+" + "+(Y(7)-Y(6))+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+" visitors</b>.",
    {a:a,b:b,c:c});
}, ["When increases grow steadily, extend the increases first, then the values.", "Start by finding the increase from each week to the next."]);

E("u3-scale-design-cr", 3, ["6.14"], 3, "gen", function(){
  var nice=[5,10,20,25,50,100,200];
  var ctxs=["daily deliveries for a bakery","daily ticket sales for a theatre","weekly rainfall in millimetres for a farm","monthly visitors for a museum","daily litres of water used by a rink","weekly orders for a craft shop"];
  var ctx=pick(ctxs), maxVal=ri(31,460), intervals=pick([4,5,6,8,10]);
  var raw=maxVal/intervals, idx=nice.findIndex(function(v){return v>=raw;});
  if(idx<0) idx=nice.length-1;
  var inc=nice[idx], top=inc*intervals;
  return numq("A worker creates a graph for "+ctx+". The largest value is "+maxVal+" and the value axis has "+intervals+" equal grid intervals starting at 0. Using the smallest tidy scale step (from 5, 10, 20, 25, 50, 100, 200) that lets the largest value fit, what number goes at the top of the axis? Show your work on paper.",
    top, 0.6,
    "Divide the largest value by the number of intervals, round up to a tidy step, then multiply back. \\[ \\begin{aligned} "+maxVal+" \\div "+intervals+" &\\approx "+fmt(raw,1)+" \\\\ \\text{Tidy step} &= "+inc+" \\\\ \\text{Top} &= "+inc+" \\times "+intervals+" = "+top+" \\end{aligned} \\] The answer is <b>"+top+"</b>.",
    {maxVal:maxVal, intervals:intervals, inc:inc, ctx:ctx});
}, ["The top of the axis is the scale step multiplied by the number of intervals.", "Start by dividing the largest value by the number of intervals."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 3 (graphing data and scatter plots). Borrowed verbatim from Mathematics 2202 Unit 4 (u4-read-value, u4-histogram-read, u4-trend-basic, u4-scatter-trend, u4-choose-graph, u4-interpolate, u4-misleading-axis, u4-two-conclusions); feeder helper copies ride in bank-helpers.js. Codes outside the cluster's named feeder codes (6.1, 6.2, 6.6, 6.7) are support-set borrows on the cluster's named skills, recorded per entry in pkSrc. ===== */
E("u3-pk-read-value", 3, ["6.13"], 1, "gen", function () {
  var ctxs = [
    { thing: "concession sales at a rink in Mount Pearl", unit: "hot dogs sold", labels: ["Fri", "Sat", "Sun", "Mon"] },
    { thing: "a bakery in Bonavista", unit: "loaves sold", labels: ["Tue", "Wed", "Thu", "Fri"] },
    { thing: "a bike shop in St. John's", unit: "bikes serviced", labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4"] },
    { thing: "a ferry terminal in Port aux Basques", unit: "vehicles boarded", labels: ["6 AM", "9 AM", "12 PM", "3 PM"] }
  ];
  var c = pick(ctxs), vals = [], i;
  for (i = 0; i < 4; i++) vals.push(ri(3, 18) * 5);
  var k = ri(0, 3), ans = vals[k];
  var pool = [ans + 5, ans - 5, ans + 10, vals[(k + 1) % 4], vals[(k + 3) % 4]];
  var ds = u4Distractors(ans, pool).map(function (d) { return { t: String(d), fb: d + " is a reading from a different bar or a scale slip: check the " + c.labels[k] + " bar again." }; });
  var q = mcq("The bar graph shows " + c.unit + " for " + c.thing + ". How many were recorded for " + c.labels[k] + "?",
    { t: String(ans), fb: "Yes: the top of the " + c.labels[k] + " bar lines up with " + ans + "." }, ds,
    "Read the height of the " + c.labels[k] + " bar against the scale. It reaches " + ans + ". The answer is <b>" + ans + "</b>.",
    { k: k, ans: ans });
  q.figure = u4BarFig(c.labels, vals, u4NiceMax(Math.max.apply(null, vals)), c.unit, "");
  return q;
}, ["Find the category named in the question along the bottom first.", "Follow the top of its bar across to the scale and read the value."]);

E("u3-pk-histogram-read", 3, ["6.13"], 1, "gen", function () {
  var ctxs = [
    { item: "members at a gym in Clarenville", unit: "minutes of exercise per visit", w: 10 },
    { item: "students at a school in Corner Brook", unit: "pages read in one evening", w: 5 },
    { item: "shoppers at a market in Gander", unit: "dollars spent on groceries", w: 10 },
    { item: "workers at a plant in Labrador City", unit: "minutes for the drive to work", w: 5 }
  ];
  var c = pick(ctxs), labels = [], freqs = [], i;
  for (i = 0; i < 5; i++) { labels.push((i * c.w) + "-" + ((i + 1) * c.w - 1)); freqs.push(ri(2, 13)); }
  var k = ri(0, 4), ans = freqs[k];
  var pool = [ans + 1, ans - 1, ans + 2, freqs[(k + 1) % 5], freqs[(k + 4) % 5], ans + 4];
  var ds = u4Distractors(ans, pool).map(function (d) { return { t: String(d), fb: d + " does not match the height of the " + labels[k] + " bar: read that bar against the frequency scale." }; });
  var q = mcq("A histogram shows " + c.unit + " for " + c.item + ". How many are in the " + labels[k] + " interval?",
    { t: String(ans), fb: "Yes: the bar for " + labels[k] + " reaches " + ans + " on the frequency axis." }, ds,
    "Find the bar labelled " + labels[k] + " and read its height on the frequency axis. It reaches " + ans + ". The answer is <b>" + ans + "</b>.",
    { k: k, ans: ans });
  q.figure = u4HistFig(labels, freqs, u4NiceMax(Math.max.apply(null, freqs)), "Frequency", c.unit);
  return q;
}, ["Find the interval named in the question along the horizontal axis first.", "Follow the top of that bar across to the frequency scale and read the value."]);

E("u3-pk-trend-basic", 3, ["6.11"], 1, "gen", function () {
  var ctxs = [
    { thing: "Daily visitors to a ski hill in Marble Mountain", x: "Day", labels: ["Mon", "Tue", "Wed", "Thu", "Fri"] },
    { thing: "Water level in a rain barrel in St. John's, in cm", x: "Week", labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"] },
    { thing: "Fuel left in a tour boat tank in Twillingate, in litres", x: "Hour", labels: ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM"] },
    { thing: "Tickets sold each day for a theatre show in Grand Falls-Windsor", x: "Day", labels: ["Mon", "Tue", "Wed", "Thu", "Fri"] }
  ];
  var c = pick(ctxs), mode = pick(["up", "down", "flat"]), vals = [], i, start = ri(15, 45), step = ri(2, 7);
  for (i = 0; i < 5; i++) vals.push(mode === "up" ? start + step * i : mode === "down" ? start + step * 4 - step * i : start);
  var correct = mode === "up" ? "It rises steadily across the whole period" : mode === "down" ? "It falls steadily across the whole period" : "It stays about the same across the whole period";
  var opts = ["It rises steadily across the whole period", "It falls steadily across the whole period", "It stays about the same across the whole period", "It rises, then falls back to its starting value"].filter(function (t) { return t !== correct; }).map(function (t) {
    return { t: t, fb: "Compare the first and last points and the direction between them: that pattern does not match this graph." };
  });
  var q = mcq(c.thing + " is graphed over time. Which sentence describes the trend?",
    { t: correct, fb: "Yes: the points move in that one direction (or stay level) from start to finish." }, opts,
    "The first value is " + vals[0] + " and the last value is " + vals[4] + ", and every step between them moves the same way. The answer is <b>" + correct + "</b>.",
    { mode: mode, start: start, step: step });
  q.figure = u4LineFig(c.labels, vals, u4NiceMax(Math.max.apply(null, vals)), "Value", c.x);
  return q;
}, ["Compare the first point with the last point, then check the direction in between.", "Decide whether the line climbs, drops, or stays level as you read left to right."]);

E("u3-pk-scatter-trend", 3, ["6.11"], 2, "gen", function () {
  var ctxs = [
    { x: "Hours of practice per week", y: "Songs played cleanly", xlab: "Hours", ylab: "Songs" },
    { x: "Centimetres of rain in a month", y: "Trail closures that month", xlab: "Rain (cm)", ylab: "Closures" },
    { x: "Minutes a soup simmers", y: "Flavour score out of 50", xlab: "Minutes", ylab: "Score" },
    { x: "Kilometres driven per day", y: "Fuel used that day (L)", xlab: "Kilometres", ylab: "Litres" }
  ];
  var c = pick(ctxs), mode = pick(["pos", "neg", "none"]), pts = [], i;
  for (i = 0; i < 9; i++) {
    var x = 2 + i * 2 + ri(0, 1), yv;
    if (mode === "pos") yv = Math.round(6 + x * 1.6 + ri(-4, 4));
    else if (mode === "neg") yv = Math.round(52 - x * 1.8 + ri(-4, 4));
    else yv = ri(14, 44);
    pts.push([x, Math.max(2, yv)]);
  }
  var correct = mode === "pos" ? "As one measure rises, the other tends to rise too" : mode === "neg" ? "As one measure rises, the other tends to fall" : "The points show no clear pattern linking the measures";
  var all = ["As one measure rises, the other tends to rise too", "As one measure rises, the other tends to fall", "The points show no clear pattern linking the measures", "Every point follows the pattern with no exceptions at all"];
  var opts = all.filter(function (t) { return t !== correct; }).map(function (t) {
    return { t: t, fb: mode === "none" && t.indexOf("Every point") === 0 ? "Scatter points are scattered, so no point by point rule holds here." : "Look at the overall drift of the cloud of points, not at any single point." };
  });
  var q = mcq("A scatter plot links " + c.x.toLowerCase() + " with " + c.y.toLowerCase() + ". Which sentence describes the trend?",
    { t: correct, fb: "Yes: that matches the overall drift of the points." }, opts,
    "Ignore single points and follow the cloud as a whole from left to right. Its overall drift gives the trend. The answer is <b>" + correct + "</b>.",
    { mode: mode });
  q.figure = u4ScatterFig(pts, 20, 60, c.ylab, c.xlab);
  return q;
}, ["Look at the whole cloud of points rather than any single point.", "Follow the cloud from left to right and judge whether it drifts up, drifts down, or spreads with no drift."]);

E("u3-pk-choose-graph", 3, ["6.14"], 1, "var", varset([
  function () {
    return mcq("A cafeteria manager records the number of each lunch item sold on Monday: sandwiches, soup, salads and wraps. She wants to compare the four items side by side. Which graph suits this best?",
      { t: "Bar graph", fb: "Yes: separate bars compare separate categories clearly." },
      [{ t: "Line graph", fb: "A line graph shows change over time, and these items are not a time order." },
       { t: "Histogram", fb: "A histogram groups measured values into intervals, not named menu items." },
       { t: "Scatter plot", fb: "A scatter plot shows a relationship between two measured variables." }],
      "The data are counts in separate categories, so bars that can be compared side by side fit best. The answer is <b>Bar graph</b>.", {});
  },
  function () {
    return mcq("A lifeguard records the air temperature every hour from 9 AM to 5 PM to show parents how the day warmed up. Which graph suits this best?",
      { t: "Line graph", fb: "Yes: points joined in time order show how temperature changed." },
      [{ t: "Bar graph", fb: "Bars compare categories; here the point is change over time." },
       { t: "Circle graph", fb: "A circle graph shows parts of one whole, not change over hours." },
       { t: "Pictograph", fb: "A pictograph uses picture symbols for counts and hides the hourly pattern." }],
      "The values are ordered in time and the goal is to show change, so a line graph fits best. The answer is <b>Line graph</b>.", {});
  },
  function () {
    return mcq("A student council president wants to show what share of a $600 fundraiser came from each of four activities. Which graph suits this best?",
      { t: "Circle graph", fb: "Yes: slices show each part as a share of the whole $600." },
      [{ t: "Line graph", fb: "A line graph shows change over time, not shares of a total." },
       { t: "Histogram", fb: "A histogram groups measured values into intervals." },
       { t: "Scatter plot", fb: "A scatter plot compares two measured variables, not parts of a whole." }],
      "The message is parts of one whole total, so a circle graph fits best. The answer is <b>Circle graph</b>.", {});
  },
  function () {
    return mcq("A gym coach measures the resting heart rates of 40 members and groups them as 50 to 59, 60 to 69, 70 to 79 and 80 to 89 beats per minute. Which graph suits this best?",
      { t: "Histogram", fb: "Yes: a histogram shows how many values fall in each interval." },
      [{ t: "Bar graph", fb: "Bar graphs use separate named categories; these are intervals of a measurement." },
       { t: "Circle graph", fb: "A circle graph shows shares of a whole, not a spread of measurements." },
       { t: "Line graph", fb: "A line graph shows change over time; heart rates here are not ordered in time." }],
      "Measured values grouped into equal intervals are shown with a histogram. The answer is <b>Histogram</b>.", {});
  },
  function () {
    return mcq("A driving instructor records, for each of 12 learners, the hours of practice and the score on a road test. She wants to see if more practice goes with higher scores. Which graph suits this best?",
      { t: "Scatter plot", fb: "Yes: each learner is one point, so the pattern between the two measures shows." },
      [{ t: "Bar graph", fb: "Bars compare categories; both measures here are numbers per learner." },
       { t: "Circle graph", fb: "A circle graph shows parts of a whole, not a relationship." },
       { t: "Histogram", fb: "A histogram shows one measurement grouped into intervals, not two linked measures." }],
      "Two number measures recorded for the same learners call for a scatter plot. The answer is <b>Scatter plot</b>.", {});
  },
  function () {
    return mcq("A teacher wants one clear disadvantage of using a circle graph for the daily high temperatures of a whole month. Which statement gives it?",
      { t: "A circle graph cannot show how values change from day to day", fb: "Yes: slices have no time order, so the daily pattern is lost." },
      [{ t: "A circle graph uses too many colours to print clearly in a book", fb: "Colour is a design choice, not a limit of the graph type itself." },
       { t: "A circle graph can only hold four values at a time, no more", fb: "A circle graph can hold more parts; the issue is change over time." },
       { t: "A circle graph always starts its scale at a wrong value every time", fb: "Circle graphs have slices, not a scale that can start wrongly." }],
      "Daily temperatures are a time sequence, and a circle graph shows parts of a whole with no time order. The answer is <b>A circle graph cannot show how values change from day to day</b>.", {});
  }
]), ["Match the graph to the job: categories, change over time, parts of a whole, intervals, or two linked measures.", "Ask what the reader should see first, then pick the graph built for that job."]);

E("u3-pk-interpolate", 3, ["6.12"], 2, "gen", function () {
  var ctxs = [
    { thing: "temperature inside a greenhouse in Mount Pearl", x: "Hour after sunrise", y: "Degrees C", unit: "degrees" },
    { thing: "distance covered by a snowmobile tour near Deer Lake", x: "Hour", y: "Kilometres", unit: "km" },
    { thing: "water pumped into a tank at a fish plant in Harbour Grace", x: "Minute", y: "Litres", unit: "litres" },
    { thing: "height of a sunflower in a garden in Clarenville", x: "Week", y: "Centimetres", unit: "cm" }
  ];
  var c = pick(ctxs), start = ri(4, 30), step = pick([2, 4, 5, 6, 8, 10]), labels = [], vals = [], i;
  for (i = 0; i < 6; i++) { labels.push(String(i)); vals.push(start + step * i); }
  var k = ri(1, 4), ans = (vals[k] + vals[k + 1]) / 2;
  var pool = [vals[k], vals[k + 1], ans + step, ans - step / 2, vals[k] + step * 2];
  var ds = u4Distractors(ans, pool).map(function (d) { return { t: String(d) + "", fb: "That value sits on a plotted point or past it: halfway in time means halfway between the two neighbouring values." }; });
  var q = mcq("The line graph shows " + c.thing + ". The value changes steadily between plotted points. Interpolate the value at " + k + ".5 on the horizontal axis, in " + c.unit + ".",
    { t: String(fmt(ans)) + "", fb: "Yes: halfway between " + vals[k] + " and " + vals[k + 1] + " is " + fmt(ans) + "." }, ds,
    "\\[ \\begin{aligned} \\text{Interpolated value} &= \\frac{" + vals[k] + " + " + vals[k + 1] + "}{2} \\\\ &= " + fmt(ans) + " \\end{aligned} \\] The answer is <b>" + fmt(ans) + " " + c.unit + "</b>.",
    { k: k, ans: ans });
  q.figure = u4LineFig(labels, vals, u4NiceMax(vals[5]), c.y, c.x);
  return q;
}, ["Interpolation means reading a value between two plotted points.", "Find the two points on either side of the requested spot and take the value halfway between them."]);

E("u3-pk-misleading-axis", 3, ["6.13"], 2, "gen", function () {
  var ctxs = [
    { thing: "monthly memberships at two gyms in St. John's", labels: ["Gym A", "Gym B"], unit: "members" },
    { thing: "weekly sales at two food trucks in Corner Brook", labels: ["Truck A", "Truck B"], unit: "meals" },
    { thing: "season points for two curling teams in Gander", labels: ["Team A", "Team B"], unit: "points" },
    { thing: "daily riders on two bus routes in Mount Pearl", labels: ["Route A", "Route B"], unit: "riders" }
  ];
  var c = pick(ctxs), v1 = ri(55, 90), gap = pick([4, 5, 6, 8, 10]), v2 = v1 + gap;
  var base = v1 - pick([5, 10, 15]), yMax = v2 + pick([2, 4, 6]);
  var q = mcq("The bar graph shows " + c.thing + ": " + v1 + " " + c.unit + " for " + c.labels[0] + " and " + v2 + " " + c.unit + " for " + c.labels[1] + ". The second bar looks far taller than the first. What makes the graph misleading?",
    { t: "The vertical axis starts at " + base + " instead of 0", fb: "Yes: starting above 0 stretches the visible gap between the bars." },
    [{ t: "The two bars are drawn in two different widths", fb: "Check the figure: the bars have the same width, so width is not the trick." },
     { t: "The bars are arranged in the wrong time order", fb: "These are two separate entries, not a time order, and order does not change bar heights." },
     { t: "The graph uses bars instead of a circle format", fb: "Bars suit this comparison; the problem is where the scale begins." }],
    "The values differ by only " + gap + ", but the scale begins at " + base + ", so only the tops of the bars are compared. A scale that starts above 0 exaggerates a small difference. The answer is <b>The vertical axis starts at " + base + " instead of 0</b>.",
    { v1: v1, v2: v2, base: base });
  q.figure = u4BarFig(c.labels, [v1, v2], yMax, c.unit, "", base);
  return q;
}, ["Compare the size of the real difference with how big it looks on the page.", "Check where the vertical scale starts before trusting the bar heights."]);

E("u3-pk-two-conclusions", 3, ["6.13"], 2, "gen", function () {
  var ctxs = [
    { thing: "registrations for a learn to curl program in St. John's", unit: "registrations", verb: "Registrations" },
    { thing: "attendance at a farmers market in Clarenville", unit: "visitors", verb: "Attendance" },
    { thing: "borrowing at a public library in Corner Brook", unit: "books borrowed", verb: "Borrowing" },
    { thing: "ridership on a town shuttle in Gander", unit: "riders", verb: "Ridership" }
  ];
  var c = pick(ctxs), up = pick([true, false]), start = ri(20, 60), change = pick([10, 15, 20, 25, 30]);
  var labels = ["Sep", "Oct", "Nov", "Dec", "Jan"], vals = [], i;
  for (i = 0; i < 5; i++) vals.push(up ? start + Math.round(change * i / 4) : start + change - Math.round(change * i / 4));
  var first = vals[0], last = vals[4];
  var claimA = up ? c.verb + " grew from " + first + " in Sep to " + last + " in Jan" : c.verb + " fell from " + first + " in Sep to " + last + " in Jan";
  var correct = up ? c.verb + " was higher in Jan than in Sep" : c.verb + " was lower in Jan than in Sep";
  var q = mcq("One reader concludes: \"" + claimA + ".\" Which second conclusion does the same graph also support?",
    { t: correct, fb: "Yes: comparing the first and last plotted values gives exactly that." },
    [{ t: "A new advertising campaign caused the change", fb: "The graph shows values over time only; it carries no information about causes." },
     { t: "The trend will continue in the same way next year", fb: "A graph of past months cannot guarantee what happens next year." },
     { t: "The program earned more money in Jan than in Sep", fb: "The graph counts " + c.unit + ", not money, so earnings cannot be read from it." }],
    "The graph supports readings of its own plotted values, such as comparing the first and last points. It says nothing about causes, future values, or money. The answer is <b>" + correct + "</b>.",
    { up: up, first: first, last: last });
  q.figure = u4LineFig(labels, vals, u4NiceMax(Math.max.apply(null, vals)), c.unit, "Month");
  return q;
}, ["A graph supports conclusions about the values it actually plots.", "Test each option: is it read off the plotted values, or does it add a cause, a prediction, or a new measure?"]);

/* PK tranche metadata pass for Unit 3. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U3_FOR=["6.11","6.12","6.13","6.14","6.15"];
var PKT_U3={
 "u3-pk-read-value":{src:"math-2202:6.3",group:"graph-reading"},
 "u3-pk-histogram-read":{src:"math-2202:6.2",group:"graph-reading"},
 "u3-pk-trend-basic":{src:"math-2202:6.4",group:"graph-trends"},
 "u3-pk-scatter-trend":{src:"math-2202:6.4",group:"graph-trends"},
 "u3-pk-choose-graph":{src:"math-2202:6.1",group:"graph-choice"},
 "u3-pk-interpolate":{src:"math-2202:6.5",group:"interp-extrap"},
 "u3-pk-misleading-axis":{src:"math-2202:6.7",group:"graph-judgement"},
 "u3-pk-two-conclusions":{src:"math-2202:6.6",group:"graph-judgement"}
};
BANK.forEach(function(e){var t=PKT_U3[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U3_FOR.slice();e.pkGroup=t.group;}});
