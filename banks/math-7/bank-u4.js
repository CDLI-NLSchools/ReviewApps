// Figure additions: geometry entries assign q.figure from their own drawn values
// (circle, parallelogram, triangle, composite and grid figures). Data and graphing items stay figureless.
// Math 7 Unit 4 Circles and Area question bank
// Cut verbatim from the standalone bank source
// (math-7-review/bank-src.js, lines 1624 to 2250).
// CRMARKS: u4-cr-area-mix=3
// CRMARKS: u4-cr-circumference=3
// CRMARKS: u4-cr-graph-quantity=2
// CRMARKS: u4-cr-area-circle=3
// CRMARKS: u4-cr-composite=3
/* ===== Unit 4 ===== */
/* Math 7 Unit 4: Circles and Area. Helpers prefixed u4. PI is 3.14 throughout. */
function u4pt(cx,cy,r,deg){var t=deg*Math.PI/180;return [cx+r*Math.sin(t), cy-r*Math.cos(t)];}
function u4circleFig(label, mode){
  var out='<svg viewBox="0 0 240 190" width="240" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle diagram">';
  out+='<circle cx="120" cy="88" r="66" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<circle cx="120" cy="88" r="2.6" fill="'+FIG_INK+'"/>';
  if(mode==="r"){
    out+='<line x1="120" y1="88" x2="186" y2="88" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+=_txt(153,74,label,12.5,false);
  } else {
    out+='<line x1="54" y1="88" x2="186" y2="88" stroke="'+FIG_ACC+'" stroke-width="2"/>';
    out+=_txt(120,74,label,12.5,false);
  }
  return out+'</svg>';
}
function u4pieFig(cats, angleLabels){
  var cx=92, cy=92, R=68;
  var fills=[FIG_SHADE,"#ffffff","#8fb8a0","#e6ddcb"];
  var out='<svg viewBox="0 0 330 190" width="330" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Circle graph">';
  var start=0, letters=["A","B","C","D"];
  cats.forEach(function(c,i){
    var sweep=c.pct*3.6, end=start+sweep;
    var p1=u4pt(cx,cy,R,start), p2=u4pt(cx,cy,R,end);
    var large=sweep>180?1:0;
    out+='<path d="M '+cx+' '+cy+' L '+fmt(p1[0],1)+' '+fmt(p1[1],1)+' A '+R+' '+R+' 0 '+large+' 1 '+fmt(p2[0],1)+' '+fmt(p2[1],1)+' Z" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
    var mid=u4pt(cx,cy,42,(start+end)/2);
    out+=_txt(mid[0],mid[1],angleLabels?String(c.ang)+"°":letters[i],13,true);
    start=end;
  });
  if(!angleLabels){
    cats.forEach(function(c,i){
      var y=42+i*34;
      out+='<rect x="196" y="'+(y-9)+'" width="12" height="12" fill="'+fills[i%4]+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
      out+='<text x="214" y="'+(y+1)+'" font-size="12.5" fill="'+FIG_INK+'">'+letters[i]+" = "+c.name+" "+c.pct+"%</text>";
    });
  }
  return out+'</svg>';
}
function u4graphData(){
  var topics=[
    {t:"favourite lunch", cats:["Pizza","Salad","Soup","Sandwich"]},
    {t:"favourite sport", cats:["Soccer","Hockey","Dance","Swimming"]},
    {t:"way of getting to school", cats:["Bus","Walk","Car","Bike"]},
    {t:"weekend activity", cats:["Gaming","Reading","Sports","Music"]}
  ];
  var tp=pick(topics), guard=0, ps=null;
  while(guard++<300){
    var a=ri(30,45), b=ri(20,32), c=ri(12,22), d=100-a-b-c;
    if(d<6||d>25)continue;
    var arr=[a,b,c,d], ok=true;
    for(var i=0;i<4;i++)for(var j=i+1;j<4;j++)if(arr[i]===arr[j])ok=false;
    if(ok){ps=arr;break;}
  }
  if(!ps)ps=[40,28,20,12];
  var cats=tp.cats.map(function(name,i){return {name:name, pct:ps[i]};});
  return {topic:tp.t, cats:cats};
}

