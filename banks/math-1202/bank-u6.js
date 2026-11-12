// Math 1202 Unit 6 Pythagorean Relation question bank
// Figures (added Nov 2026): right triangle, rectangle diagonal and
// corner check setups draw labelled figures from each question's
// own values. The history, trades formula and why entries, the
// 3:4:5 recognition entry (its answer sets are the options), and
// the create a problem and equivalent forms entries stay
// figureless: they are verbal or algebraic, with no single
// drawable setup in the stem.
// Cut verbatim from the standalone bank source
// (math-1202-review/bank-src.js, lines 3180 to 3766).
// CRMARKS: u6-cr-hypotenuse=2
// CRMARKS: u6-cr-leg=2
// CRMARKS: u6-cr-diagonal-rect=2
// CRMARKS: u6-cr-corner-diag=3
// CRMARKS: u6-cr-ladder=3
// CRMARKS: u6-cr-guywire-form=3
// CRMARKS: u6-cr-shortcut-saving=2
// CRMARKS: u6-cr-frame-diff=3
/* ===== Unit 6 ===== */
/* Math 1202 Unit 6: Pythagorean Relation (home 3.53-3.59, 2.6; cross 2.1-2.4).
   Helpers prefixed u6. Built deliberately fuller than the shell practice layer. */
