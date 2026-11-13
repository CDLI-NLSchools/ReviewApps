/* Math 3202 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-3202/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
// Math 3202 shared bank helpers, carried verbatim from the standalone
// app's bank source (bank-src.js): the header helpers the unit files
// rely on (FR, and the Rule 7 precision pairing balDpStrs / balOpts).
/* Math 3202 Review bank source. Assembled November 7, 2026 from work/unit1.js to
   unit10.js. FR returns the raw \frac fragment for use INSIDE math delimiters,
   defined here for the entries that use it. CR_MARKS stays at the end of this file. */
function FR(n,d){return "\\frac{"+n+"}{"+d+"}";}

/* balDpStrs(strs): Rule 7 precision pairing (Jason's pairs criterion, Nov 8,
   2026), following the normOpts method proven in the Math 3201 batch. strs is
   [key, d1, d2, d3] as printed option texts. When all four are a number plus a
   common suffix, the numbers are reprinted (values never change; digits are
   only ever padded with trailing zeros) at decimal-place counts that form a
   single group of four or two pairs, so no option stands alone at a unique
   precision. The key is padded only when no distractor-only assignment works.
   Returns the input unchanged when the set is not uniformly numeric, when a
   number contains a comma, or when no valid assignment exists. */
function balDpStrs(strs){
  /* Guard: if any two option texts are already identical, return the input
     untouched. The bank's dedupe (mcq) and the Unit 7 retry wrapper key on
     identical texts; padding one of a duplicate pair ("7" -> "7.00") would
     defeat that and could put a distractor with the key's value on screen. */
  for(var g=0;g<strs.length;g++) for(var h=g+1;h<strs.length;h++) if(String(strs[g])===String(strs[h])) return strs;
  var parsed=[], suf=null;
  for(var i=0;i<strs.length;i++){
    var m=String(strs[i]).match(/^(-?\d+(?:\.\d+)?)([\s\S]*)$/);
    if(!m) return strs;
    if(m[1].indexOf(",")>=0) return strs;
    if(suf===null) suf=m[2]; else if(m[2]!==suf) return strs;
    parsed.push({v:parseFloat(m[1]), dp:(m[1].split(".")[1]||"").length});
  }
  function countsOk(dps){ var c={}; dps.forEach(function(d){ c[d]=(c[d]||0)+1; }); return Object.keys(c).every(function(k){ return c[k]!==1; }); }
  if(countsOk(parsed.map(function(p){ return p.dp; }))) return strs;
  function render(assign){ return parsed.map(function(p,i){ return p.v.toFixed(assign[i])+suf; }); }
  function distinct(arr){ var s={}; for(var i=0;i<arr.length;i++){ if(s[arr[i]]) return false; s[arr[i]]=1; } return true; }
  function search(allowKeyPad){
    var keyDp=parsed[0].dp;
    var maxUp=4;
    var opts=parsed.map(function(p,i){
      var lo=(i===0&&!allowKeyPad)?p.dp:p.dp, hi=p.dp+maxUp, arr=[];
      for(var d=lo;d<=hi;d++) arr.push(d);
      if(i===0&&!allowKeyPad) return [p.dp];
      return arr;
    });
    var best=null;
    for(var a=0;a<opts[1].length;a++) for(var b=0;b<opts[2].length;b++) for(var c=0;c<opts[3].length;c++){
      var assign=[parsed[0].dp, opts[1][a], opts[2][b], opts[3][c]];
      if(!countsOk(assign)) continue;
      var out=render(assign);
      if(!distinct(out)) continue;
      var cost=assign.reduce(function(s,d,i){ return s+(d-parsed[i].dp); },0);
      if(!best||cost<best.cost) best={out:out, cost:cost};
    }
    if(!best && allowKeyPad){
      for(var k=keyDp;k<=keyDp+maxUp&&!best;k++){
        for(var a2=0;a2<opts[1].length;a2++) for(var b2=0;b2<opts[2].length;b2++) for(var c2=0;c2<opts[3].length;c2++){
          var assign2=[k, opts[1][a2], opts[2][b2], opts[3][c2]];
          if(!countsOk(assign2)) continue;
          var out2=render(assign2);
          if(!distinct(out2)) continue;
          var cost2=assign2.reduce(function(s,d,i){ return s+(d-parsed[i].dp); },0);
          best={out:out2, cost:cost2};
        }
      }
    }
    return best?best.out:null;
  }
  return search(false)||search(true)||strs;
}
function balOpts(key, ds){
  function tOf(o){ return (o&&typeof o==="object")?o.t:String(o); }
  var strs=[tOf(key)].concat(ds.map(tOf));
  var out=balDpStrs(strs);
  if(out===strs) return [key, ds];
  function withT(o, t){ if(o&&typeof o==="object"){ var n={}; for(var k in o) n[k]=o[k]; n.t=t; return n; } return t; }
  return [withT(key, out[0]), ds.map(function(d,i){ return withT(d, out[i+1]); })];
}

/* ----- bank-u1.js ----- */
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

/* ----- bank-u2.js ----- */
// Math 3202 Unit 2 Linear Relationships question bank
// CRMARKS: u2-cr-table-value=3
// CRMARKS: u2-cr-slope-rate=4
// CRMARKS: u2-cr-solve-input=5
// CRMARKS: u2-cr-write-equation=4
// CRMARKS: u2-cr-budget-solve=5
/* ===== Unit 2 ===== */
/* Math 3202 Unit 2: Linear Relationships. Helpers prefixed u2. Codes from ind-unit2.json. */
function u2Gcd(a,b){ a=Math.abs(a); b=Math.abs(b); while(b){ var t=a%b; a=b; b=t; } return a||1; }
function u2Frac(n,d){ if(d<0){n=-n;d=-d;} var g=u2Gcd(n,d); n/=g; d/=g; return d===1?String(n):(n+"/"+d); }
function u2EqTex(m,b,v){ v=v||"x"; var s="y = "; if(m===1)s+=v; else if(m===-1)s+="-"+v; else s+=m+v; if(b>0)s+=" + "+b; else if(b<0)s+=" - "+(-b); return s; }
function u2GridFig(xMax,yMax,pts,line,curve,xLab,yLab){
  var W=252,H=224,ox=36,oy=182,sx=(W-ox-14)/xMax,sy=(oy-24)/yMax;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  var yStep=yMax>12?2:1;
  for(var gy=0;gy<=yMax;gy+=yStep){ var Y=oy-gy*sy; s+='<line x1="'+ox+'" y1="'+fmt(Y,1)+'" x2="'+(W-10)+'" y2="'+fmt(Y,1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+(ox-5)+'" y="'+fmt(Y+3,1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+gy+'</text>'; }
  for(var gx=0;gx<=xMax;gx++){ var X=ox+gx*sx; s+='<line x1="'+fmt(X,1)+'" y1="18" x2="'+fmt(X,1)+'" y2="'+oy+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+fmt(X,1)+'" y="'+(oy+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+gx+'</text>'; }
  s+='<line x1="'+ox+'" y1="18" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(W-10)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  function PX(x){ return fmt(ox+x*sx,1); } function PY(y){ return fmt(oy-y*sy,1); }
  if(line){ s+='<line x1="'+PX(line[0])+'" y1="'+PY(line[1])+'" x2="'+PX(line[2])+'" y2="'+PY(line[3])+'" stroke="'+FIG_INK+'" stroke-width="2.2"/>'; }
  if(curve&&curve.length>1){ var d=""; curve.forEach(function(p,i){ d+=(i===0?"M ":"L ")+PX(p[0])+" "+PY(p[1])+" "; }); s+='<path d="'+d+'" fill="none" stroke="'+FIG_INK+'" stroke-width="2.2"/>'; }
  if(pts)pts.forEach(function(p){ s+='<circle cx="'+PX(p[0])+'" cy="'+PY(p[1])+'" r="4" fill="'+FIG_ACC+'"/>'; if(p[2])s+='<text x="'+fmt(ox+p[0]*sx+8,1)+'" y="'+fmt(oy-p[1]*sy-8,1)+'" font-size="10" font-weight="bold" fill="'+FIG_INK+'">'+p[2]+'</text>'; });
  if(xLab) s+='<text x="'+fmt(ox+xMax*sx/2,1)+'" y="'+(H-2)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+xLab+'</text>';
  if(yLab) s+='<text x="11" y="'+fmt(oy-yMax*sy/2,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" transform="rotate(-90 11 '+fmt(oy-yMax*sy/2,1)+')">'+yLab+'</text>';
  return s+'</svg>';
}
function u2TableFig(rows){
  var cols=rows[0].length, W=300, rowH=28, H=rows.length*rowH+16, colW=(W-20)/cols;
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  rows.forEach(function(r,i){ var y=8+i*rowH;
    s+='<rect x="10" y="'+y+'" width="'+(W-20)+'" height="'+rowH+'" fill="'+(i===0?FIG_SHADE:"none")+'" stroke="'+FIG_INK+'" stroke-width="1.2"/>';
    r.forEach(function(c,j){ var x=10+j*colW; if(j>0)s+='<line x1="'+fmt(x,1)+'" y1="'+y+'" x2="'+fmt(x,1)+'" y2="'+(y+rowH)+'" stroke="'+FIG_INK+'" stroke-width="1"/>';
      s+='<text x="'+fmt(x+colW/2,1)+'" y="'+(y+rowH/2+4)+'" font-size="12" '+(i===0?'font-weight="bold" ':"")+'fill="'+FIG_INK+'" text-anchor="middle">'+c+'</text>'; });
  });
  return s+'</svg>';
}

E("u2-linear-characteristics", 2, ["2.1"], 1, "gen", function(){
  var mode=ri(1,3);
  if(mode===1){
    var m=pick([-1,1,2]); var b=m>0?pick([0,1,2,3,4,5]):pick([6,8,9,10,11]);
    var scenesC=[
      {txt:"hours worked and pay earned", xl:"hours", yl:"pay ($)"},
      {txt:"time and the distance a bus has travelled", xl:"time (h)", yl:"distance (km)"},
      {txt:"filling time and the volume of water in a tank", xl:"time (min)", yl:"volume (L)"},
      {txt:"weeks and the height of a sunflower", xl:"weeks", yl:"height (cm)"}
    ];
    var scC=pick(scenesC);
    var yMax=0; var pts=[]; for(var x=0;x<=4;x++){ var y=m*x+b; pts.push([x,y]); if(y>yMax)yMax=y; }
    yMax+=1;
    var q=mcq("The graph shows a relation between "+scC.txt+". Which statement describes a characteristic of this linear relation?",
      {t:"The graph is a straight line, and equal steps in \\(x\\) give equal steps in \\(y\\).", fb:"Yes: a straight line with a constant step pattern is the mark of a linear relation."},
      [{t:"The graph curves, and the steps in \\(y\\) keep growing larger at each step.", fb:"The graph shown is straight, not curved."},
       {t:"The graph is a straight line, but the steps in \\(y\\) double each time \\(x\\) increases by 1.", fb:"On a straight line the steps stay equal: they do not double."},
       {t:"The points jump randomly from place to place with no pattern in the steps at all.", fb:"The points lie on a straight line with a regular step pattern."}],
      "A linear relation graphs as a straight line. Here each increase of 1 in \\(x\\) changes \\(y\\) by "+m+" every time. The answer is <b>the graph is a straight line with equal steps in \\(y\\)</b>.",
      {mode:1,m:m,b:b});
    q.figure=u2GridFig(5,yMax,pts,[0,b,4,4*m+b],null,scC.xl,scC.yl);
    return q;
  }
  if(mode===2){
    var m2=pick([1,2,3,4,5]); var b2=pick([0,1,2,3,5,7,10]);
    var xs=[0,1,2,3,4]; var rows=[["x"].concat(xs.map(String)),["y"].concat(xs.map(function(x){return String(m2*x+b2);}))];
    var q2=mcq("The table of values shows a relation. Which statement describes a characteristic of this linear relation?",
      {t:"The first differences are constant: \\(y\\) changes by "+m2+" each step.", fb:"Yes: constant first differences are the table mark of a linear relation."},
      [{t:"The first differences grow by "+m2+" each step, getting larger as the table goes on.", fb:"The differences stay at "+m2+": they do not grow."},
       {t:"The values of \\(y\\) are all the same at every step of the table.", fb:"The \\(y\\) values increase by "+m2+" each step."},
       {t:"There is no pattern connecting \\(x\\) and \\(y\\) anywhere in the table.", fb:"There is a clear pattern: add "+m2+" to \\(y\\) at each step."}],
      "\\[ \\begin{aligned} \\text{First differences} &= "+m2+",\\ "+m2+",\\ "+m2+",\\ "+m2+" \\end{aligned} \\] Constant first differences mean the relation is linear. The answer is <b>the first differences are constant at "+m2+"</b>.",
      {mode:2,m:m2,b:b2});
    q2.figure=u2TableFig(rows);
    return q2;
  }
  var d=pick([2,3,4,5,6,7,8,9]); var a=pick([1,2,3,4,5,7,9,10,12,15,18,20]);
  var seq=[0,1,2,3].map(function(i){return a+i*d;});
  var subj=pick(["A number pattern","A tile pattern (tiles per figure)","A bead pattern (beads per row)","A savings pattern (dollars saved each week, cumulative)"]);
  return mcq(subj+" starts: "+seq.join(", ")+", ... Which statement describes a characteristic of this linear pattern?",
    {t:"Each term is found by adding the same amount, "+d+", to the term before it.", fb:"Yes: a constant change from term to term is the pattern mark of linear growth."},
    [{t:"Each term is found by multiplying the term before it by "+d+", over and over.", fb:"Multiplying would make the gaps grow: here the gap stays at "+d+"."},
     {t:"Each term adds a larger amount than the term before it, every time.", fb:"The added amount stays at "+d+" each time."},
     {t:"The terms increase and then decrease in a repeating cycle.", fb:"The terms increase steadily by "+d+"."}],
    "The gaps are "+seq[1]+" minus "+seq[0]+", "+seq[2]+" minus "+seq[1]+", and so on: each gap is "+d+". The answer is <b>each term adds the same amount, "+d+"</b>.",
    {mode:3,a:a,d:d});
}, ["Look for what stays the same: the straightness of the graph, the first differences, or the gap between terms.", "Start by checking how the values change from one step to the next."]);

E("u2-sort-one", 2, ["2.2"], 1, "gen", function(){
  var mode=ri(1,3);
  var combos=[
    {t:"Linear, because the change is constant.", key:"linConst"},
    {t:"Linear, because the change keeps growing.", key:"linGrow"},
    {t:"Nonlinear, because the change is constant.", key:"nonConst"},
    {t:"Nonlinear, because the change keeps growing.", key:"nonGrow"}
  ];
  function build(prompt, correctKey, solution, params, fig){
    var correct=combos.filter(function(c){return c.key===correctKey;})[0];
    var opts=combos.filter(function(c){return c.key!==correctKey;}).map(function(c){return {t:c.t, fb:"That pairing does not fit: check both the type and the change pattern."};});
    var q=mcq(prompt, {t:correct.t, fb:"Yes: the type and the change pattern both match."}, opts, solution, params);
    if(fig)q.figure=fig;
    return q;
  }
  if(mode===1){
    var linear=Math.random()<0.5;
    var a=pick([2,3,4,5,6,7,8,9,11,13,15,20]); var seq, key, sol;
    if(linear){ var d=pick([2,3,4,5,6,7,9]); seq=[0,1,2,3].map(function(i){return a+i*d;}); key="linConst"; sol="The gaps between terms are all equal, so the change is constant and the pattern is linear. The answer is <b>linear, because the change is constant</b>."; }
    else { var nk=ri(1,2); if(nk===1){ var r=pick([2,3]); seq=[0,1,2,3].map(function(i){return a*Math.pow(r,i);}); } else { seq=[0,1,2,3].map(function(i){return a+i*i;}); } key="nonGrow"; sol="The gaps between terms grow as the terms grow, so the change is not constant and the pattern is nonlinear. The answer is <b>nonlinear, because the change keeps growing</b>."; }
    return build("Sort this number pattern: "+seq.join(", ")+", ... Which sorting is correct?", key, sol, {mode:1,linear:linear?1:0}, null);
  }
  if(mode===2){
    var lin2=Math.random()<0.5; var m=pick([2,3,4,5]); var b=pick([1,3,4,6,9]);
    var x0=pick([0,1,2]); var xs=[x0,x0+1,x0+2,x0+3]; var ys=xs.map(function(x){return lin2?m*x+b:(x-x0)*(x-x0)+b;});
    var rows=[["x"].concat(xs.map(String)),["y"].concat(ys.map(String))];
    var fig=u2TableFig(rows);
    var key2=lin2?"linConst":"nonGrow";
    var sol2=lin2?"The first differences of the \\(y\\) values are constant, so the table shows a linear relation. The answer is <b>linear, because the change is constant</b>.":"The first differences of the \\(y\\) values grow from step to step, so the table shows a nonlinear relation. The answer is <b>nonlinear, because the change keeps growing</b>.";
    return build("Sort the relation shown in the table of values. Which sorting is correct?", key2, sol2, {mode:2,linear:lin2?1:0}, fig);
  }
  var lin3=Math.random()<0.5;
  var pts=[], curve=null, line=null, yMax3=10;
  if(lin3){ var mm=pick([1,2,3]); var bb=pick([0,1,2,3,4]); for(var x3=0;x3<=4;x3++)pts.push([x3,mm*x3+bb]); line=[0,bb,4,4*mm+bb]; yMax3=4*mm+bb+1; }
  else { var cf=pick([0.5,1]); for(var x4=0;x4<=4;x4++)pts.push([x4,Math.round(x4*x4*cf)]); curve=pts; pts=[]; yMax3=Math.round(16*cf)+1; }
  var fig3=u2GridFig(5,yMax3,pts,line,curve,"x","y");
  var combosG=[
    {t:"Linear, because the graph is a straight line.", key:"linStraight"},
    {t:"Linear, because the graph curves.", key:"linCurve"},
    {t:"Nonlinear, because the graph is a straight line.", key:"nonStraight"},
    {t:"Nonlinear, because the graph curves.", key:"nonCurve"}
  ];
  var key3=lin3?"linStraight":"nonCurve";
  var correct3=combosG.filter(function(c){return c.key===key3;})[0];
  var opts3=combosG.filter(function(c){return c.key!==key3;}).map(function(c){return {t:c.t, fb:"That pairing does not fit the graph shown: check the shape first, then the label."};});
  var q3=mcq("Sort the relation shown in the graph. Which sorting is correct?", {t:correct3.t, fb:"Yes: the shape and the label match."}, opts3,
    lin3?"The plotted points lie on a straight line, which is the graph of a linear relation. The answer is <b>linear, because the graph is a straight line</b>.":"The plotted points follow a curve that gets steeper, which is a nonlinear relation. The answer is <b>nonlinear, because the graph curves</b>.",
    {mode:3,linear:lin3?1:0});
  q3.figure=fig3;
  return q3;
}, ["Sort by the change pattern or the shape, not by whether the values get bigger.", "Start by finding how the values change from step to step, or whether the graph is straight."]);

E("u2-connect-points", 2, ["2.3"], 1, "var", varset([
  function(){ return mcq("A graph shows the volume of water in a tank as it fills over 20 minutes. Should the plotted points be connected?",
    {t:"Yes: the volume takes every value in between as the tank fills steadily, so the in-between points have meaning.", fb:"Yes: filling is continuous, so connecting shows real values."},
    [{t:"Yes: points on every graph must always be connected, whatever the graph is showing or how the values behave.", fb:"Connecting is a choice based on the context, not a rule for every graph."},
     {t:"No: water volume can only be a whole number of litres, so parts of a litre can never appear as the tank fills.", fb:"Volume is not restricted to whole litres while the tank fills."},
     {t:"No: time cannot be shown on a graph, because graphs can only display amounts of things, never times of events.", fb:"Time is a standard axis quantity and can take any value in the interval."}],
    "Filling a tank is continuous: at every moment there is a volume. The answer is <b>yes, connect the points</b>.", {}); },
  function(){ return mcq("A graph shows the number of students on a bus at each stop along a route. Should the plotted points be connected?",
    {t:"No: the count of students changes only in whole students at stops, so in-between points would not describe any real moment.", fb:"Yes: student counts are whole numbers that change at stops only."},
    [{t:"Yes: connecting the points shows the bus moving between stops. The line would trace the trip as the bus travels from stop to stop.", fb:"The graph shows counts at stops, not the bus position between stops."},
     {t:"Yes: all plotted points should be joined to make a line, since a graph is not finished until its points are connected.", fb:"Joining is decided by the context: counts of people are discrete."},
     {t:"No: a bus route cannot be graphed at all, because the number of students is not the kind of value a graph can show.", fb:"The counts at each stop can be graphed as separate points."}],
    "Counts of people are discrete: they jump by whole students at stops. The answer is <b>no, do not connect the points</b>.", {}); },
  function(){ return mcq("A graph shows the temperature of a cup of tea cooling over one hour, measured every 10 minutes. Should the points be connected?",
    {t:"Yes: the temperature exists at every moment between measurements and changes gradually, so the line shows real values.", fb:"Yes: cooling is continuous even though it was measured at intervals."},
    [{t:"No: only the measured moments had a temperature. Between measurements, the temperature simply did not exist to be shown.", fb:"The tea had a temperature at every moment, measured or not."},
     {t:"Yes: connecting points makes any graph more accurate, because joined points always give a truer picture.", fb:"Connecting is right here because the quantity is continuous, not because it improves any graph."},
     {t:"No: temperature must be counted in whole degrees, so fractions of a degree cannot be part of the record.", fb:"Temperature can take decimal values and changes gradually."}],
    "Temperature changes continuously, so in-between points represent real temperatures. The answer is <b>yes, connect the points</b>.", {}); },
  function(){ return mcq("A graph shows the total cost of buying concert tickets, for 1, 2, 3, 4 or 5 tickets. Should the points be connected?",
    {t:"No: tickets are bought in whole numbers, so a point at 2.5 tickets would have no meaning.", fb:"Yes: ticket counts are whole numbers only."},
    [{t:"Yes: cost changes steadily as the ticket count grows, smoothly, ticket by ticket.", fb:"Cost jumps by one ticket price at a time: there is no steady in-between growth."},
     {t:"Yes: a connected line is easier to read, so the points should always be joined up.", fb:"Ease of reading does not give in-between points meaning."},
     {t:"No: cost cannot be placed on a graph axis, because money is not a measurable quantity at all.", fb:"Cost is a standard axis quantity: the issue is whole tickets."}],
    "You cannot buy part of a ticket in this context, so only whole-number points have meaning. The answer is <b>no, do not connect the points</b>.", {}); },
  function(){ return mcq("A graph shows the distance a cyclist is from home over a 3 hour ride, recorded every 15 minutes. Should the points be connected?",
    {t:"Yes: the cyclist is at some distance from home at every moment of the ride, so the in-between points are real.", fb:"Yes: distance from home varies continuously during a ride."},
    [{t:"No: distance only exists when it is recorded, so unrecorded moments have no distance at all.", fb:"The cyclist has a position at every moment, recorded or not."},
     {t:"Yes: cyclists always travel at a constant speed, so their distance graph is a straight line throughout the whole ride.", fb:"Speed may vary: connecting is justified because position is continuous, not because speed is constant."},
     {t:"No: rides longer than one hour cannot be connected, because the points stop belonging to one trip.", fb:"Length of the ride does not change whether the quantity is continuous."}],
    "Position during a ride is continuous. The answer is <b>yes, connect the points</b>.", {}); },
  function(){ return mcq("A graph shows how many buses a school needs for field trips of different sizes, plotted against the number of students going. Should the points be connected?",
    {t:"No: the number of buses is a whole number that jumps up when a size limit is passed, so in-between points have no meaning.", fb:"Yes: both student groups and bus counts work in whole numbers with jumps."},
    [{t:"Yes: more students always means part of a bus can be used. A fraction of a bus is a real option when groups are split up for trips.", fb:"A school cannot send part of a bus: the count jumps by whole buses."},
     {t:"Yes: connecting shows the sizes in order, because joining the points is what arranges the group sizes neatly.", fb:"Ordering the points does not make in-between values meaningful."},
     {t:"No: field trip data should never be graphed, since counts of students and buses do not belong on graphs.", fb:"The data can be graphed as separate points."}],
    "Bus counts are whole numbers that jump, a discrete relation. The answer is <b>no, do not connect the points</b>.", {}); }
]), ["Ask whether the quantities can take values between the plotted points.", "Start by deciding whether each quantity is continuous or counted in whole units."]);

E("u2-slope-from-graph", 2, ["2.4"], 2, "gen", function(){
  var pairs=[[1,2],[1,3],[2,3],[3,2],[1,4],[3,4],[2,5],[4,3],[5,2],[2,1],[3,1],[4,1],[5,3],[3,5],[4,5],[5,4],[1,5]];
  var pr=pick(pairs); var dy=pr[0], dx=pr[1];
  var x1=pick([0,1,2]); var y1=pick([0,1,2,3,4]);
  var x2=x1+dx, y2=y1+dy;
  var xMax=x2+1, yMax=y2+2;
  var slope=u2Frac(dy,dx), recip=u2Frac(dx,dy), half=u2Frac(dy,2*dx), plus=u2Frac(dy+dx,dx);
  function O(t,fb){ return {t:"\\("+t+"\\)", fb:fb}; }
  var q=mcq("The graph shows a line through the marked points \\(("+x1+", "+y1+")\\) and \\(("+x2+", "+y2+")\\). What is the slope of the line?",
    O(slope,"Yes: slope is rise over run, "+dy+" over "+dx+"."),
    [O(recip,"That is run over rise: the ratio is flipped."),
     O(half,"That uses twice the run: check the horizontal change between the points."),
     O(plus,"That adds an extra run to the rise before dividing.")],
    "\\[ \\begin{aligned} \\text{Slope} &= \\frac{\\text{rise}}{\\text{run}} = \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = \\frac{"+dy+"}{"+dx+"} \\end{aligned} \\] The answer is <b>\\("+slope+"\\)</b>.",
    {x1:x1,y1:y1,x2:x2,y2:y2});
  q.figure=u2GridFig(xMax,yMax,[[x1,y1,"P"],[x2,y2,"Q"]],[Math.max(0,x1-0),y1,x2,y2],null,"x","y");
  return q;
}, ["Slope is a ratio of vertical change to horizontal change.", "Start by finding the rise and the run between the two marked points."]);

E("u2-slope-rate-context", 2, ["2.4"], 2, "gen", function(){
  var scenes=[
    {ctx:"A cleaner is paid for jobs by the hour. A  {X1} hour job paid ${Y1} in wages for the cleaning time, and a {X2} hour job paid ${Y2}.", unit:"dollars per hour", ms:[8,10,12,15,18,20,25]},
    {ctx:"A delivery van uses fuel steadily. After {X1} L of fuel it had gone {Y1} km, and after {X2} L it had gone {Y2} km.", unit:"kilometres per litre", ms:[10,12,15,18,20]},
    {ctx:"A snowplow clears driveways at a steady rate. In {X1} hours it cleared {Y1} driveways, and in {X2} hours it cleared {Y2} driveways.", unit:"driveways per hour", ms:[2,3,4,5,6]},
    {ctx:"A bakery sells muffins in trays at a steady price. {X1} trays cost ${Y1}, and {X2} trays cost ${Y2}.", unit:"dollars per tray", ms:[4,5,6,8,10,12]}
  ];
  var sc=pick(scenes); var m=pick(sc.ms);
  var x1=pick([1,2,3]); var x2=x1+pick([2,3,4]); var base=m*ri(0,3);
  var y1=m*x1+base, y2=m*x2+base;
  var prompt=sc.ctx.replace("{X1}",x1).replace("{Y1}",y1).replace("{X2}",x2).replace("{Y2}",y2)+" What is the rate of change, in "+sc.unit+"?";
  function O(v,fb){ return {t:fmt(v)+" "+sc.unit, fb:fb}; }
  var third=Math.round((y2/x2)*10)/10;
  var poolR=[
    {v:y2-y1, fb:"That is the total change in the second quantity, before dividing by the change in the first."},
    {v:m+2, fb:"That is 2 more than the rate: divide the changes to check."},
    {v:third, fb:"That divides one total by the other total at a single point, which mixes in the starting amount."},
    {v:m+7, fb:"That is 7 more than the rate: divide the changes to check."},
    {v:m+3, fb:"That is 3 more than the rate: divide the changes to check."},
    {v:m+11, fb:"That is 11 more than the rate: divide the changes to check."}
  ];
  var seenR={}; seenR[m]=1; var opts=[];
  poolR.forEach(function(c){ if(opts.length<3&&!seenR[c.v]){ seenR[c.v]=1; opts.push(O(c.v,c.fb)); } });
  return mcq(prompt, O(m,"Yes: the rate is the change in the second quantity divided by the change in the first."), opts,
    "\\[ \\begin{aligned} \\text{Rate} &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} = "+m+" \\end{aligned} \\] The answer is <b>"+m+" "+sc.unit+"</b>.",
    {m:m,x1:x1,x2:x2});
}, ["Rate of change compares how much the second quantity changes for each unit of the first.", "Start by subtracting to find the change in each quantity."]);

E("u2-direct-partial-equation", 2, ["2.5"], 2, "gen", function(){
  var direct=Math.random()<0.5;
  var m=pick([2,3,4,5,6,7,8,9,10,11,12,13,15,18,20,25]); var b=direct?0:pick([2,3,4,5,6,8,10,12,15,18,20,25,30,40,50]);
  var eq=u2EqTex(m,b);
  var combos=[
    {t:"Direct variation: the equation has no added constant, so the graph passes through the origin.", key:"dir"},
    {t:"Direct variation: the equation has a fixed starting value added on.", key:"dirFix"},
    {t:"Partial variation: the equation has no added constant, so the graph passes through the origin.", key:"parOrg"},
    {t:"Partial variation: the equation has a fixed starting value added on.", key:"par"}
  ];
  var key=direct?"dir":"par";
  var correct=combos.filter(function(c){return c.key===key;})[0];
  var opts=combos.filter(function(c){return c.key!==key;}).map(function(c){return {t:c.t, fb:"That statement mixes the label with the wrong feature: check whether an amount is added to the \\(x\\) term."};});
  return mcq("Identify the relationship in the equation \\("+eq+"\\).",
    {t:correct.t, fb:"Yes: the label and the reason both match the equation."}, opts,
    direct?"In \\("+eq+"\\) there is no added constant, so when \\(x = 0\\), \\(y = 0\\): the graph passes through the origin. The answer is <b>direct variation</b>.":"In \\("+eq+"\\) the added "+b+" is a fixed starting value, so when \\(x = 0\\), \\(y = "+b+"\\). The answer is <b>partial variation</b>.",
    {m:m,b:b,direct:direct?1:0});
}, ["Look at what happens when the input is zero.", "Start by checking whether the equation has an added constant term."]);

E("u2-direct-partial-graph", 2, ["2.5"], 2, "gen", function(){
  var direct=Math.random()<0.5;
  var scenesG=[
    {txt:"The graph shows pay against hours worked for a part-time job.", xl:"hours", yl:"pay ($)"},
    {txt:"The graph shows the total cost against the number of items bought.", xl:"items", yl:"cost ($)"},
    {txt:"The graph shows the distance travelled against time for a delivery bike.", xl:"time (h)", yl:"distance (km)"},
    {txt:"The graph shows the water in a tank against filling time.", xl:"time (min)", yl:"volume (L)"},
    {txt:"The graph shows a plant's height against weeks of growth.", xl:"weeks", yl:"height (cm)"}
  ];
  var scG=pick(scenesG);
  var m=pick([1,2,3]); var b=direct?0:pick([1,2,3,4,5,6]);
  var pts=[]; for(var x=0;x<=4;x++)pts.push([x,m*x+b]);
  var combos=[
    {t:"Direct variation: the line passes through the origin.", key:"dir"},
    {t:"Direct variation: the line starts above the origin.", key:"dirUp"},
    {t:"Partial variation: the line passes through the origin.", key:"parOrg"},
    {t:"Partial variation: the line starts above the origin.", key:"par"}
  ];
  var key=direct?"dir":"par";
  var correct=combos.filter(function(c){return c.key===key;})[0];
  var opts=combos.filter(function(c){return c.key!==key;}).map(function(c){return {t:c.t, fb:"That pairing does not match the graph: check where the line meets the \\(y\\) axis."};});
  var q=mcq(scG.txt+" Identify its type of variation.",
    {t:correct.t, fb:"Yes: where the line meets the \\(y\\) axis decides the type."}, opts,
    direct?"The line passes through \\((0, 0)\\), so there is no fixed starting value. The answer is <b>direct variation</b>.":"The line meets the \\(y\\) axis at \\((0, "+b+")\\), a fixed starting value of "+b+". The answer is <b>partial variation</b>.",
    {m:m,b:b,direct:direct?1:0});
  q.figure=u2GridFig(5,4*m+b+1,pts,[0,b,4,4*m+b],null,scG.xl,scG.yl);
  return q;
}, ["Variation type is decided by the starting value on the graph.", "Start by finding where the line meets the vertical axis."]);

E("u2-table-missing", 2, ["2.6"], 2, "gen", function(){
  var m=pick([2,3,4,5,6]); var b=pick([1,2,3,4,7,9]);
  var xs=[0,1,2,3,4]; var k=ri(1,4); var xk=xs[k]; var ans=m*xk+b;
  var rows=[["x"].concat(xs.map(String)),["y"].concat(xs.map(function(x,i){return i===k?"?":String(m*x+b);}))];
  function O(v,fb){ return {t:String(v), fb:fb}; }
  var pool=[
    {v:m*xk, fb:"That multiplies by the coefficient but leaves out the added "+b+"."},
    {v:m*(xk+b), fb:"That multiplies after adding, which reverses the order in the equation."},
    {v:xk+b, fb:"That adds the input and the added amount instead of following the equation."},
    {v:ans+m, fb:"That adds the coefficient "+m+" a second time after computing the value."},
    {v:b*xk, fb:"That uses the added amount "+b+" as the multiplier instead of the coefficient "+m+"."},
    {v:ans+2, fb:"That is 2 more than the substituted result: recheck the arithmetic."},
    {v:ans+5, fb:"That is 5 more than the substituted result: recheck the arithmetic."},
    {v:ans-3, fb:"That is 3 less than the substituted result: recheck the arithmetic."},
    {v:(m+1)*xk+b, fb:"That uses a coefficient of "+(m+1)+" instead of "+m+"."}
  ];
  var seenD={}; seenD[ans]=1; var opts=[];
  pool.forEach(function(c){ if(opts.length<3&&!seenD[c.v]){ seenD[c.v]=1; opts.push(O(c.v,c.fb)); } });
  var q=mcq("Use the equation \\("+u2EqTex(m,b)+"\\) and the table of values. What is the missing value of \\(y\\) when \\(x = "+xk+"\\)?",
    O(ans,"Yes: substitute "+xk+" into the equation and follow the order of operations."), opts,
    "\\[ \\begin{aligned} y &= "+m+"("+xk+") + "+b+" \\\\ &= "+(m*xk)+" + "+b+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {m:m,b:b,xk:xk});
  q.figure=u2TableFig(rows);
  return q;
}, ["A table of values is built by substituting each input into the equation.", "Start by putting the given input value into the equation."]);

E("u2-pattern-differences", 2, ["2.1","2.2"], 2, "gen", function(){
  var linear=Math.random()<0.5; var seq, desc;
  var ctxP=pick(["tile counts for five figures","bead counts in five rows of a design","block counts in five stacks","sticker counts on five pages","chair counts in five rows of a hall"]);
  if(linear){ var a=pick([3,4,5,6,7,8,9,11,12,14,16,18,21,25]); var d=pick([2,3,4,5,6,7,8,9,11]); seq=[0,1,2,3,4].map(function(i){return a+i*d;}); desc="gaps of "+d; }
  else { var kind=ri(1,3); if(kind===1){ var a2=pick([1,2,3,4,5,6]); seq=[0,1,2,3,4].map(function(i){return a2+i*i;}); } else if(kind===2){ var a3=pick([2,3,4,5,7,9]); seq=[a3,a3+2,a3+6,a3+12,a3+20]; } else { var a4=pick([1,2,3,5]); var r4=pick([2,3]); seq=[0,1,2,3,4].map(function(i){return a4*Math.pow(r4,i);}); } desc="growing gaps"; }
  var combos=[
    {t:"The first differences are constant, so the pattern is linear.", key:"constLin"},
    {t:"The first differences are constant, so the pattern is nonlinear.", key:"constNon"},
    {t:"The first differences change, so the pattern is linear.", key:"changeLin"},
    {t:"The first differences change, so the pattern is nonlinear.", key:"changeNon"}
  ];
  var key=linear?"constLin":"changeNon";
  var correct=combos.filter(function(c){return c.key===key;})[0];
  var opts=combos.filter(function(c){return c.key!==key;}).map(function(c){return {t:c.t, fb:"That pairing does not fit: compute the first differences first, then match the type."};});
  var diffs=[]; for(var i=1;i<seq.length;i++)diffs.push(seq[i]-seq[i-1]);
  return mcq("A pattern of "+ctxP+" is: "+seq.join(", ")+". Which statement about the pattern is correct?",
    {t:correct.t, fb:"Yes: the first differences are "+diffs.join(", ")+"."}, opts,
    "First differences: "+diffs.join(", ")+". "+(linear?"They are all equal, which is the mark of a linear pattern.":"They change, which is the mark of a nonlinear pattern.")+" The answer is <b>"+(linear?"the first differences are constant, so the pattern is linear":"the first differences change, so the pattern is nonlinear")+"</b>.",
    {linear:linear?1:0,seq:seq.join("/")});
}, ["First differences are the gaps between consecutive terms.", "Start by subtracting each term from the next one."]);

E("u2-write-equation-context", 2, ["2.8","2.5"], 2, "gen", function(){
  var scenes=[
    {txt:"A taxi ride charges a pickup fee of ${B} plus ${M} per kilometre driven. Let \\(d\\) be the distance in kilometres and \\(C\\) the total cost in dollars.", v:"d", out:"C"},
    {txt:"A plumber charges a call-out fee of ${B} plus ${M} per hour of work. Let \\(h\\) be the hours worked and \\(C\\) the total cost in dollars.", v:"h", out:"C"},
    {txt:"A gym charges a joining fee of ${B} plus ${M} per month. Let \\(m\\) be the number of months and \\(C\\) the total cost in dollars.", v:"m", out:"C"},
    {txt:"A hall rental charges a booking fee of ${B} plus ${M} per guest. Let \\(g\\) be the number of guests and \\(C\\) the total cost in dollars.", v:"g", out:"C"},
    {txt:"A phone plan charges a base fee of ${B} plus ${M} per gigabyte of extra data. Let \\(g\\) be the gigabytes used and \\(C\\) the total cost in dollars.", v:"g", out:"C"}
  ];
  var sc=pick(scenes); var M=pick([2,3,4,5,6,8,10,12,15]); var B=pick([10,15,20,25,30,40,50,60]);
  var gB=0; while(B===M&&gB++<30)B=pick([10,15,20,25,30,40,50,60]); if(B===M)B=M+10;
  var prompt=sc.txt.replace("{B}",B).replace("{M}",M)+" Which equation gives the total cost?";
  function E2(eq,fb){ return {t:"\\("+eq+"\\)", fb:fb}; }
  var correct=E2(sc.out+" = "+M+sc.v+" + "+B, "Yes: the rate multiplies the changing quantity and the fee is added once.");
  var opts=[
    E2(sc.out+" = "+B+sc.v+" + "+M, "That swaps the roles: the fee is charged once, not per unit."),
    E2(sc.out+" = "+M+sc.v+" - "+B, "The fee is added to the bill, not subtracted."),
    E2(sc.out+" = "+(M+B)+sc.v, "That charges the fee again for every unit.")
  ];
  return mcq(prompt, correct, opts,
    "The cost per unit, $"+M+", multiplies the number of units, and the one-time fee of $"+B+" is added. \\[ "+sc.out+" = "+M+sc.v+" + "+B+" \\] The answer is <b>\\("+sc.out+" = "+M+sc.v+" + "+B+"\\)</b>.",
    {M:M,B:B});
}, ["Separate the part that changes with the quantity from the part charged once.", "Start by identifying the rate and the one-time fee."]);

E("u2-apply-formula", 2, ["2.7"], 2, "gen", function(){
  var scenes=[
    {txt:"The cost of renting a boat is given by \\(C = {M}h + {B}\\), where \\(h\\) is the hours rented and \\(C\\) is the cost in dollars.", v:"h", unit:" dollars"},
    {txt:"The volume of water in a tank is given by \\(V = {M}t + {B}\\), where \\(t\\) is the minutes of filling and \\(V\\) is the volume in litres.", v:"t", unit:" litres"},
    {txt:"A worker's pay is given by \\(P = {M}h + {B}\\), where \\(h\\) is the hours worked and \\(P\\) is the pay in dollars, including a tool allowance in the added amount.", v:"h", unit:" dollars"},
    {txt:"The distance a bus has travelled is given by \\(D = {M}t + {B}\\), where \\(t\\) is the hours of travel and \\(D\\) is the distance in kilometres from the depot route start.", v:"t", unit:" kilometres"}
  ];
  var sc=pick(scenes); var M=pick([5,8,10,12,15,20,25,40,60]); var B=pick([10,20,30,50,80]);
  var x=pick([2,3,4,5,6,7,8]); var ans=M*x+B;
  var prompt=sc.txt.replace("{M}",M).replace("{B}",B)+" Find the value when \\("+sc.v+" = "+x+"\\).";
  function O(v,fb){ return {t:fmt(v), fb:fb}; }
  var poolA=[
    {v:M*x, fb:"That leaves out the added amount of "+B+"."},
    {v:M+B+x, fb:"That adds all three numbers instead of multiplying first."},
    {v:M*(x+B), fb:"That multiplies the added amount as well, which the formula does not do."},
    {v:ans+M, fb:"That adds the coefficient a second time after computing the value."},
    {v:ans+10, fb:"That is 10 more than the substituted result: recheck the arithmetic."}
  ];
  var seenA={}; seenA[ans]=1; var opts=[];
  poolA.forEach(function(c){ if(opts.length<3&&!seenA[c.v]){ seenA[c.v]=1; opts.push(O(c.v,c.fb)); } });
  return mcq(prompt, O(ans,"Yes: multiply first, then add."), opts,
    "\\[ \\begin{aligned} \\text{Value} &= "+M+"("+x+") + "+B+" \\\\ &= "+(M*x)+" + "+B+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+sc.unit+"</b>.",
    {M:M,B:B,x:x});
}, ["Applying a formula means substituting the given value and following the order of operations.", "Start by replacing the variable with the given value."]);

E("u2-cr-table-value", 2, ["2.6"], 2, "gen", function(){
  var m=pick([2,3,4,5,6,7]); var b=pick([1,3,4,6,8,11,14]); var x=pick([2,3,4,5,6,7,8,9]);
  var ans=m*x+b;
  return numq("For the linear relation \\("+u2EqTex(m,b)+"\\), a table of values is being built. Find the value of \\(y\\) when \\(x = "+x+"\\). Show your work.",
    ans, 0.01,
    "\\[ \\begin{aligned} y &= "+m+"("+x+") + "+b+" \\\\ &= "+(m*x)+" + "+b+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {m:m,b:b,x:x});
}, ["Substitute the given input into the equation.", "Start by replacing the variable with the given value, then multiply before adding."]);

E("u2-cr-slope-rate", 2, ["2.4"], 2, "gen", function(){
  var scenes=[
    {txt:"A tank held {Y1} L of water after {X1} minutes of filling and {Y2} L after {X2} minutes.", unit:"litres per minute"},
    {txt:"A worker earned ${Y1} for {X1} hours of work and ${Y2} for {X2} hours of work at the same hourly rate with the same bonus added each week.", unit:"dollars per hour"},
    {txt:"A cyclist was {Y1} km from the start after {X1} hours and {Y2} km from the start after {X2} hours, riding at a steady pace on a route that began partway along the trail.", unit:"kilometres per hour"}
  ];
  var sc=pick(scenes); var m=pick([3,4,5,6,8,10,12,15,20]);
  var x1=pick([1,2,3,4]); var x2=x1+pick([2,3,5]); var base=m*ri(0,4);
  var y1=m*x1+base, y2=m*x2+base;
  return numq(sc.txt.replace("{Y1}",y1).replace("{X1}",x1).replace("{Y2}",y2).replace("{X2}",x2)+" Find the rate of change, in "+sc.unit+". Show your work.",
    m, 0.01,
    "\\[ \\begin{aligned} \\text{Rate} &= \\frac{"+y2+" - "+y1+"}{"+x2+" - "+x1+"} = \\frac{"+(y2-y1)+"}{"+(x2-x1)+"} = "+m+" \\end{aligned} \\] The answer is <b>"+m+" "+sc.unit+"</b>.",
    {m:m,x1:x1,x2:x2});
}, ["Rate of change is the change in one quantity divided by the change in the other.", "Start by finding the change in each quantity between the two given points."]);

E("u2-cr-solve-input", 2, ["2.7"], 2, "gen", function(){
  var scenes=[
    {txt:"The total cost of a repair is given by \\(C = {M}h + {B}\\), where \\(h\\) is the hours of labour. The total bill is ${OUT}.", v:"hours of labour"},
    {txt:"The amount of water in a pool is given by \\(V = {M}t + {B}\\), where \\(t\\) is the minutes of filling. The pool holds {OUT} L at the moment checked.", v:"minutes of filling"},
    {txt:"A savings account balance is given by \\(S = {M}w + {B}\\), where \\(w\\) is the weeks of saving. The balance reaches ${OUT}.", v:"weeks of saving"}
  ];
  var sc=pick(scenes); var M=pick([5,8,10,12,15,20,25]); var B=pick([10,20,30,40,50,60,100]);
  var x=pick([3,4,5,6,7,8,9,10]); var out=M*x+B;
  return numq(sc.txt.replace("{M}",M).replace("{B}",B).replace("{OUT}",out)+" Find the value of the input variable (the "+sc.v+"). Show your work.",
    x, 0.01,
    "\\[ \\begin{aligned} "+out+" &= "+M+"x + "+B+" \\\\ "+out+" - "+B+" &= "+M+"x \\\\ "+(out-B)+" &= "+M+"x \\\\ x &= "+x+" \\end{aligned} \\] The answer is <b>"+x+"</b>.",
    {M:M,B:B,x:x});
}, ["Work backwards from the given output using inverse operations.", "Start by subtracting the added amount from the total."]);

E("u2-wide-mixed", 2, ["2.8","2.7","2.4"], 3, "gen", function(){
  var mode=ri(1,4);
  if(mode===1){
    var m=pick([1,2,3]); var b=pick([0,1,2,3,5]);
    var pts=[]; for(var x=0;x<=4;x++)pts.push([x,m*x+b]);
    function OE(mm,bb,fb){ return {t:"\\("+u2EqTex(mm,bb)+"\\)", fb:fb}; }
    var pool1=[
      {mm:b, bb:m, fb:"That swaps the slope and the intercept."},
      {mm:m, bb:b+2, fb:"The intercept shown on the graph is "+b+", not "+(b+2)+"."},
      {mm:m+1, bb:b, fb:"The line rises "+m+" for each step of 1, not "+(m+1)+"."},
      {mm:m, bb:b+1, fb:"The intercept shown on the graph is "+b+", not "+(b+1)+"."},
      {mm:m+2, bb:b, fb:"The line rises "+m+" for each step of 1, not "+(m+2)+"."}
    ];
    var seen1={}; seen1[u2EqTex(m,b)]=1; var opts=[];
    pool1.forEach(function(c){ var s=u2EqTex(c.mm,c.bb); if(opts.length<3&&!seen1[s]){ seen1[s]=1; opts.push(OE(c.mm,c.bb,c.fb)); } });
    var q=mcq("The graph shows a linear relation. Which equation describes it?",
      OE(m,b,"Yes: the line meets the vertical axis at "+b+" and rises "+m+" per step."), opts,
      "The intercept is "+b+" and the slope is rise over run, which is "+m+". \\[ "+u2EqTex(m,b)+" \\] The answer is <b>\\("+u2EqTex(m,b)+"\\)</b>.", {mode:1,m:m,b:b});
    q.figure=u2GridFig(5,4*m+b+1,pts,[0,b,4,4*m+b],null,"x","y");
    return q;
  }
  if(mode===2){
    var m2=pick([2,3,4,5]); var b2=pick([2,4,6,10,14]);
    var xs=[0,1,2,3]; var rows=[["x"].concat(xs.map(String)),["y"].concat(xs.map(function(x){return String(m2*x+b2);}))];
    var pool2=[
      {mm:b2, bb:m2, fb:"That swaps the starting value and the rate of change."},
      {mm:m2, bb:b2+m2, fb:"The starting value in the table (at \\(x = 0\\)) is "+b2+"."},
      {mm:m2+1, bb:b2, fb:"The first differences in the table are "+m2+", not "+(m2+1)+"."},
      {mm:m2, bb:b2+1, fb:"The starting value in the table (at \\(x = 0\\)) is "+b2+"."},
      {mm:m2+2, bb:b2, fb:"The first differences in the table are "+m2+", not "+(m2+2)+"."}
    ];
    var seen2={}; seen2[u2EqTex(m2,b2)]=1; var opts2=[];
    pool2.forEach(function(c){ var s=u2EqTex(c.mm,c.bb); if(opts2.length<3&&!seen2[s]){ seen2[s]=1; opts2.push({t:"\\("+s+"\\)", fb:c.fb}); } });
    var q2=mcq("The table of values shows a linear relation. Which equation describes it?",
      {t:"\\("+u2EqTex(m2,b2)+"\\)", fb:"Yes: the value at \\(x = 0\\) is the intercept and the first differences give the slope."}, opts2,
      "At \\(x = 0\\), \\(y = "+b2+"\\), so the intercept is "+b2+". The first differences are "+m2+", so the slope is "+m2+". \\[ "+u2EqTex(m2,b2)+" \\] The answer is <b>\\("+u2EqTex(m2,b2)+"\\)</b>.", {mode:2,m:m2,b:b2});
    q2.figure=u2TableFig(rows);
    return q2;
  }
  if(mode===3){
    var M=pick([6,9,11,14,18,22,30]); var B=pick([5,15,25,35,45]); var x3=pick([3,4,5,6,7,9]); var ans=M*x3+B;
    function O3(v,fb){ return {t:String(v), fb:fb}; }
    var pool3=[
      {v:M*x3, fb:"That leaves out the fixed "+B+"."},
      {v:(M+B)*x3, fb:"That charges the fixed amount every hour."},
      {v:M+B+x3, fb:"That only adds the three numbers."},
      {v:ans+M, fb:"That adds the hourly rate a second time after computing the cost."},
      {v:ans+15, fb:"That is 15 more than the substituted result: recheck the arithmetic."}
    ];
    var seen3={}; seen3[ans]=1; var opts3=[];
    pool3.forEach(function(c){ if(opts3.length<3&&!seen3[c.v]){ seen3[c.v]=1; opts3.push(O3(c.v,c.fb)); } });
    return mcq("A service charges according to \\(C = "+M+"h + "+B+"\\), where \\(h\\) is hours. What is the cost for "+x3+" hours?",
      O3(ans,"Yes: substitute and follow the order of operations."),
      opts3,
      "\\[ \\begin{aligned} C &= "+M+"("+x3+") + "+B+" \\\\ &= "+(M*x3)+" + "+B+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.", {mode:3,M:M,B:B,x:x3});
  }
  var M4=pick([7,9,13,16,24]); var B4=pick([12,18,24,36,48]); var x4=pick([3,4,5,6,8]); var out4=M4*x4+B4;
  function O4(v,fb){ return {t:String(v), fb:fb}; }
  var pool4=[
    {v:x4+2, fb:"That is 2 too many: check the division after subtracting "+B4+"."},
    {v:x4-1, fb:"That is 1 too few: "+(out4-B4)+" divided by "+M4+" is "+x4+"."},
    {v:Math.round(out4/M4), fb:"That divides the whole total by the rate and forgets the fixed amount."},
    {v:x4+4, fb:"That is 4 too many: subtract the fixed amount first, then divide."},
    {v:x4+1, fb:"That is 1 too many: "+(out4-B4)+" divided by "+M4+" is "+x4+"."}
  ];
  var seen4={}; seen4[x4]=1; var opts4=[];
  pool4.forEach(function(c){ if(opts4.length<3&&c.v>0&&!seen4[c.v]){ seen4[c.v]=1; opts4.push(O4(c.v,c.fb)); } });
  return mcq("A club's total cost is \\(C = "+M4+"n + "+B4+"\\), where \\(n\\) is the number of members on a trip. The total cost is "+out4+". How many members went?",
    O4(x4,"Yes: subtract the fixed amount, then divide by the per-member rate."),
    opts4,
    "\\[ \\begin{aligned} "+out4+" &= "+M4+"n + "+B4+" \\\\ n &= \\frac{"+out4+" - "+B4+"}{"+M4+"} = \\frac{"+(out4-B4)+"}{"+M4+"} = "+x4+" \\end{aligned} \\] The answer is <b>"+x4+"</b>.", {mode:4,M:M4,B:B4,x:x4});
}, ["Decide first whether the question gives a graph, a table, an output or an input.", "Start by pulling out the slope and the starting value, or the given value to substitute."]);

E("u2-cr-write-equation", 2, ["2.8","2.5"], 3, "gen", function(){
  var scenes=[
    {txt:"A kayak rental charges a deposit of ${B} plus ${M} per hour. Let \\(h\\) be the hours rented and \\(C\\) the total cost in dollars.", v:"h", out:"C"},
    {txt:"A moving company charges a truck fee of ${B} plus ${M} per kilometre. Let \\(d\\) be the kilometres driven and \\(C\\) the total cost in dollars.", v:"d", out:"C"},
    {txt:"A caterer charges a setup fee of ${B} plus ${M} per guest. Let \\(g\\) be the number of guests and \\(C\\) the total cost in dollars.", v:"g", out:"C"},
    {txt:"A ski rental charges a fitting fee of ${B} plus ${M} per day. Let \\(d\\) be the days rented and \\(C\\) the total cost in dollars.", v:"d", out:"C"}
  ];
  var sc=pick(scenes); var M=pick([4,6,8,9,10,12,15,18,20]); var B=pick([10,15,20,25,30,40,50]);
  var core=sc.out+" = "+M+sc.v+" + "+B;
  var accepted=[core, sc.out+"="+M+sc.v+"+"+B, sc.out+" = "+M+sc.v+"+"+B, sc.out+"="+M+sc.v+" + "+B, core.toLowerCase()];
  return textq(sc.txt.replace("{B}",B).replace("{M}",M)+" Write the equation for the total cost, in the form shown by this pattern: C = (rate)(variable) + (fee), using the variables named in the problem.",
    accepted,
    "The rate, $"+M+", multiplies the variable, and the one-time fee of $"+B+" is added once. This is partial variation because of the fixed fee. \\[ "+core+" \\] The answer is <b>"+core+"</b>.",
    {M:M,B:B});
}, ["Build the equation from a rate part and a fixed part.", "Start with the amount charged per unit times the variable."]);

E("u2-cr-budget-solve", 2, ["2.7","2.8"], 3, "gen", function(){
  var scenes=[
    {txt:"A trailer rental charges a booking fee of ${B} plus ${M} per day. A customer pays a total of ${OUT}.", v:"days", unit:"days"},
    {txt:"A boat tour charges a harbour fee of ${B} per booking plus ${M} per passenger. A booking totals ${OUT}.", v:"passengers", unit:"passengers"},
    {txt:"A print shop charges a setup fee of ${B} plus ${M} per poster. An order totals ${OUT}.", v:"posters", unit:"posters"},
    {txt:"A tutor charges a materials fee of ${B} plus ${M} per session. A student pays a total of ${OUT}.", v:"sessions", unit:"sessions"}
  ];
  var sc=pick(scenes); var M=pick([12,15,18,20,24,25,30,35,40]); var B=pick([15,20,25,30,40,50,60]);
  var x=pick([3,4,5,6,7,8,9]); var out=M*x+B;
  return numq(sc.txt.replace("{B}",B).replace("{M}",M).replace("{OUT}",out)+" First write an equation for the total, then find how many "+sc.v+" the total covers. Give the number of "+sc.unit+" as your answer and show your work.",
    x, 0.01,
    "\\[ \\begin{aligned} C &= "+M+"n + "+B+" \\\\ "+out+" &= "+M+"n + "+B+" \\\\ "+M+"n &= "+out+" - "+B+" = "+(out-B)+" \\\\ n &= "+x+" \\end{aligned} \\] The answer is <b>"+x+" "+sc.unit+"</b>.",
    {M:M,B:B,x:x});
}, ["Write the cost equation first, then solve it for the unknown count.", "Start by setting the total equal to the rate times the count plus the fee."]);

/* ----- bank-u3.js ----- */
// Math 3202 Unit 3 Graphing Data question bank
// CRMARKS: u3-interpolate-cr=3
// CRMARKS: u3-extrapolate-cr=4
// CRMARKS: u3-graph-reading-cr=5
// CRMARKS: u3-predict-advanced-cr=4
// CRMARKS: u3-scale-design-cr=5
/* ===== Unit 3 ===== */
/* Math 3202 Unit 3: Graphing Data (6.11-6.15). Helpers prefixed u3. */
function u3Plot(pts, xMax, yMax, xLab, yLab, line){
  var W=264,H=216,ox=38,oy=180,sx=(W-ox-12)/xMax,sy=(oy-22)/yMax;
  var xStep=xMax>10?2:1, yStep=yMax>50?10:(yMax>20?5:2);
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  for(var gy=0;gy<=yMax;gy+=yStep){ var Y=oy-gy*sy; s+='<line x1="'+ox+'" y1="'+fmt(Y,1)+'" x2="'+(W-10)+'" y2="'+fmt(Y,1)+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+(ox-5)+'" y="'+fmt(Y+3,1)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="end">'+gy+'</text>'; }
  for(var gx=0;gx<=xMax;gx+=xStep){ var X=ox+gx*sx; s+='<line x1="'+fmt(X,1)+'" y1="18" x2="'+fmt(X,1)+'" y2="'+oy+'" stroke="#cfe4d6" stroke-width="1"/>';
    s+='<text x="'+fmt(X,1)+'" y="'+(oy+13)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+gx+'</text>'; }
  s+='<line x1="'+ox+'" y1="18" x2="'+ox+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  s+='<line x1="'+ox+'" y1="'+oy+'" x2="'+(W-10)+'" y2="'+oy+'" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  if(line){ var sp=pts.slice().sort(function(a,b){return a[0]-b[0];});
    for(var i=0;i<sp.length-1;i++){ s+='<line x1="'+fmt(ox+sp[i][0]*sx,1)+'" y1="'+fmt(oy-sp[i][1]*sy,1)+'" x2="'+fmt(ox+sp[i+1][0]*sx,1)+'" y2="'+fmt(oy-sp[i+1][1]*sy,1)+'" stroke="'+FIG_INK+'" stroke-width="2"/>'; } }
  pts.forEach(function(p){ s+='<circle cx="'+fmt(ox+p[0]*sx,1)+'" cy="'+fmt(oy-p[1]*sy,1)+'" r="3.6" fill="'+FIG_ACC+'"/>'; });
  if(xLab) s+='<text x="'+fmt(ox+xMax*sx/2,1)+'" y="'+(H-2)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+xLab+'</text>';
  if(yLab) s+='<text x="11" y="'+fmt(oy-yMax*sy/2,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle" transform="rotate(-90 11 '+fmt(oy-yMax*sy/2,1)+')">'+yLab+'</text>';
  return s+'</svg>';
}
function u3Noise(a){ return (Math.random()*2-1)*a; }
function u3NumDist(correct, cands, step){
  var out=[], seen={}; seen[fmt(correct)]=1;
  cands.forEach(function(c){ var k=fmt(c.v); if(out.length<3 && isFinite(c.v) && !seen[k]){ seen[k]=1; out.push({t:k, fb:c.fb}); } });
  var offs=[step,-step,2*step,-2*step,3*step,-3*step], i=0;
  while(out.length<3 && i<offs.length){ var v=correct+offs[i], k=fmt(v); i++;
    if(!seen[k]){ seen[k]=1; out.push({t:k, fb:"That value does not fit the pattern of the plotted points: check the reading or the calculation again."}); } }
  return out;
}
var u3Ctx=[
  {x:"Weeks", y:"Plants sold", who:"A garden centre in Mount Pearl records its sales over several weeks."},
  {x:"Days", y:"Cups of soup sold", who:"A cafe in Gander records its soup sales over several days."},
  {x:"Hours worked", y:"Items packed", who:"A warehouse in Corner Brook records packing over several shifts."},
  {x:"Weeks", y:"Lessons completed", who:"A music teacher in Clarenville records lessons over several weeks."},
  {x:"Days", y:"Trail passes sold", who:"A park office in Grand Falls-Windsor records trail passes over several days."},
  {x:"Months", y:"Members joined", who:"A community gym in Carbonear records new members over several months."},
  {x:"Weeks", y:"Bookings taken", who:"A tour operator in Twillingate records bookings over several weeks."},
  {x:"Days", y:"Repairs finished", who:"A bike shop in Stephenville records repairs over several days."}
];
function u3TrendPts(kind){
  var pts=[], i, x, y;
  for(i=0;i<9;i++){ x=i+1;
    if(kind==="inc") y=6+4.2*x+u3Noise(2.2);
    else if(kind==="dec") y=46-4.2*x+u3Noise(2.2);
    else if(kind==="linPos") y=5+4.5*x+u3Noise(2);
    else if(kind==="linNeg") y=47-4.5*x+u3Noise(2);
    else if(kind==="curve") y=4+0.55*x*x+u3Noise(1.2);
    else if(kind==="posStrong") y=5+4.6*x+u3Noise(1.1);
    else if(kind==="posWeak") y=10+3.4*x+u3Noise(6.5);
    else if(kind==="negStrong") y=47-4.6*x+u3Noise(1.1);
    else if(kind==="negWeak") y=42-3.4*x+u3Noise(6.5);
    else if(kind==="curveDown") y=48-0.55*x*x+u3Noise(1.2);
    else y=14+Math.random()*24;
    y=Math.max(1,Math.min(49,Math.round(y*10)/10)); pts.push([x,y]);
  }
  return pts;
}

E("u3-trend-describe", 3, ["6.11"], 1, "gen", function(){
  var ctx=pick(u3Ctx), kind=pick(["inc","dec","none"]);
  var pts=u3TrendPts(kind);
  var incT="As "+ctx.x.toLowerCase()+" increase, "+ctx.y.toLowerCase()+" tend to increase",
      decT="As "+ctx.x.toLowerCase()+" increase, "+ctx.y.toLowerCase()+" tend to decrease",
      noneT="There is no clear pattern linking "+ctx.x.toLowerCase()+" and "+ctx.y.toLowerCase(),
      curveT=ctx.y+" rise quickly at first, then fall back toward the start";
  var map={inc:{t:incT,fb:"Yes: the points climb from left to right, so the second quantity tends to grow with the first."},
           dec:{t:decT,fb:"Yes: the points fall from left to right, so the second quantity tends to shrink as the first grows."},
           none:{t:noneT,fb:"Yes: the points are scattered with no steady climb or fall from left to right."}};
  var all={inc:{t:incT,fb:"The points do not climb steadily: read the overall direction from left to right, not a few points."},
           dec:{t:decT,fb:"The points do not fall steadily: read the overall direction from left to right, not a few points."},
           none:{t:noneT,fb:"A pattern is present here: look at the overall direction of the cloud of points."},
           curve:{t:curveT,fb:"The points do not rise and then fall back: follow the overall direction across the whole plot."}};
  var keys=["inc","dec","none","curve"].filter(function(k){return k!==kind;});
  var opts=keys.map(function(k){return all[k];});
  var q=mcq(ctx.who+" The scatter plot shows "+ctx.y.toLowerCase()+" against "+ctx.x.toLowerCase()+". Which statement best describes the trend?",
    map[kind], opts,
    "Read the cloud of points from left to right and judge its overall direction, ignoring small wiggles. The trend is best described as follows: <b>"+map[kind].t+"</b>.",
    {kind:kind, ctx:ctx.who});
  q.figure=u3Plot(pts,10,50,ctx.x,ctx.y,false);
  return q;
}, ["Look at the overall direction of the points from left to right.", "Start by comparing the height of the points on the left with the height on the right."]);

E("u3-scatter-classify", 3, ["6.15"], 1, "gen", function(){
  var ctx=pick(u3Ctx), kind=pick(["linPos","linNeg","curve","none"]);
  var pts=u3TrendPts(kind);
  var correctTxt = kind==="none" ? "No trend" : (kind==="curve" ? "Nonlinear trend" : "Linear trend");
  var expl = kind==="none" ? "the points are scattered with no pattern to follow"
    : kind==="curve" ? "the points follow a curve that bends, not a straight band"
    : "the points follow a straight band from left to right";
  var cand=[
    {t:"Linear trend", fb:"A linear trend follows a straight band: check whether the points bend or scatter instead."},
    {t:"Nonlinear trend", fb:"A nonlinear trend follows a bending curve: check the shape the points make."},
    {t:"No trend", fb:"No trend means the points scatter with no pattern: check whether a pattern is present here."},
    {t:"A trend that cannot be sorted", fb:"Every scatter plot can be sorted as linear, nonlinear or no trend by the pattern its points make."}];
  var opts=cand.filter(function(c){return c.t!==correctTxt;});
  var q=mcq(ctx.who+" Sort this scatter plot by the trend it shows.",
    {t:correctTxt, fb:"Yes: "+expl+"."}, opts,
    "Sort by the pattern of the whole cloud of points. Here "+expl+". This scatter plot shows <b>"+correctTxt.toLowerCase()+"</b>.",
    {kind:kind});
  q.figure=u3Plot(pts,10,50,ctx.x,ctx.y,false);
  return q;
}, ["Decide whether the points follow a straight band, a curve, or no pattern.", "Start by tracing the overall shape of the cloud of points with your eye."]);

E("u3-context-graph-match", 3, ["6.13"], 1, "var", varset([
  function(){ var pts=[[0,2],[1,10],[2,18],[3,18],[4,18],[5,10],[6,2]];
    var q=mcq("The graph shows distance from home over time for one trip. Which trip does it match?",
      {t:"Walk to a shop, stay a while, then walk home", fb:"Yes: distance rises on the way there, stays level at the shop, then falls on the way home."},
      [{t:"Walk to a shop and stay there for the rest of the day", fb:"That trip would rise and then stay level: this graph falls back to the start at the end."},
       {t:"Drive in a circle around the block at a steady speed", fb:"That trip would keep changing distance in a repeating way: this graph has one rise, one level part and one fall."},
       {t:"Stay home all day and never leave the house", fb:"Staying home would keep the distance at zero the whole time: this graph rises well above zero."}],
      "The graph rises (moving away), levels off (staying at the shop), then falls back to zero (returning home). The answer is <b>Walk to a shop, stay a while, then walk home</b>.", {});
    q.figure=u3Plot(pts,6,20,"Time","Distance from home (km)",true); return q; },
  function(){ var pts=[[0,1],[1,4],[2,8],[3,11],[4,13],[5,14],[6,14]];
    var q=mcq("The graph shows the height of a tomato plant over several weeks. Which description matches the graph?",
      {t:"It grows quickly at first, then levels off", fb:"Yes: the graph climbs steeply early on and then flattens as growth slows."},
      [{t:"It grows by the same amount every week", fb:"Equal weekly growth would give a straight line: this graph bends and flattens."},
       {t:"It grows, then shrinks back to its first height", fb:"Shrinking back would bring the graph down to its starting height: this graph stays at its highest level."},
       {t:"It stays the same height for weeks, then grows", fb:"That would start flat and then climb: this graph climbs first and flattens later."}],
      "The height climbs fast in the early weeks and then the graph flattens, showing growth slowing to a stop. The answer is <b>It grows quickly at first, then levels off</b>.", {});
    q.figure=u3Plot(pts,6,16,"Weeks","Height (cm)",true); return q; },
  function(){ var pts=[[0,40],[1,32],[2,24],[3,16],[4,8],[5,2]];
    var q=mcq("The graph shows the fuel in a truck tank during a delivery run. Which description matches the graph?",
      {t:"Fuel is used steadily as the truck drives", fb:"Yes: the level falls in a steady straight line as fuel is burned."},
      [{t:"The tank is filled steadily at a depot", fb:"Filling would make the level rise: this graph falls the whole way."},
       {t:"The truck uses no fuel until the last hour", fb:"That would stay level and then drop at the end: this graph falls from the start."},
       {t:"Fuel rises and falls as the truck speeds up and slows down", fb:"This graph falls steadily in one direction: it never rises."}],
      "The fuel level falls steadily in a straight line, matching fuel being used at a steady rate. The answer is <b>Fuel is used steadily as the truck drives</b>.", {});
    q.figure=u3Plot(pts,5,50,"Hours","Fuel (L)",true); return q; },
  function(){ var pts=[[0,3],[1,9],[2,15],[3,21],[4,27],[5,33]];
    var q=mcq("The graph shows the water level in a tank as it is filled from a hose. Which description matches the graph?",
      {t:"The level rises by the same amount each minute", fb:"Yes: the graph is a straight rising line, so equal time steps add equal amounts."},
      [{t:"The level rises faster and faster each minute", fb:"That would give a curve bending upward: this graph is a straight line."},
       {t:"The level rises, then stays level while filling continues", fb:"Staying level would add a flat section: this graph rises the whole way."},
       {t:"The level starts high and drains away", fb:"Draining would make the graph fall: this graph rises from a low start."}],
      "A straight rising line means the same increase in each equal time step. The answer is <b>The level rises by the same amount each minute</b>.", {});
    q.figure=u3Plot(pts,5,40,"Minutes","Water level (cm)",true); return q; },
  function(){ var pts=[[0,18],[1,10],[2,4],[3,4],[4,10],[5,18]];
    var q=mcq("The graph shows the temperature in a greenhouse over one day. Which description matches the graph?",
      {t:"It cools, stays cold for a while, then warms up", fb:"Yes: the graph falls, levels off at its lowest, then rises back up."},
      [{t:"It warms steadily all day without a pause", fb:"Warming steadily would rise the whole way: this graph falls first."},
       {t:"It warms, stays warm for a while, then cools", fb:"That is the reverse shape: this graph starts by falling, not rising."},
       {t:"It stays at one temperature all day long", fb:"A constant temperature would be a flat line: this graph falls and rises."}],
      "The graph falls to a low level, stays there, then rises again. The answer is <b>It cools, stays cold for a while, then warms up</b>.", {});
    q.figure=u3Plot(pts,5,20,"Hours","Temperature",true); return q; },
  function(){ var pts=[[0,0],[1,6],[2,12],[3,12],[4,12],[5,12]];
    var q=mcq("The graph shows money in a savings account over several months. Which description matches the graph?",
      {t:"Deposits are made for two months, then the balance stays level", fb:"Yes: the balance rises while deposits are made, then flattens when they stop."},
      [{t:"Money is withdrawn steadily every month until the account is empty", fb:"Withdrawals would make the balance fall: this graph rises and then stays level."},
       {t:"The balance doubles every month as interest is added", fb:"Doubling would curve upward faster and faster: this graph rises straight, then flattens."},
       {t:"The balance stays level, then rises in the last month", fb:"That reverses the order: this graph rises first and levels off later."}],
      "The balance climbs for two months and then stays flat, matching deposits that stop after two months. The answer is <b>Deposits are made for two months, then the balance stays level</b>.", {});
    q.figure=u3Plot(pts,5,14,"Months","Balance ($)",true); return q; }
]), ["Read the shape of the graph in sections: rising, level or falling.", "Start by describing what the graph does from left to right in plain words."]);

E("u3-trend-strength", 3, ["6.11"], 2, "gen", function(){
  var ctx=pick(u3Ctx), kind=pick(["posStrong","posWeak","negStrong","negWeak"]);
  var pts=u3TrendPts(kind);
  var phrases={"posStrong":"Strong positive trend","posWeak":"Weak positive trend","negStrong":"Strong negative trend","negWeak":"Weak negative trend"};
  var why={"posStrong":"the points rise and hug a tight band","posWeak":"the points rise overall but spread widely around the rise",
           "negStrong":"the points fall and hug a tight band","negWeak":"the points fall overall but spread widely around the fall"};
  var opts=Object.keys(phrases).filter(function(k){return k!==kind;}).map(function(k){
    return {t:phrases[k], fb:"That choice gets the direction or the tightness wrong: judge both the direction and how tightly the points hug the pattern."}; });
  var q=mcq(ctx.who+" The scatter plot shows "+ctx.y.toLowerCase()+" against "+ctx.x.toLowerCase()+". Which description fits the trend best?",
    {t:phrases[kind], fb:"Yes: "+why[kind]+"."}, opts,
    "Judge two things: the direction of the pattern and how tightly the points follow it. Here "+why[kind]+". The answer is <b>"+phrases[kind]+"</b>.",
    {kind:kind});
  q.figure=u3Plot(pts,10,50,ctx.x,ctx.y,false);
  return q;
}, ["A trend description needs a direction and a strength.", "Start with the direction, then judge how tightly the points follow the pattern."]);

E("u3-interp-extrap-graph", 3, ["6.12"], 2, "gen", function(){
  var m=ri(2,4), b=ri(2,12), mode=pick(["interp","extrap"]);
  var pts=[]; for(var x=0;x<=5;x++) pts.push([x,m*x+b]);
  var yMax=Math.ceil((m*8+b)/10)*10;
  var xq = mode==="interp" ? pick([0.5,1.5,2.5,3.5,4.5]) : pick([6,7,8]);
  var ans=m*xq+b;
  var cands=[
    {v:m*Math.floor(xq)+b, fb:"That is the plotted value at the whole step just before: the question asks for a value using the pattern, so carry the pattern to the exact position asked."},
    {v:(m+1)*xq+b, fb:"That uses a steeper rise per step than the plotted points show: check the step pattern first."},
    {v:m*xq+b+m, fb:"That overshoots by one full step rise: apply the pattern once for the value asked, not an extra time."}];
  var opts=u3NumDist(ans,cands,m);
  var verb = mode==="interp" ? "Estimate" : "Predict, by extending the pattern,";
  var note = mode==="interp" ? "The value lies between two plotted points, so follow the pattern to the halfway position." : "The value lies beyond the plotted points, so extend the same pattern past the last point.";
  var _bo0=balOpts({t:fmt(ans), fb:"Yes: the plotted points rise by "+m+" litres each hour from a start of "+b+" litres, and that pattern gives "+fmt(ans)+" litres."}, opts); var q=mcq("A tank fills at a steady rate. The graph shows the volume of water after each hour. "+verb+" the volume after \\("+fmt(xq,1)+"\\) hours, in litres.", _bo0[0], _bo0[1],
    "The plotted points rise by \\("+m+"\\) litres per hour from \\("+b+"\\) litres. "+note+" \\[ \\begin{aligned} \\text{Volume} &= "+b+" + "+m+" \\times "+fmt(xq,1)+" \\\\ &= "+fmt(ans)+"\\text{ L} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" L</b>.",
    {m:m,b:b,xq:xq,mode:mode});
  q.figure=u3Plot(pts,5,yMax,"Hours","Volume (L)",true);
  return q;
}, ["Interpolation reads between plotted points; extrapolation extends the pattern beyond them.", "Start by finding how much the values rise from one plotted point to the next."]);

E("u3-context-match-gen", 3, ["6.13"], 2, "gen", function(){
  var shapes=[
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((3+2.6*x)*s*10)/10]); return p; },
     good:["Distance from a depot on a steady delivery drive","Water level in a tank filled at a steady rate","Savings balance with the same deposit each week"],
     why:"the graph rises steadily in a straight line"},
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((x<=3?3+5*x:18)*s*10)/10]); return p; },
     good:["Height of a plant that grows, then stops growing","Water level in a tank that fills, then stays full","Temperature of a room that warms, then holds steady"],
     why:"the graph rises and then levels off"},
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((x<=3?4+4.5*x:17.5-4.5*(x-3))*s*10)/10]); return p; },
     good:["Height of a ball thrown up and caught on the way down","Distance from home on a trip out and straight back","Temperature on a day that warms, then cools again"],
     why:"the graph rises and then falls"},
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((x<=3?20-4.5*x:6.5+4.5*(x-3))*s*10)/10]); return p; },
     good:["Water level in a tank drained, then refilled","Temperature on a night that cools, then warms at sunrise","Charge in a battery that is used, then recharged"],
     why:"the graph falls and then rises"},
    {pts:function(s){ var p=[]; for(var x=0;x<=6;x++) p.push([x, Math.round((20-2.8*x)*s*10)/10]); return p; },
     good:["Fuel left in a tank during a steady drive","Distance from home when walking straight back home","Money left in a gift card after steady spending"],
     why:"the graph falls steadily in a straight line"}];
  var si=ri(0,shapes.length-1), sh=shapes[si], scale=pick([0.8,0.9,1,1.1]);
  var pts=sh.pts(scale);
  var yMax=Math.ceil((Math.max.apply(null,pts.map(function(p){return p[1];}))+4)/5)*5;
  var correctTxt=pick(sh.good);
  var pool=[]; shapes.forEach(function(o,idx){ if(idx!==si) pool.push(pick(o.good)); });
  var opts=pool.slice(0,3).map(function(t){ return {t:t, fb:"That context would draw a different shape: compare its story with the rising, level and falling parts of this graph."}; });
  var q=mcq("The graph shows a quantity changing over time. Which context matches the shape of the graph?",
    {t:correctTxt, fb:"Yes: "+sh.why+", which matches that story."}, opts,
    "Describe the shape first: "+sh.why+". The context whose story follows that shape is the match. The answer is <b>"+correctTxt+"</b>.",
    {shape:si, scale:scale});
  q.figure=u3Plot(pts,6,yMax,"Time","Amount",true);
  return q;
}, ["Match the story to the shape, section by section.", "Start by saying whether the graph rises, levels off or falls in each part."]);

E("u3-create-scale", 3, ["6.14"], 2, "gen", function(){
  var nice=[1,2,5,10,20,25,50,100,200];
  var maxVal=0, intervals=5, idx=4, guard=0;
  while(guard++<200){ maxVal=ri(24,380); intervals=pick([4,5,6,8,10]); var raw=maxVal/intervals;
    idx=nice.findIndex(function(v){return v>=raw;});
    if(idx>=1 && idx<=nice.length-3) break;
    maxVal=86; intervals=5; idx=nice.findIndex(function(v){return v>=maxVal/intervals;}); }
  var inc=nice[idx];
  function T(v){ return fmt(v)+" units per grid line"; }
  var opts=[
    {t:T(nice[idx-1]), fb:"With that step the axis tops out below "+maxVal+", so the largest value would not fit on the graph."},
    {t:T(nice[idx+1]), fb:"That step fits, but it is larger than needed and squeezes the data into a small part of the axis."},
    {t:T(nice[idx+2]), fb:"That step is far larger than needed: the data would sit in a small corner of the graph."}];
  return mcq("A data set has a largest value of "+maxVal+". A graph axis is divided into "+intervals+" equal grid intervals. Which scale step is the best choice for the axis?",
    {t:T(inc), fb:"Yes: "+intervals+" steps of "+inc+" reach "+fmt(inc*intervals)+", the smallest tidy top that covers "+maxVal+"."}, opts,
    "The axis top must cover the largest value with a tidy step. \\("+intervals+" \\times "+inc+" = "+fmt(inc*intervals)+"\\), which covers "+maxVal+", and "+inc+" is the smallest tidy step that does so. The answer is <b>"+T(inc)+"</b>.",
    {maxVal:maxVal, intervals:intervals, inc:inc});
}, ["The scale step times the number of intervals must reach the largest value.", "Start by dividing the largest value by the number of intervals, then round up to a tidy step."]);

E("u3-create-type", 3, ["6.14"], 2, "gen", function(){
  var names=["Maya","Liam","Sofia","Noah","Ava","Lucas","Emma","Oliver"];
  var places=["Gander","Corner Brook","Mount Pearl","Clarenville","Stephenville","Carbonear","Twillingate","Marystown"];
  var kinds=[
    {type:"Bar graph", items:["goals scored by each team in a league","books borrowed in each genre at a library","vehicles of each colour in a parking lot","players in each age group at a tournament","meals of each kind sold at a canteen","dogs of each breed at a grooming shop"],
     fb:"Yes: the data compare separate categories, and bars make category comparisons clear."},
    {type:"Line graph", items:["temperature recorded each hour of a day","height of a sunflower measured each week","water level in a harbour recorded each day","weight of a puppy measured each month","snow depth recorded each week of winter","price of gas recorded each month"],
     fb:"Yes: the data show one quantity changing over time, and a line shows that change."},
    {type:"Scatter plot", items:["hours of practice and score for each player","temperature and hot drink sales for each day","age and resting heart rate for each volunteer","hours studied and quiz score for each student","rainfall and umbrella sales for each week","engine size and fuel use for each vehicle"],
     fb:"Yes: the data pair two number values for each case, and a scatter plot shows their relationship."},
    {type:"Circle graph", items:["share of a weekly budget spent on each item","share of votes for each candidate","share of a workday spent on each task","share of land used for each crop on a farm","share of team points scored by each player group","share of recycling made up of each material"],
     fb:"Yes: the data are parts of one whole, and a circle graph shows parts of a whole."}];
  var k=pick(kinds), item=pick(k.items), who=pick(names), place=pick(places);
  var types=["Bar graph","Line graph","Scatter plot","Circle graph"];
  var fbMap={"Bar graph":"A bar graph compares separate categories: it does not fit this data set.",
             "Line graph":"A line graph shows change over time: it does not fit this data set.",
             "Scatter plot":"A scatter plot pairs two number values for each case: it does not fit this data set.",
             "Circle graph":"A circle graph shows parts of one whole: it does not fit this data set."};
  var opts=types.filter(function(t){return t!==k.type;}).map(function(t){ return {t:t, fb:fbMap[t]}; });
  return mcq(who+" in "+place+" collects data on "+item+". Which graph type is the best choice to display this data?",
    {t:k.type, fb:k.fb}, opts,
    "Choose the graph by the kind of data: categories suit bars, change over time suits a line, paired numbers suit a scatter plot, and parts of a whole suit a circle graph. This data set calls for a <b>"+k.type.toLowerCase()+"</b>.",
    {type:k.type, item:item});
}, ["Choose the graph type from the kind of data, not from the topic.", "Start by asking whether the data are categories, change over time, paired numbers, or parts of a whole."]);

E("u3-interpolate-cr", 3, ["6.12"], 2, "gen", function(){
  var m=ri(2,5), b=ri(3,15);
  var xs=[0,1,2,3,4], ys=xs.map(function(x){return m*x+b;});
  var table="Hours: "+xs.join(", ")+" with volumes (L): "+ys.join(", ")+".";
  var ans=m*2.5+b;
  return numq("A tank fills at a steady rate. "+table+" Estimate the volume after 2.5 hours, in litres. Show your work on paper.",
    ans, 0.6,
    "The volumes rise by \\("+m+"\\) litres each hour, so halfway between hour 2 and hour 3 the volume is halfway between \\("+ys[2]+"\\) and \\("+ys[3]+"\\) litres. \\[ \\begin{aligned} \\text{Volume} &= "+b+" + "+m+" \\times 2.5 \\\\ &= "+fmt(ans)+"\\text{ L} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" L</b>.",
    {m:m,b:b});
}, ["Interpolation estimates a value between known values.", "Start by finding the hourly rise from the known values."]);

E("u3-extrapolate-cr", 3, ["6.12"], 2, "gen", function(){
  var m=ri(3,6), b=ri(2,12), xq=pick([6,7]);
  var xs=[0,1,2,3,4], ys=xs.map(function(x){return m*x+b;});
  var table="Weeks: "+xs.join(", ")+" with savings ($): "+ys.join(", ")+".";
  var ans=m*xq+b;
  return numq("A student saves at a steady rate. "+table+" Predict the savings after "+xq+" weeks, in dollars, by extending the pattern. Show your work on paper.",
    ans, 0.6,
    "The savings rise by $"+m+" each week from a start of $"+b+". Extending that pattern past the last known week gives the prediction. \\[ \\begin{aligned} \\text{Savings} &= "+b+" + "+m+" \\times "+xq+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>$"+ans+"</b>. Note: a prediction beyond the data is less certain than a value between known points, because the rate may change.",
    {m:m,b:b,xq:xq});
}, ["Extrapolation extends the pattern beyond the known values.", "Start by finding the weekly increase from the known values."]);

E("u3-graph-reading-cr", 3, ["6.11","6.12"], 2, "gen", function(){
  var h0=ri(4,8), g=ri(3,5);
  var plant=pick(["bean plant","tomato plant","sunflower","pea plant","corn plant","pumpkin vine"]);
  var grower=pick(["Maya","Liam","Sofia","Noah","Ava","Lucas"]);
  var startW=pick([0,1]), endH=pick([3.5,4.5,5.5]);
  var pts=[]; for(var w=0;w<=6;w++) pts.push([w,h0+g*w]);
  var yMax=Math.ceil((h0+g*6)/5)*5;
  var ans=(endH-startW)*g;
  var q=numq(grower+" grows a "+plant+". The graph shows its height at the end of each week. By how many centimetres does the plant grow between the end of week "+startW+" and week "+fmt(endH,1)+"? Give your answer in centimetres. Show your work on paper.",
    ans, 0.6,
    "The plant grows by \\("+g+"\\) cm each week. At week "+startW+" the height is \\("+fmt(h0+g*startW)+"\\) cm. At week "+fmt(endH,1)+" the pattern gives \\("+fmt(h0+g*endH)+"\\) cm. \\[ \\begin{aligned} \\text{Growth} &= "+fmt(h0+g*endH)+" - "+fmt(h0+g*startW)+" \\\\ &= "+fmt(ans)+"\\text{ cm} \\end{aligned} \\] The answer is <b>"+fmt(ans)+" cm</b>.",
    {h0:h0,g:g,startW:startW,endH:endH,plant:plant});
  q.figure=u3Plot(pts,6,yMax,"Weeks","Height (cm)",true);
  return q;
}, ["Find both heights from the graph pattern, then subtract.", "Start by finding the weekly growth from two plotted points."]);

E("u3-trend-advanced", 3, ["6.11","6.15"], 3, "gen", function(){
  var ctx=pick(u3Ctx);
  var kind=pick(["posStrong","posWeak","negStrong","negWeak","curve","curveDown"]);
  var pts=u3TrendPts(kind);
  var isCurve=(kind==="curve"||kind==="curveDown");
  var dirWord=(kind==="negStrong"||kind==="negWeak"||kind==="curveDown")?"negative":"positive";
  var strWord=(kind==="posStrong"||kind==="negStrong")?"Strong":"Weak";
  var correctTxt = isCurve ? ("Nonlinear "+dirWord+" trend, curving "+(dirWord==="positive"?"upward":"downward"))
    : (strWord+" "+dirWord+" linear trend");
  var oppDir = dirWord==="positive"?"negative":"positive";
  var d1 = isCurve ? ("Linear "+dirWord+" trend in a straight band") : ("Nonlinear "+dirWord+" trend that curves");
  var d2 = isCurve ? ("Nonlinear "+oppDir+" trend, curving "+(oppDir==="positive"?"upward":"downward")) : ((strWord==="Strong"?"Weak":"Strong")+" "+dirWord+" linear trend");
  var d3 = isCurve ? ("No trend in the points") : (strWord+" "+oppDir+" linear trend");
  var opts=[
    {t:d1, fb:"That gets the shape wrong: check whether the points follow a straight band or a curve."},
    {t:d2, fb:"That gets the strength or direction wrong: judge the direction and the tightness separately."},
    {t:d3, fb:"That gets the direction or existence of the trend wrong: read the cloud from left to right."}];
  var why = isCurve ? "the points follow a bending curve, "+(dirWord==="positive"?"rising":"falling")+" overall"
    : "the points follow a straight band, "+(dirWord==="positive"?"rising":"falling")+" overall, and they "+(strWord==="Strong"?"hug the band tightly":"spread widely around it");
  var q=mcq(ctx.who+" The scatter plot shows "+ctx.y.toLowerCase()+" against "+ctx.x.toLowerCase()+". Which description of the trend is most complete?",
    {t:correctTxt, fb:"Yes: "+why+"."}, opts,
    "A complete description names the shape, the direction and, for a straight band, the strength. Here "+why+". The answer is <b>"+correctTxt+"</b>.",
    {kind:kind});
  q.figure=u3Plot(pts,10,50,ctx.x,ctx.y,false);
  return q;
}, ["A complete trend description names shape, direction and strength.", "Start by deciding whether the pattern is a straight band or a curve."]);

E("u3-predict-advanced-cr", 3, ["6.12"], 3, "gen", function(){
  var a=pick([1,2]), b=ri(1,4), c=ri(2,8);
  function Y(x){ return a*x*x+b*x+c; }
  var xs=[1,2,3,4,5], ys=xs.map(Y);
  var ans=Y(7);
  return numq("A science club models the number of visitors to an exhibit. Week: "+xs.join(", ")+" with visitors: "+ys.join(", ")+". The weekly increases themselves grow by the same amount each week. Predict the visitors in week 7 by extending the pattern of increases. Show your work on paper.",
    ans, 1.1,
    "First differences are "+ys.slice(1).map(function(v,i){return v-ys[i];}).join(", ")+", and they grow by \\("+(2*a)+"\\) each week. The next increases are \\("+(Y(6)-Y(5))+"\\) and \\("+(Y(7)-Y(6))+"\\). \\[ \\begin{aligned} \\text{Week 6} &= "+ys[4]+" + "+(Y(6)-Y(5))+" = "+Y(6)+" \\\\ \\text{Week 7} &= "+Y(6)+" + "+(Y(7)-Y(6))+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+" visitors</b>.",
    {a:a,b:b,c:c});
}, ["When increases grow steadily, extend the increases first, then the values.", "Start by finding the increase from each week to the next."]);

E("u3-scale-design-cr", 3, ["6.14"], 3, "gen", function(){
  var nice=[5,10,20,25,50,100,200];
  var ctxs=["daily deliveries for a bakery","daily ticket sales for a theatre","weekly rainfall in millimetres for a farm","monthly visitors for a museum","daily litres of water used by a rink","weekly orders for a craft shop"];
  var ctx=pick(ctxs), maxVal=ri(31,460), intervals=pick([4,5,6,8,10]);
  var raw=maxVal/intervals, idx=nice.findIndex(function(v){return v>=raw;});
  if(idx<0) idx=nice.length-1;
  var inc=nice[idx], top=inc*intervals;
  return numq("A worker creates a graph for "+ctx+". The largest value is "+maxVal+" and the value axis has "+intervals+" equal grid intervals starting at 0. Using the smallest tidy scale step (from 5, 10, 20, 25, 50, 100, 200) that lets the largest value fit, what number goes at the top of the axis? Show your work on paper.",
    top, 0.6,
    "Divide the largest value by the number of intervals, round up to a tidy step, then multiply back. \\[ \\begin{aligned} "+maxVal+" \\div "+intervals+" &\\approx "+fmt(raw,1)+" \\\\ \\text{Tidy step} &= "+inc+" \\\\ \\text{Top} &= "+inc+" \\times "+intervals+" = "+top+" \\end{aligned} \\] The answer is <b>"+top+"</b>.",
    {maxVal:maxVal, intervals:intervals, inc:inc, ctx:ctx});
}, ["The top of the axis is the scale step multiplied by the number of intervals.", "Start by dividing the largest value by the number of intervals."]);

/* ----- bank-u4.js ----- */
// Math 3202 Unit 4 Working with Data question bank
// CRMARKS: u4-mean-context-cr=3
// CRMARKS: u4-weighted-mean-cr=4
// CRMARKS: u4-trimmed-outlier-cr=5
// CRMARKS: u4-outlier-effect-cr=4
// CRMARKS: u4-weighted-advanced-cr=5
/* ===== Unit 4 ===== */
/* Math 3202 Unit 4: Working with Data (6.1-6.10). Helpers prefixed u4. No box plots, stem-and-leaf or range. */
function u4Sum(a){ return a.reduce(function(s,n){return s+n;},0); }
function u4Sorted(a){ return a.slice().sort(function(x,y){return x-y;}); }
function u4Median(a){ var s=u4Sorted(a), m=Math.floor(s.length/2); return s.length%2 ? s[m] : (s[m-1]+s[m])/2; }
function u4NumDist(correct, cands, step){
  var out=[], seen={}; seen[fmt(correct)]=1;
  cands.forEach(function(c){ var k=fmt(c.v); if(out.length<3 && isFinite(c.v) && !seen[k]){ seen[k]=1; out.push({t:k, fb:c.fb}); } });
  var offs=[step,-step,2*step,-2*step,3*step,-3*step,5*step], i=0;
  while(out.length<3 && i<offs.length){ var v=Math.round((correct+offs[i])*100)/100, k=fmt(v); i++;
    if(!seen[k]){ seen[k]=1; out.push({t:k, fb:"That value does not match the data: check the total, the count, or the ordering and try again."}); } }
  return out;
}
function u4Dots(vals){
  var lo=Math.min.apply(null,vals)-5, hi=Math.max.apply(null,vals)+5;
  var W=300,H=92, x0=18, x1=282;
  function X(v){ return x0+(v-lo)/(hi-lo)*(x1-x0); }
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg">';
  s+='<line x1="'+x0+'" y1="62" x2="'+x1+'" y2="62" stroke="'+FIG_INK+'" stroke-width="1.8"/>';
  var seen={};
  vals.forEach(function(v){ var k=fmt(v), n=(seen[k]||0); seen[k]=n+1;
    s+='<circle cx="'+fmt(X(v),1)+'" cy="'+(52-n*11)+'" r="4" fill="'+FIG_ACC+'"/>';
    s+='<line x1="'+fmt(X(v),1)+'" y1="58" x2="'+fmt(X(v),1)+'" y2="66" stroke="'+FIG_INK+'" stroke-width="1.2"/>'; });
  [lo+5, Math.round((lo+hi)/2), hi-5].forEach(function(v){ s+='<text x="'+fmt(X(v),1)+'" y="80" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+v+'</text>'; });
  s+='<text x="150" y="12" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">Each dot is one value in the data set</text>';
  return s+'</svg>';
}
function u4Set(n, lo, hi){ var a=[], g=0; while(a.length<n && g++<300){ var v=ri(lo,hi); a.push(v); } return a; }

E("u4-mean-basic", 4, ["6.1"], 1, "gen", function(){
  var ctx=pick(["quiz scores","daily step counts in hundreds","goals per game","pages read each day","deliveries per day","laps swum each day"]);
  var n=pick([5,6,7]), vals=u4Set(n,3,28), total=u4Sum(vals), ans=total/n;
  var cands=[
    {v:total/(n-1), fb:"That divides the total by one too few: count the values again."},
    {v:total/(n+1), fb:"That divides the total by one too many: count the values again."},
    {v:u4Median(vals), fb:"That is the middle value (the median), not the total shared equally (the mean)."}];
  var opts=u4NumDist(ans,cands,1);
  var _bo0=balOpts({t:fmt(ans), fb:"Yes: the total is "+total+" shared among "+n+" values."}, opts); return mcq("The "+ctx+" for one person are: "+vals.join(", ")+". What is the mean of this data set?", _bo0[0], _bo0[1],
    "Add the values, then divide by how many values there are. \\[ \\begin{aligned} \\text{Mean} &= \\frac{"+total+"}{"+n+"} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {vals:vals, n:n});
}, ["The mean shares the total equally among all the values.", "Start by adding all the values, then count them."]);

E("u4-median-basic", 4, ["6.1"], 1, "gen", function(){
  var ctx=pick(["race times in seconds","prices of used bikes in tens of dollars","temperatures at noon","wait times in minutes","fish lengths in centimetres","bus riders per trip"]);
  var n=pick([5,7,9]), vals=u4Set(n,4,42), med=u4Median(vals), meanV=u4Sum(vals)/n;
  var s=u4Sorted(vals);
  var cands=[
    {v:meanV, fb:"That is the mean: the median is the middle value after the data are ordered."},
    {v:vals[Math.floor(n/2)], fb:"That is the middle of the list as written: the data must be ordered before the middle is taken."},
    {v:(s[0]+s[n-1])/2, fb:"That averages the smallest and largest values: the median is the middle ordered value."}];
  var guard=0;
  while(fmt(cands[1].v)===fmt(med) && guard++<50){ vals=u4Set(n,4,42); med=u4Median(vals); s=u4Sorted(vals); meanV=u4Sum(vals)/n;
    cands[0].v=meanV; cands[1].v=vals[Math.floor(n/2)]; cands[2].v=(s[0]+s[n-1])/2; }
  var opts=u4NumDist(med,cands,1);
  var _bo0=balOpts({t:fmt(med), fb:"Yes: in order the values are "+s.join(", ")+", and the middle one is "+fmt(med)+"."}, opts); return mcq("The "+ctx+" recorded are: "+vals.join(", ")+". What is the median of this data set?", _bo0[0], _bo0[1],
    "Order the values first: "+s.join(", ")+". With \\("+n+"\\) values, the middle position holds the median. The answer is <b>"+fmt(med)+"</b>.",
    {vals:vals, med:med});
}, ["The median is the middle value after ordering.", "Start by writing the values in order from smallest to largest."]);

E("u4-mode-basic", 4, ["6.1"], 1, "gen", function(){
  var ctx=pick(["shoe sizes of a team","number of pets per student","goals scored per player","siblings per student","cars per driveway","books borrowed per student"]);
  var modeV=ri(1,9), vals=[modeV,modeV,modeV], guard=0;
  while(vals.length<8 && guard++<300){ var v=ri(0,12); var cnt=vals.filter(function(x){return x===v;}).length; if(v!==modeV && cnt<2) vals.push(v); }
  vals=shuffle(vals);
  var freq={}; vals.forEach(function(v){ freq[v]=(freq[v]||0)+1; });
  var others=Object.keys(freq).map(Number).filter(function(v){return v!==modeV;});
  var cands=[
    {v:Math.max.apply(null,vals), fb:"The mode is the most frequent value, not the largest value."},
    {v:u4Median(vals), fb:"That is the median: the mode is the value that occurs most often."},
    {v:others.length?others[0]:modeV+3, fb:"That value occurs fewer times than another value: count how often each value appears."}];
  if(cands[0].v===modeV) cands[0].v=modeV+4;
  var opts=u4NumDist(modeV,cands,1);
  var _bo0=balOpts({t:String(modeV), fb:"Yes: "+modeV+" occurs 3 times, more often than any other value."}, opts); return mcq("The "+ctx+" are: "+vals.join(", ")+". What is the mode of this data set?", _bo0[0], _bo0[1],
    "Count how often each value occurs. The value \\("+modeV+"\\) occurs 3 times, more than any other value. The mode is <b>"+modeV+"</b>.",
    {vals:vals, mode:modeV});
}, ["The mode is the value that occurs most often.", "Start by tallying how many times each value appears."]);

E("u4-outlier-identify", 4, ["6.7"], 1, "gen", function(){
  var ctx=pick(["daily temperatures in degrees","prices of lunches in dollars","commute times in minutes","goals per game in a season","daily visitors to a shop"]);
  var base=ri(18,30), cluster=[], i;
  for(i=0;i<6;i++) cluster.push(base+ri(-4,5));
  var high=pick([true,false]);
  var out = high ? base+ri(38,65) : Math.max(1, base-ri(14,17));
  if(!high && out<1) out=1;
  var vals=shuffle(cluster.concat([out]));
  var s=u4Sorted(cluster);
  var cands=[
    {v:s[s.length-1], fb:"That value sits inside the main cluster: an outlier is far away from the cluster."},
    {v:s[0], fb:"That value sits inside the main cluster: an outlier is far away from the cluster."},
    {v:u4Median(vals), fb:"That is a middle value of the whole set: an outlier lies far from where most values gather."}];
  var opts=u4NumDist(out,cands,2);
  var q=mcq("The "+ctx+" are: "+vals.join(", ")+". The dot plot shows the same data. Which value is the outlier?",
    {t:String(out), fb:"Yes: "+out+" lies far from the cluster of the other values."}, opts,
    "Most values gather in a cluster from "+s[0]+" to "+s[s.length-1]+". The value \\("+out+"\\) lies far away from that cluster. The outlier is <b>"+out+"</b>.",
    {vals:vals, out:out});
  q.figure=u4Dots(vals);
  return q;
}, ["An outlier lies far away from the cluster of the other values.", "Start by finding where most of the values gather."]);

E("u4-context-problem", 4, ["6.2"], 2, "gen", function(){
  var who=pick(["A student","A bowler","A curler","A gamer","A darts player"]);
  var scores=[], i; for(i=0;i<4;i++) scores.push(ri(58,94));
  var needed=0, target=0, guard=0;
  while(guard++<300){ target=ri(68,88); needed=5*target-u4Sum(scores); if(needed>=45 && needed<=100) break; }
  if(needed<45||needed>100){ scores=[70,74,80,76]; target=78; needed=5*target-u4Sum(scores); }
  var cands=[
    {v:target-u4Sum(scores)/4, fb:"That compares the target with the current average only: the target average covers all five scores."},
    {v:needed+5, fb:"That is 5 too high: check the total needed for five scores at the target average."},
    {v:100, fb:"A perfect score is not required here: work out the exact total still needed."}];
  var opts=u4NumDist(needed,cands,2);
  var _bo0=balOpts({t:String(needed), fb:"Yes: five rounds at "+target+" need a total of "+(5*target)+", and "+needed+" more reaches it."}, opts); return mcq(who+" has scores of "+scores.join(", ")+" on the first four rounds and wants an average of "+target+" over five rounds. What score is needed on the fifth round?", _bo0[0], _bo0[1],
    "Work from the total. \\[ \\begin{aligned} \\text{Total needed} &= 5 \\times "+target+" = "+(5*target)+" \\\\ \\text{Score needed} &= "+(5*target)+" - "+u4Sum(scores)+" \\\\ &= "+needed+" \\end{aligned} \\] The answer is <b>"+needed+"</b>.",
    {scores:scores, target:target, needed:needed});
}, ["An average target is a total target in disguise.", "Start by multiplying the target average by the number of rounds."]);

E("u4-error-mean", 4, ["6.3"], 2, "gen", function(){
  var n=6, vals=u4Set(n,5,30), total=u4Sum(vals), ans=total/n;
  var errType=pick(["divisor","sum"]);
  var wrong = errType==="divisor" ? total/(n-1) : (total+10)/n;
  var wrongTxt = errType==="divisor" ? "adds the values to get "+total+", then divides by 5 instead of 6" : "adds the values and gets "+(total+10)+" instead of "+total+", then divides by 6";
  var cands=[
    {v:wrong, fb:"That repeats the error described in the question: find and fix that step first."},
    {v:total/(n+1), fb:"That divides by one too many: there are exactly "+n+" values."},
    {v:u4Median(vals), fb:"That is the median: the question asks for the corrected mean."}];
  var opts=u4NumDist(ans,cands,1);
  var _bo0=balOpts({t:fmt(ans), fb:"Yes: the total is "+total+" and there are "+n+" values, so the mean is "+fmt(ans)+"."}, opts); return mcq("Data: "+vals.join(", ")+". A student finds the mean by this working: the student "+wrongTxt+", giving "+fmt(wrong)+". What is the correct mean?", _bo0[0], _bo0[1],
    "Correct the working: the true total is \\("+total+"\\) and the count is \\("+n+"\\). \\[ \\begin{aligned} \\text{Mean} &= \\frac{"+total+"}{"+n+"} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {vals:vals, errType:errType});
}, ["Find the step in the shown working that is wrong, then redo the calculation.", "Start by checking the total and the count separately."]);

E("u4-error-median-mode", 4, ["6.3","6.1"], 2, "gen", function(){
  var mode=pick(["median","mode"]);
  if(mode==="median"){
    var vals=[], med=0, unsortedMid=0, guard=0;
    while(guard++<400){ vals=u4Set(7,4,44); med=u4Median(vals); unsortedMid=vals[3]; if(unsortedMid!==med) break; }
    var s=u4Sorted(vals);
    var cands=[
      {v:unsortedMid, fb:"That is the middle of the list as written: the values must be ordered before the middle is taken."},
      {v:u4Sum(vals)/7, fb:"That is the mean: the question asks for the corrected median."},
      {v:(s[0]+s[6])/2, fb:"That averages the extremes: the median is the middle ordered value."}];
    var opts=u4NumDist(med,cands,1);
    var _bo0=balOpts({t:fmt(med), fb:"Yes: ordered, the values are "+s.join(", ")+", and the middle one is "+fmt(med)+"."}, opts); return mcq("Data: "+vals.join(", ")+". A student takes the middle value of the list as written, "+unsortedMid+", and calls it the median. What is the correct median?", _bo0[0], _bo0[1],
      "Order first: "+s.join(", ")+". The middle ordered value is the median. The answer is <b>"+fmt(med)+"</b>.",
      {vals:vals, med:med});
  }
  var modeV=ri(2,10), vals=[modeV,modeV,modeV], g2=0;
  while(vals.length<8 && g2++<300){ var v=ri(1,14); var cnt=vals.filter(function(x){return x===v;}).length; if(v!==modeV && cnt<2) vals.push(v); }
  vals=shuffle(vals);
  var big=Math.max.apply(null,vals); if(big===modeV) big=modeV+5;
  var cands2=[
    {v:big, fb:"That is the largest value: the mode is the most frequent value, and the shown error was to pick the largest."},
    {v:u4Median(vals), fb:"That is the median: the mode is the value occurring most often."},
    {v:vals[0], fb:"That is just the first value in the list: count the frequency of every value."}];
  var opts2=u4NumDist(modeV,cands2,1);
  var _bo1=balOpts({t:String(modeV), fb:"Yes: "+modeV+" occurs 3 times, more than any other value."}, opts2); return mcq("Data: "+vals.join(", ")+". A student says the mode is "+big+", the largest value. What is the correct mode?", _bo1[0], _bo1[1],
    "Count frequencies: \\("+modeV+"\\) occurs 3 times, more often than any other value, including the largest value. The mode is <b>"+modeV+"</b>.",
    {vals:vals, mode:modeV});
}, ["Name the error in the shown method, then apply the correct method.", "Start by recalling what the measure in the question is defined to be."]);

E("u4-advantages-weighting", 4, ["6.4","6.5"], 2, "var", varset([
  function(){ return mcq("A shop owner lists the daily takings for a week. One day had a festival and the takings were far above the rest. Which measure gives the most typical daily takings?",
    {t:"Median, because one extreme day does not move it much", fb:"Yes: the median depends on position, so an extreme value barely affects it."},
    [{t:"Mean, because it uses every value including the extreme day", fb:"Using the extreme day pulls the mean upward: it would overstate a typical day."},
     {t:"Mode, because the highest takings occurred on the festival day", fb:"The mode is the most frequent value, not the highest value."},
     {t:"Mean, because it is always the most typical measure", fb:"No measure is always best: an extreme value distorts the mean here."}],
    "An extreme value pulls the mean toward it, while the median stays near the middle of the ordered data. The answer is <b>Median, because one extreme day does not move it much</b>.", {}); },
  function(){ return mcq("A coach wants the shoe size to stock most heavily for a team. Which measure is most useful?",
    {t:"Mode, because it is the size worn by the most players", fb:"Yes: stocking follows the most frequent size."},
    [{t:"Mean, because it averages all the sizes in the order", fb:"An average size may match no player at all: stocking needs the most common size."},
     {t:"Median, because it is the middle size in the set", fb:"The middle size is not the most worn size: frequency is what matters for stock."},
     {t:"Mode, because it is the largest size in the whole set of players", fb:"The mode is the most frequent size, not the largest size."}],
    "Stock should match what occurs most often, which is the mode. The answer is <b>Mode, because it is the size worn by the most players</b>.", {}); },
  function(){ return mcq("What is a disadvantage of the mode for a data set of test scores?",
    {t:"A set can have no mode, or more than one mode", fb:"Yes: if no score repeats there is no mode, and ties give several modes."},
    [{t:"It is always pulled up by one very high score", fb:"Being pulled by an extreme score describes the mean, not the mode."},
     {t:"It needs the values in order before it can be found", fb:"Ordering is needed for the median: the mode needs frequency counts."},
     {t:"It changes every time a value is added", fb:"Adding a value changes any measure at times: the stated problem is that a mode may not exist or may not be unique."}],
    "The mode depends on repeats: with no repeats there is no mode, and with tied repeats there are several. The answer is <b>A set can have no mode, or more than one mode</b>.", {}); },
  function(){ return mcq("What is an advantage of the mean over the median and mode?",
    {t:"It uses every value in the data set", fb:"Yes: every value contributes to the total behind the mean."},
    [{t:"It is never affected by extreme values", fb:"Extreme values do affect the mean: that is one of its weaknesses."},
     {t:"It always equals one of the data values", fb:"The mean often falls between data values: it need not be one of them."},
     {t:"It can be found without any calculation", fb:"The mean needs a total and a division: the mode can sometimes be spotted by eye."}],
    "The mean is built from the total, so every value counts toward it. The answer is <b>It uses every value in the data set</b>.", {}); },
  function(){ return mcq("In a course, the final exam counts for 40% of the mark and quizzes count for 10%. Why is the exam given the greater weighting?",
    {t:"It is meant to count more toward the final mark than the quizzes", fb:"Yes: a weighting states how much each part counts in the final result."},
    [{t:"The exam has more questions, so its mark is larger than a quiz mark", fb:"Weighting is a chosen share of the final mark, not a result of question count."},
     {t:"Exam marks are always higher than quiz marks in every course", fb:"Weighting does not depend on which marks happen to be higher."},
     {t:"The exam is written later in the course, at the very end", fb:"Timing alone does not set a weighting: the share of the final mark does."}],
    "A weighting is the share of the final mark assigned to a part. The exam is assigned the larger share on purpose. The answer is <b>It is meant to count more toward the final mark than the quizzes</b>.", {}); },
  function(){ return mcq("A final mark is built from a project worth 50% and homework worth 50% at first. The teacher changes the project to 70% and homework to 30%. What does this change do?",
    {t:"The project mark now pulls the final mark more strongly", fb:"Yes: raising a weight raises that part's influence on the weighted mean."},
    [{t:"Every student's project mark increases by 20%", fb:"The weight changes, not the project mark itself."},
     {t:"The final mark becomes the simple mean of the two parts", fb:"Equal weights would give the simple mean: these weights are no longer equal."},
     {t:"Homework no longer counts at all in the final mark", fb:"A 30% weight still counts: it counts less than before, not zero."}],
    "Weights control influence: at 70%, the project contributes more to the weighted mean than it did at 50%. The answer is <b>The project mark now pulls the final mark more strongly</b>.", {}); },
  function(){ return mcq("Why might a weighted mean be used for a course mark instead of a simple mean of all the work?",
    {t:"Some parts, such as a final exam, are intended to matter more", fb:"Yes: weighting lets important parts count for a larger share."},
    [{t:"A weighted mean is always higher than a simple mean of marks", fb:"Weighting can raise or lower the result depending on the marks: it is about shares, not boosting."},
     {t:"A simple mean cannot be calculated for course marks at all", fb:"A simple mean can be calculated: the issue is that it treats every part as equally important."},
     {t:"Weighted means remove the need for any marks in the course", fb:"Weighted means are built from the marks: each mark is multiplied by its weight."}],
    "Course parts are not all meant to matter equally, so weights assign each part its intended share. The answer is <b>Some parts, such as a final exam, are intended to matter more</b>.", {}); },
  function(){ return mcq("A hockey team reports the average goals per game using the median instead of the mean after one 12-goal game. Why is the median a fair choice here?",
    {t:"One unusual game does not drag the median away from the typical games", fb:"Yes: the median reflects the middle game, not the extreme one."},
    [{t:"The median includes the 12-goal game more fully than the other games played", fb:"The mean is the measure that fully includes the extreme game in a total."},
     {t:"The median is always larger than the mean of the same games", fb:"With a high extreme value, the median is usually smaller than the mean here."},
     {t:"The median ignores all the low games as well as the high ones", fb:"The median uses the ordered positions of all games: it is just not dragged by the extreme."}],
    "The 12-goal game is an outlier for this team: the median stays with the typical games. The answer is <b>One unusual game does not drag the median away from the typical games</b>.", {}); }
]), ["Think about what each measure uses: totals, positions, or frequencies, and what weights mean.", "Start by naming what makes the measure in the question strong or weak."]);

E("u4-weighted-mean", 4, ["6.6"], 2, "gen", function(){
  var cats=[["Tests",40],["Assignments",30],["Project",20],["Participation",10]];
  var marks=cats.map(function(){ return ri(52,98); });
  var num=cats.reduce(function(s,c,i){ return s+c[1]*marks[i]; },0);
  var ans=num/100, simple=u4Sum(marks)/4;
  var cands=[
    {v:simple, fb:"That is the simple mean of the four marks: the categories have different weights, so a simple mean is wrong here."},
    {v:ans+4, fb:"That overshoots: check each product of mark times weight before adding."},
    {v:Math.max.apply(null,marks), fb:"That is just the highest category mark: the weighted mean blends all four marks by their weights."}];
  var opts=u4NumDist(ans,cands,1.5);
  var desc=cats.map(function(c,i){ return c[0]+" "+marks[i]+"% (weight "+c[1]+"%)"; }).join(", ");
  var _bo0=balOpts({t:fmt(ans), fb:"Yes: multiply each mark by its weight, add the products, and divide by 100."}, opts); return mcq("A course mark uses these parts: "+desc+". What is the weighted mean (the final mark), as a percent?", _bo0[0], _bo0[1],
    "Multiply each mark by its weight and add. \\[ \\begin{aligned} \\text{Weighted mean} &= \\frac{"+cats.map(function(c,i){return marks[i]+" \\times "+c[1];}).join(" + ")+"}{100} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"%</b>.",
    {marks:marks});
}, ["A weighted mean multiplies each value by its weight before averaging.", "Start with the largest weight: multiply its mark by its weight."]);

E("u4-outlier-effect", 4, ["6.8","6.7"], 2, "gen", function(){
  var base=ri(20,32), cluster=[], i;
  for(i=0;i<6;i++) cluster.push(base+ri(-3,4));
  var out=base+ri(40,60);
  var vals=cluster.concat([out]);
  var meanWithout=u4Sum(cluster)/6;
  var cands=[
    {v:u4Sum(vals)/7, fb:"That is the mean with the outlier still included: the question asks for the mean after removing it."},
    {v:u4Median(vals), fb:"That is the median of the full set: the question asks for the mean of the set without the outlier."},
    {v:meanWithout+5, fb:"That overshoots the cluster values: the mean without the outlier must sit inside the cluster."}];
  var opts=u4NumDist(meanWithout,cands,1);
  var _bo0=balOpts({t:fmt(meanWithout), fb:"Yes: without "+out+", the remaining values total "+u4Sum(cluster)+" over 6 values."}, opts); var q=mcq("Data: "+vals.join(", ")+". The value "+out+" is an outlier. What is the mean of the data after the outlier is removed?", _bo0[0], _bo0[1],
    "Remove the outlier first, then average what remains. \\[ \\begin{aligned} \\text{Mean} &= \\frac{"+u4Sum(cluster)+"}{6} \\\\ &= "+fmt(meanWithout)+" \\end{aligned} \\] For comparison, with the outlier the mean is "+fmt(u4Sum(vals)/7)+", pulled well above the cluster. The answer is <b>"+fmt(meanWithout)+"</b>.",
    {vals:vals, out:out});
  q.figure=u4Dots(vals);
  return q;
}, ["Removing an outlier changes the total and the count.", "Start by crossing out the outlier, then add the remaining values."]);

E("u4-trimmed-mean", 4, ["6.9"], 2, "gen", function(){
  var n=pick([7,8,9]), vals=[];
  for(var i=0;i<n;i++) vals.push(Math.round((ri(55,96)+pick([0,0.5]))*10)/10);
  var s=u4Sorted(vals), rest=s.slice(1,n-1), ans=u4Sum(rest)/rest.length;
  var cands=[
    {v:u4Sum(vals)/n, fb:"That is the ordinary mean of all values: a trimmed mean drops the highest and lowest first."},
    {v:u4Median(vals), fb:"That is the median: a trimmed mean averages all values left after trimming, not just the middle."},
    {v:u4Sum(s.slice(0,n-1))/(n-1), fb:"That drops only the highest value: trimming here drops the lowest as well."}];
  var opts=u4NumDist(ans,cands,0.8);
  var _bo0=balOpts({t:fmt(ans), fb:"Yes: dropping "+s[0]+" and "+s[n-1]+" leaves "+rest.length+" scores totalling "+fmt(u4Sum(rest),1)+"."}, opts); var q=mcq("Judges give these scores: "+vals.join(", ")+". For the trimmed mean, drop the highest and lowest scores. What is the trimmed mean?", _bo0[0], _bo0[1],
    "Drop the extremes "+s[0]+" and "+s[n-1]+", then average the rest. \\[ \\begin{aligned} \\text{Trimmed mean} &= \\frac{"+fmt(u4Sum(rest),1)+"}{"+rest.length+"} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
    {vals:vals});
  q.figure=u4Dots(vals);
  return q;
}, ["A trimmed mean drops the stated extremes before averaging.", "Start by ordering the scores and crossing out the highest and lowest."]);

E("u4-media-interpret", 4, ["6.10"], 2, "var", varset([
  function(){ return mcq("A headline says: 'Average pay at the plant is $92,000.' Most workers earn near $54,000, while a few managers earn over $200,000. Why is the headline misleading?",
    {t:"The mean is pulled up by the few very high salaries", fb:"Yes: a few extreme salaries raise the mean far above what most workers earn."},
    [{t:"The median would be even higher than $92,000", fb:"With high outliers, the median sits below the mean, near the typical worker."},
     {t:"Averages cannot be used for salaries at all", fb:"Averages can be used: the issue is which average, and the mean is distorted here."},
     {t:"The headline should have used the mode of the salaries", fb:"The mode may not even exist for salaries: the median is the usual check, and the flaw is the pulled mean."}],
    "A few very high salaries pull the mean up to $92,000, well above the typical $54,000. The answer is <b>The mean is pulled up by the few very high salaries</b>.", {}); },
  function(){ return mcq("A town reports a median house price of $310,000. A developer advertises: 'Homes here average $390,000, a sign every home is pricey.' The $390,000 is the mean. What explains the gap?",
    {t:"A few very expensive homes pull the mean above the median", fb:"Yes: expensive outliers raise the mean while the median stays at the middle home."},
    [{t:"The median must have been calculated wrong by the reporter", fb:"A mean above the median is expected when a few prices are very high: no error is needed."},
     {t:"Half the homes on the list cost more than $390,000", fb:"Half the homes cost more than the median, $310,000, not more than the mean."},
     {t:"The mean and median must always be equal in any data set", fb:"They are equal only for balanced data: skewed prices pull them apart."}],
    "Skewed prices pull the mean above the median: a few expensive homes explain the gap. The answer is <b>A few very expensive homes pull the mean above the median</b>.", {}); },
  function(){ return mcq("An ad claims: 'The average family in our survey has 2.8 children, so our van seats the average family.' What is the problem with this use of the mean?",
    {t:"A mean need not match any real family, so it can mislead planning", fb:"Yes: no family has 2.8 children: the mean is a balance point, not a typical case here."},
    [{t:"The mean of children must be a whole number in every family", fb:"A mean can be a decimal: the problem is treating it as a real family."},
     {t:"Surveys should report only the mode and nothing else", fb:"Reporting the mode alone would hide other information: the flaw is the claim built on the mean."},
     {t:"The survey needed a larger sample to fix the decimal in the reported mean", fb:"A larger sample would still give a decimal mean: sample size is not the issue."}],
    "The mean is a calculated balance point and may match no actual case. The answer is <b>A mean need not match any real family, so it can mislead planning</b>.", {}); },
  function(){ return mcq("A fitness app advertises that its users lose an average of 6 kg, using the mean. The median loss is 2 kg. Which statement is fair?",
    {t:"A few users with very large losses pull the mean well above the median", fb:"Yes: the gap between mean and median signals strong outliers in the data."},
    [{t:"Most users lose about 6 kg, which is what the headline says", fb:"The median says half the users lose 2 kg or less: most do not lose about 6 kg."},
     {t:"The median must be a printing error in the report the company issued this year", fb:"A median below the mean is the normal result when a few values are very large."},
     {t:"The mean proves the typical loss is 6 kg for most users", fb:"The mean is pulled by the large losses: the median better shows the typical user."}],
    "When the mean sits well above the median, a few large values are pulling it. The answer is <b>A few users with very large losses pull the mean well above the median</b>.", {}); },
  function(){ return mcq("A report says a class average on a test was 81%. Five students scored 98 to 100, and the rest scored between 62 and 78. Why might 81% misrepresent the class?",
    {t:"The few perfect scores pull the mean above what most students scored", fb:"Yes: most scores sit below 81, and the top scores drag the mean up."},
    [{t:"An average above the median is impossible in any set of scores", fb:"It is possible and common when high outliers are present."},
     {t:"The teacher should report the lowest score instead of any class average", fb:"One extreme score, high or low, is not a summary: the issue is the pulled mean."},
     {t:"Percent scores cannot be averaged, so the mean must be a mistake", fb:"Percent scores are averaged routinely: the flaw is reading the pulled mean as typical."}],
    "Most students scored below 81: the perfect scores pulled the mean up. The answer is <b>The few perfect scores pull the mean above what most students scored</b>.", {}); },
  function(){ return mcq("A weather report says the average July temperature was normal, but farmers say the month felt extreme. The daily temperatures swung between very hot and very cold days. What does the mean hide here?",
    {t:"It hides how widely the daily values spread around the average", fb:"Yes: opposite extremes can cancel out in a mean and look calm."},
    [{t:"It hides the middle temperature of the month from readers", fb:"The middle value is the median: the complaint is about the swings, which the mean conceals."},
     {t:"Averages require every day to be the same temperature", fb:"Averages do not require equal days: they can mask very unequal days."},
     {t:"The report should have used the mode temperature for the month", fb:"The mode would also hide the swings: the point is that a single centre value conceals spread."}],
    "Hot and cold extremes cancel in the mean, hiding the spread of the daily values. The answer is <b>It hides how widely the daily values spread around the average</b>.", {}); }
]), ["Compare the measure in the headline with what a typical case looks like.", "Start by asking whether extreme values could be pulling the reported measure."]);

E("u4-mean-context-cr", 4, ["6.2","6.1"], 2, "gen", function(){
  var places=["a cafe in Gander","a bakery in Corner Brook","a gift shop in Twillingate","a diner in Clarenville","a craft store in Carbonear"];
  var place=pick(places);
  var days=["Monday","Tuesday","Wednesday","Thursday"];
  var vals=days.map(function(){ return ri(18,64); });
  var fifth=ri(20,70), total=u4Sum(vals)+fifth, meanV=total/5;
  var ans=fifth;
  return numq("Over five days, "+place+" records these customer counts for the first four days: "+vals.join(", ")+". The mean for all five days is "+fmt(meanV)+". How many customers came on the fifth day? Show your work on paper.",
    ans, 0.6,
    "Turn the mean into a five day total, then subtract the four known days. \\[ \\begin{aligned} \\text{Five day total} &= 5 \\times "+fmt(meanV)+" = "+fmt(total)+" \\\\ \\text{Fifth day} &= "+fmt(total)+" - "+u4Sum(vals)+" \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+" customers</b>.",
    {vals:vals, mean:meanV});
}, ["A mean over a set number of days fixes the total for those days.", "Start by multiplying the mean by the number of days."]);

E("u4-weighted-mean-cr", 4, ["6.6"], 2, "gen", function(){
  var cats=[["Unit tests",45],["Assignments",25],["Project",20],["Quizzes",10]];
  var marks=cats.map(function(){ return ri(50,97); });
  var num=cats.reduce(function(s,c,i){ return s+c[1]*marks[i]; },0);
  var ans=num/100;
  return numq("A course mark is weighted as follows: "+cats.map(function(c,i){ return c[0]+" "+c[1]+"% with a mark of "+marks[i]+"%"; }).join(", ")+". Calculate the weighted mean (final mark), as a percent. Show your work on paper.",
    ans, 0.6,
    "Multiply each mark by its weight, add the products, and divide by the total weight of 100. \\[ \\begin{aligned} \\text{Weighted mean} &= \\frac{"+cats.map(function(c,i){return marks[i]+" \\times "+c[1];}).join(" + ")+"}{100} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"%</b>.",
    {marks:marks});
}, ["Multiply each mark by its weight before adding.", "Start with the heaviest category and work through each product."]);

E("u4-trimmed-outlier-cr", 4, ["6.9","6.8"], 2, "gen", function(){
  var vals=[];
  for(var i=0;i<8;i++) vals.push(Math.round((ri(58,94)+pick([0,0.5]))*10)/10);
  var s=u4Sorted(vals), rest=s.slice(1,7), ans=u4Sum(rest)/6;
  var q=numq("Eight diving judges give these scores: "+vals.join(", ")+". Calculate the trimmed mean after dropping the highest and lowest scores. Give your answer as a score. Show your work on paper, and in your work note why dropping the extremes is fair.",
    ans, 0.15,
    "Drop the lowest score \\("+fmt(s[0],1)+"\\) and the highest score \\("+fmt(s[7],1)+"\\), which may reflect one harsh judge and one generous judge rather than the dive itself. Then average the six scores that remain. \\[ \\begin{aligned} \\text{Trimmed mean} &= \\frac{"+fmt(u4Sum(rest),1)+"}{6} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] Removing the extremes is fair because it stops single unusually harsh or generous scores from dragging the result, while every middle score still counts. The answer is <b>"+fmt(ans)+"</b>.",
    {vals:vals});
  q.figure=u4Dots(vals);
  return q;
}, ["Trimming drops the highest and lowest values before averaging.", "Start by ordering the scores and crossing out the two extremes."]);

E("u4-measure-advanced", 4, ["6.1","6.8","6.6"], 3, "gen", function(){
  var mode=pick(["missing","combined","trim2","afterRemove"]);
  if(mode==="missing"){
    var n=pick([6,7,8]), known=[], i;
    for(i=0;i<n-1;i++) known.push(ri(12,88));
    var miss=ri(15,90), total=u4Sum(known)+miss, meanV=total/n;
    var cands=[
      {v:Math.round(meanV), fb:"That rounds the mean first: work from the exact total the mean implies."},
      {v:miss+6, fb:"That overshoots: check the total of the known values before subtracting."},
      {v:u4Median(known), fb:"That is the median of the known values: the missing value comes from the total."}];
    var opts=u4NumDist(miss,cands,2);
    var _bo0=balOpts({t:String(miss), fb:"Yes: the mean fixes the total at "+fmt(total)+", and subtracting the known values leaves "+miss+"."}, opts); return mcq("A data set of "+n+" values has a mean of "+fmt(meanV)+". The known values are "+known.join(", ")+". What is the missing value?", _bo0[0], _bo0[1],
      "The mean fixes the total. \\[ \\begin{aligned} \\text{Total} &= "+n+" \\times "+fmt(meanV)+" = "+fmt(total)+" \\\\ \\text{Missing} &= "+fmt(total)+" - "+u4Sum(known)+" \\\\ &= "+miss+" \\end{aligned} \\] The answer is <b>"+miss+"</b>.",
      {mode:mode, known:known});
  }
  if(mode==="combined"){
    var n1=pick([4,5,6]), n2=pick([4,5,6]), m1=ri(55,85), m2=m1+pick([-18,-12,-9,9,12,18]);
    var ans=(n1*m1+n2*m2)/(n1+n2);
    var cands=[
      {v:(m1+m2)/2, fb:"That averages the two means equally: the groups have different sizes, so weight each mean by its group size."},
      {v:m1, fb:"That is only the first group's mean: the second group must count as well."},
      {v:ans+3, fb:"That overshoots: weight each group mean by its size, add, then divide by the total size."}];
    var opts=u4NumDist(ans,cands,1);
    var _bo1=balOpts({t:fmt(ans), fb:"Yes: weight each mean by its group size, add the totals, and divide by "+(n1+n2)+"."}, opts); return mcq("One group of "+n1+" students has a mean score of "+m1+". Another group of "+n2+" students has a mean score of "+m2+". What is the mean score of all "+(n1+n2)+" students combined?", _bo1[0], _bo1[1],
      "Recover each group total, then combine. \\[ \\begin{aligned} \\text{Combined mean} &= \\frac{"+n1+" \\times "+m1+" + "+n2+" \\times "+m2+"}{"+(n1+n2)+"} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
      {mode:mode, n1:n1, n2:n2});
  }
  if(mode==="trim2"){
    var vals=[], i2; for(i2=0;i2<10;i2++) vals.push(ri(20,96));
    var s=u4Sorted(vals), rest=s.slice(2,8), ans=u4Sum(rest)/6;
    var cands=[
      {v:u4Sum(vals)/10, fb:"That averages all ten values: this trim drops the two lowest and two highest."},
      {v:u4Median(vals), fb:"That is the median: the trimmed mean averages the six values left after trimming."},
      {v:u4Sum(s.slice(1,9))/8, fb:"That drops only one value at each end: this trim drops two at each end."}];
    var opts=u4NumDist(ans,cands,1);
    var _bo2=balOpts({t:fmt(ans), fb:"Yes: after dropping "+s[0]+", "+s[1]+", "+s[8]+" and "+s[9]+", the six remaining values total "+u4Sum(rest)+"."}, opts); return mcq("Data: "+vals.join(", ")+". A trimmed mean drops the two lowest and two highest values. What is the trimmed mean?", _bo2[0], _bo2[1],
      "Order and trim: drop "+s[0]+", "+s[1]+", "+s[8]+", "+s[9]+". \\[ \\begin{aligned} \\text{Trimmed mean} &= \\frac{"+u4Sum(rest)+"}{6} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"</b>.",
      {mode:mode, vals:vals});
  }
  var base=ri(22,34), cluster=[], j;
  for(j=0;j<7;j++) cluster.push(base+ri(-4,5));
  var out=base+ri(42,62), all=cluster.concat([out]);
  var medAfter=u4Median(cluster);
  var cands=[
    {v:u4Median(all), fb:"That is the median with the outlier included: remove the outlier first, then take the middle."},
    {v:u4Sum(cluster)/7, fb:"That is the mean after removal: the question asks for the median after removal."},
    {v:out, fb:"That is the outlier itself: it is removed, not reported as the median."}];
  var opts=u4NumDist(medAfter,cands,1);
  var _bo3=balOpts({t:fmt(medAfter), fb:"Yes: the remaining values in order are "+u4Sorted(cluster).join(", ")+", with middle value "+fmt(medAfter)+"."}, opts); return mcq("Data: "+all.join(", ")+". The value "+out+" is an outlier and is removed. What is the median of the remaining data?", _bo3[0], _bo3[1],
    "Remove \\("+out+"\\), order the rest: "+u4Sorted(cluster).join(", ")+". The middle value is the median. The answer is <b>"+fmt(medAfter)+"</b>.",
    {mode:mode, out:out});
}, ["Work out which total, order, or weighting the question is really asking for.", "Start by writing what is given: the totals, the ordered values, or the group sizes."]);

E("u4-outlier-effect-cr", 4, ["6.8","6.7"], 3, "gen", function(){
  var base=ri(18,30), cluster=[], i;
  for(i=0;i<7;i++) cluster.push(base+ri(-4,4));
  var out=base+ri(45,70), all=cluster.concat([out]);
  var withOut=u4Sum(all)/8, without=u4Sum(cluster)/7, diff=withOut-without;
  var q=numq("A team records these points per game: "+shuffle(all).join(", ")+". The value "+out+" is an outlier. By how much does the outlier raise the mean? Give your answer as a number of points, to one decimal place. Show your work on paper.",
    Math.round(diff*10)/10, 0.15,
    "Find the mean both ways and subtract. \\[ \\begin{aligned} \\text{Mean with outlier} &= \\frac{"+u4Sum(all)+"}{8} = "+fmt(withOut)+" \\\\ \\text{Mean without outlier} &= \\frac{"+u4Sum(cluster)+"}{7} = "+fmt(without)+" \\\\ \\text{Raise} &= "+fmt(withOut)+" - "+fmt(without)+" \\\\ &\\approx "+fmt(diff,1)+" \\end{aligned} \\] The median barely moves when the outlier is removed, which shows why the median resists outliers while the mean does not. The answer is <b>"+fmt(diff,1)+" points</b>.",
    {all:all, out:out});
  q.figure=u4Dots(all);
  return q;
}, ["Calculate the mean with the outlier and without it, then compare.", "Start by totalling all the values, including the outlier."]);

E("u4-weighted-advanced-cr", 4, ["6.6","6.5"], 3, "gen", function(){
  var tests=[ri(55,95),ri(55,95),ri(55,95)];
  var testAvg=u4Sum(tests)/3;
  var proj=ri(55,97), exam=ri(50,96);
  var ans=(testAvg*30+proj*30+exam*40)/100;
  return numq("A final mark is weighted: Tests 30% (three test marks: "+tests.join(", ")+"), Project 30% (mark "+proj+"%), Final exam 40% (mark "+exam+"%). First average the three tests, then calculate the weighted final mark, as a percent. Show your work on paper.",
    ans, 0.6,
    "Average the tests first, then weight each part. The exam carries the largest weight because it is intended to count most toward the final mark. \\[ \\begin{aligned} \\text{Test average} &= \\frac{"+u4Sum(tests)+"}{3} = "+fmt(testAvg)+" \\\\ \\text{Final mark} &= \\frac{"+fmt(testAvg)+" \\times 30 + "+proj+" \\times 30 + "+exam+" \\times 40}{100} \\\\ &= "+fmt(ans)+" \\end{aligned} \\] The answer is <b>"+fmt(ans)+"%</b>.",
    {tests:tests, proj:proj, exam:exam});
}, ["Handle the test average first, then apply the weights.", "Start by averaging the three test marks."]);

/* ----- bank-u5.js ----- */
// Math 3202 Unit 5 Major Financial Purchases question bank
// CRMARKS: u5-lease-total-cr=3
// CRMARKS: u5-operating-cost-cr=4
// CRMARKS: u5-home-cash-cr=5
// CRMARKS: u5-rental-term-cr=4
// CRMARKS: u5-rent-own-province-cr=5
/* ===== Unit 5 ===== */
/* Math 3202 Unit 5: Major Financial Purchases (1.1-1.4, 1.10-1.12). Helpers prefixed u5. */
function u5M(n){ var neg=n<0; var s=Math.abs(Math.round(n*100)/100).toFixed(2); var p=s.split("."); p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,","); return (neg?"-$":"$")+p[0]+"."+p[1]; }
function u5Bar(items){
  var W=320,H=190,base=158,ox=36,max=0,i;
  for(i=0;i<items.length;i++) if(items[i].v>max) max=items[i].v;
  var step=(W-ox-10)/items.length, bw=Math.min(46,step-14);
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Monthly cost breakdown bar chart">';
  s+='<line x1="'+ox+'" y1="12" x2="'+ox+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+ox+'" y1="'+base+'" x2="'+(W-6)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  for(i=0;i<items.length;i++){ var h=items[i].v/max*(base-30), x=ox+8+i*step, y=base-h;
    s+='<rect x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" width="'+fmt(bw,1)+'" height="'+fmt(h,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    s+='<text x="'+fmt(x+bw/2,1)+'" y="'+fmt(y-6,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+u5M(items[i].v)+'</text>';
    s+='<text x="'+fmt(x+bw/2,1)+'" y="'+(base+15)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+items[i].label+'</text>'; }
  return s+'</svg>';
}

E("u5-vehicle-options", 5, ["1.1"], 1, "var", varset([
  function(){ return mcq("Sam pays the full price of a used truck in one payment and the truck is his from that day. Which vehicle option is this?",
    {t:"Buying outright", fb:"Yes: paying the full price at once makes the vehicle yours right away."},
    [{t:"Leasing", fb:"Leasing uses monthly payments for a set term and the vehicle is returned at the end unless a buyout is paid."},
     {t:"Leasing to buy", fb:"Leasing to buy spreads payments over time before ownership, so it does not match one full payment."},
     {t:"Buying with a loan", fb:"A loan spreads the price over many payments with interest, so it does not match paying in full at once."}],
    "Paying the full price in one payment, with ownership passing at once, is <b>buying outright</b>.", {}); },
  function(){ return mcq("Priya pays a car dealer a monthly amount for 36 months, stays under a yearly kilometre limit, and returns the car at the end of the term. Which vehicle option is this?",
    {t:"Leasing", fb:"Yes: monthly payments for a fixed term, a kilometre limit, and returning the vehicle are the marks of a lease."},
    [{t:"Buying outright", fb:"Buying outright is one full payment, not 36 monthly payments ending with a return."},
     {t:"Leasing to buy", fb:"Leasing to buy ends with the driver owning the vehicle, not returning it."},
     {t:"Buying with a loan", fb:"With a loan the borrower keeps the vehicle once the loan is repaid, and there is no kilometre limit."}],
    "A fixed term of monthly payments, a kilometre limit, and returning the vehicle at the end describe <b>leasing</b>.", {}); },
  function(){ return mcq("Devon makes lower monthly payments for three years, and those payments count toward the price of the vehicle, which he owns at the end of the agreement. Which vehicle option is this?",
    {t:"Leasing to buy", fb:"Yes: payments during the term build toward owning the vehicle at the end."},
    [{t:"Buying outright", fb:"Buying outright means one full payment at the start, not three years of payments."},
     {t:"Leasing", fb:"In a plain lease the vehicle is returned at the end unless a separate buyout is paid."},
     {t:"Buying with a loan", fb:"A loan buyer owns the vehicle from the start and repays the lender; here ownership comes at the end of the agreement."}],
    "Payments that build toward ownership at the end of the agreement describe <b>leasing to buy</b>.", {}); },
  function(){ return mcq("A bank lends Mia the price of an SUV. She owns the SUV from the start and repays the bank monthly, with interest, over five years. Which vehicle option is this?",
    {t:"Buying with a loan", fb:"Yes: she owns the vehicle while repaying borrowed money with interest."},
    [{t:"Buying outright", fb:"Buying outright uses her own money in one payment, with no borrowing or interest."},
     {t:"Leasing", fb:"Leasing ends with returning the vehicle, and the payments rent its use rather than repay a loan."},
     {t:"Leasing to buy", fb:"Leasing to buy gives ownership at the end of the agreement, but Mia owns the SUV from the start."}],
    "Owning the vehicle from the start while repaying borrowed money with interest is <b>buying with a loan</b>.", {}); },
  function(){ return mcq("A plumbing company gets two new vans for four years. It pays monthly, the dealer covers most repairs under warranty during the term, and the vans go back at the end. Which vehicle option is this?",
    {t:"Leasing", fb:"Yes: a business lease gives newer vehicles for a term, with warranty cover, and the vehicles are returned."},
    [{t:"Buying outright", fb:"Buying outright would be one full payment per van and the company would keep them."},
     {t:"Leasing to buy", fb:"Leasing to buy would end with the company owning the vans, not returning them."},
     {t:"Buying with a loan", fb:"A loan would leave the company owning the vans after repayment, with no return at the end."}],
    "Monthly payments for a set term, warranty cover during the term, and returning the vehicles describe <b>leasing</b>.", {}); },
  function(){ return mcq("Which statement best describes leasing to buy?",
    {t:"Payments over a term lead to owning the vehicle at the end of the agreement.", fb:"Yes: that path from payments to ownership is what sets leasing to buy apart."},
    [{t:"The full price is paid on the first day and no payments follow.", fb:"That describes buying outright."},
     {t:"The vehicle is returned at the end and payments never build toward ownership.", fb:"That describes a plain lease."},
     {t:"A bank lends the full price and the buyer owns the vehicle from the first day.", fb:"That describes buying with a loan."}],
    "In leasing to buy, the payments made during the term lead to the driver owning the vehicle at the end. The answer is <b>the payments-to-ownership statement</b>.", {}); }
]), ["Think about two things: how the payments work, and who owns the vehicle at the end.", "Start by asking whether the vehicle is kept, returned, or owned from the first day."]);

E("u5-home-costs-identify", 5, ["1.11"], 1, "var", varset([
  function(){ return mcq("Which cost is paid once, as part of buying a home, rather than as part of keeping a home year after year?",
    {t:"Closing costs, such as legal fees for the purchase", fb:"Yes: legal and closing fees are paid at the time of purchase."},
    [{t:"Property tax", fb:"Property tax is charged every year, so it is a cost of keeping the home."},
     {t:"Home insurance premiums", fb:"Insurance premiums are paid every year to keep cover in place."},
     {t:"Heating costs", fb:"Heating is an ongoing cost of living in and keeping the home."}],
    "Legal fees and other closing costs are paid once when the purchase closes. The answer is <b>closing costs</b>.", {}); },
  function(){ return mcq("A buyer pays 10 percent of the purchase price from savings on closing day, and borrows the rest with a mortgage. What is that 10 percent payment called?",
    {t:"The down payment", fb:"Yes: the part of the price paid from the buyer's own money at purchase is the down payment."},
    [{t:"The property tax", fb:"Property tax is a yearly charge from the municipality, not part of the price paid to the seller."},
     {t:"The closing cost", fb:"Closing costs are fees such as legal and inspection fees, separate from the share of the price itself."},
     {t:"The insurance premium", fb:"A premium pays for insurance cover over a period of time, not for a share of the house price."}],
    "The share of the purchase price paid from the buyer's own savings is the <b>down payment</b>.", {}); },
  function(){ return mcq("Which cost is a cost of maintaining a home after the purchase is complete?",
    {t:"Replacing worn roof shingles", fb:"Yes: repairs such as a new roof keep the home in good condition after purchase."},
    [{t:"The down payment", fb:"The down payment is paid once, at the time of purchase."},
     {t:"Legal fees for the purchase", fb:"Legal fees for the purchase are closing costs, paid once when the home is bought."},
     {t:"A home inspection before buying", fb:"An inspection before buying is a purchase cost, paid before or at closing."}],
    "Repairs after moving in, such as replacing shingles, are maintenance costs. The answer is <b>replacing worn roof shingles</b>.", {}); },
  function(){ return mcq("A town charges a homeowner a yearly amount based on the value of the house and land. Which home cost is this?",
    {t:"Property tax", fb:"Yes: municipalities charge property tax each year based on the value of the property."},
    [{t:"The down payment", fb:"The down payment is paid once to buy the home, not yearly to the town."},
     {t:"Closing costs", fb:"Closing costs are one-time fees at purchase, not a yearly charge based on value."},
     {t:"The mortgage payment", fb:"A mortgage payment repays the loan; it goes to the lender, not to the town as a tax."}],
    "A yearly charge from the town based on the value of the house and land is <b>property tax</b>.", {}); },
  function(){ return mcq("Which list contains only costs a homeowner should budget for after the purchase is complete?",
    {t:"Property tax, home insurance, heating and repairs", fb:"Yes: all four return year after year once the home is owned."},
    [{t:"Down payment, legal fees, property tax and heating", fb:"The down payment and legal fees are paid once at purchase, so this list mixes the two groups."},
     {t:"Home inspection, closing costs, insurance and repairs", fb:"The inspection and closing costs belong to the purchase, not to the years after it."},
     {t:"Down payment, home inspection, legal fees and closing costs", fb:"Every item in this list is a one-time purchase cost."}],
    "After purchase, the recurring costs include property tax, insurance, heating and repairs. The answer is <b>the list of yearly costs</b>.", {}); },
  function(){ return mcq("Before a sale closes, a buyer pays a professional to check the furnace, roof and structure of the house. Which purchase cost is this?",
    {t:"A home inspection fee", fb:"Yes: an inspection checks the condition of the home before the buyer commits."},
    [{t:"A maintenance cost", fb:"Maintenance is upkeep of the home after purchase; this check happens before the sale closes."},
     {t:"Property tax", fb:"Property tax is a yearly municipal charge, not a one-time check of condition."},
     {t:"An insurance premium", fb:"A premium buys insurance cover; it does not pay for an inspection of the house."}],
    "Paying to have the condition of the home checked before closing is a <b>home inspection fee</b>, a cost of purchasing.", {}); }
]), ["Sort each cost by when it is paid: once at purchase, or again and again afterwards.", "Start by asking whether the cost happens on closing day or in the years that follow."]);

E("u5-operating-cost-types", 5, ["1.4"], 1, "var", varset([
  function(){ return mcq("For a car owner, which cost is a fixed cost of operating a vehicle?",
    {t:"Yearly insurance premium", fb:"Yes: the premium is set for the year and does not change with how far the car is driven."},
    [{t:"Fuel", fb:"Fuel cost grows with distance driven, so it is an ongoing, distance-based cost."},
     {t:"Oil changes", fb:"Oil changes come due with use and distance, so they are an ongoing cost."},
     {t:"Brake repairs", fb:"Repairs depend on wear and use, so they are ongoing costs, not fixed ones."}],
    "Fixed costs stay the same regardless of distance driven. The yearly insurance premium is a <b>fixed cost</b>.", {}); },
  function(){ return mcq("For a car owner, which cost is an ongoing cost of operating a vehicle?",
    {t:"Fuel used on each trip", fb:"Yes: fuel is bought again and again, and the amount depends on how much the car is driven."},
    [{t:"Yearly vehicle registration", fb:"Registration is a set yearly fee, so it is a fixed cost."},
     {t:"Insurance premium", fb:"The premium is set for the policy period, so it is a fixed cost."},
     {t:"Extended warranty payment", fb:"An extended warranty is a set amount agreed in advance, so it is a fixed cost."}],
    "Ongoing costs rise and fall with use. Fuel is an <b>ongoing cost</b>.", {}); },
  function(){ return mcq("A driver buys an extended warranty that covers major repairs for a set yearly amount agreed when the car was purchased. How should this cost be classed?",
    {t:"A fixed cost, because the amount is set in advance", fb:"Yes: the warranty amount is agreed ahead of time and does not depend on distance driven."},
    [{t:"An ongoing cost, because repairs happen over time", fb:"The warranty price itself is fixed in advance, even though it covers repairs that may happen later."},
     {t:"A purchase cost, because it was arranged at purchase time", fb:"The warranty covers operating the car during ownership, and its set amount makes it a fixed operating cost."},
     {t:"A fuel cost, because it keeps the car running", fb:"Fuel is bought per trip; the warranty is a set amount, unrelated to fuel."}],
    "An amount set in advance, the same no matter the distance driven, is a fixed cost. The answer is <b>a fixed cost</b>.", {}); },
  function(){ return mcq("Which statement about vehicle operating costs is correct?",
    {t:"Licensing is a fixed cost, while tires and maintenance are ongoing costs.", fb:"Yes: licensing is a set fee, and tires and maintenance depend on use and wear."},
    [{t:"Licensing and fuel are both fixed costs.", fb:"Fuel depends on distance driven, so fuel is an ongoing cost."},
     {t:"Insurance is an ongoing cost because it is paid every year.", fb:"A cost can repeat yearly and still be fixed: the insurance amount is set for the year, not driven by distance."},
     {t:"Maintenance is a fixed cost because every car needs it.", fb:"Needing maintenance does not make its cost fixed: the amount depends on use and wear."}],
    "Fixed costs are set amounts, such as licensing. Ongoing costs, such as tires and maintenance, depend on use. The answer is <b>the licensing statement</b>.", {}); },
  function(){ return mcq("A delivery driver tracks costs for a van. Which item belongs with the ongoing costs?",
    {t:"Windshield washer fluid and wiper blades", fb:"Yes: these are bought as they are used up or wear out, so they are ongoing costs."},
    [{t:"The yearly licence fee", fb:"The licence fee is a set amount each year, a fixed cost."},
     {t:"The insurance premium", fb:"The premium is set for the policy term, a fixed cost."},
     {t:"The extended warranty", fb:"The warranty amount is agreed in advance, a fixed cost."}],
    "Items bought as they are used up are ongoing costs. The answer is <b>washer fluid and wiper blades</b>.", {}); }
]), ["Fixed costs are set amounts. Ongoing costs change with use and distance.", "Start by asking whether the cost would change if the vehicle were driven twice as far."]);

E("u5-justify-vehicle-choice", 5, ["1.2"], 2, "var", varset([
  function(){ return mcq("Karen drives about 45,000 km a year for work. Most leases charge extra for kilometres over a yearly limit near 24,000 km. Which choice and justification fit her best?",
    {t:"Buy the vehicle, because high yearly kilometres would make lease overage charges very expensive.", fb:"Yes: her distance is far above a typical lease limit, so overage charges would pile up."},
    [{t:"Lease the vehicle, because lease payments are usually lower each month than loan payments.", fb:"Lower monthly payments ignore the overage charges her 45,000 km would trigger."},
     {t:"Lease the vehicle, because she would get a new vehicle every few years, which she would enjoy having.", fb:"A new vehicle does not solve the kilometre problem, which is the deciding factor for her use."},
     {t:"Buy the vehicle, because buying always costs less than leasing in every situation.", fb:"Buying is right here, but not because it always costs less; her high kilometres are the reason."}],
    "Karen's yearly distance is far above a typical lease kilometre limit, so lease overage charges would be large. Buying fits her use. The answer is <b>buy, because of the high kilometres</b>.", {}); },
  function(){ return mcq("Tom drives about 10,000 km a year, likes driving a vehicle that is under warranty, and enjoys changing to a newer model every three years. Which choice and justification fit him best?",
    {t:"Lease, because his low kilometres stay under the limit and the vehicle stays under warranty during the term.", fb:"Yes: low use, warranty cover, and wanting a newer model every few years all point to leasing."},
    [{t:"Buy, because he would own the vehicle at the end of five years and could keep driving it for years after that.", fb:"Owning at the end matters less to Tom; he wants to change vehicles every three years."},
     {t:"Buy outright, because paying cash avoids all interest, and interest is the main cost to avoid.", fb:"Avoiding interest is a real saving, but it ignores his wish for a newer warranted vehicle every three years."},
     {t:"Lease to buy, because he wants to keep the same vehicle for a long time, well past the term.", fb:"Tom wants to change vehicles often, not keep one for a long time."}],
    "Low yearly kilometres, warranty cover during the term, and changing vehicles every three years all suit leasing. The answer is <b>lease, because the factors line up</b>.", {}); },
  function(){ return mcq("Aisha wants to own her car at the end of her agreement, but her budget cannot handle regular loan payments right now. A lease-to-buy agreement offers lower payments first, with ownership at the end. Which judgement fits?",
    {t:"Leasing to buy fits, because the lower early payments suit her budget and she still ends up owning the car.", fb:"Yes: it answers both of her conditions, the payment size now and ownership at the end."},
    [{t:"A plain lease fits, because its payments are the lowest, and low payments are all that matters to her in the end.", fb:"A plain lease ends with returning the car, and Aisha wants to own it."},
     {t:"Buying outright fits, because she would own the car right away, with no monthly payments at all to make.", fb:"Buying outright needs the full price at once, which her budget cannot handle."},
     {t:"A five-year loan fits, because the car is hers from the first day, which settles the matter.", fb:"The loan payments are the very thing her budget cannot handle right now."}],
    "Aisha needs lower payments now and ownership at the end. Leasing to buy gives both. The answer is <b>leasing to buy fits her situation</b>.", {}); },
  function(){ return mcq("George keeps his vehicles for ten years or more and drives each one long after any loan would be paid off. Which choice and justification fit him best?",
    {t:"Buy, because years of driving with no vehicle payment after the loan ends lower his long-term cost.", fb:"Yes: keeping a vehicle well past the payoff date is where buying pays off."},
    [{t:"Lease, because the vehicle would always be new, and a new vehicle is what matters most for the work.", fb:"George keeps vehicles for a decade; starting a new lease every few years would mean payments forever."},
     {t:"Lease, because maintenance is covered by warranty for the whole term of the lease and beyond.", fb:"Warranty cover during a short term does not match a ten-year ownership pattern."},
     {t:"Buy, because leased vehicles cannot be driven in winter, and the bakery delivers all winter.", fb:"Leased vehicles can be driven year round; the season is not a factor in this decision."}],
    "Keeping a vehicle for ten years means many years with no payment once a loan is done. Buying fits. The answer is <b>buy, for the long term with no payments</b>.", {}); },
  function(){ return mcq("A small bakery needs a delivery van. The owner wants predictable costs, warranty cover for repairs, and does not want to deal with selling an old van later. Which choice and justification fit best?",
    {t:"Lease, because payments and warranty cover are predictable and the van is returned at the end.", fb:"Yes: each of the stated needs of the owner matches a feature of leasing."},
    [{t:"Buy outright, because the bakery would own the van forever, which is the main goal.", fb:"Owning forever brings back the selling problem the owner wants to avoid."},
     {t:"Buy with a loan, because the interest can be large, and large interest is worth paying for ownership.", fb:"Large interest is a drawback, not a justification, and it ignores warranty and return needs."},
     {t:"Lease to buy, because the bakery wants to sell the van later, once it is paid for.", fb:"The owner does not want to sell a van later; returning it is the point."}],
    "Predictable payments, warranty cover, and returning the vehicle are all lease features the owner asked for. The answer is <b>lease, for predictability and the return</b>.", {}); },
  function(){ return mcq("Nadia has saved enough to pay cash for a car and plans to drive it for eight years. Which justification for buying outright is strongest?",
    {t:"She pays no interest and has no monthly payment, and she keeps the car long enough for that to pay off.", fb:"Yes: no interest, no payments, and long ownership make paying cash a strong fit."},
    [{t:"Paying cash means she will never pay for repairs or insurance. Those costs vanish when a car is bought outright.", fb:"Owners still pay for repairs and insurance; paying cash removes interest and payments only."},
     {t:"Paying cash raises the resale value of the car, since a cash-bought car is worth more at resale.", fb:"How the car was paid for does not change what a buyer will pay for it later."},
     {t:"Paying cash is best because leasing is not allowed in this province, so it is not a real choice.", fb:"Leasing is allowed; the decision rests on cost and use, not on a ban."}],
    "Paying cash removes interest and monthly payments, and eight years of use spreads the price well. The answer is <b>no interest and long ownership</b>.", {}); }
]), ["Weigh the finances, use, kilometres, and how long the person keeps a vehicle.", "Start by finding the factor in the scenario that rules one option out or makes it costly."]);

E("u5-option-match", 5, ["1.1"], 2, "gen", function(){
  var names=["Liam","Emma","Noah","Ava","Lucas","Mia","Ethan","Ruby","Owen","Chloe","Adam","Grace"];
  var vehs=["compact car","pickup truck","small SUV","minivan","sedan","work van"];
  var modes=[
    {key:"Buying outright", txt:function(n,v,p,t){ return n+" pays "+u5M(p)+" in full for a "+v+" and owns it that same day."; },
     fb:"One full payment and ownership on the same day is buying outright."},
    {key:"Leasing", txt:function(n,v,p,t){ return n+" pays "+u5M(p)+" a month for "+t+" months on a "+v+", then returns it at the end of the term."; },
     fb:"Monthly payments for a term, ending with returning the vehicle, is leasing."},
    {key:"Leasing to buy", txt:function(n,v,p,t){ return n+" pays "+u5M(p)+" a month for "+t+" months on a "+v+", and the payments count toward owning it at the end."; },
     fb:"Payments that count toward ownership at the end is leasing to buy."},
    {key:"Buying with a loan", txt:function(n,v,p,t){ return n+" borrows the price of a "+v+", owns it from the first day, and repays "+u5M(p)+" a month for "+t+" months, plus interest."; },
     fb:"Owning from the first day while repaying borrowed money is buying with a loan."}];
  var m=pick(modes), n=pick(names), v=pick(vehs);
  var p=(m.key==="Buying outright")? ri(90,420)*100 : ri(24,72)*10;
  var t=pick([24,36,36,48,48,60]);
  var opts=modes.filter(function(x){return x.key!==m.key;}).map(function(x){ return {t:x.key, fb:"That option works differently from the one described: check its payment pattern and its end result."}; });
  return mcq(m.txt(n,v,p,t)+" Which vehicle option is described?",
    {t:m.key, fb:"Yes: "+m.fb}, opts,
    "Look at how the payments work and who owns the vehicle at the end. "+m.fb+" The answer is <b>"+m.key+"</b>.",
    {mode:m.key});
}, ["Ask two questions: how is it paid for, and who owns the vehicle at the end?", "Start by checking whether the vehicle is returned, kept, or owned from day one."]);

E("u5-lease-total-cr", 5, ["1.3"], 2, "gen", function(){
  var veh=pick(["compact SUV","sedan","pickup truck","hatchback"]);
  var monthly=ri(56,118)*5, months=pick([24,36,48]), upfront=ri(8,30)*100, buyout=ri(60,160)*100;
  var total=monthly*months+upfront+buyout;
  return numq("A driver leases a "+veh+" for "+months+" months at "+u5M(monthly)+" per month. At the start, the driver pays "+u5M(upfront)+" in fees and a down payment. At the end of the lease, the driver pays a buyout of "+u5M(buyout)+" to keep the vehicle. What is the total cost, in dollars, of leasing and then buying out this vehicle? Give the number only.",
    total, 0.5,
    "Add the monthly payments, the upfront costs, and the buyout. \\[ \\begin{aligned} \\text{monthly payments} &= "+months+" \\times "+fmt(monthly)+" = "+fmt(monthly*months)+" \\\\ \\text{total} &= "+fmt(monthly*months)+" + "+fmt(upfront)+" + "+fmt(buyout)+" = "+fmt(total)+" \\end{aligned} \\] The total cost is <b>"+u5M(total)+"</b>.",
    {monthly:monthly,months:months,upfront:upfront,buyout:buyout});
}, ["A lease total has three parts: the monthly payments, the upfront costs, and the buyout.", "Start by multiplying the monthly payment by the number of months."]);

E("u5-operating-cost-cr", 5, ["1.4"], 2, "gen", function(){
  var veh=pick(["family car","work truck","delivery van","compact car"]);
  var ins=ri(110,220)*10, lic=pick([90,105,120,150,175]), dist=ri(12,30)*1000;
  var cons=pick([7,8,8.5,9,10,11,12]), price=pick([1.58,1.62,1.65,1.71,1.74,1.79]);
  var maint=ri(60,150)*10;
  var fuel=Math.round(dist/100*cons*price*100)/100;
  var total=Math.round((ins+lic+fuel+maint)*100)/100;
  return numq("The yearly costs of operating a "+veh+" are: insurance "+u5M(ins)+", licensing "+u5M(lic)+", and maintenance "+u5M(maint)+". The vehicle is driven "+fmt(dist)+" km in the year, uses "+fmt(cons)+" L of fuel per 100 km, and fuel costs "+u5M(price)+" per litre. What is the total cost, in dollars, of operating the vehicle for the year? Give the number only. Round money to the cent.",
    total, 0.05,
    "Work out the fuel cost first, then add the fixed and maintenance costs. \\[ \\begin{aligned} \\text{fuel used} &= "+fmt(dist)+" \\div 100 \\times "+fmt(cons)+" = "+fmt(dist/100*cons)+"\\ \\text{L} \\\\ \\text{fuel cost} &= "+fmt(dist/100*cons)+" \\times "+fmt(price)+" = "+fmt(fuel)+" \\\\ \\text{total} &= "+fmt(ins)+" + "+fmt(lic)+" + "+fmt(fuel)+" + "+fmt(maint)+" = "+fmt(total)+" \\end{aligned} \\] The total operating cost is <b>"+u5M(total)+"</b>.",
    {ins:ins,lic:lic,dist:dist,cons:cons,price:price,maint:maint});
}, ["Split the cost into fuel, found from distance and consumption, plus the set yearly amounts.", "Start by finding how many litres the vehicle uses over the year."]);

E("u5-rental-monthly", 5, ["1.10"], 2, "gen", function(){
  var towns=["St. John's","Corner Brook","Mount Pearl","Paradise","Gander","Grand Falls-Windsor","Conception Bay South","Labrador City"];
  var town=pick(towns), rent=ri(85,165)*10, util=pick([0,80,100,120,140,160]), park=pick([0,40,50,60,75]), tins=pick([20,25,30,35]);
  var total=rent+util+park+tins;
  var depositErr=total+Math.round(rent/12);
  while(depositErr===total+120 || depositErr===total+50) depositErr+=13;
  var opts=[
    {t:u5M(rent+park+tins), fb:"That total leaves out the utilities of "+u5M(util)+" a month."},
    {t:u5M(rent+util+park), fb:"That total leaves out the tenant insurance of "+u5M(tins)+" a month."},
    {t:u5M(depositErr), fb:"That total spreads the one-time deposit over the year. A deposit is paid once, not monthly."}];
  if(util===0) opts[0]={t:u5M(total+120), fb:"That total adds utilities, but the stem says utilities are included in the rent."};
  if(park===0) opts[1]={t:u5M(total+50), fb:"That total adds parking, but the stem says parking is included at no extra charge."};
  var utilTxt=(util===0)?"utilities are included in the rent":"utilities cost "+u5M(util)+" a month";
  var parkTxt=(park===0)?"parking is included at no extra charge":"parking costs "+u5M(park)+" a month";
  var q=mcq("An apartment in "+town+" rents for "+u5M(rent)+" a month. In this unit, "+utilTxt+", "+parkTxt+", and tenant insurance costs "+u5M(tins)+" a month. A deposit of "+u5M(rent)+" is paid once at signing. What is the total monthly cost of this apartment?",
    {t:u5M(total), fb:"Yes: rent plus utilities plus parking plus insurance, with the one-time deposit left out."}, opts,
    "Monthly costs only: add the items that repeat every month, and leave out the one-time deposit. \\[ \\begin{aligned} \\text{monthly total} &= "+fmt(rent)+" + "+fmt(util)+" + "+fmt(park)+" + "+fmt(tins)+" \\\\ &= "+fmt(total)+" \\end{aligned} \\] The total monthly cost is <b>"+u5M(total)+"</b>.",
    {town:town,rent:rent,util:util,park:park,tins:tins});
  q.figure=u5Bar([{label:"Rent",v:rent},{label:"Utilities",v:util},{label:"Parking",v:park},{label:"Insurance",v:tins}]);
  return q;
}, ["Add only the costs that repeat every month.", "Start with the rent, then add each monthly extra one at a time."]);

E("u5-home-cash-cr", 5, ["1.11"], 2, "gen", function(){
  var price=ri(220,480)*1000, pct=pick([5,10,15,20]);
  var down=price*pct/100;
  var legal=ri(14,28)*100, insp=pick([400,450,500,550]), appr=pick([300,350,400]), other=ri(4,12)*100;
  var closing=legal+insp+appr+other;
  var total=down+closing;
  return numq("A family buys a home for "+u5M(price)+". They make a down payment of "+pct+" percent of the price. Their closing costs are: legal fees "+u5M(legal)+", a home inspection "+u5M(insp)+", an appraisal "+u5M(appr)+", and other fees "+u5M(other)+". How much cash, in dollars, do they need on closing day for the down payment and closing costs together? Give the number only.",
    total, 0.5,
    "Find the down payment first, then add all the closing costs. \\[ \\begin{aligned} \\text{down payment} &= "+fmt(pct/100)+" \\times "+fmt(price)+" = "+fmt(down)+" \\\\ \\text{closing costs} &= "+fmt(legal)+" + "+fmt(insp)+" + "+fmt(appr)+" + "+fmt(other)+" = "+fmt(closing)+" \\\\ \\text{cash needed} &= "+fmt(down)+" + "+fmt(closing)+" = "+fmt(total)+" \\end{aligned} \\] The cash needed on closing day is <b>"+u5M(total)+"</b>.",
    {price:price,pct:pct,down:down,closing:closing});
}, ["Cash on closing day is the down payment plus every closing cost.", "Start by changing the percent to a decimal and finding the down payment."]);

E("u5-vehicle-deal-compare", 5, ["1.3"], 2, "gen", function(){
  var guard=0, price, interest, pTotal, monthly, months, upfront, lTotal;
  do { price=ri(180,340)*100; interest=ri(14,42)*100; pTotal=Math.round(price*1.15)+interest;
    monthly=ri(30,56)*10; months=pick([36,48]); upfront=ri(10,30)*100; lTotal=monthly*months+upfront; guard++;
  } while((Math.abs(pTotal-lTotal)<400 || Math.abs(price+interest-lTotal)<200 || Math.abs(monthly*months-pTotal)<200 || Math.abs(price+interest-monthly*months)<200) && guard<60);
  if(Math.abs(pTotal-lTotal)<400 || Math.abs(price+interest-lTotal)<200 || Math.abs(monthly*months-pTotal)<200 || Math.abs(price+interest-monthly*months)<200){ price=25000; interest=2500; pTotal=Math.round(price*1.15)+interest; monthly=380; months=48; upfront=2000; lTotal=monthly*months+upfront; }
  var buyCheaper=pTotal<lTotal, cheap=Math.min(pTotal,lTotal);
  var noTax=price+interest, noUp=monthly*months;
  var opts=[
    {t:u5M(noTax), fb:"That is the purchase price plus interest with no tax. HST of 15 percent applies to the purchase price."},
    {t:u5M(noUp), fb:"That is the lease payments only. The lease also has upfront costs of "+u5M(upfront)+"."},
    {t:u5M(buyCheaper?lTotal:pTotal), fb:"That is the total for the other deal, which is the more expensive of the two."}];
  return mcq("Deal A: buy a vehicle priced at "+u5M(price)+". HST of 15 percent is added to the price, and the loan interest over the full term totals "+u5M(interest)+". Deal B: lease the same vehicle at "+u5M(monthly)+" a month for "+months+" months, with "+u5M(upfront)+" in upfront costs, and return it at the end. What is the total cost of the cheaper deal?",
    {t:u5M(cheap), fb:"Yes: the purchase totals "+u5M(pTotal)+" and the lease totals "+u5M(lTotal)+", so the lower figure is the answer."}, opts,
    "Total each deal on the same footing. \\[ \\begin{aligned} \\text{purchase} &= "+fmt(price)+" \\times 1.15 + "+fmt(interest)+" = "+fmt(pTotal)+" \\\\ \\text{lease} &= "+months+" \\times "+fmt(monthly)+" + "+fmt(upfront)+" = "+fmt(lTotal)+" \\end{aligned} \\] The cheaper total is <b>"+u5M(cheap)+"</b>.",
    {pTotal:pTotal,lTotal:lTotal});
}, ["Total each deal completely before comparing: tax and interest on one side, payments and upfront costs on the other.", "Start with Deal A: add 15 percent HST to the price, then add the interest."]);

E("u5-rent-vs-own", 5, ["1.12"], 2, "gen", function(){
  var years=pick([3,4,5]), rent=ri(95,145)*10, rUtil=pick([100,130,150,180]);
  var mort=ri(120,175)*10, tax=pick([2400,2800,3200,3600]), ins=pick([1000,1150,1300]), upkeep=pick([1200,1500,1800,2100]);
  var rTotal=rent*12*years + rUtil*12*years;
  var oTotal=mort*12*years + (tax+ins+upkeep)*years;
  var rentLower=rTotal<oTotal;
  var correctTxt=rentLower?("Renting is lower, at "+u5M(rTotal)+" versus "+u5M(oTotal)+" for owning"):("Owning is lower, at "+u5M(oTotal)+" versus "+u5M(rTotal)+" for renting");
  var swappedTxt=rentLower?("Owning is lower, at "+u5M(rTotal)+" versus "+u5M(oTotal)+" for renting"):("Renting is lower, at "+u5M(oTotal)+" versus "+u5M(rTotal)+" for owning");
  var opts=[
    {t:swappedTxt, fb:"The two totals are attached to the wrong options: check which total belongs to renting and which to owning."},
    {t:"Renting is lower, at "+u5M(rent*12*years)+" versus "+u5M(oTotal)+" for owning", fb:"The renting total there leaves out utilities of "+u5M(rUtil)+" a month."},
    {t:"Owning is lower, at "+u5M(mort*12*years)+" versus "+u5M(rTotal)+" for renting", fb:"The owning total there leaves out property tax, insurance and upkeep."}];
  if(!rentLower){ opts[1]={t:"Owning is lower, at "+u5M(mort*12*years)+" versus "+u5M(rTotal)+" for renting", fb:"The owning total there leaves out property tax, insurance and upkeep."};
    opts[2]={t:"Renting is lower, at "+u5M(rent*12*years)+" versus "+u5M(oTotal)+" for owning", fb:"The renting total there leaves out utilities of "+u5M(rUtil)+" a month."}; }
  return mcq("Over "+years+" years in Newfoundland and Labrador, compare two options. Renting: "+u5M(rent)+" a month plus utilities of "+u5M(rUtil)+" a month. Owning: mortgage payments of "+u5M(mort)+" a month, plus each year property tax of "+u5M(tax)+", home insurance of "+u5M(ins)+", and upkeep of "+u5M(upkeep)+". Which statement is correct?",
    {t:correctTxt, fb:"Yes: those are the full totals for the whole period, and the lower one is named correctly."}, opts,
    "Bring both options to the same "+years+" year period. \\[ \\begin{aligned} \\text{renting} &= ("+fmt(rent)+" + "+fmt(rUtil)+") \\times 12 \\times "+years+" = "+fmt(rTotal)+" \\\\ \\text{owning} &= "+fmt(mort)+" \\times 12 \\times "+years+" + ("+fmt(tax)+" + "+fmt(ins)+" + "+fmt(upkeep)+") \\times "+years+" = "+fmt(oTotal)+" \\end{aligned} \\] The answer is <b>"+correctTxt+"</b>.",
    {years:years,rTotal:rTotal,oTotal:oTotal});
}, ["Compare the two options over exactly the same time period, with every cost included.", "Start by turning each monthly amount into a total for the full period."]);

E("u5-rental-term-cr", 5, ["1.10"], 3, "gen", function(){
  var towns=["St. John's","Corner Brook","Mount Pearl","Gander","Happy Valley-Goose Bay"];
  var town=pick(towns), rent=ri(90,150)*10, util=pick([90,110,130,150]), park=pick([40,50,60,75]), deposit=rent;
  var total=rent*11 + (util+park)*12 + deposit;
  return numq("A tenant signs a 12 month lease on an apartment in "+town+". The rent is "+u5M(rent)+" a month, but the first month is free. Utilities cost "+u5M(util)+" a month and parking costs "+u5M(park)+" a month, and both are charged for all 12 months. A deposit of "+u5M(deposit)+" is paid once at signing. What is the total cost, in dollars, of the full 12 month term? Give the number only.",
    total, 0.5,
    "Rent is paid for 11 of the 12 months because the first month is free, while utilities and parking run for all 12. \\[ \\begin{aligned} \\text{rent} &= 11 \\times "+fmt(rent)+" = "+fmt(rent*11)+" \\\\ \\text{utilities and parking} &= ("+fmt(util)+" + "+fmt(park)+") \\times 12 = "+fmt((util+park)*12)+" \\\\ \\text{total} &= "+fmt(rent*11)+" + "+fmt((util+park)*12)+" + "+fmt(deposit)+" = "+fmt(total)+" \\end{aligned} \\] The total cost of the term is <b>"+u5M(total)+"</b>.",
    {town:town,rent:rent,util:util,park:park,deposit:deposit});
}, ["Track each part for the right number of months: rent for 11, the rest for 12, and the deposit once.", "Start with the rent: multiply by 11, not 12, because the first month is free."]);

E("u5-rent-own-province-cr", 5, ["1.12"], 3, "gen", function(){
  var years=4, mort=ri(135,175)*10, tax=pick([2400,2700,3000,3300,3600]), ins=pick([1000,1100,1200,1300]), upkeep=pick([1200,1400,1600,1800]);
  var rent=ri(105,130)*10, rUtil=pick([150,180,200,220,250]);
  var oTotal=mort*12*years+(tax+ins+upkeep)*years;
  var rTotal=(rent+rUtil)*12*years;
  var diff=oTotal-rTotal;
  return numq("A family compares two plans over 4 years. Plan A: own a home in St. John's, Newfoundland and Labrador, with mortgage payments of "+u5M(mort)+" a month, plus each year property tax of "+u5M(tax)+", home insurance of "+u5M(ins)+", and upkeep of "+u5M(upkeep)+". Plan B: rent in Halifax, Nova Scotia, at "+u5M(rent)+" a month plus utilities of "+u5M(rUtil)+" a month. How much more, in dollars, does owning cost than renting over the 4 years? Give the number only.",
    diff, 0.5,
    "Total each plan over the same 4 years, then subtract. \\[ \\begin{aligned} \\text{owning} &= "+fmt(mort)+" \\times 48 + ("+fmt(tax)+" + "+fmt(ins)+" + "+fmt(upkeep)+") \\times 4 = "+fmt(oTotal)+" \\\\ \\text{renting} &= ("+fmt(rent)+" + "+fmt(rUtil)+") \\times 48 = "+fmt(rTotal)+" \\\\ \\text{difference} &= "+fmt(oTotal)+" - "+fmt(rTotal)+" = "+fmt(diff)+" \\end{aligned} \\] Owning costs <b>"+u5M(diff)+"</b> more over the 4 years.",
    {oTotal:oTotal,rTotal:rTotal,diff:diff});
}, ["Total both plans over the same 4 year period before subtracting anything.", "Start by turning the monthly mortgage payment into a 48 month total."]);

E("u5-mileage-decision", 5, ["1.2"], 3, "gen", function(){
  var names=["Sarah","Mark","Julie","Peter","Erin","Colin","Tara","Shane"];
  var n=pick(names), excess=pick([4000,5000,6000,8000,10000,12000]), allow=pick([20000,24000,25000]);
  var years=pick([2,3,3,4]), rate=pick([0.10,0.15,0.20,0.25]);
  var over=Math.round(excess*years*rate);
  var overNoYears=Math.round(excess*rate);
  var opts=[
    {t:"The mileage charges come to "+u5M(overNoYears)+", a small amount that should not affect the decision at all.", fb:"That figure covers only one year. The charge applies in every year of the term."},
    {t:"The mileage charges come to "+u5M(over*2)+", so leasing is the clear choice for this driver.", fb:"That doubles the true charge, and a large mileage charge argues against leasing, not for it."},
    {t:"There are no mileage charges at all, because lease payments already cover all driving.", fb:"Lease payments do not cover kilometres above the allowance; extra kilometres are charged at the stated rate."}];
  return mcq(n+" expects to drive "+fmt(allow+excess)+" km a year. A lease allows "+fmt(allow)+" km a year and charges "+u5M(rate)+" for each extra kilometre. The lease runs "+years+" years. Which statement gives the best justification for a decision?",
    {t:"Mileage charges would total "+u5M(over)+" over the term, a strong reason to buy instead of lease.", fb:"Yes: the extra kilometres, the rate, and the full term all count, and the total is a real cost of leasing for this driver."}, opts,
    "Cost the extra kilometres over the whole term. \\[ \\begin{aligned} \\text{extra km per year} &= "+fmt(allow+excess)+" - "+fmt(allow)+" = "+fmt(excess)+" \\\\ \\text{charge} &= "+fmt(excess)+" \\times "+fmt(rate)+" \\times "+years+" = "+fmt(over)+" \\end{aligned} \\] Charges of that size are a strong reason to buy. The answer is <b>the "+u5M(over)+" statement</b>.",
    {excess:excess,years:years,rate:rate,over:over});
}, ["Cost the extra kilometres across every year of the lease, not just one year.", "Start by subtracting the allowance from the expected yearly kilometres."]);

/* ----- bank-u6.js ----- */
// Math 3202 Unit 6 Businesses and Taxes question bank
// CRMARKS: u6-profit-cr=3
// CRMARKS: u6-tax-return-cr=4
// CRMARKS: u6-breakeven-cr=5
// CRMARKS: u6-tax-return-exam-cr=4
// CRMARKS: u6-target-profit-cr=5
/* ===== Unit 6 ===== */
/* Math 3202 Unit 6: Businesses and Taxes (1.5-1.9, 1.13-1.15). Helpers prefixed u6. */
function u6M(n){ var neg=n<0; var s=Math.abs(Math.round(n*100)/100).toFixed(2); var p=s.split("."); p[0]=p[0].replace(/\B(?=(\d{3})+(?!\d))/g,","); return (neg?"-$":"$")+p[0]+"."+p[1]; }
function u6Bar(items){
  var W=320,H=190,base=158,ox=36,max=0,i;
  for(i=0;i<items.length;i++) if(items[i].v>max) max=items[i].v;
  var step=(W-ox-10)/items.length, bw=Math.min(52,step-16);
  var s='<svg width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Cost breakdown bar chart">';
  s+='<line x1="'+ox+'" y1="12" x2="'+ox+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  s+='<line x1="'+ox+'" y1="'+base+'" x2="'+(W-6)+'" y2="'+base+'" stroke="'+FIG_INK+'" stroke-width="1.6"/>';
  for(i=0;i<items.length;i++){ var h=items[i].v/max*(base-30), x=ox+8+i*step, y=base-h;
    s+='<rect x="'+fmt(x,1)+'" y="'+fmt(y,1)+'" width="'+fmt(bw,1)+'" height="'+fmt(h,1)+'" fill="'+FIG_SHADE+'" stroke="'+FIG_INK+'" stroke-width="1.5"/>';
    s+='<text x="'+fmt(x+bw/2,1)+'" y="'+fmt(y-6,1)+'" font-size="10" fill="'+FIG_INK+'" text-anchor="middle">'+u6M(items[i].v)+'</text>';
    s+='<text x="'+fmt(x+bw/2,1)+'" y="'+(base+15)+'" font-size="9" fill="'+FIG_INK+'" text-anchor="middle">'+items[i].label+'</text>'; }
  return s+'</svg>';
}

E("u6-business-expenses", 6, ["1.5"], 1, "var", varset([
  function(){ return mcq("A small cafe pays the same amount of rent every month, no matter how many customers it serves. How is rent classed as a business expense?",
    {t:"A fixed expense, because it stays the same month to month", fb:"Yes: fixed expenses do not change with the level of business."},
    [{t:"A variable expense, because it is paid every month", fb:"Paying monthly does not make an expense variable; the amount staying the same makes it fixed."},
     {t:"A variable expense, because rent is a large amount", fb:"Size does not decide the class; whether the amount changes with business activity does."},
     {t:"Revenue, because the cafe earns money in the space", fb:"Rent is money the business pays out, so it is an expense, not revenue."}],
    "Rent that stays the same regardless of sales is a <b>fixed expense</b>.", {}); },
  function(){ return mcq("A bakery buys flour, eggs and packaging. In a busy month it buys much more of them than in a quiet month. How are these ingredient and packaging costs classed?",
    {t:"Variable expenses, because they rise and fall with how much the bakery sells", fb:"Yes: costs that grow with production and sales are variable expenses."},
    [{t:"Fixed expenses, because the bakery always needs them, month after month, all year", fb:"Needing a cost does not make it fixed; its amount changes with sales, so it is variable."},
     {t:"Fixed expenses, because the prices never change at any time of year", fb:"Even at steady prices, buying more in busy months makes the total change, so the expense is variable."},
     {t:"Profit, because they are used to make goods that sell in the bakery", fb:"Ingredients are costs of making the goods, so they are expenses, not profit."}],
    "Costs that rise and fall with the amount produced and sold are <b>variable expenses</b>.", {}); },
  function(){ return mcq("Which list contains only expenses of operating a small business?",
    {t:"Rent, wages, insurance and supplies", fb:"Yes: all four are costs of running the business."},
    [{t:"Rent, wages, sales revenue and supplies", fb:"Sales revenue is money coming in, not an expense of operating."},
     {t:"Insurance, wages, profit and rent", fb:"Profit is what is left after expenses, not an expense itself."},
     {t:"Supplies, rent, customer payments and wages", fb:"Customer payments are revenue, money in, not an operating expense."}],
    "Operating expenses are the costs of running the business: rent, wages, insurance and supplies. The answer is <b>the list with no revenue or profit</b>.", {}); },
  function(){ return mcq("A lawn care business pays a set monthly insurance premium and buys fuel for its mowers based on how many lawns it cuts. Which statement is correct?",
    {t:"Insurance is a fixed expense and fuel is a variable expense.", fb:"Yes: the premium is set, while fuel use depends on the amount of work done."},
    [{t:"Insurance and fuel are both fixed expenses.", fb:"Fuel depends on how many lawns are cut, so fuel is variable."},
     {t:"Insurance is variable and fuel is fixed.", fb:"The two are reversed: the premium is set in advance and fuel changes with work."},
     {t:"Neither is an expense, because both keep the business running.", fb:"Both are costs the business pays, so both are expenses; they differ in type, not in being expenses."}],
    "A set premium is fixed; fuel that depends on the work done is variable. The answer is <b>insurance fixed, fuel variable</b>.", {}); },
  function(){ return mcq("Which expense would a small retail shop class as a fixed expense?",
    {t:"A yearly business licence fee", fb:"Yes: the licence fee is a set amount that does not depend on sales."},
    [{t:"Bags and wrapping for customer purchases", fb:"Bags and wrapping are used in proportion to sales, so they are variable."},
     {t:"Extra stock bought for a busy holiday season", fb:"Stock bought in amounts that follow sales is a variable expense."},
     {t:"Delivery fuel for customer orders", fb:"Delivery fuel grows with the number of orders, so it is variable."}],
    "A set yearly fee that does not follow sales is a fixed expense. The answer is <b>the business licence fee</b>.", {}); },
  function(){ return mcq("A food truck pays wages that grow in months when it hires extra staff for festivals. How are these wages best described in those months?",
    {t:"A variable expense, because the total changes with staffing and sales", fb:"Yes: when hours and staff change with business activity, the wage total is variable."},
    [{t:"A fixed expense, because wages are paid on a regular schedule all year", fb:"A regular pay schedule does not fix the total; extra staff and hours raise it."},
     {t:"Revenue, because staff help earn money for the business", fb:"Wages are paid out by the business, so they are an expense."},
     {t:"A one-time start-up cost paid when the business opens", fb:"Wages are an ongoing operating expense, not a start-up cost."}],
    "Wage totals that change with staffing and activity are a <b>variable expense</b>.", {}); }
]), ["Ask whether the amount stays the same or changes with the level of business.", "Start by checking one item: would its total grow in a busier month?"]);

E("u6-why-file", 6, ["1.13"], 1, "var", varset([
  function(){ return mcq("During the year, tax was taken off Ana's paycheques. Her final tax calculation shows she paid in more than she owes. Why does filing a return matter for her?",
    {t:"Filing is how she claims back the extra tax as a refund.", fb:"Yes: a refund is paid only after a return is filed and assessed."},
    [{t:"Filing raises the tax rate on her income for the year.", fb:"Filing does not change tax rates; it settles what she owes against what she already paid."},
     {t:"Filing lets her employer stop taking tax off her pay.", fb:"Employers keep deducting tax as required; filing settles the year afterwards."},
     {t:"Filing is only for people who owe more tax at year end.", fb:"People who are owed refunds file too; filing is how the refund is claimed."}],
    "Tax taken off pay during the year is compared with the final amount owed on the return. Filing claims the difference back as a refund. The answer is <b>to claim the refund</b>.", {}); },
  function(){ return mcq("A family receives the Canada child benefit and the GST/HST credit. Why are they expected to file a tax return every year, even in a year with little income?",
    {t:"Benefits and credits like these are worked out from the return, so filing keeps them going.", fb:"Yes: eligibility and amounts for these benefits are based on the filed return."},
    [{t:"Benefits are paid only to people with full-time jobs, never to anyone working part time at all.", fb:"These benefits are based on family income and information on the return, not on having a full-time job."},
     {t:"Filing guarantees their benefits will increase every year they file a return.", fb:"Filing keeps benefits flowing and correctly sized; it does not promise an increase."},
     {t:"The return replaces the benefit applications forever, so no other forms are ever needed.", fb:"Benefits are recalculated from each year's return, so yearly filing is still expected."}],
    "Benefit and credit amounts are calculated from the annual return. Filing each year keeps them going. The answer is <b>because benefits are based on the return</b>.", {}); },
  function(){ return mcq("Which statement best explains why most Canadians file an income tax return each year?",
    {t:"It is the yearly settlement: income and credits are reported, and any refund or balance owing is worked out.", fb:"Yes: the return reports the year's income, deductions and credits, and settles the final amount."},
    [{t:"It is a form that sets next year's pay rate, telling the employer what to pay in the year ahead, month by month.", fb:"The return does not set pay rates; employers set pay."},
     {t:"It is only needed in the year a person starts a job, and never has to be filed again after that.", fb:"Returns are filed every year, not only in the first year of work."},
     {t:"It is a way to apply for a driver's licence, since the tax office issues licences when returns come in each year.", fb:"Tax returns and licences are unrelated; the return deals with income tax."}],
    "The annual return reports income, deductions and credits, and settles whether the taxpayer gets a refund or owes a balance. The answer is <b>the yearly settlement statement</b>.", {}); },
  function(){ return mcq("A newcomer to Canada asks why she should file a return for a year when she worked only part of the year. Which reason is correct?",
    {t:"She may be owed a refund of tax taken off her pay, and filing starts her benefit eligibility.", fb:"Yes: part-year earnings often mean too much tax was withheld, and filing also supports benefit claims."},
    [{t:"She should not file, because only full-year workers file returns in Canada.", fb:"Part-year workers file too, and often have refunds waiting."},
     {t:"Filing will remove the tax her employer already sent in during the year from her pay, wiping it out.", fb:"Tax already sent in is credited to her on the return; it is not removed."},
     {t:"She files so her employer can set her hours for the coming year's work schedule.", fb:"Work hours are set by the employer and have nothing to do with filing a return."}],
    "Filing can recover tax withheld from part-year pay and establishes benefit eligibility. The answer is <b>the refund and benefits reason</b>.", {}); },
  function(){ return mcq("What can happen if a person who is owed a refund simply never files a return?",
    {t:"The refund is not paid, because refunds are issued only after a return is filed and assessed.", fb:"Yes: there is no automatic refund without a filed return."},
    [{t:"The refund is paid automatically with interest added, whether or not a return is filed.", fb:"Refunds are not automatic; a return must be filed to claim one."},
     {t:"The employer returns the tax in the next paycheque, handing it back directly to the worker herself.", fb:"Employers do not settle the year; the tax return does."},
     {t:"The amount is added to next year's wages, appearing in the first pay of the new year.", fb:"Unclaimed refunds do not become wages; filing is the claim route."}],
    "A refund exists only on paper until a return is filed and assessed. The answer is <b>the refund is not paid</b>.", {}); }
]), ["Think about what the return settles: tax already paid, benefits, and the final amount owed.", "Start by asking what the person gets, or keeps, only by filing."]);

E("u6-tax-forms-docs", 6, ["1.14","1.13"], 1, "var", varset([
  function(){ return mcq("An employer gives each worker a slip showing the year's pay and the tax, CPP and EI amounts taken off. What is this slip called?",
    {t:"A T4 slip", fb:"Yes: the T4 reports employment income and the amounts deducted from it."},
    [{t:"A T1 form", fb:"The T1 is the tax return form itself, not the slip an employer issues."},
     {t:"A notice of assessment", fb:"The notice of assessment comes from the tax agency after a return is filed, not from the employer."},
     {t:"A pay stub from December", fb:"A pay stub covers one pay period; the yearly summary slip is the T4."}],
    "The yearly slip from an employer showing income and deductions is the <b>T4 slip</b>.", {}); },
  function(){ return mcq("What is the T1 in Canadian income tax filing?",
    {t:"The main personal income tax return form that is completed and filed each year", fb:"Yes: the T1 is the general return where income, deductions, credits and the final amount are worked out."},
    [{t:"A slip from a bank showing interest earned", fb:"Bank interest is reported on other slips; the T1 is the return itself."},
     {t:"A receipt for charitable donations", fb:"Donation receipts support a credit claimed on the return; they are not the return form."},
     {t:"A form an employer uses to hire a worker", fb:"Hiring forms are separate; the T1 is the personal tax return."}],
    "The T1 is the main personal income tax and benefit return. The answer is <b>the main return form</b>.", {}); },
  function(){ return mcq("Which statement correctly separates tax deductions from tax credits?",
    {t:"A deduction lowers taxable income; a credit lowers the tax payable itself.", fb:"Yes: deductions act before tax is calculated, credits act on the tax after it is calculated."},
    [{t:"A deduction lowers tax payable; a credit lowers taxable income.", fb:"The two are reversed: deductions reduce income first, credits reduce the tax itself."},
     {t:"Both lower taxable income by the same amount.", fb:"Credits do not lower taxable income; they lower the tax payable."},
     {t:"Both are paid out as refunds before tax is calculated.", fb:"Neither works that way: deductions come off income and credits come off tax payable."}],
    "Deductions reduce taxable income. Credits reduce tax payable. The answer is <b>the deduction-first, credit-on-tax statement</b>.", {}); },
  function(){ return mcq("Jordan puts money into an RRSP, and the amount is subtracted from income before tax is worked out. What is this an example of?",
    {t:"A tax deduction", fb:"Yes: the RRSP amount is deducted from income, lowering taxable income."},
    [{t:"A tax credit", fb:"A credit would come off the tax payable after calculation; this amount comes off income first."},
     {t:"A T4 slip", fb:"A T4 is a document from an employer, not the name for subtracting an amount from income."},
     {t:"A refund", fb:"A refund may result at the end, but the RRSP amount itself is a deduction."}],
    "An amount subtracted from income before tax is calculated is a <b>tax deduction</b>.", {}); },
  function(){ return mcq("A student claims the tuition amount on a return. The value of the claim is taken off the tax payable at the end of the calculation. What is this an example of?",
    {t:"A non-refundable tax credit", fb:"Yes: the tuition amount supports a credit that reduces tax payable, and it cannot create a refund on its own."},
    [{t:"A tax deduction", fb:"A deduction would come off income before tax is calculated; this value comes off the tax itself."},
     {t:"A T4 slip", fb:"The T4 reports employment income; tuition amounts are reported on education receipts."},
     {t:"An instalment payment", fb:"Instalments are payments of tax during the year, not a claim that reduces tax payable."}],
    "A claim that reduces tax payable at the end of the calculation is a <b>non-refundable tax credit</b>.", {}); },
  function(){ return mcq("Which document would a filer use to report income from a part-time job at a grocery store?",
    {t:"The T4 slip issued by the store", fb:"Yes: employment income and source deductions are reported on the T4 from the employer."},
    [{t:"A property tax bill", fb:"A property tax bill is a municipal charge on a home, not a report of job income."},
     {t:"A charitable donation receipt", fb:"A donation receipt supports a credit claim; it does not report employment income."},
     {t:"A vehicle registration", fb:"Registration documents a vehicle; it has nothing to do with reporting job income."}],
    "Employment income is reported from the employer's <b>T4 slip</b>.", {}); }
]), ["Match each name to its job: a slip reports amounts, the T1 is the return, a deduction lowers income, a credit lowers tax.", "Start by sorting the choices into documents and calculation steps."]);

E("u6-feasible-business", 6, ["1.6"], 2, "var", varset([
  function(){ return mcq("A small fishing community fills with visitors each summer who rent cottages, but it has no place that rents bikes, kayaks or paddleboards. Which new business is the most feasible fit for this community?",
    {t:"An outdoor gear rental shop open through the tourist season", fb:"Yes: it serves the visitors who are already there, in the season when they come."},
    [{t:"A large snowmobile dealership with a full repair garage", fb:"The community's known demand is summer visitors; a large winter dealership is a poor match and a big risk."},
     {t:"A formal wear shop selling wedding dresses year round", fb:"A small community with seasonal visitors is unlikely to support a year-round formal wear shop."},
     {t:"A second fish plant competing with the existing one", fb:"Competing head-on with an established plant ignores the unmet need the scenario describes."}],
    "Feasibility means matching a real, unmet need in the community. Summer visitors with no gear rental nearby point to <b>the outdoor gear rental shop</b>.", {}); },
  function(){ return mcq("A growing suburb has many young families, long wait lists at the two existing childcare centres, and no licensed after-school program. Which business option is most feasible?",
    {t:"A licensed childcare and after-school centre", fb:"Yes: the wait lists show proven demand from the families already living there."},
    [{t:"A retirement home supply store", fb:"The described population is young families; the proven demand is childcare."},
     {t:"A hunting outfitter serving fly-in guests", fb:"Nothing in the description suggests hunting tourism; the demand shown is local and child-focused."},
     {t:"A nightclub open until 3 a.m.", fb:"A family suburb with childcare wait lists points to family services, not late-night entertainment."}],
    "Wait lists prove demand. A licensed childcare and after-school centre matches it. The answer is <b>the childcare centre</b>.", {}); },
  function(){ return mcq("A town's arena hosts hockey and skating all winter. Players travel 40 minutes to the next town to get skates sharpened and equipment repaired. Which add-on business is most feasible in the arena?",
    {t:"A skate sharpening and equipment repair kiosk", fb:"Yes: it serves a steady stream of users who already come to the building and currently travel for the service."},
    [{t:"A beachwear boutique", fb:"The arena's traffic is winter sport users; beachwear does not match them or the season."},
     {t:"A boat motor showroom", fb:"A showroom is a large, costly business with no link to the arena users described."},
     {t:"A formal photo studio", fb:"Studio demand is not shown in the scenario; the sharpening trips are shown directly."}],
    "The users are already in the building and already travel for this exact service. The answer is <b>the skate sharpening kiosk</b>.", {}); },
  function(){ return mcq("A rural community has long, snowy winters, many seniors, and driveways that must be cleared for medical and home care visits. Two large companies already sell groceries in the town. Which business is most feasible?",
    {t:"A snow clearing service with seasonal contracts for households", fb:"Yes: the climate, the population, and the access need all support steady seasonal demand."},
    [{t:"A third large grocery store", fb:"Two large grocery companies already serve the town; a third faces strong competition with no shown gap."},
     {t:"An outdoor swimming pool business", fb:"Long, snowy winters make a pool business a poor seasonal fit."},
     {t:"A surfboard rental shop", fb:"There is no sign of surfing demand in an inland, snowy community."}],
    "Climate and population create the demand here: reliable snow clearing for households that need access. The answer is <b>the snow clearing service</b>.", {}); },
  function(){ return mcq("A town sits beside a ski hill. Lodges are full all winter, and visitors often ask where they can get hot lunches quickly near the lifts. The town already has three sit-down restaurants with evening lineups. Which option is most feasible?",
    {t:"A lunch food truck near the lifts serving quick hot meals", fb:"Yes: it targets the exact gap named, quick hot lunches near the lifts at peak time."},
    [{t:"A fourth sit-down restaurant aimed at evening diners", fb:"Evenings are already served by three restaurants; the unmet need is quick lunch near the lifts."},
     {t:"A gardening supply store open in January", fb:"January skiers are not the market for gardening supplies; the season and the crowd point to food."},
     {t:"A beach umbrella rental stand", fb:"A winter ski town has no beach demand; the feasible gap is lunch for skiers."}],
    "Feasibility follows the named gap: quick hot lunches where the visitors already are. The answer is <b>the lunch food truck</b>.", {}); },
  function(){ return mcq("Which question is the most useful first test of whether a business idea is feasible in a community?",
    {t:"Is there a group of local customers with an unmet need this business would serve?", fb:"Yes: customers with an unmet need are the foundation of a feasible business."},
    [{t:"Can the owner pick a catchy name for the business?", fb:"A name matters later; without customers, no name can make the business work."},
     {t:"Does the owner personally enjoy the product?", fb:"Enjoyment helps motivation but does not prove that customers exist."},
     {t:"Is there a similar business in a much larger city?", fb:"Success in a big city does not show that this community has the customers for it."}],
    "A feasible business starts with local customers and an unmet need. The answer is <b>the unmet-need question</b>.", {}); }
]), ["Look for the unmet need and the customers who are already there.", "Start by naming the group in the scenario whose need is not being met."]);

E("u6-improve-profit", 6, ["1.7"], 2, "var", varset([
  function(){ return mcq("A cafe is busy at breakfast but nearly empty after 2 p.m. Its kitchen staff are already on shift until 4 p.m. Which option is most likely to improve profitability?",
    {t:"Add an afternoon take-out special using the staff and kitchen hours already paid for", fb:"Yes: it adds sales in dead hours without adding much cost, since staff are already there."},
    [{t:"Close at noon to save on electricity, giving up the afternoon trade entirely", fb:"Closing earlier cuts the busy lunch trade and saves very little; it gives up revenue."},
     {t:"Raise all prices by half, on every item the business sells, starting now", fb:"A very large price jump usually drives customers away and can lower total profit."},
     {t:"Hire two more servers for the afternoon, paying wages for hours that are not busy at all", fb:"Adding staff to an empty period adds cost without adding customers."}],
    "Using already-paid hours to add sales in a quiet period raises revenue with little extra cost. The answer is <b>the afternoon take-out special</b>.", {}); },
  function(){ return mcq("A bakery throws out many unsold loaves at closing each day. Which option is most likely to improve profitability?",
    {t:"Track daily sales and bake closer to the amount that usually sells, with a small end-of-day discount", fb:"Yes: less waste lowers cost, and a discount recovers some value from loaves that would be thrown out."},
    [{t:"Bake twice as many loaves so the shelves always look full, with plenty left over unsold at closing time", fb:"More baking means more waste, which is the very cost hurting profit."},
     {t:"Stop selling bread and sell only cakes, giving up the bakery's main product line entirely, for good", fb:"Giving up a main product line removes revenue instead of fixing the waste problem."},
     {t:"Give unsold loaves away free all day to anyone who walks into the bakery, every single day", fb:"Giving away sellable product all day removes revenue; a targeted closing discount is different."}],
    "Matching production to demand cuts waste, a direct cost. The answer is <b>bake to demand with a closing discount</b>.", {}); },
  function(){ return mcq("A craft shop sells well in its store but has no online presence. Many past customers live in other towns. Which option is most likely to improve profitability?",
    {t:"Sell the most popular items online to reach past customers in other towns", fb:"Yes: it opens a new group of buyers for products that already sell, using existing stock knowledge."},
    [{t:"Rent a second, larger store in the same town, across the street from the first", fb:"A bigger rent bill in the same market adds fixed cost without clear new customers."},
     {t:"Cut prices on every item by a third, on everything in the store", fb:"Cutting all prices shrinks the margin on items that already sell at full price."},
     {t:"Stop restocking the best-selling items, letting the shelves empty", fb:"Removing the products customers want most reduces revenue directly."}],
    "Reaching proven customers in other towns grows revenue from products that already sell. The answer is <b>sell popular items online</b>.", {}); },
  function(){ return mcq("A small gym has most members training between 5 p.m. and 8 p.m. Its mornings sit nearly empty, and local seniors have asked about daytime classes. Which option is most likely to improve profitability?",
    {t:"Run daytime classes for seniors in the empty morning hours", fb:"Yes: it fills unused capacity with a group that has already expressed interest."},
    [{t:"Close the gym in the mornings to save wages on morning staff", fb:"Closing removes the chance to use the space; the seniors' interest shows revenue is available there."},
     {t:"Double the evening drop-in price for every visitor", fb:"A steep price rise at peak time can push members to rival gyms and reduce profit."},
     {t:"Buy more evening equipment for the crowded hours", fb:"More equipment adds cost but does not add members if space and time slots are the limit."}],
    "Filling empty hours with an interested group adds revenue on the same fixed costs. The answer is <b>daytime seniors classes</b>.", {}); },
  function(){ return mcq("A landscaping business buys plants from a supplier whose prices have risen three times this year. A nearby grower offers the same quality at lower prices. Which option is most likely to improve profitability?",
    {t:"Compare total costs and switch supply to the lower-cost grower if quality holds", fb:"Yes: lowering a major variable cost raises the profit on every job, as long as quality is maintained."},
    [{t:"Raise prices sharply to cover any future increases in supply costs", fb:"Sharp increases can cost the business its customers; the direct fix is the supply cost itself."},
     {t:"Buy a full year of plants at the higher price now, before checking around for better prices", fb:"Locking in more stock at the higher price increases cost and storage risk."},
     {t:"Stop offering plants and only mow lawns for customers", fb:"Dropping a service line removes revenue instead of fixing the cost problem."}],
    "Profit improves when a major cost drops while quality and prices hold. The answer is <b>switch to the lower-cost grower</b>.", {}); },
  function(){ return mcq("Which change would improve profitability by raising revenue without raising costs very much?",
    {t:"A take-out window added to an existing restaurant kitchen", fb:"Yes: it sells more meals from the kitchen and staff the restaurant already has."},
    [{t:"A second location across town with its own rent and staff", fb:"A second location adds major fixed costs, so profit is not a sure result."},
     {t:"New uniforms for all staff in the restaurant", fb:"Uniforms add cost and do not by themselves bring in more sales."},
     {t:"A larger parking lot repaving job outside", fb:"Repaving is a cost; it does not directly add meals sold."}],
    "Profitability improves when revenue grows faster than costs. A take-out window does that for an existing kitchen. The answer is <b>the take-out window</b>.", {}); }
]), ["Look for the option that raises revenue or lowers cost without creating a bigger problem.", "Start by asking what each option does to the two sides of profit: revenue and expenses."]);

E("u6-profit-cr", 6, ["1.8"], 2, "gen", function(){
  var biz=pick(["candle shop","bike repair shop","jam and preserves stand","dog treat bakery","plant shop"]);
  var units=ri(300,900), price=pick([12,15,18,20,25]);
  var rent=ri(70,120)*10, wages=ri(90,160)*10, supplies=ri(30,70)*10;
  var revenue=units*price, expenses=rent+wages+supplies, profit=revenue-expenses;
  return numq("A "+biz+" sells "+units+" items in a month at "+u6M(price)+" each. Its expenses for the month are rent "+u6M(rent)+", wages "+u6M(wages)+", and supplies "+u6M(supplies)+". What is the profit, in dollars, for the month? Give the number only.",
    profit, 0.5,
    "Profit is revenue minus expenses. \\[ \\begin{aligned} \\text{revenue} &= "+units+" \\times "+fmt(price)+" = "+fmt(revenue)+" \\\\ \\text{expenses} &= "+fmt(rent)+" + "+fmt(wages)+" + "+fmt(supplies)+" = "+fmt(expenses)+" \\\\ \\text{profit} &= "+fmt(revenue)+" - "+fmt(expenses)+" = "+fmt(profit)+" \\end{aligned} \\] The profit is <b>"+u6M(profit)+"</b>.",
    {units:units,price:price,expenses:expenses});
}, ["Profit is what remains when total expenses are subtracted from total revenue.", "Start by multiplying the number of items by the price to get revenue."]);

E("u6-breakeven-cr", 6, ["1.8"], 2, "gen", function(){
  var biz=pick(["smoothie stand","candle maker","T-shirt printer","soap maker","coffee cart"]);
  var c=pick([4,5,6,8,10,12,15,20]), units=ri(120,600), fixed=c*units;
  var v=pick([6,9,11,14,18,23]), price=v+c;
  return numq("A "+biz+" has fixed costs of "+u6M(fixed)+" per month. Each item sells for "+u6M(price)+" and costs "+u6M(v)+" in materials and other variable costs. How many items must the business sell in a month to break even? Give the number only.",
    units, 0.5,
    "Break-even happens when the contribution from sales exactly covers the fixed costs. Each item contributes the price minus its variable cost. \\[ \\begin{aligned} \\text{contribution per item} &= "+fmt(price)+" - "+fmt(v)+" = "+fmt(c)+" \\\\ \\text{break-even units} &= "+fmt(fixed)+" \\div "+fmt(c)+" = "+fmt(units)+" \\end{aligned} \\] The business breaks even at <b>"+fmt(units)+" items</b>.",
    {fixed:fixed,price:price,v:v,c:c});
}, ["Each sale contributes the price minus its variable cost toward covering fixed costs.", "Start by subtracting the variable cost from the price to find the contribution per item."]);

E("u6-tax-return-cr", 6, ["1.15"], 2, "gen", function(){
  var name=pick(["Kelly","Robin","Jamie","Alex","Taylor","Casey"]);
  var income=ri(320,520)*100, rrsp=ri(10,40)*100, other=pick([300,500,800]);
  var taxable=income-rrsp-other;
  var tax=Math.round(taxable*0.15), credits=pick([1800,2000,2200,2400]);
  var net=tax-credits, refund=pick([200,400,600,900,1200,1500]), withheld=net+refund;
  return numq(name+" files a simple return. Total income is "+u6M(income)+". Deductions are "+u6M(rrsp)+" for RRSP contributions and "+u6M(other)+" in other deductions. For this simplified return, tax is 15 percent of taxable income. Non-refundable credits then reduce the tax by "+u6M(credits)+". During the year, "+u6M(withheld)+" in tax was withheld from pay. What is the refund, in dollars? Give the number only.",
    refund, 0.5,
    "Move through the return in order: income, deductions, taxable income, tax, credits, then compare with tax already withheld. \\[ \\begin{aligned} \\text{taxable income} &= "+fmt(income)+" - "+fmt(rrsp)+" - "+fmt(other)+" = "+fmt(taxable)+" \\\\ \\text{tax} &= 0.15 \\times "+fmt(taxable)+" = "+fmt(tax)+" \\\\ \\text{net tax} &= "+fmt(tax)+" - "+fmt(credits)+" = "+fmt(net)+" \\\\ \\text{refund} &= "+fmt(withheld)+" - "+fmt(net)+" = "+fmt(refund)+" \\end{aligned} \\] The refund is <b>"+u6M(refund)+"</b>.",
    {income:income,taxable:taxable,net:net,withheld:withheld});
}, ["Follow the return in order: deductions come off income, credits come off the tax, withheld tax is compared last.", "Start by subtracting the deductions from total income to get taxable income."]);

E("u6-expense-total", 6, ["1.5"], 2, "gen", function(){
  var biz=pick(["cafe","food truck","craft shop","lawn care business","bakery","bike shop"]);
  var rent=ri(80,200)*10, wages=ri(150,400)*10, util=ri(15,45)*10, ins=pick([90,120,150,180,210,240]), supplies=ri(30,90)*10;
  var total=rent+wages+util+ins+supplies;
  var opts=[
    {t:u6M(total-wages), fb:"That total leaves out wages of "+u6M(wages)+", the biggest expense on the list."},
    {t:u6M(total-supplies), fb:"That total leaves out supplies of "+u6M(supplies)+"."},
    {t:u6M(total+util), fb:"That total counts utilities of "+u6M(util)+" twice."}];
  var q=mcq("The monthly expenses of a "+biz+" are: rent "+u6M(rent)+", wages "+u6M(wages)+", utilities "+u6M(util)+", insurance "+u6M(ins)+", and supplies "+u6M(supplies)+". What are the total monthly expenses?",
    {t:u6M(total), fb:"Yes: all five expenses added once each give this total."}, opts,
    "Add every expense once. \\[ \\begin{aligned} \\text{total} &= "+fmt(rent)+" + "+fmt(wages)+" + "+fmt(util)+" + "+fmt(ins)+" + "+fmt(supplies)+" \\\\ &= "+fmt(total)+" \\end{aligned} \\] The total monthly expenses are <b>"+u6M(total)+"</b>.",
    {biz:biz,total:total});
  q.figure=u6Bar([{label:"Rent",v:rent},{label:"Wages",v:wages},{label:"Utilities",v:util},{label:"Insurance",v:ins},{label:"Supplies",v:supplies}]);
  return q;
}, ["The total is every listed expense added once, with nothing skipped or doubled.", "Start by adding the two largest expenses, then the rest."]);

E("u6-profit-factors", 6, ["1.9","1.7"], 2, "var", varset([
  function(){ return mcq("An ice cream stand at a beach makes most of its money in July and August and very little in January. Which factor affecting profitability is this?",
    {t:"Seasonal variation, because demand follows the time of year", fb:"Yes: sales rising and falling with the seasons is seasonal variation."},
    [{t:"Hours of operation, because the stand is open in summer", fb:"Being open in summer is part of the pattern, but the demand itself following the season is the factor named here."},
     {t:"Supplier pricing, because ingredients cost more in summer", fb:"Nothing in the scenario mentions ingredient prices changing."},
     {t:"Staff wages, because summer staff are students hired for the season", fb:"The scenario describes sales changing with the season, not a wage effect."}],
    "Demand that rises and falls with the time of year is seasonal variation. The answer is <b>seasonal variation</b>.", {}); },
  function(){ return mcq("A diner closes at 6 p.m., but the supper crowd in town eats between 6 p.m. and 8 p.m., and a nearby diner stays open and is full. Which factor is hurting this diner's profitability, and what is the direct response?",
    {t:"Hours of operation; staying open through the supper hours would capture sales it now misses.", fb:"Yes: the missed sales window is set by the closing time, and extending hours addresses it directly."},
    [{t:"Seasonal variation; the diner should close for the winter, since winter is its slow season each year.", fb:"The problem is a daily time window, not a season, and closing more would cut sales further."},
     {t:"Location; the diner should move to another town with more customers passing through each day.", fb:"The crowd is already in this town at supper time; the hours, not the location, miss them."},
     {t:"Pricing; the diner should double its supper prices to make up for the missed hours.", fb:"The diner closes before supper, so supper prices are not the issue; the missed hours are."}],
    "Closing before the busy supper window loses sales every day. The factor is hours of operation. The answer is <b>extend the hours</b>.", {}); },
  function(){ return mcq("A snow clearing business earns strong income from November to March and almost nothing in the summer. Which response best protects its yearly profitability?",
    {t:"Add a summer service, such as lawn care, that uses the same truck and workers in the off season", fb:"Yes: a counter-seasonal service fills the income gap with assets and staff the business already has."},
    [{t:"Raise winter prices to cover the whole year, whatever customers think of them", fb:"Very high winter prices can drive contract customers to competitors; filling the summer gap is steadier."},
     {t:"Close the business every summer and lay off all staff until the winter season returns", fb:"Closing saves some cost but gives up the chance to earn in summer and loses trained staff."},
     {t:"Buy a second plow truck for the winter rush, since one truck cannot cover every driveway in town", fb:"More winter equipment adds cost without addressing the summer income gap."}],
    "A business with a strong season and an empty season can add a service for the off season. The answer is <b>add a summer service</b>.", {}); },
  function(){ return mcq("A tour boat business finds that rainy weeks cut its ticket sales sharply, while sunny weeks sell out. Which statement about this factor is correct?",
    {t:"Weather is a factor outside the owner's control that makes weekly profit vary, so the business should plan savings in good weeks.", fb:"Yes: uncontrollable variation calls for planning around it, such as keeping a cushion from strong weeks."},
    [{t:"Weather proves the business is badly run. A well-run business would make the same profit in any weather at all, every week of the season.", fb:"Weather affects all tour operators in the area; it is an outside factor, not proof of poor management."},
     {t:"The owner should guarantee sunny weather in advertisements, promising visitors a perfect day on the hill every time.", fb:"Weather cannot be guaranteed, and advertising it would mislead customers."},
     {t:"Ticket prices should change every hour with the forecast, rising and falling as the weather shifts through the day.", fb:"Constant price changes are impractical; planning savings across good and bad weeks is the sound response."}],
    "Outside factors such as weather make profit vary from week to week. Planning a cushion from good weeks is the sound response. The answer is <b>plan savings in good weeks</b>.", {}); },
  function(){ return mcq("A bakery opens at 9 a.m., but commuters pass its door between 6:30 a.m. and 8 a.m. heading to a bus stop, and a rival bakery opens at 6:30 a.m. Which change targets the factor costing this bakery sales?",
    {t:"Open earlier on weekdays to serve the commuter traffic", fb:"Yes: the lost sales are tied to opening hours, and the customers are already passing by."},
    [{t:"Move the bakery to a quieter street across town", fb:"The current street has the customer traffic; moving away from it gives up the opportunity."},
     {t:"Stop selling coffee and sell only bread, cakes and pies", fb:"Commuters are a natural coffee market, so cutting coffee works against the opportunity."},
     {t:"Open only on weekends, closing on weekdays", fb:"The commuter traffic is on weekdays, so weekend-only hours miss it entirely."}],
    "The bakery's opening time misses a daily stream of customers. The answer is <b>open earlier on weekdays</b>.", {}); },
  function(){ return mcq("A ski rental shop earns most of its profit in four winter months. Which plan best fits this seasonal pattern?",
    {t:"Hire seasonal staff for the winter peak and keep year-round costs low for the quiet months", fb:"Yes: matching staffing to the season keeps peak service strong without carrying peak costs all year."},
    [{t:"Hire the full winter staff for the whole year, keeping everyone on through the quiet months", fb:"Carrying peak staffing through quiet months adds heavy cost with little revenue."},
     {t:"Keep the shop closed during the winter school break, the busiest part of the season", fb:"The school break is part of the peak season, so closing then gives up the best sales."},
     {t:"Set the same sales target for every month of the year, whether the month is busy or quiet", fb:"Seasonal businesses cannot expect equal months; planning should follow the season."}],
    "Seasonal staffing matches costs to the busy period. The answer is <b>seasonal staff and low off-season costs</b>.", {}); }
]), ["Name the factor first (season, hours, weather), then judge the response against it.", "Start by asking what pattern in the scenario makes profit rise or fall."]);

E("u6-credit-deduction", 6, ["1.14"], 2, "gen", function(){
  var names=["Sam","Ruth","Omar","Beth","Carl","Nina"];
  var n=pick(names), mode=ri(0,1);
  if(mode===0){
    var rate=pick([15,20,25]), D=ri(4,30)*100, save=D*rate/100;
    var opts=[
      {t:u6M(D), fb:"That is the full deduction amount. A deduction lowers taxable income, so the tax saving is the rate times the amount."},
      {t:u6M(D/2), fb:"That uses a 50 percent rate. The stated tax rate is "+rate+" percent."},
      {t:u6M(D*10/100), fb:"That uses a 10 percent rate. The stated tax rate is "+rate+" percent."}];
    return mcq(n+" claims a deduction of "+u6M(D)+". In this simplified problem, income tax is "+rate+" percent of taxable income. By how much does the deduction reduce the tax payable?",
      {t:u6M(save), fb:"Yes: the deduction removes "+u6M(D)+" from taxable income, and tax on that income would have been "+rate+" percent of it."}, opts,
      "A deduction lowers taxable income, so the saving is the tax that would have been charged on that slice of income. \\[ \\begin{aligned} \\text{tax saved} &= "+fmt(D)+" \\times 0."+rate+" = "+fmt(save)+" \\end{aligned} \\] The deduction reduces tax payable by <b>"+u6M(save)+"</b>.",
      {mode:"deduction",D:D,rate:rate});
  }
  var crate=pick([15,20]), B=ri(10,50)*100, cred=B*crate/100;
  var opts2=[
    {t:u6M(B), fb:"That is the full claim amount. The credit is worth "+crate+" percent of the amount, taken off tax payable."},
    {t:u6M(B*25/100), fb:"That uses a 25 percent rate. The stated credit rate is "+crate+" percent."},
    {t:u6M(cred/2), fb:"That is only half of the credit value. The credit rate applies to the full claim amount."}];
  if(crate===25) opts2[1]={t:u6M(B*10/100), fb:"That uses a 10 percent rate. The stated credit rate is "+crate+" percent."};
  return mcq(n+" claims a tuition amount of "+u6M(B)+". In this simplified problem, the non-refundable credit for tuition is "+crate+" percent of the amount claimed, taken off the tax payable. By how much does the credit reduce the tax payable?",
    {t:u6M(cred), fb:"Yes: a credit comes straight off tax payable, at "+crate+" percent of the amount claimed."}, opts2,
    "A credit reduces tax payable directly. Its value is the credit rate times the amount claimed. \\[ \\begin{aligned} \\text{credit value} &= "+fmt(B)+" \\times 0."+crate+" = "+fmt(cred)+" \\end{aligned} \\] The credit reduces tax payable by <b>"+u6M(cred)+"</b>.",
    {mode:"credit",B:B,rate:crate});
}, ["Keep the two mechanisms separate: a deduction lowers taxable income, a credit lowers tax payable.", "Start by deciding whether the amount is multiplied by a tax rate or a credit rate."]);

E("u6-tax-return-exam-cr", 6, ["1.15"], 3, "gen", function(){
  var name=pick(["Morgan","Devon","Priya","Logan","Farrah","Glen"]);
  var emp=ri(480,720)*100, other=pick([1200,2500,4000]), rrsp=ri(20,60)*100, union=pick([600,900]);
  var taxable=emp+other-rrsp-union;
  var tax=6000+Math.round((taxable-40000)*0.20);
  var amounts=15000+pick([2000,3500,5000])+pick([0,400,800]);
  var credits=Math.round(amounts*0.15);
  var net=tax-credits, owing=pick([150,300,450,600,900]), withheld=net-owing;
  return numq(name+" files a return. Employment income is "+u6M(emp)+" and other income is "+u6M(other)+". Deductions are RRSP contributions of "+u6M(rrsp)+" and union dues of "+u6M(union)+". For this simplified return, tax is 15 percent of the first $40,000 of taxable income and 20 percent of the part above $40,000. Non-refundable credits are 15 percent of total credit amounts of "+u6M(amounts)+". Tax withheld from pay during the year was "+u6M(withheld)+". What is the balance owing, in dollars? Give the number only.",
    owing, 0.5,
    "Work through the return in order. \\[ \\begin{aligned} \\text{taxable income} &= "+fmt(emp)+" + "+fmt(other)+" - "+fmt(rrsp)+" - "+fmt(union)+" = "+fmt(taxable)+" \\\\ \\text{tax} &= 0.15 \\times 40000 + 0.20 \\times "+fmt(taxable-40000)+" = "+fmt(tax)+" \\\\ \\text{credits} &= 0.15 \\times "+fmt(amounts)+" = "+fmt(credits)+" \\\\ \\text{net tax} &= "+fmt(tax)+" - "+fmt(credits)+" = "+fmt(net)+" \\\\ \\text{balance owing} &= "+fmt(net)+" - "+fmt(withheld)+" = "+fmt(owing)+" \\end{aligned} \\] The balance owing is <b>"+u6M(owing)+"</b>.",
    {taxable:taxable,tax:tax,credits:credits,net:net,withheld:withheld});
}, ["Follow the return in order and split taxable income at the $40,000 mark for the two rates.", "Start by adding the income sources and subtracting the deductions."]);

E("u6-target-profit-cr", 6, ["1.8"], 3, "gen", function(){
  var biz=pick(["honey producer","wooden toy maker","frozen meal business","candle studio","juice company"]);
  var c=pick([5,6,8,10,12,15,20]), beUnits=ri(150,500), fixed=c*beUnits;
  var extra=ri(40,240), target=c*extra, v=pick([7,10,13,16,21]), price=v+c;
  var units=beUnits+extra;
  return numq("A "+biz+" has fixed costs of "+u6M(fixed)+" per month. Each item sells for "+u6M(price)+" and has variable costs of "+u6M(v)+". How many items must the business sell in a month to make a profit of exactly "+u6M(target)+"? Give the number only.",
    units, 0.5,
    "The contribution from sales must cover the fixed costs and then the target profit on top. \\[ \\begin{aligned} \\text{contribution per item} &= "+fmt(price)+" - "+fmt(v)+" = "+fmt(c)+" \\\\ \\text{amount to cover} &= "+fmt(fixed)+" + "+fmt(target)+" = "+fmt(fixed+target)+" \\\\ \\text{items needed} &= "+fmt(fixed+target)+" \\div "+fmt(c)+" = "+fmt(units)+" \\end{aligned} \\] The business must sell <b>"+fmt(units)+" items</b>.",
    {fixed:fixed,target:target,c:c,price:price,v:v});
}, ["Profit targets sit on top of fixed costs: the contribution must cover both.", "Start by finding the contribution per item, then add fixed costs and target profit together."]);

E("u6-seasonal-analysis", 6, ["1.9","1.7"], 3, "gen", function(){
  var ctxs=[
    {biz:"ice cream stand", peak:"summer", off:"the rest of the year"},
    {biz:"snow clearing business", peak:"winter", off:"the rest of the year"},
    {biz:"tour boat operation", peak:"summer", off:"the rest of the year"},
    {biz:"garden centre", peak:"spring", off:"the rest of the year"},
    {biz:"ski rental shop", peak:"winter", off:"the rest of the year"}];
  var ctx=pick(ctxs), m1=pick([3,4,5]), m2=12-m1;
  var p1=ri(80,300)*10, loss=ri(20,90)*10, guard=0;
  var annual, d1, d2, d3;
  do { annual=m1*p1-m2*loss; d1=m1*p1; d2=p1*12-m2*loss; d3=(p1-loss)*12; p1+= (guard>0? 70:0); guard++; }
  while((annual<=0 || d1===annual || d2===annual || d3===annual || d1===d2 || d1===d3 || d2===d3) && guard<40);
  annual=m1*p1-m2*loss; d1=m1*p1; d2=p1*12-m2*loss; d3=(p1-loss)*12;
  var opts=[
    {t:"The yearly profit is "+u6M(d1)+", because the off season can be ignored.", fb:"That counts only the peak months. The off season losses of "+u6M(loss)+" a month still count."},
    {t:"The yearly profit is "+u6M(d2)+", because the peak profit applies to all 12 months.", fb:"That gives peak profit to the off season months too, but those months lose money instead."},
    {t:"The yearly profit is "+u6M(d3)+", by subtracting one month of loss from one month of peak profit and multiplying by 12.", fb:"That treats every month as the same. Peak and off season months come in different counts: "+m1+" and "+m2+"."}];
  var q=mcq("A "+ctx.biz+" makes a profit of "+u6M(p1)+" in each of its "+m1+" peak "+ctx.peak+" months, and loses "+u6M(loss)+" in each of the other "+m2+" months of the year. Which statement about its yearly result is correct?",
    {t:"The yearly profit is "+u6M(annual)+", because the peak months carry the off season losses.", fb:"Yes: peak profit over "+m1+" months, minus off season losses over "+m2+" months, gives this yearly figure."}, opts,
    "Total each part of the year separately. \\[ \\begin{aligned} \\text{peak months} &= "+m1+" \\times "+fmt(p1)+" = "+fmt(m1*p1)+" \\\\ \\text{off season} &= "+m2+" \\times (-"+fmt(loss)+") = -"+fmt(m2*loss)+" \\\\ \\text{year} &= "+fmt(m1*p1)+" - "+fmt(m2*loss)+" = "+fmt(annual)+" \\end{aligned} \\] The answer is <b>the "+u6M(annual)+" statement</b>.",
    {m1:m1,p1:p1,loss:loss,annual:annual});
  q.figure=u6Bar([{label:"Peak month",v:p1},{label:"Off month loss",v:loss}]);
  return q;
}, ["Total the peak months and the off season months separately, then combine them.", "Start by multiplying the peak monthly profit by the number of peak months."]);

/* ----- bank-u7.js ----- */
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

/* ----- bank-u8.js ----- */
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

/* ----- bank-u9.js ----- */
// Math 3202 Unit 9 Trigonometry question bank
// CRMARKS: u9-sine-side-cr=3
// CRMARKS: u9-cosine-angle-cr=4
// CRMARKS: u9-mixed-choose-cr=5
// CRMARKS: u9-two-step-cr=4
// CRMARKS: u9-survey-application-cr=5
/* ===== Unit 9 ===== */
/* Math 3202 Unit 9: Trigonometry, sine law and cosine law (5.1 to 5.4), plus a
   primary ratio bridging set (ids u9r-, prior learning review, see notes9.md).
   Helpers prefixed u9. Standard notation: side a is BC opposite A, side b is CA
   opposite B, side c is AB opposite C. Angles to nearest degree, sides to 1 decimal. */
function u9rad(d){return d*Math.PI/180;}
function u9deg(r){return r*180/Math.PI;}
function u9sin(d){return Math.sin(u9rad(d));}
function u9cos(d){return Math.cos(u9rad(d));}
function u9r1(x){return Math.round(x*10)/10;}
function u9fig(a,b,c,sideLabs,angLabs,labels){return triSVG(a,b,c,{side:sideLabs,ang:angLabs,L:labels||["A","B","C"]});}
function u9mkD(cv,cands){
  var out=[], seen={}; seen[fmtF(cv,1)]=1;
  for(var i=0;i<cands.length && out.length<3;i++){
    var v=cands[i][0]; if(!isFinite(v) || v<=0) continue;
    var t=fmtF(v,1); if(seen[t]) continue; seen[t]=1; out.push({t:t, fb:cands[i][1]});
  }
  var offs=[3.7,-2.9,5.4,-4.6,7.2];
  for(var k=0; out.length<3 && k<offs.length; k++){
    var vv=cv+offs[k]; if(vv<=0) continue; var tt=fmtF(vv,1); if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That value comes from an arithmetic slip after the setup. Keep the setup and redo the final calculation."});
  }
  return out;
}
function u9mkDeg(cv,cands){
  var out=[], seen={}; seen[String(Math.round(cv))]=1;
  for(var i=0;i<cands.length && out.length<3;i++){
    var v=cands[i][0]; if(!isFinite(v) || v<=2 || v>=178) continue;
    var t=String(Math.round(v)); if(seen[t]) continue; seen[t]=1; out.push({t:t, fb:cands[i][1]});
  }
  var offs=[11,-9,17,-14,23];
  for(var k=0; out.length<3 && k<offs.length; k++){
    var vv=Math.round(cv)+offs[k]; if(vv<=2 || vv>=178) continue; var tt=String(vv); if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That angle comes from an arithmetic slip after the setup. Keep the setup and redo the inverse step."});
  }
  return out;
}
function u9sssAngles(a,b,c){
  function ang(op,s1,s2){var v=(s1*s1+s2*s2-op*op)/(2*s1*s2); v=Math.max(-1,Math.min(1,v)); return u9deg(Math.acos(v));}
  return [ang(a,b,c), ang(b,a,c), ang(c,a,b)];
}
/* Diagram coverage addition (November 2026): the ambiguous case setup for
   u9-mixed-wide. Angle A at the left, side b along the ray to the far
   vertex C, the dashed height h from C to the base line, and a dashed arc
   of radius a centred at C showing where side a can land on the base line.
   The arc is drawn from the draw's own A, b and a, so it crosses the base
   line twice, once or not at all exactly as the draw's numbers dictate. */
function u9AmbFig(A,b,a,h){
  var Ar=u9rad(A);
  var C=[b*Math.cos(Ar), b*Math.sin(Ar)], F=[C[0],0];
  var xR=Math.max(C[0]+a, b, C[0]+2);
  var arc=[], t;
  for(t=180; t<=360; t+=9){ var tr=u9rad(t); arc.push([C[0]+a*Math.cos(tr), C[1]+a*Math.sin(tr)]); }
  var fitPts=[[0,0], C, F, [xR,0], [C[0]-a,C[1]], [C[0]+a,C[1]], [C[0],C[1]-a]];
  var T=_fit(fitPts,330,215,44);
  var PA=T([0,0]), PC=T(C), PF=T(F), PR=T([xR,0]);
  function ln(p,q,dash,w){ return '<line x1="'+fmt(p[0],1)+'" y1="'+fmt(p[1],1)+'" x2="'+fmt(q[0],1)+'" y2="'+fmt(q[1],1)+'" stroke="'+FIG_INK+'" stroke-width="'+(w||2)+'"'+(dash?' stroke-dasharray="5 4"':"")+'/>'; }
  var out=ln(PA,PR,false,2)+ln(PA,PC,false,2)+ln(PC,PF,true,1.4);
  var d="M"+arc.map(function(p){ var q=T(p); return fmt(q[0],1)+" "+fmt(q[1],1); }).join(" L");
  out+='<path d="'+d+'" fill="none" stroke="'+FIG_INK+'" stroke-width="1.6" stroke-dasharray="5 4"/>';
  var dirC=_vnorm(_vsub(PC,PA)), bis=_vnorm([dirC[0]+1, dirC[1]]);
  out+=_txt(PA[0]+bis[0]*27, PA[1]+bis[1]*27, A+"°", 12, false);
  out+=_txt(PA[0]-14, PA[1]+4, "A", 14, true);
  out+=_txt(PC[0]-2, PC[1]-16, "C", 14, true);
  var M=[(PA[0]+PC[0])/2,(PA[1]+PC[1])/2], off=_sideOff(PA,PC,PF,16);
  out+=_txt(M[0]+off[0], M[1]+off[1], String(b), 12, false);
  out+=_txt((PC[0]+PF[0])/2+13, (PC[1]+PF[1])/2, fmtF(h,1), 12, false, "start");
  var PB=T([C[0], C[1]-a]);
  out+=_txt(PB[0], PB[1]+13, fmtF(a,1), 12, false);
  return '<svg viewBox="0 0 330 215" width="330" height="215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ambiguous case diagram: side a swinging from the far vertex toward the base line">'+out+'</svg>';
}

/* ================= The 14 spreadsheet-governed law entries ================= */

E("u9-sine-side", 9, ["5.1"], 1, "gen", function(){
  var A,B,a,guard=0;
  do { A=ri(32,58); B=ri(35,65); a=ri(9,28); guard++; } while(guard<60 && (A+B>145 || Math.abs(A-B)<7));
  if(A+B>145){A=40; B=55; a=18;}
  var C=180-A-B;
  var b=a*u9sin(B)/u9sin(A), c=a*u9sin(C)/u9sin(A);
  var cv=u9r1(b);
  var dists=u9mkD(cv,[
    [a*u9sin(A)/u9sin(B), "That setup swaps the two angles. Side b pairs with angle B, and the known side a pairs with angle A."],
    [a*u9sin(C)/u9sin(A), "That uses angle C in the top. Side b pairs with angle B, not angle C."],
    [a*u9sin(B)/u9sin(C), "That divides by the sine of angle C. The known pair in the ratio is side a with angle A."]
  ]);
  var q=mcq("In triangle ABC, angle A is \\("+A+"^\\circ\\), angle B is \\("+B+"^\\circ\\) and side \\(a\\) is "+a+" m, as shown. What is the length of side \\(b\\), to one decimal place?",
    {t:fmtF(cv,1), fb:"Yes: side b comes from the sine law pair b with B and a with A."}, dists,
    "Set up the sine law first, pairing each side with its opposite angle. \\[ \\begin{aligned} \\frac{b}{\\sin "+B+"^\\circ} &= \\frac{"+a+"}{\\sin "+A+"^\\circ} \\\\ b &= \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\\\ &= "+fmtF(cv,1)+" \\end{aligned} \\] The length of side b is <b>"+fmtF(cv,1)+" m</b>.",
    {mode:"sine-side", A:A, B:B, a:a});
  q.figure=u9fig(a,b,c,[String(a),"?", ""],[""+A+"°",""+B+"°",""]);
  return q;
}, ["Pair each side with the angle opposite it, then look for a complete known pair.", "Start by writing the sine law with side b over the sine of angle B."]);

E("u9-cosine-side", 9, ["5.2"], 1, "gen", function(){
  var b=ri(7,22), c=ri(7,22), A=ri(42,118);
  var a=Math.sqrt(b*b+c*c-2*b*c*u9cos(A));
  var cv=u9r1(a);
  var dists=u9mkD(cv,[
    [Math.sqrt(b*b+c*c), "That is the Pythagorean result for a right angle. Angle A is "+A+" degrees, so the cosine law term is needed."],
    [Math.sqrt(b*b+c*c+2*b*c*u9cos(A)), "That adds the last term. The cosine law subtracts 2bc cos A."],
    [b+c-a, "That combines the two given sides by adding and subtracting. The cosine law uses squares and the contained angle."]
  ]);
  var q=mcq("In triangle ABC, sides \\(b\\) and \\(c\\) are "+b+" m and "+c+" m, and the angle between them, angle A, is \\("+A+"^\\circ\\), as shown. What is the length of side \\(a\\), to one decimal place?",
    {t:fmtF(cv,1), fb:"Yes: two sides and the contained angle call for the cosine law."}, dists,
    "Two sides and the angle between them call for the cosine law. \\[ \\begin{aligned} a^2 &= "+b+"^2 + "+c+"^2 - 2("+b+")("+c+") \\cos "+A+"^\\circ \\\\ &= "+fmtF(a*a,1)+" \\\\ a &= "+fmtF(cv,1)+" \\end{aligned} \\] The length of side a is <b>"+fmtF(cv,1)+" m</b>.",
    {mode:"cosine-side", b:b, c:c, A:A});
  q.figure=u9fig(a,b,c,["?",String(b),String(c)],[""+A+"°","",""]);
  return q;
}, ["Check whether the known angle sits between the two known sides.", "Start with the cosine law for the side opposite the known angle."]);

E("u9-choose-law", 9, ["5.3"], 1, "gen", function(){
  var mode=ri(0,3);
  var opts=[
    "Sine law, using a side with its opposite angle",
    "Cosine law, using two sides and the angle between them",
    "Cosine law, using all three sides",
    "Sine law, using two sides and an angle opposite one of them"
  ];
  var why=[
    "The givens include a complete side and opposite angle pair, which is what the sine law needs.",
    "The givens are two sides with the angle between them, which is the cosine law side pattern.",
    "The givens are all three sides, which is the cosine law angle pattern.",
    "The givens are two sides with an angle opposite one of them, which is what the sine law needs."
  ];
  var A,B,C,a,b,c, givenText, correctIdx;
  if(mode===0){
    A=ri(35,55); B=ri(40,60); if(A+B>140){A=42; B=54;}
    C=180-A-B; a=ri(10,24); b=a*u9sin(B)/u9sin(A); c=a*u9sin(C)/u9sin(A);
    givenText="angles A and B and side a, which sits opposite angle A"; correctIdx=0;
    var fig=u9fig(a,b,c,[String(a),"",""],[""+A+"°",""+B+"°",""]);
  } else if(mode===1){
    b=ri(8,20); c=ri(8,20); A=ri(45,115); a=Math.sqrt(b*b+c*c-2*b*c*u9cos(A));
    var angs=u9sssAngles(a,b,c); B=Math.round(angs[1]); C=Math.round(angs[2]);
    givenText="sides b and c and angle A, which sits between them"; correctIdx=1;
    var fig=u9fig(a,b,c,["",String(b),String(c)],[""+A+"°","",""]);
  } else if(mode===2){
    A=ri(50,95); B=ri(35,65); if(A+B>150){A=70; B=50;}
    C=180-A-B; c=16; a=c*u9sin(A)/u9sin(C); b=c*u9sin(B)/u9sin(C);
    a=u9r1(a); b=u9r1(b);
    givenText="all three side lengths"; correctIdx=2;
    var fig=u9fig(a,b,c,[fmtF(a,1),fmtF(b,1),String(c)],["","",""]);
  } else {
    A=ri(30,50); a=ri(16,26); b=ri(10,a-4);
    var sB=b*u9sin(A)/a; B=Math.round(u9deg(Math.asin(Math.min(1,sB)))); C=180-A-B; c=a*u9sin(C)/u9sin(A);
    givenText="sides a and b and angle A, which sits opposite side a"; correctIdx=3;
    var fig=u9fig(a,b,c,[String(a),String(b),""],[""+A+"°","",""]);
  }
  var dists=[];
  for(var i=0;i<4;i++){ if(i!==correctIdx) dists.push({t:opts[i], fb:"That method needs a different pattern of givens than the diagram shows. Match the method to the marked information first."}); }
  var q=mcq("A triangle is shown with these givens: "+givenText+". Which starting method fits the given information?",
    {t:opts[correctIdx], fb:"Yes: "+why[correctIdx]}, dists,
    "Look at the pattern of the givens before choosing a law. "+why[correctIdx]+" The answer is <b>"+opts[correctIdx]+"</b>.",
    {mode:"choose-law", pattern:correctIdx});
  q.figure=fig;
  return q;
}, ["Sort the givens first: what is known, sides, angles, or a mix?", "Look for a side paired with its opposite angle, or two sides with the angle between them."]);

E("u9-sine-angle", 9, ["5.1"], 2, "gen", function(){
  var A,a,b,guard=0,Bv;
  do { A=ri(28,52); a=ri(15,27); b=ri(8,a-4); Bv=u9deg(Math.asin(b*u9sin(A)/a)); guard++; }
  while(guard<60 && (Bv<15 || Bv>70 || Math.abs(Bv-A)<5));
  var cv=Math.round(Bv);
  var altArg=a*u9sin(A)/b;
  var dists=u9mkDeg(cv,[
    [180-Bv, "That is the supplement of the angle. Side b is shorter than side a here, so angle B is the acute value."],
    [u9deg(Math.asin(Math.min(0.999,b*u9cos(A)/a))), "That setup uses the cosine of angle A. The sine law uses the sine of the given angle."],
    [altArg<=1 ? u9deg(Math.asin(altArg)) : Bv+16, "That setup flips the known pair upside down. Keep side a with angle A on one side of the proportion."]
  ]);
  var angs=u9sssAngles(a,b, a*u9sin(180-A-cv)/u9sin(A));
  var c=a*u9sin(180-A-Bv)/u9sin(A);
  var q=mcq("In triangle ABC, angle A is \\("+A+"^\\circ\\), side \\(a\\) is "+a+" m and side \\(b\\) is "+b+" m, as shown. What is the measure of angle B, to the nearest degree?",
    {t:String(cv), fb:"Yes: the sine law with the known pair a and A gives angle B."}, dists,
    "Use the sine law with the complete known pair, side a with angle A. \\[ \\begin{aligned} \\frac{\\sin B}{"+b+"} &= \\frac{\\sin "+A+"^\\circ}{"+a+"} \\\\ \\sin B &= \\frac{"+b+" \\sin "+A+"^\\circ}{"+a+"} \\\\ B &= "+cv+"^\\circ \\end{aligned} \\] The measure of angle B is <b>"+cv+" degrees</b>.",
    {mode:"sine-angle", A:A, a:a, b:b});
  q.figure=u9fig(a,b,c,[String(a),String(b),""],[""+A+"°","?",""]);
  return q;
}, ["Find the complete known pair first: a side together with its opposite angle.", "Start with the sine law written so the unknown angle is on one side."]);

E("u9-cosine-angle", 9, ["5.2"], 2, "gen", function(){
  var A,B,C,c=15,a=13,b=11,angs=[55,60,65],guard=0;
  do {
    A=ri(48,105); B=ri(32,68); guard++;
    if(A+B>152) continue;
    C=180-A-B; c=ri(12,18);
    a=u9r1(c*u9sin(A)/u9sin(C)); b=u9r1(c*u9sin(B)/u9sin(C));
    angs=u9sssAngles(a,b,c);
  } while(guard<80 && (Math.abs(angs[0]-angs[1])<5 || Math.abs(angs[0]-angs[2])<5 || angs[0]<35 || angs[0]>120));
  var cv=Math.round(angs[0]);
  var dists=u9mkDeg(cv,[
    [angs[1], "That is angle B, at the vertex between sides a and c. The question asks for the angle opposite side a."],
    [angs[2], "That is angle C, at the vertex between sides a and b. The question asks for the angle opposite side a."],
    [180-angs[0], "That is the supplement of angle A. An angle inside this triangle is below 180 degrees and matches the side lengths shown."]
  ]);
  var q=mcq("Triangle ABC has sides \\(a = "+fmtF(a,1)+"\\) m, \\(b = "+fmtF(b,1)+"\\) m and \\(c = "+c+"\\) m, as shown. What is the measure of angle A, to the nearest degree?",
    {t:String(cv), fb:"Yes: with all three sides known, the cosine law in angle form gives angle A."}, dists,
    "All three sides are known, so use the cosine law in angle form for the angle opposite side a. \\[ \\begin{aligned} \\cos A &= \\frac{"+fmtF(b,1)+"^2 + "+c+"^2 - "+fmtF(a,1)+"^2}{2("+fmtF(b,1)+")("+c+")} \\\\ A &= "+cv+"^\\circ \\end{aligned} \\] The measure of angle A is <b>"+cv+" degrees</b>.",
    {mode:"cosine-angle", a:a, b:b, c:c});
  q.figure=u9fig(a,b,c,[fmtF(a,1),fmtF(b,1),String(c)],["?","",""]);
  return q;
}, ["Three known sides point to the cosine law in angle form.", "Start by writing cos A with side a as the side being subtracted."]);

E("u9-sine-context", 9, ["5.1","5.3"], 2, "gen", function(){
  var sets=[["P","Q","R","A survey crew marks three corners of a building lot"],
            ["D","E","F","A roof crew checks three points on a gable roof"],
            ["X","Y","Z","A trail crew marks three points along a new path"]];
  var s=pick(sets), L=[s[0],s[1],s[2]];
  var A,B,a,guard=0;
  do { A=ri(34,56); B=ri(38,64); a=ri(11,30); guard++; } while(guard<60 && (A+B>146 || Math.abs(A-B)<7));
  if(A+B>146){A=44; B=56; a=20;}
  var C=180-A-B, b=a*u9sin(B)/u9sin(A), c=a*u9sin(C)/u9sin(A);
  var cv=u9r1(b);
  var dists=u9mkD(cv,[
    [a*u9sin(A)/u9sin(B), "That setup swaps the two angles. The side opposite "+L[1]+" pairs with the angle at "+L[1]+"."],
    [a*u9sin(C)/u9sin(A), "That uses the third angle in the top. The side being found sits opposite the angle at "+L[1]+"."],
    [a*u9sin(B)/u9sin(C), "That divides by the sine of the third angle. The known pair is the given side with its opposite angle."]
  ]);
  var q=mcq(s[3]+". The angle at "+L[0]+" is \\("+A+"^\\circ\\), the angle at "+L[1]+" is \\("+B+"^\\circ\\), and the side opposite the angle at "+L[0]+" is "+a+" m, as shown. How long is the side opposite the angle at "+L[1]+", to one decimal place?",
    {t:fmtF(cv,1), fb:"Yes: the known side and its opposite angle anchor the sine law."}, dists,
    "The known side sits opposite the angle at "+L[0]+", so that pair anchors the sine law. \\[ \\begin{aligned} \\frac{x}{\\sin "+B+"^\\circ} &= \\frac{"+a+"}{\\sin "+A+"^\\circ} \\\\ x &= \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\\\ &= "+fmtF(cv,1)+" \\end{aligned} \\] The side is <b>"+fmtF(cv,1)+" m</b> long.",
    {mode:"sine-context", A:A, B:B, a:a, set:s[0]});
  q.figure=u9fig(a,b,c,[String(a),"?",""],[""+A+"°",""+B+"°",""],L);
  return q;
}, ["Find the side that is paired with its opposite angle in the givens.", "Write the sine law with the unknown side over the sine of its opposite angle."]);

E("u9-cosine-context", 9, ["5.2","5.3"], 2, "gen", function(){
  var sets=[["M","N","P","Two docks, N and P, sit out from a boathouse at M. A straight run between the docks is needed"],
            ["G","H","K","A guy wire anchor plan shows two ground points, H and K, out from the base of a pole at G. The direct distance between the anchors is needed"],
            ["S","T","U","Two fence posts, T and U, sit out from a corner post at S. A straight rail between the posts is needed"]];
  var s=pick(sets), L=[s[0],s[1],s[2]];
  var b=ri(9,26), c=ri(9,26), A=ri(48,122);
  var a=Math.sqrt(b*b+c*c-2*b*c*u9cos(A));
  var cv=u9r1(a);
  var dists=u9mkD(cv,[
    [Math.sqrt(b*b+c*c), "That treats the angle at "+L[0]+" as a right angle. The marked angle calls for the cosine law."],
    [Math.sqrt(b*b+c*c+2*b*c*u9cos(A)), "That adds the last term. The cosine law subtracts 2bc cos A."],
    [Math.abs(b-c)+a*0.35, "That estimate uses the difference of the two sides. The direct distance comes from the cosine law with the contained angle."]
  ]);
  var q=mcq(s[3]+". The distance from "+L[0]+" to "+L[1]+" is "+c+" m, the distance from "+L[0]+" to "+L[2]+" is "+b+" m, and the angle at "+L[0]+" between them is \\("+A+"^\\circ\\), as shown. What is the direct distance, to one decimal place?",
    {t:fmtF(cv,1), fb:"Yes: two sides with the angle between them call for the cosine law."}, dists,
    "The two known distances meet at "+L[0]+" with the angle between them, so use the cosine law. \\[ \\begin{aligned} x^2 &= "+b+"^2 + "+c+"^2 - 2("+b+")("+c+") \\cos "+A+"^\\circ \\\\ x &= "+fmtF(cv,1)+" \\end{aligned} \\] The direct distance is <b>"+fmtF(cv,1)+" m</b>.",
    {mode:"cosine-context", b:b, c:c, A:A, set:s[0]});
  q.figure=u9fig(a,b,c,["?",String(b),String(c)],[""+A+"°","",""],L);
  return q;
}, ["Check whether the known angle sits between the two known distances.", "Start with the cosine law for the side opposite the known angle."]);

E("u9-applications", 9, ["5.4"], 2, "var", varset([
  function(){ var q=mcq("A carpenter builds a roof truss that is not a right triangle. Two members meeting at the peak are 4.2 m and 5.0 m, with a 78 degree angle between them, and the span across the bottom is needed. Which statement best describes the method?",
    {t:"Use the cosine law: two sides and the angle between them give the span", fb:"Yes: that pattern of givens is exactly the cosine law side form."},
    [{t:"Use the sine law: any two sides give a working ratio right away at once", fb:"The sine law needs a side paired with its opposite angle. That pair is not given here."},
     {t:"Use the tangent ratio: the span is one leg of a right triangle here", fb:"The truss is stated to not be a right triangle, so a primary ratio does not apply directly."},
     {t:"Add the two members: the span equals their total length exactly", fb:"Adding the members ignores the angle at the peak, which sets how far apart their ends sit."}],
    "The two members and the angle between them match the cosine law pattern for finding the side opposite that angle. The answer is <b>Use the cosine law: two sides and the angle between them give the span</b>.", {mode:"app-truss"}); q.figure=(function(){var span=Math.sqrt(4.2*4.2+5.0*5.0-2*4.2*5.0*u9cos(78)); return u9fig(span,4.2,5.0,["?","4.2","5.0"],["78°","",""]);})(); return q; },
  function(){ var q=mcq("A surveyor needs the width of a pond. From one shore point she measures angles of 63 degrees and 48 degrees to a tree on the far shore, using a 30 m baseline on her shore. Which statement best describes the method?",
    {t:"Use the sine law: a known baseline with angles gives the distance across", fb:"Yes: the baseline and the angles form a side and angle pattern the sine law handles."},
    [{t:"Use the cosine law: three sides are needed before any work can start on it", fb:"No side across the pond is known. The baseline and angles are enough for the sine law."},
     {t:"Walk the baseline twice: the width equals twice the baseline length", fb:"The width depends on the measured angles, not just on the baseline length."},
     {t:"Use the sine law only if the pond edge forms a right triangle shape", fb:"The sine law works in any triangle, right or not, when a side and opposite angle pair is available."}],
    "A known side with measured angles at its ends gives a complete side and opposite angle pair after the third angle is found, so the sine law gives the distance across. The answer is <b>Use the sine law: a known baseline with angles gives the distance across</b>.", {mode:"app-pond"}); q.figure=(function(){var aSide=30*u9sin(63)/u9sin(69), bSide=30*u9sin(48)/u9sin(69); return u9fig(aSide,bSide,30,["","?","30"],["63°","48°",""]);})(); return q; },
  function(){ var q=mcq("In a machine shop, a triangular mounting plate has sides of 18 cm, 24 cm and 30 cm. A fitter needs the angle opposite the 30 cm side so a bracket can be set. Which statement best describes the method?",
    {t:"Use the cosine law in angle form: three sides give the angle", fb:"Yes: the angle form of the cosine law starts from the three side lengths."},
    [{t:"Use the sine law: the longest side gives the angle directly", fb:"The sine law needs a known angle to pair with a side. No angle is known yet."},
     {t:"Use the cosine law in angle form only for angles over 90 degrees", fb:"The angle form works for acute and obtuse angles alike."},
     {t:"Estimate the angle from a photo of the plate taken earlier", fb:"A photo estimate is not a calculation. The three sides determine the angle exactly."}],
    "With all three sides known and no angle known, the cosine law in angle form is the starting method. The answer is <b>Use the cosine law in angle form: three sides give the angle</b>.", {mode:"app-plate"}); q.figure=u9fig(30,24,18,["30","24","18"],["?","",""]); return q; },
  function(){ return mcq("A real estate agent describes a triangular lot to a buyer. Two boundary lines and the angle where they meet at the road are surveyed, and the back boundary length is still needed for a fence quote. Which statement best describes the method?",
    {t:"Use the cosine law: the two boundaries and their contained angle give the back line", fb:"Yes: that is the standard lot measurement use of the cosine law."},
    [{t:"Use the sine law: the back line pairs with the road angle automatically at once here", fb:"The sine law needs a known side paired with its opposite angle. The road angle sits between the two known boundaries."},
     {t:"Measure the back line as the average of the two boundaries on the lot", fb:"An average ignores the angle at the road, which controls the back line length."},
     {t:"Use the cosine law only when the lot is a right triangle, which it must be", fb:"The cosine law is built for triangles that are not right triangles."}],
    "Two boundaries with the angle between them give the third side by the cosine law, which is how the fence length is found. The answer is <b>Use the cosine law: the two boundaries and their contained angle give the back line</b>.", {mode:"app-lot"}); },
  function(){ return mcq("A stage designer hangs a triangular set piece. From a front corner, angles to the two top corners are measured, and the front edge length is known. The designer needs the distance from the front corner to one top corner. Which statement best describes the method?",
    {t:"Use the sine law: the known front edge and the angles give the slanted distance", fb:"Yes: a known side with the triangle angles is a sine law setup."},
    [{t:"Use the cosine law: two slanted distances must be known first of all", fb:"The slanted distances are the unknowns here. The known edge and angles start the sine law."},
     {t:"Use the tangent ratio on the front edge, treating the set as a right triangle shape", fb:"The set piece triangle is not stated to be a right triangle, so a primary ratio does not start the work."},
     {t:"Scale the distance off the design sketch by eye, judging it from the drawing", fb:"An eye estimate is not the design calculation. The measured angles and edge determine the distance."}],
    "A known side together with the angles of the triangle gives a side and opposite angle pair, so the sine law finds the slanted distance. The answer is <b>Use the sine law: the known front edge and the angles give the slanted distance</b>.", {mode:"app-stage"}); },
  function(){ return mcq("A crane operator plans a lift where the load hangs from a jib, forming a triangle with the mast. The three cable and jib lengths are known, and the operator needs the angle at the mast to check clearance. Which statement best describes the method?",
    {t:"Use the cosine law in angle form: the three lengths give the angle at the mast", fb:"Yes: three known lengths and one unknown angle is the cosine law angle form."},
    [{t:"Use the sine law: the longest cable pairs with the mast angle right away in this case", fb:"The sine law needs one known angle to build a ratio. No angle is known at the start."},
     {t:"Use the cosine law in angle form only after measuring one angle first", fb:"The point of the angle form is that no angle measurement is needed; the sides carry the information."},
     {t:"Treat the mast angle as half the largest cable length on the mast", fb:"An angle does not come from halving a length. The three lengths go into the cosine law."}],
    "Three known lengths with an unknown angle call for the cosine law in angle form, a routine clearance check in lifting work. The answer is <b>Use the cosine law in angle form: the three lengths give the angle at the mast</b>.", {mode:"app-crane"}); }
]), ["Read the scenario for the pattern of givens: sides, angles, or both.", "Match that pattern to a law before judging any statement."]);

E("u9-sine-side-cr", 9, ["5.1"], 2, "gen", function(){
  var A,B,a,guard=0;
  do { A=ri(36,57); B=ri(39,63); a=ri(12,32); guard++; } while(guard<60 && (A+B>144 || Math.abs(A-B)<6));
  if(A+B>144){A=46; B=58; a=22;}
  var C=180-A-B, b=a*u9sin(B)/u9sin(A), c=a*u9sin(C)/u9sin(A);
  var ans=u9r1(b);
  var q=numq("A ferry route forms triangle ABC with a headland. Angle A is \\("+A+"^\\circ\\), angle B is \\("+B+"^\\circ\\), and side \\(a\\), opposite angle A, is "+a+" km, as shown. Find the length of side \\(b\\), in kilometres, to one decimal place. Show your work.",
    ans, 0.2,
    "Pair each side with its opposite angle and use the sine law. \\[ \\begin{aligned} \\frac{b}{\\sin "+B+"^\\circ} &= \\frac{"+a+"}{\\sin "+A+"^\\circ} \\\\ b &= \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\\\ &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" km</b>.",
    {mode:"sine-side-cr", A:A, B:B, a:a});
  q.figure=u9fig(a,b,c,[String(a),"?",""],[""+A+"°",""+B+"°",""]);
  return q;
}, ["Pair each side with the angle opposite it, then look for a complete known pair.", "Start by writing the sine law with side b over the sine of angle B."]);

E("u9-cosine-angle-cr", 9, ["5.2"], 2, "gen", function(){
  var A,B,C,c=16,a=14,b=12,angs=[60,55,65],guard=0;
  do {
    A=ri(52,108); B=ri(30,64); guard++;
    if(A+B>150) continue;
    C=180-A-B; c=ri(13,19);
    a=u9r1(c*u9sin(A)/u9sin(C)); b=u9r1(c*u9sin(B)/u9sin(C));
    angs=u9sssAngles(a,b,c);
  } while(guard<80 && (angs[0]<40 || angs[0]>118));
  var ans=Math.round(angs[0]);
  var q=numq("A triangular brace has sides \\(a = "+fmtF(a,1)+"\\) m, \\(b = "+fmtF(b,1)+"\\) m and \\(c = "+c+"\\) m, as shown. Find the measure of angle A, in degrees, to the nearest degree. Show your work.",
    ans, 1,
    "All three sides are known, so use the cosine law in angle form. \\[ \\begin{aligned} \\cos A &= \\frac{"+fmtF(b,1)+"^2 + "+c+"^2 - "+fmtF(a,1)+"^2}{2("+fmtF(b,1)+")("+c+")} \\\\ A &= "+ans+"^\\circ \\end{aligned} \\] The answer is <b>"+ans+" degrees</b>.",
    {mode:"cosine-angle-cr", a:a, b:b, c:c});
  q.figure=u9fig(a,b,c,[fmtF(a,1),fmtF(b,1),String(c)],["?","",""]);
  return q;
}, ["Three known sides point to the cosine law in angle form.", "Start by writing cos A with side a as the side being subtracted."]);

E("u9-mixed-choose-cr", 9, ["5.3"], 2, "gen", function(){
  var d1=ri(14,34), d2=ri(14,34), A=ri(55,125);
  var dist=Math.sqrt(d1*d1+d2*d2-2*d1*d2*u9cos(A));
  var ans=u9r1(dist);
  var angs=u9sssAngles(dist,d2,d1);
  var q=numq("Two straight roads leave a town hall at an angle of \\("+A+"^\\circ\\) to each other. A school is "+d1+" km along one road and a clinic is "+d2+" km along the other road, as shown. Find the direct distance between the school and the clinic, in kilometres, to one decimal place. Choose the law that fits and show your work.",
    ans, 0.2,
    "The two road distances and the angle between them fit the cosine law, since the angle is contained between the known sides. \\[ \\begin{aligned} x^2 &= "+d1+"^2 + "+d2+"^2 - 2("+d1+")("+d2+") \\cos "+A+"^\\circ \\\\ x &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" km</b>.",
    {mode:"mixed-choose-cr", d1:d1, d2:d2, A:A});
  q.figure=u9fig(dist,d2,d1,["?",String(d2),String(d1)],[""+A+"°","",""],["T","S","C"]);
  return q;
}, ["Decide which law fits the pattern of givens before calculating.", "The known angle sits between the two known distances, so start with that law in side form."]);

E("u9-mixed-wide", 9, ["5.1","5.2","5.3"], 3, "gen", function(){
  var mode=ri(0,4);
  if(mode===0){
    var A=ri(30,60), B=ri(34,68), a=ri(8,30), guard=0;
    while((A+B>146 || Math.abs(A-B)<6) && guard++<50){ A=ri(30,60); B=ri(34,68); }
    if(A+B>146){A=45; B=57;}
    var C=180-A-B, b=a*u9sin(B)/u9sin(A), c=a*u9sin(C)/u9sin(A), cv=u9r1(b);
    var dists=u9mkD(cv,[[a*u9sin(A)/u9sin(B),"That swaps the two angles in the ratio."],[a*u9sin(C)/u9sin(A),"That uses the third angle for the side being found."],[a*u9sin(B)/u9sin(C),"That divides by the sine of the third angle instead of the known pair."]]);
    var q=mcq("In triangle ABC, angle A is \\("+A+"^\\circ\\), angle B is \\("+B+"^\\circ\\) and side \\(a\\) is "+a+" m. What is side \\(b\\), to one decimal place?",
      {t:fmtF(cv,1), fb:"Yes: the sine law with the known pair a and A."}, dists,
      "Use the sine law. \\[ \\begin{aligned} \\frac{b}{\\sin "+B+"^\\circ} &= \\frac{"+a+"}{\\sin "+A+"^\\circ} \\\\ b &= "+fmtF(cv,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(cv,1)+" m</b>.", {mode:"wide-sine-side", A:A, B:B, a:a});
    q.figure=u9fig(a,b,c,[String(a),"?",""],[""+A+"°",""+B+"°",""]);
    return q;
  }
  if(mode===1){
    var A2=ri(28,52), a2=ri(15,27), b2=ri(8,a2-4), Bv=u9deg(Math.asin(b2*u9sin(A2)/a2)), cv2=Math.round(Bv);
    var c2=a2*u9sin(180-A2-Bv)/u9sin(A2);
    var dists2=u9mkDeg(cv2,[[180-Bv,"That is the supplement; side b is shorter than side a, so angle B is acute here."],[u9deg(Math.asin(Math.min(0.999,b2*u9cos(A2)/a2))),"That uses the cosine of the given angle in the setup."]]);
    var q2=mcq("In triangle ABC, angle A is \\("+A2+"^\\circ\\), side \\(a\\) is "+a2+" m and side \\(b\\) is "+b2+" m. What is angle B, to the nearest degree?",
      {t:String(cv2), fb:"Yes: the sine law with the known pair a and A."}, dists2,
      "Use the sine law. \\[ \\begin{aligned} \\frac{\\sin B}{"+b2+"} &= \\frac{\\sin "+A2+"^\\circ}{"+a2+"} \\\\ B &= "+cv2+"^\\circ \\end{aligned} \\] The answer is <b>"+cv2+" degrees</b>.", {mode:"wide-sine-angle", A:A2, a:a2, b:b2});
    q2.figure=u9fig(a2,b2,c2,[String(a2),String(b2),""],[""+A2+"°","?",""]);
    return q2;
  }
  if(mode===2){
    var b3=ri(7,24), c3=ri(7,24), A3=ri(40,125);
    var a3=Math.sqrt(b3*b3+c3*c3-2*b3*c3*u9cos(A3)), cv3=u9r1(a3);
    var dists3=u9mkD(cv3,[[Math.sqrt(b3*b3+c3*c3),"That treats the contained angle as a right angle."],[Math.sqrt(b3*b3+c3*c3+2*b3*c3*u9cos(A3)),"That adds the last term of the cosine law instead of subtracting it."]]);
    var q3=mcq("In triangle ABC, sides \\(b\\) and \\(c\\) are "+b3+" m and "+c3+" m, with angle A, between them, equal to \\("+A3+"^\\circ\\). What is side \\(a\\), to one decimal place?",
      {t:fmtF(cv3,1), fb:"Yes: two sides and the contained angle call for the cosine law."}, dists3,
      "Use the cosine law. \\[ \\begin{aligned} a^2 &= "+b3+"^2 + "+c3+"^2 - 2("+b3+")("+c3+") \\cos "+A3+"^\\circ \\\\ a &= "+fmtF(cv3,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(cv3,1)+" m</b>.", {mode:"wide-cosine-side", b:b3, c:c3, A:A3});
    q3.figure=u9fig(a3,b3,c3,["?",String(b3),String(c3)],[""+A3+"°","",""]);
    return q3;
  }
  if(mode===3){
    var A4,B4,C4,c4=15,a4=13,b4=11,angs=[55,60,65],guard4=0;
    do { A4=ri(48,105); B4=ri(32,68); guard4++; if(A4+B4>152) continue;
      C4=180-A4-B4; c4=ri(12,18); a4=u9r1(c4*u9sin(A4)/u9sin(C4)); b4=u9r1(c4*u9sin(B4)/u9sin(C4)); angs=u9sssAngles(a4,b4,c4);
    } while(guard4<80 && (Math.abs(angs[0]-angs[1])<5 || Math.abs(angs[0]-angs[2])<5));
    var cv4=Math.round(angs[0]);
    var dists4=u9mkDeg(cv4,[[angs[1],"That is angle B, not the angle opposite side a."],[angs[2],"That is angle C, not the angle opposite side a."],[180-angs[0],"That is the supplement of angle A."]]);
    var q4=mcq("Triangle ABC has sides \\(a = "+fmtF(a4,1)+"\\) m, \\(b = "+fmtF(b4,1)+"\\) m and \\(c = "+c4+"\\) m. What is angle A, to the nearest degree?",
      {t:String(cv4), fb:"Yes: three sides call for the cosine law in angle form."}, dists4,
      "Use the cosine law in angle form. \\[ \\begin{aligned} \\cos A &= \\frac{"+fmtF(b4,1)+"^2 + "+c4+"^2 - "+fmtF(a4,1)+"^2}{2("+fmtF(b4,1)+")("+c4+")} \\\\ A &= "+cv4+"^\\circ \\end{aligned} \\] The answer is <b>"+cv4+" degrees</b>.", {mode:"wide-cosine-angle", a:a4, b:b4, c:c4});
    q4.figure=u9fig(a4,b4,c4,[fmtF(a4,1),fmtF(b4,1),String(c4)],["?","",""]);
    return q4;
  }
  var A5=ri(30,50), b5=ri(14,24), kase=ri(0,2), h=b5*u9sin(A5), a5;
  if(kase===0) a5=u9r1(h*ri(62,80)/100);
  else if(kase===2) a5=u9r1(b5*ri(112,135)/100);
  else a5=u9r1(h + (b5-h)*ri(30,60)/100);
  var hD=u9r1(b5*u9sin(A5));
  var counts=["0","1","2","3"], correctCount=(kase===0?"0":kase===2?"1":"2");
  var fbMap={"0":"Side a is shorter than the height from the far vertex, so it cannot reach the base line at all.",
             "1":"Side a is longer than side b, so the swinging side lands in only one position.",
             "2":"Side a is longer than the height but shorter than side b, so it lands in two positions.",
             "3":"Three different triangles cannot come from one fixed angle and two fixed sides like this."};
  var dists5=counts.filter(function(x){return x!==correctCount;}).map(function(x){return {t:x, fb:fbMap[x]};});
  var q5=mcq("A triangle is to be built with angle A equal to \\("+A5+"^\\circ\\), side \\(b\\) equal to "+b5+" m, and side \\(a\\), opposite angle A, equal to "+fmtF(a5,1)+" m. The height from the far vertex to the base line works out to "+fmtF(hD,1)+" m. How many different triangles fit these givens?",
    {t:correctCount, fb:fbMap[correctCount]}, dists5,
    "Compare side a with the height and with side b. The height is \\("+fmtF(hD,1)+"\\) m and side b is "+b5+" m, while side a is "+fmtF(a5,1)+" m. "+fbMap[correctCount]+" The answer is <b>"+correctCount+"</b>.",
    {mode:"wide-ambiguous", A:A5, b:b5, a:a5, kase:kase});
  q5.figure=u9AmbFig(A5, b5, a5, b5*u9sin(A5));
  return q5;
}, ["Sort the givens first, then pick the law that matches the pattern.", "Look for a known side and opposite angle pair, two sides with the contained angle, or all three sides."]);

E("u9-two-step-cr", 9, ["5.3","5.2","5.1"], 3, "gen", function(){
  var b,c,A,a,Bv,guard=0;
  do { b=ri(8,15); c=ri(14,24); A=ri(50,95); a=Math.sqrt(b*b+c*c-2*b*c*u9cos(A)); Bv=u9deg(Math.asin(Math.min(1,b*u9sin(A)/a))); guard++; }
  while(guard<80 && (b>=a || Bv<20 || Bv>75));
  var aR=u9r1(a), ans=Math.round(Bv);
  var q=numq("In triangle ABC, side \\(b\\) is "+b+" m, side \\(c\\) is "+c+" m, and angle A, between sides \\(b\\) and \\(c\\), is \\("+A+"^\\circ\\), as shown. First find side \\(a\\), then find the measure of angle B, in degrees, to the nearest degree. Give angle B as your answer and show both steps.",
    ans, 1,
    "Step 1 uses the cosine law, since two sides and the contained angle are known. Step 2 uses the sine law with the new known pair. \\[ \\begin{aligned} a^2 &= "+b+"^2 + "+c+"^2 - 2("+b+")("+c+") \\cos "+A+"^\\circ \\\\ a &= "+fmtF(aR,1)+" \\\\ \\frac{\\sin B}{"+b+"} &= \\frac{\\sin "+A+"^\\circ}{"+fmtF(aR,1)+"} \\\\ B &= "+ans+"^\\circ \\end{aligned} \\] Side b is shorter than side a, so angle B is the acute value. The answer is <b>"+ans+" degrees</b>.",
    {mode:"two-step-cr", b:b, c:c, A:A});
  q.figure=u9fig(a,b,c,["?",String(b),String(c)],[""+A+"°","?",""]);
  return q;
}, ["Plan the order first: one law creates the known pair the other law needs.", "Start with the side opposite the contained angle, using the two given sides."]);

E("u9-survey-application-cr", 9, ["5.4","5.3"], 3, "gen", function(){
  var A,B,base,guard=0;
  do { A=ri(48,72); B=ri(42,68); base=ri(30,60); guard++; } while(guard<60 && A+B>140);
  if(A+B>140){A=60; B=55; base=45;}
  var C=180-A-B;
  var dist=base*u9sin(B)/u9sin(C);
  var ans=u9r1(dist);
  var aSide=base*u9sin(A)/u9sin(C);
  var q=numq("Surveyors need the distance from point A on one shore of a pond to a marker at point C on the far shore. They measure a baseline from A to B of "+base+" m along their shore. The angle at A to the marker is \\("+A+"^\\circ\\) and the angle at B to the marker is \\("+B+"^\\circ\\), as shown. Find the distance from A to the marker, in metres, to one decimal place. Show your work.",
    ans, 0.3,
    "This is a standard surveying use of the sine law: a measured baseline and two measured angles give an unreachable distance. First the third angle is \\(180 - "+A+" - "+B+" = "+C+"^\\circ\\). \\[ \\begin{aligned} \\frac{x}{\\sin "+B+"^\\circ} &= \\frac{"+base+"}{\\sin "+C+"^\\circ} \\\\ x &= \\frac{"+base+" \\sin "+B+"^\\circ}{\\sin "+C+"^\\circ} \\\\ &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" m</b>.",
    {mode:"survey-application-cr", A:A, B:B, base:base});
  q.figure=u9fig(aSide,dist,base,[fmtF(u9r1(aSide),1),"?",String(base)],[""+A+"°",""+B+"°",""],["A","B","C"]);
  return q;
}, ["An unreachable distance with a measured baseline and angles is a sine law job.", "Start by finding the third angle from the two measured angles."]);

/* ============ Bridging set: primary ratio review (prior learning, ids u9r-) ============
   REVIEW entries per Jason's November 7, 2026 design addition. These refresh the
   Applied 1202 primary ratios before the law work above. They are coded to the
   closest Unit 9 code for the checker, but they are NOT 3202 indicator coverage.
   Ruled remap (Jason, November 8, 2026): u9r-find-side, u9r-find-side-workplace
   and u9r-find-angle serve Math 1202's indicator 5.5, solving right triangles
   with the primary ratios. That provenance is carried in the BRIDGE_SRC table
   after this set, which sets bridging:true and bridgeSrc on the named entries:
   the checker code stays in `indicators` because the coverage checker, the
   indicator filter and the on-screen tag all key on it, and coverage
   accounting for these entries reads bridgeSrc instead. A sixth entry,
   u9r-reasonable-result, judges whether a trig result is reasonable and
   carries MA1202.5.6 in the same table. */

E("u9r-ratio-value", 9, ["5.3"], 1, "gen", function(){
  var triples=[[3,4,5],[5,12,13],[8,15,17],[6,8,10],[9,12,15],[12,16,20],[9,40,41],[12,35,37],[7,24,25],[20,21,29],[15,36,39],[10,24,26],[16,30,34],[15,20,25]];
  var tr=pick(triples), swap=ri(0,1), sc=ri(1,3);
  var b=(swap? tr[1]:tr[0])*sc, c=(swap? tr[0]:tr[1])*sc, a=tr[2]*sc;
  function red(n,d){var g=1; for(var k=Math.min(n,d); k>1; k--){ if(n%k===0 && d%k===0){ g=k; break; } } return "\\( "+FR(n/g,d/g)+" \\)";}
  var asks=[
    {name:"\\sin B", n:b, d:a, label:"sin B is opposite over hypotenuse"},
    {name:"\\cos B", n:c, d:a, label:"cos B is adjacent over hypotenuse"},
    {name:"\\tan B", n:b, d:c, label:"tan B is opposite over adjacent"}
  ];
  var ask=pick(asks), others=asks.filter(function(r){return r!==ask;});
  var dists=[
    {t:red(others[0].n,others[0].d), fb:"That is a different ratio for angle B. "+others[0].label+", which is not the ratio asked for."},
    {t:red(others[1].n,others[1].d), fb:"That is a different ratio for angle B. "+others[1].label+", which is not the ratio asked for."},
    {t:red(ask.d,ask.n), fb:"That flips the ratio upside down. The first named side for the ratio goes on top."}
  ];
  var q=mcq("In the right triangle shown, the right angle is at A. For angle B, which value equals \\("+ask.name+"\\)?",
    {t:red(ask.n,ask.d), fb:"Yes: "+ask.label+", using sides "+ask.n+" and "+ask.d+" from the diagram."}, dists,
    "For angle B, the opposite side is "+b+", the adjacent side is "+c+" and the hypotenuse is "+a+". "+ask.label+": \\("+ask.name+" = "+FR(ask.n,ask.d)+"\\) after simplifying. The answer is <b>"+red(ask.n,ask.d)+"</b>.",
    {mode:"bridge-ratio", ask:ask.name});
  q.figure=u9fig(a,b,c,[String(a),String(b),String(c)],["90°","",""]);
  return q;
}, ["Name the opposite, adjacent and hypotenuse sides for angle B first.", "Write the asked ratio from its two sides, then simplify the fraction."]);

E("u9r-find-side", 9, ["5.3"], 1, "gen", function(){
  var th=ri(26,64), mode=ri(0,2), a,b,c,givenLab,findLab,ans,setup,distVals;
  if(mode===0){
    a=ri(12,30); b=a*u9sin(th); c=a*u9cos(th); ans=u9r1(b);
    setup="\\sin "+th+"^\\circ = \\frac{x}{"+a+"}";
    distVals=[[a*u9cos(th),"That uses the cosine ratio, which finds the side next to the angle. The side across from the angle uses sine with the hypotenuse."],
              [a*Math.tan(u9rad(th)),"That uses the tangent ratio, which needs the adjacent side. Here the hypotenuse is the known side."]];
    givenLab=[String(a),"?",""]; findLab="b";
  } else if(mode===1){
    a=ri(12,30); b=a*u9sin(th); c=a*u9cos(th); ans=u9r1(c);
    setup="\\cos "+th+"^\\circ = \\frac{x}{"+a+"}";
    distVals=[[a*u9sin(th),"That uses the sine ratio, which finds the side across from the angle. The side next to the angle uses cosine with the hypotenuse."],
              [a/Math.tan(u9rad(th)),"That divides by the tangent. With the hypotenuse known, cosine gives the adjacent side directly."]];
    givenLab=[String(a),"", "?"]; findLab="c";
  } else {
    c=ri(10,24); b=c*Math.tan(u9rad(th)); a=Math.sqrt(b*b+c*c); ans=u9r1(b);
    setup="\\tan "+th+"^\\circ = \\frac{x}{"+c+"}";
    distVals=[[c*u9sin(th),"That uses the sine ratio with the adjacent side. Sine pairs the opposite side with the hypotenuse."],
              [c*u9cos(th),"That uses the cosine ratio, which pairs the adjacent side with the hypotenuse, not with the opposite side."]];
    givenLab=["", "?", String(c)]; findLab="b";
  }
  var dists=u9mkD(ans,distVals);
  var q=mcq("In the right triangle shown, the right angle is at A and angle B is \\("+th+"^\\circ\\). Find the length of the side marked ?, to one decimal place.",
    {t:fmtF(ans,1), fb:"Yes: the setup "+(mode===0?"uses sine with the hypotenuse":mode===1?"uses cosine with the hypotenuse":"uses tangent with the adjacent side")+" and solves to that length."}, dists,
    "Pick the ratio built from the known side and the side being found, for angle B. \\[ \\begin{aligned} "+setup+" \\\\ x &= "+fmtF(ans,1)+" \\end{aligned} \\] The side is <b>"+fmtF(ans,1)+"</b> long.",
    {mode:"bridge-find-side", th:th, sub:mode});
  q.figure=u9fig(a,b,c,givenLab,["90°",""+th+"°",""]);
  return q;
}, ["For the marked angle, name the known side and the side being found: opposite, adjacent or hypotenuse.", "Choose the ratio that uses exactly those two sides, then solve it."]);

E("u9r-find-side-workplace", 9, ["5.3"], 2, "gen", function(){
  var th=ri(24,62), mode=ri(0,3), ctx=ri(0,2);
  var a,b,c,ans,setup,distVals,story,givenLab;
  var ctxNames=["ladder","ramp","roof"];
  if(mode===0){
    a=ri(4,9); b=a*u9sin(th); c=a*u9cos(th); ans=u9r1(b);
    setup="\\sin "+th+"^\\circ = \\frac{x}{"+a+"}";
    distVals=[[a*u9cos(th),"That finds the distance along the ground. The height up the wall is the side opposite the angle."]];
    givenLab=[String(a),"?",""];
    story=["A ladder "+a+" m long leans on a wall, making an angle of "+th+" degrees with the ground, as shown. How high up the wall does the ladder reach, in metres?",
           "A loading ramp "+a+" m long makes an angle of "+th+" degrees with the ground, as shown. How high is the top of the ramp, in metres?",
           "A roof rafter "+a+" m long rises at an angle of "+th+" degrees from the wall plate, as shown. How high does the rafter rise, in metres?"][ctx];
  } else if(mode===1){
    a=ri(4,9); b=a*u9sin(th); c=a*u9cos(th); ans=u9r1(c);
    setup="\\cos "+th+"^\\circ = \\frac{x}{"+a+"}";
    distVals=[[a*u9sin(th),"That finds the height. The distance along the ground is the side next to the angle."]];
    givenLab=[String(a),"", "?"];
    story=["A ladder "+a+" m long leans on a wall, making an angle of "+th+" degrees with the ground, as shown. How far is the foot of the ladder from the wall, in metres?",
           "A loading ramp "+a+" m long makes an angle of "+th+" degrees with the ground, as shown. How far out from the truck does the ramp reach, in metres?",
           "A roof rafter "+a+" m long rises at an angle of "+th+" degrees from the wall plate, as shown. What is the horizontal run of the rafter, in metres?"][ctx];
  } else if(mode===2){
    b=ri(3,8); a=b/u9sin(th); c=b/Math.tan(u9rad(th)); ans=u9r1(a);
    setup="\\sin "+th+"^\\circ = \\frac{"+b+"}{x}";
    distVals=[[b*u9sin(th),"That multiplies by the sine. The known side is the opposite side, so the hypotenuse comes from dividing."],
              [b/Math.tan(u9rad(th)),"That finds the side along the ground. The slanted length is the hypotenuse."]];
    givenLab=["?",String(b),""];
    story=["A worker must reach a point "+b+" m up a wall with a ladder set at "+th+" degrees to the ground, as shown. How long must the ladder be, in metres?",
           "A dock ramp must rise "+b+" m at an angle of "+th+" degrees to the ground, as shown. How long must the ramp surface be, in metres?",
           "A roof must rise "+b+" m with rafters set at "+th+" degrees, as shown. How long must each rafter be, in metres?"][ctx];
  } else {
    c=ri(3,8); b=c*Math.tan(u9rad(th)); a=Math.sqrt(b*b+c*c); ans=u9r1(b);
    setup="\\tan "+th+"^\\circ = \\frac{x}{"+c+"}";
    distVals=[[c*u9sin(th),"That uses the sine ratio with the ground distance. Tangent pairs the height with the ground distance."]];
    givenLab=["", "?", String(c)];
    story=["A ladder foot sits "+c+" m from a wall and the ladder makes an angle of "+th+" degrees with the ground, as shown. How high does it reach, in metres?",
           "A ramp starts "+c+" m out from a loading door and rises at "+th+" degrees, as shown. How high is the door sill, in metres?",
           "A roof run is "+c+" m and the rafters rise at "+th+" degrees, as shown. How high is the ridge above the wall plate, in metres?"][ctx];
  }
  var dists=u9mkD(ans,distVals);
  var q=mcq(story+" Give the answer to one decimal place.",
    {t:fmtF(ans,1), fb:"Yes: the ratio matches the known side and the side being found, and it solves to that value."}, dists,
    "Draw the right triangle in your work and pick the ratio using the known side and the side being found. \\[ \\begin{aligned} "+setup+" \\\\ x &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" m</b>.",
    {mode:"bridge-workplace", th:th, sub:mode, ctx:ctxNames[ctx]});
  q.figure=u9fig(a,b,c,givenLab,["90°",""+th+"°",""]);
  return q;
}, ["Sketch the right triangle and mark the known side and the side being found for the given angle.", "Choose the ratio that uses exactly those two sides, then solve it."]);

E("u9r-find-angle", 9, ["5.3"], 2, "gen", function(){
  var th=ri(24,66), mode=ri(0,2), hyp=ri(14,30);
  var opp=hyp*u9sin(th), adj=hyp*u9cos(th);
  var oppD=u9r1(opp), adjD=u9r1(adj);
  var ans, setup, givenLab, invName;
  if(mode===0){
    ans=Math.round(u9deg(Math.asin(oppD/hyp))); invName="\\sin^{-1}";
    setup=invName+"\\left(\\frac{"+fmtF(oppD,1)+"}{"+hyp+"}\\right)";
    givenLab=[String(hyp),fmtF(oppD,1),""];
  } else if(mode===1){
    ans=Math.round(u9deg(Math.acos(adjD/hyp))); invName="\\cos^{-1}";
    setup=invName+"\\left(\\frac{"+fmtF(adjD,1)+"}{"+hyp+"}\\right)";
    givenLab=[String(hyp),"",fmtF(adjD,1)];
  } else {
    ans=Math.round(u9deg(Math.atan(oppD/adjD))); invName="\\tan^{-1}";
    setup=invName+"\\left(\\frac{"+fmtF(oppD,1)+"}{"+fmtF(adjD,1)+"}\\right)";
    givenLab=["",fmtF(oppD,1),fmtF(adjD,1)];
  }
  var dists=u9mkDeg(ans,[
    [90-ans, "That is the other acute angle in the triangle. The two given sides belong to the ratio for angle B."],
    [mode===0 ? u9deg(Math.acos(oppD/hyp)) : u9deg(Math.asin(adjD/hyp)), "That uses the wrong inverse ratio for the two given sides. Match the ratio to the sides first."]
  ]);
  var q=mcq("In the right triangle shown, the right angle is at A and the marked sides are given. Find the measure of angle B, to the nearest degree.",
    {t:String(ans), fb:"Yes: the inverse ratio built from the two given sides gives angle B."}, dists,
    "Build the ratio for angle B from the two given sides, then use its inverse to get an angle. \\[ \\begin{aligned} B &= "+setup+" \\\\ &= "+ans+"^\\circ \\end{aligned} \\] The measure of angle B is <b>"+ans+" degrees</b>.",
    {mode:"bridge-find-angle", th:th, sub:mode});
  q.figure=u9fig(hyp,opp,adj,givenLab,["90°","?",""]);
  return q;
}, ["Name the two given sides for angle B: opposite, adjacent or hypotenuse.", "Write the ratio from those sides, then use the inverse ratio to turn it into an angle."]);

E("u9r-elevation-depression", 9, ["5.3"], 2, "gen", function(){
  var th=ri(18,52), mode=ri(0,2), d,h,ans,setup,distVals,story,givenLab;
  if(mode===0){
    d=ri(20,80); h=d*Math.tan(u9rad(th)); ans=u9r1(h);
    setup="\\tan "+th+"^\\circ = \\frac{x}{"+d+"}";
    distVals=[[d*u9sin(th),"That uses the sine ratio with the ground distance. Tangent pairs the height with the ground distance."],
              [d/Math.tan(u9rad(th)),"That divides by the tangent. The height is the tangent times the ground distance."]];
    givenLab=["", "?", String(d)];
    story="From a point "+d+" m from the base of a light pole, the angle of elevation to the top of the pole is "+th+" degrees, as shown. The angle of elevation is the angle between the ground and the line of sight, looking up. How tall is the pole, in metres?";
  } else if(mode===1){
    h=ri(15,45); d=h/Math.tan(u9rad(th)); ans=u9r1(d);
    setup="\\tan "+th+"^\\circ = \\frac{"+h+"}{x}";
    distVals=[[h*Math.tan(u9rad(th)),"That multiplies the height by the tangent. The ground distance comes from dividing the height by the tangent."],
              [h*u9cos(th),"That uses the cosine ratio, which needs the slanted line of sight length. That length is not given."]];
    givenLab=["", String(h), "?"];
    story="From a point on the ground, the angle of elevation to the top of a "+h+" m tower is "+th+" degrees, as shown. The angle of elevation is the angle between the ground and the line of sight, looking up. How far is the point from the base of the tower, in metres?";
  } else {
    h=ri(20,60); d=h/Math.tan(u9rad(th)); ans=u9r1(d);
    setup="\\tan "+th+"^\\circ = \\frac{"+h+"}{x}";
    distVals=[[h*Math.tan(u9rad(th)),"That multiplies the height by the tangent. The distance out comes from dividing the height by the tangent."],
              [h*u9sin(th),"That uses the sine ratio, which needs the slanted line of sight length. That length is not given."]];
    givenLab=["", String(h), "?"];
    story="From the top of a "+h+" m lookout, the angle of depression to a boat is "+th+" degrees. The angle of depression is the angle between the horizontal and the line of sight, looking down, and it equals the marked angle at the boat in the diagram. How far is the boat from the base of the lookout, in metres?";
  }
  var hyp=Math.sqrt(d*d+h*h);
  var dists=u9mkD(ans,distVals);
  var q=mcq(story+" Give the answer to one decimal place.",
    {t:fmtF(ans,1), fb:"Yes: the height and the ground distance are the two legs, so the tangent ratio connects them with the angle."}, dists,
    "The height and the ground distance are the opposite and adjacent legs for the marked angle, so use the tangent ratio. \\[ \\begin{aligned} "+setup+" \\\\ x &= "+fmtF(ans,1)+" \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+" m</b>.",
    {mode:"bridge-elevation", th:th, sub:mode});
  q.figure=u9fig(hyp,h,d,givenLab,["90°",""+th+"°",""]);
  return q;
}, ["The height and the ground distance are the two legs of a right triangle. Name them opposite and adjacent for the marked angle.", "The ratio using the two legs is tangent. Set it up with the angle, then solve."]);

E("u9r-reasonable-result", 9, ["5.3"], 2, "gen", function(){
  var mode=ri(0,2), q;
  if(mode===0){
    var w=ri(6,16), h=ri(6,16); if(h===w) h+=2;
    var hyp=Math.sqrt(w*w+h*h), hypR=u9r1(hyp);
    var claim=u9r1(Math.sqrt(Math.abs(w*w-h*h))), longer=Math.max(w,h);
    q=mcq("A rectangular gate frame is "+w+" m wide and "+h+" m tall, with a diagonal brace running from one corner to the opposite corner. A student calculates the length of the brace as "+fmtF(claim,1)+" m. Which statement best judges this result?",
      {t:"It cannot be correct, because the brace is the hypotenuse of a right triangle, and the hypotenuse is always its longest side.", fb:"Yes: the brace is the hypotenuse of the right triangle formed by the frame, so it must be longer than the longer side, "+longer+" m. The claimed length is shorter than that side."},
      [{t:"It is reasonable, because a diagonal brace can come out shorter than the longer side of the rectangular frame it crosses.", fb:"The brace is a hypotenuse, and a hypotenuse is always the longest side of its triangle. A brace shorter than the side it crosses cannot come from a correct calculation."},
       {t:"It cannot be correct, because the length of the brace must be equal to the width of the frame and its height added together.", fb:"The brace is shorter than the width and height added together, never equal to them. That is not the test that fails here; the brace also has to beat the longer side on its own."},
       {t:"It is reasonable, because the Pythagorean relation can produce a length that is smaller than one of the sides it is built from.", fb:"The Pythagorean relation produces the hypotenuse, which is longer than either side. A result smaller than a side means the squares were subtracted instead of added, or a similar slip."}],
      "Judge the claim against the sides before anything else. The brace is the hypotenuse of a right triangle with legs "+w+" m and "+h+" m, so it must be longer than the longer leg, "+longer+" m. The claimed "+fmtF(claim,1)+" m is shorter than that, so it cannot be right; a value like this is the mark of subtracting the squares instead of adding them. Done correctly: \\[ \\begin{aligned} \\text{brace} &= \\sqrt{"+w+"^2 + "+h+"^2} \\\\ &= "+fmtF(hypR,1)+" \\text{ m} \\end{aligned} \\] The brace is <b>"+fmtF(hypR,1)+" m</b> long.",
      {mode:"bridge-reasonable", sub:0});
    q.figure=u9fig(hyp,h,w,["?",String(h),String(w)],["90°","",""]);
    return q;
  }
  if(mode===1){
    var H=ri(24,48), D=ri(18,40);
    var correct=Math.round(u9deg(Math.atan(H/D))), claimA=180-correct;
    var hypT=Math.sqrt(H*H+D*D);
    q=mcq("A student stands "+D+" m from the base of a tower "+H+" m tall and calculates the angle of elevation to the top of the tower as "+claimA+" degrees. The angle of elevation is the angle between the ground and the line of sight, looking up. Which statement best judges this result?",
      {t:"It cannot be correct, because the angle of elevation is an acute angle of a right triangle, and acute angles measure under 90 degrees.", fb:"Yes: the tower, the ground and the line of sight form a right triangle, and its acute angles add to 90 degrees. One of them cannot measure "+claimA+" degrees."},
      [{t:"It is reasonable, because the angle of elevation goes past 90 degrees whenever the tower is taller than the distance to its base.", fb:"A taller tower makes the angle larger, but the line of sight still rises from the ground, so the angle stays under 90 degrees. Past 90 would mean looking back over your own head."},
       {t:"It cannot be correct, because the angle of elevation must be found by dividing the height of the tower by the distance to its base.", fb:"Dividing the height by the distance gives the tangent of the angle, not the angle itself; an inverse ratio is needed after that. The failing check is the size of the angle claimed: it is past 90 degrees."},
       {t:"It is reasonable, because an inverse tangent calculation can return an angle larger than 90 degrees when the object is tall enough.", fb:"Inverse tangent returns the acute angle with the given tangent. In a right triangle that angle is always under 90 degrees, however tall the object is."}],
      "The tower, the ground and the line of sight form a right triangle, so the angle of elevation is one of its acute angles and has to measure under 90 degrees. The claimed "+claimA+" degrees fails that check; it is what comes from subtracting the angle from 180 degrees. Done correctly: \\[ \\begin{aligned} \\tan\\theta &= \\frac{"+H+"}{"+D+"} \\\\ \\theta &= "+correct+"^\\circ \\end{aligned} \\] The angle of elevation is <b>"+correct+" degrees</b>.",
      {mode:"bridge-reasonable", sub:1});
    q.figure=u9fig(hypT,H,D,["",String(H),String(D)],["90°","?",""]);
    return q;
  }
  var S=ri(12,20), T=ri(38,48);
  var trueH=S*Math.tan(u9rad(T)), trueHR=u9r1(trueH), claimH=Math.round(trueH*10);
  var hypS=Math.sqrt(trueH*trueH+S*S);
  q=mcq("A flagpole casts a shadow "+S+" m long while the angle of elevation of the sun is "+T+" degrees. A student calculates the height of the flagpole as "+claimH+" m. Which statement best judges this result?",
    {t:"It cannot be correct, because with the sun angle near 45 degrees the height should be roughly the same size as the shadow, not ten times it.", fb:"Yes: the tangent of an angle near 45 degrees is near 1, so the height and the shadow come out about the same size. The claim is about ten times too big."},
    [{t:"It is reasonable, because the height of a pole is not limited by the length of its shadow, and the two can differ by any amount at all here.", fb:"The height is tied to the shadow by the sun angle: height equals shadow times the tangent of the angle. With the angle near 45 degrees, the two lengths land close together."},
     {t:"It cannot be correct, because the height of the pole must be found by dividing the shadow length by the sun angle in degrees alone.", fb:"Dividing a length by an angle is not a step in any trig ratio. The failing check is scale: the claimed height is far too large for this shadow and sun angle."},
     {t:"It is reasonable, because the tangent ratio often makes the height come out many times longer than the shadow that produced it in the first place.", fb:"Tangent multiplies the shadow by the tangent of the angle, which is near 1 here. It cannot stretch a "+S+" m shadow into a "+claimH+" m pole."}],
    "Compare the claim with the shadow before anything else. The height and the shadow are the two legs for the sun angle, joined by the tangent ratio: \\[ \\begin{aligned} \\text{height} &= "+S+" \\tan "+T+"^\\circ \\\\ &= "+fmtF(trueHR,1)+" \\text{ m} \\end{aligned} \\] With the angle near 45 degrees the tangent is near 1, so the height should land close to the "+S+" m shadow. The claimed "+claimH+" m is about ten times that, the mark of a slipped decimal point. The height is <b>"+fmtF(trueHR,1)+" m</b>.",
    {mode:"bridge-reasonable", sub:2});
  q.figure=u9fig(hypS,trueH,S,["","?",String(S)],["90°",T+"°",""]);
  return q;
}, ["Put the claimed result next to the other sizes in the problem and ask whether it could possibly fit the picture.", "Run the quick checks: the hypotenuse beats every leg, an acute angle stays under 90 degrees, and a result should match the scale of its scenario."]);

/* Bridging provenance (Jason's ruling, November 8, 2026): entries named here
   carry their true Math 1202 source indicator as bridgeSrc, with bridging set
   true, alongside the Unit 9 checker code in `indicators`. */
var BRIDGE_SRC={
  "u9r-find-side":"MA1202.5.5",
  "u9r-find-side-workplace":"MA1202.5.5",
  "u9r-find-angle":"MA1202.5.5",
  "u9r-reasonable-result":"MA1202.5.6"
};
BANK.forEach(function(e){ var s=BRIDGE_SRC[e.id]; if(s){ e.bridging=true; e.bridgeSrc=s; } });

/* Prior knowledge flags (Nov 13, 2026): the entries named
   below assess Math 1202 primary trigonometric ratio outcomes (indicators 5.1 to 5.6), and nothing on this
   course's indicator list (Jason's assessed-target standard;
   see the prior knowledge audit and its re-test). The pkFlag
   property is set here in the bank module the way the enrich
   flags are set in Math 2201's bank-u7.js; assembly carries
   it into banks/math-3202.js verbatim, and the shell's isPK
   reads it alongside PK-coded indicators. Flagged entries
   stay in practice pools by default and leave them only
   when a teacher turns prior knowledge off in Advanced
   tools. */
BANK.forEach(function(e){if(["u9r-ratio-value","u9r-find-side","u9r-find-side-workplace","u9r-find-angle","u9r-elevation-depression","u9r-reasonable-result"].indexOf(e.id)>=0)e.pkFlag=true;});

/* ----- bank-u10.js ----- */
// Math 3202 Unit 10 Probability question bank
// CRMARKS: u10-prob-data-cr=3
// CRMARKS: u10-odds-to-prob-cr=4
// CRMARKS: u10-expected-count-cr=5
// CRMARKS: u10-compare-offers-cr=4
// CRMARKS: u10-fair-prize-cr=5
/* ===== Unit 10 ===== */
/* Math 3202 Unit 10: Probability (7.1 to 7.7). Helpers prefixed u10.
   Probabilities are built from data sets, expressed in several forms, and
   compared with odds. No independent or dependent events indicators exist in
   this unit, so no entries are built around them. */
function u10gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){var t=a%b;a=b;b=t;}return a||1;}
function u10fr(n,d){var g=u10gcd(n,d); return "\\( "+FR(n/g,d/g)+" \\)";}
function u10frRaw(n,d){var g=u10gcd(n,d); return FR(n/g,d/g);}
function u10mkPct(cv,cands){
  var out=[], seen={}; seen[fmtF(cv,1)]=1;
  for(var i=0;i<cands.length && out.length<3;i++){
    var v=cands[i][0]; if(!isFinite(v) || v<0 || v>100) continue;
    var t=fmtF(v,1); if(seen[t]) continue; seen[t]=1; out.push({t:t, fb:cands[i][1]});
  }
  var offs=[7.5,-6.5,12,-11,18];
  for(var k=0; out.length<3 && k<offs.length; k++){
    var vv=cv+offs[k]; if(vv<0 || vv>100) continue; var tt=fmtF(vv,1); if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That percent comes from an arithmetic slip after the setup. Keep the setup and redo the conversion."});
  }
  return out;
}
function u10mkNum(cv,cands,dec){
  dec=(dec===undefined?2:dec);
  var out=[], seen={}; seen[fmtF(cv,dec)]=1;
  for(var i=0;i<cands.length && out.length<3;i++){
    var v=cands[i][0]; if(!isFinite(v) || v<0) continue;
    var t=fmtF(v,dec); if(seen[t]) continue; seen[t]=1; out.push({t:t, fb:cands[i][1]});
  }
  var offs=[1.7,-1.3,2.9,-2.4,4.1];
  for(var k=0; out.length<3 && k<offs.length; k++){
    var vv=cv+offs[k]; if(vv<0) continue; var tt=fmtF(vv,dec); if(seen[tt]) continue; seen[tt]=1;
    out.push({t:tt, fb:"That value comes from an arithmetic slip after the setup. Keep the setup and redo the final step."});
  }
  return out;
}
var u10PAIRS=[[1,2],[1,4],[3,4],[1,5],[2,5],[3,5],[4,5],[1,8],[3,8],[5,8],[7,8],[1,10],[3,10],[7,10],[9,10],[1,20],[3,20],[7,20],[9,20],[11,20],[13,20],[17,20],[19,20],[1,25],[6,25],[7,25],[11,25],[12,25],[13,25],[18,25],[24,25],[1,50],[9,50],[21,50],[27,50],[33,50],[41,50]];

E("u10-prob-from-data", 10, ["7.1"], 1, "gen", function(){
  var sets=[
    {name:"A school survey asked students how they get to school", cats:["walk","bus","car ride","bike"]},
    {name:"A spinner was spun and the landing colour was tallied", cats:["red","blue","green","yellow"]},
    {name:"A cafeteria tallied one day of lunch orders", cats:["soup","sandwich","pizza","salad"]},
    {name:"A weather station tallied sky conditions for a set of days", cats:["sunny","cloudy","rain","snow"]},
    {name:"A rec centre tallied sign ups for evening programs", cats:["swim","skate","gym","art"]}
  ];
  var s=pick(sets), counts, fav, guard=0;
  do {
    counts=[ri(3,18),ri(3,18),ri(3,18),ri(3,18)]; fav=ri(0,3); guard++;
  } while(guard<60 && (counts[fav]===counts[(fav+1)%4] || counts[fav]*2===counts.reduce(function(x,y){return x+y;},0)));
  if(guard>=60){ counts=[5,9,7,11]; fav=1; }
  var total=counts.reduce(function(x,y){return x+y;},0);
  var other=(fav+1)%4;
  var listing=s.cats.map(function(cn,i){return cn+" "+counts[i];}).join(", ");
  var dists=[
    {t:u10fr(counts[other],total), fb:"That fraction uses the count for "+s.cats[other]+". The event asked for is "+s.cats[fav]+"."},
    {t:u10fr(total-counts[fav],total), fb:"That fraction counts everything except "+s.cats[fav]+". The event is "+s.cats[fav]+" itself."},
    {t:u10fr(total,counts[fav]), fb:"That fraction is upside down, with the total on top. A probability is favourable outcomes over total outcomes."}
  ];
  return mcq(s.name+": "+listing+". Based on this data, what is the probability that a randomly chosen record is "+s.cats[fav]+"? Give the probability as a simplified fraction.",
    {t:u10fr(counts[fav],total), fb:"Yes: "+counts[fav]+" favourable records out of "+total+" in total, simplified."}, dists,
    "Probability from data is favourable outcomes divided by total outcomes. \\[ \\begin{aligned} P &= \\frac{"+counts[fav]+"}{"+total+"} \\\\ &= "+u10frRaw(counts[fav],total)+" \\end{aligned} \\] The answer is <b>"+u10fr(counts[fav],total)+"</b>.",
    {mode:"prob-data", set:s.cats[0], fav:fav});
}, ["Use the data set itself: count the favourable records and count all the records.", "Start by writing the favourable count over the total count, then simplify."]);

E("u10-express-forms", 10, ["7.2"], 1, "gen", function(){
  var pair=pick(u10PAIRS), f=pair[0], t=pair[1], mode=ri(0,2);
  var dec=f/t, pct=100*f/t;
  if(mode===0){
    var dists=u10mkPct(pct,[
      [100-pct, "That is the percent for the event not happening. The given fraction is the event itself."],
      [dec, "That is the decimal form placed in front of a percent sign. A percent is the decimal times 100."],
      [f, "That uses the numerator alone. A percent comes from the whole fraction value."]
    ]).map(function(d){return {t:d.t+"%", fb:d.fb};});
    var _bo0=balOpts({t:fmtF(pct,1)+"%", fb:"Yes: divide to get the decimal, then multiply by 100 for the percent."}, dists); return mcq("A probability is given as "+u10fr(f,t)+". Express this probability as a percent.", _bo0[0], _bo0[1],
      "Convert the fraction to a decimal, then to a percent. \\[ \\begin{aligned} \\frac{"+f+"}{"+t+"} &= "+fmt(dec)+" \\\\ &= "+fmtF(pct,1)+"\\% \\end{aligned} \\] The answer is <b>"+fmtF(pct,1)+"%</b>.",
      {mode:"express-percent", f:f, t:t});
  }
  if(mode===1){
    var dists1=u10mkNum(dec,[
      [pct, "That is the percent value. A decimal probability stays between 0 and 1."],
      [1-dec, "That is the decimal for the event not happening. The given fraction is the event itself."],
      [dec*10, "That shifts the decimal one place too far. Divide the numerator by the denominator as written."]
    ]).map(function(d){return {t:d.t, fb:d.fb};});
    var _bo1=balOpts({t:fmt(dec), fb:"Yes: dividing the numerator by the denominator gives that decimal."}, dists1); return mcq("A probability is given as "+u10fr(f,t)+". Express this probability as a decimal.", _bo1[0], _bo1[1],
      "Divide the numerator by the denominator. \\[ \\begin{aligned} \\frac{"+f+"}{"+t+"} &= "+fmt(dec)+" \\end{aligned} \\] The answer is <b>"+fmt(dec)+"</b>.",
      {mode:"express-decimal", f:f, t:t});
  }
  var stmt="There is a "+fmtF(pct,1)+"% chance the event happens";
  var altPct=(pct===50? 75 : 100-pct);
  var dists2=[
    {t:"There is a "+fmtF(altPct,1)+"% chance the event happens", fb:"That percent does not come from converting the given fraction. Work from the fraction itself, not from a different event."},
    {t:"There is a "+fmtF(dec,1)+"% chance the event happens", fb:"That uses the decimal value as the percent. A percent is the decimal times 100."},
    {t:"The event is certain to happen", fb:"The given fraction is below 1, so the event is not certain."}
  ];
  var _bo2=balOpts({t:stmt, fb:"Yes: the fraction converts to that percent, and the statement carries it."}, dists2); return mcq("A probability is given as "+u10fr(f,t)+". Which statement expresses this probability?", _bo2[0], _bo2[1],
    "Convert the fraction first: \\(\\frac{"+f+"}{"+t+"} = "+fmt(dec)+" = "+fmtF(pct,1)+"%\\). The answer is <b>"+stmt+"</b>.",
    {mode:"express-statement", f:f, t:t});
}, ["All four forms describe the same value, so convert the given form step by step.", "Start by turning the fraction into a decimal."]);

E("u10-prob-from-odds-basic", 10, ["7.4"], 1, "gen", function(){
  var a,b,guard=0;
  do { a=ri(1,9); b=ri(1,9); guard++; } while(guard<40 && a===b);
  if(a===b){a=3; b=5;}
  var ctx=pick(["A raffle lists the odds in favour of winning a prize as ",
                "A board game lists the odds in favour of landing on a bonus space as ",
                "A weather page lists the odds in favour of rain tomorrow as ",
                "A contest lists the odds in favour of a ticket being drawn as "]);
  var dists=[
    {t:u10fr(a,b), fb:"That is the odds written as a fraction. Probability divides the favourable part by the total of both parts."},
    {t:u10fr(b,a+b), fb:"That is the probability of the event not happening. The odds in favour put the favourable part first."},
    {t:u10fr(a+b,a), fb:"That fraction is greater than 1, so it cannot be a probability. Favourable outcomes go over total outcomes."}
  ];
  return mcq(ctx+a+" : "+b+". What is the probability of the event? Give it as a simplified fraction.",
    {t:u10fr(a,a+b), fb:"Yes: probability is the favourable part over the sum of both parts of the odds."}, dists,
    "Odds in favour of "+a+" : "+b+" mean "+a+" favourable parts and "+b+" unfavourable parts, for "+(a+b)+" parts in total. \\[ \\begin{aligned} P &= \\frac{"+a+"}{"+a+" + "+b+"} \\\\ &= "+u10frRaw(a,a+b)+" \\end{aligned} \\] The answer is <b>"+u10fr(a,a+b)+"</b>.",
    {mode:"odds-basic", a:a, b:b});
}, ["Odds compare favourable to unfavourable. Probability compares favourable to the total.", "Start by adding the two parts of the odds to get the total."]);

E("u10-express-context", 10, ["7.2"], 2, "gen", function(){
  var totals=[20,25,40,50,80,100], total=pick(totals), fav=ri(2,total-2);
  var pct=100*fav/total, dec=fav/total, mode=ri(0,1);
  var ctxs=["In a survey of "+total+" customers, "+fav+" said they would return to the shop",
            "Of "+total+" parts checked on a line, "+fav+" passed on the first check",
            "In "+total+" days of records, it rained on "+fav+" days",
            "Of "+total+" students asked, "+fav+" chose the evening class"];
  var ctx=pick(ctxs);
  if(mode===0){
    var dists=u10mkPct(pct,[
      [100-pct, "That is the percent for the rest of the group. The event is the part named in the data."],
      [fav, "That is the count itself with a percent sign. Divide the count by the total, then multiply by 100."],
      [dec, "That is the decimal value with a percent sign. A percent is the decimal times 100."]
    ]).map(function(d){return {t:d.t+"%", fb:d.fb};});
    return mcq(ctx+". Based on this data, express the probability of the named event as a percent.",
      {t:fmtF(pct,1)+"%", fb:"Yes: the count over the total converts to that percent."}, dists,
      "Write the probability from the data, then convert it. \\[ \\begin{aligned} P &= \\frac{"+fav+"}{"+total+"} = "+fmt(dec)+" \\\\ &= "+fmtF(pct,1)+"\\% \\end{aligned} \\] The answer is <b>"+fmtF(pct,1)+"%</b>.",
      {mode:"express-ctx-percent", fav:fav, total:total});
  }
  var stmt="There is a "+fmtF(pct,1)+"% chance of the event for a randomly chosen record";
  var altPct2=(pct>=50? Math.round((pct-27)*10)/10 : Math.round((pct+27)*10)/10);
  var altCount=(fav+7<=total? fav+7 : fav-7);
  var dists2=[
    {t:"There is a "+fmtF(altPct2,1)+"% chance of the event for a randomly chosen record", fb:"That percent does not match the data. Divide the named count by the total count first."},
    {t:"There is a "+altCount+"% chance of the event for a randomly chosen record", fb:"That figure does not come from the data as a percent. The count must be divided by the total, then changed to a percent."},
    {t:"The event will happen for every record in the data", fb:"Only part of the records show the event, so it is not certain."}
  ];
  return mcq(ctx+". Which statement expresses the probability of the named event, based on this data?",
    {t:stmt, fb:"Yes: the data give that percent chance for a randomly chosen record."}, dists2,
    "From the data, \\(P = \\frac{"+fav+"}{"+total+"} = "+fmtF(pct,1)+"%\\). The answer is <b>"+stmt+"</b>.",
    {mode:"express-ctx-statement", fav:fav, total:total});
}, ["Build the probability from the data first, then change its form.", "Start with the named count over the total count."]);

E("u10-odds-explain", 10, ["7.3"], 2, "var", varset([
  function(){ return mcq("Which statement explains the difference between odds and probability?",
    {t:"Odds compare favourable outcomes to unfavourable outcomes, while probability compares favourable outcomes to all outcomes", fb:"Yes: the second number is what changes. Odds use the unfavourable count, probability uses the total."},
    [{t:"Odds and probability are the same value written two ways, so the two can be used in place of each other at any time at all", fb:"They use different comparisons, so their values differ unless no outcome is unfavourable."},
     {t:"Odds compare favourable outcomes to all outcomes, while probability compares favourable to unfavourable", fb:"That swaps the two definitions. Probability is the one built on the total."},
     {t:"Odds are always percents, while probability is always a fraction, and the two forms never swap", fb:"Either idea can be written in several forms. The difference is what is being compared, not the form."}],
    "Odds in favour are favourable to unfavourable. Probability is favourable to total, and the total is favourable plus unfavourable. The answer is <b>Odds compare favourable outcomes to unfavourable outcomes, while probability compares favourable outcomes to all outcomes</b>.", {mode:"odds-def"}); },
  function(){ return mcq("The odds in favour of an event are 3 : 2. A student writes the probability as \\(\\frac{3}{2}\\). Which comment is correct?",
    {t:"The student wrote the odds as a fraction. The probability is 3 out of 5 in total, so it is three fifths", fb:"Yes: the denominator of a probability is the total, 3 plus 2."},
    [{t:"The student is right, since odds and probability share a denominator, so the fraction stands", fb:"They do not share a denominator. Odds use the unfavourable count, probability uses the total."},
     {t:"The probability is 2 out of 5, since the second odds number goes on top in the fraction", fb:"The favourable part, 3, goes on top of the probability. The total, 5, goes on the bottom."},
     {t:"The probability cannot be found from odds, since odds never give a total to work with at all in any problem", fb:"It can: add the two odds parts to get the total for the probability denominator."}],
    "Odds 3 : 2 give 3 favourable parts out of \\(3 + 2 = 5\\) parts in total, so the probability is \\(\\frac{3}{5}\\). The answer is <b>The student wrote the odds as a fraction</b>.", {mode:"odds-error"}); },
  function(){ return mcq("An event has probability \\(\\frac{3}{5}\\). What are the odds in favour of the event?",
    {t:"3 : 2", fb:"Yes: 3 favourable parts, and the remaining 2 of the 5 parts are unfavourable."},
    [{t:"3 : 5", fb:"That repeats the probability comparison. Odds compare favourable to unfavourable, not to the total."},
     {t:"2 : 3", fb:"That is the odds against the event. In favour puts the favourable part first."},
     {t:"5 : 3", fb:"That puts the total first. Odds use only the favourable and unfavourable parts."}],
    "A probability of \\(\\frac{3}{5}\\) means 3 favourable parts out of 5 in total, leaving 2 unfavourable parts. Odds in favour are favourable to unfavourable. The answer is <b>3 : 2</b>.", {mode:"prob-to-odds"}); },
  function(){ return mcq("A spinner has 10 equal sectors, and 4 of them are gold. Which statement about gold is correct?",
    {t:"The odds in favour of gold are 4 : 6, and the probability of gold is 4 out of 10", fb:"Yes: odds use the 6 sectors that are not gold, probability uses all 10 sectors."},
    [{t:"The odds in favour of gold are 4 : 10, and the probability of gold is 4 out of 10", fb:"The odds denominator idea is off: odds compare gold to not gold, which is 4 to 6."},
     {t:"The odds in favour of gold are 6 : 4, and the probability of gold is 6 out of 10", fb:"That starts from the sectors that are not gold. Gold itself has 4 sectors."},
     {t:"The odds and the probability are both written 4 : 6, in exactly the same form", fb:"A probability is a fraction of the total, not a part to part comparison like 4 : 6."}],
    "Gold has 4 sectors and the other colours have \\(10 - 4 = 6\\). Odds compare part to part, probability compares part to total. The answer is <b>The odds in favour of gold are 4 : 6, and the probability of gold is 4 out of 10</b>.", {mode:"odds-spinner"}); },
  function(){ return mcq("A game maker says a move succeeds with odds in favour of 1 : 4. A player says this means the move succeeds 1 time in 4. Which comment is correct?",
    {t:"The player mixed up odds and probability. The move succeeds 1 time in 5 in total", fb:"Yes: 1 favourable part plus 4 unfavourable parts makes 5 parts in total."},
    [{t:"The player is right, since the second odds number is the total count", fb:"The second odds number counts unfavourable outcomes only. The total is the sum of both parts."},
     {t:"The move succeeds 4 times in 5, since the larger number rules every time it is tried", fb:"The favourable part is 1, not 4. Four parts are unfavourable."},
     {t:"Odds of 1 : 4 mean the move never succeeds, so the move is hopeless", fb:"A favourable part of 1 means success is possible, just less likely than failure."}],
    "Odds in favour of 1 : 4 mean 1 favourable part out of \\(1 + 4 = 5\\) parts in total. The answer is <b>The player mixed up odds and probability</b>.", {mode:"odds-game"}); }
]), ["Ask what the second number counts in each idea: unfavourable outcomes, or all outcomes.", "If a total is needed, add the favourable and unfavourable parts."]);

E("u10-decisions", 10, ["7.5"], 2, "var", varset([
  function(){ return mcq("A town crew must decide by 6 AM whether to set up an outdoor market. The forecast model gives a 70% chance of rain, the last 10 market days with a similar forecast had rain on 6, and the lead hand notes the sky is already darkening. Which statement best describes a sound decision process here?",
    {t:"Weigh all three: the forecast probability, the past market day results, and the lead hand's read of the sky", fb:"Yes: a real decision often combines a calculated probability, observed results, and judgement about the day itself."},
    [{t:"Use the forecast probability alone, since a calculated value settles the call completely, with nothing else to check", fb:"A forecast probability helps, but past results and current signs can change how it is read."},
     {t:"Use the lead hand's read alone, since experience beats numbers when a quick call is needed", fb:"Judgement matters, but ignoring the forecast and the past results throws away useful information."},
     {t:"Cancel whenever any chance of rain exists at all, however small the chance of rain may be on the day", fb:"That treats every risk as equal. The size of the chance and the other information should shape the call."}],
    "The calculated 70% is the theoretical side, the past 10 market days are experimental results, and the darkening sky feeds subjective judgement. Sound decisions weigh the three together. The answer is <b>Weigh all three</b>.", {mode:"dec-weather"}); },
  function(){ return mcq("A bakery is deciding whether to launch a new loaf. A costing model says the loaf has a good chance of selling, a two week trial sold 48 of 60 loaves baked, and the owner knows a festival crowd arrives next month. Which statement best describes the strongest basis for the decision?",
    {t:"Combine the model, the trial results, and the owner's knowledge of the coming festival", fb:"Yes: each source covers a gap in the others, and together they support the launch call."},
    [{t:"Rely on the trial alone, since only sales that already happened count, and nothing else does", fb:"The trial is useful experimental evidence, but the model and the festival timing also affect the decision."},
     {t:"Rely on the owner's knowledge alone, since the owner knows the customers well by now", fb:"Judgement plays a part, but the trial results and the model give it support."},
     {t:"Skip the launch, since no source can guarantee the loaf will sell at all in the shop", fb:"A guarantee is not the standard. Decisions weigh the best available evidence."}],
    "The model is the theoretical side, 48 of 60 is an experimental result, and the festival is subjective judgement about timing. The strongest basis combines all three. The answer is <b>Combine the model, the trial results, and the owner's knowledge</b>.", {mode:"dec-bakery"}); },
  function(){ return mcq("A curling skip is choosing who throws last rock in a practice league final. League stats give one player a higher make rate, recent bonspiel results favour the other player slightly, and the skip has watched both handle pressure all season. Which statement best fits how such decisions are usually made?",
    {t:"The skip weighs the season stats, the recent results, and a judgement about handling pressure", fb:"Yes: calculated rates, recent experimental results, and judgement all feed a coach or skip decision."},
    [{t:"The stats alone decide it, since feelings have no place in the choice, which is purely numerical", fb:"Stats matter, but recent form and pressure handling are also real information a skip uses."},
     {t:"The most recent game alone decides it, since it is the freshest result of all this season", fb:"One game is a thin sample. Season stats and the skip's judgement steady the call."},
     {t:"The choice is a coin flip, since both players have made shots before, so it is even", fb:"The two players are not shown to be equal. The available evidence points in usable directions."}],
    "Season stats act like theoretical probability, recent bonspiel results are experimental, and the pressure read is subjective judgement. Skips combine the three. The answer is <b>The skip weighs the season stats, the recent results, and a judgement about handling pressure</b>.", {mode:"dec-skip"}); },
  function(){ return mcq("A ferry operator decides whether to add an extra evening crossing. Booking software predicts strong demand, last summer the extra crossing filled on 8 of 10 tries, and the operator knows a concert is scheduled that night. Which statement best describes the decision?",
    {t:"It rests on a mix of the predicted demand, last summer's results, and knowledge of the concert", fb:"Yes: prediction, past results, and local knowledge combine in this kind of scheduling call."},
    [{t:"It rests on last summer alone, since predictions are guesses, not real evidence at all", fb:"Predictions built on booking data are more than guesses, and the concert adds current information."},
     {t:"It rests on the concert alone, since one big event decides demand for the extra crossing", fb:"The concert helps, but past fill results and the booking prediction also bear on the call."},
     {t:"It should wait until demand is certain before any decision is made about adding the extra crossing run", fb:"Crossings must be scheduled ahead. The decision uses the best mix of evidence available now."}],
    "The software prediction is the theoretical side, 8 of 10 is experimental, and the concert is judgement about this specific night. The answer is <b>It rests on a mix of the predicted demand, last summer's results, and knowledge of the concert</b>.", {mode:"dec-ferry"}); },
  function(){ return mcq("A shop owner must pick a weekend to run a sidewalk sale. A sales model favours the long weekend, last year the sale drew crowds on 3 of 4 fair days tried, and the owner hears road work may start near the shop soon. Which statement best describes a sound way to pick the date?",
    {t:"Balance the model, last year's results, and the road work news before choosing", fb:"Yes: the model, the experimental results, and the judgement call about road work each affect the date."},
    [{t:"Follow the model exactly, since it uses the most data of all", fb:"The model cannot know about the road work. Current local information can shift its pick."},
     {t:"Pick the same date as last year, since it worked once, whatever has changed since", fb:"One past result is a small sample, and conditions like road work may have changed."},
     {t:"Delay the sale until a perfect date with no risks appears on the calendar", fb:"Every date carries some risk. The job is to weigh the evidence and choose."}],
    "The model supplies the calculated side, last year's 3 of 4 is experimental, and the road work report feeds subjective judgement. The answer is <b>Balance the model, last year's results, and the road work news before choosing</b>.", {mode:"dec-sale"}); }
]), ["Look for the option that uses more than one kind of information.", "Sort the details into calculated chances, past results, and judgement calls."]);

E("u10-applications", 10, ["7.6"], 2, "var", varset([
  function(){ return mcq("How does an insurance company use probability when it sets premiums for home insurance?",
    {t:"It estimates the chance of claims from past data and sets premiums so total premiums cover expected claims and costs", fb:"Yes: probability turns past claim patterns into expected costs, which drive the price."},
    [{t:"It charges each home the full cost of a fire, since a fire is possible and every home must pay for a whole fire itself", fb:"Premiums spread expected costs across many homes. No single home pays a full claim cost up front."},
     {t:"It sets premiums by the age of the agent selling the policy, using the agent's age as the risk measure", fb:"The seller's age has nothing to do with the chance of a claim on the home."},
     {t:"It guarantees that no insured home will ever have a claim, promising complete safety to every customer", fb:"Insurance plans for claims happening, using probability. It does not promise they will not happen."}],
    "Insurers use past data to estimate the probability and size of claims, then price premiums to cover the expected total. The answer is <b>It estimates the chance of claims from past data and sets premiums so total premiums cover expected claims and costs</b>.", {mode:"app-insurance"}); },
  function(){ return mcq("A weather service reports a 60% chance of rain tomorrow. What does that figure rest on?",
    {t:"Models compare today's conditions with many past days and report how often similar setups brought rain", fb:"Yes: the percent mixes calculated models with records of past outcomes."},
    [{t:"It means rain will fall for 60% of the day, minute by minute, covering most of the day's hours overall", fb:"The percent is about the chance of rain occurring, not a share of the day's minutes."},
     {t:"It means 60 of every 100 towns nearby will get rain on the day, and the other 40 will stay dry", fb:"The forecast is for the stated place, not a count of towns."},
     {t:"It is a promise that rain is more than halfway certain to ruin plans for everyone that day", fb:"A 60% chance still leaves a real chance of no rain. It is a guide for decisions, not a promise."}],
    "Forecast percents come from models checked against past weather records, a direct application of probability. The answer is <b>Models compare today's conditions with many past days and report how often similar setups brought rain</b>.", {mode:"app-weather"}); },
  function(){ return mcq("A food plant checks a sample of jars from each batch instead of opening every jar. How is probability at work in this quality control step?",
    {t:"The sample results estimate the chance that jars in the whole batch meet the standard", fb:"Yes: sampling uses probability to judge a batch without testing every item."},
    [{t:"Opening a few jars proves every other jar is perfect, with no need to check any more of them", fb:"A sample gives an estimate with some risk, not a proof about every jar."},
     {t:"The plant opens the jars with the nicest labels to be fair to everyone", fb:"Samples must be chosen at random. Picking by looks biases the result."},
     {t:"Sampling removes the need for any standards on the line, so anything can pass", fb:"Standards define what counts as passing. Sampling only estimates how the batch measures up."}],
    "Random sampling lets the plant estimate the probability that batch items meet the standard, which is a standard probability application. The answer is <b>The sample results estimate the chance that jars in the whole batch meet the standard</b>.", {mode:"app-quality"}); },
  function(){ return mcq("A provincial lottery sells tickets with a very small chance of the top prize. How does probability explain the way the lottery is run?",
    {t:"Ticket prices and prize sizes are set from the winning chances so prize payouts stay within ticket income over many draws", fb:"Yes: with tiny winning probabilities, expected payouts can be planned across a huge number of tickets."},
    [{t:"Each ticket is due a win after enough losses pile up, so a win must come to every regular buyer in their turn, without fail", fb:"Past losses do not raise a ticket's chance. Each draw stands on its own chances."},
     {t:"The top prize is small because winning is easy, and easy games pay out small prizes to their many winners each week", fb:"Winning the top prize is very hard, which is why the prize can be large."},
     {t:"Buying more tickets makes a win certain, since enough tickets must include the winning one in the end for sure", fb:"More tickets raise the chance but never make it certain, short of buying every combination."}],
    "Lotteries set prices and prizes from the probabilities of winning, so expected payouts fit inside ticket income over many draws. The answer is <b>Ticket prices and prize sizes are set from the winning chances so prize payouts stay within ticket income over many draws</b>.", {mode:"app-lottery"}); },
  function(){ return mcq("A game designer balances a board game where a special space should come up about once every six turns on average. How is probability guiding the design?",
    {t:"The designer sets the chance of the space near 1 in 6 so long run play matches the target pace", fb:"Yes: design targets are long run frequencies set by probability."},
    [{t:"The designer promises the space appears exactly on every sixth turn of the game", fb:"A probability near 1 in 6 gives an average pace, not an exact schedule."},
     {t:"The designer removes chance so better players always hit the space every single time they play", fb:"The space is chance based by design. Removing chance changes the game, not its balance."},
     {t:"The designer counts only the first game ever played when setting the chance for the space", fb:"Long run averages come from many plays, not a single game."}],
    "Setting a probability near \\(\\frac{1}{6}\\) makes the space appear about once every six turns over long play, which is probability applied to game design. The answer is <b>The designer sets the chance of the space near 1 in 6 so long run play matches the target pace</b>.", {mode:"app-game"}); }
]), ["Look for the option where a chance or a long run average does real work in the setting.", "Rule out options that promise certainty: probability guides, it does not guarantee."]);

E("u10-prob-data-cr", 10, ["7.1"], 2, "gen", function(){
  var sets=[
    {name:"A transit office tallied late arrivals for one route", cats:["on time","1 to 5 min late","6 to 10 min late","over 10 min late"], event:1, phrase:"1 to 5 min late"},
    {name:"A clinic tallied wait times for morning appointments", cats:["under 10 min","10 to 20 min","21 to 30 min","over 30 min"], event:0, phrase:"under 10 min"},
    {name:"A bakery tallied the type of loaf sold on a Saturday", cats:["white","whole wheat","rye","sourdough"], event:3, phrase:"sourdough"},
    {name:"A gym tallied check ins by time block", cats:["morning","midday","afternoon","evening"], event:3, phrase:"evening"}
  ];
  var s=pick(sets);
  var counts=[ri(4,22),ri(4,22),ri(4,22),ri(4,22)];
  var total=counts.reduce(function(x,y){return x+y;},0);
  var fav=counts[s.event];
  var ans=Math.round(1000*fav/total)/10;
  var listing=s.cats.map(function(cn,i){return cn+" "+counts[i];}).join(", ");
  return numq(s.name+": "+listing+". Based on this data, find the probability that a randomly chosen record is "+s.phrase+", expressed as a percent, to one decimal place. Show your work.",
    ans, 0.2,
    "Probability from data is favourable outcomes divided by total outcomes, then changed to a percent. \\[ \\begin{aligned} P &= \\frac{"+fav+"}{"+total+"} \\\\ &= "+fmtF(ans,1)+"\\% \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+"%</b>.",
    {mode:"prob-data-cr", set:s.cats[0], fav:fav, total:total});
}, ["Use the data set itself: count the favourable records and count all the records.", "Start by writing the favourable count over the total count, then change the fraction to a percent."]);

E("u10-odds-to-prob-cr", 10, ["7.4","7.3"], 2, "gen", function(){
  var a=ri(2,11), b=ri(2,11), against=ri(0,1);
  if(a===b) b=b+1;
  var prob= against? b/(a+b) : a/(a+b);
  var ans=Math.round(prob*1000)/10;
  var kindTxt= against? "against" : "in favour of";
  var numTxt= against? (b+" favourable parts and "+a+" unfavourable parts") : (a+" favourable parts and "+b+" unfavourable parts");
  return numq("The odds "+kindTxt+" an event are "+a+" : "+b+". Find the probability of the event, expressed as a percent, to one decimal place. Show your work, including how you get the total from the odds.",
    ans, 0.2,
    "Odds compare favourable to unfavourable, while probability compares favourable to the total. The odds give "+numTxt+", for "+(a+b)+" parts in total. \\[ \\begin{aligned} P &= \\frac{"+(against?b:a)+"}{"+(a+b)+"} \\\\ &= "+fmtF(ans,1)+"\\% \\end{aligned} \\] The answer is <b>"+fmtF(ans,1)+"%</b>.",
    {mode:"odds-to-prob-cr", a:a, b:b, against:against});
}, ["Odds compare favourable to unfavourable. Probability compares favourable to the total.", "Start by adding the two parts of the odds to build the total."]);

E("u10-expected-count-cr", 10, ["7.7"], 2, "gen", function(){
  var a=ri(1,6), b=ri(2,9), mult=ri(15,40);
  var total=a+b, N=total*mult, ans=a*mult;
  var ctxs=["A raffle sells "+N+" tickets, and the odds in favour of a ticket winning a small prize are "+a+" : "+b,
            "A carnival game is played "+N+" times at a fair, and the odds in favour of a player winning a small prize are "+a+" : "+b,
            "A quality team expects "+N+" items on a run, and the odds in favour of an item passing a first check are "+a+" : "+b];
  var endings=[". About how many tickets should be expected to win?",
               ". About how many wins should be expected?",
               ". About how many items should be expected to pass?"];
  var ci=ri(0,2);
  return numq(ctxs[ci]+endings[ci]+" Show your work.",
    ans, 0.5,
    "First turn the odds into a probability: favourable parts over the total of both parts. Then multiply by the number of trials for the expected count. \\[ \\begin{aligned} P &= \\frac{"+a+"}{"+a+" + "+b+"} = \\frac{"+a+"}{"+total+"} \\\\ \\text{Expected} &= "+N+" \\times \\frac{"+a+"}{"+total+"} \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {mode:"expected-count-cr", a:a, b:b, N:N});
}, ["Turn the odds into a probability first, using the total of both odds parts.", "Multiply the probability by the number of trials to get the expected count."]);

E("u10-wide-mixed", 10, ["7.1","7.2","7.4","7.7"], 3, "gen", function(){
  var mode=ri(0,5);
  if(mode===0){
    var counts=[ri(4,20),ri(4,20),ri(4,20),ri(4,20)], fav=ri(0,3);
    var total=counts.reduce(function(x,y){return x+y;},0), pct=100*counts[fav]/total, cv=Math.round(pct*10)/10;
    var cats=["red","blue","green","gold"];
    var dists=u10mkPct(cv,[[100-pct,"That is the percent for the other colours combined."],[100*counts[(fav+1)%4]/total,"That uses another colour's count."],[counts[fav],"That is the raw count with a percent sign."]]).map(function(d){return {t:d.t+"%", fb:d.fb};});
    var _bo0=balOpts({t:fmtF(cv,1)+"%", fb:"Yes: the tally for that colour over the total spins, as a percent."}, dists); return mcq("A spinner was spun "+total+" times with these tallies: red "+counts[0]+", blue "+counts[1]+", green "+counts[2]+", gold "+counts[3]+". Based on the data, what is the probability of "+cats[fav]+" as a percent, to one decimal place?", _bo0[0], _bo0[1],
      "Use the data. \\[ \\begin{aligned} P &= \\frac{"+counts[fav]+"}{"+total+"} \\\\ &= "+fmtF(cv,1)+"\\% \\end{aligned} \\] The answer is <b>"+fmtF(cv,1)+"%</b>.", {mode:"wide-data-pct", fav:fav});
  }
  if(mode===1){
    var a=ri(2,11), b=ri(2,11); if(a===b) b+=2;
    var pct2=100*b/(a+b), cv2=Math.round(pct2*10)/10;
    var dists2=u10mkPct(cv2,[[100*a/(a+b),"That treats the first odds number as favourable. Odds against put the unfavourable parts first."],[100*a/b,"That is the odds against written as a percent, not a probability."],[100*b/a,"That flips the odds parts and gives a value that is not this probability."]]).map(function(d){return {t:d.t+"%", fb:d.fb};});
    var _bo1=balOpts({t:fmtF(cv2,1)+"%", fb:"Yes: odds against a : b leave b favourable parts out of a plus b in total."}, dists2); return mcq("The odds against an event are "+a+" : "+b+". What is the probability of the event, as a percent, to one decimal place?", _bo1[0], _bo1[1],
      "Odds against "+a+" : "+b+" mean "+a+" unfavourable parts and "+b+" favourable parts. \\[ \\begin{aligned} P &= \\frac{"+b+"}{"+a+" + "+b+"} \\\\ &= "+fmtF(cv2,1)+"\\% \\end{aligned} \\] The answer is <b>"+fmtF(cv2,1)+"%</b>.", {mode:"wide-odds-against", a:a, b:b});
  }
  if(mode===2){
    var pair=pick(u10PAIRS), f=pair[0], t=pair[1], dec=f/t, pct3=100*f/t;
    var dists3=u10mkNum(dec,[[pct3,"That is the percent value. A decimal probability stays between 0 and 1."],[1-dec,"That is the decimal for the event not happening."],[dec*10,"That shifts the decimal one place too far."]],2).map(function(d){return {t:d.t, fb:d.fb};});
    var _bo2=balOpts({t:fmt(dec), fb:"Yes: divide the numerator by the denominator."}, dists3); return mcq("A probability is given as "+u10fr(f,t)+". Express it as a decimal, to two decimal places where needed.", _bo2[0], _bo2[1],
      "\\[ \\begin{aligned} \\frac{"+f+"}{"+t+"} &= "+fmt(dec)+" \\end{aligned} \\] The answer is <b>"+fmt(dec)+"</b>.", {mode:"wide-express-dec", f:f, t:t});
  }
  if(mode===3){
    var pair3=pick(u10PAIRS), f3=pair3[0], t3=pair3[1], mult3=ri(6,30), N3=t3*mult3, exp3=f3*mult3;
    var dists4=u10mkNum(exp3,[ [(t3-f3)*mult3,"That counts the trials where the event does not happen."],[N3,"That says the event happens every trial. The probability is below 1."],[f3*mult3*2,"That doubles the expected count. Multiply the probability by the number of trials once."]],0).map(function(d){return {t:d.t, fb:d.fb};});
    var _bo3=balOpts({t:String(exp3), fb:"Yes: expected count is the probability times the number of trials."}, dists4); return mcq("An event has probability "+u10fr(f3,t3)+". In "+N3+" trials, about how many times should the event be expected to happen?", _bo3[0], _bo3[1],
      "\\[ \\begin{aligned} \\text{Expected} &= "+N3+" \\times \\frac{"+f3+"}{"+t3+"} \\\\ &= "+exp3+" \\end{aligned} \\] The answer is <b>"+exp3+"</b>.", {mode:"wide-expected", f:f3, t:t3, N:N3});
  }
  if(mode===4){
    var pair4=pick(u10PAIRS), f4=pair4[0], t4=pair4[1], prize=pick([10,15,20,25,30,40,50]);
    var payout=prize*f4/t4;
    var dists5=u10mkNum(payout,[ [prize*(t4-f4)/t4,"That is the expected payout tied to not winning. A win pays the prize."],[prize,"That pays the full prize every game. Winning has a probability below 1."],[prize*f4,"That forgets to divide by the total in the probability."]],2).map(function(d){return {t:"$"+d.t, fb:d.fb};});
    var _bo4=balOpts({t:"$"+fmtF(payout,2), fb:"Yes: expected payout is the prize times the probability of winning."}, dists5); return mcq("A fairground game pays a prize of $"+prize+" when a player wins, and the probability of winning is "+u10fr(f4,t4)+". What is the expected payout per game, in dollars?", _bo4[0], _bo4[1],
      "\\[ \\begin{aligned} \\text{Expected payout} &= "+prize+" \\times \\frac{"+f4+"}{"+t4+"} \\\\ &= "+fmtF(payout,2)+" \\end{aligned} \\] The answer is <b>$"+fmtF(payout,2)+"</b>.", {mode:"wide-payout", f:f4, t:t4, prize:prize});
  }
  var pA=pick(u10PAIRS), pB=pick(u10PAIRS), guard=0;
  while(pA[0]/pA[1]===pB[0]/pB[1] && guard++<40){ pB=pick(u10PAIRS); }
  var aWins=pA[0]/pA[1] > pB[0]/pB[1];
  var correctTxt= aWins? "Game A" : "Game B";
  var dists6=[ aWins? "Game B":"Game A", "They are equal", "Neither can win"].map(function(x){
    return {t:x, fb: x==="They are equal" ? "The two fractions have different values, so the games are not equal." : x==="Neither can win" ? "Both probabilities are above zero, so both games can be won." : "That game's probability is the smaller of the two fractions."};
  });
  var _bo5=balOpts({t:correctTxt, fb:"Yes: comparing the two fractions shows that game has the larger value."}, dists6); return mcq("Game A is won with probability "+u10fr(pA[0],pA[1])+" and Game B is won with probability "+u10fr(pB[0],pB[1])+". Which game gives the greater probability of winning?", _bo5[0], _bo5[1],
    "Write both probabilities as decimals: Game A is "+fmt(pA[0]/pA[1])+" and Game B is "+fmt(pB[0]/pB[1])+". The larger value belongs to "+correctTxt+". The answer is <b>"+correctTxt+"</b>.",
    {mode:"wide-compare", fa:pA[0], ta:pA[1], fb:pB[0], tb:pB[1]});
}, ["Sort out which form each part of the question uses before calculating.", "Convert odds or fractions into a probability first, then answer the question asked."]);

E("u10-compare-offers-cr", 10, ["7.7","7.4"], 3, "gen", function(){
  var a,b,w,t,guard=0,pA,pB;
  do {
    a=ri(1,7); b=ri(2,9); t=pick([20,25,40,50]); w=ri(3,t-3);
    pA=a/(a+b); pB=w/t; guard++;
  } while(guard<60 && Math.abs(pA-pB)<0.04);
  var ans=Math.round(Math.abs(pA-pB)*1000)/10;
  var higher= pA>pB? "Game A" : "Game B";
  return numq("Game A offers odds in favour of winning of "+a+" : "+b+". In trials of Game B, players won "+w+" times in "+t+" plays. Find how many percentage points higher the greater of the two winning probabilities is than the smaller one, to one decimal place. Show your work for both probabilities.",
    ans, 0.3,
    "Turn the odds into a probability, and write the trial results as a probability, then subtract in percent form. \\[ \\begin{aligned} P(A) &= \\frac{"+a+"}{"+a+" + "+b+"} = "+fmtF(pA*100,1)+"\\% \\\\ P(B) &= \\frac{"+w+"}{"+t+"} = "+fmtF(pB*100,1)+"\\% \\\\ \\text{Difference} &= "+fmtF(ans,1)+" \\text{ percentage points} \\end{aligned} \\] "+higher+" is higher. The answer is <b>"+fmtF(ans,1)+" percentage points</b>.",
    {mode:"compare-offers-cr", a:a, b:b, w:w, t:t});
}, ["Each game states its chance in a different form. Convert both to percents first.", "For the odds, add the two parts to get the total before dividing."]);

E("u10-fair-prize-cr", 10, ["7.6","7.7"], 3, "gen", function(){
  var cost=pick([2,3,4,5]), ao=pick([1,1,2]);
  var bb= ao===1? ri(4,14) : 2*ri(3,8);
  var ans=cost*(ao+bb)/ao;
  return numq("A fundraiser game at a school fair charges $"+cost+" per play. The odds in favour of winning are "+ao+" : "+bb+". A game is fair when the expected payout per play equals the price of a play. What prize amount, in dollars, makes this game fair? Show your work.",
    ans, 0.1,
    "Odds in favour of "+ao+" : "+bb+" give a winning probability of \\(\\frac{"+ao+"}{"+(ao+bb)+"}\\). For a fair game, prize times probability equals the price. \\[ \\begin{aligned} \\text{Prize} \\times \\frac{"+ao+"}{"+(ao+bb)+"} &= "+cost+" \\\\ \\text{Prize} &= "+cost+" \\times \\frac{"+(ao+bb)+"}{"+ao+"} \\\\ &= "+ans+" \\end{aligned} \\] The answer is <b>$"+ans+"</b>.",
    {mode:"fair-prize-cr", cost:cost, ao:ao, bb:bb});
}, ["Turn the odds into a probability of winning first.", "Set the expected payout, prize times probability, equal to the ticket price and solve."]);


/* Unit test pool fix addition, November 9, 2026 (additions only).
   Unit 8 (Transformations) was fragile: its five CR entries (3, 4, 5, 4, 5
   marks) form exactly one pair summing to the unit target of 10, the two
   5-mark entries. One new 6-mark Level 3 CR entry pairs with each 4-mark
   entry, giving three workable pairs. Applied model: two-stage authored
   hints on the entry, as every entry in this bank carries. */
E("u8-cr-triple-transform", 8, ["3.23", "3.18"], 3, "gen", function(){
  var templates=[
    [{k:"RX"},{k:"R90"}],
    [{k:"R180"},{k:"T",dx:2,dy:-1}],
    [{k:"RY"},{k:"R270"}],
    [{k:"RXY"},{k:"T",dx:-1,dy:2}],
    [{k:"T",dx:1,dy:3},{k:"RXNY"}]
  ];
  var P=null, steps=null, mids=null, ans=null, guard=0;
  while(guard++<300){
    var px=ri(-4,4), py=ri(-4,4);
    if(px===0&&py===0) continue;
    var f=pick([0.5,2,3]);
    var base=pick(templates), pos=ri(0,2);
    var seq=base.slice(); seq.splice(pos,0,{k:"D",f:f});
    var p0=[px,py], p1=u8T(p0,seq[0]), p2=u8T(p1,seq[1]), p3=u8T(p2,seq[2]);
    var all=[p1,p2,p3];
    if(all.some(function(p){ return Math.abs(p[0])>9||Math.abs(p[1])>9; })) continue;
    P=p0; steps=seq; mids=[p1,p2]; ans=p3; break;
  }
  if(!P){ P=[2,1]; steps=[{k:"RX"},{k:"R90"},{k:"D",f:2}]; mids=[u8T(P,steps[0]),u8T(u8T(P,steps[0]),steps[1])]; ans=u8T(mids[1],steps[2]); }
  var askX=ri(0,1)===1, ansC=askX?ans[0]:ans[1];
  var q=numq("Point \\(P"+u8cp(P)+"\\) is transformed in three steps: first "+u8desc(steps[0])+", then "+u8desc(steps[1])+", then "+u8desc(steps[2])+". Find the "+(askX?"x":"y")+"-coordinate of the final image point. Show your work, including the coordinates after each step.",
    ansC, 0.1,
    "Apply the transformations in order, using the rules \\( "+u8rule(steps[0])+" \\), then \\( "+u8rule(steps[1])+" \\), then \\( "+u8rule(steps[2])+" \\).\n\\[ \\begin{aligned} P"+u8cp(P)+" &\\to "+u8cp(mids[0])+" \\\\ &\\to "+u8cp(mids[1])+" \\\\ &\\to "+u8cp(ans)+" \\end{aligned} \\]\nThe "+(askX?"x":"y")+"-coordinate of the final image is <b>"+fmt(ansC)+"</b>.",
    {ask:askX?"x":"y"});
  q.figure=u8grid([{pts:[P], labs:["P"]}], 6);
  return q;
}, ["The order matters: work through the three transformations one at a time, writing down the coordinates after each step.", "Start with the first transformation only, and record the new point before applying the second."]);

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-cr-assembly-tolerance":5,"u1-cr-classify-words":4,"u1-cr-mixed-tolerance":5,"u1-cr-tolerance-limits":4,"u1-cr-uncertainty-interval":3,"u10-compare-offers-cr":4,"u10-expected-count-cr":5,"u10-fair-prize-cr":5,"u10-odds-to-prob-cr":4,"u10-prob-data-cr":3,"u2-cr-budget-solve":5,"u2-cr-slope-rate":4,"u2-cr-solve-input":5,"u2-cr-table-value":3,"u2-cr-write-equation":4,"u3-extrapolate-cr":4,"u3-graph-reading-cr":5,"u3-interpolate-cr":3,"u3-predict-advanced-cr":4,"u3-scale-design-cr":5,"u4-mean-context-cr":3,"u4-outlier-effect-cr":4,"u4-trimmed-outlier-cr":5,"u4-weighted-advanced-cr":5,"u4-weighted-mean-cr":4,"u5-home-cash-cr":5,"u5-lease-total-cr":3,"u5-operating-cost-cr":4,"u5-rent-own-province-cr":5,"u5-rental-term-cr":4,"u6-breakeven-cr":5,"u6-profit-cr":3,"u6-target-profit-cr":5,"u6-tax-return-cr":4,"u6-tax-return-exam-cr":4,"u7-cr-kite-frame":4,"u7-cr-symmetry-tile":5,"u7-cr-third-side-max":4,"u7-cr-tri-exterior":3,"u7-cr-tri-perimeter":5,"u8-cr-blueprint":5,"u8-cr-combined":4,"u8-cr-design-coords":4,"u8-cr-dilation-vertex":3,"u8-cr-similar-sides":5,"u8-cr-triple-transform":6,"u9-cosine-angle-cr":4,"u9-mixed-choose-cr":5,"u9-sine-side-cr":3,"u9-survey-application-cr":5,"u9-two-step-cr":4};
