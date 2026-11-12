/* Math 2202 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-2202/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
/* Math 2202 bank helpers: FR and the option-text balancing
   helpers (balDpStrs, balOpts), cut verbatim from the head of
   the standalone bank source (math-2202-review/bank-src.js,
   lines 1 to 69), where they precede the Unit 1 banner. */
/* Math 2202 Review bank source. Assembled November 7, 2026 from work/unit1.js to
   unit8.js. FR returns the raw \frac fragment for use INSIDE math delimiters,
   defined here for the entries that use it. CR_MARKS stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

function balDpStrs(strs){
  /* Guard: if any two option texts are already identical, return the input
     untouched. The bank's dedupe (mcq) and the Unit 7 retry wrapper key on
     identical texts; padding one of a duplicate pair ("7" -> "7.00") would
     defeat that and could put a distractor with the key's value on screen. */
  for(var g=0;g<strs.length;g++) for(var h=g+1;h<strs.length;h++) if(String(strs[g])===String(strs[h])) return strs;
  var parsed=[], suf=null;
  for(var i=0;i<strs.length;i++){
    var m=String(strs[i]).match(/^(-?\d+(?:\.\d+)?)([\s\S]*)$/);
    if(!m) return strs;
    if(m[1].indexOf(",")>=0) return strs;
    if(suf===null) suf=m[2]; else if(m[2]!==suf) return strs;
    parsed.push({v:parseFloat(m[1]), dp:(m[1].split(".")[1]||"").length});
  }
  function countsOk(dps){ var c={}; dps.forEach(function(d){ c[d]=(c[d]||0)+1; }); return Object.keys(c).every(function(k){ return c[k]!==1; }); }
  if(countsOk(parsed.map(function(p){ return p.dp; }))) return strs;
  function render(assign){ return parsed.map(function(p,i){ return p.v.toFixed(assign[i])+suf; }); }
  function distinct(arr){ var s={}; for(var i=0;i<arr.length;i++){ if(s[arr[i]]) return false; s[arr[i]]=1; } return true; }
  function search(allowKeyPad){
    var keyDp=parsed[0].dp;
    var maxUp=4;
    var opts=parsed.map(function(p,i){
      var lo=(i===0&&!allowKeyPad)?p.dp:p.dp, hi=p.dp+maxUp, arr=[];
      for(var d=lo;d<=hi;d++) arr.push(d);
      if(i===0&&!allowKeyPad) return [p.dp];
      return arr;
    });
    var best=null;
    for(var a=0;a<opts[1].length;a++) for(var b=0;b<opts[2].length;b++) for(var c=0;c<opts[3].length;c++){
      var assign=[parsed[0].dp, opts[1][a], opts[2][b], opts[3][c]];
      if(!countsOk(assign)) continue;
      var out=render(assign);
      if(!distinct(out)) continue;
      var cost=assign.reduce(function(s,d,i){ return s+(d-parsed[i].dp); },0);
      if(!best||cost<best.cost) best={out:out, cost:cost};
    }
    if(!best && allowKeyPad){
      for(var k=keyDp;k<=keyDp+maxUp&&!best;k++){
        for(var a2=0;a2<opts[1].length;a2++) for(var b2=0;b2<opts[2].length;b2++) for(var c2=0;c2<opts[3].length;c2++){
          var assign2=[k, opts[1][a2], opts[2][b2], opts[3][c2]];
          if(!countsOk(assign2)) continue;
          var out2=render(assign2);
          if(!distinct(out2)) continue;
          var cost2=assign2.reduce(function(s,d,i){ return s+(d-parsed[i].dp); },0);
          best={out:out2, cost:cost2};
        }
      }
    }
    return best?best.out:null;
  }
  return search(false)||search(true)||strs;
}
/* balOpts(key, ds): balDpStrs over option objects {t, fb} or plain strings.
   Returns [key, ds] with the same shapes, feedback preserved. */
function balOpts(key, ds){
  function tOf(o){ return (o&&typeof o==="object")?o.t:String(o); }
  var strs=[tOf(key)].concat(ds.map(tOf));
  var out=balDpStrs(strs);
  if(out===strs) return [key, ds];
  function withT(o, t){ if(o&&typeof o==="object"){ var n={}; for(var k in o) n[k]=o[k]; n.t=t; return n; } return t; }
  return [withT(key, out[0]), ds.map(function(d,i){ return withT(d, out[i+1]); })];
}

/* ----- bank-u1.js ----- */
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

/* ----- bank-u2.js ----- */
// Math 2202 Unit 2 Surface Area question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 474 to 1163).
// CRMARKS: u2-cr-prism=2
// CRMARKS: u2-cr-cylinder=2
// CRMARKS: u2-cr-sphere-radius=2
// CRMARKS: u2-cr-cyl-height=3
// CRMARKS: u2-cr-paint-trade=3
// CRMARKS: u2-cr-convert=3
// CRMARKS: u2-cr-tank-dome=2
// CRMARKS: u2-cr-correct-error=3
/* ===== Unit 2 ===== */
/* Math 2202 Unit 2 (Surface Area) bank entries. Codes from ind-unit2.json.
   Formula sheet forms used exactly: prism SA = 2lw + 2lh + 2wh;
   cylinder SA = 2 pi r^2 + 2 pi r h; cone SA = pi r^2 + pi r s;
   square pyramid SA = base + 4 triangular sides; sphere SA = 4 pi r^2. */
var u2Names = ["Maya","Liam","Sofia","Noah","Ava","Ethan","Ruby","Owen","Isla","Lucas","Nora","Eli","June","Caleb"];
function u2Dol(n){ var s = fmtF(n,2); var parts = s.split("."); parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); return "$" + parts.join("."); }
function u2DolM(n){ return "\\" + u2Dol(n); }
function u2PrismFig(l,w,h,unit){
  var s = '<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangular prism">';
  s += '<polygon points="70,80 210,80 210,160 70,160" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="70,80 110,40 250,40 210,80" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="210,80 250,40 250,120 210,160" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<text x="140" y="178" font-size="13" fill="' + FIG_INK + '" text-anchor="middle">length ' + l + ' ' + unit + '</text>';
  s += '<text x="262" y="105" font-size="13" fill="' + FIG_INK + '" text-anchor="middle">width ' + w + ' ' + unit + '</text>';
  s += '<text x="52" y="122" font-size="13" fill="' + FIG_INK + '" text-anchor="end">height ' + h + ' ' + unit + '</text>';
  return s + '</svg>';
}
function u2CylFig(r,h,unit){
  var s = '<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right cylinder">';
  s += '<ellipse cx="110" cy="42" rx="58" ry="16" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="52" y1="42" x2="52" y2="142" stroke="' + FIG_INK + '" stroke-width="2"/><line x1="168" y1="42" x2="168" y2="142" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<ellipse cx="110" cy="142" rx="58" ry="16" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="110" y1="42" x2="168" y2="42" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  s += '<text x="140" y="32" font-size="13" fill="' + FIG_INK + '" text-anchor="middle">r = ' + r + ' ' + unit + '</text>';
  s += '<text x="182" y="95" font-size="13" fill="' + FIG_INK + '" text-anchor="start">h = ' + h + ' ' + unit + '</text>';
  return s + '</svg>';
}
function u2ConeFig(r,sl,unit){
  var s = '<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right cone">';
  s += '<polygon points="110,28 52,142 168,142" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<ellipse cx="110" cy="142" rx="58" ry="14" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="110" y1="142" x2="168" y2="142" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  s += '<line x1="110" y1="28" x2="168" y2="142" stroke="' + FIG_INK + '" stroke-width="1.6" stroke-dasharray="5 4"/>';
  s += '<text x="140" y="162" font-size="13" fill="' + FIG_INK + '" text-anchor="middle">r = ' + r + ' ' + unit + '</text>';
  s += '<text x="176" y="82" font-size="13" fill="' + FIG_INK + '" text-anchor="start">slant = ' + sl + ' ' + unit + '</text>';
  return s + '</svg>';
}
function u2SphereFig(r,unit){
  var s = '<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sphere">';
  s += '<circle cx="110" cy="92" r="62" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<ellipse cx="110" cy="92" rx="62" ry="18" fill="none" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
  s += '<line x1="110" y1="92" x2="172" y2="92" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  s += '<text x="140" y="82" font-size="13" fill="' + FIG_INK + '" text-anchor="middle">r = ' + r + ' ' + unit + '</text>';
  return s + '</svg>';
}
function u2PyrFig(b,sl,unit){
  var s = '<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square pyramid">';
  s += '<polygon points="120,26 60,150 180,150" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<polygon points="60,150 96,118 216,118 180,150" fill="none" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
  s += '<line x1="120" y1="26" x2="120" y2="150" stroke="' + FIG_INK + '" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s += '<text x="120" y="170" font-size="13" fill="' + FIG_INK + '" text-anchor="middle">base side ' + b + ' ' + unit + '</text>';
  s += '<text x="196" y="80" font-size="13" fill="' + FIG_INK + '" text-anchor="start">slant ' + sl + ' ' + unit + '</text>';
  return s + '</svg>';
}
function u2NetFig(l,w,h,unit){
  var mx = Math.max(2 * l + 2 * w, l + w);
  var sc = 240 / (2 * l + 2 * w + w);
  var lw = l * sc, ww = w * sc, hh = h * sc;
  var x0 = 16, y0 = 30 + ww, s = '<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Net of a rectangular prism">';
  var widths = [lw, ww, lw, ww], labels = [l, w, l, w], x = x0, i;
  for (i = 0; i < 4; i++) {
    s += '<rect x="' + fmt(x,1) + '" y="' + fmt(y0,1) + '" width="' + fmt(widths[i],1) + '" height="' + fmt(hh,1) + '" fill="' + (i % 2 ? '#ffffff' : FIG_SHADE) + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
    s += '<text x="' + fmt(x + widths[i] / 2,1) + '" y="' + fmt(y0 + hh / 2,1) + '" font-size="11" fill="' + FIG_INK + '" text-anchor="middle">' + labels[i] + '</text>';
    x += widths[i];
  }
  s += '<rect x="' + fmt(x0 + lw,1) + '" y="' + fmt(y0 - ww,1) + '" width="' + fmt(ww,1) + '" height="' + fmt(ww,1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  s += '<rect x="' + fmt(x0 + lw,1) + '" y="' + fmt(y0 + hh,1) + '" width="' + fmt(ww,1) + '" height="' + fmt(ww,1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.8"/>';
  s += '<text x="150" y="192" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">side faces are height ' + h + ' ' + unit + '; top and bottom are ' + l + ' by ' + w + ' ' + unit + '</text>';
  return s + '</svg>';
}

/* ---------- Level 1 ---------- */

E("u2-sa-meaning", 2, ["3.1"], 1, "gen", function(){
  var nm = pick(u2Names);
  var sc = pick([
    {o:"cardboard storage box", cover:"how much paper is needed to cover every outside face of the box", floor:"how much floor space the box takes up in a closet", hold:"how many books the box can hold, when the container is filled right up", edge:"the distance around the top rim of the box, in total"},
    {o:"gift box", cover:"how much wrap is needed to cover every outside face of the box", floor:"how much table space the box takes up, measured as one flat area", hold:"how much tissue paper fits inside the box, in total", edge:"the distance around the lid of the box, in total"},
    {o:"plastic storage tote", cover:"how much paint is needed to coat every outside face of the tote", floor:"how much shelf space the tote takes up, measured as one flat area", hold:"how many litres of water the tote can hold, in total", edge:"the distance around the top rim of the tote, in total"},
    {o:"aquarium", cover:"how much glass is needed to make every face of the aquarium", floor:"how much counter space the aquarium takes up", hold:"how many litres of water the aquarium can hold", edge:"the distance around the top frame of the aquarium, in total"},
    {o:"toolbox", cover:"how much rust-proof coating is needed for every outside face of the toolbox", floor:"how much bench space the toolbox takes up, measured as one flat area", hold:"how many tools fit inside the toolbox, when the container is filled right up", edge:"the distance around the lid of the toolbox, measured all the way around"},
    {o:"planter box", cover:"how much stain is needed to cover every outside face of the planter", floor:"how much patio space the planter takes up, measured flat", hold:"how much soil the planter can hold, when the container is filled right up", edge:"the distance around the top edge of the planter, in total"},
    {o:"cooler", cover:"how much vinyl wrap is needed to cover every outside face of the cooler", floor:"how much trunk space the cooler takes up, measured flat", hold:"how many cans the cooler can hold, when the container is filled right up", edge:"the distance around the lid of the cooler, measured all the way around"},
    {o:"dog house", cover:"how much paint is needed to cover every outside face of the dog house", floor:"how much yard space the dog house takes up, measured as one flat area", hold:"how much bedding fits inside the dog house, in total", edge:"the distance around the doorway of the dog house, in total"},
    {o:"suitcase", cover:"how much fabric is needed to cover every outside face of the suitcase", floor:"how much floor space the suitcase takes up, measured as one flat area", hold:"how many clothes fit inside the suitcase, when it is filled right up", edge:"the distance around the zipper of the suitcase, in total"},
    {o:"lunch tin", cover:"how much decorative film is needed to cover every outside face of the tin", floor:"how much desk space the tin takes up, measured as one flat area", hold:"how much food the tin can hold, from bottom to top when it is filled right up", edge:"the distance around the lid of the tin, measured all the way around"}
  ]);
  return mcq(nm + " is working with a " + sc.o + ". Which task measures surface area?",
    {t: "Finding " + sc.cover + ".", fb: "Yes. Surface area totals the areas of all the outside faces, which is exactly what a covering task needs."},
    [
      {t: "Finding " + sc.floor + ".", fb: "That is a single flat area (length times width), not the total of all the faces."},
      {t: "Finding " + sc.hold + ".", fb: "How much a container holds is capacity or volume, measured in litres or cubic units, not square units."},
      {t: "Finding " + sc.edge + ".", fb: "A distance around an edge is a length (perimeter), measured in plain units, not square units."}
    ],
    "Surface area is the total area of all the faces of a 3-D object. Covering every outside face uses that total, so the covering task is the surface area task. The answer is <b>finding " + sc.cover + "</b>.",
    {obj: sc.o});
}, ["Ask whether the task covers all the faces of a 3-D object, or just one flat region.", "Covering every outside face is the surface area task; holding is volume and around is length."]);

E("u2-referent-estimate", 2, ["3.2"], 1, "gen", function(){
  var nm = pick(u2Names);
  var ref = pick([
    {n:"a sticky note", a:80, u:"cm"},
    {n:"a playing card", a:55, u:"cm"},
    {n:"a sheet of loose-leaf paper", a:600, u:"cm"},
    {n:"a paperback book cover", a:250, u:"cm"},
    {n:"a floor tile", a:900, u:"cm"},
    {n:"a bath towel laid flat", a:10000, u:"cm"}
  ]);
  var obj = pick(["a small bulletin board","a toolbox lid and sides","a gift box","a cooler","a storage tote","a lunch cooler bag","a skateboard deck","a laptop case"]);
  var k = ri(2, 9);
  var ans = ref.a * k;
  var d1 = ref.a + k, d2 = ref.a * (k - 1), d3 = ref.a * (k + 1);
  return mcq(nm + " estimates a surface area using a referent. A referent is a familiar object with a known area. " + "The surface area of " + ref.n + " is about " + ref.a + " square " + (ref.u === "cm" ? "centimetres" : "centimetres") + ". The surface of " + obj + " is about " + k + " times the referent. What is the best estimate?",
    {t: fmt(ans) + " cm²", fb: "Yes. Multiply the referent area by how many referents cover the surface: " + ref.a + " x " + k + " = " + fmt(ans) + "."},
    [
      {t: fmt(d1) + " cm²", fb: "That adds the referent area and the count. Estimation with a referent multiplies instead."},
      {t: fmt(d2) + " cm²", fb: "That uses one referent too few: the surface is about " + k + " referents, not " + (k - 1) + "."},
      {t: fmt(d3) + " cm²", fb: "That uses one referent too many: the surface is about " + k + " referents, not " + (k + 1) + "."}
    ],
    "Multiply the area of one referent by the number of referents that would cover the surface: \\[" + ref.a + " \\times " + k + " = " + fmt(ans) + "\\] The best estimate is <b>" + fmt(ans) + " cm²</b>.",
    {ref: ref.n, k: k});
}, ["A referent estimate multiplies the known area of the familiar object by how many of them cover the surface.", "Write down the referent area first, then multiply by the count given in the stem."]);

E("u2-prism-basic", 2, ["3.3","2.1"], 1, "gen", function(){
  var nm = pick(u2Names), l, w, h, SA, tries = 0;
  do { l = ri(2,9); w = ri(2,9); h = ri(2,8); SA = 2*l*w + 2*l*h + 2*w*h; tries++; }
  while (tries < 80 && (l*w*h === SA || l*w*h === l*w + l*h + w*h || l*w*h === 2*l*w + 2*l*h || l*w + l*h + w*h === 2*l*w + 2*l*h));
  var obj = pick(["shipping box","wooden crate","gift box","storage bin","tool chest","lunch box"]);
  var q = mcq(nm + " is covering a " + obj + " that is " + l + " cm long, " + w + " cm wide and " + h + " cm high. What is the surface area of the box?",
    {t: fmt(SA) + " cm²", fb: "Yes. The three face areas are " + (l*w) + ", " + (l*h) + " and " + (w*h) + "; double each and add."},
    [
      {t: fmt(l*w + l*h + w*h) + " cm²", fb: "That counts each different face only once. A closed box has two of each face, so each area must be doubled."},
      {t: fmt(l*w*h) + " cm³", fb: "That multiplies the three dimensions, which gives volume in cubic units, not surface area."},
      {t: fmt(2*l*w + 2*l*h) + " cm²", fb: "That doubles the top and front faces but leaves out the two side faces of area " + (w*h) + " each."}
    ],
    "Use the formula sheet form \\(SA = 2lw + 2lh + 2wh\\): \\[ \\begin{aligned} SA &= 2(" + l + ")(" + w + ") + 2(" + l + ")(" + h + ") + 2(" + w + ")(" + h + ") \\\\ &= " + (2*l*w) + " + " + (2*l*h) + " + " + (2*w*h) + " \\\\ &= " + SA + " \\end{aligned} \\] The surface area is <b>" + SA + " cm²</b>.",
    {l: l, w: w, h: h});
  q.figure = u2PrismFig(l, w, h, "cm");
  return q;
}, ["Use the prism formula from the formula sheet and count two of each face.", "Find the areas of the three different faces first: length by width, length by height, width by height."]);

E("u2-round-basic", 2, ["3.3"], 1, "gen", function(){
  var nm = pick(u2Names);
  if (ri(0,1) === 0) {
    var r = ri(2,10);
    var SA = Math.round(4 * Math.PI * r * r);
    var d1 = Math.round(Math.PI * r * r), d2 = Math.round(2 * Math.PI * r * r), d3 = Math.round(4 * Math.PI * r * r / 3 * r);
    var q1 = mcq(nm + " is painting a ball with radius " + r + " cm. To the nearest square centimetre, what is the surface area of the sphere?",
      {t: fmt(SA) + " cm²", fb: "Yes. The sphere formula is 4 pi r squared, and r is " + r + "."},
      [
        {t: fmt(d1) + " cm²", fb: "That is pi r squared, the area of one circle. The sphere formula multiplies by 4."},
        {t: fmt(d2) + " cm²", fb: "That uses 2 pi r squared, only half of the sphere formula 4 pi r squared."},
        {t: fmt(d3) + " cm³", fb: "That value comes from the volume formula for a sphere, which gives cubic units, not surface area."}
      ],
      "Use the formula sheet form \\(SA = 4\\pi r^2\\): \\[ \\begin{aligned} SA &= 4\\pi (" + r + ")^2 \\\\ &= 4\\pi (" + (r*r) + ") \\\\ &\\approx " + SA + " \\end{aligned} \\] The surface area is <b>about " + SA + " cm²</b>.",
      {mode: "sphere", r: r});
    q1.figure = u2SphereFig(r, "cm");
    return q1;
  }
  var rc = ri(3,9), sl = rc + ri(2,6);
  var SAc = Math.round(Math.PI * rc * rc + Math.PI * rc * sl);
  var e1 = Math.round(Math.PI * rc * sl), e2 = Math.round(Math.PI * rc * rc), e3 = Math.round(2 * Math.PI * rc * rc + Math.PI * rc * sl);
  var q2 = mcq(nm + " is making a cone-shaped party hat with radius " + rc + " cm and slant height " + sl + " cm. The slant height is the distance from the tip down the side to the rim. To the nearest square centimetre, what is the surface area of the cone, including its circular base?",
    {t: fmt(SAc) + " cm²", fb: "Yes. Add the base pi r squared to the side pi r s."},
    [
      {t: fmt(e1) + " cm²", fb: "That is only the slanted side, pi r s. The circular base must be added."},
      {t: fmt(e2) + " cm²", fb: "That is only the circular base, pi r squared. The slanted side must be added."},
      {t: fmt(e3) + " cm²", fb: "That counts the base twice. The cone has one base, so pi r squared appears once."}
    ],
    "Use the formula sheet form \\(SA = \\pi r^2 + \\pi rs\\): \\[ \\begin{aligned} SA &= \\pi (" + rc + ")^2 + \\pi (" + rc + ")(" + sl + ") \\\\ &\\approx " + fmt(Math.round(Math.PI*rc*rc)) + " + " + fmt(Math.round(Math.PI*rc*sl)) + " \\\\ &\\approx " + SAc + " \\end{aligned} \\] The surface area is <b>about " + SAc + " cm²</b>.",
    {mode: "cone", r: rc, s: sl});
  q2.figure = u2ConeFig(rc, sl, "cm");
  return q2;
}, ["Pick the formula sheet form that matches the solid: sphere or cone.", "For a cone, work out the base and the slanted side separately, then add."]);

E("u2-unit-choice", 2, ["4.10"], 1, "gen", function(){
  var nm = pick(u2Names);
  if (ri(0,1) === 0) {
    var rate = pick([5,8,10,12]);
    var area = ri(15,90);
    var prod = pick([
      {n:"paint", u:"litres of paint", per:"1 litre covers " + rate + " m²"},
      {n:"deck sealant", u:"litres of sealant", per:"1 litre covers " + rate + " m²"},
      {n:"tile adhesive", u:"bags of adhesive", per:"1 bag covers " + rate + " m²"},
      {n:"grass seed", u:"bags of seed", per:"1 bag covers " + rate + " m²"}
    ]);
    return mcq(nm + " is buying " + prod.n + ". " + prod.per + ". A surface of " + area + " m² must be covered. Which calculation gives the amount of material needed, in " + prod.u.split(" ").slice(-1)[0] + " or bags, using unit analysis?",
      {t: area + " m² ÷ (" + rate + " m² per unit)", fb: "Yes. The square metres cancel: area divided by coverage per unit leaves the number of units."},
      [
        {t: area + " m² × (" + rate + " m² per unit)", fb: "Multiplying leaves square metres times square metres per unit, which does not cancel to a count of units."},
        {t: area + " m² + " + rate + " m²", fb: "Adding two areas gives another area, not a number of units of material."},
        {t: rate + " m² ÷ (" + area + " m² per unit)", fb: "That divides the rate by the area. The area to cover goes on top so the units cancel correctly."}
      ],
      "In unit analysis, set up the division so the unwanted unit cancels: \\[" + area + " \\text{ m}^2 \\div " + rate + " \\frac{\\text{m}^2}{\\text{unit}} = " + fmt(area / rate) + " \\text{ units} \\] The calculation is <b>" + area + " m² ÷ (" + rate + " m² per unit)</b>.",
      {mode: "coverage", area: area, rate: rate});
  }
  var v = pick([2.5, 3, 3.5, 4, 4.5, 5, 6]);
  return mcq(nm + " measured a surface area of " + fmt(v) + " m² and needs the value in cm². Which setup converts it correctly?",
    {t: fmt(v) + " × 10 000", fb: "Yes. One square metre is 100 cm by 100 cm, which is 10 000 cm²."},
    [
      {t: fmt(v) + " × 100", fb: "That uses the length factor 100. Areas scale by the square of the length factor: 100 squared is 10 000."},
      {t: fmt(v) + " × 1 000", fb: "That factor belongs to volume-style conversions. For area, 1 m² is 10 000 cm²."},
      {t: fmt(v) + " ÷ 10 000", fb: "Dividing converts cm² back to m². Going from m² to the smaller cm² makes the number larger, so multiply."}
    ],
    "A square metre is a square 100 cm on a side, so \\(1 \\text{ m}^2 = 100 \\times 100 = 10\\,000 \\text{ cm}^2\\). Convert by multiplying: <b>" + fmt(v) + " × 10 000</b>.",
    {mode: "area-convert", v: v});
}, ["Track the units: the setup is right when the unwanted unit cancels and only the wanted unit is left.", "For coverage, start with the total area and divide by the coverage of one unit."]);

/* ---------- Level 2, multiple choice ---------- */

E("u2-cylinder-sa", 2, ["3.3","2.1"], 2, "gen", function(){
  var nm = pick(u2Names);
  var open = ri(0,1) === 0;
  var r, h, tries = 0, SA, wrong;
  do { r = ri(3,12); h = ri(5,20); SA = open ? Math.PI*r*r + 2*Math.PI*r*h : 2*Math.PI*r*r + 2*Math.PI*r*h; wrong = open ? 2*Math.PI*r*r + 2*Math.PI*r*h : Math.PI*r*r + 2*Math.PI*r*h; tries++; }
  while (tries < 60 && (Math.round(SA) === Math.round(2*Math.PI*r*h) || r === h || h === 2 * r));
  var A = Math.round(SA), W = Math.round(wrong), S = Math.round(2*Math.PI*r*h), B = Math.round(Math.PI*r*r);
  var ctx = open ? pick(["open-top rain barrel","open-top storage drum","open-top water tank"]) : pick(["sealed paint can","closed metal canister","sealed storage drum"]);
  var desc = open ? "The drum is open at the top, and the painter coats the outside of the side and the bottom." : "The container is closed, and the painter coats the whole outside.";
  var q = mcq(nm + " is painting a " + ctx + " with radius " + r + " cm and height " + h + " cm. " + desc + " To the nearest square centimetre, what area is painted?",
    {t: fmt(A) + " cm²", fb: "Yes. " + (open ? "An open drum has one circular base plus the curved side." : "A closed cylinder has two circular bases plus the curved side.")},
    [
      {t: fmt(W) + " cm²", fb: open ? "That is the closed cylinder formula. This drum is open at the top, so it has only one circular base." : "That counts only one circular base. A closed cylinder has a top and a bottom."},
      {t: fmt(S) + " cm²", fb: "That is only the curved side, 2 pi r h. The circular base area must be added."},
      {t: fmt(open ? Math.round(Math.PI*r*r + Math.PI*r*h) : Math.round(2*Math.PI*r*r + Math.PI*r*h)) + " cm²", fb: open ? "That replaces the curved side 2 pi r h with pi r h, which halves the side area." : "That keeps both circular bases but halves the curved side. The side term is 2 pi r h, not pi r h."}
    ],
    "Use the formula sheet form \\(SA = 2\\pi r^2 + 2\\pi rh\\)" + (open ? ", with one base removed for the open top" : "") + ": \\[ \\begin{aligned} SA &= " + (open ? "\\pi (" + r + ")^2 + 2\\pi (" + r + ")(" + h + ")" : "2\\pi (" + r + ")^2 + 2\\pi (" + r + ")(" + h + ")") + " \\\\ &\\approx " + A + " \\end{aligned} \\] The painted area is <b>about " + A + " cm²</b>.",
    {r: r, h: h, open: open});
  q.figure = u2CylFig(r, h, "cm");
  return q;
}, ["Decide first how many circular bases the object actually has.", "Work out the curved side, 2 pi r h, then add the base or bases that are painted."]);

E("u2-pyramid-sa", 2, ["3.3"], 2, "gen", function(){
  var nm = pick(u2Names);
  var b, sl, tries2 = 0;
  do { b = ri(4,14); sl = ri(5,16); tries2++; } while (tries2 < 60 && b === sl);
  var SA = b*b + 2*b*sl;
  var ctx = pick(["pyramid-shaped roof cap","square pyramid tent","pyramid monument cap","pyramid-shaped skylight"]);
  var q = mcq(nm + " is covering a " + ctx + ". Its square base has side " + b + " m, and each triangular side has a slant height of " + sl + " m. The slant height is measured up the middle of a triangular face. What is the total surface area, including the base?",
    {t: fmt(SA) + " m²", fb: "Yes. The base is b squared, and the four triangles together give 4 times one half b times slant."},
    [
      {t: fmt(b*b + b*sl) + " m²", fb: "That counts only two of the four triangular sides. The four triangles give 2 b times slant in total."},
      {t: fmt(2*b*sl) + " m²", fb: "That is the four triangular sides only. The square base must be added."},
      {t: fmt(b*b + 4*b*sl) + " m²", fb: "That treats each triangle as a full b by slant rectangle. Each triangle has area one half b times slant."}
    ],
    "Use the formula sheet form: base plus 4 triangular sides. \\[ \\begin{aligned} SA &= b^2 + 4\\left(\\tfrac{1}{2} b s\\right) \\\\ &= " + b + "^2 + 2(" + b + ")(" + sl + ") \\\\ &= " + (b*b) + " + " + (2*b*sl) + " \\\\ &= " + SA + " \\end{aligned} \\] The surface area is <b>" + SA + " m²</b>.",
    {b: b, s: sl});
  q.figure = u2PyrFig(b, sl, "m");
  return q;
}, ["Split the pyramid into its square base and its four identical triangular sides.", "Find one triangle first: one half times base side times slant height."]);

E("u2-net-area", 2, ["3.1"], 2, "gen", function(){
  var nm = pick(u2Names);
  var l = ri(3,10), w = ri(3,9), h = ri(2,8);
  var SA = 2*l*w + 2*l*h + 2*w*h;
  var obj = pick(["cardboard box","wooden crate","storage bin","shipping carton"]);
  var q = mcq("The diagram shows the net of a " + obj + ". " + nm + " cuts this net from one sheet of material and folds it into a closed box. What is the area of material in the net, which is also the surface area of the box?",
    {t: fmt(SA) + " cm²", fb: "Yes. The area of the flat net is the total of all six faces, which becomes the surface area when folded."},
    [
      {t: fmt(l*w + l*h + w*h) + " cm²", fb: "That counts only three faces of the net. The net has six faces: two of each size."},
      {t: fmt(l*w*h) + " cm³", fb: "That multiplies the three dimensions, which gives the volume of the folded box, not the area of its net."},
      {t: fmt(2*l*w + 2*l*h + w*h) + " cm²", fb: "That leaves one side face single instead of doubled. Every face size appears twice in the net."}
    ],
    "A net is the surface laid flat, so its area is the surface area. Add all six faces: \\[ \\begin{aligned} SA &= 2lw + 2lh + 2wh \\\\ &= 2(" + l + ")(" + w + ") + 2(" + l + ")(" + h + ") + 2(" + w + ")(" + h + ") \\\\ &= " + SA + " \\end{aligned} \\] The area of the net is <b>" + SA + " cm²</b>.",
    {l: l, w: w, h: h});
  q.figure = u2NetFig(l, w, h, "cm");
  return q;
}, ["The area of a net equals the surface area of the solid it folds into.", "List the six faces of the net and pair up the matching sizes."]);

E("u2-dim-change", 2, ["3.5"], 2, "gen", function(){
  var nm = pick(u2Names);
  if (ri(0,1) === 0) {
    var k = pick([2,3]);
    var base = pick([24, 40, 54, 96, 150, 216, 300, 486]);
    var obj = pick(["cube-shaped gift box","ball","storage cube","spherical lamp shade"]);
    var ans = base * k * k;
    return mcq("A " + obj + " has a surface area of " + base + " cm². A larger version is made with every dimension multiplied by " + k + ". What is the surface area of the larger version?",
      {t: fmt(ans) + " cm²", fb: "Yes. Surface area scales by the square of the scale factor: " + k + " squared is " + (k*k) + "."},
      [
        {t: fmt(base * k) + " cm²", fb: "That multiplies by the scale factor once. Areas scale by the square of the factor, not the factor itself."},
        {t: fmt(base * k * k * k) + " cm²", fb: "That uses the cube of the factor, which is how volume scales. Surface area uses the square."},
        {t: fmt(base + base * k) + " cm²", fb: "That adds one scaled copy to the original. Scaling every dimension multiplies the whole area by " + (k*k) + "."}
      ],
      "When every dimension is multiplied by " + k + ", each face is multiplied by \\(" + k + "^2 = " + (k*k) + "\\), so the total surface area is multiplied by " + (k*k) + ": \\[" + base + " \\times " + (k*k) + " = " + ans + "\\] The new surface area is <b>" + ans + " cm²</b>.",
      {mode: "all-dims", k: k, base: base});
  }
  var l = ri(3,8), w = ri(3,8), h = ri(2,6);
  var SA0 = 2*l*w + 2*l*h + 2*w*h;
  var SA1 = 2*(2*l)*w + 2*(2*l)*h + 2*w*h;
  return mcq(nm + " has a box " + l + " cm by " + w + " cm by " + h + " cm, with surface area " + SA0 + " cm². Only the length is doubled, and the width and height stay the same. What is the new surface area?",
    {t: fmt(SA1) + " cm²", fb: "Yes. Only the faces involving the length change size; the two end faces keep their original area."},
    [
      {t: fmt(2 * SA0) + " cm²", fb: "That doubles the whole surface area. Doubling one dimension does not double every face."},
      {t: fmt(4 * SA0) + " cm²", fb: "That is the effect of doubling every dimension. Here only the length changed."},
      {t: fmt(SA0 + 2*l*w) + " cm²", fb: "That adds only the growth of the top and bottom. The front and back faces also grow when the length doubles."}
    ],
    "Faces that use the length get a factor of 2; the two end faces (width by height) do not change: \\[ \\begin{aligned} SA &= 2(2 \\times " + l + ")(" + w + ") + 2(2 \\times " + l + ")(" + h + ") + 2(" + w + ")(" + h + ") \\\\ &= " + SA1 + " \\end{aligned} \\] The new surface area is <b>" + SA1 + " cm²</b>.",
    {mode: "one-dim", l: l, w: w, h: h});
}, ["Ask which dimensions changed, then decide how each face is affected.", "Scaling every dimension squares the scale factor for area; changing one dimension changes only the faces that use it."]);

E("u2-trades-formula", 2, ["2.3"], 2, "var", varset([
  function(){ return mcq("A painter uses the formula: litres needed = wall area ÷ coverage per litre. A wall has area 36 m² and 1 litre covers 9 m². How does the painter use the formula on this job?",
    {t: "Divide 36 by 9 to get 4 litres.", fb: "Yes. The formula is applied by substituting the job values: 36 divided by 9 is 4."},
    [{t: "Multiply 36 by 9 to get 324 litres.", fb: "Multiplying ignores the division in the formula and gives far more paint than the wall needs."},
     {t: "Add 36 and 9 to get 45 litres.", fb: "Adding mixes an area with a rate. The formula divides the area by the coverage."},
     {t: "Divide 9 by 36 to get 0.25 litres.", fb: "That reverses the division. The total area is divided by the coverage per litre."}],
    "Substitute the job values into the stated formula: \\[36 \\div 9 = 4\\] The painter needs <b>4 litres</b>.",
    {trade: "painter"}); },
  function(){ return mcq("A sheet-metal worker wraps insulation around a round duct. The worker uses the curved surface area, 2 pi r h, because the duct is open at both ends. For a duct with radius 0.2 m and length 3 m, which value does the worker order material for?",
    {t: "About 3.77 m²", fb: "Yes. With no ends to cover, only the curved side counts: 2 pi (0.2)(3) is about 3.77."},
    [{t: "About 4.02 m²", fb: "That adds both circular ends. An open duct has no ends to wrap."},
     {t: "About 0.38 m²", fb: "That is one circular end, pi r squared. The wrap covers the long curved side."},
     {t: "About 1.26 m²", fb: "That uses the diameter in place of the full side: it drops the factor from the radius and length product."}],
    "\\[ \\begin{aligned} SA &= 2\\pi r h \\\\ &= 2\\pi (0.2)(3) \\\\ &\\approx 3.77 \\end{aligned} \\] The worker orders material for <b>about 3.77 m²</b>.",
    {trade: "sheet-metal"}); },
  function(){ return mcq("A pool installer lines the inside bottom and walls of a rectangular pool. Which set of faces does the installer measure for the liner?",
    {t: "The bottom plus the four walls, with no top face.", fb: "Yes. A pool is open at the top, so the liner covers the bottom and the four inside walls only."},
    [{t: "All six faces of a closed box, top included in the count.", fb: "That adds a top face. A pool has no top to line."},
     {t: "Only the bottom of the pool, nothing else at all.", fb: "That leaves out the four walls, which also need liner."},
     {t: "The four walls plus a top cover over the top.", fb: "The top is the open water surface. The bottom, not the top, is lined."}],
    "A pool liner covers the surfaces the water touches: the bottom and the four walls. The open top is not a face. The answer is <b>the bottom plus the four walls</b>.",
    {trade: "pool-liner"}); },
  function(){ return mcq("A roofer covers a square pyramid roof. The roofer uses: roof area = 4 times the area of one triangular side, and leaves out the square base. Why does the roofer leave out the base?",
    {t: "The base is the ceiling inside the building, not part of the outside roof.", fb: "Yes. Roofing covers only the exposed triangular faces; the base sits inside the structure."},
    [{t: "The base is too hard to measure from the ground below the roof.", fb: "Measurement difficulty is not the reason. The base is simply not an outside surface."},
     {t: "The base has zero area on a pyramid, so it adds nothing to the roof area at all.", fb: "The square base has area; it is just not part of the roof surface."},
     {t: "Shingles cannot be cut into squares for the roof at all.", fb: "Shingles are cut to fit many shapes. The base is excluded because it is inside the building."}],
    "Surface area counts the faces that are actually exposed and covered. The pyramid base is the inside ceiling, so the roof area is the four triangular sides only. The answer is <b>the base is inside the building</b>.",
    {trade: "roofer"}); },
  function(){ return mcq("A tiler uses the formula: tiles needed = floor area ÷ area of one tile. A floor is 12 m² and one tile covers 0.25 m². How does the tiler use the formula?",
    {t: "Divide 12 by 0.25 to get 48 tiles.", fb: "Yes. Substituting gives 12 divided by 0.25, which is 48."},
    [{t: "Multiply 12 by 0.25 to get 3 tiles.", fb: "That shrinks the count below one floor worth. The formula divides the floor area by the tile area."},
     {t: "Add 12 and 0.25 to get 12.25 tiles.", fb: "Adding an area and a tile area does not produce a tile count."},
     {t: "Divide 0.25 by 12 to get about 0.02 tiles.", fb: "That reverses the division. The whole floor area goes first."}],
    "Substitute into the stated formula: \\[12 \\div 0.25 = 48\\] The tiler needs <b>48 tiles</b>.",
    {trade: "tiler"}); },
  function(){ return mcq("A packaging worker chooses wrap for a closed box using SA = 2lw + 2lh + 2wh. The box is 30 cm by 20 cm by 10 cm. Which total does the worker's formula give?",
    {t: "2 200 cm²", fb: "Yes. The three doubled face areas are 1 200, 600 and 400, which total 2 200."},
    [{t: "1 100 cm²", fb: "That counts each face size once. The formula doubles each face because the box has two of each."},
     {t: "6 000 cm³", fb: "That is the volume, length times width times height, in cubic units."},
     {t: "1 800 cm²", fb: "That leaves out the two end faces of 200 cm² each."}],
    "\\[ \\begin{aligned} SA &= 2(30)(20) + 2(30)(10) + 2(20)(10) \\\\ &= 1200 + 600 + 400 \\\\ &= 2200 \\end{aligned} \\] The worker's formula gives <b>2 200 cm²</b>.",
    {trade: "packaging"}); }
]), ["Each static names a trade first; match the formula to the faces that trade actually covers.", "An open object drops the faces that are not there; a closed object keeps all of them."]);

E("u2-error-id", 2, ["2.5"], 2, "gen", function(){
  var nm = pick(u2Names);
  var mode = ri(0,2);
  if (mode === 0) {
    var l, w, h, SA, wrongV, half, t0 = 0;
    do { l = ri(3,9); w = ri(3,9); h = ri(2,7); SA = 2*l*w + 2*l*h + 2*w*h; wrongV = l*w*h; half = l*w + l*h + w*h; t0++; }
    while (t0 < 80 && (wrongV === SA || wrongV === half || wrongV === 2*l*w + 2*l*h || half === 2*l*w + 2*l*h));
    return mcq(nm + " calculated the surface area of a box " + l + " cm by " + w + " cm by " + h + " cm and wrote SA = " + l + " x " + w + " x " + h + " = " + wrongV + ". What is the corrected surface area?",
      {t: fmt(SA) + " cm²", fb: "Yes. The correction replaces the volume product with the doubled face areas."},
      [{t: fmt(wrongV) + " cm³", fb: "That keeps the original error: multiplying the three dimensions gives volume."},
       {t: fmt(half) + " cm²", fb: "That adds each face once. Each face size appears twice on a closed box."},
       {t: fmt(2*l*w + 2*l*h) + " cm²", fb: "That doubles two face sizes but leaves out the side faces."}],
      "The written step multiplies the three dimensions, which is the volume. Surface area adds the doubled face areas: \\[ \\begin{aligned} SA &= 2lw + 2lh + 2wh \\\\ &= " + SA + " \\end{aligned} \\] The corrected surface area is <b>" + SA + " cm²</b>.",
      {mode: "volume-error", l: l, w: w, h: h});
  }
  if (mode === 1) {
    var d = pick([6,8,10,12,14]), hh = ri(5,14), r = d / 2;
    var SA2 = Math.round(2*Math.PI*r*r + 2*Math.PI*r*hh);
    var wrongR = Math.round(2*Math.PI*d*d + 2*Math.PI*d*hh);
    var sideOnly = Math.round(2*Math.PI*r*hh);
    return mcq(nm + " found the surface area of a closed cylinder with diameter " + d + " cm and height " + hh + " cm, but used the diameter " + d + " everywhere the radius belongs, getting about " + wrongR + " cm². What is the corrected surface area, to the nearest square centimetre?",
      {t: fmt(SA2) + " cm²", fb: "Yes. The radius is half the diameter, " + r + " cm, and using it gives this total."},
      [{t: fmt(wrongR) + " cm²", fb: "That keeps the original error: the diameter was used as the radius."},
       {t: fmt(sideOnly) + " cm²", fb: "That drops the two circular bases. A closed cylinder includes both ends."},
       {t: fmt(Math.round(Math.PI*r*r + 2*Math.PI*r*hh)) + " cm²", fb: "That fixes the radius but counts only one base. The cylinder is closed, so it has two."}],
      "First correct the radius: \\(r = " + d + " \\div 2 = " + r + "\\). Then \\[ \\begin{aligned} SA &= 2\\pi r^2 + 2\\pi r h \\\\ &= 2\\pi (" + r + ")^2 + 2\\pi (" + r + ")(" + hh + ") \\\\ &\\approx " + SA2 + " \\end{aligned} \\] The corrected surface area is <b>about " + SA2 + " cm²</b>.",
      {mode: "diameter-error", d: d, h: hh});
  }
  var b, sl, t2 = 0;
  do { b = ri(4,12); sl = ri(5,14); t2++; } while (t2 < 60 && b === sl);
  var SA3 = b*b + 2*b*sl, stu = b*b + 4*b*sl;
  return mcq(nm + " found the surface area of a square pyramid with base side " + b + " cm and slant height " + sl + " cm. The work used the full rectangle b x slant for each triangular side, giving " + stu + " cm². What is the corrected surface area?",
    {t: fmt(SA3) + " cm²", fb: "Yes. Each side is a triangle, so each has area one half b times slant."},
    [{t: fmt(stu) + " cm²", fb: "That keeps the original error: triangular sides were treated as rectangles."},
     {t: fmt(2*b*sl) + " cm²", fb: "That fixes the triangles but drops the square base."},
     {t: fmt(b*b + b*sl) + " cm²", fb: "That counts only two of the four triangular sides."}],
    "Each of the four sides is a triangle with area \\(\\tfrac{1}{2} b s\\): \\[ \\begin{aligned} SA &= b^2 + 4\\left(\\tfrac{1}{2} b s\\right) \\\\ &= " + (b*b) + " + " + (2*b*sl) + " \\\\ &= " + SA3 + " \\end{aligned} \\] The corrected surface area is <b>" + SA3 + " cm²</b>.",
    {mode: "triangle-error", b: b, s: sl});
}, ["Read the written work and name the exact step that breaks the formula.", "Common breaks: a volume product for area, the diameter used as the radius, or a triangle treated as a rectangle."]);

E("u2-equiv-forms", 2, ["2.6"], 2, "gen", function(){
  var nm = pick(u2Names);
  if (ri(0,1) === 0) {
    var l = ri(3,9), w = ri(2,8), h = ri(2,7);
    var SA = 2*l*w + 2*l*h + 2*w*h;
    return mcq(nm + " writes the surface area of a box two ways: Form A is 2lw + 2lh + 2wh, and Form B is 2(lw + lh + wh). For a box with l = " + l + ", w = " + w + " and h = " + h + ", why do the two forms agree?",
      {t: "Both forms double the same three face areas; Form B just groups them before doubling.", fb: "Yes. Distributing the 2 in Form B gives exactly Form A, so both give " + SA + "."},
      [{t: "They agree only because these particular numbers are small and easy.", fb: "The agreement is structural, not numerical: expanding Form B always gives Form A for any dimensions."},
       {t: "Form B doubles the volume and then adjusts it to match, whatever the size of the box.", fb: "Neither form uses volume. Both are built from the three face areas lw, lh and wh."},
       {t: "They agree because brackets never change a value in any expression at all.", fb: "Brackets do change values in general. Here the agreement comes from the distributive property on these terms."}],
      "Expand Form B: \\(2(lw + lh + wh) = 2lw + 2lh + 2wh\\), which is Form A. With the given values both give \\(" + SA + "\\). The answer is <b>both forms double the same three face areas</b>.",
      {mode: "prism-forms", l: l, w: w, h: h});
  }
  var r = ri(3,9), hh = ri(4,12);
  var SAc = Math.round(2*Math.PI*r*r + 2*Math.PI*r*hh);
  return mcq(nm + " writes the surface area of a closed cylinder two ways: Form A is 2 pi r² + 2 pi r h, and Form B is 2 pi r(r + h). For r = " + r + " and h = " + hh + ", why do the two forms agree?",
    {t: "Form B factors out the common 2 pi r from both terms of Form A.", fb: "Yes. Expanding 2 pi r(r + h) gives 2 pi r squared plus 2 pi r h, so both give about " + SAc + "."},
    [{t: "The forms agree because pi cancels out of both of them.", fb: "Pi does not cancel; it appears in every term of both forms."},
     {t: "Form B works because the radius and height are interchangeable.", fb: "Radius and height play different roles. The agreement comes from factoring, not swapping."},
     {t: "They agree only when the height equals the radius.", fb: "Here h is " + hh + " and r is " + r + ", and the forms still agree, because factoring works for any values."}],
    "Factor Form A: \\(2\\pi r^2 + 2\\pi r h = 2\\pi r (r + h)\\), which is Form B. With the given values both give about \\(" + SAc + "\\) cm². The answer is <b>Form B factors out the common 2 pi r</b>.",
    {mode: "cylinder-forms", r: r, h: hh});
}, ["Expand or factor one form and compare it term by term with the other.", "Equivalent forms always produce the same terms after expanding; check what is common to every term."]);

E("u2-estimate-apply", 2, ["3.2"], 2, "gen", function(){
  var nm = pick(u2Names);
  var ref = pick([
    {n:"a standard door face, about 2 m²", a:2},
    {n:"a sheet of plywood, about 3 m²", a:3},
    {n:"a king-size duvet laid flat, about 4 m²", a:4}
  ]);
  var rows, cols, te = 0;
  do { rows = ri(2,4); cols = ri(6,16); te++; } while (te < 80 && (rows + cols) * ref.a === rows * cols);
  var obj = pick(["long wall of a school gym","side wall of a community rink","wall of a warehouse bay","side of a storage container row"]);
  var ans = rows * cols * ref.a;
  return mcq(nm + " estimates the area of the " + obj + " using a referent: " + ref.n + ". The wall is about " + rows + " referents tall and about " + cols + " referents long. What is the best estimate of the wall area?",
    {t: fmt(ans) + " m²", fb: "Yes. The wall holds about " + rows + " x " + cols + " = " + (rows*cols) + " referents, each about " + ref.a + " m²."},
    [{t: fmt(rows * cols) + " m²", fb: "That counts the referents but forgets to multiply by the area of one referent."},
     {t: fmt((rows + cols) * ref.a) + " m²", fb: "That adds the height and length counts. Covering a surface multiplies the counts in the two directions."},
     {t: fmt(rows * cols * ref.a * 2) + " m²", fb: "That doubles the estimate. Only the one inside wall surface is being estimated."}],
    "Count the referents that cover the wall, then multiply by the area of one referent: \\[ \\begin{aligned} \\text{referents} &= " + rows + " \\times " + cols + " = " + (rows*cols) + " \\\\ \\text{area} &\\approx " + (rows*cols) + " \\times " + ref.a + " = " + ans + " \\end{aligned} \\] The best estimate is <b>about " + ans + " m²</b>.",
    {rows: rows, cols: cols, a: ref.a});
}, ["Count how many referents tile the surface: tall count times long count.", "Multiply the referent count by the area of one referent."]);

E("u2-proportion-convert", 2, ["4.11"], 2, "gen", function(){
  var nm = pick(u2Names);
  var mode = ri(0,2);
  if (mode === 0) {
    var v = ri(3,40), ans = v * 144;
    return mcq(nm + " has a surface area of " + v + " ft² and needs the value in square inches. Using the proportion 1 ft² = 144 in², what is the converted area?",
      {t: fmt(ans) + " in²", fb: "Yes. Each square foot holds 12 by 12 = 144 square inches."},
      [{t: fmt(v * 12) + " in²", fb: "That uses the length factor 12. An area conversion uses 12 squared, which is 144."},
       {t: fmt(v * 24) + " in²", fb: "That doubles the length factor. A square foot is 12 inches by 12 inches, not 24."},
       {t: fmt(Math.round(v / 144 * 100) / 100) + " in²", fb: "That divides. Square inches are smaller than square feet, so the number must grow."}],
      "Set up the proportion with the area factor: \\[" + v + " \\times 144 = " + ans + "\\] The converted area is <b>" + ans + " in²</b>.",
      {mode: "ft2-in2", v: v});
  }
  if (mode === 1) {
    var v2 = pick([2,3,4,5,6,7,8,9,12,15]), ans2 = v2 * 10000;
    return mcq("A workshop table surface has area " + v2 + " m². " + nm + " needs the area in cm² for a materials list. Using 1 m² = 10 000 cm², what is the converted area?",
      {t: fmt(ans2) + " cm²", fb: "Yes. Multiply by 10 000, the number of square centimetres in a square metre."},
      [{t: fmt(v2 * 100) + " cm²", fb: "That uses the length factor 100. For area the factor is 100 squared = 10 000."},
       {t: fmt(v2 * 1000) + " cm²", fb: "That factor is used for some volume conversions. Square metres to square centimetres uses 10 000."},
       {t: fmt(v2 / 100) + " cm²", fb: "That divides by a length factor. Converting to a smaller unit makes the number larger."}],
      "Use the table value for the area unit: \\[" + v2 + " \\times 10\\,000 = " + fmt(ans2) + "\\] The converted area is <b>" + fmt(ans2) + " cm²</b>.",
      {mode: "m2-cm2", v: v2});
  }
  var v3 = ri(2,20), ans3 = v3 * 9;
  return mcq(nm + " measures a patio surface of " + v3 + " yd². Using the proportion 1 yd² = 9 ft², what is the area in square feet?",
    {t: fmt(ans3) + " ft²", fb: "Yes. One square yard is 3 feet by 3 feet, which is 9 square feet."},
    [{t: fmt(v3 * 3) + " ft²", fb: "That uses the length factor 3. Areas use 3 squared, which is 9."},
     {t: fmt(v3 * 36) + " ft²", fb: "That is the square-inch style factor for a different pair of units. Yards to feet uses 9."},
     {t: fmt(v3 * 6) + " ft²", fb: "That adds the two side factors instead of multiplying them: 3 by 3 is 9, not 6."}],
    "Build the area factor from the length factor: \\(1 \\text{ yd}^2 = 3 \\times 3 = 9 \\text{ ft}^2\\). Then \\[" + v3 + " \\times 9 = " + ans3 + "\\] The area is <b>" + ans3 + " ft²</b>.",
    {mode: "yd2-ft2", v: v3});
}, ["An area conversion factor is the length factor squared; build it from a 1-by-1 square in the new unit.", "Set up the proportion so the starting unit cancels and the target unit remains."]);

E("u2-unit-error", 2, ["4.12"], 2, "gen", function(){
  var nm = pick(u2Names);
  var mode = ri(0,2);
  if (mode === 0) {
    var v = pick([3,4,5,6,7,8,9,11,12]);
    return mcq(nm + " converted a surface area of " + v + " m² to cm² by multiplying by 100, getting " + (v*100) + " cm². What is the corrected value?",
      {t: fmt(v * 10000) + " cm²", fb: "Yes. The error was using the length factor 100; the area factor is 100 squared = 10 000."},
      [{t: fmt(v * 100) + " cm²", fb: "That keeps the original error: 100 is the centimetres-per-metre length factor."},
       {t: fmt(v * 1000) + " cm²", fb: "That factor belongs to litre and volume style conversions, not square metres to square centimetres."},
       {t: fmt(v * 200) + " cm²", fb: "That doubles the length factor. Squaring it gives 10 000, not 200."}],
      "The error is the conversion factor: for area, square the length factor. \\[" + v + " \\times 100^2 = " + v + " \\times 10\\,000 = " + fmt(v*10000) + "\\] The corrected value is <b>" + fmt(v*10000) + " cm²</b>.",
      {mode: "m2-cm2-error", v: v});
  }
  if (mode === 1) {
    var f = ri(2,15);
    return mcq(nm + " converted a surface area of " + f + " ft² to square inches by multiplying by 12, getting " + (f*12) + " in². What is the corrected value?",
      {t: fmt(f * 144) + " in²", fb: "Yes. A square foot is 12 inches by 12 inches, so the area factor is 144."},
      [{t: fmt(f * 12) + " in²", fb: "That keeps the original error: 12 is the length factor, not the area factor."},
       {t: fmt(f * 24) + " in²", fb: "That doubles the length factor. The area factor is 12 squared = 144."},
       {t: fmt(f * 120) + " in²", fb: "That is close to a guess from the length factor. Squaring 12 gives exactly 144."}],
      "Correct the factor by squaring the length factor: \\[" + f + " \\times 12^2 = " + f + " \\times 144 = " + fmt(f*144) + "\\] The corrected value is <b>" + fmt(f*144) + " in²</b>.",
      {mode: "ft2-in2-error", v: f});
  }
  var c = pick([20000, 30000, 45000, 60000, 85000, 120000]);
  return mcq(nm + " converted a surface area of " + fmt(c) + " cm² to m² by dividing by 100, getting " + fmt(c/100) + " m². What is the corrected value?",
    {t: fmt(c / 10000) + " m²", fb: "Yes. There are 10 000 cm² in 1 m², so divide by 10 000."},
    [{t: fmt(c / 100) + " m²", fb: "That keeps the original error: 100 is the length factor."},
     {t: fmt(c / 1000) + " m²", fb: "That divides by a volume style factor. The area factor is 10 000."},
     {t: fmt(c * 10000) + " m²", fb: "That multiplies. Going from the smaller cm² to the larger m² makes the number smaller, so divide."}],
    "The error is again the factor: use 10 000 cm² per m². \\[" + fmt(c) + " \\div 10\\,000 = " + fmt(c/10000) + "\\] The corrected value is <b>" + fmt(c/10000) + " m²</b>.",
    {mode: "cm2-m2-error", v: c});
}, ["Find the conversion factor in the written work and check whether it was squared for an area.", "Length factors are 100 and 12 in these problems; area factors are their squares, 10 000 and 144."]);

/* ---------- Level 2, constructed response ---------- */

E("u2-cr-prism", 2, ["3.3","2.1"], 2, "gen", function(){
  var nm = pick(u2Names);
  var l = ri(4,15), w = ri(3,12), h = ri(3,10);
  var SA = 2*l*w + 2*l*h + 2*w*h;
  var obj = pick(["wooden crate","shipping box","storage chest","metal toolbox","planter box"]);
  return numq(nm + " is painting the outside of a closed " + obj + " that is " + l + " cm long, " + w + " cm wide and " + h + " cm high. Find the surface area to be painted, in square centimetres. Show your work.",
    SA, 1,
    "Use the formula sheet form \\(SA = 2lw + 2lh + 2wh\\): \\[ \\begin{aligned} SA &= 2(" + l + ")(" + w + ") + 2(" + l + ")(" + h + ") + 2(" + w + ")(" + h + ") \\\\ &= " + (2*l*w) + " + " + (2*l*h) + " + " + (2*w*h) + " \\\\ &= " + SA + " \\end{aligned} \\] The surface area is <b>" + SA + " cm²</b>.",
    {l: l, w: w, h: h});
}, ["Use the prism formula from the formula sheet and count two of each face.", "Find the three different face areas first, double each one, then add."]);

E("u2-cr-cylinder", 2, ["3.3"], 2, "gen", function(){
  var nm = pick(u2Names);
  var r = ri(3,12), h = ri(6,24);
  var SA = 2*Math.PI*r*r + 2*Math.PI*r*h;
  var obj = pick(["closed water tank","sealed metal drum","closed storage canister","cylindrical silo section"]);
  return numq(nm + " is coating a " + obj + " with radius " + r + " m and height " + h + " m. The coating covers the whole outside, including both ends. Find the surface area to be coated, to the nearest square metre. Show your work.",
    Math.round(SA), 2,
    "Use the formula sheet form \\(SA = 2\\pi r^2 + 2\\pi rh\\): \\[ \\begin{aligned} SA &= 2\\pi (" + r + ")^2 + 2\\pi (" + r + ")(" + h + ") \\\\ &= " + fmtF(2*Math.PI*r*r,1) + " + " + fmtF(2*Math.PI*r*h,1) + " \\\\ &\\approx " + Math.round(SA) + " \\end{aligned} \\] The surface area is <b>about " + Math.round(SA) + " m²</b>.",
    {r: r, h: h});
}, ["Use the cylinder formula from the formula sheet: two circular bases plus the curved side.", "Work out the two bases and the curved side as separate terms, then add."]);

E("u2-cr-sphere-radius", 2, ["3.4","2.2"], 2, "gen", function(){
  var nm = pick(u2Names);
  var r = ri(3,15);
  var SA = 4*Math.PI*r*r;
  return numq("A spherical buoy has a surface area of " + fmtF(SA,2) + " cm². " + nm + " needs its radius for a replacement cap. Find the radius, to the nearest tenth of a centimetre. Show your work.",
    r, 0.2,
    "Rearrange the sphere formula \\(SA = 4\\pi r^2\\) to solve for the radius: \\[ \\begin{aligned} r^2 &= \\frac{" + fmtF(SA,2) + "}{4\\pi} \\\\ &= " + fmtF(r*r,2) + " \\\\ r &= \\sqrt{" + fmtF(r*r,2) + "} = " + r + " \\end{aligned} \\] The radius is <b>" + r + " cm</b>.",
    {r: r});
}, ["Start from the sphere surface area formula and rearrange it to isolate the radius.", "Divide the surface area by 4 pi first; that gives r squared."]);

E("u2-cr-cyl-height", 2, ["3.4","2.2"], 2, "gen", function(){
  var nm = pick(u2Names);
  var r = ri(3,10), h = ri(5,18);
  var SA = 2*Math.PI*r*r + 2*Math.PI*r*h;
  return numq("A closed cylindrical can has radius " + r + " cm and a total surface area of " + fmtF(SA,1) + " cm². " + nm + " needs the height of the can to cut a label. Find the height, to the nearest tenth of a centimetre. Show your work.",
    h, 0.2,
    "Rearrange \\(SA = 2\\pi r^2 + 2\\pi rh\\). First remove the two bases, then divide by \\(2\\pi r\\): \\[ \\begin{aligned} 2\\pi r h &= " + fmtF(SA,1) + " - 2\\pi (" + r + ")^2 \\\\ &= " + fmtF(2*Math.PI*r*h,1) + " \\\\ h &= \\frac{" + fmtF(2*Math.PI*r*h,1) + "}{2\\pi (" + r + ")} \\\\ &\\approx " + h + " \\end{aligned} \\] The height is <b>about " + h + " cm</b>.",
    {r: r, h: h});
}, ["Rearrange the cylinder formula: the surface area is the two bases plus the side term that contains the height.", "Subtract the area of the two circular bases first; what remains is the curved side."]);

E("u2-cr-paint-trade", 2, ["2.4","4.10","2.3"], 2, "gen", function(){
  var nm = pick(u2Names);
  var l = ri(4,8), w = ri(3,6), h = ri(2,4);
  var area = 2*l*h + 2*w*h + l*w;
  var cover = pick([8,10,12]);
  var price = pick([32,38,45,52]);
  var cans = Math.ceil(area / cover);
  var cost = cans * price;
  return numq(nm + ", a painter, is painting a storage shed that is " + l + " m long, " + w + " m wide and " + h + " m high. The painter paints the roof and the four walls, but not the floor. One can of paint covers " + cover + " m² and costs " + u2Dol(price) + ". Find the total cost of the paint, in dollars. Show your work.",
    cost, 0.01,
    "The painted area is the four walls plus the roof (the top face), with no floor: \\[ \\begin{aligned} A &= 2lh + 2wh + lw \\\\ &= 2(" + l + ")(" + h + ") + 2(" + w + ")(" + h + ") + (" + l + ")(" + w + ") \\\\ &= " + area + " \\text{ m}^2 \\end{aligned} \\] Unit analysis: cans needed \\(= " + area + " \\div " + cover + " = " + fmtF(area/cover,2) + "\\), so the painter must buy " + cans + " whole cans. Cost \\(= " + cans + " \\times " + u2DolM(price) + " = " + u2DolM(cost) + "\\). The total cost is <b>" + u2Dol(cost) + "</b>.",
    {l: l, w: w, h: h, cover: cover, price: price});
}, ["Build the painted area from the faces that are actually painted, then use the coverage rate to get cans.", "Leave the floor out of the area. Paint is sold in whole cans, so round the can count up."]);

E("u2-cr-convert", 2, ["4.11","3.3"], 2, "gen", function(){
  var nm = pick(u2Names);
  var l = ri(20,60), w = ri(15,50), h = ri(10,40);
  var SA = 2*l*w + 2*l*h + 2*w*h;
  var m2 = SA / 10000;
  return numq("A metal sign panel box is " + l + " cm long, " + w + " cm wide and " + h + " cm high. " + nm + " finds its surface area in square centimetres, then must report it in square metres for a supplier form. Find the surface area in square metres, to the nearest hundredth. Show your work.",
    Math.round(m2 * 100) / 100, 0.02,
    "First the surface area in cm²: \\[ \\begin{aligned} SA &= 2lw + 2lh + 2wh \\\\ &= 2(" + l + ")(" + w + ") + 2(" + l + ")(" + h + ") + 2(" + w + ")(" + h + ") \\\\ &= " + fmt(SA) + " \\text{ cm}^2 \\end{aligned} \\] Convert with the area factor \\(1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2\\): \\(" + fmt(SA) + " \\div 10\\,000 = " + fmtF(m2,2) + "\\). The surface area is <b>about " + fmtF(m2,2) + " m²</b>.",
    {l: l, w: w, h: h});
}, ["Find the surface area in the given unit first, then convert the finished area.", "Square metres and square centimetres differ by a factor of 10 000, not 100."]);

/* ---------- Level 3, multiple choice ---------- */

E("u2-composite-sa", 2, ["3.3","2.4"], 3, "gen", function(){
  var nm = pick(u2Names);
  var mode = ri(0,2);
  if (mode === 0) {
    var l, w, h, SA, tc = 0;
    do { l = ri(4,12); w = ri(3,10); h = ri(3,9); SA = l*w + 2*l*h + 2*w*h; tc++; }
    while (tc < 80 && l*h + w*h === l*w);
    return mcq(nm + " is painting the outside of an open-top storage box " + l + " cm by " + w + " cm by " + h + " cm. The box has no top. What is the painted area?",
      {t: fmt(SA) + " cm²", fb: "Yes. An open-top box has one base plus the four side faces."},
      [{t: fmt(2*l*w + 2*l*h + 2*w*h) + " cm²", fb: "That is the closed box total. The missing top face must be removed."},
       {t: fmt(2*l*h + 2*w*h) + " cm²", fb: "That counts the four sides but drops the bottom face, which is painted on the outside."},
       {t: fmt(l*w + l*h + w*h) + " cm²", fb: "That counts one of each face size. The side faces come in pairs."}],
      "An open-top box keeps the base and both pairs of sides, and drops one top face: \\[ \\begin{aligned} SA &= lw + 2lh + 2wh \\\\ &= " + (l*w) + " + " + (2*l*h) + " + " + (2*w*h) + " \\\\ &= " + SA + " \\end{aligned} \\] The painted area is <b>" + SA + " cm²</b>.",
      {mode: "open-box", l: l, w: w, h: h});
  }
  if (mode === 1) {
    var r = ri(3,9), hh = ri(5,14);
    var SAt = Math.round(2*Math.PI*r*hh + 2*Math.PI*r*r);
    return mcq("A storage tank is a cylinder of radius " + r + " m and height " + hh + " m with a half-sphere (dome) roof. The tank sits on the ground, and " + nm + " paints the outside of the curved wall and the dome. To the nearest square metre, what area is painted?",
      {t: fmt(SAt) + " m²", fb: "Yes. The wall is 2 pi r h and the dome is half of a sphere surface, 2 pi r squared."},
      [{t: fmt(Math.round(2*Math.PI*r*hh + 4*Math.PI*r*r)) + " m²", fb: "That uses a full sphere for the roof. The roof is only a half-sphere."},
       {t: fmt(Math.round(2*Math.PI*r*hh)) + " m²", fb: "That is the curved wall only. The dome roof is painted too."},
       {t: fmt(Math.round(2*Math.PI*r*hh + 2*Math.PI*r*r + Math.PI*r*r)) + " m²", fb: "That adds the circular bottom, which sits on the ground and is not painted."}],
      "The painted surface is the cylinder wall plus a hemisphere: \\[ \\begin{aligned} SA &= 2\\pi r h + \\tfrac{1}{2}\\left(4\\pi r^2\\right) \\\\ &= 2\\pi (" + r + ")(" + hh + ") + 2\\pi (" + r + ")^2 \\\\ &\\approx " + SAt + " \\end{aligned} \\] The painted area is <b>about " + SAt + " m²</b>.",
      {mode: "tank-dome", r: r, h: hh});
  }
  var L, W, H, l2, w2, h2, ts = 0;
  do { L = ri(8,14); W = ri(6,10); H = ri(4,7); l2 = ri(3,6); w2 = ri(3,5); h2 = ri(2,5); ts++; }
  while (ts < 80 && (w2 === h2 || w2 === 2 * h2));
  var SA1 = 2*L*W + 2*L*H + 2*W*H, SA2 = 2*l2*w2 + 2*l2*h2 + 2*w2*h2;
  var contact = l2 * w2;
  var SAs = SA1 + SA2 - 2 * contact;
  return mcq("A display stand is made of two closed boxes. The bottom box is " + L + " cm by " + W + " cm by " + H + " cm. A smaller closed box " + l2 + " cm by " + w2 + " cm by " + h2 + " cm sits fully on top of it, and the joined faces touch over a " + l2 + " cm by " + w2 + " cm rectangle. " + nm + " paints all the exposed surface. What area is painted?",
    {t: fmt(SAs) + " cm²", fb: "Yes. Add both full surface areas, then remove the touching rectangle twice: it is hidden on both boxes."},
    [{t: fmt(SA1 + SA2) + " cm²", fb: "That paints the touching faces too. The contact rectangle is hidden on both boxes."},
     {t: fmt(SA1 + SA2 - contact) + " cm²", fb: "That removes the contact area once, but it is hidden on the top of one box and the bottom of the other, so remove it twice."},
     {t: fmt(SA1 + SA2 - 2 * l2 * h2) + " cm²", fb: "That removes the wrong rectangle. The boxes touch on the smaller box's base, length by width."}],
    "Add the two closed-box totals, then subtract the hidden contact area from both boxes: \\[ \\begin{aligned} SA &= " + SA1 + " + " + SA2 + " - 2(" + l2 + ")(" + w2 + ") \\\\ &= " + SAs + " \\end{aligned} \\] The painted area is <b>" + SAs + " cm²</b>.",
    {mode: "stacked", L: L, W: W, H: H, l2: l2, w2: w2, h2: h2});
}, ["Break the object into its pieces, then adjust for faces that are missing or hidden where pieces join.", "A joined face is hidden on both pieces, so its area comes off twice."]);

E("u2-manip-advanced", 2, ["3.4","2.2"], 3, "gen", function(){
  var nm = pick(u2Names);
  var mode = ri(0,2);
  if (mode === 0) {
    var r, s, tm = 0;
    do { r = ri(3,10); s = ri(6,16); tm++; } while (tm < 60 && r === s);
    var SA = Math.PI*r*r + Math.PI*r*s;
    var _bo0=balOpts({t: fmt(s) +"", fb: "Yes. Subtract the base pi r squared, then divide by pi r."}, [{t: fmt(Math.round((SA / (Math.PI * r)) * 10) / 10) +"", fb: "That divides the whole surface area by pi r without removing the base first, so it overshoots."},
       {t: fmt(Math.round((SA - Math.PI*r*r) / (Math.PI * 2 * r) * 10) / 10) +"", fb: "That divides by 2 pi r. The side term is pi r s, so divide by pi r."},
       {t: fmt(2 * s) +"", fb: "That doubles the slant height. Check the division step after the base is removed."}]); return mcq("A cone has radius " + r + " cm and surface area " + fmtF(SA,1) + " cm². " + nm + " rearranges the cone formula to find the slant height. What is the slant height, to the nearest tenth of a centimetre?", _bo0[0], _bo0[1],
      "Rearrange \\(SA = \\pi r^2 + \\pi r s\\): \\[ \\begin{aligned} \\pi r s &= " + fmtF(SA,1) + " - \\pi (" + r + ")^2 \\\\ s &= \\frac{" + fmtF(Math.PI*r*s,1) + "}{\\pi (" + r + ")} \\\\ &\\approx " + s + " \\end{aligned} \\] The slant height is <b>about " + s + " cm</b>.",
      {mode: "cone-slant", r: r, s: s});
  }
  if (mode === 1) {
    var side = ri(3,12), SAq = 6 * side * side;
    var _bo1=balOpts({t: fmt(side) +"", fb: "Yes. Divide the surface area by 6 to get one face, then take the square root."}, [{t: fmt(Math.round(Math.sqrt(SAq) * 10) / 10) +"", fb: "That takes the square root of the whole surface area. First divide by 6 to isolate one face."},
       {t: fmt(SAq / 6) +"", fb: "That is the area of one face, in square centimetres. The edge is the square root of that area."},
       {t: fmt(side * 2) +"", fb: "That doubles the edge. After dividing by 6, the square root gives the edge directly."}]); return mcq("A cube-shaped dice vault has a surface area of " + SAq + " cm². " + nm + " needs the length of one edge to cut a liner. What is the edge length, in centimetres?", _bo1[0], _bo1[1],
      "A cube has 6 equal faces: \\[ \\begin{aligned} 6s^2 &= " + SAq + " \\\\ s^2 &= " + (side*side) + " \\\\ s &= " + side + " \\end{aligned} \\] The edge length is <b>" + side + " cm</b>.",
      {mode: "cube-edge", side: side});
  }
  var rs = ri(4,14);
  var SAs2 = 4 * Math.PI * rs * rs;
  var _bo2=balOpts({t: fmt(rs) +"", fb: "Yes. Divide by 4 pi to get r squared, then take the square root."}, [{t: fmt(rs * rs) +"", fb: "That stops at r squared, the value after dividing by 4 pi. The square root still has to be taken to get the radius."},
     {t: fmt(Math.round(Math.sqrt(SAs2 / (2 * Math.PI)) * 10) / 10) +"", fb: "That divides by 2 pi. The full factor in the formula is 4 pi."},
     {t: fmt(2 * rs) +"", fb: "That is the diameter. The rearranged formula gives the radius."}]); return mcq("A spherical tank has surface area " + fmtF(SAs2,1) + " cm². " + nm + " rearranges the sphere formula to find the radius. What is the radius, to the nearest tenth of a centimetre?", _bo2[0], _bo2[1],
    "Rearrange \\(SA = 4\\pi r^2\\): \\[ \\begin{aligned} r^2 &= \\frac{" + fmtF(SAs2,1) + "}{4\\pi} \\\\ &= " + fmtF(rs*rs,1) + " \\\\ r &\\approx " + rs + " \\end{aligned} \\] The radius is <b>about " + rs + " cm</b>.",
    {mode: "sphere-radius", r: rs});
}, ["Rearrange the formula in two stages: remove the added terms, then undo the coefficient and the square.", "Identify which term contains the unknown, isolate that term, then divide and take roots as needed."]);

E("u2-scaling-compare", 2, ["3.5","2.6"], 3, "gen", function(){
  var nm = pick(u2Names);
  if (ri(0,1) === 0) {
    var k = pick([2,3]);
    var base = pick([36, 54, 96, 150, 294, 384]);
    var obj = pick(["spherical ornament","cube-shaped planter","ball","storage cube"]);
    var ans = base * k * k;
    return mcq("Two " + obj + "s are similar: every dimension of the larger one is " + k + " times the matching dimension of the smaller one. The smaller one has surface area " + base + " cm². " + nm + " uses the equivalent forms SA ratio = (scale factor)² to find the larger surface area. What is it?",
      {t: fmt(ans) + " cm²", fb: "Yes. The area ratio is the square of the scale factor: " + k + " squared is " + (k*k) + "."},
      [{t: fmt(base * k * k * k) + " cm²", fb: "That applies the volume ratio, the cube of the factor. Surface area uses the square."},
       {t: fmt(base * k) + " cm²", fb: "That applies the length ratio. Areas grow faster than lengths."},
       {t: fmt(base + k * k) + " cm²", fb: "That adds the area factor to the original area. The original area must be multiplied by the factor, not increased by it."}],
      "For similar solids, the surface area ratio equals the square of the scale factor, which is the same relationship written two ways: \\[" + base + " \\times " + k + "^2 = " + base + " \\times " + (k*k) + " = " + ans + "\\] The larger surface area is <b>" + ans + " cm²</b>.",
      {mode: "ratio", k: k, base: base});
  }
  var l = ri(3,7), w = ri(3,6), h = ri(2,5), kk = 2;
  var SA0 = 2*l*w + 2*l*h + 2*w*h, SA1 = 4 * SA0;
  var diff = SA1 - SA0;
  return mcq("A box is " + l + " cm by " + w + " cm by " + h + " cm. A second box doubles every dimension of the first. How much more surface area does the second box have?",
    {t: fmt(diff) + " cm²", fb: "Yes. The first box has " + SA0 + " cm² and doubling every dimension multiplies that by 4, so the increase is " + diff + " cm²."},
    [{t: fmt(SA1) + " cm²", fb: "That is the second box's total surface area. The question asks how much more it has than the first box."},
     {t: fmt(SA0) + " cm²", fb: "That is only the first box's surface area, with nothing added."},
     {t: fmt(2 * SA0) + " cm²", fb: "That doubles the area, the effect of a length change. Doubling every dimension multiplies surface area by 4."}],
    "Compute both totals and subtract: \\[ \\begin{aligned} SA_1 &= " + SA0 + " \\\\ SA_2 &= 4 \\times " + SA0 + " = " + SA1 + " \\\\ \\text{increase} &= " + SA1 + " - " + SA0 + " = " + diff + " \\end{aligned} \\] The second box has <b>" + diff + " cm²</b> more surface area.",
    {mode: "difference", l: l, w: w, h: h});
}, ["For similar solids, compare using the square of the scale factor before computing anything else.", "Work out the first surface area; the scaled one is the scale factor squared times as large."]);

/* ---------- Level 3, constructed response ---------- */

E("u2-cr-tank-dome", 2, ["3.3"], 3, "gen", function(){
  var nm = pick(u2Names);
  var r = ri(2,8), h = ri(4,12);
  var SA = 2*Math.PI*r*h + 2*Math.PI*r*r;
  return numq("A fuel tank is a cylinder of radius " + r + " m and height " + h + " m topped with a half-sphere dome of the same radius. The tank sits on the ground. " + nm + " paints the outside of the curved wall and the dome. Find the painted area, to the nearest square metre. Show your work.",
    Math.round(SA), 2,
    "The painted surface is the cylinder wall plus half of a sphere surface: \\[ \\begin{aligned} SA &= 2\\pi r h + \\tfrac{1}{2}\\left(4\\pi r^2\\right) \\\\ &= 2\\pi (" + r + ")(" + h + ") + 2\\pi (" + r + ")^2 \\\\ &\\approx " + Math.round(SA) + " \\end{aligned} \\] The painted area is <b>about " + Math.round(SA) + " m²</b>.",
    {r: r, h: h});
}, ["Split the surface into the cylinder wall and the dome, and use half of the sphere formula for the dome.", "The bottom is on the ground, so leave it out; start with the curved wall term 2 pi r h."]);

E("u2-cr-correct-error", 2, ["2.5","4.12","3.4"], 3, "gen", function(){
  var nm = pick(u2Names);
  var r = ri(30,60);
  var SAcm = 4*Math.PI*r*r;
  var SAm = SAcm / 10000;
  var stuCm = Math.round(SAm * 100);
  return numq("A spherical tank has a surface area of " + fmtF(SAm,2) + " m². " + nm + " must find its radius in centimetres. Another student starts by writing " + fmtF(SAm,2) + " m² = " + fmt(stuCm) + " cm² and then uses SA = pi r². Both steps contain errors. Find the correct radius, to the nearest tenth of a centimetre. Show your work.",
    r, 0.3,
    "Correct the conversion first: an area in m² converts with the squared factor, \\(1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2\\), giving \\(" + fmtF(SAm,2) + " \\times 10\\,000 \\approx " + fmt(Math.round(SAcm)) + " \\text{ cm}^2\\), not " + fmt(stuCm) + " cm². Then use the correct sphere formula \\(SA = 4\\pi r^2\\): \\[ \\begin{aligned} r^2 &= \\frac{" + fmt(Math.round(SAcm)) + "}{4\\pi} \\\\ &\\approx " + fmtF(r*r,1) + " \\\\ r &\\approx " + r + " \\end{aligned} \\] The correct radius is <b>about " + r + " cm</b>.",
    {r: r});
}, ["Fix the work in order: first the unit conversion, then the formula, then solve.", "Area conversions use the square of the length factor, and a sphere uses 4 pi r squared."]);

/* ----- bank-u3.js ----- */
// Math 2202 Unit 3 Volume and Capacity question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 1164 to 1893).
// CRMARKS: u3-cr-tank-capacity=2
// CRMARKS: u3-cr-cylinder=2
// CRMARKS: u3-cr-si-conversion=2
// CRMARKS: u3-cr-cone=3
// CRMARKS: u3-cr-find-height=3
// CRMARKS: u3-cr-composite=3
// CRMARKS: u3-cr-capacity-remaining=2
// CRMARKS: u3-cr-find-base-side=3
/* ===== Unit 3 ===== */
/* Unit 3: Volume and Capacity. Helpers prefixed u3v. */
function u3vUniq(a){ return new Set(a.map(function(x){return String(x);})).size===a.length; }
function u3vBoxFig(l,w,h,unit){
  var s='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangular prism with length, width and height marked">';
  s+='<polygon points="62,78 98,50 190,50 154,78" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="154,78 190,50 190,112 154,140" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="62" y="78" width="92" height="62" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="108" y="164" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">l = '+l+' '+unit+'</text>';
  s+='<text x="76" y="42" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">w = '+w+' '+unit+'</text>';
  s+='<text x="198" y="100" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vCylFig(r,h,unit){
  var s='<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cylinder with radius and height marked">';
  s+='<path d="M54,48 L54,136 A46,12 0 0 0 146,136 L146,48" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<ellipse cx="100" cy="48" rx="46" ry="12" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="100" y1="48" x2="146" y2="48" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="100" y="28" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  s+='<text x="156" y="96" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vConeFig(r,h,unit){
  var s='<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right cone with height marked">';
  s+='<polygon points="110,28 52,142 168,142" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<ellipse cx="110" cy="142" rx="58" ry="14" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="110" y1="28" x2="110" y2="142" stroke="'+FIG_INK+'" stroke-width="1.6" stroke-dasharray="5 4"/>';
  s+='<line x1="110" y1="142" x2="168" y2="142" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="140" y="162" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  s+='<text x="118" y="88" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vPyrFig(l,w,h,unit){
  var s='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square based pyramid with height marked">';
  s+='<polygon points="120,30 60,150 180,150" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="120,30 180,150 205,125 145,30" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+='<line x1="60" y1="150" x2="205" y2="150" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="120" y1="30" x2="120" y2="150" stroke="'+FIG_INK+'" stroke-width="1.6" stroke-dasharray="5 4"/>';
  s+='<text x="120" y="170" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">base '+l+' '+unit+' by '+w+' '+unit+'</text>';
  s+='<text x="128" y="92" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vSphereFig(r,unit){
  var s='<svg viewBox="0 0 200 190" width="200" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sphere with radius marked">';
  s+='<circle cx="100" cy="88" r="62" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="100" y1="88" x2="162" y2="88" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="100" y="172" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  return s+'</svg>';
}
function u3vCompFig(l1,l2,h1,h2,unit){
  var s='<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Step shaped solid, side view">';
  s+='<polygon points="40,160 240,160 240,90 140,90 140,40 40,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="90" y="180" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">lower part '+l1+' '+unit+' long</text>';
  s+='<text x="90" y="28" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">upper part '+l2+' '+unit+' long</text>';
  s+='<text x="252" y="128" font-size="13" fill="'+FIG_INK+'" text-anchor="start">lower height '+h1+'</text>';
  s+='<text x="90" y="70" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">upper height '+h2+'</text>';
  return s+'</svg>';
}

/* ---------- Level 1 ---------- */
E("u3-vol-vs-capacity", 3, ["3.6"], 1, "var", varset([
  function(){ return mcq("A gravel pile takes up space in a yard. A water jug can be filled with juice. Which pairing is correct?",
    {t:"The gravel pile has volume; the jug has capacity", fb:"Yes: volume is the space an object takes up, and capacity is how much a container can hold."},
    [{t:"The gravel pile has capacity; the jug has volume only", fb:"That swaps the terms: a solid pile is described by the space it takes up, which is volume."},
     {t:"Both are capacity, because both can be measured", fb:"Being measurable does not make both capacity: capacity is only about what a container holds."},
     {t:"Both are volume, because a jug is a solid object", fb:"The jug as an object has volume, but the amount it can hold inside is its capacity, which is what the question pairs."}],
    "Volume is the amount of space a 3-D object takes up. Capacity is the amount a container can hold. The answer is <b>the gravel pile has volume; the jug has capacity</b>.", {}); },
  function(){ return mcq("Which statement best explains capacity?",
    {t:"Capacity is the amount a container can hold inside", fb:"Yes: capacity describes the inside space of a container, often measured in litres or millilitres."},
    [{t:"Capacity is the space any solid object takes up", fb:"That describes volume in general, not the holding amount of a container."},
     {t:"Capacity is the area covering the outside of a container", fb:"Outside covering is surface area, not capacity."},
     {t:"Capacity is the distance around a container", fb:"Distance around is perimeter or circumference, not capacity."}],
    "Capacity is the amount a container can hold. The answer is <b>capacity is the amount a container can hold inside</b>.", {}); },
  function(){ return mcq("A full aquarium holds 40 L of water. The glass tank itself sits on a stand and takes up room. What does the 40 L describe?",
    {t:"The capacity of the aquarium", fb:"Yes: 40 L is the amount the container holds."},
    [{t:"The surface area of the aquarium", fb:"Surface area would be in square units, not litres."},
     {t:"The volume of the glass only", fb:"The glass material is a small part; 40 L of water describes what the tank holds."},
     {t:"The perimeter of the aquarium", fb:"Perimeter is a length and would be in units such as centimetres, not litres."}],
    "Litres of water held describe how much the container holds. The answer is <b>the capacity of the aquarium</b>.", {}); },
  function(){ return mcq("Which statement best explains volume?",
    {t:"Volume is the amount of space a 3-D object takes up", fb:"Yes: volume measures the space occupied by a solid, a liquid or a gas."},
    [{t:"Volume is the amount a measuring cup can hold in total", fb:"That is a capacity description for one container, not the general meaning of volume."},
     {t:"Volume is the flat area on top of an object", fb:"A flat area is area, measured in square units."},
     {t:"Volume is the height of an object, bottom to top", fb:"Height is one length; volume combines three dimensions of space."}],
    "Volume is the amount of space a 3-D object takes up, measured in cubed units. The answer is <b>volume is the amount of space a 3-D object takes up</b>.", {}); },
  function(){ return mcq("A recipe says a mixing bowl has a capacity of 3 L. Why is the word capacity used?",
    {t:"The bowl is a container, and 3 L is how much it can hold", fb:"Yes: containers are described by how much they hold."},
    [{t:"The bowl is a solid, and 3 L is the space the metal takes up", fb:"The metal of the bowl takes up far less than 3 L; the 3 L is the holding amount."},
     {t:"Litres are always used for solids", fb:"Litres are used for volumes and capacities of liquids and containers, not solids as such."},
     {t:"Capacity and surface area mean the same thing here", fb:"Surface area would be in square units; the bowl holding 3 L is capacity."}],
    "A bowl is a container, so the amount it can hold is its capacity. The answer is <b>the bowl is a container, and 3 L is how much it can hold</b>.", {}); },
  function(){ return mcq("A brick is 20 cm long, 10 cm wide and 6 cm high, so it takes up 1,200 cm\u00B3 of space. Which term fits the 1,200 cm\u00B3?",
    {t:"Volume, because the brick is a solid taking up space", fb:"Yes: a solid brick is described by the space it occupies."},
    [{t:"Capacity, because bricks are used to build containers", fb:"The brick itself holds nothing; the measurement is the space the solid takes up."},
     {t:"Capacity, because the value is in cubed units", fb:"Cubed units measure volume; capacity of containers is usually given in litres or millilitres."},
     {t:"Surface area, because the dimensions are given", fb:"Multiplying the three dimensions gives volume, not the outside covering area."}],
    "\\(20 \\times 10 \\times 6 = 1{,}200\\), and a solid taking up space is measured by volume. The answer is <b>volume, because the brick is a solid taking up space</b>.", {}); }
]), ["Volume describes space taken up; capacity describes what a container holds.", "Ask whether the item is a solid taking up space or a container being filled."]);

E("u3-referents", 3, ["3.7","3.8"], 1, "var", varset([
  function(){ return mcq("Which object is a good referent for a capacity of \\(1\\ \\text{L}\\)?",
    {t:"A large water bottle or a milk carton", fb:"Yes: both are sold as 1 L containers."},
    [{t:"A teaspoon", fb:"A teaspoon holds about 5 mL, far less than 1 L."},
     {t:"A bathtub", fb:"A bathtub holds well over 100 L, far more than 1 L."},
     {t:"A thimble", fb:"A thimble holds only a few millilitres, far less than 1 L."}],
    "A familiar 1 L referent is a large water bottle or milk carton. The answer is <b>a large water bottle or a milk carton</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a volume of \\(1\\ \\text{cm}^3\\)?",
    {t:"A sugar cube", fb:"Yes: a sugar cube is about 1 cm on each side."},
    [{t:"A shoebox", fb:"A shoebox is thousands of cubic centimetres."},
     {t:"A dice cup", fb:"A dice cup holds hundreds of cubic centimetres."},
     {t:"A backpack", fb:"A backpack is tens of thousands of cubic centimetres."}],
    "\\(1\\ \\text{cm} \\times 1\\ \\text{cm} \\times 1\\ \\text{cm} = 1\\ \\text{cm}^3\\), about the size of a sugar cube. The answer is <b>a sugar cube</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a volume of \\(1\\ \\text{m}^3\\)?",
    {t:"A large appliance box, such as a fridge box", fb:"Yes: a fridge box is roughly 1 m in each dimension."},
    [{t:"A lunch box", fb:"A lunch box is only a few thousand cubic centimetres, far under 1 cubic metre."},
     {t:"A kitchen sink", fb:"A sink holds tens of litres, which is far under 1 cubic metre (1,000 L)."},
     {t:"A shoebox", fb:"A shoebox is far smaller than a cubic metre."}],
    "\\(1\\ \\text{m}^3 = 1{,}000\\ \\text{L}\\), about the space inside a large appliance box. The answer is <b>a large appliance box, such as a fridge box</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a capacity of \\(1\\ \\text{mL}\\)?",
    {t:"A small cube 1 cm on each side, such as a tiny dice", fb:"Yes: 1 cm cubed is exactly 1 mL."},
    [{t:"A coffee mug", fb:"A mug holds about 250 mL, far more than 1 mL."},
     {t:"A soup spoon", fb:"A soup spoon holds about 15 mL, still well over 1 mL."},
     {t:"A juice box", fb:"A juice box holds about 200 mL, far more than 1 mL."}],
    "\\(1\\ \\text{mL} = 1\\ \\text{cm}^3\\), the size of a small 1 cm cube. The answer is <b>a small cube 1 cm on each side</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a volume of \\(1\\ \\text{ft}^3\\)?",
    {t:"A milk crate, about 1 ft in each dimension", fb:"Yes: a standard milk crate is close to a cubic foot."},
    [{t:"A shoebox", fb:"A shoebox is well under a cubic foot."},
     {t:"A garden shed", fb:"A shed is hundreds of cubic feet."},
     {t:"A dice", fb:"A dice is about a cubic inch, far smaller than a cubic foot."}],
    "\\(1\\ \\text{ft} \\times 1\\ \\text{ft} \\times 1\\ \\text{ft} = 1\\ \\text{ft}^3\\), about a milk crate. The answer is <b>a milk crate, about 1 ft in each dimension</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a volume of \\(1\\ \\text{yd}^3\\)?",
    {t:"A large load of topsoil in a small trailer", fb:"Yes: topsoil is sold by the cubic yard, and a small trailer load is about that size."},
    [{t:"A wheelbarrow load of soil", fb:"A wheelbarrow holds only part of a cubic yard, roughly a quarter or less."},
     {t:"A bucket of soil", fb:"A bucket is a tiny fraction of a cubic yard."},
     {t:"A full tandem dump truck load", fb:"A tandem truck holds many cubic yards, far more than one."}],
    "Soil and gravel are sold by the cubic yard; a small trailer load is a good referent. The answer is <b>a large load of topsoil in a small trailer</b>.", {}); }
]), ["Picture a familiar object that is about the stated size.", "Compare each object with the unit: millilitres are tiny, litres are bottles, cubic metres are room sized."]);

E("u3-choose-unit", 3, ["3.8","3.7"], 1, "gen", function(){
  var S=[
    {o:"a dose of liquid medicine in a small syringe", u:"mL", lo:2, hi:9, d:["L","cm\u00B3","gal"]},
    {o:"the water in a community swimming pool", u:"m\u00B3", lo:400, hi:900, d:["mL","in\u00B3","cm\u00B3"]},
    {o:"the water a bathtub holds", u:"L", lo:120, hi:220, d:["mL","m\u00B3","yd\u00B3"]},
    {o:"one ice cube from a tray", u:"cm\u00B3", lo:15, hi:40, d:["L","ft\u00B3","m\u00B3"]},
    {o:"the gravel in a tandem dump truck box", u:"yd\u00B3", lo:8, hi:14, d:["in\u00B3","mL","cm\u00B3"]},
    {o:"the soil a large storage tote can hold", u:"ft\u00B3", lo:2, hi:5, d:["yd\u00B3","mL","gal"]},
    {o:"the fuel in a pickup truck tank", u:"gal", lo:16, hi:28, d:["mL","in\u00B3","cm\u00B3"]},
    {o:"the air space inside a moving box", u:"ft\u00B3", lo:3, hi:8, d:["m\u00B3","mL","in\u00B3"]}
  ];
  var s=pick(S), v=ri(s.lo,s.hi);
  var opts=s.d.map(function(x){return {t:x, fb:"That unit is the wrong size for "+s.o+": the recorded value would be awkwardly huge or tiny."};});
  return mcq("A worker records the volume or capacity for "+s.o+" as about "+v+" of a unit. Which unit makes the record sensible?",
    {t:s.u, fb:"Yes: about "+v+" "+s.u+" is a sensible size for "+s.o+"."}, opts,
    "Match the object to a referent of the right size. About "+v+" "+s.u+" fits "+s.o+". The answer is <b>"+s.u+"</b>.",
    {obj:s.o, unit:s.u, v:v});
}, ["Think of a referent object for each unit and compare sizes.", "Reject units that would make the number enormous or a tiny decimal for this object."]);

E("u3-si-cubed", 3, ["3.10"], 1, "gen", function(){
  var modes=[
    {f:"m\u00B3", t:"L", fac:1000, ftxt:"1,000", lin:10, gen:function(){return ri(2,15);}},
    {f:"L", t:"mL", fac:1000, ftxt:"1,000", lin:10, gen:function(){return ri(2,12);}},
    {f:"cm\u00B3", t:"L", fac:0.001, ftxt:"1/1,000", lin:0.1, gen:function(){return ri(15,90)*100;}},
    {f:"L", t:"cm\u00B3", fac:1000, ftxt:"1,000", lin:10, gen:function(){return ri(2,9);}},
    {f:"m\u00B3", t:"cm\u00B3", fac:1000000, ftxt:"1,000,000", lin:100, gen:function(){return ri(2,8);}},
    {f:"cm\u00B3", t:"m\u00B3", fac:0.000001, ftxt:"1/1,000,000", lin:0.01, gen:function(){return ri(2,9)*500000;}}
  ];
  var m=pick(modes), v=m.gen(), ans=v*m.fac;
  var cands=[ans, v, v*m.lin, ans*10];
  if(!u3vUniq(cands)){ cands=[ans, v, ans/10, ans*100]; }
  var dvals=cands.slice(1);
  var fbs=["That keeps the original number, so no conversion was done.","That uses the wrong power of ten for a cubed SI conversion.","That is off by a further factor of ten."];
  var opts=dvals.map(function(x,i){return {t:fmt(x)+"", fb:fbs[i%fbs.length]};});
  var _bo0=balOpts({t:fmt(ans)+"", fb:"Yes: multiplying or dividing by the cubed conversion factor gives "+fmt(ans)+" "+m.t+"."}, opts); return mcq("Convert \\("+fmt(v)+"\\ \\text{"+m.f+"}\\) to "+m.t+".", _bo0[0], _bo0[1],
    "SI cubed units convert by factors of \\(1{,}000\\) or \\(1{,}000{,}000\\): \\(1\\ \\text{m}^3 = 1{,}000\\ \\text{L}\\), \\(1\\ \\text{L} = 1{,}000\\ \\text{cm}^3 = 1{,}000\\ \\text{mL}\\). \\["+fmt(v)+" \\times "+m.ftxt+" = "+fmt(ans)+"\\] The answer is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {from:m.f, to:m.t, v:v});
}, ["Cubed SI units step by 1,000, not by 10.", "Decide whether the new unit is bigger or smaller, then multiply or divide by 1,000 (or 1,000,000 for two steps)."]);

E("u3-imperial-cubed", 3, ["3.11"], 1, "gen", function(){
  var modes=[
    {f:"ft\u00B3", t:"in\u00B3", fac:1728, ftxt:"1,728", lin:12, gen:function(){return ri(2,12);}},
    {f:"in\u00B3", t:"ft\u00B3", fac:1/1728, ftxt:"1/1,728", lin:1/12, gen:function(){return ri(2,12)*1728;}},
    {f:"yd\u00B3", t:"ft\u00B3", fac:27, ftxt:"27", lin:3, gen:function(){return ri(2,20);}},
    {f:"ft\u00B3", t:"yd\u00B3", fac:1/27, ftxt:"1/27", lin:1/3, gen:function(){return ri(2,15)*27;}},
    {f:"yd\u00B3", t:"in\u00B3", fac:46656, ftxt:"46,656", lin:36, gen:function(){return ri(1,6);}},
    {f:"in\u00B3", t:"yd\u00B3", fac:1/46656, ftxt:"1/46,656", lin:1/36, gen:function(){return ri(1,6)*46656;}}
  ];
  var m=pick(modes), v=m.gen(), ans=Math.round(v*m.fac*100)/100;
  var cands=[ans, v, Math.round(v*m.lin*100)/100, Math.round(ans*10*100)/100];
  var dvals=cands.slice(1);
  var fbs=["That keeps the original number, so no conversion was done.","That uses the linear factor (12 or 3) instead of cubing it.","That is off by a further factor of ten."];
  var opts=dvals.map(function(x,i){return {t:fmt(x)+" "+m.t, fb:fbs[i]};});
  return mcq("Convert \\("+fmt(v)+"\\ \\text{"+m.f+"}\\) to "+m.t+".",
    {t:fmt(ans)+" "+m.t, fb:"Yes: the cubed factor gives "+fmt(ans)+" "+m.t+"."}, opts,
    "Cube the linear factor: \\(12^3 = 1{,}728\\) and \\(3^3 = 27\\). \\["+fmt(v)+" \\times "+m.ftxt+" = "+fmt(ans)+"\\] The answer is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {from:m.f, to:m.t, v:v});
}, ["Cube the linear conversion: 12 in. per foot becomes 1,728, and 3 ft per yard becomes 27.", "Decide whether you are moving to a smaller unit (multiply) or a larger unit (divide)."]);

E("u3-prism-volume", 3, ["3.12","2.1"], 1, "gen", function(){
  var ctx=pick(["A storage crate","A toolbox","A planter box","A shipping carton","A fish tank (outside measures)"]);
  var l,w,h,ans,ds,tries=0;
  do { l=ri(3,14); w=ri(3,12); h=ri(3,10); ans=l*w*h;
    ds=[l+w+h, 2*(l*w+l*h+w*h), l*w]; tries++;
  } while(!u3vUniq([ans].concat(ds)) && tries<40);
  if(!u3vUniq([ans].concat(ds))){ l=4; w=5; h=6; ans=120; ds=[15,148,20]; }
  var unit=pick(["cm","in.","m"]);
  var q=mcq(ctx+" is "+l+" "+unit+" long, "+w+" "+unit+" wide and "+h+" "+unit+" high. What is its volume?",
    {t:fmt(ans)+" "+unit+"\u00B3", fb:"Yes: length times width times height."},
    [{t:fmt(ds[0])+" "+unit+"\u00B3", fb:"That adds the dimensions; volume multiplies all three."},
     {t:fmt(ds[1])+" "+unit+"\u00B3", fb:"That is the surface area formula, which covers the outside instead of filling the space."},
     {t:fmt(ds[2])+" "+unit+"\u00B3", fb:"That is only the base area; the height still has to be multiplied in."}],
    "For a rectangular prism, \\(V = lwh\\). \\[ \\begin{aligned} V &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+fmt(ans)+"\\ \\text{"+unit+"}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" "+unit+"\u00B3</b>.",
    {l:l,w:w,h:h});
  q.figure=u3vBoxFig(l,w,h,unit);
  return q;
}, ["Use the prism formula from the formula sheet, with all three dimensions.", "Multiply the length by the width first to get the base area, then multiply by the height."]);

/* ---------- Level 2, multiple choice ---------- */
E("u3-estimate-referent", 3, ["3.9","3.7"], 2, "var", varset([
  function(){ return mcq("A 1 L bottle is your referent. A bathtub filled to its regular line takes about 150 bottlefuls of water. What is the best estimate of the bathtub capacity?",
    {t:"About 150 L", fb:"Yes: 150 bottlefuls at 1 L each is about 150 L."},
    [{t:"About 15 L", fb:"That is only 15 bottlefuls, far less than the count given."},
     {t:"About 1,500 L", fb:"That would take about 1,500 bottlefuls, ten times the count given."},
     {t:"About 1.5 L", fb:"That is about one and a half bottles, not 150."}],
    "Multiply the count by the referent size: \\(150 \\times 1\\ \\text{L} = 150\\ \\text{L}\\). The answer is <b>about 150 L</b>.", {}); },
  function(){ return mcq("A cardboard box with a volume of \\(1\\ \\text{m}^3\\) is your referent. A classroom would hold about 60 of these boxes stacked with no gaps. What is the best estimate of the classroom volume?",
    {t:"About 60 m\u00B3", fb:"Yes: 60 referent boxes at 1 cubic metre each."},
    [{t:"About 6 m\u00B3", fb:"That is only 6 boxes, far under the count of 60."},
     {t:"About 600 m\u00B3", fb:"That would need about 600 boxes, ten times the count."},
     {t:"About 0.6 m\u00B3", fb:"That is less than a single referent box."}],
    "Multiply the count by the referent size: \\(60 \\times 1\\ \\text{m}^3 = 60\\ \\text{m}^3\\). The answer is <b>about 60 m\u00B3</b>.", {}); },
  function(){ return mcq("A measuring spoon holds 5 mL. A bottle of cough syrup holds about 24 level spoonfuls. What is the best estimate of the syrup bottle capacity?",
    {t:"About 120 mL", fb:"Yes: 24 spoonfuls at 5 mL each is 120 mL."},
    [{t:"About 24 mL", fb:"That uses the count alone and forgets each spoon holds 5 mL."},
     {t:"About 1,200 mL", fb:"That would need 240 spoonfuls, ten times the count."},
     {t:"About 12 mL", fb:"That is only about two and a half spoonfuls."}],
    "\\(24 \\times 5\\ \\text{mL} = 120\\ \\text{mL}\\). The answer is <b>about 120 mL</b>.", {}); },
  function(){ return mcq("A milk crate with a volume of about \\(1\\ \\text{ft}^3\\) is your referent. The cargo space of a hatchback holds about 25 crates with no gaps. What is the best estimate of the cargo volume?",
    {t:"About 25 ft\u00B3", fb:"Yes: 25 crates at about 1 cubic foot each."},
    [{t:"About 2.5 ft\u00B3", fb:"That is only about two or three crates."},
     {t:"About 250 ft\u00B3", fb:"That would need about 250 crates, ten times the count."},
     {t:"About 12 ft\u00B3", fb:"That uses only the crate edge idea and ignores the count of 25."}],
    "Multiply the count by the referent size: \\(25 \\times 1\\ \\text{ft}^3 = 25\\ \\text{ft}^3\\). The answer is <b>about 25 ft\u00B3</b>.", {}); },
  function(){ return mcq("A 10 L bucket is your referent. Filling a rain barrel takes about 18 level bucketfuls. What is the best estimate of the rain barrel capacity?",
    {t:"About 180 L", fb:"Yes: 18 bucketfuls at 10 L each is 180 L."},
    [{t:"About 18 L", fb:"That is the count alone, without the 10 L size of each bucketful."},
     {t:"About 1,800 L", fb:"That would take 180 bucketfuls, ten times the count."},
     {t:"About 90 L", fb:"That is only 9 bucketfuls, half the count given."}],
    "\\(18 \\times 10\\ \\text{L} = 180\\ \\text{L}\\). The answer is <b>about 180 L</b>.", {}); },
  function(){ return mcq("A sugar cube has a volume of about \\(1\\ \\text{cm}^3\\). A small jewellery box holds about 90 sugar cubes packed with no gaps. What is the best estimate of the inside volume of the box?",
    {t:"About 90 cm\u00B3", fb:"Yes: 90 cubes at about 1 cubic centimetre each."},
    [{t:"About 9 cm\u00B3", fb:"That is only about 9 cubes, a tenth of the count."},
     {t:"About 900 cm\u00B3", fb:"That would need about 900 cubes, ten times the count."},
     {t:"About 30 cm\u00B3", fb:"That would be about 30 cubes, not 90."}],
    "Multiply the count by the referent size: \\(90 \\times 1\\ \\text{cm}^3 = 90\\ \\text{cm}^3\\). The answer is <b>about 90 cm\u00B3</b>.", {}); }
]), ["Multiply the number of referent units by the size of one referent.", "First state the size of one referent, then scale it by the count."]);

E("u3-cylinder-volume", 3, ["3.12","2.1"], 2, "gen", function(){
  var ctx=pick(["A soup can","A water pipe section","A cylindrical storage drum","A rolled poster tube","A paint can"]);
  var r,h,ans,ds,tries=0;
  do { r=ri(3,10); h=ri(6,20); ans=Math.PI*r*r*h;
    ds=[Math.PI*r*h, 2*Math.PI*r*h, Math.PI*r*r*h/3]; tries++;
  } while(!u3vUniq([ans].concat(ds).map(function(x){return fmt(x);})) && tries<40);
  var unit=pick(["cm","in."]);
  var q=mcq(ctx+" has radius "+r+" "+unit+" and height "+h+" "+unit+". What is its volume, to the nearest whole unit?",
    {t:fmt(Math.round(ans))+" "+unit+"\u00B3", fb:"Yes: \\(\\pi r^2 h\\) with the radius squared."},
    [{t:fmt(Math.round(ds[0]))+" "+unit+"\u00B3", fb:"That uses \\(\\pi r h\\): the radius was not squared."},
     {t:fmt(Math.round(ds[1]))+" "+unit+"\u00B3", fb:"That is a lateral surface style calculation, not the filled volume."},
     {t:fmt(Math.round(ds[2]))+" "+unit+"\u00B3", fb:"That divides by 3, which is the cone formula; a cylinder keeps the full base times height."}],
    "For a cylinder, \\(V = \\pi r^2 h\\). \\[ \\begin{aligned} V &= \\pi ("+r+")^2 ("+h+") \\\\ &\\approx "+fmt(ans)+"\\ \\text{"+unit+"}^3 \\end{aligned} \\] The answer is <b>about "+fmt(Math.round(ans))+" "+unit+"\u00B3</b>.",
    {r:r,h:h});
  q.figure=u3vCylFig(r,h,unit);
  return q;
}, ["Use the cylinder formula from the formula sheet.", "Square the radius first, then multiply by pi and by the height."]);

E("u3-cone-pyramid-volume", 3, ["3.12","3.15"], 2, "gen", function(){
  var mode=pick(["cone","pyramid"]);
  if(mode==="cone"){
    var r=ri(3,9), h=ri(6,18), ans=Math.PI*r*r*h/3;
    var ds=[Math.PI*r*r*h, Math.PI*r*r*h/2, Math.PI*r*h/3];
    var q=mcq("A cone shaped funnel has radius "+r+" cm and height "+h+" cm. What is its volume, to the nearest whole unit?",
      {t:fmt(Math.round(ans))+" cm\u00B3", fb:"Yes: a cone is one third of the matching cylinder."},
      [{t:fmt(Math.round(ds[0]))+" cm\u00B3", fb:"That is the full cylinder volume; the cone takes one third of it."},
       {t:fmt(Math.round(ds[1]))+" cm\u00B3", fb:"That takes one half; a cone takes one third, not one half."},
       {t:fmt(Math.round(ds[2]))+" cm\u00B3", fb:"That forgets to square the radius before dividing by 3."}],
      "For a cone, \\(V = \\frac{\\pi r^2 h}{3}\\). \\[ \\begin{aligned} V &= \\frac{\\pi ("+r+")^2 ("+h+")}{3} \\\\ &\\approx "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(Math.round(ans))+" cm\u00B3</b>.",
      {mode:mode,r:r,h:h});
    q.figure=u3vConeFig(r,h,"cm");
    return q;
  }
  var l=ri(4,10), w=ri(4,10), h=ri(6,15), ans2=l*w*h/3;
  var ds2=[l*w*h, l*w*h/2, l*w];
  var q2=mcq("A square based pyramid display has a base "+l+" cm by "+w+" cm and height "+h+" cm. What is its volume?",
    {t:fmt(ans2)+" cm\u00B3", fb:"Yes: a pyramid is one third of the matching prism."},
    [{t:fmt(ds2[0])+" cm\u00B3", fb:"That is the full prism volume; the pyramid takes one third of it."},
     {t:fmt(ds2[1])+" cm\u00B3", fb:"That takes one half; a pyramid takes one third, not one half."},
     {t:fmt(ds2[2])+" cm\u00B3", fb:"That is only the base area; the height and the one third are both missing."}],
    "For a square pyramid, \\(V = \\frac{lwh}{3}\\). \\[ \\begin{aligned} V &= \\frac{"+l+" \\times "+w+" \\times "+h+"}{3} \\\\ &= "+fmt(ans2)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" cm\u00B3</b>.",
    {mode:mode,l:l,w:w,h:h});
  q2.figure=u3vPyrFig(l,w,h,"cm");
  return q2;
}, ["Cones and pyramids each take one third of the matching cylinder or prism.", "Find the full cylinder or prism volume first, then divide by 3."]);

E("u3-sphere-volume", 3, ["3.12"], 2, "gen", function(){
  var ctx=pick(["A bocce ball","A spherical water feature ball","An exercise ball (treat as a solid for the space it takes up)","A spherical ornament","A bowling ball","A globe","A spherical paperweight","A round fishbowl (treat as a full sphere)"]);
  var r=ri(5,16), ans=4*Math.PI*r*r*r/3;
  var ds=[4*Math.PI*r*r, Math.PI*r*r*r, 4*Math.PI*r*r/3];
  var q=mcq(ctx+" has radius "+r+" cm. What is the volume of space it takes up, to the nearest whole unit?",
    {t:fmt(Math.round(ans))+" cm\u00B3", fb:"Yes: \\(\\frac{4\\pi r^3}{3}\\) with the radius cubed."},
    [{t:fmt(Math.round(ds[0]))+" cm\u00B3", fb:"That is the sphere surface area formula, \\(4\\pi r^2\\), which covers the outside."},
     {t:fmt(Math.round(ds[1]))+" cm\u00B3", fb:"That cubes the radius but drops the factor of four thirds."},
     {t:fmt(Math.round(ds[2]))+" cm\u00B3", fb:"That uses the radius squared in the volume formula; volume needs the radius cubed."}],
    "For a sphere, \\(V = \\frac{4\\pi r^3}{3}\\). \\[ \\begin{aligned} V &= \\frac{4\\pi ("+r+")^3}{3} \\\\ &\\approx "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(Math.round(ans))+" cm\u00B3</b>.",
    {r:r});
  q.figure=u3vSphereFig(r,"cm");
  return q;
}, ["Use the sphere formula from the formula sheet, with the radius cubed.", "Cube the radius first, then multiply by 4 pi and divide by 3."]);

E("u3-capacity-tools", 3, ["3.13","3.6"], 2, "gen", function(){
  var mode=pick(["displace","fill","spoons"]);
  if(mode==="displace"){
    var start=ri(100,200), vol=ri(25,90), fin=start+vol;
    var _bo0=balOpts({t:vol+"", fb:"Yes: the rise in level equals the volume of the stone, and 1 mL is 1 cubic centimetre."}, [{t:fin+"", fb:"That is the final level, not the rise caused by the stone."},
       {t:start+"", fb:"That is the starting level of the water alone."},
       {t:(fin+start)+"", fb:"Adding the two levels double counts the water; subtract to find the rise."}]); return mcq("A graduated cylinder holds "+start+" mL of water. A stone is lowered in and the level rises to "+fin+" mL. The stone is a solid, so the rise measures the space it takes up. What is the volume of the stone, in cubic centimetres?", _bo0[0], _bo0[1],
      "Displacement: subtract the starting level from the final level. \\[ \\begin{aligned} V &= "+fin+" - "+start+" \\\\ &= "+vol+"\\ \\text{mL} = "+vol+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+vol+" cm\u00B3</b>.",
      {mode:mode,start:start,fin:fin});
  }
  if(mode==="fill"){
    var cap=pick([400,500,600,800,1000]), frac=pick([[1,2,"one half"],[1,4,"one quarter"],[3,4,"three quarters"]]);
    var amt=cap*frac[0]/frac[1];
    var _bo1=balOpts({t:amt+"", fb:"Yes: the stated fraction of the full capacity."}, [{t:cap+"", fb:"That is the full capacity; the jug is only partly filled."},
       {t:(cap+amt)+"", fb:"That adds the full capacity to the filled amount, which double counts the jug."},
       {t:(amt/2)+"", fb:"That halves the filled amount a second time; apply the fraction once."}]); return mcq("A measuring jug has a capacity of "+cap+" mL. It is filled to the "+frac[2]+" mark. How much liquid is in the jug, in millilitres?", _bo1[0], _bo1[1],
      "Capacity is what the jug can hold in total; multiply by the filled fraction. \\[ \\begin{aligned} \\text{Amount} &= "+cap+" \\times \\frac{"+frac[0]+"}{"+frac[1]+"} \\\\ &= "+amt+"\\ \\text{mL} \\end{aligned} \\] The answer is <b>"+amt+" mL</b>.",
      {mode:mode,cap:cap,amt:amt});
  }
  var spoon=pick([5,15]), n=ri(4,12), tot=spoon*n;
  var _bo2=balOpts({t:tot+"", fb:"Yes: spoonfuls times the size of one spoon."}, [{t:(tot-spoon)+"", fb:"That is one spoonful short of the full bottle."},
     {t:spoon+"", fb:"That is one spoonful only, not the whole bottle."},
     {t:(tot*10)+"", fb:"That is ten times too large; multiply the count by the spoon size once."}]); return mcq("A cook measures syrup with a "+spoon+" mL measuring spoon. A bottle takes "+n+" level spoonfuls to empty. What is the capacity of the bottle, in millilitres?", _bo2[0], _bo2[1],
    "Multiply the number of spoonfuls by the capacity of one spoon. \\[ \\begin{aligned} \\text{Capacity} &= "+n+" \\times "+spoon+" \\\\ &= "+tot+"\\ \\text{mL} \\end{aligned} \\] The answer is <b>"+tot+" mL</b>.",
    {mode:mode,spoon:spoon,n:n});
}, ["Capacity work uses a measuring tool: a level, a fill fraction, or a count of spoonfuls.", "For displacement subtract the two levels; for a fill fraction multiply it by the full capacity."]);

E("u3-dimension-change", 3, ["3.14"], 2, "gen", function(){
  var S=[
    {d:"only the length is doubled", f:2, w:[3,4,8]},
    {d:"only the height is tripled", f:3, w:[2,6,9]},
    {d:"every dimension is doubled", f:8, w:[2,4,6]},
    {d:"only the radius is doubled (height unchanged)", f:4, w:[2,8,16]},
    {d:"only the height is halved", f:0.5, w:[2,0.25,1]},
    {d:"every dimension is tripled", f:27, w:[3,9,81]}
  ];
  var s=pick(S), V=ri(30,300), ans=V*s.f;
  var ds=s.w.map(function(x){return V*x;});
  return mcq("A solid has a volume of "+V+" cm\u00B3. It is rebuilt so that "+s.d+". What is the new volume?",
    {t:fmt(ans)+" cm\u00B3", fb:"Yes: the volume scales by the factor for the change described."},
    ds.map(function(x,i){return {t:fmt(x)+" cm\u00B3", fb:"That scaling factor does not match the change: count how many dimensions changed and whether a radius was squared."};}),
    "Volume scales by the product of the dimension factors. Here the factor is \\("+fmt(s.f)+"\\). \\[ \\begin{aligned} V_{new} &= "+V+" \\times "+fmt(s.f)+" \\\\ &= "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" cm\u00B3</b>.",
    {change:s.d, V:V});
}, ["Each changed dimension contributes its own factor, and a radius change counts twice because it is squared.", "Decide the factor for one changed dimension, then multiply the factors together."]);

E("u3-one-third", 3, ["3.15"], 2, "gen", function(){
  var mode=pick(["coneFromCyl","pyrFromPrism","cylFromCone","prismFromPyr"]);
  var base=ri(15,120);
  var data={
    coneFromCyl:{given:"A cylinder has a volume of "+(base*3)+" cm\u00B3. A cone has the same base and the same height.", ask:"the volume of the cone", ans:base, unit:"cm\u00B3"},
    pyrFromPrism:{given:"A prism has a volume of "+(base*3)+" cm\u00B3. A pyramid has the same base and the same height.", ask:"the volume of the pyramid", ans:base, unit:"cm\u00B3"},
    cylFromCone:{given:"A cone has a volume of "+base+" cm\u00B3. A cylinder has the same base and the same height.", ask:"the volume of the cylinder", ans:base*3, unit:"cm\u00B3"},
    prismFromPyr:{given:"A pyramid has a volume of "+base+" cm\u00B3. A prism has the same base and the same height.", ask:"the volume of the prism", ans:base*3, unit:"cm\u00B3"}
  };
  var d=data[mode], ans=d.ans;
  var ds=(mode==="coneFromCyl"||mode==="pyrFromPrism") ? [base*3, base*2, Math.round(base/2)] : [base, base*2, base*6];
  return mcq(d.given+" What is "+d.ask+"?",
    {t:fmt(ans)+" "+d.unit, fb:"Yes: the pointed solid is one third of the straight sided partner with the same base and height."},
    ds.map(function(x){return {t:fmt(x)+" "+d.unit, fb:"That ratio is not one third (or three times): a cone or pyramid holds exactly one third of its partner."};}),
    "With the same base and height, a cone holds one third of a cylinder, and a pyramid holds one third of a prism. The required volume is <b>"+fmt(ans)+" "+d.unit+"</b>.",
    {mode:mode, base:base});
}, ["Same base and same height means the one third relationship applies.", "If the partner volume is given, divide by 3 for the cone or pyramid and multiply by 3 going the other way."]);

E("u3-composite-volume", 3, ["3.16","3.12"], 2, "gen", function(){
  var depth,l1,h1,l2,h2,low,up,ans,ds,ctries=0;
  do { depth=ri(4,8); l1=ri(8,14); h1=ri(3,6); l2=ri(4,7); h2=ri(2,5);
    low=l1*depth*h1; up=l2*depth*h2; ans=low+up; ds=[low, up, (l1+l2)*depth*(h1+h2)]; ctries++;
  } while(!u3vUniq([ans].concat(ds)) && ctries<40);
  if(!u3vUniq([ans].concat(ds))){ depth=5; l1=10; h1=4; l2=6; h2=3; low=200; up=90; ans=290; ds=[200,90,560]; }
  var q=mcq("A step shaped display stand is "+depth+" cm deep. Its lower block is "+l1+" cm long and "+h1+" cm high. Its upper block is "+l2+" cm long and "+h2+" cm high. What is the total volume?",
    {t:fmt(ans)+" cm\u00B3", fb:"Yes: add the volumes of the two blocks."},
    [{t:fmt(ds[0])+" cm\u00B3", fb:"That is only the lower block; the upper block still has to be added."},
     {t:fmt(ds[1])+" cm\u00B3", fb:"That is only the upper block; the lower block is much bigger and is missing."},
     {t:fmt(ds[2])+" cm\u00B3", fb:"That treats the stand as one tall block and counts space that is not there."}],
    "Split the composite into two prisms and add. \\[ \\begin{aligned} V &= ("+l1+" \\times "+depth+" \\times "+h1+") + ("+l2+" \\times "+depth+" \\times "+h2+") \\\\ &= "+fmt(low)+" + "+fmt(up)+" \\\\ &= "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" cm\u00B3</b>.",
    {depth:depth,l1:l1,h1:h1,l2:l2,h2:h2});
  q.figure=u3vCompFig(l1,l2,h1,h2,"cm");
  return q;
}, ["Split a composite solid into simple prisms, then add the parts.", "Find the volume of the lower block first."]);

E("u3-trade-formula", 3, ["2.3"], 2, "var", varset([
  function(){ return mcq("A concrete worker orders concrete for a slab. The slab volume is found with \\(V = lwh\\). How is the formula used in this trade?",
    {t:"It gives the volume to order, so the worker orders that many cubic units of concrete", fb:"Yes: concrete is sold by volume, so the formula sets the order amount."},
    [{t:"It gives the area of the top of the slab, for painting the top of it", fb:"Top area would use length times width only, with no height."},
     {t:"It gives the distance around the slab for edging, measured in metres", fb:"Distance around is perimeter, not a volume formula."},
     {t:"It gives the mass of the slab in kilograms, worked out directly from its size and shape", fb:"The formula gives volume; mass would also need the density of concrete."}],
    "Concrete is ordered by volume, and \\(V = lwh\\) gives the slab volume. The answer is <b>it gives the volume to order</b>.", {}); },
  function(){ return mcq("An aquarium shop worker uses \\(V = lwh\\) and then converts cubic centimetres to litres. Why?",
    {t:"Filters and heaters are rated by the water capacity of the tank, in litres", fb:"Yes: equipment is matched to how much water the tank holds."},
    [{t:"The colour of the fish depends on the tank volume in the pet shop today", fb:"Fish colour is not set by a volume calculation."},
     {t:"The glass thickness is read from the volume of water the tank can hold in total", fb:"Glass thickness is a separate specification; the conversion here is for water capacity."},
     {t:"Litres measure the length of the tank, end to end, in the shop", fb:"Litres measure capacity, not length."}],
    "Tank equipment is rated in litres, so the worker converts the inside volume to a capacity in litres. The answer is <b>filters and heaters are rated by the water capacity of the tank, in litres</b>.", {}); },
  function(){ return mcq("A pool installer uses \\(V = \\pi r^2 h\\) for a round above ground pool. What does the result tell the installer?",
    {t:"How much water is needed to fill the pool, so the fill time and chemical amounts can be planned", fb:"Yes: the cylinder volume is the water capacity of the pool."},
    [{t:"How much liner fabric is needed to cover the walls only, not the floor, so the fabric order can be placed", fb:"Liner fabric is a surface area question, not the cylinder volume."},
     {t:"How long the pool deck should be, so the boards can be ordered for building it", fb:"Deck length is a length decision, not a volume result."},
     {t:"How deep the pool ladder is, so a replacement can be ordered to match it", fb:"The ladder depth is a given length; the formula gives the full pool volume."}],
    "A round pool is a cylinder, so \\(V = \\pi r^2 h\\) gives the water it holds. The answer is <b>how much water is needed to fill the pool</b>.", {}); },
  function(){ return mcq("A grain farmer estimates the space in a cylindrical bin with \\(V = \\pi r^2 h\\). How is the result used?",
    {t:"It tells how much grain the bin can store before it is full", fb:"Yes: storage planning uses the bin volume."},
    [{t:"It tells the outside area to paint on the bin outside", fb:"Painting is a surface area question."},
     {t:"It tells the ground distance around the bin at ground level outside", fb:"Distance around is circumference, not volume."},
     {t:"It tells the height of the bin directly, in metres", fb:"The height is an input to the formula, not its result."}],
    "The bin is a cylinder, and its volume is its storage space. The answer is <b>it tells how much grain the bin can store</b>.", {}); },
  function(){ return mcq("A baker fills cone shaped moulds and uses \\(V = \\frac{\\pi r^2 h}{3}\\). Why does the division by 3 matter in this job?",
    {t:"Each mould holds only one third of a cylinder of batter, so the batch is portioned correctly", fb:"Yes: a cone holds one third of the matching cylinder."},
    [{t:"The batter triples when it bakes, so a small batch fills every mould in the bakery kitchen today", fb:"The factor of 3 is in the cone formula itself, not a baking change."},
     {t:"Three moulds share one oven shelf, so the whole batch is baked all at once in one go", fb:"Shelf layout does not explain the formula factor."},
     {t:"The mould is three times as tall as the cylinder it is portioned from in the bakery", fb:"The height used is the mould height; the one third is the cone shape factor."}],
    "A cone holds one third of the matching cylinder, so the formula portions the batter. The answer is <b>each mould holds only one third of a cylinder of batter</b>.", {}); },
  function(){ return mcq("A plumber checks a cylindrical hot water tank with \\(V = \\pi r^2 h\\) and converts the answer to litres. What job decision uses the result?",
    {t:"Choosing a replacement tank with enough capacity for the household", fb:"Yes: tanks are chosen by their capacity in litres."},
    [{t:"Choosing the colour of the tank jacket for the new house", fb:"Colour is not decided by a capacity calculation."},
     {t:"Measuring the pipe length to the bathroom, through the walls of the house", fb:"Pipe length is a length measurement, not the tank volume."},
     {t:"Setting the water pressure in the house, at the tap", fb:"Pressure is a separate setting; the formula gives capacity."}],
    "The tank volume converts to a capacity in litres, which drives the replacement choice. The answer is <b>choosing a replacement tank with enough capacity for the household</b>.", {}); }
]), ["Ask what decision the volume result drives in that job.", "Trades use volume to order, fill, store or size something; area and length answers serve different jobs."]);

E("u3-error-analysis", 3, ["2.5"], 2, "gen", function(){
  var mode=pick(["coneNoThird","cylDiameter","sphereSquare","pyrNoThird"]);
  if(mode==="coneNoThird"){
    var r=ri(3,8), h=ri(6,15), wrong=Math.PI*r*r*h, right=wrong/3;
    return mcq("A student finds the volume of a cone with radius "+r+" cm and height "+h+" cm and gets "+fmt(Math.round(wrong))+" cm\u00B3. Which statement identifies and corrects the error?",
      {t:"The student used the cylinder formula; divide by 3 to get about "+fmt(Math.round(right))+" cm\u00B3", fb:"Yes: the cone formula has the factor of one third."},
      [{t:"The student should simply have doubled the answer to get about "+fmt(Math.round(wrong*2))+" cm\u00B3", fb:"Doubling moves the wrong way; a cone is smaller than the matching cylinder."},
       {t:"There is no error; "+fmt(Math.round(wrong))+" cm\u00B3 is correct, exactly as the student worked it out", fb:"That value is the cylinder volume for the same base and height, so the one third is missing."},
       {t:"The student should have used the surface area formula in its place", fb:"The question asks for volume; the fix is the one third in the cone volume formula."}],
      "A cone is one third of the matching cylinder. \\[ \\begin{aligned} V &= \\frac{\\pi ("+r+")^2 ("+h+")}{3} \\\\ &\\approx "+fmt(right)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>the student used the cylinder formula; divide by 3</b>.",
      {mode:mode,r:r,h:h});
  }
  if(mode==="cylDiameter"){
    var d=pick([8,10,12,14,16,20]), h=ri(6,16), r=d/2, wrong=Math.PI*d*d*h, right=Math.PI*r*r*h;
    return mcq("A student finds the volume of a cylinder with diameter "+d+" cm and height "+h+" cm and gets "+fmt(Math.round(wrong))+" cm\u00B3. Which statement identifies and corrects the error?",
      {t:"The student used the diameter as the radius; use radius "+r+" cm to get about "+fmt(Math.round(right))+" cm\u00B3", fb:"Yes: the formula needs the radius, half the diameter."},
      [{t:"The student should have divided the answer by 2, not by 4, to get about "+fmt(Math.round(wrong/2))+" cm\u00B3", fb:"Halving is not enough: squaring the doubled radius made the answer four times too big."},
       {t:"There is no error; "+fmt(Math.round(wrong))+" cm\u00B3 is correct, exactly as the student worked it out", fb:"The diameter was squared in place of the radius, so the value is too large."},
       {t:"The student should have added the height and diameter first, before multiplying", fb:"Adding lengths is not part of the cylinder volume formula."}],
      "The radius is half the diameter: \\(r = "+r+"\\ \\text{cm}\\). \\[ \\begin{aligned} V &= \\pi ("+r+")^2 ("+h+") \\\\ &\\approx "+fmt(right)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>the student used the diameter as the radius</b>.",
      {mode:mode,d:d,h:h});
  }
  if(mode==="sphereSquare"){
    var r2=ri(3,9), wrong=4*Math.PI*r2*r2/3, right=4*Math.PI*r2*r2*r2/3;
    return mcq("A student finds the volume of a sphere with radius "+r2+" cm and gets "+fmt(Math.round(wrong))+" cm\u00B3. Which statement identifies and corrects the error?",
      {t:"The student squared the radius instead of cubing it; the volume is about "+fmt(Math.round(right))+" cm\u00B3", fb:"Yes: sphere volume uses the radius cubed."},
      [{t:"The student should have multiplied the whole answer by 3 to get about "+fmt(Math.round(wrong*3))+" cm\u00B3", fb:"The missing step is cubing the radius, not a further multiplication of the wrong value."},
       {t:"There is no error; "+fmt(Math.round(wrong))+" cm\u00B3 is correct, exactly as the student worked it out", fb:"That value comes from the radius squared, so it understates the volume."},
       {t:"The student should have used the circumference formula instead of the volume formula", fb:"Circumference is a length; the question asks for volume."}],
      "Sphere volume cubes the radius. \\[ \\begin{aligned} V &= \\frac{4\\pi ("+r2+")^3}{3} \\\\ &\\approx "+fmt(right)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>the student squared the radius instead of cubing it</b>.",
      {mode:mode,r:r2});
  }
  var l=ri(4,9), w=ri(4,9), h2=ri(6,14), wrong2=l*w*h2, right2=wrong2/3;
  return mcq("A student finds the volume of a square based pyramid with base "+l+" cm by "+w+" cm and height "+h2+" cm and gets "+fmt(wrong2)+" cm\u00B3. Which statement identifies and corrects the error?",
    {t:"The student used the prism formula; divide by 3 to get "+fmt(right2)+" cm\u00B3", fb:"Yes: a pyramid is one third of the matching prism."},
    [{t:"The student should have taken one half of it to get "+fmt(wrong2/2)+" cm\u00B3", fb:"A pyramid takes one third of the prism, not one half."},
     {t:"There is no error; "+fmt(wrong2)+" cm\u00B3 is correct, exactly as the student worked it out", fb:"That is the full prism volume for the same base and height."},
     {t:"The student should have found the base perimeter first, not the volume", fb:"Perimeter is not part of the pyramid volume formula."}],
    "A pyramid is one third of the matching prism. \\[ \\begin{aligned} V &= \\frac{"+l+" \\times "+w+" \\times "+h2+"}{3} \\\\ &= "+fmt(right2)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>the student used the prism formula; divide by 3</b>.",
    {mode:mode,l:l,w:w,h:h2});
}, ["Compare the student value with the matching straight sided solid.", "Check for the classic errors: a missing one third, the diameter used as the radius, or a radius squared instead of cubed."]);

E("u3-equivalent-forms", 3, ["2.6"], 2, "var", varset([
  function(){ return mcq("Why are \\(V = lwh\\) and \\(V = (lw)h\\) equivalent forms for a rectangular prism?",
    {t:"Both multiply the same three dimensions; (lw) is the base area, then times the height", fb:"Yes: grouping the first two factors gives base area times height."},
    [{t:"They are equal only when the height is 1, and they disagree at every other height tried", fb:"The grouping holds for every height, not just 1."},
     {t:"(lw)h adds the base area to the height rather than multiplying by it", fb:"The brackets mean multiply, not add."},
     {t:"They give different answers in square units, so only one of them can be right", fb:"Volume is in cubed units, and both forms give the same value."}],
    "Multiplication can be grouped either way: \\((lw)h = lwh\\). The answer is <b>both multiply the same three dimensions</b>.", {}); },
  function(){ return mcq("A cylinder has diameter \\(d\\). Why does \\(V = \\pi \\left(\\frac{d}{2}\\right)^2 h\\) give the same volume as \\(V = \\pi r^2 h\\)?",
    {t:"The radius is half the diameter, so the two formulas use the same radius", fb:"Yes: substituting r = d/2 changes nothing about the value."},
    [{t:"The diameter and radius are the same length, both drawn from the centre point", fb:"The radius is half the diameter, not the same length."},
     {t:"Dividing by 2 cancels the squaring, so the radius is used just as is", fb:"The squaring still applies to the halved value; the forms match because r = d/2."},
     {t:"The formulas match only for height 2, and for no other height value", fb:"They match for every height because the radius terms are identical."}],
    "Since \\(r = \\frac{d}{2}\\), the two radius terms are the same number. The answer is <b>the radius is half the diameter, so the two formulas use the same radius</b>.", {}); },
  function(){ return mcq("Why are \\(V = \\frac{\\pi r^2 h}{3}\\) and \\(V = \\frac{1}{3} \\pi r^2 h\\) equivalent for a cone?",
    {t:"Dividing the whole product by 3 is the same as multiplying it by one third", fb:"Yes: division by 3 and multiplication by one third are the same operation."},
    [{t:"The 3 moves to the height and triples it in the second form instead of dividing", fb:"The 3 divides the product; it does not change the height."},
     {t:"They match only when pi is taken as 3, and not with the true value of pi", fb:"They match for the exact value of pi as well; the one third is the key."},
     {t:"One third of pi is exactly 1, so both give \\(r^2 h\\)", fb:"One third of pi is about 1.05, not 1; the forms are equal as written, not simplified that way."}],
    "Dividing by 3 equals multiplying by \\(\\frac{1}{3}\\). The answer is <b>dividing the whole product by 3 is the same as multiplying it by one third</b>.", {}); },
  function(){ return mcq("For any prism, \\(V = Bh\\) where \\(B\\) is the base area. Why does this agree with \\(V = lwh\\) for a rectangular prism?",
    {t:"The base area B is l times w, so Bh is lwh with the base grouped", fb:"Yes: B = lw for a rectangular base."},
    [{t:"B stands for the perimeter of the base of the solid", fb:"B is the base area, not its perimeter."},
     {t:"The two formulas agree only for cubes, and for no other solid shape", fb:"They agree for every rectangular prism because B = lw always."},
     {t:"h is part of the base area, so it sits inside B", fb:"The height is separate from the base; B covers only length and width."}],
    "With \\(B = lw\\), \\(Bh = (lw)h = lwh\\). The answer is <b>the base area B is l times w, so Bh is lwh with the base grouped</b>.", {}); },
  function(){ return mcq("Why are \\(V = \\frac{4\\pi r^3}{3}\\) and \\(V = \\frac{4}{3} \\pi r^3\\) equivalent for a sphere?",
    {t:"Four pi r cubed divided by 3 is the same as four thirds times pi r cubed", fb:"Yes: the fraction four thirds is the combined factor."},
    [{t:"The 4 and the 3 swap places in the second form of the formula shown", fb:"Nothing swaps; the second form writes 4 divided by 3 as the fraction four thirds."},
     {t:"They match only when the radius is 3, and at no other radius value", fb:"They match for every radius; the algebra does not depend on r."},
     {t:"Four thirds is greater than 4, so the second form gives a larger volume overall", fb:"Four thirds is about 1.33, and it already includes the division by 3."}],
    "\\(\\frac{4\\pi r^3}{3} = \\frac{4}{3} \\pi r^3\\). The answer is <b>four pi r cubed divided by 3 is the same as four thirds times pi r cubed</b>.", {}); },
  function(){ return mcq("A pyramid formula is written as \\(V = \\frac{Bh}{3}\\) and as \\(V = \\frac{lwh}{3}\\). Why are they equivalent for a square based pyramid?",
    {t:"The base area B equals l times w for the rectangular base", fb:"Yes: replacing B with lw gives the second form."},
    [{t:"B equals the height of the pyramid itself", fb:"B is a base area, not a height."},
     {t:"The forms agree only when l equals w equals h", fb:"They agree for any base length and width because B = lw by definition."},
     {t:"The division by 3 applies to the height only in one form of it", fb:"In both forms the whole product is divided by 3; the placement does not change the value."}],
    "For a rectangular base, \\(B = lw\\), so \\(\\frac{Bh}{3} = \\frac{lwh}{3}\\). The answer is <b>the base area B equals l times w</b>.", {}); }
]), ["Look for the same factors in both forms, grouped or written differently.", "Substitute what each letter stands for, such as B for base area or d/2 for radius."]);

E("u3-create-solve", 3, ["2.4","3.16"], 2, "gen", function(){
  var mode=pick(["bottles","boxes","filltime"]);
  if(mode==="bottles"){
    var pair=pick([[20,2],[20,4],[20,5],[40,2],[40,4],[40,5],[50,2],[50,5],[25,5],[60,4],[60,5],[30,2],[30,5]]);
    var capL=pair[0], bottle=pair[1], n=capL/bottle;
    return mcq("For a project, a student creates this problem: a cooler holds "+capL+" L. How many "+bottle+" L bottles fill it exactly? What is the answer to the created problem?",
      {t:fmt(n)+"", fb:"Yes: divide the capacity by the size of one bottle."},
      [{t:fmt(capL*bottle)+"", fb:"That multiplies; the number of bottles is the capacity shared into bottle sized parts."},
       {t:fmt(capL-bottle)+"", fb:"That subtracts; filling is a division relationship."},
       {t:fmt(n*2)+"", fb:"That doubles the quotient; divide once."}],
      "Share the capacity into bottle sized parts. \\[ \\begin{aligned} n &= "+capL+" \\div "+bottle+" \\\\ &= "+fmt(n)+" \\end{aligned} \\] The answer is <b>"+fmt(n)+" bottles</b>.",
      {mode:mode,capL:capL,bottle:bottle});
  }
  if(mode==="boxes"){
    var n2,l,w,h,one,tot,tries2=0;
    do { n2=ri(4,9); l=ri(3,6); w=ri(3,5); h=ri(2,4); one=l*w*h; tot=one*n2; tries2++;
    } while(!u3vUniq([tot, one, (l+w+h)*n2, tot*2]) && tries2<40);
    if(!u3vUniq([tot, one, (l+w+h)*n2, tot*2])){ n2=4; l=4; w=5; h=3; one=60; tot=240; }
    return mcq("For a project, a student creates this problem: "+n2+" identical crates each measure "+l+" m by "+w+" m by "+h+" m. What is their total volume, in cubic metres? What is the answer to the created problem?",
      {t:fmt(tot)+"", fb:"Yes: one crate volume times the number of crates."},
      [{t:fmt(one)+"", fb:"That is one crate only; there are "+n2+" crates."},
       {t:fmt((l+w+h)*n2)+"", fb:"That adds the dimensions; volume multiplies the three dimensions first."},
       {t:fmt(tot*2)+"", fb:"That doubles the total; multiply the single volume by the count once."}],
      "Find one volume, then scale by the count. \\[ \\begin{aligned} V_{one} &= "+l+" \\times "+w+" \\times "+h+" = "+one+" \\\\ V_{total} &= "+one+" \\times "+n2+" = "+fmt(tot)+"\\ \\text{m}^3 \\end{aligned} \\] The answer is <b>"+fmt(tot)+" m\u00B3</b>.",
      {mode:mode,n:n2,one:one});
  }
  var rate=pick([5,8,10,20]), mins=ri(3,9), tot2=rate*mins;
  return mcq("For a project, a student creates this problem: a hose fills a tank at "+rate+" L per minute for "+mins+" minutes. How much water is added, in litres? What is the answer to the created problem?",
    {t:fmt(tot2)+"", fb:"Yes: rate times time gives the amount added."},
    [{t:fmt(rate+mins)+"", fb:"That adds the rate and the time; a rate is multiplied by time."},
     {t:fmt(tot2-rate)+"", fb:"That is one minute of filling short of the full amount."},
     {t:fmt(tot2*10)+"", fb:"That is ten times too large; check the place value of the product."}],
    "Amount equals rate times time. \\[ \\begin{aligned} \\text{Amount} &= "+rate+" \\times "+mins+" \\\\ &= "+fmt(tot2)+"\\ \\text{L} \\end{aligned} \\] The answer is <b>"+fmt(tot2)+" L</b>.",
    {mode:mode,rate:rate,mins:mins});
}, ["A created problem still uses the same volume relationships: divide to share, multiply to scale or to apply a rate.", "Solve the created problem one step at a time, starting with a single unit or a single crate."]);

/* ---------- Level 2, constructed response ---------- */
E("u3-cr-tank-capacity", 3, ["3.13","2.1"], 2, "gen", function(){
  var l=ri(8,16)*5, w=ri(6,10)*5, h=ri(6,12)*5;
  var cm3=l*w*h, ans=cm3/1000;
  return numq("A rectangular fish tank is "+l+" cm long, "+w+" cm wide and "+h+" cm high. What is its capacity, in litres? Give your answer in litres.",
    ans, 0.5,
    "Multiply the inside dimensions, then convert: \\(1\\ \\text{L} = 1{,}000\\ \\text{cm}^3\\). \\[ \\begin{aligned} V &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+fmt(cm3)+"\\ \\text{cm}^3 \\\\ \\text{Capacity} &= "+fmt(cm3)+" \\div 1{,}000 \\\\ &= "+fmt(ans)+"\\ \\text{L} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" L</b>.",
    {l:l,w:w,h:h});
}, ["Find the inside volume in cubic centimetres first.", "Convert at the end: divide cubic centimetres by 1,000 to get litres."]);

E("u3-cr-cylinder", 3, ["3.12"], 2, "gen", function(){
  var r=ri(4,12), h=ri(8,24), raw=Math.PI*r*r*h, ans=Math.round(raw*10)/10;
  return numq("A cylindrical canister has radius "+r+" cm and height "+h+" cm. Find its volume, to the nearest tenth of a cubic centimetre. Give your answer in cm\u00B3.",
    ans, 0.2,
    "Use \\(V = \\pi r^2 h\\). \\[ \\begin{aligned} V &= \\pi ("+r+")^2 ("+h+") \\\\ &\\approx "+fmt(raw)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" cm\u00B3</b>.",
    {r:r,h:h});
}, ["Use the cylinder formula from the formula sheet.", "Square the radius first, then multiply by pi and the height."]);

E("u3-cr-si-conversion", 3, ["3.10"], 2, "gen", function(){
  var modes=[
    {txt:function(v){return "Convert "+fmt(v)+" m\u00B3 to litres.";}, fac:1000, ftxt:"1,000", unit:"L", gen:function(){return ri(3,14);}, step:"1 m\u00B3 = 1,000 L, so multiply"},
    {txt:function(v){return "Convert "+fmt(v)+" cm\u00B3 to litres.";}, fac:0.001, ftxt:"1/1,000", unit:"L", gen:function(){return ri(25,95)*100;}, step:"1 L = 1,000 cm\u00B3, so divide by 1,000"},
    {txt:function(v){return "Convert "+fmt(v)+" L to millilitres.";}, fac:1000, ftxt:"1,000", unit:"mL", gen:function(){return ri(3,11);}, step:"1 L = 1,000 mL, so multiply"},
    {txt:function(v){return "Convert "+fmt(v)+" m\u00B3 to cubic centimetres.";}, fac:1000000, ftxt:"1,000,000", unit:"cm\u00B3", gen:function(){return ri(2,7);}, step:"1 m\u00B3 = 1,000,000 cm\u00B3, so multiply"}
  ];
  var m=pick(modes), v=m.gen(), ans=v*m.fac;
  return numq(m.txt(v)+" Give your answer in "+m.unit+".",
    ans, Math.max(0.5, ans*0.01),
    "Cubed SI conversions use factors of \\(1{,}000\\): "+m.step+". \\[ "+fmt(v)+" \\times "+m.ftxt+" = "+fmt(ans)+" \\] The answer is <b>"+fmt(ans)+" "+m.unit+"</b>.",
    {v:v, unit:m.unit});
}, ["Cubed SI units step by 1,000, not by 10.", "Decide whether the target unit is bigger or smaller, then multiply or divide by 1,000 for each step."]);

E("u3-cr-cone", 3, ["3.12","3.15"], 2, "gen", function(){
  var r=ri(4,10), h=ri(9,21), raw=Math.PI*r*r*h/3, ans=Math.round(raw*10)/10;
  return numq("A cone shaped paper cup has radius "+r+" cm and height "+h+" cm. Find the volume it can hold, to the nearest tenth of a cubic centimetre. Give your answer in cm\u00B3.",
    ans, 0.2,
    "A cone holds one third of the matching cylinder. \\[ \\begin{aligned} V &= \\frac{\\pi ("+r+")^2 ("+h+")}{3} \\\\ &\\approx "+fmt(raw)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" cm\u00B3</b>.",
    {r:r,h:h});
}, ["Use the cone formula from the formula sheet.", "Find the matching cylinder volume first, then take one third of it."]);

E("u3-cr-find-height", 3, ["2.2","3.12"], 2, "gen", function(){
  var r=ri(3,8), h=ri(6,18), coeff=r*r*h;
  return numq("A cylinder has radius "+r+" cm and volume \\("+coeff+"\\pi\\) cm\u00B3. Find its height. Give your answer in cm.",
    h, 0.2,
    "Start from \\(V = \\pi r^2 h\\) and rearrange for the height. \\[ \\begin{aligned} "+coeff+"\\pi &= \\pi ("+r+")^2 h \\\\ h &= \\frac{"+coeff+"}{"+(r*r)+"} \\\\ &= "+h+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+h+" cm</b>.",
    {r:r,h:h});
}, ["Write the volume formula first, then rearrange it for the unknown height.", "Substitute the radius and the volume, cancel pi, then divide."]);

E("u3-cr-composite", 3, ["3.16"], 2, "gen", function(){
  var l=ri(6,12), w=ri(4,8), h1=ri(4,8), h2=ri(3,7);
  var base=l*w*h1, cyl=Math.PI*(w/2)*(w/2)*h2;
  var raw=base+cyl, ans=Math.round(raw*10)/10;
  return numq("A display block is a rectangular prism "+l+" cm long, "+w+" cm wide and "+h1+" cm high. A solid cylinder of diameter "+w+" cm and height "+h2+" cm stands on top of it. Find the total volume, to the nearest tenth of a cubic centimetre. Give your answer in cm\u00B3.",
    ans, 0.3,
    "Add the prism volume and the cylinder volume. The cylinder radius is half of "+w+", which is "+fmt(w/2)+". \\[ \\begin{aligned} V_{prism} &= "+l+" \\times "+w+" \\times "+h1+" = "+fmt(base)+" \\\\ V_{cyl} &= \\pi ("+fmt(w/2)+")^2 ("+h2+") \\approx "+fmt(cyl)+" \\\\ V_{total} &\\approx "+fmt(raw)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>about "+fmt(ans)+" cm\u00B3</b>.",
    {l:l,w:w,h1:h1,h2:h2});
}, ["Split the composite into a prism part and a cylinder part, then add.", "Find the prism volume first; remember the cylinder needs the radius, half the diameter."]);

/* ---------- Level 3, multiple choice ---------- */
E("u3-sphere-capacity", 3, ["3.13","3.12"], 3, "gen", function(){
  var r=ri(18,45), raw=4*Math.PI*r*r*r/3, ansL=raw/1000;
  var ds=[raw, 4*Math.PI*r*r/1000, ansL/2];
  var tank=pick(["A spherical water tank","A spherical storage tank","A spherical aquarium tank","A spherical process tank"]);
  var q=mcq(tank+" has radius "+r+" cm. What is its capacity, to the nearest litre?",
    {t:fmt(Math.round(ansL))+"", fb:"Yes: sphere volume in cubic centimetres, then divided by 1,000 to get litres."},
    [{t:fmt(Math.round(ds[0]))+"", fb:"That is the volume in cubic centimetres with no conversion; litres are 1,000 times smaller as a count."},
     {t:fmt(Math.round(ds[1]))+"", fb:"That uses the surface area formula, \\(4\\pi r^2\\), which covers the outside of the sphere."},
     {t:fmt(Math.round(ds[2]))+"", fb:"That is only half the tank; the formula gives the full sphere."}],
    "Find the volume, then convert: \\(1\\ \\text{L} = 1{,}000\\ \\text{cm}^3\\). \\[ \\begin{aligned} V &= \\frac{4\\pi ("+r+")^3}{3} \\\\ &\\approx "+fmt(raw)+"\\ \\text{cm}^3 \\\\ \\text{Capacity} &\\approx "+fmt(raw)+" \\div 1{,}000 \\\\ &\\approx "+fmt(ansL)+"\\ \\text{L} \\end{aligned} \\] The answer is <b>about "+fmt(Math.round(ansL))+" L</b>.",
    {r:r});
  q.figure=u3vSphereFig(r,"cm");
  return q;
}, ["Find the sphere volume first, then convert the units.", "Cube the radius, apply the sphere formula, and divide cubic centimetres by 1,000 for litres."]);

E("u3-imperial-context", 3, ["3.11","3.16","2.3"], 3, "gen", function(){
  var mode=pick(["concrete","tankgal"]);
  if(mode==="concrete"){
    var ft=ri(2,20)*27, yd=ft/27;
    var _bo0=balOpts({t:fmt(yd)+"", fb:"Yes: divide cubic feet by 27 to get cubic yards."}, [{t:fmt(ft/3)+"", fb:"That divides by the linear factor 3; cubed units divide by 3 cubed, which is 27."},
       {t:fmt(ft)+"", fb:"That keeps the cubic foot number; the unit changed, so the number must change."},
       {t:fmt(ft/9)+"", fb:"That divides by 9, the squared factor; volume needs the cubed factor, 27."}]); return mcq("A concrete worker measures a foundation form and finds it holds "+ft+" ft\u00B3. Concrete is ordered in cubic yards. How many cubic yards should be ordered (exact amount, before any extra for waste)?", _bo0[0], _bo0[1],
      "Cube the linear factor: \\(3^3 = 27\\), so \\(1\\ \\text{yd}^3 = 27\\ \\text{ft}^3\\). \\[ \\begin{aligned} \\text{Order} &= "+ft+" \\div 27 \\\\ &= "+fmt(yd)+"\\ \\text{yd}^3 \\end{aligned} \\] The answer is <b>"+fmt(yd)+" yd\u00B3</b>.",
      {mode:mode,ft:ft});
  }
  var ft2=ri(6,40), gal=Math.round(ft2*6.23*10)/10;
  var _bo1=balOpts({t:fmt(gal)+"", fb:"Yes: multiply the cubic feet by the stated rate."}, [{t:fmt(ft2)+"", fb:"That keeps the cubic foot number; apply the stated rate."},
     {t:fmt(Math.round(ft2/6.23*10)/10)+"", fb:"That divides by the rate; a gallon count is larger than the cubic foot count here, so multiply."},
     {t:fmt(gal*10)+"", fb:"That is ten times too large; check the place value of the product."}]); return mcq("A fuel tank holds "+ft2+" ft\u00B3. Use the stated rate: \\(1\\ \\text{ft}^3\\) holds about 6.23 imperial gallons. About how many imperial gallons does the tank hold?", _bo1[0], _bo1[1],
    "Multiply by the stated rate. \\[ \\begin{aligned} \\text{Gallons} &\\approx "+ft2+" \\times 6.23 \\\\ &\\approx "+fmt(gal)+" \\end{aligned} \\] The answer is <b>about "+fmt(gal)+" gal</b>.",
    {mode:mode,ft:ft2});
}, ["Convert with the cubed factor, or multiply by a rate when the stem states one.", "For cubic yards, divide cubic feet by 27, since 3 cubed is 27."]);

E("u3-dimension-change-hard", 3, ["3.14","2.4"], 3, "gen", function(){
  var mode=pick(["mixed","allscale","cylmix"]);
  if(mode==="mixed"){
    var V=ri(40,400), ans=V*3;
    return mcq("A student creates this scaling problem: a box has volume "+V+" cm\u00B3. Its length is doubled, its width is halved, and its height is tripled. What is the new volume?",
      {t:fmt(ans)+" cm\u00B3", fb:"Yes: the factors are 2, one half and 3, whose product is 3."},
      [{t:fmt(V*6)+" cm\u00B3", fb:"That multiplies 2 by 3 and forgets the halved width."},
       {t:fmt(V)+" cm\u00B3", fb:"That assumes the changes cancel fully; doubling and halving cancel, but the tripling remains."},
       {t:fmt(V*2)+" cm\u00B3", fb:"That keeps only the doubling; apply all three factors."}],
      "Multiply the dimension factors: \\(2 \\times \\frac{1}{2} \\times 3 = 3\\). \\[ \\begin{aligned} V_{new} &= "+V+" \\times 3 \\\\ &= "+fmt(ans)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" cm\u00B3</b>.",
      {mode:mode,V:V});
  }
  if(mode==="allscale"){
    var V2=ri(30,200), ans2=V2*8;
    return mcq("A student creates this scaling problem: every dimension of a solid is doubled, and the original volume is "+V2+" cm\u00B3. By what amount does the volume increase?",
      {t:fmt(ans2-V2)+" cm\u00B3", fb:"Yes: the new volume is 8 times the original, so the increase is 7 times the original."},
      [{t:fmt(ans2)+" cm\u00B3", fb:"That is the new volume itself; the question asks for the increase."},
       {t:fmt(V2*2)+" cm\u00B3", fb:"That doubles the original; three doubled dimensions give a factor of 8, not 2."},
       {t:fmt(V2*7)+" cm\u00B3 is the new volume", fb:"Seven times the original is the increase, not the new volume; read what is asked."}],
      "Doubling all three dimensions multiplies volume by \\(2^3 = 8\\). \\[ \\begin{aligned} V_{new} &= 8 \\times "+V2+" = "+fmt(ans2)+" \\\\ \\text{Increase} &= "+fmt(ans2)+" - "+V2+" = "+fmt(ans2-V2)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans2-V2)+" cm\u00B3</b>.",
      {mode:mode,V:V2});
  }
  var V3=ri(50,500), ans3=V3*2;
  return mcq("A student creates this scaling problem: a cylinder has volume "+V3+" cm\u00B3. Its radius is doubled and its height is halved. What is the new volume?",
    {t:fmt(ans3)+" cm\u00B3", fb:"Yes: the doubled radius gives a factor of 4, and the halved height gives one half, for a net factor of 2."},
    [{t:fmt(V3*4)+" cm\u00B3", fb:"That applies the radius factor only; the halved height still counts."},
     {t:fmt(V3)+" cm\u00B3", fb:"That assumes the two changes cancel; the radius change is squared, so it outweighs the height change."},
     {t:fmt(V3/2)+" cm\u00B3", fb:"That applies the height change only and drops the radius change."}],
    "The radius is squared, so doubling it gives a factor of \\(4\\); halving the height gives \\(\\frac{1}{2}\\). Net factor: \\(4 \\times \\frac{1}{2} = 2\\). \\[ \\begin{aligned} V_{new} &= "+V3+" \\times 2 \\\\ &= "+fmt(ans3)+"\\ \\text{cm}^3 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" cm\u00B3</b>.",
    {mode:mode,V:V3});
}, ["Give each changed dimension its factor, remembering that a radius counts twice.", "Multiply all the factors first, then apply the net factor to the original volume."]);

E("u3-estimate-hard", 3, ["3.9","3.16"], 3, "gen", function(){
  var mode=pick(["room","tub","tank"]);
  if(mode==="room"){
    var a,b,c,est,rtries=0;
    do { a=ri(3,8); b=ri(3,6); c=ri(2,4); est=a*b*c; rtries++; } while(!u3vUniq([est, a+b+c, a*b, est*10]) && rtries<40);
    return mcq("A storage room is about "+a+" metre sticks long, "+b+" metre sticks wide and "+c+" metre sticks high, where one metre stick cube (\\(1\\ \\text{m}^3\\)) is the referent. What is the best estimate of the room volume?",
      {t:"About "+est+" m\u00B3", fb:"Yes: multiply the three referent counts."},
      [{t:"About "+(a+b+c)+" m\u00B3", fb:"That adds the counts; volume multiplies the three dimensions."},
       {t:"About "+(a*b)+" m\u00B3", fb:"That is the floor area only; the height count is missing."},
       {t:"About "+(est*10)+" m\u00B3", fb:"That is ten times too large for the counts given."}],
      "Multiply the three referent counts. \\[ \\begin{aligned} V &\\approx "+a+" \\times "+b+" \\times "+c+" \\\\ &= "+est+"\\ \\text{m}^3 \\end{aligned} \\] The answer is <b>about "+est+" m\u00B3</b>.",
      {mode:mode,est:est});
  }
  if(mode==="tub"){
    var n=ri(10,30), est2=n*10;
    return mcq("A worker estimates a hot tub capacity by filling it with a 10 L bucket. It takes about "+n+" bucketfuls. The tub also has a curved seat, so the true capacity is a little less than the bucket count suggests. Which estimate is best?",
      {t:"A little under "+est2+" L", fb:"Yes: the bucket count gives "+est2+" L, and the seat takes up some of that space."},
      [{t:"Exactly "+est2+" L", fb:"The seat displaces some water, so the true capacity is a little less than the raw count."},
       {t:"A little over "+est2+" L", fb:"The seat reduces the holding space; it does not add to it."},
       {t:"About "+(n)+" L", fb:"That is the bucket count alone, without the 10 L size of each bucketful."}],
      "The count gives \\("+n+" \\times 10 = "+est2+"\\ \\text{L}\\), and the seat takes up space, so the capacity is a little less. The answer is <b>a little under "+est2+" L</b>.",
      {mode:mode,n:n});
  }
  var jugs=ri(10,40), jugL=4, est3=jugs*jugL;
  return mcq("A gardener estimates a water barrel capacity by filling it with a "+jugL+" L jug. It takes about "+jugs+" jugfuls, but the last jug only partly empties before the barrel is full. Which estimate is best?",
    {t:"A little under "+est3+" L", fb:"Yes: "+jugs+" full jugfuls would be "+est3+" L, and the last one did not fully empty."},
    [{t:"Exactly "+est3+" L", fb:"The last jug only partly emptied, so the total is a little less than the full count."},
     {t:"A little over "+est3+" L", fb:"A partly emptied last jug cannot push the total above the full count value."},
     {t:"About "+jugs+" L", fb:"That is the jug count alone, without the "+jugL+" L size of each jugful."}],
    "The count gives \\("+jugs+" \\times "+jugL+" = "+est3+"\\ \\text{L}\\) for full jugfuls, and the last jug was partial, so the capacity is a little less. The answer is <b>a little under "+est3+" L</b>.",
    {mode:mode,jugs:jugs});
}, ["Start with the referent count times the referent size, then adjust for anything that adds or takes away space.", "Compute the raw estimate first, then decide whether the true value sits a little above or a little below it."]);

/* ---------- Level 3, constructed response ---------- */
E("u3-cr-capacity-remaining", 3, ["3.13","3.16","2.2"], 3, "gen", function(){
  var l=ri(10,15)*5, w=ri(8,12)*5, H=pick([40,50,60]), filled=pick([15,20,25,30]);
  if(filled>=H) filled=H-15;
  var rem=l*w*(H-filled), ans=rem/1000;
  return numq("A rectangular tank is "+l+" cm long and "+w+" cm wide. It is "+H+" cm deep in total, and it is already filled to a depth of "+filled+" cm. How much more water, in litres, will it hold? Give your answer in litres.",
    ans, 0.5,
    "Work with the empty depth, which is the total depth minus the filled depth. \\[ \\begin{aligned} \\text{Empty depth} &= "+H+" - "+filled+" = "+(H-filled)+"\\ \\text{cm} \\\\ V_{empty} &= "+l+" \\times "+w+" \\times "+(H-filled)+" \\\\ &= "+fmt(rem)+"\\ \\text{cm}^3 \\\\ \\text{Capacity left} &= "+fmt(rem)+" \\div 1{,}000 = "+fmt(ans)+"\\ \\text{L} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" L</b>.",
    {l:l,w:w,H:H,filled:filled});
}, ["Use the empty part of the tank, not the full depth.", "Subtract the filled depth from the total depth first, then find that volume and convert to litres."]);

E("u3-cr-find-base-side", 3, ["2.2","3.12"], 3, "gen", function(){
  var s=ri(4,15), h=pick([6,9,12,15,18,21,24]), V=s*s*h/3;
  return numq("A square based pyramid has height "+h+" cm and volume "+fmt(V)+" cm\u00B3. Find the side length of its square base. Give your answer in cm.",
    s, 0.2,
    "Start from \\(V = \\frac{lwh}{3}\\) with \\(l = w = s\\) for a square base, then rearrange. \\[ \\begin{aligned} "+fmt(V)+" &= \\frac{s^2 \\times "+h+"}{3} \\\\ s^2 &= \\frac{3 \\times "+fmt(V)+"}{"+h+"} = "+(s*s)+" \\\\ s &= "+s+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+s+" cm</b>.",
    {s:s,h:h});
}, ["Write the pyramid volume formula first, using one letter for both base sides.", "Multiply the volume by 3, divide by the height, then take the square root."]);

/* ----- bank-u4.js ----- */
// Math 2202 Unit 4 Interpreting Graphs question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 1894 to 2437).
// CRMARKS: u4-cr-histogram-total=2
// CRMARKS: u4-cr-read-compare=2
// CRMARKS: u4-cr-extrapolate=2
// CRMARKS: u4-cr-bar-total=3
// CRMARKS: u4-cr-histogram-range=3
// CRMARKS: u4-cr-interpolate=3
// CRMARKS: u4-cr-predict-trend=2
// CRMARKS: u4-cr-percent-change=3
/* ===== Unit 4 ===== */
/* Unit 4: Interpreting Graphs (indicators 6.1 to 6.7). Figure helpers prefixed u4. */
function u4X(i, n) { return 58 + i * (258 / Math.max(n - 1, 1)); }
function u4Y(v, yMax) { return 186 - (v / yMax) * 148; }
function u4Frame(yMax, yTitle, xTitle) {
  var s = '<svg viewBox="0 0 340 232" width="340" height="232" xmlns="http://www.w3.org/2000/svg" role="img">';
  var ticks = [0, yMax / 2, yMax];
  for (var i = 0; i < ticks.length; i++) {
    var y = u4Y(ticks[i], yMax);
    s += '<line x1="52" y1="' + fmt(y, 1) + '" x2="322" y2="' + fmt(y, 1) + '" stroke="' + FIG_SHADE + '" stroke-width="1"/>';
    s += _txt(46, y, fmt(ticks[i]), 11, false, "end");
  }
  s += '<line x1="52" y1="30" x2="52" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="52" y1="186" x2="322" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += _txt(20, 108, yTitle, 11, true);
  if (xTitle) s += _txt(187, 224, xTitle, 11, true);
  return s;
}
function u4LineFig(labels, vals, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle), pts = "";
  for (var i = 0; i < vals.length; i++) {
    var x = u4X(i, vals.length), y = u4Y(vals[i], yMax);
    pts += fmt(x, 1) + "," + fmt(y, 1) + " ";
    s += "";
  }
  s += '<polyline points="' + pts + '" fill="none" stroke="' + FIG_ACC + '" stroke-width="2.5"/>';
  for (var j = 0; j < vals.length; j++) {
    var x2 = u4X(j, vals.length), y2 = u4Y(vals[j], yMax);
    s += '<circle cx="' + fmt(x2, 1) + '" cy="' + fmt(y2, 1) + '" r="4" fill="' + FIG_INK + '"/>';
    s += _txt(x2, 202, labels[j], 11, false);
  }
  return s + "</svg>";
}
function u4BarFig(labels, vals, yMax, yTitle, xTitle, base) {
  base = base || 0;
  var s = '<svg viewBox="0 0 340 232" width="340" height="232" xmlns="http://www.w3.org/2000/svg" role="img">';
  var ticks = [base, base + (yMax - base) / 2, yMax], i, y;
  for (i = 0; i < ticks.length; i++) {
    y = 186 - ((ticks[i] - base) / (yMax - base)) * 148;
    s += '<line x1="52" y1="' + fmt(y, 1) + '" x2="322" y2="' + fmt(y, 1) + '" stroke="' + FIG_SHADE + '" stroke-width="1"/>';
    s += _txt(46, y, fmt(ticks[i]), 11, false, "end");
  }
  s += '<line x1="52" y1="30" x2="52" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += '<line x1="52" y1="186" x2="322" y2="186" stroke="' + FIG_INK + '" stroke-width="2"/>';
  s += _txt(20, 108, yTitle, 11, true);
  if (xTitle) s += _txt(187, 224, xTitle, 11, true);
  var bw = 258 / vals.length;
  for (i = 0; i < vals.length; i++) {
    var bx = 58 + i * bw + bw * 0.18, bwid = bw * 0.64;
    var by = 186 - ((vals[i] - base) / (yMax - base)) * 148;
    s += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(by, 1) + '" width="' + fmt(bwid, 1) + '" height="' + fmt(186 - by, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    s += _txt(bx + bwid / 2, 202, labels[i], 11, false);
  }
  return s + "</svg>";
}
function u4HistFig(labels, freqs, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle), bw = 264 / freqs.length;
  for (var i = 0; i < freqs.length; i++) {
    var bx = 52 + i * bw, by = u4Y(freqs[i], yMax);
    s += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(by, 1) + '" width="' + fmt(bw, 1) + '" height="' + fmt(186 - by, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
    s += _txt(bx + bw / 2, 202, labels[i], 10, false);
  }
  return s + "</svg>";
}
function u4ScatterFig(pts, xMax, yMax, yTitle, xTitle) {
  var s = u4Frame(yMax, yTitle, xTitle);
  var xt = [0, xMax / 2, xMax];
  for (var i = 0; i < xt.length; i++) {
    var x = 52 + (xt[i] / xMax) * 270;
    s += _txt(x, 202, fmt(xt[i]), 11, false);
    s += '<line x1="' + fmt(x, 1) + '" y1="186" x2="' + fmt(x, 1) + '" y2="182" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  }
  for (var j = 0; j < pts.length; j++) {
    var px = 52 + (pts[j][0] / xMax) * 270, py = u4Y(pts[j][1], yMax);
    s += '<circle cx="' + fmt(px, 1) + '" cy="' + fmt(py, 1) + '" r="4" fill="' + FIG_ALT + '"/>';
  }
  return s + "</svg>";
}
function u4NiceMax(v) { var m = Math.ceil(v * 1.25); return Math.max(10, Math.ceil(m / 10) * 10); }
function u4Distractors(ans, pool) {
  var out = [], seen = { }, c = 0;
  seen[String(ans)] = 1;
  while (out.length < 3 && c < 60) {
    c++;
    var d = pick(pool);
    if (d > 0 && !seen[String(d)]) { seen[String(d)] = 1; out.push(d); }
  }
  var f = ans + 3;
  while (out.length < 3) { if (!seen[String(f)]) { seen[String(f)] = 1; out.push(f); } f++; }
  return out;
}

E("u4-choose-graph", 4, ["6.1"], 1, "var", varset([
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

E("u4-histogram-read", 4, ["6.2"], 1, "gen", function () {
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

E("u4-trend-basic", 4, ["6.4"], 1, "gen", function () {
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

E("u4-read-value", 4, ["6.3"], 1, "gen", function () {
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

E("u4-histogram-combine", 4, ["6.2"], 2, "gen", function () {
  var ctxs = [
    { unit: "minutes waited for a bus in St. John's", w: 5, who: "riders" },
    { unit: "centimetres of snow in one storm, by town", w: 4, who: "towns" },
    { unit: "dollars spent at a craft fair in Trinity", w: 10, who: "shoppers" },
    { unit: "laps swum at a pool in Carbonear", w: 5, who: "swimmers" }
  ];
  var c = pick(ctxs), labels = [], freqs = [], i;
  for (i = 0; i < 5; i++) { labels.push((i * c.w) + "-" + ((i + 1) * c.w - 1)); freqs.push(ri(3, 14)); }
  var k = ri(0, 3), ans = freqs[k] + freqs[k + 1];
  var pool = [freqs[k], freqs[k + 1], ans + freqs[(k + 2) % 5], ans + 2, ans - 2, freqs[k] * 2];
  var ds = u4Distractors(ans, pool).map(function (d) { return { t: String(d), fb: d + " comes from reading one bar only or adding a bar outside the two named intervals: add the heights of " + labels[k] + " and " + labels[k + 1] + "." }; });
  var q = mcq("The histogram shows " + c.unit + " for " + c.who + ". How many " + c.who + " fall in the " + labels[k] + " or " + labels[k + 1] + " intervals combined?",
    { t: String(ans), fb: "Yes: " + freqs[k] + " plus " + freqs[k + 1] + " equals " + ans + "." }, ds,
    "\\[ \\begin{aligned} \\text{Combined} &= " + freqs[k] + " + " + freqs[k + 1] + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.",
    { k: k, ans: ans });
  q.figure = u4HistFig(labels, freqs, u4NiceMax(Math.max.apply(null, freqs)), "Frequency", c.unit);
  return q;
}, ["The word combined means add the bars for both named intervals.", "Read each of the two bar heights first, then add them."]);

E("u4-interpolate", 4, ["6.5"], 2, "gen", function () {
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

E("u4-misleading-axis", 4, ["6.7"], 2, "gen", function () {
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

E("u4-scatter-trend", 4, ["6.4", "6.3"], 2, "gen", function () {
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

E("u4-representation-pov", 4, ["6.1", "6.7"], 2, "gen", function () {
  var modes = [
    function () {
      var a = ri(40, 70), b = a + pick([3, 4, 5, 6]), base = a - pick([4, 6, 8]);
      return { prompt: "A shop in Bay Roberts sold " + a + " gift baskets last December and " + b + " this December. The owner wants a poster graph that makes the growth look as large as possible. Which choice does that?",
        correct: "Start the vertical axis at " + base + " instead of 0", correctFb: "Yes: cutting the axis makes a gain of " + (b - a) + " fill far more of the page.",
        ds: [["Start the vertical axis at 0 and keep equal intervals", "A full axis from 0 shows the gain at its true, modest size."],
             ["Report the exact counts in a plain data table", "A table gives the numbers with no visual exaggeration at all."],
             ["Use a circle graph of the two monthly totals", "Circle slices show shares of a total, not growth over time."]],
        sol: "The real gain is only " + (b - a) + " baskets. Starting the scale at " + base + " shows only the tops of the bars, so the small gain looks dramatic. The answer is <b>Start the vertical axis at " + base + " instead of 0</b>.", p: { a: a, b: b, base: base } };
    },
    function () {
      var a = ri(20, 45), b = a * pick([2, 3]);
      return { prompt: "A charity in Happy Valley-Goose Bay helped " + a + " families two years ago and " + b + " families this year. A pictograph maker wants the increase to look even bigger than it is. Which choice does that?",
        correct: "Draw this year's symbol " + (b / a) + " times as tall and " + (b / a) + " times as wide", correctFb: "Yes: scaling a symbol both ways multiplies its area, so it looks far bigger than the count ratio.",
        ds: [["Draw each symbol the same size for both years on the poster", "Equal symbols make the picture match the counts honestly."],
             ["Label each symbol with the exact family count for its year", "Exact labels let readers check the real numbers directly."],
             ["Replace the pictograph with a bar graph from 0 instead", "A bar graph from 0 shows the increase at its true size."]],
        sol: "The count grew by a factor of " + (b / a) + ". A symbol scaled in both height and width grows in area by that factor squared, which overstates the change. The answer is <b>Draw this year's symbol " + (b / a) + " times as tall and " + (b / a) + " times as wide</b>.", p: { a: a, b: b } };
    },
    function () {
      var a = ri(6, 12), b = a + pick([8, 10, 12, 14]);
      return { prompt: "A town council in Placentia compares two graphs of the same road repair costs, which rose from $" + a + ",000 to $" + b + ",000 over five years. One graph uses 1-year steps on the time axis, the other uses 5-year steps. Which statement is true?",
        correct: "The 1-year steps make the rise look more gradual", correctFb: "Yes: spreading the same rise over more steps flattens the slope a reader sees.",
        ds: [["The 5-year steps change the actual repair costs", "Axis steps change the picture only; the costs stay the same."],
             ["The 1-year steps hide some of the repair costs", "Every year still appears; the rise is spread out, not hidden."],
             ["Both graphs must create the same impression", "Step size changes the steepness readers see, so impressions differ."]],
        sol: "The data are identical in both graphs. With 1-year steps the rise of $" + (b - a) + ",000 is spread across five segments, so it looks gradual. The answer is <b>The 1-year steps make the rise look more gradual</b>.", p: { a: a, b: b } };
    }
  ];
  var m = pick(modes)();
  var ds = m.ds.map(function (d) { return { t: d[0], fb: d[1] }; });
  return mcq(m.prompt, { t: m.correct, fb: m.correctFb }, ds, m.sol, m.p);
}, ["Ask which version changes the impression while keeping the same underlying numbers.", "Look for the choice that stretches, squeezes, or rescales the picture rather than reporting the data plainly."]);

E("u4-two-conclusions", 4, ["6.6"], 2, "gen", function () {
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

E("u4-cr-histogram-total", 4, ["6.2"], 2, "gen", function () {
  var ctxs = [
    { unit: "books borrowed in a month, by borrower", w: 5, who: "borrowers" },
    { unit: "centimetres grown by tomato plants in a greenhouse class", w: 4, who: "plants" },
    { unit: "minutes of screen time on a school night", w: 15, who: "students" },
    { unit: "fish caught per trip by harbour boats in Burin", w: 2, who: "boats" }
  ];
  var c = pick(ctxs), labels = [], freqs = [], i, total = 0;
  for (i = 0; i < 5; i++) { labels.push((i * c.w) + "-" + ((i + 1) * c.w - 1)); freqs.push(ri(2, 12)); total += freqs[i]; }
  var q = numq("The histogram shows " + c.unit + " for " + c.who + ". In total, how many " + c.who + " were counted?",
    total, 0,
    "\\[ \\begin{aligned} \\text{Total} &= " + freqs.join(" + ") + " \\\\ &= " + total + " \\end{aligned} \\] The answer is <b>" + total + "</b>.",
    { total: total });
  q.figure = u4HistFig(labels, freqs, u4NiceMax(Math.max.apply(null, freqs)), "Frequency", c.unit);
  return q;
}, ["A total from a histogram means adding the heights of all the bars.", "Read every bar height first and write the five values down before adding."]);

E("u4-cr-read-compare", 4, ["6.3"], 2, "gen", function () {
  var ctxs = [
    { thing: "scones sold at a bakery in Twillingate", unit: "scones", labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] },
    { thing: "laps completed at a swim club in St. John's", unit: "laps", labels: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"] },
    { thing: "visitors to a lighthouse site in Bonavista", unit: "visitors", labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct"] }
  ];
  var c = pick(ctxs), vals = [], i;
  for (i = 0; i < 6; i++) vals.push(ri(4, 22) * 5);
  var a = ri(0, 2), b = ri(3, 5);
  if (vals[b] === vals[a]) vals[b] += 10;
  var diff = Math.abs(vals[b] - vals[a]), more = vals[b] > vals[a] ? c.labels[b] : c.labels[a];
  var q = numq("The line graph shows " + c.thing + ". How many more were recorded in " + (vals[b] > vals[a] ? c.labels[b] : c.labels[a]) + " than in " + (vals[b] > vals[a] ? c.labels[a] : c.labels[b]) + "? Give the number only.",
    diff, 0,
    "\\[ \\begin{aligned} \\text{Difference} &= " + Math.max(vals[a], vals[b]) + " - " + Math.min(vals[a], vals[b]) + " \\\\ &= " + diff + " \\end{aligned} \\] The answer is <b>" + diff + "</b>.",
    { a: a, b: b, diff: diff });
  q.figure = u4LineFig(c.labels, vals, u4NiceMax(Math.max.apply(null, vals)), c.unit, "");
  return q;
}, ["Read both named points off the graph before doing any arithmetic.", "Subtract the smaller reading from the larger reading."]);

E("u4-cr-extrapolate", 4, ["6.5"], 2, "gen", function () {
  var ctxs = [
    { thing: "savings in a jar for a school trip to Fogo Island", unit: "dollars", y: "Dollars saved" },
    { thing: "height of a bean plant in a class in Grand Falls-Windsor", unit: "cm", y: "Height (cm)" },
    { thing: "distance cycled by a rider training in Terra Nova", unit: "km", y: "Distance (km)" },
    { thing: "pages finished by a reading club in Marystown", unit: "pages", y: "Pages" }
  ];
  var c = pick(ctxs), start = ri(6, 40), step = pick([3, 4, 5, 6, 7, 8, 9, 10]);
  var labels = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5"], vals = [], i;
  for (i = 0; i < 5; i++) vals.push(start + step * i);
  var ans = vals[4] + step;
  var q = numq("The line graph shows " + c.thing + " rising by the same amount each week. Extrapolate the value for Week 6. Give the number only, in " + c.unit + ".",
    ans, 0,
    "\\[ \\begin{aligned} \\text{Weekly increase} &= " + vals[1] + " - " + vals[0] + " = " + step + " \\\\ \\text{Week 6} &= " + vals[4] + " + " + step + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " " + c.unit + "</b>.",
    { start: start, step: step, ans: ans });
  q.figure = u4LineFig(labels, vals, u4NiceMax(ans), c.y, "Week");
  return q;
}, ["Extrapolation extends the pattern one step beyond the plotted points.", "Find the steady increase between neighbouring points, then add it once to the last value."]);

E("u4-cr-bar-total", 4, ["6.3"], 2, "gen", function () {
  var ctxs = [
    { thing: "meals served at a community kitchen in St. John's", unit: "meals", labels: ["Mon", "Tue", "Wed", "Thu"] },
    { thing: "seed packets sold at a garden centre in Mount Pearl", unit: "packets", labels: ["Apr", "May", "Jun", "Jul"] },
    { thing: "cars washed at a fundraiser in Bay Roberts", unit: "cars", labels: ["9 AM", "11 AM", "1 PM", "3 PM"] },
    { thing: "mittens knit by a craft circle in Trinity", unit: "pairs", labels: ["Sep", "Oct", "Nov", "Dec"] }
  ];
  var c = pick(ctxs), vals = [], i, total = 0;
  for (i = 0; i < 4; i++) { vals.push(ri(3, 20) * 5); total += vals[i]; }
  var q = numq("The bar graph shows " + c.thing + ". What is the total across all four bars? Give the number only.",
    total, 0,
    "\\[ \\begin{aligned} \\text{Total} &= " + vals.join(" + ") + " \\\\ &= " + total + " \\end{aligned} \\] The answer is <b>" + total + "</b>.",
    { total: total });
  q.figure = u4BarFig(c.labels, vals, u4NiceMax(Math.max.apply(null, vals)), c.unit, "");
  return q;
}, ["Read the height of every bar before adding anything.", "Add the four bar values in order, checking each reading against the scale."]);

E("u4-cr-histogram-range", 4, ["6.2", "6.3"], 2, "gen", function () {
  var ctxs = [
    { unit: "test score out of 100", w: 10, who: "students", start: 40 },
    { unit: "grams of blueberries picked per bucket helper", w: 50, who: "helpers", start: 100 },
    { unit: "minutes per shift worked by tour guides in Gros Morne", w: 30, who: "guides", start: 60 },
    { unit: "dollars of tips per shift at a cafe in St. John's", w: 5, who: "servers", start: 10 }
  ];
  var c = pick(ctxs), labels = [], freqs = [], i;
  for (i = 0; i < 5; i++) { labels.push((c.start + i * c.w) + "-" + (c.start + (i + 1) * c.w - 1)); freqs.push(ri(2, 13)); }
  var ans = freqs[2] + freqs[3] + freqs[4], lo = c.start + 2 * c.w;
  var q = numq("The histogram shows " + c.unit + " for " + c.who + ". How many " + c.who + " recorded a value of " + lo + " or more? Give the number only.",
    ans, 0,
    "\\[ \\begin{aligned} \\text{At or above } " + lo + " &= " + freqs[2] + " + " + freqs[3] + " + " + freqs[4] + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.",
    { ans: ans, lo: lo });
  q.figure = u4HistFig(labels, freqs, u4NiceMax(Math.max.apply(null, freqs)), "Frequency", c.unit);
  return q;
}, ["Find the first interval that starts at the named value; every interval from there on counts.", "Read those bar heights and add them."]);

E("u4-cr-interpolate", 4, ["6.5"], 2, "gen", function () {
  var ctxs = [
    { thing: "temperature in a cold storage room in Port aux Basques", unit: "degrees C", x: "hours", y: "Degrees C" },
    { thing: "water depth in a harbour tank in Harbour Grace", unit: "cm", x: "hours", y: "Depth (cm)" },
    { thing: "distance travelled by a delivery van leaving Deer Lake", unit: "km", x: "hours", y: "Distance (km)" },
    { thing: "charge level of a tour boat battery in Twillingate", unit: "percent", x: "hours", y: "Percent" }
  ];
  var c = pick(ctxs), y1 = ri(5, 30), per = pick([2, 3, 4, 5, 6]), span = 4, y2 = y1 + per * span;
  var at = ri(1, 3), ans = y1 + per * at, xq = at;
  var labels = [], vals = [], i;
  for (i = 0; i <= span; i++) { labels.push(String(i)); vals.push(y1 + per * i); }
  var q = numq("A line graph of " + c.thing + " passes through (" + 0 + ", " + y1 + ") and (" + span + ", " + y2 + ") and is straight between plotted points. The values at each whole hour lie on the graph shown. Interpolate the value at hour " + xq + ". Give the number only, in " + c.unit + ".",
    ans, 0,
    "\\[ \\begin{aligned} \\text{Rise per hour} &= \\frac{" + y2 + " - " + y1 + "}{" + span + "} = " + per + " \\\\ \\text{Value at hour } " + xq + " &= " + y1 + " + " + xq + " \\times " + per + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " " + c.unit + "</b>.",
    { y1: y1, per: per, at: at, ans: ans });
  q.figure = u4LineFig(labels, vals, u4NiceMax(y2), c.y, "Hour");
  return q;
}, ["Interpolation uses the straight segment between two known points.", "Find the rise per unit step first, then move that many steps from the starting value."]);

E("u4-peak-pair", 4, ["6.6"], 3, "gen", function () {
  var ctxs = [
    { thing: "enrolment in evening fitness classes in Mount Pearl", unit: "members" },
    { thing: "visitors to a heritage site in Bonavista", unit: "visitors" },
    { thing: "orders at a takeout in Labrador City", unit: "orders" },
    { thing: "participants in a library program in Corner Brook", unit: "participants" }
  ];
  var c = pick(ctxs), labels = ["Yr 1", "Yr 2", "Yr 3", "Yr 4", "Yr 5"];
  var a = ri(25, 45), d1 = pick([10, 15, 20]), d2 = pick([5, 10, 15]), drop = pick([15, 20, 25, 30]);
  var vals = [a, a + d1, a + d1 + d2, a + d1 + d2 - Math.round(drop / 2), a + d1 + d2 - drop];
  var peak = vals[2];
  var correct = "It peaked in Yr 3 at " + peak + ", then fell to " + vals[4] + " by Yr 5";
  var q = mcq("The graph shows " + c.thing + " over five years. Which pair of conclusions does the graph support?",
    { t: correct, fb: "Yes: both parts are read directly off the plotted points." },
    [{ t: "It peaked in Yr 3 at " + peak + ", and it will return to " + peak + " next year", fb: "The peak reading is right, but the graph cannot promise a future value." },
     { t: "It rose every year, reaching its highest value in Yr 5", fb: "Read the last three points again: the values fall after Yr 3." },
     { t: "It fell because a competing program opened in Yr 4", fb: "The fall is visible, but the graph gives no reason for it." }],
    "The points rise to a highest value of " + peak + " in Yr 3 and then fall, ending at " + vals[4] + " in Yr 5. Only conclusions read off the points are supported. The answer is <b>" + correct + "</b>.",
    { vals: vals });
  q.figure = u4LineFig(labels, vals, u4NiceMax(peak), c.unit, "Year");
  return q;
}, ["Check both halves of each pair against the plotted points.", "Reject any half that adds a cause or a future promise the graph cannot show."]);

E("u4-misleading-actual", 4, ["6.7", "6.3"], 3, "gen", function () {
  var ctxs = [
    { thing: "average weekly pay at two plants in Newfoundland and Labrador", labels: ["Plant A", "Plant B"], unit: "dollars" },
    { thing: "season snowmobile sales at two dealers in Labrador", labels: ["Dealer A", "Dealer B"], unit: "machines" },
    { thing: "monthly riders for two taxi firms in St. John's", labels: ["Firm A", "Firm B"], unit: "riders" }
  ];
  var c = pick(ctxs);
  var v1 = pick([40, 50, 60, 80, 100, 120, 150, 200]);
  var pct = pick([10, 20, 25, 40, 50]);
  var v2 = v1 * (1 + pct / 100);
  var base = Math.round(v1 * 0.75), yMax = Math.round(v2 * 1.05) + 2;
  var visual = Math.round(((v2 - base) - (v1 - base)) / (v1 - base) * 100);
  var pool = [visual, pct + 20, Math.max(5, pct - 10), pct * 2];
  var ds = u4Distractors(pct, pool).map(function (d) { return { t: String(d) + "%", fb: d + "% comes from judging the visible bar heights or a rounded guess: compute the change from the labelled values, not the picture." }; });
  var q = mcq("The bar graph's axis starts at " + base + ", so " + c.labels[1] + " looks far ahead in " + c.thing + ". The labelled values are " + v1 + " for " + c.labels[0] + " and " + fmt(v2) + " for " + c.labels[1] + ". By what percent is " + c.labels[1] + " actually higher?",
    { t: pct + "%", fb: "Yes: the increase of " + fmt(v2 - v1) + " is " + pct + "% of the starting value " + v1 + "." }, ds,
    "\\[ \\begin{aligned} \\text{Percent higher} &= \\frac{" + fmt(v2) + " - " + v1 + "}{" + v1 + "} \\times 100 \\% \\\\ &= " + pct + "\\% \\end{aligned} \\] The answer is <b>" + pct + "%</b>.",
    { v1: v1, v2: v2, pct: pct, base: base });
  q.figure = u4BarFig(c.labels, [v1, v2], yMax, c.unit, "", base);
  return q;
}, ["Use the labelled values, not the visible bar heights, when the axis does not start at 0.", "Divide the increase by the starting value and multiply by 100."]);

E("u4-cr-predict-trend", 4, ["6.5", "6.4"], 3, "gen", function () {
  var ctxs = [
    { thing: "weekly bookings for a boat tour in Gros Morne", unit: "bookings", y: "Bookings" },
    { thing: "height of a tomato plant in a school greenhouse in Gander", unit: "cm", y: "Height (cm)" },
    { thing: "savings toward a used car by a worker in Stephenville", unit: "dollars", y: "Dollars saved" },
    { thing: "distance run each Sunday by a runner in St. John's", unit: "km", y: "Distance (km)" }
  ];
  var c = pick(ctxs), start = ri(8, 35), step = pick([2, 3, 4, 5, 6, 8]);
  var labels = ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6"], vals = [], i;
  for (i = 0; i < 6; i++) vals.push(start + step * i);
  var ans = vals[5] + 2 * step;
  var q = numq("The line graph shows " + c.thing + " rising steadily. Assuming the same weekly increase continues, predict the value for Week 8. Give the number only, in " + c.unit + ".",
    ans, 0,
    "\\[ \\begin{aligned} \\text{Weekly increase} &= " + vals[1] + " - " + vals[0] + " = " + step + " \\\\ \\text{Week 8} &= " + vals[5] + " + 2 \\times " + step + " \\\\ &= " + ans + " \\end{aligned} \\] The answer is <b>" + ans + " " + c.unit + "</b>.",
    { start: start, step: step, ans: ans });
  q.figure = u4LineFig(labels, vals, u4NiceMax(ans), c.y, "Week");
  return q;
}, ["A steady trend extends by the same increase for each extra step.", "Work out the increase per week, then add it once for each week beyond the last point."]);

E("u4-cr-percent-change", 4, ["6.7", "6.3"], 3, "gen", function () {
  var ctxs = [
    { thing: "monthly sales at a craft shop in Trinity before and after a ferry route reopened", labels: ["Before", "After"], unit: "items sold" },
    { thing: "weekly riders on a shuttle in Corner Brook before and after a schedule change", labels: ["Before", "After"], unit: "riders" },
    { thing: "daily orders at a bakery in Bay Roberts before and after a new sign went up", labels: ["Before", "After"], unit: "orders" }
  ];
  var c = pick(ctxs);
  var a = pick([40, 50, 60, 80, 100, 120, 160, 200]);
  var pct = pick([10, 20, 25, 40, 50, 60]);
  var b = a * (1 + pct / 100);
  var base = Math.round(a * 0.7), yMax = Math.round(b * 1.05) + 2;
  var q = numq("The bar graph shows " + c.thing + ". Its axis starts at " + base + ", so use the labelled values on the scale, " + a + " and " + fmt(b) + ". By what percent did the value increase from Before to After? Give the number only.",
    pct, 0.1,
    "\\[ \\begin{aligned} \\text{Percent increase} &= \\frac{" + fmt(b) + " - " + a + "}{" + a + "} \\times 100 \\% \\\\ &= " + pct + "\\% \\end{aligned} \\] The answer is <b>" + pct + "%</b>.",
    { a: a, b: b, pct: pct });
  q.figure = u4BarFig(c.labels, [a, b], yMax, c.unit, "", base);
  return q;
}, ["Read the values off the scale rather than judging the bar heights, since the axis is cut.", "Subtract to get the increase, divide by the starting value, and multiply by 100."]);

/* ----- bank-u5.js ----- */
// Math 2202 Unit 5 Budgets question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 2438 to 2925).
// CRMARKS: u5-cr-total-expenses=2
// CRMARKS: u5-cr-budget-balance=2
// CRMARKS: u5-cr-category-percent=2
// CRMARKS: u5-cr-week-record-total=3
// CRMARKS: u5-cr-modify-budget=3
// CRMARKS: u5-cr-what-if-balance=3
// CRMARKS: u5-cr-goal-after-change=2
// CRMARKS: u5-cr-max-wants-spending=3
/* ===== Unit 5 ===== */
/* Unit 5 (Budgets) bank for Mathematics 2202 Review. Codes 1.1 to 1.6.
   All money is handled in integer cents so totals are exact to the cent. */
function u5M(c){ var neg=c<0; var a=Math.abs(Math.round(c)); var d=Math.floor(a/100); var r=a%100; var ds=String(d).replace(/\B(?=(\d{3})+(?!\d))/g,","); return (neg?"-":"")+"$"+ds+"."+(r<10?"0":"")+r; }
function u5PctTxt(p){ return fmtF(Math.round(p*10)/10,1)+"%"; }
var u5Names=["Alex","Maya","Jordan","Priya","Sam","Taylor","Noah","Emma","Liam","Zoe"];
function u5BarFig(title,labels,valsC){
  var max=1; valsC.forEach(function(v){ if(v>max)max=v; });
  var H=labels.length*30+34, s='<svg viewBox="0 0 340 '+H+'" xmlns="http://www.w3.org/2000/svg" role="img">';
  s+='<text x="170" y="16" font-size="13" font-weight="bold" fill="'+FIG_INK+'" text-anchor="middle">'+title+'</text>';
  for(var i=0;i<labels.length;i++){
    var y=26+i*30, w=Math.max(4,Math.round(valsC[i]/max*160));
    s+='<text x="88" y="'+(y+13)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">'+labels[i]+'</text>';
    s+='<rect x="94" y="'+y+'" width="'+w+'" height="18" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    s+='<text x="'+(100+w)+'" y="'+(y+13)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">'+u5M(valsC[i])+'</text>';
  }
  return s+'</svg>';
}
function u5Budget(){
  var inc=ri(2000,3800)*100;
  var exps=[
    {label:"Housing", c:ri(800,1400)*100},
    {label:"Food", c:ri(300,650)*100},
    {label:"Transport", c:ri(120,350)*100},
    {label:"Phone and internet", c:ri(70,150)*100},
    {label:"Other spending", c:ri(100,400)*100}
  ];
  var tot=0; exps.forEach(function(e){ tot+=e.c; });
  return {inc:inc, exps:exps, tot:tot, bal:inc-tot};
}
function u5ExpList(exps){ return exps.map(function(e){ return e.label.toLowerCase()+" "+u5M(e.c); }).join(", "); }
function u5MoneyOpts(correctC,errs){
  /* errs: [{v: cents, fb: string}]; guarantees 3 distinct distractor texts */
  var seen={}; seen[correctC]=1; var out=[];
  errs.forEach(function(e){
    var v=Math.round(e.v), guard=0;
    while((seen[v]||v===correctC)&&guard<60){ v+=1000; guard++; }
    seen[v]=1; out.push({t:u5M(v), fb:e.fb});
  });
  return out;
}

/* ---------- Level 1 MC ---------- */

E("u5-classify-item", 5, ["1.1"], 1, "gen", function(){
  var pools=[
    {kind:"Income", items:[
      {t:"monthly pay from a part time job at a grocery store", lo:700, hi:1600},
      {t:"monthly pay from weekend shifts at a hardware store", lo:500, hi:1400},
      {t:"tips earned in one month serving at a cafe", lo:120, hi:480},
      {t:"money earned in one month clearing snow for neighbours", lo:150, hi:600},
      {t:"monthly pay from a job at a recreation centre", lo:800, hi:1900}]},
    {kind:"Fixed expense", items:[
      {t:"monthly rent for an apartment", lo:750, hi:1450},
      {t:"a monthly car insurance payment", lo:110, hi:260},
      {t:"a monthly phone plan payment", lo:45, hi:95},
      {t:"a monthly internet payment", lo:60, hi:120},
      {t:"a monthly bus pass", lo:65, hi:110},
      {t:"a monthly gym membership payment", lo:30, hi:75}]},
    {kind:"Variable expense", items:[
      {t:"groceries bought during the month", lo:240, hi:680},
      {t:"gasoline bought during the month", lo:90, hi:320},
      {t:"an electricity bill for the month", lo:80, hi:240},
      {t:"takeout meals bought during the month", lo:40, hi:220},
      {t:"clothing bought during the month", lo:35, hi:260},
      {t:"household supplies bought during the month", lo:30, hi:180}]},
    {kind:"Unexpected expense", items:[
      {t:"a car repair after an unexpected breakdown", lo:220, hi:950},
      {t:"replacing a phone with a broken screen", lo:150, hi:520},
      {t:"an emergency visit to a veterinarian", lo:130, hi:640},
      {t:"a plumbing repair after a pipe leaked", lo:200, hi:880}]}
  ];
  var defs={
    "Income":"Income is money coming in, such as pay or tips.",
    "Fixed expense":"A fixed expense is a regular payment that stays about the same each month.",
    "Variable expense":"A variable expense is a payment that changes from month to month.",
    "Unexpected expense":"An unexpected expense is an unplanned cost, such as a repair."
  };
  var cat=pick(pools), item=pick(cat.items), amtC=ri(item.lo,item.hi)*100, name=pick(u5Names);
  var distractors=[];
  Object.keys(defs).forEach(function(k){
    if(k!==cat.kind) distractors.push({t:k, fb:defs[k]+" This item does not fit that description."});
  });
  return mcq(name+" is building a personal budget. For one month, the budget lists "+item.t+", "+u5M(amtC)+". How should this item be classified?",
    {t:cat.kind, fb:"Yes. "+defs[cat.kind]+" This item matches that description."}, distractors,
    defs[cat.kind]+" The item listed is "+item.t+", so it belongs in the budget as <b>"+cat.kind.toLowerCase()+"</b>.",
    {kind:cat.kind, amt:amtC});
}, ["First decide whether money is coming in or going out, then whether the amount is regular, changing, or unplanned.", "Ask whether this item would appear at about the same amount every month, change each month, be a surprise, or be money earned."]);

E("u5-budget-considerations", 5, ["1.2"], 1, "var", varset([
  function(){ return mcq("Riley is making a first monthly budget. Which step should come first?",
    {t:"List the monthly income, then list regular expenses and needs", fb:"Yes. A budget starts from the money coming in and the costs that must be covered."},
    [{t:"Choose the fun purchases for the month first of all", fb:"Wants are planned after income and needs are known, not before."},
     {t:"Spend as usual and write down what is left over at the end", fb:"That tracks spending after the fact. A budget plans ahead."},
     {t:"Leave out small regular costs to keep it simple, and round the rest", fb:"Small regular costs add up and belong in the budget."}],
    "A budget is built by starting with income, then covering regular expenses and needs, and then planning other spending. The first step is <b>listing income, then regular expenses and needs</b>.", {}); },
  function(){ return mcq("Which of these is an unexpected expense in a monthly budget?",
    {t:"A car repair after a breakdown", fb:"Yes. A breakdown is unplanned, so the repair is an unexpected expense."},
    [{t:"Rent due on the first of the month", fb:"Rent is a regular, expected cost."},
     {t:"A monthly phone plan payment", fb:"A phone plan payment is a regular, expected cost."},
     {t:"A monthly bus pass", fb:"A bus pass is a regular, expected cost."}],
    "An unexpected expense is a cost that was not planned for. A car repair after a breakdown fits, while rent, a phone plan and a bus pass are regular costs. The answer is <b>a car repair after a breakdown</b>.", {}); },
  function(){ return mcq("Why does a good budget include an amount for unexpected expenses?",
    {t:"So a surprise cost does not force missed bills or new borrowing", fb:"Yes. Planning a cushion keeps one surprise from breaking the whole budget."},
    [{t:"So every dollar of income is spent on shopping, with nothing saved", fb:"The cushion is kept aside for surprises, not spent on shopping."},
     {t:"So fixed bills no longer need to be paid at all any more", fb:"Fixed bills still must be paid. The cushion protects those payments."},
     {t:"So the budget never needs to be checked again at all", fb:"Budgets still need regular checking. The cushion handles surprise costs."}],
    "Unexpected costs, such as repairs, happen even in a careful plan. Setting money aside for them means a surprise does not force missed bills or new borrowing. The answer is <b>to protect the budget from surprise costs</b>.", {}); },
  function(){ return mcq("In a budget, prioritizing means:",
    {t:"Paying needs and important bills before optional spending", fb:"Yes. Prioritizing puts needs and bills first, then wants."},
    [{t:"Paying for optional spending before the bills arrive in the mail", fb:"That reverses the priority. Bills and needs come first."},
     {t:"Giving every budget category the same amount", fb:"Categories get amounts based on need, not equal amounts."},
     {t:"Removing savings from the budget completely", fb:"Prioritizing does not remove savings. It orders what gets paid first."}],
    "Prioritizing means ranking what the money must do first. Needs and important bills are paid before optional spending. The answer is <b>paying needs and bills before optional spending</b>.", {}); },
  function(){ return mcq("Which of these is a recurring expense in a monthly budget?",
    {t:"Rent, which is due every month", fb:"Yes. Rent repeats every month, so it is a recurring expense."},
    [{t:"A one time repair to a bicycle", fb:"A one time repair does not repeat each month."},
     {t:"A birthday gift of money received", fb:"Money received is income, not an expense."},
     {t:"A single payment to replace a lost wallet", fb:"That is a one time cost, not a repeating one."}],
    "A recurring expense repeats on a regular schedule. Rent is due every month, so it is recurring. The answer is <b>rent, which is due every month</b>.", {}); },
  function(){ return mcq("Sam's income changes from month to month because the work shifts vary. What is the safest way to build the monthly budget?",
    {t:"Base it on a lower typical month and move extra money to savings in better months", fb:"Yes. Planning on a lower month keeps bills covered when income dips."},
    [{t:"Base it on the best month of the year and assume the pay stays at that level", fb:"Spending planned for the best month will not fit in a lower month."},
     {t:"Plan as if there is no income at all, so nothing at all can be planned", fb:"That ignores the regular income that does arrive."},
     {t:"Stop budgeting until the income is steady, and just spend as usual in the meantime", fb:"A changing income makes planning more important, not less."}],
    "When income varies, the safe base is a lower typical month, so regular costs stay covered. Extra money in a better month can go to savings. The answer is <b>basing the budget on a lower typical month</b>.", {}); }
]), ["Think about what a budget must do: cover needs first and still work when something unplanned happens.", "Sort each option by whether it plans ahead, protects the bills, or only deals with spending after it happens."]);

E("u5-need-or-want", 5, ["1.1","1.2"], 1, "gen", function(){
  var pools=[
    {kind:"A need", items:[
      {t:"basic groceries for meals at home", lo:240, hi:650},
      {t:"rent for housing", lo:750, hi:1400},
      {t:"a bus pass needed to get to work", lo:65, hi:110},
      {t:"prescription medicine", lo:25, hi:180},
      {t:"winter boots needed for an outdoor job", lo:90, hi:220},
      {t:"a basic phone plan needed for work calls", lo:40, hi:85}]},
    {kind:"A want", items:[
      {t:"tickets to a concert", lo:50, hi:180},
      {t:"a new video game", lo:60, hi:110},
      {t:"designer sneakers when a good pair already fits", lo:120, hi:280},
      {t:"a weekend trip with friends", lo:200, hi:550},
      {t:"takeout meals three times a week", lo:120, hi:300},
      {t:"a larger TV when the current TV still works", lo:350, hi:900}]}
  ];
  var cat=pick(pools), item=pick(cat.items), amtC=ri(item.lo,item.hi)*100, name=pick(u5Names);
  var isNeed=(cat.kind==="A need");
  var distractors=[
    {t:isNeed?"A want":"A need", fb:isNeed?"A want is optional spending. This item is required for living or working.":"A need is required for living or working. This item is optional."},
    {t:"Income", fb:"Income is money coming in, such as pay. This item is a cost."},
    {t:"Money set aside as savings", fb:"Savings is money kept for later. This item is a purchase."}
  ];
  return mcq(name+" lists "+item.t+", costing "+u5M(amtC)+", in a monthly budget. Which best describes this item?",
    {t:cat.kind, fb:isNeed?"Yes. This item is required for living or working, so it is a need.":"Yes. This item is optional, so it is a want."}, distractors,
    (isNeed?"A need is something required for living or working. ":"A want is something optional that a person would like to have. ")+"The item listed is "+item.t+", so it is <b>"+cat.kind.toLowerCase()+"</b>.",
    {kind:cat.kind, amt:amtC});
}, ["Ask whether the person must have this item to live or work, or whether it is optional.", "If the item is required, it is a need. If the person could skip it and still manage, it is a want."]);

/* ---------- Level 2 MC (deep generators) ---------- */

E("u5-budget-totals-mc", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget(), mode=ri(0,1), guard=0;
  while(mode===1 && b.bal===0 && guard<20){ b=u5Budget(); guard++; }
  var prompt=name+" has a monthly income of "+u5M(b.inc)+". The monthly expenses are: "+u5ExpList(b.exps)+". ";
  var q;
  if(mode===0){
    var smallest=Math.min.apply(null,b.exps.map(function(e){return e.c;}));
    var opts=u5MoneyOpts(b.tot,[
      {v:b.tot-smallest, fb:"This leaves out one of the expense items. Add every expense listed."},
      {v:b.tot-b.exps[0].c, fb:"This leaves out the housing cost. Housing is part of the total."},
      {v:b.inc+b.tot, fb:"This adds the income to the expenses. The question asks for expenses only."}]);
    q=mcq(prompt+"What are the total monthly expenses?",
      {t:u5M(b.tot), fb:"Yes. Adding all five expenses gives this total."}, opts,
      "Add every expense, in dollars. \\[ \\begin{aligned} \\text{Total expenses} &= "+b.exps.map(function(e){return fmtF(e.c/100,2);}).join(" + ")+" \\\\ &= "+fmtF(b.tot/100,2)+" \\end{aligned} \\] Rounded to the cent, the answer is <b>"+u5M(b.tot)+"</b>.",
      {mode:"total", tot:b.tot});
  } else {
    var opts2=u5MoneyOpts(b.bal,[
      {v:b.tot-b.inc, fb:"This subtracts in the wrong order. The balance is income minus expenses."},
      {v:b.inc-b.exps[0].c, fb:"This subtracts only the housing cost. Subtract all of the expenses."},
      {v:b.inc+b.tot, fb:"This adds income and expenses. The balance is the difference between them."}]);
    q=mcq(prompt+"What is the monthly balance (income minus total expenses)?",
      {t:u5M(b.bal), fb:"Yes. Income minus the total of all expenses gives this balance."}, opts2,
      "First total the expenses, then subtract from the income. \\[ \\begin{aligned} \\text{Total expenses} &= "+fmtF(b.tot/100,2)+" \\\\ \\text{Balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" \\\\ &= "+fmtF(b.bal/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(b.bal)+"</b>.",
      {mode:"balance", bal:b.bal});
  }
  q.figure=u5BarFig("Monthly expenses", b.exps.map(function(e){return e.label;}), b.exps.map(function(e){return e.c;}));
  return q;
}, ["The balance is income minus expenses, so the expense total is needed either way.", "Start by adding all of the expense amounts together."]);

E("u5-percent-of-income-mc", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<60 && !out){
    attempt++;
    var inc=ri(1800,4200)*100, mode=ri(0,2);
    var cats=[{label:"housing", lo:700, hi:1500},{label:"food", lo:280, hi:650},{label:"transport", lo:110, hi:380},{label:"child care", lo:300, hi:800}];
    var c1=pick(cats), a1=ri(c1.lo,c1.hi)*100;
    var c2=pick(cats.filter(function(c){return c.label!==c1.label;}));
    var a2=ri(c2.lo,c2.hi)*100;
    var save=ri(100,500)*100;
    var part, partTxt, prompt, errVals;
    if(mode===0){
      part=a1; partTxt=c1.label;
      prompt=name+" has a monthly income of "+u5M(inc)+". The amount spent on "+c1.label+" is "+u5M(a1)+". What percent of the income is spent on "+c1.label+"?";
      errVals=[
        {p:(inc-a1)/inc*100, fb:"This is the percent of income left after "+c1.label+", not the percent spent on it."},
        {p:a1/(inc+a1)*100, fb:"This divides by the income plus the expense. Divide by the income alone."},
        {p:inc/a1*100, fb:"This divides the income by the expense, which reverses the ratio and gives a value over 100%."}];
    } else if(mode===1){
      part=a1+a2; partTxt=c1.label+" and "+c2.label;
      prompt=name+" has a monthly income of "+u5M(inc)+". The amounts spent are "+u5M(a1)+" on "+c1.label+" and "+u5M(a2)+" on "+c2.label+". What percent of the income is spent on "+c1.label+" and "+c2.label+" combined?";
      errVals=[
        {p:a1/inc*100, fb:"This counts only the "+c1.label+" amount. Add both amounts first."},
        {p:a2/inc*100, fb:"This counts only the "+c2.label+" amount. Add both amounts first."},
        {p:(inc-part)/inc*100, fb:"This is the percent of income left after both costs, not the percent spent on them."}];
    } else {
      part=save; partTxt="savings";
      prompt=name+" has a monthly income of "+u5M(inc)+" and puts "+u5M(save)+" into savings each month. What percent of the income goes into savings?";
      errVals=[
        {p:(inc-save)/inc*100, fb:"This is the percent of income that is not saved, not the percent saved."},
        {p:save/(inc-save)*100, fb:"This divides by the income after saving. Divide by the full income."},
        {p:inc/save*100, fb:"This divides the income by the savings, which reverses the ratio."}];
    }
    var correct=Math.round(part/inc*1000)/10;
    var seen={}; seen[correct]=1; var ok=true; var distractors=[];
    for(var i=0;i<errVals.length;i++){
      var v=Math.round(errVals[i].p*10)/10;
      if(seen[v]||v<=0){ ok=false; break; }
      seen[v]=1; distractors.push({t:u5PctTxt(v), fb:errVals[i].fb});
    }
    if(!ok) continue;
    var sol="Divide the part by the full income, then multiply by 100. \\[ \\begin{aligned} \\text{Percent} &= \\frac{"+fmtF(part/100,2)+"}{"+fmtF(inc/100,2)+"} \\times 100 \\\\ &\\approx "+fmtF(correct,1)+"\\% \\end{aligned} \\] The answer is <b>"+u5PctTxt(correct)+"</b>.";
    out=mcq(prompt, {t:u5PctTxt(correct), fb:"Yes. The part divided by the income, times 100, gives this percent."}, distractors, sol, {mode:mode, pct:correct});
  }
  if(out) return out;
  return mcq("A monthly income is $2,000.00. The amount spent on housing is $800.00. What percent of the income is spent on housing?",
    {t:"40.0%", fb:"Yes. 800 divided by 2000, times 100, is 40.0%."},
    [{t:"60.0%", fb:"This is the percent of income left after housing."},{t:"250.0%", fb:"This reverses the ratio."},{t:"20.0%", fb:"This uses half of the housing amount."}],
    "Divide the part by the full income, then multiply by 100: 800 divided by 2000 times 100 is 40.0%. The answer is <b>40.0%</b>.", {mode:0, pct:40});
}, ["A percent of income is the part divided by the income, times 100.", "Write the amounts as a fraction with the category amount on top and the income on the bottom."]);

E("u5-week-spending-mc", 5, ["1.4"], 2, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<60 && !out){
    attempt++;
    var food=[
      {d:"Monday", t:"groceries", c:ri(2400,9200)},
      {d:"Wednesday", t:"lunch at a cafe", c:ri(950,2400)},
      {d:"Friday", t:"groceries", c:ri(1800,7600)},
      {d:"Saturday", t:"snacks for a movie night at home", c:ri(800,3200)}];
    var trans=[
      {d:"Tuesday", t:"bus fares", c:ri(300,1200)},
      {d:"Thursday", t:"gasoline", c:ri(2800,8200)}];
    var fun=[
      {d:"Friday", t:"a movie ticket", c:ri(1100,1900)},
      {d:"Sunday", t:"a video game rental", c:ri(500,1500)}];
    var all=food.concat(trans).concat(fun);
    var sumF=0; food.forEach(function(e){sumF+=e.c;});
    var sumT=0; trans.forEach(function(e){sumT+=e.c;});
    var sumFun=0; fun.forEach(function(e){sumFun+=e.c;});
    var total=sumF+sumT+sumFun;
    var list=all.map(function(e){ return e.d+": "+e.t+", "+u5M(e.c); }).join("; ")+".";
    var mode=ri(0,2), prompt, correctC, errs, solHead, solParts;
    if(mode===0){
      prompt=name+" recorded one week of spending. "+list+" What was the total spent on food (groceries, lunch and snacks)?";
      correctC=sumF; solHead="Add only the food items: groceries, lunch and snacks.";
      solParts=food.map(function(e){return fmtF(e.c/100,2);});
      errs=[{v:sumF-food[1].c, fb:"This leaves out the cafe lunch, which is a food cost."},
            {v:total, fb:"This is the total for the whole week, including transport and fun spending."},
            {v:sumF+sumT, fb:"This adds the transport costs to the food costs."}];
    } else if(mode===1){
      prompt=name+" recorded one week of spending. "+list+" What was the total spent during the week?";
      correctC=total; solHead="Add every item recorded during the week.";
      solParts=all.map(function(e){return fmtF(e.c/100,2);});
      errs=[{v:sumF, fb:"This counts only the food items. Add transport and fun spending as well."},
            {v:total-fun[0].c-fun[1].c, fb:"This leaves out the fun spending. It is part of the week total."},
            {v:total+trans[1].c, fb:"This counts the gasoline cost twice."}];
    } else {
      prompt=name+" recorded one week of spending. "+list+" What was the total spent on transport and fun activities combined?";
      correctC=sumT+sumFun; solHead="Add the transport items and the fun items, and leave out the food items.";
      solParts=trans.concat(fun).map(function(e){return fmtF(e.c/100,2);});
      errs=[{v:sumT, fb:"This counts only transport. Add the fun activities as well."},
            {v:sumFun, fb:"This counts only the fun activities. Add transport as well."},
            {v:total, fb:"This includes the food costs, which the question does not ask for."}];
    }
    var vals=[correctC].concat(errs.map(function(e){return e.v;}));
    var uniq={}; var dup=false;
    vals.forEach(function(v){ if(uniq[v]) dup=true; uniq[v]=1; });
    if(dup) continue;
    var distractors=errs.map(function(e){ return {t:u5M(e.v), fb:e.fb}; });
    var q=mcq(prompt, {t:u5M(correctC), fb:"Yes. Adding the matching items gives this total."}, distractors,
      solHead+" \\[ \\begin{aligned} \\text{Total} &= "+solParts.join(" + ")+" \\\\ &= "+fmtF(correctC/100,2)+" \\end{aligned} \\] Rounded to the cent, the answer is <b>"+u5M(correctC)+"</b>.",
      {mode:mode, tot:correctC});
    q.figure=u5BarFig("Week spending by category", ["Food","Transport","Fun"], [sumF,sumT,sumFun]);
    out=q;
  }
  if(out) return out;
  return mcq("One week of spending: Monday: groceries, $40.00; Tuesday: bus fares, $6.00. What was the total spent on food?",
    {t:"$40.00", fb:"Yes. The groceries are the only food item."},
    [{t:"$46.00", fb:"This adds the bus fares, which are transport."},{t:"$6.00", fb:"This is the transport cost, not food."},{t:"$34.00", fb:"This subtracts the fares from the groceries."}],
    "Add only the food items. The groceries are the only food cost, so the total is $40.00. The answer is <b>$40.00</b>.", {mode:0});
}, ["First sort the records into categories, then add only the items the question asks about.", "Go through the list one item at a time and mark which category each item belongs to."]);

/* ---------- Level 3 MC (generators) ---------- */

E("u5-modify-for-goal-mc", 5, ["1.5","1.3"], 3, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<80 && !out){
    attempt++;
    var b=u5Budget();
    var goal=ri(200,550)*100;
    if(b.bal>=goal) continue;
    var need=goal-b.bal;
    var cand=[goal, goal-2*b.bal, Math.abs(b.bal)];
    var vals=[need].concat(cand); var seen={}; var bad=false;
    vals.forEach(function(v){ if(v<=0||seen[v]) bad=true; seen[v]=1; });
    if(bad) continue;
    var prompt=name+" has a monthly income of "+u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". "+name+" wants to save "+u5M(goal)+" each month. By how much must monthly spending be reduced to reach that saving goal?";
    out=mcq(prompt,
      {t:u5M(need), fb:"Yes. The goal minus the current balance is the extra amount that must be freed."},
      [{t:u5M(cand[0]), fb:"This is the full goal. It ignores the balance the budget already has, whether it is a surplus or a shortfall."},
       {t:u5M(cand[1]), fb:"This counts the current balance twice. Use the goal minus the balance, once."},
       {t:u5M(cand[2]), fb:"This is just the size of the current balance. The cut must close the gap between the balance and the goal."}],
      "Find the current balance, then the gap to the goal. \\[ \\begin{aligned} \\text{Balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{Extra saving needed} &= "+fmtF(goal/100,2)+" - ("+fmtF(b.bal/100,2)+") \\\\ &= "+fmtF(need/100,2)+" \\end{aligned} \\] Spending must be reduced by <b>"+u5M(need)+"</b> per month.",
      {need:need, goal:goal, bal:b.bal});
  }
  if(out) return out;
  return mcq("A monthly budget has an income of $2,600.00 and total expenses of $2,500.00. The goal is to save $300.00 each month. By how much must monthly spending be reduced?",
    {t:"$200.00", fb:"Yes. The current balance is $100.00, so another $200.00 must be freed."},
    [{t:"$300.00", fb:"This is the full goal and ignores the current balance."},{t:"$100.00", fb:"This is the current balance, not the extra cut needed."},{t:"$400.00", fb:"This counts the current balance the wrong way."}],
    "The balance is 2600 minus 2500, which is 100. The gap to the goal is 300 minus 100, which is 200. Spending must be reduced by <b>$200.00</b>.", {need:20000});
}, ["Work out the current balance first. The cut needed is the gap between that balance and the saving goal.", "Start with income minus total expenses to find what the budget already saves or overspends."]);

E("u5-what-if-mc", 5, ["1.6","1.3"], 3, "gen", function(){
  var name=pick(u5Names), b=u5Budget(), mode=ri(0,3);
  var changeC, changeTxt, promptBase=name+" has a monthly income of "+u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". The current balance is "+u5M(b.bal)+". ";
  var housing=b.exps[0].c;
  if(mode===0){
    var p=pick([10,15,20,25]); changeC=Math.round(b.inc*p/100);
    changeTxt="the income drops by "+p+"% (a loss of "+u5M(changeC)+")";
  } else if(mode===1){
    changeC=ri(40,180)*100;
    changeTxt="the housing cost rises by "+u5M(changeC);
  } else if(mode===2){
    changeC=ri(100,420)*100;
    changeTxt="the income drops by "+u5M(changeC)+" because fewer shifts are worked";
  } else {
    var p2=pick([5,10,15,20]); changeC=Math.round(housing*p2/100);
    changeTxt="the housing cost rises by "+p2+"% (an increase of "+u5M(changeC)+")";
  }
  var newBal=b.bal-changeC;
  var opts=u5MoneyOpts(newBal,[
    {v:b.bal, fb:"This is the old balance. It ignores the change described in the question."},
    {v:b.bal+changeC, fb:"This moves the balance the wrong way. The change makes the balance smaller, not larger."},
    {v:b.bal-2*changeC, fb:"This applies the change twice. Apply it once."}]);
  return mcq(promptBase+"What if "+changeTxt+" and nothing else changes? What is the new monthly balance?",
    {t:u5M(newBal), fb:"Yes. The new balance is the old balance minus the size of the change."}, opts,
    "The change reduces the balance by "+u5M(changeC)+". \\[ \\begin{aligned} \\text{New balance} &= "+fmtF(b.bal/100,2)+" - "+fmtF(changeC/100,2)+" \\\\ &= "+fmtF(newBal/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(newBal)+"</b>.",
    {mode:mode, newBal:newBal, change:changeC});
}, ["Find the size of the change in dollars, then apply it to the current balance once.", "Start by working out how many dollars the income drop or expense rise is worth."]);

/* ---------- Constructed response (numq) ---------- */

E("u5-cr-total-expenses", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget();
  return numq(name+" is creating a budget. The monthly expenses are: "+u5ExpList(b.exps)+". What are the total monthly expenses, in dollars?",
    b.tot/100, 0.01,
    "Add all five expenses. \\[ \\begin{aligned} \\text{Total expenses} &= "+b.exps.map(function(e){return fmtF(e.c/100,2);}).join(" + ")+" \\\\ &= "+fmtF(b.tot/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(b.tot)+"</b>.",
    {tot:b.tot});
}, ["Add every expense category, including the small ones.", "Start by adding the two largest expenses, then add the rest one at a time."]);

E("u5-cr-budget-balance", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget(), guard=0;
  while((b.bal<2000||b.bal>45000)&&guard<60){ b=u5Budget(); guard++; }
  return numq(name+" has a monthly income of "+u5M(b.inc)+". The monthly expenses are: "+u5ExpList(b.exps)+". What is the monthly balance, in dollars? (Income minus total expenses.)",
    b.bal/100, 0.01,
    "Total the expenses, then subtract from the income. \\[ \\begin{aligned} \\text{Total expenses} &= "+fmtF(b.tot/100,2)+" \\\\ \\text{Balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" \\\\ &= "+fmtF(b.bal/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(b.bal)+"</b>.",
    {bal:b.bal});
}, ["The balance compares the money coming in with the money going out.", "Start by adding all of the expenses to get one total."]);

E("u5-cr-category-percent", 5, ["1.3"], 2, "gen", function(){
  var name=pick(u5Names);
  var inc=ri(1900,4200)*100, house=ri(700,1500)*100;
  var pct=Math.round(house/inc*1000)/10;
  return numq(name+" has a monthly income of "+u5M(inc)+" and pays "+u5M(house)+" for housing. What percent of the income is spent on housing? Give your answer as a percent, to the nearest tenth of a percent.",
    pct, 0.6,
    "Divide the housing cost by the income, then multiply by 100. \\[ \\begin{aligned} \\text{Percent} &= \\frac{"+fmtF(house/100,2)+"}{"+fmtF(inc/100,2)+"} \\times 100 \\\\ &\\approx "+fmtF(pct,1)+"\\% \\end{aligned} \\] The answer is <b>"+u5PctTxt(pct)+"</b>.",
    {pct:pct});
}, ["A percent of income is a part divided by the whole income, times 100.", "Start by writing the housing cost over the income as a fraction."]);

E("u5-cr-week-record-total", 5, ["1.4"], 2, "gen", function(){
  var name=pick(u5Names);
  var recs=[
    {d:"Monday", t:"groceries", cat:"food", c:ri(2600,9400)},
    {d:"Tuesday", t:"bus fares", cat:"transport", c:ri(300,1250)},
    {d:"Wednesday", t:"sandwiches from a deli", cat:"food", c:ri(850,2600)},
    {d:"Thursday", t:"gasoline", cat:"transport", c:ri(3000,8400)},
    {d:"Friday", t:"groceries", cat:"food", c:ri(1900,7800)},
    {d:"Saturday", t:"a concert ticket", cat:"fun", c:ri(4200,9800)},
    {d:"Sunday", t:"fruit and snacks", cat:"food", c:ri(700,3400)}];
  var foodC=0, foodParts=[];
  recs.forEach(function(r){ if(r.cat==="food"){ foodC+=r.c; foodParts.push(fmtF(r.c/100,2)); } });
  var list=recs.map(function(r){ return r.d+": "+r.t+", "+u5M(r.c); }).join("; ")+".";
  return numq(name+" kept a one week spending record to help build a budget. "+list+" What was the total spent on food during the week, in dollars?",
    foodC/100, 0.01,
    "Sort the record first: the food items are the groceries on Monday, the sandwiches, the groceries on Friday, and the fruit and snacks. \\[ \\begin{aligned} \\text{Food total} &= "+foodParts.join(" + ")+" \\\\ &= "+fmtF(foodC/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(foodC)+"</b>.",
    {food:foodC});
}, ["Sort each record into a category first, then add only the category asked for.", "Go through the week one day at a time and mark each item as food, transport, or fun."]);

E("u5-cr-modify-budget", 5, ["1.5"], 2, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<80 && !out){
    attempt++;
    var b=u5Budget();
    var months=pick([4,5,6,8,10,12]);
    var monthlyGoal=ri(150,400)*100;
    if(b.bal>=monthlyGoal) continue;
    var totalGoal=monthlyGoal*months;
    var need=monthlyGoal-b.bal;
    out=numq(name+" wants to save "+u5M(totalGoal)+" in "+months+" months. The current monthly budget has an income of "+u5M(b.inc)+" and total monthly expenses of "+u5M(b.tot)+". By how much, in dollars, must monthly spending be reduced so the goal is reached on time?",
      need/100, 0.01,
      "Work out the saving needed each month, then compare it with the current balance. \\[ \\begin{aligned} \\text{Saving needed per month} &= "+fmtF(totalGoal/100,2)+" \\div "+months+" = "+fmtF(monthlyGoal/100,2)+" \\\\ \\text{Current balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{Extra reduction} &= "+fmtF(monthlyGoal/100,2)+" - ("+fmtF(b.bal/100,2)+") = "+fmtF(need/100,2)+" \\end{aligned} \\] Monthly spending must be reduced by <b>"+u5M(need)+"</b>.",
      {need:need, months:months});
  }
  if(out) return out;
  return numq("A saver wants to save $1,800.00 in 6 months. The current monthly budget has an income of $2,600.00 and total monthly expenses of $2,500.00. By how much, in dollars, must monthly spending be reduced so the goal is reached on time?",
    200, 0.01,
    "Saving needed per month is 1800 divided by 6, which is 300. The current balance is 2600 minus 2500, which is 100. The extra reduction is 300 minus 100, which is 200. Monthly spending must be reduced by <b>$200.00</b>.", {need:20000});
}, ["Split the goal across the months first, then compare that monthly target with what the budget already saves.", "Start by dividing the total goal by the number of months."]);

E("u5-cr-what-if-balance", 5, ["1.6"], 2, "gen", function(){
  var name=pick(u5Names), b=u5Budget();
  var drop=ri(80,350)*100, rise=ri(25,150)*100;
  var newBal=b.bal-drop-rise;
  return numq(name+" has a monthly income of "+u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". Next month the income drops by "+u5M(drop)+" and the food cost rises by "+u5M(rise)+", with nothing else changing. What is the new monthly balance, in dollars?",
    newBal/100, 0.01,
    "Find the current balance, then apply both changes once. \\[ \\begin{aligned} \\text{Current balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{New balance} &= "+fmtF(b.bal/100,2)+" - "+fmtF(drop/100,2)+" - "+fmtF(rise/100,2)+" \\\\ &= "+fmtF(newBal/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(newBal)+"</b>.",
    {newBal:newBal, drop:drop, rise:rise});
}, ["Both changes make the balance smaller: one brings in less money and the other spends more.", "Start by finding the current balance from the income and the expense total."]);

E("u5-cr-goal-after-change", 5, ["1.5","1.6"], 3, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<80 && !out){
    attempt++;
    var b=u5Budget();
    var drop=ri(100,400)*100;
    var newBal=b.bal-drop;
    var goal=ri(200,500)*100;
    if(newBal>=goal) continue;
    var need=goal-newBal;
    out=numq(name+" has a monthly income of "+u5M(b.inc)+" and monthly expenses of: "+u5ExpList(b.exps)+". Work hours are cut, so the income will drop by "+u5M(drop)+" per month. "+name+" still wants to save "+u5M(goal)+" each month. By how much, in dollars, must monthly spending be reduced to reach the saving goal after the income drop?",
      need/100, 0.01,
      "Apply the income drop to the balance first, then find the gap to the goal. \\[ \\begin{aligned} \\text{Current balance} &= "+fmtF(b.inc/100,2)+" - "+fmtF(b.tot/100,2)+" = "+fmtF(b.bal/100,2)+" \\\\ \\text{Balance after the drop} &= "+fmtF(b.bal/100,2)+" - "+fmtF(drop/100,2)+" = "+fmtF(newBal/100,2)+" \\\\ \\text{Reduction needed} &= "+fmtF(goal/100,2)+" - ("+fmtF(newBal/100,2)+") = "+fmtF(need/100,2)+" \\end{aligned} \\] Monthly spending must be reduced by <b>"+u5M(need)+"</b>.",
      {need:need, newBal:newBal});
  }
  if(out) return out;
  return numq("A monthly budget has an income of $2,600.00 and total expenses of $2,500.00. The income will drop by $200.00 per month, and the goal is still to save $300.00 each month. By how much, in dollars, must monthly spending be reduced?",
    400, 0.01,
    "The current balance is 100. After the drop it is -100. The gap to the goal is 300 minus -100, which is 400. Monthly spending must be reduced by <b>$400.00</b>.", {need:40000});
}, ["Update the balance for the income change first. The spending cut then has to close the gap between the new balance and the goal.", "Start with income minus total expenses, then subtract the income drop."]);

E("u5-cr-max-wants-spending", 5, ["1.3","1.5","1.6"], 3, "gen", function(){
  var name=pick(u5Names), attempt=0, out=null;
  while(attempt<80 && !out){
    attempt++;
    var inc=ri(2200,3600)*100;
    var p=pick([4,5,6,8,10]);
    var newInc=inc+Math.round(inc*p/100);
    var needs=[
      {label:"Housing", c:ri(800,1350)*100},
      {label:"Food", c:ri(300,600)*100},
      {label:"Transport", c:ri(120,320)*100},
      {label:"Phone and internet", c:ri(70,150)*100}];
    var needTot=0; needs.forEach(function(e){ needTot+=e.c; });
    var goal=ri(200,450)*100;
    var maxWants=newInc-needTot-goal;
    if(maxWants<5000||maxWants>70000) continue;
    out=numq(name+" earns "+u5M(inc)+" per month and will get a raise of "+p+"%. The monthly needs are: "+u5ExpList(needs)+". "+name+" wants to save "+u5M(goal)+" each month after the raise. What is the most, in dollars, that can be spent on wants each month after the raise while still covering the needs and the saving goal?",
      maxWants/100, 0.01,
      "Find the new income, total the needs, then subtract the needs and the saving goal. \\[ \\begin{aligned} \\text{New income} &= "+fmtF(inc/100,2)+" \\times 1."+(p<10?"0":"")+p+" = "+fmtF(newInc/100,2)+" \\\\ \\text{Total needs} &= "+fmtF(needTot/100,2)+" \\\\ \\text{Most for wants} &= "+fmtF(newInc/100,2)+" - "+fmtF(needTot/100,2)+" - "+fmtF(goal/100,2)+" \\\\ &= "+fmtF(maxWants/100,2)+" \\end{aligned} \\] The answer is <b>"+u5M(maxWants)+"</b>.",
      {maxWants:maxWants, newInc:newInc});
  }
  if(out) return out;
  return numq("A worker earns $2,500.00 per month and will get a raise of 10%. Monthly needs total $1,900.00 and the saving goal is $300.00 per month. What is the most, in dollars, that can be spent on wants each month after the raise?",
    550, 0.01,
    "The new income is 2500 times 1.10, which is 2750. Subtract the needs and the goal: 2750 minus 1900 minus 300 is 550. The answer is <b>$550.00</b>.", {maxWants:55000});
}, ["Wants get whatever is left after the new income covers the needs and the saving goal.", "Start by applying the raise to find the new monthly income."]);

/* ----- bank-u6.js ----- */
// Math 2202 Unit 6 Banking question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 2926 to 3648).
// CRMARKS: u6-simple-interest-solve=2
// CRMARKS: u6-compound-future-value=2
// CRMARKS: u6-atm-total-charges=2
// CRMARKS: u6-credit-interest-cost=3
// CRMARKS: u6-payday-loan-cost=3
// CRMARKS: u6-promo-deferred-interest=3
// CRMARKS: u6-compound-solve-periods=2
// CRMARKS: u6-credit-plan-savings=3
/* ===== Unit 6 ===== */
/* Unit 6 Banking (Math 2202). Helpers prefixed u6. */
function u6d(x){var s=(Math.round(x*100)/100).toFixed(2);var p=s.split(".");p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return "$"+p.join(".");}
function u6names(){return pick(["Maya","Liam","Sofia","Noah","Emma","Lucas","Ava","Ethan","Mia","Chloe","Ben","Ruby"]);}
function u6goal(){return pick(["a used car","a furnace repair","tuition fees","a snowmobile","a laptop for work","a wedding","a fishing boat motor","a home renovation"]);}

E("u6-simple-interest-basic", 6, ["1.7"], 1, "gen", function(){
  var P=pick([400,500,600,800,1000,1200,1500,1800,2000,2500,3000]);
  var r=pick([2,2.5,3,3.5,4,4.5,5,6]);
  var t=ri(2,5);
  var I=P*r/100*t, oneYr=P*r/100, extraYr=I+oneYr, FV=P+I;
  var prompt=u6names()+" invests "+u6d(P)+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years. How much interest is earned?";
  var sol="Use \\(I = Prt\\) with the rate written as a decimal. \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" \\\\ &= "+fmt(I)+" \\end{aligned} \\] Rounded to the cent, the interest earned is <b>"+u6d(I)+"</b>.";
  return mcq(prompt,
    {t:u6d(I), fb:"Correct: "+u6d(P)+" times "+fmt(r/100,4)+" times "+t+" years gives "+u6d(I)+"."},
    [{t:u6d(FV), fb:"That is the final value. It adds the principal back in, but the question asks for interest only."},
     {t:u6d(oneYr), fb:"That is the interest for one year only. The money is invested for "+t+" years."},
     {t:u6d(extraYr), fb:"That charges for one year too many. The term is "+t+" years."}],
    sol, {mode:"I", P:P, r:r, t:t});
}, ["Use the simple interest formula I = Prt from the formula sheet.", "First change the percent rate to a decimal, then multiply principal, rate and time."]);

E("u6-banking-services", 6, ["1.11"], 1, "var", varset([
  function(){ return mcq("Which option describes a service offered by most financial institutions?",
    {t:"Accepting payroll deposits and paying bills from an account", fb:"Correct: deposits and bill payments are core banking services."},
    [{t:"Repairing a car after an accident, at a garage in town", fb:"That is a service of a garage or an insurer, not a bank service."},
     {t:"Issuing a driver licence at a government service office in town", fb:"Licences are issued by a government office, not a financial institution."},
     {t:"Delivering mail to homes along a daily postal route", fb:"Mail delivery is a postal service, not a banking service."}],
    "Financial institutions accept deposits, move money and pay bills for customers. The service described is <b>accepting payroll deposits and paying bills from an account</b>.", {}); },
  function(){ return mcq("Jae wants to send money to his sister in another province on the same day. Which bank service fits this need?",
    {t:"An e-transfer sent through online or mobile banking", fb:"Correct: an e-transfer moves money between accounts quickly."},
    [{t:"A safety deposit box in the bank vault, rented yearly", fb:"A safety deposit box stores valuables. It does not send money."},
     {t:"A term deposit locked in for a full year", fb:"A term deposit holds savings for a set period. It does not send money."},
     {t:"A mortgage application for a house purchase", fb:"A mortgage is a loan for a home. It does not send money to family."}],
    "Sending money quickly between people is done with an <b>e-transfer</b> through online or mobile banking.", {}); },
  function(){ return mcq("Which option is an online banking service?",
    {t:"Checking a balance and downloading statements on a phone app", fb:"Correct: balances and statements are standard online services."},
    [{t:"Renting a safety deposit box in a bank vault", fb:"A safety deposit box is an in-branch service that needs a physical vault."},
     {t:"Signing mortgage papers with an advisor in person at the branch", fb:"That appointment happens in a branch, not online."},
     {t:"Exchanging coins for paper bills at a counter", fb:"Coin exchange is a counter service at a branch."}],
    "Online services include checking balances and downloading statements. The online service is <b>checking a balance and downloading statements on a phone app</b>.", {}); },
  function(){ return mcq("A small business owner wants help setting up payroll deposits, a business account and a loan for new equipment. Where are these services found?",
    {t:"At a financial institution, in a branch or online", fb:"Correct: banks and credit unions provide business accounts, deposits and loans."},
    [{t:"At a grocery store checkout, at the till by the door", fb:"A grocery checkout sells food. It does not provide business banking or loans."},
     {t:"At a motor vehicle office in the city", fb:"That office handles licences and registrations, not business banking."},
     {t:"At a public library, at the front desk", fb:"A library lends books and offers programs, not banking services."}],
    "Business accounts, payroll deposits and equipment loans are services of a <b>financial institution</b>, in a branch or online.", {}); },
  function(){ return mcq("Priya is travelling and wants her pay to go into her account automatically on payday. Which service does she need?",
    {t:"Direct deposit from her employer", fb:"Correct: direct deposit sends pay straight into the account."},
    [{t:"A certified cheque from the bank", fb:"A certified cheque is a paper payment. Her pay would not arrive automatically."},
     {t:"A safety deposit box in the bank vault, rented yearly", fb:"A safety deposit box stores items. It does not receive pay."},
     {t:"An overdraft application at the bank", fb:"Overdraft covers shortfalls. It does not deposit her pay."}],
    "Pay arriving automatically on payday is <b>direct deposit</b> from the employer into the account.", {}); }
]), ["Sort each option by who provides it: a bank or credit union, or someone else.", "Start with the option that involves deposits, payments, transfers or loans."]);

E("u6-account-types", 6, ["1.12","1.13"], 1, "var", varset([
  function(){ return mcq("Which account is designed for everyday deposits and withdrawals, such as pay going in and bills coming out?",
    {t:"A chequing account", fb:"Correct: chequing accounts are built for frequent everyday transactions."},
    [{t:"A high interest savings account", fb:"Savings accounts limit transactions and are meant for holding money longer."},
     {t:"A term deposit", fb:"A term deposit locks money in for a set period, so it suits no daily use."},
     {t:"A safety deposit box", fb:"That is a storage box for valuables, not an account for transactions."}],
    "Everyday deposits and withdrawals belong in a <b>chequing account</b>.", {}); },
  function(){ return mcq("Sam wants to build an emergency fund. The money should earn a higher rate and he plans to touch it rarely. Which account fits best?",
    {t:"A high interest savings account", fb:"Correct: it pays more interest and suits money that is rarely moved."},
    [{t:"A chequing account", fb:"Chequing accounts pay little or no interest, so savings grow slowly there."},
     {t:"A student chequing account for school", fb:"That account is for daily spending, not for growing a savings fund."},
     {t:"An overdraft facility at the bank", fb:"Overdraft is borrowed money for shortfalls, not a place to save."}],
    "Money saved for emergencies and rarely touched fits a <b>high interest savings account</b>, which pays a higher rate.", {}); },
  function(){ return mcq("What is a savings account at a financial institution?",
    {t:"An account that pays interest and is used to hold money for future goals", fb:"Correct: savings accounts pay interest on money held for later."},
    [{t:"A loan that must be repaid with interest, over a set term of years, in full", fb:"That describes borrowing, the opposite of saving in an account."},
     {t:"A card used to pay at store checkouts, instead of cash", fb:"That describes a debit or credit card, not a savings account."},
     {t:"A box rented to store jewellery, kept in a bank vault for safety", fb:"That is a safety deposit box, not a savings account."}],
    "A savings account <b>pays interest and holds money for future goals</b>.", {}); },
  function(){ return mcq("A 16 year old has a part time job, makes about six debit purchases a month, and wants no monthly fee. Which account fits best?",
    {t:"A youth or student chequing account with no monthly fee", fb:"Correct: youth and student accounts usually waive the monthly fee."},
    [{t:"A premium chequing account with a high monthly fee", fb:"The fee works against the goal of paying no monthly fee."},
     {t:"A term deposit for five years", fb:"A term deposit locks the money away, so pay could not be spent as needed."},
     {t:"A high interest savings account with a fee per withdrawal", fb:"Regular debit purchases would trigger withdrawal fees."}],
    "The criteria point to a <b>youth or student chequing account with no monthly fee</b>.", {}); },
  function(){ return mcq("Two partners want one account that both can deposit into and pay household bills from. Which account fits?",
    {t:"A joint chequing account", fb:"Correct: a joint account lets both holders deposit and pay bills."},
    [{t:"A term deposit in one name", fb:"A term deposit locks funds and is held in one name here."},
     {t:"A safety deposit box", fb:"A box stores valuables. Bills cannot be paid from it."},
     {t:"A store credit card", fb:"A credit card is borrowed money, not a shared bill paying account."}],
    "Shared deposits and bill payments call for a <b>joint chequing account</b>.", {}); }
]), ["Match the account to its main job: daily transactions, saving, or locking money away.", "Start by ruling out any option that is a loan, a card or a storage box rather than an account."]);


E("u6-keep-info-secure", 6, ["1.17"], 1, "var", varset([
  function(){ return mcq("Maya gets an email that looks like it is from her bank and asks her to type in her PIN to verify her account. What is the safe action?",
    {t:"Delete the email and contact the bank through its official app or phone number", fb:"Correct: banks do not ask for a PIN by email. Contact the bank directly."},
    [{t:"Reply with the PIN so the account stays open and in active use", fb:"Sharing a PIN by email hands it to a possible fraudster."},
     {t:"Forward the email to friends so they can check it and say if it looks real or not", fb:"Forwarding spreads the scam and does not protect the account."},
     {t:"Click the link in the email and sign in there with the account password", fb:"The link can lead to a fake site built to steal sign in details."}],
    "A bank never asks for a PIN by email. The safe action is to <b>delete the email and contact the bank through its official app or phone number</b>.", {}); },
  function(){ return mcq("Which password practice best protects online banking?",
    {t:"A long, unique password used only for banking, with two step verification turned on", fb:"Correct: a unique password plus two step verification gives two layers of protection."},
    [{t:"The same short password used for every account and every sign in she uses", fb:"If one account is leaked, every account using that password is at risk."},
     {t:"A password written on a note stuck to the computer at home, by the screen", fb:"Anyone near the computer can read and use it."},
     {t:"A password shared with friends in case of emergency, so they can help out if needed", fb:"Every extra person who knows the password raises the risk."}],
    "The strongest practice is a <b>long, unique banking password with two step verification turned on</b>.", {}); },
  function(){ return mcq("Liam is at an ATM. Which action protects his PIN?",
    {t:"Cover the keypad with his other hand while he enters the PIN", fb:"Correct: covering the keypad blocks cameras and onlookers."},
    [{t:"Say the PIN out loud, over and over, to remember it by heart", fb:"Anyone nearby can hear and reuse it."},
     {t:"Write the PIN on the back of the card itself, in pen", fb:"A lost card would then carry its own PIN with it."},
     {t:"Ask a stranger to watch his bag while he types it in", fb:"A stranger nearby is exactly who the PIN should be hidden from."}],
    "Covering the keypad while entering the PIN <b>protects the PIN from cameras and onlookers</b>.", {}); },
  function(){ return mcq("Old bank statements are being thrown out at home. What is the secure way to dispose of them?",
    {t:"Shred them before recycling", fb:"Correct: shredding makes account numbers unreadable."},
    [{t:"Put them in the recycling bin as they are", fb:"Account details stay readable to anyone who finds them."},
     {t:"Leave them in a bag by the door for a week", fb:"The statements can be taken or read while they sit there."},
     {t:"Give them to a neighbour to burn sometime", fb:"Handing statements to someone else exposes the information."}],
    "Shredding statements before recycling <b>keeps account numbers from being read</b>.", {}); },
  function(){ return mcq("Which habit helps keep financial information secure on a phone?",
    {t:"Using the bank app on private data or home wifi and keeping the app updated", fb:"Correct: private connections and updates reduce the risk of stolen details."},
    [{t:"Banking on open public wifi at a coffee shop in town nearby", fb:"Open networks can expose sign in details to others."},
     {t:"Saving the banking password in a notes app with no lock on it", fb:"Anyone who opens the phone can read the password."},
     {t:"Lending the phone with banking signed in, to a coworker at work for the whole day", fb:"A signed in session gives full access to the accounts."}],
    "Banking on a private connection with an updated app <b>helps keep financial information secure</b>.", {}); }
]), ["Think about who should be able to see or use the information: only the account holder.", "Start by ruling out any option that shares a PIN, a password or account details."]);

E("u6-debit-basics", 6, ["1.16","1.14"], 1, "var", varset([
  function(){ return mcq("Which option is an advantage of paying by debit card?",
    {t:"The money leaves the account right away, so spending is easy to track and no interest is charged", fb:"Correct: debit uses your own money, so there is no interest bill later."},
    [{t:"The purchase is free because no money changes hands when the card is used to pay for anything at all", fb:"Debit payments come straight out of the account balance."},
     {t:"Interest is charged each month on every purchase, just as with a credit card bill", fb:"Interest is a feature of credit cards, not debit purchases."},
     {t:"The bank pays a bonus equal to the purchase price on every single purchase made with it", fb:"Banks do not match the price of debit purchases."}],
    "Debit takes money from the account right away, so <b>spending is easy to track and no interest is charged</b>.", {}); },
  function(){ return mcq("Which option is a disadvantage of paying by debit card?",
    {t:"If the card details are stolen, money can leave the account right away and take time to get back", fb:"Correct: fraud on debit affects your own money immediately."},
    [{t:"A monthly interest bill arrives for every purchase, and it must be paid in full at the end of each month, with interest", fb:"Debit purchases do not build an interest bill."},
     {t:"The account earns no deposits from an employer, so the balance never grows on its own at all", fb:"Pay can still be deposited into the account. That is unrelated to debit use."},
     {t:"Stores are charged the full purchase price as a fee on every sale they make with it", fb:"Merchant fees are a small percentage, not the full price."}],
    "A real disadvantage is that <b>stolen debit details can drain the account right away</b>, and recovery can take time.", {}); },
  function(){ return mcq("Nora pays for groceries with a debit card. What happens to the money?",
    {t:"The amount is taken from her chequing account at the time of purchase", fb:"Correct: debit moves money from the account right away."},
    [{t:"The amount is added to a bill she pays at the end of the year in one sum", fb:"That describes a credit card balance, not a debit purchase."},
     {t:"The store lends her the amount until payday, interest free", fb:"No loan is involved. Her own money pays for the groceries."},
     {t:"The bank covers the amount as a gift, free of charge", fb:"The bank does not gift purchase amounts to customers."}],
    "A debit purchase <b>takes the amount from the chequing account at the time of purchase</b>.", {}); },
  function(){ return mcq("Which option is an advantage of online banking?",
    {t:"Bills can be paid and balances checked at any hour, without a trip to a branch", fb:"Correct: online banking is available around the clock from home."},
    [{t:"Cash can be withdrawn from a phone screen, as if the phone were a bank machine", fb:"Cash still comes from an ATM or a branch, not a phone screen."},
     {t:"No password is ever needed for any purchase at all, large or small", fb:"Online banking always needs secure sign in details."},
     {t:"Interest rates double on every account, on every purchase made", fb:"Going online does not change the rate an account pays."}],
    "Online banking lets customers <b>pay bills and check balances at any hour</b> without visiting a branch.", {}); },
  function(){ return mcq("Tom keeps a set amount in his chequing account and uses debit for all daily spending. How does debit help his budget?",
    {t:"He can see the balance drop with each purchase, so overspending shows up right away", fb:"Correct: the falling balance gives immediate feedback on spending."},
    [{t:"The bank blocks every purchase over ten dollars, so nothing costly goes through at all", fb:"Banks do not block ordinary purchases at that level by default."},
     {t:"Each purchase earns a tax refund, claimed on the yearly tax return", fb:"Debit purchases do not create tax refunds."},
     {t:"His balance stays the same no matter what he buys or where he buys it", fb:"Each debit purchase lowers the balance."}],
    "Debit helps budgeting because <b>the balance drops with each purchase</b>, so overspending shows up right away.", {}); }
]), ["Debit means your own money moves right away. Credit means borrowed money is repaid later.", "Start by checking whether the option talks about your own balance or a bill that comes later."]);

E("u6-simple-interest-solve", 6, ["1.7"], 2, "gen", function(){
  var P=pick([500,800,1000,1200,1500,2000,2500,3000]);
  var r=pick([2,2.5,3,4,5,6]);
  var t=pick([1,2,3,4,5]);
  var I=P*r/100*t;
  var mode=ri(0,3);
  var who=u6names(), goal=u6goal();
  if(mode===0){
    return numq(who+" borrows "+u6d(P)+" for "+goal+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years. How much interest is charged, in dollars?",
      Math.round(I*100)/100, 0.05,
      "Use \\(I = Prt\\). \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" \\\\ &= "+fmt(I)+" \\end{aligned} \\] The interest charged is <b>"+u6d(I)+"</b>.",
      {mode:"I", P:P, r:r, t:t});
  }
  if(mode===1){
    return numq(who+" pays "+u6d(I)+" in simple interest on a loan at "+fmt(r)+"% per year over "+t+" years. What was the principal, in dollars?",
      P, 0.5,
      "Rearrange \\(I = Prt\\) to solve for \\(P\\). \\[ \\begin{aligned} P &= \\frac{I}{rt} \\\\ &= \\frac{"+fmt(I)+"}{"+fmt(r/100,4)+" \\times "+t+"} \\\\ &= "+fmt(P)+" \\end{aligned} \\] The principal was <b>"+u6d(P)+"</b>.",
      {mode:"P", I:I, r:r, t:t});
  }
  if(mode===2){
    return numq(who+" earns "+u6d(I)+" in simple interest on a deposit of "+u6d(P)+" over "+t+" years. What is the annual interest rate, as a percent?",
      r, 0.05,
      "Rearrange \\(I = Prt\\) to solve for \\(r\\). \\[ \\begin{aligned} r &= \\frac{I}{Pt} \\\\ &= \\frac{"+fmt(I)+"}{"+fmt(P)+" \\times "+t+"} \\\\ &= "+fmt(r/100,4)+" \\end{aligned} \\] As a percent, the rate is <b>"+fmt(r)+"%</b>.",
      {mode:"r", I:I, P:P, t:t});
  }
  return numq(who+" earns "+u6d(I)+" in simple interest on a deposit of "+u6d(P)+" at "+fmt(r)+"% per year. For how many years was the money invested?",
    t, 0.05,
    "Rearrange \\(I = Prt\\) to solve for \\(t\\). \\[ \\begin{aligned} t &= \\frac{I}{Pr} \\\\ &= \\frac{"+fmt(I)+"}{"+fmt(P)+" \\times "+fmt(r/100,4)+"} \\\\ &= "+fmt(t)+" \\end{aligned} \\] The money was invested for <b>"+t+" years</b>.",
    {mode:"t", I:I, P:P, r:r});
}, ["Start from I = Prt and rearrange it for the value you are asked to find.", "First write the formula with the three given values substituted in."]);

E("u6-compound-future-value", 6, ["1.9"], 2, "gen", function(){
  var P=pick([500,800,1000,1500,2000,2500,3000,4000]);
  var r=pick([2,2.5,3,3.5,4,4.5,5,6,7]);
  var t=ri(2,10);
  var FV=P*Math.pow(1+r/100,t);
  var earn=FV-P;
  var who=u6names();
  var tol=Math.max(0.5,FV*0.005);
  if(ri(0,1)===0){
    return numq(who+" invests "+u6d(P)+" at "+fmt(r)+"% per year, compounded annually, for "+t+" years. What is the future value, in dollars?",
      Math.round(FV*100)/100, tol,
      "Use \\(FV = P(1 + r)^t\\) with the rate as a decimal. \\[ \\begin{aligned} FV &= "+fmt(P)+"(1 + "+fmt(r/100,4)+")^{"+t+"} \\\\ &= "+fmt(P)+" \\times "+fmtF(Math.pow(1+r/100,t),4)+" \\\\ &\\approx "+fmtF(FV,2)+" \\end{aligned} \\] The future value is about <b>"+u6d(FV)+"</b>.",
      {mode:"FV", P:P, r:r, t:t});
  }
  return numq(who+" invests "+u6d(P)+" at "+fmt(r)+"% per year, compounded annually, for "+t+" years. How much interest is earned, in dollars?",
    Math.round(earn*100)/100, tol,
    "First find the future value, then subtract the principal. \\[ \\begin{aligned} FV &= "+fmt(P)+"(1 + "+fmt(r/100,4)+")^{"+t+"} \\approx "+fmtF(FV,2)+" \\\\ \\text{Interest} &= "+fmtF(FV,2)+" - "+fmt(P)+" \\\\ &\\approx "+fmtF(earn,2)+" \\end{aligned} \\] The interest earned is about <b>"+u6d(earn)+"</b>.",
    {mode:"earn", P:P, r:r, t:t});
}, ["Use the compound interest form FV = P(1 + r) to the power t from the formula sheet.", "First substitute the principal, the rate as a decimal and the number of years."]);

E("u6-atm-total-charges", 6, ["1.15"], 2, "gen", function(){
  var who=u6names();
  var otherN=ri(1,6), ownN=ri(0,8);
  var otherFee=pick([2,2.5,3,3.5,4]);
  var surcharge=pick([1,1.5,2,2.5]);
  var ownFee=pick([0,0.5,1,1.25]);
  var total=otherN*(otherFee+surcharge)+ownN*ownFee;
  var month=pick(["January","March","April","June","September","November"]);
  var ownText=ownFee===0 ? "withdrawals at the home bank ATM are free" : "each withdrawal at the home bank ATM costs "+u6d(ownFee);
  return numq("In "+month+", "+who+" makes "+otherN+" withdrawals at other banks ATMs and "+ownN+" withdrawals at the home bank ATM. Each withdrawal at another bank ATM carries a "+u6d(otherFee)+" fee from that bank plus a "+u6d(surcharge)+" surcharge from the home bank, and "+ownText+". What are the total ATM charges for the month, in dollars?",
    Math.round(total*100)/100, 0.02,
    "Add the two charges on each outside withdrawal, then total both groups. \\[ \\begin{aligned} \\text{Outside} &= "+otherN+" \\times ("+fmtF(otherFee,2)+" + "+fmtF(surcharge,2)+") = "+fmtF(otherN*(otherFee+surcharge),2)+" \\\\ \\text{Home} &= "+ownN+" \\times "+fmtF(ownFee,2)+" = "+fmtF(ownN*ownFee,2)+" \\\\ \\text{Total} &= "+fmtF(otherN*(otherFee+surcharge),2)+" + "+fmtF(ownN*ownFee,2)+" = "+fmtF(total,2)+" \\end{aligned} \\] The total ATM charges are <b>"+u6d(total)+"</b>.",
    {otherN:otherN, ownN:ownN, otherFee:otherFee, surcharge:surcharge, ownFee:ownFee});
}, ["Separate the withdrawals into outside bank withdrawals and home bank withdrawals, and price each group.", "First add the fee and the surcharge together for one outside withdrawal."]);


E("u6-compounding-periods", 6, ["1.10","1.9"], 2, "gen", function(){
  var P=pick([1000,1500,2000,2500,3000,4000]);
  var r=pick([3,4,5,6]);
  var t=pick([2,3,4,5]);
  var n=pick([2,4,12]);
  var word={2:"semi-annually (2 times per year)",4:"quarterly (4 times per year)",12:"monthly (12 times per year)"}[n];
  var FVn=P*Math.pow(1+r/100/n,n*t);
  var FV1=P*Math.pow(1+r/100,t);
  var FVs=P*(1+r/100*t);
  var FVwrong=P*Math.pow(1+r/100,n*t);
  var maxV=Math.max(FVn,FV1);
  function bar(v){ return Math.max(14, Math.round(100*v/maxV)); }
  var fig='<svg width="320" height="180" viewBox="0 0 320 180">'
    +'<line x1="40" y1="140" x2="300" y2="140" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<rect x="70" y="'+(140-bar(FV1))+'" width="60" height="'+bar(FV1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<rect x="190" y="'+(140-bar(FVn))+'" width="60" height="'+bar(FVn)+'" fill="'+FIG_ACC+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<text x="100" y="'+(132-bar(FV1))+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+u6d(FV1)+'</text>'
    +'<text x="220" y="'+(132-bar(FVn))+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+u6d(FVn)+'</text>'
    +'<text x="100" y="158" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">annually</text>'
    +'<text x="220" y="158" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+({2:"semi-annually",4:"quarterly",12:"monthly"})[n]+'</text>'
    +'<text x="160" y="174" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">Future value of '+u6d(P)+' at '+fmt(r)+'% over '+t+' years</text></svg>';
  var q=mcq(u6names()+" invests "+u6d(P)+" at "+fmt(r)+"% per year for "+t+" years, compounded "+word+". What is the future value?",
    {t:u6d(FVn), fb:"Correct: divide the rate by "+n+" and multiply the years by "+n+" in the exponent."},
    [{t:u6d(FV1), fb:"That is the value with annual compounding. More frequent compounding earns a little more."},
     {t:u6d(FVs), fb:"That is simple interest. Compound interest earns interest on interest."},
     {t:u6d(FVwrong), fb:"That keeps the full rate in every period. The rate must be divided by "+n+" first."}],
    "Use \\(FV = P\\left(1 + \\frac{r}{n}\\right)^{nt}\\). \\[ \\begin{aligned} FV &= "+fmt(P)+"\\left(1 + \\frac{"+fmt(r/100,4)+"}{"+n+"}\\right)^{"+n+" \\times "+t+"} \\\\ &\\approx "+fmtF(FVn,2)+" \\end{aligned} \\] The future value is about <b>"+u6d(FVn)+"</b>. Compounding more often gives a slightly larger value, as the bars show.",
    {mode:"FVn", P:P, r:r, t:t, n:n});
  q.figure=fig;
  return q;
}, ["Use the compound form with n compounding periods per year from the formula sheet.", "First divide the rate by the number of periods per year and multiply the years by that same number."]);

E("u6-simple-vs-compound", 6, ["1.8"], 2, "gen", function(){
  var P=pick([1000,1500,2000,2500,3000,4000,5000]);
  var r=pick([4,5,6,7,8]);
  var t=ri(3,10);
  var FVs=P*(1+r/100*t), FVc=P*Math.pow(1+r/100,t);
  var diff=FVc-FVs, Is=P*r/100*t, Ic=FVc-P, both=Is+Ic;
  return mcq(u6names()+" invests "+u6d(P)+" at "+fmt(r)+"% per year for "+t+" years. By how much does compound interest (compounded annually) beat simple interest over this period?",
    {t:u6d(diff), fb:"Correct: the compound future value minus the simple future value is "+u6d(diff)+"."},
    [{t:u6d(Is), fb:"That is the simple interest alone, not the gap between the two methods."},
     {t:u6d(Ic), fb:"That is the full compound interest alone, not the gap between the two methods."},
     {t:u6d(both), fb:"That adds both interest amounts together. The question asks for the difference."}],
    "Compare the two future values. \\[ \\begin{aligned} FV_{\\text{simple}} &= "+fmt(P)+"(1 + "+fmt(r/100,4)+" \\times "+t+") = "+fmtF(FVs,2)+" \\\\ FV_{\\text{compound}} &= "+fmt(P)+"(1 + "+fmt(r/100,4)+")^{"+t+"} \\approx "+fmtF(FVc,2)+" \\\\ \\text{Difference} &= "+fmtF(FVc,2)+" - "+fmtF(FVs,2)+" \\approx "+fmtF(diff,2)+" \\end{aligned} \\] Compound interest beats simple interest by about <b>"+u6d(diff)+"</b>, because compound interest also earns interest on past interest.",
    {P:P, r:r, t:t});
}, ["Compute the future value both ways, with simple interest and with compound interest, then subtract.", "First work out the simple interest future value using FV = P + I."]);

E("u6-best-account", 6, ["1.12","1.13"], 2, "var", varset([
  function(){ return mcq("An account charges $12 per month and includes 20 free debit transactions, then $0.75 each. A second account charges $4 per month and includes 10 free transactions, then $1.00 each. A third account charges $29 per month with unlimited transactions and extra perks. Sam makes about 30 transactions a month and wants the lowest cost. Which account fits best?",
    {t:"The $12 account, costing $12 plus 10 extra fees for a total of $19.50", fb:"Correct: $12 plus 10 times $0.75 equals $19.50, the lowest of the three."},
    [{t:"The $4 account, costing $4 plus 20 extra fees for a total of $24.00", fb:"The monthly fee is lower, but 20 extra transactions bring the total to $24.00."},
     {t:"The $29 account, because unlimited transactions always save money in the end", fb:"At 30 transactions the unlimited plan costs $29, which is higher than $19.50."},
     {t:"A savings account, to avoid transaction fees entirely, always", fb:"Savings accounts restrict transactions and charge per withdrawal, so daily use costs more."}],
    "\\[ \\begin{aligned} \\text{Plan 1} &= 12 + 10 \\times 0.75 = 19.50 \\\\ \\text{Plan 2} &= 4 + 20 \\times 1.00 = 24.00 \\\\ \\text{Plan 3} &= 29.00 \\end{aligned} \\] The lowest cost is the <b>$12 account at $19.50 per month</b>.", {}); },
  function(){ return mcq("Keira is paid weekly, pays rent and bills from her account, and checks her balance daily on her phone. She rarely carries cash. Which account fits best?",
    {t:"A chequing account with online and mobile access", fb:"Correct: frequent deposits, payments and balance checks are chequing account work."},
    [{t:"A term deposit", fb:"A term deposit locks money away, so rent and bills could not be paid from it."},
     {t:"A high interest savings account with two free withdrawals a month", fb:"Weekly pay and many bill payments would pass the free withdrawal limit quickly."},
     {t:"A safety deposit box", fb:"A box stores valuables. It cannot receive pay or pay bills."}],
    "Weekly pay in, bills out and daily balance checks point to a <b>chequing account with online and mobile access</b>.", {}); },
  function(){ return mcq("Devon is saving for a house down payment in three years. The savings will sit untouched and he wants the highest interest he can get while keeping the money at his bank. Which account fits best?",
    {t:"A term deposit or high interest savings account", fb:"Correct: money that sits untouched earns more in a term deposit or high interest savings."},
    [{t:"A basic chequing account at the bank", fb:"Chequing pays little interest, so three years of saving would earn very little."},
     {t:"A student chequing account at the bank", fb:"That account is built for daily spending by students, with low interest."},
     {t:"An account with overdraft protection, for a fee", fb:"Overdraft is a borrowing feature. It does not raise the interest on savings."}],
    "Untouched savings over three years earn the most in a <b>term deposit or high interest savings account</b>.", {}); },
  function(){ return mcq("An seniors account has no monthly fee and 25 free transactions. A regular chequing account charges $14 per month. Mrs. Adeyemi is 68, makes about 15 transactions a month, and wants low fees. Which account fits best?",
    {t:"The seniors account, at no monthly fee for her usage", fb:"Correct: her 15 transactions fit inside the 25 free ones, so she pays no fee."},
    [{t:"The regular chequing account, because it is the standard choice", fb:"Standard does not mean cheapest. She would pay $14 every month."},
     {t:"A premium account at $29 per month with travel perks", fb:"The perks cost $29 a month, which works against her low fee goal."},
     {t:"A term deposit, to earn interest instead of paying fees", fb:"A term deposit locks the money, so her monthly bills could not be paid from it."}],
    "With 15 transactions inside the 25 free ones, the <b>seniors account costs her no monthly fee</b> and fits best.", {}); },
  function(){ return mcq("A seasonal worker earns most of his income in summer and draws on savings through the winter. Which account setup fits best?",
    {t:"A chequing account for spending plus a high interest savings account for the summer surplus", fb:"Correct: the surplus earns interest in savings and moves to chequing as winter spending needs it."},
    [{t:"One term deposit holding all of his money for five years, locked away until the term ends in full", fb:"Winter spending money would be locked away and hard to reach."},
     {t:"A store credit card, used for all of the winter spending he does each year", fb:"Card interest on a winter of spending would cost far more than savings interest earns."},
     {t:"Cash kept at home for the winter, kept in a drawer and spent as needed each week", fb:"Cash at home earns nothing and can be lost or stolen."}],
    "The setup that fits is a <b>chequing account for spending plus a high interest savings account for the summer surplus</b>.", {}); }
]), ["List the criteria in the stem first, then test each account against every criterion.", "Start with the money pattern: money moving often needs chequing, money sitting still needs savings."]);

E("u6-credit-options-compare", 6, ["1.18"], 2, "var", varset([
  function(){ return mcq("Jonah plans a $2,400 furnace replacement and wants fixed monthly payments that end on a set date, at a rate lower than a credit card rate. Which credit option fits best?",
    {t:"A personal loan with fixed payments over a set term", fb:"Correct: a personal loan gives a set payment schedule and usually a lower rate than a card."},
    [{t:"A store credit card with a high rate", fb:"Store cards usually carry high rates, so the furnace would cost more."},
     {t:"Overdraft on his chequing account, arranged at the bank", fb:"Overdraft is meant for small shortfalls, not a planned $2,400 purchase."},
     {t:"A payday loan due in two weeks", fb:"A payday loan is due almost at once and carries very high fees."}],
    "A planned purchase with fixed payments to a set end date fits a <b>personal loan</b>.", {}); },
  function(){ return mcq("Which option describes a line of credit?",
    {t:"An approved limit that can be borrowed from, repaid and borrowed again as needed", fb:"Correct: a line of credit is reusable up to its limit."},
    [{t:"A loan repaid in full, with a large fee, on the next payday", fb:"That describes a payday loan, due in one payment."},
     {t:"A card that only works at one store chain, and nowhere else at all", fb:"That describes a store credit card, not a line of credit."},
     {t:"A deposit that earns interest for five years, locked in at the bank the whole time", fb:"That describes a term deposit, which is saving rather than credit."}],
    "A line of credit is an <b>approved limit that can be borrowed from, repaid and borrowed again</b>.", {}); },
  function(){ return mcq("A store card offers 10% off a first purchase and charges 28% annual interest on balances carried. A bank card charges 19% with no opening discount. Which statement is a fair comparison?",
    {t:"The store card saves money on day one but costs more if the balance is carried", fb:"Correct: the discount helps once, while the higher rate costs more over time."},
    [{t:"The store card is cheaper in every situation, without any exception at all, ever", fb:"A carried balance at 28% costs more than one at 19%, so the claim fails."},
     {t:"The bank card is always the worse choice, whatever the purchase is or costs", fb:"For a balance carried over months, the lower bank rate usually wins."},
     {t:"Both cards cost the same in the end because both are credit cards", fb:"Different rates and offers make the costs different."}],
    "The fair comparison is that the <b>store card saves money on day one but costs more if the balance is carried</b>.", {}); },
  function(){ return mcq("What is overdraft protection on a chequing account?",
    {t:"A small approved credit limit that covers payments when the balance runs short, for a fee and interest", fb:"Correct: overdraft covers shortfalls and charges for the amount used."},
    [{t:"Insurance that pays off a mortgage in full after a job loss, for a monthly premium paid each and every month", fb:"That is a different insurance product, not overdraft protection."},
     {t:"A guarantee that the account balance can never fall, no matter what is spent from the account", fb:"Balances still fall. Overdraft only covers payments past zero, for a cost."},
     {t:"A savings plan that moves money each payday, automatically, into a savings account at the bank", fb:"That describes an automatic transfer plan, not overdraft."}],
    "Overdraft protection is a <b>small approved credit limit that covers payments when the balance runs short</b>, for a fee and interest.", {}); },
  function(){ return mcq("Farah needs $600 for a car repair three days before payday and will repay it from that pay. A bank line of credit is already approved. Which option usually costs the least?",
    {t:"The approved line of credit, repaid on payday", fb:"Correct: a few days of interest on a line of credit costs far less than payday fees."},
    [{t:"A payday loan with a fee per $100 borrowed from it", fb:"Payday fees for a few days work out to a very high annual rate."},
     {t:"A new store credit card from the mall", fb:"A store card signup for one repair adds a high rate account she does not need."},
     {t:"Overdraft left unpaid for a full month", fb:"A month of overdraft fees and interest costs more than three days on a line of credit."}],
    "Borrowing briefly on an <b>approved line of credit and repaying on payday</b> usually costs the least.", {}); }
]), ["Compare each option on rate, repayment pattern and what it is designed for.", "Start by matching the option to the job: planned purchase, flexible borrowing, or a small shortfall."]);

E("u6-credit-card-offers", 6, ["1.21"], 2, "gen", function(){
  var attempt=0, B=1000, fA=29, fB=99, rA=12, rB=24, tA=149, tB=339;
  while(attempt<80){
    attempt++;
    B=pick([600,800,1000,1200,1500,2000,2500,3000]);
    fA=pick([0,29,49,79]); fB=pick([0,39,59,99]);
    rA=pick([12,15,18,21]); rB=pick([14,17,20,24]);
    tA=fA+B*rA/100; tB=fB+B*rB/100;
    var cf=(tA<tB)?fA:fB;
    if(Math.abs(tA-tB)>=12 && fA!==fB && cf>0) break;
  }
  var cheap=Math.min(tA,tB), other=Math.max(tA,tB);
  var cheapFee=(tA<tB)?fA:fB, cheapInt=(tA<tB)?B*rA/100:B*rB/100;
  var otherInt=(tA<tB)?B*rB/100:B*rA/100;
  var prompt=u6names()+" carries a balance of "+u6d(B)+" for one full year. Card A charges "+fmt(rA)+"% annual interest and a "+u6d(fA)+" annual fee. Card B charges "+fmt(rB)+"% annual interest and a "+u6d(fB)+" annual fee. Interest is charged on the full balance for the year. What is the total one year cost of the cheaper card?";
  var sol="Total cost is the annual fee plus one year of interest. \\[ \\begin{aligned} \\text{Card A} &= "+fmtF(fA,2)+" + "+fmt(B)+" \\times "+fmt(rA/100)+" = "+fmtF(tA,2)+" \\\\ \\text{Card B} &= "+fmtF(fB,2)+" + "+fmt(B)+" \\times "+fmt(rB/100)+" = "+fmtF(tB,2)+" \\end{aligned} \\] The cheaper card costs <b>"+u6d(cheap)+"</b> for the year.";
  return mcq(prompt,
    {t:u6d(cheap), fb:"Correct: fee plus one year of interest gives the lower total of "+u6d(cheap)+"."},
    [{t:u6d(other), fb:"That is the total for the other card. Compare both totals and take the lower one."},
     {t:u6d(cheapInt), fb:"That is the interest only. The annual fee must be added as well."},
     {t:u6d(cheapFee+otherInt), fb:"That mixes the fee of one card with the interest of the other. Cost out each card on its own first."}],
    sol, {B:B, fA:fA, fB:fB, rA:rA, rB:rB});
}, ["Total cost means the annual fee plus the interest for the year, for each card separately.", "First compute one year of interest on the balance for Card A."]);


E("u6-credit-interest-cost", 6, ["1.22"], 2, "gen", function(){
  var who=u6names();
  if(ri(0,1)===0){
    var B=pick([500,750,1000,1250,1500,2000,2500]);
    var mr=pick([1,1.5,2]);
    var m=ri(3,12);
    var I=B*mr/100*m;
    return numq(who+" carries a credit card balance of "+u6d(B)+". The card charges "+fmt(mr)+"% interest per month, charged each month on the starting balance. No payments are made and no new purchases are added for "+m+" months. How much interest builds up, in dollars?",
      Math.round(I*100)/100, 0.05,
      "Multiply the balance by the monthly rate and the number of months. \\[ \\begin{aligned} I &= "+fmt(B)+" \\times "+fmt(mr/100,4)+" \\times "+m+" \\\\ &= "+fmtF(I,2)+" \\end{aligned} \\] The interest that builds up is <b>"+u6d(I)+"</b>.",
      {mode:"card", B:B, mr:mr, m:m});
  }
  var P=pick([800,1000,1500,2000,2500,3000,4000]);
  var r=pick([5,6,7,8,9,11]);
  var t=pick([1,2,3,4,5]);
  var I2=P*r/100*t, tot=P+I2;
  if(ri(0,1)===0){
    return numq(who+" takes a personal loan of "+u6d(P)+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years to pay for "+u6goal()+". How much interest is paid over the loan, in dollars?",
      Math.round(I2*100)/100, 0.05,
      "Use \\(I = Prt\\). \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" \\\\ &= "+fmtF(I2,2)+" \\end{aligned} \\] The interest paid is <b>"+u6d(I2)+"</b>.",
      {mode:"loanI", P:P, r:r, t:t});
  }
  return numq(who+" takes a personal loan of "+u6d(P)+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years to pay for "+u6goal()+". What is the total amount repaid, in dollars?",
    Math.round(tot*100)/100, 0.05,
    "Find the interest first, then add the principal. \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" = "+fmtF(I2,2)+" \\\\ \\text{Total repaid} &= "+fmt(P)+" + "+fmtF(I2,2)+" = "+fmtF(tot,2)+" \\end{aligned} \\] The total amount repaid is <b>"+u6d(tot)+"</b>.",
    {mode:"loanTot", P:P, r:r, t:t});
}, ["Pick the interest model the stem describes: a monthly rate on a card balance, or I = Prt on a loan.", "First identify the balance or principal, the rate and the time period."]);

E("u6-payday-loan-cost", 6, ["1.19"], 2, "gen", function(){
  var who=u6names();
  var B=pick([200,300,400,500,600]);
  var fee=pick([15,17,20,25,30]);
  var cost=B/100*fee, tot=B+cost;
  if(ri(0,1)===0){
    return numq("A payday lender charges a fee of "+u6d(fee)+" for every $100 borrowed, due in 14 days. "+who+" borrows "+u6d(B)+". What is the fee, in dollars?",
      cost, 0.02,
      "Count the hundreds in the amount borrowed, then multiply by the fee. \\[ \\begin{aligned} \\text{Fee} &= \\frac{"+fmt(B)+"}{100} \\times "+fmt(fee)+" \\\\ &= "+fmt(B/100)+" \\times "+fmt(fee)+" = "+fmt(cost)+" \\end{aligned} \\] The fee is <b>"+u6d(cost)+"</b> for borrowing for 14 days.",
      {mode:"fee", B:B, fee:fee});
  }
  return numq("A payday lender charges a fee of "+u6d(fee)+" for every $100 borrowed, due in 14 days. "+who+" borrows "+u6d(B)+". What is the total amount due in 14 days, in dollars?",
    tot, 0.02,
    "Find the fee first, then add the amount borrowed. \\[ \\begin{aligned} \\text{Fee} &= \\frac{"+fmt(B)+"}{100} \\times "+fmt(fee)+" = "+fmt(cost)+" \\\\ \\text{Total due} &= "+fmt(B)+" + "+fmt(cost)+" = "+fmt(tot)+" \\end{aligned} \\] The total amount due is <b>"+u6d(tot)+"</b>.",
    {mode:"total", B:B, fee:fee});
}, ["The fee is charged per $100 borrowed, so scale the fee by the size of the loan.", "First divide the amount borrowed by 100 to count the fee units."]);

E("u6-promo-deferred-interest", 6, ["1.23"], 2, "gen", function(){
  var who=u6names();
  var item=pick(["a sofa set","a refrigerator","a snow blower","a mattress set","a patio set","a washer and dryer"]);
  var P=pick([700,800,900,1000,1200,1500,1800,2000,2500]);
  var r=pick([24,26,28,30]);
  var fee=pick([0,79,99,129]);
  var paid=pick([200,300,400,500]);
  if(paid>=P) paid=200;
  var interest=P*r/100;
  var remaining=P-paid;
  var owed=remaining+interest+fee;
  var feeText=fee>0 ? " plus a "+u6d(fee)+" administration fee" : "";
  if(ri(0,1)===0){
    return numq("A store offers "+item+" for "+u6d(P)+" with no interest for 12 months if the full price is paid within 12 months. If any balance remains at month 12, interest at "+fmt(r)+"% is charged on the full original price for the whole year"+feeText+". "+who+" still owes part of the price at month 12. How much interest is charged, in dollars?",
      Math.round(interest*100)/100, 0.05,
      "Deferred interest is charged on the full original price, not on the balance left. \\[ \\begin{aligned} \\text{Interest} &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\\\ &= "+fmtF(interest,2)+" \\end{aligned} \\] The interest charged is <b>"+u6d(interest)+"</b>.",
      {mode:"interest", P:P, r:r, fee:fee});
  }
  return numq("A store offers "+item+" for "+u6d(P)+" with no interest for 12 months if the full price is paid within 12 months. If any balance remains at month 12, interest at "+fmt(r)+"% is charged on the full original price for the whole year"+feeText+". "+who+" pays "+u6d(paid)+" during the year and the rest is still owing at month 12. What is the total still owed at month 12, in dollars?",
    Math.round(owed*100)/100, 0.05,
    "The balance left is charged deferred interest on the full price. \\[ \\begin{aligned} \\text{Balance left} &= "+fmt(P)+" - "+fmt(paid)+" = "+fmt(remaining)+" \\\\ \\text{Interest} &= "+fmt(P)+" \\times "+fmt(r/100,4)+" = "+fmtF(interest,2)+" \\\\ \\text{Total owed} &= "+fmt(remaining)+" + "+fmtF(interest,2)+(fee>0?" + "+fmt(fee):"")+" = "+fmtF(owed,2)+" \\end{aligned} \\] The total still owed is <b>"+u6d(owed)+"</b>.",
    {mode:"owed", P:P, r:r, fee:fee, paid:paid});
}, ["Read the promotion terms closely: deferred interest is charged on the full original price.", "First work out what balance is left when the promotion period ends."]);

E("u6-online-banking-tradeoffs", 6, ["1.11","1.14","1.17"], 2, "var", varset([
  function(){ return mcq("Which option is an advantage of online banking?",
    {t:"Transfers and bill payments can be made at any hour from home", fb:"Correct: online banking runs around the clock without a branch visit."},
    [{t:"Cash deposits can be placed into a phone, directly and at any hour", fb:"Cash is deposited at an ATM or branch. A phone cannot take cash."},
     {t:"Accounts never need a password, so anyone can sign in", fb:"Online accounts always need secure sign in details."},
     {t:"Fees are waived on every account at the bank, always", fb:"Going online does not remove account fees."}],
    "Online banking allows <b>transfers and bill payments at any hour from home</b>.", {}); },
  function(){ return mcq("Which option is a disadvantage of online banking?",
    {t:"It depends on internet access, so an outage or a rural dead zone can block banking", fb:"Correct: no connection means no online banking at that moment."},
    [{t:"Balances can only be checked once a month, on one set day each month, and no more often", fb:"Balances can be checked any time online, as often as needed."},
     {t:"Every transfer takes five business days, however small the amount sent", fb:"Many online transfers are instant or next day, not five days."},
     {t:"Paper statements are mailed every single week, wanted or not", fb:"Online banking usually replaces weekly paper with e-statements on request."}],
    "A real disadvantage is the <b>dependence on internet access</b>, so outages can block banking.", {}); },
  function(){ return mcq("Ruth wants to lower the risk of someone signing in to her online banking. Which action helps most?",
    {t:"Turn on two step verification and set up sign in alerts", fb:"Correct: a second check plus alerts make stolen passwords much less useful."},
    [{t:"Use her birthdate as her password", fb:"Birthdates are easy to guess and appear in many records."},
     {t:"Save the password in an unlocked notes file", fb:"Anyone with the phone can read an unlocked password file."},
     {t:"Share her sign in with her son so he can watch the account", fb:"Sharing sign in details gives another person full access."}],
    "Two step verification plus sign in alerts <b>lower the risk of someone signing in</b> to her banking.", {}); },
  function(){ return mcq("Which of these is a service a customer can arrange through online banking?",
    {t:"Opening a savings account and setting up automatic transfers into it", fb:"Correct: accounts can be opened and transfers scheduled online."},
    [{t:"Renting a safety deposit box in the vault of the bank branch downtown", fb:"A box rental needs a branch visit and a physical vault."},
     {t:"Having a will witnessed by a notary at a law office", fb:"That is a legal service arranged in person, not an online banking task."},
     {t:"Exchanging foreign coins for Canadian bills at a bank counter", fb:"Coin exchange happens at a branch counter."}],
    "Through online banking a customer can <b>open a savings account and set up automatic transfers</b>.", {}); },
  function(){ return mcq("A bank app shows a notice that it will be down for maintenance from 2 AM to 4 AM on Sunday. Which statement about online banking does this illustrate?",
    {t:"Online banking is convenient but is unavailable during outages and maintenance", fb:"Correct: scheduled downtime is a real limit of online services."},
    [{t:"Online banking charges double fees at night, on every account, without exception", fb:"The notice says nothing about fees changing at night."},
     {t:"Branches close whenever the app is down, for as long as it lasts", fb:"Branch hours are separate from app maintenance."},
     {t:"Accounts lose interest during maintenance, every single time it happens", fb:"Interest keeps accruing. Only access is paused."}],
    "The notice illustrates that online banking is <b>convenient but unavailable during outages and maintenance</b>.", {}); }
]), ["Weigh each option as a plus or a minus of banking on a screen instead of in a branch.", "Start by checking whether the option depends on internet access, passwords or branch only services."]);

E("u6-credit-strategies", 6, ["1.20"], 2, "var", varset([
  function(){ return mcq("Alex carries balances on two cards, one at 24% and one at 12%. Extra money is available each month. Which strategy reduces the total interest fastest?",
    {t:"Pay the minimum on both, and put every extra dollar on the 24% card", fb:"Correct: clearing the highest rate balance first cuts the most interest."},
    [{t:"Pay the minimum on both, and put every extra dollar on the 12% card", fb:"The cheaper balance grows slower, so the expensive one keeps costing more."},
     {t:"Stop paying both cards until savings grow", fb:"Missed payments add fees and hurt the credit record."},
     {t:"Open a third card and move both balances to it at 26%", fb:"Moving debt to a higher rate raises the interest cost."}],
    "Interest falls fastest when extra payments target the <b>highest rate balance first</b>, while minimums keep both accounts current.", {}); },
  function(){ return mcq("Which action is a sound strategy before a large planned purchase on credit?",
    {t:"Compare offers, negotiate the rate, and plan the payment timeline so the balance clears quickly", fb:"Correct: shopping for terms and planning payments keeps credit costs low."},
    [{t:"Apply for the first offer received in the mail, without comparing any other offers", fb:"A mailed offer is rarely the cheapest, and no comparison was made."},
     {t:"Plan to pay only the minimum each month, and let the interest build up over time", fb:"Minimum payments stretch the debt and add large interest costs."},
     {t:"Time the purchase so the balance sits through a full promotion with deferred interest at the end", fb:"Deferred interest can charge the full period if any balance remains."}],
    "A sound strategy is to <b>compare offers, negotiate the rate, and plan the payment timeline</b> before buying.", {}); },
  function(){ return mcq("Priya has paid her card on time for two years and her rate is 21%. She calls the issuer. Which request is a reasonable credit strategy?",
    {t:"Ask for a lower interest rate based on her on time payment history", fb:"Correct: issuers often lower rates for customers with strong payment records who ask."},
    [{t:"Ask the issuer to remove all past interest and fees as a favour to her", fb:"Issuers rarely erase charges wholesale. A rate request is the realistic ask."},
     {t:"Ask to raise her limit so she can spend more freely", fb:"A higher limit invites more spending rather than better credit use."},
     {t:"Ask to skip payments for three months with no cost", fb:"Skipped payments still accrue interest and can harm her record."}],
    "Asking for a <b>lower rate based on an on time payment history</b> is a reasonable negotiation strategy.", {}); },
  function(){ return mcq("Which habit helps a borrower use a credit card effectively?",
    {t:"Pay the full balance by the due date so no interest is charged", fb:"Correct: paying in full inside the grace period avoids interest entirely."},
    [{t:"Use the card up to its limit every month, in full, every time", fb:"Maxing out a card raises costs and can lower a credit score."},
     {t:"Pay bills a few days after the due date each month, as a habit", fb:"Late payments bring fees and interest and harm the credit record."},
     {t:"Take cash advances for everyday spending each and every week", fb:"Cash advances usually carry high rates with no grace period."}],
    "Paying the <b>full balance by the due date</b> means the card is used with no interest charged.", {}); },
  function(){ return mcq("Sam owes $900 and gets a $300 tax refund. Which use of the refund best supports his plan to reduce debt?",
    {t:"Put the full $300 on the card balance right away", fb:"Correct: a lump sum on the balance cuts interest from that day forward."},
    [{t:"Hold the cash and keep paying the minimum", fb:"The balance keeps accruing interest while the cash sits idle."},
     {t:"Spend the refund on a sale and keep the card balance", fb:"New spending adds to the debt the plan is trying to reduce."},
     {t:"Use the refund as a deposit on a new store card purchase", fb:"A new purchase on another card grows total debt."}],
    "Putting the refund <b>on the card balance right away</b> reduces the balance and the interest charged on it.", {}); }
]), ["Good credit strategies lower the rate, shorten the timeline, or shrink the balance sooner.", "Start by checking what each option does to the total interest paid over time."]);


E("u6-card-charges-choices", 6, ["1.15","1.16"], 2, "gen", function(){
  var who=u6names();
  if(ri(0,1)===0){
    var otherN=ri(2,6), ownN=ri(2,8);
    var otherFee=pick([2,2.5,3,3.5]), surcharge=pick([1,1.5,2]), ownFee=pick([0.5,1,1.25]);
    var total=otherN*(otherFee+surcharge)+ownN*ownFee;
    var noSurcharge=otherN*otherFee+ownN*ownFee;
    var noOwn=otherN*(otherFee+surcharge);
    var surchargeOnce=otherN*otherFee+surcharge+ownN*ownFee;
    return mcq("In one month, "+who+" makes "+otherN+" withdrawals at other banks ATMs and "+ownN+" at the home bank ATM. Each outside withdrawal costs a "+u6d(otherFee)+" fee plus a "+u6d(surcharge)+" surcharge, and each home withdrawal costs "+u6d(ownFee)+". What are the total ATM charges?",
      {t:u6d(total), fb:"Correct: outside withdrawals carry both the fee and the surcharge, every time."},
      [{t:u6d(noSurcharge), fb:"That leaves out the surcharge on each outside withdrawal."},
       {t:u6d(otherN*otherFee), fb:"That counts only the outside fees. It leaves out the surcharges and the home bank charges."},
       {t:u6d(total+ownN*(otherFee+surcharge)), fb:"That charges the outside fee and surcharge on the home bank withdrawals as well. Home withdrawals carry only the home fee."}],
      "Price each group of withdrawals. \\[ \\begin{aligned} \\text{Outside} &= "+otherN+" \\times ("+fmtF(otherFee,2)+" + "+fmtF(surcharge,2)+") = "+fmtF(otherN*(otherFee+surcharge),2)+" \\\\ \\text{Home} &= "+ownN+" \\times "+fmtF(ownFee,2)+" = "+fmtF(ownN*ownFee,2)+" \\\\ \\text{Total} &= "+fmtF(total,2)+" \\end{aligned} \\] The total ATM charges are <b>"+u6d(total)+"</b>.",
      {mode:"atm", otherN:otherN, ownN:ownN});
  }
  var freeN=pick([10,15,20]);
  var extra=ri(3,15), count=freeN+extra;
  var feePer=pick([0.5,0.75,1,1.25]);
  var planFee=pick([4,6,10]);
  var totalD=extra*feePer, allCharged=count*feePer;
  return mcq(who+" has a debit plan with "+freeN+" free debit purchases per month, then "+u6d(feePer)+" for each extra purchase. This month "+who+" makes "+count+" debit purchases. How much are the debit purchase fees?",
    {t:u6d(totalD), fb:"Correct: only the "+extra+" purchases past the free ones are charged."},
    [{t:u6d(allCharged), fb:"That charges for every purchase, including the "+freeN+" free ones."},
     {t:u6d(feePer), fb:"That is the fee for a single extra purchase. There are "+extra+" extra purchases."},
     {t:u6d(allCharged+planFee), fb:"That charges for the free purchases as well and adds a monthly account fee. The question asks for the extra purchase fees only."}],
    "Only purchases past the free count are charged. \\[ \\begin{aligned} \\text{Extra purchases} &= "+count+" - "+freeN+" = "+extra+" \\\\ \\text{Fees} &= "+extra+" \\times "+fmtF(feePer,2)+" = "+fmtF(totalD,2)+" \\end{aligned} \\] The debit purchase fees are <b>"+u6d(totalD)+"</b>. Fees like these are one cost to weigh when paying by debit.",
    {mode:"debit", freeN:freeN, count:count, feePer:feePer});
}, ["Split the transactions into the free ones and the charged ones, or into home and outside withdrawals.", "First work out how many transactions are actually charged a fee."]);

E("u6-card-vs-loan-cost", 6, ["1.18","1.22"], 2, "gen", function(){
  var attempt=0, P=1200, rc=21, fc=0, rl=9, fl=75, cTot=0, lTot=0;
  while(attempt<80){
    attempt++;
    P=pick([800,1000,1200,1500,2000,2500,3000]);
    rc=pick([19,21,24]); fc=pick([0,39]);
    rl=pick([7,9,11]); fl=pick([50,75,100]);
    cTot=P+P*rc/100+fc; lTot=P+P*rl/100+fl;
    if(Math.abs(cTot-lTot)>=10) break;
  }
  var cheap=Math.min(cTot,lTot), other=Math.max(cTot,lTot);
  var cheapInt=(cTot<lTot)?P*rc/100:P*rl/100;
  var otherInt=(cTot<lTot)?P*rl/100:P*rc/100;
  var cheapFee=(cTot<lTot)?fc:fl;
  var item=u6goal();
  return mcq(u6names()+" needs "+u6d(P)+" for "+item+", repaid over one year. A credit card charges "+fmt(rc)+"% annual interest and a "+u6d(fc)+" annual fee. A personal loan charges "+fmt(rl)+"% simple interest for the year and a "+u6d(fl)+" setup fee. Interest is charged on the full amount for the year. What is the total cost of the cheaper option, including repaying the "+u6d(P)+"?",
    {t:u6d(cheap), fb:"Correct: principal plus interest plus fees gives the lower total of "+u6d(cheap)+"."},
    [{t:u6d(other), fb:"That is the total for the other option. Compare both totals and take the lower one."},
     {t:u6d(cheapInt), fb:"That is the interest only. The amount borrowed and the fee must be added."},
     {t:u6d(P+otherInt+cheapFee), fb:"That mixes the interest of one option with the fee of the other. Cost each option fully on its own."}],
    "Cost each option as principal plus interest plus fees. \\[ \\begin{aligned} \\text{Card} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rc/100)+" + "+fmt(fc)+" = "+fmtF(cTot,2)+" \\\\ \\text{Loan} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rl/100)+" + "+fmt(fl)+" = "+fmtF(lTot,2)+" \\end{aligned} \\] The cheaper option costs <b>"+u6d(cheap)+"</b> in total.",
    {P:P, rc:rc, fc:fc, rl:rl, fl:fl});
}, ["Total cost means the amount borrowed plus its interest plus its fees, worked out separately for each option.", "First compute one year of interest on the card option."]);

E("u6-simple-interest-fv", 6, ["1.7","1.8"], 2, "gen", function(){
  var P=pick([600,800,1000,1200,1500,2000,2500,3000]);
  var r=pick([2,3,4,5,6]);
  var t=ri(2,5);
  var I=P*r/100*t, FV=P+I, oneYrFV=P+P*r/100, doubleFV=P+2*I;
  return mcq(u6names()+" deposits "+u6d(P)+" at a simple interest rate of "+fmt(r)+"% per year for "+t+" years. What is the final value of the deposit?",
    {t:u6d(FV), fb:"Correct: the final value is the principal plus the interest earned."},
    [{t:u6d(I), fb:"That is the interest only. The final value also includes the original principal."},
     {t:u6d(oneYrFV), fb:"That is the value after one year. The deposit runs for "+t+" years."},
     {t:u6d(doubleFV), fb:"That doubles the interest. Simple interest grows by the same amount each year, with no doubling."}],
    "Use \\(FV = P + I\\) after finding the interest. \\[ \\begin{aligned} I &= "+fmt(P)+" \\times "+fmt(r/100,4)+" \\times "+t+" = "+fmt(I)+" \\\\ FV &= "+fmt(P)+" + "+fmt(I)+" = "+fmt(FV)+" \\end{aligned} \\] The final value is <b>"+u6d(FV)+"</b>. Simple interest adds the same amount each year, unlike compound interest, which grows faster over time.",
    {P:P, r:r, t:t});
}, ["The final value is the principal plus the interest, so find the interest first.", "First compute I = Prt for the full term."]);

E("u6-compound-solve-periods", 6, ["1.9","1.10"], 3, "gen", function(){
  var P=pick([1000,1500,2000,2500,3000,4000,5000]);
  var r=pick([3,3.5,4,4.5,5,5.5,6]);
  var n=pick([2,4,12]);
  var t=ri(1,5);
  var word={2:"semi-annually",4:"quarterly",12:"monthly"}[n];
  var FV=P*Math.pow(1+r/100/n,n*t);
  var earn=FV-P;
  var tol=Math.max(0.5,FV*0.005);
  var who=u6names();
  if(ri(0,1)===0){
    return numq(who+" invests "+u6d(P)+" at "+fmt(r)+"% per year, compounded "+word+", for "+t+" years. What is the future value, in dollars?",
      Math.round(FV*100)/100, tol,
      "Use \\(FV = P\\left(1 + \\frac{r}{n}\\right)^{nt}\\) with \\(n = "+n+"\\). \\[ \\begin{aligned} FV &= "+fmt(P)+"\\left(1 + \\frac{"+fmt(r/100,4)+"}{"+n+"}\\right)^{"+n+" \\times "+t+"} \\\\ &\\approx "+fmtF(FV,2)+" \\end{aligned} \\] The future value is about <b>"+u6d(FV)+"</b>.",
      {mode:"FV", P:P, r:r, n:n, t:t});
  }
  return numq(who+" invests "+u6d(P)+" at "+fmt(r)+"% per year, compounded "+word+", for "+t+" years. How much interest is earned, in dollars?",
    Math.round(earn*100)/100, tol,
    "Find the future value first, then subtract the principal. \\[ \\begin{aligned} FV &= "+fmt(P)+"\\left(1 + \\frac{"+fmt(r/100,4)+"}{"+n+"}\\right)^{"+n+" \\times "+t+"} \\approx "+fmtF(FV,2)+" \\\\ \\text{Interest} &= "+fmtF(FV,2)+" - "+fmt(P)+" \\approx "+fmtF(earn,2)+" \\end{aligned} \\] The interest earned is about <b>"+u6d(earn)+"</b>.",
    {mode:"earn", P:P, r:r, n:n, t:t});
}, ["Use the compound form with n periods per year, and divide the rate by n before building the power.", "First identify n from the compounding word: semi-annually, quarterly or monthly."]);

E("u6-credit-plan-savings", 6, ["1.19","1.20"], 3, "gen", function(){
  var P=pick([1000,1250,1500,2000,2500,3000]);
  var rs=pick([26,28,30]);
  var rl=pick([9,11,13]);
  var fl=pick([59,79,99]);
  var totS=P+P*rs/100, totL=P+P*rl/100+fl;
  var save=totS-totL;
  var item=u6goal();
  return numq(u6names()+" plans a purchase of "+u6d(P)+" for "+item+", repaid over one year. A store card charges "+fmt(rs)+"% annual interest and no fee. A bank loan charges "+fmt(rl)+"% simple interest for the year plus a "+u6d(fl)+" setup fee. Interest is charged on the full amount for the year. How much is saved by choosing the bank loan instead of the store card, in dollars?",
    Math.round(save*100)/100, 0.05,
    "Total each plan, then subtract. \\[ \\begin{aligned} \\text{Store card} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rs/100)+" = "+fmtF(totS,2)+" \\\\ \\text{Bank loan} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rl/100)+" + "+fmt(fl)+" = "+fmtF(totL,2)+" \\\\ \\text{Savings} &= "+fmtF(totS,2)+" - "+fmtF(totL,2)+" = "+fmtF(save,2)+" \\end{aligned} \\] Choosing the bank loan saves <b>"+u6d(save)+"</b>. Comparing total costs before borrowing is the key step in an informed credit decision.",
    {P:P, rs:rs, rl:rl, fl:fl});
}, ["Build the full one year cost of each plan, including fees, then compare the two totals.", "First compute the store card total: the price plus one year of interest."]);

E("u6-compound-growth-figure", 6, ["1.8","1.10"], 3, "gen", function(){
  var P=pick([2000,3000,4000,5000]);
  var r=pick([5,6,7,8]);
  var t=pick([8,10,12,15]);
  var FVs=P*(1+r/100*t), Is=P*r/100*t;
  var FVn=P*Math.pow(1+r/100/12,12*t);
  var FV1=P*Math.pow(1+r/100,t);
  var In=FVn-P, I1=FV1-P;
  var maxV=FVn;
  function bar(v){ return Math.max(14, Math.round(100*v/maxV)); }
  var fig='<svg width="320" height="180" viewBox="0 0 320 180">'
    +'<line x1="40" y1="140" x2="300" y2="140" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<rect x="70" y="'+(140-bar(FVs))+'" width="60" height="'+bar(FVs)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<rect x="190" y="'+(140-bar(FVn))+'" width="60" height="'+bar(FVn)+'" fill="'+FIG_ACC+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<text x="100" y="'+(132-bar(FVs))+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+u6d(FVs)+'</text>'
    +'<text x="220" y="'+(132-bar(FVn))+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+u6d(FVn)+'</text>'
    +'<text x="100" y="158" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">simple</text>'
    +'<text x="220" y="158" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">compound, monthly</text>'
    +'<text x="160" y="174" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">Future value of '+u6d(P)+' at '+fmt(r)+'% over '+t+' years</text></svg>';
  var q=mcq("The chart compares two ways of investing "+u6d(P)+" at "+fmt(r)+"% per year for "+t+" years: simple interest, and compound interest compounded monthly. How much interest does the monthly compounding investment earn?",
    {t:u6d(In), fb:"Correct: the monthly compounding future value minus the principal gives "+u6d(In)+"."},
    [{t:u6d(Is), fb:"That is the simple interest amount, shown by the shorter bar."},
     {t:u6d(I1), fb:"That is the interest with annual compounding. Monthly compounding earns a little more."},
     {t:u6d(FVn), fb:"That is the full future value. Interest earned is the future value minus the principal."}],
    "Read the monthly compounding bar, then subtract the principal. \\[ \\begin{aligned} FV &= "+fmt(P)+"\\left(1 + \\frac{"+fmt(r/100,4)+"}{12}\\right)^{12 \\times "+t+"} \\approx "+fmtF(FVn,2)+" \\\\ \\text{Interest} &= "+fmtF(FVn,2)+" - "+fmt(P)+" \\approx "+fmtF(In,2)+" \\end{aligned} \\] The interest earned is about <b>"+u6d(In)+"</b>. Over long periods, compounding pulls well ahead of simple interest, and more frequent compounding adds a further gain.",
    {P:P, r:r, t:t});
  q.figure=fig;
  return q;
}, ["The taller bar is the compound result. Interest earned is a future value minus the starting principal.", "First find the monthly compounding future value with n equal to 12."]);

E("u6-card-payoff-months", 6, ["1.21","1.22"], 3, "gen", function(){
  var B=1150, id=20, pm=100;
  function ok(b,i,p){
    var net=p-i; if(net<=25) return false;
    var months=Math.ceil(b/net);
    var d1=Math.ceil(b/p), d2=Math.ceil(b/(p+i)), d3=Math.round(b/net);
    var vals=[months,d1,d2,d3];
    var seen={}; for(var k=0;k<4;k++){ if(seen[vals[k]]) return false; seen[vals[k]]=1; }
    return true;
  }
  var attempt=0;
  while(!ok(B,id,pm) && attempt<80){
    attempt++;
    B=pick([600,700,800,900,1000,1100,1150,1200,1300,1400,1500,1600,1800,2000,2200,2400]);
    id=pick([10,15,20,25,30]);
    pm=pick([75,100,125,150]);
  }
  if(!ok(B,id,pm)){ B=1150; id=20; pm=100; }
  var net=pm-id, months=Math.ceil(B/net);
  var who=u6names();
  var frame=ri(0,1), mode=ri(0,2);
  var setupA=who+" owes "+u6d(B)+" on a credit card. The card charges a fixed interest amount of "+u6d(id)+" each month, and "+who+" pays "+u6d(pm)+" at the end of each month. No new purchases are made. ";
  var setupB=who+" has a credit card balance of "+u6d(B)+". A fixed interest charge of "+u6d(id)+" is added each month. Monthly payments of "+u6d(pm)+" are made at the end of each month, and the card is not used for anything else. ";
  var setup=frame===0?setupA:setupB;
  var redSol="Each month the balance falls by the payment minus the interest charge. \\[ \\begin{aligned} \\text{Monthly reduction} &= "+fmt(pm)+" - "+fmt(id)+" = "+fmt(net)+" \\\\ \\text{Months} &= \\frac{"+fmt(B)+"}{"+fmt(net)+"} \\approx "+fmtF(B/net,2)+" \\end{aligned} \\] Rounding up to whole months, the balance is paid off in <b>"+months+" months</b>. ";
  if(mode===0){
    var dIgn=Math.ceil(B/pm), dAdd=Math.ceil(B/(pm+id)), dRound=Math.round(B/net);
    return mcq(setup+"In how many months is the balance paid off?",
      {t:months+" months", fb:"Correct: each month the balance falls by "+u6d(net)+", and the final partial month still counts as a month."},
      [{t:dIgn+" months", fb:"That divides by the full payment and forgets the monthly interest charge."},
       {t:dAdd+" months", fb:"That adds the interest to the payment. Interest reduces what the payment clears, so subtract it."},
       {t:dRound+" months", fb:"That rounds the month count to the nearest whole month. A part month still needs a payment, so round up."}],
      redSol+"Comparing cards by payoff time shows why a lower interest charge matters as much as the payment size.",
      {mode:"months", B:B, id:id, pm:pm});
  }
  if(mode===1){
    var totInt=months*id;
    var dForget=(months-1)*id;
    var dRoundI=Math.round(B/net)*id;
    var dRoundFb="That uses the month count rounded to the nearest month. A part month still carries an interest charge, so round up first.";
    if(dRoundI===dForget){ dRoundI=(months+1)*id; dRoundFb="That charges interest for one month too many. Count the months until the balance clears, no further."; }
    return mcq(setup+"How much interest is paid in total before the balance is cleared?",
      {t:u6d(totInt), fb:"Correct: the interest charge applies in every month until the balance clears."},
      [{t:u6d(dForget), fb:"That leaves out the interest charged in the final month. The charge applies in that month too."},
       {t:u6d(months*pm), fb:"That is the total of the monthly payments, not the interest portion of them."},
       {t:u6d(dRoundI), fb:dRoundFb}],
      redSol+"Total interest is the monthly charge times the number of months. \\[ \\begin{aligned} \\text{Total interest} &= "+months+" \\times "+fmt(id)+" = "+fmt(totInt)+" \\end{aligned} \\] The total interest paid is <b>"+u6d(totInt)+"</b>.",
      {mode:"interest", B:B, id:id, pm:pm});
  }
  var lastBal=B-(months-1)*net;
  var lastPay=lastBal+id;
  var totPaid=(months-1)*pm+lastPay;
  var dFull=months*pm, dFullFb="That pays the full monthly payment in the final month as well. The final payment only needs to clear what is left.";
  if(dFull===totPaid){ dFull=totPaid+pm; dFullFb="That adds a whole extra monthly payment beyond the payoff point."; }
  return mcq(setup+"What is the total amount paid before the balance is cleared?",
    {t:u6d(totPaid), fb:"Correct: full payments run until the final month, when only the remaining balance plus that month interest is due."},
    [{t:u6d(dFull), fb:dFullFb},
     {t:u6d(B), fb:"That is the starting balance only. Interest is paid on top of it."},
     {t:u6d(totPaid-id), fb:"That leaves out the interest charged in the final month."}],
    redSol+"The final balance is cleared by a smaller last payment. \\[ \\begin{aligned} \\text{Balance before final month} &= "+fmt(B)+" - "+(months-1)+" \\times "+fmt(net)+" = "+fmt(lastBal)+" \\\\ \\text{Final payment} &= "+fmt(lastBal)+" + "+fmt(id)+" = "+fmt(lastPay)+" \\\\ \\text{Total paid} &= "+(months-1)+" \\times "+fmt(pm)+" + "+fmt(lastPay)+" = "+fmt(totPaid)+" \\end{aligned} \\] The total amount paid is <b>"+u6d(totPaid)+"</b>.",
    {mode:"paid", B:B, id:id, pm:pm});
}, ["Work out how much of each monthly payment actually reduces the balance after the interest charge.", "First subtract the monthly interest charge from the monthly payment."]);

E("u6-promo-vs-loan", 6, ["1.23","1.19"], 3, "gen", function(){
  var P=pick([900,1000,1200,1500,1800,2000,2400]);
  var rp=pick([26,28,30]);
  var fp=pick([0,99]);
  var rl=pick([8,10,12]);
  var fl=pick([59,89]);
  var promoTot=P+P*rp/100+fp, loanTot=P+P*rl/100+fl;
  var diff=promoTot-loanTot;
  var item=pick(["a sofa set","a refrigerator","a snow blower","a washer and dryer"]);
  var who=u6names();
  if(ri(0,1)===0){
    var halfTot=P+P*rp/200+fp;
    return mcq("A store sells "+item+" for "+u6d(P)+" on a promotion: no interest for 12 months if paid in full, but if any balance remains, interest at "+fmt(rp)+"% is charged on the full original price for the whole year"+(fp>0?", plus a "+u6d(fp)+" administration fee":"")+". "+who+" pays nothing during the year. What is the total owed at month 12?",
      {t:u6d(promoTot), fb:"Correct: the price plus deferred interest on the full price"+(fp>0?" plus the fee":"")+" gives "+u6d(promoTot)+"."},
      [{t:u6d(loanTot), fb:"That is the cost of a bank loan at "+fmt(rl)+"% plus its fee, not the promotion outcome."},
       {t:u6d(halfTot), fb:"That charges interest on half the price. Deferred interest is charged on the full original price."},
       {t:u6d(P*rp/100), fb:"That is the interest only. The price itself is still owed as well."}],
      "Deferred interest applies to the full price for the full year. \\[ \\begin{aligned} \\text{Interest} &= "+fmt(P)+" \\times "+fmt(rp/100)+" = "+fmtF(P*rp/100,2)+" \\\\ \\text{Total owed} &= "+fmt(P)+" + "+fmtF(P*rp/100,2)+(fp>0?" + "+fmt(fp):"")+" = "+fmtF(promoTot,2)+" \\end{aligned} \\] The total owed is <b>"+u6d(promoTot)+"</b>.",
      {mode:"promoTotal", P:P, rp:rp, fp:fp});
  }
  return mcq("For "+item+" priced at "+u6d(P)+", "+who+" compares two plans, each repaid over one year. The store promotion charges deferred interest at "+fmt(rp)+"% on the full price if any balance remains at month 12"+(fp>0?", plus a "+u6d(fp)+" fee":", with no fee")+", and "+who+" expects a balance to remain. A bank loan charges "+fmt(rl)+"% simple interest plus a "+u6d(fl)+" fee. By how much does the bank loan beat the promotion?",
    {t:u6d(diff), fb:"Correct: the promotion total minus the loan total is "+u6d(diff)+"."},
    [{t:u6d(promoTot), fb:"That is the full promotion total, not the gap between the two plans."},
     {t:u6d(loanTot), fb:"That is the full loan total, not the gap between the two plans."},
     {t:u6d(P*rp/100), fb:"That is the promotion interest only. Compare the full totals of both plans."}],
    "Build both totals, then subtract. \\[ \\begin{aligned} \\text{Promotion} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rp/100)+(fp>0?" + "+fmt(fp):"")+" = "+fmtF(promoTot,2)+" \\\\ \\text{Loan} &= "+fmt(P)+" + "+fmt(P)+" \\times "+fmt(rl/100)+" + "+fmt(fl)+" = "+fmtF(loanTot,2)+" \\\\ \\text{Difference} &= "+fmtF(promoTot,2)+" - "+fmtF(loanTot,2)+" = "+fmtF(diff,2)+" \\end{aligned} \\] The bank loan beats the promotion by <b>"+u6d(diff)+"</b>.",
    {mode:"diff", P:P, rp:rp, fp:fp, rl:rl, fl:fl});
}, ["Cost both plans in full, including deferred interest on the full price and all fees, before comparing.", "First compute the promotion total exactly as its terms state it."]);

/* ----- bank-u7.js ----- */
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

/* ----- bank-u8.js ----- */
// Math 2202 Unit 8 Trigonometry question bank
// Cut verbatim from the standalone bank source
// (math-2202-review/bank-src.js, lines 4219 to 4755).
// CRMARKS: u8-cr-elevation-height=2
// CRMARKS: u8-cr-find-angle=2
// CRMARKS: u8-cr-direct-side=2
// CRMARKS: u8-cr-same-side-gap=3
// CRMARKS: u8-cr-shared-side-stage=3
// CRMARKS: u8-cr-clinometer-two-readings=3
// CRMARKS: u8-cr-two-depressions=2
// CRMARKS: u8-cr-baseline-height=3
/* ===== Unit 8 ===== */
/* Unit 8 Trigonometry, Mathematics 2202 Review. Helpers prefixed u8. */
var U8R = Math.PI / 180;
function u8tan(a) { return Math.tan(a * U8R); }
function u8sin(a) { return Math.sin(a * U8R); }
function u8cos(a) { return Math.cos(a * U8R); }
function u8svg(inner, W, H, label) {
  return '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + label + '">' + inner + '</svg>';
}
function u8ln(x1, y1, x2, y2, dash, w) {
  return '<line x1="' + fmt(x1, 1) + '" y1="' + fmt(y1, 1) + '" x2="' + fmt(x2, 1) + '" y2="' + fmt(y2, 1) + '" stroke="' + FIG_INK + '" stroke-width="' + (w || 2) + '"' + (dash ? ' stroke-dasharray="5 4"' : '') + '/>';
}
function u8numMC(prompt, correct, errs, unit, dec, fbC, sol, params) {
  function fv(v) { return fmtF(v, dec); }
  var used = {}; used[fv(correct)] = 1;
  var dist = errs.map(function (e, i) {
    var v = e.v, g = 0;
    while (used[fv(v)] || v <= 0) { v = v + (dec === 0 ? 2.3 : 1.7) + g * 0.9; g++; if (g > 25) { v = correct + (i + 2) * (dec === 0 ? 5 : 3.1); } }
    used[fv(v)] = 1;
    return { t: fv(v) + " " + unit, fb: e.fb };
  });
  return mcq(prompt, { t: fv(correct) + " " + unit, fb: fbC }, dist, sol, params);
}
/* Sight line figure: eye point left, object top right, drawn from the angle. */
function u8ElevFig(ang, distTxt, hTxt) {
  var run = 215, rise = run * u8tan(ang);
  if (rise > 138) { var s = 138 / rise; run *= s; rise *= s; }
  var E = [48, 168], F = [48 + run, 182], T = [48 + run, 182 - 14 - rise];
  var inner = u8ln(20, 182, 312, 182) + u8ln(F[0], F[1], T[0], T[1]) + u8ln(E[0], E[1], T[0], T[1]) + u8ln(E[0], E[1], T[0], E[1], true, 1.5);
  inner += '<circle cx="' + E[0] + '" cy="' + E[1] + '" r="3" fill="' + FIG_INK + '"/>';
  inner += _txt(E[0] + 34, E[1] - 12, ang + "°", 12, false);
  inner += _txt((E[0] + F[0]) / 2, 198, distTxt, 12, false);
  inner += _txt(F[0] + 16, (F[1] + T[1]) / 2, hTxt, 12, false, "start");
  return u8svg(inner, 330, 212, "Angle of elevation diagram");
}
function u8DepressFig(ang, hTxt, dTxt) {
  var vert = 128, run = vert / u8tan(ang);
  if (run > 225) { var s = 225 / run; run *= s; vert *= s; }
  if (run < 62) { var s2 = 62 / run; run *= s2; vert *= s2; if (vert > 150) { vert = 150; } }
  var T = [66, 42], W = [66, 42 + vert], B = [66 + run, 42 + vert];
  var inner = u8ln(T[0], T[1], W[0], W[1]) + u8ln(30, W[1], 316, W[1]) + u8ln(T[0], T[1], B[0], B[1]) + u8ln(T[0], T[1], T[0] + 238, T[1], true, 1.5);
  inner += '<circle cx="' + B[0] + '" cy="' + B[1] + '" r="3.2" fill="' + FIG_ACC + '"/>';
  inner += _txt(T[0] + 42, T[1] + 13, ang + "°", 12, false);
  inner += _txt(T[0] - 14, (T[1] + W[1]) / 2, hTxt, 12, false, "end");
  inner += _txt((W[0] + B[0]) / 2, W[1] + 16, dTxt, 12, false);
  return u8svg(inner, 330, 212, "Angle of depression diagram");
}
function u8RTFig(angTxt, abTxt, bcTxt, acTxt) {
  var A = [48, 172], B = [256, 172], C = [256, 52];
  var inner = u8ln(A[0], A[1], B[0], B[1]) + u8ln(B[0], B[1], C[0], C[1]) + u8ln(C[0], C[1], A[0], A[1]);
  inner += '<path d="M ' + (B[0] - 13) + ' ' + B[1] + ' l 0 -13 l 13 0" fill="none" stroke="' + FIG_INK + '" stroke-width="1.5"/>';
  inner += _txt(A[0] - 12, A[1] + 6, "A", 14, true) + _txt(B[0] + 4, B[1] + 16, "B", 14, true) + _txt(C[0] + 12, C[1] - 4, "C", 14, true);
  inner += _txt(A[0] + 32, A[1] - 12, angTxt, 12, false);
  inner += _txt((A[0] + B[0]) / 2, A[1] + 17, abTxt, 12, false);
  inner += _txt(B[0] + 14, (B[1] + C[1]) / 2, bcTxt, 12, false, "start");
  inner += _txt((A[0] + C[0]) / 2 - 16, (A[1] + C[1]) / 2 - 8, acTxt, 12, false);
  return u8svg(inner, 330, 205, "Right triangle ABC, right angled at B");
}
function u8TwoOppFig(a1, a2, hTxt) {
  var vert = 138, r1 = vert / u8tan(a1), r2 = vert / u8tan(a2), mx = Math.max(r1, r2), sc = 118 / mx;
  r1 *= sc; r2 *= sc;
  var T = [165, 34], F = [165, 34 + vert], L = [165 - r1, 34 + vert], R = [165 + r2, 34 + vert];
  var inner = u8ln(18, F[1], 316, F[1]) + u8ln(T[0], T[1], F[0], F[1]) + u8ln(T[0], T[1], L[0], L[1]) + u8ln(T[0], T[1], R[0], R[1]) + u8ln(T[0], T[1], T[0] - 140, T[1], true, 1.4) + u8ln(T[0], T[1], T[0] + 140, T[1], true, 1.4);
  inner += _txt(T[0] - 30, T[1] + 14, a1 + "°", 12, false) + _txt(T[0] + 30, T[1] + 14, a2 + "°", 12, false);
  inner += _txt(T[0] - 12, (T[1] + F[1]) / 2, hTxt, 12, false, "end");
  inner += _txt(L[0], L[1] + 16, "point 1", 11.5, false) + _txt(R[0], R[1] + 16, "point 2", 11.5, false);
  return u8svg(inner, 334, 200, "Two points on opposite sides, seen from the top");
}
function u8TwoSameFig(aNear, aFar, hTxt) {
  var vert = 138, rn = vert / u8tan(aNear), rf = vert / u8tan(aFar), sc = 218 / rf;
  rn *= sc; rf *= sc; vert = 138;
  var T = [56, 34], F = [56, 34 + vert], N = [56 + rn, 34 + vert], Fa = [56 + rf, 34 + vert];
  var inner = u8ln(18, F[1], 322, F[1]) + u8ln(T[0], T[1], F[0], F[1]) + u8ln(T[0], T[1], N[0], N[1]) + u8ln(T[0], T[1], Fa[0], Fa[1]) + u8ln(T[0], T[1], 306, T[1], true, 1.4);
  inner += _txt(T[0] + 30, T[1] + 24, aNear + "°", 12, false) + _txt(T[0] + 62, T[1] + 10, aFar + "°", 12, false);
  inner += _txt(T[0] - 12, (T[1] + F[1]) / 2, hTxt, 12, false, "end");
  inner += _txt(N[0], N[1] + 16, "near", 11.5, false) + _txt(Fa[0], Fa[1] + 16, "far", 11.5, false);
  return u8svg(inner, 334, 200, "Two points on the same side, seen from the top");
}
function u8SplitFig(mode, l1, l2) {
  var inner = "";
  if (mode === 0) {
    var A = [46, 58], B = [46, 178], C = [292, 178];
    var d = [C[0] - A[0], C[1] - A[1]], bb = [B[0] - A[0], B[1] - A[1]], tt = (bb[0] * d[0] + bb[1] * d[1]) / (d[0] * d[0] + d[1] * d[1]);
    var D = [A[0] + tt * d[0], A[1] + tt * d[1]];
    inner = u8ln(A[0], A[1], B[0], B[1]) + u8ln(B[0], B[1], C[0], C[1]) + u8ln(C[0], C[1], A[0], A[1]) + u8ln(B[0], B[1], D[0], D[1]);
    inner += '<path d="M ' + (B[0] + 12) + ' ' + B[1] + ' l 0 -12 l -12 0" fill="none" stroke="' + FIG_INK + '" stroke-width="1.4"/>';
    inner += _txt((B[0] + C[0]) / 2, B[1] + 16, l1, 12, false) + _txt(A[0] - 8, (A[1] + B[1]) / 2, l2, 12, false, "end");
  } else if (mode === 1) {
    var F = [168, 180], T = [168, 54], L = [44, 180], R = [294, 180];
    inner = u8ln(20, 180, 318, 180) + u8ln(T[0], T[1], F[0], F[1]) + u8ln(T[0], T[1], L[0], L[1]) + u8ln(T[0], T[1], R[0], R[1]);
    inner += _txt((L[0] + F[0]) / 2, 196, l1, 12, false) + _txt((F[0] + R[0]) / 2, 196, l2, 12, false);
  } else {
    inner = '<rect x="52" y="58" width="238" height="118" fill="none" stroke="' + FIG_INK + '" stroke-width="2"/>' + u8ln(52, 176, 290, 58);
    inner += _txt(171, 192, l1, 12, false) + _txt(38, 117, l2, 12, false, "end");
  }
  return u8svg(inner, 334, 208, "Diagram made of right triangles");
}

E("u8-elev-or-depress", 8, ["5.1"], 1, "gen", function () {
  var up = pick([true, false]);
  var a = ri(12, 68); if (a === 45) a = 46;
  var upC = [["a kite flyer", "the top of the kite"], ["a hiker", "the top of a lookout tower"], ["a student on the beach", "the top of a lighthouse"], ["a boater", "the top of a cliff"], ["a spectator", "a drone flying overhead"], ["a surveyor", "the top of a wind turbine"]];
  var dnC = [["a lifeguard in a tower", "a swimmer below"], ["a person on a cliff path", "a kayak on the water below"], ["a worker on a balcony", "a cyclist on the street below"], ["a lighthouse keeper", "a fishing boat below"], ["a person at a canyon lookout", "a raft on the river below"], ["a window cleaner on a scaffold", "a coworker on the ground below"]];
  var c = pick(up ? upC : dnC);
  var kind = up ? "angle of elevation" : "angle of depression";
  var other = up ? "angle of depression" : "angle of elevation";
  var comp = 90 - a;
  var q = mcq("From their position, " + c[0] + " looks " + (up ? "up" : "down") + " at " + c[1] + ". The line of sight makes a " + a + "° angle with the horizontal. What is this angle called?",
    { t: "The " + kind + ", " + a + "°", fb: "Yes: the angle is measured from the horizontal, and the line of sight goes " + (up ? "upward, so it is an angle of elevation." : "downward, so it is an angle of depression.") },
    [{ t: "The " + other + ", " + a + "°", fb: "That name is for looking " + (up ? "down" : "up") + " from the horizontal. This line of sight goes " + (up ? "up." : "down.") },
     { t: "The " + kind + ", " + comp + "°", fb: "The size is measured from the horizontal line itself, not from the vertical. The angle with the horizontal is " + a + "°." },
     { t: "The " + other + ", " + comp + "°", fb: "Two slips here: the direction is " + (up ? "up" : "down") + ", and the angle is measured from the horizontal, so it stays " + a + "°." }],
    "The reference line is the horizontal. Because the line of sight points " + (up ? "above" : "below") + " the horizontal, the angle is an <b>" + kind + " of " + a + "°</b>.",
    { mode: up ? "elev" : "depr", a: a });
  q.figure = u8ElevFig(up ? a : a, "", "");
  if (!up) { q.figure = u8DepressFig(a, "", ""); }
  return q;
}, ["First decide whether the line of sight goes up or down from the horizontal.", "Angles of elevation look up from the horizontal; angles of depression look down from it."]);

E("u8-choose-ratio-equation", 8, ["2.1"], 1, "gen", function () {
  var a = ri(18, 66);
  var modes = [
    { giv: "AC", givName: "hypotenuse", givVal: ri(12, 60), find: "BC", findName: "side opposite angle A", fn: "sin", op: "*", calc: function (g) { return g * u8sin(a); } },
    { giv: "AC", givName: "hypotenuse", givVal: ri(12, 60), find: "AB", findName: "side adjacent to angle A", fn: "cos", op: "*", calc: function (g) { return g * u8cos(a); } },
    { giv: "AB", givName: "side adjacent to angle A", givVal: ri(8, 48), find: "BC", findName: "side opposite angle A", fn: "tan", op: "*", calc: function (g) { return g * u8tan(a); } },
    { giv: "BC", givName: "side opposite angle A", givVal: ri(6, 40), find: "AC", findName: "hypotenuse", fn: "sin", op: "/", calc: function (g) { return g / u8sin(a); } },
    { giv: "AB", givName: "side adjacent to angle A", givVal: ri(8, 48), find: "AC", findName: "hypotenuse", fn: "cos", op: "/", calc: function (g) { return g / u8cos(a); } },
    { giv: "BC", givName: "side opposite angle A", givVal: ri(6, 40), find: "AB", findName: "side adjacent to angle A", fn: "tan", op: "/", calc: function (g) { return g / u8tan(a); } }
  ];
  var m = pick(modes);
  var wrongFn = m.fn === "sin" ? "cos" : "sin";
  var otherOp = m.op === "*" ? "/" : "*";
  function eq(fn, op) { return "\\(x = " + m.givVal + " " + (op === "*" ? "\\times" : "\\div") + " \\" + fn + "(" + a + "^\\circ)\\)"; }
  var q = mcq("In right triangle ABC, the right angle is at B and angle A is " + a + "°. The " + m.givName + ", " + m.giv + ", is " + m.givVal + " m. Which equation finds x, the " + m.findName + " (" + m.find + ")?",
    { t: eq(m.fn, m.op), fb: "Yes: " + m.fn + " links the given side and x for angle A, and the equation is solved for x." },
    [{ t: eq(wrongFn, m.op), fb: "That uses \\" + wrongFn + ", which pairs the wrong two sides for angle A. Check which sides " + m.fn + " connects." },
     { t: eq(m.fn, otherOp), fb: "The ratio choice is right, but the rearrangement is backwards. x is " + (m.op === "*" ? "the given side times the ratio." : "the given side divided by the ratio.") },
     { t: eq(m.fn === "tan" ? "cos" : "tan", m.op), fb: "That ratio pairs a different two sides for angle A. Check which sides " + m.fn + " connects." }],
    "For angle A, the two sides involved are the " + m.givName + " and the " + m.findName + ", so use \\(\\" + m.fn + "\\). Rearranged, the equation is " + eq(m.fn, m.op) + ". The correct equation is <b>" + eq(m.fn, m.op) + "</b>.",
    { mode: m.fn + m.op, a: a, g: m.givVal });
  var ab = m.giv === "AB" ? m.givVal + " m" : (m.find === "AB" ? "x" : "");
  var bc = m.giv === "BC" ? m.givVal + " m" : (m.find === "BC" ? "x" : "");
  var ac = m.giv === "AC" ? m.givVal + " m" : (m.find === "AC" ? "x" : "");
  q.figure = u8RTFig(a + "°", ab, bc, ac);
  return q;
}, ["Name the given side and the side you want, relative to the marked angle.", "Pick the ratio that uses exactly those two sides, then solve that ratio equation for x."]);

E("u8-count-right-triangles", 8, ["5.3"], 1, "gen", function () {
  var mode = ri(0, 2);
  var counts = [3, 2, 2];
  var cnt = counts[mode];
  var l1 = ri(6, 38) + " m", l2 = ri(5, 30) + " m";
  var ctx = ["a brace diagram for a gate", "a roof support sketch", "a surveyor's sketch of a plot", "a ramp support diagram", "a bridge truss sketch", "a shelving bracket diagram"][ri(0, 5)];
  var q = mcq("The diagram shows " + ctx + ", built from straight pieces. How many right triangles appear in the diagram?",
    { t: String(cnt), fb: "Yes: count each small right triangle and, where pieces combine into a larger one, the larger right triangle too." },
    [{ t: String(cnt + 1), fb: "That counts one shape that is not a right triangle. Check each three sided shape for a right angle." },
     { t: String(cnt - 1), fb: "That misses one. Besides the small right triangles, check whether pieces combine into a bigger right triangle." },
     { t: String(cnt + 2), fb: "That overcounts. Only shapes with three sides and one right angle count." }],
    mode === 0 ? "The two small triangles formed by the line from the right angle corner are right triangles, and the whole outer triangle is also a right triangle. That makes <b>3</b> right triangles." : "Each of the two triangles in the diagram has one right angle, and together they form a four sided shape, not another triangle. That makes <b>2</b> right triangles.",
    { mode: mode });
  q.figure = u8SplitFig(mode, l1, l2);
  return q;
}, ["Look for right angle corners first, then check each three sided shape.", "Count small triangles, then check whether they combine into a larger right triangle."]);

E("u8-ratio-meaning", 8, ["2.6"], 1, "gen", function () {
  var triples = [["P", "Q", "R"], ["D", "E", "F"], ["J", "K", "L"], ["M", "N", "S"], ["T", "U", "V"], ["W", "X", "Y"], ["A", "B", "C"], ["G", "H", "I"]];
  var tr = pick(triples);
  var A = tr[0], B = tr[1], C = tr[2];
  var opp = C + B, adj = A + B, hyp = A + C;
  function fr(x, y) { return "\\(" + FR(x, y) + "\\)"; }
  var mode = ri(0, 4);
  var prompt, correct, dist, sol;
  if (mode <= 2) {
    var fn = ["sin", "cos", "tan"][mode];
    var right = [fr(opp, hyp), fr(adj, hyp), fr(opp, adj)][mode];
    var others = [fr(opp, hyp), fr(adj, hyp), fr(opp, adj), fr(hyp, opp)].filter(function (s) { return s !== right; });
    prompt = "In triangle " + A + B + C + ", the right angle is at " + B + ". Which ratio equals \\(\\" + fn + " " + A + "\\)?";
    correct = { t: right, fb: "Yes: \\(\\" + fn + " " + A + "\\) pairs the correct two sides for angle " + A + "." };
    dist = others.map(function (s, i) { return { t: s, fb: ["That fraction is a different ratio for angle " + A + ". Match the two sides that \\" + fn + " uses.", "Check the numerator: \\" + fn + " " + A + " starts with the " + (mode === 1 ? "adjacent side." : "opposite side."), "That fraction has the sides in the wrong places for \\" + fn + " " + A + "."][i] }; });
    sol = "For angle " + A + ", the opposite side is " + opp + ", the adjacent side is " + adj + " and the hypotenuse is " + hyp + ". So \\(\\" + fn + " " + A + " = " + right.replace("\\(", "").replace("\\)", "") + "\\). The answer is <b>" + right + "</b>.";
  } else if (mode === 3) {
    prompt = "In a right triangle, which statement about angle " + A + " is true?";
    correct = { t: "\\(\\tan " + A + " = " + FR("\\sin " + A, "\\cos " + A) + "\\)", fb: "Yes: dividing sine by cosine gives opposite over adjacent, which is tangent." };
    dist = [{ t: "\\(\\tan " + A + " = " + FR("\\cos " + A, "\\sin " + A) + "\\)", fb: "That fraction is upside down: it gives adjacent over opposite, not tangent." },
            { t: "\\(\\tan " + A + " = \\sin " + A + " \\times \\cos " + A + "\\)", fb: "Tangent is a quotient of sine and cosine, not a product." },
            { t: "\\(\\tan " + A + " = \\sin " + A + " + \\cos " + A + "\\)", fb: "Tangent is a quotient of sine and cosine, not a sum." }];
    sol = "\\(\\sin " + A + "\\) is opposite over hypotenuse and \\(\\cos " + A + "\\) is adjacent over hypotenuse. Dividing them cancels the hypotenuse and leaves opposite over adjacent, which is \\(\\tan " + A + "\\). The answer is <b>\\(\\tan " + A + " = " + FR("\\sin " + A, "\\cos " + A) + "\\)</b>.";
  } else {
    var ang = pick([28, 35, 41, 53, 62]);
    prompt = "Angle " + A + " in a right triangle measures " + ang + "°. Which value equals \\(\\cos " + A + "\\)?";
    correct = { t: "\\(\\sin(" + (90 - ang) + "^\\circ)\\)", fb: "Yes: the two acute angles add to 90°, and cosine of one equals sine of the other." };
    dist = [{ t: "\\(\\sin(" + ang + "^\\circ)\\)", fb: "That equals the cosine of the other acute angle, not of " + A + " itself (unless the angle is 45°)." },
            { t: "\\(\\cos(" + (90 - ang) + "^\\circ)\\)", fb: "That equals \\(\\sin " + A + "\\), the complement pairing the other way around." },
            { t: "\\(\\tan(" + (90 - ang) + "^\\circ)\\)", fb: "Tangent pairs opposite with adjacent; it does not match a cosine value in general." }];
    sol = "The acute angles of a right triangle are complementary, so \\(\\cos " + A + " = \\sin(90^\\circ - " + ang + "^\\circ) = \\sin(" + (90 - ang) + "^\\circ)\\). The answer is <b>\\(\\sin(" + (90 - ang) + "^\\circ)\\)</b>.";
  }
  return mcq(prompt, correct, dist, sol, { mode: mode, tri: tr.join("") });
}, ["Name the sides relative to the marked angle: opposite, adjacent, hypotenuse.", "Sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, tangent is opposite over adjacent."]);

E("u8-elevation-height-mc", 8, ["5.1", "2.1"], 2, "gen", function () {
  var a = ri(24, 58), d = ri(18, 85);
  var eye = pick([0, 0, 1.4, 1.5, 1.6, 1.7]);
  var ctx = pick([["communications tower", "a service road marker"], ["office building", "a point on the sidewalk"], ["flagpole", "a marker on the field"], ["wind turbine", "the fence gate"], ["water tower", "a point in the parking lot"], ["church steeple", "a point on the front lawn"]]);
  var raw = d * u8tan(a), ans = raw + eye;
  var errs = [{ v: d / u8tan(a), fb: "That divides by the tangent. The height is the side opposite the angle, so the distance is multiplied by the tangent." },
              { v: d * u8sin(a), fb: "That uses sine, which needs the hypotenuse. The known side here lies along the ground, so tangent is the ratio to use." },
              eye > 0 ? { v: raw, fb: "That is the height above the measuring point only. The angle was measured from instrument height, so that height still has to be added." } : { v: d * u8tan(90 - a), fb: "That uses the complement of the angle. The given angle is measured from the horizontal ground line, so use it as it stands." }];
  var prompt = "A surveyor stands " + d + " m from the base of a " + ctx[0] + ", at " + ctx[1] + ". The angle of elevation to the top is " + a + "°" + (eye > 0 ? ", measured with an instrument held " + fmtF(eye, 1) + " m above the ground" : "") + ". What is the height of the " + ctx[0].split(" ").pop() + "?";
  var sol = "The ground distance is adjacent to the angle and the height is opposite it, so use tangent. \\[ \\begin{aligned} \\tan(" + a + "^\\circ) &= " + FR("h", d) + " \\\\ h &= " + d + " \\times \\tan(" + a + "^\\circ) \\\\ &= " + fmt(raw) + " \\text{ m}" + (eye > 0 ? " \\\\ \\text{total height} &= " + fmt(raw) + " + " + fmtF(eye, 1) + " = " + fmt(ans) + " \\text{ m}" : "") + " \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.";
  var q = u8numMC(prompt.replace(/\?$/, ", in metres?"), ans, errs, "", 1, "Yes: tangent with the ground distance, " + (eye > 0 ? "then add the instrument height." : "as shown in the worked solution."), sol, { a: a, d: d, eye: eye });
  q.figure = u8ElevFig(a, d + " m", "?");
  return q;
}, ["The ground distance and the height form the adjacent and opposite sides of the angle.", "Use tangent, then remember anything the angle was measured from above ground level."]);

E("u8-depression-distance-mc", 8, ["5.1", "2.2"], 2, "gen", function () {
  var a = ri(18, 55), h = ri(20, 120);
  var ctx = pick([["cliff lookout", "a kayak on the water"], ["lighthouse gallery", "a fishing boat"], ["hotel balcony", "a paddle boarder on the pond"], ["observation tower", "a trail marker in the valley"], ["ferry deck", "a navigation buoy"]]);
  var ans = h / u8tan(a);
  var errs = [{ v: h * u8tan(a), fb: "That multiplies by the tangent, which would find a height from a distance. Here the height is known, so rearrange and divide." },
              { v: h * u8sin(a), fb: "That uses sine with the height as if it were part of a sloped side. The sight line is sloped, but the height and the water distance are the two legs." },
              { v: h / u8tan(90 - a), fb: "That uses the complement of the angle. An angle of depression equals the angle at the far point measured from the water, so use the given angle directly." }];
  var prompt = "From a " + ctx[0] + " that is " + h + " m above the water, the angle of depression to " + ctx[1] + " is " + a + "°. How far is the " + ctx[1].split(" ").pop() + " from the base of the structure, measured along the water?";
  var sol = "The angle of depression from the top equals the angle of elevation from the water, so the height and the distance are opposite and adjacent in the same right triangle. \\[ \\begin{aligned} \\tan(" + a + "^\\circ) &= " + FR(h, "d") + " \\\\ d &= " + FR(h, "\\tan(" + a + "^\\circ)") + " \\\\ &= " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.";
  var q = u8numMC(prompt.replace(/\?$/, ", in metres?"), ans, errs, "", 1, "Yes: the height is opposite the angle and the water distance is adjacent, so the distance is the height divided by the tangent.", sol, { a: a, h: h });
  q.figure = u8DepressFig(a, h + " m", "?");
  return q;
}, ["Move the angle of depression down to the far point: it matches the angle of elevation there.", "Set up tangent with the known height, then rearrange to solve for the distance."]);

E("u8-two-triangles-gap-mc", 8, ["5.2", "5.3"], 2, "gen", function () {
  var h = ri(18, 55), a1 = ri(22, 48), a2 = ri(24, 50);
  var ctx = pick([["lighthouse", "two fishing boats"], ["lookout tower", "two trail markers"], ["harbour crane", "two work boats"], ["cliff top station", "two kayaks"]]);
  var d1 = h / u8tan(a1), d2 = h / u8tan(a2), ans = d1 + d2;
  var errs = [{ v: Math.abs(d1 - d2), fb: "That subtracts the two distances, which fits points on the same side. These two are on opposite sides, so the gap is the sum." },
              { v: h * (u8tan(a1) + u8tan(a2)), fb: "That multiplies the height by the tangents. Each ground distance is the height divided by its tangent." },
              { v: Math.max(d1, d2), fb: "That is only the distance to the farther point. The gap runs from one point, through the base, to the other point." }];
  var prompt = "From the top of a " + h + " m " + ctx[0] + ", the angles of depression to " + ctx[1] + " on opposite sides of the structure are " + a1 + "° and " + a2 + "°. How far apart are the two " + ctx[1].split(" ").pop() + "?";
  var sol = "Each sight line forms its own right triangle with the structure, and the two triangles share the height of " + h + " m. \\[ \\begin{aligned} d_1 &= " + FR(h, "\\tan(" + a1 + "^\\circ)") + " = " + fmt(d1) + " \\text{ m} \\\\ d_2 &= " + FR(h, "\\tan(" + a2 + "^\\circ)") + " = " + fmt(d2) + " \\text{ m} \\\\ \\text{gap} &= " + fmt(d1) + " + " + fmt(d2) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The points are on opposite sides, so the distances add. The answer is <b>" + fmtF(ans, 1) + " m</b>.";
  var q = u8numMC(prompt.replace(/\?$/, ", in metres?"), ans, errs, "", 1, "Yes: one tangent calculation for each triangle, then add because the points are on opposite sides.", sol, { h: h, a1: a1, a2: a2 });
  q.figure = u8TwoOppFig(a1, a2, h + " m");
  return q;
}, ["Split the picture into two right triangles that share the height.", "Find the ground distance in each triangle, then decide from the diagram whether to add or subtract."]);

E("u8-fix-ratio-error", 8, ["2.5", "5.4"], 2, "gen", function () {
  var modes = [
    { text: function (a, g) { return "A ladder leans against a wall. Its foot is " + g + " m from the wall and the ladder makes a " + a + "° angle with the ground. A student writes \\(h = " + g + " \\times \\cos(" + a + "^\\circ)\\) to find the height h the ladder reaches."; }, fn: "tan", op: "*", wrong: "\\(\\cos\\)", givName: "ground distance (adjacent)", findName: "height (opposite)" },
    { text: function (a, g) { return "A kite string is " + g + " m long and makes a " + a + "° angle with the ground. A student writes \\(h = " + g + " \\div \\sin(" + a + "^\\circ)\\) to find the height h of the kite."; }, fn: "sin", op: "*", wrong: "division by \\(\\sin\\)", givName: "string (hypotenuse)", findName: "height (opposite)" },
    { text: function (a, g) { return "A roof rafter is " + g + " m long and rises at " + a + "° to the horizontal. A student writes \\(r = " + g + " \\times \\sin(" + a + "^\\circ)\\) to find the horizontal run r of the rafter."; }, fn: "cos", op: "*", wrong: "\\(\\sin\\)", givName: "rafter (hypotenuse)", findName: "run (adjacent)" },
    { text: function (a, g) { return "A student stands " + g + " m from a tower and measures a " + a + "° angle of elevation to the top. The student writes \\(h = " + g + " \\div \\tan(" + a + "^\\circ)\\) to find the height h of the tower."; }, fn: "tan", op: "*", wrong: "division by \\(\\tan\\)", givName: "ground distance (adjacent)", findName: "height (opposite)" },
    { text: function (a, g) { return "A guy wire runs from the top of a pole to a ground anchor " + g + " m from the pole, making a " + a + "° angle with the ground. A student writes \\(L = " + g + " \\times \\cos(" + a + "^\\circ)\\) to find the wire length L."; }, fn: "cos", op: "/", wrong: "\\(\\times \\cos\\)", givName: "ground distance (adjacent)", findName: "wire (hypotenuse)" },
    { text: function (a, g) { return "A playground slide drops " + g + " m and makes a " + a + "° angle with the ground. A student writes \\(L = " + g + " \\times \\sin(" + a + "^\\circ)\\) to find the slide length L."; }, fn: "sin", op: "/", wrong: "\\(\\times \\sin\\)", givName: "drop (opposite)", findName: "slide (hypotenuse)" }
  ];
  var m = pick(modes);
  var a = ri(24, 58), g = ri(6, 45);
  var sym = m.findName.split(" ")[0];
  var target = sym === "height" ? "h" : (sym === "run" ? "r" : "L");
  function eq(fn, op) { return "\\(" + target + " = " + g + " " + (op === "*" ? "\\times" : "\\div") + " \\" + fn + "(" + a + "^\\circ)\\)"; }
  var altFn = m.fn === "tan" ? "sin" : "tan";
  var altOp = m.op === "*" ? "/" : "*";
  return mcq(m.text(a, g) + " Which equation is correct?",
    { t: eq(m.fn, m.op), fb: "Yes: the given side is the " + m.givName + " and the wanted side is the " + m.findName + ", so \\(\\" + m.fn + "\\) rearranged gives this." },
    [{ t: eq(m.fn, altOp), fb: "The ratio is right but the operation is flipped. Solve the ratio equation for the wanted side before choosing." },
     { t: eq(altFn, m.op), fb: "That ratio pairs a different two sides. The sides here are the " + m.givName + " and the " + m.findName + "." },
     { t: eq(altFn, altOp), fb: "Both the ratio and the rearrangement are off. Start from the two sides named in the problem." }],
    "The student's slip involves " + m.wrong + ". The sides in play are the " + m.givName + " and the " + m.findName + ", which belong to \\(\\" + m.fn + "\\). Solved for the wanted side, the correct equation is <b>" + eq(m.fn, m.op) + "</b>.",
    { mode: modes.indexOf(m), a: a, g: g });
}, ["Ignore the student's working at first: name the given and wanted sides yourself.", "Choose the ratio for those two sides, then solve it for the wanted side."]);

E("u8-trig-in-trades", 8, ["2.3"], 2, "gen", function () {
  var mode = ri(0, 4);
  var prompt, correct, dist, sol;
  if (mode === 0 || mode === 3) {
    var rise = ri(2, 9), run = ri(8, 30); if (rise === run) run += 3;
    var who = mode === 0 ? ["A carpenter", "a wheelchair ramp", "steepness angle"] : ["A stair builder", "a set of stairs", "angle of the stair stringer"];
    prompt = who[0] + " builds " + who[1] + " with a rise of " + rise + " m over a run of " + run + " m. Which calculation gives the " + who[2] + " \\(\\theta\\)?";
    correct = { t: "\\(\\theta = \\tan^{-1}\\left(" + FR(rise, run) + "\\right)\\)", fb: "Yes: rise over run is a tangent ratio, so the inverse tangent returns the angle." };
    dist = [{ t: "\\(\\theta = \\sin^{-1}\\left(" + FR(rise, run) + "\\right)\\)", fb: "Sine needs the hypotenuse. Rise and run are the two legs, which is tangent territory." },
            { t: "\\(\\theta = \\tan^{-1}\\left(" + FR(run, rise) + "\\right)\\)", fb: "That flips the ratio, which gives the complement of the angle instead." },
            { t: "\\(\\theta = \\cos^{-1}\\left(" + FR(rise, run) + "\\right)\\)", fb: "Cosine pairs the adjacent side with the hypotenuse, and no hypotenuse is given here." }];
    sol = "Rise and run are the opposite and adjacent sides, so their ratio is a tangent. The worker uses the inverse tangent: \\(\\theta = \\tan^{-1}\\left(" + FR(rise, run) + "\\right) \\approx " + fmt(Math.atan(rise / run) / U8R) + "^\\circ\\). The answer is <b>\\(\\theta = \\tan^{-1}\\left(" + FR(rise, run) + "\\right)\\)</b>.";
    return mcq(prompt, correct, dist, sol, { mode: mode, rise: rise, run: run });
  }
  if (mode === 1) {
    var a = ri(26, 48), d = ri(15, 60);
    prompt = "A surveyor stands " + d + " m from a building and measures a " + a + "° angle of elevation to the roofline. Which calculation gives the height h of the building above the surveyor's instrument?";
    correct = { t: "\\(h = " + d + " \\times \\tan(" + a + "^\\circ)\\)", fb: "Yes: surveyors turn a measured distance and angle into a height with tangent, since the height is opposite the angle." };
    dist = [{ t: "\\(h = " + d + " \\times \\sin(" + a + "^\\circ)\\)", fb: "Sine would need the sloped sight distance, which the surveyor did not measure." },
            { t: "\\(h = " + d + " \\div \\tan(" + a + "^\\circ)\\)", fb: "That rearrangement finds a distance from a height, the reverse of this job." },
            { t: "\\(h = " + d + " \\times \\cos(" + a + "^\\circ)\\)", fb: "Cosine pairs the ground distance with a sloped side, not with the vertical height." }];
    sol = "The measured ground distance is adjacent to the angle and the height is opposite, so the surveyor uses tangent: \\(h = " + d + " \\times \\tan(" + a + "^\\circ) = " + fmt(d * u8tan(a)) + "\\) m. The answer is <b>\\(h = " + d + " \\times \\tan(" + a + "^\\circ)\\)</b>.";
    return mcq(prompt, correct, dist, sol, { mode: mode, a: a, d: d });
  }
  if (mode === 2) {
    var a2 = ri(24, 44), L = ri(4, 12);
    prompt = "An installer tilts a solar panel of length " + L + " m at " + a2 + "° to a flat roof. Which calculation gives h, the height of the raised edge above the roof?";
    correct = { t: "\\(h = " + L + " \\times \\sin(" + a2 + "^\\circ)\\)", fb: "Yes: the panel is the hypotenuse and the raised edge is opposite the tilt angle, so sine does the job." };
    dist = [{ t: "\\(h = " + L + " \\times \\cos(" + a2 + "^\\circ)\\)", fb: "Cosine would give the distance along the roof under the panel, not the raised height." },
            { t: "\\(h = " + L + " \\div \\sin(" + a2 + "^\\circ)\\)", fb: "Dividing would make h longer than the panel itself, but a leg cannot exceed the hypotenuse." },
            { t: "\\(h = " + L + " \\times \\tan(" + a2 + "^\\circ)\\)", fb: "Tangent needs the roof distance under the panel, which is not the given length." }];
    sol = "The panel is the hypotenuse and the raised edge is the side opposite the " + a2 + "° angle, so the installer uses sine: \\(h = " + L + " \\times \\sin(" + a2 + "^\\circ) = " + fmt(L * u8sin(a2)) + "\\) m. The answer is <b>\\(h = " + L + " \\times \\sin(" + a2 + "^\\circ)\\)</b>.";
    return mcq(prompt, correct, dist, sol, { mode: mode, a: a2, L: L });
  }
  var drop = ri(1, 4), len = ri(10, 40);
  prompt = "A plumber runs a drain pipe that drops " + drop + " m over a horizontal run of " + len + " m. Which calculation gives the pipe's angle \\(\\theta\\) below the horizontal?";
  correct = { t: "\\(\\theta = \\tan^{-1}\\left(" + FR(drop, len) + "\\right)\\)", fb: "Yes: drop over run is a tangent ratio, and the inverse tangent turns it into the angle." };
  dist = [{ t: "\\(\\theta = \\tan^{-1}\\left(" + FR(len, drop) + "\\right)\\)", fb: "That flips drop and run, giving the angle from the vertical instead of from the horizontal." },
          { t: "\\(\\theta = \\sin^{-1}\\left(" + FR(drop, len) + "\\right)\\)", fb: "Sine would need the sloped pipe length itself, not the horizontal run." },
          { t: "\\(\\theta = " + FR(drop, len) + " \\times 90^\\circ\\)", fb: "A ratio is not a fraction of a right angle. Angles from ratios come from an inverse trig function." }];
  sol = "Drop and run are opposite and adjacent sides, a tangent ratio. The plumber uses the inverse tangent: \\(\\theta = \\tan^{-1}\\left(" + FR(drop, len) + "\\right) \\approx " + fmt(Math.atan(drop / len) / U8R) + "^\\circ\\). The answer is <b>\\(\\theta = \\tan^{-1}\\left(" + FR(drop, len) + "\\right)\\)</b>.";
  return mcq(prompt, correct, dist, sol, { mode: mode, drop: drop, len: len });
}, ["Decide what the worker knows and what the worker needs, as sides of a right triangle.", "Match those two sides to a ratio; an angle answer needs an inverse ratio."]);

E("u8-reasonable-or-not", 8, ["5.4"], 2, "gen", function () {
  var mode = ri(0, 3);
  var prompt, correct, dist, sol;
  if (mode === 0) {
    var hyp = ri(30, 80), extra = ri(3, 18), claim = hyp + extra;
    var ctx = pick([["cable car line", "support tower"], ["zipline", "platform"], ["ferry sight line", "harbour tower"]]);
    prompt = "A two-triangle problem uses a " + ctx[0] + ". In one triangle the sloped line is " + hyp + " m long, and a student reports that the vertical height in that same triangle is " + claim + " m. Why is the student's result not reasonable?";
    correct = { t: "A leg of a right triangle cannot be longer than its hypotenuse, and " + claim + " m is longer than the " + hyp + " m sloped side.", fb: "Yes: the hypotenuse is always the longest side of a right triangle." };
    dist = [{ t: "The height should have been rounded to the nearest metre, and rounding it would have fixed the problem.", fb: "Rounding shifts a value slightly; it cannot push a leg past the hypotenuse." },
            { t: "The two triangles in the problem must have the same height, since they share the same structure and the same kind.", fb: "Nothing requires the two triangles to match. The problem is the size compared with the hypotenuse." },
            { t: "Heights in trig problems are always less than 25 m, so any taller result is wrong on that ground alone.", fb: "There is no such limit. The check that fails here is leg versus hypotenuse." }];
    sol = "In the triangle named, the " + hyp + " m sloped side is the hypotenuse. Every leg must be shorter than the hypotenuse, so a height of " + claim + " m is impossible. The result is <b>not reasonable: a leg cannot exceed the hypotenuse</b>.";
  } else if (mode === 1) {
    var ang = ri(94, 138);
    var ctx2 = pick([["roof truss", "peak"], ["ramp brace", "top corner"], ["lookout", "sight post"]]);
    prompt = "Solving a two-triangle problem about a " + ctx2[0] + ", a student reports that one of the acute angles in a right triangle is " + ang + "°. Why is the student's result not reasonable?";
    correct = { t: "The acute angles of a right triangle are each between 0° and 90°, and " + ang + "° is past 90°.", fb: "Yes: with one angle already 90°, the other two must add to 90°, so each is under 90°." };
    dist = [{ t: "Angles in trig problems must be whole numbers of degrees, with no decimals allowed in the answer.", fb: ang + "° is a whole number, so that is not the issue. The issue is its size." },
            { t: "The angle should have been measured from the vertical, not from the horizontal line.", fb: "Measuring from the vertical gives the complement, which would be negative here. The reported size itself breaks the 90° limit for an acute angle." },
            { t: "The two acute angles of a right triangle are always equal to each other, in every right triangle.", fb: "They are equal only in an isosceles right triangle. They must add to 90°, not match each other." }];
    sol = "A right triangle already has a 90° angle, so the other two angles add to 90° and each one is less than 90°. A reported acute angle of " + ang + "° breaks that. The result is <b>not reasonable: an acute angle of a right triangle must be under 90°</b>.";
  } else if (mode === 2) {
    var p1 = ri(20, 60), p2 = ri(15, 55), claim2 = Math.min(p1, p2) - ri(2, 8);
    prompt = "Two boats lie on opposite sides of a lighthouse. Their distances from the base are " + p1 + " m and " + p2 + " m. A student says the boats are " + claim2 + " m apart. Why is the student's result not reasonable?";
    correct = { t: "The distance apart is the sum " + p1 + " + " + p2 + " = " + (p1 + p2) + " m, so it must be larger than either single distance.", fb: "Yes: with the base between the boats, the gap covers both distances end to end." };
    dist = [{ t: "The student should have averaged the two distances, (" + p1 + " + " + p2 + ") / 2 = " + fmt((p1 + p2) / 2) + " m, instead of adding them.", fb: "An average would still be smaller than the full gap. Opposite sides means the distances add." },
            { t: "Distances at sea are measured in kilometres, not metres, so the answer is in the wrong unit.", fb: "The unit choice does not change the comparison. The claimed gap is smaller than one of its own parts." },
            { t: "The boats must be the same distance from the lighthouse, since they are measured from the same base point.", fb: "Nothing requires that. The check that fails is part versus whole: the whole gap must exceed each part." }];
    sol = "The base of the lighthouse sits between the boats, so the gap is the sum of the two parts: " + p1 + " + " + p2 + " = " + (p1 + p2) + " m. A claim of " + claim2 + " m is less than the " + Math.min(p1, p2) + " m part alone. The result is <b>not reasonable: the whole must exceed each of its parts</b>.";
  } else {
    var str = ri(25, 60), claim3 = str + ri(4, 20);
    prompt = "A kite is flown on a " + str + " m string, and the vertical height is found from one triangle of a two-triangle problem. A student reports the kite's height as " + claim3 + " m. Why is the student's result not reasonable?";
    correct = { t: "The string is the hypotenuse of the triangle, so the height, a leg, must be less than " + str + " m.", fb: "Yes: no leg of a right triangle can be longer than the hypotenuse." };
    dist = [{ t: "Kites never fly higher than 20 m, no matter how long the string is or how strong the wind blows.", fb: "There is no fixed height limit for a kite. The failed check is the comparison with the string length." },
            { t: "The height should equal the string length when the string is tight and held firmly.", fb: "Height equals string length only if the string is straight up, which would leave no triangle at all." },
            { t: "The student forgot to convert the string length to centimetres before reporting the height.", fb: "A unit conversion keeps the same physical length. It cannot make a leg longer than the hypotenuse." }];
    sol = "The string forms the hypotenuse of the right triangle and the height is one leg. A leg is always shorter than the hypotenuse, so the height must be under " + str + " m, not " + claim3 + " m. The result is <b>not reasonable: a leg cannot exceed the hypotenuse</b>.";
  }
  return mcq(prompt, correct, dist, sol, { mode: mode });
}, ["Test the claimed answer against the triangle itself: side lengths and angle sizes have hard limits.", "Ask whether any leg beats the hypotenuse, any acute angle passes 90°, or a whole comes out smaller than a part."]);

E("u8-cr-elevation-height", 8, ["5.1", "2.2"], 2, "gen", function () {
  var a = ri(26, 56), d = ri(22, 78), eye = pick([1.3, 1.4, 1.5, 1.6, 1.7]);
  var ctx = pick([["tree in a park", "a park ranger"], ["school flagpole", "a student"], ["water tower", "a maintenance worker"], ["cell tower", "a technician"]]);
  var raw = d * u8tan(a), ans = raw + eye;
  var q = numq(ctx[1] + " uses a clinometer held " + fmtF(eye, 1) + " m above the ground, standing " + d + " m from the base of a " + ctx[0] + ". The angle of elevation to the top is " + a + "°. Find the total height of the " + ctx[0].split(" ").pop() + ", in metres. Give your answer to one decimal place.",
    ans, 0.3,
    "The height above the clinometer and the ground distance are opposite and adjacent, so use tangent, then add the clinometer height. \\[ \\begin{aligned} \\tan(" + a + "^\\circ) &= " + FR("h", d) + " \\\\ h &= " + d + " \\times \\tan(" + a + "^\\circ) = " + fmt(raw) + " \\text{ m} \\\\ \\text{total height} &= " + fmt(raw) + " + " + fmtF(eye, 1) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { a: a, d: d, eye: eye });
  q.figure = u8ElevFig(a, d + " m", "?");
  return q;
}, ["The angle, the ground distance and the height above the instrument form a right triangle.", "Use tangent to find the height above the instrument, then add the instrument height."]);

E("u8-cr-find-angle", 8, ["2.2", "5.1"], 2, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var rise = ri(1, 6), run = ri(6, 24), ang = Math.atan(rise / run) / U8R;
    return numq("A garden ramp rises " + rise + " m over a horizontal run of " + run + " m. Find the angle the ramp makes with the ground, in degrees, to one decimal place.",
      ang, 0.4,
      "Rise and run are opposite and adjacent, so the angle comes from the inverse tangent. \\[ \\begin{aligned} \\tan(\\theta) &= " + FR(rise, run) + " \\\\ \\theta &= \\tan^{-1}\\left(" + FR(rise, run) + "\\right) \\\\ &= " + fmt(ang) + "^\\circ \\end{aligned} \\] The answer is <b>" + fmtF(ang, 1) + "°</b>.",
      { mode: mode, rise: rise, run: run });
  }
  if (mode === 1) {
    var str = ri(30, 90), ht = ri(12, str - 8), ang2 = Math.asin(ht / str) / U8R;
    return numq("A kite is flying " + ht + " m above the ground on a tight string " + str + " m long. Find the angle the string makes with the ground, in degrees, to one decimal place.",
      ang2, 0.4,
      "The height is opposite the angle and the string is the hypotenuse, so the angle comes from the inverse sine. \\[ \\begin{aligned} \\sin(\\theta) &= " + FR(ht, str) + " \\\\ \\theta &= \\sin^{-1}\\left(" + FR(ht, str) + "\\right) \\\\ &= " + fmt(ang2) + "^\\circ \\end{aligned} \\] The answer is <b>" + fmtF(ang2, 1) + "°</b>.",
      { mode: mode, str: str, ht: ht });
  }
  var len = ri(4, 9), foot = ri(1, len - 1), ang3 = Math.acos(foot / len) / U8R;
  return numq("A ladder " + len + " m long leans against a wall with its foot " + foot + " m from the wall. Find the angle the ladder makes with the ground, in degrees, to one decimal place.",
    ang3, 0.4,
    "The ground distance is adjacent to the angle and the ladder is the hypotenuse, so the angle comes from the inverse cosine. \\[ \\begin{aligned} \\cos(\\theta) &= " + FR(foot, len) + " \\\\ \\theta &= \\cos^{-1}\\left(" + FR(foot, len) + "\\right) \\\\ &= " + fmt(ang3) + "^\\circ \\end{aligned} \\] The answer is <b>" + fmtF(ang3, 1) + "°</b>.",
    { mode: mode, len: len, foot: foot });
}, ["Name the two given sides relative to the angle you want.", "Build the ratio from those sides, then use the matching inverse trig function."]);

E("u8-cr-direct-side", 8, ["2.1"], 2, "gen", function () {
  var modes = [
    { ctx: function (a, g) { return "A crane cable " + g + " m long runs from the top of a boom down to a load, making a " + a + "° angle with the horizontal. Find the vertical drop from the boom top to the load, in metres."; }, calc: function (a, g) { return g * u8sin(a); }, fn: "sin", rel: "the cable is the hypotenuse and the drop is opposite the angle" },
    { ctx: function (a, g) { return "A conveyor belt " + g + " m long is inclined at " + a + "° to the floor. Find the horizontal distance the belt covers, in metres."; }, calc: function (a, g) { return g * u8cos(a); }, fn: "cos", rel: "the belt is the hypotenuse and the floor distance is adjacent to the angle" },
    { ctx: function (a, g) { return "From a point " + g + " m from the base of a silo, the angle of elevation to the top is " + a + "°. Find the height of the silo, in metres."; }, calc: function (a, g) { return g * u8tan(a); }, fn: "tan", rel: "the ground distance is adjacent and the height is opposite" },
    { ctx: function (a, g) { return "A kite is " + g + " m above the ground and its string makes a " + a + "° angle with the ground. Find the length of string let out, in metres."; }, calc: function (a, g) { return g / u8sin(a); }, fn: "sin", rel: "the height is opposite the angle and the string is the hypotenuse" },
    { ctx: function (a, g) { return "A guy wire is anchored " + g + " m from the base of a pole and makes a " + a + "° angle with the ground. Find the length of the wire, in metres."; }, calc: function (a, g) { return g / u8cos(a); }, fn: "cos", rel: "the ground distance is adjacent and the wire is the hypotenuse" },
    { ctx: function (a, g) { return "The top of a " + g + " m tall wharf light is seen from a boat. The angle of elevation from the boat is " + a + "°. Find how far the boat is from the wharf, in metres."; }, calc: function (a, g) { return g / u8tan(a); }, fn: "tan", rel: "the height is opposite the angle and the water distance is adjacent" }
  ];
  var m = pick(modes), a = ri(22, 62), g = ri(8, 60), ans = m.calc(a, g);
  var divMode = (modes.indexOf(m) >= 3);
  var expr = divMode ? (g + " \\div \\" + m.fn + "(" + a + "^\\circ)") : (g + " \\times \\" + m.fn + "(" + a + "^\\circ)");
  return numq(m.ctx(a, g) + " Give your answer to one decimal place.",
    ans, 0.3,
    "Here " + m.rel + ", so use \\(\\" + m.fn + "\\) and solve for the unknown side. \\[ \\begin{aligned} \\text{unknown} &= " + expr + " \\\\ &= " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { mode: modes.indexOf(m), a: a, g: g });
}, ["Name the given side and the wanted side relative to the angle.", "Use the one ratio that contains exactly those two sides, then solve for the unknown."]);

E("u8-cr-same-side-gap", 8, ["5.2"], 2, "gen", function () {
  var h = ri(24, 70), aN = ri(34, 58), aF = aN - ri(9, 20);
  var ctx = pick([["lighthouse", "ferries"], ["coast guard tower", "sailboats"], ["harbour light", "kayaks"], ["lookout platform", "tour boats"]]);
  var dN = h / u8tan(aN), dF = h / u8tan(aF), ans = dF - dN;
  var q = numq("From the top of a " + h + " m " + ctx[0] + ", the angles of depression to two " + ctx[1] + " on the same side of the structure are " + aN + "° for the nearer one and " + aF + "° for the farther one. Find the distance between the two " + ctx[1] + ", in metres, to one decimal place.",
    ans, 0.35,
    "Both sight lines form right triangles sharing the height of " + h + " m. \\[ \\begin{aligned} d_{\\text{near}} &= " + FR(h, "\\tan(" + aN + "^\\circ)") + " = " + fmt(dN) + " \\text{ m} \\\\ d_{\\text{far}} &= " + FR(h, "\\tan(" + aF + "^\\circ)") + " = " + fmt(dF) + " \\text{ m} \\\\ \\text{gap} &= " + fmt(dF) + " - " + fmt(dN) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The points are on the same side, so the distances subtract. The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { h: h, aN: aN, aF: aF });
  q.figure = u8TwoSameFig(aN, aF, h + " m");
  return q;
}, ["Each sight line makes its own right triangle with the structure, and both share the height.", "Find both ground distances from the base, then combine them the way the diagram shows."]);

E("u8-cr-shared-side-stage", 8, ["5.2", "2.4"], 2, "gen", function () {
  var d = ri(25, 70), a1 = ri(20, 38), a2 = a1 + ri(8, 18);
  var ctx = pick([["antenna", "office building"], ["flagpole", "school"], ["sign", "community centre"], ["weather mast", "fire hall"]]);
  var hB = d * u8tan(a1), hT = d * u8tan(a2), ans = hT - hB;
  var q = numq("An " + ctx[0] + " stands on the roof of a " + ctx[1] + ". From a point " + d + " m from the base of the building, the angle of elevation to the roofline is " + a1 + "° and the angle of elevation to the top of the " + ctx[0] + " is " + a2 + "°. Find the height of the " + ctx[0] + " itself, in metres, to one decimal place.",
    ans, 0.35,
    "Both angles are measured from the same point, so both triangles share the ground distance of " + d + " m. \\[ \\begin{aligned} h_{\\text{roof}} &= " + d + " \\times \\tan(" + a1 + "^\\circ) = " + fmt(hB) + " \\text{ m} \\\\ h_{\\text{top}} &= " + d + " \\times \\tan(" + a2 + "^\\circ) = " + fmt(hT) + " \\text{ m} \\\\ \\text{" + ctx[0] + "} &= " + fmt(hT) + " - " + fmt(hB) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { d: d, a1: a1, a2: a2 });
  q.figure = u8ElevFig(a2, d + " m", "?");
  return q;
}, ["Both sight lines start at the same ground point, so the two triangles share the ground distance.", "Find the height to the roofline and the height to the very top, then subtract."]);

E("u8-cr-clinometer-two-readings", 8, ["5.1", "2.4"], 2, "gen", function () {
  var mode = ri(0, 1);
  if (mode === 0) {
    var d = ri(15, 45), a = ri(30, 55), eye = pick([1.4, 1.5, 1.6]);
    var raw = d * u8tan(a), ans = raw + eye;
    var q0 = numq("For a clinometer activity, a student stands " + d + " m from a red maple and reads a " + a + "° angle of elevation to the top. The clinometer is " + fmtF(eye, 1) + " m above the ground. Find the height of the tree, in metres, to one decimal place.",
      ans, 0.3,
      "The clinometer reading gives the height above the instrument first. \\[ \\begin{aligned} h_{\\text{above}} &= " + d + " \\times \\tan(" + a + "^\\circ) = " + fmt(raw) + " \\text{ m} \\\\ \\text{tree} &= " + fmt(raw) + " + " + fmtF(eye, 1) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.",
      { mode: mode, d: d, a: a, eye: eye });
    q0.figure = u8ElevFig(a, d + " m", "?");
    return q0;
  }
  var s = ri(8, 25), aF = ri(18, 32), aN = aF + ri(10, 22);
  var h = s / (1 / u8tan(aF) - 1 / u8tan(aN));
  var x = h / u8tan(aN), xf = h / u8tan(aF);
  return numq("For a clinometer activity, a student cannot reach the base of a tall spruce. From a first spot the angle of elevation to the top is " + aF + "°. The student walks " + s + " m straight toward the tree and reads " + aN + "°. Ignoring the small clinometer height, find the height of the tree, in metres, to one decimal place.",
    h, 0.5,
    "Let h be the tree height and x the distance from the nearer spot to the tree. Both readings form right triangles sharing h. \\[ \\begin{aligned} x &= " + FR("h", "\\tan(" + aN + "^\\circ)") + ", \\quad x + " + s + " = " + FR("h", "\\tan(" + aF + "^\\circ)") + " \\\\ " + s + " &= h\\left(" + FR(1, "\\tan(" + aF + "^\\circ)") + " - " + FR(1, "\\tan(" + aN + "^\\circ)") + "\\right) \\\\ h &= " + FR(s, "\\left(" + FR(1, "\\tan(" + aF + "^\\circ)") + " - " + FR(1, "\\tan(" + aN + "^\\circ)") + "\\right)") + " = " + fmt(h) + " \\text{ m} \\end{aligned} \\] Check: the nearer distance is " + fmt(x) + " m and the farther is " + fmt(xf) + " m, and they differ by " + s + " m. The answer is <b>" + fmtF(h, 1) + " m</b>.",
    { mode: mode, s: s, aF: aF, aN: aN });
}, ["Each reading makes a right triangle with the top of the tree, and the triangles share the tree height.", "Write the ground distance from each spot using the height, then use the gap between the spots."]);

E("u8-two-stage-target-mc", 8, ["5.2", "2.2"], 3, "gen", function () {
  var d = ri(20, 70), a1 = ri(28, 52), a2 = ri(20, 55);
  var h = d * u8tan(a1);
  var mode = ri(0, 1);
  var ctx = pick([["signal tower", "service cable", "anchor point"], ["lookout tower", "rescue line", "marked rock"], ["grain elevator", "loading cable", "rail car"], ["harbour tower", "mooring line", "buoy"]]);
  if (mode === 0) {
    var ans = h / u8sin(a2);
    var errs = [{ v: h / u8sin(a1), fb: "That reuses the first angle in the second triangle. The cable has its own angle, " + a2 + "°, at the top." },
                { v: h * u8sin(a2), fb: "That treats the height as the hypotenuse. The height is a leg here, and the cable is the hypotenuse, so the height is divided by the sine." },
                { v: h / u8tan(a2), fb: "That finds the ground distance to the " + ctx[2] + ", not the sloped cable length." }];
    var prompt = "A point on the ground is " + d + " m from the base of a " + ctx[0] + ". From that point, the angle of elevation to the top is " + a1 + "°. A " + ctx[1] + " runs from the top of the tower down to a " + ctx[2] + ", making a " + a2 + "° angle of depression from the top. What is the length of the " + ctx[1] + "?";
    var sol = "Stage one: find the tower height from the ground triangle. Stage two: the height is a leg of the cable triangle and the cable is its hypotenuse. \\[ \\begin{aligned} h &= " + d + " \\times \\tan(" + a1 + "^\\circ) = " + fmt(h) + " \\text{ m} \\\\ \\sin(" + a2 + "^\\circ) &= " + FR(fmt(h), "L") + " \\\\ L &= " + FR(fmt(h), "\\sin(" + a2 + "^\\circ)") + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans, 1) + " m</b>.";
    var q = u8numMC(prompt.replace(/\?$/, ", in metres?"), ans, errs, "", 1, "Yes: height first from the tangent, then the cable from the sine in the second triangle.", sol, { mode: mode, d: d, a1: a1, a2: a2 });
    q.figure = u8ElevFig(a1, d + " m", "?");
    return q;
  }
  var ans2 = h / u8tan(a2);
  var errs2 = [{ v: h / u8tan(a1), fb: "That gives back the original " + d + " m ground distance. The second point has its own angle, " + a2 + "°." },
               { v: h * u8tan(a2), fb: "That multiplies by the tangent, which would find a height from a distance. Here the height is known and the distance is wanted." },
               { v: h / u8sin(a2), fb: "That is the sloped sight distance to the second point, not the distance along the ground." }];
  var prompt2 = "A point on the ground is " + d + " m from the base of a " + ctx[0] + ". From that point, the angle of elevation to the top is " + a1 + "°. From the top, a second ground point is seen at an angle of depression of " + a2 + "°. How far is the second point from the base of the tower?";
  var sol2 = "Stage one: find the tower height from the ground triangle. Stage two: use that height in the second triangle to get the new ground distance. \\[ \\begin{aligned} h &= " + d + " \\times \\tan(" + a1 + "^\\circ) = " + fmt(h) + " \\text{ m} \\\\ d_2 &= " + FR(fmt(h), "\\tan(" + a2 + "^\\circ)") + " = " + fmt(ans2) + " \\text{ m} \\end{aligned} \\] The answer is <b>" + fmtF(ans2, 1) + " m</b>.";
  var q2 = u8numMC(prompt2.replace(/\?$/, ", in metres?"), ans2, errs2, "", 1, "Yes: the shared height links the two triangles, tangent first, then tangent again with the second angle.", sol2, { mode: mode, d: d, a1: a1, a2: a2 });
  q2.figure = u8DepressFig(a2, "?", "?");
  return q2;
}, ["The two triangles are linked by a side they share: find that side first.", "Stage one gives the shared side; stage two uses it with the second angle and the correct ratio."]);

E("u8-equivalent-forms-mc", 8, ["2.6", "2.5"], 3, "gen", function () {
  var mode = ri(0, 2);
  if (mode === 0) {
    var a = pick([27, 34, 43, 56, 63, 71]);
    return mcq("Which statement correctly rewrites \\(\\tan(" + a + "^\\circ)\\) using sine and cosine?",
      { t: "\\(\\tan(" + a + "^\\circ) = " + FR("\\sin(" + a + "^\\circ)", "\\cos(" + a + "^\\circ)") + "\\)", fb: "Yes: sine over cosine gives opposite over adjacent, since the hypotenuses cancel." },
      [{ t: "\\(\\tan(" + a + "^\\circ) = " + FR("\\cos(" + a + "^\\circ)", "\\sin(" + a + "^\\circ)") + "\\)", fb: "That fraction is the reciprocal of tangent: adjacent over opposite." },
       { t: "\\(\\tan(" + a + "^\\circ) = \\sin(" + a + "^\\circ) \\times \\cos(" + a + "^\\circ)\\)", fb: "Tangent is a quotient of the two ratios, not their product." },
       { t: "\\(\\tan(" + a + "^\\circ) = \\sin(" + (90 - a) + "^\\circ) \\div \\cos(" + a + "^\\circ)\\)", fb: "The numerator was swapped for its complement value, which changes the result. Both parts must use the same angle, " + a + "°." }],
      "\\(\\sin(" + a + "^\\circ)\\) is opposite over hypotenuse and \\(\\cos(" + a + "^\\circ)\\) is adjacent over hypotenuse. Dividing gives \\(" + FR("\\text{opp}", "\\text{adj}") + "\\), which is the tangent. The answer is <b>\\(\\tan(" + a + "^\\circ) = " + FR("\\sin(" + a + "^\\circ)", "\\cos(" + a + "^\\circ)") + "\\)</b>.",
      { mode: mode, a: a });
  }
  if (mode === 1) {
    var a2 = ri(24, 64), opp = ri(5, 30);
    function eq(rhs) { return "\\(x = " + rhs + "\\)"; }
    return mcq("A student writes \\(\\sin(" + a2 + "^\\circ) = " + FR(opp, "x") + "\\) for the hypotenuse x of a right triangle. Which equation is an equivalent form that gives x directly?",
      { t: eq(FR(opp, "\\sin(" + a2 + "^\\circ)")), fb: "Yes: multiplying both sides by x and then dividing by the sine isolates x with the same meaning." },
      [{ t: eq(opp + " \\times \\sin(" + a2 + "^\\circ)"), fb: "That value would be shorter than the opposite side, but x is the hypotenuse, the longest side. The rearrangement is wrong." },
       { t: eq(FR("\\sin(" + a2 + "^\\circ)", opp)), fb: "That inverts the fraction, giving a value under 1, which cannot be this hypotenuse." },
       { t: eq(FR(opp, "\\tan(" + a2 + "^\\circ)")), fb: "Tangent does not involve the hypotenuse at all, so it cannot be equivalent to this sine statement." }],
      "Start from \\(\\sin(" + a2 + "^\\circ) = " + FR(opp, "x") + "\\). Multiply both sides by x, then divide both sides by \\(\\sin(" + a2 + "^\\circ)\\): the equivalent solved form is <b>" + eq(FR(opp, "\\sin(" + a2 + "^\\circ)")) + "</b>.",
      { mode: mode, a: a2, opp: opp });
  }
  var ang = pick([26, 33, 47, 58, 64]);
  var adjv = ri(8, 40), hypv = adjv + ri(6, 30);
  return mcq("In a right triangle, \\(\\cos(" + ang + "^\\circ) = " + FR(adjv, hypv) + "\\). Which statement is equivalent to this one?",
    { t: "\\(\\sin(" + (90 - ang) + "^\\circ) = " + FR(adjv, hypv) + "\\)", fb: "Yes: cosine of an angle equals sine of its complement, with the same side ratio." },
    [{ t: "\\(\\sin(" + ang + "^\\circ) = " + FR(adjv, hypv) + "\\)", fb: "Sine of the same angle uses the opposite side over the hypotenuse, a different ratio (unless the angle is 45°)." },
     { t: "\\(\\cos(" + (90 - ang) + "^\\circ) = " + FR(adjv, hypv) + "\\)", fb: "Cosine of the complement equals sine of the original angle, not cosine of it." },
     { t: "\\(\\tan(" + ang + "^\\circ) = " + FR(adjv, hypv) + "\\)", fb: "Tangent is opposite over adjacent; the hypotenuse does not appear in it." }],
    "The two acute angles of a right triangle add to 90°, and the cosine of one equals the sine of the other. So \\(\\cos(" + ang + "^\\circ) = \\sin(" + (90 - ang) + "^\\circ) = " + FR(adjv, hypv) + "\\). The answer is <b>\\(\\sin(" + (90 - ang) + "^\\circ) = " + FR(adjv, hypv) + "\\)</b>.",
    { mode: mode, ang: ang, adj: adjv, hyp: hypv });
}, ["Two forms are equivalent only if they say the same thing about the same sides.", "Check the ratio each form builds, and remember the complement pairing between sine and cosine."]);

E("u8-cr-two-depressions", 8, ["5.2"], 3, "gen", function () {
  var h = ri(30, 85), a1 = ri(21, 44), a2 = ri(23, 52);
  var ctx = pick([["airport control tower", "service vehicles"], ["ferry terminal tower", "buoys"], ["fire lookout", "clearings"], ["grain terminal", "rail cars"]]);
  var d1 = h / u8tan(a1), d2 = h / u8tan(a2), ans = d1 + d2;
  var q = numq("From the top of an " + ctx[0] + " that is " + h + " m tall, the angles of depression to two " + ctx[1] + " on opposite sides of the tower are " + a1 + "° and " + a2 + "°. Find the distance between the two " + ctx[1] + ", in metres, to one decimal place.",
    ans, 0.4,
    "Each sight line forms a right triangle with the tower, and the triangles share the height. \\[ \\begin{aligned} d_1 &= " + FR(h, "\\tan(" + a1 + "^\\circ)") + " = " + fmt(d1) + " \\text{ m} \\\\ d_2 &= " + FR(h, "\\tan(" + a2 + "^\\circ)") + " = " + fmt(d2) + " \\text{ m} \\\\ \\text{distance} &= " + fmt(d1) + " + " + fmt(d2) + " = " + fmt(ans) + " \\text{ m} \\end{aligned} \\] Opposite sides, so the parts add. The answer is <b>" + fmtF(ans, 1) + " m</b>.",
    { h: h, a1: a1, a2: a2 });
  q.figure = u8TwoOppFig(a1, a2, h + " m");
  return q;
}, ["Split the diagram at the tower: two right triangles share its height.", "Find the ground distance on each side, then combine them for opposite sides."]);

E("u8-cr-baseline-height", 8, ["2.4", "5.2", "2.3"], 3, "gen", function () {
  var s = ri(20, 60), aF = ri(16, 30), aN = aF + ri(9, 20);
  var ctx = pick([["unfinished bridge pier", "A surveyor"], ["headland light tower", "A surveyor"], ["wind turbine mast", "A survey crew"], ["ski hill summit tower", "A surveyor"]]);
  var h = s / (1 / u8tan(aF) - 1 / u8tan(aN));
  var x = h / u8tan(aN), xf = h / u8tan(aF);
  var q = numq(ctx[1] + " measures the height of an " + ctx[0] + " without reaching its base. From a far point, the angle of elevation to the top is " + aF + "°. Moving " + s + " m straight toward it, the angle of elevation is " + aN + "°. Find the height of the " + ctx[0].split(" ").pop() + ", in metres, to one decimal place.",
    h, 0.6,
    "Surveyors use this two angle method when the base cannot be reached. Let h be the height and x the nearer ground distance. \\[ \\begin{aligned} x &= " + FR("h", "\\tan(" + aN + "^\\circ)") + ", \\quad x + " + s + " = " + FR("h", "\\tan(" + aF + "^\\circ)") + " \\\\ h &= " + FR(s, "\\left(" + FR(1, "\\tan(" + aF + "^\\circ)") + " - " + FR(1, "\\tan(" + aN + "^\\circ)") + "\\right)") + " = " + fmt(h) + " \\text{ m} \\end{aligned} \\] Check: the nearer distance is " + fmt(x) + " m and the farther is " + fmt(xf) + " m, differing by the measured " + s + " m baseline. The answer is <b>" + fmtF(h, 1) + " m</b>.",
    { s: s, aF: aF, aN: aN });
  q.figure = u8ElevFig(aN, "?", "?");
  return q;
}, ["Both sightings form right triangles that share the unknown height.", "Express each ground distance using the height, and set their difference equal to the measured baseline."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-cr-assembled-height":3,"u1-cr-front-real-height":2,"u1-cr-iso-total":2,"u1-cr-level-off":2,"u1-cr-scale-area":3,"u1-cr-scale-drawn":3,"u1-cr-scale-real":3,"u1-cr-total-cubes":2,"u2-cr-convert":3,"u2-cr-correct-error":3,"u2-cr-cyl-height":3,"u2-cr-cylinder":2,"u2-cr-paint-trade":3,"u2-cr-prism":2,"u2-cr-sphere-radius":2,"u2-cr-tank-dome":2,"u3-cr-capacity-remaining":2,"u3-cr-composite":3,"u3-cr-cone":3,"u3-cr-cylinder":2,"u3-cr-find-base-side":3,"u3-cr-find-height":3,"u3-cr-si-conversion":2,"u3-cr-tank-capacity":2,"u4-cr-bar-total":3,"u4-cr-extrapolate":2,"u4-cr-histogram-range":3,"u4-cr-histogram-total":2,"u4-cr-interpolate":3,"u4-cr-percent-change":3,"u4-cr-predict-trend":2,"u4-cr-read-compare":2,"u5-cr-budget-balance":2,"u5-cr-category-percent":2,"u5-cr-goal-after-change":2,"u5-cr-max-wants-spending":3,"u5-cr-modify-budget":3,"u5-cr-total-expenses":2,"u5-cr-week-record-total":3,"u5-cr-what-if-balance":3,"u6-atm-total-charges":2,"u6-compound-future-value":2,"u6-compound-solve-periods":2,"u6-credit-interest-cost":3,"u6-credit-plan-savings":3,"u6-payday-loan-cost":3,"u6-promo-deferred-interest":3,"u6-simple-interest-solve":2,"u7-cr-angle-slope":2,"u7-cr-create-scale":3,"u7-cr-model-scale":3,"u7-cr-rate-problem":3,"u7-cr-rise-find":2,"u7-cr-run-find":3,"u7-cr-scale-actual":2,"u7-cr-slope-points":2,"u8-cr-baseline-height":3,"u8-cr-clinometer-two-readings":3,"u8-cr-direct-side":2,"u8-cr-elevation-height":2,"u8-cr-find-angle":2,"u8-cr-same-side-gap":3,"u8-cr-shared-side-stage":3,"u8-cr-two-depressions":2};