E("u4-radius-diameter", 4, ["9.11"], 1, "gen", function(){
  if(ri(0,1)===0){
    var r=ri(2,30), d=2*r;
    var candR=[r,3*r,d+2,4*r,r+1,d+10], seenR={}; seenR[d]=1; var dsR=[];
    for(var i=0;i<candR.length&&dsR.length<3;i++){
      if(seenR[candR[i]])continue; seenR[candR[i]]=1;
      dsR.push({t:String(candR[i]), fb:"The diameter is exactly twice the radius: multiply "+r+" by 2."});
    }
    var q=mcq("The circle in the diagram has radius "+r+" cm. What is its diameter, in centimetres?",
      {t:String(d), fb:"Yes: the diameter is twice the radius."},
      dsR,
      "The diameter passes through the centre and is made of two radii: \\(d = 2 \\times "+r+" = "+d+"\\) cm. The answer is <b>"+d+" cm</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d2=2*ri(3,40), r2=d2/2;
  var candD=[d2,d2-2,2*d2,r2+3,d2+4,r2-1], seenD={}; seenD[r2]=1; var dsD=[];
  for(var j=0;j<candD.length&&dsD.length<3;j++){
    if(candD[j]<=0||seenD[candD[j]])continue; seenD[candD[j]]=1;
    dsD.push({t:String(candD[j]), fb:"The radius is exactly half the diameter: divide "+d2+" by 2."});
  }
  var q2=mcq("The circle in the diagram has diameter "+d2+" cm. What is its radius, in centimetres?",
    {t:String(r2), fb:"Yes: the radius is half the diameter."},
    dsD,
    "The radius is half the diameter: \\(r = "+d2+" \\div 2 = "+r2+"\\) cm. The answer is <b>"+r2+" cm</b>.",
    {mode:"d", d:d2});
  q2.figure=u4circleFig("d = "+d2+" cm","d");
  return q2;
}, ["The diameter is two radii end to end.", "Start by picturing the radius from the centre to the edge, then double or halve."]);

E("u4-draw-circle", 4, ["9.12"], 1, "var", varset([
  function(){ var q=mcq("To draw a circle with radius 6 cm using a compass, the compass should be opened so the point and pencil are how far apart, in centimetres?",
    {t:"6", fb:"Yes: the compass opening is the radius."},
    [{t:"12", fb:"12 cm is the diameter: the compass opening matches the radius, not the diameter."},
     {t:"3", fb:"That is half the radius: set the opening equal to the radius."},
     {t:"36", fb:"That multiplies 6 by 6: the opening is just the radius length."}],
    "A compass draws a circle whose radius equals the opening between point and pencil. For radius 6 cm, open it <b>6 cm</b>.", {s:1}); q.figure=u4circleFig("r = 6 cm","r"); return q; },
  function(){ var q=mcq("To draw a circle with diameter 10 cm using a compass, the compass should be opened so the point and pencil are how far apart, in centimetres?",
    {t:"5", fb:"Yes: the opening is the radius, which is half of 10 cm."},
    [{t:"10", fb:"That is the diameter: the opening must be the radius, half of that."},
     {t:"20", fb:"That doubles the diameter: halve it to get the radius."},
     {t:"2", fb:"That divides by 5: the radius is half the diameter, 5 cm."}],
    "The compass opening is the radius. Radius = 10 / 2 = 5 cm, so open it <b>5 cm</b>.", {s:2}); q.figure=u4circleFig("d = 10 cm","d"); return q; },
  function(){ return mcq("Which method can draw a circle when no compass is available?",
    {t:"Trace around a round mug and mark its centre", fb:"Yes: a round object gives a true circle shape to trace."},
    [{t:"Draw the curve freehand and measure it afterwards", fb:"A freehand curve is not a reliable circle and the radius is uncontrolled."},
     {t:"Use a ruler to draw four straight sides", fb:"Straight sides make a quadrilateral, not a circle."},
     {t:"Roll a coin once along a ruler", fb:"Rolling draws a straight path, not a circle."}],
    "Tracing a round object gives a closed curve at a fixed distance from its centre, which is a circle. The answer is <b>trace around a round mug</b>.", {s:3}); },
  function(){ var q=mcq("A student draws a circle with a compass opened to 4 cm. What is the diameter of the circle drawn, in centimetres?",
    {t:"8", fb:"Yes: the opening is the radius 4 cm, so the diameter is double."},
    [{t:"4", fb:"That is the radius (the compass opening): double it for the diameter."},
     {t:"2", fb:"That halves the radius: the diameter is twice the radius."},
     {t:"16", fb:"That squares the radius: the diameter is two radii, 8 cm."}],
    "The compass opening is the radius, 4 cm. Diameter = 2 x 4 = <b>8 cm</b>.", {s:4}); q.figure=u4circleFig("r = 4 cm","r"); return q; },
  function(){ var q=mcq("To draw a circle with diameter 14 cm using a compass, the compass should be opened so the point and pencil are how far apart, in centimetres?",
    {t:"7", fb:"Yes: the opening is the radius, half of 14 cm."},
    [{t:"14.0", fb:"That is the diameter: the opening must be the radius, half of that."},
     {t:"28", fb:"That doubles the diameter: halve it to get the radius."},
     {t:"3.5", fb:"That is a quarter of the diameter: the radius is half, 7 cm."}],
    "The compass opening is the radius. Radius = 14 / 2 = 7 cm, so open it <b>7 cm</b>.", {s:5}); q.figure=u4circleFig("d = 14 cm","d"); return q; }
]), ["The compass opening is always the radius of the circle it draws.", "Start by finding the radius of the circle you want."]);

E("u4-circ-approx", 4, ["9.7"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,45), c=3*d;
    var candA=[2*d,6*d,4*d,d+3], seenA={}; seenA[c]=1; var dsA=[];
    for(var i=0;i<candA.length&&dsA.length<3;i++){
      if(seenA[candA[i]])continue; seenA[candA[i]]=1;
      dsA.push({t:"about "+candA[i]+" cm", fb:"The circumference is about three times the diameter: multiply "+d+" by 3."});
    }
    var q=mcq("A circle has diameter "+d+" cm. The circumference is approximately three times the diameter. About how long is the circumference?",
      {t:"about "+c+" cm", fb:"Yes: 3 x "+d+" = "+c+"."},
      dsA,
      "Circumference is approximately \\(3 \\times d = 3 \\times "+d+" = "+c+"\\) cm. The answer is <b>about "+c+" cm</b>.",
      {mode:"d", d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var r=ri(2,30), c2=6*r;
  var q=mcq("A circle has radius "+r+" cm, so its diameter is "+(2*r)+" cm. The circumference is approximately three times the diameter. About how long is the circumference?",
    {t:"about "+c2+" cm", fb:"Yes: 3 x "+(2*r)+" = "+c2+"."},
    [{t:"about "+(3*r)+" cm", fb:"That is three times the radius: the rule uses the diameter, which is "+(2*r)+" cm."},
     {t:"about "+(2*r)+" cm", fb:"That is the diameter itself: multiply it by about 3."},
     {t:"about "+(12*r)+" cm", fb:"That is twelve times the radius: three times the diameter is six times the radius."}],
    "Diameter = \\(2 \\times "+r+" = "+(2*r)+"\\) cm, and circumference is approximately \\(3 \\times "+(2*r)+" = "+c2+"\\) cm. The answer is <b>about "+c2+" cm</b>.",
    {mode:"r", r:r}); q.figure=u4circleFig("r = "+r+" cm","r"); return q;
}, ["The circumference wraps around the diameter about three times.", "Start by finding the diameter, then multiply by about 3."]);

E("u4-pi-ratio", 4, ["9.8"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,60), C=3.14*d;
    var q=mcq("A circle has circumference "+fmt(C,2)+" cm and diameter "+d+" cm. What is the value of circumference divided by diameter for this circle?",
      {t:"3.14", fb:"Yes: for every circle, C/d is the constant pi, about 3.14."},
      [{t:"0.32", fb:"That is roughly d/C, the division the other way around."},
       {t:"31.40", fb:"That is ten times too large: pi is a little more than 3."},
       {t:fmtF(C-d,2), fb:"That subtracts instead of dividing: pi is a ratio, C divided by d."}],
      "\\[ \\begin{aligned} \\pi &= "+FR("C","d")+" = "+fmt(C,2)+" \\div "+d+" \\\\ &= 3.14 \\end{aligned} \\] The answer is <b>3.14</b>.",
      {mode:"ratio", d:d}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var pair=pick([[5,15.6],[5,15.8],[10,31.2],[10,31.6],[20,62.5],[20,63.1],[25,78.2],[25,78.8],[40,125.2],[40,125.9],[50,156.6],[50,157.4]]);
  var dd=pair[0], wrapped=pair[1];
  var est=Math.round(wrapped/dd*100)/100;
  var pool=[est+0.5,est-0.14,est+1,3.9];
  var seen={}; seen[fmt(est,2)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i],2);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:"Divide the wrapped length (the circumference) by the diameter and compare with 3.14."});
  }
  var q=mcq("String wrapped around a round can measures "+wrapped+" cm. The can's diameter is "+dd+" cm. Which value best estimates pi from this measurement?",
    {t:fmt(est,2), fb:"Yes: "+wrapped+" / "+dd+" is about "+fmt(est,2)+", close to 3.14."},
    ds,
    "\\[ \\begin{aligned} \\pi &\\approx "+wrapped+" \\div "+dd+" \\\\ &\\approx "+fmt(est,2)+" \\end{aligned} \\] Measurement error explains the small gap from 3.14. The answer is <b>"+fmt(est,2)+"</b>.",
    {mode:"measure", dd:dd}); q.figure=u4circleFig("d = "+dd+" cm","d"); return q;
}, ["Pi is the ratio of circumference to diameter, the same for every circle.", "Start by dividing the circumference by the diameter."]);