function u6R1(x){ return Math.round(x*10)/10; }
function u6Triples(){ return [[3,4,5],[5,12,13],[6,8,10],[8,15,17],[9,12,15],[7,24,25],[12,16,20],[9,40,41],[20,21,29],[12,35,37],[15,20,25],[10,24,26],[18,24,30],[16,30,34]]; }
function u6Scaled(){ var t=pick(u6Triples()), k=ri(1,3); return [t[0]*k, t[1]*k, t[2]*k, k]; }
/* Right triangle figure: right angle at lower left, horizontal leg a, vertical leg b, hypotenuse c. Labels are text strings. */
function u6TriSVG(aVal,bVal,aLab,bLab,cLab){
  var s=Math.min(185/Math.max(aVal,1),118/Math.max(bVal,1));
  var ox=78, oy=178, x2=ox+aVal*s, y2=oy-bVal*s;
  var mx=(ox+x2)/2, my=(oy+y2)/2;
  var out='<svg viewBox="0 0 320 210" width="320" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right triangle diagram">';
  out+='<polygon points="'+fmt(ox,1)+','+oy+' '+fmt(x2,1)+','+oy+' '+ox+','+fmt(y2,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+='<path d="M '+(ox+15)+' '+oy+' L '+(ox+15)+' '+(oy-15)+' L '+ox+' '+(oy-15)+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  out+=_txt(mx,oy+18,aLab,12.5,false);
  out+=_txt(ox-24,(oy+y2)/2,bLab,12.5,false);
  out+=_txt(mx+22,my-8,cLab,12.5,false);
  return out+'</svg>';
}
/* General triangle figure from side lengths a, b, c (c is the base and the longest side). */
function u6GenTriSVG(a,b,c,aLab,bLab,cLab){
  var cx=(b*b-a*a+c*c)/(2*c), cy=Math.sqrt(Math.max(b*b-cx*cx,0.04));
  var s=Math.min(225/Math.max(c,1),125/Math.max(cy,1));
  var ox=48, oy=178, bx=ox+c*s, px=ox+cx*s, py=oy-cy*s;
  var out='<svg viewBox="0 0 320 210" width="320" height="210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle diagram">';
  out+='<polygon points="'+ox+','+oy+' '+fmt(bx,1)+','+oy+' '+fmt(px,1)+','+fmt(py,1)+'" fill="'+FIG_SHADE+'" fill-opacity="0.30" stroke="'+FIG_INK+'" stroke-width="2"/>';
  out+=_txt((ox+bx)/2,oy+18,cLab,12.5,false);
  out+=_txt((ox+px)/2-20,(oy+py)/2,bLab,12.5,false);
  out+=_txt((bx+px)/2+20,(oy+py)/2,aLab,12.5,false);
  return out+'</svg>';
}
/* Corner figure: two walls meeting at a corner, marks at m1 along the floor and m2 up the wall, dashed diagonal dLab. */
function u6CornerSVG(m1,m2,dLab,m1Lab,m2Lab){
  var s=Math.min(200/Math.max(m1,1),128/Math.max(m2,1));
  var ox=72, oy=180, bx=ox+m1*s, cy=oy-m2*s;
  var out='<svg viewBox="0 0 320 215" width="320" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corner check diagram with marks on two walls and a diagonal between the marks">';
  out+='<line x1="30" y1="'+oy+'" x2="300" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="3"/>';
  out+='<line x1="'+ox+'" y1="195" x2="'+ox+'" y2="25" stroke="'+FIG_INK+'" stroke-width="3"/>';
  out+='<line x1="'+fmt(bx,1)+'" y1="'+oy+'" x2="'+ox+'" y2="'+fmt(cy,1)+'" stroke="'+FIG_ALT+'" stroke-width="2" stroke-dasharray="6 4"/>';
  out+='<circle cx="'+fmt(bx,1)+'" cy="'+oy+'" r="4" fill="'+FIG_INK+'"/><circle cx="'+ox+'" cy="'+fmt(cy,1)+'" r="4" fill="'+FIG_INK+'"/>';
  out+=_txt((ox+bx)/2,oy+18,m1Lab,12.5,false);
  out+=_txt(ox-26,(oy+cy)/2,m2Lab,12.5,false);
  out+=_txt((ox+bx)/2+16,(oy+cy)/2-6,dLab,12.5,false);
  return out+'</svg>';
}
/* Numeric MC options: correct value cv (formatted), errs is [[value, feedback], ...]. Returns [correctObj, distractorArray]. */
function u6NOpts(cv,cfb,errs,unit,dec){
  /* Options carry bare values by design: the unit is named in each caller's stem. */
  var f=dec?function(v){return fmtF(v,1);}:function(v){return fmt(v);};
  var seen={}, ds=[]; seen[f(cv)]=1;
  for(var i=0;i<errs.length && ds.length<3;i++){
    var v=errs[i][0]; if(!isFinite(v)||v<=0) continue; var key=f(v); if(seen[key]) continue; seen[key]=1;
    ds.push({t:key, fb:errs[i][1]});
  }
  var step=dec?2.3:3, g=0;
  while(ds.length<3 && g<24){ g++; var v2=cv+step*g; var k2=f(v2); if(seen[k2]) continue; seen[k2]=1;
    ds.push({t:k2, fb:"That value comes from changing the correct result, not from the side lengths given. Recheck the calculation."}); }
  return [{t:f(cv), fb:cfb}, ds];
}

E("u6-apps-history", 6, ["3.53"], 1, "var", varset([
  function(){ return mcq("Rope stretchers in ancient Egypt used a knotted rope to lay out field boundaries after floods. How did the rope help them make square corners for fields?",
    {t:"The rope was marked in a 3:4:5 ratio, and the corner where the 3 and 4 parts met formed a right angle.", fb:"Yes: a 3:4:5 triangle is a right triangle, so the rope set out true square corners."},
    [{t:"The rope was soaked in water overnight so it would stretch into a perfectly straight line for measuring fields.", fb:"Stretching makes a line, not a right angle: the 3:4:5 marks are what set the corner."},
     {t:"The rope was tied in a full circle so that square corners could be copied from the circle's round shape.", fb:"A circle copies curves, not square corners: the knotted 3:4:5 triangle is the tool."},
     {t:"The rope held 12 equal knots, spaced evenly, and any corner made from it was square by itself.", fb:"Equal spacing alone does not make a right angle: the sides must follow the 3:4:5 ratio."}],
    "A triangle with sides in the ratio 3:4:5 satisfies the Pythagorean relation, so it contains a right angle. The answer is <b>the knotted rope in a 3:4:5 ratio</b>.", {}); },
  function(){ return mcq("Which statement gives a historical application of the Pythagorean theorem?",
    {t:"Builders in ancient times used the relation to lay out right angles for temples, fields and pyramids.", fb:"Yes: setting out true right angles on the ground is one of the oldest uses of the relation."},
    [{t:"Sailors used the relation to predict tides and storm seasons along the coast each year.", fb:"Tides follow the Moon and weather patterns, not the side lengths of a right triangle."},
     {t:"Metal workers used the relation to choose the exact melting point of bronze for casting tools.", fb:"Melting points are a property of the metal, not a triangle calculation."},
     {t:"Map makers used the relation to colour regions on early maps, so that neighbouring regions stood out clearly.", fb:"Colouring regions is a design choice: the relation measures lengths in right triangles."}],
    "Early builders used the relation between the sides of a right triangle to set out right angles. The answer is <b>laying out right angles for buildings and fields</b>.", {}); },
  function(){ return mcq("A carpenter today checks that a deck frame is square before fastening the boards. Which use of the Pythagorean theorem is this?",
    {t:"A contemporary application: the frame is square when its diagonal matches the length the theorem predicts.", fb:"Yes: checking a diagonal against the theorem is a present day trade use."},
    [{t:"A historical application, because the theorem itself is already hundreds of years old.", fb:"The theorem is old, but this deck check is a current job, so it is a contemporary application."},
     {t:"Not an application at all, because the carpenter is measuring an existing frame instead of drawing one on paper.", fb:"Measuring a real frame and comparing it with the theorem is exactly an application."},
     {t:"An application of angle bisection, because the diagonal splits the corner into two angles.", fb:"The diagonal here is being checked for length and squareness, not used to bisect an angle."}],
    "Using the theorem on a job being done today is a contemporary application. The answer is <b>the deck frame diagonal check</b>.", {}); },
  function(){ return mcq("Which situation is a contemporary application of the Pythagorean theorem?",
    {t:"A delivery drone flies a straight route found from the eastward and northward distances to a drop site.", fb:"Yes: the straight flight distance is the hypotenuse of a right triangle with the two ground distances as legs."},
    [{t:"A baker doubles a recipe so that one cake mix feeds twice as many people at a community supper.", fb:"Doubling a recipe is proportional scaling of ingredients, not a right triangle length."},
     {t:"A clerk converts a price from dollars to cents for a receipt, multiplying the dollar amount by one hundred.", fb:"Converting money units is a place value change, not a triangle calculation."},
     {t:"A coach sorts players into teams of equal size for a drill before the game starts.", fb:"Sorting into equal groups is division, not the Pythagorean relation."}],
    "The straight route is the hypotenuse when the two ground distances are the legs of a right triangle. The answer is <b>the drone route</b>.", {}); },
  function(){ return mcq("Television and monitor screens are sold by a size such as 55 inches. What does that size measure, and which theorem connects it to the width and height of the screen?",
    {t:"It measures the diagonal of the screen, and the Pythagorean theorem connects the diagonal to the width and height.", fb:"Yes: width and height are the legs and the quoted size is the diagonal, the hypotenuse."},
    [{t:"It measures the width of the screen only, and the area of the screen connects it to the height.", fb:"The quoted size is the diagonal, not the width."},
     {t:"It measures the distance all the way around the screen, and the perimeter connects it to the two side lengths directly.", fb:"The quoted size is a single diagonal length, not the distance around."},
     {t:"It measures the height of the screen, and the Pythagorean theorem connects that height to the price.", fb:"The size is the diagonal, and the theorem connects lengths, not price."}],
    "Screen size is the diagonal length. With the width and height as legs, the theorem gives the diagonal. The answer is <b>the diagonal, found with the Pythagorean theorem</b>.", {}); },
  function(){ return mcq("Surveyors once found the distance across a pond without crossing it. They measured two distances on land that met at a right angle, one along each side of the pond corner. How did they get the distance across?",
    {t:"They treated the two land distances as the legs of a right triangle and calculated the distance across as the hypotenuse.", fb:"Yes: the line across the pond completes a right triangle, so its length comes from the two legs."},
    [{t:"They added the two land distances and reported that sum as the distance across, treating the path as two straight sides only.", fb:"Adding the legs gives the path around the corner, which is longer than the straight distance across."},
     {t:"They measured the water temperature carefully at both ends of the crossing and compared the readings with each other.", fb:"Temperature says nothing about a distance across the pond."},
     {t:"They waited for calm weather, then estimated the distance across by eye, judging it against the far shoreline.", fb:"Estimating by eye does not use the two measured legs: the theorem does."}],
    "The two measured distances are the legs and the distance across is the hypotenuse. The answer is <b>calculate it as the hypotenuse</b>.", {}); }
]), ["Sort each example by when and where it happens: long ago or on a job today.", "Start by asking whether the example finds a length or a right angle in a right triangle."]);

E("u6-trades-formula", 6, ["2.2"], 1, "var", varset([
  function(){ return mcq("How does a carpenter use the Pythagorean theorem formula \\(a^2 + b^2 = c^2\\) on a framing job?",
    {t:"To find the diagonal of a rectangular frame and check that the frame is square.", fb:"Yes: the two sides are the legs and the diagonal is the hypotenuse, so the formula tests squareness."},
    [{t:"To find the total board feet of lumber needed to build a wall frame for a house.", fb:"Board feet come from volume of lumber, not from the diagonal of the frame."},
     {t:"To choose the exact spacing of nails along the top plate of a stud wall.", fb:"Nail spacing follows building practice and code, not the triangle formula."},
     {t:"To work out the drying time of pressure treated lumber stacked outdoors.", fb:"Drying time depends on moisture and weather, not on side lengths of a triangle."}],
    "A carpenter uses \\(a^2 + b^2 = c^2\\) with the frame sides as legs and the diagonal as hypotenuse. The answer is <b>finding and checking the frame diagonal</b>.", {}); },
  function(){ return mcq("A roofer needs the length of a rafter. The roof rises straight up from the wall plate and runs straight out to the wall. How does the roofer use the Pythagorean theorem?",
    {t:"The rise and the run are the legs, so the theorem gives the rafter length as the hypotenuse.", fb:"Yes: a rafter is the sloped side of a right triangle formed by the rise and the run."},
    [{t:"The theorem gives the number of shingle bundles needed to cover the whole roof of a house in one layer.", fb:"Shingle bundles come from roof area, not from the rafter triangle alone."},
     {t:"The theorem sets the exact overlap between rows of shingles laid on the roof surface.", fb:"Shingle overlap is a set exposure measurement, not a hypotenuse."},
     {t:"The theorem gives the total weight that the roof frame can safely carry when loaded.", fb:"Load capacity is an engineering rating, not the rafter length calculation."}],
    "Rise and run form the legs of a right triangle and the rafter is the hypotenuse. The answer is <b>the theorem gives the rafter length</b>.", {}); },
  function(){ return mcq("A utility worker anchors a guy wire from the top of a pole to a point on the ground. Which job does the Pythagorean theorem do for the worker?",
    {t:"It gives the wire length from the pole height and the distance of the anchor from the base of the pole.", fb:"Yes: pole height and ground distance are the legs and the wire is the hypotenuse."},
    [{t:"It gives the voltage the wire can safely carry, based on the pole height and the anchor distance from the pole.", fb:"Voltage rating is a property of the equipment, not a triangle length."},
     {t:"It sets how deep the anchor must be buried in the ground next to the base of the pole.", fb:"Anchor depth depends on soil and load rules, not on the wire triangle."},
     {t:"It works out the exact crew size needed to raise the pole safely into place on site.", fb:"Crew size is a safety and lifting decision, not a side length."}],
    "The pole and the ground form a right angle, so the wire is the hypotenuse. The answer is <b>the theorem gives the wire length</b>.", {}); },
  function(){ return mcq("A tile setter is laying a rectangular bathroom floor and wants the corners to be truly square. How is the Pythagorean theorem used on this job?",
    {t:"Equal marks are measured along the two walls from a corner, and the distance between the marks is checked against the 3:4:5 pattern.", fb:"Yes: the 3:4:5 check is the theorem in trade form, used to test whether a corner is 90 degrees."},
    [{t:"The theorem chooses the colour pattern for the border tiles, deciding which colours alternate around the edge of the whole tiled floor.", fb:"Colour patterns are a design choice, not a right angle check."},
     {t:"The theorem gives the grout drying time for the floor, based on the lengths of the two walls that meet at the corner.", fb:"Drying time comes from the product directions, not a triangle."},
     {t:"The theorem counts how many tiles fit along one wall, using the full wall length and the width of a single tile.", fb:"Counting tiles along a wall is division of lengths, not the corner check."}],
    "Tile setters use the 3:4:5 form of the theorem to test corners. The answer is <b>the 3:4:5 corner check</b>.", {}); },
  function(){ return mcq("A stair builder cuts a stringer, the sloped board that carries the steps. The total rise and total run of the stairs are known. How does the builder use the Pythagorean theorem?",
    {t:"The stringer length is the hypotenuse of the right triangle with the total rise and total run as legs.", fb:"Yes: the sloped stringer closes a right triangle with the rise and the run."},
    [{t:"The theorem gives the exact height of each individual step in the whole staircase, from the bottom step to the top one.", fb:"Step height comes from dividing the total rise by the number of steps, not from the hypotenuse."},
     {t:"The theorem decides the width of the handrail board mounted on the wall beside the stairs.", fb:"Handrail width is a stock size choice, not the stringer length."},
     {t:"The theorem gives the number of screws needed in each step of the stairs to hold it firm.", fb:"Fastener counts follow building practice, not a triangle calculation."}],
    "Total rise and total run are the legs and the stringer is the hypotenuse. The answer is <b>the theorem gives the stringer length</b>.", {}); }
]), ["Think of the sloped or diagonal length on the job: it is usually the hypotenuse.", "Start by naming the two sides that meet at a right angle in the trade example."]);

E("u6-why-right-only", 6, ["3.54"], 1, "var", varset([
  function(){ return mcq("Why does the Pythagorean theorem apply only to right triangles?",
    {t:"The squares on the two shorter sides add to the square on the longest side only when the angle between the shorter sides is 90 degrees.", fb:"Yes: the equality of the squares holds exactly at a right angle and fails at other angles."},
    [{t:"Because the theorem was first written down for right triangles long ago, and no one has ever updated it at all in the centuries since then.", fb:"The limit is mathematical, not historical: the squares do not balance at other angles."},
     {t:"Because only right triangles have a longest side, and the sides of other triangles cannot be compared as squares at all.", fb:"Every triangle has a longest side: the square equality is what fails for other triangles."},
     {t:"Because the sides of other triangles cannot be squared at all, so the comparison of squares cannot even be started.", fb:"Any length can be squared: the squared lengths just do not add up the same way."}],
    "The relation \\(a^2 + b^2 = c^2\\) holds only when the angle between sides \\(a\\) and \\(b\\) is 90 degrees. The answer is <b>the squares balance only at a right angle</b>.", {}); },
  function(){ return mcq("A triangle has sides 4 cm, 5 cm and 6 cm. A student claims the theorem proves it is special. What does the square check actually show?",
    {t:"\\(4^2 + 5^2 = 41\\) and \\(6^2 = 36\\), so the squares do not balance and the triangle is not a right triangle.", fb:"Yes: 16 + 25 = 41, which is not 36, so the theorem does not hold for this triangle."},
    [{t:"\\(4^2 + 5^2 = 36\\), so the squares balance, and the triangle is a right triangle after all.", fb:"16 + 25 is 41, not 36: the arithmetic and the conclusion are both off."},
     {t:"\\(4 + 5 = 6 + 3\\), so the side lengths balance and the triangle is right, just as the squares would.", fb:"The theorem compares squares of the sides, not the sides themselves."},
     {t:"The squares on the sides always balance exactly for any three whole number sides, so every such triangle is right.", fb:"They balance only for right triangles: 41 and 36 show a case where they do not."}],
    "\\(4^2 + 5^2 = 41 \\ne 36 = 6^2\\). The answer is <b>the squares do not balance, so it is not a right triangle</b>.", {}); },
  function(){ return mcq("Squares are drawn on the three sides of a triangle that has an angle greater than 90 degrees. How do the square areas compare?",
    {t:"The square on the longest side is larger than the two smaller squares combined, so the theorem does not hold.", fb:"Yes: with an obtuse angle the longest side stretches, and its square passes the sum of the other two."},
    [{t:"The square on the longest side equals the two smaller squares combined.", fb:"Equality happens only at exactly 90 degrees, and this angle is greater than 90 degrees."},
     {t:"The square on the longest side is smaller than the two smaller squares combined.", fb:"A smaller total happens with an acute triangle: an obtuse angle makes the longest square larger."},
     {t:"The areas cannot be compared because the triangle has no right angle.", fb:"Areas can always be compared: the comparison is what shows the theorem failing."}],
    "For an obtuse triangle, \\(c^2 > a^2 + b^2\\). The answer is <b>the largest square is bigger than the other two combined</b>.", {}); },
  function(){ return mcq("A student uses \\(a^2 + b^2 = c^2\\) on a triangle with no right angle and gets a length for the longest side. Why is that length unreliable?",
    {t:"The formula assumes a right angle, so on another triangle shape it returns a value that does not match the real side.", fb:"Yes: the equality the formula is built on only holds for right triangles."},
    [{t:"The length is fine, because the formula works for every closed shape drawn, whatever angles it has inside, large or small.", fb:"The formula is a statement about right triangles only, not every shape."},
     {t:"The length is unreliable only because the student rounded the numbers given in the question too early.", fb:"Rounding is a small effect: the real problem is using the formula where it does not apply."},
     {t:"The length is unreliable because the longest side of a triangle cannot be calculated in this way at all.", fb:"Longest sides can be calculated with suitable methods: this formula is just the wrong one here."}],
    "The theorem is a right triangle fact. Using it elsewhere gives a value the real side does not match. The answer is <b>the formula assumes a right angle</b>.", {}); },
  function(){ return mcq("Two triangles have legs of 3 m and 4 m meeting each other. In one the angle between them is 90 degrees; in the other it is wider. What happens to the side opposite that angle?",
    {t:"It is 5 m in the right triangle, and longer than 5 m when the angle opens wider than 90 degrees.", fb:"Yes: opening the angle stretches the opposite side past the hypotenuse length of 5 m."},
    [{t:"It stays exactly 5 m, no matter how wide the angle between the two sides opens at all.", fb:"The opposite side changes as the angle changes: 5 m belongs to the 90 degree case."},
     {t:"It is 5 m in the right triangle, and shorter when the angle opens wider than 90 degrees.", fb:"Opening an angle lengthens the side across from it, not shortens it."},
     {t:"It is 7 m in both triangles because 3 + 4 = 7, and adding the sides always gives the third side.", fb:"Adding the legs gives the path along both sides, never the straight side across."}],
    "At 90 degrees the opposite side is the hypotenuse, 5 m. Opening the angle makes it longer. The answer is <b>5 m at the right angle, longer when the angle widens</b>.", {}); },
  function(){ return mcq("Which drawing best shows why the theorem needs a right angle?",
    {t:"Squares on the sides of a right triangle, where the two smaller square areas fill the largest square exactly.", fb:"Yes: the areas matching exactly is the picture of the theorem, and it works at 90 degrees."},
    [{t:"Squares on the sides of a long thin triangle, where the areas of the squares are never compared with each other.", fb:"A drawing that never compares the areas shows nothing about the theorem."},
     {t:"A circle drawn through the three corners of any triangle, whatever its angles happen to be.", fb:"A circle through the corners does not compare the square areas at all."},
     {t:"Two triangles joined along a common side to make a four sided shape with four straight edges in all.", fb:"Joining triangles makes a quadrilateral: the square areas are the picture that matters."}],
    "The theorem is a statement about square areas on the sides, matching exactly for a right triangle. The answer is <b>the squares on a right triangle with matching areas</b>.", {}); }
]), ["Picture squares built on the three sides and compare their areas.", "Start by checking whether the squares on the shorter sides add to the square on the longest side."]);

E("u6-345-recognize", 6, ["3.57"], 1, "gen", function(){
  var k=ri(2,12), unit=pick(["m","cm","ft"]);
  var ctx=pick([
    "A rope is marked into equal sections and pulled into a triangle to set out a garden bed.",
    "A framing crew stretches a tape into a triangle to set out a shed floor.",
    "A landscaping crew lays three border boards as a triangle for a flower bed.",
    "A survey helper pegs a cord into a triangle beside a driveway job.",
    "A tile setter tapes a triangle on a floor before laying the first tiles.",
    "A concrete crew forms a triangle with string lines at a patio corner."]);
  var a=3*k, b=4*k, c=5*k;
  function setStr(p,q,r){ return p+", "+q+", "+r+" "+unit; }
  function chk(p,q,r){ return p*p+" + "+q*q+" = "+(p*p+q*q)+", while the longest side squared is "+(r*r); }
  var opts=[
    {t:setStr(a,b,c), fb:"Yes: "+a+" squared plus "+b+" squared equals "+c+" squared, so this set is a multiple of 3:4:5."},
    {t:setStr(a,b,c+k), fb:"Check the squares: "+chk(a,b,c+k)+". The two totals differ, so this set misses the pattern."},
    {t:setStr(a-k,b,c), fb:"Check the squares: "+chk(a-k,b,c)+". The two totals differ, so this set misses the pattern."},
    {t:setStr(a,c,c), fb:"The two longer sides are equal here, and "+a+" squared plus "+c+" squared is far past "+c+" squared, so this set misses the pattern."}];
  var correct=opts[0], distractors=shuffle(opts.slice(1));
  return mcq(ctx+" Which set of side lengths follows the 3:4:5 pattern and so forms a right triangle?",
    correct, distractors,
    "The 3:4:5 pattern scaled by "+k+" gives sides "+a+", "+b+" and "+c+". \\[ \\begin{aligned} "+a+"^2 + "+b+"^2 &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" = "+c+"^2 \\end{aligned} \\] The answer is <b>"+setStr(a,b,c)+"</b>.",
    {k:k, unit:unit});
}, ["Look for sides that are all multiples of 3, 4 and 5 by the same amount.", "Start by dividing each side by the smallest side pattern: the ratios should read 3 to 4 to 5."]);

