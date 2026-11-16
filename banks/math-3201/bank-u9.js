// Math 3201 Unit 9 Probability question bank
// CRMARKS: u9-compare-games=3
// CRMARKS: u9-complementary=1
// CRMARKS: u9-conditional=2
// CRMARKS: u9-context-prob=1
// CRMARKS: u9-convert-odds-prob=1
// CRMARKS: u9-create-problem=2
// CRMARKS: u9-create-solve-game=3
// CRMARKS: u9-independent-pair-cr=2
// CRMARKS: u9-independent-prob=1
// CRMARKS: u9-me-or-not=2
// CRMARKS: u9-me-prob=1
// CRMARKS: u9-nonme-prob=2
// CRMARKS: u9-prob-basics=1
// CRMARKS: u9-prob-comb-context=3
// CRMARKS: u9-prob-odds-determine=1
// CRMARKS: u9-prob-perm-context=3
// CRMARKS: u9-represent-events=2
// CRMARKS: u9-same-colour-cr=3
/* ================= Unit 9: Probability ================= */
function ratioStr(a,b){var g=gcd2(a,b);return (a/g)+" : "+(b/g);}
function pick3Frac(corr,pool){
  var cv=corr[0]/corr[1],seen={},out=[],all=shuffle(pool.slice()),i,p,key;
  function valEq(q){return Math.abs(q[0]/q[1]-cv)<1e-12;}
  for(i=0;i<all.length&&out.length<3;i++){p=all[i];if(valEq(p))continue;key=frN(p[0],p[1]);if(seen[key])continue;seen[key]=1;out.push(MV(key));}
  var pads=[[1,7],[2,9],[3,11],[4,13],[5,16],[1,9]];
  for(i=0;i<pads.length&&out.length<3;i++){p=pads[i];if(valEq(p))continue;key=frN(p[0],p[1]);if(seen[key])continue;seen[key]=1;out.push(MV(key));}
  return out;
}

