// Diagram figures (Phase C, Nov 2026): force diagrams, angled force scenes, Atwood, connected crates, elevator and force time graphs added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// Physics 2204 Unit 2 Dynamics question bank
// CRMARKS: u2-62-multistep-cr=5
// CRMARKS: u2-65-collision-cr=4
// CRMARKS: u2-63-impulse-cr=4
// CRMARKS: u2-61-netforce-cr=3
// CRMARKS: u2-62-friction-cr=3
// CRMARKS: u2-65-stick-cr=2

/* ---------- PH11.6.1 Vectors for force and acceleration ---------- */

E("u2-61-fbd-select",2,["PH11.6.1"],1,"var",varset([
  function(){
    var q=mcq("A book rests on a horizontal table. Which list gives all the forces acting on the book?",
      "Gravity pulling down and the normal force from the table pushing up",
      ["Gravity pulling down, the normal force pushing up, and a forward force keeping it on the table",
       "Gravity pulling down only, because the book is not moving",
       "The normal force pushing up only, because gravity is cancelled before it acts"],
      "A resting book has two forces: its weight, gravity pulling down toward Earth, and the normal force from the table surface pushing up. There is no horizontal force, and no force is needed to keep a stationary object in place. Gravity pulling down and the normal force pushing up is the complete list.",{});
    q.figure=p22Scene("book");return q;
  },
  function(){
    var q=mcq("A hockey puck slides east across rough ice and slows down. Which list gives all the forces acting on the puck while it slides?",
      "Gravity down, the normal force up, and friction pointing west",
      ["Gravity down, the normal force up, friction pointing west, and a sliding force pointing east",
       "Gravity down and friction pointing west only",
       "Gravity down, the normal force up, and friction pointing east"],
      "The puck is supported by the ice, so gravity down and the normal force up both act. Kinetic friction opposes the sliding, so it points west while the puck moves east. Motion itself is not a force, so there is no extra sliding force. Gravity down, the normal force up, and friction pointing west is the complete list.",{});
    q.figure=p22Scene("puck");return q;
  },
  function(){
    var q=mcq("A crate is pulled east across a horizontal floor by a rope, and friction acts on the crate. Which list gives all the forces acting on the crate?",
      "Gravity down, the normal force up, the rope pull east, and friction west",
      ["Gravity down, the rope pull east, and friction west",
       "The rope pull east and friction west only, because vertical forces do not count",
       "Gravity down, the normal force up, the rope pull east, and friction east"],
      "Four forces act: weight down, the floor pushing up with the normal force, the applied rope pull east, and friction west opposing the motion. Leaving out the vertical pair would make the diagram incomplete, even though those two forces balance. Gravity down, the normal force up, the rope pull east, and friction west is the complete list.",{});
    q.figure=p22Scene("crate");return q;
  },
  function(){
    var q=mcq("A dropped ball is falling toward the ground, and air resistance is ignored. Which list gives all the forces acting on the ball while it falls?",
      "Gravity pulling down only",
      ["Gravity pulling down and a falling force pulling down",
       "Gravity pulling down and the normal force pushing up",
       "No forces, because the ball is not touching anything"],
      "With air resistance ignored, the only force on a falling ball is gravity. There is no surface, so there is no normal force, and falling is the motion that gravity causes, not a second force. Gravity pulling down only is the complete list.",{});
    q.figure=p22Scene("ball");return q;
  },
  function(){
    var m=ri(2,9);
    var q=mcq("A "+m+" kg bucket hangs at rest from a rope. Which list gives all the forces acting on the bucket?",
      "Gravity pulling down and tension in the rope pulling up",
      ["Gravity pulling down only, because the bucket is hanging in the air",
       "Tension pulling up only, because the rope holds the bucket",
       "Gravity pulling down, tension pulling up, and the normal force pushing up"],
      "The bucket is pulled down by gravity and pulled up by tension in the rope. Those two balanced forces keep it at rest. There is no surface under the bucket, so there is no normal force. Gravity pulling down and tension pulling up is the complete list.",{m:m});
    q.figure=p22Scene("bucket");return q;
  }
]));

E("u2-61-netforce-collinear",2,["PH11.6.1"],2,"gen",function(){
  var A=ri(24,92),B=ri(10,58),C=ri(6,42);
  var net=A-B+C; if(net===0){A+=11; net=A-B+C;}
  var s1=sfR(A+C,4), net4=sfR(s1-B,4), ans=sfR(net,3);
  var q=numq("Take east as positive. A sled is pulled east with a force of "+gF(A)+" N, pushed east with a force of "+gF(C)+" N, and friction pulls west with a force of "+gF(B)+" N. What is the net force on the sled? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Add the forces with signs, east positive. First add the two eastward forces: "+gF(A)+" + "+gF(C)+" = "+iF(s1)+" N. Then include the westward friction: "+iF(s1)+" - "+gF(B)+" = "+iF(net4)+" N. The net force is "+F3(ans)+" N, and a positive sign means the net force points east.",
    {A:A,B:B,C:C});
    q.figure=p22FBD([{dx:1,dy:0,len:A,t:"pull "+gF(A)+" N",oy:-14},{dx:1,dy:0,len:C,t:"push "+gF(C)+" N",oy:14},{dx:-1,dy:0,len:B,t:"friction "+gF(B)+" N",oy:0}],"sled");return q;
});

E("u2-61-resolve-component",2,["PH11.6.1"],2,"gen",function(){
  var F=sfR(rf(28.0,124),3), ang=pick([22,28,33,38,44,52,58]), horiz=ri(0,1)===0;
  var rad=ang*Math.PI/180;
  var trigR=horiz?sfR(Math.cos(rad),3):sfR(Math.sin(rad),3);
  var comp=sfR(F*trigR,4), ans=sfR(comp,3);
  var compName=horiz?"horizontal":"vertical", trigName=horiz?"cosine":"sine";
  var q=numq("A rope pulls a toboggan with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal. What is the "+compName+" component of the pull? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Resolve the angled pull into components. The "+compName+" component uses the "+trigName+" of the angle: "+gF(F)+" × "+fmt(trigR,3)+" = "+iF(comp)+" N. The "+compName+" component of the pull is "+F3(ans)+" N.",
    {F:F,ang:ang,horiz:horiz});
    q.figure=p22VecAng(gF(F)+" N",ang);return q;
});

E("u2-61-netforce-components-mc",2,["PH11.6.1"],2,"gen",function(){
  var F1=sfR(rf(35.0,85.0),3), F2=sfR(rf(30.0,75.0),3), a1=pick([20,25,30,35,40]), a2=pick([15,20,25,30,35,40]);
  var c1=sfR(Math.cos(a1*Math.PI/180),3), c2=sfR(Math.cos(a2*Math.PI/180),3);
  var s1=sfR(Math.sin(a1*Math.PI/180),3), s2=sfR(Math.sin(a2*Math.PI/180),3);
  var x1=sfR(F1*c1,4), x2=sfR(F2*c2,4), ysum=sfR(sfR(F1*s1,4)+sfR(F2*s2,4),4);
  var netx=sfR(x1+x2,4), ans=sfR(netx,3);
  var full=sfR(F1+F2,3);
  var q=mcq("Two workers pull a fishing stage trolley eastward. One pulls with "+gF(F1)+" N at "+a1+" degrees north of east, and the other pulls with "+gF(F2)+" N at "+a2+" degrees south of east. What is the net force in the eastward direction?",
    F3(ans)+" N east",
    [F3(full)+" N east",
     F3(sfR(ans*2,3))+" N east",
     F3(x1)+" N east"],
    "Only the eastward components add to the eastward net force. The first eastward component is "+gF(F1)+" × "+fmt(c1,3)+" = "+iF(x1)+" N. The second eastward component is "+gF(F2)+" × "+fmt(c2,3)+" = "+iF(x2)+" N. Adding the eastward components: "+iF(x1)+" + "+iF(x2)+" = "+iF(netx)+" N. The net force in the eastward direction is "+F3(ans)+" N east. The northward and southward components are not part of this total.",
    {F1:F1,F2:F2,a1:a1,a2:a2});
    q.figure=p22VecPair(gF(F1)+" N",a1,gF(F2)+" N",a2);return q;
});

E("u2-61-netforce-cr",2,["PH11.6.1"],2,"gen",function(){
  var m=sfR(rf(8.0,20.0),3), F, ang, mu, rad, cosR, sinR, Fx, Fy, wt, FN, fr, Fnet;
  do { // resample until the pull clearly beats friction: the crate must actually accelerate forward
    F=sfR(rf(40.0,95.0),3); ang=pick([25,30,35]); mu=pick([0.120,0.180,0.240,0.300]);
    rad=ang*Math.PI/180; cosR=sfR(Math.cos(rad),3); sinR=sfR(Math.sin(rad),3);
    Fx=sfR(F*cosR,4); Fy=sfR(F*sinR,4);
    wt=sfR(m*9.8,4); FN=sfR(wt-Fy,4); fr=sfR(mu*FN,4); Fnet=sfR(Fx-fr,4);
  } while (Fnet<6);
  var ans=sfR(Fnet/m,3);
  var q=numq("A crate of mass "+gF(m)+" kg sits on a horizontal floor. A rope pulls the crate with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal, and the coefficient of kinetic friction between the crate and the floor is "+gF(mu)+". Take the direction of the pull as positive. What is the acceleration of the crate? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Resolve the pull first. The horizontal component is "+gF(F)+" × "+fmt(cosR,3)+" = "+iF(Fx)+" N. The vertical component is "+gF(F)+" × "+fmt(sinR,3)+" = "+iF(Fy)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N. The upward component reduces the normal force: "+iF(wt)+" - "+iF(Fy)+" = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N. The net horizontal force is "+iF(Fx)+" - "+iF(fr)+" = "+iF(Fnet)+" N. Newton's second law gives the acceleration: "+iF(Fnet)+" / "+gF(m)+" = "+F3(ans)+" m/s^2. The acceleration is "+F3(ans)+" m/s^2 in the direction of the pull.",
    {m:m,F:F,ang:ang,mu:mu});
    q.figure=p22AngScene(gF(F)+" N",ang,"pull","friction");return q;
});

E("u2-61-accel-diagram",2,["PH11.6.1"],2,"gen",function(){
  var m=sfR(rf(3.0,20.0),3), A=ri(52,112), B=ri(10,44);
  var Fnet=sfR(A-B,4), ans=sfR(Fnet/m,3), asum=sfR((A+B)/m,3), aonly=sfR(A/m,3);
  var q=mcq("A free-body diagram for a cart of mass "+gF(m)+" kg shows one force of "+gF(A)+" N pointing east and friction of "+gF(B)+" N pointing west. Take east as positive. What is the acceleration of the cart?",
    F3(ans)+" m/s^2 east",
    [F3(asum)+" m/s^2 east",
     F3(ans)+" m/s^2 west",
     F3(aonly)+" m/s^2 east"],
    "The net force is found from the diagram by subtracting the westward friction: "+gF(A)+" - "+gF(B)+" = "+iF(Fnet)+" N. Newton's second law then gives the acceleration: "+iF(Fnet)+" / "+gF(m)+" = "+F3(ans)+" m/s^2. The acceleration is "+F3(ans)+" m/s^2 east, in the same direction as the net force.",
    {m:m,A:A,B:B});
    q.figure=p22FBD([{dx:1,dy:0,len:A,t:"force "+gF(A)+" N"},{dx:-1,dy:0,len:B,t:"friction "+gF(B)+" N"}],"cart "+gF(m)+" kg");return q;
});

