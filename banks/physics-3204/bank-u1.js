// Diagram figures (Phase C, Nov 2026): entries whose source question type
// carried a diagram now set qq3204.figure from the draw's own values via the
// p32fig* helpers in bank-helpers.js. Asked unknowns are labelled "?".
// Physics 3204 Unit 1 Motion question bank
// CRMARKS: u1-51-resultant-cr=3
// CRMARKS: u1-53-drift-cr=3
// CRMARKS: u1-53-heading-cr=3
// CRMARKS: u1-53-aircraft-heading-cr=4
// CRMARKS: u1-54-cliff-height-cr=3
// CRMARKS: u1-54-hit-or-miss-cr=4
// CRMARKS: u1-55-stick-2d-cr=5
// CRMARKS: u1-55-third-piece-cr=4

/* Units and significant figures discipline: givens are fixed at 3 sf and
   printed with gF(); intermediates are chained at 4 sf with iF() so every
   printed arithmetic line reproduces at printed precision; final answers
   are stored and printed at 3 sf with F3(). Helpers (sfR, sfF, F3, iF, gF)
   and constants (PHYS_G = 9.8 m/s^2, PHYS_C) come from bank-helpers.js. */

/* ---------- PH12.5.1 Vectors ---------- */

E("u1-51-components",1,["PH12.5.1"],1,"gen",function(){
  var v=ri(8,30), th=pick([24,28,32,38,42,48,52,58,64,68]);
  var rad=th*Math.PI/180, c4=sfR(Math.cos(rad),4), s4=sfR(Math.sin(rad),4);
  var vx4=sfR(v*c4,4), vy4=sfR(v*s4,4);
  var qq3204 = mcq("A velocity of "+gF(v)+" m/s is directed "+th+"° north of east. What is the east component of the velocity?",
    F3(vx4)+" m/s",
    [F3(vy4)+" m/s", F3(v)+" m/s", F3(sfR(vx4+vy4,4))+" m/s"],
    "The east component is the side adjacent to the angle, so it is v cos θ. vx = "+gF(v)+" × "+iF(c4)+" = "+iF(vx4)+" m/s. The east component is "+F3(vx4)+" m/s. (The north component, v sin θ, is "+F3(vy4)+" m/s.)",
    {v:v,th:th}); qq3204.figure = p32figVecTri(v,th); return qq3204;
});

E("u1-51-direction-from-components",1,["PH12.5.1"],1,"gen",function(){
  var a=ri(3,12), b=ri(3,12), tr=0;
  while(a===b&&tr<50){b=ri(3,12);tr++;}
  var th=sfR(Math.atan2(b,a)*180/Math.PI,4), comp=sfR(90-th,4);
  var qq3204 = mcq("A displacement has components of "+gF(-a)+" m east and "+gF(b)+" m north, using the convention that east and north are positive. In which direction is the displacement?",
    F3(th)+"° north of west",
    [F3(comp)+"° north of west", F3(th)+"° north of east", F3(comp)+"° south of west"],
    "The east component is negative, so the displacement points partly west, while the north component is positive. The angle from the west direction is arctan("+gF(b)+" / "+gF(a)+"), which gives "+F3(th)+"°. The displacement points "+F3(th)+"° north of west.",
    {a:a,b:b}); qq3204.figure = p32figVecFromComp(a,b); return qq3204;
});

E("u1-51-collinear-net",1,["PH12.5.1"],1,"gen",function(){
  var a=ri(15,60), b=ri(4,a-4);
  var ans=sfR(a-b,3);
  var qq3204 = numq("A fishing boat sails "+gF(a)+" km east from port, then turns around and sails "+gF(b)+" km west. How far is the boat from its starting point? Give your answer in km.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The two legs are along the same line in opposite directions, so the displacement is the difference of the two distances. "+gF(a)+" - "+gF(b)+" = "+F3(a-b)+" km. The boat is "+F3(ans)+" km from its starting point, east of it.",
    {a:a,b:b}); qq3204.figure = p32figCollinear(a,b); return qq3204;
});

E("u1-51-resultant-magnitude",1,["PH12.5.1"],2,"gen",function(){
  var a=ri(20,120), b=ri(20,120);
  var sum=a*a+b*b, R=Math.sqrt(sum), ans=sfR(R,3);
  var qq3204 = numq("A hiker walks "+gF(a)+" m east and then "+gF(b)+" m north. What is the magnitude of the hiker's total displacement? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The two legs are perpendicular, so the displacement is the hypotenuse of a right triangle. Squaring the legs: "+(a*a)+" + "+(b*b)+" = "+sum+". Taking the square root of "+sum+" gives "+F3(R)+" m. The magnitude of the displacement is "+F3(ans)+" m.",
    {a:a,b:b}); qq3204.figure = p32figResultant2(a,b,"m"); return qq3204;
});

