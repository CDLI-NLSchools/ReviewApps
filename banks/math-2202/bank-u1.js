// Math 2202 Unit 1 Drawing and Design question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 70 to 473).
// CRMARKS: u1-cr-front-real-height=2
// CRMARKS: u1-cr-total-cubes=2
// CRMARKS: u1-cr-iso-total=2
// CRMARKS: u1-cr-scale-real=3
// CRMARKS: u1-cr-scale-drawn=3
// CRMARKS: u1-cr-assembled-height=3
// CRMARKS: u1-cr-level-off=2
// CRMARKS: u1-cr-scale-area=3
/* ===== Unit 1 ===== */
// Unit 1 Drawing and Design (indicators 3.17-3.28)
function u1T(x,y,s,size,anchor,bold){return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||12)+'" fill="'+FIG_INK+'" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+s+'</text>';}
function u1Sum(h){var t=0;for(var y=0;y<h.length;y++)for(var x=0;x<h[y].length;x++)t+=h[y][x];return t;}
function u1Foot(h){var t=0;for(var y=0;y<h.length;y++)for(var x=0;x<h[y].length;x++)if(h[y][x]>0)t++;return t;}
function u1Max(h){var m=0;for(var y=0;y<h.length;y++)for(var x=0;x<h[y].length;x++)if(h[y][x]>m)m=h[y][x];return m;}
function u1ColMax(h){var out=[];for(var x=0;x<h[0].length;x++){var m=0;for(var y=0;y<h.length;y++)if(h[y][x]>m)m=h[y][x];out.push(m);}return out;}
function u1RowMax(h){var out=[];for(var y=0;y<h.length;y++){var m=0;for(var x=0;x<h[y].length;x++)if(h[y][x]>m)m=h[y][x];out.push(m);}return out;}
function u1Stack(cols,rows,maxH){var h=[],y,x;for(y=0;y<rows;y++){var r=[];for(x=0;x<cols;x++)r.push(ri(0,maxH));h.push(r);}if(u1Sum(h)===0)h[0][0]=1;return h;}
function u1Panel(h,view,ox,oy,cell,title){
  var s="",i,j,maxH=u1Max(h);
  if(title)s+=u1T(ox,title,11,"middle",true).replace('y="0"','y="0"');
  if(view==="top"){
    for(j=0;j<h.length;j++)for(i=0;i<h[0].length;i++){
      var v=h[j][i];
      s+='<rect x="'+(ox+i*cell)+'" y="'+(oy+j*cell)+'" width="'+cell+'" height="'+cell+'" fill="'+(v>0?FIG_SHADE:"none")+'" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
      if(v>0)s+=u1T(ox+i*cell+cell/2,oy+j*cell+cell/2+1,String(v),12,"middle",true);
    }
  } else {
    var seq=(view==="front")?u1ColMax(h):u1RowMax(h);
    for(i=0;i<seq.length;i++)for(var k=0;k<seq[i];k++){
      s+='<rect x="'+(ox+i*cell)+'" y="'+(oy+(maxH-1-k)*cell)+'" width="'+cell+'" height="'+cell+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    }
    s+='<line x1="'+(ox-4)+'" y1="'+(oy+maxH*cell)+'" x2="'+(ox+seq.length*cell+4)+'" y2="'+(oy+maxH*cell)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  }
  return s;
}
function u1ViewFig(h,view){
  var cell=30,maxH=u1Max(h);
  var gw=(view==="top"?h[0].length:(view==="front"?h[0].length:h.length))*cell;
  var gh=(view==="top"?h.length:maxH)*cell;
  var W=Math.max(200,gw+40),H=gh+46;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  s+=u1Panel(h,view,(W-gw)/2,16,cell,"");
  s+='</svg>';return s;
}
function u1AllFig(h){
  var cell=17,maxH=u1Max(h);
  var tw=h[0].length*cell, fw=h[0].length*cell, sw=h.length*cell;
  var gh=Math.max(h.length,maxH)*cell;
  var s='<svg width="340" height="'+(gh+52)+'" viewBox="0 0 340 '+(gh+52)+'" xmlns="http://www.w3.org/2000/svg">';
  s+=u1T(14+tw/2,10,"TOP",11,"middle",true)+u1Panel(h,"top",14,20,cell,"");
  s+=u1T(14+tw+22+fw/2,10,"FRONT",11,"middle",true)+u1Panel(h,"front",14+tw+22,20,cell,"");
  s+=u1T(14+tw+22+fw+22+sw/2,10,"SIDE",11,"middle",true)+u1Panel(h,"side",14+tw+22+fw+22,20,cell,"");
  s+='</svg>';return s;
}
function u1Cube(x,y){
  var s="";
  s+='<polygon points="'+x+','+(y-16)+' '+(x+15)+','+(y-8)+' '+x+','+y+' '+(x-15)+','+(y-8)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  s+='<polygon points="'+(x-15)+','+(y-8)+' '+x+','+y+' '+x+','+(y+22)+' '+(x-15)+','+(y+14)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  s+='<polygon points="'+x+','+y+' '+(x+15)+','+(y-8)+' '+(x+15)+','+(y+14)+' '+x+','+(y+22)+'" fill="#e6efe9" stroke="'+FIG_INK+'" stroke-width="1.3"/>';
  return s;
}
function u1IsoFig(h){
  var rows=h.length,cols=h[0].length;
  var s='<svg width="340" height="200" viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg">';
  var ox=170,oy=88;
  for(var sm=0;sm<=rows+cols-2;sm++)for(var x=0;x<cols;x++){
    var y=sm-x; if(y<0||y>=rows)continue;
    var sx=ox+(x-y)*24, sy=oy+(x+y)*12;
    for(var k=0;k<h[y][x];k++) s+=u1Cube(sx,sy-k*24);
  }
  s+=u1T(170,192,"front edge runs left to right along the bottom",10,"middle",false);
  s+='</svg>';return s;
}
function u1IsoTopFig(h){
  var iso=u1IsoFig(h);
  var top='<svg width="150" height="200" viewBox="0 0 150 200" xmlns="http://www.w3.org/2000/svg">'+u1T(75,12,"TOP VIEW (numbers)",10,"middle",true)+u1Panel(h,"top",25,26,24,"")+'</svg>';
  return '<div style="display:flex;gap:8px;flex-wrap:wrap"><div>'+iso+'</div><div>'+top+'</div></div>';
}
function u1PerspFig(vpX,vpY,fx,fy,fw,fh){
  var s='<svg width="340" height="200" viewBox="0 0 340 200" xmlns="http://www.w3.org/2000/svg">';
  s+='<line x1="8" y1="'+vpY+'" x2="332" y2="'+vpY+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="6 4"/>';
  s+=u1T(20,vpY-10,"horizon",10,"start",false);
  var t=0.48,bx=fx+(vpX-fx)*t,by=fy+(vpY-fy)*t,bw=fw*(1-t),bh=fh*(1-t);
  var corners=[[fx,fy],[fx+fw,fy],[fx+fw,fy+fh],[fx,fy+fh]];
  var bc=[[bx,by],[bx+bw,by],[bx+bw,by+bh],[bx,by+bh]];
  for(var i=0;i<4;i++)s+='<line x1="'+corners[i][0]+'" y1="'+corners[i][1]+'" x2="'+bc[i][0]+'" y2="'+bc[i][1]+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<rect x="'+fx+'" y="'+fy+'" width="'+fw+'" height="'+fh+'" fill="'+FIG_SHADE+'" fill-opacity="0.45" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="'+fmt(bx,1)+'" y="'+fmt(by,1)+'" width="'+fmt(bw,1)+'" height="'+fmt(bh,1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<circle cx="'+vpX+'" cy="'+vpY+'" r="4.5" fill="'+FIG_ALT+'" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+='</svg>';return s;
}
function u1ExplFig(names,widths,thicks){
  var s='<svg width="340" height="'+(names.length*36+24)+'" viewBox="0 0 340 '+(names.length*36+24)+'" xmlns="http://www.w3.org/2000/svg">';
  s+='<line x1="110" y1="6" x2="110" y2="'+(names.length*36+12)+'" stroke="'+FIG_INK+'" stroke-width="1.2" stroke-dasharray="5 4"/>';
  for(var i=0;i<names.length;i++){
    var y=12+i*36,w=widths[i];
    s+='<rect x="'+(110-w/2)+'" y="'+y+'" width="'+w+'" height="22" fill="'+(i%2?FIG_SHADE:"#ffffff")+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
    s+=u1T(232,y+11,names[i]+(thicks?(" ("+thicks[i]+" mm)"):""),11,"start",false);
  }
  s+='</svg>';return s;
}
function u1ShapeFig(kind){
  var s='<svg width="200" height="150" viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg">';
  if(kind==="circle")s+='<circle cx="100" cy="75" r="52" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  else if(kind==="triangle")s+='<polygon points="100,20 40,128 160,128" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  else if(kind==="rect")s+='<rect x="35" y="40" width="130" height="70" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  else if(kind==="square")s+='<rect x="45" y="20" width="110" height="110" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  else if(kind==="sqdiag"){s+='<rect x="45" y="20" width="110" height="110" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/><line x1="45" y1="20" x2="155" y2="130" stroke="'+FIG_INK+'" stroke-width="1.6"/><line x1="155" y1="20" x2="45" y2="130" stroke="'+FIG_INK+'" stroke-width="1.6"/>';}
  s+='</svg>';return s;
}

