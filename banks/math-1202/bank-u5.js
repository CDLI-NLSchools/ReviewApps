// Math 1202 Unit 5 All About Angles question bank
// Figures (added Nov 2026): complementary and supplementary pairs,
// angles around a point, pizza and clock divisions, vertically
// opposite angles, a perpendicular transversal setup and split
// supplementary angles draw labelled figures from each question's
// own values. Verbal definition, method, referent and strategy
// entries stay figureless, as do the pair naming entry (a diagram
// would name the pair) and the non-parallel reasoning entry.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 2583 to 3179).
// CRMARKS: u5-cr-comp-supp=2
// CRMARKS: u5-cr-trans-find=2
// CRMARKS: u5-cr-around-point=2
// CRMARKS: u5-cr-replicate-bisect=3
// CRMARKS: u5-cr-perp-transversal=3
// CRMARKS: u5-cr-protractor=3
// CRMARKS: u5-cr-angle-chase=2
// CRMARKS: u5-cr-trans-algebra=3
/* ===== Unit 5 ===== */
/* Math 1202 Unit 5: All About Angles. Helpers prefixed u5. Codes from ind-unit5.json. */
function u5Pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.cos(t),cy-r*Math.sin(t)];}
function u5AngleSVG(deg,label,base){
  base=base||0;var cx=150,cy=98,W=300,H=200;
  var p0=u5Pt(cx,cy,88,base),p1=u5Pt(cx,cy,88,base+deg);
  var a0=u5Pt(cx,cy,40,base),a1=u5Pt(cx,cy,40,base+deg);
  var mid=u5Pt(cx,cy,64,base+deg/2),large=deg>180?1:0;
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angle diagram">';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p0[0],1)+'" y2="'+fmt(p0[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p1[0],1)+'" y2="'+fmt(p1[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M '+fmt(a0[0],1)+' '+fmt(a0[1],1)+' A 40 40 0 '+large+' 0 '+fmt(a1[0],1)+' '+fmt(a1[1],1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  if(label)s+=_txt(mid[0],mid[1],label,13,false);
  return s+'</svg>';
}
function u5LinesSVG(mode,slant,off){
  var W=300,H=190,s='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pair of lines diagram">';
  function ln(x1,y1,x2,y2,w){return '<line x1="'+fmt(x1,1)+'" y1="'+fmt(y1,1)+'" x2="'+fmt(x2,1)+'" y2="'+fmt(y2,1)+'" stroke="'+FIG_INK+'" stroke-width="'+(w||2)+'"/>';}
  if(mode==="parallel"){
    s+=ln(20,75,280,75)+ln(20,75+off,280,75+off);
    s+='<path d="M 140 69 l 8 6 l -8 6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<path d="M 140 '+(69+off)+' l 8 6 l -8 6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else if(mode==="perpendicular"){
    s+=ln(20,125,280,125)+ln(150,20,150,172);
    s+='<path d="M 150 107 h 18 v 18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else {
    var c=u5Pt(150,105,92,slant),c2=u5Pt(150,105,-92,slant);
    s+=ln(20,140,280,140)+ln(c2[0],c2[1],c[0],c[1]);
  }
  return s+'</svg>';
}
function u5AdjSVG(x,y){
  var cx=150,cy=115,W=300,H=200;
  var p0=u5Pt(cx,cy,88,0),p1=u5Pt(cx,cy,88,x),p2=u5Pt(cx,cy,88,x+y);
  var m1=u5Pt(cx,cy,60,x/2),m2=u5Pt(cx,cy,60,x+y/2);
  var s='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two adjacent angles sharing a side">';
  s+='<polygon points="'+cx+','+cy+' '+fmt(p0[0],1)+','+fmt(p0[1],1)+' '+fmt(p1[0],1)+','+fmt(p1[1],1)+'" fill="'+FIG_SHADE+'"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p0[0],1)+'" y2="'+fmt(p0[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p1[0],1)+'" y2="'+fmt(p1[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  s+=_txt(m1[0],m1[1],"A: "+x+"°",12,false);
  s+=_txt(m2[0],m2[1],"B: "+y+"°",12,false);
  return s+'</svg>';
}
function u5DegOpts(ans,pool){
  var out=[];pool.forEach(function(v){if(v!==ans&&v>0&&v<360&&out.indexOf(v)<0)out.push(v);});
  var k=20;while(out.length<3){if(ans+k!==ans&&out.indexOf(ans+k)<0)out.push(ans+k);k+=15;}
  return out.slice(0,3).map(function(v){return {t:v+"°", fb:v+"° does not follow from the angle relationship used here: check the sum or equality the diagram gives."};});
}

