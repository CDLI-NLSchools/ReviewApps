// Math 3202 Unit 1 Measurement question bank
// CRMARKS: u1-cr-uncertainty-interval=3
// CRMARKS: u1-cr-tolerance-limits=4
// CRMARKS: u1-cr-mixed-tolerance=5
// CRMARKS: u1-cr-classify-words=4
// CRMARKS: u1-cr-assembly-tolerance=5
/* ===== Unit 1 ===== */
/* Math 3202 Unit 1: Measurement. Helpers prefixed u1. Codes from ind-unit1.json. */
function u1Fmt(x){ return fmt(x,3); }
function u1Opt(v,unit){ return u1Fmt(v)+" "+unit; }

E("u1-precision-why", 1, ["3.1"], 1, "var", varset([
  function(){ return mcq("A pharmacist measures a liquid medicine dose. Why must the dose be measured very precisely, to the nearest 0.1 mL?",
    {t:"A small extra amount or a small shortfall changes the dose the patient actually gets.", fb:"Yes: with medicine, tiny differences in volume change the dose, so fine precision matters."},
    [{t:"So the bottle looks full when it is handed to the patient, which is what matters most.", fb:"Appearance is not the reason: the dose itself must be right."},
     {t:"So the measurement matches a value written in a textbook exactly, every single time.", fb:"Matching a book value is accuracy to a standard, not the reason fine precision is needed here."},
     {t:"So the pharmacist can finish the job more quickly and move on to the next prescription.", fb:"Fine precision usually takes more care, not less time."}],
    "Precision is about how finely a quantity is measured. A dose measured to the nearest 0.1 mL controls the amount closely. The answer is <b>that small differences change the dose the patient gets</b>.", {}); },
  function(){ return mcq("A machinist cuts a metal pin that must slide into a hole in an engine part. Why is high precision required?",
    {t:"The pin and the hole must match within a tiny amount or the pin will not fit and work.", fb:"Yes: mating parts only work when sizes match very closely."},
    [{t:"So the pin has a shiny finish when it is installed, which shows it was made properly in the shop.", fb:"Finish is appearance: fit is the precision issue."},
     {t:"So every pin weighs exactly the same as the others in the batch, to the last gram.", fb:"Equal weight is not what makes the pin fit the hole."},
     {t:"So the machinist can use the oldest tool in the shop for every pin in the run.", fb:"Tool age is not a reason for precision."}],
    "Parts that must fit together need sizes controlled to a very small amount. The answer is <b>that the pin and hole must match closely or the pin will not fit</b>.", {}); },
  function(){ return mcq("In a 100 m sprint final, times are recorded to the nearest 0.01 s. Why is that degree of precision required?",
    {t:"Runners often finish within a few hundredths of a second of each other, so places depend on tiny differences.", fb:"Yes: the gaps between finishers can be smaller than a tenth of a second."},
    [{t:"So spectators can read the clock from far away. A clock that cannot be read from the stands is useless at a race.", fb:"Readability is about display size, not timing precision."},
     {t:"So each runner runs exactly the same distance, measured to the millimetre along the whole track.", fb:"Equal distance is about the track layout, not the timer precision."},
     {t:"So the race can be shown on television, with the finish replayed in slow motion for viewers.", fb:"Broadcasting does not set the timing precision."}],
    "When results are separated by tiny amounts, the measuring must be at least that fine. The answer is <b>that finishing gaps can be only a few hundredths of a second</b>.", {}); },
  function(){ return mcq("A baker scaling ingredients for one loaf can measure flour to the nearest 10 g, but a bakery making a 200 loaf batch uses a much finer scale for the yeast. Why?",
    {t:"A small error in yeast is multiplied across the whole batch, so the yeast amount must be controlled finely.", fb:"Yes: in a large batch, a small measuring error affects every loaf."},
    [{t:"Because yeast costs more per bag than flour. Costly ingredients are the ones that must be measured most carefully.", fb:"Price alone does not set how finely something must be measured."},
     {t:"Because the bakery oven is larger than a home oven, so its batches are bigger in every way.", fb:"Oven size is not the measuring issue."},
     {t:"Because flour has no effect on how bread rises, so only the yeast amount matters at all here.", fb:"Flour matters, but the point is the effect of a yeast error across the batch."}],
    "The needed precision grows when a small error has a large effect. The answer is <b>that a yeast error is multiplied across the whole batch</b>.", {}); },
  function(){ return mcq("A surveyor marking a property corner measures distances to the nearest millimetre. Why is that precision required?",
    {t:"Property lines are legal boundaries, and a small error can place a fence or building on a neighbour's land.", fb:"Yes: boundary errors have legal and building consequences."},
    [{t:"So the survey stakes are easier to carry, which is why surveyors take such care with every measurement they make.", fb:"Carrying stakes has nothing to do with measurement precision."},
     {t:"So the map can be drawn in colour, with each property line shown in a different bright shade.", fb:"Map colour is a display choice, not a precision reason."},
     {t:"So the surveyor visits the site only once a year, which is often enough for legal boundaries.", fb:"Visit frequency does not set the needed precision."}],
    "Legal boundaries must be located very finely because small errors move real structures. The answer is <b>that a small error can put a fence or building on the wrong land</b>.", {}); },
  function(){ return mcq("Why is a carpenter satisfied measuring a rough fence board to the nearest centimetre, but measures a cabinet door to the nearest millimetre?",
    {t:"The door must fit a frame with almost no gap, while a small gap along a fence does not affect its job.", fb:"Yes: the required precision depends on how closely the piece must fit."},
    [{t:"Because cabinet wood is always more expensive. Expensive materials are the ones that demand careful measuring.", fb:"Cost is not the deciding factor: fit is."},
     {t:"Because fences are built outdoors, where careful measuring matters far less than indoors.", fb:"Location alone does not set precision: the fit required does."},
     {t:"Because a tape measure cannot show millimetres, so carpenters estimate them by eye alone.", fb:"A tape measure does show millimetres: the carpenter chooses how finely to read it."}],
    "Required precision depends on the job: tight fits need fine measuring, rough work does not. The answer is <b>that the door must fit its frame closely, while the fence board does not</b>.", {}); }
]), ["Precision is about how finely something is measured.", "Start by asking what goes wrong if the measurement is off by a small amount."]);

E("u1-accuracy-why", 1, ["3.2"], 1, "var", varset([
  function(){ return mcq("A pharmacy scale is checked against a known 100 g test mass. Why does this check for accuracy matter?",
    {t:"Doses are weighed on the scale, so its readings must be close to the true mass or patients get the wrong amount.", fb:"Yes: accuracy means closeness to the true value, and doses depend on it."},
    [{t:"So the scale displays many decimal places, since more digits on the display always means a better scale.", fb:"Decimal places show precision: the check is about closeness to the true mass."},
     {t:"So the scale matches the colour of the counter, which is what makes its readings trustworthy in the pharmacy at all times.", fb:"Appearance has nothing to do with accuracy."},
     {t:"So the scale can weigh heavier items, including loads far beyond anything the pharmacy handles.", fb:"Capacity is different from accuracy."}],
    "Accuracy is closeness to the true value. Checking against a known mass shows whether readings can be trusted. The answer is <b>that readings must be close to the true mass or doses will be wrong</b>.", {}); },
  function(){ return mcq("A speedometer in a work truck is tested and found to read 5 km/h high. Why does this accuracy problem matter?",
    {t:"The driver judges speed from the reading, so the truck may travel faster than the driver believes.", fb:"Yes: an inaccurate reading leads to wrong decisions about speed."},
    [{t:"The truck will use less fuel on every trip, no matter what speed it is actually travelling at.", fb:"A faulty reading does not change fuel use in that way."},
     {t:"The odometer will stop recording distance, so the truck's mileage records will fall behind the truth.", fb:"A speed reading error does not stop the odometer."},
     {t:"The driver will arrive earlier at every site, since the truck covers the route faster than planned.", fb:"Arriving early is not the safety issue created by a high reading."}],
    "An instrument that reads high or low compared with the true value is inaccurate, and users act on its readings. The answer is <b>that the truck may travel faster than the driver believes</b>.", {}); },
  function(){ return mcq("Greenhouse staff compare their thermometer with a laboratory thermometer. Why do they need the greenhouse thermometer to be accurate?",
    {t:"Plants are heated or cooled based on the reading, so it must be close to the true temperature to protect the crop.", fb:"Yes: heating and cooling decisions follow the reading."},
    [{t:"So the thermometer agrees with the weather forecast, which is the standard its readings are judged against at all times.", fb:"A forecast is a prediction, not the true temperature in the greenhouse."},
     {t:"So readings taken minutes apart are identical, because a good thermometer never changes its reading.", fb:"Identical repeated readings describe precision, not accuracy."},
     {t:"So the thermometer can be read from outside the greenhouse without opening the door and letting heat escape.", fb:"Readability is not accuracy."}],
    "Accuracy matters when actions are based on how close a reading is to the true value. The answer is <b>that heating and cooling decisions must follow the true temperature</b>.", {}); },
  function(){ return mcq("A butcher's scale must be accurate when weighing meat sold by the kilogram. Why?",
    {t:"Customers pay for the mass shown, so the reading must be close to the true mass for the price to be fair.", fb:"Yes: the price is calculated from the reading."},
    [{t:"So the scale settles quickly between customers, and that speed is what makes its prices fair.", fb:"Speed is convenient, but fairness depends on closeness to true mass."},
     {t:"So the meat stays cold in the display case, and keeping it cold depends entirely on the accuracy of the scale.", fb:"Refrigeration is separate from scale accuracy."},
     {t:"So the scale prints a longer receipt, listing every item weighed in the shop that day in full detail.", fb:"Receipt length has nothing to do with accuracy."}],
    "When money is charged by the measured amount, the measurement must be close to the true amount. The answer is <b>that customers pay for the mass shown, so it must match the true mass</b>.", {}); },
  function(){ return mcq("Why must a surveyor's distance instrument be accurate, not just precise, when locating a well on a property?",
    {t:"Repeated readings can agree with each other yet all be shifted from the true position of the well.", fb:"Yes: agreement among readings is precision; the position must match the true location."},
    [{t:"Because the well is underground and cannot be seen, its position can never be verified.", fb:"Visibility is a practical issue, not the accuracy reason."},
     {t:"Because the instrument battery lasts longer when the readings agree with each other.", fb:"Battery life is unrelated to accuracy."},
     {t:"Because the property has trees on it, and trees always shift survey readings away from the true position.", fb:"Trees may block a view, but accuracy is about closeness to the true position."}],
    "Accuracy is closeness to the true value. Readings that agree with each other can still all be off. The answer is <b>that readings can agree yet all be shifted from the true position</b>.", {}); },
  function(){ return mcq("A nurse checks a thermometer that reads 36.4 degrees Celsius for a patient whose true temperature is 37.0 degrees Celsius. Why is this accuracy gap a concern?",
    {t:"Care decisions use the reading, and a reading well below the true temperature can hide a fever.", fb:"Yes: the gap between reading and true value can change care."},
    [{t:"The thermometer shows only one decimal place, which limits how accurate it can be.", fb:"One decimal place is the precision: the concern is the size of the error."},
     {t:"The thermometer is digital rather than glass, and digital displays are always accurate.", fb:"The type of thermometer is not the concern: the error is."},
     {t:"The patient was measured in the morning, when fevers are always at their lowest point of the day.", fb:"Time of day does not explain a reading 0.6 degrees below the true value."}],
    "The reading differs from the true value by 0.6 degrees, which is an accuracy problem with real consequences. The answer is <b>that a low reading can hide a fever and change care decisions</b>.", {}); }
]), ["Accuracy is about closeness to the true value.", "Start by comparing the reading with the true value, not with other readings."]);

