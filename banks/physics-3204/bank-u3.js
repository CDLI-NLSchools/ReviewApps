// Diagram figures (Phase C, Nov 2026): entries whose source question type
// carried a diagram now set qq3204.figure from the draw's own values via the
// p32fig* helpers in bank-helpers.js. Asked unknowns are labelled "?".
// Physics 3204 Unit 3 Fields question bank
// CRMARKS: u3-71-field-radii=3
// CRMARKS: u3-72-separation-from-force=3
// CRMARKS: u3-72-orbit-period=3
// CRMARKS: u3-72-planet-mass-moon=4
// CRMARKS: u3-73-field-two-charges-point=3
// CRMARKS: u3-74-separation-from-force=3
// CRMARKS: u3-74-charge-from-force=3
// CRMARKS: u3-74-net-force-collinear=4
// CRMARKS: u3-75-energy-cost=3
// CRMARKS: u3-75-combination-circuit=4
// CRMARKS: u3-75-circuit-table=4
// CRMARKS: u3-75-parallel-branches=3
// CRMARKS: u3-77-current-from-field=3
// CRMARKS: u3-78-force-angle=3
// CRMARKS: u3-78-circular-speed=4
// CRMARKS: u3-78-field-from-orbit=3
// CRMARKS: u3-79-transformer=3
// CRMARKS: u3-710-lift-motor=3

var MU0 = 4 * Math.PI * 1e-7;   // T m/A, permeability of free space

/* ---------- PH12.7.1 Gravitational field described ---------- */

E("u3-71-field-equation", 3, ["PH12.7.1"], 1, "var", varset([
  function(){
    return mcq("The gravitational field strength at a point near a planet is best defined as",
      "The gravitational force acting on each kilogram of mass placed at that point",
      ["The total gravitational force the planet exerts on all objects near it",
       "The acceleration due to gravity divided by the mass placed at the point",
       "The mass of the planet divided by the square of its radius"],
      "A field strength is always a per-unit quantity: gravitational field strength is the force per unit mass, g = F/m, measured in N/kg. It tells what force each kilogram placed at the point would feel, so the field strength is the gravitational force on each kilogram at that point.", {});
  },
  function(){
    return mcq("Which equation gives the gravitational field strength g at a distance r from the centre of a planet of mass M?",
      "g = GM/r\u00B2",
      ["g = Gm/r\u00B2",
       "g = GM/r",
       "g = GMr\u00B2"],
      "The field is produced by the planet's mass M, so the planet's mass belongs in the numerator: g = GM/r\u00B2. The test mass m does not appear, because field strength is a property of the planet and the point, not of the object placed there. The field falls off with the square of the distance, so r is squared in the denominator.", {});
  },
  function(){
    return mcq("The unit of gravitational field strength, the newton per kilogram (N/kg), is equivalent to which other unit?",
      "The metre per second squared (m/s\u00B2), the unit of acceleration",
      ["The joule per kilogram (J/kg)",
       "The newton metre (N m)",
       "The kilogram per cubic metre (kg/m\u00B3)"],
      "Since g = F/m and also g is the acceleration a mass experiences in free fall, N/kg and m/s\u00B2 are the same unit written two ways. Near Earth's surface g = 9.8 N/kg = 9.8 m/s\u00B2. The unit of gravitational field strength is equivalent to the unit of acceleration.", {});
  },
  function(){
    return mcq("At a point above a planet's surface, the direction of the gravitational field is",
      "Toward the centre of the planet, the way a released mass would fall",
      ["Away from the centre of the planet",
       "Tangent to the planet's surface, in the direction of rotation",
       "Straight up, away from the surface"],
      "The field direction is the direction of the force on a mass placed at the point. Gravity attracts, so the force and the field both point toward the centre of the planet, the direction a dropped object falls. The field points toward the centre of the planet.", {});
  }
]));

E("u3-71-field-planet", 3, ["PH12.7.1"], 2, "gen", function(){
  var M = sfR(rf(1.5, 9.0) * 1e23, 3);
  var R = sfR(rf(2.0, 8.0) * 1e6, 3);
  var g = PHYS_GRAV * M / (R * R);
  var ans = sfR(g, 3);
  return numq("A planet has mass " + gF(M) + " kg and radius " + gF(R) + " m. Calculate the gravitational field strength at its surface. Give your answer in N/kg.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Use g = GM/r\u00B2 with the planet's mass and its radius, since the surface is one radius from the centre. Substituting M = " + gF(M) + " kg and r = " + gF(R) + " m, and computing the numerator GM and the denominator r\u00B2 as separate steps, gives g = " + F3(ans) + " N/kg. The field strength at the surface is " + F3(ans) + " N/kg.",
    {M: M, R: R});
});

E("u3-71-field-altitude", 3, ["PH12.7.1"], 2, "gen", function(){
  var Re = 6.38e6, Me = 5.97e24;
  var hKm = ri(250, 4000);
  var h = hKm * 1000;
  var r = Re + h;
  var g = PHYS_GRAV * Me / (r * r);
  var key = F3(g) + " N/kg";
  var gSurf = F3(PHYS_GRAV * Me / (Re * Re)) + " N/kg";
  var gHalf = F3(g / 2) + " N/kg";
  var gNoSq = F3(PHYS_GRAV * Me / r) + " N/kg";
  var qq3204 = mcq("Earth has mass " + gF(Me) + " kg and radius " + gF(Re) + " m. A satellite orbits " + hKm + " km above the surface. What is the gravitational field strength at the satellite?",
    key, [gSurf, gHalf, gNoSq],
    "Field strength is measured from the centre of Earth, so the distance is the radius plus the altitude: r = " + gF(Re) + " m + " + gF(h) + " m = " + iF(r) + " m. Then g = GM/r\u00B2 gives " + key + ". Using the surface radius alone would give the surface value " + gSurf + ", which ignores the altitude. The field strength at the satellite is " + key + ".",
    {hKm: hKm}); qq3204.figure = p32figOrbit("altitude "+hKm+" km","Earth"); return qq3204;
});

E("u3-71-field-radii", 3, ["PH12.7.1"], 3, "gen", function(){
  var Me = 5.97e24, Re = 6.38e6;
  var g = Math.round(rf(1.00, 4.50) * 100) / 100;
  var r = Math.sqrt(PHYS_GRAV * Me / g);
  var radii = r / Re;
  var ans = sfR(radii, 3);
  var qq3204 = numq("Earth has mass " + gF(Me) + " kg and radius " + gF(Re) + " m. At what distance from Earth's centre, measured in Earth radii, is the gravitational field strength " + fmt(g, 2) + " N/kg? Give your answer in Earth radii.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Start from g = GM/r\u00B2 and solve for the distance: r\u00B2 = GM/g, so r is the square root of GM/g. Step 1: GM = " + iF(PHYS_GRAV * Me) + " N m\u00B2/kg (computed from G = 6.67 \u00D7 10\u207B\u00B9\u00B9 and M = " + gF(Me) + " kg). Step 2: dividing GM by g = " + fmt(g, 2) + " N/kg gives r\u00B2, and taking the square root gives r = " + iF(r) + " m. Step 3: divide by one Earth radius, " + gF(Re) + " m: r = " + F3(ans) + " Earth radii. The distance is " + F3(ans) + " Earth radii from the centre.",
    {g: g}); qq3204.figure = p32figOrbit("? Earth radii","Earth"); return qq3204;
});

E("u3-71-weight-moon", 3, ["PH12.7.1"], 2, "gen", function(){
  var m = sfR(rf(45, 95), 3);
  var wE = m * 9.8, wM = m * 1.62;
  var key = F3(wM) + " N";
  return mcq("An astronaut has mass " + gF(m) + " kg. On the Moon the gravitational field strength is 1.62 N/kg. What is the astronaut's weight on the Moon?",
    key, [F3(wE) + " N", F3(m) + " N", F3(wM / 2) + " N"],
    "Weight is field strength times mass: W = mg. On the Moon, W = " + gF(m) + " kg \u00D7 1.62 N/kg = " + F3(wM) + " N. The mass itself stays " + gF(m) + " kg everywhere; only the weight changes with the field. On Earth the same mass would weigh " + F3(wE) + " N. The weight on the Moon is " + key + ".",
    {m: m});
});

E("u3-71-pole-equator", 3, ["PH12.7.1"], 1, "var", varset([
  function(){
    return mcq("The gravitational field strength at Earth's poles is slightly greater than at the equator. The main reason is that",
      "Points at the poles are closer to Earth's centre, and rotation does not pull mass away from the axis there",
      ["The poles are colder, and cold increases gravity",
       "There is more mass under the poles than under the equator",
       "The Moon's gravity adds to Earth's at the poles"],
      "Earth bulges at the equator, so a point at a pole sits closer to the centre, and g = GM/r\u00B2 grows as r shrinks. Rotation also reduces the effective field at the equator slightly, because some of the gravitational force provides the centripetal acceleration there. The poles win on both counts: closer to the centre and no rotational reduction.", {});
  },
  function(){
    return mcq("A mass is moved from the equator to the North Pole without changing the mass itself. Which statement is correct?",
      "Its weight increases slightly, because the field strength is slightly greater at the pole",
      ["Its weight decreases slightly, because the pole is farther from the centre",
       "Its weight is unchanged, because weight does not depend on location",
       "Its mass increases slightly, because it weighs more at the pole"],
      "Mass is a property of the object and does not change with location. Weight is mg, and g is slightly larger at the poles (closer to Earth's centre, no rotational reduction), so the weight increases slightly. Its weight increases slightly at the pole.", {});
  },
  function(){
    return mcq("Why is the measured value of g at the equator slightly less than the value predicted from GM/r\u00B2 alone?",
      "Part of the gravitational force is used to keep surface objects moving in a circle as Earth rotates",
      ["The air at the equator pushes up on objects and reduces their weight",
       "Earth's magnetic field lifts objects at the equator",
       "The value of G is smaller at low latitudes"],
      "An object on the equator travels in a circle once a day, so a small part of the gravitational force must act as centripetal force. What remains is the effective gravity a scale measures, so measured g is slightly less than GM/r\u00B2. G itself is a universal constant and does not change with latitude.", {});
  },
  function(){
    return mcq("Two identical spring scales are taken to the equator and to the North Pole. The same mass is hung from each. The scale at the pole reads",
      "Slightly more, because the field strength there is slightly greater",
      ["Slightly less, because the pole is higher above sea level in the field",
       "Exactly the same, because spring scales measure mass",
       "Zero, because there is no rotation at the pole to create gravity"],
      "A spring scale responds to weight, mg. The field strength is slightly greater at the pole (closer to the centre, and no part of gravity is spent on circular motion there), so the pole scale stretches a little more and reads slightly more. Gravity exists whether or not Earth rotates; rotation only trims the effective value at the equator.", {});
  }
]));

/* ---------- PH12.7.2 Universal gravitation applied ---------- */

E("u3-72-force-two-masses", 3, ["PH12.7.2"], 2, "gen", function(){
  var m1 = sfR(rf(2.0, 9.0) * 1e3, 3);
  var m2 = sfR(rf(2.0, 9.0) * 1e4, 3);
  var r = sfR(rf(1.5, 6.0), 3);
  var F = PHYS_GRAV * m1 * m2 / (r * r);
  var ans = sfR(F, 3);
  return numq("Two crates in a warehouse, of mass " + gF(m1) + " kg and " + gF(m2) + " kg, sit with their centres " + gF(r) + " m apart. Calculate the gravitational force of attraction between them. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Use the law of universal gravitation, F = Gm\u2081m\u2082/r\u00B2. Multiply the two masses together and by G = 6.67 \u00D7 10\u207B\u00B9\u00B9 N m\u00B2/kg\u00B2, then divide by r\u00B2 = (" + gF(r) + " m)\u00B2. The result is F = " + F3(ans) + " N. Gravitational forces between everyday objects are extremely small, which is why the crates do not slide together. The force is " + F3(ans) + " N.",
    {m1: m1, m2: m2, r: r});
});

E("u3-72-scaling-mass", 3, ["PH12.7.2"], 1, "var", varset([
  function(){
    return mcq("Two masses attract each other with force F. If the mass of one of them is doubled, with the separation unchanged, the new force is",
      "2F", ["F", "4F", "F/2"],
      "The force is proportional to each mass: F = Gm\u2081m\u2082/r\u00B2. Doubling one mass doubles the product m\u2081m\u2082, so the force doubles to 2F.", {});
  },
  function(){
    return mcq("Two masses attract each other with force F. If the distance between their centres is doubled, with the masses unchanged, the new force is",
      "F/4", ["F/2", "F", "4F"],
      "Gravity follows an inverse square law: F varies as 1/r\u00B2. Doubling r multiplies the force by 1/2\u00B2 = 1/4, so the new force is F/4.", {});
  },
  function(){
    return mcq("Two masses attract each other with force F. If both masses are doubled, with the separation unchanged, the new force is",
      "4F", ["2F", "F", "8F"],
      "Each doubling multiplies the force by 2. Doubling m\u2081 gives 2F, and doubling m\u2082 doubles it again: 2 \u00D7 2 = 4, so the new force is 4F.", {});
  },
  function(){
    return mcq("Two masses attract each other with force F. If the distance between their centres is halved, with the masses unchanged, the new force is",
      "4F", ["2F", "F/2", "F/4"],
      "With an inverse square law, halving r multiplies the force by 1/(1/2)\u00B2 = 4. The new force is 4F. Getting closer strengthens gravity much faster than a simple proportion would suggest.", {});
  },
  function(){
    return mcq("Two masses attract each other with force F. If one mass is tripled, with the separation unchanged, the new force is",
      "3F", ["9F", "F/3", "F"],
      "The force is directly proportional to each mass separately. Tripling one mass triples the product m\u2081m\u2082, so the new force is 3F. It is not squared, because only one mass changed.", {});
  }
]));

E("u3-72-separation-from-force", 3, ["PH12.7.2"], 3, "gen", function(){
  var m1 = sfR(rf(3.0, 8.0) * 1e11, 3);
  var m2 = sfR(rf(3.0, 8.0) * 1e11, 3);
  var rTrue = sfR(rf(2.0, 9.0) * 1e3, 3);
  var F = sfR(PHYS_GRAV * m1 * m2 / (rTrue * rTrue), 3);
  var r = Math.sqrt(PHYS_GRAV * m1 * m2 / F);
  var ans = sfR(r, 3);
  return numq("Two asteroids of mass " + gF(m1) + " kg and " + gF(m2) + " kg attract each other with a gravitational force of " + gF(F) + " N. Calculate the distance between their centres. Give your answer in m.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Rearrange F = Gm\u2081m\u2082/r\u00B2 to r\u00B2 = Gm\u2081m\u2082/F, then take the square root. Step 1: the product Gm\u2081m\u2082 is computed from G = 6.67 \u00D7 10\u207B\u00B9\u00B9 and the two masses. Step 2: dividing that product by F = " + gF(F) + " N gives r\u00B2 = " + iF(r * r) + " m\u00B2. Step 3: the square root of r\u00B2 is r = " + F3(ans) + " m. The distance between the centres is " + F3(ans) + " m.",
    {m1: m1, m2: m2, F: F});
});

E("u3-72-satellite-speed", 3, ["PH12.7.2"], 2, "gen", function(){
  var Me = 5.97e24, Re = 6.38e6;
  var altKm = ri(250, 3000);
  var r = Re + altKm * 1000;
  var v = Math.sqrt(PHYS_GRAV * Me / r);
  var ans = sfR(v, 3);
  var qq3204 = numq("A satellite is in a circular orbit " + altKm + " km above Earth's surface. Earth has mass " + gF(Me) + " kg and radius " + gF(Re) + " m. Calculate the satellite's orbital speed. Give your answer in m/s.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Gravity provides the centripetal force, which gives v = \u221A(GM/r) for a circular orbit. The orbit radius is measured from Earth's centre: r = " + gF(Re) + " m + " + gF(altKm * 1000) + " m = " + iF(r) + " m. Dividing GM by this radius and taking the square root gives v = " + F3(ans) + " m/s. The orbital speed is " + F3(ans) + " m/s.",
    {altKm: altKm}); qq3204.figure = p32figOrbit("altitude "+altKm+" km","Earth"); return qq3204;
});

