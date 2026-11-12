// Math 8 Unit 4 Measuring Prisms and Cylinders question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 1281 to 1744).
// CRMARKS: u4-sa-cylinder=3
// CRMARKS: u4-sa-open-tank=3
// CRMARKS: u4-sa-problem-wrap=2
// CRMARKS: u4-sa-rect-prism=3
// CRMARKS: u4-sa-tri-prism=3
// CRMARKS: u4-vol-cylinder-diam=2
// CRMARKS: u4-vol-tri-prism=2
/* Unit 4: Measuring Prisms and Cylinders */
function u4r1(x){return Math.round(x*10)/10;}
function u4r2(x){return Math.round(x*100)/100;}
function u4d3(val,cands){var out=[];for(var i=0;i<cands.length;i++){var c=cands[i];if(c!==val&&c>0&&out.indexOf(c)<0){out.push(c);}if(out.length===3){break;}}return out;}
function u4boxSVG(l,w,h){
  var s='<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg">';
  s+='<polygon points="70,75 120,37 230,37 180,75" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="180,75 230,37 230,117 180,155" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="70" y="75" width="110" height="80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="120" y1="37" x2="120" y2="117" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+=_txt(125,172,l+" cm",13,false);
  s+=_txt(56,115,h+" cm",13,false);
  s+=_txt(212,26,w+" cm",13,false);
  return s+"</svg>";
}
function u4triSVG(a,b,c,L){
  var s='<svg viewBox="0 0 310 190" xmlns="http://www.w3.org/2000/svg">';
  s+='<polygon points="150,120 240,120 150,40" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="60,150 150,120 150,40 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="60,150 150,150 60,70" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="150" y1="150" x2="150" y2="120" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+='<line x1="240" y1="120" x2="150" y2="150" stroke="'+FIG_INK+'" stroke-width="1.4" stroke-dasharray="5 4"/>';
  s+=_txt(105,166,b+" cm",13,false);
  s+=_txt(44,110,a+" cm",13,false);
  s+=_txt(96,84,c+" cm",13,false);
  s+=_txt(198,32,L+" cm",13,false);
  return s+"</svg>";
}
function u4cylSVG(r,h,useD){
  var s='<svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">';
  s+='<ellipse cx="150" cy="52" rx="56" ry="16" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<path d="M 94 52 L 94 148 A 56 16 0 0 0 206 148 L 206 52" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  if(useD){
    s+='<line x1="94" y1="52" x2="206" y2="52" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+=_txt(150,30,(2*r)+" cm",13,false);
  } else {
    s+='<line x1="150" y1="52" x2="206" y2="52" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+=_txt(178,40,r+" cm",13,false);
  }
  s+=_txt(224,104,h+" cm",13,false);
  return s+"</svg>";
}
function u4netSVG(kind,v1,v2,v3){
  var s='<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg">';
  if(kind==="rect"){
    s+='<rect x="110" y="60" width="70" height="46" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="40" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="180" y="60" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="110" y="14" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="110" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="180" y="106" width="70" height="46" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+=_txt(145,50,v1+" cm",12,false);
    s+=_txt(145,170,v2+" cm",12,false);
    s+=_txt(268,86,v3+" cm",12,false);
  } else if(kind==="tri"){
    s+='<rect x="30" y="70" width="66" height="44" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="96" y="70" width="66" height="44" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<rect x="162" y="70" width="66" height="44" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="96,70 162,70 129,30" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<polygon points="96,114 162,114 129,154" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+=_txt(129,168,v1+" cm",12,false);
    s+=_txt(246,96,v2+" cm",12,false);
    s+=_txt(178,44,v3+" cm",12,false);
  } else {
    s+='<rect x="80" y="62" width="140" height="56" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<circle cx="150" cy="34" r="26" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<circle cx="150" cy="146" r="26" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
    s+='<line x1="150" y1="34" x2="176" y2="34" stroke="'+FIG_INK+'" stroke-width="1.4"/>';
    s+=_txt(150,140,"",12,false);
    s+=_txt(238,94,v1+" cm",12,false);
    s+=_txt(196,26,v2+" cm",12,false);
    s+=_txt(150,182,v3+" cm",12,false);
  }
  return s+"</svg>";
}
function u4mini(kind,ox){
  var s="";
  if(kind==="rect"){
    s+='<rect x="'+(ox+28)+'" y="55" width="22" height="18" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+6)+'" y="55" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+50)+'" y="55" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+28)+'" y="37" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+28)+'" y="73" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+28)+'" y="91" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else if(kind==="tri"){
    s+='<rect x="'+(ox+4)+'" y="55" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+26)+'" y="55" width="22" height="18" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<rect x="'+(ox+48)+'" y="55" width="22" height="18" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+26)+',55 '+(ox+48)+',55 '+(ox+37)+',38" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+26)+',73 '+(ox+48)+',73 '+(ox+37)+',90" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else if(kind==="cyl"){
    s+='<rect x="'+(ox+16)+'" y="50" width="44" height="28" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<circle cx="'+(ox+38)+'" cy="37" r="11" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<circle cx="'+(ox+38)+'" cy="91" r="11" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  } else {
    s+='<rect x="'+(ox+27)+'" y="52" width="24" height="24" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+27)+',52 '+(ox+51)+',52 '+(ox+39)+',34" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+27)+',76 '+(ox+51)+',76 '+(ox+39)+',94" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+27)+',52 '+(ox+27)+',76 '+(ox+10)+',64" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    s+='<polygon points="'+(ox+51)+',52 '+(ox+51)+',76 '+(ox+68)+',64" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  }
  return s;
}