E("u1-precision-vs-accuracy", 1, ["3.3"], 1, "var", varset([
  function(){ return mcq("Which statement correctly separates precision and accuracy?",
    {t:"Precision is how close repeated readings are to each other; accuracy is how close a reading is to the true value.", fb:"Yes: precision compares readings with each other, accuracy compares a reading with the truth."},
    [{t:"Precision is how close a reading is to the true value; accuracy is how close readings are to each other.", fb:"That swaps the two terms."},
     {t:"Precision and accuracy both mean the reading equals the true value, exactly, on every reading, with no other idea involved.", fb:"They are different ideas: one is about agreement, the other about truth."},
     {t:"Precision is about cost; accuracy is about how fast a reading is taken with the instrument in hand.", fb:"Neither term is about cost or speed."}],
    "Precision: readings agree with each other. Accuracy: a reading is close to the true value. The answer is <b>precision compares readings with each other, accuracy compares a reading with the true value</b>.", {}); },
  function(){ return mcq("A darts player throws four darts that land tightly together in the outer ring, far from the bullseye. How is this described?",
    {t:"Precise but not accurate: the throws agree with each other but miss the target value.", fb:"Yes: tight grouping shows precision, distance from the centre shows poor accuracy."},
    [{t:"Accurate but not precise: the throws are near the target but spread out widely.", fb:"The throws are not near the centre and are not spread out."},
     {t:"Accurate and precise: the throws agree with each other and hit the target value squarely.", fb:"The throws miss the bullseye, so they are not accurate."},
     {t:"Neither: the throws are spread out and far from the target value at all.", fb:"The throws are tightly grouped, so precision is present."}],
    "Tight grouping means precise. Landing far from the bullseye means not accurate. The answer is <b>precise but not accurate</b>.", {}); },
  function(){ return mcq("A scale gives readings of 49.8 g, 50.3 g, 49.9 g and 50.1 g for a part whose true mass is 50.0 g. How is this described?",
    {t:"Accurate and fairly precise: the readings cluster near each other and near the true mass.", fb:"Yes: the readings are close together and centred on 50.0 g."},
    [{t:"Precise but not accurate: the readings cluster far from the true mass, tightly grouped.", fb:"The readings cluster around the true mass, not far from it."},
     {t:"Accurate only on average but not precise at all, since the readings scatter widely.", fb:"The readings differ by only a few tenths of a gram, so they are fairly precise."},
     {t:"Neither precise nor accurate: the readings scatter and miss the true mass entirely.", fb:"The readings are close to each other and to the true mass."}],
    "The readings span only 0.5 g and sit around the true 50.0 g. The answer is <b>accurate and fairly precise</b>.", {}); },
  function(){ return mcq("Which change improves accuracy rather than precision?",
    {t:"Recalibrating a scale that always reads 2 g too high.", fb:"Yes: removing a constant offset moves readings toward the true value."},
    [{t:"Taking the same reading five times and averaging the spread.", fb:"Averaging repeated readings deals with spread, which is precision."},
     {t:"Buying a scale that displays one more decimal place.", fb:"More decimal places give finer precision, not closeness to truth."},
     {t:"Weighing items in a quieter room with no one else around.", fb:"A quieter room does not fix a constant offset from the true value."}],
    "A scale that always reads 2 g high has an accuracy problem, fixed by recalibration. The answer is <b>recalibrating the scale that reads 2 g too high</b>.", {}); },
  function(){ return mcq("A stopwatch always starts 0.3 s late because of a setting error, but gives nearly identical times on repeated runs. The times are:",
    {t:"Precise but not accurate, because they agree with each other yet are all shifted from the true times.", fb:"Yes: agreement is precision; the constant shift is inaccuracy."},
    [{t:"Accurate but not precise, because they are shifted yet agree with each other closely on every single reading taken.", fb:"Agreement among readings is precision, so the labels are reversed."},
     {t:"Accurate and precise, because the watch is consistent from one reading to the next.", fb:"Consistency alone does not make shifted times accurate."},
     {t:"Neither, because a setting error cancels out and leaves the watch with no pattern at all.", fb:"A constant setting error shifts every reading: it does not cancel."}],
    "Repeated times agree (precise) but are all 0.3 s off (not accurate). The answer is <b>precise but not accurate</b>.", {}); },
  function(){ return mcq("Which example shows accuracy without much precision?",
    {t:"Estimates of a fish's mass: 2.1 kg, 3.4 kg, 1.8 kg and 2.7 kg, centred on the true mass of 2.5 kg.", fb:"Yes: the values spread widely but centre on the true mass."},
    [{t:"Readings of 4.9 kg, 5.0 kg and 5.1 kg, tightly grouped together in a cluster, for a true mass of 8.0 kg.", fb:"Those readings are tight but far from the truth: precise, not accurate."},
     {t:"Readings of 8.0 kg, 8.1 kg and 7.9 kg, tightly grouped together, for a true mass of 8.0 kg.", fb:"Those readings are both tight and near the truth."},
     {t:"Readings of 1.0 kg, 4.0 kg and 9.0 kg, spread widely with no grouping, for a true mass of 2.5 kg.", fb:"Those readings spread widely and do not centre on the true mass."}],
    "Accuracy without precision means values centre on the truth but spread out. The answer is <b>the fish estimates centred on 2.5 kg</b>.", {}); }
]), ["Ask two questions: do the readings agree, and are they near the true value?", "Start by checking agreement among readings, then compare with the true value."]);

E("u1-uncertainty-state", 1, ["3.7"], 2, "gen", function(){
  var modes=[
    {ctx:"A ruler measures a ribbon length as {R} cm. The smallest mark on the ruler is {S} cm.", unit:"cm"},
    {ctx:"A kitchen scale measures flour as {R} g. The scale counts in steps of {S} g.", unit:"g"},
    {ctx:"A thermometer reads {R} degrees Celsius. Its scale marks every {S} degrees.", unit:"degrees"},
    {ctx:"A measuring jug reads {R} mL. The smallest mark on the jug is {S} mL.", unit:"mL"},
    {ctx:"A tape measures a board as {R} mm. The smallest mark on the tape is {S} mm.", unit:"mm"}
  ];
  var m=pick(modes);
  var S=pick([0.1,0.2,0.5,1,2,5]);
  var base=pick([12,18,24,36,48,60,75,90,120,150]);
  var R=Math.round((base+ri(0,9)*S)*100)/100;
  var half=S/2;
  var prompt=m.ctx.replace("{R}",u1Fmt(R)).replace("{S}",u1Fmt(S))+" What is the uncertainty of this measurement?";
  var fbMap={};
  fbMap[u1Fmt(half)]="Yes: uncertainty is half of the smallest unit, and half of "+u1Fmt(S)+" is "+u1Fmt(half)+".";
  fbMap[u1Fmt(S)]="That uses the full smallest unit. Uncertainty is half of it.";
  fbMap[u1Fmt(2*S)]="That doubles the smallest unit. Uncertainty is half of it.";
  fbMap[u1Fmt(S/4)]="That is a quarter of the smallest unit. Uncertainty is half of it.";
  var vals=[S,2*S,S/4];
  var uD=Math.max(u1Fmt(half).split(".")[1]?.length||0, u1Fmt(S).split(".")[1]?.length||0, u1Fmt(2*S).split(".")[1]?.length||0, u1Fmt(S/4).split(".")[1]?.length||0);
  var opts=vals.map(function(v){return {t:"\\(\\pm "+fmtF(v,uD)+"\\) "+m.unit, fb:fbMap[u1Fmt(v)]};});
  return mcq(prompt, {t:"\\(\\pm "+fmtF(half,uD)+"\\) "+m.unit, fb:fbMap[u1Fmt(half)]}, opts,
    "Uncertainty is plus or minus half of the smallest unit shown. \\[ \\frac{"+u1Fmt(S)+"}{2} = "+u1Fmt(half)+" \\] The answer is <b>plus or minus "+u1Fmt(half)+" "+m.unit+"</b>.",
    {S:S,R:R});
}, ["Uncertainty is tied to the smallest unit the instrument can show.", "Start by taking half of the smallest unit."]);