E("u1-identify-view",1,["3.17"],1,"gen",function(){
  var views=["top","front","side"],view, h, tries=0;
  do{ h=u1Stack(4,3,3); view=pick(views); tries++; }while(tries<40 && (u1ColMax(h).join(",")===u1RowMax(h).join(",") || u1Sum(h)<6));
  var ctx=pick(["storage crates","display blocks","garden planters","workshop boxes","library book blocks"]);
  var name={top:"Top view",front:"Front view",side:"Side view"}[view];
  var q=mcq("A stack of "+ctx+" is 4 cubes wide and 3 cubes deep. The figure shows one view of the stack, drawn with one square for each visible cube face and numbers for stacked cubes in the top view. Which view is shown?",
    {t:name,fb:"Yes: the pattern of squares in the figure matches the "+view+" of this stack."},
    views.filter(function(v){return v!==view;}).map(function(v){return {t:{top:"Top view",front:"Front view",side:"Side view"}[v],fb:"That view has a different outline: compare the width of the figure with the width of the stack in that direction."};}).concat([{t:"Isometric view",fb:"An isometric view shows three faces at once on a slant. This figure shows a single flat view."}]),
    "Count the squares across the figure and compare with the stack. The stack is 4 wide and 3 deep, and the heights from the "+view+" give the pattern shown, so the figure is the <b>"+name+"</b>.",
    {view:view,sum:u1Sum(h)});
  q.figure=u1ViewFig(h,view); return q;
},["Decide what direction you are looking from: above, straight ahead, or from the side.","Compare the number of squares across the figure with the width or depth of the stack."]);

E("u1-solid-views",1,["3.17","3.20"],1,"var",varset([
  function(){var q=mcq("Which 2-D shape is the top view of a closed can, which is a cylinder?",{t:"A circle",fb:"Yes: looking straight down on a cylinder you see its circular top face."},[{t:"A rectangle",fb:"A rectangle is the front view of a cylinder: the curved side flattens to a rectangle from the front."},{t:"A triangle",fb:"A triangle is the front view of a cone, not a cylinder."},{t:"A square",fb:"A square is the view of a cube or square prism face, not the round top of a can."}],"The top face of a cylinder is a circle, so its top view is <b>a circle</b>.",{});q.figure=u1ShapeFig("circle");return q;},
  function(){var q=mcq("Which 2-D shape is the front view of a cone, such as a traffic cone?",{t:"A triangle",fb:"Yes: the cone tapers from a round base to a point, giving a triangle from the front."},[{t:"A circle",fb:"A circle is the top view of a cone: you see the round base from above."},{t:"A rectangle",fb:"A rectangle is the front view of a cylinder or prism, which does not taper to a point."},{t:"A square",fb:"A square is the front view of a cube, whose sides do not taper."}],"A cone narrows to a point, so its front view is <b>a triangle</b>.",{});q.figure=u1ShapeFig("triangle");return q;},
  function(){var q=mcq("Which 2-D shape is the front view of a shoe box, which is a rectangular prism?",{t:"A rectangle",fb:"Yes: the front face of a rectangular prism is a rectangle."},[{t:"A circle",fb:"A circle appears for round objects such as cylinders and spheres."},{t:"A triangle",fb:"A triangle appears for cones and pyramids, which taper."},{t:"A hexagon",fb:"A hexagon would need six sides on the front face. A box face has four sides."}],"Each face of a rectangular prism is a rectangle, so the front view is <b>a rectangle</b>.",{});q.figure=u1ShapeFig("rect");return q;},
  function(){var q=mcq("Which 2-D shape is seen from any direction when looking at a ball, which is a sphere?",{t:"A circle",fb:"Yes: a sphere looks the same from every direction, and its outline is always a circle."},[{t:"An oval that changes with the angle",fb:"A sphere does not flatten from any angle: its outline stays circular."},{t:"A square",fb:"A square is the view of a cube face, not a ball."},{t:"A triangle",fb:"A triangle is the front view of a cone, not a sphere."}],"A sphere has the same round outline from every side, so the view is <b>a circle</b>.",{});q.figure=u1ShapeFig("circle");return q;},
  function(){var q=mcq("The top view of a square pyramid shows the apex (the top point) in the middle. Which description matches that top view?",{t:"A square with lines from the centre to the four corners",fb:"Yes: the square is the base outline and the lines are the edges running up to the apex."},[{t:"A plain square with no inside lines",fb:"That is the top view of a cube or square prism. The pyramid apex adds the diagonal edge lines."},{t:"A triangle",fb:"A triangle is a side or front view of a pyramid, not its top view."},{t:"A circle with a dot in the centre",fb:"That describes the top view of a cone, whose base is round."}],"From above, the base gives a square and the four sloping edges run to the centre apex, so the view is <b>a square with lines from the centre to the four corners</b>.",{});q.figure=u1ShapeFig("sqdiag");return q;},
  function(){var q=mcq("Which 2-D shape is the side view of a cube?",{t:"A square",fb:"Yes: every face of a cube is a square, so every flat view is a square."},[{t:"A rectangle that is longer than it is tall",fb:"That is the side view of a longer rectangular prism. A cube has equal length and height."},{t:"A circle",fb:"A circle appears for round objects such as cylinders and spheres."},{t:"A triangle",fb:"A triangle appears for cones and pyramids, which taper to a point."}],"All faces of a cube are equal squares, so the side view is <b>a square</b>.",{});q.figure=u1ShapeFig("square");return q;}
]),["Think about the face you would see looking straight at the object from that direction.","Picture the outline of that face first, then any inside edges."]);

E("u1-vanishing-point-basics",1,["3.24"],1,"var",varset([
  function(){return mcq("In a one-point perspective drawing of a straight road, the two edges of the road are drawn getting closer together as they go back. Where do those edge lines meet if they are extended?",{t:"At the vanishing point on the horizon",fb:"Yes: receding parallel lines are drawn to meet at the vanishing point, which sits on the horizon line."},[{t:"At the bottom corner of the page",fb:"The meeting point lies on the horizon, level with the viewer eye line, not at a page corner."},{t:"They stay parallel and never get closer",fb:"Staying parallel describes an orthographic view. In perspective, receding edges converge."},{t:"At the centre of the nearest object",fb:"The meeting point belongs to the whole set of receding lines, not to one object."}],"In one-point perspective, lines that recede from the viewer are drawn toward one point on the horizon. That point is <b>the vanishing point on the horizon</b>.",{});},
  function(){return mcq("A student draws a hallway in one-point perspective. Which feature marks the point of perspective in the drawing?",{t:"The point where the wall and ceiling edge lines converge",fb:"Yes: all the receding edges aim at that single point."},[{t:"The largest door in the hallway",fb:"The nearest door is biggest because it is closest. Size alone does not mark the point."},{t:"The middle of the floor in the foreground",fb:"The foreground is nearest the viewer. The point of perspective is far back, where the edges converge."},{t:"Any corner of the page",fb:"The point is set by the drawing lines, not by the page corners."}],"Follow the edges that go back into the drawing: they converge at one point, and that point is <b>the point where the wall and ceiling edge lines converge</b>.",{});},
  function(){return mcq("What is the horizon line in a perspective drawing?",{t:"The line at the viewer eye level, which holds the vanishing point",fb:"Yes: the vanishing point always sits on the horizon line at eye level."},[{t:"The line along the bottom of the nearest object",fb:"That is a base or ground edge of an object, not the eye-level line."},{t:"The top edge of the paper",fb:"The horizon sits at eye level within the scene, which may be anywhere on the page."},{t:"A line joining the two front corners of an object",fb:"That is one edge of the object. The horizon runs across the whole scene at eye level."}],"The vanishing point sits on the horizon, so the horizon is <b>the line at the viewer eye level, which holds the vanishing point</b>.",{});},
  function(){return mcq("A drawing shows a railway track going straight away from the viewer. The rails are drawn as two lines that meet at a point on the horizon. What is that point called?",{t:"The vanishing point",fb:"Yes: the point where receding parallel lines meet in the drawing is the vanishing point."},[{t:"The centre of projection of a top view",fb:"A top view has no vanishing point: it is a flat orthographic view."},{t:"The apex of the track",fb:"Apex names the top point of a cone or pyramid, not a perspective point."},{t:"The scale point",fb:"Scale points belong to scale drawings, where lengths are reduced by a ratio."}],"Receding parallel lines, such as rails, are drawn to meet at <b>the vanishing point</b>.",{});},
  function(){return mcq("In a one-point perspective drawing, how many vanishing points do the receding edges use?",{t:"One",fb:"Yes: one-point perspective uses a single vanishing point for all receding edges."},[{t:"Two",fb:"Two vanishing points belong to two-point perspective, used when a corner faces the viewer."},{t:"Three",fb:"Three vanishing points appear in three-point perspective, looking up or down at a tall object."},{t:"Four, one for each side of the object",fb:"Each object does not get its own point: all receding edges share the same single point."}],"The name gives the count: one-point perspective uses <b>one</b> vanishing point.",{});}
]),["Follow the lines that go back into the drawing and see where they aim.","The point you want sits on the horizon line at eye level."]);