E("u4-circumference", 4, ["9.10","9.8"], 1, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(3,40), C=3.14*d;
    var pool=[3.14*(d/2),3*d,3.14*(d/2)*(d/2),C+3.14];
    var seen={}; seen[fmtF(C,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:i===2?"That uses the area formula with the radius: circumference is pi times diameter.":"Check the formula: C = pi x d with pi = 3.14."});
    }
    var q=mcq("What is the circumference of the circle in the diagram, in centimetres? Use 3.14 for pi.",
      {t:fmtF(C,2), fb:"Yes: C = 3.14 x "+d+" = "+fmtF(C,2)+" cm."},
      ds,
      "\\[ \\begin{aligned} C &= \\pi d \\\\ &= 3.14 \\times "+d+" \\\\ &= "+fmtF(C,2)+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmtF(C,2)+" cm</b>.",
      {mode:"d", d:d});
    q.figure=u4circleFig("d = "+d+" cm","d");
    return q;
  }
  var r=ri(2,25), C2=2*3.14*r;
  var pool2=[3.14*r,3.14*r*r,3*r*2,2*3.14*(r+1)];
  var seen2={}; seen2[fmtF(C2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2, fb:j===1?"That uses the area formula: circumference is 2 x pi x r.":"Check the formula: C = 2 x pi x r with pi = 3.14."});
  }
  var q2=mcq("What is the circumference of the circle in the diagram, in centimetres? Use 3.14 for pi.",
    {t:fmtF(C2,2), fb:"Yes: C = 2 x 3.14 x "+r+" = "+fmtF(C2,2)+" cm."},
    ds2,
    "\\[ \\begin{aligned} C &= 2\\pi r \\\\ &= 2 \\times 3.14 \\times "+r+" \\\\ &= "+fmtF(C2,2)+" \\text{ cm} \\end{aligned} \\] The answer is <b>"+fmtF(C2,2)+" cm</b>.",
    {mode:"r", r:r});
  q2.figure=u4circleFig("r = "+r+" cm","r");
  return q2;
}, ["Circumference is pi times the diameter, or two times pi times the radius.", "Start by deciding whether the diagram gives you the radius or the diameter."]);

E("u4-para-from-rect", 4, ["9.1"], 1, "var", varset([
  function(){ var q=mcq("A parallelogram is cut along a dashed height line and the triangle piece is moved to the other end, forming a rectangle with the same base and height. The area of the parallelogram equals the area of that rectangle, which is found by:",
    {t:"base x height", fb:"Yes: the rearranged rectangle has area base x height, and moving a piece does not change area."},
    [{t:"base x slanted side", fb:"The slanted side is not a side of the rearranged rectangle: its sides are the base and the height."},
     {t:"(base x height) / 2", fb:"Halving is for a triangle: the whole parallelogram becomes the whole rectangle."},
     {t:"base + height", fb:"Adding gives a length, not an area: areas of rectangles multiply length by width."}],
    "Cutting and moving a piece keeps the same total area, and the new shape is a rectangle with sides equal to the base and height. Its area is <b>base x height</b>.", {s:1}); q.figure=figParaRect("base","h"); return q; },
  function(){ var q=mcq("A parallelogram with base 8 cm and height 5 cm is rearranged into a rectangle. What is the area of the parallelogram?",
    {t:"40 cm²", fb:"Yes: the rectangle is 8 cm by 5 cm, so the area is 40 cm²."},
    [{t:"26 cm²", fb:"That is the perimeter of the rectangle: area multiplies length by width."},
     {t:"20 cm²", fb:"That halves the product: the full parallelogram keeps the full rectangle area."},
     {t:"13 cm²", fb:"That adds base and height: area multiplies them."}],
    "The rearranged rectangle measures 8 cm by 5 cm: \\(A = 8 \\times 5 = 40\\) cm². The answer is <b>40 cm²</b>.", {s:2}); q.figure=figParaRect("base = 8 cm","h = 5 cm"); return q; },
  function(){ var q=mcq("Why does cutting a parallelogram and rearranging the pieces into a rectangle not change the area?",
    {t:"No area is added or removed; the same pieces make the new shape", fb:"Yes: rearranging pieces keeps the total area the same."},
    [{t:"A rectangle always has the same area as any parallelogram with any base", fb:"Only the rectangle built from the same pieces, with the same base and height, matches."},
     {t:"The cut makes the shape smaller but the move makes it bigger in the end", fb:"Nothing is gained or lost: the pieces are identical in total."},
     {t:"The perimeter stays the same, so the area does too, every time", fb:"The perimeter can change when pieces move: it is the pieces themselves that preserve area."}],
    "The new shape is built from exactly the same pieces, so its area equals the parallelogram's area. The answer is <b>no area is added or removed</b>.", {s:3}); q.figure=figParaRect("base","h"); return q; },
  function(){ var q=mcq("A parallelogram with base 11 cm and height 6 cm is rearranged into a rectangle. What are the side lengths of that rectangle?",
    {t:"11 cm and 6 cm", fb:"Yes: the rectangle takes the parallelogram's base and height as its sides."},
    [{t:"11 cm and 11 cm", fb:"That would be a square: the second side is the height, 6 cm."},
     {t:"6 cm and 6 cm", fb:"Both sides are not the height: one side is the base, 11 cm."},
     {t:"17 cm and 6 cm", fb:"17 cm adds base and height: the rectangle's sides are the base and height themselves."}],
    "The rearranged rectangle has the parallelogram's base as one side and its height as the other: <b>11 cm and 6 cm</b>.", {s:4}); q.figure=figParaRect("base = 11 cm","h = 6 cm"); return q; },
  function(){ var q=mcq("A parallelogram with base 9 cm and height 4 cm is cut and rearranged into a rectangle. What is the area of the parallelogram?",
    {t:"36 cm²", fb:"Yes: the rectangle is 9 cm by 4 cm, so the area is 36 cm²."},
    [{t:"26 cm²", fb:"That is the perimeter of the rectangle: area multiplies length by width."},
     {t:"18 cm²", fb:"That halves the product: the full parallelogram keeps the full rectangle area."},
     {t:"13 cm²", fb:"That adds base and height: area multiplies them."}],
    "The rearranged rectangle measures 9 cm by 4 cm: \\(A = 9 \\times 4 = 36\\) cm². The answer is <b>36 cm²</b>.", {s:5}); q.figure=figParaRect("base = 9 cm","h = 4 cm"); return q; }
]), ["Picture the parallelogram cut and slid into a rectangle shape.", "Start by asking what the sides of the rearranged rectangle are."]);