E("u6-identify-hypotenuse", 6, ["3.59","3.55"], 1, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], c=sc[2];
  var unit=pick(["m","cm","ft","in"]);
  var ctx=pick(["A brace runs across a right triangular frame.","A ramp board forms a right triangle with the ground and a platform.","A support cable, a pole and the ground form a right triangle.","A stair stringer forms a right triangle with the floor and a wall.","A kite string, the ground and a vertical line form a right triangle."]);
  var q=mcq(ctx+" The two sides that meet at the right angle measure "+a+" "+unit+" and "+b+" "+unit+". Which statement names the hypotenuse and its length?",
    {t:"The hypotenuse is "+c+" "+unit+", the side opposite the right angle.", fb:"Yes: the hypotenuse is opposite the right angle and is the longest side, "+c+" "+unit+" here."},
    [{t:"The hypotenuse is "+a+" "+unit+", one of the sides at the right angle.", fb:"The side of "+a+" "+unit+" meets the right angle, so it is a leg, not the hypotenuse."},
     {t:"The hypotenuse is "+b+" "+unit+", one of the sides at the right angle.", fb:"The side of "+b+" "+unit+" meets the right angle, so it is a leg, not the hypotenuse."},
     {t:"The hypotenuse is "+(a+b)+" "+unit+", the two shorter sides added.", fb:"Adding the legs gives "+(a+b)+" "+unit+", which is longer than any straight side of the triangle."}],
    "\\(a^2 + b^2 = "+a+"^2 + "+b+"^2 = "+(a*a+b*b)+" = "+c+"^2\\), so the side opposite the right angle is "+c+" "+unit+". The answer is <b>"+c+" "+unit+", opposite the right angle</b>.",
    {a:a,b:b,c:c});
  q.figure=u6TriSVG(a,b,fmt(a)+" "+unit,fmt(b)+" "+unit,fmt(c)+" "+unit);
  return q;
}, ["The hypotenuse is always the side across from the right angle marker.", "Start by finding the small square corner in the diagram: the side that does not touch it is the hypotenuse."]);