/* --- probability and odds in the world (9.1, 9.2) --- */
E("u9-media-statements",9,["9.1"],1,"var",varset([
  function(){return mcq("A weather page reports: \"Chance of rain tomorrow: 30%.\" In the language of this unit, that statement is",
    "a probability: in about 30 of 100 similar situations, it rains",
    ["odds of 30 to 1 in favour of rain, as bookmakers quote them","a guarantee that it will rain for 30% of the day and stay dry otherwise","a subjective judgement with no data behind it, a forecaster's guess"],
    "Percent chances in weather, medicine and sports reporting are probabilities: a part-to-whole comparison. A 30% chance means the event is expected in roughly 30 out of 100 similar cases, not that it is guaranteed for part of the day.",{});},
  function(){return mcq("A sports page lists a team at \"5 : 2 odds against\" winning. The correct reading of this is",
    "in 7 similar games, the team would be expected to lose about 5 and win about 2",
    ["the team is expected to win about 5 of every 7 games it plays in the season","the probability that the team wins is 5/7, read straight from the odds as a fraction","the team will definitely lose its next game, because the odds quoted are against it"],
    "Odds against compare losing outcomes to winning outcomes (part to part): 5 losses for every 2 wins, out of 7 similar games. The probability of winning is the part-to-whole version, 2/7. Media odds are easy to misread precisely because the two parts are not a whole.",{});},
  function(){return mcq("A medicine leaflet says a side effect occurs in \"about 1 in 1000\" patients. Expressed as a probability, that is",
    MV(frN(1,1000)),
    [MV(frN(1,100)),MV(frN(1000,1)),MV(frN(999,1000))],
    "\"1 in 1000\" is a part-to-whole statement: 1 patient out of every 1000, a probability of \\("+frN(1,1000)+" = 0.001\\). The last option is the probability of NOT getting the side effect.",{});}
]));
E("u9-odds-vs-prob",9,["9.2"],1,"var",varset([
  function(){return mcq("The odds in favour of an event are 3 : 2. Which statement about the event is true?",
    "Its probability is 3/5, because the 3 favourable outcomes are part of 5 outcomes in total",
    ["Its probability is 3/2, because odds and probability are the same thing in every situation","Its probability is 2/5, because the second number is the favourable one in the odds ratio","Its probability is 3/2, because there are 3 favourable outcomes and 2 unfavourable ones"],
    "Odds are part to part (favourable : unfavourable) while probability is part to whole (favourable : total). With odds 3 : 2 there are 3 + 2 = 5 equally likely outcomes, 3 of them favourable, so the probability is 3/5. A probability can never exceed 1, which rules out 3/2 at a glance.",{});},
  function(){return mcq("An event has probability 1/2. Its odds in favour are",
    "1 : 1, because favourable and unfavourable outcomes are equally numerous",
    ["1 : 2, matching the numerator and denominator of the fraction as written","2 : 1, because the whole is named first and the favourable part is named second","It is impossible to give odds for a probability of 1/2 in a simple ratio"],
    "A probability of 1/2 means half of all outcomes are favourable and half are not, so the part-to-part comparison is 1 : 1 (even odds). Reading the fraction 1/2 directly as odds of 1 : 2 is the classic confusion between part-whole and part-part.",{});},
  function(){return mcq("Why do bookmakers and games usually quote <b>odds</b> while scientists usually quote <b>probabilities</b>?",
    "Odds compare wins directly with losses, which suits payouts; probability compares an event with everything that could happen, which suits analysis",
    ["Odds and probability are different names for exactly the same number, so either word can be used in place of the other without any change in meaning","Probabilities can only be used with dice and cards, because those are the only random experiments whose outcomes can be counted in advance","Odds are always larger than probabilities, because an odds ratio compares two counts directly instead of comparing one count with a total"],
    "Both describe the same uncertainty from different angles: odds (part to part) make payout ratios easy to see, while probability (part to whole) fits into calculations and comparisons. Converting between them needs the total: odds a : b correspond to probability a/(a + b).",{});}
]));
/* --- determining probability and odds (9.3, 9.4) --- */
/* --- determining probability and odds (9.3, 9.4) --- */
E("u9-prob-basics",9,["9.3"],1,"gen",function(){
  var ctx=pick([
    {thing:"sections of a spinner",g1:"red",g2:"blue",g3:"green",lead:"A spinner is divided into equal sections:"},
    {thing:"marbles in a bag",g1:"red",g2:"blue",g3:"green",lead:"A bag contains marbles:"},
    {thing:"counters in a box",g1:"red",g2:"blue",g3:"green",lead:"A box contains counters:"}
  ]);
  var c=pick([2,3,4,5]),b=pick([2,3,4,5]),g=pick([1,2,3,4]),T=c+b+g;
  var target=pick(["g1","g2","g3"]),tc=target==="g1"?c:target==="g2"?b:g,tn=target==="g1"?ctx.g1:target==="g2"?ctx.g2:ctx.g3;
  var pool=[[tc,T-tc],[T-tc,T],[tc===c?b:c,T],[tc,T+tc],[tc+1,T+1]];
  return mcq(ctx.lead+" "+c+" "+ctx.g1+", "+b+" "+ctx.g2+" and "+g+" "+ctx.g3+" ("+T+" in total). One is chosen at random. What is the probability that it is "+tn+"?",
    MV(frN(tc,T)),
    pick3Frac([tc,T],pool),
    "Probability is favourable outcomes over total outcomes: there are "+tc+" "+tn+" out of "+T+" in total, giving \\("+frN(tc,T)+"\\) (part to whole). The distractor \\("+frN(tc,T-tc)+"\\) is the odds form (part to part), which answers a different question.",
    {ctx:ctx.thing,target:target});
});
E("u9-prob-odds-determine",9,["9.3"],1,"gen",function(){
  var a=pick([2,3,4,5,6,8]),b=pick([2,3,4,5,6,8]);if(a===b)b=b===8?6:b+1;
  var ctx=pick([
    {w:"In a class survey, "+a+" students chose the museum trip and "+b+" chose the science centre. A student is picked at random from these "+(a+b)+" students.",fav:"the student having chosen the museum trip"},
    {w:"A raffle sells tickets to "+(a+b)+" people; "+a+" of them are adults and "+b+" are students. One ticket is drawn at random.",fav:"the ticket belonging to an adult"},
    {w:"On a game spinner, "+a+" of the equal sections are gold and "+b+" are silver.",fav:"landing on gold"}
  ]);
  var favour=Math.random()<0.5;
  if(favour)return mcq(ctx.w+" What are the <b>odds in favour</b> of "+ctx.fav+" (in lowest terms)?",
    ratioStr(a,b),
    [ratioStr(b,a),ratioStr(a,a+b),(2*a)+" : "+(2*b)],
    "Odds in favour compare favourable outcomes to unfavourable outcomes: "+a+" to "+b+", which reduces to "+ratioStr(a,b)+". The second option is the probability written as a ratio (part to whole, "+a+" : "+(a+b)+"), a common slip, and the last is the right ratio left unreduced.",{a:a,b:b,f:1});
  return mcq(ctx.w+" What are the <b>odds against</b> "+ctx.fav+" (in lowest terms)?",
    ratioStr(b,a),
    [ratioStr(a,b),ratioStr(b,a+b),(2*b)+" : "+(2*a)],
    "Odds against compare unfavourable outcomes to favourable outcomes: "+b+" to "+a+", which reduces to "+ratioStr(b,a)+". Watch the order: against reverses the pair, and the answer must be in lowest terms.",{a:a,b:b,f:0});
});
E("u9-convert-odds-prob",9,["9.4"],1,"gen",function(){
  if(Math.random()<0.5){
    var a=pick([1,2,3,4,5]),b=pick([1,2,3,4,5,6]);
    return mcq("The odds in favour of an event are "+a+" : "+b+". What is the <b>probability</b> of the event?",
      MV(frN(a,a+b)),
      pick3Frac([a,a+b],[[a,b],[b,a+b],[a,a+b+1],[a+1,a+b]]),
      "Odds a : b mean a favourable outcomes out of a + b total. Here the probability is \\("+frN(a,a+b)+"\\) (part to whole). The distractor \\("+frN(a,b)+"\\) just copies the odds into a fraction, which is the part-to-part mistake.",{a:a,b:b,dir:"o2p"});
  }
  var p=pick([1,2,3,4,5]),q=pick([6,7,8,9,10,12]);while(q<=p)q++;
  var g=gcd2(p,q);p/=g;q/=g;
  var againstStr=(q-p===p)?((p+1)+" : "+p):ratioStr(q-p,p);
  return mcq("The probability of an event is \\("+frN(p,q)+"\\) (in lowest terms). What are the <b>odds in favour</b> of the event?",
    ratioStr(p,q-p),
    [againstStr,ratioStr(p,q),(2*p)+" : "+(2*(q-p))],
    "The probability says p favourable outcomes out of q in total, so the unfavourable count is q − p = "+(q-p)+". Odds in favour compare the parts: "+ratioStr(p,q-p)+". The second option reads the probability itself as odds, the standard confusion.",{p:p,q:q,dir:"p2o"});
});
E("u9-context-prob",9,["9.5"],1,"gen",function(){
  var ctx=pick([
    {x:pick([6,8,9,10,12]),y:pick([4,5,7,8,11]),w:function(x,y){return "In a survey of "+(x+y)+" students, "+x+" said they prefer autumn and "+y+" said they prefer spring. One student is chosen at random.";},tx:"prefer autumn"},
    {x:pick([5,7,9,11]),y:pick([6,8,10,13]),w:function(x,y){return "A raffle has "+(x+y)+" tickets out for one prize draw entry pool: "+x+" held by adults and "+y+" held by students. One ticket is drawn.";},tx:"is held by an adult"},
    {x:pick([8,10,12,14]),y:pick([5,6,9,10]),w:function(x,y){return "A school club has "+(x+y)+" members: "+x+" from grade 10 and "+y+" from grade 11. One member is chosen at random to take minutes.";},tx:"is from grade 10"}
  ]);
  var N=ctx.x+ctx.y;
  return mcq(ctx.w(ctx.x,ctx.y)+" What is the probability that the one chosen "+ctx.tx+"?",
    MV(frN(ctx.x,N)),
    pick3Frac([ctx.x,N],[[N-ctx.x,N],[ctx.x,N-ctx.x],[ctx.y,N],[ctx.x+1,N]]),
    "There are "+ctx.x+" favourable outcomes out of "+N+" equally likely choices, so the probability is \\("+frN(ctx.x,N)+"\\) (part to whole). The odds form \\("+frN(ctx.x,N-ctx.x)+"\\) and the complement \\("+frN(N-ctx.x,N)+"\\) are the standard near misses.",{x:ctx.x,y:ctx.y});
});
/* --- decisions and judgement (9.6) --- */
E("u9-decisions",9,["9.6"],2,"var",varset([
  function(){return mcq("Which of these decisions is based on a <b>subjective judgement</b> rather than on probability?",
    "A goalie decides to dive left because the shooter 'looks nervous'",
    ["An insurer sets a young driver's premium from accident statistics for that age group","A school schedules an outdoor fair on the date with the lowest historical rain probability","A player folds a poker hand after calculating the odds of improving it"],
    "The goalie's call rests on a personal impression, not on numbers: that is a subjective judgement. The other three decisions all rest on data or calculated odds, even though none of them guarantees the outcome.",{});},
  function(){return mcq("A student who holds 1 of 100 raffle tickets says: \"I feel lucky today, so my chance of winning is much better than 1 in 100.\" The flaw in the reasoning is that",
    "feelings do not change the objective probability, which stays 1 in 100",
    ["the probability was actually 1 in 99, because one ticket is the holder's own","raffle tickets are never equally likely to win in a real draw","confidence is one of the factors in the probability formula for raffles"],
    "Probability here is fixed by the setup: 1 favourable ticket out of 100 equally likely ones. A feeling of luck is a subjective judgement layered on top; it may change how the student feels about the decision, but not the 1/100 itself.",{});},
  function(){return mcq("A town must decide whether to hold its festival outdoors. Records show rain on 20 of the last 100 festival days. Which use of this information is sound?",
    "Treat the chance of rain as about 20/100 and weigh the cost of a rain plan against that likelihood",
    ["Conclude it will definitely not rain, because 80 days were dry and dry days outnumber wet days","Conclude it will rain, because rain is possible and any possible outcome should be planned as certain","Ignore the record, since past weather has no connection to probability or to future festival days"],
    "The record gives an experimental probability of about 1/5 for rain. A sound decision uses that estimate together with the stakes (how bad is a washout, how costly is a tent) rather than treating the outcome as certain either way.",{});}
]));
/* --- complementary events (9.8) --- */
/* --- complementary events (9.8) --- */
E("u9-complementary",9,["9.8"],2,"gen",function(){
  var mode=pick(["frac","decimal","comp","menotcomp","notme"]);
  if(mode==="frac"){
    var frac=pick([[1,4],[1,3],[2,5],[3,8],[5,6],[3,10],[7,10],[1,6],[5,12],[2,7],[4,9]]);
    var comp=1-frac[0]/frac[1];
    return numq("The probability of event A is \\("+frN(frac[0],frac[1])+"\\). Event B is \"not A\". What is the probability of B, as a decimal?",
      Math.round(comp*1000)/1000,0.002,
      "\"Not A\" is the complement of A: together they cover every outcome and they cannot both happen, so their probabilities add to 1. \\(P(B) = 1 - "+frN(frac[0],frac[1])+" = "+frN(frac[1]-frac[0],frac[1])+" \\approx "+fmt(comp,3)+"\\) (to three decimal places).",{mode:mode,f:frac.join("/")});
  }
  if(mode==="decimal"){
    var d=pick([0.15,0.2,0.25,0.3,0.35,0.4,0.45,0.55,0.6,0.65,0.7,0.75,0.8,0.85,0.05,0.95]);
    return numq("The probability of event A is "+fmt(d,2)+". Event B is \"not A\". What is the probability of B?",
      Math.round((1-d)*1000)/1000,0.002,
      "Complementary probabilities add to 1, so \\(P(B) = 1 - "+fmt(d,2)+" = "+fmt(1-d,2)+"\\). \"Not A\" covers every outcome that A leaves out.",{mode:mode,d:d});
  }
  if(mode==="comp"){
    var T=pick([6,8,10,12]),rc=pick([2,3,4,5]);if(rc>=T-1)rc=T-3;
    return mcq("On a spinner with "+T+" equal sections ("+rc+" red and "+(T-rc)+" blue), event A is \"lands on red\" and event B is \"lands on blue\". Are A and B complementary?",
      "Yes: they cannot both happen, and together they cover every possible outcome",
      ["No: complementary events must each have probability 1/2, which these two events do not","No: they are mutually exclusive, and mutually exclusive events are never complementary","Yes, because any two events on the same spinner are complementary here"],
      "Complementary events are mutually exclusive AND exhaustive: one of them must happen and both cannot. Here every spin is red or blue and never both, so the pair is complementary: their probabilities, \\("+frN(rc,T)+"\\) and \\("+frN(T-rc,T)+"\\), add to 1.",{mode:mode,T:T});
  }
  if(mode==="menotcomp"){
    var T2=pick([8,9,10,12]),r2=pick([2,3,4]),g2=pick([2,3]),b2=T2-r2-g2;
    return mcq("On a spinner with "+T2+" equal sections ("+r2+" red, "+g2+" green and "+b2+" blue), event A is \"lands on red\" and event B is \"lands on green\". Are A and B complementary?",
      "No: they are mutually exclusive, but they are not complementary, because the spinner can also land on blue",
      ["Yes: mutually exclusive events are always complementary, because one of them must happen on every single spin","Yes: their probabilities add to 1, because the red and green sections make up the whole spinner","No: they are not even mutually exclusive, because a single spin can land on red and green at the same time"],
      "The events cannot happen together (mutually exclusive), but complementary also requires that one of them must happen. The "+b2+" blue outcomes make both fail, and their probabilities add to only \\("+frN(r2+g2,T2)+"\\), not 1.",{mode:mode,T:T2});
  }
  var pair=pick([["a heart","red"],["a diamond","red"],["a spade","black"],["a club","black"]]);
  return mcq("A card is drawn from a standard deck. Event A is \"the card is "+pair[0]+"\" and event B is \"the card is "+pair[1]+"\". Are A and B complementary?",
    "No: they are not mutually exclusive (a "+pair[1]+" "+pair[0].slice(2)+" satisfies both), so they cannot be complementary",
    ["Yes: the suit makes up half of the "+pair[1]+" cards, so the two events split the deck evenly between them","Yes: every card is either "+pair[0]+" or "+pair[1]+", and no card in the deck falls outside the two events","No: complementary events must have equal probabilities, which these two events fail to have in any case"],
    "Complementary events must first be mutually exclusive. The "+pair[0].slice(2)+"s that are "+pair[1]+" belong to both events at once, so the pair fails at the first requirement, before any checking of totals.",{mode:mode,pair:pair[0]});
});
/* --- representing events (9.9) and ME probability (9.10) --- */
/* --- representing events (9.9) and ME probability (9.10) --- */
/* --- representing events (9.9) and ME probability (9.10) --- */
E("u9-represent-events",9,["9.9"],2,"gen",function(){
  if(Math.random()<0.5){
    var c=pick(U7SURVEY),r=u7regions(),total=r.aO+r.both+r.bO+r.none;
    var fig=venn2(r.aO,r.both,r.bO,r.none,c.lA,c.lB,null);
    var target=pick(["aonly","both","neither","either"]);
    var T={aonly:[r.aO,"A only ("+c.lA+" but not "+c.lB+")"],both:[r.both,"both activities"],neither:[r.none,"neither activity"],either:[r.aO+r.both+r.bO,"at least one activity"]}[target];
    var pool=[[r.both,total],[r.none,total],[r.aO+r.both,total],[T[0],total-r.aO]];
    return mcq("Students were surveyed about two activities (A: "+c.lA+", B: "+c.lB+"). One student is chosen at random from the "+total+" surveyed. What is the probability the student does "+T[1]+"?",
      MV(frN(T[0],total)),
      pick3Frac([T[0],total],pool),
      "Read the matching region(s) of the Venn diagram: "+T[0]+" of the "+total+" students fall in the region for "+T[1]+", so the probability is \\("+frN(T[0],total)+"\\). The diagram is a graphic organizer for the events: each region is one combination of A and B.",
      {ctx:c.lA,target:target},fig);
  }
  var nA=pick([12,14,15,18,20]),nB=pick([10,12,14,16]),inter=pick([3,4,5,6]);
  var offs=[0,2,4,6,9].filter(function(o){return o!==inter;});
  var U=nA+nB-inter+pick(offs);
  var sym=nA+nB-2*inter;
  return mcq("For two events in a sample space of "+U+" equally likely outcomes, \\(n(A) = "+nA+"\\), \\(n(B) = "+nB+"\\) and \\(n(A \\cap B) = "+inter+"\\). How many outcomes are in A or B <b>but not both</b>?",
    MV(sym),[MV(nA+nB-inter),MV(inter),MV(U-(nA+nB-inter))],
    "\"A or B but not both\" is the union with the overlap removed twice over: \\(n(A) + n(B) - 2 \\times n(A \\cap B) = "+nA+" + "+nB+" - "+(2*inter)+" = "+sym+"\\). The first distractor is the full union (both included); the last is the complement of the union.",{nA:nA,nB:nB});
});
E("u9-me-prob",9,["9.10"],1,"gen",function(){
  var T=pick(["die2","die3","suits","suits3","ranks","colours"]);
  if(T==="die2"){var vals=shuffle([1,2,3,4,5,6]).slice(0,2).sort();
    return numq("A standard die is rolled. What is the probability of rolling a "+vals[0]+" or a "+vals[1]+"? Give your answer as a decimal (to three decimal places).",
      Math.round((2/6)*1000)/1000,0.002,
      "The two outcomes cannot happen on the same roll, so the events are mutually exclusive and the probabilities add: \\(\\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6} = \\frac{1}{3} \\approx 0.333\\).",{T:T});}
  if(T==="die3"){var v3=shuffle([1,2,3,4,5,6]).slice(0,3).sort();
    return numq("A standard die is rolled. What is the probability of rolling a "+v3[0]+", a "+v3[1]+" or a "+v3[2]+"? Give your answer as a decimal (to three decimal places).",
      0.5,0.002,
      "The three outcomes cannot happen together on one roll, so the mutually exclusive probabilities add: \\(\\frac{1}{6} + \\frac{1}{6} + \\frac{1}{6} = \\frac{3}{6} = 0.5\\).",{T:T});}
  if(T==="suits"){var s=shuffle(["hearts","diamonds","clubs","spades"]).slice(0,2);
    return numq("A card is drawn from a standard 52-card deck. What is the probability that it is a "+s[0]+" card or a "+s[1]+" card? Give your answer as a decimal (to three decimal places).",
      0.5,0.002,
      "A card cannot be in two suits at once, so the events are mutually exclusive: \\(\\frac{13}{52} + \\frac{13}{52} = \\frac{26}{52} = 0.5\\).",{T:T});}
  if(T==="suits3"){var s3=shuffle(["hearts","diamonds","clubs","spades"]).slice(0,3);
    return numq("A card is drawn from a standard 52-card deck. What is the probability that it is a "+s3[0]+", a "+s3[1]+" or a "+s3[2]+" card? Give your answer as a decimal (to three decimal places).",
      0.75,0.002,
      "A card has exactly one suit, so the three events are mutually exclusive: \\(\\frac{13}{52} \\times 3 = \\frac{39}{52} = 0.75\\).",{T:T});}
  if(T==="ranks"){var s2=shuffle(["king","queen","jack","ace"]).slice(0,2);
    return numq("A card is drawn from a standard 52-card deck. What is the probability that it is a "+s2[0]+" or a "+s2[1]+"? Give your answer as a decimal (to three decimal places).",
      Math.round((8/52)*1000)/1000,0.002,
      "A card has only one rank, so the events are mutually exclusive: \\(\\frac{4}{52} + \\frac{4}{52} = \\frac{8}{52} = \\frac{2}{13} \\approx 0.154\\).",{T:T});}
  var TT=pick([8,10,12]),cr=pick([2,3,4,5]),cb=pick([2,3,4]);if(cr+cb>=TT)cb=TT-cr-2;
  var cg=TT-cr-cb;
  return numq("A spinner has "+TT+" equal sections: "+cr+" red, "+cb+" blue and "+cg+" green. What is the probability of landing on red or blue? Give your answer as a decimal (to three decimal places).",
    Math.round(((cr+cb)/TT)*1000)/1000,0.002,
    "One spin lands on a single colour, so the events are mutually exclusive: \\(\\frac{"+cr+"}{"+TT+"} + \\frac{"+cb+"}{"+TT+"} = \\frac{"+(cr+cb)+"}{"+TT+"} \\approx "+fmt((cr+cb)/TT,3)+"\\) (to three decimal places).",{T:T});
});

