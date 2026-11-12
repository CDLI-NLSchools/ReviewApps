// Diagram figures (Phase C, Nov 2026): entries whose source question type
// carried a diagram now set qq3204.figure from the draw's own values via the
// p32fig* helpers in bank-helpers.js. Asked unknowns are labelled "?".
// Physics 3204 Unit 4 Introduction to Quantum Physics question bank
// CRMARKS: u4-82-photoelectric-cr=4
// CRMARKS: u4-82-threshold-cr=3
// CRMARKS: u4-85-transition-cr=5
// CRMARKS: u4-85-absorption-cr=2
// CRMARKS: u4-88-accelerating-cr=3
// CRMARKS: u4-83-compton-cr=3

/* ============ Units and significant figures discipline (Nov 2026) ============
   Givens are fixed at 3 significant figures and printed with gF(). Answers
   are computed from the printed givens and stored at 3 significant figures.
   Intermediates print at 4 significant figures with iF() and the next step
   is computed from the printed intermediate. Steps involving very small or
   very large values are described in words; only the final result prints,
   with F3(), in the house 10^n style. Exact counts (shell numbers, shell
   capacities) are exempt from the 3 sf rule. Bohr level energies for
   hydrogen use E_n = -13.6 eV / n^2, held at 3 sf in bohrE() below so that
   every printed line reproduces from printed values. */
function bohrE(n){return sfR(-13.6/(n*n),3);}
var PH4CTX=["in a hydrogen discharge tube in the school lab","in a low-pressure hydrogen lamp","in the atmosphere of a distant star","in a hydrogen spectrum tube","in hydrogen gas inside a nebula","in a hydrogen-filled display tube","in a university spectroscopy lab","in the outer layers of a hot star"];

/* ---------- PH12.8.1 Quantum energy ---------- */

E("u4-81-energy-from-frequency",4,["PH12.8.1"],2,"gen",function(){
  var f=sfR(rf(3.20,9.50),3)*1e14;
  var E=PHYS_H*f;
  var ans=sfR(E,3);
  return numq("A photon of light has a frequency of "+gF(f)+" Hz. Calculate the energy of the photon. Give your answer in joules (J).",
    ans,Math.max(0.02*Math.abs(ans),1e-21),
    "The energy of a photon is given by E = hf, where h is the Planck constant, 6.63 \u00D7 10\u207B\u00B3\u2074 J s. Multiplying h by the frequency gives the photon energy in joules. E = "+F3(E)+" J. Dividing by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV, this is "+F3(E/PHYS_E)+" eV.",
    {f:f});
});

E("u4-81-energy-from-wavelength",4,["PH12.8.1"],2,"gen",function(){
  var lam=sfR(rf(380,720),3);
  var E=PHYS_H*PHYS_C/(lam*1e-9);
  return mcq("A photon has a wavelength of "+gF(lam)+" nm. What is the energy of the photon?",
    F3(E)+" J",
    [F3(2*E)+" J",F3(E/2)+" J",F3(PHYS_H*(lam*1e-9))+" J"],
    "The energy of a photon is E = hc / \u03BB. Convert the wavelength to metres first, then divide hc by it. The energy is "+F3(E)+" J. Doubling or halving the wavelength would halve or double the energy, and multiplying h by \u03BB instead of dividing hc by \u03BB gives a far smaller value, so those options are wrong.",
    {lam:lam});
});

E("u4-81-wavelength-from-energy",4,["PH12.8.1"],2,"gen",function(){
  var eV=sfR(rf(1.80,4.20),3);
  var EJ=eV*PHYS_E;
  var lam=PHYS_H*PHYS_C/EJ/1e-9;
  var ans=sfR(lam,3);
  return numq("A photon has an energy of "+gF(eV)+" eV. Calculate its wavelength. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "First convert the energy to joules: multiplying by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV gives "+F3(EJ)+" J. Then use \u03BB = hc / E, dividing hc by this energy to get the wavelength in metres, which converts to nanometres. \u03BB = "+F3(lam)+" nm.",
    {eV:eV});
});

E("u4-81-order-photons",4,["PH12.8.1"],1,"var",varset([
  function(){
    return mcq("Which colour of visible light is made of the most energetic photons?",
      "Violet",
      ["Red","Orange","Green"],
      "Photon energy increases with frequency. Violet light has the highest frequency of the visible colours, so violet photons carry the most energy.",{});
  },
  function(){
    return mcq("Which colour of visible light is made of the least energetic photons?",
      "Red",
      ["Blue","Green","Yellow"],
      "Photon energy increases with frequency and red light has the lowest frequency of the visible colours, so red photons carry the least energy.",{});
  },
  function(){
    return mcq("Four photons have wavelengths of 650 nm, 580 nm, 510 nm and 420 nm. Which photon has the greatest energy?",
      "420 nm",
      ["650 nm","580 nm","510 nm"],
      "Photon energy is inversely proportional to wavelength, E = hc / \u03BB. The shortest wavelength, 420 nm, belongs to the photon with the greatest energy.",{});
  },
  function(){
    return mcq("A photon of blue light and a photon of red light are compared. The blue photon has",
      "More energy and a higher frequency",
      ["More energy and a lower frequency","Less energy and a higher frequency","The same energy, because both are photons of light"],
      "Blue light has a higher frequency and a shorter wavelength than red light. Since E = hf, the blue photon carries more energy.",{});
  }
]));

E("u4-81-joules-to-ev",4,["PH12.8.1"],1,"gen",function(){
  var EJ=sfR(rf(2.40,9.60),3)*1e-19;
  var eV=EJ/PHYS_E;
  return mcq("The energy of a photon is "+gF(EJ)+" J. Given that 1 eV = 1.60 \u00D7 10\u207B\u00B9\u2079 J, what is this energy in electron volts?",
    F3(eV)+" eV",
    [F3(eV*10)+" eV",F3(eV/10)+" eV",F3(EJ*PHYS_E)+" eV"],
    "To convert joules to electron volts, divide by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV. The energy is "+F3(eV)+" eV. Multiplying instead of dividing would give a value near 10\u207B\u00B3\u2077 eV, which is not sensible for a single photon of light.",
    {EJ:EJ});
});

/* ---------- PH12.8.2 Photoelectric effect ---------- */

E("u4-82-work-function",4,["PH12.8.2"],2,"gen",function(){
  var lam0=sfR(rf(470,690),3);
  var phiJ=PHYS_H*PHYS_C/(lam0*1e-9);
  var phi=phiJ/PHYS_E;
  var ans=sfR(phi,3);
  var qq3204 = numq("The threshold wavelength of a metal surface is "+gF(lam0)+" nm. Calculate the work function of the metal. Give your answer in electron volts (eV).",
    ans,Math.max(0.02*Math.abs(ans),0.001),
    "The work function equals the energy of a photon at the threshold wavelength, \u03C6 = hc / \u03BB\u2080. Dividing hc by the threshold wavelength gives "+F3(phiJ)+" J, and dividing by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV converts this to electron volts. \u03C6 = "+F3(phi)+" eV.",
    {lam0:lam0}); qq3204.figure = p32figPhoto("threshold "+gF(lam0)+" nm","work function ?",false); return qq3204;
});

E("u4-82-max-ke",4,["PH12.8.2"],2,"gen",function(){
  var lam=sfR(rf(300,520),3);
  var E=PHYS_H*PHYS_C/(lam*1e-9)/PHYS_E;
  var Ep=sfR(E,3);
  var phi=sfR(E*rf(0.45,0.72),3);
  var ke=Ep-phi;
  var qq3204 = mcq("Light of wavelength "+gF(lam)+" nm shines on a metal whose work function is "+gF(phi)+" eV. What is the maximum kinetic energy of the emitted electrons?",
    F3(ke)+" eV",
    [F3(Ep+phi)+" eV",F3(Ep)+" eV",F3(Ep-phi/2)+" eV"],
    "The photon energy is E = hc / \u03BB, which is "+F3(Ep)+" eV once the joules are divided by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV. Each electron must spend the work function escaping, so the maximum kinetic energy is "+gF(Ep)+" - "+gF(phi)+" = "+F3(ke)+" eV.",
    {lam:lam,phi:phi}); qq3204.figure = p32figPhoto(gF(lam)+" nm","work function "+gF(phi)+" eV",true); return qq3204;
});