E("u2-61-vector-direction",2,["PH11.6.1"],1,"var",varset([
  function(){
    return mcq("The net force on a sliding box points east. What is the direction of the box's acceleration?",
      "East, the same direction as the net force",
      ["West, opposite to the net force",
       "The box has no acceleration while it is sliding",
       "North, at right angles to the net force"],
      "Newton's second law says acceleration is the net force divided by the mass. Mass is positive, so the acceleration always points in the same direction as the net force. East is the direction of the acceleration.",{});
  },
  function(){
    return mcq("On a force diagram, one force arrow is drawn twice as long as another force arrow. What does the longer arrow tell you?",
      "That force has twice the magnitude of the shorter-arrow force",
      ["That force acts for twice as long a time",
       "That force points in the direction of motion",
       "That force is the net force on the object"],
      "In a vector diagram, arrow length represents magnitude and arrow direction represents the direction of the vector. A doubled arrow length means a doubled magnitude, nothing about time or motion. That force has twice the magnitude.",{});
  },
  function(){
    return mcq("A pull directed northeast is resolved into components. Which pair of components correctly describes it?",
      "One component pointing north and one component pointing east",
      ["One component pointing north and one component pointing south",
       "One component pointing northeast and one component pointing east",
       "One component pointing west and one component pointing south"],
      "Resolving a vector means replacing it with perpendicular parts that add up to the same effect. A northeast vector lies between north and east, so its components point north and east. One component north and one component east is correct.",{});
  },
  function(){
    return mcq("A cart speeds up while moving west. Which statement about its acceleration vector is correct?",
      "The acceleration points west, in the same direction as the change in velocity",
      ["The acceleration points east, because speeding up is positive",
       "The acceleration is zero, because the cart moves at a steady direction",
       "The acceleration points in the direction of the largest single force only"],
      "Acceleration is a vector in the direction of the change in velocity. A cart that speeds up while moving west has a velocity change pointing west, so its acceleration points west. The acceleration also matches the direction of the net force, not of any one force alone.",{});
  },
  function(){
    return mcq("Two equal forces pull an object, one east and one west, at the same time. What is the direction of the object's acceleration?",
      "The object has no acceleration, because the net force is zero",
      ["East, because the eastward force was named first",
       "West, because friction always wins",
       "The acceleration alternates between east and west"],
      "Equal and opposite forces add to a net force of zero. With no net force, Newton's second law gives an acceleration of zero, whatever the object was already doing. The object has no acceleration.",{});
  }
]));

E("u2-61-evaluate-fbd",2,["PH11.6.1"],3,"var",varset([
  function(){
    var q=mcq("A student draws a free-body diagram for a wagon rolling east and adds an arrow labelled 'motion force' pointing east, in addition to the pull, friction, gravity, and the normal force. Which judgement of the diagram is correct?",
      "The motion force arrow should be removed, because motion is not a force and only interactions belong on the diagram",
      ["The diagram is correct, because a moving object must have a force in its direction of motion",
       "The friction arrow should also be removed, because rolling objects have no friction",
       "The normal force should be removed, because the wagon is moving"],
      "A free-body diagram shows only forces, which come from interactions such as pulls, surfaces, and gravity. Motion is what forces explain, not an extra force itself. A wagon can even move with zero net force. The motion force arrow should be removed.",{});
    q.figure=p22FBD([{dx:1,dy:0,t:"pull",oy:-16},{dx:-1,dy:0,t:"friction",oy:16},{dx:0,dy:1,t:"gravity"},{dx:0,dy:-1,t:"normal force"},{dx:1,dy:0,t:"motion force",oy:-34,alt:1}],"wagon");return q;
  },
  function(){
    var F=64,ang=30;
    var q=mcq("A student analyses a crate pulled by a "+F+" N force at "+ang+" degrees above a horizontal floor. The student writes that the normal force equals the full weight of the crate. Which judgement is correct?",
      "The student is wrong, because the upward component of the pull lifts part of the weight off the floor, so the normal force is less than the weight",
      ["The student is right, because the normal force always equals the weight on any surface",
       "The student is wrong, because the normal force is greater than the weight when a pull is angled",
       "The student is right, because angled forces do not affect vertical forces at all"],
      "The pull has an upward vertical component, and vertical forces must balance for a crate that stays on the floor. The floor only needs to supply the part of the weight that the pull does not support, so the normal force is less than the weight. The student's claim is wrong.",{});
    q.figure=p22AngScene(gF(F)+" N",ang,"pull",null);return q;
  },
  function(){
    var q=mcq("A student says a sliding crate must be accelerating because friction is the only horizontal force drawn and friction points backward. A second look shows the crate is also being pushed forward with a force exactly equal to friction. Which judgement is correct?",
      "The crate is not accelerating, because the two horizontal forces cancel and the net force is zero",
      ["The crate is accelerating backward, because friction always causes acceleration",
       "The crate is accelerating forward, because a push always causes acceleration",
       "The crate must be at rest, because only resting objects have balanced forces"],
      "Acceleration depends on the net force, not on any single force. A push equal in size to friction gives a net force of zero, so the acceleration is zero. The crate could be sliding at constant velocity. The crate is not accelerating.",{});
    q.figure=p22FBD([{dx:1,dy:0,t:"push"},{dx:-1,dy:0,t:"friction"}],"crate");return q;
  },
  function(){
    var q=mcq("For a book sliding west across a table, a student draws friction pointing west because 'friction goes with the motion on the diagram'. Which judgement is correct?",
      "The friction arrow is wrong, because kinetic friction opposes the sliding and must point east for a book sliding west",
      ["The friction arrow is right, because friction always points in the direction of motion",
       "The friction arrow is wrong, because friction on a sliding book points down",
       "The diagram needs no friction arrow, because the book is already moving"],
      "Kinetic friction opposes relative sliding at the surface. A book sliding west experiences friction east, working against the slide. The friction arrow is wrong and must point east.",{});
    q.figure=p22FBD([{dx:-1,dy:0,t:"friction (as drawn)",oy:0}],"book, sliding west");return q;
  },
  function(){
    var q=mcq("A student resolves a 90.0 N force directed at 60 degrees above the horizontal and reports the vertical component as larger than 90.0 N. Which judgement is correct?",
      "The report must be wrong, because a component of a vector can never be larger than the vector itself",
      ["The report could be right, because components grow when an angle is large",
       "The report must be wrong, because the vertical component always equals the full force",
       "The report could be right, because the two components add up to more than the force"],
      "Each component is the full force multiplied by a sine or cosine, and those factors are never greater than one. So no component can exceed 90.0 N, even though the two components together describe the whole force. The report must be wrong.",{});
    q.figure=p22VecAng("90.0 N",60);return q;
  }
]));


/* ---------- PH11.6.2 Newton's laws ---------- */

E("u2-62-law-id",2,["PH11.6.2"],1,"var",varset([
  function(){
    return mcq("A curling rock sliding on level ice with no net force keeps moving in a straight line at nearly constant speed. Which law does this behaviour illustrate most directly?",
      "Newton's first law",
      ["Newton's second law","Newton's third law","The law of conservation of momentum"],
      "The first law says an object keeps its velocity when the net force on it is zero. The rock needs no force to keep moving, only a net force to change its motion. Newton's first law is illustrated.",{});
  },
  function(){
    return mcq("Doubling the net force on a cart doubles its acceleration, and doubling its mass halves the acceleration for the same force. Which law summarizes this relationship?",
      "Newton's second law",
      ["Newton's first law","Newton's third law","The law of conservation of momentum"],
      "The second law states the relationship among net force, mass, and acceleration: acceleration is the net force divided by the mass. The described doubling and halving follow directly from that relationship. Newton's second law summarizes it.",{});
  },
  function(){
    return mcq("A swimmer pushes water backward with her hands and the water pushes her forward. Which law explains the forward push on the swimmer?",
      "Newton's third law",
      ["Newton's first law","Newton's second law","The law of conservation of momentum"],
      "The third law says forces come in pairs: if the swimmer exerts a force on the water, the water exerts an equal and opposite force on the swimmer. That return force is what pushes her forward. Newton's third law explains it.",{});
  },
  function(){
    return mcq("A loaded sled is harder to start moving and harder to stop than the same sled empty, even on smooth ice. Which law is this resistance to a change in motion describing?",
      "Newton's first law",
      ["Newton's second law","Newton's third law","The law of conservation of momentum"],
      "The first law covers inertia: objects resist changes to their motion, and a greater mass has greater inertia. The heavy sled's reluctance to start or stop is inertia at work. Newton's first law is described.",{});
  },
  function(){
    return mcq("When a bat strikes a ball, the ball exerts a force on the bat that is equal in size and opposite in direction to the force the bat exerts on the ball. Which law states this?",
      "Newton's third law",
      ["Newton's first law","Newton's second law","The law of conservation of momentum"],
      "The third law states that the two forces in an interaction pair are equal in size and opposite in direction, acting on different objects. The bat and ball forces form exactly such a pair. Newton's third law states this.",{});
  }
]));

E("u2-62-inertia",2,["PH11.6.2"],1,"var",varset([
  function(){
    return mcq("A bus brakes suddenly and a passenger's loose lunch bag slides forward off the seat. Which statement correctly explains this using inertia?",
      "The bag keeps its forward velocity while the bus slows under it, so the bag moves forward relative to the bus",
      ["A forward force throws the bag when the brakes are applied",
       "The bag gains mass as the bus slows down",
       "The brakes push the bag forward through the seat"],
      "Inertia means the bag tends to keep the velocity it already had. The bus slows, but nothing slows the bag at the same rate, so it continues forward relative to the bus. The bag keeps its forward velocity while the bus slows.",{});
  },
  function(){
    return mcq("Two identical carts are pushed with the same force, but one carries a heavy toolbox. The loaded cart accelerates less. Which statement correctly explains this using inertia?",
      "The loaded cart has more mass, so it has more inertia and resists the change in motion more strongly",
      ["The loaded cart has less inertia, because heavier objects are easier to keep still",
       "The force on the loaded cart is smaller, because mass absorbs force",
       "The toolbox cancels part of the push before it reaches the cart"],
      "Inertia is measured by mass. More mass means a stronger resistance to a change in velocity, so the same net force produces a smaller acceleration for the loaded cart. The loaded cart has more inertia.",{});
  },
  function(){
    return mcq("A tablecloth is yanked quickly from under a set of dishes, and the dishes stay nearly where they were. Which statement correctly explains this?",
      "The dishes have inertia, and the brief friction from the cloth is not enough to change their motion much in the short time",
      ["The dishes become weightless while the cloth moves",
       "A downward force from the cloth holds the dishes in place",
       "The dishes gain forward speed equal to the speed of the cloth"],
      "The dishes resist a change in their state of rest because of inertia. The cloth acts on them only briefly through friction, so their velocity barely changes before the cloth is gone. Inertia explains why the dishes stay nearly in place.",{});
  },
  function(){
    return mcq("A driver makes a sharp left turn and a package on the back seat slides toward the right side of the car. Which statement correctly explains this using inertia?",
      "The package tends to keep moving in its original straight line while the car turns left under it",
      ["A rightward force appears in the car whenever it turns left",
       "The package's inertia pushes it to the right",
       "The turn increases the package's mass on the right side"],
      "Inertia is not a force: the package simply tends to continue in a straight line. The car turns left away from that line, so relative to the car the package drifts right. The package tends to keep its original straight line motion.",{});
  }
]));