E("u1-tolerance-maxmin", 1, ["3.8"], 2, "gen", function(){
  var items=[
    {name:"A metal shaft", unit:"mm", noms:[20,25,32,40,50], tols:[0.1,0.2,0.3,0.5]},
    {name:"A cut board length", unit:"cm", noms:[60,80,90,120,150], tols:[0.2,0.5,1]},
    {name:"A poured concrete slab thickness", unit:"mm", noms:[90,100,110,120], tols:[3,5,8]},
    {name:"A rope length", unit:"m", noms:[10,15,20,30], tols:[0.05,0.1,0.2]}
  ];
  var it=pick(items); var N=pick(it.noms); var T=pick(it.tols);
  var askMax=Math.random()<0.5;
  var ans=askMax?N+T:N-T;
  var other=askMax?N-T:N+T;
  var prompt=it.name+" is made to "+u1Fmt(N)+" "+it.unit+" with a tolerance of \\(\\pm "+u1Fmt(T)+"\\) "+it.unit+". What is the "+(askMax?"maximum":"minimum")+" acceptable value, in "+it.unit+"?";
  function O(v,fb){ return {t:u1Fmt(v), fb:fb}; }
  var opts=[
    O(other, "That is the "+(askMax?"minimum":"maximum")+", the opposite end of the range."),
    O(N, "That is the nominal value before the tolerance is applied."),
    O(askMax?N+2*T:N-2*T, "That applies the tolerance twice.")
  ];
  var _bo0=balOpts(O(ans, "Yes: "+(askMax?"add":"subtract")+" the tolerance "+(askMax?"to":"from")+" the nominal value."), opts); return mcq(prompt, _bo0[0], _bo0[1],
    "\\[ \\begin{aligned} \\text{"+(askMax?"Maximum":"Minimum")+"} &= "+u1Fmt(N)+" "+(askMax?"+":"-")+" "+u1Fmt(T)+" \\\\ &= "+u1Fmt(ans)+" \\end{aligned} \\] The answer is <b>"+u1Opt(ans,it.unit)+"</b>.",
    {N:N,T:T,askMax:askMax?1:0});
}, ["Tolerance gives how far above or below the nominal value is allowed.", "Start from the nominal value and move by the tolerance in the direction asked."]);

E("u1-percent-tolerance", 1, ["3.8","3.9"], 2, "gen", function(){
  var items=[
    {name:"A bag of fertilizer", unit:"kg", noms:[10,20,25,40,50]},
    {name:"A tank of heating oil", unit:"L", noms:[200,400,500,800,1000]},
    {name:"A dose of animal feed supplement", unit:"g", noms:[100,200,250,400,500]},
    {name:"A spool of wire", unit:"m", noms:[50,100,150,200,300]}
  ];
  var it=pick(items); var N=pick(it.noms); var p=pick([1,2,2.5,4,5]);
  var tol=N*p/100;
  var askMax=Math.random()<0.5;
  var ans=askMax?N+tol:N-tol;
  var other=askMax?N-tol:N+tol;
  var prompt=it.name+" has a nominal amount of "+u1Fmt(N)+" "+it.unit+" with a tolerance of "+u1Fmt(p)+"%. What is the "+(askMax?"maximum":"minimum")+" acceptable amount, in "+it.unit+"?";
  function O(v,fb){ return {t:u1Fmt(v), fb:fb}; }
  var opts=[
    O(other, "That is the opposite end of the tolerance range."),
    O(askMax?N+tol/2:N-tol/2, "That uses only half of the percent tolerance amount, "+u1Fmt(tol/2)+" instead of "+u1Fmt(tol)+"."),
    O(askMax?N+2*tol:N-2*tol, "That applies the percent tolerance twice.")
  ];
  var _bo0=balOpts(O(ans, "Yes: "+u1Fmt(p)+"% of "+u1Fmt(N)+" is "+u1Fmt(tol)+", and the "+(askMax?"maximum adds":"minimum subtracts")+" it."), opts); return mcq(prompt, _bo0[0], _bo0[1],
    "\\[ \\begin{aligned} \\text{Tolerance} &= "+u1Fmt(p)+"\\% \\text{ of } "+u1Fmt(N)+" = "+u1Fmt(tol)+" \\\\ \\text{"+(askMax?"Maximum":"Minimum")+"} &= "+u1Fmt(N)+" "+(askMax?"+":"-")+" "+u1Fmt(tol)+" = "+u1Fmt(ans)+" \\end{aligned} \\] The answer is <b>"+u1Opt(ans,it.unit)+"</b>.",
    {N:N,p:p,askMax:askMax?1:0});
}, ["A percent tolerance must be turned into an amount first.", "Start by finding the percent of the nominal amount."]);

E("u1-compare-instruments", 1, ["3.5"], 2, "gen", function(){
  var scenes=[
    {attr:"mass of a parcel", unit:"kg", pair:["kitchen scale","postal scale"], base:[2,3,4,5,6,8,10]},
    {attr:"length of a room", unit:"m", pair:["tape measure","laser measure"], base:[3,4,5,6,7,8]},
    {attr:"temperature of a fridge", unit:"degrees Celsius", pair:["dial thermometer","digital thermometer"], base:[2,3,4,5,6]},
    {attr:"mass of a bag of potatoes", unit:"kg", pair:["bathroom scale","farm scale"], base:[10,15,20,25,30]},
    {attr:"length of a driveway", unit:"m", pair:["measuring wheel","long tape"], base:[12,15,18,20,24,30]}
  ];
  var sc=pick(scenes); var T=pick(sc.base);
  var eA=pick([0.1,0.2,0.3,0.5,0.8,1]); var eB=pick([0.1,0.2,0.3,0.5,0.8,1,1.5,2]);
  var guard=0; while(eB===eA&&guard++<50){ eB=pick([0.1,0.2,0.3,0.5,0.8,1,1.5,2]); }
  if(eB===eA)eB=eA+0.4;
  var sA=Math.random()<0.5?1:-1, sB=Math.random()<0.5?1:-1;
  var rA=Math.round((T+sA*eA)*100)/100, rB=Math.round((T+sB*eB)*100)/100;
  var aBetter=eA<eB;
  var nameA=sc.pair[0], nameB=sc.pair[1];
  var prompt="The true "+sc.attr+" is "+u1Fmt(T)+" "+sc.unit+". The "+nameA+" reads "+u1Fmt(rA)+" "+sc.unit+" and the "+nameB+" reads "+u1Fmt(rB)+" "+sc.unit+". Which instrument is more accurate?";
  var correct={t:"The "+(aBetter?nameA:nameB), fb:"Yes: its reading is off by only "+u1Fmt(Math.min(eA,eB))+" "+sc.unit+", the smaller error."};
  var opts=[
    {t:"The "+(aBetter?nameB:nameA), fb:"Its reading is off by "+u1Fmt(Math.max(eA,eB))+" "+sc.unit+", which is the larger error."},
    {t:"They are equally accurate", fb:"The errors differ: "+u1Fmt(eA)+" "+sc.unit+" versus "+u1Fmt(eB)+" "+sc.unit+"."},
    {t:"Accuracy cannot be compared here", fb:"It can: a true value is given, so each error can be found."}
  ];
  return mcq(prompt, correct, opts,
    "\\[ \\begin{aligned} \\text{Error, "+nameA+"} &= |"+u1Fmt(rA)+" - "+u1Fmt(T)+"| = "+u1Fmt(eA)+" \\\\ \\text{Error, "+nameB+"} &= |"+u1Fmt(rB)+" - "+u1Fmt(T)+"| = "+u1Fmt(eB)+" \\end{aligned} \\] The smaller error is more accurate. The answer is <b>the "+(aBetter?nameA:nameB)+"</b>.",
    {T:T,rA:rA,rB:rB});
}, ["Accuracy is judged by the size of the error from the true value.", "Start by finding how far each reading is from the true value."]);

E("u1-data-classify", 1, ["3.3","3.4"], 2, "gen", function(){
  var unit=pick(["g","mL","cm","mm"]);
  var T=pick([20,25,40,50,60,80,100]);
  var patterns=[
    {key:"pa", label:"Precise but not accurate",
     gen:function(){ var b=pick([1.5,2,2.5,3])*(Math.random()<0.5?1:-1); return [b,b+0.1,b-0.1,b+0.2].map(function(x){return Math.round((T+x)*10)/10;}); }},
    {key:"both", label:"Precise and accurate",
     gen:function(){ return [0.1,-0.1,0.2,0].map(function(x){return Math.round((T+x)*10)/10;}); }},
    {key:"avg", label:"Accurate on average but not precise",
     gen:function(){ var a=pick([1.2,1.5,1.8,2.2]); return [-a,-a/3,a/3,a].map(function(x){return Math.round((T+x)*10)/10;}); }},
    {key:"neither", label:"Neither precise nor accurate",
     gen:function(){ var b=pick([2,2.5,3]); return [b,b+1.4,b-0.8,b+2.1].map(function(x){return Math.round((T+x)*10)/10;}); }}
  ];
  var pat=pick(patterns); var vals=pat.gen();
  var list=vals.map(function(v){return u1Fmt(v);}).join(", ");
  var fbByLabel={
    "Precise but not accurate":"That needs a tight cluster centred away from the true value. Compare the readings here with that pattern.",
    "Precise and accurate":"That needs a tight cluster centred on the true value. Compare the readings here with that pattern.",
    "Accurate on average but not precise":"That needs a wide spread centred on the true value. Compare the readings here with that pattern.",
    "Neither precise nor accurate":"That needs a wide spread centred away from the true value. Compare the readings here with that pattern."
  };
  var labels=["Precise but not accurate","Precise and accurate","Accurate on average but not precise","Neither precise nor accurate"];
  var opts=labels.filter(function(l){return l!==pat.label;}).map(function(l){return {t:l, fb:fbByLabel[l]};});
  var mean=Math.round(vals.reduce(function(a,b){return a+b;},0)/vals.length*10)/10;
  return mcq("Four repeated measurements of a quantity whose true value is "+u1Fmt(T)+" "+unit+" are: "+list+" "+unit+". Which description fits best?",
    {t:pat.label, fb:"Yes: check the spread of the readings and where they centre, compared with "+u1Fmt(T)+"."}, opts,
    "The readings span "+u1Fmt(Math.max.apply(null,vals)-Math.min.apply(null,vals))+" "+unit+" and centre near "+u1Fmt(mean)+" "+unit+", while the true value is "+u1Fmt(T)+" "+unit+". Spread judges precision and centre judges accuracy. The answer is <b>"+pat.label.toLowerCase()+"</b>.",
    {T:T,pat:pat.key});
}, ["Judge precision from the spread and accuracy from the centre compared with the true value.", "Start by finding the spread of the four readings."]);

