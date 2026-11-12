// Diagram figures (Phase C, Nov 2026): distance time graphs added for the B.2 motion graph entries; see bank-helpers.js p22 helpers.
// Physics 2204 Bridging bank: Science 1206 review (speed, motion graphs, scalars and vectors)
// No CRMARKS entries in this file.

/* ---------- B.1 Speed, distance and time (Science 1206 review) ---------- */

E("br-b1-avg-speed",5,["B.1"],1,"gen",function(){
  var d=ri(60,480),t=pick([4,5,6,8,10,12,15,16,20,24]);
  var ctx=pick(["A school bus travels","A cyclist rides","A ferry crosses a harbour sailing","A hiker walks","A delivery van drives","A runner covers"]);
  var vRaw=d/t,vP=sfR(vRaw,4),ans=sfR(vP,3);
  return numq(ctx+" a distance of "+gF(d)+" m in "+gF(t)+" s at a steady speed. Calculate the speed. Give your answer in m/s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Speed is distance divided by time: "+iF(d)+" / "+iF(t)+" = "+iF(vP)+" m/s. The speed is <b>"+F3(ans)+" m/s</b>.",{d:d,t:t});
});

E("br-b1-time-distance",5,["B.1"],2,"gen",function(){
  var f=pick(["time","distance"]);
  if(f==="time"){
    var v=pick([3,4,5,6,8,10,12]),t=ri(6,40),d=v*t,ans=sfR(t,3);
    var ctx=pick(["A cyclist rides at a steady","A hiker walks at a steady","A boat moves at a steady","A runner keeps a steady"]);
    return numq(ctx+" speed of "+gF(v)+" m/s for a trip of "+gF(d)+" m. Calculate the time the trip takes. Give your answer in s.",
      ans,Math.max(0.02*Math.abs(ans),0.05),
      "Rearrange the speed relation to solve for time: time is distance divided by speed: "+iF(d)+" / "+iF(v)+" = "+iF(t)+" s. The trip takes <b>"+F3(ans)+" s</b>.",{v:v,t:t,d:d});
  }
  var v2=pick([2.5,3,4,5,6,7.5,8,10]),t2=ri(5,45),dRaw=v2*t2,dP=sfR(dRaw,4),ans=sfR(dP,3);
  var ctx2=pick(["A swimmer swims at a steady","A snowmobile travels at a steady","A kayaker paddles at a steady","A skater glides at a steady"]);
  return numq(ctx2+" speed of "+gF(v2)+" m/s for "+gF(t2)+" s. Calculate the distance travelled. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Rearrange the speed relation to solve for distance: distance is speed times time: "+iF(v2)+" × "+iF(t2)+" = "+iF(dP)+" m. The distance travelled is <b>"+F3(ans)+" m</b>.",{v2:v2,t2:t2});
});

E("br-b1-speed-compare",5,["B.1"],1,"gen",function(){
  var vA=pick([3,4,5]),tA=pick([8,10,12]),vB=vA+pick([1,2]),tB=pick([8,10,12]);
  var nameA=pick(["Maya","Liam","Sofia","Noah"]),nameB=pick(["Emma","Lucas","Ava","Ethan"]);
  var dA=vA*tA,dB=vB*tB;
  return mcq(nameA+" runs "+gF(dA)+" m in "+gF(tA)+" s. "+nameB+" runs "+gF(dB)+" m in "+gF(tB)+" s. Who runs faster?",
    nameB+", at "+F3(vB)+" m/s",
    [nameA+", at "+F3(vA)+" m/s","They run at the same speed","Whoever ran farther is faster, no matter the time"],
    "Compare the speeds, not just the distances. For "+nameA+": "+iF(dA)+" / "+iF(tA)+" = "+iF(vA)+" m/s. For "+nameB+": "+iF(dB)+" / "+iF(tB)+" = "+iF(vB)+" m/s. The larger speed belongs to <b>"+nameB+"</b>. Distance alone does not decide speed, because the times may differ.",{vA:vA,tA:tA,vB:vB,tB:tB});
});

/* ---------- B.2 Motion graphs (Science 1206 review) ---------- */