E("u6-verify-squares", 6, ["3.55","3.56"], 2, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1];
  var mode=ri(0,2), c=sc[2];
  if(mode===1) c=c+ri(1,3); if(mode===2){ c=c-ri(1,2); if(c<=b) c=sc[2]+ri(1,3); }
  var unit=pick(["cm","m","ft","in"]);
  var ctx=pick(["A student builds squares on the three sides of a triangular tile pattern","A class tests a triangular garden frame with squares drawn on each side","A worker checks a triangular brace by squaring each side length","A student models a triangular sign with squares on all three sides"]);
  var sum=a*a+b*b, cs=c*c;
  var concl, cfb;
  if(sum===cs){ concl="equal to \\("+cs+"\\), so the triangle is a right triangle"; cfb="Yes: "+a+" squared plus "+b+" squared is "+sum+", matching "+c+" squared exactly."; }
  else if(sum>cs){ concl="greater than \\("+cs+"\\), so the triangle is not a right triangle"; cfb="Yes: "+a+" squared plus "+b+" squared is "+sum+", which passes "+c+" squared at "+cs+"."; }
  else { concl="less than \\("+cs+"\\), so the triangle is not a right triangle"; cfb="Yes: "+a+" squared plus "+b+" squared is "+sum+", which falls short of "+c+" squared at "+cs+"."; }
  var correct={t:"\\("+a+"^2 + "+b+"^2 = "+sum+"\\), which is "+concl, fb:cfb};
  var others=[
    {t:"\\("+a+"^2 + "+b+"^2 = "+((a+b)*(a+b))+"\\), which is equal to \\("+cs+"\\), so the triangle is a right triangle", fb:"That total squares the sum "+(a+b)+" instead of adding the squares. Square each side first, then add."},
    {t:"\\("+a+"^2 + "+b+"^2 = "+sum+"\\), which is "+(sum===cs?"greater than":"equal to")+" \\("+cs+"\\), so the triangle is "+(sum===cs?"not a right triangle":"a right triangle"), fb:"The total "+sum+" is right, but the comparison with "+cs+" is stated backwards. Compare the two totals again."},
    {t:"\\("+a+" \\times "+b+" = "+(a*b)+"\\), which comes out equal to \\("+cs+"\\), so the triangle is a right triangle", fb:"Multiplying the two legs is an area step, not the theorem. The theorem adds the squares of the sides."}];
  var q=mcq(ctx+". The sides are "+a+" "+unit+", "+b+" "+unit+" and "+c+" "+unit+", with "+c+" "+unit+" the longest side. What does the square check show?",
    correct, others,
    "\\[ \\begin{aligned} "+a+"^2 + "+b+"^2 &= "+(a*a)+" + "+(b*b)+" = "+sum+" \\\\ "+c+"^2 &= "+cs+" \\end{aligned} \\] Comparing the totals: the check shows the sum is "+concl+". The answer is <b>\\("+sum+"\\) compared with \\("+cs+"\\)</b>.",
    {a:a,b:b,c:c,mode:mode});
  q.figure=u6GenTriSVG(a,b,c,fmt(a)+" "+unit,fmt(b)+" "+unit,fmt(c)+" "+unit);
  return q;
}, ["Square each side on its own first, then compare the two shorter squares with the longest square.", "Start by computing the square of the longest side, since that is the total the other two must match."]);

E("u6-is-right", 6, ["3.56"], 2, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], c=sc[2];
  var mode=pick(["right","right","long","short"]);
  if(mode==="long") c=c+ri(1,4); if(mode==="short"){ c=c-ri(1,3); if(c<=sc[1]) c=sc[2]+ri(1,3); }
  if(a>b){ var t=a; a=b; b=t; }
  var unit=pick(["cm","m","ft","in","mm"]);
  var ctx=pick(["A triangular flower bed has sides","A triangular kite frame has sides","A triangular shelf bracket has sides","A triangular pennant has sides","A triangular plot of gravel has sides","A triangular sail has sides","A triangular warning sign has sides"]);
  var sum=a*a+b*b, cs=c*c;
  var relation = sum===cs ? "equals" : (sum>cs ? "is greater than" : "is less than");
  var verdict = sum===cs ? "Yes, it is a right triangle" : "No, it is not a right triangle";
  var correct={t:verdict+", because \\("+a+"^2 + "+b+"^2 = "+sum+"\\) and \\("+c+"^2 = "+cs+"\\)", fb:"Yes: the two totals "+(sum===cs?"match exactly":"differ")+", and that decides the question."};
  var distractors=[
    {t:(sum===cs?"No, it is not a right triangle":"Yes, it is a right triangle")+", because \\("+a+"^2 + "+b+"^2 = "+sum+"\\) and \\("+c+"^2 = "+cs+"\\)", fb:"The totals are computed correctly but the conclusion is backwards: the triangle is a right triangle only when the totals match exactly."},
    {t:verdict+", because \\("+a+" + "+b+" = "+c+"\\) with the sides added directly", fb:"The theorem compares squares, not the sides added directly: "+a+" + "+b+" is "+(a+b)+", not "+c+"."},
    {t:verdict+", because \\("+a+"^2 + "+c+"^2 = "+(a*a+c*c)+"\\) and \\("+b+"^2 = "+(b*b)+"\\)", fb:"That check squares the longest side as a leg. The longest side must stand alone on one side of the equation."}];
  var q=mcq(ctx+" of "+a+" "+unit+", "+b+" "+unit+" and "+c+" "+unit+". Is the triangle a right triangle?",
    correct, distractors,
    "Square the two shorter sides and compare with the square of the longest side. \\[ \\begin{aligned} "+a+"^2 + "+b+"^2 &= "+(a*a)+" + "+(b*b)+" = "+sum+" \\\\ "+c+"^2 &= "+cs+" \\end{aligned} \\] The first total "+relation+" the second. The answer is <b>"+verdict.toLowerCase()+"</b>.",
    {a:a,b:b,c:c,mode:mode});
  var cGeo=Math.min(c, a+b-0.6); if(cGeo<=Math.abs(a-b)+0.6) cGeo=Math.abs(a-b)+1.2;
  q.figure=u6GenTriSVG(a,b,cGeo,fmt(a)+" "+unit,fmt(b)+" "+unit,fmt(c)+" "+unit);
  return q;
}, ["Use the converse: a triangle is right exactly when the squares of the shorter sides add to the square of the longest side.", "Start by identifying the longest side, since its square is the one the other two must match."]);

E("u6-hypotenuse-direct", 6, ["3.59","2.3"], 2, "gen", function(){
  var a=ri(3,25), b=ri(3,25); if(ri(0,1)) a+=0.5; if(ri(0,1)) b+=0.5;
  var hyp=Math.sqrt(a*a+b*b), ans=u6R1(hyp);
  var unit=pick(["m","ft","cm"]);
  var ctxs=[
    ["A playground slide is "+b+" "+unit+" high and its base reaches "+a+" "+unit+" out from the platform. What is the length of the sliding surface","the sliding surface"],
    ["A ramp rises "+b+" "+unit+" over a horizontal run of "+a+" "+unit+". What is the length of the sloped ramp surface","the ramp surface"],
    ["A banner cable runs from a point "+a+" "+unit+" along the ground to the top of a wall "+b+" "+unit+" high. What is the length of the cable","the cable"],
    ["A conveyor rises "+b+" "+unit+" while covering "+a+" "+unit+" of floor distance. What is the length of the conveyor belt run","the belt run"],
    ["A stair stringer covers a run of "+a+" "+unit+" and a rise of "+b+" "+unit+". What is the length of the stringer","the stringer"],
    ["A tent rope runs from a stake "+a+" "+unit+" from the pole base to a point "+b+" "+unit+" up the pole. What is the length of the rope","the rope"]];
  var ctx=pick(ctxs);
  var pair=u6NOpts(ans,"Yes: square both legs, add, and take the square root to get "+fmtF(ans,1)+" "+unit+".",
    [[u6R1(a+b),"That adds the legs, giving the path along both sides, not the straight sloped length."],
     [u6R1(Math.sqrt(Math.abs(a*a-b*b))),"That subtracts the squares. For a hypotenuse, the squares of the legs are added."],
     [u6R1(a*a+b*b),"That is the squared length before the square root step. Take the square root to finish."],
     [u6R1(hyp+2),"That overshoots the square root result. Recheck the root of "+fmt(a*a+b*b)+"."],
     [u6R1(Math.max(hyp-2,0.5)),"That falls short of the square root result. Recheck the root of "+fmt(a*a+b*b)+"."]],
    unit,1);
  var q=mcq(ctx[0]+", in "+({m:"metres",ft:"feet",cm:"centimetres"})[unit]+"? Give the length to the nearest tenth.",
    pair[0], pair[1],
    "The sloped length is the hypotenuse. \\[ \\begin{aligned} c^2 &= "+fmt(a)+"^2 + "+fmt(b)+"^2 \\\\ &= "+fmt(a*a)+" + "+fmt(b*b)+" = "+fmt(a*a+b*b)+" \\\\ c &= \\sqrt{"+fmt(a*a+b*b)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {a:a,b:b});
  q.figure=u6TriSVG(a,b,fmt(a)+" "+unit,fmt(b)+" "+unit,"?");
  return q;
}, ["The sloped length is the hypotenuse, so use the theorem in its direct form.", "Start by squaring the two given lengths and adding the squares."]);

