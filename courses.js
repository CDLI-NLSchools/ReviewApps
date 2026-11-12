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
  listed: false,

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
  listed: false,

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
  listed: false,

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
}
};
