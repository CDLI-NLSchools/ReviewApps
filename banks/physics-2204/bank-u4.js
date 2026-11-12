// Diagram figures (Phase C, Nov 2026): wave anatomy, standing wave and air column patterns, double slit geometry and refraction diagrams added where the source types carried diagrams; see bank-helpers.js p22 helpers.
// Physics 2204 Unit 4 Waves question bank
// CRMARKS: u4-84-resonance-cr=5
// CRMARKS: u4-89-snell-cr=4
// CRMARKS: u4-87-doppler-cr=4
// CRMARKS: u4-86-doubleslit-cr=3
// CRMARKS: u4-82-wave-eq-cr=3
// CRMARKS: u4-84-standing-cr=2

/* ---------- 8.1 Wave characteristics ---------- */

E("u4-81-type-motion",4,["PH11.8.1"],1,"var",varset([
  function(){
    return mcq("A wave travels along a rope. Each bit of rope moves up and down while the wave pattern moves along the rope. How does the motion of the rope particles compare with the direction the energy travels?",
      "The particles move perpendicular to the direction the energy travels, so this is a transverse wave",
      ["The particles move parallel to the direction the energy travels, so this is a transverse wave",
       "The particles travel along the rope with the wave, carrying the rope to the far end",
       "The particles do not move at all; only the shape is real"],
      "In a transverse wave the particles oscillate perpendicular to the direction of energy travel. The particles stay near their own positions; it is the energy that moves along the rope. This is a transverse wave.",{});
  },
  function(){
    return mcq("Sound travels through air to a listener. How do the air particles move compared with the direction the sound energy travels?",
      "The particles move back and forth parallel to the direction the energy travels, so sound is a longitudinal wave",
      ["The particles move perpendicular to the direction the energy travels, so sound is a transverse wave",
       "The particles stream steadily from the source to the listener",
       "The particles move in circles as the sound passes"],
      "Sound in air is longitudinal: the air particles vibrate back and forth along the same line the energy travels, making compressions and rarefactions. The particles themselves do not stream to the listener. Sound is a longitudinal wave.",{});
  },
  function(){
    return mcq("A slinky is stretched out and one end is pushed and pulled along its length, sending pulses of squeezed coils down the slinky. This wave is",
      "Longitudinal, because the coils move parallel to the direction the energy travels",
      ["Transverse, because the coils move parallel to the direction the energy travels",
       "Transverse, because the coils move perpendicular to the direction the energy travels",
       "Neither, because a slinky cannot carry a wave"],
      "The coils squeeze together and spread apart along the same line the pulse travels, which is particle motion parallel to energy travel. That is a longitudinal wave.",{});
  },
  function(){
    return mcq("Which pairing is correct?",
      "Water surface wave: mainly transverse; sound in air: longitudinal",
      ["Water surface wave: longitudinal; sound in air: transverse",
       "Water surface wave: longitudinal; sound in air: longitudinal",
       "Water surface wave: transverse; sound in air: transverse"],
      "A water surface wave moves the surface up and down across the direction of travel, so it is treated as transverse at this level. Sound in air squeezes and spreads the air along the direction of travel, so it is longitudinal.",{});
  },
  function(){
    return mcq("A student shakes the end of a skipping rope side to side and a wave runs to the other end. A knot tied in the rope is observed as the wave passes. The knot",
      "Moves side to side around its own position and stays at the same place along the rope",
      ["Rides the wave all the way to the far end of the rope",
       "Moves steadily toward the far end, slower than the wave",
       "Does not move, because waves carry no energy"],
      "Particles of the medium oscillate around their own positions; they do not travel with the wave. The wave carries energy along the rope, but the knot only moves side to side in place.",{});
  }
]));

E("u4-81-anatomy",4,["PH11.8.1"],1,"var",varset([
  function(){
    var q=mcq("On a diagram of a transverse wave, the wavelength is the distance between",
      "Two neighbouring crests, or two neighbouring troughs",
      ["A crest and the nearest trough",
       "The rest position and a crest",
       "The first crest and the last trough of the whole wave"],
      "Wavelength is the length of one complete cycle, measured between the same point on two neighbouring cycles, such as crest to crest or trough to trough.",{});
    q.figure=p22WaveTrain(3,1,"?",{});return q;
  },
  function(){
    var q=mcq("In a longitudinal wave travelling through a spring, a rarefaction is a region where",
      "The coils are spread farther apart than normal",
      ["The coils are squeezed closer together than normal",
       "The coils move fastest",
       "The wave changes direction"],
      "A rarefaction is the stretched out region of a longitudinal wave, where the particles are farther apart than normal. The squeezed region is a compression.",{});
    q.figure=p22Longit(false);return q;
  },
  function(){
    var q=mcq("The amplitude of a transverse wave on a rope is measured from",
      "The rest position to a crest (or to a trough)",
      ["One crest to the next crest",
       "A crest down to a trough",
       "One end of the rope to the other"],
      "Amplitude is the greatest displacement from the rest position, so it is measured from the rest line to a crest or a trough. Crest to crest measures the wavelength instead.",{});
    q.figure=p22WaveTrain(3,0,null,{rest:true});return q;
  },
  function(){
    var q=mcq("In a longitudinal sound wave, the distance from the middle of one compression to the middle of the next compression is",
      "One wavelength",
      ["One amplitude",
       "Half a wavelength",
       "One period"],
      "Wavelength is always one complete cycle of the wave. Compression to the next compression is one full cycle, so that distance is one wavelength. The period is a time, not a distance.",{});
    q.figure=p22Longit(true);return q;
  },
  function(){
    var q=mcq("A transverse wave is drawn with crests well above the rest line and troughs just barely below it. Which statement about this drawing is correct?",
      "It cannot be a single ordinary wave, because the crest height and trough depth from the rest line should match as the amplitude",
      ["Its wavelength is the height of a crest",
       "Its amplitude is measured from a crest to a trough",
       "It has two different amplitudes, one for crests and one for troughs"],
      "For one wave, the amplitude is the displacement from the rest position, the same at a crest as at a trough. A drawing with very tall crests and very shallow troughs does not show one ordinary wave.",{});
    q.figure=p22WaveTrain(3,0,null,{asym:true});return q;
  }
]));

E("u4-81-period-mc",4,["PH11.8.1"],1,"gen",function(){
  var ctx=pick(["A vibrating reed in the lab oscillates","A signal generator drives a vibrating string","A small buzzer vibrates steadily","A tuning fork prong vibrates"]);
  var f=sfR(rf(2.0,120),3);
  var T=1/f, ans=sfR(T,3);
  var sol="The period is the time for one complete cycle, and it is the reciprocal of the frequency: T = 1 ÷ f. Substituting, 1 ÷ "+iF(f)+" = "+iF(sfR(T,4))+" s, so the period is "+F3(ans)+" s.";
  return mcq(ctx+" with a frequency of "+gF(f)+" Hz. What is the period of the motion?",
    F3(ans)+" s",
    [F3(sfR(2*T,3))+" s", F3(sfR(T/2,3))+" s", F3(f)+" s"],
    sol,{f:f});
});