E("u6-corner-square", 6, ["3.58","3.57"], 2, "gen", function(){
  var unit=pick(["cm","cm","in"]);
  var u=unit==="cm"?ri(12,32):ri(2,5);
  var m1=3*u, m2=4*u, diag=5*u;
  var ctx=pick(["A deck builder checks a frame corner","A tile setter checks a bathroom floor corner","A foundation crew checks a form corner","A shed builder checks a floor frame corner","A gardener checks the corner of a raised bed","A framer checks the corner of a wall section"]);
  if(ri(0,1)===0){
    var pair=u6NOpts(diag,"Yes: in a 3:4:5 check, the diagonal is 5 parts when the marks are 3 parts and 4 parts.",
      [[m1+m2,"That adds the two marks, giving the path along both walls, not the straight diagonal."],
       [diag-u,"That uses 4 parts for the diagonal, matching the longer mark instead of the 5 part diagonal."],
       [diag+u,"That uses 6 parts for the diagonal, one part too many: the pattern is 3, 4, 5."],
       [Math.round(Math.sqrt(m1*m1+m2*m2))+ri(2,4),"Close to the mark distance, but the 3:4:5 pattern fixes the diagonal at exactly 5 parts of "+u+" "+unit+"."]],
      unit,0);
    var q=mcq(ctx+" by marking "+m1+" "+unit+" along one side and "+m2+" "+unit+" along the other side from the corner. For the corner to be square, what should the distance between the two marks be, in "+(unit==="cm"?"centimetres":"inches")+"?",
      pair[0], pair[1],
      "The marks follow 3:4:5 with each part equal to "+u+" "+unit+". \\[ \\begin{aligned} \\text{diagonal} &= 5 \\times "+u+" = "+diag+" \\end{aligned} \\] Checking with the theorem: \\("+m1+"^2 + "+m2+"^2 = "+(m1*m1+m2*m2)+" = "+diag+"^2\\). The answer is <b>"+diag+" "+unit+"</b>.",
      {m1:m1,m2:m2,mode:"expect"});
    q.figure=u6CornerSVG(m1,m2,"?",fmt(m1)+" "+unit,fmt(m2)+" "+unit);
    return q;
  }
  var off=pick([-6,-4,-3,3,4,6,8,-8].filter(function(d){ return unit==="cm" ? true : Math.abs(d)<=3; }));
  var measured=diag+off;
  var square = off===0;
  var correct={t:"The corner is not square, because the distance should be "+diag+" "+unit+" and the marks measure "+measured+" "+unit,
    fb:"Yes: a square corner needs the 5 part distance of "+diag+" "+unit+"; "+measured+" "+unit+" misses it."};
  var distractors=[
    {t:"The corner is square, because any two marks with a tape between them confirm a right angle", fb:"Marks alone confirm nothing: the distance between them must match the 3:4:5 pattern."},
    {t:"The corner is square, because "+m1+" "+unit+" and "+m2+" "+unit+" follow the 3 and 4 parts of the pattern", fb:"The 3 and 4 marks are only two thirds of the check: the diagonal must also match the 5 part, "+diag+" "+unit+"."},
    {t:"The corner is not square, because the distance should be "+(m1+m2)+" "+unit+" and the marks measure "+measured+" "+unit, fb:"The expected distance is not the marks added: it is the 5 part diagonal, "+diag+" "+unit+"."}];
  var q2=mcq(ctx+". Marks are made "+m1+" "+unit+" along one side and "+m2+" "+unit+" along the other side from the corner, and the distance between the marks measures "+measured+" "+unit+". What does the 3:4:5 check conclude?",
    correct, distractors,
    "Each part is "+u+" "+unit+", so a square corner needs \\(5 \\times "+u+" = "+diag+"\\) "+unit+" between the marks. The measured distance is "+measured+" "+unit+", which differs. The answer is <b>the corner is not square</b>.",
    {m1:m1,m2:m2,measured:measured,mode:"judge"});
  q2.figure=u6CornerSVG(m1,m2,fmt(measured)+" "+unit,fmt(m1)+" "+unit,fmt(m2)+" "+unit);
  return q2;
}, ["The corner check is the 3:4:5 pattern scaled to the job: marks of 3 parts and 4 parts need 5 parts between them.", "Start by finding the size of one part from either mark, then multiply by 5 for the diagonal."]);

E("u6-why-345-works", 6, ["3.57"], 2, "gen", function(){
  var k=ri(2,15), unit=pick(["m","cm","ft","units"]);
  var a=3*k, b=4*k, c=5*k;
  var ctx=pick(["A triangle has side lengths","A rope triangle has side lengths","A frame triangle has side lengths","A garden triangle has side lengths","A layout triangle has side lengths","A test triangle has side lengths"]);
  var correct={t:"\\("+a+"^2 + "+b+"^2 = "+c+"^2\\), because \\("+(a*a)+" + "+(b*b)+" = "+(c*c)+"\\)",
    fb:"Yes: the squares of the two shorter sides add exactly to the square of the longest side."};
  var distractors=[
    {t:"\\("+a+" + "+b+" = "+c+"\\), because \\("+a+" + "+b+" = "+(a+b)+"\\) and that settles the question",
     fb:"Adding the sides gives "+(a+b)+", not "+c+": the theorem compares squares, not the sides themselves."},
    {t:"\\("+a+"^2 + "+c+"^2 = "+b+"^2\\), because \\("+(a*a)+" + "+(c*c)+" = "+(a*a+c*c)+"\\)",
     fb:"That puts the longest side in as a leg. The longest side, "+c+", must stand alone as the hypotenuse."},
    {t:"\\("+c+"^2 - "+a+"^2 = "+b+"^2\\), because \\("+(c*c)+" - "+(a*a)+" = "+(c*c-a*a)+"\\) and squares are involved",
     fb:"That rearrangement gives "+(c*c-a*a)+", not "+(b*b)+": it mixes up which leg is being isolated."}];
  return mcq(ctx+" of "+a+" "+unit+", "+b+" "+unit+" and "+c+" "+unit+". Which calculation proves the triangle is a right triangle?",
    correct, distractors,
    "The sides are the 3:4:5 pattern scaled by "+k+". \\[ \\begin{aligned} "+a+"^2 + "+b+"^2 &= "+(a*a)+" + "+(b*b)+" \\\\ &= "+(c*c)+" = "+c+"^2 \\end{aligned} \\] Because the relation holds, the triangle is a right triangle. The answer is <b>\\("+a+"^2 + "+b+"^2 = "+c+"^2\\)</b>.",
    {a:a,b:b,c:c,k:k});
}, ["A 3:4:5 triangle is right because it passes the square check of the theorem.", "Start by squaring all three sides and looking for the two that add to the third."]);

E("u6-counterexample", 6, ["3.54","3.56"], 2, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], pred=sc[2];
  var delta=pick([1,2,3,-1,-2]); var actual=pred+delta; if(actual<=b) actual=pred+ri(1,3);
  var unit=pick(["cm","m","ft","in"]);
  var ctx=pick(["A student sketches a triangle with sides","A kit builds a triangular frame with sides","A flag is cut as a triangle with sides","A metal offcut forms a triangle with sides"]);
  var correct={t:"The theorem would predict "+pred+" "+unit+", but the side measures "+actual+" "+unit+", so the triangle is not a right triangle",
    fb:"Yes: \\("+a+"^2 + "+b+"^2 = "+pred+"^2\\), and the actual longest side differs, so there is no right angle."};
  var distractors=[
    {t:"The theorem would predict "+actual+" "+unit+", so the side measures exactly what the theorem requires",
     fb:"The calculation gives "+pred+" "+unit+", not "+actual+" "+unit+": that mismatch is the whole point of the example."},
    {t:"The theorem would predict "+(a+b)+" "+unit+", but the side measures "+actual+" "+unit+", so the triangle is not a right triangle",
     fb:"The prediction is not the legs added: square the legs, add, and take the root, which gives "+pred+" "+unit+"."},
    {t:"The theorem would predict "+pred+" "+unit+", so the triangle is a right triangle even though the side measures "+actual+" "+unit,
     fb:"A prediction and a measurement that differ cannot both describe a right triangle: the mismatch shows there is no right angle."}];
  var q=mcq(ctx+" "+a+" "+unit+", "+b+" "+unit+" and "+actual+" "+unit+". The student applies the Pythagorean theorem to the two shorter sides. What does the result show?",
    correct, distractors,
    "\\[ \\begin{aligned} c^2 &= "+a+"^2 + "+b+"^2 = "+(a*a)+" + "+(b*b)+" = "+(pred*pred)+" \\\\ c &= "+pred+" \\end{aligned} \\] A right triangle with legs "+a+" and "+b+" would have longest side "+pred+" "+unit+". The actual side is "+actual+" "+unit+", so this triangle has no right angle. The answer is <b>predicted "+pred+" "+unit+", actual "+actual+" "+unit+", not a right triangle</b>.",
    {a:a,b:b,pred:pred,actual:actual});
  q.figure=u6GenTriSVG(a,b,actual,fmt(a)+" "+unit,fmt(b)+" "+unit,fmt(actual)+" "+unit);
  return q;
}, ["Run the theorem on the two shorter sides and compare its prediction with the side that is actually there.", "Start by squaring the two shorter sides: their total tells you what the longest side would have to be."]);

