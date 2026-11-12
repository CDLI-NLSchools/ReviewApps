// Diagram figures (Phase C, Nov 2026): signed number lines, motion graphs and relative motion vector lanes added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// Physics 2204 Unit 1 Kinematics question bank
// CRMARKS: u1-52-stopping-cr=5
// CRMARKS: u1-52-freefall-cr=4
// CRMARKS: u1-53-relative-cr=4
// CRMARKS: u1-51-vectors-cr=3
// CRMARKS: u1-52-graph-cr=3
// CRMARKS: u1-53-meet-cr=2

/* ---------- PH11.5.1 Vectors for displacement, velocity, acceleration ---------- */

E("u1-51-signed-add",1,["PH11.5.1"],2,"gen",function(){
  var a=ri(30,80),b=ri(10,70);
  var disp=a-b,ans=sfR(disp,3);
  var dist=a+b;
  var sol="Take east as positive, so the east leg is positive and the west leg counts against it. The total distance walked is found from "+iF(a)+" + "+iF(b)+" = "+iF(dist)+" m. ";
  if(disp>=0){sol+="The displacement is the signed sum of the legs: "+iF(a)+" - "+iF(b)+" = "+iF(disp)+" m. The displacement is <b>"+F3(ans)+" m</b>, east of the starting point.";}
  else{var mag=-disp;sol+="The west leg is larger. Its size is "+iF(b)+" - "+iF(a)+" = "+iF(mag)+" m, and because it points west the signed displacement is negative. The displacement is <b>"+F3(ans)+" m</b>, and the negative sign means west.";}
  var q=numq("Take east as positive. A hiker in Gros Morne walks "+gF(a)+" m east along a trail, then turns around and walks "+gF(b)+" m west. Calculate the hiker's displacement. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{a:a,b:b});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"}],"east","west");return q;
});

E("u1-51-vectors-cr",1,["PH11.5.1"],2,"gen",function(){
  var a=ri(20,60),b=ri(10,30),c=ri(15,50);
  var eastTotal=a+c,disp=eastTotal-b,dist=eastTotal+b,ans=sfR(disp,3);
  var sol="Take east as positive. First combine the two east legs: "+iF(a)+" + "+iF(c)+" = "+iF(eastTotal)+" m east. The west leg points the other way, so subtract it: "+iF(eastTotal)+" - "+iF(b)+" = "+iF(disp)+" m. As a check, the total distance walked is "+iF(eastTotal)+" + "+iF(b)+" = "+iF(dist)+" m, which is larger than the displacement because part of the walk was backtracked. The positive sign means the net change of position is toward the east. The displacement is <b>"+F3(ans)+" m</b> east.";
  var q=numq("Take east as positive. A delivery cyclist in St. John's rides "+gF(a)+" m east, then "+gF(b)+" m west, then "+gF(c)+" m east again. Calculate the cyclist's displacement. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{a:a,b:b,c:c});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"},{v:c,t:gF(c)+" m east"}],"east","west");return q;
});

E("u1-51-distance-vs-disp",1,["PH11.5.1"],1,"gen",function(){
  var a=ri(25,70),b=ri(5,20); if(b>=a)b=a-7;
  var dist=a+b,disp=a-b;
  var q=mcq("Take east as positive. A student walks "+gF(a)+" m east across the school yard, then walks "+gF(b)+" m west. Which pair gives the distance walked and the displacement?",
    "Distance "+F3(dist)+" m, displacement "+F3(disp)+" m east",
    ["Distance "+F3(disp)+" m, displacement "+F3(dist)+" m east",
     "Distance "+F3(dist)+" m, displacement "+F3(dist)+" m east",
     "Distance "+F3(disp)+" m, displacement "+F3(disp)+" m east"],
    "Distance is the full length of the path: "+iF(a)+" + "+iF(b)+" = "+iF(dist)+" m. Displacement is the signed change of position, with west counting against east: "+iF(a)+" - "+iF(b)+" = "+iF(disp)+" m, toward the east. Distance is a scalar and displacement is a vector, so the two are only equal when there is no backtracking.",{a:a,b:b});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"}],"east","west");return q;
});

E("u1-51-avg-velocity",1,["PH11.5.1"],2,"gen",function(){
  var d=pick([48,60,72,84,96,108,120]),t=pick([6,8,10,12]);
  var subj=pick(["A snowmobile","A delivery van","A ferry in a narrow channel","A cyclist","A tour boat","A school bus"]);
  var v=sfR(d/t,4);
  var q=mcq("Take east as positive. "+subj+" travels in a straight line and its displacement is "+gF(d)+" m east in "+gF(t)+" s. What is its average velocity?",
    F3(v)+" m/s east",
    [F3(d*t)+" m/s east",F3(v)+" m/s west",F3(sfR(v/2,4))+" m/s east"],
    "Average velocity is displacement divided by time, and it keeps the direction of the displacement: "+iF(d)+" / "+iF(t)+" = "+iF(v)+" m/s. The average velocity is <b>"+F3(v)+" m/s east</b>. Multiplying instead of dividing, halving the value, or pointing it west are the errors in the other options.",{d:d,t:t});
    q.figure=p22Collinear([{v:d,t:gF(d)+" m east"}],"east","west");return q;
});

E("u1-51-convert-speed",1,["PH11.5.1"],1,"gen",function(){
  var kmh=pick([36,54,72,90,108,126]),ms=sfR(kmh/3.6,4);
  var veh=pick(["A ferry","A snowmobile","A tour bus","A delivery truck","A fishing boat","A train","A coast guard vessel","A snowplow"]),route=pick([18,24,32,45,60,85,110,140]);
  return mcq(veh+" travels a straight route of "+gF(route)+" km at "+gF(kmh)+" km/h. What is this speed in m/s?",
    F3(ms)+" m/s",
    [F3(kmh*3.6)+" m/s",F3(kmh)+" m/s",F3(sfR(kmh/1.8,4))+" m/s"],
    "To change km/h into m/s, divide by 3.6, because each kilometre is 1000 m and each hour is 3600 s: "+iF(kmh)+" / "+iF(3.6)+" = "+iF(ms)+" m/s. The speed is <b>"+F3(ms)+" m/s</b>. Multiplying by 3.6 goes the wrong way, from m/s to km/h.",{kmh:kmh});
});