E("u4-area-parallelogram", 4, ["9.2","9.3"], 2, "gen", function(){
  var b=ri(6,15), h=ri(4,10), s=h+ri(1,4);
  var A=b*h;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram with base, height and slanted side labelled">'
    +'<polygon points="55,140 215,140 245,60 85,60" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="110" y1="60" x2="110" y2="140" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(135,158,"base = "+b+" cm",12.5,false)
    +_txt(96,102,"h = "+h+" cm",12,false)
    +_txt(238,88,""+s+" cm",12,false)
    +'</svg>';
  var pool=[b*s,A/2,b+h,b*s/2];
  var seen={}; seen[fmt(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"That multiplies by the slanted side: area uses the perpendicular height.":"Check the formula: area of a parallelogram is base times height."});
  }
  var q=mcq("What is the area of the parallelogram in the diagram?",
    {t:fmt(A)+" cm²", fb:"Yes: A = base x height = "+b+" x "+h+" = "+A+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= b \\times h \\\\ &= "+b+" \\times "+h+" \\\\ &= "+A+" \\text{ cm}^2 \\end{aligned} \\] The slanted side length is not used. The answer is <b>"+A+" cm²</b>.",
    {b:b, h:h, s:s});
  q.figure=fig;
  return q;
}, ["Area of a parallelogram is base times the perpendicular height.", "Start by finding the height: the dashed line at right angles to the base."]);

E("u4-triangle-from", 4, ["9.4"], 1, "var", varset([
  function(){ var q=mcq("Two identical triangles are put together to form a parallelogram with base 10 cm and height 6 cm. The parallelogram has area 60 cm². What is the area of one triangle?",
    {t:"30 cm²", fb:"Yes: each triangle is half of the parallelogram."},
    [{t:"60 cm²", fb:"That is the whole parallelogram: one triangle is half of it."},
     {t:"120 cm²", fb:"That doubles the parallelogram: the triangle is smaller than the whole."},
     {t:"16 cm²", fb:"That adds base and height: use half of the parallelogram's area."}],
    "The two identical triangles make the whole parallelogram, so one triangle has area 60 / 2 = <b>30 cm²</b>.", {s:1}); q.figure=figTriHalf("para","base = 10 cm","h = 6 cm"); return q; },
  function(){ var q=mcq("A rectangle is cut along a diagonal into two identical triangles. The rectangle is 12 cm long and 7 cm wide. What is the area of one triangle?",
    {t:"42 cm²", fb:"Yes: the rectangle's area is 84 cm², and each triangle is half."},
    [{t:"84 cm²", fb:"That is the whole rectangle: one triangle is half of it."},
     {t:"38 cm²", fb:"That is the perimeter of the rectangle: find its area first, then halve."},
     {t:"19 cm²", fb:"That adds length and width: area multiplies them, then halve."}],
    "\\[ \\begin{aligned} \\text{rectangle area} &= 12 \\times 7 = 84 \\text{ cm}^2 \\\\ \\text{triangle area} &= 84 \\div 2 = 42 \\text{ cm}^2 \\end{aligned} \\] The answer is <b>42 cm²</b>.", {s:2}); q.figure=figTriHalf("rect","12 cm","7 cm"); return q; },
  function(){ var q=mcq("A triangle and a parallelogram have the same base and the same height. The parallelogram has area 48 cm². What is the area of the triangle?",
    {t:"24 cm²", fb:"Yes: with the same base and height, the triangle is half the parallelogram."},
    [{t:"48 cm²", fb:"That matches the parallelogram: the triangle takes only half of it."},
     {t:"96 cm²", fb:"That doubles the parallelogram: the triangle is smaller."},
     {t:"12 cm²", fb:"That is a quarter: two identical triangles fill the parallelogram, so it is a half."}],
    "Two copies of the triangle fill the parallelogram exactly, so the triangle's area is 48 / 2 = <b>24 cm²</b>.", {s:3}); q.figure=figTriHalf("para","base","h"); return q; },
  function(){ var q=mcq("Why is the area of a triangle half the area of a parallelogram with the same base and height?",
    {t:"Two identical copies of the triangle fit together to make that parallelogram", fb:"Yes: the triangle is exactly one of the two equal pieces."},
    [{t:"Triangles always have half the area of every parallelogram", fb:"The match needs the same base and height, not just any parallelogram."},
     {t:"The triangle has three sides and the parallelogram has four", fb:"Side count is not the reason: it is the two copies filling the parallelogram."},
     {t:"The height of a triangle is half the height of a parallelogram built on the same base", fb:"They share the same height here: it is the area that halves."}],
    "Putting two identical triangles together builds the parallelogram, so one triangle is half its area. The answer is <b>two copies of the triangle make the parallelogram</b>.", {s:4}); q.figure=figTriHalf("para","base","h"); return q; },
  function(){ var q=mcq("A parallelogram with base 14 cm and height 5 cm is split into two identical triangles by a diagonal. What is the area of one triangle?",
    {t:"35 cm²", fb:"Yes: the parallelogram's area is 70 cm², and each triangle is half."},
    [{t:"70 cm²", fb:"That is the whole parallelogram: one triangle is half of it."},
     {t:"38 cm²", fb:"That is the perimeter of the parallelogram: find its area first, then halve."},
     {t:"19 cm²", fb:"That adds base and height: area multiplies them, then halve."}],
    "\\[ \\begin{aligned} \\text{parallelogram area} &= 14 \\times 5 = 70 \\text{ cm}^2 \\\\ \\text{triangle area} &= 70 \\div 2 = 35 \\text{ cm}^2 \\end{aligned} \\] The answer is <b>35 cm²</b>.", {s:5}); q.figure=figTriHalf("para","base = 14 cm","h = 5 cm"); return q; }
]), ["Think of the triangle as one of two identical pieces of a parallelogram or rectangle.", "Start by finding the area of the whole parallelogram or rectangle, then halve it."]);

E("u4-area-triangle", 4, ["9.5","9.3"], 1, "gen", function(){
  var b=ri(6,16), h=ri(4,12), A=b*h/2;
  var fig='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle with base and height labelled">'
    +'<polygon points="55,145 245,145 120,50" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>'
    +'<line x1="120" y1="50" x2="120" y2="145" stroke="'+FIG_ALT+'" stroke-width="1.8" stroke-dasharray="5 4"/>'
    +_txt(150,163,"base = "+b+" cm",12.5,false)
    +_txt(104,100,"h = "+h+" cm",12,false)
    +'</svg>';
  var pool=[b*h,b+h,A+b,A*3];
  var seen={}; seen[fmt(A)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k+" cm²", fb:i===0?"That is the area of the full parallelogram: a triangle is half of it.":"Check the formula: area of a triangle is base times height divided by 2."});
  }
  var q=mcq("What is the area of the triangle in the diagram?",
    {t:fmt(A)+" cm²", fb:"Yes: A = (base x height) / 2 = ("+b+" x "+h+") / 2 = "+fmt(A)+" cm²."},
    ds,
    "\\[ \\begin{aligned} A &= "+FR("b \\times h","2")+" \\\\ &= "+FR(b+" \\times "+h,"2")+" \\\\ &= "+fmt(A)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(A)+" cm²</b>.",
    {b:b, h:h});
  q.figure=fig;
  return q;
}, ["Area of a triangle is base times height, divided by 2.", "Start by multiplying base by height, then halve the result."]);