E("u1-51-avg-vel-vs-speed",1,["PH12.5.1"],2,"gen",function(){
  var d1=ri(30,110), t1=ri(30,100), d2=ri(10,d1-6), t2=ri(20,80);
  var T4=sfR((t1+t2)/60,4);
  var avgSpeed=(d1+d2)/T4, avgVel=(d1-d2)/T4;
  var s1=d1/(t1/60), s2=d2/(t2/60), meanSpeed=(s1+s2)/2;
  var key=F3(avgSpeed)+" km/h";
  var seen={}; seen[key]=1;
  var raw=[meanSpeed,avgVel,s1];
  var opts=raw.map(function(d){var s=F3(d)+" km/h",k=0;while(seen[s]&&k<50){d=d*1.17+0.4;s=F3(d)+" km/h";k++;}seen[s]=1;return s;});
  return mcq("A delivery van drives "+gF(d1)+" km east in "+t1+" min, then turns and drives "+gF(d2)+" km west in "+t2+" min. What is the average speed of the van for the whole trip?",
    key, opts,
    "Average speed uses the total distance travelled, not the displacement. Total distance: "+d1+" + "+d2+" = "+(d1+d2)+" km. Total time: "+(t1+t2)+" min, which is "+iF(T4)+" h. Average speed = "+(d1+d2)+" / "+iF(T4)+" = "+F3(avgSpeed)+" km/h. (The average velocity is smaller, "+F3(avgVel)+" km/h east, because the displacement is only "+(d1-d2)+" km.)",
    {d1:d1,t1:t1,d2:d2,t2:t2});
});

E("u1-51-resultant-cr",1,["PH12.5.1"],2,"gen",function(){
  var a=ri(15,90), b=ri(15,90), c=ri(15,90);
  var e=a+c, sum=e*e+b*b, R=Math.sqrt(sum), ans=sfR(R,3);
  var ang=sfR(Math.atan2(b,e)*180/Math.PI,3);
  var qq3204 = numq("A kayaker paddles "+gF(a)+" m east, then "+gF(b)+" m north, then "+gF(c)+" m east again. What is the magnitude of the kayaker's total displacement from the start? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Combine the two east legs first: "+gF(a)+" + "+gF(c)+" = "+F3(e)+" m east. The north leg of "+gF(b)+" m is perpendicular to that total. Squaring and adding: "+(e*e)+" + "+(b*b)+" = "+sum+". Taking the square root of "+sum+" gives "+F3(R)+" m, at an angle of "+F3(ang)+"° north of east. The magnitude of the displacement is "+F3(ans)+" m.",
    {a:a,b:b,c:c}); qq3204.figure = p32figResultant3(a,b,c); return qq3204;
});

E("u1-51-claims",1,["PH12.5.1"],3,"gen",function(){
  var a=ri(18,95), b=ri(18,95), tr=0;
  while(a===b&&tr<50){b=ri(18,95);tr++;}
  var R=Math.sqrt(a*a+b*b);
  var half=R/2, tr2=0;
  while(Math.abs(half-Math.abs(a-b))<0.02*R&&tr2<50){half=half*1.13;tr2++;}
  var qq3204 = mcq("A student is asked for the resultant of a displacement of "+gF(a)+" m east followed by "+gF(b)+" m north. The student answers "+gF(a+b)+" m. Which statement correctly evaluates the student's answer?",
    "The student added the legs as if they were in a straight line. The legs are perpendicular, so Pythagoras gives a resultant of "+F3(R)+" m.",
    ["The student should have subtracted the legs, giving a resultant of "+F3(Math.abs(a-b))+" m.",
     "The answer "+gF(a+b)+" m is correct in size, and only the direction is missing.",
     "Each leg contributes only half, so the resultant is "+F3(half)+" m."],
    "East and north legs are perpendicular, so they cannot be added as straight-line distances. The resultant is the hypotenuse: squaring and adding, "+(a*a)+" + "+(b*b)+" = "+(a*a+b*b)+", and the square root of "+(a*a+b*b)+" is "+F3(R)+" m. The student's "+gF(a+b)+" m is the total distance walked, not the displacement.",
    {a:a,b:b}); qq3204.figure = p32figResultant2(a,b,"m"); return qq3204;
});

/* ---------- PH12.5.2 Frame of reference ---------- */

E("u1-52-largest-speed",1,["PH12.5.2"],1,"gen",function(){
  var veh=pick([["ferry","the shore",[8,14]],["bus","the road",[11,18]],["train","the ground",[14,28]],["moving walkway","the terminal floor",[0.4,0.5,0.6,0.75,0.9]]]);
  var V=veh[2][0]<1?pick(veh[2]):ri(veh[2][0],veh[2][1]);
  var w=ri(1,3), guard=0;
  while(guard++<20){var opts=[V+w,Math.abs(V-w),w,V].map(function(x){return F3(x);});if(new Set(opts).size===4)break;w=ri(1,3);}
  return mcq("A "+veh[0]+" moves at "+gF(V)+" m/s relative to "+veh[1]+". A passenger walks toward the front of the "+veh[0]+" at "+gF(w)+" m/s relative to the "+veh[0]+". What is the passenger's speed relative to "+veh[1]+"?",
    F3(V+w)+" m/s",
    [F3(Math.abs(V-w))+" m/s", F3(w)+" m/s", F3(V)+" m/s"],
    "Both motions are in the same direction, so the speeds add when the frame changes. Relative to "+veh[1]+", the passenger has the speed of the "+veh[0]+" plus the walking speed: "+gF(V)+" + "+gF(w)+" = "+F3(V+w)+" m/s.",
    {V:V,w:w});
});

E("u1-52-dropped-ball",1,["PH12.5.2"],1,"gen",function(){
  var pair=pick([["ferry","passenger"],["fishing boat","fisher"],["sailing boat","sailor"],["cargo boat","crew member"]]);
  var V=ri(4,14), h=ri(6,20);
  return textq("A "+pair[1]+" at the top of a "+pair[0]+"'s mast, "+gF(h)+" m above the deck, drops a wrench while the "+pair[0]+" moves steadily at "+gF(V)+" m/s. Describe the path of the wrench as seen by an observer standing on the shore. Give your answer as one word.",
    ["parabola"],
    "In the shore frame the wrench keeps the "+pair[0]+"'s horizontal velocity of "+gF(V)+" m/s while gravity accelerates it downward, so the two motions combine into a parabola. In the "+pair[0]+"'s own frame it simply falls straight down. The path seen from the shore is a parabola.",
    {V:V,h:h});
});

