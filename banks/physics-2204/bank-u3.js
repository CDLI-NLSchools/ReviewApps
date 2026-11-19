// Diagram figures (Phase C, Nov 2026): spring graphs and scenes, half life decay curve, pendulum and slope scenes added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// Tranche 6 (Nov 2026): energy bar charts (p22Bars), ramp diagrams (p22Ramp), the angled pull scene and further spring scenes added attach-only. u3-76-friction-cr originally carried its ramp only on draws whose slope length exceeded the height; a guard in that entry (Nov 2026) now draws the slope length above the height on every draw, so the ramp attaches on all draws.
// CRMARKS: u3-75-energy-cr=5
// CRMARKS: u3-711-shm-energy-cr=4
// CRMARKS: u3-76-friction-cr=4
// CRMARKS: u3-73-workenergy-cr=3
// CRMARKS: u3-78-power-cr=3
// CRMARKS: u3-712-classify-cr=2
// CRMARKS: u3-71-net-work-cr=3
// CRMARKS: u3-77-efficiency-cr=3
// CRMARKS: u3-79-spring-launch-cr=3
// CRMARKS: u3-710-period-cr=2
// CRMARKS: u3-715-defect-energy-cr=3
// Physics 2204 Unit 3 Work and Energy question bank
// Constants used as literals: g = 9.8 m/s^2, c = 3.00 x 10^8 m/s.
// (The shared constants PHYS_G and PHYS_C are defined only in the built
// app preamble, not in the bank-check harness, so this file uses the
// literal values to keep the self-test green.)

/* ---------- 7.1 Force, distance and work ---------- */

E("u3-71-work-parallel",3,["PH11.7.1"],2,"gen",function(){
  var ctx=pick(["A worker pushes a crate","A student pushes a trolley","A ferry worker pushes a loaded cart","A custodian pushes a floor polisher"]);
  var F=sfR(rf(20,90),3),d=sfR(rf(2,11),3),W=sfR(F*d,3);
  return numq(ctx+" with a steady horizontal force of "+gF(F)+" N. It moves "+gF(d)+" m in the direction of the force. How much work is done by the push? Give your answer in J.",W,Math.max(0.02*Math.abs(W),1e-9),
  "Work is force times distance when the force is along the motion: W = F d. "+gF(F)+" N × "+gF(d)+" m = "+F3(W)+" J. The push does "+F3(W)+" J of work.",{F:F,d:d});
});

E("u3-71-work-angle",3,["PH11.7.1"],2,"gen",function(){
  var F=sfR(rf(30,90),3),d=sfR(rf(3,12),3),ang=pick([25,30,35,40,50,55,60]);
  var rad=ang*Math.PI/180,Fp=sfR(F*Math.cos(rad),4),W=sfR(Fp*d,3);
  var q=mcq("A rope pulls a sled with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal. The sled moves "+gF(d)+" m across the snow. How much work does the rope do?",
    F3(W)+" J",
    [F3(F*d)+" J",F3(F*d*Math.sin(rad))+" J",F3(W/2)+" J"],
    "Only the component of the force along the motion does work. That component is "+iF(Fp)+" N. Then "+iF(Fp)+" N × "+gF(d)+" m = "+F3(W)+" J. The rope does "+F3(W)+" J of work.",{F:F,d:d,ang:ang});
  q.figure=p22AngScene(gF(F)+" N",ang,"pull",null);return q;
});

E("u3-71-work-opposing",3,["PH11.7.1"],1,"var",varset([
  function(){
    return mcq("A box slides across a floor to the east. Kinetic friction acts on the box toward the west. What is the sign of the work done by friction on the box?",
      "Negative, because the friction force points opposite the displacement",
      ["Positive, because friction always does positive work",
       "Zero, because friction does not move the box",
       "Positive, because the box is still moving east"],
      "Work follows the angle between the force and the displacement. Friction points opposite the displacement, so the work is negative. Friction removes kinetic energy from the box.",{});
  },
  function(){
    return mcq("A car is moving north when the driver brakes. The braking force points south. What is the sign of the work done by the braking force?",
      "Negative, because the braking force points opposite the displacement",
      ["Positive, because the car is moving",
       "Zero, because the brakes do not change the direction of travel",
       "Positive, because the braking force is large"],
      "Work follows the angle between the force and the displacement. The braking force points opposite the displacement, so its work is negative and the kinetic energy of the car decreases.",{});
  },
  function(){
    return mcq("A person pushes a crate toward the west while the crate is sliding toward the east. What is the sign of the work done by the push?",
      "Negative, because the push points opposite the displacement",
      ["Positive, because the person is doing the pushing",
       "Zero, because the push and the motion cancel out",
       "Positive, because work is always positive when a person pushes"],
      "Work follows the angle between the force and the displacement. The push points opposite the displacement, so its work is negative, even though the person is exerting a force.",{});
  },
  function(){
    return mcq("A hockey puck slides across the ice and friction slows it down. Which statement about the work done by friction is correct?",
      "Friction does negative work, so the kinetic energy of the puck decreases",
      ["Friction does positive work, so the kinetic energy of the puck increases",
       "Friction does no work, because the puck keeps moving in a straight line",
       "Friction does positive work, because it acts for the whole slide"],
      "Friction acts opposite the displacement of the puck, so its work is negative. Negative work removes energy, so the kinetic energy of the puck decreases as it slides.",{});
  }
]));

E("u3-71-work-lift",3,["PH11.7.1"],2,"gen",function(){
  var m=sfR(rf(2,12),3),h=sfR(rf(1,6),3),w=sfR(m*9.8,4),W=sfR(w*h,3);
  var ctx=pick(["A worker lifts a box","A student lifts a backpack","A dock worker lifts a crate","A lifter raises a loaded tote"]);
  return numq(ctx+" of mass "+gF(m)+" kg straight up at a constant velocity through a height of "+gF(h)+" m. How much work is done by the lifting force? Give your answer in J.",W,Math.max(0.02*Math.abs(W),1e-9),
  "At a constant velocity the lifting force equals the weight. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. Then "+iF(w)+" N × "+gF(h)+" m = "+F3(W)+" J. The lifting force does "+F3(W)+" J of work.",{m:m,h:h});
});