E("u6-apps-contemporary", 6, ["3.53","2.2"], 2, "gen", function(){
  var a=ri(2,30), b=ri(2,30);
  var dist=Math.sqrt(a*a+b*b), ans=u6R1(dist);
  var unit=pick(["km","m"]);
  var ctxs=[
    ["A search drone must fly in a straight line to a site that is "+a+" "+unit+" east and "+b+" "+unit+" north of its base. What is the straight line flight distance, to the nearest tenth","the flight distance"],
    ["A navigation app places a trailhead "+a+" "+unit+" east and "+b+" "+unit+" north of a parking lot. What is the straight line distance between them, to the nearest tenth","the straight line distance"],
    ["A rescue boat heads to a buoy that is "+a+" "+unit+" along the shore and "+b+" "+unit+" out from shore, at a right angle. What is the direct distance to the buoy, to the nearest tenth","the direct distance"],
    ["A survey drone maps a point that is "+a+" "+unit+" across a field and "+b+" "+unit+" along the field from its launch corner. What is the direct distance to the point, to the nearest tenth","the direct distance"],
    ["A delivery robot can cut across an empty lot from one corner. The lot edges it would otherwise follow run "+a+" "+unit+" and "+b+" "+unit+" at a right angle. What is the distance across, to the nearest tenth","the distance across"],
    ["A hiker with a GPS unit is "+a+" "+unit+" east and "+b+" "+unit+" north of a cabin. What is the straight line distance back to the cabin, to the nearest tenth","the straight line distance"]];
  var ctx=pick(ctxs);
  var pair=u6NOpts(ans,"Yes: the two ground distances are the legs, and the direct distance is the hypotenuse.",
    [[u6R1(a+b),"That adds the legs, which is the distance around the corner, not the direct distance."],
     [u6R1(Math.abs(a-b)),"That subtracts the ground distances. The direct distance comes from adding their squares."],
     [u6R1(a*a+b*b),"That is the squared distance. Take the square root to get the distance itself."],
     [u6R1(dist+ri(2,5)),"That overshoots the hypotenuse. Recheck the square root of "+(a*a+b*b)+"."]],
    unit,1);
  var q=mcq(ctx[0]+", in "+({km:"kilometres",m:"metres"})[unit]+"?",
    pair[0], pair[1],
    "The direct distance is the hypotenuse of a right triangle. \\[ \\begin{aligned} d^2 &= "+a+"^2 + "+b+"^2 = "+(a*a)+" + "+(b*b)+" = "+(a*a+b*b)+" \\\\ d &= \\sqrt{"+(a*a+b*b)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {a:a,b:b});
  q.figure=u6TriSVG(a,b,fmt(a)+" "+unit,fmt(b)+" "+unit,"?");
  return q;
}, ["Direct or straight line distance across a right angle is a hypotenuse problem.", "Start by squaring the two ground distances and adding the squares."]);

E("u6-cr-hypotenuse", 6, ["3.59","2.3"], 2, "gen", function(){
  var a=ri(4,28), b=ri(4,28); if(ri(0,1)) a+=0.5; if(ri(0,1)) b+=0.5;
  var ans=u6R1(Math.sqrt(a*a+b*b));
  var unit=pick(["m","ft","cm"]);
  var ctx=pick([
    "A slide at a playground is "+fmt(b)+" "+unit+" high, and its base sits "+fmt(a)+" "+unit+" out from the platform.",
    "A loading ramp rises "+fmt(b)+" "+unit+" over a horizontal run of "+fmt(a)+" "+unit+".",
    "A support cable reaches from a ground anchor "+fmt(a)+" "+unit+" from a wall to a point "+fmt(b)+" "+unit+" up the wall.",
    "A garden trellis leans so its foot is "+fmt(a)+" "+unit+" from a fence and its top touches "+fmt(b)+" "+unit+" up the fence."]);
  var q=numq(ctx+" What is the length, in "+unit+", of the sloped side? Give your answer to the nearest tenth.",
    ans, 0.15,
    "The sloped side is the hypotenuse. \\[ \\begin{aligned} c^2 &= "+fmt(a)+"^2 + "+fmt(b)+"^2 \\\\ &= "+fmt(a*a)+" + "+fmt(b*b)+" = "+fmt(a*a+b*b)+" \\\\ c &= \\sqrt{"+fmt(a*a+b*b)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {a:a,b:b});
  q.figure=u6TriSVG(a,b,fmt(a)+" "+unit,fmt(b)+" "+unit,"?");
  return q;
}, ["The sloped side is the hypotenuse: square both legs, add, then take the square root.", "Start by squaring the horizontal distance and the height separately."]);

E("u6-cr-leg", 6, ["3.59","2.4"], 2, "gen", function(){
  var sc=u6Scaled(), legA=sc[0], legB=sc[1], hyp=sc[2];
  var giveFirst=ri(0,1)===0;
  var given=giveFirst?legA:legB, wanted=giveFirst?legB:legA;
  var unit=pick(["m","ft","cm"]);
  var ctx=pick([
    "A kite string is "+hyp+" "+unit+" long and the kite is "+given+" "+unit+" directly above the ground point used for measuring.",
    "A roof rafter is "+hyp+" "+unit+" long and the roof rises "+given+" "+unit+" from the wall plate to the ridge.",
    "A brace board is "+hyp+" "+unit+" long and it reaches "+given+" "+unit+" up a post.",
    "A zipline cable is "+hyp+" "+unit+" long and the finish platform is "+given+" "+unit+" lower than the start platform."]);
  var wantedName=giveFirst?"the other leg of the right triangle":"the other leg of the right triangle";
  var q=numq(ctx+" The string, board or cable forms the hypotenuse of a right triangle. How long, in "+unit+", is "+wantedName+"?",
    wanted, 0.1,
    "The formula must be rearranged to isolate the unknown leg. \\[ \\begin{aligned} b^2 &= c^2 - a^2 \\\\ &= "+hyp+"^2 - "+given+"^2 = "+(hyp*hyp)+" - "+(given*given)+" = "+(wanted*wanted)+" \\\\ b &= "+wanted+" \\end{aligned} \\] The answer is <b>"+wanted+" "+unit+"</b>.",
    {hyp:hyp,given:given});
  q.figure=giveFirst?u6TriSVG(given,wanted,fmt(given)+" "+unit,"?",fmt(hyp)+" "+unit):u6TriSVG(wanted,given,"?",fmt(given)+" "+unit,fmt(hyp)+" "+unit);
  return q;
}, ["For a missing leg, rearrange the theorem: the leg squared equals the hypotenuse squared minus the known leg squared.", "Start by squaring the hypotenuse and the known leg separately."]);

E("u6-cr-diagonal-rect", 6, ["3.59","2.3"], 2, "gen", function(){
  var w=ri(4,30), l=ri(4,30); if(ri(0,1)) w+=0.5; if(ri(0,1)) l+=0.5;
  var ans=u6R1(Math.sqrt(w*w+l*l));
  var unit=pick(["cm","in","ft","m"]);
  var ctx=pick([
    "A rectangular plywood sheet measures "+fmt(l)+" "+unit+" by "+fmt(w)+" "+unit+". A brace is cut to run corner to corner.",
    "A rectangular screen measures "+fmt(l)+" "+unit+" across and "+fmt(w)+" "+unit+" high.",
    "A rectangular gate frame measures "+fmt(l)+" "+unit+" by "+fmt(w)+" "+unit+". A diagonal brace is fitted from corner to corner.",
    "A rectangular garden bed measures "+fmt(l)+" "+unit+" by "+fmt(w)+" "+unit+". A hose is stretched from one corner to the opposite corner."]);
  var q=numq(ctx+" What is the diagonal length, in "+unit+"? Give your answer to the nearest tenth.",
    ans, 0.15,
    "The diagonal is the hypotenuse of a right triangle with the side lengths as legs. \\[ \\begin{aligned} d^2 &= "+fmt(l)+"^2 + "+fmt(w)+"^2 \\\\ &= "+fmt(l*l)+" + "+fmt(w*w)+" = "+fmt(l*l+w*w)+" \\\\ d &= \\sqrt{"+fmt(l*l+w*w)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {w:w,l:l});
  q.figure=m12RectDiagSVG(l,w,fmt(l)+" "+unit,fmt(w)+" "+unit,"?");
  return q;
}, ["A rectangle diagonal splits the rectangle into two right triangles.", "Start by squaring the length and the width and adding the squares."]);