E("u2-62-thirdlaw-pair",2,["PH11.6.2"],1,"var",varset([
  function(){
    return mcq("A rocket expels exhaust gas downward at high speed. Which pair of forces is a Newton's third law pair in this situation?",
      "The rocket pushes the gas down, and the gas pushes the rocket up",
      ["The rocket pushes the gas down, and gravity pulls the rocket down",
       "The gas pushes the rocket up, and gravity pulls the rocket down",
       "The rocket pushes the gas down, and the rocket pushes the launch pad down"],
      "A third law pair acts on two different objects and describes one interaction from both sides. The rocket and the gas interact: the rocket pushes the gas down and the gas pushes the rocket up. The rocket pushes the gas down, and the gas pushes the rocket up.",{});
  },
  function(){
    return mcq("A book rests on a table. Which force is the Newton's third law partner of the gravitational force pulling the book toward Earth?",
      "The book pulls Earth upward with an equal force",
      ["The table pushes the book upward with the normal force",
       "The book pushes the table downward",
       "Earth pulls the table downward"],
      "Third law partners come from the same interaction and act on different objects. Gravity is the Earth and book interaction, so its partner is the book pulling Earth up. The normal force belongs to a different interaction, between the book and the table. The book pulls Earth upward with an equal force.",{});
  },
  function(){
    return mcq("A hammer drives a nail into a board. Which pair of forces is a Newton's third law pair?",
      "The hammer pushes the nail forward, and the nail pushes the hammer backward",
      ["The hammer pushes the nail forward, and friction holds the nail in the board",
       "The nail pushes the board forward, and friction holds the nail",
       "Gravity pulls the hammer down, and the hammer pushes the nail forward"],
      "The hammer and nail interact directly. The hammer exerts a forward force on the nail, and the nail exerts an equal backward force on the hammer, which is part of why the hammer stops. The hammer pushes the nail forward, and the nail pushes the hammer backward.",{});
  },
  function(){
    return mcq("A skater pushes backward against the rink boards and glides forward. Which pair of forces is a Newton's third law pair?",
      "The skater pushes the boards backward, and the boards push the skater forward",
      ["The skater pushes the boards backward, and friction pushes the skater forward",
       "Gravity pulls the skater down, and the boards push the skater forward",
       "The skater pushes the boards backward, and the skater's muscles push the skater forward"],
      "The interaction is between the skater and the boards: a backward force on the boards and a forward force on the skater, equal in size and opposite in direction. The boards push the skater forward is the partner force.",{});
  },
  function(){
    return mcq("A horse pulls a cart, and the cart pulls back on the horse. A student claims the cart can never move because these forces cancel. Which statement gives the correct third law analysis?",
      "The two forces act on different objects, so they do not cancel for either object, and the horse can accelerate if the ground pushes it forward hard enough",
      ["The student is right, because third law pairs always cancel",
       "The cart moves because the pull of the horse is larger than the pull of the cart",
       "The forces cancel only when the cart is moving at constant speed"],
      "Third law partners act on different objects, so they never appear in the same net force sum. The horse accelerates when the ground's forward push on the horse beats the cart's backward pull. The two forces act on different objects, so they do not cancel.",{});
  }
]));

E("u2-62-fma-mc",2,["PH11.6.2"],2,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var m=sfR(rf(2.0,30.0),3), a=sfR(rf(1.5,9.0),3);
    var F=sfR(m*a,4), ans=sfR(F,3);
    return mcq("What net force is needed to give a "+gF(m)+" kg crate an acceleration of "+gF(a)+" m/s^2?",
      F3(ans)+" N",
      [F3(sfR(m/a,3))+" N", F3(sfR(F/2,3))+" N", F3(sfR(F*2,3))+" N"],
      "Newton's second law gives the net force as mass times acceleration: "+gF(m)+" × "+gF(a)+" = "+iF(F)+" N. The net force needed is "+F3(ans)+" N.",
      {mode:mode,m:m,a:a});
  }
  if(mode===2){
    var F2=sfR(rf(30.0,240),3), a2=sfR(rf(1.5,8.0),3);
    var mm=sfR(F2/a2,4), ans2=sfR(mm,3);
    return mcq("A net force of "+gF(F2)+" N gives an unknown mass an acceleration of "+gF(a2)+" m/s^2. What is the mass?",
      F3(ans2)+" kg",
      [F3(sfR(F2*a2,3))+" kg", F3(sfR(F2+a2,3))+" kg", F3(sfR(a2/F2,3))+" kg"],
      "Rearrange Newton's second law to solve for mass: mass is net force divided by acceleration: "+gF(F2)+" / "+gF(a2)+" = "+iF(mm)+" kg. The mass is "+F3(ans2)+" kg.",
      {mode:mode,F:F2,a:a2});
  }
  var F3v=sfR(rf(25.0,220),3), m3=sfR(rf(2.0,28.0),3);
  var av=sfR(F3v/m3,4), ans3=sfR(av,3);
  return mcq("A net force of "+gF(F3v)+" N acts on a "+gF(m3)+" kg snowmobile. What is its acceleration?",
    F3(ans3)+" m/s^2",
    [F3(sfR(F3v*m3,3))+" m/s^2", F3(sfR(m3/F3v,3))+" m/s^2", F3(sfR(F3v+m3,3))+" m/s^2"],
    "Newton's second law gives acceleration as net force divided by mass: "+gF(F3v)+" / "+gF(m3)+" = "+iF(av)+" m/s^2. The acceleration is "+F3(ans3)+" m/s^2.",
    {mode:mode,F:F3v,m:m3});
});

E("u2-62-weight-mass-mc",2,["PH11.6.2"],2,"gen",function(){
  var mode=ri(0,1)===0;
  if(mode){
    var m=sfR(rf(5.0,120),3), wt=sfR(m*9.8,4), ans=sfR(wt,3);
    return mcq("A student has a mass of "+gF(m)+" kg. What is the student's weight near Earth's surface?",
      F3(ans)+" N",
      [F3(sfR(m/9.8,3))+" N", F3(sfR(m+9.8,3))+" N", F3(sfR(wt/2,3))+" N"],
      "Weight is mass times the acceleration due to gravity: "+gF(m)+" × 9.8 = "+iF(wt)+" N. The weight is "+F3(ans)+" N. Mass and weight are different quantities: mass is measured in kilograms and weight, a force, in newtons.",
      {mode:mode,m:m});
  }
  var W=sfR(rf(85.0,880),3), mm=sfR(W/9.8,4), ans2=sfR(mm,3);
  return mcq("A crate weighs "+gF(W)+" N near Earth's surface. What is its mass?",
    F3(ans2)+" kg",
    [F3(sfR(W*9.8,3))+" kg", F3(sfR(W+9.8,3))+" kg", F3(sfR(9.8/W,3))+" kg"],
    "Mass is weight divided by the acceleration due to gravity: "+gF(W)+" / 9.8 = "+iF(mm)+" kg. The mass is "+F3(ans2)+" kg.",
    {mode:mode,W:W});
});

E("u2-62-friction-mc",2,["PH11.6.2"],2,"gen",function(){
  var kinetic=ri(0,1)===0;
  var m=sfR(rf(3.0,40.0),3), mu=kinetic?pick([0.150,0.220,0.280,0.340,0.420,0.480]):pick([0.250,0.320,0.380,0.460,0.540,0.620]);
  var FN=sfR(m*9.8,4), fk=sfR(mu*FN,4), ans=sfR(fk,3);
  var kindWord=kinetic?"kinetic friction acting on it":"maximum static friction that can act on it before it slips";
  var coefWord=kinetic?"coefficient of kinetic friction":"coefficient of static friction";
  return mcq("A "+gF(m)+" kg sled rests on a horizontal surface. The "+coefWord+" between the sled and the surface is "+gF(mu)+". What is the "+kindWord+"?",
    F3(ans)+" N",
    [F3(sfR(mu*m,3))+" N", F3(FN)+" N", F3(sfR(fk*2,3))+" N"],
    "On a horizontal surface with no vertical applied force, the normal force equals the weight: "+gF(m)+" × 9.8 = "+iF(FN)+" N. Friction is the coefficient times the normal force: "+gF(mu)+" × "+iF(FN)+" = "+iF(fk)+" N. The friction is "+F3(ans)+" N.",
    {kinetic:kinetic,m:m,mu:mu});
});


E("u2-62-normal-angled",2,["PH11.6.2"],2,"gen",function(){
  var m=sfR(rf(6.0,25.0),3), F=sfR(rf(20.0,80.0),3), ang=pick([20,30,40]), pull=ri(0,1)===0;
  var rad=ang*Math.PI/180, sinR=sfR(Math.sin(rad),3), Fy=sfR(F*sinR,4);
  var wt=sfR(m*9.8,4), FN=pull?sfR(wt-Fy,4):sfR(wt+Fy,4), ans=sfR(FN,3);
  var verb=pull?"pulls upward on":"pushes downward on";
  var dirWord=pull?"above":"below";
  var line=pull?iF(wt)+" - "+iF(Fy)+" = "+iF(FN)+" N":iF(wt)+" + "+iF(Fy)+" = "+iF(FN)+" N";
  var q=numq("A box of mass "+gF(m)+" kg sits on a horizontal floor. A person "+verb+" the box with a force of "+gF(F)+" N directed at an angle of "+ang+" degrees "+dirWord+" the horizontal. What is the normal force on the box? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N. The vertical component of the applied force is "+gF(F)+" × "+fmt(sinR,3)+" = "+iF(Fy)+" N. " + (pull?"The upward component supports part of the weight, so it reduces the normal force: ":"The downward component adds to the weight, so it increases the normal force: ") + line + " The normal force on the box is "+F3(ans)+" N.",
    {m:m,F:F,ang:ang,pull:pull});
    q.figure=p22AngScene(gF(F)+" N",ang,pull?"pull":"push",null);return q;
});

