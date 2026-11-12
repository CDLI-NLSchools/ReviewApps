// Diagram figures (Phase C, Nov 2026): spring graphs and scenes, half life decay curve, pendulum and slope scenes added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// CRMARKS: u3-75-energy-cr=5
// CRMARKS: u3-711-shm-energy-cr=4
// CRMARKS: u3-76-friction-cr=4
// CRMARKS: u3-73-workenergy-cr=3
// CRMARKS: u3-78-power-cr=3
// CRMARKS: u3-712-classify-cr=2
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
  return mcq("A rope pulls a sled with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal. The sled moves "+gF(d)+" m across the snow. How much work does the rope do?",
    F3(W)+" J",
    [F3(F*d)+" J",F3(F*d*Math.sin(rad))+" J",F3(W/2)+" J"],
    "Only the component of the force along the motion does work. That component is "+iF(Fp)+" N. Then "+iF(Fp)+" N × "+gF(d)+" m = "+F3(W)+" J. The rope does "+F3(W)+" J of work.",{F:F,d:d,ang:ang});
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

/* ---------- 7.4 Mechanical energy ---------- */

E("u3-74-mechanical-sum",3,["PH11.7.4"],1,"gen",function(){
  var ek=sfR(rf(20,300),3),eg=sfR(rf(20,300),3),em=sfR(ek+eg,3);
  return numq("At one point in its motion an object has a kinetic energy of "+gF(ek)+" J and a gravitational potential energy of "+gF(eg)+" J, measured from the stated reference level. What is its mechanical energy at that point? Give your answer in J.",em,Math.max(0.02*Math.abs(em),1e-9),
  "Mechanical energy is the sum of the kinetic and potential energies: Em = Ek + Eg. "+gF(ek)+" J + "+gF(eg)+" J = "+F3(em)+" J. The mechanical energy is "+F3(em)+" J.",{ek:ek,eg:eg});
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
  return numq("An object has a mechanical energy of "+gF(em)+" J. At the point of interest its gravitational potential energy, measured from the stated reference level, is "+gF(eg)+" J. What is its kinetic energy at that point? Give your answer in J.",ek,Math.max(0.02*Math.abs(ek),1e-9),
  "Mechanical energy is the sum: Em = Ek + Eg, so Ek = Em - Eg. "+gF(em)+" J - "+gF(eg)+" J = "+F3(ek)+" J. The kinetic energy is "+F3(ek)+" J.",{em:em,eg:eg});
});

E("u3-74-find-height",3,["PH11.7.4"],3,"gen",function(){
  var m=sfR(rf(2,6),3),v=sfR(rf(2,6),3),em=sfR(rf(150,400),3);
  var v2=sfR(v*v,4),hm=sfR(0.5*m,4),ek=sfR(hm*v2,3);
  var eg=sfR(em-ek,3),w=sfR(m*9.8,4),h=sfR(eg/w,3);
  return numq("A "+gF(m)+" kg object moving at "+gF(v)+" m/s has a mechanical energy of "+gF(em)+" J. How high is the object above the reference level? Give your answer in m.",h,Math.max(0.02*Math.abs(h),1e-9),
  "First find the kinetic energy. The speed squared is "+gF(v)+" m/s × "+gF(v)+" m/s = "+iF(v2)+" m^2/s^2. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The kinetic energy is "+iF(hm)+" kg × "+iF(v2)+" m^2/s^2 = "+F3(ek)+" J. The rest of the mechanical energy is gravitational: "+gF(em)+" J - "+F3(ek)+" J = "+F3(eg)+" J. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The height is "+F3(eg)+" J / "+iF(w)+" N = "+F3(h)+" m. The object is "+F3(h)+" m above the reference level.",{m:m,v:v,em:em});
});

/* ---------- 7.5 Kinematics and dynamics using mechanical energy ---------- */

