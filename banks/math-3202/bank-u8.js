// Math 3202 Unit 8 Transformations question bank
// CRMARKS: u8-cr-dilation-vertex=3
// CRMARKS: u8-cr-combined=4
// CRMARKS: u8-cr-blueprint=5
// CRMARKS: u8-cr-design-coords=4
// CRMARKS: u8-cr-similar-sides=5
// CRMARKS: u8-cr-triple-transform=6
/* ===== Unit 8 ===== */
/* Math 3202 Unit 8: Transformations. Helpers prefixed u8. */
function u8txt(x,y,str,anchor,size,bold){
  return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||13)+'" fill="'+FIG_INK+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+str+'</text>';
}
function u8cp(p){ return "("+fmt(p[0])+", "+fmt(p[1])+")"; }
function u8T(p,t){
  switch(t.k){
    case "T": return [p[0]+t.dx, p[1]+t.dy];
    case "RX": return [p[0], -p[1]];
    case "RY": return [-p[0], p[1]];
    case "R90": return [-p[1], p[0]];
    case "R180": return [-p[0], -p[1]];
    case "R270": return [p[1], -p[0]];
    case "RXY": return [p[1], p[0]];
    case "RXNY": return [-p[1], -p[0]];
    case "D": return [p[0]*t.f, p[1]*t.f];
  }
  return p;
}
function u8dirX(d){ return Math.abs(d)+" unit"+(Math.abs(d)===1?"":"s")+" "+(d>0?"right":"left"); }
function u8dirY(d){ return Math.abs(d)+" unit"+(Math.abs(d)===1?"":"s")+" "+(d>0?"up":"down"); }
function u8desc(t){
  switch(t.k){
    case "T":
      if(t.dx!==0 && t.dy!==0) return "a translation of "+u8dirX(t.dx)+" and "+u8dirY(t.dy);
      if(t.dx!==0) return "a translation of "+u8dirX(t.dx);
      return "a translation of "+u8dirY(t.dy);
    case "RX": return "a reflection in the x-axis";
    case "RY": return "a reflection in the y-axis";
    case "RXY": return "a reflection in the line y = x";
    case "RXNY": return "a reflection in the line y = -x";
    case "R90": return "a rotation of 90° counterclockwise about the origin";
    case "R270": return "a rotation of 270° counterclockwise about the origin";
    case "R180": return "a rotation of 180° about the origin";
    case "D": return "a dilation with centre the origin and scale factor "+fmt(t.f);
  }
  return "";
}
function u8rule(t){
  switch(t.k){
    case "T": return "(x, y) \\to ("+(t.dx>=0?"x + "+t.dx:"x - "+(-t.dx))+", "+(t.dy>=0?"y + "+t.dy:"y - "+(-t.dy))+")";
    case "RX": return "(x, y) \\to (x, -y)";
    case "RY": return "(x, y) \\to (-x, y)";
    case "RXY": return "(x, y) \\to (y, x)";
    case "RXNY": return "(x, y) \\to (-y, -x)";
    case "R90": return "(x, y) \\to (-y, x)";
    case "R270": return "(x, y) \\to (y, -x)";
    case "R180": return "(x, y) \\to (-x, -y)";
    case "D": return "(x, y) \\to ("+fmt(t.f)+"x, "+fmt(t.f)+"y)";
  }
  return "";
}
/* Coordinate-pair distractor builder. cands: [{p:[x,y], fb}]. */
function u8mkCoordD(ans, cands){
  var pool=[], seen={}; seen[u8cp(ans)]=1;
  for(var i=0;i<cands.length;i++){ var c=cands[i]; if(!c.p) continue;
    var t=u8cp(c.p); if(seen[t]) continue; seen[t]=1; pool.push({t:t, fb:c.fb}); }
  pool=shuffle(pool);
  var out=pool.slice(0,3);
  var offs=[[1,0],[-1,0],[0,1],[0,-1],[2,0],[0,2],[-2,0],[0,-2],[1,1],[-1,-1]];
  for(var k=0; out.length<3 && k<offs.length; k++){ var p=[ans[0]+offs[k][0], ans[1]+offs[k][1]], tt=u8cp(p);
    if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That point comes from an arithmetic slip. Apply the coordinate rule to the original point one coordinate at a time."}); }
  return out;
}
/* Plain numeric distractor builder with a unit suffix. cands: [{v, fb}]. */
function u8mkNumD(ans, cands, suf){
  var pool=[], seen={}; seen[fmt(ans)+(suf||"")]=1;
  for(var i=0;i<cands.length;i++){ var c=cands[i]; if(c.v===undefined||c.v===null) continue;
    if(Math.abs(c.v-ans)<0.001||c.v<=0) continue;
    var t=fmt(c.v)+(suf||""); if(seen[t]) continue; seen[t]=1; pool.push({t:t, fb:c.fb}); }
  pool=shuffle(pool);
  var out=pool.slice(0,3);
  var offs=[2,-2,5,-5,1,-1,10,-10];
  for(var k=0; out.length<3 && k<offs.length; k++){ var v=ans+offs[k]; if(v<=0) continue;
    var tt=fmt(v)+(suf||""); if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That value comes from an arithmetic slip. Set up the scale factor first, then multiply or divide in one clean step."}); }
  return out;
}
/* Coordinate grid figure. shapes: [{pts:[[x,y],...], labs:[...] or null, dash:bool, tag:"P" centre label or null}] */
function u8grid(shapes, r){
  r=r||6;
  var st=20, W=2*r*st+36, c=W/2;
  function X(x){ return c+x*st; } function Y(y){ return c-y*st; }
  var out='<svg viewBox="0 0 '+W+' '+W+'" width="'+W+'" height="'+W+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid">';
  for(var g=-r; g<=r; g++){
    out+='<line x1="'+fmt(X(g),1)+'" y1="'+fmt(Y(-r),1)+'" x2="'+fmt(X(g),1)+'" y2="'+fmt(Y(r),1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    out+='<line x1="'+fmt(X(-r),1)+'" y1="'+fmt(Y(g),1)+'" x2="'+fmt(X(r),1)+'" y2="'+fmt(Y(g),1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    if(g!==0){ out+=u8txt(X(g), c+11, String(g), "middle", 8); out+=u8txt(c-9, Y(g), String(g), "middle", 8); }
  }
  out+='<line x1="'+fmt(X(-r),1)+'" y1="'+c+'" x2="'+fmt(X(r),1)+'" y2="'+c+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  out+='<line x1="'+c+'" y1="'+fmt(Y(-r),1)+'" x2="'+c+'" y2="'+fmt(Y(r),1)+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  shapes.forEach(function(sh){
    if(sh.pts.length===1){
      var p=sh.pts[0];
      out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="4" fill="'+FIG_ACC+'"/>';
      if(sh.labs && sh.labs[0]) out+=u8txt(X(p[0])+13, Y(p[1])-11, sh.labs[0], "middle", 13, true);
      return;
    }
    var P=sh.pts.map(function(p){ return [X(p[0]), Y(p[1])]; });
    var gx=0, gy=0; P.forEach(function(p){ gx+=p[0]/P.length; gy+=p[1]/P.length; });
    out+='<polygon points="'+P.map(function(p){return fmt(p[0],1)+","+fmt(p[1],1);}).join(" ")+'" fill="'+FIG_SHADE+'" fill-opacity="'+(sh.dash?0.12:0.35)+'" stroke="'+FIG_INK+'" stroke-width="2"'+(sh.dash?' stroke-dasharray="5 4"':"")+'/>';
    P.forEach(function(p){ out+='<circle cx="'+fmt(p[0],1)+'" cy="'+fmt(p[1],1)+'" r="2.6" fill="'+FIG_INK+'"/>'; });
    if(sh.labs){ sh.pts.forEach(function(p, i){
      if(!sh.labs[i]) return;
      var vx=P[i][0]-gx, vy=P[i][1]-gy, vl=Math.hypot(vx,vy)||1;
      out+=u8txt(P[i][0]+vx/vl*13, P[i][1]+vy/vl*13, sh.labs[i], "middle", 12.5, true);
    }); }
    if(sh.tag) out+=u8txt(gx, gy, sh.tag, "middle", 14, true);
  });
  return out+'</svg>';
}
function u8reg(n, R){
  var pts=[];
  for(var i=0;i<n;i++){ var t=Math.PI/2+i*2*Math.PI/n; pts.push([R*Math.cos(t), R*Math.sin(t)]); }
  return pts;
}
function u8polyFig(pts, aria){
  var W=220,H=180,pad=30;
  var xs=pts.map(function(p){return p[0];}), ys=pts.map(function(p){return p[1];});
  var mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys);
  var sc=Math.min((W-2*pad)/Math.max(mxx-mnx,0.001),(H-2*pad)/Math.max(mxy-mny,0.001));
  var cx=(mnx+mxx)/2, cy=(mny+mxy)/2;
  var P=pts.map(function(p){ return [W/2+(p[0]-cx)*sc, H/2-(p[1]-cy)*sc]; });
  return '<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+aria+'"><polygon points="'+P.map(function(p){return fmt(p[0],1)+","+fmt(p[1],1);}).join(" ")+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/></svg>';
}
/* One triangle drawn from its three side lengths: sides = [BC, CA, AB] opposite A, B, C. Returns svg fragment placed in a box. */
function u8oneTri(sides, ox, oy, bw, bh, labs, title){
  var a=sides[0], b=sides[1], c=sides[2];
  var Cx=(b*b+c*c-a*a)/(2*c), Cy=Math.sqrt(Math.max(b*b-Cx*Cx, 0.0001));
  var raw=[[0,0],[c,0],[Cx,Cy]];
  var sc=Math.min(bw/c, bh/Math.max(Cy,0.001));
  var P=raw.map(function(p){ return [ox+p[0]*sc, oy-p[1]*sc]; });
  var G=[(P[0][0]+P[1][0]+P[2][0])/3, (P[0][1]+P[1][1]+P[2][1])/3];
  var out='<polygon points="'+P.map(function(p){return fmt(p[0],1)+","+fmt(p[1],1);}).join(" ")+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  var seg=[[1,2],[2,0],[0,1]];
  for(var i=0;i<3;i++){
    var A1=P[seg[i][0]], A2=P[seg[i][1]], mx=(A1[0]+A2[0])/2, my=(A1[1]+A2[1])/2;
    var dx=mx-G[0], dy=my-G[1], dl=Math.hypot(dx,dy)||1;
    if(labs[i]) out+=u8txt(mx+dx/dl*15, my+dy/dl*15, labs[i], "middle", 12);
  }
  if(title) out+=u8txt(ox+bw/2, oy-bh-12, title, "middle", 12, true);
  return out;
}
function u8twoTri(sides1, sides2, labs1, labs2){
  var out='<svg viewBox="0 0 340 210" width="340" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two triangles with side lengths labelled">';
  out+=u8oneTri(sides1, 18, 178, 130, 120, labs1, "Original");
  out+=u8oneTri(sides2, 188, 178, 130, 120, labs2, "Image");
  return out+'</svg>';
}
function u8kText(k){
  if(k===0.5) return "\\(\\frac{1}{2}\\)";
  if(k===0.25) return "\\(\\frac{1}{4}\\)";
  return String(k);
}

E("u8-single-point", 8, ["3.21"], 1, "gen", function(){
  var x=ri(-4,4), y=ri(-4,4), guard=0;
  while((x===0||y===0) && guard++<100){ x=ri(-4,4); y=ri(-4,4); }
  var kind=pick(["T","RX","RY","R90","R180"]), t;
  if(kind==="T"){ var dx=ri(-3,3), dy=ri(-3,3), g2=0;
    while((dx===0&&dy===0) && g2++<50){ dx=ri(-3,3); dy=ri(-3,3); }
    t={k:"T", dx:dx, dy:dy};
  } else t={k:kind};
  var P=[x,y], ans=u8T(P,t);
  var cands=[
    {p:[x,-y], fb:"That is the reflection of the point in the x-axis, which flips the sign of the y-coordinate only."},
    {p:[-x,y], fb:"That is the reflection of the point in the y-axis, which flips the sign of the x-coordinate only."},
    {p:[-x,-y], fb:"That is a rotation of 180° about the origin, which flips the signs of both coordinates."},
    {p:[-y,x], fb:"That is a rotation of 90° counterclockwise about the origin: the coordinates swap and the new first coordinate takes the opposite sign of the old second one."},
    {p:[y,x], fb:"That swaps the two coordinates. Swapping is the rule for a reflection in the line y = x."},
    {p:[x,y], fb:"That is the original point with nothing applied. The transformation still has to be carried out."}
  ];
  if(kind==="T") cands.push({p:[x+t.dx, y-t.dy], fb:"That moves the point the right way horizontally but the wrong way vertically. Check the direction of the vertical move."});
  var q=mcq("Point \\(P"+u8cp(P)+"\\) is moved by "+u8desc(t)+". What are the coordinates of the image point \\(P'\\)?",
    {t:u8cp(ans), fb:"Yes: the rule \\("+u8rule(t)+"\\) sends "+u8cp(P)+" to "+u8cp(ans)+"."},
    u8mkCoordD(ans, cands),
    "For "+u8desc(t)+", the coordinate rule is \\("+u8rule(t)+"\\) applied to \\(P"+u8cp(P)+"\\).\n\\[ P"+u8cp(P)+" \\to P'"+u8cp(ans)+" \\]\nThe answer is <b>"+u8cp(ans)+"</b>.",
    {t:kind, P:P});
  q.figure=u8grid([{pts:[P], labs:["P"]}], 6);
  return q;
}, ["Recall the coordinate rule for the named transformation.", "Start by writing what the rule does to a general point (x, y), then put the given numbers in."]);

E("u8-dilation-scale", 8, ["3.17"], 1, "gen", function(){
  var reduce=ri(0,1)===1, k, w, h;
  if(reduce){ k=0.5; w=pick([4,6,8,10,12,14]); h=pick([4,6,8,10,12]); }
  else { k=pick([2,3]); w=ri(3,9); h=ri(3,7); }
  var W2=w*k, H2=h*k;
  var dists;
  if(k===2) dists=[
    {t:"\\(\\frac{1}{2}\\)", fb:"That is the scale factor going from the image back to the original. The scale factor of an enlargement is greater than 1."},
    {t:"4", fb:"That is the ratio of the areas. Lengths scale by the factor itself, not by its square."},
    {t:"3", fb:"That is 1 more than the true factor. Compare widths: "+fmt(W2)+" divided by "+w+" gives the factor."}];
  else if(k===3) dists=[
    {t:"\\(\\frac{1}{3}\\)", fb:"That is the scale factor going from the image back to the original. The scale factor of an enlargement is greater than 1."},
    {t:"9", fb:"That is the ratio of the areas. Lengths scale by the factor itself, not by its square."},
    {t:"2", fb:"That is 1 less than the true factor. Compare widths: "+fmt(W2)+" divided by "+w+" gives the factor."}];
  else dists=[
    {t:"2", fb:"That is the scale factor going from the image back to the original. A reduction has a scale factor between 0 and 1."},
    {t:"\\(\\frac{1}{4}\\)", fb:"That would mean each length was halved twice. Here each length is halved once: "+w+" becomes "+fmt(W2)+"."},
    {t:"\\(\\frac{1}{3}\\)", fb:"That would mean each length is divided by 3. Here the widths give "+fmt(W2)+" divided by "+w+", which is one half."}];
  var q=mcq("A photo that is \\("+w+"\\) cm wide and \\("+h+"\\) cm high is "+(reduce?"reduced":"enlarged")+" to \\("+fmt(W2)+"\\) cm wide and \\("+fmt(H2)+"\\) cm high, keeping the same shape. What is the scale factor of the "+(reduce?"reduction":"enlargement")+"?",
    {t:u8kText(k), fb:"Yes: image length divided by original length is "+fmt(W2)+" divided by "+w+", which is "+fmt(k)+"."},
    dists,
    "The scale factor compares matching lengths: image divided by original.\n\\[ \\begin{aligned} \\text{scale factor} &= \\frac{"+fmt(W2)+"}{"+w+"} \\\\ &= "+fmt(k)+" \\end{aligned} \\]\nThe heights agree: \\(\\frac{"+fmt(H2)+"}{"+h+"} = "+fmt(k)+"\\). The answer is <b>"+fmt(k)+"</b>.",
    {k:k, w:w, h:h});
  q.figure=(function(){
    var u=Math.min(280/(w+W2+2), 120/Math.max(h,H2));
    var base=168, x1=16, x2=16+(w+2)*u;
    var out='<svg viewBox="0 0 330 195" width="330" height="195" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Original and resized photo rectangles">';
    out+='<rect x="'+fmt(x1,1)+'" y="'+fmt(base-h*u,1)+'" width="'+fmt(w*u,1)+'" height="'+fmt(h*u,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.35" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<rect x="'+fmt(x2,1)+'" y="'+fmt(base-H2*u,1)+'" width="'+fmt(W2*u,1)+'" height="'+fmt(H2*u,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.35" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+=u8txt(x1+w*u/2, base+13, w+" cm", "middle", 12);
    out+=u8txt(x2+W2*u/2, base+13, fmt(W2)+" cm", "middle", 12);
    out+=u8txt(x1+w*u/2, base-h*u-11, "Original", "middle", 12, true);
    out+=u8txt(x2+W2*u/2, base-H2*u-11, "Image", "middle", 12, true);
    return out+'</svg>';
  })();
  return q;
}, ["The scale factor compares an image length with the matching original length.", "Start by dividing the new width by the original width, then check the heights give the same value."]);

E("u8-symmetry-count", 8, ["3.24"], 1, "var", varset([
  function(){ var q=mcq("How many lines of symmetry does the capital letter shown have?",
    {t:"2", fb:"Yes: one vertical line through the middle and one horizontal line through the middle each fold the letter onto itself."},
    [ {t:"1", fb:"That counts only the vertical line. The letter also folds onto itself along a horizontal line through its middle."},
      {t:"0", fb:"The letter does have symmetry: fold it left to right and the two halves match."},
      {t:"4", fb:"That is the count for a square. This letter has a vertical and a horizontal line only."} ],
    "Fold the letter in two ways. A vertical line through the middle maps the left half onto the right half, and a horizontal line through the middle maps the top half onto the bottom half. No diagonal fold matches. The answer is <b>2 lines of symmetry</b>.",
    {shape:"letter H"});
    q.figure='<svg viewBox="0 0 220 180" width="220" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Capital letter H"><text x="110" y="95" font-size="120" fill="'+FIG_INK+'" text-anchor="middle" dominant-baseline="central" font-family="sans-serif" font-weight="bold">H</text></svg>';
    return q; },
  function(){ var q=mcq("How many lines of symmetry does the shape shown have?",
    {t:"4", fb:"Yes: two lines through opposite vertices and two through the midpoints of opposite sides."},
    [ {t:"2", fb:"That counts only one pair of lines. A square has lines through its vertices as well as through the midpoints of its sides."},
      {t:"1", fb:"A square folds onto itself in four different ways, not one."},
      {t:"8", fb:"That doubles the count. Each fold line is counted once, and a square has four."} ],
    "A square folds onto itself along both diagonals and along both lines joining the midpoints of opposite sides. That is 2 + 2 = 4 fold lines. The answer is <b>4 lines of symmetry</b>.",
    {shape:"square"});
    q.figure=u8polyFig([[-2,-2],[2,-2],[2,2],[-2,2]], "Square");
    return q; },
  function(){ var q=mcq("How many lines of symmetry does the shape shown have? The shape is a rectangle that is not a square.",
    {t:"2", fb:"Yes: one line joining the midpoints of the long sides and one joining the midpoints of the short sides."},
    [ {t:"4", fb:"That is the count for a square. The diagonals of a rectangle that is not a square are not lines of symmetry: the corners do not land on each other."},
      {t:"1", fb:"There are two fold lines, one in each direction, through the midpoints of opposite sides."},
      {t:"0", fb:"The shape does have symmetry: fold it so the long sides meet and the halves match."} ],
    "A rectangle folds onto itself along the line joining the midpoints of its long sides and along the line joining the midpoints of its short sides. Its diagonals are not symmetry lines, because folding on a diagonal puts a long side against a short side. The answer is <b>2 lines of symmetry</b>.",
    {shape:"rectangle"});
    q.figure=u8polyFig([[-3,-1.6],[3,-1.6],[3,1.6],[-3,1.6]], "Rectangle");
    return q; },
  function(){ var q=mcq("How many lines of symmetry does the regular pentagon shown have?",
    {t:"5", fb:"Yes: one line through each vertex and the midpoint of the opposite side, and there are 5 vertices."},
    [ {t:"1", fb:"That would be true of an isosceles triangle. A regular pentagon repeats its fold at every vertex."},
      {t:"10", fb:"That doubles the count. Each line serves one vertex and the opposite side at the same time."},
      {t:"0", fb:"A regular pentagon is highly symmetric: it folds onto itself through every vertex."} ],
    "In a regular polygon, each vertex has a line of symmetry running through it and the midpoint of the opposite side. A regular pentagon has 5 vertices, so it has 5 such lines. The answer is <b>5 lines of symmetry</b>.",
    {shape:"regular pentagon"});
    q.figure=u8polyFig(u8reg(5,3), "Regular pentagon");
    return q; },
  function(){ var q=mcq("How many lines of symmetry does the isosceles triangle shown have?",
    {t:"1", fb:"Yes: the line from the apex down through the midpoint of the base folds the two equal sides onto each other."},
    [ {t:"3", fb:"That is the count for an equilateral triangle, where every side is equal. This triangle has only two equal sides."},
      {t:"2", fb:"There is only one way to fold this triangle onto itself: through the apex and the midpoint of the base."},
      {t:"0", fb:"The triangle does have symmetry: its two equal sides can be folded onto each other."} ],
    "The two equal sides of an isosceles triangle fold onto each other along the line from the apex to the midpoint of the base. No other fold works, because the base is a different length from the equal sides. The answer is <b>1 line of symmetry</b>.",
    {shape:"isosceles triangle"});
    q.figure=u8polyFig([[0,3],[2,-2],[-2,-2]], "Isosceles triangle");
    return q; },
  function(){ var q=mcq("How many lines of symmetry does the parallelogram shown have? It is not a rhombus and not a rectangle.",
    {t:"0", fb:"Yes: folding on any line puts a longer side against a shorter one or an acute angle against an obtuse one, so no fold maps the shape onto itself."},
    [ {t:"2", fb:"That is the count for a rectangle or a rhombus. This slanted parallelogram has neither of those fold lines."},
      {t:"1", fb:"A single fold line would need two matching halves. The slant of this parallelogram rules out every fold."},
      {t:"4", fb:"That is the count for a square. This shape is a slanted parallelogram with no symmetry lines."} ],
    "A line of symmetry must fold the shape exactly onto itself. In a general parallelogram, opposite sides and angles match under a half turn, but no fold line works: each trial fold mismatches a side length or an angle. The answer is <b>0 lines of symmetry</b>.",
    {shape:"parallelogram"});
    q.figure=u8polyFig([[-2.6,-1.5],[1.8,-1.5],[2.6,1.5],[-1.8,1.5]], "Parallelogram");
    return q; },
  function(){ var q=mcq("How many lines of symmetry does the equilateral triangle shown have?",
    {t:"3", fb:"Yes: one line through each vertex and the midpoint of the opposite side, and all three work because every side is equal."},
    [ {t:"1", fb:"That is the count for an isosceles triangle with only two equal sides. Here all three sides are equal, so every vertex gives a fold line."},
      {t:"2", fb:"There are three fold lines, one for each vertex, not two."},
      {t:"6", fb:"That doubles the count. Each line passes through one vertex and one side midpoint at the same time, giving three lines in total."} ],
    "Every side of an equilateral triangle is equal, so the fold line through any vertex and the midpoint of the opposite side maps the triangle onto itself. With 3 vertices, there are 3 such lines. The answer is <b>3 lines of symmetry</b>.",
    {shape:"equilateral triangle"});
    q.figure=u8polyFig([[0,3],[2.6,-1.5],[-2.6,-1.5]], "Equilateral triangle");
    return q; }
]), ["Picture folding the shape so the two halves land exactly on each other.", "Start with the most obvious fold, then check whether rotating the fold gives genuinely different lines."]);

E("u8-dilation-grid", 8, ["3.18"], 2, "gen", function(){
  var k=pick([2,3,0.5]), tri;
  if(k===2){ var ax=ri(1,2), ay=ri(1,2); tri=[[ax,ay],[ax+ri(2,3),ay],[ax,ay+ri(1,2)]]; }
  else if(k===3){ var bx=ri(1,2), by=ri(1,2); tri=[[bx,by],[bx+1,by],[bx,by+1]]; }
  else { var cx0=pick([2,4]), cy0=pick([2,4]); tri=[[cx0,cy0],[cx0+2,cy0],[cx0,cy0+2]]; }
  var names=["A","B","C"], vi=pick([0,1,2]), P=tri[vi], ans=[P[0]*k, P[1]*k];
  var q=mcq("Triangle \\(ABC\\) on the grid is dilated with centre the origin and scale factor \\("+fmt(k)+"\\). What are the coordinates of the image of vertex \\("+names[vi]+"\\)?",
    {t:u8cp(ans), fb:"Yes: both coordinates of "+names[vi]+u8cp(P)+" are multiplied by "+fmt(k)+", giving "+u8cp(ans)+"."},
    u8mkCoordD(ans, [
      {p:[P[0]*k, P[1]], fb:"That multiplies only the first coordinate by the scale factor. A dilation multiplies both coordinates."},
      {p:[P[0], P[1]*k], fb:"That multiplies only the second coordinate by the scale factor. A dilation multiplies both coordinates."},
      {p:[P[0]+k, P[1]+k], fb:"That adds the scale factor to each coordinate. A dilation multiplies the coordinates; it does not add."},
      {p:[ans[1], ans[0]], fb:"That swaps the coordinates of the image point. A dilation keeps the coordinates in their original positions."}
    ]),
    "A dilation with centre the origin multiplies both coordinates by the scale factor: \\((x, y) \\to ("+fmt(k)+"x, "+fmt(k)+"y)\\). This is why the image stays proportional to the original: every length is multiplied by \\("+fmt(k)+"\\) and the angles stay the same.\n\\[ "+names[vi]+u8cp(P)+" \\to "+names[vi]+"'"+u8cp(ans)+" \\]\nThe answer is <b>"+u8cp(ans)+"</b>.",
    {k:k, vertex:names[vi]});
  q.figure=u8grid([{pts:tri, labs:names}], 6);
  return q;
}, ["A dilation with centre the origin acts on both coordinates in the same way.", "Start by multiplying the first coordinate of the vertex by the scale factor, then do the same to the second."]);

E("u8-is-dilation", 8, ["3.17"], 2, "gen", function(){
  var base=pick([[3,4,5],[4,5,6],[5,7,8],[6,8,10],[4,6,7]]), s=pick([1,2]);
  var orig=base.map(function(v){ return v*s; });
  var k=pick([1.5,2,2.5,3]), k2=(k===2?3:2);
  var img=orig.map(function(v){ return v*k; });
  var isDil=ri(0,1)===1, badIdx=-1, badRatio=0;
  if(!isDil){
    badIdx=ri(0,2);
    var delta=pick([1,-1,2]);
    if(img[badIdx]+delta<=0) delta=2;
    img[badIdx]=img[badIdx]+delta;
    badRatio=img[badIdx]/orig[badIdx];
  }
  var sideNames=["first","second","third"];
  var correct, dists;
  if(isDil){
    correct={t:"Yes. Every side of the image is "+fmt(k)+" times the matching side of the original, so the two triangles are similar.",
      fb:"Correct: the three ratios are "+orig.map(function(v,i){ return fmt(img[i])+" / "+v; }).join(", ")+", and they are all equal to "+fmt(k)+"."};
    dists=[
      {t:"Yes. Every side of the image is "+fmt(k2)+" times the matching side of the original, so the two triangles are similar.",
       fb:"The conclusion is right but the factor is wrong. Divide any image side by its matching original side: the value is "+fmt(k)+", not "+fmt(k2)+"."},
      {t:"No. The angles of the image are different from the angles of the original.",
       fb:"In a dilation the angles stay the same. Here the side ratios are all equal, so the image is a dilation."},
      {t:"No. Only two of the three sides were multiplied by the same factor.",
       fb:"Check the third ratio as well: all three sides share the same ratio of "+fmt(k)+"."}
    ];
  } else {
    correct={t:"No. Two sides are multiplied by "+fmt(k)+", but the "+sideNames[badIdx]+" side is not, so the ratios are not all equal.",
      fb:"Correct: the "+sideNames[badIdx]+" side has ratio "+fmt(img[badIdx])+" / "+orig[badIdx]+" = "+fmt(badRatio)+", while the other two ratios are "+fmt(k)+". Similar shapes need every ratio to match."};
    dists=[
      {t:"Yes. Every side of the image is "+fmt(k)+" times the matching side of the original, so the two triangles are similar.",
       fb:"Check the "+sideNames[badIdx]+" side: "+orig[badIdx]+" became "+fmt(img[badIdx])+", and that ratio is "+fmt(badRatio)+", not "+fmt(k)+". One mismatched ratio is enough to fail similarity."},
      {t:"Yes. Every side of the image is "+fmt(k2)+" times the matching side of the original, so the two triangles are similar.",
       fb:"The factor "+fmt(k2)+" does not fit any of the three ratios, and the "+sideNames[badIdx]+" side does not share the ratio of the other two."},
      {t:"No. The angles of the image are different from the angles of the original.",
       fb:"The angles of the two triangles match; angles alone do not settle it. The problem is that one side ratio differs from the other two."}
    ];
  }
  var labs1=orig.map(function(v){ return String(v); });
  var labs2=img.map(function(v){ return fmt(v); });
  var q=mcq("A student claims the second triangle is a dilation of the first. The side lengths are shown in the diagram. Is the claim correct?",
    correct, dists,
    "Compare the ratio of each image side to its matching original side.\n\\[ \\begin{aligned} \\frac{"+fmt(img[0])+"}{"+orig[0]+"} &= "+fmt(img[0]/orig[0])+" \\\\ \\frac{"+fmt(img[1])+"}{"+orig[1]+"} &= "+fmt(img[1]/orig[1])+" \\\\ \\frac{"+fmt(img[2])+"}{"+orig[2]+"} &= "+fmt(img[2]/orig[2])+" \\end{aligned} \\]\n"+(isDil?("All three ratios equal \\("+fmt(k)+"\\), so the image is a dilation and the triangles are similar."):("The ratios are not all equal, so the side lengths are not proportional and the image is not a dilation."))+" The answer is <b>"+(isDil?"Yes":"No")+"</b>.",
    {k:k, isDil:isDil});
  q.figure=u8twoTri(orig, img, labs1, labs2);
  return q;
}, ["A dilation needs every pair of matching sides to share one ratio.", "Start by dividing the first image side by its matching original side, then check the other two sides against that value."]);

E("u8-applications", 8, ["3.19"], 2, "var", varset([
  function(){ return mcq("A contractor works from a blueprint of a house, then has the same plan printed on a large board for a site meeting. The board version has exactly the same shape as the blueprint, only bigger. Which transformation connects the two versions?",
    {t:"A dilation, because every length grows by the same scale factor while the shape stays the same.", fb:"Correct: same shape, bigger size, one scale factor for every length."},
    [ {t:"A reflection, because the plan is flipped over when it is printed on the display board.", fb:"Printing larger does not flip the plan. The shape is unchanged and the size grows evenly, which is a dilation."},
      {t:"A translation, because the plan moves from the desk to the board for the meeting, unchanged in size.", fb:"Moving a plan without resizing is a translation, but here the size changes as well, and that is the key feature."},
      {t:"A rotation, because the board is turned to face the meeting when it is hung on the wall.", fb:"Turning the board does not change the drawing itself. The drawing grew by one scale factor, which is a dilation."} ],
    "The two versions have the same shape and different sizes, with every length multiplied by one scale factor. That is the definition of a dilation in this context. The answer is <b>a dilation</b>.",
    {ctx:"construction-blueprint"}); },
  function(){ return mcq("A machine shop cuts a metal bracket, then programs the cutter to produce a larger version of the same bracket for a different machine. Every measurement in the design is multiplied by 1.5. Which transformation is the shop using?",
    {t:"A dilation with scale factor 1.5, because all lengths grow by the same factor and the angles stay the same.", fb:"Correct: proportional growth of every length is a dilation."},
    [ {t:"A translation, because the cutter moves to a new sheet of metal, and the part moves with the cutter.", fb:"The cutter changing sheets is movement of material, not the transformation of the design. The design itself grows by a factor of 1.5."},
      {t:"A reflection, because the larger bracket is a mirror copy of the first, flipped over when it comes out of the press.", fb:"Nothing is mirrored: the larger bracket has the same orientation and the same angles, only bigger lengths."},
      {t:"A rotation, because the part is turned during machining, and turning is what defines the change here.", fb:"Handling may turn the part, but the design change described is uniform growth by 1.5, a dilation."} ],
    "Multiplying every measurement by one factor, 1.5, while keeping angles unchanged produces a similar, larger part. That is a dilation with scale factor 1.5. The answer is <b>a dilation</b>.",
    {ctx:"industrial-bracket"}); },
  function(){ return mcq("A sign shop prints a store logo in three sizes: small for bags, medium for the window, and large for the building sign. The logo looks identical in each size. Which transformation produces the different sizes?",
    {t:"A dilation, because the logo keeps its shape while every length is scaled by the same factor.", fb:"Correct: identical appearance at different sizes is the signature of a dilation."},
    [ {t:"A reflection, because the window version can be read from inside the store window itself.", fb:"A reversed window print is one special case, but the three sizes themselves differ by scaling, which is a dilation."},
      {t:"A rotation, because the large sign is mounted higher up, and height is what changed most.", fb:"Mounting height does not change the logo. The change from size to size is proportional scaling."},
      {t:"A translation, because the logo is placed in three different spots on the storefront, side by side.", fb:"Placement differs, but the question is about the sizes: they come from scaling the logo, a dilation."} ],
    "Keeping the same shape at a new size, with all lengths in the same ratio, is a dilation. The answer is <b>a dilation</b>.",
    {ctx:"commercial-logo"}); },
  function(){ return mcq("A homeowner slides a heavy rug across a living room floor to sit under a table. The rug is not turned or flipped, and it keeps its size and shape. Which transformation best describes the rug's movement?",
    {t:"A translation, because every point of the rug moves the same distance in the same direction.", fb:"Correct: sliding without turning, flipping, or resizing is a translation."},
    [ {t:"A rotation, because the rug moves around the furniture as it is slid across.", fb:"The rug keeps its orientation the whole way: its edges stay parallel to their starting directions, so nothing rotates."},
      {t:"A reflection, because the rug ends up on the other side of the room from where it started out.", fb:"Ending on the other side of the room is still a slide. A reflection would flip the rug over a line, reversing its pattern."},
      {t:"A dilation, because the rug covers a different part of the floor than before.", fb:"The rug's size does not change at all, so no scaling is involved."} ],
    "Every point of the rug moves by the same amount in the same direction, with no turning, flipping, or resizing. That is a translation. The answer is <b>a translation</b>.",
    {ctx:"domestic-rug"}); },
  function(){ return mcq("A quilter makes a square block, then sews a second block beside it that is the mirror image of the first, so the pair forms a symmetrical butterfly pattern. Which transformation turns the first block into the second?",
    {t:"A reflection, because the second block is the mirror image of the first across the seam between them.", fb:"Correct: mirror images across a line are reflections, and the seam acts as the mirror line."},
    [ {t:"A translation, because the second block sits beside the first, shifted over by exactly one block.", fb:"Sitting beside the first block is not enough: a translation would keep the same orientation, but this block is flipped into a mirror image."},
      {t:"A rotation, because the butterfly pattern spreads out in two directions from the seam between the blocks.", fb:"A rotation turns a block; it cannot produce a mirror image. Mirror images come from reflections."},
      {t:"A dilation, because the finished piece is wider than one block, so it must have grown.", fb:"Both blocks are the same size. The finished piece is wider because there are two blocks, not because one was scaled."} ],
    "The second block is a mirror image of the first, with the seam as the mirror line. Mirror images are produced by a reflection. The answer is <b>a reflection</b>.",
    {ctx:"artistic-quilt"}); },
  function(){ return mcq("A tile setter prints a circular pattern on a lobby floor by using one stencil, turning it by 90° around the centre of the circle after each print, four times in all. Which transformation is being used over and over?",
    {t:"A rotation, because the stencil turns by a fixed angle around a fixed centre point.", fb:"Correct: turning around a centre point by a set angle is a rotation."},
    [ {t:"A reflection, because the pattern looks the same in every quarter of the floor.", fb:"The pattern having symmetry is a result, not the process. The process described is turning the stencil, a rotation."},
      {t:"A translation, because the stencil is lifted and put down four times in a row.", fb:"Lifting and placing happen, but each new print is turned 90° from the last around the same centre, which makes it a rotation."},
      {t:"A dilation, because the pattern covers more of the floor each time it is placed.", fb:"Each print is the same size as the last. The coverage grows because prints are added, not because anything is scaled."} ],
    "Turning a stencil by a fixed angle, 90°, around a fixed centre point, repeated to build the pattern, is a rotation used four times. The answer is <b>a rotation</b>.",
    {ctx:"industrial-stencil"}); }
]), ["Name what happens to the size, the orientation, and the position in each scenario.", "Start by asking whether the size changes: growth or shrinking by one factor points to a dilation, while sliding, flipping, and turning keep the size."]);

E("u8-context-calc", 8, ["3.20"], 2, "gen", function(){
  var mode=ri(0,3);
  if(mode===0){
    var w=pick([8,10,12,14,16,20]), k=pick([2,3,1.5,2.5]), ans=w*k;
    var _bo0=balOpts({t:fmt(ans), fb:"Yes: the width is multiplied by the scale factor, "+w+" times "+fmt(k)+" is "+fmt(ans)+"."}, u8mkNumD(ans, [
        {v:w/k, fb:"That divides by the scale factor, which would shrink the photo. An enlargement multiplies."},
        {v:w+k, fb:"That adds the scale factor to the width. A scale factor is a multiplier, not an amount to add."},
        {v:w*(k+1), fb:"That multiplies by "+fmt(k+1)+" instead of "+fmt(k)+". The enlargement factor is the one stated."}
      ], "")); return mcq("A photo is \\("+w+"\\) cm wide. It is enlarged by a scale factor of \\("+fmt(k)+"\\) for a poster. How wide is the poster, in centimetres?", _bo0[0], _bo0[1],
      "An enlargement multiplies each length by the scale factor.\n\\[ \\begin{aligned} \\text{poster width} &= "+w+" \\times "+fmt(k)+" \\\\ &= "+fmt(ans)+" \\text{ cm} \\end{aligned} \\]\nThe answer is <b>"+fmt(ans)+" cm</b>.",
      {mode:"photo", w:w, k:k});
  }
  if(mode===1){
    var pair=pick([[50,6],[50,8],[50,10],[50,12],[50,14],[25,8],[25,12],[25,16],[25,20],[20,10],[20,15],[20,20],[20,25],[40,5],[40,10],[40,15],[40,20]]);
    var F=pair[0], p=pair[1], realCm=p*F, ans=realCm/100;
    var _bo1=balOpts({t:fmt(ans), fb:"Yes: "+p+" times "+F+" is "+realCm+" cm, which is "+fmt(ans)+" m."}, u8mkNumD(ans, [
        {v:realCm, fb:"That is the length in centimetres. Convert to metres by dividing by 100."},
        {v:p, fb:"That is the length on the blueprint. Each of those centimetres stands for "+F+" cm in the building."},
        {v:ans*2, fb:"That doubles the correct length. The scale multiplies the plan length by "+F+", then the unit changes to metres."}
      ], "")); return mcq("On a blueprint, \\(1\\) cm represents \\("+F+"\\) cm in the actual building. A wall measures \\("+p+"\\) cm on the blueprint. How long is the actual wall, in metres?", _bo1[0], _bo1[1],
      "The blueprint is a dilation of the building, so multiply the plan length by the scale.\n\\[ \\begin{aligned} \\text{actual length} &= "+p+" \\times "+F+" \\\\ &= "+realCm+" \\text{ cm} \\\\ &= "+fmt(ans)+" \\text{ m} \\end{aligned} \\]\nThe answer is <b>"+fmt(ans)+" m</b>.",
      {mode:"blueprint", F:F, p:p});
  }
  if(mode===2){
    var h=pick([80,120,160,200,240]), f=pick([0.5,0.25]), ans=h*f;
    var _bo2=balOpts({t:fmt(ans), fb:"Yes: the height is multiplied by the scale factor, "+h+" times "+fmt(f)+" is "+fmt(ans)+"."}, u8mkNumD(ans, [
        {v:h/f, fb:"That divides by the scale factor, which would make the logo bigger. A reduction multiplies by a factor below 1."},
        {v:h*(f+1), fb:"That uses a factor above 1, which enlarges. The stated factor is "+fmt(f)+"."},
        {v:h-40, fb:"That subtracts a fixed amount. A scale factor multiplies every length by the same ratio instead."}
      ], "")); return mcq("A company logo is \\("+h+"\\) mm tall on a poster. For a business card, the logo is reduced by a scale factor of \\("+fmt(f)+"\\). How tall is the logo on the card, in millimetres?", _bo2[0], _bo2[1],
      "A reduction multiplies each length by the scale factor, which is below 1 here.\n\\[ \\begin{aligned} \\text{card height} &= "+h+" \\times "+fmt(f)+" \\\\ &= "+fmt(ans)+" \\text{ mm} \\end{aligned} \\]\nThe answer is <b>"+fmt(ans)+" mm</b>.",
      {mode:"logo", h:h, f:f});
  }
  var d=pick([5,6,8,10]), k2=pick([3,4,6]), ans2=d*k2;
  var _bo3=balOpts({t:fmt(ans2), fb:"Yes: the width is multiplied by the scale factor, "+d+" times "+k2+" is "+ans2+"."}, u8mkNumD(ans2, [
      {v:d+k2, fb:"That adds the scale factor to the width. A scale factor is a multiplier, not an amount to add."},
      {v:d*(k2-1), fb:"That multiplies by "+(k2-1)+" instead of "+k2+". Use the stated scale factor."},
      {v:d*k2/2, fb:"That applies only half of the enlargement. The full scale factor multiplies the whole width."}
    ], "")); return mcq("An overhead projector shows a drawing on a screen. The drawing is \\("+d+"\\) cm wide on the page, and the projector enlarges it by a scale factor of \\("+k2+"\\). How wide is the image on the screen, in centimetres?", _bo3[0], _bo3[1],
    "A projector image is a dilation of the page, so multiply the width by the scale factor.\n\\[ \\begin{aligned} \\text{screen width} &= "+d+" \\times "+k2+" \\\\ &= "+ans2+" \\text{ cm} \\end{aligned} \\]\nThe answer is <b>"+ans2+" cm</b>.",
    {mode:"projector", d:d, k:k2});
}, ["Decide whether the scale factor grows or shrinks the measurement, then set up one multiplication.", "Start by multiplying the given length by the scale factor, and convert the unit at the end if the question asks for one."]);

E("u8-identify-one", 8, ["3.22"], 2, "gen", function(){
  var pool=[
    {k:"T", dx:2, dy:1}, {k:"T", dx:1, dy:2}, {k:"T", dx:-2, dy:1},
    {k:"RX"}, {k:"RY"}, {k:"R90"}, {k:"R180"}, {k:"D", f:2}, {k:"D", f:3}
  ];
  var t=pick(pool);
  var tri;
  if(t.k==="D" && t.f===3) tri=[[1,1],[2,1],[1,2]];
  else if(t.k==="D") tri=pick([[[1,1],[2,1],[1,2]],[[2,1],[3,1],[2,2]],[[1,2],[2,2],[1,3]]]);
  else { var ax=ri(1,2), ay=ri(1,2); tri=[[ax,ay],[ax+ri(2,3),ay],[ax,ay+ri(2,3)]]; }
  var img=tri.map(function(p){ return u8T(p,t); });
  var others=shuffle(pool.filter(function(o){ return u8desc(o)!==u8desc(t); })).slice(0,3);
  var dists=others.map(function(o){
    var aImg=u8T(tri[0], o);
    return {t:u8desc(o), fb:"That transformation would send vertex A"+u8cp(tri[0])+" to "+u8cp(aImg)+", but the diagram shows A' at "+u8cp(img[0])+"."};
  });
  var q=mcq("Triangle \\(ABC\\) is transformed to triangle \\(A'B'C'\\) on the grid. Which single transformation was performed?",
    {t:u8desc(t), fb:"Yes: check vertex A. It moves from "+u8cp(tri[0])+" to "+u8cp(img[0])+", which matches "+u8desc(t)+"."},
    dists,
    "Track one vertex. Vertex \\(A\\) starts at "+u8cp(tri[0])+" and its image \\(A'\\) is at "+u8cp(img[0])+". Applying "+u8desc(t)+" with rule \\("+u8rule(t)+"\\) gives exactly that move, and the same rule fits vertices \\(B\\) and \\(C\\) as well. The answer is <b>"+u8desc(t)+"</b>.",
    {t:t.k});
  q.figure=u8grid([
    {pts:tri, labs:["A","B","C"]},
    {pts:img, labs:["A'","B'","C'"], dash:true}
  ], 6);
  return q;
}, ["Compare the position, orientation, and size of the image with the original.", "Start by following one labelled vertex from the original to the image, then test which single rule fits all three vertices."]);

E("u8-combined-point", 8, ["3.23"], 2, "gen", function(){
  var pairs=[
    [{k:"T",dx:2,dy:1},{k:"RX"}],
    [{k:"RX"},{k:"T",dx:1,dy:3}],
    [{k:"R90"},{k:"T",dx:2,dy:1}],
    [{k:"T",dx:-1,dy:2},{k:"R90"}],
    [{k:"RY"},{k:"R180"}],
    [{k:"RX"},{k:"R90"}],
    [{k:"R90"},{k:"RX"}],
    [{k:"R180"},{k:"T",dx:2,dy:-2}],
    [{k:"T",dx:3,dy:0},{k:"RY"}],
    [{k:"R270"},{k:"T",dx:1,dy:1}]
  ];
  var tri=pick([[[0,1],[2,1],[0,3]],[[1,1],[3,1],[1,3]],[[1,2],[4,2],[1,4]],[[2,0],[4,0],[2,2]]]), names=["A","B","C"], vi=pick([0,1,2]), P=tri[vi];
  var pr=pick(pairs), t1=pr[0], t2=pr[1];
  var mid=u8T(P,t1), ans=u8T(mid,t2), swapped=u8T(u8T(P,t2),t1);
  var q=mcq("Triangle \\(ABC\\) on the grid is transformed in two steps: first "+u8desc(t1)+", then "+u8desc(t2)+". What are the final coordinates of vertex \\("+names[vi]+"\\)?",
    {t:u8cp(ans), fb:"Yes: "+names[vi]+u8cp(P)+" moves to "+u8cp(mid)+" after the first step, then to "+u8cp(ans)+" after the second."},
    u8mkCoordD(ans, [
      {p:mid, fb:"That is the position after the first transformation only. The second transformation still has to be applied."},
      {p:swapped, fb:"That applies the two transformations in the opposite order. Order matters: do the first named transformation first."},
      {p:u8T(P,t2), fb:"That applies only the second transformation to the original point. Both steps must be applied, in order."},
      {p:[-ans[0], ans[1]], fb:"That flips the sign of the first coordinate of the correct final position. Recheck how the second transformation changes each coordinate."}
    ]),
    "Apply the transformations one at a time to vertex \\("+names[vi]+u8cp(P)+"\\) using the rule \\("+u8rule(t1)+"\\) first.\n\\[ \\begin{aligned} "+names[vi]+u8cp(P)+" &\\to "+u8cp(mid)+" \\\\ &\\to "+u8cp(ans)+" \\end{aligned} \\]\nThe second step uses the rule \\("+u8rule(t2)+"\\) on the result of the first step. The answer is <b>"+u8cp(ans)+"</b>.",
    {v:names[vi]});
  q.figure=u8grid([{pts:tri, labs:names}], 6);
  return q;
}, ["Do the transformations one at a time, in the order given.", "Start by applying the first transformation to the named vertex and writing down the new coordinates before moving on."]);

E("u8-design-analyse", 8, ["3.25", "3.24"], 2, "gen", function(){
  var ax=ri(1,2), ay=ri(1,2);
  var motif=[[ax,ay],[ax+ri(2,3),ay],[ax,ay+ri(1,2)]];
  var shapes={
    P:{pts:motif, trans:"the original motif"},
    Q:{pts:motif.map(function(p){ return u8T(p,{k:"RY"}); }), trans:"a reflection in the y-axis"},
    R:{pts:motif.map(function(p){ return u8T(p,{k:"R180"}); }), trans:"a rotation of 180° about the origin"},
    S:{pts:motif.map(function(p){ return u8T(p,{k:"RX"}); }), trans:"a reflection in the x-axis"}
  };
  var quad={P:"Quadrant I", Q:"Quadrant II", R:"Quadrant III", S:"Quadrant IV"};
  var figs=[{pts:shapes.P.pts, tag:"P"},{pts:shapes.Q.pts, tag:"Q"},{pts:shapes.R.pts, tag:"R"},{pts:shapes.S.pts, tag:"S"}];
  var mode=ri(0,3), q;
  if(mode===3){
    var B=motif[1], ansR=u8T(B,{k:"R180"});
    q=mcq("A design is built from a motif in Quadrant I, labelled \\(P\\), together with its copies \\(Q\\), \\(R\\) and \\(S\\) in the other quadrants. The rightmost vertex of shape \\(P\\) is at "+u8cp(B)+". What are the coordinates of the matching vertex of shape \\(R\\)?",
      {t:u8cp(ansR), fb:"Yes: shape R is the rotation of 180° about the origin, which flips both signs: "+u8cp(B)+" becomes "+u8cp(ansR)+"."},
      u8mkCoordD(ansR, [
        {p:u8T(B,{k:"RY"}), fb:"That is the matching vertex of shape Q, the reflection in the y-axis. Shape R is in Quadrant III."},
        {p:u8T(B,{k:"RX"}), fb:"That is the matching vertex of shape S, the reflection in the x-axis. Shape R is in Quadrant III."},
        {p:B, fb:"That is the vertex on the original motif. Shape R is a moved copy, not the original."}
      ]),
      "Shape \\(R\\) sits in Quadrant III and is the image of the motif under a rotation of \\(180^\\circ\\) about the origin, with rule \\((x, y) \\to (-x, -y)\\).\n\\[ "+u8cp(B)+" \\to "+u8cp(ansR)+" \\]\nThe answer is <b>"+u8cp(ansR)+"</b>.",
      {mode:"coords"});
    q.figure=u8grid(figs, 6);
    return q;
  }
  if(mode===2){
    q=mcq("A design is built from a motif in Quadrant I, labelled \\(P\\), together with its copies \\(Q\\), \\(R\\) and \\(S\\) in the other quadrants. Which lines are lines of symmetry of the complete design?",
      {t:"Both the x-axis and the y-axis", fb:"Yes: reflecting the design in either axis swaps the motif with a matching copy, so the whole design lands on itself."},
      [ {t:"Only the x-axis", fb:"The x-axis works, but the y-axis works as well: shape P reflects onto shape Q and shape S onto shape R."},
        {t:"Only the y-axis", fb:"The y-axis works, but the x-axis works as well: shape P reflects onto shape S and shape Q onto shape R."},
        {t:"Only the line y = x", fb:"Reflecting in the line y = x would move the motif to a position where no copy sits, because the motif is not symmetric across that diagonal."} ],
      "The design has a matching copy in every quadrant. Reflecting in the \\(y\\)-axis swaps \\(P\\) with \\(Q\\) and \\(S\\) with \\(R\\); reflecting in the \\(x\\)-axis swaps \\(P\\) with \\(S\\) and \\(Q\\) with \\(R\\). Both axes map the design onto itself. The answer is <b>both the x-axis and the y-axis</b>.",
      {mode:"symmetry"});
    q.figure=u8grid(figs, 6);
    return q;
  }
  var targetName=mode===0?"Q":"R";
  var target=shapes[targetName];
  var others=["P","Q","R","S"].filter(function(nm){ return nm!==targetName && nm!=="P"; });
  var dists=others.map(function(nm){
    return {t:"Shape P is moved by "+shapes[nm].trans+".", fb:"That describes the move from shape P to shape "+nm+", which sits in "+quad[nm]+". Shape "+targetName+" sits in "+quad[targetName]+"."};
  });
  dists.push({t:"Shape P is moved by a translation of "+u8dirX(4)+".", fb:"A translation would keep the motif in the same orientation and could not place it in "+quad[targetName]+" as a mirror or turned copy."});
  q=mcq("A design is built from a motif in Quadrant I, labelled \\(P\\), together with its copies \\(Q\\), \\(R\\) and \\(S\\) in the other quadrants. Which statement describes how shape \\(P\\) is moved to make shape \\("+targetName+"\\)?",
    {t:"Shape P is moved by "+target.trans+".", fb:"Yes: shape "+targetName+" sits in "+quad[targetName]+", and "+target.trans+" is exactly the move that takes the motif there."},
    dists,
    "Shape \\("+targetName+"\\) sits in "+quad[targetName]+". Comparing it with the motif in Quadrant I, the move that carries \\(P\\) onto \\("+targetName+"\\) is "+target.trans+". A reflection is also what makes the design symmetric: each axis of the grid is a mirror line pairing the copies. The answer is <b>"+target.trans+"</b>.",
    {mode:"identify", target:targetName});
  q.figure=u8grid(figs, 6);
  return q;
}, ["Use the quadrant of each copy and how the motif is flipped or turned to reach it.", "Start by locating the named copy on the grid, then compare its position and orientation with the original motif."]);

E("u8-cr-dilation-vertex", 8, ["3.18"], 2, "gen", function(){
  var k=pick([2,3]);
  var tri=[[1,1],[ri(2,5),ri(1,4)],[1,ri(3,5)]];
  var B=tri[1], askX=ri(0,1)===1, ansC=askX?B[0]*k:B[1]*k;
  var q=numq("Triangle \\(ABC\\) on the grid has vertices \\(A(1, 1)\\), \\(B"+u8cp(B)+"\\) and \\(C"+u8cp(tri[2])+"\\). The triangle is dilated with centre the origin and scale factor \\("+k+"\\). Find the "+(askX?"x":"y")+"-coordinate of the image of vertex \\(B\\). Show your work, and state the full coordinates of \\(B'\\) in your solution.",
    ansC, 0.1,
    "A dilation with centre the origin multiplies both coordinates by the scale factor, which is what keeps the image proportional to the original.\n\\[ \\begin{aligned} B"+u8cp(B)+" &\\to B'("+B[0]+" \\times "+k+", "+B[1]+" \\times "+k+") \\\\ &= "+u8cp([B[0]*k, B[1]*k])+" \\end{aligned} \\]\nThe "+(askX?"x":"y")+"-coordinate of \\(B'\\) is <b>"+ansC+"</b>.",
    {k:k, ask:askX?"x":"y"});
  q.figure=u8grid([{pts:tri, labs:["A","B","C"]}], 6);
  return q;
}, ["A dilation with centre the origin multiplies both coordinates by the scale factor.", "Start by multiplying the first coordinate of B by the scale factor, then the second."]);

E("u8-cr-combined", 8, ["3.23"], 2, "gen", function(){
  var pairs=[
    [{k:"T",dx:2,dy:1},{k:"RX"}],
    [{k:"RX"},{k:"T",dx:1,dy:3}],
    [{k:"R90"},{k:"T",dx:2,dy:1}],
    [{k:"T",dx:-1,dy:2},{k:"R90"}],
    [{k:"RY"},{k:"R180"}],
    [{k:"RX"},{k:"R90"}],
    [{k:"R90"},{k:"RX"}],
    [{k:"R180"},{k:"T",dx:2,dy:-2}]
  ];
  var P=null, pr=null, mid=null, ans=null, guard=0;
  while(guard++<300){
    var px=ri(-3,3), py=ri(-3,3);
    if(px===0&&py===0) continue;
    var cand=pick(pairs), m=u8T([px,py],cand[0]), a=u8T(m,cand[1]);
    if(Math.abs(a[0])>6||Math.abs(a[1])>6||Math.abs(m[0])>6||Math.abs(m[1])>6) continue;
    P=[px,py]; pr=cand; mid=m; ans=a; break;
  }
  if(!P){ P=[2,1]; pr=pairs[0]; mid=u8T(P,pr[0]); ans=u8T(mid,pr[1]); }
  var askX=ri(0,1)===1, ansC=askX?ans[0]:ans[1];
  var q=numq("Point \\(P"+u8cp(P)+"\\) is transformed in two steps: first "+u8desc(pr[0])+", then "+u8desc(pr[1])+". Find the "+(askX?"x":"y")+"-coordinate of the final image point. Show your work, including the coordinates after each step.",
    ansC, 0.1,
    "Apply the transformations in order, using the rule \\("+u8rule(pr[0])+"\\) first and \\("+u8rule(pr[1])+"\\) second.\n\\[ \\begin{aligned} P"+u8cp(P)+" &\\to "+u8cp(mid)+" \\\\ &\\to "+u8cp(ans)+" \\end{aligned} \\]\nThe "+(askX?"x":"y")+"-coordinate of the final image is <b>"+ansC+"</b>.",
    {ask:askX?"x":"y"});
  q.figure=u8grid([{pts:[P], labs:["P"]}], 6);
  return q;
}, ["Apply the two transformations in the order given, writing the coordinates after each step.", "Start with the first transformation only, and record the new point before applying the second."]);

E("u8-cr-blueprint", 8, ["3.20"], 2, "gen", function(){
  var pair=pick([[50,6],[50,8],[50,10],[50,12],[50,14],[25,8],[25,12],[25,16],[25,20],[20,10],[20,15],[20,20],[20,25],[40,5],[40,10],[40,15],[40,20]]);
  var F=pair[0], p=pair[1], realCm=p*F, ans=realCm/100;
  var item=pick(["wall of a bedroom","length of a deck","width of a workshop","side of a garden plot"]);
  return numq("A blueprint is a dilation of the real building: on the blueprint, \\(1\\) cm represents \\("+F+"\\) cm in the actual building. The "+item+" measures \\("+p+"\\) cm on the blueprint. Find the actual length, in metres. Show your work.",
    ans, 0.05,
    "Multiply the blueprint length by the scale to get the actual length in centimetres, then convert to metres.\n\\[ \\begin{aligned} \\text{actual length} &= "+p+" \\times "+F+" \\\\ &= "+realCm+" \\text{ cm} \\\\ &= "+realCm+" \\div 100 \\\\ &= "+fmt(ans)+" \\text{ m} \\end{aligned} \\]\nThe answer is <b>"+fmt(ans)+" m</b>.",
    {F:F, p:p});
}, ["The blueprint measurements grow by the stated scale, and the final unit is metres, not centimetres.", "Start by multiplying the blueprint length by the scale factor to get centimetres."]);

E("u8-challenge", 8, ["3.21", "3.22", "3.23"], 3, "gen", function(){
  var mode=ri(0,2), q;
  if(mode===0){
    var pool=[
      {k:"T", dx:3, dy:-2}, {k:"T", dx:-2, dy:-3}, {k:"RX"}, {k:"RY"},
      {k:"R90"}, {k:"R180"}, {k:"R270"}, {k:"RXY"}, {k:"RXNY"}, {k:"D", f:2}
    ];
    var t=pick(pool);
    var tri=(t.k==="D")?[[1,1],[2,1],[1,2]]:pick([[[2,1],[5,1],[2,3]],[[1,2],[4,2],[1,4]],[[3,1],[5,1],[3,3]],[[1,1],[3,1],[1,2]]]);
    var img=tri.map(function(p){ return u8T(p,t); });
    var others=shuffle(pool.filter(function(o){ return u8desc(o)!==u8desc(t); })).slice(0,3);
    var dists=others.map(function(o){
      var aImg=u8T(tri[0], o);
      return {t:u8desc(o), fb:"That transformation would send vertex A"+u8cp(tri[0])+" to "+u8cp(aImg)+", but the diagram shows A' at "+u8cp(img[0])+"."};
    });
    q=mcq("Triangle \\(ABC\\) is transformed to triangle \\(A'B'C'\\) on the grid. Which single transformation was performed?",
      {t:u8desc(t), fb:"Yes: vertex A moves from "+u8cp(tri[0])+" to "+u8cp(img[0])+", which matches "+u8desc(t)+", and the same rule fits B and C."},
      dists,
      "Track vertex \\(A\\): it starts at "+u8cp(tri[0])+" and ends at "+u8cp(img[0])+". The rule \\("+u8rule(t)+"\\) for "+u8desc(t)+" produces that move, and checking \\(B\\) and \\(C\\) confirms it. The answer is <b>"+u8desc(t)+"</b>.",
      {mode:"identify", t:t.k});
    q.figure=u8grid([{pts:tri, labs:["A","B","C"]}, {pts:img, labs:["A'","B'","C'"], dash:true}], 7);
    return q;
  }
  if(mode===1){
    var pairs2=[
      [{k:"R90"},{k:"RY"}],
      [{k:"RXY"},{k:"T",dx:1,dy:-2}],
      [{k:"T",dx:-2,dy:1},{k:"R270"}],
      [{k:"RXNY"},{k:"RX"}],
      [{k:"R180"},{k:"RXY"}],
      [{k:"RY"},{k:"R90"}]
    ];
    var tri2=pick([[[1,2],[3,2],[1,4]],[[2,1],[4,1],[2,3]],[[0,2],[2,2],[0,4]]]), names=["A","B","C"], vi=pick([0,1,2]), P=tri2[vi];
    var pr=pick(pairs2), mid=u8T(P,pr[0]), ans=u8T(mid,pr[1]), swapped=u8T(u8T(P,pr[1]),pr[0]);
    q=mcq("Triangle \\(ABC\\) on the grid is transformed in two steps: first "+u8desc(pr[0])+", then "+u8desc(pr[1])+". What are the final coordinates of vertex \\("+names[vi]+"\\)?",
      {t:u8cp(ans), fb:"Yes: "+names[vi]+u8cp(P)+" moves to "+u8cp(mid)+" after the first step, then to "+u8cp(ans)+"."},
      u8mkCoordD(ans, [
        {p:mid, fb:"That is the position after the first transformation only. Apply the second transformation to it."},
        {p:swapped, fb:"That applies the transformations in the opposite order. The first named transformation must go first."},
        {p:u8T(P,pr[1]), fb:"That applies only the second transformation to the original vertex. Both steps count."},
        {p:[-ans[0], -ans[1]], fb:"That flips both signs of the correct final position. Recheck the rules used at each step."}
      ]),
      "Work through the steps in order with the rules \\("+u8rule(pr[0])+"\\) then \\("+u8rule(pr[1])+"\\).\n\\[ \\begin{aligned} "+names[vi]+u8cp(P)+" &\\to "+u8cp(mid)+" \\\\ &\\to "+u8cp(ans)+" \\end{aligned} \\]\nThe answer is <b>"+u8cp(ans)+"</b>.",
      {mode:"combined", v:names[vi]});
    q.figure=u8grid([{pts:tri2, labs:names}], 7);
    return q;
  }
  var pool3=[{k:"R90"},{k:"R270"},{k:"RXY"},{k:"RXNY"},{k:"R180"},{k:"RX"},{k:"RY"}];
  var t3=pick(pool3);
  var tri3=pick([[[2,1],[5,2],[3,4]],[[1,3],[4,3],[2,5]],[[3,0],[5,2],[4,3]]]), names3=["A","B","C"], vi3=pick([0,1,2]), P3=tri3[vi3], ans3=u8T(P3,t3);
  var cands3=pool3.filter(function(o){ return o.k!==t3.k; }).map(function(o){
    return {p:u8T(P3,o), fb:"That is the image under "+u8desc(o)+". The transformation performed here is "+u8desc(t3)+"."};
  });
  cands3.push({p:P3, fb:"That is the original vertex with nothing applied."});
  q=mcq("Triangle \\(ABC\\) on the grid is transformed by "+u8desc(t3)+". What are the coordinates of the image of vertex \\("+names3[vi3]+"\\)?",
    {t:u8cp(ans3), fb:"Yes: the rule \\("+u8rule(t3)+"\\) sends "+u8cp(P3)+" to "+u8cp(ans3)+"."},
    u8mkCoordD(ans3, cands3),
    "The rule for "+u8desc(t3)+" is \\("+u8rule(t3)+"\\) applied to vertex \\("+names3[vi3]+u8cp(P3)+"\\).\n\\[ "+names3[vi3]+u8cp(P3)+" \\to "+names3[vi3]+"'"+u8cp(ans3)+" \\]\nThe answer is <b>"+u8cp(ans3)+"</b>.",
    {mode:"single", t:t3.k});
  q.figure=u8grid([{pts:tri3, labs:names3}], 7);
  return q;
}, ["Sort out the type of transformation first: sliding, flipping, turning, or scaling, and in which order for combined moves.", "Start by following one labelled vertex and applying the stated rule or rules to it alone."]);

E("u8-cr-design-coords", 8, ["3.25"], 3, "gen", function(){
  var P=[ri(2,4), ri(1,3)], mode=ri(0,2), steps, ans, solSteps;
  if(mode===0){
    var dy=pick([-2,-3,2]);
    steps=[{k:"RY"},{k:"T",dx:0,dy:dy}];
  } else if(mode===1){
    steps=[{k:"R180"},{k:"RX"}];
  } else {
    var dx=pick([1,2]);
    steps=[{k:"RX"},{k:"T",dx:dx,dy:3}];
  }
  var mid=u8T(P,steps[0]); ans=u8T(mid,steps[1]);
  var askX=ri(0,1)===1, ansC=askX?ans[0]:ans[1];
  function quadName(p){
    if(p[0]>0&&p[1]>0) return "Quadrant I";
    if(p[0]<0&&p[1]>0) return "Quadrant II";
    if(p[0]<0&&p[1]<0) return "Quadrant III";
    if(p[0]>0&&p[1]<0) return "Quadrant IV";
    return "an axis";
  }
  var q=numq("A four-quadrant tile design starts with a point \\(P"+u8cp(P)+"\\) in Quadrant I. To build the design, \\(P\\) is first moved by "+u8desc(steps[0])+", and the result is then moved by "+u8desc(steps[1])+". Find the "+(askX?"x":"y")+"-coordinate of the final point. Show your work, including the coordinates and the quadrant after each step.",
    ansC, 0.1,
    "Track the point through both steps, using the rule \\("+u8rule(steps[0])+"\\) first and \\("+u8rule(steps[1])+"\\) second.\n\\[ \\begin{aligned} P"+u8cp(P)+" &\\to "+u8cp(mid)+" \\\\ &\\to "+u8cp(ans)+" \\end{aligned} \\]\nAfter the first step the point is in "+quadName(mid)+"; after the second step it is in "+quadName(ans)+". The "+(askX?"x":"y")+"-coordinate of the final point is <b>"+ansC+"</b>.",
    {mode:mode, ask:askX?"x":"y"});
  q.figure=u8grid([{pts:[P], labs:["P"]}], 6);
  return q;
}, ["Work through the design moves in order, recording the point and its quadrant after each one.", "Start with the first move only: apply its coordinate rule to the starting point."]);

E("u8-cr-similar-sides", 8, ["3.17", "3.18"], 3, "gen", function(){
  var combos=[
    {base:[6,8,10], k:1.5}, {base:[6,8,10], k:2.5}, {base:[3,4,5], k:2},
    {base:[3,4,5], k:3}, {base:[5,12,13], k:2}, {base:[4,6,8], k:1.5},
    {base:[8,15,17], k:2}, {base:[6,8,10], k:2},
    {base:[5,12,13], k:1.5}, {base:[9,12,15], k:2}, {base:[9,12,15], k:1.5},
    {base:[8,15,17], k:1.5}, {base:[7,24,25], k:2}, {base:[12,16,20], k:1.5}
  ];
  var combo=pick(combos), orig=combo.base, k=combo.k;
  var img=orig.map(function(v){ return v*k; });
  var known=ri(0,2), ask=(known+ri(1,2))%3, ans=img[ask];
  var sideNames=["first","second","third"];
  var labs1=orig.map(function(v){ return String(v); });
  var labs2=img.map(function(v,i){ return i===ask?"?":fmt(v); });
  var q=numq("The second triangle in the diagram is a dilation of the first. The "+sideNames[known]+" side of the original measures \\("+orig[known]+"\\) units, and the matching side of the image measures \\("+fmt(img[known])+"\\) units. The "+sideNames[ask]+" side of the original measures \\("+orig[ask]+"\\) units. Find the length, in units, of the matching side of the image. Show your work.",
    ans, 0.1,
    "First find the scale factor from the matching pair that is fully given. In a dilation every length is multiplied by that one factor.\n\\[ \\begin{aligned} \\text{scale factor} &= \\frac{"+fmt(img[known])+"}{"+orig[known]+"} = "+fmt(k)+" \\\\ \\text{image side} &= "+orig[ask]+" \\times "+fmt(k)+" \\\\ &= "+fmt(ans)+" \\end{aligned} \\]\nThe answer is <b>"+fmt(ans)+" units</b>.",
    {k:k, known:known, ask:ask});
  q.figure=u8twoTri(orig, img, labs1, labs2);
  return q;
}, ["Find the scale factor from the pair of matching sides you know completely, then use it once more.", "Start by dividing the known image side by its matching original side."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Clusters 10 and 11 (dilations and similarity; transformations). Borrowed verbatim from Mathematics 2202 (u7-scale-drawing-read, u7-scale-actual), Mathematics 1202 (u7-similar-check, u7-corresponding-sides, u7-similar-missing-side-mc), Mathematics 9 (u7-related-shapes, u7-transformation-symmetry, u7-translation-rule, u7-rotate-vertex) and Mathematics 7 (u8-reflect-point); feeder helper copies ride in bank-helpers.js. ===== */
E("u8-pk-scale-read", 8, ["3.17"], 1, "gen", function(){
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

E("u8-pk-scale-actual", 8, ["3.18"], 2, "gen", function(){
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

E("u8-pk-similar-check", 8, ["3.17"], 1, "gen", function(){
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

E("u8-pk-corresponding-sides", 8, ["3.18"], 2, "gen", function(){
  var k=pick([2,3,4]), a1=ri(3,12), a2=ri(3,12), b1=a1*k, b2=a2*k, fromB=Math.random()<0.5;
  var prompt="Polygons A and B are similar. In polygon A, two sides measure "+a1+" cm and "+a2+" cm. The corresponding sides in polygon B measure "+b1+" cm and "+b2+" cm. What is the scale factor "+(fromB?"from B to A":"from A to B")+"?";
  var ans=fromB?1/k:k;
  var sol="Each B side divided by the matching A side gives the same value: \\("+b1+" \\div "+a1+" = "+k+"\\) and \\("+b2+" \\div "+a2+" = "+k+"\\). "+(fromB?"Going from B back to A uses the reciprocal, \\(1 \\div "+k+" = "+fmtF(1/k,2)+ "\\).":"")+" The scale factor is <b>"+fmtF(ans,2)+"</b>.";
  var opts=[ {t:fmtF(fromB?k:1/k,2), fb:"That is the scale factor in the opposite direction."},
             {t:String(b1-a1), fb:"That is the difference between the sides. A scale factor is a ratio, found by dividing, not subtracting."},
             {t:fmtF(k+0.5,2), fb:"Check the division: "+b1+" divided by "+a1+" is "+k+", not "+fmtF(k+0.5,2)+"."} ];
  var _bo0=balOpts({t:fmtF(ans,2), fb:"Correct: corresponding sides of similar polygons are all in the one ratio."}, opts); var q=mcq(prompt, _bo0[0], _bo0[1], sol, {k:k, fromB:fromB}); q.figure=u7FigPair(a1,a2,"A: "+a1+" and "+a2, b1,b2,"B: "+b1+" and "+b2); return q;
}, ["Corresponding sides of similar polygons are all in the same ratio.", "Divide a B side by its matching A side, then check the direction the question asks for."]);

E("u8-pk-similar-missing-side", 8, ["3.18"], 2, "gen", function(){
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

E("u8-pk-related-shapes", 8, ["3.24"], 1, "gen", function () {
  function sqLens(pts) {
    var out = [];
    for (var i = 0; i < pts.length; i++) { var a = pts[i], b = pts[(i + 1) % pts.length]; out.push((a[0] - b[0]) * (a[0] - b[0]) + (a[1] - b[1]) * (a[1] - b[1])); }
    return out.sort(function (x, y) { return x - y; }).join(",");
  }
  for (var att = 0; att < 200; att++) {
    var A = [[-5 + ri(0, 1), -3 + ri(0, 2)], [-1 - ri(0, 1), -2 + ri(0, 2)], [-4 + ri(0, 1), 2 + ri(0, 2)]];
    var area = Math.abs((A[1][0] - A[0][0]) * (A[2][1] - A[0][1]) - (A[2][0] - A[0][0]) * (A[1][1] - A[0][1]));
    if (area < 4) continue;
    var mode = pick(["reflection", "rotation", "neither"]);
    var B;
    if (mode === "reflection") B = A.map(function (p) { return [-p[0], p[1]]; });
    else if (mode === "rotation") B = A.map(function (p) { return [-p[0], -p[1]]; });
    else { B = A.map(function (p) { return [-p[0], p[1]]; }); B[1] = [B[1][0], B[1][1] + 1]; if (sqLens(A) === sqLens(B)) continue; }
    var cenA = [(A[0][0] + A[1][0] + A[2][0]) / 3, (A[0][1] + A[1][1] + A[2][1]) / 3];
    var cenB = [(B[0][0] + B[1][0] + B[2][0]) / 3, (B[0][1] + B[1][1] + B[2][1]) / 3];
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: A, fill: FIG_SHADE }, { pts: B, fill: "#ffffff" }],
      labels: [{ p: cenA, str: "A", size: 14, bold: true }, { p: cenB, str: "B", size: 14, bold: true }],
      aria: "Two triangles A and B on a grid" });
    var reflT = "They are related by a reflection (one is the mirror image of the other).";
    var rotT = "They are related by a rotation (one is a turned copy of the other).";
    var neiT = "They are not related by a reflection or a rotation.";
    var enlT = "Shape B is an enlargement of shape A.";
    var sol, q;
    var prompt = "Shape A and shape B are shown on the grid. How are the two shapes related?";
    if (mode === "reflection") {
      sol = "Shape B has the same side lengths as shape A but is flipped: each vertex of B is the mirror image of a vertex of A across the y-axis. So <b>they are related by a reflection (one is the mirror image of the other)</b>.";
      q = mcq(prompt, { t: reflT, fb: "Correct. B is the mirror image of A across the y-axis." },
        [{ t: rotT, fb: "A rotation keeps the handedness of a shape; B is flipped compared with A." }, { t: neiT, fb: "They are related: check what a mirror across the y-axis does to A." }, { t: enlT, fb: "The side lengths are the same, so B is not larger than A." }], sol, { mode: "related-refl", A: A.join(";") });
    } else if (mode === "rotation") {
      sol = "Shape B has the same side lengths and the same handedness as shape A, turned a half turn about the origin: each vertex " + "\\((x, y)\\)" + " of A lands at " + "\\((-x, -y)\\)" + " in B. So <b>they are related by a rotation (one is a turned copy of the other)</b>.";
      q = mcq(prompt, { t: rotT, fb: "Correct. B is A turned a half turn about the origin." },
        [{ t: reflT, fb: "A reflection would flip the shape; B keeps the same handedness as A." }, { t: neiT, fb: "They are related: check what a half turn about the origin does to A." }, { t: enlT, fb: "The side lengths are the same, so B is not larger than A." }], sol, { mode: "related-rot", A: A.join(";") });
    } else {
      sol = "Shape B does not have the same side lengths as shape A, so it cannot be a mirror image or a turned copy, since reflections and rotations keep side lengths. So <b>they are not related by a reflection or a rotation</b>.";
      q = mcq(prompt, { t: neiT, fb: "Correct. One side length differs, and reflections and rotations never change side lengths." },
        [{ t: reflT, fb: "A mirror image would keep every side length; compare the sides here." }, { t: rotT, fb: "A turned copy would keep every side length; compare the sides here." }, { t: enlT, fb: "An enlargement scales every side by one factor; here only part of the shape changed." }], sol, { mode: "related-neither", A: A.join(";") });
    }
    q.figure = grid;
    return q;
  }
  var qf = mcq("Shape A and shape B are shown on the grid. How are the two shapes related?",
    { t: "They are related by a reflection (one is the mirror image of the other).", fb: "Correct." },
    [{ t: "They are related by a rotation (one is a turned copy of the other).", fb: "B is flipped compared with A." }, { t: "They are not related by a reflection or a rotation.", fb: "Check a mirror across the y-axis." }, { t: "Shape B is an enlargement of shape A.", fb: "The side lengths are the same." }],
    "Each vertex of B is the mirror image of a vertex of A across the y-axis, so <b>they are related by a reflection</b>.", { mode: "related-refl", A: "-4,-2;-1,-1;-3,2" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[-4, -2], [-1, -1], [-3, 2]], fill: FIG_SHADE }, { pts: [[4, -2], [1, -1], [3, 2]], fill: "#ffffff" }], labels: [{ p: [-2.7, -0.3], str: "A", size: 14, bold: true }, { p: [2.7, -0.3], str: "B", size: 14, bold: true }], aria: "Two triangles A and B on a grid" });
  return qf;
}, ["Reflections and rotations never change side lengths, so compare the sides first.", "If the sides match, decide whether the second shape is flipped (reflection) or just turned (rotation)."]);

E("u8-pk-transformation-symmetry", 8, ["3.24"], 1, "gen", function () {
  var mode = pick(["reflY", "reflX", "rot180"]);
  var A = [[ri(1, 2), ri(1, 2)], [ri(4, 5), ri(1, 2)], [ri(1, 3), ri(4, 5)]];
  var area19 = Math.abs((A[1][0] - A[0][0]) * (A[2][1] - A[0][1]) - (A[2][0] - A[0][0]) * (A[1][1] - A[0][1]));
  if (area19 < 4) { A = [[1, 1], [5, 2], [2, 5]]; }
  var B;
  if (mode === "reflY") B = A.map(function (p) { return [-p[0], p[1]]; });
  else if (mode === "reflX") B = A.map(function (p) { return [p[0], -p[1]]; });
  else B = A.map(function (p) { return [-p[0], -p[1]]; });
  var cenA = [(A[0][0] + A[1][0] + A[2][0]) / 3, (A[0][1] + A[1][1] + A[2][1]) / 3];
  var cenB = [(B[0][0] + B[1][0] + B[2][0]) / 3, (B[0][1] + B[1][1] + B[2][1]) / 3];
  var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
    shapes: [{ pts: A, fill: FIG_SHADE }, { pts: B, fill: "#ffffff" }],
    labels: [{ p: cenA, str: "Shape", size: 12, bold: true }, { p: cenB, str: "Image", size: 12, bold: true }],
    aria: "A shape and its image on a grid" });
  var yT = "The shape and its image have line symmetry across the y-axis.";
  var xT = "The shape and its image have line symmetry across the x-axis.";
  var rT = "The shape and its image have rotation symmetry of order 2 about the origin.";
  var nT = "The shape and its image have no line or rotation symmetry.";
  var corrT = mode === "reflY" ? yT : (mode === "reflX" ? xT : rT);
  var all = [yT, xT, rT, nT];
  var rest = all.filter(function (t) { return t !== corrT; }).map(function (t) {
    return { t: t, fb: t === nT ? "The combined picture does have a symmetry; picture folding it or turning it as one piece." : "That names the wrong mirror line or centre for this picture; check where the image sits." };
  });
  var expl = mode === "reflY" ? "The image is the mirror image of the shape across the y-axis, so the combined picture folds exactly onto itself along the y-axis."
    : mode === "reflX" ? "The image is the mirror image of the shape across the x-axis, so the combined picture folds exactly onto itself along the x-axis."
    : "The image is the shape turned a half turn about the origin, so the combined picture matches itself after a half turn about the origin, which is rotation symmetry of order 2.";
  var q = mcq("A shape and its image after a transformation are shown on the grid. Which statement describes the symmetry of the combined picture (the shape and its image together)?",
    { t: corrT, fb: "Correct. " + expl }, rest,
    expl + " So the statement is: <b>" + corrT + "</b>",
    { mode: "transf-" + mode, A: A.join(";") });
  q.figure = grid;
  return q;
}, ["Treat the shape and its image as one picture, then test folds and turns on the whole picture.", "Look at where the image sits compared with the shape: mirrored sideways, mirrored up and down, or turned a half turn."]);

E("u8-pk-translation-rule", 8, ["3.21"], 1, "gen", function () {
  for (var att = 0; att < 200; att++) {
    var a = ri(1, 5), b = ri(1, 5);
    if (a === b) continue;
    var dx = (Math.random() < 0.5 ? 1 : -1) * a, dy = (Math.random() < 0.5 ? 1 : -1) * b;
    var pts = [[ri(-3, 3), ri(-3, 3)], [ri(-3, 4), ri(-3, 4)], [ri(-3, 4), ri(-3, 4)]];
    if (new Set(pts.map(u7Coord)).size < 3) continue;
    var ask = ri(0, 2), P = pts[ask];
    var img = [P[0] + dx, P[1] + dy];
    var cand = [img, [P[0] - dx, P[1] + dy], [P[0] + dx, P[1] - dy], [P[0] + dy, P[1] + dx]];
    if (new Set(cand.map(u7Coord)).size < 4) continue;
    var hWord = dx > 0 ? "R" + fmt(dx) : "L" + fmt(-dx);
    var vWord = dy > 0 ? "U" + fmt(dy) : "D" + fmt(-dy);
    var hTxt = dx > 0 ? "right " + fmt(dx) : "left " + fmt(-dx);
    var vTxt = dy > 0 ? "up " + fmt(dy) : "down " + fmt(-dy);
    var names = ["A", "B", "C"];
    var prompt = "A shape has vertices A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " and C" + u7Coord(pts[2]) + ". It is translated by the rule " + hWord + ", " + vWord + ", which means slide " + hTxt + " and " + vTxt + ". What are the coordinates of the image of vertex " + names[ask] + "?";
    var sol = "Apply the slide to vertex " + names[ask] + u7Coord(P) + ": \\[ \\begin{aligned} x' &= " + fmt(P[0]) + (dx >= 0 ? " + " + fmt(dx) : " - " + fmt(-dx)) + " = " + fmt(img[0]) + " \\\\ y' &= " + fmt(P[1]) + (dy >= 0 ? " + " + fmt(dy) : " - " + fmt(-dy)) + " = " + fmt(img[1]) + " \\end{aligned} \\] So the image of vertex " + names[ask] + " is <b>" + u7Coord(img) + "</b>.";
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Correct. The x slide and the y slide are both applied to the vertex." },
      [
        { t: u7Coord(cand[1]), fb: "The sideways slide went the wrong way; check whether the rule says left or right." },
        { t: u7Coord(cand[2]), fb: "The vertical slide went the wrong way; check whether the rule says up or down." },
        { t: u7Coord(cand[3]), fb: "That swaps the two slides; the first number in the rule is the sideways slide." }
      ], sol, { mode: "translation", dx: dx, dy: dy, P: P.join(","), img: img.join(",") });
    q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: 11, dy: -11 }; }),
      aria: "A triangle on a grid" });
    return q;
  }
  var q = mcq("A shape has vertices A(0, 0), B(3, 1) and C(1, 4). It is translated by the rule R2, U3, which means slide right 2 and up 3. What are the coordinates of the image of vertex B?",
    { t: "(5, 4)", fb: "Correct." },
    [{ t: "(1, 4)", fb: "The sideways slide went the wrong way." }, { t: "(5, -2)", fb: "The vertical slide went the wrong way." }, { t: "(6, 3)", fb: "That swaps the two slides." }],
    "Adding the slides to B(3, 1) gives (5, 4), so the image of B is <b>(5, 4)</b>.", { mode: "translation", dx: 2, dy: 3, P: "3,1", img: "5,4" });
  q.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
    shapes: [{ pts: [[0, 0], [3, 1], [1, 4]], fill: FIG_SHADE }],
    marks: [{ p: [0, 0], label: "A", dx: 11, dy: -11 }, { p: [3, 1], label: "B", dx: 11, dy: -11 }, { p: [1, 4], label: "C", dx: 11, dy: -11 }],
    aria: "A triangle on a grid" });
  return q;
}, ["In the rule, the letter tells the direction and the number tells how far, first sideways then up or down.", "Add the sideways slide to the x coordinate and the vertical slide to the y coordinate (subtracting for left or down)."]);

