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

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 13 (probability). Borrowed verbatim from Mathematics 7 (u7-prob-basic, u7-two-events-prob) and Mathematics 9 (u9-gap-expected-freq-cr, u9-prob-in-media, u9-combined-decision, u9-classify-probability); feeder helper copies ride in bank-helpers.js. Odds is first taught inside this course (indicators 7.3, 7.4, 7.7) and appears nowhere in this pool. ===== */
E("u10-pk-prob-basic", 10, ["7.1"],1,"gen",function(){
  var mode=pick(["bag","bag","die","spinner","zero"]);
  if(mode==="zero"){
    var cols=["red","blue","green"];var counts=[ri(2,5),ri(2,5),ri(2,5)];var total=counts[0]+counts[1]+counts[2];
    var absent=pick(["purple","orange","yellow"]);
    var ds=[{t:"1/"+total,fb:"There are no "+absent+" marbles in the bag, so this event cannot happen."},{t:"0/"+counts[0],fb:"A probability of 0 is written as 0. No "+absent+" marbles means the event is impossible."},{t:"1",fb:"A probability of 1 means the event is certain. Drawing "+absent+" is impossible here, not certain."}];
    return mcq("A bag holds "+counts[0]+" red, "+counts[1]+" blue and "+counts[2]+" green marbles. One marble is drawn at random. What is the probability of drawing a "+absent+" marble?",
      {t:"0",fb:"Yes: there are no "+absent+" marbles, so the probability is 0."},ds,
      "There are 0 "+absent+" marbles out of "+total+" in total. \\(P = "+FR(0,total)+" = 0\\). The probability is <b>0</b>.",{mode:"zero"});
  }
  if(mode==="die"){
    var target=pick(["an even number","an odd number","a number greater than 4","a number less than 3","a 6","a number greater than 2"]);
    var fav={"an even number":3,"an odd number":3,"a number greater than 4":2,"a number less than 3":2,"a 6":1,"a number greater than 2":4}[target];
    var cs=u7fracStr(fav,6);
    var alts=[u7fracStr(6-fav,6),fav+"/6",u7fracStr(fav+1,6),u7fracStr(fav,6-fav+6)];
    var seen={};seen[cs]=1;var ds=[];
    alts.forEach(function(a){if(!seen[a]){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Count the favourable faces first, then write favourable over 6 and simplify."});}});
    var extra=2;while(ds.length<3){var a=u7fracStr(extra,6);if(!seen[a]){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Count the favourable faces first, then write favourable over 6 and simplify."});}extra++;}
    return mcq("A fair six-sided die is rolled once. What is the probability of rolling "+target+"?",
      {t:"\\("+cs+"\\)",fb:"Yes: "+fav+" of the 6 faces match, and "+fav+"/6 simplifies to "+cs+"."},ds.slice(0,3),
      "There are "+fav+" favourable faces out of 6. \\(P = "+FR(fav,6)+" = "+cs+"\\). The probability is <b>\\("+cs+"\\)</b>.",{mode:"die"});
  }
  if(mode==="spinner"){
    var secs=pick([4,6,8]);var favSecs=ri(1,secs-1);var cs2=u7fracStr(favSecs,secs);
    var seen2={};seen2[cs2]=1;var ds2=[];
    [u7fracStr(secs-favSecs,secs),favSecs+"/"+secs,u7fracStr(favSecs+1,secs),u7fracStr(1,secs)].forEach(function(a){if(!seen2[a]&&ds2.length<3){seen2[a]=1;ds2.push({t:"\\("+a+"\\)",fb:"Use the number of matching sections over the total number of equal sections, then simplify."});}});
    var e2=2;while(ds2.length<3){var a2=u7fracStr(e2,secs);if(!seen2[a2]){seen2[a2]=1;ds2.push({t:"\\("+a2+"\\)",fb:"Use matching sections over total sections, then simplify."});}e2++;}
    return mcq("A spinner has "+secs+" equal sections. Exactly "+favSecs+" of the sections are shaded. What is the probability of landing on a shaded section?",
      {t:"\\("+cs2+"\\)",fb:"Yes: "+favSecs+" of "+secs+" sections are shaded, which simplifies to "+cs2+"."},ds2.slice(0,3),
      "Favourable sections: "+favSecs+". Total sections: "+secs+". \\(P = "+FR(favSecs,secs)+" = "+cs2+"\\). The probability is <b>\\("+cs2+"\\)</b>.",{mode:"spinner"});
  }
  var r=ri(1,6),b=ri(1,6),g=ri(0,5);var total2=r+b+g;var colPick=pick(["red","blue"]);var fav2=colPick==="red"?r:b;
  var cs3=u7fracStr(fav2,total2);var seen3={};seen3[cs3]=1;var ds3=[];
  [u7fracStr(total2-fav2,total2),fav2+"/"+total2,u7fracStr(fav2,total2-fav2),u7fracStr(fav2+1,total2)].forEach(function(a){if(!seen3[a]&&ds3.length<3){seen3[a]=1;ds3.push({t:"\\("+a+"\\)",fb:"The numerator counts only the "+colPick+" marbles, and the denominator is the total number of marbles. Simplify at the end."});}});
  var e3=1;while(ds3.length<3){var a3=u7fracStr(e3,total2+3);if(!seen3[a3]){seen3[a3]=1;ds3.push({t:"\\("+a3+"\\)",fb:"Count the "+colPick+" marbles over the total, then simplify."});}e3++;}
  return mcq("A bag holds "+r+" red, "+b+" blue"+(g?" and "+g+" green":"")+" marbles. One marble is drawn at random. What is the probability of drawing a "+colPick+" marble?",
    {t:"\\("+cs3+"\\)",fb:"Yes: "+fav2+" of the "+total2+" marbles are "+colPick+", which simplifies to "+cs3+"."},ds3.slice(0,3),
    "Favourable outcomes: "+fav2+". Total outcomes: "+total2+". \\(P = "+FR(fav2,total2)+" = "+cs3+"\\). The probability is <b>\\("+cs3+"\\)</b>.",{mode:"bag"});
},["Probability is favourable outcomes divided by total possible outcomes.","Start by counting the favourable outcomes and the total number of outcomes, then simplify the fraction."]);

E("u10-pk-two-events", 10, ["7.2"],2,"gen",function(){
  var fam=pick(["twocoin","coindie","coindie","spincoin","spindie","twospin","dicesum"]);
  var fav,total,desc,target;
  if(fam==="twocoin"){var tg=pick([["two heads",1],["two tails",1],["exactly one head",2],["at least one head",3],["exactly one tail",2]]);fav=tg[1];total=4;desc="two coins are tossed";target=tg[0];}
  else if(fam==="coindie"){var tg2=pick([["heads and an even number",3],["tails and an odd number",3],["heads and a number greater than 4",2],["heads and a number less than 3",2],["tails and a 6",1],["heads and a 1",1],["heads and a prime number",3]]);fav=tg2[1];total=12;desc="a coin is tossed and a die is rolled";target=tg2[0];}
  else if(fam==="spincoin"){var s1=pick([3,4,6,8]);var k=ri(1,s1);var face=pick(["heads","tails"]);fav=1;total=2*s1;desc="a "+s1+"-section spinner is spun and a coin is tossed";target="section "+k+" and "+face;}
  else if(fam==="spindie"){var s2=pick([3,4,5,6]);var k2=ri(1,s2);var j=ri(1,6);fav=1;total=6*s2;desc="a "+s2+"-section spinner is spun and a die is rolled";target="section "+k2+" and a "+j;}
  else if(fam==="twospin"){var s3=pick([3,4,5,6]);var k3=ri(1,s3);var k4=ri(1,s3);fav=1;total=s3*s3;desc="a "+s3+"-section spinner is spun twice";target="section "+k3+" then section "+k4;}
  else {var t=ri(2,9);fav=t<=7?t-1:13-t;total=36;desc="two dice are rolled";target="a total of "+t;}
  var opener=pick(["When ","At a games table, when ","In a class game, when ","During a board game, when "]);
  var cs=u7fracStr(fav,total);
  var seen={};seen[cs]=1;var ds=[];
  [u7fracStr(total-fav,total),fav+"/"+total,u7fracStr(fav+1,total),u7fracStr(fav,total+6)].forEach(function(a){if(!seen[a]&&ds.length<3){seen[a]=1;ds.push({t:"\\("+a+"\\)",fb:"Count the matching combined outcomes over the full sample space, then simplify."});}});
  var e=3;while(ds.length<3){var a2=u7fracStr(e,total);if(!seen[a2]){seen[a2]=1;ds.push({t:"\\("+a2+"\\)",fb:"Count the matching combined outcomes over the full sample space, then simplify."});}e++;}
  return mcq(opener+desc+", what is the theoretical probability of getting "+target+"?",
    {t:"\\("+cs+"\\)",fb:"Yes: "+fav+" of the "+total+" combined outcomes match, which simplifies to "+cs+"."},ds,
    "The sample space has "+total+" equally likely outcomes and "+fav+" match the target. \\(P = "+FR(fav,total)+" = "+cs+"\\). The probability is <b>\\("+cs+"\\)</b>.",{mode:"two",fam:fam});
},["Build the combined sample space first, then count the matching outcomes.","Start by multiplying the outcome counts of the two events to get the sample space size."]);

E("u10-pk-expected-freq", 10, ["7.1"], 2, "gen", function () {
  var b = pick([4, 5, 6, 8, 10]);
  var a = ri(1, b - 1);
  var mult = ri(12, 30);
  var N = b * mult, ans = a * mult;
  var prompt = "A spinner is divided into " + b + " equal sectors, and " + a + " of the sectors are red. The spinner is spun " + N + " times. How many of the spins are expected to land on red?";
  var sol = "The probability of red gives the expected share of the spins: \\[ \\begin{aligned} P(\\text{red}) &= \\frac{" + a + "}{" + b + "} \\\\ \\text{expected red} &= \\frac{" + a + "}{" + b + "} \\times " + N + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-expected-freq", a: a, b: b, N: N });
}, ["An expected count is the probability applied to the whole set of trials.", "Write the probability of red as a fraction as the first step."]);

E("u10-pk-prob-in-media", 10, ["7.5"], 1, "var", varset([
  function(){
    return mcq("Four short items appear in a school newsletter. Which item uses probability?",
      {t:"There is a 70% chance of snow for the outdoor skating party on Friday", fb:"Right: a percent chance states how likely the snow is, which is probability in use."},
      [{t:"The skating party will start at noon on Friday in the school gym lobby", fb:"That item gives a time and a place, with no statement about how likely anything is."},
       {t:"Last winter the school held three skating parties for students and staff", fb:"That item reports a count from the past, with no statement about chance."},
       {t:"Students voted skating as their favourite winter activity this school year", fb:"That item reports a vote result, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 70% chance of snow for the skating party</b>.",
      {mode:"media-weather"});
  },
  function(){
    return mcq("Four short items appear on a sports page. Which item uses probability?",
      {t:"Forecasters give the home team a 3 in 5 chance of winning on Saturday", fb:"Right: a 3 in 5 chance states how likely a win is, which is probability in use."},
      [{t:"The home team scored two late goals to win the game on Saturday", fb:"That item reports what already happened, with no statement about chance."},
       {t:"Tickets for the game on Saturday cost eight dollars at the door", fb:"That item gives a price, with no statement about how likely anything is."},
       {t:"The team will practise on Tuesday and Thursday evenings this week", fb:"That item gives a schedule, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 3 in 5 chance of winning on Saturday</b>.",
      {mode:"media-sports"});
  },
  function(){
    return mcq("Four short items appear on a clinic poster board. Which item uses probability?",
      {t:"A health poster says about 1 in 4 teens will catch a cold this winter", fb:"Right: 1 in 4 states how likely catching a cold is, which is probability in use."},
      [{t:"The clinic is open on weekdays from nine in the morning until five", fb:"That item gives opening hours, with no statement about how likely anything is."},
       {t:"Washing hands with soap helps remove germs picked up during the day", fb:"That item gives health advice, with no statement about chance."},
       {t:"Two nurses and one doctor work at the clinic on most weekdays in town", fb:"That item reports a staffing count, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>about 1 in 4 teens catching a cold this winter</b>.",
      {mode:"media-health"});
  },
  function(){
    return mcq("Four short items appear in a student council report. Which item uses probability?",
      {t:"A poll gives one candidate a 55% chance of winning the council vote", fb:"Right: a 55% chance states how likely a win is, which is probability in use."},
      [{t:"Voting for student council will take place in the gym at lunch time", fb:"That item gives a place and a time, with no statement about chance."},
       {t:"Three candidates are running for president of the student council", fb:"That item gives a count of candidates, with no statement about how likely anything is."},
       {t:"Last year the council raised money with a bake sale in the fall", fb:"That item reports a past event, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 55% chance of winning the council vote</b>.",
      {mode:"media-election"});
  },
  function(){
    return mcq("Four short items appear on signs at a school fair. Which item uses probability?",
      {t:"A game sign says players have a 1 in 6 chance of winning a prize", fb:"Right: a 1 in 6 chance states how likely a win is, which is probability in use."},
      [{t:"The ring toss game costs two dollars for three tries at the fair", fb:"That sign gives a price, with no statement about how likely anything is."},
       {t:"Prizes for the games are kept on the top shelf of the booth", fb:"That sign gives a location, with no statement about chance."},
       {t:"The school fair opens at six in the evening and closes at nine", fb:"That sign gives opening hours, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 1 in 6 chance of winning a prize</b>.",
      {mode:"media-fair"});
  },
  function(){
    return mcq("Four short items appear in a community radio report. Which item uses probability?",
      {t:"The report says there is a 40% chance of rain for the festival weekend", fb:"Right: a 40% chance states how likely rain is, which is probability in use."},
      [{t:"The harbour festival will run from Friday evening until Sunday night", fb:"That item gives dates, with no statement about how likely anything is."},
       {t:"Last summer forty boats took part in the harbour festival boat parade", fb:"That item reports a count from the past, with no statement about chance."},
       {t:"Festival tickets can be bought at the town office during the week", fb:"That item tells where to buy tickets, with no statement about how likely an event is."}],
      "Probability is used when a statement gives how likely an event is. The item that uses probability is <b>the 40% chance of rain for the festival weekend</b>.",
      {mode:"media-festival"});
  }
]), ["Probability shows up as a chance, an odds statement or a percent chance that something will happen.", "Scan the four items for words like chance, in 4, or percent, tied to a future event."]);

E("u10-pk-combined-decision", 10, ["7.5"], 1, "var", varset([
  function(){
    return mcq("A coach must choose a shooter for a final free throw. The chance from the chart counts equally likely outcomes, practice trials show the shooter made 18 of 20 shots this week, and the coach feels this player stays calm under pressure. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The chart gives theoretical probability, the practice record gives experimental probability, and the calm feeling is subjective judgement", fb:"Right: equal outcomes are theoretical, trial results are experimental, and a feeling is subjective."},
      [{t:"The chart gives experimental probability, the practice record gives theoretical probability, and the calm feeling is subjective judgement", fb:"The chart counts set outcomes, which is theoretical, while counted practice shots are experimental."},
       {t:"The chart gives theoretical probability, the practice record gives subjective judgement, and the calm feeling is experimental probability", fb:"Counted practice shots are data from trials, and a feeling is a judgement, so those two are swapped."},
       {t:"The chart gives subjective judgement, the practice record gives experimental probability, and the calm feeling is theoretical probability", fb:"A chart of equal outcomes is not a feeling, and a feeling is not a count of equal outcomes."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from trials, and subjective judgement from personal feel. Here the correct description is <b>the chart is theoretical, the practice record is experimental, and the calm feeling is subjective judgement</b>.",
      {mode:"combine-coach"});
  },
  function(){
    return mcq("A board game player decides whether to risk a move. The die gives six equally likely faces, the player remembers rolling many low numbers in past games, and the player feels a high roll is due this turn. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The die faces give theoretical probability, past rolls give experimental probability, and the due feeling is subjective judgement", fb:"Right: equal faces are theoretical, remembered results are experimental, and a due feeling is subjective."},
      [{t:"The die faces give subjective judgement, past rolls give theoretical probability, and the due feeling is experimental probability", fb:"Equal faces are counted, not felt, and remembered rolls are trial results rather than theory."},
       {t:"The die faces give theoretical probability, past rolls give subjective judgement, and the due feeling is experimental probability", fb:"Remembered rolls are records of trials, and a feeling of being due is a judgement, so those are swapped."},
       {t:"The die faces give experimental probability, past rolls give subjective judgement, and the due feeling is theoretical probability", fb:"No part is matched correctly here: faces are counted, rolls are trials, and feelings are judgements."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from past trials, and subjective judgement from personal feel. Here the correct description is <b>the die faces are theoretical, past rolls are experimental, and the due feeling is subjective judgement</b>.",
      {mode:"combine-boardgame"});
  },
  function(){
    return mcq("A farmer in the valley decides when to plant. A forecast model gives a 60% chance of rain this week, her own fields gave good crops in 4 of the last 5 wet springs, and she judges her soil feels ready when she checks it by hand. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The forecast model gives theoretical probability, her field records give experimental probability, and her soil feel is subjective judgement", fb:"Right: a model estimate is theoretical, her recorded springs are experimental, and hand feel is subjective."},
      [{t:"The forecast model gives experimental probability, her field records give subjective judgement, and her soil feel is theoretical probability", fb:"Her own past springs are trial records, not feelings, and a hand check is a judgement, not a model."},
       {t:"The forecast model gives subjective judgement, her field records give experimental probability, and her soil feel is theoretical probability", fb:"The forecast comes from a model rather than a feeling, and the soil check is the personal judgement."},
       {t:"The forecast model gives theoretical probability, her field records give subjective judgement, and her soil feel is experimental probability", fb:"Field records over five springs are data from trials, while the soil feel is the judgement part."}],
      "Decisions often combine all three kinds: theoretical probability from a model, experimental probability from recorded trials, and subjective judgement from personal feel. Here the correct description is <b>the forecast is theoretical, the field records are experimental, and the soil feel is subjective judgement</b>.",
      {mode:"combine-farmer"});
  },
  function(){
    return mcq("A fishing captain decides whether to head out at dawn. A forecast model gives a 30% chance of high winds, his logbook shows rough seas on 2 of his last 10 dawn trips, and he judges the sky looks settled when he studies it at the wharf. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The forecast model gives theoretical probability, the logbook gives experimental probability, and the sky judgement is subjective judgement", fb:"Right: the model is theoretical, the logged trips are experimental, and reading the sky is subjective."},
      [{t:"The forecast model gives subjective judgement, the logbook gives theoretical probability, and the sky judgement is experimental probability", fb:"A logbook is a record of trials, not theory, and reading the sky is a judgement, not a trial."},
       {t:"The forecast model gives theoretical probability, the logbook gives subjective judgement, and the sky judgement is experimental probability", fb:"Logged past trips are data from trials, and a personal reading of the sky is the judgement part."},
       {t:"The forecast model gives experimental probability, the logbook gives subjective judgement, and the sky judgement is theoretical probability", fb:"The model estimate is not trial data, and neither the logbook nor the sky reading is a theory count."}],
      "Decisions often combine all three kinds: theoretical probability from a model, experimental probability from recorded trials, and subjective judgement from personal feel. Here the correct description is <b>the forecast is theoretical, the logbook is experimental, and the sky judgement is subjective judgement</b>.",
      {mode:"combine-captain"});
  },
  function(){
    return mcq("A student chooses which carnival game to play. One game wins on 2 of 8 equally likely spinner sections, the student watched 30 plays at another game and saw 6 wins, and the student feels the third game is the luckiest of the row. Which option describes how the three kinds of probability combine in this decision?",
      {t:"The spinner count gives theoretical probability, the watched plays give experimental probability, and the lucky feeling is subjective judgement", fb:"Right: equal sections are theoretical, watched plays are experimental, and a lucky feeling is subjective."},
      [{t:"The spinner count gives experimental probability, the watched plays give subjective judgement, and the lucky feeling is theoretical probability", fb:"Counting equal sections is theory, watched plays are trial data, and luck is a feeling, so all three shift."},
       {t:"The spinner count gives subjective judgement, the watched plays give experimental probability, and the lucky feeling is theoretical probability", fb:"A count of equal sections is not a feeling, and a lucky feeling is not a count of outcomes."},
       {t:"The spinner count gives theoretical probability, the watched plays give subjective judgement, and the lucky feeling is experimental probability", fb:"Watched plays supply real trial results, and the lucky feeling is the judgement, so those two are swapped."}],
      "Decisions often combine all three kinds: theoretical probability from equally likely outcomes, experimental probability from observed trials, and subjective judgement from personal feel. Here the correct description is <b>the spinner count is theoretical, the watched plays are experimental, and the lucky feeling is subjective judgement</b>.",
      {mode:"combine-carnival"});
  }
]), ["Sort the decision into three parts: counted equal outcomes, results from trials, and a personal feeling.", "Match each detail in order: equal outcomes first, trial results second, feelings last."]);

E("u10-pk-classify-probability", 10, ["7.6"], 1, "var", varset([
  function(){
    return mcq("Maya flipped a coin 50 times and it landed on heads 28 times. She says her chance of heads is 28 out of 50. Which option classifies this judgement correctly?",
      {t:"Experimental probability, because it is based on results from trials that were carried out", fb:"Right: the value comes from counting what happened in 50 real trials."},
      [{t:"Theoretical probability, because it is based on results from trials that were carried out", fb:"The reason names trials, which is experimental; theoretical counts equally likely outcomes instead."},
       {t:"Subjective judgement, because it is based on results from trials that were carried out", fb:"The reason names counted trial results, which is data, while subjective judgement rests on a feeling."},
       {t:"Theoretical probability, because it is based on counting the equally likely sides of a coin", fb:"Maya used her flip results, not the two equal sides, so this reason describes a different judgement."}],
      "A probability built from the results of trials that were carried out is experimental probability. The correct classification is <b>experimental probability, because it is based on results from trials</b>.",
      {mode:"classify-flips"});
  },
  function(){
    return mcq("Liam counts the cards in a full deck and says his chance of drawing a heart is 13 out of 52, or \\(\\frac{1}{4}\\). Which option classifies this judgement correctly?",
      {t:"Theoretical probability, because it is based on counting the equally likely cards in a deck", fb:"Right: the value comes from counting outcomes in a full deck where each card is equally likely."},
      [{t:"Experimental probability, because it is based on counting the equally likely cards in a deck", fb:"The reason names counting equal outcomes, which is theoretical; experimental needs trial results."},
       {t:"Subjective judgement, because it is based on counting the equally likely cards in a deck", fb:"The reason names a count of outcomes, which is worked out, while subjective judgement rests on a feeling."},
       {t:"Experimental probability, because it is based on results from cards drawn in earlier games", fb:"Liam counted the deck itself and drew no cards, so no earlier game results are involved here."}],
      "A probability built by counting equally likely outcomes is theoretical probability. The correct classification is <b>theoretical probability, because it is based on counting the equally likely cards</b>.",
      {mode:"classify-deck"});
  },
  function(){
    return mcq("A teacher looks at a new class list and says she feels about two thirds of the class will enjoy the outdoor lesson, before meeting any of the students. Which option classifies this judgement correctly?",
      {t:"Subjective judgement, because it is based on a personal feeling with no counts or trials", fb:"Right: with no outcomes counted and no trials run, the estimate rests on personal feeling alone."},
      [{t:"Theoretical probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no counts, which is subjective; theoretical needs counted equal outcomes."},
       {t:"Experimental probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no trials, which is subjective; experimental needs results from trials."},
       {t:"Theoretical probability, because it is based on counting the equally likely names on the list", fb:"The teacher counted nothing on the list; she gave a feeling before meeting the class at all."}],
      "A probability that rests on a personal feeling, with no counts and no trials, is subjective judgement. The correct classification is <b>subjective judgement, because it is based on a personal feeling</b>.",
      {mode:"classify-teacher-feel"});
  },
  function(){
    return mcq("A spinner has 8 equal sections and 2 of them are red. Noah says the chance of landing on red is \\(\\frac{2}{8}\\), or \\(\\frac{1}{4}\\). Which option classifies this judgement correctly?",
      {t:"Theoretical probability, because it is based on counting the equally likely sections of a spinner", fb:"Right: the value comes from counting red sections out of equal sections, with no spins needed."},
      [{t:"Experimental probability, because it is based on counting the equally likely sections of a spinner", fb:"The reason names counting equal sections, which is theoretical; experimental needs results from spins."},
       {t:"Subjective judgement, because it is based on counting the equally likely sections of a spinner", fb:"The reason names a count of sections, which is worked out, while subjective judgement rests on a feeling."},
       {t:"Experimental probability, because it is based on results from spins the student did earlier", fb:"Noah counted the sections and did no spins, so no earlier spin results are involved here."}],
      "A probability built by counting equally likely outcomes is theoretical probability: \\(\\frac{2}{8} = \\frac{1}{4}\\). The correct classification is <b>theoretical probability, because it is based on counting the equally likely sections</b>.",
      {mode:"classify-spinner"});
  },
  function(){
    return mcq("Sofia took 20 practice shots at a basket and scored on 11 of them. She says her chance of scoring on the next shot is 11 out of 20. Which option classifies this judgement correctly?",
      {t:"Experimental probability, because it is based on results from trials that were carried out", fb:"Right: the value comes from counting scores in 20 real practice trials."},
      [{t:"Theoretical probability, because it is based on results from trials that were carried out", fb:"The reason names trials, which is experimental; theoretical counts equally likely outcomes instead."},
       {t:"Subjective judgement, because it is based on results from trials that were carried out", fb:"The reason names counted trial results, which is data, while subjective judgement rests on a feeling."},
       {t:"Subjective judgement, because it is based on how confident the player feels at practice", fb:"Sofia used her counted scores, not her confidence, so this reason describes a different judgement."}],
      "A probability built from the results of trials that were carried out is experimental probability. The correct classification is <b>experimental probability, because it is based on results from trials</b>.",
      {mode:"classify-shots"});
  },
  function(){
    return mcq("An old sailor in the community looks at the evening sky and says he feels there is a good chance of a storm tomorrow, without checking any forecast or records. Which option classifies this judgement correctly?",
      {t:"Subjective judgement, because it is based on a personal feeling with no counts or trials", fb:"Right: with no forecast counted and no records checked, the estimate rests on personal feeling."},
      [{t:"Theoretical probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no counts, which is subjective; theoretical needs counted equal outcomes."},
       {t:"Experimental probability, because it is based on a personal feeling with no counts or trials", fb:"The reason names a feeling with no trials, which is subjective; experimental needs results from trials."},
       {t:"Experimental probability, because it is based on weather records the sailor kept for years", fb:"The sailor checked no records for this call; he gave a feeling from looking at the sky."}],
      "A probability that rests on a personal feeling, with no counts and no trials, is subjective judgement. The correct classification is <b>subjective judgement, because it is based on a personal feeling</b>.",
      {mode:"classify-sailor"});
  }
]), ["Ask where the number came from: counted equal outcomes, results of trials, or a personal feeling.", "Check the story for trials that were actually carried out; their presence points to experimental probability."]);

/* PK tranche metadata pass for Unit 10. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U10_FOR=["7.1","7.2","7.3","7.4","7.5","7.6","7.7"];
var PKT_U10={
 "u10-pk-prob-basic":{src:"math-7:12.1",group:"probability-forms"},
 "u10-pk-two-events":{src:"math-7:12.1",group:"probability-forms"},
 "u10-pk-expected-freq":{src:"math-9:12.4",group:"probability-forms"},
 "u10-pk-prob-in-media":{src:"math-9:12.1",group:"probability-decisions"},
 "u10-pk-combined-decision":{src:"math-9:12.4",group:"probability-decisions"},
 "u10-pk-classify-probability":{src:"math-9:12.4",group:"probability-decisions"}
};
BANK.forEach(function(e){var t=PKT_U10[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U10_FOR.slice();e.pkGroup=t.group;}});