E("u4-estimate-circle-area", 4, ["9.6"], 1, "gen", function(){
  var F=ri(28,58), P=2*ri(4,13), est=F+P/2;
  var pool=[F+P,F,F-P/2,est+10];
  var seen={}; seen[String(est)]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=String(pool[i]);
    if(seen[k])continue; seen[k]=1;
    ds.push({t:"about "+k+" cm²", fb:i===0?"That counts every partly covered square as full: count each partly covered square as about a half.":"Use the counting rule: full squares plus half of the partly covered squares."});
  }
  return mcq("A circle is drawn on centimetre grid paper. Counting squares to estimate its area: "+F+" squares are fully inside the circle and "+P+" squares are partly covered. Counting each partly covered square as about half a square, what is the estimated area?",
    {t:"about "+est+" cm²", fb:"Yes: "+F+" + "+P+"/2 = "+est+"."},
    ds,
    "\\[ \\begin{aligned} \\text{estimate} &= "+F+" + "+FR(P,"2")+" \\\\ &= "+F+" + "+(P/2)+" \\\\ &= "+est+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>about "+est+" cm²</b>.",
    {F:F, P:P});
}, ["Count full squares, then add about half for each partly covered square.", "Start by adding half of the partly covered count to the full count."]);

E("u4-area-circle", 4, ["9.9","9.3"], 2, "gen", function(){
  var modeA=ri(0,2);
  if(modeA===2){
    var rs=ri(2,20), As=3.14*rs*rs/2;
    var poolS=[3.14*rs*rs,2*3.14*rs,3.14*rs,As*4,As/2,As*3];
    var seenS={}; seenS[fmtF(As,2)]=1; var dsS=[];
    for(var s2=0;s2<poolS.length&&dsS.length<3;s2++){
      var kk=fmtF(poolS[s2],2);
      if(seenS[kk])continue; seenS[kk]=1;
      dsS.push({t:kk+" cm²", fb:s2===0?"That is the area of the full circle: a semicircle is half of it.":"Check the steps: find the full circle area with pi x r², then halve it."});
    }
    var qS=mcq("The diagram shows a semicircle (half of a circle) with radius "+rs+" cm. What is its area? Use 3.14 for pi.",
      {t:fmtF(As,2)+" cm²", fb:"Yes: half of 3.14 x "+rs+"² is "+fmtF(As,2)+" cm²."},
      dsS,
      "\\[ \\begin{aligned} A &= "+FR("3.14 \\times "+rs+"^2","2")+" \\\\ &= "+fmtF(As,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(As,2)+" cm²</b>.",
      {mode:"semi", r:rs});
    qS.figure=u4circleFig("r = "+rs+" cm","r");
    return qS;
  }
  if(modeA===0){
    var r=ri(3,20), A=3.14*r*r;
    var pool=[2*3.14*r,3.14*r,3.14*2*r*r,A+3.14*r];
    var seen={}; seen[fmtF(A,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k+" cm²", fb:i===0?"That is the circumference: area uses pi times the radius squared.":"Check the formula: A = pi x r² with pi = 3.14."});
    }
    var q=mcq("What is the area of the circle in the diagram? Use 3.14 for pi.",
      {t:fmtF(A,2)+" cm²", fb:"Yes: A = 3.14 x "+r+"² = "+fmtF(A,2)+" cm²."},
      ds,
      "\\[ \\begin{aligned} A &= \\pi r^2 \\\\ &= 3.14 \\times "+r+"^2 \\\\ &= "+fmtF(A,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A,2)+" cm²</b>.",
      {mode:"r", r:r});
    q.figure=u4circleFig("r = "+r+" cm","r");
    return q;
  }
  var d=2*ri(3,20), r2=d/2, A2=3.14*r2*r2;
  var pool2=[2*3.14*r2,3.14*d*d,A2*2,3.14*r2];
  var seen2={}; seen2[fmtF(A2,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2+" cm²", fb:j===1?"That squares the diameter: halve the diameter to get the radius first.":"Check the steps: halve the diameter for the radius, then A = pi x r²."});
  }
  var q2=mcq("What is the area of the circle in the diagram? Use 3.14 for pi.",
    {t:fmtF(A2,2)+" cm²", fb:"Yes: radius is "+r2+" cm, and A = 3.14 x "+r2+"² = "+fmtF(A2,2)+" cm²."},
    ds2,
    "\\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r2+" \\\\ A &= \\pi r^2 = 3.14 \\times "+r2+"^2 \\\\ &= "+fmtF(A2,2)+" \\text{ cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A2,2)+" cm²</b>.",
    {mode:"d", d:d});
  q2.figure=u4circleFig("d = "+d+" cm","d");
  return q2;
}, ["Area of a circle is pi times the radius squared.", "Start by making sure you have the radius; halve the diameter if that is what is given."]);

E("u4-central-angles", 4, ["9.13","11.2"], 1, "gen", function(){
  var guard=0, a=0,b=0,c=0,m=0;
  while(guard++<300){
    a=ri(6,14)*10; b=ri(4,10)*10; c=ri(3,8)*10; m=360-a-b-c;
    if(m>=30&&m%10===0)break;
  }
  if(m<30){a=120;b=90;c=60;m=90;}
  var cats=[{pct:a/3.6,ang:a},{pct:b/3.6,ang:b},{pct:c/3.6,ang:c},{pct:m/3.6,ang:m}];
  var figCats=cats.map(function(x,i){return {pct:x.pct, ang:i===3?"?":x.ang};});
  var pool=[a+b+c,m+20,m-20,m+30,m-30,90,180];
  var seen={}; seen[m+"°"]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    if(pool[i]<=0)continue;
    var k=pool[i]+"°";
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"That is the sum of the three marked angles: the missing one is what is left of 360°.":"The four central angles of a circle add to 360°: subtract the three marked angles from 360°."});
  }
  var q=mcq("The circle in the diagram is divided into four sectors. Three central angles are marked, and one sector is marked with ?. What is the missing central angle?",
    {t:m+"°", fb:"Yes: 360° minus the three marked angles leaves "+m+"°."},
    ds,
    "\\[ \\begin{aligned} \\text{missing} &= 360° - ("+a+"° + "+b+"° + "+c+"°) \\\\ &= 360° - "+(a+b+c)+"° \\\\ &= "+m+"° \\end{aligned} \\] The central angles of a circle always add to 360°. The answer is <b>"+m+"°</b>.",
    {a:a, b:b, c:c});
  q.figure=u4pieFig(figCats,true);
  return q;
}, ["The central angles around the centre of a circle add to 360 degrees.", "Start by adding the three marked angles, then subtract from 360."]);