E("u3-72-orbit-period", 3, ["PH12.7.2"], 2, "gen", function(){
  var Me = 5.97e24, Re = 6.38e6;
  var altKm = ri(400, 3500);
  var r = Re + altKm * 1000;
  var T = 2 * Math.PI * Math.sqrt(r * r * r / (PHYS_GRAV * Me));
  var ans = sfR(T, 3);
  var qq3204 = numq("A weather satellite is in a circular orbit " + altKm + " km above Earth's surface. Earth has mass " + gF(Me) + " kg and radius " + gF(Re) + " m. Calculate the satellite's orbital period. Give your answer in s.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "For a circular orbit, T = 2\u03C0\u221A(r\u00B3/GM). Step 1: the orbit radius from Earth's centre is r = " + gF(Re) + " m + " + gF(altKm * 1000) + " m = " + iF(r) + " m. Step 2: cube the radius to get r\u00B3 and divide by GM, keeping the powers of ten in words to avoid errors. Step 3: take the square root and multiply by 2\u03C0. The period is T = " + F3(ans) + " s, about " + F3(T / 60) + " min. The orbital period is " + F3(ans) + " s.",
    {altKm: altKm}); qq3204.figure = p32figOrbit("altitude "+altKm+" km","Earth"); return qq3204;
});

E("u3-72-planet-mass-moon", 3, ["PH12.7.2"], 3, "gen", function(){
  var r = sfR(rf(1.5, 6.0) * 1e8, 3);
  var Tdays = sfR(rf(4.0, 28.0), 3);
  var T = Tdays * 86400;
  var M = 4 * Math.PI * Math.PI * r * r * r / (PHYS_GRAV * T * T);
  var ans = sfR(M, 3);
  var qq3204 = numq("A moon orbits a planet in a circle of radius " + gF(r) + " m with a period of " + gF(Tdays) + " days. Calculate the mass of the planet. Give your answer in kg.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Gravity supplies the moon's centripetal force, which rearranges to M = 4\u03C0\u00B2r\u00B3/(GT\u00B2). Step 1: convert the period to seconds by multiplying the number of days by 86400 s/day, which gives T = " + iF(T) + " s. Step 2: cube the orbit radius and square the period, tracking powers of ten in words. Step 3: multiply r\u00B3 by 4\u03C0\u00B2 and divide by GT\u00B2. The planet's mass is M = " + F3(ans) + " kg. This is how astronomers weigh planets that have moons.",
    {r: r, Tdays: Tdays}); qq3204.figure = p32figOrbit(gF(r)+" m","planet"); return qq3204;
});

E("u3-72-force-ratio-distance", 3, ["PH12.7.2"], 2, "gen", function(){
  var F1 = sfR(rf(20, 90), 3);
  var k = pick([2, 3, 4]);
  var F2 = F1 / (k * k);
  var key = F3(F2) + " N";
  return mcq("Two stars attract each other with a gravitational force of " + gF(F1) + " N. Over time they drift until the distance between their centres is " + k + " times as great, with the masses unchanged. What is the new force of attraction?",
    key, [F3(F1 / k) + " N", F3(F1) + " N", F3(F1 * k) + " N"],
    "Gravity is an inverse square law, so multiplying the distance by " + k + " divides the force by " + k + "\u00B2 = " + (k * k) + ". The new force is " + gF(F1) + " N \u00F7 " + (k * k) + " = " + F3(F2) + " N. Dividing by " + k + " only would be the mistake of treating gravity as a simple inverse proportion. The new force is " + key + ".",
    {F1: F1, k: k});
});

E("u3-72-force-altitude-ratio", 3, ["PH12.7.2"], 2, "gen", function(){
  var Re = 6.38e6;
  var w = sfR(rf(400, 900), 3);
  var altKm = pick([1000, 2000, 3180, 6380]);
  var ratio = Math.pow(Re / (Re + altKm * 1000), 2);
  var key = F3(w * ratio) + " N";
  return mcq("A supply capsule weighs " + gF(w) + " N at Earth's surface. It is raised to an altitude of " + altKm + " km, which is " + fmt(altKm * 1000 / Re, 2) + " Earth radii above the surface (Earth's radius is " + gF(Re) + " m). What is the gravitational force on the capsule at that altitude?",
    key, [F3(w) + " N", F3(w * Re / (Re + altKm * 1000)) + " N", F3(w * ratio / 2) + " N"],
    "The force falls with the square of the distance from Earth's centre. At the surface the distance is one radius; at altitude it is " + gF(Re) + " m + " + gF(altKm * 1000) + " m = " + iF(Re + altKm * 1000) + " m. The ratio of forces is (R/(R + h))\u00B2 = " + iF(ratio) + ", so the force is " + gF(w) + " N \u00D7 " + iF(ratio) + " = " + F3(w * ratio) + " N. Using the unsquared ratio is the common error. The gravitational force at altitude is " + key + ".",
    {w: w, altKm: altKm});
});

E("u3-72-compare-fields", 3, ["PH12.7.2"], 3, "var", varset([function(){
  var combos = [[2, 1], [4, 2], [3, 1], [2, 2], [5, 2], [3, 2]];
  var c = pick(combos);
  var mR = c[0], rR = c[1];
  var ratio = mR / (rR * rR);
  var key, d1, d2, d3;
  if (ratio > 1) { key = "Planet B's field is " + fmt(ratio, 2) + " times Earth's"; d1 = "The fields are equal"; d2 = "Earth's field is " + fmt(ratio, 2) + " times planet B's"; d3 = "Planet B's field is " + fmt(1 / ratio, 2) + " times Earth's"; }
  else if (ratio < 1) { key = "Earth's field is " + fmt(1 / ratio, 2) + " times planet B's"; d1 = "The fields are equal"; d2 = "Planet B's field is " + fmt(1 / ratio, 2) + " times Earth's"; d3 = "Planet B's field is " + fmt(ratio, 2) + " times Earth's"; }
  else { key = "The fields are equal"; d1 = "Planet B's field is twice Earth's"; d2 = "Earth's field is twice planet B's"; d3 = "Planet B's field is 4 times Earth's"; }
  return mcq("Planet B has " + mR + " times Earth's mass and " + rR + " times Earth's radius. How does the gravitational field strength at planet B's surface compare with Earth's?",
    key, [d1, d2, d3],
    "Surface field strength follows g = GM/R\u00B2, so the ratio is the mass ratio divided by the radius ratio squared: " + mR + " \u00F7 " + rR + "\u00B2 = " + mR + " \u00F7 " + (rR * rR) + " = " + fmt(ratio, 2) + ". A ratio above 1 means planet B's field is stronger by that factor; below 1 means Earth's is stronger by its reciprocal. Here: " + key + ".",
    {mR: mR, rR: rR});
}]));

/* ---------- PH12.7.3 Electric fields described ---------- */

E("u3-73-field-point-charge", 3, ["PH12.7.3"], 2, "gen", function(){
  var Q = sfR(rf(1.0, 9.0), 3);
  var r = sfR(rf(0.10, 0.90), 3);
  var E = PHYS_K * Q * 1e-6 / (r * r);
  var ans = sfR(E, 3);
  var qq3204 = numq("A point charge of +" + gF(Q) + " \u03BCC is fixed in place. Calculate the electric field strength at a point " + gF(r) + " m from the charge. Give your answer in N/C.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Use E = kQ/r\u00B2. Convert the charge to coulombs: Q = " + gF(Q) + " \u00D7 10\u207B\u2076 C. Multiply k = 8.99 \u00D7 10\u2079 N m\u00B2/C\u00B2 by Q, then divide by r\u00B2 = (" + gF(r) + " m)\u00B2, keeping the powers of ten in words as you go. The result is E = " + F3(ans) + " N/C, directed away from the charge because the charge is positive. The field strength is " + F3(ans) + " N/C.",
    {Q: Q, r: r}); qq3204.figure = p32figPointCharge(Q,r); return qq3204;
});

E("u3-73-force-test-charge", 3, ["PH12.7.3"], 1, "gen", function(){
  var E = sfR(rf(2.0, 9.0) * 1e4, 3);
  var q = sfR(rf(1.0, 9.0), 3);
  var F = E * q * 1e-6;
  var ans = sfR(F, 3);
  return numq("A test charge of +" + gF(q) + " \u03BCC is placed in an electric field of strength " + gF(E) + " N/C. Calculate the force on the test charge. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "The force on a charge in a field is F = qE. Convert the charge: q = " + gF(q) + " \u00D7 10\u207B\u2076 C. Multiply by the field strength " + gF(E) + " N/C, combining the powers of ten in words. The force is F = " + F3(ans) + " N, in the direction of the field because the test charge is positive. The force is " + F3(ans) + " N.",
    {E: E, q: q});
});

E("u3-73-net-field-midway", 3, ["PH12.7.3"], 2, "gen", function(){
  var q1 = sfR(rf(2.0, 6.0), 3);
  var q2 = sfR(q1 + rf(1.0, 5.0), 3);
  var d = sfR(rf(0.20, 0.80), 3);
  var half = d / 2;
  var E1 = PHYS_K * q1 * 1e-6 / (half * half);
  var E2 = PHYS_K * q2 * 1e-6 / (half * half);
  var opp = Math.random() < 0.5;
  var net, dirWord, keyMag, wrongMag;
  if (opp) { net = E1 + E2; wrongMag = Math.abs(E2 - E1); dirWord = "toward the negative charge"; }
  else { net = Math.abs(E2 - E1); wrongMag = E1 + E2; dirWord = "away from the larger positive charge"; }
  var key = F3(net) + " N/C, " + dirWord;
  var wrongDir = opp ? "toward the positive charge" : "toward the larger positive charge";
  var qq3204 = mcq("Charge A is +" + gF(q1) + " \u03BCC and charge B is " + (opp ? "\u2212" : "+") + gF(q2) + " \u03BCC. They are " + gF(d) + " m apart. What is the electric field at the point midway between them?",
    key, [F3(net) + " N/C, " + wrongDir, F3(wrongMag) + " N/C, " + dirWord, F3(wrongMag) + " N/C, " + wrongDir],
    "At the midpoint each charge is " + gF(half) + " m away. Field from A: E = kQ/r\u00B2 = " + F3(E1) + " N/C, pointing away from A (A is positive). Field from B: " + F3(E2) + " N/C, pointing " + (opp ? "toward B, because B is negative, which is the same direction as the field from A" : "away from B, which is back toward A, opposite to the field from A") + ". So the fields " + (opp ? "add" : "partly cancel") + ", giving " + F3(net) + " N/C, " + dirWord + ". The net field is " + key + ".",
    {q1: q1, q2: q2, d: d, opp: opp}); qq3204.figure = p32figMidway(q1,q2,d,opp); return qq3204;
});

E("u3-73-field-two-charges-point", 3, ["PH12.7.3"], 3, "gen", function(){
  var q1 = sfR(rf(2.0, 8.0), 3);
  var q2 = sfR(rf(2.0, 8.0), 3);
  var d1 = sfR(rf(0.15, 0.45), 3);
  var d2 = sfR(d1 + rf(0.20, 0.50), 3);
  var E1 = PHYS_K * q1 * 1e-6 / (d1 * d1);
  var E2 = PHYS_K * q2 * 1e-6 / (d2 * d2);
  var net = Math.abs(E1 - E2);
  var ans = sfR(net, 3);
  var dirWord = E1 > E2 ? "away from the pair of charges, along the line" : "toward the pair of charges, along the line";
  var qq3204 = numq("A charge of +" + gF(q1) + " \u03BCC and a charge of \u2212" + gF(q2) + " \u03BCC lie on a line. Point P is on the same line, on the side of the positive charge away from the negative charge, " + gF(d1) + " m from the positive charge and " + gF(d2) + " m from the negative charge. Calculate the magnitude of the net electric field at P. Give your answer in N/C.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Find each field at P, with signs, and add them as vectors. Step 1: the positive charge's field at P points away from the positive charge, outward along the line away from both charges: E = kQ/r\u00B2 = " + iF(E1) + " N/C. Step 2: the field of a negative charge points toward that charge, so at P the negative charge's field points back along the line toward the charges: E = " + iF(E2) + " N/C, in the opposite direction to the first field. Step 3: the two fields oppose, so the net magnitude is the difference of the magnitudes: " + F3(ans) + " N/C, directed " + dirWord + ", in the direction of the stronger field. The magnitude of the net field at P is " + F3(ans) + " N/C.",
    {q1: q1, q2: q2, d1: d1, d2: d2}); qq3204.figure = p32figTwoChargesPoint(q1,q2,d1,d2); return qq3204;
});

E("u3-73-field-triangle", 3, ["PH12.7.3"], 2, "gen", function(){
  var q = sfR(rf(1.0, 6.0), 3);
  var a = sfR(rf(0.20, 0.60), 3);
  var b = sfR(rf(0.20, 0.60), 3);
  var Ea = PHYS_K * q * 1e-6 / (a * a);
  var Eb = PHYS_K * q * 1e-6 / (b * b);
  var net = Math.sqrt(Ea * Ea + Eb * Eb);
  var gT2 = 0;
  while (gT2++ < 60 && new Set([F3(net), F3(Ea + Eb), F3(Math.abs(Ea - Eb)), F3(net / 2)]).size < 4) {
    b = sfR(rf(0.20, 0.60), 3);
    Eb = PHYS_K * q * 1e-6 / (b * b);
    net = Math.sqrt(Ea * Ea + Eb * Eb);
  }
  var key = F3(net) + " N/C";
  var qq3204 = mcq("Two charges, each +" + gF(q) + " \u03BCC, sit at two corners of a right triangle. Point P is at the third corner. P is " + gF(a) + " m from one charge, measured along one side of the triangle, and " + gF(b) + " m from the other charge, measured along the perpendicular side. What is the magnitude of the net electric field at P?",
    key, [F3(Ea + Eb) + " N/C", F3(Math.abs(Ea - Eb)) + " N/C", F3(net / 2) + " N/C"],
    "Each field at P points away from its positive charge, along the side of the triangle joining them, so the two fields are perpendicular. Their magnitudes are E = kQ/r\u00B2: " + F3(Ea) + " N/C and " + F3(Eb) + " N/C. Perpendicular vectors combine by Pythagoras, not by adding or subtracting: the net magnitude is the square root of the sum of the squares, " + F3(net) + " N/C. The net field magnitude is " + key + ".",
    {q: q, a: a, b: b}); qq3204.figure = p32figChargeTriangle("P","+"+gF(q)+" \u03BCC","+"+gF(q)+" \u03BCC",a,b); return qq3204;
});