E("u1-52-invariants",1,["PH12.5.2"],1,"gen",function(){
  var V=ri(5,20);
  var ev=pick(["a crate sliding to a stop across the deck","a ball rolling down a ramp on board","a passenger walking the length of the cabin","a pendulum swinging in the cabin"]);
  return mcq("A ferry crosses a harbour at a steady "+gF(V)+" m/s. Observers on the ferry time "+ev+", and a person on the dock times the same event with an identical stopwatch. Which quantity do the ferry observers and the dock observer all measure to be the same?",
    "The time interval between the start and the end of the event",
    ["The speed of the moving object during the event",
     "The distance travelled by the object during the event",
     "The kinetic energy of the object during the event"],
    "Changing the frame of reference changes measured velocities, and with them the distances travelled and the kinetic energies. In classical physics, the time interval between the same two events is the one quantity every observer measures identically. The time interval is the same in both frames.",
    {V:V});
});

E("u1-52-two-frames",1,["PH12.5.2"],2,"gen",function(){
  var veh=pick(["snowmobiles","cyclists","kayaks","runners"]);
  var s2=ri(9,22), diff=ri(3,14), s1=s2+diff;
  return mcq("Two "+veh+" travel in the same direction along a straight trail. The faster one moves at "+gF(s1)+" m/s relative to the ground and the slower one at "+gF(s2)+" m/s relative to the ground. What is the speed of the faster one relative to the slower one?",
    F3(diff)+" m/s",
    [F3(s1+s2)+" m/s", F3(s1)+" m/s", F3((s1+s2)/2)+" m/s"],
    "For motion in the same direction, the relative speed is the difference of the two ground speeds: "+gF(s1)+" - "+gF(s2)+" = "+F3(diff)+" m/s. Adding the speeds would apply if they moved in opposite directions.",
    {s1:s1,s2:s2});
});

E("u1-52-who-is-right",1,["PH12.5.2"],3,"gen",function(){
  var veh=pick(["train","ferry","bus"]);
  var V=ri(10,30);
  return mcq("A passenger sits in a "+veh+" that moves at a steady "+gF(V)+" m/s. The passenger says, \"I am at rest.\" A person standing outside says, \"You are moving at "+gF(V)+" m/s.\" Who is correct?",
    "Both are correct, because motion is always described relative to a chosen frame of reference",
    ["Only the person outside is correct, because the "+veh+" really is moving",
     "Only the passenger is correct, because the passenger feels no motion",
     "Neither is correct, because speed cannot be measured from inside a moving vehicle"],
    "There is no single absolute frame for describing motion. Relative to the "+veh+", the passenger's velocity is zero; relative to the ground, it is "+gF(V)+" m/s. Both statements are correct in their own frame of reference.",
    {V:V});
});

/* ---------- PH12.5.3 Two-dimensional relative motion ---------- */

E("u1-53-river-resultant",1,["PH12.5.3"],2,"gen",function(){
  var vb=ri(6,16)/2, vc=ri(2,9)/2, tr=0;
  while(vc===vb&&tr<50){vc=ri(2,9)/2;tr++;}
  var sq1=sfR(vb*vb,4), sq2=sfR(vc*vc,4), sum=sfR(sq1+sq2,4), R=Math.sqrt(sum);
  var qq3204 = mcq("A boat that travels at "+gF(vb)+" m/s in still water is pointed straight across a river whose current flows at "+gF(vc)+" m/s. What is the boat's speed relative to the shore?",
    F3(R)+" m/s",
    [F3(vb+vc)+" m/s", F3(Math.abs(vb-vc))+" m/s", F3(Math.sqrt(Math.abs(sq1-sq2)))+" m/s"],
    "The boat's velocity across the river and the current's velocity along the river are perpendicular, so the resultant speed is found with Pythagoras. Squaring and adding: "+iF(sq1)+" + "+iF(sq2)+" = "+iF(sum)+", and the square root of "+iF(sum)+" is "+F3(R)+" m/s. The boat's speed relative to the shore is "+F3(R)+" m/s.",
    {vb:vb,vc:vc}); qq3204.figure = p32figRiver(vb,vc,0,"resultant"); return qq3204;
});

E("u1-53-crossing-time",1,["PH12.5.3"],2,"gen",function(){
  var w=ri(60,240), vb=ri(6,15)/2, vc=ri(2,8)/2;
  var t4=sfR(w/vb,4), ans=sfR(t4,3);
  var qq3204 = numq("A river is "+gF(w)+" m wide and flows at "+gF(vc)+" m/s. A boat that travels at "+gF(vb)+" m/s in still water is pointed straight across the river. How long does the boat take to cross? Give your answer in s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Only the across-river component of the velocity shortens the crossing, and that component is the boat's full still-water speed of "+gF(vb)+" m/s. The current pushes the boat downstream but does not change the crossing time. t = "+gF(w)+" / "+gF(vb)+" = "+iF(t4)+" s. The crossing time is "+F3(ans)+" s.",
    {w:w,vb:vb,vc:vc}); qq3204.figure = p32figRiver(vb,vc,w,"time"); return qq3204;
});

