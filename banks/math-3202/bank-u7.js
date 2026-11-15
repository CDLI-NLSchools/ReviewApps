// Math 3202 Unit 7 Properties of Figures question bank
// CRMARKS: u7-cr-tri-exterior=3
// CRMARKS: u7-cr-kite-frame=4
// CRMARKS: u7-cr-symmetry-tile=5
// CRMARKS: u7-cr-third-side-max=4
// CRMARKS: u7-cr-tri-perimeter=5
/* ===== Unit 7 ===== */
/* Math 3202 Unit 7: Properties of Figures. Helpers prefixed u7. */
function u7txt(x,y,str,anchor,size,bold){
  return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||13)+'" fill="'+FIG_INK+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central"'+(bold?' font-weight="bold"':"")+'>'+str+'</text>';
}
/* Distractor builder for degree or plain numeric answers. cands: [{v, fb}] named errors.
   shufflePick: when true and more than 3 candidates survive, choose 3 at random. */
function u7mkD(ans, cands, suf, shufflePick){
  var pool=[], seen={}; seen[fmt(ans)+(suf||"")]=1;
  for(var i=0;i<cands.length;i++){ var c=cands[i]; if(c.v===undefined||c.v===null) continue;
    if(Math.abs(c.v-ans)<0.001) continue; if(c.v<0) continue; if(ans<360 && c.v>=360) continue;
    var t=fmt(c.v)+(suf||""); if(seen[t]) continue; seen[t]=1; pool.push({t:t, fb:c.fb}); }
  if(shufflePick && pool.length>3) pool=shuffle(pool);
  var out=pool.slice(0,3);
  var offs=[15,-15,30,-30,45,10,-10,20,-20];
  for(var k=0; out.length<3 && k<offs.length; k++){ var v=ans+offs[k]; if(v<0) continue; if(ans<360 && v>=360) continue;
    var tt=fmt(v)+(suf||""); if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That value comes from an arithmetic slip. Work through the angle rule one step at a time and check each subtraction."}); }
  return out;
}
function u7triPts(A,B,C){ /* angles in degrees; P0 at origin (angle A), P1 on x-axis (angle B), P2 apex (angle C) */
  var r=Math.PI/180, c=10;
  var a=c*Math.sin(A*r)/Math.sin(C*r), b=c*Math.sin(B*r)/Math.sin(C*r);
  return [[0,0],[c,0],[b*Math.cos(A*r), b*Math.sin(A*r)]];
}
function u7regPts(n){
  var pts=[];
  for(var i=0;i<n;i++){ var t=Math.PI/2+i*2*Math.PI/n; pts.push([5*Math.cos(t),5*Math.sin(t)]); }
  return pts;
}
/* Generic polygon figure. pts: math coords (y up). o: {L:[labels], ang:{idx:"text"},
   tickSegs:[[i,j],...], extIdx, extLab, aria} */
function u7polySVG(pts,o){
  o=o||{};
  var W=330,H=215,pad=46,n=pts.length;
  var xs=pts.map(function(p){return p[0];}), ys=pts.map(function(p){return p[1];});
  var mnx=Math.min.apply(null,xs), mxx=Math.max.apply(null,xs), mny=Math.min.apply(null,ys), mxy=Math.max.apply(null,ys);
  var sc=Math.min((W-2*pad)/Math.max(mxx-mnx,0.001),(H-2*pad)/Math.max(mxy-mny,0.001));
  var cx=(mnx+mxx)/2, cy=(mny+mxy)/2;
  function T(p){ return [W/2+(p[0]-cx)*sc, H/2-(p[1]-cy)*sc]; }
  var P=pts.map(T), G=[0,0];
  P.forEach(function(p){ G[0]+=p[0]/n; G[1]+=p[1]/n; });
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="'+(o.aria||"Polygon diagram")+'">';
  out+='<polygon points="'+P.map(function(p){return fmt(p[0],1)+","+fmt(p[1],1);}).join(" ")+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(o.tickSegs){ o.tickSegs.forEach(function(sg){
    var a=P[sg[0]], b=P[sg[1]], mx=(a[0]+b[0])/2, my=(a[1]+b[1])/2;
    var dx=b[0]-a[0], dy=b[1]-a[1], l=Math.hypot(dx,dy)||1, px=-dy/l*6, py=dx/l*6;
    out+='<line x1="'+fmt(mx-px,1)+'" y1="'+fmt(my-py,1)+'" x2="'+fmt(mx+px,1)+'" y2="'+fmt(my+py,1)+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  }); }
  if(o.extIdx!==undefined && o.extIdx!==null){
    var i=o.extIdx, to=P[i], from=P[(i+n-1)%n], other=P[(i+1)%n];
    var dx=to[0]-from[0], dy=to[1]-from[1], dl=Math.hypot(dx,dy)||1, dir=[dx/dl,dy/dl];
    var E=[to[0]+dir[0]*42, to[1]+dir[1]*42];
    out+='<line x1="'+fmt(to[0],1)+'" y1="'+fmt(to[1],1)+'" x2="'+fmt(E[0],1)+'" y2="'+fmt(E[1],1)+'" stroke="'+FIG_INK+'" stroke-width="1.6" stroke-dasharray="5 4"/>';
    var ox=other[0]-to[0], oy=other[1]-to[1], ol=Math.hypot(ox,oy)||1;
    var bx=dir[0]+ox/ol, by=dir[1]+oy/ol, bl=Math.hypot(bx,by)||1;
    out+=u7txt(to[0]+bx/bl*27, to[1]+by/bl*27, o.extLab||"?", "middle", 12.5);
  }
  for(var j=0;j<n;j++){
    var V=P[j], vx=V[0]-G[0], vy=V[1]-G[1], vl=Math.hypot(vx,vy)||1;
    if(o.L && o.L[j]) out+=u7txt(V[0]+vx/vl*16, V[1]+vy/vl*16, o.L[j], "middle", 14, true);
    if(o.ang && o.ang[j]) out+=u7txt(V[0]-vx/vl*25, V[1]-vy/vl*25, o.ang[j], "middle", 12.5);
  }
  return out+'</svg>';
}

E("u7-tri-third-angle", 7, ["3.10"], 1, "gen", function(){
  var A=ri(25,80), B=ri(25,80), guard=0;
  while(((A+B>140)||(A+B<70)||(A+B===90)) && guard++<200){ A=ri(25,80); B=ri(25,80); }
  var C=180-A-B;
  var q=mcq("In the triangle shown, two of the angles measure \\("+A+"^\\circ\\) and \\("+B+"^\\circ\\). What is the measure of the third angle?",
    {t:C+"°", fb:"Yes: the three interior angles add to 180°, and 180 - "+A+" - "+B+" = "+C+"."},
    u7mkD(C, [
      {v:A+B, fb:"That adds the two given angles together. The third angle is what remains after both are subtracted from 180°."},
      {v:180-A, fb:"That subtracts only the first given angle from 180°. Both given angles must be subtracted."},
      {v:180-B, fb:"That subtracts only the second given angle from 180°. Both given angles must be subtracted."}
    ], "°"),
    "The interior angles of a triangle add to \\(180^\\circ\\).\n\\[ \\begin{aligned} \\text{third angle} &= 180^\\circ - "+A+"^\\circ - "+B+"^\\circ \\\\ &= "+C+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+C+"°</b>.",
    {A:A, B:B, C:C});
  q.figure=u7polySVG(u7triPts(A,B,C), {L:["A","B","C"], ang:{0:A+"°", 1:B+"°", 2:"?"}, aria:"Triangle with two angles labelled"});
  return q;
}, ["Use the angle sum for a triangle.", "Start by adding the two given angles, then subtract that total from 180."]);

E("u7-quad-fourth-angle", 7, ["3.11"], 1, "gen", function(){
  var A=ri(60,130), B=ri(50,130), C=ri(50,130), D=360-A-B-C, guard=0;
  while((D<40||D>150) && guard++<300){ A=ri(60,130); B=ri(50,130); C=ri(50,130); D=360-A-B-C; }
  if(D<40||D>150){ A=90; B=80; C=100; D=90; }
  var q=mcq("A quadrilateral has three angles measuring \\("+A+"^\\circ\\), \\("+B+"^\\circ\\) and \\("+C+"^\\circ\\). What is the measure of the fourth angle?",
    {t:D+"°", fb:"Yes: the four angles add to 360°, and 360 - "+A+" - "+B+" - "+C+" = "+D+"."},
    u7mkD(D, [
      {v:360-A-B, fb:"That subtracts only two of the given angles from 360°. All three given angles must be subtracted."},
      {v:A+B+C, fb:"That is the total of the three given angles. The fourth angle is what remains after that total is subtracted from 360°."},
      {v:360-A-C, fb:"That subtracts only two of the given angles from 360°. All three given angles must be subtracted."}
    ], "°"),
    "The interior angles of a quadrilateral add to \\(360^\\circ\\).\n\\[ \\begin{aligned} \\text{fourth angle} &= 360^\\circ - "+A+"^\\circ - "+B+"^\\circ - "+C+"^\\circ \\\\ &= "+D+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+D+"°</b>.",
    {A:A, B:B, C:C, D:D});
  q.figure=u7polySVG([[0,0],[9,0.8],[7.6,5.6],[1.2,5]], {L:["A","B","C","D"], ang:{0:A+"°", 1:B+"°", 2:C+"°", 3:"?"}, aria:"Quadrilateral with three angles labelled"});
  return q;
}, ["Use the angle sum for a quadrilateral.", "Start by adding the three given angles, then subtract that total from 360."]);

E("u7-poly-angle-sum", 7, ["3.12"], 1, "gen", function(){
  var mode=ri(0,1);
  if(mode===0){
    var n=ri(5,20), S=180*(n-2);
    var ctx=pick([
      "A regular polygon has \\("+n+"\\) sides.",
      "A garden bed is shaped like a regular polygon with \\("+n+"\\) sides.",
      "A tile is shaped like a regular polygon with \\("+n+"\\) sides."
    ]);
    var _bo0=balOpts({t:S+"°", fb:"Yes: \\(S = 180(n-2) = 180 \\times "+(n-2)+" = "+S+"\\)."}, u7mkD(S, [
        {v:180*n, fb:"That is \\(180 \\times "+n+"\\), which forgets the minus 2 in \\(S = 180(n-2)\\)."},
        {v:180*(n-1), fb:"That subtracts only 1 from the number of sides. The formula subtracts 2: \\(S = 180(n-2)\\)."},
        {v:180*(n-2)/n, fb:"That is the measure of each interior angle. The question asks for the sum of all of them."}
      ], "°", true)); var q=mcq(ctx+" What is the sum of its interior angles?", _bo0[0], _bo0[1],
      "Use the formula sheet formula \\(S = 180(n-2)\\), where \\(n\\) is the number of sides.\n\\[ \\begin{aligned} S &= 180("+n+"-2) \\\\ &= 180 \\times "+(n-2)+" \\\\ &= "+S+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+S+"°</b>.",
      {mode:"sum", n:n});
    q.figure=u7polySVG(u7regPts(n), {aria:"Regular polygon with "+n+" sides"});
    return q;
  }
  var m=ri(5,12), Sm=180*(m-2);
  var _bo1=balOpts({t:String(m), fb:"Yes: \\("+Sm+" \\div 180 = "+(m-2)+"\\), and adding 2 gives "+m+" sides."}, u7mkD(m, [
      {v:Sm/180, fb:"That is \\("+Sm+" \\div 180\\). The formula is \\(S = 180(n-2)\\), so 2 still has to be added back."},
      {v:m+2, fb:"That adds 2 in the wrong place. Divide the sum by 180 first, then add 2."},
      {v:m-2, fb:"That subtracts 2. Dividing by 180 gives \\(n-2\\), so 2 must be added to get \\(n\\)."}
    ], "", true)); return mcq("The interior angles of a regular polygon add to \\("+Sm+"^\\circ\\). How many sides does the polygon have?", _bo1[0], _bo1[1],
    "Work backwards from \\(S = 180(n-2)\\).\n\\[ \\begin{aligned} "+Sm+" &= 180(n-2) \\\\ n-2 &= "+Sm+" \\div 180 \\\\ &= "+(m-2)+" \\\\ n &= "+(m-2)+" + 2 = "+m+" \\end{aligned} \\]\nThe answer is <b>"+m+" sides</b>.",
    {mode:"revsum", n:m});
}, ["Recall the formula that connects the angle sum to the number of sides.", "Start from S = 180(n - 2), and work forwards or backwards depending on what is given."]);

E("u7-iso-angles", 7, ["3.10"], 2, "gen", function(){
  var mode=ri(0,2), q;
  if(mode===0){
    var V=2*ri(18,64), base=(180-V)/2;
    q=mcq("The triangle shown is isosceles. The two equal sides are marked, and the angle between them measures \\("+V+"^\\circ\\). What is the measure of each base angle?",
      {t:base+"°", fb:"Yes: the two base angles are equal, and each one is (180 - "+V+") divided by 2, which is "+base+"."},
      u7mkD(base, [
        {v:180-V, fb:"That is what is left after the vertex angle is subtracted from 180°, but that amount is shared by two equal base angles. Divide it by 2."},
        {v:V, fb:"That copies the vertex angle. In an isosceles triangle the equal angles are the ones opposite the equal sides, at the base."},
        {v:180-2*V, fb:"That doubles the vertex angle before subtracting. Only one vertex angle is subtracted from 180°, then the rest is split equally."}
      ], "°"),
      "The angles opposite equal sides are equal, so the two base angles are the same. Together with the vertex angle they add to \\(180^\\circ\\).\n\\[ \\begin{aligned} \\text{base angle} &= \\frac{180^\\circ - "+V+"^\\circ}{2} \\\\ &= \\frac{"+(180-V)+"^\\circ}{2} \\\\ &= "+base+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+base+"°</b>.",
      {mode:"vertex-given", V:V});
    q.figure=u7polySVG(u7triPts(base,base,V), {L:["A","B","C"], ang:{0:"?", 2:V+"°"}, tickSegs:[[2,0],[1,2]], aria:"Isosceles triangle with the vertex angle labelled"});
    return q;
  }
  if(mode===1){
    var b=ri(28,72), vert=180-2*b;
    q=mcq("The triangle shown is isosceles, with the two equal sides marked. Each base angle measures \\("+b+"^\\circ\\). What is the measure of the vertex angle?",
      {t:vert+"°", fb:"Yes: the two base angles total "+(2*b)+"°, and 180 - "+(2*b)+" = "+vert+"."},
      u7mkD(vert, [
        {v:180-b, fb:"That subtracts only one base angle. There are two equal base angles, so subtract the base angle twice."},
        {v:b, fb:"That copies the base angle. The vertex angle is the one angle that is different in this triangle."},
        {v:90-b, fb:"That finds the complement of the base angle, as if the triangle were right angled. Use the full 180° angle sum instead."}
      ], "°"),
      "The two base angles are equal, so together they measure \\(2 \\times "+b+"^\\circ = "+(2*b)+"^\\circ\\). All three angles add to \\(180^\\circ\\).\n\\[ \\begin{aligned} \\text{vertex angle} &= 180^\\circ - 2 \\times "+b+"^\\circ \\\\ &= 180^\\circ - "+(2*b)+"^\\circ \\\\ &= "+vert+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+vert+"°</b>.",
      {mode:"base-given", b:b});
    q.figure=u7polySVG(u7triPts(b,b,vert), {L:["A","B","C"], ang:{0:b+"°", 2:"?"}, tickSegs:[[2,0],[1,2]], aria:"Isosceles triangle with a base angle labelled"});
    return q;
  }
  var A=ri(30,80), B=ri(30,80), guard=0;
  while((A+B>140) && guard++<200){ A=ri(30,80); B=ri(30,80); }
  var C=180-A-B, ext=A+B;
  q=mcq("In the triangle shown, the side at \\(C\\) is extended to form an exterior angle. The two interior angles away from \\(C\\) measure \\("+A+"^\\circ\\) and \\("+B+"^\\circ\\). What is the measure of the exterior angle at \\(C\\)?",
    {t:ext+"°", fb:"Yes: an exterior angle of a triangle equals the sum of the two non-adjacent interior angles, "+A+" + "+B+" = "+ext+"."},
    u7mkD(ext, [
      {v:C, fb:"That is the interior angle at C. The exterior angle sits next to it on a straight line, so it is 180 minus that value."},
      {v:180-A, fb:"That subtracts one interior angle from 180°. The exterior angle equals the sum of the two non-adjacent interior angles."},
      {v:180-B, fb:"That subtracts one interior angle from 180°. The exterior angle equals the sum of the two non-adjacent interior angles."}
    ], "°"),
    "An exterior angle of a triangle equals the sum of the two non-adjacent interior angles.\n\\[ \\begin{aligned} \\text{exterior angle} &= "+A+"^\\circ + "+B+"^\\circ \\\\ &= "+ext+"^\\circ \\end{aligned} \\]\nThis matches the straight line at \\(C\\): the interior angle there is \\(180^\\circ - "+ext+"^\\circ = "+C+"^\\circ\\). The answer is <b>"+ext+"°</b>.",
    {mode:"exterior", A:A, B:B});
  q.figure=u7polySVG(u7triPts(A,B,C), {L:["A","B","C"], ang:{0:A+"°", 1:B+"°"}, extIdx:2, extLab:"?", aria:"Triangle with an exterior angle at C"});
  return q;
}, ["Sort out which angles are equal, or which angles the exterior angle combines.", "Start from the triangle angle sum of 180 degrees, and use the equal angles or the straight line where the diagram shows them."]);

E("u7-para-angles", 7, ["3.11"], 2, "gen", function(){
  var A=ri(50,140), guard=0;
  while(Math.abs(A-90)<9 && guard++<100){ A=ri(50,140); }
  var askOpp=ri(0,1)===1, ans=askOpp?A:180-A, target=askOpp?2:1;
  var q=mcq("The figure shows a parallelogram \\(ABCD\\). Angle \\(A\\) measures \\("+A+"^\\circ\\). What is the measure of angle \\("+(askOpp?"C":"B")+"\\)?",
    {t:ans+"°", fb:askOpp?("Yes: opposite angles of a parallelogram are equal, so angle C matches angle A at "+A+"°."):("Yes: angles beside each other in a parallelogram add to 180°, and 180 - "+A+" = "+ans+".")},
    u7mkD(ans, [
      {v:askOpp?(180-A):A, fb:askOpp?("That is the size of an angle beside A. Angle C sits opposite A, and opposite angles of a parallelogram are equal."):("That copies angle A. Angle B sits beside A, and neighbouring angles of a parallelogram add to 180°.")},
      {v:90, fb:"That would be correct only for a rectangle. Nothing in the figure says the angles are right angles."},
      {v:360-A, fb:"That subtracts one angle from the full 360° total. Use the parallelogram rules for the specific angle asked about."}
    ], "°"),
    (askOpp?"Opposite angles of a parallelogram are equal. Angle \\(C\\) is opposite angle \\(A\\), so it has the same measure.":"Angles beside each other in a parallelogram are supplementary: they add to \\(180^\\circ\\) because the sides are parallel.\n\\[ \\begin{aligned} \\angle B &= 180^\\circ - "+A+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\]")+"\nThe answer is <b>"+ans+"°</b>.",
    {A:A, ask:askOpp?"opposite":"adjacent"});
  var ang={0:A+"°"}; ang[target]="?";
  q.figure=u7polySVG([[0,0],[8.5,0],[10,4.6],[1.5,4.6]], {L:["A","B","C","D"], ang:ang, aria:"Parallelogram with angle A labelled"});
  return q;
}, ["Decide how the asked angle is positioned relative to the given angle: opposite or beside it.", "Start by naming the parallelogram rule that matches that position, then apply it to the given angle."]);

E("u7-poly-each-angle", 7, ["3.12"], 2, "gen", function(){
  var INTN=[5,6,8,9,10,12,15,18,20,24], EXTN=[5,6,8,9,10,12,15,18,20,24];
  var mode=ri(0,5), q;
  if(mode===0){
    var n=pick(INTN), M=180*(n-2)/n, E=360/n, S=180*(n-2);
    q=mcq("A regular polygon has \\("+n+"\\) sides. What is the measure of each interior angle?",
      {t:M+"°", fb:"Yes: the sum is "+S+"°, shared equally among "+n+" angles gives "+M+"° each."},
      u7mkD(M, [
        {v:S, fb:"That is the sum of all the interior angles. Divide the sum by the number of angles to get each one."},
        {v:E, fb:"That is the measure of each exterior angle. The interior angle is found from the sum formula, or as 180 minus the exterior angle."},
        {v:180*(n-1)/n, fb:"That uses n - 1 in the formula. The sum formula is S = 180(n - 2), then divide by n."},
        {v:M+10, fb:"That is 10 too high. Find the sum with S = 180(n - 2) first, then divide by the number of sides."},
        {v:M-10, fb:"That is 10 too low. Find the sum with S = 180(n - 2) first, then divide by the number of sides."},
        {v:M+20, fb:"That is 20 too high. Find the sum with S = 180(n - 2) first, then divide by the number of sides."}
      ], "°", true),
      "First find the sum with \\(S = 180(n-2)\\), then share it equally among the \\("+n+"\\) angles using \\(M = \\frac{180(n-2)}{n}\\).\n\\[ \\begin{aligned} M &= \\frac{180("+n+"-2)}{"+n+"} \\\\ &= \\frac{"+S+"}{"+n+"} \\\\ &= "+M+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+M+"°</b>.",
      {mode:"each", n:n});
    q.figure=u7polySVG(u7regPts(n), {aria:"Regular polygon with "+n+" sides"});
    return q;
  }
  if(mode===1){
    var n1=pick(EXTN), E1=360/n1, M1=180-E1;
    q=mcq("A regular polygon has \\("+n1+"\\) sides. What is the measure of each exterior angle?",
      {t:E1+"°", fb:"Yes: the exterior angles of any polygon add to 360°, and 360 divided by "+n1+" is "+E1+"."},
      u7mkD(E1, [
        {v:M1, fb:"That is the measure of each interior angle. The exterior angles add to 360° in total, shared equally."},
        {v:180, fb:"That is a straight line, not an exterior angle. At each vertex the interior and exterior angles add to 180°, but the exterior angle itself comes from 360 divided by the number of sides."},
        {v:180*(n1-2), fb:"That is the sum of the interior angles. The exterior angles have their own total: 360°."},
        {v:E1+5, fb:"That is close but off. The exterior angles total exactly 360°, shared equally among the sides."},
        {v:E1-5, fb:"That is close but off. The exterior angles total exactly 360°, shared equally among the sides."},
        {v:E1+10, fb:"That is close but off. The exterior angles total exactly 360°, shared equally among the sides."}
      ], "°", true),
      "The exterior angles of a polygon add to \\(360^\\circ\\). In a regular polygon they are all equal.\n\\[ \\begin{aligned} \\text{each exterior angle} &= \\frac{360^\\circ}{"+n1+"} \\\\ &= "+E1+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+E1+"°</b>.",
      {mode:"exterior", n:n1});
    q.figure=u7polySVG(u7regPts(n1), {aria:"Regular polygon with "+n1+" sides"});
    return q;
  }
  if(mode===2){
    var n2=pick(INTN), M2=180*(n2-2)/n2, E2=360/n2;
    return mcq("Each interior angle of a regular polygon measures \\("+M2+"^\\circ\\). How many sides does the polygon have?",
      {t:String(n2), fb:"Yes: each exterior angle is 180 - "+M2+" = "+E2+"°, and 360 divided by "+E2+" is "+n2+"."},
      u7mkD(n2, [
        {v:E2, fb:"That is the measure of each exterior angle, not the number of sides. Divide 360 by that exterior angle to count the sides."},
        {v:n2+2, fb:"That is 2 too many. The count comes from 360 divided by the exterior angle of "+E2+"°."},
        {v:n2-2, fb:"That is 2 too few. The count comes from 360 divided by the exterior angle of "+E2+"°."}
      ], "", true),
      "At each vertex, the interior and exterior angles add to \\(180^\\circ\\). The exterior angles add to \\(360^\\circ\\) in total.\n\\[ \\begin{aligned} \\text{exterior angle} &= 180^\\circ - "+M2+"^\\circ = "+E2+"^\\circ \\\\ n &= \\frac{360}{"+E2+"} = "+n2+" \\end{aligned} \\]\nThe answer is <b>"+n2+" sides</b>.",
      {mode:"sides-from-angle", n:n2});
  }
  if(mode===4){
    var n4=pick(INTN), S4=180*(n4-2), M4=S4/n4;
    return mcq("The interior angles of a regular polygon add to \\("+S4+"^\\circ\\). What is the measure of each interior angle?",
      {t:M4+"°", fb:"Yes: the polygon has "+n4+" sides, and the sum of "+S4+"° shared equally gives "+M4+"° each."},
      u7mkD(M4, [
        {v:S4, fb:"That is the sum of all the angles. Each angle is the sum shared equally among the sides."},
        {v:360/n4, fb:"That is each exterior angle. Each interior angle comes from sharing the given sum equally."},
        {v:M4+10, fb:"That is 10 too high. First recover the side count from the sum, then divide the sum by it."},
        {v:M4-10, fb:"That is 10 too low. First recover the side count from the sum, then divide the sum by it."},
        {v:M4+20, fb:"That is 20 too high. First recover the side count from the sum, then divide the sum by it."}
      ], "°", true),
      "Recover the side count from \\("+S4+" = 180(n-2)\\): \\(n-2 = "+(n4-2)+"\\), so \\(n = "+n4+"\\). Then share the sum equally.\n\\[ \\begin{aligned} M &= \\frac{"+S4+"}{"+n4+"} \\\\ &= "+M4+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+M4+"°</b>.",
      {mode:"each-from-sum", n:n4});
  }
  if(mode===5){
    var n5=pick(EXTN), E5=360/n5;
    return mcq("Each exterior angle of a regular polygon measures \\("+E5+"^\\circ\\). How many sides does the polygon have?",
      {t:String(n5), fb:"Yes: the exterior angles total 360°, and 360 divided by "+E5+" is "+n5+"."},
      u7mkD(n5, [
        {v:E5, fb:"That is the exterior angle measure, not a count. Divide the exterior total of 360 by it."},
        {v:n5+2, fb:"That is 2 too many. The count is 360 divided by the exterior angle."},
        {v:n5-2, fb:"That is 2 too few. The count is 360 divided by the exterior angle."},
        {v:n5+1, fb:"That is 1 too many. The count is 360 divided by the exterior angle."},
        {v:n5-1, fb:"That is 1 too few. The count is 360 divided by the exterior angle."}
      ], "", true),
      "The exterior angles of a polygon add to \\(360^\\circ\\), and in a regular polygon they are all equal.\n\\[ \\begin{aligned} n &= \\frac{360}{"+E5+"} \\\\ &= "+n5+" \\end{aligned} \\]\nThe answer is <b>"+n5+" sides</b>.",
      {mode:"sides-from-exterior", n:n5});
  }
  var n3=pick(EXTN), E3=360/n3, M3=180-E3;
  return mcq("Each exterior angle of a regular polygon measures \\("+E3+"^\\circ\\). What is the measure of each interior angle?",
    {t:M3+"°", fb:"Yes: at each vertex the interior and exterior angles form a straight line, and 180 - "+E3+" = "+M3+"."},
    u7mkD(M3, [
      {v:E3, fb:"That copies the exterior angle. The interior angle sits beside it on a straight line, so subtract from 180°."},
      {v:360-E3, fb:"That subtracts from the full turn of 360°. At one vertex, the interior and exterior angles add to 180°, a straight line."},
      {v:90+E3, fb:"That adds the exterior angle to a right angle. At one vertex, the interior and exterior angles add to 180°, a straight line."}
    ], "°", true),
    "At each vertex of a polygon, the interior angle and the exterior angle sit on a straight line, so they add to \\(180^\\circ\\).\n\\[ \\begin{aligned} \\text{interior angle} &= 180^\\circ - "+E3+"^\\circ \\\\ &= "+M3+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+M3+"°</b>.",
    {mode:"interior-from-exterior", n:n3});
}, ["Decide whether the question is about the sum, each interior angle, or each exterior angle before calculating.", "Start with the two totals: interior angles use S = 180(n - 2), and exterior angles always add to 360."]);

E("u7-property-applies", 7, ["3.13"], 2, "var", varset([
  function(){ return mcq("A student says: \"Any quadrilateral with four equal sides must also have four equal angles.\" Is the student correct?",
    {t:"No. A rhombus has four equal sides, but its angles are equal only in pairs unless it is a square.", fb:"Correct: equal sides alone do not force equal angles. A slanted rhombus is the counterexample."},
    [
      {t:"Yes. Equal sides always force the angles to be equal as well, in every quadrilateral.", fb:"That is true for a square, but a rhombus pushed to one side keeps equal sides while its angles change."},
      {t:"Yes. Every quadrilateral with four equal sides is a square, whatever its angles look like in the drawing.", fb:"A square is one case, but a rhombus also has four equal sides and need not have right angles."},
      {t:"No. A quadrilateral with four equal sides cannot exist, so the rhombus must be a trick shape.", fb:"It can: squares and rhombuses both have four equal sides."}
    ],
    "Four equal sides describe both squares and rhombuses. A rhombus that is not a square has four equal sides but its angles are not all equal, so the property \"all angles equal\" does not follow from equal sides. The answer is <b>No</b>.",
    {case:"rhombus"}); },
  function(){ return mcq("The formula \\(M = \\frac{180(n-2)}{n}\\) gives the measure of each interior angle. A pentagon has interior angles of \\(100^\\circ\\), \\(120^\\circ\\), \\(90^\\circ\\), \\(110^\\circ\\) and \\(120^\\circ\\). Does the formula give the measure of each of its angles?",
    {t:"No. The formula assumes a regular polygon, and these angles are not all equal, so the pentagon is not regular.", fb:"Correct: the formula shares the sum equally, which only matches reality when every angle is the same."},
    [
      {t:"Yes. The formula works for every pentagon, regular or not, whatever the shape of the pentagon looks like.", fb:"The formula divides the sum equally among the angles. That matches each angle only when the polygon is regular."},
      {t:"Yes. It gives 108°, and each angle can be rounded to that value to make them all match exactly, every single one.", fb:"The listed angles are exact measures and they differ from each other, so no single value describes each angle."},
      {t:"No. The formula cannot be used because the angle sum is not 540° here, so the whole method fails.", fb:"Check the sum: 100 + 120 + 90 + 110 + 120 = 540, so the sum is fine. The issue is that the angles are not equal."}
    ],
    "The angles add to \\(540^\\circ\\), the correct sum for a pentagon, but they are not all equal, so the pentagon is not regular. The formula \\(M = \\frac{180(n-2)}{n}\\) shares the sum equally and applies only to regular polygons. The answer is <b>No</b>.",
    {case:"formula-regular-only"}); },
  function(){ return mcq("In an isosceles triangle, the angles opposite the equal sides are equal. Does that property apply to a scalene triangle, where all three sides have different lengths?",
    {t:"No. A scalene triangle has no equal sides, so it has no pair of angles that must be equal.", fb:"Correct: the property is tied to equal sides, and a scalene triangle has none."},
    [
      {t:"Yes. Every triangle has two equal angles, whatever the lengths of its sides happen to be in the drawing.", fb:"That describes isosceles and equilateral triangles. A scalene triangle has three different sides and three different angles."},
      {t:"Yes. The two smaller angles of a scalene triangle are always equal to each other.", fb:"In a scalene triangle the angles are all different, because each side has a different length."},
      {t:"No. A scalene triangle has no angles at all in common with an isosceles triangle.", fb:"Both are triangles with a 180° angle sum. The equal angles property is the part that does not carry over."}
    ],
    "The equal angles property comes from having equal sides. A scalene triangle has no equal sides, so none of its angles are forced to be equal. The answer is <b>No</b>.",
    {case:"scalene"}); },
  function(){ return mcq("In a parallelogram, both pairs of opposite angles are equal. Does that property apply to a general trapezoid, which has only one pair of parallel sides?",
    {t:"No. A general trapezoid does not have both pairs of opposite angles equal; that comes from having two pairs of parallel sides.", fb:"Correct: the property depends on both pairs of sides being parallel, and a trapezoid has only one pair."},
    [
      {t:"Yes. Every quadrilateral has both pairs of opposite angles equal; that is a property of every four-sided shape, without exception.", fb:"That is a parallelogram property. Other quadrilaterals, such as a general trapezoid or kite, do not share it."},
      {t:"Yes. A trapezoid is a special kind of parallelogram, so it shares the properties of parallelograms in full measure.", fb:"A parallelogram needs two pairs of parallel sides. A general trapezoid has only one pair, so it is a different family."},
      {t:"No. A trapezoid has no equal angles under any circumstances, no matter how it is drawn or how long its sides are.", fb:"An isosceles trapezoid does have equal base angles. The point is narrower: both pairs of opposite angles equal is not guaranteed."}
    ],
    "Both pairs of opposite angles being equal is a property of parallelograms, which have two pairs of parallel sides. A general trapezoid has only one pair of parallel sides, so the property is not guaranteed. The answer is <b>No</b>.",
    {case:"trapezoid"}); },
  function(){ return mcq("A regular hexagon has 6 lines of symmetry. A hexagon drawn freehand has sides and angles that are all different. Does it also have 6 lines of symmetry?",
    {t:"No. The 6 lines come from the hexagon being regular; with all sides and angles different, it may have no lines of symmetry at all.", fb:"Correct: symmetry counts depend on the sides and angles matching up, which regularity guarantees."},
    [
      {t:"Yes. Every hexagon has exactly 6 lines of symmetry, because six sides always give six lines, whatever the lengths of the sides may be.", fb:"The number 6 matches the side count only for a regular hexagon. An irregular hexagon can have fewer, even zero."},
      {t:"Yes. Any hexagon has at least 3 lines of symmetry, since a six-sided shape always keeps at least half of its lines.", fb:"That is not guaranteed. A hexagon with all sides and angles different can have no line of symmetry."},
      {t:"No. Only circles can have lines of symmetry, so no polygon, hexagon included, can have even one single line of its own.", fb:"Polygons can have lines of symmetry too: a square has 4 and a regular hexagon has 6. This hexagon is irregular, which is the issue."}
    ],
    "Lines of symmetry in a regular polygon match its number of sides because every side and angle is the same. Once the sides and angles are all different, that matching is lost, so the count of 6 does not apply. The answer is <b>No</b>.",
    {case:"irregular-hexagon"}); },
  function(){ return mcq("The sum formula \\(S = 180(n-2)\\) is often introduced with regular polygons. An irregular pentagon has angles of \\(95^\\circ\\), \\(130^\\circ\\), \\(85^\\circ\\), \\(140^\\circ\\) and one unknown angle. Does the formula still give the total the five angles must add to?",
    {t:"Yes. The sum is 180(5 - 2) = 540° for every pentagon; regularity affects whether the angles are equal, not their total.", fb:"Correct: the sum formula holds for all polygons with that many sides, regular or not."},
    [
      {t:"No. The formula only works when all the angles are equal, so it cannot be used for this pentagon at all.", fb:"That restriction belongs to the each angle formula M = 180(n - 2) / n. The sum itself is 540° for any pentagon."},
      {t:"No. An irregular pentagon has a different angle sum for every drawing, changing from one sketch to the next one drawn on the page.", fb:"The individual angles change from drawing to drawing, but their total is fixed by the number of sides: 540° for five sides."},
      {t:"Yes. The total is 900°, the sum for a regular pentagon, and every pentagon shares that same total, every time it is drawn.", fb:"The sum for any pentagon is 180(5 - 2) = 540°. The value 900° is the sum for a heptagon, with 7 sides."}
    ],
    "The sum of the interior angles depends only on the number of sides: \\(S = 180(n-2)\\). For any pentagon, \\(S = 180 \\times 3 = 540^\\circ\\), regular or irregular. The answer is <b>Yes</b>.",
    {case:"sum-any-pentagon"}); }
]), ["Ask what the property depends on: equal sides, parallel sides, or the polygon being regular.", "Start by checking whether the given polygon has the feature the property needs."]);

E("u7-applications", 7, ["3.16"], 2, "var", varset([
  function(){ return mcq("Builders brace wall frames and roof trusses with triangles rather than rectangles. Which property of triangles explains why?",
    {t:"A triangle is rigid: once its three side lengths are fixed, its angles cannot change, so the frame holds its shape.", fb:"Correct: fixed side lengths fix the angles, which is why triangular bracing stiffens a frame."},
    [
      {t:"A triangle has an angle sum of 180°, and that total is what makes it strong enough to brace any frame built from wood.", fb:"The angle sum is true of every triangle but does not explain rigidity. The key point is that the side lengths lock the angles in place."},
      {t:"A triangle has three lines of symmetry, which spreads the load evenly across the whole wooden frame it braces.", fb:"Only an equilateral triangle has 3 lines of symmetry, and braces are rarely equilateral. Rigidity comes from the fixed side lengths."},
      {t:"A triangle is the only polygon that can be cut from a sheet of plywood for building frames and gates.", fb:"Any polygon can be cut from plywood. The reason for choosing triangles is that they hold their shape."}
    ],
    "A rectangle with fixed side lengths can still lean over, changing its angles. A triangle cannot: its three side lengths determine its angles completely, so a triangular brace keeps a frame square and rigid. The answer is <b>the rigidity of triangles</b>.",
    {ctx:"construction-truss"}); },
  function(){ return mcq("A bathroom floor is tiled with regular hexagon tiles, with no gaps and no overlaps. Which fact about regular hexagons makes this possible?",
    {t:"Each interior angle of a regular hexagon is 120°, and three of them meet at a point to make 360° exactly.", fb:"Correct: 3 times 120° fills the full turn around a point, so the tiles fit with no gap."},
    [
      {t:"Each interior angle of a regular hexagon is 90°, so four tiles meet neatly at a point on the floor below.", fb:"A regular hexagon has interior angles of 120°, not 90°. Angles of 90° describe square tiles."},
      {t:"A regular hexagon has 6 lines of symmetry, and symmetry is what closes the gaps between tiles.", fb:"Symmetry makes the pattern look even, but the tiling works because the angles at each meeting point add to exactly 360°."},
      {t:"The interior angles of a hexagon add to 720°, and that total fills the floor completely.", fb:"The sum 720° describes one tile. What matters at a meeting point is the single angle, 120°, and how copies of it add to 360°."}
    ],
    "For tiles to meet with no gaps, the angles around each meeting point must add to \\(360^\\circ\\). A regular hexagon has interior angles of \\(\\frac{180(6-2)}{6} = 120^\\circ\\), and \\(3 \\times 120^\\circ = 360^\\circ\\), so three tiles fit exactly. The answer is <b>each angle is 120°, and three make 360°</b>.",
    {ctx:"domestic-tiling"}); },
  function(){ return mcq("A quilter combines square patches and equilateral triangle patches in a repeating design. At several points in the design, two square corners and three triangle corners meet. Why do the pieces fit together exactly at those points?",
    {t:"The angles there add to 360°: two angles of 90° from the squares and three of 60° from the triangles total exactly 360°.", fb:"Correct: 90 + 90 + 60 + 60 + 60 = 360, the full turn around a point, so there is no gap and no overlap."},
    [
      {t:"Every patch has the same side length, and equal sides are all that a design needs to fit together neatly on the quilt top.", fb:"Equal sides make the edges match in length, but the corners fit only if their angles add to 360° around the meeting point."},
      {t:"Squares and triangles both have lines of symmetry, so their corners always match whenever they meet.", fb:"Symmetry helps the design repeat, but the corners close up because of the angle total around the point, not the symmetry."},
      {t:"The angles add to 180°, which fills the space around a point, so the design closes up with no gaps.", fb:"Angles around a point add to 360°, not 180°. The value 180° is the total on a straight line or inside one triangle."}
    ],
    "Each corner of a square is \\(90^\\circ\\) and each angle of an equilateral triangle is \\(60^\\circ\\). Around a meeting point the angles must total \\(360^\\circ\\), and here \\(2 \\times 90^\\circ + 3 \\times 60^\\circ = 180^\\circ + 180^\\circ = 360^\\circ\\), so the pieces fill the space exactly. The answer is <b>the angles around the point add to 360°</b>.",
    {ctx:"artistic-quilt"}); },
  function(){ return mcq("Stop signs are regular octagons. A sign shop cuts one from a square sheet by trimming the four corners. Which fact tells the shop the measure of each angle of the finished sign?",
    {t:"Each interior angle of a regular octagon measures 135°, from M = 180(8 - 2) / 8.", fb:"Correct: the formula gives 1080 divided by 8, which is 135° for each angle."},
    [
      {t:"Each angle measures 90°, because the sign starts as a square sheet of metal stock.", fb:"Trimming the corners changes the angles. The finished regular octagon has angles of 135°, not the 90° corners of the original sheet."},
      {t:"Each angle measures 108°, like a regular pentagon with five sides.", fb:"The value 108° belongs to a regular pentagon with 5 sides. An octagon has 8 sides, and the formula gives 135°."},
      {t:"Each angle measures 180°, because the corners are cut along straight lines.", fb:"A cut edge is straight, but the interior angle of the finished octagon is 135°, found with the polygon angle formula."}
    ],
    "A regular octagon has \\(n = 8\\) sides, so each interior angle is \\(M = \\frac{180(8-2)}{8} = \\frac{1080}{8} = 135^\\circ\\). The answer is <b>135°</b>.",
    {ctx:"commercial-sign"}); },
  function(){ return mcq("A carpenter builds a rectangular picture frame and measures the two diagonals before fastening the corners. What is the carpenter checking with those measurements?",
    {t:"That the diagonals are equal, which confirms the corners are true right angles and the frame is a rectangle, not a slanted parallelogram.", fb:"Correct: in a parallelogram the diagonals are equal exactly when the angles are right angles."},
    [
      {t:"That the diagonals are equal to the length of the frame, each measured from one corner to the opposite corner, in both directions across it.", fb:"The diagonals of a rectangle are longer than its length. Their being equal to each other is the check, not their matching a side."},
      {t:"That the diagonals bisect each other, which only rectangles can do, a property no other four-sided shape can manage at all.", fb:"Diagonals bisect each other in every parallelogram, slanted or not, so that test cannot detect a slanted frame."},
      {t:"That the frame has four lines of symmetry, like a square, running through its corners and the middles of its sides.", fb:"A rectangle that is not a square has 2 lines of symmetry. The diagonal check is about the angles being right angles."}
    ],
    "In any parallelogram the diagonals bisect each other, but they are equal in length only when the parallelogram is a rectangle. Equal diagonal measurements tell the carpenter the corners are right angles before the frame is fastened. The answer is <b>equal diagonals confirm the frame is a true rectangle</b>.",
    {ctx:"domestic-frame"}); },
  function(){ return mcq("A greenhouse is built with a roof shaped like half of a regular hexagon, so the roof has three equal sloped sections meeting at equal angles. Why does using a regular polygon shape help the builder?",
    {t:"Every interior angle of a regular hexagon is the same (120°), so the builder can cut all the angled joints to one setting and reuse it.", fb:"Correct: regularity means one angle measure repeats, so one saw setting and one joint design serve throughout."},
    [
      {t:"A regular hexagon has no angles, so the joints need no measuring at all before they are cut, and any setting on the saw will do for them.", fb:"A hexagon has six interior angles of 120° each. It is the angles being equal, not absent, that helps."},
      {t:"Regular polygons are stronger than other shapes because their angle sum is larger, and a larger sum means stronger joints.", fb:"Strength is not the point here, and angle sum grows with side count for any polygon. The builder benefits from the angles all being equal."},
      {t:"Each angle of a regular hexagon is 90°, so standard square joints fit every joint, and no angled cuts are needed for the work.", fb:"A regular hexagon has angles of 120°, not 90°. The benefit is that all six share that one measure."}
    ],
    "In a regular polygon every interior angle has the same measure: for a hexagon, \\(\\frac{180(6-2)}{6} = 120^\\circ\\). Repeated equal angles mean one cutting setting and one joint design can be reused, which speeds up the build and keeps the roof even. The answer is <b>all the angles are equal, so one cut setting is reused</b>.",
    {ctx:"construction-greenhouse"}); }
]), ["Sort each scenario by the property doing the work: angle totals, equal angles, equal diagonals, or rigidity.", "Start by naming the polygon in the scenario, then match it to the property that the job depends on."]);

E("u7-cr-tri-exterior", 7, ["3.10"], 2, "gen", function(){
  var A=ri(32,78), B=ri(32,78), guard=0;
  while((A+B>135||A+B<75) && guard++<200){ A=ri(32,78); B=ri(32,78); }
  var C=180-A-B, E=A+B, mode=ri(0,1), q;
  if(mode===0){
    q=numq("In the triangle shown, one side is extended at \\(C\\) to form an exterior angle. The two interior angles away from \\(C\\) measure \\("+A+"^\\circ\\) and \\("+B+"^\\circ\\). Find the measure, in degrees, of the exterior angle at \\(C\\). Show your work.",
      E, 0.5,
      "An exterior angle of a triangle equals the sum of the two non-adjacent interior angles.\n\\[ \\begin{aligned} \\text{exterior angle} &= "+A+"^\\circ + "+B+"^\\circ \\\\ &= "+E+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+E+"°</b>.",
      {mode:"find-exterior", A:A, B:B});
    q.figure=u7polySVG(u7triPts(A,B,C), {L:["A","B","C"], ang:{0:A+"°", 1:B+"°"}, extIdx:2, extLab:"?", aria:"Triangle with an exterior angle at C"});
    return q;
  }
  q=numq("In the triangle shown, one side is extended at \\(C\\). The exterior angle at \\(C\\) measures \\("+E+"^\\circ\\), and one of the interior angles away from \\(C\\) measures \\("+A+"^\\circ\\). Find the measure, in degrees, of the other interior angle away from \\(C\\). Show your work.",
    B, 0.5,
    "An exterior angle of a triangle equals the sum of the two non-adjacent interior angles, so the missing one is the exterior angle minus the known one.\n\\[ \\begin{aligned} \\text{missing angle} &= "+E+"^\\circ - "+A+"^\\circ \\\\ &= "+B+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+B+"°</b>.",
    {mode:"find-remote", A:A, E:E});
  q.figure=u7polySVG(u7triPts(A,B,C), {L:["A","B","C"], ang:{0:A+"°", 1:"?"}, extIdx:2, extLab:E+"°", aria:"Triangle with an exterior angle at C"});
  return q;
}, ["The exterior angle of a triangle is tied to the two interior angles away from it.", "Start by writing the exterior angle as a sum of the two non-adjacent interior angles, then solve for the unknown."]);

E("u7-cr-kite-frame", 7, ["3.11", "3.16"], 2, "gen", function(){
  var A=ri(70,120), C=ri(60,130), B=(360-A-C)/2, guard=0;
  while(((360-A-C)%2!==0||B<40||B>120) && guard++<300){ A=ri(70,120); C=ri(60,130); B=(360-A-C)/2; }
  if((360-A-C)%2!==0||B<40||B>120){ A=100; C=80; B=90; }
  var q=numq("A decorative kite frame is a quadrilateral \\(ABCD\\). The angle at \\(A\\) measures \\("+A+"^\\circ\\) and the angle at \\(C\\) measures \\("+C+"^\\circ\\). The angles at \\(B\\) and \\(D\\) are equal. Find the measure, in degrees, of the angle at \\(B\\). Show your work.",
    B, 0.5,
    "The interior angles of a quadrilateral add to \\(360^\\circ\\), and the angles at \\(B\\) and \\(D\\) are equal, so each one counts twice.\n\\[ \\begin{aligned} "+A+"^\\circ + "+C+"^\\circ + 2\\angle B &= 360^\\circ \\\\ 2\\angle B &= 360^\\circ - "+A+"^\\circ - "+C+"^\\circ \\\\ &= "+(360-A-C)+"^\\circ \\\\ \\angle B &= \\frac{"+(360-A-C)+"^\\circ}{2} = "+B+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+B+"°</b>.",
    {A:A, C:C, B:B});
  q.figure=u7polySVG([[0,5.2],[3.1,0.8],[0,-3.4],[-3.1,0.8]], {L:["A","B","C","D"], ang:{0:A+"°", 1:"?", 2:C+"°", 3:"?"}, aria:"Kite shaped quadrilateral with angles at A and C labelled"});
  return q;
}, ["Use the angle sum for a quadrilateral, and use the fact that two of the angles are equal.", "Start by subtracting the two given angles from 360, then share what remains equally between the two equal angles."]);

E("u7-cr-symmetry-tile", 7, ["3.12", "3.15"], 2, "gen", function(){
  var MN=[[108,5],[120,6],[135,8],[140,9],[144,10],[150,12],[156,15],[160,18],[162,20],[165,24]];
  var pair=pick(MN), M=pair[0], n=pair[1], E=180-M, S=180*(n-2), mode=ri(0,1);
  var ctx=pick(["A floor tile","A garden stepping stone","A coaster","A patio paver","A wall plaque"]);
  if(mode===0){
    return numq(ctx+" is shaped like a regular polygon. Each interior angle of the shape measures \\("+M+"^\\circ\\). How many lines of symmetry does the shape have? Show your work.",
      n, 0.5,
      "First find the number of sides. At each vertex the interior and exterior angles add to \\(180^\\circ\\), and the exterior angles add to \\(360^\\circ\\) in total.\n\\[ \\begin{aligned} \\text{exterior angle} &= 180^\\circ - "+M+"^\\circ = "+E+"^\\circ \\\\ n &= \\frac{360}{"+E+"} = "+n+" \\end{aligned} \\]\nA regular polygon has as many lines of symmetry as it has sides, so the shape has <b>"+n+" lines of symmetry</b>.",
      {mode:"from-angle", M:M, n:n});
  }
  return numq(ctx+" is shaped like a regular polygon. The interior angles of the shape add to \\("+S+"^\\circ\\). How many lines of symmetry does the shape have? Show your work.",
    n, 0.5,
    "First find the number of sides by working backwards from \\(S = 180(n-2)\\).\n\\[ \\begin{aligned} n-2 &= \\frac{"+S+"}{180} = "+(n-2)+" \\\\ n &= "+(n-2)+" + 2 = "+n+" \\end{aligned} \\]\nA regular polygon has as many lines of symmetry as it has sides, so the shape has <b>"+n+" lines of symmetry</b>.",
    {mode:"from-sum", S:S, n:n});
}, ["First work out how many sides the polygon has, then connect that to symmetry.", "Start by finding the exterior angle at one vertex: it is 180 minus the interior angle."]);

E("u7-poly-challenge", 7, ["3.12", "3.15"], 3, "gen", function(){
  var INTN=[5,6,8,9,10,12,15,18,20,24], mode=ri(0,6), q;
  if(mode===0){
    var n=ri(5,30), S=180*(n-2);
    var _boq0=balOpts(
      {t:S+"°", fb:"Yes: \\(S = 180(n-2) = 180 \\times "+(n-2)+" = "+S+"\\)."}, 
      u7mkD(S, [
        {v:180*n, fb:"That forgets the minus 2 in S = 180(n - 2)."},
        {v:180*(n-1), fb:"That subtracts 1 from the side count. The formula subtracts 2."},
        {v:180*(n-2)/n, fb:"That is each interior angle, not the sum of all of them."},
        {v:360, fb:"That is the total of the exterior angles. The interior sum comes from S = 180(n - 2)."},
        {v:S+180, fb:"That is one 180 too many. Check the multiplication 180 times "+(n-2)+"."}
      ], "°", true)); q=mcq("A regular polygon has \\("+n+"\\) sides. What is the sum of its interior angles?", _boq0[0], _boq0[1],
      "Use \\(S = 180(n-2)\\).\n\\[ \\begin{aligned} S &= 180("+n+"-2) \\\\ &= 180 \\times "+(n-2)+" \\\\ &= "+S+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+S+"°</b>.",
      {mode:"sum", n:n});
    q.figure=u7polySVG(u7regPts(n), {aria:"Regular polygon with "+n+" sides"});
    return q;
  }
  if(mode===1){
    var n1=pick(INTN), M=180*(n1-2)/n1, E=360/n1, S1=180*(n1-2);
    var _boq1=balOpts(
      {t:M+"°", fb:"Yes: the sum of "+S1+"° shared among "+n1+" equal angles gives "+M+"°."}, 
      u7mkD(M, [
        {v:S1, fb:"That is the sum of all the angles. Divide by the number of angles for each one."},
        {v:E, fb:"That is each exterior angle. Each interior angle is 180 minus that, or the sum divided by the side count."},
        {v:180*(n1-1)/n1, fb:"That uses n - 1 in the sum formula. The sum uses n - 2."},
        {v:M+9, fb:"That is close but off. Compute the sum first, then divide by "+n1+"."},
        {v:M-9, fb:"That is close but off. Compute the sum first, then divide by "+n1+"."}
      ], "°", true)); q=mcq("A regular polygon has \\("+n1+"\\) sides. What is the measure of each interior angle?", _boq1[0], _boq1[1],
      "Use \\(M = \\frac{180(n-2)}{n}\\).\n\\[ \\begin{aligned} M &= \\frac{180("+n1+"-2)}{"+n1+"} \\\\ &= \\frac{"+S1+"}{"+n1+"} \\\\ &= "+M+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+M+"°</b>.",
      {mode:"each", n:n1});
    q.figure=u7polySVG(u7regPts(n1), {aria:"Regular polygon with "+n1+" sides"});
    return q;
  }
  if(mode===2){
    var n2=pick([5,6,8,9,10,12,15,18,20,24]), E2=360/n2, M2=180-E2;
    var _boq2=balOpts(
      {t:E2+"°", fb:"Yes: the exterior angles total 360°, shared equally gives "+E2+"°."}, 
      u7mkD(E2, [
        {v:M2, fb:"That is each interior angle. The exterior angles total 360°, not the interior sum."},
        {v:180*(n2-2), fb:"That is the sum of the interior angles. Exterior angles have a total of 360°."},
        {v:180*(n2-2)/n2, fb:"That is each interior angle. Divide 360 by the side count for each exterior angle."},
        {v:E2+6, fb:"That is close but off. The exterior angles total exactly 360°, shared equally."},
        {v:E2-6, fb:"That is close but off. The exterior angles total exactly 360°, shared equally."}
      ], "°", true)); q=mcq("A regular polygon has \\("+n2+"\\) sides. What is the measure of each exterior angle?", _boq2[0], _boq2[1],
      "The exterior angles of a polygon add to \\(360^\\circ\\), and in a regular polygon they are equal.\n\\[ \\begin{aligned} \\text{each exterior angle} &= \\frac{360^\\circ}{"+n2+"} \\\\ &= "+E2+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+E2+"°</b>.",
      {mode:"exterior", n:n2});
    q.figure=u7polySVG(u7regPts(n2), {aria:"Regular polygon with "+n2+" sides"});
    return q;
  }
  if(mode===3){
    var n3=pick(INTN), M3=180*(n3-2)/n3, E3=360/n3;
    var _bo0=balOpts({t:String(n3), fb:"Yes: each exterior angle is "+E3+"°, and 360 divided by "+E3+" is "+n3+"."}, u7mkD(n3, [
        {v:E3, fb:"That is the exterior angle measure, not a count of sides. Divide 360 by it."},
        {v:n3+2, fb:"That is 2 too many. Divide 360 by the exterior angle of "+E3+"°."},
        {v:n3-2, fb:"That is 2 too few. Divide 360 by the exterior angle of "+E3+"°."},
        {v:n3+1, fb:"That is 1 too many. Divide 360 by the exterior angle of "+E3+"°."},
        {v:n3-1, fb:"That is 1 too few. Divide 360 by the exterior angle of "+E3+"°."}
      ], "", true)); return mcq("Each interior angle of a regular polygon measures \\("+M3+"^\\circ\\). How many sides does the polygon have?", _bo0[0], _bo0[1],
      "Find the exterior angle first, then use the exterior total of \\(360^\\circ\\).\n\\[ \\begin{aligned} \\text{exterior angle} &= 180^\\circ - "+M3+"^\\circ = "+E3+"^\\circ \\\\ n &= \\frac{360}{"+E3+"} = "+n3+" \\end{aligned} \\]\nThe answer is <b>"+n3+" sides</b>.",
      {mode:"sides-from-angle", n:n3});
  }
  if(mode===4){
    var n4=ri(5,30), S4=180*(n4-2);
    var _bo1=balOpts({t:String(n4), fb:"Yes: "+S4+" divided by 180 is "+(n4-2)+", and adding 2 gives "+n4+"."}, u7mkD(n4, [
        {v:S4/180, fb:"That is n - 2, straight from the division. Add 2 to finish."},
        {v:n4+2, fb:"That is 2 too many. Divide the sum by 180 first, then add 2."},
        {v:n4-2, fb:"That subtracts where the formula needs adding. Dividing by 180 gives n - 2."},
        {v:n4+1, fb:"That is 1 too many. Divide the sum by 180 first, then add 2."},
        {v:n4-1, fb:"That is 1 too few. Divide the sum by 180 first, then add 2."}
      ], "", true)); return mcq("The interior angles of a regular polygon add to \\("+S4+"^\\circ\\). How many sides does the polygon have?", _bo1[0], _bo1[1],
      "Work backwards from \\(S = 180(n-2)\\).\n\\[ \\begin{aligned} n-2 &= \\frac{"+S4+"}{180} = "+(n4-2)+" \\\\ n &= "+(n4-2)+" + 2 = "+n4+" \\end{aligned} \\]\nThe answer is <b>"+n4+" sides</b>.",
      {mode:"sides-from-sum", n:n4});
  }
  if(mode===6){
    var n6=pick(INTN), M6=180*(n6-2)/n6, E6=360/n6;
    var _bo2=balOpts({t:E6+"°", fb:"Yes: interior and exterior angles at a vertex add to 180°, and 180 - "+M6+" = "+E6+"."}, u7mkD(E6, [
        {v:M6, fb:"That copies the interior angle. The exterior angle is its supplement on a straight line."},
        {v:180*(n6-2), fb:"That is the sum of the interior angles. Each exterior angle is 180 minus the interior angle."},
        {v:E6+6, fb:"That is close but off. Subtract the interior angle from 180 to get the exterior angle."},
        {v:E6-6, fb:"That is close but off. Subtract the interior angle from 180 to get the exterior angle."},
        {v:90, fb:"That is a right angle. The exterior angle here is the supplement of "+M6+"°."}
      ], "°", true)); return mcq("Each interior angle of a regular polygon measures \\("+M6+"^\\circ\\). What is the measure of each exterior angle?", _bo2[0], _bo2[1],
      "At each vertex, the interior and exterior angles sit on a straight line.\n\\[ \\begin{aligned} \\text{exterior angle} &= 180^\\circ - "+M6+"^\\circ \\\\ &= "+E6+"^\\circ \\end{aligned} \\]\nThe answer is <b>"+E6+"°</b>.",
      {mode:"exterior-from-interior", n:n6});
  }
  var n5=ri(5,20);
  var _boq3=balOpts(
    {t:String(n5), fb:"Yes: a regular polygon has one line of symmetry for each side, so "+n5+" sides give "+n5+" lines."}, 
    u7mkD(n5, [
      {v:n5-1, fb:"That is 1 too few. Count one line through each vertex and one through each side midpoint pattern: the total equals the number of sides."},
      {v:n5+1, fb:"That is 1 too many. The number of lines of symmetry of a regular polygon equals its number of sides."},
      {v:2*n5, fb:"That doubles the count. Through each vertex there is one line, and the total matches the side count."},
      {v:n5-2, fb:"That is 2 too few. The number of lines of symmetry of a regular polygon equals its number of sides."},
      {v:n5+2, fb:"That is 2 too many. The number of lines of symmetry of a regular polygon equals its number of sides."}
    ], "", true)); q=mcq("How many lines of symmetry does a regular polygon with \\("+n5+"\\) sides have?", _boq3[0], _boq3[1],
    "A regular polygon has as many lines of symmetry as it has sides: one through each vertex and the midpoint of the opposite side, or between opposite vertices and sides. With \\("+n5+"\\) sides, the count is <b>"+n5+" lines of symmetry</b>.",
    {mode:"symmetry", n:n5});
  q.figure=u7polySVG(u7regPts(n5), {aria:"Regular polygon with "+n5+" sides"});
  return q;
}, ["Choose the polygon formula that matches what is given: a side count, an angle, or an angle sum.", "Start by deciding whether to work forwards from the side count or backwards from an angle or a sum."]);

E("u7-cr-third-side-max", 7, ["3.14"], 3, "gen", function(){
  var a=ri(4,20), b=a+ri(1,10), s=a+b;
  var item=pick(["triangular shelf bracket","triangular brace for a deck frame","triangular tent frame section","triangular kite spar section"]);
  return numq("Two sides of a "+item+" measure \\("+a+"\\) cm and \\("+b+"\\) cm. The third side is a whole number of centimetres. What is the greatest possible length, in centimetres, of the third side? Show your work.",
    s-1, 0.5,
    "By the triangle inequality, the third side must be shorter than the sum of the other two sides.\n\\[ \\begin{aligned} \\text{third side} &< "+a+" + "+b+" \\\\ &= "+s+" \\text{ cm} \\end{aligned} \\]\nThe greatest whole number below \\("+s+"\\) is \\("+(s-1)+"\\) cm. It also passes the lower check, since \\("+(s-1)+" > "+b+" - "+a+" = "+(b-a)+"\\). The answer is <b>"+(s-1)+" cm</b>.",
    {a:a, b:b});
}, ["Use the triangle inequality: any side of a triangle is shorter than the other two sides added together.", "Start by adding the two given sides; the third side must stay below that total."]);

E("u7-cr-tri-perimeter", 7, ["3.14"], 3, "gen", function(){
  var s1=ri(6,12), s2=ri(6,12);
  var lo=Math.abs(s1-s2)+2, hi=s1+s2-2;
  var t=ri(lo,hi), P=s1+s2+t;
  var longest=Math.max(s1,s2,t);
  return numq("A triangular garden plot has two sides measuring \\("+s1+"\\) m and \\("+s2+"\\) m, and its perimeter is \\("+P+"\\) m. Find the length, in metres, of the third side. Show your work, including a check that the three lengths can form a triangle.",
    t, 0.5,
    "The perimeter is the total of the three sides.\n\\[ \\begin{aligned} \\text{third side} &= "+P+" - "+s1+" - "+s2+" \\\\ &= "+t+" \\text{ m} \\end{aligned} \\]\nTriangle inequality check: \\("+s1+" + "+s2+" = "+(s1+s2)+" > "+t+"\\), and the two sums using the third side are also larger than the remaining side, so the lengths do form a triangle. The longest side, \\("+longest+"\\) m, sits opposite the largest angle. The answer is <b>"+t+" m</b>.",
    {s1:s1, s2:s2, t:t});
}, ["The perimeter is the sum of the three sides, and a valid triangle must pass the triangle inequality.", "Start by subtracting the two known sides from the perimeter, then check the result against the sum of the other two sides."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 9 (properties of figures: angle facts and transversals). Borrowed verbatim from Mathematics 1202 Unit 5 (u5-comp-supp-basic, u5-pair-names, u5-adjacent-describe, u5-trans-relationships, u5-trans-find, u5-context-transversal, u5-trans-algebra); feeder helper copies ride in bank-helpers.js. ===== */
E("u7-pk-comp-supp", 7, ["3.10"], 1, "gen", function(){
  var comp=ri(0,1)===0; var a=comp?ri(12,78):ri(25,155);
  var ans=comp?90-a:180-a;
  var ctx=pick(["the corner of a square tile is split by a diagonal strip","a straight shelf edge is split by a bracket","the corner of a folded card is split by a crease","a straight road edge is split by a driveway"]);
  var pool=[comp?180-a:90-a, a, ans+15, ans-12, 90, 180];
  var q=mcq("In "+ctx+", one angle measures \\("+a+"^\\circ\\). It forms a "+(comp?"complementary pair (the two angles fill a right angle)":"supplementary pair (the two angles fill a straight line)")+" with a second angle. What is the measure of the second angle?",
    {t:ans+"°", fb:"Yes: "+(comp?"complementary angles add to 90°, and 90 - "+a+" = "+ans:"supplementary angles add to 180°, and 180 - "+a+" = "+ans)+"."},
    u5DegOpts(ans,pool),
    (comp?"Complementary angles add to \\(90^\\circ\\).":"Supplementary angles add to \\(180^\\circ\\).")+"\\[ \\begin{aligned} \\text{second angle} &= "+(comp?90:180)+"^\\circ - "+a+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a,comp:comp});
  q.figure=u5PairSVG(a, comp);
  return q;
}, ["Recall the total that this kind of angle pair must add to.", "Subtract the given angle from that total."]);

E("u7-pk-pair-names", 7, ["3.10"], 1, "gen", function(){
  var types=[
    {name:"Corresponding angles", desc:"in matching corner positions at each of the two lines, on the same side of the transversal", fb:"Matching corners at the two crossings are corresponding angles."},
    {name:"Vertically opposite angles", desc:"directly across from each other at a single crossing, formed by two crossing lines", fb:"Angles across from each other at one crossing are vertically opposite."},
    {name:"Alternate interior angles", desc:"between the two lines, on opposite sides of the transversal", fb:"Inside the strip between the lines and on opposite sides of the transversal: alternate interior."},
    {name:"Alternate exterior angles", desc:"outside the two lines, on opposite sides of the transversal", fb:"Outside the strip and on opposite sides of the transversal: alternate exterior."},
    {name:"Interior angles on the same side of the transversal", desc:"between the two lines, on the same side of the transversal", fb:"Inside the strip and on the same side of the transversal."},
    {name:"Exterior angles on the same side of the transversal", desc:"outside the two lines, on the same side of the transversal", fb:"Outside the strip and on the same side of the transversal."}];
  var t=pick(types);
  var ctx=pick(["Two parallel shelf edges are crossed by a diagonal brace.","Two parallel road edges are crossed by a cross street.","Two parallel fence rails are crossed by a slanted post.","Two parallel sidelines are crossed by a centre line.","Two parallel counter edges are crossed by a support bar.","Two parallel window blind slats are crossed by a lift cord.","Two parallel deck boards are crossed by a diagonal brace.","Two parallel ski tracks are crossed by a fallen pole.","Two parallel garden rows are crossed by an irrigation line.","Two parallel train rails are crossed by a maintenance walkway.","Two parallel ladder rails are crossed by a diagonal strap.","Two parallel table edges are crossed by a table runner seam."]);
  var others=types.filter(function(o){return o.name!==t.name;});
  var dis=[]; var used={}; var guard=0;
  while(dis.length<3&&guard<20){guard++; var o=pick(others); if(!used[o.name]){used[o.name]=1; dis.push({t:o.name, fb:"That name belongs to a different position: "+o.desc+"."});}}
  return mcq(ctx+" A pair of angles sits "+t.desc+". What is the name of this angle pair?",
    {t:t.name, fb:"Yes: "+t.fb}, dis,
    "Use the position: where the angles sit relative to the two lines and to the transversal decides the name. This pair is <b>"+t.name.toLowerCase()+"</b>.", {pair:t.name});
}, ["First decide whether the angles are between the two lines, outside them, or at one crossing.", "Then decide whether they are on the same side or opposite sides of the transversal."]);

E("u7-pk-adjacent-describe", 7, ["3.11"], 2, "gen", function(){
  var x=pick([34,41,47,53,58,64,72,79]), y=pick([37,44,52,63,68,77,83,91]);
  if(x+y===90||x+y===180) y=y+7;
  var s=x+y;
  var q=mcq("The diagram shows two adjacent angles, A and B, that share a side at one vertex. Angle A measures \\("+x+"^\\circ\\) and angle B measures \\("+y+"^\\circ\\). Which statement describes this pair?",
    {t:"They are adjacent, and their sum of "+s+"° makes them neither a complementary pair nor a supplementary pair", fb:"Yes: "+x+" + "+y+" = "+s+", which is neither 90 nor 180."},
    [{t:"They are a complementary pair, because adjacent angles that share a side always add to exactly 90°", fb:"Adjacent angles can add to any total: complementary pairs are the ones that add to exactly 90, and this sum is "+s+"."},
     {t:"They are a supplementary pair, because adjacent angles that share a side always add to exactly 180° in total", fb:"Supplementary pairs add to exactly 180: this sum is "+s+", not 180."},
     {t:"They are vertically opposite angles, because they share a vertex and sit across from each other", fb:"Vertically opposite angles sit across a crossing from each other and do not share a side: this pair shares a side."}],
    "Add the measures: \\("+x+"^\\circ + "+y+"^\\circ = "+s+"^\\circ\\). The sum is neither \\(90^\\circ\\) nor \\(180^\\circ\\), and the angles share a side. The answer is <b>adjacent, and neither complementary nor supplementary</b>.", {x:x,y:y});
  q.figure=u5AdjSVG(x,y); return q;
}, ["Add the two measures and compare the sum with 90 and 180.", "Sharing a side at one vertex is what makes the pair adjacent."]);

E("u7-pk-trans-relationships", 7, ["3.12"], 2, "gen", function(){
  var mode=pick(["alt","corr","vert","same","nonpar"]);
  var a=pick([36,42,49,53,58,64,67,71,74,82,96,103,109,118,122,126,133,139,147,152]);
  var scene=pick(["on a shelf diagram","on a street map","on a fence plan","on a rink diagram"]);
  var sceneTxt=" ("+scene+")";
  var ans, sol, prompt, corrFb;
  if(mode==="alt"){ ans=a+"°"; prompt="Two parallel lines are cut by a transversal. One angle measures \\("+a+"^\\circ\\). What is the measure of the alternate interior angle on the other line?"; corrFb="Yes: alternate interior angles formed by parallel lines are equal."; sol="Alternate interior angles formed by parallel lines are equal, so the angle is also \\("+a+"^\\circ\\). The answer is <b>"+a+"°</b>."; }
  else if(mode==="corr"){ ans=a+"°"; prompt="Two parallel lines are cut by a transversal. One angle measures \\("+a+"^\\circ\\). What is the measure of the corresponding angle on the other line?"; corrFb="Yes: corresponding angles formed by parallel lines are equal."; sol="Corresponding angles formed by parallel lines are equal, so the angle is also \\("+a+"^\\circ\\). The answer is <b>"+a+"°</b>."; }
  else if(mode==="vert"){ ans=a+"°"; prompt="Two lines cross and form an angle of \\("+a+"^\\circ\\). What is the measure of the angle directly across the crossing from it?"; corrFb="Yes: vertically opposite angles are equal."; sol="Vertically opposite angles are equal, so the angle across the crossing is also \\("+a+"^\\circ\\). The answer is <b>"+a+"°</b>."; }
  else if(mode==="same"){ ans=(180-a)+"°"; prompt="Two parallel lines are cut by a transversal. One interior angle measures \\("+a+"^\\circ\\). What is the measure of the interior angle on the same side of the transversal at the other line?"; corrFb="Yes: interior angles on the same side of a transversal add to 180°, and 180 - "+a+" = "+(180-a)+"."; sol="Interior angles on the same side of the transversal are supplementary. \\[ 180^\\circ - "+a+"^\\circ = "+(180-a)+"^\\circ \\] The answer is <b>"+(180-a)+"°</b>."; }
  else { ans="It cannot be found from the given angle alone"; prompt="Two lines that lean toward each other (they are not parallel) are cut by a transversal. One angle measures \\("+a+"^\\circ\\). A student claims the corresponding angle must also measure \\("+a+"^\\circ\\) because the lines look straight. What is correct?"; corrFb="Yes: the equal angle relationships need parallel lines. When the lines lean toward each other, the corresponding angle takes a different measure."; sol="The angle relationships for a transversal hold only when the two lines are parallel. These lines are not parallel, so the corresponding angle is not forced to equal \\("+a+"^\\circ\\). The answer is <b>it cannot be found from the given angle alone</b>."; }
  prompt = prompt.slice(0,-1)+sceneTxt+"?";
  var numAns = (mode==="same") ? 180-a : a;
  var dis;
  if(mode==="nonpar"){
    dis=[{t:a+"°", fb:"That claim assumes the lines are parallel: here they lean toward each other, so the relationship does not apply."},
         {t:(180-a)+"°", fb:"Supplementary pairs come from a straight line or same side interior angles on parallel lines: neither is given here."},
         {t:"90°", fb:"Nothing in this diagram makes a right angle."}];
  } else {
    dis=u5DegOpts(numAns,[180-numAns, a===numAns? a+18:a, 90, numAns+22]);
    if(mode==="same") dis=u5DegOpts(numAns,[a, 90, numAns+20]);
  }
  var q=mcq(prompt, {t:ans, fb:corrFb}, dis, sol, {mode:mode,a:a});
  if(mode==="alt") q.figure=transversalSVG("TR", a+"\u00B0", "BL", "?");
  else if(mode==="vert") q.figure=u5VertSVG(a);
  else if(mode==="same") q.figure=transversalSVG("TR", a+"\u00B0", "BR", "?");
  return q;
}, ["Name the angle pair first: its position decides whether the measures are equal or add to 180.", "Check that the two lines are parallel before using any equal angle relationship."]);

E("u7-pk-trans-find", 7, ["3.12"], 2, "gen", function(){
  var pairs=[
    {g:"TR",k:"BL",rel:"eq",name:"alternate interior angles"},
    {g:"TL",k:"BR",rel:"eq",name:"alternate interior angles"},
    {g:"TR",k:"BR",rel:"supp",name:"interior angles on the same side of the transversal"},
    {g:"TL",k:"BL",rel:"supp",name:"interior angles on the same side of the transversal"}];
  var p=pick(pairs); var a=pick([38,47,55,63,72,84,96,108,117,129,138,146]);
  var ans=p.rel==="eq"?a:180-a;
  var ctx=pick(["two parallel window blinds slats cut by a cord","two parallel deck boards cut by a diagonal brace","two parallel ski tracks cut by a fallen pole","two parallel shelf edges cut by a support"]);
  var q=mcq("The diagram shows "+ctx+". The marked angle measures \\("+a+"^\\circ\\). What is the measure of the angle marked with a question mark?",
    {t:ans+"°", fb:"Yes: the two marked angles are "+p.name+", so they are "+(p.rel==="eq"?"equal":"supplementary, and 180 - "+a+" = "+ans)+"."},
    u5DegOpts(ans,[180-ans, a===ans?a+16:a, 90]),
    "The marked pair are "+p.name+". "+(p.rel==="eq"?"Those angles are equal when the lines are parallel.":"Those angles add to \\(180^\\circ\\) when the lines are parallel: \\(180^\\circ - "+a+"^\\circ = "+ans+"^\\circ\\).")+" The answer is <b>"+ans+"°</b>.", {a:a,rel:p.rel});
  q.figure=transversalSVG(p.g,a+"°",p.k,"?"); return q;
}, ["Name the relationship between the two marked angles.", "Equal pairs keep the measure; same side interior pairs add to 180."]);

E("u7-pk-context-transversal", 7, ["3.16"], 2, "gen", function(){
  var scenes=[
    {s:"Two parallel streets are crossed by one straight side street", rel:"eq", name:"corresponding angles"},
    {s:"Two parallel garden paths are crossed by a straight drainage channel", rel:"supp", name:"interior angles on the same side of the transversal"},
    {s:"Two parallel rink boards are crossed by a straight centre line painted diagonally", rel:"eq", name:"alternate interior angles"},
    {s:"Two parallel clotheslines are crossed by a straight support rope", rel:"supp", name:"interior angles on the same side of the transversal"}];
  var sc=pick(scenes); var a=pick([37,43,48,52,59,64,71,76,83,89,97,104,112,119,124,131,138,143,148,154]);
  var ans=sc.rel==="eq"?a:180-a;
  var q=mcq(sc.s+". One of the angles formed measures \\("+a+"^\\circ\\). A second marked angle is related to it as "+sc.name.toLowerCase()+". What is the measure of the second marked angle?",
    {t:ans+"°", fb:"Yes: "+sc.name+" formed by parallel lines are "+(sc.rel==="eq"?"equal":"supplementary, and 180 - "+a+" = "+ans)+"."},
    u5DegOpts(ans,[180-ans, a===ans?a+14:a, 90]),
    "The two lines are parallel, so "+sc.name.toLowerCase()+" apply. "+(sc.rel==="eq"?"Those angles are equal.":"Those angles add to \\(180^\\circ\\): \\(180^\\circ - "+a+"^\\circ = "+ans+"^\\circ\\).")+" The answer is <b>"+ans+"°</b>.", {a:a,rel:sc.rel});
  q.figure=transversalSVG("TR",a+"°", sc.rel==="eq"?"BL":"BR", "?"); return q;
}, ["Confirm the two lines in the story are parallel, then name the angle pair.", "Equal pairs keep the measure; same side interior pairs add to 180."]);

E("u7-pk-trans-algebra", 7, ["3.12"], 3, "gen", function(){
  var supp=ri(0,1)===0;
  var x0=pick([9,11,12,14,15,16,18,20]), aC=pick([3,4,5]);
  var A=aC*x0; if(A<30||A>150){A=60;x0=15;aC=4;}
  var gPos=pick(["TR","TL"]), kPos, pairName;
  if(supp){ kPos=(gPos==="TR")?"BR":"BL"; pairName="interior angles on the same side of the transversal"; }
  else { kPos=(gPos==="TR")?"BL":"BR"; pairName="alternate interior angles"; }
  var B=supp?180-A:A;
  var bC=1, c=B-x0; if(c<=0){c=B-2*x0;bC=2;}
  var givenExpr="("+aC+"x)°", askedExpr="("+bC+"x + "+c+")°";
  var pool=[A, x0, B+20, B-18, 90];
  var q=mcq("Two parallel lines are cut by a transversal. The marked angles are "+pairName+". One angle measures \\("+givenExpr+"\\) and the other measures \\("+askedExpr+"\\). What is the measure of the angle marked \\("+askedExpr+"\\)?",
    {t:B+"°", fb:"Yes: solving gives x = "+x0+", and substituting back gives "+B+"°."},
    u5DegOpts(B,pool),
    (supp?("Same side interior angles add to \\(180^\\circ\\): \\[ \\begin{aligned} "+aC+"x + "+bC+"x + "+c+" &= 180 \\\\ "+(aC+bC)+"x &= "+(180-c)+" \\\\ x &= "+x0+" \\end{aligned} \\]"):("Alternate interior angles are equal: \\[ \\begin{aligned} "+aC+"x &= "+bC+"x + "+c+" \\\\ "+(aC-bC)+"x &= "+c+" \\\\ x &= "+x0+" \\end{aligned} \\]"))+" Substituting back, the asked angle is \\("+bC+"("+x0+") + "+c+" = "+B+"^\\circ\\). The answer is <b>"+B+"°</b>.", {x0:x0,B:B,supp:supp});
  q.figure=transversalSVG(gPos,givenExpr,kPos,askedExpr); return q;
}, ["Name the pair from the diagram: the name tells you whether to set the expressions equal or add them to 180.", "Solve for x first, then substitute back into the asked expression."]);

/* PK tranche metadata pass for Unit 7. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U7_FOR=["3.10","3.11","3.12","3.13","3.14","3.15","3.16"];
var PKT_U7={
 "u7-pk-comp-supp":{src:"math-1202:3.36",group:"angle-measure"},
 "u7-pk-pair-names":{src:"math-1202:3.38",group:"transversal-pairs"},
 "u7-pk-adjacent-describe":{src:"math-1202:3.36",group:"angle-measure"},
 "u7-pk-trans-relationships":{src:"math-1202:3.39",group:"transversal-pairs"},
 "u7-pk-trans-find":{src:"math-1202:3.40",group:"transversal-use"},
 "u7-pk-context-transversal":{src:"math-1202:3.43",group:"transversal-use"},
 "u7-pk-trans-algebra":{src:"math-1202:3.40",group:"transversal-use"}
};
BANK.forEach(function(e){var t=PKT_U7[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U7_FOR.slice();e.pkGroup=t.group;}});