E("u4-82-stopping-potential",4,["PH12.8.2"],2,"gen",function(){
  var lam=sfR(rf(320,480),3);
  var E=PHYS_H*PHYS_C/(lam*1e-9)/PHYS_E;
  var Ep=sfR(E,3);
  var phi=sfR(E*rf(0.40,0.70),3);
  var ke=Ep-phi;
  var ans=sfR(ke,3);
  var qq3204 = numq("Light of wavelength "+gF(lam)+" nm shines on a metal whose work function is "+gF(phi)+" eV. What stopping potential is needed to halt the most energetic emitted electrons? Give your answer in volts (V).",
    ans,Math.max(0.02*Math.abs(ans),0.001),
    "The photon energy is E = hc / \u03BB = "+F3(Ep)+" eV. The maximum kinetic energy of the electrons is "+gF(Ep)+" - "+gF(phi)+" = "+F3(ke)+" eV. A stopping potential of V volts removes V eV of energy from each electron, so the stopping potential in volts has the same value as the maximum kinetic energy in electron volts. V = "+F3(ke)+" V.",
    {lam:lam,phi:phi}); qq3204.figure = p32figPhoto(gF(lam)+" nm","work function "+gF(phi)+" eV",true); return qq3204;
});

E("u4-82-threshold-frequency",4,["PH12.8.2"],2,"gen",function(){
  var phi=sfR(rf(1.90,4.60),3);
  var f0=phi*PHYS_E/PHYS_H;
  var ans=sfR(f0,3);
  return numq("A metal has a work function of "+gF(phi)+" eV. Calculate the threshold frequency of the metal. Give your answer in hertz (Hz).",
    ans,Math.max(0.02*Math.abs(ans),1e12),
    "At the threshold frequency the photon energy exactly equals the work function, so f\u2080 = \u03C6 / h. First convert the work function to joules by multiplying by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV, then divide by the Planck constant. f\u2080 = "+F3(f0)+" Hz. Light below this frequency cannot eject electrons from this metal, however bright it is.",
    {phi:phi});
});

E("u4-82-intensity-frequency",4,["PH12.8.2"],2,"var",varset([
  function(){
    return mcq("Light above the threshold frequency shines on a metal. The light is made twice as intense while its frequency is unchanged. What happens?",
      "Twice as many electrons are emitted each second, but their maximum kinetic energy is unchanged",
      ["Twice as many electrons are emitted each second, and their maximum kinetic energy doubles",
       "The same number of electrons is emitted, each with twice the kinetic energy",
       "Emission stops, because the electrons cannot absorb energy that fast"],
      "Intensity counts how many photons arrive each second. Each photon still frees one electron with the same maximum kinetic energy, set by the frequency, so doubling the intensity doubles the emission rate but not the electron energies.",{});
  },
  function(){
    return mcq("Light above the threshold frequency shines on a metal. The light is replaced by light of a higher frequency, with the same number of photons arriving each second. What happens?",
      "The same number of electrons is emitted each second, but each electron can leave with more kinetic energy",
      ["More electrons are emitted each second, each with the same kinetic energy",
       "Fewer electrons are emitted, because higher frequency light is weaker",
       "Nothing changes, because only intensity affects the photoelectric effect"],
      "Each electron is freed by a single photon, and a higher frequency photon carries more energy, E = hf. With the same photon supply the emission rate is unchanged, but the extra photon energy beyond the work function appears as kinetic energy.",{});
  },
  function(){
    return mcq("Red light, which is below the threshold frequency of a metal, is shone on the metal and then made three times as intense. What happens?",
      "No electrons are emitted, no matter how intense the light becomes",
      ["Electrons are emitted once the light is intense enough",
       "Electrons are emitted, but only after the light has shone for a long time",
       "A few electrons are emitted with very small kinetic energies"],
      "Each red photon carries less energy than the work function, and one electron absorbs one photon. Adding more photons does not add up: no electron ever collects enough energy to escape.",{});
  },
  function(){
    return mcq("Very dim ultraviolet light, well above the threshold frequency, shines on a metal. The emitted electrons",
      "Appear immediately, few each second, but with the full maximum kinetic energy for that frequency",
      ["Appear only after enough light energy has built up on the surface",
       "Appear immediately, but with very small kinetic energies because the light is dim",
       "Do not appear, because the light is too dim to free any electrons"],
      "Dim light means few photons, so few electrons are freed each second. But each freeing is a one-photon event, and that photon carries the full energy hf, so the electrons that do escape have the full maximum kinetic energy and appear at once.",{});
  }
]));

E("u4-82-photoelectric-cr",4,["PH12.8.2"],2,"gen",function(){
  var lam=sfR(rf(350,500),3);
  var EJ=PHYS_H*PHYS_C/(lam*1e-9);
  var Ep=sfR(EJ/PHYS_E,3);
  var phi=sfR((EJ/PHYS_E)*rf(0.55,0.80),3);
  var ke=Ep-phi;
  var ans=sfR(ke,3);
  var qq3204 = numq("Ultraviolet light of wavelength "+gF(lam)+" nm falls on a metal surface whose work function is "+gF(phi)+" eV, and electrons are emitted. Calculate the stopping potential that would halt the most energetic of these electrons. Give your answer in volts (V).",
    ans,Math.max(0.02*Math.abs(ans),0.001),
    "Step 1: photon energy. E = hc / \u03BB gives "+F3(EJ)+" J. Step 2: convert to electron volts by dividing by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV: E = "+F3(Ep)+" eV. Step 3: the most energetic electron keeps whatever photon energy is left after paying the work function: "+gF(Ep)+" - "+gF(phi)+" = "+F3(ke)+" eV. Step 4: a stopping potential of V volts removes V eV from each electron, so the stopping potential is "+F3(ke)+" V.",
    {lam:lam,phi:phi}); qq3204.figure = p32figPhoto(gF(lam)+" nm","work function "+gF(phi)+" eV",true); return qq3204;
});

E("u4-82-threshold-cr",4,["PH12.8.2"],3,"gen",function(){
  var phi=sfR(rf(2.00,3.40),3);
  var lam0=PHYS_H*PHYS_C/(phi*PHYS_E)/1e-9;
  var lamA=sfR(lam0*rf(0.75,0.90),3);
  var lamB=sfR(lam0*rf(1.10,1.30),3);
  var ans=sfR(lam0,3);
  var qq3204 = numq("A metal has a work function of "+gF(phi)+" eV. A technician tests two lamps on it: lamp A, emitting light of wavelength "+gF(lamA)+" nm, and lamp B, emitting light of wavelength "+gF(lamB)+" nm. Only one of the lamps produces a photocurrent. Calculate the threshold wavelength of the metal. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "At the threshold wavelength the photon energy exactly equals the work function, so \u03BB\u2080 = hc / \u03C6, with \u03C6 first converted to joules. This gives \u03BB\u2080 = "+F3(lam0)+" nm. Lamp A emits at "+gF(lamA)+" nm, which is shorter than the threshold wavelength, so its photons carry more than the work function and it produces the photocurrent. Lamp B emits at "+gF(lamB)+" nm, longer than the threshold wavelength, so its photons cannot free electrons at any intensity.",
    {phi:phi}); qq3204.figure = p32figPhoto("lamp A "+gF(lamA)+" nm, lamp B "+gF(lamB)+" nm","threshold wavelength ?",false); return qq3204;
});