E("u1-51-accel-direction",1,["PH11.5.1"],1,"var",varset([
  function(){
    var v=ri(14,26);
    return textq("A car is travelling east at "+v+" m/s and the driver brakes steadily, so the car slows down while still moving east. Take east as positive. In one word, state the direction of the car's acceleration.",
      ["west"],
      "The car keeps moving east, but its velocity is shrinking, so the change in velocity points back toward the west. Acceleration follows the change in velocity, not the motion itself. The acceleration points <b>west</b>, opposite to the velocity.",{});
  },
  function(){
    var v=ri(6,14);
    return textq("A ball is tossed straight up at "+v+" m/s and is still rising. Take up as positive. In one word, state the direction of the ball's acceleration while it rises.",
      ["down","downward"],
      "Gravity pulls the ball back the whole time it is in the air, on the way up as well as on the way down. That is why the ball slows as it rises. The acceleration points <b>down</b>, opposite to the upward velocity.",{});
  },
  function(){
    var v=ri(8,18);
    return textq("A cyclist is travelling west at "+v+" m/s and pedals harder, speeding up while still moving west. Take east as positive. In one word, state the direction of the cyclist's acceleration.",
      ["west"],
      "The cyclist is speeding up in the westward direction, so the velocity is growing toward the west and the change in velocity points west. Acceleration follows the change in velocity. The acceleration points <b>west</b>, the same way as the velocity.",{});
  },
  function(){
    var v=ri(10,22);
    return textq("A puck slides east across the ice at "+v+" m/s and friction slows it steadily. Take east as positive. In one word, state the direction of the puck's acceleration.",
      ["west"],
      "Friction acts against the sliding, toward the west, and the puck's eastward velocity shrinks. The change in velocity points west, so the acceleration points <b>west</b>, opposite to the velocity.",{});
  },
  function(){
    var v=ri(12,24);
    return textq("A skier is sliding north at "+v+" m/s and digs in her edges, slowing down while still moving north. Take north as positive. In one word, state the direction of the skier's acceleration.",
      ["south"],
      "The skier keeps moving north, but her northward velocity is shrinking, so the change in velocity points back toward the south. The acceleration points <b>south</b>, opposite to the velocity.",{});
  }
]));

E("u1-51-signed-sum-choice",1,["PH11.5.1"],2,"gen",function(){
  var a=ri(40,80),b=ri(10,35),mag=a-b,disp=-mag;
  var q=mcq("Take north as positive. A kayaker paddles "+gF(a)+" m south from a dock, then paddles "+gF(b)+" m north. Which value is the kayaker's displacement?",
    F3(disp)+" m",
    [F3(mag)+" m",F3(-(a+b))+" m",F3(a+b)+" m"],
    "South is the negative direction here. The north leg only partly cancels the south leg: "+iF(a)+" - "+iF(b)+" = "+iF(mag)+" m of net southward travel. Keeping the sign for the southward direction gives a displacement of <b>"+F3(disp)+" m</b>. The negative sign means south. Adding the two legs gives the distance, not the displacement.",{a:a,b:b});
    q.figure=p22Collinear([{v:-a,t:gF(a)+" m south"},{v:b,t:gF(b)+" m north"}],"north","south");return q;
});

E("u1-51-position-change",1,["PH11.5.1"],2,"gen",function(){
  var west=ri(10,40),east=ri(10,60);
  var xi=-west,xf=east,disp=east+west,ans=sfR(disp,3);
  var q=numq("Take east as positive and the wharf as the origin. A boat starts at position "+gF(xi)+" m (west of the wharf) and ends at position "+gF(xf)+" m (east of the wharf). Calculate the boat's displacement. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Displacement is the change of position, final position minus initial position. The boat begins "+iF(west)+" m west of the origin and ends "+iF(east)+" m east of it, so it covers the whole span between the two positions: "+iF(west)+" + "+iF(east)+" = "+iF(disp)+" m. The displacement is <b>"+F3(ans)+" m</b>, toward the east.",{west:west,east:east});
    q.figure=p22PosLine(west,east);return q;
});

E("u1-51-collinear-combo",1,["PH11.5.1"],3,"gen",function(){
  var a=ri(30,60),b=ri(10,30),c=ri(20,50),t=pick([12,15,18,20,24,25,30]);
  var eastTotal=a+c,net=eastTotal-b,dist=eastTotal+b;
  var avgv=sfR(net/t,4),avgs=sfR(dist/t,4);
  var q=mcq("Take east as positive. A student walks "+gF(a)+" m east, then "+gF(b)+" m west, then "+gF(c)+" m east, and the whole walk takes "+gF(t)+" s. What is the student's average velocity?",
    F3(avgv)+" m/s east",
    [F3(avgs)+" m/s east",F3(net)+" m/s east",F3(avgv)+" m/s west"],
    "Average velocity needs the displacement first, not the distance. The east legs combine: "+iF(a)+" + "+iF(c)+" = "+iF(eastTotal)+" m. Subtracting the west leg: "+iF(eastTotal)+" - "+iF(b)+" = "+iF(net)+" m. Then divide by the time: "+iF(net)+" / "+iF(t)+" = "+iF(avgv)+" m/s. The average velocity is <b>"+F3(avgv)+" m/s east</b>. Using the total distance would give the average speed instead.",{a:a,b:b,c:c,t:t});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"},{v:c,t:gF(c)+" m east"}],"east","west");return q;
});

E("u1-51-graphical-add",1,["PH11.5.1"],3,"gen",function(){
  var a=ri(55,90),b=ri(20,44);
  var mag=a-b,len=sfR(mag/10,4),bothLen=sfR((a+b)/10,4);
  var q=mcq("On a scale diagram, 1 cm represents 10 m. A vector of "+gF(a)+" m east and a vector of "+gF(b)+" m west are drawn tip to tail. Which statement describes the resultant vector on the diagram?",
    "It is "+F3(len)+" cm long and points east",
    ["It is "+F3(bothLen)+" cm long and points east","It is "+F3(mag)+" cm long and points east","It is "+F3(len)+" cm long and points west"],
    "Graphical addition with opposite directions means the shorter arrow cancels part of the longer one: "+iF(a)+" - "+iF(b)+" = "+iF(mag)+" m, and the east arrow is longer, so the resultant points east. At the stated scale, each 10 m is drawn as 1 cm: "+iF(mag)+" / "+iF(10)+" = "+iF(len)+" cm. The resultant is <b>"+F3(len)+" cm long and points east</b>.",{a:a,b:b});
    q.figure=p22Collinear([{v:a,t:gF(a)+" m east"},{v:-b,t:gF(b)+" m west"}],"east","west",0,"Scale: 1 cm represents 10 m");return q;
});

/* ---------- PH11.5.2 Quantitative one-dimensional motion ---------- */