E("u9-nonme-prob",9,["9.10"],2,"gen",function(){
  var T=pick(["die-even3","die-prime-even","card-king-heart","survey"]);
  if(T==="die-even3")return numq("A standard die is rolled. What is the probability of rolling an <b>even number or a multiple of 3</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((4/6)*1000)/1000,0.002,
    "The events overlap (6 is both even and a multiple of 3), so the shared outcome must not be counted twice: \\[ \\begin{aligned} P(A \\cup B) &= P(A) + P(B) - P(A \\cap B) \\\\ &= \\frac{3}{6} + \\frac{2}{6} - \\frac{1}{6} \\\\ &= \\frac{4}{6} \\approx 0.667 \\end{aligned} \\] The favourable faces are 2, 3, 4 and 6.",{T:T});
  if(T==="die-prime-even")return numq("A standard die is rolled. What is the probability of rolling a <b>prime number or an even number</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((5/6)*1000)/1000,0.002,
    "The events overlap (2 is both prime and even): \\[ \\begin{aligned} P(A \\cup B) &= \\frac{3}{6} + \\frac{3}{6} - \\frac{1}{6} \\\\ &= \\frac{5}{6} \\approx 0.833 \\end{aligned} \\] Only the face 1 is neither prime nor even.",{T:T});
  if(T==="card-king-heart")return numq("A card is drawn from a standard 52-card deck. What is the probability that it is a <b>king or a heart</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((16/52)*1000)/1000,0.002,
    "The king of hearts belongs to both events, so it must be subtracted once: \\[ \\begin{aligned} P(A \\cup B) &= \\frac{4}{52} + \\frac{13}{52} - \\frac{1}{52} \\\\ &= \\frac{16}{52} \\approx 0.308 \\end{aligned} \\]",{T:T});
  var a=pick([10,12,14,15]),b=pick([8,9,11,13]),o=pick([2,3,4,5]),tot=pick([28,30,32,35,40]);
  var union=a+b-o;
  return numq("In a survey of "+tot+" students, "+a+" play a school sport, "+b+" are in a school club, and "+o+" do both. One student is chosen at random. What is the probability the student plays a school sport <b>or</b> is in a school club? Give your answer as a decimal (to three decimal places).",
    Math.round((union/tot)*1000)/1000,0.002,
    "The "+o+" students who do both sit inside both counts, so subtract the overlap once: \\[ \\begin{aligned} P(A \\cup B) &= \\frac{"+a+"}{"+tot+"} + \\frac{"+b+"}{"+tot+"} - \\frac{"+o+"}{"+tot+"} \\\\ &= \\frac{"+union+"}{"+tot+"} \\approx "+fmt(union/tot,3)+" \\end{aligned} \\]",{T:T});
});
E("u9-me-or-not",9,["9.10"],3,"gen",function(){
  var T=pick(["ranksuit","redrank","evenmult4","tworanks","dieodd3","dieprime5","survey"]);
  var J=" Justification for Level 3: the formula cannot be chosen until the overlap between the events has been analyzed; adding blindly is the trap.";
  if(T==="ranksuit"){var rk2=pick(["king","queen","jack","ace"]),su=pick(["heart","diamond","club","spade"]);
    return numq("A card is drawn from a standard deck. What is the probability it is a <b>"+rk2+" or a "+su+"</b>? Give your answer as a decimal (to three decimal places).",
      Math.round((16/52)*1000)/1000,0.002,
      "First classify: the events are NOT mutually exclusive, because the "+rk2+" of "+su+"s is both. So the overlap comes off once: \\(\\frac{4 + 13 - 1}{52} = \\frac{16}{52} \\approx 0.308\\)."+J,{T:T});}
  if(T==="redrank"){var rk=pick(["king","queen","jack","ace"]),col=pick(["red","black"]);
    return numq("A card is drawn from a standard deck. What is the probability it is <b>"+col+" or a "+rk+"</b>? Give your answer as a decimal (to three decimal places).",
      Math.round((28/52)*1000)/1000,0.002,
      "First classify: the events are NOT mutually exclusive, because two "+rk+"s are "+col+". Subtract the overlap: \\(\\frac{26 + 4 - 2}{52} = \\frac{28}{52} \\approx 0.538\\)."+J,{T:T});}
  if(T==="dieodd3")return numq("A standard die is rolled. What is the probability of rolling an <b>odd number or a multiple of 3</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((4/6)*1000)/1000,0.002,
    "First classify: the events overlap, because 3 is both odd and a multiple of 3. Subtract the overlap once: the favourable faces are 1, 3, 5 and 6, giving \\(\\frac{4}{6} \\approx 0.667\\)."+J,{T:T});
  if(T==="dieprime5")return numq("A standard die is rolled. What is the probability of rolling a <b>prime number or a multiple of 5</b>? Give your answer as a decimal (to three decimal places).",
    Math.round((3/6)*1000)/1000,0.002,
    "First classify: the events overlap, because 5 is prime and a multiple of 5 (itself). The favourable faces are 2, 3 and 5, giving \\(\\frac{3}{6} = 0.5\\). Adding 3/6 + 1/6 without removing the double-counted 5 is the trap."+J,{T:T});
  if(T==="survey"){
    var a=pick([10,12,14,15,18]),b=pick([8,9,11,13,16]),contain=Math.random()<0.3;
    var o=contain?b:pick([2,3,4,5,6]);if(o>b)o=b-1;
    var tot=pick([30,32,35,40]),union=a+b-o;
    return numq("In a survey of "+tot+" students, "+a+" are in the band, "+b+" are on a sports team, and "+o+" are in both. One student is chosen at random. What is the probability the student is in the band <b>or</b> on a sports team? Give your answer as a decimal (to three decimal places).",
      Math.round((union/tot)*1000)/1000,0.002,
      "First classify: the events are NOT mutually exclusive, since "+o+" students do both."+(contain?" In fact every team member here is also in the band, but the union formula handles it the same way.":"")+" Subtract the overlap once: \\(\\frac{"+a+" + "+b+" - "+o+"}{"+tot+"} = \\frac{"+union+"}{"+tot+"} \\approx "+fmt(union/tot,3)+"\\) (to three decimal places)."+J,{T:T});
  }
  if(T==="tworanks"){var rks=shuffle(["king","queen","jack","ace"]).slice(0,2);
    return numq("A card is drawn from a standard deck. What is the probability it is a <b>"+rks[0]+" or a "+rks[1]+"</b>? Give your answer as a decimal (to three decimal places).",
      Math.round((8/52)*1000)/1000,0.002,
      "First classify: a card has only one rank, so the events ARE mutually exclusive and the probabilities simply add: \\(\\frac{4 + 4}{52} = \\frac{8}{52} \\approx 0.154\\). Subtracting an overlap here would be the error."+J,{T:T});}
  return numq("A standard die is rolled. What is the probability of rolling an <b>even number or a multiple of 4</b>? Give your answer as a decimal (to three decimal places).",
    0.5,0.002,
    "First classify: every multiple of 4 on a die (just 4) is already even, so the second event sits inside the first and the union is just the even outcomes: \\(\\frac{3}{6} = 0.5\\). Adding the two probabilities and subtracting a generic overlap without noticing the containment overcomplicates it."+J,{T:T});
});
/* --- creating probability problems (9.11) --- */
E("u9-create-problem",9,["9.11"],1,"gen",function(){
  var device=pick([
    {w:"spinner with {T} equal sections, some coloured red",unit:"sections should be red"},
    {w:"bag holding {T} counters, some of them red",unit:"counters should be red"},
    {w:"dartboard with {T} equal regions, one of them the bullseye colour red",unit:"regions should be red"}
  ]);
  var combos=[[6,[1,3]],[6,[1,2]],[6,[2,3]],[8,[1,4]],[8,[3,8]],[8,[1,2]],[8,[5,8]],[8,[3,4]],[10,[1,5]],[10,[3,10]],[10,[2,5]],[10,[1,2]],[10,[3,5]],[10,[7,10]],[12,[1,6]],[12,[1,4]],[12,[1,3]],[12,[5,12]],[12,[1,2]],[12,[7,12]],[12,[2,3]],[12,[3,4]],[20,[1,5]],[20,[3,10]],[20,[2,5]],[20,[1,2]],[20,[3,5]],[20,[4,5]]];
  var c=pick(combos),T=c[0],frac=c[1],need=T*frac[0]/frac[1];
  return numq("Design problem: A game designer is making a "+device.w.replace("{T}",T)+". She wants the probability of red to be exactly \\("+frN(frac[0],frac[1])+"\\). How many "+device.unit+"?",
    need,0.001,
    "The probability is (number of red) ÷ (total). Set the fraction equal to the target: red = "+T+" × \\("+frN(frac[0],frac[1])+"\\) = "+need+". Designing the device to hit a stated probability is the reverse of the usual direction: start from the probability and build the sample space to match.",{T:T,frac:frac.join("/")});
});
/* --- dependent and independent events (9.12, 9.13, 9.14) --- */
E("u9-dep-vs-indep",9,["9.12"],1,"var",varset([
  function(){return mcq("Two cards are drawn from a deck <b>without replacement</b>. The two draws are",
    "dependent events, because the first draw changes the deck, and so changes the probabilities for the second draw",
    ["independent events, because the draws happen at different times and the timing of a draw cannot matter","dependent events, because cards are physical objects and physical objects always affect each other somehow","independent events, because each draw is random, and purely random draws can never influence one another at all"],
    "Dependence is about whether one event changes the probabilities of the other. Removing a card leaves 51 cards with a different mix, so the second draw's probabilities shift: dependent. Timing and randomness are not the test.",{});},
  function(){return mcq("A spinner is spun twice. The two spins are",
    "independent events, because the first spin leaves the spinner unchanged, so the second spin has the same probabilities",
    ["dependent events, because there are two spins, and a second event always depends on the event that came before it","independent events, because the spinner is fair, and fairness of the device is what makes two events independent","dependent events, because the outcomes are recorded in order, and writing them down in order links the two spins together"],
    "Nothing about the spinner changes between spins, so the probability distribution of the second spin is exactly the same whatever the first showed: the definition of independent events. Contrast this with drawing without replacement, where the sample space itself shrinks.",{});},
  function(){return mcq("Which pair of events is <b>dependent</b>?",
    "Drawing a marble from a bag and then drawing a second marble without putting the first back",
    ["Rolling a die and flipping a coin, two separate experiments done at the same time","Spinning a spinner and then spinning it again, with the spinner left exactly as it was","Drawing a card, replacing it, shuffling, and drawing again from the restored full deck of cards"],
    "Only the marble pair has one event change the other's probabilities (the bag's contents change). The replacement draw is the instructive contrast: putting the card back restores the original deck and makes the draws independent.",{});}
]));
E("u9-independent-prob",9,["9.13"],1,"gen",function(){
  var T=pick(["coin-die","two-coins","die-die-six","spinner-coin","two-spinners"]);
  if(T==="coin-die"){var cond=pick([{d:"an even number",p:1/2},{d:"a number greater than 4",p:1/3},{d:"a prime number",p:1/2},{d:"a 6",p:1/6},{d:"an odd number",p:1/2},{d:"a number less than 3",p:1/3},{d:"a multiple of 3",p:1/3}]);
    var ans=0.5*cond.p;
    return numq("A coin is flipped and a standard die is rolled. What is the probability of getting a <b>head and "+cond.d+"</b>? Give your answer as a decimal (to three decimal places).",
      Math.round(ans*1000)/1000,0.002,
      "The coin and the die do not affect each other, so the probabilities multiply: \\(\\frac{1}{2} \\times "+frN(Math.round(cond.p*6),6)+" = "+frN(Math.round(ans*12),12)+" \\approx "+fmt(ans,3)+"\\). Multiplying is the rule for independent events happening together.",{T:T,cond:cond.d});}
  if(T==="two-coins"){var want=pick(["two heads","two tails","a head and then a tail (in that order)","a tail and then a head (in that order)"]);
    return numq("A fair coin is flipped twice. What is the probability of getting <b>"+want+"</b>? Give your answer as a decimal (to three decimal places).",
      0.25,0.002,
      "The flips are independent, so multiply: \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4} = 0.25\\). (The named result is one specific sequence out of four equally likely ones: HH, HT, TH, TT.)",{T:T});}
  if(T==="die-die-six")return numq("Two standard dice are rolled. What is the probability that <b>both</b> show a 6? Give your answer as a decimal (to three decimal places).",
    Math.round((1/36)*1000)/1000,0.002,
    "The dice are independent: \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36} \\approx 0.028\\).",{T:T});
  if(T==="spinner-coin"){var s=pick([4,5,6,8]),kv=ri(1,s);
    return numq("A spinner with "+s+" equal sections (numbered 1 to "+s+") is spun, and a coin is flipped. What is the probability of landing on <b>"+kv+" and getting a head</b>? Give your answer as a decimal (to three decimal places).",
      Math.round((0.5/s)*1000)/1000,0.002,
      "The two devices are independent, so multiply: \\(\\frac{1}{"+s+"} \\times \\frac{1}{2} = "+frN(1,2*s)+" \\approx "+fmt(0.5/s,3)+"\\) (to three decimal places).",{T:T,s:s});}
  var s1=pick([3,4,5]),s2=pick([4,5,6]),tv=pick([1,2]);
  return numq("One spinner has "+s1+" equal sections and another has "+s2+" equal sections (each numbered from 1). What is the probability that <b>both</b> spinners land on "+tv+"? Give your answer as a decimal (to three decimal places).",
    Math.round((1/(s1*s2))*1000)/1000,0.002,
    "Independent devices: multiply the separate probabilities: \\(\\frac{1}{"+s1+"} \\times \\frac{1}{"+s2+"} = "+frN(1,s1*s2)+" \\approx "+fmt(1/(s1*s2),3)+"\\) (to three decimal places).",{T:T});
});
E("u9-conditional",9,["9.14"],2,"gen",function(){
  var a=pick([3,4,5,6,7]),b=pick([3,4,5,6,7]),t=a+b;
  var shape=pick(["given-red","given-then-other","both-red","both-same"]);
  if(shape==="given-red")return numq("A bag holds "+a+" red and "+b+" blue marbles. One marble is drawn at random and it is <b>red</b>; it is not replaced. What is the probability that the next marble drawn is also red? Give your answer as a decimal (to three decimal places).",
    Math.round(((a-1)/(t-1))*1000)/1000,0.002,
    "Given that a red marble is gone, the bag now holds "+(a-1)+" red marbles out of "+(t-1)+" in total: \\("+frN(a-1,t-1)+" \\approx "+fmt((a-1)/(t-1),3)+"\\) (to three decimal places). The given first result rewrites the sample space.",{shape:shape,a:a,b:b});
  if(shape==="given-then-other")return numq("A bag holds "+a+" red and "+b+" blue marbles. One marble is drawn at random and it is <b>red</b>; it is not replaced. What is the probability that the next marble drawn is blue? Give your answer as a decimal (to three decimal places).",
    Math.round((b/(t-1))*1000)/1000,0.002,
    "The blue count is unchanged at "+b+", but the total has dropped to "+(t-1)+": \\("+frN(b,t-1)+" \\approx "+fmt(b/(t-1),3)+"\\) (to three decimal places). Even the probability of a colour that was not drawn changes, because the whole shrank.",{shape:shape,a:a,b:b});
  if(shape==="both-red"){var ans=(a/t)*((a-1)/(t-1));
    return numq("A bag holds "+a+" red and "+b+" blue marbles. Two marbles are drawn at random without replacement. What is the probability that <b>both</b> are red? Give your answer as a decimal (to three decimal places).",
      Math.round(ans*1000)/1000,0.002,
      "Multiply along the path, updating after the first draw: \\[ \\begin{aligned} P(\\text{red, red}) &= \\frac{"+a+"}{"+t+"} \\times \\frac{"+(a-1)+"}{"+(t-1)+"} \\\\ &= "+frN(a*(a-1),t*(t-1))+" \\\\ &\\approx "+fmt(ans,3)+" \\end{aligned} \\] The second factor is the probability of red given that the first draw already took a red marble.",{shape:shape,a:a,b:b});}
  var ans2=(a*(a-1)+b*(b-1))/(t*(t-1));
  return numq("A bag holds "+a+" red and "+b+" blue marbles. Two marbles are drawn at random without replacement. What is the probability that the two marbles are the <b>same colour</b>? Give your answer as a decimal (to three decimal places).",
    Math.round(ans2*1000)/1000,0.002,
    "Two paths lead to a match, and they are mutually exclusive, so add them: \\[ \\begin{aligned} P(\\text{same}) &= \\frac{"+a+" \\times "+(a-1)+" + "+b+" \\times "+(b-1)+"}{"+t+" \\times "+(t-1)+"} \\\\ &= "+frN(a*(a-1)+b*(b-1),t*(t-1))+" \\\\ &\\approx "+fmt(ans2,3)+" \\end{aligned} \\]",{shape:shape,a:a,b:b});
});
/* --- creating and solving with dependent events (9.15) --- */
E("u9-create-solve-game",9,["9.15"],3,"gen",function(){
  var withRep=Math.random()<0.4;
  var ctx=pick(["marbles in a bag","counters in a box","beads in a pouch"]);
  if(!withRep){
    var pairs=[[3,6],[4,6],[3,5],[4,8],[5,8],[2,4],[5,10],[6,9],[4,10],[6,10],[3,4],[7,10]];
    var correct=pick(pairs),tv=correct[0]*(correct[0]-1)/(correct[1]*(correct[1]-1));
    var pool=pairs.filter(function(p){return p!==correct&&Math.abs(p[0]*(p[0]-1)/(p[1]*(p[1]-1))-tv)>1e-9;});
    var ds=shuffle(pool).slice(0,3);
    return mcq("A game draws two "+ctx.split(" in ")[0]+" without replacement from a "+ctx.split(" in ")[1]+" that holds red and blue ones. Design the contents so that the probability of drawing <b>two red</b> ones is exactly \\("+frN(correct[0]*(correct[0]-1),correct[1]*(correct[1]-1))+"\\). Which contents work?",
      correct[0]+" red out of "+correct[1]+" in total",
      ds.map(function(p){return p[0]+" red out of "+p[1]+" in total";}),
      "Without replacement the draws are dependent: the probability is \\(\\frac{r}{t} \\times \\frac{r - 1}{t - 1}\\). For the chosen contents: \\(\\frac{"+correct[0]+"}{"+correct[1]+"} \\times \\frac{"+(correct[0]-1)+"}{"+(correct[1]-1)+"} = "+frN(correct[0]*(correct[0]-1),correct[1]*(correct[1]-1))+"\\), exactly the target. Each other contents choice gives a different value, which checking one by one confirms. Justification for Level 3: the design runs backwards from a target probability through a dependent-events model.",{r:correct[0],t:correct[1]});
  }
  var pairs2=[[1,2],[2,5],[3,5],[1,3],[3,4],[2,3],[1,4],[3,6]];
  var correct2=pick(pairs2),tv2=Math.pow(correct2[0]/correct2[1],2);
  var pool2=pairs2.filter(function(p){return p!==correct2&&Math.abs(Math.pow(p[0]/p[1],2)-tv2)>1e-9;});
  var ds2=shuffle(pool2).slice(0,3);
  return mcq("A game draws one "+ctx.split(" in ")[0].slice(0,-1)+" from a "+ctx.split(" in ")[1]+", replaces it, and draws again. Design the contents so that the probability of drawing <b>red both times</b> is exactly \\("+frN(correct2[0]*correct2[0],correct2[1]*correct2[1])+"\\). Which contents work?",
    correct2[0]+" red out of "+correct2[1]+" in total",
    ds2.map(function(p){return p[0]+" red out of "+p[1]+" in total";}),
    "With replacement the draws are independent, so the probability is the square of the single-draw probability: \\(\\left(\\frac{"+correct2[0]+"}{"+correct2[1]+"}\\right)^2 = "+frN(correct2[0]*correct2[0],correct2[1]*correct2[1])+"\\), exactly the target. Justification for Level 3: the design runs backwards from a target probability, and spotting that the target must be a perfect square of the single-draw probability is the key insight.",{r:correct2[0],t:correct2[1],wr:1});
});
/* --- odds in context (9.5), permutations (9.28), combinations (9.32) --- */
E("u9-odds-context",9,["9.5"],3,"gen",function(){
  var sport=pick(["hockey team","baseball team","curling team","soccer team"]);
  var N=pick([20,25,30,40]),w=pick([6,7,8,9,10,11,12,13,14,15,16,17,18,22,24,26,28]);if(w>=N)w=N-6;
  var l=N-w;if(w===l)w+=2,l-=2;
  var odds=ratioStr(w,l),prob=frN(w,w+l);
  return mcq("A "+sport+" won "+w+" and lost "+l+" of its last "+(w+l)+" games (no ties). Using this record as an estimate, which statement about its next game is correct?",
    "The odds in favour of a win are "+odds+", corresponding to a probability of "+MV(prob),
    ["The odds in favour of a win are "+ratioStr(l,w)+", corresponding to a probability of "+MV(prob),"The odds in favour of a win are "+odds+", corresponding to a probability of "+MV(frN(w,l)),"The odds in favour of a win are "+odds+", corresponding to a probability of "+MV(frN(l,w+l))],
    "From the record: favourable outcomes "+w+", unfavourable "+l+", so the odds in favour are "+odds+" (part to part). The matching probability uses the whole: \\("+prob+"\\) (part to whole). The record is being used as an experimental estimate, which is how odds in sports reporting are usually produced. Justification for Level 3: both representations must be produced from the record and kept consistent with each other.",{w:w,l:l});
});
E("u9-prob-perm-context",9,["9.28"],3,"gen",function(){
  var n=pick([4,5,6]),shape=pick(["first","adjacent","notadjacent","together3","exact"]);
  var people=pick(["friends","students","singers","teammates","dancers","cousins"]);
  var corr,sol,pool;
  if(shape==="first"){corr=[1,n];pool=[[2,n],[1,n-1],[1,fact(n)],[n-1,n]];sol="Exactly one of the "+n+" equally likely first positions belongs to the specified person: the probability is \\("+frN(1,n)+"\\) (equivalently, \\((n - 1)!\\) of the \\("+n+"!\\) orders put them first).";}
  else if(shape==="adjacent"){corr=[2,n];pool=[[1,n],[n-2,n],[2,n-1],[1,n-1]];sol="Treat the pair as one block: 2 × ("+n+" − 1)! favourable orders out of "+n+"! in total, which simplifies to \\("+frN(2,n)+"\\) (the pair can also swap inside the block).";}
  else if(shape==="notadjacent"){corr=[n-2,n];pool=[[2,n],[1,n],[n-3,n-1],[1,n-1]];sol="Use the complement: the pair is adjacent with probability \\("+frN(2,n)+"\\), so not adjacent is \\(1 - "+frN(2,n)+" = "+frN(n-2,n)+"\\) (for n = "+n+").";}
  else if(shape==="together3"){corr=[6,n*(n-1)];pool=[[1,n],[6,fact(n)],[3,n],[1,n-1]];sol="Treat the three as one block: the block and the other "+(n-3)+" people make "+(n-2)+" objects, and the block's members can be arranged 3! ways: 3! × ("+n+" − 2)! favourable orders out of "+n+"!, which simplifies to \\("+frN(6,n*(n-1))+"\\) (for n = "+n+").";}
  else{corr=[1,fact(n)];pool=[[1,n],[1,n*n],[2,fact(n)],[1,Math.pow(n,2)]];sol="Only one of the \\("+n+"! = "+fact(n)+"\\) equally likely orders is the exact target order, so the probability is \\("+frN(1,fact(n))+"\\).";}
  var qText={
    first:""+n+" "+people+" line up at random. What is the probability that a particular one of them is <b>first</b> in line?",
    adjacent:""+n+" "+people+" line up at random. What is the probability that two particular ones of them end up <b>next to each other</b>?",
    notadjacent:""+n+" "+people+" line up at random. What is the probability that two particular ones of them do <b>not</b> end up next to each other?",
    together3:""+n+" "+people+" line up at random. What is the probability that three particular ones of them end up <b>all together</b> in a group?",
    exact:""+n+" "+people+" line up at random. What is the probability that they end up in <b>one particular exact order</b>?"
  }[shape];
  return mcq(qText,
    MV(frN(corr[0],corr[1])),
    pick3Frac(corr,pool),
    sol+" Justification for Level 3: the favourable arrangements have to be built with permutation reasoning before the probability ratio can be formed.",{n:n,shape:shape});
});
E("u9-prob-comb-context",9,["9.32"],3,"gen",function(){
  var shape=pick(["exactly","atleast","all"]);
  var g=pick([4,5,6,7,8]),b=pick([4,5,6,7,8]),t=g+b;
  if(shape==="atleast"&&b<3)b=5;if(shape==="all"&&g<3)g=5;
  var tot=nCr(t,3),corr,sol,pool;
  if(shape==="exactly"){corr=[nCr(g,2)*b,tot];pool=[[nCr(b,2)*g,tot],[tot-nCr(g,2)*b,tot],[nCr(g,2),tot],[nCr(g,3),tot]];
    sol="Count the favourable committees: choose 2 of the "+g+" girls and 1 of the "+b+" boys: \\(\\binom{"+g+"}{2} \\times \\binom{"+b+"}{1} = "+(nCr(g,2)*b)+"\\), out of \\(\\binom{"+t+"}{3} = "+tot+"\\) committees in total.";}
  else if(shape==="atleast"){corr=[tot-nCr(b,3),tot];pool=[[nCr(b,3),tot],[nCr(g,1)*nCr(t-1,2),tot],[nCr(g,3),tot],[tot-nCr(g,3),tot]];
    sol="Count the complement: committees with no girls choose all 3 from the "+b+" boys: \\(\\binom{"+b+"}{3} = "+nCr(b,3)+"\\) out of \\(\\binom{"+t+"}{3} = "+tot+"\\), so at least one girl has probability \\(1 - "+frN(nCr(b,3),tot)+" = "+frN(tot-nCr(b,3),tot)+"\\) (shown reduced).";}
  else{corr=[nCr(g,3),tot];pool=[[nCr(b,3),tot],[tot-nCr(g,3),tot],[nCr(g,2)*b,tot],[g,tot]];
    sol="All three members must come from the "+g+" girls: \\(\\binom{"+g+"}{3} = "+nCr(g,3)+"\\) favourable committees out of \\(\\binom{"+t+"}{3} = "+tot+"\\) in total.";}
  return mcq("A committee of 3 is chosen at random from "+g+" girls and "+b+" boys. What is the probability that the committee has "+(shape==="exactly"?"<b>exactly 2 girls</b>":shape==="atleast"?"<b>at least one girl</b>":"<b>all girls</b>")+"?",
    MV(frN(corr[0],corr[1])),
    pick3Frac(corr,pool),
    sol+" Justification for Level 3: the favourable set must be counted with combinations under a composition condition before the ratio can be formed.",{shape:shape,g:g,b:b});
});
E("u9-compare-games",9,["9.13"],3,"gen",function(){
  var gamesA=[
    {aDesc:"flipping a coin and rolling a die, winning with a head and an even number",pa:0.25},
    {aDesc:"flipping a coin and rolling a die, winning with a head and a number greater than 4",pa:1/6},
    {aDesc:"spinning a 4-section spinner and flipping a coin, winning with a 3 and a head",pa:0.125},
    {aDesc:"rolling a die and flipping a coin, winning with a 6 and a tail",pa:1/12},
    {aDesc:"flipping two coins, winning with two heads",pa:0.25},
    {aDesc:"spinning a 6-section spinner and flipping a coin, winning with a 5 and a head",pa:1/12}
  ];
  var bagsB=[[3,6],[4,6],[3,5],[5,8],[4,7],[2,5],[5,9],[3,7],[4,9],[6,10],[2,4]];
  var ga=pick(gamesA),bb=pick(bagsB),pb=(bb[0]/bb[1])*((bb[0]-1)/(bb[1]-1));
  if(Math.abs(ga.pa-pb)<1e-9){bb=[3,6];pb=0.2;}
  var c={aDesc:ga.aDesc,pa:ga.pa,bA:bb[0],bT:bb[1]};
  var winner=c.pa>pb?"Game A":"Game B";
  return mcq("Game A: a player wins by "+c.aDesc+". Game B: a player draws two marbles without replacement from a bag of "+c.bA+" red and "+(c.bT-c.bA)+" blue marbles, and wins if both are red. Which game gives the <b>higher</b> probability of winning?",
    winner,
    [winner==="Game A"?"Game B":"Game A","The two games are exactly equal","It cannot be determined from the information given"],
    "Compute both. Game A uses independent stages: the win probability is "+fmt(c.pa,3)+". Game B is dependent (no replacement): \\(\\frac{"+c.bA+"}{"+c.bT+"} \\times \\frac{"+(c.bA-1)+"}{"+(c.bT-1)+"} \\approx "+fmt(pb,3)+"\\) (to three decimal places). Comparing the two computed values, "+winner+" is higher. Justification for Level 3: two different probability models (independent product versus dependent path) must both be built before any comparison is possible.",{pa:c.pa,bA:c.bA,bT:c.bT});
});