E("u1-53-drift-cr",1,["PH12.5.3"],2,"gen",function(){
  var w=ri(70,260), vb=ri(6,15)/2, vc=ri(2,8)/2;
  var t4=sfR(w/vb,4), drift4=sfR(vc*t4,4), ans=sfR(drift4,3);
  var qq3204 = numq("A boat that travels at "+gF(vb)+" m/s in still water is pointed straight across a river "+gF(w)+" m wide. The current flows at "+gF(vc)+" m/s. How far downstream from the point directly opposite the launch does the boat land? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "First find the crossing time from the across-river motion: t = "+gF(w)+" / "+gF(vb)+" = "+iF(t4)+" s. During that whole time the current carries the boat downstream at "+gF(vc)+" m/s. Drift = "+gF(vc)+" × "+iF(t4)+" = "+iF(drift4)+" m. The boat lands "+F3(ans)+" m downstream.",
    {w:w,vb:vb,vc:vc}); qq3204.figure = p32figRiver(vb,vc,w,"drift"); return qq3204;
});

E("u1-53-heading-cr",1,["PH12.5.3"],3,"gen",function(){
  var vb=pick([5.0,5.5,6.0,6.5,7.0,7.5,8.0]), vc=ri(2,9)/2;
  var ratio4=sfR(vc/vb,4), th=Math.asin(vc/vb)*180/Math.PI, ans=sfR(th,3);
  var cos4=sfR(Math.cos(th*Math.PI/180),4), cross4=sfR(vb*cos4,4);
  var qq3204 = numq("A boat that travels at "+gF(vb)+" m/s in still water must land at a dock directly across a river from its launch point. The current flows at "+gF(vc)+" m/s. At what angle upstream from the straight-across direction must the boat be pointed? Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "To travel straight across, the upstream component of the boat's velocity must exactly cancel the current. That component is vb sin θ, so sin θ = "+gF(vc)+" / "+gF(vb)+" = "+iF(ratio4)+". Taking the inverse sine gives θ = "+F3(th)+"°. The across-river component is then "+gF(vb)+" × "+iF(cos4)+" = "+iF(cross4)+" m/s. The boat must be pointed "+F3(ans)+"° upstream from the straight-across direction.",
    {vb:vb,vc:vc}); qq3204.figure = p32figRiver(vb,vc,0,"heading"); return qq3204;
});

E("u1-53-aircraft-ground",1,["PH12.5.3"],2,"gen",function(){
  var va=ri(150,260), vw=ri(20,70);
  var sum=va*va+vw*vw, R=Math.sqrt(sum);
  var qq3204 = mcq("A plane flies with an airspeed of "+gF(va)+" km/h pointed due north. A wind blows toward the east at "+gF(vw)+" km/h. What is the plane's ground speed?",
    F3(R)+" km/h",
    [F3(va+vw)+" km/h", F3(va-vw)+" km/h", F3(Math.sqrt(va*va-vw*vw))+" km/h"],
    "The plane's velocity through the air and the wind's velocity are perpendicular, so the ground velocity is the hypotenuse of the velocity triangle. Squaring and adding: "+(va*va)+" + "+(vw*vw)+" = "+sum+", and the square root of "+sum+" is "+F3(R)+" km/h. The ground speed is "+F3(R)+" km/h.",
    {va:va,vw:vw}); qq3204.figure = p32figAircraft(va,vw,"ground"); return qq3204;
});

E("u1-53-aircraft-heading-cr",1,["PH12.5.3"],3,"gen",function(){
  var va=ri(160,280), vw=ri(25,85);
  var ratio4=sfR(vw/va,4), th=Math.asin(vw/va)*180/Math.PI, ans=sfR(th,3);
  var diff=va*va-vw*vw, vg=Math.sqrt(diff);
  var qq3204 = numq("A pilot must fly due north over the ground. The plane's airspeed is "+gF(va)+" km/h and a wind blows toward the east at "+gF(vw)+" km/h. At what angle west of north must the plane be pointed? Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The plane must be pointed partly into the wind so that the westward component of its velocity through the air cancels the eastward wind. That component is va sin θ, so sin θ = "+vw+" / "+va+" = "+iF(ratio4)+". Taking the inverse sine gives θ = "+F3(th)+"°. The ground speed follows from Pythagoras: "+(va*va)+" - "+(vw*vw)+" = "+diff+", and the square root of "+diff+" is "+F3(vg)+" km/h. The plane must be pointed "+F3(ans)+"° west of north.",
    {va:va,vw:vw}); qq3204.figure = p32figAircraft(va,vw,"heading"); return qq3204;
});

E("u1-53-round-trip",1,["PH12.5.3"],2,"gen",function(){
  var d=ri(300,950), vb=ri(10,18)/2, vc=ri(2,6)/2;
  var down=sfR(vb+vc,4), up=sfR(vb-vc,4);
  var td=sfR(d/down,4), tu=sfR(d/up,4), tot=sfR(td+tu,4), ans=sfR(tot,3);
  var qq3204 = numq("A patrol boat travels "+gF(d)+" m downstream and then returns "+gF(d)+" m upstream to its start. The boat's speed in still water is "+gF(vb)+" m/s and the current flows at "+gF(vc)+" m/s. What is the total time for the round trip? Give your answer in s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Downstream the current helps: "+gF(vb)+" + "+gF(vc)+" = "+gF(down)+" m/s, so the downstream leg takes "+fmt(d,0)+" / "+gF(down)+" = "+iF(td)+" s. Upstream the current opposes: "+gF(vb)+" - "+gF(vc)+" = "+gF(up)+" m/s, so the return leg takes "+fmt(d,0)+" / "+gF(up)+" = "+iF(tu)+" s. Total time: "+iF(td)+" + "+iF(tu)+" = "+iF(tot)+" s. The round trip takes "+F3(ans)+" s.",
    {d:d,vb:vb,vc:vc}); qq3204.figure = p32figRoundTrip(d,vb,vc); return qq3204;
});