E("u1-exploded-top-part",1,["3.25","3.26"],1,"gen",function(){
  var pool=["base plate","centre post","side rail","top panel","motor unit","handle","support arm","end cap","front panel","hinge block"];
  var names=shuffle(pool).slice(0,ri(4,5));
  var widths=names.map(function(){return ri(80,150);});
  var kit=pick(["flat-pack shelf kit","workbench lamp kit","garden bench kit","storage tower kit","desk organiser kit","bike rack kit"]);
  var top=names[0];
  var distract=names.slice(1,4).map(function(nm,i){return {t:nm,fb:"That component is shown, but it sits lower in the exploded stack, in position "+(i+2)+" from the top. The topmost drawn part is the one asked for."};});
  var q=mcq("The figure shows an exploded view of a "+kit+". The components are separated along a dashed centre line in the order they fit together, with the topmost component drawn first. Which component is drawn at the top of the exploded view?",
    {t:top,fb:"Yes: the first component drawn at the top of the exploded stack is "+top+"."},
    distract,
    "Read the exploded view from the top down. The first component on the centre line is <b>"+top+"</b>.",
    {kit:kit,n:names.length});
  q.figure=u1ExplFig(names,widths,null); return q;
},["An exploded view separates the parts along one line in assembly order.","Start at the top of the stack and read the labels in order."]);

E("u1-iso-count-easy",1,["3.22"],1,"gen",function(){
  var h=u1Stack(ri(2,3),2,2); if(u1Sum(h)<3)h[0][0]=2;
  var total=u1Sum(h);
  var ds=[total+1,total-1,total+2].filter(function(d){return d>0&&d!==total;});
  while(ds.length<3)ds.push(total+ds.length+3);
  var q=mcq("The figure shows a small stack of cubes in an isometric drawing. Each column rests on the columns behind or below it, and the numbers are not printed. How many cubes are in the stack in total?",
    {t:total+"",fb:"Yes: adding the height of every column gives "+total+" cubes."},
    ds.slice(0,3).map(function(d){return {t:d+"",fb:"That total misses the column heights: count each column from the base up, including cubes hidden behind front columns, and add them."};}),
    "Count column by column. The column heights add to <b>"+total+" cubes</b>.",
    {total:total});
  q.figure=u1IsoFig(h); return q;
},["Work column by column rather than counting visible faces.","Start with the front columns, then add the columns behind them, including any cube hidden behind a taller front column."]);

E("u1-front-view-dims",1,["3.18"],2,"gen",function(){
  var h=u1Stack(ri(3,5),ri(2,3),ri(2,4)), tries=0;
  while(tries<40 && h[0].length===u1Max(h)){h=u1Stack(ri(3,5),ri(2,3),ri(2,4)); tries++;}
  if(h[0].length===u1Max(h))h=[[1,1,1,1],[1,2,1,0]];
  var W=h[0].length,H=u1Max(h);
  var opts=[{t:H+" squares wide and "+W+" squares tall",fb:"Width and height are swapped here: the front view is as wide as the stack is wide, not as tall."},
    {t:(W+1)+" squares wide and "+H+" squares tall",fb:"The width is one too many: count the columns in the front view, which match the cubes across the front of the stack."},
    {t:W+" squares wide and "+(H+1)+" squares tall",fb:"The height is one too many: the tallest column sets the height of the front view."}];
  var q=mcq("The figure shows the front view of a cube stack, drawn to scale with one square for each cube face. What are the dimensions of this front view?",
    {t:W+" squares wide and "+H+" squares tall",fb:"Yes: the front view spans "+W+" columns and rises "+H+" squares at its tallest."},
    opts,
    "The front view is as wide as the front of the stack, "+W+" squares, and as tall as the tallest column, "+H+" squares. The dimensions are <b>"+W+" squares wide and "+H+" squares tall</b>.",
    {W:W,H:H});
  q.figure=u1ViewFig(h,"front"); return q;
},["The width of a front view matches the width of the object, and its height matches the tallest part.","Count the squares across the bottom row first, then count up the tallest column."]);

E("u1-total-from-top",1,["3.19"],2,"gen",function(){
  var h=u1Stack(ri(3,4),ri(2,3),3); if(u1Sum(h)<5)h[0][0]=3;
  var total=u1Sum(h),foot=u1Foot(h);
  var cand=[total+2,total-2,foot].filter(function(d){return d>0&&d!==total;});
  var ds=[];cand.forEach(function(d){if(ds.indexOf(d)<0)ds.push(d);}); while(ds.length<3)ds.push(total+ds.length+3);
  var q=mcq("A model is built from cubes. The figure shows the top view, and the number in each square is the height of the column of cubes on that square. How many cubes does the model use in total?",
    {t:total+"",fb:"Yes: adding all the column heights gives "+total+"."},
    ds.slice(0,3).map(function(d){return {t:d+"",fb:"That is not the sum of the printed heights: add every number in the top view, counting each column at its full height."};}),
    "Add every number printed in the top view. The column heights sum to <b>"+total+" cubes</b>.",
    {total:total});
  q.figure=u1ViewFig(h,"top"); return q;
},["The number in each top-view square is a column height, and the model total is the sum of the heights.","Add the numbers row by row, then add the row totals."]);

E("u1-which-object",1,["3.20"],2,"var",varset([
  function(){var q=mcq("A set of views shows: top view is a circle, front view is a rectangle, side view is a rectangle. Which object do these views describe?",{t:"A cylinder, such as a paint can",fb:"Yes: a cylinder has a circular top and rectangular front and side views."},[{t:"A cone, such as a traffic cone",fb:"A cone has a triangular front view, not a rectangle."},{t:"A cube",fb:"A cube has square views in every direction, not a circle from the top."},{t:"A sphere, such as a ball",fb:"A sphere shows a circle from every direction, including the front."}],"Match each view: circle on top and rectangles from the front and side fit <b>a cylinder, such as a paint can</b>.",{});q.figure=u1AllFig([[1]]);return q;},
  function(){return mcq("A set of views shows: top view is a square with lines from the centre to the corners, front view is a triangle, side view is a triangle. Which object do these views describe?",{t:"A square pyramid",fb:"Yes: the square base and centre apex give that top view, and each side view tapers to a triangle."},[{t:"A cone",fb:"A cone has a circular top view, not a square one."},{t:"A triangular prism, such as a tent shape",fb:"A triangular prism has a rectangular top view, not a square with corner lines."},{t:"A cube with a flat top",fb:"A cube shows squares from the front and side, not triangles."}],"The square base with a centre point and the triangular sides fit <b>a square pyramid</b>.",{});},
  function(){var q=mcq("Views of a cube stack show a top view that is 3 squares wide and 2 squares deep, with the back-left square marked height 2 and all others height 1. Which description matches the stack?",{t:"Seven cubes: a flat layer of six with one extra cube on the back-left column",fb:"Yes: six squares at height 1 plus one extra cube gives seven cubes with the tall column at the back left."},[{t:"Six cubes in a single flat layer",fb:"That ignores the height 2 marking, which adds one extra cube."},{t:"Eight cubes: two layers of four",fb:"Two full layers would need a top view only 2 squares deep in each layer count, and the heights would all read 2."},{t:"Seven cubes with the extra cube on the front-right column",fb:"The count is right but the position is wrong: the height 2 square is at the back left."}],"The footprint has 6 squares. Five columns are 1 high and one column is 2 high, giving 5 + 2 = 7 cubes: <b>seven cubes: a flat layer of six with one extra cube on the back-left column</b>.",{});q.figure=u1ViewFig([[2,1,1],[1,1,1]],"top");return q;},
  function(){return mcq("A set of views shows: front view is a circle, side view is a circle, top view is a circle. Which object do these views describe?",{t:"A sphere, such as a basketball",fb:"Yes: a sphere shows the same circle from every direction."},[{t:"A cylinder lying on its side",fb:"A cylinder on its side shows a circle from one end but a rectangle from the top."},{t:"A cone",fb:"A cone shows a triangle from the front and side, not circles."},{t:"A hemisphere dome",fb:"A dome shows a semicircle from the front, not a full circle."}],"Circles from every direction fit only <b>a sphere, such as a basketball</b>.",{});},
  function(){return mcq("Views of a storage bin show a rectangular top view 4 squares long and 2 squares wide, a front view 4 squares wide and 2 squares tall, and a side view 2 squares wide and 2 squares tall, with no inside lines. Which object matches?",{t:"A rectangular box with length 4, width 2 and height 2 units",fb:"Yes: each view matches one face of that box."},[{t:"A box that is taller at one end, like a wedge",fb:"A wedge would show a triangle or a sloped line in the side view."},{t:"A cylinder with diameter 2 and length 4",fb:"A cylinder would show a circle in the side view, not a rectangle."},{t:"A box with length 4, width 2 and height 4 units",fb:"The front and side views are only 2 squares tall, so the height is 2, not 4."}],"Read the height from the front view (2) and the length and width from the top view (4 by 2): <b>a rectangular box with length 4, width 2 and height 2 units</b>.",{});},
  function(){var q=mcq("The figure shows the top, front and side views of a cube stack. Which statement describes the stack?",{t:"The tallest column has height 3 and stands in a corner of the footprint",fb:"Yes: the front and side views both rise to 3 at an end column, and the top view shows a 3 in a corner square."},[{t:"Every column has the same height",fb:"The views rise to different heights, and the top view prints different numbers."},{t:"The stack is a single flat layer",fb:"A flat layer would make every view one square tall."},{t:"The tallest column has height 2",fb:"Count the squares in the tallest column of the front view: it rises to 3."}],"The front view rises 3 squares high at one end, and the top view confirms a corner column of height 3: <b>the tallest column has height 3 and stands in a corner of the footprint</b>.",{});q.figure=u1AllFig([[3,1,1],[1,1,2]]);return q;}
]),["Match the views one at a time: top first, then front, then side.","Rule out any object whose view in one direction disagrees with the given views."]);

