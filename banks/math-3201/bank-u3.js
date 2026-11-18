// Math 3201 Unit 3 Sinusoidal Functions question bank
// CRMARKS: u3-build-equation=2
// CRMARKS: u3-characteristics-combo-cr=2
// CRMARKS: u3-data-equation=2
// CRMARKS: u3-data-fit-params=1
// CRMARKS: u3-decimal-convert=1
// CRMARKS: u3-deg-to-rad=1
// CRMARKS: u3-eq-amplitude-period=1
// CRMARKS: u3-eq-phase-shift=1
// CRMARKS: u3-eq-range-midline=1
// CRMARKS: u3-evaluate-equation-cr=3
// CRMARKS: u3-ferris-interpret=1
// CRMARKS: u3-first-max-time-cr=2
// CRMARKS: u3-graph-amplitude=1
// CRMARKS: u3-graph-full-equation=4
// CRMARKS: u3-graph-period-midline=1
// CRMARKS: u3-graph-range=1
// CRMARKS: u3-match-eq-graph=2
// CRMARKS: u3-rad-to-deg=1
// CRMARKS: u3-temp-model=3
// CRMARKS: u3-tide-predict=3
/* ================= Unit 3: Sinusoidal Functions ================= */
function radFrac(deg){var g=gcd2(deg,180);return [deg/g,180/g];}
function radStr(n,d){if(n===0)return "0";if(d===1)return n===1?"\\pi":(n+"\\pi");if(n===1)return "\\frac{\\pi}{"+d+"}";return "\\frac{"+n+"\\pi}{"+d+"}";}
function sinS(a,trig,b,c,d){
  var s=(a===1?"":(a===-1?"-":(a<0?"- "+Math.abs(a):""+a)))+" \\"+trig+" ";
  if(b!==1)s+=fmt(b);
  s+=" (x"+(c===0?"":(c>0?" - "+c+"^\\circ":" + "+(-c)+"^\\circ"))+")";
  if(d!==0)s+=(d>0?" + ":" - ")+Math.abs(d);
  return "y = "+s;
}
function sinFn(a,trig,b,c,d){return function(x){var ang=b*(x-c)*Math.PI/180;return a*(trig==="sin"?Math.sin(ang):Math.cos(ang))+d;};}