E("u1-limitations-trade", 1, ["3.6"], 2, "var", varset([
  function(){ return mcq("Which is a real limitation of a steel tape measure used by carpenters on an outdoor site in winter?",
    {t:"The tape can sag between supports and its markings are hard to read at a distance in low light.", fb:"Yes: sag and readability limit how well a long tape measurement can be made."},
    [{t:"The tape melts when sunlight hits it, so it can only ever be used indoors or on cloudy days.", fb:"Steel tape does not melt in sunlight."},
     {t:"The tape measures mass instead of length, so it gives a weight instead of a distance.", fb:"A tape measures length: that is its purpose."},
     {t:"The tape cannot be longer than one metre, so long boards always need several separate measurements.", fb:"Site tapes are commonly 5 m, 8 m or longer."}],
    "Every instrument has conditions where it works poorly: a long tape sags and is hard to read in poor light. The answer is <b>sag and poor readability at a distance</b>.", {}); },
  function(){ return mcq("A pharmacist uses a digital scale that reads to the nearest 0.1 g to weigh a 0.05 g amount of a powder. What is the limitation here?",
    {t:"The smallest amount the scale can show is larger than the amount being weighed, so the amount cannot be measured reliably.", fb:"Yes: an instrument cannot measure well below its smallest division."},
    [{t:"Digital scales always add 1 g to every reading, no matter what is placed on the scale or how small the amount is.", fb:"Digital scales do not add a fixed gram."},
     {t:"The powder changes mass when it is poured, so the reading after pouring never matches the amount that was in the container.", fb:"Pouring does not change the mass of the powder itself."},
     {t:"The scale needs a colour display to work, and on a plain display the numbers it shows cannot be trusted at all.", fb:"Display colour does not affect weighing."}],
    "An instrument is limited by its smallest division: 0.1 g steps cannot resolve a 0.05 g amount. The answer is <b>the scale cannot resolve an amount smaller than its smallest step</b>.", {}); },
  function(){ return mcq("Why is a measuring wheel limited when a surveyor's assistant measures a rough, muddy field?",
    {t:"The wheel bounces and slips on rough ground, so the distance it rolls does not match the true distance travelled.", fb:"Yes: wheels depend on steady contact with the ground."},
    [{t:"The wheel only works on sunny days, because its counter stops whenever the sky is overcast or raining.", fb:"Weather light does not stop a wheel from rolling."},
     {t:"The wheel measures in litres, because it was designed to total up liquid volumes rather than ground distances.", fb:"A measuring wheel measures distance, not volume."},
     {t:"The wheel cannot be pushed by hand at all, so it only rolls when towed behind a vehicle, and hand surveys are impossible with it.", fb:"Measuring wheels are designed to be pushed by hand."}],
    "A measuring wheel assumes smooth rolling contact, which rough muddy ground breaks. The answer is <b>the wheel bounces and slips, so its rolled distance is unreliable</b>.", {}); },
  function(){ return mcq("A baker relies on the dial thermometer built into an oven. What limitation should the baker keep in mind?",
    {t:"The dial shows the temperature at its sensor only, and ovens have hotter and cooler spots, so one reading may not describe the whole oven.", fb:"Yes: a single sensor cannot capture variation across the oven."},
    [{t:"Oven thermometers measure humidity instead. They report how damp the air inside the oven is, not how hot the oven has become during cooking.", fb:"A thermometer measures temperature."},
     {t:"The dial spins faster as the oven heats, and the faster it spins the higher the temperature it reports, whatever the true heat is.", fb:"The dial moves to a reading: spinning is not the limitation."},
     {t:"The thermometer stops working above 100 degrees, and above that point the dial freezes, so a hotter oven shows the same reading as a cooler one.", fb:"Oven thermometers are built for oven temperatures well above 100 degrees."}],
    "One sensor gives one location's temperature, while the oven varies from spot to spot. The answer is <b>the single sensor may not describe the whole oven</b>.", {}); },
  function(){ return mcq("In a machine shop, a vernier caliper is used on a part that is still hot from cutting. What limitation affects the measurement?",
    {t:"Heat expands the part, so its measured size is larger than its size once cooled to working temperature.", fb:"Yes: temperature changes the size of metal parts."},
    [{t:"The caliper jaws melt on contact with the part. The heat from the part softens them during use.", fb:"Caliper jaws do not melt on a freshly cut part."},
     {t:"The part becomes magnetic and pulls the jaws toward itself, bending the reading by a fixed amount.", fb:"Cutting heat does not create that magnetic effect."},
     {t:"The caliper reads in inches only, so its markings cannot show the millimetre sizes the shop works in each day.", fb:"Calipers are made in metric and imperial versions."}],
    "Instruments and parts respond to conditions: hot metal is expanded metal. The answer is <b>heat expansion makes the hot size differ from the cooled size</b>.", {}); },
  function(){ return mcq("A fish plant worker checks cases with a platform scale placed near a vibrating freezer unit. What is the main limitation in this setup?",
    {t:"Vibration makes the reading bounce, so a stable, trustworthy reading is hard to get.", fb:"Yes: scales need a steady surface to settle on a value."},
    [{t:"Cold air makes mass disappear from the cases while they sit in the freezer overnight.", fb:"Cold does not remove mass from sealed cases."},
     {t:"The scale will report volume in litres instead of mass whenever the cases are weighed.", fb:"A platform scale reports mass."},
     {t:"Freezers erase digital displays permanently, so the readings vanish in storage.", fb:"A display may frost over, but vibration is the measuring limitation here."}],
    "A scale must settle to give a reading; constant vibration prevents settling. The answer is <b>vibration keeps the reading from settling</b>.", {}); }
]), ["Think about the conditions where the instrument is actually used.", "Start by asking what in that workplace can disturb the measurement."]);

E("u1-context-analyse", 1, ["3.4","3.1","3.2"], 2, "var", varset([
  function(){ return mcq("A clinic scale reads 72.4 kg, 72.5 kg and 72.4 kg for the same patient on the same morning. A second scale in the building reads 75.1 kg for a test mass marked 75.0 kg. Which analysis is correct?",
    {t:"The clinic scale is precise (readings agree closely), and the second scale is accurate to within 0.1 kg on the test mass.", fb:"Yes: agreement shows precision, and 75.1 against a true 75.0 is an error of only 0.1."},
    [{t:"The clinic scale is accurate because its readings agree with each other. Agreement among readings is the whole test of accuracy.", fb:"Agreement among readings shows precision, not accuracy: no true value was given for the patient."},
     {t:"The second scale is inaccurate by 75.1 kg, an enormous error that makes every reading on it worthless in practice.", fb:"Its error is the difference, 0.1 kg, not the whole reading."},
     {t:"Both scales are precise and accurate in every way, and neither scale needs any checking or adjustment at all.", fb:"The patient's true mass is unknown, so the clinic scale's accuracy cannot be judged."}],
    "Readings of 72.4, 72.5, 72.4 agree closely: precision. A reading of 75.1 for a true 75.0 has error 0.1 kg: accurate. The answer is <b>the first scale is precise, the second is accurate within 0.1 kg</b>.", {}); },
  function(){ return mcq("A roofer measures a roof section four times: 8.02 m, 8.04 m, 8.01 m and 8.03 m. Materials are ordered using 8.0 m. Which statement best analyses the measurements?",
    {t:"The measurements are precise to about 0.03 m, and ordering to 8.0 m is reasonable because the values centre there.", fb:"Yes: the spread is only 0.03 m and the centre is about 8.03 m."},
    [{t:"The measurements are useless because they are not all identical, so the roofer should measure again.", fb:"Small variation is normal: a spread of 0.03 m is tight for roofing."},
     {t:"The roofer should order using 8.04 m plus an extra metre for safety of the math, just to be safe on the order.", fb:"Adding an arbitrary metre is not analysis of the measurements given."},
     {t:"The measurements prove the true length is exactly 8.025 m, to the last fraction of a millimetre, with no uncertainty at all.", fb:"Measurements estimate a true value: they do not prove it exactly."}],
    "Spread is 8.04 minus 8.01, which is 0.03 m, and the values centre near 8.0 m. The answer is <b>the measurements are precise and support ordering to 8.0 m</b>.", {}); },
  function(){ return mcq("A delivery company finds its fuel pump meter reads 51.0 L when it actually delivers 50.0 L, and it does this the same way every time. Which analysis is correct?",
    {t:"The meter is consistent but inaccurate: every delivery is short by the same pattern, so calibration is needed.", fb:"Yes: a repeatable error is an accuracy problem fixed by calibration."},
    [{t:"The meter is precise, so no action is needed, since precise meters are always accurate as well.", fb:"Consistency alone does not protect customers from a repeated short delivery."},
     {t:"The meter error is random, so each customer is treated fairly over time and no fix is needed.", fb:"The error is the same every time, not random."},
     {t:"The company should charge for 51.0 L since that is the reading, and meter readings are never to be questioned at all.", fb:"Charging on a known wrong reading is not a fair fix."}],
    "A reading of 51.0 for a true 50.0, repeated every time, is a systematic accuracy error. The answer is <b>the meter is consistent but inaccurate and needs calibration</b>.", {}); },
  function(){ return mcq("Two junior carpenters measure the same window opening. Ana gets 912 mm, 913 mm, 912 mm. Ben gets 905 mm, 918 mm, 911 mm. The true width is 912 mm. Which analysis is best?",
    {t:"Ana is both more precise and more accurate: her readings are tighter and centred on the true width.", fb:"Yes: Ana's spread is 1 mm around the true value; Ben's spread is 13 mm."},
    [{t:"Ben is more precise because his readings cover a wider range, which shows tighter grouping.", fb:"A wider range means less precision, not more."},
     {t:"Both are equally accurate because both recorded a value near 912 mm at least once.", fb:"Ben's other readings are far off; accuracy is judged across the readings."},
     {t:"Neither can be judged without a third carpenter, whose readings would settle which of the two is better overall.", fb:"A true value is given, so both precision and accuracy can be judged."}],
    "Ana: spread 1 mm, centred on 912 mm. Ben: spread 13 mm. The answer is <b>Ana is more precise and more accurate</b>.", {}); },
  function(){ return mcq("A home energy auditor measures a wall as 6.4 m with a tape whose smallest mark is 1 cm, then reports the wall as 6.400 m in the report. What is the problem with the report?",
    {t:"The report claims a precision the tape cannot give: the tape supports 6.40 m at best, not thousandths of a metre.", fb:"Yes: reported digits cannot be finer than the instrument allows."},
    [{t:"The wall should have been measured in kilograms. Mass is the quantity that a report like this one should record in the report.", fb:"Wall length is measured in metres: the issue is the extra digits."},
     {t:"The tape should have been read only once, since repeated readings only add confusion to a measurement.", fb:"Reading once does not fix digits the instrument cannot support."},
     {t:"The report should round the wall to 6 m exactly, dropping all the decimal places the tape showed.", fb:"Rounding to 6 m throws away precision the tape does have (centimetres)."}],
    "A tape marked in centimetres gives hundredths of a metre, so 6.40 m is the honest report. The answer is <b>the report claims finer precision than the tape can give</b>.", {}); },
  function(){ return mcq("A snow-clearing company bids a contract using driveway areas measured to the nearest square metre, while a tile installer measures a bathroom floor to the nearest square centimetre. Which analysis fits?",
    {t:"Both precisions fit their contexts: small area errors barely change snow-clearing time, but tile must fit edges closely.", fb:"Yes: required precision depends on the consequences of a small error."},
    [{t:"The tile installer is wasting time, since square metres work for driveways. Fine units are never needed for fitting work.", fb:"Different jobs need different precision: tile fit depends on small amounts."},
     {t:"The snow company is careless, since all area work needs the finest units, square centimetres, every time.", fb:"Finer precision than the job needs adds cost without benefit."},
     {t:"Area measurements are never about precision, so the choice of area unit never matters for any job at all.", fb:"Area comes from measured lengths, so precision applies."}],
    "Precision requirements follow the job: fit-critical work needs fine measures, rough work does not. The answer is <b>each precision fits its context</b>.", {}); }
]), ["Analyse both ideas in the scenario: agreement of readings and closeness to truth.", "Start by sorting what the scenario tells you about precision from what it tells you about accuracy."]);