E("u1-judge-views",1,["3.21"],2,"var",varset([
  function(){var q=mcq("A stack is 3 cubes wide, 2 cubes deep and 2 cubes tall at its highest. A student draws a front view that is 2 squares wide and 2 squares tall. Does the drawing represent the stack, and why?",{t:"No: the front view should be 3 squares wide, matching the width of the stack",fb:"Yes: the front view width must equal the width of the object, which is 3."},[{t:"Yes: the height matches, so the view is correct as it is drawn here",fb:"Matching height alone is not enough: the width of the view must also match the object."},{t:"No: the front view should be 2 squares tall and 3 squares deep, front to back",fb:"Depth is not a dimension of the front view at all: the front view shows width and height."},{t:"Yes: front views always show the depth across the bottom of the view",fb:"The front view shows width across the bottom. Depth appears in the top and side views."}],"A front view shows width by height. The stack is 3 wide, so the view must be 3 squares wide: <b>no: the front view should be 3 squares wide, matching the width of the stack</b>.",{});q.figure=u1ViewFig([[1,2],[2,1]],"front");return q;},
  function(){return mcq("A cube stack has a column of height 3 at the front-left corner and height 1 everywhere else. The top view a student drew marks the tall column at the back-right corner. Does the top view represent the stack, and why?",{t:"No: the height 3 is marked in the wrong square; it belongs at the front-left",fb:"Yes: in a top view the position of each number must match the position of that column in the footprint."},[{t:"Yes: the top view has the right numbers, so their position does not matter at all",fb:"Position matters in a top view: each square stands for one exact column location."},{t:"No: a top view should show the height 3 as three stacked squares in a row",fb:"Top views print the height as a number in the square. Stacked squares belong to front and side views."},{t:"Yes: front and back swap places in every top view of a stack of cubes",fb:"Top views keep the plan positions: front rows stay at the front of the drawing."}],"Each square of a top view stands for one column in its true position, so the 3 belongs at the front left: <b>no: the height 3 is marked in the wrong square; it belongs at the front-left</b>.",{});},
  function(){return mcq("An object is a cylinder standing upright. A student draws its side view as a circle. Does the side view represent the object, and why?",{t:"No: the side view of an upright cylinder is a rectangle; the circle is its top view",fb:"Yes: from the side you see the flat outline of the curved wall, which is a rectangle."},[{t:"Yes: cylinders look round from every side, so the side view is a circle as well as the top",fb:"The round outline appears only from the top. From the side the outline is rectangular."},{t:"No: the side view should be a triangle, as with a cone or a wedge shape",fb:"A triangle is the side view of a cone, which tapers to a point."},{t:"Yes: the side view and the top view are always the same shape in every case",fb:"Views change with direction unless the object is a sphere or cube."}],"An upright cylinder shows a rectangle from the side and a circle only from above: <b>no: the side view of an upright cylinder is a rectangle; the circle is its top view</b>.",{});},
  function(){return mcq("A stack has columns of heights 1, 2 and 1 across the front row, left to right. A student draws a front view with columns of heights 1, 2 and 1, left to right. Does the front view represent the stack, and why?",{t:"Yes: each column of the view matches the height of the stack column behind it",fb:"Yes: front view columns line up with the front row, and back columns no taller than these do not change it."},[{t:"No: the middle column should be the average of the row of heights",fb:"Front views show the actual tallest height in each line of sight, not an average."},{t:"No: a front view must add the front and back heights together to get each column",fb:"Heights are never added in a view: each position shows the tallest column in that line."},{t:"Yes, but only because the total number of cubes matches the stack exactly",fb:"Matching totals is not the test: the view must match column by column."}],"In a front view, each position shows the height of the tallest column in that line, and here each matches: <b>yes: each column of the view matches the height of the stack column behind it</b>.",{});},
  function(){var q=mcq("A box is 5 units long, 3 units wide and 2 units tall. A student labels the top view as 5 by 2. Does the top view represent the box, and why?",{t:"No: the top view shows length by width, so it should be 5 by 3",fb:"Yes: looking down, you see the length and the width. Height does not appear in a top view."},[{t:"Yes: the top view shows length by height of the box",fb:"Height appears in front and side views. The top view shows length and width."},{t:"No: the top view should be 3 by 2, not 5 by 3",fb:"That pairs width with height, which is the side view pairing."},{t:"Yes: any two dimensions of the box can label the top view of it",fb:"Each view has a fixed pair of dimensions: top is length by width."}],"The top view pairs length with width: <b>no: the top view shows length by width, so it should be 5 by 3</b>.",{});q.figure=u1ShapeFig("rect");return q;}
]),["Check each view against the object dimension by dimension: width, depth and height.","Name the exact square, column or dimension where the view and the object disagree."]);

E("u1-iso-tallest",1,["3.22"],2,"gen",function(){
  var h=u1Stack(ri(3,4),ri(2,3),4); if(u1Max(h)<3)h[1][1]=4;
  var mx=u1Max(h);
  var ds=[mx-1,mx+1,mx-2].filter(function(d){return d>0&&d!==mx;}); while(ds.length<3)ds.push(mx+ds.length+2);
  var q=mcq("The figure shows an isometric drawing of a cube stack. What is the height, in cubes, of the tallest column?",
    {t:mx+"",fb:"Yes: the tallest column rises "+mx+" cubes from the base."},
    ds.slice(0,3).map(function(d){return {t:d+"",fb:"Count the cubes stacked in the highest column from the base to the top cube, including the base cube."};}),
    "Find the highest column in the drawing and count its cubes from the base up. The tallest column is <b>"+mx+" cubes</b>.",
    {mx:mx});
  q.figure=u1IsoFig(h); return q;
},["Look for the column whose top cube sits highest in the drawing.","Count that column from its base cube to its top cube, one cube at a time."]);

E("u1-perspective-match",1,["3.23"],2,"gen",function(){
  var ctx=pick(["a straight hallway in a school","a straight stretch of railway track","a long straight driveway","the inside of a warehouse aisle","a straight boardwalk"]);
  var vpX=pick([215,240,265,290,310]);
  var fh=pick([70,80,90]);
  var q=mcq("The figure shows a one-point perspective drawing of "+ctx+". The dashed line is the horizon and the dot marks where the receding edges meet. Which statement describes this drawing?",
    {t:"Edges that recede from the viewer are drawn toward one vanishing point on the horizon",fb:"Yes: that single meeting point on the horizon is what makes this one-point perspective."},
    [{t:"Edges that recede stay parallel, as in a top view, and never meet at all on the page",fb:"Staying parallel describes an orthographic view such as a top view. Perspective edges converge."},
     {t:"The receding edges aim at two vanishing points, one on each side, left and right of it",fb:"Two vanishing points belong to two-point perspective. Here all receding edges share one point."},
     {t:"The dot is the top view position of the nearest object in the whole scene shown",fb:"The dot sits on the horizon where the receding edges meet: it is the vanishing point."}],
    "All the receding edges in the figure aim at the single dot on the horizon, so the drawing shows <b>edges that recede from the viewer drawn toward one vanishing point on the horizon</b>.",
    {vpX:vpX});
  q.figure=u1PerspFig(vpX,95,55,60,110,fh); return q;
},["Follow two edges that go back into the drawing and see where they aim.","Check whether the meeting point sits on the horizon line."]);