/* ================= Unit 3: Sinusoidal Functions ================= */
function radFrac(deg){var g=gcd2(deg,180);return [deg/g,180/g];}
function radStr(n,d){if(n===0)return "0";if(d===1)return n===1?"\\pi":(n+"\\pi");if(n===1)return "\\frac{\\pi}{"+d+"}";return "\\frac{"+n+"\\pi}{"+d+"}";}
function sinS(a,trig,b,c,d){
  var s=(a===1?"":(a===-1?"-":(a<0?"- "+Math.abs(a):""+a)))+" \\"+trig+" ";
  if(b!==1)s+=fmt(b);
  s+=" (x"+(c===0?"":(c>0?" - "+c+"^\\circ":" + "+(-c)+"^\\circ"))+")";
  if(d!==0)s+=(d>0?" + ":" - ")+Math.abs(d);
  return "y = "+s;
}
function sinFn(a,trig,b,c,d){return function(x){var ang=b*(x-c)*Math.PI/180;return a*(trig==="sin"?Math.sin(ang):Math.cos(ang))+d;};}
E("u3-deg-to-rad",3,["7.1"],1,"gen",function(){
  var pool=[];for(var v=15;v<=345;v+=5){if(v!==180)pool.push(v);}
  var d,opts,tries=0;
  do{d=pick(pool);var f=radFrac(d);
    var d45=(d+45<=360)?d+45:d-45;
    var cands=[radStr(f[0],f[1]),radStr.apply(null,radFrac(360-d)),radStr.apply(null,radFrac(d45)),radStr.apply(null,radFrac(2*d))];
    opts=cands;tries++;}
  while(new Set(cands).size<4&&tries<40);
  return mcq("Express \\("+d+"^\\circ\\) in radians.",
    "\\("+radStr(f[0],f[1])+"\\)",["\\("+cands[1]+"\\)","\\("+cands[2]+"\\)","\\("+cands[3]+"\\)"],
    "Multiply by \\(\\frac{\\pi}{180^\\circ}\\): \\("+d+"^\\circ \\times \\frac{\\pi}{180^\\circ} = "+radStr(f[0],f[1])+"\\) (the fraction \\(\\frac{"+d+"}{180}\\) reduces by "+gcd2(d,180)+").",
    {d:d});
});
E("u3-rad-to-deg",3,["7.1"],1,"gen",function(){
  var pool5=[];for(var v=15;v<=345;v+=5){if(v!==180)pool5.push(v);}
  var d=pick(pool5),f=radFrac(d),pool,tries=0;
  do{pool=[d/2,(d+90)%360||360,(3*d/2)%360||(3*d/2),360-d,2*d].filter(function(v){return v!==d&&v>0;});
    pool=pool.filter(function(v,i){return pool.indexOf(v)===i;});tries++;}
  while(pool.length<3&&tries<20);
  return mcq("Express \\("+radStr(f[0],f[1])+"\\) radians in degrees.",
    ""+d,[""+pool[0],""+pool[1],""+pool[2]],
    "Multiply by \\(\\frac{180^\\circ}{\\pi}\\): \\("+radStr(f[0],f[1])+" \\times \\frac{180^\\circ}{\\pi} = "+d+"^\\circ\\).",
    {d:d});
});
E("u3-decimal-convert",3,["7.1"],1,"gen",function(){
  if(Math.random()<0.5){
    var r=pick([0.2,0.3,0.5,0.7,0.8,0.9,1.1,1.2,1.4,1.6,1.9,2.2,2.4,2.7,2.9,3.3,3.6,3.9,4.2,4.5,4.8,5.1,5.5,5.9,6.1]);
    var deg=r*180/Math.PI;
    return numq("Convert "+r+" radians to degrees, to the nearest degree.",
      Math.round(deg),1.5,
      "Multiply by \\(\\frac{180^\\circ}{\\pi}\\): \\("+r+" \\times \\frac{180^\\circ}{\\pi} \\approx "+fmt(deg,1)+"^\\circ\\), which rounds to <b>"+Math.round(deg)+"°</b>. A proportion works the same way: \\(\\frac{180^\\circ}{\\pi} = \\frac{x}{"+r+"}\\).",
      {r:r});
  }
  var dg=pick([55,65,70,80,85,95,100,105,115,125,140,155,160,170,185,195,200,205,215,230,245,250,260,275,290,305,320,325,335,350]);
  var rad=dg*Math.PI/180;
  return numq("Convert \\("+dg+"^\\circ\\) to radians, to two decimal places.",
    Math.round(rad*100)/100,0.02,
    "Multiply by \\(\\frac{\\pi}{180^\\circ}\\): \\("+dg+" \\times \\frac{\\pi}{180} \\approx "+fmt(rad,3)+"\\), which rounds to <b>"+fmt(Math.round(rad*100)/100,2)+"</b> radians.",
    {dg:dg});
});
E("u3-graph-amplitude",3,["7.2"],1,"gen",function(){
  var a=pick([2,3,4,5]),d=pick([-3,-2,-1,1,2,3,4]),trig=pick(["sin","cos"]),b=pick([1,2]);
  while(d===a||d===2*a)d=pick([-3,-2,-1,1,2,3,4]);
  var fn=sinFn(a,trig,b,0,d);
  var corr=""+a;
  var q=mcq("What is the <b>amplitude</b> of the sinusoidal function shown?",
    corr,[""+(a+d),""+d,""+(2*a)],
    "The graph peaks at \\(y = "+(a+d)+"\\) and bottoms out at \\(y = "+(d-a)+"\\), so the midline is \\(y = "+d+"\\). The amplitude is the distance from the midline to a peak: \\("+ (a+d) +" - "+d+" = "+a+"\\). It is not the maximum value "+(a+d)+", which is the trap here.",
    {a:a,d:d,trig:trig});
  q.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:90,gy:1,labelX:true,labelY:true});
  return q;
});
E("u3-graph-period-midline",3,["7.2"],1,"gen",function(){
  var feat=pick(["period","midline"]);
  var b=pick([1,2]),a=pick([2,3,4]),d=pick([-3,-2,-1,0,1,2,3]),trig=pick(["sin","cos"]);
  while(new Set([d,a,d+a,(-d===0?1:-d)]).size<4){a=pick([2,3,4]);d=pick([-3,-2,-1,0,1,2,3]);}
  var fn=sinFn(a,trig,b,0,d),per=360/b;
  if(feat==="period"){
    var pd=(b===1)?["180","720","90"]:[""+b,""+(360*b),""+(per/2)];
    var q=mcq("What is the <b>period</b> of the sinusoidal function shown, in degrees?",
      ""+per,pd,
      "One complete cycle of the graph spans "+per+"° before the pattern repeats (measure peak to peak or start to start of a cycle). The period is <b>"+per+"°</b>. The coefficient \\(b = "+b+"\\) is not itself the period; the period is \\(\\frac{360^\\circ}{b}\\).",
      {feat:feat,b:b});
    q.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:90,gy:1,labelX:true,labelY:true});
    return q;
  }
  var q2=mcq("What is the <b>equation of the midline</b> (sinusoidal axis) of the function shown?",
    "y = "+d,["y = "+a,"y = "+(d+a),"y = "+(-d===0?1:-d)],
    "The graph oscillates evenly between \\(y = "+(d+a)+"\\) and \\(y = "+(d-a)+"\\); the midline sits halfway between them: \\(\\frac{"+(d+a)+" + ("+(d-a)+")}{2} = "+d+"\\). The midline is <b>\\(y = "+d+"\\)</b>.",
    {feat:feat,d:d});
  q2.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:90,gy:1,labelX:true,labelY:true});
  return q2;
});
E("u3-graph-range",3,["7.2"],1,"gen",function(){
  var a=pick([2,3,4,5]),d=pick([-4,-3,-1,2,3,5]),trig=pick(["sin","cos"]),bb=pick([1,2]);
  var fn=sinFn(a,trig,bb,0,d),lo=d-a,hi=d+a;
  var corr="\\(\\{y \\mid "+lo+" \\le y \\le "+hi+", \\ y \\in \\mathbb{R}\\}\\)";
  var q=mcq("What is the <b>range</b> of the sinusoidal function shown?",
    corr,
    ["\\(\\{y \\mid "+(-a)+" \\le y \\le "+a+", \\ y \\in \\mathbb{R}\\}\\)",
     "\\(\\{y \\mid "+d+" \\le y \\le "+hi+", \\ y \\in \\mathbb{R}\\}\\)",
     "\\(\\{y \\mid y \\le "+hi+", \\ y \\in \\mathbb{R}\\}\\)"],
    "The lowest point of the graph is \\(y = "+lo+"\\) and the highest is \\(y = "+hi+"\\), and the smooth wave takes every value in between. The range is <b>"+corr+"</b>. Forgetting the vertical shift gives the \\([-"+a+", "+a+"]\\) distractor.",
    {a:a,d:d});
  q.figure=plotSVG(fn,0,720,lo-2,hi+2,{gx:90,gy:1,labelX:true,labelY:true});
  return q;
});
E("u3-periodic-or-sinusoidal",3,["7.3"],1,"gen",function(){
  var fam=pick(["sinusoidal","triangle","square","parabola"]),fn,x1=pick([9,10,12]);
  if(fam==="sinusoidal"){var A1=pick([1.5,2,2.5]),W1=pick([1.2,1.6,2.1]),D1=pick([-0.5,0,0.8]);fn=function(x){return A1*Math.sin(W1*x)+D1;};}
  else if(fam==="triangle"){var P1=pick([3,4,5]),A2=pick([1,1.5]);fn=function(x){var t=((x%P1)+P1)%P1,u=t/P1*4;return A2*(u<1?u:(u<3?2-u:u-4));};}
  else if(fam==="square"){var A3=pick([1,1.4]),W3=pick([Math.PI/2,Math.PI/3]);fn=function(x){return Math.sin(W3*x)>=0?A3:-A3;};}
  else{var VX=pick([4,5,6]),CF=pick([0.1,0.15]);fn=function(x){return CF*(x-VX)*(x-VX)-1.5;};}
  var corr=fam==="sinusoidal"?"Periodic and sinusoidal":(fam==="parabola"?"Not periodic":"Periodic, but not sinusoidal");
  var q=mcq("Which statement best describes the function shown in the graph?",
    corr,
    ["Periodic and sinusoidal","Periodic, but not sinusoidal","Not periodic","Sinusoidal, but not periodic"].filter(function(v){return v!==corr;}),
    (fam==="sinusoidal"?"The pattern repeats every cycle and each cycle is a smooth wave, so the function is periodic and sinusoidal.":
     fam==="parabola"?"The graph never repeats a cycle; it is a single U-shape, so it is not periodic (and therefore not sinusoidal either).":
     "The pattern does repeat, so the function is periodic, but the cycles are "+(fam==="triangle"?"straight-line zigzags":"flat steps")+", not the smooth wave shape of a sine or cosine curve. Every sinusoidal function is periodic, but not every periodic function is sinusoidal.")+" The answer is: <b>"+corr.toLowerCase()+"</b>.",
    {fam:fam});
  q.figure=plotSVG(fn,0,x1,-3,4,{gx:1,gy:1});
  return q;
});
E("u3-ferris-interpret",3,["7.3"],1,"var",varset([
  function(){var fn=function(t){return 9-7*Math.cos(30*t*Math.PI/180);};
    var q=mcq("The graph shows the height of a rider on a Ferris wheel at a St. John's fair, in metres, over time in minutes. Riders board at the lowest point of the ride. What is the <b>boarding height</b>?",
      "2 m",["9 m","16 m","7 m"],
      "Boarding happens at the lowest point of the graph. The curve bottoms out at 2 m (it peaks at 16 m, and the midline y = 9 m is the axle height). The boarding height is <b>2 m</b>.",{});
    q.figure=plotSVG(fn,0,24,0,18,{gx:2,gy:2,labelX:true,labelY:true});return q;},
  function(){var fn=function(t){return 11-9*Math.cos(22.5*t*Math.PI/180);};
    var q=mcq("The graph shows a rider's height on a Ferris wheel over one full rotation. The period of the graph is 16 minutes. What does the <b>period</b> represent in this situation?",
      "The time the wheel takes to complete one full rotation",
      ["The time it takes to first reach the very top of the wheel","The height of the centre (axle) of the wheel above the ground","The diameter of the wheel, measured from side to side"],
      "The period is the length of one complete cycle of the repeating pattern. Here one cycle is one full trip around the wheel, so the period is the time for one complete rotation, 16 minutes.",{});
    q.figure=plotSVG(fn,0,16,0,22,{gx:2,gy:2,labelX:true,labelY:true});return q;},
  function(){var fn=function(t){return 10-8*Math.cos(36*t*Math.PI/180);};
    var q=mcq("The graph shows a rider's height on a Ferris wheel, in metres, over time. The midline of the graph is \\(y = 10\\). What does the <b>midline</b> represent in this situation?",
      "The height of the wheel's centre (axle) above the ground",
      ["The greatest height a rider reaches at the top of the wheel","The diameter of the wheel, measured from side to side","The height above the ground where riders board the wheel"],
      "The height oscillates evenly between 2 m and 18 m around the midline y = 10. Halfway between the top and bottom of the ride is the centre of the wheel, so the midline gives the axle height, 10 m.",{});
    q.figure=plotSVG(fn,0,10,0,20,{gx:1,gy:2,labelX:true,labelY:true});return q;}
]));
E("u3-eq-amplitude-period",3,["7.4"],1,"gen",function(){
  var feat=pick(["amplitude","period"]);
  var a=pick([2,3,4,5])*pick([1,-1]),b=pick([0.5,1,2,3]),c=pick([0,20,40]),d=pick([-3,-1,0,2]),trig=pick(["sin","cos"]),tries=0;
  while((Math.abs(a)===b||d===Math.abs(a)||b===d)&&tries<40){a=pick([2,3,4,5])*pick([1,-1]);b=pick([0.5,1,2,3]);d=pick([-3,-1,0,2]);tries++;}
  var eq=sinS(a,trig,b,c,d);
  function normOpts(key,ds){
    function dp(s){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);return m?(m[2]?m[2].length:0):null;}
    function pad(s,t){var m=String(s).match(/^(-?\d+(?:\.(\d+))?)(%?)$/);if(!m)return s;var cur=m[2]?m[2].length:0;if(cur>=t)return s;var base=m[1];if(cur===0)base+=".";for(var i=cur;i<t;i++)base+="0";return base+(m[3]||"");}
    var all=[key].concat(ds),guard=0;
    while(guard++<12){
      var dps=all.map(dp);if(dps.some(function(d){return d===null;}))break;
      var cnt={};dps.forEach(function(d){cnt[d]=(cnt[d]||0)+1;});
      var sing=Object.keys(cnt).filter(function(k){return cnt[k]===1;}).map(Number);
      if(!sing.length)break;
      var s=Math.max.apply(null,sing),cand=-1,candDp=-1,i;
      for(i=1;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}
      if(cand<0){for(i=0;i<all.length;i++){if(dps[i]<s&&dps[i]>candDp){cand=i;candDp=dps[i];}}}
      if(cand<0){var idxS=dps.indexOf(s),above=dps.filter(function(d){return d>s;});if(!above.length)break;all[idxS]=pad(all[idxS],Math.min.apply(null,above));}
      else{all[cand]=pad(all[cand],s);}
    }
    return [all[0],all.slice(1)];
  }
  if(feat==="amplitude"){
    var _na=normOpts(""+Math.abs(a),[""+b,""+d,""+(2*Math.abs(a))]);
    return mcq("What is the <b>amplitude</b> of \\("+eq+"\\)?",
      _na[0],_na[1],
      "The amplitude is \\(|a|\\), the size of the coefficient in front of the "+trig+" term: \\(|"+a+"| = "+Math.abs(a)+"\\). The sign of \\(a\\) only flips the graph; it does not change the amplitude.",
      {feat:feat,a:a,b:b});
  }
  var per=360/b;
  var _np=normOpts(""+per,[""+b,""+(360*b===per?180:360*b),""+(per===360?90:360)]);
  return mcq("What is the <b>period</b>, in degrees, of \\("+eq+"\\)?",
    _np[0],_np[1],
    "The period is \\(\\frac{360^\\circ}{b} = \\frac{360^\\circ}{"+b+"} = "+per+"^\\circ\\). The coefficient \\(b = "+b+"\\) compresses or stretches the basic cycle; it is not the period itself.",
    {feat:feat,b:b,per:per});
});
E("u3-eq-range-midline",3,["7.4"],1,"gen",function(){
  var feat=pick(["range","midline"]);
  var a=pick([2,3,4,5])*pick([1,-1]),d=pick([-4,-2,-1,1,3]),trig=pick(["sin","cos"]),tg=0;
  while((new Set([d,a,-d,d+Math.abs(a)]).size<4||d===0)&&tg<60){a=pick([2,3,4,5])*pick([1,-1]);d=pick([-4,-2,-1,1,3]);tg++;}
  var eq=sinS(a,trig,pick([1,2]),pick([0,30]),d),lo=d-Math.abs(a),hi=d+Math.abs(a);
  if(feat==="midline"){
    return mcq("What is the <b>equation of the midline</b> of \\("+eq+"\\)?",
      "y = "+d,["y = "+a,"y = "+(-d),"y = "+(d+Math.abs(a))],
      "The midline is set by the vertical shift \\(d\\): the graph oscillates evenly around \\(y = d = "+d+"\\). The value \\("+hi+"\\) is the maximum, not the midline.",
      {feat:feat,d:d});
  }
  return mcq("What is the <b>range</b> of \\("+eq+"\\)?",
    "\\(\\{y \\mid "+lo+" \\le y \\le "+hi+"\\}\\)",
    ["\\(\\{y \\mid "+(-Math.abs(a))+" \\le y \\le "+Math.abs(a)+"\\}\\)","\\(\\{y \\mid "+d+" \\le y \\le "+hi+"\\}\\)","\\(\\{y \\mid "+lo+" \\le y \\le "+d+"\\}\\)"],
    "The amplitude is \\(|a| = "+Math.abs(a)+"\\), so the graph runs from \\(d - |a| = "+lo+"\\) up to \\(d + |a| = "+hi+"\\) around the midline \\(y = "+d+"\\). The interval that stops at the midline, and the one that forgets the vertical shift, are the traps.",
    {feat:feat,a:a,d:d});
});
E("u3-eq-phase-shift",3,["7.4"],1,"var",varset([
  function(){
  var c=pick([15,30,45,60,90])*pick([1,-1]),a=pick([1,2,3]),d=pick([-2,0,1]),trig=pick(["sin","cos"]);
  var eq=sinS(a,trig,pick([1,2]),c,d);
  var corr=(c>0)?("Shifted right "+c+"°"):("Shifted left "+(-c)+"°");
  return mcq("Compared with the graph of \\(y = "+(a===1?"":a)+" \\"+trig+" x"+(d!==0?((d>0?" + ":" - ")+Math.abs(d)):"")+"\\), how is the graph of \\("+eq+"\\) shifted horizontally?",
    corr,
    [(c>0?("Shifted left "+c+"°"):("Shifted right "+(-c)+"°")),"Shifted up "+Math.abs(c)+"°","There is no horizontal shift"],
    "In the form \\(y = a \\"+trig+" b(x - c) + d\\), the value inside the brackets with \\(x\\) gives the horizontal shift: here \\(c = "+c+"\\), so the graph moves "+(c>0?"right by "+c+"°":"left by "+(-c)+"°")+". The trap is reading the sign backwards: \\((x - "+Math.abs(c)+"^\\circ)\\) shifts right, not left.",
    {c:c});
},
  function(){
    var c=pick([15,30,45,60,90])*pick([1,-1]),a=pick([1,2,3]),d=pick([-2,0,1]),trig=pick(["sin","cos"]);
    var b=pick([1,2]);
    var eq=sinS(a,trig,b,c,d);
    var corr=(c>0)?("Shifted right "+c+"°"):("Shifted left "+(-c)+"°");
    var q=mcq("Compared with the graph of \\(y = "+(a===1?"":a)+" \\"+trig+" x"+(d!==0?((d>0?" + ":" - ")+Math.abs(d)):"")+"\\), how is the graph of \\("+eq+"\\) (graphed below) shifted horizontally?",
      corr,
      [(c>0?("Shifted left "+c+"°"):("Shifted right "+(-c)+"°")),"Shifted up "+Math.abs(c)+"°","There is no horizontal shift"],
      "In the form \\(y = a \\"+trig+" b(x - c) + d\\), the value inside the brackets with \\(x\\) gives the horizontal shift: here \\(c = "+c+"\\), so the graph moves "+(c>0?"right by "+c+"°":"left by "+(-c)+"°")+". The trap is reading the sign backwards: \\((x - "+Math.abs(c)+"^\\circ)\\) shifts right, not left.",
      {c:c});
    var x0=(c<0?-180:0);
    q.figure=fnPlotSVG(sinFn(a,trig,b,c,d),x0,x0+720,d-a-1,d+a+1,{gx:15,gy:1,labelX:true,labelY:true,labelEvery:6,points:[[c,trig==="sin"?d:a+d]]});
    return q;
  }
]));
E("u3-match-eq-graph",3,["7.5"],2,"gen",function(){
  var a=pick([2,3,4]),b=pick([1,2,3]),d=pick([-3,-2,-1,1,2,3]),trig=pick(["sin","cos"]);
  var fn=sinFn(a,trig,b,0,d);
  var alt=(trig==="sin")?"cos":"sin";
  var q=mcq("Which equation matches the graphed sinusoidal function?",
    "\\("+sinS(a,trig,b,0,d)+"\\)",
    ["\\("+sinS(a,alt,b,0,d)+"\\)","\\("+sinS(a,trig,2*b,0,d)+"\\)","\\("+sinS(a,trig,b,0,-d)+"\\)"],
    "Read the graph: the maximum is "+(a+d)+" and the minimum is "+(d-a)+", giving amplitude "+a+" and midline \\(y = "+d+"\\). A full cycle takes "+(360/b)+"°, so \\(b = "+b+"\\). The curve "+(trig==="sin"?"starts on the midline and rises, the sine pattern":"starts at its maximum, the cosine pattern")+", which pins down the correct equation.",
    {a:a,b:b,d:d,trig:trig});
  q.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:90,gy:1,labelX:true,labelY:true});
  return q;
});
E("u3-build-equation",3,["7.5"],2,"gen",function(){
  var M=pick([6,8,9,10,12]),m=pick([-4,-2,-1,1,2]),P=pick([120,180,360,720]);
  while(((M+m)%2!==0)||m===0||(M-m)/2<1){M=pick([6,8,9,10,12]);m=pick([-4,-2,-1,1,2]);}
  var a=(M-m)/2,d=(M+m)/2,b=360/P;
  var q=mcq("A sinusoidal function has maximum value "+M+", minimum value "+m+", and period "+P+"°. It starts at its midline and rises first. Which equation models it?",
    "\\("+sinS(a,"sin",b,0,d)+"\\)",
    ["\\("+sinS(-a,"sin",b,0,d)+"\\)","\\("+sinS(a,"sin",360/(2*P),0,d)+"\\)","\\("+sinS(a,"sin",b,0,a)+"\\)"],
    "Amplitude: \\(\\frac{"+M+" - ("+m+")}{2} = "+a+"\\). Midline: \\(\\frac{"+M+" + ("+m+")}{2} = "+d+"\\). Period "+P+"° gives \\(b = \\frac{360}{"+P+"} = "+fmt(b)+"\\). Starting at the midline and rising is the sine pattern with a positive amplitude, so the model is \\("+sinS(a,"sin",b,0,d)+"\\).",
    {M:M,m:m,P:P});
  return q;
});
E("u3-graph-full-equation",3,["7.2","7.5"],3,"gen",function(){
  var a=pick([2,3,4]),c=pick([30,45,60,90,120]),d=pick([-3,-2,-1,1,2,3]);
  var fn=sinFn(a,"sin",1,c,d);
  var q=mcq("Which equation, in degrees, matches the graphed sinusoidal function?",
    "\\("+sinS(a,"sin",1,c,d)+"\\)",
    ["\\("+sinS(a,"sin",1,-c,d)+"\\)","\\("+sinS(a,"cos",1,c,d)+"\\)","\\("+sinS(a,"sin",1,c,-d)+"\\)"],
    "Extract all four values from the graph: the maximum "+(a+d)+" and minimum "+(d-a)+" give amplitude "+a+" and midline \\(y = "+d+"\\); one cycle spans 360°, so \\(b = 1\\); and the rising midline crossing is shifted "+c+"° right of the origin, so the phase shift is \\(c = "+c+"^\\circ\\) in a sine model. Only the correct option gets all four right.",
    {a:a,c:c,d:d});
  q.figure=plotSVG(fn,0,720,-(a+Math.abs(d)+2),a+Math.abs(d)+2,{gx:30,gy:1,labelX:true,labelY:true,labelEvery:3});
  return q;
});
E("u3-data-fit-params",3,["7.6"],1,"gen",function(){
  var a=pick([1.5,2,2.5,3,3.5,4]),d=pick([2,3,4,5,6,8,10]),feat=pick(["amplitude","period"]);
  while(d===a||2*a===d)d=pick([2,3,4,5,6,8,10]);
  var xs=[0,3,6,9,12],ys=[d,d+a,d,d-a,d];
  var tbl=tblHTML(xs,ys.map(function(v){return fmt(v);}),"Time (h)","Height (m)");
  var fig=fnPlotSVG(null,-1,13,Math.floor(d-a)-1,Math.ceil(d+a)+1,{gx:3,gy:1,labelX:true,labelY:true,points:xs.map(function(x,ix){return [x,ys[ix]];})});
  if(feat==="amplitude"){
    var q=mcq("Heights of a tide in Petty Harbour are recorded every 3 hours. "+tbl+" Which value, in metres, is the <b>amplitude</b> of a sinusoidal model of this data?",
      fmt(a),[fmt(d),fmt(d+a),fmt(2*a)],
      "The heights run from a low of "+fmt(d-a)+" m to a high of "+fmt(d+a)+" m around a midline of "+fmt(d)+" m. The amplitude is the distance from the midline to the high: "+fmt(d+a)+" - "+fmt(d)+" = <b>"+fmt(a)+" m</b>.",
      {feat:feat,a:a,d:d}); q.figure=fig; return q;
  }
  var q=mcq("Heights of a tide in Petty Harbour are recorded every 3 hours. "+tbl+" Which value, in hours, is the <b>period</b> of a sinusoidal model of this data?",
    "12",["6","24","3"],
    "The pattern high, mid, low, mid returns to its starting height at 12 h (high at 3 h repeats at 15 h), so one full cycle takes <b>12 h</b>. The 6 h figure is only the high-to-low half cycle.",
    {feat:feat,a:a,d:d}); q.figure=fig; return q;
});
E("u3-data-equation",3,["7.6"],2,"gen",function(){
  var a=pick([2,3,4]),d=pick([3,4,5,6,8,10]),b=pick([15,30]),fam=pick(["sin","cos"]);
  while(d===a)d=pick([3,4,5,6,8,10]);
  var per=360/b,xs=[0,per/4,per/2,3*per/4,per];
  var ys=(fam==="sin")?[d,d+a,d,d-a,d]:[d+a,d,d-a,d,d+a];
  var alt=(fam==="sin")?"cos":"sin";
  var tbl=tblHTML(xs,ys,"Time (h)","Depth (m)");
  var fig=fnPlotSVG(null,-1,per+1,d-a-1,d+a+1,{gx:per/4,gy:1,labelX:true,labelY:true,points:xs.map(function(x,ix){return [x,ys[ix]];})});
  function eqFor(aa,tr,bb,dd){return sinS(aa,tr,bb,0,dd).replace("y =","D(t) =").replace("(x","(t");}
  var q=mcq("The depth of water at a wharf is recorded over one full tidal cycle. "+tbl+" Which equation, with \\(t\\) in hours, models the depth?",
    "\\("+eqFor(a,fam,b,d)+"\\)",
    ["\\("+eqFor(a,alt,b,d)+"\\)",
     "\\("+eqFor(d,fam,b,a)+"\\)",
     "\\("+eqFor(a,fam,2*b,d)+"\\)"],
    (fam==="sin"?"The depth starts at the midline value "+d+" and rises to "+(d+a)+", the sine pattern starting at its midline.":"The depth starts at its maximum "+(d+a)+" and falls, the cosine pattern starting at a peak.")+" The midline is "+d+", the amplitude is "+a+", and the cycle takes "+per+" h, so \\(b = \\frac{360}{"+per+"} = "+b+"\\) with the cycle measured in degrees. The model is \\("+eqFor(a,fam,b,d)+"\\).",
    {a:a,d:d,b:b,fam:fam}); q.figure=fig; return q;
});
E("u3-tide-predict",3,["7.7"],3,"gen",function(){
  var H=pick([3.6,4.2,4.8,5.4]),L=pick([0.4,0.6,0.8,1.2]);
  var h1=pick([1,2,3]),off=pick([0,3,6,9]),cycles=pick([1,2]);
  var t=h1+6+12*cycles+off,ans=(off===0?L:(off===6?H:(H+L)/2));
  return numq("At a harbour, high tide of "+H+" m occurs at "+h1+":00 and the following low tide of "+L+" m occurs 6 hours later. The tides follow a sinusoidal pattern with a period of 12 hours. What is the height of the tide, in metres, at time "+t+":00?",
    Math.round(ans*100)/100,0.01,
    "Work out where "+t+":00 falls in the cycle. Low tide is at "+(h1+6)+":00 and the pattern repeats every 12 hours, so lows also occur at "+(h1+6+12)+":00 and "+(h1+6+24)+":00, and highs 6 hours after each low. "+(off===0?"The time "+t+":00 lands exactly on a low tide.":(off===6?"The time "+t+":00 lands exactly on a high tide.":"The time "+t+":00 lands halfway between a high and a low, on the midline, whose height is the average \\(\\frac{"+H+" + "+L+"}{2}\\)."))+" The height is <b>"+fmt(Math.round(ans*100)/100)+" m</b>.",
    {H:H,L:L,t:t,off:off});
});
E("u3-temp-model",3,["7.7"],3,"var",varset([
  function(){return numq("The temperature in Gander over a day is modelled by \\(T(t) = 6 \\sin 15^\\circ(t - 9) + 14\\), where \\(t\\) is the hour of the day. At what hour does the temperature first reach its daily maximum?",
    15,0.01,
    "The maximum occurs when the sine factor first equals 1, at an angle of 90°: \\(15(t - 9) = 90\\) gives \\(t - 9 = 6\\), so \\(t = 15\\). The temperature first peaks at <b>15:00</b> (3 PM), at 20°C.",{});},
  function(){return numq("A Ferris wheel rider's height is modelled by \\(h(t) = 10 - 9 \\cos 36^\\circ t\\), with \\(h\\) in metres and \\(t\\) in minutes. The wheel starts at the bottom. What is the rider's height after 2.5 minutes?",
    10,0.01,
    "The period is \\(\\frac{360}{36} = 10\\) minutes, so 2.5 minutes is a quarter of a rotation: the rider has climbed to the level of the axle, halfway between the bottom (1 m) and the top (19 m). Checking with the model: \\(\\cos(36 \\times 2.5) = \\cos 90^\\circ = 0\\), so \\(h = 10 - 0 = 10\\) m.",{});},
  function(){return numq("The depth of water at a dock is modelled by \\(H(t) = 1.8 \\sin 30^\\circ(t - 3) + 2.6\\), with \\(H\\) in metres and \\(t\\) in hours. What is the depth at \\(t = 9\\) hours?",
    2.6,0.01,
    "Evaluate the phase first: \\(30(9 - 3) = 180^\\circ\\), and \\(\\sin 180^\\circ = 0\\). So \\(H(9) = 1.8(0) + 2.6 = 2.6\\) m, the midline depth, halfway between high and low water.",{});}
]));

