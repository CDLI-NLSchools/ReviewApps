// Math 3200 Unit 5 Trigonometric Functions and Graphs question bank
// CRMARKS: u5-amplitude-a=1
// CRMARKS: u5-base-graph=1
// CRMARKS: u5-characteristics=1
// CRMARKS: u5-equation-evaluate-cr=3
// CRMARKS: u5-first-maximum-cr=2
// CRMARKS: u5-general-solution=2
// CRMARKS: u5-graph-problem=2
// CRMARKS: u5-key-points=2
// CRMARKS: u5-model-conditions=3
// CRMARKS: u5-period-b=1
// CRMARKS: u5-phase-h=1
// CRMARKS: u5-shift-k=1
// CRMARKS: u5-solve-set=2
// CRMARKS: u5-tan-asymptote-cr=2
// CRMARKS: u5-tan-features=1
// CRMARKS: u5-which-solution=1
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// CRMARKS: u5-eq-from-graph=2
// CRMARKS: u5-tan-graph=2
// BIMODAL: u5-solve-set=a
// BIMODAL: u5-model-conditions=b
// BIMODAL: u5-general-solution=b
// Reverse bimodal registration, November 20, 2026 (Bimodal-Classification-SR-Pools-2026-11-20.md).
// BIMODAL: u5-eq-from-graph=a
// BIMODAL: u5-tan-graph=a
/* ================= Unit 5: Trigonometric Functions and Graphs ================= */
/* ================= Unit 5: Trigonometric Functions and Graphs ================= */
/* Helpers are prefixed u5. Angles are in degrees unless a question says radians. */

function u5Eq(a,trig,bLab,h,k){
  var aLab=(a===1?"":(a===-1?"-":(""+a)));
  var arg;
  if(h===0){arg=(bLab===""?"x":bLab+"x");}
  else{arg=(bLab===""?"":bLab)+"(x "+(h>0?"- ":"+ ")+Math.abs(h)+"^\\circ)";}
  var s="y = "+aLab+"\\"+trig+" "+arg;
  if(k!==0)s+=(k>0?" + ":" - ")+Math.abs(k);
  return s;
}
function u5Fn(a,trig,b,h,k){
  return function(x){var ang=b*(x-h)*Math.PI/180;
    return a*(trig==="sin"?Math.sin(ang):(trig==="cos"?Math.cos(ang):Math.tan(ang)))+k;};
}
function u5Plot(fn,x0,x1,y0,y1,o){
  o=o||{};var W=440,H=250,pad=26;
  var X=function(x){return pad+(x-x0)/(x1-x0)*(W-2*pad);};
  var Y=function(y){return H-pad-(y-y0)/(y1-y0)*(H-2*pad);};
  var out='<svg viewBox="0 0 '+W+' '+H+'" width="100%" style="max-width:440px;background:#fff;border:1px solid #d8d2c4;border-radius:6px" xmlns="http://www.w3.org/2000/svg">';
  var gsx=o.gx||1,gsy=o.gy||1,gx,gy;
  for(gx=Math.ceil(x0/gsx)*gsx;gx<=x1;gx+=gsx){out+='<line x1="'+fmt(X(gx),1)+'" y1="'+pad+'" x2="'+fmt(X(gx),1)+'" y2="'+(H-pad)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(o.labelX)out+='<text x="'+fmt(X(gx),1)+'" y="'+(H-6)+'" font-size="9" fill="#5a5344" text-anchor="middle">'+fmt(gx)+'</text>';}
  for(gy=Math.ceil(y0/gsy)*gsy;gy<=y1;gy+=gsy){out+='<line x1="'+pad+'" y1="'+fmt(Y(gy),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(gy),1)+'" stroke="#eae5d6" stroke-width="1"/>';
    if(o.labelY&&gy!==0)out+='<text x="'+(pad-4)+'" y="'+fmt(Y(gy)+3,1)+'" font-size="9" fill="#5a5344" text-anchor="end">'+fmt(gy)+'</text>';}
  if(y0<0&&y1>0)out+='<line x1="'+pad+'" y1="'+fmt(Y(0),1)+'" x2="'+(W-pad)+'" y2="'+fmt(Y(0),1)+'" stroke="#17352a" stroke-width="1.3"/>';
  if(x0<0&&x1>0)out+='<line x1="'+fmt(X(0),1)+'" y1="'+pad+'" x2="'+fmt(X(0),1)+'" y2="'+(H-pad)+'" stroke="#17352a" stroke-width="1.3"/>';
  out+='<text x="'+(W-pad-2)+'" y="'+fmt(Y(0)-6,1)+'" font-size="12" fill="#17352a" text-anchor="end">'+(o.xLab||"x")+'</text>';
  out+='<text x="'+fmt(X(0)+6,1)+'" y="'+(pad-8)+'" font-size="12" fill="#17352a">'+(o.yLab||"y")+'</text>';
  if(fn){
    out+=clipCurveSVG(fn,X,Y,x0,x1,y0,y1);
  }
  (o.points||[]).forEach(function(p){out+='<circle cx="'+fmt(X(p[0]),1)+'" cy="'+fmt(Y(p[1]),1)+'" r="3.6" fill="#b3541e"/>';});
  return out+'</svg>';
}
function u5Dis3(correct,pool){
  var seen={},out=[];seen[String(correct)]=1;
  for(var i=0;i<pool.length&&out.length<3;i++){var v=String(pool[i]);
    if(!seen[v]){seen[v]=1;out.push(pool[i]);}}
  return out.length===3?out:null;
}
function u5Solve(trig,b,c,D){
  var out=[];
  for(var th=0;th<b*D;th+=15){
    var v=(trig==="sin"?Math.sin(th*Math.PI/180):Math.cos(th*Math.PI/180));
    if(Math.abs(v-c)<1e-9){var x=th/b;if(x<D)out.push(Math.round(x*100)/100);}
  }
  return out;
}
function u5SetStr(xs){
  return "\\(\\{"+xs.map(function(x){return fmt(x)+"^\\circ";}).join(", ")+"\\}\\)";
}