E("u2-62-connected-blocks-mc",2,["PH11.6.2"],2,"gen",function(){
  var m1=sfR(rf(2.0,15.0),3), m2=sfR(rf(2.0,15.0),3); if(Math.abs(m1-m2)<1.0){m2=sfR(m2+2.5,3);}
  var F=sfR(rf(20.0,120),3), total=sfR(m1+m2,4), a=sfR(F/total,4), ans=sfR(a,3);
  var q=mcq("Two crates of masses "+gF(m1)+" kg and "+gF(m2)+" kg are connected by a light rope on a frictionless horizontal surface. A horizontal pull of "+gF(F)+" N is applied to the second crate. What is the acceleration of the connected crates?",
    F3(ans)+" m/s^2",
    [F3(sfR(F/m1,3))+" m/s^2", F3(sfR(F/m2,3))+" m/s^2", F3(sfR(F*total,3))+" m/s^2"],
    "Treat the two crates as one system. The total mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(total)+" kg. Newton's second law gives the acceleration: "+gF(F)+" / "+iF(total)+" = "+iF(a)+" m/s^2. The acceleration of the connected crates is "+F3(ans)+" m/s^2.",
    {m1:m1,m2:m2,F:F});
    q.figure=p22Connected(gF(m1)+" kg",gF(m2)+" kg",gF(F)+" N");return q;
});

E("u2-62-atwood",2,["PH11.6.2"],2,"gen",function(){
  var mh=sfR(rf(6.0,20.0),3), ml=sfR(rf(1.5,mh-2.0),3);
  var wh=sfR(mh*9.8,4), wl=sfR(ml*9.8,4), diff=sfR(wh-wl,4), tot=sfR(mh+ml,4);
  var ans=sfR(diff/tot,3);
  var q=numq("Two masses of "+gF(mh)+" kg and "+gF(ml)+" kg are connected by a light rope over a frictionless pulley. Take the direction of the heavier mass as positive. What is the magnitude of the acceleration of the system? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The weights are "+gF(mh)+" × 9.8 = "+iF(wh)+" N and "+gF(ml)+" × 9.8 = "+iF(wl)+" N. Their difference, which drives the system, is "+iF(wh)+" - "+iF(wl)+" = "+iF(diff)+" N. The total mass is "+gF(mh)+" + "+gF(ml)+" = "+iF(tot)+" kg. The acceleration is the driving force divided by the total mass: "+iF(diff)+" / "+iF(tot)+" = "+F3(ans)+" m/s^2. The magnitude of the acceleration is "+F3(ans)+" m/s^2, with the heavier mass going down.",
    {mh:mh,ml:ml});
    q.figure=p22Atwood(gF(mh)+" kg",gF(ml)+" kg");return q;
});

E("u2-62-elevator-mc",2,["PH11.6.2"],2,"gen",function(){
  var m=sfR(rf(50.0,95.0),3), a=sfR(rf(0.800,3.20),3), up=ri(0,1)===0;
  var wt=sfR(m*9.8,4), ma=sfR(m*a,4), FN=up?sfR(wt+ma,4):sfR(wt-ma,4), ans=sfR(FN,3);
  var desc=up?"accelerates upward with an acceleration of "+gF(a)+" m/s^2":"accelerates downward with an acceleration of "+gF(a)+" m/s^2";
  var line=up?iF(wt)+" + "+iF(ma)+" = "+iF(FN)+" N":iF(wt)+" - "+iF(ma)+" = "+iF(FN)+" N";
  var feel=up?"greater than the weight, so the person feels heavier":"less than the weight, so the person feels lighter";
  var q=mcq("A person of mass "+gF(m)+" kg stands on a scale in an elevator that "+desc+". What does the scale read, as the apparent weight of the person?",
    F3(ans)+" N",
    [F3(wt)+" N", F3(up?sfR(wt-ma,3):sfR(wt+ma,3))+" N", F3(ma)+" N"],
    "The apparent weight is the normal force from the floor. The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N, and the mass times the acceleration is "+gF(m)+" × "+gF(a)+" = "+iF(ma)+" N. " + (up?"For an upward acceleration the floor must push harder than the weight: ":"For a downward acceleration the floor pushes less than the weight: ") + line + " The scale reads "+F3(ans)+" N, which is "+feel+".",
    {m:m,a:a,up:up});
    q.figure=p22Elevator(gF(m)+" kg",gF(a)+" m/s^2",up);return q;
});

E("u2-62-friction-cr",2,["PH11.6.2"],2,"gen",function(){
  var m=sfR(rf(4.0,20.0),3), F=sfR(rf(90.0,180),3), mu=pick([0.150,0.200,0.250,0.300,0.350]);
  var FN=sfR(m*9.8,4), fr=sfR(mu*FN,4), Fnet=sfR(F-fr,4), ans=sfR(Fnet/m,3);
  return numq("A horizontal force of "+gF(F)+" N is applied to a block of mass "+gF(m)+" kg on a horizontal floor. The coefficient of kinetic friction between the block and the floor is "+gF(mu)+". What is the acceleration of the block? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The normal force equals the weight on this horizontal surface: "+gF(m)+" × 9.8 = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N. The net force is the applied force minus friction: "+gF(F)+" - "+iF(fr)+" = "+iF(Fnet)+" N. Newton's second law gives the acceleration: "+iF(Fnet)+" / "+gF(m)+" = "+F3(ans)+" m/s^2. The acceleration is "+F3(ans)+" m/s^2 in the direction of the applied force.",
    {m:m,F:F,mu:mu});
});

E("u2-62-force-required",2,["PH11.6.2"],2,"gen",function(){
  var m=sfR(rf(5.0,22.0),3), a=sfR(rf(1.0,4.5),3), mu=pick([0.120,0.180,0.240,0.300]);
  var FN=sfR(m*9.8,4), fr=sfR(mu*FN,4), ma=sfR(m*a,4), ans=sfR(ma+fr,3);
  return numq("A crate of mass "+gF(m)+" kg is to be pushed along a horizontal floor with an acceleration of "+gF(a)+" m/s^2. The coefficient of kinetic friction between the crate and the floor is "+gF(mu)+". What horizontal applied force is needed? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "The normal force equals the weight: "+gF(m)+" × 9.8 = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N. The net force needed for the acceleration is "+gF(m)+" × "+gF(a)+" = "+iF(ma)+" N. The applied force must supply the net force and overcome friction: "+iF(ma)+" + "+iF(fr)+" = "+F3(ans)+" N. The applied force needed is "+F3(ans)+" N.",
    {m:m,a:a,mu:mu});
});

E("u2-62-system-judgement",2,["PH11.6.2"],3,"var",varset([
  function(){
    return mcq("Two blocks are connected by a rope and pulled along a frictionless surface. A student claims the tension in the rope equals the applied pull, because the rope transmits the pull unchanged. Which judgement is correct?",
      "The claim is wrong: the tension only accelerates the block ahead of the rope, so it is smaller than the applied pull",
      ["The claim is right: a light rope transmits the full pull to both blocks",
       "The claim is wrong: the tension is larger than the applied pull, because the rope adds its own force",
       "The claim is right when the blocks have the same mass, and wrong otherwise"],
      "Treat the pulled block and the leading block separately. The applied pull accelerates both masses together, while the tension only accelerates the leading block. With the same acceleration, a smaller mass needs a smaller force, so the tension is smaller than the applied pull. The claim is wrong.",{});
  },
  function(){
    return mcq("An Atwood machine has two masses of 4.00 kg and 5.00 kg. A student claims the acceleration is the acceleration due to gravity, because the heavier mass simply falls. Which judgement is correct?",
      "The claim is wrong: the lighter mass must also accelerate, so the total mass being accelerated reduces the acceleration below 9.8 m/s^2",
      ["The claim is right: the heavier mass falls freely and the rope only guides it",
       "The claim is wrong: the acceleration is greater than 9.8 m/s^2, because both weights add",
       "The claim is right when the masses are close, and wrong only for very different masses"],
      "The driving force is the difference of the two weights, while both masses must speed up together. Dividing the difference in weight by the total mass gives an acceleration much smaller than 9.8 m/s^2. The claim is wrong.",{});
  },
  function(){
    return mcq("An elevator moves upward at a constant velocity of 2.00 m/s, and a student claims the scale under a rider must read more than the rider's weight because the elevator is moving upward. Which judgement is correct?",
      "The claim is wrong: constant velocity means zero acceleration, so the normal force equals the weight and the scale reads the weight",
      ["The claim is right: any upward motion increases the normal force",
       "The claim is wrong: the scale reads zero while the elevator moves upward",
       "The claim is right only if the elevator is also accelerating"],
      "Apparent weight depends on acceleration, not on velocity. With a constant upward velocity the acceleration is zero, the forces balance, and the normal force equals the weight. The scale reads the weight, and the claim is wrong.",{});
  },
  function(){
    return mcq("A heavy crate and a light crate slide on the same rough floor with the same coefficient of kinetic friction. A student claims the heavy crate slows down faster because its friction force is larger. Which judgement is correct?",
      "The claim is wrong: the heavier crate has more friction but also more mass, and the two effects cancel, so both slow at the same rate",
      ["The claim is right: more friction always means a larger deceleration",
       "The claim is wrong: the heavy crate has less friction because it presses harder",
       "The claim is right: the light crate stops first because it has less inertia"],
      "Kinetic friction is the coefficient times the normal force, which grows with mass, while acceleration is force divided by mass. Both the friction force and the mass scale together, so the deceleration is the coefficient times g for both crates. The claim is wrong.",{});
  },
  function(){
    return mcq("A student argues that a car's tires push backward on the road, and the road therefore cannot push the car forward, so the car should stay put. Which judgement correctly answers this third law argument?",
      "The argument is wrong: the road's forward push acts on the car, while the tire's backward push acts on the road, so the forward push can accelerate the car",
      ["The argument is right: equal and opposite forces always cancel, so a car cannot move by pushing on the road",
       "The argument is wrong: the road's push on the car is larger than the tire's push on the road",
       "The argument is right for a car on ice, but wrong for a car on a dry road"],
      "Third law partners act on different objects and never cancel in one object's net force. The car accelerates because the road pushes it forward, while the backward force acts on the road, not on the car. The argument is wrong.",{});
  }
]));

E("u2-62-angled-pull-friction",2,["PH11.6.2"],3,"gen",function(){
  var m=sfR(rf(12.0,30.0),3), F, ang, mu, rad, cosR, sinR, Fx, Fy, wt, FN, fr, Fnet;
  do { // resample until the pull clearly beats friction: the sled must actually accelerate forward
    F=sfR(rf(60.0,140),3); ang=pick([28,36,42]); mu=pick([0.100,0.160,0.220,0.280]);
    rad=ang*Math.PI/180; cosR=sfR(Math.cos(rad),3); sinR=sfR(Math.sin(rad),3);
    Fx=sfR(F*cosR,4); Fy=sfR(F*sinR,4); wt=sfR(m*9.8,4); FN=sfR(wt-Fy,4); fr=sfR(mu*FN,4); Fnet=sfR(Fx-fr,4);
  } while (Fnet<6);
  var ans=sfR(Fnet/m,3);
  var q=numq("A sled of mass "+gF(m)+" kg is pulled across a level snowfield by a rope at "+ang+" degrees above the horizontal. The rope pulls with "+gF(F)+" N, and the coefficient of kinetic friction between the sled and the snow is "+gF(mu)+". What is the acceleration of the sled? Give your answer in m/s^2.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Work out the forces in turn. The horizontal component of the pull is "+gF(F)+" × "+fmt(cosR,3)+" = "+iF(Fx)+" N, and the vertical component is "+gF(F)+" × "+fmt(sinR,3)+" = "+iF(Fy)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N, so the normal force is "+iF(wt)+" - "+iF(Fy)+" = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N, and the net horizontal force is "+iF(Fx)+" - "+iF(fr)+" = "+iF(Fnet)+" N. The acceleration is "+iF(Fnet)+" / "+gF(m)+" = "+F3(ans)+" m/s^2 in the direction of the pull.",
    {m:m,F:F,ang:ang,mu:mu});
    q.figure=p22AngScene(gF(F)+" N",ang,"pull","friction");return q;
});