function u5ArcPath(cx,cy,r,a0,a1){
  var p0=u5Pt(cx,cy,r,a0), p1=u5Pt(cx,cy,r,a1), large=(a1-a0)>180?1:0;
  return '<path d="M '+fmt(p0[0],1)+' '+fmt(p0[1],1)+' A '+r+' '+r+' 0 '+large+' 0 '+fmt(p1[0],1)+' '+fmt(p1[1],1)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
}
function u5PairSVG(a, comp){
  var cx=110, cy=150, end=comp?90:180, s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two adjacent angles forming a pair">';
  var p0=u5Pt(cx,cy,92,0), pm=u5Pt(cx,cy,92,a), pe=u5Pt(cx,cy,92,end);
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(p0[0],1)+'" y2="'+fmt(p0[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pm[0],1)+'" y2="'+fmt(pm[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pe[0],1)+'" y2="'+fmt(pe[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(comp) s+='<path d="M '+(cx+20)+' '+cy+' L '+(cx+20)+' '+(cy-20)+' L '+cx+' '+(cy-20)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+=u5ArcPath(cx,cy,32,0,a)+u5ArcPath(cx,cy,32,a,end);
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  var m1=u5Pt(cx,cy,60,a/2), m2=u5Pt(cx,cy,60,(a+end)/2);
  s+=_txt(m1[0],m1[1],a+"\u00B0",12.5,false);
  s+=_txt(m2[0],m2[1],"?",12.5,false);
  return s+'</svg>';
}
function u5AroundSVG(sweeps, labels){
  var cx=150, cy=102, s='<svg viewBox="0 0 300 205" width="300" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Angles around a point">', ang=0, i;
  var bounds=[0];
  for(i=0;i<sweeps.length;i++){ ang+=sweeps[i]; bounds.push(ang); }
  for(i=0;i<bounds.length;i++){ var pp=u5Pt(cx,cy,80,bounds[i]%360); s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pp[0],1)+'" y2="'+fmt(pp[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; }
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  for(i=0;i<sweeps.length;i++){ var mid=bounds[i]+sweeps[i]/2, lp=u5Pt(cx,cy,54,mid); s+=_txt(lp[0],lp[1],labels[i],12,false); }
  return s+'</svg>';
}
function u5PizzaSVG(n){
  var cx=150, cy=102, r=76, step=360/n, s='<svg viewBox="0 0 300 205" width="300" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Round pizza cut into equal slices">';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  var a0=u5Pt(cx,cy,r,90), a1=u5Pt(cx,cy,r,90+step);
  s+='<polygon points="'+cx+','+cy+' '+fmt(a0[0],1)+','+fmt(a0[1],1)+' '+fmt(a1[0],1)+','+fmt(a1[1],1)+'" fill="'+FIG_SHADE+'"/>';
  for(var i=0;i<n;i++){ var pp=u5Pt(cx,cy,r,90+i*step); s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pp[0],1)+'" y2="'+fmt(pp[1],1)+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>'; }
  var mid=u5Pt(cx,cy,42,90+step/2);
  s+=_txt(mid[0],mid[1],"?",13,false);
  return s+'</svg>';
}
function u5ClockSVG(k){
  var cx=150, cy=102, r=76, s='<svg viewBox="0 0 300 205" width="300" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Clock face showing the angle from 12 to a later hour mark">';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=0;i<12;i++){ var p1=u5Pt(cx,cy,r-9,90-i*30), p2=u5Pt(cx,cy,r,90-i*30); s+='<line x1="'+fmt(p1[0],1)+'" y1="'+fmt(p1[1],1)+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>'; }
  var t12=u5Pt(cx,cy,58,90), tk=u5Pt(cx,cy,58,90-30*k);
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(t12[0],1)+'" y2="'+fmt(t12[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(tk[0],1)+'" y2="'+fmt(tk[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  var l12=u5Pt(cx,cy,r+13,90), lk=u5Pt(cx,cy,r+13,90-30*k), lm=u5Pt(cx,cy,36,90-15*k);
  s+=_txt(l12[0],l12[1],"12",11,false);
  s+=_txt(lk[0],lk[1],""+k,11,false);
  s+=_txt(lm[0],lm[1],"?",13,false);
  return s+'</svg>';
}
function u5VertSVG(a){
  var cx=150, cy=102, s='<svg viewBox="0 0 300 205" width="300" height="205" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two crossing lines with vertically opposite angles">';
  var d1=10, d2=10+a;
  [d1,d2].forEach(function(d){ var p1=u5Pt(cx,cy,88,d), p2=u5Pt(cx,cy,88,d+180); s+='<line x1="'+fmt(p1[0],1)+'" y1="'+fmt(p1[1],1)+'" x2="'+fmt(p2[0],1)+'" y2="'+fmt(p2[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; });
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  var m1=u5Pt(cx,cy,50,(d1+d2)/2), m2=u5Pt(cx,cy,50,(d1+d2)/2+180);
  s+=_txt(m1[0],m1[1],a+"\u00B0",12.5,false);
  s+=_txt(m2[0],m2[1],"?",12.5,false);
  return s+'</svg>';
}
function u5PerpTransSVG(a){
  var tanA=Math.tan(a*Math.PI/180), base=Math.min(200,120/Math.max(tanA,0.2)), hgt=base*tanA;
  var Ax=70, Ay=185, Bx=Ax+base, Cy=Ay-hgt, s='<svg viewBox="0 0 320 230" width="320" height="230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallel lines with a perpendicular transversal and a diagonal">';
  s+='<line x1="25" y1="'+Ay+'" x2="308" y2="'+Ay+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="25" y1="'+fmt(Cy,1)+'" x2="308" y2="'+fmt(Cy,1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 248 '+(Ay-6)+' l 8 6 l -8 6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<path d="M 248 '+fmt(Cy-6,1)+' l 8 6 l -8 6" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+Ax+'" y1="208" x2="'+Ax+'" y2="28" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="'+fmt(Bx,1)+'" y1="'+Ay+'" x2="'+Ax+'" y2="'+fmt(Cy,1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M '+(Ax+14)+' '+Ay+' L '+(Ax+14)+' '+(Ay-14)+' L '+Ax+' '+(Ay-14)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
  s+=_txt(Bx-27,Ay-11,a+"\u00B0",12.5,false);
  s+=_txt(Ax+19,Cy+21,"?",12.5,false);
  return s+'</svg>';
}
function u5SuppBisectSVG(a){
  var cx=150, cy=135, mid=90+a/2, s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A supplementary angle split into two equal parts">';
  [0,a,mid,180].forEach(function(d){ var pp=u5Pt(cx,cy,86,d); s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pp[0],1)+'" y2="'+fmt(pp[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; });
  s+=u5ArcPath(cx,cy,30,0,a)+u5ArcPath(cx,cy,30,a,mid)+u5ArcPath(cx,cy,30,mid,180);
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  var l1=u5Pt(cx,cy,58,a/2), l2=u5Pt(cx,cy,58,(a+mid)/2), l3=u5Pt(cx,cy,58,(mid+180)/2);
  s+=_txt(l1[0],l1[1],a+"\u00B0",12,false);
  s+=_txt(l2[0],l2[1],"?",12.5,false);
  s+=_txt(l3[0],l3[1],"?",12.5,false);
  return s+'</svg>';
}
function u5SplitAngleSVG(A, parts){
  var cx=80, cy=155, s='<svg viewBox="0 0 300 200" width="300" height="200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An angle split into equal parts">';
  for(var i=0;i<=parts;i++){ var pp=u5Pt(cx,cy,92,i*A/parts); s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+fmt(pp[0],1)+'" y2="'+fmt(pp[1],1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; }
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="'+FIG_INK+'"/>';
  for(var j=0;j<parts;j++){ var lp=u5Pt(cx,cy,58,(j+0.5)*A/parts); s+=_txt(lp[0],lp[1],"?",12.5,false); }
  var tp=u5Pt(cx,cy,112,A/2);
  s+=_txt(tp[0],tp[1],A+"\u00B0",12.5,false);
  return s+'</svg>';
}

/* ---------- Level 1 MC ---------- */
E("u5-sort-lines", 5, ["3.35","3.42"], 1, "gen", function(){
  var mode=pick(["parallel","perpendicular","neither"]);
  var slant=pick([25,35,40,50,55,65,70]), off=pick([38,44,50,56]);
  var ctx=pick(["two shelf edges","two fence rails","two trim pieces","two road markings","two ladder rails","the sides of a picture frame","two patio boards","two hockey rink lines"]);
  var stmtPar="Parallel: they never meet and stay the same distance apart";
  var stmtPerp="Perpendicular: they meet at a right angle of 90°";
  var stmtNeitherMeet="Neither: they meet, but not at a right angle";
  var stmtNeitherDrift="Neither: they never meet, but the distance between them changes";
  var correct, sol;
  if(mode==="parallel"){correct={t:stmtPar,fb:"Yes: the lines run in the same direction and stay the same distance apart, and both carry the same arrow mark."};sol="The two lines never meet and stay the same distance apart. They are <b>parallel</b>.";}
  else if(mode==="perpendicular"){correct={t:stmtPerp,fb:"Yes: the lines meet at a right angle, shown by the small square at the corner."};sol="The lines meet at \\(90^\\circ\\), shown by the square corner mark. They are <b>perpendicular</b>.";}
  else {correct={t:stmtNeitherMeet,fb:"Yes: the lines would meet, but not at a right angle, so they fit neither special case."};sol="The lines would meet, but the angle where they cross is not \\(90^\\circ\\). They are <b>neither parallel nor perpendicular</b>.";}
  var allStmts=[
    {t:stmtPar,fb:"Parallel lines never meet and stay the same distance apart: check whether these two lines do that."},
    {t:stmtPerp,fb:"Perpendicular lines meet at exactly \\(90^\\circ\\): look for the square corner mark."},
    {t:stmtNeitherMeet,fb:"That sorting fits lines that meet at some angle other than \\(90^\\circ\\): check how these lines behave."},
    {t:stmtNeitherDrift,fb:"In a flat diagram, lines that never meet keep a constant distance: a changing distance means the lines do meet when extended."}];
  var dis=allStmts.filter(function(d){return d.t!==correct.t;});
  var q=mcq("The diagram shows "+ctx+". How should the pair of lines be sorted?", correct, dis, sol, {mode:mode,slant:slant});
  q.figure=u5LinesSVG(mode,slant,off); return q;
}, ["Look at whether the lines meet, and if they do, at what angle.", "Check for a square corner mark first, then check whether the lines stay the same distance apart."]);

E("u5-comp-supp-basic", 5, ["3.36"], 1, "gen", function(){
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

E("u5-angle-types", 5, ["3.45"], 1, "gen", function(){
  var kind=pick(["acute","right","straight","obtuse","reflex"]);
  var deg, base=pick([0,0,20,40]);
  if(kind==="acute")deg=pick([25,35,45,55,65,75,85]);
  else if(kind==="right")deg=90;
  else if(kind==="straight")deg=180;
  else if(kind==="obtuse")deg=pick([95,110,125,140,155,170]);
  else deg=pick([200,225,250,280,310,340]);
  var names={acute:"Acute angle",right:"Right angle",straight:"Straight angle",obtuse:"Obtuse angle",reflex:"Reflex angle"};
  var ranges={acute:"an acute angle is greater than 0° and less than 90°",right:"a right angle is exactly 90°",straight:"a straight angle is exactly 180°",obtuse:"an obtuse angle is greater than 90° and less than 180°",reflex:"a reflex angle is greater than 180° and less than 360°"};
  var dis=Object.keys(names).filter(function(k){return k!==kind;}).slice(0,3).map(function(k){return {t:names[k], fb:"That name does not fit this opening: "+ranges[k]+"."};});
  var q=mcq("The diagram shows an angle of \\("+deg+"^\\circ\\). Which name describes this angle?",
    {t:names[kind], fb:"Yes: "+ranges[kind]+", and this angle measures "+deg+"°."}, dis,
    "Compare the measure with the angle type ranges: "+ranges[kind]+". An angle of \\("+deg+"^\\circ\\) is <b>"+names[kind].toLowerCase()+"</b>.", {deg:deg,kind:kind});
  q.figure=u5AngleSVG(deg,deg+"°",base); return q;
}, ["Compare the opening with a square corner and with a straight line.", "Use the ranges: acute under 90, right 90, obtuse between 90 and 180, straight 180, reflex over 180."]);

E("u5-referents-sketches", 5, ["3.46","3.47","3.48"], 1, "var", varset([
  function(){ return mcq("Which object is a good referent for a \\(90^\\circ\\) angle?",
    {t:"The corner of a sheet of paper", fb:"Yes: a paper corner is a square corner, exactly 90°."},
    [{t:"One slice of a pizza cut into 8 equal slices", fb:"That slice is 360 divided by 8, which is 45°, half of a right angle."},
     {t:"The opening of a partly closed door", fb:"A door opening changes size as the door moves, so it is not a fixed referent."},
     {t:"One slice of a pizza cut into 12 equal slices", fb:"That slice is 360 divided by 12, which is 30°."}],
    "A referent is a familiar object with a known angle. A paper corner is a square corner. The answer is <b>the corner of a sheet of paper</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a \\(45^\\circ\\) angle?",
    {t:"Half of a square corner, such as a square tile cut corner to corner", fb:"Yes: cutting a square corner in half gives 45°."},
    [{t:"The corner of a sheet of paper", fb:"That corner is a full square corner, 90°."},
     {t:"A fully open book lying flat", fb:"A book lying flat forms a straight angle, 180°."},
     {t:"One slice of a pizza cut into 12 equal slices", fb:"That slice is 360 divided by 12, which is 30°."}],
    "Half of \\(90^\\circ\\) is \\(45^\\circ\\). The answer is <b>half of a square corner</b>.", {}); },
  function(){ return mcq("A student sketches an angle of about \\(30^\\circ\\). Which description matches the sketch?",
    {t:"A narrow opening, about one third of a square corner", fb:"Yes: 30° is one third of 90°, a narrow opening."},
    [{t:"An opening exactly the same as a square corner", fb:"That describes 90°, not 30°."},
     {t:"An opening wider than a square corner", fb:"Wider than a square corner means more than 90°."},
     {t:"Two rays pointing in opposite directions", fb:"That describes a straight angle, 180°."}],
    "\\(30^\\circ\\) is one third of a right angle, so the opening is narrow. The answer is <b>a narrow opening, about one third of a square corner</b>.", {}); },
  function(){ return mcq("A drawn angle opens a little wider than a square corner. Using the referent angles 22.5°, 30°, 45°, 60°, 90° and 180°, which is the best estimate?",
    {t:"About 90°, a little over", fb:"Yes: the opening sits just past the 90° referent, so about 90° is the best estimate from the list."},
    [{t:"About 60°", fb:"60° is well under a square corner, but this opening is wider than a square corner."},
     {t:"About 180°", fb:"180° is a straight line: this opening is far from flat."},
     {t:"About 45°", fb:"45° is half a square corner: this opening is much wider than that."}],
    "Compare the opening with the nearest referent. It is just past a square corner. The answer is <b>about 90°, a little over</b>.", {}); },
  function(){ return mcq("Which object is a good referent for a \\(180^\\circ\\) angle?",
    {t:"A ruler lying flat and straight", fb:"Yes: a straight edge shows a straight angle, 180°."},
    [{t:"The corner of a sheet of paper", fb:"That corner is 90°, half of a straight angle."},
     {t:"One slice of a pizza cut into 8 equal slices", fb:"That slice is 45°."},
     {t:"The hands of a clock at 1 o'clock", fb:"Adjacent hour marks on a clock are 30° apart."}],
    "A straight angle forms a straight line. The answer is <b>a ruler lying flat and straight</b>.", {}); },
  function(){ return mcq("A student sketches an angle of about \\(135^\\circ\\). Which description matches the sketch?",
    {t:"An opening halfway between a square corner and a straight line", fb:"Yes: 135° is halfway between 90° and 180°."},
    [{t:"A narrow opening, less than half a square corner", fb:"That describes an angle under 45°."},
     {t:"An opening exactly the same as a square corner", fb:"That describes 90°, not 135°."},
     {t:"An opening that goes more than halfway around the point", fb:"More than halfway around means more than 180°, a reflex angle."}],
    "\\(135^\\circ = \\frac{90^\\circ + 180^\\circ}{2}\\), halfway between a right angle and a straight angle. The answer is <b>an opening halfway between a square corner and a straight line</b>.", {}); },
  function(){ return mcq("The angle between two neighbouring hour marks on a clock is a useful referent. What is its measure?",
    {t:"30°", fb:"Yes: a full turn of 360° is split into 12 equal hour gaps, and 360 divided by 12 is 30."},
    [{t:"45°", fb:"45° would split the clock into 8 equal parts, but a clock has 12 hour marks."},
     {t:"60°", fb:"60° is the gap across two hour marks, not one."},
     {t:"90°", fb:"90° is the gap across three hour marks, a quarter of the clock."}],
    "\\[ \\frac{360^\\circ}{12} = 30^\\circ \\] The answer is <b>30°</b>.", {}); }
]), ["Think of a familiar object whose angle you already know.", "Compare the angle with a square corner (90°) and a straight line (180°)."]);

E("u5-pair-names", 5, ["3.38"], 1, "gen", function(){
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

E("u5-protractor-read", 5, ["3.44"], 1, "gen", function(){
  var a=pick([25,35,45,55,65,75,85,95,105,115,125,135,145,155]);
  var base=pick([0,15,30,45]);
  var ctx=pick(["a protractor is centred on the angle","the angle is drawn on a worksheet","the angle appears on a pattern for a quilt block","the angle is marked on a cutting guide"]);
  var pool=[180-a, a+10, a-10, 90, a+25];
  var q=mcq("The diagram shows an angle, and "+ctx+". What is the measure of the angle?",
    {t:a+"°", fb:"Yes: the second ray lines up with the "+a+"° mark when the centre sits on the vertex and one ray sits on zero."},
    u5DegOpts(a,pool),
    "Place the centre of the protractor on the vertex and line one ray up with zero, then read where the second ray crosses the scale. The answer is <b>"+a+"°</b>.", {a:a,base:base});
  q.figure=u5AngleSVG(a,a+"°",base); return q;
}, ["Line the centre of the protractor up with the vertex and one ray up with zero.", "Read the scale where the second ray crosses it, using the scale that starts at zero on the first ray."]);

/* ---------- Level 2 MC ---------- */
E("u5-adjacent-not", 5, ["3.37"], 2, "var", varset([
  function(){ return mcq("Four pairs of adjacent angles (angles that share a vertex and a side) are listed. Which pair is adjacent but is neither a complementary pair nor a supplementary pair?",
    {t:"Angles of 52° and 61°, sharing a side at one vertex", fb:"Yes: they are adjacent, and 52 + 61 = 113, which is neither 90 nor 180."},
    [{t:"Angles of 38° and 52°, sharing a side at one vertex", fb:"38 + 52 = 90, so that pair is complementary."},
     {t:"Angles of 74° and 106°, sharing a side at one vertex", fb:"74 + 106 = 180, so that pair is supplementary."},
     {t:"Angles of 45° and 45°, sharing a side at one vertex", fb:"45 + 45 = 90, so that pair is complementary."}],
    "Add each pair: \\(38+52=90\\), \\(74+106=180\\), \\(45+45=90\\), \\(52+61=113\\). Only the last sum is neither 90 nor 180. The answer is <b>the pair of 52° and 61°</b>.", {}); },
  function(){ return mcq("A fan opens and forms pairs of adjacent angles between its blades. Which pair is adjacent but is neither complementary nor supplementary?",
    {t:"Angles of 33° and 71° between neighbouring blades", fb:"Yes: they share a side, and 33 + 71 = 104, which is neither 90 nor 180."},
    [{t:"Angles of 59° and 121° between neighbouring blades", fb:"59 + 121 = 180, so that pair is supplementary."},
     {t:"Angles of 27° and 63° between neighbouring blades", fb:"27 + 63 = 90, so that pair is complementary."},
     {t:"Angles of 90° and 90° between neighbouring blades", fb:"90 + 90 = 180, so that pair is supplementary."}],
    "Add each pair: only \\(33+71=104\\) is neither 90 nor 180. The answer is <b>the pair of 33° and 71°</b>.", {}); },
  function(){ return mcq("On a clock face, the angles between neighbouring hands positions form adjacent pairs. Which pair is adjacent but is neither complementary nor supplementary?",
    {t:"Angles of 84° and 47° sharing the centre and a side", fb:"Yes: 84 + 47 = 131, which is neither 90 nor 180."},
    [{t:"Angles of 15° and 75° sharing the centre and a side", fb:"15 + 75 = 90, so that pair is complementary."},
     {t:"Angles of 132° and 48° sharing the centre and a side", fb:"132 + 48 = 180, so that pair is supplementary."},
     {t:"Angles of 60° and 30° sharing the centre and a side", fb:"60 + 30 = 90, so that pair is complementary."}],
    "Add each pair: only \\(84+47=131\\) is neither 90 nor 180. The answer is <b>the pair of 84° and 47°</b>.", {}); },
  function(){ return mcq("A pair of scissors forms adjacent angle pairs at its pivot. Which pair is adjacent but is neither complementary nor supplementary?",
    {t:"Angles of 118° and 39° on the same side of the pivot", fb:"Yes: 118 + 39 = 157, which is neither 90 nor 180."},
    [{t:"Angles of 101° and 79° on the same side of the pivot", fb:"101 + 79 = 180, so that pair is supplementary."},
     {t:"Angles of 54° and 36° on the same side of the pivot", fb:"54 + 36 = 90, so that pair is complementary."},
     {t:"Angles of 88° and 92° on the same side of the pivot", fb:"88 + 92 = 180, so that pair is supplementary."}],
    "Add each pair: only \\(118+39=157\\) is neither 90 nor 180. The answer is <b>the pair of 118° and 39°</b>.", {}); },
  function(){ return mcq("A book stand forms adjacent angle pairs where its parts meet. Which pair is adjacent but is neither complementary nor supplementary?",
    {t:"Angles of 66° and 58° sharing a side at the hinge", fb:"Yes: 66 + 58 = 124, which is neither 90 nor 180."},
    [{t:"Angles of 23° and 67° sharing a side at the hinge", fb:"23 + 67 = 90, so that pair is complementary."},
     {t:"Angles of 145° and 35° sharing a side at the hinge", fb:"145 + 35 = 180, so that pair is supplementary."},
     {t:"Angles of 71° and 19° sharing a side at the hinge", fb:"71 + 19 = 90, so that pair is complementary."}],
    "Add each pair: only \\(66+58=124\\) is neither 90 nor 180. The answer is <b>the pair of 66° and 58°</b>.", {}); }
]), ["Add the two measures in each pair.", "Complementary pairs add to 90 and supplementary pairs add to 180: find the pair whose sum is a different total."]);

E("u5-trans-relationships", 5, ["3.39","3.41"], 2, "gen", function(){
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

E("u5-trans-find", 5, ["3.40"], 2, "gen", function(){
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

E("u5-nonparallel-why", 5, ["3.41"], 2, "var", varset([
  function(){ return mcq("A transversal crosses two lines that gradually get closer together. The corresponding angles measure 118° and 104°. Why are they not equal?",
    {t:"The equal corresponding angle relationship only holds when the two lines are parallel, and these lines are not parallel", fb:"Yes: parallelism is the condition that makes corresponding angles equal."},
    [{t:"The transversal is far too slanted for any of the angle relationships to work on a pair of lines like these two in the diagram", fb:"A transversal can cross parallel lines at any slant and the relationships still hold."},
     {t:"Corresponding angles are always supplementary instead of equal, whatever the two lines are doing", fb:"On parallel lines corresponding angles are equal: the issue here is that the lines are not parallel."},
     {t:"One of the angles was simply measured from the wrong side of the transversal when it was checked", fb:"Both measures are given as read: the real reason is the missing parallel condition."}],
    "Angle relationships formed by a transversal depend on the two lines being parallel. These lines get closer together, so they are not parallel. The answer is <b>the relationship only holds for parallel lines</b>.", {}); },
  function(){ return mcq("Two fence lines lean toward each other and a path crosses both. The alternate interior angles measure 96° and 81°. What does this show?",
    {t:"The lines are not parallel, because alternate interior angles are equal only when the lines are parallel", fb:"Yes: unequal alternate interior angles are a sign the lines are not parallel."},
    [{t:"The path must run perpendicular to both fence lines for the two angles to come out equal", fb:"A perpendicular path would form 90° angles, and nothing here shows that."},
     {t:"Alternate interior angles are supposed to add to 180° in every diagram, whatever the lines do, parallel or not", fb:"That is the same side interior relationship, and it also needs parallel lines."},
     {t:"The angles were both measured with a faulty protractor, so neither reading can be trusted", fb:"The measures are the evidence: their difference shows the lines are not parallel."}],
    "For parallel lines, alternate interior angles are equal. Here \\(96^\\circ \\ne 81^\\circ\\), so the lines cannot be parallel. The answer is <b>the lines are not parallel</b>.", {}); },
  function(){ return mcq("A student measures interior angles on the same side of a transversal as 112° and 79° for two road edges, and says the edges must be parallel because the angles are both interior. Why is the student wrong?",
    {t:"For parallel lines those angles must add to 180°, and 112 + 79 = 191, so the edges are not parallel", fb:"Yes: the sum misses 180°, which is the test for parallel lines here."},
    [{t:"Interior angles are only formed by perpendicular lines, never by ordinary slanted lines like these two", fb:"Interior angles form whenever a transversal crosses two lines."},
     {t:"The two angles should be exactly equal, to the degree, for the edges to be parallel", fb:"Equality is the test for alternate interior angles, not same side interior angles."},
     {t:"Road edges can never be parallel, because roads always curve eventually as they go", fb:"Road edges often are parallel: the angle sum is what decides it here."}],
    "\\[ 112^\\circ + 79^\\circ = 191^\\circ \\ne 180^\\circ \\] Same side interior angles add to \\(180^\\circ\\) only for parallel lines. The answer is <b>the edges are not parallel</b>.", {}); },
  function(){ return mcq("A transversal crosses two lines and a corresponding angle pair measures 87° and 87°. A second pair measures 87° and 79°. What is the best conclusion?",
    {t:"The lines are not parallel, because for parallel lines every corresponding pair must be equal", fb:"Yes: one matching pair is not enough: parallel lines make all corresponding pairs equal."},
    [{t:"The lines are parallel, because one pair of angles came out exactly equal in the diagram given", fb:"A single equal pair can happen by chance: the second pair breaks the pattern parallel lines require."},
     {t:"The lines are perpendicular, because two of the angles are 87° in the diagram given", fb:"Perpendicular lines form 90° angles, not 87° angles."},
     {t:"The transversal needs to be far longer for the angle relationships to apply to these lines", fb:"Length changes nothing: equal corresponding angles throughout is the condition."}],
    "Parallel lines force every corresponding pair to be equal. The \\(87^\\circ\\) and \\(79^\\circ\\) pair is not equal, so the lines are not parallel. The answer is <b>the lines are not parallel</b>.", {}); },
  function(){ return mcq("Why do carpenters check that both ends of two boards are the same distance apart before trusting angle relationships between them?",
    {t:"Equal spacing is evidence the boards are parallel, and the angle relationships only apply to parallel lines", fb:"Yes: the spacing check establishes the condition the relationships need."},
    [{t:"The boards need to be exactly the same length as each other for angles to form between them", fb:"Boards of different lengths can still be parallel and form the usual angle pairs."},
     {t:"Angle relationships apply only to wooden boards of equal thickness, and never to boards of any other kind at all", fb:"The material does not matter: parallelism is the condition."},
     {t:"A transversal cannot cross two boards at an angle, so no angle pairs can form here at all", fb:"A transversal is exactly a line that crosses two other lines, at any angle."}],
    "The transversal angle relationships rest on one condition: the two lines are parallel. Checking equal spacing at both ends checks that condition. The answer is <b>equal spacing shows the boards are parallel</b>.", {}); }
]), ["Ask what condition the angle relationships need before applying them.", "Test the given measures against the equal or 180 total the relationship requires."]);

E("u5-real-settings", 5, ["3.42","3.35"], 2, "var", varset([
  function(){ return mcq("A builder wants to confirm a wall is perpendicular to the floor. Which strategy gives the best evidence?",
    {t:"Place a carpenter's square in the corner where the wall meets the floor and check that both edges sit flat against it", fb:"Yes: the square is a true 90° referent, so a flat fit confirms a right angle."},
    [{t:"Measure the height of the wall in two places and compare the numbers", fb:"Equal heights speak to level or parallel, not to the angle between wall and floor."},
     {t:"Check that the wall looks straight when viewed from across the room", fb:"Looks can mislead: a measured check against a known right angle is stronger evidence."},
     {t:"Measure the distance from the top of the wall to the far wall", fb:"That distance does not test the angle at the floor line."}],
    "Perpendicular means meeting at \\(90^\\circ\\). Testing the corner against a carpenter's square tests exactly that angle. The answer is <b>check the corner with a carpenter's square</b>.", {}); },
  function(){ return mcq("Railway tracks are supposed to be parallel. Which strategy best checks this along a straight section?",
    {t:"Measure the distance between the rails at several spots and check that the distance stays the same", fb:"Yes: parallel lines stay the same distance apart everywhere."},
    [{t:"Check that the rails meet at a vanishing point far away", fb:"Parallel rails only appear to meet in perspective: they never actually meet."},
     {t:"Measure the length of each rail and check that the lengths match", fb:"Equal lengths do not show the rails run in the same direction."},
     {t:"Put a square in the corner where a rail meets a tie", fb:"That tests whether the tie is perpendicular to the rail, a different question."}],
    "Parallel lines stay the same distance apart. Measuring the gap at several spots tests that directly. The answer is <b>measure the distance between the rails at several spots</b>.", {}); },
  function(){ return mcq("A shelf unit has three shelves. The top and bottom shelves are claimed to be parallel. Which check supports the claim?",
    {t:"The vertical distance between them is the same at the left end and at the right end", fb:"Yes: equal spacing at both ends is the parallel test."},
    [{t:"Both shelves hold the same number of books", fb:"The load on a shelf says nothing about its direction."},
     {t:"Both shelves were cut from the same board", fb:"A shared source does not guarantee the shelves were mounted parallel."},
     {t:"The angle at one corner of the unit is 90°", fb:"That shows a side is perpendicular to a shelf, not that the two shelves are parallel to each other."}],
    "Parallel lines and planes stay a constant distance apart. Equal end distances support the claim. The answer is <b>the distance between them is the same at both ends</b>.", {}); },
  function(){ return mcq("A door frame is checked with a carpenter's square at its top corners, and the square sits flat in both corners. What has been shown?",
    {t:"The top of the frame is perpendicular to both sides of the frame", fb:"Yes: a flat fit of the square shows a 90° angle at each corner."},
    [{t:"The two sides of the frame are perpendicular to each other", fb:"The sides do not meet each other: each side meets the top."},
     {t:"The frame is a perfect square shape", fb:"Corner angles alone do not show the side lengths are equal."},
     {t:"The door will never stick in winter", fb:"The check covers angles only, not seasonal movement."}],
    "The square tests each corner angle and finds \\(90^\\circ\\). The answer is <b>the top is perpendicular to both sides</b>.", {}); },
  function(){ return mcq("Two patio boards run side by side. At the left end they are 14 cm apart, and at the right end they are 19 cm apart. How should the boards be sorted?",
    {t:"Neither parallel nor perpendicular: they lean toward each other, so they are not parallel, and boards side by side do not meet at 90°", fb:"Yes: changing spacing rules out parallel, and the boards never cross at a right angle."},
    [{t:"Parallel, because they run roughly in the same direction", fb:"Roughly is not enough: parallel lines keep exactly the same spacing."},
     {t:"Perpendicular, because the gap changes along their length", fb:"Perpendicular describes lines that meet at 90°, not a changing gap."},
     {t:"Parallel, because both boards are the same width", fb:"Equal board width does not show the boards run parallel to each other."}],
    "Spacing changes from 14 cm to 19 cm, so the boards are not parallel, and they do not meet at a right angle. The answer is <b>neither parallel nor perpendicular</b>.", {}); },
  function(){ return mcq("A ladder has two side rails joined by rungs. A worker measures the angle between a rung and a rail as 90° at both rails. What relationship has the worker confirmed?",
    {t:"Each rung is perpendicular to both side rails", fb:"Yes: a 90° angle between the rung and each rail is perpendicularity."},
    [{t:"The two side rails are perpendicular to each other", fb:"The side rails run alongside each other: the rungs meet them at right angles."},
     {t:"The rungs are longer than the rails are wide apart", fb:"The angle measures say nothing about lengths."},
     {t:"The ladder is safe to climb at any angle", fb:"The check covers the rung angles only, not the ladder placement angle."}],
    "An angle of \\(90^\\circ\\) between two lines means they are perpendicular. The answer is <b>each rung is perpendicular to both side rails</b>.", {}); }
]), ["Name the relationship first: meeting at 90°, or staying the same distance apart.", "Match the check to the relationship: a square tests 90°, repeated distance measures test parallel."]);

E("u5-context-transversal", 5, ["3.43"], 2, "gen", function(){
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

E("u5-estimate-angle", 5, ["3.48","3.46"], 2, "gen", function(){
  var refs=[22.5,30,45,60,90,180];
  var target=pick([22.5,30,45,60,90]); var base=pick([0,10,20,30,40,50,60,70,80,90,100,110,120,130,140,150,160,170]);
  var others=refs.filter(function(r){return Math.abs(r-target)>=15;});
  var dis=[]; var used={}; var guard=0;
  while(dis.length<3&&guard<30){guard++; var r=pick(others); if(!used[r]){used[r]=1; dis.push({t:r+"°", fb:r+"° is a referent angle, but the drawn opening matches a different referent more closely: compare it with a square corner and a straight line."});}}
  var _bo0=balOpts({t:target+"°", fb:"Yes: the opening matches the "+target+"° referent."}, dis); var q=mcq("Estimate the measure of the angle in the diagram. Choose the referent angle from the list 22.5°, 30°, 45°, 60°, 90° and 180° that fits best.", _bo0[0], _bo0[1],
    "Compare the opening with the referents: a square corner is \\(90^\\circ\\) and a straight line is \\(180^\\circ\\). This opening matches the \\("+target+"^\\circ\\) referent. The answer is <b>"+target+"°</b>.", {target:target,base:base});
  q.figure=u5AngleSVG(target,target+"°",base); return q;
}, ["Hold the referents in mind: a clock hour gap is 30°, half a square corner is 45°, a square corner is 90°.", "Decide which referent the opening sits closest to."]);

E("u5-sketch-match", 5, ["3.47","3.45"], 2, "gen", function(){
  var cats=[
    {key:"acute", test:function(m){return m<90;}, desc:"a narrow opening, smaller than a square corner", draw:function(){return pick([28,37,44,53,62,71,80,86]);}},
    {key:"obtuse", test:function(m){return m>90&&m<180;}, desc:"an opening wider than a square corner but smaller than a straight line", draw:function(){return pick([98,109,121,134,146,158,169,176]);}},
    {key:"reflex", test:function(m){return m>180;}, desc:"an opening that goes the long way around the point, more than a straight line", draw:function(){return pick([196,214,233,252,271,295,318,342]);}}];
  var c=pick(cats); var m=c.draw(); var orient=pick(["opening upward to the left","opening upward to the right","opening downward to the left","opening downward to the right"]);
  var dis=cats.filter(function(o){return o.key!==c.key;}).map(function(o){return {t:"A sketch with "+o.desc, fb:"That description belongs to a different angle type: compare this measure with 90° and 180°."};});
  dis.push({t:"A sketch with two rays pointing in exactly opposite directions", fb:"Opposite rays form a straight angle of exactly 180°, which does not match this measure."});
  return mcq("A student must sketch an angle of \\("+m+"^\\circ\\), "+orient+". Which description matches a correct sketch?",
    {t:"A sketch with "+c.desc, fb:"Yes: "+m+"° sits in the range that matches this description."}, dis,
    "Place \\("+m+"^\\circ\\) against the landmarks: it is "+(c.key==="acute"?"less than \\(90^\\circ\\)":c.key==="obtuse"?"between \\(90^\\circ\\) and \\(180^\\circ\\)":"greater than \\(180^\\circ\\)")+". The matching sketch has <b>"+c.desc+"</b>.", {m:m,cat:c.key});
}, ["Place the given measure against 90° and 180° first.", "Then pick the description whose opening size matches that range."]);

E("u5-replicate-methods", 5, ["3.50"], 2, "var", varset([
  function(){ return mcq("A student replicates (copies) an angle with a Mira, a clear reflector. Which step belongs to the Mira method?",
    {t:"Stand the Mira on one ray of the original angle, see the reflection of the other ray, and draw along the reflected image", fb:"Yes: the Mira reflects one ray onto a new position so the copy matches the original opening."},
    [{t:"Swing an arc from the vertex and measure the arc with a ruler", fb:"Arcs and measurements belong to compass or protractor methods, not the Mira."},
     {t:"Read the degree scale where the second ray crosses it", fb:"Reading a degree scale is the protractor method."},
     {t:"Fold the paper so the two rays line up", fb:"Folding is a paper folding method, often used for bisection, not the Mira copy."}],
    "A Mira copies an angle by reflection. The answer is <b>use the reflection of one ray to place the new ray</b>.", {}); },
  function(){ return mcq("A student replicates an angle with a protractor. Which sequence is correct?",
    {t:"Measure the original angle, draw one ray for the copy, mark the measured angle from that ray, then draw the second ray through the mark", fb:"Yes: measure, then rebuild the same measure at the new vertex."},
    [{t:"Draw both rays for the copy first, then measure the original angle to check later", fb:"Without the measure first, there is nothing guiding where the second ray goes."},
     {t:"Measure the length of one ray of the original angle and copy that length", fb:"An angle is set by its opening, not by the length of its rays."},
     {t:"Mark the halfway angle from the new ray and draw through that mark", fb:"Half the measure would build the bisector, not a copy of the full angle."}],
    "Replication with a protractor transfers the measure: measure the original, then mark off the same measure at the new vertex. The answer is <b>measure first, then rebuild the same measure</b>.", {}); },
  function(){ return mcq("A student replicates an angle with a compass and straightedge. Why must the compass opening stay unchanged when the arc is drawn at both vertices?",
    {t:"The same compass opening makes the two arcs the same size, so the copied opening matches the original angle", fb:"Yes: matching arcs carry the size of the opening from one vertex to the other."},
    [{t:"A changed compass opening makes the paper harder to mark", fb:"The issue is accuracy of the copy, not marking the paper."},
     {t:"The straightedge cannot be used after the compass opening changes", fb:"The straightedge is used after the arcs: the opening matters because the arcs must match."},
     {t:"Compass openings lock permanently once they are set", fb:"A compass opening can be changed freely: keeping it fixed is a choice the method requires."}],
    "The construction copies the angle by copying its arc. If the compass opening changed, the arcs would differ and the copy would not match. The answer is <b>the arcs must be the same size</b>.", {}); },
  function(){ return mcq("A carpenter replicates the angle of a stair stringer (the slanted board that holds the steps) onto a new board using a carpenter's square and a sliding bevel. What does the sliding bevel do?",
    {t:"It is set against the original angle, locked, and then used to mark the same angle on the new board", fb:"Yes: the bevel holds the angle while it is carried from one board to the other."},
    [{t:"It measures the angle in degrees and displays the number", fb:"A sliding bevel holds an angle physically: it does not give a degree reading."},
     {t:"It cuts the new board at the matching angle by itself", fb:"The bevel marks the angle: cutting is a separate step with a saw."},
     {t:"It halves the angle so the new board is easier to fit", fb:"Halving would bisect the angle, producing a different, smaller angle."}],
    "Replication means producing the same angle somewhere else. A locked sliding bevel carries the opening across unchanged. The answer is <b>it holds the angle and transfers it to the new board</b>.", {}); },
  function(){ return mcq("A student replicates an angle in dynamic geometry software. Which action produces a true copy?",
    {t:"Use the angle copy or rotation tool on the original angle and place the image at the new vertex", fb:"Yes: the software copy tool preserves the measure exactly."},
    [{t:"Drag a ray of the original angle until the copy looks about right", fb:"Eyeballing a drag gives an approximation, not a true copy."},
     {t:"Measure one ray of the original angle and draw a ray of that length", fb:"Ray length does not set an angle: the opening does."},
     {t:"Trace the original angle with the freehand drawing tool", fb:"Freehand tracing is approximate: the copy tool is the exact method."}],
    "Software replication uses a copy or rotation construction so the measure is preserved exactly. The answer is <b>use the angle copy or rotation tool</b>.", {}); },
  function(){ return mcq("Two students each replicate a 64° angle, one with a Mira and one with a protractor. Both copies are checked and measure 64°. What does this show?",
    {t:"Different replication methods can all produce an angle equal to the original when each method is followed correctly", fb:"Yes: the method varies, but a correct replication always matches the original measure."},
    [{t:"The Mira copy must be more accurate because it uses no numbers", fb:"Accuracy depends on following the method, not on avoiding numbers."},
     {t:"Only the protractor method counts as replication", fb:"Replication means copying an angle by any valid method, Mira included."},
     {t:"The copies should each measure 32°, half of the original", fb:"Half of the original would be bisection, not replication."}],
    "A replicated angle has the same measure as the original, whatever tool is used. The answer is <b>all correct methods produce a copy equal to the original</b>.", {}); }
]), ["Ask what the tool actually does to carry the angle from one place to another.", "A copy must end with exactly the same measure as the original."]);

E("u5-bisect-steps", 5, ["3.52"], 2, "var", varset([
  function(){ return mcq("A student bisects an angle with a compass and straightedge. Which sequence gives the correct order of steps?",
    {t:"Draw an arc from the vertex cutting both rays, draw arcs from those two cutting points so they cross inside the angle, then draw a ray from the vertex through the crossing point", fb:"Yes: vertex arc first, equal arcs from its cutting points second, bisector ray last."},
    [{t:"Draw a ray from the vertex through an estimated middle point, then draw an arc from the vertex cutting both rays at once, and take that arc as the bisector line, before anything else", fb:"The bisector ray is drawn last, from the crossing point the arcs create: estimating the middle first gives no exact split."},
     {t:"Draw arcs from the two rays first, then guess where they happen to cross, mark the vertex at that spot, and draw the bisector ray from the guessed point instead of the vertex", fb:"The vertex is given from the start, and the first arc is centred on it."},
     {t:"Measure the angle first, halve the number, and mark that measure from one ray with the compass, then draw the bisector ray through the compass mark at the very end", fb:"Halving a measured number is the protractor method, not the compass construction."}],
    "The compass bisector is built in three moves: an arc from the vertex, equal arcs from where that arc cuts the rays, and a ray through their crossing. The answer is <b>vertex arc, crossing arcs, then the bisector ray</b>.", {}); },
  function(){ return mcq("A student bisects an angle with a protractor. Which sequence is correct?",
    {t:"Measure the full angle, divide the measure by 2, mark that many degrees from one ray, then draw a ray from the vertex through the mark", fb:"Yes: the bisector sits at half the full measure."},
    [{t:"Measure the full angle, mark that many degrees from one ray, then draw a ray from the vertex through the mark anyway, without halving anything", fb:"Marking the full measure rebuilds the original angle: the mark must be at half the measure."},
     {t:"Divide the full measure by 2, measure the angle afterwards, then erase one ray and keep the other one as the bisector at the end", fb:"Erasing a ray destroys the angle instead of splitting it."},
     {t:"Mark 90° from one ray and draw a ray through that mark, wherever the second ray of the angle happens to be sitting there", fb:"90° is only the halfway point when the full angle is 180°."}],
    "Bisection splits the measure in half, so the protractor mark goes at half the measured angle. The answer is <b>measure, halve, mark, then draw the ray</b>.", {}); },
  function(){ return mcq("A student bisects a paper angle by folding. Which sequence is correct?",
    {t:"Fold so that one ray of the angle lies exactly on top of the other ray, crease the paper, then unfold: the crease is the bisector", fb:"Yes: lining up the rays makes the crease split the opening into two equal parts."},
    [{t:"Fold the paper anywhere across the angle, crease it firmly, and use that crease directly as the bisector of the angle", fb:"A random crease splits the angle unevenly: the rays must line up first."},
     {t:"Fold one ray onto the vertex and crease along the ray itself, then unfold the paper and take that crease as the bisector of the angle", fb:"That crease follows the existing ray and does not split the opening."},
     {t:"Fold the angle in half by matching the far ends of the two rays, crease the paper, and take the crease as the bisector", fb:"Ray ends can be different lengths: it is the rays themselves, from the vertex, that must coincide."}],
    "When one ray folds exactly onto the other, the crease between them splits the angle into two equal angles. The answer is <b>fold ray onto ray, and the crease is the bisector</b>.", {}); },
  function(){ return mcq("A student bisects an angle with a Mira. Which step completes the bisection?",
    {t:"Stand the Mira on the vertex so the reflection of one ray falls exactly on the other ray, then draw along the Mira's edge", fb:"Yes: when the rays coincide in reflection, the Mira's edge lies on the bisector."},
    [{t:"Stand the Mira anywhere inside the angle, at any tilt, and draw along its longest side to get the bisector of the whole angle", fb:"Position matters: the Mira must sit on the vertex with the rays matched in reflection."},
     {t:"Reflect the vertex onto a ray, mark where it lands, and connect the two points to form the bisector ray of the angle", fb:"The bisector is a ray from the vertex, found by matching the two rays in reflection."},
     {t:"Measure the angle with the degree scale printed on the Mira, halve it, and mark the halfway point on the angle", fb:"A Mira has no degree scale: it works by reflection."}],
    "The Mira bisects by reflection: matching one ray onto the other puts the mirror line exactly halfway between them. The answer is <b>match the rays in reflection and draw along the Mira</b>.", {}); },
  function(){ return mcq("A student bisects an angle in dynamic geometry software. Which sequence produces the bisector?",
    {t:"Select the angle bisector tool, click the three points that define the angle (side point, vertex, side point), and the software draws the bisector ray", fb:"Yes: the bisector tool needs the angle defined in vertex order."},
    [{t:"Select the midpoint tool, click the two rays of the angle one after the other, and join the midpoints with a ray from the vertex itself to finish it all", fb:"The midpoint tool works on segments and points, not on splitting an angle."},
     {t:"Draw a circle centred at the vertex and connect two points on the circle, then extend that line through the vertex as the bisector ray itself", fb:"A circle alone does not locate the halfway direction."},
     {t:"Use the parallel line tool through the vertex, parallel to one of the rays, and take that line itself as the bisector of the angle in the end", fb:"A parallel line copies direction: it does not split the angle."}],
    "The bisector tool builds the ray that splits the angle into two equal angles from the three defining points. The answer is <b>use the angle bisector tool on the three points of the angle</b>.", {}); }
]), ["Bisect means split into two equal angles: look for the step that guarantees the two parts match.", "Put the steps in build order: set up the split first, draw the splitting ray last."]);

E("u5-context-angles", 5, ["3.49"], 2, "gen", function(){
  var mode=pick(["pizza","clock","around"]);
  var ctx=pick(["at a community supper","in a school cafeteria","at a family gathering","during a cooking class"]);
  if(mode==="pizza"){
    var n=pick([4,5,6,8,9,10,12]); var ans=360/n;
    var _bo0=balOpts({t:ans+"°", fb:"Yes: the full turn of 360° is shared equally, and 360 divided by "+n+" is "+ans+"."}, u5DegOpts(ans,[180/n, 360/(n+1), 90])); var q=mcq("A round pizza "+ctx+" is cut into "+n+" equal slices from the centre. What is the angle at the centre of each slice?", _bo0[0], _bo0[1],
      "\\[ \\begin{aligned} \\text{slice angle} &= \\frac{360^\\circ}{"+n+"} \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {mode:mode,n:n}); q.figure=u5PizzaSVG(n); return q;
  }
  if(mode==="clock"){
    var k=pick([2,3,4,5]); var ans=30*k;
    var _bo1=balOpts({t:ans+"°", fb:"Yes: each hour gap is 30°, and "+k+" gaps give "+k+" times 30, which is "+ans+"."}, u5DegOpts(ans,[30*(k+1), 30*(k-1), 360/k])); var q=mcq("On a clock, neighbouring hour marks are equally spaced around the centre. What is the angle at the centre between the mark for 12 and the mark for "+k+"?", _bo1[0], _bo1[1],
      "One hour gap is \\(360^\\circ \\div 12 = 30^\\circ\\). \\[ "+k+" \\times 30^\\circ = "+ans+"^\\circ \\] The answer is <b>"+ans+"°</b>.", {mode:mode,k:k}); q.figure=u5ClockSVG(k); return q;
  }
  var a=pick([70,85,95,110,125]), b=pick([60,75,90,105]);
  var ans=360-a-b;
  var _bo2=balOpts({t:ans+"°", fb:"Yes: angles around a point add to 360°, and 360 - "+a+" - "+b+" = "+ans+"."}, u5DegOpts(ans,[180-a, 360-a, a+b])); var q=mcq("A rotating garden sprinkler "+ctx+" sweeps a full turn. Two marked stops split the turn into angles of \\("+a+"^\\circ\\) and \\("+b+"^\\circ\\) plus one unmarked sweep. What is the angle of the unmarked sweep?", _bo2[0], _bo2[1],
    "Angles around a point add to \\(360^\\circ\\). \\[ \\begin{aligned} \\text{unmarked} &= 360^\\circ - "+a+"^\\circ - "+b+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {mode:mode,a:a,b:b}); q.figure=u5AroundSVG([a,b,ans],[a+"\u00B0",b+"\u00B0","?"]); return q;
}, ["Decide which total the angles share: a full turn, or a count of equal gaps.", "Use the total and share or subtract as the situation describes."]);

E("u5-adjacent-describe", 5, ["3.37","3.36"], 2, "gen", function(){
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

/* ---------- Level 3 MC ---------- */
E("u5-trans-algebra", 5, ["3.40","3.38"], 3, "gen", function(){
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

E("u5-replicate-bisect-apply", 5, ["3.50","3.51","3.52"], 3, "gen", function(){
  var A=pick([48,56,64,72,84,96,108,120,132,144]);
  var method=pick(["a compass and straightedge","a Mira","a protractor","dynamic geometry software"]);
  var mode=pick(["bisect-copy","double-bisect","copy-only"]);
  var ans, sol;
  if(mode==="copy-only"){ ans=A; sol="A replicated angle has the same measure as the original. The copy measures <b>"+A+"°</b>."; }
  else if(mode==="bisect-copy"){ ans=A/2; sol="The copy measures \\("+A+"^\\circ\\), the same as the original. Bisecting splits it into two equal parts: \\[ \\frac{"+A+"^\\circ}{2} = "+ans+"^\\circ \\] The answer is <b>"+ans+"°</b>."; }
  else { ans=A/4; sol="The copy measures \\("+A+"^\\circ\\). The first bisection gives \\("+A+" \\div 2 = "+(A/2)+"^\\circ\\), and bisecting one of those parts gives \\[ \\frac{"+(A/2)+"^\\circ}{2} = "+ans+"^\\circ \\] The answer is <b>"+ans+"°</b>."; }
  var prompt;
  if(mode==="copy-only") prompt="A woodworker replicates a \\("+A+"^\\circ\\) angle from a template onto a board using "+method+". What is the measure of the angle marked on the board?";
  else if(mode==="bisect-copy") prompt="A woodworker replicates a \\("+A+"^\\circ\\) angle from a template onto a board using "+method+", then bisects the copy to mark a centre line. What is the measure of each part of the bisected copy?";
  else prompt="A woodworker replicates a \\("+A+"^\\circ\\) angle from a template onto a board using "+method+", bisects the copy, and then bisects one of the parts again. What is the measure of the smallest angle formed?";
  var pool=[A, A/2, A/4, 180-A];
  var q=mcq(prompt, {t:ans+"°", fb:"Yes: replication keeps the measure at "+A+"°, and each bisection halves the angle."},
    u5DegOpts(ans,pool), sol, {A:A,mode:mode,method:method});
  if(mode==="copy-only") q.figure=u5AngleSVG(A, A+"°", 0);
  else if(mode==="bisect-copy") q.figure=u5SplitAngleSVG(A, 2);
  else q.figure=u5SplitAngleSVG(A, 4);
  return q;
}, ["Track the measure in stages: a copy keeps the measure, a bisection halves it.", "Apply one stage at a time and write the measure after each stage."]);

E("u5-multi-step-context", 5, ["3.49","3.43"], 3, "gen", function(){
  var a=pick([34,42,46,52,58,64,70,76,82,88,94,100,106,112,118,124,128,132,136,142]);
  var ans=(180-a)/2;
  var ctx=pick(["A cross street crosses two parallel roads. A triangular traffic island is painted in one corner: its base angle is the supplement of the \\("+a+"^\\circ\\) street angle, and a centre stripe splits that base angle into two equal parts.","Two parallel hiking trails are crossed by one straight path. A wedge shaped sign sits in the angle supplementary to the \\("+a+"^\\circ\\) path angle, and a post splits that wedge angle into two equal parts.","Two parallel dock edges are crossed by a straight ramp. A triangular brace fills the angle supplementary to the \\("+a+"^\\circ\\) ramp angle, and a bolt line splits that brace angle into two equal parts."]);
  var q=mcq(ctx+" What is the measure of each part after the split?",
    {t:ans+"°", fb:"Yes: the supplementary angle is 180 - "+a+" = "+(180-a)+", and halving it gives "+ans+"."},
    u5DegOpts(ans,[180-a, a/2, 180-a/2]),
    "\\[ \\begin{aligned} \\text{supplementary angle} &= 180^\\circ - "+a+"^\\circ = "+(180-a)+"^\\circ \\\\ \\text{each part} &= \\frac{"+(180-a)+"^\\circ}{2} = "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a}); q.figure=u5SuppBisectSVG(a); return q;
}, ["Work in stages: first find the supplementary angle, then split it.", "A split into two equal parts means dividing by 2 after the supplement is found."]);

/* ---------- Constructed response (numq) ---------- */
E("u5-cr-comp-supp", 5, ["3.36"], 2, "gen", function(){
  var comp=ri(0,1)===0; var a=comp?ri(18,72):ri(35,145);
  var ans=comp?90-a:180-a;
  var ctx=pick(["A triangular garden marker sits in the corner of a square plot, filling one part of the corner angle","A brace crosses a straight fence rail, forming two angles along the rail","A paper flag is folded so two angles fill a square corner","A ramp meets a straight walkway, forming two angles along the walkway"]);
  var q=numq(ctx+". One angle measures "+a+"°. The two angles form a "+(comp?"complementary pair (they fill a right angle)":"supplementary pair (they fill a straight line)")+". Find the measure of the other angle, in degrees.",
    ans, 0.5,
    (comp?"Complementary angles add to \\(90^\\circ\\).":"Supplementary angles add to \\(180^\\circ\\).")+" \\[ \\begin{aligned} \\text{other angle} &= "+(comp?90:180)+"^\\circ - "+a+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a,comp:comp}); q.figure=u5PairSVG(a, comp); return q;
}, ["Recall the total for this kind of angle pair.", "Subtract the given angle from that total."]);

E("u5-cr-trans-find", 5, ["3.40"], 2, "gen", function(){
  var pairs=[
    {g:"TR",k:"BL",rel:"eq",name:"alternate interior angles"},
    {g:"TL",k:"BR",rel:"eq",name:"alternate interior angles"},
    {g:"TR",k:"BR",rel:"supp",name:"interior angles on the same side of the transversal"},
    {g:"TL",k:"BL",rel:"supp",name:"interior angles on the same side of the transversal"}];
  var p=pick(pairs); var a=ri(32,148);
  var ans=p.rel==="eq"?a:180-a;
  var q=numq("Two parallel lines are cut by a transversal, as shown in the diagram. One marked angle measures "+a+"°. Find the measure of the angle marked with a question mark, in degrees.",
    ans, 0.5,
    "The marked angles are "+p.name+". "+(p.rel==="eq"?"Those angles are equal when the lines are parallel, so the marked angle is also \\("+a+"^\\circ\\).":"Those angles add to \\(180^\\circ\\) when the lines are parallel: \\[ 180^\\circ - "+a+"^\\circ = "+ans+"^\\circ \\]")+" The answer is <b>"+ans+"°</b>.", {a:a,rel:p.rel});
  q.figure=transversalSVG(p.g,a+"°",p.k,"?"); return q;
}, ["Name the relationship between the two marked angles.", "Equal pairs keep the measure; same side interior pairs add to 180."]);

E("u5-cr-around-point", 5, ["3.49"], 2, "gen", function(){
  var a=ri(55,120), b=ri(45,110), c=ri(40,95);
  var ans=360-a-b-c;
  var ctx=pick(["A ceiling fan hub has three marked angles between its blades and one unmarked gap","A roundabout sign post carries three marked direction angles and one unmarked gap","A sprinkler head turns through three marked sweeps and one unmarked sweep"]);
  var q=numq(ctx+". The marked angles around the point are "+a+"°, "+b+"° and "+c+"°. Find the measure of the unmarked angle, in degrees.",
    ans, 0.5,
    "Angles around a point add to \\(360^\\circ\\). \\[ \\begin{aligned} \\text{unmarked angle} &= 360^\\circ - "+a+"^\\circ - "+b+"^\\circ - "+c+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a,b:b,c:c}); q.figure=u5AroundSVG([a,b,c,ans],[a+"°",b+"°",c+"°","?"]); return q;
}, ["Angles around a point share one total: recall what it is.", "Subtract all the marked angles from that total."]);

E("u5-cr-replicate-bisect", 5, ["3.51","3.52"], 2, "gen", function(){
  var A=pick([44,52,58,64,70,78,84,86,92,94,102,108,114,122,128,136,142,148,154,156]);
  var ans=A/2;
  var ctx=pick(["A cabinet maker copies the angle of a corner template onto a trim piece, then bisects the copied angle to find its centre line","A quilter replicates the angle of a pattern piece onto fabric, then bisects the copy to mark a fold line","A metal worker copies the angle of a bracket onto a new piece, then bisects the copy before drilling","A sign maker copies the angle of a sample board onto a new board, then bisects the copy to centre a painted stripe","A boat builder copies the angle of a hull template onto a plank, then bisects the copy to mark the centre of a joint"]);
  var q=numq(ctx+". The template angle measures "+A+"°. Find the measure of each angle formed when the copy is bisected, in degrees.",
    ans, 0.5,
    "Replication keeps the measure, so the copy also measures \\("+A+"^\\circ\\). Bisection splits an angle into two equal parts. \\[ \\begin{aligned} \\text{each part} &= \\frac{"+A+"^\\circ}{2} \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {A:A}); q.figure=u5SplitAngleSVG(A, 2); return q;
}, ["A copy has the same measure as the original angle.", "Bisecting divides that measure into two equal parts."]);

E("u5-cr-perp-transversal", 5, ["3.43"], 2, "gen", function(){
  var a=ri(24,66); var ans=90-a;
  var ctx=pick(["Two parallel garden edging lines are crossed by a straight path that is perpendicular to both of them. A diagonal stepping stone edge crosses the path and makes an angle with one edging line","Two parallel dock boards are crossed by a straight beam that is perpendicular to both of them. A diagonal brace crosses the beam and makes an angle with one board","Two parallel yard lines on a field are crossed by a straight line that is perpendicular to both of them. A diagonal rope crosses that line and makes an angle with one yard line"]);
  var q=numq(ctx+" of "+a+"°, measured inside the strip between the parallel lines. The diagonal and the perpendicular line form a right angle together with that angle. Find the angle between the diagonal and the perpendicular line, in degrees.",
    ans, 0.5,
    "The perpendicular line meets the parallel line at \\(90^\\circ\\), and the diagonal splits that right angle into two parts. \\[ \\begin{aligned} \\text{angle with the perpendicular} &= 90^\\circ - "+a+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a}); q.figure=u5PerpTransSVG(a); return q;
}, ["Perpendicular lines form a right angle: that total is the key.", "The diagonal splits the right angle, so subtract the given part."]);

E("u5-cr-protractor", 5, ["3.44"], 2, "gen", function(){
  var a=ri(18,162); var base=pick([0,15,30,45,60]);
  var q=numq("The diagram shows an angle drawn to scale. Measure the angle with a protractor and give its measure in degrees.",
    a, 4,
    "Line the centre of the protractor up with the vertex and one ray up with zero, then read the scale where the second ray crosses. The second ray crosses at \\("+a+"^\\circ\\). The answer is <b>"+a+"°</b>.", {a:a,base:base});
  q.figure=u5AngleSVG(a,"",base); return q;
}, ["Put the centre of the protractor on the vertex and one ray on the zero line.", "Read the scale that starts at zero on that ray, where the second ray crosses."]);

E("u5-cr-angle-chase", 5, ["3.43","3.49"], 3, "gen", function(){
  var a=pick([33,39,44,52,57,63,68,74,79,83,88,92,97,103,108,111,117,124,129,135,141,147]);
  var ans=180-a;
  var scene=pick(["Two parallel harbour ropes are cut by a straight walkway line","Two parallel hiking trails are cut by a straight connecting path","Two parallel dock edges are cut by a straight ramp line","Two parallel garden paths are cut by a straight hose line"]);
  var q=numq(scene+". One angle formed measures "+a+"°. Angle B is an alternate interior angle to that angle. Angle C sits on a straight line with angle B, on the same side of the transversal. Find the measure of angle C, in degrees.",
    ans, 0.5,
    "Alternate interior angles formed by parallel lines are equal, so angle B measures \\("+a+"^\\circ\\). Angles on a straight line add to \\(180^\\circ\\). \\[ \\begin{aligned} \\text{angle C} &= 180^\\circ - "+a+"^\\circ \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+"°</b>.", {a:a});
  q.figure=transversalSVG("TR",a+"°","BL","B"); return q;
}, ["Find angle B first using the parallel line relationship.", "Then use the straight line total for angles B and C."]);

E("u5-cr-trans-algebra", 5, ["3.40","3.39"], 3, "gen", function(){
  var x0=pick([8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,24]);
  var aC=pick([3,4,5]), bC=pick([1,2]);
  var A=aC*x0, B=180-A, c=B-bC*x0, guard=0;
  while((A<30||A>150||B<30||c<5)&&guard<40){guard++; x0=pick([10,12,14,15,16,18,20]); aC=pick([3,4]); bC=1; A=aC*x0; B=180-A; c=B-bC*x0;}
  if(A<30||A>150||B<30||c<5){x0=15;aC=4;bC=1;A=60;B=120;c=105;}
  var askedExpr="("+bC+"x + "+c+")°", givenExpr="("+aC+"x)°";
  var q=numq("Two parallel lines are cut by a transversal. Two interior angles on the same side of the transversal measure "+givenExpr+" and "+askedExpr+". Find the measure of the angle marked "+askedExpr+", in degrees.",
    B, 0.5,
    "Interior angles on the same side of a transversal add to \\(180^\\circ\\) when the lines are parallel. \\[ \\begin{aligned} "+aC+"x + "+bC+"x + "+c+" &= 180 \\\\ "+(aC+bC)+"x &= "+(180-c)+" \\\\ x &= "+x0+" \\end{aligned} \\] Substituting back: \\("+bC+"x + "+c+" = "+bC+"("+x0+") + "+c+" = "+B+"\\). The answer is <b>"+B+"°</b>.", {x0:x0,B:B,c:c,aC:aC,bC:bC});
  q.figure=transversalSVG("TR",givenExpr,"BR",askedExpr); return q;
}, ["Same side interior angles add to 180: build the equation from that total.", "Solve for x, then substitute back into the asked expression."]);