E("u5-base-graph",5,["7.20","7.21"],1,"var",varset([
  function(){
    var q=mcq("What is the <b>period</b> of the function shown?",
      "360°",["180°","720°","90°"],
      "One complete cycle of the sine wave spans from \\(0^\\circ\\) to \\(360^\\circ\\) before the pattern repeats, so the period is <b>360°</b>.",{});
    q.figure=u5Plot(u5Fn(1,"sin",1,0,0),0,720,-1.6,1.6,{gx:90,gy:1,labelX:true,labelY:true});
    return q;},
  function(){
    var q=mcq("What is the <b>amplitude</b> of the function shown?",
      "1",["0","2","360"],
      "The cosine graph peaks at \\(y = 1\\) and bottoms out at \\(y = -1\\), oscillating about the midline \\(y = 0\\). The amplitude is the distance from the midline to a peak, which is <b>1</b>.",{});
    q.figure=u5Plot(u5Fn(1,"cos",1,0,0),0,720,-1.6,1.6,{gx:90,gy:1,labelX:true,labelY:true});
    return q;},
  function(){
    var q=mcq("What is the <b>range</b> of the function shown?",
      "\\(\\{y \\mid -1 \\le y \\le 1, \\ y \\in \\mathbb{R}\\}\\)",
      ["\\(\\{y \\mid 0 \\le y \\le 1, \\ y \\in \\mathbb{R}\\}\\)",
       "\\(\\{y \\mid -1 \\le y \\le 0, \\ y \\in \\mathbb{R}\\}\\)",
       "\\(\\{y \\mid y \\ge -1, \\ y \\in \\mathbb{R}\\}\\)"],
      "The sine graph reaches a lowest value of \\(y = -1\\) and a highest value of \\(y = 1\\), and takes every value in between. The range is <b>\\(-1 \\le y \\le 1\\)</b>.",{});
    q.figure=u5Plot(u5Fn(1,"sin",1,0,0),0,720,-1.6,1.6,{gx:90,gy:1,labelX:true,labelY:true});
    return q;},
  function(){
    var q=mcq("How many <b>zeros</b> does the function shown have on \\(0^\\circ \\le x < 720^\\circ\\)?",
      "4",["2","3","6"],
      "The cosine graph crosses the x-axis at \\(x = 90^\\circ, 270^\\circ, 450^\\circ\\) and \\(630^\\circ\\), which is <b>4</b> zeros on the interval.",{});
    q.figure=u5Plot(u5Fn(1,"cos",1,0,0),0,720,-1.6,1.6,{gx:90,gy:1,labelX:true,labelY:true});
    return q;},
  function(){
    var q=mcq("At which value of \\(x\\) in \\([0^\\circ, 360^\\circ)\\) does the function shown first reach its <b>minimum</b> value?",
      "180°",["90°","270°","360°"],
      "The cosine graph starts at its maximum when \\(x = 0^\\circ\\) and falls to its minimum halfway through the cycle, at \\(x = 180^\\circ\\).",{});
    q.figure=u5Plot(u5Fn(1,"cos",1,0,0),0,720,-1.6,1.6,{gx:90,gy:1,labelX:true,labelY:true});
    return q;}
]));
E("u5-amplitude-a",5,["7.22"],1,"gen",function(){
  var trig=pick(["sin","cos"]),aS=pick([-9,-8,-7,-6,-5,-4,-3,-2,2,3,4,5,6,7,8,9]),b=pick([1,2,3]);
  var A=Math.abs(aS),bLab=(b===1?"":""+b);
  var dis=u5Dis3(""+A,[""+(A+1),""+(A-1),""+(2*A)]);
  return mcq("What is the <b>amplitude</b> of \\("+u5Eq(aS,trig,bLab,0,0)+"\\)?",
    ""+A,dis,
    "The amplitude is the absolute value of the coefficient of the trigonometric function: \\(|"+aS+"| = "+A+"\\). The sign only reflects the graph, and the "+b+" inside the argument affects the period, not the amplitude. The amplitude is <b>"+A+"</b>.",
    {trig:trig,aS:aS,b:b});
});
E("u5-shift-k",5,["7.24"],1,"gen",function(){
  var trig=pick(["sin","cos"]),k=pick([-5,-4,-3,-2,-1,1,2,3,4,5]),ask=pick(["midline","max","min","range"]);
  var eq=u5Eq(1,trig,"",0,k);
  if(ask==="midline"){
    var dis=u5Dis3("y = "+k,["y = "+(-k),"y = "+(k+1),"y = "+(k-1)]);
    return mcq("What is the equation of the <b>midline</b> of \\("+eq+"\\)?",
      "y = "+k,dis,
      "Adding "+k+" shifts every point of the base graph "+(k>0?"up":"down")+" by "+Math.abs(k)+", so the graph oscillates about the line \\(y = "+k+"\\) instead of \\(y = 0\\). The midline is <b>\\(y = "+k+"\\)</b>.",
      {trig:trig,k:k,ask:ask});
  }
  if(ask==="max"){
    var dis2=u5Dis3(""+(k+1),[""+(k-1),"1",""+(k+2),"-1","2",""+(k+3)]);
    return mcq("What is the <b>maximum value</b> of \\("+eq+"\\)?",
      ""+(k+1),dis2,
      "The base function \\(\\"+trig+" x\\) has maximum value 1. The + "+k+" shifts the graph "+(k>0?"up":"down")+", so the maximum value becomes \\(1 + ("+k+") = "+(k+1)+"\\). The maximum value is <b>"+(k+1)+"</b>.",
      {trig:trig,k:k,ask:ask});
  }
  if(ask==="min"){
    var dis3=u5Dis3(""+(k-1),["-1",""+(k+1),""+(k-2),"1",""+(k-3),"0"]);
    return mcq("What is the <b>minimum value</b> of \\("+eq+"\\)?",
      ""+(k-1),dis3,
      "The base function \\(\\"+trig+" x\\) has minimum value -1. The + "+k+" shifts the graph "+(k>0?"up":"down")+", so the minimum value becomes \\(-1 + ("+k+") = "+(k-1)+"\\). The minimum value is <b>"+(k-1)+"</b>.",
      {trig:trig,k:k,ask:ask});
  }
  var corr="\\(["+(k-1)+", "+(k+1)+"]\\)";
  var pool=["\\([-1, 1]\\)","\\(["+k+", "+(k+2)+"]\\)","\\(["+(k-2)+", "+k+"]\\)","\\(["+(k-1)+", "+(k+2)+"]\\)","\\([0, "+(2*k)+"]\\)","\\(["+(k-2)+", "+(k+2)+"]\\)"];
  var dis4=u5Dis3(corr,pool);
  return mcq("What is the <b>range</b> of \\("+eq+"\\)?",
    corr,dis4,
    "The base function takes values from -1 to 1. Shifting "+(k>0?"up":"down")+" by "+Math.abs(k)+" moves the whole band: the lowest value is \\(-1 + ("+k+") = "+(k-1)+"\\) and the highest is \\(1 + ("+k+") = "+(k+1)+"\\). The range is <b>\\(["+(k-1)+", "+(k+1)+"]\\)</b>.",
    {trig:trig,k:k,ask:ask});
});
E("u5-period-b",5,["7.23"],1,"gen",function(){
  var trig=pick(["sin","cos"]);
  if(Math.random()<0.25){
    var bR=pick([2,3,4,0.5]),per,corr,dis;
    if(bR===2){corr="\\(\\pi\\)";dis=["\\(2\\pi\\)","\\(\\frac{\\pi}{2}\\)","\\(4\\pi\\)"];}
    else if(bR===3){corr="\\(\\frac{2\\pi}{3}\\)";dis=["\\(2\\pi\\)","\\(\\frac{\\pi}{3}\\)","\\(6\\pi\\)"];}
    else if(bR===4){corr="\\(\\frac{\\pi}{2}\\)";dis=["\\(2\\pi\\)","\\(\\frac{\\pi}{4}\\)","\\(\\pi\\)"];}
    else{corr="\\(4\\pi\\)";dis=["\\(2\\pi\\)","\\(\\pi\\)","\\(\\frac{\\pi}{2}\\)"];}
    per=corr;
    var perIn=per.substring(2,per.length-2);
    return mcq("What is the <b>period</b>, in radians, of \\("+u5Eq(1,trig,(bR===0.5?"\\frac{1}{2}":""+bR),0,0)+"\\) (with \\(x\\) in radians)?",
      corr,dis,
      "The base function has period \\(2\\pi\\). The coefficient \\(b = "+(bR===0.5?"\\frac{1}{2}":bR)+"\\) compresses or stretches the graph horizontally, giving period \\(\\frac{2\\pi}{b} = "+perIn+"\\). The period is <b>"+per+"</b>.",
      {trig:trig,bR:bR,mode:"rad"});
  }
  var b=pick([2,3,4,0.5,1/3]),bLab=(b===0.5?"\\frac{1}{2}":(b===1/3?"\\frac{1}{3}":""+b));
  var a=pick([1,2,3]),k=pick([-2,0,2]),P=Math.round(360/b);
  var pool=["360",""+Math.round(360*b),""+Math.round(180/b),""+Math.round(720/b),""+Math.round(720*b),"90","270","120"];
  var dis=u5Dis3(""+P,pool);
  return mcq("What is the <b>period</b>, in degrees, of \\("+u5Eq(a,trig,bLab,0,k)+"\\)?",
    ""+P,dis,
    "The period is set by the coefficient of \\(x\\): \\[ \\begin{aligned} \\text{period} &= \\frac{360^\\circ}{b} \\\\ &= \\frac{360^\\circ}{"+(b===0.5?"\\frac{1}{2}":(b===1/3?"\\frac{1}{3}":b))+"} \\\\ &= "+P+"^\\circ \\end{aligned} \\] The amplitude and the vertical shift do not change the period. The period is <b>"+P+"°</b>.",
    {trig:trig,b:b,a:a,k:k,mode:"deg"});
});
E("u5-phase-h",5,["7.25"],1,"gen",function(){
  var trig=pick(["sin","cos"]),h=pick([15,30,45,60,90,-15,-30,-45,-60,-90]),b=pick([1,2,3]);
  var bLab=(b===1?"":""+b),A=Math.abs(h);
  var dir=(h>0?"right":"left"),odir=(h>0?"left":"right");
  var corr="Shifted "+A+"° to the "+dir;
  var dis=[("Shifted "+A+"° to the "+odir),("Shifted "+(2*A)+"° to the "+dir),("Shifted "+A+" units "+(h>0?"up":"down"))];
  return mcq("How is the graph of \\("+u5Eq(1,trig,bLab,h,0)+"\\) obtained from the graph of \\("+u5Eq(1,trig,bLab,0,0)+"\\)?",
    corr,dis,
    "In the form \\(\\"+trig+" "+(b===1?"":b)+"(x - h)\\), the value \\(h = "+h+"^\\circ\\) is the phase shift. A positive \\(h\\) moves the graph to the right, and a negative \\(h\\) moves it to the left. Here the graph is <b>shifted "+A+"° to the "+dir+"</b>.",
    {trig:trig,h:h,b:b});
});
E("u5-characteristics",5,["7.27"],1,"gen",function(){
  var trig=pick(["sin","cos"]),a=pick([2,3,4]),b=pick([1,2]),h=pick([-60,-30,0,30,60]),k=pick([-2,-1,0,1,2,3]);
  var ask=pick(["amplitude","period","midline","range","phase"]);
  var eq=u5Eq(a,trig,(b===1?"":""+b),h,k),fn=u5Fn(a,trig,b,h,k);
  var prompt,corr,dis,sol;
  if(ask==="amplitude"){
    corr=""+a;dis=u5Dis3(corr,[""+(a-1),""+(a+1),""+(2*a),"1"]);
    prompt="For the function \\("+eq+"\\), graphed below, what is its <b>amplitude</b>?";
    sol="The graph peaks "+a+" units above its midline \\(y = "+k+"\\), so the amplitude is <b>"+a+"</b>.";
  }else if(ask==="period"){
    var P=360/b;corr=""+P;dis=u5Dis3(corr,["180","360","720","90","120"]);
    prompt="For the function \\("+eq+"\\), graphed below, what is its <b>period</b>, in degrees?";
    sol="Peaks repeat every \\("+P+"^\\circ\\) on the graph, matching \\(\\frac{360^\\circ}{"+b+"} = "+P+"^\\circ\\). The period is <b>"+P+"°</b>.";
  }else if(ask==="midline"){
    corr="y = "+k;dis=u5Dis3(corr,["y = "+(-k),"y = "+a,"y = "+(k+a),"y = 1","y = -1","y = "+(k-a),"y = 0","y = "+(k+2)]);
    prompt="For the function \\("+eq+"\\), graphed below, what is the equation of its <b>midline</b>?";
    sol="The graph oscillates evenly between \\(y = "+(k+a)+"\\) and \\(y = "+(k-a)+"\\); the midline sits halfway between, at <b>\\(y = "+k+"\\)</b>.";
  }else if(ask==="range"){
    corr="\\(["+(k-a)+", "+(k+a)+"]\\)";
    dis=u5Dis3(corr,["\\(["+(-a)+", "+a+"]\\)","\\(["+k+", "+(k+a)+"]\\)","\\(["+(k-a)+", "+k+"]\\)","\\(["+(k-1)+", "+(k+1)+"]\\)"]);
    prompt="For the function \\("+eq+"\\), graphed below, what is its <b>range</b>?";
    sol="The lowest point on the graph is \\(y = "+(k-a)+"\\) and the highest is \\(y = "+(k+a)+"\\), with every value in between attained. The range is <b>\\(["+(k-a)+", "+(k+a)+"]\\)</b>.";
  }else{
    if(h===0){corr="None (no horizontal shift)";dis=["45° to the right","90° to the left","180° to the right"];}
    else{
      var dir=(h>0?"right":"left"),odir=(h>0?"left":"right"),A=Math.abs(h);
      corr=A+"° to the "+dir;
      dis=[A+"° to the "+odir,(2*A)+"° to the "+dir,"A vertical shift of "+Math.abs(k)+" units"];
    }
    prompt="For the function \\("+eq+"\\), graphed below, what is its <b>phase shift</b>?";
    sol=(h===0?"The argument is \\(" + "\\" + trig + " " + (b===1?"":b) + "x\\) with nothing subtracted from \\(x\\), so there is <b>no horizontal shift</b>.":"The shift is read from \\((x - ("+h+"^\\circ))\\): the graph is shifted <b>"+Math.abs(h)+"° to the "+(h>0?"right":"left")+"</b> from the base graph.");
  }
  var q=mcq(prompt,corr,dis,sol,{trig:trig,a:a,b:b,h:h,k:k,ask:ask});
  q.figure=u5Plot(fn,0,540,Math.min(k-a-1,-2),Math.max(k+a+1,2),{gx:90,gy:1,labelX:true,labelY:true});
  return q;
});
E("u5-eq-from-graph",5,["7.28"],2,"gen",function(){
  var trig=pick(["sin","cos"]),a=pick([2,3,4]),b=pick([1,2]);
  var k=pick([-3,-2,-1,1,2,3]);var tries=0;
  while(k===a&&tries<40){k=pick([-3,-2,-1,1,2,3]);tries++;}
  var bLab=(b===1?"":""+b),bOther=(b===1?"2":"");
  var corr="\\("+u5Eq(a,trig,bLab,0,k)+"\\)";
  var dis=["\\("+u5Eq(a,trig,bLab,0,-k)+"\\)",
           "\\("+u5Eq(k,trig,bLab,0,a)+"\\)",
           "\\("+u5Eq(a,trig,bOther,0,k)+"\\)"];
  var q=mcq("Which function is shown in the graph?",
    corr,dis,
    "The graph oscillates between \\(y = "+(k+a)+"\\) and \\(y = "+(k-a)+"\\), so the midline is \\(y = "+k+"\\) and the amplitude is "+a+". It completes a cycle every "+(360/b)+"°, so \\(b = "+b+"\\), and its shape at \\(x = 0\\) is the "+(trig==="sin"?"sine":"cosine")+" shape. The function is <b>"+corr+"</b>.",
    {trig:trig,a:a,b:b,k:k});
  q.figure=u5Plot(u5Fn(a,trig,b,0,k),0,720,Math.min(k-a-1,-2),Math.max(k+a+1,2),{gx:90,gy:1,labelX:true,labelY:true});
  return q;
});
E("u5-key-points",5,["7.26"],1,"gen",function(){
  var trig=pick(["sin","cos"]),a=pick([2,3,4,5]),b=pick([1,2,3]),h=pick([-30,0,30,60]),k=pick([-3,-2,-1,0,1,2,3]);
  var eq=u5Eq(a,trig,(b===1?"":""+b),h,k),ask=pick(["max","min","firstmax"]);
  if(ask==="max"){
    return numq("What is the <b>maximum value</b> of \\("+eq+"\\)?",
      a+k,0.001,
      "The trigonometric part tops out at 1, so the maximum value is \\("+a+"(1) + ("+k+") = "+(a+k)+"\\). The maximum value is <b>"+(a+k)+"</b>.",
      {trig:trig,a:a,b:b,h:h,k:k,ask:ask});
  }
  if(ask==="min"){
    return numq("What is the <b>minimum value</b> of \\("+eq+"\\)?",
      k-a,0.001,
      "The trigonometric part bottoms out at -1, so the minimum value is \\("+a+"(-1) + ("+k+") = "+(k-a)+"\\). The minimum value is <b>"+(k-a)+"</b>.",
      {trig:trig,a:a,b:b,h:h,k:k,ask:ask});
  }
  var x;
  if(trig==="sin"){x=h+90/b;}
  else{x=(h>=0)?h:h+360/b;}
  return numq("For \\("+eq+"\\), find the smallest value of \\(x \\ge 0^\\circ\\) at which the function reaches its <b>maximum</b> value.",
    x,0.001,
    "The maximum occurs where the argument of the "+(trig==="sin"?"sine":"cosine")+" equals "+(trig==="sin"?"\\(90^\\circ\\)":"\\(0^\\circ\\)")+" (or a full cycle later): \\[ \\begin{aligned} "+b+"(x "+(h>=0?"- "+h:"+ "+(-h))+") &= "+(trig==="sin"?"90":"0")+"^\\circ \\\\ x &= "+x+"^\\circ \\end{aligned} \\] The smallest such value with \\(x \\ge 0^\\circ\\) is <b>"+x+"°</b>.",
    {trig:trig,a:a,b:b,h:h,k:k,ask:ask});
});
E("u5-tan-features",5,["7.32","7.33"],2,"gen",function(){
  var b=pick([1,2]),s=pick([1,-1]),h=pick([0,30]),L=pick([360,540,720,900]);
  var ask=pick(["period","asymcount","zerocount","range","domain"]);
  var eq=u5Eq(s,"tan",(b===1?"":""+b),h,0);
  var zeros=[],asym=[],n,x;
  for(n=-2;n<50;n++){x=h+180*n/b;if(x>=0&&x<L)zeros.push(x);x=h+(90+180*n)/b;if(x>0&&x<L)asym.push(x);}
  if(ask==="period"){
    var P=180/b,dis=u5Dis3(""+P,["90","180","270","360","45"]);
    return mcq("What is the <b>period</b>, in degrees, of \\("+eq+"\\)?",
      ""+P,dis,
      "The tangent function repeats every \\(180^\\circ\\); with the coefficient \\(b = "+b+"\\), the period is \\(\\frac{180^\\circ}{"+b+"} = "+P+"^\\circ\\). The period is <b>"+P+"°</b>.",
      {b:b,s:s,h:h,ask:ask});
  }
  if(ask==="asymcount"){
    var c1=asym.length,dis2=u5Dis3(""+c1,[""+(c1-1),""+(c1+1),""+(c1+2),""+(2*c1),""+(b*L/180)]);
    return mcq("How many <b>vertical asymptotes</b> does the graph of \\("+eq+"\\) have on the interval \\(0^\\circ < x < "+L+"^\\circ\\)?",
      ""+c1,dis2,
      "The asymptotes of the tangent graph occur where its argument equals \\(90^\\circ + 180^\\circ n\\), here at \\(x = "+asym.map(function(v){return fmt(v)+"^\\circ";}).join(", ")+"\\). That is <b>"+c1+"</b> asymptotes on the interval.",
      {b:b,s:s,h:h,L:L,ask:ask});
  }
  if(ask==="zerocount"){
    var c2=zeros.length,dis3=u5Dis3(""+c2,[""+(c2-1),""+(c2+1),""+(c2+2),""+(2*c2),""+(b*L/180)]);
    return mcq("How many <b>zeros</b> does the graph of \\("+eq+"\\) have on the interval \\(0^\\circ \\le x < "+L+"^\\circ\\)?",
      ""+c2,dis3,
      "The tangent graph crosses the x-axis where its argument equals \\(180^\\circ n\\), here at \\(x = "+zeros.map(function(v){return fmt(v)+"^\\circ";}).join(", ")+"\\). That is <b>"+c2+"</b> zeros on the interval.",
      {b:b,s:s,h:h,L:L,ask:ask});
  }
  if(ask==="range"){
    return mcq("What is the <b>range</b> of \\("+eq+"\\)?",
      "\\(\\{y \\mid y \\in \\mathbb{R}\\}\\)",
      ["\\(\\{y \\mid -1 \\le y \\le 1, \\ y \\in \\mathbb{R}\\}\\)",
       "\\(\\{y \\mid y \\ge 0, \\ y \\in \\mathbb{R}\\}\\)",
       "\\(\\{y \\mid y \\ne 0, \\ y \\in \\mathbb{R}\\}\\)"],
      "Between consecutive asymptotes, the tangent graph climbs from the bottom of the graph to the top without skipping any value, so it takes <b>every real value</b>. Unlike sine and cosine, tangent is not trapped between -1 and 1.",
      {b:b,s:s,h:h,ask:ask});
  }
  var st=h+90/b,step=180/b;
  var corr="\\(x \\ne "+fmt(st)+"^\\circ + "+fmt(step)+"^\\circ n\\)";
  var dis4=["\\(x \\ne "+fmt(h)+"^\\circ + "+fmt(step)+"^\\circ n\\)",
            "\\(x \\ne "+fmt(st)+"^\\circ + "+fmt(2*step)+"^\\circ n\\)",
            "\\(x \\in \\mathbb{R}\\)"];
  return mcq("What is the <b>domain</b> of \\("+eq+"\\)?",
    corr,dis4,
    "Tangent is undefined where its argument equals \\(90^\\circ + 180^\\circ n\\). Solving \\("+b+"(x - "+h+"^\\circ) = 90^\\circ + 180^\\circ n\\) gives \\(x = "+fmt(st)+"^\\circ + "+fmt(step)+"^\\circ n\\), and these values are excluded from the domain: <b>"+corr+"</b>.",
    {b:b,s:s,h:h,ask:ask});
});
E("u5-which-solution",5,["7.36","7.35"],1,"gen",function(){
  var trig=pick(["sin","cos"]);
  if(Math.random()<0.55){
    var b=pick([1,2]);
    var cs=[{v:0.5,lab:"\\frac{1}{2}"},{v:Math.sqrt(3)/2,lab:"\\frac{\\sqrt{3}}{2}"},{v:-0.5,lab:"-\\frac{1}{2}"},{v:-Math.sqrt(3)/2,lab:"-\\frac{\\sqrt{3}}{2}"},{v:0,lab:"0"},{v:1,lab:"1"}];
    if(b===1)cs.push({v:Math.sqrt(2)/2,lab:"\\frac{\\sqrt{2}}{2}"},{v:-Math.sqrt(2)/2,lab:"-\\frac{\\sqrt{2}}{2}"});
    var c=pick(cs),sols=u5Solve(trig,b,c.v,361),chosen=pick(sols);
    var pool=[],xv;
    for(xv=0;xv<=360;xv+=15){
      var val=(trig==="sin"?Math.sin(b*xv*Math.PI/180):Math.cos(b*xv*Math.PI/180));
      if(Math.abs(val-c.v)>0.05&&Math.abs(xv-chosen)>0.5)pool.push(xv);
    }
    pool=shuffle(pool);
    var dis=pool.slice(0,3).map(function(v){return v+"°";});
    return mcq("Which value of \\(x\\) is a <b>solution</b> of \\(\\"+trig+" "+(b===1?"":b)+"x = "+c.lab+"\\) for \\(0^\\circ \\le x \\le 360^\\circ\\)?",
      chosen+"°",dis,
      "Substitute the value: \\(\\"+trig+" "+(b===1?"":b)+"("+chosen+"^\\circ) = "+c.lab+"\\), so \\(x = "+chosen+"^\\circ\\) satisfies the equation. Each other listed value gives a different result when substituted. The solution shown is <b>"+chosen+"°</b>.",
      {trig:trig,b:b,c:c.lab,fam:"special"});
  }
  var c2=pick([0.3,0.4,0.6,0.7,-0.3,-0.5,-0.7]),sols2,chosen2;
  if(trig==="sin"){var bs=Math.asin(c2)*180/Math.PI;sols2=[((bs%360)+360)%360,((180-bs)%360+360)%360];}
  else{var bc=Math.acos(c2)*180/Math.PI;sols2=[bc,360-bc];}
  chosen2=pick(sols2);
  var corr2=""+Math.round(chosen2);
  var cand=[];
  if(trig==="sin"){var ac=Math.acos(c2)*180/Math.PI;cand.push(Math.round(ac),Math.round(180-ac),Math.round(360-ac));}
  else{var as=Math.asin(c2)*180/Math.PI;as=((as%360)+360)%360;cand.push(Math.round(as),Math.round(180-as),Math.round(360-as));}
  cand.push(((Math.round(chosen2)+180)%360),Math.round(((360-chosen2)%360+360)%360),Math.round(chosen2)+45,Math.round(chosen2)-35,Math.round(chosen2)+100);
  var disB=[],ci2;
  for(ci2=0;ci2<cand.length&&disB.length<3;ci2++){
    var cv=((cand[ci2]%360)+360)%360;
    var nearSol=sols2.some(function(sv){return Math.abs(sv-cv)<2.5||Math.abs(sv-cv)>357.5;});
    if(!nearSol&&(""+cv)!==corr2&&disB.indexOf(cv+"°")===-1)disB.push(cv+"°");
  }
  return mcq("Which value of \\(x\\) is an <b>approximate</b> solution of \\(\\"+trig+" x = "+c2+"\\) for \\(0^\\circ \\le x < 360^\\circ\\)?",
    corr2+"°",disB,
    "Using the inverse function, one solution is \\(x = \\"+trig+"^{-1}("+c2+") \\approx "+fmt(chosen2,1)+"^\\circ\\), which rounds to <b>"+corr2+"°</b>. (A calculator or a graph gives this approximate value; the equation has no exact special-angle solution.)",
    {trig:trig,c:c2,fam:"approx"});
});
E("u5-solve-set",5,["7.34"],2,"gen",function(){
  var trig,b,sgn,c,D,S,candSets,tries=0;
  function sStr(arr){return u5SetStr(arr);}
  do{
    trig=pick(["sin","cos"]);b=pick([1,2,3]);sgn=pick([1,-1]);D=pick([180,360]);
    var cands=[{v:0.5,lab:"\\frac{1}{2}"},{v:-0.5,lab:"-\\frac{1}{2}"},{v:Math.sqrt(3)/2,lab:"\\frac{\\sqrt{3}}{2}"},{v:0,lab:"0"}];
    if(b===1)cands.push({v:Math.sqrt(2)/2,lab:"\\frac{\\sqrt{2}}{2}"},{v:-Math.sqrt(2)/2,lab:"-\\frac{\\sqrt{2}}{2}"},{v:1,lab:"1"},{v:-1,lab:"-1"});
    c=pick(cands);
    var ceff=sgn*c.v,other=(trig==="sin"?"cos":"sin");
    S=u5Solve(trig,b,ceff,D);
    var raw=[u5Solve(trig,b,-ceff,D),
             u5Solve(other,b,ceff,D),
             u5Solve(trig,2*b,ceff,D),
             u5Solve(trig,b,ceff,D===180?360:180),
             S.map(function(v){return 180-v;}).filter(function(v){return v>=0&&v<D;}).sort(function(p,q){return p-q;}),
             S.map(function(v){return (v+180)%360;}).filter(function(v){return v<D;}).sort(function(p,q){return p-q;}),
             S.concat([D])];
    candSets=[];
    raw.forEach(function(arr){
      var st=sStr(arr);
      if(arr.length&&st!==sStr(S)&&candSets.indexOf(st)===-1)candSets.push(st);
    });
    tries++;
  }while((S.length===0||candSets.length<3)&&tries<80);
  if(S.length===0||candSets.length<3){
    trig="sin";b=1;sgn=1;D=360;c={v:0.5,lab:"\\frac{1}{2}"};
    S=u5Solve(trig,b,0.5,360);
    candSets=[sStr(u5Solve(trig,b,-0.5,360)),sStr(u5Solve("cos",b,0.5,360)),sStr(u5Solve(trig,2,0.5,360))];
  }
  var dis=candSets.slice(0,3);
  var eqStr=(sgn===1?"":"-")+"\\"+trig+" "+(b===1?"":b)+"x = "+c.lab;
  var negLab=(c.lab.charAt(0)==="-")?c.lab.slice(1):("-"+c.lab);
  return mcq("Solve \\("+eqStr+"\\) for \\(0^\\circ \\le x < "+D+"^\\circ\\). Which list gives <b>all</b> of the solutions?",
    sStr(S),dis,
    "First solve on one cycle, then account for the coefficient of \\(x\\): \\[ \\begin{aligned} \\"+trig+" "+(b===1?"":b)+"x &= "+(sgn===1?c.lab:negLab)+" \\\\ x &= "+S.map(function(v){return fmt(v)+"^\\circ";}).join(", ")+" \\end{aligned} \\] Checking each listed value in the original equation confirms the solution set <b>"+sStr(S)+"</b>.",
    {trig:trig,b:b,sgn:sgn,c:c.lab,D:D});
});
E("u5-general-solution",5,["7.38"],2,"gen",function(){
  var trig=pick(["sin","cos"]),b=pick([1,2,3]),a=pick([2,3]),ask=pick(["general","zeroslist","zeroscount"]);
  var eq=u5Eq(a,trig,(b===1?"":""+b),0,0);
  function gs(s,p){return s===0?("\\(x = "+fmt(p)+"^\\circ n\\)"):("\\(x = "+fmt(s)+"^\\circ + "+fmt(p)+"^\\circ n\\)");}
  if(ask==="general"){
    var s0=(trig==="sin"?0:90/b),p0=180/b,sO=(trig==="sin"?90/b:0);
    var corr=gs(s0,p0);
    var pool=[gs(sO,p0),gs(s0,2*p0),gs(s0,360/b),gs(sO,2*p0),gs(s0,p0/2)];
    var dis=u5Dis3(corr,pool);
    return mcq("The zeros of \\("+eq+"\\) are exactly the solutions of \\(\\"+trig+" "+(b===1?"":b)+"x = 0\\). What is the <b>general solution</b> of \\(\\"+trig+" "+(b===1?"":b)+"x = 0\\), in degrees?",
      corr,dis,
      "The zeros repeat every \\("+fmt(p0)+"^\\circ\\), starting from "+(s0===0?"\\(0^\\circ\\)":"\\("+fmt(s0)+"^\\circ\\)")+". Listing the zeros of the function in order gives the pattern <b>"+corr+"</b>, where \\(n\\) is any integer.",
      {trig:trig,b:b,a:a,ask:ask});
  }
  if(ask==="zeroslist"){
    var S=u5Solve(trig,b,0,360),other=(trig==="sin"?"cos":"sin");
    var pool2=[u5SetStr(u5Solve(other,b,0,360)),
               u5SetStr(u5Solve(trig,b===1?2:1,0,360)),
               u5SetStr(u5Solve(trig,b,0,180)),
               u5SetStr(S.map(function(v){return (v+180/b)%360;}).sort(function(p,q){return p-q;}))];
    var dis2=u5Dis3(u5SetStr(S),pool2);
    return mcq("Which list gives all of the <b>zeros</b> of \\("+eq+"\\) on \\([0^\\circ, 360^\\circ)\\)?",
      u5SetStr(S),dis2,
      "Zeros occur where \\(\\"+trig+" "+(b===1?"":b)+"x = 0\\). On \\([0^\\circ, 360^\\circ)\\) these are <b>"+u5SetStr(S)+"</b>; extending the pattern by the period gives the general solution.",
      {trig:trig,b:b,a:a,ask:ask});
  }
  var L=pick([360,720,1080]),cnt=u5Solve(trig,b,0,L).length;
  var dis3=u5Dis3(""+cnt,[""+(cnt-1),""+(cnt+1),""+(cnt/2),""+(2*cnt),""+(b*L/360)]);
  return mcq("How many <b>zeros</b> does \\("+eq+"\\) have on \\([0^\\circ, "+L+"^\\circ)\\)?",
    ""+cnt,dis3,
    "In each \\(360^\\circ\\) the graph crosses the x-axis "+(2*b)+" times (the zeros of \\(\\"+trig+" "+(b===1?"":b)+"x\\)), and the interval holds "+(L/360)+" such blocks, giving \\("+(2*b)+" \\times "+(L/360)+" = "+cnt+"\\) zeros. These are the first "+cnt+" values listed by the general solution. The count is <b>"+cnt+"</b>.",
    {trig:trig,b:b,a:a,L:L,ask:ask});
});
function u5ModEq(fnName,D,A,trig,bDeg,sign){
  return "\\("+fnName+"(t) = "+D+(sign<0?" - ":" + ")+(A===1?"":A)+"\\"+trig+"("+bDeg+"^\\circ t)\\)";
}
E("u5-model-build",5,["7.31"],3,"gen",function(){
  var ctx=pick(["tide","wheel","buoy","temp"]),ask=pick(["equation","value"]);
  var A,D,P,b,fnName,unit,thing,startMax,stemEq,stemVal,tVal,tLab;
  if(ctx==="tide"){
    A=pick([2,3,4]);D=pick([7,8,9,10]);P=pick([6,8,12]);b=360/P;fnName="d";unit="m";startMax=false;
    stemEq="The depth of water at a harbour dock varies sinusoidally with time. At low tide, when \\(t = 0\\), the depth is "+(D-A)+" m, and at high tide the depth is "+(D+A)+" m. High tides occur every "+P+" hours.";
    stemVal=stemEq;tLab="depth";
  }else if(ctx==="wheel"){
    A=pick([6,8,10]);var c0=pick([1,2,3]);D=A+c0;P=pick([6,8,12]);b=360/P;fnName="h";unit="m";startMax=false;
    stemEq="A Ferris wheel has diameter "+(2*A)+" m, and its lowest point is "+c0+" m above the ground. A rider boards at the lowest point when \\(t = 0\\), and the wheel completes one revolution every "+P+" minutes.";
    stemVal=stemEq;tLab="height";
  }else if(ctx==="buoy"){
    A=pick([1,2,3]);D=pick([8,10,12]);P=pick([6,8,10]);b=360/P;fnName="h";unit="m";startMax=true;
    stemEq="A navigation buoy bobs up and down as waves pass. At \\(t = 0\\) the buoy is at the top of its motion, "+(D+A)+" m above the seabed, and it returns to the top every "+P+" seconds. Its lowest point is "+(D-A)+" m above the seabed.";
    stemVal=stemEq;tLab="height";
  }else{
    A=pick([4,5,6]);D=pick([14,16,18]);P=24;b=15;fnName="T";unit="°C";startMax=false;
    stemEq="The temperature inside a greenhouse varies sinusoidally over a day. The daily minimum of "+(D-A)+" °C is reached at \\(t = 0\\) (taken as 4:00 AM), and the daily maximum of "+(D+A)+" °C is reached 12 hours later. The pattern repeats every 24 hours.";
    stemVal=stemEq;tLab="temperature";
  }
  var sign=startMax?1:-1;
  if(ask==="equation"){
    var corr=u5ModEq(fnName,D,A,"cos",b,sign);
    var dis=[u5ModEq(fnName,D,A,"cos",b,-sign),
             u5ModEq(fnName,D,A,"sin",b,sign),
             u5ModEq(fnName,D,A,"cos",360/(2*P),sign)];
    return mcq(stemEq+" Which function models the "+tLab+" "+(unit==="°C"?"\\(T\\)":"")+" after \\(t\\) "+(ctx==="buoy"?"seconds":(ctx==="wheel"?"minutes":"hours"))+"?",
      corr,dis,
      "The midline is the average of the extremes: \\(\\frac{"+(D-A)+" + "+(D+A)+"}{2} = "+D+"\\), and the amplitude is \\(\\frac{"+(D+A)+" - "+(D-A)+"}{2} = "+A+"\\). One cycle takes "+P+" "+(ctx==="buoy"?"seconds":(ctx==="wheel"?"minutes":"hours"))+", so the coefficient is \\(\\frac{360^\\circ}{"+P+"} = "+b+"^\\circ\\) per unit of \\(t\\). The motion starts at a "+(startMax?"maximum":"minimum")+", which calls for a "+(startMax?"positive":"negative")+" cosine. The model is <b>"+corr+"</b>.",
      {ctx:ctx,A:A,D:D,P:P,ask:ask});
  }
  var tFrac=pick([1/4,1/2,1/6,1/3]),tv=P*tFrac,cosv=Math.cos(360*tFrac*Math.PI/180);
  var val=D+sign*A*cosv;
  return numq(stemVal+" What is the "+tLab+" at \\(t = "+fmt(tv)+"\\) "+(ctx==="buoy"?"seconds":(ctx==="wheel"?"minutes":"hours"))+"? Give the value in "+(unit==="°C"?"degrees Celsius":"metres")+".",
    Math.round(val*100)/100,0.02,
    "Build the model first: midline "+D+", amplitude "+A+", starting at a "+(startMax?"maximum":"minimum")+", so \\("+fnName+"(t) = "+D+" "+(sign<0?"-":"+")+" "+A+"\\cos("+b+"^\\circ t)\\). Then \\[ \\begin{aligned} "+fnName+"("+fmt(tv)+") &= "+D+" "+(sign<0?"-":"+")+" "+A+"\\cos("+(360*tFrac)+"^\\circ) \\\\ &= "+D+" "+(sign<0?"-":"+")+" "+A+"("+fmt(cosv)+") \\\\ &= "+fmt(val)+" \\end{aligned} \\] The "+tLab+" is <b>"+fmt(val)+" "+unit+"</b>.",
    {ctx:ctx,A:A,D:D,P:P,ask:ask,tv:tv});
});
E("u5-model-conditions",5,["7.29","7.30"],3,"gen",function(){
  var frame=pick([
    {what:"the height, in centimetres, of a piston in an engine as it pumps",per:"seconds"},
    {what:"the depth of water, in metres, at a dock as the tide comes and goes",per:"hours"},
    {what:"the height, in metres, of a seat on a slowly rotating observation wheel",per:"minutes"}]);
  var P=pick([6,8,12]),A=pick([3,4,5]),lo=pick([1,2]),trig=pick(["sin","cos"]);
  var D=lo+A,hi=lo+2*A,b=360/P;
  function eqS(aa,bb,dd){return "\\(y = "+(aa===1?"":aa)+"\\"+trig+" "+(bb===1?"":bb)+"x + "+dd+"\\)";}
  var corr=eqS(A,b,D);
  var dis=[eqS(A+1,b,D+1),eqS(A,2*b,D),eqS(A-1,2*b,D)];
  return mcq("A sinusoidal function models "+frame.what+". The model must complete one full cycle every "+P+" "+frame.per+", and its values must run from "+lo+" to "+hi+". Which function satisfies <b>both</b> conditions?",
    corr,dis,
    "A period of "+P+" forces \\(b = \\frac{360}{"+P+"} = "+b+"\\), which rules out the options with \\("+(2*b)+"x\\). A range of "+lo+" to "+hi+" forces amplitude \\(\\frac{"+hi+" - "+lo+"}{2} = "+A+"\\) and midline \\(\\frac{"+hi+" + "+lo+"}{2} = "+D+"\\), which rules out the option with amplitude "+(A+1)+". The function that satisfies both conditions is <b>"+corr+"</b>.",
    {P:P,A:A,lo:lo,trig:trig});
});
E("u5-graph-problem",5,["7.29"],3,"gen",function(){
  var scen=pick(["tide","wheel","temp"]);
  var A=pick([2,3,4]),D=pick([6,8,10]),form=pick([1,-1,0]);
  var P,unit,thing,fn,xLab;
  if(scen==="tide"){P=pick([6,12,24]);unit="m";thing="depth of water at a dock";xLab="t (h)";}
  else if(scen==="wheel"){P=pick([6,12]);unit="m";thing="height of a gondola on a Ferris wheel";xLab="t (min)";}
  else{P=24;unit="°C";thing="temperature in a greenhouse";xLab="t (h)";}
  var b=360/P;
  if(form===1)fn=function(x){return D+A*Math.cos(b*x*Math.PI/180);};
  else if(form===-1)fn=function(x){return D-A*Math.cos(b*x*Math.PI/180);};
  else fn=function(x){return D+A*Math.sin(b*x*Math.PI/180);};
  var ask=pick(["aboveMid","aboveHalf","firstHalf"]);
  if(ask==="aboveHalf"||ask==="firstHalf"){
    if([6,12,24].indexOf(P)===-1)P=12;
    b=360/P;
    if(form===1)fn=function(x){return D+A*Math.cos(b*x*Math.PI/180);};
    else if(form===-1)fn=function(x){return D-A*Math.cos(b*x*Math.PI/180);};
    else fn=function(x){return D+A*Math.sin(b*x*Math.PI/180);};
  }
  var fig=u5Plot(fn,0,24,0,D+A+2,{gx:2,gy:1,labelX:true,labelY:true,xLab:xLab,yLab:""});
  var stem="The graph shows the "+thing+" over 24 "+(scen==="wheel"?"minutes":"hours")+". ";
  var q;
  if(ask==="aboveMid"){
    q=numq(stem+"For how long, in each complete cycle, is the value <b>above</b> "+D+" "+unit+"?",
      P/2,0.01,
      "The value "+D+" "+unit+" is the midline of the graph (halfway between "+(D-A)+" and "+(D+A)+"). A sinusoid spends exactly half of each cycle above its midline. The cycle length (peak to peak) is "+P+", so the value is above "+D+" "+unit+" for \\(\\frac{"+P+"}{2} = "+(P/2)+"\\) "+(scen==="wheel"?"minutes":"hours")+" per cycle. The answer is <b>"+(P/2)+"</b>.",
      {scen:scen,A:A,D:D,P:P,form:form,ask:ask});
  }else if(ask==="aboveHalf"){
    var thr=D+A/2;
    q=numq(stem+"For how long, in each complete cycle, is the value <b>at least</b> "+fmt(thr)+" "+unit+"?",
      Math.round(P/3*100)/100,0.02,
      "The level "+fmt(thr)+" "+unit+" sits halfway between the midline ("+D+") and the maximum ("+(D+A)+"), so it corresponds to a trigonometric value of \\(\\frac{1}{2}\\). The graph is at or above that level while the angle runs through a "+(form===0?"120":"120")+"° stretch of each 360° cycle (for example, from 30° to 150° for a sine arch, or within 60° of a peak for a cosine arch), which is \\(\\frac{1}{3}\\) of the "+P+" cycle: \\(\\frac{"+P+"}{3} = "+fmt(P/3)+"\\) "+(scen==="wheel"?"minutes":"hours")+". The answer is <b>"+fmt(P/3)+"</b>.",
      {scen:scen,A:A,D:D,P:P,form:form,ask:ask});
  }else{
    var thr2=D+A/2,tFirst;
    if(form===1)tFirst=P/6;else if(form===-1)tFirst=P/3;else tFirst=P/12;
    q=numq(stem+"At what time does the value <b>first</b> reach "+fmt(thr2)+" "+unit+"?",
      Math.round(tFirst*100)/100,0.02,
      "The level "+fmt(thr2)+" "+unit+" is halfway between the midline and the maximum, a trigonometric value of \\(\\frac{1}{2}\\). Reading across from that level to the rising part of the graph and down to the time axis gives \\(t = "+fmt(tFirst)+"\\) "+(scen==="wheel"?"minutes":"hours")+" (equivalently, the angle "+(form===1?"60":(form===-1?"120":"30"))+"° is reached "+fmt(tFirst)+" into the "+P+" cycle). The answer is <b>"+fmt(tFirst)+"</b>.",
      {scen:scen,A:A,D:D,P:P,form:form,ask:ask});
  }
  q.figure=fig;
  return q;
});
E("u5-tan-graph",5,["7.32"],2,"var",varset([
  function(){
    var q=mcq("Which function is shown in the graph?",
      "\\(y = \\tan x\\)",
      ["\\(y = \\sin x\\)","\\(y = \\cos x\\)","\\(y = -\\tan x\\)"],
      "The graph has vertical asymptotes and climbs steeply through the origin, repeating every \\(180^\\circ\\): that is the tangent graph, not a wave trapped between -1 and 1. The branches rise left to right, so the sign is positive. The function is <b>\\(y = \\tan x\\)</b>.",{});
    q.figure=u5Plot(u5Fn(1,"tan",1,0,0),-360,360,-4,4,{gx:90,gy:1,labelX:true,labelY:true});
    return q;},
  function(){
    var q=mcq("Which function is shown in the graph?",
      "\\(y = -\\tan x\\)",
      ["\\(y = \\tan x\\)","\\(y = \\sin x\\)","\\(y = \\cos x\\)"],
      "The graph has the tangent shape (vertical asymptotes, period \\(180^\\circ\\)), but each branch <b>falls</b> left to right, passing downward through the origin. That reflection in the x-axis gives <b>\\(y = -\\tan x\\)</b>.",{});
    q.figure=u5Plot(u5Fn(-1,"tan",1,0,0),-360,360,-4,4,{gx:90,gy:1,labelX:true,labelY:true});
    return q;},
  function(){
    return mcq("Which statement about the graph of \\(y = \\tan x\\) is <b>true</b>?",
      "It has period \\(180^\\circ\\), and its range is all real numbers",
      ["It has period \\(360^\\circ\\), and its range is all real numbers",
       "It has period \\(180^\\circ\\), and its range is \\([-1, 1]\\)",
       "It has period \\(90^\\circ\\), and its zeros are at \\(90^\\circ + 180^\\circ n\\)"],
      "Tangent repeats every \\(180^\\circ\\) and, between its asymptotes, takes every real value, so its range is all real numbers. The values \\(90^\\circ + 180^\\circ n\\) are where its asymptotes sit, not its zeros. The true statement is the period and range given in <b>the correct option</b>.",{});},
  function(){
    var q=mcq("The graph of \\(y = \\tan x\\) is shown. How many <b>vertical asymptotes</b> appear on the interval shown?",
      "3",["2","4","5"],
      "On \\([0^\\circ, 540^\\circ)\\) the tangent graph breaks at \\(x = 90^\\circ, 270^\\circ\\) and \\(450^\\circ\\), where the function is undefined. That is <b>3</b> vertical asymptotes.",{});
    q.figure=u5Plot(u5Fn(1,"tan",1,0,0),0,540,-4,4,{gx:90,gy:1,labelX:true,labelY:true});
    return q;}
]));

