// Math 1202 Unit 3 Measuring Area question bank
// Figures (added Nov 2026): circle, triangle, tiled floor, painted
// wall, missing dimension and dimension change entries draw
// labelled figures from each question's own values. Referent,
// unit choice, conversion, error spotting and problem creation
// entries stay figureless: they name no single measured shape.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 1486 to 2051).
// CRMARKS: u3-cr-triangle=2
// CRMARKS: u3-cr-circle=2
// CRMARKS: u3-cr-tiles=2
// CRMARKS: u3-cr-cylinder-sa=3
// CRMARKS: u3-cr-cone-sa=3
// CRMARKS: u3-cr-paint=3
// CRMARKS: u3-cr-design-width=2
// CRMARKS: u3-cr-house-composite=3
/* ===== Unit 3 ===== */
// Unit 3 Measuring Area - Math 1202 Review bank
// Helpers prefixed u3.
function u3UniqText(arr){ var s={}, i; for(i=0;i<arr.length;i++){ if(s[arr[i]]) return false; s[arr[i]]=1; } return true; }
function u3GridFig(cols, rows, triBase, unit){
  var cell=26, W=(cols+triBase)*cell+50, H=rows*cell+46, ox=24, oy=16, s="", i, j;
  s+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Shaded rectangle with a shaded triangle on a square grid">';
  s+='<rect x="'+ox+'" y="'+oy+'" width="'+(cols*cell)+'" height="'+(rows*cell)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  var tx=ox+cols*cell;
  s+='<polygon points="'+tx+','+(oy+rows*cell)+' '+(tx+triBase*cell)+','+(oy+rows*cell)+' '+tx+','+oy+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(i=0;i<=cols;i++){ s+='<line x1="'+(ox+i*cell)+'" y1="'+oy+'" x2="'+(ox+i*cell)+'" y2="'+(oy+rows*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>'; }
  for(j=0;j<=rows;j++){ s+='<line x1="'+ox+'" y1="'+(oy+j*cell)+'" x2="'+(ox+cols*cell)+'" y2="'+(oy+j*cell)+'" stroke="'+FIG_INK+'" stroke-width="0.7"/>'; }
  s+='<text x="'+(ox+cols*cell/2)+'" y="'+(oy+rows*cell+18)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+cols+' squares</text>';
  s+='<text x="'+(ox-6)+'" y="'+(oy+rows*cell/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">'+rows+'</text>';
  s+='<text x="'+(tx+triBase*cell/2)+'" y="'+(oy+rows*cell+18)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">tri '+triBase+'</text>';
  s+='<text x="'+(W/2)+'" y="'+(H-2)+'" font-size="11" fill="'+FIG_INK+'" text-anchor="middle">Each grid square is 1 '+unit+' by 1 '+unit+'</text>';
  return s+'</svg>';
}
function u3StepFig(W1,H1,W2,H2,unit){
  // Step shape: bottom rectangle W1 x H1, top-left block W2 x H2 above it.
  var sc=16, W=(W1*sc)+56, H=((H1+H2)*sc)+44, ox=28, base=18+(H1+H2)*sc, s="";
  var yTop=18, yMid=18+H2*sc;
  s+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Step shaped composite figure">';
  s+='<polygon points="'+ox+','+base+' '+(ox+W1*sc)+','+base+' '+(ox+W1*sc)+','+yMid+' '+(ox+W2*sc)+','+yMid+' '+(ox+W2*sc)+','+yTop+' '+ox+','+yTop+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="'+(ox+W1*sc/2)+'" y="'+(base+18)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+W1+' '+unit+'</text>';
  s+='<text x="'+(ox+W1*sc+6)+'" y="'+(yMid+H1*sc/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">'+H1+' '+unit+'</text>';
  s+='<text x="'+(ox+W2*sc/2)+'" y="'+(yTop-5)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">'+W2+' '+unit+'</text>';
  s+='<text x="'+(ox-6)+'" y="'+(yTop+H2*sc/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">'+H2+' '+unit+'</text>';
  return s+'</svg>';
}
function u3BoxFig(l,w,h,unit){
  var s='<svg viewBox="0 0 300 190" width="300" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Closed rectangular box">';
  s+='<polygon points="70,80 210,80 210,160 70,160" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="70,80 110,40 250,40 210,80" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<polygon points="210,80 250,40 250,120 210,160" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="140" y="178" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">length '+l+' '+unit+'</text>';
  s+='<text x="262" y="105" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">width '+w+' '+unit+'</text>';
  s+='<text x="52" y="122" font-size="13" fill="'+FIG_INK+'" text-anchor="end">height '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3CylFig(r,h,unit){
  var s='<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right cylinder">';
  s+='<ellipse cx="110" cy="42" rx="58" ry="16" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="52" y1="42" x2="52" y2="142" stroke="'+FIG_INK+'" stroke-width="2"/><line x1="168" y1="42" x2="168" y2="142" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<ellipse cx="110" cy="142" rx="58" ry="16" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="110" y1="42" x2="168" y2="42" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="140" y="32" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  s+='<text x="182" y="95" font-size="13" fill="'+FIG_INK+'" text-anchor="start">h = '+h+' '+unit+'</text>';
  return s+'</svg>';
}
function u3ConeFig(r,sl,unit){
  var s='<svg viewBox="0 0 220 190" width="220" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right cone">';
  s+='<polygon points="110,28 52,142 168,142" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<ellipse cx="110" cy="142" rx="58" ry="14" fill="none" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<line x1="110" y1="142" x2="168" y2="142" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<text x="140" y="162" font-size="13" fill="'+FIG_INK+'" text-anchor="middle">r = '+r+' '+unit+'</text>';
  s+='<text x="176" y="82" font-size="13" fill="'+FIG_INK+'" text-anchor="start">slant = '+sl+' '+unit+'</text>';
  return s+'</svg>';
}
function u3HouseFig(w,h,th,unit){
  var sc=15, W=w*sc+56, H=(h+th)*sc+46, ox=28, base=16+(h+th)*sc, yRoof=16+th*sc, s="", i;
  s+='<svg viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="House shaped figure on a faint grid">';
  for(i=1;i<w;i++){ s+='<line x1="'+(ox+i*sc)+'" y1="16" x2="'+(ox+i*sc)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="0.5" opacity="0.45"/>'; }
  for(i=1;i<h+th;i++){ s+='<line x1="'+ox+'" y1="'+(16+i*sc)+'" x2="'+(ox+w*sc)+'" y2="'+(16+i*sc)+'" stroke="'+FIG_INK+'" stroke-width="0.5" opacity="0.45"/>'; }
  s+='<polygon points="'+ox+','+base+' '+(ox+w*sc)+','+base+' '+(ox+w*sc)+','+yRoof+' '+(ox+w*sc/2)+',16 '+ox+','+yRoof+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<text x="'+(ox+w*sc/2)+'" y="'+(base+18)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="middle">width '+w+' '+unit+'</text>';
  s+='<text x="'+(ox+w*sc+6)+'" y="'+(yRoof+h*sc/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="start">wall '+h+' '+unit+'</text>';
  s+='<text x="'+(ox-6)+'" y="'+(16+th*sc/2)+'" font-size="12" fill="'+FIG_INK+'" text-anchor="end">roof '+th+'</text>';
  return s+'</svg>';
}

function u3TileFig(L,W){
  var cell=Math.min(215/L,118/W), ox=42, oy=24, s='<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangular floor tiled with square tiles">';
  s+='<rect x="'+ox+'" y="'+oy+'" width="'+fmt(L*cell,1)+'" height="'+fmt(W*cell,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.35" stroke="'+FIG_INK+'" stroke-width="2"/>';
  for(var i=1;i<L/2;i++){ var x=ox+i*2*cell; s+='<line x1="'+fmt(x,1)+'" y1="'+oy+'" x2="'+fmt(x,1)+'" y2="'+fmt(oy+W*cell,1)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>'; }
  for(var j=1;j<W/2;j++){ var y=oy+j*2*cell; s+='<line x1="'+ox+'" y1="'+fmt(y,1)+'" x2="'+fmt(ox+L*cell,1)+'" y2="'+fmt(y,1)+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>'; }
  s+=_txt(ox+L*cell/2,oy+W*cell+17,L+" ft",12.5,false);
  s+=_txt(ox+L*cell+20,oy+W*cell/2,W+" ft",12.5,false);
  return s+'</svg>';
}
function u3PaintFig(W,H,ww,wh){
  var sc=Math.min(215/W,115/H), ox=42, oy=26, wx=ox+(W-ww)*sc/2, wy=oy+(H-wh)*sc/2;
  var s='<svg viewBox="0 0 320 190" width="320" height="190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Wall with one window that will not be painted">';
  s+='<rect x="'+ox+'" y="'+oy+'" width="'+fmt(W*sc,1)+'" height="'+fmt(H*sc,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.35" stroke="'+FIG_INK+'" stroke-width="2"/>';
  s+='<rect x="'+fmt(wx,1)+'" y="'+fmt(wy,1)+'" width="'+fmt(ww*sc,1)+'" height="'+fmt(wh*sc,1)+'" fill="#ffffff" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+=_txt(wx+ww*sc/2,wy+wh*sc/2,ww+" m by "+wh+" m",11.5,false);
  s+=_txt(ox+W*sc/2,oy+H*sc+17,W+" m",12.5,false);
  s+=_txt(ox+W*sc+18,oy+H*sc/2,H+" m",12.5,false);
  return s+'</svg>';
}
function u3RectPairFig(l,w,nl,nw){
  function rect(x0,l2,w2,lab){
    var sc=Math.min(118/Math.max(l2,1),92/Math.max(w2,1)), rw=l2*sc, rh=w2*sc, y0=148-rh;
    var out='<rect x="'+x0+'" y="'+fmt(y0,1)+'" width="'+fmt(rw,1)+'" height="'+fmt(rh,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
    out+=_txt(x0+rw/2,164,lab,12,false);
    return out;
  }
  var s='<svg viewBox="0 0 320 185" width="320" height="185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Original rectangle and changed rectangle">';
  s+=rect(28,l,w,l+" m by "+w+" m");
  s+=rect(178,nl,nw,nl+" m by "+nw+" m");
  return s+'</svg>';
}

/* ---------- Level 1 ---------- */
E("u3-referents", 3, ["3.24","3.28"], 1, "var", varset([
  function(){ return mcq("Which object is a good referent for an area of \\(1\\ \\text{m}^2\\)?",
    {t:"A small square tabletop, about 1 m by 1 m", fb:"Yes: 1 m by 1 m gives an area of 1 square metre."},
    [{t:"A postage stamp", fb:"A stamp is closer to a few square centimetres, far smaller than 1 square metre."},
     {t:"A sheet of loose leaf paper", fb:"A sheet of paper is only about 600 square centimetres, well under 1 square metre."},
     {t:"The floor of a whole classroom", fb:"A classroom floor is many square metres, far larger than the referent asked for."}],
    "A referent is a familiar object with about the stated size. A tabletop about \\(1\\ \\text{m} \\times 1\\ \\text{m}\\) has area \\(1\\ \\text{m}^2\\). The answer is <b>a small square tabletop, about 1 m by 1 m</b>.", {}); },
  function(){ return mcq("Which object is a good referent for an area of \\(1\\ \\text{cm}^2\\)?",
    {t:"A thumbnail", fb:"Yes: a thumbnail is about 1 cm by 1 cm."},
    [{t:"A floor tile in a hallway", fb:"A floor tile is hundreds of square centimetres, far larger than 1 square centimetre."},
     {t:"The cover of a textbook", fb:"A textbook cover is hundreds of square centimetres, far larger than the referent asked for."},
     {t:"A bath towel spread out flat", fb:"A towel is close to a square metre, far larger than 1 square centimetre."}],
    "A thumbnail is about \\(1\\ \\text{cm} \\times 1\\ \\text{cm} = 1\\ \\text{cm}^2\\). The answer is <b>a thumbnail</b>.", {}); },
  function(){ return mcq("Which object is a good referent for an area of \\(1\\ \\text{ft}^2\\)?",
    {t:"A floor tile 12 in. by 12 in.", fb:"Yes: 12 in. is 1 ft, so the tile is 1 ft by 1 ft."},
    [{t:"A postage stamp", fb:"A stamp is a few square inches, far smaller than 1 square foot."},
     {t:"A sheet of loose leaf paper", fb:"A sheet of paper is under 1 square foot and is not the standard tile referent here."},
     {t:"A double bed mattress top", fb:"A mattress top is many square feet, far larger than the referent asked for."}],
    "\\(12\\ \\text{in.} = 1\\ \\text{ft}\\), so a tile \\(1\\ \\text{ft} \\times 1\\ \\text{ft}\\) has area \\(1\\ \\text{ft}^2\\). The answer is <b>a floor tile 12 in. by 12 in.</b>", {}); },
  function(){ return mcq("Which object is a good referent for an area of \\(1\\ \\text{in}^2\\)?",
    {t:"A postage stamp", fb:"Yes: a stamp is about 1 in. by 1 in."},
    [{t:"A fingernail clipping tray", fb:"That tray is not a standard small referent; it is much wider than 1 inch across its full top."},
     {t:"The top of a coffee mug", fb:"A mug top is several inches across, so its area is many square inches."},
     {t:"A place mat on a table", fb:"A place mat is hundreds of square inches, far larger than the referent asked for."}],
    "A postage stamp is about \\(1\\ \\text{in.} \\times 1\\ \\text{in.} = 1\\ \\text{in}^2\\). The answer is <b>a postage stamp</b>.", {}); },
  function(){ return mcq("A worker measures the area of a classroom floor. Which unit is the best fit?",
    {t:"Square metres", fb:"Yes: classroom floors are measured in square metres."},
    [{t:"Square centimetres", fb:"Square centimetres suit small faces, like a sticky note; the count for a floor would be huge."},
     {t:"Square millimetres", fb:"Square millimetres suit tiny faces; the count for a floor would be enormous."},
     {t:"Square kilometres", fb:"Square kilometres suit very large land areas, not one room."}],
    "Choose the unit that gives a sensible count for the size of the surface. A classroom floor fits <b>square metres</b>.", {}); },
  function(){ return mcq("A farmer measures the area of a large field. Which unit is the best fit?",
    {t:"Hectares", fb:"Yes: fields are commonly measured in hectares."},
    [{t:"Square inches", fb:"Square inches suit tiny faces; the count for a field would be enormous."},
     {t:"Square centimetres", fb:"Square centimetres suit small faces, like a phone screen; the count for a field would be huge."},
     {t:"Square feet", fb:"Square feet suit rooms and decks; a large field is usually reported in hectares or acres."}],
    "Choose the unit that gives a sensible count for the size of the surface. A large field fits <b>hectares</b>.", {}); }
]), ["Think of a familiar object with about that area.", "Picture the object and compare its length and width with the unit."]);

E("u3-estimate-referent", 3, ["3.25","3.24"], 1, "gen", function(){
  var items=[
    {name:"floor tiles", ref:900, unit:"cm", surf:"a bathroom floor", refName:"each tile is about 30 cm by 30 cm, or 900 square centimetres"},
    {name:"sheets of paper", ref:600, unit:"cm", surf:"a bulletin board", refName:"each sheet is about 600 square centimetres"},
    {name:"floor tiles", ref:1, unit:"ft", surf:"a small porch", refName:"each tile is about 1 square foot"},
    {name:"place mats", ref:1200, unit:"cm", surf:"a long table top", refName:"each mat is about 1200 square centimetres"},
    {name:"square paving stones", ref:1, unit:"ft", surf:"a garden path", refName:"each stone is about 1 square foot"},
    {name:"foam mats", ref:2500, unit:"cm", surf:"a play area floor", refName:"each mat is about 50 cm by 50 cm, or 2500 square centimetres"}
  ];
  var it=pick(items), n=ri(4,24), ans=n*it.ref, u2=it.unit+"^2";
  var d1=Math.max(1,n-3)*it.ref, d2=ans*2, d3=Math.round(ans/2);
  if(d3===ans||d3===d1) d3=ans+it.ref;
  return mcq("A "+it.surf+" is covered by about "+n+" "+it.name+", with no gaps. "+it.refName+". Which is the best estimate of the area of the "+it.surf.split(" ").slice(1).join(" ")+"?",
    {t:fmt(ans)+" \\(\\text{"+it.unit+"}^2\\)", fb:"Yes: multiply the count by the area of one referent."},
    [{t:fmt(d1)+" \\(\\text{"+it.unit+"}^2\\)", fb:"That count is too low: it uses fewer referents than the number covering the surface."},
     {t:fmt(d2)+" \\(\\text{"+it.unit+"}^2\\)", fb:"That doubles the estimate: the referents are counted once, not twice."},
     {t:fmt(d3)+" \\(\\text{"+it.unit+"}^2\\)", fb:"That is about half the estimate: each referent still covers its full area."}],
    "Multiply the number of referents by the area of one referent: \\["+n+" \\times "+fmt(it.ref)+" = "+fmt(ans)+"\\] The best estimate is <b>"+fmt(ans)+" square "+(it.unit==="cm"?"centimetres":"feet")+"</b>.",
    {n:n, ref:it.ref});
}, ["Use the referent: total area is the count times the area of one referent.", "Write the count and the area of one tile, sheet, mat or stone, then multiply."]);

E("u3-choose-unit", 3, ["3.28"], 1, "var", varset([
  function(){ return mcq("Which unit best fits the area of a sticky note?",
    {t:"Square centimetres", fb:"Yes: a sticky note face is a small area, well suited to square centimetres."},
    [{t:"Square metres", fb:"Square metres suit floors and walls; a sticky note would be a tiny fraction of one."},
     {t:"Square kilometres", fb:"Square kilometres suit land areas, not a small note."},
     {t:"Hectares", fb:"Hectares suit fields and large lots, not a small note."}],
    "Match the unit to the size of the surface. A sticky note fits <b>square centimetres</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of a kitchen floor?",
    {t:"Square feet", fb:"Yes: kitchen floors are commonly measured in square feet."},
    [{t:"Square inches", fb:"Square inches suit small faces; the count for a floor would be very large."},
     {t:"Square yards", fb:"Square yards are used for some flooring, but kitchen floors in home projects are most often given in square feet."},
     {t:"Square miles", fb:"Square miles suit very large land areas, not one room."}],
    "Match the unit to the size of the surface. A kitchen floor fits <b>square feet</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of the screen of a phone?",
    {t:"Square inches", fb:"Yes: a phone screen is a small area, well suited to square inches."},
    [{t:"Square feet", fb:"Square feet suit tiles and small floors; a screen would be a small fraction of one."},
     {t:"Square yards", fb:"Square yards suit fabric and carpet areas, far larger than a screen."},
     {t:"Acres", fb:"Acres suit land, not a small screen."}],
    "Match the unit to the size of the surface. A phone screen fits <b>square inches</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of a school gym floor?",
    {t:"Square metres", fb:"Yes: a gym floor is a large indoor surface, well suited to square metres."},
    [{t:"Square millimetres", fb:"Square millimetres suit tiny faces; the count for a gym floor would be enormous."},
     {t:"Square centimetres", fb:"Square centimetres suit small faces; the count for a gym floor would be very large."},
     {t:"Square kilometres", fb:"Square kilometres suit regions and large land areas, not one building floor."}],
    "Match the unit to the size of the surface. A gym floor fits <b>square metres</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of a sheet of plywood?",
    {t:"Square feet", fb:"Yes: a plywood sheet is sold and measured by its face area in square feet."},
    [{t:"Square inches", fb:"Square inches suit small faces; the count for a full sheet would be large and awkward."},
     {t:"Acres", fb:"Acres suit land, not a building sheet."},
     {t:"Square miles", fb:"Square miles suit very large land areas, not a building sheet."}],
    "Match the unit to the size of the surface. A plywood sheet fits <b>square feet</b>.", {}); },
  function(){ return mcq("Which unit best fits the area of a vegetable garden plot?",
    {t:"Square metres", fb:"Yes: a garden plot is a modest outdoor area, well suited to square metres."},
    [{t:"Square millimetres", fb:"Square millimetres suit tiny faces; the count for a garden would be enormous."},
     {t:"Square kilometres", fb:"Square kilometres suit large land areas, far bigger than a garden plot."},
     {t:"Hectares", fb:"Hectares suit farm fields; a home garden plot is much smaller."}],
    "Match the unit to the size of the surface. A garden plot fits <b>square metres</b>.", {}); }
]), ["Match the unit size to the size of the surface.", "Rule out units that would give a huge count or a tiny fraction for this surface."]);

E("u3-si-convert", 3, ["3.29"], 1, "gen", function(){
  var mode=pick(["m2cm","cm2mm","cm2m"]);
  if(mode==="m2cm"){ var v=ri(2,18), ans=v*10000;
    return mcq("Write \\("+v+"\\ \\text{m}^2\\) in square centimetres.",
      {t:fmt(ans)+" \\(\\text{cm}^2\\)", fb:"Yes: 1 square metre is 10 000 square centimetres."},
      [{t:fmt(v*100)+" \\(\\text{cm}^2\\)", fb:"That uses the linear factor 100. Areas use the squared factor, 10 000."},
       {t:fmt(v*1000)+" \\(\\text{cm}^2\\)", fb:"That uses 1000, the cubic factor. Areas use 10 000 here."},
       {t:fmt(v*10)+" \\(\\text{cm}^2\\)", fb:"That is far too small: each square metre holds 10 000 square centimetres."}],
      "\\[ \\begin{aligned} "+v+"\\ \\text{m}^2 &= "+v+" \\times 10000\\ \\text{cm}^2 \\\\ &= "+fmt(ans)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square centimetres</b>.", {mode:mode,v:v}); }
  if(mode==="cm2mm"){ var v2=ri(3,40), ans2=v2*100;
    return mcq("Write \\("+v2+"\\ \\text{cm}^2\\) in square millimetres.",
      {t:fmt(ans2)+" \\(\\text{mm}^2\\)", fb:"Yes: 1 square centimetre is 100 square millimetres."},
      [{t:fmt(v2*10)+" \\(\\text{mm}^2\\)", fb:"That uses the linear factor 10. Areas use the squared factor, 100."},
       {t:fmt(v2*1000)+" \\(\\text{mm}^2\\)", fb:"That is ten times too large: the squared factor from centimetres to millimetres is 100."},
       {t:fmt(v2)+" \\(\\text{mm}^2\\)", fb:"The value must change: square millimetres are smaller units, so the count grows."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{cm}^2 &= "+v2+" \\times 100\\ \\text{mm}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{mm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square millimetres</b>.", {mode:mode,v:v2}); }
  var k=ri(2,15), v3=k*10000, ans3=k;
  return mcq("Write \\("+fmt(v3)+"\\ \\text{cm}^2\\) in square metres.",
    {t:fmt(ans3)+" \\(\\text{m}^2\\)", fb:"Yes: divide by 10 000 to move to the larger unit."},
    [{t:fmt(v3/100)+" \\(\\text{m}^2\\)", fb:"That divides by the linear factor 100. Areas use the squared factor, 10 000."},
     {t:fmt(v3/1000)+" \\(\\text{m}^2\\)", fb:"That divides by 1000. Areas use the squared factor, 10 000."},
     {t:fmt(v3*10000)+" \\(\\text{m}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller, not larger."}],
    "\\[ \\begin{aligned} "+fmt(v3)+"\\ \\text{cm}^2 &= "+fmt(v3)+" \\div 10000\\ \\text{m}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square metres</b>.", {mode:mode,v:v3});
}, ["Area conversions use squared factors, not the linear factors.", "For metres to centimetres, the area factor is 100 squared, which is 10 000."]);

E("u3-imperial-convert", 3, ["3.30"], 1, "gen", function(){
  var mode=pick(["ft2in","yd2ft","ft2yd"]);
  if(mode==="ft2in"){ var v=ri(2,30), ans=v*144;
    return mcq("Write \\("+v+"\\ \\text{ft}^2\\) in square inches.",
      {t:fmt(ans)+" \\(\\text{in}^2\\)", fb:"Yes: 1 square foot is 144 square inches."},
      [{t:fmt(v*12)+" \\(\\text{in}^2\\)", fb:"That uses the linear factor 12. Areas use the squared factor, 144."},
       {t:fmt(v*24)+" \\(\\text{in}^2\\)", fb:"That doubles the linear factor. Areas use the squared factor, 144."},
       {t:fmt(v*100)+" \\(\\text{in}^2\\)", fb:"100 is an SI-style factor. For feet to inches the squared factor is 144."}],
      "\\[ \\begin{aligned} "+v+"\\ \\text{ft}^2 &= "+v+" \\times 144\\ \\text{in}^2 \\\\ &= "+fmt(ans)+"\\ \\text{in}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square inches</b>.", {mode:mode,v:v}); }
  if(mode==="yd2ft"){ var v2=ri(2,30), ans2=v2*9;
    return mcq("Write \\("+v2+"\\ \\text{yd}^2\\) in square feet.",
      {t:fmt(ans2)+" \\(\\text{ft}^2\\)", fb:"Yes: 1 square yard is 9 square feet."},
      [{t:fmt(v2*3)+" \\(\\text{ft}^2\\)", fb:"That uses the linear factor 3. Areas use the squared factor, 9."},
       {t:fmt(v2*6)+" \\(\\text{ft}^2\\)", fb:"That doubles the linear factor. Areas use the squared factor, 9."},
       {t:fmt(v2*36)+" \\(\\text{ft}^2\\)", fb:"36 is the squared factor for yards to inches. For yards to feet it is 9."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{yd}^2 &= "+v2+" \\times 9\\ \\text{ft}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{ft}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square feet</b>.", {mode:mode,v:v2}); }
  var k=ri(2,30), v3=k*9, ans3=k;
  return mcq("Write \\("+v3+"\\ \\text{ft}^2\\) in square yards.",
    {t:fmt(ans3)+" \\(\\text{yd}^2\\)", fb:"Yes: divide by 9 to move to the larger unit."},
    [{t:fmt(v3/3)+" \\(\\text{yd}^2\\)", fb:"That divides by the linear factor 3. Areas use the squared factor, 9."},
     {t:fmt(v3*9)+" \\(\\text{yd}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller."},
     {t:fmt(v3)+" \\(\\text{yd}^2\\)", fb:"The value must change: square yards are larger units, so the count drops."}],
    "\\[ \\begin{aligned} "+v3+"\\ \\text{ft}^2 &= "+v3+" \\div 9\\ \\text{yd}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{yd}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square yards</b>.", {mode:mode,v:v3});
}, ["Area conversions use squared factors, not the linear factors.", "For feet to inches, the area factor is 12 squared, which is 144."]);

/* ---------- Level 2 MC ---------- */
E("u3-estimate-object", 3, ["3.25","3.27"], 2, "gen", function(){
  var ctxs=[
    {obj:"rug", unit:"ft", cover:"square floor tiles, each 1 ft by 1 ft"},
    {obj:"patio", unit:"ft", cover:"square paving stones, each 1 ft by 1 ft"},
    {obj:"classroom bulletin board", unit:"cm", cover:"sheets of paper laid edge to edge"},
    {obj:"garden bed", unit:"ft", cover:"square stepping stones, each 1 ft by 1 ft"},
    {obj:"table top", unit:"cm", cover:"square coasters laid edge to edge"},
    {obj:"play mat area", unit:"ft", cover:"square foam tiles, each 1 ft by 1 ft"}
  ];
  var c=pick(ctxs), L=0, W=0, ans=0, per=0, sum=0, dbl=0, g1=0;
  do { L=ri(3,11); W=ri(3,10); ans=L*W; per=2*(L+W); sum=L+W; dbl=ans*2; g1++; }
  while(g1<60 && !u3UniqText([String(ans),String(per),String(sum),String(dbl)]));
  return mcq("A "+c.obj+" is covered by about "+L+" rows of "+W+" "+c.cover+". Which estimate of its area is reasonable?",
    {t:"About "+fmt(ans)+" \\(\\text{"+c.unit+"}^2\\)", fb:"Yes: the covering count is the rows times the number in each row."},
    [{t:"About "+fmt(per)+" \\(\\text{"+c.unit+"}^2\\)", fb:"That is the distance around the edge, a perimeter, not the covering area."},
     {t:"About "+fmt(sum)+" \\(\\text{"+c.unit+"}^2\\)", fb:"That only adds the two counts. Area needs the counts multiplied."},
     {t:"About "+fmt(dbl)+" \\(\\text{"+c.unit+"}^2\\)", fb:"That doubles the covering count with no reason: each covering piece is counted once."}],
    "The covering pieces form about "+L+" rows of "+W+". \\[ "+L+" \\times "+W+" = "+fmt(ans)+" \\] The reasonable estimate is <b>about "+fmt(ans)+" square "+(c.unit==="ft"?"feet":"centimetres")+"</b>.",
    {L:L,W:W});
}, ["Count the covering pieces in rows, then multiply rows by pieces per row.", "Write the row count and the count in one row, then multiply them."]);

E("u3-grid-estimate", 3, ["3.26"], 2, "gen", function(){
  var w=0, h=0, b=0, unit=pick(["m","cm","ft"]), rect=0, tri=0, ans=0, fullOnly=0, countFull=0, per=0, g2=0;
  do { w=ri(3,6); h=ri(2,5); b=ri(1,3); rect=w*h; tri=b*h/2; ans=rect+tri; fullOnly=rect; countFull=rect+b*h; per=2*(w+h)+b; g2++; }
  while(g2<80 && !u3UniqText([fmt(ans),fmt(fullOnly),fmt(countFull),fmt(per)]));
  var q=mcq("The shaded shape sits on a square grid. Each grid square is 1 "+unit+" by 1 "+unit+". Estimate the area of the shaded shape.",
    {t:fmt(ans)+" \\(\\text{"+unit+"}^2\\)", fb:"Yes: count the full rectangle squares and add the triangle as half of its box."},
    [{t:fmt(fullOnly)+" \\(\\text{"+unit+"}^2\\)", fb:"That counts only the rectangle and leaves out the shaded triangle."},
     {t:fmt(countFull)+" \\(\\text{"+unit+"}^2\\)", fb:"That counts the triangle as a full rectangle. A triangle covers half of its box."},
     {t:fmt(per)+" \\(\\text{"+unit+"}^2\\)", fb:"That value comes from lengths around the shape, not from counting squares."}],
    "Count full squares in the rectangle, then add the triangle as half of its bounding box. \\[ \\begin{aligned} A &= ("+w+" \\times "+h+") + \\tfrac{1}{2}("+b+" \\times "+h+") \\\\ &= "+fmt(rect)+" + "+fmt(tri)+" \\\\ &= "+fmt(ans)+"\\ \\text{"+unit+"}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square units</b>.",
    {w:w,h:h,b:b});
  q.figure=u3GridFig(w,h,b,unit);
  return q;
}, ["Count full squares first, then deal with the partial squares.", "Find the rectangle part, then add the triangle as half of its box."]);

E("u3-reasonable-error", 3, ["3.27","2.5"], 2, "gen", function(){
  var l=ri(4,12), w=ri(3,9); if(w===l) w+=1;
  var area=l*w, type=pick(["perim","add","double"]);
  var ctx=pick(["a garden bed","a poster","a rug","a countertop","a deck section"]);
  var claim, errName, wrongFb;
  if(type==="perim"){ claim=2*(l+w); errName="found the perimeter, adding the sides around the edge"; }
  else if(type==="add"){ claim=l+w; errName="added the length and width instead of multiplying"; }
  else { claim=area*2; errName="multiplied correctly, then doubled the result with no reason"; }
  var alt1=l*(w+1), alt2=(l+1)*w;
  return mcq("A student finds the area of "+ctx+", "+l+" m by "+w+" m, and writes "+fmt(claim)+" \\(\\text{m}^2\\). Which judgement is correct?",
    {t:"The answer is wrong: the student "+errName+". The area is "+fmt(area)+" \\(\\text{m}^2\\).", fb:"Yes: that names the error and gives the corrected area."},
    [{t:"The answer is right: the student's working is correct, and "+fmt(claim)+" \\(\\text{m}^2\\) is the area of the surface.", fb:"That accepts the faulty working. Check how the value was produced."},
     {t:"The answer is wrong: the student "+errName+". The area is "+fmt(alt1)+" \\(\\text{m}^2\\).", fb:"The error is named correctly, but that area uses a width that is 1 m too large."},
     {t:"The answer is wrong: the area is the perimeter of the shape, "+fmt(2*(l+w))+" \\(\\text{m}^2\\), the distance around the edge.", fb:"Perimeter is a length, measured in metres, and it is not the area of the surface."}],
    "Area is length times width. \\[ \\begin{aligned} A &= "+l+" \\times "+w+" \\\\ &= "+fmt(area)+"\\ \\text{m}^2 \\end{aligned} \\] The student's value came from an error, so the judgement is <b>the answer is wrong and the area is "+fmt(area)+" square metres</b>.",
    {l:l,w:w,type:type});
}, ["First compute the area yourself, then compare it with the student's value.", "Find length times width, then look for how the student's value could have been produced."]);

E("u3-composite-area", 3, ["3.31"], 2, "gen", function(){
  var W1=0, H1=0, W2=0, H2=0, unit=pick(["m","ft"]), bottom=0, top=0, ans=0, bound=0, per=0, g3=0;
  do { W1=ri(6,10); H1=ri(3,5); W2=ri(2,4); H2=ri(2,4); if(W2>=W1) W2=W1-2; bottom=W1*H1; top=W2*H2; ans=bottom+top; bound=W1*(H1+H2); per=2*(W1+H1+H2); g3++; }
  while(g3<80 && !u3UniqText([String(ans),String(bound),String(bottom),String(per)]));
  var q=mcq("Find the area of the step shaped floor shown in the figure.",
    {t:fmt(ans)+" \\(\\text{"+unit+"}^2\\)", fb:"Yes: split the step into two rectangles and add their areas."},
    [{t:fmt(bound)+" \\(\\text{"+unit+"}^2\\)", fb:"That is the full bounding rectangle. The step is missing its top right corner, so that overcounts."},
     {t:fmt(bottom)+" \\(\\text{"+unit+"}^2\\)", fb:"That is only the bottom rectangle. The raised block on the left is also part of the floor."},
     {t:fmt(per)+" \\(\\text{"+unit+"}^2\\)", fb:"That value comes from adding side lengths, a perimeter style total, not an area."}],
    "Split the shape into a bottom rectangle and a top block, then add. \\[ \\begin{aligned} A &= ("+W1+" \\times "+H1+") + ("+W2+" \\times "+H2+") \\\\ &= "+fmt(bottom)+" + "+fmt(top)+" \\\\ &= "+fmt(ans)+"\\ \\text{"+unit+"}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {W1:W1,H1:H1,W2:W2,H2:H2});
  q.figure=u3StepFig(W1,H1,W2,H2,unit);
  return q;
}, ["Split a composite shape into rectangles you can handle.", "Find the bottom rectangle first, then the raised block, then add."]);

E("u3-circle-area", 3, ["3.32","2.3"], 2, "gen", function(){
  var ctxs=["a round rug","a round pizza","a circular garden","a round trampoline mat","a circular clock face"];
  var ctx=pick(ctxs), r=ri(3,14), area=Math.PI*r*r, aTxt=fmtF(area,1);
  var circ=fmtF(2*Math.PI*r,1), diam=fmtF(Math.PI*(2*r)*(2*r),1), nosq=fmtF(Math.PI*r,1);
  var q=mcq("Find the area of "+ctx+" with radius "+r+" cm. Give the answer to the nearest tenth.",
    {t:aTxt+" \\(\\text{cm}^2\\)", fb:"Yes: area of a circle is pi times the radius squared."},
    [{t:circ+" \\(\\text{cm}^2\\)", fb:"That is the circumference, the distance around the circle, not the area it covers."},
     {t:diam+" \\(\\text{cm}^2\\)", fb:"That uses the diameter in place of the radius before squaring."},
     {t:nosq+" \\(\\text{cm}^2\\)", fb:"That multiplies pi by the radius once. The radius must be squared."}],
    "Use \\(A = \\pi r^2\\) with the radius given. \\[ \\begin{aligned} A &= \\pi ("+r+")^2 \\\\ &= "+fmtF(area,4)+"\\ldots \\\\ &\\approx "+aTxt+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+aTxt+" square centimetres</b>.",
    {r:r}); q.figure=m12CircleSVG("r = "+r+" cm"); return q;
}, ["For a circle, use pi times radius squared.", "Square the radius first, then multiply by pi."]);

E("u3-error-analysis", 3, ["2.5","3.32"], 2, "var", varset([
  function(){ return mcq("A student finds the area of a triangle with base 8 cm and height 6 cm, and writes \\(8 \\times 6 = 48\\ \\text{cm}^2\\). What is the correct area?",
    {t:"24 \\(\\text{cm}^2\\)", fb:"Yes: the student forgot to divide by 2."},
    [{t:"48 \\(\\text{cm}^2\\)", fb:"That is the student's value. A triangle is half of its bounding rectangle."},
     {t:"14 \\(\\text{cm}^2\\)", fb:"That adds the base and height. Area multiplies them, then halves."},
     {t:"28 \\(\\text{cm}^2\\)", fb:"That is the perimeter of the bounding rectangle, not the triangle area."}],
    "Correct the missing step. \\[ \\begin{aligned} A &= \\tfrac{1}{2}(8)(6) \\\\ &= 24\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>24 square centimetres</b>.", {}); },
  function(){ return mcq("A student finds the area of a circle with diameter 10 m, and writes \\(\\pi (10)^2 = 314.2\\ \\text{m}^2\\). What is the correct area, to the nearest tenth?",
    {t:"78.5 \\(\\text{m}^2\\)", fb:"Yes: the radius is 5 m, and the student used the diameter as the radius."},
    [{t:"314.2 \\(\\text{m}^2\\)", fb:"That is the student's value, built on the diameter instead of the radius."},
     {t:"31.4 \\(\\text{m}^2\\)", fb:"That is the circumference of the circle, not its area."},
     {t:"157.0 \\(\\text{m}^2\\)", fb:"That halves the student's value, but the fix is to halve the diameter first, then square."}],
    "Halve the diameter to get the radius, then use the formula. \\[ \\begin{aligned} r &= 10 \\div 2 = 5\\ \\text{m} \\\\ A &= \\pi (5)^2 \\approx 78.5\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>78.5 square metres</b>.", {}); },
  function(){ return mcq("A student converts the area of a floor, \\(6\\ \\text{m}^2\\), to square centimetres and writes \\(6 \\times 100 = 600\\ \\text{cm}^2\\). What is the correct value?",
    {t:"60 000 \\(\\text{cm}^2\\)", fb:"Yes: the student used the linear factor 100 instead of the squared factor 10 000."},
    [{t:"600 \\(\\text{cm}^2\\)", fb:"That is the student's value, built on the linear conversion factor."},
     {t:"6 000 \\(\\text{cm}^2\\)", fb:"That uses 1000, still not the squared factor for metres to centimetres."},
     {t:"60 \\(\\text{cm}^2\\)", fb:"That moves the wrong way: square centimetres are smaller units, so the count must grow."}],
    "Area conversions use squared factors. \\[ \\begin{aligned} 6\\ \\text{m}^2 &= 6 \\times 10000\\ \\text{cm}^2 \\\\ &= 60000\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>60 000 square centimetres</b>.", {}); },
  function(){ return mcq("A student finds the area of a parallelogram with base 9 cm, slant side 7 cm and vertical height 5 cm, and writes \\(9 \\times 7 = 63\\ \\text{cm}^2\\). What is the correct area?",
    {t:"45 \\(\\text{cm}^2\\)", fb:"Yes: the student used the slant side. A parallelogram uses base times vertical height."},
    [{t:"63 \\(\\text{cm}^2\\)", fb:"That is the student's value, built on the slant side instead of the height."},
     {t:"32 \\(\\text{cm}^2\\)", fb:"That is the perimeter of the parallelogram, not its area."},
     {t:"35 \\(\\text{cm}^2\\)", fb:"That multiplies the slant side by the height and leaves out the base."}],
    "Use base times vertical height. \\[ \\begin{aligned} A &= 9 \\times 5 \\\\ &= 45\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>45 square centimetres</b>.", {}); },
  function(){ return mcq("A student finds the area of an L shaped room, 8 m by 6 m overall with a 3 m by 2 m corner missing, and writes \\(8 \\times 6 = 48\\ \\text{m}^2\\). What is the correct area?",
    {t:"42 \\(\\text{m}^2\\)", fb:"Yes: the student left the missing corner in. Subtract its area."},
    [{t:"48 \\(\\text{m}^2\\)", fb:"That is the student's value, the full bounding rectangle with nothing removed."},
     {t:"54 \\(\\text{m}^2\\)", fb:"That adds the missing corner instead of subtracting it."},
     {t:"28 \\(\\text{m}^2\\)", fb:"That is the distance around the overall rectangle, not an area."}],
    "Complete the rectangle, then subtract the missing corner. \\[ \\begin{aligned} A &= (8 \\times 6) - (3 \\times 2) \\\\ &= 48 - 6 \\\\ &= 42\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>42 square metres</b>.", {}); },
  function(){ return mcq("A student finds the surface area of a closed cylinder with radius 3 cm and height 8 cm, and writes only the side area, \\(2\\pi (3)(8) = 150.8\\ \\text{cm}^2\\). What is the correct surface area, to the nearest tenth?",
    {t:"207.3 \\(\\text{cm}^2\\)", fb:"Yes: a closed cylinder also has two circular ends. The student left them out."},
    [{t:"150.8 \\(\\text{cm}^2\\)", fb:"That is the student's value, the curved side only."},
     {t:"179.1 \\(\\text{cm}^2\\)", fb:"That adds only one circular end. A closed cylinder has two ends."},
     {t:"226.2 \\(\\text{cm}^2\\)", fb:"That uses the diameter in the side area, which inflates the total."}],
    "Add the curved side and both ends. \\[ \\begin{aligned} S &= 2\\pi (3)(8) + 2\\pi (3)^2 \\\\ &= 150.8 + 56.5 \\\\ &\\approx 207.3\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>207.3 square centimetres</b>.", {}); }
]), ["Read the student's working and find the step that went wrong.", "Name the error first, then redo the calculation with the fix in place."]);

E("u3-dimension-effect", 3, ["3.33"], 2, "gen", function(){
  var ctx=pick(["a garden bed","a poster","a rug","a photo print","a table top"]);
  var mode=pick(["doubleL","tripleW","halfL","doubleW"]);
  var l=0, w=0, nl=0, nw=0, change="", oldA=0, newA=0, oldP=0, dSq=0, dOld=0, dPer=0, g4=0;
  do { l=ri(3,10); w=ri(3,9); nl=l; nw=w;
    if(mode==="doubleL"){ nl=l*2; change="the length is doubled"; }
    if(mode==="tripleW"){ nw=w*3; change="the width is tripled"; }
    if(mode==="halfL"){ if(l%2!==0) l+=1; nl=l/2; change="the length is halved"; }
    if(mode==="doubleW"){ nw=w*2; change="the width is doubled"; }
    oldA=l*w; newA=nl*nw; oldP=2*(l+w); dSq=newA*(newA/oldA); dOld=oldA; dPer=(nl+nw)*2; g4++; }
  while(g4<80 && !u3UniqText([fmt(newA),fmt(dOld),fmt(dSq),fmt(dPer)]));
  var q=mcq("A rectangle for "+ctx+" is "+l+" m by "+w+" m. It is changed so "+change+", and the other dimension stays the same. What is the new area?",
    {t:fmt(newA)+" \\(\\text{m}^2\\)", fb:"Yes: one dimension scaled, so the area scales by the same factor."},
    [{t:fmt(dOld)+" \\(\\text{m}^2\\)", fb:"That is the original area. The change to one dimension does change the area."},
     {t:fmt(dSq)+" \\(\\text{m}^2\\)", fb:"That applies the same scale change twice over. Only one dimension changed here, so the change applies once."},
     {t:fmt(dPer)+" \\(\\text{m}^2\\)", fb:"That value is built from adding side lengths, which gives a perimeter style total, not an area."}],
    "Work out the new dimensions, then multiply. \\[ \\begin{aligned} A_{\\text{new}} &= "+nl+" \\times "+nw+" \\\\ &= "+fmt(newA)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(newA)+" square metres</b>.",
    {l:l,w:w,mode:mode}); q.figure=u3RectPairFig(l,w,nl,nw); return q;
}, ["Changing one dimension of a rectangle scales the area by that same change.", "Write the new length and width first, then multiply them."]);

E("u3-surface-prism", 3, ["3.34","2.3"], 2, "gen", function(){
  var l=0,w=0,h=0,guard=0, SA=0, vol=0, half=0, sumEdges=0;
  do { l=ri(2,9); w=ri(2,9); h=ri(2,8); SA=2*(l*w+l*h+w*h); vol=l*w*h; half=l*w+l*h+w*h; sumEdges=4*(l+w+h); guard++; }
  while(guard<60 && (!u3UniqText([String(SA),String(vol),String(half),String(sumEdges)])));
  var ctx=pick(["a closed storage crate","a closed gift box","a closed tool box","a closed shipping carton"]);
  var q=mcq("Find the surface area of "+ctx+", "+l+" cm by "+w+" cm by "+h+" cm.",
    {t:fmt(SA)+" \\(\\text{cm}^2\\)", fb:"Yes: add all six faces, in three matching pairs."},
    [{t:fmt(vol)+" \\(\\text{cm}^2\\)", fb:"That multiplies all three dimensions, which gives volume, not surface area."},
     {t:fmt(half)+" \\(\\text{cm}^2\\)", fb:"That adds only one face from each pair. Each face has a matching opposite face."},
     {t:fmt(sumEdges)+" \\(\\text{cm}^2\\)", fb:"That adds edge lengths. Surface area adds the areas of the faces."}],
    "Add the three face areas, then double for the matching opposite faces. \\[ \\begin{aligned} S &= 2(lw + lh + wh) \\\\ &= 2("+fmt(l*w)+" + "+fmt(l*h)+" + "+fmt(w*h)+") \\\\ &= "+fmt(SA)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(SA)+" square centimetres</b>.",
    {l:l,w:w,h:h});
  q.figure=u3BoxFig(l,w,h,"cm");
  return q;
}, ["Surface area is the total area of all the faces.", "Find the three different face areas first, then double their sum."]);

E("u3-convert-advanced", 3, ["3.29","3.30"], 2, "gen", function(){
  var mode=pick(["m2cmD","cm2mD","yd2in","in2ft"]);
  if(mode==="m2cmD"){ var v=pick([0.25,0.5,0.75,1.25,1.5,1.75,2.25,2.5,3.5,4.25,0.35,0.65,1.35,2.75,3.25,5.5,6.75,0.15,1.05,2.05]), ans=v*10000;
    return mcq("Write \\("+fmt(v)+"\\ \\text{m}^2\\) in square centimetres.",
      {t:fmt(ans)+" \\(\\text{cm}^2\\)", fb:"Yes: multiply by the squared factor 10 000."},
      [{t:fmt(v*100)+" \\(\\text{cm}^2\\)", fb:"That uses the linear factor 100. Areas use the squared factor."},
       {t:fmt(v*1000)+" \\(\\text{cm}^2\\)", fb:"That uses 1000. The squared factor from metres to centimetres is 10 000."},
       {t:fmt(ans*10)+" \\(\\text{cm}^2\\)", fb:"That is ten times too large: it adds a factor of 10 to the correct squared conversion."}],
      "\\[ \\begin{aligned} "+fmt(v)+"\\ \\text{m}^2 &= "+fmt(v)+" \\times 10000\\ \\text{cm}^2 \\\\ &= "+fmt(ans)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square centimetres</b>.", {mode:mode,v:v}); }
  if(mode==="cm2mD"){ var k=pick([12500,17500,22500,25000,32500,47500,52500,60000,13500,26500,37500,42500,57500,72500,82500,92500,10500,15500,20500,30500]), ans=k/10000;
    return mcq("Write \\("+fmt(k)+"\\ \\text{cm}^2\\) in square metres.",
      {t:fmt(ans)+" \\(\\text{m}^2\\)", fb:"Yes: divide by the squared factor 10 000."},
      [{t:fmt(k/100)+" \\(\\text{m}^2\\)", fb:"That divides by the linear factor 100. Areas use the squared factor."},
       {t:fmt(k/1000)+" \\(\\text{m}^2\\)", fb:"That divides by 1000. The squared factor from centimetres to metres is 10 000."},
       {t:fmt(ans/10)+" \\(\\text{m}^2\\)", fb:"That is one tenth of the correct value: one factor too many was removed."}],
      "\\[ \\begin{aligned} "+fmt(k)+"\\ \\text{cm}^2 &= "+fmt(k)+" \\div 10000\\ \\text{m}^2 \\\\ &= "+fmt(ans)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square metres</b>.", {mode:mode,v:k}); }
  if(mode==="yd2in"){ var v2=ri(2,20), ans2=v2*1296;
    return mcq("Write \\("+v2+"\\ \\text{yd}^2\\) in square inches.",
      {t:fmt(ans2)+" \\(\\text{in}^2\\)", fb:"Yes: 1 square yard is 1296 square inches, since 36 squared is 1296."},
      [{t:fmt(v2*36)+" \\(\\text{in}^2\\)", fb:"That uses the linear factor 36. Areas use the squared factor, 1296."},
       {t:fmt(v2*144)+" \\(\\text{in}^2\\)", fb:"144 is the squared factor from feet to inches. This conversion starts from yards."},
       {t:fmt(v2*108)+" \\(\\text{in}^2\\)", fb:"That triples the linear factor. Areas use the squared factor, 1296."}],
      "\\[ \\begin{aligned} "+v2+"\\ \\text{yd}^2 &= "+v2+" \\times 1296\\ \\text{in}^2 \\\\ &= "+fmt(ans2)+"\\ \\text{in}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans2)+" square inches</b>.", {mode:mode,v:v2}); }
  var k2=ri(2,20), v3=k2*144, ans3=k2;
  return mcq("Write \\("+fmt(v3)+"\\ \\text{in}^2\\) in square feet.",
    {t:fmt(ans3)+" \\(\\text{ft}^2\\)", fb:"Yes: divide by the squared factor 144."},
    [{t:fmt(v3/12)+" \\(\\text{ft}^2\\)", fb:"That divides by the linear factor 12. Areas use the squared factor, 144."},
     {t:fmt(v3*144)+" \\(\\text{ft}^2\\)", fb:"That multiplies, but moving to a larger unit makes the count smaller."},
     {t:fmt(v3/100)+" \\(\\text{ft}^2\\)", fb:"100 is an SI-style factor. For inches to feet the squared factor is 144."}],
    "\\[ \\begin{aligned} "+fmt(v3)+"\\ \\text{in}^2 &= "+fmt(v3)+" \\div 144\\ \\text{ft}^2 \\\\ &= "+fmt(ans3)+"\\ \\text{ft}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans3)+" square feet</b>.", {mode:mode,v:v3});
}, ["Chain the squared factors: square each linear factor before you use it.", "Decide the direction first: a smaller unit means a larger count."]);

/* ---------- Level 2 CR ---------- */
E("u3-cr-triangle", 3, ["3.31"], 2, "gen", function(){
  var ctxs=["a triangular garden plot","a triangular sail on a small boat","a triangular road sign face","a triangular flower bed"];
  var ctx=pick(ctxs), b=2*ri(2,9), h=ri(3,12), ans=b*h/2;
  var q=numq("Find the area, in square metres, of "+ctx+" with base "+b+" m and height "+h+" m. Show your work on paper, then enter the area.",
    ans, 0.1,
    "Use the triangle area formula. \\[ \\begin{aligned} A &= \\tfrac{1}{2}bh \\\\ &= \\tfrac{1}{2}("+b+")("+h+") \\\\ &= "+fmt(ans)+"\\ \\text{m}^2 \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square metres</b>.",
    {b:b,h:h}); q.figure=m12TriAreaSVG(b,h,b+" m",h+" m"); return q;
}, ["Use half of base times height for a triangle.", "Multiply the base and height first, then take half."]);

E("u3-cr-circle", 3, ["3.32"], 2, "gen", function(){
  var ctxs=["a circular garden","a round rug","a circular patio","a round pizza stone top","a circular table top","a round dartboard face"];
  var ctx=pick(ctxs), r=ri(2,18), area=Math.PI*r*r, ans=Math.round(area*10)/10;
  var q=numq("Find the area, in square centimetres, of "+ctx+" with radius "+r+" cm. Give your answer to the nearest tenth. Show your work on paper, then enter the area.",
    ans, 0.3,
    "Use \\(A = \\pi r^2\\). \\[ \\begin{aligned} A &= \\pi ("+r+")^2 \\\\ &\\approx "+fmtF(area,1)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" square centimetres</b>.",
    {r:r}); q.figure=m12CircleSVG("r = "+r+" cm"); return q;
}, ["Use pi times radius squared for a circle.", "Square the radius first, then multiply by pi."]);

E("u3-cr-tiles", 3, ["3.31"], 2, "gen", function(){
  var L=2*ri(3,7), W=2*ri(3,6), tile=4, ans=(L*W)/tile;
  var ctx=pick(["a kitchen floor","a bathroom floor","a laundry room floor","a porch floor"]);
  var q=numq(ctx.charAt(0).toUpperCase()+ctx.slice(1)+" is "+L+" ft by "+W+" ft. Each floor tile covers 2 ft by 2 ft. How many tiles are needed to cover the floor, with no cutting and no gaps? Show your work on paper, then enter the number of tiles.",
    ans, 0.1,
    "Find the floor area, then divide by the area of one tile. \\[ \\begin{aligned} A_{\\text{floor}} &= "+L+" \\times "+W+" = "+fmt(L*W)+"\\ \\text{ft}^2 \\\\ A_{\\text{tile}} &= 2 \\times 2 = 4\\ \\text{ft}^2 \\\\ \\text{tiles} &= "+fmt(L*W)+" \\div 4 = "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+" tiles</b>.",
    {L:L,W:W}); q.figure=u3TileFig(L,W); return q;
}, ["Divide the total area by the area covered by one tile.", "Find the floor area first, then the area of one tile."]);

E("u3-cr-cylinder-sa", 3, ["3.34"], 2, "gen", function(){
  var ctxs=["a closed water tank","a closed storage can","a closed paint drum"];
  var ctx=pick(ctxs), r=ri(2,6), h=ri(4,12), sa=2*Math.PI*r*h+2*Math.PI*r*r, ans=Math.round(sa*10)/10;
  var q=numq("Find the surface area, in square centimetres, of "+ctx+" shaped like a closed right cylinder with radius "+r+" cm and height "+h+" cm, as shown in the figure. Give your answer to the nearest tenth. Show your work on paper, then enter the surface area.",
    ans, 0.4,
    "Add the curved side and the two circular ends. \\[ \\begin{aligned} S &= 2\\pi r h + 2\\pi r^2 \\\\ &= 2\\pi ("+r+")("+h+") + 2\\pi ("+r+")^2 \\\\ &\\approx "+fmtF(sa,1)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" square centimetres</b>.",
    {r:r,h:h});
  q.figure=u3CylFig(r,h,"cm");
  return q;
}, ["A closed cylinder has a curved side plus two circular ends.", "Find the side area first, then add both end areas."]);

E("u3-cr-cone-sa", 3, ["3.34"], 2, "gen", function(){
  var ctxs=["a closed cone shaped party hat cover","a cone shaped funnel cover","a cone shaped roof cap"];
  var ctx=pick(ctxs), r=ri(2,7), sl=r+ri(2,6), sa=Math.PI*r*sl+Math.PI*r*r, ans=Math.round(sa*10)/10;
  var q=numq("Find the surface area, in square centimetres, of "+ctx+" shaped like a right cone with radius "+r+" cm and slant height "+sl+" cm, as shown in the figure. The slant height is the distance from the tip down the sloped side to the rim. Give your answer to the nearest tenth. Show your work on paper, then enter the surface area.",
    ans, 0.4,
    "Add the sloped side and the circular base. \\[ \\begin{aligned} S &= \\pi r s + \\pi r^2 \\\\ &= \\pi ("+r+")("+sl+") + \\pi ("+r+")^2 \\\\ &\\approx "+fmtF(sa,1)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" square centimetres</b>.",
    {r:r,sl:sl});
  q.figure=u3ConeFig(r,sl,"cm");
  return q;
}, ["A cone has a sloped side plus one circular base.", "Find the sloped side area first, using the slant height, then add the base."]);

E("u3-cr-paint", 3, ["3.31"], 2, "gen", function(){
  var W=ri(7,12), H=ri(3,4), ww=ri(1,2), wh=ri(1,2), rate=pick([4,5,6]);
  var wall=W*H, win=ww*wh, area=wall-win, ans=area*rate;
  var q=numq("A painter charges $"+rate+" per square metre. A wall is "+W+" m by "+H+" m and has one window "+ww+" m by "+wh+" m that will not be painted. What is the total charge, in dollars, to paint the wall? Show your work on paper, then enter the charge.",
    ans, 1,
    "Subtract the window, then multiply by the rate. \\[ \\begin{aligned} A &= ("+W+" \\times "+H+") - ("+ww+" \\times "+wh+") \\\\ &= "+fmt(wall)+" - "+fmt(win)+" = "+fmt(area)+"\\ \\text{m}^2 \\\\ \\text{charge} &= "+fmt(area)+" \\times "+rate+" = "+fmt(ans)+" \\end{aligned} \\] The answer is <b>$"+fmt(ans)+"</b>.",
    {W:W,H:H,rate:rate}); q.figure=u3PaintFig(W,H,ww,wh); return q;
}, ["Find the area that actually gets painted before you apply the rate.", "Find the whole wall area first, then subtract the window."]);

/* ---------- Level 3 ---------- */
E("u3-dimension-scale", 3, ["3.33"], 3, "gen", function(){
  var l=ri(3,9), w=ri(3,8), pair=pick([[2,2],[3,3],[2,3],[3,2],[4,2],[2,4]]);
  var a=pair[0], b=pair[1], nl=l*a, nw=w*b;
  var newA=nl*nw, newP=2*(nl+nw), oldA=l*w, oldP=2*(l+w);
  var wrongA1=oldA*a, wrongP1=oldP*a, wrongA2=newA, wrongP2=oldP;
  var optC="Area "+fmt(newA)+" m2 and perimeter "+fmt(newP)+" m";
  var opt1="Area "+fmt(wrongA1)+" m2 and perimeter "+fmt(wrongP1)+" m";
  var opt2="Area "+fmt(newA)+" m2 and perimeter "+fmt(oldP)+" m";
  var opt3="Area "+fmt(oldA)+" m2 and perimeter "+fmt(newP)+" m";
  var q=mcq("A rectangle is "+l+" m by "+w+" m. A larger copy is made by multiplying the length by "+a+" and the width by "+b+". Which pair gives the new area and the new perimeter?",
    {t:optC, fb:"Yes: multiply each dimension by its factor, then work out area and perimeter from the new size."},
    [{t:opt1, fb:"That scales both measures by the length factor only. The width has its own factor."},
     {t:opt2, fb:"The area is right, but the perimeter also grows when the sides grow. It cannot stay the same."},
     {t:opt3, fb:"The perimeter is right, but the area grows by both factors multiplied together, so it cannot stay the same."}],
    "Find the new dimensions first. \\[ \\begin{aligned} \\text{new size} &= "+nl+"\\ \\text{m by } "+nw+"\\ \\text{m} \\\\ A &= "+nl+" \\times "+nw+" = "+fmt(newA)+"\\ \\text{m}^2 \\\\ P &= 2("+nl+" + "+nw+") = "+fmt(newP)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>area "+fmt(newA)+" square metres and perimeter "+fmt(newP)+" metres</b>.",
    {l:l,w:w,a:a,b:b}); q.figure=u3RectPairFig(l,w,nl,nw); return q;
}, ["Scale each dimension first, then compute area and perimeter from the new size.", "Write the new length and the new width before you calculate anything else."]);

E("u3-create-solve", 3, ["2.1"], 3, "var", varset([
  function(){ return mcq("A painter creates this problem from a job: a wall 9 m by 3 m has a door 1 m by 2 m that will not be painted. Which setup creates and solves the problem correctly?",
    {t:"\\(A = (9 \\times 3) - (1 \\times 2) = 25\\ \\text{m}^2\\)", fb:"Yes: whole wall minus the door gives the area to paint."},
    [{t:"\\(A = (9 \\times 3) + (1 \\times 2) = 29\\ \\text{m}^2\\)", fb:"That adds the door. An unpainted part is subtracted, not added."},
     {t:"\\(A = 2(9 + 3) - (1 \\times 2) = 22\\ \\text{m}^2\\)", fb:"That starts with the perimeter of the wall, which is a length, not an area."},
     {t:"\\(A = (9 - 1) \\times (3 - 2) = 8\\ \\text{m}^2\\)", fb:"That shrinks both wall dimensions by the door size, which does not model a door in one part of the wall."}],
    "Model the painted part as the whole wall with the door removed. \\[ A = (9 \\times 3) - (1 \\times 2) = 25\\ \\text{m}^2 \\] The answer is <b>the setup that gives 25 square metres</b>.", {}); },
  function(){ return mcq("A gardener creates this problem: a square plot 6 m by 6 m is split into two equal rectangular beds. Which setup creates and solves the area of one bed correctly?",
    {t:"\\(A = (6 \\times 6) \\div 2 = 18\\ \\text{m}^2\\)", fb:"Yes: find the whole plot area, then halve it for one of two equal beds."},
    [{t:"\\(A = 6 \\times 6 = 36\\ \\text{m}^2\\)", fb:"That is the area of the whole plot, not one of the two beds."},
     {t:"\\(A = (6 + 6) \\div 2 = 6\\ \\text{m}^2\\)", fb:"That adds side lengths, which does not give an area."},
     {t:"\\(A = 2(6 + 6) \\div 2 = 12\\ \\text{m}^2\\)", fb:"That starts with the perimeter, a length, not the area to be split."}],
    "Find the whole area, then split it evenly. \\[ A = (6 \\times 6) \\div 2 = 18\\ \\text{m}^2 \\] The answer is <b>the setup that gives 18 square metres</b>.", {}); },
  function(){ return mcq("A sign maker creates this problem: a triangular sign has base 12 cm and height 9 cm. Which setup creates and solves its area correctly?",
    {t:"\\(A = \\tfrac{1}{2}(12)(9) = 54\\ \\text{cm}^2\\)", fb:"Yes: that is the triangle formula applied to the given base and height."},
    [{t:"\\(A = (12)(9) = 108\\ \\text{cm}^2\\)", fb:"That is the full bounding rectangle. A triangle takes half of it."},
     {t:"\\(A = \\tfrac{1}{2}(12 + 9) = 10.5\\ \\text{cm}^2\\)", fb:"That adds the base and height. The formula multiplies them."},
     {t:"\\(A = 2(12 + 9) = 42\\ \\text{cm}^2\\)", fb:"That is a perimeter style total for a rectangle, not the area of a triangle."}],
    "A triangle problem uses half of base times height. \\[ A = \\tfrac{1}{2}(12)(9) = 54\\ \\text{cm}^2 \\] The answer is <b>the setup that gives 54 square centimetres</b>.", {}); },
  function(){ return mcq("A worker creates this problem: a round cover has diameter 8 cm. Which setup creates and solves its area correctly?",
    {t:"\\(A = \\pi (4)^2 \\approx 50.3\\ \\text{cm}^2\\)", fb:"Yes: halve the diameter to get the radius, then use pi times radius squared."},
    [{t:"\\(A = \\pi (8)^2 \\approx 201.1\\ \\text{cm}^2\\)", fb:"That uses the diameter as the radius, which makes the area four times too large."},
     {t:"\\(A = 2\\pi (4) \\approx 25.1\\ \\text{cm}^2\\)", fb:"That is the circumference, the distance around the cover, not its area."},
     {t:"\\(A = \\pi (8) \\approx 25.1\\ \\text{cm}^2\\)", fb:"That multiplies pi by the diameter once, which gives a length, not an area."}],
    "The radius is half of the diameter. \\[ A = \\pi (4)^2 \\approx 50.3\\ \\text{cm}^2 \\] The answer is <b>the setup that gives about 50.3 square centimetres</b>.", {}); },
  function(){ return mcq("A tiler creates this problem: an L shaped floor is a 10 m by 5 m rectangle with a 4 m by 5 m rectangle added on one end at a right angle, sharing only an edge. Which setup creates and solves its area correctly?",
    {t:"\\(A = (10 \\times 5) + (4 \\times 5) = 70\\ \\text{m}^2\\)", fb:"Yes: split the L into its two rectangles and add their areas."},
    [{t:"\\(A = (10 + 4) \\times (5 + 5) = 140\\ \\text{m}^2\\)", fb:"That builds a larger bounding rectangle that includes space the floor does not cover."},
     {t:"\\(A = (10 \\times 5) - (4 \\times 5) = 30\\ \\text{m}^2\\)", fb:"That subtracts the added part. The second rectangle is part of the floor, so it is added."},
     {t:"\\(A = 2(10 + 5) + 2(4 + 5) = 48\\ \\text{m}^2\\)", fb:"That adds perimeters, which are lengths, not the area covered."}],
    "Split the shape and add the parts. \\[ A = (10 \\times 5) + (4 \\times 5) = 70\\ \\text{m}^2 \\] The answer is <b>the setup that gives 70 square metres</b>.", {}); }
]), ["Build the setup from the story first: which areas are added, subtracted or halved?", "Check each setup against the story before you look at its final number."]);

E("u3-missing-dimension", 3, ["2.4","3.32"], 3, "gen", function(){
  var mode=pick(["rect","tri","para"]);
  if(mode==="rect"){ var wv=0, lv=0, A=0, g5=0;
    do { wv=ri(3,12); lv=ri(3,12); A=wv*lv; g5++; } while(g5<80 && !u3UniqText([fmt(wv),fmt(A-lv),fmt(A+lv),fmt(wv*2)]));
    var _bo0=balOpts({t:fmt(wv), fb:"Yes: rearrange the area formula and divide the area by the length."}, [{t:fmt(A-lv), fb:"That subtracts the length from the area. Rearranging area means dividing."},
       {t:fmt(A+lv), fb:"That adds the length to the area. Rearranging area means dividing."},
       {t:fmt(A/lv*2), fb:"That doubles the correct division. Area divided by length gives the width directly."}]); var q=mcq("A rectangular mat has area "+fmt(A)+" \\(\\text{m}^2\\) and length "+lv+" m. What is its width, in metres?", _bo0[0], _bo0[1],
      "Rearrange \\(A = lw\\) to solve for the width. \\[ \\begin{aligned} w &= A \\div l \\\\ &= "+fmt(A)+" \\div "+lv+" \\\\ &= "+fmt(wv)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(wv)+" metres</b>.", {mode:mode}); q.figure=m12RectAreaSVG(lv,wv,lv+" m","?","A = "+fmt(A)+" m\u00B2"); return q; }
  if(mode==="tri"){ var bv=0, hv=0, A2=0, g6=0;
    do { bv=2*ri(2,8); hv=ri(3,11); A2=bv*hv/2; g6++; } while(g6<80 && !u3UniqText([fmt(hv),fmt(A2/bv),fmt(A2-bv),fmt(hv*2)]));
    var _bo1=balOpts({t:fmt(hv), fb:"Yes: double the area, then divide by the base."}, [{t:fmt(A2/bv), fb:"That forgets the half in the triangle formula. The area must be doubled first."},
       {t:fmt(A2-bv), fb:"That subtracts the base from the area. The formula is rearranged with division."},
       {t:fmt(A2*2/bv*2), fb:"That doubles one step too many. Double the area once, then divide by the base."}]); var q=mcq("A triangular banner has area "+fmt(A2)+" \\(\\text{cm}^2\\) and base "+bv+" cm. What is its height, in centimetres?", _bo1[0], _bo1[1],
      "Rearrange \\(A = \\tfrac{1}{2}bh\\) to solve for the height. \\[ \\begin{aligned} h &= 2A \\div b \\\\ &= "+fmt(2*A2)+" \\div "+bv+" \\\\ &= "+fmt(hv)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(hv)+" centimetres</b>.", {mode:mode}); q.figure=m12TriAreaSVG(bv,hv,bv+" cm","?"); return q; }
  var bp=0, hp=0, A3=0, g7=0;
  do { bp=ri(3,12); hp=ri(3,11); A3=bp*hp; g7++; } while(g7<80 && !u3UniqText([fmt(hp),fmt(A3-bp),fmt(A3/bp/2),fmt(A3+bp)]));
  var _bo2=balOpts({t:fmt(hp), fb:"Yes: rearrange the area formula and divide the area by the base."}, [{t:fmt(A3-bp), fb:"That subtracts the base from the area. Rearranging area means dividing."},
     {t:fmt(A3/bp/2), fb:"That halves the correct division. A parallelogram has no half in its formula; that belongs to triangles."},
     {t:fmt(A3+bp), fb:"That adds the base to the area. Rearranging area means dividing."}]); var q=mcq("A parallelogram shaped tile pattern has area "+fmt(A3)+" \\(\\text{cm}^2\\) and base "+bp+" cm. What is its vertical height, in centimetres?", _bo2[0], _bo2[1],
    "Rearrange \\(A = bh\\) to solve for the height. \\[ \\begin{aligned} h &= A \\div b \\\\ &= "+fmt(A3)+" \\div "+bp+" \\\\ &= "+fmt(hp)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(hp)+" centimetres</b>.", {mode:mode}); q.figure=m12ParaAreaSVG(bp,hp,bp+" cm","?",null); return q;
}, ["Work the area formula backwards from the area you are given.", "Write the formula, put in the known values, then solve for the missing one."]);

E("u3-cr-design-width", 3, ["2.1","2.4","3.31"], 3, "gen", function(){
  var W=ri(3,11), L=ri(4,12), A=W*L;
  var ctxs=["a rectangular garden plot","a rectangular storage pad","a rectangular patio","a rectangular dog run"];
  var ctx=pick(ctxs);
  var q=numq("Design "+ctx+" with a total area of "+fmt(A)+" square metres. One side, along an existing fence, is fixed at "+L+" m. What must the other side be, in metres? Show your work on paper, then enter the length of the other side.",
    W, 0.1,
    "Set up the area formula with the target area and solve for the unknown side. \\[ \\begin{aligned} A &= l \\times w \\\\ "+fmt(A)+" &= "+L+" \\times w \\\\ w &= "+fmt(A)+" \\div "+L+" = "+fmt(W)+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+fmt(W)+" metres</b>.",
    {W:W,L:L}); q.figure=m12RectAreaSVG(L,W,L+" m","?","A = "+fmt(A)+" m\u00B2"); return q;
}, ["Set the area formula equal to the target area, then solve for the unknown side.", "Divide the target area by the side that is already fixed."]);

E("u3-cr-house-composite", 3, ["3.26","3.31"], 3, "gen", function(){
  var w=2*ri(3,5), h=ri(3,6), th=ri(2,4), unit=pick(["m","ft"]);
  var rect=w*h, tri=w*th/2, ans=rect+tri;
  var q=numq("The end wall of a shed has the house shape shown in the figure: a rectangle with a triangular top. The width is "+w+" "+unit+", the wall height up to the roof is "+h+" "+unit+", and the triangular top is "+th+" "+unit+" high. Find its area, in square "+(unit==="m"?"metres":"feet")+". Show your work on paper, then enter the area.",
    ans, 0.6,
    "Split the shape into a rectangle and a triangle, then add. \\[ \\begin{aligned} A &= (w \\times h) + \\tfrac{1}{2}(w \\times t) \\\\ &= ("+w+" \\times "+h+") + \\tfrac{1}{2}("+w+" \\times "+th+") \\\\ &= "+fmt(rect)+" + "+fmt(tri)+" = "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+" square "+(unit==="m"?"metres":"feet")+"</b>.",
    {w:w,h:h,th:th});
  q.figure=u3HouseFig(w,h,th,unit);
  return q;
}, ["Split the shape into a rectangle and a triangle, then add the parts.", "Find the rectangle part first, then the triangular top as half of its box."]);