E("u4-net-match", 4, ["10.1"], 1, "gen", function(){
  var kind=pick(["rect","tri","cyl"]);
  var v1=ri(3,14), v2=ri(3,14), v3=ri(3,14);
  var names={rect:"Right rectangular prism", tri:"Right triangular prism", cyl:"Right cylinder"};
  var others=["Right rectangular prism","Right triangular prism","Right cylinder","Square-based pyramid"].filter(function(n){return n!==names[kind];});
  var opts=others.map(function(n){return {t:n, fb:"Count the shapes in the net and picture the fold: that object has a different set of faces."};});
  var q=mcq("The diagram shows a net laid flat. Which 3-D object does this net fold to make?",
    {t:names[kind], fb:"Yes: the shapes in the net are exactly the faces of that object."}, opts,
    "Picture each flap folding up around the shaded middle piece. The flat shapes become the faces of the solid, and this net folds to make <b>"+names[kind].toLowerCase()+"</b>.",
    {mode:kind, v1:v1, v2:v2, v3:v3});
  q.figure=u4netSVG(kind,v1,v2,v3);
  return q;
}, ["Count each shape in the net and think about which faces the finished object needs.", "Start with the shaded middle piece and fold each flap up around it in your mind."]);

E("u4-faces-identify", 4, ["10.3"], 1, "gen", function(){
  var kind=pick(["rect","tri","cyl"]);
  var a=ri(3,12), b=ri(3,12), c=ri(4,15), L=ri(5,16);
  var prompt, correct, cands, sol, fig;
  if(kind==="rect"){
    prompt="A right rectangular prism has length "+a+" cm, width "+b+" cm and height "+c+" cm. How many faces does it have in total?";
    correct=6; cands=[5,4,8,12,3];
    sol="A rectangular prism has a front and back, a left and right side, and a top and bottom: \\[ 2+2+2 = 6 \\] It has <b>6 faces</b>.";
    fig=u4boxSVG(a,b,c);
  } else if(kind==="tri"){
    prompt="A right triangular prism is "+L+" cm long, and each triangular end has sides of "+a+" cm, "+b+" cm and "+c+" cm. How many faces does it have in total?";
    correct=5; cands=[6,4,7,9,3];
    sol="A triangular prism has 2 triangular ends and 3 rectangular sides: \\[ 2+3 = 5 \\] It has <b>5 faces</b>.";
    fig=u4triSVG(a,b,c,L);
  } else {
    prompt="A right cylinder has radius "+a+" cm and height "+L+" cm. How many flat faces does it have?";
    correct=2; cands=[1,3,0,4,5];
    sol="A cylinder has a flat circle at the top and a flat circle at the bottom. The side is curved, so it is not a flat face. It has <b>2 flat faces</b>.";
    fig=u4cylSVG(a,L,false);
  }
  var ds=u4d3(correct,cands);
  var opts=ds.map(function(d){return {t:String(d), fb:"Count again, one kind of face at a time: ends, then sides, then top and bottom."};});
  var q=mcq(prompt, {t:String(correct), fb:"Yes: that count covers every face of the solid exactly once."}, opts, sol, {mode:kind, a:a, b:b, L:L});
  q.figure=fig;
  return q;
}, ["List the faces by kind first: ends, sides, top and bottom.", "Count the faces of one kind, then add the counts for the other kinds."]);

E("u4-vol-base-times-height", 4, ["9.7"], 1, "gen", function(){
  var B=ri(8,60), h=ri(3,15);
  var obj=pick(["right prism","right triangular prism","right rectangular prism"]);
  var q=numq("A "+obj+" has a base with area "+B+" cm\\(^{2}\\) and a height of "+h+" cm. Find its volume, in cubic centimetres.", B*h, 0.01,
    "The volume of a right prism is the base area multiplied by the height: \\[ \\begin{aligned} V &= B \\times h \\\\ &= "+B+" \\times "+h+" \\\\ &= "+(B*h)+" \\end{aligned} \\] The volume is <b>"+(B*h)+" cm\\(^{3}\\)</b>.",
    {mode:"base-height", B:B, h:h}); q.figure=m8PrismBaseSVG(obj==="right triangular prism"?"tri":(obj==="right rectangular prism"?"rect":"generic"), B+" cm\u00B2", h+" cm"); return q;
}, ["For any right prism, volume is base area multiplied by height.", "Multiply the given base area by the given height."]);

