// Diagram figures (Phase C, Nov 2026): entries whose source question type
// carried a diagram now set qq3204.figure from the draw's own values via the
// p32fig* helpers in bank-helpers.js. Asked unknowns are labelled "?".
// Physics 3204 Unit 2 Forces question bank (circular motion, 2D dynamics,
// static equilibrium and torques)
// CRMARKS: u2-61-scaling-cr=2
// CRMARKS: u2-61-speed-accel-cr=3
// CRMARKS: u2-62-banked-cr=4
// CRMARKS: u2-62-dip-cr=4
// CRMARKS: u2-62-minspeed-cr=3
// CRMARKS: u2-63-incline-friction-cr=4
// CRMARKS: u2-63-pulley-cr=5
// CRMARKS: u2-64-beam-cr=4
// CRMARKS: u2-64-ladder-cr=4
// CRMARKS: u2-64-wires-cr=2

/* ============ Units and significant figures discipline (Nov 2026) ============
   Givens are fixed at 3 significant figures and printed with gF().
   Intermediates print at 4 significant figures with iF() and each next step
   is computed from the printed intermediate, so every printed arithmetic
   line reproduces at printed precision. Final answers are stored and
   printed at 3 significant figures with F3(), always with their unit.
   Printed arithmetic lines are kept below 1000 so no value needs the
   scientific print form inside a checked line. g = 9.8 m/s^2 throughout. */

/* ---------- PH12.6.1 Uniform circular motion described ---------- */