E("u2-62-multistep-cr",2,["PH11.6.2"],3,"gen",function(){
  var m=sfR(rf(14.0,26.0),3), F=sfR(rf(70.0,150),3), ang=pick([24,32,38]), mu=pick([0.120,0.180,0.240]), t=pick([3,4,5,6]);
  var rad=ang*Math.PI/180, cosR=sfR(Math.cos(rad),3), sinR=sfR(Math.sin(rad),3);
  var Fx=sfR(F*cosR,4), Fy=sfR(F*sinR,4), wt=sfR(m*9.8,4), FN=sfR(wt-Fy,4), fr=sfR(mu*FN,4), Fnet=sfR(Fx-fr,4);
  var a4=sfR(Fnet/m,4), tt=sfR(t*t,4), prod=sfR(a4*tt,4), ans=sfR(prod/2,3);
  return numq("A crate of mass "+gF(m)+" kg starts from rest on a horizontal floor. A rope pulls it with a force of "+gF(F)+" N at an angle of "+ang+" degrees above the horizontal, and the coefficient of kinetic friction between the crate and the floor is "+gF(mu)+". How far does the crate travel in the first "+t+" s? Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Resolve the pull first. The horizontal component is "+gF(F)+" × "+fmt(cosR,3)+" = "+iF(Fx)+" N. The vertical component is "+gF(F)+" × "+fmt(sinR,3)+" = "+iF(Fy)+" N. The weight is "+gF(m)+" × 9.8 = "+iF(wt)+" N. The upward component reduces the normal force: "+iF(wt)+" - "+iF(Fy)+" = "+iF(FN)+" N. Kinetic friction is "+gF(mu)+" × "+iF(FN)+" = "+iF(fr)+" N. The net horizontal force is "+iF(Fx)+" - "+iF(fr)+" = "+iF(Fnet)+" N. The acceleration is "+iF(Fnet)+" / "+gF(m)+" = "+iF(a4)+" m/s^2. From rest, the distance is one half times the acceleration times the square of the time. The time squared is "+t+" × "+t+" = "+iF(tt)+" s^2. The acceleration times the time squared is "+iF(a4)+" × "+iF(tt)+" = "+iF(prod)+" m. Halving that gives "+iF(prod)+" / 2 = "+F3(ans)+" m. The crate travels "+F3(ans)+" m in the first "+t+" s.",
    {m:m,F:F,ang:ang,mu:mu,t:t});
});


/* ---------- PH11.6.3 Impulse and momentum ---------- */

E("u2-63-momentum",2,["PH11.6.3"],1,"gen",function(){
  var m=sfR(rf(0.500,12.0),3), v=sfR(rf(2.0,25.0),3), p=sfR(m*v,4), ans=sfR(p,3);
  return numq("Take east as positive. A cart of mass "+gF(m)+" kg rolls east at "+gF(v)+" m/s. What is the momentum of the cart? Give your answer in kg·m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Momentum is mass times velocity: "+gF(m)+" × "+gF(v)+" = "+iF(p)+" kg·m/s. The momentum is "+F3(ans)+" kg·m/s, east.",
    {m:m,v:v});
});

E("u2-63-impulse-concept",2,["PH11.6.3"],1,"var",varset([
  function(){
    return mcq("Impulse is best defined as",
      "The force multiplied by the time the force acts, which equals the change in momentum",
      ["The mass multiplied by the acceleration of the object",
       "The force multiplied by the distance the object moves",
       "The momentum an object has at one instant"],
      "Impulse is force times the time interval, and the impulse-momentum theorem says it equals the change in momentum of the object. It is not an instantaneous momentum, and force times distance is work, a different quantity. Impulse is force times time, equal to the change in momentum.",{});
  },
  function(){
    return mcq("Which unit could be used for impulse?",
      "N·s",
      ["N/m","kg·m/s^2","J"],
      "Impulse is force times time, so its unit is the newton times the second, N·s. That unit is equivalent to the unit of momentum, kg·m/s, as the impulse-momentum theorem requires. N·s is a unit of impulse.",{});
  },
  function(){
    return mcq("A force acts on a ball for a short time and changes the ball's momentum. If the same change in momentum were produced over twice the time, the average force would be",
      "Half as large, because impulse is force times time and the impulse is the same",
      ["Twice as large, because a longer time needs more force",
       "The same, because force does not depend on time",
       "Four times as large, because time is squared in the impulse formula"],
      "The change in momentum fixes the impulse. Since impulse is average force times time, doubling the time for the same impulse halves the average force. Half as large is correct.",{});
  },
  function(){
    return mcq("The impulse-momentum theorem states that",
      "The impulse on an object equals the final momentum minus the initial momentum",
      ["The impulse on an object equals its mass times its acceleration",
       "Momentum is conserved only when a force acts for a long time",
       "The impulse on an object equals the distance it travels times its mass"],
      "The theorem connects the two parts of this section: impulse, force times time, equals the change in momentum, final momentum minus initial momentum. The impulse on an object equals its change in momentum.",{});
  },
  function(){
    return mcq("On a force-time graph, what does the area under the curve represent?",
      "The impulse, and so the change in momentum",
      ["The final momentum of the object",
       "The distance travelled while the force acted",
       "The acceleration of the object"],
      "Area on a force-time graph is force multiplied by time, which is the definition of impulse. By the impulse-momentum theorem, that area also gives the change in momentum. The area represents the impulse.",{});
  }
]));

E("u2-63-change-momentum-rebound",2,["PH11.6.3"],2,"gen",function(){
  var m=sfR(rf(0.300,2.50),3), vi=sfR(rf(4.0,14.0),3), vf=sfR(rf(3.0,12.0),3);
  var pi=sfR(m*vi,4), pf=sfR(m*vf,4), tot=sfR(pi+pf,4), ans=sfR(-tot,3);
  return numq("Take east as positive. A ball of mass "+gF(m)+" kg rolls east at "+gF(vi)+" m/s, strikes a wall, and rebounds west at "+gF(vf)+" m/s. What is the change in momentum of the ball? Give your answer in kg·m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Work with signs, east positive. The initial momentum is "+gF(m)+" × "+gF(vi)+" = "+iF(pi)+" kg·m/s. After the rebound the velocity is west, so the final momentum has the opposite sign, with a magnitude of "+gF(m)+" × "+gF(vf)+" = "+iF(pf)+" kg·m/s. Because the direction reverses, the size of the change is the two magnitudes added together: "+iF(pi)+" + "+iF(pf)+" = "+iF(tot)+" kg·m/s. The change points west, so the change in momentum is "+F3(ans)+" kg·m/s, the negative sign meaning west.",
    {m:m,vi:vi,vf:vf});
});

E("u2-63-impulse-force-time-mc",2,["PH11.6.3"],2,"gen",function(){
  var F=sfR(rf(12.0,95.0),3), t=pick([0.400,0.500,0.600,0.750,1.60,2.00,2.50,3.20]), J=sfR(F*t,4), ans=sfR(J,3);
  return mcq("A steady force of "+gF(F)+" N pushes a ferry fender for "+gF(t)+" s as a boat comes in. What impulse does the force deliver?",
    F3(ans)+" N·s",
    [F3(sfR(F/t,3))+" N·s", F3(sfR(F+t,3))+" N·s", F3(sfR(t/F,3))+" N·s"],
    "Impulse is force times the time the force acts: "+gF(F)+" × "+gF(t)+" = "+iF(J)+" N·s. The impulse delivered is "+F3(ans)+" N·s.",
    {F:F,t:t});
});

E("u2-63-avg-force-mc",2,["PH11.6.3"],2,"gen",function(){
  var dp=sfR(rf(20.0,180),3), t=pick([0.250,0.400,0.500,0.800,1.60,2.00,2.40]), F=sfR(dp/t,4), ans=sfR(F,3);
  return mcq("A goalie stops a puck, and the puck's momentum changes by "+gF(dp)+" kg·m/s during a contact time of "+gF(t)+" s. What average force acted on the puck during the stop?",
    F3(ans)+" N",
    [F3(sfR(dp*t,3))+" N", F3(sfR(dp+t,3))+" N", F3(sfR(t/dp,3))+" N"],
    "By the impulse-momentum theorem, average force times time equals the change in momentum, so the average force is the change in momentum divided by the time: "+gF(dp)+" / "+gF(t)+" = "+iF(F)+" N. The average force is "+F3(ans)+" N.",
    {dp:dp,t:t});
});

E("u2-63-ft-graph-mc",2,["PH11.6.3"],2,"gen",function(){
  var tri=ri(0,1)===0;
  var F=sfR(rf(20.0,90.0),3), t=pick([0.400,0.600,0.800,1.40,1.80]), rect=sfR(F*t,4);
  if(tri){
    var J=sfR(rect/2,4), ans=sfR(J,3);
    var q=mcq("A force-time graph for a bat striking a ball is a triangle. The force rises from zero to a peak of "+gF(F)+" N and returns to zero over "+gF(t)+" s. What is the impulse delivered to the ball?",
      F3(ans)+" N·s",
      [F3(sfR(rect,3))+" N·s", F3(sfR(F/(2*t),3))+" N·s", F3(sfR(F*t*2,3))+" N·s"],
      "Impulse is the area under a force-time graph. First find the area of the surrounding rectangle: "+gF(F)+" × "+gF(t)+" = "+iF(rect)+" N·s. A triangle covers half of that rectangle: "+iF(rect)+" / 2 = "+F3(ans)+" N·s. The impulse delivered is "+F3(ans)+" N·s.",
      {tri:tri,F:F,t:t});
    q.figure=p22Plot({series:[{pts:[[0,0],[t*0.5,F],[t,0]],shade:true}],xt:[[0,"0"],[t,gF(t)]],yt:[[F,gF(F)]],xmax:t*1.1,ymax:F*1.2,xl:"time (s)",yl:"force (N)"});return q;
  }
  var ans2=sfR(rect,3);
  var q=mcq("A force-time graph for a tow rope pull is a rectangle: a steady force of "+gF(F)+" N lasting "+gF(t)+" s. What is the impulse delivered by the rope?",
    F3(ans2)+" N·s",
    [F3(sfR(rect/2,3))+" N·s", F3(sfR(F/t,3))+" N·s", F3(sfR(F+t,3))+" N·s"],
    "Impulse is the area under a force-time graph, and the area of this rectangle is force times time: "+gF(F)+" × "+gF(t)+" = "+iF(rect)+" N·s. The impulse delivered is "+F3(ans2)+" N·s. There is no halving, because the graph is a rectangle, not a triangle.",
    {tri:tri,F:F,t:t});
    q.figure=p22Plot({series:[{pts:[[0,F],[t,F]],shade:true}],xt:[[0,"0"],[t,gF(t)]],yt:[[F,gF(F)]],xmax:t*1.1,ymax:F*1.25,xl:"time (s)",yl:"force (N)"});return q;
});