E("u4-sa-from-net", 4, ["9.3"], 1, "gen", function(){
  var l=ri(3,11), w=ri(3,11), h=ri(2,9);
  var top=l*w, front=l*h, side=w*h;
  var sa=2*(top+front+side);
  var once=top+front+side;
  var ds=u4d3(sa,[once,2*top+front+side,top+2*front+2*side,sa+top,4*(top+front+side)]);
  var opts=ds.map(function(d){
    var fb=(d===once)?"That adds each different face only once: every face on a prism has a matching partner opposite it.":"That total double-counts or misses a face: each of the three face areas must appear exactly twice.";
    return {t:String(d), fb:fb};
  });
  var q=mcq("A net of a right rectangular prism has three different face areas: "+top+" cm\\(^{2}\\) for the top, "+front+" cm\\(^{2}\\) for the front and "+side+" cm\\(^{2}\\) for the side. What is the surface area of the prism, in square centimetres?",
    {t:String(sa), fb:"Yes: each face area appears twice, once for each side of the prism."}, opts,
    "Surface area is the total area of the 2-D faces in the net. Each different face has an identical partner opposite it: \\[ \\begin{aligned} SA &= 2("+top+"+"+front+"+"+side+") \\\\ &= 2("+once+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"net-areas", l:l, w:w, h:h}); q.figure=m8NetAreaSVG(top,front,side); return q;
}, ["Surface area is the sum of the areas of all the flat faces in the net.", "Add the three different face areas, then double the total because each face has a partner."]);

E("u4-net-choose", 4, ["10.11"], 2, "gen", function(){
  var target=pick(["rect","tri","cyl"]);
  var names={rect:"right rectangular prism", tri:"right triangular prism", cyl:"right cylinder"};
  var kinds=[target].concat(["rect","tri","cyl","pyr"].filter(function(k){return k!==target;})).slice(0,4);
  kinds=shuffle(kinds);
  var letter="ABCD"[kinds.indexOf(target)];
  var svg='<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg">';
  for(var i=0;i<4;i++){ svg+=u4mini(kinds[i],i*80); svg+=_txt(i*80+39,132,"ABCD"[i],14,true); }
  svg+="</svg>";
  var opts=["A","B","C","D"].filter(function(x){return x!==letter;}).map(function(x){
    return {t:"Net "+x, fb:"Picture that net folding up: its shapes make a different object than the one named."};
  });
  var q=mcq("Four nets are shown, labelled A, B, C and D. Which net folds to make a "+names[target]+"?",
    {t:"Net "+letter, fb:"Yes: its flat shapes are exactly the faces of a "+names[target]+"."}, opts,
    "Match the flat shapes to the faces of a "+names[target]+". Only one net has the right shapes in an arrangement that folds together, and it is <b>Net "+letter+"</b>.",
    {mode:target, letter:letter});
  q.figure=svg;
  return q;
}, ["List the faces the named object needs, then check each net for those shapes.", "A cylinder needs circles, a triangular prism needs triangles, and a rectangular prism needs only rectangles."]);

E("u4-net-predict", 4, ["10.2","10.1"], 1, "var", varset([
  function(){
    var q=mcq("A flat net is made of 2 triangles and 3 rectangles joined edge to edge. Which object can be made by folding this net?",
      {t:"Right triangular prism", fb:"Yes: the triangles become the ends and the rectangles wrap around as the sides."},
      [{t:"Right cylinder", fb:"A cylinder net needs circles for its ends: this net has none."},
       {t:"Right rectangular prism", fb:"A rectangular prism has only rectangular faces: the 2 triangles rule it out."},
       {t:"Square-based pyramid", fb:"A pyramid has one base and triangular sides meeting at a point: these rectangles form sides instead."}],
      "The 2 triangles become the two ends, and the 3 rectangles fold around to join them. The object is a <b>right triangular prism</b>.",
      {mode:"static-tri-net"}); q.figure=m8NetPlainSVG("tri",null); return q;
  },
  function(){
    var q=mcq("A flat net is made of 1 long rectangle with a circle joined to one long edge and a matching circle joined to the other long edge. Which object can be made by folding and rolling this net?",
      {t:"Right cylinder", fb:"Yes: the rectangle rolls into the curved side and the circles close the ends."},
      [{t:"Right triangular prism", fb:"A triangular prism needs triangular ends: this net has circles instead."},
       {t:"Right rectangular prism", fb:"A rectangular prism is built only from rectangles: the circles rule it out."},
       {t:"Square-based pyramid", fb:"A pyramid has triangular sides meeting at a point: nothing here folds to a point."}],
      "The long rectangle rolls into a curved side, and the two circles become the top and bottom. The object is a <b>right cylinder</b>.",
      {mode:"static-cyl-net"}); q.figure=m8NetPlainSVG("cyl",null); return q;
  },
  function(){
    var q=mcq("A flat net is made of 6 rectangles arranged in a cross shape, forming 3 matching pairs. Which object can be made by folding this net?",
      {t:"Right rectangular prism", fb:"Yes: the 3 pairs become the front and back, the sides, and the top and bottom."},
      [{t:"Right cylinder", fb:"A cylinder net needs circles for its ends: this net has none."},
       {t:"Right triangular prism", fb:"A triangular prism needs 2 triangular faces: every piece here is a rectangle."},
       {t:"Square-based pyramid", fb:"A pyramid needs triangular faces meeting at a point: these rectangles fold into a box shape."}],
      "Six rectangles in 3 matching pairs fold into opposite faces of a box shape. The object is a <b>right rectangular prism</b>.",
      {mode:"static-rect-net"}); q.figure=m8NetPlainSVG("rect",null); return q;
  }
]), ["Sort the flat shapes first: triangles, rectangles and circles each point to a different solid.", "Match the end shapes in the net to the ends of the object it will make."]);