E("u3-71-total-work",3,["PH11.7.1"],3,"gen",function(){
  var f=sfR(rf(10,25),3),F=sfR(f+rf(35,70),3),d=sfR(rf(3,10),3);
  var Wapp=sfR(F*d,3),Wfric=sfR(f*d,3),Wtot=sfR(Wapp-Wfric,3);
  return mcq("A crate is pushed across a floor with a horizontal force of "+gF(F)+" N. Kinetic friction of "+gF(f)+" N opposes the motion. The crate moves "+gF(d)+" m. What is the total work done on the crate?",
    F3(Wtot)+" J",
    [F3(Wapp)+" J",F3(Wfric)+" J",F3((F+f)*d)+" J"],
    "Work each force separately. The push does "+gF(F)+" N × "+gF(d)+" m = "+F3(Wapp)+" J. Friction does "+gF(f)+" N × "+gF(d)+" m = "+F3(Wfric)+" J, and it is negative because friction opposes the motion. The total work is "+F3(Wapp)+" J - "+F3(Wfric)+" J = "+F3(Wtot)+" J.",{F:F,f:f,d:d});
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-71-net-work-cr added to bring this pool to 6.
// LEVEL: 2 - Multi-step calculation chaining horizontal force component, net force with friction, and net work.
// LENGTHS: key=4
E("u3-71-net-work-cr",3,["PH11.7.1"],2,"gen",function(){
  var F=sfR(rf(30,90),3);
  var ang=pick([25,30,35,40,50,55,60]);
  var rad=ang*Math.PI/180;
  var Fx=sfR(F*Math.cos(rad),4);
  var ff,tries=0;
  do{
    ff=sfR(rf(5,25),3);
    tries++;
  }while(ff>=Fx-2&&tries<80);
  if(ff>=Fx-2){ff=sfR(Fx*0.5,3);}
  var d=sfR(rf(3,12),3);
  var Fnet=sfR(Fx-ff,4);
  var Wnet=sfR(Fnet*d,3);
  var Wrope=sfR(Fx*d,4);
  var Wfric=sfR(ff*d,4);
  return numq("A crate is pulled "+gF(d)+" m across a level floor by a rope angled at "+ang+" degrees above the horizontal with a tension of "+gF(F)+" N. A constant kinetic friction force of "+gF(ff)+" N opposes the motion. What is the net work done on the crate? Give your answer in J.",
    Wnet,Math.max(0.02*Math.abs(Wnet),1e-9),
    "First find the horizontal component of the pulling force: F_horizontal = "+gF(F)+" N × cos("+ang+" degrees) = "+iF(Fx)+" N. The rope does positive work W_rope = "+iF(Fx)+" N × "+gF(d)+" m = "+iF(Wrope)+" J, while friction does negative work W_friction = -"+gF(ff)+" N × "+gF(d)+" m = -"+iF(Wfric)+" J. Equivalently, the net horizontal force is "+iF(Fx)+" N - "+gF(ff)+" N = "+iF(Fnet)+" N, so the net work is "+iF(Fnet)+" N × "+gF(d)+" m = "+F3(Wnet)+" J. The net work done on the crate is "+F3(Wnet)+" J.",
    {F:F,ang:ang,ff:ff,d:d});
});
/* ---------- 7.2 Mass, height and speed using energy ---------- */

E("u3-72-ke-basic",3,["PH11.7.2"],2,"gen",function(){
  var m=sfR(rf(1,10),3),vi=sfR(rf(1,6),3),vf=sfR(2*vi,4);
  var v2=sfR(vf*vf,4),hm=sfR(0.5*m,4),ek=sfR(hm*v2,3);
  return numq("A "+gF(m)+" kg object is moving at "+gF(vi)+" m/s. It then speeds up until it is moving twice as fast. What is its kinetic energy at the new speed? Give your answer in J.",ek,Math.max(0.02*Math.abs(ek),1e-9),
  "Twice as fast means a new speed of 2 × "+gF(vi)+" m/s = "+iF(vf)+" m/s. Kinetic energy is Ek = 1/2 m v^2. The new speed squared is "+iF(vf)+" m/s × "+iF(vf)+" m/s = "+iF(v2)+" m^2/s^2. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. Then "+iF(hm)+" kg × "+iF(v2)+" m^2/s^2 = "+F3(ek)+" J. The kinetic energy at the new speed is "+F3(ek)+" J, four times what it was at the first speed.",{m:m,vi:vi});
});

E("u3-72-eg-basic",3,["PH11.7.2"],2,"gen",function(){
  var m=sfR(rf(2,12),3),h=sfR(rf(1,8),3),w=sfR(m*9.8,4),eg=sfR(w*h,3);
  var ctx=pick(["A toolbox of mass","A crate of mass","A backpack of mass","A bucket of mass"]);
  return numq(ctx+" "+gF(m)+" kg sits "+gF(h)+" m above the ground, which is taken as the reference level. What is its gravitational potential energy? Give your answer in J.",eg,Math.max(0.02*Math.abs(eg),1e-9),
  "Gravitational potential energy is Eg = m g h, measured from the stated reference level, the ground. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. Then "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. The gravitational potential energy is "+F3(eg)+" J.",{m:m,h:h});
});

E("u3-72-reference-level",3,["PH11.7.2"],1,"var",varset([
  function(){
    return mcq("A book is on a shelf 1.50 m above the floor. If the floor is taken as the reference level, what is the gravitational potential energy of the book relative to that level?",
      "Positive, because the book is above the reference level",
      ["Zero, because the book is not moving",
       "Negative, because the book is above the reference level",
       "Zero, because the reference level is always the top of the shelf"],
      "Gravitational potential energy is measured from the chosen reference level. Above the reference level the height is positive, so the potential energy is positive. The reference level is a choice, and the floor is the stated choice here.",{});
  },
  function(){
    return mcq("A diver is 2.00 m below the surface of the water. If the surface is taken as the reference level, what is the sign of the gravitational potential energy of the diver?",
      "Negative, because the diver is below the reference level",
      ["Positive, because the diver is below the surface",
       "Zero, because the diver is in the water",
       "Positive, because gravitational potential energy is always positive"],
      "The height is measured from the reference level. Below the reference level the height is negative, so the gravitational potential energy is negative. A negative value is allowed once a reference level is chosen.",{});
  },
  function(){
    return mcq("Two students calculate the gravitational potential energy of the same box. One takes the floor as the reference level and the other takes the top of a table as the reference level. What happens to their answers?",
      "The two values differ, because the height is measured from a different reference level",
      ["The two values are the same, because potential energy does not depend on the reference level",
       "One value is always zero, because only one reference level is correct",
       "The values differ only if the box is moving"],
      "Gravitational potential energy is Eg = m g h, and h is the height above the chosen reference level. Changing the reference level changes h, so it changes the value of Eg. Changes in Eg, which is what energy calculations use, are the same for either choice.",{});
  },
  function(){
    return mcq("A ball sits on the ground, and the ground is taken as the reference level. What is the gravitational potential energy of the ball?",
      "Zero, because the ball is at the reference level",
      ["Equal to its weight, because it is at the ground",
       "Negative, because it cannot fall any farther",
       "Equal to its kinetic energy, because it is at rest"],
      "At the reference level the height is zero, so Eg = m g h is zero. Zero potential energy at the reference level is the definition of that choice, not a statement that the ball has no energy at all.",{});
  }
]));

E("u3-72-speed-from-ke",3,["PH11.7.2"],2,"gen",function(){
  var Ek=sfR(rf(30,250),3),m=sfR(rf(3,9),3);
  var twoEk=sfR(2*Ek,4),v2=sfR(twoEk/m,4),v=sfR(Math.sqrt(v2),3);
  return numq("A "+gF(m)+" kg object has a kinetic energy of "+gF(Ek)+" J. What is its speed? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "From Ek = 1/2 m v^2, the speed squared is twice the kinetic energy divided by the mass. Twice the kinetic energy is 2 × "+gF(Ek)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{Ek:Ek,m:m});
});

E("u3-72-eg-mcq",3,["PH11.7.2"],2,"gen",function(){
  var m=sfR(rf(2,12),3),h=sfR(rf(2,8),3),w=sfR(m*9.8,4),eg=sfR(w*h,3);
  return mcq("A "+gF(m)+" kg load is raised "+gF(h)+" m above the floor, taken as the reference level. What is its gravitational potential energy?",
    F3(eg)+" J",
    [F3(w)+" J",F3(m*h)+" J",F3(2*eg)+" J"],
    "Gravitational potential energy is Eg = m g h. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. Then "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. The gravitational potential energy is "+F3(eg)+" J.",{m:m,h:h});
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-72-change-effect added to bring this pool to 6.
// LEVEL: 3 - Analysis of how kinetic energy scales nonlinearly when mass and speed are varied together.
// VARIANTS: four distinct (mass multiplier, speed multiplier) pairs chosen without replacement from eight scaling cases
// LENGTHS: key=44, distractors=46,45,45
E("u3-72-change-effect",3,["PH11.7.2"],3,"gen",function(){
  var pool=[
    {mm:2,vm:1,txt:"Double the mass and keep the speed the same"},
    {mm:1,vm:2,txt:"Keep the mass the same and double the speed"},
    {mm:2,vm:2,txt:"Double the mass and double the speed"},
    {mm:0.5,vm:2,txt:"Halve the mass and double the speed"},
    {mm:3,vm:1,txt:"Triple the mass and keep the speed the same"},
    {mm:1,vm:3,txt:"Keep the mass the same and triple the speed"},
    {mm:2,vm:0.5,txt:"Double the mass and halve the speed"},
    {mm:0.5,vm:3,txt:"Halve the mass and triple the speed"}
  ];
  var chosen,ratios,ok=false,tries=0;
  while(!ok&&tries<80){
    tries++;
    var s=shuffle(pool);
    chosen=[s[0],s[1],s[2],s[3]];
    ratios=[];
    ok=true;
    for(var i=0;i<4;i++){
      var r=chosen[i].mm*chosen[i].vm*chosen[i].vm;
      for(var j=0;j<ratios.length;j++){
        if(Math.abs(r-ratios[j])<1e-6){ok=false;}
      }
      ratios.push(r);
    }
  }
  var bestIdx=0;
  for(var k=1;k<4;k++){
    if(ratios[k]>ratios[bestIdx]){bestIdx=k;}
  }
  var m=sfR(rf(0.5,20),3);
  var v=sfR(rf(2,15),3);
  var Ek0=sfR(0.5*m*v*v,4);
  var key=chosen[bestIdx].txt;
  var ds=[];
  for(var n=0;n<4;n++){
    if(n!==bestIdx){ds.push(chosen[n].txt);}
  }
  var lines=[];
  for(var p=0;p<4;p++){
    var mNew=sfR(m*chosen[p].mm,4);
    var vNew=sfR(v*chosen[p].vm,4);
    var ekNew=sfR(0.5*mNew*vNew*vNew,4);
    lines.push(chosen[p].txt+": Ek = 0.5 × "+iF(mNew)+" kg × ("+iF(vNew)+" m/s)^2 = "+F3(ekNew)+" J");
  }
  return mcq("An object of mass "+gF(m)+" kg moves at "+gF(v)+" m/s. Which change gives the object the greatest kinetic energy?",
    key,ds,
    "The initial kinetic energy is Ek = 0.5 × "+gF(m)+" kg × ("+gF(v)+" m/s)^2 = "+iF(Ek0)+" J. Computing the new kinetic energy for each change: "+lines.join("; ")+". Because kinetic energy depends on speed squared, speed multipliers have a larger effect than equal mass multipliers. The change that gives the greatest kinetic energy is: "+key+".",
    {m:m,v:v,c0:[chosen[0].mm,chosen[0].vm],c1:[chosen[1].mm,chosen[1].vm],c2:[chosen[2].mm,chosen[2].vm],c3:[chosen[3].mm,chosen[3].vm]});
});
/* ---------- 7.3 Work-energy theorem (kinetic energy only) ---------- */

E("u3-73-workenergy-cr",3,["PH11.7.3"],2,"gen",function(){
  var m=sfR(rf(2,8),3),vi=sfR(rf(2,6),3),vf=sfR(vi+rf(3,7),3);
  var hm=sfR(0.5*m,4),v2i=sfR(vi*vi,4),v2f=sfR(vf*vf,4);
  var eki=sfR(hm*v2i,3),ekf=sfR(hm*v2f,3),W=sfR(ekf-eki,3);
  var ctx=pick(["A cart","A delivery sled","A curling practice stone","A wheeled bin"]);
  return numq(ctx+" of mass "+gF(m)+" kg speeds up from "+gF(vi)+" m/s to "+gF(vf)+" m/s along a level surface. What is the net work done on it? Give your answer in J.",W,Math.max(0.02*Math.abs(W),1e-9),
  "The work-energy theorem says net work equals the change in kinetic energy, and only kinetic energy is involved here. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2, so the initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. The final speed squared is "+gF(vf)+" m/s × "+gF(vf)+" m/s = "+iF(v2f)+" m^2/s^2, so the final kinetic energy is "+iF(hm)+" kg × "+iF(v2f)+" m^2/s^2 = "+F3(ekf)+" J. The net work is "+F3(ekf)+" J - "+F3(eki)+" J = "+F3(W)+" J.",{m:m,vi:vi,vf:vf});
});

E("u3-73-final-speed",3,["PH11.7.3"],2,"gen",function(){
  var m=sfR(rf(3,8),3),vi=sfR(rf(2,5),3),W=sfR(rf(60,200),3);
  var hm=sfR(0.5*m,4),v2i=sfR(vi*vi,4),eki=sfR(hm*v2i,3);
  var ekf=sfR(eki+W,4),twoEk=sfR(2*ekf,4),v2=sfR(twoEk/m,4),vf=sfR(Math.sqrt(v2),3);
  return numq("A "+gF(m)+" kg object moving at "+gF(vi)+" m/s has "+gF(W)+" J of net work done on it. Use the work-energy theorem to find its final speed. Give your answer in m/s.",vf,Math.max(0.02*Math.abs(vf),1e-9),
  "The work-energy theorem says net work equals the change in kinetic energy. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2, so the initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. Adding the net work gives a final kinetic energy of "+F3(eki)+" J + "+gF(W)+" J = "+iF(ekf)+" J. Twice the final kinetic energy is 2 × "+iF(ekf)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The final speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(vf)+" m/s.",{m:m,vi:vi,W:W});
});

E("u3-73-net-work-mcq",3,["PH11.7.3"],2,"gen",function(){
  var m=sfR(rf(2,8),3),vf=sfR(rf(2,5),3),vi=sfR(vf+rf(2,6),3);
  var hm=sfR(0.5*m,4),v2i=sfR(vi*vi,4),v2f=sfR(vf*vf,4);
  var eki=sfR(hm*v2i,3),ekf=sfR(hm*v2f,3),W=sfR(ekf-eki,3);
  return mcq("A "+gF(m)+" kg object slows from "+gF(vi)+" m/s to "+gF(vf)+" m/s. What is the net work done on the object?",
    F3(W)+" J",
    [F3(Math.abs(W))+" J","0 J",F3(eki)+" J"],
    "The work-energy theorem says net work equals the change in kinetic energy. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J and the final kinetic energy is "+iF(hm)+" kg × "+iF(v2f)+" m^2/s^2 = "+F3(ekf)+" J. The change is "+F3(ekf)+" J - "+F3(eki)+" J = "+F3(W)+" J. The negative value means the net force does negative work as the object slows.",{m:m,vi:vi,vf:vf});
});

E("u3-73-friction-stop",3,["PH11.7.3"],3,"gen",function(){
  var m=sfR(rf(2,10),3),vi=sfR(rf(3,12),3),d=sfR(rf(4,20),3);
  var v2i=sfR(vi*vi,4),hm=sfR(0.5*m,4),eki=sfR(hm*v2i,3),W=sfR(-eki,3);
  var ctx=pick(["A sled","A hockey puck","A storage bin","A wheeled cooler"]);
  return numq(ctx+" of mass "+gF(m)+" kg slides along a level surface at "+gF(vi)+" m/s and comes to a stop after sliding "+gF(d)+" m. How much work does friction do on it? Give your answer in J.",W,Math.max(0.02*Math.abs(W),1e-9),
  "The object ends at rest, so its final kinetic energy is zero and the work done by friction is the whole change in kinetic energy. The speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. Friction removes all of it, so the work done by friction is "+F3(W)+" J. The negative sign shows that friction points opposite the motion.",{m:m,vi:vi,d:d});
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-73-sign-of-work, u3-73-start-speed added to bring this pool to 6.
// LEVEL: 1 - Direct recognition of the sign of net work or kinetic energy change from a described motion.
// VARIANTS: four variants (accelerating car, slowing sliding box, constant-speed cart, rising thrown ball) at equal mix
// LENGTHS: key=26, distractors=26,22,42
E("u3-73-sign-of-work",3,["PH11.7.3"],1,"var",varset([
  function(){
    var key="The net work is positive";
    var ds=["The net work is negative","The net work is zero","The net work cannot be found without mass"];
    return mcq("A car speeds up from rest along a straight, level road. What does the work-energy theorem tell you about the net work done on the car?",
      key,ds,
      "By the work-energy theorem, the net work done on an object equals its change in kinetic energy (W_net = ΔEk). Because the car speeds up, its kinetic energy increases and ΔEk is positive. "+key+".",
      {scenario:"car_speeding_up"});
  },
  function(){
    var key="The net work is negative";
    var ds=["The net work is positive","The net work is zero","The net work cannot be found without mass"];
    return mcq("A wooden box slides across a rough level floor and slows to a stop. What does the work-energy theorem tell you about the net work done on the box?",
      key,ds,
      "By the work-energy theorem, the net work done on an object equals its change in kinetic energy (W_net = ΔEk). Because the box slows to a stop, its kinetic energy decreases and ΔEk is negative. "+key+".",
      {scenario:"box_slowing_down"});
  },
  function(){
    var key="The net work done is zero";
    var ds=["The net work is positive","The net work is negative","The net work cannot be found without mass"];
    return mcq("A dynamics cart rolls at a constant speed along a straight, level track. What does the work-energy theorem tell you about the net work done on the cart?",
      key,ds,
      "By the work-energy theorem, the net work done on an object equals its change in kinetic energy (W_net = ΔEk). Because the cart moves at constant speed, its kinetic energy does not change and ΔEk is zero. "+key+".",
      {scenario:"cart_constant_speed"});
  },
  function(){
    var key="The kinetic energy is decreasing";
    var ds=["The kinetic energy is increasing","The kinetic energy is unchanged","The kinetic energy is constant and zero"];
    return mcq("A ball is thrown straight upward and is still rising toward its highest point. What happens to the ball's kinetic energy as it rises?",
      key,ds,
      "As the ball rises, gravity does negative net work on it. By the work-energy theorem (W_net = ΔEk), negative net work means the ball's kinetic energy drops as it slows down. "+key+".",
      {scenario:"ball_rising"});
  }
]));

// LEVEL: 2 - Multi-step inverse application of the work-energy theorem to solve for initial speed.
// LENGTHS: key=4
E("u3-73-start-speed",3,["PH11.7.3"],2,"gen",function(){
  var m,vi,vf,Wmag,Wsigned,viCheck,tries=0;
  do{
    tries++;
    m=sfR(rf(0.5,50),3);
    vi=sfR(rf(2,20),3);
    vf=sfR(rf(2,25),3);
    if(Math.abs(vf-vi)<1.5){continue;}
    var rawW=0.5*m*(vf*vf-vi*vi);
    Wmag=sfR(Math.abs(rawW),3);
    Wsigned=rawW>=0?Wmag:-Wmag;
    var viSq=vf*vf-(2*Wsigned)/m;
    if(viSq<=0){viCheck=-1;continue;}
    viCheck=sfR(Math.sqrt(viSq),3);
  }while(viCheck!==vi&&tries<120);
  var Ekf=sfR(0.5*m*vf*vf,4);
  var Eki=sfR(Ekf-Wsigned,4);
  var promptTxt,solTxt;
  if(Wsigned>=0){
    promptTxt="A "+gF(m)+" kg object speeds up while "+gF(Wmag)+" J of net work is done on it, reaching a final speed of "+gF(vf)+" m/s. What was the object's initial speed? Give your answer in m/s.";
    solTxt="The final kinetic energy is Ek_f = 0.5 × "+gF(m)+" kg × ("+gF(vf)+" m/s)^2 = "+iF(Ekf)+" J. By the work-energy theorem, W_net = Ek_f - Ek_i, so Ek_i = "+iF(Ekf)+" J - "+gF(Wmag)+" J = "+iF(Eki)+" J. Solving 0.5 × "+gF(m)+" kg × v_i^2 = "+iF(Eki)+" J gives v_i = sqrt(2 × "+iF(Eki)+" J / "+gF(m)+" kg) = "+F3(vi)+" m/s. The initial speed was "+F3(vi)+" m/s.";
  }else{
    promptTxt="A "+gF(m)+" kg object slows down as "+gF(Wmag)+" J of net work is done against its motion, reaching a final speed of "+gF(vf)+" m/s. What was the object's initial speed? Give your answer in m/s.";
    solTxt="The final kinetic energy is Ek_f = 0.5 × "+gF(m)+" kg × ("+gF(vf)+" m/s)^2 = "+iF(Ekf)+" J. Because work is done against the motion, W_net = -"+gF(Wmag)+" J. By the work-energy theorem, Ek_i = Ek_f - W_net = "+iF(Ekf)+" J - (-"+gF(Wmag)+" J) = "+iF(Eki)+" J. Solving 0.5 × "+gF(m)+" kg × v_i^2 = "+iF(Eki)+" J gives v_i = sqrt(2 × "+iF(Eki)+" J / "+gF(m)+" kg) = "+F3(vi)+" m/s. The initial speed was "+F3(vi)+" m/s.";
  }
  return numq(promptTxt,vi,Math.max(0.02*Math.abs(vi),1e-9),solTxt,{m:m,vi:vi,vf:vf,W:Wsigned});
});
/* ---------- 7.4 Mechanical energy ---------- */

E("u3-74-mechanical-sum",3,["PH11.7.4"],1,"gen",function(){
  var ek=sfR(rf(20,300),3),eg=sfR(rf(20,300),3),em=sfR(ek+eg,3);
  var q=numq("At one point in its motion an object has a kinetic energy of "+gF(ek)+" J and a gravitational potential energy of "+gF(eg)+" J, measured from the stated reference level. What is its mechanical energy at that point? Give your answer in J.",em,Math.max(0.02*Math.abs(em),1e-9),
  "Mechanical energy is the sum of the kinetic and potential energies: Em = Ek + Eg. "+gF(ek)+" J + "+gF(eg)+" J = "+F3(em)+" J. The mechanical energy is "+F3(em)+" J.",{ek:ek,eg:eg});
  q.figure=p22Bars([{t:"kinetic",v:ek,vl:F3(ek)+" J"},{t:"gravitational",v:eg,vl:F3(eg)+" J"}]);return q;
});

E("u3-74-mechanical-concept",3,["PH11.7.4"],1,"var",varset([
  function(){
    return mcq("Mechanical energy is best defined as",
      "The sum of the kinetic energy and the potential energy of an object",
      ["The kinetic energy minus the potential energy of an object",
       "The total heat energy of an object",
       "The work done on an object, whatever its speed"],
      "Mechanical energy is Em = Ek + Ep, the kinetic energy plus the potential energies present. It is a sum, not a difference, and it does not include heat energy.",{});
  },
  function(){
    var a=ri(40,90),b=ri(10,35);
    return mcq("At a given instant an object has "+a+" J of kinetic energy and "+b+" J of gravitational potential energy. Its mechanical energy is",
      (a+b)+" J",
      [(a-b)+" J",(a*b)+" J",(a+b+50)+" J"],
      "Mechanical energy is the sum of kinetic and potential energies. Adding the two values gives "+(a+b)+" J. The mechanical energy is "+(a+b)+" J.",{a:a,b:b});
  },
  function(){
    return mcq("A falling ball gains kinetic energy and loses gravitational potential energy. If no friction acts, its mechanical energy",
      "Stays the same, because the loss in potential energy equals the gain in kinetic energy",
      ["Increases, because the kinetic energy increases",
       "Decreases, because the potential energy decreases",
       "Stays the same only at the top of the fall"],
      "Mechanical energy is the sum of the two. Energy moves from the gravitational store to the kinetic store, and with no friction nothing leaves, so the sum stays the same.",{});
  },
  function(){
    return mcq("Which list contains only forms of energy that are counted in mechanical energy?",
      "Kinetic energy and gravitational potential energy",
      ["Kinetic energy and heat energy",
       "Gravitational potential energy and heat energy",
       "Heat energy and electrical energy"],
      "In this course mechanical energy is the sum of kinetic energy and potential energy, and here the potential energy is gravitational. Heat energy is not part of the mechanical energy total.",{});
  }
]));

E("u3-74-find-ek",3,["PH11.7.4"],2,"gen",function(){
  var eg=sfR(rf(50,200),3),em=sfR(eg+rf(50,250),3),ek=sfR(em-eg,3);
  var q=numq("An object has a mechanical energy of "+gF(em)+" J. At the point of interest its gravitational potential energy, measured from the stated reference level, is "+gF(eg)+" J. What is its kinetic energy at that point? Give your answer in J.",ek,Math.max(0.02*Math.abs(ek),1e-9),
  "Mechanical energy is the sum: Em = Ek + Eg, so Ek = Em - Eg. "+gF(em)+" J - "+gF(eg)+" J = "+F3(ek)+" J. The kinetic energy is "+F3(ek)+" J.",{em:em,eg:eg});
  q.figure=p22Bars([{t:"mechanical",v:em,vl:F3(em)+" J"},{t:"gravitational",v:eg,vl:F3(eg)+" J"}]);return q;
});

E("u3-74-find-height",3,["PH11.7.4"],3,"gen",function(){
  var m=sfR(rf(2,6),3),v=sfR(rf(2,6),3),em=sfR(rf(150,400),3);
  var v2=sfR(v*v,4),hm=sfR(0.5*m,4),ek=sfR(hm*v2,3);
  var eg=sfR(em-ek,3),w=sfR(m*9.8,4),h=sfR(eg/w,3);
  return numq("A "+gF(m)+" kg object moving at "+gF(v)+" m/s has a mechanical energy of "+gF(em)+" J. How high is the object above the reference level? Give your answer in m.",h,Math.max(0.02*Math.abs(h),1e-9),
  "First find the kinetic energy. The speed squared is "+gF(v)+" m/s × "+gF(v)+" m/s = "+iF(v2)+" m^2/s^2. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The kinetic energy is "+iF(hm)+" kg × "+iF(v2)+" m^2/s^2 = "+F3(ek)+" J. The rest of the mechanical energy is gravitational: "+gF(em)+" J - "+F3(ek)+" J = "+F3(eg)+" J. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The height is "+F3(eg)+" J / "+iF(w)+" N = "+F3(h)+" m. The object is "+F3(h)+" m above the reference level.",{m:m,v:v,em:em});
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-74-total-from-motion, u3-74-zero-point-shift added to bring this pool to 6.
// LEVEL: 2 - Multi-step calculation computing kinetic energy and gravitational potential energy separately before summing them.
// LENGTHS: key=4
E("u3-74-total-from-motion",3,["PH11.7.4"],2,"gen",function(){
  var m=sfR(rf(0.5,30),3);
  var v=sfR(rf(1,20),3);
  var h=sfR(rf(0.5,25),3);
  var Ek=sfR(0.5*m*v*v,4);
  var Ep=sfR(m*9.8*h,4);
  var E=sfR(Ek+Ep,3);
  return numq("A "+gF(m)+" kg object moves at "+gF(v)+" m/s at a height of "+gF(h)+" m above the chosen reference level. What is its total mechanical energy? Give your answer in J.",
    E,Math.max(0.02*Math.abs(E),1e-9),
    "First calculate the kinetic energy: Ek = 0.5 × "+gF(m)+" kg × ("+gF(v)+" m/s)^2 = "+iF(Ek)+" J. Next calculate the gravitational potential energy: Ep = "+gF(m)+" kg × 9.8 m/s^2 × "+gF(h)+" m = "+iF(Ep)+" J. Total mechanical energy is the sum: E = "+iF(Ek)+" J + "+iF(Ep)+" J = "+F3(E)+" J. The total mechanical energy is "+F3(E)+" J.",
    {m:m,v:v,h:h});
});

// LEVEL: 3 - Analysis of how shifting the gravitational reference level changes potential energy and total mechanical energy while leaving kinetic energy unchanged.
// VARIANTS: raising the reference level by a dealt vertical shift (100% of draws, parameterized over mass and shift)
// LENGTHS: key=71, distractors=69,64,71
E("u3-74-zero-point-shift",3,["PH11.7.4"],3,"gen",function(){
  var dir="decrease";
  var m=sfR(rf(1,20),3);
  var dh=sfR(rf(0.3,2),3);
  var dE=sfR(m*9.8*dh,4);
  var dEStr=F3(dE);
  var key="Ep decreases by "+dEStr+" J and mechanical energy decreases by "+dEStr+" J";
  var d1="Ep decreases by "+dEStr+" J and mechanical energy remains unchanged";
  var d2="Ep increases by "+dEStr+" J and mechanical energy increases by "+dEStr+" J";
  var d3="Ep remains unchanged and kinetic energy decreases by "+dEStr+" J";
  return mcq("A "+gF(m)+" kg object is moving across a shelf above a laboratory floor. If the zero-potential-energy reference level is raised from the floor to a tabletop "+gF(dh)+" m higher, what happens to the object's gravitational potential energy (Ep) and total mechanical energy?",
    key,[d1,d2,d3],
    "Raising the reference level by "+gF(dh)+" m reduces the object's height above the reference level by "+gF(dh)+" m. Therefore, Ep decreases by ΔEp = "+gF(m)+" kg × 9.8 m/s^2 × "+gF(dh)+" m = "+iF(dE)+" J (or "+dEStr+" J). Because kinetic energy depends only on mass and speed, it does not change when the reference level moves. Since mechanical energy is E = Ek + Ep, mechanical energy decreases by the exact same amount. "+key+".",
    {dir:dir,m:m,dh:dh,dE:sfR(dE,3)});
});
/* ---------- 7.5 Kinematics and dynamics using mechanical energy ---------- */

E("u3-75-energy-cr",3,["PH11.7.5"],3,"gen",function(){
  var branch=pick(["lower","needed"]);
  if(branch==="lower"){
    var h1=sfR(rf(6,14),3),h2=sfR(rf(1,Math.max(2,h1-4)),3);
    var dh=sfR(h1-h2,3),v2=sfR(19.6*dh,4),v=sfR(Math.sqrt(v2),3);
    var ctx=pick(["A skier starts from rest at the top of a slope","A toboggan starts from rest at the top of a hill","A cart starts from rest at the top of a ramp"]);
    var q=numq(ctx+" "+gF(h1)+" m above the bottom, taken as the reference level, and reaches a point "+gF(h2)+" m above the bottom. Friction is ignored. What is its speed at the lower point? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
    "Mechanical energy is conserved when friction is ignored, and gravitational and kinetic changes are the only ones here. The drop in height is "+gF(h1)+" m - "+gF(h2)+" m = "+F3(dh)+" m. The lost gravitational potential energy becomes kinetic energy, so the speed squared is 19.6 m/s^2 × "+F3(dh)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{h1:h1,h2:h2});
    q.figure=p22Ramp({h:h1,h2:h2,hLabel:gF(h1)+" m",h2Label:gF(h2)+" m",ref:true});return q;
  }
  var v=sfR(rf(4,12),3),v2=sfR(v*v,4),h=sfR(v2/19.6,3);
  var ctx2=pick(["A skier starts from rest and wants to reach the bottom of a slope","A sled starts from rest and wants to reach the foot of a hill","A cart starts from rest and wants to reach the bottom of a ramp"]);
  var q2=numq(ctx2+" travelling at "+gF(v)+" m/s. Friction is ignored and the bottom is the reference level. From what height above the bottom must it start? Give your answer in m.",h,Math.max(0.02*Math.abs(h),1e-9),
  "Mechanical energy is conserved when friction is ignored. At the bottom all the starting gravitational potential energy has become kinetic energy, so the height is the speed squared divided by 19.6 m/s^2. The speed squared is "+gF(v)+" m/s × "+gF(v)+" m/s = "+iF(v2)+" m^2/s^2. Then "+iF(v2)+" m^2/s^2 / 19.6 m/s^2 = "+F3(h)+" m. It must start "+F3(h)+" m above the bottom.",{v:v});
  q2.figure=p22Ramp({hLabel:"?",ref:true});return q2;
});

E("u3-75-drop-speed",3,["PH11.7.5"],2,"gen",function(){
  var h=sfR(rf(2,10),3),v2=sfR(19.6*h,4),v=sfR(Math.sqrt(v2),3);
  var ctx=pick(["A ball is dropped from rest from a height","A wrench slips from rest from a height","A stone is released from rest from a height"]);
  return numq(ctx+" of "+gF(h)+" m above the ground, taken as the reference level. Use the mechanical energy concept to find its speed just before it hits the ground. Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "With mechanical energy conserved, the lost gravitational potential energy becomes kinetic energy. The speed squared is 19.6 m/s^2 × "+gF(h)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{h:h});
});

E("u3-75-height-for-speed",3,["PH11.7.5"],2,"gen",function(){
  var v=sfR(rf(3,11),3),v2=sfR(v*v,4),h=sfR(v2/19.6,3);
  return numq("Use the mechanical energy concept. An object starts from rest and reaches a speed of "+gF(v)+" m/s at the bottom of a drop, with the bottom as the reference level and friction ignored. From what height was it released? Give your answer in m.",h,Math.max(0.02*Math.abs(h),1e-9),
  "At the bottom all the starting gravitational potential energy has become kinetic energy, so the height is the speed squared divided by 19.6 m/s^2. The speed squared is "+gF(v)+" m/s × "+gF(v)+" m/s = "+iF(v2)+" m^2/s^2. Then "+iF(v2)+" m^2/s^2 / 19.6 m/s^2 = "+F3(h)+" m. It was released from "+F3(h)+" m.",{v:v});
});

E("u3-75-slide-speed",3,["PH11.7.5"],3,"gen",function(){
  var m=sfR(rf(5,40),3),h=sfR(rf(2,8),3),v2=sfR(19.6*h,4),v=sfR(Math.sqrt(v2),3);
  var q=mcq("A "+gF(m)+" kg sled starts from rest at the top of a frictionless slope "+gF(h)+" m above the bottom, taken as the reference level. What is the speed of the sled at the bottom?",
    F3(v)+" m/s",
    [F3(Math.sqrt(9.8*h))+" m/s",F3(2*9.8*h)+" m/s",F3(2*v)+" m/s"],
    "Gravitational potential energy lost becomes kinetic energy gained, and the mass cancels. The speed squared is 19.6 m/s^2 × "+gF(h)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,h:h});
    q.figure=p22Incline(gF(h)+" m");return q;
});

E("u3-75-pendulum",3,["PH11.7.5"],3,"gen",function(){
  var m=sfR(rf(1,5),3),dh=sfR(rf(1,5),3),v2=sfR(19.6*dh,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A pendulum bob of mass "+gF(m)+" kg is released from rest at a point "+gF(dh)+" m above its lowest position. The lowest position is taken as the reference level. What is the speed of the bob as it passes the lowest position? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "As the bob swings down, gravitational potential energy becomes kinetic energy and the mass cancels. The speed squared is 19.6 m/s^2 × "+gF(dh)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,dh:dh});
    q.figure=p22Pendulum(gF(dh)+" m",gF(m)+" kg");return q;
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-75-two-point-speed added to bring this pool to 6.
// LEVEL: 2 - Multi-step conservation of mechanical energy between two nonzero heights with nonzero initial speed.
// LENGTHS: key=4
E("u3-75-two-point-speed",3,["PH11.7.5"],2,"gen",function(){
  var hA=sfR(rf(5,30),3);
  var vA=sfR(rf(2,12),3);
  var eA=sfR(0.5*vA*vA+9.8*hA,4);
  var hB,tries=0;
  do{
    hB=sfR(rf(1,25),3);
    tries++;
  }while((9.8*hB>=eA-2||Math.abs(hB-hA)<1)&&tries<80);
  if(9.8*hB>=eA-2){hB=sfR(Math.max(1,(eA-4)/9.8),3);}
  var halfVbSq=sfR(eA-9.8*hB,4);
  var vB=sfR(Math.sqrt(2*halfVbSq),3);
  return numq("A roller coaster car passes point A at a height of "+gF(hA)+" m moving at "+gF(vA)+" m/s along a frictionless track. What is its speed when it reaches point B at a height of "+gF(hB)+" m? Give your answer in m/s.",
    vB,Math.max(0.02*Math.abs(vB),1e-9),
    "With friction neglected, mechanical energy is conserved: 0.5 v_A^2 + g h_A = 0.5 v_B^2 + g h_B (mass cancels). At point A, 0.5 × ("+gF(vA)+" m/s)^2 + 9.8 m/s^2 × "+gF(hA)+" m = "+iF(eA)+" J/kg. Subtracting g h_B at point B gives 0.5 v_B^2 = "+iF(eA)+" J/kg - (9.8 m/s^2 × "+gF(hB)+" m) = "+iF(halfVbSq)+" J/kg. Solving for speed gives v_B = sqrt(2 × "+iF(halfVbSq)+" J/kg) = "+F3(vB)+" m/s. The speed at point B is "+F3(vB)+" m/s.",
    {hA:hA,vA:vA,hB:hB});
});
/* ---------- 7.6 Conservation of energy with heat ---------- */

E("u3-76-friction-cr",3,["PH11.7.6"],2,"gen",function(){
  var m=sfR(rf(3,8),3),h=sfR(rf(3,7),3),w=sfR(m*9.8,4),eg=sfR(w*h,3);
  var f=sfR(rf(10,25),3),s=sfR(rf(3,6),3);
  // Guard (Nov 2026): a slope length at or below the height cannot exist, so redraw it above the height; if that would make friction heat reach the starting potential energy, cap it just below that bound instead.
  if(s<=h){s=sfR(h+rf(0.5,3),3);if(f*s>=0.98*eg)s=sfR(0.95*eg/f,3);}
  // Extension (Nov 2026, Jason's commission): apply the same energy margin on every draw, not only on redrawn slopes. Friction is a plain given, so redraw it below the 95 percent bound when the bound leaves a range above its 10 N floor; if that range is empty, cap the slope length just below the bound instead.
  if(f*s>=0.98*eg){var fLimit=0.95*eg/s;if(fLimit>10.01){f=sfR(rf(10,0.999*fLimit),3);}else{s=sfR(0.95*eg/f,3);}}
  var Q=sfR(f*s,3);
  var ekf=sfR(eg-Q,3),twoEk=sfR(2*ekf,4),v2=sfR(twoEk/m,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A "+gF(m)+" kg block starts from rest at the top of a slope "+gF(h)+" m above the bottom, taken as the reference level. As it slides down a slope of length "+gF(s)+" m, friction of "+gF(f)+" N acts on it. What is its speed at the bottom? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Use conservation of energy with a heat term. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The starting gravitational potential energy is "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. Friction produces heat of "+gF(f)+" N × "+gF(s)+" m = "+F3(Q)+" J. The kinetic energy at the bottom is "+F3(eg)+" J - "+F3(Q)+" J = "+F3(ekf)+" J, so the account balances: potential energy at the top equals kinetic energy at the bottom plus heat. Twice the final kinetic energy is 2 × "+F3(ekf)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,h:h,f:f,s:s});
  if(s>h)q.figure=p22Ramp({h:h,s:s,hLabel:gF(h)+" m",sLabel:gF(s)+" m",ref:true});return q;
});

E("u3-76-heat-friction",3,["PH11.7.6"],2,"gen",function(){
  var f=sfR(rf(5,50),3),d=sfR(rf(3,18),3),Q=sfR(f*d,3);
  var ctx=pick(["A crate slides across a warehouse floor","A sled slides across level snow","A box slides across a loading dock","A puck slides across rough ice"]);
  return numq(ctx+" against a kinetic friction force of "+gF(f)+" N for a distance of "+gF(d)+" m. How much heat energy is produced by friction? Give your answer in J.",Q,Math.max(0.02*Math.abs(Q),1e-9),
  "The heat produced by friction is the friction force times the distance it acts over. "+gF(f)+" N × "+gF(d)+" m = "+F3(Q)+" J. Friction produces "+F3(Q)+" J of heat energy.",{f:f,d:d});
});

E("u3-76-systems",3,["PH11.7.6"],1,"var",varset([
  function(){
    return mcq("An isolated system is best described as a system in which",
      "No energy and no matter cross the boundary of the system",
      ["Energy crosses the boundary but matter does not",
       "Matter crosses the boundary but energy does not",
       "Energy and matter both cross the boundary freely"],
      "An isolated system is closed off completely: neither energy nor matter crosses its boundary, so its total energy stays constant. A closed system, by contrast, allows energy to cross but not matter.",{});
  },
  function(){
    return mcq("A closed system is best described as a system in which",
      "Energy can cross the boundary, but matter cannot",
      ["No energy and no matter cross the boundary",
       "Matter can cross the boundary, but energy cannot",
       "Matter and energy both cross the boundary freely"],
      "A closed system exchanges energy with its surroundings but keeps its matter inside. An isolated system goes further and exchanges neither energy nor matter.",{});
  },
  function(){
    return mcq("A hot drink in a sealed, well insulated vacuum flask is the closest everyday example of which kind of system?",
      "An isolated system, because almost no energy or matter crosses the walls of the flask",
      ["A closed system, because the drink is a liquid",
       "An open system, because the drink is still hot",
       "An isolated system, because the drink loses heat quickly"],
      "The flask is sealed, so no matter escapes, and its insulation keeps heat transfer very small, so almost no energy crosses the boundary either. That is the closest everyday approach to an isolated system.",{});
  },
  function(){
    return mcq("A sled slides down a hill and friction warms the runners and the snow. If the sled, snow and air nearby are all included in the system, which statement follows from the law of conservation of energy?",
      "The total energy of the system stays the same, with some mechanical energy changed into heat",
      ["The total energy of the system decreases, because heat is a loss",
       "The total energy of the system increases, because heat is created",
       "The mechanical energy stays the same, because energy is conserved"],
      "Conservation applies to the total energy, not to the mechanical part alone. Mechanical energy changes into heat, but the total energy of the whole system stays the same.",{});
  }
]));

E("u3-76-final-speed-heat",3,["PH11.7.6"],3,"gen",function(){
  var m=sfR(rf(2,5),3),vi=sfR(rf(2,4),3),h=sfR(rf(2,5),3),Q=sfR(rf(20,80),3);
  var w=sfR(m*9.8,4),eg=sfR(w*h,3);
  var hm=sfR(0.5*m,4),v2i=sfR(vi*vi,4),eki=sfR(hm*v2i,3);
  var etot=sfR(eki+eg,3),ekf=sfR(etot-Q,3),twoEk=sfR(2*ekf,4),v2=sfR(twoEk/m,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A "+gF(m)+" kg cart is moving at "+gF(vi)+" m/s at the top of a slope "+gF(h)+" m above the bottom, taken as the reference level. It slides to the bottom, and friction produces "+gF(Q)+" J of heat during the slide. What is its speed at the bottom? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Start with the total energy at the top. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N, so the gravitational potential energy is "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2, so the initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. The total at the top is "+F3(eki)+" J + "+F3(eg)+" J = "+F3(etot)+" J. After the heat loss, the kinetic energy at the bottom is "+F3(etot)+" J - "+gF(Q)+" J = "+F3(ekf)+" J. Twice that is 2 × "+F3(ekf)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,vi:vi,h:h,Q:Q});
  q.figure=p22Ramp({h:h,hLabel:gF(h)+" m",ref:true});return q;
});

E("u3-76-energy-account",3,["PH11.7.6"],3,"gen",function(){
  var ef=sfR(rf(90,200),3),Q0=sfR(rf(30,70),3),ei=sfR(ef+Q0,3),Q=sfR(ei-ef,3);
  var ctx=pick(["A block slides down a slope and friction acts.","A sled comes down a hill and friction acts.","A cart rolls down a ramp and friction acts."]);
  var q=mcq(ctx+" The total mechanical energy at the top is "+gF(ei)+" J and the kinetic energy at the bottom is "+gF(ef)+" J. How much heat was produced by friction?",
    F3(Q)+" J",
    [F3(ef)+" J",F3(ei)+" J",F3(ei+ef)+" J"],
    "The energy account must balance. The starting total is split between the kinetic energy at the bottom and the heat produced, so the heat is "+gF(ei)+" J - "+gF(ef)+" J = "+F3(Q)+" J.",{ei:ei,ef:ef});
  q.figure=p22Bars([{t:"total at top",v:ei,vl:F3(ei)+" J"},{t:"kinetic at bottom",v:ef,vl:F3(ef)+" J"}]);return q;
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-76-friction-force added to bring this pool to 6.
// LEVEL: 2 - Multi-step conservation of energy with heat, working backwards from thermal loss to average friction force.
// LENGTHS: key=4
E("u3-76-friction-force",3,["PH11.7.6"],2,"gen",function(){
  var m=sfR(rf(1,20),3);
  var h=sfR(rf(1,10),3);
  var d=sfR(rf(h+1,3*h),3);
  var vMax=Math.sqrt(2*9.8*h);
  var vf=sfR(rf(2,0.9*vMax),3);
  if(vf>=0.95*vMax){vf=sfR(0.7*vMax,3);}
  var Ep=sfR(m*9.8*h,4);
  var Ek=sfR(0.5*m*vf*vf,4);
  var Eheat=sfR(Ep-Ek,4);
  var ff=sfR(Eheat/d,3);
  return numq("A "+gF(m)+" kg block starts from rest at the top of a rough ramp "+gF(d)+" m long and slides down through a vertical drop of "+gF(h)+" m, reaching the bottom at "+gF(vf)+" m/s. What is the magnitude of the average friction force acting on the block? Give your answer in N.",
    ff,Math.max(0.02*Math.abs(ff),1e-9),
    "The gravitational potential energy lost is Ep = "+gF(m)+" kg × 9.8 m/s^2 × "+gF(h)+" m = "+iF(Ep)+" J. The kinetic energy gained is Ek = 0.5 × "+gF(m)+" kg × ("+gF(vf)+" m/s)^2 = "+iF(Ek)+" J. By conservation of energy, the energy converted to heat is E_heat = "+iF(Ep)+" J - "+iF(Ek)+" J = "+iF(Eheat)+" J. Since E_heat = F_f × d, the average friction force is F_f = "+iF(Eheat)+" J / "+gF(d)+" m = "+F3(ff)+" N. The average friction force is "+F3(ff)+" N.",
    {m:m,h:h,d:d,vf:vf});
});
/* ---------- 7.7 Efficiency ---------- */

E("u3-77-efficiency-basic",3,["PH11.7.7"],2,"gen",function(){
  var use=sfR(rf(40,300),3),tot=sfR(use*rf(1.3,3),3);
  var ratio=sfR(use/tot,4),eff=sfR(ratio*100,3);
  var dev=pick(["A motor","A winch","A light bulb","A small heater"]);
  return numq(dev+" takes in "+gF(tot)+" J of energy and produces "+gF(use)+" J of useful output energy. What is its percent efficiency? Give your answer as a decimal.",eff,Math.max(0.02*Math.abs(eff),1e-9),
  "Percent efficiency is useful output divided by total input, times 100 percent. "+gF(use)+" J / "+gF(tot)+" J = "+iF(ratio)+". Then "+iF(ratio)+" × 100 = "+F3(eff)+". The percent efficiency is "+F3(eff)+" percent.",{use:use,tot:tot});
});

E("u3-77-useful-output",3,["PH11.7.7"],2,"gen",function(){
  var tot=sfR(rf(200,900),3),effp=pick([20,25,30,40,45,50,60,75,80]);
  var dec=sfR(effp/100,4),use=sfR(tot*dec,3);
  return numq("A machine is "+effp+" percent efficient and takes in "+gF(tot)+" J of energy. How much useful output energy does it produce? Give your answer in J.",use,Math.max(0.02*Math.abs(use),1e-9),
  "The efficiency as a decimal is "+effp+" / 100 = "+iF(dec)+". The useful output is the input times that decimal: "+gF(tot)+" J × "+iF(dec)+" = "+F3(use)+" J. The machine produces "+F3(use)+" J of useful output.",{tot:tot,effp:effp});
});

E("u3-77-electrical-mcq",3,["PH11.7.7"],2,"gen",function(){
  var tot=sfR(rf(300,900),3),effp=pick([25,30,40,60,70,80]);
  var use=sfR(tot*effp/100,3);
  return mcq("An electric motor takes in "+gF(tot)+" J of electrical energy and produces "+gF(use)+" J of useful mechanical energy. What is the percent efficiency of the motor?",
    F3(effp)+" percent",
    [F3(10000/effp)+" percent",F3(100-effp)+" percent",F3(effp/2)+" percent"],
    "Percent efficiency is useful output divided by total input, times 100 percent. Dividing the useful mechanical energy by the electrical input and multiplying by 100 gives "+F3(effp)+" percent. The motor is "+F3(effp)+" percent efficient.",{tot:tot,effp:effp});
});

E("u3-77-input-needed",3,["PH11.7.7"],2,"gen",function(){
  var use=sfR(rf(100,240),3),effp=pick([25,40,50,60,75,80]);
  var dec=sfR(effp/100,4),tot=sfR(use/dec,3);
  return numq("A device is "+effp+" percent efficient. How much input energy is needed for it to produce "+gF(use)+" J of useful output energy? Give your answer in J.",tot,Math.max(0.02*Math.abs(tot),1e-9),
  "The efficiency as a decimal is "+effp+" / 100 = "+iF(dec)+". The input is the required output divided by that decimal: "+gF(use)+" J / "+iF(dec)+" = "+F3(tot)+" J. It needs "+F3(tot)+" J of input energy.",{use:use,effp:effp});
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-77-efficiency-cr, u3-77-compare-devices added to bring this pool to 6.
// LEVEL: 2 - Two-step calculation deriving useful gravitational potential energy output before computing percent efficiency.
// LENGTHS: key=4
E("u3-77-efficiency-cr",3,["PH11.7.7"],2,"gen",function(){
  var m=sfR(rf(5,40),3);
  var h=sfR(rf(2,10),3);
  var Eout=sfR(m*9.8*h,4);
  var targetEff=sfR(rf(35,85),3);
  var Ein=sfR(Eout/(targetEff/100),3);
  var eff=sfR((Eout/Ein)*100,3);
  return numq("An electric hoist lifts a "+gF(m)+" kg crate vertically through "+gF(h)+" m while drawing "+gF(Ein)+" J of electrical energy. What is the percent efficiency of the hoist? Give your answer in %.",
    eff,Math.max(0.02*Math.abs(eff),1e-9),
    "The useful energy output is the gain in gravitational potential energy: E_out = "+gF(m)+" kg × 9.8 m/s^2 × "+gF(h)+" m = "+iF(Eout)+" J. Percent efficiency is useful output divided by total input times 100%: efficiency = ("+iF(Eout)+" J / "+gF(Ein)+" J) × 100% = "+F3(eff)+"%. The percent efficiency of the hoist is "+F3(eff)+"%.",
    {m:m,h:h,Ein:Ein});
});

// LEVEL: 3 - Comparative quantitative analysis of two devices' efficiencies, resisting the larger-useful-output trap.
// VARIANTS: Device A more efficient (50%) vs Device B more efficient (50%)
// LENGTHS: key=55, distractors=55,55,58
E("u3-77-compare-devices",3,["PH11.7.7"],3,"gen",function(){
  var winner=pick(["A","B"]);
  var ctx=pick(["motors","heaters","lamps"]);
  var labelA=ctx==="motors"?"Motor A":(ctx==="heaters"?"Heater A":"Lamp A");
  var labelB=ctx==="motors"?"Motor B":(ctx==="heaters"?"Heater B":"Lamp B");
  var loserLabel=winner==="A"?labelB:labelA;
  var winnerLabel=winner==="A"?labelA:labelB;
  var inA,outA,inB,outB,effA,effB,diff,tries=0;
  var wantTrap=(Math.random()<0.6);
  do{
    tries++;
    inA=sfR(rf(100,2000),3);
    outA=sfR(rf(50,0.92*inA),3);
    inB=sfR(rf(100,2000),3);
    outB=sfR(rf(50,0.92*inB),3);
    effA=sfR((outA/inA)*100,3);
    effB=sfR((outB/inB)*100,3);
    if(effA>95||effB>95||effA<10||effB<10){diff=-1;continue;}
    if(winner==="A"&&effA-effB<5){diff=-1;continue;}
    if(winner==="B"&&effB-effA<5){diff=-1;continue;}
    if(wantTrap&&tries<60){
      if(winner==="A"&&outA>=outB){diff=-1;continue;}
      if(winner==="B"&&outB>=outA){diff=-1;continue;}
    }
    diff=sfR(Math.abs(effA-effB),3);
    var winEffTmp=winner==="A"?effA:effB;
    if(Math.abs(sfR(100-winEffTmp,3)-diff)<1e-9){diff=-1;}
  }while(diff<5&&tries<100);
  if(diff<5){
    if(winner==="A"){inA=500;outA=400;inB=1000;outB=550;}
    else{inA=1000;outA=550;inB=500;outB=400;}
    effA=sfR((outA/inA)*100,3);
    effB=sfR((outB/inB)*100,3);
    diff=sfR(Math.abs(effA-effB),3);
  }
  var winEff=winner==="A"?effA:effB;
  var wrongDiff=sfR(100-winEff,3);
  var key=winnerLabel+" is more efficient by "+F3(diff)+" percentage points";
  var d1=loserLabel+" is more efficient by "+F3(diff)+" percentage points";
  var d2=winnerLabel+" is more efficient by "+F3(wrongDiff)+" percentage points";
  var d3="Both "+ctx+" are equally efficient because both waste heat";
  return mcq(labelA+" uses "+gF(inA)+" J of input energy to produce "+gF(outA)+" J of useful output energy, while "+labelB+" uses "+gF(inB)+" J of input energy to produce "+gF(outB)+" J of useful output energy. Which device is more efficient, and by how much?",
    key,[d1,d2,d3],
    "Calculate each efficiency: "+labelA+" has efficiency ("+gF(outA)+" J / "+gF(inA)+" J) × 100% = "+F3(effA)+"%, and "+labelB+" has efficiency ("+gF(outB)+" J / "+gF(inB)+" J) × 100% = "+F3(effB)+"%. Comparing the two efficiencies gives a difference of |"+F3(effA)+"% - "+F3(effB)+"%| = "+F3(diff)+" percentage points. "+key+".",
    {winner:winner,inA:inA,outA:outA,inB:inB,outB:outB,effA:effA,effB:effB});
});
/* ---------- 7.8 Work, time and power ---------- */

E("u3-78-power-cr",3,["PH11.7.8"],2,"gen",function(){
  var branch=pick(["power","time"]);
  var m=sfR(rf(5,15),3),h=sfR(rf(2,5),3),w=sfR(m*9.8,4),W=sfR(w*h,3);
  if(branch==="power"){
    var t=sfR(rf(4,12),3),P=sfR(W/t,3);
    return numq("A hoist lifts a "+gF(m)+" kg load at a constant speed through a height of "+gF(h)+" m in "+gF(t)+" s. What is the power output of the hoist? Give your answer in W.",P,Math.max(0.02*Math.abs(P),1e-9),
    "At a constant speed the lifting force equals the weight. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The work is "+iF(w)+" N × "+gF(h)+" m = "+F3(W)+" J. Power is work divided by time: "+F3(W)+" J / "+gF(t)+" s = "+F3(P)+" W. The power output is "+F3(P)+" W.",{m:m,h:h,t:t});
  }
  var P=sfR(rf(50,200),3),t=sfR(W/P,3);
  return numq("A hoist with a power output of "+gF(P)+" W lifts a "+gF(m)+" kg load at a constant speed through a height of "+gF(h)+" m. How long does the lift take? Give your answer in s.",t,Math.max(0.02*Math.abs(t),1e-9),
  "At a constant speed the lifting force equals the weight. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The work needed is "+iF(w)+" N × "+gF(h)+" m = "+F3(W)+" J. Time is work divided by power: "+F3(W)+" J / "+gF(P)+" W = "+F3(t)+" s. The lift takes "+F3(t)+" s.",{m:m,h:h,P:P});
});

E("u3-78-power-basic",3,["PH11.7.8"],2,"gen",function(){
  var F=sfR(rf(20,90),3),d=sfR(rf(2,10),3),t=sfR(rf(5,20),3),W=sfR(F*d,3),P=sfR(W/t,3);
  var ctx=pick(["A motor","A worker","A pump motor","A winch"]);
  return numq(ctx+" exerts a steady force of "+gF(F)+" N and moves its load "+gF(d)+" m in "+gF(t)+" s. What is the power? Give your answer in W.",P,Math.max(0.02*Math.abs(P),1e-9),
  "First find the work: "+gF(F)+" N × "+gF(d)+" m = "+F3(W)+" J. Power is work divided by time: P = W / t. "+F3(W)+" J / "+gF(t)+" s = "+F3(P)+" W. The power is "+F3(P)+" W.",{F:F,d:d,t:t});
});

E("u3-78-power-fv",3,["PH11.7.8"],2,"gen",function(){
  var m=sfR(rf(10,50),3),v=sfR(rf(0.5,1.5),3),w=sfR(m*9.8,4),P=sfR(w*v,3);
  return numq("A motor lifts a "+gF(m)+" kg load straight up at a constant speed of "+gF(v)+" m/s. What is the power output of the motor? Give your answer in W.",P,Math.max(0.02*Math.abs(P),1e-9),
  "At a constant speed the lifting force equals the weight, and power is force times speed: P = F v. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. Then "+iF(w)+" N × "+gF(v)+" m/s = "+F3(P)+" W. The power output is "+F3(P)+" W.",{m:m,v:v});
});

E("u3-78-time-work",3,["PH11.7.8"],2,"gen",function(){
  var P=sfR(rf(40,120),3),tdraw=sfR(rf(3,8),3),W=sfR(P*tdraw,3),t=sfR(W/P,3);
  return mcq("A motor with a power output of "+gF(P)+" W does "+gF(W)+" J of work. How long does it take?",
    F3(t)+" s",
    [F3(P/W)+" s",F3(W*P)+" s",F3(W/(2*P))+" s"],
    "Power is work divided by time, so time is work divided by power. "+gF(W)+" J / "+gF(P)+" W = "+F3(t)+" s. It takes "+F3(t)+" s.",{P:P,W:W});
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-78-rank-power, u3-78-ke-rate added to bring this pool to 6.
// LEVEL: 3 - Multi-case quantitative comparison ranking power across three machines while resisting the largest-work trap.
// VARIANTS: Machine A highest power (33%), Machine B highest power (33%), Machine C highest power (33%)
// LENGTHS: key=37, distractors=37,37,43
E("u3-78-rank-power",3,["PH11.7.8"],3,"gen",function(){
  var winIdx=ri(0,2);
  var ctx=pick(["motors","pumps","winches"]);
  var names=ctx==="motors"?["Motor A","Motor B","Motor C"]:(ctx==="pumps"?["Pump A","Pump B","Pump C"]:["Winch A","Winch B","Winch C"]);
  var wArr=[0,0,0],tArr=[0,0,0],pArr=[0,0,0],ok=false,tries=0;
  var wantTrap=(Math.random()<0.65);
  while(!ok&&tries<120){
    tries++;
    ok=true;
    for(var i=0;i<3;i++){
      wArr[i]=sfR(rf(200,5000),3);
      tArr[i]=sfR(rf(2,60),3);
      pArr[i]=sfR(wArr[i]/tArr[i],3);
    }
    for(var j=0;j<3;j++){
      if(j!==winIdx){
        if(pArr[winIdx]<1.2*pArr[j]){ok=false;}
      }
    }
    if(Math.abs(pArr[0]-pArr[1])<1||Math.abs(pArr[1]-pArr[2])<1||Math.abs(pArr[0]-pArr[2])<1){ok=false;}
    if(ok&&wantTrap&&tries<80){
      var maxW=Math.max(wArr[0],wArr[1],wArr[2]);
      if(wArr[winIdx]===maxW){ok=false;}
    }
  }
  if(!ok){
    wArr=[1200,3000,1500];
    tArr=[4.00,25.0,15.0];
    if(winIdx===1){wArr=[3000,1200,1500];tArr=[25.0,4.00,15.0];}
    if(winIdx===2){wArr=[1500,3000,1200];tArr=[15.0,25.0,4.00];}
    for(var k=0;k<3;k++){pArr[k]=sfR(wArr[k]/tArr[k],3);}
  }
  var key=names[winIdx]+" delivers the greatest power";
  var ds=[];
  for(var n=0;n<3;n++){
    if(n!==winIdx){ds.push(names[n]+" delivers the greatest power");}
  }
  ds.push("All three "+ctx+" deliver the same power");
  var tableRows=names[0]+": work = "+gF(wArr[0])+" J, time = "+gF(tArr[0])+" s<br>"+names[1]+": work = "+gF(wArr[1])+" J, time = "+gF(tArr[1])+" s<br>"+names[2]+": work = "+gF(wArr[2])+" J, time = "+gF(tArr[2])+" s";
  return mcq("Three "+ctx+" perform the amounts of work in the times listed below:<br>"+tableRows+"<br>Which device delivers the greatest average power?",
    key,ds,
    "Power is work divided by time (P = W / Δt). Computing each power: "+names[0]+" delivers "+gF(wArr[0])+" J / "+gF(tArr[0])+" s = "+F3(pArr[0])+" W; "+names[1]+" delivers "+gF(wArr[1])+" J / "+gF(tArr[1])+" s = "+F3(pArr[1])+" W; "+names[2]+" delivers "+gF(wArr[2])+" J / "+gF(tArr[2])+" s = "+F3(pArr[2])+" W. "+key+".",
    {winIdx:winIdx,w0:wArr[0],t0:tArr[0],w1:wArr[1],t1:tArr[1],w2:wArr[2],t2:tArr[2],p0:pArr[0],p1:pArr[1],p2:pArr[2]});
});

// LEVEL: 2 - Multi-step calculation chaining kinetic energy change and elapsed time to find average power.
// VARIANTS: accelerating vehicle (50%) vs braking vehicle (50%)
// LENGTHS: key=4
E("u3-78-ke-rate",3,["PH11.7.8"],2,"gen",function(){
  var speedingUp=(Math.random()<0.5);
  var vehicle=pick(["car","snowmobile","ferry"]);
  var m=vehicle==="ferry"?sfR(rf(800,1500),3):(vehicle==="car"?sfR(rf(800,1500),3):sfR(rf(150,350),3));
  var vi,vf,tries=0;
  do{
    vi=sfR(rf(2,25),3);
    vf=sfR(rf(2,30),3);
    tries++;
  }while((speedingUp?vf-vi<4:vi-vf<4)&&tries<80);
  if(speedingUp&&vf-vi<4){vi=5.00;vf=18.0;}
  if(!speedingUp&&vi-vf<4){vi=20.0;vf=6.00;}
  var t=sfR(rf(2,20),3);
  var Eki=sfR(0.5*m*vi*vi,4);
  var Ekf=sfR(0.5*m*vf*vf,4);
  var dEk=sfR(Math.abs(Ekf-Eki),4);
  var P=sfR(dEk/t,3);
  var promptTxt,solTxt;
  if(speedingUp){
    promptTxt="A "+gF(m)+" kg "+vehicle+" accelerates from "+gF(vi)+" m/s to "+gF(vf)+" m/s in "+gF(t)+" s. What is the average power delivered by the net force during this change? Give your answer in W.";
    solTxt="The initial kinetic energy is Ek_i = 0.5 × "+gF(m)+" kg × ("+gF(vi)+" m/s)^2 = "+iF(Eki)+" J, and the final kinetic energy is Ek_f = 0.5 × "+gF(m)+" kg × ("+gF(vf)+" m/s)^2 = "+iF(Ekf)+" J. The net work equals the kinetic energy gained: ΔEk = "+iF(Ekf)+" J - "+iF(Eki)+" J = "+iF(dEk)+" J. Dividing by time gives average power: P = "+iF(dEk)+" J / "+gF(t)+" s = "+F3(P)+" W. The average power delivered is "+F3(P)+" W.";
  }else{
    promptTxt="A "+gF(m)+" kg "+vehicle+" slows down from "+gF(vi)+" m/s to "+gF(vf)+" m/s in "+gF(t)+" s. Taking the energy dissipated as positive, what is the average power absorbed by the brakes during this stop? Give your answer in W.";
    solTxt="The initial kinetic energy is Ek_i = 0.5 × "+gF(m)+" kg × ("+gF(vi)+" m/s)^2 = "+iF(Eki)+" J, and the final kinetic energy is Ek_f = 0.5 × "+gF(m)+" kg × ("+gF(vf)+" m/s)^2 = "+iF(Ekf)+" J. Reporting the energy dissipated as a positive amount, ΔEk = "+iF(Eki)+" J - "+iF(Ekf)+" J = "+iF(dEk)+" J. Dividing by time gives average power: P = "+iF(dEk)+" J / "+gF(t)+" s = "+F3(P)+" W. The average power absorbed is "+F3(P)+" W.";
  }
  return numq(promptTxt,P,Math.max(0.02*Math.abs(P),1e-9),solTxt,{m:m,vi:vi,vf:vf,t:t});
});
/* ---------- 7.9 Hooke's law ---------- */

E("u3-79-hooke-force",3,["PH11.7.9"],2,"gen",function(){
  var k=sfR(rf(20,200),3),xcm=ri(5,30),x=sfR(xcm/100,3),F=sfR(k*x,3);
  var ctx=pick(["A spring with a spring constant of","A bungee cord with a spring constant of","A spring scale spring with a spring constant of"]);
  var q=numq(ctx+" "+gF(k)+" N/m is stretched by "+xcm+" cm. How large is the spring force? Give your answer in N.",F,Math.max(0.02*Math.abs(F),1e-9),
  "Hooke's law needs the stretch in metres: "+xcm+" / 100 = "+iF(x)+" m. Then F = k x gives "+gF(k)+" N/m × "+gF(x)+" m = "+F3(F)+" N. The spring force is "+F3(F)+" N, directed back toward the unstretched position.",{k:k,xcm:xcm});
    q.figure=p22Spring(gF(xcm)+" cm","force = ?");return q;
});

E("u3-79-spring-constant",3,["PH11.7.9"],2,"gen",function(){
  var F=sfR(rf(10,90),3),x=sfR(rf(0.10,0.45),3),k=sfR(F/x,3);
  var q=numq("A force of "+gF(F)+" N stretches a spring by "+gF(x)+" m from its unstretched length. What is the spring constant of the spring? Give your answer in N/m.",k,Math.max(0.02*Math.abs(k),1e-9),
  "From Hooke's law, k = F / x. "+gF(F)+" N / "+gF(x)+" m = "+F3(k)+" N/m. The spring constant is "+F3(k)+" N/m.",{F:F,x:x});
    q.figure=p22Spring(gF(x)+" m",gF(F)+" N");return q;
});

E("u3-79-stretch",3,["PH11.7.9"],2,"gen",function(){
  var k=sfR(rf(30,150),3),F=sfR(rf(5,45),3),x=sfR(F/k,3);
  var q=numq("A spring with a spring constant of "+gF(k)+" N/m has a force of "+gF(F)+" N applied to it. How far does it stretch from its unstretched length? Give your answer in m.",x,Math.max(0.02*Math.abs(x),1e-9),
  "From Hooke's law, x = F / k. "+gF(F)+" N / "+gF(k)+" N/m = "+F3(x)+" m. The spring stretches "+F3(x)+" m.",{k:k,F:F});
    q.figure=p22Spring("stretch = ?",gF(F)+" N");return q;
});

E("u3-79-graph-k",3,["PH11.7.9"],2,"gen",function(){
  var k0=sfR(rf(40,180),3),x1=sfR(rf(0.05,0.15),3),x2=sfR(x1+rf(0.10,0.25),3);
  var F1=sfR(k0*x1,3),F2=sfR(k0*x2,3),dF=sfR(F2-F1,3),dx=sfR(x2-x1,3),k=sfR(dF/dx,3);
  var q=mcq("A force-stretch graph for a spring is a straight line through the points ("+gF(x1)+" m, "+gF(F1)+" N) and ("+gF(x2)+" m, "+gF(F2)+" N). What is the spring constant of the spring?",
    F3(k)+" N/m",
    [F3(k/2)+" N/m",F3(2*k)+" N/m",F3(1/k)+" N/m"],
    "The spring constant is the slope of a force-stretch graph: the change in force divided by the change in stretch. The force change is "+gF(F2)+" N - "+gF(F1)+" N = "+F3(dF)+" N and the stretch change is "+gF(x2)+" m - "+gF(x1)+" m = "+F3(dx)+" m. Then "+F3(dF)+" N / "+F3(dx)+" m = "+F3(k)+" N/m. The spring constant is "+F3(k)+" N/m.",{k:k,x1:x1,x2:x2});
    q.figure=p22Plot({series:[{pts:[[x1,F1],[x2,F2]]}],xt:[[x1,gF(x1)],[x2,gF(x2)]],yt:[[F1,gF(F1)],[F2,gF(F2)]],xmax:x2*1.25,ymax:F2*1.25,xl:"stretch (m)",yl:"force (N)",dots:true});return q;
});

E("u3-79-spring-mcq",3,["PH11.7.9"],2,"gen",function(){
  var k=sfR(rf(20,100),3),x=sfR(rf(0.10,0.30),3),F=sfR(k*x,3);
  var q=mcq("A spring with a spring constant of "+gF(k)+" N/m is stretched by "+gF(x)+" m. How large is the spring force?",
    F3(F)+" N",
    [F3(k/x)+" N",F3(k+x)+" N",F3(x/k)+" N"],
    "Hooke's law gives the size of the spring force as F = k x. "+gF(k)+" N/m × "+gF(x)+" m = "+F3(F)+" N. The spring force is "+F3(F)+" N.",{k:k,x:x});
    q.figure=p22Spring(gF(x)+" m","force = ?");return q;
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-79-spring-launch-cr added to bring this pool to 6.
// LEVEL: 2 - Two-step energy conservation transfer converting elastic potential energy in a compressed spring to kinetic energy of a launched ball.
// LENGTHS: key=4
E("u3-79-spring-launch-cr",3,["PH11.7.9"],2,"gen",function(){
  var k=sfR(rf(50,400),3);
  var x=sfR(rf(0.05,0.3),3);
  var m=sfR(rf(0.02,0.5),3);
  var Es=sfR(0.5*k*x*x,4);
  var v=sfR(Math.sqrt((2*Es)/m),3);
  return numq("A spring launcher with a spring constant of "+gF(k)+" N/m is compressed by "+gF(x)+" m and used to launch a "+gF(m)+" kg ball along a level frictionless track. What is the launch speed of the ball as it leaves the spring? Give your answer in m/s.",
    v,Math.max(0.02*Math.abs(v),1e-9),
    "First calculate the elastic potential energy stored in the compressed spring: Es = 0.5 × "+gF(k)+" N/m × ("+gF(x)+" m)^2 = "+iF(Es)+" J. With friction neglected, all of this stored energy becomes the ball's kinetic energy: Ek = 0.5 × "+gF(m)+" kg × v^2 = "+iF(Es)+" J. Solving for speed gives v = sqrt(2 × "+iF(Es)+" J / "+gF(m)+" kg) = "+F3(v)+" m/s. The launch speed of the ball is "+F3(v)+" m/s.",
    {k:k,x:x,m:m});
});
/* ---------- 7.10 Simple harmonic motion, horizontal spring ---------- */

E("u3-710-accel-magnitude",3,["PH11.7.10"],2,"gen",function(){
  var k=sfR(rf(10,60),3),m=sfR(rf(1,4),3),x=sfR(rf(0.05,0.20),3);
  var km=sfR(k/m,4),a=sfR(km*x,3);
  var q=numq("A mass of "+gF(m)+" kg on a horizontal spring with spring constant "+gF(k)+" N/m is displaced "+gF(x)+" m from equilibrium. Use a = (k/m) x to find the size of its acceleration. Give your answer in m/s^2.",a,Math.max(0.02*Math.abs(a),1e-9),
  "For a horizontal spring the size of the acceleration is a = (k/m) x. First "+gF(k)+" N/m / "+gF(m)+" kg = "+iF(km)+" 1/s^2. Then "+iF(km)+" 1/s^2 × "+gF(x)+" m = "+F3(a)+" m/s^2. The acceleration is "+F3(a)+" m/s^2, directed back toward equilibrium.",{k:k,m:m,x:x});
    q.figure=p22Spring("displacement "+gF(x)+" m",null);return q;
});

E("u3-710-direction",3,["PH11.7.10"],1,"var",varset([
  function(){
    return mcq("A mass on a horizontal spring is pulled to the right of equilibrium and held there. In which direction is its acceleration while it is held displaced to the right?",
      "To the left, back toward equilibrium",
      ["To the right, away from equilibrium",
       "Zero, because it is held still",
       "Upward, because the spring is stretched"],
      "The spring pulls the mass back toward equilibrium, so the net force and the acceleration point toward equilibrium. Displaced to the right, the acceleration is to the left, opposite the displacement.",{});
  },
  function(){
    return mcq("A mass on a horizontal spring is pushed to the left of equilibrium. In which direction is its acceleration at that point?",
      "To the right, back toward equilibrium",
      ["To the left, away from equilibrium",
       "Zero, because the spring is compressed",
       "In the direction of its velocity, whatever that is"],
      "The compressed spring pushes the mass back toward equilibrium, so the acceleration points toward equilibrium. Displaced to the left, the acceleration is to the right, opposite the displacement.",{});
  },
  function(){
    return mcq("A mass on a horizontal spring passes through the equilibrium position. What is its acceleration at that instant?",
      "Zero, because the spring force is zero at equilibrium",
      ["A maximum, because its speed is a maximum there",
       "Equal to 9.8 m/s^2 downward",
       "The same as at the ends of the motion"],
      "At equilibrium the displacement is zero, so a = (k/m) x is zero. The speed is greatest at equilibrium, but the acceleration is zero there.",{});
  },
  function(){
    return mcq("For a mass on a horizontal spring, the acceleration is always",
      "Directed opposite the displacement, back toward equilibrium",
      ["Directed the same way as the displacement",
       "Directed the same way as the velocity",
       "Zero at every point of the motion"],
      "The relation a = -(k/m) x says the acceleration is proportional to the displacement and opposite in direction. Whatever side of equilibrium the mass is on, its acceleration points back toward equilibrium.",{});
  }
]));

E("u3-710-greatest-accel",3,["PH11.7.10"],1,"var",varset([
  function(){
    return mcq("A mass oscillates on a horizontal spring. At which point is the size of its acceleration greatest?",
      "At the ends of the motion, where the displacement is greatest",
      ["At equilibrium, where the speed is greatest",
       "Halfway between equilibrium and the end of the motion",
       "The acceleration has the same size everywhere"],
      "The acceleration is a = (k/m) x, so it grows with the displacement. The displacement is greatest at the ends of the motion, so the acceleration is greatest there, even though the mass is momentarily at rest at those points.",{});
  },
  function(){
    return mcq("A mass oscillates on a horizontal spring. At which point is its acceleration zero?",
      "At equilibrium, where the displacement is zero",
      ["At the ends of the motion, where the mass stops for an instant",
       "Nowhere, because the mass is always accelerating",
       "At every point, because the motion repeats"],
      "The acceleration is a = (k/m) x. At equilibrium the displacement x is zero, so the acceleration is zero there. At the ends the mass stops for an instant, but its acceleration is at its greatest there.",{});
  },
  function(){
    var k=ri(20,60),m=ri(1,4),x1=pick([0.05,0.08,0.10]);
    return mcq("A "+m+" kg mass on a horizontal spring with spring constant "+k+" N/m is displaced "+gF(x1)+" m from equilibrium, then displaced twice as far. What happens to the size of its acceleration?",
      "It doubles, because the acceleration is proportional to the displacement",
      ["It stays the same, because the mass and spring have not changed",
       "It is cut in half, because the spring is stretched farther",
       "It becomes zero, because the mass is farther from equilibrium"],
      "The acceleration is a = (k/m) x. With k and m fixed, doubling x doubles a. The acceleration is proportional to the displacement and directed opposite to it.",{k:k,m:m,x1:x1});
  },
  function(){
    return mcq("A mass on a horizontal spring is at the right-hand end of its motion, momentarily at rest. Which statement is correct?",
      "Its acceleration is a maximum and points to the left",
      ["Its acceleration is zero because its velocity is zero",
       "Its acceleration is a maximum and points to the right",
       "Its speed and acceleration are both a maximum"],
      "At the end of the motion the displacement is greatest, so a = (k/m) x is greatest. The spring pulls toward equilibrium, so the acceleration points to the left. Zero velocity does not mean zero acceleration.",{});
  }
]));

E("u3-710-accel-judgement",3,["PH11.7.10"],3,"gen",function(){
  var k=sfR(rf(15,60),3),m=sfR(rf(1.5,4),3),x=sfR(rf(0.06,0.22),3);
  var km=sfR(k/m,4),a=sfR(km*x,3);
  var q=mcq("A "+gF(m)+" kg mass on a horizontal spring with spring constant "+gF(k)+" N/m is held "+gF(x)+" m to the right of equilibrium. What is its acceleration when it is released from rest there?",
    F3(a)+" m/s^2 to the left",
    [F3(a)+" m/s^2 to the right",F3(k*x)+" m/s^2 to the left",F3(a/2)+" m/s^2 to the left"],
    "The size of the acceleration is a = (k/m) x. First "+gF(k)+" N/m / "+gF(m)+" kg = "+iF(km)+" 1/s^2. Then "+iF(km)+" 1/s^2 × "+gF(x)+" m = "+F3(a)+" m/s^2. The spring pulls the mass back toward equilibrium, so the acceleration is to the left: "+F3(a)+" m/s^2 to the left.",{k:k,m:m,x:x});
    q.figure=p22Spring("displacement "+gF(x)+" m",null);return q;
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-710-period-cr, u3-710-motion-describe added to bring this pool to 6.
// LEVEL: 2 - Two-step calculation finding the period of a mass-spring oscillator and scaling by an exact cycle count.
// LENGTHS: key=4
E("u3-710-period-cr",3,["PH11.7.10"],2,"gen",function(){
  var m=sfR(rf(0.1,2),3);
  var k=sfR(rf(10,200),3);
  var n=ri(5,20);
  var T=sfR(2*Math.PI*Math.sqrt(m/k),4);
  var tTotal=sfR(T*n,3);
  return numq("A "+gF(m)+" kg block attached to a horizontal spring with a spring constant of "+gF(k)+" N/m oscillates in simple harmonic motion on a frictionless surface. How much time does the block take to complete "+n+" full oscillations? Give your answer in s.",
    tTotal,Math.max(0.02*Math.abs(tTotal),1e-9),
    "The period of a mass oscillating on a spring is T = 2π sqrt(m / k). Substituting the given values gives T = 2π × sqrt("+gF(m)+" kg / "+gF(k)+" N/m) = "+iF(T)+" s. For "+n+" full oscillations, the total elapsed time is t = "+n+" × "+iF(T)+" s = "+F3(tTotal)+" s. The block takes "+F3(tTotal)+" s.",
    {m:m,k:k,n:n});
});

// LEVEL: 2 - Multi-position cycle analysis tracing how velocity and speed behave across four instants of simple harmonic motion.
// VARIANTS: four instants (at extreme, passing equilibrium, moving toward extreme, moving toward equilibrium) at equal mix
// LENGTHS: key=42, distractors=46,35,35
E("u3-710-motion-describe",3,["PH11.7.10"],2,"var",varset([
  function(){
    var key="Its velocity is momentarily equal to zero";
    var ds=["Its speed is at its greatest possible value","Its speed is increasing toward the center","Its speed is decreasing toward the center"];
    return mcq("A mass oscillating on a horizontal frictionless spring reaches its maximum displacement at one extreme of its motion. Which statement accurately describes the mass's velocity at that instant?",
      key,ds,
      "At either extreme of simple harmonic motion, the mass stops reversing direction before heading back toward equilibrium. At that turnaround instant, its motion pauses completely. "+key+".",
      {instant:"at_extreme"});
  },
  function(){
    var key="Its speed is at its greatest possible value";
    var ds=["Its velocity is momentarily equal to zero","Its speed is decreasing toward the center","Its speed is increasing toward the extreme"];
    return mcq("A mass oscillating on a horizontal frictionless spring passes right through its equilibrium position. Which statement accurately describes the mass's velocity at that instant?",
      key,ds,
      "As the mass moves from an extreme toward equilibrium, the spring pulls it faster and faster until it reaches equilibrium, where the spring force drops to zero and the mass begins slowing on the other side. "+key+".",
      {instant:"at_equilibrium"});
  },
  function(){
    var key="Its speed is decreasing as it moves outward";
    var ds=["Its speed is increasing as it moves outward","Its velocity is constant until it hits the end","Its velocity is momentarily equal to zero"];
    return mcq("A mass oscillating on a horizontal frictionless spring has passed equilibrium and is moving outward toward the right extreme. Which statement accurately describes the mass's velocity during this part of the cycle?",
      key,ds,
      "Once the mass passes equilibrium, the spring stretches and pulls backward toward equilibrium, opposing the outward motion and slowing the mass down until it stops at the extreme. "+key+".",
      {instant:"toward_extreme"});
  },
  function(){
    var key="Its speed is increasing as it moves inward";
    var ds=["Its speed is decreasing as it moves inward","Its velocity is constant until it hits the end","Its velocity is momentarily equal to zero"];
    return mcq("A mass oscillating on a horizontal frictionless spring is released from rest at the left extreme and is moving inward toward equilibrium. Which statement accurately describes the mass's velocity during this part of the cycle?",
      key,ds,
      "As the mass moves inward from an extreme toward equilibrium, the restoring spring force pulls in the same direction as the motion, causing the mass to accelerate until it reaches equilibrium. "+key+".",
      {instant:"toward_equilibrium"});
  }
]));
/* ---------- 7.11 Energies in simple harmonic motion ---------- */

E("u3-711-shm-energy-cr",3,["PH11.7.11"],3,"gen",function(){
  var branch=pick(["table","track"]);
  var k=sfR(rf(20,120),3),A=sfR(rf(0.12,0.30),3),x=sfR(A*rf(0.3,0.7),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),x2=sfR(x*x,4);
  var etot=sfR(halfk*A2,3),es=sfR(halfk*x2,3),ke=sfR(etot-es,3);
  var where=branch==="table"?"on a frictionless table":"on a smooth horizontal track";
  var q=numq("A mass oscillates "+where+" on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its kinetic energy when it is "+gF(x)+" m from equilibrium? Give your answer in J.",ke,Math.max(0.02*Math.abs(ke),1e-9),
  "The total energy is set by the amplitude, where all the energy is elastic potential energy. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2, so the total energy is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. At the stated displacement, the displacement squared is "+gF(x)+" m × "+gF(x)+" m = "+iF(x2)+" m^2, so the elastic potential energy is "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J. The rest is kinetic: "+F3(etot)+" J - "+F3(es)+" J = "+F3(ke)+" J. The kinetic energy is "+F3(ke)+" J.",{k:k,A:A,x:x});
  q.figure=p22Spring("displacement "+gF(x)+" m",null);return q;
});

E("u3-711-elastic-pe",3,["PH11.7.11"],2,"gen",function(){
  var k=sfR(rf(20,150),3),x=sfR(rf(0.05,0.35),3);
  var halfk=sfR(0.5*k,4),x2=sfR(x*x,4),es=sfR(halfk*x2,3);
  var q=numq("A spring with spring constant "+gF(k)+" N/m is stretched by "+gF(x)+" m. What is the elastic potential energy stored in the spring? Give your answer in J.",es,Math.max(0.02*Math.abs(es),1e-9),
  "Elastic potential energy is Es = 1/2 k x^2. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The stretch squared is "+gF(x)+" m × "+gF(x)+" m = "+iF(x2)+" m^2. Then "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J. The elastic potential energy is "+F3(es)+" J.",{k:k,x:x});
  q.figure=p22Spring(gF(x)+" m",null);return q;
});

E("u3-711-total-energy",3,["PH11.7.11"],2,"gen",function(){
  var k=sfR(rf(20,150),3),A=sfR(rf(0.08,0.35),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),etot=sfR(halfk*A2,3);
  var q=numq("A mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is the total mechanical energy of the system? Give your answer in J.",etot,Math.max(0.02*Math.abs(etot),1e-9),
  "At the amplitude the mass is momentarily at rest, so all the energy is elastic potential energy and that amount is the total. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2. Then "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. The total mechanical energy is "+F3(etot)+" J.",{k:k,A:A});
  q.figure=p22Spring("amplitude "+gF(A)+" m",null);return q;
});

E("u3-711-speed-at-x",3,["PH11.7.11"],3,"gen",function(){
  var m=sfR(rf(0.5,3),3),k=sfR(rf(20,100),3),A=sfR(rf(0.15,0.35),3),x=sfR(A*rf(0.3,0.6),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),x2=sfR(x*x,4);
  var etot=sfR(halfk*A2,3),es=sfR(halfk*x2,3),ke=sfR(etot-es,3);
  var twoKe=sfR(2*ke,4),v2=sfR(twoKe/m,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A "+gF(m)+" kg mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its speed when it is "+gF(x)+" m from equilibrium? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Find the kinetic energy at that displacement first. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The total energy, from the amplitude, is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J, using the amplitude squared, "+iF(A2)+" m^2. The elastic potential energy at the displacement is "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J, using the displacement squared, "+iF(x2)+" m^2. The kinetic energy is "+F3(etot)+" J - "+F3(es)+" J = "+F3(ke)+" J. Twice the kinetic energy is 2 × "+F3(ke)+" J = "+iF(twoKe)+" J. Then "+iF(twoKe)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,k:k,A:A,x:x});
  q.figure=p22Spring("displacement "+gF(x)+" m",null);return q;
});

E("u3-711-speed-equilibrium",3,["PH11.7.11"],3,"gen",function(){
  var m=sfR(rf(0.5,3),3),k=sfR(rf(20,100),3),A=sfR(rf(0.10,0.35),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),etot=sfR(halfk*A2,3);
  var twoE=sfR(2*etot,4),v2=sfR(twoE/m,4),v=sfR(Math.sqrt(v2),3);
  var q=numq("A "+gF(m)+" kg mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its speed as it passes through equilibrium? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "At equilibrium the elastic potential energy is zero, so all the total energy is kinetic there. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2, so the total energy is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. Twice the total energy is 2 × "+F3(etot)+" J = "+iF(twoE)+" J. Then "+iF(twoE)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,k:k,A:A});
  q.figure=p22Spring("amplitude "+gF(A)+" m",null);return q;
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-711-ke-at-x added to bring this pool to 6.
// LEVEL: 2 - Two-step conservation of energy calculation in simple harmonic motion subtracting elastic potential energy from total mechanical energy.
// LENGTHS: key=4
E("u3-711-ke-at-x",3,["PH11.7.11"],2,"gen",function(){
  var k=sfR(rf(20,300),3);
  var A=sfR(rf(0.05,0.4),3);
  var frac=sfR(rf(0.3,0.8),3);
  var x=sfR(A*frac,3);
  var Etot=sfR(0.5*k*A*A,4);
  var Es=sfR(0.5*k*x*x,4);
  var Ek=sfR(Etot-Es,3);
  return numq("A mass attached to a horizontal spring of spring constant "+gF(k)+" N/m oscillates on a frictionless surface with an amplitude of "+gF(A)+" m. What is the kinetic energy of the mass when its displacement from equilibrium is "+gF(x)+" m? Give your answer in J.",
    Ek,Math.max(0.02*Math.abs(Ek),1e-9),
    "First calculate the total mechanical energy from the amplitude: E_total = 0.5 × "+gF(k)+" N/m × ("+gF(A)+" m)^2 = "+iF(Etot)+" J. Next calculate the elastic potential energy at x = "+gF(x)+" m: Es = 0.5 × "+gF(k)+" N/m × ("+gF(x)+" m)^2 = "+iF(Es)+" J. Since E_total = Ek + Es, the kinetic energy is Ek = "+iF(Etot)+" J - "+iF(Es)+" J = "+F3(Ek)+" J. The kinetic energy of the mass is "+F3(Ek)+" J.",
    {k:k,A:A,x:x});
});
/* ---------- 7.12 Elastic and inelastic collisions ---------- */

E("u3-712-classify-cr",3,["PH11.7.12"],2,"gen",function(){
  var m1=sfR(rf(2,5),3),v1=sfR(rf(4,8),3),m2=sfR(rf(3,6),3),v2=sfR(rf(1,3),3);
  var p1=sfR(m1*v1,4),p2=sfR(m2*v2,4),ptot=sfR(p1+p2,4),M=sfR(m1+m2,3),vf=sfR(ptot/M,4);
  var hm1=sfR(0.5*m1,4),hm2=sfR(0.5*m2,4),v1sq=sfR(v1*v1,4),v2sq=sfR(v2*v2,4);
  var ke1=sfR(hm1*v1sq,3),ke2=sfR(hm2*v2sq,3),kei=sfR(ke1+ke2,3);
  var hmT=sfR(0.5*M,4),vfsq=sfR(vf*vf,4),kef=sfR(hmT*vfsq,3),lost=sfR(kei-kef,3);
  return numq("Take the direction of motion as positive. A "+gF(m1)+" kg cart moving at "+gF(v1)+" m/s collides with a "+gF(m2)+" kg cart moving at "+gF(v2)+" m/s in the same direction. The carts stick together. How much kinetic energy is lost in the collision? Give your answer in J.",lost,Math.max(0.02*Math.abs(lost),1e-9),
  "Momentum is conserved in the collision, so first find the common final speed. The momenta before are "+gF(m1)+" kg × "+gF(v1)+" m/s = "+iF(p1)+" kg m/s and "+gF(m2)+" kg × "+gF(v2)+" m/s = "+iF(p2)+" kg m/s. The total momentum is "+iF(p1)+" kg m/s + "+iF(p2)+" kg m/s = "+iF(ptot)+" kg m/s. The combined mass is "+gF(M)+" kg, so the final speed is "+iF(ptot)+" kg m/s / "+gF(M)+" kg = "+iF(vf)+" m/s. Now the kinetic energies. Half the first mass is 0.500 × "+gF(m1)+" kg = "+iF(hm1)+" kg and its speed squared is "+iF(v1sq)+" m^2/s^2, giving "+iF(hm1)+" kg × "+iF(v1sq)+" m^2/s^2 = "+F3(ke1)+" J. Half the second mass is 0.500 × "+gF(m2)+" kg = "+iF(hm2)+" kg and its speed squared is "+iF(v2sq)+" m^2/s^2, giving "+iF(hm2)+" kg × "+iF(v2sq)+" m^2/s^2 = "+F3(ke2)+" J. The kinetic energy before is "+F3(ke1)+" J + "+F3(ke2)+" J = "+F3(kei)+" J. Half the combined mass is 0.500 × "+gF(M)+" kg = "+iF(hmT)+" kg and the final speed squared is "+iF(vf)+" m/s × "+iF(vf)+" m/s = "+iF(vfsq)+" m^2/s^2, giving a final kinetic energy of "+iF(hmT)+" kg × "+iF(vfsq)+" m^2/s^2 = "+F3(kef)+" J. The kinetic energy lost is "+F3(kei)+" J - "+F3(kef)+" J = "+F3(lost)+" J. Because the carts stick together and kinetic energy is lost, the collision is inelastic: momentum is conserved, kinetic energy is not.",{m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u3-712-classify-mcq",3,["PH11.7.12"],3,"gen",function(){
  var kind=pick(["elastic","inelastic"]);
  if(kind==="elastic"){
    var m=sfR(rf(1,4),3),v1=sfR(rf(4,8),3),v2=sfR(rf(1,3),3);
    var hm=sfR(0.5*m,4),sumsq=sfR(v1*v1+v2*v2,4),ke=sfR(hm*sumsq,3);
    return mcq("Two carts of equal mass "+gF(m)+" kg collide on a level track. Before the collision one moves at "+gF(v1)+" m/s and the other at "+gF(v2)+" m/s in the same direction. After the collision the first moves at "+gF(v2)+" m/s and the second at "+gF(v1)+" m/s. How should the collision be classified?",
      "Elastic, because the kinetic energy is the same before and after, about "+F3(ke)+" J in both cases",
      ["Inelastic, because kinetic energy is lost in the collision",
       "Elastic, because momentum is not conserved in the collision",
       "Inelastic, because the carts stick together after the collision"],
      "Compute the kinetic energy both times. With equal masses and the speeds simply exchanged, the kinetic energy before is "+F3(ke)+" J and the kinetic energy after is also "+F3(ke)+" J. Kinetic energy is conserved, so the collision is elastic. Momentum is conserved in both kinds of collision, and the carts do not stick.",{m:m,v1:v1,v2:v2});
  }
  var m1=sfR(rf(2,5),3),v1=sfR(rf(4,8),3),m2=sfR(rf(3,6),3),v2=sfR(rf(1,3),3);
  var ptot=sfR(sfR(m1*v1,4)+sfR(m2*v2,4),4),M=sfR(m1+m2,3),vf=sfR(ptot/M,4);
  var kei=sfR(sfR(0.5*m1,4)*sfR(v1*v1,4)+sfR(0.5*m2,4)*sfR(v2*v2,4),3);
  var kef=sfR(sfR(0.5*M,4)*sfR(vf*vf,4),3);
  return mcq("A "+gF(m1)+" kg cart moving at "+gF(v1)+" m/s collides with a "+gF(m2)+" kg cart moving at "+gF(v2)+" m/s in the same direction, and the carts stick together and move off at "+gF(vf)+" m/s. How should the collision be classified?",
    "Inelastic, because the kinetic energy falls from about "+F3(kei)+" J before to about "+F3(kef)+" J after, while momentum is conserved",
    ["Elastic, because the kinetic energy is conserved in the collision",
     "Inelastic, because the kinetic energy increases in the collision",
     "Elastic, because momentum is not conserved in the collision"],
    "Compute the kinetic energy both times. Before the collision it is about "+F3(kei)+" J and after it is about "+F3(kef)+" J, so kinetic energy is not conserved and the collision is inelastic. Momentum is conserved in the collision, as it is in every collision with no outside impulse.",{m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u3-712-ke-lost",3,["PH11.7.12"],2,"gen",function(){
  var kei=sfR(rf(150,600),3),kef=sfR(kei*rf(0.3,0.7),3),lost=sfR(kei-kef,3);
  var q=numq("In a collision, the total kinetic energy of the objects is "+gF(kei)+" J before the collision and "+gF(kef)+" J after the collision. How much kinetic energy is lost in the collision? Give your answer in J.",lost,Math.max(0.02*Math.abs(lost),1e-9),
  "The kinetic energy lost is the drop in kinetic energy. "+gF(kei)+" J - "+gF(kef)+" J = "+F3(lost)+" J. The collision loses "+F3(lost)+" J of kinetic energy, so it is not elastic.",{kei:kei,kef:kef});
  q.figure=p22Bars([{t:"before",v:kei,vl:F3(kei)+" J"},{t:"after",v:kef,vl:F3(kef)+" J"}]);return q;
});

E("u3-712-which-law",3,["PH11.7.12"],1,"var",varset([
  function(){
    return mcq("Two skaters push apart from rest on smooth ice. Which conservation law is best used to find how their speeds compare?",
      "Conservation of momentum, because no outside impulse acts and their total momentum stays zero",
      ["Conservation of kinetic energy, because their kinetic energy stays the same",
       "Conservation of momentum, because their kinetic energy is lost as heat",
       "Neither law, because the skaters start from rest"],
      "The push is internal to the two-skater system, so total momentum is conserved and stays zero. Their kinetic energy increases as they push apart, so kinetic energy is not conserved here. Momentum is the law to use.",{});
  },
  function(){
    return mcq("Two carts collide and stick together. Which statement about the best way to solve for their final speed is correct?",
      "Use conservation of momentum only, because kinetic energy is not conserved when objects stick together",
      ["Use conservation of kinetic energy only, because it is always conserved",
       "Use both laws, because both are always conserved in collisions",
       "Use neither law, because a sticking collision conserves nothing"],
      "In a perfectly inelastic collision the objects stick and kinetic energy is lost, so the kinetic energy equation does not hold. Momentum is still conserved, so the final speed comes from momentum alone.",{});
  },
  function(){
    return mcq("Two steel balls collide and bounce apart, and a check shows their total kinetic energy is the same after the collision as before. Which laws can be used to solve this collision?",
      "Both conservation of momentum and conservation of kinetic energy",
      ["Conservation of momentum only",
       "Conservation of kinetic energy only",
       "Neither law, because the balls bounce"],
      "Equal kinetic energy before and after marks the collision as elastic. In an elastic collision both momentum and kinetic energy are conserved, so both laws are available to solve it.",{});
  },
  function(){
    return mcq("To decide whether a real collision is elastic or inelastic, what must be calculated?",
      "The total kinetic energy before the collision and the total kinetic energy after it",
      ["The total momentum before the collision only",
       "The mass of each object before and after",
       "The temperature of the objects after the collision"],
      "Momentum is conserved in both kinds of collision, so it cannot tell them apart. The test is kinetic energy: if it is conserved the collision is elastic, and if it drops the collision is inelastic.",{});
  }
]));


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-712-elastic-check, u3-712-best-method added to bring this pool to 6.
// LEVEL: 2 - Quantitative collision verification comparing total kinetic energy before and after impact against the momentum-conservation trap.
// VARIANTS: elastic collision (50%) vs inelastic collision (50%)
// LENGTHS: key=71, distractors=73,71,72
E("u3-712-elastic-check",3,["PH11.7.12"],2,"gen",function(){
  var isElastic=(Math.random()<0.5);
  var m1,m2,v1i,v2i=0,v1f,v2f,Eki,Ekf,tries=0;
  if(isElastic){
    var sameMass=(Math.random()<0.5);
    if(sameMass){
      m1=sfR(rf(0.5,5),3);
      m2=m1;
      v1i=sfR(rf(2,6),3);
      v1f=0;
      v2f=v1i;
    }else{
      var found=false;
      while(!found&&tries<100){
        tries++;
        var u1=ri(2,5),u2=ri(1,5);
        if(u1<=u2){continue;}
        var s1=ri(2,6);
        var candV1f=((u1-u2)/(u1+u2))*s1;
        var candV2f=((2*u1)/(u1+u2))*s1;
        if(Math.abs(candV1f-sfR(candV1f,3))<1e-9&&Math.abs(candV2f-sfR(candV2f,3))<1e-9&&candV1f>=0.5){
          m1=sfR(u1*0.5,3);
          m2=sfR(u2*0.5,3);
          v1i=sfR(s1,3);
          v1f=sfR(candV1f,3);
          v2f=sfR(candV2f,3);
          found=true;
        }
      }
      if(!found){
        m1=3.00;m2=1.00;v1i=4.00;v1f=2.00;v2f=6.00;
      }
    }
  }else{
    var okInel=false;
    while(!okInel&&tries<120){
      tries++;
      m1=sfR(rf(0.5,5),3);
      m2=sfR(rf(0.5,5),3);
      v1i=sfR(rf(3,8),3);
      v1f=sfR(v1i*rf(0.05,0.55),3);
      v2f=sfR(m1*(v1i-v1f)/m2,3);
      var keI=0.5*m1*v1i*v1i;
      var keF=0.5*m1*v1f*v1f+0.5*m2*v2f*v2f;
      if(v2f>=0.3&&v2f<=7&&keF<=0.85*keI&&keF>=0.1*keI){okInel=true;}
    }
    if(!okInel){m1=2.00;m2=2.00;v1i=6.00;v1f=1.00;v2f=5.00;}
  }
  Eki=sfR(0.5*m1*v1i*v1i+0.5*m2*v2i*v2i,4);
  Ekf=sfR(0.5*m1*v1f*v1f+0.5*m2*v2f*v2f,4);
  var e1Str=F3(Eki),e2Str=F3(Ekf);
  var key,d1,d2,d3;
  if(isElastic){
    key="The collision is elastic: total kinetic energy stays at "+e1Str+" J before and "+e2Str+" J after";
    d1="The collision is inelastic: total kinetic energy stays at "+e1Str+" J before and "+e2Str+" J after";
    d2="The collision is elastic: total kinetic energy drops from "+e1Str+" J to "+sfR(Eki*0.5,3)+" J after";
    d3="The collision is inelastic because the two carts bounce apart after impact";
  }else{
    key="The collision is inelastic: total kinetic energy drops from "+e1Str+" J to "+e2Str+" J";
    d1="The collision is elastic: total kinetic energy drops from "+e1Str+" J to "+e2Str+" J";
    d2="The collision is inelastic: total kinetic energy rises from "+e2Str+" J to "+e1Str+" J";
    d3="The collision is elastic because total momentum is conserved during impact";
  }
  var v1fDesc=v1f===0?"comes to rest":("moves at "+gF(v1f)+" m/s");
  return mcq("On a level frictionless track, Cart 1 ("+gF(m1)+" kg) moving at "+gF(v1i)+" m/s strikes stationary Cart 2 ("+gF(m2)+" kg). After the collision, Cart 1 "+v1fDesc+" and Cart 2 moves at "+gF(v2f)+" m/s. Based on kinetic energy, is this collision elastic or inelastic?",
    key,[d1,d2,d3],
    "Compute the total kinetic energy before the collision: Ek_i = 0.5 \u00d7 "+gF(m1)+" kg \u00d7 ("+gF(v1i)+" m/s)^2 + 0 J = "+iF(Eki)+" J ("+e1Str+" J). Compute the total kinetic energy after the collision: Ek_f = 0.5 \u00d7 "+gF(m1)+" kg \u00d7 ("+gF(v1f)+" m/s)^2 + 0.5 \u00d7 "+gF(m2)+" kg \u00d7 ("+gF(v2f)+" m/s)^2 = "+iF(Ekf)+" J ("+e2Str+" J). "+key+".",
    {isElastic:isElastic,m1:m1,m2:m2,v1i:v1i,v2i:v2i,v1f:v1f,v2f:v2f,Eki:sfR(Eki,3),Ekf:sfR(Ekf,3)});
});

// LEVEL: 3 - Analysis of multi-stage collision-and-motion problems to assign the valid conservation law to each stage.
// VARIANTS: three two-stage scenarios (hit-and-stick then rough slide; explosion then vertical rise; elastic bounce then ramp climb) at equal mix
// LENGTHS: key=71, distractors=71,69,68
E("u3-712-best-method",3,["PH11.7.12"],3,"var",varset([
  function(){
    var key="Stage 1: conservation of momentum; Stage 2: work-energy with friction";
    var ds=[
      "Stage 1: work-energy with friction; Stage 2: conservation of momentum",
      "Stage 1: conservation of kinetic energy; Stage 2: conservation of momentum",
      "Stage 1: conservation of mechanical energy; Stage 2: mechanical energy only"
    ];
    return mcq("A moving puck strikes and sticks to a stationary puck on a rough ice surface (Stage 1), and the combined pair then slides to a stop against kinetic friction (Stage 2). Which laws are best used to find the stopping distance?",
      key,ds,
      "During Stage 1 (the inelastic hit-and-stick impact), kinetic energy is lost to deformation and heat, so only conservation of momentum applies to find the speed right after impact. During Stage 2 (the rough slide), an external friction force acts over a distance, so conservation of energy with heat (or the work-energy theorem with friction) gives the stopping distance. "+key+".",
      {scenario:"stick_then_slide"});
  },
  function(){
    var key="Stage 1: conservation of momentum; Stage 2: mechanical energy conservation";
    var ds=[
      "Stage 1: mechanical energy conservation; Stage 2: conservation of momentum",
      "Stage 1: conservation of kinetic energy; Stage 2: conservation of momentum",
      "Stage 1: mechanical energy conservation; Stage 2: mechanical energy conservation"
    ];
    return mcq("A stationary firecracker explodes into two unequal fragments (Stage 1), and one fragment shoots straight upward to a maximum height with air resistance neglected (Stage 2). Which laws are best used to find that maximum height?",
      key,ds,
      "During Stage 1 (the explosion), chemical potential energy converts into kinetic energy so mechanical energy is not conserved, whereas internal forces cancel and momentum is conserved to link the fragment speeds. During Stage 2 (the frictionless vertical rise), only gravity acts, so conservation of mechanical energy converts kinetic energy into gravitational potential energy. "+key+".",
      {scenario:"explosion_then_rise"});
  },
  function(){
    var key="Stage 1: mechanical energy conservation; Stage 2: momentum and kinetic energy";
    var ds=[
      "Stage 1: momentum and kinetic energy; Stage 2: mechanical energy conservation",
      "Stage 1: conservation of momentum; Stage 2: conservation of momentum only",
      "Stage 1: mechanical energy conservation; Stage 2: kinetic energy conservation only"
    ];
    return mcq("Two carts undergo a head-on elastic collision on a frictionless track, and after the bounce one cart climbs a smooth ramp to a known maximum height. Working backwards from that height (Stage 1) to the collision itself (Stage 2), which laws are best used to find the carts' speeds before impact?",
      key,ds,
      "In Stage 1 (working back down the frictionless ramp), conservation of mechanical energy finds the cart's speed just after the collision from its maximum height. In Stage 2 (the elastic collision), both momentum and kinetic energy are conserved, giving two equations to solve for the pre-collision speeds. "+key+".",
      {scenario:"ramp_back_to_elastic"});
  }
]));
/* ---------- 7.13 Radioactive decay ---------- */

E("u3-713-alpha-properties",3,["PH11.7.13"],1,"var",varset([
  function(){
    return mcq("An alpha particle is best described as",
      "A helium nucleus, made of two protons and two neutrons",
      ["A high-energy electron from the nucleus",
       "A packet of electromagnetic radiation",
       "A single proton"],
      "An alpha particle is the nucleus of a helium atom: two protons and two neutrons, with a charge of +2 and a mass number of 4.",{});
  },
  function(){
    return mcq("What is the charge of an alpha particle?",
      "+2, because it contains two protons and no electrons",
      ["-1, because it is emitted from the nucleus",
       "0, because it is a form of radiation",
       "+1, because it contains one proton"],
      "An alpha particle has two protons and no electrons, so its net charge is +2. Beta minus particles carry -1 and gamma rays carry no charge.",{});
  },
  function(){
    return mcq("Which radiation is stopped by a sheet of paper or the outer layer of skin?",
      "Alpha radiation",
      ["Beta radiation","Gamma radiation","All three radiations equally"],
      "Alpha particles are large and slow down quickly, so paper or skin stops them. Beta particles need a few millimetres of aluminium, and gamma rays need dense material such as lead to reduce them.",{});
  },
  function(){
    return mcq("Which radiation is the most strongly ionizing?",
      "Alpha radiation, because it is large, carries a +2 charge and interacts strongly with atoms",
      ["Gamma radiation, because it travels the farthest",
       "Beta radiation, because it is an electron",
       "All three are equally ionizing"],
      "Ionizing power and penetrating power run in opposite directions here. Alpha particles interact strongly and ionize heavily over a short range, while gamma rays ionize weakly but penetrate far.",{});
  },
  function(){
    return mcq("What is the mass number of an alpha particle?",
      "4, from its two protons and two neutrons",
      ["2, from its two protons only",
       "0, because it is radiation",
       "1, like a hydrogen nucleus"],
      "Mass number counts protons plus neutrons. An alpha particle has two of each, so its mass number is 4. A hydrogen nucleus, a single proton, has mass number 1.",{});
  }
]));

E("u3-713-beta-gamma",3,["PH11.7.13"],1,"var",varset([
  function(){
    return mcq("A beta minus particle is best described as",
      "A high-energy electron emitted from the nucleus when a neutron changes into a proton",
      ["A helium nucleus emitted from the nucleus",
       "A packet of electromagnetic radiation",
       "An electron knocked out of an electron cloud by a photon"],
      "In beta minus decay a neutron in the nucleus changes into a proton and an electron, and the electron is emitted as the beta particle. The atomic number rises by 1 and the mass number stays the same.",{});
  },
  function(){
    return mcq("Gamma radiation is best described as",
      "Electromagnetic radiation with no charge and no mass, emitted from an excited nucleus",
      ["A fast electron with a charge of -1",
       "A helium nucleus with a charge of +2",
       "A stream of neutrons"],
      "Gamma rays are high-energy electromagnetic radiation. They carry no charge and no mass, so emitting a gamma ray does not change the mass number or the atomic number of the nucleus.",{});
  },
  function(){
    return mcq("Which radiation is the most penetrating?",
      "Gamma radiation, which needs thick lead or concrete to reduce it",
      ["Alpha radiation, which is stopped by paper",
       "Beta radiation, which is stopped by a few millimetres of aluminium",
       "All three are equally penetrating"],
      "Penetrating power is the reverse of ionizing power. Alpha is stopped by paper, beta by a few millimetres of aluminium, and gamma only reduced by dense shielding such as lead.",{});
  },
  function(){
    return mcq("What is the charge of a beta minus particle?",
      "-1, because it is an electron",
      ["+2, because it comes from the nucleus",
       "0, because it has almost no mass",
       "+1, because a proton is created with it"],
      "A beta minus particle is an electron, so it carries a charge of -1. The proton created at the same time stays in the nucleus, which is why the atomic number rises by 1.",{});
  },
  function(){
    return mcq("A nucleus emits a gamma ray. What happens to its mass number and atomic number?",
      "Neither changes, because a gamma ray carries away only energy",
      ["The mass number falls by 4 and the atomic number falls by 2",
       "The mass number stays the same and the atomic number rises by 1",
       "The mass number falls by 1 and the atomic number stays the same"],
      "Gamma emission changes only the energy of the nucleus. With no particles leaving, the mass number and atomic number are unchanged, unlike alpha decay (mass number -4, atomic number -2) or beta minus decay (atomic number +1).",{});
  }
]));

E("u3-713-nuclear-notation",3,["PH11.7.13"],1,"gen",function(){
  var nuc=pick([["carbon",6,12],["carbon",6,14],["oxygen",8,16],["oxygen",8,18],["calcium",20,40],["calcium",20,44],["iron",26,56],["iron",26,54],["zinc",30,64],["lead",82,208],["lead",82,206],["uranium",92,238],["uranium",92,235],["sodium",11,23],["aluminium",13,27],["gold",79,197],["nitrogen",7,14],["chlorine",17,35],["copper",29,63],["silver",47,107],["tin",50,118],["barium",56,138],["potassium",19,39],["helium",2,4]]);
  var ask=pick(["neutrons","protons","electrons"]);
  var name=nuc[0],Z=nuc[1],A=nuc[2];
  if(ask==="neutrons"){
    var n=A-Z;
    return numq("An atom of "+name+"-"+A+" has a mass number of "+A+" and an atomic number of "+Z+". How many neutrons does its nucleus contain? Give your answer as a whole number.",n,0.4,
    "The mass number counts protons plus neutrons, so the neutron count is the mass number minus the atomic number. "+A+" - "+Z+" = "+n+". The nucleus contains "+n+" neutrons.",{A:A,Z:Z,ask:ask});
  }
  if(ask==="protons"){
    return numq("An atom of "+name+"-"+A+" has a mass number of "+A+" and an atomic number of "+Z+". How many protons does its nucleus contain? Give your answer as a whole number.",Z,0.4,
    "The atomic number is the number of protons, by definition. The atomic number is "+Z+", so the nucleus contains "+Z+" protons.",{A:A,Z:Z,ask:ask});
  }
  return numq("A neutral atom of "+name+"-"+A+" has a mass number of "+A+" and an atomic number of "+Z+". How many electrons does the neutral atom have? Give your answer as a whole number.",Z,0.4,
  "A neutral atom has equal numbers of protons and electrons, so that the charges balance. The atomic number gives "+Z+" protons, so the neutral atom has "+Z+" electrons.",{A:A,Z:Z,ask:ask});
});

E("u3-713-alpha-decay",3,["PH11.7.13"],2,"gen",function(){
  var par=pick([["uranium",238,92,"thorium"],["uranium",235,92,"thorium"],["radium",226,88,"radon"],["polonium",210,84,"lead"],["radon",222,86,"polonium"],["thorium",232,90,"radium"],["americium",241,95,"neptunium"],["plutonium",239,94,"uranium"]]);
  var pn=par[0],A=par[1],Z=par[2],dn=par[3];
  var dname=dn.charAt(0).toUpperCase()+dn.slice(1),pname=pn.charAt(0).toUpperCase()+pn.slice(1);
  var ctx=pick(["found in a rock sample","found in a reactor fuel rod","used in a smoke detector source","held in a medical research sample","found in a geological survey sample","found in a museum mineral specimen","used in a power station fuel pellet","held in a laboratory sample"]);
  return mcq(pname+"-"+A+" (atomic number "+Z+"), "+ctx+", undergoes alpha decay. What is the daughter nucleus?",
    dname+"-"+(A-4),
    [dname+"-"+A,dname+"-"+(A-6),pname+"-"+(A-4)],
    "In alpha decay the nucleus loses an alpha particle with mass number 4 and atomic number 2, so the mass number falls by 4 and the atomic number falls by 2. The check on mass numbers is "+(A-4)+" + 4 = "+A+", and on atomic numbers is "+(Z-2)+" + 2 = "+Z+". Atomic number "+(Z-2)+" is "+dn+", so the daughter is "+dname+"-"+(A-4)+".",{pn:pn,A:A,Z:Z});
});

E("u3-713-beta-decay",3,["PH11.7.13"],2,"gen",function(){
  var par=pick([["carbon",14,6,"nitrogen","boron"],["strontium",90,38,"yttrium","rubidium"],["cobalt",60,27,"nickel","iron"],["iodine",131,53,"xenon","tellurium"],["phosphorus",32,15,"sulfur","silicon"],["sodium",24,11,"magnesium","neon"],["caesium",137,55,"barium","iodine"]]);
  var pn=par[0],A=par[1],Z=par[2],dn=par[3],mn=par[4];
  var dname=dn.charAt(0).toUpperCase()+dn.slice(1),pname=pn.charAt(0).toUpperCase()+pn.slice(1),mname=mn.charAt(0).toUpperCase()+mn.slice(1);
  var ctx=pick(["used as a hospital tracer","found in fallout monitoring samples","used in a cancer treatment unit","held in a laboratory sample","used in an industrial gauge","found in a dated archaeological sample","used in a research reactor sample","held in a calibration source"]);
  return mcq(pname+"-"+A+" (atomic number "+Z+"), "+ctx+", undergoes beta minus decay. What is the daughter nucleus?",
    dname+"-"+A,
    [mname+"-"+A,dname+"-"+(A-1),pname+"-"+A],
    "In beta minus decay a neutron changes into a proton and an electron, and the electron is emitted. The mass number stays the same and the atomic number rises by 1, from "+Z+" to "+(Z+1)+". Atomic number "+(Z+1)+" is "+dn+", so the daughter is "+dname+"-"+A+".",{pn:pn,A:A,Z:Z});
});

E("u3-713-radiation-match",3,["PH11.7.13"],2,"var",varset([
  function(){
    return mcq("A mixed source emits alpha, beta and gamma radiation. Which radiation passes through a sheet of paper but is stopped by a few millimetres of aluminium?",
      "Beta radiation",
      ["Alpha radiation",
       "Gamma radiation",
       "All three pass through paper and are stopped by aluminium"],
      "Each radiation has its shielding material. Paper stops alpha, so alpha never reaches the aluminium. A few millimetres of aluminium stops beta. Gamma passes through both paper and aluminium and needs lead or concrete to reduce it. So the radiation described is beta radiation.",{});
  },
  function(){
    return mcq("A worker handles a sealed alpha source with thin gloves. Why is the alpha radiation a low external hazard in this case?",
      "Alpha particles are stopped by the gloves and the outer layer of skin, so they do not reach living tissue",
      ["Alpha particles have no charge, so they cannot damage tissue",
       "Alpha sources give off no radiation until they are heated",
       "Alpha particles pass straight through the body without interacting"],
      "Alpha particles are strongly ionizing but have a very short range. Stopped by gloves and dead surface skin, they do not reach living tissue from outside the body, though an alpha emitter inside the body is a serious hazard.",{});
  },
  function(){
    return mcq("Which radiation would a Geiger counter detect most easily through the wall of a sealed metal container?",
      "Gamma radiation, because it is penetrating enough to pass through the container wall",
      ["Alpha radiation, because it is the most ionizing",
       "Beta radiation, because electrons pass through metal easily",
       "None, because sealed containers block all radiation"],
      "Alpha is stopped by paper and beta by a few millimetres of aluminium, so neither crosses a metal container wall well. Gamma rays are far more penetrating and can be detected through the wall.",{});
  },
  function(){
    return mcq("Beta radiation is directed at a target. Which change happens in the emitting nucleus during beta minus decay?",
      "A neutron changes into a proton, so the atomic number rises by 1 and the mass number is unchanged",
      ["Two protons and two neutrons leave, so the mass number falls by 4",
       "Energy leaves only, so neither number changes",
       "A proton changes into a neutron, so the atomic number falls by 1"],
      "Beta minus decay converts a neutron into a proton plus the emitted electron. The nucleon count, the mass number, is unchanged, and the extra proton raises the atomic number by 1.",{});
  }
]));

/* ---------- 7.14 Sources and half-life ---------- */

E("u3-714-sources",3,["PH11.7.14"],1,"var",varset([
  function(){
    return mcq("Which of these is a natural source of radioactivity?",
      "Radon gas seeping from rocks and soil into basements",
      ["A hospital CT scanner",
       "A nuclear generating station",
       "An americium smoke detector"],
      "Radon comes from the decay of uranium in rocks and soil, so it is part of the natural background. Scanners, generating stations and smoke detectors are constructed sources made by people.",{});
  },
  function(){
    return mcq("Which of these is a constructed source of radioactivity?",
      "A medical radioisotope used in a hospital scan",
      ["Cosmic rays arriving from space",
       "Potassium-40 in food and in the human body",
       "Uranium naturally present in granite"],
      "A medical radioisotope is produced and used by people, so it is a constructed source. Cosmic rays, potassium-40 and uranium in rock are natural background sources.",{});
  },
  function(){
    return mcq("Most of the natural background radiation dose received by people in Newfoundland and Labrador comes from",
      "Radon gas from the ground, along with cosmic rays and natural material in food and rock",
      ["Medical X-rays taken at clinics",
       "Fallout from power stations in other provinces",
       "Household smoke detectors"],
      "Natural background comes from the environment itself: radon from rocks and soil is usually the largest share, with cosmic rays and naturally radioactive material in food, water and rock making up the rest. Medical and household sources are constructed and usually smaller.",{});
  },
  function(){
    return mcq("Cosmic rays are classified as which kind of source of radioactivity?",
      "A natural source, because they arrive from space without any human involvement",
      ["A constructed source, because they are detected by instruments",
       "A natural source only when the Sun is active",
       "A constructed source, because satellites produce them"],
      "Cosmic rays are high-energy particles from space that have always reached Earth. They are part of the natural background, not something people built.",{});
  }
]));

E("u3-714-half-life-remaining",3,["PH11.7.14"],2,"gen",function(){
  var init=sfR(rf(10,100),3),n=ri(1,5),div=Math.pow(2,n),rem=sfR(init/div,3);
  var iso=pick(["a radioactive sample","a sample of a medical isotope","a sample of a radioactive tracer","a rock sample containing a radioactive isotope"]);
  return numq("After "+n+" half-lives, how much of "+iso+" that started at "+gF(init)+" g remains undecayed? Give your answer in g.",rem,Math.max(0.02*Math.abs(rem),1e-9),
  "Each half-life halves the amount remaining. After "+n+" half-lives the sample has been halved "+n+" times, a factor of "+div+". "+gF(init)+" g / "+div+" = "+F3(rem)+" g. The amount remaining is "+F3(rem)+" g. The count of half-lives is an exact number, so it carries no rounding of its own.",{init:init,n:n});
});

E("u3-714-half-life-graph",3,["PH11.7.14"],2,"gen",function(){
  var T=pick([2,3,4,5,6,8,10]),unit=pick(["days","years","hours"]),M0=pick([40,80,100,160,200]);
  var q=mcq("A decay graph for a radioactive sample starts at "+M0+" g. Reading the graph, the mass has fallen to "+(M0/2)+" g after "+T+" "+unit+", and to "+(M0/4)+" g after "+(2*T)+" "+unit+". What is the half-life of the sample?",
    T+" "+unit,
    [(T/2)+" "+unit,(2*T)+" "+unit,(4*T)+" "+unit],
    "The half-life is the time for the mass to fall to half its value. The graph shows the mass falling from "+M0+" g to "+(M0/2)+" g in "+T+" "+unit+", and halving again over the next "+T+" "+unit+". The half-life is "+T+" "+unit+".",{T:T,unit:unit,M0:M0});
    q.figure=p22Decay(M0,T,unit);return q;
});

E("u3-714-number-half-lives",3,["PH11.7.14"],1,"gen",function(){
  var n=ri(1,5),fin=pick([2,3,4,5,6,8,10,12,15,20,25,30]),init=fin*Math.pow(2,n);
  return numq("A radioactive sample decays from "+init+" g to "+fin+" g. How many half-lives have passed? Give your answer as a whole number.",n,0.4,
  "Count the halvings. Each half-life cuts the mass in half, and going from "+init+" g down to "+fin+" g takes exactly "+n+" halvings. The number of half-lives is "+n+", an exact count.",{n:n,init:init,fin:fin});
});

E("u3-714-elapsed-time",3,["PH11.7.14"],2,"gen",function(){
  var T=pick([5,8,10,20]),unit=pick(["days","years"]),n=ri(1,4),fin=pick([5,10,20]),init=fin*Math.pow(2,n),elapsed=n*T;
  return numq("The half-life of a radioactive isotope is "+T+" "+unit+". A sample of it decays from "+init+" g to "+fin+" g. How much time has elapsed? Give your answer in "+unit+".",elapsed,0.4,
  "First count the half-lives: going from "+init+" g down to "+fin+" g is "+n+" halvings. Each half-life lasts "+T+" "+unit+", so the elapsed time is "+n+" half-lives at "+T+" "+unit+" each, which is "+elapsed+" "+unit+". Both counts here are exact.",{T:T,n:n,unit:unit});
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-714-initial-amount added to bring this pool to 6.
// LEVEL: 2 - Multi-step inverse half-life calculation counting elapsed half-lives and doubling backward to find the initial sample mass.
// LENGTHS: key=4
E("u3-714-initial-amount",3,["PH11.7.14"],2,"gen",function(){
  var ctx=pick(["medical","dating","waste"]);
  var tUnit=ctx==="medical"?"hours":(ctx==="dating"?"years":"days");
  var mUnit=ctx==="medical"?"mg":"g";
  var halfLife=sfR(rf(2,30),3);
  var n=ri(1,6);
  var tElapsed=sfR(halfLife*n,3);
  var rem=sfR(rf(0.1,500),3);
  var initAmt=sfR(rem*Math.pow(2,n),3);
  var steps=[];
  var cur=rem;
  for(var i=1;i<=n;i++){
    cur=sfR(cur*2,4);
    steps.push("after "+i+" doubling"+(i>1?"s":"")+": "+iF(cur)+" "+mUnit);
  }
  var stem=ctx==="medical"?("A hospital technologist measures "+gF(rem)+" "+mUnit+" of a medical radioisotope remaining "+gF(tElapsed)+" "+tUnit+" after preparation."):(ctx==="dating"?("A laboratory sample contains "+gF(rem)+" "+mUnit+" of a radioactive isotope after "+gF(tElapsed)+" "+tUnit+" of decay."):("A storage container holds "+gF(rem)+" "+mUnit+" of a radioactive isotope after "+gF(tElapsed)+" "+tUnit+"."));
  return numq(stem+" If the isotope's half-life is "+gF(halfLife)+" "+tUnit+", how much of the isotope was present initially? Give your answer in "+mUnit+".",
    initAmt,Math.max(0.02*Math.abs(initAmt),1e-9),
    "First find the number of half-lives elapsed: n = "+gF(tElapsed)+" "+tUnit+" / "+gF(halfLife)+" "+tUnit+" = "+n+" half-lives. Working backward from the remaining "+gF(rem)+" "+mUnit+", double the amount "+n+" time"+(n>1?"s":"")+" ("+steps.join("; ")+"), which gives N_0 = "+gF(rem)+" "+mUnit+" × 2^"+n+" = "+F3(initAmt)+" "+mUnit+". The initial amount of the isotope was "+F3(initAmt)+" "+mUnit+".",
    {halfLife:halfLife,n:n,rem:rem,tUnit:tUnit,mUnit:mUnit});
});
/* ---------- 7.15 Mass-energy equivalence ---------- */

E("u3-715-mass-energy",3,["PH11.7.15"],2,"gen",function(){
  var coeff=sfR(rf(1,9),3),m=coeff*1e-6,E=sfR(m*9.00e16,3);
  var ctx=pick(["A nuclear reaction","A fission event in a reactor core","A fusion event in a star","An annihilation event"]);
  return numq(ctx+" converts "+F3(coeff)+" × 10⁻⁶ kg of mass into energy. Using E = m c^2 with c = 3.00 × 10⁸ m/s, how much energy is released? Give your answer in J.",E,Math.max(0.02*Math.abs(E),1e-9),
  "Use Einstein's relation E = m c^2. The speed of light squared is 9.00 × 10¹⁶ m^2/s^2. Multiplying the mass, "+F3(coeff)+" × 10⁻⁶ kg, by that value gives the energy in joules. The energy released is "+F3(E)+" J. A very small mass converts into a very large amount of energy.",{coeff:coeff});
});

E("u3-715-energy-to-mass",3,["PH11.7.15"],2,"gen",function(){
  var coeff=sfR(rf(1,9),3),m0=coeff*1e-6,E=sfR(m0*9.00e16,3),m=sfR(m0,3);
  return numq("A process releases "+F3(E)+" J of energy. Using E = m c^2 with c = 3.00 × 10⁸ m/s, what mass was converted into energy? Give your answer in kg.",m,Math.max(0.02*Math.abs(m),1e-9),
  "Rearrange Einstein's relation: m = E / c^2. The speed of light squared is 9.00 × 10¹⁶ m^2/s^2. Dividing the energy, "+F3(E)+" J, by that value gives the mass in kilograms. The mass converted is "+F3(m)+" kg.",{coeff:coeff});
});

E("u3-715-mass-change-mcq",3,["PH11.7.15"],2,"gen",function(){
  var coeff=sfR(rf(1,9),3),m=coeff*1e-6,E=sfR(m*9.00e16,3);
  return mcq("A reaction releases "+F3(E)+" J of energy. Using E = m c^2 with c = 3.00 × 10⁸ m/s, what is the loss of mass in the reaction?",
    F3(m)+" kg",
    [F3(m*10)+" kg",F3(m/10)+" kg",F3(E/(3.00e8))+" kg"],
    "Rearrange Einstein's relation: m = E / c^2. Dividing the energy by the speed of light squared, 9.00 × 10¹⁶ m^2/s^2, gives a mass loss of "+F3(m)+" kg. Note the divisor is c squared, not c.",{coeff:coeff});
});

E("u3-715-claim-judge",3,["PH11.7.15"],3,"gen",function(){
  var coeff=sfR(rf(1,5),3),E=sfR(coeff*1e-6*9.00e16,3),casePick=pick(["correct","low","high"]);
  var claimStr="",correct="",distr=[];
  if(casePick==="correct"){
    claimStr=F3(E)+" J";
    correct="The claim is correct: E = m c^2 gives "+F3(E)+" J, matching the claim";
    distr=["The claim is too high: the correct value is "+F3(E/1000)+" J","The claim is too low: the correct value is "+F3(E*1000)+" J","The claim is wrong because mass can never be converted into energy"];
  }else if(casePick==="low"){
    claimStr=F3(E/1000)+" J";
    correct="The claim is too low: E = m c^2 gives "+F3(E)+" J, which is 1000 times the claimed value";
    distr=["The claim is correct: E = m c^2 gives "+F3(E/1000)+" J, matching the claim","The claim is too high: the correct value is "+F3(E/1000000)+" J","The claim is wrong because mass can never be converted into energy"];
  }else{
    claimStr=F3(E*1000)+" J";
    correct="The claim is too high: E = m c^2 gives "+F3(E)+" J, which is one thousandth of the claimed value";
    distr=["The claim is correct: E = m c^2 gives "+F3(E*1000)+" J, matching the claim","The claim is too low: the correct value is "+F3(E*1000000)+" J","The claim is wrong because mass can never be converted into energy"];
  }
  return mcq("A student claims that converting "+F3(coeff)+" × 10⁻⁶ kg of mass into energy, with c = 3.00 × 10⁸ m/s, would release "+claimStr+". Which judgement of the claim is correct?",
    correct,distr,
    "Check the claim with E = m c^2. The speed of light squared is 9.00 × 10¹⁶ m^2/s^2, and multiplying the mass, "+F3(coeff)+" × 10⁻⁶ kg, by that value gives "+F3(E)+" J. Comparing that with the claimed "+claimStr+" settles the judgement: "+correct+".",{coeff:coeff,casePick:casePick});
});


// Bank Strengthening Programme pass 7 (November 19, 2026): u3-715-defect-energy-cr, u3-715-sun-rate added to bring this pool to 6.
// LEVEL: 2 - Two-step mass-energy calculation subtracting product mass from reactant mass to obtain mass defect before applying E = mc^2.
// LENGTHS: key=11
E("u3-715-defect-energy-cr",3,["PH11.7.15"],2,"gen",function(){
  var kind=pick(["fission","fusion"]);
  var mProd=sfR(rf(3,9)*1e-25,3);
  var dm=sfR(rf(0.5,5)*1e-27,3);
  var mReact=sfR(mProd+dm,4);
  dm=sfR(mReact-mProd,3);
  var c=3.00e8;
  var E=sfR(dm*c*c,3);
  var sci=function(x){var e=Math.floor(Math.log10(Math.abs(x)));return F3(x/Math.pow(10,e))+" × 10"+sfSup(e);};
  var desc=kind==="fission"?"In a single nuclear fission reaction":"In a single nuclear fusion reaction";
  return numq(desc+", the total mass of the reactants is "+sci(mReact)+" kg and the total mass of the products is "+sci(mProd)+" kg. How much energy is released by this reaction? Give your answer in J.",
    E,Math.max(0.02*Math.abs(E),1e-9),
    "First find the mass defect by subtracting the product mass from the reactant mass: Δm = "+sci(mReact)+" kg - "+sci(mProd)+" kg = "+sci(dm)+" kg. Next apply mass-energy equivalence using c = 3.00 × 10^8 m/s: E = Δm c^2 = "+sci(dm)+" kg × (3.00 × 10^8 m/s)^2 = "+sci(E)+" J. The energy released by the reaction is "+sci(E)+" J.",
    {mReact:mReact,mProd:mProd,dm:dm});
});
// LEVEL: 3 - Multi-step transfer chaining radiated power over converted time intervals into mass-energy equivalence for a star.
// LENGTHS: key=11
E("u3-715-sun-rate",3,["PH11.7.15"],3,"gen",function(){
  var isSun=(Math.random()<0.5);
  var P=isSun?3.85e26:sfR(rf(1,500)*1e24,3);
  var tUnit=pick(["hours","days"]);
  var tCount=ri(1,30);
  var secPerUnit=tUnit==="hours"?3600:86400;
  var tSec=sfR(tCount*secPerUnit,4);
  var E=sfR(P*tSec,4);
  var c=3.00e8;
  var m=sfR(E/(c*c),3);
  var subject=isSun?("The Sun radiates energy at a power of "+gF(P)+" W."):("A distant star radiates energy at a steady power of "+gF(P)+" W.");
  return numq(subject+" How much mass does the star convert into energy over "+tCount+" "+tUnit+"? Give your answer in kg.",
    m,Math.max(0.02*Math.abs(m),1e-9),
    "First convert the time into seconds: Δt = "+tCount+" "+tUnit+" × "+secPerUnit+" s/"+(tUnit==="hours"?"hour":"day")+" = "+iF(tSec)+" s. Next find the total energy radiated: E = P × Δt = "+gF(P)+" W × "+iF(tSec)+" s = "+iF(E)+" J. Finally use E = m c^2 with c = 3.00 × 10^8 m/s to find the mass converted: m = "+iF(E)+" J / (3.00 × 10^8 m/s)^2 = "+F3(m)+" kg. The mass converted into energy is "+F3(m)+" kg.",
    {P:P,tCount:tCount,tUnit:tUnit});
});
/* ---------- 7.16 Fission and fusion ---------- */

E("u3-716-fission",3,["PH11.7.16"],1,"var",varset([
  function(){
    return mcq("Nuclear fission is best defined as",
      "The splitting of a heavy nucleus into two lighter nuclei, with neutrons and energy released",
      ["The joining of two light nuclei into a heavier nucleus",
       "The emission of an alpha particle by a nucleus",
       "The splitting of an atom's electron cloud into ions"],
      "Fission splits a heavy nucleus, such as uranium-235, into two lighter nuclei. Neutrons are also released, and energy is released because some mass is converted into energy.",{});
  },
  function(){
    return mcq("A uranium-235 nucleus absorbs a neutron and splits into two lighter nuclei, releasing two or three more neutrons and a large amount of energy. This process is",
      "Fission, because a heavy nucleus has split into lighter nuclei",
      ["Fusion, because a heavy nucleus has formed",
       "Alpha decay, because particles have left the nucleus",
       "Beta decay, because the atomic number has changed"],
      "The defining feature is the splitting of a heavy nucleus into lighter ones, which is fission. The released neutrons can go on to split further nuclei, giving a chain reaction.",{});
  },
  function(){
    return mcq("Which of these is a product of a typical fission of uranium-235?",
      "Two lighter nuclei and two or three neutrons",
      ["One heavier nucleus and a helium nucleus",
       "A single neutron and a gamma ray only",
       "Two hydrogen nuclei"],
      "A fission event produces two medium-mass nuclei, called fission fragments, plus two or three neutrons and energy. Forming one heavier nucleus would be fusion, the opposite pattern.",{});
  },
  function(){
    return mcq("The energy released in fission comes from",
      "A small loss of mass, converted into energy according to E = m c^2",
      ["The neutrons, which carry energy into the reaction from outside",
       "The chemical burning of the uranium fuel",
       "The electrons of the uranium atoms"],
      "The total mass of the fission products is slightly less than the mass of the original nucleus and neutron. The missing mass appears as energy, as E = m c^2 describes.",{});
  }
]));

E("u3-716-fusion",3,["PH11.7.16"],2,"var",varset([
  function(){
    return mcq("In the Sun, hydrogen nuclei are forced together at very high temperature to form helium, releasing energy. This process is",
      "Fusion, because light nuclei join to form a heavier nucleus",
      ["Fission, because energy is released",
       "Beta decay, because the nuclei are hydrogen",
       "Fission, because the temperature is high"],
      "Fusion joins light nuclei into a heavier one. The Sun runs on fusion of hydrogen into helium, and the energy released comes from a small loss of mass. Fission is the opposite pattern, splitting heavy nuclei.",{});
  },
  function(){
    return mcq("Which conditions are needed for nuclear fusion to take place?",
      "Extremely high temperature and pressure, so light nuclei can overcome their repulsion and join",
      ["Very low temperature, so the nuclei move slowly enough to join",
       "A supply of free neutrons to split the nuclei",
       "Ordinary room temperature with a chemical catalyst"],
      "Nuclei are positively charged and repel each other. Fusion needs temperatures high enough that light nuclei approach fast enough to join despite that repulsion, which is why fusion happens in stars and is hard to sustain on Earth.",{});
  },
  function(){
    return mcq("A proposed power plant would join deuterium and tritium nuclei to form helium and a neutron, releasing energy. The core process is",
      "Fusion, because two light nuclei join into a heavier nucleus",
      ["Fission, because a neutron is produced",
       "Alpha decay, because a helium nucleus is formed",
       "Beta decay, because the fuel is hydrogen"],
      "The classification follows what happens to the nuclei: light nuclei joining into a heavier nucleus is fusion. A neutron among the products does not make it fission; fission is defined by a heavy nucleus splitting.",{});
  },
  function(){
    return mcq("Why is fusion, unlike fission, not used in today's commercial nuclear power stations?",
      "Sustaining the extreme temperature and pressure needed to keep light nuclei fusing has not yet been made practical for steady power production",
      ["Fusion releases no energy, so it cannot generate power",
       "Fusion fuels are rarer than uranium",
       "Fusion produces no neutrons, so turbines cannot be driven"],
      "Fusion does release energy, and its fuels are abundant. The barrier is engineering: holding a fuel at star-like temperatures long enough for steady, net power production is still a research problem, while fission chain reactions are straightforward to sustain.",{});
  }
]));

E("u3-716-compare",3,["PH11.7.16"],2,"var",varset([
  function(){
    return mcq("Which comparison of fission and fusion is correct?",
      "Fission splits heavy nuclei and fusion joins light nuclei, and both release energy from a loss of mass",
      ["Fission joins heavy nuclei and fusion splits light nuclei",
       "Only fission releases energy; fusion absorbs energy",
       "Only fusion involves a change of mass"],
      "The two processes run in opposite directions on the nuclear chart but share the same energy source: in both, the products have slightly less mass than the starting nuclei, and the difference is released as energy.",{});
  },
  function(){
    return mcq("Which statement about the products is correct?",
      "Fission of uranium-235 gives two radioactive medium-mass nuclei, while fusion of hydrogen isotopes gives helium, which is not radioactive",
      ["Fission gives helium, while fusion gives two radioactive medium-mass nuclei",
       "Both give exactly the same products",
       "Fusion gives two medium-mass nuclei and fission gives helium"],
      "Fission fragments are medium-mass nuclei that are usually radioactive, one reason spent fuel needs long-term care. The headline product of hydrogen fusion is helium, a stable, non-radioactive nucleus, though neutrons are also produced.",{});
  },
  function(){
    return mcq("A chain reaction, in which each event triggers further events, is a feature of",
      "Fission, because each fission releases neutrons that can split more heavy nuclei",
      ["Fusion, because each fusion releases neutrons that join more nuclei",
       "Both processes equally in current power stations",
       "Neither process"],
      "Each fission of uranium-235 releases two or three neutrons, and those neutrons can cause further fissions, which is the chain reaction controlled in a reactor. Fusion events do not trigger each other in that way.",{});
  },
  function(){
    return mcq("Per kilogram of fuel, which statement comparing the two processes is generally correct?",
      "Fusion of light nuclei releases more energy per kilogram of fuel than fission of heavy nuclei",
      ["Fission releases far more energy per kilogram than fusion",
       "Both release exactly the same energy per kilogram",
       "Neither releases energy per kilogram; only per reaction matters"],
      "A single fission releases more energy than a single fusion, because the nucleus is much bigger. But a kilogram holds far more light nuclei than heavy ones, so fusion wins per kilogram of fuel, while fission wins per single reaction.",{});
  }
]));

E("u3-716-energy-compare",3,["PH11.7.16"],3,"gen",function(){
  var ratio=pick([2,2.5,3,4,5]),smallCoeff=sfR(rf(1,4),3),bigCoeff=sfR(ratio*smallCoeff,3);
  var bigIsFission=pick([true,false]);
  var bigE=bigCoeff*1e12,smallE=smallCoeff*1e12,rat=sfR(bigE/smallE,3);
  var bigName=bigIsFission?"Fission":"Fusion",smallName=bigIsFission?"Fusion":"Fission";
  var fissE=bigIsFission?bigE:smallE,fusE=bigIsFission?smallE:bigE;
  return mcq("In a comparison test, fission reactions in one sample release a total of "+F3(fissE)+" J, while fusion reactions in another sample release a total of "+F3(fusE)+" J. Which conclusion is correct?",
    bigName+" releases more energy in total, by a factor of about "+F3(rat),
    [smallName+" releases more energy in total, by a factor of about "+F3(rat),
     "The two samples release the same total energy",
     bigName+" releases more energy in total, by a factor of about "+F3(rat*10)],
    "Compare the two totals directly. Dividing the larger total by the smaller total gives a factor of about "+F3(rat)+". So "+bigName.toLowerCase()+" releases more energy in total, by a factor of about "+F3(rat)+".",{ratio:ratio,smallCoeff:smallCoeff,bigIsFission:bigIsFission});
});

// Bank Strengthening Programme pass 7 (November 19, 2026): u3-716-chain-reaction, u3-716-per-nucleon added to bring this pool to 6.
// LEVEL: 2 - Conceptual application of nuclear fission mechanisms to sustaining and controlling a chain reaction in a reactor.
// VARIANTS: four variants (sustaining chain reaction, control rods role, moderator role, supercritical multiplication factor) at equal mix
// LENGTHS: key=69, distractors=69,68,69
E("u3-716-chain-reaction",3,["PH11.7.16"],2,"var",varset([
  function(){
    var key="Each fission releases two or three neutrons that can split more nuclei";
    var ds=[
      "Each fission releases two or three protons that fuse lighter nuclei",
      "Each fission absorbs two or three electrons that heat the fuel rods",
      "Each fission releases gamma photons that split neighbouring fuel atoms"
    ];
    return mcq("Why can a single nuclear fission event in a uranium fuel rod trigger a self-sustaining chain reaction?",
      key,ds,
      "When a heavy nucleus splits, it emits two or three free neutrons. If at least one of those neutrons strikes another fissile nucleus and causes it to split, the reaction continues on its own. "+key+".",
      {topic:"chain_cause"});
  },
  function(){
    var key="They absorb excess neutrons so fewer remain to cause further fissions";
    var ds=[
      "They slow down fast neutrons so the neutrons split nuclei more easily",
      "They release extra neutrons so the fission rate increases more rapidly",
      "They reflect escaping protons back into the reactor core to sustain heat"
    ];
    return mcq("What is the role of control rods when they are lowered deeper into the core of a nuclear fission reactor?",
      key,ds,
      "Control rods are made of neutron-absorbing materials such as cadmium or boron. Lowering them removes neutrons from the chain so the fission rate drops or stays steady. "+key+".",
      {topic:"control_rods"});
  },
  function(){
    var key="It slows fast neutrons down so they are more likely to cause fission";
    var ds=[
      "It absorbs excess neutrons so the reaction rate drops to a safe level",
      "It speeds neutrons up so they overcome electrical repulsion in nuclei",
      "It converts beta particles into gamma rays to carry heat to turbines"
    ];
    return mcq("What is the purpose of a moderator (such as heavy water or graphite) inside a thermal nuclear fission reactor?",
      key,ds,
      "Fission emits fast-moving neutrons that often pass right by fissile nuclei without being captured. Collisions with moderator atoms slow the neutrons down, raising the probability of fission. "+key+".",
      {topic:"moderator"});
  },
  function(){
    var key="The number of fissions grows rapidly from one generation to the next";
    var ds=[
      "The number of fissions drops steadily until the reaction shuts itself down",
      "The number of fissions stays constant at the exact same rate every second",
      "The reactor switches from nuclear fission to nuclear fusion automatically"
    ];
    return mcq("What happens inside a fission reactor if, on average, more than one neutron from each fission goes on to trigger another fission?",
      key,ds,
      "When each generation produces more fissions than the previous generation, the reaction multiplies exponentially (a supercritical state) unless control rods are inserted to absorb extra neutrons. "+key+".",
      {topic:"supercritical"});
  }
]));

// LEVEL: 3 - Quantitative comparison normalizing reaction energy release per participating nucleon to contrast fission and fusion.
// VARIANTS: fusion releasing more energy per nucleon than fission across dealt physical-scale mass defects (100% of draws)
// LENGTHS: key=89, distractors=90,89,84
E("u3-716-per-nucleon",3,["PH11.7.16"],3,"gen",function(){
  var nFiss=236;
  var nFus=5;
  var dmFiss,dmFus,eFiss,eFus,perFiss,perFus,tries=0;
  var c=3.00e8;
  do{
    tries++;
    dmFiss=sfR(rf(2.5,3.5)*1e-28,3);
    dmFus=sfR(rf(2.5,4)*1e-29,3);
    eFiss=sfR(dmFiss*c*c,4);
    eFus=sfR(dmFus*c*c,4);
    perFiss=sfR(eFiss/nFiss,3);
    perFus=sfR(eFus/nFus,3);
  }while(perFus<1.3*perFiss&&tries<80);
  var sci=function(x){var e=Math.floor(Math.log10(Math.abs(x)));return F3(x/Math.pow(10,e))+" × 10"+sfSup(e);};
  var fusStr=sci(perFus);
  var fissStr=sci(perFiss);
  var key="Fusion releases more energy per nucleon ("+fusStr+" J/nucleon versus "+fissStr+" J/nucleon)";
  var d1="Fission releases more energy per nucleon ("+fusStr+" J/nucleon versus "+fissStr+" J/nucleon)";
  var d2="Fusion releases more energy per nucleon ("+fissStr+" J/nucleon versus "+fusStr+" J/nucleon)";
  var d3="Both processes release equal energy per nucleon because both convert mass into energy";
  return mcq("A single uranium fission involving "+nFiss+" nucleons converts "+sci(dmFiss)+" kg of mass into energy, while a single deuterium-tritium fusion involving "+nFus+" nucleons converts "+sci(dmFus)+" kg of mass into energy. Which process releases more energy per nucleon?",
    key,[d1,d2,d3],
    "First find the energy released per event using E = Δm c^2 with c = 3.00 × 10^8 m/s. For fission: E_fission = "+sci(dmFiss)+" kg × (3.00 × 10^8 m/s)^2 = "+sci(eFiss)+" J, which across "+nFiss+" nucleons gives "+sci(eFiss)+" J / "+nFiss+" = "+fissStr+" J/nucleon. For fusion: E_fusion = "+sci(dmFus)+" kg × (3.00 × 10^8 m/s)^2 = "+sci(eFus)+" J, which across "+nFus+" nucleons gives "+sci(eFus)+" J / "+nFus+" = "+fusStr+" J/nucleon. "+key+".",
    {dmFiss:dmFiss,nFiss:nFiss,dmFus:dmFus,nFus:nFus,perFiss:perFiss,perFus:perFus});
});
/* Prior knowledge flags (Nov 13, 2026): the entries named
   below assess junior science atomic structure outcomes (counting subatomic particles), and nothing on this
   course's indicator list (Jason's assessed-target standard;
   see the prior knowledge audit and its re-test). The pkFlag
   property is set here in the bank module the way the enrich
   flags are set in Math 2201's bank-u7.js; assembly carries
   it into banks/physics-2204.js verbatim, and the shell's isPK
   reads it alongside PK-coded indicators. Flagged entries
   stay in practice pools by default and leave them only
   when a teacher turns prior knowledge off in Advanced
   tools. */
BANK.forEach(function(e){if(["u3-713-nuclear-notation"].indexOf(e.id)>=0)e.pkFlag=true;});