E("u3-73-field-lines-concept", 3, ["PH12.7.3"], 1, "var", varset([
  function(){
    var qq3204 = mcq("Which statement about electric field lines is correct?",
      "Field lines begin on positive charges and end on negative charges, and they never cross",
      ["Field lines begin on negative charges and end on positive charges",
       "Field lines can cross where the field is very strong",
       "Field lines are the paths that electrons always follow exactly"],
      "By convention, field lines show the direction of the force on a positive test charge, so they leave positive charges and arrive at negative charges. Two lines can never cross, because that would mean the field pointed in two directions at one point. Field lines begin on positive charges and end on negative charges, and they never cross.", {}); qq3204.figure = p32figFieldLinesVar("posneg"); return qq3204;
  },
  function(){
    var qq3204 = mcq("In a field line diagram, the field is strongest where",
      "The field lines are closest together",
      ["The field lines are farthest apart",
       "The field lines curve the most",
       "The field lines point straight up"],
      "Line density represents strength: where lines crowd together, more lines pass through each unit of area and the field is stronger. Near a point charge the lines spread out with distance, matching the field's 1/r\u00B2 fall. The field is strongest where the lines are closest together.", {}); qq3204.figure = p32figFieldLinesVar("density"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A positive test charge is released from rest at a point in an electric field. The direction it begins to move is",
      "Along the field line at that point, in the direction the line points",
      ["Opposite to the direction the field line points",
       "Perpendicular to the field line at that point",
       "Toward the nearest field line crossing"],
      "The field at a point is defined by the force on a positive test charge there, and the field line's direction is the direction of that force. So a positive charge accelerates along the line, in the direction it points. A negative charge would start off the opposite way.", {}); qq3204.figure = p32figFieldLinesVar("uniform"); return qq3204;
  },
  function(){
    var qq3204 = mcq("The electric field inside a closed, hollow conductor in electrostatic equilibrium is",
      "Zero everywhere inside the hollow space",
      ["Equal to the field at the conductor's surface",
       "Strongest at the centre of the hollow space",
       "Directed from the centre toward the walls"],
      "In electrostatic equilibrium, any free charge in a conductor sits on its outer surface, and the field inside the material and inside a hollow space within it is zero. This is why a metal car body shields occupants from external fields. The field inside the hollow conductor is zero.", {}); qq3204.figure = p32figFieldLinesVar("hollow"); return qq3204;
  }
]));

E("u3-73-zero-field-point", 3, ["PH12.7.3"], 3, "gen", function(){
  var base = pick([1.5, 2.0, 2.5, 3.0]);
  var mult = pick([4, 9]);
  var q1 = base, q2 = base * mult;
  var d = sfR(rf(0.30, 0.90), 3);
  var root = Math.sqrt(mult);
  var x = d / (1 + root);
  var ans = sfR(x, 3);
  var qq3204 = numq("A charge of +" + gF(q1) + " \u03BCC and a charge of +" + gF(q2) + " \u03BCC are " + gF(d) + " m apart. At what distance from the smaller charge, measured along the line between them, is the net electric field zero? Give your answer in m.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Between two positive charges the fields point in opposite directions, so they can cancel. Let x be the distance from the smaller charge; the other distance is " + gF(d) + " m minus x. Setting the field magnitudes equal, kq\u2081/x\u00B2 = kq\u2082/(" + gF(d) + " \u2212 x)\u00B2, the k and the units cancel. Because the larger charge is " + mult + " times the smaller, its distance must be \u221A" + mult + " = " + root + " times as great for the fields to match. So x + " + root + "x = " + gF(d) + " m, giving x = " + F3(ans) + " m. The zero-field point is " + F3(ans) + " m from the smaller charge, closer to it because its field weakens sooner.",
    {q1: q1, q2: q2, d: d}); qq3204.figure = p32figZeroPoint(q1,q2,d); return qq3204;
});

/* ---------- PH12.7.4 Coulomb's law applied ---------- */

E("u3-74-coulomb-force", 3, ["PH12.7.4"], 2, "gen", function(){
  var q1 = sfR(rf(1.0, 9.0), 3);
  var q2 = sfR(rf(1.0, 9.0), 3);
  var r = sfR(rf(0.050, 0.500), 3);
  var F = PHYS_K * q1 * 1e-6 * q2 * 1e-6 / (r * r);
  var ans = sfR(F, 3);
  var qq3204 = numq("Two small charged spheres have charges of +" + gF(q1) + " \u03BCC and \u2212" + gF(q2) + " \u03BCC. Their centres are " + gF(r) + " m apart. Calculate the magnitude of the electric force between them. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Use Coulomb's law, F = kq\u2081q\u2082/r\u00B2. Convert both charges to coulombs (multiply each by 10\u207B\u2076), multiply by k = 8.99 \u00D7 10\u2079 N m\u00B2/C\u00B2, and divide by r\u00B2 = (" + gF(r) + " m)\u00B2, tracking powers of ten in words. The magnitude is F = " + F3(ans) + " N. Because the charges have opposite signs, the force is attractive. The force magnitude is " + F3(ans) + " N.",
    {q1: q1, q2: q2, r: r}); qq3204.figure = p32figTwoSpheres("+"+gF(q1)+" \u03BCC","\u2212"+gF(q2)+" \u03BCC",gF(r)+" m"); return qq3204;
});

E("u3-74-scaling", 3, ["PH12.7.4"], 1, "var", varset([
  function(){
    return mcq("Two point charges attract each other with force F. If the charge on one of them is doubled, with the separation unchanged, the new force is",
      "2F", ["F", "4F", "F/2"],
      "Coulomb's law has the force proportional to each charge: F = kq\u2081q\u2082/r\u00B2. Doubling one charge doubles the product, so the force becomes 2F.", {});
  },
  function(){
    return mcq("Two point charges repel each other with force F. If the distance between them is tripled, with the charges unchanged, the new force is",
      "F/9", ["F/3", "3F", "F/6"],
      "Coulomb's law is an inverse square law in distance. Tripling r divides the force by 3\u00B2 = 9, so the new force is F/9, not F/3.", {});
  },
  function(){
    return mcq("Two point charges exert force F on each other. If both charges are doubled and the distance is also doubled, the new force is",
      "F", ["4F", "2F", "F/4"],
      "Track each change: doubling both charges multiplies the force by 2 \u00D7 2 = 4. Doubling the distance divides it by 2\u00B2 = 4. The two effects cancel exactly, so the new force is F.", {});
  },
  function(){
    return mcq("Two point charges exert force F on each other. If one charge is halved and the distance is halved, the new force is",
      "2F", ["F", "F/2", "4F"],
      "Halving one charge multiplies the force by 1/2. Halving the distance multiplies it by 1/(1/2)\u00B2 = 4. Combined: 1/2 \u00D7 4 = 2, so the new force is 2F.", {});
  },
  function(){
    return mcq("A charge of +Q and a charge of \u2212Q attract with force F. The \u2212Q charge is replaced by a charge of +Q, everything else unchanged. The force between them is now",
      "A repulsion of magnitude F", ["An attraction of magnitude F", "A repulsion of magnitude 2F", "Zero"],
      "Coulomb's law gives the magnitude from the sizes of the charges and the distance, none of which changed, so the magnitude is still F. The sign change flips the character of the force: like charges repel. The force is now a repulsion of magnitude F.", {});
  }
]));

E("u3-74-separation-from-force", 3, ["PH12.7.4"], 3, "gen", function(){
  var q1 = sfR(rf(1.0, 8.0), 3);
  var q2 = sfR(rf(1.0, 8.0), 3);
  var rTrue = sfR(rf(0.100, 0.600), 3);
  var F = sfR(PHYS_K * q1 * 1e-6 * q2 * 1e-6 / (rTrue * rTrue), 3);
  var r = Math.sqrt(PHYS_K * q1 * 1e-6 * q2 * 1e-6 / F);
  var ans = sfR(r, 3);
  var qq3204 = numq("Two charged spheres, +" + gF(q1) + " \u03BCC and +" + gF(q2) + " \u03BCC, repel each other with a force of " + gF(F) + " N. Calculate the distance between their centres. Give your answer in m.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Rearrange Coulomb's law: r\u00B2 = kq\u2081q\u2082/F, then take the square root. Step 1: convert the charges to coulombs and compute kq\u2081q\u2082, tracking the powers of ten in words. Step 2: divide by F = " + gF(F) + " N to get r\u00B2 = " + iF(r * r) + " m\u00B2. Step 3: r is the square root of that: r = " + F3(ans) + " m. The distance between the centres is " + F3(ans) + " m.",
    {q1: q1, q2: q2, F: F}); qq3204.figure = p32figTwoSpheres("+"+gF(q1)+" \u03BCC","+"+gF(q2)+" \u03BCC","?"); return qq3204;
});

E("u3-74-charge-from-force", 3, ["PH12.7.4"], 3, "gen", function(){
  var qTrue = sfR(rf(1.0, 9.0), 3);
  var r = sfR(rf(0.100, 0.500), 3);
  var F = sfR(PHYS_K * qTrue * 1e-6 * qTrue * 1e-6 / (r * r), 3);
  var q = Math.sqrt(F * r * r / PHYS_K) * 1e6;
  var ans = sfR(q, 3);
  var qq3204 = numq("Two identical small spheres carry equal charges and are " + gF(r) + " m apart. They repel each other with a force of " + gF(F) + " N. Calculate the charge on each sphere. Give your answer in \u03BCC.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "With equal charges, Coulomb's law reads F = kq\u00B2/r\u00B2, so q\u00B2 = Fr\u00B2/k. Step 1: square the separation: r\u00B2 = (" + gF(r) + " m)\u00B2 = " + iF(r * r) + " m\u00B2. Step 2: multiply F = " + gF(F) + " N by r\u00B2 and divide by k = 8.99 \u00D7 10\u2079, tracking powers of ten in words, to get q\u00B2 in C\u00B2. Step 3: take the square root and convert back to microcoulombs by multiplying by 10\u2076: q = " + F3(ans) + " \u03BCC. The charge on each sphere is " + F3(ans) + " \u03BCC.",
    {r: r, F: F}); qq3204.figure = p32figTwoSpheres("? \u03BCC","? \u03BCC",gF(r)+" m"); return qq3204;
});

E("u3-74-net-force-collinear", 3, ["PH12.7.4"], 3, "gen", function(){
  var qA = sfR(rf(2.0, 6.0), 3);
  var qB = sfR(rf(2.0, 6.0), 3);
  var qC = sfR(rf(2.0, 6.0), 3);
  var dAB = sfR(rf(0.10, 0.30), 3);
  var dBC = sfR(rf(0.10, 0.30), 3);
  var FBA = PHYS_K * qB * 1e-6 * qA * 1e-6 / (dAB * dAB);
  var FBC = PHYS_K * qB * 1e-6 * qC * 1e-6 / (dBC * dBC);
  var net = Math.abs(FBA - FBC);
  var ans = sfR(net, 3);
  var toward = FBA > FBC ? "toward A" : "toward C";
  var qq3204 = numq("Three charges lie on a line in the order A, B, C. A is +" + gF(qA) + " \u03BCC, B is +" + gF(qB) + " \u03BCC and C is +" + gF(qC) + " \u03BCC. A and B are " + gF(dAB) + " m apart and B and C are " + gF(dBC) + " m apart. Calculate the magnitude of the net force on charge B. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "All three charges are positive, so both neighbours repel B. Step 1: A repels B toward C, with force from Coulomb's law F = " + iF(FBA) + " N. Step 2: C repels B toward A with F = " + iF(FBC) + " N. Step 3: the two forces point in opposite directions, so the net force is the difference of the magnitudes: " + F3(ans) + " N, directed " + toward + ", toward the weaker push. The magnitude of the net force on B is " + F3(ans) + " N.",
    {qA: qA, qB: qB, qC: qC, dAB: dAB, dBC: dBC}); qq3204.figure = p32figCollinear3(qA,qB,qC,dAB,dBC); return qq3204;
});

E("u3-74-net-force-triangle", 3, ["PH12.7.4"], 2, "gen", function(){
  var q = sfR(rf(1.0, 6.0), 3);
  var qt = sfR(rf(1.0, 6.0), 3);
  var a = sfR(rf(0.10, 0.40), 3);
  var b = sfR(rf(0.10, 0.40), 3);
  var Fa = PHYS_K * q * 1e-6 * qt * 1e-6 / (a * a);
  var Fb = PHYS_K * q * 1e-6 * qt * 1e-6 / (b * b);
  var net = Math.sqrt(Fa * Fa + Fb * Fb);
  var gT = 0;
  while (gT++ < 60 && new Set([F3(net), F3(Fa + Fb), F3(Math.abs(Fa - Fb)), F3(net / 2)]).size < 4) {
    b = sfR(rf(0.10, 0.40), 3);
    Fb = PHYS_K * q * 1e-6 * qt * 1e-6 / (b * b);
    net = Math.sqrt(Fa * Fa + Fb * Fb);
  }
  var key = F3(net) + " N";
  var qq3204 = mcq("A charge of +" + gF(qt) + " \u03BCC sits at the corner of a right triangle. Along one side, " + gF(a) + " m away, is a charge of +" + gF(q) + " \u03BCC. Along the perpendicular side, " + gF(b) + " m away, is another charge of +" + gF(q) + " \u03BCC. What is the magnitude of the net electric force on the first charge?",
    key, [F3(Fa + Fb) + " N", F3(Math.abs(Fa - Fb)) + " N", F3(net / 2) + " N"],
    "Both charges repel the first charge, pushing it away along each side of the triangle, so the two forces are perpendicular. Their magnitudes from Coulomb's law are " + F3(Fa) + " N and " + F3(Fb) + " N. Perpendicular forces combine by Pythagoras: the net magnitude is the square root of the sum of the squares, " + F3(net) + " N. The net force magnitude is " + key + ".",
    {q: q, qt: qt, a: a, b: b}); qq3204.figure = p32figChargeTriangle("+"+gF(qt)+" \u03BCC","+"+gF(q)+" \u03BCC","+"+gF(q)+" \u03BCC",a,b); return qq3204;
});

E("u3-74-attract-repel", 3, ["PH12.7.4"], 1, "var", varset([
  function(){
    return mcq("A negatively charged rod is brought near a neutral metal sphere on an insulating stand, without touching it. The sphere is",
      "Attracted to the rod, because the rod repels the sphere's electrons to the far side, leaving the near side positive",
      ["Repelled by the rod, because the sphere is uncharged and cannot interact",
       "Attracted to the rod, because the sphere gains electrons from the rod through the air",
       "Unaffected, because a neutral object has no charges in it at all"],
      "A neutral object still contains equal amounts of positive and negative charge. The rod pushes the sphere's electrons to the far side, so the near side is left positive and closer to the rod; the attraction of the near side beats the repulsion of the far side. The sphere is attracted, with no contact and no charge transfer needed.", {});
  },
  function(){
    return mcq("Two balloons are rubbed on hair and hung side by side. They swing away from each other. This shows that",
      "Both balloons carry the same sign of charge, and like charges repel",
      ["The balloons carry opposite charges, and opposite charges repel",
       "Rubbing created a magnetic field between the balloons",
       "The balloons are attracted to the ceiling and only appear to separate"],
      "Rubbing charges both balloons the same way, by the same process, so they carry the same sign of charge. Like charges repel, so the balloons push apart. Opposite charges would attract and pull the balloons together instead.", {});
  },
  function(){
    return mcq("A charged rod attracts a small neutral scrap of paper. After the paper touches the rod, the paper is often seen to jump away. The jump happens because",
      "On contact the paper gains charge of the same sign as the rod, and like charges then repel",
      ["The rod's charge is used up by the first attraction, so gravity wins",
       "The paper becomes magnetized by contact and is repelled magnetically",
       "Air currents from the rod blow the paper off"],
      "Attraction to a neutral object works by induction: the near side of the paper takes the opposite sign. On contact, charge actually transfers, and the paper ends up with the rod's sign of charge. Now like charges repel and the paper jumps off. The rod keeps most of its charge; it is not used up.", {});
  },
  function(){
    return mcq("Which pair of charges exerts an attractive force on each other?",
      "A charge of +3 \u03BCC and a charge of \u22125 \u03BCC",
      ["A charge of +3 \u03BCC and a charge of +5 \u03BCC",
       "A charge of \u22123 \u03BCC and a charge of \u22125 \u03BCC",
       "A charge of +3 \u03BCC and a neutral metal ball with no induced charge separation"],
      "Attraction happens between opposite signs: one positive and one negative. Two positives repel, two negatives repel, and a neutral ball with no charge separation feels no net force. Only the +3 \u03BCC and \u22125 \u03BCC pair attracts.", {});
  }
]));