E("u4-net-build-parts", 4, ["10.12"], 1, "gen", function(){
  var mode=pick(["tri","cyl","rect","incomplete-tri","incomplete-cyl"]);
  if(mode==="tri"){
    var Lt=ri(5,18), at=ri(3,12), bt=ri(3,12);
    var q=mcq("Ren cuts out flat pieces to build a right triangular prism from a net. The prism is "+Lt+" cm long and its triangular ends have legs of "+at+" cm and "+bt+" cm. Which set of pieces does the net need?",
      {t:"2 triangles and 3 rectangles", fb:"Yes: triangles for the two ends and rectangles for the three sides."},
      [{t:"2 triangles and 4 rectangles", fb:"That is one rectangle too many: a triangular prism has only 3 rectangular sides."},
       {t:"3 triangles and 2 rectangles", fb:"The counts are swapped: there are 2 ends and 3 sides on this prism."},
       {t:"2 circles and 3 rectangles", fb:"Circles belong to a cylinder net: this prism has triangular ends."}],
      "A right triangular prism has 2 triangular ends and 3 rectangular sides, so its net needs <b>2 triangles and 3 rectangles</b>.",
      {mode:"tri-parts"}); q.figure=m8TriPrismLabSVG(at+" cm",bt+" cm",Lt+" cm"); return q;
  }
  if(mode==="cyl"){
    var rc=ri(2,10), hc=ri(4,16);
    var q=mcq("Sofia cuts out flat pieces to build a right cylinder from a net. The cylinder has radius "+rc+" cm and height "+hc+" cm. Which set of pieces does the net need?",
      {t:"2 circles and 1 rectangle", fb:"Yes: the rectangle rolls into the curved side and the circles close the ends."},
      [{t:"2 circles and 2 rectangles", fb:"One rectangle is enough for the curved side: a second one has nowhere to fold."},
       {t:"1 circle and 1 rectangle", fb:"A cylinder has two round ends, top and bottom: one circle leaves an end open."},
       {t:"2 triangles and 1 rectangle", fb:"Triangles belong to a prism net: a cylinder has round ends instead."}],
      "A right cylinder has 2 circular ends and 1 curved side that unrolls into a rectangle, so its net needs <b>2 circles and 1 rectangle</b>.",
      {mode:"cyl-parts"}); q.figure=u4cylSVG(rc,hc,false); return q;
  }
  if(mode==="rect"){
    var lr=ri(4,15), wr=ri(3,12), hr=ri(2,10);
    var q=mcq("Marcus cuts out flat pieces to build a right rectangular prism from a net. The prism is "+lr+" cm long, "+wr+" cm wide and "+hr+" cm high. Which set of pieces does the net need?",
      {t:"6 rectangles in 3 matching pairs", fb:"Yes: each pair forms two opposite faces of the prism."},
      [{t:"6 rectangles all the same size", fb:"Six equal rectangles would make a cube: a general rectangular prism has 3 different pairs."},
       {t:"4 rectangles and 2 squares", fb:"That set only works for one special prism: the full net is 6 rectangles in pairs."},
       {t:"5 rectangles and 1 triangle", fb:"A rectangular prism has no triangular faces at all."}],
      "A right rectangular prism has 6 faces, and opposite faces match, so its net needs <b>6 rectangles in 3 matching pairs</b>.",
      {mode:"rect-parts"}); q.figure=u4boxSVG(lr,wr,hr); return q;
  }
  if(mode==="incomplete-tri"){
    var L=ri(5,14);
    var q=mcq("An unfinished net for a right triangular prism, "+L+" cm long, shows the 3 rectangles in a row but nothing else. Which pieces must be added to complete the net?",
      {t:"2 matching triangles, one on each side of the row", fb:"Yes: the two triangular ends are the only faces still missing."},
      [{t:"2 matching rectangles, one on each side of the row", fb:"Rectangles would add extra sides: the missing faces are the two ends."},
       {t:"1 triangle in the middle of the row", fb:"One triangle makes only one end: the prism needs an end at each side."},
       {t:"2 matching circles, one on each side of the row", fb:"Circles are the ends of a cylinder: this prism has triangular ends."}],
      "The 3 rectangles form the sides, so only the 2 ends are missing. The pieces to add are <b>2 matching triangles, one on each side of the row</b>.",
      {mode:"incomplete-tri", L:L}); q.figure=m8NetPlainSVG("inctri",null); return q;
  }
  var r=ri(3,9);
  var q=mcq("An unfinished net for a right cylinder shows the long rectangle and one circle of radius "+r+" cm. Which piece must be added to complete the net?",
    {t:"A second circle with radius "+r+" cm", fb:"Yes: the second end must match the first circle exactly."},
    [{t:"A second circle with radius "+(2*r)+" cm", fb:"That circle is too big: both ends of a cylinder are the same size."},
     {t:"A square with side "+r+" cm", fb:"A square cannot close a round end: the missing face is a circle."},
     {t:"A second rectangle the same size as the first", fb:"The curved side is already complete: the missing piece is the other end."}],
    "A cylinder has two matching circular ends, and one is still missing. The piece to add is <b>a second circle with radius "+r+" cm</b>.",
    {mode:"incomplete-cyl", r:r}); q.figure=m8NetPlainSVG("inccyl",r+" cm"); return q;
}, ["Count the faces of the finished object, then match the flat pieces to those faces.", "Name the ends of the object first, then count the sides that join them."]);

