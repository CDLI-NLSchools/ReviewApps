// Math 1202 Unit 7 Trigonometry question bank
// Figures (added Nov 2026): similar triangle pairs, shadow and
// elevation or depression scenes and plain right triangles draw
// labelled figures from each question's own values. The situation
// identification entry (u7-indirect-measurement) and the
// reasonableness entry (u7-reasonable-or-not) stay figureless:
// one asks which situation fits and the other judges reported
// values, and several of its modes give no drawable setup.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 3767 to 4284).
// CRMARKS: u7-cr-similar-side=2
// CRMARKS: u7-cr-tangent-height=2
// CRMARKS: u7-cr-find-angle=2
// CRMARKS: u7-cr-similar-perimeter-draw=3
// CRMARKS: u7-cr-hypotenuse-rearrange=3
// CRMARKS: u7-cr-shadow-problem=3
// CRMARKS: u7-cr-building-eye-level=2
// CRMARKS: u7-cr-depression-distance=3
/* ===== Unit 7 ===== */
// Unit 7: Trigonometry (Mathematics 1202)
// Similarity first, then tangent, sine and cosine, then unknown angles.
function u7Ang(){ return pick([26,28,30,32,35,38,40,42,48,50,55,58,60,62,65]); }
function u7Rad(d){ return d*Math.PI/180; }
function u7Triple(){ var m=ri(2,6); var n=ri(1,m-1); var a=m*m-n*n; var b=2*m*n; var c=m*m+n*n; if(Math.random()<0.5){ var t=a; a=b; b=t; } return [a,b,c]; }
function u7Txt(x,y,str,size,anchor){ return '<text x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" font-size="'+(size||13)+'" fill="'+FIG_INK+'" stroke="#ffffff" stroke-width="3.5" style="paint-order:stroke" stroke-linejoin="round" text-anchor="'+(anchor||"middle")+'" dominant-baseline="central">'+str+'</text>'; }
function u7FigTri(oL,aL,hL,angL){
  var s='<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle diagram">';
  s+='<polygon points="55,50 55,165 245,165" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 67 165 L 67 153 L 55 153" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<path d="M 219 165 A 26 26 0 0 1 228 154" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+=u7Txt(24,108,oL,13); s+=u7Txt(150,185,aL,13); s+=u7Txt(163,92,hL,13); s+=u7Txt(200,150,angL,13);
  return s+'</svg>';
}
function u7FigPair(w1,h1,t1,w2,h2,t2){
  var u1=88/Math.max(w1,h1), u2=88/Math.max(w2,h2);
  var s='<svg viewBox="0 0 300 180" width="300" height="180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two rectangles diagram">';
  s+='<rect x="30" y="'+fmt(135-h1*u1,1)+'" width="'+fmt(w1*u1,1)+'" height="'+fmt(h1*u1,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="175" y="'+fmt(135-h2*u2,1)+'" width="'+fmt(w2*u2,1)+'" height="'+fmt(h2*u2,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+=u7Txt(30+w1*u1/2,155,t1,12); s+=u7Txt(175+w2*u2/2,155,t2,12);
  return s+'</svg>';
}

function u7FigTriPair(t1,t2){
  function draw(t,x0){
    var s=Math.min(112/Math.max(t.a,1),118/Math.max(t.o,1));
    var bx=x0, by=172, tx=x0, ty=by-t.o*s, rx=x0+t.a*s;
    var out='<polygon points="'+fmt(tx,1)+','+fmt(ty,1)+' '+fmt(bx,1)+','+by+' '+fmt(rx,1)+','+by+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+='<path d="M '+(bx+13)+' '+by+' L '+(bx+13)+' '+(by-13)+' L '+bx+' '+(by-13)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    if(t.oL) out+=u7Txt(bx-15,(by+ty)/2,t.oL,12);
    if(t.aL) out+=u7Txt((bx+rx)/2,by+16,t.aL,12);
    if(t.hL) out+=u7Txt((tx+rx)/2+17,(ty+by)/2-4,t.hL,12);
    if(t.angL) out+=u7Txt(rx-24,by-12,t.angL,12);
    if(t.tL) out+=u7Txt(tx+17,ty+11,t.tL,12);
    return out;
  }
  var s='<svg viewBox="0 0 320 205" width="320" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two right triangles">';
  s+=draw(t1,36); s+=draw(t2,186);
  return s+'</svg>';
}

/* ---------------- Level 1 ---------------- */

E("u7-similar-check", 7, ["3.60","3.63"], 1, "gen", function(){
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

E("u7-shared-angle-similar", 7, ["3.61"], 1, "var", varset([
  function(){ var q=mcq("Two right triangles both have an acute angle of \\(35^\\circ\\). Why must the two triangles be similar?",
    {t:"Each has angles of 90, 35 and 55 degrees, so their angles match and the angle-angle rule applies.", fb:"Correct: the third angle is 180 - 90 - 35 = 55 degrees in both."},
    [ {t:"Their hypotenuses must be exactly the same length in both triangles, or they cannot match.", fb:"Similar triangles can be different sizes: the hypotenuse does not need to match."},
      {t:"All right triangles are automatically similar to each other, no matter what their acute angles measure.", fb:"Two right triangles with different acute angles, such as 20 degrees and 50 degrees, are not similar."},
      {t:"Their corresponding sides must all be equal in length, side for side, top to bottom.", fb:"Equal sides would make them congruent, not just similar. Similarity needs equal angles and proportional sides."} ],
    "Each triangle has a \\(90^\\circ\\) angle and the shared \\(35^\\circ\\) angle, so the third angle is \\(180 - 90 - 35 = 55^\\circ\\) in both. Matching angles mean the triangles are <b>similar</b>.", {v:1}); q.figure=u7FigTriPair({o:35,a:50,oL:"",aL:"",hL:"",angL:"35\u00B0",tL:"?"},{o:52,a:75,oL:"",aL:"",hL:"",angL:"35\u00B0",tL:"?"}); return q; },
  function(){ var q=mcq("Triangle P has angles \\(90^\\circ\\) and \\(40^\\circ\\). Triangle Q is a right triangle with an acute angle of \\(40^\\circ\\). Why are P and Q similar?",
    {t:"They share a right angle and a 40 degree angle, so all their angles match.", fb:"Correct: two matching angles are enough to show similarity."},
    [ {t:"They are similar because both are right triangles, and that is the only condition.", fb:"Being right triangles is not enough on its own: the shared 40 degree angle is also needed."},
      {t:"They are similar because their areas must be equal in both triangles.", fb:"Similar triangles can have very different areas when one is an enlargement of the other."},
      {t:"They are similar because each of them has exactly three sides and three angles.", fb:"Every triangle has three sides: similarity is about matching angles and proportional sides."} ],
    "Both triangles have a \\(90^\\circ\\) angle and a \\(40^\\circ\\) angle, so the third angles also match. The triangles are <b>similar</b> by the angle-angle rule.", {v:2}); q.figure=u7FigTriPair({o:42,a:50,oL:"",aL:"",hL:"",angL:"40\u00B0",tL:"?"},{o:63,a:75,oL:"",aL:"",hL:"",angL:"40\u00B0",tL:"?"}); return q; },
  function(){ var q=mcq("A small triangular ramp and a large triangular ramp are both right triangles, and each rises at an angle of \\(28^\\circ\\) to the ground. Which statement is true?",
    {t:"The ramps are similar because they share a right angle and the 28 degree angle.", fb:"Correct: shared right angle plus shared acute angle means all angles match."},
    [ {t:"The ramps cannot be similar because one ramp is much bigger than the other one.", fb:"An enlargement is similar to the original: size alone never rules out similarity."},
      {t:"The ramps are similar only if their hypotenuses are exactly equal.", fb:"Equal hypotenuses would be congruence. Similarity allows different sizes."},
      {t:"Nothing at all can be concluded, because only one angle is shared between them.", fb:"Two angles are shared: the right angle and the 28 degree angle. That is enough."} ],
    "Both ramps have angles of \\(90^\\circ\\) and \\(28^\\circ\\), so their third angles are both \\(62^\\circ\\). The ramps are <b>similar</b>.", {v:3}); q.figure=u7FigTriPair({o:27,a:50,oL:"",aL:"",hL:"",angL:"28\u00B0",tL:"?"},{o:40,a:75,oL:"",aL:"",hL:"",angL:"28\u00B0",tL:"?"}); return q; },
  function(){ return mcq("Which pair of triangles must be similar?",
    {t:"Two right triangles that share an acute angle of 52 degrees.", fb:"Correct: right angle plus shared acute angle gives matching angles in both."},
    [ {t:"Two right triangles, one at 30 degrees and one at 45 degrees.", fb:"Their acute angles differ, so their angle sets do not match."},
      {t:"A right triangle and an isosceles triangle with no right angle.", fb:"One has a right angle and the other does not, so the angles cannot all match."},
      {t:"Two triangles that happen to have exactly the same perimeter.", fb:"Equal perimeters say nothing about angles: the shapes can be very different."} ],
    "The first pair shares a \\(90^\\circ\\) angle and a \\(52^\\circ\\) angle, so all angles match and the pair <b>must be similar</b>. The other pairs have mismatched angles or no angle information.", {v:4}); },
  function(){ var q=mcq("In a right triangle, one acute angle is \\(63^\\circ\\). A second right triangle has an acute angle of \\(63^\\circ\\) as well. What is the third angle in each triangle, and what does that show?",
    {t:"27 degrees in each, so the triangles have the same three angles and are similar.", fb:"Correct: 180 - 90 - 63 = 27 degrees, and matching angles mean similar."},
    [ {t:"63 degrees in each, so the two triangles are congruent to each other in every way.", fb:"The third angle is 180 - 90 - 63 = 27 degrees, not 63, and similarity does not need equal size."},
      {t:"117 degrees in each, so the two triangles are similar to each other.", fb:"Angles in a triangle sum to 180 degrees: 90 + 63 + 117 would be far too much."},
      {t:"It cannot be found from the angles without knowing the side lengths as well.", fb:"Side lengths are not needed: the angle sum of a triangle gives the third angle directly."} ],
    "\\[ 180 - 90 - 63 = 27 \\] The third angle is \\(27^\\circ\\) in each triangle, so the angle sets match and the triangles are <b>similar</b>.", {v:5}); q.figure=u7FigTriPair({o:98,a:50,oL:"",aL:"",hL:"",angL:"63\u00B0",tL:"?"},{o:118,a:60,oL:"",aL:"",hL:"",angL:"63\u00B0",tL:"?"}); return q; }
]), ["Matching angles are the key to similarity.", "List the angles of each triangle: both have a right angle and the shared acute angle."]);

E("u7-tangent-ratio-constant", 7, ["5.1","3.61"], 1, "gen", function(){
  var o=ri(2,14), a=ri(2,14), tries=0;
  while(o===a && tries<20){ a=ri(2,14); tries++; } if(o===a) a=o+1;
  var k=pick([2,3,4]), o2=o*k, a2=a*k, hyp=Math.sqrt(o*o+a*a);
  var r=o/a;
  var prompt="Two right triangles share the acute angle A. The smaller triangle has opposite side "+o+" cm and adjacent side "+a+" cm. The larger triangle has opposite side "+o2+" cm and adjacent side "+a2+" cm. What is the ratio opposite / adjacent for angle A?";
  var sol="Smaller triangle: \\("+o+" \\div "+a+" = "+fmtF(r,2)+ "\\). Larger triangle: \\("+o2+" \\div "+a2+" = "+fmtF(r,2)+ "\\). The ratio is the same in both triangles, and this ratio is the tangent ratio: \\(\\tan A = "+FR("opposite","adjacent")+"\\). The answer is <b>"+fmtF(r,2)+"</b>.";
  var q=mcq(prompt, {t:fmtF(r,2), fb:"Correct: "+o+" / "+a+" and "+o2+" / "+a2+" both simplify to this value."},
    [ {t:fmtF(a/o,2), fb:"That is adjacent / opposite, the ratio turned upside down."},
      {t:fmtF(o/hyp,2), fb:"That is opposite / hypotenuse, which is the sine ratio, not the ratio asked for."},
      {t:fmtF(a/hyp,2), fb:"That is adjacent / hypotenuse, which is the cosine ratio, not opposite / adjacent."} ], sol, {o:o,a:a,k:k});
  q.figure=u7FigTri(o+" cm", a+" cm", "hypotenuse", "A");
  return q;
}, ["The tangent ratio compares the opposite side to the adjacent side for the marked angle.", "Work out opposite divided by adjacent for the smaller triangle first."]);

E("u7-sine-ratio-constant", 7, ["5.2"], 1, "gen", function(){
  var tr=u7Triple(), o=tr[0], a=tr[1], h=tr[2], k=pick([2,3]), o2=o*k, h2=h*k, r=o/h;
  var prompt="Two right triangles share the acute angle A. The smaller triangle has opposite side "+o+" cm and hypotenuse "+h+" cm. The larger triangle has opposite side "+o2+" cm and hypotenuse "+h2+" cm. What is the ratio opposite / hypotenuse for angle A?";
  var sol="Smaller triangle: \\("+o+" \\div "+h+" = "+fmtF(r,2)+ "\\). Larger triangle: \\("+o2+" \\div "+h2+" = "+fmtF(r,2)+ "\\). The ratio is the same in both triangles, and this ratio is the sine ratio: \\(\\sin A = "+FR("opposite","hypotenuse")+"\\). The answer is <b>"+fmtF(r,2)+"</b>.";
  var q=mcq(prompt, {t:fmtF(r,2), fb:"Correct: "+o+" / "+h+" and "+o2+" / "+h2+" both give this value."},
    [ {t:fmtF(h/o,2), fb:"That is hypotenuse / opposite, the ratio turned upside down. A sine value cannot be greater than 1."},
      {t:fmtF(a/h,2), fb:"That is adjacent / hypotenuse, which is the cosine ratio, not opposite / hypotenuse."},
      {t:fmtF(o/a,2), fb:"That is opposite / adjacent, which is the tangent ratio, not opposite / hypotenuse."} ], sol, {o:o,h:h,k:k});
  q.figure=u7FigTriPair({o:o,a:a,oL:o+" cm",aL:"",hL:h+" cm",angL:"A"},{o:o2,a:a*k,oL:o2+" cm",aL:"",hL:h2+" cm",angL:"A"});
  return q;
}, ["The sine ratio compares the opposite side to the hypotenuse for the marked angle.", "Work out opposite divided by hypotenuse for the smaller triangle first."]);

E("u7-cosine-ratio-constant", 7, ["5.3"], 1, "gen", function(){
  var tr=u7Triple(), o=tr[0], a=tr[1], h=tr[2], k=pick([2,3]), a2=a*k, h2=h*k, r=a/h;
  var prompt="Two right triangles share the acute angle A. The smaller triangle has adjacent side "+a+" cm and hypotenuse "+h+" cm. The larger triangle has adjacent side "+a2+" cm and hypotenuse "+h2+" cm. What is the ratio adjacent / hypotenuse for angle A?";
  var sol="Smaller triangle: \\("+a+" \\div "+h+" = "+fmtF(r,2)+ "\\). Larger triangle: \\("+a2+" \\div "+h2+" = "+fmtF(r,2)+ "\\). The ratio is the same in both triangles, and this ratio is the cosine ratio: \\(\\cos A = "+FR("adjacent","hypotenuse")+"\\). The answer is <b>"+fmtF(r,2)+"</b>.";
  var q=mcq(prompt, {t:fmtF(r,2), fb:"Correct: "+a+" / "+h+" and "+a2+" / "+h2+" both give this value."},
    [ {t:fmtF(h/a,2), fb:"That is hypotenuse / adjacent, the ratio turned upside down. A cosine value cannot be greater than 1."},
      {t:fmtF(o/h,2), fb:"That is opposite / hypotenuse, which is the sine ratio, not adjacent / hypotenuse."},
      {t:fmtF(a/o,2), fb:"That is adjacent / opposite, which is not one of the three primary ratios for this pairing."} ], sol, {a:a,h:h,k:k});
  q.figure=u7FigTriPair({o:o,a:a,oL:"",aL:a+" cm",hL:h+" cm",angL:"A"},{o:o*k,a:a2,oL:"",aL:a2+" cm",hL:h2+" cm",angL:"A"});
  return q;
}, ["The cosine ratio compares the adjacent side to the hypotenuse for the marked angle.", "Work out adjacent divided by hypotenuse for the smaller triangle first."]);

E("u7-choose-ratio", 7, ["5.5","2.3"], 1, "gen", function(){
  var combos=[
    {known:"opposite", wanted:"adjacent", ratio:"tangent", def:"tangent: opposite / adjacent"},
    {known:"adjacent", wanted:"opposite", ratio:"tangent", def:"tangent: opposite / adjacent"},
    {known:"opposite", wanted:"hypotenuse", ratio:"sine", def:"sine: opposite / hypotenuse"},
    {known:"hypotenuse", wanted:"opposite", ratio:"sine", def:"sine: opposite / hypotenuse"},
    {known:"adjacent", wanted:"hypotenuse", ratio:"cosine", def:"cosine: adjacent / hypotenuse"},
    {known:"hypotenuse", wanted:"adjacent", ratio:"cosine", def:"cosine: adjacent / hypotenuse"} ];
  var c=pick(combos), ang=u7Ang(), val=ri(4,30);
  var ctx=pick(["a ladder against a wall","a roof section","a loading ramp","a guy wire on a pole","a wheelchair ramp","a stair stringer"]);
  var prompt="A right triangle models "+ctx+". The marked angle is \\("+ang+"^\\circ\\). The "+c.known+" side is known (it measures "+val+" units) and the "+c.wanted+" side is wanted. Which ratio should be used?";
  var defs={ tangent:"tangent: opposite / adjacent", sine:"sine: opposite / hypotenuse", cosine:"cosine: adjacent / hypotenuse" };
  var names=["tangent","sine","cosine"];
  var distract=names.filter(function(n){ return n!==c.ratio; }).map(function(n){ return {t:defs[n], fb:"The "+n+" ratio uses the "+(n==="tangent"?"opposite and adjacent":(n==="sine"?"opposite and hypotenuse":"adjacent and hypotenuse"))+" sides, which is not the known and wanted pair here."}; });
  var recip={ tangent:"adjacent / opposite", sine:"hypotenuse / opposite", cosine:"hypotenuse / adjacent" };
  distract.push({t:c.ratio+" flipped: "+recip[c.ratio], fb:"That is the "+c.ratio+" ratio with its two sides swapped. The ratio must pair the sides as "+defs[c.ratio].split(": ")[1]+"."});
  var sol="The known side is the "+c.known+" and the wanted side is the "+c.wanted+". The ratio that uses exactly those two sides is the <b>"+c.ratio+" ratio</b>: "+defs[c.ratio]+".";
  var q=mcq(prompt, {t:defs[c.ratio], fb:"Correct: the "+c.ratio+" ratio is the one built from the "+c.known+" and "+c.wanted+" sides."}, distract, sol, {ratio:c.ratio, ang:ang});
  var lab={ opposite:"opp", adjacent:"adj", hypotenuse:"hyp" };
  var oL=c.known==="opposite"?val:(c.wanted==="opposite"?"?":"opp"), aL=c.known==="adjacent"?val:(c.wanted==="adjacent"?"?":"adj"), hL=c.known==="hypotenuse"?val:(c.wanted==="hypotenuse"?"?":"hyp");
  q.figure=u7FigTri(oL, aL, hL, ang+" deg");
  return q;
}, ["Name the known and wanted sides relative to the marked angle first.", "Pick the ratio whose definition uses exactly those two sides."]);

/* ---------------- Level 2: multiple choice ---------------- */

E("u7-why-not-similar", 7, ["3.63","3.60"], 2, "gen", function(){
  var w=ri(3,10), h=ri(2,Math.max(2,w-1)), k=pick([2,3]), extra=ri(1,3), w2=w*k, h2=h*k+extra;
  var prompt="Rectangle A is "+w+" cm by "+h+" cm. Rectangle B is "+w2+" cm by "+h2+" cm. Why are the two rectangles not similar?";
  var sol="Widths: \\("+w2+" \\div "+w+" = "+fmt(w2/w)+"\\). Heights: \\("+h2+" \\div "+h+" = "+fmtF(h2/h,2)+ "\\). Corresponding sides of similar polygons must be in the <b>same ratio</b>, and these ratios differ, so the rectangles are not similar.";
  var q=mcq(prompt, {t:"The width ratio is "+fmt(w2/w)+" but the height ratio is "+fmtF(h2/h,2)+", so corresponding sides are not in the same ratio.", fb:"Correct: similarity needs one common ratio for every pair of corresponding sides."},
    [ {t:"They are similar, because all the angles in both rectangles are right angles, and the two shapes match in form.", fb:"Equal angles alone do not settle it: the corresponding side ratios also have to match, and they do not."},
      {t:"They are not similar simply because rectangle B is bigger than rectangle A in both directions.", fb:"Bigger shapes can still be similar: an enlargement keeps the same ratios. The problem here is the mismatched ratios."},
      {t:"They are similar, because both shapes are rectangles with four sides and four right angles.", fb:"Having the same type of shape is not enough: corresponding sides must be proportional."} ], sol, {w:w,h:h,k:k});
  q.figure=u7FigPair(w,h,"A: "+w+" by "+h, w2,h2,"B: "+w2+" by "+h2);
  return q;
}, ["Check each pair of corresponding sides separately.", "Divide B's width by A's width, then B's height by A's height, and compare the two ratios."]);

E("u7-corresponding-sides", 7, ["3.62"], 2, "gen", function(){
  var k=pick([2,3,4]), a1=ri(3,12), a2=ri(3,12), b1=a1*k, b2=a2*k, fromB=Math.random()<0.5;
  var prompt="Polygons A and B are similar. In polygon A, two sides measure "+a1+" cm and "+a2+" cm. The corresponding sides in polygon B measure "+b1+" cm and "+b2+" cm. What is the scale factor "+(fromB?"from B to A":"from A to B")+"?";
  var ans=fromB?1/k:k;
  var sol="Each B side divided by the matching A side gives the same value: \\("+b1+" \\div "+a1+" = "+k+"\\) and \\("+b2+" \\div "+a2+" = "+k+"\\). "+(fromB?"Going from B back to A uses the reciprocal, \\(1 \\div "+k+" = "+fmtF(1/k,2)+ "\\).":"")+" The scale factor is <b>"+fmtF(ans,2)+"</b>.";
  var opts=[ {t:fmtF(fromB?k:1/k,2), fb:"That is the scale factor in the opposite direction."},
             {t:String(b1-a1), fb:"That is the difference between the sides. A scale factor is a ratio, found by dividing, not subtracting."},
             {t:fmtF(k+0.5,2), fb:"Check the division: "+b1+" divided by "+a1+" is "+k+", not "+fmtF(k+0.5,2)+"."} ];
  var _bo0=balOpts({t:fmtF(ans,2), fb:"Correct: corresponding sides of similar polygons are all in the one ratio."}, opts); var q=mcq(prompt, _bo0[0], _bo0[1], sol, {k:k, fromB:fromB}); q.figure=u7FigPair(a1,a2,"A: "+a1+" and "+a2, b1,b2,"B: "+b1+" and "+b2); return q;
}, ["Corresponding sides of similar polygons are all in the same ratio.", "Divide a B side by its matching A side, then check the direction the question asks for."]);

E("u7-similar-missing-side-mc", 7, ["3.64"], 2, "gen", function(){
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

E("u7-draw-similar-image", 7, ["3.65","3.62"], 2, "gen", function(){
  var reduce=Math.random()<0.4, w, h, k, kw, kh;
  if(reduce){ w=2*ri(3,7); h=2*ri(2,6); k=0.5; } else { w=ri(4,12); h=ri(3,9); k=pick([2,3]); }
  kw=w*k; kh=h*k;
  var prompt="A rectangle is "+w+" cm wide and "+h+" cm high. A student draws a rectangle similar to it using a scale factor of "+fmt(k)+". What are the side lengths of the drawing?";
  var sol="Multiply each side by the scale factor: \\[ "+w+" \\times "+fmt(k)+" = "+fmt(kw)+" \\qquad "+h+" \\times "+fmt(k)+" = "+fmt(kh)+" \\] The drawing is <b>"+fmt(kw)+" cm by "+fmt(kh)+" cm</b>. Every side is scaled by the same factor, so the drawing is similar to the original.";
  var q=mcq(prompt, {t:fmt(kw)+" cm by "+fmt(kh)+" cm", fb:"Correct: both sides were multiplied by "+fmt(k)+"."},
    [ {t:fmt(w+k)+" cm by "+fmt(h+k)+" cm", fb:"That adds the scale factor to each side. Scaling means multiplying each side."},
      {t:fmt(kw)+" cm by "+fmt(h)+" cm", fb:"Only the width was scaled there. Every side must be multiplied by the scale factor."},
      {t:fmt(w/k)+" cm by "+fmt(h/k)+" cm", fb:"That scales in the wrong direction: it uses division by "+fmt(k)+" instead of multiplication."} ], sol, {k:k,w:w,h:h});
  q.figure=u7FigPair(w,h,"original: "+w+" by "+h, kw,kh,"drawing: ? by ?");
  return q;
}, ["A similar drawing scales every side by the same factor.", "Multiply the width by the scale factor, then multiply the height by the same factor."]);

E("u7-indirect-measurement", 7, ["5.4"], 2, "var", varset([
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the height of a flagpole from its distance away and the angle of elevation to the top.", fb:"Correct: the height cannot be taped directly, so a ratio and an angle give it indirectly."},
    [ {t:"Measuring the length of a classroom directly with a tape measure stretched along the classroom floor.", fb:"That is direct measurement: the tape touches the length being measured."},
      {t:"Weighing a bag of flour on a kitchen scale sitting on the counter in the kitchen.", fb:"That measures mass directly and uses no angle or ratio of sides."},
      {t:"Reading the temperature of a pot of soup with a thermometer dipped into it.", fb:"That is a direct reading and involves no triangle or ratio."} ],
    "The flagpole height is found from a measured distance and an angle, without measuring the height itself. That is <b>indirect measurement</b> using a trigonometric ratio.", {v:1}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the width of a river by measuring an angle and a distance along the near bank.", fb:"Correct: nobody crosses the river with a tape; the width comes from a right triangle model."},
    [ {t:"Measuring the width of a doorway with a folding ruler held across the opening.", fb:"That is direct measurement of an reachable length."},
      {t:"Timing how long a kettle takes to boil from cold on the stove with a kitchen timer.", fb:"That measures time directly and uses no triangle."},
      {t:"Counting the tiles one by one along the whole edge of a tiled floor in the hallway at school.", fb:"Counting tiles is a direct count, not a ratio calculation."} ],
    "The river width is calculated from an angle and a bank side distance in a right triangle model. That is <b>indirect measurement</b>.", {v:2}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the height of a lighthouse from a boat using the angle of elevation to its top.", fb:"Correct: the height is worked out from the angle and the distance, not measured directly."},
    [ {t:"Measuring the height of a door frame with a tape measure held straight beside the frame.", fb:"The tape reaches the height, so that is direct measurement."},
      {t:"Checking the full length of a hockey stick against a marked line on the bench.", fb:"Comparing against a mark is direct measurement."},
      {t:"Measuring a jug of water by pouring it into a measuring cup on the counter.", fb:"That measures volume directly and uses no angle."} ],
    "From the boat, the lighthouse height comes from an angle and a distance in a right triangle. That is <b>indirect measurement</b> using a trigonometric ratio.", {v:3}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding how far a boat is from the base of a cliff using the angle of depression from the top.", fb:"Correct: the distance across the water is calculated, not measured with a tape."},
    [ {t:"Measuring the full deck of a stage by rolling a measuring wheel slowly across its boards, end to end.", fb:"The wheel rolls along the deck, so that is direct measurement."},
      {t:"Weighing a suitcase of luggage on a bathroom scale sitting on the floor at home.", fb:"That is a direct mass reading with no triangle involved."},
      {t:"Reading the speed of a moving car on its speedometer dial as it drives along.", fb:"That is a direct instrument reading, not a ratio of triangle sides."} ],
    "The angle of depression and the cliff height form a right triangle that gives the distance indirectly. That is <b>indirect measurement</b>.", {v:4}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the height of a church steeple by standing back a measured distance and measuring the angle up to its tip.", fb:"Correct: the steeple height is calculated from the angle and the ground distance."},
    [ {t:"Measuring the height of a wooden fence panel with a tape measure before installing it in the back yard fence at home.", fb:"The panel can be taped directly before it goes up."},
      {t:"Measuring the rain water collected in a rain gauge set out in the garden after a full night of heavy rain.", fb:"That is a direct reading of depth in a marked tube."},
      {t:"Timing a full bus trip across town with the stopwatch app on a phone, from the first stop to the last.", fb:"That measures time directly and uses no ratio."} ],
    "The steeple is too tall to tape, so its height is found from a ground distance and an angle. That is <b>indirect measurement</b>.", {v:5}); },
  function(){ return mcq("Which situation uses trigonometric ratios for indirect measurement?",
    {t:"Finding the length of a roof slope from the horizontal span and the roof angle.", fb:"Correct: the slope length comes from the cosine ratio rather than climbing up with a tape."},
    [ {t:"Measuring a length of ribbon by laying it flat along the edge of a long ruler.", fb:"That is direct measurement of a reachable length."},
      {t:"Checking the mass of a wrapped parcel on the counter scale at the post office.", fb:"That is a direct reading and uses no triangle."},
      {t:"Counting the steps in a staircase one at a time, from the bottom step to the top.", fb:"A count is not a trigonometric calculation."} ],
    "The roof slope length is calculated from the span and the angle using a trigonometric ratio. That is <b>indirect measurement</b>.", {v:6}); }
]), ["Indirect measurement finds a length or angle that cannot be measured directly.", "Look for the situation where an angle and one measured length stand in for the length that cannot be reached."]);

E("u7-reasonable-or-not", 7, ["5.6"], 2, "gen", function(){
  var mode=ri(0,3), prompt, correct, distract, sol;
  if(mode===0){
    var H=ri(12,30), claim=H+ri(2,10);
    prompt="A student solves a right triangle problem and reports that one leg is "+claim+" m while the hypotenuse is "+H+" m. Is the solution reasonable?";
    correct={t:"No. A leg of a right triangle can never be longer than the hypotenuse.", fb:"Correct: the hypotenuse is the longest side of a right triangle."};
    distract=[ {t:"Yes. A leg can be any length as long as the angle is acute.", fb:"No side can pass the hypotenuse: it is opposite the right angle and is always the longest side."},
      {t:"Yes. The leg and the hypotenuse are usually about the same size.", fb:"They can be close, but a leg of "+claim+" m against a hypotenuse of "+H+" m is impossible, not just unusual."},
      {t:"No. A leg should always be exactly half the hypotenuse in any right triangle.", fb:"The verdict is right but the reason is wrong: a leg can be more than half the hypotenuse, just never longer than it."} ];
    sol="The hypotenuse is the side opposite the \\(90^\\circ\\) angle and is the longest side of a right triangle. A leg of "+claim+" m cannot exceed a hypotenuse of "+H+" m, so the solution is <b>not reasonable</b>.";
  } else if(mode===1){
    var ang=ri(95,130);
    prompt="In a right triangle, a student reports that one of the acute angles measures \\("+ang+"^\\circ\\). Is the solution reasonable?";
    correct={t:"No. An acute angle must be less than 90 degrees.", fb:"Correct: with one angle already 90 degrees, each of the others must be under 90 degrees."};
    distract=[ {t:"Yes. Angles in a triangle can be up to 180 degrees each.", fb:"The three angles sum to 180 degrees in total: one angle of "+ang+" degrees plus the right angle already passes that."},
      {t:"Yes. It is reasonable if the triangle is very large.", fb:"Size does not change angle rules: the angles of any triangle sum to 180 degrees."},
      {t:"No. Acute angles must be less than 45 degrees.", fb:"The verdict is right but the limit is wrong: acute means less than 90 degrees, not less than 45."} ];
    sol="The angles of a triangle sum to \\(180^\\circ\\). The right angle takes \\(90^\\circ\\), leaving less than \\(90^\\circ\\) for each acute angle. A value of \\("+ang+"^\\circ\\) is <b>not reasonable</b> for an acute angle.";
  } else if(mode===2){
    var sv=fmtF(ri(11,19)/10,1);
    prompt="A student calculates \\(\\sin A = "+sv+"\\) for an acute angle A in a right triangle. Is the solution reasonable?";
    correct={t:"No. Sine is opposite / hypotenuse, and the opposite side cannot exceed the hypotenuse, so sine is at most 1.", fb:"Correct: a part divided by the whole hypotenuse can never pass 1."};
    distract=[ {t:"Yes. Sine values can be any positive number, as large as the angle in the triangle needs them to be, and beyond.", fb:"Sine is a ratio of a leg to the hypotenuse, so it is capped at 1."},
      {t:"Yes. It is reasonable because the angle might be large enough to give a sine value over 1 easily.", fb:"Even at angles close to 90 degrees, sine stays at or below 1."},
      {t:"No. A sine value must always come out less than 0.5, whatever the size of the angle is here.", fb:"The verdict is right but the cap is wrong: sine can be up to 1, for example about 0.87 at 60 degrees."} ];
    sol="\\(\\sin A = "+FR("opposite","hypotenuse")+"\\). The opposite side is a leg, and a leg cannot be longer than the hypotenuse, so the ratio is at most \\(1\\). A sine of "+sv+" is <b>not reasonable</b>.";
  } else {
    var H2=ri(15,40), leg=ri(4,H2-3);
    prompt="A student solves a right triangle problem and reports a leg of "+leg+" m with a hypotenuse of "+H2+" m, found using the sine ratio. Is the solution reasonable?";
    correct={t:"Yes. The leg is shorter than the hypotenuse, as it must be.", fb:"Correct: "+leg+" m is less than "+H2+" m, so the size check passes."};
    distract=[ {t:"No. A leg must be less than half the hypotenuse.", fb:"There is no such rule: a leg can be close to the hypotenuse when the opposite angle is near 90 degrees."},
      {t:"No. Legs found with sine are always longer than the hypotenuse.", fb:"That reverses the rule: sine results are legs, and legs are always shorter than the hypotenuse."},
      {t:"Yes. Any answer from a calculator is automatically reasonable.", fb:"Calculator output still needs a check: a wrong ratio can give an impossible answer."} ];
    sol="The check is the size comparison: a leg must be shorter than the hypotenuse. Here \\("+leg+" < "+H2+"\\), so the solution passes the check and is <b>reasonable</b>.";
  }
  return mcq(prompt, correct, distract, sol, {mode:mode});
}, ["Run a size check: compare legs with the hypotenuse and angles with 90 degrees.", "Ask whether each reported value could exist in a real right triangle."]);

E("u7-trig-error-spot", 7, ["2.5","5.5"], 2, "gen", function(){
  var ang=pick([28,32,35,38,42,48,55,58,62]), adj=ri(5,25);
  var correct=adj*Math.tan(u7Rad(ang)), wrong=adj*Math.sin(u7Rad(ang));
  var prompt="A guy wire meets the ground at \\("+ang+"^\\circ\\). The anchor is "+adj+" m from the base of the pole, and a student wants the height where the wire meets the pole. The student writes: height = "+adj+" x sin("+ang+") = "+fmtF(wrong,2)+" m. What is the correct height, in metres, to two decimal places?";
  var sol="The known side is adjacent to the angle and the wanted side is opposite, so the tangent ratio applies, not sine: \\[ \\text{height} = "+adj+" \\times \\tan("+ang+"^\\circ) = "+fmtF(correct,2)+" \\] The correct height is <b>"+fmtF(correct,2)+" m</b>. The student's error was choosing the sine ratio.";
  var q=mcq(prompt, {t:fmtF(correct,2), fb:"Correct: opposite over adjacent is tangent, so height = adjacent x tan(angle)."},
    [ {t:fmtF(wrong,2), fb:"That is the student's value: it uses sine, which pairs the opposite side with the hypotenuse, not with the adjacent side."},
      {t:fmtF(adj/Math.tan(u7Rad(ang)),2), fb:"That divides by the tangent. The height is adjacent multiplied by tan(angle)."},
      {t:fmtF(adj*Math.cos(u7Rad(ang)),2), fb:"That uses cosine, which pairs the adjacent side with the hypotenuse. The wanted side is the opposite side."} ], sol, {ang:ang, adj:adj});
  q.figure=u7FigTri("?", adj+" m", "wire", ang+"\u00B0");
  return q;
}, ["Name the known and wanted sides relative to the angle before choosing a ratio.", "Adjacent and opposite are the tangent pair: height = adjacent x tan(angle)."]);

E("u7-equivalent-forms", 7, ["2.6","5.1"], 2, "gen", function(){
  var mode=ri(0,3);
  if(mode===0){
    var tr=u7Triple(), s=tr[0]/tr[2], c=tr[1]/tr[2], tv=s/c;
    var prompt="For an acute angle A, \\(\\sin A = "+fmtF(s,2)+"\\) and \\(\\cos A = "+fmtF(c,2)+ "\\). Which calculation gives \\(\\tan A\\)?";
    var sol="The tangent ratio can be rewritten using sine and cosine: \\[ \\tan A = "+FR("opposite","adjacent")+" = "+FR("\\sin A","\\cos A")+" = "+FR(fmtF(s,2),fmtF(c,2))+" = "+fmtF(tv,2)+" \\] The answer is <b>"+fmtF(tv,2)+"</b>. The forms are equivalent because the hypotenuse cancels when the two ratios are divided.";
    return mcq(prompt, {t:fmtF(tv,2), fb:"Correct: tan A = sin A / cos A, since opposite/hypotenuse divided by adjacent/hypotenuse leaves opposite/adjacent."},
      [ {t:fmtF(c/s,2), fb:"That is cos A / sin A, the tangent ratio turned upside down."},
        {t:fmtF(s*c,2), fb:"That multiplies the two ratios. Dividing them is what cancels the hypotenuse."},
        {t:fmtF(s+c,2), fb:"That adds the ratios. Equivalent forms come from dividing sine by cosine, not adding."} ], sol, {mode:mode});
  } else if(mode===1){
    var ang=u7Ang(), H=ri(10,40), sv=Math.sin(u7Rad(ang)), opp=H*sv;
    var prompt1="The formula for the side opposite an angle is \\(\\text{opp} = \\text{hyp} \\times \\sin A\\). A ladder (the hypotenuse) is "+H+" m long and reaches up at \\("+ang+"^\\circ\\) to the ground. What height does it reach, in metres, to two decimal places?";
    var sol1="Apply the formula directly: \\[ \\text{height} = "+H+" \\times \\sin("+ang+"^\\circ) = "+fmtF(opp,2)+" \\] The ladder reaches <b>"+fmtF(opp,2)+" m</b>.";
    var q=mcq(prompt1, {t:fmtF(opp,2), fb:"Correct: height = hypotenuse x sin(angle)."},
      [ {t:fmtF(H/sv,2), fb:"That divides by sine, which would give a height longer than the ladder itself."},
        {t:fmtF(H*Math.cos(u7Rad(ang)),2), fb:"That is the distance along the ground (adjacent side), found with cosine, not the height."},
        {t:fmtF(H*Math.tan(u7Rad(ang)),2), fb:"That uses tangent with the hypotenuse. Tangent pairs the two legs, not the hypotenuse."} ], sol1, {mode:mode}); q.figure=u7FigTri("?", "", H+" m", ang+"\u00B0"); return q;
  } else if(mode===2){
    var ang2=u7Ang(), O=ri(5,30), sv2=Math.sin(u7Rad(ang2)), H2=O/sv2;
    var prompt2="Rearranging \\(\\sin A = "+FR("opposite","hypotenuse")+"\\) gives \\(\\text{hyp} = \\text{opp} \\div \\sin A\\). A roof slope rises "+O+" m vertically and the slope angle is \\("+ang2+"^\\circ\\). What is the slope length, in metres, to two decimal places?";
    var sol2="Use the rearranged form: \\[ \\text{slope} = "+O+" \\div \\sin("+ang2+"^\\circ) = "+fmtF(H2,2)+" \\] The slope length is <b>"+fmtF(H2,2)+" m</b>, which is longer than the vertical rise, as a hypotenuse must be.";
    var q=mcq(prompt2, {t:fmtF(H2,2), fb:"Correct: hypotenuse = opposite / sin(angle)."},
      [ {t:fmtF(O*sv2,2), fb:"That multiplies instead of dividing, and gives a slope shorter than its own vertical rise, which is impossible."},
        {t:fmtF(O/Math.cos(u7Rad(ang2)),2), fb:"That divides by cosine. The rearranged sine form divides by sin(angle)."},
        {t:fmtF(O*Math.tan(u7Rad(ang2)),2), fb:"That is the horizontal run found with tangent, not the slope length."} ], sol2, {mode:mode}); q.figure=u7FigTri(O+" m", "", "?", ang2+"\u00B0"); return q;
  }
  var ang3=u7Ang(), H3=ri(10,40), cv=Math.cos(u7Rad(ang3)), adj3=H3*cv;
  var prompt3="The formula \\(\\text{adj} = \\text{hyp} \\times \\cos A\\) is another form of \\(\\cos A = "+FR("adjacent","hypotenuse")+"\\). A ramp is "+H3+" m long at \\("+ang3+"^\\circ\\) to the ground. How far, in metres, does it reach horizontally, to two decimal places?";
  var sol3="Apply the formula: \\[ \\text{reach} = "+H3+" \\times \\cos("+ang3+"^\\circ) = "+fmtF(adj3,2)+" \\] The ramp reaches <b>"+fmtF(adj3,2)+" m</b> horizontally.";
  var q=mcq(prompt3, {t:fmtF(adj3,2), fb:"Correct: adjacent = hypotenuse x cos(angle)."},
    [ {t:fmtF(H3/cv,2), fb:"That divides by cosine, giving a reach longer than the ramp itself."},
      {t:fmtF(H3*Math.sin(u7Rad(ang3)),2), fb:"That is the height of the ramp (opposite side), found with sine, not the horizontal reach."},
      {t:fmtF(H3*Math.tan(u7Rad(ang3)),2), fb:"That uses tangent with the hypotenuse. Tangent pairs the two legs."} ], sol3, {mode:mode}); q.figure=u7FigTri("", "?", H3+" m", ang3+"\u00B0"); return q;
}, ["Equivalent forms come from rearranging the same ratio: check which side is being isolated.", "Start from the ratio definition and follow the algebra: multiply or divide both sides to isolate the wanted side."]);

E("u7-trig-in-trades", 7, ["2.2","5.4"], 2, "var", varset([
  function(){ var q=mcq("A roofer checks the pitch of a roof. The roof rises 1.8 m over a horizontal run of 6 m. Which ratio describes the pitch angle, and how is it used?",
    {t:"Tangent: the roofer divides rise by run to get the pitch angle of the slope.", fb:"Correct: rise is opposite and run is adjacent, so tangent links them to the angle."},
    [ {t:"Sine: the roofer divides the rise by the run to get the pitch angle of the slope.", fb:"Sine pairs the rise with the slope length (hypotenuse), not with the run."},
      {t:"Cosine: the roofer adds the rise and the run to get the pitch angle of the slope.", fb:"Cosine is a ratio, not a sum, and it pairs the run with the slope length."},
      {t:"Pythagoras: the roofer squares the rise to get the pitch angle of the roof slope.", fb:"Squaring the rise gives a side length calculation, not an angle from rise and run."} ],
    "Pitch is rise over run, the opposite over the adjacent side, so the roofer uses the <b>tangent ratio</b> to find or check the slope angle.", {v:1}); q.figure=u7FigTri("1.8 m", "6 m", "", "?"); return q; },
  function(){ var q=mcq("A ramp builder needs a ramp at \\(8^\\circ\\) that rises 0.9 m. Which calculation gives the length of the ramp surface?",
    {t:"Ramp length = 0.9 / sin(8 degrees), using the sine ratio with the rise as the opposite side.", fb:"Correct: the ramp surface is the hypotenuse, and hypotenuse = opposite / sin(angle)."},
    [ {t:"Ramp length = 0.9 x sin(8 degrees), using the sine ratio with the rise as the opposite side, as drawn.", fb:"That would make the ramp shorter than its own rise, which is impossible for a hypotenuse."},
      {t:"Ramp length = 0.9 / tan(8 degrees), using the tangent ratio with the rise as the opposite side.", fb:"That gives the horizontal run of the ramp, not the surface length."},
      {t:"Ramp length = 0.9 + 8, adding the rise in metres and the angle in degrees together.", fb:"Adding a length and an angle mixes units and uses no ratio at all."} ],
    "The rise is opposite the \\(8^\\circ\\) angle and the ramp surface is the hypotenuse, so \\(\\text{length} = 0.9 \\div \\sin(8^\\circ)\\), from the <b>sine ratio</b>.", {v:2}); q.figure=u7FigTri("0.9 m", "", "?", "8\u00B0"); return q; },
  function(){ var q=mcq("A surveyor stands 40 m from a marker on the far side of a river and measures an angle along the bank. Which ratio lets the surveyor calculate the river's width without crossing it?",
    {t:"Tangent, because the width and the bank distance are the two legs of a right triangle.", fb:"Correct: opposite and adjacent are the tangent pair, so the width comes from the angle and the bank distance."},
    [ {t:"Sine, because the width is opposite the hypotenuse of the right triangle formed by the banks.", fb:"The width is a leg here, not opposite a hypotenuse pairing: sine needs the hypotenuse as one side."},
      {t:"Cosine, because the width is adjacent to the hypotenuse of the triangle.", fb:"Cosine needs the hypotenuse, which is the slanted sight line, not one of the two legs in this setup."},
      {t:"No ratio works here: the surveyor has to go out and measure the width directly.", fb:"This is exactly indirect measurement: the tangent ratio gives the width from the near bank."} ],
    "The river width and the distance along the bank are the two legs, so the <b>tangent ratio</b> gives the width indirectly.", {v:3}); q.figure=u7FigTri("?", "40 m", "sight line", ""); return q; },
  function(){ var q=mcq("A carpenter cuts a stair stringer (the slanted board) for stairs that run 3.6 m horizontally with a stringer angle of \\(33^\\circ\\). Which calculation gives the stringer length?",
    {t:"Stringer = 3.6 / cos(33 degrees), using the cosine ratio with the run as the adjacent side.", fb:"Correct: hypotenuse = adjacent / cos(angle)."},
    [ {t:"Stringer = 3.6 x cos(33 degrees), using the cosine ratio with the run as the adjacent side itself.", fb:"That would give a stringer shorter than the horizontal run, impossible for the slanted side."},
      {t:"Stringer = 3.6 / sin(33 degrees), using the sine ratio with the run as the adjacent side.", fb:"Sine would need the vertical rise as the known side, not the horizontal run."},
      {t:"Stringer = 3.6 x tan(33 degrees), using the tangent ratio with the run as one side.", fb:"That gives the total rise of the stairs, not the stringer length."} ],
    "The run is adjacent to the angle and the stringer is the hypotenuse, so \\(\\text{stringer} = 3.6 \\div \\cos(33^\\circ)\\) from the <b>cosine ratio</b>.", {v:4}); q.figure=u7FigTri("", "3.6 m", "?", "33\u00B0"); return q; },
  function(){ var q=mcq("An electrician leans a ladder against a building. Safety rules set the angle between the ladder and the ground. Which ratio connects the ladder length, the distance of the foot from the wall, and that angle?",
    {t:"Cosine: foot distance = ladder length x cos(angle).", fb:"Correct: the foot distance is the adjacent side and the ladder is the hypotenuse."},
    [ {t:"Sine: foot distance = ladder length x sin(angle).", fb:"That gives the height up the wall (opposite side), not the foot distance."},
      {t:"Tangent: foot distance = ladder length x tan(angle).", fb:"Tangent pairs the two legs; the ladder is the hypotenuse, so tangent does not apply directly here."},
      {t:"Cosine: foot distance = ladder length / cos(angle).", fb:"Dividing would put the foot farther from the wall than the ladder is long, which cannot happen."} ],
    "Foot distance is the adjacent side and ladder length is the hypotenuse, so the <b>cosine ratio</b> connects them: adj = hyp x cos(angle).", {v:5}); q.figure=u7FigTri("", "?", "ladder", "angle"); return q; }
]), ["Match the trade's known and wanted sides to a ratio.", "Decide which side of the triangle each measurement is: opposite, adjacent or hypotenuse."]);

E("u7-tangent-context", 7, ["5.5"], 2, "gen", function(){
  var ctxs=[ {n:"the top of a tree", from:"a point on the ground"}, {n:"the top of a building", from:"a point on the street"}, {n:"the top of a sign pole", from:"a mark on the pavement"}, {n:"the top of a flagpole", from:"a point on the field"} ];
  var c=pick(ctxs), d=ri(6,40), ang=u7Ang(), ans=d*Math.tan(u7Rad(ang));
  var prompt="From "+c.from+" "+d+" m away, the angle of elevation to "+c.n+" is \\("+ang+"^\\circ\\). What is the height, to the nearest tenth of a metre?";
  var sol="The ground distance is adjacent to the angle and the height is opposite, so use tangent: \\[ \\text{height} = "+d+" \\times \\tan("+ang+"^\\circ) = "+fmtF(ans,1)+" \\] The height is <b>"+fmtF(ans,1)+" m</b>.";
  var q=mcq(prompt, {t:fmtF(ans,1), fb:"Correct: height = adjacent x tan(angle of elevation)."},
    [ {t:fmtF(d*Math.sin(u7Rad(ang)),1), fb:"That uses sine, which needs the hypotenuse. The known side here is the adjacent ground distance."},
      {t:fmtF(d/Math.tan(u7Rad(ang)),1), fb:"That divides by the tangent. The height is the distance multiplied by tan(angle)."},
      {t:fmtF(d*Math.cos(u7Rad(ang)),1), fb:"That uses cosine, which pairs the adjacent side with the hypotenuse, not with the opposite height."} ], sol, {d:d, ang:ang});
  q.figure=u7FigTri("?", d+" m", "sight line", ang+" deg");
  return q;
}, ["The angle of elevation is measured from the horizontal up to the line of sight.", "Ground distance is the adjacent side and height is the opposite side, so use the tangent ratio."]);

E("u7-sine-cosine-derive", 7, ["5.2","5.3"], 2, "gen", function(){
  var tr=u7Triple(), o=tr[0], a=tr[1], h=tr[2], k=pick([2,3]), o2=o*k, a2=a*k, h2=h*k;
  var sv=o/h, cv=a/h;
  var prompt="Two right triangles share the acute angle A. The smaller has sides opposite "+o+", adjacent "+a+" and hypotenuse "+h+". The larger has opposite "+o2+", adjacent "+a2+" and hypotenuse "+h2+". Which pair gives \\(\\sin A\\) and \\(\\cos A\\)?";
  var sol="For the smaller triangle, \\(\\sin A = "+o+"/"+h+" = "+fmtF(sv,2)+"\\) and \\(\\cos A = "+a+"/"+h+" = "+fmtF(cv,2)+"\\). For the larger triangle, \\("+o2+"/"+h2+" = "+fmtF(sv,2)+"\\) and \\("+a2+"/"+h2+" = "+fmtF(cv,2)+"\\). Both ratios stay the same when the triangle is scaled, so \\(\\sin A = "+fmtF(sv,2)+"\\) and \\(\\cos A = "+fmtF(cv,2)+"\\). The pair is <b>sin A = "+fmtF(sv,2)+", cos A = "+fmtF(cv,2)+"</b>.";
  var q=mcq(prompt, {t:"sin A = "+fmtF(sv,2)+", cos A = "+fmtF(cv,2), fb:"Correct: sine uses opposite/hypotenuse and cosine uses adjacent/hypotenuse, and both hold in either triangle."},
    [ {t:"sin A = "+fmtF(cv,2)+", cos A = "+fmtF(sv,2), fb:"The two values are swapped: sine is opposite over hypotenuse, cosine is adjacent over hypotenuse."},
      {t:"sin A = "+fmtF(h/o,2)+", cos A = "+fmtF(h/a,2), fb:"Both ratios are upside down there, and a sine or cosine value cannot be greater than 1."},
      {t:"sin A = "+fmtF(o/a,2)+", cos A = "+fmtF(cv,2), fb:"The sine value there is opposite over adjacent, which is the tangent ratio, not sine."} ], sol, {o:o,a:a,h:h,k:k});
  q.figure=u7FigTriPair({o:o,a:a,oL:""+o,aL:""+a,hL:""+h,angL:"A"},{o:o2,a:a2,oL:""+o2,aL:""+a2,hL:""+h2,angL:"A"});
  return q;
}, ["Sine uses the opposite side and cosine uses the adjacent side, each over the hypotenuse.", "Compute opposite / hypotenuse and adjacent / hypotenuse on the smaller triangle, then check the larger one matches."]);

E("u7-unknown-angle-mc", 7, ["5.5"], 2, "gen", function(){
  var mode=ri(0,2), angDeg, knownTxt, ratioName, oL, aL, hL, tries=0;
  var o=ri(3,20), a=ri(3,20);
  while((o===a || Math.abs(Math.atan2(o,a)*180/Math.PI-45)<3) && tries<30){ o=ri(3,20); a=ri(3,20); tries++; }
  if(mode===0){ angDeg=Math.atan2(o,a)*180/Math.PI; ratioName="tangent"; knownTxt="the side opposite the angle is "+o+" m and the side adjacent is "+a+" m"; oL=o+" m"; aL=a+" m"; hL="hyp"; }
  else if(mode===1){ var h=o+ri(2,15); angDeg=Math.asin(o/h)*180/Math.PI; ratioName="sine"; knownTxt="the side opposite the angle is "+o+" m and the hypotenuse is "+h+" m"; oL=o+" m"; aL="adj"; hL=h+" m"; }
  else { var h2=a+ri(2,15); angDeg=Math.acos(a/h2)*180/Math.PI; ratioName="cosine"; knownTxt="the side adjacent to the angle is "+a+" m and the hypotenuse is "+h2+" m"; oL="opp"; aL=a+" m"; hL=h2+" m"; }
  var correct=Math.round(angDeg);
  var d1=correct+10; if(d1>89) d1=correct-20;
  var d2=correct-10; if(d2<1) d2=correct+20; if(d2===d1) d2=correct+15;
  var comp=90-correct; if(comp===d1||comp===d2||comp===correct) comp=correct+5;
  var prompt="In a right triangle, "+knownTxt+". What is the measure of the angle, to the nearest degree?";
  var sol="Use the inverse of the "+ratioName+" ratio on a calculator: the ratio value gives an angle of about \\("+fmtF(angDeg,1)+"^\\circ\\), which rounds to <b>"+correct+" degrees</b>.";
  var q=mcq(prompt, {t:correct+"°", fb:"Correct: the inverse "+ratioName+" of the side ratio gives about "+fmtF(angDeg,1)+" degrees."},
    [ {t:d1+"°", fb:"That is 10 degrees too large: recheck the ratio before using the inverse key."},
      {t:d2+"°", fb:"That is off the computed value of about "+fmtF(angDeg,1)+" degrees: recheck which sides form the ratio."},
      {t:comp+"°", fb:"That is the other acute angle of the triangle (90 minus the answer), not the angle at the marked vertex."} ], sol, {mode:mode, correct:correct});
  q.figure=u7FigTri(oL, aL, hL, "?");
  return q;
}, ["An unknown angle calls for the inverse of the ratio formed by the two known sides.", "Form the ratio from the known sides first, then apply the matching inverse ratio."]);

/* ---------------- Level 3: multiple choice ---------------- */

E("u7-elevation-observer", 7, ["5.5","2.4"], 3, "gen", function(){
  var d=ri(15,60), ang=u7Ang(), eye=pick([1.5,1.6,1.7,1.8]), rise=d*Math.tan(u7Rad(ang)), ans=rise+eye;
  var prompt="An observer with eye level "+fmt(eye)+" m above the ground stands "+d+" m from a building. The angle of elevation from eye level to the top of the building is \\("+ang+"^\\circ\\). What is the height of the building, to the nearest tenth of a metre?";
  var sol="First find the rise above eye level with tangent, which requires rearranging the ratio so the opposite side is the subject: \\[ \\text{rise} = "+d+" \\times \\tan("+ang+"^\\circ) = "+fmtF(rise,1)+" \\] Then add the eye level height: \\[ "+fmtF(rise,1)+" + "+fmt(eye)+" = "+fmtF(ans,1)+" \\] The building is <b>"+fmtF(ans,1)+" m</b> high.";
  var q=mcq(prompt, {t:fmtF(ans,1), fb:"Correct: tangent gives the rise above eye level, then the eye level height is added."},
    [ {t:fmtF(rise,1), fb:"That is only the rise above eye level. The observer's eye level of "+fmt(eye)+" m still has to be added."},
      {t:fmtF(rise-eye,1), fb:"That subtracts the eye level. The top of the building is above eye level, so the eye level is added."},
      {t:fmtF(d/Math.tan(u7Rad(ang))+eye,1), fb:"That divides by the tangent in the first step. The rise is distance multiplied by tan(angle)."} ], sol, {d:d, ang:ang, eye:eye});
  q.figure=m12ElevSVG({dist:d, rise:rise, eye:eye, distLab:d+" m", heightLab:"?", angLab:ang+"\u00B0", eyeLab:fmt(eye)+" m"});
  return q;
}, ["Split the height into two parts: the rise above eye level and the eye level itself.", "Use tangent to find the rise, then add the eye level height."]);

E("u7-similar-perimeter", 7, ["3.64"], 3, "gen", function(){
  var k=pick([2,3]), a=ri(3,12), b=a*k, P=ri(20,60), ans=P*k;
  var prompt="Polygons A and B are similar. A side of polygon A measures "+a+" cm, and the corresponding side of polygon B measures "+b+" cm. The perimeter of polygon A is "+P+" cm. What is the perimeter of polygon B, in centimetres?";
  var sol="The scale factor is \\("+b+" \\div "+a+" = "+k+"\\). Every length in B, including the whole perimeter, is scaled by the same factor: \\[ "+P+" \\times "+k+" = "+ans+" \\] The perimeter of B is <b>"+ans+" cm</b>.";
  var _bo0=balOpts({t:fmt(ans), fb:"Correct: perimeters scale by the same factor as the sides."}, [ {t:fmtF(P/k,1), fb:"That scales the perimeter down. B is the larger polygon, so its perimeter is larger than A's."},
      {t:fmt(P*k*k), fb:"That multiplies by the scale factor twice. Squaring the factor is for areas, not perimeters."},
      {t:fmt(P+(b-a)), fb:"That adds the difference of one pair of sides. Every side scales by multiplication, so the perimeter does too."} ]); var q=mcq(prompt, _bo0[0], _bo0[1], sol, {k:k, P:P}); q.figure=u7FigPair(a,a*0.7,"A: side "+a+" cm", b,b*0.7,"B: side "+b+" cm"); return q;
}, ["A perimeter is a length, so it scales the same way the sides do.", "Find the scale factor from the known pair of sides, then multiply the whole perimeter by it."]);

E("u7-reasonable-advanced", 7, ["5.6","2.5"], 3, "gen", function(){
  var mode=Math.random()<0.5;
  if(mode){
    var H=ri(10,30), ang=pick([28,32,35,38,42,48,55,58,62]), sv=Math.sin(u7Rad(ang));
    var correct=H*sv, wrong=H/sv;
    var prompt="A student needs the side opposite a \\("+ang+"^\\circ\\) angle in a right triangle with hypotenuse "+H+" m. The student writes: opposite = "+H+" / sin("+ang+") = "+fmtF(wrong,2)+" m. Which response is correct?";
    var sol="The student's answer, "+fmtF(wrong,2)+" m, is longer than the hypotenuse of "+H+" m, so it cannot be a leg. The error is the operation: rearranging \\(\\sin A = "+FR("opposite","hypotenuse")+"\\) gives opposite = hypotenuse x sin A: \\[ "+H+" \\times \\sin("+ang+"^\\circ) = "+fmtF(correct,2)+" \\] The correct length is <b>"+fmtF(correct,2)+" m</b>.";
    var q=mcq(prompt, {t:"The answer is impossible: it is longer than the hypotenuse. The correct value is "+fmtF(correct,2)+" m.", fb:"Correct: a leg cannot exceed the hypotenuse, and the fix is to multiply by sine instead of dividing."},
      [ {t:"The answer is fine: dividing by a sine value less than 1 is the right rearrangement here.", fb:"Dividing by a number less than 1 grows the value past the hypotenuse, which a leg can never do."},
        {t:"The answer is impossible, and the correct value, worked properly, is "+fmtF(H*Math.cos(u7Rad(ang)),2)+" m.", fb:"The verdict is right, but that value uses cosine: it is the adjacent side, not the opposite side."},
        {t:"The answer is fine, because sine answers are often larger than the hypotenuse.", fb:"Never: sine is a leg over the hypotenuse, so working it back must give a value smaller than the hypotenuse."} ], sol, {mode:1}); q.figure=u7FigTri("?", "", H+" m", ang+"\u00B0"); return q;
  }
  var o=ri(4,18), a=ri(4,18), tries=0;
  while(o===a && tries<20){ a=ri(4,18); tries++; } if(o===a) a=o+2;
  var trueAng=Math.atan2(o,a)*180/Math.PI, correct=Math.round(trueAng), comp=90-correct;
  var prompt2="A student finds an angle in a right triangle where the opposite side is "+o+" m and the adjacent side is "+a+" m. The student uses the sine ratio with these two sides and reports the angle as \\("+comp+"^\\circ\\). Which response is correct?";
  var sol2="Sine pairs the opposite side with the hypotenuse, and no hypotenuse is given here. The two given sides are the legs, so the tangent ratio applies: the angle is \\(\\tan^{-1}("+o+"/"+a+") \\approx "+fmtF(trueAng,1)+"^\\circ\\), about <b>"+correct+" degrees</b>. The reported \\("+comp+"^\\circ\\) is the size of the other acute angle, a sign the wrong sides were used.";
  var q=mcq(prompt2, {t:"The student used the wrong ratio: with the two legs, tangent gives about "+correct+" degrees.", fb:"Correct: opposite and adjacent are the tangent pair; sine needs the hypotenuse."},
    [ {t:"The student is right: sine works with any two sides of a right triangle.", fb:"Each ratio is tied to specific sides: sine only pairs the opposite side with the hypotenuse."},
      {t:"The student used the wrong ratio: cosine gives about "+correct+" degrees.", fb:"Cosine also needs the hypotenuse. With the two legs given, the ratio is tangent."},
      {t:"The angle cannot be found from two sides of a triangle alone, without more given at all.", fb:"Two sides are enough: they fix the ratio, and the inverse ratio gives the angle."} ], sol2, {mode:0}); q.figure=u7FigTri(o+" m", a+" m", "", "?"); return q;
}, ["Judge the answer first, then name the exact error that produced it.", "Check the size against the hypotenuse for sides, and check which sides the chosen ratio actually pairs."]);

/* ---------------- Constructed response ---------------- */

E("u7-cr-similar-side", 7, ["3.64"], 2, "gen", function(){
  var ctxs=[ {n:"a photo enlargement", u:"cm"}, {n:"a scale model of a boat", u:"cm"}, {n:"a blueprint of a garage", u:"cm"}, {n:"a map of a hiking trail", u:"cm"} ];
  var c=pick(ctxs), k=pick([2,3,4]), a=ri(2,9), b=a*k, s=ri(3,14), x=s*k;
  var prompt="In "+c.n+", the small figure and the large figure are similar. A side of "+a+" "+c.u+" on the small figure corresponds to a side of "+b+" "+c.u+" on the large figure. Another side of the small figure is "+s+" "+c.u+". Find the length of the corresponding side on the large figure, in "+c.u+". Show your work.";
  var sol="Find the scale factor from the known pair, then apply it to the other side: \\[ \\begin{aligned} \\text{scale factor} &= "+b+" \\div "+a+" = "+k+" \\\\ \\text{side} &= "+s+" \\times "+k+" = "+x+" \\end{aligned} \\] The corresponding side is <b>"+x+" "+c.u+"</b>.";
  var q=numq(prompt, x, 0.1, sol, {k:k, s:s});
  q.figure=u7FigPair(a,s,"small: "+a+" and "+s, b,x,"large: "+b+" and ?");
  return q;
}, ["Set up a proportion between corresponding sides.", "Divide the large known side by the small known side to get the scale factor."]);

E("u7-cr-tangent-height", 7, ["5.5","2.3"], 2, "gen", function(){
  var ctxs=[ {n:"a tree", p:"a point on the ground"}, {n:"a building", p:"a point on the sidewalk"}, {n:"a water tower", p:"a point on the road"} ];
  var c=pick(ctxs), d=ri(8,35), ang=u7Ang(), ans=d*Math.tan(u7Rad(ang));
  var prompt="From "+c.p+" "+d+" m from the base of "+c.n+", the angle of elevation to the top is \\("+ang+"^\\circ\\). Use the tangent formula to find the height of "+c.n+", to the nearest tenth of a metre. Show your work.";
  var sol="The height is opposite the angle and the ground distance is adjacent, so the tangent formula applies directly: \\[ \\begin{aligned} \\tan("+ang+"^\\circ) &= "+FR("height", d) +" \\\\ \\text{height} &= "+d+" \\times \\tan("+ang+"^\\circ) \\\\ &= "+fmtF(ans,1)+" \\end{aligned} \\] The height is <b>"+fmtF(ans,1)+" m</b>.";
  var q=numq(prompt, Math.round(ans*10)/10, 0.15, sol, {d:d, ang:ang});
  q.figure=u7FigTri("?", d+" m", "sight line", ang+" deg");
  return q;
}, ["The tangent formula links the opposite height to the adjacent ground distance.", "Write tan(angle) = height / distance, then multiply both sides by the distance."]);

E("u7-cr-find-angle", 7, ["5.5"], 2, "gen", function(){
  var ctxs=[ {n:"a wheelchair ramp", s:"rise"}, {n:"a loading ramp", s:"rise"}, {n:"a roof section", s:"rise"} ];
  var c=pick(ctxs), rise=ri(1,6), run=ri(4,12), ang=Math.atan2(rise,run)*180/Math.PI, ans=Math.round(ang);
  var prompt="A "+c.n.split(" ").slice(1).join(" ")+" has a "+c.s+" of "+rise+" m over a horizontal run of "+run+" m. Find the angle the surface makes with the ground, to the nearest degree. Show your work.";
  var sol="The rise is opposite the angle and the run is adjacent, so use the inverse tangent: \\[ \\begin{aligned} \\tan A &= "+FR(rise, run) +" \\\\ A &= \\tan^{-1}\\left("+fmtF(rise/run,3)+"\\right) \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The angle is <b>"+ans+" degrees</b>.";
  var q=numq(prompt, ans, 0.6, sol, {rise:rise, run:run}); q.figure=u7FigTri(rise+" m", run+" m", "ramp", "?"); return q;
}, ["Rise and run are the two legs, so the tangent ratio connects them to the angle.", "Divide the rise by the run, then use the inverse tangent."]);

E("u7-cr-similar-perimeter-draw", 7, ["3.65"], 2, "gen", function(){
  var w=ri(3,10), h=ri(2,9), k=pick([2,3]), iw=w*k, ih=h*k, ans=2*(iw+ih);
  var prompt="A rectangle is "+w+" cm wide and "+h+" cm high. A student draws a similar rectangle. In the drawing, the side that was "+w+" cm is now "+iw+" cm. Find the perimeter of the drawing, in cm. Show your work.";
  var sol="First find the scale factor from the given pair of sides, then scale the other side, then find the perimeter: \\[ \\begin{aligned} \\text{scale factor} &= "+iw+" \\div "+w+" = "+k+" \\\\ \\text{new height} &= "+h+" \\times "+k+" = "+ih+" \\\\ \\text{perimeter} &= 2 \\times ("+iw+" + "+ih+") = "+ans+" \\end{aligned} \\] The perimeter of the drawing is <b>"+ans+" cm</b>.";
  var q=numq(prompt, ans, 0.1, sol, {w:w, h:h, k:k}); q.figure=u7FigPair(w,h,"original: "+w+" by "+h, iw,ih,"drawing: "+iw+" by ?"); return q;
}, ["The drawing scales every side by one factor: find that factor before doing anything else.", "Divide the new width by the old width to get the scale factor, then scale the height."]);

E("u7-cr-hypotenuse-rearrange", 7, ["5.5","2.4"], 2, "gen", function(){
  var ang=u7Ang(), opp=ri(4,20), hyp=opp/Math.sin(u7Rad(ang));
  var prompt="A ladder leans against a wall. The ladder makes an angle of \\("+ang+"^\\circ\\) with the ground and reaches "+opp+" m up the wall. Find the length of the ladder, to the nearest tenth of a metre. Show your work.";
  var sol="The height up the wall is opposite the angle and the ladder is the hypotenuse, so start with sine and rearrange to make the hypotenuse the subject: \\[ \\begin{aligned} \\sin("+ang+"^\\circ) &= "+FR(opp, "ladder") +" \\\\ \\text{ladder} &= "+opp+" \\div \\sin("+ang+"^\\circ) \\\\ &= "+fmtF(hyp,1)+" \\end{aligned} \\] The ladder is <b>"+fmtF(hyp,1)+" m</b> long, which is longer than the height it reaches, as it should be.";
  var q=numq(prompt, Math.round(hyp*10)/10, 0.15, sol, {ang:ang, opp:opp}); q.figure=u7FigTri(opp+" m", "", "?", ang+"\u00B0"); return q;
}, ["Sine links the opposite side to the hypotenuse.", "Write sin(angle) = opposite / hypotenuse, then rearrange so the ladder length is on its own."]);

E("u7-cr-shadow-problem", 7, ["2.1","3.64"], 2, "gen", function(){
  var ph=pick([1.5,1.6,1.7,1.8]), psh=pick([1.2,1.5,2.0,2.5,3.0]), tsh=ri(6,18), ans=ph*tsh/psh;
  var prompt="At the same time of day, a person "+fmt(ph)+" m tall casts a shadow "+fmt(psh)+" m long, and a flagpole casts a shadow "+tsh+" m long. Set up a similarity proportion for this situation and solve it to find the height of the flagpole, to the nearest tenth of a metre. Show your work.";
  var sol="The person and the flagpole form similar right triangles with their shadows, so the ratios of height to shadow match: \\[ \\begin{aligned} "+FR("height of pole", tsh) + " &= " + FR(fmt(ph), fmt(psh)) + " \\\\ \\text{height of pole} &= " + fmt(ph) + " \\times " + tsh + " \\div " + fmt(psh) + " \\\\ &= " + fmtF(ans,1) + " \\end{aligned} \\] The flagpole is <b>"+fmtF(ans,1)+" m</b> high.";
  var q=numq(prompt, Math.round(ans*10)/10, 0.15, sol, {ph:ph, psh:psh, tsh:tsh}); q.figure=m12ShadowSVG(ph,psh,tsh,ans, fmt(ph)+" m", fmt(psh)+" m", tsh+" m"); return q;
}, ["Objects and their shadows at the same time of day form similar triangles.", "Match height to shadow for the person, then set the same ratio for the flagpole."]);

E("u7-cr-building-eye-level", 7, ["5.5"], 3, "gen", function(){
  var d=ri(12,50), ang=u7Ang(), eye=pick([1.5,1.6,1.7]), rise=d*Math.tan(u7Rad(ang)), ans=rise+eye;
  var prompt="An observer whose eyes are "+fmt(eye)+" m above the ground stands "+d+" m from a building and measures an angle of elevation of \\("+ang+"^\\circ\\) to the top of the building. Find the height of the building, to the nearest tenth of a metre. Show your work.";
  var sol="Use tangent for the part of the height above eye level, then add the eye level: \\[ \\begin{aligned} \\text{rise above eye level} &= "+d+" \\times \\tan("+ang+"^\\circ) = "+fmtF(rise,1)+" \\\\ \\text{building height} &= "+fmtF(rise,1)+" + "+fmt(eye)+" = "+fmtF(ans,1)+" \\end{aligned} \\] The building is <b>"+fmtF(ans,1)+" m</b> high.";
  var q=numq(prompt, Math.round(ans*10)/10, 0.15, sol, {d:d, ang:ang, eye:eye});
  q.figure=u7FigTri("?", d+" m", "sight line", ang+" deg");
  return q;
}, ["The measured angle starts at eye level, not at the ground.", "Find the rise above eye level with tangent, then add the eye level height."]);

E("u7-cr-depression-distance", 7, ["2.1","5.5"], 3, "gen", function(){
  var H=ri(20,70), ang=pick([20,24,28,32,36,40,44]), dist=H/Math.tan(u7Rad(ang));
  var prompt="From the top of a cliff "+H+" m above the water, the angle of depression to a boat is \\("+ang+"^\\circ\\). Create a right triangle model for this situation and solve it to find how far the boat is from the base of the cliff, to the nearest tenth of a metre. Show your work.";
  var sol="The angle of depression from the top equals the angle of elevation from the boat, and the cliff height is opposite that angle while the distance is adjacent. Rearranging the tangent ratio: \\[ \\begin{aligned} \\tan("+ang+"^\\circ) &= "+FR(H, "distance") +" \\\\ \\text{distance} &= "+H+" \\div \\tan("+ang+"^\\circ) \\\\ &= "+fmtF(dist,1)+" \\end{aligned} \\] The boat is <b>"+fmtF(dist,1)+" m</b> from the base of the cliff.";
  var q=numq(prompt, Math.round(dist*10)/10, 0.2, sol, {H:H, ang:ang}); q.figure=m12DepressSVG({height:H, dist:dist, heightLab:H+" m", distLab:"?", angLab:ang+"\u00B0"}); return q;
}, ["Angle of depression is measured down from the horizontal, and it equals the angle of elevation from the boat.", "Put the cliff height as the opposite side and the unknown distance as the adjacent side in the tangent ratio, then rearrange."]);

// Distinctness guard: a few numeric generators can, on rare draws, round two
// different error values to the same displayed option. Redraw those draws so
// every question keeps four distinct options.
(function(){
  var ids=["u7-tangent-ratio-constant","u7-sine-ratio-constant","u7-cosine-ratio-constant","u7-similar-missing-side-mc","u7-equivalent-forms","u7-tangent-context","u7-sine-cosine-derive","u7-elevation-observer","u7-unknown-angle-mc"];
  BANK.forEach(function(e){
    if(ids.indexOf(e.id)<0) return;
    var orig=e.gen;
    e.gen=function(){ var q, t=0; do { q=orig(); t++; } while(q && q.type==="mc" && new Set(q.options).size<4 && t<40); return q; };
  });
})();
