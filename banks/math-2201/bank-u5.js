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
// CRMARKS: u5-centre-mean-missing=1
// CRMARKS: u5-range-missing=1
// CRMARKS: u5-variance-from-sd=1
// CRMARKS: u5-sd-calc-small=2
// CRMARKS: u5-empirical-tail=2
// CRMARKS: u5-normal-count-between=2
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
  var q=numq("A student records these "+c.w+": <b>\\(\\{"+data.join(", ")+"\\}\\)</b>. What is the <b>mean</b>?",
    Math.round(m*100)/100,0.011,
    "Add the values: \\("+data.join(" + ")+" = "+fmt(sum(data))+"\\). There are "+n+" values, so the mean is <b>\\("+fmt(sum(data))+" \\div "+n+" = "+fmt(m)+"\\)</b>.",
    {data:data});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the recorded values"});
  return q;
});
E("u5-centre-median",5,["PK.1"],1,"gen",function(){
  var n=pick([6,8]),base=ri(5,15),data=[],i;for(i=0;i<n;i++)data.push(base+ri(-5,7));
  var md=median(data),s=sorted(data),lo=s[n/2-1],hi=s[n/2];
  var q=numq("Find the <b>median</b> of: <b>\\(\\{"+data.join(", ")+"\\}\\)</b>.",
    md,0.011,
    "In order: \\(\\{"+s.join(", ")+"\\}\\). With "+n+" values the median is the average of the two middle values, \\("+lo+"\\) and \\("+hi+"\\): <b>\\(\\frac{"+lo+" + "+hi+"}{2} = "+fmt(md)+"\\)</b>.",
    {data:data});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the data values"});
  return q;
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
  var q=numq("Find the <b>range</b> of these "+c+": <b>\\(\\{"+data.join(", ")+"\\}\\)</b>.",
    rngOf(data),0.001,
    "Range <b>\\(= \\text{highest} - \\text{lowest} = "+Math.max.apply(null,data)+" - "+Math.min.apply(null,data)+" = "+rngOf(data)+"\\)</b>.",
    {data:data});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the data values"});
  return q;
});
E("u5-outlier-range",5,["8.6"],2,"gen",function(){
  var lo=ri(5,10),cluster=[],i;for(i=0;i<5;i++)cluster.push(lo+ri(0,5));
  var out=Math.max.apply(null,cluster)+ri(18,30);var data=shuffle(cluster.concat([out]));
  var without=rngOf(cluster);
  var correct="\\("+out+"\\) is the outlier, and the range without it is \\("+without+"\\)";
  var q=mcq("For the data set <b>\\(\\{"+data.join(", ")+"\\}\\)</b>, which statement is correct?",correct,
    ["\\("+Math.min.apply(null,data)+"\\) is the outlier, and the range without it is \\("+without+"\\)",
     "\\("+out+"\\) is the outlier, and the range without it is \\("+rngOf(data)+"\\)",
     "There is no outlier, and the range is \\("+rngOf(data)+"\\)"],
    "The value \\("+out+"\\) sits far above the cluster \\(\\{"+cluster.join(", ")+"\\}\\). Without it, the range is \\("+Math.max.apply(null,cluster)+" - "+Math.min.apply(null,cluster)+" = "+without+"\\). With it, the range stretches to \\("+rngOf(data)+"\\), which is why one outlier can make a set look far more spread out than it really is.",
    {data:data,out:out,without:without});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the data set, with one value far from the rest"});
  return q;
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
  var q=mcq("A gym advertises: \u201COur members lose an average of "+claim+" lb in their first month!\u201D The amounts actually lost by eight members were <b>\\(\\{"+data.join(", ")+"\\}\\)</b> lb. Why is the advertisement misleading?",
    "It uses the mean, which one member's \\("+big+"\\) lb loss pulls far above what a typical member loses (the median loss is \\("+fmt(md)+"\\) lb)",
    ["It uses the median, which one large loss pulls far above the rest, so the median ends up inflated like the advertised figure","The range of the losses is too small to support the claim, because so narrow a range means no one lost enough to lift the average that high","The mode of the losses is higher than the advertised average, because the most common loss sits above what the gym says members lose"],
    "Mean \\(= "+fmt(sum(data))+" \\div 8 = "+fmt(m)+" \\approx "+claim+"\\), so the gym used the mean. But sorted, the middle values give a median of \\("+fmt(md)+"\\) lb \u2014 a far better picture of a typical member. One extreme value did all the work in the ad.",
    {data:data,mean:m,median:md,big:big});
  q.figure=dotPlotSVG(data,{aria:"Dot plot of the eight amounts, with one value far from the rest"});
  return q;
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
  var q=numq("Using the class intervals from the course (lower value included, upper value excluded), how many of these values fall in the interval <b>\\("+lo+"\\text{-}"+hi+"\\)</b>?<br><b>\\(\\{"+data.join(", ")+"\\}\\)</b>",
    cnt,0.001,"Count the values that are at least \\("+lo+"\\) and less than \\("+hi+"\\): there are <b>\\("+cnt+"\\)</b>. A value of exactly \\("+hi+"\\) would belong to the next interval, not this one.",{data:data,lo:lo,hi:hi});
  q.figure=dotPlotSVG(data,{band:[lo,hi],aria:"Dot plot of the values, with the interval "+lo+" to "+hi+" shaded"});
  return q;
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
E("u5-histogram-read",5,["8.7"],1,"var",varset([
  function(){
  var labels=["\\(0\\text{-}9\\)","\\(10\\text{-}19\\)","\\(20\\text{-}29\\)","\\(30\\text{-}39\\)"];var fs=[ri(2,7),ri(8,13),ri(5,10),ri(1,5)];
  var ans=fs[2]+fs[3];
  var rows=labels.map(function(l,i){return "<tr><td>"+l+"</td><td>\\("+fs[i]+"\\)</td></tr>";}).join("");
  var q=numq("A histogram is built from this table of daily high temperatures recorded over "+sum(fs)+" days:<table><tr><th>Temperature (\u00B0C)</th><th>Frequency</th></tr>"+rows+"</table>On how many days was the high temperature <b>\\(20^\\circ \\text{C}\\) or more</b>?",
    ans,0.001,"Add the frequencies for \\(20\\text{-}29\\) and \\(30\\text{-}39\\): <b>\\("+fs[2]+" + "+fs[3]+" = "+ans+"\\)</b> days.",{fs:fs});
  q.figure=barsSVG([{label:"0-9",f:fs[0]},{label:"10-19",f:fs[1]},{label:"20-29",f:fs[2]},{label:"30-39",f:fs[3]}],{touch:true,yLab:"Frequency",aria:"Histogram of daily high temperatures"});
  return q;
},
  function(){
  var fs=[ri(2,7),ri(8,13),ri(5,10),ri(1,5)];
  var ans=fs[2]+fs[3];
  var q=numq("The histogram shows daily high temperatures recorded over "+sum(fs)+" days. On how many days was the high temperature <b>\\(20^\\circ \\text{C}\\) or more</b>?",
    ans,0.001,"Read the bar heights off the frequency axis: the \\(20\\text{-}29\\) bar reaches \\("+fs[2]+"\\) and the \\(30\\text{-}39\\) bar reaches \\("+fs[3]+"\\). Add them: <b>\\("+fs[2]+" + "+fs[3]+" = "+ans+"\\)</b> days.",{fs:fs});
  q.figure=barsSVG([{label:"0-9",f:fs[0]},{label:"10-19",f:fs[1]},{label:"20-29",f:fs[2]},{label:"30-39",f:fs[3]}],{touch:true,yLab:"Frequency",aria:"Histogram of daily high temperatures"});
  return q;
}
]));
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
  var q=mcq("Two "+ctx+" are drawn as frequency polygons on the same axes. Route A's polygon is tall and narrow, peaked at \\("+lo1+"\\text{-}"+hi1+"\\) passengers. Route B's polygon is low and wide, spread from \\(0\\text{-}9\\) up to \\("+(bHi-9)+"\\text{-}"+bHi+"\\) passengers. Which statement is correct?",
    "Route B's passenger counts are more spread out, because its polygon covers a much wider range of intervals",
    ["Route A carries more passengers in total, because its polygon is taller, and its taller peak means more carried overall","Both routes are equally consistent, because both polygons peak, and a peak in the middle means equal consistency","Route B's mean is \\("+fmt(bHi-4.5,1)+"\\) passengers, the midpoint of its widest interval, so that midpoint is the mean"],
    "A polygon stretched over many intervals means the values vary widely \u2014 Route B is far more spread out. Height alone does not give a total, and a midpoint is not a mean.",{lo1:lo1});
  q.figure=polyPairSVG({peakLo:lo1,peakHi:hi1,top:bHi,aria:"The two frequency polygons described, on the same axes"});
  return q;
});
/* --- standard deviation (8.8, 8.9, 8.10, 8.16) --- */
E("u5-sd-calc",5,["8.9"],2,"gen",function(){
  var sets=[[4,6,8,10,12],[10,12,14,16],[2,5,8,11,14],[6,9,10,11,14],[15,17,19,21,23],[3,7,8,12,15]];
  var data=pick(sets).map(function(x){return x+ri(0,3);});
  var m=mean(data),v=pvar(data),sd=Math.sqrt(v);
  var devs=data.map(function(x){return fmt(x-m);}).join(", ");
  var q=numq("Using technology (or the formula), find the <b>population standard deviation</b> of <b>\\(\\{"+data.join(", ")+"\\}\\)</b>, to two decimal places. The mean is \\("+fmt(m)+"\\).",
    Math.round(sd*100)/100,0.011,
    "Deviations from the mean: \\("+devs+"\\). Square them and average: the variance is \\("+fmt(v)+"\\). Then <b>\\(\\sigma = \\sqrt{"+fmt(v)+"} \\approx "+fmt(sd)+"\\)</b>.",
    {data:data});
  q.figure=dotPlotSVG(data,{mean:m,aria:"Dot plot of the data values, with the mean marked"});
  return q;
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
  var q=mcq("Set A is \\(\\{"+first.join(", ")+"\\}\\). Set B is \\(\\{"+second.join(", ")+"\\}\\). Both sets have mean \\("+m+"\\). Which statement is correct?",
    "Set "+wider+" has the larger standard deviation, because its values lie farther from the mean",
    ["Set "+(wider==="A"?"B":"A")+" has the larger standard deviation, because its values are closer together overall","Both sets have the same standard deviation, because they have the same mean value","Neither set has a standard deviation, because they have only three values each"],
    "Both sets are centred at \\("+m+"\\), but Set "+wider+"'s values sit \\("+(wider==="A"?(swap?d2:d1):(swap?d1:d2))+"\\) units away while the other's sit closer. Farther from the mean means a larger standard deviation, whatever the mean is.",
    {A:A,B:B,wider:wider,m:m});
  q.figure=dotPlotSVG(null,{rows:[{label:"A",data:first},{label:"B",data:second}],mean:m,aria:"Dot plots of the two sets on a shared scale, with their common mean marked"});
  return q;
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
  figArm(function(){return mcq("Two caf\u00E9s both serve lunch in a mean time of \\(14\\) minutes. Caf\u00E9 A has a standard deviation of \\(2\\) minutes; Caf\u00E9 B, \\(5\\) minutes. What do the two normal curves look like?",
    "Caf\u00E9 A's curve is taller and narrower; Caf\u00E9 B's is shorter and wider, and both are centred at \\(14\\)",
    ["Caf\u00E9 B's curve is taller and narrower, because its times vary more, and more variation raises the peak","Both curves are identical, because the means are equal, and equal means mean equal shapes","Caf\u00E9 A's curve is centred at \\(2\\) and Caf\u00E9 B's at \\(5\\), because each centre is a standard deviation"],
    "Same mean means the same centre. A smaller standard deviation squeezes the data toward the centre, so the curve grows taller and narrower to keep the same total area.",{});},function(){return normSVG({mu:14, sd:2, curve2:{sd:5, tagA:"A: \u03C3 = 2", tagB:"B: \u03C3 = 5"}});}),
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
  var q=numq("Values for "+fam.w+" are normally distributed with mean \\("+fmt(mu)+"\\) "+fam.unit+" and standard deviation \\("+fmt(sd)+"\\) "+fam.unit+". What percent (to two decimal places) "+dir.verb+" \\("+fmt(thr,1)+"\\) "+fam.unit+"? (Just the number.)",
    pct,0.06,"\\(z = \\frac{"+fmt(thr,1)+" - "+fmt(mu)+"}{"+fmt(sd)+"} = "+fmt(z)+"\\). From the table, the area "+(up?"to the right of":"to the left of")+" \\(z = "+fmt(z)+"\\) is \\("+fmt(p,4)+"\\), about <b>\\("+fmt(pct)+"\\%\\)</b>.",{ctx:{thr:thr,mu:mu,sd:sd,verb:dir.verb}});
  q.figure=normSVG({mu:mu, sd:sd, lo:(up? thr : mu-3.4*sd), hi:(up? mu+3.4*sd : thr), cuts:[{v:thr, label:""+fmt(thr,1)}]});
  return q;
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

/* ============ Prior knowledge tranche (November 15, 2026) ============
   Cluster 5 (Statistical Reasoning prerequisites), borrowed set.
   Provenance, one line per entry (host id: source entry in its home
   bank, the feeder indicator it assesses, verified by draw sweep):
   - u5-pk-sample-or-population: copied from math-9 u9-sample-or-population, indicator 11.3.
   - u5-pk-generalization-critique: copied from math-9 u9-generalization-critique, indicator 11.6.
   - u5-pk-freq-mean: copied from math-9 u9-gap-freq-mean-mc, indicator 11.9; that entry is
     itself pkFlagged in the Math 9 bank, where it assesses Grade 7 centre content, and it is
     copied here under the same judgement one course up.
   - u5-pk-sample-scale: copied from math-9 u9-gap-sample-scale-cr, indicator 11.6.
   - u5-pk-supported-conclusion: copied from math-9 u9-supported-conclusion, indicator 11.9.
   The four PK.1 entries earlier in this file stay coded and untouched;
   these five carry pkFlag, set by the pass at the end of this section.
   Their indicator tags are support tags (the Math 2201 indicator each
   one feeds), not assessed targets: what each item assesses is in its
   pkSrc property, and the full dependent list is in pkFor. */
E("u5-pk-sample-or-population", 5, ["8.19"], 1, "var", varset([
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A principal asks every student in the school about lunch choices for the cafeteria. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the asking", fb:"Right: every student in the school was asked, so the whole group being studied took part."},
      [{t:"A sample, because everyone in the group being studied was included in the asking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the asking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the students who were asked were chosen by drawing names at random", fb:"No names were drawn here; the principal asked every student in the school directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-school"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A factory tests 20 batteries from a shipment of 2000 to check battery life. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the testing", fb:"Right: 20 batteries out of 2000 is part of the shipment, so the factory tested a sample."},
      [{t:"A population, because only part of the group being studied was included in the testing", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the testing", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because the batteries that were tested were chosen by drawing at random", fb:"Random choice still tests only part of the shipment, and a part is always a sample."}],
      "When only part of the group being studied is included, the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-batteries"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A club president asks all 12 members of a small chess club about a new meeting day. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the asking", fb:"Right: all 12 members were asked, so the whole group being studied took part in full."},
      [{t:"A sample, because everyone in the group being studied was included in the asking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the asking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the members who were asked were chosen by drawing names at random", fb:"No names were drawn here; the president asked all 12 members of the club directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-chess"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A grocer checks 25 apples from a shipment of 500 apples for bruises. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the checking", fb:"Right: 25 apples out of 500 is part of the shipment, so the grocer checked a sample."},
      [{t:"A population, because only part of the group being studied was included in the checking", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the checking", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because the apples that were checked were chosen by drawing at random", fb:"Random choice still checks only part of the shipment, and a part is always a sample."}],
      "When only part of the group being studied is included, the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-apples"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A town studying all its households surveys every household on one street, Bay Street, and no others. Which option classifies this correctly?",
      {t:"A sample, because only part of the group being studied was included in the survey", fb:"Right: the group studied is all town households, and one street is only part of that group."},
      [{t:"A population, because only part of the group being studied was included in the survey", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because everyone in the group being studied was included in the survey", fb:"The reason describes everyone taking part, but households on other streets were left out."},
       {t:"A population, because every household on the chosen street answered the survey fully", fb:"Full answers on one street still cover only part of all the households in the town."}],
      "The group being studied is all households in the town, and one street is only part of it, so the study uses a sample. The correct classification is <b>a sample, because only part of the group was included</b>.",
      {mode:"sampop-street"});
  },
  function(){
    return mcq("A population is everyone in the group being studied, and a sample is part of that group. A swim coach times every one of the 14 swimmers on the team during a practice. Which option classifies this correctly?",
      {t:"A population, because everyone in the group being studied was included in the timing", fb:"Right: all 14 swimmers on the team were timed, so the whole group being studied took part."},
      [{t:"A sample, because everyone in the group being studied was included in the timing", fb:"The reason describes everyone taking part, which is a population, so the label and reason clash."},
       {t:"A population, because only part of the group being studied was included in the timing", fb:"The reason describes only part taking part, which is a sample, so the label and reason clash."},
       {t:"A sample, because the swimmers who were timed were chosen by drawing names at random", fb:"No names were drawn here; the coach timed every swimmer on the team directly."}],
      "When everyone in the group being studied is included, the study uses a population. The correct classification is <b>a population, because everyone in the group was included</b>.",
      {mode:"sampop-swim"});
  }
]), ["First name the group being studied, then ask whether all of it or only part of it took part.", "Compare the group named in the question with the group that actually took part."]);
E("u5-pk-generalization-critique", 5, ["8.22"], 3, "var", varset([
  function(){
    return mcq("Jordan asks 5 close friends at lunch and then claims that all teenagers in town love a new skate shop. Which option gives the soundest critique of this generalization from a sample?",
      {t:"The sample is too small and made only of friends, so it cannot speak for all teenagers in town", fb:"Right: five friends share tastes and miss most teenagers, so the claim reaches far beyond the sample."},
      [{t:"The claim is sound, because friends usually know what other teenagers in town will enjoy", fb:"Friends share the same circle, so their tastes are a poor guide to every teenager in town."},
       {t:"The sample is too large for a lunch break study, so fewer students should have been asked", fb:"Five is a very small sample, not a large one; size in the other direction is the problem."},
       {t:"The claim is sound, because the question was asked directly rather than through a survey form", fb:"Asking directly does not fix a tiny group of friends standing in for a whole town of teenagers."}],
      "A generalization is only as good as the sample behind it: a claim about a whole population needs a sample large enough and representative enough to support it. The sound critique is <b>the sample is too small and made only of friends</b>.",
      {mode:"critique-friends"});
  },
  function(){
    return mcq("A report surveys members at one gym and then claims that most adults in town exercise every day. Which option gives the soundest critique of this generalization from a sample?",
      {t:"Gym members exercise more than most adults, so the sample does not represent the whole town", fb:"Right: people who join a gym differ from the general population in exactly the habit being measured."},
      [{t:"The claim is sound, because gym members are adults and the claim is about adults in town", fb:"Being adults is not enough; gym members are untypical adults for a question about exercise habits."},
       {t:"The sample is too small to use, because a single gym can hold only a handful of members", fb:"Gym size is not given here; the flaw is that members differ from the town, not the head count."},
       {t:"The claim is sound, because a survey at a gym is a direct way to study exercise habits", fb:"Directness does not fix a sample drawn only from people who already choose to exercise often."}],
      "A generalization is only as good as the sample behind it: a sample that differs from the population on the very topic studied cannot support a town wide claim. The sound critique is <b>gym members do not represent the whole town</b>.",
      {mode:"critique-gym"});
  },
  function(){
    return mcq("A school draws 200 student names at random from all grades and surveys them about library use, then claims the results describe library use across the whole school. Which option judges this generalization correctly?",
      {t:"The generalization is reasonable, because a large random sample from all grades can represent the school", fb:"Right: random selection across all grades with 200 students gives the claim a solid sample behind it."},
      [{t:"The generalization fails, because any sample smaller than the whole school is always invalid as a rule", fb:"Samples can support claims when they are large, random and drawn from the whole group studied."},
       {t:"The generalization fails, because library users were more likely to answer the survey at school that day", fb:"Names were drawn at random from all grades, so keen users hold no special place in this sample."},
       {t:"The generalization is reasonable, because the students surveyed all visit the same library room at school", fb:"Sharing a library room is not the reason; random selection across grades is what supports the claim."}],
      "A generalization is only as good as the sample behind it, and a large random sample drawn from the whole group can support a claim about that group. The correct judgement is <b>the generalization is reasonable, because the sample is large and random</b>.",
      {mode:"critique-random"});
  },
  function(){
    return mcq("A student asks people at a skate park whether the town should build a bigger skate park, and then claims most residents support the project. Which option gives the soundest critique of this generalization from a sample?",
      {t:"People at a skate park already favour skate parks, so the sample leans one way from the start", fb:"Right: asking only users about their own facility stacks the answers toward support for the project."},
      [{t:"The claim is sound, because people at the park know more about skate parks than others do", fb:"Knowledge about skate parks does not make park users typical of all residents in the town."},
       {t:"The sample is too large for one student to handle, so fewer people should have been asked", fb:"Sample size is not given as the flaw here; the flaw is asking only people who already use the park."},
       {t:"The claim is sound, because the question was asked in person rather than on a printed form", fb:"Asking in person does not fix a sample drawn only from people who favour the project already."}],
      "A generalization is only as good as the sample behind it: asking only people who already use a facility cannot support a claim about all residents. The sound critique is <b>people at a skate park already favour skate parks</b>.",
      {mode:"critique-skatepark"});
  },
  function(){
    return mcq("A study surveys 300 Grade 9 students and then claims that students in the whole school, Grades 7 to 12, prefer morning classes. Which option gives the soundest critique of this generalization from a sample?",
      {t:"Only one grade was surveyed, so older and younger students may answer very differently", fb:"Right: a large sample from a single grade still misses every other grade the claim covers."},
      [{t:"The claim is sound, because 300 students is a large sample for any school wide question", fb:"Size alone does not help when every student surveyed comes from just one of six grades."},
       {t:"The sample is too small to use, because a school survey needs thousands of students", fb:"Three hundred is a fair size; the flaw is that all of them come from a single grade level."},
       {t:"The claim is sound, because Grade 9 students sit between the youngest and oldest grades", fb:"A middle grade does not automatically share the views of the grades above and below it."}],
      "A generalization is only as good as the sample behind it: a sample drawn from one grade cannot support a claim covering six grades. The sound critique is <b>only one grade was surveyed, so other grades may differ</b>.",
      {mode:"critique-onegrade"});
  }
]), ["Test the claim against its sample: check the size, then check whether the sample matches the whole group claimed.", "Picture who is missing from the sample; missing groups are where a generalization usually breaks."]);
E("u5-pk-freq-mean", 5, ["8.7"], 2, "gen", function () {
  var k = ri(1, 12);
  var v1 = k, v2 = k + 2, v3 = k + 4;
  var f1 = ri(2, 5), f2 = ri(2, 6), f3 = ri(2, 5);
  var S = f1 * v1 + f2 * v2 + f3 * v3, N = f1 + f2 + f3;
  var mean = Math.round(S / N * 100) / 100;
  var dWrongDiv = Math.round(S / 3 * 100) / 100;
  var dDouble = Math.round((S + f3 * v3) / N * 100) / 100;
  var prompt = "A survey records the number of pets per household. The table shows: " + v1 + " pet for " + f1 + " households, " + v2 + " pets for " + f2 + " households, and " + v3 + " pets for " + f3 + " households. What is the mean number of pets per household?";
  var sol = "Multiply each value by its frequency, add, and divide by the total frequency: \\[ \\begin{aligned} \\text{mean} &= \\frac{" + f1 + "(" + v1 + ") + " + f2 + "(" + v2 + ") + " + f3 + "(" + v3 + ")}{" + N + "} = \\frac{" + S + "}{" + N + "} = " + fmt(mean) + " \\end{aligned} \\] The answer is <b>" + fmtF(mean, 2) + "</b>.";
  return mcq(prompt,
    { t: fmtF(mean, 2), fb: "Correct: the weighted total is divided by the total number of households." },
    [{ t: fmtF(S, 2), fb: "That is the weighted total on its own; it still has to be divided by the total number of households." },
     { t: fmtF(dWrongDiv, 2), fb: "That divides by the number of rows in the table; the divisor should be the total number of households." },
     { t: fmtF(dDouble, 2), fb: "That counts the last row of the table twice before dividing, which inflates the total." }],
    sol, { mode: "gap-freq-mean-mc", S: S, N: N });
}, ["A frequency table mean weights each value by how often it occurs, then divides by the total count.", "Multiply each pet count by its number of households as the first step."]);
E("u5-pk-sample-scale", 5, ["8.19"], 2, "gen", function () {
  var ns = pick([40, 50, 60, 80, 100]);
  var c = ri(6, Math.floor(ns * 0.7));
  var k = ri(6, 15);
  var pop = ns * k, pred = c * k;
  var T = Math.max(10, (Math.floor(pred / 10) - ri(0, 3)) * 10);
  if (T >= pred) T = pred - 10;
  var ans = pred - T;
  var prompt = "A survey of " + ns + " students finds that " + c + " of them walk to school. The whole school has " + fmt(pop) + " students. Predict how many students in the whole school walk to school, and find how many more that prediction is than " + fmt(T) + " students. Give the excess as your answer.";
  var sol = "Scale the sample count up to the population first: \\[ \\begin{aligned} \\text{scale} &= " + fmt(pop) + " \\div " + ns + " = " + k + " \\\\ \\text{prediction} &= " + c + " \\times " + k + " = " + pred + " \\\\ \\text{excess} &= " + pred + " - " + fmt(T) + " = " + ans + " \\end{aligned} \\] The answer is <b>" + ans + "</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "gap-sample-scale", pred: pred, T: T });
}, ["The sample result must be scaled to the full population before any comparison is made.", "Divide the population by the sample size to get the scale as the first step."]);
E("u5-pk-supported-conclusion", 5, ["8.22"], 3, "var", varset([
  function(){
    return mcq("For a project, a student surveys 40 students at school about getting to school. Of the 40 students, 30 say they walk, 6 ride a bus and 4 get a ride. Which conclusion does this data actually support?",
      {t:"Most of the 40 students surveyed said they walk to school on a regular school day", fb:"Right: 30 of 40 is most of the group surveyed, so the conclusion stays inside the data."},
      [{t:"Most students in the whole province walk to school on a regular school day each year", fb:"Forty students at one school cannot support a claim about a whole province of students."},
       {t:"Walking to school causes students to arrive at school feeling more alert each day", fb:"The survey counted travel methods only; it measured nothing about alertness or its causes."},
       {t:"Most of the 40 students surveyed said they ride a bus to school on a regular day", fb:"Only 6 of 40 named the bus, so this conclusion contradicts the numbers in the survey."}],
      "A conclusion must stay inside the data collected: 30 of the 40 students surveyed walk, and nothing wider was measured. The supported conclusion is <b>most of the 40 students surveyed said they walk to school</b>.",
      {mode:"conclusion-walk"});
  },
  function(){
    return mcq("For a project, a student grows 10 bean plants with extra light and 10 without it. After three weeks, 7 of the extra light plants are taller than the tallest plant grown without extra light. Which conclusion does this data actually support?",
      {t:"In this trial, most plants with extra light grew taller than the plants without it", fb:"Right: 7 of 10 beating every untreated plant supports a conclusion about this trial only."},
      [{t:"Extra light will make every bean plant grow taller in any garden or classroom trial", fb:"One small trial cannot promise results for every plant in any place it might be grown."},
       {t:"Extra light is the only reason any of the plants in the trial grew taller at all", fb:"Other factors also affect growth, and this trial never tested light as the only cause."},
       {t:"In this trial, most plants without extra light grew taller than the plants with it", fb:"The tallest plants were in the extra light group, so this conclusion contradicts the results."}],
      "A conclusion must stay inside the data collected: in this trial the extra light plants grew taller, and nothing wider was tested. The supported conclusion is <b>in this trial, most plants with extra light grew taller</b>.",
      {mode:"conclusion-plants"});
  },
  function(){
    return mcq("For a project, a student counts library loans over two school weeks. Fiction books were borrowed 120 times and non fiction books were borrowed 45 times during those two weeks. Which conclusion does this data actually support?",
      {t:"During those two weeks, fiction books were borrowed more often than non fiction books", fb:"Right: 120 loans against 45 loans supports a comparison limited to the two weeks counted."},
      [{t:"Fiction books are better written than non fiction books for student readers at school", fb:"Loan counts say nothing about writing quality; the project counted borrowing, not quality."},
       {t:"Every student in the school prefers fiction books over non fiction books this year", fb:"Loan counts over two weeks cannot show what every student prefers across a whole year."},
       {t:"During those two weeks, non fiction books were borrowed more often than fiction books", fb:"Non fiction had 45 loans against 120 for fiction, so this conclusion contradicts the counts."}],
      "A conclusion must stay inside the data collected: fiction loans outnumbered non fiction loans in the two weeks counted. The supported conclusion is <b>during those two weeks, fiction books were borrowed more often</b>.",
      {mode:"conclusion-library"});
  },
  function(){
    return mcq("For a project, a student records the recess temperature on 10 school days in May. On 6 of the 10 days the temperature was above 10 degrees, and on 4 days it was at or below 10 degrees. Which conclusion does this data actually support?",
      {t:"On most of the 10 days recorded, the recess temperature was above 10 degrees in May", fb:"Right: 6 of 10 days is most of the recorded days, so the conclusion matches the records."},
      [{t:"May is always the warmest month of the school year in this part of the province", fb:"Ten days in one month cannot rank all months, and no other month was recorded at all."},
       {t:"Warm recess weather causes students to play outside for longer at recess time", fb:"The project recorded temperatures only; it measured nothing about play time or its causes."},
       {t:"On most of the 10 days recorded, the recess temperature was at or below 10 degrees", fb:"Only 4 of 10 days were at or below 10 degrees, so this conclusion contradicts the records."}],
      "A conclusion must stay inside the data collected: 6 of the 10 recorded days were above 10 degrees, and nothing wider was measured. The supported conclusion is <b>on most of the 10 days recorded, the temperature was above 10 degrees</b>.",
      {mode:"conclusion-temp"});
  }
]), ["A supported conclusion says only what the numbers show, for the group and the time actually studied.", "Check each option against the numbers in the stem, and drop any option that reaches past them."]);
/* ============ External drafting tranche (November 18, 2026) ============
   Thirteen entries drafted externally (Gemini) under the External
   Authoring Pack, version 2, against the Math 2201 Unit 5 assignment,
   and integrated after the intake sweep: 3,000 draws per entry with
   every key recomputed independently from the dealt parameters, plus
   the distractor length scan and the bank overlap check. One entry
   carries an intake repair (u5-sd-calc-small), listed in the intake
   report (Intake-Report-Math-2201-Unit-5-Gemini-2026-11-18, review
   apps goal files). Ten assigned entries were rejected from this
   tranche at intake (u5-sd-transform, u5-normal-statements,
   u5-isnormal-context, u5-sd-decision-gen, u5-sd-overflow,
   u5-ci-significance, u5-ci-significance-gen, u5-media-ratio-claim,
   u5-media-position and u5-position-argument). */

E("u5-centre-mean-missing",5,["PK.1"],2,"gen",function(){
  var ctx=ri(0,2);
  var n=ri(4,6);
  var vals,m,tries=0;
  do{
    vals=[];
    for(var i=0;i<n;i++){
      if(ctx===0)vals.push(ri(10,20));
      else if(ctx===1)vals.push(ri(8,26));
      else vals.push(ri(15,45));
    }
    m=mean(vals);
    tries++;
    if(Math.abs(m*10-Math.round(m*10))<1e-9)break;
  }while(tries<120);
  var missIdx=ri(0,n-1);
  var ans=vals[missIdx];
  var shown=vals.map(function(v,idx){return idx===missIdx?"\\square":String(v);});
  var known=vals.filter(function(_,idx){return idx!==missIdx;});
  var knownSum=sum(known);
  var total=Math.round(m*n);
  var mStr=fmt(m,1);
  var prompt;
  if(ctx===0)prompt="A student's "+n+" quiz marks (out of 20) are <b>\\(\\{ "+shown.join(", ")+" \\}\\)</b>, with one mark missing. If the mean of all "+n+" marks is \\("+mStr+"\\), find the missing mark.";
  else if(ctx===1)prompt="The daily high temperatures (in \\(^\\circ\\text{C}\\)) over "+n+" days were <b>\\(\\{ "+shown.join(", ")+" \\}\\)</b>, with one reading missing. If the mean high temperature was \\("+mStr+"^\\circ\\text{C}\\), find the missing temperature.";
  else prompt="The numbers of pages read over "+n+" evenings were <b>\\(\\{ "+shown.join(", ")+" \\}\\)</b>, with one value missing. If the mean number of pages read was \\("+mStr+"\\), find the missing value.";
  return numq(prompt,ans,0.011,
    "Multiply the mean by the count of values to find the complete total: \\("+mStr+" \\times "+n+" = "+total+"\\). Add the known values: \\("+known.join(" + ")+" = "+knownSum+"\\). Subtract to find the missing value: \\("+total+" - "+knownSum+" = "+ans+"\\). The missing value is <b>\\("+ans+"\\)</b>.",
    {ctx:ctx,vals:vals,missIdx:missIdx,m:m});
});

E("u5-two-set-describe",5,["8.6"],2,"gen",function(){
  var ctx=ri(0,2);
  var sameDir=Math.random()<0.5;
  var names=ctx===0?["Team A","Team B"]:(ctx===1?["Route A","Route B"]:["Shop A","Shop B"]);
  var unit=ctx===0?" points":(ctx===1?" min":" dollars");
  var hiMean=ri(55,85),loMean=hiMean-ri(6,18);
  var hiRng=ri(22,38),loRng=hiRng-ri(8,16);
  var hiIdx=ri(0,1),loIdx=1-hiIdx;
  var means=[0,0],rngs=[0,0];
  means[hiIdx]=hiMean;means[loIdx]=loMean;
  if(sameDir){rngs[hiIdx]=hiRng;rngs[loIdx]=loRng;}
  else{rngs[hiIdx]=loRng;rngs[loIdx]=hiRng;}
  var cName=names[hiIdx],cOther=names[loIdx];
  var sName=sameDir?names[hiIdx]:names[loIdx];
  var sOther=sameDir?names[loIdx]:names[hiIdx];
  var key=cName+" has the higher centre, and "+sName+" is more spread out.";
  var d1=cOther+" has the higher centre, and "+sName+" is more spread out.";
  var d2=cName+" has the higher centre, and "+sOther+" is more spread out.";
  var d3=cOther+" has the higher centre, and "+sOther+" is more spread out.";
  var stem=ctx===0?"Over a season, "+names[0]+" has a mean of \\("+means[0]+unit+"\\) and a range of \\("+rngs[0]+unit+"\\), while "+names[1]+" has a mean of \\("+means[1]+unit+"\\) and a range of \\("+rngs[1]+unit+"\\).":
           (ctx===1?"Over a month, "+names[0]+" has a mean commute of \\("+means[0]+unit+"\\) and a range of \\("+rngs[0]+unit+"\\), while "+names[1]+" has a mean of \\("+means[1]+unit+"\\) and a range of \\("+rngs[1]+unit+"\\).":
           "Over two weeks, "+names[0]+" has mean daily sales of \\("+means[0]+unit+"\\) with a range of \\("+rngs[0]+unit+"\\), while "+names[1]+" has a mean of \\("+means[1]+unit+"\\) with a range of \\("+rngs[1]+unit+"\\).");
  return mcq(stem+" Which statement accurately describes both sets?",
    key,[d1,d2,d3],
    "The mean measures centre: "+cName+" has the larger mean (\\("+Math.max(means[0],means[1])+" > "+Math.min(means[0],means[1])+"\\)), so "+cName+" has the higher centre. The range measures spread: "+sName+" has the larger range (\\("+Math.max(rngs[0],rngs[1])+" > "+Math.min(rngs[0],rngs[1])+"\\)), so "+sName+" is more spread out. Therefore, <b>"+key+"</b>",
    {ctx:ctx,sameDir:sameDir,hiIdx:hiIdx,means:means,rngs:rngs});
});

E("u5-range-missing",5,["8.6"],1,"gen",function(){
  var askHigh=Math.random()<0.5;
  var ctx=ri(0,2);
  var lo=ri(12,48),rng=ri(14,36),hi=lo+rng;
  var ans=askHigh?hi:lo;
  var subj=ctx===0?"a set of biology test scores":(ctx===1?"daily wind speeds (in km/h)":"a set of parcel masses (in kg)");
  var prompt=askHigh?
    "For "+subj+", the lowest value is \\("+lo+"\\) and the range is \\("+rng+"\\). What is the highest value?":
    "For "+subj+", the highest value is \\("+hi+"\\) and the range is \\("+rng+"\\). What is the lowest value?";
  var sol=askHigh?
    "Since \\(\\text{range} = \\text{highest} - \\text{lowest}\\), add the range to the lowest value: \\("+lo+" + "+rng+" = "+hi+"\\). The highest value is <b>\\("+hi+"\\)</b>.":
    "Since \\(\\text{range} = \\text{highest} - \\text{lowest}\\), subtract the range from the highest value: \\("+hi+" - "+rng+" = "+lo+"\\). The lowest value is <b>\\("+lo+"\\)</b>.";
  return numq(prompt,ans,0.011,sol,{askHigh:askHigh,ctx:ctx,lo:lo,hi:hi,rng:rng});
});

E("u5-sd-calc-small",5,["8.9"],2,"gen",function(){
  var ctx=ri(0,2);
  var mu=ri(25,75);
  var devs,vals,sd,tries=0;
  do{
    var a=ri(1,6),b=ri(2,9),c=ri(1,5);
    var d5=a+b-c;
    devs=[-a,-b,c,0,d5];
    // Ensure not all zero and reasonable spread
    vals=devs.map(function(d){return mu+d;});
    sd=psd(vals);
    tries++;
    if(sd>1.2&&sd<12&&Math.abs(sd*100-Math.round(sd*100))>0.02)break;
  }while(tries<80);
  vals=shuffle(vals);
  var ans=Number(fmtF(sd,2));
  var sqDevs=vals.map(function(v){return (v-mu)*(v-mu);});
  var sqSum=sum(sqDevs);
  var vStr=fmt(pvar(vals),2);
  var label=ctx===0?"resting heart rates (in bpm)":(ctx===1?"daily commute distances (in km)":"sample masses (in g)");
  return numq("Calculate the population standard deviation (to two decimal places) of the following "+label+": <b>\\(\\{ "+vals.join(", ")+" \\}\\)</b>.",
    ans,0.011,
    "First find the mean: \\(\\mu = \\frac{"+vals.join(" + ")+"}{5} = "+mu+"\\). Find each squared deviation from \\("+mu+"\\): \\("+sqDevs.join(", ")+"\\), whose sum is \\("+sqSum+"\\). Divide by \\(5\\) to get the population variance \\(\\sigma^2 = \\frac{"+sqSum+"}{5} = "+vStr+"\\), then take the square root: \\(\\sigma = \\sqrt{"+vStr+"} \\approx "+fmtF(sd,2)+"\\). The population standard deviation is <b>\\("+fmtF(sd,2)+"\\)</b>.",
    {ctx:ctx,vals:vals,mu:mu});
});

E("u5-variance-from-sd",5,["8.9"],1,"gen",function(){
  var ctx=ri(0,2);
  var sd=ri(1,24)*0.5;
  var ans=sd*sd;
  var unit=ctx===0?"points":(ctx===1?"cm":"min");
  var unitSq=ctx===0?"\\(\\text{points}^2\\)":(ctx===1?"\\(\\text{cm}^2\\)":"\\(\\text{min}^2\\)");
  var desc=ctx===0?"a set of physics exam scores":(ctx===1?"the heights of greenhouse seedlings":"customer waiting times at a clinic");
  return numq("The population standard deviation of "+desc+" is \\("+fmt(sd,1)+"\\text{ "+unit+"}\\). What is the population variance?",
    ans,0.011,
    "The population variance is the square of the population standard deviation: \\(\\sigma^2 = ("+fmt(sd,1)+")^2 = "+fmt(ans,2)+"\\) "+unitSq+". The population variance is <b>\\("+fmt(ans,2)+"\\)</b>.",
    {ctx:ctx,sd:sd});
});

E("u5-sd-interpret-context",5,["8.10"],2,"gen",function(){
  var ctx=ri(0,3);
  var mu,sd,item,unit;
  if(ctx===0){mu=ri(68,82);sd=ri(4,9);item="math test marks";unit="points";}
  else if(ctx===1){mu=ri(25,42);sd=ri(3,7);item="pizza delivery times";unit="minutes";}
  else if(ctx===2){mu=ri(30,55);sd=ri(3,8);item="sunflower heights";unit="centimetres";}
  else{mu=ri(10,18);sd=ri(2,4);item="tablet battery runtimes";unit="hours";}
  var key="The "+item+" typically lie within about \\("+sd+"\\) "+unit+" of the mean of \\("+mu+"\\) "+unit+".";
  var d1="The difference between the longest and shortest "+item+" is exactly \\("+sd+"\\) "+unit+".";
  var d2="Every single one of the "+item+" is guaranteed to fall within \\("+sd+"\\) "+unit+" of \\("+mu+"\\) "+unit+".";
  var d3="The "+item+" typically lie within about \\("+sd+"\\) "+unit+" of the smallest value in the set.";
  return mcq("A data set of "+item+" has a mean of \\("+mu+"\\) "+unit+" and a population standard deviation of \\("+sd+"\\) "+unit+". What does this standard deviation tell you about the data?",
    key,[d1,d2,d3],
    "Standard deviation measures the typical distance of observations from the mean, expressed in the same units as the data. Here, <b>"+key+"</b>",
    {ctx:ctx,mu:mu,sd:sd});
});

E("u5-sd-match-set",5,["8.10"],2,"gen",function(){
  var useFive=Math.random()<0.5;
  var mu=ri(12,28);
  var sd,baseDevs;
  if(!useFive){
    // 4 values: deviations [-d, -d, d, d] => variance = d^2 => sd = d
    sd=ri(2,6);
    baseDevs=[-sd,-sd,sd,sd];
  }else{
    // 5 values: deviations [-2d, -d, 0, d, 2d] => sum sq = 10 d^2 => var = 2 d^2 (not integer);
    // instead use [-d, -d, 0, d, d] -> sum sq = 4 d^2 -> var = 0.8 d^2 (not integer);
    // use 4 values with [-a, -b, b, a] where (a^2 + b^2)/2 = sd^2, e.g., a=1,b=7 -> 25 -> sd=5; a=2,b=6 -> 20; a=1,b=3 -> 5;
    // or 5 values with [-5, 0, 0, 0, 5] -> sum sq = 50 -> var = 10; [-3,-4,0,4,3] -> 50 -> var=10;
    // [-2,-4,0,4,2] -> 40 -> var=8; [-3,-6,0,6,3] -> 90 -> var=18; [-4,-3,0,3,4]*k -> var = 10 k^2;
    // [-2,-1,0,1,2] -> 10 -> var=2; [-6,-3,0,3,6] -> 90 -> var=18;
    // Use 5 values with [-a, -b, 0, b, a] where 2(a^2+b^2)=5*sd^2 => sd=2: 2(a^2+b^2)=20 => a^2+b^2=10 => a=3, b=1!
    // Or sd=4 => a=6, b=2! Or sd=6 => a=9, b=3!
    var mult=ri(1,3);
    sd=2*mult;
    baseDevs=[-3*mult,-1*mult,0,1*mult,3*mult];
  }
  var keyArr=sorted(baseDevs.map(function(d){return mu+d;}));
  // Distractor 1: same mean, wider spread (double deviations)
  var d1Arr=sorted(baseDevs.map(function(d){return mu+2*d;}));
  // Distractor 2: same spread, shifted mean (+sd)
  var shift=sd+1;
  var d2Arr=sorted(baseDevs.map(function(d){return mu+shift+d;}));
  // Distractor 3: shifted mean and different spread
  var d3Arr=sorted(baseDevs.map(function(d){return mu-shift+2*d;}));
  function fmtSet(arr){return "<b>\\(\\{ "+arr.join(", ")+" \\}\\)</b>";}
  var key=fmtSet(keyArr);
  var ds=[fmtSet(d1Arr),fmtSet(d2Arr),fmtSet(d3Arr)];
  return mcq("A quality-control target requires a sample with a mean of \\("+mu+"\\) and a population standard deviation of \\("+sd+"\\). Which data set meets both targets?",
    key,ds,
    "Check the mean and population standard deviation of each set. For "+key+", the mean is \\(\\frac{"+keyArr.join(" + ")+"}{"+keyArr.length+"} = "+mu+"\\) and the population standard deviation is \\(\\sqrt{\\frac{"+baseDevs.map(function(d){return d*d;}).join(" + ")+"}{"+keyArr.length+"}} = \\sqrt{"+(sd*sd)+"} = "+sd+"\\). The matching set is "+key+".",
    {useFive:useFive,mu:mu,sd:sd,keyArr:keyArr});
});

E("u5-normal-centre-facts",5,["8.11"],1,"gen",function(){
  var frame=ri(0,3);
  var mu=ri(40,90);
  var sd=ri(4,12);
  if(frame===0||frame===3){
    var dir=frame===0?"below":"above";
    var key="\\(50\\%\\)";
    var ds=["\\(34\\%\\)","\\(68\\%\\)","\\(95\\%\\)"];
    return mcq("A normal distribution has a mean of \\("+mu+"\\) and a standard deviation of \\("+sd+"\\). What percent of the data lies "+dir+" the mean?",
      key,ds,
      "Because a normal curve is symmetric about its mean of \\("+mu+"\\), half of the data lies on each side. Thus, <b>"+key+"</b> of the data lies "+dir+" the mean.",
      {frame:frame,mu:mu,sd:sd});
  }else{
    var stat=frame===1?"median":"mode";
    var key="\\("+mu+"\\)";
    var ds=["\\("+(mu-sd)+"\\)","\\("+(mu+sd)+"\\)","\\("+(mu+2*sd)+"\\)"];
    return mcq("A normal distribution has a mean of \\("+mu+"\\) and a standard deviation of \\("+sd+"\\). What is the "+stat+" of the distribution?",
      key,ds,
      "In a normal distribution, the mean, median, and mode are all equal at the centre of symmetry. Therefore, the "+stat+" is <b>"+key+"</b>.",
      {frame:frame,mu:mu,sd:sd});
  }
});

E("u5-isnormal-data",5,["8.12"],2,"gen",function(){
  var fam=ri(0,2);
  var base=ri(20,50);
  var vals,key,d1,d2,d3;
  if(fam===0){
    // Symmetric around base+10: 11 values
    var c=base+10;
    vals=[c-8,c-5,c-3,c-2,c-1,c,c+1,c+2,c+3,c+5,c+8];
    key="Yes, because the values cluster near a central peak and taper symmetrically toward both ends.";
    d1="No, because the values cluster near a central peak and taper symmetrically toward both ends.";
    d2="Yes, because any data set containing more than ten observations is approximately normal.";
    d3="No, because the values form two separate clusters with an empty gap in the middle.";
  }else if(fam===1){
    // Right-skewed: clustered near base, long upper tail
    vals=[base,base+1,base+1,base+2,base+2,base+3,base+5,base+9,base+15,base+22,base+30];
    key="No, because the values pile up at one end with a long tail stretching toward the other end.";
    d1="Yes, because the values pile up at one end with a long tail stretching toward the other end.";
    d2="Yes, because any data set containing more than ten observations is approximately normal.";
    d3="No, because the values form two separate clusters with an empty gap in the middle.";
  }else{
    // Bimodal: two clusters separated by gap
    vals=[base,base+1,base+1,base+2,base+3,base+16,base+17,base+18,base+18,base+19,base+20];
    key="No, because the values form two separate clusters with an empty gap in the middle.";
    d1="Yes, because the values form two separate clusters with an empty gap in the middle.";
    d2="Yes, because any data set containing more than ten observations is approximately normal.";
    d3="No, because the values pile up at one end with a long tail stretching toward the other end.";
  }
  var dealt=shuffle(vals);
  return mcq("Consider the following sample of 11 measurements: <b>\\(\\{ "+dealt.join(", ")+" \\}\\)</b>. Does this data set appear to approximate a normal distribution, and why?",
    key,[d1,d2,d3],
    "Ordering the data gives <b>\\(\\{ "+vals.join(", ")+" \\}\\)</b>. A normal distribution is unimodal and symmetric around a central peak. Here, <b>"+key+"</b>",
    {fam:fam,vals:vals});
});

E("u5-compare-normal-shift",5,["8.13"],2,"gen",function(){
  var ctx=ri(0,2);
  var sameDir=Math.random()<0.5;
  var names=ctx===0?["Orchard A","Orchard B"]:(ctx===1?["Shift A","Shift B"]:["Lake A","Lake B"]);
  var unit=ctx===0?" g":(ctx===1?" s":" cm");
  var hiMu=ri(120,180),loMu=hiMu-ri(12,28);
  var hiSd=ri(11,18),loSd=hiSd-ri(4,7);
  var hiIdx=ri(0,1),loIdx=1-hiIdx;
  var mus=[0,0],sds=[0,0];
  mus[hiIdx]=hiMu;mus[loIdx]=loMu;
  if(sameDir){sds[hiIdx]=hiSd;sds[loIdx]=loSd;}
  else{sds[hiIdx]=loSd;sds[loIdx]=hiSd;}
  var cName=names[hiIdx],cOther=names[loIdx];
  var sName=sameDir?names[hiIdx]:names[loIdx];
  var sOther=sameDir?names[loIdx]:names[hiIdx];
  var key=cName+" is centred higher, and "+sName+" is more spread out.";
  var d1=cOther+" is centred higher, and "+sName+" is more spread out.";
  var d2=cName+" is centred higher, and "+sOther+" is more spread out.";
  var d3=cOther+" is centred higher, and "+sOther+" is more spread out.";
  var subj=ctx===0?"Apple masses":(ctx===1?"Packaging times":"Trout lengths");
  return mcq(subj+" in "+names[0]+" are normally distributed with mean \\("+mus[0]+unit+"\\) and standard deviation \\("+sds[0]+unit+"\\), while those in "+names[1]+" are normally distributed with mean \\("+mus[1]+unit+"\\) and standard deviation \\("+sds[1]+unit+"\\). Which comparison is correct?",
    key,[d1,d2,d3],
    "The mean locates the centre of the normal curve: "+cName+" has the larger mean (\\("+Math.max(mus[0],mus[1])+" > "+Math.min(mus[0],mus[1])+"\\)), so "+cName+" is centred higher. The standard deviation controls spread: "+sName+" has the larger standard deviation (\\("+Math.max(sds[0],sds[1])+" > "+Math.min(sds[0],sds[1])+"\\)), so "+sName+" is more spread out. Thus, <b>"+key+"</b>",
    {ctx:ctx,sameDir:sameDir,hiIdx:hiIdx,mus:mus,sds:sds});
});

E("u5-empirical-tail",5,["8.14"],2,"gen",function(){
  var frame=ri(0,5);
  var ctx=ri(0,2);
  var mu,sd,subj,unit;
  if(ctx===0){mu=ri(70,80);sd=ri(4,8);subj="exam scores";unit="points";}
  else if(ctx===1){mu=ri(50,65);sd=ri(3,6);subj="commute times";unit="minutes";}
  else{mu=ri(150,175);sd=ri(5,9);subj="student heights";unit="cm";}
  var ans,qText,sol;
  if(frame===0){
    ans=16;
    qText="greater than \\("+(mu+sd)+"\\) "+unit;
    sol="Note that \\("+(mu+sd)+" = "+mu+" + "+sd+" = \\mu + \\sigma\\). By the empirical rule, \\(68\\%\\) of data lies within \\(1\\) standard deviation of the mean, leaving \\(100\\% - 68\\% = 32\\%\\) outside. By symmetry, half lies in the upper tail: \\(\\frac{32\\%}{2} = 16\\%\\). The percentage is <b>\\(16\\)</b>.";
  }else if(frame===1){
    ans=16;
    qText="less than \\("+(mu-sd)+"\\) "+unit;
    sol="Note that \\("+(mu-sd)+" = "+mu+" - "+sd+" = \\mu - \\sigma\\). By the empirical rule, \\(68\\%\\) of data lies within \\(1\\) standard deviation of the mean, leaving \\(100\\% - 68\\% = 32\\%\\) outside. By symmetry, half lies in the lower tail: \\(\\frac{32\\%}{2} = 16\\%\\). The percentage is <b>\\(16\\)</b>.";
  }else if(frame===2){
    ans=2.5;
    qText="greater than \\("+(mu+2*sd)+"\\) "+unit;
    sol="Note that \\("+(mu+2*sd)+" = "+mu+" + 2("+sd+") = \\mu + 2\\sigma\\). By the empirical rule, \\(95\\%\\) of data lies within \\(2\\) standard deviations of the mean, leaving \\(100\\% - 95\\% = 5\\%\\) outside. By symmetry, half lies in the upper tail: \\(\\frac{5\\%}{2} = 2.5\\%\\). The percentage is <b>\\(2.5\\)</b>.";
  }else if(frame===3){
    ans=2.5;
    qText="less than \\("+(mu-2*sd)+"\\) "+unit;
    sol="Note that \\("+(mu-2*sd)+" = "+mu+" - 2("+sd+") = \\mu - 2\\sigma\\). By the empirical rule, \\(95\\%\\) of data lies within \\(2\\) standard deviations of the mean, leaving \\(100\\% - 95\\% = 5\\%\\) outside. By symmetry, half lies in the lower tail: \\(\\frac{5\\%}{2} = 2.5\\%\\). The percentage is <b>\\(2.5\\)</b>.";
  }else if(frame===4){
    ans=32;
    qText="either less than \\("+(mu-sd)+"\\) "+unit+" or greater than \\("+(mu+sd)+"\\) "+unit;
    sol="The bounds \\("+(mu-sd)+"\\) and \\("+(mu+sd)+"\\) are \\(\\mu - \\sigma\\) and \\(\\mu + \\sigma\\). By the empirical rule, \\(68\\%\\) of data lies between them, so \\(100\\% - 68\\% = 32\\%\\) lies outside. The percentage is <b>\\(32\\)</b>.";
  }else{
    ans=5;
    qText="either less than \\("+(mu-2*sd)+"\\) "+unit+" or greater than \\("+(mu+2*sd)+"\\) "+unit;
    sol="The bounds \\("+(mu-2*sd)+"\\) and \\("+(mu+2*sd)+"\\) are \\(\\mu - 2\\sigma\\) and \\(\\mu + 2\\sigma\\). By the empirical rule, \\(95\\%\\) of data lies between them, so \\(100\\% - 95\\% = 5\\%\\) lies outside. The percentage is <b>\\(5\\)</b>.";
  }
  return numq("A normal distribution of "+subj+" has a mean of \\("+mu+"\\) "+unit+" and a standard deviation of \\("+sd+"\\) "+unit+". Using the empirical rule, what percent of the "+subj+" are "+qText+"?",
    ans,0.011,sol,{frame:frame,ctx:ctx,mu:mu,sd:sd});
});

E("u5-normal-count-between",5,["8.14"],2,"gen",function(){
  // Band shares between consecutive landmarks [-2, -1, 0, 1, 2]: [13.5, 34, 34, 13.5]
  var shares=[13.5,34,34,13.5];
  var pairs=[];
  for(var i=-2;i<=1;i++){
    for(var j=i+1;j<=2;j++){
      if(i===-2&&j===2)continue;
      pairs.push([i,j]);
    }
  }
  var pair=pick(pairs);
  var loK=pair[0],hiK=pair[1];
  var pct=0;
  for(var idx=loK+2;idx<hiK+2;idx++)pct+=shares[idx];
  // Choose N as a multiple of 200 so pct% of N is an exact integer
  var n=ri(1,10)*200;
  var ans=Math.round(n*pct/100);
  var ctx=ri(0,2);
  var mu,sd,subj,unit;
  if(ctx===0){mu=ri(500,520);sd=ri(8,15);subj="bottles of juice";unit="mL";}
  else if(ctx===1){mu=ri(68,78);sd=ri(4,7);subj="test papers";unit="points";}
  else{mu=ri(35,50);sd=ri(3,6);subj="fish caught";unit="cm";}
  var loVal=mu+loK*sd,hiVal=mu+hiK*sd;
  var bandList=[];
  for(var idx2=loK+2;idx2<hiK+2;idx2++)bandList.push(fmt(shares[idx2],1)+"\\%");
  return numq("In a batch of \\("+n+"\\) "+subj+", the measurements are normally distributed with a mean of \\("+mu+"\\) "+unit+" and a standard deviation of \\("+sd+"\\) "+unit+". Using the empirical rule, about how many "+subj+" measure between \\("+loVal+"\\) "+unit+" and \\("+hiVal+"\\) "+unit+"?",
    ans,0.011,
    "Convert the bounds to standard deviations from the mean: \\("+loVal+" = \\mu "+(loK>=0?"+ "+loK:"- "+(-loK))+"\\sigma\\) and \\("+hiVal+" = \\mu "+(hiK>=0?"+ "+hiK:"- "+(-hiK))+"\\sigma\\). Adding the empirical rule band percentages between them gives \\("+bandList.join(" + ")+" = "+fmt(pct,1)+"\\%\\). Multiply by the total count: \\("+fmt(pct/100,3)+" \\times "+n+" = "+ans+"\\). About <b>\\("+ans+"\\)</b> "+subj+" lie in this interval.",
    {loK:loK,hiK:hiK,n:n,ctx:ctx,mu:mu,sd:sd});
});

E("u5-ci-infer-mean",5,["8.19"],2,"gen",function(){
  var ctx=ri(0,2);
  var mu,moe,subj,unit;
  if(ctx===0){mu=ri(12,24);moe=ri(1,3);subj="laptop battery life";unit="hours";}
  else if(ctx===1){mu=ri(4,9);moe=1;subj="marketable Atlantic cod mass";unit="kg";}
  else{mu=ri(75,110);moe=ri(6,14);subj="June rainfall";unit="mm";}
  var lo=mu-moe,hi=mu+moe;
  var key="The true mean "+subj+" for the entire population is plausibly between "+lo+" "+unit+" and "+hi+" "+unit+".";
  var d1="Every individual measurement of "+subj+" in the population lies between "+lo+" "+unit+" and "+hi+" "+unit+".";
  var d2="The true mean "+subj+" for the entire population is guaranteed to equal exactly "+mu+" "+unit+".";
  var d3="Exactly 95 percent of all individual values of "+subj+" in the population fall between "+lo+" "+unit+" and "+hi+" "+unit+".";
  return mcq("A random sample yields a mean "+subj+" of \\("+mu+"\\) "+unit+" with a 95% confidence interval from \\("+lo+"\\) "+unit+" to \\("+hi+"\\) "+unit+". What can be inferred about the population?",
    key,[d1,d2,d3],
    "A confidence interval for a mean estimates the population parameter \\(\\mu\\), not the spread of individual population members. Thus, <b>"+key+"</b>",
    {ctx:ctx,mu:mu,moe:moe});
});

/* PK tranche pass for Unit 5: flags and accounting properties for
   the five borrowed entries above (the same forEach mechanism as
   the postMid and enrich passes). pkFor is Cluster 5's dependent
   indicator list from the prior knowledge map. */
var PKT_U5_FOR=["8.6","8.7","8.8","8.9","8.10","8.11","8.12","8.13","8.14","8.15","8.16","8.17","8.18","8.19","8.20","8.21","8.22","PK.1"];
var PKT_U5={
 "u5-pk-sample-or-population":{src:"math-9:11.3",group:"sample-population"},
 "u5-pk-generalization-critique":{src:"math-9:11.6",group:"data-claims"},
 "u5-pk-freq-mean":{src:"math-9:11.9",group:"freq-table"},
 "u5-pk-sample-scale":{src:"math-9:11.6",group:"sample-scale"},
 "u5-pk-supported-conclusion":{src:"math-9:11.9",group:"data-claims"}};
BANK.forEach(function(e){var t=PKT_U5[e.id];if(t){e.pkFlag=true;e.pkSrc=t.src;e.pkFor=PKT_U5_FOR.slice();e.pkGroup=t.group;}});