/* ---------- PH12.5.4 Projectile motion ---------- */

E("u1-54-fall-time",1,["PH12.5.4"],1,"gen",function(){
  var h=ri(12,85);
  var q4=sfR(2*h/PHYS_G,4), t=sfR(Math.sqrt(q4),4), ans=sfR(t,3);
  var qq3204 = numq("A stone is projected horizontally from the top of a cliff "+gF(h)+" m above the water. How long does the stone take to reach the water? Give your answer in s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The vertical motion is free fall from rest, so h = (1/2) g t² and t² = 2h / g. Twice the height is "+(2*h)+" m, and "+(2*h)+" / 9.8 = "+iF(q4)+" s². The square root of "+iF(q4)+" is "+F3(t)+" s. The stone takes "+F3(ans)+" s to reach the water, whatever its horizontal speed.",
    {h:h}); qq3204.figure = p32figCliff(gF(h)+" m",null,null,true); return qq3204;
});

E("u1-54-angled-components",1,["PH12.5.4"],1,"gen",function(){
  var v=ri(14,38), th=pick([25,30,35,40,50,55,60,65]);
  var rad=th*Math.PI/180, s4=sfR(Math.sin(rad),4), c4=sfR(Math.cos(rad),4);
  var vy4=sfR(v*s4,4), vx4=sfR(v*c4,4);
  var qq3204 = mcq("A ball is launched at "+gF(v)+" m/s at an angle of "+th+"° above the horizontal. What is the initial vertical component of its velocity?",
    F3(vy4)+" m/s",
    [F3(vx4)+" m/s", F3(v)+" m/s", F3(sfR(vx4+vy4,4))+" m/s"],
    "The vertical component is the side opposite the launch angle, so it is v sin θ. vy = "+gF(v)+" × "+iF(s4)+" = "+iF(vy4)+" m/s. The initial vertical component is "+F3(vy4)+" m/s.",
    {v:v,th:th}); qq3204.figure = p32figLaunch(v,th,"components"); return qq3204;
});

E("u1-54-horiz-range",1,["PH12.5.4"],2,"gen",function(){
  var v=ri(12,50)/2, h=ri(10,70);
  var q4=sfR(2*h/PHYS_G,4), t4=sfR(Math.sqrt(q4),4), r4=sfR(v*t4,4), ans=sfR(r4,3);
  var qq3204 = numq("A ball is projected horizontally at "+gF(v)+" m/s from the top of a cliff "+gF(h)+" m high. How far from the base of the cliff does the ball land? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The fall time comes from the vertical motion: t² = 2h / g = "+(2*h)+" / 9.8 = "+iF(q4)+" s², so t = "+iF(t4)+" s. Horizontally the ball keeps its launch speed for the whole fall: range = "+gF(v)+" × "+iF(t4)+" = "+iF(r4)+" m. The ball lands "+F3(ans)+" m from the base of the cliff.",
    {v:v,h:h}); qq3204.figure = p32figCliff(gF(h)+" m",gF(v)+" m/s","?",true); return qq3204;
});

E("u1-54-cliff-height-cr",1,["PH12.5.4"],2,"gen",function(){
  var v=ri(8,30), R=ri(15,90);
  var t4=sfR(R/v,4), tsq=sfR(t4*t4,4), h4=sfR(4.9*tsq,4), ans=sfR(h4,3);
  var qq3204 = numq("A stone is projected horizontally at "+gF(v)+" m/s from the top of a sea cliff and lands in the water "+gF(R)+" m from the base of the cliff. How high is the cliff? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The horizontal motion gives the fall time: t = "+gF(R)+" / "+gF(v)+" = "+iF(t4)+" s. Vertically the stone falls from rest under gravity, so first square the time: "+iF(t4)+" × "+iF(t4)+" = "+iF(tsq)+" s². Then h = (1/2) g t² = 4.90 × "+iF(tsq)+" = "+iF(h4)+" m. The cliff is "+F3(ans)+" m high.",
    {v:v,R:R}); qq3204.figure = p32figCliff("?",gF(v)+" m/s",gF(R)+" m",true); return qq3204;
});

E("u1-54-launch-speed",1,["PH12.5.4"],2,"gen",function(){
  var h=ri(15,75), R=ri(20,95);
  var q4=sfR(2*h/PHYS_G,4), t4=sfR(Math.sqrt(q4),4);
  var v4=sfR(R/t4,4), vy4=sfR(PHYS_G*t4,4), imp4=sfR(Math.sqrt(v4*v4+vy4*vy4),4);
  var key=F3(v4)+" m/s", seen={}; seen[key]=1;
  var raw=[vy4, sfR(v4/2,4), imp4];
  var opts=raw.map(function(d){var s=F3(d)+" m/s",k=0;while(seen[s]&&k<50){d=d*1.21+0.3;s=F3(d)+" m/s";k++;}seen[s]=1;return s;});
  var qq3204 = mcq("A ball is projected horizontally from a cliff "+gF(h)+" m high and lands "+gF(R)+" m from the base of the cliff. What was the launch speed of the ball?",
    key, opts,
    "The fall time comes from the height: t² = 2h / g = "+(2*h)+" / 9.8 = "+iF(q4)+" s², so t = "+iF(t4)+" s. The launch speed is the horizontal distance covered in that time: "+gF(R)+" / "+iF(t4)+" = "+iF(v4)+" m/s. The launch speed was "+F3(v4)+" m/s.",
    {h:h,R:R}); qq3204.figure = p32figCliff(gF(h)+" m","?",gF(R)+" m",true); return qq3204;
});