E("u1-cr-uncertainty-interval", 1, ["3.7"], 2, "gen", function(){
  var scenes=[
    {ctx:"A board length is measured as {R} cm with a ruler whose smallest mark is {S} cm.", unit:"cm"},
    {ctx:"A parcel mass is measured as {R} kg on a scale whose smallest step is {S} kg.", unit:"kg"},
    {ctx:"A water volume is measured as {R} mL in a jug whose smallest mark is {S} mL.", unit:"mL"},
    {ctx:"A room temperature is measured as {R} degrees Celsius on a thermometer marked every {S} degrees.", unit:"degrees Celsius"}
  ];
  var sc=pick(scenes); var S=pick([0.1,0.2,0.5,1,2]);
  var R=Math.round((pick([15,22,28,35,44,56,68,84])+ri(0,8)*S)*100)/100;
  var askMax=Math.random()<0.5; var half=S/2;
  var ans=Math.round((askMax?R+half:R-half)*100)/100;
  return numq(sc.ctx.replace("{R}",u1Fmt(R)).replace("{S}",u1Fmt(S))+" Find the "+(askMax?"maximum":"minimum")+" possible true value, in "+sc.unit+". Show your work.",
    ans, 0.011,
    "\\[ \\begin{aligned} \\text{Uncertainty} &= \\frac{"+u1Fmt(S)+"}{2} = "+u1Fmt(half)+" \\\\ \\text{"+(askMax?"Maximum":"Minimum")+"} &= "+u1Fmt(R)+" "+(askMax?"+":"-")+" "+u1Fmt(half)+" = "+u1Fmt(ans)+" \\end{aligned} \\] The answer is <b>"+u1Fmt(ans)+" "+sc.unit+"</b>.",
    {R:R,S:S,askMax:askMax?1:0});
}, ["The true value lies within the uncertainty on either side of the reading.", "Start by halving the smallest unit to get the uncertainty."]);

E("u1-cr-tolerance-limits", 1, ["3.8"], 2, "gen", function(){
  var scenes=[
    {ctx:"A machine part has a nominal diameter of {N} mm and a tolerance of plus or minus {T} mm.", unit:"mm", noms:[18,24,30,36,45,60], tols:[0.2,0.4,0.5,0.8,1]},
    {ctx:"A cut length of pipe has a nominal length of {N} cm and a tolerance of plus or minus {T} cm.", unit:"cm", noms:[45,60,75,90,110,130], tols:[0.3,0.5,0.8,1,1.2]},
    {ctx:"A filled bottle has a nominal volume of {N} mL and a tolerance of plus or minus {T} mL.", unit:"mL", noms:[250,330,500,750,1000], tols:[5,8,10,15,20]}
  ];
  var sc=pick(scenes); var N=pick(sc.noms); var T=pick(sc.tols);
  var width=2*T;
  return numq(sc.ctx.replace("{N}",u1Fmt(N)).replace("{T}",u1Fmt(T))+" Find the total width of the acceptable range (maximum minus minimum), in "+sc.unit+". Show your work.",
    width, 0.011,
    "\\[ \\begin{aligned} \\text{Maximum} &= "+u1Fmt(N)+" + "+u1Fmt(T)+" = "+u1Fmt(N+T)+" \\\\ \\text{Minimum} &= "+u1Fmt(N)+" - "+u1Fmt(T)+" = "+u1Fmt(N-T)+" \\\\ \\text{Width} &= "+u1Fmt(N+T)+" - "+u1Fmt(N-T)+" = "+u1Fmt(width)+" \\end{aligned} \\] The answer is <b>"+u1Fmt(width)+" "+sc.unit+"</b>.",
    {N:N,T:T});
}, ["Find both ends of the acceptable range first.", "Start by adding the tolerance to get the maximum, then subtracting it to get the minimum."]);

E("u1-cr-mixed-tolerance", 1, ["3.9","3.8"], 2, "gen", function(){
  var scenes=[
    {name:"A bag of seed", unit:"kg", noms:[20,25,40,50]},
    {name:"A drum of cleaner", unit:"L", noms:[100,150,200,250]},
    {name:"A roll of fencing wire", unit:"m", noms:[50,80,100,120]},
    {name:"A box of nails (total mass)", unit:"kg", noms:[10,15,20,30]}
  ];
  var sc=pick(scenes); var N=pick(sc.noms); var p=pick([2,3,4,5,6]);
  var tol=N*p/100; var ans=Math.round((N-tol)*100)/100;
  return numq(sc.name+" is labelled "+u1Fmt(N)+" "+sc.unit+" with a tolerance of "+u1Fmt(p)+"%. A customer wants the guaranteed minimum amount. Find the minimum acceptable amount, in "+sc.unit+". Show your work.",
    ans, 0.011,
    "\\[ \\begin{aligned} \\text{Tolerance amount} &= "+u1Fmt(p)+"\\% \\text{ of } "+u1Fmt(N)+" = "+u1Fmt(tol)+" \\\\ \\text{Minimum} &= "+u1Fmt(N)+" - "+u1Fmt(tol)+" = "+u1Fmt(ans)+" \\end{aligned} \\] The answer is <b>"+u1Fmt(ans)+" "+sc.unit+"</b>.",
    {N:N,p:p});
}, ["A percent tolerance is an amount once you calculate it.", "Start by finding the percent of the labelled amount."]);