E("u3-74-force-ratio-distance", 3, ["PH12.7.4"], 2, "gen", function(){
  var q = sfR(rf(1.0, 8.0), 3);
  var F1 = sfR(rf(0.10, 0.90), 3);
  var k = pick([2, 3]);
  var key = F3(F1 * k * k) + " N";
  return mcq("A charge of +" + gF(q) + " \u03BCC experiences a force of " + gF(F1) + " N from a nearby charged sphere. The charge is moved to a point " + k + " times closer to the sphere, with both charges unchanged. What force does it experience now?",
    key, [F3(F1 * k) + " N", F3(F1) + " N", F3(F1 / (k * k)) + " N"],
    "Coulomb's law is an inverse square law. Moving " + k + " times closer divides the distance by " + k + ", which multiplies the force by " + k + "\u00B2 = " + (k * k) + ". The new force is " + gF(F1) + " N \u00D7 " + (k * k) + " = " + F3(F1 * k * k) + " N. The force now is " + key + ".",
    {q: q, F1: F1, k: k});
});

/* ---------- PH12.7.5 Electric circuits analysed ---------- */

E("u3-75-charge-current", 3, ["PH12.7.5"], 2, "gen", function(){
  var I = sfR(rf(0.400, 3.50), 3);
  var tMin = ri(1, 8);
  var t = tMin * 60;
  var Q = I * t;
  var ans = sfR(Q, 3);
  return numq("A current of " + gF(I) + " A flows through a cabin light circuit for " + tMin + " min. Calculate the total charge that passes through the circuit. Give your answer in C.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Charge is current times time: Q = It. First convert the time: " + tMin + " min = " + t + " s. Then Q = " + gF(I) + " A \u00D7 " + t + " s = " + F3(ans) + " C. The total charge is " + F3(ans) + " C.",
    {I: I, tMin: tMin});
});

E("u3-75-electron-count", 3, ["PH12.7.5"], 2, "gen", function(){
  var Q = sfR(rf(1.0, 9.0), 3);
  var N = Q / PHYS_E;
  var ans = sfR(N, 3);
  return numq("A total charge of " + gF(Q) + " C flows through a wire. Each electron carries a charge of 1.60 \u00D7 10\u207B\u00B9\u2079 C. Calculate how many electrons passed through the wire. Give your answer as a number of electrons.",
    ans, Math.max(0.02 * Math.abs(ans), 1e12),
    "The number of electrons is the total charge divided by the charge on one electron: N = Q/e. Divide " + gF(Q) + " C by 1.60 \u00D7 10\u207B\u00B9\u2079 C, subtracting the powers of ten in words (10\u2070 divided by 10\u207B\u00B9\u2079 gives 10\u00B9\u2079). The result is N = " + F3(ans) + " electrons. Even a few coulombs means an enormous number of electrons, because each electron carries so little charge.",
    {Q: Q});
});

E("u3-75-work-potential", 3, ["PH12.7.5"], 2, "gen", function(){
  var W = sfR(rf(10, 120), 3);
  var Q = sfR(rf(0.500, 8.00), 3);
  var V = W / Q;
  var ans = sfR(V, 3);
  return numq("A battery does " + gF(W) + " J of work moving " + gF(Q) + " C of charge from one terminal to the other. Calculate the potential difference between the terminals. Give your answer in V.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Potential difference is work per unit charge: V = W/Q. So V = " + gF(W) + " J \u00F7 " + gF(Q) + " C = " + F3(ans) + " V. Each coulomb of charge gains " + F3(ans) + " J of energy crossing this battery. The potential difference is " + F3(ans) + " V.",
    {W: W, Q: Q});
});

E("u3-75-resistance", 3, ["PH12.7.5"], 1, "gen", function(){
  var V = sfR(rf(3.0, 24.0), 3);
  var I = sfR(rf(0.200, 3.00), 3);
  var R = V / I;
  var ans = sfR(R, 3);
  return numq("A resistor connected across a " + gF(V) + " V supply draws a current of " + gF(I) + " A. Use R = V/I to calculate its resistance. Give your answer in \u03A9.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Resistance is the ratio of potential difference to current: R = V/I = " + gF(V) + " V \u00F7 " + gF(I) + " A = " + F3(ans) + " \u03A9. The resistance is " + F3(ans) + " \u03A9.",
    {V: V, I: I});
});

E("u3-75-power", 3, ["PH12.7.5"], 2, "gen", function(){
  var V = pick([120, 120, 240]);
  var I = sfR(rf(0.500, 12.0), 3);
  var P = V * I;
  var ans = sfR(P, 3);
  return numq("An appliance connected to a " + V + " V supply draws " + gF(I) + " A. Calculate the power it uses. Give your answer in W.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Electrical power is P = VI. So P = " + V + " V \u00D7 " + gF(I) + " A = " + F3(ans) + " W. The appliance converts electrical energy at a rate of " + F3(ans) + " W. The power is " + F3(ans) + " W.",
    {V: V, I: I});
});

E("u3-75-energy-cost", 3, ["PH12.7.5"], 2, "gen", function(){
  var PkW = sfR(rf(0.800, 2.40), 3);
  var hDay = ri(3, 9);
  var days = pick([30, 31]);
  var rate = pick([0.125, 0.132, 0.148, 0.156]);
  var hours = hDay * days;
  var kWh = PkW * hours;
  var cost = kWh * rate;
  var ans = sfR(cost, 3);
  return numq("An electric heater rated at " + gF(PkW) + " kW runs for " + hDay + " h per day for " + days + " days. Electricity costs $" + fmt(rate, 3) + " per kWh. Calculate the cost of running the heater for that period. Give your answer in dollars.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Work in kilowatt hours. Step 1: total time = " + hDay + " h/day \u00D7 " + days + " days = " + hours + " h. Step 2: energy used = " + gF(PkW) + " kW \u00D7 " + hours + " h = " + iF(kWh) + " kWh. Step 3: cost = energy \u00D7 rate = " + iF(kWh) + " kWh \u00D7 $" + fmt(rate, 3) + "/kWh = $" + F3(ans) + ". The cost of running the heater is $" + F3(ans) + ".",
    {PkW: PkW, hDay: hDay, days: days, rate: rate});
});

E("u3-75-kirchhoff-junction", 3, ["PH12.7.5"], 1, "gen", function(){
  var a = sfR(rf(1.0, 6.0), 2);
  var b = sfR(rf(1.0, 6.0), 2);
  var c = sfR(rf(0.5, a + b - 0.5), 2);
  var d = Math.round((a + b - c) * 100) / 100;
  var guard = 0;
  while ((Math.abs(d - c) < 0.005 || Math.abs(d - Math.abs(a - b)) < 0.005 || Math.abs(c - Math.abs(a - b)) < 0.005) && guard++ < 50) { c = sfR(rf(0.5, a + b - 0.5), 2); d = Math.round((a + b - c) * 100) / 100; }
  var key = fmt(d, 2) + " A";
  var qq3204 = mcq("At a junction in a circuit, currents of " + fmt(a, 2) + " A and " + fmt(b, 2) + " A flow into the junction. One wire leaving the junction carries " + fmt(c, 2) + " A. What current flows in the only other wire leaving the junction?",
    key, [fmt(a + b, 2) + " A", fmt(Math.abs(a - b), 2) + " A", fmt(c, 2) + " A"],
    "Kirchhoff's junction rule: charge is conserved, so the current entering a junction equals the current leaving it. Total in = " + fmt(a, 2) + " A + " + fmt(b, 2) + " A = " + fmt(a + b, 2) + " A. One leaving wire takes " + fmt(c, 2) + " A, so the other carries " + fmt(a + b, 2) + " A \u2212 " + fmt(c, 2) + " A = " + fmt(d, 2) + " A. The current is " + key + ".",
    {a: a, b: b, c: c}); qq3204.figure = p32figJunction(a,b,c); return qq3204;
});

E("u3-75-kirchhoff-loop", 3, ["PH12.7.5"], 2, "gen", function(){
  var emf = pick([12, 18, 24, 36]);
  var v1 = sfR(rf(2.0, emf / 3), 2);
  var v2 = sfR(rf(2.0, emf / 3), 2);
  var v3 = Math.round((emf - v1 - v2) * 100) / 100;
  var guard2 = 0;
  while (guard2++ < 80) {
    var vs = [v3, v1 + v2, emf - v1, emf];
    var bad2 = false;
    for (var i2 = 0; i2 < 4; i2++) for (var j2 = i2 + 1; j2 < 4; j2++) if (Math.abs(vs[i2] - vs[j2]) < 0.011) bad2 = true;
    if (!bad2) break;
    v1 = sfR(rf(2.0, emf / 3), 2); v2 = sfR(rf(2.0, emf / 3), 2); v3 = Math.round((emf - v1 - v2) * 100) / 100;
  }
  var key = fmt(v3, 2) + " V";
  var qq3204 = mcq("A series loop contains a " + emf + " V battery and three resistors. The potential drops across two of the resistors are " + fmt(v1, 2) + " V and " + fmt(v2, 2) + " V. What is the potential drop across the third resistor?",
    key, [fmt(v1 + v2, 2) + " V", fmt(emf - v1, 2) + " V", fmt(emf, 2) + " V"],
    "Kirchhoff's loop rule: going around a closed loop, the battery's gain equals the sum of the drops. So the three drops add to " + emf + " V. The third drop is " + emf + " V \u2212 " + fmt(v1, 2) + " V \u2212 " + fmt(v2, 2) + " V = " + fmt(v3, 2) + " V. The third drop is " + key + ".",
    {emf: emf, v1: v1, v2: v2}); qq3204.figure = p32figLoopDrops(emf,v1,v2); return qq3204;
});

E("u3-75-series-resistance", 3, ["PH12.7.5"], 1, "gen", function(){
  var rs = [ri(2, 40), ri(2, 40), ri(2, 40)];
  var tot = rs[0] + rs[1] + rs[2];
  var qq3204 = numq("Three resistors of " + rs[0] + " \u03A9, " + rs[1] + " \u03A9 and " + rs[2] + " \u03A9 are connected in series. Calculate the equivalent resistance. Give your answer in \u03A9.",
    tot, 0.4,
    "Resistances in series add directly, because the same current must pass through each one in turn: R = " + rs[0] + " \u03A9 + " + rs[1] + " \u03A9 + " + rs[2] + " \u03A9 = " + tot + " \u03A9. The equivalent resistance is " + tot + " \u03A9.",
    {rs: rs}); qq3204.figure = p32figCircuitSeries(null,[rs[0]+" \u03A9",rs[1]+" \u03A9",rs[2]+" \u03A9"]); return qq3204;
});

E("u3-75-parallel-resistance", 3, ["PH12.7.5"], 2, "gen", function(){
  var r1 = ri(3, 60);
  var r2 = ri(3, 60);
  var Rp = r1 * r2 / (r1 + r2);
  var ans = sfR(Rp, 3);
  var qq3204 = numq("Resistors of " + r1 + " \u03A9 and " + r2 + " \u03A9 are connected in parallel. Calculate the equivalent resistance. Give your answer in \u03A9.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "For two resistors in parallel, use the product over the sum: R = (R\u2081 \u00D7 R\u2082)/(R\u2081 + R\u2082) = (" + r1 + " \u03A9 \u00D7 " + r2 + " \u03A9) \u00F7 (" + r1 + " \u03A9 + " + r2 + " \u03A9) = " + (r1 * r2) + " \u00F7 " + (r1 + r2) + " = " + F3(ans) + " \u03A9. The equivalent resistance is smaller than either resistor alone, because the current has two paths. The equivalent resistance is " + F3(ans) + " \u03A9.",
    {r1: r1, r2: r2}); qq3204.figure = p32figCircuitParallel(null,r1,r2); return qq3204;
});

E("u3-75-combination-circuit", 3, ["PH12.7.5"], 3, "gen", function(){
  var V = pick([12, 24, 36, 48]);
  var r1 = ri(2, 20);
  var r2 = ri(4, 40);
  var r3 = ri(4, 40);
  var Rp = r2 * r3 / (r2 + r3);
  var Req = r1 + Rp;
  var I = V / Req;
  var ans = sfR(I, 3);
  var qq3204 = numq("A " + V + " V battery is connected to a " + r1 + " \u03A9 resistor in series with a parallel pair of " + r2 + " \u03A9 and " + r3 + " \u03A9 resistors. Calculate the total current drawn from the battery. Give your answer in A.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Reduce the circuit step by step. Step 1: the parallel pair: R = (" + r2 + " \u00D7 " + r3 + ") \u00F7 (" + r2 + " + " + r3 + ") = " + iF(Rp) + " \u03A9. Step 2: add the series resistor: R(total) = " + r1 + " \u03A9 + " + iF(Rp) + " \u03A9 = " + iF(Req) + " \u03A9. Step 3: total current I = V/R = " + V + " V \u00F7 " + iF(Req) + " \u03A9 = " + F3(ans) + " A. The total current is " + F3(ans) + " A.",
    {V: V, r1: r1, r2: r2, r3: r3}); qq3204.figure = p32figCircuitCombo(V,r1,r2,r3); return qq3204;
});

E("u3-75-circuit-table", 3, ["PH12.7.5"], 2, "gen", function(){
  var V = pick([24, 36, 48, 60]);
  var r1 = ri(3, 30);
  var r2 = ri(3, 30);
  var I = V / (r1 + r2);
  var v2 = I * r2;
  var ans = sfR(v2, 3);
  var qq3204 = numq("A " + V + " V source is connected across a series circuit of a " + r1 + " \u03A9 resistor and a " + r2 + " \u03A9 resistor. For a circuit table of this circuit, calculate the potential difference across the " + r2 + " \u03A9 resistor. Give your answer in V.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "In series the current is the same everywhere. Step 1: total resistance R = " + r1 + " \u03A9 + " + r2 + " \u03A9 = " + (r1 + r2) + " \u03A9. Step 2: current I = V/R = " + V + " V \u00F7 " + (r1 + r2) + " \u03A9 = " + iF(I) + " A. Step 3: the drop across the " + r2 + " \u03A9 resistor is V = IR = " + iF(I) + " A \u00D7 " + r2 + " \u03A9 = " + F3(ans) + " V. As a check, the drop across the other resistor makes the total add back to " + V + " V. The potential difference is " + F3(ans) + " V.",
    {V: V, r1: r1, r2: r2}); qq3204.figure = p32figCircuitSeries(V,[r1+" \u03A9",r2+" \u03A9"]); return qq3204;
});

E("u3-75-parallel-branches", 3, ["PH12.7.5"], 2, "gen", function(){
  var V = pick([12, 24, 36]);
  var r1 = ri(4, 48);
  var r2 = ri(4, 48);
  var I1 = V / r1, I2 = V / r2;
  var Itot = I1 + I2;
  var ans = sfR(Itot, 3);
  var qq3204 = numq("A " + V + " V source is connected across two parallel branches. One branch has a resistance of " + r1 + " \u03A9 and the other a resistance of " + r2 + " \u03A9. Calculate the total current drawn from the source. Give your answer in A.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Each parallel branch has the full source voltage across it. Step 1: current in the " + r1 + " \u03A9 branch: I = V/R = " + V + " V \u00F7 " + r1 + " \u03A9 = " + iF(I1) + " A. Step 2: current in the " + r2 + " \u03A9 branch: I = " + V + " V \u00F7 " + r2 + " \u03A9 = " + iF(I2) + " A. Step 3: by the junction rule the total current is the sum of the branch currents: " + iF(I1) + " A + " + iF(I2) + " A = " + F3(ans) + " A. The total current is " + F3(ans) + " A.",
    {V: V, r1: r1, r2: r2}); qq3204.figure = p32figCircuitParallel(V,r1,r2); return qq3204;
});