E("u9-classify-events",9,["9.7"],1,"var",varset([
  function(){return mcq("One card is drawn from a standard deck. Event A is \"the card is a heart\" and event B is \"the card is a spade\". The two events are",
    "mutually exclusive, because a single card cannot be both a heart and a spade",
    ["not mutually exclusive, because both suits are found in the same standard deck","mutually exclusive, because hearts are red and spades are black, so the suits differ","not mutually exclusive, because the deck has 52 cards in four suits"],
    "Mutually exclusive means the events cannot happen together. One card has exactly one suit, so a heart and a spade cannot occur on the same draw. (They are not complementary, though: the card could be a diamond or a club.)",{});},
  function(){return mcq("A standard die is rolled. Event A is \"the roll is even\" and event B is \"the roll is a multiple of 3\". The two events are",
    "not mutually exclusive, because a roll of 6 is both even and a multiple of 3",
    ["mutually exclusive, because even numbers and multiples of 3 are different lists","mutually exclusive, because 6 is only one face and cannot do both","not mutually exclusive, because both events have probability greater than zero"],
    "The test is whether any single outcome can satisfy both events at once. The face 6 is even and a multiple of 3, so the events overlap and are not mutually exclusive. An event pair can overlap on even one outcome and fail the test.",{});},
  function(){return mcq("One student is chosen at random from a class. Event A is \"the student is in the band\" and event B is \"the student is in the choir\". Without more information, the two events should be classified as",
    "not mutually exclusive, because a student can be in both the band and the choir",
    ["mutually exclusive, because band and choir are different activities at school","mutually exclusive, because only one student is chosen and one student has one activity","not mutually exclusive, only if most students do both, rather than just a few of them"],
    "Nothing in the setup prevents one student from belonging to both groups, so the events can happen together for the chosen student: not mutually exclusive. Classification follows what is possible, not what is common.",{});},
  function(){return mcq("A coin is flipped once. Event A is \"the coin lands heads\" and event B is \"the coin lands tails\". The two events are",
    "mutually exclusive (and also complementary), because one flip gives exactly one of the two results",
    ["not mutually exclusive, because the coin could land on its edge and show both faces at once","mutually exclusive but not complementary, because other outcomes exist besides the two faces","not mutually exclusive, because both outcomes are equally likely and equal chances can coincide here"],
    "A single flip produces one face: heads and tails cannot happen together (mutually exclusive), and one of them must happen (complementary as well). Equal likelihood is not part of either definition.",{});}
]));

