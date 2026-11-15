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

/* ===== Prior knowledge tranche (Nov 15, 2026): Cluster 4 (working with data: central tendency). Borrowed verbatim from Mathematics 7 (u7-mean-basic, u7-median-mode, u7-median-range-cr, u7-gap-median-range-cr2, u7-missing-value-cr, u7-gap-missing-mean-cr, u7-central-problem-cr), across the three-course gap the prior knowledge map records; feeder helper copies ride in bank-helpers.js. The graph-reading entries banked under the same feeder codes (u7-bar-graph, u7-line-graph, u7-circle-graph) were range-checked out: they assess graph reading, not a centre. ===== */
E("u4-pk-mean-basic", 4, ["6.1"],1,"gen",function(){
  var ctx=pick(["quiz scores","laps swum each day","pages read each day","points scored each game","seedlings sprouting each day"]);
  var n=pick([5,5,6]);var vals=[];for(var i=0;i<n;i++)vals.push(ri(2,14));
  var m=u7mean(vals);var ms=fmt(m);
  var cand=u7numOpts(m,[fmt(m+1),fmt(m-1),fmt(u7median(vals)),fmt(m+2),fmt(Math.max.apply(null,vals))]).map(function(v){return String(v);});
  var seen={};var ds=[];cand.forEach(function(v){if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"That value does not equal the total divided by "+n+". Add all the values first, then divide by how many there are."});}});
  while(ds.length<3){var v=fmt(m+ds.length+2);if(v!==ms&&!seen[v]){seen[v]=1;ds.push({t:v,fb:"Add all the values first, then divide by "+n+"."});}}
  ds=precPair(ms,ds);
  var q=mcq("A student's "+ctx+" are: "+vals.join(", ")+". What is the mean?",
    {t:ms,fb:"Yes: the total is "+fmt(u7mean(vals)*n)+" and "+fmt(u7mean(vals)*n)+" divided by "+n+" is "+ms+"."},ds.slice(0,3),
    "Add the values, then divide by how many there are. \\[ \\begin{aligned} \\text{total} &= "+vals.join(" + ")+" = "+fmt(m*n)+" \\\\ \\text{mean} &= "+fmt(m*n)+" \\div "+n+" = "+ms+" \\end{aligned} \\] The mean is <b>"+ms+"</b>.",
    {mode:"mean",n:n});
  return q;
},["The mean is the total of all the values divided by how many values there are.","Start by adding all the values together."]);

E("u4-pk-median-mode", 4, ["6.1"],1,"gen",function(){
  var askMode=Math.random()<0.5;
  var base=ri(3,9);var vals;
  if(askMode){var modeV=ri(2,12);var others=[];while(others.length<4){var v=ri(1,15);if(v!==modeV&&others.indexOf(v)<0)others.push(v);}vals=shuffle([modeV,modeV,modeV].concat(others.slice(0,3)));
    var correct=String(modeV);
    var cand=u7numOpts(modeV,[others[0],others[1],Math.round(u7mean(vals))]).map(String);
    var ds=cand.filter(function(v){return v!==correct;}).slice(0,3).map(function(v){return {t:v,fb:"Count how often each value appears. The mode is the value that appears most often."};});
    while(ds.length<3){var v=String(modeV+ds.length+3);ds.push({t:v,fb:"Count how often each value appears."});}
    return mcq("Data set: "+vals.join(", ")+". What is the mode?",{t:correct,fb:"Yes: "+modeV+" appears three times, more often than any other value."},ds,
      "Count the frequency of each value. The value "+modeV+" appears 3 times, more than any other value. The mode is <b>"+modeV+"</b>.",{mode:"mode"});
  }
  var n=pick([5,7]);vals=[];for(var i=0;i<n;i++)vals.push(ri(1,16));
  var med=u7median(vals);var srt=vals.slice().sort(function(a,b){return a-b;});
  var cand2=u7numOpts(med,[fmt(u7mean(vals)),srt[0],srt[srt.length-1],med+1]).map(function(v){return String(v);});
  var ds2=cand2.filter(function(v){return v!==fmt(med);}).slice(0,3).map(function(v){return {t:v,fb:"Order the values first. The median is the middle value of the ordered list."};});
  while(ds2.length<3){var w=fmt(med+ds2.length+2);ds2.push({t:w,fb:"Order the values first, then take the middle one."});}
  ds2=precPair(fmt(med),ds2);
  return mcq("Data set: "+vals.join(", ")+". What is the median?",{t:fmt(med),fb:"Yes: ordered, the list is "+srt.join(", ")+", and the middle value is "+fmt(med)+"."},ds2,
    "Order the values: "+srt.join(", ")+". With "+n+" values, the middle position holds <b>"+fmt(med)+"</b>.",{mode:"median"});
},["Order the values first for the median; count frequencies for the mode.","Start by rewriting the data set in increasing order."]);