E("br-b2-slope-meaning",5,["B.2"],1,"gen",function(){
  var p=ri(6,12),q=ri(1,5),ctx=pick(["a cyclist","a hiker","a school bus","a delivery van","a runner","a ferry"]);
  var q=mcq("Two trips by "+ctx+" are drawn on the same distance-time graph. One line has slope "+gF(p)+" m/s and rises steeply, and the other has slope "+gF(q)+" m/s and rises gently. What does the steeper slope on a distance-time graph tell you?",
    "The object was moving faster",
    ["The object travelled a shorter distance","The object started earlier","The object was slowing down"],
    "On a distance-time graph, the slope is the distance covered per second, which is the speed. A steeper slope means more distance is covered each second, so <b>the object was moving faster</b>. The gently rising line, with the smaller slope, is the slower trip.",{p:p,q:q});
    q.figure=p22Plot({series:[{pts:[[0,0],[1,q._p.p]]},{pts:[[0,0],[1,q._p.q]]}],xt:[],yt:[],xmax:1.2,ymax:q._p.p*1.3,xl:"time",yl:"distance",labels:[{x:1.02,y:q._p.p,t:"slope "+gF(q._p.p)+" m/s",anchor:"start"},{x:1.02,y:q._p.q,t:"slope "+gF(q._p.q)+" m/s",anchor:"start"}]});return q;
});