E("u2-63-impulse-cr",2,["PH11.6.3"],2,"gen",function(){
  var m=sfR(rf(0.300,0.800),3), vi=sfR(rf(5.0,12.0),3), vf=sfR(rf(4.0,10.0),3), t=sfR(rf(0.150,0.400),3);
  var pi=sfR(m*vi,4), pf=sfR(m*vf,4), tot=sfR(pi+pf,4), Fmag=sfR(tot/t,4), ans=sfR(-Fmag,3);
  return numq("Take east as positive. A ball of mass "+gF(m)+" kg travelling east at "+gF(vi)+" m/s strikes a padded wall and rebounds west at "+gF(vf)+" m/s. The ball is in contact with the wall for "+gF(t)+" s. What is the average force exerted on the ball by the wall? Give your answer in N.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Find the momenta first. The initial momentum is "+gF(m)+" × "+gF(vi)+" = "+iF(pi)+" kg·m/s east. The rebound momentum has a magnitude of "+gF(m)+" × "+gF(vf)+" = "+iF(pf)+" kg·m/s, in the west direction. Because the ball reverses direction, the size of the momentum change is "+iF(pi)+" + "+iF(pf)+" = "+iF(tot)+" kg·m/s. The average force is the change in momentum divided by the contact time: "+iF(tot)+" / "+gF(t)+" = "+iF(Fmag)+" N. The force points west, the direction of the change, so the average force exerted on the ball is "+F3(ans)+" N, the negative sign meaning west.",
    {m:m,vi:vi,vf:vf,t:t});
});

E("u2-63-stopping-tradeoff",2,["PH11.6.3"],3,"var",varset([
  function(){
    return mcq("Two identical cars each slow from the same speed to a stop. One stops in 2.0 s on a dry road, and the other takes 6.0 s on an icy approach with gentle braking. Which judgement correctly compares the average braking forces?",
      "The gentle stop needs about one third of the average force, because the same change in momentum spread over three times the time needs one third of the force",
      ["The gentle stop needs three times the force, because the force acts for three times as long",
       "Both stops need the same average force, because the cars and the speeds are the same",
       "The gentle stop needs nine times the force, because time is squared in the impulse"],
      "Both cars have the same change in momentum, so the impulse is fixed. Impulse is average force times time, so three times the time means one third of the average force. The gentle stop needs about one third of the average force.",{});
  },
  function(){
    return mcq("A designer claims that doubling the crumple distance of a bumper, which roughly doubles the stopping time in a low-speed collision, will roughly halve the average force on the car for the same change in speed. Which judgement is correct?",
      "The claim is sound: the change in momentum is unchanged, and doubling the time halves the average force in the impulse-momentum theorem",
      ["The claim fails: a longer crumple distance increases the force because the bumper travels farther",
       "The claim fails: the average force depends only on the mass of the car",
       "The claim is sound, but for the wrong reason, because the momentum itself is halved"],
      "The impulse-momentum theorem says average force times time equals the change in momentum. The car's change in momentum is the same, so doubling the stopping time halves the average force. The claim is sound.",{});
  },
  function(){
    return mcq("A catcher moves his glove backward as he catches a fast ball, while a novice holds his glove rigid. Both catch balls with the same speed and mass. Which judgement correctly compares the forces on their hands?",
      "The catcher feels the smaller average force, because moving the glove lengthens the stopping time for the same change in momentum",
      ["Both feel the same average force, because the balls are identical",
       "The novice feels the smaller force, because a rigid glove stops the ball quickly",
       "The catcher feels the larger force, because his glove travels a longer distance"],
      "Each ball undergoes the same change in momentum. The catcher stretches that change over a longer time, and since average force is the change in momentum divided by the time, his average force is smaller. The catcher feels the smaller average force.",{});
  },
  function(){
    return mcq("An engineer must choose between two dashboard pads for the same test: pad A stops a test head in 0.012 s, and pad B stops it in 0.036 s, both from the same speed. A colleague says pad A is safer because it stops the head sooner. Which judgement is correct?",
      "The colleague is wrong: pad B gives about one third of the average force, because it takes three times as long to produce the same change in momentum",
      ["The colleague is right: a shorter stopping time always means a smaller force",
       "Both pads give the same average force, because the head and speed are the same",
       "Pad B gives three times the force of pad A, because the impulse lasts three times as long"],
      "The change in momentum of the head is the same for both pads. Pad B spreads it over three times the stopping time, so its average force is about one third of pad A's. Quicker is not safer here. The colleague is wrong, and pad B gives about one third of the average force.",{});
  },
  function(){
    return mcq("A student proposes stopping a rolling cart by letting it hit a wall, saying the force is small because the cart stops almost instantly. Which judgement correctly uses the impulse-momentum theorem?",
      "The proposal has it backwards: a near-instant stop means a very large average force for the cart's change in momentum",
      ["The proposal is right: a shorter time always means a smaller force",
       "The proposal is right: the wall absorbs the momentum, so no force is needed",
       "The force cannot be judged without knowing the mass of the wall"],
      "The cart's change in momentum is set by its mass and speed change. Dividing that change by a very small time gives a very large average force. A near-instant stop means a very large average force, so the proposal has it backwards.",{});
  }
]));

/* ---------- PH11.6.4 Egg drop design challenge ---------- */

E("u2-64-crumple-why",2,["PH11.6.4"],1,"var",varset([
  function(){
    return mcq("In an egg drop challenge, a crumple structure around the egg protects it mainly because the structure",
      "Lengthens the stopping time, so the average force on the egg is smaller for the same change in momentum",
      ["Reduces the momentum of the falling egg before it lands",
       "Makes the egg lighter, so it falls more slowly",
       "Stops the egg instantly, before any force can act on it"],
      "The egg's change in momentum at landing is fixed by its mass and landing speed. A crumple structure stretches the stop over a longer time, and average force is the change in momentum divided by the time, so the force on the egg is smaller. Lengthening the stopping time is what protects the egg.",{});
  },
  function(){
    return mcq("A team wraps their egg in thick foam and it survives a drop that cracked an unwrapped egg. The physics reason the foam helps is that the foam",
      "Crushes slowly, increasing the time of the stop and decreasing the average force on the shell",
      ["Removes the egg's momentum while it is still falling",
       "Increases the egg's mass so it lands more gently",
       "Turns the collision into one with no change in momentum"],
      "Foam crushes gradually, so the egg slows over a longer time. The change in momentum is the same, but a longer time means a smaller average force on the shell, below the cracking threshold. Crushing slowly protects the egg.",{});
  },
  function(){
    return mcq("Why do the rules of an egg drop challenge usually limit the size or mass of the protective structure?",
      "So that teams must solve the impulse problem with design, rather than simply adding unlimited cushioning",
      ["Because a larger structure would increase the momentum change of the egg",
       "Because a heavier structure makes the egg fall faster than gravity allows",
       "Because impulse does not apply to large structures"],
      "Unlimited padding would trivially lengthen the stopping time. Limits force teams to trade protection against size and mass and to use the impulse-momentum relationship thoughtfully. The limits keep the design challenge in the design.",{});
  },
  function(){
    return mcq("An egg inside a well designed capsule lands and the capsule bounces slightly, and the egg survives. The survival is best explained by the impulse-momentum theorem because",
      "The capsule gave the egg a long stopping time, so the average force stayed below the level that cracks the shell",
      ["The bounce returned the egg's momentum, so no impulse acted on it",
       "The capsule cancelled gravity during the fall",
       "The egg's momentum was zero at the moment of landing"],
      "The egg still changes its momentum at landing, bounce included. Protection comes from spreading that change over a long enough time that the average force stays small. A long stopping time kept the force below the cracking level.",{});
  }
]));

E("u2-64-increase-time",2,["PH11.6.4"],2,"var",varset([
  function(){
    return mcq("A team's egg cracks on landing. Which design change most directly increases the stopping time of the egg?",
      "Replace the rigid inner box with layers of foam that compress gradually around the egg",
      ["Replace the foam padding with a stiffer plastic shell",
       "Remove one layer of padding so the capsule is lighter",
       "Tape the egg directly to the inside of a hard container"],
      "Stopping time increases when the egg is slowed gradually. Compressible layers that crush or squeeze over a longer travel give a longer stopping time. Rigid shells and direct taping shorten the stop. Layers of foam that compress gradually is the change that increases the stopping time.",{});
  },
  function(){
    return mcq("A capsule survives a low drop but cracks its egg from the full height. Which revision best targets the problem using impulse and momentum?",
      "Add a crumple zone at the bottom that collapses steadily on impact, lengthening the stop from the higher speed",
      ["Paint the capsule so it is easier to see during the drop",
       "Make the capsule walls thinner so the whole structure weighs less",
       "Attach the egg loosely so it can rattle inside the capsule"],
      "From a greater height the egg arrives with more momentum to lose. A collapsible crumple zone lengthens the stopping time, which lowers the average force for that larger change in momentum. A crumple zone that collapses steadily best targets the problem. A loose egg would stop suddenly against the inside wall instead.",{});
  },
  function(){
    return mcq("Two capsules land at the same speed. Capsule A has a long, soft nose cone, and capsule B has a short, rigid nose. Which statement is correct?",
      "The egg in capsule A is stopped over a longer time, so it experiences a smaller average force and is more likely to survive",
      ["The egg in capsule B is safer, because a rigid nose stops it before the force builds up",
       "Both eggs experience the same average force, because they land at the same speed",
       "The egg in capsule A experiences a larger force, because its stopping time is longer"],
      "Both eggs have the same change in momentum, set by the landing speed. The long, soft nose stretches the stop over more time, so the average force is smaller. The egg in capsule A experiences a smaller average force.",{});
  },
  function(){
    return mcq("A team tests a parachute added to their capsule. The egg still cracks, and video shows the capsule lands almost as fast as before but stops abruptly. Which next revision follows from the evidence?",
      "Keep working on the landing: add compressible material under the egg to lengthen the abrupt stop",
      ["Remove the parachute, because it clearly caused the cracking",
       "Drop the capsule from a lower height and report that result",
       "Add a rigid outer frame so the capsule keeps its shape on landing"],
      "The evidence points at the stop itself, which is abrupt. The impulse-momentum fix is to lengthen the stopping time with material that compresses under the egg. A rigid frame would make the stop even more abrupt. Adding compressible material under the egg follows from the evidence.",{});
  }
]));