E("u4-pk-median-range", 4, ["6.1"],1,"gen",function(){
  var mode=pick(["median6","median5","range"]);
  if(mode==="range"){var lo=ri(3,12),hi=lo+ri(5,16);var vals=[lo,hi];for(var i=0;i<4;i++)vals.push(ri(lo,hi));vals=shuffle(vals);
    return numq("Data set: "+vals.join(", ")+". What is the range?",hi-lo,0,
      "The largest value is "+hi+" and the smallest is "+lo+". \\[ \\begin{aligned} \\text{range} &= "+hi+" - "+lo+" \\\\ &= "+(hi-lo)+" \\end{aligned} \\] The range is <b>"+(hi-lo)+"</b>.",{mode:"range"});
  }
  if(mode==="median5"){var v5=[];for(var a=0;a<5;a++)v5.push(ri(2,18));var s5=v5.slice().sort(function(x,y){return x-y;});var med5=s5[2];
    return numq("Data set: "+v5.join(", ")+". What is the median?",med5,0,
      "Order the values: "+s5.join(", ")+". The middle value is <b>"+med5+"</b>.",{mode:"median5"});
  }
  var v6=[];for(var b=0;b<6;b++)v6.push(ri(2,20));var s6=v6.slice().sort(function(x,y){return x-y;});var med6=(s6[2]+s6[3])/2;
  return numq("Data set: "+v6.join(", ")+". What is the median?",med6,0.01,
    "Order the values: "+s6.join(", ")+". With six values, average the two middle values. \\[ \\begin{aligned} \\text{median} &= \\frac{"+s6[2]+" + "+s6[3]+"}{2} \\\\ &= "+fmt(med6)+" \\end{aligned} \\] The median is <b>"+fmt(med6)+"</b>.",{mode:"median6"});
},["Order the values before finding a median; the range needs only the two extremes.","Start by rewriting the data set in increasing order."]);

E("u4-pk-median-range-2", 4, ["6.1"], 2, "gen", function(){
  var m=ri(8,20);
  var low=[m-ri(4,7), m-ri(2,3), m-ri(1,2)], high=[m+ri(1,2), m+ri(3,4), m+ri(5,8)];
  var sorted=low.concat([m],high), range=sorted[6]-sorted[0], ans=m+range;
  var shown=shuffle(sorted);
  return numq("A data set is "+shown.join(", ")+". Find the median of the set and the range of the set, and give the sum of the median and the range. Show your work.", ans, 0,
    "Order the values first; the median is the middle value and the range is the spread. \\[ \\begin{aligned} \\text{ordered} &= "+sorted.join(", ")+" \\\\ \\text{median} &= "+m+" \\\\ \\text{range} &= "+sorted[6]+" - "+sorted[0]+" = "+range+" \\\\ \\text{sum} &= "+m+" + "+range+" = "+ans+" \\end{aligned} \\] The answer is <b>"+ans+"</b>.",
    {m:m,range:range});
}, ["Order the data first; both the median and the range come from the ordered set, then combine them.", "Start by writing the values in order from smallest to largest."]);

E("u4-pk-missing-value", 4, ["6.2"],2,"gen",function(){
  var meanT=ri(6,12);var known=[];var s=0;for(var i=0;i<4;i++){var v=ri(3,15);known.push(v);s+=v;}
  var missing=5*meanT-s;var guard=0;
  while((missing<1||missing>20)&&guard<40){known=[];s=0;for(var j=0;j<4;j++){var w=ri(3,15);known.push(w);s+=w;}missing=5*meanT-s;guard++;}
  if(missing<1||missing>20){known=[meanT-2,meanT,meanT+1,meanT+1];s=4*meanT;missing=meanT;}
  return numq("Four quiz scores are "+known.join(", ")+". What fifth score gives a mean of exactly "+meanT+"?",
    missing,0,
    "The five scores must total \\(5 \\times "+meanT+" = "+(5*meanT)+"\\). \\[ \\begin{aligned} \\text{known total} &= "+known.join(" + ")+" = "+s+" \\\\ \\text{fifth score} &= "+(5*meanT)+" - "+s+" = "+missing+" \\end{aligned} \\] The fifth score is <b>"+missing+"</b>.",
    {mode:"missing",mean:meanT});
},["Work backwards from the mean: the total is the mean times the number of values.","Start by multiplying the target mean by 5 to find the required total."]);