E("u1-exploded-sequence",1,["3.26"],2,"var",varset([
  function(){var q=mcq("A flat-pack bookshelf has a top panel, two side panels, three shelves and a back panel. Which order gives a sensible exploded view from top to bottom along the centre line?",{t:"Top panel, shelves, side panels spread below, back panel last",fb:"Yes: the exploded view lists the parts in the order they come off the assembled shelf, top part first."},[{t:"Back panel, shelves, top panel, side panels in any order at all",fb:"That mixes the order: an exploded view follows the assembly sequence so each part sits next to the part it joins."},{t:"All parts side by side in a single row at the same height",fb:"Exploded parts are separated along one line in sequence, not scattered in a row."},{t:"Shelves only, since they are the working parts of it",fb:"An exploded view shows every component, not only the main working parts."}],"Exploded views separate all the components in assembly order along one line: <b>top panel, shelves, side panels spread below, back panel last</b>.",{});q.figure=u1ExplFig(["top panel","shelf","side panel","back panel"],[130,120,90,140],null);return q;},
  function(){return mcq("When sketching an exploded view of a desk lamp, what should the drawing show?",{t:"The base, post, arm and shade separated along a centre line in the order they join",fb:"Yes: each component is pulled apart along the joining line while keeping the assembly order clear."},[{t:"The lamp drawn once, assembled, with the shade glowing and nothing separated",fb:"That is a picture of the finished lamp. An exploded view separates the components."},{t:"Only the shade and bulb, drawn larger than the base of the lamp, with the rest left out",fb:"Every component belongs in the view, drawn at a consistent scale."},{t:"The parts arranged in a circle around the lamp, facing inward toward it",fb:"Exploded parts follow the line along which they join, so the order can be read."}],"An exploded view pulls the components apart along their joining line in order: <b>the base, post, arm and shade separated along a centre line in the order they join</b>.",{});},
  function(){return mcq("A student sketches an exploded view of a three-legged stool. The seat is drawn at the top, the three legs below it, and the round brace ring below the legs. What makes this a good exploded sketch?",{t:"Each part sits on the same centre line in the order it fits to the next part",fb:"Yes: alignment on the centre line lets a reader rebuild the stool part by part."},[{t:"The legs are drawn longer than they really are, for effect on the page",fb:"Changing part lengths breaks the scale and would mislead anyone rebuilding the stool."},{t:"The brace ring is left out to keep the sketch tidy, with nothing in its place",fb:"Leaving a component out means the sketch no longer represents the whole object."},{t:"The parts overlap so the sketch takes less space on the page overall",fb:"Overlapping parts hide the sequence. Exploded parts are separated with gaps."}],"A good exploded sketch keeps every part aligned in fitting order: <b>each part sits on the same centre line in the order it fits to the next part</b>.",{});},
  function(){return mcq("Which first step is best when sketching an exploded view of an object?",{t:"List the components in the order they separate, then draw them along a centre line in that order",fb:"Yes: planning the sequence first keeps the drawing complete and in order."},[{t:"Draw the largest component first wherever it fits on the page, then add the rest of the parts around it",fb:"Placement follows the assembly line, not page space: order carries the meaning."},{t:"Shade the assembled object first, then erase the joins between all of its parts",fb:"Erasing joins does not separate or order the components."},{t:"Draw only the outside shape and label the parts around it, with no separation",fb:"That is a labelled diagram of the whole object, not an exploded view of its components."}],"Start from the component sequence, then draw along the joining line: <b>list the components in the order they separate, then draw them along a centre line in that order</b>.",{});},
  function(){var q=mcq("The figure shows an exploded view of a storage tower. Which statement about the sketch is correct?",{t:"The components are separated in fitting order along the dashed centre line",fb:"Yes: the gaps and the centre line show the order in which the parts come together."},[{t:"The components are drawn at different scales, each sized to fit the page",fb:"The parts share one scale: their widths can be compared directly."},{t:"The top component joins last of all when the tower is assembled again",fb:"Assembly reverses the explosion from the base up, and the top part is placed in its turn at the top."},{t:"The dashed line is a cut line for trimming the parts along their edges",fb:"The dashed line is the centre line along which the parts separate, not a cutting guide."}],"The parts line up on the centre line in the order they fit together: <b>the components are separated in fitting order along the dashed centre line</b>.",{});q.figure=u1ExplFig(["top tray","drawer","frame","base"],[120,130,100,140],null);return q;}
]),["An exploded sketch separates every component along the line where the parts join.","Read the parts in order along that line, the way they would come together."]);

E("u1-scale-component-mc",1,["3.27"],2,"gen",function(){
  var d=ri(2,9), n=pick([10,15,20,25,30,40,50]);
  var real=d*n;
  var ds=[d,Math.round(real/2),real+n].filter(function(v){return v!==real;});
  var q=mcq("A component is drawn to the scale 1:"+n+". On the drawing, the component is "+d+" cm long. What is the actual length of the component, in centimetres?",
    {t:real+"",fb:"Yes: each drawn centimetre stands for "+n+" cm, so "+d+" x "+n+" = "+real+" cm."},
    [{t:ds[0]+"",fb:"That is just the drawing length: a scale of 1:"+n+" means the real part is "+n+" times longer."},
     {t:ds[1]+"",fb:"That uses only half the scale factor: multiply the drawn length by the full "+n+"."},
     {t:ds[2]+"",fb:"That adds the scale number instead of multiplying by it: lengths scale by multiplication."}],
    "\\[ \\begin{aligned} \\text{actual length} &= "+d+" \\times "+n+" \\\\ &= "+real+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+real+" cm</b>.",
    {d:d,n:n});
  return q;
},["A scale of 1:n means the real object is n times the drawing in every length.","Multiply the drawn length by the scale number."]);

E("u1-exploded-to-front",1,["3.28","3.26"],2,"gen",function(){
  var names=["top panel","middle shelf","side board","base panel"].slice(0,ri(3,4));
  var widths=names.map(function(){return pick([60,80,100,120]);});
  var thicks=names.map(function(){return pick([2,3,4]);});
  var W=Math.max.apply(null,widths), H=thicks.reduce(function(a,b){return a+b;},0);
  var alt1=(W+20)+" units wide and "+H+" units tall", alt2=W+" units wide and "+(H+2)+" units tall", alt3=widths[0]+" units wide and "+thicks[0]+" units tall";
  var q=mcq("The figure shows an exploded view of a flat-pack unit. Each component is a flat panel: the label gives its name and thickness in units, and the panels stack directly on top of each other when assembled, with no gaps and no overlap. Which description gives the front view of the assembled unit?",
    {t:W+" units wide and "+H+" units tall",fb:"Yes: the assembled front is as wide as the widest panel and as tall as all the thicknesses added."},
    [{t:alt1,fb:"The width is too large: stacking panels does not add their widths. The front width is the widest single panel."},
     {t:alt2,fb:"The height is too large: add the panel thicknesses exactly as labelled, with no extra units."},
     {t:alt3,fb:"That describes only the first panel. The assembled front view combines all the panels."}],
    "The front width is the widest panel, "+W+" units. The front height is the sum of the thicknesses, "+thicks.join(" + ")+" = "+H+" units. The answer is <b>"+W+" units wide and "+H+" units tall</b>.",
    {W:W,H:H});
  q.figure=u1ExplFig(names,widths.map(function(w){return w+30;}),thicks); return q;
},["When panels stack, the front width comes from the widest panel, and the front height comes from all the thicknesses.","Add the thicknesses first, then compare the widths."]);

E("u1-top-footprint",1,["3.17","3.18"],2,"gen",function(){
  var cols=ri(3,5),rows=ri(2,4); if(rows===cols)rows=rows===4?3:rows+1;
  var h=u1Stack(cols,rows,3);
  var correct=cols+" squares wide and "+rows+" squares deep";
  var q=mcq("The figure shows an isometric drawing of a cube stack. Which dimensions describe the top view of this stack?",
    {t:correct,fb:"Yes: from above, the footprint spans "+cols+" squares across and "+rows+" squares deep."},
    [{t:rows+" squares wide and "+cols+" squares deep",fb:"Width and depth are swapped: the width across the front of the stack is "+cols+"."},
     {t:cols+" squares wide and "+(rows+1)+" squares deep",fb:"That adds an extra row of depth. Depth counts the rows of the footprint, front to back, and there are "+rows+"."},
     {t:(cols+1)+" squares wide and "+rows+" squares deep",fb:"The width is one too many: count the columns along the front edge of the footprint."}],
    "From above, only the footprint shows: "+cols+" squares across the front and "+rows+" rows going back. The top view is <b>"+correct+"</b>.",
    {cols:cols,rows:rows});
  q.figure=u1IsoFig(h); return q;
},["The top view shows the footprint only: how far the stack reaches across and how far it reaches back.","Count the columns along the front edge, then count the rows from front to back."]);

E("u1-cr-front-real-height",1,["3.18"],2,"gen",function(){
  var h=u1Stack(ri(3,4),ri(2,3),ri(2,4)); var H=u1Max(h); var s=pick([5,10,15,20]);
  var ans=H*s;
  var q=numq("The figure shows the front view of a cube stack, drawn to scale. Each square in the drawing represents "+s+" cm. What is the actual height of the stack, in centimetres? Show your work.",ans,0.5,
    "The tallest column of the front view is "+H+" squares tall. \\[ \\begin{aligned} \\text{actual height} &= "+H+" \\times "+s+" \\\\ &= "+ans+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+ans+" cm</b>.",
    {H:H,s:s});
  q.figure=u1ViewFig(h,"front"); return q;
},["The height of the view is set by the tallest column of squares.","Count the squares in the tallest column, then multiply by the centimetres each square represents."]);

E("u1-cr-total-cubes",1,["3.19"],2,"gen",function(){
  var h=u1Stack(ri(3,4),ri(2,3),3); if(u1Sum(h)<6)h[0][1]=3;
  var total=u1Sum(h);
  var rowsums=h.map(function(r){return r.reduce(function(a,b){return a+b;},0);});
  var q=numq("A model is built from cubes. The figure shows the top view, and the number in each square is the height of the column of cubes on that square. How many cubes does the model use in total? Show your work.",total,0.5,
    "Add the column heights row by row: the row totals are "+rowsums.join(", ")+". \\[ \\begin{aligned} \\text{total} &= "+rowsums.join(" + ")+" \\\\ &= "+total+" \\end{aligned} \\] The answer is <b>"+total+" cubes</b>.",
    {total:total});
  q.figure=u1ViewFig(h,"top"); return q;
},["The model total is the sum of all the column heights printed in the top view.","Add one row of numbers at a time, then add the row totals."]);