E("u3-75-fuse-rating", 3, ["PH12.7.5"], 3, "gen", function(){
  var over = Math.random() < 0.5;
  var apps = over ? [ri(1300, 1600), ri(800, 1100), ri(500, 800)] : [ri(600, 900), ri(300, 500), ri(100, 300)];
  var P = apps[0] + apps[1] + apps[2];
  var I = P / 120;
  var key = over ? ("The total current is " + F3(I) + " A, so the 15 A breaker will trip") : ("The total current is " + F3(I) + " A, so the load is within the 15 A breaker rating");
  var dOver = "The total current is " + F3(I) + " A, so the load is within the 15 A breaker rating";
  var dUnder = "The total current is " + F3(I) + " A, so the 15 A breaker will trip";
  var dPow = "The total power is " + F3(I) + " W, so the load is safe";
  return mcq("A 120 V household circuit protected by a 15 A breaker feeds a " + apps[0] + " W heater, a " + apps[1] + " W kettle and a " + apps[2] + " W toaster oven, all running at once. Which statement is correct?",
    key, [over ? dOver : dUnder, dPow, "The breaker compares voltages, so the current does not matter here"],
    "Add the powers: total = " + apps[0] + " W + " + apps[1] + " W + " + apps[2] + " W = " + P + " W. The current drawn is I = P/V = " + P + " W \u00F7 120 V = " + F3(I) + " A. Compare with the 15 A rating: " + (over ? "the load exceeds it, so the breaker trips to protect the wiring." : "the load is under it, so the circuit runs within its rating.") + " " + key + ".",
    {apps: apps, over: over});
});

/* ---------- PH12.7.6 Magnetic fields described ---------- */

