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

/* ===== Prior knowledge tranche (Nov 15, 2026): Clusters 2, 3 and 4 (surface area readiness, the formula strand, unit conversion). Borrowed verbatim from Mathematics 1202 (u3-surface-prism, u3-cr-cylinder-sa, u3-composite-area, u3-circle-area, u2-perimeter, u2-cr-formula-manip, u3-error-analysis, u2-si-imp-convert, u2-imp-si-convert, u2-si-convert); feeder helper copies ride in bank-helpers.js. ===== */
E("u2-pk-surface-prism", 2, ["3.3"], 2, "gen", function(){
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

E("u2-pk-cylinder-sa", 2, ["3.3"], 2, "gen", function(){
  var ctxs=["a closed water tank","a closed storage can","a closed paint drum"];
  var ctx=pick(ctxs), r=ri(2,6), h=ri(4,12), sa=2*Math.PI*r*h+2*Math.PI*r*r, ans=Math.round(sa*10)/10;
  var q=numq("Find the surface area, in square centimetres, of "+ctx+" shaped like a closed right cylinder with radius "+r+" cm and height "+h+" cm, as shown in the figure. Give your answer to the nearest tenth. Show your work on paper, then enter the surface area.",
    ans, 0.4,
    "Add the curved side and the two circular ends. \\[ \\begin{aligned} S &= 2\\pi r h + 2\\pi r^2 \\\\ &= 2\\pi ("+r+")("+h+") + 2\\pi ("+r+")^2 \\\\ &\\approx "+fmtF(sa,1)+"\\ \\text{cm}^2 \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" square centimetres</b>.",
    {r:r,h:h});
  q.figure=u3CylFig(r,h,"cm");
  return q;
}, ["A closed cylinder has a curved side plus two circular ends.", "Find the side area first, then add both end areas."]);

E("u2-pk-composite-area", 2, ["3.1"], 2, "gen", function(){
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

E("u2-pk-circle-area", 2, ["3.1"], 2, "gen", function(){
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

E("u2-pk-perimeter", 2, ["2.1"], 2, "gen", function(){
  var ctx=pick([
    {o:"garden bed", act:"edging around"},
    {o:"classroom bulletin board", act:"trim around"},
    {o:"picture frame", act:"framing around"},
    {o:"rug outline", act:"binding around the edge of"}
  ]);
  var L=ri(3,14), W=ri(2,10); if(W>=L){ var tmp=L; L=W+ri(1,3); W=tmp; }
  var guardP=0; while(guardP<40){ var valsP=[2*(L+W), L*W, L+W, 2*L+W]; var setP={}; var dupP=false; valsP.forEach(function(x){ if(setP[x]) dupP=true; setP[x]=1; }); if(!dupP) break; L=ri(3,14); W=ri(2,10); if(W>=L){ var t2=L; L=W+ri(1,3); W=t2; } guardP++; }
  var P=2*(L+W);
  var ds=[
    {t:fmt(L*W), fb:"That multiplies length by width, which gives area, not the distance around."},
    {t:fmt(L+W), fb:"That adds only one length and one width, half the trip around."},
    {t:fmt(2*L+W), fb:"That counts one width only once: both widths are part of the boundary."}
  ];
  var q=mcq("A rectangular "+ctx.o+" is \\("+L+"\\ \\text{m}\\) long and \\("+W+"\\ \\text{m}\\) wide. How much material, in metres, is needed for "+ctx.act+" it? Use \\(P = 2L + 2W\\).",
    {t:fmt(P), fb:"Correct: add both lengths and both widths."}, ds,
    "Perimeter is the distance around, and the formula applies directly. \\[ \\begin{aligned} P &= 2L + 2W \\\\ &= 2("+L+") + 2("+W+") \\\\ &= "+P+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+P+" m</b>.",
    {L:L, W:W});
  q.figure=u2RectFig(L,W);
  return q;
}, ["Perimeter is the distance all the way around a shape.", "Add both lengths and both widths, or use P = 2L + 2W."]);

E("u2-pk-formula-manip", 2, ["2.2"], 2, "gen", function(){
  var W=ri(3,12), L=W+ri(2,10); var P=2*(L+W);
  return numq("A rectangular pen has a perimeter of \\("+P+"\\ \\text{m}\\) and a width of \\("+W+"\\ \\text{m}\\). Find its length, in metres. Use \\(P = 2L + 2W\\), rearranged to solve for \\(L\\).", L, 0.01,
    "Rearrange the formula, then substitute. \\[ \\begin{aligned} L &= \\frac{P - 2W}{2} \\\\ &= \\frac{"+P+" - 2("+W+")}{2} \\\\ &= "+L+"\\ \\text{m} \\end{aligned} \\] The answer is <b>"+L+" m</b>.",
    {P:P, W:W});
}, ["The unknown is inside the formula, so rearrange before substituting.", "Subtract twice the width from the perimeter, then divide by 2."]);

E("u2-pk-error-analysis", 2, ["2.5"], 2, "var", varset([
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

E("u2-pk-si-imp-convert", 2, ["4.11"], 2, "gen", function(){
  var cm=pick([10,15,20,25,30,40,50,60,75,80,90,100,120,150]);
  var ans=Math.round(cm/2.54*100)/100;
  var ctx=pick(["A shelf is","A countertop section is","A piece of trim is","A toolbox is"]);
  var ds=[
    {t:fmt(Math.round(cm*2.54*100)/100), fb:"That multiplies by 2.54, which converts inches to centimetres, the reverse direction."},
    {t:fmt(Math.round(cm/2*100)/100), fb:"That divides by 2 instead of 2.54, so the proportion is off."},
    {t:fmt(cm), fb:"That keeps the same number: centimetres and inches are different sizes, so the number must change."}
  ];
  var bo=balOpts({t:fmtF(ans,2), fb:"Correct: set up the proportion with 2.54 cm per inch and divide."}, ds);
  return mcq(ctx+" \\("+cm+"\\ \\text{cm}\\) long. Convert this length to inches. Use \\(1\\ \\text{in} = 2.54\\ \\text{cm}\\). Give the answer to two decimal places.",
    bo[0], bo[1],
    "Use proportional reasoning with the given rate. \\[ \\begin{aligned} \\text{inches} &= "+cm+" \\div 2.54 \\\\ &= "+fmtF(ans,2)+"\\ \\text{in} \\end{aligned} \\] The length is <b>"+fmtF(ans,2)+" in</b>.",
    {cm:cm});
}, ["Write the rate as a proportion: 2.54 cm stands with 1 inch.", "Divide the centimetre measure by 2.54 to get inches."]);

E("u2-pk-imp-si-convert", 2, ["4.11"], 2, "gen", function(){
  var inches=pick([4,5,6,8,9,10,12,15,18,20,24,30,36]);
  var ans=Math.round(inches*2.54*100)/100;
  var ctx=pick(["A bolt is","A photo frame side is","A pipe section is","A bookcase shelf is"]);
  var ds=[
    {t:fmt(Math.round(inches/2.54*100)/100), fb:"That divides by 2.54, which converts centimetres to inches, the reverse direction."},
    {t:fmt(Math.round(inches*2*100)/100), fb:"That uses 2 cm per inch instead of 2.54, so the proportion is off."},
    {t:fmt(inches), fb:"That keeps the same number: an inch is larger than a centimetre, so the centimetre number must be larger."}
  ];
  var corr=fmt(ans); ds.forEach(function(d){ if(d.t===corr) d.t=fmt(ans+2.54); });
  var bo=balOpts({t:corr, fb:"Correct: multiply by 2.54 cm per inch."}, ds);
  return mcq(ctx+" \\("+inches+"\\ \\text{in}\\) long. Convert this length to centimetres. Use \\(1\\ \\text{in} = 2.54\\ \\text{cm}\\).",
    bo[0], bo[1],
    "Use proportional reasoning with the given rate. \\[ \\begin{aligned} \\text{centimetres} &= "+inches+" \\times 2.54 \\\\ &= "+fmt(ans)+"\\ \\text{cm} \\end{aligned} \\] The length is <b>"+fmt(ans)+" cm</b>.",
    {inches:inches});
}, ["Write the rate as a proportion: 1 inch stands with 2.54 cm.", "Multiply the inch measure by 2.54 to get centimetres."]);

E("u2-pk-si-convert", 2, ["4.11"], 1, "gen", function(){
  var modes=[
    {f:"mm",t:"cm",k:0.1},{f:"cm",t:"m",k:0.01},{f:"m",t:"km",k:0.001},{f:"cm",t:"mm",k:10},{f:"m",t:"cm",k:100},{f:"km",t:"m",k:1000}
  ];
  var ctx=pick(["A shelf board","A ribbon for a gift box","A hallway in a school","A garden hose","A walking trail","A piece of trim"]);
  var m=pick(modes); var v=ri(3,480); if(m.k<1 && v<20) v=v+40;
  var ans=Math.round(v*m.k*1000)/1000;
  var dd=u2Dist(ans,[ans*10,ans/10,ans+ (m.k>=1?10:-ans/2)], m.t, "Correct: each step on the SI ladder moves the decimal point by the power of ten for that step.", function(i){ return ["That moves the decimal point the wrong way or by the wrong number of places.","That uses the wrong power of ten for this step on the ladder.","That changes the value instead of only changing the unit."][i]; });
  return mcq(ctx+" measures \\("+fmt(v)+"\\ \\text{"+m.f+"}\\). Write this length in "+m.t+".",
    dd.c, dd.d,
    "SI units are based on powers of ten. \\[ "+fmt(v)+"\\ \\text{"+m.f+"} \\times "+fmt(m.k)+" = "+fmt(ans)+"\\ \\text{"+m.t+"} \\] The length is <b>"+fmt(ans)+" "+m.t+"</b>.",
    {mode:m.f+"-"+m.t, v:v});
}, ["Use the SI ladder: each step is a power of ten.", "Decide whether the new unit is larger or smaller, then move the decimal point the right number of places."]);

/* PK tranche metadata pass for Unit 2. The tranche's own entries are flagged here.  */
var PKT_U2_FOR=["3.1","3.2","3.3","3.4","3.5","2.1","2.2","2.3","2.4","2.5","2.6","4.10","4.11","4.12"];
var PKT_U2={
 "u2-pk-surface-prism":{src:"math-1202:3.34",group:"surface-area"},
 "u2-pk-cylinder-sa":{src:"math-1202:3.34",group:"surface-area"},
 "u2-pk-composite-area":{src:"math-1202:3.31",group:"area"},
 "u2-pk-circle-area":{src:"math-1202:3.32",group:"area"},
 "u2-pk-perimeter":{src:"math-1202:2.3",group:"formula-use"},
 "u2-pk-formula-manip":{src:"math-1202:2.4",group:"formula-use"},
 "u2-pk-error-analysis":{src:"math-1202:2.5",group:"formula-use"},
 "u2-pk-si-imp-convert":{src:"math-1202:3.6",group:"conversion"},
 "u2-pk-imp-si-convert":{src:"math-1202:3.13",group:"conversion"},
 "u2-pk-si-convert":{src:"math-1202:3.7",group:"conversion"}
};
BANK.forEach(function(e){var t=PKT_U2[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U2_FOR.slice();e.pkGroup=t.group;}});