/* ---------- PH12.8.3 Compton effect ---------- */

E("u4-83-what-it-showed",4,["PH12.8.3"],1,"var",varset([
  function(){
    return mcq("Compton directed X-rays at a carbon target and found that the scattered X-rays had a longer wavelength than the incoming X-rays. This result showed that",
      "Photons carry momentum and can transfer it to electrons in collisions",
      ["X-rays are slowed down by passing through carbon",
       "Electrons inside atoms are in constant rapid motion",
       "Wavelength has no connection to energy"],
      "The wavelength increase is exactly what a particle collision predicts: the photon gives some of its energy and momentum to an electron and leaves with less energy, which means a longer wavelength. Compton scattering showed that photons carry momentum.",{});
  },
  function(){
    return mcq("In Compton's experiment, a scattered X-ray photon is compared with the incoming photon. The scattered photon has",
      "Less energy and a longer wavelength",
      ["More energy and a longer wavelength","Less energy and a shorter wavelength","Exactly the same energy and wavelength"],
      "The photon hands part of its energy to the recoil electron. A less energetic photon has a lower frequency and a longer wavelength, since E = hc / \u03BB.",{});
  },
  function(){
    return mcq("Classical wave theory predicted that scattered X-rays should keep essentially the same wavelength. The observed increase in wavelength is explained if",
      "The X-ray photon collides with a single electron like a particle, giving up some of its energy and momentum",
      ["The target heats up and stretches the waves as they leave",
       "The X-rays travel more slowly inside the target and bunch up",
       "The electrons reflect the waves in all directions at random speeds"],
      "Treating the encounter as a collision between one photon and one electron, with energy and momentum conserved, predicts the wavelength shift that Compton measured. The wave picture, in which the electron should simply reradiate at the same wavelength, does not.",{});
  },
  function(){
    return mcq("In Compton scattering, the recoil electron gains kinetic energy. That energy comes from",
      "The photon, which loses an equal amount of energy",
      ["The electric field of the nucleus","The motion the electron already had","The target material heating up"],
      "Energy is conserved in the collision. Whatever kinetic energy the electron gains is energy the photon no longer has, which is why the scattered photon's wavelength increases.",{});
  }
]));

E("u4-83-photon-momentum",4,["PH12.8.3"],2,"gen",function(){
  var lam=sfR(rf(0.0200,0.120),3);
  var p=PHYS_H/(lam*1e-9);
  var ans=sfR(p,3);
  return numq("An X-ray photon has a wavelength of "+gF(lam)+" nm. Calculate the magnitude of its momentum. Give your answer in kg m/s.",
    ans,Math.max(0.02*Math.abs(ans),1e-26),
    "A photon's momentum is p = h / \u03BB. Converting the wavelength to metres and dividing the Planck constant by it gives the momentum. p = "+F3(p)+" kg m/s. It is tiny for one photon, but it is real, and it is what the recoil electron carries away in Compton scattering.",
    {lam:lam});
});

E("u4-83-scattered-wavelength",4,["PH12.8.3"],2,"gen",function(){
  var lam=sfR(rf(0.0400,0.120),3);
  var ang=pick([60,90,120,180]);
  var cosv={60:0.5,90:0,120:-0.5,180:-1}[ang];
  var dl=sfR(0.00243*(1-cosv),4);
  var lamp=lam+dl;
  var ans=sfR(lamp,3);
  var qq3204 = numq("An X-ray photon of wavelength "+gF(lam)+" nm strikes a nearly free electron and is scattered through an angle of "+ang+"\u00B0. For scattering through an angle \u03B8, the wavelength increase is (0.00243 nm)(1 - cos \u03B8). Calculate the wavelength of the scattered photon. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.00005),
    "First find the shift. cos "+ang+"\u00B0 = "+fmt(cosv,1)+", so 1 - cos \u03B8 = "+fmt(1-cosv,1)+". Multiplying by 0.00243 nm gives a wavelength increase of "+iF(dl)+" nm. Adding the increase to the incoming wavelength: "+gF(lam)+" + "+iF(dl)+" = "+iF(lamp)+" nm, which is "+F3(lamp)+" nm at three significant figures.",
    {lam:lam,ang:ang}); qq3204.figure = p32figCompton(gF(lam)+" nm",ang); return qq3204;
});

E("u4-83-shift-reasoning",4,["PH12.8.3"],2,"var",varset([
  function(){
    return mcq("When an X-ray photon scatters from a stationary electron, its wavelength increases. The reason is that",
      "The photon gives some of its energy to the electron, and a less energetic photon has a longer wavelength",
      ["The photon is stretched by travelling through the target material",
       "The electron adds energy to the photon as it recoils",
       "Scattering always bends light toward longer wavelengths, like a prism"],
      "The photon pays for the electron's recoil kinetic energy out of its own energy. Since E = hc / \u03BB, a smaller energy means a larger wavelength.",{});
  },
  function(){
    return mcq("After Compton scattering from an electron, the photon's frequency is",
      "Lower than the incident frequency, because the photon lost energy",
      ["Higher than the incident frequency, because the photon lost energy",
       "Unchanged, because frequency never changes in scattering",
       "Lower than the incident frequency, because the photon gained energy"],
      "The photon gives energy to the electron, and E = hf links energy directly to frequency. Less energy means a lower frequency (and a longer wavelength).",{});
  },
  function(){
    return mcq("After Compton scattering from an electron, the magnitude of the photon's momentum is",
      "Smaller than before, because its wavelength increased and momentum is inversely proportional to wavelength",
      ["Larger than before, because its wavelength increased",
       "Unchanged, because a photon's momentum never changes",
       "Zero, because the electron took all of it"],
      "Photon momentum is p = h / \u03BB. The wavelength grows in the collision, so the momentum shrinks. The missing momentum is carried away by the recoil electron.",{});
  },
  function(){
    return mcq("In Compton scattering, which statement about the collision is correct?",
      "The kinetic energy gained by the electron equals the energy lost by the photon",
      ["The electron gains energy without the photon losing any",
       "The photon gains energy and the electron slows down",
       "Total energy increases slightly because the collision is violent"],
      "The collision conserves energy: the photon's loss is the electron's gain. That bookkeeping is exactly the particle picture of the event.",{});
  }
]));

/* ---------- PH12.8.4 Bohr model, qualitative ---------- */

E("u4-84-model-descriptions",4,["PH12.8.4"],1,"var",varset([
  function(){
    return mcq("In this description, electrons move in certain allowed circular orbits around the nucleus and give off a photon only when they jump to a lower orbit. The description belongs to",
      "The Bohr model",
      ["The de Broglie standing-wave picture","The quantum mechanical orbital model","The Thomson plum pudding model"],
      "Fixed allowed orbits with jumps between them, and photons emitted during the jumps, are the heart of Bohr's 1913 model of the atom.",{});
  },
  function(){
    return mcq("In this description, the electron behaves as a standing wave wrapped around the nucleus, and only orbits whose circumference fits a whole number of wavelengths can exist. The description belongs to",
      "The de Broglie standing-wave picture",
      ["The Bohr model","The quantum mechanical orbital model","The Rutherford nuclear model"],
      "De Broglie proposed that the electron is a wave, and an orbit survives only if the wave joins up with itself around the circle, a whole number of wavelengths per lap.",{});
  },
  function(){
    return mcq("In this description, electrons are not assigned exact paths at all. Instead, orbitals describe regions of space where an electron is likely to be found. The description belongs to",
      "The quantum mechanical orbital model",
      ["The Bohr model","The de Broglie standing-wave picture","The Thomson plum pudding model"],
      "Probability regions called orbitals, rather than definite orbits, are the picture given by the full quantum mechanical model of the atom.",{});
  },
  function(){
    return mcq("In this description, the atom has a tiny, dense, positively charged nucleus with electrons around it, but the model offers no reason why atoms are stable or why their spectra contain only certain lines. The description belongs to",
      "The Rutherford nuclear model",
      ["The Bohr model","The quantum mechanical orbital model","The de Broglie standing-wave picture"],
      "Rutherford's scattering results put the charge and mass in a small nucleus, but his model could not explain atomic stability or line spectra. Bohr's model was built to answer exactly those failures.",{});
  }
]));