E("u2-64-explain-result",2,["PH11.6.4"],2,"var",varset([
  function(){
    return mcq("In testing, the same egg capsule was dropped three times from the same height. With a thin foam pad the egg cracked, and with a pad three times as thick it survived twice. Which explanation correctly uses impulse and momentum?",
      "The thicker pad lengthened the stopping time, so the same change in momentum was produced by a smaller average force that the shell could withstand",
      ["The thicker pad reduced the momentum of the egg before landing",
       "The thicker pad increased the impulse on the egg, which protected it",
       "The thicker pad worked because it made the capsule heavier"],
      "The landing speed and mass are unchanged, so the change in momentum is the same in both tests. The thick pad spreads that change over a longer time, giving a smaller average force. The thicker pad lengthened the stopping time and reduced the average force.",{});
  },
  function(){
    return mcq("A team's capsule protected the egg from a 2 m drop but failed from a 4 m drop with the same design. Which explanation correctly uses impulse and momentum?",
      "From 4 m the egg arrives faster, so its momentum change at landing is larger, and the same stopping time then means a larger average force",
      ["Impulse stops working above a certain height, so the design could not help",
       "From 4 m the egg's mass increases, so the force increases",
       "The capsule absorbed all the impulse at 2 m and had none left at 4 m"],
      "A higher drop gives a higher landing speed, hence a larger momentum to lose. If the design stops the egg in about the same time, the average force, the change in momentum divided by the time, is larger and can crack the shell. The larger momentum change explains the failure.",{});
  },
  function(){
    return mcq("After a test, a team finds their egg survived but the bottom layer of their capsule is permanently squashed flat. Which statement correctly interprets this result?",
      "The squashed layer did its job: crushing gave a longer stopping time and a smaller average force, but the layer should be replaced before the next drop",
      ["The capsule failed, because a good design is never damaged",
       "The squashed layer means the egg felt a larger force than an undamaged layer would give",
       "The result cannot be trusted, because a crushed layer changes the mass of the egg"],
      "Crumple material protects by being crushed: the crushing is the motion that stretches out the stop. Once flat, it cannot crush again, so it must be replaced for the next test. The squashed layer did its job and should be replaced.",{});
  },
  function(){
    return mcq("A team adds a small parachute and their egg survives a drop that previously cracked it, even though the capsule still stops abruptly. Which explanation correctly uses impulse and momentum?",
      "The parachute lowered the landing speed, so the egg's momentum change at landing was smaller, and even an abrupt stop then produced a survivable average force",
      ["The parachute increased the stopping time after landing",
       "The parachute removed the need for impulse at landing",
       "The parachute worked because it increased the mass of the capsule"],
      "There are two ways to reduce the average force: lengthen the time, or shrink the change in momentum. The parachute did the second, arriving slower, so the abrupt stop acted on a smaller momentum change. The parachute lowered the landing speed and the momentum change.",{});
  }
]));

E("u2-64-tradeoff",2,["PH11.6.4"],3,"var",varset([
  function(){
    return mcq("A team must pick a cushioning foam. Very soft foam bottoms out in tests, flattening completely before the egg stops, and very firm foam barely compresses. Which choice and reasoning is best?",
      "Choose a medium foam: it keeps compressing through the whole stop without bottoming out, giving the longest useful stopping time",
      ["Choose the very soft foam: softer is always safer, and bottoming out does not matter",
       "Choose the very firm foam: a strong material protects better than a weak one",
       "Choose whichever foam is lightest, because mass decides the force"],
      "Protection needs the cushion to keep compressing for the whole stop. Soft foam that bottoms out leaves a sudden final stop, and firm foam gives a short stop. A medium foam that compresses throughout gives the longest useful stopping time. The medium foam is the best choice.",{});
  },
  function(){
    return mcq("A design meets the size limit and protects the egg, but it is single use: the crumple zone is destroyed each drop, and the rules require the same capsule to survive two scored drops. Which judgement is best?",
      "The design does not yet meet the challenge: revise it, for example with replaceable or recoverable cushioning, so it can protect on both drops",
      ["The design is complete, because it protected the egg once",
       "Drop more gently in the second test and count that as a revision",
       "Add a second egg as a backup in case the first cracks"],
      "A design must be judged against all the stated requirements, not only the successful test. The challenge requires two scored drops, so a destroyed crumple zone that cannot protect twice needs revision, such as replaceable cushioning. The design does not yet meet the challenge.",{});
  },
  function(){
    return mcq("A team can either add more foam, which raises the capsule mass by a third, or add a parachute, which keeps the mass nearly the same but can drift in wind and miss the target zone. The scoring rewards both survival and landing in the zone. Which judgement best weighs the trade-off?",
      "Test both options: the foam lengthens the stopping time but the added mass raises the momentum to be stopped, while the parachute lowers the landing speed but risks the zone, so the scores must be compared in trials",
      ["Choose the foam without testing, because more cushioning always wins",
       "Choose the parachute without testing, because lower mass always wins",
       "Choose neither, because any trade-off means the design has failed"],
      "Each option helps one factor and hurts another. Extra foam lengthens the stopping time but increases the momentum change, while the parachute reduces the momentum change but adds landing risk. Only comparative testing against the scoring can settle the choice. Testing both options is the best judgement.",{});
  },
  function(){
    return mcq("In trials, design A protects the egg in 9 of 10 drops but is hard to open, sometimes cracking eggs when the egg is removed for judging. Design B protects in 8 of 10 drops and opens cleanly. Which judgement is most defensible?",
      "The comparison is genuinely close: A protects better in the drop itself, but if removal cracking counts against the team, B may score better overall, so the scoring rules decide",
      ["A is clearly better in every way, because 9 of 10 beats 8 of 10",
       "B is clearly better in every way, because ease of opening is the whole challenge",
       "Neither result counts, because a perfect design would protect in 10 of 10 drops"],
      "Judging a design means weighing performance on every part of the task, including the judging step. A is stronger on drop survival, while B avoids removal losses. Which scores better depends on how the rules count removal cracking. The comparison is genuinely close, and the scoring rules decide.",{});
  }
]));


/* ---------- PH11.6.5 Conservation of momentum ---------- */

E("u2-65-conservation-concept",2,["PH11.6.5"],1,"var",varset([
  function(){
    return mcq("In a one dimensional collision between two carts on a level track, the total momentum of the two carts is conserved when",
      "The net external force on the two-cart system is zero or negligible during the collision",
      ["The carts stick together after the collision",
       "The carts have equal masses",
       "No kinetic energy is lost in the collision"],
      "Conservation of momentum follows from the impulse-momentum theorem applied to the whole system: if the net external force is zero, or its impulse during the brief collision is negligible, the total momentum does not change. Sticking and equal masses are not required. The total momentum is conserved when the net external force is negligible.",{});
  },
  function(){
    return mcq("Two skaters push off each other on level ice, starting from rest. After the push, the total momentum of the two skaters is",
      "Zero, the same as before the push",
      ["Equal to the momentum of the heavier skater",
       "Greater than before, because both skaters are moving",
       "Impossible to state, because they move in opposite directions"],
      "The push is internal to the two-skater system, so total momentum is conserved. It starts at zero, so it stays zero: the two momenta are equal in size and opposite in direction. The total momentum is zero.",{});
  },
  function(){
    return mcq("Which statement about a collision in which two carts stick together is correct?",
      "Total momentum is conserved, but some kinetic energy is changed to other forms",
      ["Total momentum and total kinetic energy are both conserved",
       "Total momentum is not conserved, because the carts stick",
       "The final velocity is the average of the two masses"],
      "Sticking collisions conserve total momentum, provided external impulses are negligible, but they are inelastic: some kinetic energy becomes heat, sound, and deformation. Total momentum is conserved, but kinetic energy is not.",{});
  },
  function(){
    return mcq("A firecracker at rest explodes into two pieces that fly apart. Which statement is correct?",
      "The total momentum after the explosion is zero, because it was zero before and the explosion forces are internal",
      ["Each piece must have the same momentum as the other piece in the same direction",
       "The total momentum after is greater than before, because the pieces move fast",
       "Momentum is not conserved in explosions, only in collisions"],
      "The explosion forces act inside the system, so they cannot change the total momentum. It was zero at rest, so the vector sum afterward is zero, with the pieces carrying equal and opposite momenta. The total momentum after the explosion is zero.",{});
  }
]));

E("u2-65-momentum-compare-mc",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(1.0,6.0),3), v1=sfR(rf(3.0,9.0),3), m2=sfR(rf(1.0,5.0),3), v2=sfR(rf(1.0,4.0),3);
  var p1=sfR(m1*v1,4), p2=sfR(m2*v2,4); while(p1<=p2+5){v1=sfR(v1+2.0,3); p1=sfR(m1*v1,4);}
  var tot=sfR(p1-p2,4), ans=sfR(tot,3);
  return mcq("Take east as positive. Cart A, of mass "+gF(m1)+" kg, moves east at "+gF(v1)+" m/s, and cart B, of mass "+gF(m2)+" kg, moves west at "+gF(v2)+" m/s. What is the total momentum of the two carts?",
    F3(ans)+" kg·m/s",
    [F3(sfR(p1+p2,3))+" kg·m/s", F3(sfR(-tot,3))+" kg·m/s", F3(p1)+" kg·m/s"],
    "Momentum is a vector, so signs matter. Cart A has momentum "+gF(m1)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s east. Cart B moves west, so its momentum counts as negative, with a magnitude of "+gF(m2)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. The total is "+iF(p1)+" - "+iF(p2)+" = "+iF(tot)+" kg·m/s. The total momentum is "+F3(ans)+" kg·m/s, east.",
    {m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u2-65-stick-velocity-mc",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(1.0,6.0),3), m2=sfR(rf(1.0,6.0),3); if(Math.abs(m1-m2)<1.0){m2=sfR(m2+1.5,3);}
  var v1=sfR(rf(2.0,10.0),3), p=sfR(m1*v1,4), tot=sfR(m1+m2,4), vf=sfR(p/tot,4), ans=sfR(vf,3);
  return mcq("A cart of mass "+gF(m1)+" kg moving at "+gF(v1)+" m/s collides with a stationary cart of mass "+gF(m2)+" kg, and the two carts stick together. What is their common velocity after the collision?",
    F3(ans)+" m/s",
    [F3(sfR(p/m2,3))+" m/s", F3(v1)+" m/s", F3(sfR(ans*2,3))+" m/s"],
    "Total momentum is conserved. Before the collision the momentum is "+gF(m1)+" × "+gF(v1)+" = "+iF(p)+" kg·m/s. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(tot)+" kg. The common velocity is "+iF(p)+" / "+iF(tot)+" = "+iF(vf)+" m/s. Their common velocity is "+F3(ans)+" m/s.",
    {m1:m1,m2:m2,v1:v1});
});