E("u1-mixed-wide", 1, ["3.9","3.7","3.5"], 3, "gen", function(){
  var mode=ri(1,4);
  if(mode===1){
    var S=pick([0.1,0.2,0.5,1,2,4]); var R=Math.round((pick([14,26,38,52,66,88,120])+ri(0,9)*S)*100)/100; var half=S/2;
    var askMax=Math.random()<0.5; var ans=askMax?R+half:R-half;
    function O1(v,fb){ return {t:u1Fmt(v), fb:fb}; }
    var _bo0=balOpts(O1(ans,"Yes: the true value can sit half a smallest unit "+(askMax?"above":"below")+" the reading."), [O1(askMax?R-half:R+half,"That is the opposite end of the interval."),
       O1(askMax?R+S:R-S,"That uses a full smallest unit instead of half of one."),
       O1(R,"That ignores the uncertainty in the reading.")]); return mcq("A measurement is recorded as "+u1Fmt(R)+" units using an instrument whose smallest unit is "+u1Fmt(S)+" units. What is the "+(askMax?"largest":"smallest")+" value, in units, the true measurement could be?", _bo0[0], _bo0[1],
      "\\[ \\begin{aligned} \\text{Uncertainty} &= \\frac{"+u1Fmt(S)+"}{2} = "+u1Fmt(half)+" \\\\ \\text{"+(askMax?"Largest":"Smallest")+"} &= "+u1Fmt(R)+" "+(askMax?"+":"-")+" "+u1Fmt(half)+" = "+u1Fmt(ans)+" \\end{aligned} \\] The answer is <b>"+u1Fmt(ans)+" units</b>.", {mode:1,R:R,S:S});
  }
  if(mode===2){
    var N=pick([40,60,80,120,160,200,250,400]); var p=pick([1,2,3,4,5,8,10]); var tol=N*p/100;
    var askMax2=Math.random()<0.5; var ans2=askMax2?N+tol:N-tol;
    function O2(v,fb){ return {t:u1Fmt(v), fb:fb}; }
    var _bo1=balOpts(O2(ans2,"Yes: the tolerance amount is "+u1Fmt(tol)+" units."), [O2(askMax2?N-tol:N+tol,"That is the opposite end of the range."),
       O2(askMax2?N+p:N-p,"That treats the percent as a number of units."),
       O2(N,"That is the nominal value with no tolerance applied.")]); return mcq("A part is specified as "+u1Fmt(N)+" units with a tolerance of "+u1Fmt(p)+"%. What is the "+(askMax2?"maximum":"minimum")+" acceptable value, in units?", _bo1[0], _bo1[1],
      "\\[ \\begin{aligned} \\text{Tolerance} &= "+u1Fmt(p)+"\\% \\text{ of } "+u1Fmt(N)+" = "+u1Fmt(tol)+" \\\\ \\text{"+(askMax2?"Maximum":"Minimum")+"} &= "+u1Fmt(N)+" "+(askMax2?"+":"-")+" "+u1Fmt(tol)+" = "+u1Fmt(ans2)+" \\end{aligned} \\] The answer is <b>"+u1Fmt(ans2)+" units</b>.", {mode:2,N:N,p:p});
  }
  if(mode===3){
    var T=pick([15,25,35,45,55,75,90]); var eA=pick([0.2,0.4,0.6,1,1.4]); var eB=pick([0.3,0.5,0.9,1.2,1.8,2.4]);
    var g=0; while(eB===eA&&g++<40)eB=pick([0.3,0.5,0.9,1.2,1.8,2.4]); if(eB===eA)eB=eA+0.5;
    var rA=Math.round((T+eA)*10)/10, rB=Math.round((T-eB)*10)/10;
    var aWins=eA<eB;
    var _bo2=balOpts({t:(aWins?"P is more accurate, with an error of "+u1Fmt(eA)+" units.":"Q is more accurate, with an error of "+u1Fmt(eB)+" units."), fb:"Yes: compare each error with the true value."}, [{t:(aWins?"Q is more accurate, with an error of "+u1Fmt(eB)+" units.":"P is more accurate, with an error of "+u1Fmt(eA)+" units."), fb:"That instrument has the larger error."},
       {t:"Both are equally accurate.", fb:"The errors are "+u1Fmt(eA)+" and "+u1Fmt(eB)+" units, which differ."},
       {t:"P is more precise, so it must be more accurate.", fb:"Precision is about repeated readings agreeing; only one reading from each is given here."}]); return mcq("The true value of a quantity is "+u1Fmt(T)+" units. Instrument P reads "+u1Fmt(rA)+" units and instrument Q reads "+u1Fmt(rB)+" units. Which statement is correct?", _bo2[0], _bo2[1],
      "\\[ \\begin{aligned} \\text{Error P} &= |"+u1Fmt(rA)+" - "+u1Fmt(T)+"| = "+u1Fmt(eA)+" \\\\ \\text{Error Q} &= |"+u1Fmt(rB)+" - "+u1Fmt(T)+"| = "+u1Fmt(eB)+" \\end{aligned} \\] The smaller error wins. The answer is <b>"+(aWins?"P":"Q")+" is more accurate</b>.", {mode:3,T:T});
  }
  var N4=pick([30,45,60,90,120,150]); var T4=pick([0.5,1,1.5,2,3]); var lo=N4-T4, hi=N4+T4;
  var test=pick([lo-1, lo, (lo+hi)/2, hi, hi+1, hi+2]);
  var inside=(test>=lo&&test<=hi);
  var _bo3=balOpts({t:inside?"Yes, it is inside the acceptable range.":"No, it is outside the acceptable range.", fb:inside?"Yes: "+u1Fmt(test)+" lies between "+u1Fmt(lo)+" and "+u1Fmt(hi)+".":"Correct: "+u1Fmt(test)+" lies outside "+u1Fmt(lo)+" to "+u1Fmt(hi)+"."}, [{t:inside?"No, it is outside the acceptable range.":"Yes, it is inside the acceptable range.", fb:"Compare the measurement with both ends of the range: "+u1Fmt(lo)+" to "+u1Fmt(hi)+"."},
     {t:"Yes, every measurement passes.", fb:"Measurements outside the tolerance range fail inspection."},
     {t:"No, only the exact nominal value passes.", fb:"The tolerance allows a range around the nominal value, not just the nominal value itself."}]); return mcq("A component must measure between "+u1Fmt(lo)+" units and "+u1Fmt(hi)+" units, inclusive, to pass inspection (nominal "+u1Fmt(N4)+", tolerance plus or minus "+u1Fmt(T4)+"). A component measures "+u1Fmt(test)+" units. Does it pass?", _bo3[0], _bo3[1],
    "The acceptable range runs from "+u1Fmt(N4)+" minus "+u1Fmt(T4)+" to "+u1Fmt(N4)+" plus "+u1Fmt(T4)+", that is "+u1Fmt(lo)+" to "+u1Fmt(hi)+". The measurement "+u1Fmt(test)+" is "+(inside?"inside":"outside")+" that range. The answer is <b>"+(inside?"yes, it passes":"no, it fails")+"</b>.", {mode:4,N:N4,T:T4,test:test});
}, ["Sort out which idea the question is using: uncertainty, tolerance, or error from a true value.", "Start by writing down the key given value and what must be found from it."]);

E("u1-cr-classify-words", 1, ["3.3","3.4"], 3, "gen", function(){
  var unit=pick(["g","mL","cm"]);
  var T=pick([30,45,60,75,90]);
  var kind=ri(1,4);
  var vals, ansText, accepted, expl;
  if(kind===1){ var b=pick([2,2.5,3]); vals=[b,b+0.2,b-0.1,b+0.1].map(function(x){return Math.round((T+x)*10)/10;}); ansText="precise but not accurate"; accepted=["precise but not accurate","precise, not accurate","precise but inaccurate"]; expl="The readings cluster tightly but sit about "+u1Fmt(b)+" "+unit+" away from the true value."; }
  else if(kind===2){ vals=[0.1,-0.2,0.1,0].map(function(x){return Math.round((T+x)*10)/10;}); ansText="precise and accurate"; accepted=["precise and accurate","both precise and accurate","accurate and precise"]; expl="The readings cluster tightly and centre on the true value."; }
  else if(kind===3){ var a=pick([1.5,2,2.5]); vals=[-a,-0.5,0.5,a].map(function(x){return Math.round((T+x)*10)/10;}); ansText="accurate on average but not precise"; accepted=["accurate on average but not precise","accurate but not precise","not precise but accurate on average"]; expl="The readings spread widely but centre on the true value."; }
  else { var c=pick([2,3]); vals=[c,c+1.5,c-1,c+2].map(function(x){return Math.round((T+x)*10)/10;}); ansText="neither precise nor accurate"; accepted=["neither precise nor accurate","neither","not precise and not accurate"]; expl="The readings spread widely and centre away from the true value."; }
  var list=vals.map(function(v){return u1Fmt(v);}).join(", ");
  return textq("Repeated measurements of a quantity with true value "+u1Fmt(T)+" "+unit+" give: "+list+" "+unit+". Describe the measurements in words, using one of these forms: precise and accurate; precise but not accurate; accurate on average but not precise; neither precise nor accurate. Write the full phrase.",
    accepted,
    expl+" Precision judges the spread and accuracy judges closeness to "+u1Fmt(T)+" "+unit+". The answer is <b>"+ansText+"</b>.",
    {T:T,kind:kind});
}, ["Use the two checks: spread for precision, centre versus the true value for accuracy.", "Start by deciding whether the readings cluster tightly."]);