E("u4-pk-missing-mean", 4, ["6.2"], 2, "gen", function(){
  var M=ri(8,16), known=[], missing=0, g=0;
  while(g++<300){ known=[]; var s=0; for(var i=0;i<5;i++){ var v=ri(4,20); known.push(v); s+=v; } missing=6*M-s; if(missing>=2&&missing<=24) break; }
  return numq("The mean of six quiz scores is "+M+". Five of the scores are "+known.join(", ")+". What is the sixth score? Show your work.", missing, 0,
    "The mean fixes the total of all six scores, so find that total and subtract the known scores. \\[ \\begin{aligned} \\text{total} &= 6 \\times "+M+" = "+(6*M)+" \\\\ \\text{sixth score} &= "+(6*M)+" - "+(6*M-missing)+" = "+missing+" \\end{aligned} \\] The answer is <b>"+missing+"</b>.",
    {M:M,known:known});
}, ["A stated mean tells you the total; work from the total back to the missing value.", "Start by multiplying the mean by the number of scores."]);

E("u4-pk-central-problem", 4, ["6.2"],3,"gen",function(){
  var mode=pick(["remove","combine","target"]);
  if(mode==="remove"){
    var base=ri(6,12);var vals=[];for(var i=0;i<5;i++)vals.push(base+ri(-2,2));var out=base+ri(28,44);var all=shuffle(vals.concat([out]));
    var m5=u7mean(vals);
    return numq("Data set: "+all.join(", ")+". The largest value is an outlier. What is the mean of the remaining five values?",
      m5,0.01,
      "Remove the outlier "+out+". The remaining values total "+fmt(m5*5)+". \\[ \\begin{aligned} \\text{mean} &= "+fmt(m5*5)+" \\div 5 \\\\ &= "+fmt(m5)+" \\end{aligned} \\] The mean is <b>"+fmt(m5)+"</b>.",{mode:"remove"});
  }
  if(mode==="combine"){
    var n1=pick([4,5]),n2=pick([4,5]);var m1=ri(6,11),m2=ri(7,13);var ans=(n1*m1+n2*m2)/(n1+n2);
    return numq("Group A has "+n1+" students with a mean score of "+m1+". Group B has "+n2+" students with a mean score of "+m2+". What is the mean score of all the students combined?",
      ans,0.01,
      "Turn each mean back into a total. \\[ \\begin{aligned} \\text{total} &= "+n1+" \\times "+m1+" + "+n2+" \\times "+m2+" = "+(n1*m1+n2*m2)+" \\\\ \\text{mean} &= "+(n1*m1+n2*m2)+" \\div "+(n1+n2)+" = "+fmt(ans)+" \\end{aligned} \\] The combined mean is <b>"+fmt(ans)+"</b>.",{mode:"combine"});
  }
  var cur=[ri(5,9),ri(5,9),ri(5,9),ri(5,9)];var s=cur.reduce(function(a,b){return a+b;},0);var target=ri(72,88);var need=target/10*5-s;var guard=0;
  while((need<1||need>10)&&guard<30){cur=[ri(5,9),ri(5,9),ri(5,9),ri(5,9)];s=cur.reduce(function(a,b){return a+b;},0);need=target/10*5-s;guard++;}
  if(need<1||need>10){cur=[7,7,7,7];s=28;target=76;need=10;}
  return numq("After four tests, a student's scores are "+cur.join(", ")+" out of 10. What score on the fifth test gives an overall mean of "+fmt(target/10,1)+" out of 10?",
    need,0.01,
    "Five tests with mean "+fmt(target/10,1)+" must total \\(5 \\times "+fmt(target/10,1)+" = "+fmt(target/2,1)+"\\). \\[ \\begin{aligned} \\text{fifth score} &= "+fmt(target/2,1)+" - "+s+" \\\\ &= "+fmt(need,1)+" \\end{aligned} \\] The fifth score is <b>"+fmt(need,1)+"</b>.",{mode:"target"});
},["Turn means into totals first; totals are what combine and compare.","Start by multiplying each mean by its number of values."]);

/* PK tranche metadata pass for Unit 4. pkFor is the unit's cluster
   indicator list from the prior knowledge map, as registered for this
   unit in courses.js. */
var PKT_U4_FOR=["6.1","6.2","6.3","6.4","6.5","6.6","6.7","6.8","6.9","6.10"];
var PKT_U4={
 "u4-pk-mean-basic":{src:"math-7:11.6",group:"centre-measures"},
 "u4-pk-median-mode":{src:"math-7:11.6",group:"centre-measures"},
 "u4-pk-median-range":{src:"math-7:11.6",group:"centre-measures"},
 "u4-pk-median-range-2":{src:"math-7:11.6",group:"centre-measures"},
 "u4-pk-missing-value":{src:"math-7:11.9",group:"centre-backwards"},
 "u4-pk-missing-mean":{src:"math-7:11.9",group:"centre-backwards"},
 "u4-pk-central-problem":{src:"math-7:11.9",group:"centre-backwards"}
};
BANK.forEach(function(e){var t=PKT_U4[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U4_FOR.slice();e.pkGroup=t.group;}});