/* ---------- Unit-test pool fix, Nov 9, 2026: three Level 2 CR entries (3, 2 and 2 marks). The Level 2 CR pool held only three 2-mark entries, so the remainders behind the Level 3 picks could not form. ---------- */
E("u3-evaluate-equation-cr",3,["7.4"],2,"gen",function(){
  var cb=pick([[15,30],[15,90],[15,150],[15,270],[30,30],[30,90],[30,150],[30,270],[45,90],[45,270],[60,90],[60,270],[90,90],[90,180],[90,270]]);
  var b=cb[0], phase=cb[1];
  var a=pick([2,3,4,5]), c=pick([0,15,30,45]), d=pick([-4,-3,-2,-1,0,1,2,3,4]);
  var sv={30:0.5,90:1,150:0.5,180:0,270:-1}[phase];
  var t=c+phase/b, ans=a*sv+d;
  return numq("Given \\("+sinS(a,"sin",b,c,d)+"\\), determine the value of \\(y\\) when \\(x = "+t+"^\\circ\\).",
    ans,0.01,
    "Substitute \\(x = "+t+"^\\circ\\): the angle inside the sine is \\("+b+"("+t+" - "+c+")^\\circ = "+phase+"^\\circ\\), and \\(\\sin "+phase+"^\\circ = "+sv+"\\). So \\(y = "+a+" \\times "+sv+(d===0?"":" + ("+d+")")+" = <b>"+fmt(ans,2)+"</b>\\).",
    {b:b,phase:phase,c:c,t:t});
});
E("u3-first-max-time-cr",3,["7.3"],2,"gen",function(){
  var b=pick([15,30,45]), a=pick([2,3,4]), h=pick([0,1,2]), k=pick([6,8,10,12]);
  var t=h+90/b;
  var arg=h===0?"t":"(t - "+h+")";
  var steps=(h===0)? b+"t &= 90 \\\\ t &= "+(90/b) : b+"(t - "+h+") &= 90 \\\\ t - "+h+" &= "+(90/b)+" \\\\ t &= "+fmt(t,2);
  return numq("The depth of water at a dock, in metres, is modelled by \\(D(t) = "+a+"\\sin "+b+arg+" + "+k+"\\), where \\(t\\) is the time in hours after midnight and the angles are in degrees. Determine the <b>first</b> time, in hours after midnight, at which the depth reaches its maximum.",
    t,0.01,
    "The depth is greatest when the sine factor first equals 1, which happens when its argument first reaches \\(90^\\circ\\). Set the argument equal to \\(90^\\circ\\) and solve: \\[ \\begin{aligned} "+steps+" \\end{aligned} \\] The depth first reaches its maximum at <b>"+fmt(t,2)+"</b> hours after midnight.",
    {b:b,h:h});
});
E("u3-characteristics-combo-cr",3,["7.2"],2,"gen",function(){
  var pr=pick([[11,-3],[9,-3],[9,1],[7,-1],[7,1],[11,1],[13,-1],[10,-2],[12,2]]);
  var M=pr[0], m=pr[1], P=pick([120,180,360,720]);
  var A=(M-m)/2, K=(M+m)/2;
  function opt(x,y,z){ return "Amplitude "+x+", midline "+y+", period "+z+"°"; }
  return mcq("A sinusoidal graph has a maximum value of "+M+" and a minimum value of "+m+", and it completes one full cycle over an interval of "+P+"°. Which set of characteristics is correct?",
    opt(A,K,P),
    [opt(K,A,P), opt(M-m,K,P), opt(A,K,2*P)],
    "Amplitude is half the distance between the extremes: \\(\\frac{"+M+" - ("+m+")}{2} = "+A+"\\). The midline sits halfway between them: \\(\\frac{"+M+" + ("+m+")}{2} = "+K+"\\). The period is the length of one full cycle, "+P+"°.",
    {M:M,m:m,P:P});
});