/* ============ Constructed-response fit (tagging pass, November 2026) ============ */
/* Exam Section B draws only from these entries (marks per question); every other
   entry is selected-response only in exam mode. Worksheet mode uses these plus
   all numeric-answer entries. */
/* ---------- Unit-test pool fix, Nov 9, 2026: two Level 2 CR entries (3 and 2 marks). The Level 2 CR pool held only three 2-mark entries, so the 9-mark remainder behind the 5 Level 3 pick could not form. ---------- */
E("u9-same-colour-cr",9,["9.14","9.15"],2,"gen",function(){
  var CTX=[
    {item:"marbles", place:"bag", c1:"red", c2:"blue"},
    {item:"counters", place:"box", c1:"green", c2:"yellow"},
    {item:"socks", place:"drawer", c1:"black", c2:"white"}
  ];
  var cx=pick(CTX), r=ri(3,8), b=ri(3,8); if(r===b) b=b+1;
  var den=(r+b)*(r+b-1), n1=r*(r-1), n2=b*(b-1), num=n1+n2, p=num/den;
  return numq("A "+cx.place+" contains "+r+" "+cx.c1+" "+cx.item+" and "+b+" "+cx.c2+" "+cx.item+". Two "+cx.item+" are drawn at random without replacement. What is the probability that both are the same colour? Give your answer as a decimal (to three decimal places).",
    Math.round(p*1000)/1000,0.002,
    "Add the two matching cases. Both "+cx.c1+": \\(\\frac{"+r+"}{"+(r+b)+"} \\times \\frac{"+(r-1)+"}{"+(r+b-1)+"} = \\frac{"+n1+"}{"+den+"}\\). Both "+cx.c2+": \\(\\frac{"+b+"}{"+(r+b)+"} \\times \\frac{"+(b-1)+"}{"+(r+b-1)+"} = \\frac{"+n2+"}{"+den+"}\\). Together: \\(\\frac{"+num+"}{"+den+"} \\approx <b>"+fmt(p,3)+"</b>\\).",
    {r:r,b:b});
});
E("u9-independent-pair-cr",9,["9.13"],2,"var",varset([
  function(){
    var S=pick([6,8,10]), R=pick([2,3,4]); if(R>=S) R=2;
    var p=R/S/2;
    return numq("A spinner is divided into "+S+" equal sectors, of which "+R+" are red. The spinner is spun once and a fair coin is tossed once. What is the probability that the spinner lands on red and the coin lands on heads? Give your answer as a decimal (to three decimal places).",
      Math.round(p*1000)/1000,0.002,
      "The two events are independent, so multiply: \\(P(\\text{red}) \\times P(\\text{heads}) = \\frac{"+R+"}{"+S+"} \\times \\frac{1}{2} = \\frac{"+R+"}{"+(2*S)+"} \\approx <b>"+fmt(p,3)+"</b>\\).",
      {sc:"spinner-coin"});
  },
  function(){
    var S=pick([6,8,10]), R=pick([2,3,4]); if(R>=S) R=2;
    var p=(R/S)*(2/6);
    return numq("A spinner is divided into "+S+" equal sectors, of which "+R+" are red. The spinner is spun once and a fair die is rolled once. What is the probability that the spinner lands on red and the die shows a number greater than 4? Give your answer as a decimal (to three decimal places).",
      Math.round(p*1000)/1000,0.002,
      "The two events are independent, so multiply: \\(P(\\text{red}) \\times P(\\text{greater than 4}) = \\frac{"+R+"}{"+S+"} \\times \\frac{2}{6} \\approx <b>"+fmt(p,3)+"</b>\\).",
      {sc:"spinner-die"});
  },
  function(){
    var S1=pick([6,8]), R1=pick([2,3]), S2=pick([4,5,6,8]), R2=pick([1,2,3]); if(R2>=S2) R2=1;
    var p=(R1/S1)*(R2/S2);
    return numq("One spinner is divided into "+S1+" equal sectors, of which "+R1+" are red. A second spinner is divided into "+S2+" equal sectors, of which "+R2+" are blue. Both spinners are spun once. What is the probability that the first lands on red and the second lands on blue? Give your answer as a decimal (to three decimal places).",
      Math.round(p*1000)/1000,0.002,
      "The two spins are independent, so multiply: \\(P(\\text{red}) \\times P(\\text{blue}) = \\frac{"+R1+"}{"+S1+"} \\times \\frac{"+R2+"}{"+S2+"} \\approx <b>"+fmt(p,3)+"</b>\\).",
      {sc:"two-spinners"});
  }
]));