E("br-b2-graph-velocity",5,["B.2"],2,"gen",function(){
  var v=pick([1.5,2,2.5,3,4,5]),t=pick([4,6,8,10,12]),x1=ri(2,15);
  var disp=sfR(v*t,4),x2=sfR(x1+disp,4),ans=sfR(v,3);
  var ctx=pick(["a walker on the East Coast Trail","a cyclist on a straight road","a boat crossing a pond","a student walking to school"]);
  var q=numq("A distance-time graph for "+ctx+" is a straight line from a distance of "+gF(x1)+" m at time zero to a distance of "+gF(x2)+" m at "+gF(t)+" s. Calculate the speed shown by the graph. Give your answer in m/s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "On a distance-time graph, the speed is the slope, the change in distance divided by the time. The change in distance: "+iF(x2)+" - "+iF(x1)+" = "+iF(disp)+" m. Divide by the time: "+iF(disp)+" / "+iF(t)+" = "+iF(v)+" m/s. The speed is <b>"+F3(ans)+" m/s</b>.",{v:v,t:t,x1:x1});
    q.figure=p22Plot({series:[{pts:[[0,x1],[t,x2]]}],xt:[[0,"0"],[t,gF(t)]],yt:[[x1,gF(x1)],[x2,gF(x2)]],xmax:t*1.08,ymax:x2*1.15,xl:"time (s)",yl:"distance (m)",dots:true});return q;
});

E("br-b2-motion-description",5,["B.2"],1,"var",varset([
  function(){
    var v=ri(3,7);
    var q=mcq("A distance-time graph for a cyclist is a straight line rising steadily, gaining "+v+" m of distance every second. Which motion does this line show?",
      "Moving away at a steady speed",
      ["Speeding up the whole time","Sitting still","Moving back toward the start"],
      "A straight, steadily rising distance-time line means the distance grows by the same amount each second. That is <b>moving away at a steady speed</b>. A curve would show a changing speed, and a flat line would show rest.",{});
    q.figure=p22Shape("line","gains "+v+" m every second");return q;
  },
  function(){
    var t=ri(4,10);
    var q=mcq("A distance-time graph for a parked snowmobile is a flat horizontal line lasting "+t+" s. Which motion does this line show?",
      "At rest, not moving",
      ["Moving at a steady speed","Speeding up slowly","Returning to the start"],
      "A flat line on a distance-time graph means the distance from the start never changes during those seconds. The snowmobile is <b>at rest, not moving</b>.",{});
    q.figure=p22Shape("flat","lasts "+t+" s");return q;
  },
  function(){
    var q=mcq("A distance-time graph for a hiker rises steadily, then goes flat for a while, then rises steadily again at the same steepness. Which description matches the hike?",
      "The hiker walked at a steady speed, rested for a while, then walked on at the same speed",
      ["The hiker sped up, then slowed down, then sped up again","The hiker walked out, walked back, then walked out again","The hiker climbed a hill, crossed a flat lookout, then climbed again at the same height"],
      "Each rising section shows distance growing steadily, which is a steady walking speed, and the two rises have the same steepness, so the speed is the same. The flat section shows the distance not changing, which is a rest. <b>The hiker walked at a steady speed, rested, then walked on at the same speed</b>.",{});
    q.figure=p22Shape("riseflat",null);return q;
  },
  function(){
    var v=ri(2,6);
    var q=mcq("A distance-time graph for a boat is a straight line falling steadily, losing "+v+" m of distance from the dock every second. Which motion does this line show?",
      "Moving back toward the dock at a steady speed",
      ["Moving away from the dock at a steady speed","At rest near the dock","Speeding up away from the dock"],
      "The distance from the dock shrinks by the same amount each second, so the boat is approaching the dock steadily. The line shows <b>moving back toward the dock at a steady speed</b>.",{});
    q.figure=p22Shape("fall","loses "+v+" m every second");return q;
  },
  function(){
    var q=mcq("A distance-time graph for a runner is a curve that gets steeper and steeper as time goes on. Which motion does this curve show?",
      "Speeding up",
      ["Moving at a steady speed","Slowing down","At rest"],
      "The slope of a distance-time graph is the speed. When the curve gets steeper, the slope grows, so more distance is covered each second. The runner is <b>speeding up</b>.",{});
    q.figure=p22Shape("curve",null);return q;
  }
]));

/* ---------- B.3 Scalars, vectors and unit conversion (Science 1206 review) ---------- */

E("br-b3-scalar-vector",5,["B.3"],1,"var",varset([
  function(){
    var v=ri(4,12);
    return textq("A cyclist's speedometer reads "+v+" m/s, with no direction stated. Is speed a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["scalar"],
      "Speed carries a size only, with no direction, and a quantity with size alone is a scalar. Speed is a <b>scalar</b>. Its partner quantity, velocity, is the vector, because velocity states a direction as well.",{});
  },
  function(){
    var d=ri(20,90);
    return textq("A hiker's displacement is "+d+" m east of camp. Is displacement a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["vector"],
      "Displacement states both a size and a direction, east, and a quantity with size and direction is a vector. Displacement is a <b>vector</b>. The distance walked to get there would be the scalar.",{});
  },
  function(){
    var t=ri(30,90);
    return textq("A trip takes "+t+" s from start to finish. Is time a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["scalar"],
      "Time has a size only. There is no direction attached to a number of seconds, so time is a <b>scalar</b>.",{});
  },
  function(){
    var m=ri(40,90);
    return textq("A student has a mass of "+m+" kg. Is mass a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["scalar"],
      "Mass states how much matter is present, a size only, with no direction. Mass is a <b>scalar</b>.",{});
  },
  function(){
    var v=ri(5,15);
    return textq("A boat's velocity is "+v+" m/s north across a bay. Is velocity a scalar or a vector quantity? Answer with one word: scalar or vector.",
      ["vector"],
      "Velocity states both a size and a direction, north, so it is a <b>vector</b>. Speed, its size alone, would be the scalar.",{});
  },
  function(){
    var d=ri(100,900);
    return textq("A road sign says the next town is "+d+" m away along the highway, with no direction stated. The distance on the sign is which kind of quantity? Answer with one word: scalar or vector.",
      ["scalar"],
      "The sign gives a size only, with no direction, so the distance is a <b>scalar</b>. Displacement between the two towns, stated with a direction, would be the vector.",{});
  }
]));

E("br-b3-unit-convert",5,["B.3"],1,"gen",function(){
  var toMs=Math.random()<0.5;
  if(toMs){
    var kmh=pick([18,36,54,72,90,108]),ms=sfR(kmh/3.6,4),ans=sfR(ms,3);
    var veh=pick(["A ferry","A school bus","A snowmobile","A delivery van","A train","A tour boat"]);
    return numq(veh+" travels at "+gF(kmh)+" km/h. Convert this speed to metres per second. Give your answer in m/s.",
      ans,Math.max(0.02*Math.abs(ans),0.05),
      "To change km/h into m/s, divide by 3.6: "+iF(kmh)+" / "+iF(3.6)+" = "+iF(ms)+" m/s. The speed is <b>"+F3(ans)+" m/s</b>.",{kmh:kmh});
  }
  var ms2=pick([5,10,15,20,25,30]),kmh2=sfR(ms2*3.6,4),ans2=sfR(kmh2,3);
  var veh2=pick(["A cyclist","A runner","A kayaker","A skater","A hiker","A swimmer"]);
  return numq(veh2+" moves at "+gF(ms2)+" m/s. Convert this speed to kilometres per hour. Give your answer in km/h.",
    ans2,Math.max(0.02*Math.abs(ans2),0.05),
    "To change m/s into km/h, multiply by 3.6: "+iF(ms2)+" × "+iF(3.6)+" = "+iF(kmh2)+" km/h. The speed is <b>"+F3(ans2)+" km/h</b>.",{ms2:ms2});
});