E("u4-84-shell-capacity",4,["PH12.8.4"],1,"var",varset([
  function(){
    return mcq("What is the maximum number of electrons that can occupy the first shell (n = 1) of an atom?",
      "2",
      ["1","8","18"],
      "The maximum number of electrons in shell n is 2n\u00B2. For n = 1 this is 2 \u00D7 1 = 2 electrons.",{});
  },
  function(){
    return mcq("What is the maximum number of electrons that can occupy the second shell (n = 2) of an atom?",
      "8",
      ["2","4","18"],
      "The maximum number of electrons in shell n is 2n\u00B2. For n = 2 this is 2 \u00D7 4 = 8 electrons.",{});
  },
  function(){
    return mcq("What is the maximum number of electrons that can occupy the third shell (n = 3) of an atom?",
      "18",
      ["6","9","32"],
      "The maximum number of electrons in shell n is 2n\u00B2. For n = 3 this is 2 \u00D7 9 = 18 electrons.",{});
  },
  function(){
    return mcq("What is the maximum number of electrons that can occupy the fourth shell (n = 4) of an atom?",
      "32",
      ["8","16","50"],
      "The maximum number of electrons in shell n is 2n\u00B2. For n = 4 this is 2 \u00D7 16 = 32 electrons.",{});
  }
]));

E("u4-84-bohr-accounts",4,["PH12.8.4"],2,"var",varset([
  function(){
    return mcq("A hydrogen atom emits light only at certain specific wavelengths, never at wavelengths in between. In Bohr's model, this is because",
      "Electrons can only occupy certain energy levels, so they can only lose specific amounts of energy, and each amount produces a photon of a specific wavelength",
      ["The nucleus only vibrates at certain frequencies, and the light copies them",
       "The electrons orbit at many speeds and average out to a few wavelengths",
       "The gas in the tube filters out all the other wavelengths"],
      "Only certain electron energies are allowed, so only certain energy differences exist. Each difference becomes one photon with E = hf, giving a discrete set of wavelengths: a line spectrum.",{});
  },
  function(){
    return mcq("An electron circling a nucleus is accelerating, and classical theory says it should radiate energy and spiral inward. In Bohr's model, the atom is stable because",
      "Bohr proposed that electrons in allowed orbits simply do not radiate; radiation happens only during a jump between orbits",
      ["The nucleus pulls the electron back outward whenever it loses energy",
       "The electron moves so fast that radiation cannot escape",
       "Electrons in atoms do not actually move"],
      "Bohr built the stability in as a postulate: an electron in one of the allowed orbits does not radiate, however classical theory protests. Radiation is emitted or absorbed only when the electron changes orbits.",{});
  },
  function(){
    return mcq("A hydrogen electron drops from the third energy level to the second. The atom",
      "Emits one photon whose energy equals the difference between the two levels",
      ["Absorbs one photon whose energy equals the difference between the two levels",
       "Emits two photons, one for each level it passes",
       "Loses the energy gradually as heat while it spirals down"],
      "In Bohr's model the jump is direct, and the energy difference leaves as a single photon with E equal to the level difference. Dropping down is emission; climbing up would be absorption.",{});
  },
  function(){
    return mcq("For a hydrogen electron to jump from a lower energy level to a higher one, the atom must",
      "Absorb exactly the energy difference between the levels, for example from an incoming photon of that energy",
      ["Be heated until the electron melts free of its orbit",
       "Absorb any amount of energy greater than the difference; the extra is kept as motion",
       "Emit a photon to make room for the jump"],
      "Absorption is the reverse of emission and just as picky: the incoming photon must carry exactly the difference between the two levels. A photon with the wrong energy is not absorbed in this way.",{});
  }
]));

E("u4-84-debroglie-orbits",4,["PH12.8.4"],2,"var",varset([
  function(){
    var qq3204 = mcq("De Broglie suggested that Bohr's allowed orbits are the ones where the electron wave fits neatly around the nucleus. The condition for an orbit to be allowed is that",
      "The circumference of the orbit equals a whole number of electron wavelengths, so the wave joins up with itself in phase",
      ["The circumference of the orbit equals exactly one electron wavelength for every orbit",
       "The electron completes the orbit in a whole number of seconds",
       "The wavelength of the electron equals the radius of the orbit"],
      "If the wave meets itself in phase after one lap, it reinforces and survives as a standing wave. That requires the circumference to be a whole number of wavelengths: 1, 2, 3 and so on.",{}); qq3204.figure = p32figStandingWave(3,"circumference = a whole number of wavelengths"); return qq3204;
  },
  function(){
    return mcq("According to de Broglie, an orbit whose circumference is two and a half electron wavelengths cannot exist, because",
      "The wave would interfere destructively with itself after each lap and die out",
      ["The electron would move too slowly in such a large orbit",
       "Half a wavelength would stick out of the atom and be lost",
       "The nucleus would repel the electron from that orbit"],
      "After one trip around, the wave would be exactly out of phase with itself, crest meeting trough. Destructive interference wipes the wave out, so no such orbit is possible.",{});
  },
  function(){
    var qq3204 = mcq("An electron orbit has a circumference exactly 4 times the electron's de Broglie wavelength, so the wave fits around it four times. This corresponds to",
      "The fourth allowed orbit, n = 4",
      ["The second allowed orbit, n = 2","The eighth allowed orbit, n = 8","No allowed orbit, because the fit must be exact to one wavelength"],
      "The number of wavelengths fitted around the circumference is the orbit number n. Four wavelengths per lap means n = 4.",{}); qq3204.figure = p32figStandingWave(4,"circumference = 4 wavelengths"); return qq3204;
  },
  function(){
    var qq3204 = mcq("De Broglie's standing-wave idea was important because it",
      "Explained why only certain orbits are allowed, which Bohr had simply assumed",
      ["Proved that electrons are classical waves like sound",
       "Showed that the nucleus contains protons and neutrons",
       "Measured the charge of the electron for the first time"],
      "Bohr had to postulate his allowed orbits with no reason behind them. De Broglie's wave condition, a whole number of wavelengths around the orbit, supplies the reason.",{}); qq3204.figure = p32figStandingWave(3,"allowed orbits are standing waves"); return qq3204;
  }
]));

/* ---------- PH12.8.5 Bohr energy levels and photons ---------- */

E("u4-85-transition-energy",4,["PH12.8.5"],2,"gen",function(){
  var ni=ri(2,6), nf=ri(1,ni-1);
  var ctx=pick(PH4CTX);
  var Ei=bohrE(ni), Ef=bohrE(nf);
  var dE=Math.abs(Ei)-Math.abs(Ef);
  var ans=sfR(dE,3);
  var qq3204 = numq("An electron in a hydrogen atom "+ctx+" falls from the n = "+ni+" level to the n = "+nf+" level. Calculate the energy of the photon emitted. Give your answer in electron volts (eV).",
    ans,Math.max(0.02*Math.abs(ans),0.001),
    "The hydrogen level energies are E_n = -13.6 eV / n\u00B2. For n = "+ni+": 13.6 / "+(ni*ni)+" = "+gF(Math.abs(Ei))+", so the level energy is "+gF(Ei)+" eV. For n = "+nf+": 13.6 / "+(nf*nf)+" = "+gF(Math.abs(Ef))+", so the level energy is "+gF(Ef)+" eV. The photon carries away the difference: "+gF(Math.abs(Ei))+" - "+gF(Math.abs(Ef))+" = "+gF(dE)+" eV, which is "+F3(dE)+" eV at three significant figures.",
    {ni:ni,nf:nf}); qq3204.figure = p32figBohr(6,ni,nf,"down"); return qq3204;
});