E("u8-pk-reflect-point", 8, ["3.21"],1,"gen",function(){
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

E("u8-pk-rotate-vertex", 8, ["3.21"], 2, "gen", function () {
  for (var att = 0; att < 300; att++) {
    var V = [ri(-2, 2), ri(-2, 2)];
    var othersL = ["A", "B", "C"];
    var pivotIdx = ri(0, 2);
    var pts = [null, null, null];
    pts[pivotIdx] = V;
    var placed = [V];
    var ok = true;
    for (var i = 0; i < 3; i++) {
      if (i === pivotIdx) continue;
      var p = [ri(-4, 4), ri(-4, 4)];
      var tries = 0;
      while ((p[0] === V[0] && p[1] === V[1]) || placed.some(function (q2) { return q2[0] === p[0] && q2[1] === p[1]; })) { p = [ri(-4, 4), ri(-4, 4)]; if (++tries > 40) { ok = false; break; } }
      if (!ok) break;
      pts[i] = p; placed.push(p);
    }
    if (!ok) continue;
    var area = Math.abs((pts[1][0] - pts[0][0]) * (pts[2][1] - pts[0][1]) - (pts[2][0] - pts[0][0]) * (pts[1][1] - pts[0][1]));
    if (area === 0) continue;
    var askIdx = pick([0, 1, 2].filter(function (i2) { return i2 !== pivotIdx; }));
    var P = pts[askIdx];
    var dx = P[0] - V[0], dy = P[1] - V[1];
    if (dx === 0 && dy === 0) continue;
    var cw = Math.random() < 0.5;
    var img = cw ? [V[0] + dy, V[1] - dx] : [V[0] - dy, V[1] + dx];
    var wrong = cw ? [V[0] - dy, V[1] + dx] : [V[0] + dy, V[1] - dx];
    var aboutOrigin = cw ? [P[1], -P[0]] : [-P[1], P[0]];
    var cand = [img, wrong, aboutOrigin, P];
    if (new Set(cand.map(u7Coord)).size < 4) continue;
    if (img[0] < -6 || img[0] > 6 || img[1] < -6 || img[1] > 6) continue;
    var dirWord = cw ? "clockwise" : "counterclockwise";
    var names = ["A", "B", "C"];
    var prompt = "Triangle ABC has vertices A" + u7Coord(pts[0]) + ", B" + u7Coord(pts[1]) + " and C" + u7Coord(pts[2]) + ". The triangle is rotated 90° " + dirWord + " about vertex " + names[pivotIdx] + ". What are the coordinates of the image of vertex " + names[askIdx] + "?";
    var rotTxt = cw ? "(" + fmt(dx) + ", " + fmt(dy) + ") becomes (" + fmt(dy) + ", " + fmt(-dx) + ")" : "(" + fmt(dx) + ", " + fmt(dy) + ") becomes (" + fmt(-dy) + ", " + fmt(dx) + ")";
    var sol = "Work from the pivot " + names[pivotIdx] + u7Coord(V) + ". The step from the pivot to " + names[askIdx] + " is " + rotTxt + " under a 90° " + dirWord + " turn: \\[ \\begin{aligned} \\text{image} &= " + u7Coord(V) + " + (" + fmt(img[0] - V[0]) + ", " + fmt(img[1] - V[1]) + ") \\\\ &= " + u7Coord(img) + " \\end{aligned} \\] So the image of vertex " + names[askIdx] + " is <b>" + u7Coord(img) + "</b>.";
    var grid = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22,
      shapes: [{ pts: pts, fill: FIG_SHADE }],
      marks: pts.map(function (p2, i2) { return { p: p2, label: names[i2], dx: p2[0] >= V[0] ? 11 : -11, dy: -11 }; }),
      aria: "A triangle on a grid" });
    var q = mcq(prompt,
      { t: u7Coord(img), fb: "Correct. The step from the pivot turns 90° " + dirWord + " and keeps its length." },
      [
        { t: u7Coord(wrong), fb: "That turns the step the other way; check the stated direction." },
        { t: u7Coord(aboutOrigin), fb: "That rotates about the origin; this turn is about vertex " + names[pivotIdx] + "." },
        { t: u7Coord(P), fb: "That is the starting point of vertex " + names[askIdx] + "; only the pivot stays in place." }
      ], sol, { mode: cw ? "rot-cw" : "rot-ccw", V: V.join(","), P: P.join(","), img: img.join(",") });
    q.figure = grid;
    return q;
  }
  var qf = mcq("Triangle ABC has vertices A(0, 0), B(3, 0) and C(0, 2). The triangle is rotated 90° clockwise about vertex A. What are the coordinates of the image of vertex B?",
    { t: "(0, -3)", fb: "Correct." },
    [{ t: "(0, 3)", fb: "That turns the step the other way." }, { t: "(3, 0)", fb: "That is the starting point of B." }, { t: "(-3, 0)", fb: "That is a half turn, not a quarter turn." }],
    "The step from A to B is (3, 0); a 90° clockwise turn makes it (0, -3), so the image of B is <b>(0, -3)</b>.", { mode: "rot-cw", V: "0,0", P: "3,0", img: "0,-3" });
  qf.figure = u7Grid({ xMin: -6, xMax: 6, yMin: -6, yMax: 6, cell: 22, shapes: [{ pts: [[0, 0], [3, 0], [0, 2]], fill: FIG_SHADE }], marks: [{ p: [0, 0], label: "A", dx: -11, dy: -11 }, { p: [3, 0], label: "B", dx: 11, dy: -11 }, { p: [0, 2], label: "C", dx: -11, dy: -11 }], aria: "A triangle on a grid" });
  return qf;
}, ["The pivot vertex stays fixed; every other vertex swings around it.", "Find the step from the pivot to the named vertex, turn that step 90 degrees, then add it back to the pivot."]);