E("u1-54-max-height",1,["PH12.5.4"],2,"gen",function(){
  var v=ri(15,40), th=pick([25,30,35,40,45,50,55,60,65]);
  var rad=th*Math.PI/180, s4=sfR(Math.sin(rad),4);
  var vy4=sfR(v*s4,4), sq4=sfR(vy4*vy4,4), H4=sfR(sq4/(2*PHYS_G),4), ans=sfR(H4,3);
  var qq3204 = numq("A golf ball is driven at "+gF(v)+" m/s at an angle of "+th+"° above the horizontal. What is the maximum height the ball reaches? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Only the vertical component matters for the height. vy = "+gF(v)+" × "+iF(s4)+" = "+iF(vy4)+" m/s. At the top of the flight the vertical velocity is zero, so H = vy² / (2g). Squaring: "+iF(vy4)+" × "+iF(vy4)+" = "+iF(sq4)+". Then H = "+iF(sq4)+" / 19.6 = "+iF(H4)+" m. The maximum height is "+F3(ans)+" m.",
    {v:v,th:th}); qq3204.figure = p32figLaunch(v,th,"maxheight"); return qq3204;
});

E("u1-54-angled-range",1,["PH12.5.4"],2,"gen",function(){
  var v=ri(16,42), th=pick([25,30,35,40,45,50,55,60,65]);
  var rad=th*Math.PI/180, s4=sfR(Math.sin(rad),4), c4=sfR(Math.cos(rad),4);
  var vy4=sfR(v*s4,4), vx4=sfR(v*c4,4);
  var num4=sfR(2*vy4,4), T4=sfR(num4/PHYS_G,4), R4=sfR(vx4*T4,4), ans=sfR(R4,3);
  var qq3204 = numq("A soccer ball is kicked at "+gF(v)+" m/s at an angle of "+th+"° above the horizontal and lands on level ground. How far from the kick does the ball land? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Split the launch velocity into components: vx = "+gF(v)+" × "+iF(c4)+" = "+iF(vx4)+" m/s and vy = "+gF(v)+" × "+iF(s4)+" = "+iF(vy4)+" m/s. The flight time is the time for the vertical motion to go up and come back down: 2 × "+iF(vy4)+" = "+iF(num4)+" m/s, and "+iF(num4)+" / 9.8 = "+iF(T4)+" s. Range = "+iF(vx4)+" × "+iF(T4)+" = "+iF(R4)+" m. The ball lands "+F3(ans)+" m from the kick.",
    {v:v,th:th}); qq3204.figure = p32figLaunch(v,th,"range"); return qq3204;
});

E("u1-54-hit-or-miss-cr",1,["PH12.5.4"],3,"gen",function(){
  var v=ri(19,30), th=pick([35,40,45,50,55]);
  var rad=th*Math.PI/180, s4=sfR(Math.sin(rad),4), c4=sfR(Math.cos(rad),4);
  var vy4=sfR(v*s4,4), vx4=sfR(v*c4,4);
  var Rtot=vx4*(2*vy4/PHYS_G);
  var d=sfR(Rtot*rf(0.35,0.68),3);
  var t4=sfR(d/vx4,4), rise4=sfR(vy4*t4,4), tsq=sfR(t4*t4,4), drop4=sfR(4.9*tsq,4), y4=sfR(rise4-drop4,4);
  var clears=pick([true,false]);
  var hf=sfR(y4*(clears?0.78:1.28),3);
  var qq3204 = textq("A ball is kicked at "+gF(v)+" m/s at an angle of "+th+"° above the horizontal toward a fence "+gF(d)+" m away. The fence is "+gF(hf)+" m high. Does the ball clear the fence? Give your answer as yes or no.",
    [clears?"yes":"no"],
    "Find the height of the ball when it reaches the fence. The components are vx = "+gF(v)+" × "+iF(c4)+" = "+iF(vx4)+" m/s and vy = "+gF(v)+" × "+iF(s4)+" = "+iF(vy4)+" m/s. Time to reach the fence: "+gF(d)+" / "+iF(vx4)+" = "+iF(t4)+" s. In that time the ball rises "+iF(vy4)+" × "+iF(t4)+" = "+iF(rise4)+" m. Squaring the time, "+iF(t4)+" × "+iF(t4)+" = "+iF(tsq)+" s², so gravity pulls it down 4.90 × "+iF(tsq)+" = "+iF(drop4)+" m. Height at the fence: "+iF(rise4)+" - "+iF(drop4)+" = "+iF(y4)+" m. The fence is "+gF(hf)+" m, so the ball "+(clears?"clears the fence.":"does not clear the fence.")+" The answer is "+(clears?"yes.":"no."),
    {v:v,th:th,d:d,hf:hf}); qq3204.figure = p32figFence(v,th,d,hf); return qq3204;
});

/* ---------- PH12.5.5 Momentum, 2D collisions and explosions ---------- */

