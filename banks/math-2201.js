/* Math 2201 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/math-2201/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-helpers.js ----- */
// Math 2201 bank helpers: none are carried in this file. Every
// helper and diagram function the entries call (the random and
// statistics helpers, mcq, numq, textq, varset, and the figure
// library: triSVG, twoTriSVG, transversalSVG, polySVG, normSVG and
// their kin) is defined by the unified shell itself, because the
// shell's chassis descends from this course's own app: the
// standalone keeps the same functions in its helpers and figures
// blocks (math-2201-review/Math2201Review.html, lines 388 to 642),
// and a name-by-name check confirms each one is present in the
// built shell. The curriculum map that follows those blocks in
// the standalone (UNITS, INDICATORS, UNIT_IND, lines 643 to 724)
// lives in courses.js as this course's configuration.

/* ----- bank-u5.js ----- */
// Math 2201 Unit 5: Statistical Reasoning question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 727 to 1203,
// across its first three bank script blocks), minus its
// BANK and E definitions at lines 737 to 738, which the
// shell's bank loader supplies. Unit 5 registers first in
// the standalone, so it is first here too.
// CRMARKS: u5-centre-mean=1
// CRMARKS: u5-centre-median=1
// CRMARKS: u5-centre-mode=1
// CRMARKS: u5-range=1
// CRMARKS: u5-outlier-range=2
// CRMARKS: u5-ad-claim=3
// CRMARKS: u5-freq-total=1
// CRMARKS: u5-freq-missing=1
// CRMARKS: u5-freq-countin=1
// CRMARKS: u5-relfreq=1
// CRMARKS: u5-relfreq-rev=1
// CRMARKS: u5-histogram-read=2
// CRMARKS: u5-midpoint=1
// CRMARKS: u5-polygon-point=1
// CRMARKS: u5-sd-calc=2
// CRMARKS: u5-sd-from-variance=1
// CRMARKS: u5-sd-compare=2
// CRMARKS: u5-sd-decisions=4
// CRMARKS: u5-empirical=2
// CRMARKS: u5-normal-count=2
// CRMARKS: u5-z-calc=1
// CRMARKS: u5-z-compare=2
// CRMARKS: u5-z-backwards=1
// CRMARKS: u5-z-prob=2
// CRMARKS: u5-z-applied=2
// CRMARKS: u5-ci-endpoint=1
// CRMARKS: u5-ci-from-endpoints=1
// CRMARKS: u5-ci-count=2
// CRMARKS: u5-ci-majority=3
// CRMARKS: u5-media=4
/* ============ THE BANK — Unit 5: Statistical Reasoning ============ */
/* ============ BANK ADMISSION RULE (adopted Oct 26, 2026, from the bank duplication audit) ============
   A "gen" entry must produce at least 50 unique canonical questions (normalized prompt
   text + correct answer) in 2,000 test draws, or it must be registered as a "var" set
   holding at least 3 genuinely different static questions. Run the duplication audit
   as a pre-commit check before any new item is added to this bank.
   Every multiple-choice question must have exactly 4 options (Jason's standard,
   Oct 26, 2026): build exactly 3 distractors, and make sure no distractor can ever
   equal the correct answer or another distractor, because mcq() silently drops
   duplicates and the option count falls short. */

/* --- measures of centre (prior knowledge, Section 1) --- */
E("u5-centre-mean",5,["PK.1"],1,"gen",function(){
  var c=pick([{w:"quiz marks",u:""},{w:"daily high temperatures",u:"\u00B0C"},{w:"goals per game",u:""},{w:"pages read each day",u:""}]);
  var n=ri(5,7),base=ri(4,14),data=[],i;for(i=0;i<n;i++)data.push(base+ri(-4,6));
  var m=mean(data);
  return numq("A student records these "+c.w+": <b>\\(\\{"+data.join(", ")+"\\}\\)</b>. What is the <b>mean</b>?",
    Math.round(m*100)/100,0.011,
    "Add the values: \\("+data.join(" + ")+" = "+fmt(sum(data))+"\\). There are "+n+" values, so the mean is <b>\\("+fmt(sum(data))+" \\div "+n+" = "+fmt(m)+"\\)</b>.",
    {data:data});
});
E("u5-centre-median",5,["PK.1"],1,"gen",function(){
  var n=pick([6,8]),base=ri(5,15),data=[],i;for(i=0;i<n;i++)data.push(base+ri(-5,7));
  var md=median(data),s=sorted(data),lo=s[n/2-1],hi=s[n/2];
  return numq("Find the <b>median</b> of: <b>\\(\\{"+data.join(", ")+"\\}\\)</b>.",
    md,0.011,
    "In order: \\(\\{"+s.join(", ")+"\\}\\). With "+n+" values the median is the average of the two middle values, \\("+lo+"\\) and \\("+hi+"\\): <b>\\(\\frac{"+lo+" + "+hi+"}{2} = "+fmt(md)+"\\)</b>.",
    {data:data});
});
E("u5-centre-mode",5,["PK.1"],1,"gen",function(){
  var cols=["red","blue","green","black","purple","orange"];
  var win=pick(cols),others=shuffle(cols.filter(function(c){return c!==win;}));
  var list=[win,win,win];var k=ri(2,3);for(var i=0;i<k;i++){list.push(others[i%others.length]);if(i<2)list.push(others[(i+1)%others.length]);}
  list=shuffle(list);
  return textq("A class votes for a poster colour. The votes are: <b>"+list.join(", ")+"</b>. What is the <b>mode</b>? (Type the colour.)",
    [win],
    "Count each colour: "+win+" appears 3 times, more than any other colour, so the mode is <b>"+win+"</b>. The mode is the most useful measure for data in categories.",
    {win:win,list:list});
});
E("u5-choosing-measure",5,["PK.1"],2,"var",varset([
  function(){return mcq("A school store manager asks students to name their favourite hoodie design so she knows which design to order most of. Which measure of central tendency is most useful for this decision?",
    "The mode, because the data are categories and the most common choice is what matters",
    ["The mean, because it uses every student's answer and averages all the choices together","The median, because it is the middle answer when the designs are listed in order","The range, because it shows how spread out the choices are across all the designs named"],
    "The answers are categories, not numbers, so only the mode can be found \u2014 and the most-chosen design is exactly what she needs to order.",{});},
  function(){return mcq("At a small company, most workers earn about $650 a week, but the owner earns $3,800 a week. Which statement best describes a typical worker's earnings?",
    "The median, because the owner's salary pulls the mean well above what most workers earn",
    ["The mean, because it includes every salary in the company, and every salary should count","The mode, because it is the salary paid most often in every company, whatever the rest are","The range, because it is unaffected by the owner's salary and shows the spread of pay"],
    "One very large value pulls the mean up. The median sits in the middle of the workers' actual salaries, so it describes a typical worker far better.",{});},
  function(){return mcq("A data set contains one value that is far lower than all the others. What is the effect of that value?",
    "It pulls the mean down, while the median is barely affected",
    ["It pulls the median down by about the same amount as the mean","It changes the mode of the data set to a new most common value","It leaves the range unchanged, since the spread stays the same"],
    "The mean uses every value, so an extreme value drags it. The median depends only on the middle position, and the range must grow because the lowest value dropped.",{});}
]));
/* --- dispersion (8.6) --- */
E("u5-range",5,["8.6"],1,"gen",function(){
  var c=pick(["daily step counts (thousands)","lengths of fish caught (cm)","marks on a quiz","laps swum each day"]);
  var n=ri(5,6),base=ri(8,20),data=[],i;for(i=0;i<n;i++)data.push(base+ri(-6,9));
  return numq("Find the <b>range</b> of these "+c+": <b>\\(\\{"+data.join(", ")+"\\}\\)</b>.",
    rngOf(data),0.001,
    "Range <b>\\(= \\text{highest} - \\text{lowest} = "+Math.max.apply(null,data)+" - "+Math.min.apply(null,data)+" = "+rngOf(data)+"\\)</b>.",
    {data:data});
});
E("u5-outlier-range",5,["8.6"],2,"gen",function(){
  var lo=ri(5,10),cluster=[],i;for(i=0;i<5;i++)cluster.push(lo+ri(0,5));
  var out=Math.max.apply(null,cluster)+ri(18,30);var data=shuffle(cluster.concat([out]));
  var without=rngOf(cluster);
  var correct="\\("+out+"\\) is the outlier, and the range without it is \\("+without+"\\)";
  return mcq("For the data set <b>\\(\\{"+data.join(", ")+"\\}\\)</b>, which statement is correct?",correct,
    ["\\("+Math.min.apply(null,data)+"\\) is the outlier, and the range without it is \\("+without+"\\)",
     "\\("+out+"\\) is the outlier, and the range without it is \\("+rngOf(data)+"\\)",
     "There is no outlier, and the range is \\("+rngOf(data)+"\\)"],
    "The value \\("+out+"\\) sits far above the cluster \\(\\{"+cluster.join(", ")+"\\}\\). Without it, the range is \\("+Math.max.apply(null,cluster)+" - "+Math.min.apply(null,cluster)+" = "+without+"\\). With it, the range stretches to \\("+rngOf(data)+"\\), which is why one outlier can make a set look far more spread out than it really is.",
    {data:data,out:out,without:without});
});
E("u5-dispersion-compare",5,["8.6"],2,"gen",function(){
  var ctx=pick([
    {who:"Two couriers",unit:"parcels delivered each day",avg:"average"},
    {who:"Two classes",unit:"marks on the same test",avg:"mean mark"},
    {who:"Two goalies",unit:"saves per game",avg:"average"}]);
  var ra=ri(4,8),rb=ra+ri(12,22),swap=Math.random()<0.5;
  var A=swap?rb:ra,B=swap?ra:rb;
  var winner=A<B?"A":"B";
  return mcq(ctx.who+" both have the same "+ctx.avg+" for "+ctx.unit+". Person A/class A's results have a range of \\("+A+"\\); B's have a range of \\("+B+"\\). Which statement is correct?",
    winner+" is more consistent, because "+winner+"'s results stay closer to the shared "+ctx.avg,
    [(winner==="A"?"B":"A")+" is more consistent, because a larger range means steadier results in the long run",
     "Both are equally consistent, because equal "+ctx.avg+"s mean the spread can be ignored",
     "Consistency cannot be compared without knowing each median value as well"],
    "Both have the same centre, so compare the spread. The smaller range (\\("+Math.min(A,B)+"\\)) means results cluster closer to the "+ctx.avg+" \u2014 that is the more consistent performance. Equal means say nothing about consistency.",
    {A:A,B:B,winner:winner});
});
E("u5-ad-claim",5,["8.6"],3,"gen",function(){
  var base=[ri(4,8),ri(6,10),ri(5,9),ri(8,12),ri(6,9),ri(9,13),ri(7,11)];
  var big=ri(220,360);var data=base.concat([big]);var m=mean(data),md=median(data);
  var claim=Math.round(m);
  return mcq("A gym advertises: \u201COur members lose an average of "+claim+" lb in their first month!\u201D The amounts actually lost by eight members were <b>\\(\\{"+data.join(", ")+"\\}\\)</b> lb. Why is the advertisement misleading?",
    "It uses the mean, which one member's \\("+big+"\\) lb loss pulls far above what a typical member loses (the median loss is \\("+fmt(md)+"\\) lb)",
    ["It uses the median, which one large loss pulls far above the rest, so the median ends up inflated like the advertised figure","The range of the losses is too small to support the claim, because so narrow a range means no one lost enough to lift the average that high","The mode of the losses is higher than the advertised average, because the most common loss sits above what the gym says members lose"],
    "Mean \\(= "+fmt(sum(data))+" \\div 8 = "+fmt(m)+" \\approx "+claim+"\\), so the gym used the mean. But sorted, the middle values give a median of \\("+fmt(md)+"\\) lb \u2014 a far better picture of a typical member. One extreme value did all the work in the ad.",
    {data:data,mean:m,median:md,big:big});
});
/* --- frequency tables, histograms, polygons (8.7) --- */
E("u5-freq-total",5,["8.7"],1,"gen",function(){
  var rows=ri(3,4),fs=[],i;for(i=0;i<rows;i++)fs.push(ri(2,14));
  return numq("A frequency table for the number of siblings students have has frequencies \\("+fs.join(", ")+"\\) in its rows. How many students were surveyed?",
    sum(fs),0.001,"The total frequency is the total number of students: <b>\\("+fs.join(" + ")+" = "+sum(fs)+"\\)</b>.",{fs:fs});
});
E("u5-freq-missing",5,["8.7"],1,"gen",function(){
  var total=pick([40,50,60,45,55]);var a=ri(8,16),b=ri(6,14),c=ri(4,10);var miss=total-a-b-c;
  while(miss<2){a--;miss=total-a-b-c;}
  return numq("A grouped frequency table has a total of "+total+" values. Three of its intervals have frequencies "+a+", "+b+" and "+c+". What is the frequency of the remaining interval?",
    miss,0.001,"The frequencies must add to the total: <b>\\("+total+" - ("+a+" + "+b+" + "+c+") = "+total+" - "+(a+b+c)+" = "+miss+"\\)</b>.",{total:total,a:a,b:b,c:c});
});
E("u5-freq-countin",5,["8.7"],1,"gen",function(){
  var w=pick([5,10]);var lo=ri(0,3)*w;var hi=lo+w;
  var data=[],i;for(i=0;i<18;i++)data.push(ri(0,hi+w+8));
  var cnt=data.filter(function(x){return x>=lo&&x<hi;}).length;
  return numq("Using the class intervals from the course (lower value included, upper value excluded), how many of these values fall in the interval <b>\\("+lo+"\\text{-}"+hi+"\\)</b>?<br><b>\\(\\{"+data.join(", ")+"\\}\\)</b>",
    cnt,0.001,"Count the values that are at least \\("+lo+"\\) and less than \\("+hi+"\\): there are <b>\\("+cnt+"\\)</b>. A value of exactly \\("+hi+"\\) would belong to the next interval, not this one.",{data:data,lo:lo,hi:hi});
});
E("u5-relfreq",5,["8.7"],1,"gen",function(){
  var pcts=[5,10,12.5,15,20,25,30,40,50,60,75,80],totals=[40,60,80,100,120,160,200,240];
  var total,pct,f,guard=0;
  do{total=pick(totals);pct=pick(pcts);f=total*pct/100;guard++;}while(f!==Math.floor(f)&&guard<60);
  var ctx=pick(["In a frequency table, an interval has","In a survey table, the interval with the most responses has","A grouped table of test scores shows an interval with"]);
  return numq(ctx+" frequency \\("+f+"\\) out of a total of \\("+total+"\\) values. What is its <b>relative frequency</b>, as a percent? (Just the number.)",
    pct,0.11,"Relative frequency \\(= \\frac{"+f+"}{"+total+"} = "+fmt(f/total,4)+"\\), which is <b>\\("+fmt(pct)+"\\%\\)</b>.",{f:f,total:total});
});
E("u5-relfreq-rev",5,["8.7"],1,"gen",function(){
  var pcts=[5,10,12.5,15,20,25,30,35,40,45,50,60,75,80],totals=[40,60,80,100,120,150,200,240,300];
  var total,pct,f,guard=0;
  do{total=pick(totals);pct=pick(pcts);f=total*pct/100;guard++;}while(f!==Math.floor(f)&&guard<60);
  var ctx=pick(["An interval's","In a grouped table of marks, one interval's","For the interval containing the middle values, the"]);
  return numq(ctx+" relative frequency is \\("+fmt(pct)+"\\%\\), and the table's total is \\("+total+"\\) values. What is the interval's frequency?",
    f,0.001,"<b>\\("+fmt(pct)+"\\% \\text{ of } "+total+" = "+fmt(pct/100,4)+" \\times "+total+" = "+f+"\\)</b>.",{total:total,pct:pct});
});
E("u5-histogram-read",5,["8.7"],1,"gen",function(){
  var labels=["\\(0\\text{-}9\\)","\\(10\\text{-}19\\)","\\(20\\text{-}29\\)","\\(30\\text{-}39\\)"];var fs=[ri(2,7),ri(8,13),ri(5,10),ri(1,5)];
  var ans=fs[2]+fs[3];
  var rows=labels.map(function(l,i){return "<tr><td>"+l+"</td><td>\\("+fs[i]+"\\)</td></tr>";}).join("");
  return numq("A histogram is built from this table of daily high temperatures recorded over "+sum(fs)+" days:<table><tr><th>Temperature (\u00B0C)</th><th>Frequency</th></tr>"+rows+"</table>On how many days was the high temperature <b>\\(20^\\circ \\text{C}\\) or more</b>?",
    ans,0.001,"Add the frequencies for \\(20\\text{-}29\\) and \\(30\\text{-}39\\): <b>\\("+fs[2]+" + "+fs[3]+" = "+ans+"\\)</b> days.",{fs:fs});
});
E("u5-midpoint",5,["8.7"],1,"gen",function(){
  var w=pick([4,5,10,20]);var lo=ri(0,12)*w;var hi=lo+w-1;var mid=(lo+hi)/2;
  var tail=pick([""," (from a frequency table)"," (from a table of daily high temperatures)"," (from a grouped table of sprint times)"]);
  return numq("What is the <b>midpoint</b> of the interval \\("+lo+"\\text{-}"+hi+"\\)"+tail+"?",
    mid,0.011,"Midpoint <b>\\(= \\frac{"+lo+" + "+hi+"}{2} = "+fmt(mid)+"\\)</b>. A frequency polygon plots each interval's frequency at its midpoint.",{lo:lo,hi:hi});
});
E("u5-polygon-point",5,["8.7"],1,"gen",function(){
  var w=pick([10]);var lo=ri(0,4)*w;var hi=lo+w-1;var mid=(lo+hi)/2;var f=ri(3,12);
  return mcq("A frequency polygon is drawn for a table in which the interval \\("+lo+"\\text{-}"+hi+"\\) has frequency \\("+f+"\\). At which point is that interval's polygon point plotted?",
    "\\(("+fmt(mid)+", "+f+")\\)",
    ["\\(("+lo+", "+f+")\\)","\\(("+hi+", "+f+")\\)","\\(("+f+", "+fmt(mid)+")\\)"],
    "Polygon points go at \\((\\text{midpoint}, \\text{frequency})\\). The midpoint of \\("+lo+"\\text{-}"+hi+"\\) is \\("+fmt(mid)+"\\), so the point is \\(("+fmt(mid)+", "+f+")\\).",
    {lo:lo,hi:hi,mid:mid,f:f});
});
E("u5-histogram-concepts",5,["8.7"],2,"var",varset([
  function(){return mcq("Why do the bars in a histogram touch each other, while the bars in a bar graph do not?",
    "A histogram's intervals are continuous number ranges with no gaps between them; a bar graph shows separate categories",
    ["Histogram bars are always wider than bar graph bars, because bar width is what separates the two graphs","Touching bars make the frequencies easier to add, since bars that touch can be totalled at a glance, unlike separated bars","A histogram has no vertical axis, so the bars join together, because joined bars are how histograms are drawn"],
    "A histogram groups a continuous measurement into intervals that run into each other, so the bars touch. A bar graph compares separate categories, so its bars stay apart.",{});},
  function(){return mcq("Which statement about a histogram is correct?",
    "The exact values are hidden by grouping, so counts per interval can be read but individual values cannot",
    ["The exact data values can be read off the bars, because each bar stands for one central value","The height of each bar is the midpoint of its interval, because a bar rises to the middle value it covers","The bars must all be the same height when the intervals are equal, since equal intervals carry equal counts"],
    "Once values are grouped into an interval, the graph shows only how many fell in \u2014 the individual values are gone. That is the trade-off of grouping.",{});},
  function(){return mcq("A histogram of coffee-shop wait times has its tallest bar over the interval \\(5\\text{-}9\\) minutes. What can you conclude?",
    "More waits fell in the \\(5\\text{-}9\\) minute interval than in any other single interval",
    ["The average wait was exactly \\(7\\) minutes, the midpoint of the tallest bar's interval","Every wait was between \\(5\\) and \\(9\\) minutes, because that bar covers every wait","The longest wait was \\(9\\) minutes, the top of the interval under the tallest bar"],
    "The tallest bar marks the interval with the highest frequency. Grouped bars hide the exact values, so neither the true average nor the longest wait can be read off the graph.",{});}
]));
E("u5-polygon-compare",5,["8.7"],2,"gen",function(){
  var ctx=pick(["ferry routes' passenger counts per crossing","city bus routes' passenger counts per trip","school shuttle routes' rider counts per run","commuter train routes' passenger counts per trip"]);
  var lo1=pick([20,25,30,35,40]),hi1=lo1+9;var bHi=pick([49,59,69,79]);
  return mcq("Two "+ctx+" are drawn as frequency polygons on the same axes. Route A's polygon is tall and narrow, peaked at \\("+lo1+"\\text{-}"+hi1+"\\) passengers. Route B's polygon is low and wide, spread from \\(0\\text{-}9\\) up to \\("+(bHi-9)+"\\text{-}"+bHi+"\\) passengers. Which statement is correct?",
    "Route B's passenger counts are more spread out, because its polygon covers a much wider range of intervals",
    ["Route A carries more passengers in total, because its polygon is taller, and its taller peak means more carried overall","Both routes are equally consistent, because both polygons peak, and a peak in the middle means equal consistency","Route B's mean is \\("+fmt(bHi-4.5,1)+"\\) passengers, the midpoint of its widest interval, so that midpoint is the mean"],
    "A polygon stretched over many intervals means the values vary widely \u2014 Route B is far more spread out. Height alone does not give a total, and a midpoint is not a mean.",{lo1:lo1});
});
/* --- standard deviation (8.8, 8.9, 8.10, 8.16) --- */
E("u5-sd-calc",5,["8.9"],2,"gen",function(){
  var sets=[[4,6,8,10,12],[10,12,14,16],[2,5,8,11,14],[6,9,10,11,14],[15,17,19,21,23],[3,7,8,12,15]];
  var data=pick(sets).map(function(x){return x+ri(0,3);});
  var m=mean(data),v=pvar(data),sd=Math.sqrt(v);
  var devs=data.map(function(x){return fmt(x-m);}).join(", ");
  return numq("Using technology (or the formula), find the <b>population standard deviation</b> of <b>\\(\\{"+data.join(", ")+"\\}\\)</b>, to two decimal places. The mean is \\("+fmt(m)+"\\).",
    Math.round(sd*100)/100,0.011,
    "Deviations from the mean: \\("+devs+"\\). Square them and average: the variance is \\("+fmt(v)+"\\). Then <b>\\(\\sigma = \\sqrt{"+fmt(v)+"} \\approx "+fmt(sd)+"\\)</b>.",
    {data:data});
});
E("u5-sd-from-variance",5,["8.9"],1,"gen",function(){
  var sd=pick([0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,11,12]);var v=sd*sd;
  var frame=pick(["The variance of a data set is \\("+fmt(v)+"\\). What is its <b>standard deviation</b>?",
    "A data set has variance \\("+fmt(v)+"\\). Find its <b>standard deviation</b>.",
    "The scores in a quiz have variance \\("+fmt(v)+"\\). What is the <b>standard deviation</b> of the scores?"]);
  return numq(frame,
    sd,0.011,"Standard deviation is the square root of the variance: <b>\\(\\sqrt{"+fmt(v)+"} = "+fmt(sd)+"\\)</b>.",{v:v});
});
E("u5-sd-meaning",5,["8.8"],1,"var",varset([
  function(){return mcq("What does the standard deviation of a data set measure?",
    "How far the values typically lie from the mean",
    ["The difference between the largest and smallest values","The value in the middle of the data set","How many values the data set contains in total"],
    "Standard deviation is a typical distance from the mean. The largest-minus-smallest description is the range, and the middle value is the median.",{});},
  function(){return mcq("A data set has a standard deviation of \\(0\\). What does that tell you about the set?",
    "Every value in the set is the same",
    ["The mean of the set is \\(0\\) as well","The set contains no values at all","The values are spread as far apart as possible"],
    "If every value equals the mean, every deviation is \\(0\\), so the standard deviation is \\(0\\) \u2014 the set has no spread at all.",{});},
  function(){return mcq("Two sets have the same mean. Set P has a standard deviation of \\(2\\); Set Q has a standard deviation of \\(11\\). What does that tell you?",
    "Set Q's values are spread much farther from the mean than Set P's",
    ["Set Q's values must all be larger than Set P's, because its spread is bigger","Set P has more values than Set Q, so its values are spread out more","Nothing \u2014 standard deviation cannot be compared between sets"],
    "Standard deviation is measured in the data's own units as a typical distance from the mean, so \\(11\\) means far more spread than \\(2\\).",{});}
]));
E("u5-sd-compare",5,["8.8"],2,"gen",function(){
  var m=ri(20,60),d1=pick([2,3]),d2=pick([9,10,12]);
  var A=[m-d1,m,m+d1],B=[m-d2,m,m+d2];var swap=Math.random()<0.5;
  var first=swap?B:A,second=swap?A:B;var wider=swap?"A":"B";
  return mcq("Set A is \\(\\{"+first.join(", ")+"\\}\\). Set B is \\(\\{"+second.join(", ")+"\\}\\). Both sets have mean \\("+m+"\\). Which statement is correct?",
    "Set "+wider+" has the larger standard deviation, because its values lie farther from the mean",
    ["Set "+(wider==="A"?"B":"A")+" has the larger standard deviation, because its values are closer together overall","Both sets have the same standard deviation, because they have the same mean value","Neither set has a standard deviation, because they have only three values each"],
    "Both sets are centred at \\("+m+"\\), but Set "+wider+"'s values sit \\("+(wider==="A"?(swap?d2:d1):(swap?d1:d2))+"\\) units away while the other's sit closer. Farther from the mean means a larger standard deviation, whatever the mean is.",
    {A:A,B:B,wider:wider,m:m});
});
E("u5-sd-interpret",5,["8.10"],2,"gen",function(){
  var ctx=pick([
    {who:"Two bus drivers complete the same route",thing:"times",unit:"minutes",m:ri(25,40)},
    {who:"Two machines fill bottles",thing:"fill amounts",unit:"mL",m:ri(480,520)},
    {who:"Two archers shoot rounds",thing:"scores",unit:"points",m:ri(70,90)}]);
  var small=ri(2,5),big=small+ri(4,8);
  return mcq(ctx.who+" with the same mean (\\("+ctx.m+"\\) "+ctx.unit+"). One has a standard deviation of \\("+small+"\\) "+ctx.unit+"; the other, \\("+big+"\\) "+ctx.unit+". Which one is more consistent, and why?",
    "The one with standard deviation \\("+small+"\\), because a smaller standard deviation means the "+ctx.thing+" cluster closer to the mean",
    ["The one with standard deviation \\("+big+"\\), because a larger standard deviation means steadier "+ctx.thing+" that stay close to the mean","Neither \u2014 consistency cannot be compared when the means are equal, because sets with the same mean must be equally steady","Both are equally consistent, because they share the same mean, and their results stay just as close to that mean"],
    "Consistency is about spread, not centre. A standard deviation of \\("+small+"\\) means results typically land within about \\("+small+"\\) "+ctx.unit+" of the mean \u2014 much steadier than \\("+big+"\\).",
    {small:small,big:big});
});
E("u5-sd-decisions",5,["8.16"],3,"var",varset([
  function(){return mcq("A phone maker is choosing which model to sell with a guarantee that the battery will still be going after \\(20\\) hours of use, or the phone is replaced. Model P has a mean battery life of \\(26\\) hours with a standard deviation of \\(3\\) hours. Model Q has a mean battery life of \\(30\\) hours with a standard deviation of \\(6\\) hours. Which model should produce fewer guarantee replacements?",
    "Model P, because \\(20\\) hours is \\(2\\) standard deviations below its mean, but only about \\(1.7\\) standard deviations below Model Q's mean, so far fewer Model P batteries die early despite the lower mean",
    ["Model Q, because its mean battery life is higher than Model P's by four hours, and the model with the higher mean will always give fewer early failures, no matter how widely its battery lives are spread out","Model Q, because its larger standard deviation means more batteries last far longer than \\(20\\) hours, and those long-lasting batteries are what keep the total number of guarantee replacements down","Both will produce the same number of replacements, because both means are above \\(20\\) hours, and once the mean clears the guarantee mark the spread around that mean makes no difference to early failures"],
    "What matters is how far the guarantee sits below the mean, in standard deviations: P: \\(\\frac{26 - 20}{3} = 2\\); Q: \\(\\frac{30 - 20}{6} \\approx 1.7\\). Model Q's wider spread puts a bigger share of its batteries below \\(20\\) hours.",{a:{m:26,s:3},b:{m:30,s:6},w:20});},
  function(){return mcq("A company is choosing which freezer model to cover with a \\(6\\)-year warranty. Model A has a mean life of \\(9\\) years with a standard deviation of \\(1.5\\) years. Model B has a mean life of \\(11\\) years with a standard deviation of \\(3\\) years. Which model should produce fewer warranty claims?",
    "Model A, because \\(6\\) years is \\(2\\) standard deviations below its mean, but only about \\(1.7\\) standard deviations below Model B's mean, so far fewer Model A units fail early despite the lower mean",
    ["Model B, because its mean life is higher than Model A's by two full years, and the model with the higher mean will always give fewer early failures, no matter how widely its working lives are spread out","Model B, because its larger standard deviation means more of its units last far longer than average, and those long-lived units are what keep the total number of warranty claims down over the years","Both will produce the same number of claims, because both means are above \\(6\\) years, and once the mean clears the warranty mark the spread around that mean makes no difference to early failures"],
    "What matters is how far the warranty sits below the mean, in standard deviations: A: \\(\\frac{9 - 6}{1.5} = 2\\); B: \\(\\frac{11 - 6}{3} \\approx 1.7\\). Model B's wider spread puts a bigger share of its units below \\(6\\) years.",{a:{m:9,s:1.5},b:{m:11,s:3},w:6});},
  function(){return mcq("A seed company guarantees a minimum yield of \\(40\\) bushels per acre, or the farmer's seed is free. Variety A has a mean yield of \\(52\\) bushels per acre with a standard deviation of \\(6\\). Variety B has a mean yield of \\(64\\) bushels per acre with a standard deviation of \\(16\\). Which variety should trigger the guarantee less often?",
    "Variety A, because \\(40\\) bushels is \\(2\\) standard deviations below its mean, but only \\(1.5\\) standard deviations below Variety B's mean, so far fewer of Variety A's fields fall short despite the lower mean",
    ["Variety B, because its mean yield is higher than Variety A's by twelve bushels per acre, and the variety with the higher mean will always fall short less often, no matter how widely its yields are spread out","Variety B, because its larger standard deviation means more fields yield far above \\(40\\) bushels, and those high-yielding fields are what keep the total number of guarantee payouts down across a season","Both will trigger the guarantee equally often, because both means are above \\(40\\) bushels, and once the mean clears the guaranteed minimum the spread around that mean makes no difference to poor fields"],
    "What matters is how far the guaranteed minimum sits below the mean, in standard deviations: A: \\(\\frac{52 - 40}{6} = 2\\); B: \\(\\frac{64 - 40}{16} = 1.5\\). Variety B's wider spread puts a bigger share of its fields below \\(40\\) bushels.",{a:{m:52,s:6},b:{m:64,s:16},w:40});},
  function(){return mcq("A retailer is choosing which brand of washing machine to cover with a \\(7\\)-year warranty. Brand A has a mean life of \\(11\\) years with a standard deviation of \\(2\\) years. Brand B has a mean life of \\(13\\) years with a standard deviation of \\(4\\) years. Which brand should produce fewer warranty claims?",
    "Brand A, because \\(7\\) years is \\(2\\) standard deviations below its mean, but only \\(1.5\\) standard deviations below Brand B's mean, so far fewer Brand A machines fail early despite the lower mean",
    ["Brand B, because its mean life is higher than Brand A's by two full years, and the brand with the higher mean will always give fewer early failures, no matter how widely its machines' lives are spread out","Brand B, because its larger standard deviation means more machines last well beyond \\(7\\) years, and those long-lasting machines are what keep the total number of warranty claims down over the years","Both will produce the same number of claims, because both means are above \\(7\\) years, and once the mean clears the warranty mark the spread around that mean makes no difference to failures"],
    "What matters is how far the warranty sits below the mean, in standard deviations: A: \\(\\frac{11 - 7}{2} = 2\\); B: \\(\\frac{13 - 7}{4} = 1.5\\). Brand B's wider spread puts a bigger share of its machines below \\(7\\) years.",{a:{m:11,s:2},b:{m:13,s:4},w:7});}
]));
/* --- normal curve (8.11-8.14) --- */
E("u5-normal-props",5,["8.11","8.13"],1,"var",varset([
  function(){return mcq("Which statement about a normal distribution is true?",
    "It is symmetric, and its mean, median and mode are all equal",
    ["Its mean is larger than its median, sitting above the middle one","It is skewed to the right, tailing off toward larger values","Its total area under the curve is \\(100\\), not a proportion of one"],
    "A normal curve is a single symmetric hump centred on the mean, so mean = median = mode, and the total area under the curve is \\(1\\) (\\(100\\%\\) of the data).",{});},
  function(){return mcq("Two caf\u00E9s both serve lunch in a mean time of \\(14\\) minutes. Caf\u00E9 A has a standard deviation of \\(2\\) minutes; Caf\u00E9 B, \\(5\\) minutes. What do the two normal curves look like?",
    "Caf\u00E9 A's curve is taller and narrower; Caf\u00E9 B's is shorter and wider, and both are centred at \\(14\\)",
    ["Caf\u00E9 B's curve is taller and narrower, because its times vary more, and more variation raises the peak","Both curves are identical, because the means are equal, and equal means mean equal shapes","Caf\u00E9 A's curve is centred at \\(2\\) and Caf\u00E9 B's at \\(5\\), because each centre is a standard deviation"],
    "Same mean means the same centre. A smaller standard deviation squeezes the data toward the centre, so the curve grows taller and narrower to keep the same total area.",{});},
  function(){return mcq("What does the standard deviation do to the shape of a normal curve?",
    "A larger standard deviation makes the curve wider and flatter; a smaller one makes it taller and narrower",
    ["It moves the curve left or right along the axis, because more spread slides the curve toward larger values","It makes the curve skewed toward the larger values, stretching the side with the larger values out sideways","It has no effect on the shape, only on the labels, because the curve is fixed once the mean is set"],
    "The mean sets the centre; the standard deviation sets the spread, and the curve's width follows it.",{});}
]));
E("u5-isnormal",5,["8.12"],2,"var",varset([
  function(){return mcq("Which data set would be expected to approximate a normal distribution?",
    "The heights of \\(500\\) randomly chosen adults",
    ["The number of pets owned by students in a class","The high temperature on the coldest day of each winter month","The jersey numbers on a hockey team roster"],
    "Heights pile up symmetrically around a central value with fewer and fewer people toward the extremes \u2014 the normal shape. Pet counts are small whole numbers bunched at 0, 1 and 2, and jersey numbers are labels, not measurements.",{});},
  function(){return mcq("A teacher plots her class's marks and gets a histogram with one hump, but the hump leans left with a long tail of low marks stretching down. Does the data approximate a normal distribution?",
    "No \u2014 a normal curve is symmetric, and this distribution is skewed by the tail of low marks",
    ["Yes \u2014 any single-humped histogram is normal, and this one has a single clear hump","Yes \u2014 the tail proves the standard deviation is large, and large spread makes data normal","No \u2014 normal data can never come from a class of students, because class marks are always skewed"],
    "Symmetry is the test. A long tail on one side means the data are skewed, however the rest looks; a normal curve's two halves mirror each other.",{});},
  function(){return mcq("Which is the best first check of whether a data set approximates a normal distribution?",
    "Graph it and look for a single-peaked, roughly symmetric bell shape centred near the mean and median",
    ["Check that the standard deviation is larger than the mean, because normal data spread wider","Check that there are exactly \\(100\\) values in the set, because a normal shape needs that many values","Check that the highest and lowest values are equal, because the extremes of a normal distribution match"],
    "Normal data announce themselves in the graph: one peak, mirror-image sides, and centre measures that nearly coincide.",{});}
]));
E("u5-compare-normal",5,["8.13"],2,"gen",function(){
  var m=ri(10,20),s1=ri(1,3),s2=s1+ri(2,4);
  var q = mcq("Two bakeries' morning prep times are normally distributed with the same mean, \\("+m+"\\) minutes. Bakery A has a standard deviation of \\("+s1+"\\) minutes; Bakery B, \\("+s2+"\\) minutes. Which statement is correct?",
    "Bakery B's times are more spread out, and its curve is wider and flatter",
    ["Bakery A is more spread out, because a small standard deviation means more variation","Both bakeries are equally consistent, because their means are equal here","Bakery B must have the higher mean, because its standard deviation is larger"],
    "The standard deviation is the spread. \\("+s2+" > "+s1+"\\), so Bakery B varies more, and its normal curve spreads wider and flatter to keep the same area.",{m:m,s1:s1,s2:s2});
  q.figure = normSVG({mu:m, sd:s1, curve2:{sd:s2, tagA:"A: \u03C3 = "+s1, tagB:"B: \u03C3 = "+s2}});
  return q;
});
E("u5-empirical",5,["8.14"],1,"gen",function(){
  var ctx=pick([{w:"mass of loaves of bread",u:"g"},{w:"lifespan of a brand of battery",u:"hours"},{w:"finishing times in a fun run",u:"minutes"},{w:"length of fish of one species",u:"cm"}]);
  var mu=ri(20,60)*10,sd=pick([5,10,15,20]);var k=pick([1,2]);var pct=k===1?68:95;
  var q = numq("The "+ctx.w+" is normally distributed with mean \\("+mu+"\\) "+ctx.u+" and standard deviation \\("+sd+"\\) "+ctx.u+". About what percent of the values lie between \\("+(mu-k*sd)+"\\) and \\("+(mu+k*sd)+"\\) "+ctx.u+"? (Just the number.)",
    pct,0.01,"That interval is the mean \\(\\pm "+k+"\\) standard deviation"+(k>1?"s":"")+". By the empirical rule, about <b>\\("+pct+"\\%\\)</b> of a normal distribution lies within \\("+k+"\\) standard deviation"+(k>1?"s":"")+" of the mean.",{mu:mu,sd:sd,k:k});
  q.figure = normSVG({mu:mu, sd:sd, lo:mu-k*sd, hi:mu+k*sd});
  return q;
});
E("u5-normal-count",5,["8.14"],2,"gen",function(){
  var N=pick([400,800,1000,2000]);var mu=ri(30,60),sd=pick([4,5,6,8,10]);
  var side=Math.random()<0.5;var ans=side?0.16*N:0.025*N;var thr=side?mu+sd:mu+2*sd;
  var q = numq("Heights of seedlings are normally distributed with mean \\("+mu+"\\) cm and standard deviation \\("+sd+"\\) cm. Out of "+N+" seedlings, about how many are taller than \\("+thr+"\\) cm?",
    Math.round(ans),N*0.01+1,"Above the mean \\(+ "+(side?1:2)+"\\) standard deviation"+(side?"":"s")+" lies about \\("+(side?"16\\%":"2.5\\%")+"\\) of a normal distribution (half of the \\("+(side?"32\\%":"5\\%")+"\\) outside \\(\\pm "+(side?1:2)+"\\sigma\\)). <b>\\("+(side?"0.16":"0.025")+" \\times "+N+" = "+Math.round(ans)+"\\)</b>.",{N:N,mu:mu,sd:sd});
  q.figure = normSVG({mu:mu, sd:sd, lo:thr, hi:mu+3.4*sd, cuts:[{v:thr, label:""+thr}]});
  return q;
});
/* --- z-scores (8.15) --- */
E("u5-z-calc",5,["8.15"],1,"gen",function(){
  var mu=ri(30,80),sd=pick([4,5,8,10]);var zd=pick([-2,-1.5,-1,-0.5,0.5,1,1.5,2,2.5]);var x=mu+zd*sd;
  return numq("A value of \\("+x+"\\) comes from a normal distribution with mean \\("+mu+"\\) and standard deviation \\("+sd+"\\). What is its <b>z-score</b>?",
    zd,0.011,"<b>\\(z = \\frac{"+x+" - "+mu+"}{"+sd+"} = "+fmt(zd)+"\\)</b>. The z-score counts how many standard deviations the value sits from the mean.",{mu:mu,sd:sd,x:x});
});
E("u5-z-compare",5,["8.15"],2,"gen",function(){
  var people=[["Alex","Sam"],["Priya","Noor"],["Jack","Owen"],["Mia","Ella"],["Liam","Lucas"]];
  var pr=pick(people);
  function mk(){var mu=ri(55,75),sd=pick([5,8,10]),z=pick([0.5,1,1.5,2,2.5]);return {mu:mu,sd:sd,z:z,x:mu+z*sd};}
  var a=mk(),b=mk(),guard=0;while(b.z===a.z&&guard++<20){b=mk();}
  var winner=a.z>b.z?pr[0]:pr[1];
  return mcq(pr[0]+" scored \\("+a.x+"\\) on a test with mean \\("+a.mu+"\\) and standard deviation \\("+a.sd+"\\). "+pr[1]+" scored \\("+b.x+"\\) on a different test with mean \\("+b.mu+"\\) and standard deviation \\("+b.sd+"\\). Who did better, relative to their class?",
    winner+", with a z-score of \\("+fmt(Math.max(a.z,b.z))+"\\) compared to \\("+fmt(Math.min(a.z,b.z))+"\\)",
    [(winner===pr[0]?pr[1]:pr[0])+", because that raw score is on the harder test","They did equally well, both above their means","The higher raw mark, since z-scores ignore class results"],
    pr[0]+"'s \\(z = \\frac{"+a.x+" - "+a.mu+"}{"+a.sd+"} = "+fmt(a.z)+"\\); "+pr[1]+"'s \\(z = \\frac{"+b.x+" - "+b.mu+"}{"+b.sd+"} = "+fmt(b.z)+"\\). Z-scores put both on the same scale, and "+winner+"'s is higher.",{a:a,b:b,winner:winner});
});
E("u5-z-backwards",5,["8.15"],2,"gen",function(){
  var mu=ri(30,60),sd=pick([4,6,8]);var z=pick([1.5,1.8,2,-1.5,0.8]);var x=mu+z*sd;
  return numq("Tomato plants in a greenhouse have heights with mean \\("+mu+"\\) cm and standard deviation \\("+sd+"\\) cm. A plant is \\("+fmt(Math.abs(z))+"\\) standard deviations "+(z>=0?"above":"below")+" the mean. How tall is the plant, in cm?",
    Math.round(x*10)/10,0.06,"Work backwards: <b>\\(x = \\mu + z\\sigma = "+mu+" + ("+fmt(z)+")("+sd+") = "+fmt(x)+"\\)</b> cm.",{mu:mu,sd:sd,z:z});
});
E("u5-z-prob",5,["8.15"],1,"gen",function(){
  var mags=[0.25,0.3,0.5,0.6,0.64,0.75,0.85,0.9,1,1.18,1.2,1.25,1.5,1.75,1.8,1.86,1.97,2,2.1,2.25,2.4,2.5,2.8];
  var a=pick(mags)*(Math.random()<0.5?-1:1);
  var right=Math.random()<0.4;var cdf=zTab(a);var ans=right?Math.round((1-cdf)*10000)/10000:cdf;
  var lead=pick(["Using the standard normal table, find","For the standard normal distribution, find"]);
  var q = numq(lead+" \\(P(z "+(right?">":"<")+" "+fmt(a)+")\\). Give your answer as a decimal to four places (for example, 0.1234).",
    ans,0.0011,"The table gives the area to the left: \\(P(z < "+fmt(a)+") = "+fmtF(cdf,4)+"\\)"+(right?". The right tail is <b>\\(1 - "+fmtF(cdf,4)+" = "+fmtF(ans,4)+"\\)</b>":"."),{a:a,right:right});
  q.figure = normSVG({mu:0, sd:1, lo:(right? a : -3.4), hi:(right? 3.4 : a), cuts:[{v:a, label:"z = "+fmt(a)}]});
  return q;
});
E("u5-z-applied",5,["8.15"],2,"gen",function(){
  var FAMS=[
    {w:"amount of sleep teenagers get on school nights",unit:"hours",mus:[[7.2,0.8],[7.6,0.9],[8.1,0.7],[6.9,1.1]],hi:{verb:"sleep at least",zs:[1,1.5,2]},lo:{verb:"sleep less than",zs:[-1,-1.5,-2]}},
    {w:"lifetimes of a brand of light bulb",unit:"hours",mus:[[1200,90],[1100,120],[1350,75],[1000,150]],hi:{verb:"last at least",zs:[1,1.5,2]},lo:{verb:"burn out in less than",zs:[-1,-1.25,-2]}},
    {w:"masses of bags of apples",unit:"kg",mus:[[2.5,0.3],[3,0.4],[4.2,0.5],[1.8,0.25]],hi:{verb:"weigh at least",zs:[1,1.5,2.5]},lo:{verb:"weigh less than",zs:[-1,-1.5,-2]}},
    {w:"scores on a provincial exam",unit:"points",mus:[[68,9],[72,8],[65,11],[75,10]],hi:{verb:"score at least",zs:[1,1.5,2]},lo:{verb:"score less than",zs:[-1,-1.5,-2]}},
    {w:"morning commute times for city workers",unit:"minutes",mus:[[38,7],[42,9],[35,6],[47,10]],hi:{verb:"take at least",zs:[1,1.5,2]},lo:{verb:"take less than",zs:[-1,-1.5,-2]}},
    {w:"heights of tomato plants",unit:"cm",mus:[[54,6],[61,7.5],[48,5],[57,8]],hi:{verb:"grow to at least",zs:[1,1.5,2]},lo:{verb:"grow to less than",zs:[-1,-1.5,-2]}}
  ];
  var fam=pick(FAMS);var ms=pick(fam.mus);var mu=ms[0],sd=ms[1];
  var up=Math.random()<0.5;var dir=up?fam.hi:fam.lo;var z0=pick(dir.zs);
  var thr=Math.round((mu+z0*sd)*10)/10;
  var z=(thr-mu)/sd;var cdf=zTab(z);var p=up?1-cdf:cdf;var pct=Math.round(p*10000)/100;
  return numq("Values for "+fam.w+" are normally distributed with mean \\("+fmt(mu)+"\\) "+fam.unit+" and standard deviation \\("+fmt(sd)+"\\) "+fam.unit+". What percent (to two decimal places) "+dir.verb+" \\("+fmt(thr,1)+"\\) "+fam.unit+"? (Just the number.)",
    pct,0.06,"\\(z = \\frac{"+fmt(thr,1)+" - "+fmt(mu)+"}{"+fmt(sd)+"} = "+fmt(z)+"\\). From the table, the area "+(up?"to the right of":"to the left of")+" \\(z = "+fmt(z)+"\\) is \\("+fmt(p,4)+"\\), about <b>\\("+fmt(pct)+"\\%\\)</b>.",{ctx:{thr:thr,mu:mu,sd:sd,verb:dir.verb}});
});
/* --- confidence intervals (8.17-8.22) --- */
E("u5-ci-endpoint",5,["8.17"],1,"gen",function(){
  var p=pick([52,57,63,68,74,81]);var moe=Math.round(rf(3,7)*2)/2;var askUp=Math.random()<0.5;
  var ans=askUp?p+moe:p-moe;
  return numq("A survey reports that \\("+p+"\\%\\) of residents support a new rink, with a margin of error of \\(\\pm "+fmt(moe)+"\\) percentage points. What is the "+(askUp?"upper":"lower")+" endpoint of the confidence interval, as a percent? (Just the number.)",
    ans,0.011,"Confidence interval \\(= "+p+"\\% \\pm "+fmt(moe)+"\\), so the interval runs from \\("+fmt(p-moe)+"\\% \\text{ to } "+fmt(p+moe)+"\\%\\). The "+(askUp?"upper":"lower")+" endpoint is <b>\\("+fmt(ans)+"\\%\\)</b>.",{p:p,moe:moe,askUp:askUp});
});
E("u5-ci-from-endpoints",5,["8.17"],1,"gen",function(){
  var fam=pick([
    {pre:"A \\(95\\%\\) confidence interval for the percentage of residents who support a new arena runs from ",unit:"%",mus:[38,42.5,47,51.5,55,58.5,63,67,71.5,74],halfs:[1.8,2.4,2.9,3.1,3.6,4.2,4.8]},
    {pre:"A \\(95\\%\\) confidence interval for mean battery life runs from ",unit:" hours",mus:[16.5,17.6,18.4,19.2,20.5,22.8],halfs:[0.6,0.8,1.1,1.4,1.9,2.3]},
    {pre:"A \\(95\\%\\) confidence interval for the mean quiz score runs from ",unit:" points",mus:[71.5,74,76.5,79,82.5],halfs:[1.5,2,2.6,3.4,4.1]}]);
  var mid=pick(fam.mus),half=pick(fam.halfs);var askMoe=Math.random()<0.5;
  var ep=function(v){return "\\("+fmt(v)+(fam.unit==="%"?"\\%":"")+"\\)";};
  return numq(fam.pre+ep(mid-half)+(fam.unit==="%"?"":fam.unit)+" to "+ep(mid+half)+(fam.unit==="%"?"":fam.unit)+". What is the "+(askMoe?"margin of error":"mean at the centre of the interval")+"?",
    askMoe?half:mid,0.011,"The interval is centred at \\(\\frac{"+fmt(mid-half)+" + "+fmt(mid+half)+"}{2} = "+fmt(mid)+"\\), and it stretches \\("+fmt(half)+"\\) each way, so the margin of error is \\(\\pm "+fmt(half)+"\\). The "+(askMoe?"margin of error":"centre")+" is <b>\\("+fmt(askMoe?half:mid)+"\\)</b>.",{mid:mid,half:half,askMoe:askMoe});
});
E("u5-ci-count",5,["8.19"],2,"gen",function(){
  var p=ri(52,68),moe=pick([3,4,5]);var N=pick([800,1200,2000,18000]);var askMax=Math.random()<0.5;
  var ans=Math.round(N*(askMax?p+moe:p-moe)/100);
  return numq("In a town of "+N+" voters, a poll finds \\("+p+"\\% \\pm "+moe+"\\) support a proposal. About how many voters is the "+(askMax?"largest":"smallest")+" plausible number of supporters?",
    ans,N*0.002+1,"The interval is \\("+(p-moe)+"\\% \\text{ to } "+(p+moe)+"\\%\\). The "+(askMax?"top":"bottom")+" end is <b>\\("+(askMax?p+moe:p-moe)+"\\% \\text{ of } "+N+" = "+ans+"\\)</b> voters.",{p:p,moe:moe,N:N,askMax:askMax});
});
E("u5-ci-samplesize",5,["8.18"],1,"var",varset([
  function(){return mcq("The same survey is run three times with random samples of \\(25\\), \\(250\\) and \\(2{,}500\\) people. Which sample gives the smallest margin of error, and why?",
    "The sample of \\(2{,}500\\) \u2014 larger random samples vary less from the population value, so the interval narrows",
    ["The sample of \\(25\\) \u2014 fewer people means fewer mistakes, and each person asked counts for more in the result","All three give the same margin of error, because the survey is the same and the question wording never changes at all","The sample of \\(250\\) \u2014 medium samples are the most reliable, because they balance the small samples and the large ones"],
    "Margin of error shrinks as the sample grows: more data averages out the randomness. (Roughly, multiplying the sample by \\(100\\) divides the margin of error by \\(10\\).)",{});},
  function(){return mcq("A town polls 80 riders and finds \\(58\\% \\pm 10\\%\\) use the bus daily. It polls 800 riders and gets \\(58\\% \\pm 3\\%\\). What changed?",
    "The larger sample narrowed the margin of error, so the estimate is more precise",
    ["The larger sample changed the true percentage of riders who use the bus daily overall","The margin of error grew because more people were asked and answered","Nothing \u2014 the percentages are the same, so both polls say the same thing"],
    "Same centre, tighter interval: \\(55\\% \\text{ to } 61\\%\\) instead of \\(48\\% \\text{ to } 68\\%\\). Bigger random samples pin the value down more closely.",{});},
  function(){return mcq("A polling firm wants to cut its margin of error roughly in half. What should it do to its sample?",
    "Use a much larger random sample \u2014 roughly four times as many people, because the margin of error shrinks with the square root of the sample size",
    ["Ask exactly twice as many people \u2014 double the sample, half the error, because the margin shrinks in direct proportion to the sample size each time","Survey the same people twice and average the two results, because asking twice gives the firm twice as much information as asking once","Nothing \u2014 the sample size does not affect the margin of error, because the margin is set by the question and by how the firm reports it"],
    "Margin of error behaves like \\(\\frac{1}{\\sqrt{n}}\\): quadrupling \\(n\\) halves it. Doubling the sample only shrinks it by a factor of about \\(1.4\\).",{});}
,
function(){return mcq("Four surveys ask the same question using random samples of \\(120\\), \\(480\\), \\(1{,}200\\) and \\(3{,}000\\) people. Which sample gives the LEAST margin of error?",
    "\\(3{,}000\\) \u2014 the largest sample, so its results vary least from the population value",
    ["\\(120\\) \u2014 the smallest sample has the least room for error, because fewer answers can go wrong","\\(480\\) \u2014 a medium sample balances cost and accuracy, and middle samples are the most reliable","All four give the same margin of error \u2014 only the question matters, nothing else"],
    "Larger random samples sit closer to the population value, so their margins of error are smaller.",{});},
  function(){return mcq("Four surveys ask the same question using random samples of \\(45\\), \\(180\\), \\(720\\) and \\(1{,}500\\) people. Which sample gives the GREATEST margin of error?",
    "\\(45\\) \u2014 the smallest sample, so it can stray furthest from the population value",
    ["\\(1{,}500\\) \u2014 the largest sample has the most room for error, because more people answer","\\(720\\) \u2014 a medium sample is the least stable, sitting between the two","All four give the same margin of error \u2014 only the question matters, and it never changes"],
    "Small samples bounce around more: with only \\(45\\) people, the sample percentage can land far from the true one, which is exactly what a big margin of error says.",{});},
  function(){return mcq("Instead of sampling, a town surveys EVERY household \u2014 a census. What happens to the margin of error?",
    "There is no sampling margin of error \u2014 the count IS the population value, so there is no sampling gap to allow for",
    ["It doubles, because there are more responses to process and each one adds its own sampling error to the total","It stays whatever it would be for a sample of \\(1{,}000\\), because a census is counted just like any other survey","It becomes \\(100\\%\\), because the whole population was asked and the margin grows to match the population size in the end"],
    "Margin of error exists because a sample might not mirror the population. Survey everyone and that particular uncertainty disappears (people can still misreport, but that is a different problem).",{});}
]));
E("u5-ci-level",5,["8.18"],2,"var",varset([
  function(){return mcq("A researcher recomputes the same survey results at a \\(99\\%\\) confidence level instead of \\(95\\%\\). What happens to the interval?",
    "It gets wider \u2014 being right more often requires allowing a bigger range",
    ["It gets narrower \u2014 higher confidence means a better estimate","It stays the same \u2014 the confidence level does not affect the interval","The centre moves to \\(99\\%\\) - the interval shifts up with the level too"],
    "There is a trade-off: to capture the true value \\(99\\) times out of \\(100\\) instead of \\(95\\), the interval must stretch. Higher confidence, wider interval, same centre.",{});},
  function(){return mcq("What does a \\(95\\%\\) confidence level mean?",
    "In the long run, intervals built this way capture the true population value about \\(95\\) times out of \\(100\\) (\\(19\\) times out of \\(20\\))",
    ["\\(95\\%\\) of the sample agreed with the result, and the rest of the sample gave the opposite answer to the same question","There is a \\(95\\%\\) chance this one interval is exactly centred on the true value, and the rest of the chance is that it misses entirely","\\(95\\%\\) of the population was surveyed, so the result covers nearly every person in the group being described in the study"],
    "The \\(95\\%\\) describes the method's long-run success rate: repeat the survey many times and about \\(19\\) of every \\(20\\) intervals contain the true value.",{});},
  function(){return mcq("Two reports use the SAME survey. One gives a \\(90\\%\\) confidence interval of \\(51\\% \\pm 3\\%\\). The other gives a \\(99\\%\\) interval from the same data. What must be true of the \\(99\\%\\) interval?",
    "Its margin of error is larger than \\(3\\%\\) \u2014 higher confidence is bought with a wider interval",
    ["Its margin of error is smaller than \\(3\\%\\) - higher confidence gives a tighter interval estimate","It is centred on a different percentage, because a new level moves the centre too","It must be wrong, because a survey produces only one correct interval for its data"],
    "Same data, same centre (\\(51\\%\\)). Raising the confidence level stretches the interval both ways, so the margin of error grows past \\(3\\%\\).",{});}
,
function(){return mcq("Intervals are computed from the SAME survey data at \\(90\\%\\), \\(95\\%\\) and \\(99\\%\\) confidence. Which statement is true?",
    "All three are centred on the same value; the \\(99\\%\\) interval is the widest and the \\(90\\%\\) interval is the narrowest",
    ["The \\(99\\%\\) interval is the narrowest, because it is the most certain, and the most certain interval is always the tightest one","Each confidence level gives an interval centred on a different value, because the centre is worked out again for each level","Only the \\(95\\%\\) interval can be correct, because the other two levels are not the standard ones used in reports"],
    "The centre comes from the data and does not move. Demanding more confidence stretches the interval wider around that same centre.",{});},
  function(){return mcq("A weather station reports mean June rainfall as \\(84\\) mm, with a \\(95\\%\\) confidence interval of \\(78\\) mm to \\(90\\) mm. If the SAME data were reported at \\(99\\%\\) confidence, what would the interval look like?",
    "Still centred on \\(84\\) mm, but wider than \\(78\\) mm to \\(90\\) mm",
    ["Still centred on \\(84\\) mm, but narrower \u2014 about \\(80\\) mm to \\(88\\) mm","Centred on \\(99\\) mm instead of \\(84\\) mm, with the same width","Exactly the same: \\(78\\) mm to \\(90\\) mm, because nothing changes"],
    "Raising the confidence level never moves the centre and never narrows the interval \u2014 it widens it, so the method captures the true value more often.",{});}
]));
E("u5-ci-majority",5,["8.19","8.21"],3,"gen",function(){
  var supported=Math.random()<0.5;var p,moe;
  if(supported){moe=pick([2,3,4]);p=ri(50+moe+2,68);}else{moe=pick([4,5,6]);p=ri(51,49+moe);}
  var lo=p-moe,hi=p+moe;
  return mcq("A headline announces: \u201CMost teens support a later school start time!\u201D The survey behind it found \\("+p+"\\%\\) support, with a margin of error of \\(\\pm "+moe+"\\) points. Is the headline justified?",
    supported?"Yes \u2014 the whole interval, \\("+lo+"\\% \\text{ to } "+hi+"\\%\\), sits above \\(50\\%\\), so a majority is plausible throughout":"No \u2014 the interval, \\("+lo+"\\% \\text{ to } "+hi+"\\%\\), dips below \\(50\\%\\), so support could actually be a minority",
    [supported?"No \u2014 surveys can never justify the word \u2018most\u2019, however far above half the reported figure sits":"Yes \u2014 \\("+p+"\\%\\) is more than half, and that settles it, so the headline can treat it as settled fact",
     "Yes \u2014 the margin of error is small enough to ignore, because a few points change nothing","The headline is justified only if the sample was larger than \\(1{,}000\\), since small samples cannot support it"],
    "\u2018Most\u2019 means more than \\(50\\%\\). The interval runs \\("+lo+"\\% \\text{ to } "+hi+"\\%\\)"+(supported?", entirely above \\(50\\%\\), so the claim holds up.":", and it crosses below \\(50\\%\\), so the honest headline is \u2018about half of teens support\u2026\u2019.")+" Always check whether the whole interval clears the claim's bar.",
    {p:p,moe:moe,supported:supported});
});
E("u5-media",5,["8.20","8.21","8.22"],3,"var",varset([
  function(){return mcq("A news report says support for a new ferry sailing is \\(56\\%\\) and calls it \u2018overwhelming\u2019. The poll's margin of error is \\(\\pm 6\\) points. What is the fairest criticism?",
    "\u2018Overwhelmingly\u2019 is too strong \u2014 the interval \\(50\\% \\text{ to } 62\\%\\) is consistent with support being barely half",
    ["The report is fine, because \\(56\\%\\) is a majority, and a result above half can fairly be called overwhelming","The poll must be wrong, because its margin of error is positive, and any margin above zero makes the figure untrustworthy","Nothing \u2014 word choice does not matter in statistics, so reporters may use whatever words seem strongest"],
    "\\(56\\% \\pm 6\\) gives \\(50\\% \\text{ to } 62\\%\\). A result that could be a coin-flip is real support, but \u2018overwhelming\u2019 overstates what the numbers carry.",{});},
  function(){return mcq("A toothpaste ad announces: \u2018Nine out of ten dentists recommend our brand!\u2019 The fine print reveals the survey behind it: the company asked \\(10\\) dentists, every one of them a paid consultant for the company, and \\(9\\) said yes. Does the claim hold up as evidence about dentists in general?",
    "No \u2014 the \u2018sample\u2019 is \\(10\\) dentists hand-picked and paid by the company itself, so the result says nothing reliable about dentists in general",
    ["Yes \u2014 \\(9\\) out of \\(10\\) is \\(90\\%\\), an overwhelming majority of dentists, and a result that one-sided settles the question for dentists everywhere","Yes \u2014 dentists are experts, so their answers settle the question completely, and expert surveys need no fair sample behind them","No \u2014 \\(9\\) out of \\(10\\) cannot be turned into a percentage, so the claim is meaningless as evidence about dentists in general"],
    "A result is only as good as the sample behind it. Ten people chosen by the seller, with a financial tie to the company, are not a fair sample of dentists \u2014 \u20189 out of 10\u2019 describes those \\(10\\) consultants, not the profession.",{});},
  function(){return mcq("A radio station asks listeners to text in whether the town should build a new arena. More than \\(4{,}000\\) texts come in, and \\(78\\%\\) of them say yes. The station reports: \u2018The town strongly supports the arena.\u2019 Does the claim hold up?",
    "No \u2014 the respondents chose themselves, so \\(78\\%\\) measures the station's motivated listeners, not the town; the sample does not represent the population",
    ["Yes \u2014 \\(78\\%\\) is a large majority, so the town clearly supports the arena, and a share that large leaves no doubt where the town stands","Yes \u2014 over \\(4{,}000\\) responses is a big sample, and big samples are reliable, because a sample that large must reflect the whole town, whoever took part","No \u2014 a vote taken after dark cannot count toward a town decision, because responses sent in at night are no valid part of a town survey"],
    "Size is not the issue \u2014 who got counted is. A text-in poll only hears from people who listen to that station and felt strongly enough to respond, so the \\(78\\%\\) cannot be extended to the whole town. A much smaller random sample would say far more.",{});},
  function(){return mcq("A community garden group reports: \u2018In our survey of 300 residents, \\(67\\% \\pm 4\\) support expanding the garden.\u2019 A councillor says the survey proves most residents support the expansion. Is the councillor right?",
    "Yes \u2014 the interval \\(63\\% \\text{ to } 71\\%\\) lies entirely above \\(50\\%\\), so a majority is supported throughout the interval",
    ["No \u2014 \\(67\\%\\) of a sample never proves anything about residents, because a sample describes only its respondents","No \u2014 the margin of error means support could be under half, since the margin can pull the true figure below half in the end","Yes \u2014 but only because \\(300\\) is a large sample, since a sample that size makes the result exact for the town"],
    "The whole confidence interval clears \\(50\\%\\), so the majority claim is as solid as polling gets: the plausible range for true support is \\(63\\% \\text{ to } 71\\%\\).",{});}
]));
E("u5-interpret-ci",5,["8.21"],2,"var",varset([
  function(){return mcq("A poll reports a candidate at \\(49\\%\\) with a margin of error of \\(\\pm 3.1\\) points, \\(19\\) times out of \\(20\\). What is the correct reading?",
    "The candidate's true support is plausibly between \\(45.9\\%\\) and \\(52.1\\%\\), and intervals built this way are right about \\(19\\) times in \\(20\\)",
    ["The candidate will get exactly \\(49\\%\\) of the vote on election day, because a poll's percentage is what the election will produce","The candidate is definitely behind, because \\(49\\%\\) is less than half, and a figure below half can never finish ahead once the votes are counted","The margin of error means the poll is off by exactly \\(3.1\\) points, because the margin states the poll's exact error in advance"],
    "Add and subtract the margin of error: \\(45.9\\% \\text{ to } 52.1\\%\\). The \u2018\\(19\\) times out of \\(20\\)\u2019 is the confidence level \u2014 the method's long-run record, not a guarantee for this one poll.",{p:49,moe:3.1});},
  function(){return mcq("A city survey of 400 adults finds \\(62\\%\\) support a new compost pickup, with a margin of error of \\(\\pm 4.9\\) points, \\(19\\) times out of \\(20\\). What is the correct reading?",
    "True support is plausibly between \\(57.1\\%\\) and \\(66.9\\%\\), and intervals built this way contain the truth about \\(19\\) times in \\(20\\)",
    ["Exactly \\(62\\%\\) of all adults in the city support the pickup, because the sample percentage is the whole city's percentage too","Support is certainly between \\(57.1\\%\\) and \\(66.9\\%\\) \u2014 the survey method cannot miss, and the method behind it cannot miss the truth","The result is off by exactly \\(4.9\\) people out of the \\(400\\) surveyed, because the margin counts the people the survey got wrong"],
    "Add and subtract the margin of error: \\(62 - 4.9 = 57.1\\) and \\(62 + 4.9 = 66.9\\). \u2018\\(19\\) times out of \\(20\\)\u2019 describes the method's long-run success rate, not a promise about this one survey.",{p:62,moe:4.9});},
  function(){return mcq("A poll reports \\(38\\%\\) of voters preferring a four-day school week, with a margin of error of \\(\\pm 3\\) points, \\(19\\) times out of \\(20\\). Which statement is correct?",
    "The true share of all voters who prefer it is plausibly somewhere from \\(35\\%\\) to \\(41\\%\\)",
    ["There is a \\(95\\%\\) chance the true share is exactly \\(38\\%\\), as the level guarantees","The share of all voters is \\(38\\%\\), give or take exactly \\(3\\) people in the end","Any result outside \\(35\\%\\) to \\(41\\%\\) would prove the poll was rigged, without any exception"],
    "The confidence interval is \\(38 \\pm 3\\), that is \\(35\\% \\text{ to } 41\\%\\). It is a plausible range for the true value, built by a method that works about \\(19\\) times in \\(20\\) \u2014 not a certainty and not a count of people.",{p:38,moe:3});}
]));

/* ----- bank-u1.js ----- */
// Math 2201 Unit 1: Acute Triangle Trigonometry question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1204 to 1279).
// CRMARKS: u1-sine-side=2
// CRMARKS: u1-sine-angle=2
// CRMARKS: u1-cosine-side=2
// CRMARKS: u1-cosine-angle=2
// CRMARKS: u1-two-triangles=4
/* ============ Unit 1: Acute Triangle Trigonometry ============ */
function angFmt(x){return fmt(x,1)+"\u00B0";}
E("u1-law-choice",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("In triangle ABC you know two angles and the side between them. Which law starts the solution?",
    "The sine law \u2014 an angle and its opposite side form a complete pair",
    ["The cosine law \u2014 it needs no angles, so the known pair does not matter","The tangent ratio \u2014 it works in any triangle, right-angled or not","The Pythagorean theorem \u2014 first find the third angle from the two given"],
    "Two angles give the third by the angle sum, and the known side sits opposite a known angle: a complete sine-law pair. (Pythagoras and the tangent ratio are for right triangles only.)",{});},
  function(){return mcq("In triangle PQR you know two sides and the angle between them, and you need the third side. Which law do you use?",
    "The cosine law \u2014 it is built for the side-angle-side case",
    ["The sine law \u2014 it only needs the two sides and no other information","The sine law, after splitting the triangle in two parts","The Pythagorean theorem, because two sides are known and that is enough here"],
    "With no angle-opposite-side pair, the sine law has nothing to anchor to. The cosine law, \\(c^2 = a^2 + b^2 - 2ab\\cos C\\), handles SAS directly.",{});},
  function(){return mcq("You know all three sides of an acute triangle and need its largest angle. Which law, and why?",
    "The cosine law, rearranged \u2014 it is the only one that uses three sides to give an angle",
    ["The sine law, because three sides give three ratios to set equal for the angle","The tangent ratio, using the two longest sides as the opposite and adjacent pair","No law is needed — the largest angle is always \\(90^\\circ\\) in a triangle with three known sides"],
    "\\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\) uses exactly the three sides. The largest angle sits opposite the longest side.",{});}
,
function(){var q = mcq("In triangle ABC, a diagram marks side \\(a = 9\\text{ cm}\\) (opposite angle \\(A\\)), side \\(b = 7\\text{ cm}\\), and angle \\(A = 35^\\circ\\). Which set-up finds angle B?",
    "\\(\\frac{\\sin B}{7} = \\frac{\\sin 35^\\circ}{9}\\) — each angle is paired with the side opposite it",
    ["\\(\\frac{\\sin B}{9} = \\frac{\\sin 35^\\circ}{7}\\) \u2014 the marked sides stay with their marked angles","\\(b^2 = a^2 + c^2 - 2ac\\cos B\\) — the cosine law, because two sides are known","\\(\\tan B = \\frac{7}{9}\\) — opposite over adjacent in the marked triangle"],
    "The sine law pairs each side with the sine of its OPPOSITE angle: \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B}\\), so \\(\\frac{9}{\\sin 35^\\circ} = \\frac{7}{\\sin B}\\). The first trap swaps the pairing; the cosine law would need the side between the two known sides' angle, which is not what is marked.",{});q.figure=(function(){var Bv=Math.asin(7*Math.sin(35*Math.PI/180)/9)*180/Math.PI;return triSVG(9, 7, 9*Math.sin((180-35-Bv)*Math.PI/180)/Math.sin(35*Math.PI/180), {L:["A","B","C"], ang:["35°","?",null], side:["9 cm","7 cm",null]});})();return q;},
  function(){return mcq("You know two sides of a triangle and an angle opposite one of them, and you need another angle. Which law starts the solution, and what must you watch for?",
    "The sine law \u2014 and the angle it gives might not be the only possibility: an angle and its supplement both have the same sine, so the diagram has to rule one out",
    ["The cosine law \u2014 it is the only law that works with two known sides, so it must start the solution, and the angle it gives will be the one correct angle for the triangle shown","The sine law \u2014 and its answer is always the one correct angle, because the inverse sine returns the angle that fits the triangle, with no second candidate to check","The angle-sum rule \u2014 the third angle comes first, then either law finishes it, because knowing all three angles is what lets a law find the remaining angle"],
    "Side-side-angle is the ambiguous case for the sine law: \\(\\sin\\theta = \\sin(180^\\circ - \\theta)\\), so the calculation can offer two candidate angles and the shape of the triangle decides which one fits.",{});}
]));
E("u1-sine-side",1,["7.2"],1,"gen",function(){
  var A=pick([35,40,50,55,65]),B=pick([45,60,70,80]);var a=ri(8,20);
  var b=a*Math.sin(B*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q = numq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and side \\(a = "+a+"\\text{ cm}\\) (opposite \\(\\angle A\\)). Find side \\(b\\), to one decimal place, in cm.",
    Math.round(b*10)/10,0.06,"Sine law: \\(\\frac{b}{\\sin "+B+"^\\circ} = \\frac{a}{\\sin "+A+"^\\circ} = \\frac{"+a+"}{"+fmt(Math.sin(A*Math.PI/180),4)+"}\\). So \\(b = "+fmt(b,4)+" \\approx \\)<b>\\("+fmt(b,1)+"\\text{ cm}\\)</b>.",{A:A,B:B,a:a});
  q.figure = triSVG(a, b, a*Math.sin((180-A-B)*Math.PI/180)/Math.sin(A*Math.PI/180), {L:["A","B","C"], ang:[A+"°",B+"°",null], side:[a+" cm","?",null]});
  return q;
});
E("u1-sine-angle",1,["7.2"],1,"gen",function(){
  var tri=pick([{n:"DEF",u:"m"},{n:"ABC",u:"cm"},{n:"PQR",u:"km"}]);
  var A=pick([25,30,35,40,45,50,55,60]),a=pick([6,7,8,9,10,11,12,13,14,15,16]);
  var bts=[50,55,60,65,70,75,80].filter(function(x){return x>A+15&&A+x<175;});
  var Btar=pick(bts);
  var bTrue=a*Math.sin(Btar*Math.PI/180)/Math.sin(A*Math.PI/180);
  var b=Math.round(bTrue*10)/10;
  var Brev=Math.round(Math.asin(b*Math.sin(A*Math.PI/180)/a)*180/Math.PI);
  var L1=tri.n.charAt(0),L2=tri.n.charAt(1),l1=L1.toLowerCase(),l2=L2.toLowerCase();
  var q = numq("In \\(\\triangle "+tri.n+"\\), \\(\\angle "+L1+" = "+A+"^\\circ\\), side \\("+l1+" = "+a+"\\text{ "+tri.u+"}\\) (opposite \\(\\angle "+L1+"\\)), and side \\("+l2+" = "+fmt(b,1)+"\\text{ "+tri.u+"}\\). Find \\(\\angle "+L2+"\\), to the nearest degree.",
    Brev,1.1,"Sine law: \\(\\sin "+L2+" = \\frac{"+l2+" \\sin "+L1+"}{"+l1+"} = \\frac{"+fmt(b,1)+" \\times \\sin "+A+"^\\circ}{"+a+"} \\approx "+fmt(b*Math.sin(A*Math.PI/180)/a,4)+"\\). So \\(\\angle "+L2+" = \\sin^{-1}("+fmt(b*Math.sin(A*Math.PI/180)/a,4)+") \\approx \\)<b>\\("+Brev+"^\\circ\\)</b> (the triangle is acute).",{A:A,a:a,b:b,Brev:Brev});
  q.figure = triSVG(a, b, (function(){var Bx=Math.asin(Math.min(1,b*Math.sin(A*Math.PI/180)/a))*180/Math.PI;return a*Math.sin((180-A-Bx)*Math.PI/180)/Math.sin(A*Math.PI/180);})(), {L:[L1,L2,tri.n.charAt(2)], ang:[A+"°","?",null], side:[a+" "+tri.u, fmt(b,1)+" "+tri.u, null]});
  return q;
});
E("u1-cosine-side",1,["7.2"],1,"gen",function(){
  var C=pick([50,60,70,80]),a=ri(6,14),b=ri(6,14);
  var c=Math.sqrt(a*a+b*b-2*a*b*Math.cos(C*Math.PI/180));
  var q = numq("In \\(\\triangle PQR\\), sides \\(p = "+a+"\\text{ km}\\) and \\(q = "+b+"\\text{ km}\\) meet at \\(\\angle R = "+C+"^\\circ\\) between them. Find the side opposite \\(\\angle R\\), to one decimal place, in km.",
    Math.round(c*10)/10,0.06,"Cosine law: \\(r^2 = p^2 + q^2 - 2pq\\cos R = "+(a*a)+" + "+(b*b)+" - 2("+a+")("+b+")\\cos "+C+"^\\circ \\approx "+fmt(c*c,2)+"\\). So \\(r \\approx \\)<b>\\("+fmt(c,1)+"\\text{ km}\\)</b>.",{a:a,b:b,C:C});
  q.figure = triSVG(a, b, c, {L:["P","Q","R"], ang:[null,null,C+"°"], side:[a+" km",b+" km","?"]});
  return q;
});
E("u1-cosine-angle",1,["7.2"],1,"gen",function(){
  var Atar=pick([45,55,65,75]);var b=ri(6,12),c=ri(6,12);
  var aTrue=Math.sqrt(b*b+c*c-2*b*c*Math.cos(Atar*Math.PI/180));
  var a=Math.round(aTrue*10)/10;
  var cosA=(b*b+c*c-a*a)/(2*b*c);var Arev=Math.round(Math.acos(cosA)*180/Math.PI);
  var q = numq("A triangle has sides \\("+fmt(a,1)+", "+b+", "+c+"\\). Find the angle opposite the side of length \\("+fmt(a,1)+"\\), to the nearest degree.",
    Arev,1.1,"Cosine law rearranged: \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+(b*b)+" + "+(c*c)+" - "+fmt(a*a,2)+"}{"+(2*b*c)+"} \\approx "+fmt(cosA,4)+"\\). So \\(A \\approx \\)<b>\\("+Arev+"^\\circ\\)</b>.",{b:b,c:c,Arev:Arev,a:a});
  q.figure = triSVG(a, b, c, {L:["A","B","C"], ang:["?",null,null], side:[fmt(a,1),""+b,""+c]});
  return q;
});
E("u1-two-triangles",1,["7.3"],3,"gen",function(){
  var AB=pick([11,12,13]),BC=pick([8,9,10]),angB=pick([60,70,80]);
  var AC=Math.sqrt(AB*AB+BC*BC-2*AB*BC*Math.cos(angB*Math.PI/180));
  var angDAC=pick([50,55]),angD=pick([60,65]);var angACD=180-angDAC-angD;
  var CD=AC*Math.sin(angDAC*Math.PI/180)/Math.sin(angD*Math.PI/180);
  var q = numq("A surveyor maps two fields that share the diagonal \\(AC\\). In \\(\\triangle ABC\\), \\(AB = "+AB+"\\text{ m}\\), \\(BC = "+BC+"\\text{ m}\\) and \\(\\angle B = "+angB+"^\\circ\\). In the second field, \\(\\triangle ACD\\), \\(\\angle DAC = "+angDAC+"^\\circ\\) and \\(\\angle D = "+angD+"^\\circ\\). Find the length of \\(CD\\), to one decimal place, in m.",
    Math.round(CD*10)/10,0.16,
    "Step 1 — the shared side, from \\(\\triangle ABC\\) (cosine law): \\(AC^2 = "+(AB*AB)+" + "+(BC*BC)+" - 2("+AB+")("+BC+")\\cos "+angB+"^\\circ\\), so \\(AC \\approx "+fmt(AC,2)+"\\text{ m}\\). Step 2 — use \\(AC\\) in \\(\\triangle ACD\\): its third angle is \\(180^\\circ - "+angDAC+"^\\circ - "+angD+"^\\circ = "+angACD+"^\\circ\\), and the sine law gives \\(\\frac{CD}{\\sin "+angDAC+"^\\circ} = \\frac{AC}{\\sin "+angD+"^\\circ}\\), so \\(CD \\approx "+fmt(AC,2)+" \\times \\frac{\\sin "+angDAC+"^\\circ}{\\sin "+angD+"^\\circ} \\approx \\)<b>\\("+fmt(CD,1)+"\\text{ m}\\)</b>. The first triangle exists to produce the side the second triangle needs.",{AB:AB,BC:BC,angB:angB,AC:AC,angDAC:angDAC,angD:angD});
  q.figure = twoTriSVG(AB, BC, angB, AC, CD, AC*Math.sin(angACD*Math.PI/180)/Math.sin(angD*Math.PI/180), angDAC, angD);
  return q;
});

/* ----- bank-u2.js ----- */
// Math 2201 Unit 2: Quadratic Functions question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1283 to 1362).
// CRMARKS: u2-vertex-x=1
// CRMARKS: u2-vertex-value=2
// CRMARKS: u2-axis-from-intercepts=1
// CRMARKS: u2-xintercepts=2
// CRMARKS: u2-xintercepts-factored=1
// CRMARKS: u2-factored-coeffs=2
// CRMARKS: u2-eq-from-vertex=2
// CRMARKS: u2-max-context=2
/* ============ Unit 2: Quadratic Functions ============ */
function quadStr(a,b,c){var s=(a===1?"":a===-1?"\u2212":""+a)+"x\u00B2";if(b!==0)s+=" "+(b>0?"+":"\u2212")+" "+(Math.abs(b)===1?"":Math.abs(b))+"x";if(c!==0)s+=" "+(c>0?"+":"\u2212")+" "+Math.abs(c);return s;}
function quadB(a,b,c){var s=(a===1?"":a===-1?"-":""+a)+"x^2";if(b!==0)s+=(b>0?" + ":" - ")+(Math.abs(b)===1?"":Math.abs(b))+"x";if(c!==0)s+=(c>0?" + ":" - ")+Math.abs(c);return s;}
function quadT(a,b,c){return "\\("+quadB(a,b,c)+"\\)";}
function fracT(n,d){return "\\(\\frac{"+n+"}{"+d+"}\\)";}
function frB(n,d){function g2(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var t=x%y;x=y;y=t;}return x||1;}var g=g2(n,d);n/=g;d/=g;if(d<0){n=-n;d=-d;}if(d===1)return ""+n;return (n<0?"-":"")+"\\frac{"+Math.abs(n)+"}{"+d+"}";}
function vertB(a,h,k){var s=(a===1?"":a===-1?"-":""+a)+(h===0?"x^2":"(x "+(h>0?"- "+h:"+ "+(-h))+")^2");if(k>0)s+=" + "+k;else if(k<0)s+=" - "+(-k);return s;}
function vertT(a,h,k){return "\\(y = "+vertB(a,h,k)+"\\)";}
function factB(a,r1,r2){function f(r){return r===0?"x":(r>0?"(x - "+r+")":"(x + "+(-r)+")");}return (a===1?"":a===-1?"-":""+a)+f(r1)+f(r2);}
function factT(a,r1,r2){return "\\(y = "+factB(a,r1,r2)+"\\)";}
E("u2-vertex-x",2,["4.12"],1,"gen",function(){
  var a=pick([1,1,2,-1]),h=ri(-5,6)||2;var b=-2*a*h;var c=a*h*h+ri(-6,6);
  return numq("What is the x-coordinate of the vertex of \\(y = "+quadB(a,b,c)+"\\)?",
    h,0.011,"Axis of symmetry: \\(x = \\frac{-b}{2a} = \\frac{-("+b+")}{"+(2*a)+"} = \\)<b>\\("+h+"\\)</b>. The vertex sits on the axis of symmetry.",{a:a,b:b,c:c});
});
E("u2-vertex-value",2,["4.11"],2,"gen",function(){
  var a=pick([1,2,-1]),h=ri(-4,5),k=ri(-8,12);var b=-2*a*h,c=a*h*h+k;
  return numq("Find the "+(a>0?"minimum":"maximum")+" value of \\(y = "+quadB(a,b,c)+"\\)"+".",
    k,0.011,"The vertex is at \\(x = \\frac{-b}{2a} = "+h+"\\). Substituting: \\(y = "+a+"("+h+")^2 + ("+b+")("+h+") + ("+c+") = \\)<b>\\("+k+"\\)</b>. Since \\(a "+(a>0?">":"<")+" 0\\), the parabola opens "+(a>0?"up and this is a minimum.":"down and this is a maximum."),{a:a,h:h,k:k});
});
E("u2-axis-from-intercepts",2,["4.13"],1,"gen",function(){
  var p=ri(-10,-1),q=ri(1,10);var mid=(p+q)/2;
  var frame=pick([
    "A parabola has x-intercepts \\("+p+"\\) and \\("+q+"\\). What is the equation of its axis of symmetry? Give your answer as \\(x = \\) (a number).",
    "The graph of a parabola crosses the x-axis at \\("+p+"\\) and \\("+q+"\\). What is the equation of its axis of symmetry? Give your answer as \\(x = \\) (a number)."]);
  return numq(frame,mid,0.011,"The axis of symmetry passes midway between the intercepts: \\(x = \\frac{"+p+" + "+q+"}{2} = \\)<b>\\("+fmt(mid)+"\\)</b>.",{p:p,q:q});
});
E("u2-xintercepts",2,["4.4"],2,"gen",function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var factored=false;
  var prompt=factored? "A parabola has equation "+factT(1,p,q)+". What is the larger x-intercept?"
                     : "Find the larger x-intercept of \\(y = "+quadB(1,b,c)+"\\)"+".";
  return numq(prompt,q,0.011,"Factor: "+factT(1,p,q)+". The intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
});
E("u2-xintercepts-factored",2,["4.4"],1,"gen",function(){
  var p=ri(-9,-1),q=ri(1,10);var b=-(p+q),c=p*q;
  var factored=true;
  var prompt=factored? "A parabola has equation "+factT(1,p,q)+". What is the larger x-intercept?"
                     : "Find the larger x-intercept of \\(y = "+quadB(1,b,c)+"\\)"+".";
  return numq(prompt,q,0.011,"Factor: "+factT(1,p,q)+". The intercepts are \\(x = "+p+"\\) and \\(x = "+q+"\\); the larger is <b>\\("+q+"\\)</b>.",{p:p,q:q});
});
E("u2-factored-coeffs",2,["4.5"],1,"gen",function(){
  var p=ri(-7,-2),q=ri(2,7);var askB=Math.random()<0.5;
  return numq("A quadratic function has zeros \\("+p+"\\) and \\("+q+"\\), so its equation can be written \\(y = (x - ("+p+"))(x - ("+q+"))\\). Expanded into the form \\(y = x^2 + bx + c\\), what is the value of \\("+(askB?"b":"c")+"\\)?",
    askB?-(p+q):p*q,0.011,"Expanding: \\((x - ("+p+"))(x - ("+q+")) = x^2 - ("+(p+q)+")x + ("+(p*q)+")\\), so \\(b = "+(-(p+q))+"\\) and \\(c = "+(p*q)+"\\). The asked coefficient is <b>\\("+(askB?-(p+q):p*q)+"\\)</b>.",{p:p,q:q,askB:askB});
});
E("u2-domain-range",2,["4.1"],1,"gen",function(){
  var a=pick([1,-1,2]),h=ri(-4,4),k=ri(-6,10);
  var correct=a>0?"Domain: all real numbers; Range: \\(y \\geq "+k+"\\)":"Domain: all real numbers; Range: \\(y \\leq "+k+"\\)";
  return mcq("A quadratic function has vertex \\(("+h+", "+k+")\\) and opens "+(a>0?"upward":"downward")+". What are its domain and range?",correct,
    [a>0?"Domain: all real numbers; Range: \\(y \\leq "+k+"\\)":"Domain: all real numbers; Range: \\(y \\geq "+k+"\\)",
     "Domain: \\(x \\geq "+h+"\\); Range: all real numbers","Domain: \\(x \\geq "+h+"\\); Range: \\(y "+(a>0?"\\geq":"\\leq")+" "+k+"\\)"],
    "Every quadratic has domain all real numbers. The vertex is the turning point: opening "+(a>0?"up, the smallest \\(y\\) is the vertex's y-value \\("+k+"\\)":"down, the largest \\(y\\) is \\("+k+"\\)")+", so the range is \\(y "+(a>0?"\\geq":"\\leq")+" "+k+"\\)"+".",{a:a,h:h,k:k});
});
E("u2-vertex-form-params",2,["4.15"],1,"var",varset([
  function(){return mcq("In \\(y = (x - 3)^2 + 5\\), what is the vertex?",
    "\\((3, 5)\\) — the graph of \\(y = x^2\\) shifted right \\(3\\) and up \\(5\\)",
    ["\\((-3, 5)\\) — the graph of \\(y = x^2\\) shifted left \\(3\\) and up \\(5\\)","\\((3, -5)\\) — shifted right \\(3\\) and down \\(5\\) from the origin","\\((5, 3)\\) — the numbers swap places, so the vertical shift comes first"],
    "Vertex form \\(y = a(x - h)^2 + k\\) has vertex \\((h, k)\\). The minus sign in \\((x - 3)\\) means \\(h = +3\\).",{});},
  function(){return mcq("What does the value of \\(a\\) do in \\(y = a(x - h)^2 + k\\)?",
    "If \\(|a| > 1\\) the parabola narrows; if \\(a < 0\\) it opens downward",
    ["It moves the vertex left or right, changing where the parabola is centred","It moves the vertex up or down, raising the whole parabola","It changes only the y-intercept, leaving the shape of the parabola untouched"],
    "\\(h\\) shifts sideways, \\(k\\) shifts vertically, and \\(a\\) controls opening direction and width — the 'stretch' of the parabola.",{});},
  function(){return mcq("The graph of \\(y = x^2\\) is shifted left \\(4\\) and down \\(2\\). What is its equation?",
    "\\(y = (x + 4)^2 - 2\\)",
    ["\\(y = (x - 4)^2 + 2\\)","\\(y = (x + 4)^2 + 2\\)","\\(y = (x - 4)^2 - 2\\)"],
    "Left \\(4\\) means \\(h = -4\\), written \\((x - (-4)) = (x + 4)\\); down \\(2\\) means \\(k = -2\\).",{});}
]));
E("u2-eq-from-vertex",2,["4.16"],2,"gen",function(){
  var h=ri(-4,4),k=ri(-5,5),a=pick([1,2,3,-1]);var dx=pick([1,2]);var px=h+dx,py=a*dx*dx+k;
  return numq("A parabola has vertex \\(("+h+", "+k+")\\) and passes through \\(("+px+", "+py+")\\). Using \\(y = a(x - h)^2 + k\\), find the value of \\(a\\).",
    a,0.011,"Substitute the point: \\[\\begin{aligned} "+py+" &= a("+px+" - ("+h+"))^2 + ("+k+") \\\\ &= "+(dx*dx)+"a + ("+k+") \\\\ a &= \\frac{"+py+" - ("+k+")}{"+(dx*dx)+"} = "+a+" \\end{aligned}\\]",{h:h,k:k,a:a});
});
E("u2-max-context",2,["4.2"],2,"gen",function(){
  var v=pick([10,20,30,40,50,60,70]),h0=pick([0,2,5,8,10,12,15,20,25,30]);
  var thing=pick(["A ball is thrown upward","A firework shell is launched upward","A water jet from a fountain arcs upward"]);
  var tmax=v/10,hmax=-5*tmax*tmax+v*tmax+h0;
  return numq(thing+". Its height after \\(t\\) seconds is \\(h(t) = -5t^2 + "+v+"t"+(h0?" + "+h0:"")+"\\) metres. What is the maximum height it reaches, in metres?",
    hmax,0.11,"The maximum is at the vertex: \\(t = \\frac{-b}{2a} = \\frac{-"+v+"}{-10} = "+fmt(tmax,1)+"\\) s. Then \\(h("+fmt(tmax,1)+") = -5("+fmt(tmax*tmax,2)+") + "+v+"("+fmt(tmax,1)+") + "+h0+" = \\)<b>\\("+fmt(hmax,1)+"\\text{ m}\\)</b>.",{v:v,h0:h0});
});

/* ----- bank-u3.js ----- */
// Math 2201 Unit 3: Quadratic Equations question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1363 to 1405).
// CRMARKS: u3-factor-solve=2
// CRMARKS: u3-formula=2
// CRMARKS: u3-context-area=3
/* ============ Unit 3: Quadratic Equations ============ */
E("u3-factor-solve",3,["4.8"],2,"gen",function(){
  var p=ri(-8,-1),q=ri(1,9);var b=-(p+q),c=p*q;var askBig=Math.random()<0.5;
  return numq("Solve by factoring: "+"\\("+quadB(1,b,c)+" = 0\\)"+". Give the "+(askBig?"larger":"smaller")+" root.",
    askBig?q:p,0.011,"Factor: \\((x "+(p>0?"- "+p:"+ "+(-p))+")(x "+(q>0?"- "+q:"+ "+(-q))+") = 0\\), so \\(x = "+p+"\\) or \\(x = "+q+"\\) (check by substituting back). The "+(askBig?"larger":"smaller")+" root is <b>\\("+(askBig?q:p)+"\\)</b>.",{p:p,q:q,askBig:askBig});
});
E("u3-formula",3,["4.9"],2,"gen",function(){
  var a=pick([1,1,2]),b=ri(-9,9)||3,c=ri(-8,8)||-4;var D=b*b-4*a*c,guard=0;
  while((D<=0||Math.sqrt(D)===Math.floor(Math.sqrt(D)))&&guard++<60){b=ri(-9,9)||3;c=ri(-8,8)||-4;D=b*b-4*a*c;}
  var r1=(-b+Math.sqrt(D))/(2*a),r2=(-b-Math.sqrt(D))/(2*a);var big=Math.max(r1,r2);
  return numq("Use the quadratic formula to solve "+"\\("+quadB(a,b,c)+" = 0\\)"+". Give the larger root, to two decimal places.",
    Math.round(big*100)/100,0.011,"\\(D = b^2 - 4ac = "+D+"\\). \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"}\\), giving \\(x \\approx "+fmt(r1)+"\\) or \\(x \\approx "+fmt(r2)+"\\). The larger root is <b>\\("+fmt(big)+"\\)</b>.",{a:a,b:b,c:c,D:D});
});
E("u3-discriminant",3,["4.7"],2,"gen",function(){
  var kind=pick(["two","one","zero"]);var a=pick([1,2]),b,c,D;
  if(kind==="one"){b=pick([4,6]);c=b*b/(4*a);D=0;}
  else if(kind==="two"){b=ri(3,9);c=ri(-6,3);D=b*b-4*a*c;if(D<=0){c=-5;D=b*b-4*a*c;}}
  else{b=ri(1,4);c=ri(3,9);D=b*b-4*a*c;if(D>=0){b=1;c=9;D=1-4*a*9;}}
  var correct=kind==="two"?"Two x-intercepts \u2014 the discriminant is positive":kind==="one"?"One x-intercept \u2014 the discriminant is zero":"No x-intercepts \u2014 the discriminant is negative";
  return mcq("How many x-intercepts does the graph of \\(y = "+quadB(a,b,c)+"\\) have?",correct,
    ["Two x-intercepts \u2014 the discriminant is positive","One x-intercept \u2014 the discriminant is zero","No x-intercepts \u2014 the discriminant is negative","It is impossible to tell without graphing"].filter(function(s){return s!==correct;}),
    "Discriminant: \\(b^2 - 4ac = "+(b*b)+" - "+(4*a*c)+" = "+D+"\\). "+(D>0?"Positive, so the parabola crosses the x-axis twice.":D===0?"Zero, so the vertex just touches the x-axis \u2014 one intercept (a repeated root).":"Negative, so the parabola never reaches the x-axis."),{a:a,b:b,c:c,D:D});
});
E("u3-roots-zeros",3,["4.6"],1,"var",varset([
  function(){return mcq("The equation \\(x^2 - 5x + 6 = 0\\) has roots \\(2\\) and \\(3\\). What does that say about the function \\(f(x) = x^2 - 5x + 6\\)?",
    "Its zeros are \\(2\\) and \\(3\\), and its graph crosses the x-axis at \\((2, 0)\\) and \\((3, 0)\\)",
    ["Its vertex is at \\((2, 3)\\), because the two roots become the coordinates of the turning point","Its y-intercept is \\(6\\) and its maximum is \\(3\\), so the graph never crosses the x-axis at all","Its zeros are \\(-2\\) and \\(-3\\), because finding the zeros changes the sign of each root"],
    "Roots of the equation, zeros of the function and x-intercepts of the graph are three names for the same numbers \u2014 where the function\u2019s value is \\(0\\).",{});},
  function(){return mcq("A quadratic function\u2019s graph touches the x-axis at exactly one point. What is true of the corresponding equation?",
    "It has one root, repeated \u2014 the discriminant is zero",
    ["It has two different roots, as most quadratics do","It has no roots at all, because touching is not the same as crossing","Its discriminant is positive, as it is whenever a graph meets the axis"],
    "Touching at one point means one x-intercept, which matches a repeated root and \\(D = 0\\).",{});},
  function(){return mcq("The graph of a quadratic function crosses the x-axis at \\(x = -4\\) and \\(x = 1\\). What are the roots of the corresponding quadratic equation?",
    "\\(-4\\) and \\(1\\) \u2014 the x-intercepts of the graph are exactly the roots of the equation",
    ["\\(4\\) and \\(-1\\), the opposite signs, because the roots change sign when read from the graph","There are no roots, because the graph crosses the axis instead of touching it","Only \\(1\\) \u2014 a root cannot be negative, so the crossing at \\(-4\\) does not count as a root"],
    "Roots of the equation, zeros of the function and x-intercepts of the graph are the same numbers, signs included.",{});}
]));
E("u3-context-area",3,["4.3"],2,"gen",function(){
  var w=ri(3,15),d=ri(2,12);var A=w*(w+d);
  var obj=pick(["garden","patio","deck","vegetable plot","parking pad"]);
  return numq("A rectangular "+obj+"'s length is "+d+" m more than its width. Its area is \\("+A+"\\text{ m}^2\\). What is the width, in metres?",
    w,0.011,"Let the width be \\(w\\). Then \\[\\begin{aligned} w(w + "+d+") &= "+A+" \\\\ w^2 + "+d+"w - "+A+" &= 0 \\\\ (w + "+(w+d)+")(w - "+w+") &= 0 \\end{aligned}\\] The roots are \\(w = "+w+"\\) and \\(w = -"+(w+d)+"\\); a width cannot be negative, so the width is <b>\\("+w+"\\) m</b>.",{w:w,d:d});
});

/* ----- bank-u4.js ----- */
// Math 2201 Unit 4: Radicals question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1406 to 1518).
// CRMARKS: u4-mixed-to-entire=1
// CRMARKS: u4-entire-to-mixed=2
// CRMARKS: u4-simplify-add=2
// CRMARKS: u4-multiply=2
// CRMARKS: u4-rationalize=1
// CRMARKS: u4-restrictions=1
// CRMARKS: u4-radical-equation=2
// CRMARKS: u4-extraneous=3
// CRMARKS: u4-defined-count=3
// CRMARKS: u4-repair-simplify=2
// CRMARKS: u4-order=2
/* ============ Unit 4: Radicals ============ */
function radStr(a,b){return (a===1?"":a)+"\u221A"+b;}
function radT(a,b){return "\\("+(a===1?"":a)+"\\sqrt{"+b+"}\\)";}
function sqrtT(x){return "\\(\\sqrt{"+x+"}\\)";}
function rad3T(a,b){return "\\("+(a===1?"":a)+"\\sqrt[3]{"+b+"}\\)";}
function cbrtT(x){return "\\(\\sqrt[3]{"+x+"}\\)";}
E("u4-mixed-to-entire",4,["1.1"],1,"gen",function(){
  var a=ri(2,9),b=pick([2,3,5,6,7,10,11,13,14,15]);var inside=a*a*b;
  var frame=pick(["Express "+radT(a,b)+" as an entire radical.","Which entire radical is equal to "+radT(a,b)+"?"]);
  return mcq(frame,sqrtT(inside),[sqrtT(a*b),sqrtT(a*a+b),sqrtT(a*a*b*b)],
    "Bring the outside number in by squaring it: \\("+a+"^2 \\times "+b+" = "+(a*a)+" \\times "+b+" = "+inside+"\\), so "+radT(a,b)+" = "+sqrtT(inside)+".",{a:a,b:b});
});
E("u4-entire-to-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(2,12),b=pick([2,3,5,6,7,10,11,13,14,15]);var n=a*a*b;
  var frame=pick(["Express "+sqrtT(n)+" as a mixed radical in simplest form.","Write "+sqrtT(n)+" as a mixed radical in simplest form."]);
  return mcq(frame,radT(a,b),[radT(a+1,b),radT(a,b+1),sqrtT(n-1)],
    "Find the largest perfect square dividing \\("+n+"\\): \\("+n+" = "+(a*a)+" \\times "+b+"\\). So "+sqrtT(n)+" = "+radT(a,b)+".",{a:a,b:b,n:n});
});
E("u4-simplify-add",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);var a1=pick([2,3,4,5]);var a2=pick([2,3,4,5,6].filter(function(x){return x!==a1;}));
  var n1=a1*a1*b,n2=a2*a2*b;var tot=a1+a2;
  return mcq("Simplify: "+sqrtT(n1)+" + "+sqrtT(n2)+".",
    radT(tot,b),[radT(tot+1,b),radT(tot,b+1),sqrtT(n1+n2)],
    sqrtT(n1)+" = "+radT(a1,b)+" and "+sqrtT(n2)+" = "+radT(a2,b)+". Like radicals add: \\("+a1+" + "+a2+" = "+tot+"\\), so the sum is "+radT(tot,b)+". (You cannot just add the numbers under the roots.)",{b:b,a1:a1,a2:a2});
});
E("u4-multiply",4,["1.6"],2,"gen",function(){
  var k=pick([2,3,5,6,7,10,11,13,14,15]);var i=ri(1,3),j=ri(1,3);var x=k*i*i,y=k*j*j;
  return numq("The product \\(\\sqrt{"+x+"} \\times \\sqrt{"+y+"}\\) is a whole number. What is it?",
    k*i*j,0.011,"\\[\\begin{aligned} \\sqrt{"+x+"} \\times \\sqrt{"+y+"} &= \\sqrt{"+x+" \\times "+y+"} \\\\ &= \\sqrt{"+(x*y)+"} \\end{aligned}\\] Notice \\("+x+" = "+k+" \\times "+(i*i)+"\\) and \\("+y+" = "+k+" \\times "+(j*j)+"\\), so the product is <b>\\("+k+" \\times "+i+" \\times "+j+" = "+(k*i*j)+"\\)</b>.",{p:[x,y]});
});
E("u4-rationalize",4,["1.7"],1,"gen",function(){
  var d=pick([2,3,5,6,7,10,11,13,14,15]);var c=d*ri(1,5);
  var frame=pick(["Rationalize the denominator: \\(\\frac{"+c+"}{\\sqrt{"+d+"}}\\).","Write \\(\\frac{"+c+"}{\\sqrt{"+d+"}}\\) with a rational denominator."]);
  return mcq(frame,radT(c/d,d),[sqrtT(c*d),"\\(\\frac{"+c+"\\sqrt{"+d+"}}{"+d+"}\\)","\\("+(c/d)+"\\sqrt{"+(d*d)+"}\\)"],
    "Multiply top and bottom by "+sqrtT(d)+": \\[\\begin{aligned} \\frac{"+c+"}{\\sqrt{"+d+"}} &= \\frac{"+c+"\\sqrt{"+d+"}}{"+d+"} \\\\ &= "+(c/d)+"\\sqrt{"+d+"} \\end{aligned}\\] The denominator is now the rational number \\("+d+"\\).",{c:c,d:d});
});
E("u4-restrictions",4,["1.5"],1,"gen",function(){
  var a=ri(-6,15);var flipped=Math.random()<0.5;
  var rad=flipped?"("+a+" - x)":"(x "+(a>=0?"- "+a:"+ "+(-a))+")";
  var frame=pick(["For which values of x is the expression \\(\\sqrt{"+rad+"}\\) defined?","State the restriction on x so that \\(\\sqrt{"+rad+"}\\) is a real number."]);
  return mcq(frame,
    flipped?"\\(x \\leq "+a+"\\)":"\\(x \\geq "+a+"\\)",[flipped?"\\(x \\geq "+a+"\\)":"\\(x \\leq "+a+"\\)","\\(x > 0\\)","All real numbers"],
    "The radicand cannot be negative: "+(flipped?"\\("+a+" - x \\ge 0\\) gives \\(x \\le "+a+"\\)":"\\(x "+(a>=0?"- "+a:"+ "+(-a))+" \\ge 0\\) gives \\(x \\ge "+a+"\\)")+".",{a:a,flipped:flipped});
});
E("u4-radical-equation",4,["1.9"],2,"gen",function(){
  var b=ri(3,7),a=ri(1,15);var x=b*b-a;
  return numq("Solve \\(\\sqrt{x + "+a+"} = "+b+"\\). Give the value of x.",
    x,0.011,"Square both sides: \\[\\begin{aligned} x + "+a+" &= "+(b*b)+" \\\\ x &= "+(b*b)+" - "+a+" \\\\ &= "+x+" \\end{aligned}\\] Check: \\(\\sqrt{"+x+" + "+a+"} = \\sqrt{"+(b*b)+"} = "+b+"\\) \u2713.",{a:a,b:b});
});
E("u4-extraneous",4,["1.11"],3,"gen",function(){
  var b=pick([1,2,3,4]);var r=2*b+ri(1,6);var e=2*b+1-r;var a=b*b-r*e;
  var radicand="x + "+a;
  var frame=pick([
    "Solving \\(\\sqrt{"+radicand+"} = x - "+b+"\\) by squaring both sides gives two candidates: \\(x = "+r+"\\) and \\(x = "+e+"\\). Which one is extraneous, and why?",
    "A student solves \\(\\sqrt{"+radicand+"} = x - "+b+"\\) by squaring and gets two candidates: \\(x = "+r+"\\) and \\(x = "+e+"\\). Which candidate is extraneous, and why?",
    "Squaring both sides of \\(\\sqrt{"+radicand+"} = x - "+b+"\\) produces the candidates \\(x = "+r+"\\) and \\(x = "+e+"\\). Which one is extraneous, and why?"]);
  return mcq(frame,
    "\\(x = "+e+"\\) is extraneous \u2014 substituting it makes the right side negative, but a square root is never negative",
    ["\\(x = "+r+"\\) is extraneous - it is the larger answer, and the larger answer from squaring is always false","Neither is extraneous - squaring both sides never creates false roots, so both candidates work in the original equation","Both are extraneous, so the equation has no solution - each candidate fails when substituted back into the equation"],
    "Check \\(x = "+e+"\\): \\(\\sqrt{"+e+" + "+a+"} = \\sqrt{"+(e+a)+"} = "+Math.sqrt(e+a)+"\\), but \\(x - "+b+" = "+(e-b)+" < 0\\). A principal square root cannot equal a negative number, so \\(x = "+e+"\\) crept in when we squared. \\(x = "+r+"\\) checks: \\(\\sqrt{"+(r+a)+"} = "+Math.sqrt(r+a)+" = "+(r-b)+"\\) \u2713.",{b:b,r:r,e:e,a:a});
});
E("u4-defined-count",4,["1.5"],3,"gen",function(){
  function sub(v){return v>=0?"x - "+v:"x + "+(-v);}
  var mode=ri(0,2),prompt="",sol="",ans=0;
  if(mode===0){
    var a=ri(-6,4);var b=a+ri(5,14);ans=b-a+1;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\sqrt{"+sub(a)+"} + \\sqrt{"+b+" - x}\\) defined?";
    sol="Each radicand must be non-negative. The first gives \\(x \\ge "+a+"\\), and the second gives \\(x \\le "+b+"\\). Both conditions must hold at once, so \\(x\\) takes every integer from \\("+a+"\\) to \\("+b+"\\) inclusive, a total of <b>\\("+ans+"\\)</b> values. Either condition on its own would allow more.";
  }else if(mode===1){
    var a2=ri(-6,4);var b2=a2+ri(5,14);ans=b2-a2;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\frac{\\sqrt{"+sub(a2)+"}}{\\sqrt{"+b2+" - x}}\\) defined?";
    sol="The numerator needs \\(x \\ge "+a2+"\\). The denominator needs more: a square root sitting in a denominator must be positive, not just non-negative, so \\("+b2+" - x > 0\\) and \\(x < "+b2+"\\). The integers from \\("+a2+"\\) to \\("+(b2-1)+"\\) inclusive total <b>\\("+ans+"\\)</b> values.";
  }else{
    var hi=ri(2,14);var lo=hi-ri(5,14);ans=hi-lo+1;
    prompt="For how many integer values of \\(x\\) is the expression \\(\\sqrt{"+hi+" - x} + \\sqrt{"+sub(lo)+"}\\) defined?";
    sol="Each radicand must be non-negative. The first gives \\(x \\le "+hi+"\\), and the second gives \\(x \\ge "+lo+"\\). Both conditions must hold at once, so \\(x\\) takes every integer from \\("+lo+"\\) to \\("+hi+"\\) inclusive, a total of <b>\\("+ans+"\\)</b> values.";
  }
  return numq(prompt,ans,0.011,sol,{mode:mode});
});
E("u4-repair-simplify",4,["1.2"],3,"gen",function(){
  var sqf=[2,3,5,6,7,10,11,13,14,15];
  var mode=ri(0,1);
  if(mode===0){
    var f=pick([2,3]);var mult=ri(2,5);var a=f*mult;var b=pick(sqf);
    var N=a*a*b;var p=a/f;var qq=b*f*f;
    return numq("A student simplifies \\(\\sqrt{"+N+"}\\) and writes \\("+p+"\\sqrt{"+qq+"}\\). The value is correct, but the radicand still contains a square factor, so the radical is not fully simplified. In the fully simplified form, what is the coefficient of the square root?",
      a,0.011,
      "The radicand \\("+qq+"\\) still contains the square factor \\("+f+"^2 = "+(f*f)+"\\). Pulling it out multiplies the coefficient by \\("+f+"\\): \\("+p+" \\times "+f+" = "+a+"\\), and indeed \\(\\sqrt{"+N+"} = \\sqrt{"+(a*a)+" \\times "+b+"} = \\)<b>\\("+a+"\\sqrt{"+b+"}\\)</b>.",
      {N:N,p:p,qq:qq});
  }
  var a2=pick([4,5,6,7,8,9,10]);var b2=pick(sqf);var N2=a2*a2*b2;var pw=a2+pick([-1,1]);if(pw<2)pw=a2+1;
  return numq("A student simplifies \\(\\sqrt{"+N2+"}\\) and writes \\("+pw+"\\sqrt{"+b2+"}\\). Checking the value, \\("+pw+"^2 \\times "+b2+" \\ne "+N2+"\\), so the student\u2019s answer is wrong. What is the coefficient of the square root in the fully simplified form?",
    a2,0.011,
    "Redo the simplification from the start: \\("+N2+" = "+(a2*a2)+" \\times "+b2+"\\), and \\("+(a2*a2)+"\\) is a perfect square, so \\(\\sqrt{"+N2+"} = \\)<b>\\("+a2+"\\sqrt{"+b2+"}\\)</b>. The student\u2019s radicand was right, but the coefficient was not the square root of "+(a2*a2)+".",
    {N:N2,pw:pw});
});
E("u4-order",4,["1.4"],2,"gen",function(){
  var base=ri(5,10),g1=ri(2,4),g2=ri(2,4),g3=ri(2,5);
  var ins=[base,base+g1,base+g1+g2,base+g1+g2+g3];
  function render(n){var c=Math.floor(Math.sqrt(n));if(c*c===n)return ""+c;var r=n;var co=1;for(var d=2;d*d<=r;d++){while(r%(d*d)===0){r/=(d*d);co*=d;}}return (co>1?co:"")+"\\sqrt{"+r+"}";}
  var items=ins.map(function(n){return {s:render(n),v:Math.sqrt(n)};});
  var sorted=items.slice().sort(function(x,y){return x.v-y.v;});
  function list(arr){return "\\("+arr.map(function(o){return o.s;}).join(", ")+"\\)";}
  var asc=list(sorted);
  var shown=shuffle(items.slice());
  var shownStr=list(shown);
  var rev=list(sorted.slice().reverse());
  var rot=list([sorted[1],sorted[2],sorted[3],sorted[0]]);
  var midswap=list([sorted[0],sorted[2],sorted[1],sorted[3]]);
  return mcq("Which list shows these radicals in order from least to greatest? "+shownStr,
    asc,[rev,rot,midswap],
    "Square each value (or estimate): "+sorted.map(function(o){return "\\("+o.s+" \\approx "+fmt(o.v)+"\\)";}).join(", ")+". Ordered least to greatest: <b>"+asc+"</b>.",{items:items});
});

/* ----- bank-u6.js ----- */
// Math 2201 Unit 6: Proportional Reasoning question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1522 to 1686).
// CRMARKS: u6-scale-factor=1
// CRMARKS: u6-unknown-dimension=1
// CRMARKS: u6-area-scale=2
// CRMARKS: u6-volume-scale=2
// CRMARKS: u6-unit-rate=1
// CRMARKS: u6-better-buy=2
// CRMARKS: u6-rate-solve=1
// CRMARKS: u6-poster-cost=3
// CRMARKS: u6-work-rate-solo=3
// CRMARKS: u6-justify-consistency=3
// CRMARKS: u6-breakeven-plans=2
/* ============ Unit 6: Proportional Reasoning ============ */
E("u6-scale-factor",6,["6.9"],1,"gen",function(){
  var k=pick([8,9,10,12,15,18,20,24,25,30,40,50,60]);var model=pick([3,4,5,6,7,8,9,10,12,14]);var real=model*k;
  var frame=pick([
    "On a model, a part measures "+model+" cm. On the real object it measures "+real+" cm. What is the scale factor (actual \\(\\div\\) model)?",
    "A scale drawing shows a length of "+model+" cm for an object that is really "+real+" cm long. What is the scale factor (actual \\(\\div\\) model)?",
    "A map feature measures "+model+" cm on the map and "+real+" cm on the ground. What is the scale factor (actual \\(\\div\\) model)?"]);
  return numq(frame,
    k,0.011,"Scale factor = \\("+real+" \\div "+model+" = \\)<b>\\("+k+"\\)</b>. The scale is \\(1 : "+k+"\\).",{k:k,model:model});
});
E("u6-unknown-dimension",6,["6.9"],1,"gen",function(){
  var k=pick([10,12,15,20,24,25,30,40,50,60,100]);var obj=pick([{w:"toy car",u:"cm"},{w:"model boat",u:"cm"},{w:"dollhouse room",u:"cm"},{w:"model train",u:"cm"},{w:"miniature lighthouse",u:"cm"},{w:"model airplane",u:"cm"}]);
  var modelDim=pick([3,4,5,6,7,8,9,10,12,14]);var real=modelDim*k;
  return numq("A "+obj.w+" is built to a scale of \\(1 : "+k+"\\). A part that is "+modelDim+" "+obj.u+" long on the model represents what length on the real object, in "+obj.u+"?",
    real,0.011,"Multiply by the scale factor: \\("+modelDim+" \\times "+k+" = \\)<b>\\("+real+"\\text{ "+obj.u+"}\\)</b>.",{k:k,modelDim:modelDim});
});
E("u6-area-scale",6,["6.5","6.14"],1,"gen",function(){
  var k=pick([2,3,4,5,6,8,10]);var areaD=pick([3,4,5,6,7,8,9,10,12,14,15,16,18,20,24,25]);
  var obj=pick(["room","garden plot","mural","kitchen floor","rug design"]);
  var real=areaD*k*k;
  return numq("A scale diagram uses scale factor \\("+k+"\\) (diagram : actual = \\(1 : "+k+"\\)). A "+obj+" has area \\("+areaD+"\\text{ cm}^2\\) on the diagram. What is its actual area, in \\(\\text{cm}^2\\)?",
    real,0.011,"Areas scale by the square of the scale factor: \\("+areaD+" \\times "+k+"^2 = "+areaD+" \\times "+(k*k)+" = \\)<b>\\("+real+"\\text{ cm}^2\\)</b>. (Lengths scale by \\("+k+"\\); areas by \\("+k+"^2\\); volumes by \\("+k+"^3\\).)",{k:k,areaD:areaD});
});
E("u6-volume-scale",6,["6.10","6.14"],1,"gen",function(){
  var k=pick([2,3,4,5,6,10]);var askVol=Math.random()<0.5;var base=pick([3,4,5,6,8,10,12,15,20,25]);var f=askVol?k*k*k:k*k;var ans=base*f;
  var obj=pick(["model car","aquarium","storage tank","dollhouse"]);
  return numq("A "+obj+" is built at scale \\(1 : "+k+"\\). The model’s "+(askVol?"volume is \\("+base+"\\text{ cm}^3\\)":"surface area is \\("+base+"\\text{ cm}^2\\)")+". What is the corresponding measurement for the real object, in the same cubic/square units?",
    ans,0.011,(askVol?"Volumes":"Surface areas")+" scale by \\("+k+(askVol?"^3":"^2")+" = "+f+"\\): \\("+base+" \\times "+f+" = \\)<b>\\("+ans+"\\)</b>.",{k:k,base:base,askVol:askVol});
});
E("u6-unit-rate",6,["6.17"],1,"gen",function(){
  var ctxs=[
    {pre:"A case of juice boxes costs $",q:24,u:"dollars per juice box"},
    {pre:"A spool holds ribbon costing $",q:15,u:"dollars per metre of ribbon"},
    {pre:"A pack of granola bars costs $",q:12,u:"dollars per granola bar"},
    {pre:"A bag of dog treats costs $",q:30,u:"dollars per treat"},
    {pre:"A box of pencils costs $",q:20,u:"dollars per pencil"},
    {pre:"A crate of oranges costs $",q:18,u:"dollars per orange"}];
  var ctx=pick(ctxs);var rate=pick([0.5,0.6,0.75,0.8,0.9,1,1.1,1.2,1.25,1.4,1.5,1.6,1.75,1.8,2,2.2,2.4,2.5,2.8,3,3.5,4]);
  var total=Math.round(rate*ctx.q*100)/100;
  return numq(ctx.pre+fmt(total)+", and the pack holds "+ctx.q+". What is the unit rate, in "+ctx.u+"? (Just the number.)",
    rate,0.011,"Unit rate = total cost \\(\\div\\) quantity \\(= "+fmt(total)+" \\div "+ctx.q+" = \\)<b>\\(\\$"+fmt(rate)+"\\)</b>.",{rate:rate,total:total});
});
E("u6-better-buy",6,["6.17"],2,"gen",function(){
  var prod=pick([{w:"juice boxes",u:"juice box"},{w:"granola bars",u:"granola bar"},{w:"pencils",u:"pencil"},{w:"batteries",u:"battery"},{w:"muffins",u:"muffin"},{w:"golf balls",u:"golf ball"}]);
  var q1=pick([3,4,5,6,8,10]);var q2=q1*pick([2,3]);
  var r1=pick([0.9,1.1,1.2,1.4,1.5,1.6,1.8,2,2.2,2.5]);var r2=Math.round((r1-pick([0.1,0.15,0.2,0.25,0.3,0.4]))*100)/100;
  var p1=Math.round(r1*q1*100)/100,p2=Math.round(r2*q2*100)/100;var swap=Math.random()<0.5;
  var A={q:swap?q2:q1,p:swap?p2:p1},B={q:swap?q1:q2,p:swap?p1:p2};
  var winner=A.p/A.q<B.p/B.q?"The first option":"The second option";
  return mcq("Option 1: "+A.q+" "+prod.w+" for $"+fmt(A.p)+". Option 2: "+B.q+" "+prod.w+" for $"+fmt(B.p)+". Which is the better buy?",
    winner+" — its unit rate is \\(\\$"+fmt(Math.min(A.p/A.q,B.p/B.q))+"\\) per "+prod.u+", the lower of the two",
    [(winner==="The first option"?"The second option":"The first option")+" - a bigger package is always cheaper per item in every case","They are the same value - the prices scale exactly for both packs","Whichever costs less overall, regardless of quantity, is always the better buy here"],
    "Unit rates: Option 1: \\("+fmt(A.p)+" \\div "+A.q+" = \\$"+fmt(A.p/A.q)+"\\); Option 2: \\("+fmt(B.p)+" \\div "+B.q+" = \\$"+fmt(B.p/B.q)+"\\). Compare unit rates, not sticker prices — "+winner.toLowerCase()+" wins.",{A:A,B:B});
});
E("u6-rate-solve",6,["6.1"],1,"gen",function(){
  var ctxs=[
    function(R,T){return "A tap delivers "+R+" litres of water per minute. How many minutes does it take to fill a "+T+" L tank?";},
    function(R,T){return "A cyclist rides at a steady "+R+" km/h. How many hours does a "+T+" km ride take?";},
    function(R,T){return "A garden hose delivers "+R+" litres of water per minute. How many minutes does it take to fill a "+T+" L barrel?";},
    function(R,T){return "A printer prints "+R+" pages per minute. How many minutes does it take to print "+T+" pages?";},
    function(R,T){return "A snowplow clears "+R+" km of road per hour. How many hours does it take to clear "+T+" km?";},
    function(R,T){return "A download runs at "+R+" MB per second. How many seconds does a "+T+" MB file take?";},
    function(R,T){return "A bottling machine fills "+R+" bottles per minute. How many minutes does it take to fill "+T+" bottles?";},
    function(R,T){return "A painter covers \\("+R+"\\text{ m}^2\\) of wall per hour. How many hours does a \\("+T+"\\text{ m}^2\\) wall take?";}];
  var rate=pick([4,5,6,8,9,10,12,15,16,18,20,24]);var t=pick([2,3,4,5,6,7,8,9]);var total=rate*t;
  return numq(pick(ctxs)(rate,total),
    t,0.011,"Amount \\(= \\text{rate} \\times \\text{time}\\), so time \\(= \\text{amount} \\div \\text{rate} = "+total+" \\div "+rate+" = \\)<b>\\("+t+"\\)</b>. Isolating the variable first keeps the arithmetic in one step.",{t:t,total:total,rate:rate});
});
E("u6-slope-rate",6,["6.19"],1,"var",varset([
  function(){return mcq("A graph shows distance from home (km) against time (h) for a drive. The line passes through \\((0, 0)\\) and \\((2, 110)\\). What does the slope of the line represent, and what is it?",
    "The speed: \\(110 \\div 2 = 55\\text{ km/h}\\) — the slope of a distance–time graph is the rate of travel",
    ["The total distance: \\(110\\text{ km}\\) - the distance covered over the whole drive, end to end","The time taken: \\(2\\text{ h}\\) - the time the whole drive lasted from start to the finish of the trip","The acceleration: \\(55\\text{ km/h}^2\\) - the rate at which the speed changes during the drive"],
    "Slope \\(= \\text{rise} \\div \\text{run} = \\) change in distance \\(\\div\\) change in time, which is exactly a rate: \\(55\\text{ km/h}\\).",{});},
  function(){return mcq("On a graph of water volume (L) versus time (min), a filling tank's line rises \\(60\\text{ L}\\) over \\(4\\text{ min}\\). What is the slope, and what does it mean?",
    "\\(15\\text{ L/min}\\) — the rate at which water is flowing into the tank",
    ["\\(60\\text{ L}\\) - the tank's capacity when it is filled right to the top","\\(4\\text{ min}\\) - the time to fill the tank from empty to full at this rate","\\(240\\text{ L/min}\\) - rise times run, the amount multiplied by the time"],
    "Slope \\(= 60 \\div 4 = 15\\), and its units (L per min) name the rate directly.",{});},
  function(){return mcq("A graph of distance travelled (km) against fuel used (L) for a delivery van is a straight line through \\((0, 0)\\) and \\((25, 300)\\). What does its slope represent, and what is it?",
    "Fuel efficiency: \\(300 \\div 25 = 12\\text{ km per litre}\\) — the slope is distance per unit of fuel",
    ["The fuel used on the trip: \\(25\\text{ L}\\) - the fuel the van used on the whole trip","The distance travelled: \\(300\\text{ km}\\) - the distance the van travelled over the whole trip shown","\\(12\\text{ L per km}\\) - slope is fuel divided by distance: \\(300 \\div 25 = 12\\text{ L per km}\\) on this trip"],
    "Slope \\(= \\text{rise} \\div \\text{run} = \\text{km} \\div \\text{L}\\), a rate of travel per litre: \\(12\\text{ km/L}\\).",{});}
]));
E("u6-poster-cost",6,["6.14","6.17"],2,"gen",function(){
  var kw=pick([1.5,2,2.5,3,3.5,4,5]);var W=10*kw,H=15*kw;var area=W*H;var rate=pick([0.02,0.03,0.04,0.05,0.06,0.08,0.1,0.12]);var cost=area*rate;
  var frame=pick([
    "A photo 10 cm by 15 cm is enlarged so its width becomes "+fmt(W)+" cm (the height scales in proportion). A print shop charges $"+fmt(rate)+" per \\(\\text{cm}^2\\) of print area. What does the enlarged print cost, in dollars? (Just the number.)",
    "A print shop enlarges a 10 cm by 15 cm photo to a width of "+fmt(W)+" cm, keeping the proportions. Printing costs $"+fmt(rate)+" per \\(\\text{cm}^2\\). What is the cost of the enlarged print, in dollars? (Just the number.)"]);
  return numq(frame,Math.round(cost*100)/100,0.02,"Scale factor \\(= "+fmt(W)+" \\div 10 = "+fmt(kw)+"\\), so the height becomes \\(15 \\times "+fmt(kw)+" = "+fmt(H)+"\\text{ cm}\\). Area \\(= "+fmt(W)+" \\times "+fmt(H)+" = "+fmt(area)+"\\text{ cm}^2\\) (that is the original \\(150\\text{ cm}^2\\) times \\("+fmt(kw)+"^2\\), as areas scale by \\(k^2\\)). Cost \\(= "+fmt(area)+" \\times \\$"+fmt(rate)+" = \\)<b>\\(\\$"+fmt(cost)+"\\)</b>.",{kw:kw,area:area,rate:rate});
});
E("u6-work-rate-solo",6,["6.16","6.23"],3,"gen",function(){
  var ctx=pick([
    {b:"hoses",one:"hose",job:"fill a water tank"},
    {b:"snow blowers",one:"snow blower",job:"clear a parking lot"},
    {b:"printers",one:"printer",job:"print a stack of programs"},
    {b:"pipes",one:"pipe",job:"drain a swimming pool"},
    {b:"machines",one:"machine",job:"bottle a batch of juice"}]);
  var T=0,k=0,mode=0,tries=0;
  do{T=pick([2,3,4,6,8]);k=pick([2,3,4]);mode=ri(0,1);tries++;}while(T*(k+1)%k!==0&&tries<60);
  var slow=T*(k+1),fast=slow/k,ans=mode===0?slow:fast;
  return numq("Two "+ctx.b+" working together can "+ctx.job+" in "+T+" hours. One "+ctx.one+" works "+k+" times as fast as the other. How many hours would the "+(mode===0?"slower":"faster")+" "+ctx.one+" take to "+ctx.job+" on its own?",
    ans,0.011,
    "Rates add when the "+ctx.b+" work together. The combined rate is \\(\\frac{1}{"+T+"}\\) of the job per hour. If the slower "+ctx.one+" works at rate \\(r\\), the faster works at rate \\("+k+"r\\), so \\("+k+"r + r = \\frac{1}{"+T+"}\\), which gives \\(r = \\frac{1}{"+slow+"}\\) of the job per hour. The slower "+ctx.one+" alone takes \\("+slow+"\\) hours, and the faster one takes \\("+slow+" \\div "+k+" = "+fast+"\\) hours. The question asks for the "+(mode===0?"slower":"faster")+" one: <b>\\("+ans+"\\text{ hours}\\)</b>.",
    {T:T,k:k,mode:mode});
});
E("u6-justify-consistency",6,["6.16","6.17"],3,"gen",function(){
  var ctx=pick([
    {who:"bus drivers",names:["Mina","Theo"],act:"Trip times for the same route, in minutes"},
    {who:"ferry captains",names:["June","Omar"],act:"Crossing times for the same crossing, in minutes"},
    {who:"delivery drivers",names:["Ana","Karl"],act:"Delivery times for the same route, in minutes"}]);
  var base=ri(18,30);
  var offA=pick([[-1,0,1,0,-1],[0,1,-1,1,0],[1,1,0,-1,0],[0,0,1,-1,1]]);
  var offB=pick([[-4,-1,3,5,-3],[-5,2,4,-2,1],[-3,5,-4,0,2],[4,-5,1,-1,3]]);
  var tight=offA.map(function(o){return base+o;});
  var wide=offB.map(function(o){return base+o;});
  var cIdx=Math.random()<0.5?0:1;
  var lists=[null,null];lists[cIdx]=tight;lists[1-cIdx]=wide;
  function sum(arr){return arr.reduce(function(s,v){return s+v;},0);}
  function rng(arr){return Math.max.apply(null,arr)-Math.min.apply(null,arr);}
  var cName=ctx.names[cIdx],oName=ctx.names[1-cIdx];
  return textq("Two "+ctx.who+" do the same work on five different days. "+ctx.act+": "+ctx.names[0]+" recorded "+lists[0].join(", ")+"; "+ctx.names[1]+" recorded "+lists[1].join(", ")+". Which one is more consistent? (Type the name.)",
    [cName],
    "Consistency is about spread, not speed. "+cName+"\u2019s times run from "+Math.min.apply(null,tight)+" to "+Math.max.apply(null,tight)+", a range of "+rng(tight)+", while "+oName+"\u2019s run from "+Math.min.apply(null,wide)+" to "+Math.max.apply(null,wide)+", a range of "+rng(wide)+". Their averages are close ("+fmt(sum(tight)/5,1)+" min and "+fmt(sum(wide)/5,1)+" min), so the averages do not decide it. The tighter spread makes <b>"+cName+"</b> the more consistent one.",
    {base:base,cIdx:cIdx});
});
E("u6-breakeven-plans",6,["6.17","6.19"],3,"gen",function(){
  var fr=pick([
    "A moving company rents trucks under two plans.",
    "A car rental agency offers two plans."]);
  var f1=pick([29,39,49,59]);var dr=pick([0.25,0.5]);var r2=pick([0.45,0.55,0.65,0.75]);var r1=r2+dr;
  var df=pick([10,15,20,25,30,40]);var f2=f1+df;var d=df/dr;
  return numq(fr+" Plan A charges a fee of $"+f1+" plus $"+fmtF(r1,2)+" per km driven. Plan B charges a fee of $"+f2+" plus $"+fmtF(r2,2)+" per km driven. For what distance, in km, do the two plans cost exactly the same?",
    d,0.011,
    "Write each cost as a per-km rate times the distance, plus the fixed fee; the per-km charge is the slope of the cost graph. Plan A: \\(C = "+f1+" + "+fmt(r1)+"d\\). Plan B: \\(C = "+f2+" + "+fmt(r2)+"d\\). Setting the costs equal: \\("+f1+" + "+fmt(r1)+"d = "+f2+" + "+fmt(r2)+"d\\), so \\("+fmt(dr)+"d = "+df+"\\), and \\(d = \\)<b>\\("+d+"\\text{ km}\\)</b>. Below that distance the lower fee wins; above it, the lower per-km rate wins.",
    {f1:f1,f2:f2,r1:r1,r2:r2});
});
E("u6-sail-scale-mc",6,["6.10","6.14"],3,"gen",function(){
  var Am=0,k=0,tries=0,ok=false,key=0,d1=0,d2=0,d3=0;
  while(!ok&&tries<400){tries++;
    Am=pick([24,30,36,40,45,48,50,60]);k=pick([20,24,25,30,36,40,50]);
    key=Am*k*k/10000;d1=Am*k/10000;d2=Am*k*k/100;d3=Am*k*k/1000;
    var os=[fmt(key,3),fmt(d1,3),fmt(d2,3),fmt(d3,3)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A scale model of a sailboat is built to a scale of \\(1 : "+k+"\\). The sail on the model has an area of "+Am+" \\(\\text{cm}^2\\). What is the area of the real sail, in \\(\\text{m}^2\\)?",
    fmt(key,3),[fmt(d1,3),fmt(d2,3),fmt(d3,3)],
    "Areas scale by the square of the scale factor, not by the factor itself: the real sail has area \\("+Am+" \\times "+k+"^2 = "+(Am*k*k)+"\\text{ cm}^2\\). Since \\(1\\text{ m}^2 = 10\\,000\\text{ cm}^2\\), that is \\("+(Am*k*k)+" \\div 10\\,000 = \\)<b>\\("+fmt(key,3)+"\\text{ m}^2\\)</b>.",
    {Am:Am,k:k});
});
E("u6-unit-price-mc",6,["6.16"],1,"gen",function(){
  var fr=null,n=0,unit=0,P=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    fr=pick([{w:"granola bars",s:"bar"},{w:"juice boxes",s:"juice box"},{w:"batteries",s:"battery"},{w:"pencils",s:"pencil"},{w:"muffins",s:"muffin"}]);
    n=pick([4,5,6,8,10,12]);unit=pick([0.65,0.75,0.85,0.95,1.05,1.15,1.25,1.45,1.55,1.75,1.95,2.25,2.45,2.75,3.25]);
    P=Math.round(n*unit*100)/100;
    d1=Math.round((n/P)*100)/100;
    d2=Math.round((P/(n+2))*100)/100;
    d3=Math.round((P/(n-1))*100)/100;
    var os=[fmtF(unit,2),fmtF(d1,2),fmtF(d2,2),fmtF(d3,2)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A pack of "+n+" "+fr.w+" costs $"+fmtF(P,2)+". What is the cost per "+fr.s+", in dollars?",
    fmtF(unit,2),[fmtF(d1,2),fmtF(d2,2),fmtF(d3,2)],
    "The unit price is the total cost divided by the number of items: \\("+fmtF(P,2)+" \\div "+n+" = \\)<b>\\(\\$"+fmtF(unit,2)+"\\)</b> per "+fr.s+". Dividing the other way would give items per dollar, not dollars per item.",
    {n:n,P:P});
});

/* ----- bank-u7.js ----- */
// Math 2201 Unit 7: Inductive and Deductive Reasoning question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1687 to 1772).
// CRMARKS: u7-pattern-next=1
// CRMARKS: u7-pattern-quad=2
// CRMARKS: u7-counterexample=2
/* ============ Unit 7: Inductive and Deductive Reasoning ============ */
E("u7-pattern-next",7,["2.1"],2,"gen",function(){
  var a=ri(2,6),b=ri(1,9);var terms=[1,2,3,4].map(function(n){return a*n+b;});
  var askN=pick([8,10,12]);var ans=a*askN+b;
  return numq("A pattern begins \\("+terms.join(", ")+", \\ldots\\) The rule is linear. What is term \\("+askN+"\\) of the pattern?",
    ans,0.011,"Each term grows by \\("+a+"\\): term \\(n\\) is \\("+a+"n + "+b+"\\). Term \\("+askN+" = "+a+"("+askN+") + "+b+" = \\)<b>\\("+ans+"\\)</b>. (Spotted by observing the pattern, then justifying with the rule — inductive reasoning at work.)",{a:a,b:b,askN:askN});
});
E("u7-pattern-quad",7,["2.1"],2,"gen",function(){
  var c=pick([0,1,2,3,4,5,6,8,10]);var obj=pick(["tiles","matchsticks","beads"]);var terms=[1,2,3,4].map(function(n){return n*n+c;});var askN=pick([6,7,8,9,10,11,12,13,14,15]);var ans=askN*askN+c;
  return numq("A pattern of figures is built from "+obj+": figure 1 uses "+terms[0]+" "+obj+", figure 2 uses "+terms[1]+", figure 3 uses "+terms[2]+", figure 4 uses "+terms[3]+". How many "+obj+" does figure "+askN+" use?",
    ans,0.011,"The counts are \\(1^2"+(c?" + "+c:"")+", 2^2"+(c?" + "+c:"")+", 3^2"+(c?" + "+c:"")+"\\), \\(\\ldots\\) so figure \\(n\\) uses \\(n^2"+(c?" + "+c:"")+"\\) "+obj+". Figure \\("+askN+"\\) uses \\("+askN+"^2"+(c?" + "+c:"")+" = \\)<b>\\("+ans+"\\)</b>.",{c:c,askN:askN});
});
E("u7-counterexample",7,["2.4"],1,"var",varset([
  function(){return mcq("Conjecture: \u2018All prime numbers are odd.\u2019 Which value is a counterexample?",
    "\\(2\\) — it is prime but not odd",
    ["\\(9\\) — it is odd but not prime","\\(15\\) — it is odd and composite","\\(1\\) — it is neither prime nor composite"],
    "A counterexample must satisfy the conjecture's condition (prime) and break its claim (odd). Only \\(2\\) does both: it is prime, and it is even. One counterexample is enough to kill a conjecture.",{});},
  function(){return mcq("Conjecture: \u2018Every number divisible by \\(3\\) is also divisible by \\(6\\).\u2019 Which value is a counterexample?",
    "\\(9\\) — divisible by \\(3\\), but \\(9 \\div 6\\) is not whole",
    ["\\(12\\) — divisible by both \\(3\\) and \\(6\\), so it agrees","\\(18\\) — divisible by both \\(3\\) and \\(6\\), so it agrees","\\(4\\) — not divisible by \\(3\\) or \\(6\\)"],
    "\\(9\\) meets the condition (divisible by \\(3\\)) but fails the claim (not divisible by \\(6\\)). \\(12\\) and \\(18\\) support the conjecture; \\(4\\) never meets its condition.",{});},
  function(){return mcq("Conjecture: \u2018The product of two odd numbers is always even.\u2019 Which calculation is a counterexample?",
    "\\(3 \\times 5 = 15\\) — two odd numbers with an odd product",
    ["\\(3 \\times 4 = 12\\) - \\(4\\) is even, so the condition fails","\\(2 \\times 5 = 10\\) — but \\(2\\) is even, so the condition is not met","\\(4 \\times 6 = 24\\) — both factors are even, so it fails"],
    "A counterexample must use two odd numbers (the condition) and break the claim (an even product). Only \\(3 \\times 5 = 15\\) does that. The others smuggle in an even factor, so they never test the conjecture.",{});}
,
function(){return mcq("Conjecture: \u2018The square of a number is always greater than the number itself.\u2019 Which value is a counterexample?",
    "\\(\\frac{1}{2}\\) — its square is \\(\\frac{1}{4}\\), and \\(\\frac{1}{4}\\) is less than \\(\\frac{1}{2}\\)",
    ["\\(2\\) - its square is \\(4\\), so it agrees with the conjecture","\\(3\\) - its square is \\(9\\), greater than \\(3\\), so it agrees","\\(-1\\) - its square is \\(1\\), so it agrees with the conjecture too"],
    "A counterexample must break the claim. Squaring a number between \\(0\\) and \\(1\\) makes it SMALLER: \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), and \\(\\frac{1}{4} < \\frac{1}{2}\\). The other values all agree with the conjecture, so they cannot refute it.",{});},
  function(){return mcq("Conjecture: \u2018Dividing one natural number by another always gives a result smaller than the number you started with.\u2019 Which calculation is a counterexample?",
    "\\(6 \\div 1 = 6\\) — the result equals the starting number instead of being smaller",
    ["\\(6 \\div 2 = 3\\) - smaller than \\(6\\), so it agrees with the conjecture completely","\\(6 \\div 3 = 2\\) — smaller than \\(6\\), so it agrees with the conjecture","\\(6 \\div 6 = 1\\) — smaller than \\(6\\), so it agrees with the conjecture"],
    "Dividing by \\(1\\) leaves a number unchanged, so the result is not smaller. One counterexample is enough to show the conjecture is false.",{});}
]));
E("u7-inductive-false",7,["2.2"],1,"var",varset([
  function(){return mcq("A student notices \\(3\\), \\(5\\) and \\(7\\) are all prime and concludes \u2018every odd number is prime\u2019. Why might this inductive conclusion be false?",
    "Inductive reasoning generalizes from a few cases — an unchecked case (like \\(9 = 3 \\times 3\\)) can break the pattern",
    ["Because \\(3\\), \\(5\\) and \\(7\\) are not really prime, and a conclusion based on unchecked examples cannot be trusted","Because odd numbers cannot be studied by patterns, so no pattern spotted among odd numbers can ever lead to a conclusion","Because conclusions need \(3 + 7 = 10\) examples to be allowed, and three cases is far too few to count"],
    "Induction spots a pattern in observed cases but never checks them all. The very next odd numbers include \\(9\\), which is composite — the conjecture fails.",{});},
  function(){return mcq("Which statement best compares inductive and deductive reasoning?",
    "Inductive reasoning moves from examples to a general conjecture that might be false; deductive reasoning starts from accepted facts and its conclusions must follow",
    ["Inductive reasoning is always wrong and deductive reasoning is always right, because reasoning from examples can never be trusted in any situation whatsoever","Deductive reasoning is based on examples; inductive reasoning is based on definitions, and the two labels are fixed by those starting points in every question","They are two names for the same process, and the difference between them is only a matter of wording, not of how the conclusion is actually reached in the end"],
    "Induction suggests; deduction proves. A conjecture from induction still needs a deductive proof \u2014 or one counterexample ends it.",{});},
  function(){return mcq("A student lists the primes \\(3, 5, 7, 11\\) and \\(13\\), notices they are all odd, and concludes every prime number is odd. Which number is a counterexample?",
    "\\(2\\) — it is prime, and it is even",
    ["\\(9\\) — it is odd and composite","\\(1\\) — it is neither prime nor composite","\\(15\\) — it is odd and composite"],
    "A single counterexample destroys a universal claim. The student's list simply skipped \\(2\\), the one even prime — induction from a partial list is never a proof.",{});}
,
function(){return mcq("A fair coin has landed heads five times in a row. Marcus concludes it will land heads on every future toss. Why is this inductive conclusion unreliable?",
    "Five tosses are a tiny sample \u2014 each toss is independent, so tails can still come up; a short streak does not establish a rule",
    ["Because after five heads, tails is now due \u2014 the coin has to balance out soon, since long runs always correct themselves before long","Because five heads in a row proves the coin must be rigged, since a fair coin could never land the same way five times","Because inductive conclusions are always false, whatever they are based on, so a conclusion reached this way can simply be thrown out"],
    "Induction from a handful of cases is fragile. Nothing about the first five tosses changes the coin, and a longer run would very likely include tails.",{});},
  function(){return mcq("A bakery's Saturday sales doubled three weeks running: \\(40\\), \\(80\\), then \\(160\\) loaves. The owner concludes sales will keep doubling and orders ingredients for \\(1{,}280\\) loaves in week \\(6\\). What is the weakness in this inductive reasoning?",
    "The pattern rests on only three weeks and ignores real limits \u2014 oven space, staff and the number of customers in town cap how much can actually be sold",
    ["Doubling patterns never continue past three terms, because a pattern that doubles is guaranteed to stop once it has appeared three times in a row in a sequence","The arithmetic is wrong — week \\(6\\) would be \\(1{,}024\\) loaves, not \\(1{,}280\\), because the owner worked the doubling out wrongly for week six","Inductive reasoning can never be used to plan a business, because spotting a pattern in past sales tells the owner nothing useful at all about what will happen next"],
    "Three observations make a shaky rule, and this one also runs into the real world: demand and capacity do not double forever. Week \\(6\\) at \\(1{,}280\\) follows the pattern \\((40, 80, 160, 320, 640, 1{,}280)\\) — the flaw is trusting the pattern, not the arithmetic.",{});}
]));
E("u7-valid-argument",7,["2.3"],2,"var",varset([
  function(){return mcq("Argument: \u2018All provincial parks charge an entry fee. Gros Morne is a provincial park. Therefore Gros Morne charges an entry fee.\u2019 (Take the premises as given.) Is the argument valid?",
    "Yes \u2014 if the premises are true, the conclusion must follow: the park belongs to the group the first statement covers",
    ["No - because Gros Morne is actually a national park and not a provincial one, the argument is invalid as stated here","No - arguments about money and entry fees are about real world charges rather than logic, so an argument like this can never be valid","Yes - because the conclusion happens to be true, and any argument whose conclusion is true in real life must be valid"],
    "Validity is about the logic, not the real-world facts. (Gros Morne is in fact a national park, which makes a premise false in reality \u2014 but the argument's form is valid: membership in the group forces the conclusion.)",{});},
  function(){return mcq("Argument: \u2018All squares are rectangles. This shape is a rectangle. Therefore this shape is a square.\u2019 Is the argument valid?",
    "No \u2014 being a rectangle does not force the shape to be a square; the reasoning runs the rule backwards",
    ["Yes - squares and rectangles are the same thing, because both have four sides and four right angles","Yes - the conclusion is true for some shapes, and validity only needs the conclusion to hold in some cases","No - because no shape can be both a square and a rectangle at the same time, so the conclusion cannot follow here"],
    "The premise covers squares inside rectangles, but rectangles form the bigger group. Membership in the bigger group says nothing about the smaller one \u2014 the argument is invalid.",{});},
  function(){return mcq("Argument: \u2018All teachers at this school have a classroom key. Ms. Lee has a classroom key. Therefore Ms. Lee is a teacher at this school.\u2019 Is the argument valid?",
    "No \u2014 having a key does not force her to be a teacher here; custodians and substitutes hold keys too, so the reasoning runs the rule backwards",
    ["Yes - the conclusion sounds reasonable, Ms. Lee is at the school daily, and nothing in the premises rules out her being a teacher there","Yes - every statement in the argument is about the school, its keys, and an argument stays valid when all of its statements stay on the one topic","No - an argument is only valid if it contains numbers, measurements or a calculation, and this argument contains nothing but words about keys"],
    "The premise puts teachers inside the bigger group of key-holders. Membership in the bigger group cannot prove membership in the smaller one \u2014 the same backwards step as the rectangle argument.",{});}
]));
E("u7-proof-error",7,["2.8"],3,"var",varset([
  function(){return mcq("A famous fake proof starts with \\(a = b\\), multiplies out to reach \\((a - b)(a + b) = b(a - b)\\), then cancels \\((a - b)\\) from both sides — and ends with \\(2 = 1\\). Where is the error?",
    "Cancelling \\((a - b)\\) divides both sides by \\(a - b\\), which is \\(0\\) — division by zero is not allowed",
    ["The error is in the first line: \\(a\\) can never equal \\(b\\), because two letters cannot name one number","The error is that \\((a + b)\\) should be \\((a - b)\\), because each term there should come from a subtraction","There is no error; the proof shows \\(2 = 1\\), which means arithmetic breaks down when letters replace numbers"],
    "Since \\(a = b\\), \\(a - b = 0\\). Every later step is fine algebra \u2014 but that one cancellation divides by zero, and from a false step anything can \u2018follow\u2019.",{});},
  function(){return mcq("A student \u2018proves\u2019 that every triangle is isosceles by drawing an angle bisector and a perpendicular bisector, then claiming two pairs of congruent triangles force the two sides equal. What kind of flaw should you look for first?",
    "The proof leans on the diagram \u2014 the intersection point was drawn inside the triangle, but in general it falls outside, changing the argument",
    ["Triangles can never be proved congruent, because no two drawn triangles are ever exactly alike, so every congruence claim rests on the picture","Angle bisectors do not exist in all triangles, because only some triangles have an angle that can be split into two equal parts by a line","The flaw is arithmetic in the side lengths: the student added the side lengths up incorrectly when comparing the two triangles in the proof"],
    "Deductive proofs must follow from stated facts, not from how one picture happens to look. A diagram-based assumption is the classic hidden flaw.",{});},
  function(){return mcq("A student ‘proves’ that \\(-1 = 1\\): ‘Since \\((-1)^2 = 1^2\\), taking the square root of both sides gives \\(-1 = 1\\).’ What is the flaw?",
    "Taking the square root loses the sign — \\(x^2 = y^2\\) only implies \\(x = \\pm y\\), not \\(x = y\\)",
    ["The arithmetic is wrong: \\((-1)^2\\) is \\(-1\\), not \\(1\\), because a negative times a negative stays negative","You are never allowed to square both sides of an equation, because squaring is not a permitted step","There is no flaw - the proof is correct, because square rooting undoes squaring exactly"],
    "Squaring is not reversible on its own: both \\(1\\) and \\(-1\\) square to \\(1\\). The step treats the square root as if it restored the original number exactly.",{});}
]));

/* ----- bank-u8.js ----- */
// Math 2201 Unit 8: Properties of Angles and Triangles question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 1773 to 2138).
// CRMARKS: u8-triangle-sum=1
// CRMARKS: u8-co-interior=1
// CRMARKS: u8-alternate-algebra=2
// CRMARKS: u8-polygon-sum=1
// CRMARKS: u8-regular-angle=1
// CRMARKS: u8-exterior=1
// CRMARKS: u8-polygon-ratio=2
// CRMARKS: u7-counterexample-gen=2
// CRMARKS: u7-sequence-gap=1
// CRMARKS: u5-ci-level-from-report=1
// CRMARKS: u5-ci-shrink=2
// CRMARKS: u5-poll-position=3
// CRMARKS: u5-ci-build=1
// CRMARKS: u5-ci-read-report=2
// CRMARKS: u3-equation-from-roots=2
// CRMARKS: u6-similar-dimension=1
// CRMARKS: u6-compare-rates=2
// CRMARKS: u6-rate-isolate=1
// CRMARKS: u8-angle-sum-rule=1
/* ============ Unit 8: Properties of Angles and Triangles ============ */
E("u8-triangle-sum",8,["5.3"],1,"gen",function(){
  var a=ri(35,75),b=ri(35,75);while(a+b>160){b=ri(30,60);}
  var c=180-a-b;
  var q = numq("Two angles of a triangle measure \\("+a+"^\\circ\\) and \\("+b+"^\\circ\\). What is the measure of the third angle, in degrees?",
    c,0.011,"The interior angles of a triangle sum to \\(180^\\circ\\): \\(180 - "+a+" - "+b+" = \\)<b>\\("+c+"^\\circ\\)</b>.",{a:a,b:b});
  q.figure = triAngSVG(a, b, 180-a-b, {ang:[a+"°",b+"°","?"]});
  return q;
});
E("u8-co-interior",8,["5.8"],1,"gen",function(){
  var a=ri(55,160);var b=180-a;
  var frame=pick([
    "Two parallel lines are cut by a transversal. A co-interior angle measures \\("+a+"^\\circ\\). What is the measure of the co-interior angle on the same side of the transversal, in degrees?",
    "Two parallel rails are cut by a straight crossing path. On the same side of the path, one co-interior angle measures \\("+a+"^\\circ\\). What is the measure of the other co-interior angle on that side, in degrees?"]);
  var q = numq(frame,b,0.011,"Co-interior angles between parallel lines are supplementary: \\(180 - "+a+" = \\)<b>\\("+b+"^\\circ\\)</b>.",{a:a});
  q.figure = transversalSVG("TR", a+"°", "BR", "?");
  return q;
});
E("u8-alternate-algebra",8,["5.8"],2,"gen",function(){
  var x=ri(8,20);var a=3,b=ri(1,15);var val=a*x+b;
  var q = numq("Two parallel lines are cut by a transversal. Alternate interior angles measure \\(("+a+"x + "+b+")^\\circ\\) and \\("+val+"^\\circ\\). Find \\(x\\).",
    x,0.011,"Alternate interior angles between parallel lines are equal: \\[\\begin{aligned} "+a+"x + "+b+" &= "+val+" \\\\ "+a+"x &= "+(val-b)+" \\\\ x &= "+x+" \\end{aligned}\\]",{x:x});
  q.figure = transversalSVG("TR", "("+a+"x + "+b+")°", "BL", val+"°");
  return q;
});
E("u8-polygon-sum",8,["5.2"],1,"gen",function(){
  var n=ri(3,30);var s=(n-2)*180;
  var frame=pick([
    "What is the sum of the interior angles of a polygon with "+n+" sides, in degrees?",
    "A polygon has "+n+" sides. What is the sum of its interior angles, in degrees?",
    "How many degrees do the interior angles of a "+n+"-sided polygon add up to?"]);
  var q = numq(frame,
    s,0.011,"Sum \\(= ("+n+" - 2) \\times 180^\\circ = "+(n-2)+" \\times 180^\\circ = \\)<b>\\("+s+"^\\circ\\)</b>.",{n:n});
  q.figure = polySVG(n, false);
  return q;
});
E("u8-regular-angle",8,["5.1"],1,"gen",function(){
  var n=ri(3,30);var sum=(n-2)*180;var each=sum/n;
  var names={3:"equilateral triangle",4:"square",5:"regular pentagon",6:"regular hexagon",7:"regular heptagon",8:"regular octagon",9:"regular nonagon",10:"regular decagon",11:"regular hendecagon",12:"regular dodecagon"};
  var frame=pick(["What is the measure of each interior angle of a regular polygon with "+n+" sides, in degrees? (A decimal is fine.)",
    "Find the measure of one interior angle of a regular "+n+"-gon, in degrees. (A decimal is fine.)",
    "A regular polygon has "+n+" sides. What is the measure of each of its interior angles, in degrees? (A decimal is fine.)"]);
  if(names[n]&&Math.random()<0.5)frame="What is the measure of each interior angle of a "+names[n]+" (a regular "+n+"-gon), in degrees? (A decimal is fine.)";
  var q = numq(frame,
    each,0.011,"Sum of interior angles \\(= ("+n+" - 2) \\times 180^\\circ = "+sum+"^\\circ\\). All \\("+n+"\\) angles are equal: \\("+sum+" \\div "+n+" = \\)<b>\\("+fmt(each)+"^\\circ\\)</b>.",{n:n});
  q.figure = polySVG(n, true);
  return q;
});
E("u8-exterior",8,["5.11"],1,"gen",function(){
  var a=ri(30,70),b=ri(30,70);var ext=a+b;
  var q = numq("In a triangle, the two non-adjacent interior angles measure \\("+a+"^\\circ\\) and \\("+b+"^\\circ\\). What is the measure of the exterior angle at the third vertex, in degrees?",
    ext,0.011,"The exterior angle equals the sum of the two remote interior angles: \\("+a+" + "+b+" = \\)<b>\\("+ext+"^\\circ\\)</b>. It is also \\(180^\\circ\\) minus the adjacent interior angle — the two facts agree.",{a:a,b:b});
  q.figure = triAngSVG(a, b, 180-a-b, {ang:[a+"°",b+"°",null], ext:2, extLabel:"?"});
  return q;
});
E("u8-congruent",8,["5.6"],1,"var",varset([
  function(){return mcq("Which piece of information is NOT enough, on its own, to prove two triangles congruent?",
    "Three pairs of equal angles (AAA) \u2014 the triangles could be different sizes",
    ["Three pairs of equal sides (SSS) - all three sides match in pairs","Two sides and the contained angle (SAS) - the equal angle sits between the sides","Two angles and the side between them (ASA) - the side between the equal angles"],
    "AAA fixes the shape but not the size \u2014 those triangles are similar, not necessarily congruent. Congruence needs at least one side length anchored.",{});},
  function(){return mcq("Two triangles share a side, have another pair of sides equal, and the angles between those sides are equal. Which congruence rule applies?",
    "SAS \u2014 two sides and the contained angle",
    ["SSS - three sides, matched in pairs","ASA - two angles and a side included between them","AAA - three angles in matching pairs"],
    "The equal angle sits between the two equal sides, which is exactly the side-angle-side pattern.",{});},
  function(){return mcq("Two triangles have two pairs of equal angles, and the side between those two angles is the same length in both triangles. Which rule proves the triangles congruent?",
    "ASA \u2014 two angles and the side between them",
    ["SAS \u2014 two sides and the contained angle","SSS - three sides, matched in pairs","AAA - three angles, matched in pairs at each vertex"],
    "The equal side sits between the two equal angles in each triangle, which is the angle-side-angle pattern.",{});}
]));
E("u8-parallel-check",8,["5.9"],1,"var",varset([
  function(){return mcq("A transversal cuts two lines. Corresponding angles measure \\(112^\\circ\\) and \\(112^\\circ\\). What can you conclude?",
    "The lines are parallel \u2014 equal corresponding angles is one of the tests for parallel lines",
    ["The lines are not parallel, because the angles should add to \\(180^\\circ\\) rather than be equal to each other","Nothing - angle measures cannot tell us about parallel lines or about any other lines","The lines are perpendicular, because equal angles show the lines meet at right angles"],
    "When a transversal makes corresponding angles equal, the lines are parallel. (Supplementary is the test for co-interior angles, a different pair.)",{});},
  function(){return mcq("A transversal cuts two lines, and co-interior angles measure \\(105^\\circ\\) and \\(82^\\circ\\). Are the lines parallel?",
    "No — co-interior angles between parallel lines must be supplementary, and \\(105 + 82 = 187 \\neq 180\\)",
    ["Yes - any two angles formed by a transversal prove the lines parallel, whatever they measure","Yes - because both angles are obtuse and acute in balance, which makes the lines parallel","No - because co-interior angles must be equal, so \\(105 = 82\\) must hold for parallel lines"],
    "For parallel lines, co-interior angles add to exactly \\(180^\\circ\\). \\(187^\\circ\\) misses, so the lines are not parallel.",{});},
  function(){return mcq("A transversal cuts two lines, and a pair of alternate exterior angles both measure \\(74^\\circ\\). What can you conclude?",
    "The lines are parallel \u2014 equal alternate exterior angles is one of the tests for parallel lines",
    ["The lines are not parallel - alternate angles must add to \\(180^\\circ\\) rather than match each other","Nothing - angles outside the lines give no information about whether the two lines are parallel or not","The lines are perpendicular - matching outside angles show the lines meet at right angles"],
    "Equal corresponding angles, equal alternate angles, or supplementary co-interior angles each certify parallel lines. Here the alternate exterior pair matches at \\(74^\\circ\\).",{});}
]));
E("u8-polygon-ratio",8,["5.2"],2,"gen",function(){
  var r=pick([1,2,3,4,5,7,8,9,11,14,15,17,19,23,29,35]);var ext=180/(r+1);var n=360/ext;var interior=r*ext;
  var frame=pick([
    "In a regular polygon, each interior angle is "+r+" times as large as each exterior angle. How many sides does the polygon have?",
    "Each interior angle of a regular polygon is "+r+" times each exterior angle. How many sides does the polygon have?",
    "A regular polygon's interior angle is "+r+" times its exterior angle. Find the number of sides.",
    "For a regular polygon, the ratio of an interior angle to its exterior angle is \\("+r+" : 1\\). How many sides does it have?"]);
  return numq(frame,
    n,0.011,"\\(\\text{Interior} + \\text{exterior} = 180^\\circ\\). With interior \\(= "+r+" \\times \\text{exterior}\\): \\(("+r+" + 1) \\times \\text{exterior} = 180^\\circ\\), so each exterior angle is \\("+fmt(ext)+"^\\circ\\) (and each interior angle is \\("+fmt(interior)+"^\\circ\\)). The exterior angles make one full turn: \\(360 \\div "+fmt(ext)+" = \\)<b>\\("+fmt(n)+"\\text{ sides}\\)</b>.",{r:r,ext:ext});
});
E("u7-reasoning-type",7,["2.7"],1,"var",varset([
  function(){return mcq("Which option uses INDUCTIVE reasoning?",
    "\\(4 \\times 6 = 24\\), \\(2 \\times 8 = 16\\) and \\(10 \\times 12 = 120\\) — in every case tried, the product of two even numbers is even",
    ["Let the numbers be \\(2a\\) and \\(2b\\). Their product is \\(4ab = 2(2ab)\\), a multiple of \\(2\\), so it is even","An even number is defined as a multiple of \\(2\\), and a product of multiples of \\(2\\) is a multiple of \\(2\\)","Let one number be \\(2a + 1\\) and the other \\(2b + 1\\). Their product is \\(4ab + 2a + 2b + 1\\), which is an odd number"],
    "Inductive reasoning generalizes from specific cases that were actually tried. The other options argue from general forms or definitions \u2014 that is deduction (and the last one is even about odd numbers, not this claim).",{});},
  function(){return mcq("Sam writes: \u2018The bus was late on Monday and on Tuesday, so it will be late again tomorrow.\u2019 What kind of reasoning is this?",
    "Inductive \u2014 it predicts tomorrow from a few observed cases",
    ["Deductive \u2014 the conclusion simply has to follow","A counterexample \u2014 it disproves the bus schedule","A proof \u2014 two examples are enough to prove a pattern holds"],
    "Sam observed two cases and generalized to an unobserved one. That is induction: the conclusion is plausible, not guaranteed.",{});},
  function(){return mcq("The angles in any triangle add to \\(180^\\circ\\). Priya uses that rule to work out the third angle of the triangle in her homework. What kind of reasoning is she using?",
    "Deductive \u2014 she applies a general rule to a specific case",
    ["Inductive \u2014 she is looking for a pattern in triangles","A counterexample \u2014 she is testing whether the rule ever fails","Circular \u2014 she assumes the very thing she is proving"],
    "Deduction moves from the general to the specific: the rule covers every triangle, so it covers hers.",{});}
]));
E("u7-proof-pick",7,["2.7"],3,"var",varset([
  function(){return mcq("Which option uses DEDUCTIVE reasoning to show that the sum of two odd numbers is always even?",
    "Let the two numbers be \\(2a + 1\\) and \\(2b + 1\\). Their sum is \\(2a + 2b + 2 = 2(a + b + 1)\\), which is a multiple of \\(2\\) — so the sum is even for every pair of odd numbers",
    ["\\(3 + 5 = 8\\), \\(7 + 9 = 16\\), \\(11 + 13 = 24\\), \\(15 + 17 = 32\\), \\(21 + 23 = 44\\) and \\(31 + 33 = 64\\) - in each case the sum is even, so odd numbers add to an even sum","Let the two numbers be \\(2a + 1\\) and \\(2b + 1\\). Their sum is \\(2ab + 2\\), which is a multiple of \\(2\\), so the sum is even for every pair of odd numbers, for all values of \\(a\\) and \\(b\\)","A calculator checked \\(500\\) random pairs of odd numbers, small ones and large ones in the hundreds and thousands alike, and every sum came out even, with no exception found"],
    "Deductive reasoning starts from a general form \u2014 every odd number can be written as \\(2a + 1\\) — and the algebra settles the claim for all cases at once. Checking examples, even \\(500\\) of them, is inductive: it can suggest the claim but never prove it. And the option giving the sum as \\(2ab + 2\\) is algebra gone wrong \u2014 that is not what the sum is.",{});},
  function(){return mcq("Which option uses DEDUCTIVE reasoning to show that the sum of three even integers is always even?",
    "Write the integers as \\(2a\\), \\(2b\\) and \\(2c\\). Their sum is \\(2a + 2b + 2c = 2(a + b + c)\\), a multiple of \\(2\\), so the sum is even",
    ["\\(2 + 4 + 6 = 12\\), \\(4 + 8 + 10 = 22\\), \\(6 + 10 + 14 = 30\\) and \\(8 + 12 + 16 = 36\\) - in every case the sum comes out even","Write the integers as \\(2a\\), \\(2b\\) and \\(2c\\). Their sum is \\(2a + 2b + 2c = 6abc\\), which is even, so the sum is always even","A spreadsheet tested \\(500\\) triples of even integers, small triples and large ones alike, and every sum the spreadsheet produced was even"],
    "Only the option that factors the sum as \\(2(a + b + c)\\) proves the claim for every triple at once. Examples and spreadsheet checks are inductive, and \\(6abc\\) is not the sum of \\(2a\\), \\(2b\\) and \\(2c\\).",{});}
]));
E("u7-counterexample-gen",7,["2.4"],1,"gen",function(){
  var pairs=[[3,4],[3,5],[4,6],[5,6],[2,5],[6,8],[6,9],[4,10],[6,10],[6,15],[8,12],[9,12],[10,15],[5,7],[4,7]];
  var pr=pick(pairs),A=pr[0],B=pr[1];
  function gg(x,y){while(y){var t=x%y;x=y;y=t;}return x;}
  var L=A*B/gg(A,B);
  var valid=[];for(var t=1;t<=8;t++){if((A*t)%B!==0)valid.push(t);}
  var k=A*pick(valid);
  var mults=[1,2,3,4].sort(function(){return Math.random()-0.5;}).slice(0,3);
  var wrongs=mults.map(function(m){return "\\("+(L*m)+"\\)";});
  var claim=pick(["Every number divisible by \\("+A+"\\) is also divisible by \\("+B+"\\)","A multiple of \\("+A+"\\) is always a multiple of \\("+B+"\\)"]);
  return mcq("Conjecture: \u2018"+claim+".\u2019 Which value is a counterexample?",
    "\\("+k+"\\)",wrongs,
    "\\("+k+"\\) is divisible by \\("+A+"\\) (\\("+A+" \\times "+(k/A)+" = "+k+"\\)), but \\("+k+" \\div "+B+"\\) is not a whole number, so it breaks the conjecture. Each other value is a multiple of \\("+B+"\\) as well as \\("+A+"\\), so those values agree with the conjecture instead of refuting it.",{A:A,B:B,k:k});
});
E("u7-sequence-gap",7,["2.1"],1,"gen",function(){
  var fam=ri(0,2),terms=[],ans=0,sig={};
  if(fam===0){var a0=ri(2,9),r=pick([2,3]);for(var i=0;i<6;i++)terms.push(a0*Math.pow(r,i));var g=pick([2,3,4]);ans=terms[g];sig={fam:"geo",a0:a0,r:r,g:g};}
  else if(fam===1){var x=ri(1,4),y=ri(1,6);terms=[x,y];for(var i2=2;i2<7;i2++)terms.push(terms[i2-1]+terms[i2-2]);var g2=pick([3,4,5]);ans=terms[g2];sig={fam:"fib",x:x,y:y,g:g2};}
  else{var s0=ri(2,9),d0=ri(1,4);terms=[s0];for(var i3=1;i3<6;i3++)terms.push(terms[i3-1]+d0+(i3-1));var g3=pick([3,4]);ans=terms[g3];sig={fam:"grow",s0:s0,d0:d0,g:g3};}
  var shown=terms.slice();shown[sig.g]="___";
  var ruleTxt=fam===0?"Each term is the one before it multiplied by \\("+sig.r+"\\).":fam===1?"Each term is the sum of the two terms before it.":"The gaps between terms grow by \\(1\\) each time: \\(+"+sig.d0+"\\), \\(+"+(sig.d0+1)+"\\), \\(+"+(sig.d0+2)+"\\), and so on.";
  var sigOut={fam:sig.fam,g:sig.g,terms:terms};if(sig.a0!==undefined){sigOut.a0=sig.a0;sigOut.r=sig.r;}if(sig.x!==undefined){sigOut.x=sig.x;sigOut.y=sig.y;}if(sig.s0!==undefined){sigOut.s0=sig.s0;sigOut.d0=sig.d0;}
  return numq("Find the missing term in the pattern: \\("+shown.join(", ").replace("___","\\)___\\(")+"\\)",ans,0.011,
    ruleTxt+" The missing term is <b>\\("+ans+"\\)</b>.",sigOut);
});
E("u7-proof-steps",7,["2.8"],3,"var",varset([
  function(){return mcq("A number trick says: pick a number, add 6, double it, subtract 4, divide by 2, then subtract your starting number. (It always ends at \\(4\\) — try starting with \\(5\\).) A student 'proves' the trick with this algebra:<br>Step 1: Start with \\(n\\). Add \\(6\\): \\(n + 6\\).<br>Step 2: Double it: \\(2n + 6\\).<br>Step 3: Subtract \\(4\\): \\(2n + 2\\).<br>Step 4: Divide by \\(2\\), then subtract \\(n\\): \\((n + 1) - n = 1\\) — so the trick always ends at \\(1\\).<br>The conclusion is wrong. In which step does the FIRST error occur?",
    "Step 2 — doubling \\(n + 6\\) gives \\(2n + 12\\), not \\(2n + 6\\): both terms must double",
    ["Step 1 — adding \\(6\\) to \\(n\\) should give \\(6n\\), because the two merge into one term","Step 3 — subtracting \\(4\\) from \\(2n + 6\\) should give \\(2n + 10\\) when the subtraction is done","Step 4 \u2014 the division must be carried out before the subtraction step is reached"],
    "Every later step follows correctly from the line before it \u2014 the damage is done when \\(2(n + 6)\\) is written as \\(2n + 6\\) instead of \\(2n + 12\\). With that fixed, the proof ends at \\((2n + 8) \\div 2 - n = 4\\), exactly as the trick promises.",{});},
  function(){return mcq("A number trick says: pick a number, multiply it by 3, add 9, divide by 3, then subtract your starting number. (It always ends at \\(3\\) — try starting with \\(2\\).) A student 'proves' the trick like this:<br>Step 1: Start with \\(n\\). Multiply by \\(3\\): \\(3n\\).<br>Step 2: Add \\(9\\): \\(3n + 9\\).<br>Step 3: Divide by \\(3\\): \\(n + 9\\).<br>Step 4: Subtract \\(n\\): \\(9\\) — so the trick always ends at \\(9\\).<br>The conclusion is wrong. In which step does the FIRST error occur?",
    "Step 3 — dividing \\(3n + 9\\) by \\(3\\) gives \\(n + 3\\), not \\(n + 9\\): both terms must be divided",
    ["Step 1 — multiplying \\(n\\) by \\(3\\) should give \\(n3\\), because the number belongs after the letter","Step 2 — adding \\(9\\) to \\(3n\\) should give \\(12n\\), because the two combine into a bigger term","Step 4 — subtracting \\(n\\) from \\(n + 9\\) should give \\(9n\\), because the letter stays in the result"],
    "Only the \\(3n\\) was divided; the \\(+9\\) slipped through untouched. Fixed, the proof reads \\((3n + 9) \\div 3 - n = (n + 3) - n = 3\\).",{});},
  function(){return mcq("A number trick says: pick a number, add 4, multiply by 2, subtract 6, then divide by 2. (It always ends one MORE than your starting number — try starting with \\(5\\) and you get \\(6\\).) A student 'proves' the trick like this:<br>Step 1: Start with \\(n\\). Add \\(4\\): \\(n + 4\\).<br>Step 2: Multiply by \\(2\\): \\(2n + 8\\).<br>Step 3: Subtract \\(6\\): \\(2n + 2\\).<br>Step 4: Divide by \\(2\\): \\(2n + 1\\) — so the trick always ends at one more than DOUBLE your number.<br>The conclusion is wrong. In which step does the FIRST error occur?",
    "Step 4 — dividing \\(2n + 2\\) by \\(2\\) gives \\(n + 1\\), not \\(2n + 1\\): both terms must be divided",
    ["Step 1 — adding \\(4\\) to \\(n\\) should give \\(4n\\), because adding merges them into a single product","Step 2 — multiplying \\(n + 4\\) by \\(2\\) should give \\(2n + 4\\), because only the first term doubles","Step 3 — subtracting \\(6\\) from \\(2n + 8\\) should give \\(2n + 14\\), because the constant grows"],
    "Steps \\(1\\) to \\(3\\) are correct. The last division halves only the constant in the student's line: \\((2n + 2) \\div 2 = n + 1\\), which is exactly what the trick promises \u2014 one more than the starting number.",{});},
  function(){return mcq("A number trick says: pick a number, double it, add 10, divide by 2, then subtract 3. (It always ends \\(2\\) above your starting number — try starting with \\(4\\) and you get \\(6\\).) A student 'proves' the trick like this:<br>Step 1: Start with \\(n\\).<br>Step 2: Double it, then add \\(10\\): \\(2(n + 10) = 2n + 20\\).<br>Step 3: Divide by \\(2\\): \\(n + 10\\).<br>Step 4: Subtract \\(3\\): \\(n + 7\\) — so the trick always ends \\(7\\) above the starting number.<br>The conclusion is wrong. In which step does the FIRST error occur?",
    "Step 2 — 'double it, then add \\(10\\)' means \\(2n + 10\\); writing \\(2(n + 10)\\) adds the \\(10\\) BEFORE doubling, which doubles the \\(10\\) as well",
    ["Step 1 — the starting number should have been called \\(x\\), not \\(n\\), because using the wrong letter invalidates every later step in the proof","Step 3 — dividing \\(2n + 20\\) by \\(2\\) should give \\(2n + 10\\), because only the constant term is halved, not the whole expression","Step 4 — subtracting \\(3\\) from \\(n + 10\\) should give \\(n + 13\\), because subtracting a number raises the constant term in the line"],
    "The trick doubles first and adds \\(10\\) second: \\(2n + 10\\). The brackets quietly reversed that order. Done correctly: \\((2n + 10) \\div 2 - 3 = n + 2\\).",{});}
]));
E("u5-ci-level-from-report",5,["8.21"],1,"gen",function(){
  var phrases=[[19,20],[9,10],[18,20],[99,100],[17,20],[4,5],[49,50],[47,50]];
  var ph=pick(phrases),k=ph[0],n=ph[1],level=Math.round(100*k/n);
  var topic=pick(["a later school start time","a new community rink","the mayoral race","a proposed cellphone policy","a new ferry sailing","a four-day school week"]);
  var N=pick([400,800,1200,2000]);
  var cand=[100-level,level-5,level+5,k],distractors=[];
  cand.forEach(function(d){if(d!==level&&d>0&&d<100&&distractors.indexOf(d)<0)distractors.push(d);});
  distractors=distractors.slice(0,3);
  var extras=[level-10,level+10,level-15,level+15];
  while(distractors.length<3){var e=extras.pop();if(e!==undefined&&e!==level&&e>0&&e<100&&distractors.indexOf(e)<0)distractors.push(e);else if(e===undefined)break;}
  return mcq("A news report about "+topic+", based on a survey of "+N+" people, says the results are \u2018accurate \\("+k+"\\) times out of \\("+n+"\\)\u2019. What confidence level is the report claiming?",
    "\\("+level+"\\%\\)",distractors.map(function(d){return "\\("+d+"\\%\\)";}),
    "\\("+k+"\\) times out of \\("+n+"\\) is the fraction \\(\\frac{"+k+"}{"+n+"} = "+level+"\\%\\). A confidence level reported as a fraction of times converts straight to that percent.",{k:k,n:n,level:level});
});
E("u5-ci-shrink",5,["8.18"],2,"gen",function(){
  var d=pick([2,3,4,5,10]);
  var m2=d===10?pick([0.5,1,1.5,2]):pick([1,1.5,2,2.5,3]);
  var base=pick([50,80,100,120,150,200,250,300,400]);
  var grow=Math.random()<0.6,n0,n1,moe0,ans;
  if(grow){n0=base;n1=base*d*d;moe0=m2*d;ans=m2;}
  else{n0=base*d*d;n1=base;moe0=m2;ans=m2*d;}
  return numq("A survey of \\("+n0+"\\) people reports a margin of error of \\(\\pm "+fmt(moe0)+"\\) percentage points. The survey is repeated with \\("+n1+"\\) people, using the same method. What is the new margin of error, in percentage points? (Just the number.)",
    ans,0.011,
    "Margin of error changes like \\(\\frac{1}{\\sqrt{n}}\\). Going from \\("+n0+"\\) to \\("+n1+"\\) people multiplies the sample by \\("+(grow?(d*d):"\\frac{1}{"+(d*d)+"}")+"\\), so the margin of error "+(grow?"divides":"multiplies")+" by \\("+d+"\\): <b>\\("+fmt(moe0)+" "+(grow?"\\div ":"\\times ")+d+" = "+fmt(ans)+"\\)</b> percentage points.",{n0:n0,n1:n1,moe0:moe0,d:d,ans:ans});
});
E("u5-poll-position",5,["8.20","8.22"],3,"var",varset([
  function(){return mcq("An advertisement announces: \u2018In a survey, \\(80\\%\\) of users said our toothpaste gave them a cleaner feeling!\u2019 The fine print says the survey is accurate within \\(\\pm 4\\) percentage points, \\(9\\) times out of \\(10\\). Which statement is the honest summary of the survey?",
    "The survey supports a range of about \\(76\\% \\text{ to } 84\\%\\) \u2014 the ad quotes the single middle number as if it were exact",
    ["At least \\(80\\%\\) for sure \u2014 that is the number the survey found, and the true figure cannot fall below a found figure","The range is \\(72\\% \\text{ to } 88\\%\\), because the margin counts twice on each side, once below the figure and once above it","The ad is fair \u2014 being right \\(9\\) times out of \\(10\\) makes the \\(80\\%\\) nearly exact, so the single figure is fair"],
    "\\(80\\% \\pm 4\\) points gives \\(76\\% \\text{ to } 84\\%\\). The honest figure could sit several points either side of the advertised one.",{});},
  function(){return mcq("Two candidates poll at \\(47\\%\\) and \\(44\\%\\), with a margin of error of \\(\\pm 4\\) points. The first candidate's campaign claims: \u2018We have a clear lead.\u2019 Is the claim supported?",
    "No \u2014 the intervals (\\(43\\% \\text{ to } 51\\%\\) and \\(40\\% \\text{ to } 48\\%\\)) overlap, so the trailing candidate could actually be ahead",
    ["Yes \u2014 \\(47\\) is greater than \\(44\\), so the lead is real, because the larger reported figure truly leads, margin or no margin","Yes \u2014 the margin of error applies only to the trailing candidate, so the leading figure stands exactly as reported","No \u2014 any poll with a margin of error is worthless, because a poll admitting error tells readers nothing reliable"],
    "A lead smaller than the margin of error is not a secure lead. With \\(\\pm 4\\) points, the true support could run the other way.",{});},
  function(){return mcq("A survey at a school of 1,200 students finds \\(68\\% \\pm 5\\) points favour a later start time. The principal announces: \u2018At least \\(800\\) of our students want this change.\u2019 Is the announcement justified by the survey?",
    "Not necessarily \u2014 the interval reaches down to \\(63\\%\\), and \\(63\\%\\) of \\(1{,}200\\) is \\(756\\) students, which is below \\(800\\)",
    ["Yes \u2014 \\(68\\%\\) of \\(1{,}200\\) is \\(816\\) students, comfortably over \\(800\\), and the middle estimate is the count the school should go by","Yes \u2014 a survey of a whole school gives exact figures, because asking within one school leaves no sampling error of any kind to allow for at all","No \u2014 the true figure could be fewer than \\(600\\) students, because five points of error can hide hundreds of students here"],
    "The middle estimate (\\(816\\)) clears \\(800\\), but the interval's low end (\\(756\\)) does not. A claim of 'at least \\(800\\)' needs the whole interval above \\(800\\).",{});},
  function(){return mcq("In a town of 25,000 voters, a poll finds \\(54\\% \\pm 3\\) points support a new arena. A councillor says: \u2018Somewhere between \\(12{,}000\\) and \\(15{,}000\\) voters back this.\u2019 Is she reading the poll correctly?",
    "Yes \u2014 \\(51\\% \\text{ to } 57\\%\\) of \\(25{,}000\\) voters is \\(12{,}750\\) to \\(14{,}250\\) voters, which sits inside the range she quoted",
    ["No \u2014 the range is \\(13{,}500\\) voters, give or take \\(3\\) voters, because the margin counts individual voters","No \u2014 a percentage from a sample can never be applied to a whole population, because percentages describe only the people asked","Yes \u2014 exactly \\(13{,}500\\) voters support the arena, because the middle percentage gives the town's exact count"],
    "Apply both ends of the interval to the population: \\(0.51 \\times 25{,}000 = 12{,}750\\) and \\(0.57 \\times 25{,}000 = 14{,}250\\). Her wider range safely contains the poll's range.",{});}
]));
E("u7-valid-chains",7,["2.3"],2,"var",varset([
  function(){return mcq("Premises: Rex is a Chocolate Lab. All Chocolate Labs are brown. What can be deduced?",
    "Rex is brown",
    ["All brown dogs are Labs","Rex must love swimming","Rex is black"],
    "Rex belongs to the group the second premise covers, so its property follows. The first trap reverses the premise (nothing says brown dogs are Labs), and the last one contradicts it.",{});},
  function(){return mcq("Premises: All band members play an instrument. Everyone who plays an instrument can read music. Leo is in the band. What can be deduced?",
    "Leo can read music",
    ["Leo is the best","All music readers are in the band","Leo plays in an orchestra"],
    "The chain runs Leo \u2192 band \u2192 instrument \u2192 reads music, one premise at a time. The second trap reverses the chain, and the others add facts no premise gives.",{});},
  function(){return mcq("Premises: Everyone who attends spin class regularly gets fitter. Maya attends spin class regularly. Consider two conclusions: I. Maya gets fitter. II. Maya is the fittest person in the class. Which conclusions follow?",
    "I only \u2014 the premises say she gets fitter, but they never compare her with anyone else",
    ["II only \u2014 regular attendance matters most, making her the fittest in the class","Both I and II - the premises also compare her with everyone else in the class","Neither I nor II - regular attendance alone cannot support either conclusion drawn here"],
    "Conclusion I is the premise applied directly. Conclusion II is a superlative the premises cannot support \u2014 getting fitter does not mean fittest.",{});},
  function(){return mcq("Premises: All squares are rectangles. Figure X is a rectangle. What can be deduced about Figure X?",
    "Only that X is a rectangle \u2014 it may or may not be a square",
    ["X must be a square - all rectangles here are squares","X cannot be a square - squares and rectangles never overlap at all","All four of X's sides must be equal, just as they would be for a square"],
    "Every square is a rectangle, but the premise does not run backwards: most rectangles are not squares. Nothing given decides whether X is one of the square ones.",{});},
  function(){return mcq("Take these premises as given, even though one is false in real life: All fish can fly. A trout is a fish. Is the conclusion \u2018a trout can fly\u2019 validly deduced?",
    "Yes \u2014 the conclusion follows from the premises, so the argument is valid; the problem is the false premise, not the logic",
    ["No \u2014 a false premise automatically makes an argument invalid, however carefully the reasoning is built on it","No \u2014 trout live in water, so the conclusion cannot be reached, because real world facts override whatever the premises say","Yes \u2014 because some trout really can fly, and a conclusion that is true in real life makes the whole argument a valid one"],
    "Validity is about the chain, not the facts. If the premises were true, the conclusion would have to be true \u2014 that is a valid argument built on a false premise.",{});}
]));
E("u5-ci-build",5,["8.21"],1,"gen",function(){
  var p=ri(38,72),m=pick([2,2.5,3,3.5,4,4.5,5]);
  var topic=pick(["a new arena","a later school start","the mayoral race","a cellphone ban in class","a new ferry sailing","a four-day school week"]);
  var phrase=pick(["\\(19\\) times out of \\(20\\)","\\(9\\) times out of \\(10\\)","\\(99\\) times out of \\(100\\)"]);
  var lo=p-m,hi=p+m;
  function rng(x,y){return "\\("+fmt(x)+"\\% \\text{ to } "+fmt(y)+"\\%\\)";}
  return mcq("A poll finds \\("+p+"\\%\\) support for "+topic+", with a margin of error of \\(\\pm "+fmt(m)+"\\) percentage points, accurate "+phrase+". What is the confidence interval for the true level of support?",
    rng(lo,hi),[rng(p,hi),rng(lo,p),rng(p-2*m,p+2*m)],
    "The interval runs the margin of error in BOTH directions from the result: \\("+p+"\\% - "+fmt(m)+" = "+fmt(lo)+"\\%\\) and \\("+p+"\\% + "+fmt(m)+" = "+fmt(hi)+"\\%\\).",{p:p,m:m});
});
E("u5-ci-read-report",5,["8.21"],1,"var",varset([
  function(){return mcq("A survey reports a confidence interval of \\(74.9\\% \\text{ to } 79.1\\%\\), accurate \\(9\\) times out of \\(10\\). What are the margin of error and the confidence level?",
    "Margin of error \\(2.1\\) points; confidence level \\(90\\%\\)",
    ["Margin of error \\(4.2\\) points; confidence level \\(90\\%\\)","Margin of error \\(2.1\\) points; confidence level \\(95\\%\\)","Margin of error \\(77\\) points; confidence level \\(90\\%\\)"],
    "The interval is \\(4.2\\) points wide, so the margin of error is half of that: \\(2.1\\) points either side of the centre, \\(77\\%\\). And \\(9\\) times out of \\(10\\) is a \\(90\\%\\) confidence level.",{});},
  function(){return mcq("A fisheries report gives a \\(90\\%\\) confidence interval for the mean weight of cod of \\(3.0\\) kg to \\(3.4\\) kg. What are the reported mean and the margin of error?",
    "Mean \\(3.2\\) kg; margin of error \\(\\pm 0.2\\) kg",
    ["Mean \\(3.0\\) kg; margin of error \\(\\pm 0.4\\) kg","Mean \\(3.4\\) kg; margin of error \\(\\pm 0.2\\) kg","Mean \\(3.2\\) kg; margin of error \\(\\pm 0.4\\) kg"],
    "The mean is the midpoint: \\(\\frac{3.0 + 3.4}{2} = 3.2\\) kg. The margin of error is half the width: \\(\\frac{3.4 - 3.0}{2} = 0.2\\) kg.",{});},
  function(){return mcq("A survey reports a \\(90\\%\\) confidence level, a margin of error of \\(\\pm 3\\) points, and a confidence interval of \\(57\\%\\) to \\(63\\%\\). What percentage did the survey itself find?",
    "\\(60\\%\\) \u2014 the interval is centred on the survey result",
    ["\\(57\\%\\) \u2014 the bottom of the interval is the result itself","\\(63\\%\\) \u2014 the top of the interval is the result itself","\\(90\\%\\) \u2014 the confidence level is the survey result"],
    "The interval is built as result \\(\\pm\\) margin: \\(60\\% - 3 = 57\\%\\) and \\(60\\% + 3 = 63\\%\\). The reported percentage is the centre, \\(60\\%\\).",{});},
  function(){return mcq("A factory reports that \\(85\\%\\) of its batteries pass a 100-hour test, accurate within \\(\\pm 2.5\\) percentage points, \\(19\\) times out of \\(20\\). What is the confidence interval for the true pass rate?",
    "\\(82.5\\% \\text{ to } 87.5\\%\\)",
    ["\\(85\\% \\text{ to } 87.5\\%\\)","\\(82.5\\% \\text{ to } 85\\%\\)","\\(80\\% \\text{ to } 90\\%\\)"],
    "Apply the margin in both directions: \\(85 - 2.5 = 82.5\\) and \\(85 + 2.5 = 87.5\\).",{});}
]));
E("u2-params-characteristics",2,["4.10"],1,"gen",function(){
  var mode=ri(0,2),a=pick([-3,-2,-1,1,2,3]),b=ri(-8,8)||3,c=ri(-9,9)||4;
  var eq="\\(y = "+(a<0?"-"+Math.abs(a):a)+"x^2"+(b>0?" + "+b+"x":" - "+Math.abs(b)+"x")+(c>0?" + "+c:" - "+Math.abs(c))+"\\)";
  if(mode===0){
    var pool=[-c,b,-b,a,c+2,c-2,c+1,c-1,c+3,c-3,2*c],ds=[];
    pool.forEach(function(d){if(d!==c&&ds.indexOf(d)<0)ds.push(d);});
    var off=4;while(ds.length<3){var cand=c+off;if(cand!==c&&ds.indexOf(cand)<0)ds.push(cand);off=off>0?-off-1:-off+1;}
    return mcq("For "+eq+", what is the y-intercept of the graph?","\\("+c+"\\)",ds.slice(0,3).map(function(d){return "\\("+d+"\\)";}),
      "The y-intercept is the constant term, \\(c = "+c+"\\): it is where \\(x = 0\\), so \\(y = "+c+"\\)"+".",{mode:mode,a:a,b:b,c:c});
  }
  if(mode===1){
    var up=a>0;
    var good=up?"Opens upward; the vertex is a minimum":"Opens downward; the vertex is a maximum";
    var all=["Opens upward; the vertex is a minimum","Opens upward; the vertex is a maximum","Opens downward; the vertex is a minimum","Opens downward; the vertex is a maximum"];
    return mcq("For "+eq+", which statement describes the graph?",good,all.filter(function(x){return x!==good;}),
      "The sign of \\(a\\) decides the opening: \\(a = "+a+"\\)"+(up?" is positive, so the parabola opens upward and its vertex is the lowest point — a minimum.":" is negative, so the parabola opens downward and its vertex is the highest point — a maximum."),{mode:mode,a:a,b:b,c:c});
  }
  var k=pick([-4,-3,-2,-1,1,2,3,4]);b=2*a*k;
  eq="\\(y = "+(a<0?"-"+Math.abs(a):a)+"x^2"+(b>0?" + "+b+"x":" - "+Math.abs(b)+"x")+(c>0?" + "+c:" - "+Math.abs(c))+"\\)";
  var ans=-k,pool2=[k,-2*k,b,-b,2*k],ds2=[];
  pool2.forEach(function(d){if(d!==ans&&ds2.indexOf(d)<0)ds2.push(d);});
  return mcq("For "+eq+", what is the axis of symmetry?","\\(x = "+ans+"\\)",ds2.slice(0,3).map(function(d){return "\\(x = "+d+"\\)";}),
    "The axis of symmetry is \\(x = \\frac{-b}{2a} = \\frac{-("+b+")}{"+(2*a)+"} = "+ans+"\\)"+".",{mode:mode,a:a,b:b,c:c,k:k});
});
E("u2-graph-description",2,["4.14"],2,"gen",function(){
  var a=pick([1,-1,2,-2]),r1=pick([-5,-4,-3,-2,-1,1,2,3]),r2=pick([2,3,4,5,6]);
  if(r1===r2)r2=r2+1;
  var lo=Math.min(r1,r2),hi=Math.max(r1,r2);r1=lo;r2=hi;
  if(r1+r2===0)r2+=2;
  var eq=factT(a,r1,r2);
  var dir=a>0?"upward":"downward",dir2=a>0?"downward":"upward",yi=a*r1*r2;
  function desc(d,x,y,z){return "Opens "+d+"; x-intercepts \\("+x+"\\) and \\("+y+"\\); y-intercept \\("+z+"\\)";}
  var good=desc(dir,r1,r2,yi);
  var wrongs=[desc(dir2,r1,r2,yi),desc(dir,-r2,-r1,yi),desc(dir,r1,r2,-yi)];
  return mcq("Which description matches the graph of "+eq+"?",good,wrongs,
    "The sign of the leading coefficient (\\("+a+"\\)) says the parabola opens "+dir+". It crosses the x-axis where each factor is zero: \\(x = "+r1+"\\) and \\(x = "+r2+"\\). Setting \\(x = 0\\) gives the y-intercept: \\("+a+" \\times ("+(-r1)+") \\times ("+(-r2)+") = "+yi+"\\).",{a:a,r1:r1,r2:r2,exp:good});
});
E("u3-equation-from-roots",3,["4.6"],2,"gen",function(){
  var r1=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5]),r2=pick([-5,-4,-3,-2,-1,1,2,3,4,5,6]);
  if(r2===r1||r2===-r1)r2=r2>0?r2+2:r2-2;
  var B=-(r1+r2),C=r1*r2;
  function eqs(bb,cc){return "\\(x^2"+(bb>0?" + "+bb+"x":bb<0?" - "+Math.abs(bb)+"x":"")+(cc>0?" + "+cc:cc<0?" - "+Math.abs(cc):"")+" = 0\\)";}
  var good=eqs(B,C);
  var wrongs=[eqs(-B,C),eqs(B,-C),eqs(-B,-C)].filter(function(x){return x!==good;});
  return mcq("A quadratic equation in the form \\(x^2 + bx + c = 0\\) has roots \\("+r1+"\\) and \\("+r2+"\\). What is the equation?",good,wrongs,
    "Work backwards: \\((x - ("+r1+"))(x - ("+r2+"))\\) expands to \\(x^2 - ("+(r1+r2)+")x + ("+C+")\\), so \\(b = "+B+"\\) and \\(c = "+C+"\\). The coefficient \\(b\\) is the NEGATIVE of the sum of the roots, and \\(c\\) is their product.",{r1:r1,r2:r2,B:B,C:C,exp:good});
});
E("u6-similar-dimension",6,["6.2"],2,"gen",function(){
  var mode=ri(0,1);
  if(mode===0){
    var dims=pick([[3,4],[4,6],[5,8],[6,9],[4,10],[8,12],[6,10],[10,14]]);
    var w=dims[0],h=dims[1],k=pick([2,3,4]),W=w*k,H=h*k,askW=Math.random()<0.5;
    var ans=askW?W:H,known=askW?H:W;
    return numq("A rectangle "+w+" cm by "+h+" cm is enlarged to a similar rectangle. The "+(askW?"longer":"shorter")+" side of the large rectangle is "+known+" cm. What is the "+(askW?"shorter":"longer")+" side of the large rectangle, in cm?",
      ans,0.011,"Similar shapes keep the same ratio. The scale factor is \\("+known+" \\div "+(askW?h:w)+" = "+k+"\\), so the other side is \\("+(askW?w:h)+" \\times "+k+" = \\)<b>\\("+ans+"\\text{ cm}\\)</b>.",{mode:mode,w:w,h:h,k:k,askW:askW,ans:ans});
  }
  var trip=pick([[3,4,5],[5,12,13],[6,8,10],[8,15,17]]);
  var m1=pick([1,2,3]),m2=pick([2,3,4,5]);if(m2===m1)m2=m2+1;
  var j=ri(0,2),l=ri(0,2);if(l===j)l=(j+1)%3;
  var small=trip.map(function(x){return x*m1;}),known=trip[j]*m2,ans=trip[l]*m2;
  function gg2(x,y){while(y){var t=x%y;x=y;y=t;}return x;}
  var gd=gg2(m2,m1),fnum=m2/gd,fden=m1/gd,ftxt=fden===1?""+fnum:"\\frac{"+fnum+"}{"+fden+"}";
  return numq("Two triangles are similar. The smaller has sides \\("+small.join("\\text{ cm}, ")+"\\text{ cm}\\). The larger triangle's side corresponding to the \\("+(trip[j]*m1)+"\\text{ cm}\\) side measures \\("+known+"\\text{ cm}\\). What is the length, in cm, of the larger triangle's side corresponding to the \\("+(trip[l]*m1)+"\\text{ cm}\\) side?",
    ans,0.011,"The scale factor from small to large is \\("+known+" \\div "+(trip[j]*m1)+" = "+ftxt+"\\). Apply it to the \\("+(trip[l]*m1)+"\\text{ cm}\\) side's counterpart: \\("+(trip[l]*m1)+" \\times "+ftxt+" = \\)<b>\\("+ans+"\\text{ cm}\\)</b>.",{mode:mode,trip:trip,m1:m1,m2:m2,j:j,l:l,ans:ans});
});
E("u6-compare-rates",6,["6.16"],2,"gen",function(){
  var ctx=pick([{n:"cyclist",vs:[14,16,18,20,22,24,26,28,30]},{n:"bus",vs:[50,55,60,65,70,75,80,85,90]},{n:"delivery van",vs:[40,45,50,55,60,70,80]},{n:"kayaker",vs:[6,7,8,9,10,11,12]}]);
  var v1=pick(ctx.vs),v2=pick(ctx.vs);if(v2===v1)v2=v1+pick([2,3,4]);
  var t1=ri(2,6),t2=ri(2,6),d1=v1*t1,d2=v2*t2;
  var ans=Math.abs(v1-v2);
  return numq("Two "+ctx.n+"s travel on the same route. The first covers "+d1+" km in "+t1+" hours; the second covers "+d2+" km in "+t2+" hours. How many km/h faster is the faster "+ctx.n+"? (Just the number.)",
    ans,0.011,"Rates first: \\("+d1+" \\div "+t1+" = "+v1+"\\text{ km/h}\\) and \\("+d2+" \\div "+t2+" = "+v2+"\\text{ km/h}\\). The difference is \\("+Math.max(v1,v2)+" - "+Math.min(v1,v2)+" = \\)<b>\\("+ans+"\\text{ km/h}\\)</b>.",{v1:v1,v2:v2,ans:ans});
});
E("u6-rate-isolate",6,["6.23"],1,"gen",function(){
  var mode=ri(0,2);
  if(mode===0){
    var v=pick([25,40,50,60,75,80,90,100]),t=pick([1.5,2,2.5,3,4,5]),d=v*t;
    return numq("A truck drives at a steady "+v+" km/h and covers "+fmt(d)+" km. How many hours does the trip take? (Just the number.)",
      t,0.011,"Isolate the time in \\(d = vt\\): \\(t = \\frac{d}{v} = \\frac{"+fmt(d)+"}{"+v+"} = \\)<b>\\("+fmt(t)+"\\text{ hours}\\)</b>.",{mode:mode,v:v,d:d,ans:t});
  }
  if(mode===1){
    var r=pick([12,15,20,24,30,36,40]),t2=ri(3,9),A=r*t2;
    return numq("A printer produces "+A+" pages in "+t2+" minutes at a steady rate. What is its rate, in pages per minute? (Just the number.)",
      r,0.011,"Rate \\(= \\frac{\\text{amount}}{\\text{time}} = \\frac{"+A+"}{"+t2+"} = \\)<b>\\("+r+"\\text{ pages per minute}\\)</b>.",{mode:mode,A:A,t:t2,ans:r});
  }
  var r2=pick([15,20,25,40,60,80]),t3=ri(4,12),A2=r2*t3;
  return numq("A pump moves water at "+r2+" litres per minute. How many litres does it move in "+t3+" minutes? (Just the number.)",
    A2,0.011,"Amount \\(= \\text{rate} \\times \\text{time} = "+r2+" \\times "+t3+" = \\)<b>\\("+A2+"\\text{ litres}\\)</b>.",{mode:mode,r:r2,t:t3,ans:A2});
});
E("u8-angle-sum-rule",8,["5.5"],1,"var",varset([
  function(){return mcq("The interior angles of a triangle sum to \\(180^\\circ\\), of a quadrilateral to \\(360^\\circ\\), and of a pentagon to \\(540^\\circ\\). Following this pattern, what is the sum of the interior angles of a polygon with \\(n\\) sides?",
    "\\((n - 2) \\times 180^\\circ\\)",
    ["\\(n \\times 180^\\circ\\)","\\((n - 1) \\times 180^\\circ\\)","\\((n + 2) \\times 180^\\circ\\)"],
    "Each added side adds \\(180^\\circ\\), but the count starts at \\(180^\\circ\\) for \\(3\\) sides: the multiplier is always \\(2\\) less than the number of sides, \\((n - 2)\\). Check: pentagon, \\((5 - 2) \\times 180^\\circ = 540^\\circ\\).",{});},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 7 sides?",
    "\\(900^\\circ\\)",["\\(1260^\\circ\\)","\\(1080^\\circ\\)","\\(1620^\\circ\\)"],
    "\\((7 - 2) \\times 180^\\circ = 5 \\times 180^\\circ = 900^\\circ\\).",{});q.figure=polySVG(7, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 9 sides?",
    "\\(1260^\\circ\\)",["\\(1620^\\circ\\)","\\(1440^\\circ\\)","\\(1980^\\circ\\)"],
    "\\((9 - 2) \\times 180^\\circ = 7 \\times 180^\\circ = 1260^\\circ\\).",{});q.figure=polySVG(9, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 11 sides?",
    "\\(1620^\\circ\\)",["\\(1980^\\circ\\)","\\(1800^\\circ\\)","\\(2340^\\circ\\)"],
    "\\((11 - 2) \\times 180^\\circ = 9 \\times 180^\\circ = 1620^\\circ\\).",{});q.figure=polySVG(11, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 12 sides?",
    "\\(1800^\\circ\\)",["\\(2160^\\circ\\)","\\(1980^\\circ\\)","\\(2520^\\circ\\)"],
    "\\((12 - 2) \\times 180^\\circ = 10 \\times 180^\\circ = 1800^\\circ\\).",{});q.figure=polySVG(12, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 15 sides?",
    "\\(2340^\\circ\\)",["\\(2700^\\circ\\)","\\(2520^\\circ\\)","\\(3060^\\circ\\)"],
    "\\((15 - 2) \\times 180^\\circ = 13 \\times 180^\\circ = 2340^\\circ\\).",{});q.figure=polySVG(15, false);return q;},
  function(){var q = mcq("Using the rule for the sum of the interior angles, what is the sum for a polygon with 20 sides?",
    "\\(3240^\\circ\\)",["\\(3600^\\circ\\)","\\(3420^\\circ\\)","\\(3960^\\circ\\)"],
    "\\((20 - 2) \\times 180^\\circ = 18 \\times 180^\\circ = 3240^\\circ\\).",{});q.figure=polySVG(20, false);return q;}
]));

/* ----- bank-fix.js ----- */
// Math 2201 Tranche 3 to 8 additions (Units 1 to 4 depth, the QE RHS harvest, and the October 2026 finish-line passes) question bank
// Cut verbatim from the standalone app's served file
// (math-2201-review/Math2201Review.html, lines 2142 to
// 3852, the Tranche 3 to 8 blocks at the head of its main
// script), followed by its selection-engine note and the
// postMid flagging (lines 3860 to 3865), which runs last
// there too. The mid-course cap those flags serve is a
// shell behaviour driven by the course configuration
// (presets.mid.cap in courses.js).
// CRMARKS: u1-sine-two-step=2
// CRMARKS: u1-cosine-context=2
// CRMARKS: u1-two-station-height=4
// CRMARKS: u2-axis-two-points=1
// CRMARKS: u2-standard-from-factored=2
// CRMARKS: u2-revenue-model=2
// CRMARKS: u2-count-intercepts=1
// CRMARKS: u2-max-area=3
// CRMARKS: u3-zeros-factored=1
// CRMARKS: u3-factor-monic=2
// CRMARKS: u3-solve-square=1
// CRMARKS: u3-gcf-solve=2
// CRMARKS: u3-setup-equation=1
// CRMARKS: u3-border=3
// CRMARKS: u3-exact-roots=2
// CRMARKS: u4-variable-mixed=2
// CRMARKS: u4-multiply-mixed=2
// CRMARKS: u4-equation-restriction=1
// CRMARKS: u4-verify-root=1
// CRMARKS: u4-model-equation=2
// CRMARKS: u4-model-evaluate=1
// CRMARKS: u4-cube-mixed=2
// CRMARKS: u4-cube-equation=2
// CRMARKS: u4-combine-multi=2
// CRMARKS: u4-binomial-square=2
// CRMARKS: u4-triangle-perimeter=2
// CRMARKS: u4-width-radical=2
// CRMARKS: u3-equation-fraction-roots=2
// CRMARKS: u3-solve-height=2
// CRMARKS: u3-model-number=2
// CRMARKS: u8-congruence-deduce=1
// CRMARKS: u8-multi-angle=2
// CRMARKS: u8-triangle-algebra=2
// CRMARKS: u8-polygon-inverse=1
// CRMARKS: u1-smallest-angle=2
// CRMARKS: u1-angle-between-paths=4
// CRMARKS: u1-guy-wire=3
// CRMARKS: u6-pack-cost=2
// CRMARKS: u6-rate-difference=2
// CRMARKS: u6-poster-dimensions=2
// CRMARKS: u6-tile-cost=3
// CRMARKS: u7-race-order=2
// CRMARKS: u7-everyday-counterexample=2
// CRMARKS: u7-pattern-equation=2
// CRMARKS: u7-counterexample-claims=2
// CRMARKS: u2-y-intercept=1
// CRMARKS: u2-mirror-point=1
// CRMARKS: u2-vertex-time=1
// CRMARKS: u2-fence-max=3
// CRMARKS: u3-roots-sum-product=1
// CRMARKS: u3-factor-nonmonic=2
// CRMARKS: u3-standard-coeffs=1
// CRMARKS: u3-two-numbers=3
// CRMARKS: u4-evaluate-mixed=1
// CRMARKS: u4-divide-radicals=2
// CRMARKS: u4-rationalize-coefficient=2
// CRMARKS: u4-conjugate-area=2
// CRMARKS: u8-diagonals=1
// CRMARKS: u8-isosceles-angles=2
// CRMARKS: u8-corresponding-algebra=2
// CRMARKS: u8-parallel-x-value=3
// CRMARKS: u8-isosceles-exterior=2
// CRMARKS: u8-regular-sides-from-angle=3
// CRMARKS: u8-exterior-algebra=3
// CRMARKS: u2-vertex-form-eval=1
// CRMARKS: u2-factored-y-intercept=1
// CRMARKS: u2-max-height=2
// CRMARKS: u3-factor-difference=2
// CRMARKS: u3-root-difference=3
// CRMARKS: u4-entire-cube=1
// CRMARKS: u4-product-simplify=2
// CRMARKS: u4-add-unlike=2
// CRMARKS: u4-diagonal-radical=2
// CRMARKS: u8-cointerior-algebra=2
// CRMARKS: u8-congruence-perimeter=2
// CRMARKS: u8-congruent-perimeter=1
// CRMARKS: u8-angle-chase=2
// CRMARKS: u1-ambiguous-count=3
// CRMARKS: u1-median-length=4
// CRMARKS: u2-evaluate-f=1
// CRMARKS: u2-vertex-shift=1
// CRMARKS: u2-factored-max-height=2
// CRMARKS: u3-formula-exact-roots=2
// CRMARKS: u3-squares-area=3
// CRMARKS: u3-number-pair=2
// CRMARKS: u4-compare-radicals=1
// CRMARKS: u4-difference-simplify=2
// CRMARKS: u4-reciprocal-sum=3
// CRMARKS: u6-map-distance=2
// CRMARKS: u7-proof-repair=3
// CRMARKS: u7-smallest-counterexample=2
// CRMARKS: u7-counterexample-name=2
// CRMARKS: u7-triangular-total=3
// CRMARKS: u7-chain-conclusion=3
// CRMARKS: u7-false-pattern=2
// CRMARKS: u7-figure-pattern=1
/* ============ Tranche 3 (Oct 26): Units 1-4 depth ============
   Templates reworked from the Holy Spirit sample tests/reviews and the
   NL Schools topic lists (see harvest/newsites-inventory.md); every item
   re-created with new numbers and contexts, nothing copied verbatim.
   Also repairs two indicator tags from the original build: u4-order was
   tagged 1.3 but it orders radicals (1.4), and u4-multiply was tagged
   1.4 but it multiplies radicals (an operation, 1.6). */

/* --- Unit 1: Acute Triangle Trigonometry --- */
E("u1-sine-side-mc",1,["7.2"],2,"gen",function(){
  var A=0,B=0,a=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    A=ri(30,60);B=ri(40,80);a=ri(8,24);
    if(A+B<=95||A+B>=168)continue;
    var C=180-A-B;if(C<=10||C>=90)continue;
    var sA=Math.sin(A*Math.PI/180),sB=Math.sin(B*Math.PI/180),sC=Math.sin(C*Math.PI/180);
    key=a*sB/sA;d1=a*sA/sB;d2=a*sB/sC;d3=a*sC/sA;
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var b=key,cval=a*Math.sin((180-A-B)*Math.PI/180)/Math.sin(A*Math.PI/180);
  var q=mcq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and side \\(a = "+a+"\\text{ cm}\\) (the side opposite \\(\\angle A\\)). What is the length of side \\(b\\), in cm?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "Use the sine law and pair each side with its opposite angle: \\(\\frac{b}{\\sin "+B+"^\\circ} = \\frac{"+a+"}{\\sin "+A+"^\\circ}\\). So \\(b = \\frac{"+a+" \\sin "+B+"^\\circ}{\\sin "+A+"^\\circ} \\approx \\)<b>\\("+fmt(key,1)+"\\text{ cm}\\)</b>.",
    {A:A,B:B,a:a});
  q.figure=triSVG(a,b,cval,{L:["A","B","C"],ang:[A+"°",B+"°",null],side:[a+" cm","?",null]});
  return q;
});
E("u1-cosine-angle-mc",1,["7.2"],2,"gen",function(){
  var Atar=0,b=0,c=0,a=0,Aang=0,Bang=0,Cang=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    Atar=pick([40,45,50,55,60,65,70,75,80]);b=ri(6,14);c=ri(6,14);
    a=Math.round(Math.sqrt(b*b+c*c-2*b*c*Math.cos(Atar*Math.PI/180))*10)/10;
    var cosA=(b*b+c*c-a*a)/(2*b*c);if(Math.abs(cosA)>=1)continue;
    Aang=Math.acos(cosA)*180/Math.PI;
    var cosB=(a*a+c*c-b*b)/(2*a*c);if(Math.abs(cosB)>=1)continue;
    Bang=Math.acos(cosB)*180/Math.PI;Cang=180-Aang-Bang;
    if(Cang<=5||Cang>=90)continue;
    var os=[""+Math.round(Aang),""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var q=mcq("A triangle has sides "+fmt(a,1)+" cm, "+b+" cm and "+c+" cm. What is the angle opposite the side of length "+fmt(a,1)+" cm, in degrees?",
    ""+Math.round(Aang),[""+Math.round(Bang),""+Math.round(Cang),""+Math.round(180-Aang)],
    "Rearrange the cosine law for the angle opposite side \\(a\\): \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{"+b+"^2 + "+c+"^2 - "+fmt(a,1)+"^2}{2("+b+")("+c+")}\\). This gives \\(A \\approx \\)<b>\\("+Math.round(Aang)+"^\\circ\\)</b>. The side squared on its own at the end of the numerator is the one opposite the angle being found.",
    {a:a,b:b,c:c});
  q.figure=triSVG(a,b,c,{L:["A","B","C"],ang:["?",null,null],side:[fmt(a,1),""+b,""+c]});
  return q;
});
E("u1-crossing-distance",1,["7.3"],2,"gen",function(){
  var D=0,al=0,be=0,R=0,key=0,d1=0,d2=0,d3=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    D=ri(40,120);al=ri(35,70);be=ri(35,70);
    R=180-al-be;if(R<25||R>80)continue;
    var sR=Math.sin(R*Math.PI/180);
    key=D*Math.sin(be*Math.PI/180)/sR;
    d1=D*Math.sin(al*Math.PI/180)/sR;
    d2=D*sR/Math.sin(be*Math.PI/180);
    d3=D*Math.sin(be*Math.PI/180)/Math.sin(al*Math.PI/180);
    var os=[fmt(key,1),fmt(d1,1),fmt(d2,1),fmt(d3,1)];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("Two points \\(P\\) and \\(Q\\) on one shore of a lake are "+D+" m apart. A buoy \\(R\\) floats on the lake. From \\(P\\), the angle between the line to \\(Q\\) and the line to the buoy is \\("+al+"^\\circ\\); from \\(Q\\), the angle between the line to \\(P\\) and the line to the buoy is \\("+be+"^\\circ\\). How far is the buoy from \\(P\\), in m?",
    fmt(key,1),[fmt(d1,1),fmt(d2,1),fmt(d3,1)],
    "The two shore points and the buoy form a triangle. The angle at the buoy is \\(180^\\circ - "+al+"^\\circ - "+be+"^\\circ = "+R+"^\\circ\\). By the sine law, \\(\\frac{PR}{\\sin "+be+"^\\circ} = \\frac{"+D+"}{\\sin "+R+"^\\circ}\\), so \\(PR = \\frac{"+D+" \\sin "+be+"^\\circ}{\\sin "+R+"^\\circ} \\approx \\)<b>\\("+fmt(key,1)+"\\text{ m}\\)</b>.",
    {D:D,al:al,be:be,R:R});
});
E("u1-sine-two-step",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var A,B,C,tries=0;
  do{A=ri(28,58);B=ri(24,58);C=180-A-B;tries++;}while((C<25||C>95)&&tries<40);
  var a=ri(8,30);
  var c=a*Math.sin(rd(C))/Math.sin(rd(A));
  var q=numq("In \\(\\triangle ABC\\), \\(\\angle A = "+A+"^\\circ\\), \\(\\angle B = "+B+"^\\circ\\), and the side opposite \\(\\angle A\\) is \\("+a+"\\text{ cm}\\). Find the length of the side opposite \\(\\angle C\\), to one decimal place, in cm.",
    fmt(c,1),0.06,
    "First the third angle: \\(\\angle C = 180^\\circ - "+A+"^\\circ - "+B+"^\\circ = "+C+"^\\circ\\). Then the sine law: \\(\\frac{c}{\\sin "+C+"^\\circ} = \\frac{"+a+"}{\\sin "+A+"^\\circ}\\), so \\(c = "+a+" \\times \\frac{\\sin "+C+"^\\circ}{\\sin "+A+"^\\circ} = \\)<b>\\("+fmt(c,1)+"\\text{ cm}\\)</b>.",
    {A:A,B:B,C:C,a:a});
  q.figure=triAngSVG(A,B,C,{ang:[A+"\u00B0",B+"\u00B0",C+"\u00B0"],side:[a+" cm",null,"?"]});
  return q;
});
E("u1-cosine-context",1,["7.2"],1,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var p=ri(8,38),w=ri(8,38),ang=ri(38,128);
  var d=Math.sqrt(p*p+w*w-2*p*w*Math.cos(rd(ang)));
  var ctx=pick([
    "Two boats leave the same wharf at the same time. One travels "+p+" km and the other travels "+w+" km, with an angle of \\("+ang+"^\\circ\\) between their courses.",
    "Two hikers leave a trailhead at the same time. One walks "+p+" km and the other walks "+w+" km, with an angle of \\("+ang+"^\\circ\\) between their paths.",
    "Two straight roads leave an intersection. A gas station is "+p+" km along one road and a school is "+w+" km along the other, with an angle of \\("+ang+"^\\circ\\) between the roads. The distance between the gas station and the school is measured straight across."
  ]);
  var q=numq(ctx+" How far apart are the two endpoints, to one decimal place, in km?",
    fmt(d,1),0.06,
    "The two distances and the distance apart form a triangle with an included angle of \\("+ang+"^\\circ\\), so the cosine law applies: \\(d^2 = "+p+"^2 + "+w+"^2 - 2("+p+")("+w+")\\cos("+ang+"^\\circ) = "+fmt(p*p+w*w-2*p*w*Math.cos(rd(ang)),1)+"\\), so \\(d = \\)<b>\\("+fmt(d,1)+"\\text{ km}\\)</b>.",
    {p:p,w:w,ang:ang});
  q.figure=triSVG(d,p,w,{L:["A","B","C"],ang:[ang+"\u00B0",null,null],side:["?",w+" km",p+" km"]});
  return q;
});
E("u1-two-station-height",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var al=ri(18,36),be=al+ri(12,28),dd=pick([15,20,25,30,40,50,60]);
  var slant=dd*Math.sin(rd(al))/Math.sin(rd(be-al));
  var h=slant*Math.sin(rd(be));
  var thing=pick(["a tower","a lighthouse","a communications mast"]);
  return numq("From a point on level ground, the angle of elevation to the top of "+thing+" is \\("+al+"^\\circ\\). Moving "+dd+" m closer to it, the angle of elevation is \\("+be+"^\\circ\\). Find its height, to one decimal place, in m.",
    fmt(h,1),0.06,
    "The two ground points and the top form a triangle. Its angle at the farther point is \\("+al+"^\\circ\\), and its angle at the top is \\("+be+"^\\circ - "+al+"^\\circ = "+(be-al)+"^\\circ\\). By the sine law, the distance from the nearer point to the top is \\("+dd+" \\times \\frac{\\sin "+al+"^\\circ}{\\sin "+(be-al)+"^\\circ} = "+fmt(slant,1)+"\\text{ m}\\). The height is then \\("+fmt(slant,1)+" \\times \\sin "+be+"^\\circ = \\)<b>\\("+fmt(h,1)+"\\text{ m}\\)</b>.",
    {al:al,be:be,dd:dd});
});
E("u1-law-choice-context",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("A triangle has sides of \\(9\\text{ cm}\\) and \\(14\\text{ cm}\\) with the angle of \\(58^\\circ\\) between them. Which law gives the third side directly?",
    "Cosine law",["Sine law","Either law gives it in one step","Neither law can be used"],
    "The known angle sits between the two known sides (SAS), so the cosine law gives the third side in one step. The sine law needs a known side-angle pair, which this triangle does not give yet." );},
  function(){return mcq("A triangle has angles of \\(47^\\circ\\) and \\(71^\\circ\\) and a side of \\(12\\text{ m}\\) opposite the \\(47^\\circ\\) angle. Which law gives another side directly?",
    "Sine law",["Cosine law","Either law gives it in one step","Neither law can be used"],
    "There is a known side-angle pair (\\(12\\text{ m}\\) opposite \\(47^\\circ\\)), so the sine law sets up a proportion for any other side. The cosine law would need two sides around a known angle." );},
  function(){return mcq("The three sides of a triangle measure \\(7\\text{ km}\\), \\(10\\text{ km}\\) and \\(13\\text{ km}\\). Which law gives one of its angles directly?",
    "Cosine law",["Sine law","Either law gives it in one step","Neither law can be used"],
    "With all three sides known (SSS) and no angle given, the cosine law rearranges to give an angle. The sine law cannot start without a known angle." );},
  function(){return mcq("In \\(\\triangle PQR\\), \\(\\angle P = 39^\\circ\\), \\(\\angle Q = 84^\\circ\\), and the side opposite \\(\\angle Q\\) is \\(15\\text{ m}\\). Which law gives the side opposite \\(\\angle P\\) directly?",
    "Sine law",["Cosine law","Either law gives it in one step","Neither law can be used"],
    "The side of \\(15\\text{ m}\\) is opposite the known angle of \\(84^\\circ\\), a known side-angle pair, so the sine law gives the side opposite \\(39^\\circ\\) in one proportion.");}
]));

/* --- Unit 2: Quadratic Functions --- */
E("u2-which-quadratic",2,["4.10"],1,"var",varset([
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (x + 2)(x - 5)\\)",["\\(y = 3x - 7\\)","\\(y = x^3 - x\\)","\\(y = \\sqrt{x + 1}\\)"],
    "\\((x + 2)(x - 5)\\) expands to \\(x^2 - 3x - 10\\): an \\(x^2\\) term and nothing of higher degree. The others are linear, cubic and a radical relation." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (2x - 1)(x + 3)\\)",["\\(y = \\frac{5}{x}\\)","\\(y = x(x^2 + 1)\\)","\\(y = -4x + 1\\)"],
    "\\((2x - 1)(x + 3)\\) expands to \\(2x^2 + 5x - 3\\), which is quadratic. Note \\(y = x(x^2 + 1)\\) expands to \\(x^3 + x\\), a cubic in disguise." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = (x + 4)^2\\)",["\\(y = 3x\\)","\\(y = x^3 + 2x\\)","\\(y = -x + 9\\)"],
    "\\((x + 4)^2\\) expands to \\(x^2 + 8x + 16\\), a quadratic. Squaring a binomial always produces an \\(x^2\\) term." );},
  function(){return mcq("Which relation is quadratic?",
    "\\(y = x^2 - 3x\\)",["\\(y = 7 - x\\)","\\(y = 2x^3\\)","\\(y = \\sqrt{x}\\)"],
    "\\(y = x^2 - 3x\\) has degree \\(2\\). The others are linear (degree \\(1\\)), cubic (degree \\(3\\)) and a square-root relation.");}
]));
E("u2-axis-two-points",2,["4.13"],1,"gen",function(){
  var x1=ri(-9,3),gap=pick([2,4,6,8,10,12,14]),x2=x1+gap,y=ri(-6,12);
  var mid=(x1+x2)/2;
  return numq("The points \\(("+x1+", "+y+")\\) and \\(("+x2+", "+y+")\\) lie on the same parabola. What is the equation of the axis of symmetry? Give the value of \\(x\\).",
    mid,0.011,
    "The two points have the same y-coordinate, so they sit at the same height on the parabola, one on each side of the axis. The axis passes midway between them: \\(x = \\frac{"+x1+" + "+x2+"}{2} = \\)<b>\\("+fmt(mid,1)+"\\)</b>.",
    {x1:x1,x2:x2,y:y});
});
E("u2-standard-from-factored",2,["4.5"],1,"gen",function(){
  var a=pick([1,2,-2,3,-1]),r1,r2,tries=0;
  do{r1=ri(-6,6);r2=ri(-6,6);tries++;}while((r1===0||r2===0||r1===r2||r2===-r1)&&tries<40);
  var B=-a*(r1+r2),C=a*r1*r2;
  function fsB(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return mcq("Which function is the standard form of "+factT(a,r1,r2)+"?",
    "\\(y = "+quadB(a,B,C)+"\\)",
    ["\\(y = "+quadB(a,-B,C)+"\\)","\\(y = "+quadB(a,B,-C)+"\\)","\\(y = "+quadB(a,-B,-C)+"\\)"],
    "Expand the factors: \\[\\begin{aligned} "+fsB(r1)+fsB(r2)+" &= x^2 - ("+r1+" + "+r2+")x + ("+r1+")("+r2+") \\\\ &= x^2 "+((-(r1+r2))>0?"+ ":"- ")+Math.abs(r1+r2)+"x "+(r1*r2>0?"+ ":"- ")+Math.abs(r1*r2)+" \\end{aligned}\\] Multiplying through by \\("+a+"\\) gives \\(y = "+quadB(a,B,C)+"\\). Watch the signs: the middle coefficient is \\(-"+a+" \\times ("+r1+" + "+r2+") = "+B+"\\).",
    {a:a,r1:r1,r2:r2});
});
E("u2-revenue-model",2,["4.2"],2,"gen",function(){
  var N=pick([240,300,360,400,450,500,600]),P=pick([8,10,12,15,20]),s=pick([10,15,20,25,30,40]);
  var frame=pick([
    "A theatre sells "+N+" tickets per show at $"+P+" each. For every $1 increase in the ticket price, "+s+" fewer tickets are sold. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?",
    "A ferry carries "+N+" passengers per crossing at $"+P+" per passenger. For every $1 added to the fare, "+s+" fewer passengers ride. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?",
    "A market stall sells "+N+" jars of preserves a week at $"+P+" each. For every $1 increase in the price, "+s+" fewer jars are sold. Let \\(x\\) be the number of $1 increases. Which function gives the revenue \\(R(x)\\)?"
  ]);
  return mcq(frame,
    "\\(R(x) = ("+N+" - "+s+"x)("+P+" + x)\\)",
    ["\\(R(x) = ("+N+" + "+s+"x)("+P+" + x)\\)","\\(R(x) = ("+N+" - "+s+"x)("+P+" - x)\\)","\\(R(x) = ("+N+" - "+s+")("+P+" + x)\\)"],
    "After \\(x\\) increases, the price is \\("+P+" + x\\) dollars and the number sold is \\("+N+" - "+s+"x\\) (it drops by "+s+" per increase, so the drop is \\("+s+"x\\) in total). Revenue is price \\(\\times\\) quantity: \\(R(x) = ("+N+" - "+s+"x)("+P+" + x)\\).",
    {N:N,P:P,s:s});
});
E("u2-count-intercepts",2,["4.15"],1,"gen",function(){
  var a=pick([1,2,-1,-2,3,-3]),h=ri(-6,6),k=ri(-9,9);
  var cnt=(k===0)?1:(((a>0&&k<0)||(a<0&&k>0))?2:0);
  return numq("How many x-intercepts does the graph of "+vertT(a,h,k)+" have?",
    cnt,0.011,
    "The vertex is \\(("+h+", "+k+")\\) and the parabola opens "+(a>0?"upward":"downward")+". "+(k===0?"The vertex sits right on the x-axis, so the graph touches it at exactly one point: <b>\\(1\\)</b> x-intercept.":(cnt===2?"The vertex is on the opposite side of the x-axis from the direction the parabola opens away from, so the graph must cross the axis twice: <b>\\(2\\)</b> x-intercepts.":"The vertex is on the same side of the x-axis as the opening, so the graph never reaches the axis: <b>\\(0\\)</b> x-intercepts.")),
    {a:a,h:h,k:k});
});
E("u2-max-area",2,["4.2"],3,"gen",function(){
  var F=4*ri(6,40);
  var w=F/4,maxA=F*F/8,mode=ri(0,2);
  var c=pick([
    "A farmer uses "+F+" m of fencing to enclose a rectangular garden against a long barn wall. The wall forms one full side of the garden, so fencing is needed on only three sides.",
    "A homeowner uses "+F+" m of fencing to build a rectangular dog pen against the side of a house. The house forms one full side of the pen, so fencing is needed on only three sides.",
    "A lifeguard uses "+F+" m of rope to mark off a rectangular swimming area along a straight beach. The beach forms one full side, so rope is needed on only three sides."
  ]);
  var ask=(mode===0?" What is the maximum area that can be enclosed, in \\(m^2\\)?":(mode===1?" What is the length of each side perpendicular to the wall or beach when the area is greatest, in m?":" What is the length of the side parallel to the wall or beach when the area is greatest, in m?"));
  return numq(c+ask,
    mode===0?maxA:(mode===1?w:F/2),0.011,
    "Let \\(w\\) be the length of each side perpendicular to the wall. The side parallel to the wall is then \\("+F+" - 2w\\), and the area is \\(A = w("+F+" - 2w)\\). This quadratic opens downward; its vertex is at \\(w = \\frac{"+F+"}{4} = "+w+"\\) m. The maximum area is \\("+w+" \\times ("+F+" - 2 \\times "+w+") = "+w+" \\times "+(F-2*w)+" = \\)<b>\\("+maxA+"\\text{ m}^2\\)</b>, with the parallel side measuring "+(F-2*w)+" m.",
    {F:F,mode:mode});
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-zeros-factored",3,["4.6","4.8"],1,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function fr(n,d){var g=g2(Math.abs(n),Math.abs(d));n/=g;d/=g;return d===1?(""+n):(n+"/"+d);}
  var p=ri(2,5),qq,tries=0;
  do{qq=ri(1,9);tries++;}while(qq===p&&tries<30);
  var r=ri(1,9);
  var root1=fr(qq,p),root1T=frB(qq,p);
  return mcq("What are the zeros of \\(y = ("+p+"x - "+qq+")(x + "+r+")\\)?",
    "\\(x = -"+r+"\\) and \\(x = "+root1T+"\\)",
    ["\\(x = "+r+"\\) and \\(x = "+root1T+"\\)",
     "\\(x = -"+r+"\\) and \\(x = -"+root1T+"\\)",
     "\\(x = -"+r+"\\) and \\(x = "+frB(p,qq)+"\\)"],
    "Set each factor equal to zero. From \\(x + "+r+" = 0\\), \\(x = -"+r+"\\). From \\("+p+"x - "+qq+" = 0\\), \\("+p+"x = "+qq+"\\), so \\(x = "+root1T+"\\).",
    {p:p,qq:qq,r:r});
});
E("u3-factor-monic",3,["PK.2"],1,"gen",function(){
  var r1,r2,tries=0;
  do{r1=ri(-9,9);r2=ri(-9,9);tries++;}while((r1===0||r2===0||r1===r2||r2===-r1)&&tries<60);
  var b=-(r1+r2),c=r1*r2;
  function fs(r){return "(x "+(r>0?"- "+r:"+ "+(-r))+")";}
  return mcq("Which is the factored form of "+quadT(1,b,c)+"?",
    "\\("+fs(r1)+fs(r2)+"\\)",
    ["\\("+fs(-r1)+fs(-r2)+"\\)","\\("+fs(-r1)+fs(r2)+"\\)","\\("+fs(r1)+fs(-r2)+"\\)"],
    "Look for two numbers that multiply to \\("+c+"\\) and add to \\("+b+"\\): they are \\("+(-r1)+"\\) and \\("+(-r2)+"\\). So \\("+quadB(1,b,c)+" = "+fs(r1)+fs(r2)+"\\). (Expand it back to check: the middle term is \\(-("+r1+" + "+r2+")x = "+b+"x\\).)",
    {r1:r1,r2:r2});
});
E("u3-first-mistake",3,["4.6"],2,"var",varset([
  function(){return mcq("A student solves \\(x^2 - 5x + 6 = 0\\) by factoring.<br>Line 1: \\((x - 2)(x - 3) = 0\\)<br>Line 2: \\(x - 2 = 0\\) &nbsp;or&nbsp; \\(x - 3 = 0\\)<br>Line 3: \\(x = 2\\) &nbsp;or&nbsp; \\(x = -3\\)<br>Line 4: The roots are \\(2\\) and \\(-3\\).<br>In which line is the FIRST mistake?",
    "Line 3",["Line 1","Line 2","Line 4"],
    "The factoring in Line 1 is correct (\\(2 \\times 3 = 6\\) and \\(-2 - 3 = -5\\)) and Line 2 applies the zero-product rule properly. In Line 3, \\(x - 3 = 0\\) gives \\(x = +3\\), not \\(-3\\). The roots are \\(2\\) and \\(3\\)." );},
  function(){return mcq("A student solves \\(x^2 + 6x + 4 = 0\\) using the quadratic formula.<br>Line 1: \\(x = \\frac{-6 \\pm \\sqrt{6^2 - 4(1)(4)}}{2}\\)<br>Line 2: \\(x = \\frac{-6 \\pm \\sqrt{52}}{2}\\)<br>Line 3: \\(x = \\frac{-6 \\pm 2\\sqrt{13}}{2}\\)<br>Line 4: \\(x = -3 \\pm \\sqrt{13}\\)<br>In which line is the FIRST mistake?",
    "Line 2",["Line 1","Line 3","Line 4"],
    "Line 1 sets up the formula correctly. In Line 2, \\(6^2 - 4(1)(4) = 36 - 16 = 20\\), not \\(52\\) (the student added instead of subtracting). Everything after is consistent with that wrong value; the correct roots are \\(x = -3 \\pm \\sqrt{5}\\)." );},
  function(){return mcq("A student solves \\(x^2 = 5x\\).<br>Line 1: Divide both sides by \\(x\\): \\(x = 5\\)<br>Line 2: Check: \\(5^2 = 25\\) and \\(5 \\times 5 = 25\\), so \\(x = 5\\) works<br>Line 3: The only root is \\(x = 5\\)<br>Line 4: Answer: \\(x = 5\\)<br>In which line is the FIRST mistake?",
    "Line 1",["Line 2","Line 3","Line 4"],
    "The mistake is Line 1: dividing both sides by \\(x\\) throws away the root \\(x = 0\\), because you cannot divide by a quantity that might be zero. Done properly: \\(x^2 - 5x = 0\\), so \\(x(x - 5) = 0\\), giving \\(x = 0\\) or \\(x = 5\\)." );},
  function(){return mcq("A student solves \\(x^2 - 4x - 5 = 0\\) by factoring.<br>Line 1: \\((x - 5)(x + 1) = 0\\)<br>Line 2: \\(x - 5 = 0\\) &nbsp;or&nbsp; \\(x + 1 = 0\\)<br>Line 3: \\(x = 5\\) &nbsp;or&nbsp; \\(x = 1\\)<br>Line 4: The roots are \\(5\\) and \\(1\\).<br>In which line is the FIRST mistake?",
    "Line 3",["Line 1","Line 2","Line 4"],
    "Line 1 factors correctly (\\(-5 \\times 1 = -5\\) and \\(-5 + 1 = -4\\)) and Line 2 is a proper zero-product split. In Line 3, \\(x + 1 = 0\\) gives \\(x = -1\\), not \\(1\\). The roots are \\(5\\) and \\(-1\\).");}
]));
E("u3-solve-square",3,["4.8"],2,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function fr(n,d){var g=g2(Math.abs(n),Math.abs(d));n/=g;d/=g;return d===1?(""+n):(n+"/"+d);}
  var m=ri(1,9),n=pick([1,2,3,4]),k=pick([1,2,3]),tries=0;
  while(m===n&&tries<30){m=ri(1,9);tries++;}
  var A=n*n*k,B=m*m*k;
  var d3=(m===1)?("\\(x = \\pm "+frB(2,n)+"\\)"):("\\(x = \\pm "+frB(m*m,n)+"\\)");
  return mcq("Solve: \\("+(A===1?"":A)+"x^2 = "+B+"\\).",
    "\\(x = \\pm "+frB(m,n)+"\\)",
    ["\\(x = "+frB(m,n)+"\\) only","\\(x = \\pm "+frB(n,m)+"\\)",d3],
    "Divide both sides by \\("+A+"\\), then take the square root of both sides, remembering the negative root: \\[\\begin{aligned} x^2 &= \\frac{"+B+"}{"+A+"} = "+frB(B,A)+" \\\\ x &= \\pm "+frB(m,n)+" \\end{aligned}\\]",
    {m:m,n:n,k:k});
});
E("u3-gcf-solve",3,["4.8"],2,"gen",function(){
  var a=ri(2,7),r=ri(-9,9);while(r===0)r=ri(-9,9);
  var b=a*r;
  return numq("Solve by factoring: "+"\\("+quadB(a,b,0)+" = 0\\)"+". Give the nonzero root.",
    -r,0.011,
    "Factor out the common factor \\("+a+"x\\): \\("+a+"x(x "+(r>0?"+ "+r:"- "+(-r))+") = 0\\). So \\(x = 0\\) or \\(x = "+(-r)+"\\). The nonzero root is <b>\\("+(-r)+"\\)</b>.",
    {a:a,r:r});
});
E("u3-setup-equation",3,["4.3"],2,"var",varset([
  function(){return mcq("A flare is launched from the top of a 45 m cliff. Its height above the water after t seconds is \\(h(t) = -5t^2 + 30t + 45\\). Which equation determines the times when the flare is 65 m above the water?",
    "\\(65 = -5t^2 + 30t + 45\\)",
    ["\\(0 = -5t^2 + 30t + 45\\)","\\(t = -5(65)^2 + 30(65) + 45\\)","\\(65 = -5t^2 + 30t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 65\\). The equation \\(0 = \\dots\\) would be for hitting the water, and the second option wrongly substitutes \\(65\\) for \\(t\\) instead of for \\(h(t)\\)." );},
  function(){return mcq("A diver's height above a pool after t seconds is \\(h(t) = -5t^2 + 8t + 12\\). Which equation determines the times when the diver is 14 m above the pool?",
    "\\(14 = -5t^2 + 8t + 12\\)",
    ["\\(0 = -5t^2 + 8t + 12\\)","\\(t = -5(14)^2 + 8(14) + 12\\)","\\(14 = -5t^2 + 8t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 14\\), keeping the constant term \\(12\\) (the starting height) in place." );},
  function(){return mcq("A fountain jet's height after t seconds is \\(h(t) = -5t^2 + 20t + 3\\). Which equation determines the times when the water is 18 m above the nozzle?",
    "\\(18 = -5t^2 + 20t + 3\\)",
    ["\\(0 = -5t^2 + 20t + 3\\)","\\(t = -5(18)^2 + 20(18) + 3\\)","\\(18 = -5t^2 + 20t\\)"],
    "Set the height function equal to the target height: \\(h(t) = 18\\). Substituting \\(18\\) for \\(t\\) (the second option) would evaluate the height at \\(t = 18\\) s instead.");}
]));
E("u3-border",3,["4.3"],3,"gen",function(){
  var L=pick([12,16,18,20,24,30]),W=pick([8,10,12,14]),w=pick([1,1.5,2,2.5,3]),tries=0;
  while(W>=L&&tries<30){W=pick([8,10,12,14]);tries++;}
  var T=(L+2*w)*(W+2*w);
  var c=pick([
    {s:"A rectangular driveway is "+L+" m long and "+W+" m wide. A brick border of uniform width is built around all four sides of the driveway. The total area of the driveway and the border together is \\("+T+"\\text{ m}^2\\).",n:"border"},
    {s:"A rectangular garden plot is "+L+" m by "+W+" m. A gravel path of uniform width is built around all four sides of the plot. The total area of the plot and the path together is \\("+T+"\\text{ m}^2\\).",n:"path"}
  ]);
  return numq(c.s+" Find the width of the "+c.n+", in m.",
    w,0.011,
    "Let the width be \\(w\\). The border adds \\(w\\) to every side, so the outside dimensions are \\(("+L+" + 2w)\\) by \\(("+W+" + 2w)\\), and \\[\\begin{aligned} ("+L+" + 2w)("+W+" + 2w) &= "+T+" \\\\ 4w^2 + "+(2*(L+W))+"w + "+(L*W)+" &= "+T+" \\\\ 4w^2 + "+(2*(L+W))+"w - "+(T-L*W)+" &= 0 \\end{aligned}\\] The quadratic formula gives \\(w = "+w+"\\) or a negative value; a width cannot be negative, so the width is <b>\\("+w+"\\) m</b>.",
    {L:L,W:W,w:w});
});
E("u3-formula-repair",3,["4.9"],3,"gen",function(){
  function pair(r1,r2){var lo=Math.min(r1,r2),hi=Math.max(r1,r2);return "\\(x = "+lo+"\\) and \\(x = "+hi+"\\)";}
  var m=0,n=0,a=1,b=0,c=0,D=0,sq=0,tmpl=0,tries=0,ok=false,keyS="",stuS="",othS="",flipS="";
  while(!ok&&tries<400){tries++;
    m=ri(-6,6);n=ri(-6,6);a=pick([1,2]);tmpl=ri(0,1);
    if(m===0||n===0||m===n||m+n===0)continue;
    b=-a*(m+n);c=a*m*n;D=b*b-4*a*c;sq=a*Math.abs(m-n);
    keyS=pair(m,n);
    stuS=tmpl===0?pair(-m,-n):pair(2*m,2*n);
    othS=tmpl===0?pair(2*m,2*n):pair(-m,-n);
    flipS=pair(-m,n);
    var os=[keyS,stuS,othS,flipS];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  var work;
  if(tmpl===0){
    work="A student solves the equation "+quadT(a,b,c).slice(0,-2)+" = 0\\) with the quadratic formula. Their first line reads \\(x = \\frac{"+b+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"}\\), and they conclude the roots are "+stuS+". What are the correct roots?";
  }else{
    work="A student solves the equation "+quadT(a,b,c).slice(0,-2)+" = 0\\) with the quadratic formula. Their first line reads \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+a+"}\\), and they conclude the roots are "+stuS+". What are the correct roots?";
  }
  return mcq(work,keyS,[stuS,othS,flipS],
    "The quadratic formula needs \\(-b\\) in the numerator and \\(2a\\) in the denominator: \\(x = \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} = \\frac{"+(-b)+" \\pm "+sq+"}{"+(2*a)+"}\\), which gives <b>"+keyS+"</b>. The student\u2019s first line already departs from the formula, so their roots are wrong even though the arithmetic after it was consistent.",
    {m:m,n:n,a:a,tmpl:tmpl});
});
E("u3-discriminant-parameter",3,["4.7"],3,"gen",function(){
  if(Math.random()<0.5){
    var pairs=[[1,9],[1,16],[1,25],[1,36],[2,8],[2,18],[4,9]];
    var pr=pick(pairs);var a=pr[0],c=pr[1];var ac=a*c;var rt=Math.round(Math.sqrt(ac));
    function os4(p){return "\\(k = "+p+"\\) or \\(k = -"+p+"\\)";}
    var stems=[
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have exactly one real solution?",
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have two equal real roots?",
      "For what values of \\(k\\) does \\("+(a===1?"":a)+"x^2 + kx + "+c+" = 0\\) have a repeated root?"];
    return mcq(pick(stems),os4(2*rt),[os4(rt),os4(2*ac),os4(ac)],
      "A single repeated solution means the discriminant is zero: \\(k^2 - 4("+a+")("+c+") = 0\\), so \\(k^2 = "+(4*ac)+"\\) and \\(k = \\pm 2\\sqrt{"+ac+"}\\), giving <b>"+os4(2*rt)+"</b>. Both signs work, because only \\(k^2\\) appears in the discriminant.",
      {a:a,c:c});
  }
  var bs=[6,8,10,12,14];var b=pick(bs);var th=b*b/4;var off=ri(1,8);
  var e1=ri(2,4),e2=e1+ri(2,4);
  return mcq("The equation \\(x^2 + "+b+"x + k = 0\\) has no real solutions. Which value could \\(k\\) be?",
    ""+(th+off),[""+th,""+(th-e1),""+(th-e2)],
    "No real solutions means the discriminant is negative: \\("+b+"^2 - 4k < 0\\), which gives \\(k > \\frac{"+(b*b)+"}{4} = "+th+"\\). Only \\("+(th+off)+"\\) is greater than \\("+th+"\\): at \\(k = "+th+"\\) there would be exactly one solution, and smaller values give two.",
    {b:b,th:th});
});
E("u3-exact-roots",3,["4.9"],2,"gen",function(){
  function g2(a,b){while(b){var t=a%b;a=b;b=t;}return a;}
  function rootPair(aa,bb,cc){
    var D=bb*bb-4*aa*cc;if(D<=0)return null;
    var rt=Math.round(Math.sqrt(D));if(rt*rt===D)return null;
    var sq=1,d0=D,f;for(f=2;f*f<=d0;f++){while(d0%(f*f)===0){d0/=(f*f);sq*=f;}}
    if(d0===1)return null;
    var g=g2(g2(Math.abs(bb),sq),2*aa),nb=-bb/g,s=sq/g,den=(2*aa)/g;
    var num=""+nb+" \\pm "+(s===1?"":s)+"\\sqrt{"+d0+"}";
    return den===1?("\\(x = "+num+"\\)"):("\\(x = \\frac{"+num+"}{"+den+"}\\)");
  }
  var a,b,c,key,d1,d2,d3,tries=0;
  do{
    a=pick([1,2]);b=ri(-9,9);c=ri(-9,9);tries++;
    if(b===0||c===0){key=null;continue;}
    key=rootPair(a,b,c);d1=rootPair(a,-b,c);d2=rootPair(a,b,-c);d3=rootPair(a,c,b);
  }while((!key||!d1||!d2||!d3||d1===key||d2===key||d3===key||d2===d1||d3===d1||d3===d2)&&tries<300);
  var D=b*b-4*a*c,sq=1,d0=D,f;for(f=2;f*f<=d0;f++){while(d0%(f*f)===0){d0/=(f*f);sq*=f;}}
  var g=g2(g2(Math.abs(b),sq),2*a);
  return mcq("What are the exact roots of "+"\\("+quadB(a,b,c)+" = 0\\)"+"?",
    key,[d1,d2,d3],
    "Quadratic formula: \\[\\begin{aligned} x &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\\\ &= \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} \\end{aligned}\\] Since \\("+D+" = "+(sq*sq)+" \\times "+d0+"\\), \\(\\sqrt{"+D+"} = "+sq+"\\sqrt{"+d0+"}\\)"+(g>1?", and dividing numerator and denominator by \\("+g+"\\)":"")+", giving <b>"+key+"</b>.",
    {a:a,b:b,c:c});
});

/* --- Unit 4: Radicals --- */
E("u4-variable-mixed",4,["1.3"],2,"gen",function(){
  var s=ri(2,5),r=pick([2,3,5,6,7]),n=pick([1,2,3]);
  var coef=s*s*r,p=2*n+1;
  var xnT=(n===1?"x":"x^{"+n+"}");
  return mcq("Simplify: \\(\\sqrt{"+coef+"x^{"+p+"}}\\).",
    "\\("+s+xnT+"\\sqrt{"+r+"x}\\)",
    ["\\("+(s+1)+xnT+"\\sqrt{"+r+"x}\\)", "\\("+s+"x^{"+(n+1)+"}\\sqrt{"+r+"x}\\)", "\\("+s+xnT+"\\sqrt{"+coef+"x}\\)"],
    "\\("+coef+" = "+(s*s)+" \\times "+r+"\\) and \\(x^{"+p+"} = (x^{"+n+"})^2 x\\), so the square factors come out: \\(\\sqrt{"+coef+"x^{"+p+"}} = "+s+xnT+"\\sqrt{"+r+"x}\\). One x stays inside because the exponent \\("+p+"\\) is odd.",
    {s:s,r:r,n:n});
});
E("u4-multiply-mixed",4,["1.6"],2,"gen",function(){
  var pairs=[[2,3],[2,5],[2,6],[2,7],[2,10],[3,5],[3,6],[3,7],[3,10],[5,6],[5,7],[5,10],[6,7],[6,10],[7,10]];
  var pr=pick(pairs),b=pr[0],d=pr[1],a=ri(2,4),c=ri(2,4);
  var bd=b*d,t=1,rr=bd,f;for(f=2;f*f<=rr;f++){while(rr%(f*f)===0){rr/=(f*f);t*=f;}}
  var key=radT(a*c*t,rr);
  var d2=(t>1)?radT(a*c,rr):radT(a*c*t,d);
  var d3=radT(a*c*t,b+d);
  return mcq("Simplify: ("+radT(a,b)+")("+radT(c,d)+").",
    key,
    [radT(a*c*t,b),d2,d3],
    "Multiply the outside numbers together and the inside numbers together: \\("+a+" \\times "+c+" = "+(a*c)+"\\) and \\(\\sqrt{"+b+"} \\times \\sqrt{"+d+"} = \\sqrt{"+bd+"}\\). Then simplify \\(\\sqrt{"+bd+"} = "+(t>1?(t+"\\sqrt{"+rr+"}"):("\\sqrt{"+rr+"}"))+"\\), so the product is "+key+".",
    {a:a,b:b,c:c,d:d});
});
E("u4-equation-restriction",4,["1.8"],1,"gen",function(){
  var p=pick([1,2,3,4]),m=ri(-6,8),r=ri(2,9),tries=0;
  while(m===0&&tries<20){m=ri(-6,8);tries++;}
  var q=-p*m;
  var inside=(p===1?"x":(""+p+"x"))+(q>0?" + "+q:" - "+(-q));
  return mcq("State the restriction on x in the radical equation \\(\\sqrt{"+inside+"} = "+r+"\\).",
    "\\(x \\geq "+m+"\\)",
    ["\\(x \\leq "+m+"\\)","\\(x \\geq "+(-m)+"\\)","All real numbers"],
    "The radicand cannot be negative: \\("+inside+" \\ge 0\\) gives \\("+(p===1?"x":(""+p+"x"))+" \\ge "+(-q)+"\\), so \\(x \\ge "+m+"\\). This restriction must hold before the equation can have any solution at all.",
    {p:p,m:m,r:r});
});
E("u4-verify-root",4,["1.10"],1,"gen",function(){
  var s=ri(3,9),a=ri(3,20),b=ri(2,6);
  var X=s*s-a;
  if(Math.random()<0.5){
    return numq("A student solving \\(\\sqrt{x + "+a+"} = x - "+b+"\\) claims that \\(x = "+X+"\\) is a root. Substitute \\(x = "+X+"\\): what is the value of the LEFT side, \\(\\sqrt{x + "+a+"}\\)?",
      s,0.011,
      "\\(\\sqrt{"+X+" + "+a+"} = \\sqrt{"+(s*s)+"}\\) = <b>\\("+s+"\\)</b>. (For comparison, the right side at \\(x = "+X+"\\) is \\("+X+" - "+b+" = "+(X-b)+"\\). Both sides must give the same value for \\(x = "+X+"\\) to actually be a root.)",
      {mode:1,X:X,a:a,b:b});
  }
  return numq("A student solving \\(\\sqrt{x + "+a+"} = x - "+b+"\\) claims that \\(x = "+X+"\\) is a root. Substitute \\(x = "+X+"\\): what is the value of the RIGHT side, \\(x - "+b+"\\)?",
    X-b,0.011,
    "\\("+X+" - "+b+"\\) = <b>\\("+(X-b)+"\\)</b>. (For comparison, the left side at \\(x = "+X+"\\) is \\(\\sqrt{"+X+" + "+a+"} = "+s+"\\). Both sides must give the same value for \\(x = "+X+"\\) to actually be a root.)",
    {mode:2,X:X,a:a,b:b});
});
E("u4-model-equation",4,["1.12"],2,"gen",function(){
  var T=pick([2,3,4,5,6]),L=T*T/4;
  return numq("The period of a simple pendulum is modelled by \\(T = 2\\sqrt{L}\\), where T is the period in seconds and L is the length in metres. How long is a pendulum whose period is "+T+" s, in m?",
    L,0.011,
    "\\("+T+" = 2\\sqrt{L}\\), so \\(\\sqrt{L} = "+T+" \\div 2 = "+fmt(T/2,2)+"\\). Squaring both sides gives \\(L\\) = <b>\\("+fmt(L,2)+"\\text{ m}\\)</b>.",
    {mode:2,T:T});
});
E("u4-model-evaluate",4,["1.12"],1,"gen",function(){
  {
    var d=ri(3,60),sp=5*Math.sqrt(d);
    return numq("Police estimate a car's speed from a skid mark using \\(s = \\sqrt{25d}\\), where s is the speed in km/h and d is the length of the skid mark in metres. A skid mark at a collision scene measures "+d+" m. Estimate the car's speed, to one decimal place, in km/h.",
      fmt(sp,1),0.06,
      "Substitute \\(d = "+d+"\\): \\(s = \\sqrt{25 \\times "+d+"} = \\sqrt{"+(25*d)+"} \\approx "+fmt(sp,1)+"\\). So the speed is about <b>\\("+fmt(sp,1)+"\\text{ km/h}\\)</b>.",
      {mode:1,d:d});
  }
});

/* ============ Tranche 4 (Oct 26): QE RHS harvest — Units 4, 3, 8 ============
   Templates reworked from the QE RHS radicals / quadratic equations / angles
   tests and reviews (see harvest/qerhs-inventory.md); every item re-created
   with new numbers and contexts, nothing copied verbatim. */

/* --- Unit 4: Radicals --- */
E("u4-cube-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(2,5),b=pick([2,3,5,6,7,10,11,13,14,15,21,22,26,30]);
  var neg=Math.random()<0.25;
  var mag=a*a*a*b;
  return mcq("Express "+cbrtT((neg?"-":"")+mag)+" as a mixed radical in simplest form.",
    rad3T(neg?-a:a,b),
    [rad3T(neg?-(a+1):a+1,b),rad3T(neg?-a:a,b+1),rad3T(neg?-a:a,a*b)],
    "Find the largest perfect cube dividing \\("+mag+"\\): \\("+mag+" = "+(a*a*a)+" \\times "+b+"\\). Cube roots group factors in threes, so "+cbrtT((neg?"-":"")+mag)+" = "+rad3T(neg?-a:a,b)+"."+(neg?" (A cube root of a negative number is negative.)":""),
    {a:a,b:b,neg:neg});
});
E("u4-cube-equation",4,["1.9"],2,"gen",function(){
  var r=ri(-4,5),p=pick([1,2,3]),x0=ri(-12,20);
  var q=r*r*r-p*x0;
  var inside=(p===1?"x":p+"x")+(q>0?" + "+q:(q<0?" - "+(-q):""));
  var sol="Cube both sides"+(p>1?", then divide by \\("+p+"\\)":"")+": \\[\\begin{aligned} "+inside+" &= {"+r+"}^{3} = "+(r*r*r)+" \\\\ "+(p===1?"x":p+"x")+" &= "+(r*r*r)+(q>0?" - "+q:(q<0?" + "+(-q):""))+" = "+(p*x0)+" \\\\ x &= "+x0+" \\end{aligned}\\] (Cube roots accept negative inputs, so there is no restriction to check.)";
  return numq("Solve: \\(\\sqrt[3]{"+inside+"} = "+r+"\\). Give the value of x.",
    x0,0.011,sol,{r:r,p:p,x0:x0,q:q});
});
E("u4-combine-multi",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);
  var D,M,SG,tot,tries=0;
  do{
    D=[ri(1,3),ri(1,3),ri(1,3)];M=[ri(1,4),ri(2,4),ri(1,4)];
    SG=[1,Math.random()<0.5?-1:1,Math.random()<0.5?-1:1];
    tot=D[0]*M[0]+SG[1]*D[1]*M[1]+SG[2]*D[2]*M[2];tries++;
  }while(tot<1&&tries<60);
  function term(i){return radT(D[i],M[i]*M[i]*b);}
  var key=radT(tot,b);
  var slip1=D[0]*M[0]-SG[1]*D[1]*M[1]+SG[2]*D[2]*M[2];
  var d2v=D[0]*M[0]+SG[1]*D[1]*M[1];
  var cand=[slip1,d2v,tot+1,tot+2,tot+3,tot+5],ds=[];
  for(var ci=0;ci<cand.length&&ds.length<2;ci++){var cv=cand[ci];if(cv>=1&&cv!==tot&&ds.indexOf(cv)<0)ds.push(cv);}
  var d1=radT(ds[0],b),d2=radT(ds[1],b);
  var d3=sqrtT(M[0]*M[0]*b+M[1]*M[1]*b+M[2]*M[2]*b);
  return mcq("Simplify: \\("+term(0).slice(2,-2)+(SG[1]>0?" + ":" - ")+term(1).slice(2,-2)+(SG[2]>0?" + ":" - ")+term(2).slice(2,-2)+"\\)",
    key,[d1,d2,d3],
    "Simplify each term first: "+term(0)+" = "+radT(D[0]*M[0],b)+", "+term(1)+" = "+radT(D[1]*M[1],b)+", and "+term(2)+" = "+radT(D[2]*M[2],b)+". They are like radicals, so combine the coefficients: \\("+(D[0]*M[0])+" "+(SG[1]>0?"+ ":"- ")+(D[1]*M[1])+" "+(SG[2]>0?"+ ":"- ")+(D[2]*M[2])+" = "+tot+"\\), giving <b>"+key+"</b>.",
    {b:b,D:D,M:M,SG:SG});
});
E("u4-binomial-square",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),n=pick([2,3,5,6,7,10,11,13].filter(function(x){return x!==m;}));
  var mn=m*n,t=1,r=mn,f;for(f=2;f*f<=r;f++){while(r%(f*f)===0){r/=(f*f);t*=f;}}
  var plus=Math.random()<0.5;
  var sgn=plus?"+":"\u2212",osgn=plus?"\u2212":"+";
  var sgnT=plus?"+":"-",osgnT=plus?"-":"+";
  var key="\\("+(m+n)+" "+sgnT+" "+(2*t)+"\\sqrt{"+r+"}\\)";
  return mcq("Expand and simplify: \\((\\sqrt{"+m+"} "+sgnT+" \\sqrt{"+n+"})^2\\).",
    key,
    ["\\("+(m+n)+" "+osgnT+" "+(2*t)+"\\sqrt{"+r+"}\\)","\\("+(m+n)+" "+sgnT+" \\sqrt{"+mn+"}\\)","\\("+(m+n)+" "+sgnT+" "+t+"\\sqrt{"+r+"}\\)"],
    "\\((a "+sgnT+" b)^2 = a^2 "+sgnT+" 2ab + b^2\\). Here \\(a^2 = "+m+"\\) and \\(b^2 = "+n+"\\), and the middle term is \\(2\\sqrt{"+m+"} \\times \\sqrt{"+n+"} = 2\\sqrt{"+mn+"} = "+(2*t)+"\\sqrt{"+r+"}\\). Adding the parts: \\("+m+" + "+n+" = "+(m+n)+"\\), so the expansion is "+key+".",
    {m:m,n:n,plus:plus});
});
E("u4-triangle-perimeter",4,["1.6"],2,"gen",function(){
  var b=pick([2,3,5,6,7,10,11,13]);
  var s1=ri(1,4),s2=ri(1,4),s3=ri(1,4),sum=s1+s2+s3;
  var n1=s1*s1*b,n2=s2*s2*b,n3=s3*s3*b;
  return mcq("A triangle has sides of "+sqrtT(n1)+" cm, "+sqrtT(n2)+" cm and "+sqrtT(n3)+" cm. What is its perimeter, in simplest radical form?",
    radT(sum,b),
    [radT(s1+s2,b),sqrtT(n1+n2+n3),radT(sum+1,b)],
    "Simplify each side: "+sqrtT(n1)+" = "+radT(s1,b)+", "+sqrtT(n2)+" = "+radT(s2,b)+", "+sqrtT(n3)+" = "+radT(s3,b)+". Add the like radicals: \\("+s1+" + "+s2+" + "+s3+" = "+sum+"\\), so the perimeter is <b>"+radT(sum,b)+" cm</b>. (Do not add the numbers under one root.)",
    {b:b,s:[s1,s2,s3]});
});
E("u4-width-radical",4,["1.6"],2,"gen",function(){
  var a=ri(2,5),b=pick([2,3,5,6,7]),c=ri(2,5),d=pick([2,3,5,6,7]);
  var bd=b*d,t=1,r0=bd,f;for(f=2;f*f<=r0;f++){while(r0%(f*f)===0){r0/=(f*f);t*=f;}}
  var keyW=radT(a,b);
  var candW=[[a,b*d],[a*c,b],[a*t,r0],[a,d],[a+1,b],[c,b],[a*c,b*d]],dsW=[];
  for(var ci=0;ci<candW.length&&dsW.length<3;ci++){var stW=radT(candW[ci][0],candW[ci][1]);if(stW!==keyW&&dsW.indexOf(stW)<0)dsW.push(stW);}
  return mcq("A rectangle has area \\("+(a*c)+"\\sqrt{"+bd+"}\\) \\(cm^2\\) and length "+radT(c,d)+" cm. What is its width, in simplest radical form?",
    keyW,
    dsW,
    "Width = area \\(\\div\\) length = \\("+(a*c)+"\\sqrt{"+bd+"} \\div "+c+"\\sqrt{"+d+"}\\). Divide the coefficients: \\("+(a*c)+" \\div "+c+" = "+a+"\\). Divide the radicals: \\(\\sqrt{"+bd+"} \\div \\sqrt{"+d+"} = \\sqrt{"+b+"}\\). So the width is <b>"+radT(a,b)+" cm</b>.",
    {a:a,b:b,c:c,d:d});
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-equation-fraction-roots",3,["4.6"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x;}
  function mkRoot(){var p,q,tries=0;do{p=pick([-3,-2,-1,1,2,3]);q=pick([2,3,4]);tries++;}while(gcd(p,q)!==1&&tries<40);return [p,q];}
  var r1=mkRoot(),r2=mkRoot(),tries=0;
  while(r1[0]*r2[1]+r2[0]*r1[1]===0&&tries<40){r2=mkRoot();tries++;}
  var p1=r1[0],q1=r1[1],p2=r2[0],q2=r2[1];
  var A=q1*q2,B=-(p1*q2+p2*q1),C=p1*p2;
  function fr(p,q){return (p<0?"-":"")+Math.abs(p)+"/"+q;}
  var key="\\("+quadB(A,B,C)+" = 0\\)";
  return mcq("Which quadratic equation has roots of \\("+frB(p1,q1)+"\\) and \\("+frB(p2,q2)+"\\)?",
    key,
    ["\\("+quadB(A,-B,C)+" = 0\\)","\\("+quadB(A,B,-C)+" = 0\\)","\\("+quadB(A,-B,-C)+" = 0\\)"],
    "Build the factors from the roots: \\(("+q1+"x "+(p1>0?"- "+p1:"+ "+(-p1))+")("+q2+"x "+(p2>0?"- "+p2:"+ "+(-p2))+") = 0\\). Expanding gives \\("+quadB(A,B,C)+" = 0\\), that is, <b>"+key+"</b>.",
    {A:A,B:B,C:C});
});
E("u3-solve-height",3,["4.3"],2,"gen",function(){
  var combos=[[1,4,40],[1,4,50],[1,5,40],[1,5,50],[1,5,60],[1,6,50],[1,6,60],[2,4,60],[2,4,80],[2,5,80],[1,7,60],[2,6,100]];
  var cb=pick(combos),t1=cb[0],t2=cb[1],H=cb[2];
  var b=5*(t1+t2),c0=H-5*t1*t2;
  var later=Math.random()<0.5;
  var ctx=pick([["missile","fired from a ship","above the water"],["rocket","launched from a platform","above the ground"],["flare","fired from a cliff top","above the sea"]]);
  return numq("A "+ctx[0]+" is "+ctx[1]+". Its height "+ctx[2]+" after t seconds is \\(h(t) = -5t^2 + "+b+"t + "+c0+"\\) (metres). At what time is it exactly "+H+" m "+ctx[2]+"? Give the "+(later?"later":"earlier")+" time, in s.",
    later?t2:t1,0.011,
    "Set \\(h(t) = "+H+"\\), then divide by \\(-5\\) and factor: \\[\\begin{aligned} -5t^2 + "+b+"t + "+c0+" &= "+H+" \\\\ -5t^2 + "+b+"t + "+(c0-H)+" &= 0 \\\\ t^2 - "+(t1+t2)+"t + "+(t1*t2)+" &= 0 \\\\ (t - "+t1+")(t - "+t2+") &= 0 \\end{aligned}\\] The "+ctx[0]+" is at "+H+" m at \\(t = "+t1+"\\) s and \\(t = "+t2+"\\) s; the "+(later?"later":"earlier")+" time is <b>\\("+(later?t2:t1)+"\\) s</b>.",
    {t1:t1,t2:t2,H:H,later:later});
});
E("u3-model-number",3,["4.3"],2,"var",varset([
  function(){return mcq("The product of two consecutive even integers is 120. If \\(x\\) is the smaller integer, which equation models this?",
    "\\(x(x + 2) = 120\\)",
    ["\\(x(x + 1) = 120\\)","\\((x + 2)(x + 2) = 120\\)","\\(x + (x + 2) = 120\\)"],
    "Consecutive even integers differ by \\(2\\), so the integers are \\(x\\) and \\(x + 2\\). Their product is \\(x(x + 2)\\), set equal to \\(120\\).",
    {});},
  function(){return mcq("The sum of the squares of two consecutive integers is 85. If \\(x\\) is the smaller integer, which equation models this?",
    "\\(x^2 + (x + 1)^2 = 85\\)",
    ["\\((x + (x + 1))^2 = 85\\)","\\(x^2 + (x + 2)^2 = 85\\)","\\(2x^2 = 85\\)"],
    "Consecutive integers are \\(x\\) and \\(x + 1\\). Square each, then add: \\(x^2 + (x + 1)^2 = 85\\).",
    {});},
  function(){return mcq("A rectangular room is 10 m by 8 m. A strip of width x metres is removed along one full length and one full width, making the room smaller on two adjacent sides. The new area is \\(48\\text{ m}^2\\). Which equation models this?",
    "\\((10 - x)(8 - x) = 48\\)",
    ["\\((10 - 2x)(8 - 2x) = 48\\)","\\((10 + x)(8 + x) = 48\\)","\\((10 - 2x)(8 - x) = 48\\)"],
    "Only one length and one width shrink, each by \\(x\\) (not \\(2x\\)): the new dimensions are \\((10 - x)\\) and \\((8 - x)\\), and their product is the new area, \\(48\\).",
    {});},
  function(){return mcq("A rectangle's length is 3 m more than its width. Its area is \\(40\\text{ m}^2\\). If \\(x\\) is the width, which equation models this?",
    "\\(x(x + 3) = 40\\)",
    ["\\(x + (x + 3) = 40\\)","\\(x^2 + 3 = 40\\)","\\((x - 3)x = 40\\)"],
    "The width is \\(x\\) and the length is \\(x + 3\\). Area = width \\(\\times\\) length = \\(x(x + 3) = 40\\).",
    {});}
]));

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-congruence-deduce",8,["5.6"],1,"gen",function(){
  var sets=[["A","B","C"],["P","Q","R"],["X","Y","Z"],["D","E","F"],["M","N","S"],["J","K","L"]];
  var s1=pick(sets),s2=pick(sets.filter(function(x){return x!==s1;}));
  var name1=s1.join(""),name2=s2.join("");
  var corr="\\("+s1[0]+" \\leftrightarrow "+s2[0]+", "+s1[1]+" \\leftrightarrow "+s2[1]+", "+s1[2]+" \\leftrightarrow "+s2[2]+"\\)";
  var i=ri(0,2);
  if(Math.random()<0.5){
    var key="\\(\\angle "+s1[i]+" = \\angle "+s2[i]+"\\)";
    return mcq("Given \\(\\triangle "+name1+" \\cong \\triangle "+name2+"\\), which equality must be true?",
      key,
      ["\\(\\angle "+s1[i]+" = \\angle "+s2[(i+1)%3]+"\\)","\\(\\angle "+s1[i]+" = \\angle "+s2[(i+2)%3]+"\\)","\\(\\angle "+s1[(i+1)%3]+" = \\angle "+s2[i]+"\\)"],
      "In a congruence statement the vertices match in order: "+corr+". So \\(\\angle "+s1[i]+"\\) corresponds to \\(\\angle "+s2[i]+"\\), and corresponding angles of congruent triangles are equal.",
      {mode:"angle",s1:s1,s2:s2,i:i});
  }
  var sides=[[0,1],[1,2],[0,2]],sd=pick(sides),u=sd[0],v=sd[1],w=3-u-v;
  var keyS="\\("+s1[u]+s1[v]+" = "+s2[u]+s2[v]+"\\)";
  return mcq("Given \\(\\triangle "+name1+" \\cong \\triangle "+name2+"\\), which equality must be true?",
    keyS,
    ["\\("+s1[u]+s1[v]+" = "+s2[u]+s2[w]+"\\)","\\("+s1[u]+s1[v]+" = "+s2[v]+s2[w]+"\\)","\\("+s1[u]+s1[w]+" = "+s2[u]+s2[v]+"\\)"],
    "In a congruence statement the vertices match in order: "+corr+". Side \\("+s1[u]+s1[v]+"\\) joins the first-named corresponding vertices, so it matches side \\("+s2[u]+s2[v]+"\\), and corresponding sides of congruent triangles are equal.",
    {mode:"side",s1:s1,s2:s2,u:u,v:v});
});
E("u8-multi-angle",8,["5.8"],2,"var",varset([
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) is vertically opposite a \\(110^\\circ\\) angle. \\(\\angle y\\) is a corresponding angle to \\(\\angle x\\). \\(\\angle z\\) forms a co-interior pair with \\(\\angle y\\). What are the three measures?",
    "\\(\\angle x = 110^\\circ, \\angle y = 110^\\circ, \\angle z = 70^\\circ\\)",
    ["\\(\\angle x = 110^\\circ, \\angle y = 70^\\circ, \\angle z = 110^\\circ\\)","\\(\\angle x = 70^\\circ, \\angle y = 110^\\circ, \\angle z = 70^\\circ\\)","\\(\\angle x = 110^\\circ, \\angle y = 110^\\circ, \\angle z = 110^\\circ\\)"],
    "Vertically opposite angles are equal, so \\(\\angle x = 110^\\circ\\). Corresponding angles are equal, so \\(\\angle y = 110^\\circ\\). Co-interior angles are supplementary: \\(\\angle z = 180^\\circ - 110^\\circ = 70^\\circ\\).",
    {});},
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) is a corresponding angle to a \\(65^\\circ\\) angle. \\(\\angle y\\) sits beside \\(\\angle x\\) on a straight line. \\(\\angle z\\) is vertically opposite \\(\\angle y\\). What are the three measures?",
    "\\(\\angle x = 65^\\circ, \\angle y = 115^\\circ, \\angle z = 115^\\circ\\)",
    ["\\(\\angle x = 65^\\circ, \\angle y = 65^\\circ, \\angle z = 115^\\circ\\)","\\(\\angle x = 115^\\circ, \\angle y = 65^\\circ, \\angle z = 115^\\circ\\)","\\(\\angle x = 65^\\circ, \\angle y = 115^\\circ, \\angle z = 65^\\circ\\)"],
    "Corresponding angles are equal, so \\(\\angle x = 65^\\circ\\). Angles on a straight line add to \\(180^\\circ\\), so \\(\\angle y = 115^\\circ\\). Vertically opposite angles are equal, so \\(\\angle z = 115^\\circ\\).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 48^\\circ\\) and \\(\\angle B = 67^\\circ\\). \\(\\angle D\\) is the exterior angle at \\(C\\), formed by extending side \\(BC\\). What are \\(\\angle C\\) and \\(\\angle D\\)?",
    "\\(\\angle C = 65^\\circ, \\angle D = 115^\\circ\\)",
    ["\\(\\angle C = 65^\\circ, \\angle D = 65^\\circ\\)","\\(\\angle C = 115^\\circ, \\angle D = 65^\\circ\\)","\\(\\angle C = 67^\\circ, \\angle D = 113^\\circ\\)"],
    "The interior angles add to \\(180^\\circ\\): \\(\\angle C = 180^\\circ - 48^\\circ - 67^\\circ = 65^\\circ\\). The exterior angle sits on a straight line with \\(\\angle C\\): \\(\\angle D = 180^\\circ - 65^\\circ = 115^\\circ\\) (which also equals \\(\\angle A + \\angle B\\)).",
    {});},
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle p\\) and a \\(72^\\circ\\) angle are alternate interior angles. \\(\\angle q\\) forms a co-interior pair with \\(\\angle p\\). \\(\\angle r\\) is vertically opposite \\(\\angle q\\). What are the three measures?",
    "\\(\\angle p = 72^\\circ, \\angle q = 108^\\circ, \\angle r = 108^\\circ\\)",
    ["\\(\\angle p = 72^\\circ, \\angle q = 72^\\circ, \\angle r = 108^\\circ\\)","\\(\\angle p = 108^\\circ, \\angle q = 72^\\circ, \\angle r = 72^\\circ\\)","\\(\\angle p = 72^\\circ, \\angle q = 108^\\circ, \\angle r = 72^\\circ\\)"],
    "Alternate interior angles are equal, so \\(\\angle p = 72^\\circ\\). Co-interior angles are supplementary: \\(\\angle q = 180^\\circ - 72^\\circ = 108^\\circ\\). Vertically opposite angles are equal, so \\(\\angle r = 108^\\circ\\).",
    {});}
]));
E("u8-triangle-algebra",8,["5.8"],2,"gen",function(){
  var combos=[[1,2,3],[1,2,6],[2,3,4],[1,3,5],[2,3,7],[3,4,5],[1,4,7],[2,5,8],[3,5,7],[4,5,9],[5,7,8],[1,1,4],[1,2,7],[1,3,6],[2,2,6],[3,3,4],[1,4,5],[2,4,9],[4,4,7],[1,5,9],[3,6,9],[4,6,8],[5,5,8],[2,7,11],[4,7,9],[6,6,8],[1,9,20],[5,10,15],[10,12,14],[9,13,14],[15,20,25],[20,25,45]];
  var cb=pick(combos),a=cb[0],b=cb[1],c=cb[2];
  var x=180/(a+b+c),vi=ri(0,2),coef=cb[vi];
  return numq("The three angles of a triangle measure \\(("+a+"x)^\\circ\\), \\(("+b+"x)^\\circ\\) and \\(("+c+"x)^\\circ\\). What is the measure of the \\(("+coef+"x)^\\circ\\) angle, in degrees?",
    coef*x,0.011,
    "The angles add to \\(180^\\circ\\): \\[\\begin{aligned} ("+a+" + "+b+" + "+c+")x &= 180 \\\\ "+(a+b+c)+"x &= 180 \\\\ x &= "+x+" \\end{aligned}\\] The angle asked for is \\("+coef+"x = "+coef+" \\times "+x+" = \\)<b>\\("+(coef*x)+"^\\circ\\)</b>.",
    {cb:cb,vi:vi});
});
E("u8-polygon-inverse",8,["5.5"],1,"gen",function(){
  var mode=ri(0,2);
  if(mode===0){
    var n=ri(5,40),S=(n-2)*180;
    return numq("The interior angles of a convex polygon add up to \\("+S+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,"The sum is \\((n - 2) \\times 180^\\circ\\). So \\(n - 2 = "+S+" \\div 180 = "+(n-2)+"\\), which gives \\(n = \\)<b>\\("+n+"\\)</b>.",{mode:0,n:n});
  }
  if(mode===1){
    var pair=pick([[5,108],[6,120],[8,135],[9,140],[10,144],[12,150],[15,156],[18,160],[20,162],[24,165]]),n1=pair[0];
    return numq("Each interior angle of a regular polygon measures \\("+pair[1]+"^\\circ\\). How many sides does the polygon have?",
      n1,0.011,"For a regular polygon each interior angle is \\((n - 2) \\times 180^\\circ \\div n\\). Trying \\(n = "+n1+"\\): \\(("+n1+" - 2) \\times 180 \\div "+n1+" = "+pair[1]+"^\\circ\\). So \\(n = \\)<b>\\("+n1+"\\)</b>. (Equivalently, each exterior angle is \\(180^\\circ - "+pair[1]+"^\\circ = "+(180-pair[1])+"^\\circ\\), and \\(360 \\div "+(180-pair[1])+" = "+n1+"\\).)",{mode:1,n:n1});
  }
  var pr=pick([[4,90],[5,72],[6,60],[8,45],[9,40],[10,36],[12,30],[15,24],[18,20],[20,18],[24,15],[30,12],[36,10],[40,9],[45,8],[60,6],[72,5],[90,4],[120,3],[180,2]]),n2=pr[0];
  return numq("Each exterior angle of a regular polygon measures \\("+pr[1]+"^\\circ\\). How many sides does the polygon have?",
    n2,0.011,"The exterior angles of any convex polygon add to \\(360^\\circ\\). For a regular polygon they are all equal, so \\(n = 360 \\div "+pr[1]+" = \\)<b>\\("+n2+"\\)</b>.",{mode:2,n:n2});
});
E("u8-proof-reason",8,["5.4"],1,"var",varset([
  function(){return mcq("Lines \\(PQ\\) and \\(RS\\) are parallel, cut by a transversal. \\(\\angle a\\) is at the top right of the first intersection, and \\(\\angle b\\) is at the top right of the second intersection. A student writes: “\\(\\angle a = \\angle b\\) because they are alternate interior angles.” What is wrong with the reason?",
    "The angles are corresponding angles, not alternate interior angles",
    ["Nothing - the reason given is correct for these two angles","The angles are co-interior angles, not alternate interior angles","The angles are vertically opposite angles, not alternate interior angles"],
    "\\(\\angle a\\) and \\(\\angle b\\) sit in the same relative position (top right) at each intersection, which makes them corresponding angles. Alternate interior angles sit between the two lines, on opposite sides of the transversal. The equality is right; the named reason is wrong.",
    {});},
  function(){var q=mcq("Given \\(AB \\parallel CD\\) and \\(AE = DE\\), with \\(E\\) on the segment joining the two lines, a proof shows \\(\\triangle ABE \\cong \\triangle DCE\\). One step states \\(\\angle BAE = \\angle CDE\\). Which reason justifies that step?",
    "Alternate interior angles, because \\(AB \\parallel CD\\)",
    ["Vertically opposite angles at the crossing","Corresponding angles, because \\(AB \\parallel CD\\) holds here","Co-interior angles, because \\(AB \\parallel CD\\) - they add up"],
    "\\(\\angle BAE\\) and \\(\\angle CDE\\) lie between the parallel lines, on opposite sides of the transversal \\(AD\\) (the line through A, E and D), so they are alternate interior angles, which are equal when the lines are parallel. (Co-interior angles would be supplementary, not equal.)",
    {});q.figure=bowtieSVG();return q;},
  function(){var q=mcq("In the same proof (\\(AB \\parallel CD\\), \\(AE = DE\\), prove \\(\\triangle ABE \\cong \\triangle DCE\\)), another step states \\(\\angle AEB = \\angle CED\\). Which reason justifies that step?",
    "Vertically opposite angles",
    ["Alternate interior angles, because \\(AB \\parallel CD\\)","Given information stated","The SSS congruence postulate"],
    "\\(\\angle AEB\\) and \\(\\angle CED\\) are formed by the same two intersecting lines at point \\(E\\), directly across from each other \u2014 vertically opposite angles, which are always equal. No parallel lines are needed for this step.",
    {});q.figure=bowtieSVG();return q;}
]));

/* ============ Tranche 5 (Oct 26): Payne first, then HHM ============
   Templates reworked from Mr. Payne's chapter reviews (Ch 3 Trigonometry,
   Ch 8a Proportional Reasoning) and Jason's HHM archive (Ch 1 reasoning
   review + the inductive reasoning / counterexamples worksheet). New
   numbers and contexts throughout; nothing copied verbatim. Targets the
   thinnest units against the outline weights: U1, U6, U7. */

/* --- Unit 1: Acute Triangle Trigonometry (Payne Ch 3) --- */
E("u1-law-formula",1,["7.1","7.2"],1,"var",varset([
  function(){return mcq("In \\(\\triangle ABC\\), the sine law states \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\). According to the sine law, side \\(a\\) equals…",
    "\\(\\frac{c \\sin A}{\\sin C}\\)",
    ["\\(\\frac{c \\sin C}{\\sin A}\\)","\\(\\frac{\\sin A}{c \\sin C}\\)","\\(\\frac{c \\sin B}{\\sin C}\\)"],
    "From \\(\\frac{a}{\\sin A} = \\frac{c}{\\sin C}\\), multiply both sides by \\(\\sin A\\): \\(a = \\frac{c \\sin A}{\\sin C}\\). Each side pairs with the sine of its OPPOSITE angle.",
    {});},
  function(){return mcq("According to the cosine law, \\(c^2\\) equals…",
    "\\(a^2 + b^2 - 2ab\\cos C\\)",
    ["\\(a^2 + b^2 + 2ab\\cos C\\)","\\(a^2 + b^2 - 2ab\\cos A\\)","\\(a^2 - b^2 - 2ab\\cos C\\)"],
    "The cosine law for side \\(c\\) uses the angle BETWEEN sides \\(a\\) and \\(b\\), which is \\(C\\): \\(c^2 = a^2 + b^2 - 2ab\\cos C\\). The sign before the cosine term is minus.",
    {});},
  function(){return mcq("All three sides of a triangle are known. To find angle \\(C\\) first, \\(\\cos C\\) equals…",
    "\\(\\frac{a^2 + b^2 - c^2}{2ab}\\)",
    ["\\(\\frac{c^2 - a^2 - b^2}{2ab}\\)","\\(\\frac{a^2 + c^2 - b^2}{2ac}\\)","\\(\\frac{a^2 + b^2 - c^2}{ab}\\)"],
    "Rearrange \\(c^2 = a^2 + b^2 - 2ab\\cos C\\): move terms to get \\(2ab\\cos C = a^2 + b^2 - c^2\\), then divide by \\(2ab\\). (The second option is the rearrangement for angle \\(B\\), not \\(C\\)).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), the sine law states \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\). According to the sine law, side \\(b\\) equals…",
    "\\(\\frac{a \\sin B}{\\sin A}\\)",
    ["\\(\\frac{a \\sin A}{\\sin B}\\)","\\(\\frac{\\sin B}{a \\sin A}\\)","\\(\\frac{a \\sin C}{\\sin B}\\)"],
    "From \\(\\frac{b}{\\sin B} = \\frac{a}{\\sin A}\\), multiply both sides by \\(\\sin B\\): \\(b = \\frac{a \\sin B}{\\sin A}\\). Side \\(b\\) pairs with angle \\(B\\), and the known pair is \\(a\\) with \\(A\\).",
    {});}
]));
E("u1-smallest-angle",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var s,m,l,tries=0;
  do{
    s=ri(5,14);m=s+ri(1,8);l=m+ri(0,8);tries++;
  }while((s+m<=l||l>30)&&tries<60);
  var A=Math.acos((m*m+l*l-s*s)/(2*m*l))*180/Math.PI;
  var q=numq("A triangle has sides of \\("+s+"\\text{ cm}\\), \\("+m+"\\text{ cm}\\) and \\("+l+"\\text{ cm}\\). Find the measure of the SMALLEST angle, to the nearest degree.",
    Math.round(A),0.51,
    "The smallest angle is opposite the shortest side (\\("+s+"\\text{ cm}\\)). By the cosine law: \\(\\cos A = \\frac{"+m+"^2 + "+l+"^2 - "+s+"^2}{2 \\times "+m+" \\times "+l+"} = "+fmt((m*m+l*l-s*s)/(2*m*l),3)+"\\), so \\(A = \\)<b>\\("+Math.round(A)+"^\\circ\\)</b>. (Finding the angle opposite the longest side instead would give the LARGEST angle.)",
    {s:s,m:m,l:l});
  q.figure=triSVG(s,m,l,{L:["A","B","C"],ang:["?",null,null],side:[s+" cm",m+" cm",l+" cm"]});
  return q;
});
E("u1-angle-between-paths",1,["7.2"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var ctx=pick([["airplane","airport"],["boat","dock"],["airplane","airport"]]);
  var v1=pick([240,280,320,360,400,440,480,520]),v2=pick([240,280,320,360,400,440,480,520].filter(function(x){return x!==v1;}));
  var t=pick([0.5,1,1.5]),d1=v1*t,d2=v2*t;
  var th=ri(35,145);
  var D=Math.round(Math.sqrt(d1*d1+d2*d2-2*d1*d2*Math.cos(rd(th))));
  var ang=Math.acos((d1*d1+d2*d2-D*D)/(2*d1*d2))*180/Math.PI;
  return numq("Two "+ctx[0]+"s leave the same "+ctx[1]+" at the same time. One travels at "+v1+" km/h and the other at "+v2+" km/h, each in a straight line. After "+t+" h they are "+D+" km apart. Find the angle between their paths, to the nearest degree.",
    Math.round(ang),0.51,
    "In \\("+t+"\\text{ h}\\) the "+ctx[0]+"s travel \\("+v1+" \\times "+t+" = "+d1+"\\text{ km}\\) and \\("+v2+" \\times "+t+" = "+d2+"\\text{ km}\\), so the triangle has sides \\("+d1+"\\text{ km}\\), \\("+d2+"\\text{ km}\\) and \\("+D+"\\text{ km}\\). The angle between the paths is at the "+ctx[1]+", opposite the \\("+D+"\\text{ km}\\) side: \\(\\cos\\theta = \\frac{"+d1+"^2 + "+d2+"^2 - "+D+"^2}{2 \\times "+d1+" \\times "+d2+"}\\), giving \\(\\theta = \\)<b>\\("+Math.round(ang)+"^\\circ\\)</b>.",
    {d1:d1,d2:d2,D:D});
});
E("u1-guy-wire",1,["7.3"],2,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var al=ri(42,72),be=ri(42,76),tries=0;
  while(Math.abs(al-be)<6&&tries<40){be=ri(42,76);tries++;}
  var h0=ri(18,55);
  var D=Math.round(h0*(1/Math.tan(rd(al))+1/Math.tan(rd(be)))*10)/10;
  var ssum=Math.sin(rd(al+be));
  var wL=D*Math.sin(rd(be))/ssum,wR=D*Math.sin(rd(al))/ssum;
  var h=wL*Math.sin(rd(al));
  var askWire=Math.random()<0.5;
  var longest=Math.max(wL,wR);
  var q=numq("A radio tower stands vertically between two ground anchors "+fmt(D,1)+" m apart. From the anchor on the left, the angle of elevation to the top of the tower is \\("+al+"^\\circ\\); from the anchor on the right, it is \\("+be+"^\\circ\\). Find "+(askWire?"the length of the LONGER support wire":"the height of the tower")+", to one decimal place, in m.",
    fmt(askWire?longest:h,1),0.06,
    "The two anchors and the tower top form a triangle with base \\("+fmt(D,1)+"\\text{ m}\\) and base angles \\("+al+"^\\circ\\) and \\("+be+"^\\circ\\), so the angle at the top is \\(180^\\circ - "+al+"^\\circ - "+be+"^\\circ = "+(180-al-be)+"^\\circ\\). By the sine law, the wire from the left anchor (opposite the \\("+be+"^\\circ\\) angle) is \\("+fmt(D,1)+" \\times \\frac{\\sin "+be+"^\\circ}{\\sin "+(al+be)+"^\\circ} = "+fmt(wL,1)+"\\text{ m}\\), and the wire from the right anchor is \\("+fmt(wR,1)+"\\text{ m}\\). The height is \\("+fmt(wL,1)+" \\times \\sin "+al+"^\\circ = "+fmt(h,1)+"\\text{ m}\\)."+(askWire?" The longer wire is the one opposite the larger base angle: <b>\\("+fmt(longest,1)+"\\text{ m}\\)</b>.":" So the height is <b>\\("+fmt(h,1)+"\\text{ m}\\)</b>."),
    {D:D,al:al,be:be,askWire:askWire});
  q.figure=triSVG(wR,D,wL,{L:["P","T","Q"],ang:[al+"\u00B0",null,be+"\u00B0"],side:[null,fmt(D,1)+" m",null]});
  return q;
});

/* --- Unit 6: Proportional Reasoning (Payne Ch 8a) --- */
E("u6-pack-cost",6,["6.17"],2,"gen",function(){
  var ctx=pick([
    {item:"bottles of cola",pack:6,use:"fill the store cooler"},
    {item:"juice boxes",pack:8,use:"stock the school canteen"},
    {item:"granola bars",pack:12,use:"pack the hiking kits"},
    {item:"AA batteries",pack:4,use:"supply the science fair"},
    {item:"yogurt cups",pack:10,use:"fill the cafeteria fridge"},
    {item:"muffins",pack:6,use:"stock the bake sale table"}
  ]);
  var price=ri(2,12)+pick([0.25,0.49,0.5,0.75,0.79,0.89,0.99]);
  var need=ri(60,240);
  var packs=Math.ceil(need/ctx.pack);
  var total=packs*price;
  return numq(ctx.item.charAt(0).toUpperCase()+ctx.item.slice(1)+" are sold only in packs of "+ctx.pack+", at $"+fmt(price,2)+" per pack. A manager needs at least "+need+" to "+ctx.use+". What is the total cost, in dollars?",
    fmt(total,2),0.011,
    "Packs needed: \\("+need+" \\div "+ctx.pack+" = "+fmt(need/ctx.pack,2)+"\\), and part-packs cannot be bought, so round UP to \\("+packs+"\\) packs. Total cost: \\("+packs+" \\times \\$"+fmt(price,2)+" = \\)<b>\\(\\$"+fmt(total,2)+"\\)</b>.",
    {pack:ctx.pack,price:price,need:need});
});
E("u6-rate-difference",6,["6.16"],2,"gen",function(){
  var frames=[
    {a:"Maya",b:"Leo",verb:"sent",thing:"text messages",per:"day",unit:"texts",periods:[5,7,10,14,20,28,31],rMin:80,rMax:220},
    {a:"Priya",b:"Owen",verb:"read",thing:"pages",per:"day",unit:"pages",periods:[4,5,6,7,10,14],rMin:25,rMax:90},
    {a:"Sofia",b:"Liam",verb:"swam",thing:"laps",per:"hour",unit:"laps",periods:[2,3,4,5,6,8],rMin:18,rMax:45}
  ];
  var F=pick(frames);
  var r1=ri(F.rMin,F.rMax),diff=ri(8,40),r2=r1+(Math.random()<0.5?diff:-diff),tries=0;
  while((r2<F.rMin||r2>F.rMax)&&tries<40){r2=r1+(Math.random()<0.5?diff:-diff);tries++;}
  var p1=pick(F.periods),p2=pick(F.periods);
  var T1=r1*p1,T2=r2*p2;
  var winA=r1>r2,win=winA?F.a:F.b,lose=winA?F.b:F.a;
  return mcq(F.a+" "+F.verb+" "+T1+" "+F.thing+" in "+p1+" "+F.per+"s. "+F.b+" "+F.verb+" "+T2+" "+F.thing+" in "+p2+" "+F.per+"s. Who has the higher rate, and by how many "+F.unit+" per "+F.per+"?",
    win+", by \\("+diff+"\\) per "+F.per,
    [lose+", by \\("+diff+"\\) per "+F.per,win+", by \\("+(diff+5)+"\\) per "+F.per,lose+", by \\("+(diff+5)+"\\) per "+F.per],
    F.a+"'s rate: \\("+T1+" \\div "+p1+" = "+r1+"\\text{ "+F.unit+" per "+F.per+"}\\). "+F.b+"'s rate: \\("+T2+" \\div "+p2+" = "+r2+"\\text{ "+F.unit+" per "+F.per+"}\\). The higher rate is "+win+"'s, by \\("+Math.max(r1,r2)+" - "+Math.min(r1,r2)+" = \\)<b>\\("+diff+"\\text{ per "+F.per+"}\\)</b>.",
    {r1:r1,r2:r2});
});
E("u6-poster-dimensions",6,["6.14"],2,"gen",function(){
  function trimNum(x){var s=fmt(x,2);if(s.indexOf(".")>=0)s=s.replace(/0+$/,"").replace(/\.$/,"");return s;}
  var w=ri(6,20),h=ri(6,20),k=pick([1.5,2,2.5,3,3.5,4,5]);
  var oldA=w*h,newA=k*k*oldA;
  var key="\\("+trimNum(w*k)+"\\text{ cm by }"+trimNum(h*k)+"\\text{ cm}\\)";
  var cand=[[w*k*k,h*k*k],[h*k,w*k],[w*(k+1),h*(k+1)],[w*k,h],[w,h*k],[w*2*k,h*2*k]],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){var st="\\("+trimNum(cand[i][0])+"\\text{ cm by }"+trimNum(cand[i][1])+"\\text{ cm}\\)";if(st!==key&&ds.indexOf(st)<0)ds.push(st);}
  return mcq("A rectangular crest measuring "+w+" cm by "+h+" cm is enlarged to make a poster with an area of \\("+trimNum(newA)+"\\text{ cm}^2\\). What are the dimensions of the poster?",
    key,ds,
    "The original area is \\("+w+" \\times "+h+" = "+oldA+"\\text{ cm}^2\\). The area scale factor is \\("+trimNum(newA)+" \\div "+oldA+" = "+trimNum(k*k)+"\\), so the LINEAR scale factor is \\(\\sqrt{"+trimNum(k*k)+"} = "+trimNum(k)+"\\). Multiply each dimension by \\("+trimNum(k)+"\\): \\("+w+" \\times "+trimNum(k)+" = "+trimNum(w*k)+"\\text{ cm}\\) and \\("+h+" \\times "+trimNum(k)+" = "+trimNum(h*k)+"\\text{ cm}\\). The poster is <b>"+key+"</b>.",
    {w:w,h:h,k:k});
});
E("u6-tile-cost",6,["6.14","6.17"],2,"gen",function(){
  var frames=[
    {room:"bathroom floor",scale:12,scaleTxt:"1 unit = 12 inches",tile:6,tileTxt:"6 in. by 6 in.",unit:"in."},
    {room:"kitchen floor",scale:12,scaleTxt:"1 unit = 12 inches",tile:12,tileTxt:"12 in. by 12 in.",unit:"in."},
    {room:"patio",scale:30,scaleTxt:"1 unit = 30 cm",tile:15,tileTxt:"15 cm by 15 cm",unit:"cm"},
    {room:"deck",scale:30,scaleTxt:"1 unit = 30 cm",tile:30,tileTxt:"30 cm by 30 cm",unit:"cm"}
  ];
  var F=pick(frames);
  var W=pick([6,8,9,10,12,15]),H=pick([6,8,9,10,12]);
  var realW=W*F.scale,realH=H*F.scale;
  var across=realW/F.tile,along=realH/F.tile,count=across*along;
  var price=pick([0.79,0.99,1.25,1.49,2.29]);
  var total=count*price;
  return numq("A floor plan for a "+F.room+" has a scale of "+F.scaleTxt+". On the plan the room measures "+W+" units by "+H+" units. It will be covered with square tiles measuring "+F.tileTxt+", costing $"+fmt(price,2)+" each. What is the total cost of the tiles, in dollars?",
    fmt(total,2),0.011,
    "Real dimensions: \\("+W+" \\times "+F.scale+" = "+realW+"\\text{ "+F.unit+"}\\) by \\("+H+" \\times "+F.scale+" = "+realH+"\\text{ "+F.unit+"}\\). Tiles along each side: \\("+realW+" \\div "+F.tile+" = "+across+"\\) and \\("+realH+" \\div "+F.tile+" = "+along+"\\), so \\("+across+" \\times "+along+" = "+count+"\\) tiles. Total cost: \\("+count+" \\times \\$"+fmt(price,2)+" = \\)<b>\\(\\$"+fmt(total,2)+"\\)</b>.",
    {W:W,H:H,count:count,price:price});
});

/* --- Unit 7: Reasoning (HHM Ch 1 archive) --- */
E("u7-race-order",7,["2.3"],2,"gen",function(){
  var pools=[["Amara","Devon","Priya","Tom"],["Liam","Sofia","Noah","Emma"],["Kai","Ruth","Omar","Zoe"],["Maya","Eli","Nina","Sam"]];
  var names=pick(pools).slice();
  function perms(a){if(a.length<2)return [a.slice()];var out=[];for(var i=0;i<a.length;i++){var rest=a.slice(0,i).concat(a.slice(i+1));perms(rest).forEach(function(p){out.push([a[i]].concat(p));});}return out;}
  var ALL=perms(names);
  function shuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;}
  var order=null,clues=null,tries=0;
  while(!clues&&tries<40){
    tries++;
    var ord=shuffle(names.slice());
    var cand=[];
    (function(){for(var i=0;i<3;i++){var x=ord[i],y=ord[i+1];cand.push({t:x+" finished immediately ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)===o.indexOf(y)-1;};})(x,y)});}})();
    [[0,2],[0,3],[1,3]].forEach(function(pr){var x=ord[pr[0]],y=ord[pr[1]];cand.push({t:x+" finished ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)<o.indexOf(y);};})(x,y)});});
    [[1,0,3],[2,0,3],[1,0,2],[2,1,3]].forEach(function(tr){var x=ord[tr[0]],y=ord[tr[1]],z=ord[tr[2]];cand.push({t:x+" finished between "+y+" and "+z+".",f:(function(x,y,z){return function(o){var ix=o.indexOf(x);return (o.indexOf(y)<ix&&ix<o.indexOf(z))||(o.indexOf(z)<ix&&ix<o.indexOf(y));};})(x,y,z)});});
    (function(x){cand.push({t:x+" did not finish first.",f:function(o){return o[0]!==x;}});})(ord[1]);
    (function(x){cand.push({t:x+" did not finish last.",f:function(o){return o[3]!==x;}});})(ord[2]);
    for(var a1=0;a1<cand.length&&!clues;a1++)for(var b1=a1+1;b1<cand.length&&!clues;b1++)for(var c1=b1+1;c1<cand.length&&!clues;c1++){
      var set=[cand[a1],cand[b1],cand[c1]];
      var n=ALL.filter(function(o){return set.every(function(c){return c.f(o);});}).length;
      if(n===1){order=ord;clues=set;}
    }
    if(!clues&&tries===40){
      order=ord;
      clues=[0,1,2].map(function(i){var x=ord[i],y=ord[i+1];return {t:x+" finished immediately ahead of "+y+".",f:(function(x,y){return function(o){return o.indexOf(x)===o.indexOf(y)-1;};})(x,y)};});
    }
  }
  var askPos=ri(0,3),ordinals=["first","second","third","fourth"];
  var others=names.filter(function(n){return n!==order[askPos];});
  return mcq("Four runners \u2014 "+names.join(", ")+" \u2014 finished a race in some order. Clues: (1) "+clues[0].t+" (2) "+clues[1].t+" (3) "+clues[2].t+" Who finished "+ordinals[askPos]+"?",
    order[askPos],others,
    "Testing the orders against all three clues, only one order fits: 1st "+order[0]+", 2nd "+order[1]+", 3rd "+order[2]+", 4th "+order[3]+". So "+ordinals[askPos]+" place went to <b>"+order[askPos]+"</b>.",
    {order:order,askPos:askPos,solutions:1});
});
E("u7-everyday-counterexample",7,["2.4"],1,"var",varset([
  function(){return mcq("Conjecture: \u201CAny piece of furniture with four legs is a chair.\u201D Which of the following is a counterexample?",
    "A dining table (a piece of furniture with four legs)",
    ["A chair with four legs and a padded seat at the table","A three-legged stool with a round wooden seat","A bookshelf with no legs, fixed flat against the wall"],
    "A counterexample must satisfy the condition (furniture with four legs) but break the conclusion (not a chair). A dining table does both. The stool and bookshelf never meet the four-leg condition, and the chair is just an example that agrees.",
    {});},
  function(){return mcq("Conjecture: \u201CIf the grass is wet, then it rained last night.\u201D Which of the following is a counterexample?",
    "The grass is wet because the sprinkler ran this morning",
    ["It rained last night and the grass is wet","The grass is dry and it did not rain last night","Rain is in the forecast for tonight, starting after midnight"],
    "A counterexample needs wet grass WITHOUT last night's rain. The sprinkler gives exactly that: the condition (wet grass) holds, but the conclusion (it rained) is false.",
    {});},
  function(){return mcq("Conjecture: \u201CIf something has a knob, then it is a door.\u201D Which of the following is a counterexample?",
    "A stove, which has control knobs",
    ["A door with a round metal knob","A window with no knob at all","A door with a lever handle instead of a knob"],
    "The stove has knobs (condition met) but is not a door (conclusion broken) \u2014 a true counterexample. The lever-handled door never meets the \u201Chas a knob\u201D condition.",
    {});},
  function(){return mcq("Conjecture: \u201CAll students at the school play a sport.\u201D Which of the following is a counterexample?",
    "One student at the school is in the chess club and plays no sport",
    ["Many students at the school play hockey on the school team each winter","One student at the school plays two sports, both hockey and soccer","A teacher at the school plays no sport and coaches no team either"],
    "To disprove \u201Call students,\u201D one student who plays no sport is enough. The teacher is not a student, so that option does not touch the claim.",
    {});}
]));
E("u7-pattern-equation",7,["2.1"],2,"var",varset([
  function(){return mcq("Look at the pattern: \\(37 \\times 3 = 111\\), \\(37 \\times 6 = 222\\), \\(37 \\times 9 = 333\\), \\(37 \\times 12 = 444\\). What is the next equation in the pattern?",
    "\\(37 \\times 15 = 555\\)",
    ["\\(37 \\times 13 = 481\\)","\\(37 \\times 15 = 505\\)","\\(37 \\times 18 = 666\\)"],
    "The multipliers grow by \\(3\\) (\\(3, 6, 9, 12, \\ldots\\)) and the products are \\(111, 222, 333, 444, \\ldots\\). Next multiplier: \\(15\\), and \\(37 \\times 15 = 555\\), continuing the repeated-digit pattern.",
    {});},
  function(){return mcq("Look at the pattern: \\(11^2 = 121\\), \\(111^2 = 12321\\), \\(1111^2 = 1234321\\). What is the next equation in the pattern?",
    "\\(11111^2 = 123454321\\)",
    ["\\(11111^2 = 12344321\\)","\\(1111^2 = 123454321\\)","\\(11111^2 = 12345654321\\)"],
    "Each base gains another digit \\(1\\), and the square counts up to the number of \\(1\\)s and back down: five \\(1\\)s give \\(123454321\\) (up to \\(5\\) and back). The last option counts to \\(6\\), which belongs to the following step, \\(111111^2\\).",
    {});},
  function(){return mcq("Look at the pattern: \\(12345679 \\times 9 = 111{,}111{,}111\\); \\(12345679 \\times 18 = 222{,}222{,}222\\); \\(12345679 \\times 27 = 333{,}333{,}333\\). What is the next equation in the pattern?",
    "\\(12345679 \\times 36 = 444{,}444{,}444\\)",
    ["\\(12345679 \\times 36 = 44{,}444{,}444\\)","\\(12345679 \\times 45 = 444{,}444{,}444\\)","\\(12345679 \\times 36 = 454{,}545{,}454\\)"],
    "The multipliers are multiples of \\(9\\) (\\(9, 18, 27, \\ldots\\)) and each product repeats the digit matching the multiple: \\(36 = 4 \\times 9\\), so the product is nine \\(4\\)s: \\(444{,}444{,}444\\).",
    {});}
]));
E("u7-counterexample-claims",7,["2.4"],1,"var",varset([
  function(){return mcq("Conjecture: \u201CIf a number is divisible by \\(4\\), then it is divisible by \\(8\\).\u201D Which number is a counterexample?",
    "\\(12\\)",
    ["\\(16\\)","\\(24\\)","\\(40\\)"],
    "\\(12\\) is divisible by \\(4\\) (\\(12 \\div 4 = 3\\)) but not by \\(8\\), so it breaks the claim. The other options are all divisible by \\(8\\), so they agree with the claim instead of disproving it.",
    {});},
  function(){return mcq("Conjecture: \u201CThe sum of any two prime numbers is even.\u201D Which calculation is a counterexample?",
    "\\(2 + 3 = 5\\)",
    ["\\(3 + 5 = 8\\)","\\(5 + 7 = 12\\)","\\(7 + 11 = 18\\)"],
    "\\(2\\) and \\(3\\) are both prime, but their sum, \\(5\\), is odd — one counterexample disproves the claim. (\\(2\\) is the only even prime, which is why it is the one that breaks this.) The other pairs all give even sums.",
    {});},
  function(){return mcq("Conjecture: \u201CEvery multiple of \\(5\\) ends in the digit \\(5\\).\u201D Which number is a counterexample?",
    "\\(20\\)",
    ["\\(15\\)","\\(25\\)","\\(12\\)"],
    "\\(20\\) is a multiple of \\(5\\) but ends in \\(0\\), breaking the claim. \\(15\\) and \\(25\\) end in \\(5\\) so they agree; \\(12\\) is not a multiple of \\(5\\) at all, so it cannot test the claim.",
    {});},
  function(){return mcq("Conjecture: \u201CIf \\(x^2 = 16\\), then \\(x = 4\\).\u201D Which value is a counterexample?",
    "\\(x = -4\\)",
    ["\\(x = 4\\)","\\(x = 16\\)","\\(x = -16\\)"],
    "\\((-4)^2 = 16\\), so \\(x = -4\\) meets the condition \\(x^2 = 16\\) but breaks the conclusion \\(x = 4\\). The values \\(16\\) and \\(-16\\) do not satisfy \\(x^2 = 16\\) in the first place.",
    {});},
  function(){return mcq("Conjecture: \u201CThe product of two numbers is always greater than each of the two numbers.\u201D Which calculation is a counterexample?",
    "\\(6 \\times \\frac{1}{2} = 3\\)",
    ["\\(3 \\times 4 = 12\\)","\\(\\frac{3}{2} \\times 2 = 3\\)","\\(10 \\times 1.1 = 11\\)"],
    "\\(6 \\times \\frac{1}{2} = 3\\), and \\(3\\) is NOT greater than \\(6\\), so the claim fails — multiplying by a fraction between \\(0\\) and \\(1\\) shrinks the number. In each other calculation the product is greater than both factors.",
    {});}
]));

/* ============ Tranche 6 (Oct 27): finish-line pass, tranche 1 of 3 ============
   Units 2, 3, 4, 8 +4 each (bank 161 -> 177). Templates reworked from the
   inventoried-but-unbuilt stock (batch5 / QE RHS / HHM families, mapped by
   topic); every item re-created with new numbers and contexts, nothing
   copied verbatim. Fixes level mix: adds a Level 3 for Units 2, 4 and 8
   (Unit 8's first Level 3 entry). */

/* --- Unit 2: Quadratic Functions --- */
E("u2-y-intercept",2,["4.4"],1,"gen",function(){
  var a,b,c,ds,tries=0;
  do{
    a=ri(1,6)*(Math.random()<0.4?-1:1);b=ri(-9,9);c=ri(-12,12);tries++;
    var cand=[b,a,a+b+c,-c,b+c,c+2,c-2];ds=[];
    for(var i=0;i<cand.length&&ds.length<3;i++){var v=String(cand[i]);if(cand[i]!==c&&ds.indexOf(v)<0)ds.push(v);}
  }while((b===0||c===0||ds.length<3)&&tries<80);
  return mcq("What is the y-intercept of the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    "\\("+c+"\\)",ds.map(function(v){return "\\("+v+"\\)";}),
    "The y-intercept is the value of \\(y\\) when \\(x = 0\\). Substituting \\(x = 0\\) leaves only the constant term: \\(y = \\)<b>\\("+c+"\\)</b>.",
    {a:a,b:b,c:c});
});
E("u2-mirror-point",2,["4.13"],2,"gen",function(){
  var h=ri(-6,8),d=ri(1,9),x1=h+(Math.random()<0.5?d:-d),x2=2*h-x1,y=ri(3,45);
  return numq("A parabola has axis of symmetry \\(x = "+h+"\\). The point \\(("+x1+", "+y+")\\) lies on the parabola. Another point on the parabola has the same y-value. What is its x-coordinate?",
    x2,0.011,
    "Points with the same y-value sit symmetrically about the axis \\(x = "+h+"\\). The given point is \\("+Math.abs(x1-h)+"\\) units from the axis, so the mirror point is \\("+Math.abs(x1-h)+"\\) units on the other side: \\(x = "+h+" "+(x2>h?"+":"-")+" "+Math.abs(x2-h)+" = \\)<b>\\("+x2+"\\)</b>. (Check: the axis is the midpoint, \\(\\frac{"+x1+" + "+x2+"}{2} = "+h+"\\).)",
    {h:h,x1:x1,x2:x2,y:y});
});
E("u2-vertex-time",2,["4.2"],2,"gen",function(){
  var k=ri(4,18),B=5*k,C=ri(1,25);
  var ctx=pick(["ball thrown into the air","fountain jet","model rocket","firework shell"]);
  return numq("The height of a "+ctx+" is \\(h(t) = -5t^2 + "+B+"t + "+C+"\\) metres, \\(t\\) seconds after it is launched. At what time does it reach its maximum height, in seconds?",
    k/2,0.011,
    "The maximum occurs at the vertex, where \\(t = \\frac{-B}{2 \\times -5} = \\frac{"+B+"}{10} = \\)<b>\\("+fmt(k/2,1)+"\\text{ s}\\)</b>.",
    {B:B,C:C,k:k,ans:k/2});
});
E("u2-fence-max",2,["4.2"],3,"gen",function(){
  var k=ri(6,20),P=4*k,mode=ri(0,1),area=2*k*k;
  var ctx=pick([["rectangular garden","a house wall"],["rectangular dog pen","a barn wall"],["rectangular patio","an existing fence"],["rectangular chicken run","a shed wall"]]);
  var prompt="A "+ctx[0]+" is built against "+ctx[1]+", so fencing is needed on only three sides. A total of "+P+" m of fencing is available. ";
  if(mode===0)prompt+="What is the greatest area that can be enclosed, in \\(m^2\\)?";
  else prompt+="How wide should it be (each side perpendicular to the wall) to enclose the greatest possible area, in metres?";
  return numq(prompt,mode===0?area:k,0.011,
    "Let the two sides perpendicular to the wall each be \\(x\\) m. The side parallel to the wall is \\("+P+" - 2x\\), so the area is \\(A(x) = x("+P+" - 2x) = -2x^2 + "+P+"x\\). The vertex is at \\(x = \\frac{"+P+"}{4} = "+k+"\\) m, giving a parallel side of \\("+P+" - 2 \\times "+k+" = "+(2*k)+"\\) m and a maximum area of \\("+k+" \\times "+(2*k)+" = \\)<b>\\("+area+"\\text{ m}^2\\)</b>."+(mode===1?" The width at the maximum is <b>\\("+k+"\\text{ m}\\)</b>.":""),
    {P:P,k:k,mode:mode,area:area,width:k});
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-roots-sum-product",3,["4.6"],1,"gen",function(){
  var pool=[-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8];
  var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
  var B=-(r1+r2),C=r1*r2,mode=Math.random()<0.5?"sum":"product";
  var key=mode==="sum"?r1+r2:r1*r2;
  var cand=[B,-B,C,-C,key+1,key-1,key+2,key-2,r1-r2,r2-r1],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){var v=String(cand[i]);if(cand[i]!==key&&ds.indexOf(v)<0)ds.push(v);}
  return mcq("For the equation "+"\\("+quadB(1,B,C)+" = 0\\)"+", what is the "+mode+" of the roots?",
    "\\("+key+"\\)",ds.map(function(v){return "\\("+v+"\\)";}),
    "The equation factors as \\((x "+(r1>0?"- "+r1:"+ "+(-r1))+")(x "+(r2>0?"- "+r2:"+ "+(-r2))+") = 0\\), so the roots are \\("+r1+"\\) and \\("+r2+"\\). Their "+mode+" is \\("+(mode==="sum"?r1+" + "+r2:r1+" \\times "+r2)+" = "+key+"\\). (In general, for \\(x^2 + bx + c\\) the sum of the roots is \\(-b\\) and the product is \\(c\\).)",
    {r1:r1,r2:r2,B:B,C:C,mode:mode,key:key});
});
E("u3-factor-nonmonic",3,["PK.2"],2,"gen",function(){
  function lin(cf,tm){return (cf===1?"x":cf+"x")+(tm>0?" + "+tm:" - "+(-tm));}
  function expand(t){return [t[0]*t[2], t[0]*t[3]+t[1]*t[2], t[1]*t[3]];}
  var p,q,r,s,A,B,C,tries=0;
  do{
    p=ri(1,3);q=ri(1,3);r=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);s=pick([-6,-5,-4,-3,-2,-1,1,2,3,4,5,6]);
    A=p*q;B=p*s+r*q;C=r*s;tries++;
  }while((B===0||A===1)&&tries<80); /* B = 0 is a difference of squares: the sign-flip distractors collapse there (it has its own entry in tranche 7) */
  var key="\\(("+lin(p,r)+")("+lin(q,s)+")\\)";
  var cands=[[p,-r,q,s],[p,r,q,-s],[p,-r,q,-s],[q,r,p,s],[q,-r,p,-s],[p,-s,q,-r]],ds=[];
  for(var i=0;i<cands.length&&ds.length<3;i++){
    var ex=expand(cands[i]);if(ex[0]===A&&ex[1]===B&&ex[2]===C)continue;
    var st="\\(("+lin(cands[i][0],cands[i][1])+")("+lin(cands[i][2],cands[i][3])+")\\)";
    if(st!==key&&ds.indexOf(st)<0)ds.push(st);
  }
  return mcq("Factor fully: "+quadT(A,B,C)+".",
    key,ds,
    "Look for a factor pair whose cross-products add to \\("+B+"\\): \\(("+lin(p,r)+")("+lin(q,s)+")\\) expands to \\("+quadB(A,B,C)+"\\). So the factored form is <b>"+key+"</b>.",
    {p:p,r:r,q:q,s:s,A:A,B:B,C:C});
});
E("u3-standard-coeffs",3,["4.9"],1,"gen",function(){
  var A=ri(2,6),B=ri(-9,9),K=ri(-12,12),tries=0;
  while((B===0||K===0)&&tries<40){B=ri(-9,9);K=ri(-12,12);tries++;}
  var key="\\(a = "+A+", \\; b = "+B+", \\; c = "+(-K)+"\\)";
  var cand=["\\(a = "+A+", \\; b = "+B+", \\; c = "+K+"\\)","\\(a = "+A+", \\; b = "+(-B)+", \\; c = "+(-K)+"\\)","\\(a = "+B+", \\; b = "+A+", \\; c = "+(-K)+"\\)","\\(a = 1, \\; b = "+B+", \\; c = "+(-K)+"\\)"],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("The equation \\("+quadB(A,B,0)+" = "+K+"\\) is to be solved with the quadratic formula. When it is written in standard form \\(ax^2 + bx + c = 0\\), what are a, b and c?",
    key,ds,
    "Move every term to the left: \\("+quadB(A,B,0)+" - ("+K+") = 0\\), that is, \\("+quadB(A,B,-K)+" = 0\\). Reading off the coefficients: <b>"+key+"</b>. The constant changes sign when it crosses the equals sign.",
    {A:A,B:B,K:K});
});
E("u3-two-numbers",3,["4.3"],2,"gen",function(){
  var mode=pick([["consecutive integers",1],["consecutive even integers",2],["consecutive odd integers",2]]);
  var n,step=mode[1];
  if(mode[0].indexOf("even")>=0)n=2*ri(3,20);
  else if(mode[0].indexOf("odd")>=0)n=2*ri(3,20)-1;
  else n=ri(4,30);
  var N=n*(n+step);
  return numq("The product of two positive "+mode[0]+" is "+N+". What is the smaller of the two integers?",
    n,0.011,
    "Let the smaller integer be \\(x\\); the next one is \\(x + "+step+"\\). Then \\[\\begin{aligned} x(x + "+step+") &= "+N+" \\\\ x^2 + "+step+"x - "+N+" &= 0 \\\\ (x - "+n+")(x + "+(n+step)+") &= 0 \\end{aligned}\\] The positive root is \\(x = "+n+"\\) (the other root, \\(-"+(n+step)+"\\), is rejected because the integers are positive). The two integers are \\("+n+"\\) and \\("+(n+step)+"\\), and indeed \\("+n+" \\times "+(n+step)+" = "+N+"\\).",
    {n:n,step:step,N:N,mode:mode[0]});
});

/* --- Unit 4: Radicals --- */
E("u4-evaluate-mixed",4,["1.2"],1,"gen",function(){
  var a=ri(3,15),b=ri(2,9),c=ri(2,12),tries=0;
  while(c>=a+b&&tries<40){c=ri(2,12);tries++;}
  var ans=a+b-c;
  return numq("Evaluate: \\(\\sqrt{"+(a*a)+"} + \\sqrt[3]{"+(b*b*b)+"} - \\sqrt{"+(c*c)+"}\\).",
    ans,0.011,
    "\\(\\sqrt{"+(a*a)+"} = "+a+"\\) because \\("+a+"^2 = "+(a*a)+"\\); \\(\\sqrt[3]{"+(b*b*b)+"} = "+b+"\\) because \\("+b+"^3 = "+(b*b*b)+"\\); \\(\\sqrt{"+(c*c)+"} = "+c+"\\). So the value is \\("+a+" + "+b+" - "+c+"\\) = <b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,ans:ans});
});
E("u4-divide-radicals",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13,14,15]),k=ri(2,6),d0=ri(2,9);
  var A=d0*k*k*m,B=d0;
  var key=radT(k,m);
  var cand=[radT(k+1,m),radT(k,m+1),sqrtT(k*k*m),radT(k*k,m),radT(k,m+2)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\frac{\\sqrt{"+A+"}}{\\sqrt{"+B+"}}\\). Give the answer in simplest radical form.",
    key,ds,
    "Combine under one root, then simplify (\\("+(k*k)+"\\) is a perfect square factor): \\[\\begin{aligned} \\frac{\\sqrt{"+A+"}}{\\sqrt{"+B+"}} &= \\sqrt{\\frac{"+A+"}{"+B+"}} \\\\ &= \\sqrt{"+(k*k*m)+"} \\\\ &= "+k+"\\sqrt{"+m+"} \\end{aligned}\\] In simplest form: <b>"+key+"</b>.",
    {A:A,B:B,k:k,m:m,d0:d0});
});
E("u4-rationalize-coefficient",4,["1.7"],1,"gen",function(){
  function gcd(x,y){while(y){var u=y;y=x%y;x=u;}return x;}
  var c,m,N,tries=0;
  do{c=ri(2,5);m=pick([2,3,5,6,7,10,11,13]);N=ri(2,11);tries++;}while(gcd(N,c*m)!==1&&tries<80);
  var key="\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+(c*m)+"}\\)";
  var cand=["\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+c+"}\\)","\\(\\frac{"+(N*m)+"\\sqrt{"+m+"}}{"+(c*m)+"}\\)","\\(\\frac{"+N+"}{"+(c*m)+"}\\)","\\(\\frac{"+N+"\\sqrt{"+m+"}}{"+(c+m)+"}\\)"],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Rationalize the denominator and simplify: \\(\\frac{"+N+"}{"+c+"\\sqrt{"+m+"}}\\).",
    key,ds,
    "Multiply the numerator and denominator by \\(\\sqrt{"+m+"}\\): the denominator becomes \\("+c+" \\times \\sqrt{"+m+"} \\times \\sqrt{"+m+"} = "+c+" \\times "+m+" = "+(c*m)+"\\), and the numerator becomes \\("+N+"\\sqrt{"+m+"}\\). Since \\("+N+"\\) and \\("+(c*m)+"\\) share no common factor, the simplest form is <b>"+key+"</b>.",
    {N:N,c:c,m:m});
});
E("u4-conjugate-area",4,["1.6"],2,"gen",function(){
  var a=ri(4,12),sq=[],i;
  for(i=2;i<a*a;i++){var rt=Math.sqrt(i);if(rt!==Math.floor(rt))sq.push(i);}
  var b=pick(sq),area=a*a-b;
  var ctx=pick(["rectangular garden","rectangular rug","rectangular solar panel","rectangular patio"]);
  return numq("A "+ctx+" measures \\(("+a+" + \\sqrt{"+b+"})\\) m by \\(("+a+" - \\sqrt{"+b+"})\\) m. What is its area, in \\(m^2\\)?",
    area,0.011,
    "Area = \\(("+a+" + \\sqrt{"+b+"})("+a+" - \\sqrt{"+b+"})\\), a difference of squares: \\("+a+"^2 - (\\sqrt{"+b+"})^2 = "+(a*a)+" - "+b+" = "+area+"\\), so the area is <b>\\("+area+"\\text{ m}^2\\)</b>. The radical terms cancel, which is why conjugate pairs give a whole-number area.",
    {a:a,b:b,area:area});
});

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-diagonals",8,["5.5"],1,"gen",function(){
  var n=ri(5,30),mode=ri(0,1);
  var ans=mode===0?n-3:n*(n-3)/2;
  var ctx=pick(["convex polygon","garden outline drawn as a polygon","polygon-shaped sign","polygon-shaped tile design"]);
  var prompt="A "+ctx+" has "+n+" sides. How many diagonals "+(mode===0?"can be drawn from one vertex":"does it have in total")+"?";
  return numq(prompt,ans,0.011,
    mode===0
      ?"From one vertex, a diagonal cannot go to the vertex itself or to either of its two neighbours, so it can reach the other \\("+n+" - 3\\) vertices: <b>\\("+ans+"\\)</b> diagonals."
      :"Each of the \\("+n+"\\) vertices connects to \\("+n+" - 3\\) others by a diagonal (not itself, not its two neighbours), and each diagonal is counted twice, once from each end: \\("+n+" \\times "+(n-3)+" \\div 2 = \\)<b>\\("+ans+"\\)</b>.",
    {n:n,mode:mode,ans:ans});
});
E("u8-isosceles-angles",8,["5.3"],1,"gen",function(){
  var mode=ri(0,1),base,vertex,ans;
  if(mode===0){base=ri(28,72);vertex=180-2*base;ans=vertex;}
  else{vertex=2*ri(20,65);base=(180-vertex)/2;ans=base;}
  var q=numq(mode===0
      ?"In \\(\\triangle ABC\\), \\(AB = AC\\), so the base is \\(BC\\). The base angles at \\(B\\) and \\(C\\) each measure \\("+base+"^\\circ\\). What is the measure of the vertex angle at \\(A\\), in degrees?"
      :"In \\(\\triangle ABC\\), \\(AB = AC\\), so the base is \\(BC\\). The vertex angle at \\(A\\) measures \\("+vertex+"^\\circ\\). What is the measure of each base angle, in degrees?",
    ans,0.011,
    "The angles of a triangle add to \\(180^\\circ\\), and the base angles of an isosceles triangle are equal. "+(mode===0?"Vertex angle \\(= 180^\\circ - "+base+"^\\circ - "+base+"^\\circ = \\)<b>\\("+vertex+"^\\circ\\)</b>.":"Each base angle \\(= (180^\\circ - "+vertex+"^\\circ) \\div 2 = \\)<b>\\("+base+"^\\circ\\)</b>."),
    {mode:mode,base:base,vertex:vertex,ans:ans});
  q.figure=triAngSVG(vertex,base,base,{ang:mode===0?["?",base+"°",base+"°"]:[vertex+"°","?","?"]});
  return q;
});
E("u8-corresponding-algebra",8,["5.8"],2,"gen",function(){
  function expr(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" − "+(-kn):""));}
  function exprT(cf,kn){return expr(cf,kn).replace(/\u2212/g,"-");}
  var x0,a,c2,V,b,d,tries=0;
  do{
    x0=ri(4,15);a=ri(3,7);c2=ri(1,a-1);V=ri(65,135);
    b=V-a*x0;d=V-c2*x0;tries++;
  }while((b===0||d===0||b<-25||b>35||d<-25||d>35)&&tries<90);
  var q=numq("Two parallel lines are cut by a transversal. Two corresponding angles measure \\(("+exprT(a,b)+")^\\circ\\) and \\(("+exprT(c2,d)+")^\\circ\\). What is the measure of each of these angles, in degrees?",
    V,0.011,
    "Corresponding angles between parallel lines are equal: \\("+exprT(a,b)+" = "+exprT(c2,d)+"\\). Solving gives \\(x = "+x0+"\\). Substituting back: \\("+a+" \\times "+x0+(b>0?" + "+b:" - "+(-b))+" = \\)<b>\\("+V+"^\\circ\\)</b> (the other expression gives the same value, as it must).",
    {a:a,b:b,c:c2,d:d,x0:x0,V:V});
  q.figure=transversalSVG("TR","("+expr(a,b)+")°","BR","?");
  return q;
});
E("u8-correspondence",8,["5.6"],3,"gen",function(){
  var tris=pick([["ABC","DEF"],["PQR","STU"],["XYZ","UVW"],["JKL","MNO"],["FGH","BCD"],["RST","UVW"],["GHJ","KLM"]]);
  var T1=tris[0],T2=tris[1];
  var perm=shuffle([0,1,2]);
  function L2(i){return T2.charAt(perm[i]);}
  var mode=ri(0,1),givens;
  if(mode===0){
    givens="\\("+T1.charAt(0)+T1.charAt(1)+" = "+L2(0)+L2(1)+"\\), \\("+T1.charAt(1)+T1.charAt(2)+" = "+L2(1)+L2(2)+"\\) and \\("+T1.charAt(2)+T1.charAt(0)+" = "+L2(2)+L2(0)+"\\)";
  }else{
    givens="\\("+T1.charAt(0)+T1.charAt(1)+" = "+L2(0)+L2(1)+"\\), \\(\\angle "+T1.charAt(1)+" = \\angle "+L2(1)+"\\) and \\("+T1.charAt(1)+T1.charAt(2)+" = "+L2(1)+L2(2)+"\\)";
  }
  var keyStmt="\\(\\triangle "+T1+" \\cong \\triangle "+L2(0)+L2(1)+L2(2)+"\\)";
  var allPerms=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
  var others=allPerms.filter(function(p){return !(p[0]===perm[0]&&p[1]===perm[1]&&p[2]===perm[2]);});
  var ds=shuffle(others).slice(0,3).map(function(p){return "\\(\\triangle "+T1+" \\cong \\triangle "+T2.charAt(p[0])+T2.charAt(p[1])+T2.charAt(p[2])+"\\)";});
  return mcq("It is given that "+givens+". Which congruence statement matches these givens?",
    keyStmt,ds,
    "Match the vertices through the equal parts: "+T1.charAt(0)+" pairs with "+L2(0)+", "+T1.charAt(1)+" pairs with "+L2(1)+", and "+T1.charAt(2)+" pairs with "+L2(2)+". Writing the second triangle in that corresponding order gives <b>"+keyStmt+"</b>. In a congruence statement, the order of the letters is part of the claim.",
    {perm:perm,mode:mode});
});
E("u8-parallel-x-value",8,["5.9"],3,"gen",function(){
  var p=0,q=0,E=0,a=2,x=0,b=0,tries=0,ok=false;
  while(!ok&&tries<400){tries++;
    p=ri(35,70);q=ri(35,70);E=p+q;a=pick([2,3,4]);x=ri(8,30);
    b=(180-E)-a*x;
    ok=(E>=85&&E<=130&&b>=2&&b<=30);
  }
  return numq("Two lines are cut by a transversal. One co-interior angle is an exterior angle of a triangle, and the two remote interior angles of that triangle measure \\("+p+"^\\circ\\) and \\("+q+"^\\circ\\). The other co-interior angle, on the same side of the transversal, measures \\(("+a+"x + "+b+")^\\circ\\). For what value of \\(x\\) are the two lines parallel?",
    x,0.011,
    "Start with the triangle: an exterior angle equals the sum of the two remote interior angles, so the first co-interior angle measures \\("+p+"^\\circ + "+q+"^\\circ = "+E+"^\\circ\\). Two lines are parallel exactly when co-interior angles are supplementary, so \\("+a+"x + "+b+" = 180 - "+E+" = "+(180-E)+"\\). Then \\("+a+"x = "+(180-E-b)+"\\), giving \\(x = \\)<b>\\("+x+"\\)</b>.",
    {p:p,q:q,a:a,b:b});
});
E("u8-isosceles-exterior",8,["5.3"],3,"gen",function(){
  if(Math.random()<0.5){
    var E=2*ri(50,80);var ans=E/2;
    return numq("In \\(\\triangle ABC\\), \\(AB = AC\\). The exterior angle at \\(A\\) measures \\("+E+"^\\circ\\). What is the measure of \\(\\angle B\\), in degrees?",
      ans,0.011,
      "The interior angle at \\(A\\) is supplementary to the exterior angle: \\(180^\\circ - "+E+"^\\circ = "+(180-E)+"^\\circ\\). Since \\(AB = AC\\), the base angles at \\(B\\) and \\(C\\) are equal, and the interior angles of a triangle sum to \\(180^\\circ\\), so each base angle is \\((180^\\circ - "+(180-E)+"^\\circ) \\div 2 = \\)<b>\\("+ans+"^\\circ\\)</b>.",
      {E:E,mode:0});
  }
  var E2=ri(100,130);var ans2=2*E2-180;
  return numq("In \\(\\triangle ABC\\), \\(AB = AC\\). The exterior angle at \\(B\\) measures \\("+E2+"^\\circ\\). What is the measure of \\(\\angle A\\), in degrees?",
    ans2,0.011,
    "The interior angle at \\(B\\) is \\(180^\\circ - "+E2+"^\\circ = "+(180-E2)+"^\\circ\\). Since \\(AB = AC\\), \\(\\angle C = \\angle B = "+(180-E2)+"^\\circ\\). The interior angles sum to \\(180^\\circ\\), so \\(\\angle A = 180^\\circ - 2 \\times "+(180-E2)+"^\\circ = \\)<b>\\("+ans2+"^\\circ\\)</b>.",
    {E:E2,mode:1});
});
E("u8-regular-sides-from-angle",8,["5.5"],2,"gen",function(){
  var ns=[5,6,8,9,10,12,15,18,20,24,30,36,40,45,60,72,90];var n=pick(ns);var each=(n-2)*180/n;var sum=(n-2)*180;var mode=ri(0,2);
  if(mode===0){
    return numq("Each interior angle of a regular polygon measures \\("+each+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,
      "Work with the exterior angle first: it is \\(180^\\circ - "+each+"^\\circ = "+(180-each)+"^\\circ\\). The exterior angles of a polygon add to \\(360^\\circ\\), so the number of sides is \\(360 \\div "+(180-each)+" = \\)<b>\\("+n+"\\)</b>.",
      {n:n,each:each,sum:sum,mode:mode});
  }
  if(mode===1){
    return numq("The interior angles of a regular polygon add to \\("+sum+"^\\circ\\), and each interior angle measures \\("+each+"^\\circ\\). How many sides does the polygon have?",
      n,0.011,
      "Every interior angle has the same measure, so the number of angles, which equals the number of sides, is \\("+sum+" \\div "+each+" = \\)<b>\\("+n+"\\)</b>. Check: \\(("+n+" - 2) \\times 180^\\circ = "+sum+"^\\circ\\), as given.",
      {n:n,each:each,sum:sum,mode:mode});
  }
  return numq("Each interior angle of a regular polygon measures \\("+each+"^\\circ\\). What is the sum of the interior angles, in degrees?",
    sum,0.011,
    "First find the number of sides from the exterior angle: each exterior angle is \\(180^\\circ - "+each+"^\\circ = "+(180-each)+"^\\circ\\), and exterior angles add to \\(360^\\circ\\), so the polygon has \\(360 \\div "+(180-each)+" = "+n+"\\) sides. The sum of the interior angles is then \\(("+n+" - 2) \\times 180^\\circ = \\)<b>\\("+sum+"^\\circ\\)</b>.",
    {n:n,each:each,sum:sum,mode:mode});
});
E("u8-exterior-algebra",8,["5.11"],3,"gen",function(){
  function linT(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" - "+(-kn):""));}
  function quadT(B,C){var out="x^2";if(B>0)out+=" + "+B+"x";else if(B<0)out+=" - "+(-B)+"x";if(C>0)out+=" + "+C;else if(C<0)out+=" - "+(-C);return out;}
  var v,w,d,p,r,A1,A2,q,s,b,c,E,Ew,R1w,R2w,tries=0;
  do{
    v=ri(4,12);d=ri(6,14);w=v+d;
    p=ri(2,5);r=ri(2,5);A1=ri(35,80);A2=ri(35,80);
    q=A1-p*v;s=A2-r*v;b=(p+r)-(v+w);c=q+s+v*w;E=A1+A2;
    Ew=E+(p+r)*d;R1w=A1+p*d;R2w=A2+r*d;tries++;
  }while((q===0||s===0||Math.abs(q)>45||Math.abs(s)>45||c<20||Ew<=180||Ew>320||R1w>=180||R2w>=180)&&tries<200);
  return numq("In \\(\\triangle ABC\\), the two remote interior angles for the exterior angle at \\(C\\) measure \\(("+linT(p,q)+")^\\circ\\) and \\(("+linT(r,s)+")^\\circ\\). The exterior angle at \\(C\\) measures \\(("+quadT(b,c)+")^\\circ\\). What is the measure of the exterior angle at \\(C\\), in degrees?",
    E,0.011,
    "An exterior angle equals the sum of the two remote interior angles: \\("+quadT(b,c)+" = ("+linT(p,q)+") + ("+linT(r,s)+")\\). Rearranging gives \\("+quadT(-(v+w),v*w)+" = 0\\), which factors as \\((x - "+v+")(x - "+w+") = 0\\), so \\(x = "+v+"\\) or \\(x = "+w+"\\). Try \\(x = "+w+"\\): the exterior angle would be \\("+Ew+"^\\circ\\) \u2014 greater than \\(180^\\circ\\), which no exterior angle of a triangle can be \u2014 so \\(x = "+w+"\\) is extraneous. With \\(x = "+v+"\\), the remote interior angles are \\("+A1+"^\\circ\\) and \\("+A2+"^\\circ\\), and the exterior angle is \\("+A1+" + "+A2+" = \\)<b>\\("+E+"^\\circ\\)</b>.",
    {p:p,q:q,r:r,s:s,b:b,c:c,v:v,w:w,A1:A1,A2:A2,E:E,Ew:Ew});
});

/* ============ Tranche 7 (Oct 27): finish-line pass, tranche 2 of 3 ============
   Unit 2 +4, Unit 3 +4, Unit 4 +4, Unit 8 +3 (bank 177 -> 192). Same
   reworked-template sources as tranche 6, mapped by topic, nothing verbatim.
   Adds a second Level 3 for Unit 8 and another for Unit 2. */

/* --- Unit 2: Quadratic Functions --- */
E("u2-revenue-build",2,["4.2"],3,"gen",function(){
  var fr=null,P=0,N=0,s=0,d=0,tries=0,ok=false,keyS="",d1S="",d2S="",d3S="";
  function R(t){return "\\(R(x) = "+quadB(t[0],t[1],t[2])+"\\)";}
  while(!ok&&tries<400){tries++;
    fr=pick([
      {w:"A community theatre",item:"tickets",each:"ticket"},
      {w:"A gym",item:"day passes",each:"day pass"},
      {w:"A market stall",item:"jars of preserves",each:"jar"}]);
    P=pick([6,8,9,10,12,15]);N=pick([120,150,180,200,240,300,360]);s=pick([0.5,1,1,2]);d=ri(4,25);
    if(s===d)continue;
    var A=-s*d,B=s*N-P*d,C=P*N;
    if(B===0||B-s*d===0)continue;
    keyS=R([A,B,C]);
    d1S=R([A,s*N+P*d,C]);
    d2S=R([A,B,(P+s)*(N-d)]);
    d3S=R([A,d*N-s*P,C]);
    var os=[keyS,d1S,d2S,d3S];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq(fr.w+" sells "+fr.item+" at $"+P+" per "+fr.each+" and normally sells "+N+" of them. The seller estimates that for every $"+fmt(s,1)+" increase in the price, "+d+" fewer will be sold. Let \\(x\\) be the number of $"+fmt(s,1)+" increases. Which function models the revenue, in dollars?",
    keyS,[d1S,d2S,d3S],
    "After \\(x\\) increases, the price is \\("+P+" + "+fmt(s,1)+"x\\) dollars and the number sold is \\("+N+" - "+d+"x\\). Revenue is price times number sold: \\(R(x) = ("+P+" + "+fmt(s,1)+"x)("+N+" - "+d+"x)\\). Expanding gives <b>"+keyS+"</b>.",
    {P:P,N:N,s:s,d:d});
});
E("u2-function-from-vertex-point",2,["4.15","4.16"],3,"gen",function(){
  var a=0,h=0,k=0,side=0,tries=0,ok=false,keyS="",d1S="",d2S="",d3S="",px=0,py=0;
  while(!ok&&tries<400){tries++;
    a=pick([-3,-2,-1,1,2,3]);h=ri(-5,5);k=ri(-8,8);side=pick([-2,2]);
    if(h===0||k===0)continue;
    px=h+side;py=k+a*side*side;
    var B=-2*a*h,C=a*h*h+k,a2=a*side;
    keyS="\\(y = "+quadB(a,B,C)+"\\)";
    d1S="\\(y = "+quadB(a,2*a*h,C)+"\\)";
    d2S="\\(y = "+quadB(a2,-2*a2*h,a2*h*h+k)+"\\)";
    d3S="\\(y = "+quadB(a,B,a*h*h-k)+"\\)";
    var os=[keyS,d1S,d2S,d3S];
    ok=os.filter(function(v,i){return os.indexOf(v)===i;}).length===4;
  }
  return mcq("A parabola has vertex \\(("+h+", "+k+")\\) and passes through the point \\(("+px+", "+py+")\\). Which equation gives the parabola in standard form?",
    keyS,[d1S,d2S,d3S],
    "Start in vertex form and use the point to find \\(a\\): \\("+py+" = a("+side+")^2 + "+k+"\\) gives \\(a = "+a+"\\). So the vertex form is \\(y = "+vertB(a,h,k)+"\\), and expanding it gives <b>"+keyS+"</b>.",
    {a:a,h:h,k:k,px:px,py:py});
});
E("u2-concavity",2,["4.10"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-9,9);tries++;}
  var b=ri(-9,9),c=ri(-12,12),up=a>0;
  var key=up?"It opens upward, and its vertex is a minimum":"It opens downward, and its vertex is a maximum";
  return mcq("Which statement describes the graph of \\(y = "+quadB(a,b,c)+"\\)?",
    key,
    [up?"It opens upward, and its vertex is a maximum":"It opens downward, and its vertex is a minimum",
     up?"It opens downward, and its vertex is a maximum":"It opens upward, and its vertex is a minimum",
     up?"It opens downward, and its vertex is a minimum":"It opens upward, and its vertex is a maximum"],
    "The sign of the \\(x^2\\) coefficient decides the opening: \\(a = "+a+"\\) is "+(up?"positive, so the parabola opens upward and the vertex is the lowest point — a minimum":"negative, so the parabola opens downward and the vertex is the highest point — a maximum")+". The other terms shift the graph but do not change its opening.",
    {a:a,b:b,c:c,up:up});
});
E("u2-vertex-form-eval",2,["4.15"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-4,4);tries++;}
  var h=ri(-6,6),k=ri(-10,10),d=ri(1,5),sgn=Math.random()<0.5?1:-1;
  var x=h+sgn*d,ans=a*d*d+k;
  return numq("A quadratic function is given by \\(f(x) = "+vertB(a,h,k)+"\\). What is \\(f("+x+")\\)?",
    ans,0.011,
    "Substitute \\(x = "+x+"\\): the squared part is \\(("+(h===0?x:x+" "+(h>0?"- "+h:"+ "+(-h)))+")^2 = ("+(sgn*d)+")^2 = "+(d*d)+"\\). So \\(f("+x+") = "+a+" \\times "+(d*d)+(k>0?" + "+k:(k<0?" - "+(-k):""))+" = \\)<b>\\("+ans+"\\)</b>. (The sign of \\("+(sgn*d)+"\\) disappears when it is squared.)",
    {a:a,h:h,k:k,d:d,ans:ans});
});
E("u2-factored-y-intercept",2,["4.4"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-3,3);tries++;}
  var pool=[-6,-5,-4,-3,-2,-1,1,2,3,4,5,6];
  var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
  var ans=a*r1*r2;
  return numq("What is the y-intercept of the graph of \\(f(x) = "+factB(a,r1,r2)+"\\)?",
    ans,0.011,
    "The y-intercept occurs at \\(x = 0\\): \\(f(0) = "+a+" \\times ("+(0-r1)+") \\times ("+(0-r2)+") = "+a+" \\times "+(r1*r2)+" = \\)<b>\\("+ans+"\\)</b>. (The x-intercepts are \\("+r1+"\\) and \\("+r2+"\\); the y-intercept is \\(a\\) times their product.)",
    {a:a,r1:r1,r2:r2,ans:ans});
});
E("u2-max-height",2,["4.2"],2,"gen",function(){
  var k=ri(3,9),B=10*k,C=ri(2,30),max=C+5*k*k;
  var ctx=pick([["ball","kicked"],["stone","thrown"],["water jet","a fountain"],["flare","fired"]]);
  return numq("A "+ctx[0]+" is "+ctx[1]+". Its height is \\(h(t) = -5t^2 + "+B+"t + "+C+"\\) metres, \\(t\\) seconds after it starts. What is the greatest height it reaches, in metres?",
    max,0.011,
    "The vertex is at \\(t = \\frac{"+B+"}{10} = "+k+"\\) s. Substituting: \\(h("+k+") = -5 \\times "+(k*k)+" + "+B+" \\times "+k+" + "+C+" = "+(-5*k*k)+" + "+(B*k)+" + "+C+" = \\)<b>\\("+max+"\\text{ m}\\)</b>.",
    {B:B,C:C,k:k,max:max});
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-formula-substitution",3,["4.9"],1,"var",varset([
  function(){return mcq("To solve \\(x^2 - 5x + 3 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{5 \\pm \\sqrt{25 - 12}}{2}\\)",
    ["\\(x = \\frac{-5 \\pm \\sqrt{25 - 12}}{2}\\)","\\(x = \\frac{5 \\pm \\sqrt{25 + 12}}{2}\\)","\\(x = \\frac{5 \\pm \\sqrt{5 - 12}}{2}\\)"],
    "Here \\(a = 1\\), \\(b = -5\\), \\(c = 3\\). The formula starts with \\(-b = 5\\), and the discriminant is \\(b^2 - 4ac = 25 - 12\\). The denominator is \\(2a = 2\\).",
    {});},
  function(){return mcq("To solve \\(2x^2 + 3x - 4 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{-3 \\pm \\sqrt{9 + 32}}{4}\\)",
    ["\\(x = \\frac{3 \\pm \\sqrt{9 + 32}}{4}\\)","\\(x = \\frac{-3 \\pm \\sqrt{9 - 32}}{4}\\)","\\(x = \\frac{-3 \\pm \\sqrt{9 + 32}}{2}\\)"],
    "Here \\(a = 2\\), \\(b = 3\\), \\(c = -4\\). The formula starts with \\(-b = -3\\), the discriminant is \\(9 - 4(2)(-4) = 9 + 32\\), and the denominator is \\(2a = 4\\).",
    {});},
  function(){return mcq("To solve \\(x^2 + 7x + 2 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{-7 \\pm \\sqrt{49 - 8}}{2}\\)",
    ["\\(x = \\frac{7 \\pm \\sqrt{49 - 8}}{2}\\)","\\(x = \\frac{-7 \\pm \\sqrt{49 + 8}}{2}\\)","\\(x = \\frac{-7 \\pm \\sqrt{7 - 8}}{2}\\)"],
    "Here \\(a = 1\\), \\(b = 7\\), \\(c = 2\\). The formula starts with \\(-b = -7\\), and the discriminant is \\(b^2 - 4ac = 49 - 8\\). The denominator is \\(2a = 2\\).",
    {});},
  function(){return mcq("To solve \\(3x^2 - 4x - 6 = 0\\) with the quadratic formula, which substitution is correct?",
    "\\(x = \\frac{4 \\pm \\sqrt{16 + 72}}{6}\\)",
    ["\\(x = \\frac{-4 \\pm \\sqrt{16 + 72}}{6}\\)","\\(x = \\frac{4 \\pm \\sqrt{16 - 72}}{6}\\)","\\(x = \\frac{4 \\pm \\sqrt{16 + 72}}{3}\\)"],
    "Here \\(a = 3\\), \\(b = -4\\), \\(c = -6\\). The formula starts with \\(-b = 4\\), the discriminant is \\(16 - 4(3)(-6) = 16 + 72\\), and the denominator is \\(2a = 6\\).",
    {});}
]));
E("u3-factor-difference",3,["PK.2"],1,"gen",function(){
  var a=ri(1,5),k=ri(2,15),ax=a===1?"x":a+"x";
  var key="\\(("+ax+" - "+k+")("+ax+" + "+k+")\\)";
  return mcq("Factor fully: \\("+(a===1?"x^2":(a*a)+"x^2")+" - "+(k*k)+"\\)",
    key,
    ["\\(("+ax+" + "+k+")("+ax+" + "+k+")\\)","\\(("+ax+" - "+k+")("+ax+" - "+k+")\\)","\\(("+ax+" - "+(k*k)+")("+ax+" + "+(k*k)+")\\)"],
    "This is a difference of squares: \\("+(a===1?"x^2":(a*a)+"x^2")+"\\) is \\(("+ax+")^2\\) and \\("+(k*k)+"\\) is \\("+k+"^2\\). A difference of squares factors as (first - second)(first + second): <b>"+key+"</b>.",
    {a:a,k:k});
});
E("u3-discriminant-nature",3,["4.7"],2,"gen",function(){
  var mode=ri(0,2),a,b,c,D;
  if(mode===0){
    var pool=[-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7];
    var r1=pick(pool),r2=pick(pool.filter(function(x){return x!==r1;}));
    a=1;b=-(r1+r2);c=r1*r2;
  }else if(mode===1){
    var m=ri(2,5),af=pick([1,4]);a=af;b=2*m*Math.sqrt(af);c=m*m;
  }else{
    a=1;b=ri(-4,4);c=Math.floor(b*b/4)+ri(1,6);
  }
  D=b*b-4*a*c;
  var nature=mode===0?"two different real roots":(mode===1?"one repeated real root":"no real roots");
  var key="\\(D = "+D+"\\); "+nature;
  var others=["two different real roots","one repeated real root","no real roots"].filter(function(x){return x!==nature;});
  var wrongD=D===0?4:-D;
  return mcq("For the equation "+"\\("+quadB(a,b,c)+" = 0\\)"+", what is the discriminant, and what does it say about the roots?",
    key,
    ["\\(D = "+D+"\\); "+others[0],"\\(D = "+D+"\\); "+others[1],"\\(D = "+wrongD+"\\); "+nature],
    "\\(D = b^2 - 4ac = ("+b+")^2 - 4 \\times "+a+" \\times "+c+" = "+(b*b)+" - "+(4*a*c)+" = "+D+"\\). "+(mode===0?"Since \\(D > 0\\), the equation has two different real roots.":(mode===1?"Since \\(D = 0\\), the equation has one repeated real root.":"Since \\(D < 0\\), the equation has no real roots (its graph never crosses the x-axis).")),
    {a:a,b:b,c:c,D:D,mode:mode});
});
E("u3-root-difference",3,["4.6"],3,"gen",function(){
  var r=ri(2,12),d=ri(1,8),S=2*r+d,K=r*(r+d);
  var frame=pick([
    "The roots of \\(x^2 - "+S+"x + k = 0\\) differ by "+d+". What is the value of \\(k\\)?",
    "A quadratic equation \\(x^2 - "+S+"x + k = 0\\) has two roots, and the larger root is "+d+" more than the smaller root. What is the value of \\(k\\)?"
  ]);
  return numq(frame,K,0.011,
    "For \\(x^2 - Sx + k\\), the sum of the roots is \\(S = "+S+"\\) and the product is \\(k\\). If the roots differ by "+d+", they are \\(("+S+" - "+d+") \\div 2 = "+r+"\\) and \\("+r+" + "+d+" = "+(r+d)+"\\). So \\(k = "+r+" \\times "+(r+d)+" = "+K+"\\).",
    {r:r,d:d,S:S,K:K});
});

/* --- Unit 4: Radicals --- */
E("u4-entire-cube",4,["1.1"],1,"gen",function(){
  var a=ri(2,6),b=pick([2,3,4,5,6,7,9,10,11,13,14,15,18,20]);
  var key=cbrtT(a*a*a*b);
  return mcq("Express "+rad3T(a,b)+" as an entire radical.",
    key,
    [cbrtT(a*b),cbrtT(a*a*b),cbrtT((a+1)*(a+1)*(a+1)*b)],
    "The coefficient must be cubed to move under a cube root: \\("+a+" = \\sqrt[3]{"+(a*a*a)+"}\\). So \\[\\begin{aligned} "+a+"\\sqrt[3]{"+b+"} &= \\sqrt[3]{"+(a*a*a)+" \\times "+b+"} \\\\ &= \\sqrt[3]{"+(a*a*a*b)+"} \\end{aligned}\\] (Squaring the coefficient would be right for a square root, not a cube root.)",
    {a:a,b:b});
});
E("u4-product-simplify",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(2,6),b=ri(2,6),mode=ri(0,1);
  var A=a*a*m,B=mode===0?b*b:b*b*m;
  var key,ds;
  if(mode===0){
    key=radT(a*b,m);
    var cand=[radT(a+b,m),sqrtT(A*B),radT(a*b,m+1),radT(a*b+1,m)];ds=[];
    for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  }else{
    key="\\("+(a*b*m)+"\\)";
    var cand2=["\\("+(a*b)+"\\)","\\("+((a+b)*m)+"\\)","\\("+(a*b*m+m)+"\\)",radT(a*b,m)];ds=[];
    for(var i2=0;i2<cand2.length&&ds.length<3;i2++){if(cand2[i2]!==key&&ds.indexOf(cand2[i2])<0)ds.push(cand2[i2]);}
  }
  return mcq("Simplify: \\(\\sqrt{"+A+"} \\times \\sqrt{"+B+"}\\). Give the answer in simplest form.",
    key,ds,
    "Simplify each radical first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+(mode===0?"\\("+b+"\\)":radT(b,m))+". Multiplying: "+(mode===0?"\\("+a+" \\times "+b+" = "+(a*b)+"\\), giving <b>"+key+"</b>.":"\\("+a+" \\times "+b+" \\times "+m+"\\) because \\(\\sqrt{"+m+"} \\times \\sqrt{"+m+"} = "+m+"\\), giving <b>"+key+"</b>."),
    {a:a,b:b,m:m,mode:mode,A:A,B:B});
});
E("u4-add-unlike",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(1,6),b=ri(1,6),tries=0;
  while(b===a&&tries<40){b=ri(1,6);tries++;}
  var A=a*a*m,B=b*b*m,key=radT(a+b,m);
  var cand=[sqrtT(A+B),radT(a*b,m),radT(a+b+1,m),radT(Math.abs(a-b),m)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\sqrt{"+A+"} + \\sqrt{"+B+"}\\). Give the answer in simplest radical form.",
    key,ds,
    "Simplify each term first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+radT(b,m)+". They are like radicals, so add the coefficients: \\("+a+" + "+b+" = "+(a+b)+"\\), giving <b>"+key+"</b>. (The numbers under the roots are never added together.)",
    {a:a,b:b,m:m,A:A,B:B});
});
E("u4-diagonal-radical",4,["1.6"],2,"gen",function(){
  var s=ri(2,6),m=pick([2,3,5,6,7,10]);
  var r0=2*m,t=1,f;for(f=2;f*f<=r0;f++){while(r0%(f*f)===0){r0/=(f*f);t*=f;}}
  var key=r0===1?"\\("+(s*t)+"\\)":radT(s*t,r0);
  var cand=[radT(s,m),radT(2*s,m),sqrtT(2*s*s*m),r0===1?"\\("+(2*s*t)+"\\)":radT(s*t+1,r0)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  var ctx=pick(["square tile","square panel","square garden plot","square poster"]);
  return mcq("A "+ctx+" has side length "+radT(s,m)+" m. What is the length of its diagonal, in simplest radical form?",
    key,ds,
    "By Pythagoras, the diagonal is \\(\\sqrt{2}\\) times the side: \\("+s+"\\sqrt{"+m+"} \\times \\sqrt{2} = "+s+"\\sqrt{"+(2*m)+"}\\). Simplifying \\(\\sqrt{"+(2*m)+"} = "+(r0===1?(""+t):(t===1?"\\sqrt{"+r0+"}":t+"\\sqrt{"+r0+"}"))+"\\) gives the diagonal as <b>"+key+"</b> m.",
    {s:s,m:m,t:t,r0:r0});
});

/* --- Unit 8: Properties of Angles and Triangles --- */
E("u8-cointerior-algebra",8,["5.8"],2,"gen",function(){
  function expr(cf,kn){return cf+"x"+(kn>0?" + "+kn:(kn<0?" − "+(-kn):""));}
  function exprT(cf,kn){return expr(cf,kn).replace(/\u2212/g,"-");}
  var x0,a,b,c2,d,V1,V2,tries=0;
  do{
    x0=ri(4,14);V1=ri(70,120);V2=180-V1;
    a=ri(2,6);b=V1-a*x0;c2=ri(2,6);d=V2-c2*x0;tries++;
  }while((b===0||d===0||b<-25||b>35||d<-25||d>35)&&tries<90);
  var mode=ri(0,1),ans=mode===0?V1:V2;
  var q=numq("Two parallel lines are cut by a transversal. Two co-interior angles measure \\(("+exprT(a,b)+")^\\circ\\) and \\(("+exprT(c2,d)+")^\\circ\\). What is the measure of the "+(mode===0?"first":"second")+" of these angles, in degrees?",
    ans,0.011,
    "Co-interior angles between parallel lines are supplementary: \\(("+exprT(a,b)+") + ("+exprT(c2,d)+") = 180\\). Solving gives \\(x = "+x0+"\\). The first angle is \\("+a+" \\times "+x0+(b>0?" + "+b:" - "+(-b))+" = "+V1+"^\\circ\\) and the second is \\("+V2+"^\\circ\\), so the angle asked for is <b>\\("+ans+"^\\circ\\)</b>.",
    {a:a,b:b,c:c2,d:d,x0:x0,V1:V1,V2:V2,mode:mode,ans:ans});
  q.figure=transversalSVG("TR","("+expr(a,b)+")°","BR","?");
  return q;
});
E("u8-congruence-perimeter",8,["5.6"],2,"gen",function(){
  var s=ri(6,16),s2=ri(5,16),s3,tries=0;
  do{s3=ri(5,18);tries++;}while((s3>=s+s2||s3<=Math.abs(s-s2))&&tries<60);
  var a=ri(2,5),x0=ri(3,12),b,safe=0;
  do{b=s-a*x0;safe++;if(b===0||b<-15||b>25){x0=ri(3,12);}}while((b===0||b<-15||b>25)&&safe<60);
  var P=s+s2+s3,mode=0,ans=mode===0?x0:P;
  return numq("\\(\\triangle ABC \\cong \\triangle DEF\\), with the vertices in corresponding order. \\(AB = "+s+"\\text{ cm}\\), \\(BC = "+s2+"\\text{ cm}\\) and \\(CA = "+s3+"\\text{ cm}\\). Side \\(DE\\) measures \\(("+a+"x "+(b>0?"+ "+b:"- "+(-b))+")\\text{ cm}\\). "+(mode===0?"What is the value of \\(x\\)?":"What is the perimeter of \\(\\triangle DEF\\), in cm?"),
    ans,0.011,
    "Corresponding vertices match in order, so side \\(DE\\) corresponds to side \\(AB\\): \\("+a+"x "+(b>0?"+ "+b:"- "+(-b))+" = "+s+"\\), giving \\(x = "+x0+"\\). Congruent triangles have the same perimeter: \\("+s+" + "+s2+" + "+s3+" = "+P+"\\text{ cm}\\)."+(mode===0?" So \\(x = \\)<b>\\("+x0+"\\)</b>.":" So the perimeter of \\(\\triangle DEF\\) is <b>\\("+P+"\\text{ cm}\\)</b>."),
    {s:s,s2:s2,s3:s3,a:a,b:b,x0:x0,P:P,mode:mode,ans:ans});
});
E("u8-congruent-perimeter",8,["5.6"],1,"gen",function(){
  var s=ri(6,16),s2=ri(5,16),s3,tries=0;
  do{s3=ri(5,18);tries++;}while((s3>=s+s2||s3<=Math.abs(s-s2))&&tries<60);
  var a=ri(2,5),x0=ri(3,12),b,safe=0;
  do{b=s-a*x0;safe++;if(b===0||b<-15||b>25){x0=ri(3,12);}}while((b===0||b<-15||b>25)&&safe<60);
  var P=s+s2+s3,mode=1,ans=mode===0?x0:P;
  return numq("\\(\\triangle ABC \\cong \\triangle DEF\\), with the vertices in corresponding order. \\(AB = "+s+"\\text{ cm}\\), \\(BC = "+s2+"\\text{ cm}\\) and \\(CA = "+s3+"\\text{ cm}\\). Side \\(DE\\) measures \\(("+a+"x "+(b>0?"+ "+b:"- "+(-b))+")\\text{ cm}\\). "+(mode===0?"What is the value of \\(x\\)?":"What is the perimeter of \\(\\triangle DEF\\), in cm?"),
    ans,0.011,
    "Corresponding vertices match in order, so side \\(DE\\) corresponds to side \\(AB\\): \\("+a+"x "+(b>0?"+ "+b:"- "+(-b))+" = "+s+"\\), giving \\(x = "+x0+"\\). Congruent triangles have the same perimeter: \\("+s+" + "+s2+" + "+s3+" = "+P+"\\text{ cm}\\)."+(mode===0?" So \\(x = \\)<b>\\("+x0+"\\)</b>.":" So the perimeter of \\(\\triangle DEF\\) is <b>\\("+P+"\\text{ cm}\\)</b>."),
    {s:s,s2:s2,s3:s3,a:a,b:b,x0:x0,P:P,mode:mode,ans:ans});
});
E("u8-angle-chase",8,["5.8"],2,"var",varset([
  function(){return mcq("Two parallel lines are cut by a transversal. \\(\\angle x\\) forms a co-interior pair with a \\(64^\\circ\\) angle. \\(\\angle y\\) is vertically opposite \\(\\angle x\\). \\(\\angle z\\) is a corresponding angle to \\(\\angle y\\). What is the measure of \\(\\angle z\\)?",
    "\\(116^\\circ\\)",
    ["\\(64^\\circ\\)","\\(128^\\circ\\)","\\(90^\\circ\\)"],
    "Co-interior angles are supplementary: \\(\\angle x = 180^\\circ - 64^\\circ = 116^\\circ\\). Vertically opposite angles are equal: \\(\\angle y = 116^\\circ\\). Corresponding angles are equal: \\(\\angle z = 116^\\circ\\).",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 52^\\circ\\) and \\(\\angle B = 68^\\circ\\). \\(\\angle e\\) is the exterior angle at \\(C\\). \\(\\angle f\\) forms a co-interior pair with \\(\\angle e\\) where a transversal cuts two parallel lines. \\(\\angle g\\) is vertically opposite \\(\\angle f\\). What is the measure of \\(\\angle g\\)?",
    "\\(60^\\circ\\)",
    ["\\(120^\\circ\\)","\\(68^\\circ\\)","\\(180^\\circ\\)"],
    "The exterior angle equals the sum of the remote interiors: \\(\\angle e = 52^\\circ + 68^\\circ = 120^\\circ\\). Co-interior angles are supplementary: \\(\\angle f = 180^\\circ - 120^\\circ = 60^\\circ\\). Vertically opposite angles are equal: \\(\\angle g = 60^\\circ\\).",
    {});},
  function(){return mcq("In an isosceles triangle the vertex angle measures \\(38^\\circ\\). \\(\\angle b\\) is one of the base angles. \\(\\angle h\\) is the exterior angle at that same base vertex. A second diagram shows \\(\\angle j\\) as an alternate interior angle equal to \\(\\angle h\\) (the lines are parallel). What is the measure of \\(\\angle j\\)?",
    "\\(109^\\circ\\)",
    ["\\(71^\\circ\\)","\\(38^\\circ\\)","\\(142^\\circ\\)"],
    "Base angle: \\(\\angle b = (180^\\circ - 38^\\circ) \\div 2 = 71^\\circ\\). Exterior angle on a straight line: \\(\\angle h = 180^\\circ - 71^\\circ = 109^\\circ\\). Alternate interior angles between parallel lines are equal: \\(\\angle j = 109^\\circ\\).",
    {});},
  function(){return mcq("Each interior angle of a regular pentagon measures \\(108^\\circ\\). In a triangle drawn beside the pentagon, one angle is supplementary to \\(108^\\circ\\) and a second angle measures \\(47^\\circ\\). What is the measure of the triangle's third angle?",
    "\\(61^\\circ\\)",
    ["\\(72^\\circ\\)","\\(108^\\circ\\)","\\(119^\\circ\\)"],
    "The supplementary angle is \\(180^\\circ - 108^\\circ = 72^\\circ\\). The triangle's angles add to \\(180^\\circ\\): \\(180^\\circ - 72^\\circ - 47^\\circ = 61^\\circ\\).",
    {});}
]));

/* ============ Tranche 8 (Oct 27): finish-line pass, tranche 3 of 3 ============
   Unit 1 +2, Unit 2 +3, Unit 3 +3, Unit 4 +3, Unit 6 +1, Unit 7 +2
   (bank 192 -> 206, the finish line). Same reworked-template sources as
   tranches 6-7, mapped by topic, nothing verbatim. Unit 5 stays deep and
   untouched at 47; the other seven units land in outline proportion with
   each other: U1 16, U2 28, U3 28, U4 31, U6 17, U7 17, U8 22. */

/* --- Unit 1: Acute Triangle Trigonometry --- */
E("u1-ambiguous-count",1,["7.2"],3,"var",varset([
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 40^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "No triangle is possible",
    ["Exactly one triangle (a right triangle)","Exactly one triangle","Two different triangles are possible"],
    "Compare \\(a\\) with the height \\(h = b\\sin A = 10 \\times \\sin 40^\\circ \\approx 6.43\\text{ cm}\\). Since \\(a = 5\\text{ cm}\\) is SHORTER than \\(6.43\\text{ cm}\\), side \\(a\\) cannot reach the base line at all — no triangle closes.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 30^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 5\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Exactly one triangle (a right triangle)",
    ["No triangle is possible from these lengths","Exactly one triangle","Two different triangles fit this data"],
    "The height is \\(h = b\\sin A = 10 \\times \\sin 30^\\circ = 5\\text{ cm}\\). Side \\(a\\) equals \\(h\\) exactly, so side \\(a\\) just reaches the base at a right angle — exactly one triangle, and it is right-angled.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 40^\\circ\\), side \\(b = 10\\text{ cm}\\) and side \\(a = 8\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Two different triangles",
    ["No triangle is possible from these lengths","Exactly one triangle (a right triangle)","Exactly one triangle"],
    "The height is \\(h = 10 \\times \\sin 40^\\circ \\approx 6.43\\text{ cm}\\). Side \\(a = 8\\text{ cm}\\) is longer than \\(h\\) but shorter than \\(b = 10\\text{ cm}\\), so it can swing to two different positions on the base — the ambiguous case gives two different triangles.",
    {});},
  function(){return mcq("In \\(\\triangle ABC\\), \\(\\angle A = 50^\\circ\\), side \\(b = 9\\text{ cm}\\) and side \\(a = 11\\text{ cm}\\) (\\(a\\) is opposite \\(\\angle A\\)). How many different triangles fit this information?",
    "Exactly one triangle",
    ["No triangle is possible in this case","Exactly one triangle (a right triangle)","Two triangles in all"],
    "Side \\(a = 11\\text{ cm}\\) is longer than side \\(b = 9\\text{ cm}\\), so it can only land in one position past the foot of the height — exactly one triangle. (Two triangles need \\(h < a < b\\).)",
    {});}
]));
E("u1-median-length",1,["7.3"],3,"gen",function(){
  function rd(d){return d*Math.PI/180;}
  var p=ri(6,20),q=ri(6,20),A=ri(35,130);
  var a2=p*p+q*q-2*p*q*Math.cos(rd(A)),a=Math.sqrt(a2);
  var m=0.5*Math.sqrt(p*p+q*q+2*p*q*Math.cos(rd(A)));
  var ctx=pick(["triangular lot","triangular field","triangular garden plot"]);
  var qq=numq("A "+ctx+" has two sides of "+p+" m and "+q+" m meeting at a corner with an angle of \\("+A+"^\\circ\\) between them. A path runs from that corner to the midpoint of the opposite side. How long is the path, to one decimal place, in metres?",
    fmt(m,1),0.06,
    "First find the opposite side with the cosine law: \\(a^2 = "+p+"^2 + "+q+"^2 - 2 \\times "+p+" \\times "+q+" \\times \\cos "+A+"^\\circ = "+fmt(a2,1)+"\\), so \\(a \\approx "+fmt(a,1)+"\\text{ m}\\). Then the median to that side (Apollonius's rule, from applying the cosine law in the two half-triangles) is \\(m = \\frac{1}{2}\\sqrt{"+p+"^2 + "+q+"^2 + 2 \\times "+p+" \\times "+q+" \\times \\cos "+A+"^\\circ} = \\frac{1}{2}\\sqrt{"+fmt(p*p+q*q+2*p*q*Math.cos(rd(A)),1)+"} \\approx \\)<b>\\("+fmt(m,1)+"\\text{ m}\\)</b>.",
    {p:p,q:q,A:A,m:m});
  qq.figure=triSVG(a,q,p,{L:["A","B","C"],ang:[A+"°",null,null],side:[fmt(a,1)+" m",q+" m",p+" m"]});
  return qq;
});

/* --- Unit 2: Quadratic Functions --- */
E("u2-evaluate-f",2,["4.1"],1,"gen",function(){
  var a=0,tries=0;while(a===0&&tries<40){a=ri(-4,4);tries++;}
  var b=ri(-9,9),c=ri(-12,12),d=ri(-5,5),ans=a*d*d+b*d+c;
  return numq("For \\(f(x) = "+quadB(a,b,c)+"\\), what is \\(f("+d+")\\)?",
    ans,0.011,
    "Substitute \\(x = "+d+"\\): \\(f("+d+") = "+a+" \\times ("+d+")^2 + ("+b+") \\times ("+d+") + ("+c+") = "+(a*d*d)+" + "+(b*d)+" + "+c+" = \\)<b>\\("+ans+"\\)</b>.",
    {a:a,b:b,c:c,d:d,ans:ans});
});
E("u2-vertex-shift",2,["4.15"],1,"gen",function(){
  var a=0,h=0,k=0,tries=0;
  while((a===0||h===0||k===0)&&tries<60){a=ri(-5,5);h=ri(-7,7);k=ri(-9,9);tries++;}
  var open=a>0?"upward":"downward";
  function vt(x,y){return "\\(("+x+", "+y+")\\)";}
  var key=vt(h,k)+"; opens "+open;
  return mcq("What is the vertex of \\(y = "+vertB(a,h,k)+"\\), and which way does the graph open?",
    key,
    [vt(-h,k)+"; opens "+open,vt(h,-k)+"; opens "+open,vt(-h,-k)+"; opens "+open],
    "In \\(y = a(x - h)^2 + k\\) the vertex is \\((h, k)\\). Here the squared part is \\((x "+(h>0?"- "+h:"+ "+(-h))+")\\), so \\(h = "+h+"\\) (the sign flips from how it appears), and \\(k = "+k+"\\). Since \\(a = "+a+"\\) is "+(a>0?"positive":"negative")+", the graph opens "+open+". The vertex is <b>"+key+"</b>.",
    {a:a,h:h,k:k});
});
E("u2-factored-max-height",2,["4.2"],2,"gen",function(){
  var a=pick([2,3,4,5]),r1=ri(3,14),r2=ri(1,8);if(r2>=r1)r2=r1-1;
  var S=r1+r2,max=a*S*S/4,tstar=(r1-r2)/2;
  return numq("A projectile's height is modelled by \\(h(t) = -"+a+"(t - "+r1+")(t + "+r2+")\\) metres, \\(t\\) seconds after launch. What is the greatest height it reaches? Give the exact value, in metres.",
    max,0.011,
    "The height is zero at \\(t = "+r1+"\\) and (before launch) at \\(t = -"+r2+"\\); the vertex sits midway between the roots, at \\(t = \\frac{"+r1+" - "+r2+"}{2} = "+fmt(tstar,1)+"\\) s. Substituting: \\(h("+fmt(tstar,1)+") = -"+a+" \\times ("+fmt(tstar-r1,1)+") \\times ("+fmt(tstar+r2,1)+") = \\)<b>\\("+fmt(max,2)+"\\text{ m}\\)</b>.",
    {a:a,r1:r1,r2:r2,S:S,max:max});
});

/* --- Unit 3: Quadratic Equations --- */
E("u3-formula-exact-roots",3,["4.9"],2,"gen",function(){
  function gcd(x,y){x=Math.abs(x);y=Math.abs(y);while(y){var u=y;y=x%y;x=u;}return x||1;}
  function fmtRoot(num,coef,rad,den){var body=num+" \\pm "+(coef===1?"":coef)+"\\sqrt{"+rad+"}";return den===1?("\\("+body+"\\)"):("\\(\\frac{"+body+"}{"+den+"}\\)");}
  var a,b,c,D,t,Dp,g,tries=0;
  do{
    a=pick([1,2]);b=ri(-9,9);c=ri(-8,8);
    D=b*b-4*a*c;t=1;Dp=D;
    for(var f=2;f*f<=Dp;f++){while(Dp%(f*f)===0){Dp/=(f*f);t*=f;}}
    tries++;
  }while((b===0||D<=0||Dp<=1)&&tries<90);
  /* require b != 0, D > 0 and D not a perfect square (Dp > 1 after extraction);
     the fallback below satisfies all three (D = 37) if the loop ever exhausts */
  if(b===0||D<=0||Dp<=1){a=1;b=-5;c=-3;D=b*b-4*a*c;t=1;Dp=D;for(var f2=2;f2*f2<=Dp;f2++){while(Dp%(f2*f2)===0){Dp/=(f2*f2);t*=f2;}}}
  g=gcd(gcd(b,t),2*a);
  var num=-b/g,coef=t/g,den=2*a/g;
  var key=fmtRoot(num,coef,Dp,den);
  var cand=[fmtRoot(b/g,coef,Dp,den),fmtRoot(num,1,D,2*a),fmtRoot(num,coef,Dp,a),fmtRoot(num,coef+1,Dp,den),fmtRoot(num+1,coef,Dp,den)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Solve "+"\\("+quadB(a,b,c)+" = 0\\)"+". Which option gives the roots in simplest exact form?",
    key,ds,
    "\\[\\begin{aligned} x &= \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\\\ &= \\frac{"+(-b)+" \\pm \\sqrt{"+D+"}}{"+(2*a)+"} \\end{aligned}\\] "+(t>1?"Since \\(\\sqrt{"+D+"} = "+t+"\\sqrt{"+Dp+"}\\), ":"Since \\(\\sqrt{"+D+"}\\) does not simplify, ")+(g>1?"and the whole fraction divides by \\("+g+"\\), ":"")+"the simplest exact form is <b>"+key+"</b>.",
    {a:a,b:b,c:c,D:D,t:t,Dp:Dp,num:num,coef:coef,den:den});
});
E("u3-squares-area",3,["4.3"],2,"gen",function(){
  var s=ri(3,14),m=ri(1,6),T=s*s+(s+m)*(s+m);
  var ctx=pick([["two square garden plots","plot"],["two square patios","patio"],["two square quilts","quilt"]]);
  return numq("A gardener has "+ctx[0]+". The side of the larger "+ctx[1]+" is "+m+" m longer than the side of the smaller one, and their areas add to \\("+T+"\\text{ m}^2\\). What is the side length of the smaller "+ctx[1]+", in metres?",
    s,0.011,
    "Let the smaller side be \\(s\\); the larger is \\(s + "+m+"\\). Then \\(s^2 + (s + "+m+")^2 = "+T+"\\). A shortcut: \\((2s + "+m+")^2 = 2 \\times "+T+" - "+(m*m)+" = "+(2*T-m*m)+"\\), so \\(2s + "+m+" = "+(2*s+m)+"\\) and \\(s = "+s+"\\) m. (Check: \\("+s+"^2 + "+(s+m)+"^2 = "+(s*s)+" + "+((s+m)*(s+m))+" = "+T+"\\).)",
    {s:s,m:m,T:T});
});
E("u3-number-pair",3,["4.6"],2,"gen",function(){
  var u=ri(-6,10),v=u+ri(1,9),S=u+v,P=u*v;
  return numq("Two numbers add to "+S+" and multiply to "+P+". What is the larger of the two numbers?",
    v,0.011,
    "The numbers are the roots of \\(x^2 - ("+S+")x + ("+P+") = 0\\), which factors as \\("+(u>=0?"(x - "+u+")":"(x + "+(-u)+")")+(v>=0?"(x - "+v+")":"(x + "+(-v)+")")+" = 0\\). The roots are \\("+u+"\\) and \\("+v+"\\), so the larger number is <b>\\("+v+"\\)</b>. (Check: \\("+u+" + "+v+" = "+S+"\\) and \\("+u+" \\times "+v+" = "+P+"\\).)",
    {u:u,v:v,S:S,P:P});
});

/* --- Unit 4: Radicals --- */
E("u4-compare-radicals",4,["1.4"],2,"gen",function(){
  var a,b,c,d,x2,y2,tries=0;
  do{
    a=ri(1,6);b=pick([2,3,5,6,7,10,11,13]);c=ri(1,6);d=pick([2,3,5,6,7,10,11,13]);
    x2=a*a*b;y2=c*c*d;tries++;
  }while((x2===y2||(a===c&&b===d))&&tries<60);
  var X=radT(a,b),Y=radT(c,d),xBig=x2>y2;
  return mcq("Which statement about "+X+" and "+Y+" is true?",
    (xBig?X:Y)+" is the larger value",
    [(xBig?Y:X)+" is the larger value","They are equal in value","They cannot be compared without a calculator"],
    "Write both as entire radicals: "+X+" = "+sqrtT(x2)+" and "+Y+" = "+sqrtT(y2)+". Since \\("+Math.max(x2,y2)+" > "+Math.min(x2,y2)+"\\), the larger value is <b>"+(xBig?X:Y)+"</b>.",
    {a:a,b:b,c:c,d:d,x2:x2,y2:y2});
});
E("u4-difference-simplify",4,["1.6"],2,"gen",function(){
  var m=pick([2,3,5,6,7,10,11,13]),a=ri(3,7),b=ri(1,a-1);
  var A=a*a*m,B=b*b*m,key=radT(a-b,m);
  var cand=[sqrtT(A-B),radT(a+b,m),radT(a,m)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify: \\(\\sqrt{"+A+"} - \\sqrt{"+B+"}\\). Give the answer in simplest radical form.",
    key,ds,
    "Simplify each term first: "+sqrtT(A)+" = "+radT(a,m)+" and "+sqrtT(B)+" = "+radT(b,m)+". They are like radicals, so subtract the coefficients: \\("+a+" - "+b+" = "+(a-b)+"\\), giving <b>"+key+"</b>.",
    {a:a,b:b,m:m,A:A,B:B});
});
E("u4-reciprocal-sum",4,["1.7"],2,"gen",function(){
  function gcd(x,y){while(y){var u=y;y=x%y;x=u;}return x;}
  var a=pick([2,3,5,6,7,10,11,13,14,15,17,19,21,22,23,26]),k=ri(2,6),B=a*k*k;
  var g=gcd(k+1,k*a),num=(k+1)/g,den=(k*a)/g;
  function fr(nm,dn){return "\\(\\frac{"+(nm===1?"\\sqrt{"+a+"}":nm+"\\sqrt{"+a+"}")+"}{"+dn+"}\\)";}
  var key=fr(num,den);
  var cand=[fr(k+1,k*a),"\\(\\frac{"+(k+1)+"\\sqrt{"+a+"}}{"+a+"}\\)","\\(\\frac{\\sqrt{"+a+"}}{"+k+"}\\)",fr(k,k*a)],ds=[];
  for(var i=0;i<cand.length&&ds.length<3;i++){if(cand[i]!==key&&ds.indexOf(cand[i])<0)ds.push(cand[i]);}
  return mcq("Simplify, rationalizing the denominator: \\(\\frac{1}{\\sqrt{"+a+"}} + \\frac{1}{\\sqrt{"+B+"}}\\).",
    key,ds,
    "First, \\(\\sqrt{"+B+"} = "+k+"\\sqrt{"+a+"}\\). Write the sum over a common denominator: \\(\\frac{1}{\\sqrt{"+a+"}} + \\frac{1}{"+k+"\\sqrt{"+a+"}} = \\frac{"+(k+1)+"}{"+k+"\\sqrt{"+a+"}}\\). Rationalizing (multiply top and bottom by \\(\\sqrt{"+a+"}\\)) gives \\(\\frac{"+(k+1)+"\\sqrt{"+a+"}}{"+(k*a)+"}\\)"+(g>1?", which reduces by \\("+g+"\\)":"")+" — the simplest form is <b>"+key+"</b>.",
    {a:a,k:k,B:B,g:g,num:num,den:den});
});

/* --- Unit 6: Proportional Reasoning --- */
E("u6-map-distance",6,["6.9"],2,"gen",function(){
  var N=pick([20000,25000,40000,50000,100000]),mode=ri(0,1);
  var dcm,km,ans,tries=0;
  if(mode===0){
    dcm=ri(3,18);km=dcm*N/100000;ans=km;
  }else{
    do{km=pick([2,3,4,5,6,8,10,12]);dcm=km*100000/N;tries++;}while(dcm!==Math.floor(dcm)&&tries<60);
    ans=dcm;
  }
  return numq(mode===0
      ?"On a map with scale \\(1 : "+N+"\\), the distance between two towns measures "+dcm+" cm. What is the actual distance between the towns, in kilometres?"
      :"On a map with scale \\(1 : "+N+"\\), two towns are actually "+km+" km apart. How far apart are they on the map, in centimetres?",
    ans,0.011,
    mode===0
      ?"Each map centimetre represents \\("+N+"\\text{ cm} = "+fmt(N/100000,2)+"\\text{ km}\\) on the ground. Actual distance: \\("+dcm+" \\times "+fmt(N/100000,2)+" = \\)<b>\\("+fmt(km,2)+"\\text{ km}\\)</b>."
      :"Each map centimetre represents \\("+fmt(N/100000,2)+"\\text{ km}\\), so the map distance is \\("+km+" \\div "+fmt(N/100000,2)+" = \\)<b>\\("+dcm+"\\text{ cm}\\)</b>.",
    {N:N,dcm:dcm,km:km,mode:mode,ans:ans});
});

/* --- Unit 7: Reasoning --- */
E("u7-proof-repair",7,["2.8"],3,"gen",function(){
  var f=pick([1,-1]);var a=ri(2,9);var rootA=f*a;var b=ri(2,9);if(b===rootA)b=b+1;
  var term=rootA>=0?"(x - "+rootA+")":"(x + "+(-rootA)+")";
  return numq("A student solves \\(x"+term+" = "+b+term+"\\) by cancelling the factor \\("+term+"\\) from both sides, and reports the single solution \\(x = "+b+"\\). Cancelling that factor lost one solution. What is the missing solution?",
    rootA,0.011,
    "Cancelling \\("+term+"\\) amounts to dividing both sides by it, which throws away the case where the factor itself is zero. Move everything to one side instead: \\(x"+term+" - "+b+term+" = "+term+"(x - "+b+") = 0\\), so the solutions are \\(x = "+rootA+"\\) and \\(x = "+b+"\\). The missing solution is <b>\\(x = "+rootA+"\\)</b>, exactly the value that makes the cancelled factor zero.",
    {rootA:rootA,b:b});
});
E("u7-smallest-counterexample",7,["2.4"],3,"var",varset([
  function(){return numq("Conjecture: \u2018Every multiple of \\(4\\) is a multiple of \\(8\\).\u2019 What is the smallest positive multiple of \\(4\\) that disproves it?",
    4,0.011,"The multiples of \\(4\\) are \\(4, 8, 12, 16, \\ldots\\) The very first one, \\(4\\), is not a multiple of \\(8\\), so it is a counterexample, and no smaller positive multiple of \\(4\\) exists.",{});},
  function(){return numq("Conjecture: \u2018Every multiple of \\(6\\) is a multiple of \\(9\\).\u2019 What is the smallest positive multiple of \\(6\\) that disproves it?",
    6,0.011,"The multiples of \\(6\\) are \\(6, 12, 18, \\ldots\\) The number \\(6\\) is not a multiple of \\(9\\), so it disproves the conjecture, and it is the first multiple to check.",{});},
  function(){return numq("Conjecture: \u2018Every number divisible by \\(10\\) is divisible by \\(15\\).\u2019 What is the smallest positive number that disproves it?",
    10,0.011,"The number \\(10\\) is divisible by \\(10\\) but not by \\(15\\). It meets the condition and breaks the claim, and no smaller positive number meets the condition at all.",{});},
  function(){return numq("Conjecture: \u2018Every number divisible by \\(12\\) is divisible by \\(18\\).\u2019 What is the smallest positive number that disproves it?",
    12,0.011,"The number \\(12\\) is divisible by \\(12\\), but \\(12 \\div 18\\) is not a whole number. So \\(12\\) is a counterexample, and the smallest one possible.",{});},
  function(){return numq("For whole numbers \\(n\\), the expression \\(n^2 + n + 11\\) gives a prime for \\(n = 0, 1, 2, \\ldots, 9\\). A student conjectures it is prime for every whole number. For what value of \\(n\\) does it first fail?",
    10,0.011,"Keep testing past the cases given: at \\(n = 10\\), \\(10^2 + 10 + 11 = 121 = 11 \\times 11\\), which is not prime. The pattern survived ten cases and still failed, which is why checking cases can support a conjecture but never prove it.",{});}
]));
E("u7-counterexample-name",7,["2.4"],3,"var",varset([
  function(){return textq("Conjecture: \u2018A quadrilateral with all four sides equal is a square.\u2019 Name a quadrilateral with all sides equal that is not a square. (Type the name of the shape.)",
    ["rhombus"],
    "A <b>rhombus</b> has all four sides equal, but its angles need not be right angles, so it need not be a square. A single counterexample disproves the conjecture.",{});},
  function(){return textq("Conjecture: \u2018If the diagonals of a quadrilateral are perpendicular, the quadrilateral is a rhombus.\u2019 Name a quadrilateral with perpendicular diagonals that is not a rhombus. (Type the name of the shape.)",
    ["kite"],
    "A <b>kite</b> has perpendicular diagonals, but its sides are two pairs of adjacent equal sides, not four equal sides, so it is not a rhombus.",{});},
  function(){return textq("Conjecture: \u2018A quadrilateral with a pair of parallel sides is a parallelogram.\u2019 Name a quadrilateral that has exactly one pair of parallel sides. (Type the name of the shape.)",
    ["trapezoid","trapezium"],
    "A <b>trapezoid</b> has exactly one pair of parallel sides; a parallelogram needs two pairs. So the trapezoid is a counterexample.",{});},
  function(){return textq("Conjecture: \u2018Every prime number is odd.\u2019 Type the prime number that is a counterexample.",
    ["2"],
    "The number <b>2</b> is prime, since its only factors are 1 and itself, but it is even. One counterexample is enough to disprove the conjecture.",{});}
]));
E("u7-triangular-total",7,["2.1"],2,"gen",function(){
  var mode=ri(0,3),N=0,ans=0,prompt="",sol="";
  if(mode===0){N=ri(8,26);ans=N*(N+1)/2;
    prompt="Blocks are stacked in a staircase: a 1-step staircase uses \\(1\\) block, a 2-step staircase uses \\(3\\) blocks, and a 3-step staircase uses \\(6\\) blocks. How many blocks does a "+N+"-step staircase use?";
    sol="The totals \\(1, 3, 6, \\ldots\\) grow by \\(2\\), then \\(3\\), then \\(4\\): step \\(k\\) adds \\(k\\) blocks. So the total for \\(n\\) steps is \\(1 + 2 + \\cdots + n = \\frac{n(n+1)}{2}\\). For \\("+N+"\\) steps: \\(\\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> blocks.";}
  else if(mode===1){N=ri(7,22);ans=N*(N-1)/2;
    prompt="At a meeting, every person shakes hands with every other person exactly once. With \\(4\\) people there are \\(6\\) handshakes. How many handshakes are there with "+N+" people?";
    sol="Each of the \\("+N+"\\) people shakes \\("+(N-1)+"\\) hands, but that counts every handshake twice, once from each end. The total is \\(\\frac{"+N+" \\times "+(N-1)+"}{2} = \\)<b>\\("+ans+"\\)</b>. Check the given case: \\(\\frac{4 \\times 3}{2} = 6\\), as stated.";}
  else if(mode===2){N=ri(8,28);ans=N*(N+1)/2;
    prompt="Seats are arranged in rows: row 1 has \\(1\\) seat, row 2 has \\(2\\) seats, row 3 has \\(3\\) seats, and so on. How many seats are there in the first "+N+" rows altogether?";
    sol="Add the rows: \\(1 + 2 + \\cdots + "+N+"\\). Pair the first and last rows, the second and second-last, and so on: each pair sums to \\("+(N+1)+"\\), and there are \\("+N+" \\div 2\\) pairs, giving \\(\\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> seats.";}
  else{N=ri(9,24);ans=N*(N+1)/2;
    prompt="Counters are arranged in a triangular pattern: the first row has \\(1\\) counter, the second row has \\(2\\) counters, the third row has \\(3\\) counters, and so on. How many counters are there in the first "+N+" rows?";
    sol="The row counts are consecutive whole numbers, so the total is \\(1 + 2 + \\cdots + "+N+" = \\frac{"+N+" \\times "+(N+1)+"}{2} = \\)<b>\\("+ans+"\\)</b> counters.";}
  return numq(prompt,ans,0.011,sol,{mode:mode,N:N});
});
E("u7-chain-conclusion",7,["2.3"],2,"gen",function(){
  var pools=[["Amara","Devon","Priya","Tom"],["Liam","Sofia","Noah","Emma"],["Kai","Ruth","Omar","Zoe"],["Maya","Eli","Nina","Sam"]];
  var names=pick(pools).slice();
  var order=shuffle(names.slice());
  var clues=[];for(var i=0;i<3;i++)clues.push(order[i]+" is taller than "+order[i+1]+".");
  clues=shuffle(clues);
  var askTall=Math.random()<0.5;
  var target=askTall?order[0]:order[3];
  return textq("Four students, "+names.join(", ")+", are compared by height. The clues are: (1) "+clues[0]+" (2) "+clues[1]+" (3) "+clues[2]+" Who is the "+(askTall?"tallest":"shortest")+" student? (Type the name.)",
    [target],
    "Chain the clues together: "+order[0]+" is taller than "+order[1]+", who is taller than "+order[2]+", who is taller than "+order[3]+". The clues force one full order, so the "+(askTall?"tallest":"shortest")+" student is <b>"+target+"</b>. This is deductive reasoning: the conclusion has to hold.",
    {order:order,askTall:askTall});
});
E("u7-false-pattern",7,["2.2"],2,"var",varset([
  function(){return numq("A flatbread is cut with straight cuts that cross the whole flatbread. One cut makes \\(2\\) pieces, \\(2\\) cuts make \\(4\\) pieces, and \\(3\\) cuts make \\(7\\) pieces. A student conjectures the pieces double each time and predicts \\(8\\) pieces for \\(4\\) cuts. How many pieces do \\(4\\) cuts actually make?",
    11,0.011,"Watch the increases instead: the counts grow by \\(2\\), then by \\(3\\), because each new cut crosses all the earlier cuts and so adds one more piece than the cut before. The next increase is \\(4\\), giving \\(7 + 4 = \\)<b>\\(11\\)</b> pieces. The doubling pattern fit the first step and failed soon after.",{});},
  function(){return numq("A pattern of counts begins \\(1, 2, 4, 7\\). The increases are \\(1\\), then \\(2\\), then \\(3\\). Following the same pattern of increases, what is the next count?",
    11,0.011,"The increases grow by \\(1\\) each time: \\(1, 2, 3\\), so the next increase is \\(4\\). The next count is \\(7 + 4 = \\)<b>\\(11\\)</b>. Judging a pattern means looking at how it grows, not just at the terms shown.",{});},
  function(){return numq("A student computes \\(3 = 3\\), \\(3 + 6 = 9\\) and \\(3 + 6 + 9 = 18\\), and conjectures that the sums are doubling. The sums are actually built by adding the next multiple of \\(3\\) each time. What is the next sum?",
    30,0.011,"The next multiple of \\(3\\) is \\(12\\), so the next sum is \\(18 + 12 = \\)<b>\\(30\\)</b>, not the \\(36\\) that doubling predicts. The first few terms of a pattern can fit a rule that the pattern is not following.",{});},
  function(){return numq("Matchsticks form a row of squares: \\(1\\) square uses \\(4\\) matchsticks, \\(2\\) squares use \\(7\\), and \\(3\\) squares use \\(10\\). A student conjectures that each new square adds \\(4\\) matchsticks, because the first square needed \\(4\\). How many matchsticks do \\(6\\) squares use?",
    19,0.011,"After the first square, each added square shares one side with the square before it, so it adds only \\(3\\) matchsticks: \\(4, 7, 10, 13, 16, 19\\). Six squares use <b>\\(19\\)</b> matchsticks. The first term alone does not set the rule.",{});}
]));
E("u7-deductive-chain",7,["2.3"],2,"gen",function(){
  /* rows: [singular A, plural A, plural B, singular C, plural C, singular D, plural D]
     with A in B, B in C, C in D */
  var rows=[
    ["daisy","daisies","flowers","plant","plants","living thing","living things"],
    ["robin","robins","birds","animal","animals","living thing","living things"],
    ["square","squares","rectangles","quadrilateral","quadrilaterals","polygon","polygons"],
    ["salmon","salmon","fish","animal","animals","living thing","living things"],
    ["violin","violins","string instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["poodle","poodles","dogs","mammal","mammals","animal","animals"],
    ["oak tree","oak trees","trees","plant","plants","living thing","living things"],
    ["emerald","emeralds","gems","mineral","minerals","natural substance","natural substances"],
    ["maple tree","maple trees","trees","plant","plants","living thing","living things"],
    ["eagle","eagles","birds","animal","animals","living thing","living things"],
    ["hexagon","hexagons","polygons","shape","shapes","figure","figures"],
    ["trumpet","trumpets","brass instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["wolf","wolves","canines","mammal","mammals","animal","animals"],
    ["trout","trout","fish","animal","animals","living thing","living things"],
    ["cube","cubes","prisms","solid","solids","figure","figures"],
    ["cello","cellos","string instruments","musical instrument","musical instruments","man-made object","man-made objects"],
    ["beagle","beagles","dogs","mammal","mammals","animal","animals"],
    ["tulip","tulips","flowers","plant","plants","living thing","living things"],
    ["sparrow","sparrows","birds","animal","animals","living thing","living things"],
    ["trapezoid","trapezoids","quadrilaterals","polygon","polygons","figure","figures"]
  ];
  var R=pick(rows),mode=ri(0,2);
  if(mode===2){
    return mcq("All "+R[1]+" are "+R[2]+". All "+R[2]+" are "+R[4]+". All "+R[4]+" are "+R[6]+". One particular "+R[0]+" is being examined. Which conclusion MUST be true?",
      "The "+R[0]+" is also a "+R[5],
      ["The "+R[0]+" is not a "+R[5],"Every "+R[5]+" is a "+R[0],"Every member of "+R[4]+" is a "+R[0]],
      "Follow the whole chain: all "+R[1]+" are "+R[2]+", all "+R[2]+" are "+R[4]+", and all "+R[4]+" are "+R[6]+" — so this "+R[0]+" must be a "+R[5]+". The other options reverse the chain, which deduction does not allow.",
      {row:R,mode:mode});
  }
  var first="All "+R[1]+" are "+R[2]+". All "+R[2]+" are "+R[4]+".";
  var second="All "+R[2]+" are "+R[4]+". All "+R[1]+" are "+R[2]+".";
  return mcq((mode===0?first:second)+" One particular "+R[0]+" is being examined. Which conclusion MUST be true?",
    "The "+R[0]+" is also a "+R[3],
    ["The "+R[0]+" is not a "+R[3],"Every "+R[3]+" is a "+R[0],"Every member of "+R[2]+" is a "+R[0]],
    "Deduction follows the chain: all "+R[1]+" are "+R[2]+", and all "+R[2]+" are "+R[4]+", so this "+R[0]+" must be a "+R[3]+". The other options reverse the chain, which deduction does not allow.",
    {row:R,mode:mode});
});
E("u7-figure-pattern",7,["2.1"],1,"gen",function(){
  var p=ri(1,4),q=ri(0,5),N=ri(6,15);
  function cnt(n){return n*n+p*n+q;}
  var ctx=pick(["dots","stars","tiles"]);
  return numq("A pattern of "+ctx+" grows like this: Figure 1 has "+cnt(1)+", Figure 2 has "+cnt(2)+", and Figure 3 has "+cnt(3)+". The count for Figure \\(n\\) is \\(n^2 + "+p+"n"+(q>0?" + "+q:"")+"\\). How many "+ctx+" are in Figure \\("+N+"\\)?",
    cnt(N),0.011,
    "Substitute \\(n = "+N+"\\): \\("+N+"^2 + "+p+" \\times "+N+(q>0?" + "+q:"")+" = "+(N*N)+" + "+(p*N)+(q>0?" + "+q:"")+" = \\)<b>\\("+cnt(N)+"\\)</b>. (The formula checks against the given figures: for \\(n = 1, 2, 3\\) it gives \\("+cnt(1)+", "+cnt(2)+", "+cnt(3)+"\\), as stated.)",
    {p:p,q:q,N:N,ans:cnt(N)});
});

/* ============ selection engine ============ */
/* Mid-course scope (Table of Specifications, verified Oct 26, 2026): the mid-course
   exam samples Unit 4 only to Section 4.3, so the two Radical Equations entries
   (Section 4.4) are flagged postMid and held out whenever the Mid preset is active.
   Picking Unit 4 directly still serves the full unit. */
BANK.forEach(function(e){if(e.id==="u4-radical-equation"||e.id==="u4-extraneous"||e.id==="u4-model-equation"||e.id==="u4-model-evaluate"||e.id==="u4-cube-equation")e.postMid=true;});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"u1-ambiguous-count":3,"u1-angle-between-paths":4,"u1-cosine-angle":2,"u1-cosine-context":2,"u1-cosine-side":2,"u1-guy-wire":3,"u1-median-length":4,"u1-sine-angle":2,"u1-sine-side":2,"u1-sine-two-step":2,"u1-smallest-angle":2,"u1-two-station-height":4,"u1-two-triangles":4,"u2-axis-from-intercepts":1,"u2-axis-two-points":1,"u2-count-intercepts":1,"u2-eq-from-vertex":2,"u2-evaluate-f":1,"u2-factored-coeffs":2,"u2-factored-max-height":2,"u2-factored-y-intercept":1,"u2-fence-max":3,"u2-max-area":3,"u2-max-context":2,"u2-max-height":2,"u2-mirror-point":1,"u2-revenue-model":2,"u2-standard-from-factored":2,"u2-vertex-form-eval":1,"u2-vertex-shift":1,"u2-vertex-time":1,"u2-vertex-value":2,"u2-vertex-x":1,"u2-xintercepts":2,"u2-xintercepts-factored":1,"u2-y-intercept":1,"u3-border":3,"u3-context-area":3,"u3-equation-fraction-roots":2,"u3-equation-from-roots":2,"u3-exact-roots":2,"u3-factor-difference":2,"u3-factor-monic":2,"u3-factor-nonmonic":2,"u3-factor-solve":2,"u3-formula":2,"u3-formula-exact-roots":2,"u3-gcf-solve":2,"u3-model-number":2,"u3-number-pair":2,"u3-root-difference":3,"u3-roots-sum-product":1,"u3-setup-equation":1,"u3-solve-height":2,"u3-solve-square":1,"u3-squares-area":3,"u3-standard-coeffs":1,"u3-two-numbers":3,"u3-zeros-factored":1,"u4-add-unlike":2,"u4-binomial-square":2,"u4-combine-multi":2,"u4-compare-radicals":1,"u4-conjugate-area":2,"u4-cube-equation":2,"u4-cube-mixed":2,"u4-defined-count":3,"u4-diagonal-radical":2,"u4-difference-simplify":2,"u4-divide-radicals":2,"u4-entire-cube":1,"u4-entire-to-mixed":2,"u4-equation-restriction":1,"u4-evaluate-mixed":1,"u4-extraneous":3,"u4-mixed-to-entire":1,"u4-model-equation":2,"u4-model-evaluate":1,"u4-multiply":2,"u4-multiply-mixed":2,"u4-order":2,"u4-product-simplify":2,"u4-radical-equation":2,"u4-rationalize":1,"u4-rationalize-coefficient":2,"u4-reciprocal-sum":3,"u4-repair-simplify":2,"u4-restrictions":1,"u4-simplify-add":2,"u4-triangle-perimeter":2,"u4-variable-mixed":2,"u4-verify-root":1,"u4-width-radical":2,"u5-ad-claim":3,"u5-centre-mean":1,"u5-centre-median":1,"u5-centre-mode":1,"u5-ci-build":1,"u5-ci-count":2,"u5-ci-endpoint":1,"u5-ci-from-endpoints":1,"u5-ci-level-from-report":1,"u5-ci-majority":3,"u5-ci-read-report":2,"u5-ci-shrink":2,"u5-empirical":2,"u5-freq-countin":1,"u5-freq-missing":1,"u5-freq-total":1,"u5-histogram-read":2,"u5-media":4,"u5-midpoint":1,"u5-normal-count":2,"u5-outlier-range":2,"u5-poll-position":3,"u5-polygon-point":1,"u5-range":1,"u5-relfreq":1,"u5-relfreq-rev":1,"u5-sd-calc":2,"u5-sd-compare":2,"u5-sd-decisions":4,"u5-sd-from-variance":1,"u5-z-applied":2,"u5-z-backwards":1,"u5-z-calc":1,"u5-z-compare":2,"u5-z-prob":2,"u6-area-scale":2,"u6-better-buy":2,"u6-breakeven-plans":2,"u6-compare-rates":2,"u6-justify-consistency":3,"u6-map-distance":2,"u6-pack-cost":2,"u6-poster-cost":3,"u6-poster-dimensions":2,"u6-rate-difference":2,"u6-rate-isolate":1,"u6-rate-solve":1,"u6-scale-factor":1,"u6-similar-dimension":1,"u6-tile-cost":3,"u6-unit-rate":1,"u6-unknown-dimension":1,"u6-volume-scale":2,"u6-work-rate-solo":3,"u7-chain-conclusion":3,"u7-counterexample":2,"u7-counterexample-claims":2,"u7-counterexample-gen":2,"u7-counterexample-name":2,"u7-everyday-counterexample":2,"u7-false-pattern":2,"u7-figure-pattern":1,"u7-pattern-equation":2,"u7-pattern-next":1,"u7-pattern-quad":2,"u7-proof-repair":3,"u7-race-order":2,"u7-sequence-gap":1,"u7-smallest-counterexample":2,"u7-triangular-total":3,"u8-alternate-algebra":2,"u8-angle-chase":2,"u8-angle-sum-rule":1,"u8-co-interior":1,"u8-cointerior-algebra":2,"u8-congruence-deduce":1,"u8-congruence-perimeter":2,"u8-congruent-perimeter":1,"u8-corresponding-algebra":2,"u8-diagonals":1,"u8-exterior":1,"u8-exterior-algebra":3,"u8-isosceles-angles":2,"u8-isosceles-exterior":2,"u8-multi-angle":2,"u8-parallel-x-value":3,"u8-polygon-inverse":1,"u8-polygon-ratio":2,"u8-polygon-sum":1,"u8-regular-angle":1,"u8-regular-sides-from-angle":3,"u8-triangle-algebra":2,"u8-triangle-sum":1};