/* ---------- Unit-test pool fix, Nov 9, 2026: three Level 2 CR entries (3, 2 and 2 marks). The Level 2 CR pool held only two 2-mark entries, so no remainder behind any Level 3 pick could form. ---------- */
/* Math span fix (Nov 21, 2026): bold answer restatements in this file's solutions moved outside the TeX spans (a tag inside a span defeats KaTeX auto-render and shows raw TeX); guarded by tests/gate-mathspan.js. */
E("u5-equation-evaluate-cr",5,["7.28","7.26"],2,"gen",function(){
  var P=pick([12,24,8]), A=pick([2,3,4,5]), h=pick([0,1,2,3]), k=pick([-3,-2,-1,1,2,3]);
  var phis;
  if(P===8) phis=[[Math.PI/2,"\\frac{\\pi}{2}",1],[Math.PI,"\\pi",0],[3*Math.PI/2,"\\frac{3\\pi}{2}",-1]];
  else phis=[[Math.PI/6,"\\frac{\\pi}{6}",0.5],[Math.PI/2,"\\frac{\\pi}{2}",1],[Math.PI,"\\pi",0],[3*Math.PI/2,"\\frac{3\\pi}{2}",-1]];
  var ph=pick(phis), t=h+Math.round(ph[0]*P/(2*Math.PI)), ans=A*ph[2]+k;
  var bstr={8:"\\frac{\\pi}{4}",12:"\\frac{\\pi}{6}",24:"\\frac{\\pi}{12}"}[P];
  var arg=h===0?"x":"(x - "+h+")", ks=k>0?"+ "+k:"- "+(-k);
  var shift=h===0?"no phase shift":"a phase shift of "+h+" units to the right";
  return numq("A sinusoidal function has amplitude "+A+", period "+P+", "+shift+", and midline \\(y = "+k+"\\). It is a sine function whose cycle starts at the midline and rises from there. Determine the value of the function at \\(x = "+t+"\\).",
    ans,0.01,
    "The equation is \\(y = "+A+"\\sin "+bstr+arg+" "+ks+"\\), since \\(b = \\frac{2\\pi}{"+P+"} = "+bstr+"\\). At \\(x = "+t+"\\), the argument is \\("+bstr+" \\times "+(t-h)+" = "+ph[1]+"\\), and \\(\\sin "+ph[1]+" = "+ph[2]+"\\). So the value is \\("+A+" \\times "+ph[2]+" "+ks+" = \\)<b>"+fmt(ans,2)+"</b>.",
    {P:P,A:A,h:h,k:k,t:t});
});
E("u5-first-maximum-cr",5,["7.29"],2,"gen",function(){
  var o=pick([[12,"\\frac{\\pi}{6}"],[24,"\\frac{\\pi}{12}"],[8,"\\frac{\\pi}{4}"],[6,"\\frac{\\pi}{3}"],[16,"\\frac{\\pi}{8}"]]);
  var P=o[0], bstr=o[1], A=pick([2,3,4,5,6]), h=pick([0,1,2,3]), k=pick([5,8,10,12]);
  var t=h+P/4;
  var arg=h===0?"t":"(t - "+h+")";
  return numq("The height, in metres, of a rider on a Ferris wheel is modelled by \\(H(t) = "+A+"\\sin "+bstr+arg+" + "+k+"\\), where \\(t\\) is the time in minutes since the ride started. Determine the <b>first</b> time, in minutes, at which the rider reaches the maximum height.",
    t,0.01,
    "The height is greatest when the sine factor equals 1, which first happens when its argument equals \\(\\frac{\\pi}{2}\\). The argument "+bstr+arg+" increases from 0, and it reaches \\(\\frac{\\pi}{2}\\) after one quarter of the period. The period is "+P+" minutes, so the first maximum occurs at \\(t = "+h+" + \\frac{"+P+"}{4} = \\)<b>"+fmt(t,2)+"</b> minutes.",
    {P:P,h:h});
});
E("u5-tan-asymptote-cr",5,["7.32","7.33"],2,"gen",function(){
  var o=pick([[2,"2x",Math.PI/4],[3,"3x",Math.PI/6],[4,"4x",Math.PI/8],[0.5,"\\frac{x}{2}",Math.PI]]);
  var b=o[0], bx=o[1], ans=o[2];
  return numq("What is the smallest positive value of \\(x\\) at which the graph of \\(y = \\tan "+bx+"\\) has a vertical asymptote? Give your answer in radians, to three decimal places.",
    Math.round(ans*1000)/1000,0.002,
    "The tangent function has a vertical asymptote where its argument equals \\(\\frac{\\pi}{2}\\). Setting \\("+bx+" = \\frac{\\pi}{2}\\) and solving gives \\(x = "+fmt(ans,3)+"\\).",
    {b:b});
});