E("u4-sa-rect-prism", 4, ["9.4"], 2, "gen", function(){
  var l=ri(3,14), w=ri(3,12), h=ri(2,10);
  var sa=2*(l*w+l*h+w*h);
  var q=numq("Find the surface area of the right rectangular prism shown, in square centimetres.", sa, 0.01,
    "Work face by face. The front and back are "+l+" by "+h+", the sides are "+w+" by "+h+", and the top and bottom are "+l+" by "+w+": \\[ \\begin{aligned} SA &= 2(lw+lh+wh) \\\\ &= 2("+fmt(l*w)+"+"+fmt(l*h)+"+"+fmt(w*h)+") \\\\ &= 2("+fmt(l*w+l*h+w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"rect-sa", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Picture the net: three different faces, each with a matching partner.", "Find the area of the top, the front and one side, add them, then double."]);

E("u4-sa-tri-prism", 4, ["9.4"], 2, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,16);
  var sa=a*b+(a+b+c)*L;
  var q=numq("Find the surface area of the right triangular prism shown, in square centimetres.", sa, 0.01,
    "Two triangular ends plus three rectangles along the length: \\[ \\begin{aligned} SA &= 2\\left("+FR(1,2)+"\\times "+a+"\\times "+b+"\\right)+("+a+"+"+b+"+"+c+")\\times "+L+" \\\\ &= "+fmt(a*b)+"+"+fmt((a+b+c)*L)+" \\\\ &= "+sa+" \\end{aligned} \\] The surface area is <b>"+sa+" cm\\(^{2}\\)</b>.",
    {mode:"tri-sa", a:a, b:b, c:c, L:L});
  q.figure=u4triSVG(a,b,c,L);
  return q;
}, ["Split the surface into the two triangular ends and the three rectangles.", "Find the ends first, then multiply the perimeter of one end by the length for the rectangles."]);

E("u4-sa-cylinder", 4, ["9.6"], 2, "gen", function(){
  var r=ri(2,9), h=ri(3,14);
  var sa=u4r1(2*3.14*r*(r+h));
  var q=numq("Find the surface area of the right cylinder shown. Use \\(\\pi = 3.14\\) and give your answer in square centimetres, to one decimal place.", sa, 0.6,
    "Two circles plus the curved side, which unrolls into a rectangle: \\[ \\begin{aligned} SA &= 2\\pi r^{2}+2\\pi r h \\\\ &= 2(3.14)("+r+")("+r+"+"+h+") \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The surface area is <b>"+fmt(sa)+" cm\\(^{2}\\)</b>.",
    {mode:"cyl-sa", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Unroll the cylinder in your mind: two circles and one rectangle.", "Use the radius for both circle areas and for the width around the curved side."]);

E("u4-sa-problem-wrap", 4, ["9.5"], 2, "gen", function(){
  if(pick(["cans","paper"])==="cans"){
    var l=ri(4,10), w=ri(3,9), h=ri(3,8);
    var sa=2*(l*w+l*h+w*h);
    var cover=pick([20,25,30,40,50]);
    var cans=Math.ceil(sa/cover-0.0000001);
    var q=numq("A storage box shaped like a right rectangular prism measures "+l+" m long, "+w+" m wide and "+h+" m high. It is painted on all outside faces. One can of paint covers "+cover+" square metres. How many cans of paint are needed?", cans, 0.01,
      "Find the surface area first, then divide by the coverage and round up: \\[ \\begin{aligned} SA &= 2("+fmt(l*w)+"+"+fmt(l*h)+"+"+fmt(w*h)+") \\\\ &= "+sa+" \\end{aligned} \\] Then \\("+sa+" \\div "+cover+" \\approx "+fmt(u4r2(sa/cover))+"\\), and a part can cannot be bought. The number of cans needed is <b>"+cans+"</b>.",
      {mode:"paint-cans", l:l, w:w, h:h, cover:cover}); q.figure=m8BoxLabSVG(l+" m",w+" m",h+" m",false); return q;
  }
  var l2=ri(20,60)/2, w2=ri(16,44)/2, h2=ri(12,36)/2;
  var sa2=2*(l2*w2+l2*h2+w2*h2);
  var q=numq("A gift box shaped like a right rectangular prism measures "+fmt(l2)+" cm long, "+fmt(w2)+" cm wide and "+fmt(h2)+" cm high. Wrapping paper covers all faces with no overlap. How many square centimetres of paper are needed?", sa2, 0.01,
    "The paper must cover the whole surface of the box: \\[ \\begin{aligned} SA &= 2("+fmt(l2*w2)+"+"+fmt(l2*h2)+"+"+fmt(w2*h2)+") \\\\ &= "+fmt(sa2)+" \\end{aligned} \\] The paper needed is <b>"+fmt(sa2)+" cm\\(^{2}\\)</b>.",
    {mode:"wrap-paper", l:l2, w:w2, h:h2}); q.figure=m8BoxLabSVG(fmt(l2)+" cm",fmt(w2)+" cm",fmt(h2)+" cm",false); return q;
}, ["Work out the total surface area before using the coverage or finishing the problem.", "Divide the surface area by the coverage per can and round up, since part cans cannot be bought."]);

E("u4-vol-rect-prism", 4, ["9.11"], 1, "gen", function(){
  var l=ri(3,13), w=ri(2,11), h=ri(2,10);
  var V=l*w*h;
  var sa=2*(l*w+l*h+w*h);
  var ds=u4d3(V,[sa,l+w+h,l*w,l*w*h+l,l*w*(h+1),l*(w+1)*h]);
  var opts=ds.map(function(d){
    var fb=(d===sa)?"That is the surface area in square units: volume counts the space inside, in cubic units.":"That value comes from the wrong combination of dimensions: volume multiplies all three together.";
    return {t:String(d), fb:fb};
  });
  var q=mcq("What is the volume of the right rectangular prism shown, in cubic centimetres?",
    {t:String(V), fb:"Yes: length times width times height gives the space inside."}, opts,
    "Multiply the three dimensions: \\[ \\begin{aligned} V &= l \\times w \\times h \\\\ &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+V+" \\end{aligned} \\] The volume is <b>"+V+" cm\\(^{3}\\)</b>.",
    {mode:"rect-vol", l:l, w:w, h:h});
  q.figure=u4boxSVG(l,w,h);
  return q;
}, ["Volume counts the space inside the prism, so all three dimensions are used.", "Multiply length by width by height."]);

E("u4-vol-tri-prism", 4, ["9.7","9.11"], 1, "gen", function(){
  var tr=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[12,16,20]]);
  var a=tr[0], b=tr[1], c=tr[2]; var L=ri(4,16);
  var B=a*b/2; var V=B*L;
  var q=numq("Find the volume of the right triangular prism shown, in cubic centimetres.", V, 0.01,
    "Find the area of the triangular base first, then multiply by the length of the prism: \\[ \\begin{aligned} B &= "+FR(1,2)+"\\times "+a+"\\times "+b+" = "+fmt(B)+" \\\\ V &= B \\times L \\\\ &= "+fmt(B)+" \\times "+L+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The volume is <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"tri-vol", a:a, b:b, c:c, L:L});
  q.figure=u4triSVG(a,b,c,L);
  return q;
}, ["Volume of a prism is base area multiplied by the length it runs for.", "Find the triangle area with one half times leg times leg, then multiply by the prism length."]);

E("u4-vol-cylinder", 4, ["9.9"], 1, "gen", function(){
  var r=ri(2,10), h=ri(3,15);
  var V=u4r1(3.14*r*r*h);
  var q=numq("Find the volume of the right cylinder shown. Use \\(\\pi = 3.14\\) and give your answer in cubic centimetres, to one decimal place.", V, 0.6,
    "A cylinder is a prism with a circular base, so its volume is base area times height: \\[ \\begin{aligned} V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The volume is <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"cyl-vol", r:r, h:h});
  q.figure=u4cylSVG(r,h,false);
  return q;
}, ["Treat the cylinder like a prism whose base is a circle.", "Find the circle area with pi times radius squared, then multiply by the height."]);

E("u4-vol-missing-height", 4, ["9.7"], 1, "gen", function(){
  var h=ri(2,15), B=pick([6,8,10,12,14,15,16,18,20,24,25,28,30,35,40,50]);
  var V=B*h;
  var kind=pick(["prism","tri","cylinder"]);
  var label={prism:"right prism", tri:"right triangular prism", cylinder:"right cylinder"}[kind];
  var ds=u4d3(h,[h+1,h-1,h+2,2*h,V-B]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Try again: the height is the volume divided by the base area, and "+B+" times "+d+" is not "+V+"."};});
  var q=mcq("The volume of a "+label+" is "+V+" cm\\(^{3}\\), and the area of its base is "+B+" cm\\(^{2}\\). What is its height, in centimetres?",
    {t:String(h), fb:"Yes: "+B+" times "+h+" gives the volume "+V+"."}, opts,
    "Volume is base area times height, so divide the volume by the base area: \\[ \\begin{aligned} h &= V \\div B \\\\ &= "+V+" \\div "+B+" \\\\ &= "+h+" \\end{aligned} \\] The height is <b>"+h+" cm</b>.",
    {mode:kind, B:B, h:h}); q.figure=m8PrismBaseSVG(kind==="tri"?"tri":(kind==="cylinder"?"cyl":"generic"), B+" cm\u00B2", "?"); return q;
}, ["Volume equals base area times height, so one of those values is missing here.", "Divide the volume by the base area to undo the multiplication."]);

E("u4-base-volume-link", 4, ["9.8"], 1, "var", varset([
  function(){
    var q=mcq("A right prism has a base area of 24 cm\\(^{2}\\). Layers of the base shape, each 1 cm thick, are stacked to a height of 5 cm. Which statement explains the volume?",
      {t:"Each layer holds 24 cm\\(^{3}\\), so 5 layers hold 120 cm\\(^{3}\\) in total", fb:"Right: the base area gives the volume of one layer, and the height counts the layers."},
      [{t:"Each layer holds 5 cm\\(^{3}\\), so 5 layers hold 25 cm\\(^{3}\\) in total", fb:"The layer volume comes from the base area, not the height: swap the two numbers."},
       {t:"The volume is 24 plus 5, which is 29 cm\\(^{3}\\), found by adding base and height", fb:"Stacking layers multiplies rather than adds: think of repeated layers, not a sum."},
       {t:"The volume depends only on the shape of the base, so it stays 24 cm\\(^{3}\\)", fb:"A taller stack holds more: the height must enter the calculation."}],
      "One layer, 1 cm thick, has volume equal to the base area: 24 cm\\(^{3}\\). Stacking 5 layers gives \\(24 \\times 5 = 120\\) cm\\(^{3}\\). The volume is <b>120 cm\\(^{3}\\), found as base area times height</b>.",
      {mode:"static-layers"}); q.figure=m8LayersSVG("24 cm\u00B2","5 cm",5); return q;
  },
  function(){
    var q=mcq("Two right prisms have the same height. Prism P has a base area of 18 cm\\(^{2}\\) and Prism Q has a base area of 36 cm\\(^{2}\\). How do their volumes compare?",
      {t:"Prism Q has twice the volume of Prism P", fb:"Right: with equal heights, doubling the base area doubles the volume."},
      [{t:"The two prisms have equal volumes because their heights match", fb:"Equal heights alone do not equalize volume: the base areas differ."},
       {t:"Prism Q has four times the volume of Prism P", fb:"The base area doubled, it did not grow by a factor of four."},
       {t:"Prism P has twice the volume of Prism Q", fb:"The prism with the larger base area holds more, not less."}],
      "Volume is base area times height. The heights are equal, and \\(36 = 2 \\times 18\\), so <b>Prism Q has twice the volume of Prism P</b>.",
      {mode:"static-double-base"}); q.figure=m8TwoBaseSVG("18 cm\u00B2","36 cm\u00B2"); return q;
  },
  function(){
    var q=mcq("The base of a right cylinder is a circle with area 50.24 cm\\(^{2}\\). The cylinder is 6 cm high. Which calculation gives its volume?",
      {t:"50.24 times 6, which is 301.44 cm\\(^{3}\\)", fb:"Right: a cylinder follows the same base area times height rule as a prism."},
      [{t:"50.24 times 2, which is 100.48 cm\\(^{3}\\)", fb:"The multiplier is the height of the cylinder, which is 6, not 2."},
       {t:"50.24 plus 6, which is 56.24 cm\\(^{3}\\)", fb:"Volume stacks the base through the height: multiply rather than add."},
       {t:"50.24 times 6 times 6, which is 1808.64 cm\\(^{3}\\)", fb:"The height is used once: the base area already accounts for the round shape."}],
      "A cylinder is a prism with a circular base, so the prism rule applies: \\[ \\begin{aligned} V &= B \\times h \\\\ &= 50.24 \\times 6 \\\\ &= 301.44 \\end{aligned} \\] The volume is <b>301.44 cm\\(^{3}\\)</b>.",
      {mode:"static-cyl-base"}); q.figure=m8CylBaseSVG("50.24 cm\u00B2","6 cm"); return q;
  }
]), ["Think of the solid as a stack of identical layers, each shaped like the base.", "One layer has volume equal to the base area, so multiply by the number of layers (the height)."]);

E("u4-holds-most", 4, ["9.11"], 2, "gen", function(){
  var sets=null, vols=null, t=0;
  while(t<200){
    var cand=[]; for(var i=0;i<4;i++){ cand.push([ri(2,12),ri(2,12),ri(2,12)]); }
    var vs=cand.map(function(s){return s[0]*s[1]*s[2];});
    var mx=Math.max.apply(null,vs);
    if(vs.filter(function(v){return v===mx;}).length===1 && new Set(vs).size>=3){ sets=cand; vols=vs; break; }
    t++;
  }
  if(!sets){ sets=[[4,5,6],[3,5,9],[6,6,5],[2,8,7]]; vols=sets.map(function(s){return s[0]*s[1]*s[2];}); }
  var best=vols.indexOf(Math.max.apply(null,vols));
  var names=["Tank A","Tank B","Tank C","Tank D"];
  var opts=names.filter(function(n,i){return i!==best;}).map(function(n){
    var i=names.indexOf(n);
    return {t:n, fb:n+" holds "+vols[i]+" cm\\(^{3}\\), which is less than the largest volume."};
  });
  var desc=sets.map(function(s,i){return names[i]+": "+s[0]+" cm by "+s[1]+" cm by "+s[2]+" cm";}).join("; ");
  var q=mcq("Four storage tanks are shaped like right rectangular prisms. "+desc+". Which tank holds the most water?",
    {t:names[best], fb:"Yes: its volume, "+vols[best]+" cm\\(^{3}\\), is the largest of the four."}, opts,
    "Find each volume by multiplying the three dimensions: "+vols.map(function(v,i){return names[i]+" holds "+v+" cm\\(^{3}\\)";}).join(", ")+". The largest volume belongs to <b>"+names[best]+"</b>.",
    {mode:"holds-most", best:best}); q.figure=m8TanksSVG(sets,names); return q;
}, ["Holding the most water means having the greatest volume.", "Multiply the three dimensions of each tank, then compare the four volumes."]);

E("u4-position-volume", 4, ["9.10"], 3, "gen", function(){
  var l=ri(4,12), w=ri(3,10), h=ri(2,9);
  var V=l*w*h;
  var ds=u4d3(V,[l*w*(h+1),l*(w+1)*h,(l+1)*w*h,2*V,l*w+w*h]);
  var opts=ds.map(function(d){return {t:String(d), fb:"Tipping changes which face is down, not the dimensions themselves: multiply the same three numbers."};});
  var q=mcq("A fish tank shaped like a right rectangular prism is "+l+" cm long, "+w+" cm wide and "+h+" cm high, and it is full of water. The tank is tipped carefully onto a different face without spilling. What is the volume of water, in cubic centimetres?",
    {t:String(V), fb:"Yes: turning the tank over does not change the amount of water inside."}, opts,
    "Position does not affect volume. The same three dimensions multiply in any position: \\[ \\begin{aligned} V &= "+l+" \\times "+w+" \\times "+h+" \\\\ &= "+V+" \\end{aligned} \\] The volume of water is <b>"+V+" cm\\(^{3}\\)</b>.",
    {mode:"tipped", l:l, w:w, h:h}); q.figure=u4boxSVG(l,w,h); return q;
}, ["Ask whether turning the tank changes any of its three dimensions.", "Multiply the same length, width and height: tipping only changes which face is on the bottom."]);

E("u4-sa-open-tank", 4, ["9.5","9.6"], 3, "gen", function(){
  var r=ri(2,8), h=ri(4,14);
  var sa=u4r1(3.14*r*r+2*3.14*r*h);
  var q=numq("A garden water barrel is shaped like a right cylinder with radius "+r+" m and height "+h+" m. It is open at the top. Metal sheet is used for the bottom and the curved side only. How many square metres of metal are needed? Use \\(\\pi = 3.14\\) and give your answer to one decimal place.", sa, 0.6,
    "An open top means only one circle is needed, for the bottom, plus the curved side: \\[ \\begin{aligned} SA &= \\pi r^{2}+2\\pi r h \\\\ &= 3.14("+r+")^{2}+2(3.14)("+r+")("+h+") \\\\ &= "+fmt(u4r2(3.14*r*r))+"+"+fmt(u4r1(2*3.14*r*h))+" \\\\ &= "+fmt(sa)+" \\end{aligned} \\] The metal needed is <b>"+fmt(sa)+" m\\(^{2}\\)</b>.",
    {mode:"open-barrel", r:r, h:h}); q.figure=m8CylLabSVG(r+" m",h+" m",false,true); return q;
}, ["An open top changes the count of circles: read the problem for which parts are covered.", "Add one circle for the bottom to the curved side area."]);

E("u4-vol-cylinder-diam", 4, ["9.9","9.11"], 3, "gen", function(){
  var r=ri(2,9); var d=2*r; var h=ri(4,16);
  var V=u4r1(3.14*r*r*h);
  var q=numq("A water tank is shaped like a right cylinder with diameter "+d+" cm and height "+h+" cm. How many cubic centimetres of water does it hold when full? Use \\(\\pi = 3.14\\) and give your answer to one decimal place.", V, 0.6,
    "Halve the diameter to get the radius, then use base area times height: \\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\\\ V &= \\pi r^{2} h \\\\ &= 3.14 \\times "+r+"^{2} \\times "+h+" \\\\ &= "+fmt(V)+" \\end{aligned} \\] The tank holds <b>"+fmt(V)+" cm\\(^{3}\\)</b>.",
    {mode:"diam-vol", r:r, h:h}); q.figure=u4cylSVG(r,h,true); return q;
}, ["The formula needs the radius, but the problem gives the diameter.", "Halve the diameter first, then square the radius and multiply by pi and the height."]);

E("u4-sa-missing-edge", 4, ["9.5"], 3, "gen", function(){
  var l=ri(4,12), w=ri(3,10), h=ri(2,9);
  var sa=2*(l*w+l*h+w*h);
  var ds=u4d3(h,[h+1,h+2,h-1,2*h,h+3]);
  var opts=ds.map(function(d){
    var test=2*(l*w+l*d+w*d);
    return {t:String(d), fb:"With height "+d+" the surface area would be "+test+" cm\\(^{2}\\), not "+sa+"."};
  });
  var q=mcq("A right rectangular prism is "+l+" cm long and "+w+" cm wide, and its total surface area is "+sa+" cm\\(^{2}\\). What is its height, in centimetres?",
    {t:String(h), fb:"Yes: height "+h+" gives exactly the stated surface area."}, opts,
    "Try the height in the surface area formula and solve. With height \\(h\\): \\[ \\begin{aligned} 2("+fmt(l*w)+") + 2("+l+"+"+w+")h &= "+sa+" \\\\ "+(2*l*w)+" + "+(2*(l+w))+"h &= "+sa+" \\\\ h &= "+h+" \\end{aligned} \\] The height is <b>"+h+" cm</b>.",
    {mode:"missing-edge", l:l, w:w, h:h}); q.figure=m8BoxLabSVG(l+" cm",w+" cm","?",false); return q;
}, ["Put the unknown height into the surface area formula as a letter.", "Work out the known face areas first, then see what is left for the faces that use the height."]);