E("u4-circle-context", 4, ["9.10"], 3, "gen", function(){
  if(ri(0,1)===0){
    var d=ri(40,80), n=ri(8,25), dist=3.14*d*n/100;
    var pool=[dist/10,dist/2,dist+n,dist*2];
    var seen={}; seen[fmtF(dist,2)]=1; var ds=[];
    for(var i=0;i<pool.length&&ds.length<3;i++){
      var k=fmtF(pool[i],2);
      if(seen[k])continue; seen[k]=1;
      ds.push({t:k, fb:i===1?"That uses the radius in the circumference: C = pi x d, then multiply by the number of turns and convert to metres.":"Find one circumference first (pi x d), multiply by the turns, and change centimetres to metres."});
    }
    var q=mcq("A bicycle wheel has diameter "+d+" cm. The wheel turns "+n+" times on a ride. Using 3.14 for pi, how far does the bicycle travel, in metres?",
      {t:fmtF(dist,2), fb:"Yes: one turn covers one circumference, and the total converts to "+fmtF(dist,2)+" m."},
      ds,
      "\\[ \\begin{aligned} C &= 3.14 \\times "+d+" = "+fmtF(3.14*d,2)+" \\text{ cm} \\\\ \\text{distance} &= "+fmtF(3.14*d,2)+" \\times "+n+" = "+fmtF(3.14*d*n,2)+" \\text{ cm} \\\\ &= "+fmtF(dist,2)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmtF(dist,2)+" m</b>.",
      {mode:"wheel", d:d, n:n}); q.figure=u4circleFig("d = "+d+" cm","d"); return q;
  }
  var r=pick([3,5,6,7,8,9]), rope=2*2*3.14*r;
  var pool2=[2*3.14*r,3.14*r*r,rope+6.28,rope*1.5];
  var seen2={}; seen2[fmtF(rope,2)]=1; var ds2=[];
  for(var j=0;j<pool2.length&&ds2.length<3;j++){
    var k2=fmtF(pool2[j],2);
    if(seen2[k2])continue; seen2[k2]=1;
    ds2.push({t:k2, fb:j===1?"That is the area of the garden: edging follows the circumference, and it goes around twice.":"Edging follows the circumference: find C = 2 x pi x r, then double it for two loops."});
  }
  var q=mcq("A circular garden has radius "+r+" m. Edging rope goes around the garden twice. Using 3.14 for pi, how much rope is needed, in metres?",
    {t:fmtF(rope,2), fb:"Yes: one loop is "+fmtF(2*3.14*r,2)+" m, and two loops double it."},
    ds2,
    "\\[ \\begin{aligned} C &= 2 \\times 3.14 \\times "+r+" = "+fmtF(2*3.14*r,2)+" \\text{ m} \\\\ \\text{rope} &= 2 \\times "+fmtF(2*3.14*r,2)+" = "+fmtF(rope,2)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmtF(rope,2)+" m</b>.",
    {mode:"rope", r:r}); q.figure=u4circleFig("r = "+r+" m","r"); return q;
}, ["Each full turn or loop of a circle covers one circumference.", "Start by finding the circumference of the circle in the problem."]);

E("u4-graph-attributes", 4, ["11.2"], 1, "gen", function(){
  if(ri(0,1)===0){
    var a=ri(25,50), b=ri(15,35), c=100-a-b-ri(8,20), miss=100-a-b-c;
    if(c<5){c=10; miss=100-a-b-c;}
    var candP=[miss+10,100-a,Math.round((a+b+c)/3),miss-10,100-b], seenP={}; seenP[miss]=1; var dsP=[];
    for(var i=0;i<candP.length&&dsP.length<3;i++){
      if(candP[i]<=0||seenP[candP[i]])continue; seenP[candP[i]]=1;
      dsP.push({t:candP[i]+"%", fb:"Add the three labelled percents and subtract the total from 100: the missing percent is what is left."});
    }
    return mcq("A circle graph shows three sectors labelled "+a+"%, "+b+"% and "+c+"%, and a fourth sector with no label. What percent belongs on the fourth sector?",
      {t:miss+"%", fb:"Yes: the percents in a circle graph add to 100%."},
      dsP,
      "\\[ \\begin{aligned} \\text{missing} &= 100 - ("+a+" + "+b+" + "+c+") \\\\ &= "+miss+" \\end{aligned} \\] The percents in a circle graph always add to 100%. The answer is <b>"+miss+"%</b>.",
      {mode:"pct"});
  }
  var x=ri(9,16)*10, y=ri(7,12)*10, miss2=360-x-y-ri(6,10)*10;
  if(miss2<30){miss2=60;}
  var z=360-x-y-miss2;
  var candG=[x+y+z,miss2+20,100,miss2-20,90], seenG={}; seenG[miss2]=1; var dsG=[];
  for(var j=0;j<candG.length&&dsG.length<3;j++){
    if(candG[j]<=0||seenG[candG[j]])continue; seenG[candG[j]]=1;
    dsG.push({t:candG[j]+"°", fb:"Add the three given angles and subtract the total from 360: the missing angle is what is left."});
  }
  return mcq("A circle graph has sectors with central angles "+x+"°, "+y+"° and "+z+"°, and one more sector. What is the central angle of the last sector?",
    {t:miss2+"°", fb:"Yes: the central angles in a circle graph add to 360°."},
    dsG,
    "\\[ \\begin{aligned} \\text{missing} &= 360 - ("+x+" + "+y+" + "+z+") \\\\ &= "+miss2+" \\end{aligned} \\] The central angles in a circle graph always add to 360°. The answer is <b>"+miss2+"°</b>.",
    {mode:"ang"});
}, ["Two totals rule every circle graph: percents add to 100 and central angles add to 360.", "Start by adding the parts you are given, then subtract from the full total."]);