E("u6-cr-corner-diag", 6, ["3.58"], 2, "gen", function(){
  var u=ri(12,32);
  var m1=3*u, m2=4*u, diag=5*u;
  var ctx=pick([
    "A builder setting out a shed foundation marks "+m1+" cm along one string line and "+m2+" cm along the other from the corner peg.",
    "A tile setter marks "+m1+" cm along one wall and "+m2+" cm along the adjoining wall from the corner.",
    "A gardener building a raised bed marks "+m1+" cm along one board and "+m2+" cm along the next board from the corner.",
    "A framer marks "+m1+" cm along the bottom plate and "+m2+" cm along the end plate from the corner of a wall section."]);
  var q=numq(ctx+" The builder uses the 3:4:5 check. What distance, in cm, between the two marks will confirm the corner is square?",
    diag, 0.1,
    "Each part of the 3:4:5 pattern is "+u+" cm, since \\(3 \\times "+u+" = "+m1+"\\) and \\(4 \\times "+u+" = "+m2+"\\). \\[ \\begin{aligned} \\text{mark distance} &= 5 \\times "+u+" = "+diag+" \\end{aligned} \\] The answer is <b>"+diag+" cm</b>.",
    {m1:m1,m2:m2,u:u});
  q.figure=u6CornerSVG(m1,m2,"?",fmt(m1)+" cm",fmt(m2)+" cm");
  return q;
}, ["The 3:4:5 check scales: the distance between the marks is the 5 part of the pattern.", "Start by finding one part: divide either mark by its pattern number, 3 or 4."]);

E("u6-cr-ladder", 6, ["3.59","2.4"], 2, "gen", function(){
  var sc=u6Scaled(), legA=sc[0], legB=sc[1], hyp=sc[2];
  var unit=pick(["ft","m"]);
  var ctxs=[
    ["A ladder "+hyp+" "+unit+" long leans against a house. Its foot is "+legA+" "+unit+" from the wall. How high, in "+unit+", does the ladder reach on the wall", legB, legA],
    ["A guy wire "+hyp+" "+unit+" long runs from the top of a pole to an anchor "+legB+" "+unit+" from the base of the pole. How tall, in "+unit+", is the pole", legA, legB],
    ["A ramp board "+hyp+" "+unit+" long rests with its foot "+legA+" "+unit+" out from a step. How high, in "+unit+", is the step it reaches", legB, legA],
    ["A support strut "+hyp+" "+unit+" long runs from a wall point to a shelf bracket "+legB+" "+unit+" out from the wall. How far, in "+unit+", up the wall is the strut attached", legA, legB]];
  var ctx=pick(ctxs);
  var q=numq(ctx[0]+"?",
    ctx[1], 0.1,
    "The long object is the hypotenuse, so the theorem is rearranged for a leg. \\[ \\begin{aligned} b^2 &= "+hyp+"^2 - "+ctx[2]+"^2 \\\\ &= "+(hyp*hyp)+" - "+(ctx[2]*ctx[2])+" = "+(ctx[1]*ctx[1])+" \\\\ b &= "+ctx[1]+" \\end{aligned} \\] The answer is <b>"+ctx[1]+" "+unit+"</b>.",
    {hyp:hyp,known:ctx[2]});
  q.figure=u6TriSVG(ctx[2],ctx[1],fmt(ctx[2])+" "+unit,"?",fmt(hyp)+" "+unit);
  return q;
}, ["The ladder or wire is the hypotenuse, so subtract the square of the known leg from the square of the hypotenuse.", "Start by squaring the full length and the known distance."]);

E("u6-cr-guywire-form", 6, ["3.59","2.6"], 2, "gen", function(){
  var sc=u6Scaled(), h=sc[0], ground=sc[1], wire=sc[2];
  if(ri(0,1)){ var t=h; h=ground; ground=t; }
  var unit=pick(["m","ft"]);
  var ctx=pick([
    "An antenna mast is held by a wire "+wire+" "+unit+" long, anchored "+ground+" "+unit+" from the base of the mast.",
    "A flagpole is steadied by a cable "+wire+" "+unit+" long, anchored "+ground+" "+unit+" from the base of the pole.",
    "A young tree is supported by a rope "+wire+" "+unit+" long, staked "+ground+" "+unit+" from the trunk."]);
  var q=numq(ctx+" A technician uses the form \\(h = \\sqrt{c^2 - g^2}\\), where \\(c\\) is the wire length and \\(g\\) is the ground distance. What is the height, in "+unit+", where the wire meets the mast, pole or tree?",
    h, 0.1,
    "This form is the theorem rearranged, and it gives the same result as the standard form. \\[ \\begin{aligned} h &= \\sqrt{"+wire+"^2 - "+ground+"^2} \\\\ &= \\sqrt{"+(wire*wire)+" - "+(ground*ground)+"} = \\sqrt{"+(h*h)+"} = "+h+" \\end{aligned} \\] The answer is <b>"+h+" "+unit+"</b>.",
    {wire:wire,ground:ground});
  q.figure=u6TriSVG(ground,h,fmt(ground)+" "+unit,"?",fmt(wire)+" "+unit);
  return q;
}, ["The given form already isolates the height: substitute the wire length and ground distance into it.", "Start by squaring the wire length, then subtract the square of the ground distance."]);

E("u6-leg-solve-mc", 6, ["3.59","2.4"], 3, "gen", function(){
  var hyp=ri(12,42), leg=ri(4,hyp-4);
  var ans=u6R1(Math.sqrt(hyp*hyp-leg*leg));
  var unit=pick(["m","ft","cm"]);
  var ctxs=[
    ["A flagpole cable is "+hyp+" "+unit+" long and reaches a point "+leg+" "+unit+" up the pole. How far from the base of the pole is the cable anchored","the anchor distance"],
    ["A roof rafter measures "+hyp+" "+unit+" and the roof rise is "+leg+" "+unit+". What is the horizontal run of the rafter","the run"],
    ["A diagonal brace in a gate is "+hyp+" "+unit+" long and the gate is "+leg+" "+unit+" high. What is the width of the gate","the width"],
    ["A life line rope "+hyp+" "+unit+" long runs from a dock edge down to an anchor point "+leg+" "+unit+" below the surface line used for measuring. What is the horizontal offset of the anchor","the offset"]];
  var ctx=pick(ctxs);
  var pair=u6NOpts(ans,"Yes: rearrange the theorem, subtract the squares, and take the square root.",
    [[u6R1(Math.sqrt(hyp*hyp+leg*leg)),"That adds the squares, which finds a hypotenuse. The unknown here is a leg, so the squares are subtracted."],
     [hyp-leg,"That subtracts the lengths directly. The theorem subtracts the squares of the lengths."],
     [u6R1(hyp*hyp-leg*leg),"That is the squared value of the leg before the square root step. Take the square root to finish."],
     [u6R1(ans+2.4),"That overshoots the leg length. Recheck the square root of "+(hyp*hyp-leg*leg)+"."]],
    unit,1);
  var q=mcq(ctx[0]+", to the nearest tenth of a "+unit+"?",
    pair[0], pair[1],
    "The given sloped length is the hypotenuse, so the formula needs manipulation. \\[ \\begin{aligned} b^2 &= "+hyp+"^2 - "+leg+"^2 \\\\ &= "+(hyp*hyp)+" - "+(leg*leg)+" = "+(hyp*hyp-leg*leg)+" \\\\ b &= \\sqrt{"+(hyp*hyp-leg*leg)+"} \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {hyp:hyp,leg:leg});
  q.figure=u6TriSVG(ans,leg,"?",fmt(leg)+" "+unit,fmt(hyp)+" "+unit);
  return q;
}, ["When the hypotenuse and one leg are known, the formula must be rearranged before substituting.", "Start by squaring the hypotenuse, since the known leg squared comes off that total."]);

E("u6-create-problem", 6, ["2.1","3.59"], 3, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], c=sc[2];
  var unit=pick(["m","ft","cm"]);
  var frames=[
    ["A ramp has legs of "+a+" "+unit+" and "+b+" "+unit+"; find the length of the sloped surface.",
     "A board has legs of "+a+" "+unit+" and "+b+" "+unit+" meeting at a right angle; find the perimeter path along both legs.",
     "A square tile has side "+a+" "+unit+"; find the area of a triangle covering half the tile with height "+b+" "+unit+".",
     "A rope of "+c+" "+unit+" is one leg of a right triangle with another leg of "+a+" "+unit+"; find the hypotenuse."],
    ["A cable crosses a right triangular sail with legs "+a+" "+unit+" and "+b+" "+unit+"; find the length of the cable across the corner.",
     "A path follows two sides of a right triangular plot, "+a+" "+unit+" then "+b+" "+unit+"; find the total walking distance.",
     "A right triangular sign has base "+a+" "+unit+" and height "+b+" "+unit+"; find the area of the sign.",
     "A ladder of "+c+" "+unit+" is the hypotenuse with a leg of "+b+" "+unit+" known; find the length of the ladder."],
    ["A stringer has a rise of "+b+" "+unit+" and a run of "+a+" "+unit+"; find the length of the sloped stringer.",
     "A frame has two sides of "+a+" "+unit+" and "+b+" "+unit+" joined end to end; find their combined length.",
     "A right triangular garden has legs "+a+" "+unit+" and "+b+" "+unit+"; find the length of edging around all three sides.",
     "A wire of "+c+" "+unit+" forms one leg beside a leg of "+a+" "+unit+"; find the longest side of the triangle."]];
  var fr=pick(frames);
  var correct={t:fr[0], fb:"Yes: its two legs are "+a+" and "+b+", and the sloped length asked for is the hypotenuse, "+c+" "+unit+"."};
  var distractors=[
    {t:fr[1], fb:"That problem uses the legs directly, with addition or perimeter, so its solution is not the given equation."},
    {t:fr[2], fb:"That problem asks for an area, which uses multiplication and halving, not the sum of squares."},
    {t:fr[3], fb:"That problem places "+c+" "+unit+" as a leg or as a given length, so solving it would need a rearranged form, not the given equation."}];
  return mcq("A student is creating a problem whose solution is \\(c^2 = "+a+"^2 + "+b+"^2\\), giving \\(c = "+c+"\\). Which created problem matches that solution?",
    correct, distractors,
    "The equation squares two legs, adds, and the root gives the hypotenuse. \\[ \\begin{aligned} c^2 &= "+a+"^2 + "+b+"^2 = "+(a*a)+" + "+(b*b)+" = "+(c*c)+" \\\\ c &= "+c+" \\end{aligned} \\] Only the problem asking for a sloped length from the two legs matches. The answer is <b>the sloped length problem</b>.",
    {a:a,b:b,c:c});
}, ["Match each created problem to the operation its question really needs.", "Start by reading the given equation: it builds a hypotenuse from two legs."]);

