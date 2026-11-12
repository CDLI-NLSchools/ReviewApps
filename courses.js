/* Course registry for the unified review app shell.
   Registering a course here, plus its bank module in banks/, is the whole
   "add a course" operation. The shell reads everything course-specific
   from the active entry: branding, units, indicators, presets, the exam
   blueprint, reference panels. See Unified-Review-App-Design.md. */
window.COURSES = {

"physics-3204": {
  id: "physics-3204",
  title: "Physics 3204 Review: Practice Question Bank",
  shortName: "Physics 3204",
  storagePrefix: "p3204",
  reportName: "Physics 3204",
  language: "en",
  bankFile: "physics-3204.js",
  subject: "Science",
  grade: 12,

  units: {
    1: "Motion",
    2: "Forces",
    3: "Fields",
    4: "Introduction to Quantum Physics"
  },

  /* Knowledge indicators only (27), wording from the Physics 3204 Units
     and Indicators spreadsheet, as harvested Nov 11, 2026. */
  indicators: {
    "PH12.5.1": "Use vectors to represent displacement, velocity, acceleration and force",
    "PH12.5.2": "Identify the frame of reference",
    "PH12.5.3": "Analyse quantitatively two-dimensional motion in a horizontal plane and in a vertical plane",
    "PH12.5.4": "Analyse quantitatively the horizontal and vertical motion of a projectile",
    "PH12.5.5": "Apply quantitatively the laws of conservation of momentum to two-dimensional collisions and explosions",
    "PH12.6.1": "Describe uniform circular motion, using algebraic and vector analysis",
    "PH12.6.2": "Explain quantitatively circular motion using Newton's laws",
    "PH12.6.3": "Analyse quantitatively two-dimensional motion in a parallel and perpendicular plane",
    "PH12.6.4": "Analyse quantitatively two-dimensional systems involving mass, static equilibrium and torques",
    "PH12.7.1": "Describe a gravitational field as a region of space that affects mass",
    "PH12.7.2": "Apply Newton's universal law of gravitation quantitatively",
    "PH12.7.3": "Describe electric fields as regions of space that affect charge",
    "PH12.7.4": "Apply Coulomb's law quantitatively",
    "PH12.7.5": "Analyse electric circuits with respect to energy, voltage, current, resistance and power",
    "PH12.7.6": "Describe magnetic fields as regions of space that affect mass and charge",
    "PH12.7.7": "Describe the magnetic field produced by current in both a solenoid and a long, straight conductor",
    "PH12.7.8": "Analyse, qualitatively and quantitatively, the forces acting on a moving charge and on an electric current in a uniform magnetic field",
    "PH12.7.9": "Analyse, qualitatively and quantitatively, electromagnetic induction by both a changing magnetic flux and a moving conductor",
    "PH12.7.10": "Compare and contrast the way a motor and a generator function, using the principles of electromagnetism",
    "PH12.8.1": "Describe how the quantum energy concept explains blackbody radiation and the photoelectric effect",
    "PH12.8.2": "Explain qualitatively and quantitatively the photoelectric effect",
    "PH12.8.3": "Explain the Compton effect using the laws of mechanics, the conservation of momentum and the conservation of energy",
    "PH12.8.4": "Explain qualitatively the Bohr atomic model as a synthesis of classical and quantum concepts",
    "PH12.8.5": "Explain the relationship between the energy levels in Bohr's model, the energy difference between the levels and the energy of the photons emitted and absorbed",
    "PH12.8.6": "Use the quantum mechanical model to explain natural luminous phenomena",
    "PH12.8.7": "Summarize the evidence for the wave and particle models of light",
    "PH12.8.8": "Explain the de Broglie hypothesis"
  },

  unitInd: {
    1: ["PH12.5.1", "PH12.5.2", "PH12.5.3", "PH12.5.4", "PH12.5.5"],
    2: ["PH12.6.1", "PH12.6.2", "PH12.6.3", "PH12.6.4"],
    3: ["PH12.7.1", "PH12.7.2", "PH12.7.3", "PH12.7.4", "PH12.7.5", "PH12.7.6", "PH12.7.7", "PH12.7.8", "PH12.7.9", "PH12.7.10"],
    4: ["PH12.8.1", "PH12.8.2", "PH12.8.3", "PH12.8.4", "PH12.8.5", "PH12.8.6", "PH12.8.7", "PH12.8.8"]
  },

  presets: {
    mid:   { units: [1, 2], label: "Mid-course review (Units 1 and 2)" },
    final: { units: [3, 4], label: "Final review (Units 3 and 4)" }
  },

  /* Exam blueprints. The mid-course blueprint is the governing PEP table
     (EECD memo, Sep 29, 2026): 50 marks, 27 selected response, 23
     constructed response, per-unit level marks as tabled. The memo gives
     no per-unit selected/constructed split for the mid; the split below
     is proportional to the unit totals (Motion 22, Forces 28).
     The final blueprint is an ADOPTED BEST GUESS (Jason, Nov 11, 2026):
     the memo publishes no final table, so the final mirrors the mid item
     shape with Fields 40 and Quantum 10 (the 80/20 split that both the
     June 2020 spec weights and the course hours give for the second
     half), levels 20/60/20 per unit. If an official PEP final table
     surfaces, it replaces this guess outright. */
  exam: {
    mid: {
      units: [1, 2], total: 50, srCount: 27, crMarks: 23,
      perUnit: {
        1: { sr: 12, cr: 10, levels: [4, 13, 5] },
        2: { sr: 15, cr: 13, levels: [6, 17, 5] }
      }
    },
    final: {
      units: [3, 4], total: 50, srCount: 27, crMarks: 23,
      perUnit: {
        3: { sr: 22, cr: 18, levels: [8, 24, 8] },
        4: { sr: 5,  cr: 5,  levels: [2, 6, 2] }
      }
    },
    fallback: { srCount: 27, crMarks: 23 }
  },

  /* Shown with the pool information whenever the final scope is selected. */
  finalNote: "Note: no official Table of Specifications has been published for the Physics 3204 final. This preset uses an adopted best guess (Fields 40 marks, Introduction to Quantum Physics 10 marks, at the same 20/60/20 level split as the mid-course exam). If an official table is published, it replaces this guess.",

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels, built from the Physics 3204 data sheet on record
     (constants and the equation groups: gravitation, Coulomb, circuits,
     magnetic force, transformers, photon energy, photoelectric,
     de Broglie, Bohr). QA item: the governing sheet has not yet been
     confirmed between the Drive Physics 3204 sheets and the site sheet
     titled for Physics 3214 (2018-2019), so sheet-exact verification of
     these panels remains open, the same status the Physics 2204 panels
     carry. */
  panels: {
    1: "<b>Constants:</b> \\(g = 9.8\\) m/s\\(^2\\); \\(c = 3.00 \\times 10^8\\) m/s.<br><b>Kinematics (constant acceleration):</b> \\(v_f = v_i + at\\); \\(d = v_i t + \\frac{1}{2} a t^2\\); \\(v_f^2 = v_i^2 + 2ad\\); \\(d = \\frac{v_i + v_f}{2} t\\). Average velocity \\(\\bar{v} = \\frac{\\Delta d}{\\Delta t}\\).<br><b>Vectors:</b> a vector at angle \\(\\theta\\) has components \\(A_x = A \\cos \\theta\\) and \\(A_y = A \\sin \\theta\\); magnitude \\(A = \\sqrt{A_x^2 + A_y^2}\\). Velocities combine by components: the velocity relative to the ground is the velocity relative to a moving medium plus the medium's velocity relative to the ground.<br><b>Projectiles:</b> the horizontal and vertical motions are independent. Horizontally \\(a_x = 0\\); vertically \\(a_y = 9.8\\) m/s\\(^2\\) downward, and the time of flight is set by the vertical motion alone.<br><b>Momentum:</b> \\(p = mv\\); impulse \\(J = F \\Delta t = \\Delta p\\). Total momentum is conserved in collisions and explosions when no outside impulse acts; in two dimensions each component is conserved separately: \\(\\sum p_{x,i} = \\sum p_{x,f}\\) and \\(\\sum p_{y,i} = \\sum p_{y,f}\\).",
    2: "<b>Uniform circular motion:</b> \\(v = \\frac{2 \\pi r}{T} = 2 \\pi r f\\); centripetal acceleration \\(a_c = \\frac{v^2}{r} = \\frac{4 \\pi^2 r}{T^2}\\), directed toward the centre; centripetal force \\(F_c = m a_c\\), supplied by a real force such as friction, tension or the normal force.<br><b>Inclines:</b> the weight \\(mg\\) splits into \\(mg \\sin \\theta\\) down the slope and \\(mg \\cos \\theta\\) into the surface; the normal force is \\(F_N = mg \\cos \\theta\\) when no other force presses on the surface. Friction: \\(f = \\mu F_N\\). Newton's second law: \\(F_{net} = ma\\).<br><b>Static equilibrium:</b> \\(\\sum F_x = 0\\), \\(\\sum F_y = 0\\) and \\(\\sum \\tau = 0\\) about any pivot. Torque \\(\\tau = F d \\sin \\theta\\), where \\(d\\) is the distance from the pivot and \\(\\theta\\) the angle between the force and the lever arm; a force through the pivot makes no torque.",
    3: "<b>Constants:</b> \\(G = 6.67 \\times 10^{-11}\\) N m\\(^2\\)/kg\\(^2\\); \\(k = 8.99 \\times 10^9\\) N m\\(^2\\)/C\\(^2\\); \\(e = 1.60 \\times 10^{-19}\\) C; \\(\\mu_0 = 4 \\pi \\times 10^{-7}\\) T m/A; \\(g = 9.8\\) m/s\\(^2\\).<br><b>Gravitation:</b> \\(F = \\frac{G m_1 m_2}{r^2}\\); field strength \\(g = \\frac{G M}{r^2}\\). For a circular orbit, \\(\\frac{G M}{r^2} = \\frac{v^2}{r}\\), so \\(v = \\sqrt{\\frac{G M}{r}}\\) and \\(T^2 = \\frac{4 \\pi^2 r^3}{G M}\\).<br><b>Electric fields and Coulomb's law:</b> \\(F = \\frac{k q_1 q_2}{r^2}\\); field strength \\(E = \\frac{F}{q}\\) and around a point charge \\(E = \\frac{k Q}{r^2}\\), directed away from a positive charge and toward a negative one. Potential difference \\(V = \\frac{W}{q}\\).<br><b>Circuits:</b> \\(I = \\frac{Q}{t}\\); \\(V = IR\\); power \\(P = VI = I^2 R = \\frac{V^2}{R}\\); energy \\(E = Pt\\). Series: \\(R_{eq} = R_1 + R_2 + \\dots\\), one current everywhere. Parallel: \\(\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots\\), one voltage everywhere. Kirchhoff: currents into a junction sum to zero; voltages around a loop sum to zero.<br><b>Magnetic fields and forces:</b> around a long straight wire, \\(B = \\frac{\\mu_0 I}{2 \\pi r}\\); in a solenoid, \\(B = \\mu_0 n I\\). Force on a conductor: \\(F = B I L \\sin \\theta\\). Force on a moving charge: \\(F = q v B \\sin \\theta\\); a charge moving perpendicular to a uniform field circles with \\(r = \\frac{m v}{q B}\\).<br><b>Induction and transformers:</b> motional emf \\(\\mathcal{E} = B L v\\). Lenz's law: the induced current opposes the change that makes it. Transformers: \\(\\frac{V_s}{V_p} = \\frac{N_s}{N_p}\\) and, for an ideal transformer, \\(V_p I_p = V_s I_s\\); stepping the voltage up steps the current down, which cuts the \\(I^2 R\\) loss in transmission lines.",
    4: "<b>Constants:</b> \\(h = 6.63 \\times 10^{-34}\\) J s; \\(c = 3.00 \\times 10^8\\) m/s; \\(e = 1.60 \\times 10^{-19}\\) C, and \\(1\\) eV \\(= 1.60 \\times 10^{-19}\\) J; electron mass \\(m_e = 9.11 \\times 10^{-31}\\) kg; proton mass \\(m_p = 1.67 \\times 10^{-27}\\) kg.<br><b>Photons:</b> \\(E = hf = \\frac{hc}{\\lambda}\\); photon momentum \\(p = \\frac{h}{\\lambda} = \\frac{E}{c}\\).<br><b>Photoelectric effect:</b> \\(hf = W + E_{k,max}\\), where \\(W = hf_0\\) is the work function and \\(f_0\\) the threshold frequency. The stopping potential gives \\(E_{k,max} = e V_s\\). Raising the intensity raises the number of electrons, not their energy; raising the frequency raises their energy.<br><b>Compton effect:</b> a photon scattering off an electron transfers energy and momentum to it, so the scattered photon has a longer wavelength; the shift grows with the scattering angle. Energy and momentum are both conserved.<br><b>Bohr model:</b> hydrogen level energies \\(E_n = \\frac{-13.6}{n^2}\\) eV. A transition between levels emits or absorbs a photon with \\(\\Delta E = |E_i - E_f| = hf\\): emission is a drop to a lower level, absorption a rise to a higher one.<br><b>De Broglie:</b> every moving particle has wavelength \\(\\lambda = \\frac{h}{mv} = \\frac{h}{p}\\). For a particle accelerated from rest through a potential difference \\(V\\), \\(\\frac{1}{2} m v^2 = qV\\) gives the speed first."
  }
},

"physics-2204": {
  id: "physics-2204",
  title: "Physics 2204 Review: Practice Question Bank",
  shortName: "Physics 2204",
  storagePrefix: "p2204",
  reportName: "Physics 2204",
  language: "en",
  bankFile: "physics-2204.js",
  subject: "Science",
  grade: 11,

  units: {
   "1": "Kinematics",
   "2": "Dynamics",
   "3": "Work and Energy",
   "4": "Waves",
   "5": "Science 1206 Review (prior learning)"
  },

  /* Knowledge indicators only (33), wording carried verbatim from the
     standalone app's curriculum map, plus the three Science 1206
     bridging indicators (B.1 to B.3) for the review unit. */
  indicators: {
   "PH11.5.1": "Use vectors to represent displacement, velocity, and acceleration",
   "PH11.5.2": "Analyze quantitatively the horizontal or vertical motion of an object",
   "PH11.5.3": "Identify the frame of reference for a given motion",
   "PH11.6.1": "Use vectors to represent force and acceleration",
   "PH11.6.2": "Apply Newton’s laws of motion to explain inertia, the relationship between force, mass, and acceleration, and the interaction of forces between two objects",
   "PH11.6.3": "Apply quantitatively Newton’s laws of motion to impulse and momentum",
   "PH11.6.4": "Engage in a design challenge to create a structure to protect an egg when dropped from a height",
   "PH11.6.5": "Apply quantitatively the laws of conservation of momentum to one dimensional collisions and explosions",
   "PH11.7.1": "Analyze quantitatively the relationships among force, distance, and work",
   "PH11.7.2": "Analyze quantitatively the relationships among mass, height, and speed using energy",
   "PH11.7.3": "Analyze common energy transformation situations using the work-energy theorem",
   "PH11.7.4": "Describe quantitatively mechanical energy as the sum of kinetic and potential energies",
   "PH11.7.5": "Analyze quantitatively problems related to kinematics and dynamics using the mechanical energy concept",
   "PH11.7.6": "Analyze quantitatively the relationships among gravitational potential energy, kinetic energy and heat energy using the law of conservation of energy",
   "PH11.7.7": "Determine the percent efficiency of energy transformations",
   "PH11.7.8": "Analyze quantitatively the relationships among work, time, and power",
   "PH11.7.9": "Analyze quantitatively the relationships among force, displacement, and spring constants",
   "PH11.7.10": "Explain quantitatively the relationships between displacement, velocity, time, and acceleration for simple harmonic motion",
   "PH11.7.11": "Explain quantitatively the relationship between potential and kinetic energies of a mass in simple harmonic motion",
   "PH11.7.12": "Determine which laws of conservation of energy or momentum are best used to solve particular real life situations involving elastic and inelastic collisions",
   "PH11.7.13": "Describe the products of radioactive decay and the characteristics of alpha, beta, and gamma radiation",
   "PH11.7.14": "Describe sources of radioactivity in the natural and constructed environments",
   "PH11.7.15": "Apply quantitatively the law of conservation of mass and energy, using Einstein’s mass-energy equivalence",
   "PH11.7.16": "Compare and contrast qualitatively and quantitatively nuclear fission and fusion",
   "PH11.8.1": "Describe the characteristics of longitudinal and transverse waves",
   "PH11.8.2": "Apply the wave equation to explain and predict the behaviour of waves",
   "PH11.8.3": "Describe how sound, as a form of energy, is produced and transmitted",
   "PH11.8.4": "Explain qualitatively and quantitatively the phenomena of wave interference and reflection of sound",
   "PH11.8.5": "Compare and describe the properties of electromagnetic radiation and sound",
   "PH11.8.6": "Explain qualitatively and quantitatively the phenomena of wave interference and diffraction of light",
   "PH11.8.7": "Explain qualitatively and quantitatively the Doppler-Fizeau effect",
   "PH11.8.8": "Explain qualitatively and quantitatively the phenomena of wave refraction",
   "PH11.8.9": "Apply the laws of reflection and the laws of refraction to predict wave behaviour",
   "B.1": "Science 1206 review: speed, distance and time",
   "B.2": "Science 1206 review: motion graphs",
   "B.3": "Science 1206 review: scalars, vectors and unit conversion"
  },

  unitInd: {
   "1": [
    "PH11.5.1",
    "PH11.5.2",
    "PH11.5.3"
   ],
   "2": [
    "PH11.6.1",
    "PH11.6.2",
    "PH11.6.3",
    "PH11.6.4",
    "PH11.6.5"
   ],
   "3": [
    "PH11.7.1",
    "PH11.7.2",
    "PH11.7.3",
    "PH11.7.4",
    "PH11.7.5",
    "PH11.7.6",
    "PH11.7.7",
    "PH11.7.8",
    "PH11.7.9",
    "PH11.7.10",
    "PH11.7.11",
    "PH11.7.12",
    "PH11.7.13",
    "PH11.7.14",
    "PH11.7.15",
    "PH11.7.16"
   ],
   "4": [
    "PH11.8.1",
    "PH11.8.2",
    "PH11.8.3",
    "PH11.8.4",
    "PH11.8.5",
    "PH11.8.6",
    "PH11.8.7",
    "PH11.8.8",
    "PH11.8.9"
   ],
   "5": [
    "B.1",
    "B.2",
    "B.3"
   ]
  },

  presets: {
    mid:   { units: [1, 2], label: "Mid-course review (Units 1 and 2)" },
    final: { units: [3, 4], label: "Final review (Units 3 and 4)" }
  },

  /* The All preset in the standalone app selects the four course units
     only: the Science 1206 Review unit is practice-only and is never
     swept into a preset. */
  allUnits: [1, 2, 3, 4],

  /* Exam blueprints, translated from the standalone app's composer.
     Mid-course: 50 marks (Kinematics 15, Dynamics 35), 30 selected
     response and 20 constructed response, the Science Table of
     Specifications shape the standalone shipped with. The per-unit
     level totals take the old composer's first preference for the
     constructed-response Level 3 share (4 of 6 CR marks in Unit 1,
     5 of 14 in Unit 2), over selected-response levels at 20/60/20.
     Final: a 25-mark paper in the senior pattern (11 selected
     response, 14 constructed response) split across Work and Energy
     (13 marks) and Waves (12 marks), the shape the standalone
     shipped. Any other multi-unit selection uses the standalone's
     pooled fallback: 30 selected response, 20 constructed response. */
  exam: {
    mid: {
      units: [1, 2], total: 50, srCount: 30, crMarks: 20,
      perUnit: {
        1: { sr: 9,  cr: 6,  levels: [2, 7, 6] },
        2: { sr: 21, cr: 14, levels: [4, 22, 9] }
      }
    },
    final: {
      units: [3, 4], total: 25, srCount: 11, crMarks: 14,
      perUnit: {
        3: { sr: 6, cr: 7, levels: [1, 7, 5] },
        4: { sr: 5, cr: 7, levels: [1, 6, 5] }
      }
    },
    fallback: { srCount: 30, crMarks: 20 }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels carried verbatim from the standalone app. The
     same open QA item applies there and here: panels versus the
     official Physics 2204 formula sheet is still unverified. */
  panels: {
   "1": "<b>Vectors in one dimension:</b> pick a positive direction and give every vector a sign. Add signed values to combine displacements, velocities or accelerations along a line.<br><b>Average velocity and acceleration:</b> \\(\\bar{v} = \\frac{\\Delta d}{\\Delta t}\\) and \\(a = \\frac{\\Delta v}{\\Delta t} = \\frac{v_f - v_i}{\\Delta t}\\).<br><b>Kinematics equations (constant acceleration):</b> \\(v_f = v_i + at\\); \\(d = v_i t + \\frac{1}{2} a t^2\\); \\(v_f^2 = v_i^2 + 2ad\\); \\(d = \\frac{v_i + v_f}{2} t\\). For free fall near Earth's surface, \\(a = 9.8\\) m/s\\(^2\\) toward the ground.<br><b>Graphs:</b> the slope of a position-time graph is the velocity; the slope of a velocity-time graph is the acceleration; the area under a velocity-time graph is the displacement.<br><b>Relative motion:</b> velocities add or subtract along the line of motion. An object's velocity relative to the ground is its velocity relative to a moving medium plus the medium's velocity relative to the ground.",
   "2": "<b>Newton's second law:</b> \\(F_{net} = ma\\). Weight is \\(F_g = mg\\) with \\(g = 9.8\\) m/s\\(^2\\). The normal force balances the forces pressing a surface together; on a slope it is the component of the weight perpendicular to the surface.<br><b>Friction:</b> kinetic and static friction are \\(f = \\mu F_N\\). Friction opposes the motion (kinetic) or the attempted motion (static).<br><b>Components:</b> a force \\(F\\) at an angle \\(\\theta\\) to the horizontal has components \\(F_x = F \\cos \\theta\\) and \\(F_y = F \\sin \\theta\\).<br><b>Momentum and impulse:</b> \\(p = mv\\); impulse \\(J = F \\Delta t = \\Delta p = m v_f - m v_i\\). The area under a force-time graph is the impulse. Total momentum is conserved in collisions and explosions when no outside impulse acts: \\(m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}\\).",
   "3": "<b>Work:</b> \\(W = F d \\cos \\theta\\), where \\(\\theta\\) is the angle between the force and the displacement. Lifting at constant velocity, the work done equals the gain in gravitational potential energy.<br><b>Energy:</b> \\(E_k = \\frac{1}{2} m v^2\\); \\(E_p = mgh\\) (height measured from a chosen reference level); mechanical energy \\(E = E_k + E_p\\). The work-energy theorem: net work equals the change in kinetic energy, \\(W_{net} = \\Delta E_k\\). With friction, the energy lost to heat is the friction force times the distance.<br><b>Power and efficiency:</b> \\(P = \\frac{W}{\\Delta t} = \\frac{\\Delta E}{\\Delta t}\\), and for a force at constant speed \\(P = Fv\\). Percent efficiency \\(= \\frac{E_{useful\\ out}}{E_{in}} \\times 100\\%\\).<br><b>Springs:</b> Hooke's law \\(F = kx\\) (magnitude); elastic potential energy \\(E_s = \\frac{1}{2} k x^2\\). For a mass on a horizontal spring, acceleration in simple harmonic motion is \\(a = -\\frac{k}{m} x\\), greatest at the extremes and zero at equilibrium.<br><b>Nuclear:</b> after \\(n\\) half-lives, the amount remaining is \\(N = N_0 \\left( \\frac{1}{2} \\right)^n\\). Mass-energy equivalence: \\(E = mc^2\\) with \\(c = 3.00 \\times 10^8\\) m/s.",
   "4": "<b>Wave basics:</b> \\(v = f \\lambda\\) and \\(T = \\frac{1}{f}\\). In a transverse wave the particles move perpendicular to the energy travel; in a longitudinal wave they move parallel to it. The speed of sound in air is about \\(v = 331 + 0.6 \\, T\\) m/s, with \\(T\\) the air temperature in °C.<br><b>Standing waves and resonance:</b> a fixed end reflects a pulse inverted. In a closed air column the resonant lengths are \\(\\frac{\\lambda}{4}, \\frac{3\\lambda}{4}, \\frac{5\\lambda}{4}, \\dots\\); in an open air column they are \\(\\frac{\\lambda}{2}, \\lambda, \\frac{3\\lambda}{2}, \\dots\\). On a string fixed at both ends the harmonics have wavelengths \\(\\frac{2L}{n}\\) for \\(n = 1, 2, 3, \\dots\\).<br><b>Double slit (maxima only):</b> bright fringes satisfy \\(m \\lambda = \\frac{x d}{L}\\), where \\(x\\) is the distance from the central maximum to the \\(m\\)-th bright fringe, \\(d\\) the slit separation and \\(L\\) the screen distance.<br><b>Doppler effect (sound):</b> \\(f' = f \\frac{v + v_o}{v - v_s}\\), taking the numerator sign as positive when the observer moves toward the source and the denominator sign as positive (subtracting \\(v_s\\)) when the source moves toward the observer; reverse either sign for motion away.<br><b>Refraction:</b> \\(n = \\frac{c}{v}\\); Snell's law \\(n_1 \\sin \\theta_1 = n_2 \\sin \\theta_2\\). Entering a slower medium, light bends toward the normal. Total internal reflection needs light travelling toward a faster medium at an angle above the critical angle, \\(\\sin \\theta_c = \\frac{n_2}{n_1}\\).",
   "5": "<b>Science 1206 review:</b> average speed \\(= \\frac{\\text{total distance}}{\\text{total time}}\\). The slope of a distance-time graph is the speed; a velocity-time graph's area is the displacement. To convert km/h to m/s, divide by 3.6; to convert m/s to km/h, multiply by 3.6. Scalars have size only (distance, speed, mass); vectors have size and direction (displacement, velocity, force)."
  }
},

"bio-3201": {
  id: "bio-3201",
  title: "Biology 3201 Review: Practice Question Bank",
  shortName: "Biology 3201",
  storagePrefix: "bio3201",
  reportName: "Biology 3201",
  language: "en",
  bankFile: "bio-3201.js",
  subject: "Science",
  grade: 12,
  listed: true,
  panels: {},

  units: {
    1: "Cell Reproduction and the Continuity of Life",
    2: "Genetic Basis of Heredity",
    3: "Evolutionary Change and Biodiversity"
  },

  /* The 40 tested indicators: the 30 Knowledge outcomes (5.x, 6.x
     and 7.x) plus the STSE outcomes that carry questions in the
     review books (8.1 to 8.8 in Unit 1, 9.1 and 9.2 in Unit 2),
     grouped inside their units the way the curriculum guide groups
     them. Names are the review books' chapter titles (the STSE
     chapters carry their STSE prefix); shared chapters give the
     split names for 6.9/6.10, 7.3/7.4 and 7.6/7.7. The remaining
     STSE outcomes (8.9, 9.3 to 9.8 and Unit 3's 10.x) carry no book
     questions and are not registered. */
  indicators: {
    "5.1": "Mitosis and the Cell Cycle",
    "5.2": "The Cell Cycle and Cancer",
    "5.3": "Treatment Decisions and Values",
    "5.4": "Meiosis",
    "5.5": "Spermatogenesis and Oogenesis",
    "5.6": "Reproductive Strategies",
    "5.7": "Human Reproductive Systems",
    "5.8": "The Human Reproductive Cycle",
    "5.9": "Human Development",
    "5.10": "Reproductive Technologies",
    "8.1": "STSE: Scientific Questions and Technological Problems",
    "8.2": "STSE: Cancer Therapies",
    "8.3": "STSE: Analyzing Natural Systems",
    "8.4": "STSE: Prenatal Screening Technologies",
    "8.5": "STSE: Making the Case",
    "8.6": "STSE: Risks and Benefits to Society",
    "8.7": "STSE: Funding Decisions",
    "8.8": "STSE: Stem Cells and Society",
    "6.1": "Mendel and the Concept of the Gene",
    "6.2": "Mendelian Genetics and Crosses",
    "6.3": "Chromosomes and the Extensions of Mendel",
    "6.4": "Pedigrees and Genetic Disorders",
    "6.5": "DNA and RNA Structure",
    "6.6": "DNA Replication",
    "6.7": "Protein Synthesis",
    "6.8": "Mutations",
    "6.9": "Mutagens",
    "6.10": "Genetic Technologies",
    "9.1": "STSE: How Science Explains",
    "9.2": "STSE: Evidence, Theories and Paradigms",
    "7.1": "Natural Selection and Biodiversity",
    "7.2": "History of Evolutionary Thought",
    "7.3": "Evidence for Evolution",
    "7.4": "Evidence for Evolution",
    "7.5": "How Species Evolve",
    "7.6": "Pace of Evolution",
    "7.7": "Hardy-Weinberg",
    "7.8": "Causes of Gene Pool Change",
    "7.9": "Taxonomy and Classification",
    "7.10": "Vertebrate Anatomy and Physiology"
  },

  unitInd: {
    1: ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"],
    2: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "9.1", "9.2"],
    3: ["7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10"]
  },

  /* Staged hints: every converted entry carries its review book's
     Hint panel as the first hint stage. */
  hints: true,

  /* The course Table of Specifications band is 30/50/20 (PEP memo
     summary table), so the level mix starts there instead of at the
     chassis default of 20/60/20. */
  defaultMix: [30, 50, 20],

  timerNote: "2 hours",

  presets: {
    mid:   { units: [1, 2], cap: true, label: "Mid-course review (Units 1 and 2, Unit 2 to 6.4)", faceLabel: "Mid-course review (Units 1 and 2)" },
    final: { units: [2, 3], cap: true, label: "Final review (Units 2 and 3, Unit 2 from 6.5)", faceLabel: "Final review (Units 2 and 3)" }
  },

  /* Shown in the pool line while the mid-course cap is on. The cap
     holds out the Unit 2 entries the bank flags postMid (indicators
     6.5 to 6.10) whenever the mid scope is composed, the Math 2201
     mechanism. The final preset carries the matching cap
     (presets.final.cap): the bank flags the classical-half Unit 2
     entries (6.1 to 6.4 and STSE 9.1/9.2) preFinal, and the shell
     holds them out whenever the final scope is composed. */
  midNote: "Mid-course scope: Unit 2 stops at indicator 6.4, so the molecular genetics questions are held out.",

  /* Exam blueprints. The mid-course blueprint is the governing PEP
     table (EECD memo, Sep 29, 2026): 60 marks, 48 selected response
     and 12 constructed response, with per-unit level marks as
     tabled (Unit 1: 12/18/6 of 36; Unit 2 classical genetics, to
     indicator 6.4: 7/12/5 of 24). The memo gives no per-unit
     selected/constructed split; the split below (Unit 1: 28 SR +
     8 CR; Unit 2: 20 SR + 4 CR) is set to what the review books'
     CR prompts can actually sum to (Unit 1 prompts worth 4, 4 and
     3 marks; Unit 2 prompts worth 4 and 4), so a composed
     mid-course exam lands on the memo's totals exactly. The final
     blueprint is an ADOPTED BEST GUESS on the Physics 3204 pattern:
     no official final table has been published, so the final
     mirrors the mid's 60-mark shape and 30/50/20 band, split Unit 2
     (molecular genetics) 24 and Unit 3 36. If an official PEP final
     table surfaces, it replaces this guess outright. The final
     preset's cap holds the classical half of Unit 2 out of the
     final scope, so the Unit 2 row below draws on molecular
     genetics (6.5 onward) only. */
  exam: {
    mid: {
      units: [1, 2], total: 60, srCount: 48, crMarks: 12,
      perUnit: {
        1: { sr: 28, cr: 8, levels: [12, 18, 6] },
        2: { sr: 20, cr: 4, levels: [7, 12, 5] }
      }
    },
    final: {
      units: [2, 3], total: 60, srCount: 48, crMarks: 12,
      perUnit: {
        2: { sr: 19, cr: 5, levels: [7, 12, 5] },
        3: { sr: 29, cr: 7, levels: [11, 18, 7] }
      }
    },
    fallback: { srCount: 48, crMarks: 12 }
  },

  /* Shown with the pool information whenever the final scope is selected. */
  finalNote: "Note: the final exam covers Unit 2 from indicator 6.5 (molecular genetics) plus Unit 3, and this preset's pool matches that scope: the classical genetics questions are held out. No official Table of Specifications has been published for the Biology 3201 final, so this preset uses an adopted best guess (60 marks in the mid-course shape, Unit 2 worth 24 and Unit 3 worth 36, at the course's 30/50/20 level split). If an official table is published, it replaces this guess.",

  unitTest: { total: 25, sr: 11, cr: 14 }
},

"bio-2201": {
  id: "bio-2201",
  title: "Biology 2201 Review: Practice Question Bank",
  shortName: "Biology 2201",
  storagePrefix: "bio2201",
  reportName: "Biology 2201",
  language: "en",
  bankFile: "bio-2201.js",
  subject: "Science",
  grade: 11,
  listed: true,
  panels: {},

  units: {
    1: "Ecosystem Interactions and Population Dynamics",
    2: "Processes that Sustain Life",
    3: "Maintaining Dynamic Equilibrium"
  },

  /* The 35 tested indicators: every Knowledge outcome (5.x, 6.x and
     7.x) plus the STSE outcomes that carry questions in the review
     books (8.1 to 8.3 in Unit 1, 9.1 to 9.5 in Unit 2), grouped
     inside their units. Names are the review books' chapter titles
     (the STSE chapters carry their STSE prefix); joint chapters
     share one name across their code pair (7.5/7.6, 7.8/7.9,
     7.12/7.13). The remaining STSE outcomes (8.4 to 8.6, 9.6 and
     Unit 3's 10.1 to 10.8) carry no book questions and are not
     registered. */
  indicators: {
    "5.1": "Energy in Ecosystems",
    "8.1": "STSE: Levels of Ecological Organization",
    "5.2": "Energy Pyramids and Trophic Levels",
    "8.2": "STSE: Energy Entering the Biosphere",
    "5.3": "Canadian Biomes",
    "5.4": "Population Growth and Sampling Techniques",
    "8.3": "STSE: Competition, Symbiosis and Non-native Species",
    "5.5": "Human Population, Carrying Capacity and Ecological Footprint",
    "6.1": "Cell Theory and Abiogenesis",
    "9.1": "STSE: Evidence, Theories and Paradigms",
    "9.2": "STSE: Communicating Scientific Results",
    "9.3": "STSE: Microscopy and the Development of Cell Theory",
    "6.2": "Prokaryotic/Eukaryotic and Plant/Animal Cells",
    "6.3": "Cell Structures Under the Microscope",
    "9.4": "STSE: Development of Microscope Technology",
    "9.5": "STSE: Magnification, Resolution and Microscope Skills",
    "6.4": "Chemical Elements and Compounds in Living Systems",
    "6.5": "Water, Glucose and ATP",
    "6.6": "Carbohydrates, Lipids and Proteins",
    "6.7": "Membrane Transport: Diffusion and Osmosis",
    "6.8": "Aerobic Respiration and Photosynthesis",
    "7.1": "Homeostasis and Feedback Mechanisms",
    "7.2": "Plant Systems and Homeostasis",
    "7.3": "Tropisms and Homeostasis",
    "7.4": "The Human Nervous System",
    "7.5": "External Factors and Nervous System Disorders",
    "7.6": "External Factors and Nervous System Disorders",
    "7.7": "The Human Endocrine System",
    "7.8": "Circulatory System and Cardiovascular Fitness",
    "7.9": "Circulatory System and Cardiovascular Fitness",
    "7.10": "Immunity, Vaccines and Antibiotics",
    "7.11": "The Human Respiratory System",
    "7.12": "Digestive System and Nutrition",
    "7.13": "Digestive System and Nutrition",
    "7.14": "The Excretory System"
  },

  unitInd: {
    1: ["5.1", "5.2", "5.3", "5.4", "5.5", "8.1", "8.2", "8.3"],
    2: ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "9.1", "9.2", "9.3", "9.4", "9.5"],
    3: ["7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10", "7.11", "7.12", "7.13", "7.14"]
  },

  /* Staged hints: every converted entry carries its review book's
     Hint panel as the first hint stage. */
  hints: true,

  /* The syllabus places the mid-course exam at the end of Unit 2
     and the final exam on Unit 3 (course assessment: Tests and
     Quizzes 35%, Other 35%, Mid-Course Exam 15%, Final Exam 15%;
     gradebook unit weights 14/21/35). Biology 2201 has no
     published Table of Specifications, so the presets are plain
     unit scopes with no caps and no imposed level blueprint:
     practice and composed papers draw proportionally from the
     selected units. The review books contain no constructed
     response, so the course launches selected-response only and
     the exam fallback below composes a 40-question
     selected-response paper with no CR marks demanded; a single
     unit composes a 25-question selected-response unit test. */
  presets: {
    mid:   { units: [1, 2], label: "Mid-course review (Units 1 and 2)" },
    final: { units: [3], label: "Final review (Unit 3)" }
  },

  exam: {
    fallback: { total: 40, srCount: 40, crMarks: 0 }
  },

  /* Shown with the pool information whenever the final scope is selected. */
  finalNote: "Note: the final exam covers Unit 3, and this preset's pool matches that scope. Biology 2201 has no published Table of Specifications, so this preset draws proportionally from Unit 3 with no imposed level blueprint.",

  unitTest: { total: 25, sr: 25, cr: 0 }
},

"chem-3202": {
  id: "chem-3202",
  title: "Chemistry 3202 Review: Practice Question Bank",
  shortName: "Chemistry 3202",
  storagePrefix: "c3202",
  reportName: "Chemistry 3202",
  language: "en",
  bankFile: "chem-3202.js",
  subject: "Science",
  grade: 12,
  listed: true,

  units: {
    "1": "From Kinetics to Equilibrium",
    "2": "Acids and Bases",
    "3": "Thermochemistry",
    "4": "Electrochemistry",
    "5": "Chemistry 2202 Review (prior learning)"
  },

  /* The 36 content indicators plus the four Chemistry 2202 bridging
     codes (B.1 to B.4), wording carried verbatim from the standalone
     app's curriculum map. The Integrated Skills indicators are out of
     scope, the same ruling the standalone ships with. */
  indicators: {
    "5.1": "Describe collision theory and its connection to factors involved in altering reaction rates",
    "5.2": "Identify and discuss the properties and factors which affect reaction rate",
    "5.3": "Sketch and interpret potential energy diagrams for chemical reactions",
    "5.4": "Describe a reaction mechanism and a catalyst's role in a chemical reaction",
    "5.5": "Define the concept of dynamic equilibrium as it pertains to reversible chemical reactions",
    "5.6": "Define the concept of equilibrium constant expression as it pertains to chemical systems",
    "5.7": "Explain how different factors affect chemical equilibrium",
    "6.1": "Describe various acid-base definitions up to and including the Brønsted-Lowry definition",
    "6.2": "Compare strong and weak acids and bases using the concept of equilibrium (theoretical)",
    "6.3": "Predict products of acid-base reactions",
    "6.4": "Calculate the pH of an acid or a base given its concentration, and vice versa",
    "6.5": "Compare strong and weak acids and bases using the concept of equilibrium (mathematical)",
    "6.6": "Explain how acid-base indicators function",
    "6.7": "Describe the interactions between H+ ions and OH- ions using Le Châtelier's principle",
    "6.8": "Determine the concentration of an acid or base solution using stoichiometry",
    "7.1": "Explain temperature and heat using the concept of kinetic energy and the particle model of matter",
    "7.2": "Distinguish between a system and surroundings and the relationship of each to the universe",
    "7.3": "Define specific heat",
    "7.4": "Calculate and compare the energy involved in changes of temperature",
    "7.5": "Define endothermic reaction, exothermic reaction, enthalpy, bond energy, heat of reaction, and molar enthalpy",
    "7.6": "Illustrate changes in energy of various chemical reactions, using potential energy diagrams",
    "7.7": "Calculate and compare the energy involved in changes of state and temperature",
    "7.8": "Calculate and compare the energy involved in chemical reactions",
    "7.9": "Determine experimentally the changes in energy of various chemical reactions",
    "7.10": "Compare the molar enthalpies of several combustion reactions involving organic compounds",
    "7.11": "Write and balance thermochemical equations including the combustion reactions of alkanes",
    "7.12": "Calculate the changes in energy of various chemical reactions using bond energy, heats of formation, and Hess's law",
    "8.1": "Define oxidation and reduction experimentally and theoretically",
    "8.2": "Compare oxidation-reduction reactions with other kinds of reactions",
    "8.3": "Write and balance half-reactions and net reactions for redox equations",
    "8.4": "Illustrate and label the parts of electrochemical cells and explain how they work",
    "8.5": "Compare galvanic and electrolytic cells in terms of energy efficiency, electron flow/transfer, and chemical change",
    "8.6": "Predict whether oxidation-reduction reactions are spontaneous based on their reduction potentials",
    "8.7": "Predict the voltage of various electrochemical cells",
    "8.8": "Explain the processes of electrolysis and electroplating",
    "8.9": "Explain how electrical energy is produced in a hydrogen fuel cell",
    "B.1": "Chemistry 2202 review: moles and molar mass",
    "B.2": "Chemistry 2202 review: concentration and dilution",
    "B.3": "Chemistry 2202 review: stoichiometry and yield",
    "B.4": "Chemistry 2202 review: solubility and equilibrium basics"
  },

  unitInd: {
    "1": [
      "5.1",
      "5.2",
      "5.3",
      "5.4",
      "5.5",
      "5.6",
      "5.7"
    ],
    "2": [
      "6.1",
      "6.2",
      "6.3",
      "6.4",
      "6.5",
      "6.6",
      "6.7",
      "6.8"
    ],
    "3": [
      "7.1",
      "7.2",
      "7.3",
      "7.4",
      "7.5",
      "7.6",
      "7.7",
      "7.8",
      "7.9",
      "7.10",
      "7.11",
      "7.12"
    ],
    "4": [
      "8.1",
      "8.2",
      "8.3",
      "8.4",
      "8.5",
      "8.6",
      "8.7",
      "8.8",
      "8.9"
    ],
    "5": [
      "B.1",
      "B.2",
      "B.3",
      "B.4"
    ]
  },

  /* The one preset is the provincial exam review, wired onto the
     chassis mid button exactly as the standalone wires it. There is
     no final preset: the course final is the provincial exam, and no
     mid-course structure for this course could be verified from the
     sources (the standalone says the same). The shell hides the Final
     button for a course whose config has no presets.final. */
  presets: {
    mid: { units: [1, 2, 3, 4], label: "Provincial exam review (all units)" }
  },

  /* The All preset in the standalone app selects the four content
     units only: the Chemistry 2202 Review unit is practice-only. */
  allUnits: [1, 2, 3, 4],

  /* Exam blueprint, translated from the standalone app's composer
     (chem-3202-review/snippets/composeexam.js.txt). The provincial
     paper is 100 marks: Part I is 50 selected response at 20/60/20 by
     level, Part II is 50 constructed response at Levels 2 and 3 only,
     composed in per-unit parts of 11/14/13/12 SR and 11/14/13/12 CR.
     The per-unit level totals below are each part's own SR level
     targets (levelTargets at 20/60/20) plus its CR split at the
     standalone composer's first Level 3 preference for that part
     (5, 6, 6 and 5 marks). Any other multi-unit selection uses the
     standalone's pooled fallback: 30 selected response, 20
     constructed response. */
  exam: {
    provincial: {
      units: [1, 2, 3, 4], total: 100, srCount: 50, crMarks: 50,
      perUnit: {
        1: { sr: 11, cr: 11, levels: [2, 13, 7] },
        2: { sr: 14, cr: 14, levels: [3, 16, 9] },
        3: { sr: 13, cr: 13, levels: [3, 15, 8] },
        4: { sr: 12, cr: 12, levels: [3, 14, 7] }
      }
    },
    fallback: { srCount: 30, crMarks: 20 }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels carried verbatim from the standalone app (its
     chemistry data sheet content, one panel per unit). */
  panels: {
    "1": "<b>Collision theory:</b> a reaction occurs when particles collide with the correct orientation and with energy at least equal to the activation energy. Raising temperature, concentration or surface area, or adding a catalyst, increases the number of successful collisions per second.<br><b>Potential energy diagrams:</b> activation energy (forward) is the rise from reactants to the peak; \\(\\Delta H\\) is the energy of the products minus the energy of the reactants; activation energy (reverse) equals activation energy (forward) minus \\(\\Delta H\\). A catalyst lowers both activation energies and leaves \\(\\Delta H\\) unchanged.<br><b>Equilibrium constant:</b> for \\(aA + bB \\rightleftharpoons cC + dD\\), \\(K = \\frac{[C]^c[D]^d}{[A]^a[B]^b}\\). Pure solids and pure liquids are left out. \\(K \\gg 1\\): products are favoured. \\(K \\ll 1\\): reactants are favoured. Only temperature changes the value of K.",
    "2": "<b>Water equilibrium:</b> \\(K_w = [H_3O^+][OH^-] = 1.0 \\times 10^{-14}\\) at 25 °C, and \\(pH + pOH = 14.00\\). \\(pH = -\\log[H_3O^+]\\). Each pH unit is a tenfold change in concentration. The decimal places in a pH value equal the significant figures in the concentration.<br><b>Selected \\(K_a\\) values:</b> HF \\(3.5 \\times 10^{-4}\\); benzoic acid \\(6.3 \\times 10^{-5}\\); acetic acid \\(1.8 \\times 10^{-5}\\); carbonic acid (first proton) \\(4.3 \\times 10^{-7}\\); HCN \\(6.2 \\times 10^{-10}\\); ammonium ion \\(5.6 \\times 10^{-10}\\).<br><b>Selected \\(K_b\\) values:</b> ammonia \\(1.8 \\times 10^{-5}\\); cyanide ion \\(1.6 \\times 10^{-5}\\); acetate ion \\(5.6 \\times 10^{-10}\\); fluoride ion \\(2.9 \\times 10^{-11}\\). For a conjugate pair, \\(K_a \\times K_b = K_w\\).<br><b>Assumption check:</b> if \\(\\frac{[\\text{acid}]_{initial}}{K_a} > 500\\), the amount that reacts is negligible beside the starting concentration and the equilibrium concentration can be taken as the starting concentration.",
    "3": "<b>Heat:</b> \\(q = mc\\Delta T\\), with \\(c\\) the specific heat capacity. For water, \\(c = 4.18\\) J/(g·°C). Heat lost by one part equals heat gained by the other in an insulated calorimeter. For a reaction, \\(\\Delta H = \\frac{q}{n}\\), and the sign follows the system: exothermic \\(\\Delta H < 0\\).<br><b>Changes of state (water):</b> molar heat of fusion \\(6.01\\) kJ/mol (334 J/g); molar heat of vaporization \\(40.7\\) kJ/mol (\\(2.26 \\times 10^3\\) J/g). During a change of state the temperature stays constant.<br><b>Hess's law:</b> \\(\\Delta H\\) for a reaction is the sum of the \\(\\Delta H\\) values of the steps that add to it. Reversing an equation changes the sign of \\(\\Delta H\\); multiplying an equation by a factor multiplies \\(\\Delta H\\) by the same factor. From formation enthalpies: \\(\\Delta H = \\sum \\Delta H_f(\\text{products}) - \\sum \\Delta H_f(\\text{reactants})\\). From bond energies: \\(\\Delta H = \\sum BE(\\text{bonds broken}) - \\sum BE(\\text{bonds formed})\\).<br><b>Average bond energies (kJ/mol):</b> H-H 436, Cl-Cl 242, H-Cl 431, O=O 498, O-H 463, C-H 413, C-C 348, C=C 614, C\\(\\equiv\\)C 839, N\\(\\equiv\\)N 946, N-H 391, C=O 799.",
    "4": "<b>Cell voltages:</b> \\(E^\\circ_{cell} = E^\\circ(\\text{cathode}) - E^\\circ(\\text{anode})\\), using reduction potentials. A positive \\(E^\\circ_{cell}\\) means the reaction is spontaneous as written. Reduction potentials are never multiplied when a half-reaction is scaled.<br><b>Standard reduction potentials (V):</b> F&#8322;/F&#8315; +2.87, Cl&#8322;/Cl&#8315; +1.36, Br&#8322;/Br&#8315; +1.07, Ag&#8314;/Ag +0.80, Fe&#179;&#8314;/Fe&#178;&#8314; +0.77, Cu&#178;&#8314;/Cu +0.34, H&#8314;/H&#8322; 0.00, Pb&#178;&#8314;/Pb -0.13, Ni&#178;&#8314;/Ni -0.25, Fe&#178;&#8314;/Fe -0.44, Zn&#178;&#8314;/Zn -0.76, Mn&#178;&#8314;/Mn -1.18, Al&#179;&#8314;/Al -1.66, Mg&#178;&#8314;/Mg -2.37, Na&#8314;/Na -2.71, Ca&#178;&#8314;/Ca -2.87, Li&#8314;/Li -3.04.<br><b>Electrolysis:</b> charge \\(Q = It\\) (coulombs = amperes \\(\\times\\) seconds). One mole of electrons carries \\(9.65 \\times 10^4\\) C (the Faraday constant). In a galvanic cell the anode is negative and oxidation happens there; in an electrolytic cell the anode is positive and oxidation still happens there.",
    "5": "<b>Chemistry 2202 review:</b> \\(n = \\frac{m}{M}\\) &nbsp; \\(N = n \\times 6.022 \\times 10^{23}\\) &nbsp; \\(c = \\frac{n}{V}\\) &nbsp; \\(c_1V_1 = c_2V_2\\) &nbsp; Percent yield \\(= \\frac{\\text{actual}}{\\text{theoretical}} \\times 100\\%\\).<br><b>Atomic masses (g/mol):</b> H 1.01, C 12.01, N 14.01, O 16.00, F 19.00, Na 22.99, Mg 24.31, Al 26.98, P 30.97, S 32.07, Cl 35.45, K 39.10, Ca 40.08, Fe 55.85, Cu 63.55, Zn 65.39, Br 79.90, Ag 107.87, I 126.90, Ba 137.33, Pb 207.20"
  }
},

"chem-2202": {
  id: "chem-2202",
  title: "Chemistry 2202 Review: Practice Question Bank",
  shortName: "Chemistry 2202",
  storagePrefix: "c2202",
  reportName: "Chemistry 2202",
  language: "en",
  bankFile: "chem-2202.js",
  subject: "Science",
  grade: 11,
  listed: true,

  units: {
    "1": "Stoichiometry",
    "2": "From Structures to Properties",
    "3": "Organic Chemistry",
    "4": "Science 1206 Review (prior learning)"
  },

  /* The 31 content indicators plus the three Science 1206 bridging
     codes (B.1 to B.3), wording carried verbatim from the standalone
     app's curriculum map (chem-2202-review/snippets/curriculum.js.txt).
     The Integrated Skills indicators are out of scope, the same ruling
     the standalone ships with. */
  indicators: {
    "5.1": "Write and name the formulas of ionic and molecular compounds, following simple IUPAC rules",
    "5.2": "Define molar mass and perform mole-mass inter-conversions for pure substances",
    "5.3": "Explain solubility, using the concept of equilibrium",
    "5.4": "Define the concept of equilibrium as it pertains to solutions",
    "5.5": "Explain the variations in the solubility of various pure substances, given the same solvent",
    "5.6": "Use the solubility generalizations to predict the formation of precipitates",
    "5.7": "Identify mole ratios of reactants and products from balanced chemical equations",
    "5.8": "Perform stoichiometric calculations related to chemical equations",
    "5.9": "Predict how the yield of a particular chemical process can be maximized",
    "5.10": "Identify various stoichiometric applications",
    "6.1": "Illustrate and explain the formation of covalent bonds",
    "6.2": "Explain the structural model of a molecular substance in terms of the various electron pairs that define it",
    "6.3": "Illustrate and explain hydrogen bonds and van der Waals' forces",
    "6.4": "Identify and describe the properties of molecular substances",
    "6.5": "Describe how intermolecular forces account for the properties of molecular compounds",
    "6.6": "Illustrate and explain the formation of ionic bonds",
    "6.7": "Explain the structural model of an ionic substance in terms of the various bonds that define it",
    "6.8": "Identify and describe the properties of ionic substances and relate them to ionic bonding and their structure",
    "6.9": "Illustrate and explain the formation of metallic bonds and how their structure accounts for the properties of metallic substances",
    "6.10": "Describe the process of dissolving, using concepts of intramolecular and intermolecular forces",
    "6.11": "Determine the molar solubility of a pure substance in water",
    "6.12": "Explain the effect of solutes on the melting point of solid water, using intermolecular forces",
    "6.13": "Classify ionic, molecular, and metallic substances according to their properties",
    "7.1": "Explain the large number and diversity of organic compounds with reference to the unique nature of the carbon atom",
    "7.2": "Classify various organic compounds by determining to which families they belong, based on their names or structures",
    "7.3": "Write the formula and provide the IUPAC name for a variety of aliphatic compounds",
    "7.4": "Define isomers and illustrate the structural formulas for a variety of organic isomers",
    "7.5": "Write the formula and provide the IUPAC name for a variety of aromatic compounds",
    "7.6": "Write the formula and provide the IUPAC name for a variety of hydrocarbon derivatives",
    "7.7": "Write and balance chemical equations to predict the reactions of selected organic compounds",
    "7.8": "Describe processes of polymerization and identify some important natural and synthetic polymers",
    "B.1": "Science 1206 review: isotopes and subatomic particles",
    "B.2": "Science 1206 review: average atomic mass",
    "B.3": "Science 1206 review: naming compounds and writing formulas"
  },

  unitInd: {
    "1": [
      "5.1",
      "5.2",
      "5.3",
      "5.4",
      "5.5",
      "5.6",
      "5.7",
      "5.8",
      "5.9",
      "5.10"
    ],
    "2": [
      "6.1",
      "6.2",
      "6.3",
      "6.4",
      "6.5",
      "6.6",
      "6.7",
      "6.8",
      "6.9",
      "6.10",
      "6.11",
      "6.12",
      "6.13"
    ],
    "3": [
      "7.1",
      "7.2",
      "7.3",
      "7.4",
      "7.5",
      "7.6",
      "7.7",
      "7.8"
    ],
    "4": [
      "B.1",
      "B.2",
      "B.3"
    ]
  },

  /* Presets, wired from the standalone app's preset handlers
     (chem-2202-review/build.py): mid selects Units 1 and 2, final
     selects Unit 3 alone (an exam built from it is a single-unit
     paper, the unit test below, exactly as in the standalone, whose
     own verifier trials the final preset as 11 SR + 14 CR). The face
     scope wording derives from the labels, matching the standalone's
     scope strings ("Mid-course review: Units 1 and 2", "Final review:
     Unit 3"), so no faceLabel is needed. Neither preset carries a
     level mix, and the builder default stays 20/60/20. */
  presets: {
    mid: { units: [1, 2], label: "Mid-course review (Units 1 and 2)" },
    final: { units: [3], label: "Final review (Unit 3)" }
  },

  /* The All preset in the standalone app selects the three content
     units only: the Science 1206 Review unit is practice-only (its
     bank header says it is kept out of the mid and final presets, and
     the standalone's All handler selects [1,2,3]). */
  allUnits: [1, 2, 3],

  /* Exam blueprint, translated from the standalone app's composer
     (chem-2202-review/snippets/composeexam.js.txt, plan branches at
     lines 12 to 17). A single unit is a practice unit test (below).
     The mid-course plan follows the 2026/27 mid-course table of
     specifications the standalone composer cites: Units 1 and 2, 50
     marks (30 selected response, 20 constructed response), weighted
     45 marks to Unit 1 and 5 marks to Unit 2, cognitive levels
     20/60/20, composed as two unit parts (Unit 1: SR levelTargets
     (27) = [6,16,5], CR 18 with Level 3 steered to 4 first; Unit 2:
     SR levelTargets(3) = [1,2,0], CR 2 at Level 2). The per-unit
     level totals below are each part's own SR level targets plus its
     CR split at the standalone composer's first Level 3 preference,
     the same encoding as the Chemistry 3202 scope. Any other
     multi-unit selection uses the standalone's pooled fallback:
     30 selected response, 20 constructed response. */
  exam: {
    mid: {
      units: [1, 2], total: 50,
      perUnit: {
        1: { sr: 27, cr: 18, levels: [6, 30, 9] },
        2: { sr: 3, cr: 2, levels: [1, 4, 0] }
      }
    },
    fallback: { srCount: 30, crMarks: 20 }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels carried verbatim from the standalone app (its
     chemistry data sheet content, one panel per unit, from
     chem-2202-review/snippets/refhtml.js.txt). */
  panels: {
    "1": "<b>Stoichiometry:</b> \\(n = \\frac{m}{M}\\) &nbsp; \\(N = n \\times 6.022 \\times 10^{23}\\) &nbsp; Molar volume at STP: 22.4 L/mol<br>\\(c = \\frac{n}{V}\\) &nbsp; \\(c_1V_1 = c_2V_2\\) &nbsp; Percent yield \\(= \\frac{\\text{actual}}{\\text{theoretical}} \\times 100\\%\\)<br><b>Solubility generalizations:</b> compounds of the alkali metals and ammonium are soluble; nitrates and acetates are soluble; chlorides, bromides and iodides are soluble except with silver, lead and mercury(I); sulfates are soluble except with barium, lead and (slightly) calcium; carbonates, phosphates, sulfides and hydroxides are insoluble except with the alkali metals and ammonium.<br><b>Atomic masses (g/mol):</b> H 1.01, C 12.01, N 14.01, O 16.00, F 19.00, Na 22.99, Mg 24.31, Al 26.98, P 30.97, S 32.07, Cl 35.45, K 39.10, Ca 40.08, Fe 55.85, Cu 63.55, Zn 65.39, Br 79.90, Ag 107.87, I 126.90, Ba 137.33, Pb 207.20",
    "2": "<b>VSEPR shapes:</b> 2 electron pairs: linear, 180 degrees. 3 pairs: trigonal planar, 120 degrees; with one lone pair, bent. 4 pairs: tetrahedral, 109.5 degrees; with one lone pair, trigonal pyramidal, about 107 degrees; with two lone pairs, bent, about 104.5 degrees.<br><b>Intermolecular forces, weakest to strongest:</b> London dispersion forces, dipole to dipole forces, hydrogen bonding (hydrogen bonded to N, O or F). Stronger intermolecular forces mean higher melting and boiling points.<br><b>Conductivity:</b> ionic compounds conduct when molten or dissolved in water, never as a solid; molecular compounds do not conduct; metals conduct as solids and liquids.<br><b>Atomic masses (g/mol):</b> H 1.01, C 12.01, N 14.01, O 16.00, F 19.00, Na 22.99, Mg 24.31, Al 26.98, P 30.97, S 32.07, Cl 35.45, K 39.10, Ca 40.08, Fe 55.85, Cu 63.55, Zn 65.39, Br 79.90, Ag 107.87, I 126.90, Ba 137.33, Pb 207.20",
    "3": "<b>General formulas:</b> alkanes CₙH₂ₙ₊₂, alkenes CₙH₂ₙ, alkynes CₙH₂ₙ₋₂, cycloalkanes CₙH₂ₙ.<br><b>Functional groups:</b> alcohol R-OH, carboxylic acid R-COOH, ester R-COO-R, aldehyde R-CHO, ketone R-CO-R, ether R-O-R, amine R-NH₂.<br><b>Reaction types:</b> combustion (a fuel reacts with oxygen to give carbon dioxide and water), addition (a multiple bond opens and atoms add across it), esterification (a carboxylic acid and an alcohol give an ester and water), cracking (a large molecule splits into smaller molecules).",
    "4": "<b>Science 1206 review:</b> neutrons = mass number - atomic number. In a neutral atom, electrons = protons = atomic number. The average atomic mass on the periodic table is the weighted average of the masses of the element's isotopes."
  }
},

"math-3200": {
  id: "math-3200",
  title: "Math 3200 Review: Practice Question Bank",
  shortName: "Math 3200",
  storagePrefix: "m3200",
  reportName: "Math 3200",
  language: "en",
  bankFile: "math-3200.js",
  subject: "Mathematics",
  grade: 12,
  listed: true,

  units: {
    "1": "Polynomial Functions",
    "2": "Function Transformations",
    "3": "Radical Functions",
    "4": "Trigonometry and the Unit Circle",
    "5": "Trigonometric Functions and Graphs",
    "6": "Trigonometric Identities",
    "7": "Exponential Functions",
    "8": "Logarithmic Functions",
    "9": "Permutations, Combinations, and the Binomial Theorem"
  },

  /* All 137 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (the codes are the provincial
     outcome numbers; several units share codes, exactly as the
     standalone's UNIT_IND lists them). */
  indicators: {
    "1.1": "Explain the relationship between logarithms and exponents",
    "1.2": "Express a logarithmic equation as an exponential equation and vice versa",
    "1.3": "Determine, without technology, the exact value of a logarithm, such as log2 8",
    "1.4": "Estimate the value of a logarithm, using benchmarks, and explain the reasoning; e.g., since log2 8 = 3 and log2 16 =...",
    "1.5": "Develop and generalize the laws of logarithms, using numeric examples and exponent laws",
    "1.6": "Derive each law of logarithms",
    "1.7": "Determine, using the laws of logarithms, an equivalent expression for a logarithmic expression",
    "1.8": "Determine, with technology, the approximate value of a logarithmic expression, such as log2 9",
    "3.1": "Explain how long division of a polynomial expression by a binomial expression of the form x - a, a in I, is related...",
    "3.2": "Divide a polynomial expression by a binomial expression of the form x − a, a ∈ I using long division or synthetic...",
    "3.3": "Explain the relationship between the remainder when a polynomial expression is divided by x − a, a ∈ I, and the value...",
    "3.4": "Explain and apply the factor theorem to express a polynomial expression as a product of factors",
    "3.5": "Explain the relationship between linear factors of a polynomial expression and the zeros of the corresponding...",
    "3.6": "Identify the polynomial functions in a set of functions, and explain the reasoning",
    "3.7": "Explain the role of the constant term and leading coefficient in the equation of a polynomial function with respect...",
    "3.8": "Generalize rules for graphing polynomial functions of odd or even degree",
    "3.9": "Explain the relationship among the zeros of a polynomial function, the roots of the corresponding polynomial...",
    "3.10": "Explain how the multiplicity of a zero of a polynomial function affects the graph",
    "3.11": "Sketch, with or without technology, the graph of a polynomial function",
    "3.12": "Solve a problem by modeling a given situation with a polynomial function",
    "3.13": "Determine the equation of a polynomial function given its graph",
    "3.14": "Explain the patterns found in the expanded form of (x + y) , n ≤ 4 and n ∈ N, by multiplying n factors of (x + y)",
    "3.15": "Explain how to determine the subsequent row in Pascal’s triangle, given any row",
    "3.16": "Relate the coefficients of the terms in the expansion of (x + y) to the (n + 1) row in Pascal’s triangle",
    "3.17": "Explain, using examples, how the coefficients of the terms in the expansion of (x + y) are determined by combinations",
    "3.18": "Expand, using the binomial theorem, (x + y)",
    "3.19": "Determine a specific term in a binomial expansion",
    "4.1": "Determine if a relation and its inverse are functions",
    "4.2": "Explain how the transformation (x, y) → (y, x) can be used to sketch the inverse of a relation",
    "4.3": "Explain how the graph of the line y = x can be used to sketch the inverse of a relation",
    "4.4": "Sketch the graph of the inverse relation, given the graph of a relation",
    "4.5": "Determine the equation and sketch the graph of the inverse relation, given the equation of a linear or quadratic...",
    "4.6": "Determine, algebraically or graphically, if two functions are inverses of each other",
    "4.7": "Explain the relationship between the domains and ranges of a relation and its inverse",
    "4.8": "Determine restrictions on the domain of a function in order for its inverse to be a function",
    "4.9": "Compare the domain and range of the function y = √f (x) to the domain and range of the function y = f (x), and...",
    "4.10": "Sketch the graph of the function y = √x, using a table of values, and state the domain and range",
    "4.11": "Sketch the graph of the function y − k = a√b (x − h) by applying transformations to the graph of the function y = √x,...",
    "4.12": "Sketch the graph of the function y = sqrt(f(x)), given the equation or graph of the function y = f(x), and explain...",
    "4.13": "Compare the graphs of a set of functions of the form y − k = f (x) to the graph of y = f (x) and generalize, using...",
    "4.14": "Compare the graphs of a set of functions of the form y = f (x − h) to the graph of y = f (x) and generalize, using...",
    "4.15": "Compare the graphs of a set of functions of the form y − k = f (x − h) to the graph of y = f (x) and generalize,...",
    "4.16": "Sketch the graph of y - k = f(x), y = f(x - h) or y - k = f(x - h) for given values of h and k, given a sketch of the...",
    "4.17": "Write the equation of a function whose graph is a vertical and/or horizontal translation of the graph of the function...",
    "4.18": "Compare the graphs of a set of functions of the form y = af (x) to the graph of y = f (x), and generalize, using...",
    "4.19": "Compare the graphs of a set of functions of the form y = f (bx) to the graph of y = f (x), and generalize, using...",
    "4.20": "Compare the graphs of a set of functions of the form y = af (bx) to the graph of y = f (x), and generalize, using...",
    "4.21": "Sketch the graph of y = af (x), y = f (bx) or y = af (bx) for given values of a and b, given a sketch of the function...",
    "4.22": "Write the equation of a function, given its graph which is a vertical and/or horizontal stretch of the graph of the...",
    "4.23": "Sketch the graph of the function y − k = af (b (x − h)) for given values of a, b, h and k, given the graph of the...",
    "4.24": "Write the equation of a function, given its graph which is a translation and/or stretch of the graph of the function...",
    "4.25": "Describe the relationship between the roots of a radical equation and the x-intercepts of the graph of the...",
    "4.26": "Determine, graphically, an approximate solution of a radical equation",
    "4.27": "Determine the solution of an exponential equation for which both sides can be written as rational powers of the same...",
    "4.28": "Determine the solution of an exponential equation in which the bases are not rational powers of one another, using a...",
    "4.29": "Solve a problem that involves exponential growth or decay",
    "4.30": "Solve a problem by modeling a situation with an exponential or a logarithmic equation",
    "4.31": "Solve a problem that involves the application of exponential equations to loans, mortgages and investments",
    "4.32": "Determine the solution of a logarithmic equation, and verify the solution",
    "4.33": "Explain why a value obtained in solving a logarithmic equation may be extraneous",
    "4.34": "Solve a problem that involves logarithmic scales, such as the Richter scale and the pH scale",
    "4.35": "Sketch, with or without technology, a graph of an exponential function of the form y = cx, c > 0, c ≠ 1",
    "4.36": "Sketch the graph of an exponential function by applying a set of transformations to the graph of y = cx, c > 0, c ≠ 1...",
    "4.37": "Demonstrate, graphically, that a logarithmic function and an exponential function with the same base are inverses of...",
    "4.38": "Sketch with or without technology, the graph of a logarithmic function of the form y = logc x, c > 1",
    "4.39": "Sketch the graph of a logarithmic function by applying a set of transformations to the graph of y = logc x, c > 1,...",
    "4.40": "Generalize the relationship between the coordinates of an ordered pair and the coordinates of the corresponding...",
    "4.41": "Sketch the reflection of the graph of a function y = f (x) through the x-axis or the y-axis, given the graph of the...",
    "4.42": "Generalize, using inductive reasoning, and explain rules for the reflection of the graph of the function y = f (x)...",
    "4.43": "Sketch the graphs of the functions y = −f (x) and y = f (−x) given the graph of the function y = f (x) where the...",
    "4.44": "Write the equation of a function, given its graph which is a reflection of the graph of the function y = f(x) through...",
    "4.45": "Generalize the relationship between the coordinates of an ordered pair and the coordinates of the corresponding...",
    "4.46": "Sketch the reflection of the graph of a function y = f (x) through the line y = x , given the graph of the function y...",
    "4.47": "Generalize, using inductive reasoning, and explain rules for the reflection of the graph of the function y = f(x)...",
    "4.48": "Identify the characteristics of the graph of an exponential function of the form y = cx, c > 0, c not 1 including the...",
    "4.49": "Identify the characteristics of the graph of a logarithmic function of the form y = logc x, c > 1, including the...",
    "7.1": "Sketch, in standard position, an angle (positive or negative) when the measure is given in degrees",
    "7.2": "Sketch, in standard position, an angle with a measure of 1 radian",
    "7.3": "Describe the relationship between radian measure and degree measure",
    "7.4": "Sketch, in standard position, an angle with a measure expressed in the form kπ radians, where k ∈ Q",
    "7.5": "Express the measure of an angle in radians (exact value or decimal approximation), given its measure in degrees",
    "7.6": "Express the measure of an angle in degrees, (exact value or decimal approximation) given its measure in radians",
    "7.7": "Determine the measures, in degrees or radians, of all angles in a given domain that are coterminal with a given angle...",
    "7.8": "Determine the general form of the measures, in degrees or radians, of all angles that are coterminal with a given...",
    "7.9": "Explain the relationship between the radian measure of an angle in standard position and the length of the arc cut on...",
    "7.10": "Derive the equation of the unit circle from the Pythagorean theorem",
    "7.11": "Generalize the equation of a circle with centre (0, 0) and radius r",
    "7.12": "Describe the six trigonometric ratios, using a point P (x, y) that is the intersection of the terminal arm of an...",
    "7.13": "Determine, with technology, the approximate value of a trigonometric ratio for any angle with a measure expressed in...",
    "7.14": "Determine, using a unit circle or reference triangle, the exact value of a trigonometric ratio for angles expressed...",
    "7.15": "Sketch a diagram to represent a problem that involves trigonometric ratios",
    "7.16": "Determine, with or without technology, the measures, in degrees or radians, of the angles in a specified domain,...",
    "7.17": "Determine the measures of the angles in a specified domain in degrees or radians, given a point on the terminal arm...",
    "7.18": "Determine the exact values of the other trigonometric ratios, given the value of one trigonometric ratio in a...",
    "7.19": "Solve a problem, using trigonometric ratios",
    "7.20": "Sketch, with or without technology, the graph of y = sin x and y = cos x",
    "7.21": "Determine the characteristics (amplitude, domain, period, range and zeros) of the graph of y = sin x and y = cos x",
    "7.22": "Determine how varying the value of a affects the graph of y = a sin x and y = a cos x",
    "7.23": "Determine how varying the value of b affects the graph of y = sin bx and y = cos bx",
    "7.24": "Determine how varying the value of k affects the graph of y = sin x + k and y = cos x + k",
    "7.25": "Determine how varying the value of h affects the graph of y = sin (x − h) and y = cos (x − h)",
    "7.26": "Sketch, without technology, graphs of the form y = a sin b (x − h) + k and y = a cos b (x − h) + k using...",
    "7.27": "Determine the characteristics (amplitude, domain, period, phase shift, range and zeros) of the graph of a...",
    "7.28": "Determine the values of a, b, h and k for functions of the form y = a sin b(x - h) + k and y = a cos b(x - h) + k...",
    "7.29": "Solve a given problem by analyzing the graph of a trigonometric function",
    "7.30": "Explain how the characteristics of the graph of a trigonometric function relate to the conditions in a problem...",
    "7.31": "Determine a trigonometric function that models a situation to solve a problem",
    "7.32": "Sketch, with or without technology, the graph of y = tan x",
    "7.33": "Determine the characteristics (asymptotes, domain, period, range and zeros) of the graph of y = tan x",
    "7.34": "Determine, algebraically, the solution of a trigonometric equation, stating the solution in exact form when possible",
    "7.35": "Determine, using technology, the approximate solution of a trigonometric equation",
    "7.36": "Verify, with or without technology, that a given value is a solution to a trigonometric equation",
    "7.37": "Identify and correct errors in a solution for a trigonometric equation",
    "7.38": "Relate the general solution of a trigonometric equation to the zeros of the corresponding function (restricted to...",
    "7.39": "Explain the difference between a trigonometric identity and a trigonometric equation",
    "7.40": "Determine, graphically, the potential validity of a trigonometric identity, using technology",
    "7.41": "Determine the non-permissible values of a trigonometric identity",
    "7.42": "Verify a trigonometric identity numerically for a given value in either degrees or radians",
    "7.43": "Prove, algebraically, that a trigonometric identity is valid",
    "7.44": "Simplify trigonometric expressions using trigonometric identities",
    "7.45": "Determine, using the sum, difference and double-angle identities, the exact value of a trigonometric ratio",
    "7.46": "Explain why verifying that the two sides of a trigonometric identity are equal for given values is insufficient to...",
    "9.1": "Count the total number of possible choices that can be made, using graphic organizers such as lists and tree diagrams",
    "9.2": "Explain, using examples, why the total number of possible choices is found by multiplying rather than adding the...",
    "9.3": "Solve a simple counting problem by applying the Fundamental Counting Principle",
    "9.4": "Count, using graphic organizers such as lists and tree diagrams, the number of ways of arranging the elements of a...",
    "9.5": "Determine, in factorial notation, the number of permutations of n different elements taken n at a time to solve a...",
    "9.6": "Determine, using a variety of strategies, the number of permutations of n different elements taken r at a time to...",
    "9.7": "Explain why n must be greater than or equal to r in the notation nP r",
    "9.8": "Given a value of k, k ∈ N , solve nP r = k for either n or r",
    "9.9": "Explain, using examples, the effect on the total number of permutations when two or more elements are identical",
    "9.10": "Solve problems involving permutations with constraints",
    "9.11": "Explain, using examples, the differences between a permutation and a combination",
    "9.12": "Determine the number of combinations of n different elements taken r at a time to solve a problem",
    "9.13": "Explain why n must be greater than or equal to r in the notation nCr",
    "9.14": "Explain, using examples, why nC r = nC n−r or ( ) = ( ) r n − r",
    "9.15": "Given a value of k, solve nCr = k for either n or r"
  },

  unitInd: {
    "1": [
      "3.1",
      "3.2",
      "3.3",
      "3.4",
      "3.5",
      "3.6",
      "3.7",
      "3.8",
      "3.9",
      "3.10",
      "3.11",
      "3.12",
      "3.13"
    ],
    "2": [
      "4.1",
      "4.2",
      "4.3",
      "4.4",
      "4.5",
      "4.6",
      "4.7",
      "4.8",
      "4.13",
      "4.14",
      "4.15",
      "4.16",
      "4.17",
      "4.18",
      "4.19",
      "4.20",
      "4.21",
      "4.22",
      "4.23",
      "4.24",
      "4.40",
      "4.41",
      "4.42",
      "4.43",
      "4.44",
      "4.45",
      "4.46",
      "4.47"
    ],
    "3": [
      "4.9",
      "4.10",
      "4.11",
      "4.12",
      "4.25",
      "4.26"
    ],
    "4": [
      "7.1",
      "7.2",
      "7.3",
      "7.4",
      "7.5",
      "7.6",
      "7.7",
      "7.8",
      "7.9",
      "7.10",
      "7.11",
      "7.12",
      "7.13",
      "7.14",
      "7.15",
      "7.16",
      "7.17",
      "7.18",
      "7.19",
      "7.34",
      "7.35",
      "7.36",
      "7.37"
    ],
    "5": [
      "7.20",
      "7.21",
      "7.22",
      "7.23",
      "7.24",
      "7.25",
      "7.26",
      "7.27",
      "7.28",
      "7.29",
      "7.30",
      "7.31",
      "7.32",
      "7.33",
      "7.34",
      "7.35",
      "7.36",
      "7.38"
    ],
    "6": [
      "7.34",
      "7.35",
      "7.36",
      "7.37",
      "7.39",
      "7.40",
      "7.41",
      "7.42",
      "7.43",
      "7.44",
      "7.45",
      "7.46"
    ],
    "7": [
      "4.27",
      "4.28",
      "4.29",
      "4.30",
      "4.31",
      "4.35",
      "4.36",
      "4.48"
    ],
    "8": [
      "1.1",
      "1.2",
      "1.3",
      "1.4",
      "1.5",
      "1.6",
      "1.7",
      "1.8",
      "4.28",
      "4.29",
      "4.30",
      "4.31",
      "4.32",
      "4.33",
      "4.34",
      "4.37",
      "4.38",
      "4.39",
      "4.49"
    ],
    "9": [
      "3.14",
      "3.15",
      "3.16",
      "3.17",
      "3.18",
      "3.19",
      "9.1",
      "9.2",
      "9.3",
      "9.4",
      "9.5",
      "9.6",
      "9.7",
      "9.8",
      "9.9",
      "9.10",
      "9.11",
      "9.12",
      "9.13",
      "9.14",
      "9.15"
    ]
  },

  /* The two presets, labels and unit scopes verbatim from the
     standalone app. Each preset also sets the level mix, as the
     standalone's preset buttons do: the mid-course preset uses
     the published PEP mid-course blueprint mix (20/62/18); the
     final preset uses 20/60/20, the interim calibration the
     standalone ships because the end-of-course blueprint is not
     yet published. */
  presets: {
    mid:   { units: [1, 2, 3, 4, 5], mix: [20, 62, 18], label: "Mid-course review (Units 1 to 5)" },
    final: { units: [6, 7, 8, 9], mix: [20, 60, 20], label: "Final review (Units 6 to 9)" }
  },

  /* The standalone builder's own default level mix (its level
     inputs ship at 20/62/18, the mid-course blueprint mix). */
  defaultMix: [20, 62, 18],

  /* Exam blueprint, translated from the standalone app's composer
     (math-3200-review/index.html, composeExam, lines 7962-8019).
     That composer is pooled: it makes no distinction between the
     mid scope, the final scope and any other multi-unit
     selection. Every multi-unit paper is 50 marks: 27 selected
     response at levels 10/15/2, and 23 constructed response from
     Level 2 and Level 3 entries carrying 2 or more marks, with
     the Level 3 share of Section B steered to 7, then 8, then 9
     marks (level totals 10/31/9, the weighting the standalone's
     exam footer prints). So the course configures no per-scope
     blueprints at all: the pooled fallback below IS the exam
     blueprint, for every multi-unit selection. A single unit
     composes the unit test (see unitTest). */
  exam: {
    fallback: { srCount: 27, crMarks: 23, levels: [10, 31, 9], crL3: [7, 8, 9] }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* The Quadratic Formula panel the standalone shows regardless
     of unit selection (Jason, Nov 8, 2026), verbatim. */
  panelsAlways: "<details class=\"refpanel\"><summary>Quadratic Formula</summary><div class=\"refbody\">\\(x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}\\)</div></details>",

  /* Reference panels carried verbatim from the standalone app.
     The standalone carries panels for Units 6 to 9 only. */
  panels: {
    "6": "<b>Tangent sum and difference:</b> \\(\\tan(A+B)=\\dfrac{\\tan A+\\tan B}{1-\\tan A\\tan B}\\), \\(\\tan(A-B)=\\dfrac{\\tan A-\\tan B}{1+\\tan A\\tan B}\\).<br><b>Sine sum and difference:</b> \\(\\sin(A+B)=\\sin A\\cos B+\\cos A\\sin B\\), \\(\\sin(A-B)=\\sin A\\cos B-\\cos A\\sin B\\).<br><b>Cosine sum and difference:</b> \\(\\cos(A+B)=\\cos A\\cos B-\\sin A\\sin B\\), \\(\\cos(A-B)=\\cos A\\cos B+\\sin A\\sin B\\).<br><b>Pythagorean identities:</b> \\(\\sin^{2}\\theta+\\cos^{2}\\theta=1\\); \\(\\cot^{2}\\theta+1=\\csc^{2}\\theta\\); \\(1+\\tan^{2}\\theta=\\sec^{2}\\theta\\).<br><b>Double angle, sine:</b> \\(\\sin 2A=2\\sin A\\cos A\\).<br><b>Double angle, cosine:</b> \\(\\cos 2A=\\cos^{2}A-\\sin^{2}A\\); \\(\\cos 2A=1-2\\sin^{2}A\\); \\(\\cos 2A=2\\cos^{2}A-1\\).<br><b>Double angle, tangent:</b> \\(\\tan 2A=\\dfrac{2\\tan A}{1-\\tan^{2}A}\\).",
    "7": "<b>Compound amount:</b> \\(A=P(1+i)^{n}\\).<br>Note: any formula required for logarithmic or exponential functions will be provided per question.",
    "8": "Note: any formula required for logarithmic or exponential functions will be provided per question.",
    "9": "<b>Permutations:</b> \\({}_nP_r=\\dfrac{n!}{(n-r)!}\\).<br><b>Permutations with repeated items:</b> \\(\\dfrac{n!}{a!\\,b!\\,c!\\,\\ldots}\\).<br><b>Combinations:</b> \\({}_nC_r=\\dbinom{n}{r}=\\dfrac{n!}{(n-r)!\\,r!}\\).<br><b>Binomial Theorem:</b> \\((x+y)^n={}_nC_0(x)^n(y)^0+{}_nC_1(x)^{n-1}(y)^1+{}_nC_2(x)^{n-2}(y)^2+\\ldots+{}_nC_{n-1}(x)^1(y)^{n-1}+{}_nC_n(x)^0(y)^n\\)."
  }
},

"math-3201": {
  id: "math-3201",
  title: "Math 3201 Review: Practice Question Bank",
  shortName: "Math 3201",
  storagePrefix: "m3201",
  reportName: "Math 3201",
  language: "en",
  bankFile: "math-3201.js",
  subject: "Mathematics",
  grade: 12,
  listed: true,

  units: {
    "1": "Rational Expressions and Equations",
    "2": "Polynomial Functions",
    "3": "Sinusoidal Functions",
    "4": "Exponential Functions",
    "5": "Logarithmic Functions",
    "6": "Financial Mathematics",
    "7": "Set Theory",
    "8": "Counting Methods",
    "9": "Probability"
  },

  /* All 100 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (its header notes the codes
     were verified against the Math 3201 Curriculum Guide). */
  indicators: {
    "3.1": "For numerators and denominators that are monomials and binomials Explain why a given value is non-permissible...",
    "3.2": "For numerators and denominators that are monomials and binomials Determine the non-permissible values for a...",
    "3.3": "For numerators and denominators that are monomials and binomials Compare the strategies for writing...",
    "3.4": "For numerators and denominators that are monomials and binomials Create new rational expressions by...",
    "3.5": "For numerators and denominators that are monomials and binomials Simplify a rational expression",
    "3.6": "For numerators and denominators that are monomials and binomials Explain why the non-permissible values of a...",
    "3.7": "For numerators and denominators that are monomials and binomials Identify and correct errors in a given...",
    "3.8": "For numerators and denominators that are monomials and binomials Compare the strategies for performing a...",
    "3.9": "For numerators and denominators that are monomials and binomials Determine the non-permissible values when...",
    "3.10": "For numerators and denominators that are monomials and binomials Determine, in simplified form, the sum or...",
    "3.11": "For numerators and denominators that are monomials and binomials Determine, in simplified form, the sum or...",
    "3.12": "For numerators and denominators that are monomials and binomials Determine, in simplified form, the product...",
    "3.13": "For numerators and denominators that are monomials and binomials Determine the non-permissible values for the...",
    "3.14": "For numerators and denominators that are monomials and binomials Determine the solution to a rational...",
    "3.15": "For numerators and denominators that are monomials and binomials Explain why a value obtained in solving a...",
    "3.16": "For numerators and denominators that are monomials and binomials Solve a contextual problem that involves a...",
    "3.17": "Using polynomial functions (of degree ≤ 3) Describe, orally and in written form, the characteristics of a...",
    "3.18": "Using polynomial functions (of degree ≤ 3) Describe, orally and in written form, the characteristics of a...",
    "3.19": "Using polynomial functions (of degree ≤ 3) Match equations in a given set to their corresponding graphs",
    "3.20": "Using polynomial functions (of degree ≤ 3) Graph data, and determine the polynomial function that best...",
    "3.21": "Using polynomial functions (of degree ≤ 3) Interpret the graph of a polynomial function that models a...",
    "3.22": "Using polynomial functions (of degree ≤ 3) Solve, using technology, a contextual problem that involves data...",
    "7.1": "Demonstrate an understanding of angles expressed in degrees and radians",
    "7.2": "Describe, orally and in written form, the characteristics of a sinusoidal function by analyzing its graph",
    "7.3": "Interpret the graph of a sinusoidal function that models a situation, and explain the reasoning",
    "7.4": "Describe, orally and in written form, the characteristics of a sinusoidal function by analyzing its equation",
    "7.5": "Match equations in a given set to their corresponding graphs",
    "7.6": "Graph data, and determine the sinusoidal function that best approximates the data",
    "7.7": "Solve, using technology, a contextual problem that involves data that is best represented by graphs of...",
    "4.1": "Graph data, and determine the exponential function that best approximates the data",
    "4.3": "Interpret the graph of an exponential function that models a situation, and explain the reasoning",
    "4.5": "Solve, using technology, a contextual problem that involves data that is best represented by graphs of...",
    "4.7": "Determine the solution of an exponential equation in which the bases are powers of one another; e.g., 2x−1 =...",
    "4.8": "Determine the solution of an exponential equation in which the bases are not powers of one another; e.g.,...",
    "4.9": "Solve problems that involve the application of exponential equations",
    "4.11": "Match equations in a given set to their corresponding graphs (exponentials and logarithms)",
    "4.12": "Describe, orally and in written form, the characteristics of an exponential function by analyzing its graph",
    "4.13": "Describe, orally and in written form, the characteristics of an exponential function by analyzing its equation",
    "1.1": "Express a logarithmic equation as an exponential equation and vice versa",
    "1.2": "Determine the value of a logarithmic expression, such as log2 8, without technology",
    "1.3": "Develop the laws of logarithms, using numeric examples and the exponent laws",
    "1.4": "Determine an equivalent expression for a logarithmic expression by applying the laws of logarithms",
    "1.5": "Determine the approximate value of a logarithmic expression, such as log2 9, with technology",
    "4.2": "Graph data, and determine the logarithmic function that best approximates the data",
    "4.4": "Interpret the graph of a logarithmic function that models a situation, and explain the reasoning",
    "4.6": "Solve, using technology, a contextual problem that involves data that is best represented by graphs of...",
    "4.10": "Solve problems that involve logarithmic scales, such as the Richter scale and the pH scale",
    "4.14": "Describe, orally and in written form, the characteristics of a logarithmic function by analyzing its graph",
    "4.15": "Describe, orally and in written form, the characteristics of a logarithmic function by analyzing its equation",
    "1.6": "Explain the advantages and disadvantages of compound interest and simple interest",
    "1.7": "Identify situations that involve compound interest",
    "1.8": "Solve a contextual problem that involves compound interest",
    "1.9": "Compare, in a given situation, the total interest paid or earned for different compounding periods",
    "1.10": "Determine the total interest of a loan given the principal, interest rate and number of compounding periods",
    "1.11": "Determine, using technology, the total cost of a loan under a variety of conditions; e.g., different...",
    "1.12": "Determine, using technology, the unknown variable in compound interest loan situations",
    "1.13": "Compare and explain, using technology, different credit options that involve compound interest, including...",
    "1.14": "Identify and describe examples of assets that appreciate or depreciate",
    "1.15": "Compare, using examples, renting, leasing and buying",
    "1.16": "Justify, for a specific set of circumstances, if renting, buying or leasing would be advantageous",
    "1.17": "Solve, using technology, a contextual problem that involves cost-and-benefit analysis",
    "2.1": "Provide examples of the empty set, disjoint sets, subsets and universal sets in context, and explain the...",
    "2.2": "Organize information such as collected data and number properties, using graphic organizers, and explain the...",
    "2.3": "Explain what a specified region in a Venn diagram represents, using connecting words (and, or, not) or set...",
    "2.4": "Determine the elements in the complement, the intersection and the union of two sets",
    "2.5": "Solve a contextual problem that involves sets, and record the solution, using set notation",
    "2.6": "Identify and correct errors in a solution to a problem that involves sets",
    "2.7": "Explain how set theory is used in applications such as Internet searches, database queries, data analysis,...",
    "9.16": "Represent and solve counting problems, using a graphic organizer",
    "9.17": "Generalize, using inductive reasoning, the Fundamental Counting Principle",
    "9.18": "Identify and explain assumptions made in solving a counting problem",
    "9.19": "Solve a contextual counting problem, using the Fundamental Counting Principle, and explain the reasoning",
    "9.20": "Determine, with or without technology, the value of a factorial",
    "9.21": "Simplify a numeric or an algebraic fraction that contains factorials in both the numerator and denominator",
    "9.22": "Solve an equation that involves factorials",
    "9.23": "Represent the number of arrangements of n elements taken n at a time, using factorial notation",
    "9.24": "Determine the number of permutations of n elements taken r at a time",
    "9.25": "Generalize strategies for determining the number of permutations of n elements taken r at a time",
    "9.26": "Determine the number of permutations of n elements taken n at a time where some elements are not distinct",
    "9.27": "Explain, using examples, the effect on the total number of permutations of n elements when two or more...",
    "9.29": "Explain, using examples, why order is or is not important when solving problems that involve permutations or...",
    "9.30": "Determine the number of combinations of n elements, taken r at a time",
    "9.31": "Generalize strategies for determining the number of combinations of n elements taken r at a time",
    "9.32": "Solve a contextual problem that involves probability and combinations",
    "9.1": "Provide examples of statements of probability and odds found in fields such as media, biology, sports,...",
    "9.2": "Explain, using examples, the relationship between odds (part-part) and probability (part-whole)",
    "9.3": "Determine the probability of, or the odds for and against, an outcome in a situation",
    "9.4": "Express odds as a probability and vice versa",
    "9.5": "Solve a contextual problem that involves odds or probability",
    "9.6": "Explain, using examples, how decisions may be based on probability or odds and on subjective judgments",
    "9.7": "Classify events as mutually exclusive or non–mutually exclusive, and explain the reasoning",
    "9.8": "Determine if two events are complementary, and explain the reasoning",
    "9.9": "Represent, using set notation or graphic organizers, mutually exclusive (including complementary) and...",
    "9.10": "Solve a contextual problem that involves the probability of mutually exclusive (including complementary) or...",
    "9.11": "Create and solve a problem that involves mutually exclusive or non–mutually exclusive events",
    "9.12": "Compare, using examples, dependent and independent events",
    "9.13": "Determine the probability of two independent events",
    "9.14": "Determine the probability of an event, given the occurrence of a previous event",
    "9.15": "Create and solve a contextual problem that involves determining the probability of dependent or independent...",
    "9.28": "Solve a contextual problem that involves probability and permutations"
  },

  unitInd: {
    "1": [
      "3.1",
      "3.2",
      "3.3",
      "3.4",
      "3.5",
      "3.6",
      "3.7",
      "3.8",
      "3.9",
      "3.10",
      "3.11",
      "3.12",
      "3.13",
      "3.14",
      "3.15",
      "3.16"
    ],
    "2": [
      "3.17",
      "3.18",
      "3.19",
      "3.20",
      "3.21",
      "3.22"
    ],
    "3": [
      "7.1",
      "7.2",
      "7.3",
      "7.4",
      "7.5",
      "7.6",
      "7.7"
    ],
    "4": [
      "4.1",
      "4.3",
      "4.5",
      "4.7",
      "4.8",
      "4.9",
      "4.11",
      "4.12",
      "4.13"
    ],
    "5": [
      "1.1",
      "1.2",
      "1.3",
      "1.4",
      "1.5",
      "4.2",
      "4.4",
      "4.6",
      "4.8",
      "4.9",
      "4.10",
      "4.11",
      "4.14",
      "4.15"
    ],
    "6": [
      "1.6",
      "1.7",
      "1.8",
      "1.9",
      "1.10",
      "1.11",
      "1.12",
      "1.13",
      "1.14",
      "1.15",
      "1.16",
      "1.17"
    ],
    "7": [
      "2.1",
      "2.2",
      "2.3",
      "2.4",
      "2.5",
      "2.6",
      "2.7"
    ],
    "8": [
      "9.16",
      "9.17",
      "9.18",
      "9.19",
      "9.20",
      "9.21",
      "9.22",
      "9.23",
      "9.24",
      "9.25",
      "9.26",
      "9.27",
      "9.29",
      "9.30",
      "9.31",
      "9.32"
    ],
    "9": [
      "9.1",
      "9.2",
      "9.3",
      "9.4",
      "9.5",
      "9.6",
      "9.7",
      "9.8",
      "9.9",
      "9.10",
      "9.11",
      "9.12",
      "9.13",
      "9.14",
      "9.15",
      "9.28",
      "9.32"
    ]
  },

  /* The two presets, labels and unit scopes verbatim from the
     standalone app (builder markup lines 285 to 286; preset
     handlers at lines 7034 to 7035). Each preset also sets the
     level mix, as the standalone's preset buttons do: the
     mid-course preset uses the published PEP mid-course blueprint
     mix (20/62/18); the final preset uses 20/60/20. */
  presets: {
    mid:   { units: [1, 2, 3, 4], mix: [20, 62, 18], label: "Mid-course review (Units 1 to 4)" },
    final: { units: [5, 6, 7, 8, 9], mix: [20, 60, 20], label: "Final review (Units 5 to 9)", faceLabel: "End-of-course review (Units 5 to 9)" }
  },

  /* The standalone builder's own default level mix (its level
     inputs ship at 20/62/18, the mid-course blueprint mix). */
  defaultMix: [20, 62, 18],

  /* Exam blueprint, translated from the standalone app's composer
     (math-3201-review/index.html, composeExam, lines 5849 to 5907;
     the function is byte-identical to the Math 3200 standalone's
     composer). That composer is pooled: it makes no distinction
     between the mid scope, the final scope and any other
     multi-unit selection. Every multi-unit paper is 50 marks:
     27 selected response at levels 10/15/2, and 23 constructed
     response from Level 2 and Level 3 entries carrying 2 or more
     marks, with the Level 3 share of Section B steered to 7,
     then 8, then 9 marks (level totals 10/31/9). So the course
     configures no per-scope blueprints at all: the pooled
     fallback below IS the exam blueprint, for every multi-unit
     selection. A single unit composes the unit test (see
     unitTest). The mid-course cap never applies in this course:
     the mid scope is Units 1 to 4 whole and no entry carries a
     postMid flag (the standalone notes this at lines 4675 to
     4679). */
  exam: {
    fallback: { srCount: 27, crMarks: 23, levels: [10, 31, 9], crL3: [7, 8, 9] }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* The Quadratic Formula panel the standalone shows regardless
     of unit selection (Jason, Nov 8, 2026), verbatim. */
  panelsAlways: "<details class=\"refpanel\"><summary>Quadratic Formula</summary><div class=\"refbody\">\\(x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}\\)</div></details>",

  /* Reference panels carried verbatim from the standalone app.
     The standalone carries panels for Units 4 to 9 only. */
  panels: {
    "4": "Note: any formula required for logarithmic or exponential functions will be provided per question.",
    "5": "Note: any formula required for logarithmic or exponential functions will be provided per question.",
    "6": "<b>Compound amount:</b> \\(A = P(1+i)^n\\)<br><b>Simple interest amount:</b> \\(A = P(1+rt)\\)",
    "7": "<b>Three sets:</b> \\(n(A \\cup B \\cup C) = n(A) + n(B) + n(C) - n(A \\cap B) - n(B \\cap C) - n(A \\cap C) + n(A \\cap B \\cap C)\\)<br><b>Two sets:</b> \\(n(A \\cup B) = n(A) + n(B) - n(A \\cap B)\\)",
    "8": "<b>Combinations:</b> \\({}_nC_r = \\binom{n}{r} = \\frac{n!}{(n-r)!\\,r!}\\)<br><b>Permutations:</b> \\({}_nP_r = \\frac{n!}{(n-r)!}\\)<br><b>Permutations with repeated items:</b> \\(\\frac{n!}{a!\\,b!\\,c!\\,\\ldots}\\)",
    "9": "<b>Probability of A or B:</b> \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\)<br><b>Probability of A and B:</b> \\(P(A\\ \\text{and}\\ B) = P(A) \\times P(B)\\)<br><b>Conditional probability:</b> \\(P(A \\cap B) = P(A) \\cdot P(B \\mid A)\\)"
  }
},

"math-3202": {
  id: "math-3202",
  title: "Math 3202 Review: Practice Question Bank",
  shortName: "Math 3202",
  storagePrefix: "m3202",
  reportName: "Math 3202",
  language: "en",
  bankFile: "math-3202.js",
  subject: "Mathematics",
  grade: 12,
  listed: true,

  units: {
    "1": "Measurement",
    "2": "Linear Relationships",
    "3": "Graphing Data",
    "4": "Working with Data",
    "5": "Major Financial Purchases",
    "6": "Businesses and Taxes",
    "7": "Properties of Figures",
    "8": "Transformations",
    "9": "Trigonometry",
    "10": "Probability"
  },

  /* All 74 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (math-3202-review/index.html,
     INDICATORS at line 652; UNITS at line 651). */
  indicators: {
    "1.1": "Describe and explain various options for buying, leasing and leasing to buy a vehicle",
    "1.2": "Justify a decision related to buying, leasing or leasing to buy a vehicle, based on factors such as personal finances, intended use, maintenance, warranties, mileage and insurance",
    "1.3": "Solve, with or without technology, problems that involve the purchase, lease or lease to purchase a vehicle",
    "1.4": "Determine costs of operating a vehicle, including fixed costs, such as extended warranty, insurance and licensing, and ongoing costs, such as gas and maintenance",
    "1.5": "Identify expenses in operating a small business",
    "1.6": "Identify feasible small business options for a given community",
    "1.7": "Generate options that might improve the profitability of a small business",
    "1.8": "Determine the profit, loss and break-even point for a small business",
    "1.9": "Explain factors, such as seasonal variations and hours of operation, that might impact the profitability of a small business",
    "1.10": "Compare rental accommodation options, and explain any differences that might exist",
    "1.11": "Identify the costs associated with purchasing and maintaining a home",
    "1.12": "Compare the cost of renting and owning accommodations: within the province; within other provinces and territories",
    "1.13": "Explain why most Canadians are expected to submit an annual income tax return",
    "1.14": "Identify and explain: forms and documents required when filing an income tax return; common tax credits; common tax deductions",
    "1.15": "Examine simple income tax returns completed with or without the use of technology",
    "2.1": "Identify and describe the characteristics of a linear relation represented in a graph, table of values or number pattern",
    "2.2": "Sort a set of graphs, tables of values and/or number patterns into linear and nonlinear relations",
    "2.3": "Explain why the points should or should not be connected on the graph for a context",
    "2.4": "Relate slope and rate of change to linear relations",
    "2.5": "Identify a linear equation as having a direct or partial variation relationship",
    "2.6": "Create a table of values for a given equation of a linear relation",
    "2.7": "Solve contextual problems that involve the application of a formula for a linear relation",
    "2.8": "Write an equation for a given context, including direct or partial variation",
    "3.1": "Explain why, in a given context, a certain degree of precision is required",
    "3.2": "Explain why, in a certain context, a certain degree of accuracy is required",
    "3.3": "Explain, using examples, the difference between precision and accuracy",
    "3.4": "Analyze precision and accuracy in a contextual problem",
    "3.5": "Compare the degree of accuracy of two given instruments used to measure the same attribute",
    "3.6": "Describe, using examples, the limitations of measuring instruments used in a specific trade or industry",
    "3.7": "Relate the degree of precision to the uncertainty of a given measure",
    "3.8": "Calculate maximum and minimum values, using a given degree of tolerance in context",
    "3.9": "Solve problems that involve precision, accuracy or tolerance",
    "3.10": "Describe and illustrate angle properties of triangles",
    "3.11": "Describe and illustrate angle properties of quadrilaterals",
    "3.12": "Describe and illustrate angle properties of regular polygons",
    "3.13": "Explain, using examples, why a given property does or does not apply to certain polygons",
    "3.14": "Describe and illustrate side length properties of triangles",
    "3.15": "Describe and illustrate line symmetry in triangles, quadrilaterals and regular polygons",
    "3.16": "Identify and explain an application of the properties of polygons in construction, industrial, commercial, domestic and artistic contexts",
    "3.17": "Determine and explain whether a given image is a dilation of another given shape, using the concept of similarity",
    "3.18": "Draw, with or without technology, a dilation image for a given 2-D shape or 3-D object, and explain how the original 2-D shape or 3-D object and its image are proportional",
    "3.19": "Identify and describe the applications of transformations in construction, industrial, commercial, domestic and artistic contexts",
    "3.20": "Solve contextual problems that involve transformations",
    "3.21": "Draw the image of a 2-D shape that results from a given single transformation",
    "3.22": "Identify a single transformation that was performed, given the original 2-D shape or 3-D object and its image",
    "3.23": "Draw the image of a 2-D shape that results from a given combination of successive transformations",
    "3.24": "Explain the relationship between reflections and lines or planes of symmetry",
    "3.25": "Create, analyze and describe designs, using translations, rotations and reflections in all four quadrants of the coordinate grid",
    "5.1": "Solve problems using the sine law, when a diagram is given",
    "5.2": "Solve problems, using the cosine law, when a diagram is given",
    "5.3": "Solve problems, using the sine law or cosine law, when a diagram is given",
    "5.4": "Describe the use of the sine law and cosine law in construction, industrial, commercial and artistic applications",
    "6.1": "Determine the mean, median and mode for a set of data",
    "6.2": "Solve contextual problems that involve measures of central tendency",
    "6.3": "Identify and correct errors in a calculation of a measure of central tendency",
    "6.4": "Explain, using examples, the advantages and disadvantages of each measure of central tendency",
    "6.5": "Explain, using examples such as course marks, why some data in a set would be given a greater weighting in determining the mean",
    "6.6": "Calculate the mean of a set of numbers after allowing the data to have different weightings (weighted mean)",
    "6.7": "Identify the outlier(s) in a set of data",
    "6.8": "Explain the effect of outliers on mean, median and mode",
    "6.9": "Calculate the trimmed mean for a set of data, and justify the removal of the outliers",
    "6.10": "Explain, using examples from print and other media, how measures of central tendency and outliers are used to provide different interpretations of data",
    "6.11": "Describe the trends in the graph of a data set, including scatter plots",
    "6.12": "Solve contextual problems that require interpolation or extrapolation of information",
    "6.13": "Match given contexts with their corresponding graphs, and explain the reasoning",
    "6.14": "Create, with or without technology, a graph to represent a given or collected data set",
    "6.15": "Sort a set of scatter plots according to the trends represented (linear, nonlinear or no trend)",
    "7.1": "Calculate the probability of an event based on a data set",
    "7.2": "Express a given probability as a fraction, decimal and percent and in a statement",
    "7.3": "Explain the difference between odds and probability",
    "7.4": "Determine the probability of an event, given the odds for or against",
    "7.5": "Explain, using examples, how decisions may be based on a combination of theoretical probability calculations, experimental results and subjective judgements",
    "7.6": "Describe and explain the application of probability",
    "7.7": "Solve contextual problems that involve odds or probability"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at line 653); it agrees exactly with the codes
     the bank entries themselves carry. */
  unitInd: {
    "1": [
      "3.1",
      "3.2",
      "3.3",
      "3.4",
      "3.5",
      "3.6",
      "3.7",
      "3.8",
      "3.9"
    ],
    "2": [
      "2.1",
      "2.2",
      "2.3",
      "2.4",
      "2.5",
      "2.6",
      "2.7",
      "2.8"
    ],
    "3": [
      "6.11",
      "6.12",
      "6.13",
      "6.14",
      "6.15"
    ],
    "4": [
      "6.1",
      "6.2",
      "6.3",
      "6.4",
      "6.5",
      "6.6",
      "6.7",
      "6.8",
      "6.9",
      "6.10"
    ],
    "5": [
      "1.1",
      "1.2",
      "1.3",
      "1.4",
      "1.10",
      "1.11",
      "1.12"
    ],
    "6": [
      "1.5",
      "1.6",
      "1.7",
      "1.8",
      "1.9",
      "1.13",
      "1.14",
      "1.15"
    ],
    "7": [
      "3.10",
      "3.11",
      "3.12",
      "3.13",
      "3.14",
      "3.15",
      "3.16"
    ],
    "8": [
      "3.17",
      "3.18",
      "3.19",
      "3.20",
      "3.21",
      "3.22",
      "3.23",
      "3.24",
      "3.25"
    ],
    "9": [
      "5.1",
      "5.2",
      "5.3",
      "5.4"
    ],
    "10": [
      "7.1",
      "7.2",
      "7.3",
      "7.4",
      "7.5",
      "7.6",
      "7.7"
    ]
  },

  /* Presets: the standalone ships exactly one, "All units", on its
     presetAll button (builder markup line 287; handler line 7905,
     selecting Units 1 to 10 with no level mix change; the builder
     level inputs ship at the 20/60/20 default, lines 368 to 370).
     The shell's All wiring selects every unit in the course when
     the config carries no allUnits key, which is the same ten
     units, so the All preset needs no entry here. There is no
     mid-course or final preset in this course: the shell hides
     both buttons for a course whose config names neither. */
  presets: {},

  /* Exam blueprint, translated from the standalone app's composer
     (math-3202-review/index.html, composeExam, lines 6733 to 6775;
     UNIT_CR_TARGET at line 6724; the blueprint note at line 6391).
     This composer is not the pooled composer Math 3200 and 3201
     share: it builds single-unit tests only and returns null for
     a multi-unit selection (the standalone's startExam, line 6789,
     tells the student tests are built one unit at a time and
     points them to a practice sheet instead; the shell gives the
     same message under exam.singleOnly). A unit test is 8
     selected-response questions at 1 mark each, drawn at the exact
     level split 2/5/1 with an any-level top-up when a level runs
     short, plus exactly two constructed-response questions, both
     Level 2 or 3 carrying 2 or more marks, whose marks sum to the
     unit's target (7 to 10 marks by unit, so test totals run 15
     to 18); a pair carrying a Level 3 question is preferred. No
     table of specifications is published for this course. The
     pairCr branch of the shell's composer reproduces that
     algorithm; courses without pairCr never enter it. */
  exam: {
    singleOnly: true
  },

  unitTest: { total: 15, sr: 8, cr: 7, srLevels: [2, 5, 1], pairCr: true,
              perUnitCr: { 1: 7, 2: 9, 3: 7, 4: 8, 5: 9, 6: 8, 7: 9, 8: 10, 9: 7, 10: 8 } },

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at line 5787, one panel per unit, all ten units). */
  panels: {
    "1": "<b>Precision:</b> how finely a quantity is measured, and how closely repeated readings agree with each other.<br>\n<b>Accuracy:</b> how close a reading is to the true value. Error \\(= |\\text{reading} - \\text{true value}|\\); the smaller the error, the more accurate the reading.<br>\n<b>Judging a set of readings:</b> the spread of the readings judges precision; where the readings centre, compared with the true value, judges accuracy.<br>\n<b>Uncertainty:</b> a measurement is uncertain by plus or minus half of the smallest unit on the instrument: \\(\\text{uncertainty} = \\pm \\frac{\\text{smallest unit}}{2}\\).<br>\n<b>Interval for the true value:</b> from \\((\\text{reading} - \\text{uncertainty})\\) to \\((\\text{reading} + \\text{uncertainty})\\).<br>\n<b>Tolerance:</b> for a nominal value \\(N\\) with tolerance \\(\\pm T\\), the maximum is \\(N + T\\) and the minimum is \\(N - T\\). The width of the acceptable range is \\(2T\\).<br>\n<b>Percent tolerance:</b> first change the percent to an amount, \\(\\text{tolerance amount} = \\frac{p}{100} \\times N\\), then add or subtract it from the nominal value.<br>\n<b>Instrument limits:</b> an instrument cannot measure reliably below its smallest division, and conditions such as sag, vibration, heat expansion and poor light can limit a measurement.",
    "2": "<b>Linear relation:</b> graphs as a straight line; in a table or pattern the first differences (the change from one value to the next) are constant.<br>\n<b>Nonlinear relation:</b> the graph curves, or the first differences change from step to step.<br>\n<b>Connecting points:</b> connect the points when the quantities can take every value in between (time, volume, distance). Leave points separate when the quantities are counted in whole units (people, tickets, buses).<br>\n<b>Slope and rate of change:</b> \\(\\text{slope} = \\frac{\\text{rise}}{\\text{run}} = \\frac{\\text{change in } y}{\\text{change in } x}\\). In context it carries units, such as dollars per hour or kilometres per litre.<br>\n<b>Direct variation:</b> \\(y = mx\\). There is no fixed starting value, and the graph passes through the origin \\((0, 0)\\).<br>\n<b>Partial variation:</b> \\(y = mx + b\\) with \\(b \\neq 0\\). The value \\(b\\) is a fixed starting value, and the graph meets the \\(y\\) axis at \\((0, b)\\).<br>\n<b>Table of values:</b> substitute each \\(x\\) value into the equation and calculate \\(y\\), multiplying before adding.<br>\n<b>Solving for the input:</b> set the output equal to the formula, subtract the starting value, then divide by the rate: \\(x = \\frac{\\text{output} - b}{m}\\).",
    "3": "<b>Trends in scatter plots:</b> read the cloud of points from left to right. Rising means a positive trend, falling means a negative trend, and a scattered cloud with no pattern means no trend.<br>\n<b>Strength of a trend:</b> points close to the pattern show a strong trend; points spread widely around the pattern show a weak trend.<br>\n<b>Sorting scatter plots:</b> a straight band is a linear trend, a bending pattern is a nonlinear trend, and points with no pattern show no trend.<br>\n<b>Interpolation:</b> estimating a value between plotted or listed points, using the pattern of the nearby points.<br>\n<b>Extrapolation:</b> predicting a value beyond the plotted or listed points by extending the pattern. Predictions beyond the data are less certain, because the pattern may change.<br>\n<b>Matching a context to a graph:</b> describe the shape in sections (rising, level, falling) and match each section to what is happening in the context.<br>\n<b>Creating a graph:</b> give the graph a title, label both axes, start the value axis at 0, and use equal intervals on each axis.<br>\n<b>Choosing a scale:</b> scale step \\(\\times\\) number of intervals must reach at least the largest value. Pick the smallest tidy step (1, 2, 5, 10, 20, 25, 50, ...) that does this.<br>\n<b>Choosing a graph type:</b> bar graph for comparing categories, line graph for change over time, scatter plot for paired number data, circle graph for parts of a whole.",
    "4": "<b>Mean:</b> \\(\\text{mean} = \\frac{\\text{sum of the values}}{\\text{number of values}}\\). It uses every value and is pulled toward extreme values.<br>\n<b>Median:</b> the middle value when the data are written in order. For an even count, average the two middle values. It resists outliers.<br>\n<b>Mode:</b> the value that occurs most often. A data set can have no mode or more than one mode.<br>\n<b>Finding a missing value from a mean:</b> total \\(=\\) mean \\(\\times\\) number of values, then subtract the known values.<br>\n<b>Weighted mean:</b> \\(\\text{weighted mean} = \\frac{\\sum (\\text{value} \\times \\text{weight})}{\\sum \\text{weights}}\\). With percent weights, divide by 100. Weights state how much each part counts.<br>\n<b>Outlier:</b> a value that lies far away from the cluster of the other values.<br>\n<b>Effect of outliers:</b> an outlier pulls the mean toward it, moves the median little or not at all, and usually leaves the mode unchanged.<br>\n<b>Trimmed mean:</b> drop the stated number of highest and lowest values, then find the mean of what remains. Trimming stops single extreme scores from dragging the result.<br>\n<b>Reading media claims:</b> when the mean and median differ a lot, extreme values are pulling the mean. Ask which measure better matches a typical case.",
    "5": "<b>Buying a vehicle:</b> buying outright means paying the full price at once; buying with a loan means owning the vehicle while repaying borrowed money plus interest; leasing means monthly payments for a set term, often with a kilometre limit, and the vehicle is returned; leasing to buy means payments during the term lead to ownership at the end.<br>\n<b>Purchase total:</b> price plus tax plus interest. In Newfoundland and Labrador, HST is 15 percent, so a taxed price is the price times \\(1.15\\).<br>\n<b>Lease total:</b> monthly payment times the number of months, plus upfront fees and a down payment, plus the buyout if the vehicle is kept at the end.<br>\n<b>Vehicle operating costs:</b> fixed costs are set amounts such as insurance, licensing and an extended warranty; ongoing costs change with use, such as fuel, maintenance and tires.<br>\n<b>Fuel cost:</b> litres used \\(=\\) distance in km \\(\\div 100 \\times\\) consumption in L per 100 km; fuel cost \\(=\\) litres used \\(\\times\\) price per litre.<br>\n<b>Rental total:</b> add the costs that repeat each month (rent, utilities, parking, tenant insurance). One-time costs, such as a deposit, are counted once, not every month.<br>\n<b>Buying a home:</b> cash needed at purchase \\(=\\) down payment (a percent of the price) plus closing costs such as legal fees, a home inspection and an appraisal.<br>\n<b>Costs of owning a home:</b> mortgage payments, plus yearly property tax, home insurance, heating, repairs and upkeep.<br>\n<b>Renting versus owning:</b> total both options over the same time period, with every cost included, before deciding which is lower.",
    "6": "<b>Business expenses:</b> fixed expenses stay the same regardless of sales (rent, insurance, licence fees); variable expenses rise and fall with business activity (supplies, ingredients, fuel, extra wages).<br>\n<b>Profit:</b> profit \\(=\\) revenue \\(-\\) total expenses. If expenses are greater than revenue, the result is a loss.<br>\n<b>Contribution per item:</b> selling price \\(-\\) variable cost per item. This is the amount each sale puts toward fixed costs and then profit.<br>\n<b>Break-even point:</b> break-even units \\(=\\) fixed costs \\(\\div\\) contribution per item. Break-even sales dollars \\(=\\) break-even units \\(\\times\\) selling price.<br>\n<b>Profitability factors:</b> seasonal variation, hours of operation, weather, location and supplier prices can all raise or lower profit across the year.<br>\n<b>Why file a return:</b> the annual return reports income, deductions and credits, claims any refund of tax withheld from pay, and keeps benefits such as the Canada child benefit and the GST/HST credit going.<br>\n<b>Forms and documents:</b> the T1 is the main personal income tax return; a T4 slip from an employer reports employment income and the tax, CPP and EI deducted from it.<br>\n<b>Deductions and credits:</b> a deduction, such as an RRSP contribution, reduces taxable income; a credit, such as the tuition credit, reduces tax payable.<br>\n<b>Reading a return:</b> total income \\(-\\) deductions \\(=\\) taxable income; then tax on taxable income \\(-\\) credits \\(=\\) net tax; tax withheld during the year is compared with net tax to give a refund or a balance owing.",
    "7": "<b>Triangles:</b> the interior angles add to \\(180^\\circ\\); an exterior angle equals the sum of the two non-adjacent interior angles<br>\n<b>Isosceles triangles:</b> the angles opposite equal sides are equal; equal sides sit opposite equal angles<br>\n<b>Quadrilaterals:</b> the interior angles add to \\(360^\\circ\\)<br>\n<b>Parallelograms:</b> opposite angles are equal, and neighbouring angles add to \\(180^\\circ\\)<br>\n<b>Regular polygons:</b> sum of the interior angles, \\(S = 180(n-2)\\), where \\(n\\) is the number of sides<br>\n<b>Regular polygons:</b> measure of each interior angle, \\(M = \\frac{180(n-2)}{n}\\)<br>\n<b>Exterior angles:</b> the exterior angles of any polygon add to \\(360^\\circ\\); in a regular polygon each one is \\(\\frac{360}{n}\\), and interior + exterior \\(= 180^\\circ\\) at each vertex<br>\n<b>Triangle inequality:</b> the sum of any two side lengths of a triangle is greater than the third side; the longest side sits opposite the largest angle<br>\n<b>Line symmetry:</b> a regular polygon has as many lines of symmetry as it has sides; an isosceles triangle has 1, a rectangle has 2, a square has 4",
    "8": "<b>Translation:</b> slides a shape; \\((x, y) \\to (x + a, y + b)\\) moves it \\(a\\) units horizontally and \\(b\\) units vertically<br>\n<b>Reflection:</b> flips a shape over a mirror line; in the x-axis, \\((x, y) \\to (x, -y)\\); in the y-axis, \\((x, y) \\to (-x, y)\\); the mirror line is the perpendicular bisector of the segment joining a point to its image<br>\n<b>Rotation about the origin:</b> \\(90^\\circ\\) counterclockwise, \\((x, y) \\to (-y, x)\\); \\(180^\\circ\\), \\((x, y) \\to (-x, -y)\\)<br>\n<b>Dilation:</b> with centre the origin and scale factor \\(k\\), \\((x, y) \\to (kx, ky)\\); the image is similar to the original, with every length multiplied by \\(k\\) and every angle unchanged<br>\n<b>Scale factor:</b> image length \\(\\div\\) original length; greater than 1 is an enlargement, between 0 and 1 is a reduction; an image is a dilation of the original exactly when all matching side ratios are equal<br>\n<b>Combined transformations:</b> apply the transformations one at a time, in the order given; the result can depend on the order<br>\n<b>Lines of symmetry:</b> a reflection in a line of symmetry maps a shape onto itself; a shape and its mirror image are congruent, with reversed orientation",
    "9": "<b>Sine law:</b> \\(\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}\\)<br>\n<b>Sine law, flipped form:</b> \\(\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}\\)<br>\n<b>Cosine law, side form:</b> \\(a^2 = b^2 + c^2 - 2bc \\cos A\\) (the same pattern holds for sides b and c)<br>\n<b>Cosine law, angle form:</b> \\(\\cos A = \\frac{b^2 + c^2 - a^2}{2bc}\\) (the same pattern holds for angles B and C)<br>\n<b>Choosing a law:</b> a side with its opposite angle known points to the sine law; two sides with the angle between them, or all three sides, point to the cosine law<br>\n<b>Primary ratios (review):</b> \\(\\sin = \\frac{\\text{opp}}{\\text{hyp}}\\), \\(\\cos = \\frac{\\text{adj}}{\\text{hyp}}\\), \\(\\tan = \\frac{\\text{opp}}{\\text{adj}}\\) in a right triangle<br>\n<b>Angle sum:</b> the three angles of any triangle add to \\(180^\\circ\\)<br>\n<b>Rounding:</b> angles to the nearest degree, side lengths to one decimal place, unless a question says otherwise",
    "10": "<b>Probability:</b> \\(P = \\frac{\\text{favourable outcomes}}{\\text{total outcomes}}\\)<br>\n<b>Probability from data:</b> use the counts in the data set as the favourable count and the total count<br>\n<b>Range:</b> a probability sits between 0 (cannot happen) and 1 (certain), or between 0% and 100%<br>\n<b>Changing form:</b> fraction to decimal by dividing; decimal to percent by multiplying by 100; a statement reads \"There is a ...% chance\"<br>\n<b>Odds in favour:</b> favourable outcomes : unfavourable outcomes; <b>odds against:</b> unfavourable outcomes : favourable outcomes<br>\n<b>Probability from odds in favour \\(a : b\\):</b> \\(P = \\frac{a}{a+b}\\); from odds against \\(a : b\\): \\(P = \\frac{b}{a+b}\\)<br>\n<b>Expected count:</b> probability \\(\\times\\) number of trials<br>\n<b>Decisions:</b> real decisions may combine a calculated probability, results from past trials, and judgement about the situation"
  }
},

"math-3208": {
  id: "math-3208",
  title: "Math 3208 Review: Practice Question Bank",
  shortName: "Math 3208",
  storagePrefix: "m3208",
  reportName: "Math 3208",
  language: "en",
  bankFile: "math-3208.js",
  subject: "Mathematics",
  grade: 12,
  listed: true,

  units: {
    "1": "Pre-Calculus",
    "2": "Limits and Continuity",
    "3": "Rational Functions",
    "4": "Derivatives",
    "5": "Applications of Derivatives",
    "6": "Calculus of Trigonometry",
    "7": "Calculus of Exponential, Logarithmic, and Hyperbolic Trigonometric Functions",
    "8": "Antidifferentiation and Integration"
  },

  /* All 96 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (math-3208-review/index.html,
     INDICATORS at lines 646 to 743; UNITS at lines 643 to 645). */
  indicators: {
    "1.1": "Write a function h (x) as the sum, difference, product or quotient of two or more functions",
    "1.2": "Sketch the graph of a function that is the sum, difference, product or quotient of two functions, given their graphs",
    "1.3": "Determine the domain and range of a function that is the sum, difference, product or quotient of two functions",
    "1.4": "Determine the value of the composition of functions when evaluated at a point, including: f (f (a)), f (g (a)), g (f (a))",
    "1.5": "Determine the equation of the composite function given the equations of two functions f (x) and g (x): f (f (x)), f (g (x)), g (f (x))",
    "1.6": "Sketch the graph of the composite function given the equations of two functions f (x) and g (x) and determine the domain and range",
    "1.7": "Determine the original functions from a composition",
    "1.8": "Explain the behaviour of the graph of a rational function for values of the variable near a non-permissible value",
    "1.9": "Determine if the graph of a rational function will have an asymptote or a hole for a non-permissible value",
    "1.10": "Sketch the graph of a rational function",
    "1.11": "Graph and analyze exponential and logarithmic functions y = e x and y = ln x",
    "1.12": "Explain the relationship between the trigonometric functions and their inverses",
    "1.13": "Explain why trigonometric functions must have their domains restricted to create inverse trigonometric functions",
    "1.14": "Sketch the graph of an inverse trigonometric function",
    "1.15": "Determine the exact value of an expression involving an inverse trigonometric function",
    "2.1": "Using informal methods, explore the concept of a limit including one-sided limits",
    "2.2": "Using informal methods, establish that the limit of x1 as x approaches infinity is zero",
    "2.3": "Explore the concept of limit and the notation used in expressing the limit of a function (one-sided limits from the left and right, and the two-sided limit)",
    "2.4": "Determine the value of the limit of a function as the variable approaches a real number by using a provided graph, including piecewise functions, and by using a table of values",
    "2.5": "Evaluate one-sided limits using a graph",
    "2.6": "Apply the properties of limits, including the Sum, Difference, Product, Constant Multiple, Quotient, and Power Rules, to solve problems",
    "2.7": "Determine the value of the limit of a function as the variable approaches a real number by substitution and by algebraic manipulation",
    "2.8": "Determine limits that result in infinity (infinite limits)",
    "2.9": "Investigate the behaviour of the function at a vertical asymptote using limits",
    "2.10": "Evaluate limits of functions as x approaches infinity (limits at infinity)",
    "2.11": "Investigate the end behaviour of the function using limits to identify possible horizontal asymptotes",
    "2.12": "Investigate the end behaviour of the function using limits to identify possible oblique asymptotes",
    "2.13": "Distinguish between the concepts of continuity and discontinuity of a function informally",
    "2.14": "Identify examples of discontinuous functions and the types of discontinuities they illustrate, such as removable, infinite, jump, and oscillating discontinuities",
    "2.15": "Determine whether a function is continuous at a point from its graph",
    "2.16": "Determine whether a function is continuous at a point using the definition of continuity",
    "2.17": "Determine whether a function is continuous on a closed interval",
    "2.18": "Rewrite removable discontinuities by extending or modifying a function",
    "2.19": "Establish the trigonometric limits as x approaches 0 (sin x, cos x, sin x / x, and (cos x - 1) / x) using informal methods",
    "2.20": "Evaluate limits involving trigonometric expressions",
    "2.21": "Establish the exponential limit (e^h - 1) / h as h approaches 0 using informal methods",
    "3.1": "Describe geometrically a secant line and a tangent line for the graph of a function at x = a",
    "3.2": "Determine the average rate of change of a function over an interval",
    "3.3": "Identify the instantaneous rate of change of a function at a point as the limiting value of a sequence of average rates of change",
    "3.4": "Define and evaluate the derivative at x = a using the limit definitions (the h form and the x form)",
    "3.5": "Determine the equation of the tangent line and normal line to a graph of a relation at a given point",
    "3.6": "Define and determine the derivative of a function using the limit definition (limited to polynomials and functions with linear terms)",
    "3.7": "Use alternate notation interchangeably to express derivatives (i.e., f ′ (x),   dx , y′,   etc.)",
    "3.8": "Determine whether a function is differentiable at a given point",
    "3.9": "Explain why a function is not differentiable at a given point, and distinguish between corners, cusps, discontinuities, and vertical tangents",
    "3.10": "Determine all values for which a function is differentiable, given the graph",
    "3.11": "Sketch a graph of the derivative of a function, given the graph of a function",
    "3.12": "Sketch a graph of the function, given the graph of the derivative of a function",
    "3.13": "Derive the Constant, Constant Multiple, Sum, Difference, Product, and Quotient Rules for determining derivatives",
    "3.14": "Determine derivatives of functions, using the Constant, Constant Multiple, Power, Sum, Difference, Product and Quotient Rules",
    "3.15": "Determine second and higher-order derivatives of functions",
    "3.16": "Determine derivatives of functions using the Chain Rule",
    "3.17": "Solve problems involving derivatives drawn from a variety of applications, limited to tangent and normal lines, straight line motion and rates of change",
    "3.18": "Determine the derivative of an implicit relation",
    "3.19": "Determine the equation of the tangent and normal line to the graph of a relation at a given point",
    "3.20": "Determine the second derivative of a relation, using implicit differentiation",
    "3.21": "For a polynomial function, use f ′ (x) to identify the critical numbers, relative and absolute extrema, and intervals of increase and decrease",
    "3.22": "For a polynomial function, use f ′′ (x) to identify the hypercritical numbers, points of inflection and intervals of concavity",
    "3.23": "For a polynomial function, sketch the graph of f (x) using information obtained from the function and its derivatives",
    "3.24": "For a polynomial function, use the given function f (x) to determine its features such as intercepts and the domain",
    "3.25": "For a rational function, use f ′ (x) to identify the critical numbers, relative and absolute extrema, and intervals of increase and decrease",
    "3.26": "For a rational function, use f ′′ (x) to identify the hypercritical numbers, points of inflection and intervals of concavity",
    "3.27": "For a rational function, sketch the graph of f (x) using information obtained from the function and its derivatives",
    "3.28": "For a rational function, use the given function f (x) to determine its features such as intercepts, asymptotes, points of discontinuity and the domain",
    "3.29": "Solve a problem involving related rates drawn from a variety of applications",
    "3.30": "Interpret the solution to a related rates problem",
    "3.31": "Determine the equation of the function to be optimized in an optimization problem",
    "3.32": "Determine the equations of any parameters necessary in an optimization problem",
    "3.33": "Solve an optimization problem drawn from a variety of applications, using calculus techniques",
    "3.34": "Interpret the solution(s) to an optimization problem",
    "3.35": "Derive the derivatives of sine, cosine, tangent, cotangent, secant and cosecant",
    "3.36": "Determine the derivative of expressions involving trigonometric functions",
    "3.37": "Solve problems involving the derivative of a trigonometric function",
    "3.38": "Derive the inverse trigonometric derivatives",
    "3.39": "Determine the derivative of an inverse trigonometric function",
    "3.40": "Solve problems involving the derivative of an inverse trigonometric function",
    "3.41": "Derive the derivatives of the exponential functions e x and a x , and the logarithmic functions ln x and log a x",
    "3.42": "Determine the derivative of an exponential function",
    "3.43": "Solve problems involving the derivative of an exponential or a logarithmic function",
    "3.44": "Determine the derivative of a logarithmic function",
    "3.45": "Determine the derivative of a function using logarithmic differentiation",
    "3.46": "Define and characterize the hyperbolic trigonometric functions sinh x and cosh x in terms of the exponential function",
    "3.47": "Define tanh x, csch x, coth x, and sech x in terms of sinh x and cosh x",
    "3.48": "Determine the derivative of a hyperbolic trigonometric function",
    "4.1": "Explain the meaning of the phrase “F (x) is an antiderivative of f (x)”",
    "4.2": "Determine the general antiderivative of functions",
    "4.3": "Use antiderivative notation appropriately (i.e., ∫ f (x) dx for the antiderivative of f (x))",
    "4.4": "Identify the properties of antidifferentiation",
    "4.5": "Determine the indefinite integral of a function given extra conditions",
    "4.6": "Use antidifferentiation to solve problems about motion of a particle along a line: computing displacement given initial position and velocity as a function of time, and computing velocity and/or displacement given initial conditions and acceleration as a function of time",
    "4.7": "Estimate an area using a finite sum",
    "4.8": "Determine the area using the infinite Riemann sum",
    "4.9": "Convert a Riemann sum to a definite integral",
    "4.10": "Using definite integrals, determine the area under a polynomial function from x = a to x = b",
    "4.11": "Calculate the definite integral of a function over an interval [a, b]",
    "4.12": "Determine the area between two polynomial functions"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at lines 744 to 752); it agrees exactly with the
     codes the bank entries themselves carry. */
  unitInd: {
    "1": [
      "1.1",
      "1.2",
      "1.3",
      "1.4",
      "1.5",
      "1.6",
      "1.7"
    ],
    "2": [
      "2.1",
      "2.2",
      "2.3",
      "2.4",
      "2.5",
      "2.6",
      "2.7",
      "2.8",
      "2.9",
      "2.10",
      "2.11",
      "2.12",
      "2.13",
      "2.14",
      "2.15",
      "2.16",
      "2.17",
      "2.18"
    ],
    "3": [
      "1.8",
      "1.9",
      "1.10"
    ],
    "4": [
      "3.1",
      "3.2",
      "3.3",
      "3.4",
      "3.5",
      "3.6",
      "3.7",
      "3.8",
      "3.9",
      "3.10",
      "3.11",
      "3.12",
      "3.13",
      "3.14",
      "3.15",
      "3.16",
      "3.17",
      "3.18",
      "3.19",
      "3.20"
    ],
    "5": [
      "3.21",
      "3.22",
      "3.23",
      "3.24",
      "3.25",
      "3.26",
      "3.27",
      "3.28",
      "3.29",
      "3.30",
      "3.31",
      "3.32",
      "3.33",
      "3.34"
    ],
    "6": [
      "1.12",
      "1.13",
      "1.14",
      "1.15",
      "2.19",
      "2.20",
      "3.35",
      "3.36",
      "3.37",
      "3.38",
      "3.39",
      "3.40"
    ],
    "7": [
      "1.11",
      "2.21",
      "3.41",
      "3.42",
      "3.43",
      "3.44",
      "3.45",
      "3.46",
      "3.47",
      "3.48"
    ],
    "8": [
      "4.1",
      "4.2",
      "4.3",
      "4.4",
      "4.5",
      "4.6",
      "4.7",
      "4.8",
      "4.9",
      "4.10",
      "4.11",
      "4.12"
    ]
  },

  /* The two presets, labels and unit scopes verbatim from the
     standalone app (builder markup lines 283 to 285; handlers at
     lines 7151 to 7153). Each preset also sets the level mix, as
     the standalone's preset buttons do: both use 20/60/20, the
     combined mix of the published 2026-2027 tables of
     specifications for both scopes (the standalone's design
     note at line 769). The face scope for the final preset reads
     "End-of-course review: Units 5 to 8" in the standalone
     (refreshFace, lines 5073 to 5085), carried here as its
     faceLabel. The standalone also ships an "All units" preset
     button; the shell's All wiring selects every unit in the
     course when the config carries no allUnits key, which is
     the same eight units, so the All preset needs no entry
     here. (The standalone's own All handler passes a ninth,
     nonexistent unit number that its checkbox rendering
     silently ignores; the effect is identical.) */
  presets: {
    mid:   { units: [1, 2, 3, 4], mix: [20, 60, 20], label: "Mid-course review (Units 1 to 4)" },
    final: { units: [5, 6, 7, 8], mix: [20, 60, 20], label: "Final review (Units 5 to 8)", faceLabel: "End-of-course review (Units 5 to 8)" }
  },

  /* The standalone builder's own default level mix (its level
     inputs ship at 20/60/20, lines 366 to 368). */
  defaultMix: [20, 60, 20],

  /* Exam blueprint, translated from the standalone app's
     composer (math-3208-review/index.html, composeExam, lines
     5979 to 6025). That composer is the pooled composer Math
     3200 and 3201 use, with three small differences: it never
     backfills a short selected-response level from other
     levels, it has no greedy constructed-response rescue when
     the subset sums fail, and its Level 3 subset-sum targets
     run 8, then 9, then 7 marks (theirs run 7, 8, 9). Every
     multi-unit paper is 50 marks: 27 selected response at
     levels 10/15/2, and 23 constructed response from Level 2
     and Level 3 entries carrying 2 or more marks, with the
     Level 3 share steered to 8 marks first (level totals
     10/30/10, matching the standalone's blueprint note at
     line 769: selected response 10/15/2 and constructed
     response 0/15/8 by level). On this bank the pools fill
     every slot: the standalone composer lands exact, totals
     10/30/10 with Level 3 at 8, in 200 of 200 trials on every
     scope tried, so the two latent differences never fire and
     the pooled fallback below reproduces it (the shell's
     composer prefers the same Level 3 totals in the crL3
     order given). A single unit composes the unit test (see
     unitTest). The mid-course scope never caps the pool in
     this course (the standalone's note at lines 4807 to
     4810: no entry carries a post-mid flag). */
  exam: {
    fallback: { srCount: 27, crMarks: 23, levels: [10, 30, 10], crL3: [8, 9, 7] }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* The always-on reference panels the standalone shows
     regardless of unit selection (REF_ALWAYS at lines 5068 to
     5070: the Quadratic Formula, Trigonometry and Double Angle
     Formulae panels), verbatim. */
  panelsAlways: "<details class=\"refpanel\"><summary>Quadratic Formula</summary><div class=\"refbody\">\\(x=\\dfrac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}\\)</div></details><details class=\"refpanel\"><summary>Trigonometry</summary><div class=\"refbody\"><b>Sine law:</b> \\(\\dfrac{\\sin A}{a}=\\dfrac{\\sin B}{b}=\\dfrac{\\sin C}{c}\\); <b>Cosine law:</b> \\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\).</div></details><details class=\"refpanel\"><summary>Double Angle Formulae</summary><div class=\"refbody\">\\(\\sin 2x=2\\sin x\\cos x\\); \\(\\cos 2x=\\cos^{2}x-\\sin^{2}x\\); \\(\\cos 2x=2\\cos^{2}x-1\\); \\(\\cos 2x=1-2\\sin^{2}x\\); \\(\\tan 2x=\\dfrac{2\\tan x}{1-\\tan^{2}x}\\).</div></details>",

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at lines 5062 to 5066). The standalone carries
     panels for Units 5, 6 and 8 only. */
  panels: {
    "5": "<b>Volume and Area:</b> \\(V_{\\text{sphere}}=\\dfrac{4}{3}\\pi r^{3}\\), \\(V_{\\text{Cone}}=\\dfrac{1}{3}\\pi r^{2}h\\), \\(A_{\\text{sphere}}=4\\pi r^{2}\\).",
    "6": "<b>Pythagorean Identities:</b> \\(\\sin^{2}\\theta+\\cos^{2}\\theta=1\\); \\(\\cot^{2}\\theta+1=\\csc^{2}\\theta\\); \\(1+\\tan^{2}\\theta=\\sec^{2}\\theta\\).",
    "8": "<b>Summation Formulae:</b> \\(\\sum_{i=1}^{n}i=\\dfrac{n(n+1)}{2}\\); \\(\\sum_{i=1}^{n}i^{2}=\\dfrac{n(n+1)(2n+1)}{6}\\); \\(\\sum_{i=1}^{n}i^{3}=\\left[\\dfrac{n(n+1)}{2}\\right]^{2}\\)."
  }
},

"math-2200": {
  id: "math-2200",
  title: "Math 2200 Review: Practice Question Bank",
  shortName: "Math 2200",
  storagePrefix: "m2200",
  reportName: "Math 2200",
  language: "en",
  bankFile: "math-2200.js",
  subject: "Mathematics",
  grade: 11,
  listed: true,

  units: {
    "1": "Trigonometry",
    "2": "Quadratic Functions",
    "3": "Quadratic Equations",
    "4": "Radical Expressions and Equations",
    "5": "Rational Expressions and Equations",
    "6": "Absolute Value and Reciprocal Functions",
    "7": "Systems of Equations",
    "8": "Linear and Quadratic Inequalities",
    "9": "Sequences and Series"
  },

  /* All 134 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (math-2200-review/index.html,
     UNITS at lines 647 to 649, INDICATORS at lines 650 to 785). */
  indicators: {
    "1.1": "Express an entire radical with a numerical radicand as a mixed radical",
    "1.2": "Express a mixed radical with a numerical radicand as an entire radical",
    "1.3": "Express an entire radical with a variable radicand as a mixed radical",
    "1.4": "Express a mixed radical with a variable radicand as an entire radical",
    "1.5": "Determine the distance of two real numbers of the form ±a, a a real number, from 0 on a number line, and relate that distance to the absolute value of a (|a|)",
    "1.6": "Determine the absolute value of a positive or negative real number",
    "1.7": "Explain, using examples, how distance between two points on a number line can be expressed in terms of absolute value",
    "1.8": "Compare and order the absolute values of real numbers in a given set",
    "1.9": "Compare and order radical expressions with numerical radicands in a given set",
    "1.10": "Determine the absolute value of a numerical expression",
    "1.11": "Explain, using examples, that (−x)2 = x2, √x2 = |x|, and √x2 ≠ ±x e.g., √9 ≠ ±3",
    "1.12": "Identify the values of the variable for which a given radical expression is defined",
    "1.13": "Perform one or more operations to simplify radical expressions with numerical or variable radicands",
    "1.14": "Rationalize the denominator of a rational expression with monomial or binomial denominators",
    "1.15": "Describe the relationship between rationalizing a binomial denominator of a rational expression and the product of the factors of a difference of squares expression",
    "1.16": "Determine any restrictions on values for the variable in a radical equation",
    "1.17": "Determine the roots of a radical equation algebraically, and explain the process used to solve the equation",
    "1.18": "Verify, by substitution, that the values determined in solving a radical equation algebraically are roots of the equation",
    "1.19": "Explain why some roots determined in solving a radical equation algebraically are extraneous",
    "1.20": "Solve problems by modeling a situation using a radical equation",
    "3.1": "Explain why a given value is non-permissible for a given rational expression",
    "3.2": "Determine the non-permissible values for a rational expression",
    "3.3": "Compare the strategies for writing equivalent forms of rational expressions to the strategies for writing equivalent forms of rational numbers",
    "3.4": "Multiply the numerator and denominator of a rational expression by the same factor (limited to a monomial or a binomial) to write an equivalent rational expression, and state the non-permissible values of the equivalent rational expression",
    "3.5": "Simplify a rational expression (numerators and denominators are monomials, binomials or trinomials)",
    "3.6": "Explain why the non-permissible values of a given rational expression and its simplified form are the same",
    "3.7": "Identify and correct errors in a given simplification of a rational expression, and explain the reasoning",
    "3.8": "Compare the strategies for performing a given operation on rational expressions to the strategies for performing the same operation on rational numbers",
    "3.9": "Determine the non-permissible values when performing operations on rational expressions",
    "3.10": "Determine, in simplified form, the sum or difference of rational expressions with the same denominator",
    "3.11": "Determine, in simplified form, the sum or difference of rational expressions in which the denominators are not the same and which may or may not contain common factors",
    "3.12": "Determine, in simplified form, the product or quotient of rational expressions",
    "3.13": "Simplify an expression that involves two or more operations on rational expressions",
    "3.14": "Factor a given polynomial expression that requires the identification of common factors",
    "3.15": "Factor a given polynomial expression of the form ax^2 + bx + c (a not 0) or a^2x^2 - b^2y^2 (a, b not 0), where a, b and c are rational numbers",
    "3.16": "Determine whether a given binomial is a factor for a given polynomial expression, and explain why or why not",
    "3.17": "Factor a given polynomial expression of the form a^2(f(x))^2 - b^2(g(y))^2, a not 0, b not 0",
    "3.18": "Determine the non-permissible values for the variable in a rational equation",
    "3.19": "Determine the solution to a rational equation algebraically, and explain the strategy used to solve the equation",
    "3.20": "Explain why a value obtained in solving a rational equation may not be a solution of the equation",
    "3.21": "Solve problems by modeling a situation using a rational equation",
    "4.1": "Sketch the graph of y = |f (x)|; state the intercepts, domain and range; and explain the strategy used",
    "4.2": "Create a table of values for y = |f (x)|, given a table of values for y = f (x)",
    "4.3": "Generalize a rule for writing absolute value functions in piecewise notation",
    "4.4": "Solve an absolute value equation graphically, with or without technology",
    "4.5": "Solve a problem that involves an absolute value function",
    "4.6": "Solve, algebraically, an equation with a single absolute value, and verify the solution",
    "4.7": "Determine and correct errors in a solution to an absolute value equation",
    "4.8": "Explain why the absolute value equation |f (x)| < 0 has no solution",
    "4.9": "Explain, using examples, the relationship among the roots of a quadratic equation, the zeros of the corresponding quadratic function and the x-intercepts of the graph of the quadratic function",
    "4.10": "Solve a quadratic equation of the form ax^2 + bx + c = 0 by using strategies such as determining square roots, factoring, completing the square, applying the quadratic formula, or graphing its corresponding function",
    "4.11": "Derive the quadratic formula, using deductive reasoning",
    "4.12": "Identify and correct errors in a solution to a quadratic equation",
    "4.13": "Select a method for solving a quadratic equation, justify the choice, and verify the solution",
    "4.14": "Explain, using examples, how the discriminant may be used to determine whether a quadratic equation has two, one, or no real roots, and relate the number of zeros to the graph of the corresponding quadratic function",
    "4.15": "Solve a problem by analyzing a quadratic equation, or by determining and analyzing a quadratic equation",
    "4.16": "Explain, using examples, how test points can be used to determine the solution region that satisfies a linear inequality",
    "4.17": "Explain, using examples, when a solid or broken line should be used in the solution for a linear inequality",
    "4.18": "Sketch, with or without technology, the graph of a linear inequality",
    "4.19": "Solve a problem that involves a linear inequality",
    "4.20": "Explain, using examples, how test points can be used to determine the solution region that satisfies a quadratic inequality",
    "4.21": "Explain, using examples, when a solid or broken line should be used in the solution for a quadratic inequality",
    "4.22": "Sketch, with or without technology, the graph of a quadratic inequality",
    "4.23": "Solve a problem that involves a quadratic inequality",
    "4.24": "Determine the solution of a quadratic inequality in one variable, using strategies such as case analysis, graphing, roots and test points, or sign analysis; and explain the strategy used",
    "4.25": "Represent and solve a problem that involves a quadratic inequality in one variable",
    "4.26": "Interpret the solution to a problem that involves a quadratic inequality in one variable",
    "4.27": "Explain, using examples, how the values of a and q may be used to determine whether a quadratic function has zero, one or two x-intercepts",
    "4.28": "Sketch the graph of y = a(x − p)2 + q, using transformations, and identify the vertex, domain and range, direction of opening, axis of symmetry and x- and y-intercepts",
    "4.29": "Compare the graphs of a set of functions of the form y = ax2 to the graph of y = x2, and generalize, using inductive reasoning, a rule about the effect of a",
    "4.30": "Compare the graphs of a set of functions of the form y = (x − p)2 to the graph of y = x2, and generalize, using inductive reasoning, a rule about the effect of p",
    "4.31": "Compare the graphs of a set of functions of the form y = x2 + q to the graph of y = x2, and generalize, using inductive reasoning, a rule about the effect of q",
    "4.32": "Sketch the graph of a quadratic function given in the form y = ax2 + bx + c",
    "4.33": "Compare the graph of y = 1/f(x) to the graph of y = f(x)",
    "4.34": "will have vertical asymptotes; and describe their relationship to the non-permissible values of the related rational expression",
    "4.35": "given y = f (x) as a function or a graph, and explain the strategies used",
    "4.36": "as a function or a graph, and explain the strategies used",
    "4.37": "Explain why a function given in the form y = a(x - p)^2 + q is a quadratic function",
    "4.38": "Determine the coordinates of the vertex for a quadratic function of the form y = a(x - p)^2 + q, and verify using technology",
    "4.39": "Generalize, using inductive reasoning, a rule for determining the coordinates of the vertex for quadratic functions of the form y = a(x - p)^2 + q",
    "4.40": "Write a quadratic function in the form y = a(x - p)^2 + q for a given graph or a set of characteristics of a graph",
    "4.41": "Determine the characteristics of a quadratic function given in the form y = ax2 + bx + c, and explain the strategy used",
    "4.42": "Explain the reasoning for the process of completing the square as shown in a given example",
    "4.43": "Write a quadratic function given in the form y = ax2 + bx + c as a quadratic function in the form y = a(x − p)2 + q by completing the square",
    "4.44": "Identify, explain and correct errors in an example of completing the square",
    "4.45": "Verify, with or without technology, that a quadratic function in the form y = ax^2 + bx + c represents the same function as a quadratic function in the form y = a(x - p)^2 + q",
    "4.46": "Write a quadratic function that models a given situation, and explain any assumptions made",
    "4.47": "Solve a problem, with or without technology, by analyzing a quadratic function",
    "4.48": "Explain the meaning of the points of intersection of a system of linear-quadratic or quadratic-quadratic equations",
    "4.49": "Explain, using examples, why a system of linear-quadratic or quadratic-quadratic equations may have zero, one, two or an infinite number of solutions",
    "4.50": "Determine and verify the solution(s) of a system of linear-quadratic or quadratic-quadratic equations graphically, using technology",
    "4.51": "Determine and verify the real solution(s) of a system of linear-quadratic or quadratic-quadratic equations algebraically",
    "4.52": "Model a situation, using a system of linear-quadratic or quadratic-quadratic equations",
    "4.53": "Relate a system of linear-quadratic or quadratic-quadratic equations to the context of a given problem",
    "4.54": "Solve a problem that involves a system of linear-quadratic or quadratic-quadratic equations, and explain the strategy used",
    "4.55": "Identify the assumption(s) made when defining an arithmetic sequence or series",
    "4.56": "Provide and justify an example of an arithmetic sequence",
    "4.57": "Determine a rule for finding the general term of an arithmetic sequence",
    "4.58": "Determine t1, d, n, or tn in a problem that involves an arithmetic sequence",
    "4.59": "Solve a problem that involves an arithmetic sequence or series",
    "4.60": "Describe the relationship between arithmetic sequences and linear functions",
    "4.61": "Determine a rule for finding the sum of n terms of an arithmetic series",
    "4.62": "Determine t1, d, n, or Sn in a problem that involves an arithmetic series",
    "4.63": "Identify assumptions made when identifying a geometric sequence or series",
    "4.64": "Provide and justify an example of a geometric sequence",
    "4.65": "Determine a rule for finding the general term of a geometric sequence",
    "4.66": "Determine t1, r, n, or tn in a problem that involves a geometric sequence",
    "4.67": "Determine a rule for finding the sum of n terms of a geometric series",
    "4.68": "Determine t1, r, n, or Sn in a problem that involves a geometric series",
    "4.69": "Solve a problem that involves a geometric sequence or series",
    "4.70": "Determine if a given a geometric series is convergent or divergent",
    "4.71": "Generalize, using inductive reasoning, a rule for determining the sum of an infinite geometric series",
    "7.1": "Sketch a diagram to represent a problem that involves a triangle without a right angle",
    "7.2": "Solve, using primary trigonometric ratios, a triangle that is not a right triangle",
    "7.3": "Explain the steps in a given proof of the sine law and cosine law",
    "7.4": "Sketch a diagram and solve a problem, using the sine law",
    "7.5": "Describe and explain situations in which a problem may have no solution, one solution or two solutions",
    "7.6": "Sketch a diagram and solve a problem, using the cosine law",
    "7.7": "Sketch an angle in standard position, given the measure of the angle",
    "7.8": "Determine the quadrant in which a given angle in standard position terminates",
    "7.9": "Determine the reference angle for an angle in standard position",
    "7.10": "Explain, using examples, how to determine the angles from 0° to 360° that have the same reference angle as a given angle",
    "7.11": "Illustrate, using examples, that any angle from 90° to 360° is the reflection in the x-axis and/or the y-axis of its reference angle",
    "7.12": "Draw an angle in standard position given any point P (x, y) on the terminal arm of the angle",
    "7.13": "Illustrate, using examples, that the points P (x, y), P (-x, y), P (-x, -y) and P (x, -y) are points on the terminal arms of angles in standard position that have the same reference angle",
    "7.14": "Determine, using the Pythagorean theorem, the distance from the origin to a point P (x, y) on the terminal arm of an angle",
    "7.15": "Determine the value of sin θ, cos θ, or tan θ given any point P (x, y) on the terminal arm of angle θ",
    "7.16": "Determine the sign of a given trigonometric ratio for a given angle, without the use of technology, and explain",
    "7.17": "Sketch a diagram to represent a problem",
    "7.18": "Determine, without the use of technology, the value of sin θ, cos θ, or tan θ given any point P (x, y) on the terminal arm of angle θ, where θ = 0°, 90°, 180°, 270° or 360°",
    "7.19": "Solve, for all values of θ, an equation of the form sin θ = a or cos θ = a, where −1 ≤ a ≤ 1, and an equation of the form tan θ = a, where a is a real number",
    "7.20": "Determine the exact value of the sine, cosine or tangent of a given angle with a reference angle of 30°, 45°or 60°",
    "7.21": "Describe patterns in and among the values of the sine, cosine and tangent ratios for angles from 0° to 360°",
    "7.22": "Solve a contextual problem, using trigonometric ratios"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at lines 786 to 796); it agrees exactly with the
     codes the bank entries themselves carry. */
  unitInd: {
    "1": ["7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10", "7.11", "7.12", "7.13", "7.14", "7.15", "7.16", "7.17", "7.18", "7.19", "7.20", "7.21", "7.22"],
    "2": ["4.27", "4.28", "4.29", "4.30", "4.31", "4.32", "4.37", "4.38", "4.39", "4.40", "4.41", "4.42", "4.43", "4.44", "4.45", "4.46", "4.47"],
    "3": ["3.14", "3.15", "3.16", "3.17", "4.9", "4.10", "4.11", "4.12", "4.13", "4.14", "4.15"],
    "4": ["1.1", "1.2", "1.3", "1.4", "1.9", "1.11", "1.12", "1.13", "1.14", "1.15", "1.16", "1.17", "1.18", "1.19", "1.20"],
    "5": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.18", "3.19", "3.20", "3.21"],
    "6": ["1.5", "1.6", "1.7", "1.8", "1.10", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.33", "4.34", "4.35", "4.36"],
    "7": ["4.48", "4.49", "4.50", "4.51", "4.52", "4.53", "4.54"],
    "8": ["4.16", "4.17", "4.18", "4.19", "4.20", "4.21", "4.22", "4.23", "4.24", "4.25", "4.26"],
    "9": ["4.55", "4.56", "4.57", "4.58", "4.59", "4.60", "4.61", "4.62", "4.63", "4.64", "4.65", "4.66", "4.67", "4.68", "4.69", "4.70", "4.71"]
  },

  /* The two presets, labels and unit scopes verbatim from the
     standalone app (builder markup lines 286 to 288; handlers at
     lines 8597 to 8599). Each preset also sets the level mix, as
     the standalone's preset buttons do: both use 20/60/20. The
     face scope for the final preset reads "End-of-course review:
     Units 5 to 9" in the standalone (refreshFace, lines 6518 to
     6525), carried here as its faceLabel. The standalone also
     ships an "All units" preset button over the same nine units
     the shell's All wiring selects when the config carries no
     allUnits key, so the All preset needs no entry here. */
  presets: {
    mid:   { units: [1, 2, 3, 4], mix: [20, 60, 20], label: "Mid-course review (Units 1 to 4)" },
    final: { units: [5, 6, 7, 8, 9], mix: [20, 60, 20], label: "Final review (Units 5 to 9)", faceLabel: "End-of-course review (Units 5 to 9)" }
  },

  /* The standalone builder's own default level mix (its level
     inputs ship at 20/60/20, lines 369 to 371). */
  defaultMix: [20, 60, 20],

  /* Exam blueprint, translated from the standalone app's
     composer (math-2200-review/index.html, composeExam, lines
     7424 to 7470). That composer is the pooled composer Math
     3200, 3201 and 3208 use, byte-identical to Math 3208's: every
     multi-unit paper is 50 marks,
     27 selected response at levels 10/15/2, and 23 constructed
     response from Level 2 and Level 3 entries carrying 2 or more
     marks, with the Level 3 share steered to 8 marks first, then
     9, then 7 (level totals 10/30/10). Like 3208's, it never
     backfills a short selected-response level from other levels
     and has no greedy constructed-response rescue (the two
     differences from the 3200 and 3201 composers); on this bank
     the pools fill every slot on the scopes tried (see the
     compose gate), so the pooled fallback below reproduces it. A single unit composes the
     unit test (see unitTest). The mid-course scope never caps
     the pool in this course (the standalone's note at line 6256:
     Units 1 to 4 whole, no entry carries a post-mid flag), and
     the bank carries no prior-knowledge indicators (the
     standalone's isPK is a shim that is always false here, line
     6624), so neither needs a config key. */
  exam: {
    fallback: { srCount: 27, crMarks: 23, levels: [10, 30, 10], crL3: [8, 9, 7] }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at lines 6511 to 6515). The standalone carries
     panels for Units 1, 3 and 9 only, and has no always-on
     panel. */
  panels: {
    "1": "\\(\\frac{\\sin A}{a}=\\frac{\\sin B}{b}=\\frac{\\sin C}{c}\\)<br>\\(a^{2}=b^{2}+c^{2}-2bc\\cos A\\)<br>\\(\\cos A=\\frac{b^{2}+c^{2}-a^{2}}{2cb}\\)",
    "3": "\\(x=\\frac{-b\\pm\\sqrt{b^{2}-4ac}}{2a}\\)",
    "9": "\\(t_{n}=t_{1}+(n-1)d,\\ n\\in N\\)<br>\\(S_{n}=\\frac{n}{2}(t_{1}+t_{n})\\)<br>\\(t_{n}=t_{1}\\left(r^{n-1}\\right),\\ n\\in N\\)<br>\\(S_{n}=\\frac{t_{1}\\left(r^{n}-1\\right)}{r-1}\\)<br>\\(S_{n}=\\frac{t_{1}}{1-r}\\)"
  }
},
"math-2201": {
  id: "math-2201",
  title: "Math 2201 Review: Practice Question Bank",
  shortName: "Math 2201",
  storagePrefix: "m2201",
  reportName: "Math 2201",
  language: "en",
  bankFile: "math-2201.js",
  subject: "Mathematics",
  grade: 11,
  listed: true,

  units: {
    "1": "Acute Triangle Trigonometry",
    "2": "Quadratic Functions",
    "3": "Quadratic Equations",
    "4": "Radicals",
    "5": "Statistical Reasoning",
    "6": "Proportional Reasoning",
    "7": "Inductive and Deductive Reasoning",
    "8": "Properties of Angles and Triangles"
  },

  /* All 68 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (math-2201-review/
     Math2201Review.html, UNITS at lines 644 to 647, INDICATORS at
     lines 648 to 717, UNIT_IND at lines 718 to 723; the map is
     headed "codes verified against the Math 2201 Curriculum
     Guide"). The two PK codes are the course's prior-knowledge
     codes: PK.1 (Unit 5, Section 1) and PK.2 (Unit 3). */
  indicators: {
    "7.1": "Draw a diagram to represent a problem that involves the sine law or the cosine law",
    "7.2": "Solve a contextual problem using the sine law or the cosine law",
    "7.3": "Solve a contextual problem that involves more than one triangle",
    "4.1": "Determine the domain and range of a quadratic function",
    "4.2": "Solve a contextual problem involving the characteristics of a quadratic function",
    "4.4": "Determine the intercepts of the graph of a quadratic function",
    "4.5": "Express a quadratic equation in factored form, given the zeros",
    "4.10": "Determine the characteristics of y = ax² + bx + c through the parameters a, b, c",
    "4.11": "Determine the coordinates of the vertex of a quadratic function",
    "4.12": "Determine the vertex given the equation and the axis of symmetry",
    "4.13": "Determine the equation of the axis of symmetry using the x-intercepts",
    "4.14": "Sketch the graph of a quadratic function",
    "4.15": "Determine the characteristics of y = a(x − h)² + k through the parameters h and k",
    "4.16": "Determine the quadratic function given the characteristics of its graph",
    "4.3": "Solve a contextual problem by modelling with a quadratic equation",
    "4.6": "Explain the relationships among roots, zeros and x-intercepts",
    "4.7": "Explain why a quadratic graph may have zero, one or two x-intercepts",
    "4.8": "Determine, by factoring, the roots of a quadratic equation",
    "4.9": "Determine, using the quadratic formula, the roots of a quadratic equation",
    "1.1": "Express a mixed radical as an entire radical",
    "1.2": "Express an entire radical as a mixed radical",
    "1.4": "Compare and order radical expressions",
    "1.5": "Identify values for which a radical expression is defined",
    "1.6": "Simplify radical expressions using operations",
    "1.7": "Rationalize the monomial denominator of a radical expression",
    "1.9": "Determine the roots of a radical equation algebraically",
    "1.11": "Explain why some roots of a radical equation are extraneous",
    "PK.1": "Prior knowledge: measures of central tendency (Unit 5, Section 1 — uncoded in the guide)",
    "PK.2": "Prior knowledge: factoring quadratic expressions (Unit 3 — a 1201 skill supporting 4.8)",
    "8.6": "Use dispersion to describe the differences between two sets of data",
    "8.7": "Create frequency tables and graphs from a set of data",
    "8.8": "Explain, using examples, the meaning of standard deviation",
    "8.9": "Calculate, using technology, the population standard deviation of a data set",
    "8.10": "Solve a contextual problem that involves the interpretation of standard deviation",
    "8.11": "Explain the properties of a normal curve",
    "8.12": "Determine if a data set approximates a normal distribution",
    "8.13": "Compare the properties of two or more normally distributed data sets",
    "8.14": "Solve a contextual problem that involves normal distribution",
    "8.15": "Determine and explain the z-score for a value in a normally distributed data set",
    "8.16": "Apply standard deviation to decisions (warranties, insurance, opinion polls)",
    "8.17": "Explain the significance of a confidence interval, margin of error or confidence level",
    "8.18": "Explain how sample size affects confidence intervals and margin of error",
    "8.19": "Make inferences about a population from sample data, using confidence intervals",
    "8.20": "Give media examples where confidence intervals support a position",
    "8.21": "Interpret confidence intervals and margin of error in media examples",
    "8.22": "Support a position by analyzing statistical data presented in the media",
    "6.2": "Determine an unknown dimension of a 2-D shape using proportional reasoning",
    "6.5": "Explain the effect of a change in scale factor on the area of a 2-D shape",
    "6.9": "Determine an unknown dimension of a 3-D object, given a scale diagram or model",
    "6.10": "Explain the effect of a change in scale factor on surface area and volume",
    "6.14": "Solve a problem involving relationships among scale factors, areas and volumes",
    "6.16": "Determine and compare rates and unit rates",
    "6.17": "Make and justify a decision, using rates",
    "6.19": "Explain the relationship between the slope of a graph and a rate",
    "6.23": "Solve a rate problem that requires isolating a variable",
    "2.1": "Make conjectures by observing patterns and identifying properties",
    "2.2": "Explain why inductive reasoning may lead to a false conjecture",
    "2.3": "Determine if a given argument is valid",
    "2.4": "Provide a counterexample to disprove a conjecture",
    "2.7": "Compare inductive and deductive reasoning",
    "2.8": "Identify errors in a given proof",
    "5.1": "Generalize relationships between angle pairs formed by transversals and parallel lines",
    "5.3": "Prove angle properties, including the sum of the angles in a triangle",
    "5.5": "Generalize a rule for the sum of the interior angles of a polygon",
    "5.6": "Prove, using deductive reasoning, that two triangles are congruent",
    "5.8": "Determine measures of angles in a diagram with parallel lines, angles and triangles",
    "5.9": "Determine if lines are parallel given angle measures at a transversal",
    "5.11": "Solve a contextual problem that involves angles or triangles"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at lines 718 to 723); it agrees exactly with the
     codes the bank entries themselves carry. */
  unitInd: {
    "1": ["7.1", "7.2", "7.3"],
    "2": ["4.1", "4.2", "4.4", "4.5", "4.10", "4.11", "4.12", "4.13", "4.14", "4.15", "4.16"],
    "3": ["PK.2", "4.3", "4.6", "4.7", "4.8", "4.9"],
    "4": ["1.1", "1.2", "1.4", "1.5", "1.6", "1.7", "1.9", "1.11"],
    "5": ["PK.1", "8.6", "8.7", "8.8", "8.9", "8.10", "8.11", "8.12", "8.13", "8.14", "8.15", "8.16", "8.17", "8.18", "8.19", "8.20", "8.21", "8.22"],
    "6": ["6.2", "6.5", "6.9", "6.10", "6.14", "6.16", "6.17", "6.19", "6.23"],
    "7": ["2.1", "2.2", "2.3", "2.4", "2.7", "2.8"],
    "8": ["5.1", "5.3", "5.5", "5.6", "5.8", "5.9", "5.11"]
  },

  /* The two presets, labels and unit scopes verbatim from the
     standalone app (builder markup lines 284 to 286; handlers at
     lines 6213 to 6216). Neither preset sets a level mix, as in
     the standalone (its builder defaults are the chassis 20/60/20,
     so this entry needs no defaultMix either). The standalone
     also ships an "All units" preset button over the same eight
     units the shell's All wiring selects when the config carries
     no allUnits key, so the All preset needs no entry here.
     The mid preset carries cap: true. In the standalone, the Mid
     button is the one place the mid-course cap is switched on
     (setPreset([1,2,3,4], true), line 6214; a preset=mid link
     does the same, line 6191): the mid-course exam samples Unit 4
     only to Section 4.3, so the five Radical Equations entries
     flagged postMid in the bank module are held out of the pool
     while the cap is on (the standalone's selection-engine note,
     lines 3860 to 3865). Picking the units by hand clears the
     cap, exactly as the standalone's checkbox handlers clear it.
     Both faceLabels carry the standalone's face scope wording
     (refreshFace, lines 4129 to 4130), which is plainer than the
     button labels: the mid button spells out the Section 4.3
     scope note, the final button uses an en dash range. */
  presets: {
    mid:   { units: [1, 2, 3, 4], cap: true, label: "Mid-course review (Units 1\u20134, Radicals to 4.3)", faceLabel: "Mid-course review (Units 1 to 4)" },
    final: { units: [5, 6, 7, 8], label: "Final review (Units 5\u20138)", faceLabel: "Final review (Units 5 to 8)" }
  },

  /* Shown in the pool line while the mid-course cap is on, the
     standalone's own wording (updatePoolInfo, line 4070). */
  midNote: "Mid-course scope: Unit 4 stops at Section 4.3, so the Radical Equations questions are held out.",

  /* Prior-knowledge entries are practice-only (Jason, Nov 9,
     2026, recorded in the standalone at line 3866): the composer
     leaves the seven PK-coded entries (four PK.1 in Unit 5,
     three PK.2 in Unit 3) out of practice tests and exams unless
     the teacher ticks the include-prior-knowledge override (the
     builder's pkChk, read by startExam and passed to the
     standalone's composeExam, lines 5029 to 5033). Ordinary
     practice sets keep them, as the standalone's drawSet does.
     The shell's composer honours this flag; no other course
     sets it. */
  pkPracticeOnly: true,

  /* Exam blueprint, translated from the standalone app's
     composer (math-2201-review/Math2201Review.html, composeExam,
     lines 5029 to 5087). That composer pools every multi-unit
     paper, like the Math 3200 and 3201 composers (it backfills a
     short selected-response level from other levels and carries
     the same greedy constructed-response rescue): every
     multi-unit paper is 50 marks, 27 selected response at levels
     10/15/2, and 23 constructed response from Level 2 and Level
     3 entries carrying 2 or more marks, with the Level 3 share
     steered to 8 marks first, then 9, then 7 (level totals
     10/30/10). It also applies the two scope rules the generic
     composer reads from this configuration: the mid-course cap
     above whenever the paper's units are exactly the mid scope
     (the standalone passes that same unit-set test to poolFor),
     and the prior-knowledge exclusion above. A single unit
     composes the unit test (see unitTest); the standalone's
     single-unit Level 3 subset-sum targets are 5, then 4, then
     6, inside the generic composer's 4 to 6 window. */
  exam: {
    fallback: { srCount: 27, crMarks: 23, levels: [10, 30, 10], crL3: [8, 9, 7] }
  },

  /* The unit test, from the same composer (its single-unit
     branch plans selected response [4, 6, 1] and 14 constructed
     response, lines 5031 to 5032). The generic composer guides
     unit-test selected-response levels at 20/60/20 rather than
     [4, 6, 1], the same accepted translation as the Math 3200,
     3201, 3208 and 2200 ports; totals, splits and marks are
     exact. */
  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at lines 4117 to 4120). The standalone carries
     panels for Units 1, 3 and 5 only, and has no always-on
     panel. */
  panels: {
    "1": "<b>Acute Triangle Trigonometry:</b> \\(\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}\\)<br>\\(a^{2} = b^{2} + c^{2} - 2bc\\cos A\\)<br>\\(\\cos A = \\frac{b^{2} + c^{2} - a^{2}}{2bc}\\)",
    "3": "<b>Quadratic Equations:</b> \\(x = \\frac{-b \\pm \\sqrt{b^{2} - 4ac}}{2a}\\)",
    "5": "<b>Statistical Reasoning:</b> \\(\\sigma = \\sqrt{\\frac{\\sum (x - \\bar{x})^{2}}{n}}\\)<br>\\(z = \\frac{x - \\mu}{\\sigma}\\)"
  }
},

"math-2202": {
  id: "math-2202",
  title: "Math 2202 Review: Practice Question Bank",
  shortName: "Math 2202",
  storagePrefix: "m2202",
  reportName: "Math 2202",
  language: "en",
  bankFile: "math-2202.js",
  subject: "Mathematics",
  grade: 11,
  listed: true,

  units: {
    "1": "Drawing and Design",
    "2": "Surface Area",
    "3": "Volume and Capacity",
    "4": "Interpreting Graphs",
    "5": "Budgets",
    "6": "Banking",
    "7": "Slope and Scale",
    "8": "Trigonometry"
  },

  /* All 85 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (math-2202-review/index.html,
     UNITS at line 651, INDICATORS at line 652, UNIT_IND at line
     653). The six formula codes (2.1 to 2.6) sit in four units'
     lists, as the official spreadsheet places them: 103 unit
     placements over the 85 codes. */
  indicators: {
    "3.17": "Draw a 2-D representation of a given 3-D object",
    "3.18": "Draw to scale top, front and side views of a given 3-D object",
    "3.19": "Construct a model of a 3-D object, given the top, front and side views",
    "3.20": "Draw a 3-D object, given the top, front and side views",
    "3.21": "Determine if given views of a 3-D object represent a given object, and explain the reasoning",
    "3.22": "Draw, using isometric dot paper, a given 3-D object",
    "3.23": "Draw a one-point perspective view of a given 3-D object",
    "3.24": "Identify the point of perspective of a given one-point perspective drawing of a 3-D object",
    "3.25": "Draw the components of a given exploded diagram, and explain their relationship to the original 3-D object",
    "3.26": "Sketch an exploded view of a 3-D object to represent the components",
    "3.27": "Draw to scale the components of a 3-D object",
    "3.28": "Sketch a 2-D representation of a 3-D object, given its exploded view",
    "3.1": "Explain, using examples, including nets, the relationship between area and surface area",
    "3.2": "Explain how a referent can be used to estimate surface area",
    "3.3": "Solve problems that involve determining the surface area of 3-D objects, including pyramids and spheres",
    "3.4": "Solve contextual problems that involve the surface area of 3-D objects and that require the manipulation of formulas",
    "3.5": "Illustrate, using examples, the effect of dimensional changes on surface area",
    "2.1": "Solve contextual problems involving the application of a formula that does not require manipulation",
    "2.2": "Solve contextual problems involving the application of a formula that requires manipulation",
    "2.3": "Describe, using examples, how a given formula is used in a trade or an occupation",
    "2.4": "Create and solve contextual problems that involve a formula",
    "2.5": "Identify and correct errors in a solution to a problem that involves a formula",
    "2.6": "Explain and verify why different forms of the same formula are equivalent",
    "4.10": "Solve a problem, using unit analysis",
    "4.11": "Solve problems within and between systems, using proportions or tables",
    "4.12": "Identify and correct errors in a given unit analysis or proportional reasoning problem",
    "3.6": "Explain, using examples, the difference between volume and capacity",
    "3.7": "Identify and compare referents for volume and capacity measurements in SI and imperial units",
    "3.8": "Identify a situation where a given SI or imperial volume unit would be used",
    "3.9": "Estimate the volume or capacity of a 3-D object or container, using a referent",
    "3.10": "Write a given volume or capacity measurement expressed in one SI unit cubed in another SI unit cubed",
    "3.11": "Write a given volume or capacity measurement expressed in one imperial unit cubed in another imperial unit cubed",
    "3.12": "Determine the volume of prisms, cones, cylinders, pyramids, spheres and composite 3-D objects, using a variety of measuring tools such as rulers, tape measures, calipers, micrometers, and displacement",
    "3.13": "Determine the capacity of prisms, cones, pyramids, spheres and cylinders, using a variety of measuring tools and methods such as graduated cylinders, measuring cups, and measuring spoons",
    "3.14": "Illustrate, using examples, the effect of dimensional changes on volume",
    "3.15": "Describe the relationship between the volume of: · cones and cylinders with the same base and height · pyramids and prisms with the same base and height",
    "3.16": "Solve contextual problems that involve the volume of a 3-D object, including composite 3-D objects, or the capacity of a container",
    "6.1": "Determine the possible graphs that can be used to represent a given data set, and explain the advantages and disadvantages of each",
    "6.2": "Create, with and without technology, a histogram to represent a given data set",
    "6.3": "Solve contextual problems that involve the interpretation of a graph",
    "6.4": "Describe trends in a given graph",
    "6.5": "Interpolate and extrapolate values from a given graph",
    "6.6": "Explain, using examples, how the same graph can be used to justify more than one conclusion",
    "6.7": "Explain, using examples, how different graphic representations of the same data can be used to emphasize a point of view",
    "1.1": "Identify income and expenses that should be included in a personal budget",
    "1.2": "Explain considerations that must be made when developing a budget; e.g., prioritizing, recurring and unexpected expenses",
    "1.3": "Create a personal budget based on a given income and expense data",
    "1.4": "Collect income and expense data, and create a budget",
    "1.5": "Modify a budget to achieve a set of personal goals",
    "1.6": "Investigate and analyze with or without technology, “What if ...” questions related to personal budgets",
    "1.7": "Solve problems that involve simple interest, given three of the four values in the formula I = Prt",
    "1.8": "Compare simple and compound interest, and explain their relationship",
    "1.9": "Solve, using a formula, a contextual problem that involves compound interest",
    "1.10": "Explain, using examples, the effect of different compounding periods on calculations of compound interest",
    "1.11": "Describe the type of banking services available from various financial institutions, such as online services",
    "1.12": "Describe the type of accounts available at various financial institutions",
    "1.13": "Identify the type of account that best meets the needs for a given set of criteria",
    "1.14": "Describe the advantages and disadvantages of online banking",
    "1.15": "Identify and explain various automated teller machine (ATM) service charges",
    "1.16": "Describe the advantages and disadvantages of debit card purchases",
    "1.17": "Describe ways that ensure the security of personal and financial information; e.g., passwords, encryptions, protection of personal identification number (PIN) and other personal identity information",
    "1.18": "Compare advantages and disadvantages of different types of credit options, including bank and store credit cards, personal loans, lines of credit, overdraft",
    "1.19": "Make informed decisions and plans related to the use of credit, such as service charges, interest, payday loans and sales promotions, and explain the reasoning",
    "1.20": "Describe strategies to use credit effectively, such as negotiating interest rates, planning payment timelines, reducing accumulated debt and timing purchases",
    "1.21": "Compare credit card options from various companies and financial institutions",
    "1.22": "Solve contextual problems that involve credit cards or loans",
    "1.23": "Solve contextual problems that involve credit linked to sales promotions",
    "4.1": "Describe contexts that involve slope; e.g., ramps, roofs, road grade, flow rates within a tube, skateboard parks, ski hills",
    "4.2": "Explain, using diagrams, the difference between two given slopes (e.g., a 3:1 and a 1:3 roof pitch), and describe the implications",
    "4.3": "Describe the conditions under which a slope will be either 0 or undefined",
    "4.4": "Explain, using examples and illustrations, slope as rise over run",
    "4.5": "Verify that the slope of an object, such as a ramp or a roof, is constant",
    "4.6": "Explain, using illustrations, the relationship between slope and angle of elevation; e.g., for a ramp with a slope of 7:100, the angle of elevation is approximately 4°",
    "4.7": "Explain the implications, such as safety and functionality, of different slopes in a given context",
    "4.8": "Explain, using examples and illustrations, slope as rate of change",
    "4.9": "Solve contextual problems that involve slope or rate of change",
    "4.13": "Describe contexts in which a scale representation is used",
    "4.14": "Determine, using proportional reasoning, the dimensions of an object from a given scale drawing or model",
    "4.15": "Construct a model of a 3-D object, given the scale",
    "4.16": "Draw, with and without technology, a scale diagram of a given object",
    "4.17": "Solve contextual problems that involve scale",
    "5.1": "Solve contextual problems that involve angles of elevation or angles of depression",
    "5.2": "Solve contextual problems that involve two right triangles, using the primary trigonometric ratios",
    "5.3": "Identify all of the right triangles in a given illustration for a context",
    "5.4": "Determine if a solution to a problem that involves two right triangles is reasonable"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at line 653); it agrees exactly with the codes
     the bank entries themselves carry at each placement. */
  unitInd: {
    "1": ["3.17", "3.18", "3.19", "3.20", "3.21", "3.22", "3.23", "3.24", "3.25", "3.26", "3.27", "3.28"],
    "2": ["3.1", "3.2", "3.3", "3.4", "3.5", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "4.10", "4.11", "4.12"],
    "3": ["3.6", "3.7", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14", "3.15", "3.16", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"],
    "4": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"],
    "5": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"],
    "6": ["1.7", "1.8", "1.9", "1.10", "1.11", "1.12", "1.13", "1.14", "1.15", "1.16", "1.17", "1.18", "1.19", "1.20", "1.21", "1.22", "1.23"],
    "7": ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.13", "4.14", "4.15", "4.16", "4.17", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"],
    "8": ["5.1", "5.2", "5.3", "5.4", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6"]
  },

  /* Presets: the standalone ships exactly one, "All units", on its
     presetAll button (builder markup line 287; handler line 7860,
     selecting Units 1 to 8 with no level mix change; the builder
     level inputs ship at the 20/60/20 default, lines 368 to 370).
     The shell's All wiring selects every unit in the course when
     the config carries no allUnits key, which is the same eight
     units, so the All preset needs no entry here. There is no
     mid-course or final preset in this course (its tests are
     single-unit practice tests, below): the shell hides both
     buttons for a course whose config names neither. */
  presets: {},

  /* Staged hints: every entry in this bank carries a two-stage
     hint (the standalone's E stores them as hint1 and hint2,
     line 655, and its showHint reveals strategy, then first step,
     lines 5764 to 5773). The flag turns on the shell's restored
     hint UI for this course: the Hint button and hint box on
     practice questions, and the face card's "a hint, " wording. */
  hints: true,

  /* Exam blueprint, translated from the standalone app's composer
     (math-2202-review/index.html: the practice-test note at lines
     6663 to 6672, the TEST_ constants at lines 6673 to 6676, and
     composeExam at lines 6685 to 6731). This composer builds
     single-unit practice tests only and returns null for a
     multi-unit selection (the standalone's startExam, lines 6744
     to 6749, tells the student tests are built one unit at a
     time and points them to a practice sheet instead; the shell
     gives the same message under exam.singleOnly). A unit test
     is 10 selected-response questions at 1 mark each, drawn at
     the exact level split 2/6/2 with an any-level top-up when a
     level runs short, plus exactly three constructed-response
     questions: one carrying 2 marks and two carrying 3, all at
     Level 2 or 3, at least one of the three at Level 3, summing
     to 8 marks, for 18 marks in total. The trioCr branch of the
     shell's composer reproduces that algorithm; courses without
     trioCr never enter it. The standalone also models the sitting
     at TEST_MINUTES 60 (a one-hour soft timer); the shell's timer
     text is its own generic wording for every course. No table
     of specifications is published for this course; the bank's
     20/60/20 level mix is a design prior. */
  exam: {
    singleOnly: true
  },

  unitTest: { total: 18, sr: 10, cr: 8, srLevels: [2, 6, 2], trioCr: true },

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at line 5741). The official Math 2202 Formula Sheet
     (2025-2026) places every one of its 14 formulas in the unit
     whose indicators use it, so the standalone carries panels
     for Units 2, 3, 6 and 7 only, and has no always-on panel. */
  panels: {
    "2": "<b>Surface area, from the course formula sheet</b><br>\nRectangular prism: \\(SA = 2lw + 2lh + 2wh\\)<br>\nCylinder: \\(SA = 2\\pi r^2 + 2\\pi rh\\)<br>\nCone: \\(SA = \\pi r^2 + \\pi rs\\), where \\(s\\) is the slant height<br>\nSquare pyramid: \\(SA = \\text{area of the base} + 4(\\text{area of a triangular side})\\)<br>\nSphere: \\(SA = 4\\pi r^2\\)",
    "3": "<b>Volume and capacity, from the course formula sheet</b><br>\nRectangular prism: \\(V = lwh\\)<br>\nCylinder: \\(V = \\pi r^2 h\\)<br>\nCone: \\(V = \\frac{\\pi r^2 h}{3}\\)<br>\nSquare pyramid: \\(V = \\frac{lwh}{3}\\)<br>\nSphere: \\(V = \\frac{4\\pi r^3}{3}\\)",
    "6": "<b>Financial formulas, from the course formula sheet</b><br>\nSimple interest: \\(I = Prt\\)<br>\nFinal value for simple interest: \\(FV = P + I\\)<br>\nFinal value for compound interest: \\(FV = P(1 + r)^t\\), or \\(FV = P\\left(1 + \\frac{r}{n}\\right)^{nt}\\)",
    "7": "<b>Slope, from the course formula sheet</b><br>\nSlope (rate of change): \\(m = \\frac{y_2 - y_1}{x_2 - x_1}\\)"
  }
},

"math-1201": {
  id: "math-1201",
  title: "Math 1201 Review: Practice Question Bank",
  shortName: "Math 1201",
  storagePrefix: "m1201",
  reportName: "Math 1201",
  language: "en",
  bankFile: "math-1201.js",
  subject: "Mathematics",
  grade: 10,
  listed: true,

  units: {
    "1": "Measurement",
    "2": "Roots and Powers",
    "3": "Factors and Products",
    "4": "Relations and Functions",
    "5": "Linear Functions",
    "6": "Systems of Linear Equations",
    "7": "Trigonometry"
  },

  /* All 118 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (math-1201-review/index.html,
     UNITS at line 646, INDICATORS at line 649, UNIT_IND at line
     769). The guide's outcome codes do not follow the unit
     numbers: Unit 1 carries the 5.x and 6.x codes, Unit 2 the
     1.x codes, Unit 3 the 3.x codes, Units 4 to 6 the 4.x codes
     and Unit 7 the 7.x codes, exactly as the standalone's map
     places them (118 placements, one per code). */
  indicators: {
    "1.1": "Explain, using examples, the meaning of an index of a radical",
    "1.2": "Explain, using patterns, why a^(m/n) = (ⁿ√a)^m, a ≠ 0",
    "1.3": "For integral bases and whole number exponents Express powers with rational exponents as radicals and vice versa",
    "1.4": "Solve a problem that involves exponent laws or radicals",
    "1.5": "For integral bases and whole number exponents Explain, using patterns, why a−n = ( a1 ), a ≠ 0 n",
    "1.6": "Apply the exponent laws in expressions with rational and variable bases and integral and rational exponents, and explain the reasoning",
    "1.7": "Identify and correct errors in the simplification of an expression that involves powers",
    "1.8": "Determine, concretely, whether a given whole number is a perfect square, a perfect cube or neither",
    "1.9": "Determine, using a variety of strategies, the square root of a perfect square, and explain the process",
    "1.10": "Determine, using a variety of strategies, the cube root of a perfect cube, and explain the process",
    "1.12": "Determine the prime factors of a whole number",
    "1.13": "Explain why the numbers 0 and 1 have no prime factors",
    "1.14": "Determine, using a variety of strategies, the greatest common factor or least common multiple of a set of whole numbers, and explain the process",
    "1.15": "Solve problems that involve prime factors, greatest common factors, least common multiples, square roots or cube roots",
    "1.16": "Express a radical as a mixed radical in simplest form (limited to numerical radicands)",
    "1.17": "Express a mixed radical as an entire radical (limited to numerical radicands)",
    "1.18": "Sort a set of numbers into rational and irrational numbers",
    "1.19": "Represent using a graphic organizer, the relationship among the subsets of the real numbers (natural, whole, integer, rational, irrational)",
    "1.20": "Determine an approximate value of a given irrational number",
    "1.21": "Approximate the locations of irrational numbers on a number line, using a variety of strategies, and explain the reasoning",
    "1.22": "Order a set of irrational numbers on a number line",
    "3.1": "Limited to monomials, binomials and trinomials Explain, using examples, the relationship between the multiplication of binomials and the multiplication of two-digit numbers",
    "3.2": "Limited to monomials, binomials and trinomials Model the multiplication of two given binomials, concretely or pictorially, and record the process symbolically",
    "3.3": "Limited to monomials, binomials and trinomials Relate the multiplication of two binomials expressions to an area model",
    "3.4": "Limited to monomials, binomials and trinomials Multiply two polynomials symbolically, and combine like terms in the product",
    "3.5": "Limited to monomials, binomials and trinomials Verify a polynomial by substituting numbers for the variables",
    "3.6": "Limited to monomials, binomials and trinomials Generalize and explain a strategy for multiplication of polynomials",
    "3.7": "Limited to monomials, binomials and trinomials Identify and explain errors in a solution for a polynomial multiplication",
    "3.8": "Explain, using examples, the relationship between multiplication and factoring of polynomials",
    "3.9": "Express a polynomial as a product of its factors",
    "3.10": "Determine the common factors in the terms of a polynomial, and express the polynomial in factored form, concretely, pictorially and symbolically",
    "3.11": "Factor a polynomial and verify by multiplying the factors",
    "3.12": "Model the factoring of a trinomial, concretely or pictorially, and record the process symbolically",
    "3.13": "Identify and explain the errors in a polynomial factorization",
    "3.14": "Factor a polynomial that is a difference of squares, and explain why it is a special case of trinomial factoring where b = 0",
    "4.1": "Describe a possible situation for a given graph.",
    "4.2": "Sketch a possible graph for a given situation",
    "4.3": "Explain why data points should or should not be connected on the graph for a given situation",
    "4.4": "Represent a relation in a variety of ways",
    "4.5": "Determine if a set of ordered pairs represents a function.",
    "4.6": "Explain, using examples, why some relations are not functions but all functions are relations",
    "4.7": "Sort a set of graphs as functions or non-functions",
    "4.8": "Generalize and explain rules for determining whether graphs and sets of ordered pairs represent functions",
    "4.9": "Graph, with or without technology, a set of data, and determine the domain and range",
    "4.10": "Determine, and express in a variety of ways, the domain and range of a graph, a set of ordered pairs or a table of values",
    "4.11": "Identify independent and dependent variables in a given context",
    "4.12": "Determine the domain and range of the graph of a linear relation",
    "4.13": "Determine whether a table of values or a set of ordered pairs represents a linear relation, and explain why or why not",
    "4.14": "Determine whether a graph represents a linear relation and explain why or why not",
    "4.15": "Determine whether an equation represents a linear relation, and explain why or why not",
    "4.16": "Draw a graph given a set of ordered pairs and determine whether the relationship between the variables is linear",
    "4.17": "Solve a problem, using the equation of a linear relation",
    "4.18": "Determine the slope of a line segment by measuring and calculating the rise and run",
    "4.19": "Determine the rate of change of the graph of a linear relation",
    "4.20": "Explain why the slope of a line can determined by using any two points on that line",
    "4.21": "Academic Mathematics 1201 Page 229 11/5/26, 2:20 PM Curriculum Print Preview",
    "4.22": "Classify lines in a given set as having a positive or negative slopes",
    "4.23": "Explain the meaning of the slope of a horizontal or vertical line",
    "4.24": "Draw a line, given its slope and a point on the line",
    "4.25": "Determine another point on a line, given the slope and a point on the line",
    "4.26": "Generalize and apply a rule for determining whether two lines are parallel or perpendicular",
    "4.27": "Solve a contextual problem involving slope",
    "4.28": "Determine the intercepts of the graph of a linear relation, and state the intercepts as values of ordered pairs",
    "4.29": "Sketch a linear relation that has one intercept, two intercepts or an infinite number of intercepts",
    "4.30": "Identify the graph that corresponds to a given rate of change and vertical intercept",
    "4.31": "Identify the rate of change and vertical intercept that correspond to a given graph",
    "4.32": "Solve a contextual problem that involves intercepts, rate of change, domain or range of a linear relation",
    "4.33": "Match a set of linear relations to their graphs",
    "4.34": "Generalize and explain strategies for graphing a linear relation in slope-intercept, general or slope-point form",
    "4.35": "Graph, with and without technology, a linear relation given in slope-intercept, general or slope-point form, and explain the strategy used to create the graph",
    "4.36": "Graph linear data generated from a context, and write the equation of the resulting line",
    "4.37": "Match corresponding representations of linear relations",
    "4.38": "Express a linear relation in different forms, and compare their graphs",
    "4.39": "Rewrite a linear relation in either slope-intercept or general form",
    "4.40": "Identify equivalent linear relations from a set of linear relations",
    "4.41": "Determine the slope and y-intercept of a given linear relation from its graph, and write the equation in the form y = mx + b",
    "4.42": "Write the equation of a linear relation, given its slope and the coordinates of a point on the line, and explain the reasoning",
    "4.43": "Write the equation of a linear relation, given the coordinates of two points on the line, and explain the reasoning",
    "4.44": "Write the equation of a linear relation, given the coordinates of a point on the line and the equation of a parallel or perpendicular line, and explain the reasoning.",
    "4.45": "Express the equation of a linear function in two variables, using function notation",
    "4.46": "Express an equation given in function notation as a linear function in two variables",
    "4.47": "Determine the related range value, given a domain value for a linear function; e.g., If f (x) = 3x − 2, determine f (−1)",
    "4.48": "Determine the related domain value, given a range value for a linear function; e.g., If g (t) = 7 + t, determine t so that g (t) = 15",
    "4.49": "Sketch the graph of a linear function expressed in function notation",
    "4.50": "Model a situation, using a system of linear equations",
    "4.51": "Relate a system of linear equations to the context of a problem",
    "4.52": "Explain the meaning of the point of intersection of a system of linear equations",
    "4.53": "Determine and verify the solution of a system of linear equation graphically, with and without technology",
    "4.54": "Solve a problem that involves a system of linear equations",
    "4.55": "Determine and verify the solution of a system of linear equations algebraically",
    "4.56": "Explain a strategy to solve a system of linear equations",
    "4.57": "Explain, using examples, why a system of equations may have no solution, one solution or an infinite number of solutions",
    "5.1": "Sketch a diagram to represent a problem that involves surface area or volume",
    "5.2": "Determine the surface area of a right cone, right cylinder, right prism, or a right pyramid, using an object or its labelled diagram",
    "5.3": "Determine an unknown dimension of a right cone, right cylinder, right prism, or right pyramid, given the object's surface area and the remaining dimensions",
    "5.4": "Determine the volume of a right cone, right cylinder, right prism, or right pyramid using an object or its labelled diagram",
    "5.5": "right cones and right cylinders with the same base and height right pyramids and right prism with the same base and height",
    "5.6": "Determine an unknown dimension of a right cone, right cylinder, right prism, or right pyramid, given the object's volume and the remaining dimensions",
    "5.7": "Determine the surface area and volume of a sphere, using an object or its labelled diagram",
    "5.8": "Determine an unknown dimension of a sphere, given the object's surface area",
    "5.9": "Solve a problem that involved surface area or volume, using an object or its labelled diagram of a composite 3-D object",
    "5.10": "Provide referents for linear measurements, including millimetre, centimetre, metre, kilometre, inch, foot, yard and mile, and explain the choices",
    "5.11": "Compare SI and imperial units, using referents",
    "5.12": "Estimate a linear measure, using a referent, and explain the process used",
    "5.13": "Justify the choice of units used for determining a measurement in a problem solving context",
    "5.14": "Solve problems that involve linear measure, using instruments such as rulers, calipers or tape measures",
    "5.15": "Describe and explain a personal strategy used to determine a linear measurement; e.g., circumference of a bottle, length of a curve, perimeter of the base of an irregular 3-D object",
    "6.1": "Using proportional reasoning, convert a measurement within or between SI and imperial systems",
    "6.2": "Solve a problem that involves the conversion of units within or between SI and imperial units",
    "6.3": "Verify, using unit analysis, a conversion within or between SI and imperial systems, and explain the conversion",
    "6.4": "Justify, using mental mathematics, the reasonableness of a solution to a conversion problem",
    "7.1": "Identify the hypotenuse of a right triangle, and the opposite and adjacent sides for a given acute angle in the triangle",
    "7.2": "Explain the relationships between similar right triangles and the definitions of the primary trigonometric ratios",
    "7.3": "Use the primary trigonometric ratios to determine the measure of a missing angle in a right triangle",
    "7.4": "Use the primary trigonometric ratios to determine the length of a missing side in a right triangle",
    "7.5": "Solve a problem that involves indirect and direct measurements, using the trigonometric ratios, the Pythagorean theorem and measurement instruments such as a clinometer or metre stick",
    "7.6": "Solve right triangles",
    "7.7": "Solve a problem that involves one or more right triangles by applying the primary trigonometric ratios or the Pythagorean theorem"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at line 769); it agrees exactly with the codes
     the bank entries themselves carry at each placement. */
  unitInd: {
    "1": ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8", "5.9", "5.10", "5.11", "5.12", "5.13", "5.14", "5.15", "6.1", "6.2", "6.3", "6.4"],
    "2": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "1.10", "1.12", "1.13", "1.14", "1.15", "1.16", "1.17", "1.18", "1.19", "1.20", "1.21", "1.22"],
    "3": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14"],
    "4": ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "4.9", "4.10", "4.11", "4.12", "4.13", "4.14", "4.15", "4.16", "4.19", "4.28", "4.29", "4.30", "4.31", "4.32", "4.37", "4.45", "4.46", "4.47", "4.48", "4.49"],
    "5": ["4.17", "4.18", "4.20", "4.21", "4.22", "4.23", "4.24", "4.25", "4.26", "4.27", "4.33", "4.34", "4.35", "4.36", "4.38", "4.39", "4.40", "4.41", "4.42", "4.43", "4.44"],
    "6": ["4.50", "4.51", "4.52", "4.53", "4.54", "4.55", "4.56", "4.57"],
    "7": ["7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7"]
  },

  /* Presets, from the standalone builder markup (the preset
     buttons, lines 286 to 288) and their handlers (lines 8127
     to 8129): the mid preset selects Units 1 to 3 and the final
     preset Units 4 to 7, each resetting the level mix to
     20/60/20, and the All preset selects every unit (the
     handler passes Units 1 to 9; Units 8 and 9 do not exist in
     this course, so the effective selection is Units 1 to 7,
     the same seven units the shell's All wiring selects). The
     face card's scope lines for the two presets (updateFace,
     lines 6048 to 6055) are the preset labels with the
     parenthetical opened up, exactly what the shell derives
     from the labels, so no faceLabel is needed. The
     standalone's dedicated All-units face line, "All units:
     Units 1 to 7", is not reproduced: the shell lists the
     units for an All selection, the same accepted difference
     as the Math 3200 port. The standalone's selection-engine
     note (index.html, lines 5785 to 5790) records that no unit
     is sampled partway in this course: no entry carries a
     postMid flag and neither preset caps the pool, so no cap
     or midNote is configured; and no entry carries a PK-coded
     indicator (its isPK is a shim that is always false here),
     so pkPracticeOnly is not set either. */
  presets: {
    mid:   { units: [1, 2, 3], mix: [20, 60, 20], label: "Mid-course review (Units 1 to 3)" },
    final: { units: [4, 5, 6, 7], mix: [20, 60, 20], label: "Final review (Units 4 to 7)" }
  },

  /* The builder's level inputs ship at 20/60/20 (markup lines
     369 to 371), the mix its Advanced options note describes
     from the published 2026-2027 tables of specifications
     (lines 365 to 368). */
  defaultMix: [20, 60, 20],

  /* Exam blueprint, translated from the standalone app's
     composer (math-1201-review/index.html, composeExam at
     lines 6954 to 7000). Every multi-unit paper is pooled:
     50 marks, 27 selected response at levels 10/15/2 (line
     6956) and 23 constructed-response marks (line 6957) whose
     Level 3 share is subset-summed to 8, then 9, then 7 (line
     6975), giving level totals 10/30/10; the pooled fallback
     below reproduces it, and the mid and final scopes compose
     through it just as the standalone's do (there are no
     per-scope blueprints). A single unit composes the unit
     test: 25 marks, SR 11 (the standalone's single-unit plan
     is [4, 6, 1], line 6956; the shell guides unit-test levels
     at 20/60/20, the accepted translation the other pooled
     ports carry) and CR 14 (line 6957), its Level 3 CR share
     steered to 5, then 4, then 6 (line 6975), inside the
     shell composer's standing 4 to 6 window. */
  exam: {
    fallback: { srCount: 27, crMarks: 23, levels: [10, 30, 10], crL3: [8, 9, 7] }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panel carried verbatim from the standalone app
     (REF_HTML at line 6043): a panel for Unit 1 only, and no
     always-on panel. */
  panels: {
    "1": "<b>Imperial:</b> \\(1\\ \\text{ft.} = 12\\ \\text{in.}\\); \\(1\\ \\text{yd.} = 3\\ \\text{ft.}\\); \\(1\\ \\text{mi.} = 1760\\ \\text{yd.}\\)<br><b>Imperial to SI Units:</b> \\(1\\ \\text{in.} = 2.54\\ \\text{cm} \\approx 2.5\\ \\text{cm}\\); \\(1\\ \\text{mi.} \\approx 1.6\\ \\text{km}\\)<br><b>Surface Area: Cylinder:</b> \\(A = 2\\pi r^2 + 2\\pi r h\\)<br><b>Surface Area: Cone:</b> \\(A = \\pi r^2 + \\pi r s\\)<br><b>Surface Area: Sphere:</b> \\(A = 4\\pi r^2\\)<br><b>Volume: Pyramid:</b> \\(V = \\frac{1}{3}[\\,l \\times w \\times h\\,]\\)<br><b>Volume: Cone:</b> \\(V = \\frac{1}{3}[\\pi r^2 h]\\)<br><b>Volume: Sphere:</b> \\(V = \\frac{4}{3}\\pi r^3\\)"
  }
},

"math-1202": {
  id: "math-1202",
  title: "Math 1202 Review: Practice Question Bank",
  shortName: "Math 1202",
  storagePrefix: "m1202",
  reportName: "Math 1202",
  language: "en",
  bankFile: "math-1202.js",
  subject: "Mathematics",
  grade: 10,
  listed: true,

  units: {
    "1": "Consumerism and Travel",
    "2": "Measuring Length",
    "3": "Measuring Area",
    "4": "Getting Paid for Your Work",
    "5": "All About Angles",
    "6": "Pythagorean Relation",
    "7": "Trigonometry"
  },

  /* All 96 indicator codes, wording carried verbatim from the
     standalone app's curriculum map (math-1202-review/index.html,
     UNITS at line 650, INDICATORS at line 651, UNIT_IND at line
     652). */
  indicators: {
    "1.1": "Compare the unit price of two or more given items",
    "1.2": "Compare, using examples, different sales promotion techniques; e.g., deli meat at $2 per 100 g seems less expensive than $20 per kilogram",
    "1.3": "Solve problems that involve determining the best buy, and explain the choice in terms of the cost as well as other factors, such as quality and quantity",
    "1.4": "Determine the percent increase or decrease for a given original and new price",
    "1.5": "Explain the difference between the selling rate and purchasing rate for currency exchange",
    "1.6": "Convert between Canadian currency and foreign currency using formulas, charts and tables",
    "1.7": "Solve, using proportional reasoning, a contextual problem that involves currency exchange",
    "1.8": "Explain how to estimate the cost of items in Canadian currency while in a foreign country, and explain why this might be important",
    "3.1": "Explain how the SI system was developed, and explain its relationship to base ten",
    "3.8": "Explain how the imperial system was developed",
    "3.9": "Compare the American and British imperial measurement systems; e.g., gallons, bushels, tons",
    "3.2": "Identify contexts that involve the SI system",
    "3.10": "Identify contexts that involve the imperial system",
    "3.3": "Match the prefixes used for SI units of measurement with the powers of ten",
    "3.4": "Explain, using examples, how and why decimals are used in the SI system",
    "3.11": "Explain, using examples, how and why fractions are used in the imperial system",
    "3.5": "Provide an approximate measurement in SI units for a measurement given in imperial units; e.g., 1 inch is approximately 2.5 cm",
    "3.12": "Provide an approximate measure in imperial units for a measurement in SI units; e.g., 1 litre is approximately US gallon",
    "3.6": "Convert a given measurement from SI to imperial units by using proportional reasoning (including formulas); e.g., Celsius to Fahrenheit, centimetres to inches",
    "3.13": "Convert a given measurement from imperial to SI units using proportional reasoning (including formulas); e.g., Fahrenheit to Celsius, inches to centimetres",
    "3.14": "Write a given linear measure expressed in one imperial unit in another imperial unit",
    "3.15": "Provide an example of a situation in which a fractional linear measurement would be divided by a fraction",
    "3.16": "Measure inside diameters, outside diameters, lengths, widths of various given objects, and distances, using various measuring instruments",
    "3.17": "Identify a referent for a given common SI or imperial unit of linear measurement",
    "3.18": "Estimate a linear measurement, using a referent",
    "3.19": "Estimate the dimensions of a given regular 3-D object or 2-D shape, using a referent; e.g., the height of the desk is about three rulers long, so the desk is approximately three feet height",
    "3.7": "Write a given linear measurement expressed in one SI unit in another SI unit",
    "3.20": "Solve a linear measurement problem including perimeter, circumference, and length + width + height (used in shipping and air travel)",
    "3.21": "Determine the operation that should be used to solve a linear measurement problem",
    "2.1": "Create and solve a contextual problem that involves a formula",
    "2.2": "Describe, using examples, how a given formula is used in a trade or occupation",
    "2.3": "Solve a contextual problem that involves the application of a formula that does not require manipulation",
    "2.4": "Solve a contextual problem that involves the application of a formula that requires manipulation",
    "3.22": "Determine, using a variety of strategies, the midpoint of a linear measurement such as length, width, height, depth, diagonal and diameter of a 3-D object, and explain the strategies",
    "3.23": "Determine if a solution to a problem that involves linear measure is reasonable",
    "2.5": "Identify and correct errors in a solution to a problem that involves a formula",
    "3.24": "Identify and compare referents for area measurements in SI and imperial units",
    "3.25": "Estimate an area measurement, using a referent",
    "3.26": "Estimate the area of a given regular, composite or irregular 2-D shape, using an SI square grid and an imperial square grid",
    "3.27": "Determine if a solution to a problem that involves an area measurement is reasonable",
    "3.28": "Identify a situation where a given SI or imperial area unit would be used",
    "3.29": "Write a given area measurement expressed in one SI unit squared in another SI unit squared",
    "3.30": "Write a given area measurement expressed in one imperial unit squared in another imperial unit squared",
    "3.31": "Solve a contextual problem that involves the area of a regular, a composite or an irregular 2-D shape",
    "3.32": "Solve a problem, using formulas for determining the areas of regular, composite and irregular 2-D shapes, including circles",
    "3.33": "Explain, using examples, the effect of changing the measurement of one or more dimensions on area and perimeter of rectangles",
    "3.34": "Solve a problem that involves determining the surface area of 3-D objects, including right cylinders and cones",
    "1.9": "Describe, using examples, various methods of earning income",
    "1.10": "Identify and list jobs that commonly use different methods of earning income; e.g., hourly wage, wage and tips, salary, commission, contract, bonus, shift premiums",
    "1.11": "Determine in decimal form, from a time schedule, the total time worked in hours and minutes, including time and a half and/or double time",
    "1.12": "Determine gross pay from given or calculated hours worked when given: • the base hourly wage, with and without tips. • the base hourly wage, plus overtime (time and a half, double time)",
    "1.13": "Investigate, with technology, &quot;what if...&quot; questions related to changes in income; e.g., \"What if there is a change in the rate of pay?\"",
    "1.14": "Identify and correct errors in a solution to a problem that involves gross or net pay",
    "1.15": "Explain why gross pay and net pay are not the same",
    "1.16": "Determine the Canadian Pension Plan (CPP), Employment Insurance (EI) and income tax deductions for a given gross pay",
    "1.17": "Determine net pay when given deductions; e.g., health plans, uniforms, union dues, charitable donations, payroll tax",
    "1.18": "Determine gross pay for earnings acquired by: • base wage, plus commission • single commission rate",
    "1.19": "Describe the advantages and disadvantages for a given method of earning income; e.g., hourly wage, tips, piecework, salary, commission, contract work",
    "3.44": "Measure, using a protractor, angles in various orientations",
    "3.45": "Draw and describe angles with various measures, including acute, right, straight, obtuse and reflex angles",
    "3.46": "Identify referents for angles",
    "3.47": "Sketch a given angle",
    "3.48": "Estimate the measure of a given angle, using 22.5°, 30°, 45°, 60°, 90° and 180° as referent angles",
    "3.49": "Solve a contextual problem that involves angles",
    "3.50": "Explain and illustrate how angles can be replicated in a variety of ways; e.g., Mira, protractor, compass and straightedge, carpenter's square, dynamic geometry software",
    "3.51": "Replicate angles in a variety of ways, with and without technology",
    "3.52": "Bisect an angle, using a variety of methods",
    "3.35": "Sort a set of lines as perpendicular, parallel or neither, and justify this sorting",
    "3.36": "Illustrate and describe complementary and supplementary angles",
    "3.37": "Identify, in a set of angles, adjacent angles that are not complementary or supplementary",
    "3.38": "Identify and name pairs of angles formed by parallel lines and a transversal, including corresponding angles, vertically opposite angles, alternate interior angles, alternate exterior angles, interior angles on the same side of transversal, and exterior a",
    "3.39": "Explain and illustrate the relationships of angles formed by parallel lines and a transversal",
    "3.40": "Determine the measures of angles involving parallel lines and a transversal, using angle relationships",
    "3.41": "Explain, using examples, why the angle relationships do not apply when the lines are not parallel",
    "3.42": "Determine if lines or planes are perpendicular or parallel, e.g., wall perpendicular to the floor, and describe the strategy used",
    "3.43": "Solve a contextual problem that involves angles formed by parallel lines and a transversal (including perpendicular transversals)",
    "3.53": "Describe historical and contemporary applications of the Pythagorean theorem",
    "3.54": "Explain, using illustrations, why the Pythagorean theorem only applies to right triangles",
    "3.55": "Verify the Pythagorean theorem, using examples and counterexamples, including drawings, concrete materials and technology",
    "3.56": "Determine if a given triangle is a right triangle, using the Pythagorean theorem",
    "3.57": "Explain why a triangle with the side length ratio of 3:4:5 is a right triangle",
    "3.58": "Explain how the ratio of 3:4:5 can be used to determine if a corner of a given 3-D object is square (90 degrees) or if a given parallelogram is a rectangle",
    "3.59": "Solve a problem, using the Pythagorean theorem",
    "2.6": "Explain and verify why different forms of the same formula are equivalent",
    "3.60": "Determine if two or more regular or irregular polygons are similar",
    "3.61": "Explain why two or more right triangles with a shared acute angle are similar",
    "3.62": "Explain the relationships between the corresponding sides of two polygons that have corresponding angles of equal measure",
    "3.63": "Explain why two given polygons are not similar",
    "3.64": "Solve a contextual problem that involves the similarity of polygons",
    "3.65": "Draw a polygon that is similar to a given polygon",
    "5.1": "Show, for a specified acute angle in a set of right triangles, that the ratios of length of the side opposite to the length of the side adjacent are equal, and generalize a formula for the tangent ratio",
    "5.2": "Show, for a specified acute angle in a set of right triangles, that the ratios of length of the side opposite to the length of the hypotenuse are equal, and generalize a formula for the sine ratio",
    "5.3": "Show, for a specified acute angle in a set of right triangles, that the ratios of length of the side adjacent to the length of the hypotenuse are equal, and generalize a formula for the cosine ratio",
    "5.4": "Identify situations where the trigonometric ratios are used for indirect measurement of angles and lengths",
    "5.5": "Solve a contextual problem that involves right angles, using the primary trigonometric ratios",
    "5.6": "Determine if a solution to a problem that involves primary trigonometric ratios is reasonable"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at line 652): 116 placements over the 96 codes;
     it agrees exactly with the codes the bank entries themselves
     carry at each placement. */
  unitInd: {
    "1": ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "3.1", "3.8", "3.9", "3.2", "3.10", "3.3", "3.4", "3.11", "3.5", "3.12", "3.6", "3.13"],
    "2": ["3.14", "3.11", "3.15", "3.16", "3.17", "3.18", "3.19", "3.7", "3.5", "3.12", "3.6", "3.13", "3.20", "3.21", "2.1", "2.2", "2.3", "2.4", "3.22", "3.23", "2.5"],
    "3": ["3.24", "3.25", "3.26", "3.27", "3.28", "3.29", "3.30", "3.31", "3.32", "2.3", "2.4", "2.1", "2.5", "3.33", "3.34"],
    "4": ["1.9", "1.10", "1.11", "1.12", "2.3", "1.13", "1.14", "1.15", "1.16", "1.17", "1.18", "1.19"],
    "5": ["3.44", "3.45", "3.46", "3.47", "3.48", "3.49", "3.50", "3.51", "3.52", "3.35", "3.36", "3.37", "3.38", "3.39", "3.40", "3.41", "3.42", "3.43"],
    "6": ["3.53", "3.54", "3.55", "3.56", "3.57", "3.58", "2.2", "3.59", "2.3", "2.4", "2.1", "2.6"],
    "7": ["3.60", "3.61", "3.62", "3.63", "3.64", "3.65", "2.4", "5.1", "5.2", "5.3", "5.4", "5.5", "2.3", "2.6", "2.2", "2.1", "2.5", "5.6"]
  },

  /* Presets: the standalone ships exactly one, "All units", on
     its presetAll button (builder markup line 286; handler line
     7382, selecting Units 1 to 7 with no level mix change; the
     builder level inputs ship at the 20/60/20 default, lines
     367 to 369). The shell's All wiring selects every unit in
     the course when the config carries no allUnits key, which
     is the same seven units, so the All preset needs no entry
     here. There is no mid-course or final preset in this
     course: the standalone's selection-engine note (lines 5003
     to 5009) records the course's mid-course scope as Units 1
     to 3 whole and its end-of-course scope as Units 4 to 7
     whole for its tables of specifications, but ships no
     preset buttons and no per-scope blueprints for them, and
     no entry carries a postMid flag, so none are configured
     here; its tests are single-unit practice tests, below.
     The shell hides both preset buttons for a course whose
     config names neither. */
  presets: {},

  /* Staged hints: every entry in this bank carries a two-stage
     hint (the standalone's E stores them as hint1 and hint2,
     line 654, and its showHint reveals strategy, then first
     step, lines 5287 to 5297; its face card promises them,
     line 5283). The flag turns on the shell's restored hint
     UI for this course: the Hint button and hint box on
     practice questions, and the face card's "a hint, "
     wording. */
  hints: true,

  /* Exam blueprint, translated from the standalone app's
     composer (math-1202-review/index.html: the practice-test
     note at lines 6186 to 6195, the TEST_ constants at lines
     6196 to 6199, composeExam at lines 6208 to 6257, and
     examShortNow at line 5862). This composer builds
     single-unit practice tests only and returns null for a
     multi-unit selection (the standalone's startExam, line
     6270, refuses
     a multi-unit selection up front with the one-unit-at-a-
     time message the shell gives under exam.singleOnly). A
     unit test is 15 selected-response questions at 1 mark
     each, drawn at the exact level split 3/9/3 with an
     any-level top-up when a level runs short, plus exactly
     six constructed-response questions: three carrying 2
     marks and three carrying 3, all at Level 2 or 3, at
     least one of the six at Level 3, summing to 15 marks,
     for 30 marks in total. The sextetCr branch of the
     shell's composer reproduces that algorithm; courses
     without sextetCr never enter it. The standalone also
     models the sitting at TEST_MINUTES 60 (a one-hour soft
     timer); the shell's timer text is its own generic
     wording for every course. The bank's per-unit
     constructed-response pattern (six Level 2 entries at
     2/2/2/3/3/3 marks and two Level 3 at 2/3 in every unit)
     is what guarantees a valid sextet always exists. */
  exam: {
    singleOnly: true
  },

  unitTest: { total: 30, sr: 15, cr: 15, srLevels: [3, 9, 3], sextetCr: true },

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at line 5261): a panel for every one of the
     seven units, and no always-on panel. */
  panels: {
    "1": "<b>Unit price:</b> \\(\\text{unit price} = \\frac{\\text{total cost}}{\\text{quantity}}\\). Compare items by the cost for the same amount, such as per 100 g, per litre or per item. A price per 100 g times 10 gives the price per kilogram.<br>\n<b>Best buy:</b> the lowest unit price is one factor. Also weigh quality, how long the item lasts, how much is actually needed, storage space, and whether extra amounts will spoil or go unused.<br>\n<b>Percent change:</b> \\(\\text{percent change} = \\frac{\\text{new} - \\text{original}}{\\text{original}} \\times 100\\), using the absolute change. Always divide by the original amount.<br>\n<b>Currency exchange:</b> rates are named from the bank's point of view. The selling rate is used when the bank sells foreign currency to you; the purchasing rate is used when the bank purchases foreign currency from you, and it is the lower rate. With a rate of \\(1\\) foreign unit \\(= r\\) CAD: foreign amount \\(=\\) CAD \\(\\div r\\), and CAD amount \\(=\\) foreign amount \\(\\times r\\).<br>\n<b>Estimating abroad:</b> round the rate to a friendly number first (for example 1.47 to 1.50), then multiply the foreign price by the rounded rate for a quick Canadian cost estimate.<br>\n<b>SI prefixes and powers of ten:</b> kilo- \\(= 10^{3}\\), hecto- \\(= 10^{2}\\), deca- \\(= 10^{1}\\), deci- \\(= 10^{-1}\\), centi- \\(= 10^{-2}\\), milli- \\(= 10^{-3}\\). SI units step by powers of ten, so conversions move the decimal place and SI measures are written with decimals.<br>\n<b>Imperial measures:</b> units divide into halves, quarters, eighths and sixteenths, so imperial measures are often written as fractions. American and British versions differ: 1 US gallon \\(\\approx 3.79\\) L and 1 imperial gallon \\(\\approx 4.55\\) L; a US (short) ton is 2000 lb and a British (long) ton is 2240 lb.<br>\n<b>Approximate equivalents:</b> 1 inch \\(\\approx 2.5\\) cm; 1 litre \\(\\approx \\frac{1}{4}\\) US gallon (so 1 US gallon \\(\\approx 4\\) litres).<br>\n<b>Temperature formulas:</b> \\(F = \\frac{9}{5}C + 32\\) converts Celsius to Fahrenheit; \\(C = \\frac{5}{9}(F - 32)\\) converts Fahrenheit to Celsius.",
    "2": "<b>Imperial length:</b> \\(12\\text{ in} = 1\\text{ ft}\\), \\(3\\text{ ft} = 1\\text{ yd}\\), \\(1760\\text{ yd} = 1\\text{ mi}\\). Tape measures mark fractions of an inch (halves, quarters, eighths, sixteenths).<br>\n<b>SI length ladder:</b> \\(10\\text{ mm} = 1\\text{ cm}\\), \\(100\\text{ cm} = 1\\text{ m}\\), \\(1000\\text{ m} = 1\\text{ km}\\). Each step is a power of ten, so conversions move the decimal point.<br>\n<b>Between systems:</b> \\(1\\text{ in} = 2.54\\text{ cm}\\) exactly. Approximates: \\(1\\text{ in} \\approx 2.5\\text{ cm}\\), \\(1\\text{ ft} \\approx 30\\text{ cm}\\), \\(1\\text{ yd} \\approx 0.9\\text{ m}\\), \\(1\\text{ mi} \\approx 1.6\\text{ km}\\), \\(1\\text{ m} \\approx 1.1\\text{ yd}\\).<br>\n<b>Perimeter:</b> distance around a shape. Rectangle: \\(P = 2L + 2W\\).<br>\n<b>Circumference:</b> distance around a circle. \\(C = 2\\pi r = \\pi d\\), where \\(r\\) is the radius and \\(d\\) is the diameter, and \\(d = 2r\\).<br>\n<b>Inside diameter:</b> inside diameter \\(=\\) outside diameter \\(- 2 \\times\\) wall thickness (the wall is crossed twice).<br>\n<b>Midpoint:</b> half the total length, or the average of two end readings: \\(\\text{midpoint} = \\frac{\\text{first reading} + \\text{second reading}}{2}\\).<br>\n<b>Shipping and air travel size:</b> \\(\\text{size} = L + W + H\\) (a sum, not a volume).<br>\n<b>Referents:</b> \\(1\\text{ mm}\\) about a dime thickness, \\(1\\text{ cm}\\) about a fingernail width, \\(1\\text{ m}\\) about counter height, \\(1\\text{ in}\\) about a thumb width, \\(1\\text{ ft}\\) a standard ruler, \\(1\\text{ yd}\\) about door knob height.",
    "3": "<b>Rectangle:</b> \\(A = lw\\). <b>Square:</b> \\(A = s^2\\).<br>\n<b>Triangle:</b> \\(A = \\tfrac{1}{2}bh\\). <b>Parallelogram:</b> \\(A = bh\\), using the vertical height.<br>\n<b>Circle:</b> \\(A = \\pi r^2\\), where \\(r\\) is the radius, half of the diameter.<br>\n<b>Composite shapes:</b> split the shape into rectangles and triangles and add the parts, or complete the shape and subtract the missing part.<br>\n<b>Estimating on a grid:</b> count full squares, count partial squares as about half squares, then add.<br>\n<b>Surface area of a prism:</b> add the areas of all the faces. A closed rectangular prism: \\(S = 2(lw + lh + wh)\\).<br>\n<b>Surface area of a right cylinder (closed):</b> \\(S = 2\\pi r h + 2\\pi r^2\\) (curved side plus two ends).<br>\n<b>Surface area of a right cone:</b> \\(S = \\pi r s + \\pi r^2\\), where \\(s\\) is the slant height (curved side plus base).<br>\n<b>Squared conversions:</b> \\(1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2\\), \\(1\\ \\text{cm}^2 = 100\\ \\text{mm}^2\\), \\(1\\ \\text{ft}^2 = 144\\ \\text{in}^2\\), \\(1\\ \\text{yd}^2 = 9\\ \\text{ft}^2\\). Square the linear factor: area factors are \\(100^2\\), \\(10^2\\), \\(12^2\\) and \\(3^2\\).",
    "4": "<b>Gross pay (hourly):</b> \\(\\text{gross pay} = \\text{hours} \\times \\text{hourly wage}\\), plus any tips earned<br>\n<b>Overtime:</b> time and a half pays \\(1.5 \\times\\) the wage for each overtime hour; double time pays \\(2 \\times\\) the wage<br>\n<b>Salary per pay period:</b> \\(\\text{pay per period} = \\text{annual salary} \\div \\text{number of pay periods in the year}\\)<br>\n<b>Commission:</b> \\(\\text{commission} = \\text{rate} \\times \\text{sales}\\); gross pay with a base is \\(\\text{base} + \\text{commission}\\)<br>\n<b>Decimal hours:</b> change minutes to hours with \\(\\text{hours} = \\text{minutes} \\div 60\\); unpaid breaks do not count as time worked<br>\n<b>Net pay:</b> \\(\\text{net pay} = \\text{gross pay} - \\text{total deductions}\\)<br>\n<b>Deductions:</b> CPP, EI and income tax come off gross pay, along with items such as health plans, union dues, uniforms and donations; the rate or amount for each deduction is given in the question<br>\n<b>Vacation pay:</b> when it applies, vacation pay is a percent of gross earnings, with the percent given in the question, and it is added to earnings",
    "5": "<b>Angle types:</b> acute is greater than \\(0^\\circ\\) and less than \\(90^\\circ\\); right is exactly \\(90^\\circ\\); obtuse is greater than \\(90^\\circ\\) and less than \\(180^\\circ\\); straight is exactly \\(180^\\circ\\); reflex is greater than \\(180^\\circ\\) and less than \\(360^\\circ\\)<br>\n<b>Complementary and supplementary:</b> complementary angles add to \\(90^\\circ\\); supplementary angles add to \\(180^\\circ\\)<br>\n<b>Straight lines and points:</b> angles on a straight line add to \\(180^\\circ\\); angles around a point add to \\(360^\\circ\\); vertically opposite angles are equal<br>\n<b>Parallel lines and a transversal:</b> corresponding angles are equal; alternate interior angles are equal; alternate exterior angles are equal; interior angles on the same side of the transversal add to \\(180^\\circ\\); exterior angles on the same side add to \\(180^\\circ\\). These relationships hold only when the two lines are parallel<br>\n<b>Parallel and perpendicular:</b> parallel lines never meet and stay the same distance apart; perpendicular lines meet at \\(90^\\circ\\)<br>\n<b>Referent angles:</b> \\(22.5^\\circ\\) is half of \\(45^\\circ\\); \\(30^\\circ\\) is the gap between neighbouring hour marks on a clock; \\(45^\\circ\\) is half of a square corner; \\(60^\\circ\\) is twice \\(30^\\circ\\); \\(90^\\circ\\) is a square corner; \\(180^\\circ\\) is a straight line<br>\n<b>Measuring with a protractor:</b> centre the protractor on the vertex, line one ray up with \\(0^\\circ\\), and read the scale where the second ray crosses<br>\n<b>Replication and bisection:</b> a replicated angle has the same measure as the original; bisecting an angle splits it into two equal angles, each half the original measure",
    "6": "<b>Pythagorean theorem:</b> in a right triangle with legs \\(a\\) and \\(b\\) and hypotenuse \\(c\\), \\(a^2 + b^2 = c^2\\). The hypotenuse is the side opposite the right angle and is the longest side.<br>\n<b>Finding the hypotenuse:</b> \\(c = \\sqrt{a^2 + b^2}\\). Square both legs, add, then take the square root.<br>\n<b>Finding a leg:</b> \\(a = \\sqrt{c^2 - b^2}\\) and \\(b = \\sqrt{c^2 - a^2}\\). Square the hypotenuse, subtract the square of the known leg, then take the square root.<br>\n<b>Equivalent forms:</b> \\(a^2 + b^2 = c^2\\), \\(b^2 = c^2 - a^2\\) and \\(a^2 = c^2 - b^2\\) all say the same thing. Moving a squared term across the equals sign changes its sign.<br>\n<b>Right angle test (the converse):</b> a triangle is a right triangle exactly when the squares of the two shorter sides add to the square of the longest side. If the totals differ, there is no right angle.<br>\n<b>Why right triangles only:</b> the squares balance only when the angle between the two shorter sides is 90 degrees. At a wider angle the longest side is longer than the theorem predicts, and at a narrower angle it is shorter.<br>\n<b>The 3:4:5 check:</b> a triangle with sides in the ratio 3:4:5 is a right triangle, since \\(3^2 + 4^2 = 5^2\\). Any multiple, such as 6:8:10 or 30:40:50, is also a right triangle.<br>\n<b>Checking a corner:</b> mark 3 parts along one side and 4 parts along the other from the corner. The corner is square exactly when the distance between the marks is 5 parts, using the same part size throughout.<br>\n<b>Rectangles and diagonals:</b> the diagonal of a rectangle is the hypotenuse of a right triangle with the length and width as legs. A parallelogram is a rectangle when its diagonal matches the length the theorem predicts.",
    "7": "<b>Similar polygons:</b> corresponding angles are equal and corresponding sides are in the same ratio (one scale factor for every pair).<br>\n<b>Right triangles with a shared acute angle</b> are similar: both have a \\(90^\\circ\\) angle and the shared angle, so the third angles match too.<br>\n<b>Scale factor:</b> image side \\(\\div\\) original side. Perimeters scale by the same factor; areas scale by the factor squared.<br>\n<b>Tangent ratio:</b> \\(\\tan A = \\frac{\\text{opposite}}{\\text{adjacent}}\\)<br>\n<b>Sine ratio:</b> \\(\\sin A = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\)<br>\n<b>Cosine ratio:</b> \\(\\cos A = \\frac{\\text{adjacent}}{\\text{hypotenuse}}\\)<br>\n<b>Choosing a ratio:</b> pick the ratio built from the known side and the wanted side, relative to the marked angle. Also, \\(\\tan A = \\frac{\\sin A}{\\cos A}\\).<br>\n<b>Finding an angle:</b> form the ratio from the two known sides, then use the inverse ratio: \\(\\tan^{-1}\\), \\(\\sin^{-1}\\) or \\(\\cos^{-1}\\).<br>\n<b>Angles of elevation and depression</b> are measured from the horizontal. The angle of depression from a height equals the angle of elevation from below.<br>\n<b>Reasonableness checks:</b> the hypotenuse is the longest side; sine and cosine values are at most \\(1\\); each acute angle of a right triangle is between \\(0^\\circ\\) and \\(90^\\circ\\)."
  }
  },

  /* Mathematics 9 (Math 9), ported from the standalone app at
     math-9-review/ (served from the Math9Review repo). The
     standalone's bank is bank-src.js (byte-identical to the
     splice served inside its index.html, between the
     BANK-SRC-BEGIN and BANK-SRC-END markers); the port's bank
     sources are banks/math-9/, cut verbatim from bank-src.js in
     its own order (helpers, Units 1 to 4, the November 7, 2026
     top-up tranche for Units 1 to 4, the final-scope tranche
     with Units 5 to 9, then the November 9, 2026 pool-gap fill
     additions), with the source's CR_MARKS literal (bank-src.js
     line 6409) carried as the per-file CRMARKS manifests: 221
     entries (per-unit 18/25/33/29/32/19/26/16/23) and 109
     constructed-response keys. Kept out of the picker
     (listed:false) until Jason passes it. */
  "math-9": {
  id: "math-9",
  shortName: "Math 9",

  /* Long name (ruling 5 in the junior scoping): the standalone
     heads its face card "Mathematics 9 Review" (line 249) and
     subtitles itself "Fresh practice questions for Mathematics
     9, drawn by unit or by curriculum indicator." (line 244).
     The header and document title keep the short name: its
     <title> (line 6) is "Math 9 Review: Practice Question
     Bank", carried as title below. */
  longName: "Mathematics 9",
  title: "Math 9 Review: Practice Question Bank",
  subject: "Mathematics",
  grade: 9,
  listed: true,
  storagePrefix: "m9",
  bankFile: "math-9.js",
  defaultCheckMode: "each",

  /* Unit names verbatim from the standalone app (UNITS at
     line 652). */
  units: {
    "1": "Rational Numbers",
    "2": "Square Roots and Surface Area",
    "3": "Powers and Exponent Laws",
    "4": "Polynomials",
    "5": "Linear Equations and Inequalities",
    "6": "Linear Relations",
    "7": "Similarity and Transformations",
    "8": "Circle Geometry",
    "9": "Probability and Statistics"
  },

  /* Indicator texts verbatim from the standalone app
     (INDICATORS at line 653): 108 codes. */
  indicators: {
    "3.1": "Order a given set of rational numbers, in fraction and decimal form, by placing them on a number line, e.g., 3/5, -0.666..., 0.5, -5/8",
    "3.2": "Identify a rational number that is between two given rational numbers",
    "6.1": "Solve a given problem involving operations on rational numbers in fraction form and decimal form",
    "6.2": "Solve a given problem by applying the order of operations without the use of technology",
    "6.3": "Solve a given problem by applying the order of operations with the use of technology",
    "6.4": "Identify the error in applying the order of operations in a given incorrect solution",
    "3.3": "Determine whether a given rational number is a square number and explain the reasoning",
    "6.9": "Determine the square root of a given positive rational number that is a perfect square",
    "6.10": "Identify the error made in a given calculation of a square root, e.g., Is 3.2 the square root of 6.4?",
    "6.11": "Determine a positive rational number given the square root of that positive rational number",
    "6.5": "Estimate the square root of a given rational number that is not a perfect square using the roots of perfect squares as benchmarks",
    "6.6": "Determine an approximate square root of a given rational number that is not a perfect square using technology, e.g., calculator, computer",
    "6.7": "Explain why the square root of a given rational number as shown on a calculator may be an approximation",
    "6.8": "Identify a number with a square root that is between two given numbers",
    "9.1": "Determine the overlap in a given concrete composite 3-D object, and explain its effect on determining the surface area (limited to right cylinders, right rectangular prisms and right triangular prisms)",
    "9.2": "Determine the surface area of a given concrete composite 3-D object (limited to right cylinders, right rectangular prisms and right triangular prisms)",
    "9.3": "Solve a given problem involving surface area",
    "3.4": "Demonstrate the difference between the exponent and the base by building models of a given power, such as 2³ and 3²",
    "3.5": "Explain, using repeated multiplication, the difference between two given powers in which the exponent and base are interchanged, e.g., 10³ and 3¹⁰",
    "3.6": "Express a given power as a repeated multiplication",
    "3.7": "Express a given repeated multiplication as a power",
    "3.8": "Explain the role of parentheses in powers by evaluating a given set of powers, e.g., (-2)⁴, (-2⁴) and -2⁴",
    "3.9": "Demonstrate, using patterns, that a0 is equal to 1 for a given value of a (a ≠ 0)",
    "3.10": "Evaluate powers with integral bases (excluding base 0) and whole number exponents",
    "3.11": "Explain, using examples, the exponent laws of powers with integral bases (excluding base 0) and whole number exponents: • (aᵐ)(aⁿ) = aᵐ + ⁿ •",
    "3.12": "Evaluate a given expression by applying the exponent laws",
    "3.13": "Determine the sum of two given powers, e.g., 5² + 5³, and record the process",
    "3.14": "Determine the difference of two given powers, e.g., 4³ - 4², and record the process",
    "3.15": "Identify the error(s) in a given simplification of an expression involving powers",
    "8.14": "Identify the variables, degree, number of terms and coefficients, including the constant term, of a given simplified polynomial expression",
    "8.15": "Create a concrete model or a pictorial representation for a given polynomial expression",
    "8.16": "Write the expression for a given model of a polynomial",
    "8.4": "Match equivalent polynomial expressions given in simplified form",
    "8.5": "Identify equivalent polynomial expressions from a given set of polynomial expressions, including pictorial and symbolic representations",
    "8.6": "Model addition of two given polynomial expressions concretely or pictorially and record the process symbolically",
    "8.7": "Model subtraction of two given polynomial expressions concretely or pictorially and record the process symbolically",
    "8.11": "Apply a personal strategy for addition and subtraction of given polynomial expressions, and record the process symbolically",
    "8.13": "Identify the error(s) in a given simplification of a given polynomial expression",
    "8.8": "Model multiplication of a given polynomial expression by a given monomial concretely or pictorially and record the process symbolically",
    "8.9": "Model division of a given polynomial expression by a given monomial concretely or pictorially and record the process symbolically",
    "8.12": "Apply a personal strategy for multiplication and division of a given polynomial expression by a given monomial",
    "8.10": "Provide examples of equivalent polynomial expressions",
    "8.17": "For problems that can be represented by linear equations of the form: • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx + c) = d(ex + f) • a/x = b",
    "8.18": "For problems that can be represented by linear equations of the form: • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx + c) = d(ex + f) • a/x = b",
    "8.19": "For problems that can be represented by linear equations of the form: • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx + c) = d(ex + f) • a/x =",
    "8.20": "For problems that can be represented by linear equations of the form: • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx + c) =",
    "8.21": "For problems that can be represented by linear equations of the form: • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx",
    "8.22": "For problems that can be represented by linear equations of the form: • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx + c) = d(ex + f) • a/",
    "8.1": "Translate a given problem into a single variable linear inequality using the symbols ≥, &gt;, &lt; or ≤",
    "8.2": "Determine if a given rational number is a possible solution of a given linear inequality",
    "8.24": "Graph the solution of a given linear inequality on a number line",
    "8.25": "Generalize and apply a rule for adding and subtracting a positive or negative number to determine the solution of a given inequality",
    "8.26": "Generalize and apply a rule for multiplying or dividing by a positive or negative number to determine the solution of a given inequality",
    "8.27": "Solve a given linear inequality algebraically and explain the process orally or in written form",
    "8.28": "Compare and explain the process for solving a given linear equation to the process for solving a given linear inequality",
    "8.29": "Compare and explain the solution of a given linear equation to the solution of a given linear inequality",
    "8.3": "Verify the solution of a given linear inequality using substitution for multiple elements in the solution",
    "8.30": "Solve a given problem involving a single variable linear inequality and graph the solution",
    "7.1": "Write an expression representing a given pictorial, oral or written pattern",
    "7.2": "Write a linear equation to represent a given context",
    "7.4": "Write a linear equation representing the pattern in a given table of values and verify the equation by substituting values from the table",
    "8.23": "For problems that can be represented by linear equations of the form: • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx + c) = d(ex + f) • a",
    "7.3": "Describe a context for a given linear equation",
    "7.5": "Describe the pattern found in a given graph",
    "7.7": "Graph a given linear relation, including horizontal and vertical lines",
    "7.6": "Match given equations of linear relations with their corresponding graphs",
    "7.8": "Interpolate the approximate value of one variable on a given graph given the value of the other variable",
    "7.9": "Extrapolate the approximate value of one variable from a given graph given the value of the other variable",
    "7.10": "Solve a given problem by graphing a linear relation and analyzing the graph",
    "10.8": "Identify an example in print and electronic media, e.g., newspapers, the Internet, of a scale diagram and interpret the scale factor",
    "10.16": "Draw a diagram to scale that represents an enlargement or reduction of a given 2-D shape",
    "10.17": "Determine the scale factor for a given diagram drawn to scale",
    "10.18": "Determine if a given diagram is proportional to the original 2-D shape and, if it is, state the scale factor",
    "10.7": "Determine if the polygons in a given set are similar and explain the reasoning",
    "10.14": "Draw a polygon similar to a given polygon and explain why the two are similar",
    "10.15": "Solve a given problem using the properties of similar polygons",
    "10.19": "Solve a given problem that involves a scale diagram by applying the properties of similar triangles",
    "10.1": "Classify a given set of 2-D shapes or designs according to the number of lines of symmetry",
    "10.9": "Complete a 2-D shape or design given one half of the shape or design and a line of symmetry",
    "10.2": "Determine if a given 2-D shape or design has rotation symmetry about the point at the centre of the shape or design and, if it does, state the order and angle of rotation",
    "10.10": "Rotate a given 2-D shape about a vertex and draw the resulting image",
    "10.3": "Identify a line of symmetry or the order and angle of rotation symmetry in a given tessellation",
    "10.4": "Identify and describe the types of symmetry created in a given piece of artwork",
    "10.11": "Create or provide a piece of artwork that demonstrates line and rotation symmetry, and identify the line(s) of symmetry and the order and angle of rotation",
    "10.5": "Determine whether two given 2-D shapes on the Cartesian plane are related by either rotation or line symmetry",
    "10.6": "Identify the type of symmetry that arises from a given transformation on the Cartesian plane",
    "10.12": "Complete, concretely or pictorially, a given transformation of a 2-D shape on a Cartesian plane and describe the type of symmetry that results",
    "10.13": "Draw, on a Cartesian plane, the translation image of a given shape using a given translation rule, such as R2, U3 or →→, ↑↑↑, label each vertex and its corresponding ordered pair and determine why the translation may or may not result in li",
    "9.4": "Explain the relationship between the tangent of a circle and the radius at the point of tangency",
    "9.6": "Explain the relationship between the perpendicular from the centre of the circle and a chord",
    "9.7": "Explain the relationship between the measure of the central angle and the inscribed angle subtended by the same arc",
    "9.8": "Determine the measure of a given angle inscribed in a semicircle using the circle properties",
    "9.9": "Explain the relationship between inscribed angles subtended by the same arc",
    "9.5": "Solve a given problem involving application of one or more of the circle properties",
    "12.1": "Provide an example from print and electronic media, e.g., newspapers, the Internet, where probability is used",
    "12.2": "Identify the assumptions associated with a given probability and explain the limitations of each assumption",
    "12.3": "Explain how a single probability can be used to support opposing positions",
    "12.4": "Explain, using examples, how decisions based on probability may be a combination of theoretical probability, experimental probability and subjective judgement",
    "11.1": "Analyze a given case study of data collection, and identify potential problems related to bias, use of language, ethics, cost, time and timing, privacy or cultural sensitivity",
    "11.2": "Provide examples to illustrate how bias, use of language, ethics, cost, time and timing, privacy or cultural sensitivity may influence the data",
    "11.3": "Identify whether a given situation represents the use of a sample or a population",
    "11.4": "Provide an example of a situation in which a population may be used to answer a question and justify the choice",
    "11.5": "Provide an example of a question where a limitation precludes the use of a population and describe the limitation, e.g., too costly, not enough time, limited resources",
    "11.6": "Identify and critique a given example in which a generalization from a sample of a population may or may not be valid for the population",
    "11.7": "Create a rubric to assess a project that includes the assessment of: • a question for investigation • the choice of a data collection method that includes social considerations • the selection of a population or a sample and justifying the cho",
    "11.8": "Develop a project plan that describes: • a question for investigation • the method of data collection that includes social considerations • the method for selecting a population or a sample • the method to be used for collection of the data",
    "11.9": "Complete the project according to the plan, draw conclusions and communicate findings to an audience",
    "11.10": "Self-assess the completed project by applying the rubric"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at line 654): 108 placements over the
     108 codes; it agrees exactly with the codes the bank
     entries themselves carry at each placement. */
  unitInd: {
    "1": ["3.1", "3.2", "6.1", "6.2", "6.3", "6.4"],
    "2": ["3.3", "6.9", "6.10", "6.11", "6.5", "6.6", "6.7", "6.8", "9.1", "9.2", "9.3"],
    "3": ["3.4", "3.5", "3.6", "3.7", "3.8", "3.9", "3.10", "3.11", "3.12", "3.13", "3.14", "3.15"],
    "4": ["8.14", "8.15", "8.16", "8.4", "8.5", "8.6", "8.7", "8.11", "8.13", "8.8", "8.9", "8.12", "8.10"],
    "5": ["8.17", "8.18", "8.19", "8.20", "8.21", "8.22", "8.1", "8.2", "8.24", "8.25", "8.26", "8.27", "8.28", "8.29", "8.3", "8.30"],
    "6": ["7.1", "7.2", "7.4", "8.23", "7.3", "7.5", "7.7", "7.6", "7.8", "7.9", "7.10"],
    "7": ["10.8", "10.16", "10.17", "10.18", "10.7", "10.14", "10.15", "10.19", "10.1", "10.9", "10.2", "10.10", "10.3", "10.4", "10.11", "10.5", "10.6", "10.12", "10.13"],
    "8": ["9.4", "9.6", "9.7", "9.8", "9.9", "9.5"],
    "9": ["12.1", "12.2", "12.3", "12.4", "11.1", "11.2", "11.3", "11.4", "11.5", "11.6", "11.7", "11.8", "11.9", "11.10"]
  },

  /* Presets: the standalone's three buttons (builder markup
     lines 286 to 288) are "Mid-course review (Units 1 to 4)",
     "Final review (Units 5 to 9)" and "All units"; their
     handlers (lines 9548 to 9550) pass the level mix
     [20, 60, 20] for mid and final and no mix change for All,
     and the shell's All wiring selects every unit in the
     course when the config carries no allUnits key, so All
     needs no entry here. The face card names the final scope
     "End-of-course review: Units 5 to 9" (refreshFace, line
     7459), carried here as faceLabel; the mid face line
     "Mid-course review: Units 1 to 4" (line 7458) is exactly
     what the shell derives from the mid label, so mid needs
     no faceLabel. */
  presets: {
    mid:   { units: [1, 2, 3, 4], mix: [20, 60, 20], label: "Mid-course review (Units 1 to 4)" },
    final: { units: [5, 6, 7, 8, 9], mix: [20, 60, 20], label: "Final review (Units 5 to 9)", faceLabel: "End-of-course review (Units 5 to 9)" }
  },

  /* Staged hints: every entry in this bank carries a two-stage
     hint (the standalone's E stores them as hint1 and hint2,
     line 656, and its showHint reveals strategy, then first
     step; its face card promises them, line 7466). The flag
     turns on the shell's hint UI for this course: the Hint
     button and hint box on practice questions, and the face
     card's "a hint, " wording. */
  hints: true,

  /* Timer note (ruling 3 in the junior scoping): the
     standalone's exam timer bar names the real exam's length
     (line 8498) and its timer checkbox label carries the same
     note (line 372). The shell composes the note from this
     string in both spots. */
  timerNote: "1 hour 30 minutes",

  /* Sheet header strings (ruling 4 in the junior scoping): the
     standalone's practice sheet header says "Show all your
     work ..." where the senior chassis says "workings" (its
     sheet header, line 8534). */
  sheetWork: ["Show all your work in the space provided.", "Show all your work on your own paper."],

  /* Exam blueprint, translated from the standalone app's
     composer (composeExam, lines 8375 to 8424): every
     multi-unit paper pools the whole selection at 35 marks,
     18 selected response drawn at level targets [7, 10, 1]
     (level totals [7, 21, 7] once the constructed-response
     levels are counted) and 17 constructed response with the
     Level 3 marks tried at [6, 5, 7] in that order. The
     fallback's total key (35) is read by the shell composer's
     expected-total check and by its short-paper check: the
     standalone's examShortNow (line 8045) judges a multi-unit
     paper short at SR under 18 or CR under 17, exactly
     fallback.srCount and fallback.crMarks. No per-scope
     blueprints: mid and final differ only in which units they
     select. A unit test is the same composer's single-unit
     paper: 25 marks, SR 11 (its own exact split is [4, 6, 1];
     the shell guides unit tests at 20/60/20, as everywhere)
     and CR 14 with the Level 3 marks tried at [5, 4, 6],
     which the shell's unit-test window already matches. */
  exam: {
    fallback: { srCount: 18, crMarks: 17, levels: [7, 21, 7], crL3: [6, 5, 7], total: 35 }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at line 7440): a panel for every one of the nine
     units, and no always-on panel. */
  panels: {
    "1": "<b>Rational numbers</b> can be written as a fraction \\(\\frac{a}{b}\\) where \\(b\\ne 0\\). Integers, terminating decimals and repeating decimals are all rational.<br><b>Order of operations:</b> brackets first, then exponents, then divide and multiply in order from left to right, then add and subtract in order from left to right.<br><b>Fractions:</b> to add or subtract, use a common denominator. To multiply, multiply the tops and multiply the bottoms. To divide, multiply by the reciprocal (flip the second fraction).<br><b>Signs:</b> multiplying or dividing two numbers with the same sign gives a positive result; different signs give a negative result.",
    "2": "<b>Square roots:</b> \\(\\sqrt{a}\\) is the positive number that multiplies by itself to give \\(a\\). Perfect squares to know: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400. A fraction is a perfect square when its top and bottom are both perfect squares.<br><b>Estimating:</b> find the two perfect squares the number sits between, then decide which one it is closer to.<br><b>Surface area</b> is the sum of the areas of all the faces. Rectangular prism: \\(2(lw+lh+wh)\\). Cylinder: \\(2\\pi r^{2}+2\\pi r h\\). Triangular prism: two triangle faces plus three rectangle faces.<br><b>Composite objects:</b> where two objects touch, the touching faces are hidden on both objects, so subtract twice the overlap area.",
    "3": "<b>Powers:</b> in \\(a^{n}\\), \\(a\\) is the base and \\(n\\) is the exponent; the power means \\(a\\) multiplied by itself \\(n\\) times. \\(a^{0}=1\\) for any \\(a\\ne 0\\).<br><b>Exponent laws:</b> \\(a^{m}\\cdot a^{n}=a^{m+n}\\); \\(a^{m}\\div a^{n}=a^{m-n}\\); \\((a^{m})^{n}=a^{mn}\\); \\((ab)^{n}=a^{n}b^{n}\\); \\(\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}\\).<br><b>Parentheses matter:</b> \\((-2)^{4}=16\\), but \\(-2^{4}=-16\\).<br><b>Sums of powers:</b> \\(5^{2}+5^{3}\\) is not a single power. Work out each power first, then add or subtract.",
    "4": "<b>Terms</b> are separated by + and - signs. The <b>coefficient</b> is the number part of a term; the <b>constant term</b> has no variable. The <b>degree</b> of a term is the sum of the exponents of its variables, and the degree of a polynomial is the degree of its highest term.<br><b>Like terms</b> have exactly the same variables with the same exponents. Only like terms can be combined.<br><b>Adding:</b> combine like terms. <b>Subtracting:</b> change every sign in the polynomial being subtracted, then add.<br><b>Multiplying by a monomial:</b> multiply every term. <b>Dividing by a monomial:</b> divide every term.<br>Two expressions are <b>equivalent</b> when they simplify to the same polynomial.",
    "5": "<b>Solving an equation</b> means isolating the variable: do the same operation to both sides to undo what was done to the variable, in reverse order. For \\(3x+5=20\\), subtract 5, then divide by 3.<br><b>Check by substitution:</b> put your answer back into the original equation; both sides must give the same value.<br><b>Inequalities</b> have a range of solutions, graphed on a number line: an open circle means the endpoint is not included, a closed circle means it is included.<br><b>Sign rule:</b> when you multiply or divide both sides of an inequality by a negative number, reverse the inequality sign: \\(-2x>6\\) becomes \\(x<-3\\).",
    "6": "<b>Linear relations:</b> a linear relation has a start value and a steady step, so its values change by the same amount each time.<br><b>From a table:</b> the step is the change in \\(y\\) for each increase of 1 in \\(x\\), and the equation is \\(y = \\text{start} + \\text{step} \\times x\\).<br><b>From a graph:</b> to read a value, go across from the given \\(x\\) to the line, then down to the \\(y\\) value. Reading inside the drawn range is <b>interpolation</b>; predicting beyond the drawn range, by extending the pattern, is <b>extrapolation</b>.<br><b>Special lines:</b> a horizontal line is \\(y = \\text{constant}\\), and a vertical line is \\(x = \\text{constant}\\).",
    "7": "<b>Scale factor</b> is image length \\(\\div\\) original length: \\(k=\\frac{\\text{image}}{\\text{original}}\\). Above 1 enlarges and below 1 reduces; every length is multiplied by \\(k\\).<br><b>Similar figures</b> have equal matching angles and proportional matching sides: each image side \\(\\div\\) its matching original side gives the same \\(k\\).<br><b>Line symmetry</b> means the shape folds onto itself along a fold line. <b>Rotation symmetry</b> means it matches itself under a part turn about its centre: order = matches in a full turn, angle \\(=360°\\div\\) order.<br><b>Translations</b> slide every point the same way: R2, U3 means right 2, up 3, so add 2 to each \\(x\\) and 3 to each \\(y\\).",
    "8": "<b>Vocabulary:</b> a <b>radius</b> joins the centre to the circle; a <b>chord</b> joins two points on the circle; a <b>tangent</b> touches the circle at one point. A <b>central angle</b> sits at the centre; an <b>inscribed angle</b> sits on the circle.<br><b>Tangent:</b> the radius to a point of tangency is perpendicular to the tangent, so the angle is \\(90^{\\circ}\\).<br><b>Chords:</b> the perpendicular from the centre to a chord bisects the chord.<br><b>Central and inscribed:</b> a central angle is twice the inscribed angle on the same arc.<br><b>Semicircle:</b> an angle inscribed in a semicircle is \\(90^{\\circ}\\).<br><b>Same arc:</b> inscribed angles on the same arc are equal.",
    "9": "<b>Probability:</b> theoretical probability comes from counting equally likely outcomes, experimental probability comes from results of trials or data, and subjective judgement is a personal estimate.<br><b>Sample and population:</b> a population is everyone in the group being studied, and a sample is part of the population; random selection helps a sample represent the population.<br><b>Data collection</b> can be spoiled by bias, leading use of language, ethics problems, cost, time and timing, privacy concerns and cultural insensitivity.<br><b>Claims:</b> a claim about a whole population is only as strong as the size and representativeness of the sample behind it."
  }
  },
  /* Mathématiques 9 (Math 9, French), ported from the standalone
     French app at math-9-review-fr/ (served from the
     Math9ReviewFrench repo). The standalone's bank is bank-src.js
     (byte-identical to the splice served inside its index.html);
     the port's bank sources are banks/math-9-fr/, cut verbatim
     from bank-src.js in the English port's order (helpers, Units
     1 to 4, the November 7, 2026 top-up tranche for Units 1 to
     4, Units 5 to 9, then the November 9, 2026 pool-gap fill
     additions), with the source's CR_MARKS literal (bank-src.js
     line 6685) carried as the per-file CRMARKS manifests: 221
     entries (per-unit 18/25/33/29/32/19/26/16/23) and 109
     constructed-response keys, signature-identical to the
     English Math 9 bank entry for entry. The student side
     renders in French through the shell's run-time French
     string layer (build-shell.py), keyed on the language field
     below; teacher-facing strings stay English, as the French
     standalone's own teacher chrome does. Kept out of the
     picker (listed:false) for now. */
  "math-9-fr": {
  id: "math-9-fr",
  shortName: "Mathématiques 9",

  /* Long name and app name as the fork carries them: the fork
     heads its page and face card "Révision de mathématiques 9"
     (its <h1> and face heading), which is the report form's app
     name there too, so it is carried as appName; the subtitle
     and picker name the course "Mathématiques 9", carried as
     longName and shortName. The document title is the fork's
     own <title>: "Mathématiques 9 : banque de questions
     d'entraînement". */
  longName: "Mathématiques 9",
  appName: "Révision de mathématiques 9",
  title: "Mathématiques 9 : banque de questions d'entraînement",
  subject: "Mathématiques",
  grade: 9,
  listed: true,
  language: "fr",
  storagePrefix: "m9fr",
  bankFile: "math-9-fr.js",
  defaultCheckMode: "each",

  /* Unit names verbatim from the standalone app (UNITS at
     line 658). */
  units: {
    "1": "Les nombres rationnels",
    "2": "Les racines carrées et l'aire de la surface",
    "3": "Les lois des puissances et des exposants",
    "4": "Les polynômes",
    "5": "Les équations et les inéquations linéaires",
    "6": "Les relations linéaires",
    "7": "La similarité et les transformations",
    "8": "La géométrie du cercle",
    "9": "La statistique et la probabilité"
  },

  /* Indicator texts verbatim from the standalone app
     (INDICATORS at line 659): 108 codes. */
  indicators: {
    "3.1": "Ordonner un ensemble donné de nombres rationnels, sous forme de fraction et de nombre décimal, en les plaçant sur une droite numérique, ex. : 3/5, -0,666..., 0,5, -5/8",
    "3.2": "Identifier un nombre rationnel situé entre deux nombres rationnels donnés",
    "6.1": "Résoudre un problème donné comportant des opérations sur les nombres rationnels, sous forme de fraction ou de nombre décimal",
    "6.2": "Résoudre un problème donné à l’aide de la priorité des opérations sans l’aide de la technologie",
    "6.3": "Résoudre un problème donné à l’aide de la priorité des opérations et de la technologie",
    "6.4": "Identifier, dans une solution incorrecte donnée, l’erreur faite en appliquant la priorité des opérations",
    "3.3": "Déterminer si un nombre rationnel donné est ou n’est pas un nombre carré et expliquer le raisonnement",
    "6.9": "Déterminer la racine carrée d’un nombre rationnel positif donné, qui est un carré parfait",
    "6.10": "Identifier l’erreur faite dans un calcul d’une racine carrée donné, ex. : un élève pense que 3,2 est la racine carrée de 6,4",
    "6.11": "Déterminer un nombre rationnel positif à partir de la racine carrée de ce nombre rationnel positif donnée",
    "6.5": "Estimer la racine carrée d’un nombre rationnel qui n’est pas un carré parfait donné en ayant recours à des racines carrées de carrés parfaits comme points de repère",
    "6.6": "Déterminer une racine carrée approximative d’un nombre rationnel donné qui n’est pas un carré parfait à l’aide de la technologie, ex. : une calculatrice ou un ordinateur",
    "6.7": "Expliquer pourquoi la racine carrée d’un nombre rationnel donné, calculé à l’aide d’une calculatrice, peut être une approximation",
    "6.8": "Identifier un nombre dont la racine carrée se situe entre deux nombres donnés",
    "9.1": "Déterminer l’aire de la surface du chevauchement dans un objet à trois dimensions donné et expliquer l’effet sur le calcul de l’aire de la surface (se limitant aux cylindres droits et aux prismes droits à base rectangulaire et triangulaire)",
    "9.2": "Déterminer l’aire de la surface d’un objet à trois dimensions donné (se limitant aux cylindres droits et aux prismes droits à base rectangulaire et triangulaire)",
    "9.3": "Résoudre un problème donné comportant l’aire de la surface",
    "3.4": "Démontrer la différence entre l’exposant et la base en concevant des modèles de puissances donnés tels que 2³ et 3²",
    "3.5": "Expliquer, à l’aide de la multiplication répétée, la différence entre deux puissances données dans lesquelles la base et l’exposant sont intervertis, ex. : 10³ et 3¹⁰",
    "3.6": "Exprimer une puissance donnée sous forme d’une multiplication répétée",
    "3.7": "Exprimer une multiplication répétée donnée sous forme d’une puissance",
    "3.8": "Expliquer le rôle des parenthèses dans l’évaluation d’un ensemble donné de puissances, ex. : (-2)⁴, (-2⁴) et -2⁴",
    "3.9": "Démontrer, à l’aide des régularités, que a⁰ est égal à 1, pour une valeur donnée de a où a ≠ 0",
    "3.10": "Évaluer des puissances données ayant des bases qui sont des nombres entiers (excluant 0) et des exposants qui sont des nombres entiers positifs",
    "3.11": "Expliquer, en utilisant des exemples, les lois des exposants ayant des bases qui sont des nombres entiers (excluant 0) et des exposants qui sont des nombres entiers positifs. • (aᵐ)(aⁿ) = aᵐ⁺ⁿ • aᵐ ÷ aⁿ = aᵐ⁻ⁿ, m > n • (aᵐ)ⁿ = aᵐⁿ • (ab)ᵐ = aᵐbᵐ • (a/b)ⁿ = aⁿ/bⁿ, b ≠ 0",
    "3.12": "Évaluer une expression donnée en appliquant les lois des exposants",
    "3.13": "Déterminer la somme de deux puissances, ex. : 5² + 5³, et noter le processus",
    "3.14": "Déterminer la différence de deux puissances, ex. : 4³ - 4², et noter le processus",
    "3.15": "Identifier les erreurs dans une simplification d’une expression donnée comportant des puissances",
    "8.14": "Identifier dans une expression polynomiale donnée sous forme simplifiée, les variables, le degré, le nombre de termes, et les coefficients y compris le terme constant",
    "8.15": "Créer un modèle concret ou une représentation imagée pour représenter une expression polynomiale donnée",
    "8.16": "Écrire l’expression qui correspond à un modèle donné de polynôme",
    "8.4": "Apparier des expressions polynomiales équivalentes données sous forme simplifiée",
    "8.5": "Identifier des expressions polynomiales équivalentes à partir d’un ensemble donné d’expressions polynomiales, y compris les représentations imagées et symboliques",
    "8.6": "Modéliser l’addition de deux expressions polynomiales données, de façon concrète ou imagée, et noter le processus de façon symbolique",
    "8.7": "Modéliser la soustraction de deux expressions polynomiales données, de façon concrète ou imagée, et noter le processus de façon symbolique",
    "8.11": "Appliquer sa stratégie personnelle pour l’addition ou la soustraction de deux expressions polynomiales données, et noter le processus de façon symbolique",
    "8.13": "Identifier une ou plusieurs erreurs dans une expression polynomiale donnée sous forme simplifiée",
    "8.8": "Modéliser la multiplication d’une expression polynomiale donnée par un monôme donné, de façon concrète ou imagée, et noter le processus de façon symbolique",
    "8.9": "Modéliser la division d’une expression polynomiale donnée par un monôme donné, de façon concrète ou imagée, et noter le processus de façon symbolique",
    "8.12": "Appliquer ses stratégies personnelles de multiplication et de division d’une expression polynomiale donnée par des monômes donnés",
    "8.10": "Fournir des exemples d’expressions polynomiales équivalentes",
    "8.17": "Modéliser à l’aide de représentations concrètes ou imagées la solution à une équation linéaire donnée, et noter le processus",
    "8.18": "Résoudre une équation linéaire donnée de façon symbolique",
    "8.19": "Pour les problèmes qui peuvent être représentés par des équations linéaires de la forme : • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx + c) = d(ex + f) • a/x =",
    "8.20": "Vérifier, à l’aide de la substitution, si un nombre rationnel donné est une solution pour une équation linéaire donnée",
    "8.21": "Pour les problèmes qui peuvent être représentés par des équations linéaires de la forme : • ax = b • x/a = b, a ≠ 0 • ax + b = c • x/a + b = c, a ≠ 0 • ax = b + cx • a(x + b) = c • ax + b = cx + d • a(bx",
    "8.22": "Résoudre un problème donné à l’aide d’une équation linéaire, et noter le processus",
    "8.1": "Représenter un problème donné par une inéquation linéaire à une variable en utilisant les symboles ≥, >, < ou ≤",
    "8.2": "Déterminer si un nombre rationnel donné est une des solutions possibles d’une inéquation linéaire donnée",
    "8.24": "Tracer la solution d’une inéquation linéaire donnée sur une droite numérique",
    "8.25": "Énoncer et appliquer une règle générale pour l’addition ou la soustraction d’un nombre positif ou d’un nombre négatif pour déterminer la solution d’une inéquation donnée",
    "8.26": "Énoncer et appliquer une règle générale pour la multiplication et la division par un nombre positif ou un nombre négatif pour déterminer la solution d’une inéquation donnée",
    "8.27": "Résoudre une inéquation linéaire donnée algébriquement, et expliquer le processus oralement et par écrit",
    "8.28": "Comparer et expliquer le processus pour résoudre une équation linéaire donnée au processus pour résoudre une inéquation linéaire donnée",
    "8.29": "Comparer et expliquer la solution d’une équation linéaire donnée à la solution d’une inéquation linéaire donnée",
    "8.3": "Vérifier la solution d’une inéquation linéaire donnée en substituant à la variable, différents éléments de l’ensemble-solution",
    "8.30": "Résoudre un problème donné comportant une inéquation linéaire à une variable, et tracer le graphique de la solution",
    "7.1": "Écrire une expression représentant une régularité imagée, orale ou écrite donnée",
    "7.2": "Écrire une équation linéaire pour représenter un contexte donné",
    "7.4": "Décrire une équation linéaire représentant la régularité qui se dégage d’une table de valeurs donnée et vérifier cette équation en y substituant des valeurs tirées de cette table",
    "8.23": "Résoudre, en utilisant une équation linéaire, un problème donné comportant des régularités linéaires imagées, orales et écrites",
    "7.3": "Décrire un contexte pour une équation linéaire donnée",
    "7.5": "Décrire la régularité dans un graphique donné",
    "7.7": "Tracer le graphique d’une relation linéaire donnée, y compris les droites verticales et horizontales",
    "7.6": "Apparier des relations linéaires aux graphiques correspondants",
    "7.8": "Interpoler la valeur approximative d’une variable sur un graphique donné à partir d’une valeur donnée à l’autre variable",
    "7.9": "Extrapoler la valeur approximative d’une variable sur un graphique donné à partir d’une valeur donnée à l’autre variable",
    "7.10": "Résoudre un problème donné en traçant le graphique d’une relation linéaire et l’analyser",
    "10.8": "Identifier un exemple d’un diagramme à l’échelle, dans les médias sous forme électronique ou papier, telle que les journaux et Internet et interpréter le facteur d’échelle",
    "10.16": "Dessiner un diagramme à l’échelle qui représente un agrandissement ou une réduction d’une figure à deux dimensions donnée",
    "10.17": "Déterminer le facteur d’échelle pour un diagramme donné dessiné à l’échelle",
    "10.18": "Déterminer si un diagramme donné est proportionnel à la figure à deux dimensions originale donnée, et si c’est le cas, indiquer le facteur d’échelle",
    "10.7": "Déterminer si les polygones dans un ensemble donné sont semblables et expliquer le raisonnement",
    "10.14": "Dessiner un polygone semblable à un polygone donné et expliquer pourquoi ils sont semblables",
    "10.15": "Résoudre un problème donné en utilisant les propriétés de polygones semblables",
    "10.19": "Résoudre un problème donné comportant un diagramme à l’échelle en appliquant les propriétés de triangles similaires",
    "10.1": "Classifier un ensemble donné de figures à deux dimensions ou de motifs selon le nombre d’axes de symétrie",
    "10.9": "Dessiner la deuxième moitié d’une figure à deux dimensions ou d’un motif étant donné une moitié de la figure ou du motif et un axe de symétrie",
    "10.2": "Déterminer si une figure à deux dimensions, ou un motif, a une symétrie de rotation par rapport à un point au centre de la figure ou du motif, et si oui, identifier l’ordre et l’angle de rotation",
    "10.10": "Effectuer la rotation d’une figure à deux dimensions autour d’un sommet et dessiner l’image résultante",
    "10.3": "Identifier un axe de symétrie ou l’ordre et l’angle de la symétrie de rotation pour un dallage donné",
    "10.4": "Identifier et décrire les types de symétrie créés dans un objet d’art",
    "10.11": "Créer ou fournir un objet d’art qui démontre une symétrie linéaire et une symétrie de rotation, identifier l’axe (ou les axes) de symétrie, ainsi que l’ordre et l’angle de rotation",
    "10.5": "Déterminer si deux figures à deux dimensions données sur un plan cartésien sont reliées par la symétrie de rotation ou linéaire",
    "10.6": "Identifier le type de symétrie qui résulte d’une transformation donnée sur un plan cartésien",
    "10.12": "Compléter, à l’aide d’une présentation concrète ou imagée, une transformation donnée d’une figure à deux dimensions sur un plan cartésien, noter les coordonnées, et décrire le type de symétrie qui en résulte",
    "10.13": "Dessiner, sur un plan cartésien, l’image de translation d’une figure à deux dimensions en utilisant une règle de translation donnée telle que D2, H3 ou →→, ↑↑↑, identifier les sommets et les coordonnées correspondants, et expliquer la raison pour laquelle la translation ne résulte pas en une symétrie de rotation ou linéaire",
    "9.4": "Expliquer la relation entre la tangente à un cercle et au rayon au point de tangence",
    "9.6": "Expliquer la relation entre la perpendiculaire passant par le centre d’un cercle et une corde",
    "9.7": "Expliquer la relation entre la mesure de l’angle au centre et l’angle sous-tendu par le même axe",
    "9.8": "Déterminer la mesure d’un angle inscrit donné dans un demi-cercle en utilisant les propriétés de cercles",
    "9.9": "Expliquer la relation entre les angles inscrits qui interceptent le même arc",
    "9.5": "Résoudre un problème donné comportant l’application d’une ou plus d’une des propriétés du cercle",
    "12.1": "Fournir un exemple, dans divers médias imprimés et électroniques tels que les journaux et Internet, dans lequel la probabilité est utilisée",
    "12.2": "Identifier les hypothèses associées à une probabilité donnée et expliquer les limites de chaque hypothèse",
    "12.3": "Expliquer comment une même probabilité peut être utilisée pour appuyer des positions contradictoires",
    "12.4": "Expliquer, en utilisant des exemples, comment les décisions basées sur la probabilité peuvent être une combinaison de la probabilité théorique, de la probabilité expérimentale et du jugement subjectif",
    "11.1": "Faire une étude de cas d’une collecte de données fournies et identifier les problèmes potentiels liés au niveau de langue, à l’éthique, au coût, à la confidentialité ou à des différences culturelles",
    "11.2": "Fournir des exemples pour illustrer comment les enjeux liés au langage utilisé, à l’éthique, au coût, à la confidentialité ou à des différences culturelles peuvent varier selon les types d’échantillons choisis",
    "11.3": "Identifier si une situation donnée représente le choix d’un échantillon ou d’une population",
    "11.4": "Fournir un exemple de situation dans lequel la population peut être utilisée pour répondre à une question et justifier ce choix",
    "11.5": "Fournir un exemple de question dans lequel une limitation empêche le choix d’une population, et décrire la limitation, ex. : trop cher, pas assez de temps, ressources limitées",
    "11.6": "Identifier et critiquer un exemple donné dans lesquels une généralisation à partir d’un échantillon peut ou ne peut pas être valide pour cette population",
    "11.7": "Créer une grille pour évaluer un projet qui inclut l’évaluation : • d’une question d’enquête; • le choix d’une méthode de collecte de données qui inclut des considérations sociales; • la sélection d’une population ou d’un échantillon et justifier le choix de cette sélection; • la présentation des données recueillies; • les conclusions pour répondre à la question",
    "11.8": "Développer un plan de projet qui décrit : • une question d’enquête; • la méthode de collecte de données qui inclut des considérations sociales; • la méthode de sélection d’une population ou d’un échantillon; • la méthode utilisée pour la collecte de données; • les méthodes pour la présentation et l’analyse des données",
    "11.9": "Compléter le projet selon le plan, tirer des conclusions et les communiquer à un auditoire",
    "11.10": "Autoévaluer le projet complété en appliquant la grille"
  },

  /* Indicator placements verbatim from the standalone app
     (UNIT_IND at line 660): 108 placements. */
  unitInd: {
    "1": [
      "3.1",
      "3.2",
      "6.1",
      "6.2",
      "6.3",
      "6.4"
    ],
    "2": [
      "3.3",
      "6.9",
      "6.10",
      "6.11",
      "6.5",
      "6.6",
      "6.7",
      "6.8",
      "9.1",
      "9.2",
      "9.3"
    ],
    "3": [
      "3.4",
      "3.5",
      "3.6",
      "3.7",
      "3.8",
      "3.9",
      "3.10",
      "3.11",
      "3.12",
      "3.13",
      "3.14",
      "3.15"
    ],
    "4": [
      "8.14",
      "8.15",
      "8.16",
      "8.4",
      "8.5",
      "8.6",
      "8.7",
      "8.11",
      "8.13",
      "8.8",
      "8.9",
      "8.12",
      "8.10"
    ],
    "5": [
      "8.17",
      "8.18",
      "8.19",
      "8.20",
      "8.21",
      "8.22",
      "8.1",
      "8.2",
      "8.24",
      "8.25",
      "8.26",
      "8.27",
      "8.28",
      "8.29",
      "8.3",
      "8.30"
    ],
    "6": [
      "7.1",
      "7.2",
      "7.4",
      "8.23",
      "7.3",
      "7.5",
      "7.7",
      "7.6",
      "7.8",
      "7.9",
      "7.10"
    ],
    "7": [
      "10.8",
      "10.16",
      "10.17",
      "10.18",
      "10.7",
      "10.14",
      "10.15",
      "10.19",
      "10.1",
      "10.9",
      "10.2",
      "10.10",
      "10.3",
      "10.4",
      "10.11",
      "10.5",
      "10.6",
      "10.12",
      "10.13"
    ],
    "8": [
      "9.4",
      "9.6",
      "9.7",
      "9.8",
      "9.9",
      "9.5"
    ],
    "9": [
      "12.1",
      "12.2",
      "12.3",
      "12.4",
      "11.1",
      "11.2",
      "11.3",
      "11.4",
      "11.5",
      "11.6",
      "11.7",
      "11.8",
      "11.9",
      "11.10"
    ]
  },

  /* Preset labels verbatim from the standalone app's builder
     buttons; the final preset's face label is the fork's face
     scope wording for the same selection. Mixes are the junior
     family's [20, 60, 20], as the English course carries. */
  presets: {
    mid: { units: [1, 2, 3, 4], mix: [20, 60, 20], label: "Révision de mi-parcours (unités 1 à 4)" },
    final: { units: [5, 6, 7, 8, 9], mix: [20, 60, 20], label: "Révision finale (unités 5 à 9)", faceLabel: "Révision de fin de cours (unités 5 à 9)" }
  },
  hints: true,

  /* Timer note as the fork's timer strings carry it: the real
     exam allows 1 heure 30 minutes (the fork's timer bar and
     its timer checkbox wording). */
  timerNote: "1 heure 30 minutes",

  /* Sheet header work strings verbatim from the fork's sheet
     header (its renderSheet): [in the space provided, on your
     own paper]. */
  sheetWork: ["Montre tout ton travail dans l'espace fourni.", "Montre tout ton travail sur ta propre feuille."],

  /* Exam composer configuration: the junior pooled composer,
     identical to the English Math 9 course's. */
  exam: {
    "fallback": {
      "srCount": 18,
      "crMarks": 17,
      "levels": [
        7,
        21,
        7
      ],
      "crL3": [
        6,
        5,
        7
      ],
      "total": 35
    }
  },
  unitTest: {
    "total": 25,
    "sr": 11,
    "cr": 14
  },

  /* Reference panels verbatim from the standalone app
     (REF_HTML at line 7748): one per unit. */
  panels: {
    "1": "<b>Les nombres rationnels</b> peuvent s'écrire sous forme de fraction \\(\\frac{a}{b}\\) où \\(b\\ne 0\\). Les nombres entiers, les nombres décimaux finis et les nombres décimaux périodiques sont tous rationnels.<br><b>Priorité des opérations :</b> les parenthèses d'abord, puis les exposants, puis diviser et multiplier dans l'ordre de gauche à droite, puis additionner et soustraire dans l'ordre de gauche à droite.<br><b>Fractions :</b> pour additionner ou soustraire, utilise un dénominateur commun. Pour multiplier, multiplie les numérateurs et multiplie les dénominateurs. Pour diviser, multiplie par l'inverse (retourne la deuxième fraction).<br><b>Signes :</b> multiplier ou diviser deux nombres de même signe donne un résultat positif ; des signes différents donnent un résultat négatif.",
    "2": "<b>Racines carrées :</b> \\(\\sqrt{a}\\) est le nombre positif qui, multiplié par lui-même, donne \\(a\\). Carrés parfaits à connaître : 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225, 256, 289, 324, 361, 400. Une fraction est un carré parfait quand son numérateur et son dénominateur sont tous les deux des carrés parfaits.<br><b>Estimation :</b> trouve les deux carrés parfaits entre lesquels le nombre se situe, puis décide duquel il est le plus proche.<br><b>L'aire de la surface</b> est la somme des aires de toutes les faces. Prisme rectangulaire : \\(2(lw+lh+wh)\\). Cylindre : \\(2\\pi r^{2}+2\\pi r h\\). Prisme triangulaire : deux faces triangulaires plus trois faces rectangulaires.<br><b>Objets composés :</b> là où deux objets se touchent, les faces qui se touchent sont cachées sur les deux objets, donc soustrais deux fois l'aire du chevauchement.",
    "3": "<b>Puissances :</b> dans \\(a^{n}\\), \\(a\\) est la base et \\(n\\) est l'exposant ; la puissance signifie \\(a\\) multiplié par lui-même \\(n\\) fois. \\(a^{0}=1\\) pour tout \\(a\\ne 0\\).<br><b>Lois des exposants :</b> \\(a^{m}\\cdot a^{n}=a^{m+n}\\); \\(a^{m}\\div a^{n}=a^{m-n}\\); \\((a^{m})^{n}=a^{mn}\\); \\((ab)^{n}=a^{n}b^{n}\\); \\(\\left(\\frac{a}{b}\\right)^{n}=\\frac{a^{n}}{b^{n}}\\).<br><b>Les parenthèses comptent :</b> \\((-2)^{4}=16\\), mais \\(-2^{4}=-16\\).<br><b>Sommes de puissances :</b> \\(5^{2}+5^{3}\\) n'est pas une seule puissance. Calcule d'abord chaque puissance, puis additionne ou soustrais.",
    "4": "<b>Les termes</b> sont séparés par les signes + et -. Le <b>coefficient</b> est la partie numérique d'un terme ; le <b>terme constant</b> n'a pas de variable. Le <b>degré</b> d'un terme est la somme des exposants de ses variables, et le degré d'un polynôme est le degré de son terme le plus élevé.<br><b>Les termes semblables</b> ont exactement les mêmes variables avec les mêmes exposants. Seuls les termes semblables peuvent être combinés.<br><b>Addition :</b> combine les termes semblables. <b>Soustraction :</b> change chaque signe dans le polynôme soustrait, puis additionne.<br><b>Multiplication par un monôme :</b> multiplie chaque terme. <b>Division par un monôme :</b> divise chaque terme.<br>Deux expressions sont <b>équivalentes</b> quand elles se simplifient au même polynôme.",
    "5": "<b>Résoudre une équation</b> signifie isoler la variable : fais la même opération des deux côtés pour défaire ce qui a été fait à la variable, dans l'ordre inverse. Pour \\(3x+5=20\\), soustrais 5, puis divise par 3.<br><b>Vérification par substitution :</b> remets ta réponse dans l'équation de départ ; les deux côtés doivent donner la même valeur.<br><b>Les inéquations</b> ont un ensemble de solutions, représenté sur une droite numérique : un cercle ouvert signifie que l'extrémité n'est pas incluse, un cercle fermé signifie qu'elle est incluse.<br><b>Règle des signes :</b> quand tu multiplies ou divises les deux côtés d'une inéquation par un nombre négatif, inverse le signe d'inégalité : \\(-2x>6\\) devient \\(x<-3\\).",
    "6": "<b>Relations linéaires :</b> une relation linéaire a une valeur de départ et un pas constant, donc ses valeurs changent du même montant chaque fois.<br><b>À partir d'une table de valeurs :</b> le pas est le changement de \\(y\\) pour chaque augmentation de 1 de \\(x\\), et l'équation est \\(y = \\text{départ} + \\text{pas} \\times x\\).<br><b>À partir d'un graphique :</b> pour lire une valeur, va horizontalement du \\(x\\) donné jusqu'à la droite, puis descends jusqu'à la valeur de \\(y\\). Lire à l'intérieur de l'intervalle tracé, c'est l'<b>interpolation</b> ; prédire au-delà de l'intervalle tracé, en prolongeant la régularité, c'est l'<b>extrapolation</b>.<br><b>Droites particulières :</b> une droite horizontale est \\(y = \\text{constante}\\), et une droite verticale est \\(x = \\text{constante}\\).",
    "7": "<b>Le facteur d'échelle</b> est la longueur de l'image \\(\\div\\) la longueur d'origine : \\(k=\\frac{\\text{image}}{\\text{original}}\\). Au-dessus de 1, il agrandit, et au-dessous de 1, il réduit ; chaque longueur est multipliée par \\(k\\).<br><b>Les figures semblables</b> ont des angles correspondants égaux et des côtés correspondants proportionnels : chaque côté de l'image \\(\\div\\) son côté d'origine correspondant donne le même \\(k\\).<br><b>Axe de symétrie :</b> la figure se plie sur elle-même le long de l'axe. <b>Symétrie de rotation :</b> la figure coïncide avec elle-même après une rotation partielle autour de son centre : ordre = nombre de fois où la figure coïncide dans un tour complet, angle \\(=360°\\div\\) l'ordre.<br><b>Translations :</b> elles glissent chaque point de la même façon : D2, H3 signifie 2 vers la droite et 3 vers le haut, donc additionne 2 à chaque \\(x\\) et 3 à chaque \\(y\\).",
    "8": "<b>Vocabulaire :</b> un <b>rayon</b> relie le centre au cercle ; une <b>corde</b> relie deux points du cercle ; une <b>tangente</b> touche le cercle en un seul point. Un <b>angle au centre</b> a son sommet au centre ; un <b>angle inscrit</b> a son sommet sur le cercle.<br><b>Tangente :</b> le rayon jusqu'au point de tangence est perpendiculaire à la tangente, donc l'angle est \\(90^{\\circ}\\).<br><b>Cordes :</b> la perpendiculaire du centre à une corde coupe la corde en deux parties égales.<br><b>Angle au centre et angle inscrit :</b> un angle au centre est le double de l'angle inscrit sur le même arc.<br><b>Demi-cercle :</b> un angle inscrit dans un demi-cercle mesure \\(90^{\\circ}\\).<br><b>Même arc :</b> les angles inscrits sur le même arc sont égaux.",
    "9": "<b>Probabilité :</b> la probabilité théorique vient du comptage des résultats également possibles, la probabilité expérimentale vient des résultats d'essais ou de données, et le jugement subjectif est une estimation personnelle.<br><b>Échantillon et population :</b> une population est l'ensemble des personnes du groupe étudié, et un échantillon est une partie de la population ; un choix au hasard aide l'échantillon à représenter la population.<br><b>La collecte de données</b> peut être faussée par le biais, un langage suggestif, des problèmes d'éthique, le coût, le temps et le moment choisi, des préoccupations de confidentialité et un manque de sensibilité culturelle.<br><b>Affirmations :</b> une affirmation sur toute une population n'est aussi solide que la taille et la représentativité de l'échantillon qui l'appuie."
  }
  },
  "math-8-fr": {
  id: "math-8-fr",
  shortName: "Mathématiques 8",

  /* Long name and app name as the fork carries them: the fork
     heads its page and face card "Révision de mathématiques 8e
     année" (its <h1> and face heading), which is the report
     form's app name there too, so it is carried as appName; the
     subtitle names the course "Mathématiques 8e année", carried
     as longName; the picker and the export names shorten it to
     "Mathématiques 8", carried as shortName. The document title
     is the fork's own <title>: "Mathématiques 8e année : banque
     de questions d'entraînement". */
  longName: "Mathématiques 8e année",
  appName: "Révision de mathématiques 8e année",
  title: "Mathématiques 8e année : banque de questions d'entraînement",
  subject: "Mathématiques",
  grade: 8,
  listed: true,
  language: "fr",
  storagePrefix: "m8fr",
  bankFile: "math-8-fr.js",
  defaultCheckMode: "each",

  /* Unit names verbatim from the standalone app (UNITS at
     line 658). */
  units: {
    "1": "Les racines carrées et le théorème de Pythagore",
    "2": "Les nombres entiers",
    "3": "Les opérations sur les fractions",
    "4": "Les prismes et les cylindres",
    "5": "Les pourcentages, les rapports et les taux",
    "6": "Les équations linéaires et leur représentation graphique",
    "7": "L'analyse de données et la probabilité",
    "8": "La géométrie"
  },

  /* Indicator texts verbatim from the standalone app
     (INDICATORS at line 659); the code set and the per-unit
     placement are the English course's, the codes being
     language-independent. */
  indicators: {
    "3.19": "Représenter un carré parfait donné de manière illustrée à l’aide de papier quadrillé ou de blocs-formes.",
    "3.20": "Déterminer si un nombre donné est un carré parfait en utilisant du matériel et des stratégies comme les blocs-formes, le papier quadrillé ou les facteurs premiers, et en expliquant son raisonnement.",
    "5.2": "Déterminer la racine carrée d’un carré parfait et l’illustrer de manière symbolique",
    "5.1": "Déterminer les facteurs d’un carré parfait donné et expliquer pourquoi l’un des facteurs en est la racine carrée et pourquoi les autres ne le sont pas.",
    "5.3": "Déterminer le carré d’un nombre donné",
    "6.30": "Estimer la racine carrée d’un nombre donné qui n’est pas un carré parfait à l’aide des racines carrées de carrés parfaits comme points de repère.",
    "6.31": "Identifier un nombre entier dont la racine carrée se situe entre deux nombres donnés.",
    "6.32": "Estimer la racine carrée d’un nombre donné qui n’est pas un carré parfait à l’aide de la technologie, p. ex. une calculatrice ou un ordinateur",
    "6.33": "Expliquer pourquoi la racine carrée déterminée par la calculatrice pourrait être une estimation.",
    "9.1": "Représenter et expliquer le théorème de Pythagore de manière concrète, illustrée ou en utilisant la technologie.",
    "9.12": "Déterminer la mesure du troisième côté d’un triangle rectangle à l’aide des mesures des deux autres côtés pour résoudre un problème donné.",
    "9.2": "Expliquer, à l’aide d’exemples, que le théorème de Pythagore ne s’applique qu’aux triangles rectangles.",
    "9.13": "Déterminer si un triangle donné est un triangle rectangle en appliquant le théorème de Pythagore.",
    "9.14": "Résoudre un problème donné contenant des triplets pythagoréens. p. ex. 3, 4, 5 ou 5, 12, 13.",
    "6.17": "Représenter le processus de multiplication de deux entiers à l’aide de matériel de manipulation ou d’illustrations et noter le processus.",
    "6.18": "Généraliser et appliquer une règle pour déterminer le signe du produit de nombres entiers.",
    "6.19": "Fournir un contexte qui nécessite la multiplication de deux nombres entiers.",
    "6.20": "Résoudre un problème donné qui nécessite la multiplication de nombres entiers.",
    "6.21": "Représenter le processus de division d’un entier par un autre à l’aide de matériel de manipulation ou d’illustrations et noter le processus.",
    "6.22": "Généraliser et appliquer une règle pour déterminer le signe du quotient de nombres entiers.",
    "6.23": "Fournir un contexte nécessitant la division de deux nombres entiers.",
    "6.24": "Résoudre un problème donné nécessitant la division de nombres entiers (deux chiffres par un chiffre) sans utiliser la technologie.",
    "6.25": "Résoudre un problème donné nécessitant la division de nombres entiers (deux chiffres par deux chiffres) en utilisant la technologie.",
    "6.26": "Identifier l’opération requise pour résoudre un problème de nombres entiers.",
    "6.27": "Résoudre un problème de nombres entiers donné en tenant compte des priorités des opérations.",
    "6.4": "Modéliser la multiplication d’une fraction positive par un nombre entier de manière concrète ou illustrée et noter le processus.",
    "6.5": "Modéliser la multiplication d’une fraction positive par une autre fraction positive de manière concrète ou illustrée en employant un modèle de l’aire et noter le processus.",
    "6.6": "Fournir un contexte requérant la multiplication de deux fractions positives données.",
    "6.7": "Estimer le produit de deux fractions positives pour déterminer si le produit est plus près de 0, 1/2, ou 1.",
    "6.8": "Généraliser et appliquer les règles de multiplication de fractions positives, incluant les nombres fractionnaires.",
    "6.9": "Modéliser la division d’un nombre entier par une fraction propre positive de manière concrète ou illustrée et noter le processus.",
    "6.10": "Modéliser la division d’une fraction propre positive de manière illustrée et noter le processus.",
    "6.11": "Estimer le quotient de deux fractions propres positives données et comparer l’estimation aux points de repère des nombres entiers.",
    "6.12": "Généraliser et appliquer les règles de division des fractions propres positives.",
    "6.13": "Modéliser, généraliser et appliquer des règles relatives à la division des fractions avec des nombres fractionnaires.",
    "6.14": "Fournir un contexte nécessitant la division de deux fractions positives données.",
    "6.15": "Identifier l’opération requise pour résoudre un problème de fractions positives.",
    "6.16": "Résoudre un problème donné comprenant des fractions positives en tenant compte de la priorité des opérations (en se limitant aux solutions positives).",
    "10.1": "Associer un développement donné à l’objet à trois dimensions le représentant.",
    "10.11": "Dessiner des développements pour un cylindre ou un prisme rectangulaire donné et vérifier en construisant les patrons pour ces objets à trois dimensions donnés.",
    "10.2": "Prédire les objets pouvant être formés à l’aide d’un développement donné et vérifier ses prédictions.",
    "10.12": "Construire un objet à trois dimensions à partir d’un développement donné.",
    "10.3": "Identifier toutes les faces d’un prisme donné, incluant les prismes droits rectangulaires et triangulaires.",
    "9.3": "Expliquer, à l’aide d’exemples, le lien entre l’aire d’une figure à deux dimensions et l’aire de la surface d’un objet à trois dimensions donné.",
    "9.4": "Décrire et appliquer les stratégies servant à déterminer l’aire totale d’un prisme droit rectangulaire ou triangulaire donné.",
    "9.5": "Résoudre un problème donné concernant l’aire totale d’un objet.",
    "9.6": "Décrire et appliquer des stratégies servant à déterminer l’aire totale d’un cylindre droit donné.",
    "9.7": "Déterminer le volume d’un prisme droit donné à l’aide de l’aire de sa base.",
    "9.8": "Expliquer le lien entre l’aire de la base et le volume d’objets à trois dimensions donné et la formule de son volume.",
    "9.9": "Généraliser et appliquer une règle servant à déterminer le volume de cylindres droits.",
    "9.10": "Démontrer que l’orientation d’un objet à trois dimensions donné n’affecte pas son volume.",
    "9.11": "Appliquer une formule pour résoudre un problème concernant le volume d’un cylindre ou d’un prisme droit.",
    "3.1": "Fournir un contexte dans lequel un pourcentage pourrait être de plus de 100 % ou entre 0 % et 1 %.",
    "3.2": "Représenter un pourcentage fractionnaire donné à l’aide de papier quadrillé.",
    "3.3": "Représenter un pourcentage donné supérieur à 100 à l’aide de papier quadrillé.",
    "3.4": "Déterminer le pourcentage représenté par la zone ombrée d’une grille et le noter sous forme de décimale, de fraction et de pourcentage.",
    "3.5": "Exprimer un pourcentage donné sous forme de décimale ou de fraction.",
    "3.6": "Exprimer une décimale donnée sous forme de pourcentage ou de fraction.",
    "3.7": "Exprimer une fraction donnée sous forme de décimale ou de pourcentage.",
    "6.1": "Résoudre un problème donné comportant des pourcentages.",
    "6.2": "Résoudre un problème donné comportant des combinaisons de pourcentages.",
    "6.3": "Résoudre un problème donné dans lequel il doit calculer le pourcentage d’un pourcentage.",
    "3.8": "Exprimer un rapport à deux valeurs dans un contexte donné sous les formes 3:5 ou 3 sur 5.",
    "3.9": "Exprimer un rapport à trois valeurs dans un contexte donné sous les formes 4:7:3 ou 4 sur 7 sur 3.",
    "3.10": "Exprimer un rapport partie à partie sous forme de fraction partie à tout.",
    "3.11": "Exprimer un rapport donné sous forme de pourcentage.",
    "3.13": "Expliquer la signification de a/b selon un contexte donné.",
    "3.15": "Fournir un contexte selon lequel a/b représente : • une fraction; • un taux; • un rapport; • un quotient; • une probabilité.",
    "3.12": "Identifier et décrire des rapports dans la vie quotidienne et les noter de manière symbolique.",
    "6.28": "Résoudre un problème donné faisant intervenir des rapports.",
    "3.16": "Exprimer un taux donné à l’aide de mots ou de symboles.",
    "3.17": "Identifier et décrire des taux dans la vie quotidienne et les noter de manière symbolique.",
    "3.14": "Fournir un contexte selon lequel a/b représente : • une fraction; • un taux; • un rapport; • un quotient; • une probabilité.",
    "3.18": "Expliquer pourquoi un taux ne peut pas être représenté sous forme de pourcentage.",
    "6.29": "Résoudre un problème donné comportant des taux.",
    "8.1": "Modéliser un problème donné à l’aide d’une équation linéaire et résoudre cette dernière à l’aide de modèles concrets.",
    "8.2": "Dessiner une représentation visuelle des étapes entreprises pour résoudre une équation linéaire donnée et noter chaque étape de manière symbolique.",
    "8.3": "Vérifier la solution d’une équation linéaire donnée à l’aide de diverses méthodes en utilisant du matériel concret, des diagrammes et des substitutions.",
    "8.4": "Résoudre une équation linéaire donnée de manière symbolique.",
    "8.5": "Appliquer la propriété de distributivité pour résoudre une équation linéaire donnée de la forme a(x + b) = c.",
    "8.6": "Repérer et corriger une erreur dans la solution erronée d’une équation linéaire donnée.",
    "8.7": "Résoudre un problème donné au moyen d’une équation linéaire et noter le processus.",
    "7.2": "Créer une table des valeurs en remplaçant les valeurs d’une variable dans l’équation d’une relation linéaire donnée.",
    "7.3": "Déterminer la valeur manquante dans une paire ordonnée au sein d’une équation donnée.",
    "7.4": "Tracer un graphique à partir de l’équation d’une relation linéaire donnée (en se limitant aux données discrètes).",
    "7.1": "Décrire le lien entre les variables d’un graphique donné.",
    "11.1": "Comparer des renseignements fournis pour un ensemble de données à l’aide d’un ensemble de graphiques, incluant des graphiques circulaires, linéaires, à barres et à doubles barres, ainsi que des pictogrammes, pour déterminer les forces et les faiblesses de chacun des graphiques.",
    "11.2": "Déterminer les avantages et les désavantages de divers graphiques, incluant les graphiques circulaires, linéaires, à barres et à doubles barres, ainsi que les pictogrammes pour représenter un ensemble de données en particulier.",
    "11.3": "Justifier le choix d’une représentation graphique pour une situation donnée et son ensemble de données correspondant.",
    "11.4": "Expliquer comment le format de divers graphiques – grandeur des intervalles, largeur des barres et présentation visuelle – pourrait mener à une mauvaise interprétation des données.",
    "11.5": "Expliquer comment le choix du format peut mal représenter les données.",
    "11.6": "Identifier des conclusions qui ne sont pas cohérentes avec un ensemble de données ou un graphique, et expliquer en quoi les données ont été mal interprétées.",
    "12.1": "Déterminer la probabilité de deux événements indépendants et la vérifier à l’aide d’une stratégie différente.",
    "12.2": "Fournir un contexte selon lequel a/b représente : • une fraction; • un taux; • un rapport; • un quotient; • une probabilité.",
    "12.3": "Généraliser et appliquer une règle pour déterminer la probabilité que des événements indépendants se produisent.",
    "12.4": "Résoudre un problème donné requérant de déterminer des probabilités d’événements indépendants.",
    "10.15": "Dessiner et identifier le dessus, le devant et le côté d’un objet tridimensionnel donné sur du papier à points isométrique.",
    "10.9": "Comparer divers points de vue d’un objet tridimensionnel avec l’objet en question.",
    "10.10": "Prédire de quoi auront l’air les vues du dessus, du devant et de côté à la suite d’une rotation donnée (se limitant à des multiples de 90 degrés) et vérifier ces prédictions.",
    "10.16": "Dessiner et identifier les vues du dessus, du devant et de côté à la suite d’une rotation donnée (en se limitant à des multiples de 90 degrés).",
    "10.17": "Construire un objet tridimensionnel à l’aide des vues du dessus, du devant et de côté avec ou sans l’utilisation de la technologie.",
    "10.18": "Dessiner et identifier le dessus, le devant et le côté d’un objet tridimensionnel dans son environnement avec ou sans l’aide de la technologie.",
    "10.4": "Identifier, dans un ensemble de polygones réguliers, les formes et les combinaisons de formes avec lesquelles on peut créer des dallages et utiliser les mesures d’angles pour justifier ces choix.",
    "10.5": "Identifier, dans un ensemble de polygones irréguliers, les formes et les combinaisons de formes avec lesquelles on peut créer des dallages et utiliser les mesures d’angles pour justifier ces choix.",
    "10.6": "Identifier et décrire des dallages dans son environnement.",
    "10.7": "Identifier une translation, une réflexion ou une rotation dans un dallage donné.",
    "10.8": "Identifier une combinaison de transformations dans un dallage donné.",
    "10.13": "Créer un dallage à l’aide d’une forme bidimensionnelle ou plus et le décrire en mentionnant les transformations et la conservation de l’aire.",
    "10.14": "Créer une nouvelle forme de dallage (polygonale ou non) en transformant une partie d’un polygone d’un dallage donné et décrire le dallage résultant en mentionnant les transformations et la conservation de l’aire."
  },
  unitInd: {
    "1": [
      "3.19",
      "3.20",
      "5.2",
      "5.1",
      "5.3",
      "6.30",
      "6.31",
      "6.32",
      "6.33",
      "9.1",
      "9.12",
      "9.2",
      "9.13",
      "9.14"
    ],
    "2": [
      "6.17",
      "6.18",
      "6.19",
      "6.20",
      "6.21",
      "6.22",
      "6.23",
      "6.24",
      "6.25",
      "6.26",
      "6.27"
    ],
    "3": [
      "6.4",
      "6.5",
      "6.6",
      "6.7",
      "6.8",
      "6.9",
      "6.10",
      "6.11",
      "6.12",
      "6.13",
      "6.14",
      "6.15",
      "6.16"
    ],
    "4": [
      "10.1",
      "10.11",
      "10.2",
      "10.12",
      "10.3",
      "9.3",
      "9.4",
      "9.5",
      "9.6",
      "9.7",
      "9.8",
      "9.9",
      "9.10",
      "9.11"
    ],
    "5": [
      "3.1",
      "3.2",
      "3.3",
      "3.4",
      "3.5",
      "3.6",
      "3.7",
      "6.1",
      "6.2",
      "6.3",
      "3.8",
      "3.9",
      "3.10",
      "3.11",
      "3.13",
      "3.15",
      "3.12",
      "6.28",
      "3.16",
      "3.17",
      "3.14",
      "3.18",
      "6.29"
    ],
    "6": [
      "8.1",
      "8.2",
      "8.3",
      "8.4",
      "8.5",
      "8.6",
      "8.7",
      "7.2",
      "7.3",
      "7.4",
      "7.1"
    ],
    "7": [
      "11.1",
      "11.2",
      "11.3",
      "11.4",
      "11.5",
      "11.6",
      "12.1",
      "12.2",
      "12.3",
      "12.4"
    ],
    "8": [
      "10.15",
      "10.9",
      "10.10",
      "10.16",
      "10.17",
      "10.18",
      "10.4",
      "10.5",
      "10.6",
      "10.7",
      "10.8",
      "10.13",
      "10.14"
    ]
  },

  /* Preset labels in the French junior pattern the Math 9 FR
     course carries; the final preset's face label is the face
     scope wording for the same selection. Mixes are the junior
     family's [20, 60, 20], as the English course carries. */
  presets: {
    mid: { units: [1, 2, 3, 4], mix: [20, 60, 20], label: "Révision de mi-parcours (unités 1 à 4)" },
    final: { units: [5, 6, 7, 8], mix: [20, 60, 20], label: "Révision finale (unités 5 à 8)", faceLabel: "Révision de fin de cours (unités 5 à 8)" }
  },
  hints: true,

  /* Timer note as the fork's timer strings carry it: the real
     exam allows 1 heure 30 minutes. */
  timerNote: "1 heure 30 minutes",

  /* Sheet header work strings verbatim from the fork's sheet
     header: [in the space provided, on your own paper]. */
  sheetWork: ["Montre tout ton travail dans l'espace fourni.", "Montre tout ton travail sur ta propre feuille."],

  /* Exam composer configuration: the junior pooled composer,
     identical to the English Math 8 course's. */
  exam: {
    "fallback": {
      "srCount": 18,
      "crMarks": 17,
      "levels": [
        7,
        21,
        7
      ],
      "crL3": [
        6,
        5,
        7
      ],
      "total": 35
    }
  },
  unitTest: {
    "total": 25,
    "sr": 11,
    "cr": 14
  },

  /* Reference panels verbatim from the standalone app
     (REF_HTML at line 6042): one per unit. */
  panels: {
    "1": "<b>Carrés parfaits :</b> un carré parfait est un nombre entier multiplié par lui-même, comme \\(6^{2} = 36\\) ; sur du papier quadrillé, il remplit une région carrée avec des rangées et des colonnes égales.<br><b>Racines carrées :</b> \\(\\sqrt{n}\\) est la valeur qui, multipliée par elle-même, donne \\(n\\), donc \\(\\sqrt{36} = 6\\) parce que \\(6 \\times 6 = 36\\) ; seul le facteur qui se répète avec lui-même est la racine carrée.<br><b>Estimation des racines :</b> encadre le nombre entre deux carrés parfaits voisins : si \\(49 < 60 < 64\\), alors \\(7 < \\sqrt{60} < 8\\), et le carré le plus proche donne la meilleure estimation.<br><b>Valeurs à la calculatrice :</b> une racine affichée à l'écran est arrondie, car ses chiffres décimaux continuent au-delà de l'affichage, donc son carré est proche du nombre de départ plutôt qu'exactement égal.<br><b>Théorème de Pythagore :</b> dans un triangle rectangle, \\(a^{2} + b^{2} = c^{2}\\), où \\(a\\) et \\(b\\) sont les cathètes et \\(c\\) est l'hypoténuse ; il s'applique seulement aux triangles rectangles.<br><b>Trouver un côté :</b> pour l'hypoténuse, additionne les carrés des cathètes et prends la racine carrée ; pour une cathète, soustrais les carrés connus et prends la racine carrée.<br><b>Vérification et triplets :</b> un triangle est rectangle exactement quand la somme des carrés des deux côtés les plus courts égale le carré du côté le plus long ; des triplets comme 3, 4, 5 et 5, 12, 13, et leurs copies à l'échelle, réussissent ce test.",
    "2": "<b>Règles des signes pour la multiplication :</b> des signes identiques donnent un produit positif, des signes différents donnent un produit négatif : \\( (+)\\times(+)=+ \\), \\( (-)\\times(-)=+ \\), \\( (+)\\times(-)=- \\)<br>\n<b>Règles des signes pour la division :</b> les mêmes règles des signes valent pour les quotients : \\( (-)\\div(-)=+ \\) et \\( (+)\\div(-)=- \\)<br>\n<b>Modèles :</b> les jetons rouges représentent les nombres négatifs ; enlever des groupes est une action négative, donc enlever des groupes de jetons rouges montre un nombre négatif fois un nombre négatif<br>\n<b>Changement répété :</b> un changement qui se répète le même nombre de fois est un produit, comme une chute de \\(3\\) degrés chaque heure pendant \\(5\\) heures, \\((-3)\\times 5\\)<br>\n<b>Partage égal :</b> un total partagé en parties égales est un quotient, comme \\((-36)\\div 6\\) pour un total partagé en \\(6\\) parts<br>\n<b>Priorité des opérations :</b> les parenthèses d'abord, puis la multiplication et la division de gauche à droite, puis l'addition et la soustraction de gauche à droite<br>",
    "3": "<b>Multiplier des fractions :</b> multiplie les numérateurs et multiplie les dénominateurs, puis réduis ; simplifie d'abord un numérateur avec un dénominateur pour garder de petits nombres.<br><b>Nombres fractionnaires :</b> change en fraction impropre avant de multiplier ou de diviser, p. ex. \\(2\\frac{1}{3} = \\frac{7}{3}\\).<br><b>Fraction d'une fraction :</b> « de » signifie multiplier, et un modèle d'aire montre le chevauchement des deux parties ombrées.<br><b>Diviser des fractions :</b> multiplie par l'inverse du diviseur (retourne seulement la deuxième fraction) : \\(\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}\\).<br><b>Estimation :</b> compare chaque fraction à 0, \\(\\frac{1}{2}\\) et 1 ; un produit de deux fractions propres est plus petit que les deux fractions, et diviser par une fraction propre donne un quotient plus grand que le dividende.<br><b>Priorité des opérations :</b> les parenthèses d'abord, puis la multiplication et la division, puis l'addition et la soustraction.<br>",
    "4": "<b>Développements :</b> un développement est un modèle plat de faces qui se plie pour former un objet à trois dimensions ; le développement d'un prisme triangulaire a 2 triangles et 3 rectangles, celui d'un cylindre a 2 cercles et 1 rectangle, et celui d'un prisme rectangulaire a 6 rectangles en 3 paires assorties.<br><b>Faces :</b> un prisme rectangulaire droit a 6 faces, un prisme triangulaire droit a 5 faces, et un cylindre droit a 2 faces circulaires planes et 1 surface courbe.<br><b>Aire totale :</b> l'aire totale de toutes les faces, trouvée en additionnant les aires des faces dans le développement ; pour un prisme rectangulaire, \\(AT = 2(lw + lh + wh)\\).<br><b>Prismes :</b> pour un prisme triangulaire, additionne 2 extrémités triangulaires aux rectangles latéraux : \\(AT = 2B + Ph\\), où \\(P\\) est le périmètre d'une extrémité.<br><b>Cylindres :</b> \\(AT = 2\\pi r^{2} + 2\\pi r h\\), où le côté courbe se déroule pour former un rectangle ; utilise \\(\\pi = 3,14\\) pour une réponse décimale.<br><b>Volume :</b> pour tout prisme droit ou cylindre, \\(V = \\text{aire de la base} \\times \\text{hauteur}\\) ; pour un cylindre, \\(V = \\pi r^{2} h\\). Tourner un objet dans une nouvelle position ne change pas son volume.<br>",
    "5": "<b>Pourcentage :</b> une comparaison sur 100 ; les pourcentages peuvent être inférieurs à 1 % ou supérieurs à 100 % quand un nouveau montant est comparé à un tout antérieur.<br><b>Conversions :</b> d'un pourcentage à un nombre décimal, divise par 100 ; d'un nombre décimal à un pourcentage, multiplie par 100 ; une fraction se convertit en divisant le numérateur par le dénominateur, par exemple \\( \\frac{3}{4}=0,75=75 \\% \\).<br><b>Problèmes de pourcentage :</b> partie \\(=\\text{pourcentage}\\times\\text{tout}\\) ; des pourcentages combinés agissent par étapes sur le montant restant, et un pourcentage d'un pourcentage multiplie les deux nombres décimaux.<br><b>Rapport :</b> une comparaison de deux quantités de même type, écrite \\(a:b\\) ; pour le premier terme, le rapport de la partie au tout est \\( \\frac{a}{a+b} \\).<br><b>Taux :</b> une comparaison de deux unités différentes, comme km/h ; un taux unitaire a 1 comme deuxième quantité, et on compare les taux par leurs taux unitaires.<br>",
    "6": "<b>Résoudre des équations :</b> utilise les opérations inverses des deux côtés pour isoler la variable : défais les additions en soustrayant, et défais les multiplications en divisant.<br><b>Formes :</b> \\(ax = b\\), \\(\\frac{x}{a} = b\\), \\(ax + b = c\\), \\(\\frac{x}{a} + b = c\\) et \\(a(x + b) = c\\), résolues en défaisant les étapes dans l'ordre inverse.<br><b>Distributivité :</b> \\(a(x + b) = ax + ab\\) ; le nombre à l'extérieur des parenthèses multiplie chaque terme à l'intérieur.<br><b>Vérification d'une solution :</b> substitue la valeur dans l'équation de départ ; c'est une solution seulement si le côté gauche égale le côté droit.<br><b>Tables de valeurs et graphiques :</b> substitue des valeurs de \\(x\\) dans l'équation pour obtenir des valeurs de \\(y\\), puis place les couples ordonnés \\((x, y)\\) comme points distincts pour des données discrètes.<br><b>Valeurs manquantes :</b> un couple ordonné d'une relation satisfait son équation, donc substitue la coordonnée connue et résous pour trouver l'autre.",
    "7": "<b>Choix du graphique :</b> un diagramme à ligne brisée montre un changement dans le temps, un diagramme circulaire montre les parts d'un seul tout, un diagramme à bandes compare des catégories, un diagramme à bandes doubles compare deux groupes dans chaque catégorie, et un pictogramme compare des quantités avec des symboles.<br><b>Formats trompeurs :</b> un axe qui ne commence pas à zéro, des intervalles inégaux sur un axe, des effets en trois dimensions, des symboles de tailles différentes et le fait de montrer seulement une partie choisie des données peuvent tous mal représenter les valeurs.<br><b>Juger un graphique :</b> compare les hauteurs des bandes, les tailles des parts et les affirmations aux nombres réels ; une majorité signifie plus de la moitié.<br><b>Événements indépendants :</b> des événements qui ne s'influencent pas l'un l'autre ; la probabilité que les deux se produisent est le produit de leurs probabilités séparées, \\(P(A \\text{ et } B) = P(A) \\times P(B)\\).<br><b>Tirage avec remise :</b> l'objet est remis en place, donc les probabilités restent les mêmes au deuxième tirage.",
    "8": "<b>Vues :</b> la vue de dessus montre quelles cases contiennent des cubes ; dans la vue de face, les hauteurs des colonnes sont la pile la plus haute de chaque colonne ; les colonnes de la vue de côté vont de l'avant vers l'arrière<br><b>Cartes de hauteurs :</b> chaque nombre est la hauteur de la pile sur cette case ; le nombre total de cubes est la somme de tous les nombres ; pour un objet tourné, tourne d'abord la carte, puis lis les vues<br><b>Dallages :</b> les formes couvrent sans espaces vides et sans chevauchements ; les angles à chaque point totalisent exactement \\( 360° \\)<br><b>Angle intérieur</b> d'un polygone régulier à \\( n \\) côtés : \\( \\dfrac{(n-2) \\times 180°}{n} \\) : triangle \\( 60° \\), carré \\( 90° \\), pentagone \\( 108° \\), hexagone \\( 120° \\), octagone \\( 135° \\)<br><b>Polygones réguliers qui dallent seuls :</b> seulement les formes dont l'angle intérieur divise \\( 360° \\) : les triangles, les carrés et les hexagones<br><b>Transformations :</b> une translation est un glissement, une réflexion est un retournement, une rotation est un tour ; une réflexion glissée est un retournement combiné à un glissement ; déplacer une pièce entre des côtés appariés garde l'ajustement et garde la même aire"
  }
  },

  "math-7-fr": {
  id: "math-7-fr",
  shortName: "Mathématiques 7",

  /* Long name and app name as the fork carries them: the fork
     heads its page and face card "Révision de mathématiques 7e
     année" (its <h1> and face heading), which is the report
     form's app name there too, so it is carried as appName; the
     subtitle names the course "Mathématiques 7e année", carried
     as longName; the picker and the export names shorten it to
     "Mathématiques 7", carried as shortName. The document title
     is the fork's own <title>: "Mathématiques 7e année : banque
     de questions d'entraînement". */
  longName: "Mathématiques 7e année",
  appName: "Révision de mathématiques 7e année",
  title: "Mathématiques 7e année : banque de questions d'entraînement",
  subject: "Mathématiques",
  grade: 7,
  listed: true,
  language: "fr",
  storagePrefix: "m7fr",
  bankFile: "math-7-fr.js",
  defaultCheckMode: "each",

  /* Unit names verbatim from the standalone app (UNITS at
     line 668). */
  units: {
    "1": "Les régularités et les relations",
    "2": "Les nombres entiers",
    "3": "Les fractions, les nombres décimaux et les pourcentages",
    "4": "Le cercle et l’aire",
    "5": "Les opérations sur les fractions",
    "6": "Les équations",
    "7": "L’analyse des données",
    "8": "La géométrie"
  },

  /* Indicator texts verbatim from the standalone app
     (INDICATORS at line 669); the code set and the per-unit
     placement are the English course's, the codes being
     language-independent. */
  indicators: {
    "5.1": "Déterminer si un nombre donné est divisible par 2, 3, 4, 5, 6, 8, 9 ou 10 et expliquer pourquoi.",
    "5.2": "Trier un ensemble de nombres donné selon leur divisibilité en utilisant des organisateurs graphiques comme des diagrammes de Venn ou des diagrammes de Carroll.",
    "5.3": "Expliquer, à l’aide d’un exemple, pourquoi les nombres ne peuvent pas être divisés par zéro.",
    "5.4": "Déterminer les facteurs d’un nombre donné en se basant sur les règles de divisibilité.",
    "8.4": "Expliquer ce qu’est une variable et l’usage dont on en fait dans une expression donnée.",
    "8.5": "Identifier et fournir un exemple d’un terme constant, d’un coefficient numérique et d’une variable dans une expression et dans une équation.",
    "8.6": "Fournir un exemple d’une expression et d’une équation, et expliquer en quoi elles se ressemblent et en quoi elles diffèrent.",
    "7.1": "Représenter une régularité donnée oralement ou par écrit, sous forme d’expression algébrique.",
    "7.8": "Substituer une valeur à l’inconnue dans une expression donnée, et évaluer cette expression.",
    "7.7": "Formuler une relation linéaire pour représenter la relation qui se dégage d’une régularité décrite oralement ou par écrit.",
    "7.9": "Créer une table de valeurs à partir d’une relation linéaire donnée en substituant des valeurs à la variable.",
    "7.10": "Créer une table de valeurs en utilisant une relation linéaire et l’utiliser pour en tracer le graphique (se limitant à des éléments discrets).",
    "7.11": "Tracer un graphique à partir d’une table de valeurs générée à partir d’une relation linéaire donnée et décrire les régularités découvertes en analysant ce graphique pour en tirer des conclusions (p. ex. : tracer le graphique de la relation entre n et 2n + 3).",
    "7.12": "Décrire, dans son propre langage, oralement ou par écrit, la relation représentée par un diagramme pour résoudre des problèmes.",
    "7.3": "Fournir un contexte dans lequel une relation linéaire donnée est la représentation d’une régularité.",
    "7.4": "Représenter une régularité observée dans l’environnement en utilisant une relation linéaire.",
    "7.5": "Apparier un ensemble de relations linéaires donné à un ensemble de graphiques donné.",
    "7.6": "Apparier un ensemble de graphiques donné à un ensemble de relations linéaires donné.",
    "7.2": "Représenter une régularité donnée oralement ou par écrit, sous forme d’équation.",
    "8.12": "Pour des problèmes qui peuvent être représentés par des équations linéaires des formes suivantes : ax + b = c; ax - b = c; ax = b; x/a = b, a ≠ 0 (où a, b et c sont des nombres entiers positifs). Modéliser un problème donné à l’aide d’une équation linéaire et le résoudre à l’aide de matériel concret, p. ex. : des jetons, des carreaux algébriques.",
    "6.24": "Expliquer à l’aide de matériel concret, tel que des carreaux algébriques et des diagrammes, que la somme de nombres entiers opposés est égale à zéro.",
    "6.29": "Résoudre un problème donné comportant l’addition et la soustraction de nombres entiers.",
    "6.25": "Additionner deux nombres entiers donnés à l’aide de matériel concret ou de représentations imagées, et noter le processus de façon symbolique.",
    "6.26": "Illustrer les résultats d’additions de nombres entiers négatifs et de nombres entiers positifs en utilisant une droite numérique.",
    "6.27": "Soustraire deux nombres entiers donnés à l’aide de matériel concret ou de représentations imagées, et noter le processus de façon symbolique.",
    "6.28": "Illustrer les résultats de soustractions de nombres entiers négatifs et de nombres entiers positifs en utilisant une droite numérique.",
    "3.8": "Prédire le nombre décimal équivalent à une fraction donnée en ayant recours aux régularités, p. ex. : 1/11 = 0,0909..., 2/11 = 0,1818..., 3/11 = ? (On s’attend à ce que les nombres décimaux périodiques soient limités à un ou deux chiffres périodiques.)",
    "3.9": "Apparier les fractions d’un ensemble à leur représentation décimale.",
    "3.10": "Trier un ensemble de fractions donné en nombres décimaux périodiques et nombres décimaux finis.",
    "3.11": "Exprimer une fraction donnée sous la forme d’un nombre décimal fini ou périodique.",
    "3.12": "Exprimer un nombre décimal fini donné sous la forme d’une fraction.",
    "3.13": "Exprimer un nombre décimal périodique donné sous la forme d’une fraction.",
    "3.14": "Fournir un exemple d’un nombre décimal qui est une représentation approximative de la valeur exacte d’une fraction donnée.",
    "3.3": "Ordonner en ordre croissant ou décroissant les nombres d’un ensemble donné comprenant des fractions positives, des nombres décimaux positifs et des nombres entiers, et vérifier le résultat en utilisant une variété de stratégies.",
    "3.1": "Placer les fractions ayant des dénominateurs communs ou non d’un ensemble donné sur une droite numérique et expliquer la stratégie utilisée pour les ordonner.",
    "3.4": "Ordonner les nombres d’un ensemble donné en les plaçant sur une droite numérique comprenant des points de repère tels que 0 et 1, ou 0 et 5.",
    "3.2": "Placer les fractions positives d’un ensemble donné comprenant des nombres composés et des fractions impropres sur une droite numérique et expliquer la stratégie utilisée pour les ordonner.",
    "3.5": "Identifier le nombre situé entre deux nombres donnés dans une suite ordonnée ou sur une droite numérique.",
    "3.6": "Identifier les nombres qui ne sont pas bien placés dans une suite ordonnée ou sur une droite numérique.",
    "6.5": "Résoudre un problème donné qui comprend l’addition d’au moins deux nombres décimaux.",
    "6.6": "Résoudre un problème donné qui comprend la soustraction de nombres décimaux.",
    "6.1": "Placer la virgule décimale dans une somme ou une différence en appliquant la stratégie des premiers chiffres, p. ex. : pour 4,5 + 0,73 + 256,458; penser à 4 + 256, et conclure que la somme est supérieure à 260.",
    "6.7": "Résoudre un problème donné qui comprend la multiplication par des multiplicateurs de deux chiffres (nombres entiers ou décimaux) sans l’aide de la technologie.",
    "6.2": "Placer la virgule décimale dans un produit en appliquant la stratégie des premiers chiffres, p. ex. : pour 12,33 $ × 2,4; penser à 12 $ × 2, et en conclure que le produit est supérieur à 24 $.",
    "6.9": "Résoudre un problème donné qui comprend la multiplication par des multiplicateurs de plus de deux chiffres ou la division de nombres décimaux où les diviseurs ont plus qu’un chiffre (nombres entiers ou décimaux) à l’aide de la technologie.",
    "6.8": "Résoudre un problème donné qui comprend la division de nombres décimaux où les diviseurs n’ont qu’un chiffre (nombres entiers ou décimaux) sans l’aide de la technologie.",
    "6.4": "Vérifier la vraisemblance de solutions à l’aide de l’estimation.",
    "6.3": "Placer la virgule décimale dans un quotient en appliquant la stratégie des premiers chiffres, p. ex. : pour 51,50 ÷ 2,1; penser à 50 ÷ 2, et en conclure que le quotient est approximativement 25.",
    "6.10": "Résoudre un problème donné comportant des opérations sur des nombres décimaux, limités aux millièmes, en tenant compte de la priorité des opérations.",
    "3.7": "Exprimer un pourcentage donné sous forme décimale ou fractionnaire.",
    "6.11": "Résoudre un problème donné où un pourcentage doit être déterminé.",
    "6.12": "Déterminer la solution à un problème donné comportant des pourcentages, dont la solution exige l’arrondissement, et expliquer pourquoi une réponse approximative est nécessaire, p. ex. : le coût total d’un objet, y compris les taxes.",
    "9.11": "Illustrer et expliquer que le diamètre d’un cercle donné est égal au double de son rayon.",
    "9.12": "Tracer un cercle dont le rayon ou le diamètre est donné, avec ou sans l’aide d’un compas.",
    "9.7": "Illustrer et expliquer que la circonférence d’un cercle donné est approximativement le triple de son diamètre.",
    "9.8": "Expliquer que pour tout cercle, pi est le rapport de la circonférence au diamètre (C/d) dont la valeur est approximativement égale à 3,14.",
    "9.10": "Résoudre un problème contextualisé donné comportant des cercles.",
    "9.1": "Illustrer et expliquer comment on peut déterminer l’aire d’un parallélogramme à partir de l’aire d’un rectangle.",
    "9.2": "Généraliser une règle pour créer une formule permettant de déterminer l’aire de parallélogrammes.",
    "9.3": "Résoudre un problème donné comportant l’aire de triangles, de parallélogrammes et/ou de cercles.",
    "9.4": "Illustrer et expliquer comment on peut déterminer l’aire d’un triangle à partir de l’aire d’un rectangle ou d’un parallélogramme.",
    "9.5": "Généraliser une règle pour créer une formule permettant de déterminer l’aire de triangles.",
    "9.6": "Illustrer et expliquer comment on peut estimer l’aire d’un cercle sans avoir recours à une formule.",
    "9.9": "Appliquer une formule pour déterminer l’aire d’un cercle donné.",
    "11.1": "Trouver et comparer des diagrammes circulaires dans divers médias imprimés et électroniques, tels que les quotidiens, les magazines et Internet.",
    "11.2": "Identifier les caractéristiques communes de diagrammes circulaires, telles que : les titres, les étiquettes ou les légendes; la somme des angles au centre d’un cercle est égale à 360°; les données sont présentées sous la forme de pourcentages d’un tout, et la somme de ces pourcentages est égale à 100 %.",
    "9.13": "Expliquer, à l’aide d’une illustration, que la somme des angles au centre de tout cercle est égale à 360°.",
    "11.5": "Exprimer les pourcentages présentés dans un diagramme circulaire sous forme de quantités afin de résoudre un problème donné.",
    "11.4": "Interpréter un diagramme circulaire donné afin de répondre à des questions.",
    "11.3": "Créer et étiqueter un diagramme circulaire pour présenter un ensemble de données avec ou sans l’aide de la technologie.",
    "6.13": "Modéliser l’addition de fractions positives, de façon concrète, et les noter de façon symbolique.",
    "6.14": "Déterminer la somme de deux fractions positives ayant des dénominateurs communs.",
    "6.15": "Simplifier une fraction positive donnée en déterminant le facteur commun au numérateur et au dénominateur.",
    "6.16": "Déterminer un dénominateur commun pour les fractions positives d’un ensemble donné.",
    "6.17": "Déterminer la somme de deux fractions positives ayant des dénominateurs différents.",
    "6.18": "Modéliser la soustraction de fractions positives, de façon concrète, et les noter de façon symbolique.",
    "6.19": "Déterminer la différence de deux fractions positives données.",
    "6.20": "Modéliser l’addition et la soustraction de nombres fractionnaires, de façon concrète, et les noter de façon symbolique.",
    "6.21": "Déterminer la somme ou la différence de deux nombres fractionnaires.",
    "6.22": "Simplifier la solution d’un problème donné qui comprend la somme ou la différence de deux fractions positives ou de nombres fractionnaires.",
    "6.23": "Résoudre un problème donné comportant l’addition ou la soustraction de fractions positives ou de nombres fractionnaires, et vérifier la vraisemblance de la solution.",
    "8.14": "Pour des problèmes qui peuvent être représentés par des équations linéaires des formes suivantes : ax + b = c; ax - b = c; ax = b; x/a = b, a ≠ 0 (où a, b et c sont des nombres entiers positifs). Résoudre une équation linéaire par inspection et par essai systématique.",
    "8.1": "Modéliser la préservation de l’égalité pour chacune des quatre opérations mathématiques à l’aide de matériel concret ou d’une représentation imagée, et expliquer le processus oralement, et puis le noter de façon symbolique.",
    "8.3": "Écrire la forme équivalente d’une équation donnée en appliquant la préservation de l’égalité et la vérifier à l’aide de matériel concret : p. ex. : 3b = 12 est semblable à 3b + 5 = 12 + 5 ou 2r = 7 est semblable à 3(2r) = 3(7).",
    "8.13": "Pour des problèmes qui peuvent être représentés par des équations linéaires des formes suivantes : ax + b = c; ax - b = c; ax = b; x/a = b, a ≠ 0 (où a, b et c sont des nombres entiers positifs). Tracer une représentation visuelle des étapes utilisées pour résoudre une équation linéaire.",
    "8.15": "Pour des problèmes qui peuvent être représentés par des équations linéaires des formes suivantes : ax + b = c; ax - b = c; ax = b; x/a = b, a ≠ 0 (où a, b et c sont des nombres entiers positifs). Résoudre un problème donné à l’aide d’équations linéaires et noter le processus.",
    "8.16": "Pour des problèmes qui peuvent être représentés par des équations linéaires des formes suivantes : ax + b = c; ax - b = c; ax = b; x/a = b, a ≠ 0 (où a, b et c sont des nombres entiers positifs). Vérifier la solution d’une équation linéaire à l’aide de matériel concret et de diagrammes.",
    "8.17": "Pour des problèmes qui peuvent être représentés par des équations linéaires des formes suivantes : ax + b = c; ax - b = c; ax = b; x/a = b, a ≠ 0 (où a, b et c sont des nombres entiers positifs). Substituer la solution d’une équation à la variable dans l’équation linéaire originale pour en vérifier l’égalité.",
    "8.7": "Pour des problèmes qui peuvent être représentés par des équations linéaires à une étape de la forme x + a = b, où a et b sont des nombres entiers. Représenter un problème donné sous forme d’une équation linéaire et le résoudre à l’aide de matériel concret tel que des jetons ou des carreaux algébriques.",
    "8.8": "Pour des problèmes qui peuvent être représentés par des équations linéaires à une étape de la forme x + a = b, où a et b sont des nombres entiers. Tracer une représentation visuelle des étapes requises pour résoudre une équation linéaire.",
    "8.9": "Pour des problèmes qui peuvent être représentés par des équations linéaires à une étape de la forme x + a = b, où a et b sont des nombres entiers. Résoudre un problème donné à l’aide d’équations linéaires.",
    "8.10": "Pour des problèmes qui peuvent être représentés par des équations linéaires à une étape de la forme x + a = b, où a et b sont des nombres entiers. Vérifier la solution d’une équation linéaire donnée à l’aide de matériel concret et de diagrammes.",
    "8.11": "Pour des problèmes qui peuvent être représentés par des équations linéaires à une étape de la forme x + a = b, où a et b sont des nombres entiers. Substituer, dans l’équation linéaire originale, la solution possible à la variable dans une équation linéaire donnée pour en vérifier l’égalité.",
    "8.2": "Résoudre un problème donné en appliquant la préservation de l’égalité.",
    "11.6": "Déterminer la moyenne, la médiane et le mode d’un ensemble de données fourni et expliquer pourquoi ces mesures peuvent être identiques ou différentes.",
    "11.7": "Déterminer l’étendue de différents ensembles de données fournis.",
    "11.8": "Fournir un contexte dans lequel soit la moyenne, la médiane ou le mode d’un ensemble de données est la mesure de la tendance centrale la plus appropriée pour le décrire.",
    "11.9": "Résoudre un problème donné qui comprend des mesures de tendance centrale.",
    "11.10": "Analyser un ensemble de données fourni afin d’en identifier toute valeur aberrante.",
    "11.11": "Expliquer les effets des valeurs aberrantes sur les mesures de tendance centrale d’un ensemble spécifique de données.",
    "11.12": "Identifier les valeurs aberrantes d’un ensemble fourni de données et expliquer pourquoi il est approprié ou non d’en tenir compte lors de la détermination de mesures de tendance centrale.",
    "11.13": "Fournir des exemples de situations dans lesquelles des valeurs aberrantes devraient ou ne devraient pas être incluses lors de la détermination de mesures de tendance centrale.",
    "12.1": "Déterminer la probabilité de l’un des résultats d’une expérience de probabilité et exprimer cette probabilité sous la forme d’un rapport, d’une fraction et d’un pourcentage.",
    "12.2": "Fournir un exemple d’un évènement dont la probabilité est 0 ou 0 % (impossible) et d’un évènement dont la probabilité d’un évènement est 1 ou 100 % (certain).",
    "12.3": "Fournir un exemple de paires d’évènements indépendants tels que : faire tourner une roulette ayant quatre secteurs et lancer un dé à huit faces; lancer une pièce de monnaie et lancer un dé à douze faces; lancer deux pièces de monnaie; lancer deux dés; et expliquer pourquoi ces évènements sont des évènements indépendants.",
    "12.4": "Identifier l’espace échantillonnal (l’ensemble des résultats possibles) de chacun des deux évènements indépendants d’une expérience donnée en utilisant un diagramme en arbre, un tableau ou un autre outil de classement graphique.",
    "12.5": "Déterminer la probabilité théorique d’un résultat donné, comportant deux évènements indépendants.",
    "12.6": "Mener une expérience de probabilité à la suite de deux évènements indépendants, avec ou sans l’aide de la technologie, afin de comparer la probabilité expérimentale et la probabilité théorique.",
    "12.7": "Résoudre un problème de probabilité donné comportant deux évènements indépendants.",
    "10.1": "Identifier les segments de droites parallèles ou perpendiculaires qui apparaissent dans un diagramme donné.",
    "10.2": "Décrire des exemples de segments de droites parallèles dans l’environnement.",
    "10.13": "Tracer un segment de droite parallèle à un autre segment de droite, et expliquer comment on sait qu’ils sont parallèles.",
    "10.3": "Décrire des exemples de segments de droites perpendiculaires dans l’environnement.",
    "10.14": "Tracer un segment de droite perpendiculaire à un autre segment de droite, et expliquer comment on sait qu’ils sont perpendiculaires.",
    "10.4": "Décrire des exemples de médiatrices dans l’environnement.",
    "10.15": "Tracer la médiatrice d’un segment de droite de plus d’une façon, et vérifier leur construction.",
    "10.5": "Décrire des exemples de bissectrices dans l’environnement.",
    "10.16": "Tracer la bissectrice d’un angle donné de plus d’une façon, et vérifier la congruence des angles obtenus.",
    "10.6": "Étiqueter les axes d’un plan à quatre quadrants (ou plan cartésien) et en identifier l’origine.",
    "10.7": "Identifier l’emplacement d’un point donné dans n’importe lequel des quadrants d’un plan cartésien, d’après sa paire ordonnée (se limitant aux nombres entiers).",
    "10.9": "Tracer un point donné d’après ses coordonnées, dont la paire ordonnée est composée de nombres entiers, dans un plan cartésien dont les axes ont des intervalles de 1, 2, 5 ou 10 unités.",
    "10.17": "Tracer des motifs ou des figures dans un plan cartésien à partir de paires ordonnées.",
    "10.18": "Créer des motifs et des figures dans n’importe lequel des quatre quadrants d’un plan cartésien et identifier les points utilisés pour le produire.",
    "10.8": "Identifier les coordonnées des sommets d’une figure à deux dimensions donnée dans un plan cartésien.",
    "10.10": "Décrire le déplacement horizontal et le déplacement vertical nécessaires pour aller d’un point à un autre dans un plan cartésien.",
    "10.19": "Déterminer la distance horizontale et la distance verticale entre deux points situés dans n’importe lequel des quatre quadrants d’un plan cartésien.",
    "10.11": "Décrire le déplacement des sommets d’une forme à deux dimensions par rapport aux sommets de l’image comme un résultat de la transformation ou d’une combinaison des transformations successives.",
    "10.20": "Effectuer une transformation ou des transformations consécutives sur une forme à deux dimensions et identifier les coordonnées des sommets de l’image.",
    "10.12": "Décrire l’image obtenue après la transformation d’une figure à deux dimensions donnée dans un plan cartésien en identifiant les coordonnées de ses sommets."
  },
  unitInd: {
    "1": [
      "5.1",
      "5.2",
      "5.3",
      "5.4",
      "8.4",
      "8.5",
      "8.6",
      "7.1",
      "7.8",
      "7.7",
      "7.9",
      "7.10",
      "7.11",
      "7.12",
      "7.3",
      "7.4",
      "7.5",
      "7.6",
      "7.2",
      "8.12"
    ],
    "2": [
      "6.24",
      "6.29",
      "6.25",
      "6.26",
      "6.27",
      "6.28"
    ],
    "3": [
      "3.8",
      "3.9",
      "3.10",
      "3.11",
      "3.12",
      "3.13",
      "3.14",
      "3.3",
      "3.1",
      "3.4",
      "3.2",
      "3.5",
      "3.6",
      "6.5",
      "6.6",
      "6.1",
      "6.7",
      "6.2",
      "6.9",
      "6.8",
      "6.4",
      "6.3",
      "6.10",
      "3.7",
      "6.11",
      "6.12"
    ],
    "4": [
      "9.11",
      "9.12",
      "9.7",
      "9.8",
      "9.10",
      "9.1",
      "9.2",
      "9.3",
      "9.4",
      "9.5",
      "9.6",
      "9.9",
      "11.1",
      "11.2",
      "9.13",
      "11.5",
      "11.4",
      "11.3"
    ],
    "5": [
      "6.13",
      "6.14",
      "6.15",
      "6.16",
      "6.17",
      "6.18",
      "6.19",
      "6.20",
      "6.21",
      "6.22",
      "6.23"
    ],
    "6": [
      "8.14",
      "8.1",
      "8.3",
      "8.12",
      "8.13",
      "8.15",
      "8.16",
      "8.17",
      "8.7",
      "8.8",
      "8.9",
      "8.10",
      "8.11",
      "8.2"
    ],
    "7": [
      "11.6",
      "11.7",
      "11.8",
      "11.9",
      "11.10",
      "11.11",
      "11.12",
      "11.13",
      "12.1",
      "12.2",
      "12.3",
      "12.4",
      "12.5",
      "12.6",
      "12.7"
    ],
    "8": [
      "10.1",
      "10.2",
      "10.13",
      "10.3",
      "10.14",
      "10.4",
      "10.15",
      "10.5",
      "10.16",
      "10.6",
      "10.7",
      "10.9",
      "10.17",
      "10.18",
      "10.8",
      "10.10",
      "10.19",
      "10.11",
      "10.20",
      "10.12"
    ]
  },

  /* Preset labels in the French junior pattern the Math 9 FR
     course carries; the final preset's face label is the face
     scope wording for the same selection. Mixes are the junior
     family's [20, 60, 20], as the English course carries. */
  presets: {
    mid: { units: [1, 2, 3, 4], mix: [20, 60, 20], label: "Révision de mi-parcours (unités 1 à 4)" },
    final: { units: [5, 6, 7, 8], mix: [20, 60, 20], label: "Révision finale (unités 5 à 8)", faceLabel: "Révision de fin de cours (unités 5 à 8)" }
  },
  hints: true,

  /* Timer note as the fork's timer strings carry it: the real
     exam allows 1 heure 30 minutes. */
  timerNote: "1 heure 30 minutes",

  /* Sheet header work strings verbatim from the fork's sheet
     header: [in the space provided, on your own paper]. */
  sheetWork: ["Montre tout ton travail dans l'espace fourni.", "Montre tout ton travail sur ta propre feuille."],

  /* Exam composer configuration: the junior pooled composer,
     identical to the English Math 7 course's. */
  exam: {
    "fallback": {
      "srCount": 18,
      "crMarks": 17,
      "levels": [
        7,
        21,
        7
      ],
      "crL3": [
        6,
        5,
        7
      ],
      "total": 35
    }
  },
  unitTest: {
    "total": 25,
    "sr": 11,
    "cr": 14
  },

  /* Reference panels verbatim from the standalone app
     (REF_HTML at line 5800): one per unit. */
  panels: {
    "1": "<b>Tests de divisibilité :</b> 2 : le dernier chiffre est pair. 3 : la somme des chiffres est divisible par 3. 4 : les deux derniers chiffres sont divisibles par 4. 5 : se termine par 0 ou 5. 6 : divisible par 2 et par 3. 8 : les trois derniers chiffres sont divisibles par 8. 9 : la somme des chiffres est divisible par 9. 10 : se termine par 0.<br><b>Division par 0 :</b> un nombre ne peut pas être divisé par 0, car aucun nombre multiplié par 0 ne donne le dividende.<br><b>Facteurs :</b> les facteurs d'un nombre sont les nombres entiers qui le divisent exactement ; trouve-les par paires, et un nombre est toujours un facteur de lui-même.<br><b>Parties d'une expression :</b> une variable est une lettre qui représente une valeur qui peut changer ; le coefficient numérique est le nombre qui multiplie la variable ; le terme constant est le terme sans variable.<br><b>Expression ou équation :</b> une expression n'a pas de signe égal et on l'évalue ; une équation pose deux expressions égales et on peut la résoudre.<br><b>Régularités :</b> pour une régularité de pas \\(d\\) et de premier terme \\(a\\), le terme en position \\(n\\) est \\(a + (n-1)d\\), qui se simplifie en \\(dn + (a-d)\\).<br><b>Relations linéaires :</b> une relation comme \\(y = ax + b\\) relie deux quantités ; \\(b\\) est la valeur de départ (à \\(x = 0\\)) et \\(a\\) est la quantité dont \\(y\\) change à chaque pas de \\(x\\).<br><b>Tables de valeurs et graphiques :</b> construis une table de valeurs en substituant chaque valeur de \\(x\\) dans la relation, puis place les paires comme des points discrets (des points seulement, non reliés).",
    "2": "<b>Nombres opposés :</b> les nombres entiers opposés sont à la même distance de 0 dans des directions opposées, donc leur somme est 0, par exemple \\(5 + (-5) = 0\\).<br><b>Addition de nombres entiers, mêmes signes :</b> additionne les valeurs absolues et garde le signe, par exemple \\((-4) + (-5) = -9\\).<br><b>Addition de nombres entiers, signes différents :</b> soustrais la plus petite valeur absolue de la plus grande et garde le signe de la plus grande, par exemple \\((-7) + 4 = -3\\).<br><b>Soustraction de nombres entiers :</b> réécris la soustraction comme l'addition de l'opposé, par exemple \\(3 - (-6) = 3 + 6 = 9\\).<br><b>Droite numérique :</b> ajouter un nombre positif déplace vers la droite et ajouter un nombre négatif déplace vers la gauche ; un saut de soustraction se déplace de l'opposé du nombre soustrait.<br><b>Problèmes :</b> transforme les montées, les gains et les dépôts en changements positifs, et les chutes, les pertes et les paiements en changements négatifs, puis additionne les changements signés à la valeur de départ.",
    "3": "<b>Ordonner des nombres :</b> convertis les fractions, les nombres décimaux et les pourcentages sous la même forme (les nombres décimaux sont les plus faciles) et compare ; les points de repère \\(0\\), \\(\\frac{1}{2}\\) et \\(1\\) ancrent les positions sur une droite numérique.<br><b>Fraction en nombre décimal :</b> divise le numérateur par le dénominateur, p. ex. \\(\\frac{3}{8} = 3 \\div 8\\).<br><b>Nombre décimal en fraction :</b> utilise la dernière position décimale comme dénominateur (\\(0,7 = \\frac{7}{10}\\), \\(0,35 = \\frac{35}{100}\\)), puis simplifie.<br><b>Pourcentages :</b> \\(p\\% = \\frac{p}{100}\\) ; pour écrire un pourcentage sous forme décimale, divise par \\(100\\). Pour trouver le pourcentage d'un nombre, multiplie la forme décimale par le nombre.<br><b>Nombres décimaux périodiques :</b> un seul chiffre qui se répète va sur \\(9\\) et deux chiffres qui se répètent vont sur \\(99\\). Une fraction sous sa forme réduite se termine quand son dénominateur se décompose seulement en facteurs \\(2\\) et \\(5\\) ; tout autre facteur premier signifie qu'elle se répète.<br><b>Addition et soustraction de nombres décimaux :</b> aligne les virgules décimales et travaille colonne par colonne.<br><b>Multiplication et division de nombres décimaux :</b> le nombre total de positions décimales dans les facteurs donne le nombre de positions décimales dans le produit ; vérifie chaque réponse par une estimation des premiers chiffres.<br><b>Argent et pourcentages :</b> arrondis les réponses finales en argent au cent le plus près. À Terre-Neuve-et-Labrador, la TVH est de \\(15 \\%\\) : total \\(=\\) prix \\(+\\) \\(0,15 \\times\\) prix.",
    "4": "<b>Rayon et diamètre :</b> \\(d = 2r\\) et \\(r = d \\div 2\\). L'écartement d'un compas égale le rayon du cercle qu'il trace.<br><b>Circonférence :</b> \\(C = \\pi d = 2\\pi r\\) avec \\(\\pi \\approx 3,14\\) ; la circonférence est environ \\(3\\) fois le diamètre, et \\(\\pi\\) est le rapport \\(\\frac{C}{d}\\) pour tout cercle.<br><b>Aire d'un cercle :</b> \\(A = \\pi r^2\\) ; divise d'abord le diamètre par deux quand le diamètre est donné. Pour estimer sans formule, compte les carrés entiers du quadrillage et ajoute la moitié des carrés partiellement couverts.<br><b>Aire d'un parallélogramme :</b> \\(A = b \\times h\\), où \\(h\\) est la hauteur perpendiculaire, et non le côté oblique ; un parallélogramme se réarrange en un rectangle de même base et de même hauteur.<br><b>Aire d'un triangle :</b> \\(A = \\frac{b \\times h}{2}\\), car deux triangles identiques forment un parallélogramme de même base et de même hauteur.<br><b>Diagrammes circulaires :</b> la somme des pourcentages est \\(100 \\%\\) et la somme des angles au centre est \\(360^{\\circ}\\).<br><b>Construire et lire des diagrammes circulaires :</b> angle au centre \\(= \\frac{\\text{pourcentage}}{100} \\times 360^{\\circ}\\) ; quantité dans un secteur \\(= \\frac{\\text{pourcentage}}{100} \\times \\text{total sondé}\\).",
    "5": "<b>Addition de fractions de même dénominateur :</b> additionne les numérateurs et garde le dénominateur, p. ex. \\(\\frac{a}{d} + \\frac{b}{d} = \\frac{a+b}{d}\\).<br><b>Dénominateur commun :</b> utilise le plus petit commun multiple des dénominateurs ; réécris chaque fraction en multipliant son numérateur et son dénominateur par le même facteur.<br><b>Addition ou soustraction de fractions de dénominateurs différents :</b> réécris d'abord les deux fractions sur un dénominateur commun, puis additionne ou soustrais les numérateurs.<br><b>Forme réduite :</b> divise le numérateur et le dénominateur par leur plus grand facteur commun ; une fraction est sous sa forme réduite quand le seul facteur commun est 1.<br><b>Nombres fractionnaires :</b> additionne ou soustrais séparément les nombres entiers et les parties fractionnaires ; si les parties fractionnaires dépassent un entier, regroupe ; si une partie fractionnaire est trop petite pour en soustraire une autre, regroupe un entier en parties fractionnaires.<br><b>Modélisation avec des bandes ou des cercles :</b> un tout est divisé en parties égales ; les parties ombrées montrent une fraction, et les parties ombrées barrées sont enlevées.<br><b>Vérification de la vraisemblance :</b> compare aux points de repère \\(0\\), \\(\\frac{1}{2}\\) et \\(1\\) ; une somme de deux quantités positives est plus grande que chacune d'elles, et une différence est plus petite que la quantité de départ.<br><b>Fractions impropres et nombres fractionnaires :</b> \\(\\frac{7}{4} = 1\\frac{3}{4}\\) ; pour écrire un nombre fractionnaire sous forme de fraction impropre, multiplie le nombre entier par le dénominateur et ajoute le numérateur.",
    "6": "<b>Préservation de l'égalité :</b> une équation reste équilibrée quand on fait la même opération des deux côtés ; la nouvelle équation est équivalente et a la même solution.<br><b>Opérations inverses :</b> l'addition est défaite par la soustraction, la soustraction par l'addition, la multiplication par la division, et la division par la multiplication.<br><b>Équations à une étape \\(x + a = b\\) :</b> soustrais \\(a\\) des deux côtés, ce qui donne \\(x = b - a\\) ; pour \\(x - a = b\\), ajoute \\(a\\) des deux côtés.<br><b>Équations à deux étapes \\(ax + b = c\\) :</b> défais dans l'ordre inverse : soustrais \\(b\\) des deux côtés, puis divise les deux côtés par \\(a\\) ; pour \\(ax - b = c\\), ajoute d'abord \\(b\\), puis divise par \\(a\\).<br><b>Équations \\(ax = b\\) et \\(\\frac{x}{a} = b\\) :</b> divise les deux côtés par \\(a\\) pour la première ; multiplie les deux côtés par \\(a\\) pour la deuxième.<br><b>Modéliser un problème :</b> nomme l'inconnue, puis écris le montant fixe plus le montant par unité fois l'inconnue égal au total.<br><b>Vérification d'une solution :</b> substitue la valeur à la variable dans l'équation de départ ; la valeur est une solution seulement si les deux côtés sont égaux.<br><b>Résolution par inspection et par essai systématique :</b> l'inspection trouve la valeur qui rend l'équation vraie ; l'essai systématique teste des valeurs dans l'ordre et utilise chaque résultat pour réduire la recherche.",
    "7": "<b>Moyenne :</b> additionne toutes les valeurs et divise par le nombre de valeurs.<br><b>Médiane :</b> la valeur du milieu d'une liste ordonnée ; pour un nombre pair de valeurs, fais la moyenne des deux valeurs du milieu.<br><b>Mode :</b> la valeur qui apparaît le plus souvent ; un ensemble peut n'avoir aucun mode ou en avoir plus d'un.<br><b>Étendue :</b> la plus grande valeur moins la plus petite valeur.<br><b>Choisir une mesure :</b> utilise le mode pour l'élément ou la catégorie la plus fréquente, la médiane quand une valeur aberrante tirerait la moyenne, et la moyenne quand chaque valeur doit compter également.<br><b>Valeurs aberrantes :</b> des valeurs loin du groupe principal ; elles tirent fortement la moyenne et seulement légèrement la médiane.<br><b>Probabilité :</b> \\(P = \\frac{\\text{résultats favorables}}{\\text{résultats possibles au total}}\\) ; une probabilité de 0 signifie impossible et une probabilité de 1 (100 %) signifie certain.<br><b>Deux évènements indépendants :</b> multiplie les nombres de résultats pour obtenir la taille de l'espace échantillonnal ; le résultat d'un évènement ne change pas l'autre.<br><b>Probabilité expérimentale :</b> \\(\\frac{\\text{nombre de fois où le résultat s'est produit}}{\\text{nombre d'essais}}\\) ; le nombre attendu dans une expérience est la probabilité théorique fois le nombre d'essais.",
    "8": "<b>Segments parallèles :</b> ils ne se rencontrent jamais et restent à la même distance l'un de l'autre.<br><b>Segments perpendiculaires :</b> ils se rencontrent à \\(90^\\circ\\).<br><b>Médiatrice :</b> une droite qui coupe un segment en deux parties égales à \\(90^\\circ\\) ; chaque point sur cette droite est à la même distance des deux extrémités du segment.<br><b>Bissectrice :</b> une demi-droite partant du sommet qui partage un angle en deux angles égaux.<br><b>Plan cartésien :</b> l'axe horizontal est l'axe des \\(x\\), l'axe vertical est l'axe des \\(y\\), et ils se croisent à l'origine \\((0, 0)\\).<br><b>Paires ordonnées :</b> \\((x, y)\\) signifie \\(x\\) unités à l'horizontale à partir de l'origine, puis \\(y\\) unités vers le haut (les valeurs négatives vont à gauche ou vers le bas). Les quadrants selon les signes : I \\((+, +)\\), II \\((-, +)\\), III \\((-, -)\\), IV \\((+, -)\\).<br><b>Distance sur les lignes du quadrillage :</b> pour des points sur la même ligne horizontale, soustrais les valeurs de \\(x\\) ; sur la même ligne verticale, soustrais les valeurs de \\(y\\).<br><b>Translations :</b> ajoute le déplacement horizontal à \\(x\\) et le déplacement vertical à \\(y\\) (les déplacements vers la gauche et vers le bas sont négatifs).<br><b>Réflexions :</b> par rapport à l'axe des \\(x\\), \\((x, y)\\) devient \\((x, -y)\\) ; par rapport à l'axe des \\(y\\), \\((x, y)\\) devient \\((-x, y)\\)."
  }
  },

  /* Mathematics 8 (Math 8), ported from the standalone app at
     math-8-review/ (served from the Math8Review repo). The
     standalone's bank is bank-src.js (byte-identical to the
     splice served inside its index.html, between the
     BANK-SRC-BEGIN and BANK-SRC-END markers, apart from one
     trailing blank line at the end of bank-src.js); the port's
     bank sources are banks/math-8/, cut verbatim from
     bank-src.js in its own order (helpers, Units 1 to 8, then
     the November 9, 2026 pool-gap fill additions), with the
     source's CR_MARKS literal (bank-src.js line 4668) carried
     as the per-file CRMARKS manifests: 193 entries (per-unit
     27/21/23/23/34/19/22/24) and 89 constructed-response keys.
     Kept out of the picker (listed:false) until Jason passes
     it. */
  "math-8": {
  id: "math-8",
  shortName: "Math 8",

  /* Long name (ruling 5 in the junior scoping): the standalone
     heads its face card "Mathematics 8 Review" (line 249) and
     subtitles itself "Fresh practice questions for Mathematics
     8, drawn by unit or by curriculum indicator." (line 244).
     The header and document title keep the short name: its
     <title> (line 6) is "Math 8 Review: Practice Question
     Bank", carried as title below. */
  longName: "Mathematics 8",
  title: "Math 8 Review: Practice Question Bank",
  subject: "Mathematics",
  grade: 8,
  listed: true,
  storagePrefix: "m8",
  bankFile: "math-8.js",
  defaultCheckMode: "each",

  /* Unit names verbatim from the standalone app (UNITS at
     line 652). */
  units: {
    "1": "Square Roots and the Pythagorean Theorem",
    "2": "Integers",
    "3": "Operations with Fractions",
    "4": "Measuring Prisms and Cylinders",
    "5": "Percent, Ratio and Rate",
    "6": "Linear Equations and Graphing",
    "7": "Data Analysis and Probability",
    "8": "Geometry"
  },

  /* Indicator texts verbatim from the standalone app
     (INDICATORS at line 653): 109 codes. */
  indicators: {
    "3.19": "Represent a perfect square as a square region using materials, such as grid paper or square shapes",
    "3.20": "Determine whether a given number is a perfect square using materials and strategies, such as square shapes, grid paper or prime factorization, and explain the reasoning",
    "5.2": "For whole numbers that are perfect squares Determine the square root of a given perfect square and record it symbolically",
    "5.1": "For whole numbers that are perfect squares Determine the factors of a given perfect square, and explain why one of the factors is a square root and the others are not",
    "5.3": "For whole numbers Determine the square of a given number",
    "6.30": "Estimate, or approximate, a square root of a given number that is not a perfect square using the roots of perfect squares as benchmarks",
    "6.31": "Identify a whole number whose square root lies between two given numbers",
    "6.32": "Approximate a square root of a given number that is not a perfect square using technology, e.g., calculator, computer",
    "6.33": "Explain why a square root of a number shown on a calculator may be an approximation",
    "9.1": "Model and explain the Pythagorean theorem concretely, pictorially or using technology",
    "9.12": "Determine the measure of the third side of a right triangle, given the measures of the other two sides, to solve a given problem",
    "9.2": "Explain, using examples, that the Pythagorean theorem applies only to right triangles",
    "9.13": "Determine whether or not a given triangle is a right triangle by applying the Pythagorean theorem",
    "9.14": "Solve a given problem that involves Pythagorean triples, e.g. 3, 4, 5 or 5, 12, 13",
    "6.17": "Model the process of multiplying two integers using concrete materials or pictorial representations and record the process",
    "6.18": "Generalize and apply a rule for determining the sign of the product of integers",
    "6.19": "Provide a context that requires multiplying two integers",
    "6.20": "Solve a given problem involving the multiplication of integers",
    "6.21": "Model the process of dividing an integer by an integer using concrete materials or pictorial representations and record the process",
    "6.22": "Generalize and apply a rule for determining the sign of the quotient of integers",
    "6.23": "Provide a context that requires dividing two integers",
    "6.24": "Solve a given problem involving the division of integers (2-digit by 1-digit) without the use of technology",
    "6.25": "Solve a given problem involving the division of integers (2-digit by 2-digit) with the use of technology",
    "6.26": "Identify the operation required to solve a given problem involving integers",
    "6.27": "Solve a given problem involving integers taking into consideration order of operations",
    "6.4": "For positive fractions and mixed numbers Model multiplication of a positive fraction by a whole number concretely or pictorially and record the process",
    "6.5": "For positive fractions and mixed numbers Model multiplication of a positive fraction by a positive fraction concretely or pictorially using an area model and record the process",
    "6.6": "For positive fractions and mixed numbers Provide a context that requires the multiplication of two given positive fractions",
    "6.7": "For positive fractions and mixed numbers Estimate the product of two given positive proper fractions to determine if the product will be closer to 0, , or 1",
    "6.8": "For positive fractions and mixed numbers Generalize and apply rules for multiplying positive proper fractions, including mixed numbers",
    "6.9": "For positive fractions and mixed numbers Model division of a whole number and a positive proper fraction, concretely or pictorially and record the process",
    "6.10": "For positive fractions and mixed numbers Model division of a positive proper fraction by a positive proper fraction pictorially and record the process",
    "6.11": "For positive fractions and mixed numbers Estimate the quotient of two given positive fractions and compare the estimate to whole number benchmarks",
    "6.12": "For positive fractions and mixed numbers Generalize and apply rules for dividing positive proper fractions",
    "6.13": "For positive fractions and mixed numbers Model, generalize and apply rules for dividing fractions with mixed numbers",
    "6.14": "For positive fractions and mixed numbers Provide a context that requires the dividing of two given positive fractions",
    "6.15": "For positive fractions and mixed numbers Identify the operation required to solve a given problem involving positive fractions",
    "6.16": "For positive fractions and mixed numbers Solve a given problem involving positive fractions taking into consideration order of operations (limited to problems with positive solutions)",
    "10.1": "Match a given net to the 3-D object it represents",
    "10.11": "Draw nets for a given right circular cylinder, right rectangular prism, and verify by constructing the 3-D objects from the nets",
    "10.2": "Predict 3-D objects that can be created from a given net and verify the prediction",
    "10.12": "Construct a 3-D object from a given net",
    "10.3": "For right rectangular prisms, right triangular prisms, and right cylinders  Identify all the faces of a given prism, including right rectangular and right triangular prisms",
    "9.3": "For right rectangular prisms, right triangular prisms, and right cylinders Explain, using examples, the relationship between the area of a 2-D shape and the surface area of a given 3-D object",
    "9.4": "For right rectangular prisms, right triangular prisms, and right cylinders  Describe and apply strategies for determining the surface area of a given right rectangular or right triangular prism",
    "9.5": "For right rectangular prisms, right triangular prisms, and right cylinders  Solve a given problem involving surface area",
    "9.6": "For right rectangular prisms, right triangular prisms, and right cylinders  Describe and apply strategies for determining the surface area of a given right cylinder",
    "9.7": "Determine the volume of a given right prism, given the area of the base",
    "9.8": "Explain the connection between the area of the base of a given right 3-D objects and the formula for the volume of the object",
    "9.9": "Generalize and apply a rule for determining the volume of right cylinders",
    "9.10": "Demonstrate that the position of a given 3-D object does not affect its volume",
    "9.11": "Apply a formula to solve a given problem involving the volume of a right cylinder or a right prism",
    "3.1": "For problems involving percents greater than or equal to 0% Provide a context where a percent may be more than 100% or between 0% and 1%",
    "3.2": "For problems involving percents greater than or equal to 0% Represent a given fractional percent using grid paper",
    "3.3": "For problems involving percents greater than or equal to 0% Represent a given percent greater than 100 using grid paper",
    "3.4": "For problems involving percents greater than or equal to 0% Determine the percent represented by a given shaded region on a grid and record it in decimal, fractional and percent form",
    "3.5": "For problems involving percents greater than or equal to 0% Express a given percent in decimal or fractional form",
    "3.6": "For problems involving percents greater than or equal to 0% Express a given decimal in percent or fractional form",
    "3.7": "For problems involving percents greater than or equal to 0% Express a given fraction in decimal or percent form",
    "6.1": "For problems involving percents greater than or equal to 0% Solve a given problem involving percents",
    "6.2": "For problems involving percents greater than or equal to 0% Solve a given problem involving combined percents",
    "6.3": "For problems involving percents greater than or equal to 0% Solve a given problem that involves finding the percent of a percent",
    "3.8": "Express a two-term ratio from a given context in the forms 3:5 or 3 to 5",
    "3.9": "Express a three-term ratio from a given context in the forms 4:7:3 or 4 to 7 to 3",
    "3.10": "Express a part-to-part ratio as a part-to whole fraction",
    "3.11": "Express a given ratio as a percent",
    "3.13": "Explain the meaning of   within a given context",
    "3.15": "Provide a context in which a/b represents a ratio",
    "3.12": "Identify and describe ratios from real-life examples, and record them symbolically",
    "6.28": "Solve a given problem involving ratio",
    "3.16": "Express a given rate using words or symbols, e.g., 20L per 100 km or 20 L/100 km",
    "3.17": "Identify and describe rates from real-life examples, and record them symbolically",
    "3.14": "Provide a context in which  represents a rate",
    "3.18": "Explain why a rate cannot be represented as a percent",
    "6.29": "Solve a given problem involving rates",
    "8.1": "For problems that can be represented by linear equations of the form:  • ax = b  •  = b, a ≠ 0  • ax + b = c  •  + b = c, a ≠ 0  • a(x + b) = c  where a, b and c are integers.  Model a given problem with a linear equation and solve the equa",
    "8.2": "For problems that can be represented by linear equations of the form:  • ax = b  •  = b, a ≠ 0  • ax + b = c  •  + b = c, a ≠ 0  • a(x + b) = c  where a, b and c are integers   Draw a visual representation of the steps used to",
    "8.3": "For problems that can be represented by linear equations of the form:  • ax = b  •  = b, a ≠ 0  • ax + b = c  •  + b = c, a ≠ 0  • a(x + b) = c  where a, b and c are integers.  Verify the solution to a given linear equation using a variety",
    "8.4": "For problems that can be represented by linear equations of the form:  • ax = b  •  = b, a ≠ 0  • ax + b = c  •  + b = c, a ≠ 0  • a(x + b) = c  where a, b and c are integers.  Solve a given linear equation symbolically.",
    "8.5": "For problems that can be represented by linear equations of the form:  • ax = b  •  = b, a ≠ 0  • ax + b = c  •  + b = c, a ≠ 0  • a(x + b) = c  where a, b and c are integers.  Apply the distributive property to solve a given linear equatio",
    "8.6": "For problems that can be represented by linear equations of the form:  • ax = b  •  = b, a ≠ 0  • ax + b = c  •  + b = c, a ≠ 0  • a(x + b) = c  where a, b and c are integers.                 Identify and correct an error in a given incorre",
    "8.7": "For problems that can be represented by linear equations of the form:  • ax = b  •  = b, a ≠ 0  • ax + b = c  •  + b = c, a ≠ 0  • a(x + b) = c  where a, b and c are integers.  Solve a given problem using a linear equation and record the pr",
    "7.2": "Create a table of values by substituting values for a variable in the equation of a given linear relation",
    "7.3": "Determine the missing value in an ordered pair for a given equation",
    "7.4": "Construct a graph from the equation of a given linear relation (limited to discrete data)",
    "7.1": "Describe the relationship between the variables in a given graph",
    "11.1": "Compare the information that is provided for the same data set by a given set of graphs, including circle graphs, line graphs, bar graphs, double bar graphs and pictographs, to determine the strengths and limitations of each graph",
    "11.2": "Identify the advantages and disadvantages of different graphs, including circle graphs, line graphs, bar graphs, double bar graphs and pictographs, in representing a specific given set of data",
    "11.3": "Justify the choice of a graphical representation for a given situation and its corresponding data set",
    "11.4": "Explain how the format of a given graph, such as the size of the intervals, the width of bars and the visual representation, may lead to misinterpretation of the data",
    "11.5": "Explain how a given formatting choice could misrepresent the data",
    "11.6": "Identify conclusions that are inconsistent with a given data set or graph and explain the misinterpretation",
    "12.1": "Determine the probability of two given independent events and verify the probability using a different strategy",
    "12.2": "Provide a context in which  represents a probability",
    "12.3": "Generalize and apply a rule for determining the probability of independent events",
    "12.4": "Solve a given problem that involves determining the probability of independent events",
    "10.15": "Draw and label the top, front and side views for a given 3-D object on isometric dot paper",
    "10.9": "Compare different views of a given 3-D object to the object",
    "10.10": "Predict the top, front and side views that will result from a described rotation (limited to multiples of 90) and verify predictions",
    "10.16": "Draw and label the top, front and side views that result from a described rotation (limited to multiples of 90 degrees)",
    "10.17": "Build a 3-D block object, given the top, front and side views, with or without the use of technology",
    "10.18": "Sketch and label the top, front and side views of a 3-D object in the environment with or without the use of technology",
    "10.4": "Identify, in a given set of regular polygons, those shapes and combinations of shapes that will tessellate, and use angle measurements to justify choices",
    "10.5": "Identify, in a given set of irregular polygons, those shapes and combinations of shapes that will tessellate, and use angle measurements to justify choices",
    "10.6": "Identify and describe tessellations in the environment.",
    "10.7": "Identify a translation, reflection or rotation in a given tessellation",
    "10.8": "Identify a combination of transformations in a given tessellation",
    "10.13": "Create a tessellation using one or more 2-D shapes, and describe the tessellation in terms of transformations and conservation of area",
    "10.14": "Create a new tessellating shape (polygon or non-polygon) by transforming a portion of a given tessellating polygon and describe the resulting tessellation in terms of transformations and conservation of area"
  },

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at line 654): 109 placements over the
     109 codes; it agrees exactly with the codes the bank
     entries themselves carry at each placement. */
  unitInd: {
    "1": ["3.19", "3.20", "5.2", "5.1", "5.3", "6.30", "6.31", "6.32", "6.33", "9.1", "9.12", "9.2", "9.13", "9.14"],
    "2": ["6.17", "6.18", "6.19", "6.20", "6.21", "6.22", "6.23", "6.24", "6.25", "6.26", "6.27"],
    "3": ["6.4", "6.5", "6.6", "6.7", "6.8", "6.9", "6.10", "6.11", "6.12", "6.13", "6.14", "6.15", "6.16"],
    "4": ["10.1", "10.11", "10.2", "10.12", "10.3", "9.3", "9.4", "9.5", "9.6", "9.7", "9.8", "9.9", "9.10", "9.11"],
    "5": ["3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "6.1", "6.2", "6.3", "3.8", "3.9", "3.10", "3.11", "3.13", "3.15", "3.12", "6.28", "3.16", "3.17", "3.14", "3.18", "6.29"],
    "6": ["8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "7.2", "7.3", "7.4", "7.1"],
    "7": ["11.1", "11.2", "11.3", "11.4", "11.5", "11.6", "12.1", "12.2", "12.3", "12.4"],
    "8": ["10.15", "10.9", "10.10", "10.16", "10.17", "10.18", "10.4", "10.5", "10.6", "10.7", "10.8", "10.13", "10.14"]
  },

  /* Presets: the standalone's three buttons (builder markup
     lines 286 to 288) are "Mid-course review (Units 1 to 4)",
     "Final review (Units 5 to 8)" and "All units"; their
     handlers (lines 7788 to 7789) pass the level mix
     [20, 60, 20] for mid and final and no mix change for All,
     and the shell's All wiring selects every unit in the
     course when the config carries no allUnits key, so All
     needs no entry here. The face card names the final scope
     "End-of-course review: Units 5 to 8" (refreshFace, line
     5699), carried here as faceLabel; the mid face line
     "Mid-course review: Units 1 to 4" (line 5698) is exactly
     what the shell derives from the mid label, so mid needs
     no faceLabel. */
  presets: {
    mid:   { units: [1, 2, 3, 4], mix: [20, 60, 20], label: "Mid-course review (Units 1 to 4)" },
    final: { units: [5, 6, 7, 8], mix: [20, 60, 20], label: "Final review (Units 5 to 8)", faceLabel: "End-of-course review (Units 5 to 8)" }
  },

  /* Staged hints: every entry in this bank carries a two-stage
     hint (the standalone's E stores them as hint1 and hint2,
     and its showHint reveals strategy, then first step; its
     face card promises them, line 5706). The flag turns on
     the shell's hint UI for this course: the Hint button and
     hint box on practice questions, and the face card's
     "a hint, " wording. */
  hints: true,

  /* Timer note (ruling 3 in the junior scoping): the
     standalone's exam timer bar names the real exam's length
     (line 6738) and its timer checkbox label carries the same
     note (line 372). The shell composes the note from this
     string in both spots. */
  timerNote: "1 hour 30 minutes",

  /* Sheet header strings (ruling 4 in the junior scoping): the
     standalone's practice sheet header says "Show all your
     work ..." where the senior chassis says "workings" (its
     sheet header, line 6774). */
  sheetWork: ["Show all your work in the space provided.", "Show all your work on your own paper."],

  /* Exam blueprint, translated from the standalone app's
     composer (composeExam, lines 6615 to 6661): every
     multi-unit paper pools the whole selection at 35 marks,
     18 selected response drawn at level targets [7, 10, 1]
     (level totals [7, 21, 7] once the constructed-response
     levels are counted) and 17 constructed response with the
     Level 3 marks tried at [6, 5, 7] in that order. The
     fallback's total key (35) is read by the shell composer's
     expected-total check and by its short-paper check: the
     standalone's examShortNow (line 6285) judges a multi-unit
     paper short at SR under 18 or CR under 17, exactly
     fallback.srCount and fallback.crMarks. No per-scope
     blueprints: mid and final differ only in which units they
     select. A unit test is the same composer's single-unit
     paper: 25 marks, SR 11 (its own exact split is [4, 6, 1];
     the shell guides unit tests at 20/60/20, as everywhere)
     and CR 14 with the Level 3 marks tried at [5, 4, 6],
     which the shell's unit-test window already matches. */
  exam: {
    fallback: { srCount: 18, crMarks: 17, levels: [7, 21, 7], crL3: [6, 5, 7], total: 35 }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at line 5680): a panel for every one of the
     eight units, and no always-on panel. */
  panels: {
    "1": "<b>Perfect squares:</b> a perfect square is a whole number times itself, like \\(6^{2} = 36\\); on grid paper it fills a square region with equal rows and columns.<br><b>Square roots:</b> \\(\\sqrt{n}\\) is the value that multiplies by itself to give \\(n\\), so \\(\\sqrt{36} = 6\\) because \\(6 \\times 6 = 36\\); only the factor that pairs with itself is the square root.<br><b>Estimating roots:</b> bracket the number between neighbouring perfect squares: if \\(49 < 60 < 64\\), then \\(7 < \\sqrt{60} < 8\\), and the closer square gives the better estimate.<br><b>Calculator values:</b> a root shown on a screen is rounded, since its decimal digits continue past the display, so its square is close to the starting number rather than exactly equal.<br><b>Pythagorean theorem:</b> in a right triangle, \\(a^{2} + b^{2} = c^{2}\\), where \\(a\\) and \\(b\\) are the legs and \\(c\\) is the hypotenuse; it applies to right triangles only.<br><b>Finding a side:</b> for the hypotenuse, add the squares of the legs and take the root; for a leg, subtract the known squares and take the root.<br><b>Testing and triples:</b> a triangle is right exactly when the two shorter squares add to the longest square; triples like 3, 4, 5 and 5, 12, 13, and their scaled copies, pass this test.",
    "2": "<b>Sign rules for multiplying:</b> same signs give a positive product, different signs give a negative product: \\( (+)\\times(+)=+ \\), \\( (-)\\times(-)=+ \\), \\( (+)\\times(-)=- \\)<br>\n<b>Sign rules for dividing:</b> the same sign rules hold for quotients: \\( (-)\\div(-)=+ \\) and \\( (+)\\div(-)=- \\)<br>\n<b>Models:</b> red chips stand for negatives; removing groups is a negative action, so removing groups of red chips shows a negative times a negative<br>\n<b>Repeated change:</b> a change that repeats the same number of times is a product, such as a fall of \\(3\\) degrees each hour for \\(5\\) hours, \\((-3)\\times 5\\)<br>\n<b>Equal sharing:</b> a total split into equal parts is a quotient, such as \\((-36)\\div 6\\) for a total shared \\(6\\) ways<br>\n<b>Order of operations:</b> brackets first, then multiplication and division from left to right, then addition and subtraction from left to right<br>",
    "3": "<b>Multiply fractions:</b> multiply the numerators and multiply the denominators, then reduce; cancel a numerator with a denominator first to keep numbers small.<br><b>Mixed numbers:</b> change to an improper fraction before multiplying or dividing, e.g. \\(2\\frac{1}{3} = \\frac{7}{3}\\).<br><b>Fraction of a fraction:</b> \"of\" means multiply, and an area model shows the overlap of the two shaded parts.<br><b>Divide fractions:</b> multiply by the reciprocal of the divisor (flip only the second fraction): \\(\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\times \\frac{d}{c}\\).<br><b>Estimating:</b> compare each fraction with 0, \\(\\frac{1}{2}\\) and 1; a product of two proper fractions is smaller than both, and dividing by a proper fraction gives a quotient larger than the dividend.<br><b>Order of operations:</b> brackets first, then multiplication and division, then addition and subtraction.<br>",
    "4": "<b>Nets:</b> a net is a flat pattern of faces that folds into a 3-D object; a triangular prism net has 2 triangles and 3 rectangles, a cylinder net has 2 circles and 1 rectangle, and a rectangular prism net has 6 rectangles in 3 matching pairs.<br><b>Faces:</b> a right rectangular prism has 6 faces, a right triangular prism has 5 faces, and a right cylinder has 2 flat circular faces and 1 curved surface.<br><b>Surface area:</b> the total area of all faces, found by adding the face areas in the net; for a rectangular prism, \\(SA = 2(lw + lh + wh)\\).<br><b>Prisms:</b> for a triangular prism, add 2 triangular ends to the side rectangles: \\(SA = 2B + Ph\\), where \\(P\\) is the perimeter of one end.<br><b>Cylinders:</b> \\(SA = 2\\pi r^{2} + 2\\pi r h\\), where the curved side unrolls into a rectangle; use \\(\\pi = 3.14\\) for a decimal answer.<br><b>Volume:</b> for any right prism or cylinder, \\(V = \\text{base area} \\times \\text{height}\\); for a cylinder, \\(V = \\pi r^{2} h\\). Turning an object to a new position does not change its volume.<br>",
    "5": "<b>Percent:</b> a comparison out of 100; percents can be under 1% or over 100% when a new amount is compared with an earlier whole.<br><b>Conversions:</b> percent to decimal, divide by 100; decimal to percent, multiply by 100; a fraction converts by dividing numerator by denominator, for example \\( \\frac{3}{4}=0.75=75\\% \\).<br><b>Percent problems:</b> part \\(=\\text{percent}\\times\\text{whole}\\); combined percents act in steps on the amount left, and a percent of a percent multiplies the two decimals.<br><b>Ratio:</b> a comparison of two amounts of the same kind, written \\(a:b\\); part-to-whole for the first term is \\( \\frac{a}{a+b} \\).<br><b>Rate:</b> a comparison of two different units, such as km/h; a unit rate has 1 as its second amount, and rates are compared by their unit rates.<br>",
    "6": "<b>Solving equations:</b> use inverse operations on both sides to isolate the variable: undo additions by subtracting, and undo multiplications by dividing.<br><b>Forms:</b> \\(ax = b\\), \\(\\frac{x}{a} = b\\), \\(ax + b = c\\), \\(\\frac{x}{a} + b = c\\) and \\(a(x + b) = c\\), solved by undoing the steps in reverse order.<br><b>Distributive property:</b> \\(a(x + b) = ax + ab\\); the number outside the brackets multiplies every term inside.<br><b>Checking a solution:</b> substitute the value into the original equation; it is a solution only if the left side equals the right side.<br><b>Tables and graphs:</b> substitute \\(x\\) values into the equation to get \\(y\\) values, then plot the ordered pairs \\((x, y)\\) as separate points for discrete data.<br><b>Missing values:</b> an ordered pair on a relation satisfies its equation, so substitute the known coordinate and solve for the other.",
    "7": "<b>Graph choice:</b> a line graph shows change over time, a circle graph shows shares of one whole, a bar graph compares categories, a double bar graph compares two groups inside each category, and a pictograph compares amounts with symbols.<br><b>Misleading formats:</b> an axis that does not start at zero, uneven axis intervals, 3-D effects, symbols of different sizes, and showing only a chosen part of the data can all misrepresent values.<br><b>Judging a graph:</b> compare bar heights, slice sizes and claims against the actual numbers; a majority means more than half.<br><b>Independent events:</b> events that do not affect each other; the probability that both happen is the product of their separate probabilities, \\(P(A \\text{ and } B) = P(A) \\times P(B)\\).<br><b>Drawing with replacement:</b> the item is put back, so the probabilities stay the same on the second draw.",
    "8": "<b>Views:</b> top view shows which squares hold cubes; front view column heights are the tallest stack in each column; side view columns run front to back<br><b>Height maps:</b> each number is the stack height on that square; total cubes is the sum of all numbers; for a rotated object, turn the map first, then read the views<br><b>Tessellations:</b> shapes cover with no gaps and no overlaps; angles at every point add to exactly \\( 360° \\)<br><b>Interior angle</b> of a regular \\( n \\)-gon: \\( \\dfrac{(n-2) \\times 180°}{n} \\): triangle \\( 60° \\), square \\( 90° \\), pentagon \\( 108° \\), hexagon \\( 120° \\), octagon \\( 135° \\)<br><b>Single regular tessellators:</b> only shapes whose interior angle divides \\( 360° \\): triangles, squares, hexagons<br><b>Transformations:</b> translation is a slide, reflection a flip, rotation a turn; a glide reflection is a flip combined with a slide; moving a piece between paired sides keeps the fit and keeps area the same"
  }
  },

  /* Mathematics 7 (Math 7), ported from the standalone app at
     math-7-review/ (served from the Math7Review repo). The
     standalone's bank is bank-src.js (byte-identical to the
     splice served inside its index.html, between the
     BANK-SRC-BEGIN and BANK-SRC-END markers); the port's bank
     sources are banks/math-7/, cut verbatim from bank-src.js in
     its own order (helpers, Units 1 to 8, then the November 9,
     2026 pool-gap fill additions), with the source's CR_MARKS
     literal (bank-src.js line 4470) carried as the per-file
     CRMARKS manifests: 209 entries (per-unit
     30/21/33/26/22/24/25/28) and 74 constructed-response keys.
     Kept out of the picker (listed:false) until Jason passes
     it. */
  "math-7": {
  id: "math-7",
  shortName: "Math 7",

  /* Long name (ruling 5 in the junior scoping): the standalone
     heads its face card "Mathematics 7 Review" (line 249) and
     subtitles itself "Fresh practice questions for Mathematics
     7, drawn by unit or by curriculum indicator." (line 244).
     The header and document title keep the short name: its
     <title> (line 6) is "Math 7 Review: Practice Question
     Bank", carried as title below. */
  longName: "Mathematics 7",
  title: "Math 7 Review: Practice Question Bank",
  subject: "Mathematics",
  grade: 7,
  listed: true,
  storagePrefix: "m7",
  bankFile: "math-7.js",
  defaultCheckMode: "each",

  /* Unit names verbatim from the standalone app (UNITS at
     line 652). */
  units: {
    "1": "Patterns and Relations",
    "2": "Integers",
    "3": "Fractions, Decimals and Percents",
    "4": "Circles and Area",
    "5": "Operations with Fractions",
    "6": "Equations",
    "7": "Data Analysis",
    "8": "Geometry"
},

  /* Indicator texts verbatim from the standalone app
     (INDICATORS at line 653): 129 codes. */
  indicators: {
    "5.1": "Determine if a given number is divisible by 2, 3, 4, 5, 6, 8, 9 or 10, and explain why",
    "5.2": "Sort a given set of numbers based upon their divisibility, using organizers such as Venn and Carroll diagrams",
    "5.3": "Explain, using an example, why numbers cannot be divided by 0",
    "5.4": "Determine the factors of a given number, using the divisibility rules",
    "8.4": "Explain what a variable is and how it is used in a given expression",
    "8.5": "Identify and provide an example of a constant term, numerical coefficient and variable in an expression and an equation",
    "8.6": "Provide an example of an expression and an equation, and explain how they are similar and different",
    "7.1": "Represent a given oral or written pattern using an algebraic expression",
    "7.8": "Substitute a value for an unknown in a given expression, and evaluate the expression",
    "7.7": "Formulate a linear relation to represent the relationship in a given oral or written pattern",
    "7.9": "Create a table of values for a given linear relation by substituting values for the variable",
    "7.10": "Create a table of values, using a linear relation, and graph the table of values (limited to discrete elements)",
    "7.11": "Sketch the graph from a table of values created for a given linear relation, and describe the patterns found in the graph to draw conclusions; e.g., graph the relationship between n and 2n + 3",
    "7.12": "Describe, using everyday language in spoken or written form, the relationship shown on a graph to solve problems",
    "7.3": "Provide a context for a given linear relation that represents a pattern",
    "7.4": "Represent a pattern in the environment, using a linear relation",
    "7.5": "Match a given set of linear relations to a given set of graphs",
    "7.6": "Match a given set of graphs to a given set of linear relations",
    "7.2": "Represent a given oral or written pattern using an equation",
    "8.12": "For problems that can be represented by linear equations of the form:  • ax + b = c  • ax - b = c  • ax = b  • x/a = b, a ≠ 0  where a, b and c are whole numbers   Model a given problem with a linear equation and solve the equation, using con",
    "6.24": "Explain, using concrete materials such as integer tiles and diagrams, that the sum of opposite integers is zero",
    "6.29": "Solve a given problem involving the addition and subtraction of integers",
    "6.25": "Add two given integers, using concrete materials or pictorial representations, and record the process symbolically",
    "6.26": "Illustrate, using a number line, the results of adding negative and positive integers",
    "6.27": "Subtract two given integers, using concrete materials or pictorial representations, and record the process symbolically",
    "6.28": "Illustrate, using a number line, the results of subtracting negative and positive integers",
    "3.8": "For repeating decimals limited to 1 or 2 repeating digits   Predict the decimal representation of a given fraction, using patterns; e.g., 1/11 = 0.0909..., 2/11 = 0.1818..., 3/11 = ?",
    "3.9": "For repeating decimals limited to 1 or 2 repeating digits   Match a given set of fractions to their decimal representations",
    "3.10": "For repeating decimals limited to 1 or 2 repeating digits   Sort a given set of fractions as repeating or terminating decimals",
    "3.11": "For repeating decimals limited to 1 or 2 repeating digits   Express a given fraction as a terminating or repeating decimal",
    "3.12": "For repeating decimals limited to 1 or 2 repeating digits   Express a given terminating decimal as a fraction",
    "3.13": "For repeating decimals limited to 1 or 2 repeating digits   Express a given repeating decimal as a fraction",
    "3.14": "For repeating decimals limited to 1 or 2 repeating digits  Provide an example where the decimal representation of a fraction is an approximation of its exact value",
    "3.3": "For whole numbers, positive fractions, and positive decimals (to thousandths)   Order the numbers of a given set that includes positive fractions, positive decimals and/or whole numbers in ascending or descending order, and verify the result using a varie",
    "3.1": "For whole numbers and positive fractions  Position fractions with like and unlike denominators from a given set on a number line, and explain strategies used to determine order",
    "3.4": "For whole numbers, positive fractions, and positive decimals (to thousandths)   Order the numbers of a given set by placing them on a number line that contains benchmarks, such as 0 and 1 or 0 and 5",
    "3.2": "For whole numbers and positive fractions  Position a given set of positive fractions, including mixed numbers and improper fractions, on a number line and explain strategies used to determine position",
    "3.5": "For whole numbers, positive fractions, and positive decimals (to thousandths) Identify a number that would be between two given numbers in an ordered sequence or on a number line",
    "3.6": "For whole numbers, positive fractions, and positive decimals (to thousandths)   Identify incorrectly placed numbers in an ordered sequence or on a number line",
    "6.5": "Solve a given problem involving the addition of two or more decimal numbers",
    "6.6": "Solve a given problem involving the subtraction of decimal numbers",
    "6.1": "Place the decimal in a sum or difference, using front- end estimation; e.g., for 4.5 + 0.73 + 256.458, think 4 + 256, so the sum is greater than 260",
    "6.7": "Solve a given problem involving the multiplication of decimal numbers with two digit multipliers (whole numbers or decimals) without the use of technology",
    "6.2": "Place the decimal in a product, using front-end estimation; e.g., for $12.33 x 2.4, think $12 x 2, so the product is greater than $24",
    "6.9": "Solve a given problem involving the multiplication or division of decimal numbers with more than 2-digit multipliers or 1-digit divisors (whole numbers or decimals) with the use of technology",
    "6.8": "Solve a given problem involving the division of decimal numbers for 1-digit divisors (whole numbers or decimals) without the use of technology",
    "6.4": "Check the reasonableness of solutions, using estimation",
    "6.3": "Place the decimal in a quotient, using front-end estimation; e.g., for 51.50 ÷ 2.1, think 50 ÷ 2, so the quotient is approximately 25",
    "6.10": "Solve a given problem that involves operations on decimals (limited to thousandths), taking into consideration the order of operations",
    "3.7": "Express a given percent as a fraction and a decimal",
    "6.11": "For problems involving percents from 1% to 100%   Solve a given problem that involves finding a percent",
    "6.12": "For problems involving percents from 1% to 100%   Determine the answer to a given percent problem where the answer requires rounding, and explain why an approximate answer is needed; e.g., total cost including taxes",
    "9.11": "Illustrate and explain that the diameter is twice the radius in a given circle",
    "9.12": "Draw a circle with a given radius or diameter, with and without a compass",
    "9.7": "Illustrate and explain that the circumference is approximately three times the diameter in a given circle",
    "9.8": "Explain that, for all circles, π is the ratio of the circumference to the diameter C/d and its value is approximately 3.14",
    "9.10": "Solve a given contextual problem involving circles",
    "9.1": "Illustrate and explain how the area of a rectangle can be used to determine the area of a parallelogram",
    "9.2": "Generalize a rule to create a formula for determining the area of parallelograms",
    "9.3": "Solve a given problem involving the area of triangles, parallelograms and/or circles",
    "9.4": "Illustrate and explain how the area of a rectangle or a parallelogram can be used to determine the area of a triangle",
    "9.5": "Generalize a rule to create a formula for determining the area of triangles",
    "9.6": "Illustrate and explain how to estimate the area of a circle without the use of a formula",
    "9.9": "Apply a formula for determining the area of a given circle",
    "11.1": "Find and compare circle graphs in a variety of print and electronic media, such as newspapers, magazines and the Internet",
    "11.2": "Identify common attributes of circle graphs, such as:  • title, label or legend  • the sum of the central angles is 360°  • the data is reported as a percent of the total, and the sum of the percents is equal to 100%",
    "9.13": "Explain, using an illustration, that the sum of the central angles of a circle is 360°",
    "11.5": "Translate percentages displayed in a circle graph into quantities to solve a given problem",
    "11.4": "Interpret a given circle graph to answer questions",
    "11.3": "Create and label a circle graph, with and without technology, to display a given set of data",
    "6.13": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences  Model addition of positive fractions, using concrete representations, and record symbolically",
    "6.14": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Determine the sum of two given positive fractions with like denominators",
    "6.15": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Simplify a given positive fraction by identifying the common factor between the numerator and denominator",
    "6.16": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Determine a common denominator for a given set of positive fractions",
    "6.17": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Determine the sum of two given positive fractions with unlike denominators",
    "6.18": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Model subtraction of positive fractions, using concrete representations, and record symbolically",
    "6.19": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences  Determine the difference of two given positive fractions",
    "6.20": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Model addition and subtraction of mixed numbers, using concrete representations, and record symbolically",
    "6.21": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Determine the sum or difference of two mixed numbers",
    "6.22": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Simplify the solution to a given problem involving the sum or difference of two positive fractions or mixed numbers.",
    "6.23": "For positive fractions and mixed numbers with like and unlike denominators, limited to positive sums and differences   Solve a given problem involving the addition or subtraction of positive fractions or mixed numbers, and determine if the solution is rea",
    "8.14": "For problems that can be represented by linear equations of the form:  • ax + b = c  • ax - b = c  • ax = b  • x/a = b, a ≠ 0  where a, b and c are whole numbers  Solve a given linear equation by inspection and by systematic trial",
    "8.1": "Model the preservation of equality for each of the four operations, using concrete materials or pictorial representations, explain the process orally and record it symbolically",
    "8.3": "Write equivalent forms of a given equation by applying the preservation of equality, and verify, using concrete materials; e.g., 3b = 12 is the same as 3b + 5 = 12 + 5 or 2r = 7 is the same as 3(2r) = 3(7)",
    "8.13": "For problems that can be represented by linear equations of the form:  • ax + b = c  • ax - b = c  • ax = b  • x/a = b, a ≠ 0  where a, b and c are whole numbers  Draw a visual representation of the steps required to solve a given linear equ",
    "8.15": "For problems that can be represented by linear equations of the form:  • ax + b = c  • ax - b = c  • ax = b  • x/a = b, a ≠ 0  where a, b and c are whole numbers.   Solve a given problem using a linear equation, and record the process",
    "8.16": "For problems that can be represented by linear equations of the form:  • ax + b = c  • ax - b = c  • ax = b  • x/a = b, a ≠ 0  where a, b and c are whole numbers  Verify the solution to a given linear equation using concrete materials and di",
    "8.17": "For problems that can be represented by linear equations of the form:  • ax + b = c  • ax - b = c  • ax = b  • x/a = b, a ≠ 0  where a, b and c are whole numbers   Substitute a possible solution for the variable in a given linear equation int",
    "8.7": "For problems that can be represented by one- step linear equations of the form x + a = b, where a and b are integers   Represent a given problem with a linear equation and solve the equation using concrete models, e.g. counters, integer tiles",
    "8.8": "For problems that can be represented by one- step linear equations of the form x + a = b, where a and b are integers   Draw a visual representation of the steps required to solve a given linear equation",
    "8.9": "For problems that can be represented by one- step linear equations of the form x + a = b, where a and b are integers   Solve a given problem using a linear equation",
    "8.10": "For problems that can be represented by one- step linear equations of the form x + a = b, where a and b are integers  Verify the solution to a given linear equation using concrete materials and diagrams",
    "8.11": "For problems that can be represented by one- step linear equations of the form x + a = b, where a and b are integers   Substitute a possible solution for the variable in a given linear equation into the original linear equation to verify the equality",
    "8.2": "Solve a given problem by applying preservation of equality",
    "11.6": "Determine mean, median and mode for a given set of data, and explain why these values may be the same or different",
    "11.7": "Determine the range for a given set of data",
    "11.8": "Provide a context in which the mean, median or mode is the most appropriate measure of central tendency to use when reporting findings",
    "11.9": "Solve a given problem involving the measures of central tendency",
    "11.10": "Analyze a given set of data to identify any outliers",
    "11.11": "Explain the effect of outliers on the measures of central tendency for a given data set",
    "11.12": "Identify outliers in a given set of data, and justify whether or not they are to be included in reporting the measures of central tendency",
    "11.13": "Provide examples of situations in which outliers would and would not be used in reporting the measures of central tendency",
    "12.1": "Determine the probability of a given outcome occurring for a given probability experiment, and express it as a ratio, fraction and percent",
    "12.2": "Provide an example of an event with a probability of 0 or 0% (impossible) and an example of an event with a probability of 1 or 100% (certain)",
    "12.3": "For two independent events with a combined sample space of 36 or fewer elements   Provide an example of two independent events, such as:  • spinning a four section spinner and rolling an eight-sided die  • tossing a coin and rolling a twelve-sided d",
    "12.4": "For two independent events with a combined sample space of 36 or fewer elements   Identify the sample space (all possible outcomes) for each of two independent events, using a tree diagram, table or other graphic organizer",
    "12.5": "For two independent events with a combined sample space of 36 or fewer elements   Determine the theoretical probability of a given outcome involving two independent events",
    "12.6": "Conduct a probability experiment for an outcome involving two independent events, with and without technology, to compare the experimental probability with the theoretical probability",
    "12.7": "Solve a given probability problem involving two independent events",
    "10.1": "Identify line segments on a given diagram that are parallel or perpendicular",
    "10.2": "Describe examples of parallel line segments in the environment",
    "10.13": "Draw a line segment parallel to another line segment, and explain why they are parallel",
    "10.3": "Describe examples of perpendicular line segments in the environment",
    "10.14": "Draw a line segment perpendicular to another line segment, and explain why they are perpendicular",
    "10.4": "Describe examples of perpendicular bisectors in the environment",
    "10.15": "Draw the perpendicular bisector of a line segment, using more than one method, and verify the construction",
    "10.5": "Describe examples of angle bisectors in the environment",
    "10.16": "Draw the bisector of a given angle, using more than one method, and verify that the resulting angles are equal",
    "10.6": "Label the axes of a four quadrant coordinate plane (or Cartesian plane), and identify the origin",
    "10.7": "Identify the location of a given point in any quadrant of a Cartesian plane, using an integral ordered pair",
    "10.9": "Plot the point corresponding to a given integral ordered pair on a Cartesian plane with units of 1, 2, 5 or 10 on its axes",
    "10.17": "Draw shapes and designs in a Cartesian plane, using integral ordered pairs",
    "10.18": "Create shapes and designs, and identify the points used to produce the shapes and designs, in any quadrant of a Cartesian plane",
    "10.8": "Identify the coordinates of the vertices of a given 2-D shape on a Cartesian plane",
    "10.10": "Describe the horizontal and vertical movement required to move from a given point to another point on a Cartesian plane",
    "10.19": "Determine the distance between points along horizontal and vertical lines in a Cartesian plane",
    "10.11": "Describe the positional change of the vertices of a given 2-D shape to the corresponding vertices of its image as a result of a transformation, or successive transformations, on a Cartesian plane",
    "10.20": "Perform a transformation or consecutive transformations on a given 2-D shape, and identify coordinates of the vertices of the image",
    "10.12": "Describe the image resulting from the transformation of a given 2-D shape on a Cartesian plane by identifying the coordinates of the vertices of the image"
},

  /* Unit to indicator map verbatim from the standalone app
     (UNIT_IND at line 654): 130 placements over the 129
     codes (the standalone places code 8.12 in both Unit 1
     and Unit 6); it agrees exactly with the codes the bank
     entries themselves carry at each placement. */
  unitInd: {
    "1": [
        "5.1",
        "5.2",
        "5.3",
        "5.4",
        "8.4",
        "8.5",
        "8.6",
        "7.1",
        "7.8",
        "7.7",
        "7.9",
        "7.10",
        "7.11",
        "7.12",
        "7.3",
        "7.4",
        "7.5",
        "7.6",
        "7.2",
        "8.12"
    ],
    "2": [
        "6.24",
        "6.29",
        "6.25",
        "6.26",
        "6.27",
        "6.28"
    ],
    "3": [
        "3.8",
        "3.9",
        "3.10",
        "3.11",
        "3.12",
        "3.13",
        "3.14",
        "3.3",
        "3.1",
        "3.4",
        "3.2",
        "3.5",
        "3.6",
        "6.5",
        "6.6",
        "6.1",
        "6.7",
        "6.2",
        "6.9",
        "6.8",
        "6.4",
        "6.3",
        "6.10",
        "3.7",
        "6.11",
        "6.12"
    ],
    "4": [
        "9.11",
        "9.12",
        "9.7",
        "9.8",
        "9.10",
        "9.1",
        "9.2",
        "9.3",
        "9.4",
        "9.5",
        "9.6",
        "9.9",
        "11.1",
        "11.2",
        "9.13",
        "11.5",
        "11.4",
        "11.3"
    ],
    "5": [
        "6.13",
        "6.14",
        "6.15",
        "6.16",
        "6.17",
        "6.18",
        "6.19",
        "6.20",
        "6.21",
        "6.22",
        "6.23"
    ],
    "6": [
        "8.14",
        "8.1",
        "8.3",
        "8.12",
        "8.13",
        "8.15",
        "8.16",
        "8.17",
        "8.7",
        "8.8",
        "8.9",
        "8.10",
        "8.11",
        "8.2"
    ],
    "7": [
        "11.6",
        "11.7",
        "11.8",
        "11.9",
        "11.10",
        "11.11",
        "11.12",
        "11.13",
        "12.1",
        "12.2",
        "12.3",
        "12.4",
        "12.5",
        "12.6",
        "12.7"
    ],
    "8": [
        "10.1",
        "10.2",
        "10.13",
        "10.3",
        "10.14",
        "10.4",
        "10.15",
        "10.5",
        "10.16",
        "10.6",
        "10.7",
        "10.9",
        "10.17",
        "10.18",
        "10.8",
        "10.10",
        "10.19",
        "10.11",
        "10.20",
        "10.12"
    ]
},

  /* Presets: the standalone's three buttons (builder markup
     lines 286 to 288) are "Mid-course review (Units 1 to 4)",
     "Final review (Units 5 to 8)" and "All units"; their
     handlers (lines 7573 to 7574) pass the level mix
     [20, 60, 20] for mid and final and no mix change for All,
     and the shell's All wiring selects every unit in the
     course when the config carries no allUnits key, so All
     needs no entry here. The face card names the final scope
     "End-of-course review: Units 5 to 8" (refreshFace, line
     5484), carried here as faceLabel; the mid face line
     "Mid-course review: Units 1 to 4" (line 5483) is exactly
     what the shell derives from the mid label, so mid needs
     no faceLabel. */
  presets: {
    mid:   { units: [1, 2, 3, 4], mix: [20, 60, 20], label: "Mid-course review (Units 1 to 4)" },
    final: { units: [5, 6, 7, 8], mix: [20, 60, 20], label: "Final review (Units 5 to 8)", faceLabel: "End-of-course review (Units 5 to 8)" }
  },

  /* Staged hints: every entry in this bank carries a two-stage
     hint (the standalone's E stores them as hint1 and hint2,
     and its showHint reveals strategy, then first step; its
     face card promises them, line 5491). The flag turns on
     the shell's hint UI for this course: the Hint button and
     hint box on practice questions, and the face card's
     "a hint, " wording. */
  hints: true,

  /* Timer note (ruling 3 in the junior scoping): the
     standalone's exam timer bar names the real exam's length
     (line 6523) and its timer checkbox label carries the same
     note (line 372). The shell composes the note from this
     string in both spots. */
  timerNote: "1 hour 30 minutes",

  /* Sheet header strings (ruling 4 in the junior scoping): the
     standalone's practice sheet header says "Show all your
     work ..." where the senior chassis says "workings" (its
     sheet header, line 6559). */
  sheetWork: ["Show all your work in the space provided.", "Show all your work on your own paper."],

  /* Exam blueprint, translated from the standalone app's
     composer (composeExam, lines 6400 to 6446): every
     multi-unit paper pools the whole selection at 35 marks,
     18 selected response drawn at level targets [7, 10, 1]
     (level totals [7, 21, 7] once the constructed-response
     levels are counted) and 17 constructed response with the
     Level 3 marks tried at [6, 5, 7] in that order. The
     fallback's total key (35) is read by the shell composer's
     expected-total check and by its short-paper check: the
     standalone's examShortNow (line 6070) judges a multi-unit
     paper short at SR under 18 or CR under 17, exactly
     fallback.srCount and fallback.crMarks. No per-scope
     blueprints: mid and final differ only in which units they
     select. A unit test is the same composer's single-unit
     paper: 25 marks, SR 11 (its own exact split is [4, 6, 1];
     the shell guides unit tests at 20/60/20, as everywhere)
     and CR 14 with the Level 3 marks tried at [5, 4, 6],
     which the shell's unit-test window already matches. */
  exam: {
    fallback: { srCount: 18, crMarks: 17, levels: [7, 21, 7], crL3: [6, 5, 7], total: 35 }
  },

  unitTest: { total: 25, sr: 11, cr: 14 },

  /* Reference panels carried verbatim from the standalone app
     (REF_HTML at line 5466): a panel for every one of the
     eight units, and no always-on panel. */
  panels: {
    "1": "<b>Divisibility tests:</b> 2: last digit even. 3: digit sum divisible by 3. 4: last two digits divisible by 4. 5: ends in 0 or 5. 6: divisible by both 2 and 3. 8: last three digits divisible by 8. 9: digit sum divisible by 9. 10: ends in 0.<br><b>Division by 0:</b> a number cannot be divided by 0, because no number multiplied by 0 gives the dividend.<br><b>Factors:</b> the factors of a number are the whole numbers that divide it exactly; find them in pairs, and a number is always a factor of itself.<br><b>Parts of an expression:</b> a variable is a letter standing for a value that can change; the numerical coefficient is the number multiplying the variable; the constant term is the term with no variable.<br><b>Expression or equation:</b> an expression has no equals sign and is evaluated; an equation sets two expressions equal and can be solved.<br><b>Patterns:</b> for a pattern with step \\(d\\) and first term \\(a\\), the term in position \\(n\\) is \\(a + (n-1)d\\), which simplifies to \\(dn + (a-d)\\).<br><b>Linear relations:</b> a relation such as \\(y = ax + b\\) links two quantities; \\(b\\) is the starting value (at \\(x = 0\\)) and \\(a\\) is the amount \\(y\\) changes for each step of \\(x\\).<br><b>Tables and graphs:</b> build a table by substituting each \\(x\\) value into the relation, then plot the pairs as discrete points (dots only, not joined).",
    "2": "<b>Opposites:</b> opposite integers are the same distance from 0 in opposite directions, so their sum is 0, for example \\(5 + (-5) = 0\\).<br><b>Adding integers, same signs:</b> add the sizes and keep the sign, for example \\((-4) + (-5) = -9\\).<br><b>Adding integers, different signs:</b> subtract the smaller size from the larger and keep the sign of the larger, for example \\((-7) + 4 = -3\\).<br><b>Subtracting integers:</b> rewrite the subtraction as adding the opposite, for example \\(3 - (-6) = 3 + 6 = 9\\).<br><b>Number line:</b> adding a positive moves right and adding a negative moves left; a subtraction jump moves by the opposite of the number being subtracted.<br><b>Problems:</b> turn rises, gains and deposits into positive changes, and falls, losses and payments into negative changes, then add the signed changes to the starting value.",
    "3": "<b>Ordering numbers:</b> convert fractions, decimals and percents to the same form (decimals are easiest) and compare; benchmarks \\(0\\), \\(\\frac{1}{2}\\) and \\(1\\) anchor positions on a number line.<br><b>Fraction to decimal:</b> divide the numerator by the denominator, e.g. \\(\\frac{3}{8} = 3 \\div 8\\).<br><b>Decimal to fraction:</b> use the last decimal place as the denominator (\\(0.7 = \\frac{7}{10}\\), \\(0.35 = \\frac{35}{100}\\)), then simplify.<br><b>Percents:</b> \\(p\\% = \\frac{p}{100}\\); to write a percent as a decimal, divide by \\(100\\). To find a percent of a number, multiply the decimal form by the number.<br><b>Repeating decimals:</b> a one-digit repeat sits over \\(9\\) and a two-digit repeat sits over \\(99\\). A fraction in lowest terms terminates when its denominator factors into only \\(2\\)s and \\(5\\)s; any other prime factor means it repeats.<br><b>Adding and subtracting decimals:</b> line up the decimal points and work column by column.<br><b>Multiplying and dividing decimals:</b> the total number of decimal places in the factors gives the decimal places in the product; check every answer with front-end estimation using the leading digits.<br><b>Money and percents:</b> round final money answers to the nearest cent. In Newfoundland and Labrador, HST is \\(15\\%\\): total \\(=\\) price \\(+\\) \\(0.15 \\times\\) price.",
    "4": "<b>Radius and diameter:</b> \\(d = 2r\\) and \\(r = d \\div 2\\). A compass opening equals the radius of the circle it draws.<br><b>Circumference:</b> \\(C = \\pi d = 2\\pi r\\) with \\(\\pi \\approx 3.14\\); the circumference is approximately \\(3\\) times the diameter, and \\(\\pi\\) is the ratio \\(\\frac{C}{d}\\) for every circle.<br><b>Area of a circle:</b> \\(A = \\pi r^2\\); halve the diameter first when the diameter is given. To estimate without a formula, count full grid squares and add half of the partly covered squares.<br><b>Area of a parallelogram:</b> \\(A = b \\times h\\), where \\(h\\) is the perpendicular height, not the slanted side; a parallelogram rearranges into a rectangle with the same base and height.<br><b>Area of a triangle:</b> \\(A = \\frac{b \\times h}{2}\\), because two identical triangles make a parallelogram with the same base and height.<br><b>Circle graphs:</b> the percents add to \\(100\\%\\) and the central angles add to \\(360^{\\circ}\\).<br><b>Building and reading circle graphs:</b> central angle \\(= \\frac{\\text{percent}}{100} \\times 360^{\\circ}\\); quantity in a sector \\(= \\frac{\\text{percent}}{100} \\times \\text{total surveyed}\\).",
    "5": "<b>Adding fractions with like denominators:</b> add the numerators and keep the denominator, e.g. \\(\\frac{a}{d} + \\frac{b}{d} = \\frac{a+b}{d}\\).<br><b>Common denominator:</b> use the least common multiple of the denominators; rewrite each fraction by multiplying its numerator and denominator by the same factor.<br><b>Adding or subtracting fractions with unlike denominators:</b> rewrite both fractions over a common denominator first, then add or subtract the numerators.<br><b>Lowest terms:</b> divide the numerator and the denominator by their greatest common factor; a fraction is in lowest terms when the only common factor is 1.<br><b>Mixed numbers:</b> add or subtract the whole numbers and the fraction parts separately; if the fraction parts add past one whole, regroup; if a fraction part is too small to subtract from, regroup one whole into fraction parts.<br><b>Modelling with strips or circles:</b> one whole is split into equal parts; shaded parts show a fraction, and crossed-out shaded parts are taken away.<br><b>Checking reasonableness:</b> compare with benchmarks \\(0\\), \\(\\frac{1}{2}\\) and \\(1\\); a sum of two positive amounts is larger than each amount, and a difference is smaller than the starting amount.<br><b>Improper fractions and mixed numbers:</b> \\(\\frac{7}{4} = 1\\frac{3}{4}\\); to write a mixed number as an improper fraction, multiply the whole by the denominator and add the numerator.",
    "6": "<b>Preservation of equality:</b> an equation stays balanced when the same operation is done to both sides; the new equation is equivalent and has the same solution.<br><b>Inverse operations:</b> addition is undone by subtraction, subtraction by addition, multiplication by division, and division by multiplication.<br><b>One-step equations \\(x + a = b\\):</b> subtract \\(a\\) from both sides, giving \\(x = b - a\\); for \\(x - a = b\\), add \\(a\\) to both sides.<br><b>Two-step equations \\(ax + b = c\\):</b> undo in reverse order: subtract \\(b\\) from both sides, then divide both sides by \\(a\\); for \\(ax - b = c\\), add \\(b\\) first, then divide by \\(a\\).<br><b>Equations \\(ax = b\\) and \\(\\frac{x}{a} = b\\):</b> divide both sides by \\(a\\) for the first; multiply both sides by \\(a\\) for the second.<br><b>Modelling a problem:</b> name the unknown, then write the fixed amount plus the per-unit amount times the unknown equal to the total.<br><b>Verifying a solution:</b> substitute the value for the variable in the original equation; the value is a solution only if the two sides are equal.<br><b>Solving by inspection and trial:</b> inspection finds the value that makes the equation true; systematic trial tests values in order and uses each result to narrow the search.",
    "7": "<b>Mean:</b> add all the values and divide by how many values there are.<br><b>Median:</b> the middle value of an ordered list; for an even count, average the two middle values.<br><b>Mode:</b> the value that appears most often; a set may have no mode or more than one mode.<br><b>Range:</b> largest value minus smallest value.<br><b>Choosing a measure:</b> use the mode for the most frequent item or category, the median when an outlier would pull the mean, and the mean when every value should count equally.<br><b>Outliers:</b> values far from the main cluster; they pull the mean strongly and the median only slightly.<br><b>Probability:</b> \\(P = \\frac{\\text{favourable outcomes}}{\\text{total possible outcomes}}\\); probability 0 means impossible and probability 1 (100%) means certain.<br><b>Two independent events:</b> multiply the outcome counts to get the size of the sample space; the result of one event does not change the other.<br><b>Experimental probability:</b> \\(\\frac{\\text{times the outcome occurred}}{\\text{number of trials}}\\); the expected count in an experiment is the theoretical probability times the number of trials.",
    "8": "<b>Parallel segments:</b> never meet and stay the same distance apart.<br><b>Perpendicular segments:</b> meet at \\(90^\\circ\\).<br><b>Perpendicular bisector:</b> a line that cuts a segment into two equal parts at \\(90^\\circ\\); every point on it is the same distance from the segment's two endpoints.<br><b>Angle bisector:</b> a ray from the vertex that splits an angle into two equal angles.<br><b>Cartesian plane:</b> the horizontal axis is the \\(x\\)-axis, the vertical axis is the \\(y\\)-axis, and they cross at the origin \\((0, 0)\\).<br><b>Ordered pairs:</b> \\((x, y)\\) means \\(x\\) units across from the origin, then \\(y\\) units up (negative values go left or down). Quadrants by signs: I \\((+, +)\\), II \\((-, +)\\), III \\((-, -)\\), IV \\((+, -)\\).<br><b>Distance on grid lines:</b> for points on the same horizontal line, subtract the \\(x\\)-coordinates; on the same vertical line, subtract the \\(y\\)-coordinates.<br><b>Translations:</b> add the horizontal move to \\(x\\) and the vertical move to \\(y\\) (left and down moves are negative).<br><b>Reflections:</b> across the \\(x\\)-axis, \\((x, y)\\) becomes \\((x, -y)\\); across the \\(y\\)-axis, \\((x, y)\\) becomes \\((-x, y)\\)."
}
  }
};