/* --- binomial distribution (enrichment, Nov 13, 2026) --- */
/* No Math 3201 indicator names the binomial distribution, so
   the three entries in this section are enrichment, flagged at
   the foot of this file: they stay out of default practice
   pools and composed papers unless a teacher deliberately
   includes them from Advanced tools (Jason's ruling, Nov 13,
   2026; build step 8 of the Pure Math scan's build order, the
   question types were reviewed in the Pure Math 30 statistics
   material and the entries written new). The mathematics is the
   unit's own machinery
   carried one step further: combinations choose which trials
   succeed (9.30 feeding 9.32) and independent-trial
   probabilities multiply along each arrangement (9.13). */
/* Distribution terms are carried as exact integer pairs: with
   p = a/d, P(X = j) = C(n, j) a^j (d - a)^(n - j) / d^n. At the
   sizes used here the numerators and denominators are exact
   integers in floating point, so the fractions shown in the
   solutions and the key always agree. */
function binTermNum(n,j,a,d){return nCr(n,j)*Math.pow(a,j)*Math.pow(d-a,n-j);}
function binTermStr(n,j,a,d){return "\\binom{"+n+"}{"+j+"} \\left("+frN(a,d)+"\\right)^{"+j+"} \\left("+frN(d-a,d)+"\\right)^{"+(n-j)+"}";}
var BIN_CTX=[
  {id:"throws",a:3,d:4,nMin:5,nMax:8,succ:"made free throws",
   setup:function(n){return "A basketball player makes any one free throw with probability \\("+frN(3,4)+"\\), independently of her other attempts. She takes "+n+" free throws.";},
   evE:function(n,k){return "she makes exactly "+k+" of the "+n;},
   evM:function(n,k){return "she makes at most "+k+" of the "+n;},
   ev1:function(n){return "she makes at least one of the "+n;},
   evT:function(n){return "she makes at least "+(n-1)+" of the "+n;}},
  {id:"defects",a:1,d:5,nMin:5,nMax:8,succ:"defective parts",
   setup:function(n){return "A production line produces a defective part with probability \\("+frN(1,5)+"\\), independently from part to part. An inspector samples "+n+" parts.";},
   evE:function(n,k){return "exactly "+k+" of the "+n+" parts are defective";},
   evM:function(n,k){return "at most "+k+" of the "+n+" parts are defective";},
   ev1:function(n){return "at least one of the "+n+" parts is defective";},
   evT:function(n){return "at least "+(n-1)+" of the "+n+" parts are defective";}},
  {id:"guessing",a:1,d:4,nMin:5,nMax:8,succ:"correct answers",
   setup:function(n){return "A student guesses every answer on a quiz of four-option multiple-choice questions, independently from question to question, so each guess is correct with probability \\("+frN(1,4)+"\\). The quiz has "+n+" questions.";},
   evE:function(n,k){return "the student answers exactly "+k+" of the "+n+" questions correctly";},
   evM:function(n,k){return "the student answers at most "+k+" of the "+n+" questions correctly";},
   ev1:function(n){return "the student answers at least one of the "+n+" questions correctly";},
   evT:function(n){return "the student answers at least "+(n-1)+" of the "+n+" questions correctly";}},
  {id:"coin",a:1,d:2,nMin:5,nMax:8,succ:"heads",
   setup:function(n){return "A fair coin is flipped "+n+" times, so each flip lands heads with probability \\("+frN(1,2)+"\\), independently of the others.";},
   evE:function(n,k){return "exactly "+k+" of the "+n+" flips land heads";},
   evM:function(n,k){return "at most "+k+" of the "+n+" flips land heads";},
   ev1:function(n){return "at least one of the "+n+" flips lands heads";},
   evT:function(n){return "at least "+(n-1)+" of the "+n+" flips land heads";}},
  {id:"seeds",a:4,d:5,nMin:5,nMax:8,succ:"germinated seeds",
   setup:function(n){return "A gardener plants "+n+" seeds of a variety in which each seed germinates with probability \\("+frN(4,5)+"\\), independently of the others.";},
   evE:function(n,k){return "exactly "+k+" of the "+n+" seeds germinate";},
   evM:function(n,k){return "at most "+k+" of the "+n+" seeds germinate";},
   ev1:function(n){return "at least one of the "+n+" seeds germinates";},
   evT:function(n){return "at least "+(n-1)+" of the "+n+" seeds germinate";}}
];
var BIN_CANDY={id:"candies",a:1,d:20,nMin:12,nMax:20,succ:"peppermint candies",
  setup:function(n){return "In a very large batch of mixed candies, \\("+frN(1,20)+"\\) of the candies are peppermint. A handful of "+n+" candies is drawn at random, so the draws are effectively independent.";},
  ev1:function(n){return "at least one of the "+n+" candies is peppermint";}};
