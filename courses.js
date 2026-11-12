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
}
};