E("u4-81-period-cycles",4,["PH11.8.1"],2,"gen",function(){
  var ctx=pick(["A water wave tank in the lab","A rope shaken by a student in the gym","A signal generator driving a vibrating string","A ripple tank in the lab"]);
  var N=ri(24,180);
  var t=sfR(rf(4.0,30.0),3);
  var p4=sfR(t/N,4), ans=sfR(p4,3);
  var sol="The period is the total time divided by the number of complete cycles. "+iF(t)+" s ÷ "+N+" = "+iF(p4)+" s, so the period is "+F3(ans)+" s.";
  return numq(ctx+" produces "+N+" complete cycles in "+gF(t)+" s. Find the period of the wave. Give your answer in s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {N:N,t:t});
});

E("u4-81-wavelength-reading",4,["PH11.8.1"],2,"gen",function(){
  var k=ri(3,9);
  var D=sfR(rf(2.0,18.0),3);
  var l4=sfR(D/k,4), ans=sfR(l4,3);
  var sol="From the first crest to the crest "+k+" cycles later there are exactly "+k+" wavelengths in "+gF(D)+" m. "+iF(D)+" m ÷ "+k+" = "+iF(l4)+" m, so the wavelength is "+F3(ans)+" m.";
  var q=numq("On a rope wave, the distance from the first crest to the crest "+k+" cycles later is "+gF(D)+" m. Find the wavelength of the wave. Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {k:k,D:D});
    q.figure=p22WaveTrain(k,k,gF(D)+" m",{});return q;
});

/* ---------- 8.2 The wave equation ---------- */

E("u4-82-frequency-mc",4,["PH11.8.2"],1,"gen",function(){
  var v=sfR(rf(100,600),3);
  var lam=sfR(rf(0.200,3.00),3);
  var f=v/lam, ans=sfR(f,3);
  var sol="The wave equation is v = f λ, so f = v ÷ λ. Substituting, "+iF(v)+" m/s ÷ "+iF(lam)+" m = "+iF(sfR(f,4))+" Hz, so the frequency is "+F3(ans)+" Hz.";
  return mcq("A wave travels at "+gF(v)+" m/s and has a wavelength of "+gF(lam)+" m. What is its frequency?",
    F3(ans)+" Hz",
    [F3(sfR(2*f,3))+" Hz", F3(sfR(f/2,3))+" Hz", F3(sfR(lam/v,3))+" Hz"],
    sol,{v:v,lam:lam});
});

E("u4-82-speed",4,["PH11.8.2"],2,"gen",function(){
  var ctx=pick(["A motor driven vibrator sends waves along a long rope","Ripples spread across a ripple tank","A wave travels down a slinky laid along the floor","A wave runs along a vibrating string"]);
  var f=sfR(rf(2.0,80.0),3);
  var lam=sfR(rf(0.0500,2.50),3);
  var p4=sfR(f*lam,4), ans=sfR(p4,3);
  var sol="Use the wave equation v = f λ. "+iF(f)+" Hz × "+iF(lam)+" m = "+iF(p4)+" m/s, so the wave speed is "+F3(ans)+" m/s.";
  return numq(ctx+" with a frequency of "+gF(f)+" Hz and a wavelength of "+gF(lam)+" m. Find the speed of the wave. Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f:f,lam:lam});
});

E("u4-82-wavelength",4,["PH11.8.2"],2,"gen",function(){
  var ctx=pick(["A low tone from a large speaker travels through air","A wave travels along a guitar string","A wave travels through a coiled spring","A wave runs along a stretched cable"]);
  var v=sfR(rf(12.0,340),3);
  var f=sfR(rf(20.0,200),3);
  var l4=sfR(v/f,4), ans=sfR(l4,3);
  var sol="Rearrange the wave equation: λ = v ÷ f. "+iF(v)+" m/s ÷ "+iF(f)+" Hz = "+iF(l4)+" m, so the wavelength is "+F3(ans)+" m.";
  return numq(ctx+" at "+gF(v)+" m/s with a frequency of "+gF(f)+" Hz. Find the wavelength. Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {v:v,f:f});
});

E("u4-82-wave-eq-cr",4,["PH11.8.2"],2,"gen",function(){
  var ctx=pick(["A tuning fork makes a sound wave in air","A speaker cone vibrates and sends sound across a room","A buzzer in the lab produces a steady tone in air"]);
  var v=sfR(rf(300,360),3);
  var T=sfR(rf(0.00150,0.0120),3);
  var f4=sfR(1/T,4);
  var l4=sfR(v/f4,4), ans=sfR(l4,3);
  var sol="First change the period to a frequency: f = 1 ÷ T. 1 ÷ "+iF(T)+" s = "+iF(f4)+" Hz. Then use the wave equation solved for wavelength: λ = v ÷ f. "+iF(v)+" m/s ÷ "+iF(f4)+" Hz = "+iF(l4)+" m. The wavelength is "+F3(ans)+" m.";
  return numq(ctx+" where the wave speed is "+gF(v)+" m/s. The period of the vibration is "+gF(T)+" s. Find the wavelength of the wave. Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {v:v,T:T});
});

E("u4-82-combined-mc",4,["PH11.8.2"],3,"gen",function(){
  var D=sfR(rf(30.0,300),3);
  var t=sfR(rf(2.0,20.0),3);
  var f=sfR(rf(2.0,60.0),3);
  var v=D/t, lam=v/f, ans=sfR(lam,3);
  var sol="The speed is not given, so find it first from the travel data: v = "+iF(D)+" m ÷ "+iF(t)+" s = "+iF(sfR(v,4))+" m/s. Then the wave equation gives λ = v ÷ f: "+iF(sfR(v,4))+" m/s ÷ "+iF(f)+" Hz = "+iF(sfR(lam,4))+" m. The wavelength is "+F3(ans)+" m.";
  return mcq("A wave crest travels "+gF(D)+" m in "+gF(t)+" s. The wave has a frequency of "+gF(f)+" Hz. What is its wavelength?",
    F3(ans)+" m",
    [F3(sfR(2*lam,3))+" m", F3(sfR(lam/2,3))+" m", F3(sfR(v*f,3))+" m"],
    sol,{D:D,t:t,f:f});
});

/* ---------- 8.3 Sound production and transmission ---------- */

E("u4-83-production",4,["PH11.8.3"],1,"var",varset([
  function(){
    return mcq("A guitar string is plucked and a note is heard across the room. The sound is produced by",
      "The vibrating string, which pushes the air into compressions and rarefactions",
      ["Air rushing from the guitar to the listener's ear",
       "The string itself travelling through the air to the ear",
       "Heat given off by the moving string"],
      "Sound is produced by a vibrating source. The vibrating string alternately squeezes and stretches the air next to it, and those compressions and rarefactions travel outward as the sound wave.",{});
  },
  function(){
    return mcq("An astronaut on the Moon strikes a metal bar with a hammer. A second astronaut standing nearby with no radio link hears nothing, because",
      "Sound needs a material medium to travel through, and the Moon has essentially no air",
      ["Sound cannot be produced in low gravity",
       "The bar cannot vibrate on the Moon",
       "Sound travels too slowly in a vacuum to arrive"],
      "The bar does vibrate, so sound is produced at the bar, but there is no medium between the bar and the listener to carry it. Sound cannot cross a vacuum.",{});
  },
  function(){
    return mcq("A tuning fork is struck and held over a table. The prongs are seen to blur as the fork hums. The blur is evidence that",
      "The prongs are vibrating, and that vibration is what produces the sound",
      ["The fork is heating up",
       "The sound is being reflected off the table",
       "The prongs are bending permanently"],
      "A struck tuning fork sounds because its prongs vibrate. The vibration pushes the surrounding air into compressions and rarefactions, which is the sound.",{});
  },
  function(){
    return mcq("A fog horn on a ferry sounds a long blast. Crew members below deck hear it through the steel hull as well as through the air. This shows that sound",
      "Can be transmitted through solids as well as through gases, as long as a medium carries the vibration",
      ["Can only travel through air",
       "Turns into light when it enters steel",
       "Stops at any solid surface"],
      "Sound is a vibration carried by the particles of a medium. Gases, liquids and solids can all transmit it; only a vacuum blocks it.",{});
  }
]));

E("u4-83-medium-speed",4,["PH11.8.3"],1,"var",varset([
  function(){
    return mcq("A train is still far down the track. A student puts an ear to the steel rail and hears the train clearly, while through the air it is barely audible. Sound reached the student through the rail first mainly because",
      "Sound travels much faster in steel than in air",
      ["Sound travels much faster in air than in steel",
       "Steel makes the sound louder by creating energy",
       "Sound cannot travel through air over long distances"],
      "The speed of sound depends on the medium. It is roughly 340 m/s in air but several thousand metres per second in steel, so the rail carries the sound to the student first.",{});
  },
  function(){
    return mcq("On a warm summer afternoon the speed of sound in air is greater than on a cold winter morning. This is because",
      "The speed of sound in air increases as the air temperature rises",
      ["Warm air is less dense in a way that always slows sound down",
       "The speed of sound in air does not depend on temperature",
       "Cold air carries sound faster because it is more solid"],
      "In air, sound speed rises with temperature, following v = 331 + 0.6 T m/s with T in degrees Celsius. Warmer air means a faster sound speed.",{});
  },
  function(){
    return mcq("Which list puts the speed of sound in the three media in the correct order, slowest first?",
      "Air, then water, then steel",
      ["Steel, then water, then air",
       "Water, then air, then steel",
       "Air, then steel, then water"],
      "Sound is slowest in gases, faster in liquids, and fastest in solids such as steel, where the particles are tightly linked. So the order slowest first is air, water, steel.",{});
  },
  function(){
    return mcq("A swimmer underwater hears a boat engine clearly, even though the engine is in the air above. The sound reached the swimmer because",
      "Sound can pass from one medium into another and keep travelling through the water",
      ["Sound speeds up so much in water that it arrives before it is made",
       "Water produces its own copy of the sound",
       "Sound cannot cross from air into water, so the swimmer heard it through the boat hull only"],
      "A sound wave reaching a boundary between media is partly reflected and partly transmitted. The transmitted part continues through the water to the swimmer.",{});
  }
]));

E("u4-83-temp-speed",4,["PH11.8.3"],2,"gen",function(){
  var ctx=pick(["at an outdoor concert in Bowring Park","on the deck of a ferry crossing to Bell Island","at a winter carnival rehearsal held outdoors","during a softball game in Mount Pearl"]);
  var T=ri(0,38);
  var p4=sfR(0.6*T,4);
  var v4=sfR(331+p4,4), ans=sfR(v4,3);
  var sol="The speed of sound in air is v = 331 + 0.6 T m/s, with T in degrees Celsius. First, 0.600 × "+iF(T)+" = "+iF(p4)+" m/s. Then 331 + "+iF(p4)+" = "+iF(v4)+" m/s. The speed of sound is "+F3(ans)+" m/s.";
  return numq("The air temperature "+ctx+" is "+T+" °C. Find the speed of sound in the air. Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {T:T});
});

E("u4-83-echo",4,["PH11.8.3"],2,"gen",function(){
  var ctx=pick(["A hiker shouts toward a cliff across a valley","A fishing boat sounds its horn toward a headland","A student claps facing the wall of an arena across an empty field","A tour boat guide calls toward the cliffs at Gros Morne"]);
  var t=sfR(rf(0.300,2.80),3);
  var p4=sfR(340*t,4);
  var d4=sfR(p4/2,4), ans=sfR(d4,3);
  var sol="Take the speed of sound in air as 340 m/s. The sound travels to the surface and back, so the one way distance is half of the total travel distance. Total distance: 340 m/s × "+iF(t)+" s = "+iF(p4)+" m. One way: "+iF(p4)+" m ÷ 2 = "+iF(d4)+" m. The reflecting surface is "+F3(ans)+" m away.";
  return numq(ctx+" and hears the echo "+gF(t)+" s later. Find the distance to the reflecting surface. Give your answer in m.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {t:t});
});

/* ---------- 8.4 Interference and reflection of sound ---------- */

E("u4-84-fixed-free",4,["PH11.8.4"],1,"var",varset([
  function(){
    var q=mcq("A single pulse travels along a rope toward a wall where the rope is tied tightly. When the pulse hits the wall, the reflected pulse",
      "Comes back inverted, crest becoming trough",
      ["Comes back with the same shape it had",
       "Stops at the wall and does not return",
       "Comes back with twice the amplitude"],
      "A fixed end cannot move, so it pulls the rope back and the reflected pulse is inverted: a crest returns as a trough. That is the rule for reflection at a fixed end.",{});
    q.figure=p22PulseEnd("fixed");return q;
  },
  function(){
    var q=mcq("A single pulse travels along a rope toward a free end, where the rope is tied to a ring that slides freely on a post. When the pulse reaches the end, the reflected pulse",
      "Comes back with the same shape it had, crest staying a crest",
      ["Comes back inverted, crest becoming trough",
       "Disappears at the end",
       "Comes back upside down and twice as wide"],
      "A free end is free to move, so the pulse is reflected without inversion: a crest returns as a crest. Inversion happens only at a fixed end.",{});
    q.figure=p22PulseEnd("free");return q;
  },
  function(){
    var q=mcq("Two identical pulses travel toward each other on a stretched rope and meet. At the moment they overlap exactly, the displacement of the rope is",
      "The sum of the two displacements, so a crest on a crest gives twice the height",
      ["Zero everywhere, because the pulses cancel each other out",
       "Only the displacement of the faster pulse",
       "Unchanged, because pulses pass through each other without adding"],
      "Superposition adds the displacements of the two pulses at each point. Two crests meeting give twice the displacement; the pulses then pass through each other and continue on their way.",{});
    q.figure=p22Pulses([{h:3,t:"crest",dir:1},{h:3,t:"crest",dir:-1}]);return q;
  },
  function(){
    var q=mcq("A crest and a trough of the same size meet on a stretched rope. At the moment they overlap exactly, the rope is",
      "Flat at the overlap, because the two displacements add to zero",
      ["Twice as high as the crest alone",
       "Twice as low as the trough alone",
       "Flat everywhere along the rope"],
      "Superposition adds displacements, so a crest plus an equal trough gives zero displacement where they overlap. This is destructive interference, and the pulses continue past each other afterwards.",{});
    q.figure=p22Pulses([{h:3,t:"crest",dir:1},{h:-3,t:"trough",dir:-1}]);return q;
  },
  function(){
    return mcq("Two pulses meet and briefly cancel each other out where they overlap. After they have passed through each other, the pulses",
      "Continue on their way with their original shapes, each on the far side",
      ["Both disappear, because they destroyed each other",
       "Merge into one stationary pulse",
       "Turn around and go back the way they came"],
      "Pulses pass through each other unchanged. The cancellation is only a brief overlap effect; afterwards each pulse carries on with its original shape and direction.",{});
  }
]));

E("u4-84-superposition",4,["PH11.8.4"],2,"var",varset([
  function(){
    var q=mcq("Two identical crest pulses of height 3.0 cm travel toward each other on a rope. At the instant they overlap exactly, the highest point of the rope is",
      "6.0 cm above the rest position",
      ["3.0 cm above the rest position",
       "0 cm, because the two crests cancel",
       "9.0 cm above the rest position"],
      "Superposition adds displacements: a crest on a crest gives 3.0 cm + 3.0 cm = 6.0 cm above the rest position. The pulses then continue past each other unchanged.",{});
    q.figure=p22Pulses([{h:3,t:"crest 3.0 cm",dir:1},{h:3,t:"crest 3.0 cm",dir:-1}]);return q;
  },
  function(){
    var q=mcq("A crest pulse 4.0 cm high meets a trough pulse 2.0 cm deep on a rope. At the instant the two overlap exactly, the rope at the overlap is",
      "2.0 cm above the rest position",
      ["2.0 cm below the rest position",
       "6.0 cm above the rest position",
       "Flat, at the rest position"],
      "Add the displacements with their signs: +4.0 cm from the crest and -2.0 cm from the trough gives +2.0 cm, so the rope is 2.0 cm above the rest position where the two overlap.",{});
    q.figure=p22Pulses([{h:4,t:"crest 4.0 cm",dir:1},{h:-2,t:"trough 2.0 cm",dir:-1}]);return q;
  },
  function(){
    return mcq("Two sound waves reach a listener at the same time, one in compression and one in rarefaction at the same point. The listener hears",
      "Quieter sound, because the two waves interfere destructively and partly cancel",
      ["Louder sound, because two waves always add up",
       "A higher pitch, because the frequency doubles",
       "No change, because sound waves cannot interfere"],
      "When a compression meets a rarefaction, the pressures partly cancel, so the combined sound is quieter. That is destructive interference of the two sound waves.",{});
  },
  function(){
    return mcq("Two identical sound waves reach a point in step, compression on compression. The result at that point is",
      "Constructive interference, a louder sound than either wave alone",
      ["Destructive interference, a quieter sound than either wave alone",
       "A sound of doubled frequency",
       "No sound, because the two waves block each other"],
      "Compression meeting compression adds, giving constructive interference and a larger amplitude, so the sound is louder there.",{});
  },
  function(){
    return mcq("A pulse on a rope passes the midpoint of the rope and continues onward. A second pulse, sent after it, follows the same path. The pulses",
      "Pass through each other unchanged if they ever meet, because each is just the rope moving as the wave passes",
      ["Merge into one bigger pulse and stay merged",
       "Bounce off each other like billiard balls",
       "Cancel each other permanently when they meet"],
      "Waves obey superposition and pass through each other unchanged. The rope particles move as each pulse passes, so meeting pulses simply add while they overlap and then carry on.",{});
  }
]));

E("u4-84-standing-cr",4,["PH11.8.4"],2,"gen",function(){
  var ctx=pick(["A guitar string","A violin string","A string on a monochord in the lab","A steel cable stretched between two fixed posts"]);
  var L=sfR(rf(0.400,1.60),3);
  var n=ri(2,5);
  var v=sfR(rf(120,320),3);
  var twoL=sfR(2*L,4);
  var l4=sfR(twoL/n,4);
  var f4=sfR(v/l4,4), ans=sfR(f4,3);
  var sol="On a string fixed at both ends the n-th harmonic has wavelength 2L ÷ n. First, 2 × "+iF(L)+" m = "+iF(twoL)+" m. Then "+iF(twoL)+" m ÷ "+n+" = "+iF(l4)+" m, so the wavelength is "+iF(l4)+" m. Then use v = f λ: f = v ÷ λ = "+iF(v)+" m/s ÷ "+iF(l4)+" m = "+iF(f4)+" Hz. The frequency of harmonic number "+n+" is "+F3(ans)+" Hz.";
  var q=numq(ctx+" of length "+gF(L)+" m is fixed at both ends. Waves travel along it at "+gF(v)+" m/s. Find the frequency of harmonic number "+n+" (counting the fundamental as number 1). Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {L:L,n:n,v:v});
    q.figure=p22StandString(n,gF(L)+" m");return q;
});

E("u4-84-open-column",4,["PH11.8.4"],2,"gen",function(){
  var ctx=pick(["A flute-like tube open at both ends","An organ pipe open at both ends","A length of pipe open at both ends in the lab"]);
  var idx=ri(1,3);
  var lam=sfR(rf(0.400,1.70),3);
  var L=sfR(idx*lam/2,3);
  var lam2=sfR(2*L/idx,4);
  var f4=sfR(340/lam2,4), ans=sfR(f4,3);
  var word=["first","second","third"][idx-1];
  var sol="In an open air column the resonant lengths are λ/2, λ, 3λ/2, and so on. The "+word+" resonance has length "+idx+"λ/2, so λ = 2L ÷ "+idx+". 2 × "+iF(L)+" m = "+iF(sfR(2*L,4))+" m, then "+iF(sfR(2*L,4))+" m ÷ "+idx+" = "+iF(lam2)+" m. With the speed of sound in air taken as 340 m/s, f = v ÷ λ = 340 m/s ÷ "+iF(lam2)+" m = "+iF(f4)+" Hz. The frequency is "+F3(ans)+" Hz.";
  var q=numq(ctx+" has a length of "+gF(L)+" m and is sounding at its "+word+" resonance. Take the speed of sound in air as 340 m/s. Find the frequency of the sound. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {idx:idx,L:L});
    q.figure=p22Column("open",idx,gF(L)+" m",word+" resonance");return q;
});

E("u4-84-string-mc",4,["PH11.8.4"],2,"gen",function(){
  var L=sfR(rf(0.500,1.50),3);
  var n=ri(2,6);
  var v=sfR(rf(100,400),3);
  var f=n*v/(2*L), ans=sfR(f,3);
  var sol="For a string fixed at both ends, the n-th harmonic has wavelength 2L ÷ n, and f = v ÷ λ = n v ÷ (2L). Substituting n = "+n+", v = "+gF(v)+" m/s and L = "+gF(L)+" m gives f = "+F3(ans)+" Hz. Leaving out the harmonic number would give the fundamental, and using n v ÷ L would double the answer.";
  var q=mcq("A string "+gF(L)+" m long is fixed at both ends. Waves travel along it at "+gF(v)+" m/s. What is the frequency of harmonic number "+n+" (counting the fundamental as number 1)?",
    F3(ans)+" Hz",
    [F3(sfR(f/n,3))+" Hz", F3(sfR(2*f,3))+" Hz", F3(sfR(f/(n*n),3))+" Hz"],
    sol,{L:L,n:n,v:v});
    q.figure=p22StandString(n,gF(L)+" m");return q;
});

E("u4-84-closed-fundamental",4,["PH11.8.4"],2,"gen",function(){
  var ctx=pick(["A tube closed at one end, like a bottle","A length of pipe closed at one end","A resonance tube with one end stoppered"]);
  var L=sfR(rf(0.150,0.850),3);
  var fourL=sfR(4*L,4);
  var f4=sfR(340/fourL,4), ans=sfR(f4,3);
  var sol="The fundamental of a closed air column fits a quarter of a wavelength into the tube, so λ = 4L. 4 × "+iF(L)+" m = "+iF(fourL)+" m. Then f = v ÷ λ = 340 m/s ÷ "+iF(fourL)+" m = "+iF(f4)+" Hz. The fundamental frequency is "+F3(ans)+" Hz.";
  var q=numq(ctx+" has a length of "+gF(L)+" m. Take the speed of sound in air as 340 m/s. Find its fundamental frequency. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {L:L});
    q.figure=p22Column("closed",1,gF(L)+" m","fundamental");return q;
});

E("u4-84-resonance-cr",4,["PH11.8.4"],3,"gen",function(){
  var ctx=pick(["A resonance tube closed at one end","A bottle blown across the top","A length of pipe closed at one end"]);
  var r=ri(1,3);
  var odd=2*r-1;
  var lam=sfR(rf(0.500,1.40),3);
  var L=sfR(odd*lam/4,3);
  var vT=sfR(rf(335,350),3);
  var f=sfR(vT/lam,3);
  var fourL=sfR(4*L,4);
  var lam4=sfR(fourL/odd,4);
  var v4=sfR(f*lam4,4), ans=sfR(v4,3);
  var word=["first","second","third"][r-1];
  var sol="In a closed air column the resonant lengths are λ/4, 3λ/4, 5λ/4, and so on. The "+word+" resonance is the length "+odd+"λ/4, so λ = 4L ÷ "+odd+". 4 × "+iF(L)+" m = "+iF(fourL)+" m, then "+iF(fourL)+" m ÷ "+odd+" = "+iF(lam4)+" m, so the wavelength is "+iF(lam4)+" m. The speed is v = f λ = "+iF(f)+" Hz × "+iF(lam4)+" m = "+iF(v4)+" m/s. The speed of sound is "+F3(ans)+" m/s.";
  var q=numq(ctx+" of length "+gF(L)+" m resonates at its "+word+" resonance with a tuning fork of frequency "+gF(f)+" Hz. Find the speed of sound in the air. Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {r:r,L:L,f:f});
    q.figure=p22Column("closed",odd,gF(L)+" m",word+" resonance");return q;
});

E("u4-84-speed-by-resonance",4,["PH11.8.4"],3,"gen",function(){
  var lam=sfR(rf(0.650,1.25),3);
  var vT=sfR(rf(335,350),3);
  var f=sfR(vT/lam,3);
  var L1=sfR(lam/4,3);
  var L2=sfR(3*lam/4,3);
  var d4=sfR(L2-L1,4);
  var lam4=sfR(2*d4,4);
  var v4=sfR(f*lam4,4), ans=sfR(v4,3);
  var sol="Successive resonances of a closed column are half a wavelength apart, so the gap between the first and second resonance lengths is λ/2. "+iF(L2)+" m - "+iF(L1)+" m = "+iF(d4)+" m, so λ = 2 × "+iF(d4)+" m = "+iF(lam4)+" m. Then v = f λ = "+iF(f)+" Hz × "+iF(lam4)+" m = "+iF(v4)+" m/s. The speed of sound is "+F3(ans)+" m/s.";
  var q=numq("In a closed-end resonance experiment, the first resonance for a "+gF(f)+" Hz tuning fork is found with the air column "+gF(L1)+" m long, and the next resonance is found at "+gF(L2)+" m. Find the speed of sound in the air. Give your answer in m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f:f,L1:L1,L2:L2});
    q.figure=p22TwoColumns(gF(L1)+" m",gF(L2)+" m");return q;
});

/* ---------- 8.5 Electromagnetic radiation compared with sound ---------- */

E("u4-85-compare-type",4,["PH11.8.5"],1,"var",varset([
  function(){
    return mcq("Which statement correctly compares light and sound?",
      "Light is a transverse electromagnetic wave that needs no medium; sound is a longitudinal wave that needs a medium",
      ["Light is a longitudinal wave that needs no medium; sound is a transverse wave that needs a medium",
       "Both are longitudinal waves that need a medium",
       "Both are transverse waves that need no medium"],
      "Electromagnetic radiation is transverse and travels through a vacuum. Sound is longitudinal and must have a material medium to carry it.",{});
  },
  function(){
    return mcq("A bell ringing inside a sealed jar is heard less and less as the air is pumped out, while a light inside the jar stays fully visible. This shows that",
      "Sound needs a medium but light does not",
      ["Light needs a medium but sound does not",
       "Both sound and light need air",
       "Neither sound nor light can cross glass"],
      "With the air gone there is no medium to carry the sound, so it fades. The light is electromagnetic radiation and crosses the vacuum easily, so it stays visible.",{});
  },
  function(){
    return mcq("Sunlight reaches Earth across the vacuum of space, but the sounds of a solar flare cannot be heard on Earth. The reason is",
      "Light is electromagnetic radiation that travels without a medium, while sound must travel through matter",
      ["Sound travels too slowly to ever arrive",
       "Light is a longitudinal wave and sound is transverse",
       "Space bends sound away from Earth"],
      "Electromagnetic radiation needs no medium and crosses empty space at the speed of light. Sound is a vibration of matter, and there is no matter between the Sun and Earth to carry it.",{});
  },
  function(){
    return mcq("Which property belongs to sound but NOT to light?",
      "It is a longitudinal wave whose speed depends strongly on the temperature of the air carrying it",
      ["It transfers energy",
       "It can be reflected",
       "It has a frequency and a wavelength"],
      "Both waves transfer energy, reflect, and have frequency and wavelength. Only sound is longitudinal and carried by air, so only its speed is set by air temperature in this way.",{});
  }
]));

E("u4-85-speeds",4,["PH11.8.5"],2,"var",varset([
  function(){
    return mcq("A lightning flash is seen over Conception Bay and the thunder arrives several seconds later. The delay happens because",
      "Light travels at 3.00 × 10^8 m/s while sound travels at only about 340 m/s in air",
      ["Sound travels at 3.00 × 10^8 m/s while light travels at only about 340 m/s in air",
       "Light and sound travel at the same speed, but thunder is produced later",
       "Sound is reflected many times on the way, while light is not"],
      "The flash and the thunder are produced at the same moment. Light covers the distance almost instantly at 3.00 × 10^8 m/s, while sound takes seconds at about 340 m/s.",{});
  },
  function(){
    return mcq("A radio station broadcasts its signal, and a listener also hears the announcer faintly through an open studio door at the same moment the broadcast starts. Which signal reaches a listener 3 km away first, and why?",
      "The radio signal, because electromagnetic waves travel at the speed of light, far faster than sound in air",
      ["The sound through the air, because sound is faster than radio waves",
       "Both at the same time, because all waves travel at the same speed",
       "The sound, because radio waves need a medium and are slowed by air"],
      "Radio waves are electromagnetic radiation travelling at 3.00 × 10^8 m/s, so they cover 3 km almost instantly. Sound in air travels at about 340 m/s and would take several seconds.",{});
  },
  function(){
    return mcq("Light passing from air into a glass block slows down. Sound passing from air into a steel rail speeds up. These facts together show that",
      "A wave's speed depends on the medium it is in, and the change is different for different kinds of wave",
      ["All waves speed up when they enter a denser material",
       "All waves slow down when they enter a denser material",
       "Wave speed never changes when the medium changes"],
      "Wave speed is a property of the wave in a given medium. Light slows in glass compared with air, while sound travels much faster in steel than in air.",{});
  },
  function(){
    return mcq("Which statement about the speeds of light and sound is correct?",
      "In a vacuum light travels at 3.00 × 10^8 m/s and sound does not travel at all",
      ["In a vacuum both light and sound travel at 3.00 × 10^8 m/s",
       "Sound travels faster than light in every medium",
       "Light travels at about 340 m/s in air and sound at 3.00 × 10^8 m/s"],
      "Light reaches its full speed of 3.00 × 10^8 m/s in a vacuum. Sound has no speed in a vacuum because there is no medium to carry it.",{});
  }
]));

E("u4-85-medium-effect",4,["PH11.8.5"],2,"var",varset([
  function(){
    return mcq("On a hot afternoon, sound from a distant band carries noticeably differently than on a cold morning, yet the colours of their instruments look exactly the same. The difference is that",
      "The speed of sound in air changes with temperature, while the speed of light in air is nearly unchanged",
      ["The speed of light in air changes strongly with temperature, while sound is unaffected",
       "Both speeds change strongly with temperature",
       "Temperature has no effect on either speed"],
      "Sound speed in air follows v = 331 + 0.6 T m/s and changes measurably with temperature. Light in air travels at essentially the vacuum speed whatever the temperature.",{});
  },
  function(){
    return mcq("A diver shines a flashlight upward and also taps a tank to signal. Compared with in air, in water the light",
      "Travels more slowly, while the sound travels faster than in air",
      ["Travels faster, while the sound travels more slowly than in air",
       "Travels at exactly the same speed, and so does the sound",
       "Cannot travel at all, while the sound can"],
      "Light slows when it enters an optically denser medium like water. Sound, by contrast, travels faster in water than in air because the liquid carries the vibration more effectively.",{});
  },
  function(){
    return mcq("A fibre optic cable carries a phone call as pulses of light in glass. The pulses travel",
      "More slowly than light in a vacuum, because light slows in glass",
      ["Faster than light in a vacuum, because glass speeds light up",
       "At exactly the vacuum speed of light, because the medium never matters for light",
       "At the speed of sound in glass"],
      "Light in any material medium travels more slowly than in a vacuum; glass is no exception. The pulses still travel enormously faster than any sound.",{});
  },
  function(){
    return mcq("Warm air above a sun-heated road can bend sound from a distant highway upward, making it harder to hear at ground level. Light from the same highway is barely affected in this situation mainly because",
      "The bending described is a sound-in-air temperature effect; light's speed in air changes only very slightly with temperature",
      ["Light cannot be bent under any circumstances",
       "Sound cannot be bent by a temperature change",
       "Light travels so slowly that it misses the warm air"],
      "Sound speed in air varies with temperature enough to bend sound noticeably. Light's speed in air stays very close to its vacuum value, so the same warm layer has little effect on it.",{});
  }
]));

E("u4-85-which-travels",4,["PH11.8.5"],2,"var",varset([
  function(){
    return mcq("Two identical signals are sent from a ship to a shore station 3 km away, one as a radio wave and one as a sound blast through the air. Which arrives first, and roughly how long does the slower one take?",
      "The radio wave arrives almost at once; the sound takes about 9 s",
      ["The sound arrives first; the radio wave takes about 9 s",
       "Both take about 9 s",
       "The radio wave arrives almost at once; the sound takes about 0.009 s"],
      "The radio wave travels at 3.00 × 10^8 m/s and arrives almost instantly. Sound covering 3000 m at about 340 m/s takes a little under 9 s.",{});
  },
  function(){
    return mcq("A solar storm erupts on the Sun. Eight minutes later, satellites detect the burst of radiation, but no sound from the eruption is ever detected on Earth. The best explanation is",
      "The radiation crossed the vacuum of space at the speed of light, while sound cannot cross a vacuum at all",
      ["The sound is still on its way and will arrive in a few years",
       "The sound was absorbed by Earth's atmosphere",
       "Sound from the Sun is too quiet to detect"],
      "Electromagnetic radiation travels through empty space; sound cannot, because there is no medium between the Sun and Earth. The missing sound is not a matter of loudness or delay.",{});
  },
  function(){
    return mcq("An explosion is detonated underwater and observers on shore see a flash of light from a lamp at the site at the same instant. Observers hear the boom noticeably later mainly because",
      "Sound, even in water, travels far more slowly than light",
      ["Light travels more slowly in water than sound does",
       "Sound cannot travel through water to the shore",
       "The light was produced before the explosion"],
      "Light travels at well over 10^8 m/s even in water, while sound in water travels at only about 1.5 × 10^3 m/s. The light arrives essentially at once and the sound later.",{});
  },
  function(){
    return mcq("A student claims that because light and sound are both waves, warming the air in a hall will change both of their speeds by the same proportion. The claim is",
      "Wrong: sound speed in air changes noticeably with temperature, while light speed in air stays essentially at its vacuum value",
      ["Right: all wave speeds respond to temperature in the same way",
       "Wrong: temperature changes light speed noticeably but never changes sound speed",
       "Right: temperature changes neither speed at all"],
      "Sound in air follows v = 331 + 0.6 T m/s, a clear temperature effect. Light in air is essentially unaffected by ordinary temperature changes. The two waves do not respond the same way.",{});
  }
]));

/* ---------- 8.6 Interference and diffraction of light ---------- */

E("u4-86-diffraction",4,["PH11.8.6"],1,"var",varset([
  function(){
    return mcq("Light passes through a narrow opening and spreads out beyond it. This spreading of light around the edges of an opening is called",
      "Diffraction",
      ["Reflection",
       "Refraction",
       "Interference"],
      "Diffraction is the spreading of a wave as it passes through an opening or around an edge. Reflection and refraction happen at boundaries, and interference is the overlap of two waves.",{});
  },
  function(){
    return mcq("A slit is gradually made narrower while light shines through it. As the slit width gets closer to the wavelength of the light, the spreading of the light beyond the slit",
      "Increases, so the light fans out more widely",
      ["Decreases, so the light stays in a narrower beam",
       "Stays exactly the same",
       "Stops completely once the slit is narrow"],
      "Diffraction is strongest when the opening is close in size to the wavelength. The narrower the slit compared with the wavelength, the more the light spreads.",{});
  },
  function(){
    return mcq("Sound from a classroom can be heard around a partly open door, but light from the same room does not visibly spread around the door in the same way. The main reason is",
      "Sound wavelengths are comparable to the door opening, while light wavelengths are far smaller, so sound diffracts much more noticeably",
      ["Light cannot diffract at all",
       "Sound travels faster than light",
       "The door absorbs light but reflects sound"],
      "Diffraction is noticeable when the opening is comparable to the wavelength. Sound wavelengths are a sizable fraction of a metre, near the size of a doorway; light wavelengths are tiny fractions of a millimetre.",{});
  },
  function(){
    return mcq("Red light has a longer wavelength than blue light. Both pass through the same narrow slit, one at a time. Which spreads out more, and why?",
      "The red light, because its longer wavelength is closer to the slit width",
      ["The blue light, because its shorter wavelength fits through more easily",
       "Both spread the same, because the slit is the same",
       "Neither spreads, because light does not diffract through slits"],
      "For a fixed opening, the wave with the longer wavelength is closer in size to the opening and diffracts more. Red light, with the longer wavelength, spreads more than blue.",{});
  }
]));

E("u4-86-doubleslit-cr",4,["PH11.8.6"],2,"gen",function(){
  var lamNm=pick([435,470,500,532,560,589,620,650]);
  var m=pick([2,3,4]);
  var dMm=pick([0.150,0.200,0.250,0.400]);
  var Lm=pick([0.800,1.00,1.20,1.50,2.00]);
  var xMm=sfR(m*lamNm*Lm/dMm/1000,3);
  var xM=xMm/1000, dM=dMm/1000;
  var prod4=sfR(xM*dM,4);
  var den4=sfR(m*Lm,4);
  var lamM4=sfR(prod4/den4,4);
  var ans=sfR(lamM4*1000000000,3);
  var sol="Bright fringes satisfy m λ = x d ÷ L, so λ = x d ÷ (m L). Convert the fringe distance and the slit separation to metres in words: x is "+iF(xM)+" m and d is "+iF(dM)+" m. First the numerator: "+iF(xM)+" m × "+iF(dM)+" m = "+iF(prod4)+" m². The denominator: "+m+" × "+iF(Lm)+" m = "+iF(den4)+" m. Then λ = "+iF(prod4)+" m² ÷ "+iF(den4)+" m = "+iF(lamM4)+" m. Converting metres to nanometres in words gives the wavelength "+F3(ans)+" nm.";
  var q=numq( "In a double slit experiment, the "+(m===2?"2nd":m===3?"3rd":m+"th")+" bright fringe is "+gF(xMm)+" mm from the central maximum. The slits are "+gF(dMm)+" mm apart and the screen is "+gF(Lm)+" m from the slits. Find the wavelength of the light. Give your answer in nm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {m:m,dMm:dMm,Lm:Lm,xMm:xMm});
    q.figure=p22Slit(gF(dMm)+" mm",gF(Lm)+" m",gF(xMm)+" mm",m);return q;
});

E("u4-86-fringe-position",4,["PH11.8.6"],2,"gen",function(){
  var lamNm=pick([450,475,500,550,580,600,633,670]);
  var m=pick([1,2,3]);
  var dMm=pick([0.200,0.250,0.300,0.500]);
  var Lm=pick([0.900,1.10,1.40,1.80]);
  var lamM=lamNm*0.000000001, dM=dMm/1000;
  var p4=sfR(lamM*Lm,4);
  var p5=sfR(p4*m,4);
  var xM4=sfR(p5/dM,4), ans=sfR(xM4*1000,3);
  var sol="Bright fringes satisfy m λ = x d ÷ L, so x = m λ L ÷ d. Convert the wavelength and the slit separation to metres in words: λ is "+iF(lamM)+" m and d is "+iF(dM)+" m. First, "+iF(lamM)+" m × "+iF(Lm)+" m = "+iF(p4)+" m². Then "+iF(p4)+" m² × "+m+" = "+iF(p5)+" m². Then "+iF(p5)+" m² ÷ "+iF(dM)+" m = "+iF(xM4)+" m. Converting metres to millimetres in words, the fringe is "+F3(ans)+" mm from the central maximum.";
  var q=numq("Light of wavelength "+lamNm+" nm shines on two slits "+gF(dMm)+" mm apart. The screen is "+gF(Lm)+" m away. Find the distance from the central maximum to the "+m+(m===1?"st":m===2?"nd":"rd")+" bright fringe. Give your answer in mm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {lamNm:lamNm,m:m,dMm:dMm,Lm:Lm});
    q.figure=p22Slit(gF(dMm)+" mm",gF(Lm)+" m","?",m);return q;
});

E("u4-86-slit-separation",4,["PH11.8.6"],2,"gen",function(){
  var lamNm=pick([460,490,520,560,590,620,650]);
  var m=pick([2,3,4]);
  var dMm=pick([0.180,0.220,0.280,0.350,0.450]);
  var Lm=pick([0.850,1.05,1.30,1.60,1.90]);
  var xMm=sfR(m*lamNm*Lm/dMm/1000,3);
  var lamM=lamNm*0.000000001, xM=xMm/1000;
  var p4=sfR(lamM*Lm,4);
  var p5=sfR(p4*m,4);
  var dM4=sfR(p5/xM,4), ans=sfR(dM4*1000,3);
  var sol="Bright fringes satisfy m λ = x d ÷ L, so d = m λ L ÷ x. Convert the wavelength and the fringe distance to metres in words: λ is "+iF(lamM)+" m and x is "+iF(xM)+" m. First, "+iF(lamM)+" m × "+iF(Lm)+" m = "+iF(p4)+" m². Then "+iF(p4)+" m² × "+m+" = "+iF(p5)+" m². Then "+iF(p5)+" m² ÷ "+iF(xM)+" m = "+iF(dM4)+" m. Converting metres to millimetres in words, the slit separation is "+F3(ans)+" mm.";
  var q=numq("Light of wavelength "+lamNm+" nm produces a double slit pattern on a screen "+gF(Lm)+" m from the slits. The "+(m===2?"2nd":m===3?"3rd":m+"th")+" bright fringe is "+gF(xMm)+" mm from the central maximum. Find the slit separation. Give your answer in mm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {lamNm:lamNm,m:m,Lm:Lm,xMm:xMm});
    q.figure=p22Slit("?",gF(Lm)+" m",gF(xMm)+" mm",m);return q;
});

E("u4-86-diffraction-design",4,["PH11.8.6"],3,"var",varset([
  function(){
    var w=pick([520,560,600]);
    return mcq("A class wants light of wavelength "+w+" nm to spread out as much as possible after passing through a single opening. They can choose an opening of width 0.50 mm, 0.050 mm, or 0.0050 mm. Which choice gives the most spreading, and why?",
      "0.0050 mm, because diffraction is greatest when the opening is closest in size to the wavelength",
      ["0.50 mm, because a wider opening lets more light spread",
       "0.050 mm, because it is exactly in the middle",
       "All three spread the same, because the wavelength is unchanged"],
      "Diffraction increases as the opening approaches the wavelength in size. Of the three, 0.0050 mm is closest to the wavelength of the light, so it gives the widest spreading.",{w:w});
  },
  function(){
    return mcq("A student claims that shining blue light (shorter wavelength) through a slit will spread it out more than red light (longer wavelength) through the same slit, because the blue light is more energetic. Judging the claim by diffraction behaviour, it is",
      "Incorrect: the red light spreads more, because its longer wavelength is closer to the slit size",
      ["Correct: more energetic light always spreads more",
       "Incorrect: neither colour spreads at all through a slit",
       "Correct: shorter wavelengths always diffract more"],
      "Diffraction depends on how the wavelength compares with the opening, not on energy. The longer red wavelength is closer to the slit size, so the red light spreads more. The claim is incorrect.",{});
  },
  function(){
    return mcq("A harbour entrance is 30 m wide. Ocean swells of wavelength 25 m pass through it, and sound from a horn of wavelength 0.50 m also passes through it. Which spreads out most noticeably inside the harbour, judging by diffraction?",
      "The ocean swells, because their wavelength is close to the width of the entrance",
      ["The sound, because its wavelength is much smaller than the entrance",
       "Both spread the same amount",
       "Neither, because waves cannot spread after an opening"],
      "Diffraction is strongest when the wavelength is comparable to the opening. The 25 m swells are close to the 30 m entrance, so they fan out noticeably; the 0.50 m sound passes through with little spreading.",{});
  },
  function(){
    return mcq("To hear a speaker in the next room through a doorway more clearly, a student suggests making the doorway narrower so the sound spreads more. Judged by diffraction behaviour, the suggestion",
      "Works in principle: a narrower opening, closer to the wavelength of sound, spreads the sound more widely into the next room",
      ["Cannot work: narrowing an opening always reduces spreading",
       "Works, but only because a narrower door reflects more sound",
       "Cannot work: sound does not diffract"],
      "Sound wavelengths are a fair fraction of a metre. Narrowing the doorway brings the opening closer to the wavelength, which increases diffraction, so more sound bends into the shadow region of the next room.",{});
  }
]));

/* ---------- 8.7 The Doppler effect ---------- */

E("u4-87-doppler-cr",4,["PH11.8.7"],2,"gen",function(){
  var scen=pick([
    {txt:"An ambulance siren of frequency",who:"ambulance",move:"toward a stationary pedestrian"},
    {txt:"A train whistle of frequency",who:"train",move:"toward a stationary observer at a crossing"},
    {txt:"A fire truck siren of frequency",who:"fire truck",move:"toward a stationary cyclist who has stopped"},
    {txt:"A boat horn of frequency",who:"boat",move:"toward a stationary kayaker"}
  ]);
  var away=Math.random()<0.5;
  var f0=sfR(rf(200,800),3);
  var vs=sfR(rf(10.0,35.0),3);
  var den4=away?sfR(340+vs,4):sfR(340-vs,4);
  var ratio4=sfR(340/den4,4);
  var fp4=sfR(f0*ratio4,4), ans=sfR(fp4,3);
  var dirWords=away?("away from the observer, so the source motion stretches the wave out and the observed frequency drops. The denominator of f' = f (v + v_o) ÷ (v - v_s) becomes v + v_s because the source is receding: 340 m/s + "+iF(vs)+" m/s = "+iF(den4)+" m/s.")
                   :("toward the observer, so the source crowds the wave fronts together and the observed frequency rises. The denominator of f' = f (v + v_o) ÷ (v - v_s) subtracts the source speed because the source is approaching: 340 m/s - "+iF(vs)+" m/s = "+iF(den4)+" m/s.");
  var sol="Take the speed of sound in air as 340 m/s and the observer as stationary, so v_o is zero and the numerator is just 340 m/s. The "+scen.who+" moves "+dirWords+" The ratio is 340 m/s ÷ "+iF(den4)+" m/s = "+iF(ratio4)+". Then f' = "+iF(f0)+" Hz × "+iF(ratio4)+" = "+iF(fp4)+" Hz. The observed frequency is "+F3(ans)+" Hz.";
  return numq(scen.txt+" "+gF(f0)+" Hz sounds as the "+scen.who+" travels at "+gF(vs)+" m/s directly "+(away?"away from":"toward")+" a stationary observer. Find the frequency the observer hears. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f0:f0,vs:vs,away:away});
});

E("u4-87-observer",4,["PH11.8.7"],2,"gen",function(){
  var away=Math.random()<0.5;
  var f0=sfR(rf(250,700),3);
  var vo=sfR(rf(5.00,30.0),3);
  var num4=away?sfR(340-vo,4):sfR(340+vo,4);
  var ratio4=sfR(num4/340,4);
  var fp4=sfR(f0*ratio4,4), ans=sfR(fp4,3);
  var dirWords=away?("away from the source, so the observer meets the wave fronts less often and hears a lower frequency. The numerator of f' = f (v + v_o) ÷ (v - v_s) becomes v - v_o for motion away: 340 m/s - "+iF(vo)+" m/s = "+iF(num4)+" m/s.")
                   :("toward the source, so the observer meets the wave fronts more often and hears a higher frequency. The numerator of f' = f (v + v_o) ÷ (v - v_s) takes the plus sign for motion toward: 340 m/s + "+iF(vo)+" m/s = "+iF(num4)+" m/s.");
  var sol="The source is stationary, so v_s is zero and the denominator is 340 m/s. The observer moves "+dirWords+" The ratio is "+iF(num4)+" m/s ÷ 340 m/s = "+iF(ratio4)+". Then f' = "+iF(f0)+" Hz × "+iF(ratio4)+" = "+iF(fp4)+" Hz. The observed frequency is "+F3(ans)+" Hz.";
  return numq("A stationary siren emits sound of frequency "+gF(f0)+" Hz. A cyclist travels at "+gF(vo)+" m/s directly "+(away?"away from":"toward")+" the siren. Find the frequency the cyclist hears. Take the speed of sound in air as 340 m/s. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f0:f0,vo:vo,away:away});
});

E("u4-87-direction",4,["PH11.8.7"],2,"var",varset([
  function(){
    return mcq("An ambulance approaches a pedestrian, passes, and drives away. The pitch of the siren the pedestrian hears",
      "Is higher than the true pitch while approaching, then drops below the true pitch as it recedes",
      ["Is lower than the true pitch while approaching, then rises above it as it recedes",
       "Stays at the true pitch the whole time, only the loudness changes",
       "Is higher both while approaching and while receding"],
      "An approaching source crowds the wave fronts together, shortening the wavelength and raising the observed frequency. Once it recedes, the fronts are stretched out and the observed frequency falls below the true frequency.",{});
  },
  function(){
    return mcq("A train blowing a steady whistle moves away from a stationary observer. Compared with the whistle's true frequency, the observer hears",
      "A lower frequency, because the moving source leaves the wave fronts stretched out behind it",
      ["A higher frequency, because the sound has farther to travel",
       "The same frequency, because the whistle itself has not changed",
       "A higher frequency, because the wavelength ahead of the train is shorter"],
      "The whistle's own frequency does not change, but a receding source stretches the wavelength of the sound behind it, so the observer receives a lower frequency.",{});
  },
  function(){
    return mcq("In front of a fast moving source of sound, the wavelength of the sound is",
      "Shorter than it would be if the source were at rest, because each new wave front is emitted closer to the previous one",
      ["Longer than at rest, because the source is running away from its own sound",
       "Exactly the same as at rest, because only the observer matters",
       "Zero, because the source catches up with its own wave fronts"],
      "A source moving toward the observer emits each wave front from a position closer to the previous front, crowding them together. The wavelength ahead is shorter, which is why the observed frequency is higher.",{});
  },
  function(){
    return mcq("A cyclist rides toward a stationary church bell that is ringing. The cyclist hears",
      "A higher frequency than a person standing still, because the cyclist meets the wave fronts more often",
      ["A lower frequency than a person standing still, because the cyclist is moving",
       "Exactly the same frequency, because the bell is stationary",
       "A lower frequency, because the wavelength in the air got longer"],
      "The wavelength in the air is unchanged, but a moving observer who rides toward the source crosses the wave fronts more often per second, so the observed frequency is higher.",{});
  },
  function(){
    return mcq("Source and observer are both stationary, but a strong wind blows steadily from the source toward the observer. At this level, the observed frequency is",
      "Essentially unchanged, because neither the source nor the observer is moving relative to the ground-based setup of the Doppler formula in the reference panel",
      ["Much higher, because the wind adds its speed to the frequency",
       "Much lower, because the wind stretches the wave out",
       "Doubled, because the wind carries the sound twice as fast"],
      "The Doppler shifts in this course come from motion of the source or the observer as set up in f' = f (v + v_o) ÷ (v - v_s). With both at rest there is no source or observer motion to shift the frequency.",{});
  }
]));

E("u4-87-radar",4,["PH11.8.7"],2,"var",varset([
  function(){
    return mcq("A police officer aims a radar unit from a parked car at a car approaching on the highway. The radar finds the car's speed from",
      "The shift in frequency of the reflected radio waves: the faster the car, the bigger the shift",
      ["The loudness of the reflected radio waves",
       "The time the radio waves take to bounce back, which gives the speed directly with no frequency change",
       "The colour of the car, which changes with speed"],
      "Radar is the light version of the Doppler effect. The reflected waves come back frequency shifted, and the size of the shift is set by the target's speed, which is how the unit computes it.",{});
  },
  function(){
    return mcq("A radar unit measures a frequency shift from a moving car. A second car passes at exactly twice the speed of the first, in the same direction. The frequency shift from the second car is",
      "About twice the shift from the first car, because the shift is proportional to the target's speed",
      ["About the same, because the shift does not depend on speed",
       "About four times the shift, because the shift grows with the square of the speed",
       "Zero, because only the first car reflects the radar"],
      "For radar the frequency shift is proportional to the target's speed. Double the speed and the shift doubles, which is what makes the radar reading a direct measure of speed.",{});
  },
  function(){
    return mcq("A parked police car uses radar on a second parked car. The reflected signal shows",
      "No frequency shift, because the target is not moving",
      ["The largest possible frequency shift",
       "A shift that depends only on the distance between the cars",
       "A shift because the radar waves themselves are moving"],
      "A Doppler shift needs motion of the source, the observer, or here the reflecting target. A stationary target reflects the waves back at the same frequency.",{});
  },
  function(){
    return mcq("Weather radar tracks a storm by bouncing radio waves off rain in the moving air. Information about how fast the rain is moving toward or away from the radar comes from",
      "The frequency shift of the reflected waves",
      ["The brightness of the reflected waves alone",
       "The temperature of the rain",
       "The time of day the radar is used"],
      "Moving rain shifts the frequency of the reflected radio waves by the Doppler-Fizeau effect. Reading the shift tells the radar how fast the rain is moving along the beam.",{});
  }
]));

E("u4-87-both",4,["PH11.8.7"],3,"gen",function(){
  var f0=sfR(rf(300,750),3);
  var vs=sfR(rf(8.00,30.0),3);
  var vo=sfR(rf(4.00,25.0),3);
  var num4=sfR(340+vo,4);
  var den4=sfR(340-vs,4);
  var ratio4=sfR(num4/den4,4);
  var fp4=sfR(f0*ratio4,4), ans=sfR(fp4,3);
  var sol="Both are moving toward each other, so both motions raise the observed frequency. The observer moving toward the source takes the plus sign in the numerator: 340 m/s + "+iF(vo)+" m/s = "+iF(num4)+" m/s. The source moving toward the observer subtracts in the denominator: 340 m/s - "+iF(vs)+" m/s = "+iF(den4)+" m/s. The ratio is "+iF(num4)+" m/s ÷ "+iF(den4)+" m/s = "+iF(ratio4)+". Then f' = "+iF(f0)+" Hz × "+iF(ratio4)+" = "+iF(fp4)+" Hz. The observed frequency is "+F3(ans)+" Hz.";
  return numq("A car horn sounds at "+gF(f0)+" Hz as the car travels at "+gF(vs)+" m/s toward a cyclist. The cyclist rides at "+gF(vo)+" m/s straight toward the car. Find the frequency the cyclist hears. Take the speed of sound in air as 340 m/s. Give your answer in Hz.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f0:f0,vs:vs,vo:vo});
});

/* ---------- 8.8 Refraction ---------- */

E("u4-88-bending",4,["PH11.8.8"],2,"var",varset([
  function(){
    return mcq("A light ray travels from air into water, striking the surface at an angle to the normal. In the water the ray",
      "Bends toward the normal, because light travels more slowly in water",
      ["Bends away from the normal, because light travels more slowly in water",
       "Continues perfectly straight, because bending needs a lens",
       "Bends toward the normal, because light travels faster in water"],
      "Water is a slower medium for light than air. Entering a slower medium, a ray bends toward the normal. The bending and the slowing go together.",{});
  },
  function(){
    return mcq("A light ray travels from glass back out into air at an angle to the normal. In the air the ray",
      "Bends away from the normal, because light travels faster in air",
      ["Bends toward the normal, because light travels faster in air",
       "Is always totally internally reflected",
       "Keeps the same angle, because the speed change does not affect direction"],
      "Entering a faster medium, a ray bends away from the normal. Light speeds up leaving glass for air, so the angle to the normal grows.",{});
  },
  function(){
    return mcq("A sound wave in air passes into a layer of warmer air where sound travels faster. The wave",
      "Bends away from the normal at the boundary, like any wave entering a faster medium",
      ["Bends toward the normal at the boundary",
       "Cannot bend, because bending is only for light",
       "Stops at the boundary"],
      "Refraction is a property of waves generally, not just light. Entering a medium where it travels faster, a wave bends away from the normal.",{});
  },
  function(){
    return mcq("A light wave crosses from air into glass. Which quantity stays exactly the same across the boundary?",
      "The frequency of the light",
      ["The wavelength of the light",
       "The speed of the light",
       "The direction of the light, whatever the angle"],
      "The frequency is set by the source and never changes across a boundary. In the slower medium the speed drops, so the wavelength must drop with it to keep v = f λ working.",{});
  },
  function(){
    return mcq("Light enters a block of plastic where its speed is lower than in air, hitting the surface head on, exactly along the normal. The light",
      "Slows down but does not bend, because it arrives along the normal",
      ["Bends strongly toward the normal",
       "Bends strongly away from the normal",
       "Speeds up but does not bend"],
      "Bending at a boundary happens only when the ray arrives at an angle. Along the normal there is no sideways change, so the ray slows but continues straight.",{});
  }
]));

E("u4-88-index",4,["PH11.8.8"],2,"gen",function(){
  var ctx=pick(["a transparent solid sample","a liquid sample in a lab beaker","a piece of clear plastic","a gemstone sample"]);
  var v8=sfR(rf(1.40,2.70),3);
  var n4=sfR(3.00/v8,4), ans=sfR(n4,3);
  var sol="The refractive index is n = c ÷ v, the speed of light in vacuum divided by the speed in the medium. Working in units of 10^8 m/s, c is 3.00 and the speed in the medium is "+gF(v8)+". 3.000 ÷ "+iF(v8)+" = "+iF(n4)+". The refractive index is "+F3(ans)+".";
  return numq("Light travels at "+gF(v8)+" × 10^8 m/s in "+ctx+". Find its refractive index. Give your answer as a decimal.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {v8:v8});
});

E("u4-88-speed-from-index",4,["PH11.8.8"],2,"gen",function(){
  var ctx=pick(["a transparent mineral","a type of glass","a clear liquid","a plastic used for lenses"]);
  var n=sfR(rf(1.15,2.45),3);
  var v4=sfR(3.00/n,4), ans=sfR(v4,3);
  var sol="From n = c ÷ v, the speed in the medium is v = c ÷ n. Working in units of 10^8 m/s, c is 3.00. 3.000 ÷ "+iF(n)+" = "+iF(v4)+". The speed of light in the material is "+F3(ans)+" × 10^8 m/s.";
  return numq("The refractive index of "+ctx+" is "+gF(n)+". Find the speed of light in the material. Give your answer in 10^8 m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {n:n});
});

E("u4-88-frequency-boundary",4,["PH11.8.8"],2,"gen",function(){
  var lam0=sfR(rf(400,700),3);
  var pair=pick([["glass",1.50],["water",1.33],["a clear plastic",1.46],["quartz",1.54],["ice",1.31]]);
  var lam=lam0/pair[1], ans=sfR(lam,3);
  var sol="Across a boundary the frequency never changes. The light slows in "+pair[0]+" by the factor n = "+gF(pair[1])+", and since v = f λ with f fixed, the wavelength shrinks by the same factor: λ = "+iF(lam0)+" nm ÷ "+iF(pair[1])+" = "+iF(sfR(lam,4))+" nm. The wavelength in "+pair[0]+" is "+F3(ans)+" nm.";
  return mcq("Light of wavelength "+gF(lam0)+" nm in air enters "+pair[0]+" (refractive index "+gF(pair[1])+"). What is the wavelength of the light inside "+pair[0]+"?",
    F3(ans)+" nm",
    [F3(sfR(lam0*pair[1],3))+" nm", F3(lam0)+" nm", F3(sfR(lam/(2),3))+" nm"],
    sol,{lam0:lam0,n:pair[1]});
});

E("u4-88-wavelength-medium",4,["PH11.8.8"],3,"gen",function(){
  var pair=pick([["glass",1.50],["water",1.33],["a clear plastic",1.46],["quartz",1.54],["flint glass",1.65]]);
  var f14=sfR(rf(4.00,7.50),3);
  var v4=sfR(3.00/pair[1],4);
  var q4=sfR(v4/f14,4);
  var ans=sfR(q4*1000,3);
  var sol="The frequency does not change in the medium, so first find the speed there: v = c ÷ n. Working in units of 10^8 m/s, 3.000 ÷ "+iF(pair[1])+" = "+iF(v4)+", so the speed in "+pair[0]+" is "+iF(v4)+" × 10^8 m/s. Then λ = v ÷ f. Dividing the scaled values, "+iF(v4)+" ÷ "+iF(f14)+" = "+iF(q4)+", and restoring the powers of ten in words (10^8 divided by 10^14 gives 10^-6 m, which is 1000 nm per unit) gives the wavelength "+F3(ans)+" nm.";
  return numq("Light of frequency "+gF(f14)+" × 10^14 Hz enters "+pair[0]+", which has a refractive index of "+gF(pair[1])+". Find the wavelength of the light in "+pair[0]+". Give your answer in nm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {f14:f14,n:pair[1]});
});

/* ---------- 8.9 Reflection and refraction applied ---------- */

E("u4-89-snell-angle",4,["PH11.8.9"],2,"gen",function(){
  var pair=pick([
    ["air",1.00,"water",1.33],["air",1.00,"crown glass",1.52],["water",1.33,"crown glass",1.52],["air",1.00,"a clear plastic",1.46]
  ]);
  var th1=sfR(rf(20.0,65.0),3);
  var s2=Math.sin(th1*Math.PI/180)*pair[1]/pair[3];
  var th2=Math.asin(s2)*180/Math.PI, ans=sfR(th2,3);
  var sol="Snell's law: n_1 sin θ_1 = n_2 sin θ_2, with angles measured from the normal. Substituting n_1 = "+gF(pair[1])+", θ_1 = "+gF(th1)+"° and n_2 = "+gF(pair[3])+" gives sin θ_2 = "+iF(sfR(s2,4))+". Taking the inverse sine gives θ_2 = "+F3(ans)+"°. The ray bends toward the normal, as it should entering the slower medium.";
  var q=numq("A light ray travelling in "+pair[0]+" (n = "+gF(pair[1])+") strikes the boundary with "+pair[2]+" (n = "+gF(pair[3])+") at "+gF(th1)+"° from the normal. Find the angle of refraction in "+pair[2]+". Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {th1:th1});
    q.figure=p22Refract(pair[0],pair[2],gF(th1)+"\u00B0",th1,"?",th2);return q;
});

E("u4-89-critical",4,["PH11.8.9"],2,"gen",function(){
  var ctx=pick(["at a harbour light testing a new lens material","in a lab sample being checked for fibre optic use","in a block of material for a headlight lens","in a transparent sample on an optics bench"]);
  var n1=sfR(rf(1.35,2.40),3);
  var ratio=n1>0?1.00/n1:0;
  var thc=Math.asin(ratio)*180/Math.PI, ans=sfR(thc,3);
  var sol="The critical angle is found from sin θ_c = n_2 ÷ n_1, and it only exists going from the higher index material toward the lower one, here air with n_2 = 1.00. That gives sin θ_c = "+iF(sfR(ratio,4))+". Taking the inverse sine gives θ_c = "+F3(ans)+"°. Above this angle, light striking the boundary from inside is totally internally reflected.";
  return numq("Light inside a material of refractive index "+gF(n1)+" "+ctx+" reaches a boundary with air (n = 1.00). Find the critical angle. Give your answer in degrees.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {n1:n1});
});

E("u4-89-snell-cr",4,["PH11.8.9"],3,"gen",function(){
  var lam1=pick([405,436,470,505,546,589,630]);
  var th1=pick([40,45,50,55]);
  var th2=th1-ri(8,18);
  var n1=1.33;
  var n2=n1*Math.sin(th1*Math.PI/180)/Math.sin(th2*Math.PI/180);
  var n2_4=sfR(n2,4);
  var prod4=sfR(lam1*n1,4);
  var lam2_4=sfR(prod4/n2_4,4), ans=sfR(lam2_4,3);
  var sol="First use Snell's law to get the unknown index: n_2 = n_1 sin θ_1 ÷ sin θ_2, with the angles measured from the normal. Substituting n_1 = 1.33, θ_1 = "+th1+"° and θ_2 = "+th2+"° gives n_2 = "+iF(n2_4)+". The frequency is unchanged across the boundary, so the wavelength scales with the speed, which scales as 1 ÷ n: λ_2 = λ_1 n_1 ÷ n_2. First, "+iF(lam1)+" nm × "+iF(n1)+" = "+iF(prod4)+" nm. Then "+iF(prod4)+" nm ÷ "+iF(n2_4)+" = "+iF(lam2_4)+" nm. The wavelength in the solid is "+F3(ans)+" nm.";
  var q=numq("Light of wavelength "+lam1+" nm in water (n = 1.33) strikes the boundary with a transparent solid at "+th1+"° from the normal and refracts at "+th2+"° from the normal. Find the wavelength of the light in the solid. Give your answer in nm.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {lam1:lam1,th1:th1,th2:th2});
    q.figure=p22Refract("water","transparent solid",th1+"\u00B0",th1,th2+"\u00B0",th2);return q;
});

E("u4-89-tir",4,["PH11.8.9"],3,"var",varset([
  function(){
    return mcq("Light inside glass (n = 1.50) strikes a glass to air boundary at 50° from the normal. The critical angle for glass to air is about 42°. What happens?",
      "The light is totally internally reflected, because it is travelling toward the lower index medium above the critical angle",
      ["The light refracts out into the air at a smaller angle",
       "The light refracts out into the air at a larger angle",
       "The light is absorbed at the boundary"],
      "Total internal reflection needs two conditions, and both hold: the light travels from higher n toward lower n, and its angle from the normal (50°) exceeds the critical angle (about 42°). So none of it refracts out.",{});
  },
  function(){
    return mcq("Light inside glass (n = 1.50) strikes a glass to air boundary at 30° from the normal. The critical angle is about 42°. What happens?",
      "The light refracts out into the air, bending away from the normal, because 30° is below the critical angle",
      ["The light is totally internally reflected, because it is inside glass",
       "The light travels straight out with no bending",
       "The light is totally internally reflected, because 30° is above the critical angle"],
      "Total internal reflection only happens above the critical angle. At 30°, below about 42°, the ray crosses into the air and bends away from the normal as it speeds up.",{});
  },
  function(){
    return mcq("A student tries to get total internal reflection with light travelling from air into water, using a very steep angle of incidence. The attempt must fail because",
      "Total internal reflection can only happen travelling from a higher index medium toward a lower index one, and air to water is the wrong way",
      ["The angle is too steep; a shallower angle would work",
       "Water absorbs all the light at steep angles",
       "Total internal reflection only works in glass"],
      "Going from air (n = 1.00) into water (n = 1.33), the ray bends toward the normal and always has a refracted ray. Total internal reflection is only possible from the higher n side toward the lower n side.",{});
  },
  function(){
    var n=pick([1.40,1.46,1.52,1.60]);
    var thc=Math.asin(1/n)*180/Math.PI;
    var ang=Math.round(thc)+ri(6,12);
    return mcq("Light inside a material of refractive index "+gF(n)+" strikes a boundary with air at "+ang+"° from the normal. The critical angle for this material to air is about "+Math.round(thc)+"°. Judging the situation, the light",
      "Undergoes total internal reflection, because it travels toward the lower index medium at an angle above the critical angle",
      ["Refracts into the air, because every ray partly refracts",
       "Refracts into the air bending toward the normal",
       "Passes straight through without bending"],
      "Both conditions for total internal reflection are met: the light is on the higher index side heading toward air, and "+ang+"° is above the critical angle of about "+Math.round(thc)+"°. The light reflects entirely back inside.",{n:n});
  },
  function(){
    return mcq("Fibre optic cables carry light signals over long distances with very little loss. They work because the light inside the fibre",
      "Keeps undergoing total internal reflection at the fibre walls, staying inside the fibre",
      ["Is refracted out and back in at each bend",
       "Travels in a perfectly straight line regardless of bends",
       "Is carried by electric current in the glass"],
      "The light inside the fibre strikes the walls from the higher index side at angles above the critical angle, so it totally internally reflects again and again and stays trapped in the fibre.",{});
  }
]));

E("u4-89-claim-index",4,["PH11.8.9"],3,"gen",function(){
  var th1=sfR(rf(35.0,60.0),3);
  var th2=sfR(th1-rf(8.0,20.0),3);
  var n1=1.00;
  var n2=Math.sin(th1*Math.PI/180)/Math.sin(th2*Math.PI/180), ans=sfR(n2,3);
  var claim=sfR(Math.sin(th2*Math.PI/180)/Math.sin(th1*Math.PI/180),3);
  var sol="The claim used the sine ratio upside down. Snell's law gives n_2 = n_1 sin θ_1 ÷ sin θ_2, with the angles measured from the normal. With n_1 = 1.00, θ_1 = "+gF(th1)+"° and θ_2 = "+gF(th2)+"°, the sines give sin θ_1 = "+iF(sfR(Math.sin(th1*Math.PI/180),4))+" and sin θ_2 = "+iF(sfR(Math.sin(th2*Math.PI/180),4))+", so n_2 = "+F3(ans)+". Because the ray bent toward the normal, the second medium must have the higher index, which the claimed value "+gF(claim)+" gets backwards.";
  var q=numq("A student measures a ray going from air (n = 1.00) into an unknown solid: the angle of incidence is "+gF(th1)+"° from the normal and the angle of refraction is "+gF(th2)+"° from the normal. The student claims the refractive index of the solid is "+gF(claim)+". Find the correct refractive index of the solid. Give your answer as a decimal.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {th1:th1,th2:th2});
    q.figure=p22Refract("air","unknown solid",gF(th1)+"\u00B0",th1,gF(th2)+"\u00B0",th2);return q;
});

E("u4-89-angle-to-speed",4,["PH11.8.9"],3,"gen",function(){
  var v1=sfR(rf(2.80,3.00),3);
  var th1=sfR(rf(38.0,62.0),3);
  var th2=sfR(th1-rf(9.0,20.0),3);
  var ratio4=sfR(Math.sin(th2*Math.PI/180)/Math.sin(th1*Math.PI/180),4);
  var v2_4=sfR(v1*ratio4,4), ans=sfR(v2_4,3);
  var sol="Snell's law can be written with speeds: when a ray bends toward the normal it has slowed down, and v_2 ÷ v_1 = sin θ_2 ÷ sin θ_1. The sines give sin θ_2 = "+iF(sfR(Math.sin(th2*Math.PI/180),4))+" and sin θ_1 = "+iF(sfR(Math.sin(th1*Math.PI/180),4))+", so the speed ratio is "+iF(ratio4)+". Then, working in units of 10^8 m/s, v_2 = "+iF(v1)+" × "+iF(ratio4)+" = "+iF(v2_4)+". The speed in the second medium is "+F3(ans)+" × 10^8 m/s.";
  var q=numq("A light ray travels at "+gF(v1)+" × 10^8 m/s in a first medium. It strikes a boundary at "+gF(th1)+"° from the normal and refracts at "+gF(th2)+"° from the normal in a second medium. Find the speed of the light in the second medium. Give your answer in 10^8 m/s.",
    ans, Math.max(0.02*Math.abs(ans),1e-9), sol, {v1:v1,th1:th1,th2:th2});
    q.figure=p22Refract("first medium","second medium",gF(th1)+"\u00B0",th1,gF(th2)+"\u00B0",th2);return q;
});
