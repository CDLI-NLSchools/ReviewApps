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
  subject: "Physics",
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
  subject: "Physics",
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

"chem-3202": {
  id: "chem-3202",
  title: "Chemistry 3202 Review: Practice Question Bank",
  shortName: "Chemistry 3202",
  storagePrefix: "c3202",
  reportName: "Chemistry 3202",
  language: "en",
  bankFile: "chem-3202.js",
  subject: "Chemistry",
  grade: 12,
  listed: false,

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
  listed: false,

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
}
};