E("u1-52-vf-accel",1,["PH11.5.2"],2,"gen",function(){
  var vi=pick([4,6,8,10,12]),acc=pick([1.5,2,2.5,3]),t=ri(3,8);
  var gain=sfR(acc*t,4),vf=sfR(vi+gain,4);
  return mcq("Take the direction of motion as positive. A snowmobile starts at "+gF(vi)+" m/s and accelerates steadily at "+gF(acc)+" m/s^2 for "+gF(t)+" s. What is its final velocity?",
    F3(vf)+" m/s",
    [F3(vf)+" m/s in the opposite direction",F3(sfR(vi+acc,4))+" m/s",F3(sfR(vi+2*gain,4))+" m/s"],
    "Use the final velocity equation, final velocity is initial velocity plus acceleration times time. First the gain in velocity: "+iF(acc)+" × "+iF(t)+" = "+iF(gain)+" m/s. Then add the starting velocity: "+iF(vi)+" + "+iF(gain)+" = "+iF(vf)+" m/s. The final velocity is <b>"+F3(vf)+" m/s</b>.",{vi:vi,acc:acc,t:t});
});

E("u1-52-distance-accel",1,["PH11.5.2"],2,"gen",function(){
  var vi=pick([2,4,5,6,8]),acc=pick([1,2,3]),t=ri(3,7);
  var term1=vi*t,t2=t*t,accFull=sfR(acc*t2,4),term2=sfR(0.5*accFull,4),d=sfR(term1+term2,4),ans=sfR(d,3);
  var sol="Use the displacement equation, displacement is initial velocity times time plus one half times acceleration times time squared. The part from the starting velocity: "+iF(vi)+" × "+iF(t)+" = "+iF(term1)+" m. The time squared is "+iF(t)+" × "+iF(t)+" = "+iF(t2)+" s^2. The acceleration part before halving: "+iF(acc)+" × "+iF(t2)+" = "+iF(accFull)+" m, and half of that is "+iF(0.5)+" × "+iF(accFull)+" = "+iF(term2)+" m. Add the parts: "+iF(term1)+" + "+iF(term2)+" = "+iF(d)+" m. The displacement is <b>"+F3(ans)+" m</b>.";
  return numq("Take the direction of motion as positive. A quad bike starts at "+gF(vi)+" m/s and accelerates steadily at "+gF(acc)+" m/s^2 for "+gF(t)+" s. Calculate its displacement during this time. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{vi:vi,acc:acc,t:t});
});

E("u1-52-accel-find",1,["PH11.5.2"],2,"gen",function(){
  var acc=pick([1.5,2,2.5,3,4]),t=ri(4,10),vi=ri(2,15);
  var delta=sfR(acc*t,4),vf=sfR(vi+delta,4);
  return mcq("Take the direction of motion as positive. A cyclist speeds up steadily from "+gF(vi)+" m/s to "+gF(vf)+" m/s over "+gF(t)+" s. What is the cyclist's acceleration?",
    F3(acc)+" m/s^2",
    [F3(sfR(delta*t,4))+" m/s^2",F3(sfR(vf/t,4))+" m/s^2",F3(acc)+" m/s^2 in the opposite direction"],
    "Acceleration is the change in velocity divided by the time taken. The change in velocity: "+iF(vf)+" - "+iF(vi)+" = "+iF(delta)+" m/s. Divide by the time: "+iF(delta)+" / "+iF(t)+" = "+iF(acc)+" m/s^2. The acceleration is <b>"+F3(acc)+" m/s^2</b>, in the direction of motion because the cyclist is speeding up.",{acc:acc,t:t,vi:vi});
});

E("u1-52-time-find",1,["PH11.5.2"],2,"gen",function(){
  var acc=pick([1.5,2,2.5,3,4]),t=ri(4,12),vi=ri(2,14);
  var delta=sfR(acc*t,4),vf=sfR(vi+delta,4);
  return mcq("Take the direction of motion as positive. A car accelerates steadily at "+gF(acc)+" m/s^2, going from "+gF(vi)+" m/s to "+gF(vf)+" m/s. How long does this take?",
    F3(t)+" s",
    [F3(sfR(delta*acc,4))+" s",F3(delta)+" s",F3(sfR(t/2,4))+" s"],
    "Rearrange the final velocity equation to solve for time: time is the change in velocity divided by the acceleration. The change in velocity: "+iF(vf)+" - "+iF(vi)+" = "+iF(delta)+" m/s. Divide by the acceleration: "+iF(delta)+" / "+iF(acc)+" = "+iF(t)+" s. The time taken is <b>"+F3(t)+" s</b>. No quadratic is needed, because the acceleration equation is linear in time.",{acc:acc,t:t,vi:vi});
});

E("u1-52-freefall-distance",1,["PH11.5.2"],2,"gen",function(){
  var t=pick([1.2,1.5,1.8,2,2.2,2.5,2.8,3,3.2,3.5,4]),m=pick([0.40,0.55,0.70,0.85,1.10,1.30,1.60,2.00]);
  var ctx=pick(["A wrench is dropped from a scaffold","A buoy is dropped from a bridge deck","A stone is dropped from a cliff top","A tool bag is dropped from a lift platform"]);
  var t2=sfR(t*t,4),half=sfR(0.5*9.8,4),d=sfR(half*t2,4),ans=sfR(d,3);
  var sol="The object starts from rest and falls under gravity, so use displacement is one half times g times time squared, working with magnitudes and the word down. First the time squared: "+iF(t)+" × "+iF(t)+" = "+iF(t2)+" s^2. Half of g is "+iF(0.5)+" × "+iF(9.8)+" = "+iF(half)+" m/s^2. Then the distance: "+iF(half)+" × "+iF(t2)+" = "+iF(d)+" m. The mass does not enter the calculation, because in free fall all objects accelerate at g. The distance fallen is <b>"+F3(ans)+" m</b> down.";
  return numq(ctx+" and falls freely for "+gF(t)+" s before landing. The object has mass "+gF(m)+" kg and air resistance is negligible. Take g = 9.8 m/s^2. Calculate the distance it falls. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{t:t,m:m});
});

E("u1-52-freefall-speed",1,["PH11.5.2"],1,"gen",function(){
  var t=pick([0.8,1.1,1.4,1.7,2,2.3,2.6,2.9,3.2,3.5]),ctx=pick(["A dropped hammer","A dropped rope coil","A dropped marker buoy","A dropped ice chunk","A dropped wrench"]);
  var m=pick([0.30,0.45,0.60,0.90,1.20]);
  var vf=sfR(9.8*t,4),ans=sfR(vf,3);
  return numq(ctx+" of mass "+gF(m)+" kg falls freely from rest for "+gF(t)+" s. Air resistance is negligible and g = 9.8 m/s^2. Calculate its speed at the end of this time. Give your answer in m/s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Starting from rest, the speed grows by g every second, so final speed is g times time: "+iF(9.8)+" × "+iF(t)+" = "+iF(vf)+" m/s. The speed is <b>"+F3(ans)+" m/s</b>, directed down.",{t:t});
});

E("u1-52-thrown-down",1,["PH11.5.2"],2,"gen",function(){
  var vi=pick([3,4,5,6,7,8]),t=pick([1.2,1.6,2,2.4,2.8,3.2]),m=pick([0.20,0.35,0.50,0.65,0.80,1.00]);
  var term1=sfR(vi*t,4),t2=sfR(t*t,4),half=sfR(0.5*9.8,4),term2=sfR(half*t2,4),d=sfR(term1+term2,4),ans=sfR(d,3);
  var sol="Take down as positive. The stone already has a starting velocity, so the displacement has two parts. The part from the starting velocity: "+iF(vi)+" × "+iF(t)+" = "+iF(term1)+" m. The time squared is "+iF(t)+" × "+iF(t)+" = "+iF(t2)+" s^2. Half of g is "+iF(0.5)+" × "+iF(9.8)+" = "+iF(half)+" m/s^2, so the part from gravity is "+iF(half)+" × "+iF(t2)+" = "+iF(term2)+" m. Add the parts: "+iF(term1)+" + "+iF(term2)+" = "+iF(d)+" m. The distance fallen is <b>"+F3(ans)+" m</b>.";
  return numq("A stone of mass "+gF(m)+" kg is thrown straight down from a coastal cliff with an initial velocity of "+gF(vi)+" m/s. It falls freely for "+gF(t)+" s, with air resistance negligible and g = 9.8 m/s^2. Calculate the distance it falls in this time. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{vi:vi,t:t});
});

E("u1-52-vt-graph-area",1,["PH11.5.2"],2,"gen",function(){
  var pair=pick([[2,10],[4,14],[6,16],[3,11],[5,17],[4,10]]),t=pick([4,5,6,8]);
  var subj=pick(["the harbour ferry","a delivery cart","a cyclist","a tour boat","a snowmobile"]);
  var v1=pair[0],v2=pair[1],sum=v1+v2,avg=sfR(sum/2,4),disp=sfR(avg*t,4);
  var q=mcq("A velocity-time graph for "+subj+" is a straight line rising steadily from "+gF(v1)+" m/s at time zero to "+gF(v2)+" m/s at "+gF(t)+" s. What displacement does the graph give for this interval?",
    F3(disp)+" m",
    [F3(v2*t)+" m",F3(v1*t)+" m",F3((v2-v1)*t)+" m"],
    "On a velocity-time graph, the displacement is the area under the line. For a steadily rising line, that area is the average velocity times the time. The two velocities add: "+iF(v1)+" + "+iF(v2)+" = "+iF(sum)+" m/s. Half of that is the average: "+iF(sum)+" / "+iF(2)+" = "+iF(avg)+" m/s. The area is "+iF(avg)+" × "+iF(t)+" = "+iF(disp)+" m. The displacement is <b>"+F3(disp)+" m</b>.",{v1:v1,v2:v2,t:t});
    q.figure=p22Plot({series:[{pts:[[0,v1],[t,v2]],shade:true}],xt:[[0,"0"],[t,gF(t)]],yt:[[v1,gF(v1)],[v2,gF(v2)]],xmax:t*1.08,ymax:v2*1.18,xl:"time (s)",yl:"velocity (m/s)"});return q;
});

E("u1-52-vt-graph-slope",1,["PH11.5.2"],2,"gen",function(){
  var acc=pick([1.5,2,2.5,3]),t=ri(4,9),v1=ri(2,12);
  var delta=sfR(acc*t,4),v2=sfR(v1+delta,4),ans=sfR(acc,3);
  var q=numq("A velocity-time graph for a cart is a straight line passing through velocity "+gF(v1)+" m/s at time zero and velocity "+gF(v2)+" m/s at "+gF(t)+" s. Calculate the acceleration shown by the graph. Give your answer in m/s^2.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "On a velocity-time graph, the acceleration is the slope, the rise in velocity divided by the time interval. The rise in velocity: "+iF(v2)+" - "+iF(v1)+" = "+iF(delta)+" m/s. Divide by the time: "+iF(delta)+" / "+iF(t)+" = "+iF(acc)+" m/s^2. The acceleration is <b>"+F3(ans)+" m/s^2</b>.",{acc:acc,t:t,v1:v1});
    q.figure=p22Plot({series:[{pts:[[0,v1],[t,v2]]}],xt:[[0,"0"],[t,gF(t)]],yt:[[v1,gF(v1)],[v2,gF(v2)]],xmax:t*1.08,ymax:v2*1.18,xl:"time (s)",yl:"velocity (m/s)",dots:true});return q;
});

E("u1-52-pt-graph",1,["PH11.5.2"],1,"gen",function(){
  var v=pick([2,3,4,5,6]),t=pick([4,5,6,8,10]),x1=ri(5,20);
  var disp=v*t,x2=x1+disp;
  var q=mcq("A position-time graph for a walker is a straight line from position "+gF(x1)+" m at time zero to position "+gF(x2)+" m at "+gF(t)+" s. What is the walker's velocity?",
    F3(v)+" m/s",
    [F3(sfR(x2/t,4))+" m/s",F3(disp)+" m/s",F3(sfR(1/v,4))+" m/s"],
    "On a position-time graph, the velocity is the slope, the change in position divided by the time. The change in position: "+iF(x2)+" - "+iF(x1)+" = "+iF(disp)+" m. Divide by the time: "+iF(disp)+" / "+iF(t)+" = "+iF(v)+" m/s. The velocity is <b>"+F3(v)+" m/s</b>. Using the final position alone, instead of the change in position, is the error in one of the other options.",{v:v,t:t,x1:x1});
    q.figure=p22Plot({series:[{pts:[[0,x1],[t,x2]]}],xt:[[0,"0"],[t,gF(t)]],yt:[[x1,gF(x1)],[x2,gF(x2)]],xmax:t*1.08,ymax:x2*1.15,xl:"time (s)",yl:"position (m)",dots:true});return q;
});

E("u1-52-stopping-cr",1,["PH11.5.2"],3,"gen",function(){
  var v=pick([12,14,16,18,20,22,25]),tr=pick([0.6,0.8,1,1.2,1.5]),mu=pick([0.3,0.4,0.5,0.6,0.7,0.8]);
  var acc=sfR(mu*9.8,4),dr=sfR(v*tr,4),v2=v*v,den=sfR(2*acc,4),dbP=sfR(v2/den,4),totP=sfR(dr+dbP,4),ans=sfR(totP,3);
  var sol="The stopping distance has two parts. During the reaction time the car keeps its full speed, so the reaction distance is speed times reaction time: "+iF(v)+" × "+iF(tr)+" = "+iF(dr)+" m. For the braking part, the friction gives an acceleration of mu times g: "+iF(mu)+" × "+iF(9.8)+" = "+iF(acc)+" m/s^2. The speed squared is "+iF(v)+" × "+iF(v)+" = "+iF(v2)+" m^2/s^2, and twice the braking acceleration is "+iF(2)+" × "+iF(acc)+" = "+iF(den)+" m/s^2. The braking distance is the speed squared divided by twice the braking acceleration: "+iF(v2)+" / "+iF(den)+" = "+iF(dbP)+" m. Add the two parts: "+iF(dr)+" + "+iF(dbP)+" = "+iF(totP)+" m. The total stopping distance is <b>"+F3(ans)+" m</b>.";
  return numq("A car is travelling at "+gF(v)+" m/s on a dry road where the coefficient of friction between the tires and the road is "+gF(mu)+". The driver's reaction time is "+gF(tr)+" s, and once the brakes are applied the car decelerates at mu times g, with g = 9.8 m/s^2. Calculate the total stopping distance of the car. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v:v,tr:tr,mu:mu});
});

E("u1-52-freefall-cr",1,["PH11.5.2"],3,"gen",function(){
  var vi=pick([4,5,6,8,10]),vfT=pick([22,26,30,34,38]);
  var ctx=pick(["from a coastal cliff","from a harbour crane platform","from a lighthouse gallery","from a bridge over a gorge"]);
  var hRaw=(vfT*vfT-vi*vi)/(2*9.8),h=sfR(hRaw,3);
  var vi2=vi*vi,g2=sfR(2*9.8,4),prod=sfR(g2*h,4),under=sfR(vi2+prod,4),vfRaw=Math.sqrt(under),ans=sfR(vfRaw,3);
  var sol="Take down as positive and use the velocity equation that does not involve time: final velocity squared is initial velocity squared plus two times g times the height. The initial velocity squared: "+iF(vi)+" × "+iF(vi)+" = "+iF(vi2)+" m^2/s^2. Twice g is "+iF(2)+" × "+iF(9.8)+" = "+iF(g2)+" m/s^2. That times the height: "+iF(g2)+" × "+iF(h)+" = "+iF(prod)+" m^2/s^2. Add the two parts: "+iF(vi2)+" + "+iF(prod)+" = "+iF(under)+" m^2/s^2. Taking the square root of that total gives the final speed. The final speed is <b>"+F3(ans)+" m/s</b>, directed down. This route avoids any quadratic in time.";
  return numq("A rock is projected straight down "+ctx+" with an initial speed of "+gF(vi)+" m/s. It falls a vertical distance of "+gF(h)+" m before striking the water, with air resistance negligible and g = 9.8 m/s^2. Calculate its final speed just before it strikes the water. Give your answer in m/s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{vi:vi,h:h});
});

E("u1-52-graph-cr",1,["PH11.5.2"],2,"gen",function(){
  var v1=pick([4,6,8]),v2=pick([12,16,20]),t1=ri(2,5),t2=ri(3,6),t3=ri(2,5);
  if(v2<=v1)v2=v1+8;
  var A1=v1*t1,sum=v1+v2,avg=sfR(sum/2,4),A2=sfR(avg*t2,4),A3=v2*t3,delta=v2-v1,accP=sfR(delta/t2,4);
  var sub=sfR(A1+A2,4),tot=sfR(sub+A3,4),ans=sfR(tot,3);
  var sol="On a velocity-time graph, displacement is the total area under the graph, so find the area of each segment. Segment one is a rectangle: "+iF(v1)+" × "+iF(t1)+" = "+iF(A1)+" m. Segment two rises steadily, so its area uses the average velocity on that segment. The velocities add: "+iF(v1)+" + "+iF(v2)+" = "+iF(sum)+" m/s, and half of that is "+iF(sum)+" / "+iF(2)+" = "+iF(avg)+" m/s. The area of segment two: "+iF(avg)+" × "+iF(t2)+" = "+iF(A2)+" m. The slope of segment two also gives its acceleration: the velocity change is "+iF(v2)+" - "+iF(v1)+" = "+iF(delta)+" m/s, and "+iF(delta)+" / "+iF(t2)+" = "+iF(accP)+" m/s^2. Segment three is a rectangle: "+iF(v2)+" × "+iF(t3)+" = "+iF(A3)+" m. Add the areas in stages: "+iF(A1)+" + "+iF(A2)+" = "+iF(sub)+" m, then "+iF(sub)+" + "+iF(A3)+" = "+iF(tot)+" m. The displacement is <b>"+F3(ans)+" m</b>.";
  var q=numq("A velocity-time graph for a ferry leaving the dock has three segments. Segment one: the ferry holds a steady velocity of "+gF(v1)+" m/s for "+gF(t1)+" s. Segment two: the velocity rises steadily from "+gF(v1)+" m/s to "+gF(v2)+" m/s over "+gF(t2)+" s. Segment three: the ferry holds a steady velocity of "+gF(v2)+" m/s for "+gF(t3)+" s. Calculate the ferry's displacement over the whole graph. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v1:v1,v2:v2,t1:t1,t2:t2,t3:t3});
    q.figure=p22Plot({series:[{pts:[[0,v1],[t1,v1],[t1+t2,v2],[t1+t2+t3,v2]],shade:true}],xt:[[0,"0"],[t1,gF(t1)],[t1+t2,gF(t1+t2)],[t1+t2+t3,gF(t1+t2+t3)]],yt:[[v1,gF(v1)],[v2,gF(v2)]],xmax:(t1+t2+t3)*1.05,ymax:v2*1.18,xl:"time (s)",yl:"velocity (m/s)"});return q;
});

E("u1-52-stopping-simple",1,["PH11.5.2"],3,"gen",function(){
  var v=pick([15,18,21,24,27]),tr=pick([0.5,0.75,1,1.25]),ab=pick([3,4,5,6]);
  var dr=sfR(v*tr,4),v2=v*v,den=sfR(2*ab,4),dbP=sfR(v2/den,4),totP=sfR(dr+dbP,4),ans=sfR(totP,3);
  var sol="Split the stop into the thinking stage and the braking stage, in that order. During the reaction time the snowmobile still travels at full speed: "+iF(v)+" × "+iF(tr)+" = "+iF(dr)+" m. For the braking stage, the speed squared is "+iF(v)+" × "+iF(v)+" = "+iF(v2)+" m^2/s^2, and twice the deceleration is "+iF(2)+" × "+iF(ab)+" = "+iF(den)+" m/s^2. The braking distance is the speed squared divided by twice the deceleration: "+iF(v2)+" / "+iF(den)+" = "+iF(dbP)+" m. Add the stages: "+iF(dr)+" + "+iF(dbP)+" = "+iF(totP)+" m. The total stopping distance is <b>"+F3(ans)+" m</b>.";
  return numq("A snowmobile is travelling at "+gF(v)+" m/s when the driver spots a fallen tree ahead. The driver's reaction time is "+gF(tr)+" s, and once the brake is applied the snowmobile decelerates steadily at "+gF(ab)+" m/s^2 until it stops. Calculate the total distance the snowmobile travels from the moment the driver spots the tree until it stops. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v:v,tr:tr,ab:ab});
});

E("u1-52-two-stage",1,["PH11.5.2"],3,"gen",function(){
  var acc=pick([1.5,2,2.5,3,3.5,4]),t1=ri(3,6),t2=pick([4,5,6,7,8]);
  var v=acc*t1,prod=v*t1,d1=sfR(0.5*prod,4),d2=v*t2,tot=sfR(d1+d2,4);
  return mcq("A curling rink shuttle starts from rest and accelerates steadily at "+gF(acc)+" m/s^2 for "+gF(t1)+" s, then continues at the speed it reached for a further "+gF(t2)+" s. What is the total distance it travels?",
    F3(tot)+" m",
    [F3(d2)+" m",F3(v*(t1+t2))+" m",F3(d1)+" m"],
    "First find the speed reached. The gain in speed: "+iF(acc)+" × "+iF(t1)+" = "+iF(v)+" m/s. During the acceleration stage the average speed is half of that top speed, so the stage distance is half of speed times time. Speed times time is "+iF(v)+" × "+iF(t1)+" = "+iF(prod)+" m, and half of it is "+iF(0.5)+" × "+iF(prod)+" = "+iF(d1)+" m. The steady stage: "+iF(v)+" × "+iF(t2)+" = "+iF(d2)+" m. Add the stages: "+iF(d1)+" + "+iF(d2)+" = "+iF(tot)+" m. The total distance is <b>"+F3(tot)+" m</b>.",{acc:acc,t1:t1,t2:t2});
});

E("u1-52-avgvel-distance",1,["PH11.5.2"],2,"gen",function(){
  var vi=pick([4,6,8,10]),vf=pick([16,20,24,28]),t=pick([5,6,8,10]);
  if(vf<=vi)vf=vi+12;
  var sum=vi+vf,avg=sfR(sum/2,4),d=sfR(avg*t,4);
  return mcq("Take the direction of motion as positive. A bus accelerates steadily from "+gF(vi)+" m/s to "+gF(vf)+" m/s over "+gF(t)+" s. What distance does it travel during this time?",
    F3(d)+" m",
    [F3(vf*t)+" m",F3(vi*t)+" m",F3(sum*t)+" m"],
    "With steady acceleration, the distance is the average velocity times the time. The velocities add: "+iF(vi)+" + "+iF(vf)+" = "+iF(sum)+" m/s. Half of that is the average velocity: "+iF(sum)+" / "+iF(2)+" = "+iF(avg)+" m/s. Then the distance: "+iF(avg)+" × "+iF(t)+" = "+iF(d)+" m. The distance is <b>"+F3(d)+" m</b>. Using only the starting velocity, only the final velocity, or forgetting to halve the sum are the errors in the other options.",{vi:vi,vf:vf,t:t});
});

/* ---------- PH11.5.3 Frames of reference and relative motion ---------- */

E("u1-53-frame-identify",1,["PH11.5.3"],1,"var",varset([
  function(){
    return mcq("A woman standing on the wharf at Port aux Basques times a ferry as it leaves and reports the ferry's speed as it pulls away from the land. Which frame of reference is she using for the speed?",
      "The wharf and the shore",
      ["The ferry itself","The water moving past the ferry","Another ferry sailing nearby"],
      "A speed is always measured relative to something. She is standing still on the land and judging the motion against the land, so her frame of reference is <b>the wharf and the shore</b>. In the ferry's own frame, the ferry would be at rest.",{});
  },
  function(){
    return mcq("A passenger seated inside a moving train looks at the passenger across the aisle and judges that passenger to be perfectly still, even though the train is doing highway speed. Which frame of reference is the seated passenger using?",
      "The train",
      ["The platform the train left behind","The ground beside the tracks","A car on a parallel road"],
      "Both passengers share the train's motion, so relative to the train neither is moving. The judgement of stillness is made in the frame of <b>the train</b>. Relative to the ground, both passengers are moving at the train's full speed.",{});
  },
  function(){
    return mcq("A weather report states that rain over St. John's is falling straight down at a steady speed measured by an observer standing still outdoors. Which frame of reference do the reported rain speeds use?",
      "The ground",
      ["The falling raindrops themselves","A cyclist riding through the rain","The clouds the rain fell from"],
      "The observer is standing still on the Earth and measuring the rain against the Earth, so the frame of reference is <b>the ground</b>. A moving cyclist would judge the same rain to slant, because the cyclist's frame is different.",{});
  },
  function(){
    return mcq("The captain of a fishing boat judges the speed of an approaching boat by how quickly it grows larger and closes in on her own vessel, ignoring the motion of both boats over the seabed. Which frame of reference is she using?",
      "Her own boat",
      ["The seabed","The harbour entrance","The wind"],
      "She is judging the other boat's motion only relative to her own vessel, treating her boat as if it were still. Her frame of reference is <b>her own boat</b>. Speeds measured from the shore would be different.",{});
  },
  function(){
    return mcq("A camera bolted to the boards at a hockey rink records a puck crossing the ice, and the broadcast reports the puck's speed from that footage. Which frame of reference does the reported speed use?",
      "The rink",
      ["The puck itself","The skater who shot the puck","The opposing goalie"],
      "The camera is fixed to the rink, so all positions and speeds in the footage are measured against the rink. The frame of reference is <b>the rink</b>.",{});
  }
]));

E("u1-53-relative-concept",1,["PH11.5.3"],1,"gen",function(){
  var vt=ri(18,30),vp=pick([1,1.5,2,2.5,3]),fwd=Math.random()<0.5;
  var g=fwd?sfR(vt+vp,4):sfR(vt-vp,4),other=fwd?sfR(vt-vp,4):sfR(vt+vp,4);
  var dirWord=fwd?"toward the front of the train":"toward the back of the train";
  var sol=fwd?("Relative to the ground, the passenger's walking adds to the train's motion because both point east: "+iF(vt)+" + "+iF(vp)+" = "+iF(g)+" m/s. The speed relative to the ground is <b>"+F3(g)+" m/s east</b>."):("Relative to the ground, the passenger's walking works against the train's motion: "+iF(vt)+" - "+iF(vp)+" = "+iF(g)+" m/s. The speed relative to the ground is <b>"+F3(g)+" m/s east</b>, still eastward because the train is much faster.");
  return mcq("A train travels east at "+gF(vt)+" m/s relative to the ground. A passenger walks "+dirWord+" at "+gF(vp)+" m/s relative to the train. What is the passenger's velocity relative to the ground?",
    F3(g)+" m/s east",
    [F3(other)+" m/s east",F3(vt)+" m/s east",F3(g)+" m/s west"],
    sol,{vt:vt,vp:vp,fwd:fwd});
});

E("u1-53-same-direction",1,["PH11.5.3"],2,"gen",function(){
  var closing=pick([2,3,4,5]),t=ri(8,25),vs=ri(6,14);
  var vf=vs+closing,gap=closing*t,ans=sfR(t,3);
  var q=numq("Two delivery vans travel east on the same straight highway. The van behind is moving at "+gF(vf)+" m/s and the van ahead is moving at "+gF(vs)+" m/s, and the gap between them is "+gF(gap)+" m. Calculate how long it takes the van behind to catch up to the van ahead, assuming both hold their speeds. Give your answer in s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),
    "Because the vans move in the same direction, the gap closes at the difference of their speeds: "+iF(vf)+" - "+iF(vs)+" = "+iF(closing)+" m/s. The time to close the gap is the gap divided by the closing speed: "+iF(gap)+" / "+iF(closing)+" = "+iF(t)+" s. The time to catch up is <b>"+F3(ans)+" s</b>.",{vf:vf,vs:vs,gap:gap});
    q.figure=p22VecLanes([{v:vf,east:true,t:"van behind: "+gF(vf)+" m/s east, gap "+gF(gap)+" m"},{v:vs,east:true,t:"van ahead: "+gF(vs)+" m/s east"}]);return q;
});

E("u1-53-opposite",1,["PH11.5.3"],2,"gen",function(){
  var v1=ri(3,8),v2=ri(3,8); if(v2===v1)v2=v1+1;
  var tMeet=ri(6,20),closing=v1+v2,sep=closing*tMeet,mx=Math.max(v1,v2),diff=Math.abs(v1-v2);
  var q=mcq("Two hikers start "+gF(sep)+" m apart on a straight trail and walk directly toward each other, one at "+gF(v1)+" m/s and the other at "+gF(v2)+" m/s. How long before they meet?",
    F3(tMeet)+" s",
    [F3(sfR(sep/mx,4))+" s",F3(sfR(sep/diff,4))+" s",F3(tMeet)+" min"],
    "Because the hikers move toward each other, the gap closes at the sum of their speeds: "+iF(v1)+" + "+iF(v2)+" = "+iF(closing)+" m/s. The time to meet is the separation divided by the closing speed: "+iF(sep)+" / "+iF(closing)+" = "+iF(tMeet)+" s. They meet after <b>"+F3(tMeet)+" s</b>. Using only one speed, or the difference of the speeds, would be the right method for other setups, not for motion toward each other.",{v1:v1,v2:v2,sep:sep});
    q.figure=p22VecLanes([{v:v1,east:true,t:"hiker 1: "+gF(v1)+" m/s, separation "+gF(sep)+" m"},{v:v2,east:false,t:"hiker 2: "+gF(v2)+" m/s, toward hiker 1"}]);return q;
});

E("u1-53-boat-speed",1,["PH11.5.3"],2,"gen",function(){
  var vb=pick([6.5,7,8.5,9,10.5,12]),vc=pick([1.5,2,2.5,3]),down=Math.random()<0.5;
  var vessel=pick(["A fishing boat","A tour boat","A work boat","A sailboat under power"]);
  var g=down?sfR(vb+vc,4):sfR(vb-vc,4),other=down?sfR(vb-vc,4):sfR(vb+vc,4);
  var dirWord=down?"downstream, with the current helping it":"upstream, against the current";
  var ansWord=down?"downstream":"upstream";
  var sol=down?("The current and the boat point the same way, so their speeds add for an observer on the shore: "+iF(vb)+" + "+iF(vc)+" = "+iF(g)+" m/s. The ground speed is <b>"+F3(g)+" m/s downstream</b>."):("The current works against the boat, so the shore observer sees the boat's speed reduced by the current: "+iF(vb)+" - "+iF(vc)+" = "+iF(g)+" m/s. The ground speed is <b>"+F3(g)+" m/s upstream</b>, still upstream because the boat is faster than the current.");
  var q=mcq(vessel+" moves at "+gF(vb)+" m/s relative to the water of a river. The river current flows at "+gF(vc)+" m/s. The boat heads "+dirWord+". What is the boat's speed relative to the shore?",
    F3(g)+" m/s "+ansWord,
    [F3(other)+" m/s "+ansWord,F3(vb)+" m/s "+ansWord,F3(g)+" m/s in the opposite direction"],
    sol,{vb:vb,vc:vc,down:down});
    q.figure=p22VecLanes([{v:vb,east:down,t:"boat relative to water: "+gF(vb)+" m/s"},{v:vc,east:true,t:"river current: "+gF(vc)+" m/s"}]);return q;
});

E("u1-53-plane-wind",1,["PH11.5.3"],2,"gen",function(){
  var ground=pick([42,45,48,50,54,56,60]),t=ri(2,6),w=pick([8,10,12,15]),head=Math.random()<0.5;
  var va=head?ground+w:ground-w,dist=ground*t,ans=sfR(t,3);
  var windWord=head?"a headwind, blowing against the plane":"a tailwind, blowing from behind the plane";
  var sol=head?("A headwind reduces the ground speed: "+iF(va)+" - "+iF(w)+" = "+iF(ground)+" km/h. The flight time is the distance divided by the ground speed: "+iF(dist)+" / "+iF(ground)+" = "+iF(t)+" h. The flight time is <b>"+F3(ans)+" hours</b>."):("A tailwind adds to the ground speed: "+iF(va)+" + "+iF(w)+" = "+iF(ground)+" km/h. The flight time is the distance divided by the ground speed: "+iF(dist)+" / "+iF(ground)+" = "+iF(t)+" h. The flight time is <b>"+F3(ans)+" hours</b>.");
  var q=numq("A plane flies at "+gF(va)+" km/h relative to the air on a route of "+gF(dist)+" km. There is "+windWord+" of "+gF(w)+" km/h. Calculate the flight time for the trip. Give your answer in hours.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{va:va,w:w,dist:dist,head:head});
    q.figure=p22VecLanes([{v:va,east:true,t:"plane relative to air: "+gF(va)+" km/h"},{v:w,east:!head,t:"wind: "+gF(w)+" km/h"}]);return q;
});

E("u1-53-meet-cr",1,["PH11.5.3"],2,"gen",function(){
  var v1=pick([4.5,5,5.5,6]),v2=pick([3.5,4,4.5]),t=ri(10,30);
  var closing=sfR(v1+v2,4),sep=sfR(closing*t,4),d1=sfR(v1*t,4),ans=sfR(t,3);
  var sol="The two cyclists move toward each other, so the separation shrinks at the sum of their speeds: "+iF(v1)+" + "+iF(v2)+" = "+iF(closing)+" m/s. The time to meet is the separation divided by this closing speed: "+iF(sep)+" / "+iF(closing)+" = "+iF(t)+" s. As a check, in that time the first cyclist covers "+iF(v1)+" × "+iF(t)+" = "+iF(d1)+" m, and the second cyclist covers the rest of the separation. The time to meet is <b>"+F3(ans)+" s</b>.";
  var q=numq("Two cyclists start "+gF(sep)+" m apart on a straight section of the T'Railway and ride directly toward each other. One rides at "+gF(v1)+" m/s and the other at "+gF(v2)+" m/s, and both hold their speeds. Calculate the time until they meet. Give your answer in s.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v1:v1,v2:v2,sep:sep});
    q.figure=p22VecLanes([{v:v1,east:true,t:"cyclist 1: "+gF(v1)+" m/s, separation "+gF(sep)+" m"},{v:v2,east:false,t:"cyclist 2: "+gF(v2)+" m/s, toward cyclist 1"}]);return q;
});

E("u1-53-relative-cr",1,["PH11.5.3"],2,"gen",function(){
  var vb=pick([18,20,24,30]),vc=pick([4,5,6]),L=pick([48,60,72,84,96,120]);
  var gd=vb+vc,gu=vb-vc,tdP=sfR(L/gd,4),tuP=sfR(L/gu,4),totP=sfR(tdP+tuP,4),ans=sfR(totP,3);
  var sol="Work each leg with the ground speed for that leg, measured from the shore. Downstream the current helps, so the ground speed is "+iF(vb)+" + "+iF(vc)+" = "+iF(gd)+" km/h, and the downstream time is "+iF(L)+" / "+iF(gd)+" = "+iF(tdP)+" h. Upstream the current opposes the boat, so the ground speed is "+iF(vb)+" - "+iF(vc)+" = "+iF(gu)+" km/h, and the upstream time is "+iF(L)+" / "+iF(gu)+" = "+iF(tuP)+" h. Add the two leg times: "+iF(tdP)+" + "+iF(tuP)+" = "+iF(totP)+" h. The total time for the round trip is <b>"+F3(ans)+" hours</b>. The upstream leg takes longer, which is why the current does not cancel out over the round trip.";
  var q=numq("A tour boat moves at "+gF(vb)+" km/h relative to the water of a river whose current flows at "+gF(vc)+" km/h. The boat travels "+gF(L)+" km downstream from a wharf and then returns the same "+gF(L)+" km upstream to the wharf. Calculate the total time for the round trip. Give your answer in hours.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{vb:vb,vc:vc,L:L});
    q.figure=p22VecLanes([{v:vb,east:true,t:"downstream leg, boat: "+gF(vb)+" km/h"},{v:vc,east:true,t:"downstream leg, current: "+gF(vc)+" km/h"},{v:vb,east:false,t:"upstream leg, boat: "+gF(vb)+" km/h"},{v:vc,east:true,t:"upstream leg, current: "+gF(vc)+" km/h"}]);return q;
});

E("u1-53-pass-separation",1,["PH11.5.3"],3,"gen",function(){
  var v1=ri(8,14),v2=ri(8,14),tMeet=ri(5,12),extra=ri(3,10);
  var closing=v1+v2,sep0=closing*tMeet,total=tMeet+extra,sep=closing*extra,ans=sfR(sep,3);
  var sol="First find when the cars meet. Moving toward each other, they close the gap at "+iF(v1)+" + "+iF(v2)+" = "+iF(closing)+" m/s, so the meeting time is "+iF(sep0)+" / "+iF(closing)+" = "+iF(tMeet)+" s. The clock time asked about is later than that: "+iF(total)+" - "+iF(tMeet)+" = "+iF(extra)+" s after they pass each other. After passing, the same closing speed becomes a separating speed, so the separation then is "+iF(closing)+" × "+iF(extra)+" = "+iF(sep)+" m. The separation is <b>"+F3(ans)+" m</b>.";
  var q=numq("Two cars start "+gF(sep0)+" m apart on a straight highway and drive directly toward each other, one at "+gF(v1)+" m/s and the other at "+gF(v2)+" m/s. Both hold their speeds, pass each other, and keep going. Calculate the separation between the cars "+gF(total)+" s after they start. Give your answer in m.",
    ans,Math.max(0.02*Math.abs(ans),0.05),sol,{v1:v1,v2:v2,sep0:sep0,total:total});
    q.figure=p22VecLanes([{v:v1,east:true,t:"car 1: "+gF(v1)+" m/s, starting separation "+gF(sep0)+" m"},{v:v2,east:false,t:"car 2: "+gF(v2)+" m/s, toward car 1"}]);return q;
});

E("u1-53-wind-roundtrip",1,["PH11.5.3"],3,"gen",function(){
  var va=ri(52,68),w=ri(6,14),D=ri(220,380);
  var go=va+w,gb=va-w,toP=sfR(D/go,4),tbP=sfR(D/gb,4),totP=sfR(toP+tbP,4),ans=sfR(totP,3);
  var bothTail=sfR(2*toP,4),oneWay=sfR(toP+sfR(D/va,4),4),bothHead=sfR(2*tbP,4);
  var q=mcq("A plane whose speed relative to the air is "+gF(va)+" km/h makes a round trip between two airports "+gF(D)+" km apart. A steady wind of "+gF(w)+" km/h blows along the route, acting as a tailwind on the way out and a headwind on the way back. What is the total flight time for the round trip?",
    F3(ans)+" hours",
    [F3(bothTail)+" hours",F3(oneWay)+" hours",F3(bothHead)+" hours"],
    "The wind changes the ground speed on each leg, so the legs must be timed separately. Outbound, with the tailwind: "+iF(va)+" + "+iF(w)+" = "+iF(go)+" km/h, and the time is "+iF(D)+" / "+iF(go)+" = "+iF(toP)+" h. Returning, against the headwind: "+iF(va)+" - "+iF(w)+" = "+iF(gb)+" km/h, and the time is "+iF(D)+" / "+iF(gb)+" = "+iF(tbP)+" h. Add the leg times: "+iF(toP)+" + "+iF(tbP)+" = "+iF(totP)+" h. The total flight time is <b>"+F3(ans)+" hours</b>. The wind does not cancel out, because the plane spends longer in the headwind leg than in the tailwind leg.",{va:va,w:w,D:D});
    q.figure=p22VecLanes([{v:va,east:true,t:"way out, plane: "+gF(va)+" km/h"},{v:w,east:true,t:"way out, wind (tailwind): "+gF(w)+" km/h"},{v:va,east:false,t:"way back, plane: "+gF(va)+" km/h"},{v:w,east:true,t:"way back, wind (headwind): "+gF(w)+" km/h"}]);return q;
});