E("u2-61-period-frequency",2,["PH12.6.1"],1,"gen",function(){
  var N,t,T,f,opts;
  do {
    N=ri(12,48); t=ri(25,110);
    T=sfR(t/N,3); f=sfR(N/t,3);
    opts=[T,f,sfR(2*T,3),sfR(T/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  return mcq("A turntable completes "+N+" full revolutions in "+t+" s. What is the period of the rotation?",
    F3(T)+" s",
    [F3(f)+" s", F3(sfR(2*T,3))+" s", F3(sfR(T/2,3))+" s"],
    "The period is the time taken for one complete revolution, so divide the total time by the number of revolutions: "+t+" / "+N+" = "+F3(T)+" s. The period is "+F3(T)+" s. The value "+F3(f)+" s would come from dividing the wrong way; "+F3(f)+" is in fact the frequency, the number of revolutions per second.",
    {N:N,t:t});
});

E("u2-61-direction",2,["PH12.6.1"],1,"var",varset([
  function(){
    var qq3204 = mcq("A ball on a string moves in a horizontal circle at a steady speed. At any instant, the direction of the ball's velocity is",
      "Tangent to the circle, in the direction of motion",
      ["Toward the centre of the circle",
       "Away from the centre of the circle",
       "Along the string, toward the hand holding it"],
      "Velocity is always along the path of motion. For circular motion the path is the circle itself, so the velocity points along the tangent to the circle at the ball's position. It is the acceleration, not the velocity, that points toward the centre.",{}); qq3204.figure = p32figCircleTop("string",null,null,true); return qq3204;
  },
  function(){
    var qq3204 = mcq("A ball on a string moves in a horizontal circle at a steady speed. The direction of the ball's acceleration is",
      "Toward the centre of the circle",
      ["Tangent to the circle, in the direction of motion",
       "Away from the centre of the circle",
       "Zero, because the speed is steady"],
      "Even at a steady speed, the direction of motion changes continuously, so the velocity changes and there is an acceleration. For uniform circular motion that acceleration points toward the centre of the circle, which is why it is called centripetal, meaning centre-seeking.",{}); qq3204.figure = p32figCircleTop("string",null,null,true); return qq3204;
  },
  function(){
    var qq3204 = mcq("A car rounds a flat curve at a steady speed. The direction of the net force on the car is",
      "Toward the centre of the curve",
      ["Forward, in the direction the car is travelling",
       "Zero, because the speed is steady",
       "Backward, opposite to the direction of travel"],
      "Newton's second law says the net force points the same way as the acceleration. In uniform circular motion the acceleration is centripetal, toward the centre of the curve, so the net force points toward the centre of the curve as well. A steady speed does not mean zero net force when the direction is changing.",{}); qq3204.figure = p32figCircleTop("string",null,null,true); return qq3204;
  },
  function(){
    var qq3204 = mcq("A ball whirled in a horizontal circle on a string is suddenly released when the string breaks. Ignoring gravity, the ball then moves",
      "In a straight line tangent to the circle at the point of release",
      ["Straight outward, away from the centre of the circle",
       "In a smaller and smaller circle until it stops",
       "Toward the centre of the circle, then stops"],
      "While the string holds, its tension supplies the centripetal force that keeps changing the ball's direction. Once the string breaks there is no inward force, so by Newton's first law the ball keeps the velocity it had at release, which is tangent to the circle. It flies off along the tangent, not radially outward.",{}); qq3204.figure = p32figCircleTop("string",null,null,true); return qq3204;
  }
]));

E("u2-61-scaling-concept",2,["PH12.6.1"],1,"var",varset([
  function(){
    return mcq("A car rounds a curve of fixed radius. If the car's speed is doubled, the centripetal acceleration",
      "Becomes four times as large",
      ["Becomes two times as large",
       "Stays the same",
       "Becomes half as large"],
      "Centripetal acceleration is a = v^2 / r, so it varies with the square of the speed. Doubling the speed multiplies v^2 by four, so the centripetal acceleration becomes four times as large.",{});
  },
  function(){
    return mcq("A cyclist rides around two curves at the same speed. The second curve has twice the radius of the first. The centripetal acceleration on the second curve is",
      "Half the acceleration on the first curve",
      ["Twice the acceleration on the first curve",
       "The same as on the first curve",
       "Four times the acceleration on the first curve"],
      "Centripetal acceleration is a = v^2 / r, so at a fixed speed it varies inversely with the radius. Doubling the radius halves the centripetal acceleration.",{});
  },
  function(){
    return mcq("A stone on a string is whirled in a circle of fixed radius. If the speed is cut in half, the centripetal force needed",
      "Becomes one quarter as large",
      ["Becomes one half as large",
       "Stays the same",
       "Becomes twice as large"],
      "Centripetal force is F = m v^2 / r, so it varies with the square of the speed. Halving the speed multiplies v^2 by one quarter, so the centripetal force needed becomes one quarter as large.",{});
  },
  function(){
    return mcq("A turntable spins a coin in a circle of fixed radius. If the frequency of rotation is doubled, the centripetal acceleration of the coin",
      "Becomes four times as large",
      ["Becomes two times as large",
       "Stays the same",
       "Becomes half as large"],
      "Doubling the frequency doubles the speed, because the coin covers the same circumference in half the time. Since centripetal acceleration varies with the square of the speed, doubling the speed makes the acceleration four times as large.",{});
  }
]));

E("u2-61-speed-numq",2,["PH12.6.1"],2,"gen",function(){
  var r=sfR(rf(0.40,3.20),3), T=sfR(rf(2.5,9.0),3);
  var C4=sfR(2*Math.PI*r,4), v4=sfR(C4/T,4), ans=sfR(v4,3);
  var qq3204 = numq("A child sits at the edge of a merry-go-round of radius "+gF(r)+" m. The merry-go-round completes one revolution every "+gF(T)+" s. What is the child's speed? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "In one revolution the child travels the circumference of the circle, which is "+iF(C4)+" m. Speed is distance divided by time: "+iF(C4)+" / "+gF(T)+" = "+iF(v4)+" m/s. The child's speed is "+F3(ans)+" m/s.",
    {r:r,T:T}); qq3204.figure = p32figCircleTop(gF(r)+" m",null,null,false); return qq3204;
});

E("u2-61-centripetal-accel-mc",2,["PH12.6.1"],2,"gen",function(){
  var v,r,v24,a4,ans,opts;
  do {
    v=sfR(rf(3.5,14.0),3); r=sfR(rf(1.2,9.0),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); ans=sfR(a4,3);
    opts=[ans,sfR(v/r,3),sfR(2*a4,3),sfR(a4/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A ball is whirled in a horizontal circle of radius "+gF(r)+" m at a steady speed of "+gF(v)+" m/s. What is the centripetal acceleration of the ball?",
    F3(ans)+" m/s^2",
    [F3(sfR(v/r,3))+" m/s^2", F3(sfR(2*a4,3))+" m/s^2", F3(sfR(a4/2,3))+" m/s^2"],
    "Centripetal acceleration is a = v^2 / r. First square the speed: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2. Then divide by the radius: "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2. The centripetal acceleration is "+F3(ans)+" m/s^2, directed toward the centre of the circle.",
    {v:v,r:r}); qq3204.figure = p32figCircleTop(gF(r)+" m",gF(v)+" m/s",null,false); return qq3204;
});

E("u2-61-speed-accel-cr",2,["PH12.6.1"],2,"gen",function(){
  var r=sfR(rf(6.0,14.0),3), T=sfR(rf(18.0,40.0),3);
  var C4=sfR(2*Math.PI*r,4), v4=sfR(C4/T,4), v24=sfR(v4*v4,4), a4=sfR(v24/r,4), ans=sfR(a4,3);
  var qq3204 = numq("A Ferris wheel of radius "+gF(r)+" m carries a rider at a steady speed, completing one revolution in "+gF(T)+" s. What is the centripetal acceleration of the rider? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "First find the rider's speed. One revolution covers the circumference of the wheel, which is "+iF(C4)+" m, so the speed is "+iF(C4)+" / "+gF(T)+" = "+iF(v4)+" m/s. Centripetal acceleration is a = v^2 / r. Square the speed: "+iF(v4)+" × "+iF(v4)+" = "+iF(v24)+" m^2/s^2. Then divide by the radius: "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2. The centripetal acceleration of the rider is "+F3(ans)+" m/s^2, toward the centre of the wheel.",
    {r:r,T:T}); qq3204.figure = p32figCircleTop(gF(r)+" m",null,null,false); return qq3204;
});

E("u2-61-scaling-cr",2,["PH12.6.1"],2,"gen",function(){
  var k=pick([2,3]);
  var F1=k===2?sfR(rf(40.0,220.0),3):sfR(rf(30.0,95.0),3);
  var ratio=k*k, F2_4=sfR(F1*ratio,4), ans=sfR(F2_4,3);
  return numq("A car rounds a flat curve of fixed radius, and the road exerts a centripetal force of "+gF(F1)+" N on the car. The car then goes around the same curve at "+k+" times the speed. What centripetal force is required now? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Centripetal force is F = m v^2 / r, so with the mass and radius unchanged it varies with the square of the speed. The speed multiplier is "+k+", and the force multiplier is "+k+" × "+k+" = "+ratio+". The new force is "+gF(F1)+" × "+ratio+" = "+iF(F2_4)+" N. The required centripetal force is "+F3(ans)+" N.",
    {k:k,F1:F1});
});

E("u2-61-claim-judge",2,["PH12.6.1"],3,"var",varset([
  function(){
    var m=1.50, r=2.00;
    var v1=4.00, v2=8.00;
    var s1=sfR(v1*v1,4), s2=sfR(v2*v2,4);
    var p1=sfR(m*s1,4), F1=sfR(p1/r,4), p2=sfR(m*s2,4), F2=sfR(p2/r,4), ratio=sfR(F2/F1,4);
    return mcq("A student claims that if a car doubles its speed on a curve of the same radius, the centripetal force needed just doubles. Which judgement of the claim is correct?",
      "The claim is wrong: the force becomes four times as large, because centripetal force varies with the square of the speed",
      ["The claim is correct: force is proportional to speed, so doubling the speed doubles the force",
       "The claim is wrong: the force stays the same, because the radius does not change",
       "The claim is wrong: the force is halved, because the car spends less time on the curve"],
      "Check the claim with numbers. For a "+gF(m)+" kg object on a "+gF(r)+" m radius curve at "+gF(v1)+" m/s, the speed squared is "+iF(s1)+" m^2/s^2, and the force is "+gF(m)+" × "+iF(s1)+" = "+iF(p1)+" N, then "+iF(p1)+" / "+gF(r)+" = "+iF(F1)+" N. At double the speed, "+gF(v2)+" m/s, the speed squared is "+iF(s2)+" m^2/s^2, and the force is "+gF(m)+" × "+iF(s2)+" = "+iF(p2)+" N, then "+iF(p2)+" / "+gF(r)+" = "+iF(F2)+" N. Comparing: "+iF(F2)+" / "+iF(F1)+" = "+iF(ratio)+". The force quadruples, so the claim is wrong.",{});
  },
  function(){
    var r=50.0, tanR=sfR(Math.tan(20*Math.PI/180),3);
    var p1=sfR(r*9.8,4), p2=sfR(p1*tanR,4), v=sfR(Math.sqrt(p2),3);
    return mcq("A student claims that on a curve banked for no friction, a heavier car must travel faster than a lighter car to stay on the curve without friction. Which judgement of the claim is correct?",
      "The claim is wrong: the no-friction speed depends on the radius, the banking angle and g only, so it is the same for every mass",
      ["The claim is correct: a heavier car needs more centripetal force, so it must go faster",
       "The claim is wrong: the heavier car must travel slower, because its weight holds it down",
       "The claim is correct for trucks but wrong for cars"],
      "For a banked curve with no friction, the condition is tan of the banking angle equals v^2 / (r g). The mass cancels out of the derivation, so the design speed cannot depend on the mass. As a check, for a radius of "+gF(r)+" m banked at 20 degrees, v^2 is "+gF(r)+" × 9.8 = "+iF(p1)+" m^2/s^2, then "+iF(p1)+" × "+fmt(tanR,3)+" = "+iF(p2)+" m^2/s^2, giving a speed of "+F3(v)+" m/s for any vehicle, heavy or light. The claim is wrong.",{});
  },
  function(){
    var v1=6.00, r1=3.00, v2=12.0, r2=6.00;
    var s1=sfR(v1*v1,4), a1=sfR(s1/r1,4), s2=sfR(v2*v2,4), a2=sfR(s2/r2,4);
    return mcq("A student claims that if both the speed and the radius of a circular path are doubled, the centripetal acceleration stays the same. Which judgement of the claim is correct?",
      "The claim is wrong: the acceleration doubles, because the speed effect (squared) outweighs the radius effect",
      ["The claim is correct: doubling the radius exactly cancels doubling the speed",
       "The claim is wrong: the acceleration becomes four times as large",
       "The claim is wrong: the acceleration is halved"],
      "Test the claim with numbers. At "+gF(v1)+" m/s on a "+gF(r1)+" m radius, the speed squared is "+iF(s1)+" m^2/s^2 and the acceleration is "+iF(s1)+" / "+gF(r1)+" = "+iF(a1)+" m/s^2. Doubling both gives a speed squared of "+iF(s2)+" m^2/s^2 on a "+gF(r2)+" m radius, and the acceleration is "+iF(s2)+" / "+gF(r2)+" = "+iF(a2)+" m/s^2. The acceleration doubled, it did not stay the same, so the claim is wrong.",{});
  },
  function(){
    var T1=4.00, T2=2.00;
    var f1=sfR(1/T1,4), f2=sfR(1/T2,4);
    return mcq("A student claims that if the period of a rotation is halved, the frequency is also halved. Which judgement of the claim is correct?",
      "The claim is wrong: frequency is the reciprocal of period, so halving the period doubles the frequency",
      ["The claim is correct: period and frequency change in the same direction",
       "The claim is wrong: the frequency stays the same, because the rotation is the same motion",
       "The claim is wrong: halving the period makes the frequency four times as large"],
      "Frequency and period are reciprocals: f = 1 / T. With a period of "+gF(T1)+" s, the frequency is 1 / "+gF(T1)+" = "+iF(f1)+" Hz. Halving the period to "+gF(T2)+" s gives 1 / "+gF(T2)+" = "+iF(f2)+" Hz. The frequency doubled, so the claim is wrong.",{});
  }
]));

/* ---------- PH12.6.2 Circular motion using Newton's laws ---------- */

E("u2-62-flatcurve-maxspeed",2,["PH12.6.2"],2,"gen",function(){
  var mu=pick([0.250,0.350,0.450,0.550,0.650,0.750]), r=sfR(rf(25.0,70.0),3);
  var amax4=sfR(mu*9.8,4), v2_4=sfR(amax4*r,4), ans=sfR(Math.sqrt(v2_4),3);
  return numq("A car rounds a flat, unbanked curve of radius "+gF(r)+" m. The coefficient of static friction between the tires and the road is "+gF(mu)+". What is the maximum speed at which the car can round the curve without sliding? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "On a flat curve, friction alone supplies the centripetal force. The largest centripetal acceleration friction can provide is mu times g: "+gF(mu)+" × 9.8 = "+iF(amax4)+" m/s^2. Since a = v^2 / r, the greatest v^2 is "+iF(amax4)+" × "+gF(r)+" = "+iF(v2_4)+" m^2/s^2. Taking the square root gives the maximum speed, "+F3(ans)+" m/s. Any faster and the needed centripetal force would exceed the maximum static friction.",
    {mu:mu,r:r});
});

E("u2-62-tension-horizontal",2,["PH12.6.2"],2,"gen",function(){
  var m,v,r,v24,a4,T4,T,opts;
  do {
    m=sfR(rf(0.30,1.40),3); v=sfR(rf(2.5,8.5),3); r=sfR(rf(0.60,1.60),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); T4=sfR(m*a4,4); T=sfR(T4,3);
    opts=[T,sfR(m*v/r,3),sfR(m*9.8,3),sfR(T4/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A puck of mass "+gF(m)+" kg slides in a horizontal circle on a frictionless table, held by a string that passes through a hole in the table. The puck moves at "+gF(v)+" m/s in a circle of radius "+gF(r)+" m. What is the tension in the string?",
    F3(T)+" N",
    [F3(sfR(m*v/r,3))+" N", F3(sfR(m*9.8,3))+" N", F3(sfR(T4/2,3))+" N"],
    "The table is frictionless and horizontal, so the tension is the only horizontal force and it alone supplies the centripetal force. First find the centripetal acceleration: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2. Newton's second law gives the tension: "+gF(m)+" × "+iF(a4)+" = "+iF(T4)+" N. The tension in the string is "+F3(T)+" N.",
    {m:m,v:v,r:r}); qq3204.figure = p32figCircleTop(gF(r)+" m",gF(v)+" m/s",gF(m)+" kg",true); return qq3204;
});

E("u2-62-loop-top",2,["PH12.6.2"],2,"gen",function(){
  var m,v,r,v24,a4,Fc4,W4,N4,ans;
  do {
    m=sfR(rf(0.35,0.85),3); v=sfR(rf(4.5,8.5),3); r=sfR(rf(0.45,1.10),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); Fc4=sfR(m*a4,4); W4=sfR(m*9.8,4); N4=sfR(Fc4-W4,4);
  } while (N4<1.5);
  ans=sfR(N4,3);
  var qq3204 = numq("A ball of mass "+gF(m)+" kg rolls around the inside of a vertical loop of radius "+gF(r)+" m. At the top of the loop the ball is moving at "+gF(v)+" m/s. What is the force exerted on the ball by the track at the top of the loop? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take toward the centre of the loop as positive. At the top, the centre is below the ball, so both gravity and the track's normal force point toward the centre and together supply the centripetal force. First find the centripetal force: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2, then "+gF(m)+" × "+iF(a4)+" = "+iF(Fc4)+" N. The ball's weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. So the normal force is "+iF(Fc4)+" - "+iF(W4)+" = "+iF(N4)+" N. The track exerts "+F3(ans)+" N on the ball at the top of the loop.",
    {m:m,v:v,r:r}); qq3204.figure = p32figLoop(r,v,m,"top"); return qq3204;
});

E("u2-62-loop-bottom",2,["PH12.6.2"],2,"gen",function(){
  var m,v,r,v24,a4,Fc4,W4,N4,ans,opts;
  do {
    m=sfR(rf(0.35,0.85),3); v=sfR(rf(4.5,8.5),3); r=sfR(rf(0.45,1.10),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); Fc4=sfR(m*a4,4); W4=sfR(m*9.8,4); N4=sfR(Fc4+W4,4); ans=sfR(N4,3);
    opts=[ans,sfR(Fc4,3),sfR(W4,3),sfR(Fc4-W4,4)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4 || Fc4-W4<0.5);
  var qq3204 = mcq("A ball of mass "+gF(m)+" kg rolls around the inside of a vertical loop of radius "+gF(r)+" m. At the bottom of the loop the ball is moving at "+gF(v)+" m/s. What is the force exerted on the ball by the track at the bottom of the loop?",
    F3(ans)+" N",
    [F3(sfR(Fc4,3))+" N", F3(sfR(W4,3))+" N", F3(sfR(Fc4-W4,4))+" N"],
    "Take toward the centre of the loop as positive. At the bottom, the centre is above the ball, so the normal force points toward the centre and gravity points away from it: N - W = F_c. First find the centripetal force: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2, then "+gF(m)+" × "+iF(a4)+" = "+iF(Fc4)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. So the normal force is "+iF(Fc4)+" + "+iF(W4)+" = "+iF(N4)+" N. The track exerts "+F3(ans)+" N on the ball at the bottom, more than at the top, because there the normal force must both support the weight and supply the centripetal force.",
    {m:m,v:v,r:r}); qq3204.figure = p32figLoop(r,v,m,"bottom"); return qq3204;
});

E("u2-62-minspeed-cr",2,["PH12.6.2"],3,"gen",function(){
  var r=sfR(rf(4.0,14.0),3);
  var v2_4=sfR(9.8*r,4), ans=sfR(Math.sqrt(v2_4),3);
  var qq3204 = numq("A roller coaster car goes around a vertical loop of radius "+gF(r)+" m. What is the minimum speed the car can have at the top of the loop and still stay on the track? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "At the minimum speed, the car is just barely in contact with the track at the top, so the track exerts no normal force there. Gravity alone supplies the centripetal force: m g = m v^2 / r. The mass cancels, leaving v^2 = g r: 9.8 × "+gF(r)+" = "+iF(v2_4)+" m^2/s^2. Taking the square root gives the minimum speed, "+F3(ans)+" m/s. Any slower at the top and gravity would pull the car off the track before it completed the loop.",
    {r:r}); qq3204.figure = p32figLoop(r,0,0,"top"); return qq3204;
});

E("u2-62-dip-cr",2,["PH12.6.2"],2,"gen",function(){
  var m,v,r,v24,a4,Fc4,W4,N4,ans;
  do {
    m=sfR(rf(48.0,72.0),3); v=sfR(rf(5.0,8.5),3); r=sfR(rf(6.0,14.0),3);
    v24=sfR(v*v,4); a4=sfR(v24/r,4); Fc4=sfR(m*a4,4); W4=sfR(m*9.8,4); N4=sfR(Fc4+W4,4);
  } while (N4>=950 || Fc4<40);
  ans=sfR(N4,3);
  var qq3204 = numq("A skateboarder with a total mass of "+gF(m)+" kg (rider and board) passes through the bottom of a bowl-shaped dip of radius "+gF(r)+" m at a speed of "+gF(v)+" m/s. What force does the surface of the bowl exert on the skateboarder at the bottom of the dip? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take toward the centre of the bowl's curve as positive. At the bottom of the dip the centre is directly above, so the normal force points toward the centre and gravity points away: N - W = F_c. First find the centripetal force: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2, then "+gF(m)+" × "+iF(a4)+" = "+iF(Fc4)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. So the normal force is "+iF(Fc4)+" + "+iF(W4)+" = "+iF(N4)+" N. The surface exerts "+F3(ans)+" N, noticeably more than the skateboarder's weight, which is why the rider feels pressed into the board at the bottom of a dip.",
    {m:m,v:v,r:r}); qq3204.figure = p32figDip(r,v,m); return qq3204;
});

E("u2-62-banked-cr",2,["PH12.6.2"],3,"gen",function(){
  var v,r,v24,rg4,ratio4,ans;
  do {
    v=sfR(rf(12.0,26.0),3); r=sfR(rf(45.0,95.0),3);
    v24=sfR(v*v,4); rg4=sfR(r*9.8,4); ratio4=sfR(v24/rg4,4);
  } while (ratio4<0.15 || ratio4>0.85);
  ans=sfR(Math.atan(ratio4)*180/Math.PI,3);
  var qq3204 = numq("A highway curve of radius "+gF(r)+" m is to be banked so that a car travelling at "+gF(v)+" m/s can round the curve with no friction at all between the tires and the road. At what angle should the curve be banked? Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "With no friction, the horizontal component of the normal force supplies the centripetal force, and the condition works out to tan of the banking angle equals v^2 / (r g). First square the speed: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2. Then find r g: "+gF(r)+" × 9.8 = "+iF(rg4)+" m^2/s^2. The ratio is "+iF(v24)+" / "+iF(rg4)+" = "+iF(ratio4)+". The angle whose tangent is "+iF(ratio4)+" is "+F3(ans)+" degrees. The curve should be banked at "+F3(ans)+" degrees, and note that the mass of the car does not enter the result.",
    {v:v,r:r}); qq3204.figure = p32figBanked(v,r); return qq3204;
});

E("u2-62-effective-weight",2,["PH12.6.2"],1,"var",varset([
  function(){
    var qq3204 = mcq("A car drives at a steady speed over the crest of a rounded hill. Compared with its weight on flat ground, the normal force on the car at the crest is",
      "Less than the car's weight, so the driver feels lighter",
      ["Greater than the car's weight, so the driver feels heavier",
       "Equal to the car's weight, because the speed is steady",
       "Zero, because the car leaves the road at any crest"],
      "At the crest the centre of the curve is below the car, so gravity supplies part of the centripetal force and the road needs to push up with less than the full weight: N = m g - m v^2 / r. The normal force is less than the weight, and the driver feels lighter.",{}); qq3204.figure = p32figCrestDip("crest"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A cyclist coasts through the bottom of a dip in the road at a steady speed. Compared with the cyclist's weight on flat ground, the normal force at the bottom of the dip is",
      "Greater than the cyclist's weight, so the cyclist feels heavier",
      ["Less than the cyclist's weight, so the cyclist feels lighter",
       "Equal to the cyclist's weight, because the speed is steady",
       "Zero, because the road cannot push at the bottom of a dip"],
      "At the bottom of the dip the centre of the curve is above, so the normal force must both support the weight and supply the centripetal force: N = m g + m v^2 / r. The normal force is greater than the weight, and the cyclist feels heavier.",{}); qq3204.figure = p32figCrestDip("dip"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A roller coaster car passes the top of a loop at exactly the minimum speed needed to stay on the track. The normal force exerted by the track on the car at that moment is",
      "Zero, because gravity alone supplies the centripetal force",
      ["Equal to the car's weight",
       "Twice the car's weight",
       "Equal to the centripetal force plus the car's weight"],
      "At the minimum speed the car is just in contact with the track, so the track pushes with no normal force at all. Gravity alone provides the centripetal force, m g = m v^2 / r, and the riders feel momentarily weightless.",{}); qq3204.figure = p32figCrestDip("loop"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A car travels at a steady speed along a straight, flat stretch of highway. The normal force exerted by the road on the car is",
      "Equal to the car's weight, because there is no vertical acceleration and no curve",
      ["Less than the car's weight, because the car is moving",
       "Greater than the car's weight, because of the car's speed",
       "Zero, because the road is flat"],
      "On a straight, flat road there is no vertical acceleration and no centre of a curve to accelerate toward, so the vertical forces balance: the normal force equals the car's weight. Speed along a straight, flat road does not change the normal force.",{}); qq3204.figure = p32figCrestDip("flat"); return qq3204;
  }
]));

E("u2-62-claim-judge",2,["PH12.6.2"],3,"var",varset([
  function(){
    var m=0.500, v=6.00, r=0.800;
    var s=sfR(v*v,4), p=sfR(m*s,4), Fc=sfR(p/r,4), W=sfR(m*9.8,4), N=sfR(Fc-W,4);
    return mcq("A student claims that a rider at the top of a loop is always weightless, no matter the speed. Which judgement of the claim is correct?",
      "The claim is wrong: the rider is weightless only at the one minimum speed; faster than that, the track pushes down with a real normal force",
      ["The claim is correct: at the top of a loop the normal force is always zero",
       "The claim is wrong: the normal force at the top is always larger than the rider's weight",
       "The claim is correct, but only for loops with a large radius"],
      "Test the claim with numbers. Take a "+gF(m)+" kg ball at "+gF(v)+" m/s at the top of a "+gF(r)+" m radius loop. The speed squared is "+iF(s)+" m^2/s^2, so the centripetal force is "+gF(m)+" × "+iF(s)+" = "+iF(p)+" N, then "+iF(p)+" / "+gF(r)+" = "+iF(Fc)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(W)+" N, so the normal force is "+iF(Fc)+" - "+iF(W)+" = "+iF(N)+" N, which is not zero. The rider is weightless only at the minimum speed, where the normal force works out to exactly zero. The claim is wrong.",{});
  },
  function(){
    var m=0.500, v=6.00, r=0.800;
    var s=sfR(v*v,4), p=sfR(m*s,4), Fc=sfR(p/r,4), W=sfR(m*9.8,4), N=sfR(Fc+W,4);
    return mcq("A student claims that at the bottom of a loop, the normal force on a rider equals the centripetal force. Which judgement of the claim is correct?",
      "The claim is wrong: the normal force equals the centripetal force plus the rider's weight",
      ["The claim is correct: at the bottom the normal force is the centripetal force",
       "The claim is wrong: the normal force equals the rider's weight only",
       "The claim is wrong: the normal force equals the centripetal force minus the rider's weight"],
      "At the bottom of the loop the equation is N - W = F_c, because the normal force must overcome gravity and still supply the centripetal force. With the same numbers as a typical loop problem, a "+gF(m)+" kg ball at "+gF(v)+" m/s on a "+gF(r)+" m radius needs a centripetal force of "+iF(Fc)+" N and has a weight of "+iF(W)+" N. The normal force is "+iF(Fc)+" + "+iF(W)+" = "+iF(N)+" N, which is the centripetal force plus the weight, not the centripetal force alone. The claim is wrong.",{});
  },
  function(){
    var m=60.0, v=3.00, r=12.0;
    var s=sfR(v*v,4), p=sfR(m*s,4), Fc=sfR(p/r,4);
    return mcq("A student claims that a cyclist can round a completely icy flat curve (no friction at all) as long as they go slowly enough. Which judgement of the claim is correct?",
      "The claim is wrong: with zero friction there is no horizontal force at all, so no centripetal force is available at any speed above zero",
      ["The claim is correct: at a low enough speed, friction is not needed",
       "The claim is wrong: the cyclist would need more friction when going slower, not less",
       "The claim is correct, provided the cyclist leans into the curve"],
      "On a flat curve, friction is the only horizontal force available to supply the centripetal force. Even at a crawl the need is not zero: a "+gF(m)+" kg cyclist at just "+gF(v)+" m/s on a "+gF(r)+" m radius curve needs "+gF(m)+" × "+iF(s)+" = "+iF(p)+" N, then "+iF(p)+" / "+gF(r)+" = "+iF(Fc)+" N of centripetal force. With no friction the road can supply none of it, so the cyclist would continue in a straight line. The claim is wrong.",{});
  },
  function(){
    return mcq("A student claims that the minimum speed at the top of a loop is the speed at which the normal force there is at its largest. Which judgement of the claim is correct?",
      "The claim is wrong: at the minimum speed the normal force is zero, its smallest possible value",
      ["The claim is correct: the track pushes hardest when the car is moving slowest",
       "The claim is wrong: at the minimum speed the normal force equals the car's weight",
       "The claim is wrong: the normal force does not depend on the speed at all"],
      "At the top of a loop, N = m v^2 / r - m g, so the normal force grows as the speed grows. The minimum speed is defined by the car just staying in contact, which is the condition N = 0. Far from being the largest, the normal force at the minimum speed is zero, the smallest it can be. The claim is wrong.",{});
  }
]));

E("u2-62-string-vertical",2,["PH12.6.2"],2,"gen",function(){
  var m=sfR(rf(0.25,0.80),3), v=sfR(rf(3.5,7.5),3), r=sfR(rf(0.50,1.20),3);
  var v24=sfR(v*v,4), a4=sfR(v24/r,4), Fc4=sfR(m*a4,4), W4=sfR(m*9.8,4), T4=sfR(Fc4+W4,4), ans=sfR(T4,3);
  var qq3204 = numq("A ball of mass "+gF(m)+" kg is whirled in a vertical circle of radius "+gF(r)+" m on a string. At the bottom of the circle the ball is moving at "+gF(v)+" m/s. What is the tension in the string at the bottom of the circle? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take toward the centre of the circle as positive. At the bottom, the centre is above the ball, so the tension points toward the centre and gravity points away: T - W = F_c. First find the centripetal force: "+gF(v)+" × "+gF(v)+" = "+iF(v24)+" m^2/s^2, then "+iF(v24)+" / "+gF(r)+" = "+iF(a4)+" m/s^2, then "+gF(m)+" × "+iF(a4)+" = "+iF(Fc4)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. So the tension is "+iF(Fc4)+" + "+iF(W4)+" = "+iF(T4)+" N. The tension at the bottom is "+F3(ans)+" N, greater than the weight, because the string must also supply the centripetal force.",
    {m:m,v:v,r:r}); qq3204.figure = p32figLoop(r,v,m,"bottom"); return qq3204;
});

/* ---------- PH12.6.3 Two-dimensional dynamics: inclines ---------- */

E("u2-63-components-mc",2,["PH12.6.3"],1,"gen",function(){
  var m,ang,rad,W4,sinR,cosR,tanR,par4,ans,opts;
  do {
    m=sfR(rf(4.0,28.0),3); ang=pick([20,25,30,35,40,50,55,60]); rad=ang*Math.PI/180;
    W4=sfR(m*9.8,4); sinR=sfR(Math.sin(rad),3); cosR=sfR(Math.cos(rad),3); tanR=sfR(Math.tan(rad),3);
    par4=sfR(W4*sinR,4); ans=sfR(par4,3);
    opts=[ans,sfR(W4*cosR,3),sfR(W4,3),sfR(W4*tanR,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A block of mass "+gF(m)+" kg rests on a slope inclined at "+ang+" degrees above the horizontal. What is the component of the block's weight acting down the slope?",
    F3(ans)+" N",
    [F3(sfR(W4*cosR,3))+" N", F3(sfR(W4,3))+" N", F3(sfR(W4*tanR,3))+" N"],
    "First find the weight: "+gF(m)+" × 9.8 = "+iF(W4)+" N. The component of weight parallel to the slope uses the sine of the slope angle: "+iF(W4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. The component of the weight acting down the slope is "+F3(ans)+" N. The cosine factor would give the component perpendicular to the slope instead.",
    {m:m,ang:ang}); qq3204.figure = p32figIncline(ang,gF(m)+" kg","components"); return qq3204;
});

E("u2-63-incline-frictionless",2,["PH12.6.3"],2,"gen",function(){
  var m=sfR(rf(2.0,24.0),3), ang=pick([15,20,25,30,35,40]), rad=ang*Math.PI/180;
  var W4=sfR(m*9.8,4), sinR=sfR(Math.sin(rad),3);
  var par4=sfR(W4*sinR,4), a4=sfR(par4/m,4), ans=sfR(a4,3);
  var qq3204 = numq("A sled of mass "+gF(m)+" kg slides down a frictionless slope inclined at "+ang+" degrees above the horizontal. What is the acceleration of the sled down the slope? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "On a frictionless slope, the component of the weight parallel to the slope is the net force. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. Its component down the slope is "+iF(W4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. Newton's second law gives the acceleration: "+iF(par4)+" / "+gF(m)+" = "+iF(a4)+" m/s^2. The acceleration of the sled is "+F3(ans)+" m/s^2 down the slope. Notice the mass cancels in this calculation: any sled would accelerate the same on a frictionless slope of this angle.",
    {m:m,ang:ang}); qq3204.figure = p32figIncline(ang,gF(m)+" kg",""); return qq3204;
});

E("u2-63-incline-friction-cr",2,["PH12.6.3"],2,"gen",function(){
  var m,ang,mu,rad,W4,sinR,cosR,par4,nor4,fr4,net4,a4,ans;
  do {
    m=sfR(rf(3.0,20.0),3); ang=pick([25,30,35,40]); mu=pick([0.120,0.180,0.240,0.300]); rad=ang*Math.PI/180;
    W4=sfR(m*9.8,4); sinR=sfR(Math.sin(rad),3); cosR=sfR(Math.cos(rad),3);
    par4=sfR(W4*sinR,4); nor4=sfR(W4*cosR,4); fr4=sfR(mu*nor4,4); net4=sfR(par4-fr4,4); a4=sfR(net4/m,4);
  } while (a4<1.2);
  ans=sfR(a4,3);
  var qq3204 = numq("A crate of mass "+gF(m)+" kg slides down a slope inclined at "+ang+" degrees above the horizontal. The coefficient of kinetic friction between the crate and the slope is "+gF(mu)+". What is the acceleration of the crate down the slope? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take down the slope as positive. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. Its component down the slope is "+iF(W4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. Its component perpendicular to the slope, which sets the normal force, is "+iF(W4)+" × "+fmt(cosR,3)+" = "+iF(nor4)+" N. Kinetic friction acts up the slope with magnitude "+gF(mu)+" × "+iF(nor4)+" = "+iF(fr4)+" N. The net force down the slope is "+iF(par4)+" - "+iF(fr4)+" = "+iF(net4)+" N. Newton's second law gives the acceleration: "+iF(net4)+" / "+gF(m)+" = "+iF(a4)+" m/s^2. The acceleration of the crate is "+F3(ans)+" m/s^2 down the slope.",
    {m:m,ang:ang,mu:mu}); qq3204.figure = p32figIncline(ang,gF(m)+" kg","friction"); return qq3204;
});

E("u2-63-slip-angle",2,["PH12.6.3"],2,"gen",function(){
  var ang=ri(16,35), rad=ang*Math.PI/180;
  var ctx=pick(["a wooden crate rests on a plywood board","a textbook rests on a wooden board","a rubber-soled shoe rests on a painted board","a hockey puck rests on a varnished board","a brick rests on a rough pine board","a storage bin rests on a melamine board"]);
  var tan4=sfR(Math.tan(rad),4), s4=sfR(Math.sin(rad),4), c4=sfR(Math.cos(rad),4);
  var mu=sfR(tan4,3), opts=[mu,sfR(s4,3),sfR(c4,3),sfR(1/tan4,3)].map(function(x){return F3(x);});
  var qq3204 = mcq("In a friction test, "+ctx+" and one end of the board is slowly raised. The object begins to slip when the board makes an angle of "+ang+" degrees with the horizontal. What is the coefficient of static friction for this pair of surfaces?",
    F3(mu),
    [F3(sfR(s4,3)), F3(sfR(c4,3)), F3(sfR(1/tan4,3))],
    "At the angle where slipping just begins, the component of weight down the slope has grown to equal the maximum static friction: m g sin of the angle equals mu_s times m g cos of the angle. The mass and g cancel, leaving mu_s equal to the tangent of the slip angle. For an angle of "+ang+" degrees, the tangent is "+iF(tan4)+". The coefficient of static friction is "+F3(mu)+".",
    {ang:ang}); qq3204.figure = p32figIncline(ang,"",""); return qq3204;
});

E("u2-63-push-up",2,["PH12.6.3"],2,"gen",function(){
  var m=sfR(rf(6.0,22.0),3), ang=pick([15,20,25,30]), mu=pick([0.150,0.220,0.280,0.340]), rad=ang*Math.PI/180;
  var W4=sfR(m*9.8,4), sinR=sfR(Math.sin(rad),3), cosR=sfR(Math.cos(rad),3);
  var par4=sfR(W4*sinR,4), nor4=sfR(W4*cosR,4), fr4=sfR(mu*nor4,4), F4=sfR(par4+fr4,4), ans=sfR(F4,3);
  var qq3204 = numq("A worker pushes a crate of mass "+gF(m)+" kg up a loading ramp inclined at "+ang+" degrees above the horizontal, pushing parallel to the ramp. The crate moves up the ramp at a constant speed. The coefficient of kinetic friction between the crate and the ramp is "+gF(mu)+". What force must the worker exert? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Because the crate moves at a constant speed, its acceleration is zero, so the forces along the ramp balance. Take up the ramp as positive. The weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N. Its component down the ramp is "+iF(W4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. The normal force is the perpendicular component, "+iF(W4)+" × "+fmt(cosR,3)+" = "+iF(nor4)+" N, so kinetic friction is "+gF(mu)+" × "+iF(nor4)+" = "+iF(fr4)+" N, pointing down the ramp because it opposes the motion up. The push must balance both: "+iF(par4)+" + "+iF(fr4)+" = "+iF(F4)+" N. The worker must exert "+F3(ans)+" N.",
    {m:m,ang:ang,mu:mu}); qq3204.figure = p32figIncline(ang,gF(m)+" kg","push"); return qq3204;
});

E("u2-63-pulley-horizontal",2,["PH12.6.3"],2,"gen",function(){
  var mt=sfR(rf(2.0,9.0),3), mh=sfR(rf(1.0,8.0),3);
  var Wh4=sfR(mh*9.8,4), tot4=sfR(mt+mh,4), a4=sfR(Wh4/tot4,4), ans=sfR(a4,3);
  var qq3204 = numq("A block of mass "+gF(mt)+" kg on a frictionless horizontal table is connected by a string over a pulley at the edge of the table to a hanging mass of "+gF(mh)+" kg. What is the acceleration of the system? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The only external force driving the system is the weight of the hanging mass: "+gF(mh)+" × 9.8 = "+iF(Wh4)+" N. Both masses accelerate together, so the total mass being accelerated is "+gF(mt)+" + "+gF(mh)+" = "+iF(tot4)+" kg. Newton's second law for the whole system gives the acceleration: "+iF(Wh4)+" / "+iF(tot4)+" = "+iF(a4)+" m/s^2. The acceleration of the system is "+F3(ans)+" m/s^2, with the table block moving toward the pulley and the hanging mass moving down.",
    {mt:mt,mh:mh}); qq3204.figure = p32figPulleyH(mt,mh); return qq3204;
});

E("u2-63-pulley-tension-mc",2,["PH12.6.3"],2,"gen",function(){
  var mt,mh,Wh4,tot4,a4,T4,T,opts;
  do {
    mt=sfR(rf(2.0,9.0),3); mh=sfR(rf(1.0,8.0),3);
    Wh4=sfR(mh*9.8,4); tot4=sfR(mt+mh,4); a4=sfR(Wh4/tot4,4); T4=sfR(mt*a4,4); T=sfR(T4,3);
    opts=[T,sfR(Wh4,3),sfR(mh*a4,3),sfR(mt*9.8,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A block of mass "+gF(mt)+" kg on a frictionless horizontal table is connected by a string over a pulley at the edge of the table to a hanging mass of "+gF(mh)+" kg. What is the tension in the string?",
    F3(T)+" N",
    [F3(sfR(Wh4,3))+" N", F3(sfR(mh*a4,3))+" N", F3(sfR(mt*9.8,3))+" N"],
    "First find the acceleration of the system. The hanging weight is "+gF(mh)+" × 9.8 = "+iF(Wh4)+" N, and the total mass is "+gF(mt)+" + "+gF(mh)+" = "+iF(tot4)+" kg, so the acceleration is "+iF(Wh4)+" / "+iF(tot4)+" = "+iF(a4)+" m/s^2. The tension is the only horizontal force on the table block, so for that block alone, T = m a: "+gF(mt)+" × "+iF(a4)+" = "+iF(T4)+" N. The tension in the string is "+F3(T)+" N, less than the hanging weight, because the hanging mass is accelerating downward.",
    {mt:mt,mh:mh}); qq3204.figure = p32figPulleyH(mt,mh); return qq3204;
});

E("u2-63-pulley-cr",2,["PH12.6.3"],3,"gen",function(){
  var mi,mh,ang,mu,rad,sinR,cosR,Wh4,Wi4,par4,nor4,fr4,net1,net4,tot4,a4,ans;
  do {
    mi=sfR(rf(3.0,9.0),3); mh=sfR(rf(6.0,14.0),3); ang=pick([20,25,30]); mu=pick([0.100,0.160,0.220]); rad=ang*Math.PI/180;
    sinR=sfR(Math.sin(rad),3); cosR=sfR(Math.cos(rad),3);
    Wh4=sfR(mh*9.8,4); Wi4=sfR(mi*9.8,4); par4=sfR(Wi4*sinR,4); nor4=sfR(Wi4*cosR,4); fr4=sfR(mu*nor4,4);
    net1=sfR(Wh4-par4,4); net4=sfR(net1-fr4,4); tot4=sfR(mi+mh,4); a4=sfR(net4/tot4,4);
  } while (net4<8 || net1<fr4+4);
  ans=sfR(a4,3);
  var gma4=sfR(9.8-a4,4), T4=sfR(mh*gma4,4), T=sfR(T4,3);
  var qq3204 = numq("A block of mass "+gF(mi)+" kg sits on a slope inclined at "+ang+" degrees above the horizontal. A string attached to the block runs up the slope and over a pulley at the top, and a mass of "+gF(mh)+" kg hangs from the other end. The hanging mass falls, pulling the block up the slope. The coefficient of kinetic friction between the block and the slope is "+gF(mu)+". What is the acceleration of the system? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Treat the two masses as one system and take the direction of motion as positive. The driving force is the hanging weight: "+gF(mh)+" × 9.8 = "+iF(Wh4)+" N. The block's weight is "+gF(mi)+" × 9.8 = "+iF(Wi4)+" N. Its component down the slope, opposing the motion, is "+iF(Wi4)+" × "+fmt(sinR,3)+" = "+iF(par4)+" N. The normal force on the block is "+iF(Wi4)+" × "+fmt(cosR,3)+" = "+iF(nor4)+" N, so kinetic friction, also opposing the motion, is "+gF(mu)+" × "+iF(nor4)+" = "+iF(fr4)+" N. The net force is "+iF(Wh4)+" - "+iF(par4)+" = "+iF(net1)+" N, then "+iF(net1)+" - "+iF(fr4)+" = "+iF(net4)+" N. The total mass is "+gF(mi)+" + "+gF(mh)+" = "+iF(tot4)+" kg, so the acceleration is "+iF(net4)+" / "+iF(tot4)+" = "+iF(a4)+" m/s^2. The acceleration of the system is "+F3(ans)+" m/s^2. (As a check, the tension follows from the hanging mass alone: 9.8 - "+iF(a4)+" = "+iF(gma4)+" m/s^2, and "+gF(mh)+" × "+iF(gma4)+" = "+iF(T4)+" N, so the tension is "+F3(T)+" N.)",
    {mi:mi,mh:mh,ang:ang,mu:mu}); qq3204.figure = p32figPulleyIncline(mi,mh,ang,mu); return qq3204;
});

E("u2-63-judge",2,["PH12.6.3"],3,"var",varset([
  function(){
    var mt=4.00, mh=2.00;
    var Wh=sfR(mh*9.8,4), tot=sfR(mt+mh,4), a=sfR(Wh/tot,4), T=sfR(mt*a,4);
    return mcq("A student analyses a block on a frictionless table pulled by a hanging mass over a pulley, and claims the tension in the string equals the weight of the hanging mass. Which judgement of the claim is correct?",
      "The claim is wrong: the tension is less than the hanging weight whenever the system accelerates, because part of the weight is needed to accelerate the hanging mass itself",
      ["The claim is correct: tension always equals the weight of whatever hangs from a string",
       "The claim is wrong: the tension is greater than the hanging weight",
       "The claim is correct, as long as the table is frictionless"],
      "Test the claim with numbers: a "+gF(mt)+" kg block and a "+gF(mh)+" kg hanging mass. The hanging weight is "+gF(mh)+" × 9.8 = "+iF(Wh)+" N, the total mass is "+iF(tot)+" kg, so the acceleration is "+iF(Wh)+" / "+iF(tot)+" = "+iF(a)+" m/s^2. The tension is the only horizontal force on the table block: "+gF(mt)+" × "+iF(a)+" = "+iF(T)+" N, which is less than the hanging weight of "+iF(Wh)+" N. The tension would equal the weight only if the acceleration were zero. The claim is wrong.",{});
  },
  function(){
    var mt=4.00, mh=2.00;
    var Wh1=sfR(mh*9.8,4), tot1=sfR(mt+mh,4), a1=sfR(Wh1/tot1,4);
    var Wh2=sfR(2*mh*9.8,4), tot2=sfR(2*mt+2*mh,4), a2=sfR(Wh2/tot2,4);
    return mcq("A student claims that if both masses in a table-and-hanging-mass pulley system are doubled, the acceleration of the system doubles. Which judgement of the claim is correct?",
      "The claim is wrong: the acceleration stays the same, because doubling the hanging weight also doubles the total mass being accelerated",
      ["The claim is correct: twice the hanging weight means twice the acceleration",
       "The claim is wrong: the acceleration is halved, because there is more mass to move",
       "The claim is wrong: the acceleration becomes four times as large"],
      "Check with numbers. Originally, a "+gF(mh)+" kg hanging mass gives a weight of "+gF(mh)+" × 9.8 = "+iF(Wh1)+" N over a total mass of "+iF(tot1)+" kg, so the acceleration is "+iF(Wh1)+" / "+iF(tot1)+" = "+iF(a1)+" m/s^2. Doubling both masses gives a weight of "+iF(Wh2)+" N over a total of "+iF(tot2)+" kg, and the acceleration is "+iF(Wh2)+" / "+iF(tot2)+" = "+iF(a2)+" m/s^2, exactly the same. The claim is wrong.",{});
  },
  function(){
    var m=5.00, ang=20, rad=ang*Math.PI/180;
    var W=sfR(m*9.8,4), sinR=sfR(Math.sin(rad),3), cosR=sfR(Math.cos(rad),3);
    var par=sfR(W*sinR,4), nor=sfR(W*cosR,4), fmax=sfR(0.500*nor,4);
    return mcq("A block rests at rest on a slope. A student claims the friction force on the block must equal mu_s times the normal force, because that is the friction formula. Which judgement of the claim is correct?",
      "The claim is wrong: mu_s times the normal force is only the maximum static friction; the actual friction adjusts to match the downslope pull, up to that maximum",
      ["The claim is correct: friction always equals mu_s times the normal force",
       "The claim is wrong: there is no friction on a block at rest",
       "The claim is correct, but only on slopes below 30 degrees"],
      "Static friction is a responsive force: it matches what is needed, up to its maximum. For a "+gF(m)+" kg block on a "+ang+" degree slope, the weight is "+gF(m)+" × 9.8 = "+iF(W)+" N. The downslope component that friction must match is "+iF(W)+" × "+fmt(sinR,3)+" = "+iF(par)+" N. The maximum available is 0.500 × "+iF(nor)+" = "+iF(fmax)+" N, using the normal force of "+iF(W)+" × "+fmt(cosR,3)+" = "+iF(nor)+" N. Since "+iF(par)+" N is less than the maximum of "+iF(fmax)+" N, the friction is "+iF(par)+" N, not the maximum. The claim is wrong.",{});
  },
  function(){
    var ang=30, rad=ang*Math.PI/180;
    var sinR=sfR(Math.sin(rad),3), a=sfR(9.8*sinR,4);
    return mcq("A student claims that a heavy sled will accelerate down a frictionless slope faster than a light sled, because its larger weight gives a larger downslope force. Which judgement of the claim is correct?",
      "The claim is wrong: the acceleration is g sin of the slope angle for both, because the larger force acts on a proportionally larger mass",
      ["The claim is correct: more weight always means more acceleration",
       "The claim is wrong: the lighter sled accelerates faster, because it has less inertia",
       "The claim is correct, but only if the slope is steep"],
      "The downslope force is m g sin of the angle, and Newton's second law divides it by the same mass: a = g sin of the angle, with the mass cancelling. On a "+ang+" degree slope the acceleration is 9.8 × "+fmt(sinR,3)+" = "+iF(a)+" m/s^2 for a sled of any mass. The heavier sled does have a larger downslope force, but it has proportionally more mass to accelerate. The claim is wrong.",{});
  }
]));

/* ---------- PH12.6.4 Static equilibrium and torques ---------- */

E("u2-64-torque-basic",2,["PH12.6.4"],1,"gen",function(){
  var F=sfR(rf(25.0,180.0),3), d=sfR(rf(0.15,0.55),3);
  var tau4=sfR(F*d,4), ans=sfR(tau4,3);
  var qq3204 = numq("A mechanic pulls perpendicular to a wrench handle at a point "+gF(d)+" m from the centre of a bolt, with a force of "+gF(F)+" N. What torque does the mechanic apply to the bolt? Give your answer in N·m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Torque is the force multiplied by the lever arm when the force is applied perpendicular to the handle: "+gF(F)+" × "+gF(d)+" = "+iF(tau4)+" N·m. The torque applied to the bolt is "+F3(ans)+" N·m.",
    {F:F,d:d}); qq3204.figure = p32figWrench(F,d,null); return qq3204;
});

E("u2-64-equilibrium-concept",2,["PH12.6.4"],1,"var",varset([
  function(){
    return mcq("An object is in static equilibrium. Which pair of conditions must both hold?",
      "The net force is zero and the net torque about any point is zero",
      ["The net force is zero, and the object must be at the centre of its supports",
       "The net torque is zero, and all the forces must be equal in pairs",
       "The net force is zero and the net torque is zero only about the centre of mass"],
      "Static equilibrium requires both translational and rotational balance: the vector sum of the forces is zero, so the object does not accelerate, and the sum of the torques about any point is zero, so it does not start to rotate. Either condition alone is not enough.",{});
  },
  function(){
    return mcq("A beam has forces on it that add to zero, but the torques about its left end add up to a nonzero clockwise value. The beam is",
      "Not in equilibrium: it will begin to rotate clockwise",
      ["In equilibrium, because the forces balance",
       "In equilibrium, because torque does not affect a beam",
       "Moving at a constant velocity in a straight line"],
      "Balanced forces alone do not guarantee equilibrium. A nonzero net torque produces a rotational acceleration, so the beam will start to rotate clockwise. Equilibrium needs the net torque to be zero as well as the net force.",{});
  },
  function(){
    return mcq("A door is pushed with a large force directed straight at the hinges, along the plane of the door through the hinge line. The torque of this force about the hinges is",
      "Zero, because the force has no lever arm about the hinges",
      ["Very large, because the force is large",
       "Equal to the force times the width of the door",
       "Equal to the force times the distance to the door handle"],
      "Torque depends on the lever arm, the perpendicular distance from the pivot to the line of the force. A force whose line passes through the pivot has a lever arm of zero, so its torque is zero no matter how large the force is. That is why pushing a door toward its hinges does not swing it.",{});
  },
  function(){
    return mcq("Which of the following is an example of static equilibrium?",
      "A ladder leaning against a wall, at rest, with friction at its foot",
      ["A ladder sliding down a wall at a steady speed",
       "A ladder falling away from a wall",
       "A ladder being carried up a flight of stairs at a steady speed"],
      "Static equilibrium means the object is at rest with zero net force and zero net torque. The leaning ladder at rest qualifies: its weight, the wall's push, the ground's normal force and friction balance as forces, and their torques about any point also balance. The other ladders are moving or accelerating.",{});
  }
]));

E("u2-64-wires-cr",2,["PH12.6.4"],2,"gen",function(){
  var L=sfR(rf(1.6,2.4),3), m=sfR(rf(18.0,42.0),3), d=sfR(L*rf(0.58,0.75),3);
  var W4=sfR(m*9.8,4), prod4=sfR(W4*d,4), TR4=sfR(prod4/L,4), TL4=sfR(W4-TR4,4), ans=sfR(TR4,3);
  var qq3204 = numq("A shop sign of mass "+gF(m)+" kg hangs from two vertical wires attached at its top corners, "+gF(L)+" m apart. The sign's centre of mass is "+gF(d)+" m from the left-hand wire. What is the tension in the right-hand wire? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The sign is in equilibrium, so the torques about any point balance. Take torques about the left-hand wire, so the left tension contributes no torque. The sign's weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N, acting at the centre of mass. Torque balance gives T_right × "+gF(L)+" = "+iF(W4)+" × "+gF(d)+", and the right side is "+iF(W4)+" × "+gF(d)+" = "+iF(prod4)+" N·m. So the tension in the right-hand wire is "+iF(prod4)+" / "+gF(L)+" = "+iF(TR4)+" N. The tension in the right-hand wire is "+F3(ans)+" N (and the left wire carries the rest, "+iF(W4)+" - "+iF(TR4)+" = "+iF(TL4)+" N, since the centre of mass is closer to the right wire, that wire carries more).",
    {L:L,m:m,d:d}); qq3204.figure = p32figSign(L,m,d); return qq3204;
});

E("u2-64-seesaw",2,["PH12.6.4"],2,"gen",function(){
  var m1,d1,m2,prod4,d2_4,ans;
  do {
    m1=sfR(rf(24.0,44.0),3); d1=sfR(rf(1.2,2.0),3); m2=sfR(rf(18.0,38.0),3);
    prod4=sfR(m1*d1,4); d2_4=sfR(prod4/m2,4);
  } while (d2_4>2.3 || d2_4<0.8);
  ans=sfR(d2_4,3);
  var qq3204 = numq("A child of mass "+gF(m1)+" kg sits "+gF(d1)+" m from the pivot of a seesaw. A second child of mass "+gF(m2)+" kg sits on the other side. How far from the pivot must the second child sit for the seesaw to balance? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "For the seesaw to balance, the torques about the pivot must be equal and opposite. Each torque is the child's weight times their distance, and since both weights carry the same factor of g, the balance condition reduces to m1 d1 = m2 d2. The first child's product is "+gF(m1)+" × "+gF(d1)+" = "+iF(prod4)+" kg·m. So the second child's distance is "+iF(prod4)+" / "+gF(m2)+" = "+iF(d2_4)+" m. The second child must sit "+F3(ans)+" m from the pivot.",
    {m1:m1,d1:d1,m2:m2}); qq3204.figure = p32figSeesaw(m1,d1,m2); return qq3204;
});

E("u2-64-metre-stick",2,["PH12.6.4"],2,"gen",function(){
  var p,ms,dR,prod4,mh4,ans,opts;
  do {
    p=pick([0.300,0.350,0.400]); ms=sfR(rf(0.120,0.480),3); dR=sfR(0.500-p,4);
    prod4=sfR(ms*dR,4); mh4=sfR(prod4/p,4); ans=sfR(mh4,3);
    opts=[ans,sfR(ms*p/dR,3),sfR(prod4,3),sfR(ms/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A uniform metre stick of mass "+gF(ms)+" kg is pivoted at the "+fmt(p*100,0)+" cm mark. A mass hung at the 0 cm end balances the stick. What mass is needed?",
    F3(ans)+" kg",
    [F3(sfR(ms*p/dR,3))+" kg", F3(sfR(prod4,3))+" kg", F3(sfR(ms/2,3))+" kg"],
    "The stick is uniform, so its weight acts at its centre, the 50 cm mark, which is "+gF(dR)+" m to the right of the pivot. The hanging mass acts at the 0 cm end, "+gF(p)+" m to the left of the pivot. Torque balance gives m_hang × "+gF(p)+" = "+gF(ms)+" × "+gF(dR)+". The right side is "+gF(ms)+" × "+gF(dR)+" = "+iF(prod4)+" kg·m, so the hanging mass is "+iF(prod4)+" / "+gF(p)+" = "+iF(mh4)+" kg. The mass needed is "+F3(ans)+" kg.",
    {p:p,ms:ms}); qq3204.figure = p32figMetreStick(p,ms); return qq3204;
});

E("u2-64-beam-cr",2,["PH12.6.4"],2,"gen",function(){
  var L=sfR(rf(3.0,4.0),3), mb=sfR(rf(12.0,20.0),3), ml=sfR(rf(15.0,25.0),3), x=sfR(rf(1.2,2.0),3);
  var Wb4=sfR(mb*9.8,4), Wl4=sfR(ml*9.8,4);
  var t1=sfR(Wb4*(L/2),4), t2=sfR(Wl4*x,4), sum4=sfR(t1+t2,4), RR4=sfR(sum4/L,4);
  var tot4=sfR(Wb4+Wl4,4), RL4=sfR(tot4-RR4,4), ans=sfR(RR4,3);
  var qq3204 = numq("A uniform scaffold plank of length "+gF(L)+" m and mass "+gF(mb)+" kg rests on supports at its two ends. A crate of mass "+gF(ml)+" kg sits on the plank "+gF(x)+" m from the left-hand support. What is the upward force exerted by the right-hand support? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Take torques about the left-hand support, so the left support force contributes no torque. The plank's weight is "+gF(mb)+" × 9.8 = "+iF(Wb4)+" N, acting at the plank's centre, "+gF(L/2)+" m from the left support, giving a torque of "+iF(Wb4)+" × "+gF(L/2)+" = "+iF(t1)+" N·m. The crate's weight is "+gF(ml)+" × 9.8 = "+iF(Wl4)+" N, giving a torque of "+iF(Wl4)+" × "+gF(x)+" = "+iF(t2)+" N·m. The total clockwise torque is "+iF(t1)+" + "+iF(t2)+" = "+iF(sum4)+" N·m. The right support force balances this over the full length: "+iF(sum4)+" / "+gF(L)+" = "+iF(RR4)+" N. The right-hand support exerts "+F3(ans)+" N (and the left support carries the remainder, "+iF(tot4)+" - "+iF(RR4)+" = "+iF(RL4)+" N, out of a total weight of "+iF(Wb4)+" + "+iF(Wl4)+" = "+iF(tot4)+" N).",
    {L:L,mb:mb,ml:ml,x:x}); qq3204.figure = p32figBeam(L,mb,ml,x); return qq3204;
});

E("u2-64-angled-torque",2,["PH12.6.4"],2,"gen",function(){
  var F=sfR(rf(30.0,110.0),3), d=sfR(rf(0.25,0.60),3), phi=pick([35,40,50,55,65]), rad=phi*Math.PI/180;
  var sinR=sfR(Math.sin(rad),3);
  var prod4=sfR(F*d,4), tau4=sfR(prod4*sinR,4), ans=sfR(tau4,3);
  var qq3204 = numq("A gardener pulls on a wrench handle of length "+gF(d)+" m with a force of "+gF(F)+" N. The force is applied at the end of the handle, at an angle of "+phi+" degrees to the handle. What is the torque about the bolt? Give your answer in N·m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Only the component of the force perpendicular to the handle produces torque; the component along the handle just pulls along the wrench. The perpendicular component carries the sine of the angle to the handle. First, force times lever arm: "+gF(F)+" × "+gF(d)+" = "+iF(prod4)+" N·m. Then apply the sine factor: "+iF(prod4)+" × "+fmt(sinR,3)+" = "+iF(tau4)+" N·m. The torque about the bolt is "+F3(ans)+" N·m, less than it would be for a perpendicular pull at the same force.",
    {F:F,d:d,phi:phi}); qq3204.figure = p32figWrench(F,d,phi); return qq3204;
});

E("u2-64-bridge-mc",2,["PH12.6.4"],2,"gen",function(){
  var mb,mw,Wb4,Ww4,tot4,R4,ans,opts;
  do {
    mb=sfR(rf(12.0,18.0),3); mw=sfR(rf(50.0,75.0),3);
    Wb4=sfR(mb*9.8,4); Ww4=sfR(mw*9.8,4); tot4=sfR(Wb4+Ww4,4); R4=sfR(tot4/2,4); ans=sfR(R4,3);
    opts=[ans,sfR(tot4,3),sfR(sfR(Ww4/2,4)+Wb4,3),sfR(Wb4/2,3)].map(function(x){return F3(x);});
  } while (new Set(opts).size<4);
  var qq3204 = mcq("A uniform plank of mass "+gF(mb)+" kg rests on supports at both ends, forming a small bridge. A worker of mass "+gF(mw)+" kg stands at the centre of the plank. What is the upward force at each support?",
    F3(ans)+" N",
    [F3(sfR(tot4,3))+" N", F3(sfR(sfR(Ww4/2,4)+Wb4,3))+" N", F3(sfR(Wb4/2,3))+" N"],
    "The worker stands at the centre and the plank is uniform, so by symmetry the two supports share the total weight equally. The plank's weight is "+gF(mb)+" × 9.8 = "+iF(Wb4)+" N and the worker's weight is "+gF(mw)+" × 9.8 = "+iF(Ww4)+" N. The total weight is "+iF(Wb4)+" + "+iF(Ww4)+" = "+iF(tot4)+" N. Each support carries half: "+iF(tot4)+" / 2 = "+iF(R4)+" N. The upward force at each support is "+F3(ans)+" N.",
    {mb:mb,mw:mw}); qq3204.figure = p32figBridge(mb,mw); return qq3204;
});

E("u2-64-ladder-cr",2,["PH12.6.4"],3,"gen",function(){
  var m=sfR(rf(11.0,17.0),3), ang=pick([55,60,65,70]), L=pick([4.0,5.0,6.0]), rad=ang*Math.PI/180;
  var tanR=sfR(Math.tan(rad),3);
  var W4=sfR(m*9.8,4), half4=sfR(W4/2,4), Nw4=sfR(half4/tanR,4), ans=sfR(Nw4,3);
  var qq3204 = numq("A uniform ladder of mass "+gF(m)+" kg and length "+gF(L)+" m leans against a smooth vertical wall, making an angle of "+ang+" degrees with the ground. The wall is smooth, so it can exert only a horizontal force on the ladder. What friction force must the ground exert at the foot of the ladder to keep it in equilibrium? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Because the wall is smooth, it pushes horizontally on the top of the ladder; call that force N_w. Horizontally, the only other force is friction at the foot, so the friction force must equal N_w. Find N_w from the torques about the foot of the ladder, where friction and the ground's normal force contribute no torque. The ladder's weight is "+gF(m)+" × 9.8 = "+iF(W4)+" N, acting at the ladder's midpoint. Torque balance gives N_w = W / (2 tan of the angle): half the weight is "+iF(W4)+" / 2 = "+iF(half4)+" N, and dividing by the tangent factor, "+iF(half4)+" / "+fmt(tanR,3)+" = "+iF(Nw4)+" N. So the wall pushes with "+iF(Nw4)+" N, and the ground must exert a friction force of "+F3(ans)+" N at the foot, directed toward the wall.",
    {m:m,ang:ang,L:L}); qq3204.figure = p32figLadder(m,ang,L); return qq3204;
});