E("u1-cr-iso-total",1,["3.22"],2,"gen",function(){
  var h=u1Stack(ri(3,4),3,3); if(u1Sum(h)<6)h[0][0]=3;
  var total=u1Sum(h);
  var rowsums=h.map(function(r){return r.reduce(function(a,b){return a+b;},0);});
  var q=numq("The figure shows an isometric drawing of a cube stack, with its top view beside it. The number in each top-view square is the height of that column. How many cubes are in the stack in total? Show your work.",total,0.5,
    "Read each column height from the top view and add: the row totals are "+rowsums.join(", ")+", and "+rowsums.join(" + ")+" = "+total+". The answer is <b>"+total+" cubes</b>.",
    {total:total});
  q.figure=u1IsoTopFig(h); return q;
},["Use the top view numbers for the column heights, including columns partly hidden in the isometric drawing.","Add the heights row by row."]);

E("u1-cr-scale-real",1,["3.27"],2,"gen",function(){
  var d=ri(3,14), n=pick([10,20,25,40,50]);
  var ans=d*n;
  return numq("A machine part is drawn to the scale 1:"+n+". The drawing shows the part as "+d+" cm long. What is the actual length of the part, in centimetres? Show your work.",ans,0.5,
    "Each centimetre on the drawing stands for "+n+" cm on the part. \\[ \\begin{aligned} \\text{actual length} &= "+d+" \\times "+n+" \\\\ &= "+ans+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+ans+" cm</b>.",
    {d:d,n:n});
},["A scale of 1:n means real lengths are n times the drawn lengths.","Multiply the drawn length by the scale number."]);

E("u1-cr-scale-drawn",1,["3.27","3.18"],2,"gen",function(){
  var k=pick([5,10,20,25]); var drawn=ri(3,14); var real=drawn*k;
  var obj=pick(["a storage cabinet","a workbench","a bookshelf","a display stand","a tool chest","a garden bench"]);
  return numq("A front view of "+obj+" is drawn to a scale where 1 cm on the drawing represents "+k+" cm on the object. The object is "+real+" cm tall. How tall should the front view be drawn, in centimetres? Show your work.",drawn,0.5,
    "Divide the real height by the number of centimetres each drawn centimetre represents. \\[ \\begin{aligned} \\text{drawn height} &= "+real+" \\div "+k+" \\\\ &= "+drawn+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+drawn+" cm</b>.",
    {k:k,drawn:drawn});
},["Drawing lengths are the real lengths divided by the scale factor.","Divide the real height by the value that 1 cm represents."]);

E("u1-cr-assembled-height",1,["3.25","3.28"],2,"gen",function(){
  var names=["base block","centre block","upper block","top cap"];
  var thicks=names.map(function(){return ri(8,20);});
  var overlap=pick([2,3,4]);
  var sumT=thicks.reduce(function(a,b){return a+b;},0);
  var ans=sumT-3*overlap;
  var q=numq("The figure shows an exploded view of a lamp stand. The label on each component gives its thickness in millimetres. When the stand is assembled, each of the 3 joins overlaps by "+overlap+" mm, which reduces the total height by "+overlap+" mm per join. What is the assembled height of the stand, in millimetres? Show your work.",ans,0.5,
    "Add the thicknesses: "+thicks.join(" + ")+" = "+sumT+" mm. Subtract the 3 join overlaps: 3 x "+overlap+" = "+(3*overlap)+" mm. \\[ \\begin{aligned} \\text{assembled height} &= "+sumT+" - "+(3*overlap)+" \\\\ &= "+ans+" \\text{ mm} \\end{aligned} \\] The answer is <b>"+ans+" mm</b>.",
    {sum:sumT,overlap:overlap});
  q.figure=u1ExplFig(names,[110,95,80,65],thicks); return q;
},["Start with the total of the component thicknesses, then account for the joins.","Add all four thicknesses, then subtract one overlap for each of the 3 joins."]);

E("u1-judge-complex",1,["3.21"],3,"var",varset([
  function(){return mcq("A stack is 4 cubes wide and 3 cubes deep. Its tallest column, at the back-right corner, is 4 cubes high, and every other column is 1 or 2 high. A student draws a side view that is 4 squares wide and 4 squares tall. Does the side view represent the stack, and why?",{t:"No: a side view is as wide as the stack is deep, so it should be 3 squares wide, though 4 tall is right",fb:"Yes: the side view pairs depth with height. The depth is 3 and the tallest column gives height 4."},[{t:"Yes: the side view uses the width and the height of the stack, so the view shown is right in full",fb:"Width pairs with height in the front view. The side view pairs depth with height."},{t:"No: the side view should be 3 squares wide and 3 squares tall, with nothing extra at either side",fb:"The width correction is right, but the height is the tallest column, which is 4, not 3."},{t:"Yes: the tallest column appears in the side view, so the view is complete and nothing is missing from it at all",fb:"Showing the tall column is not enough: the width of the view must match the depth of the stack."}],"The side view shows depth by height: 3 squares wide and 4 squares tall. The answer is <b>no: a side view is as wide as the stack is deep, so it should be 3 squares wide, though 4 tall is right</b>.",{});},
  function(){var q=mcq("The figure shows the top view of a cube stack, with column heights printed. A student says the front view is 3 squares tall in every column. Judge the claim using the figure.",{t:"The claim fails: the front columns have heights 1, 3 and 2 from the printed front row and back columns, so the front view columns differ",fb:"Yes: each front view column shows the tallest height in that line from front to back, and those maxima are not all 3."},[{t:"The claim holds: the tallest number printed is 3, and the front view only needs the tallest number in each column of the stack, nothing more",fb:"One column reaching 3 does not make every front column 3 tall."},{t:"The claim fails because front views never use printed top view numbers, which belong to the top view and to no other view",fb:"Front heights come exactly from these numbers: each view column takes the maximum in its line."},{t:"The claim holds because the front row contains a 3, and one tall column in the row is all the front view needs",fb:"A single 3 in the front row gives one tall column, not three."}],"Take the maximum in each front-to-back line: the maxima differ, so <b>the claim fails: the front columns have heights 1, 3 and 2 from the printed front row and back columns, so the front view columns differ</b>.",{});q.figure=u1ViewFig([[1,3,2],[2,1,1]],"top");return q;},
  function(){return mcq("An isometric drawing shows a stack whose back-left column is hidden behind a taller front column. A student counts only the cubes that can be seen and reports the total. A classmate says the total is too low. Who is right, and why?",{t:"The classmate: cubes in the hidden column still belong to the stack, and any column needs support cubes under its top cube",fb:"Yes: hidden cubes count. A column of height h contributes h cubes whether or not all of them are visible."},[{t:"The student: only visible cubes can be counted in a drawing total, and any cube that cannot be seen is left out",fb:"A total counts the object, not the visible faces: hidden supporting cubes are part of the stack."},{t:"The classmate, because isometric drawings always hide exactly half the cubes in every stack, whether it is large or small in size",fb:"There is no fixed hidden fraction: the shortfall depends on the column heights."},{t:"Neither: isometric drawings cannot be used to find totals at all, so no total from one can be trusted at all",fb:"Totals can be found when the column heights are known from the drawing and its views."}],"Hidden cubes are still part of the object, so <b>the classmate: cubes in the hidden column still belong to the stack, and any column needs support cubes under its top cube</b>.",{});},
  function(){return mcq("A one-point perspective drawing of a box shows its front face as a square and its top face sloping down to a vanishing point that sits below the horizon line. Does the drawing represent one-point perspective correctly, and why?",{t:"No: the vanishing point must sit on the horizon line, since receding edges aim at eye level",fb:"Yes: in one-point perspective the single vanishing point always lies on the horizon."},[{t:"Yes: the vanishing point can sit anywhere the artist chooses to put it, high or low on the page",fb:"Its position is fixed by the geometry: it lies on the horizon at eye level."},{t:"No: a box in one-point perspective has no top face showing in any such drawing of a box",fb:"A top face does show when the box sits below eye level. The error is the point below the horizon."},{t:"Yes: a lower vanishing point just means the viewer is taller than the box drawn in the scene",fb:"A taller viewer raises the horizon and the point together: the point stays on the horizon line."}],"The vanishing point and the horizon move together: <b>no: the vanishing point must sit on the horizon line, since receding edges aim at eye level</b>.",{});},
  function(){return mcq("Views of a prism shaped like a wedge (a triangular prism lying with a rectangular face down) are drawn as: top view a rectangle, front view a rectangle, side view a triangle. A student says the front view must be wrong because the object has a triangular end. Judge the claim.",{t:"The claim fails: the front of the long side is a rectangle, and the triangle appears only in the end (side) view",fb:"Yes: which view shows the triangle depends on which end faces the viewer, and here the long side faces front."},[{t:"The claim holds: the triangular face must appear in every view of the wedge, no matter how it is turned or held up",fb:"Each view shows only the outline from its direction: most directions hide the triangle outline."},{t:"The claim holds: the top view of a wedge is a triangle, just like the end of the wedge itself",fb:"From above, the wedge outline covers its full footprint, which is a rectangle."},{t:"The claim fails because wedges have no rectangular faces, only triangular ends and two long slanted sides",fb:"A triangular prism has three rectangular faces along its length: the front view shows one of them."}],"Direction decides the outline: <b>the claim fails: the front of the long side is a rectangle, and the triangle appears only in the end (side) view</b>.",{});}
]),["Check each dimension and each position separately: a view can be right in one respect and wrong in another.","State the specific mismatch before choosing the judgement."]);