E("u3-76-field-lines-magnet", 3, ["PH12.7.6"], 1, "var", varset([
  function(){
    var qq3204 = mcq("Outside a bar magnet, the magnetic field lines are drawn",
      "Leaving the north pole and entering the south pole",
      ["Leaving the south pole and entering the north pole",
       "Leaving both poles and meeting halfway between them",
       "Circling the magnet like the lines around a wire"],
      "By convention, field lines show the direction a north pole would be pushed. Outside the magnet they leave the north pole and enter the south pole. Inside the magnet they continue from south to north, so each line is a closed loop. Field lines leave the north pole and enter the south pole outside the magnet.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("The magnetic field of a bar magnet is strongest",
      "Near the poles, where the field lines are closest together",
      ["At the centre of the magnet, halfway between the poles",
       "Far from the magnet, where the field lines spread out",
       "Everywhere along the magnet equally"],
      "Line spacing shows strength: lines crowd together near the poles and spread out with distance. The field is strongest near the poles, which is why a magnet picks up pins at its ends, not its middle.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("A small compass is placed just outside the north pole of a bar magnet, on the magnet's axis. The compass needle's north pole points",
      "Away from the magnet's north pole, along the field line",
      ["Toward the magnet's north pole",
       "Toward the magnet's south pole along the side of the magnet",
       "Straight up, because compasses only respond to Earth's field"],
      "A compass needle aligns with the local field, and its north pole points in the field's direction. Outside the north pole the field points away from the magnet, so the needle's north points away too. Compasses respond to any magnetic field, not just Earth's.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("Two magnetic field lines in a diagram of a bar magnet's field",
      "Never cross, because the field has a single direction at each point",
      ["Cross at the neutral point between two magnets only",
       "Cross wherever the field is strongest",
       "Cross at the poles, where all lines meet"],
      "A field line shows the field's direction at each point it passes through. If two lines crossed, the field at the crossing would point two ways at once, which is impossible. Field lines never cross.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  }
]));

E("u3-76-field-wire-lines", 3, ["PH12.7.6"], 1, "var", varset([
  function(){
    var qq3204 = mcq("The magnetic field lines around a long straight wire carrying a steady current form",
      "Concentric circles centred on the wire",
      ["Straight lines radiating out from the wire",
       "Lines running parallel to the wire along its length",
       "A helix that spirals along the wire"],
      "The field circles the wire: a compass placed anywhere near the wire aligns tangent to a circle centred on the wire. The pattern is concentric circles, with the direction given by the right-hand rule: thumb along the current, fingers curl with the field.", {}); qq3204.figure = p32figWireCircles(); return qq3204;
  },
  function(){
    var qq3204 = mcq("As you move farther from a long straight current-carrying wire, the field lines in a diagram are drawn",
      "Farther apart, because the field gets weaker with distance",
      ["Closer together, because the field gets stronger with distance",
       "At the same spacing, because the field around a wire is uniform",
       "In the opposite direction, because the field reverses"],
      "The field around a wire falls off as 1/r, so it weakens steadily with distance. In a line diagram, weakening is shown by lines spreading apart. The field keeps the same circular direction; only its strength falls.", {}); qq3204.figure = p32figWireCircles(); return qq3204;
  },
  function(){
    var qq3204 = mcq("The current in a straight wire is reversed. What happens to the magnetic field around the wire?",
      "Every field line keeps its circular shape but points the opposite way around the wire",
      ["The field disappears until the current is restored",
       "The field lines become straight and point along the wire",
       "Nothing changes, because field direction does not depend on current direction"],
      "The right-hand rule ties field direction to current direction: reverse the thumb and the fingers curl the other way. The circles stay circles, centred on the wire, but their direction reverses everywhere. The field reverses direction when the current reverses.", {}); qq3204.figure = p32figWireCircles(); return qq3204;
  },
  function(){
    var qq3204 = mcq("To find the field direction around a straight wire using the right hand, you",
      "Point the thumb along the conventional current and let the fingers curl in the field's direction",
      ["Point the fingers along the current and the thumb gives the field direction",
       "Point the thumb opposite to the current and the fingers give the field direction",
       "Hold the hand flat with the palm facing the wire, and the palm gives the direction"],
      "For a straight wire it is the grasp rule: thumb in the direction of conventional current (flow of positive charge), and the curling fingers show the way the field circles the wire. This is the correct use of the right hand for a wire.", {}); qq3204.figure = p32figWireCircles(); return qq3204;
  }
]));

E("u3-76-compass-wire", 3, ["PH12.7.6"], 2, "var", varset([
  function(){
    var qq3204 = mcq("A compass sits beside a straight vertical wire. With no current in the wire, the compass points north, along Earth's field. The current is switched on, flowing upward, and the compass needle swings away from north. The needle swings because",
      "The wire's circular field at the compass is strong enough to pull the needle partly toward the field's local direction",
      ["The current heats the compass and weakens its magnet",
       "Earth's field is switched off by the current in the wire",
       "The electric field of the wire pushes the needle directly"],
      "The needle aligns with the net field at its location. With the current on, the wire's circular field adds to Earth's field, and the needle settles along the combination, deflected from north. Nothing switches Earth's field off, and it is the magnetic field of the wire that acts on the needle.", {}); qq3204.figure = p32figCompassWire(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("In the same setup, the current in the wire is reversed. The compass needle, which had deflected one way, now",
      "Deflects to the opposite side of north, because the wire's field has reversed",
      ["Returns exactly to north and stays there",
       "Deflects farther in the same direction",
       "Spins continuously while the current flows"],
      "Reversing the current reverses the wire's circular field. The wire's contribution at the compass now pulls the needle the other way, so the deflection flips to the opposite side of north. The needle deflects to the opposite side when the current reverses.", {}); qq3204.figure = p32figCompassWire(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("A compass near a current-carrying wire deflects 30 degrees from north. The current is then doubled. The deflection",
      "Increases, because the wire's field is stronger and pulls the needle farther from Earth's field direction",
      ["Stays exactly 30 degrees, because compasses measure direction only",
       "Decreases, because a stronger field aligns needles with north",
       "Becomes 60 degrees exactly, because deflection is proportional to current"],
      "Doubling the current doubles the wire's field, so the wire's sideways pull on the needle grows relative to Earth's field and the needle settles farther from north. The exact new angle is not simply double, because the needle balances two fields at right angles to each other, but it definitely increases.", {}); qq3204.figure = p32figCompassWire(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("A wire runs horizontally above a compass, in the north-south direction, with current flowing north. The compass needle deflects. When the same current flows through the wire running east-west instead, directly above the compass, the needle",
      "Deflects much less, because the wire's field at the compass is then along the north-south line rather than across it",
      ["Deflects exactly the same amount, because the current is unchanged",
       "Deflects twice as far, because the wire is closer to the needle's poles",
       "Cannot deflect, because an east-west wire produces no field"],
      "Deflection comes from the part of the wire's field that points across Earth's field (east-west). With the wire running east-west, the circular field directly below the wire points north or south, along Earth's field, so it barely turns the needle. Geometry, not just current size, decides the deflection.", {}); qq3204.figure = p32figCompassWire(true); return qq3204;
  }
]));

E("u3-76-domains", 3, ["PH12.7.6"], 1, "var", varset([
  function(){
    return mcq("In domain theory, a magnetic domain is",
      "A small region of a material in which the atomic magnetic fields are aligned with each other",
      ["A region from which all atomic magnetic fields have been removed",
       "The space around a magnet where its field can be detected",
       "A single atom that acts as a tiny bar magnet"],
      "Ferromagnetic materials are divided into domains: tiny regions, each containing many atoms whose magnetic fields point the same way, so each domain acts like one small magnet. A domain is a region of aligned atomic magnetic fields, much bigger than one atom, and it is inside the material, not the space around a magnet.", {});
  },
  function(){
    return mcq("An unmagnetized iron nail can be picked up by a magnet but is not itself a magnet. Domain theory explains this because in the unmagnetized nail",
      "The domains point in random directions, so their fields cancel out",
      ["There are no domains until a magnet creates them",
       "All the domains point the same way but the nail is too small to notice",
       "The domains contain no magnetic fields at all"],
      "The nail's domains exist all along, each magnetized within itself. Unmagnetized simply means their directions are random, so the fields cancel and the nail shows no overall poles. Bringing a magnet near aligns many domains and the nail becomes temporarily magnetized. The domains point in random directions in an unmagnetized nail.", {});
  },
  function(){
    return mcq("Stroking an iron bar repeatedly in one direction with a magnet can magnetize the bar. In domain terms, the stroking",
      "Persuades more and more domains to align with the applied field, until most point the same way",
      ["Adds extra domains to the bar from the magnet",
       "Removes domains whose fields point the wrong way",
       "Melts the domains together into one large atom"],
      "An applied field grows the domains that are aligned with it and rotates others toward it. Repeated stroking in one direction aligns most domains the same way, and the bar keeps that alignment as its own magnetization. Domains are rearranged, not added, removed or melted.", {});
  },
  function(){
    return mcq("A magnetized steel bar is heated red hot and then dropped several times on a hard floor. Afterwards it is only weakly magnetic. Domain theory explains this because",
      "Heating and jarring give the domains enough energy to fall back into random directions",
      ["The heat burns the domains out of the steel",
       "Dropping the bar knocks the north pole off the end",
       "The steel's domains all align with Earth's field instead"],
      "Alignment is an ordered state. Heat shakes the atomic magnets violently and impacts jar the domains, so many slip back into random orientations and their fields cancel again. Nothing is burned away and no pole is knocked off: the domains simply randomize.", {});
  }
]));

E("u3-76-field-direction", 3, ["PH12.7.6"], 2, "var", varset([
  function(){
    return mcq("The direction of a magnetic field at a point is defined as",
      "The direction in which the north pole of a small compass needle points when placed at that point",
      ["The direction in which the south pole of a compass needle points",
       "The direction a free electron moves at that point",
       "The direction from the south pole to the north pole outside any magnet"],
      "Just as the electric field is defined using a positive test charge, the magnetic field's direction is defined by a north test pole, which is what a compass needle's north end is. The field direction at a point is where a compass north pole points.", {});
  },
  function(){
    return mcq("A compass needle points toward Earth's geographic north. This works because",
      "The magnetic pole near geographic north is a magnetic south pole, which attracts the needle's north pole",
      ["The magnetic pole near geographic north is a magnetic north pole, which attracts the needle's north pole",
       "Compass needles are attracted to the coldest point on Earth",
       "Earth's rotation drags compass needles toward the axis"],
      "Opposite poles attract. The needle's north pole is drawn toward the pole near geographic north, so that pole must be a magnetic south pole, whatever it is called geographically. Like poles would repel and point the needle south. The pole near geographic north is a magnetic south pole.", {});
  },
  function(){
    var qq3204 = mcq("A bar magnet is hung from a thread so it can swing freely, far from other magnets. It settles pointing roughly north-south because",
      "It aligns itself with Earth's magnetic field, like a large compass needle",
      ["Earth's gravity pulls the heavier north pole downward toward the north",
       "The thread twists until the magnet points north by itself",
       "The magnet is attracted to the iron in distant buildings"],
      "A freely suspended magnet experiences a turning effect from Earth's field until its own field aligns with it, exactly as a compass needle does. It comes to rest along the local field direction, north-south. Gravity acts at the centre of mass and does not aim the poles.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  },
  function(){
    var qq3204 = mcq("Iron filings are sprinkled on a card over a bar magnet and the card is tapped. The filings form curved lines that are densest at the poles. The pattern shows",
      "The shape of the field and where it is strongest, with each filing aligning along the field like a tiny compass",
      ["The exact paths that magnetic charges travel along the card",
       "That the field exists only exactly on those lines, with gaps between",
       "The temperature pattern of the magnet's surface"],
      "Each filing becomes a small induced magnet and rotates to lie along the local field, chaining into lines that trace the field's shape. The lines are a sampling of a field that exists everywhere in the region, not wires the field travels on, and crowding at the poles shows the field is strongest there.", {}); qq3204.figure = p32figBarMagnet(false); return qq3204;
  }
]));

/* ---------- PH12.7.7 Magnetic field from current ---------- */

E("u3-77-field-wire", 3, ["PH12.7.7"], 1, "gen", function(){
  var I = sfR(rf(2.0, 30.0), 3);
  var r = sfR(rf(0.010, 0.200), 3);
  var B = MU0 * I / (2 * Math.PI * r);
  var ans = sfR(B, 3);
  var qq3204 = numq("The magnetic field strength at a distance r from a long straight wire is B = \u03BC\u2080I/(2\u03C0r), where \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077 T m/A. A wire carries a current of " + gF(I) + " A. Calculate the field strength at a point " + gF(r) + " m from the wire. Give your answer in T.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Substitute into B = \u03BC\u2080I/(2\u03C0r). The 4\u03C0 in \u03BC\u2080 cancels the 2\u03C0 partly, leaving 2 \u00D7 10\u207B\u2077 times I divided by r: B = 2 \u00D7 10\u207B\u2077 \u00D7 " + gF(I) + " \u00F7 " + gF(r) + ", evaluated with the power of ten handled in words. The field strength is B = " + F3(ans) + " T. Fields near household wires are tiny compared with Earth's field of about 5 \u00D7 10\u207B\u2075 T.",
    {I: I, r: r}); qq3204.figure = p32figWireCircles(); return qq3204;
});

E("u3-77-current-from-field", 3, ["PH12.7.7"], 2, "gen", function(){
  var ITrue = sfR(rf(5.0, 60.0), 3);
  var r = sfR(rf(0.020, 0.150), 3);
  var B = sfR(MU0 * ITrue / (2 * Math.PI * r), 3);
  var I = 2 * Math.PI * r * B / MU0;
  var ans = sfR(I, 3);
  var qq3204 = numq("A long straight power line produces a magnetic field of " + gF(B) + " T at a point " + gF(r) + " m from the wire. Using B = \u03BC\u2080I/(2\u03C0r) with \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077 T m/A, calculate the current in the wire. Give your answer in A.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Rearrange the formula before substituting: I = 2\u03C0rB/\u03BC\u2080. Step 1: because \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077, the ratio 2\u03C0/\u03BC\u2080 simplifies to 1/(2 \u00D7 10\u207B\u2077) = 5 \u00D7 10\u2076, so I = 5 \u00D7 10\u2076 \u00D7 r \u00D7 B with r and B in SI units. Step 2: substitute r = " + gF(r) + " m and B = " + gF(B) + " T, handling the power of ten in words: I = " + F3(ans) + " A. The current in the wire is " + F3(ans) + " A.",
    {B: B, r: r}); qq3204.figure = p32figWireCircles(); return qq3204;
});

E("u3-77-net-field-two-wires", 3, ["PH12.7.7"], 3, "gen", function(){
  var I1 = sfR(rf(4.0, 20.0), 3);
  var I2 = sfR(rf(4.0, 20.0), 3);
  var d = sfR(rf(0.040, 0.200), 3);
  var midway = Math.random() < 0.5;
  var B1, B2, net, geom;
  if (midway) {
    B1 = MU0 * I1 / (2 * Math.PI * (d / 2));
    B2 = MU0 * I2 / (2 * Math.PI * (d / 2));
    net = Math.abs(B1 - B2);
    geom = "midway between the wires";
  } else {
    var x = sfR(rf(0.020, 0.100), 3);
    B1 = MU0 * I1 / (2 * Math.PI * (d + x));
    B2 = MU0 * I2 / (2 * Math.PI * x);
    net = B1 + B2;
    geom = "outside the pair, " + gF(x) + " m beyond the second wire on the line joining the wires";
  }
  var ans = sfR(net, 3);
  var qq3204 = numq("Two long parallel wires are " + gF(d) + " m apart and carry currents of " + gF(I1) + " A and " + gF(I2) + " A in the same direction. Calculate the magnitude of the net magnetic field at a point " + geom + ". Give your answer in T.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Find each wire's field at the point with B = \u03BC\u2080I/(2\u03C0r), then combine directions. Wire 1 contributes " + iF(B1) + " T and wire 2 contributes " + iF(B2) + " T. " + (midway ? "Between the wires, the two circular fields point in opposite directions (the right-hand rule gives one pointing into the page and the other out of it), so the net field is the difference of the magnitudes." : "Outside the pair on this side, both circular fields point in the same direction, so the magnitudes add.") + " The net field magnitude is " + F3(ans) + " T.",
    {I1: I1, I2: I2, d: d, midway: midway}); qq3204.figure = p32figTwoWires(I1,I2,d,midway,typeof x==="undefined"?null:x); return qq3204;
});

E("u3-77-field-scaling", 3, ["PH12.7.7"], 2, "var", varset([
  function(){
    return mcq("At a point near a long straight wire the field is B. If the current is doubled and the distance is unchanged, the field becomes",
      "2B", ["B", "4B", "B/2"],
      "The field around a wire is proportional to the current: B = \u03BC\u2080I/(2\u03C0r). Doubling I doubles B, giving 2B.", {});
  },
  function(){
    return mcq("At a point near a long straight wire the field is B. If the distance from the wire is tripled and the current is unchanged, the field becomes",
      "B/3", ["B/9", "3B", "B"],
      "Unlike a point charge's field, the wire's field follows a simple inverse proportion, B varies as 1/r, not 1/r\u00B2. Tripling r gives B/3.", {});
  },
  function(){
    return mcq("At a point near a long straight wire the field is B. If the current is doubled and the distance is also doubled, the field becomes",
      "B", ["2B", "4B", "B/2"],
      "Doubling the current doubles the field, and doubling the distance halves it. The two changes cancel: the field stays B.", {});
  },
  function(){
    return mcq("At a point near a long straight wire the field is B. If the current is halved and the distance is halved, the field becomes",
      "B", ["B/4", "2B", "B/2"],
      "Halving the current halves the field; halving the distance doubles it. The changes cancel, and the field stays B.", {});
  }
]));

E("u3-77-solenoid-field", 3, ["PH12.7.7"], 2, "gen", function(){
  var N = ri(200, 1200);
  var L = sfR(rf(0.100, 0.600), 3);
  var I = sfR(rf(0.500, 5.00), 3);
  var n = N / L;
  var B = MU0 * n * I;
  var ans = sfR(B, 3);
  var qq3204 = numq("A solenoid has " + N + " turns wound over a length of " + gF(L) + " m and carries a current of " + gF(I) + " A. The field inside a solenoid is B = \u03BC\u2080nI, where n is the number of turns per metre and \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077 T m/A. Calculate the field strength inside the solenoid. Give your answer in T.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "Step 1: turns per metre n = N/L = " + N + " \u00F7 " + gF(L) + " m = " + iF(n) + " turns/m. Step 2: B = \u03BC\u2080nI: multiply \u03BC\u2080 = 4\u03C0 \u00D7 10\u207B\u2077 by n and by I = " + gF(I) + " A, tracking the power of ten in words. The field inside is B = " + F3(ans) + " T, directed along the solenoid's axis. The field strength inside the solenoid is " + F3(ans) + " T.",
    {N: N, L: L, I: I}); qq3204.figure = p32figSolenoid(N,L,I); return qq3204;
});

E("u3-77-solenoid-poles", 3, ["PH12.7.7"], 2, "gen", function(){
  var ccw = Math.random() < 0.5;
  var turns = ri(150, 900);
  var key = ccw ? "End A acts as a north pole" : "End A acts as a south pole";
  var other = ccw ? "End A acts as a south pole" : "End A acts as a north pole";
  var qq3204 = mcq("A solenoid of " + turns + " turns carries a steady current. Looking directly at end A of the solenoid, you see the current circulating " + (ccw ? "counterclockwise" : "clockwise") + " around that end. Which statement is correct?",
    key, [other, "Both ends act as north poles", "Neither end acts as a pole until a core is inserted"],
    "Use the right-hand rule for a coil: curl the fingers of the right hand in the direction the current circulates, and the thumb points toward the north end. Current circulating counterclockwise as seen from end A means the thumb points out of end A, toward you, so end A is the north end. (Clockwise as seen from an end makes that end a south pole.) " + key + ". An iron core strengthens a solenoid but is not needed for it to have poles.",
    {ccw: ccw, turns: turns}); qq3204.figure = p32figSolenoidEnd(ccw,turns); return qq3204;
});

E("u3-77-compass-solenoid", 3, ["PH12.7.7"], 1, "var", varset([
  function(){
    var qq3204 = mcq("A current flows through a solenoid, making its end A a north pole. A compass is placed just outside end A, on the axis. The compass needle's north pole points",
      "Away from end A, continuing the line of the field outside the solenoid",
      ["Toward end A, because opposite poles attract the needle",
       "Sideways, because the field outside a solenoid is circular",
       "Nowhere, because a solenoid's field exists only inside it"],
      "Outside a solenoid the field has the same pattern as a bar magnet's: lines leave the north pole. A compass north pole follows the field direction, so outside end A it points away from the solenoid. The field does not stop at the solenoid's surface; it loops around outside from north to south.", {}); qq3204.figure = p32figSolenoidCompass("outside"); return qq3204;
  },
  function(){
    var qq3204 = mcq("The current through a solenoid is switched off while a compass sits beside it, deflected by the solenoid's field. The compass needle",
      "Settles back to pointing along Earth's field, roughly north",
      ["Stays deflected, because the solenoid stays magnetized forever",
       "Points at the solenoid's south end, which keeps its pole",
       "Spins until the current is turned on again"],
      "An air-core solenoid is an electromagnet: no current, no field of its own. (A steel core can keep a little residual magnetism, but the strong field vanishes with the current.) The compass then answers only to Earth's field and settles back toward north.", {}); qq3204.figure = p32figSolenoidCompass("outside"); return qq3204;
  },
  function(){
    var qq3204 = mcq("A compass is placed inside a current-carrying solenoid, away from the ends. The needle",
      "Aligns with the solenoid's axis, pointing toward the north end of the solenoid",
      ["Points around a circle, following the windings",
       "Is unaffected, because the fields of the loops cancel inside",
       "Points toward whichever end is nearer, regardless of polarity"],
      "Inside a solenoid the fields of all the loops add along the axis, producing a strong, nearly uniform field parallel to the axis. A compass there aligns with the axis, its north pole toward the solenoid's north end, just as it would inside the field of a hollow bar magnet.", {}); qq3204.figure = p32figSolenoidCompass("inside"); return qq3204;
  },
  function(){
    var qq3204 = mcq("Two identical solenoids carry the same current. One has an iron core and one is hollow. A compass near the north end of each deflects far more for the iron-core solenoid because",
      "The iron's domains align with the coil's field and add their own field to it",
      ["Iron conducts the current better, so the coil carries more current",
       "The iron core blocks Earth's field so the compass sees only the coil",
       "Iron is naturally attracted to compass needles"],
      "The coil's field magnetizes the iron: its domains align and the core becomes a magnet in its own right, adding to the coil's field. The current is the same in both coils; it is the core's added magnetization that strengthens the total field.", {}); qq3204.figure = p32figSolenoidCompass("core"); return qq3204;
  }
]));

E("u3-77-hand-rule", 3, ["PH12.7.7"], 1, "var", varset([
  function(){
    var qq3204 = mcq("A vertical wire carries current straight upward. At a point due east of the wire, the magnetic field points",
      "North", ["South", "East", "Up"],
      "Use the grasp rule: right thumb up, along the current. On the east side of the wire the fingers, and so the field, point north (tangent to the circle around the wire). At a point east of the wire, the field points north.", {}); qq3204.figure = p32figHandRule(0); return qq3204;
  },
  function(){
    var qq3204 = mcq("A vertical wire carries current straight upward. At a point due west of the wire, the magnetic field points",
      "South", ["North", "West", "Down"],
      "With the thumb up along the current, the fingers circle the wire. On the west side they point opposite to their direction on the east side: south. At a point west of the wire, the field points south.", {}); qq3204.figure = p32figHandRule(1); return qq3204;
  },
  function(){
    var qq3204 = mcq("A vertical wire carries current straight downward. At a point due east of the wire, the magnetic field points",
      "South", ["North", "East", "Down"],
      "Reversing the current reverses the field everywhere. Thumb down: on the east side the fingers now point south, where they pointed north for an upward current. At a point east of the wire, the field points south.", {}); qq3204.figure = p32figHandRule(2); return qq3204;
  },
  function(){
    var qq3204 = mcq("A horizontal wire runs east-west above a table and carries current toward the east. At a point on the table directly below the wire, the magnetic field points",
      "North", ["South", "East", "Down"],
      "Point the right thumb east, along the current. Below the wire the curled fingers point north (on the underside of the circle around the wire). So directly below the wire, the field points north.", {}); qq3204.figure = p32figHandRule(3); return qq3204;
  }
]));

/* ---------- PH12.7.8 Forces on moving charges and currents ---------- */

E("u3-78-force-conductor", 3, ["PH12.7.8"], 2, "gen", function(){
  var B = sfR(rf(0.050, 0.600), 3);
  var I = sfR(rf(1.0, 15.0), 3);
  var l = sfR(rf(0.100, 1.20), 3);
  var F = B * I * l;
  var ans = sfR(F, 3);
  return numq("A straight wire of length " + gF(l) + " m carries a current of " + gF(I) + " A through a uniform magnetic field of " + gF(B) + " T. The wire is held perpendicular to the field. Calculate the force on the wire. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "A current is moving charge, so the field exerts F = BIl when the wire is perpendicular to the field. F = " + gF(B) + " T \u00D7 " + gF(I) + " A \u00D7 " + gF(l) + " m = " + F3(ans) + " N. The direction follows the right-hand rule for the current direction, perpendicular to both the wire and the field. The force on the wire is " + F3(ans) + " N.",
    {B: B, I: I, l: l});
});

E("u3-78-force-charge", 3, ["PH12.7.8"], 2, "gen", function(){
  var qE = pick([1, 2, 3]);
  var q = qE * PHYS_E;
  var v = sfR(rf(1.0, 9.0) * 1e5, 3);
  var B = sfR(rf(0.100, 1.50), 3);
  var F = q * v * B;
  var ans = sfR(F, 3);
  return numq("An ion carrying a charge of " + qE + " \u00D7 1.60 \u00D7 10\u207B\u00B9\u2079 C moves at " + gF(v) + " m/s perpendicular to a uniform magnetic field of " + gF(B) + " T. Calculate the magnitude of the force on the ion. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-15),
    "Use F = qvB for motion perpendicular to the field. The charge is q = " + qE + " \u00D7 1.60 \u00D7 10\u207B\u00B9\u2079 C = " + F3(q) + " C. Multiply q by v = " + gF(v) + " m/s and by B = " + gF(B) + " T, combining powers of ten in words: F = " + F3(ans) + " N. Because the force is always perpendicular to the velocity, it changes the ion's direction, not its speed. The force magnitude is " + F3(ans) + " N.",
    {qE: qE, v: v, B: B});
});

E("u3-78-force-angle", 3, ["PH12.7.8"], 2, "gen", function(){
  var v = sfR(rf(1.0, 8.0) * 1e6, 3);
  var B = sfR(rf(0.200, 2.00), 3);
  var th = pick([30, 45, 60]);
  var F = PHYS_E * v * B * Math.sin(th * Math.PI / 180);
  var Fperp = PHYS_E * v * B;
  var ans = sfR(F, 3);
  return numq("An electron (charge 1.60 \u00D7 10\u207B\u00B9\u2079 C) moves at " + gF(v) + " m/s through a uniform magnetic field of " + gF(B) + " T. Its velocity makes an angle of " + th + "\u00B0 with the field. Calculate the magnitude of the force on the electron. Give your answer in N.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-15),
    "Only the component of velocity perpendicular to the field produces a force: F = qvB sin\u03B8. Step 1: the full perpendicular value would be qvB = " + iF(Fperp) + " N. Step 2: multiply by sin(" + th + "\u00B0) = " + fmt(Math.sin(th * Math.PI / 180), 3) + ": F = " + iF(Fperp) + " N \u00D7 " + fmt(Math.sin(th * Math.PI / 180), 3) + " = " + F3(ans) + " N. The component of motion along the field is unaffected, so the electron spirals. The force magnitude is " + F3(ans) + " N.",
    {v: v, B: B, th: th});
});

E("u3-78-force-direction", 3, ["PH12.7.8"], 2, "var", varset([
  function(){
    var qq3204 = mcq("A positively charged ion moves east through a magnetic field that points north. The force on the ion is directed",
      "Up, out of the horizontal plane", ["Down, into the horizontal plane", "East, along its motion", "North, along the field"],
      "Use the right hand for a positive charge: fingers along the velocity (east), curl them toward the field (north), and the thumb gives the force: up. The magnetic force is always perpendicular to both the velocity and the field, so it cannot point along either. The force is directed up.", {}); qq3204.figure = p32figForceDir(0); return qq3204;
  },
  function(){
    var qq3204 = mcq("An electron moves east through a magnetic field that points north. The force on the electron is directed",
      "Down, into the horizontal plane", ["Up, out of the horizontal plane", "East, along its motion", "West, opposite its motion"],
      "For a positive charge the same setup gives an upward force. An electron carries the opposite sign of charge, so its force is exactly reversed: down. Sign of charge flips the force direction, a point that matters in every deflection question. The force on the electron is directed down.", {}); qq3204.figure = p32figForceDir(1); return qq3204;
  },
  function(){
    var qq3204 = mcq("A proton moves north across a table while a magnetic field points vertically down through the table. The force on the proton is directed",
      "West", ["East", "North", "Up"],
      "Right hand: fingers north (velocity), curl down (field, the way the fingers bend through the table), thumb points west. Equivalently, velocity cross field for a positive charge gives west. The force on the proton is directed west, perpendicular to both its motion and the field.", {}); qq3204.figure = p32figForceDir(2); return qq3204;
  },
  function(){
    var qq3204 = mcq("A wire carries current toward the north through a magnetic field that points east. The force on the wire is directed",
      "Down, perpendicular to both the wire and the field", ["Up, perpendicular to both the wire and the field", "East, pushing the wire along the field", "North, pushing the wire along the current"],
      "A current is moving positive charge, so use the same right-hand rule: fingers north (current), curl toward east (field), thumb points down. The force is perpendicular to both the current and the field, never along either one. The force on the wire is directed down.", {}); qq3204.figure = p32figForceDir(3); return qq3204;
  }
]));

E("u3-78-circular-radius", 3, ["PH12.7.8"], 2, "gen", function(){
  var v = sfR(rf(1.0, 9.0) * 1e6, 3);
  var B = sfR(rf(0.100, 1.00), 3);
  var r = PHYS_MP * v / (PHYS_E * B);
  var ans = sfR(r, 3);
  var qq3204 = numq("A proton (mass 1.67 \u00D7 10\u207B\u00B2\u2077 kg, charge 1.60 \u00D7 10\u207B\u00B9\u2079 C) moves at " + gF(v) + " m/s perpendicular to a uniform magnetic field of " + gF(B) + " T, and follows a circular path. Calculate the radius of the path. Give your answer in m.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "The magnetic force supplies the centripetal force: qvB = mv\u00B2/r, which gives r = mv/(qB). Substitute m = 1.67 \u00D7 10\u207B\u00B2\u2077 kg, v = " + gF(v) + " m/s, q = 1.60 \u00D7 10\u207B\u00B9\u2079 C and B = " + gF(B) + " T, combining the powers of ten in words. The radius is r = " + F3(ans) + " m. A faster proton or a weaker field makes a wider circle. The radius is " + F3(ans) + " m.",
    {v: v, B: B}); qq3204.figure = p32figChargeCircle(gF(v)+" m/s",gF(B)+" T","?","proton"); return qq3204;
});

E("u3-78-circular-speed", 3, ["PH12.7.8"], 3, "gen", function(){
  var B = sfR(rf(0.200, 1.50), 3);
  var r = sfR(rf(0.050, 0.600), 3);
  var v = PHYS_E * B * r / PHYS_MP;
  var ans = sfR(v, 3);
  var qq3204 = numq("A proton (mass 1.67 \u00D7 10\u207B\u00B2\u2077 kg, charge 1.60 \u00D7 10\u207B\u00B9\u2079 C) moves in a circle of radius " + gF(r) + " m in a uniform magnetic field of " + gF(B) + " T, entering the field perpendicular to it. Calculate the proton's speed. Give your answer in m/s.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Set the magnetic force equal to the centripetal force: qvB = mv\u00B2/r. Step 1: cancel one v and rearrange for the speed: v = qBr/m. Step 2: substitute q = 1.60 \u00D7 10\u207B\u00B9\u2079 C, B = " + gF(B) + " T, r = " + gF(r) + " m and m = 1.67 \u00D7 10\u207B\u00B2\u2077 kg, combining powers of ten in words. Step 3: v = " + F3(ans) + " m/s. The mass cancels nothing here: a heavier particle at the same radius and field would be moving faster. The proton's speed is " + F3(ans) + " m/s.",
    {B: B, r: r}); qq3204.figure = p32figChargeCircle("?",gF(B)+" T",gF(r)+" m","proton"); return qq3204;
});

E("u3-78-field-from-orbit", 3, ["PH12.7.8"], 2, "gen", function(){
  var v = sfR(rf(1.0, 6.0) * 1e5, 3);
  var r = sfR(rf(0.100, 0.900), 3);
  var mA = 6.64e-27, qA = 3.20e-19;
  var B = mA * v / (qA * r);
  var ans = sfR(B, 3);
  var qq3204 = numq("An alpha particle (mass 6.64 \u00D7 10\u207B\u00B2\u2077 kg, charge 3.20 \u00D7 10\u207B\u00B9\u2079 C) moves at " + gF(v) + " m/s perpendicular to a magnetic field and follows a circle of radius " + gF(r) + " m. Calculate the strength of the field. Give your answer in T.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "From qvB = mv\u00B2/r, solve for the field: B = mv/(qr). Step 1: multiply mass by speed: mv is computed from m = 6.64 \u00D7 10\u207B\u00B2\u2077 kg and v = " + gF(v) + " m/s. Step 2: multiply charge by radius: qr from q = 3.20 \u00D7 10\u207B\u00B9\u2079 C and r = " + gF(r) + " m. Step 3: divide, combining powers of ten in words: B = " + F3(ans) + " T. The field strength is " + F3(ans) + " T.",
    {v: v, r: r}); qq3204.figure = p32figChargeCircle(gF(v)+" m/s","?",gF(r)+" m","alpha particle"); return qq3204;
});

E("u3-78-particle-id", 3, ["PH12.7.8"], 3, "gen", function(){
  var rp = sfR(rf(0.100, 0.800), 3);
  var key = F3(2 * rp) + " m";
  return mcq("A proton enters a uniform magnetic field at a certain speed, perpendicular to the field, and follows a circular path of radius " + gF(rp) + " m. An alpha particle (4 times the proton's mass, 2 times its charge) enters the same field at the same speed. What is the radius of the alpha particle's path?",
    key, [F3(rp) + " m", F3(4 * rp) + " m", F3(rp / 2) + " m"],
    "The radius is r = mv/(qB). At the same speed in the same field, the radius scales with the ratio m/q. The alpha particle has m/q = 4/2 = 2 times the proton's ratio, so its radius doubles: 2 \u00D7 " + gF(rp) + " m = " + F3(2 * rp) + " m. Using the mass ratio alone (4) forgets that the alpha's larger charge also feels a larger force. The alpha particle's radius is " + key + ".",
    {rp: rp});
});

E("u3-78-parallel-wires", 3, ["PH12.7.8"], 2, "gen", function(){
  var same = Math.random() < 0.5;
  var i1 = ri(5, 40), i2 = ri(5, 40);
  var key = same ? "The wires attract each other" : "The wires repel each other";
  var other = same ? "The wires repel each other" : "The wires attract each other";
  var qq3204 = mcq("Two long parallel wires carry currents of " + i1 + " A and " + i2 + " A in " + (same ? "the same direction" : "opposite directions") + ". Each wire sits in the magnetic field of the other. What do the wires do?",
    key, [other, "Nothing, because parallel wires produce no field", "The wires twist around each other like a solenoid"],
    "Each wire's field circles it, and at the neighbouring wire that field points across the current there, so each wire feels a force. Working through the right-hand rule: currents in the same direction pull the wires together, and currents in opposite directions push them apart. Here the currents are " + (same ? "in the same direction, so the wires attract." : "in opposite directions, so the wires repel.") + " " + key + ".",
    {same: same, i1: i1, i2: i2}); qq3204.figure = p32figParallelWires(i1,i2,same); return qq3204;
});

/* ---------- PH12.7.9 Electromagnetic induction ---------- */

E("u3-79-lenz-direction", 3, ["PH12.7.9"], 2, "var", varset([
  function(){
    return mcq("The north pole of a bar magnet is pushed toward a flat loop of wire. Looking at the loop from the magnet's side, the induced current flows",
      "Counterclockwise, so the loop's near face acts as a north pole and opposes the approaching magnet",
      ["Clockwise, so the loop's near face acts as a north pole and welcomes the magnet in",
       "Counterclockwise, so the loop's near face acts as a south pole and pulls the magnet in",
       "Clockwise, and then stops because a loop cannot sustain a current"],
      "Lenz's law: the induced current opposes the change causing it. The approaching north pole increases the field through the loop toward the magnet, so the loop makes its own field pointing back, presenting a north face to repel the magnet. A field pointing out of a face toward the viewer corresponds to a counterclockwise current as seen by that viewer. The current flows counterclockwise.", {});
  },
  function(){
    return mcq("The north pole of a bar magnet, which was inside a coil, is pulled away from the coil. The end of the coil nearest the magnet behaves as",
      "A south pole, attracting the retreating magnet and opposing its removal",
      ["A north pole, repelling the retreating magnet away faster",
       "Neither pole, because induction needs a battery in the coil",
       "A north pole that flips to south halfway through the motion"],
      "Induction opposes the change. As the north pole leaves, the flux through the coil drops, so the induced current makes the near end a south pole, holding the magnet back. No battery is involved; the changing field through the coil drives the current. The near end behaves as a south pole while the magnet retreats.", {});
  },
  function(){
    return mcq("A magnetic field pointing into a page passes through a loop of wire lying on the page, and the field is steadily strengthening. The induced current in the loop flows",
      "Counterclockwise, creating a field out of the page to oppose the increase",
      ["Clockwise, creating a field into the page to help the increase",
       "Counterclockwise, creating a field into the page",
       "In whichever direction the loop was last carrying current"],
      "The change to oppose is the growth of the into-the-page flux. The loop counters with its own field pointing out of the page, which by the right-hand rule means a counterclockwise current as seen by someone looking at the page. Induced currents always fight the change, never help it. The induced current flows counterclockwise.", {});
  },
  function(){
    return mcq("A bar magnet is held perfectly still inside a coil connected to a sensitive meter. The meter reads zero, even though the coil sits in a strong magnetic field. This is because induction requires",
      "A changing magnetic flux through the coil, and a steady field gives no change to oppose",
      ["The magnet to be an electromagnet rather than a permanent magnet",
       "The coil to be rotating rather than the magnet moving",
       "The field inside the coil to be zero before induction can start"],
      "Faraday's law responds to change in flux, not to flux itself. A stationary magnet produces a strong but constant flux, so there is no induced emf and the meter reads zero. Move the magnet or the coil and the meter deflects at once. Induction requires changing flux.", {});
  }
]));

E("u3-79-coil-polarity", 3, ["PH12.7.9"], 2, "var", varset([
  function(){
    return mcq("The south pole of a bar magnet is pushed toward end A of a coil. To oppose the magnet's approach, end A becomes",
      "A south pole, repelling the incoming south pole",
      ["A north pole, attracting the incoming south pole",
       "Neutral, because only north poles induce effects",
       "A north pole that attracts, then repels once the magnet stops"],
      "Lenz's law is a repulsion of change: an approaching pole meets the same kind of pole. An incoming south pole induces a south pole at end A so the coil pushes back. The coil does not attract the magnet in; induction never assists the change that causes it. End A becomes a south pole.", {});
  },
  function(){
    return mcq("A magnet is pushed into a coil and held still inside it. While it is moving in, a current flows in the coil. Once it stops moving, the current",
      "Falls to zero, because the flux through the coil is no longer changing",
      ["Continues at the same strength, powered by the magnet's field",
       "Reverses and flows back out of the coil",
       "Doubles, because the magnet is now fully inside"],
      "Induced emf depends on the rate of change of flux. Moving in, the flux grows and current flows. Held still, the flux is large but constant, the rate of change is zero, and so are the emf and current. Magnets do not power steady currents for free. The current falls to zero when the motion stops.", {});
  },
  function(){
    return mcq("The current through an electromagnet is reversed. The magnet's poles",
      "Swap: the end that was north becomes south, and the field everywhere reverses",
      ["Stay the same, because poles depend on the coil's shape, not the current",
       "Both become north poles until the current is reversed again",
       "Vanish, because reversing current destroys the domains in the core"],
      "An electromagnet's polarity follows its current by the right-hand rule. Reverse the current and every part of the field reverses, so the poles swap ends. The core's domains simply realign the other way; they are not destroyed. The poles swap when the current reverses.", {});
  },
  function(){
    return mcq("A coil is connected to a meter. A bar magnet is dropped through the coil from above, north pole first. The meter needle",
      "Kicks one way as the magnet approaches and enters, then kicks the opposite way as the magnet leaves",
      ["Kicks once and stays deflected while the magnet falls through",
       "Does not move, because the magnet's speed is constant in free fall",
       "Kicks only when the magnet is exactly at the coil's centre"],
      "Entering, the flux through the coil grows in one sense, inducing current one way. Leaving, the flux shrinks, which is the opposite change, so the induced current reverses. The needle kicks one way, then the other. The magnet's changing speed does not matter; the reversal of the flux change at entry and exit does.", {});
  }
]));

E("u3-79-eddy-braking", 3, ["PH12.7.9"], 2, "var", varset([
  function(){
    return mcq("A strong magnet dropped down a long vertical copper pipe falls noticeably slowly, even though copper is not attracted to magnets. The slow fall is because",
      "The changing flux induces eddy currents in the pipe, and their fields oppose the magnet's fall, as Lenz's law requires",
      ["Copper becomes magnetic when a magnet is inside it and grips the magnet",
       "Air trapped in the pipe cushions the magnet like a piston",
       "The magnet's field lines get tangled in the copper and anchor it"],
      "As the magnet falls, the flux through each ring of the pipe changes, driving circular eddy currents. By Lenz's law their fields oppose the change, pushing up on the magnet against gravity. The magnet reaches a slow terminal speed where the upward push balances its weight. Copper stays non-magnetic; the effect is induction, not attraction.", {});
  },
  function(){
    return mcq("Some exercise bikes and train brakes use a metal disc spinning between the poles of a magnet. The braking works because",
      "Eddy currents induced in the disc create fields that oppose the disc's motion, converting kinetic energy to heat in the disc",
      ["The magnet attracts the metal disc and friction between them slows it",
       "The disc becomes a permanent magnet and locks to the brake magnet",
       "The magnet's field increases the disc's inertia"],
      "Parts of the disc continually move into and out of the field, so flux through them changes and eddy currents circulate. Their fields oppose the motion that creates them, dragging the disc. The kinetic energy ends up as heat in the disc, which is why such brakes can glow on long descents. The braking comes from eddy currents opposing the motion.", {});
  },
  function(){
    return mcq("Transformer cores are built from thin laminated sheets rather than one solid block of iron. The laminations",
      "Break up eddy currents, reducing wasted energy and heating in the core",
      ["Make the core lighter so it is easier to mount",
       "Increase the eddy currents so the transformer runs warmer",
       "Stop the core from becoming magnetized at all"],
      "The alternating flux would drive large eddy currents in a solid core, wasting energy as heat. Thin insulated laminations confine eddy currents to tiny loops, cutting the loss. The core still magnetizes fully along the laminations. Laminations reduce eddy current losses.", {});
  },
  function(){
    return mcq("A flat aluminium plate is swung like a pendulum between the poles of a strong magnet. It stops swinging much faster than it would in air alone. Aluminium is not magnetic, so the damping is caused by",
      "Eddy currents induced in the plate as it cuts through the field, whose effects oppose the swinging",
      ["The magnet attracting the plate a little on each swing until it rests",
       "The plate becoming permanently magnetized and sticking to a pole",
       "Static charge building up on the plate and discharging"],
      "Moving through the field changes the flux through parts of the plate, inducing eddy currents. By Lenz's law the resulting forces oppose the motion that made them, on both directions of swing, so the oscillation dies quickly and the plate warms slightly. No magnetism of aluminium is required. Eddy currents damp the swinging.", {});
  }
]));

E("u3-79-motional-emf", 3, ["PH12.7.9"], 2, "gen", function(){
  var B = sfR(rf(0.100, 0.900), 3);
  var l = sfR(rf(0.100, 0.800), 3);
  var v = sfR(rf(0.500, 6.00), 3);
  var emf = B * l * v;
  var ans = sfR(emf, 3);
  var qq3204 = numq("A metal rod of length " + gF(l) + " m slides at " + gF(v) + " m/s along rails through a uniform magnetic field of " + gF(B) + " T directed perpendicular to the plane of the rails. Calculate the emf induced in the rod. Give your answer in V.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-12),
    "A moving conductor in a field generates a motional emf: emf = Blv. So emf = " + gF(B) + " T \u00D7 " + gF(l) + " m \u00D7 " + gF(v) + " m/s = " + F3(ans) + " V. The charges in the rod are driven to its ends by the magnetic force until the resulting voltage balances it. The induced emf is " + F3(ans) + " V.",
    {B: B, l: l, v: v}); qq3204.figure = p32figMotional(B,l,v); return qq3204;
});

E("u3-79-transformer", 3, ["PH12.7.9"], 2, "gen", function(){
  var stepDown = Math.random() < 0.5;
  var Vp = pick([120, 240]);
  var ratio = pick([2, 4, 5, 10, 20]);
  var Np = ratio * ri(40, 200);
  var Ns = Np / ratio;
  var Vs = Vp / ratio;
  if (!stepDown) { var t = Vs; Vs = Vp; Vp = t; var t2 = Ns; Ns = Np; Np = t2; }
  var ans = sfR(Vs, 3);
  var qq3204 = numq("A transformer has " + Np + " turns on its primary coil and " + Ns + " turns on its secondary coil. The primary is connected to a " + Vp + " V alternating supply. Calculate the voltage across the secondary coil. Give your answer in V.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "The transformer ratio links voltages to turns: Vs/Vp = Ns/Np. Step 1: the turns ratio is Ns/Np = " + Ns + " \u00F7 " + Np + " = " + fmt(Ns / Np, 3) + ". Step 2: Vs = Vp \u00D7 (Ns/Np) = " + Vp + " V \u00D7 " + fmt(Ns / Np, 3) + " = " + F3(ans) + " V. Fewer secondary turns than primary turns means a step-down transformer; more means step-up. The secondary voltage is " + F3(ans) + " V.",
    {Np: Np, Ns: Ns, Vp: Vp}); qq3204.figure = p32figTransformer(Np,Ns,Vp); return qq3204;
});

E("u3-79-transmission", 3, ["PH12.7.9"], 3, "gen", function(){
  var Pmw = ri(15, 120);
  var VkV = ri(8, 30);
  var Ilo = Pmw * 1e6 / (VkV * 1e3);
  var key = "The current falls from " + F3(Ilo) + " A to " + F3(Ilo / 10) + " A, so the heating losses in the line fall to 1/100 of their former value";
  return mcq("A power station delivers " + Pmw + " MW to a town. The transmission voltage is stepped up from " + VkV + " kV to " + (VkV * 10) + " kV before the long line to the town, with the same power delivered. What happens to the line current and the heating losses in the line?",
    key, ["The current falls from " + F3(Ilo) + " A to " + F3(Ilo / 10) + " A, so the heating losses fall to 1/10 of their former value",
      "The current stays " + F3(Ilo) + " A, because the same power is delivered either way",
      "The current rises to " + F3(Ilo * 10) + " A, so the losses rise and stepping up is pointless"],
    "Power is P = VI, so at fixed power the current is inversely proportional to the voltage. At " + VkV + " kV the current is " + Pmw + " MW \u00F7 " + VkV + " kV = " + F3(Ilo) + " A; at ten times the voltage it is one tenth as much, " + F3(Ilo / 10) + " A. Heating loss is I\u00B2R, so it scales with the square of the current: one tenth the current means 1/100 the loss. That squared saving is the whole reason power grids step voltage up for long distances. " + key + ".",
    {Pmw: Pmw, VkV: VkV});
});

/* ---------- PH12.7.10 Motor versus generator ---------- */

E("u3-710-device-job", 3, ["PH12.7.10"], 2, "var", varset([
  function(){
    return mcq("A wind turbine on a coastal headland spins in the wind and supplies electricity to nearby homes. The machine in the turbine nacelle that produces the electricity is",
      "A generator, because it converts the kinetic energy of the spinning shaft into electrical energy",
      ["A motor, because it contains a spinning coil and magnets",
       "A transformer, because it changes mechanical energy into electricity",
       "A solenoid, because it is a coil of wire with a core"],
      "The job decides the name. This machine takes mechanical rotation in and puts electrical energy out: that is a generator. Motors and generators share parts (coils, magnets, a spinning shaft); the direction of energy conversion tells them apart. The turbine uses a generator.", {});
  },
  function(){
    return mcq("An electric winch on a fishing boat is plugged into the boat's battery and hauls a heavy trap up from the water. The winch's working machine is",
      "A motor, because it converts electrical energy from the battery into the mechanical work of lifting",
      ["A generator, because it has a rotating shaft and a coil",
       "A transformer, because it changes the battery's voltage",
       "A galvanometer, because it contains a coil in a magnetic field"],
      "Energy flows from electrical to mechanical here: the battery supplies current and the machine produces motion and lifting work. A machine that converts electrical energy into mechanical energy is a motor, whatever its shape. The winch uses a motor.", {});
  },
  function(){
    return mcq("A hand-cranked emergency radio works when the user turns a small handle: lights and sound come on with no battery. The handle drives",
      "A generator, because the turning coil in a magnetic field induces the current the radio runs on",
      ["A motor, because the coil rotates when the handle is turned",
       "A transformer, because the handle steps the voltage up",
       "A battery charger cell, because chemicals in the handle store the energy"],
      "The user's muscles supply mechanical energy and the device outputs electrical energy to run the radio. Mechanical in, electrical out is a generator. Rotation alone does not make it a motor; in a motor the rotation is the output, powered by a current. The crank drives a generator.", {});
  },
  function(){
    return mcq("A workshop fan starts spinning when it is switched on at the wall outlet. Inside the fan, the part that turns electrical supply into the spinning of the blades is",
      "A motor, because current in its coil experiences forces in a magnetic field and produces rotation",
      ["A generator, because anything with a spinning coil generates",
       "A transformer, because it changes the speed of the electricity",
       "An electromagnet only, because no motion is involved in its job"],
      "The fan receives electrical energy and outputs mechanical rotation: a motor. Its coil carries current in a magnetic field, and the forces on the coil (F = BIl on each side) turn the shaft. A generator is the same hardware run in reverse, but here the energy clearly flows electrical to mechanical. The fan uses a motor.", {});
  }
]));

E("u3-710-energy-conversion", 3, ["PH12.7.10"], 2, "var", varset([
  function(){
    return mcq("Which pairing of device and energy conversion is correct?",
      "Motor: electrical energy to kinetic energy. Generator: kinetic energy to electrical energy",
      ["Motor: kinetic energy to electrical energy. Generator: electrical energy to kinetic energy",
       "Motor: electrical energy to heat only. Generator: heat to electrical energy",
       "Motor and generator both convert electrical energy to kinetic energy"],
      "The two machines are the same hardware run in opposite directions. Feed a motor current and it rotates: electrical to kinetic. Spin a generator's shaft and it produces current: kinetic to electrical. Getting the direction right is the whole distinction. A motor converts electrical energy to kinetic energy, and a generator does the reverse.", {});
  },
  function(){
    return mcq("A hybrid car braking for a stop light uses its wheel machine as a generator, but pulling away from the light it uses the same machine as a motor. What changes between the two uses?",
      "The direction of energy flow: as a generator it turns the car's motion into electricity for the battery; as a motor it turns battery electricity into motion",
      ["The machine is physically swapped for a different one at each stop",
       "Nothing changes: motor and generator are just two names for the same operation",
       "As a generator it runs on gasoline, and as a motor it runs on electricity"],
      "Motor and generator are two modes of one electromagnetic machine. Braking, the wheels drive the shaft and the machine charges the battery (kinetic to electrical). Accelerating, the battery drives the machine and it pushes the wheels (electrical to kinetic). Only the energy flow reverses. The direction of energy flow changes.", {});
  },
  function(){
    return mcq("Which of these devices does NOT work by converting between electrical and mechanical energy?",
      "A transformer, which changes alternating voltage using two coils on a shared core, with no moving parts",
      ["An electric drill, which turns electrical energy into rotation",
       "A hydroelectric turbine unit, which turns falling water's energy into electricity",
       "A ceiling fan, which turns electrical energy into moving air"],
      "Drills and fans are motors; a hydroelectric unit is a generator. A transformer does something different: it trades voltage for current between two stationary coils by induction, electrical energy in and electrical energy out, nothing mechanical. The transformer does not convert between electrical and mechanical energy.", {});
  },
  function(){
    return mcq("In a simple DC motor, the coil keeps rotating in the same direction instead of rocking back and forth. This is because the split-ring commutator",
      "Reverses the current in the coil every half turn, so the forces on the coil keep pushing it the same way around",
      ["Disconnects the coil at the vertical position so friction stops it there",
       "Doubles the current every half turn to overpower the reverse force",
       "Turns the permanent magnet around with the coil"],
      "Without a commutator, the force on the coil would reverse each half turn and the coil would just oscillate. The split ring swaps the connections every half turn, reversing the coil's current at exactly the right moment so the torque keeps its direction. The commutator reverses the current every half turn.", {});
  }
]));

E("u3-710-armature", 3, ["PH12.7.10"], 2, "var", varset([
  function(){
    return mcq("In a simple DC motor the coil reaches the vertical position, where the forces on its sides momentarily vanish. The coil does not stall there because",
      "Its momentum carries it past the vertical, and the commutator then reverses the current so the forces push it onward the same way",
      ["The brushes push the coil around mechanically at that point",
       "Gravity pulls the heavier side of the coil down through the vertical",
       "The magnetic field switches direction at the vertical position"],
      "At the vertical the torque passes through zero, but a spinning coil has momentum, and it coasts through. Just past vertical the split-ring commutator has swapped the current, so the returning torque acts in the original direction of rotation. Momentum plus the commutator keeps the motor turning. The coil's momentum carries it past the vertical.", {});
  },
  function(){
    return mcq("A student builds a simple motor with a plain split ring missing: the coil is connected to the battery by fixed wires instead. When switched on and given a flick, the coil most likely",
      "Rocks back and forth and settles, because the force on the coil reverses every half turn with nothing to reverse the current",
      ["Spins steadily, because the commutator is only a safety device",
       "Spins faster and faster without limit",
       "Never moves at all, because motors cannot start from a flick"],
      "The commutator is essential, not decorative. With a fixed connection the current keeps its direction in space while the coil turns, so the torque flips sign each half turn and the coil oscillates to a stop. Reversing the current each half turn, the commutator's job, is what makes rotation continuous. The coil rocks and settles without a commutator.", {});
  },
  function(){
    return mcq("The brushes in a DC motor are the stationary contacts that press on the spinning commutator. Their job is to",
      "Carry current between the external circuit and the rotating coil while allowing the connection to swap each half turn",
      ["Brush dust off the commutator so it stays clean",
       "Act as the motor's bearings and hold the axle in place",
       "Generate the magnetic field the coil turns in"],
      "Brushes solve a connection problem: the coil spins but the battery does not. Spring-loaded carbon brushes slide on the split ring, feeding current into whichever segment is in contact, which is also how the swap happens each half turn. The field comes from the magnets or field coils, not the brushes. Brushes carry current to the rotating coil.", {});
  },
  function(){
    return mcq("A simple generator is built from the same parts as a DC motor, but its shaft is turned by a falling mass instead of the coil being driven by a battery. The output at the brushes is",
      "A direct current that pulses but keeps the same direction, because the split ring swaps the coil's ends every half turn",
      ["A smooth alternating current, because all rotating coils produce AC",
       "No output at all, because a motor cannot work backwards",
       "A steady battery-like voltage with no pulses"],
      "Motors and generators are reversible: turn the shaft and the coil cuts flux, inducing an emf. The split-ring commutator swaps connections each half turn, which rectifies the induced emf to one direction, though it still pulses as the coil rotates. Slip rings, not a split ring, would give AC. The output is pulsed direct current.", {});
  }
]));

E("u3-710-commutator", 3, ["PH12.7.10"], 2, "var", varset([
  function(){
    return mcq("An AC generator uses slip rings instead of a split-ring commutator. The reason is that slip rings",
      "Keep each end of the coil connected to the same brush all the time, so the output follows the coil's naturally alternating emf",
      ["Reverse the connections every half turn to force direct current",
       "Spin faster than a commutator and so produce more power",
       "Convert the alternating emf into direct current inside the rings"],
      "A rotating coil's emf alternates on its own. Slip rings preserve that: each coil end always meets the same brush, so the terminals see the alternating emf unchanged. A split ring would swap connections and rectify the output to DC. Slip rings keep the connection fixed, giving AC output.", {});
  },
  function(){
    return mcq("The split ring in a DC motor is split, with a gap between its two halves, so that",
      "At the gap the coil is momentarily disconnected and the connections swap sides, reversing the coil's current each half turn",
      ["The coil can spin without touching the brushes at all",
       "Extra current can leak out to cool the motor",
       "The two halves can carry different voltages to the battery"],
      "Each half of the ring is attached to one end of the coil. As the ring turns under the brushes, the halves trade brushes once per half turn, and the current through the coil reverses. The small gap is the instant of swap. The split exists to reverse the coil's current every half turn.", {});
  },
  function(){
    return mcq("A student wants a small windmill to charge a battery, which needs direct current. She has a coil-and-magnet unit with slip rings giving alternating output. What must change?",
      "Fit a split-ring commutator (or a rectifier), so the output is delivered in one direction for the battery",
      ["Spin the coil faster so the AC becomes DC at high speed",
       "Use a stronger magnet, because strong fields produce DC",
       "Connect the battery across the slip rings and let it average the AC itself"],
      "Batteries charge from current in one direction. The alternating output must be rectified: a split-ring commutator swaps the coil ends every half turn (or electronic rectifiers do the same job). Speed and magnet strength change the size and frequency of the AC, not its alternating character. The output must be rectified with a commutator or rectifier.", {});
  },
  function(){
    return mcq("In a DC generator, the split-ring commutator's role is the mirror of its role in a DC motor: it",
      "Swaps the coil's connections every half turn so the induced emf, which alternates inside the coil, appears at the terminals in one direction only",
      ["Creates the magnetic field that the coil rotates in",
       "Increases the induced emf by stepping it up like a transformer",
       "Prevents any current from being induced in the coil"],
      "Inside the coil the induced emf reverses every half turn as the coil's sides swap roles. The commutator swaps the external connections in step, so the terminals always see the same polarity: pulsed DC. In the motor the same swap keeps torque one-directional. The commutator makes the output one-directional.", {});
  }
]));

E("u3-710-lift-motor", 3, ["PH12.7.10"], 3, "gen", function(){
  var V = pick([24, 36, 48]);
  var m = sfR(rf(20, 120), 3);
  var v = sfR(rf(0.200, 0.900), 3);
  var Pmech = m * PHYS_G * v;
  var I = Pmech / V;
  var ans = sfR(I, 3);
  return numq("An electric hoist motor connected to a " + V + " V supply lifts a crate of mass " + gF(m) + " kg at a steady " + gF(v) + " m/s. Treat the motor as ideal, so all the electrical power becomes lifting power. Calculate the current the motor draws. Give your answer in A.",
    ans, Math.max(0.02 * Math.abs(ans), 1e-9),
    "Equate the mechanical power needed to the electrical power supplied. Step 1: the lifting power is the rate of gain of potential energy: P = mgv = " + gF(m) + " kg \u00D7 9.8 m/s\u00B2 \u00D7 " + gF(v) + " m/s = " + iF(Pmech) + " W. Step 2: electrical power is P = VI, so I = P/V = " + iF(Pmech) + " W \u00F7 " + V + " V = " + F3(ans) + " A. A real motor would draw more, because some power is lost as heat. The current drawn is " + F3(ans) + " A.",
    {V: V, m: m, v: v});
});