/* PK tranche metadata pass for Unit 8. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U8_FOR=["3.17","3.18","3.19","3.20","3.21","3.22","3.23","3.24","3.25"];
var PKT_U8={
 "u8-pk-scale-read":{src:"math-2202:4.14",group:"scale"},
 "u8-pk-scale-actual":{src:"math-2202:4.14",group:"scale"},
 "u8-pk-similar-check":{src:"math-1202:3.60",group:"similarity"},
 "u8-pk-corresponding-sides":{src:"math-1202:3.62",group:"similarity"},
 "u8-pk-similar-missing-side":{src:"math-1202:3.64",group:"similarity"},
 "u8-pk-related-shapes":{src:"math-9:10.5",group:"symmetry"},
 "u8-pk-transformation-symmetry":{src:"math-9:10.6",group:"symmetry"},
 "u8-pk-translation-rule":{src:"math-9:10.13",group:"transformations"},
 "u8-pk-reflect-point":{src:"math-7:10.12",group:"transformations"},
 "u8-pk-rotate-vertex":{src:"math-9:10.10",group:"transformations"}
};
BANK.forEach(function(e){var t=PKT_U8[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U8_FOR.slice();e.pkGroup=t.group;}});

/* Distinctness guard for u8-pk-similar-missing-side, carried with the entry
   from its home bank (Mathematics 1202, bank-u7.js, where the same guard
   wraps the original): the generator can, on rare draws, round two
   different error values to the same displayed option; redraw those draws
   so every question keeps four distinct options. */
(function(){
  var ids=["u8-pk-similar-missing-side"];
  BANK.forEach(function(e){
    if(ids.indexOf(e.id)<0) return;
    var orig=e.gen;
    e.gen=function(){ var q, t=0; do { q=orig(); t++; } while(q && q.type==="mc" && new Set(q.options).size<4 && t<40); return q; };
  });
})();