E("u4-graph-media", 4, ["11.1"], 2, "var", varset([
  function(){ return mcq("A newspaper circle graph and a magazine circle graph both show favourite sports. To compare how popular soccer is in each survey, what should you compare?",
    {t:"The percent (or sector size) for soccer in each graph", fb:"Yes: percents compare fairly even when the surveys have different sizes."},
    [{t:"The colours used for soccer in each graph and in the legend", fb:"Colours are just labels: they carry no size information."},
     {t:"The radius of each circle as it is printed on the page", fb:"A bigger printed circle does not mean more people: compare the percents."},
     {t:"The titles of the two graphs at the top of each page", fb:"Titles say the topic, not the sizes: compare the soccer percents."}],
    "Circle graphs report parts of a whole as percents, so soccer's share is compared through <b>the percent for soccer in each graph</b>.", {s:1}); },
  function(){ return mcq("Graph A surveyed 200 students and Graph B surveyed 50 students. In both graphs, 40% chose hockey. Which statement is true?",
    {t:"More students chose hockey in Graph A (80) than in Graph B (20)", fb:"Yes: 40% of 200 is 80, and 40% of 50 is 20."},
    [{t:"The same number of students chose hockey in both graphs", fb:"The percents match but the totals differ: 40% of 200 is not 40% of 50."},
     {t:"More students chose hockey in Graph B because its sectors look bigger", fb:"Printed size does not change the counts: compute 40% of each total."},
     {t:"Graph B must be wrong because it surveyed fewer students", fb:"A smaller survey is still a valid survey: its percents describe its own group."}],
    "40% of 200 = 80 students and 40% of 50 = 20 students, so <b>more students chose hockey in Graph A</b>.", {s:2}); },
  function(){ return mcq("Why do news stories often use circle graphs for survey results?",
    {t:"They show each answer as a part of the whole survey at a glance", fb:"Yes: sector sizes show shares of the total clearly."},
    [{t:"They show how values change hour by hour through the day as news breaks", fb:"Change over time is a line graph's job: circle graphs show parts of one whole."},
     {t:"They list every single response in order, one after another", fb:"Circle graphs group responses into sectors: they do not list individuals."},
     {t:"They make small percents look larger than they are in the data", fb:"An honest circle graph keeps sector sizes proportional to the percents."}],
    "A circle graph turns each answer into a sector sized by its share of the total, so it <b>shows parts of a whole at a glance</b>.", {s:3}); },
  function(){ return mcq("A blog post shows a circle graph with no title, no labels and no percents. What is the best conclusion?",
    {t:"The graph cannot be interpreted reliably; the missing labels and values are needed", fb:"Yes: a circle graph needs a title, labels or a legend, and values to read it."},
    [{t:"The largest sector must be the most popular answer, so the graph is fine to use", fb:"Without labels you cannot say what any sector means, even the largest."},
     {t:"The graph is about sports because most circle graphs are about sports", fb:"Guessing the topic is not interpreting: the title is missing."},
     {t:"Each sector must be 25% because there are four sectors in the whole graph as printed", fb:"Sectors are sized by data, not split evenly by default."}],
    "Circle graphs are read through their title, labels and percents; with all of them missing, <b>the graph cannot be interpreted reliably</b>.", {s:4}); },
  function(){ return mcq("Two websites show circle graphs of the same class survey. Website 1 lists percents on every sector; Website 2 lists only colours with a legend. Which graph is easier to compare with a third survey, and why?",
    {t:"Website 1, because its percents can be compared directly with any other survey's percents", fb:"Yes: percents are the common language of circle graphs."},
    [{t:"Website 2, because colours are easier to remember than numbers when comparing surveys", fb:"Colours only name categories: comparing surveys needs the percents."},
     {t:"They are equally easy, because both show the same sectors and the same data", fb:"Reading amounts from Website 2 needs measuring angles: Website 1 states them."},
     {t:"Neither, because circle graphs from different websites can never be compared with each other", fb:"They can be compared: percents put different surveys on the same scale."}],
    "Percents let you compare shares across surveys directly, so <b>Website 1 is easier to compare</b>.", {s:5}); }
]), ["Circle graphs in media are read through their titles, labels and percents.", "Start by asking what information each graph actually gives you."]);

E("u4-graph-read", 4, ["11.4"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:c.pct+"%", fb:"That is the percent for "+c.name+": find "+cat.name+" in the legend."};
  });
  var q=mcq("The circle graph shows students' "+g.topic+". What percent of students chose "+cat.name+"?",
    {t:cat.pct+"%", fb:"Yes: the legend gives "+cat.name+" as "+cat.pct+"%."},
    ds,
    "Match "+cat.name+" in the legend to its sector: it is labelled "+cat.pct+"%. The answer is <b>"+cat.pct+"%</b>.",
    {topic:g.topic, idx:idx});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Use the legend to match each sector letter to its category and percent.", "Start by finding the category in the legend beside the graph."]);

E("u4-graph-quantities", 4, ["11.5","11.4"], 1, "gen", function(){
  var g=u4graphData(), idx=ri(0,3), cat=g.cats[idx];
  var T=pick([100,200,300,400]), qty=cat.pct*T/100;
  var ds=g.cats.filter(function(c,i){return i!==idx;}).map(function(c){
    return {t:String(c.pct*T/100), fb:"That is the count for "+c.name+": use the percent for "+cat.name+"."};
  });
  var q=mcq("The circle graph shows the "+g.topic+" of "+T+" students. How many students chose "+cat.name+"?",
    {t:String(qty), fb:"Yes: "+cat.pct+"% of "+T+" is "+qty+"."},
    ds,
    "\\[ \\begin{aligned} \\text{students} &= "+FR(cat.pct,"100")+" \\times "+T+" \\\\ &= "+qty+" \\end{aligned} \\] The answer is <b>"+qty+"</b>.",
    {topic:g.topic, idx:idx, T:T});
  q.figure=u4pieFig(g.cats,false);
  return q;
}, ["Turn the sector's percent into a count by multiplying it by the total surveyed.", "Start by reading the percent for the category from the legend."]);

E("u4-graph-create", 4, ["11.3","9.13"], 3, "gen", function(){
  var topics=[
    {t:"favourite season", cats:["Spring","Summer","Fall","Winter"]},
    {t:"favourite pet", cats:["Dog","Cat","Fish","Bird"]},
    {t:"lunch choice", cats:["Pizza","Pasta","Salad","Soup"]}
  ];
  var tp=pick(topics);
  var ps=pick([[40,25,20,15],[50,20,20,10],[30,30,25,15],[45,25,20,10],[35,30,20,15],[60,20,10,10]]);
  var T=pick([20,40,50,60,100]);
  var counts=ps.map(function(p){return p*T/100;});
  if(counts.some(function(x){return x!==Math.round(x);})){T=100; counts=ps.slice();}
  var idx=ri(0,3), ang=ps[idx]*3.6;
  var dataStr=tp.cats.map(function(name,i){return name+": "+counts[i];}).join(", ");
  var pool=[ps[idx],360-ang,ang/2,ang+36];
  var seen={}; seen[fmt(ang)+"°"]=1; var ds=[];
  for(var i=0;i<pool.length&&ds.length<3;i++){
    var k=fmt(pool[i])+"°";
    if(seen[k])continue; seen[k]=1;
    ds.push({t:k, fb:i===0?"That is the percent itself: an angle is the percent of a full 360° turn.":"The central angle is the category's share of 360°."});
  }
  return mcq("A class of "+T+" students was surveyed about "+tp.t+": "+dataStr+". To create a circle graph, what central angle should the sector for "+tp.cats[idx]+" have?",
    {t:fmt(ang)+"°", fb:"Yes: "+tp.cats[idx]+" is "+ps[idx]+"% of the class, and "+ps[idx]+"% of 360° is "+fmt(ang)+"°."},
    ds,
    "\\[ \\begin{aligned} \\text{share} &= "+FR(counts[idx],T)+" = "+ps[idx]+"\\% \\\\ \\text{angle} &= "+FR(ps[idx],"100")+" \\times 360° \\\\ &= "+fmt(ang)+"° \\end{aligned} \\] The answer is <b>"+fmt(ang)+"°</b>.",
    {topic:tp.t, idx:idx});
}, ["A sector's central angle is its share of the full 360 degrees.", "Start by finding the category's share of the total as a percent."]);