E("u1-hidden-cubes",1,["3.22","3.19"],3,"gen",function(){
  var h=u1Stack(ri(3,4),ri(2,3),4); if(u1Sum(h)-u1Foot(h)<3){h[0][0]=4;h[1][1]=3;}
  var hidden=u1Sum(h)-u1Foot(h), total=u1Sum(h), foot=u1Foot(h);
  var cand=[total,foot,total+foot,hidden+2,hidden+3,total+2,foot+1];
  var seenD=[];cand.forEach(function(d){if(d!==hidden&&d>0&&seenD.indexOf(d)<0)seenD.push(d);});
  var q=mcq("The figure shows the top view of a cube stack, with the height of each column printed in its square. From directly above, exactly one cube of each column can be seen: its top cube. How many cubes of the stack cannot be seen from directly above?",
    {t:hidden+"",fb:"Yes: each column of height h hides h - 1 cubes under its top cube, and those hidden counts add to "+hidden+"."},
    seenD.slice(0,3).map(function(d){return {t:d+"",fb:"That counts the wrong set: subtract one visible top cube per column from the total number of cubes."};}),
    "The stack has "+total+" cubes in total and "+foot+" columns, so "+foot+" top cubes are visible from above. \\[ \\begin{aligned} \\text{hidden cubes} &= "+total+" - "+foot+" \\\\ &= "+hidden+" \\end{aligned} \\] The answer is <b>"+hidden+" cubes</b>.",
    {hidden:hidden});
  q.figure=u1ViewFig(h,"top"); return q;
},["Each column shows exactly one cube from directly above, no matter how tall it is.","Find the total number of cubes first, then subtract one per column."]);

E("u1-persp-vp-position",1,["3.23","3.24"],3,"gen",function(){
  var mode=pick(["left","centre","right"]);
  var vpX,fx=120,fw=100;
  if(mode==="left")vpX=pick([42,54,66,78,88,96]);
  else if(mode==="right")vpX=pick([238,252,266,280,294,308]);
  else vpX=pick([148,158,168,178,188,198]);
  var fh=pick([75,85,95]);
  var ctx=pick(["a storage locker","a garden shed","a delivery van cargo space","a classroom doorway","a workshop bench alcove","a library reading nook"]);
  var label={left:"On the horizon, to the left of the front face",centre:"On the horizon, behind the middle of the front face",right:"On the horizon, to the right of the front face"}[mode];
  var others=["left","centre","right"].filter(function(m){return m!==mode;}).map(function(m){return {t:{left:"On the horizon, to the left of the front face",centre:"On the horizon, behind the middle of the front face",right:"On the horizon, to the right of the front face"}[m],fb:"Compare the dot with the front rectangle: the dot sits in a different position relative to the front face."};});
  others.push({t:"Below the horizon, under the front face",fb:"The dot lies on the dashed horizon line: a vanishing point always sits on the horizon."});
  var q=mcq("The figure shows a one-point perspective drawing of "+ctx+". The dashed line is the horizon, the shaded rectangle is the front face, and the dot is the vanishing point. Which statement gives the position of the point of perspective?",
    {t:label,fb:"Yes: the dot lies on the horizon in that position relative to the front face."},
    others,
    "Locate the dot against two references: it sits on the horizon line, and relative to the front face it is positioned as stated. The answer is <b>"+label.toLowerCase()+"</b>.",
    {mode:mode,vpX:vpX});
  q.figure=u1PerspFig(vpX,90,fx,70,fw,fh); return q;
},["First check the dot against the horizon line, then compare it with the front face.","Use the front rectangle as your reference for left, middle or right."]);

E("u1-cr-level-off",1,["3.19","3.20"],3,"gen",function(){
  var h=u1Stack(ri(3,4),ri(2,3),4); if(u1Max(h)<3)h[0][0]=4;
  var mx=u1Max(h),foot=u1Foot(h),total=u1Sum(h);
  if(foot===0){h[0][1]=1;foot=u1Foot(h);total=u1Sum(h);}
  var ans=foot*mx-total;
  if(ans<=0){h[1][0]=1;total=u1Sum(h);ans=foot*mx-total;}
  var q=numq("The figure shows the top view of a cube stack, with the height of each column printed in its square. Cubes are added on top of the existing columns until every column in the footprint has the same height as the tallest column. No new columns are started. How many cubes must be added? Show your work.",ans,0.5,
    "The footprint has "+foot+" columns and the target height is "+mx+", so the finished stack holds "+foot+" x "+mx+" = "+(foot*mx)+" cubes. It already holds "+total+". \\[ \\begin{aligned} \\text{cubes to add} &= "+(foot*mx)+" - "+total+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+" cubes</b>.",
    {mx:mx,foot:foot,total:total});
  q.figure=u1ViewFig(h,"top"); return q;
},["Levelling every column to the tallest height makes a full block over the footprint.","Work out the finished total for the footprint at the target height, then subtract the cubes already there."]);

E("u1-cr-scale-area",1,["3.27","3.28"],3,"gen",function(){
  var w=pick([3,4,5,6,7,8]), hd=pick([3,4,5,6,7]), n=pick([10,20,25]);
  var rw=w*n/100, rh=hd*n/100, area=Math.round(rw*rh*100)/100;
  var panel=pick(["a cabinet door panel","a worktop panel","a sign board panel","a shelf end panel"]);
  return numq("A rectangular "+panel+" is shown in an exploded diagram booklet with a scale drawing. On the drawing the panel is "+w+" cm wide and "+hd+" cm tall, and the scale is 1:"+n+". What is the actual area of the panel, in square metres? Show your work.",area,0.02,
    "Scale each length first: width "+w+" x "+n+" = "+(w*n)+" cm = "+fmt(rw)+" m, and height "+hd+" x "+n+" = "+(hd*n)+" cm = "+fmt(rh)+" m. \\[ \\begin{aligned} \\text{area} &= "+fmt(rw)+" \\times "+fmt(rh)+" \\\\ &= "+fmt(area)+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+fmt(area)+" m²</b>.",
    {w:w,hd:hd,n:n});
},["Scale the width and the height separately before finding any area.","Convert each real length to metres, then multiply the two lengths."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 1 (views and drawing to scale). Borrowed verbatim from Mathematics 8 (u8-rotate-predict, u8-rotated-side-view-gap, u8-rotate-front-num) and Mathematics 9 (u7-scale-draw-num, u7-scale-factor-num); feeder helper copies ride in bank-helpers.js. ===== */
E("u1-pk-rotate-predict", 1, ["3.21"], 2, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var hm = u8RandHM(2, 3, 3, 5, 9);
    var turns = pick([1, 2, 3]);
    var rot = u8RotHM(hm, turns);
    var newFront = u8FrontProf(rot), oldFront = u8FrontProf(hm), newSide = u8SideProf(rot);
    var mirrorFront = newFront.slice().reverse();
    var optsT = [u8ProfStr(newFront), u8ProfStr(oldFront), u8ProfStr(newSide), u8ProfStr(mirrorFront)];
    if (new Set(optsT).size < 4) continue;
    // where does the tallest stack go?
    var ti = 0, tj = 0, tv = -1, r, c;
    for (r = 0; r < hm.length; r++) for (c = 0; c < hm[0].length; c++) if (hm[r][c] > tv) { tv = hm[r][c]; ti = r; tj = c; }
    if (hm.flat().filter(function (v) { return v === tv; }).length !== 1) continue;
    var dirWord = turns === 1 ? "90° clockwise" : (turns === 2 ? "180°" : "90° counterclockwise");
    var cell = 24, body = u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
    body += u8HM(hm, 124, 30, cell);
    var fig = u8Svg(320, 112, body, "Height map of a block object before a rotation");
    var q = mcq("The diagram shows a block object as a height map. The whole object is turned " + dirWord + " on the table, seen from above. After the turn, what are the column heights of the front view, read left to right? Each height is the tallest stack in that column.",
      { t: u8ProfStr(newFront), fb: "Correct. Turning the plan and then taking the tallest stack in each new column gives these heights." },
      [
        { t: u8ProfStr(oldFront), fb: "Those are the front heights before the turn; the turn moves the stacks to new columns." },
        { t: u8ProfStr(newSide), fb: "That reads a side direction of the turned object rather than its front." },
        { t: u8ProfStr(mirrorFront), fb: "That reverses the turned front view left to right; check which end the tall stacks move to." }
      ],
      "Turn the height map " + dirWord + " first, then take the tallest stack in each column of the turned map. The turned front column heights are <b>" + u8ProfStr(newFront) + "</b>.",
      { mode: "rotate-predict", hm: u8Key(hm), turns: turns });
    q.figure = fig;
    return q;
  }
  return mcq("A block object is turned 180° on the table. What are the front view column heights after the turn?",
    { t: "1, 2, 3", fb: "Correct." },
    [{ t: "3, 2, 1", fb: "That is the view before the turn." }, { t: "2, 2, 2", fb: "That flattens the stacks." }, { t: "3, 1, 2", fb: "That scrambles the columns." }],
    "Turning the map 180 degrees reverses the columns, giving <b>1, 2, 3</b>.", { mode: "rotate-predict", hm: "fb", turns: 2 });
}, ["Turn the whole height map first, in the direction named, keeping the back of the map at the top.", "After turning, take the tallest stack in each column, left to right."]);