E("u6-equivalent-forms", 6, ["2.6","2.4"], 3, "gen", function(){
  var sc=u6Scaled(), a=sc[0], b=sc[1], c=sc[2];
  var unit=pick(["m","cm","ft"]);
  if(ri(0,1)===0){
    var correct={t:"\\(b^2 = c^2 - a^2\\) and \\(a^2 = c^2 - b^2\\) are both rearrangements of \\(a^2 + b^2 = c^2\\)",
      fb:"Yes: each form moves one leg squared to the other side, which keeps the equation balanced."};
    var distractors=[
      {t:"\\(b^2 = c^2 + a^2\\) and \\(a^2 = c^2 + b^2\\) are both rearrangements of \\(a^2 + b^2 = c^2\\)",
       fb:"Those forms add the hypotenuse square instead of subtracting: moving a term across the equals sign changes its sign."},
      {t:"\\(b = c - a\\) and \\(a = c - b\\) are both rearrangements of \\(a^2 + b^2 = c^2\\)",
       fb:"Those forms drop the squares entirely. Lengths cannot be rearranged that way: squares are part of the relation."},
      {t:"\\(b^2 = a^2 - c^2\\) and \\(a^2 = b^2 - c^2\\) are both rearrangements of \\(a^2 + b^2 = c^2\\)",
       fb:"Those forms subtract the largest square from a smaller one, giving negative values: the hypotenuse square must be the starting total."}];
    return mcq("A right triangle has legs \\(a\\) and \\(b\\) and hypotenuse \\(c\\). Which statement correctly gives forms that are equivalent to \\(a^2 + b^2 = c^2\\)?",
      correct, distractors,
      "Moving \\(a^2\\) across the equals sign gives \\(b^2 = c^2 - a^2\\), and moving \\(b^2\\) gives \\(a^2 = c^2 - b^2\\). Each move keeps the equation balanced, so the forms say the same thing. The answer is <b>the two subtraction forms</b>.",
      {mode:"symbolic"});
  }
  var target=b*b;
  var correct2={t:"\\("+target+"\\), from \\(c^2 - a^2 = "+c+"^2 - "+a+"^2\\)",
    fb:"Yes: "+c+" squared minus "+a+" squared is "+(c*c)+" minus "+(a*a)+", which is "+target+", the square of the other leg."};
  var distractors2=[
    {t:"\\("+(c*c+a*a)+"\\), from \\(c^2 + a^2 = "+c+"^2 + "+a+"^2\\)", fb:"That adds the squares, which is the form for finding a hypotenuse, not for isolating a leg."},
    {t:"\\("+(c-a)*(c-a)+"\\), from \\((c - a)^2 = ("+c+" - "+a+")^2\\)", fb:"Subtracting the lengths and then squaring is a different operation from subtracting the squares."},
    {t:"\\("+(a*a-b*b>0?a*a-b*b:b*b)+"\\), from \\(a^2 - b^2 = "+a+"^2 - "+b+"^2\\)", fb:"That subtracts the two leg squares from each other. The leg form subtracts a leg square from the hypotenuse square."}];
  return mcq("A right triangle has legs of "+a+" "+unit+" and "+b+" "+unit+" and a hypotenuse of "+c+" "+unit+". A student verifies the form \\(b^2 = c^2 - a^2\\). What value should the student get for \\(b^2\\)?",
    correct2, distractors2,
    "\\[ \\begin{aligned} b^2 &= c^2 - a^2 \\\\ &= "+c+"^2 - "+a+"^2 = "+(c*c)+" - "+(a*a)+" = "+target+" \\end{aligned} \\] This matches \\("+b+"^2 = "+target+"\\) from the standard form, which verifies the two forms agree. The answer is <b>"+target+"</b>.",
    {a:a,b:b,c:c,mode:"numeric"});
}, ["Equivalent forms come from moving a squared term across the equals sign and changing its sign.", "Start from the standard form and move one leg squared to the hypotenuse side."]);

E("u6-cr-shortcut-saving", 6, ["2.1","3.59"], 3, "gen", function(){
  var w=ri(9,32), l=ri(9,32);
  var diag=Math.sqrt(w*w+l*l), ans=u6R1(w+l-diag);
  var unit=pick(["m","ft"]);
  var ctx=pick([
    "A rectangular park measures "+l+" "+unit+" by "+w+" "+unit+". A path follows two edges from one corner to the opposite corner, but a straight trail crosses the park diagonally.",
    "A rectangular field measures "+l+" "+unit+" by "+w+" "+unit+". A worker walks two edges from one corner to the opposite corner, or can cut straight across.",
    "A rectangular lot measures "+l+" "+unit+" by "+w+" "+unit+". A cable can run along two edges from one corner to the opposite corner, or straight across the lot."]);
  var q=numq(ctx+" How much distance, in "+unit+", does the straight diagonal route save compared with following the two edges? Give your answer to the nearest tenth.",
    ans, 0.2,
    "First find the diagonal, then compare the two routes. \\[ \\begin{aligned} d &= \\sqrt{"+l+"^2 + "+w+"^2} = \\sqrt{"+(l*l+w*w)+"} \\approx "+fmtF(u6R1(diag),1)+" \\\\ \\text{saving} &= ("+l+" + "+w+") - "+fmtF(u6R1(diag),1)+" \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" "+unit+"</b>.",
    {w:w,l:l});
  q.figure=m12RectDiagSVG(l,w,fmt(l)+" "+unit,fmt(w)+" "+unit,"diagonal");
  return q;
}, ["This is a two step problem: find the diagonal first, then compare it with the route along the edges.", "Start by treating the diagonal as the hypotenuse of the rectangle triangle."]);

E("u6-cr-frame-diff", 6, ["3.58","3.56"], 3, "gen", function(){
  var p=ri(35,85), q=ri(35,85);
  var exact=Math.sqrt(p*p+q*q), rounded=u6R1(exact);
  var delta=pick([-6,-5,-4,4,5,6]);
  var measured=Math.round(exact)+delta;
  var ans=u6R1(Math.abs(measured-rounded));
  var ctx=pick([
    "A rectangular door frame has sides of "+p+" cm and "+q+" cm. A carpenter measures one diagonal as "+measured+" cm while checking whether the frame is a true rectangle.",
    "A rectangular window frame has sides of "+p+" cm and "+q+" cm. A glazier measures one diagonal as "+measured+" cm while checking whether the frame is a true rectangle.",
    "A rectangular picture frame has sides of "+p+" cm and "+q+" cm. A framer measures one diagonal as "+measured+" cm while checking whether the frame is a true rectangle."]);
  var qq=numq(ctx+" By how many centimetres does the measured diagonal differ from the diagonal a true rectangle with these sides would have? Give your answer to the nearest tenth.",
    ans, 0.25,
    "A true rectangle would have the diagonal given by the theorem. \\[ \\begin{aligned} d &= \\sqrt{"+p+"^2 + "+q+"^2} = \\sqrt{"+(p*p+q*q)+"} \\approx "+fmtF(rounded,1)+" \\\\ \\text{difference} &= |"+measured+" - "+fmtF(rounded,1)+"| \\approx "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" cm</b>.",
    {p:p,q:q,measured:measured});
  qq.figure=m12RectDiagSVG(p,q,fmt(p)+" cm",fmt(q)+" cm",fmt(measured)+" cm");
  return qq;
}, ["Work out the diagonal the frame should have, then compare the measurement with it.", "Start by squaring the two frame sides and adding the squares."]);