E("u4-cr-area-mix", 4, ["9.3"], 2, "gen", function(){
  var b1=ri(6,14), h1=ri(3,9), b2=ri(6,14), h2=pick([4,6,8,10,12]);
  var A1=b1*h1, A2=b2*h2/2, tot=A1+A2;
  var q=numq("A garden is made of a parallelogram plot with base "+b1+" m and height "+h1+" m, joined to a triangular plot with base "+b2+" m and height "+h2+" m. What is the total area of the garden? Give your answer in square metres.",
    tot, 0.01,
    "\\[ \\begin{aligned} A_{\\text{parallelogram}} &= "+b1+" \\times "+h1+" = "+A1+" \\\\ A_{\\text{triangle}} &= "+FR(b2+" \\times "+h2,"2")+" = "+A2+" \\\\ \\text{total} &= "+A1+" + "+A2+" = "+tot+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+tot+" m²</b>.",
    {b1:b1, h1:h1, b2:b2, h2:h2}); q.figure=figMix(b1,h1,b2,h2,"m"); return q;
}, ["Find each plot's area with its own formula, then add.", "Start with the parallelogram: base times height."]);

E("u4-cr-circumference", 4, ["9.10"], 2, "gen", function(){
  var d=pick([8,10,12,15,20,25,30,40]), laps=ri(3,12);
  var tot=3.14*d*laps;
  var q=numq("A running track is a circle with diameter "+d+" m. A runner completes "+laps+" laps of the track. Using 3.14 for pi, how far does the runner run? Give your answer in metres.",
    tot, 0.01,
    "\\[ \\begin{aligned} C &= 3.14 \\times "+d+" = "+fmtF(3.14*d,2)+" \\text{ m} \\\\ \\text{distance} &= "+fmtF(3.14*d,2)+" \\times "+laps+" = "+fmtF(tot,2)+" \\text{ m} \\end{aligned} \\] The answer is <b>"+fmtF(tot,2)+" m</b>.",
    {d:d, laps:laps}); q.figure=u4circleFig("d = "+d+" m","d"); return q;
}, ["One lap is one circumference; multiply by the number of laps.", "Start with C = pi x d using 3.14 for pi."]);

E("u4-cr-graph-quantity", 4, ["11.5"], 1, "gen", function(){
  var topics=[["favourite recess activity",["Kickball","Reading","Drawing","Skipping"]],["favourite fruit",["Apple","Banana","Grapes","Orange"]],["way to spend a rainy day",["Movies","Games","Books","Baking"]]];
  var tp=pick(topics);
  var ps=pick([[45,25,20,10],[35,30,25,10],[50,20,15,15],[40,30,20,10],[30,25,25,20]]);
  var T=pick([60,80,100,120,200,240]);
  var idx=ri(0,3), qty=ps[idx]*T/100;
  if(qty!==Math.round(qty)){T=200; qty=ps[idx]*2;}
  var dataStr=tp[1].map(function(name,i){return name+" "+ps[i]+"%";}).join(", ");
  return numq("A circle graph of "+tp[0]+" for "+T+" students shows: "+dataStr+". How many students chose "+tp[1][idx]+"?",
    qty, 0.01,
    "\\[ \\begin{aligned} \\text{students} &= "+FR(ps[idx],"100")+" \\times "+T+" \\\\ &= "+qty+" \\end{aligned} \\] The answer is <b>"+qty+"</b>.",
    {idx:idx, T:T});
}, ["Multiply the category's percent by the total number of students.", "Start by writing the percent as a fraction out of 100."]);

E("u4-cr-area-circle", 4, ["9.9","9.3"], 3, "gen", function(){
  if(ri(0,1)===0){
    var d=2*ri(3,30), r=d/2, A=3.14*r*r;
    var q=numq("A circular splash pad has diameter "+d+" m. Using 3.14 for pi, what is the area of the splash pad? Give your answer in square metres.",
      A, 0.01,
      "\\[ \\begin{aligned} r &= "+d+" \\div 2 = "+r+" \\text{ m} \\\\ A &= 3.14 \\times "+r+"^2 \\\\ &= "+fmtF(A,2)+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+fmtF(A,2)+" m²</b>.",
      {mode:"d", d:d}); q.figure=u4circleFig("d = "+d+" m","d"); return q;
  }
  var rr=ri(3,30), AA=3.14*rr*rr;
  var q=numq("A circular rug has radius "+rr+" m. Using 3.14 for pi, what is the area of the rug? Give your answer in square metres.",
    AA, 0.01,
    "\\[ \\begin{aligned} A &= 3.14 \\times "+rr+"^2 \\\\ &= "+fmtF(AA,2)+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+fmtF(AA,2)+" m²</b>.",
    {mode:"r", r:rr}); q.figure=u4circleFig("r = "+rr+" m","r"); return q;
}, ["Make sure you have the radius, then use A = pi x r².", "Start by finding the radius: halve the diameter if that is what is given."]);

E("u4-cr-composite", 4, ["9.3","9.10"], 3, "gen", function(){
  var w=pick([5,6,7,8,9,10,11,12,14,16]), L=ri(4,14), r=w/2, semi=3.14*r*r/2, tot=w*L+semi;
  var q=numq("A sign is a rectangle "+w+" m wide and "+L+" m tall, with a semicircle (half of a circle) of diameter "+w+" m attached across the top. Using 3.14 for pi, what is the total area of the sign? Give your answer in square metres.",
    tot, 0.05,
    "\\[ \\begin{aligned} A_{\\text{rectangle}} &= "+w+" \\times "+L+" = "+(w*L)+" \\\\ A_{\\text{semicircle}} &= "+FR("3.14 \\times "+r+"^2","2")+" = "+fmtF(semi,2)+" \\\\ \\text{total} &= "+(w*L)+" + "+fmtF(semi,2)+" = "+fmtF(tot,2)+" \\text{ m}^2 \\end{aligned} \\] The answer is <b>"+fmtF(tot,2)+" m²</b>.",
    {w:w, L:L}); q.figure=figSign(w+" m",L+" m"); return q;
}, ["Split the sign into a rectangle and a semicircle, find each area, then add.", "Start with the rectangle, then find the semicircle: its radius is half of the sign's width."]);