E("u4-85-photon-wavelength",4,["PH12.8.5"],2,"gen",function(){
  var ni=ri(2,6), nf=ri(1,ni-1);
  var ctx=pick(PH4CTX);
  var Ei=bohrE(ni), Ef=bohrE(nf);
  var dE=Math.abs(Ei)-Math.abs(Ef);
  var lam=PHYS_H*PHYS_C/(dE*PHYS_E)/1e-9;
  var ans=sfR(lam,3);
  var qq3204 = numq("An electron in a hydrogen atom "+ctx+" falls from the n = "+ni+" level to the n = "+nf+" level. Calculate the wavelength of the photon emitted. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "The level energies are E_n = -13.6 eV / n\u00B2, so the n = "+ni+" level is "+gF(Ei)+" eV and the n = "+nf+" level is "+gF(Ef)+" eV. The photon energy is the difference, "+gF(Math.abs(Ei))+" - "+gF(Math.abs(Ef))+" = "+gF(dE)+" eV. Converting that energy to joules and using \u03BB = hc / E gives the wavelength. \u03BB = "+F3(lam)+" nm.",
    {ni:ni,nf:nf}); qq3204.figure = p32figBohr(6,ni,nf,"down"); return qq3204;
});

E("u4-85-greatest-transitions",4,["PH12.8.5"],3,"var",varset([
  function(){
    var qq3204 = mcq("Which of these electron transitions in hydrogen releases the most energy?",
      "n = 5 to n = 1",
      ["n = 6 to n = 5","n = 4 to n = 2","n = 3 to n = 2"],
      "Energy released is the gap between the levels, using E_n = -13.6 eV / n\u00B2. The gaps are: n = 5 to n = 1, 13.06 eV; n = 4 to n = 2, 2.55 eV; n = 3 to n = 2, 1.89 eV; n = 6 to n = 5, 0.166 eV. Falling all the way to the ground level from n = 5 releases by far the most energy.",{}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
  },
  function(){
    var qq3204 = mcq("Which of these electron transitions in hydrogen requires the most energy to be absorbed?",
      "n = 1 to n = 4",
      ["n = 1 to n = 2","n = 2 to n = 5","n = 3 to n = 6"],
      "Energy absorbed is the gap between the levels, using E_n = -13.6 eV / n\u00B2. The gaps are: n = 1 to n = 4, 12.75 eV; n = 1 to n = 2, 10.2 eV; n = 2 to n = 5, 2.86 eV; n = 3 to n = 6, 1.13 eV. Climbing from the ground level to n = 4 is the biggest jump listed.",{}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
  },
  function(){
    var qq3204 = mcq("Which of these electron transitions in hydrogen emits the photon with the longest wavelength?",
      "n = 6 to n = 5",
      ["n = 2 to n = 1","n = 4 to n = 3","n = 5 to n = 4"],
      "The longest wavelength belongs to the least energetic photon, since \u03BB = hc / E. The gaps are: n = 6 to n = 5, 0.166 eV; n = 5 to n = 4, 0.306 eV; n = 4 to n = 3, 0.661 eV; n = 2 to n = 1, 10.2 eV. Neighbouring high levels are closest together in energy, so n = 6 to n = 5 gives the smallest energy and the longest wavelength.",{}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
  },
  function(){
    var qq3204 = mcq("An electron in hydrogen falls from n = 5 to n = 2, emitting a photon of about 434 nm. All transitions ending at n = 2 form the Balmer series. This photon is",
      "In the visible region, since 434 nm lies between about 380 nm and 750 nm",
      ["In the ultraviolet, since all hydrogen lines are ultraviolet",
       "In the infrared, since n = 2 is a low level",
       "An X-ray, since it comes from an energy level change"],
      "Falls to n = 2 give the Balmer series, and this one's wavelength, about 434 nm, sits inside the visible band. Falls to n = 1 give ultraviolet Lyman lines and falls to n = 3 give infrared Paschen lines.",{}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
  }
]));

E("u4-85-transition-cr",4,["PH12.8.5"],3,"gen",function(){
  var pr=pick([[4,2],[5,2],[6,2],[3,1],[4,1],[5,1],[6,1],[5,3],[6,3]]);
  var ni=pr[0], nf=pr[1];
  var ctx=pick(PH4CTX);
  var Ei=bohrE(ni), Ef=bohrE(nf);
  var dE=Math.abs(Ei)-Math.abs(Ef);
  var EJ=dE*PHYS_E;
  var lam=PHYS_H*PHYS_C/EJ/1e-9;
  var ans=sfR(lam,3);
  var region=lam<380?"This wavelength is in the ultraviolet region.":(lam<=750?"This wavelength is in the visible region.":"This wavelength is in the infrared region.");
  var qq3204 = numq("An electron in a hydrogen atom "+ctx+" falls from the n = "+ni+" level to the n = "+nf+" level. Calculate the wavelength of the photon emitted. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "Step 1: level energies from E_n = -13.6 eV / n\u00B2. For n = "+ni+": 13.6 / "+(ni*ni)+" = "+gF(Math.abs(Ei))+", so E = "+gF(Ei)+" eV. For n = "+nf+": 13.6 / "+(nf*nf)+" = "+gF(Math.abs(Ef))+", so E = "+gF(Ef)+" eV. Step 2: the photon takes the difference: "+gF(Math.abs(Ei))+" - "+gF(Math.abs(Ef))+" = "+gF(dE)+" eV. Step 3: in joules, multiplying by 1.60 \u00D7 10\u207B\u00B9\u2079 J per eV, the photon energy is "+F3(EJ)+" J. Step 4: \u03BB = hc / E then gives the wavelength in metres, converted here to nanometres: \u03BB = "+F3(lam)+" nm. "+region,
    {ni:ni,nf:nf}); qq3204.figure = p32figBohr(6,ni,nf,"down"); return qq3204;
});

E("u4-85-absorption-cr",4,["PH12.8.5"],2,"gen",function(){
  var pr=pick([[1,2],[1,3],[1,4],[1,5],[2,3],[2,4],[2,5],[3,4],[3,5],[3,6],[4,5],[4,6]]);
  var ni=pr[0], nf=pr[1];
  var ctx=pick(PH4CTX);
  var Ei=bohrE(ni), Ef=bohrE(nf);
  var Eph=Ef-Ei;
  var ans=nf;
  var qq3204 = numq("A hydrogen atom "+ctx+" has an electron in the n = "+ni+" level. It absorbs a photon of energy "+gF(Eph)+" eV. The level energies are: n = 1: -13.6 eV, n = 2: -3.40 eV, n = 3: -1.51 eV, n = 4: -0.850 eV, n = 5: -0.544 eV, n = 6: -0.378 eV. To which level does the electron rise? Give your answer as a whole number.",
    ans,0.4,
    "The electron gains the photon's energy, so its new energy is the starting level energy plus "+gF(Eph)+" eV: "+gF(Ei)+" + "+gF(Eph)+" = "+gF(Ef)+" eV. Comparing with the listed level energies, "+gF(Ef)+" eV is exactly the n = "+nf+" level, so the electron rises to n = "+nf+". A photon works for this jump only if its energy matches the gap exactly.",
    {ni:ni,nf:nf}); qq3204.figure = p32figBohr(6,null,null,null); return qq3204;
});

/* ---------- PH12.8.6 Quantum model and luminous phenomena ---------- */

E("u4-86-fluor-phos",4,["PH12.8.6"],2,"var",varset([
  function(){
    return mcq("A material shows fluorescence. In energy terms, what happens inside its atoms while the exciting light shines on it?",
      "Atoms absorb high-energy photons, and electrons fall back almost immediately, emitting lower-energy photons, so the glow stops as soon as the exciting light is removed",
      ["Atoms store the absorbed energy for hours and release it slowly as light",
       "Atoms reflect the exciting light unchanged, like tiny mirrors",
       "Electrons are knocked completely out of the atoms and recombine later"],
      "In fluorescence the excited electrons return to lower levels almost at once, emitting photons of visible light. Part of the absorbed energy is lost as heat first, so the emitted photons are less energetic than the absorbed ones, and the display ends with the exciting light.",{});
  },
  function(){
    return mcq("A material shows phosphorescence. In energy terms, what makes it different from fluorescence?",
      "Some electrons are held in long-lived excited states and return only gradually, so the material keeps emitting light long after the exciting light is removed",
      ["Its atoms absorb photons of much higher energy than fluorescent materials do",
       "Its electrons fall back instantly, but the emitted photons travel very slowly out of the material",
       "It reflects light that was stored in the material during manufacture"],
      "Phosphorescent materials trap some excited electrons in states they escape only slowly. The stored energy leaks back out as light over minutes or hours, which is why the glow outlasts the lamp.",{});
  },
  function(){
    return mcq("A fluorescent material absorbs ultraviolet photons and emits visible photons. The emitted photons have longer wavelengths than the absorbed ones because",
      "Part of each absorbed photon's energy is lost as heat and vibration before emission, so the emitted photon carries less energy",
      ["The material stretches the photons as they pass through it",
       "Visible photons always gain energy while travelling through a solid",
       "The atoms add a little of their own energy to every photon"],
      "Energy in must cover energy out. Some of the absorbed energy becomes thermal motion before the electron falls back, leaving less for the emitted photon, and less energy means a longer wavelength.",{});
  },
  function(){
    return mcq("A safety poster glows brightly while an ultraviolet lamp shines on it in a dark room, and the glow vanishes the instant the lamp is switched off. The poster is showing",
      "Fluorescence, because the emission happens only while the exciting light is shining",
      ["Phosphorescence, because the material is glowing in the dark",
       "The photoelectric effect, because ultraviolet light is involved",
       "Incandescence, because the poster is giving off light"],
      "The giveaway is the timing: emission that starts and stops with the exciting light is fluorescence. A phosphorescent poster would keep glowing after the lamp went off.",{});
  }
]));

E("u4-86-glow-applications",4,["PH12.8.6"],2,"var",varset([
  function(){
    return mcq("Plastic stars stuck on a bedroom ceiling are charged by the room light and then glow for an hour after the lights go out. This works because",
      "The material is phosphorescent: it stores absorbed photon energy in long-lived excited states and releases it slowly as visible light",
      ["The plastic reflects the room light back out again very slowly",
       "The material is slightly radioactive and glows on its own",
       "The stars keep a small electric charge that makes them shine"],
      "Charging fills long-lived excited states with energy from the room light. In the dark those states empty gradually, and each returning electron gives up its stored energy as a visible photon.",{});
  },
  function(){
    return mcq("Glow-in-the-dark stars shine brightly at first and then grow dimmer as the night goes on. The fading happens because",
      "The store of trapped excited electrons runs down as more and more of them return to the ground state",
      ["The material slowly cools, and cold materials cannot glow",
       "The photons already emitted block the ones still inside",
       "The electrons get tired and fall back more slowly"],
      "The glow is paid for out of a fixed store of excited electrons. Every emitted photon spends one of them, so as the store empties the emission rate, and the brightness, falls away.",{});
  },
  function(){
    return mcq("Inside a fluorescent lamp, an electric discharge in mercury vapour produces mostly ultraviolet photons, yet the lamp gives off visible light. The visible light comes mainly from",
      "A phosphor coating on the tube that absorbs the ultraviolet photons and re-emits their energy as visible light",
      ["The glass of the tube, which slows ultraviolet photons down until they become visible",
       "The mercury atoms directly, which emit only visible light",
       "The electrodes, which glow white hot like a filament"],
      "The coating is a fluorescent material: it takes in the invisible ultraviolet photons and returns the energy as visible photons, losing a little as heat on the way. That conversion is the whole point of the coating.",{});
  },
  function(){
    return mcq("A phosphorescent ornament sits in a dark drawer for a week. When it is taken out at night it does not glow at all. This is because",
      "Its electrons are all back in the ground state; sitting in the dark stored no energy for it to release",
      ["The darkness inside the drawer drained the glow out of the material",
       "Phosphorescent materials only work once and then wear out",
       "The ornament needs to be cold before it can glow"],
      "Phosphorescence spends stored energy, and storage needs light. A week in the dark leaves every electron in the ground state, so there is nothing to release until the ornament is charged by light again.",{});
  }
]));

E("u4-86-identify-phenomenon",4,["PH12.8.6"],1,"var",varset([
  function(){
    return mcq("Highlighter ink on a page glows vividly under a black light (ultraviolet lamp), but only while the lamp is on. The phenomenon is",
      "Fluorescence",
      ["Phosphorescence","Compton scattering","The photoelectric effect"],
      "Emission that happens only while the exciting light shines, stopping when it stops, is fluorescence.",{});
  },
  function(){
    return mcq("The hands of a watch were exposed to daylight during the day and can still be seen glowing faintly in a dark room an hour later. The phenomenon is",
      "Phosphorescence",
      ["Fluorescence","Compton scattering","The photoelectric effect"],
      "A glow that persists long after the exciting light is gone, paid for out of stored energy, is phosphorescence.",{});
  },
  function(){
    return mcq("Security ink printed on banknotes is invisible in normal light but shows up brightly the moment an ultraviolet lamp is shone on the note. The phenomenon is",
      "Fluorescence",
      ["Phosphorescence","Compton scattering","The photoelectric effect"],
      "The ink emits visible light only while the ultraviolet shines on it. Prompt emission tied to the exciting light is fluorescence.",{});
  },
  function(){
    return mcq("A child's glow star is held under a lamp for a minute, and it then glows on the bedroom wall for the next twenty minutes in the dark. The phenomenon is",
      "Phosphorescence",
      ["Fluorescence","Compton scattering","The photoelectric effect"],
      "The star stored the lamp's energy and releases it slowly after the lamp is gone. Delayed, persistent emission is phosphorescence.",{});
  }
]));

E("u4-86-energy-account",4,["PH12.8.6"],3,"gen",function(){
  var la=sfR(rf(240,300),3);
  var le=sfR(la*rf(2.05,2.75),3);
  var ratio=sfR(la/le,4);
  var pct=ratio*100;
  return mcq("A fluorescent dye absorbs photons of wavelength "+gF(la)+" nm and re-emits photons of wavelength "+gF(le)+" nm. What percentage of each absorbed photon's energy is re-emitted as light?",
    F3(pct)+"%",
    [F3(100-pct)+"%",F3(le/la*100)+"%",F3((le-la)/la*100)+"%"],
    "Photon energy is inversely proportional to wavelength, so the fraction of energy re-emitted is the absorbed wavelength divided by the emitted wavelength: "+gF(la)+" / "+gF(le)+" = "+iF(ratio)+". As a percentage: "+iF(ratio)+" \u00D7 100 = "+fmt(pct,2)+"%, which is "+F3(pct)+"% at three significant figures. The rest of the energy is lost as heat in the dye.",
    {la:la,le:le});
});

/* ---------- PH12.8.7 Evidence for wave and particle models ---------- */

E("u4-87-wave-model-fails",4,["PH12.8.7"],2,"var",varset([
  function(){
    return mcq("Bright red light shines on a metal for an hour and ejects no electrons at all, while faint ultraviolet light ejects electrons instantly. The wave model of light cannot explain this, because in the wave model",
      "Energy arrives gradually and in proportion to brightness, so bright light of any colour should eventually build up enough energy to eject electrons",
      ["Light should stop travelling when it meets a metal surface",
       "Red light should travel more slowly than ultraviolet light",
       "Electrons should not be able to leave a metal under any circumstances"],
      "A wave spreads its energy continuously over the surface, so a brighter wave of any frequency ought to free electrons given time. The observation, instant ejection depending on frequency alone, fits a stream of photons instead: each electron takes one photon, and only photons above the threshold energy can do the job.",{});
  },
  function(){
    return mcq("Doubling the brightness of light that is above the threshold frequency doubles the number of electrons a metal emits each second, but their maximum kinetic energy does not change. The photon account explains this because",
      "Each electron is freed by one photon; brighter light supplies more photons, but every photon still carries the same energy",
      ["Brighter light makes the metal hotter, and hot metals shed more electrons",
       "The extra photons collide with each other and share their energy out evenly",
       "Electrons absorb two photons at once when the light is bright"],
      "Numbers and energies separate cleanly in the photon picture. Brightness is a photon count, so it sets how many electrons are freed. Energy per electron is set by the single photon that freed it, which depends on frequency, not brightness.",{});
  },
  function(){
    return mcq("Every metal has a threshold frequency, below which no electrons are emitted however the light is adjusted. In the quantum account, the threshold exists because",
      "A photon with energy below the work function cannot free an electron, and each electron is freed by absorbing a single photon",
      ["Slow waves cannot penetrate the surface of a metal at all",
       "Electrons need time to warm up before they can escape",
       "Below that frequency the light is reflected too perfectly to interact"],
      "Escape costs the work function, and the bill must be paid by one photon in one payment. A photon with hf below the work function leaves the electron stuck, and no number of such photons changes that.",{});
  },
  function(){
    return mcq("Wave theory was unable to explain the wavelength shift Compton measured when X-rays scattered from electrons, because",
      "It offered no way for the scattered photon to hand a definite amount of energy and momentum to one single electron, the way colliding particles do",
      ["Waves cannot change direction when they meet an obstacle",
       "X-rays travel too fast for wave theory to apply to them",
       "The target contained too many electrons for the theory to handle"],
      "In the wave picture the electron should absorb energy gradually and reradiate at the same wavelength. The measured shift matches a single collision between a photon and an electron with energy and momentum conserved, a particle event.",{});
  }
]));

E("u4-87-match-model",4,["PH12.8.7"],1,"var",varset([
  function(){
    return mcq("Light passing through a narrow slit spreads out and forms a diffraction pattern. This phenomenon is direct evidence for",
      "The wave model of light",
      ["The particle (photon) model of light","Neither model of light","Both models of light equally"],
      "Spreading out after passing through a small opening, and forming patterns of interference, is behaviour characteristic of waves. This observation supports the wave model.",{});
  },
  function(){
    return mcq("Ultraviolet light ejects electrons from a metal instantly, and the electrons' energies depend on the light's frequency rather than its brightness. This phenomenon is direct evidence for",
      "The particle (photon) model of light",
      ["The wave model of light","Neither model of light","Both models of light equally"],
      "Energy arriving in concentrated packets, one packet per electron, is the signature of the photon model. The photoelectric effect is its classic evidence.",{});
  },
  function(){
    return mcq("Light passing through two close slits produces a pattern of bright and dark fringes on a screen. This phenomenon is direct evidence for",
      "The wave model of light",
      ["The particle (photon) model of light","Neither model of light","Both models of light equally"],
      "Fringes are interference: the two paths reinforce in some places and cancel in others. Only waves produce cancellation, so the double-slit pattern supports the wave model.",{});
  },
  function(){
    return mcq("X-rays scattering from electrons emerge with a longer wavelength, exactly as if each photon had collided with one electron and lost energy and momentum to it. This phenomenon is direct evidence for",
      "The particle (photon) model of light",
      ["The wave model of light","Neither model of light","Both models of light equally"],
      "A collision with a recoil, in which energy and momentum are handed over, is particle behaviour. Compton scattering is direct evidence that photons carry momentum like particles.",{});
  }
]));

E("u4-87-single-photon-doubleslit",4,["PH12.8.7"],3,"var",varset([
  function(){
    return mcq("Photons are sent through a double slit one at a time, so that only one photon is ever in the apparatus at once. After thousands of photons have arrived at the screen, the recorded pattern is",
      "An interference pattern built up from individual arrival dots",
      ["Two bright bands, one behind each slit","A smooth uniform smear with no pattern","Nothing at all, because single photons cannot interfere"],
      "Each photon lands as one dot, like a particle, yet the accumulated dots trace out the same interference fringes a wave would make. The pattern is statistical: it emerges from many single arrivals.",{});
  },
  function(){
    return mcq("In the same one-at-a-time double-slit experiment, only twenty photons have arrived so far. The screen at this stage shows",
      "A few scattered dots with no visible pattern yet; the fringes emerge only as many photons accumulate",
      ["A faint but complete interference pattern at full detail",
       "Exactly ten dots behind each slit",
       "A tiny image of the two slits"],
      "Twenty dots cannot draw a fringe pattern; they land as individual particle hits, seemingly at random. Only when thousands have built up does the wave-like pattern become visible in their distribution.",{});
  },
  function(){
    return mcq("The one-at-a-time double-slit result is best interpreted by saying that",
      "Each photon arrives as a single particle-like dot, but the probability of where it lands is governed by a wave-like pattern",
      ["Each photon splits into two half-photons that recombine at the screen",
       "Photons secretly travel in groups even when sent one at a time",
       "The screen itself rearranges the dots into fringes afterwards"],
      "The result holds both ideas at once: detection is particle-like, one dot at a time, while the distribution of the dots follows the interference pattern only a wave could produce. That pairing is wave-particle duality in action.",{});
  },
  function(){
    return mcq("Still sending photons one at a time, one of the two slits is now covered. The pattern that builds up becomes",
      "A single-slit pattern with no interference fringes, because each photon now has only one path available",
      ["The same interference pattern, but half as bright",
       "Two bright bands, because the photons bunch together",
       "A completely blank screen, because photons need both slits open"],
      "Interference needs two paths whose contributions can reinforce or cancel. With one slit covered there is nothing to interfere with, and the fringes disappear even though photons still arrive one by one.",{});
  }
]));

E("u4-87-duality-judgement",4,["PH12.8.7"],3,"var",varset([
  function(){
    return mcq("A classmate claims: light is a wave, full stop, because it diffracts. Which observation most directly shows the claim is incomplete?",
      "Light ejects electrons from a metal instantly, with electron energies set by frequency rather than brightness",
      ["Light refracts when it passes from air into water",
       "Light reflects from a mirror at equal angles",
       "Light spreads out after passing through a narrow slit"],
      "Refraction, reflection and diffraction are all behaviour the wave model handles happily. Instant electron ejection with frequency-dependent energies is not: it needs energy in packets. That observation forces the particle side of the story.",{});
  },
  function(){
    return mcq("A classmate claims: light is just a stream of tiny particles, full stop. Which observation most directly shows the claim is incomplete?",
      "Light forms interference fringes when it passes through two close slits",
      ["Light ejects electrons from a metal surface",
       "Light transfers momentum to electrons when X-rays scatter",
       "Light travels in straight lines and casts sharp shadows"],
      "Particles cannot cancel each other out, yet the dark fringes are places where light plus light gives darkness. Interference is wave behaviour that a pure particle stream cannot explain.",{});
  },
  function(){
    return mcq("Which pair of observations, taken together, is what forces the idea of wave-particle duality?",
      "Interference fringes from a double slit, together with the photoelectric effect",
      ["Diffraction of light, together with reflection of light",
       "The photoelectric effect, together with Compton scattering",
       "Refraction of light, together with diffraction of light"],
      "The first pair mixes the two camps: fringes demand a wave, the photoelectric effect demands particles. Pairs drawn from a single camp can be explained by one model alone and force nothing.",{});
  },
  function(){
    return mcq("A student wants direct evidence that photons carry momentum like particles. The most direct measurement is to",
      "Scatter X-rays from electrons and measure both the photon's wavelength increase and the electron's recoil",
      ["Show that light bends around the edge of a slit",
       "Measure the brightness of a beam very carefully",
       "Pass light through a prism and record the spectrum"],
      "Momentum transfer is the claim, so the test must catch momentum being transferred: a photon leaving with less momentum (longer wavelength) while an electron recoils with the difference. That is exactly Compton's measurement.",{});
  }
]));

/* ---------- PH12.8.8 De Broglie hypothesis ---------- */

E("u4-88-electron-wavelength",4,["PH12.8.8"],2,"gen",function(){
  var v=sfR(rf(1.00,9.00),3)*1e6;
  var lam=PHYS_H/(PHYS_ME*v)/1e-9;
  var ans=sfR(lam,3);
  return numq("An electron travels at "+gF(v)+" m/s. Calculate its de Broglie wavelength. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.0005),
    "De Broglie proposed that a moving particle has a wavelength \u03BB = h / (mv). Dividing the Planck constant by the electron's mass times its speed gives the wavelength in metres, converted here to nanometres. \u03BB = "+F3(lam)+" nm. That is comparable to the spacing between atoms, which is why electrons can show diffraction effects in crystals.",
    {v:v});
});

E("u4-88-proton-wavelength",4,["PH12.8.8"],2,"gen",function(){
  var vk=sfR(rf(150,900),3);
  var lam=PHYS_H/(PHYS_MP*vk*1000);
  return mcq("A proton travels at "+gF(vk)+" km/s. What is its de Broglie wavelength?",
    F3(lam)+" m",
    [F3(PHYS_H/(PHYS_ME*vk*1000))+" m",F3(PHYS_H/(PHYS_MP*vk))+" m",F3(lam/2)+" m"],
    "Use \u03BB = h / (mv) with the proton mass, 1.67 \u00D7 10\u207B\u00B2\u2077 kg, and the speed converted to metres per second: "+gF(vk)+" km/s is "+fmt(vk*1000,0)+" m/s. The wavelength is "+F3(lam)+" m. Using the electron's much smaller mass, or forgetting the km/s conversion, each inflates the answer by a large factor.",
    {vk:vk});
});

E("u4-88-accelerating-cr",4,["PH12.8.8"],3,"gen",function(){
  var V=sfR(rf(40.0,400),3);
  var KE=PHYS_E*V;
  var vP=sfR(Math.sqrt(2*KE/PHYS_ME),4);
  var lam=PHYS_H/(PHYS_ME*vP)/1e-9;
  var ans=sfR(lam,3);
  return numq("An electron is accelerated from rest through a potential difference of "+gF(V)+" V. Calculate its de Broglie wavelength after acceleration. Give your answer in nanometres (nm).",
    ans,Math.max(0.02*Math.abs(ans),0.0005),
    "Step 1: the field hands the electron a kinetic energy of one electron charge times the voltage, which in joules is "+F3(KE)+" J. Step 2: from the kinetic energy, the speed is v = \u221A(2 \u00D7 KE / m), using the electron mass 9.11 \u00D7 10\u207B\u00B3\u00B9 kg; this gives v = "+iF(vP)+" m/s. Step 3: the de Broglie wavelength is \u03BB = h / (mv), computed from that speed: \u03BB = "+F3(lam)+" nm. Wavelengths this small, comparable to atomic spacings, are what make electron microscopes possible.",
    {V:V});
});

E("u4-88-compare-particles",4,["PH12.8.8"],3,"var",varset([
  function(){
    return mcq("An electron and a proton are given exactly the same kinetic energy. The proton's de Broglie wavelength is",
      "About 0.0233 times the electron's wavelength",
      ["About 1836 times the electron's wavelength","The same as the electron's wavelength","About 0.000545 times the electron's wavelength"],
      "At the same kinetic energy, momentum is p = \u221A(2mK), so the heavier particle carries more momentum, by the square root of the mass ratio. Wavelength goes as 1 / p, so the proton's wavelength is smaller by \u221A(m_e / m_p), about 0.0233.",{});
  },
  function(){
    return mcq("An electron and a proton travel at exactly the same speed. The proton's de Broglie wavelength is",
      "About 0.000545 times the electron's wavelength",
      ["About 1836 times the electron's wavelength","The same as the electron's wavelength","About 0.0233 times the electron's wavelength"],
      "At the same speed, momentum is p = mv, so the proton's momentum is larger by the full mass ratio, about 1836. Wavelength goes as 1 / p, so the proton's wavelength is the electron's divided by about 1836, which is 0.000545 times as large.",{});
  },
  function(){
    return mcq("An electron and a proton have exactly the same momentum. Their de Broglie wavelengths are",
      "The same, because wavelength depends only on momentum",
      ["Different, because the proton is much heavier","Different, because the electron is much lighter","Impossible to compare without knowing their speeds"],
      "De Broglie's relation is \u03BB = h / p. It mentions momentum only. Same momentum, same h, so the wavelengths are identical, whatever the masses are doing.",{});
  },
  function(){
    return mcq("An electron and a proton are given exactly the same kinetic energy. The electron's de Broglie wavelength is",
      "About 42.8 times the proton's wavelength",
      ["About 1836 times the proton's wavelength","About the same as the proton's wavelength","About 0.0233 times the proton's wavelength"],
      "This is the same comparison viewed from the other side. At equal kinetic energy the proton's wavelength is the electron's divided by \u221A(m_p / m_e) with the masses swapped, so the electron's wavelength is larger by \u221A(1836), about 42.8.",{});
  }
]));

E("u4-83-compton-cr",4,["PH12.8.3"],2,"gen",function(){
  var lam=sfR(rf(35.0,65.0),3);
  var th=pick([60.0,90.0,120,180]);
  var shiftP=sfR(2.426*(1-Math.cos(th*Math.PI/180)),4);
  var lamP=sfR(lam+shiftP,4);
  var ekeV=1.240e6/lamP/1000;
  var ans=sfR(ekeV,3);
  var qq3204 = numq("An X-ray photon with a wavelength of "+gF(lam)+" pm strikes a stationary electron and is scattered at "+gF(th)+"\u00B0 from its original direction. Calculate the energy of the scattered photon. Give your answer in keV.",
    ans,Math.max(0.02*Math.abs(ans),0.01),
    "Step 1: the Compton shift is \u0394\u03BB = (h / (m_e c)) (1 - cos \u03B8), and the Compton wavelength h / (m_e c) is 2.43 pm, so at this angle the shift is \u0394\u03BB = "+iF(shiftP)+" pm. Step 2: the scattered wavelength is \u03BB' = "+gF(lam)+" pm + "+iF(shiftP)+" pm = "+iF(lamP)+" pm. Step 3: photon energy is E = hc / \u03BB', with hc = 1.240 \u00D7 10\u2076 eV\u00B7pm, so E = "+F3(ekeV)+" keV. The photon leaves with less energy than it brought; the difference is the kinetic energy handed to the electron, which is the particle behaviour Compton set out to prove.",
    {lam:lam, th:th}); qq3204.figure = p32figCompton(gF(lam)+" pm",th); return qq3204;
});