E("u2-65-stick-cr",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(2.0,8.0),3), v1=sfR(rf(3.0,11.0),3), m2=sfR(rf(1.0,6.0),3), v2=sfR(rf(0.500,3.00),3);
  if(v2>=v1){v2=sfR(v1/3,3);}
  var p1=sfR(m1*v1,4), p2=sfR(m2*v2,4), ptot=sfR(p1+p2,4), tot=sfR(m1+m2,4), ans=sfR(ptot/tot,3);
  return numq("Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1)+" m/s catches up with a cart of mass "+gF(m2)+" kg moving east at "+gF(v2)+" m/s. The carts collide and stick together. What is their common velocity? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Total momentum is conserved. The first cart has momentum "+gF(m1)+" × "+gF(v1)+" = "+iF(p1)+" kg·m/s. The second cart has momentum "+gF(m2)+" × "+gF(v2)+" = "+iF(p2)+" kg·m/s. The total momentum is "+iF(p1)+" + "+iF(p2)+" = "+iF(ptot)+" kg·m/s. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(tot)+" kg. The common velocity is "+iF(ptot)+" / "+iF(tot)+" = "+F3(ans)+" m/s. Their common velocity is "+F3(ans)+" m/s east.",
    {m1:m1,v1:v1,m2:m2,v2:v2});
});

E("u2-65-rebound-velocity",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(1.0,5.0),3), v1i=sfR(rf(5.0,12.0),3), v1f=sfR(rf(1.0,3.5),3), m2=sfR(rf(1.0,6.0),3);
  var pi=sfR(m1*v1i,4), p1f=sfR(m1*v1f,4), rem=sfR(pi-p1f,4), ans=sfR(rem/m2,3);
  return numq("Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1i)+" m/s collides with a stationary cart of mass "+gF(m2)+" kg. After the collision the first cart continues east at "+gF(v1f)+" m/s. What is the velocity of the second cart after the collision? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Total momentum is conserved. Before the collision the momentum is "+gF(m1)+" × "+gF(v1i)+" = "+iF(pi)+" kg·m/s. After the collision the first cart keeps "+gF(m1)+" × "+gF(v1f)+" = "+iF(p1f)+" kg·m/s. The second cart must carry the rest: "+iF(pi)+" - "+iF(p1f)+" = "+iF(rem)+" kg·m/s. Its velocity is "+iF(rem)+" / "+gF(m2)+" = "+F3(ans)+" m/s. The velocity of the second cart is "+F3(ans)+" m/s east.",
    {m1:m1,v1i:v1i,v1f:v1f,m2:m2});
});

E("u2-65-explosion-recoil-mc",2,["PH11.6.5"],2,"gen",function(){
  var m1=sfR(rf(2.0,9.0),3), v1=sfR(rf(1.5,7.0),3), m2=sfR(rf(10.0,60.0),3);
  var p=sfR(m1*v1,4), vr=sfR(p/m2,4), ans=sfR(vr,3);
  return mcq("A loaded cart of mass "+gF(m2)+" kg is at rest on a level track. A spring launches a ball of mass "+gF(m1)+" kg east from the cart at "+gF(v1)+" m/s relative to the ground. What is the recoil velocity of the cart?",
    F3(ans)+" m/s west",
    [F3(sfR(v1*m2/m1,3))+" m/s west", F3(v1)+" m/s west", F3(ans)+" m/s east"],
    "The system starts at rest, so its total momentum is zero, and the launch forces are internal. The ball carries momentum "+gF(m1)+" × "+gF(v1)+" = "+iF(p)+" kg·m/s east. The cart must carry the same size of momentum west: "+iF(p)+" / "+gF(m2)+" = "+iF(vr)+" m/s. The recoil velocity of the cart is "+F3(ans)+" m/s west.",
    {m1:m1,v1:v1,m2:m2});
});

E("u2-65-collision-cr",2,["PH11.6.5"],3,"gen",function(){
  var mA=sfR(rf(1.5,5.0),3), vAi=sfR(rf(4.0,10.0),3), vAf=sfR(rf(1.5,4.5),3), vB=sfR(rf(2.0,7.0),3);
  var pi=sfR(mA*vAi,4), pAfmag=sfR(mA*vAf,4), pB=sfR(pi+pAfmag,4), ans=sfR(pB/vB,3);
  return numq("Take east as positive. A cart of mass "+gF(mA)+" kg moving east at "+gF(vAi)+" m/s collides with a stationary cart of unknown mass. After the collision the first cart rebounds west at "+gF(vAf)+" m/s, and the second cart moves east at "+gF(vB)+" m/s. What is the mass of the second cart? Give your answer in kg.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Use conservation of momentum with signs, east positive. Before the collision the momentum is "+gF(mA)+" × "+gF(vAi)+" = "+iF(pi)+" kg·m/s. After the collision the first cart moves west, so its momentum is negative, with a magnitude of "+gF(mA)+" × "+gF(vAf)+" = "+iF(pAfmag)+" kg·m/s. For the total to stay the same, the second cart must carry the initial momentum plus that magnitude: "+iF(pi)+" + "+iF(pAfmag)+" = "+iF(pB)+" kg·m/s. The mass of the second cart is that momentum divided by its velocity: "+iF(pB)+" / "+gF(vB)+" = "+F3(ans)+" kg. The mass of the second cart is "+F3(ans)+" kg. The rebound is why the second cart carries more momentum than the first cart started with.",
    {mA:mA,vAi:vAi,vAf:vAf,vB:vB});
});

E("u2-65-unknown-quantity",2,["PH11.6.5"],3,"gen",function(){
  var mode=ri(1,3);
  if(mode===1){
    var m1=sfR(rf(1.0,6.0),3), m2=sfR(rf(1.0,6.0),3), vf=sfR(rf(1.5,4.5),3);
    var tot=sfR(m1+m2,4), num=sfR(tot*vf,4), ans=sfR(num/m1,3);
    return numq("A moving cart collides with a stationary cart and the two stick together, moving afterward at "+gF(vf)+" m/s. The moving cart has a mass of "+gF(m1)+" kg and the stationary cart has a mass of "+gF(m2)+" kg. What was the velocity of the moving cart before the collision? Give your answer in m/s.",
      ans, Math.max(0.02*Math.abs(ans),1e-9),
      "The total momentum after the collision equals the total momentum before it. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(tot)+" kg. The momentum after the collision is "+iF(tot)+" × "+gF(vf)+" = "+iF(num)+" kg·m/s. All of that momentum came from the moving cart, so its initial velocity was "+iF(num)+" / "+gF(m1)+" = "+F3(ans)+" m/s. The velocity before the collision was "+F3(ans)+" m/s.",
      {mode:mode,m1:m1,m2:m2,vf:vf});
  }
  if(mode===2){
    var mA=sfR(rf(0.500,3.00),3), vA=sfR(rf(3.0,9.0),3), vB=sfR(rf(1.0,5.0),3);
    var p=sfR(mA*vA,4), ans=sfR(p/vB,3);
    return numq("A device at rest on level ice splits into two pieces. One piece, of mass "+gF(mA)+" kg, moves east at "+gF(vA)+" m/s. The other piece moves west at "+gF(vB)+" m/s. What is the mass of the second piece? Give your answer in kg.",
      ans, Math.max(0.02*Math.abs(ans),1e-9),
      "The device starts at rest, so the total momentum is zero and stays zero: the two pieces carry equal sizes of momentum in opposite directions. The first piece carries "+gF(mA)+" × "+gF(vA)+" = "+iF(p)+" kg·m/s. The second piece carries the same size, so its mass is "+iF(p)+" / "+gF(vB)+" = "+F3(ans)+" kg. The mass of the second piece is "+F3(ans)+" kg.",
      {mode:mode,mA:mA,vA:vA,vB:vB});
  }
  var m1=sfR(rf(1.0,5.0),3), v1i=sfR(rf(4.0,10.0),3), m2=sfR(rf(1.0,5.0),3), v2i=sfR(rf(1.0,4.0),3), v1f=sfR(rf(0.500,2.50),3);
  var p1=sfR(m1*v1i,4), p2=sfR(m2*v2i,4), ptot=sfR(p1-p2,4); while(ptot<=sfR(m1*v1f,4)+2){v1i=sfR(v1i+3.0,3); p1=sfR(m1*v1i,4); ptot=sfR(p1-p2,4);}
  var p1f=sfR(m1*v1f,4), rem=sfR(ptot-p1f,4), ans=sfR(rem/m2,3);
  return numq("Take east as positive. A cart of mass "+gF(m1)+" kg moving east at "+gF(v1i)+" m/s meets a cart of mass "+gF(m2)+" kg moving west at "+gF(v2i)+" m/s. After the collision the first cart moves east at "+gF(v1f)+" m/s. What is the velocity of the second cart after the collision? Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9),
    "Total momentum is conserved, with west momenta negative. The first cart starts with "+gF(m1)+" × "+gF(v1i)+" = "+iF(p1)+" kg·m/s. The second cart starts with a momentum of magnitude "+gF(m2)+" × "+gF(v2i)+" = "+iF(p2)+" kg·m/s pointing west. The total initial momentum is "+iF(p1)+" - "+iF(p2)+" = "+iF(ptot)+" kg·m/s. After the collision the first cart has "+gF(m1)+" × "+gF(v1f)+" = "+iF(p1f)+" kg·m/s. The second cart carries the rest: "+iF(ptot)+" - "+iF(p1f)+" = "+iF(rem)+" kg·m/s. Its velocity is "+iF(rem)+" / "+gF(m2)+" = "+F3(ans)+" m/s. The velocity of the second cart is "+F3(ans)+" m/s, east.",
    {mode:mode,m1:m1,v1i:v1i,m2:m2,v2i:v2i,v1f:v1f});
});

E("u2-65-result-judgement",2,["PH11.6.5"],3,"gen",function(){
  var m1=sfR(rf(2.0,7.0),3), v1=sfR(rf(3.0,9.0),3), m2=sfR(rf(2.0,7.0),3);
  var p=sfR(m1*v1,4), tot=sfR(m1+m2,4), vf=sfR(p/tot,4), ans=sfR(vf,3);
  var claim=sfR(ans*1.6,3); if(claim===ans){claim=sfR(ans+1.25,3);}
  return mcq("A cart of mass "+gF(m1)+" kg moving at "+gF(v1)+" m/s hits a stationary cart of mass "+gF(m2)+" kg and the two stick together. A student reports that the combined carts move at "+gF(claim)+" m/s. Which judgement of the report is correct?",
    "The report is wrong: conservation of momentum gives a common velocity of "+F3(ans)+" m/s",
    ["The report is right: sticking collisions keep the incoming speed for the combined carts",
     "The report is wrong: the combined carts must move faster than "+F3(ans)+" m/s, because their mass is larger",
     "The report cannot be judged, because momentum is not conserved when carts stick"],
    "Check the report against conservation of momentum. The incoming momentum is "+gF(m1)+" × "+gF(v1)+" = "+iF(p)+" kg·m/s. The combined mass is "+gF(m1)+" + "+gF(m2)+" = "+iF(tot)+" kg. The common velocity is "+iF(p)+" / "+iF(tot)+" = "+iF(vf)+" m/s. That is "+F3(ans)+" m/s, not the reported value, so the report is wrong.",
    {m1:m1,v1:v1,m2:m2,claim:claim});
});