E("u1-55-stick-1d",1,["PH12.5.5"],2,"gen",function(){
  var form=pick(["rest","headon"]);
  var m1=ri(2,16)/2, v1=ri(5,12), m2=ri(2,16)/2, v2=0;
  if(form==="headon"){ v2=ri(3,10); var tr=0; while(m1*v1<=m2*v2+2&&tr<60){m2=ri(2,16)/2; v2=ri(3,10); tr++;} }
  var p1=sfR(m1*v1,4), p2=sfR(m2*v2,4);
  var ptot=(form==="headon")?sfR(p1-p2,4):p1;
  var mtot=sfR(m1+m2,4), vf4=sfR(ptot/mtot,4), ans=sfR(vf4,3);
  var prompt=(form==="headon")?
    "Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1)+" m/s collides with a cart of mass "+gF(m2)+" kg moving west at "+gF(v2)+" m/s. The carts stick together. What is the velocity of the combined carts after the collision? Give your answer in m/s.":
    "Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1)+" m/s collides with a stationary cart of mass "+gF(m2)+" kg. The carts stick together. What is the velocity of the combined carts after the collision? Give your answer in m/s.";
  var sol="Momentum is conserved. The first cart's momentum is "+gF(m1)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s."+
    (form==="headon"?
      " The second cart moves west, so its momentum is negative in this convention, with magnitude "+gF(m2)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. Total momentum: "+iF(p1)+" - "+iF(p2)+" = "+iF(ptot)+" kg·m/s.":
      " The second cart is at rest, so the total momentum is "+iF(p1)+" kg·m/s.")+
    " The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+gF(mtot)+" kg. Velocity = "+iF(ptot)+" / "+gF(mtot)+" = "+iF(vf4)+" m/s. The positive sign means east, so the combined carts move at "+F3(ans)+" m/s east.";
  return numq(prompt, ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u1-55-perp-direction",1,["PH12.5.5"],2,"gen",function(){
  var m1=ri(2,14)/2, v1=ri(3,9), m2=ri(2,14)/2, v2=ri(3,9), tr=0;
  var p1=m1*v1, p2=m2*v2;
  while(Math.abs(p1-p2)<0.08*Math.max(p1,p2)&&tr<80){m2=ri(2,14)/2; v2=ri(3,9); p2=m2*v2; tr++;}
  var th=sfR(Math.atan2(p2,p1)*180/Math.PI,4), comp=sfR(90-th,4);
  var qq3204 = mcq("A puck of mass "+gF(m1)+" kg sliding east at "+gF(v1)+" m/s collides with a puck of mass "+gF(m2)+" kg sliding north at "+gF(v2)+" m/s, and the two pucks stick together. In which direction does the combined mass move?",
    F3(th)+"° north of east",
    [F3(comp)+"° north of east", F3(th)+"° south of east", F3(comp)+"° north of west"],
    "The momenta are perpendicular: east momentum "+gF(m1)+" × "+gF(v1)+" = "+iF(sfR(p1,4))+" kg·m/s and north momentum "+gF(m2)+" × "+gF(v2)+" = "+iF(sfR(p2,4))+" kg·m/s. The combined mass moves along the total momentum, at an angle of arctan("+iF(sfR(p2,4))+" / "+iF(sfR(p1,4))+") north of east, which is "+F3(th)+"°. The combined mass moves "+F3(th)+"° north of east.",
    {m1:m1,v1:v1,m2:m2,v2:v2}); qq3204.figure = p32figMom2D(gF(m1)+" kg at "+gF(v1)+" m/s east",gF(m2)+" kg at "+gF(v2)+" m/s north",null); return qq3204;
});

E("u1-55-recoil",1,["PH12.5.5"],2,"gen",function(){
  var sc=pick(["rifle","cannon"]);
  var mp, vp, mg, thing, proj;
  if(sc==="rifle"){ mp=pick([0.020,0.025,0.030,0.040,0.050]); vp=ri(220,420); mg=ri(6,12)/2; thing="rifle"; proj="bullet"; }
  else { mp=ri(4,12); vp=ri(90,160); mg=ri(600,980); thing="cannon"; proj="shell"; }
  var p4=sfR(mp*vp,4), v4=sfR(p4/mg,4), ans=sfR(v4,3);
  return numq("A "+thing+" of mass "+gF(mg)+" kg fires a "+proj+" of mass "+gF(mp)+" kg at "+gF(vp)+" m/s. The "+thing+" is free to recoil and starts from rest. What is the recoil speed of the "+thing+"? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The total momentum starts at zero, so the "+thing+"'s recoil momentum must equal the "+proj+"'s momentum in size. The "+proj+"'s momentum is "+gF(mp)+" × "+gF(vp)+" = "+iF(p4)+" kg·m/s. Recoil speed = "+iF(p4)+" / "+gF(mg)+" = "+iF(v4)+" m/s. The "+thing+" recoils at "+F3(ans)+" m/s, in the direction opposite to the "+proj+".",
    {mp:mp,vp:vp,mg:mg});
});

E("u1-55-unknown-mass",1,["PH12.5.5"],2,"gen",function(){
  var m1=ri(2,10), v1=ri(4,12), m2true=ri(2,10);
  var vfP=sfR(m1*v1/(m1+m2true),3);
  var p4=sfR(m1*v1,4), mtot4=sfR(p4/vfP,4), m2_4=sfR(mtot4-m1,4), ans=sfR(m2_4,3);
  return numq("A cart of mass "+gF(m1)+" kg moving at "+gF(v1)+" m/s collides with a stationary cart and the two stick together. The combined carts are measured moving at "+gF(vfP)+" m/s. What is the mass of the second cart? Give your answer in kg.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Momentum is conserved. The incoming momentum is "+gF(m1)+" × "+gF(v1)+" = "+iF(p4)+" kg·m/s. This equals the combined mass multiplied by the final speed, so the combined mass is "+iF(p4)+" / "+gF(vfP)+" = "+iF(mtot4)+" kg. The second cart's mass is "+iF(mtot4)+" - "+gF(m1)+" = "+iF(m2_4)+" kg. The mass of the second cart is "+F3(ans)+" kg.",
    {m1:m1,v1:v1});
});

E("u1-55-rebound",1,["PH12.5.5"],2,"gen",function(){
  var m=pick([0.15,0.20,0.25,0.40,0.45,0.50,0.60]);
  var vi=ri(5,16), vf=ri(4,14), tr=0;
  while((vf===vi||vi===2*vf||vf===2*vi)&&tr<80){vf=ri(4,14);tr++;}
  var pi4=sfR(m*vi,4), pf4=sfR(m*vf,4), dp4=sfR(pi4+pf4,4);
  return mcq("Take the direction away from the wall as positive. A ball of mass "+gF(m)+" kg strikes a wall at "+gF(vi)+" m/s and rebounds at "+gF(vf)+" m/s. What is the magnitude of the change in momentum of the ball?",
    F3(dp4)+" kg·m/s",
    [F3(sfR(Math.abs(pi4-pf4),4))+" kg·m/s", F3(pi4)+" kg·m/s", F3(pf4)+" kg·m/s"],
    "The incoming momentum has magnitude "+gF(m)+" × "+gF(vi)+" = "+iF(pi4)+" kg·m/s and the rebound momentum has magnitude "+gF(m)+" × "+gF(vf)+" = "+iF(pf4)+" kg·m/s. Because the rebound reverses the direction, the momentum changes from negative to positive in this convention, and the change is the sum of the two magnitudes: "+iF(pi4)+" + "+iF(pf4)+" = "+iF(dp4)+" kg·m/s. The magnitude of the change in momentum is "+F3(dp4)+" kg·m/s.",
    {m:m,vi:vi,vf:vf});
});

E("u1-55-stick-2d-cr",1,["PH12.5.5"],3,"gen",function(){
  var m1=ri(2,12)/2, v1=ri(4,16)/2, m2=ri(2,12)/2, v2=ri(4,16)/2;
  var p1=sfR(m1*v1,4), p2=sfR(m2*v2,4);
  var sq1=sfR(p1*p1,4), sq2=sfR(p2*p2,4), sum=sfR(sq1+sq2,4), P4=sfR(Math.sqrt(sum),4);
  var mtot=sfR(m1+m2,4), v4=sfR(P4/mtot,4), ans=sfR(v4,3);
  var th=sfR(Math.atan2(p2,p1)*180/Math.PI,3);
  var qq3204 = numq("A cart of mass "+gF(m1)+" kg moving east at "+gF(v1)+" m/s collides with a cart of mass "+gF(m2)+" kg moving north at "+gF(v2)+" m/s on a frictionless surface, and the carts stick together. What is the speed of the combined carts after the collision? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Momentum is conserved separately in each direction. East momentum: "+gF(m1)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s. North momentum: "+gF(m2)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. Combine the perpendicular momenta: "+iF(p1)+" × "+iF(p1)+" = "+iF(sq1)+" and "+iF(p2)+" × "+iF(p2)+" = "+iF(sq2)+", and "+iF(sq1)+" + "+iF(sq2)+" = "+iF(sum)+". The square root of "+iF(sum)+" is "+iF(P4)+" kg·m/s, the magnitude of the total momentum. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+gF(mtot)+" kg, so the speed is "+iF(P4)+" / "+gF(mtot)+" = "+iF(v4)+" m/s, directed "+F3(th)+"° north of east. The speed of the combined carts is "+F3(ans)+" m/s.",
    {m1:m1,v1:v1,m2:m2,v2:v2}); qq3204.figure = p32figMom2D(gF(m1)+" kg at "+gF(v1)+" m/s east",gF(m2)+" kg at "+gF(v2)+" m/s north",null); return qq3204;
});

E("u1-55-third-piece-cr",1,["PH12.5.5"],3,"gen",function(){
  var a=ri(1,5), v1=ri(4,12), b=ri(1,5), v2=ri(4,12), c=ri(1,6);
  var p1=sfR(a*v1,4), p2=sfR(b*v2,4);
  var sq1=sfR(p1*p1,4), sq2=sfR(p2*p2,4), sum=sfR(sq1+sq2,4), P4=sfR(Math.sqrt(sum),4);
  var v4=sfR(P4/c,4), ans=sfR(v4,3);
  var th=sfR(Math.atan2(p2,p1)*180/Math.PI,3);
  var qq3204 = numq("A stationary firework shell explodes into three pieces. One piece of mass "+gF(a)+" kg flies east at "+gF(v1)+" m/s, and a second piece of mass "+gF(b)+" kg flies north at "+gF(v2)+" m/s. The third piece has mass "+gF(c)+" kg. What is the speed of the third piece? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The shell starts at rest, so the total momentum after the explosion must still be zero: the third piece must carry momentum equal in size to the combined momentum of the other two pieces, in the opposite direction. East momentum: "+gF(a)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s. North momentum: "+gF(b)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. Combining: "+iF(p1)+" × "+iF(p1)+" = "+iF(sq1)+" and "+iF(p2)+" × "+iF(p2)+" = "+iF(sq2)+", and "+iF(sq1)+" + "+iF(sq2)+" = "+iF(sum)+". The square root of "+iF(sum)+" is "+iF(P4)+" kg·m/s. The third piece's speed is "+iF(P4)+" / "+gF(c)+" = "+iF(v4)+" m/s, directed "+F3(th)+"° south of west, opposite to the combined momentum of the first two pieces. The speed of the third piece is "+F3(ans)+" m/s.",
    {a:a,v1:v1,b:b,v2:v2,c:c}); qq3204.figure = p32figMom2D(gF(a)+" kg at "+gF(v1)+" m/s east",gF(b)+" kg at "+gF(v2)+" m/s north",gF(c)+" kg, ?"); return qq3204;
});