E("u3-75-energy-cr",3,["PH11.7.5"],3,"gen",function(){
  var branch=pick(["lower","needed"]);
  if(branch==="lower"){
    var h1=sfR(rf(6,14),3),h2=sfR(rf(1,Math.max(2,h1-4)),3);
    var dh=sfR(h1-h2,3),v2=sfR(19.6*dh,4),v=sfR(Math.sqrt(v2),3);
    var ctx=pick(["A skier starts from rest at the top of a slope","A toboggan starts from rest at the top of a hill","A cart starts from rest at the top of a ramp"]);
    return numq(ctx+" "+gF(h1)+" m above the bottom, taken as the reference level, and reaches a point "+gF(h2)+" m above the bottom. Friction is ignored. What is its speed at the lower point? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
    "Mechanical energy is conserved when friction is ignored, and gravitational and kinetic changes are the only ones here. The drop in height is "+gF(h1)+" m - "+gF(h2)+" m = "+F3(dh)+" m. The lost gravitational potential energy becomes kinetic energy, so the speed squared is 19.6 m/s^2 × "+F3(dh)+" m = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{h1:h1,h2:h2});
  }
  var v=sfR(rf(4,12),3),v2=sfR(v*v,4),h=sfR(v2/19.6,3);
  var ctx2=pick(["A skier starts from rest and wants to reach the bottom of a slope","A sled starts from rest and wants to reach the foot of a hill","A cart starts from rest and wants to reach the bottom of a ramp"]);
  return numq(ctx2+" travelling at "+gF(v)+" m/s. Friction is ignored and the bottom is the reference level. From what height above the bottom must it start? Give your answer in m.",h,Math.max(0.02*Math.abs(h),1e-9),
  "Mechanical energy is conserved when friction is ignored. At the bottom all the starting gravitational potential energy has become kinetic energy, so the height is the speed squared divided by 19.6 m/s^2. The speed squared is "+gF(v)+" m/s × "+gF(v)+" m/s = "+iF(v2)+" m^2/s^2. Then "+iF(v2)+" m^2/s^2 / 19.6 m/s^2 = "+F3(h)+" m. It must start "+F3(h)+" m above the bottom.",{v:v});
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

/* ---------- 7.6 Conservation of energy with heat ---------- */

E("u3-76-friction-cr",3,["PH11.7.6"],2,"gen",function(){
  var m=sfR(rf(3,8),3),h=sfR(rf(3,7),3),w=sfR(m*9.8,4),eg=sfR(w*h,3);
  var f=sfR(rf(10,25),3),s=sfR(rf(3,6),3),Q=sfR(f*s,3);
  var ekf=sfR(eg-Q,3),twoEk=sfR(2*ekf,4),v2=sfR(twoEk/m,4),v=sfR(Math.sqrt(v2),3);
  return numq("A "+gF(m)+" kg block starts from rest at the top of a slope "+gF(h)+" m above the bottom, taken as the reference level. As it slides down a slope of length "+gF(s)+" m, friction of "+gF(f)+" N acts on it. What is its speed at the bottom? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Use conservation of energy with a heat term. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N. The starting gravitational potential energy is "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. Friction produces heat of "+gF(f)+" N × "+gF(s)+" m = "+F3(Q)+" J. The kinetic energy at the bottom is "+F3(eg)+" J - "+F3(Q)+" J = "+F3(ekf)+" J, so the account balances: potential energy at the top equals kinetic energy at the bottom plus heat. Twice the final kinetic energy is 2 × "+F3(ekf)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,h:h,f:f,s:s});
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
  return numq("A "+gF(m)+" kg cart is moving at "+gF(vi)+" m/s at the top of a slope "+gF(h)+" m above the bottom, taken as the reference level. It slides to the bottom, and friction produces "+gF(Q)+" J of heat during the slide. What is its speed at the bottom? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Start with the total energy at the top. The weight is "+gF(m)+" kg × 9.8 m/s^2 = "+iF(w)+" N, so the gravitational potential energy is "+iF(w)+" N × "+gF(h)+" m = "+F3(eg)+" J. Half the mass is 0.500 × "+gF(m)+" kg = "+iF(hm)+" kg. The initial speed squared is "+gF(vi)+" m/s × "+gF(vi)+" m/s = "+iF(v2i)+" m^2/s^2, so the initial kinetic energy is "+iF(hm)+" kg × "+iF(v2i)+" m^2/s^2 = "+F3(eki)+" J. The total at the top is "+F3(eki)+" J + "+F3(eg)+" J = "+F3(etot)+" J. After the heat loss, the kinetic energy at the bottom is "+F3(etot)+" J - "+gF(Q)+" J = "+F3(ekf)+" J. Twice that is 2 × "+F3(ekf)+" J = "+iF(twoEk)+" J. Then "+iF(twoEk)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,vi:vi,h:h,Q:Q});
});

E("u3-76-energy-account",3,["PH11.7.6"],3,"gen",function(){
  var ef=sfR(rf(90,200),3),Q0=sfR(rf(30,70),3),ei=sfR(ef+Q0,3),Q=sfR(ei-ef,3);
  var ctx=pick(["A block slides down a slope and friction acts.","A sled comes down a hill and friction acts.","A cart rolls down a ramp and friction acts."]);
  return mcq(ctx+" The total mechanical energy at the top is "+gF(ei)+" J and the kinetic energy at the bottom is "+gF(ef)+" J. How much heat was produced by friction?",
    F3(Q)+" J",
    [F3(ef)+" J",F3(ei)+" J",F3(ei+ef)+" J"],
    "The energy account must balance. The starting total is split between the kinetic energy at the bottom and the heat produced, so the heat is "+gF(ei)+" J - "+gF(ef)+" J = "+F3(Q)+" J.",{ei:ei,ef:ef});
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

/* ---------- 7.11 Energies in simple harmonic motion ---------- */

E("u3-711-shm-energy-cr",3,["PH11.7.11"],3,"gen",function(){
  var branch=pick(["table","track"]);
  var k=sfR(rf(20,120),3),A=sfR(rf(0.12,0.30),3),x=sfR(A*rf(0.3,0.7),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),x2=sfR(x*x,4);
  var etot=sfR(halfk*A2,3),es=sfR(halfk*x2,3),ke=sfR(etot-es,3);
  var where=branch==="table"?"on a frictionless table":"on a smooth horizontal track";
  return numq("A mass oscillates "+where+" on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its kinetic energy when it is "+gF(x)+" m from equilibrium? Give your answer in J.",ke,Math.max(0.02*Math.abs(ke),1e-9),
  "The total energy is set by the amplitude, where all the energy is elastic potential energy. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2, so the total energy is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. At the stated displacement, the displacement squared is "+gF(x)+" m × "+gF(x)+" m = "+iF(x2)+" m^2, so the elastic potential energy is "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J. The rest is kinetic: "+F3(etot)+" J - "+F3(es)+" J = "+F3(ke)+" J. The kinetic energy is "+F3(ke)+" J.",{k:k,A:A,x:x});
});

E("u3-711-elastic-pe",3,["PH11.7.11"],2,"gen",function(){
  var k=sfR(rf(20,150),3),x=sfR(rf(0.05,0.35),3);
  var halfk=sfR(0.5*k,4),x2=sfR(x*x,4),es=sfR(halfk*x2,3);
  return numq("A spring with spring constant "+gF(k)+" N/m is stretched by "+gF(x)+" m. What is the elastic potential energy stored in the spring? Give your answer in J.",es,Math.max(0.02*Math.abs(es),1e-9),
  "Elastic potential energy is Es = 1/2 k x^2. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The stretch squared is "+gF(x)+" m × "+gF(x)+" m = "+iF(x2)+" m^2. Then "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J. The elastic potential energy is "+F3(es)+" J.",{k:k,x:x});
});

E("u3-711-total-energy",3,["PH11.7.11"],2,"gen",function(){
  var k=sfR(rf(20,150),3),A=sfR(rf(0.08,0.35),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),etot=sfR(halfk*A2,3);
  return numq("A mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is the total mechanical energy of the system? Give your answer in J.",etot,Math.max(0.02*Math.abs(etot),1e-9),
  "At the amplitude the mass is momentarily at rest, so all the energy is elastic potential energy and that amount is the total. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2. Then "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. The total mechanical energy is "+F3(etot)+" J.",{k:k,A:A});
});

E("u3-711-speed-at-x",3,["PH11.7.11"],3,"gen",function(){
  var m=sfR(rf(0.5,3),3),k=sfR(rf(20,100),3),A=sfR(rf(0.15,0.35),3),x=sfR(A*rf(0.3,0.6),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),x2=sfR(x*x,4);
  var etot=sfR(halfk*A2,3),es=sfR(halfk*x2,3),ke=sfR(etot-es,3);
  var twoKe=sfR(2*ke,4),v2=sfR(twoKe/m,4),v=sfR(Math.sqrt(v2),3);
  return numq("A "+gF(m)+" kg mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its speed when it is "+gF(x)+" m from equilibrium? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "Find the kinetic energy at that displacement first. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The total energy, from the amplitude, is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J, using the amplitude squared, "+iF(A2)+" m^2. The elastic potential energy at the displacement is "+iF(halfk)+" N/m × "+iF(x2)+" m^2 = "+F3(es)+" J, using the displacement squared, "+iF(x2)+" m^2. The kinetic energy is "+F3(etot)+" J - "+F3(es)+" J = "+F3(ke)+" J. Twice the kinetic energy is 2 × "+F3(ke)+" J = "+iF(twoKe)+" J. Then "+iF(twoKe)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,k:k,A:A,x:x});
});

E("u3-711-speed-equilibrium",3,["PH11.7.11"],3,"gen",function(){
  var m=sfR(rf(0.5,3),3),k=sfR(rf(20,100),3),A=sfR(rf(0.10,0.35),3);
  var halfk=sfR(0.5*k,4),A2=sfR(A*A,4),etot=sfR(halfk*A2,3);
  var twoE=sfR(2*etot,4),v2=sfR(twoE/m,4),v=sfR(Math.sqrt(v2),3);
  return numq("A "+gF(m)+" kg mass oscillates on a horizontal spring with spring constant "+gF(k)+" N/m and amplitude "+gF(A)+" m. What is its speed as it passes through equilibrium? Give your answer in m/s.",v,Math.max(0.02*Math.abs(v),1e-9),
  "At equilibrium the elastic potential energy is zero, so all the total energy is kinetic there. Half the spring constant is 0.500 × "+gF(k)+" N/m = "+iF(halfk)+" N/m. The amplitude squared is "+gF(A)+" m × "+gF(A)+" m = "+iF(A2)+" m^2, so the total energy is "+iF(halfk)+" N/m × "+iF(A2)+" m^2 = "+F3(etot)+" J. Twice the total energy is 2 × "+F3(etot)+" J = "+iF(twoE)+" J. Then "+iF(twoE)+" J / "+gF(m)+" kg = "+iF(v2)+" m^2/s^2. The speed is the square root of "+iF(v2)+" m^2/s^2, which is "+F3(v)+" m/s.",{m:m,k:k,A:A});
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
  return numq("In a collision, the total kinetic energy of the objects is "+gF(kei)+" J before the collision and "+gF(kef)+" J after the collision. How much kinetic energy is lost in the collision? Give your answer in J.",lost,Math.max(0.02*Math.abs(lost),1e-9),
  "The kinetic energy lost is the drop in kinetic energy. "+gF(kei)+" J - "+gF(kef)+" J = "+F3(lost)+" J. The collision loses "+F3(lost)+" J of kinetic energy, so it is not elastic.",{kei:kei,kef:kef});
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