E("u1-cr-assembly-tolerance", 1, ["3.9","3.8"], 3, "gen", function(){
  var scenes=[
    {ctx:"Two shelf boards are placed end to end. Board A is {A} cm long with a tolerance of plus or minus {TA} cm. Board B is {B} cm long with a tolerance of plus or minus {TB} cm.", unit:"cm", As:[40,50,60,80], Bs:[30,45,55,70], tols:[0.2,0.3,0.5,0.8]},
    {ctx:"A pipe run joins two pipes. Pipe A is {A} m long with a tolerance of plus or minus {TA} m. Pipe B is {B} m long with a tolerance of plus or minus {TB} m.", unit:"m", As:[2,3,4,5], Bs:[1.5,2.5,3.5,4], tols:[0.02,0.05,0.08,0.1]},
    {ctx:"Two tanks are filled from labelled amounts. Tank A holds {A} L with a tolerance of plus or minus {TA} L. Tank B holds {B} L with a tolerance of plus or minus {TB} L.", unit:"L", As:[100,150,200], Bs:[80,120,180], tols:[2,3,5,8]}
  ];
  var sc=pick(scenes); var A=pick(sc.As), B=pick(sc.Bs), TA=pick(sc.tols), TB=pick(sc.tols);
  var askMax=Math.random()<0.5;
  var ans=askMax?(A+TA)+(B+TB):(A-TA)+(B-TB);
  ans=Math.round(ans*100)/100;
  var prompt=sc.ctx.replace("{A}",u1Fmt(A)).replace("{TA}",u1Fmt(TA)).replace("{B}",u1Fmt(B)).replace("{TB}",u1Fmt(TB))+" Find the "+(askMax?"maximum":"minimum")+" possible total, in "+sc.unit+". Show your work.";
  return numq(prompt, ans, 0.011,
    "\\[ \\begin{aligned} \\text{Part A "+(askMax?"max":"min")+"} &= "+u1Fmt(A)+" "+(askMax?"+":"-")+" "+u1Fmt(TA)+" = "+u1Fmt(Math.round((askMax?A+TA:A-TA)*100)/100)+" \\\\ \\text{Part B "+(askMax?"max":"min")+"} &= "+u1Fmt(B)+" "+(askMax?"+":"-")+" "+u1Fmt(TB)+" = "+u1Fmt(Math.round((askMax?B+TB:B-TB)*100)/100)+" \\\\ \\text{Total} &= "+u1Fmt(ans)+" \\end{aligned} \\] The answer is <b>"+u1Fmt(ans)+" "+sc.unit+"</b>.",
    {A:A,B:B,TA:TA,TB:TB,askMax:askMax?1:0});
}, ["Each part can sit at the same end of its tolerance at the same time.", "Start by finding the extreme value for the first part."]);

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 1 (measurement: precision, accuracy and tolerance readiness). Borrowed verbatim from Mathematics 1202 (u2-referent, u2-measure-read, u2-estimate-ref, u2-reasonable, u2-diameter-fig); feeder helper copies ride in bank-helpers.js. Authored for this tranche: u1-pk-rounding (the rounding rule inside the cluster's source gap) and u1-pk-tolerance-arithmetic (the cluster's tolerance-arithmetic skill, written without the course's own notation, the Math 2200 number-line discipline). ===== */
E("u1-pk-referent", 1, ["3.2"], 1, "gen", function(){
  var items=[
    {u:"1 centimetre", good:"the width of a fingernail", bad:["the height of a doorway","the length of a school bus","the width of a football field"], why:"A fingernail is about a centimetre wide."},
    {u:"1 metre", good:"the height of a kitchen counter, roughly", bad:["the thickness of a coin in your pocket","the length of a new pencil on a desk","the height of a two storey house nearby"], why:"A counter top sits about a metre above the floor."},
    {u:"1 inch", good:"the width of a thumb at the nail", bad:["the length of a forearm, roughly","the height of a door knob, roughly","the width of a sheet of paper"], why:"A thumb width is a common inch referent."},
    {u:"1 foot", good:"the length of a standard ruler", bad:["the width of a wide hand span","the height of a tall coffee mug","the length of a parked car"], why:"A standard ruler is 12 inches, which is 1 foot."},
    {u:"1 yard", good:"the height of a door knob from the floor, roughly", bad:["the length of a shoelace tip on a winter boot","the width of a doorway step at the front door","the length of a hockey rink in a small town"], why:"A door knob sits about a yard above the floor."},
    {u:"1 kilometre", good:"about a 10 minute walk", bad:["the length of a city bus","about a 1 minute walk","the distance across a classroom"], why:"Walking a kilometre takes roughly 10 minutes."},
    {u:"1 millimetre", good:"the thickness of a dime", bad:["the width of a fingernail","the length of an ant, roughly","the thickness of a textbook"], why:"A dime is about a millimetre thick."}
  ];
  var it=pick(items);
  var frame=pick(["Which referent best matches ","For a quick estimate, which referent best matches ","A student needs a referent. Which one best matches ","In a workshop, which referent best matches ","For measuring at home, which referent best matches ","Which familiar object is the best referent for ","A camper wants a referent. Which one best matches ","Which referent should a student picture for "]);
  var ds=it.bad.map(function(b){ return {t:b, fb:"That object is far from "+it.u+" in size, so it would mislead an estimate."}; });
  return mcq(frame+it.u+"? A referent is a familiar object used to judge a measure.",
    {t:it.good, fb:"Yes. "+it.why}, ds,
    it.why+" So the best referent for "+it.u+" is <b>"+it.good+"</b>.",
    {unit:it.u});
}, ["Picture each object and compare its size with the unit.", "Rule out objects that are clearly much larger or much smaller first."]);

E("u1-pk-measure-read", 1, ["3.5"], 2, "gen", function(){
  var whole=ri(2,11); var eighths=pick([1,2,3,4,5,6,7]); var objName=pick(["object","board end","ribbon","strip of card"]); var val=whole+eighths/8;
  var names={1:"1/8",2:"1/4",3:"3/8",4:"1/2",5:"5/8",6:"3/4",7:"7/8"};
  var good=whole+" "+names[eighths]+" in";
  function lab(w,e){ if(e===0) return w+" in"; if(e===8) return (w+1)+" in"; return w+" "+names[e]+" in"; }
  var cand=[[whole,eighths+1],[whole,eighths-1],[whole+1,eighths],[whole, eighths+2]];
  var ds=[]; var used={}; used[good]=1;
  for(var i=0;i<cand.length && ds.length<3;i++){ var t=lab(cand[i][0],cand[i][1]); if(!used[t]){ used[t]=1; ds.push({t:t, fb:"That reading is off the end mark: count the whole inches first, then the eighth inch marks. Tape measures use fractions of an inch because small lengths must be marked precisely."}); } }
  while(ds.length<3){ var t2=lab(whole+2, eighths); if(!used[t2]){ used[t2]=1; ds.push({t:t2, fb:"That reading is well past the end of the object."}); } else break; }
  var q=mcq("The "+objName+" starts at 0 on the ruler in the diagram. Imperial rulers divide each inch into fractions such as eighths. What is the length of the object?",
    {t:good, fb:"Correct: count the whole inches, then count eighth inch marks past the last whole inch."}, ds,
    "Read from 0. The object ends at "+whole+" whole inches plus "+eighths+" eighth marks. \\[ "+whole+" + "+FR(eighths,8)+" = "+fmt(val)+" \\] The length is <b>"+good+"</b>.",
    {whole:whole, eighths:eighths});
  q.figure=u2RulerFig(val);
  return q;
}, ["Count whole units first, then the fractional marks.", "Find the last whole inch mark the object passes, then count the small marks after it."]);

E("u1-pk-estimate-ref", 1, ["3.1"], 2, "gen", function(){
  var scenes=[
    {obj:"height of a door", ref:"metre stick", per:1, unit:"m", lo:2, hi:3},
    {obj:"length of a classroom", ref:"foot long ruler laid end to end", per:1, unit:"ft", lo:24, hi:36},
    {obj:"width of a hallway", ref:"yard stick", per:1, unit:"yd", lo:2, hi:4},
    {obj:"height of a desk", ref:"foot long ruler", per:1, unit:"ft", lo:2, hi:3},
    {obj:"length of a school bus", ref:"metre stick", per:1, unit:"m", lo:10, hi:14},
    {obj:"length of a gym", ref:"metre stick", per:1, unit:"m", lo:18, hi:30},
    {obj:"height of a counter", ref:"30 cm ruler", per:0.3, unit:"m", lo:3, hi:3},
    {obj:"width of a driveway", ref:"yard stick", per:1, unit:"yd", lo:3, hi:6}
  ];
  var sc=pick(scenes); var n=ri(sc.lo*2,sc.hi*2)/2; var ans=Math.round(n*sc.per*10)/10;
  var dd=u2Dist(ans,[ans*2,ans/2,ans+(ans>=10?5:1)], sc.unit, "Correct: multiply the number of referents by the size of one referent.", function(i){ return ["That doubles the count of referents without a reason.","That uses only half the referents that were counted.","That does not match the count of referents that was given."][i]; });
  return mcq("To estimate the "+sc.obj+", a student uses a "+sc.ref+" as a referent. It takes about "+n+" referents to match it. One referent is about "+fmt(sc.per)+" "+sc.unit+". About how long is it, in "+sc.unit+"?",
    dd.c, dd.d,
    "Multiply the count by the size of one referent. \\[ "+n+" \\times "+fmt(sc.per)+"\\ \\text{"+sc.unit+"} = "+fmt(ans)+"\\ \\text{"+sc.unit+"} \\] The estimate is about <b>"+fmt(ans)+" "+sc.unit+"</b>.",
    {obj:sc.obj, n:n});
}, ["An estimate with a referent is a count times the size of one referent.", "Multiply how many referents fit by the length of one referent."]);

E("u1-pk-reasonable", 1, ["3.9"], 2, "gen", function(){
  var mode=pick(["classroom","frame","doorway","plate","parcel","fence"]);
  if(mode==="classroom"){
    var trueL=ri(7,12); var rep=trueL*100;
    return mcq("A student measures a classroom and reports the length as "+rep+" m. Is this reasonable?",
      {t:"No: a classroom is about "+trueL+" m long, so "+rep+" m is far too large, likely a centimetre value given in metres", fb:"Correct: the judgement matches a referent check."},
      [{t:"Yes: classrooms are hundreds of metres long, so a value like this is reasonable for a school", fb:"Compare the reported value with a referent: a classroom is only several metres long."},{t:"Yes: any measured value is automatically reasonable as long as a tape measure was used to take it carefully", fb:"A reported value still has to fit the size of the object."},{t:"No: a classroom is about "+(trueL*10)+" m long, so "+rep+" m is only a little too large to matter at all", fb:"That referent is itself far too large for a classroom."}],
      "Judge against a referent. A classroom is about "+trueL+" m long, so "+rep+" m is not reasonable. The judgement is <b>no, the value is far too large</b>.", {mode:mode, trueL:trueL});
  }
  if(mode==="frame"){
    var L=ri(25,60), W=ri(20,50); var P=2*(L+W);
    return mcq("A student finds the perimeter of a picture frame ("+L+" cm by "+W+" cm) is "+P+" cm. Is this reasonable?",
      {t:"Yes: the sides add to "+L+" + "+W+" + "+L+" + "+W+" = "+P+" cm, which fits a frame of that size", fb:"Correct: the check calculation confirms the value."},
      [{t:"No: the perimeter should be "+L+" × "+W+" = "+(L*W)+" cm, found by multiplying the two sides together", fb:"Multiplying gives area, not perimeter."},{t:"Yes: perimeters are always in the hundreds, so any value near there works fine for a frame", fb:"Reasonableness comes from a check, not from the size of the number alone."},{t:"No: a picture frame perimeter must be under 100 cm, so this one is too big", fb:"These sides already add past 100 cm, so that claim fails the check."}],
      "Check by adding the sides: "+L+" + "+W+" + "+L+" + "+W+" = "+P+" cm. The judgement is <b>yes, it is reasonable</b>.", {mode:mode, L:L, W:W});
  }
  if(mode==="doorway"){
    var repD=pick([19,20,21,22,23]);
    return mcq("A student reports a doorway height of "+repD+" m. Is this reasonable?",
      {t:"No: a doorway is about 2.1 m high, so a decimal point error is likely", fb:"Correct: the value is about ten times a sensible doorway height."},
      [{t:"Yes: doorways in schools are over 18 m high in many school buildings", fb:"Compare with a referent: a doorway is only a little over 2 m."},{t:"No: a doorway is about 21 cm high, so the value is far too large", fb:"That referent is far too small: a person must fit through a doorway."},{t:"Yes: height values in metres are always in the tens, like this one", fb:"The unit alone does not make a value reasonable."}],
      "Judge against a referent. A doorway is about 2.1 m high, so "+repD+" m is not reasonable. The judgement is <b>no, a decimal point error is likely</b>.", {mode:mode});
  }
  if(mode==="plate"){
    var d=ri(20,32); var C=Math.round(Math.PI*d);
    return mcq("A student finds the circumference of a dinner plate with diameter "+d+" cm is about "+C+" cm. Is this reasonable?",
      {t:"Yes: circumference is a little over 3 times the diameter, and 3 times "+d+" is "+(3*d)+", close to "+C, fb:"Correct: the quick check with 3 times the diameter confirms it."},
      [{t:"No: a circumference should be less than the diameter, since going around is shorter", fb:"Going around a circle is longer than going straight across it."},{t:"No: the circumference should be about "+(d*d)+" cm, the diameter squared, so the reported value is too small", fb:"Squaring belongs to area, not circumference."},{t:"Yes: any value with pi in the calculation is automatically reasonable, so no check is needed", fb:"The value still needs a size check against the diameter."}],
      "Circumference is a little over 3 times the diameter: 3 times "+d+" is "+(3*d)+", close to "+C+". The judgement is <b>yes, it is reasonable</b>.", {mode:mode, d:d});
  }
  if(mode==="parcel"){
    var L=ri(30,60), W=ri(20,50), H=ri(15,40); var S=L+W+H, prod=L*W*H;
    return mcq("A parcel measures "+L+" cm by "+W+" cm by "+H+" cm. A student gives the shipping size L + W + H as "+prod+" cm. Is this reasonable?",
      {t:"No: the sum is "+L+" + "+W+" + "+H+" = "+S+" cm, so "+prod+" cm comes from multiplying, the wrong operation", fb:"Correct: the check sum exposes the wrong operation."},
      [{t:"Yes: shipping sizes are usually in the tens of thousands for a parcel, so this value is reasonable", fb:"Add the three measures and compare: the sum is only in the low hundreds."},{t:"No: the sum should be "+L+" + "+W+" + "+H+" divided by 10, which gives about "+Math.round(S/10)+" cm, not the reported value", fb:"That is a tenth of the actual sum: recheck the addition."},{t:"Yes: multiplying the three measures is the shipping rule, so the value is right", fb:"The shipping rule is a sum, L + W + H."}],
      "Add the measures: "+L+" + "+W+" + "+H+" = "+S+" cm, so "+prod+" cm is not reasonable. The judgement is <b>no, the wrong operation was used</b>.", {mode:mode, L:L, W:W, H:H});
  }
  var run=ri(15,40); var repF=run*10;
  return mcq("A student reports that a garden fence run is "+repF+" m long, for a small backyard garden. Is this reasonable?",
    {t:"No: a small backyard fence run is in the tens of metres at most, so "+repF+" m is far too large", fb:"Correct: the value does not fit the setting."},
    [{t:"Yes: backyard fences are usually hundreds of metres long, so this value fits a small garden perfectly well", fb:"Compare with a referent: a backyard is tens of metres across, not hundreds."},{t:"Yes: a bigger number always means a better, more careful measurement was taken on site", fb:"Size of the number says nothing without a fit check."},{t:"No: a fence run cannot be longer than 5 m in any backyard, so the report must be wrong", fb:"Many backyard runs are longer than 5 m: the reported value is too large, but not by that test."}],
    "A small backyard fence run is roughly "+run+" m scale, in the tens of metres. "+repF+" m is far too large. The judgement is <b>no, it is not reasonable</b>.", {mode:mode, run:run});
}, ["Compare the answer with a familiar referent or a rough check calculation.", "Ask whether the size of the answer fits the object being measured."]);

E("u1-pk-diameter-fig", 1, ["3.5"], 3, "gen", function(){
  var wall=pick([0.5,1,1.5,2,2.5,3]); var od=ri(10,32); var idd=od-2*wall;
  var ds=[
    {t:fmt(od-wall), fb:"That subtracts the wall only once: the wall appears on both sides of the opening."},
    {t:fmt(od), fb:"That is the outside diameter, not the inside opening."},
    {t:fmt(od-4*wall), fb:"That subtracts the wall four times: it appears twice across a diameter."}
  ];
  var bo=balOpts({t:fmt(idd), fb:"Correct: subtract the wall thickness on both sides of the opening."}, ds);
  var q=mcq("The diagram shows the end of a pipe. The outside diameter is "+fmt(od)+" cm and the wall is "+fmt(wall)+" cm thick all around. What is the inside diameter of the pipe, in centimetres? Inside diameter is the width of the opening.",
    bo[0], bo[1],
    "Across a diameter, the wall is crossed twice. \\[ \\begin{aligned} \\text{inside diameter} &= "+fmt(od)+" - 2("+fmt(wall)+") \\\\ &= "+fmt(idd)+"\\ \\text{cm} \\end{aligned} \\] The answer is <b>"+fmt(idd)+" cm</b>.",
    {od:od, wall:wall});
  q.figure=u2CirclesFig(od, idd);
  return q;
}, ["Picture a line straight across the opening: it crosses the wall twice.", "Subtract twice the wall thickness from the outside diameter."]);

E("u1-pk-rounding", 1, ["3.7"], 1, "gen", function () {
  var ctxs = [["a length of ribbon", "m"], ["a jug of water", "L"], ["a bag of flour", "kg"], ["a board", "m"], ["a mass on a scale", "kg"]];
  var c = pick(ctxs);
  var ip = ri(2, 60), d1 = ri(0, 9), d2 = ri(0, 9), d3 = ri(0, 9);
  var p = pick([1, 2]);
  var placeName = p === 1 ? "nearest tenth" : "nearest hundredth";
  function rounded(place, alwaysUp) {
    var ds = String(ip).split("").map(Number).concat([d1, d2, d3]);
    var intLen = String(ip).length, keep = intLen + place;
    var up = alwaysUp || ds[keep] >= 5;
    if (up) {
      var i = keep - 1; ds[i]++;
      while (ds[i] === 10) { ds[i] = 0; i--; if (i < 0) { ds.unshift(1); intLen++; break; } ds[i]++; }
    }
    var s = ds.slice(0, intLen).join("") + "." + ds.slice(intLen, intLen + place).join("");
    return place === 0 ? ds.slice(0, intLen).join("") : s;
  }
  var valStr = ip + "." + d1 + d2 + d3;
  var key = rounded(p, false);
  var upVal = rounded(p, true);
  var truncVal = (function () { var ds = String(ip).split("").map(Number).concat([d1, d2, d3]); var intLen = String(ip).length; return ds.slice(0, intLen).join("") + "." + ds.slice(intLen, intLen + p).join(""); })();
  var finer = rounded(Math.min(p + 1, 3), false);
  var coarser = rounded(p - 1, false);
  var keyT = key + " " + c[1];
  var candMap = {};
  candMap[keyT] = 1;
  var dsOpts = [];
  function addD(txt, fb) { if (!candMap[txt]) { candMap[txt] = 1; dsOpts.push({ t: txt, fb: fb }); } }
  addD(upVal + " " + c[1], "That rounds up, but the digit after the " + (p === 1 ? "tenths" : "hundredths") + " place is " + (p === 1 ? d2 : d3) + ", which is less than 5, so the place digit stays as it is.");
  addD(truncVal + " " + c[1], "That just drops the extra digits. The digit after the place is " + (p === 1 ? d2 : d3) + ", which is 5 or more, so the place digit rounds up.");
  addD(finer + " " + c[1], "That keeps one decimal place too many: the question asks for the " + placeName + ".");
  addD(coarser + " " + c[1], "That rounds to a coarser place than the " + placeName + " asked for.");
  var sol = "The digit in the " + (p === 1 ? "tenths" : "hundredths") + " place is followed by " + (p === 1 ? d2 : d3) + ". " +
    ((p === 1 ? d2 : d3) >= 5 ? "Since that digit is 5 or more, the place digit rounds up" : "Since that digit is less than 5, the place digit stays the same") +
    ", giving <b>" + keyT + "</b>.";
  return mcq("A measurement of " + c[0] + " is " + valStr + " " + c[1] + ". What is this measurement rounded to the " + placeName + "?",
    { t: keyT, fb: "Correct: look at the digit after the place you are rounding to." },
    dsOpts.slice(0, 3), sol, { mode: "round-place", value: valStr, place: p, ans: key });
}, ["Find the digit in the place you are rounding to.", "Look at the digit just after it: 5 or more rounds the place digit up, less than 5 leaves it."]);

E("u1-pk-tolerance-arithmetic", 1, ["3.8"], 2, "gen", function () {
  var ctxs = [
    ["A machine part is made to a length of", "mm", "part"],
    ["A ribbon is cut to a length of", "cm", "piece"],
    ["A bag of screws is filled to a mass of", "g", "bag"],
    ["A tank is filled to a volume of", "mL", "tank"],
    ["A board is cut to a length of", "cm", "board"]
  ];
  var c = pick(ctxs);
  var N = ri(12, 90) + pick([0, 0.5]);
  var t = pick([0.2, 0.3, 0.4, 0.5, 0.8, 1.0, 1.5, 2.0]);
  var lo = Math.round((N - t) * 10) / 10, hi = Math.round((N + t) * 10) / 10;
  function rng(a, b) { return "Smallest " + fmt(a, 1) + " " + c[1] + ", largest " + fmt(b, 1) + " " + c[1]; }
  var keyT = rng(lo, hi);
  var dsOpts = [
    { t: rng(N, Math.round((N + 2 * t) * 10) / 10), fb: "That adds the amount on the top side twice and never subtracts it: the smallest value also moves down by the amount." },
    { t: rng(lo, N), fb: "That moves only the smallest value down. The amount applies in both directions, so the largest value moves up by the same amount." },
    { t: rng(hi, lo), fb: "Those are the right two values with their labels swapped: the smallest comes from subtracting the amount, the largest from adding it." }
  ];
  var sol = "Within " + fmt(t, 1) + " " + c[1] + " above or below means the value can drop by " + fmt(t, 1) + " and rise by " + fmt(t, 1) + ": smallest = " +
    fmt(N, 1) + " - " + fmt(t, 1) + " = " + fmt(lo, 1) + " " + c[1] + ", and largest = " + fmt(N, 1) + " + " + fmt(t, 1) + " = " + fmt(hi, 1) + " " + c[1] +
    ". The acceptable range is <b>" + keyT.toLowerCase() + "</b>.";
  return mcq(c[0] + " " + fmt(N, 1) + " " + c[1] + ". A " + c[2] + " is accepted if its measurement is within " + fmt(t, 1) + " " + c[1] + " of this value, above or below. What are the smallest and largest acceptable measurements?",
    { t: keyT, fb: "Correct: subtract the amount for the smallest value and add it for the largest." },
    dsOpts, sol, { mode: "accept-range", nominal: N, amount: t, lo: lo, hi: hi });
}, ["The amount applies in both directions from the stated value.", "Subtract the amount for the smallest acceptable value and add it for the largest."]);

/* PK tranche metadata pass for Unit 1. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U1_FOR=["3.1","3.2","3.3","3.4","3.5","3.6","3.7","3.8","3.9"];
var PKT_U1={
 "u1-pk-referent":{src:"math-1202:3.17",group:"estimation"},
 "u1-pk-measure-read":{src:"math-1202:3.16",group:"instrument-reading"},
 "u1-pk-estimate-ref":{src:"math-1202:3.18",group:"estimation"},
 "u1-pk-reasonable":{src:"math-1202:3.23",group:"estimation"},
 "u1-pk-diameter-fig":{src:"math-1202:3.16",group:"instrument-reading"},
 "u1-pk-rounding":{src:"authored:rounding-a-measurement, placement unevidenced",group:"rounding"},
 "u1-pk-tolerance-arithmetic":{src:"authored:tolerance-arithmetic",group:"tolerance-arithmetic"}
};
BANK.forEach(function(e){var t=PKT_U1[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U1_FOR.slice();e.pkGroup=t.group;}});
