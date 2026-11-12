// Figure additions: geometry entries assign q.figure from their own drawn values
// (bisector diagrams, Cartesian grids and triangle angle figures).
// Math 7 Unit 8 Geometry question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 3665 to 4165).
// CRMARKS: u8-distance-cr=3
// CRMARKS: u8-translate-cr=3
// CRMARKS: u8-successive-cr=2
// CRMARKS: u8-bisector-cr=3
// CRMARKS: u8-transform-cr=3
/* ===== Unit 8 ===== */
/* Math 7 Unit 8: Geometry (target 10: constructions and Cartesian plane) */
function u8gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u8numOpts(correct,cands){var out=[],seen={};seen[String(correct)]=1;for(var i=0;i<cands.length;i++){var v=cands[i];if(v===null||v===undefined)continue;var k=String(v);if(!seen[k]){seen[k]=1;out.push(v);if(out.length===3)break;}}var step=1;while(out.length<3){var v=correct+step;if(!seen[String(v)]){seen[String(v)]=1;out.push(v);}step++;}return out;}
function u8pair(x,y){return "("+x+", "+y+")";}
function u8gridSVG(points,polys,segs){
  var W=280,H=280,c=140,st=20;
  function X(x){return c+x*st;}function Y(y){return c-y*st;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane grid">';
  for(var g=-6;g<=6;g++){if(g===0)continue;out+='<line x1="'+X(g)+'" y1="8" x2="'+X(g)+'" y2="272" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="8" y1="'+Y(g)+'" x2="272" y2="'+Y(g)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="8" y1="140" x2="272" y2="140" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="140" y1="8" x2="140" y2="272" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<polygon points="272,140 264,135 264,145" fill="'+FIG_INK+'"/><polygon points="140,8 135,16 145,16" fill="'+FIG_INK+'"/>';
  out+=_txt(266,126,"x",13,true)+_txt(152,20,"y",13,true);
  if(segs)segs.forEach(function(s){out+='<line x1="'+X(s[0])+'" y1="'+Y(s[1])+'" x2="'+X(s[2])+'" y2="'+Y(s[3])+'" stroke="'+FIG_INK+'" stroke-width="2"'+(s[4]?' stroke-dasharray="5 4"':"")+'/>';});
  if(polys)polys.forEach(function(p){out+='<polygon points="'+p.map(function(q){return fmt(X(q[0]),1)+","+fmt(Y(q[1]),1);}).join(" ")+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';});
  if(points)points.forEach(function(p){out+='<circle cx="'+X(p.x)+'" cy="'+Y(p.y)+'" r="3.4" fill="'+FIG_INK+'"/>';if(p.label)out+=_txt(X(p.x)+11,Y(p.y)-10,p.label,13,true);});
  return out+'</svg>';
}
function u8segFigure(segs,jx,jy){
  var W=300,H=230;
  function X(x){return 150+(x+jx)*26;}function Y(y){return 115-(y+jy)*26;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line segments diagram">';
  segs.forEach(function(s){out+='<line x1="'+fmt(X(s.x1),1)+'" y1="'+fmt(Y(s.y1),1)+'" x2="'+fmt(X(s.x2),1)+'" y2="'+fmt(Y(s.y2),1)+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>';
    out+=_txt(X(s.x1)-10,Y(s.y1)-8,s.l1,14,true);out+=_txt(X(s.x2)+10,Y(s.y2)-8,s.l2,14,true);});
  return out+'</svg>';
}
function u8moveText(dx,dy){var parts=[];if(dx!==0)parts.push(Math.abs(dx)+(Math.abs(dx)===1?" unit ":" units ")+(dx>0?"right":"left"));if(dy!==0)parts.push(Math.abs(dy)+(Math.abs(dy)===1?" unit ":" units ")+(dy>0?"up":"down"));return parts.join(" and ");}

E("u8-parallel-perp-id",8,["10.1"],1,"gen",function(){
  var jx=pick([-1,0,0,1]),jy=pick([-1,0,1]);var askPara=Math.random()<0.5;var tmpl=ri(0,2);
  var segs,prompt,correct,ds,sol;
  var opener=pick(["The diagram shows ","A diagram shows "]);
  if(tmpl===0){
    segs=[{x1:-4,y1:2,x2:3,y2:2,l1:"A",l2:"B"},{x1:3,y1:2,x2:3,y2:-2,l1:"",l2:"C"},{x1:3,y1:-2,x2:-4,y2:-2,l1:"",l2:"D"},{x1:-4,y1:-2,x2:-4,y2:2,l1:"",l2:""}];
    prompt=opener+"a rectangle with vertices A, B, C and D, and sides AB, BC, CD and DA. ";
    if(askPara){correct="AB and CD";ds=[{t:"AB and BC",fb:"AB meets BC at a corner, so they are perpendicular, not parallel."},{t:"AB and DA",fb:"AB meets DA at a corner, so they are perpendicular, not parallel."},{t:"BC and CD",fb:"BC meets CD at a corner, so they are perpendicular, not parallel."}];sol="Opposite sides of a rectangle never meet and stay the same distance apart. AB and CD are opposite sides. The parallel pair is <b>AB and CD</b>.";}
    else {correct="AB and BC";ds=[{t:"BC and DA",fb:"BC and DA are opposite sides, so they are parallel, not perpendicular."},{t:"AB and CD",fb:"AB and CD are opposite sides, so they are parallel, not perpendicular."},{t:"AD and BC",fb:"AD and BC are opposite sides (AD is the same segment as DA), so they are parallel, not perpendicular."}];sol="Adjacent sides of a rectangle meet at 90 degrees. AB and BC meet at corner B. The perpendicular pair is <b>AB and BC</b>.";}
  } else if(tmpl===1){
    segs=[{x1:-5,y1:3,x2:2,y2:3,l1:"E",l2:"F"},{x1:-5,y1:-1,x2:2,y2:-1,l1:"G",l2:"H"},{x1:0,y1:4,x2:0,y2:-3,l1:"I",l2:"J"},{x1:-4,y1:-3,x2:3,y2:2,l1:"K",l2:"L"}];
    prompt=opener+"segments EF, GH, IJ and KL. ";
    if(askPara){correct="EF and GH";ds=[{t:"EF and IJ",fb:"IJ crosses EF at a right angle, so they are perpendicular."},{t:"GH and KL",fb:"KL is slanted and would meet GH if extended, so they are not parallel."},{t:"IJ and KL",fb:"KL is slanted and crosses IJ, so they are not parallel."}];sol="EF and GH are both horizontal, stay the same distance apart, and never meet. The parallel pair is <b>EF and GH</b>.";}
    else {correct="EF and IJ";ds=[{t:"EF and GH",fb:"EF and GH are parallel, not perpendicular."},{t:"IJ and KL",fb:"KL crosses IJ at a slanted angle, not 90 degrees."},{t:"GH and KL",fb:"KL crosses GH at a slanted angle, not 90 degrees."}];sol="IJ is vertical and EF is horizontal, so they meet at 90 degrees. The perpendicular pair is <b>EF and IJ</b>.";}
  } else {
    segs=[{x1:-4,y1:3,x2:2,y2:3,l1:"P",l2:"Q"},{x1:-4,y1:-2,x2:2,y2:-2,l1:"R",l2:"S"},{x1:0,y1:4,x2:0,y2:-3,l1:"T",l2:"U"},{x1:-4,y1:-3,x2:3,y2:1,l1:"V",l2:"W"}];
    prompt=opener+"segments PQ, RS, TU and VW. ";
    if(askPara){correct="PQ and RS";ds=[{t:"PQ and TU",fb:"TU crosses PQ at a right angle, so they are perpendicular."},{t:"RS and VW",fb:"VW is slanted and would meet RS if extended, so they are not parallel."},{t:"TU and VW",fb:"VW crosses TU at a slanted angle, so they are not parallel."}];sol="PQ and RS are both horizontal and stay the same distance apart. The parallel pair is <b>PQ and RS</b>.";}
    else {correct="PQ and TU";ds=[{t:"PQ and RS",fb:"PQ and RS are parallel, not perpendicular."},{t:"TU and VW",fb:"VW crosses TU at a slanted angle, not 90 degrees."},{t:"RS and VW",fb:"VW crosses RS at a slanted angle, not 90 degrees."}];sol="TU is vertical and PQ is horizontal, so they meet at 90 degrees. The perpendicular pair is <b>PQ and TU</b>.";}
  }
  var q=mcq(prompt+(askPara?"Which pair of segments is parallel?":"Which pair of segments is perpendicular?"),
    {t:correct,fb:"Yes, that pair matches the diagram."},ds,sol,{mode:askPara?"para":"perp",tmpl:tmpl});
  q.figure=u8segFigure(segs,jx,jy);
  return q;
},["Parallel segments never meet and stay the same distance apart; perpendicular segments meet at 90 degrees.","Start by checking each pair: do they meet, and if so, at what angle?"]);
E("u8-axes-origin",8,["10.6"],1,"var",varset([
  function(){var q=mcq("On a Cartesian plane, the horizontal axis is called the:",
    {t:"x-axis",fb:"Yes: the x-axis runs horizontally and gives the first number in an ordered pair."},
    [{t:"y-axis",fb:"The y-axis runs vertically, not horizontally."},{t:"origin",fb:"The origin is a point, the point (0, 0), not an axis."},{t:"quadrant",fb:"A quadrant is one of the four regions of the plane, not an axis."}],
    "The horizontal axis is the x-axis. The answer is <b>x-axis</b>.",{mode:"xaxis"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("On a Cartesian plane, the vertical axis is called the:",
    {t:"y-axis",fb:"Yes: the y-axis runs vertically and gives the second number in an ordered pair."},
    [{t:"x-axis",fb:"The x-axis runs horizontally, not vertically."},{t:"origin",fb:"The origin is the point (0, 0), not an axis."},{t:"quadrant",fb:"A quadrant is a region of the plane, not an axis."}],
    "The vertical axis is the y-axis. The answer is <b>y-axis</b>.",{mode:"yaxis"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("What are the coordinates of the origin on a Cartesian plane?",
    {t:"(0, 0)",fb:"Yes: the origin is where the two axes cross, at zero on both."},
    [{t:"(1, 0)",fb:"That point sits one unit right of the origin on the x-axis."},{t:"(0, 1)",fb:"That point sits one unit above the origin on the y-axis."},{t:"(1, 1)",fb:"That point is one unit right and one unit up from the origin."}],
    "The axes cross at zero on both axes. The origin is <b>(0, 0)</b>.",{mode:"origin"}); q.figure=figAxes("plain"); return q;},
  function(){var q=mcq("The point (0, 4) lies:",
    {t:"On the y-axis",fb:"Yes: an x-coordinate of 0 places the point on the y-axis, four units up."},
    [{t:"On the x-axis",fb:"Points on the x-axis have a y-coordinate of 0; this point has y equal to 4."},{t:"At the origin",fb:"The origin is (0, 0); this point is four units above it."},{t:"In Quadrant I",fb:"Points on an axis do not belong to any quadrant."}],
    "An x-coordinate of 0 means the point sits on the y-axis. The answer is <b>On the y-axis</b>.",{mode:"onaxis"}); q.figure=figAxes("onaxis"); return q;},
  function(){var q=mcq("In Quadrant II of a Cartesian plane, the coordinates of every point have:",
    {t:"Negative x and positive y",fb:"Yes: Quadrant II is to the left of the y-axis and above the x-axis."},
    [{t:"Positive x and positive y",fb:"That sign pattern describes Quadrant I, on the right and above."},{t:"Negative x and negative y",fb:"That sign pattern describes Quadrant III, on the left and below."},{t:"Positive x and negative y",fb:"That sign pattern describes Quadrant IV, on the right and below."}],
    "Quadrant II is left of the y-axis (negative x) and above the x-axis (positive y). The answer is <b>Negative x and positive y</b>.",{mode:"quad2"}); q.figure=figAxes("quad2"); return q;}
]),["The x-axis is horizontal, the y-axis is vertical, and they cross at the origin.","Start by picturing the two axes crossing at (0, 0)."]);

E("u8-read-point",8,["10.7"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var guard=0;
  while(Math.abs(x)===Math.abs(y)&&guard<20){y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);guard++;}
  if(Math.abs(x)===Math.abs(y))y=x>0?x-1:x+1;
  var correct=u8pair(x,y);
  var cands=[u8pair(y,x),u8pair(-x,y),u8pair(x,-y)];
  var ds=cands.map(function(t,i){return {t:t,fb:i===0?"The first number is the x-coordinate (horizontal), the second is the y-coordinate (vertical). That pair swaps them.":(i===1?"Check the sign of the x-coordinate: the point is on the other side of the y-axis.":"Check the sign of the y-coordinate: the point is on the other side of the x-axis.")};});
  var q=mcq("Point P is plotted on the Cartesian plane. What are the coordinates of point P?",
    {t:correct,fb:"Yes: from the origin, move "+x+" horizontally and "+y+" vertically to reach P."},ds,
    "From the origin, point P sits "+Math.abs(x)+" units "+(x>0?"right":"left")+" and "+Math.abs(y)+" units "+(y>0?"up":"down")+". The coordinates are <b>"+correct+"</b>.",{mode:"read"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["Coordinates are written (x, y): horizontal movement first, then vertical.","Start at the origin and count across, then up or down."]);

E("u8-env-examples",8,["10.2","10.3"],1,"var",varset([
  function(){return mcq("Which of these shows a pair of parallel line segments?",
    {t:"The two rails of a railway track",fb:"Yes: the rails run side by side, always the same distance apart."},
    [{t:"The two edges meeting at the corner of a book",fb:"Edges meeting at a corner form an angle; at a square corner they are perpendicular."},{t:"The hands of a clock at 3:00",fb:"At 3:00 the hands form a right angle, so they are perpendicular, not parallel."},{t:"The two strokes of the letter T",fb:"The strokes of a T meet at a right angle, so they are perpendicular."}],
    "Railway rails stay the same distance apart and never meet: they are parallel. The answer is <b>The two rails of a railway track</b>.",{mode:"rail"});},
  function(){return mcq("Which of these shows a pair of perpendicular line segments?",
    {t:"The corner edges of a window frame",fb:"Yes: the edges of a square window corner meet at 90 degrees."},
    [{t:"The two rails of a railway track",fb:"Rails stay the same distance apart: they are parallel."},{t:"The opposite edges of a ruler",fb:"Opposite edges of a ruler never meet: they are parallel."},{t:"The lines ruled across notebook paper",fb:"Ruled lines run side by side without meeting: they are parallel."}],
    "A window frame corner meets at 90 degrees, which is perpendicular. The answer is <b>The corner edges of a window frame</b>.",{mode:"window"});},
  function(){return mcq("A student looks around a classroom for parallel segments. Which find is correct?",
    {t:"The top and bottom edges of the whiteboard",fb:"Yes: opposite edges of the board run in the same direction and never meet."},
    [{t:"The edge of a desk and the floor line it touches",fb:"Those meet at the desk leg area at an angle rather than running side by side."},{t:"The two sides of an open laptop screen corner",fb:"Sides meeting at a corner of the screen form an angle, not a parallel pair."},{t:"The stripes at the corner of a flag",fb:"Stripes that meet at a corner cross or touch, so they are not parallel segments."}],
    "Opposite edges of the whiteboard are parallel. The answer is <b>The top and bottom edges of the whiteboard</b>.",{mode:"board"});},
  function(){return mcq("Which of these is an example of perpendicular segments in the environment?",
    {t:"A flagpole and the ground line at its base",fb:"Yes: a vertical pole meets level ground at a right angle."},
    [{t:"The rungs of a ladder, spaced one above the other",fb:"Ladder rungs run side by side: they are parallel to each other."},{t:"The opposite sides of a hockey rink",fb:"Opposite sides of the rink run in the same direction: parallel."},{t:"The two long edges of a bookshelf board",fb:"Long edges of one board run side by side: parallel."}],
    "The pole is vertical and the ground is level, meeting at 90 degrees. The answer is <b>A flagpole and the ground line at its base</b>.",{mode:"pole"});},
  function(){return mcq("Which pair of segments is parallel?",
    {t:"The top edge and the bottom edge of a door",fb:"Yes: the top and bottom edges of a door run in the same direction and never meet."},
    [{t:"The two edges that meet at the corner of a page",fb:"Edges meeting at a corner form an angle (90 degrees on a page), not a parallel pair."},{t:"The vertical and horizontal strokes of the letter L",fb:"Those strokes meet at a right angle: perpendicular."},{t:"A shelf edge and the wall edge it meets",fb:"Those edges meet at the corner, so they cannot be parallel."}],
    "The top and bottom edges of a door are parallel. The answer is <b>The top edge and the bottom edge of a door</b>.",{mode:"door"});}
]),["Parallel segments stay the same distance apart; perpendicular segments meet at 90 degrees.","Start by asking whether the two segments meet, and at what angle."]);

E("u8-plot-point",8,["10.7","10.9"],1,"gen",function(){
  var pts=[];var guard=0;
  while(pts.length<4&&guard<200){var x=ri(-5,5),y=ri(-5,5);var ok=true;for(var i=0;i<pts.length;i++){if(pts[i].x===x&&pts[i].y===y)ok=false;}if(ok)pts.push({x:x,y:y});guard++;}
  var labels=["A","B","C","D"];var ti=ri(0,3);var target=pts[ti];
  var ds=labels.filter(function(l,i){return i!==ti;}).map(function(l,i){var p=pts[labels.indexOf(l)];return {t:"Point "+l,fb:"Point "+l+" sits at "+u8pair(p.x,p.y)+", not at the target coordinates."};});
  var q=mcq("Four points are plotted on the Cartesian plane. Which point is at "+u8pair(target.x,target.y)+"?",
    {t:"Point "+labels[ti],fb:"Yes: point "+labels[ti]+" sits "+target.x+" across and "+target.y+" up from the origin."},ds,
    "Counting from the origin, "+u8pair(target.x,target.y)+" is the position of point "+labels[ti]+". The answer is <b>Point "+labels[ti]+"</b>.",{mode:"plot"});
  q.figure=u8gridSVG(pts.map(function(p,i){return {x:p.x,y:p.y,label:labels[i]};}),null,null);
  return q;
},["To plot (x, y), move x units across from the origin, then y units up or down.","Start at the origin and count the x movement first."]);

E("u8-bisector-env",8,["10.4","10.5"],1,"var",varset([
  function(){var q=mcq("What is a perpendicular bisector of a line segment?",
    {t:"A line that cuts the segment into two equal parts at 90 degrees",fb:"Yes: it passes through the midpoint and meets the segment at a right angle."},
    [{t:"A line that cuts the segment into two equal parts at any angle",fb:"Equal parts alone give a midpoint crossing; a perpendicular bisector must also meet at 90 degrees."},{t:"A line that meets the segment at 90 degrees at one of its endpoints",fb:"Meeting at an endpoint cannot split the segment into two equal parts."},{t:"A line that runs alongside the segment and never touches it",fb:"A bisector must cross the segment it bisects."}],
    "A perpendicular bisector crosses at the midpoint and at 90 degrees. The answer is <b>A line that cuts the segment into two equal parts at 90 degrees</b>.",{mode:"defpb"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("A gardener wants a path that is the perpendicular bisector of the front edge of a garden plot. Which path fits?",
    {t:"A path crossing the edge at its exact middle, forming a right angle with it",fb:"Yes: crossing at the midpoint at 90 degrees is exactly a perpendicular bisector."},
    [{t:"A path crossing the edge near one end at a right angle with the edge of the garden plot",fb:"A right angle alone is not enough; the crossing must be at the midpoint."},{t:"A path crossing the edge at its middle at a slanted angle at the crossing point",fb:"The middle alone is not enough; the crossing must also be at 90 degrees."},{t:"A path running along the edge itself from one end of the plot to the other",fb:"A path on the edge does not cross or bisect it."}],
    "The path must cross at the midpoint and at 90 degrees. The answer is <b>A path crossing the edge at its exact middle, forming a right angle with it</b>.",{mode:"garden"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("What is an angle bisector?",
    {t:"A ray that splits an angle into two equal angles",fb:"Yes: the two resulting angles have the same measure."},
    [{t:"A ray that splits an angle into two angles with any measures",fb:"A bisector must create two equal angles, not just any two angles."},{t:"A line that cuts the angle's sides into equal lengths",fb:"That describes cutting a segment, not splitting an angle's measure."},{t:"A ray drawn from outside the angle to its vertex",fb:"A bisector starts at the vertex and goes inside the angle."}],
    "An angle bisector splits the angle into two equal angles. The answer is <b>A ray that splits an angle into two equal angles</b>.",{mode:"defab"}); q.figure=figBisect("angle"); return q;},
  function(){var q=mcq("Which action creates an angle bisector in an everyday task?",
    {t:"Folding a paper corner so the two edges of the corner line up exactly",fb:"Yes: the fold crease splits the corner angle into two equal angles."},
    [{t:"Cutting a paper corner off with one straight cut across the corner",fb:"Cutting off the corner removes part of the angle instead of splitting it into equal halves."},{t:"Drawing any line from the corner across the paper to the far side",fb:"An arbitrary line need not split the angle equally."},{t:"Measuring the corner angle with a protractor placed on the corner of the paper",fb:"Measuring reads the angle; it does not split it."}],
    "Folding so the edges match makes the crease split the angle equally. The answer is <b>Folding a paper corner so the two edges of the corner line up exactly</b>.",{mode:"foldab"}); q.figure=figBisect("angle"); return q;},
  function(){var q=mcq("Two lamp posts stand at the ends of a straight path. A bench sits on the perpendicular bisector of the path segment. What is true about the bench?",
    {t:"It is the same distance from each lamp post",fb:"Yes: every point on a perpendicular bisector is equidistant from the segment's endpoints."},
    [{t:"It is closer to the nearer lamp post by half the path length",fb:"Points on the perpendicular bisector are not closer to either end; the distances match."},{t:"It sits at the midpoint of the path",fb:"Only one point of the bisector, the crossing point, is the midpoint; the bench can be anywhere on the line."},{t:"It is twice as far from one post as from the other",fb:"The defining property is equal distances, not a double distance."}],
    "Every point on a perpendicular bisector is the same distance from both endpoints. The answer is <b>It is the same distance from each lamp post</b>.",{mode:"bench"}); q.figure=figBisect("perp"); return q;},
  function(){var q=mcq("Folding a paper strip so one end lands exactly on the other end creates a crease. The crease is:",
    {t:"The perpendicular bisector of the strip's length",fb:"Yes: matching the ends makes the crease cross at the midpoint, and a fold crease meets the length at 90 degrees."},
    [{t:"An angle bisector of the strip's corner where the fold starts",fb:"The fold matches the two ends of the length, so it bisects the length, not a corner angle."},{t:"A line parallel to the strip's length along the whole strip",fb:"The crease crosses the length rather than running alongside it."},{t:"The midpoint itself, halfway along the strip",fb:"The crease is a line through the midpoint, not just the point."}],
    "Matching the ends puts the crease through the midpoint at a right angle. The answer is <b>The perpendicular bisector of the strip's length</b>.",{mode:"foldpb"}); q.figure=figBisect("perp"); return q;}
]),["A bisector splits something into two equal parts; perpendicular adds a 90 degree crossing.","Start by checking both conditions: equal parts, and the right angle for a perpendicular bisector."]);

E("u8-bisector-reason",8,["10.15","10.16"],1,"gen",function(){
  var mode=pick(["midpoint","anglehalf","equidist","midpoint2"]);
  if(mode==="anglehalf"){var A=ri(10,80)*2;var half=A/2;
    var ds=u8numOpts(half,[A,half+4,Math.max(half-4,2)]).map(function(v){return {t:String(v),fb:"A bisector splits the angle into two equal parts, so divide the angle by 2."};});
    var q=mcq("An angle of "+A+" degrees is bisected. What is the measure of each resulting angle?",
      {t:String(half),fb:"Yes: "+A+" divided by 2 is "+half+"."},ds,
      "The bisector makes two equal angles. \\[ \\begin{aligned} \\text{each angle} &= "+A+" \\div 2 \\\\ &= "+half+"^\\circ \\end{aligned} \\] Each angle is <b>"+half+" degrees</b>.",{mode:mode}); q.figure=figAngleBisectTotal(A+"°"); return q;
  }
  if(mode==="equidist"){var d=ri(3,15);
    var cand=u8numOpts(d,[d+2,2*d,Math.max(d-1,1)]);
    var ds2=cand.map(function(v){return {t:String(v),fb:"Points on a perpendicular bisector are the same distance from both endpoints of the segment."};});
    var q=mcq("Point P lies on the perpendicular bisector of segment AB. The distance from P to A is "+d+" cm. What is the distance from P to B?",
      {t:String(d),fb:"Yes: every point on the perpendicular bisector is equidistant from A and B."},ds2,
      "A point on the perpendicular bisector is the same distance from both endpoints, so the distance from P to B equals the distance from P to A. The distance is <b>"+d+" cm</b>.",{mode:mode}); q.figure=figEqui(null,d+" cm"); return q;
  }
  var L=ri(4,15)*2;var halfL=L/2;var obj=mode==="midpoint"?pick(["ribbon","board","garden hose","shelf board"]):pick(["rope","ribbon","skateboard ramp edge"]);
  var ds3=u8numOpts(halfL,[L,halfL+2,Math.max(halfL-2,1)]).map(function(v){return {t:String(v),fb:"The perpendicular bisector crosses at the midpoint, halfway along the segment."};});
  var q=mcq("A "+obj+" is "+L+" cm long. Its perpendicular bisector crosses it at M. How far is M from each end?",
    {t:String(halfL),fb:"Yes: the midpoint is halfway along, "+L+" divided by 2."},ds3,
    "The bisector crosses at the midpoint. \\[ \\begin{aligned} \\text{distance} &= "+L+" \\div 2 \\\\ &= "+halfL+" \\text{ cm} \\end{aligned} \\] M is <b>"+halfL+" cm</b> from each end.",{mode:mode}); q.figure=figSegMid(L+" cm"); return q;
},["A bisector cuts into two equal parts: a segment at its midpoint, an angle into two equal angles.","Start by dividing the given length or angle by 2."]);

E("u8-draw-reason",8,["10.13","10.14"],1,"var",varset([
  function(){return mcq("A student slides a set square along a ruler to draw a second line through a point. Why is the new line parallel to the first line?",
    {t:"The set square keeps the same angle with the ruler, so the new line has the same direction as the first",fb:"Yes: both lines make equal corresponding angles with the ruler, which makes them parallel."},
    [{t:"The new line is the same length as the first line, and equal lengths are what make two lines parallel in a drawing",fb:"Equal lengths do not make lines parallel; direction does."},{t:"The ruler is longer than both lines, so any line drawn along it points in the same direction as the first",fb:"The ruler's length plays no role in the direction of the lines."},{t:"The point lies on the first line, so the second line through it has to follow the first line exactly",fb:"In this construction the point is off the first line; the equal angles are what make the lines parallel."}],
    "Sliding the set square preserves the angle, so both lines share the same direction. The answer is <b>The set square keeps the same angle with the ruler</b>.",{mode:"slide"});},
  function(){return mcq("To draw a line perpendicular to a given line through a point on it, a student uses a set square. Why does this work?",
    {t:"The corner of a set square is exactly 90 degrees, so the drawn edge meets the line at 90 degrees",fb:"Yes: the set square's right angle is transferred to the drawing."},
    [{t:"The set square is a triangle, and triangles contain perpendicular lines in this drawing",fb:"Only the right angle corner matters here, not the triangular shape in general."},{t:"The point is on the line, which forces a right angle wherever a new line is drawn through that point",fb:"A point on a line does not by itself create a right angle; the set square does."},{t:"The ruler underneath makes every drawn line perpendicular to the line being drawn on the page",fb:"A ruler guides straightness, not the angle."}],
    "The set square's corner is a true right angle, so the drawn line is perpendicular. The answer is <b>The corner of a set square is exactly 90 degrees</b>.",{mode:"setsq"});},
  function(){return mcq("A student draws a line and claims it is parallel to a given line. Which check confirms the claim?",
    {t:"Measure the distance between the lines at two different places; the distances are equal",fb:"Yes: parallel lines stay the same distance apart everywhere."},
    [{t:"Check that the two lines have the same length from one end of each line to the other end",fb:"Segments can share a length without being parallel."},{t:"Extend one line and see whether it looks straight along its whole length on the page",fb:"Straightness of one line says nothing about its direction relative to the other."},{t:"Measure one angle where a ruler crosses a line, and check that the angle looks right",fb:"One angle alone does not compare the two lines' directions."}],
    "Equal distances at two places confirm the lines stay the same distance apart: they are parallel. The answer is <b>Measure the distance between the lines at two different places; the distances are equal</b>.",{mode:"checkpar"});},
  function(){return mcq("Which sequence draws a line parallel to a given line through a point off the line?",
    {t:"Place a set square edge on the line, rest a ruler against the set square, slide the set square along the ruler to the point, and draw",fb:"Yes: the ruler fixes the direction while the set square slides to the point."},
    [{t:"Draw any line through the point and measure its length to match the given line, checking the length at both ends of the line drawn",fb:"Matching a length does not control direction, so the lines need not be parallel."},{t:"Fold the paper so the point lands anywhere on the line, then draw the crease along the fold from one side of the paper to the other",fb:"That crease depends on where the point lands and is a perpendicular construction, not a parallel one."},{t:"Draw a circle around the point and join two points on the circle, then extend the joining line in both directions past the circle",fb:"A circle construction like that does not fix the direction to match the given line."}],
    "The sliding set square method preserves direction. The answer is <b>Place a set square edge on the line, rest a ruler against the set square, slide the set square along the ruler to the point, and draw</b>.",{mode:"seqpar"});},
  function(){return mcq("A student draws a line through a point and claims it is perpendicular to a given line. Which check confirms the claim?",
    {t:"Measure the angle where the lines meet; it is 90 degrees",fb:"Yes: perpendicular lines are defined by meeting at 90 degrees."},
    [{t:"Check that the new line is longer than the given line",fb:"Length has nothing to do with the angle between the lines."},{t:"Check that the new line does not touch the given line again",fb:"Two straight lines in a plane meet at most once anyway; the angle is the test."},{t:"Measure the distance from the point to both ends of the given line",fb:"Equal distances relate to a perpendicular bisector, not to perpendicularity in general."}],
    "Perpendicular means meeting at 90 degrees, and measuring the angle confirms it. The answer is <b>Measure the angle where the lines meet; it is 90 degrees</b>.",{mode:"checkperp"});}
]),["A construction works because of the property it preserves: direction for parallel, 90 degrees for perpendicular.","Start by naming the property the finished lines must have, then match the method to it."]);

E("u8-shape-vertices",8,["10.8"],1,"gen",function(){
  var tmpl=ri(0,1);var verts,labels=["A","B","C","D"],askIdx;
  if(tmpl===0){var x1=ri(-5,-2),x2=ri(1,4),y1=ri(-4,-1),y2=ri(1,4);verts=[[x1,y2],[x2,y2],[x2,y1],[x1,y1]];askIdx=ri(0,3);}
  else {var bx=ri(-4,-2),by=ri(-3,-1);verts=[[bx,by],[bx+ri(4,6),by],[bx+ri(1,3),by+ri(3,5)]];labels=["A","B","C"];askIdx=2;}
  var target=verts[askIdx];var guard=0;
  while((target[0]===0||target[1]===0||Math.abs(target[0])===Math.abs(target[1]))&&guard<10){askIdx=(askIdx+1)%verts.length;target=verts[askIdx];guard++;}
  var correct=u8pair(target[0],target[1]);
  var raw=[u8pair(target[1],target[0]),u8pair(-target[0],target[1]),u8pair(target[0],-target[1]),u8pair(target[0]+1,target[1]),u8pair(target[0],target[1]+1)];
  var seen={};seen[correct]=1;var ds=[];
  raw.forEach(function(t){if(!seen[t]&&ds.length<3){seen[t]=1;ds.push({t:t,fb:"Read the vertex position again: across from the origin first (x), then up or down (y)."});}});
  var off=2;while(ds.length<3){var t=u8pair(target[0]+off,target[1]);if(!seen[t]){seen[t]=1;ds.push({t:t,fb:"Read the vertex position again: across first, then up or down."});}off++;}
  var q=mcq("A shape is drawn on the Cartesian plane. What are the coordinates of vertex "+labels[askIdx]+"?",
    {t:correct,fb:"Yes: vertex "+labels[askIdx]+" sits at "+correct+"."},ds,
    "Vertex "+labels[askIdx]+" is "+Math.abs(target[0])+" units "+(target[0]>0?"right":"left")+" and "+Math.abs(target[1])+" units "+(target[1]>0?"up":"down")+" from the origin. Its coordinates are <b>"+correct+"</b>.",{mode:"verts",tmpl:tmpl});
  q.figure=u8gridSVG(verts.map(function(v,i){return {x:v[0],y:v[1],label:labels[i]};}),[verts],null);
  return q;
},["Read each vertex as (x, y): horizontal position first, then vertical.","Start at the origin and count across to line up with the vertex, then up or down."]);

E("u8-move-describe",8,["10.10","10.19"],1,"gen",function(){
  var mode=pick(["describe","hdist","vdist"]);
  if(mode==="hdist"){var y0=ri(-5,5);var x1=ri(-5,2);var d=ri(2,7);var x2=x1+d;if(x2>5){x2=x1-d;}
    var dist=Math.abs(x2-x1);
    var ds=u8numOpts(dist,[dist+1,Math.max(dist-1,1),Math.abs(x1)+Math.abs(x2)===dist?dist+2:Math.abs(x1)+Math.abs(x2)]).map(function(v){return {t:String(v),fb:"The points share the same y-coordinate, so subtract the x-coordinates to get the distance."};});
    var q=mcq("Points A "+u8pair(x1,y0)+" and B "+u8pair(x2,y0)+" lie on the same horizontal line. What is the distance between them?",
      {t:String(dist),fb:"Yes: the x-coordinates differ by "+dist+", and the y-coordinates match."},ds,
      "Same y-coordinate, so the distance is the difference in x. \\[ \\begin{aligned} \\text{distance} &= |"+x2+" - ("+x1+")| \\\\ &= "+dist+" \\end{aligned} \\] The distance is <b>"+dist+" units</b>.",{mode:mode}); q.figure=figWideGrid([{x:x1,y:y0,label:"A"},{x:x2,y:y0,label:"B"}],null,null); return q;
  }
  if(mode==="vdist"){var x0=ri(-5,5);var y1=ri(-5,2);var d2=ri(2,7);var y2=y1+d2;if(y2>5){y2=y1-d2;}
    var dist2=Math.abs(y2-y1);
    var ds2=u8numOpts(dist2,[dist2+1,Math.max(dist2-1,1),dist2+3]).map(function(v){return {t:String(v),fb:"The points share the same x-coordinate, so subtract the y-coordinates to get the distance."};});
    var q=mcq("Points A "+u8pair(x0,y1)+" and B "+u8pair(x0,y2)+" lie on the same vertical line. What is the distance between them?",
      {t:String(dist2),fb:"Yes: the y-coordinates differ by "+dist2+", and the x-coordinates match."},ds2,
      "Same x-coordinate, so the distance is the difference in y. \\[ \\begin{aligned} \\text{distance} &= |"+y2+" - ("+y1+")| \\\\ &= "+dist2+" \\end{aligned} \\] The distance is <b>"+dist2+" units</b>.",{mode:mode}); q.figure=figWideGrid([{x:x0,y:y1,label:"A"},{x:x0,y:y2,label:"B"}],null,null); return q;
  }
  var ax=ri(-4,2),ay=ri(-4,2);var dx=pick([-3,-2,-1,1,2,3]);var dy=pick([-3,-2,-1,1,2,3]);
  var bx=ax+dx,by=ay+dy;if(bx>5||bx<-5){dx=-dx;bx=ax+dx;}if(by>5||by<-5){dy=-dy;by=ay+dy;}
  var correct=u8moveText(dx,dy);
  var opts=[u8moveText(dy,dx),u8moveText(-dx,dy),u8moveText(dx,-dy)];
  var seen={};seen[correct]=1;var ds3=[];
  opts.forEach(function(t){if(!seen[t]){seen[t]=1;ds3.push({t:t,fb:"Compare coordinates: the change in x gives the horizontal move, the change in y gives the vertical move, and signs give directions."});}});
  var extra=[u8moveText(-dx,-dy),u8moveText(dx+1,dy),u8moveText(dx,dy+1)];var ei=0;
  while(ds3.length<3&&ei<extra.length){if(!seen[extra[ei]]){seen[extra[ei]]=1;ds3.push({t:extra[ei],fb:"Compare coordinates: change in x is horizontal, change in y is vertical, signs give directions."});}ei++;}
  var q=mcq("How do you move from point A "+u8pair(ax,ay)+" to point B "+u8pair(bx,by)+" on a Cartesian plane?",
    {t:correct,fb:"Yes: x changes by "+dx+" and y changes by "+dy+"."},ds3,
    "Change in x: \\("+bx+" - ("+ax+") = "+dx+"\\), so move "+Math.abs(dx)+" "+(dx>0?"right":"left")+". Change in y: \\("+by+" - ("+ay+") = "+dy+"\\), so move "+Math.abs(dy)+" "+(dy>0?"up":"down")+". The move is <b>"+correct+"</b>.",{mode:mode}); q.figure=figWideGrid([{x:ax,y:ay,label:"A"},{x:bx,y:by,label:"B"}],null,null); return q;
},["Compare the coordinates: change in x is the horizontal move, change in y is the vertical move.","Start by subtracting the x-coordinates, then the y-coordinates."]);

E("u8-distance-cr",8,["10.19"],1,"gen",function(){
  var horiz=Math.random()<0.5;
  if(horiz){var y0=ri(-6,6);var x1=ri(-6,3);var x2=x1+ri(2,8);if(x2>6)x2=x1-ri(2,6);var dist=Math.abs(x2-x1);
    var q=numq("Find the distance between the points "+u8pair(x1,y0)+" and "+u8pair(x2,y0)+".",
      dist,0,
      "The y-coordinates are equal, so the points lie on a horizontal line. Subtract the x-coordinates. \\[ \\begin{aligned} \\text{distance} &= |"+x2+" - ("+x1+")| \\\\ &= "+dist+" \\end{aligned} \\] The distance is <b>"+dist+" units</b>.",{mode:"h"}); q.figure=figWideGrid([{x:x1,y:y0},{x:x2,y:y0}],null,null); return q;
  }
  var x0=ri(-6,6);var y1=ri(-6,3);var y2=y1+ri(2,8);if(y2>6)y2=y1-ri(2,6);var dist2=Math.abs(y2-y1);
  var q=numq("Find the distance between the points "+u8pair(x0,y1)+" and "+u8pair(x0,y2)+".",
    dist2,0,
    "The x-coordinates are equal, so the points lie on a vertical line. Subtract the y-coordinates. \\[ \\begin{aligned} \\text{distance} &= |"+y2+" - ("+y1+")| \\\\ &= "+dist2+" \\end{aligned} \\] The distance is <b>"+dist2+" units</b>.",{mode:"v"}); q.figure=figWideGrid([{x:x0,y:y1},{x:x0,y:y2}],null,null); return q;
},["Points sharing a y-coordinate sit on a horizontal line; points sharing an x-coordinate sit on a vertical line.","Start by checking which coordinate stays the same."]);

E("u8-translate-cr",8,["10.20"],1,"gen",function(){
  var x=ri(-6,4),y=ri(-6,4);var dx=pick([-4,-3,-2,-1,1,2,3,4]);var dy=pick([-4,-3,-2,-1,1,2,3,4]);
  var nx=x+dx,ny=y+dy;var askX=Math.random()<0.5;
  var ans=askX?nx:ny;
  var q=numq("Point P "+u8pair(x,y)+" is translated "+u8moveText(dx,dy)+". What is the "+(askX?"x":"y")+"-coordinate of the image point?",
    ans,0,
    "Apply the translation to each coordinate. \\[ \\begin{aligned} \\text{image} &= ("+x+" + ("+dx+"), "+y+" + ("+dy+")) \\\\ &= "+u8pair(nx,ny)+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",{mode:askX?"tx":"ty"}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
},["A translation adds to the x-coordinate for left or right moves and to the y-coordinate for up or down moves.","Start by working out how the asked coordinate changes."]);

E("u8-reflect-point",8,["10.20","10.12"],1,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var overX=Math.random()<0.5;var axis=overX?"x-axis":"y-axis";
  var img=overX?[x,-y]:[-x,y];var other=overX?[-x,y]:[x,-y];
  var correct=u8pair(img[0],img[1]);
  var raw=[u8pair(x,y),u8pair(other[0],other[1]),u8pair(-x,-y)];
  var ds=raw.map(function(t,i){return {t:t,fb:i===0?"That is the original point; a reflection moves it across the axis.":(i===1?"That is a reflection across the other axis; check which axis the question names.":"That flips both coordinates, which is a half-turn, not a single-axis reflection.")};});
  var q=mcq("Point P "+u8pair(x,y)+" is reflected across the "+axis+". What are the coordinates of the image?",
    {t:correct,fb:"Yes: reflection across the "+axis+" flips the sign of the "+(overX?"y":"x")+"-coordinate only."},ds,
    "Reflecting across the "+axis+" changes the sign of the "+(overX?"y":"x")+"-coordinate and leaves the other alone: "+u8pair(x,y)+" becomes <b>"+correct+"</b>.",{mode:overX?"rx":"ry"});
  q.figure=u8gridSVG([{x:x,y:y,label:"P"}],null,null);
  return q;
},["Reflection across the x-axis flips the y sign; across the y-axis flips the x sign.","Start by deciding which coordinate changes sign for the named axis."]);

E("u8-complete-shape",8,["10.8","10.17","10.18"],2,"gen",function(){
  var ax=ri(-5,-2),ay=ri(-4,0);var bx=ax+ri(3,5),by=ay;var sx=pick([-2,-1,1,2]);var sy=ri(2,4);
  var cx=bx+sx,cy=by+sy;var dx2=ax+sx,dy2=ay+sy;
  if(cx>6||cx<-6||dx2>6){sx=-sx;cx=bx+sx;dx2=ax+sx;}
  var correct=u8pair(dx2,dy2);
  var taken={};taken[u8pair(ax,ay)]=1;taken[u8pair(bx,by)]=1;taken[u8pair(cx,cy)]=1;taken[correct]=1;
  var offs=[[1,0],[0,1],[-1,0],[0,-1],[2,1],[-2,-1],[1,-1]];
  var ds=[];
  for(var i=0;i<offs.length&&ds.length<3;i++){var t=u8pair(dx2+offs[i][0],dy2+offs[i][1]);if(!taken[t]){taken[t]=1;ds.push({t:t,fb:"In a parallelogram, the fourth vertex shifts from A by the same change that takes B to C."});}}
  var q=mcq("Points A "+u8pair(ax,ay)+", B "+u8pair(bx,by)+" and C "+u8pair(cx,cy)+" are three vertices of a parallelogram ABCD, in order. What are the coordinates of vertex D?",
    {t:correct,fb:"Yes: D shifts from A by the same change that takes B to C."},ds,
    "From B to C the change is ("+(cx-bx)+", "+(cy-by)+"). Apply the same change to A. \\[ \\begin{aligned} D &= ("+ax+" + ("+(cx-bx)+"), "+ay+" + ("+(cy-by)+")) \\\\ &= "+correct+" \\end{aligned} \\] Vertex D is <b>"+correct+"</b>.",{mode:"para"});
  q.figure=u8gridSVG([{x:ax,y:ay,label:"A"},{x:bx,y:by,label:"B"},{x:cx,y:cy,label:"C"}],null,[[ax,ay,bx,by],[bx,by,cx,cy]]);
  return q;
},["Opposite sides of a parallelogram shift by the same change in x and y.","Start by finding the change from B to C, then apply it to A."]);

E("u8-transform-describe",8,["10.11"],1,"gen",function(){
  var type=pick(["translate","reflectX","reflectY"]);
  var px=pick([-4,-3,-2,-1,1,2,3,4]);var py=pick([-4,-3,-2,-1,1,2,3,4]);
  var qx=px+pick([-3,-2,2,3]);var qy=py+pick([-3,-2,2,3]);if(qx>5||qx<-5)qx=px-2;if(qy>5||qy<-5)qy=py-2;
  var P=[px,py],Q=[qx,qy],P2,Q2,correct;
  function transText(dx,dy){return "Translation: "+u8moveText(dx,dy);}
  var opts=[];
  if(type==="translate"){var dx=pick([-3,-2,-1,1,2,3]);var dy=pick([-3,-2,-1,1,2,3]);if(Math.abs(dx)===Math.abs(dy))dy=dy>0?dy+1:dy-1;
    P2=[px+dx,py+dy];Q2=[qx+dx,qy+dy];correct=transText(dx,dy);
    opts=[{t:transText(dy,dx),fb:"That swaps the horizontal and vertical changes; check the change in x first."},{t:"Reflection across the x-axis",fb:"A reflection would flip the sign of the y-coordinates; here both points shift by the same amounts instead."},{t:"Reflection across the y-axis",fb:"A reflection would flip the sign of the x-coordinates; here both points shift by the same amounts instead."}];
  } else if(type==="reflectX"){P2=[px,-py];Q2=[qx,-qy];correct="Reflection across the x-axis";
    opts=[{t:"Reflection across the y-axis",fb:"That would flip the x signs; here the y signs flipped and the x values stayed."},{t:transText(P2[0]-px,P2[1]-py),fb:"That translation fits point P alone, but it does not carry Q to its image; check both vertices."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"That translation fits point Q alone, but it does not carry P to its image; check both vertices."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(1,P2[1]-py),fb:"Check both vertices: a single translation must move every vertex by the same change."};
  } else {P2=[-px,py];Q2=[-qx,qy];correct="Reflection across the y-axis";
    opts=[{t:"Reflection across the x-axis",fb:"That would flip the y signs; here the x signs flipped and the y values stayed."},{t:transText(P2[0]-px,P2[1]-py),fb:"That translation fits point P alone, but it does not carry Q to its image; check both vertices."},{t:transText(Q2[0]-qx,Q2[1]-qy),fb:"That translation fits point Q alone, but it does not carry P to its image; check both vertices."}];
    if(opts[1].t===opts[2].t)opts[2]={t:transText(P2[0]-px,1),fb:"Check both vertices: a single translation must move every vertex by the same change."};
  }
  var seen={};seen[correct]=1;var ds=[];
  opts.forEach(function(o){if(!seen[o.t]){seen[o.t]=1;ds.push(o);}});
  var filler=type==="translate"?"Reflection across the origin":"Translation: "+u8moveText(1,1);
  while(ds.length<3){if(!seen[filler]){seen[filler]=1;ds.push({t:filler,fb:"Test the description on both vertices; it must carry each one to its image."});}else filler="Translation: "+u8moveText(2,1);}
  var q=mcq("A two-vertex design has vertices P "+u8pair(P[0],P[1])+" and Q "+u8pair(Q[0],Q[1])+". After a transformation, the images are P' "+u8pair(P2[0],P2[1])+" and Q' "+u8pair(Q2[0],Q2[1])+". Which transformation describes the change?",
    {t:correct,fb:"Yes: applying it to both P and Q gives exactly the image vertices."},ds,
    "Test each vertex. P "+u8pair(P[0],P[1])+" goes to "+u8pair(P2[0],P2[1])+" and Q "+u8pair(Q[0],Q[1])+" goes to "+u8pair(Q2[0],Q2[1])+", which matches: <b>"+correct+"</b>.",{mode:type}); q.figure=figWideGrid([{x:P[0],y:P[1],label:"P"},{x:Q[0],y:Q[1],label:"Q"},{x:P2[0],y:P2[1],label:"P'"},{x:Q2[0],y:Q2[1],label:"Q'"}],[[P,Q],[P2,Q2]],null); return q;
},["Test a description on every vertex, not just one: a transformation must fit them all.","Start by comparing the first vertex with its image, then confirm with the second."]);

E("u8-successive-cr",8,["10.10","10.20","10.11"],1,"gen",function(){
  var x=ri(-4,3),y=ri(-4,3);
  var dx1=pick([-3,-2,-1,1,2,3]);var dy1=pick([-3,-2,-1,1,2,3]);
  var dx2=pick([-2,-1,1,2]);var dy2=pick([-2,-1,1,2]);
  var fx=x+dx1+dx2,fy=y+dy1+dy2;var askX=Math.random()<0.5;var ans=askX?fx:fy;
  var q=numq("A point starts at "+u8pair(x,y)+". It moves "+u8moveText(dx1,dy1)+", and then it moves "+u8moveText(dx2,dy2)+". What is the "+(askX?"x":"y")+"-coordinate of the final position?",
    ans,0,
    "Track the coordinates step by step. \\[ \\begin{aligned} \\text{start} &= "+u8pair(x,y)+" \\\\ \\text{after move 1} &= "+u8pair(x+dx1,y+dy1)+" \\\\ \\text{after move 2} &= "+u8pair(fx,fy)+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",{mode:askX?"sx":"sy"}); q.figure=figWideGrid([{x:x,y:y}],null,null); return q;
},["Apply the moves one at a time, updating both coordinates after each move.","Start by writing the new point after the first move."]);

function u8scaleSVG(s,a,b){
  var W=300,H=300,c=150,st=36;
  function X(k){return c+k*st;}function Y(k){return c-k*st;}
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cartesian plane with scaled axes">';
  for(var g=-3;g<=3;g++){if(g===0)continue;out+='<line x1="'+X(g)+'" y1="24" x2="'+X(g)+'" y2="276" stroke="'+FIG_SHADE+'" stroke-width="1"/>';out+='<line x1="24" y1="'+Y(g)+'" x2="276" y2="'+Y(g)+'" stroke="'+FIG_SHADE+'" stroke-width="1"/>';}
  out+='<line x1="24" y1="150" x2="276" y2="150" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="150" y1="24" x2="150" y2="276" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  for(var t=-3;t<=3;t++){if(t===0)continue;out+=_txt(X(t),166,String(t*s),11,false);out+=_txt(134,Y(t),String(t*s),11,false);}
  out+=_txt(268,134,"x",13,true)+_txt(164,36,"y",13,true);
  out+='<circle cx="'+X(a)+'" cy="'+Y(b)+'" r="3.6" fill="'+FIG_INK+'"/>';
  out+=_txt(X(a)+12,Y(b)-11,"P",13,true);
  return out+'</svg>';
}

E("u8-quadrant-locate",8,["10.7","10.18"],1,"gen",function(){
  var mode=pick(["which-quad","which-point","design"]);
  var quads=["Quadrant I","Quadrant II","Quadrant III","Quadrant IV"];
  if(mode==="which-quad"){
    var sx=pick([-1,1]),sy=pick([-1,1]);var x=sx*ri(1,6),y=sy*ri(1,6);
    var correct=sx>0?(sy>0?quads[0]:quads[3]):(sy>0?quads[1]:quads[2]);
    var ds=quads.filter(function(q){return q!==correct;}).map(function(q){return {t:q,fb:"Check the signs: x is "+(sx>0?"positive":"negative")+" and y is "+(sy>0?"positive":"negative")+" for this point."};});
    var q=mcq("In which quadrant does the point "+u8pair(x,y)+" lie?",
      {t:correct,fb:"Yes: "+(sx>0?"positive":"negative")+" x and "+(sy>0?"positive":"negative")+" y place the point in "+correct+"."},ds,
      "The x-coordinate is "+(sx>0?"positive":"negative")+" and the y-coordinate is "+(sy>0?"positive":"negative")+". That sign pattern belongs to <b>"+correct+"</b>.",{mode:mode}); q.figure=figWideGrid([{x:x,y:y}],null,null); return q;
  }
  var targetQuad=ri(0,3);var signs=[[1,1],[-1,1],[-1,-1],[1,-1]];
  var pts=[];for(var i=0;i<4;i++){pts.push([signs[i][0]*ri(1,6),signs[i][1]*ri(1,6)]);}
  var correctP=u8pair(pts[targetQuad][0],pts[targetQuad][1]);
  var ds2=pts.filter(function(p,i){return i!==targetQuad;}).map(function(p){return {t:u8pair(p[0],p[1]),fb:"That point has the sign pattern of a different quadrant. "+quads[targetQuad]+" needs x "+(signs[targetQuad][0]>0?"positive":"negative")+" and y "+(signs[targetQuad][1]>0?"positive":"negative")+"."};});
  if(mode==="design"){
    var q=mcq("A design point must lie in "+quads[targetQuad]+". Which point fits the design?",
      {t:correctP,fb:"Yes: its signs match "+quads[targetQuad]+"."},ds2,
      quads[targetQuad]+" holds points with x "+(signs[targetQuad][0]>0?"positive":"negative")+" and y "+(signs[targetQuad][1]>0?"positive":"negative")+". Only "+correctP+" fits. The answer is <b>"+correctP+"</b>.",{mode:mode}); q.figure=figWideGrid(pts.map(function(p){return {x:p[0],y:p[1]};}),null,null); return q;
  }
  var q=mcq("Which point lies in "+quads[targetQuad]+"?",
    {t:correctP,fb:"Yes: its signs match "+quads[targetQuad]+"."},ds2,
    quads[targetQuad]+" holds points with x "+(signs[targetQuad][0]>0?"positive":"negative")+" and y "+(signs[targetQuad][1]>0?"positive":"negative")+". The point is <b>"+correctP+"</b>.",{mode:mode}); q.figure=figWideGrid(pts.map(function(p){return {x:p[0],y:p[1]};}),null,null); return q;
},["Quadrants are set by signs: I (+, +), II (-, +), III (-, -), IV (+, -).","Start by checking the sign of each coordinate."]);

E("u8-grid-scale",8,["10.6","10.9"],1,"gen",function(){
  var s=pick([2,5,10]);var a=pick([-3,-2,-1,1,2,3]);var b=pick([-3,-2,-1,1,2,3]);var guard=0;
  while(Math.abs(a)===Math.abs(b)&&guard<15){b=pick([-3,-2,-1,1,2,3]);guard++;}
  var X=a*s,Y=b*s;var ask=pick(["pair","pair","xonly","yonly"]);
  if(ask==="xonly"||ask==="yonly"){
    var val=ask==="xonly"?X:Y;
    var ds=u8numOpts(val,[ask==="xonly"?a:b,val+s,Math.max(val-s,-900),-val]).map(function(v){return {t:String(v),fb:"Each gridline step on this plane counts as "+s+" units, so multiply the step count by "+s+"."};});
    var qq=mcq("On this Cartesian plane, each gridline step counts as "+s+" units. What is the "+(ask==="xonly"?"x":"y")+"-coordinate of point P?",
      {t:String(val),fb:"Yes: P is "+(ask==="xonly"?a:b)+" steps from the axis, and each step is "+s+" units."},ds,
      "Point P is "+Math.abs(ask==="xonly"?a:b)+" gridline steps in the "+(ask==="xonly"?(a>0?"positive":"negative"):(b>0?"positive":"negative"))+" direction, at "+s+" units per step: \\("+(ask==="xonly"?a:b)+" \\times "+s+" = "+val+"\\). The coordinate is <b>"+val+"</b>.",{mode:ask});
    qq.figure=u8scaleSVG(s,a,b);return qq;
  }
  var correct=u8pair(X,Y);
  var raw=[u8pair(a,b),u8pair(Y,X),u8pair(-X,Y),u8pair(X,-Y)];
  var seen={};seen[correct]=1;var ds2=[];
  raw.forEach(function(t){if(!seen[t]&&ds2.length<3){seen[t]=1;ds2.push({t:t,fb:"Count gridline steps from the origin, then multiply by "+s+", the value of each step."});}});
  var off=1;while(ds2.length<3){var t=u8pair(X+off*s,Y);if(!seen[t]){seen[t]=1;ds2.push({t:t,fb:"Count gridline steps from the origin, then multiply by "+s+"."});}off++;}
  var q=mcq("On this Cartesian plane, each gridline step counts as "+s+" units. What are the coordinates of point P?",
    {t:correct,fb:"Yes: P is "+a+" steps across and "+b+" steps up, at "+s+" units per step."},ds2,
    "Across: \\("+a+" \\times "+s+" = "+X+"\\). Up: \\("+b+" \\times "+s+" = "+Y+"\\). The coordinates are <b>"+correct+"</b>.",{mode:"pair"});
  q.figure=u8scaleSVG(s,a,b);
  return q;
},["When axes use a scale, multiply the gridline steps by the value of each step.","Start by counting steps from the origin, then apply the scale."]);

E("u8-bisector-cr",8,["10.15","10.16"],3,"gen",function(){
  var mode=pick(["perimeter","supp","path"]);
  if(mode==="supp"){var T=ri(15,80)*2;var half=T/2;var ans=180-half;
    var q=numq("An angle of "+T+" degrees is bisected. One of the two equal angles sits on a straight line with an angle marked x. Find x, in degrees.",
      ans,0,
      "The bisector halves the angle: \\("+T+" \\div 2 = "+half+"^\\circ\\). Angles on a straight line total 180 degrees. \\[ \\begin{aligned} x &= 180 - "+half+" \\\\ &= "+ans+" \\end{aligned} \\] The angle x is <b>"+ans+" degrees</b>.",{mode:mode}); q.figure=figBisectSupp(half+"°"); return q;
  }
  var L=ri(4,12)*2;var d=ri(3,14);
  if(mode==="perimeter"){
    var q=numq("Segment AB is "+L+" cm long. Point P lies on the perpendicular bisector of AB, and the distance from P to A is "+d+" cm. What is the perimeter of triangle PAB, in centimetres?",
      2*d+L,0,
      "Every point on the perpendicular bisector is the same distance from A and B, so PB is also "+d+" cm. \\[ \\begin{aligned} \\text{perimeter} &= "+d+" + "+d+" + "+L+" \\\\ &= "+(2*d+L)+" \\end{aligned} \\] The perimeter is <b>"+(2*d+L)+" cm</b>.",{mode:mode}); q.figure=figEqui(L+" cm",d+" cm"); return q;
  }
  var q=numq("A garden path goes from A to a point P on the perpendicular bisector of the front edge AB, and then to B. The distance from P to A is "+d+" m. How long is the full path from A to P to B, in metres?",
    2*d,0,
    "P lies on the perpendicular bisector, so P is the same distance from B as from A: PB is "+d+" m. \\[ \\begin{aligned} \\text{path} &= "+d+" + "+d+" \\\\ &= "+(2*d)+" \\end{aligned} \\] The path is <b>"+(2*d)+" m</b>.",{mode:mode}); q.figure=figEqui(null,d+" m"); return q;
},["Points on a perpendicular bisector are equidistant from the segment endpoints; a bisector halves an angle.","Start by writing down what the bisector guarantees before you calculate."]);

E("u8-transform-cr",8,["10.20","10.12"],3,"gen",function(){
  var x=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);var y=pick([-5,-4,-3,-2,-1,1,2,3,4,5]);
  var dx=pick([-4,-3,-2,-1,1,2,3,4]);var dy=pick([-4,-3,-2,-1,1,2,3,4]);
  var order=pick(["reflectFirst","translateFirst"]);var overX=Math.random()<0.5;var axis=overX?"x-axis":"y-axis";
  var step1,step2;
  if(order==="reflectFirst"){step1=overX?[x,-y]:[-x,y];step2=[step1[0]+dx,step1[1]+dy];}
  else {step1=[x+dx,y+dy];step2=overX?[step1[0],-step1[1]]:[-step1[0],step1[1]];}
  var askX=Math.random()<0.5;var ans=askX?step2[0]:step2[1];
  var promptText=order==="reflectFirst"?
    "Point P "+u8pair(x,y)+" is reflected across the "+axis+", and the image is then translated "+u8moveText(dx,dy)+".":
    "Point P "+u8pair(x,y)+" is translated "+u8moveText(dx,dy)+", and the image is then reflected across the "+axis+".";
  var q=numq(promptText+" What is the "+(askX?"x":"y")+"-coordinate of the final image?",
    ans,0,
    "Apply the transformations in order. \\[ \\begin{aligned} \\text{start} &= "+u8pair(x,y)+" \\\\ \\text{after step 1} &= "+u8pair(step1[0],step1[1])+" \\\\ \\text{final image} &= "+u8pair(step2[0],step2[1])+" \\end{aligned} \\] The "+(askX?"x":"y")+"-coordinate is <b>"+ans+"</b>.",{mode:order}); q.figure=figWideGrid([{x:x,y:y,label:"P"}],null,null); return q;
},["Do the transformations one at a time, in the order given, updating the point after each step.","Start by applying the first transformation to the original point."]);

E("u8-transform-image",8,["10.11","10.12"],3,"gen",function(){
  var base=[[ri(-5,-3),ri(-3,0)],[ri(0,2),ri(-3,0)],[ri(-2,0),ri(2,4)]];
  var labels=["A","B","C"];var type=pick(["translate","reflectX","reflectY"]);
  var dx=pick([-3,-2,2,3]);var dy=pick([-3,-2,2,3]);
  function img(p){if(type==="translate")return [p[0]+dx,p[1]+dy];if(type==="reflectX")return [p[0],-p[1]];return [-p[0],p[1]];}
  var askIdx=ri(0,2);var target=base[askIdx];var im=img(target);
  var transDesc=type==="translate"?("translated "+u8moveText(dx,dy)):("reflected across the "+(type==="reflectX"?"x-axis":"y-axis"));
  var correct=u8pair(im[0],im[1]);
  var candSet=[u8pair(target[0],target[1])];
  if(type==="translate"){candSet.push(u8pair(target[0]+dy,target[1]+dx));candSet.push(u8pair(target[0]-dx,target[1]-dy));}
  else if(type==="reflectX"){candSet.push(u8pair(-target[0],target[1]));candSet.push(u8pair(-target[0],-target[1]));}
  else {candSet.push(u8pair(target[0],-target[1]));candSet.push(u8pair(-target[0],-target[1]));}
  candSet.push(u8pair(im[0]+1,im[1]));candSet.push(u8pair(im[0],im[1]+1));
  var seen={};seen[correct]=1;var ds=[];
  candSet.forEach(function(t){if(!seen[t]&&ds.length<3){seen[t]=1;ds.push({t:t,fb:"Apply the stated transformation to vertex "+labels[askIdx]+" itself: translations add to both coordinates, reflections flip one sign."});}});
  var off=2;while(ds.length<3){var t=u8pair(im[0]+off,im[1]);if(!seen[t]){seen[t]=1;ds.push({t:t,fb:"Apply the stated transformation to vertex "+labels[askIdx]+" itself."});}off++;}
  var q=mcq("Triangle ABC is "+transDesc+". What are the coordinates of the image of vertex "+labels[askIdx]+"?",
    {t:correct,fb:"Yes: applying the transformation to "+labels[askIdx]+" "+u8pair(target[0],target[1])+" gives "+correct+"."},ds,
    "Vertex "+labels[askIdx]+" is "+u8pair(target[0],target[1])+". Applying the transformation gives <b>"+correct+"</b>.",{mode:type});
  q.figure=u8gridSVG(base.map(function(p,i){return {x:p[0],y:p[1],label:labels[i]};}),[base],null);
  return q;
},["Apply the transformation to the named vertex exactly as stated.","Start by writing the coordinates of the named vertex from the diagram."]);

E("u8-design-shape",8,["10.17","10.18"],3,"var",varset([
  function(){var q=mcq("A design uses the points (1, 1), (5, 1) and (5, 4) as three corners of a rectangle, in order. Which point completes the rectangle?",
    {t:"(1, 4)",fb:"Yes: it shares its x with the first point and its y with the third, closing the rectangle."},
    [{t:"(5, 5)",fb:"That point extends the right side past the top; the fourth corner must align with (1, 1) vertically."},{t:"(1, 0)",fb:"That point sits below the first corner; the fourth corner must match the top height of 4."},{t:"(4, 4)",fb:"The fourth corner must share the first point's x-coordinate of 1 to close the left side."}],
    "The fourth corner pairs the first point's x with the third point's y: (1, 4). The answer is <b>(1, 4)</b>.",{mode:"rect"}); q.figure=figWideGrid([{x:1,y:1},{x:5,y:1},{x:5,y:4}],null,[[1,1,5,1],[5,1,5,4]]); return q;},
  function(){var q=mcq("A symmetric design has a point at (3, 2). The design is symmetric about the y-axis. Which point must also be in the design?",
    {t:"(-3, 2)",fb:"Yes: symmetry about the y-axis flips the x sign and keeps the y value."},
    [{t:"(3, -2)",fb:"That flips the y sign, which is symmetry about the x-axis instead."},{t:"(-3, -2)",fb:"That flips both signs, which is a half-turn about the origin."},{t:"(2, 3)",fb:"That swaps the coordinates, which is symmetry about a diagonal line, not the y-axis."}],
    "Mirror points across the y-axis have opposite x-coordinates and equal y-coordinates. The answer is <b>(-3, 2)</b>.",{mode:"mirror"}); q.figure=figWideGrid([{x:3,y:2}],null,null); return q;},
  function(){var q=mcq("Plotting the points (0, 0), (4, 0), (4, 3) and (0, 3) in order and joining them makes which shape?",
    {t:"Rectangle",fb:"Yes: the sides run horizontally and vertically with lengths 4 and 3, meeting at right angles."},
    [{t:"Triangle",fb:"Four points joined in order make a four-sided shape, not a triangle."},{t:"Pentagon",fb:"Four points make four sides, not five."},{t:"Square",fb:"The sides are 4 and 3 units, which are unequal, so the shape is a rectangle rather than a square."}],
    "Four vertices with horizontal and vertical sides of 4 and 3 form a rectangle. The answer is <b>Rectangle</b>.",{mode:"shape"}); q.figure=figWideGrid([{x:0,y:0},{x:4,y:0},{x:4,y:3},{x:0,y:3}],[[[0,0],[4,0],[4,3],[0,3]]],null); return q;},
  function(){return mcq("A triangular design sits entirely in Quadrant II. Which list of vertices could make it?",
    {t:"(-1, 2), (-4, 1), (-2, 5)",fb:"Yes: every point has negative x and positive y, which is Quadrant II."},
    [{t:"(1, 2), (4, 1), (2, 5)",fb:"Those points have positive x and positive y: Quadrant I."},{t:"(-1, -2), (-4, -1), (-2, -5)",fb:"Those points have negative x and negative y: Quadrant III."},{t:"(-1, 2), (3, 4), (-2, 5)",fb:"One point has positive x, so the triangle would cross into Quadrant I."}],
    "Quadrant II needs negative x and positive y for every vertex. The answer is <b>(-1, 2), (-4, 1), (-2, 5)</b>.",{mode:"quad2design"});},
  function(){var q=mcq("Three corners of a square design are (2, 1), (5, 1) and (5, 4). Which point is the fourth corner?",
    {t:"(2, 4)",fb:"Yes: the sides are 3 units, and (2, 4) closes the square above (2, 1)."},
    [{t:"(2, 5)",fb:"That would make the left side 4 units while the bottom side is 3, breaking the square."},{t:"(4, 4)",fb:"The fourth corner must align vertically with (2, 1), so its x-coordinate is 2."},{t:"(5, 3)",fb:"That point lies on the right side area rather than closing the top-left corner."}],
    "The bottom side runs 3 units from (2, 1) to (5, 1), so the fourth corner sits 3 units above (2, 1). The answer is <b>(2, 4)</b>.",{mode:"square"}); q.figure=figWideGrid([{x:2,y:1},{x:5,y:1},{x:5,y:4}],null,[[2,1,5,1],[5,1,5,4]]); return q;}
]),["Use the coordinate patterns of the shape: shared x or y values for rectangles, equal side steps for squares.","Start by sketching the given points and looking for the missing corner pattern."]);

E("u8-construct-verify",8,["10.13","10.14","10.15"],3,"var",varset([
  function(){var q=mcq("A student constructs the perpendicular bisector of a segment with compass arcs. Which check verifies the construction?",
    {t:"Measure from the crossing point to each endpoint; the distances are equal, and the crossing angle is 90 degrees",fb:"Yes: equal halves plus a right angle are the two defining properties."},
    [{t:"Measure the whole segment; it matches the compass setting used for the two arcs when the bisector was constructed",fb:"The compass setting is a construction tool, not a property of the bisector."},{t:"Check that the bisector is longer than the segment on both sides of the segment it crosses in the diagram",fb:"Length of the bisector line is not part of its definition."},{t:"Check that the bisector passes through one endpoint and then through the midpoint of the segment as well",fb:"A bisector passes through the midpoint, not through an endpoint."}],
    "A perpendicular bisector must halve the segment and cross at 90 degrees, and measuring confirms both. The answer is <b>Measure from the crossing point to each endpoint; the distances are equal, and the crossing angle is 90 degrees</b>.",{mode:"verifybis"}); q.figure=figBisect("construct"); return q;},
  function(){var q=mcq("In the compass method for a perpendicular bisector, arcs are drawn from both endpoints using the same compass setting. Why must the setting stay the same?",
    {t:"Equal radii make the arc crossings sit the same distance from both endpoints, which places them on the perpendicular bisector",fb:"Yes: points equidistant from both endpoints lie on the perpendicular bisector."},
    [{t:"A wider setting would erase the segment if the arcs were drawn with the compass point placed at the midpoint of the segment being bisected",fb:"The setting affects the arcs' size, not the segment itself; equality of radii is the point."},{t:"The compass cannot be adjusted once opened, so the setting chosen at the start must be used for every arc in the construction",fb:"A compass can be adjusted; the method requires keeping it fixed for both endpoints."},{t:"Equal radii make the arcs the same colour, so the crossings can be told apart from the segment in the finished drawing",fb:"Colour plays no role in the geometry of the construction."}],
    "Equal radii guarantee the crossings are equidistant from the endpoints, which defines the bisector. The answer is <b>Equal radii make the arc crossings sit the same distance from both endpoints</b>.",{mode:"arcs"}); q.figure=figBisect("construct"); return q;},
  function(){var q=mcq("A second method for the perpendicular bisector is folding paper so the two endpoints of a segment meet. Why does the crease work as the bisector?",
    {t:"The fold maps the segment onto itself with endpoints swapped, so the crease crosses at the midpoint at 90 degrees",fb:"Yes: matching endpoints forces the crease through the midpoint, and a fold crease is perpendicular to the segment."},
    [{t:"The crease is always the longest line on the paper, running from one corner of the sheet to the opposite corner of the sheet",fb:"Crease length is irrelevant; the endpoint matching is what creates the bisector."},{t:"Folding doubles the segment length, because the two halves of the paper lie on top of each other along the crease line",fb:"Folding does not change the segment; it maps it onto itself."},{t:"The crease passes through both endpoints of the segment and joins them where the paper is folded over",fb:"The crease crosses the segment at its midpoint; it does not pass through the endpoints."}],
    "Matching the endpoints makes the crease the perpendicular bisector. The answer is <b>The fold maps the segment onto itself with endpoints swapped</b>.",{mode:"fold"}); q.figure=figBisect("construct"); return q;},
  function(){return mcq("A student draws a line parallel to a base line by copying an angle with a compass. Why does copying the angle work?",
    {t:"Equal corresponding angles formed with a transversal guarantee the lines are parallel",fb:"Yes: when a transversal makes equal corresponding angles, the lines are parallel."},
    [{t:"The copied angle makes the new line the same length as the base line drawn on the page",fb:"Angle copying controls direction, not length."},{t:"The compass draws both lines at the same time, in a single step of the construction",fb:"The lines are drawn separately; the equal angles link their directions."},{t:"Any copied angle produces a perpendicular line through the point on the base line",fb:"Copying an angle reproduces direction for parallel lines; perpendicular needs a 90 degree angle specifically."}],
    "Equal corresponding angles are the test for parallel lines, so copying the angle works. The answer is <b>Equal corresponding angles formed with a transversal guarantee the lines are parallel</b>.",{mode:"copyangle"});},
  function(){return mcq("After drawing a line claimed to be perpendicular to a given line, a student checks it with a set square and finds a small gap at the corner. What should the student conclude?",
    {t:"The line is not exactly perpendicular, because a true right angle fits the set square corner with no gap",fb:"Yes: the set square's corner is a true 90 degrees, so a gap means the drawn angle differs from 90."},
    [{t:"The line is perpendicular, because small gaps do not matter in constructions when the line is drawn by hand with a ruler",fb:"Verification exists to catch exactly this kind of error; the claim fails the check."},{t:"The set square is at fault, because drawn lines are always exact for this kind of check",fb:"The set square corner is manufactured as a right angle; the drawn line is the part under test."},{t:"The line is parallel instead of perpendicular, because it runs in the same direction",fb:"A near-right angle is neither perpendicular nor evidence of parallel."}],
    "The gap shows the angle is not exactly 90 degrees, so the line fails verification as perpendicular. The answer is <b>The line is not exactly perpendicular</b>.",{mode:"gap"});}
]),["Verification measures the defining property: equal halves and 90 degrees, equal angles, or equal distances.","Start by stating the property the construction must satisfy, then choose the check that measures it."]);