E("u1-pk-rotated-side-view", 1, ["3.18"], 2, "gen", function(){
  var hm=u8RandHM(2, 3, 3, 6, 12);
  var turns=pick([1,2,3]);
  var rot=u8RotHM(hm, turns);
  var prof=u8SideProf(rot), ans=u8SumArr(prof);
  var dirWord=turns===1 ? "90° clockwise" : (turns===2 ? "180°" : "90° counterclockwise");
  var cell=24, body=u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
  body+=u8HM(hm, 124, 30, cell);
  var fig=u8Svg(320, 112, body, "Height map of a block object before a rotation");
  var q=numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. The object is turned "+dirWord+" on the table, seen from above, and then the right side view is drawn. How many squares show in that side view?", ans, 0,
    "Turn the map "+dirWord+" first. In the side view, each row of the turned map contributes its tallest stack, giving heights "+u8ProfStr(prof)+": \\[ \\begin{aligned} \\text{squares} &= "+prof.join(" + ")+" \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {mode:"rotated-side-view", hm:u8Key(hm), turns:turns});
  q.figure=fig;
  return q;
}, ["The rotation changes which stacks line up in the side view, so turn the map before reading it.", "Turn the height map first, then take the tallest stack in each row of the turned map and add them."]);

E("u1-pk-rotate-front", 1, ["3.18"], 2, "gen", function () {
  var hm = u8RandHM(2, 3, 3, 6, 10);
  var turns = pick([1, 2, 3]);
  var rot = u8RotHM(hm, turns);
  var prof = u8FrontProf(rot), ans = u8SumArr(prof);
  var dirWord = turns === 1 ? "90° clockwise" : (turns === 2 ? "180°" : "90° counterclockwise");
  var cell = 24, body = u8T(160, 14, "Object before the turn (numbers = cubes)", 11, true);
  body += u8HM(hm, 124, 30, cell);
  var fig = u8Svg(320, 112, body, "Height map of a block object before a rotation");
  var chain = prof.map(function (v, i) { return (i === 0 ? "" : " &+ ") + fmt(v); }).join("");
  var q = numq("The diagram shows a block object as a height map: each number tells how many cubes are stacked on that square. The object is turned " + dirWord + " on the table, seen from above, and then the front view is drawn. How many squares show in that front view? Count each visible square in every column.",
    ans, 0,
    "Turn the map " + dirWord + ", then take the tallest stack in each column of the turned map: \\[ \\begin{aligned} \\text{front heights} &= " + u8ProfStr(prof) + " \\\\ \\text{squares} &= " + prof.join(" + ") + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the front view after the turn shows <b>" + fmt(ans) + "</b> squares.",
    { mode: "rotate-front-num", hm: u8Key(hm), turns: turns });
  q.figure = fig;
  return q;
}, ["The rotation changes which stacks line up in each front column.", "Turn the map first, write the new column heights, then add them."]);

E("u1-pk-scale-draw", 1, ["3.18"], 1, "gen", function () {
  var ks = [0.5, 1.5, 2, 2.5, 3];
  var k = pick(ks), kind = pick(["rect", "tri"]);
  var word = k < 1 ? "reduction" : "enlargement";
  if (kind === "rect") {
    var w = ri(3, 9), h = ri(2, 7), askW = Math.random() < 0.5;
    var side = askW ? w : h, ans = Math.round(side * k * 100) / 100;
    var u = Math.min(24, 220 / w, 110 / h), x0 = 60, y0 = 40;
    var body = u7Poly([[x0, y0], [x0 + w * u, y0], [x0 + w * u, y0 + h * u], [x0, y0 + h * u]], FIG_SHADE);
    body += u7T(x0 + w * u / 2, y0 - 14, fmt(w) + " cm", 13, false);
    body += u7T(x0 + w * u + 26, y0 + h * u / 2, fmt(h) + " cm", 13, false);
    body += u7T(x0 + w * u / 2, y0 + h * u + 20, "Original", 13, true);
    var q = numq("The diagram shows a rectangle. It is redrawn as a " + word + " with scale factor " + fmt(k) + ". How long is the side of the image that matches the " + fmt(side) + " cm side, in centimetres?",
      ans, 0.01,
      "Multiply the original side by the scale factor: \\[ \\begin{aligned} \\text{image side} &= " + fmt(side) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the matching side of the image is <b>" + fmt(ans) + " cm</b>.",
      { mode: "draw-rect", w: w, h: h, k: k, side: side });
    q.figure = u7Svg(340, 200, body, "Rectangle with labelled sides");
    return q;
  }
  var a = ri(3, 10), b = ri(3, 10), askA = Math.random() < 0.5;
  var side2 = askA ? a : b, ans2 = Math.round(side2 * k * 100) / 100;
  var u2 = Math.min(24, 220 / a, 120 / b), x1 = 60, y1 = 160;
  var body2 = u7Poly([[x1, y1], [x1 + a * u2, y1], [x1, y1 - b * u2]], FIG_SHADE);
  body2 += u7T(x1 + a * u2 / 2, y1 + 18, fmt(a) + " cm", 13, false);
  body2 += u7T(x1 - 26, y1 - b * u2 / 2, fmt(b) + " cm", 13, false);
  body2 += u7T(x1 + a * u2 / 2, y1 - b * u2 - 16, "Original", 13, true);
  var q2 = numq("The diagram shows a right triangle. It is redrawn as a " + word + " with scale factor " + fmt(k) + ". How long is the side of the image that matches the " + fmt(side2) + " cm side, in centimetres?",
    ans2, 0.01,
    "Multiply the original side by the scale factor: \\[ \\begin{aligned} \\text{image side} &= " + fmt(side2) + " \\times " + fmt(k) + " \\\\ &= " + fmt(ans2) + " \\end{aligned} \\] So the matching side of the image is <b>" + fmt(ans2) + " cm</b>.",
    { mode: "draw-tri", a: a, b: b, k: k, side: side2 });
  q2.figure = u7Svg(340, 200, body2, "Right triangle with labelled sides");
  return q2;
}, ["The image side is the original side multiplied by the scale factor.", "Find the given side in the diagram, then multiply it by the scale factor."]);

E("u1-pk-scale-factor", 1, ["3.27"], 1, "gen", function () {
  var pairs = [[1, 4], [2, 5], [1, 2], [3, 5], [3, 4], [6, 5], [5, 4], [3, 2], [8, 5], [2, 1], [5, 2], [3, 1], [4, 1]];
  var pr = pick(pairs), p = pr[0], d = pr[1], m = ri(2, 10);
  var orig = d * m, img = p * m, ans = Math.round(p / d * 100) / 100;
  var ctxs = [["A drawing of a sunflower is ", " cm tall. The real sunflower is ", " cm tall."],
            ["A model boat is ", " cm long. The real boat is ", " cm long."],
            ["A photo print is ", " cm wide. The screen image it came from is ", " cm wide."]];
  var c = pick(ctxs);
  var prompt, oLen, iLen;
  if (Math.random() < 0.5) { oLen = orig; iLen = img; } else { oLen = orig; iLen = img; }
  prompt = c[0] + fmt(iLen) + c[1] + fmt(oLen) + c[2] + " The first length is the image and the second is the original. What is the scale factor for the diagram? Give the scale factor as a decimal or whole number.";
  var sol = "The scale factor is the image length divided by the original length: \\[ \\begin{aligned} \\text{scale factor} &= " + fmt(iLen) + " \\div " + fmt(oLen) + " \\\\ &= " + fmt(ans) + " \\end{aligned} \\] So the scale factor is <b>" + fmt(ans) + "</b>.";
  var q = numq(prompt, ans, 0.01, sol, { mode: "scale-factor", orig: oLen, img: iLen });
    q.figure = solBarsFig([{ name: "Image", len: iLen, lab: fmt(iLen) + " cm" }, { name: "Original", len: oLen, lab: fmt(oLen) + " cm" }], "Image and original lengths as bars");
    return q;
}, ["Scale factor is image length divided by original length.", "Put the image length first, then divide by the original length."]);

/* PK tranche metadata pass for Unit 1. The tranche's own entries are flagged here.  */
var PKT_U1_FOR=["3.17","3.18","3.19","3.20","3.21","3.22","3.23","3.24","3.25","3.26","3.27","3.28"];
var PKT_U1={
 "u1-pk-rotate-predict":{src:"math-8:10.10",group:"views"},
 "u1-pk-rotated-side-view":{src:"math-8:10.10",group:"views"},
 "u1-pk-rotate-front":{src:"math-8:10.16",group:"views"},
 "u1-pk-scale-draw":{src:"math-9:10.16",group:"scale"},
 "u1-pk-scale-factor":{src:"math-9:10.17",group:"scale"}
};
BANK.forEach(function(e){var t=PKT_U1[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U1_FOR.slice();e.pkGroup=t.group;}});