E("u9-binomial-prob",9,["9.13","9.32"],2,"gen",function(){
  var arm=pick(["exact","atmost","atleast1","top"]);
  function proposal(){
    var cx,n,lo,hi;
    if(arm==="atleast1"&&Math.random()<0.45){cx=BIN_CANDY;n=ri(cx.nMin,cx.nMax);lo=1;hi=n;}
    else{cx=pick(BIN_CTX);n=ri(cx.nMin,cx.nMax);
      if(arm==="exact"){var k=ri(1,n-1);lo=hi=k;}
      else if(arm==="atmost"){lo=0;hi=pick([1,2]);}
      else if(arm==="atleast1"){lo=1;hi=n;}
      else{lo=n-1;hi=n;}}
    var num=0,j;for(j=lo;j<=hi;j++)num+=binTermNum(n,j,cx.a,cx.d);
    return {cx:cx,n:n,lo:lo,hi:hi,num:num,den:Math.pow(cx.d,n)};
  }
  /* A draw is only usable when its probability is worth stating
     to three decimal places: below 0.02 the key rounds away to
     (nearly) nothing, and an at-least-one key above 0.9995
     rounds to 1. Proposals are resampled until the value lands
     in range; each arm's fallback proposal is in range by
     construction, so the loop always ends on a sound draw. */
  var FALLBACK={exact:{cx:"coin",n:6,lo:3,hi:3},atmost:{cx:"coin",n:7,lo:0,hi:2},atleast1:{cx:"defects",n:6,lo:1,hi:6},top:{cx:"coin",n:6,lo:5,hi:6}};
  var draw=null,tries;
  for(tries=0;tries<12&&!draw;tries++){var p=proposal();if(p.num/p.den>=0.02&&p.num/p.den<=0.9995)draw=p;}
  if(!draw){var f=FALLBACK[arm];var fc=BIN_CTX.filter(function(c){return c.id===f.cx;})[0];var numF=0,jF;for(jF=f.lo;jF<=f.hi;jF++)numF+=binTermNum(f.n,jF,fc.a,fc.d);draw={cx:fc,n:f.n,lo:f.lo,hi:f.hi,num:numF,den:Math.pow(fc.d,f.n)};}
  var cx=draw.cx,n=draw.n,lo=draw.lo,hi=draw.hi,num=draw.num,den=draw.den,a=cx.a,d=cx.d,ev,sol;
  var head="Let \\(X\\) be the number of "+cx.succ+". The "+n+" trials are independent, each trial has two outcomes, and the success probability is \\(p = "+frN(a,d)+"\\) on every trial, so \\(X\\) has a binomial distribution with \\(n = "+n+"\\): \\(P(X = j) = \\binom{"+n+"}{j} p^{j} (1-p)^{"+n+"-j}\\). ";
  if(arm==="exact"){
    ev=cx.evE(n,lo);
    sol=head+"For exactly "+lo+": \\[ P(X = "+lo+") = "+binTermStr(n,lo,a,d)+" = "+frN(num,den)+" \\approx "+fmt(num/den,3)+" \\]";
  }else if(arm==="atmost"){
    ev=cx.evM(n,hi);
    var parts=[],j;for(j=0;j<=hi;j++)parts.push("\\(P(X = "+j+") = "+frN(binTermNum(n,j,a,d),den)+"\\)");
    sol=head+"At most "+hi+" means \\(X\\) is 0, 1, ..., "+hi+", so those terms add: "+parts.join(", ")+". The sum is \\("+frN(num,den)+" \\approx "+fmt(num/den,3)+"\\).";
  }else if(arm==="atleast1"){
    ev=cx.ev1(n);var p0=binTermNum(n,0,a,d);
    if(den<=100000)sol=head+"At least one is everything except none at all, so use the complement: \\[ P(X \\ge 1) = 1 - P(X = 0) = 1 - "+binTermStr(n,0,a,d)+" = 1 - "+frN(p0,den)+" = "+frN(num,den)+" \\approx "+fmt(num/den,3)+" \\]";
    else sol=head+"At least one is everything except none at all, so use the complement: \\[ P(X \\ge 1) = 1 - P(X = 0) = 1 - "+binTermStr(n,0,a,d)+" \\approx 1 - "+fmt(p0/den,3)+" = "+fmt(num/den,3)+" \\]";
  }else{
    ev=cx.evT(n);var t1=binTermNum(n,n-1,a,d),t2=binTermNum(n,n,a,d);
    sol=head+"At least "+(n-1)+" leaves only two cases: \\[ P(X \\ge "+(n-1)+") = P(X = "+(n-1)+") + P(X = "+n+") = "+frN(t1,den)+" + "+frN(t2,den)+" = "+frN(num,den)+" \\approx "+fmt(num/den,3)+" \\]";
  }
  return numq(cx.setup(n)+" What is the probability that "+ev+"? Give your answer as a decimal (to three decimal places).",
    Math.round(num/den*1000)/1000,0.002,sol,{arm:arm,cx:cx.id,n:n,lo:lo,hi:hi,a:a,d:d});
});
var BIN_EXP=[
  {id:"bolts",n:40,a:1,d:8,item:"defective bolts",fail:"non-defective bolts",run:"batch of 40 bolts",
   setup:"A machine fills batches of 40 bolts. Each bolt is defective with probability \\(\\frac{1}{8}\\), independently of the others."},
  {id:"throws",n:200,a:3,d:4,item:"made free throws",fail:"missed free throws",run:"block of 200 attempts",
   setup:"A basketball player makes each free throw with probability \\(\\frac{3}{4}\\), independently of the others. Consider her next 200 attempts."},
  {id:"guessing",n:20,a:1,d:4,item:"correct guesses",fail:"incorrect guesses",run:"20-question guessed quiz",
   setup:"A student guesses every answer on a 20-question quiz with four options per question, independently, so each guess is correct with probability \\(\\frac{1}{4}\\)."},
  {id:"seeds",n:60,a:5,d:6,item:"germinated seeds",fail:"seeds that fail to germinate",run:"tray of 60 seeds",
   setup:"A nursery plants trays of 60 seeds. Each seed germinates with probability \\(\\frac{5}{6}\\), independently of the others."},
  {id:"wells",n:24,a:2,d:3,item:"wells that strike water",fail:"dry wells",run:"set of 24 wells",
   setup:"In one region, each drilled well strikes water with probability \\(\\frac{2}{3}\\), independently of the others. A contractor drills 24 wells."}
];
E("u9-binomial-expected",9,["9.5","9.6"],2,"gen",function(){
  var cx=pick(BIN_EXP),n=cx.n,a=cx.a,d=cx.d;
  var ev0=n*a/d,fv0=n*(d-a)/d;
  var lr=function(v){return v+". It is the long-run average: over many runs like this one, the number of "+cx.item+" averages about "+v+" per "+cx.run+", though any single run may give more or fewer.";};
  var d1=ev0+". Every run gives exactly "+ev0+" "+cx.item+"; the count is fixed by the probability and does not vary from run to run.";
  var d3=ev0+". It is the most likely single count, so nearly every run gives exactly "+ev0+" "+cx.item+".";
  var sol="The number of "+cx.item+" is binomial with \\(n = "+n+"\\) and \\(p = "+frN(a,d)+"\\), so its expected value is \\(E(X) = np = "+n+" \\times "+frN(a,d)+" = "+ev0+"\\). An expected value is a long-run average, not a promise about a single run: repeat the run many times and the counts average out to about "+ev0+" per run, while individual runs land above and below it. Two of the other options pair the right value with the wrong meaning (a count that never varies, or one that nearly every run hits exactly). The remaining one uses the failure probability instead: \\("+n+" \\times "+frN(d-a,d)+" = "+fv0+"\\) is the expected number of "+cx.fail+", not of "+cx.item+".";
  return mcq(cx.setup+" What is the expected number of "+cx.item+", and what does that number mean?",
    lr(ev0),[d1,lr(fv0),d3],sol,{cx:cx.id,n:n,a:a,d:d,E:ev0,F:fv0});
});
var BIN_GOOD=[
  {id:"coin-flips",t:"A fair coin is flipped 6 times, and X is the number of heads."},
  {id:"seed-packet",t:"A packet holds 12 seeds, and each seed germinates with probability \\(\\frac{4}{5}\\), independently of the others. X is the number of seeds that germinate."},
  {id:"bottle-check",t:"A machine fills bottles one after another, and each bottle is underfilled with probability \\(\\frac{1}{10}\\), independently of the others. An inspector checks 15 bottles, and X is the number that are underfilled."},
  {id:"quiz-guess",t:"A student guesses on each of 8 multiple-choice questions with four options, independently from question to question. X is the number of questions answered correctly."},
  {id:"free-throws",t:"A player takes 10 free throws, making each one with probability \\(\\frac{3}{4}\\), independently of the others. X is the number of free throws she makes."}
];
var BIN_BAD={
  fixed:[
    {id:"until-defect",t:"An inspector tests light bulbs one at a time until she finds the first defective bulb, and then stops. X is the number of bulbs she tests.",why:"testing stops at the first defective bulb, so how many trials occur is decided by the outcomes, not fixed beforehand"},
    {id:"until-sale",t:"A salesperson phones potential customers until she makes her first sale, and then stops for the day. X is the number of calls she makes.",why:"calling stops at the first sale, so how many trials occur is decided by the outcomes, not fixed beforehand"},
    {id:"until-six",t:"A player rolls a die again and again until a 6 appears. X is the number of rolls made.",why:"rolling stops when a 6 appears, so how many trials occur is decided by the outcomes, not fixed beforehand"}],
  binary:[
    {id:"die-sum",t:"A die is rolled 8 times, and X is the sum of the eight numbers rolled.",why:"each roll has six outcomes, not two, and X adds the results instead of counting successes"},
    {id:"spinner-total",t:"A spinner numbered 1 to 5 is spun 9 times, and X is the total of the nine numbers spun.",why:"each spin has five outcomes, not two, and X adds the results instead of counting successes"},
    {id:"highest-roll",t:"Each of 7 students rolls a die once, and X is the highest number rolled.",why:"each roll has six outcomes, not two, and X takes the largest result instead of counting successes"}],
  indep:[
    {id:"marbles-wor",t:"A bag holds 5 red and 5 blue marbles. Five marbles are drawn without replacement, and X is the number of red marbles drawn.",why:"the draws are made without replacement, so each draw changes the bag and the draws are not independent"},
    {id:"cards-wor",t:"Five cards are drawn from a standard deck without replacement, and X is the number of hearts among them.",why:"the draws are made without replacement, so each draw changes the deck and the draws are not independent"},
    {id:"names-wor",t:"The names of 20 students are in a hat, 8 of them in Grade 12. Four names are drawn without replacement, and X is the number of Grade 12 names drawn.",why:"the draws are made without replacement, so each draw changes the hat and the draws are not independent"}],
  prob:[
    {id:"quiz-harder",t:"A student writes a 10-question quiz in which the questions grow steadily harder, so her probability of answering correctly is different on every question. X is the number of questions she answers correctly.",why:"her probability of success changes from question to question instead of staying the same on every trial"},
    {id:"darts-warm",t:"A dart player throws 20 darts in a session. As she warms up, her probability of hitting the bullseye rises steadily from throw to throw. X is the number of bullseyes.",why:"her probability of success changes from throw to throw instead of staying the same on every trial"},
    {id:"throws-tire",t:"A player takes 20 free throws in a row. As she tires, her probability of making each throw drops steadily. X is the number of free throws she makes.",why:"her probability of success changes from throw to throw instead of staying the same on every trial"}]
};
var BIN_CAT_NAME={fixed:"the fixed number of trials condition",binary:"the two outcomes per trial condition",indep:"the independent trials condition",prob:"the same probability of success on every trial condition"};
E("u9-binomial-identify",9,["9.12","9.13"],2,"gen",function(){
  var good=pick(BIN_GOOD);
  var cats=shuffle(["fixed","binary","indep","prob"]).slice(0,3);
  var bads=cats.map(function(c){return {cat:c,s:pick(BIN_BAD[c])};});
  var sol="X has a binomial distribution only when four conditions all hold: the number of trials is fixed in advance, each trial has exactly two outcomes (success and failure), the trials are independent, and the probability of success is the same on every trial. The keyed setting is the only one meeting all four. Each other setting breaks exactly one condition: "+bads.map(function(b){return "\""+b.s.t+"\" breaks "+BIN_CAT_NAME[b.cat]+", because "+b.s.why;}).join("; ")+".";
  return mcq("In which setting does X have a binomial distribution?",
    good.t,bads.map(function(b){return b.s.t;}),sol,
    {good:good.id,cats:cats.join(","),bads:bads.map(function(b){return b.s.id;}).join(",")});
});
/* Enrichment flags (Nov 13, 2026): no Math 3201 indicator
   names the binomial distribution, so the three entries above
   are enrichment. The flag is a property on the entry, set
   here in the bank module the way the Math 2201 Unit 7 flags
   are set in that course's bank-u7.js; assembly carries it
   into banks/math-3201.js verbatim, and the shell keeps
   flagged entries out of practice draws and composed papers
   unless a teacher deliberately includes them from Advanced
   tools. */
BANK.forEach(function(e){if(e.id==="u9-binomial-prob"||e.id==="u9-binomial-expected"||e.id==="u9-binomial-identify")e.enrich=true;});
