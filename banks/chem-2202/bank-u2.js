// Chemistry 2202 Unit 2 bank: From Structures to Properties.
// Phase C diagram figures (Nov 2026): u2-03 and u2-07 attach an original
// Lewis structure figure (chemLewisFigure in bank-helpers.js) for every
// drawn molecule except sulfur dioxide and sulfur trioxide, whose
// resonance depiction is left for the SME pass; one u2-35 variant (the
// stem that says a diagram shows a shifted ionic lattice layer) attaches
// the generic shifted lattice figure. No other Unit 2 entry carries a
// figure: the remaining stems either state their structure in full in
// words or ask for a prediction, so no source diagram is missing.
// CRMARKS: u2-02=2
// CRMARKS: u2-03=3
// CRMARKS: u2-07=2
// CRMARKS: u2-08=2
// CRMARKS: u2-23=2
// CRMARKS: u2-26=3
// CRMARKS: u2-27=2
// CRMARKS: u2-29=2
// CRMARKS: u2-51=2
// CRMARKS: u2-52=2
// CRMARKS: u2-53=3

// 6.1 Formation of covalent bonds
E("u2-01", 2, ["6.1"], 1, "gen", function () {
  var ex = [
    { m: "H₂", b: "H-H", t: "single", p: 1 }, { m: "Cl₂", b: "Cl-Cl", t: "single", p: 1 },
    { m: "Br₂", b: "Br-Br", t: "single", p: 1 }, { m: "F₂", b: "F-F", t: "single", p: 1 },
    { m: "HCl", b: "H-Cl", t: "single", p: 1 }, { m: "H₂O", b: "O-H", t: "single", p: 1 },
    { m: "NH₃", b: "N-H", t: "single", p: 1 }, { m: "CH₄", b: "C-H", t: "single", p: 1 },
    { m: "O₂", b: "O=O", t: "double", p: 2 }, { m: "CO₂", b: "C=O", t: "double", p: 2 },
    { m: "C₂H₄", b: "C=C", t: "double", p: 2 }, { m: "SO₂", b: "S=O", t: "double", p: 2 },
    { m: "CH₂O", b: "C=O", t: "double", p: 2 }, { m: "CS₂", b: "C=S", t: "double", p: 2 },
    { m: "N₂", b: "N≡N", t: "triple", p: 3 }, { m: "C₂H₂", b: "C≡C", t: "triple", p: 3 },
    { m: "HCN", b: "C≡N", t: "triple", p: 3 }, { m: "CO", b: "C≡O", t: "triple", p: 3 }
  ];
  var e = pick(ex), q = pick([0, 1, 2]), ans, prompt;
  if (q === 0) { ans = e.p; prompt = "In the " + e.b + " bond in " + e.m + ", how many pairs of electrons are shared between the two atoms?"; }
  else if (q === 1) { ans = 2 * e.p; prompt = "In the " + e.b + " bond in " + e.m + ", how many electrons are shared between the two atoms in total?"; }
  else { ans = e.p; prompt = "The " + e.b + " bond in " + e.m + " is a " + e.t + " bond. What is its bond order?"; }
  var ds = [], offs = [1, -1, 2, 3], oi = 0;
  while (ds.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds.indexOf(String(v)) < 0) ds.push(String(v)); }
  return mcq(prompt, String(ans), ds, "A single bond shares 1 pair of electrons, a double bond shares 2 pairs and a triple bond shares 3 pairs. Each shared pair contains 2 electrons, and the bond order equals the number of shared pairs. The bond shown is a " + e.t + " bond, so the answer is " + ans + ".", { mol: e.m, bond: e.t, ask: q });
});

E("u2-02", 2, ["6.1"], 2, "gen", function () {
  var ms = [
    { f: "H₂O", v: 8 }, { f: "NH₃", v: 8 }, { f: "CH₄", v: 8 }, { f: "CO₂", v: 16 },
    { f: "BF₃", v: 24 }, { f: "PCl₃", v: 26 }, { f: "H₂S", v: 8 }, { f: "BeCl₂", v: 16 },
    { f: "HCl", v: 8 }, { f: "F₂", v: 14 }, { f: "O₂", v: 12 }, { f: "N₂", v: 10 },
    { f: "CH₂O", v: 12 }, { f: "CCl₄", v: 32 }, { f: "SO₂", v: 18 }, { f: "NF₃", v: 26 }
  ];
  var m = pick(ms), k = pick([1, 2, 3, 4, 5]), ans = m.v * k;
  return numq("How many valence electrons are there in total in " + k + (k === 1 ? " molecule" : " molecules") + " of " + m.f + "? Give the number of electrons.", ans, 0.1, "Add the valence electrons of every atom in one molecule of " + m.f + ", counting each atom once for every time it appears in the formula. One molecule has " + m.v + " valence electrons. For " + k + (k === 1 ? " molecule" : " molecules") + " the total is " + m.v + " x " + k + " = " + ans + " electrons.", { mol: m.f, k: k });
});

E("u2-03", 2, ["6.1"], 2, "gen", function () {
  var ms = [
    { f: "H₂O", bp: 2 }, { f: "NH₃", bp: 3 }, { f: "CH₄", bp: 4 }, { f: "CO₂", bp: 4 },
    { f: "BF₃", bp: 3 }, { f: "PCl₃", bp: 3 }, { f: "H₂S", bp: 2 }, { f: "BeCl₂", bp: 2 },
    { f: "HCl", bp: 1 }, { f: "F₂", bp: 1 }, { f: "O₂", bp: 2 }, { f: "N₂", bp: 3 },
    { f: "CH₂O", bp: 4 }, { f: "CCl₄", bp: 4 }, { f: "SO₂", bp: 3 }, { f: "NF₃", bp: 3 }
  ];
  var m = pick(ms), k = pick([1, 2, 3, 4, 5]), mode = pick([0, 1]), ans = mode === 0 ? m.bp * k : 2 * m.bp * k;
  var prompt = mode === 0
    ? "Using the usual Lewis structure of " + m.f + ", how many bonding pairs of electrons are there in total in " + k + (k === 1 ? " molecule" : " molecules") + " of the substance? Count a double bond as 2 bonding pairs and a triple bond as 3 bonding pairs."
    : "Using the usual Lewis structure of " + m.f + ", how many bonding electrons are there in total in " + k + (k === 1 ? " molecule" : " molecules") + " of the substance? Count a double bond as 4 bonding electrons and a triple bond as 6 bonding electrons.";
  var q = numq(prompt, ans, 0.1, "In the Lewis structure of " + m.f + " the bonds contain " + m.bp + " bonding pairs in one molecule, and each pair holds 2 electrons. " + (mode === 0 ? "For " + k + (k === 1 ? " molecule" : " molecules") + " the total is " + m.bp + " x " + k + " = " + ans + " bonding pairs." : "One molecule has 2 x " + m.bp + " = " + (2 * m.bp) + " bonding electrons, so " + k + (k === 1 ? " molecule has" : " molecules have") + " " + (2 * m.bp) + " x " + k + " = " + ans + " bonding electrons."), { mol: m.f, k: k, mode: mode });
  var lf = chemLewisFigure(m.f); if (lf) q.figure = lf;
  return q;
});

E("u2-04", 2, ["6.1"], 1, "gen", function () {
  var cs = [
    { a: "carbon", mol: "CH₄", cap: 4, val: 4 }, { a: "carbon", mol: "CO₂", cap: 4, val: 4 },
    { a: "carbon", mol: "CCl₄", cap: 4, val: 4 }, { a: "carbon", mol: "CH₂O", cap: 4, val: 4 },
    { a: "nitrogen", mol: "NH₃", cap: 3, val: 5 }, { a: "nitrogen", mol: "NF₃", cap: 3, val: 5 },
    { a: "nitrogen", mol: "NCl₃", cap: 3, val: 5 }, { a: "oxygen", mol: "H₂O", cap: 2, val: 6 },
    { a: "oxygen", mol: "CO₂", cap: 2, val: 6 }, { a: "oxygen", mol: "SO₂", cap: 2, val: 6 },
    { a: "hydrogen", mol: "H₂O", cap: 1, val: 1 }, { a: "hydrogen", mol: "CH₄", cap: 1, val: 1 },
    { a: "hydrogen", mol: "HCl", cap: 1, val: 1 }, { a: "fluorine", mol: "NF₃", cap: 1, val: 7 },
    { a: "fluorine", mol: "BF₃", cap: 1, val: 7 }, { a: "chlorine", mol: "PCl₃", cap: 1, val: 7 },
    { a: "chlorine", mol: "CCl₄", cap: 1, val: 7 }, { a: "boron", mol: "BF₃", cap: 3, val: 3 },
    { a: "sulfur", mol: "H₂S", cap: 2, val: 6 }, { a: "phosphorus", mol: "PCl₃", cap: 3, val: 5 },
    { a: "silicon", mol: "SiH₄", cap: 4, val: 4 }, { a: "silicon", mol: "SiCl₄", cap: 4, val: 4 },
    { a: "bromine", mol: "HBr", cap: 1, val: 7 }, { a: "oxygen", mol: "CH₂O", cap: 2, val: 6 }
  ];
  var c = pick(cs), q = pick([0, 1, 2]), ans, prompt;
  if (q === 0) { ans = c.cap; prompt = "In " + c.mol + ", how many covalent bonds does a neutral " + c.a + " atom typically form?"; }
  else if (q === 1) { ans = c.val; prompt = "How many valence electrons does a neutral " + c.a + " atom have, as used in the molecule " + c.mol + "?"; }
  else { ans = 2 * c.cap; prompt = "A neutral " + c.a + " atom in " + c.mol + " forms its usual number of covalent bonds. How many shared electrons take part in those bonds, counting 2 electrons for each bond formed by this atom?"; }
  var ds = [], offs = [1, -1, 2, -2, 3], oi = 0;
  while (ds.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds.indexOf(String(v)) < 0) ds.push(String(v)); }
  return mcq(prompt, String(ans), ds, "A neutral " + c.a + " atom has " + c.val + " valence electrons and typically forms " + c.cap + " covalent bond or bonds so that it reaches a stable outer shell. Each bond it forms contains 2 shared electrons, giving " + (2 * c.cap) + " shared electrons in its own bonds. The value asked for is " + ans + ".", { atom: c.a, mol: c.mol, ask: q });
});

E("u2-05", 2, ["6.1"], 2, "gen", function () {
  var ex = [
    { m: "H₂", b: "H-H", t: "single", p: 1 }, { m: "Cl₂", b: "Cl-Cl", t: "single", p: 1 },
    { m: "CH₄", b: "C-H", t: "single", p: 1 }, { m: "H₂O", b: "O-H", t: "single", p: 1 },
    { m: "Br₂", b: "Br-Br", t: "single", p: 1 }, { m: "NH₃", b: "N-H", t: "single", p: 1 },
    { m: "O₂", b: "O=O", t: "double", p: 2 }, { m: "CO₂", b: "C=O", t: "double", p: 2 },
    { m: "C₂H₄", b: "C=C", t: "double", p: 2 }, { m: "SO₂", b: "S=O", t: "double", p: 2 },
    { m: "CH₂O", b: "C=O", t: "double", p: 2 }, { m: "CS₂", b: "C=S", t: "double", p: 2 },
    { m: "N₂", b: "N≡N", t: "triple", p: 3 }, { m: "C₂H₂", b: "C≡C", t: "triple", p: 3 },
    { m: "HCN", b: "C≡N", t: "triple", p: 3 }, { m: "CO", b: "C≡O", t: "triple", p: 3 },
    { m: "F₂", b: "F-F", t: "single", p: 1 }, { m: "HBr", b: "H-Br", t: "single", p: 1 }
  ];
  var e = pick(ex), q = pick([0, 1, 2]);
  if (q === 2) {
    var correct = e.t === "single" ? "It is the weakest and longest of the three bond types between the same two atoms"
      : e.t === "double" ? "It is stronger and shorter than a single bond but weaker and longer than a triple bond between the same two atoms"
      : "It is the strongest and shortest of the three bond types between the same two atoms";
    var all = [
      "It is the weakest and longest of the three bond types between the same two atoms",
      "It is stronger and shorter than a single bond but weaker and longer than a triple bond between the same two atoms",
      "It is the strongest and shortest of the three bond types between the same two atoms",
      "Its strength and length are the same as every other bond type between the same two atoms"
    ];
    var ds = shuffle(all.filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Consider the " + e.b + " bond in " + e.m + ", which is a " + e.t + " bond. Which statement about this bond is correct?", correct, ds, "Adding shared pairs pulls the two nuclei closer and holds them more strongly. A single bond has 1 shared pair, a double bond has 2 and a triple bond has 3, so going from single to double to triple the bond gets stronger and shorter. The bond in " + e.m + " is a " + e.t + " bond.", { mol: e.m, bond: e.t });
  }
  var ans = q === 0 ? e.p : 2 * e.p;
  var prompt = q === 0 ? "The " + e.b + " bond in " + e.m + " is a " + e.t + " bond. How many shared pairs does it contain?"
    : "The " + e.b + " bond in " + e.m + " is a " + e.t + " bond. How many shared electrons does it contain?";
  var ds2 = [], offs = [1, -1, 2, 3], oi = 0;
  while (ds2.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds2.indexOf(String(v)) < 0) ds2.push(String(v)); }
  return mcq(prompt, String(ans), ds2, "A single bond contains 1 shared pair, a double bond contains 2 shared pairs and a triple bond contains 3 shared pairs. Each pair is 2 electrons. The " + e.t + " bond in " + e.m + " therefore contains " + e.p + " shared pair or pairs, which is " + (2 * e.p) + " shared electrons.", { mol: e.m, bond: e.t, ask: q });
});

E("u2-06", 2, ["6.1"], 3, "gen", function () {
  var sc = [
    { m: "BF₃", c: "boron", n: 6, k: "an incomplete octet" }, { m: "BCl₃", c: "boron", n: 6, k: "an incomplete octet" },
    { m: "BeCl₂", c: "beryllium", n: 4, k: "an incomplete octet" }, { m: "BeH₂", c: "beryllium", n: 4, k: "an incomplete octet" },
    { m: "PCl₅", c: "phosphorus", n: 10, k: "an expanded octet" }, { m: "SF₆", c: "sulfur", n: 12, k: "an expanded octet" },
    { m: "SF₄", c: "sulfur", n: 10, k: "an expanded octet" }, { m: "PF₅", c: "phosphorus", n: 10, k: "an expanded octet" },
    { m: "ClF₃", c: "chlorine", n: 10, k: "an expanded octet" }, { m: "XeF₄", c: "xenon", n: 12, k: "an expanded octet" },
    { m: "H₂", c: "hydrogen", n: 2, k: "a duet" }, { m: "HCl", c: "hydrogen", n: 2, k: "a duet" },
    { m: "CH₄", c: "hydrogen", n: 2, k: "a duet" }, { m: "NO", c: "the molecule as a whole", n: 11, k: "an odd number of valence electrons" },
    { m: "NO₂", c: "the molecule as a whole", n: 17, k: "an odd number of valence electrons" }, { m: "ClO₂", c: "the molecule as a whole", n: 19, k: "an odd number of valence electrons" },
    { m: "H₂O", c: "oxygen", n: 8, k: "a complete octet" }, { m: "NH₃", c: "nitrogen", n: 8, k: "a complete octet" },
    { m: "BBr₃", c: "boron", n: 6, k: "an incomplete octet" }, { m: "BH₃", c: "boron", n: 6, k: "an incomplete octet" },
    { m: "AlCl₃", c: "aluminium", n: 6, k: "an incomplete octet" }, { m: "XeF₂", c: "xenon", n: 10, k: "an expanded octet" },
    { m: "BrF₅", c: "bromine", n: 12, k: "an expanded octet" }, { m: "ClO", c: "the molecule as a whole", n: 13, k: "an odd number of valence electrons" },
    { m: "H₂S", c: "sulfur", n: 8, k: "a complete octet" }, { m: "PH₃", c: "phosphorus", n: 8, k: "a complete octet" }
  ];
  var s = pick(sc), q = pick([0, 1]);
  if (q === 0) {
    var kinds = ["an incomplete octet", "an expanded octet", "a duet", "an odd number of valence electrons", "a complete octet"];
    var ds = shuffle(kinds.filter(function (x) { return x !== s.k; })).slice(0, 3);
    return mcq("In the usual Lewis structure of " + s.m + ", the central case to examine is " + s.c + ". How does this case relate to the octet rule?", s.k, ds, "Count the electrons around the atom named, or count the total valence electrons when the molecule itself is named. In " + s.m + " the count is " + s.n + ", which is described as " + s.k + ". Most atoms in this course follow the octet rule, but incomplete octets, expanded octets, duets for hydrogen and odd electron molecules are recognised exceptions or special cases.", { mol: s.m, kind: s.k });
  }
  var ds2 = [], offs = [2, -2, 4, -4, 1], oi = 0;
  while (ds2.length < 3 && oi < offs.length) { var v = s.n + offs[oi++]; if (v > 0 && v !== s.n && ds2.indexOf(String(v)) < 0) ds2.push(String(v)); }
  return mcq("In the usual Lewis structure of " + s.m + ", how many electrons are counted for " + s.c + " in the statement of its octet rule case?", String(s.n), ds2, "Draw or recall the Lewis structure of " + s.m + " and count every bonding pair and lone pair electron assigned to " + s.c + ". The count is " + s.n + ", which corresponds to " + s.k + ".", { mol: s.m, n: s.n });
});

// 6.2 Structural model of a molecular substance: electron pairs
E("u2-07", 2, ["6.2"], 2, "gen", function () {
  var ms = [
    { f: "H₂O", bp: 2, lp: 2 }, { f: "NH₃", bp: 3, lp: 1 }, { f: "CH₄", bp: 4, lp: 0 },
    { f: "CO₂", bp: 4, lp: 0 }, { f: "BF₃", bp: 3, lp: 0 }, { f: "PCl₃", bp: 3, lp: 1 },
    { f: "H₂S", bp: 2, lp: 2 }, { f: "BeCl₂", bp: 2, lp: 0 }, { f: "SO₃", bp: 4, lp: 0 },
    { f: "CCl₄", bp: 4, lp: 0 }, { f: "CH₂O", bp: 4, lp: 0 }, { f: "NH₄⁺", bp: 4, lp: 0 },
    { f: "H₃O⁺", bp: 3, lp: 1 }
  ];
  var m = pick(ms), k = pick([1, 2, 3, 4]), q = pick([0, 1, 2]);
  var per = q === 0 ? m.bp : q === 1 ? m.lp : m.bp + m.lp, ans = per * k;
  var what = q === 0 ? "bonding pairs on the central atom" : q === 1 ? "lone pairs on the central atom" : "electron pairs in total on the central atom, bonding pairs and lone pairs together";
  var qq = numq("For " + k + (k === 1 ? " molecule or ion" : " molecules or ions") + " of " + m.f + ", how many " + what + " are there in total? Count each double bond as 2 bonding pairs.", ans, 0.1, "On the central atom of " + m.f + " there are " + m.bp + " bonding pairs and " + m.lp + " lone pairs, so the count asked for in one particle is " + per + ". Multiplying by " + k + " gives " + per + " x " + k + " = " + ans + ".", { mol: m.f, k: k, ask: q });
  var lf = chemLewisFigure(m.f); if (lf) qq.figure = lf;
  return qq;
});

E("u2-08", 2, ["6.2"], 2, "gen", function () {
  var names = { "linear": ["linear"], "trigonal planar": ["trigonal planar"], "tetrahedral": ["tetrahedral"], "bent": ["bent", "angular"], "trigonal pyramidal": ["trigonal pyramidal", "pyramidal"], "trigonal bipyramidal": ["trigonal bipyramidal"] };
  var geoOf = function (r) { return r === 2 ? "linear" : r === 3 ? "trigonal planar" : r === 4 ? "tetrahedral" : "trigonal bipyramidal"; };
  var shapeOf = function (r, lp) {
    if (r === 2) return "linear"; if (r === 3) return lp === 0 ? "trigonal planar" : "bent";
    if (r === 4) return lp === 0 ? "tetrahedral" : lp === 1 ? "trigonal pyramidal" : "bent";
    return "trigonal bipyramidal";
  };
  var askGeo = pick([true, false]);
  if (pick([0, 1]) === 0) {
    var ms = [
      { f: "H₂O", br: 2, lp: 2 }, { f: "NH₃", br: 3, lp: 1 }, { f: "CH₄", br: 4, lp: 0 },
      { f: "CO₂", br: 2, lp: 0 }, { f: "BF₃", br: 3, lp: 0 }, { f: "PCl₃", br: 3, lp: 1 },
      { f: "H₂S", br: 2, lp: 2 }, { f: "BeCl₂", br: 2, lp: 0 }, { f: "SO₂", br: 2, lp: 1 },
      { f: "SO₃", br: 3, lp: 0 }, { f: "CH₂O", br: 3, lp: 0 }, { f: "CCl₄", br: 4, lp: 0 },
      { f: "NH₄⁺", br: 4, lp: 0 }, { f: "H₃O⁺", br: 3, lp: 1 }, { f: "CO₃²⁻", br: 3, lp: 0 },
      { f: "SiH₄", br: 4, lp: 0 }, { f: "PH₃", br: 3, lp: 1 }, { f: "SCl₂", br: 2, lp: 2 },
      { f: "AlCl₃", br: 3, lp: 0 }, { f: "CHCl₃", br: 4, lp: 0 }
    ];
    var m = pick(ms), r = m.br + m.lp;
    var ans = askGeo ? geoOf(r) : shapeOf(m.br, m.lp);
    var prompt = askGeo ? "What is the electron pair geometry of " + m.f + "? Give the name only."
      : "What is the molecular shape of " + m.f + "? Give the name only.";
    return textq(prompt, names[ans], "The central atom of " + m.f + " has " + m.br + " bonding regions and " + m.lp + " lone pair or pairs, giving " + r + " electron regions in total. The electron pair geometry for " + r + " regions is " + geoOf(r) + ". Ignoring the lone pairs and looking only at the atoms gives the shape " + shapeOf(m.br, m.lp) + ". The name asked for is " + ans + ".", { mol: m.f, geo: askGeo });
  }
  var combos = [[2, 0], [3, 0], [3, 1], [4, 0], [4, 1], [4, 2], [5, 0]];
  var c = pick(combos), br = c[0], lp = c[1], rr = br + lp;
  var ans2 = askGeo ? geoOf(rr) : shapeOf(br, lp);
  var prompt2 = "A central atom has " + br + " bonding regions and " + lp + " lone pair or pairs. " + (askGeo ? "What is its electron pair geometry? Give the name only." : "What is the molecular shape around it? Give the name only.");
  return textq(prompt2, names[ans2], "The total number of electron regions is " + br + " + " + lp + " = " + rr + ", so the electron pair geometry is " + geoOf(rr) + ". The shape is found from the positions of the atoms only, with lone pairs left out of the name, which gives " + shapeOf(br, lp) + ". The name asked for is " + ans2 + ".", { br: br, lp: lp, geo: askGeo });
});

E("u2-09", 2, ["6.2"], 1, "gen", function () {
  var ms = [
    { f: "H₂O", br: 2, lp: 2 }, { f: "NH₃", br: 3, lp: 1 }, { f: "CH₄", br: 4, lp: 0 },
    { f: "CO₂", br: 2, lp: 0 }, { f: "BF₃", br: 3, lp: 0 }, { f: "PCl₃", br: 3, lp: 1 },
    { f: "H₂S", br: 2, lp: 2 }, { f: "BeCl₂", br: 2, lp: 0 }, { f: "SO₂", br: 2, lp: 1 },
    { f: "SO₃", br: 3, lp: 0 }, { f: "CH₂O", br: 3, lp: 0 }, { f: "CCl₄", br: 4, lp: 0 },
    { f: "NH₄⁺", br: 4, lp: 0 }, { f: "H₃O⁺", br: 3, lp: 1 }, { f: "CO₃²⁻", br: 3, lp: 0 },
    { f: "SiH₄", br: 4, lp: 0 }, { f: "PH₃", br: 3, lp: 1 }, { f: "SCl₂", br: 2, lp: 2 },
    { f: "AlCl₃", br: 3, lp: 0 }, { f: "CHCl₃", br: 4, lp: 0 }
  ];
  var m = pick(ms), q = pick([0, 1, 2]);
  var ans = q === 0 ? m.br + m.lp : q === 1 ? m.br : m.lp;
  var what = q === 0 ? "steric number of the central atom" : q === 1 ? "number of bonding regions on the central atom" : "number of lone pairs on the central atom";
  var ds = [], offs = [1, -1, 2, 3], oi = 0;
  while (ds.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds.indexOf(String(v)) < 0) ds.push(String(v)); }
  return mcq("For " + m.f + ", what is the " + what + "? Count a double bond as one bonding region.", String(ans), ds, "The central atom of " + m.f + " has " + m.br + " bonding regions and " + m.lp + " lone pair or pairs. The steric number is bonding regions plus lone pairs, which is " + m.br + " + " + m.lp + " = " + (m.br + m.lp) + ". The value asked for is " + ans + ".", { mol: m.f, ask: q });
});

E("u2-10", 2, ["6.2"], 2, "gen", function () {
  var ms = [
    { f: "H₂O", g: "tetrahedral", s: "bent" }, { f: "NH₃", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "CH₄", g: "tetrahedral", s: "tetrahedral" }, { f: "CO₂", g: "linear", s: "linear" },
    { f: "BF₃", g: "trigonal planar", s: "trigonal planar" }, { f: "PCl₃", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "H₂S", g: "tetrahedral", s: "bent" }, { f: "BeCl₂", g: "linear", s: "linear" },
    { f: "SO₂", g: "trigonal planar", s: "bent" }, { f: "SO₃", g: "trigonal planar", s: "trigonal planar" },
    { f: "CH₂O", g: "trigonal planar", s: "trigonal planar" }, { f: "CCl₄", g: "tetrahedral", s: "tetrahedral" },
    { f: "NH₄⁺", g: "tetrahedral", s: "tetrahedral" }, { f: "H₃O⁺", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "SiH₄", g: "tetrahedral", s: "tetrahedral" }, { f: "PH₃", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "SCl₂", g: "tetrahedral", s: "bent" }, { f: "CHCl₃", g: "tetrahedral", s: "tetrahedral" },
    { f: "H₂Se", g: "tetrahedral", s: "bent" }, { f: "OF₂", g: "tetrahedral", s: "bent" },
    { f: "NF₃", g: "tetrahedral", s: "trigonal pyramidal" }, { f: "CH₂Cl₂", g: "tetrahedral", s: "tetrahedral" },
    { f: "SO₃²⁻", g: "tetrahedral", s: "trigonal pyramidal" }, { f: "ClO₃⁻", g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "BF₄⁻", g: "tetrahedral", s: "tetrahedral" }, { f: "CO₃²⁻", g: "trigonal planar", s: "trigonal planar" }
  ];
  var allNames = ["linear", "trigonal planar", "tetrahedral", "bent", "trigonal pyramidal", "trigonal bipyramidal"];
  var m = pick(ms), q = pick([0, 1, 2]);
  if (q === 2 && m.g !== m.s) {
    var correct = "The electron pair geometry is " + m.g + " and the molecular shape is " + m.s;
    var cand = [
      "The electron pair geometry is " + m.s + " and the molecular shape is " + m.g,
      "The electron pair geometry is " + m.g + " and the molecular shape is " + m.g,
      "The electron pair geometry is " + m.s + " and the molecular shape is " + m.s,
      "The electron pair geometry and the molecular shape are both found by ignoring all lone pairs"
    ];
    var ds = shuffle(cand.filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Which statement correctly distinguishes the two descriptions for " + m.f + "?", correct, ds, "Electron pair geometry counts every electron region around the central atom, including lone pairs. Molecular shape describes only where the atoms sit, so lone pairs change the shape name without being part of it. For " + m.f + " the geometry is " + m.g + " and the shape is " + m.s + ".", { mol: m.f });
  }
  var ans = q === 0 ? m.g : m.s;
  var ds2 = shuffle(allNames.filter(function (x) { return x !== ans; })).slice(0, 3);
  var prompt = q === 0 ? "What is the electron pair geometry of " + m.f + "?" : "What is the molecular shape of " + m.f + "?";
  return mcq(prompt, ans, ds2, "Count all electron regions on the central atom of " + m.f + ", including lone pairs, to get the electron pair geometry, which is " + m.g + ". Then describe only the positions of the atoms to get the molecular shape, which is " + m.s + ". The description asked for is " + ans + ".", { mol: m.f, ask: q });
});

E("u2-11", 2, ["6.2"], 3, "gen", function () {
  var ms = [
    { f: "SiH₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" }, { f: "GeH₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" },
    { f: "PH₃", br: 3, lp: 1, g: "tetrahedral", s: "trigonal pyramidal" }, { f: "AsH₃", br: 3, lp: 1, g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "SCl₂", br: 2, lp: 2, g: "tetrahedral", s: "bent" }, { f: "SeH₂", br: 2, lp: 2, g: "tetrahedral", s: "bent" },
    { f: "OCl₂", br: 2, lp: 2, g: "tetrahedral", s: "bent" }, { f: "AlBr₃", br: 3, lp: 0, g: "trigonal planar", s: "trigonal planar" },
    { f: "GaCl₃", br: 3, lp: 0, g: "trigonal planar", s: "trigonal planar" }, { f: "SiCl₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" },
    { f: "CBr₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" }, { f: "NCl₃", br: 3, lp: 1, g: "tetrahedral", s: "trigonal pyramidal" },
    { f: "BH₃", br: 3, lp: 0, g: "trigonal planar", s: "trigonal planar" }, { f: "SnCl₂", br: 2, lp: 1, g: "trigonal planar", s: "bent" },
    { f: "TeH₂", br: 2, lp: 2, g: "tetrahedral", s: "bent" }, { f: "CF₄", br: 4, lp: 0, g: "tetrahedral", s: "tetrahedral" },
    { f: "SbH₃", br: 3, lp: 1, g: "tetrahedral", s: "trigonal pyramidal" }, { f: "InCl₃", br: 3, lp: 0, g: "trigonal planar", s: "trigonal planar" }
  ];
  var allNames = ["linear", "trigonal planar", "tetrahedral", "bent", "trigonal pyramidal", "trigonal bipyramidal"];
  var m = pick(ms), q = pick([0, 1, 2]);
  if (q === 2) {
    var ans = m.br + m.lp, ds = [], offs = [1, -1, 2, 3], oi = 0;
    while (ds.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v >= 0 && v !== ans && ds.indexOf(String(v)) < 0) ds.push(String(v)); }
    return mcq("Predict the steric number of the central atom in " + m.f + ", a molecule you may not have studied directly. Count a multiple bond as one region.", String(ans), ds, "The central atom of " + m.f + " is in the same family pattern as the familiar examples: it has " + m.br + " bonding regions and " + m.lp + " lone pair or pairs. The steric number is " + m.br + " + " + m.lp + " = " + ans + ", which then predicts its geometry and shape.", { mol: m.f });
  }
  var ans2 = q === 0 ? m.s : m.g;
  var ds2 = shuffle(allNames.filter(function (x) { return x !== ans2; })).slice(0, 3);
  var prompt = q === 0 ? "Predict the molecular shape of " + m.f + ", a molecule you may not have studied directly." : "Predict the electron pair geometry of " + m.f + ", a molecule you may not have studied directly.";
  return mcq(prompt, ans2, ds2, "Transfer the model from familiar molecules with the same central atom pattern. The central atom of " + m.f + " has " + m.br + " bonding regions and " + m.lp + " lone pair or pairs. Its electron pair geometry is " + m.g + " and, looking only at the atoms, its shape is " + m.s + ". The description asked for is " + ans2 + ".", { mol: m.f, ask: q });
});

// 6.3 Hydrogen bonds and van der Waals forces
E("u2-12", 2, ["6.3"], 1, "gen", function () {
  var donors = [
    { f: "H₂O", el: "oxygen" }, { f: "HF", el: "fluorine" }, { f: "NH₃", el: "nitrogen" },
    { f: "CH₃OH", el: "oxygen" }, { f: "CH₃NH₂", el: "nitrogen" }, { f: "CH₃CH₂OH", el: "oxygen" },
    { f: "H₂O₂", el: "oxygen" }, { f: "CH₃CH₂NH₂", el: "nitrogen" }, { f: "HOCH₂CH₂OH", el: "oxygen" },
    { f: "NH₂CH₃", el: "nitrogen" }
  ];
  var nons = ["CH₄", "H₂S", "PH₃", "HCl", "CO₂", "SiH₄", "CH₃F", "H₂Se", "C₂H₆", "BF₃"];
  var d = pick(donors), n = pick(nons);
  var correct = d.f + " has a hydrogen atom bonded directly to " + d.el + ", a small and highly electronegative atom, so its molecules can form hydrogen bonds";
  var ds = shuffle([
    n + " has a hydrogen atom bonded directly to a highly electronegative atom, so its molecules can form hydrogen bonds",
    "Both substances form hydrogen bonds because every molecule that contains hydrogen can form them",
    "Neither substance forms hydrogen bonds because hydrogen bonding needs a metal atom to be present",
    d.f + " forms hydrogen bonds because it contains the heaviest atoms of the two substances"
  ].filter(function (x) { return x !== correct; })).slice(0, 3);
  return mcq("Which statement correctly explains the difference in hydrogen bonding between " + d.f + " and " + n + "?", correct, ds, "A hydrogen bond forms when a hydrogen atom bonded to nitrogen, oxygen or fluorine is attracted to a lone pair on nitrogen, oxygen or fluorine in a nearby molecule. In " + d.f + " the hydrogen is bonded to " + d.el + ", which meets the condition. In " + n + " no hydrogen is bonded to nitrogen, oxygen or fluorine, so ordinary hydrogen bonding between its molecules does not occur.", { donor: d.f, other: n });
});

E("u2-13", 2, ["6.3"], 2, "gen", function () {
  var yes = ["H₂O", "HF", "NH₃", "CH₃OH", "CH₃NH₂", "CH₃CH₂OH", "H₂O₂", "CH₃CH₂NH₂", "HOCH₂CH₂OH", "NH₂OH"];
  var no = ["CH₄", "CO₂", "H₂S", "PH₃", "SiH₄", "CCl₄", "O₂", "N₂", "C₂H₆", "BF₃", "SO₂", "CH₃F", "H₂Se", "C₃H₈"];
  var ctx = pick(["in the pure liquid", "as a pure substance", "between its own molecules", "in a sample of the pure compound"]);
  if (pick([true, false])) {
    var c = pick(yes), ds = shuffle(no.slice()).slice(0, 3);
    return mcq("Which substance forms hydrogen bonds " + ctx + "?", c, ds, "Hydrogen bonds form between molecules when a hydrogen atom is bonded to nitrogen, oxygen or fluorine and is attracted to a lone pair on nitrogen, oxygen or fluorine nearby. Of the choices, only " + c + " has hydrogen bonded to nitrogen, oxygen or fluorine. The other substances have no such bond, so they rely on weaker attractions between their molecules.", { substance: c });
  }
  var c2 = pick(no), ds2 = shuffle(yes.slice()).slice(0, 3);
  return mcq("Which substance does NOT form hydrogen bonds " + ctx + "?", c2, ds2, "Hydrogen bonds need a hydrogen atom bonded to nitrogen, oxygen or fluorine. Every other choice has such a bond, so each of them forms hydrogen bonds between its molecules. " + c2 + " has no hydrogen bonded to nitrogen, oxygen or fluorine, so its molecules are held only by weaker attractions.", { substance: c2 });
});

E("u2-14", 2, ["6.3"], 2, "gen", function () {
  var sets = [
    { a: "solid NaCl, held by ionic attractions", b: "liquid H₂O, held in part by hydrogen bonds", c: "solid CH₄, held by London dispersion forces" },
    { a: "molten KBr, held by ionic attractions", b: "liquid NH₃, held in part by hydrogen bonds", c: "liquid C₃H₈, held by London dispersion forces" },
    { a: "solid MgO, held by ionic attractions", b: "liquid HF, held in part by hydrogen bonds", c: "liquid CH₄, held by London dispersion forces" },
    { a: "molten CaCl₂, held by ionic attractions", b: "liquid CH₃OH, held in part by hydrogen bonds", c: "solid CO₂, held by London dispersion forces" },
    { a: "solid KI, held by ionic attractions", b: "liquid H₂O, held in part by hydrogen bonds", c: "liquid Br₂, held by London dispersion forces" },
    { a: "molten NaF, held by ionic attractions", b: "liquid CH₃CH₂OH, held in part by hydrogen bonds", c: "liquid C₂H₆, held by London dispersion forces" }
  ];
  var forceSets = [
    { s: sets[0] }, { s: sets[1] }, { s: sets[2] }, { s: sets[3] }, { s: sets[4] }, { s: sets[5] },
    { s: { a: "a sample where ion to ion attraction acts", b: "a sample where hydrogen bonding acts", c: "a sample where only London dispersion forces act" } },
    { s: { a: "a crystal with attractions between oppositely charged ions", b: "a liquid with attractions between permanent dipoles", c: "a gas with attractions from temporary dipoles only" } },
    { s: { a: "an ionic lattice", b: "a hydrogen bonded liquid", c: "a nonpolar molecular solid" } },
    { s: { a: "a molten ionic compound", b: "a polar liquid with no hydrogen bonding", c: "a nonpolar molecular liquid" } },
    { s: { a: "molten calcium fluoride, held by ionic attractions", b: "liquid propanone, held by dipole to dipole attractions", c: "liquid pentane, held by London dispersion forces" } },
    { s: { a: "solid sodium fluoride, held by ionic attractions", b: "liquid ethanol, held in part by hydrogen bonds", c: "solid iodine, held by London dispersion forces" } },
    { s: { a: "a crystal of an ionic compound", b: "a liquid whose molecules are held by dipole to dipole attractions", c: "a molecular solid held by London dispersion forces" } },
    { s: { a: "an ionic lattice with doubly charged ions", b: "a hydrogen bonded molecular liquid", c: "a nonpolar gas" } }
  ];
  var it = pick(forceSets).s, q = pick([0, 1, 2]);
  var orderSF = it.a + ", then " + it.b + ", then " + it.c;
  var orderWS = it.c + ", then " + it.b + ", then " + it.a;
  if (q === 2) {
    var opts = [orderSF, orderWS, it.b + ", then " + it.a + ", then " + it.c, it.a + ", then " + it.c + ", then " + it.b];
    var rev = pick([true, false]);
    var correct = rev ? orderWS : orderSF;
    var ds = shuffle(opts.filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Which list puts the three cases in order from " + (rev ? "weakest attraction to strongest attraction" : "strongest attraction to weakest attraction") + "? The cases are: (1) " + it.a + "; (2) " + it.b + "; (3) " + it.c + ".", correct, ds, "Attractions between ions are generally the strongest of these, because full charges attract. Hydrogen bonds and other dipole attractions between molecules are weaker than ion to ion attraction but stronger than London dispersion forces, which come only from temporary dipoles. Any dipole to dipole case here sits in the same middle range. The correct order is " + correct + ".", { ask: "order", rev: rev });
  }
  var correct2 = q === 0 ? it.a : it.c;
  var extra = pick(["a sample of helium gas", "a piece of wax", "a crystal of dry ice", "a sample of methane gas"].filter(function (x) { return [it.a, it.b, it.c].indexOf(x) < 0; }));
  var ds2 = shuffle([it.a, it.b, it.c, extra].filter(function (x) { return x !== correct2; })).slice(0, 3);
  return mcq("Of the following cases, which one involves the " + (q === 0 ? "strongest" : "weakest") + " attractions? The cases are: (1) " + it.a + "; (2) " + it.b + "; (3) " + it.c + ".", correct2, ds2, "Ion to ion attractions between full charges are the strongest attractions in this list. Hydrogen bonds and dipole attractions are in the middle range. London dispersion forces from temporary dipoles are the weakest here. The case asked for is " + correct2 + ".", { ask: q });
});

E("u2-15", 2, ["6.3"], 2, "gen", function () {
  var fams = [
    { name: "noble gases", items: [["He", 2], ["Ne", 10], ["Ar", 18], ["Kr", 36], ["Xe", 54]] },
    { name: "halogens", items: [["F₂", 18], ["Cl₂", 34], ["Br₂", 70], ["I₂", 106]] },
    { name: "straight chain alkanes", items: [["CH₄", 10], ["C₂H₆", 18], ["C₃H₈", 26], ["C₄H₁₀", 34], ["C₅H₁₂", 42], ["C₆H₁₄", 50]] }
  ];
  var fam = pick(fams);
  var four = shuffle(fam.items.slice()).slice(0, 4);
  var sortedBy = four.slice().sort(function (x, y) { return x[1] - y[1]; });
  var mode = pick([0, 1, 2]);
  var target = mode === 1 ? sortedBy[0] : sortedBy[sortedBy.length - 1];
  var label = four.map(function (x) { return x[0] + " (" + x[1] + " electrons)"; }).join(", ");
  var ask = mode === 0 ? "strongest London dispersion forces" : mode === 1 ? "weakest London dispersion forces" : "highest boiling point, where London dispersion is the main attraction between molecules";
  var ds = four.filter(function (x) { return x !== target; }).map(function (x) { return x[0]; });
  return mcq("A set of " + fam.name + " is shown with the number of electrons in each particle: " + label + ". Which member of the set has the " + ask + "?", target[0], ds, "London dispersion forces grow as the electron cloud gets larger and easier to distort, which happens as the number of electrons and the size of the particle increase. In this set the electron counts run from " + sortedBy[0][1] + " to " + sortedBy[sortedBy.length - 1][1] + ". The member asked for is " + target[0] + " with " + target[1] + " electrons.", { family: fam.name, target: target[0] });
});

E("u2-16", 2, ["6.3"], 3, "gen", function () {
  var yes = [
    { f: "CH₃CH₂OH (ethanol)", why: "its hydrogen atoms on oxygen" }, { f: "CH₃NH₂ (methylamine)", why: "its hydrogen atoms on nitrogen" },
    { f: "HOCH₂CH₂OH (ethylene glycol)", why: "its hydrogen atoms on oxygen" }, { f: "CH₃CH₂NH₂ (ethylamine)", why: "its hydrogen atoms on nitrogen" },
    { f: "H₂O₂ (hydrogen peroxide)", why: "its hydrogen atoms on oxygen" }, { f: "NH₂OH (hydroxylamine)", why: "its hydrogen atoms on nitrogen and oxygen" },
    { f: "CH₃OH (methanol)", why: "its hydrogen atoms on oxygen" }, { f: "HF (hydrogen fluoride)", why: "its hydrogen atoms on fluorine" }
  ];
  var no = ["CH₃OCH₃ (dimethyl ether)", "CH₃SH", "CH₂Cl₂", "C₂H₄", "SiH₄", "CH₃Br", "H₂Se", "C₄H₁₀", "PH₃", "CH₃F"];
  var y = pick(yes), n = pick(no), q = pick([0, 1, 2]);
  if (q === 0) {
    var correct = y.f + " forms hydrogen bonds between its molecules, while " + n + " does not";
    var ds = shuffle([
      n + " forms hydrogen bonds between its molecules, while " + y.f + " does not",
      "Both substances form hydrogen bonds between their molecules",
      "Neither substance forms hydrogen bonds between its molecules",
      "Both substances form only ionic attractions between their molecules"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A student meets two substances for the first time: " + y.f + " and " + n + ". Which prediction about hydrogen bonding is correct?", correct, ds, "Check each formula for a hydrogen atom bonded directly to nitrogen, oxygen or fluorine. " + y.f + " qualifies because of " + y.why + ". " + n + " has no hydrogen bonded to nitrogen, oxygen or fluorine, so its molecules cannot hydrogen bond to each other.", { yes: y.f, no: n });
  }
  if (q === 1) {
    var ds2 = shuffle(no.slice()).slice(0, 3);
    return mcq("Which substance, not studied in class, is predicted to form hydrogen bonds between its own molecules?", y.f, ds2, "Look for hydrogen bonded directly to nitrogen, oxygen or fluorine. In " + y.f + " the key feature is " + y.why + ", so neighbouring molecules can hydrogen bond. The other choices have no hydrogen bonded to nitrogen, oxygen or fluorine.", { yes: y.f });
  }
  var correct3 = "The key feature is " + y.why + ", and a lone pair on nitrogen, oxygen or fluorine of a neighbouring molecule attracts that hydrogen";
  var ds3 = shuffle([
    "The key feature is a carbon atom with four bonds, and carbon attracts hydrogen atoms from other molecules",
    "The key feature is a large electron cloud, and size alone creates hydrogen bonds",
    "The key feature is a full positive charge on the molecule, and ions attract the hydrogen",
    "The key feature is a hydrogen bonded to any atom at all, since every bonded hydrogen can hydrogen bond"
  ].filter(function (x) { return x !== correct3; })).slice(0, 3);
  return mcq("For the new substance " + y.f + ", which statement gives the correct structural reason that its molecules can hydrogen bond to each other?", correct3, ds3, "Hydrogen bonding needs two parts: a hydrogen bonded to nitrogen, oxygen or fluorine, which makes that hydrogen strongly positive in character, and a lone pair on nitrogen, oxygen or fluorine in a nearby molecule to attract it. In " + y.f + " the first part comes from " + y.why + ".", { yes: y.f });
});

// 6.4 Properties of molecular substances
E("u2-17", 2, ["6.4"], 1, "gen", function () {
  var subs = ["wax", "sugar", "solid carbon dioxide", "methane", "ethanol", "naphthalene", "iodine crystals", "sulfur", "glucose", "propane", "camphor", "butter fat"];
  var s = pick(subs), proc = pick(["melts", "boils", "evaporates"]), q = pick([0, 1, 2]);
  if (q === 0) {
    var correct = "Only the weak attractions between its molecules need to be overcome, and those take little energy";
    var ds = shuffle([
      "The strong covalent bonds inside each molecule must all be broken, and that takes little energy",
      "The attractions between oppositely charged ions in its lattice must be overcome",
      "Its free electrons must be removed from the electron sea around its atoms",
      "No attractions of any kind hold its particles together in the solid or liquid"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Molecular substances such as " + s + " generally have low melting and boiling points. Why?", correct, ds, "When a molecular substance " + proc + ", the covalent bonds inside each molecule stay intact. Only the much weaker attractions between separate molecules are overcome, and separating molecules takes far less energy than breaking bonds or an ionic lattice. That is why the change happens at a low temperature.", { substance: s });
  }
  if (q === 1) {
    var correct1 = "The molecules themselves stay whole, and only the attractions between molecules are overcome";
    var ds1 = shuffle([
      "Each molecule breaks apart into separate atoms",
      "Each molecule breaks into ions that move freely",
      "The molecules join together into one giant lattice",
      "The atoms lose their electrons to a shared electron sea"
    ].filter(function (x) { return x !== correct1; })).slice(0, 3);
    return mcq("When " + s + " " + proc + ", what happens to its molecules?", correct1, ds1, "Melting, boiling and evaporating are changes between molecules, not inside them. The molecules of " + s + " move apart as the attractions between them are overcome, but the covalent bonds inside each molecule remain unbroken.", { substance: s, proc: proc });
  }
  var correct2 = "Its melting point is low compared with an ionic compound, because attractions between molecules are weaker than attractions between ions";
  var ds2 = shuffle([
    "Its melting point is high compared with an ionic compound, because covalent bonds are stronger than ionic attractions",
    "Its melting point is about the same as an ionic compound, because all solids are held together the same way",
    "It has no melting point, because molecular substances pass directly from solid to gas in every case",
    "Its melting point is low because its molecules contain no electrons to attract each other"
  ].filter(function (x) { return x !== correct2; })).slice(0, 3);
  return mcq("How does the melting point of " + s + ", a molecular substance, compare with that of a typical ionic compound, and why?", correct2, ds2, "An ionic compound is held together by strong attractions between ions throughout a lattice, which take a great deal of energy to overcome. A molecular substance such as " + s + " is held together only by weak attractions between molecules, so it melts at a much lower temperature.", { substance: s });
});

E("u2-18", 2, ["6.4"], 1, "gen", function () {
  var subs = ["sugar", "wax", "methane", "carbon dioxide", "ethanol", "glucose", "iodine", "propane", "naphthalene", "acetone"];
  var states = [
    { st: "solid", form: "as a solid" }, { st: "liquid", form: "as a liquid" },
    { st: "molten", form: "when melted" }, { st: "gas", form: "as a gas" },
    { st: "solution", form: "dissolved in water, where it dissolves without forming ions" }
  ];
  var s = pick(subs), st = pick(states), q = pick([0, 1]);
  if (q === 0) {
    var correct = "It does not conduct, because it has no mobile ions and no free electrons in any state";
    var ds = shuffle([
      "It conducts well, because its covalent bonds act as wires for electric current",
      "It conducts only in this state, because melting or dissolving creates ions from its molecules",
      "It conducts well, because its electrons move freely through an electron sea",
      "It conducts, but only when the sample is heated until its molecules break apart"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A sample of " + s + " is tested " + st.form + ". Which statement about its electrical conductivity is correct?", correct, ds, "Electric current in a substance needs charged particles that are free to move: ions or electrons. A molecular substance such as " + s + " has neutral molecules in every state, with no ions and no delocalized electrons, so it does not conduct as a solid, liquid, gas or ordinary solution.", { substance: s, state: st.st });
  }
  var correct1 = "There are no charged particles free to move, because the particles are neutral molecules";
  var ds1 = shuffle([
    "The ions are locked in place, so the charge cannot move through the sample",
    "The free electrons are all used up in covalent bonds with the container",
    "The molecules carry charges, but they are too large to fit through the wires",
    "The current is carried away by evaporation before it can be measured"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Why does " + s + " fail to conduct electricity " + st.form + "?", correct1, ds1, "Conductivity needs mobile charged particles. The particles in " + s + " are neutral molecules with no overall charge and no free electrons, in this state and in every other state, so there is nothing available to carry a current.", { substance: s, state: st.st });
});

E("u2-19", 2, ["6.4"], 2, "gen", function () {
  var subs = ["paraffin wax", "solid carbon dioxide", "iodine crystals", "sugar crystals", "sulfur", "naphthalene flakes", "camphor", "frozen methane", "glucose crystals", "solid ethanol"];
  var acts = ["scratched with a fingernail", "crushed between two blocks", "cut with a knife", "dented by pressing with a spoon", "snapped with light finger pressure"];
  var s = pick(subs), a = pick(acts), q = pick([0, 1]);
  if (q === 0) {
    var correct = "It is soft, because only weak attractions between molecules must be overcome for molecules to slide or separate";
    var ds = shuffle([
      "It is very hard, because a lattice of ions resists any movement of its layers",
      "It is very hard, because its atoms are joined in one continuous network of covalent bonds",
      "It is soft, because its molecules break apart into atoms under light pressure",
      "It is soft, because it contains a sea of electrons that acts as a lubricant"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A sample of " + s + " can be " + a + ". Which statement best explains this softness?", correct, ds, "The molecules inside " + s + " are strongly bonded internally, but neighbouring molecules are held only by weak intermolecular forces. Light pressure overcomes those weak attractions and lets molecules move apart or slide, so the solid is soft compared with ionic or network solids.", { substance: s });
  }
  var correct1 = "An ionic solid, because its lattice of strong ion to ion attractions resists scratching and crushing far more";
  var ds1 = shuffle([
    "A molecular solid, because weak attractions between molecules make a solid harder to damage",
    "Neither, because all solids have the same hardness regardless of their bonding",
    "The molecular solid " + s + ", because its covalent bonds run through the whole sample",
    "An ionic solid is softer, because its ions roll over each other like ball bearings"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Which solid would be harder to scratch than " + s + ", and why?", correct1, ds1, "Hardness reflects how strongly the particles in a solid are held together. In " + s + " only weak forces act between molecules, so it is easily marked. In an ionic solid, strong attractions between ions act throughout the lattice and resist damage much more strongly.", { substance: s });
});

E("u2-20", 2, ["6.4"], 2, "gen", function () {
  var polars = ["sugar", "ethanol", "glucose", "acetone", "methanol", "urea", "ethylene glycol", "glycerol"];
  var nonpolars = ["cooking oil", "hexane", "iodine", "wax", "gasoline", "naphthalene", "benzene", "kerosene"];
  var polarSolvents = ["water", "ethanol", "methanol"];
  var nonpolarSolvents = ["hexane", "cooking oil", "gasoline"];
  var polarCase = pick([true, false]);
  var solute = polarCase ? pick(polars) : pick(nonpolars);
  var goodSolvent = polarCase ? pick(polarSolvents) : pick(nonpolarSolvents);
  var badSolvents = shuffle((polarCase ? nonpolarSolvents : polarSolvents).slice()).slice(0, 3);
  var correct = solute + " in " + goodSolvent;
  var ds = badSolvents.map(function (sv) { return solute + " in " + sv; });
  var sol = "A solute dissolves well in a solvent whose particles attract it in a similar way to its own particles. " + solute + " is a " + (polarCase ? "polar" : "nonpolar") + " substance, and " + goodSolvent + " is a " + (polarCase ? "polar" : "nonpolar") + " solvent, so the new attractions formed can replace the attractions that are broken. The other solvents are of the opposite type and mix poorly with it.";
  if (pick([true, false])) {
    return mcq("Which pairing is expected to dissolve readily, following the rule that like dissolves like?", correct, ds, sol, { solute: solute, solvent: goodSolvent });
  }
  return mcq("A student needs a solvent that will dissolve " + solute + " well. Which pairing should the student choose?", correct, ds, sol, { solute: solute, solvent: goodSolvent });
});

E("u2-21", 2, ["6.4"], 2, "gen", function () {
  var pool = [
    { f: "methane", bp: -161 }, { f: "ethane", bp: -89 }, { f: "propane", bp: -42 }, { f: "butane", bp: 0 },
    { f: "acetone", bp: 56 }, { f: "chloroform", bp: 61 }, { f: "hexane", bp: 69 }, { f: "ethanol", bp: 78 },
    { f: "water", bp: 100 }, { f: "acetic acid", bp: 118 }, { f: "octane", bp: 125 }, { f: "ethylene glycol", bp: 197 }
  ];
  var four = shuffle(pool.slice()).slice(0, 4);
  var byBp = four.slice().sort(function (x, y) { return x.bp - y.bp; });
  var mode = pick([0, 1]);
  var target = mode === 0 ? byBp[0] : byBp[byBp.length - 1];
  var table = four.map(function (x) { return x.f + ", boiling point " + x.bp + " °C"; }).join("; ");
  var ds = four.filter(function (x) { return x !== target; }).map(function (x) { return x.f; });
  var ask = mode === 0 ? "most volatile, evaporating most readily at room temperature" : "least volatile, evaporating least readily at room temperature";
  return mcq("Boiling points are listed for four molecular substances: " + table + ". Which substance is the " + ask + "?", target.f, ds, "Volatility is the tendency to evaporate. A substance with a low boiling point has weak attractions between its molecules, so molecules escape from the liquid easily and it is volatile. A high boiling point means stronger attractions and low volatility. In this set the boiling points run from " + byBp[0].bp + " °C to " + byBp[byBp.length - 1].bp + " °C, and the substance asked for is " + target.f + ".", { substance: target.f, mode: mode });
});

// 6.5 Intermolecular forces account for properties
E("u2-22", 2, ["6.5"], 2, "gen", function () {
  if (pick([0, 1]) === 0) {
    var sets = [
      { items: ["H₂O", "H₂S", "H₂Se"], why: "Water is the exception in its group because its molecules form hydrogen bonds, which are much stronger than the dipole and dispersion forces in H₂S and H₂Se. Between H₂S and H₂Se, the larger electron cloud of H₂Se gives stronger dispersion forces." },
      { items: ["HF", "HCl", "HBr"], why: "HF forms hydrogen bonds between its molecules, giving it the highest boiling point despite its small size. HCl and HBr have no hydrogen bonding, and HBr has the larger electron cloud, so its dispersion forces are stronger than those in HCl." },
      { items: ["NH₃", "PH₃", "AsH₃"], why: "NH₃ forms hydrogen bonds between its molecules, which lifts its boiling point above the others. PH₃ and AsH₃ rely on dipole and dispersion forces, and the larger AsH₃ molecules have stronger dispersion forces." },
      { items: ["CH₃CH₂OH", "CH₃OCH₃", "C₃H₈"], why: "Ethanol forms hydrogen bonds, so it boils highest. Dimethyl ether is polar but cannot hydrogen bond to itself, so it is next. Propane is nonpolar and has only dispersion forces, so it boils lowest." },
      { items: ["I₂", "Br₂", "Cl₂"], why: "All three are nonpolar, so only dispersion forces act. The forces grow with the number of electrons and the size of the molecules, so I₂ is held most strongly and Cl₂ least strongly." },
      { items: ["CH₃OH", "CH₃SH", "CH₃Cl"], why: "Methanol forms hydrogen bonds and boils highest. The other two are polar molecules without hydrogen bonding to themselves, and their order follows the strength of their dipole and dispersion attractions." },
      { items: ["Xe", "Kr", "Ar"], why: "These noble gases are single atoms with only dispersion forces between them. Xenon has the most electrons and the largest, most easily distorted electron cloud, so its dispersion forces are strongest and it boils highest." },
      { items: ["C₅H₁₂", "C₃H₈", "CH₄"], why: "These alkanes are nonpolar, so dispersion forces decide the order. Longer chains have more electrons and more contact between molecules, so C₅H₁₂ boils highest and CH₄ lowest." },
      { items: ["H₂O", "CH₃OH", "CH₄"], why: "Water and methanol both hydrogen bond, and water forms the more extensive hydrogen bond network, so it boils highest. Methane is nonpolar with only weak dispersion forces, so it boils far lower." },
      { items: ["Br₂", "ICl", "F₂"], why: "ICl is polar, so dipole attractions add to its dispersion forces. Br₂ and F₂ are nonpolar, and Br₂ has far more electrons than F₂, so its dispersion forces are much stronger." },
      { items: ["CH₃CH₂OH", "CH₃CH₂CH₂OH", "H₂O"], why: "All three can hydrogen bond. Water forms hydrogen bonds in every direction and boils highest here, and the longer alcohol has a larger electron cloud and stronger dispersion forces than the shorter one." },
      { items: ["HCl", "F₂", "HBr"], why: "HCl and HBr are polar and HBr also has the larger electron cloud, so HBr boils highest of the three. F₂ is nonpolar with few electrons, so its dispersion forces are the weakest." }
    ];
    var s = pick(sets), rev = pick([true, false]);
    var hiFirst = s.items.join(", then ");
    var loFirst = s.items.slice().reverse().join(", then ");
    var correct = rev ? loFirst : hiFirst;
    var others = [
      s.items[1] + ", then " + s.items[0] + ", then " + s.items[2],
      s.items[0] + ", then " + s.items[2] + ", then " + s.items[1],
      s.items[2] + ", then " + s.items[1] + ", then " + s.items[0],
      s.items[1] + ", then " + s.items[2] + ", then " + s.items[0]
    ];
    var ds = shuffle(others.filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Which list orders these substances from " + (rev ? "lowest boiling point to highest boiling point" : "highest boiling point to lowest boiling point") + ": " + s.items.join(", ") + "?", correct, ds, s.why + " Putting the substances in the order asked for gives: " + correct + ".", { set: s.items.join("/") });
  }
  var pool = [
    { f: "water", rank: 7, note: "extensive hydrogen bonding" }, { f: "ethanol", rank: 6, note: "hydrogen bonding" },
    { f: "methanol", rank: 5, note: "hydrogen bonding" }, { f: "octane", rank: 8, note: "strong dispersion forces in long chains" },
    { f: "hexane", rank: 5.5, note: "dispersion forces in medium chains" }, { f: "acetone", rank: 4, note: "dipole attractions" },
    { f: "butane", rank: 3, note: "dispersion forces in short chains" }, { f: "propane", rank: 2, note: "weak dispersion forces" },
    { f: "methane", rank: 1, note: "very weak dispersion forces" }, { f: "hydrogen peroxide", rank: 9, note: "hydrogen bonding" },
    { f: "iodine", rank: 10, note: "very strong dispersion forces in a large electron cloud" }, { f: "bromine", rank: 4.5, note: "dispersion forces in a large electron cloud" }
  ];
  var four = shuffle(pool.slice()).slice(0, 4);
  var byRank = four.slice().sort(function (x, y) { return x.rank - y.rank; });
  var mode = pick([0, 1]);
  var target = mode === 0 ? byRank[byRank.length - 1] : byRank[0];
  var ds2 = four.filter(function (x) { return x !== target; }).map(function (x) { return x.f; });
  return mcq("Four substances are compared: " + four.map(function (x) { return x.f; }).join(", ") + ". Based on the attractions between their molecules, which one has the " + (mode === 0 ? "highest" : "lowest") + " boiling point?", target.f, ds2, "Rank the substances by the strength of the attractions between their particles. Hydrogen bonding and large electron clouds give strong attractions and high boiling points, while small nonpolar molecules have weak dispersion forces and low boiling points. In this set " + target.f + " is the extreme case because of " + target.note + ".", { substance: target.f, mode: mode });
});

E("u2-23", 2, ["6.5"], 2, "gen", function () {
  if (pick([0, 1]) === 0) {
    var pairs = [
      { a: "H₂O", b: "H₂S", ans: ["hydrogen bonding", "hydrogen bonds"], why: "water has hydrogen bonded to oxygen, while sulfur in H₂S does not give hydrogen bonding" },
      { a: "HF", b: "HCl", ans: ["hydrogen bonding", "hydrogen bonds"], why: "HF has hydrogen bonded to fluorine, while HCl has no hydrogen bonding between its molecules" },
      { a: "NH₃", b: "PH₃", ans: ["hydrogen bonding", "hydrogen bonds"], why: "NH₃ has hydrogen bonded to nitrogen, while PH₃ has no hydrogen bonding between its molecules" },
      { a: "CH₃CH₂OH", b: "CH₃OCH₃", ans: ["hydrogen bonding", "hydrogen bonds"], why: "ethanol has hydrogen bonded to oxygen, while dimethyl ether has no hydrogen on oxygen" },
      { a: "Br₂", b: "Cl₂", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar, and Br₂ has many more electrons in a larger electron cloud" },
      { a: "I₂", b: "Br₂", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar, and I₂ has many more electrons in a larger electron cloud" },
      { a: "C₅H₁₂", b: "CH₄", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar alkanes, and the longer chain has more electrons and more contact between molecules" },
      { a: "HCl", b: "F₂", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "HCl is polar and F₂ is nonpolar, and the boiling points are close in size effects so polarity decides" },
      { a: "CH₃OH", b: "CH₃SH", ans: ["hydrogen bonding", "hydrogen bonds"], why: "methanol has hydrogen bonded to oxygen, while CH₃SH does not hydrogen bond to itself" },
      { a: "Xe", b: "Ar", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are single nonpolar atoms, and xenon has far more electrons" },
      { a: "H₂O", b: "CH₄", ans: ["hydrogen bonding", "hydrogen bonds"], why: "water hydrogen bonds extensively, while methane is nonpolar" },
      { a: "CH₃CH₂OH", b: "C₃H₈", ans: ["hydrogen bonding", "hydrogen bonds"], why: "ethanol has hydrogen bonded to oxygen, while propane is nonpolar" },
      { a: "Kr", b: "Ne", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are single nonpolar atoms, and krypton has far more electrons" },
      { a: "C₄H₁₀", b: "C₂H₆", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar alkanes, and the longer chain has more electrons" },
      { a: "HBr", b: "H₂", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "HBr is polar and H₂ is nonpolar with only two electrons" },
      { a: "NH₃", b: "H₂", ans: ["hydrogen bonding", "hydrogen bonds"], why: "NH₃ has hydrogen bonded to nitrogen, while H₂ is nonpolar" }
    ];
    var p = pick(pairs);
    return textq(p.a + " has a much higher boiling point than " + p.b + ". Name the main type of attraction between molecules that accounts for the higher boiling point of " + p.a + ".", p.ans, "Compare the structures of the two substances. The deciding difference is that " + p.why + ". The attraction responsible for the higher boiling point of " + p.a + " is " + p.ans[0] + ".", { a: p.a, b: p.b });
  }
  var e1 = pick([10, 18, 26, 34, 42, 50, 58, 74, 106]), e2 = pick([2, 10, 18, 26, 34, 42, 50]);
  if (e2 >= e1) e2 = Math.max(2, e1 - 16);
  var hiBp = ri(40, 180), loBp = ri(-120, -10);
  return textq("Two nonpolar liquids are compared. Liquid A has " + e1 + " electrons per molecule and boils at " + hiBp + " °C. Liquid B has " + e2 + " electrons per molecule and boils at " + loBp + " °C. Name the type of attraction between molecules that accounts for liquid A boiling so much higher.", ["london dispersion forces", "dispersion forces", "london dispersion"], "Both liquids are nonpolar, so neither hydrogen bonding nor permanent dipole attractions can act between their molecules. The only attraction present is London dispersion, and it is stronger in liquid A because its molecules have " + e1 + " electrons in larger, more easily distorted clouds, compared with " + e2 + " electrons in liquid B.", { e1: e1, e2: e2 });
});

E("u2-24", 2, ["6.5"], 2, "gen", function () {
  var pool = [
    { f: "dry ice (solid CO₂)", mp: -78 }, { f: "ice", mp: 0 }, { f: "paraffin wax", mp: 55 },
    { f: "iodine", mp: 114 }, { f: "sulfur", mp: 115 }, { f: "glucose", mp: 146 },
    { f: "naphthalene", mp: 80 }, { f: "camphor", mp: 175 }, { f: "solid methane", mp: -182 },
    { f: "solid ethanol", mp: -114 }, { f: "benzoic acid", mp: 122 }, { f: "stearic acid", mp: 69 }
  ];
  var four = shuffle(pool.slice()).slice(0, 4);
  var byMp = four.slice().sort(function (x, y) { return x.mp - y.mp; });
  var mode = pick([0, 1]);
  var target = mode === 0 ? byMp[byMp.length - 1] : byMp[0];
  var table = four.map(function (x) { return x.f + ", melting point " + x.mp + " °C"; }).join("; ");
  var ds = four.filter(function (x) { return x !== target; }).map(function (x) { return x.f; });
  return mcq("Melting points are listed for four molecular solids: " + table + ". Judged by the attractions between their molecules, which solid needs the " + (mode === 0 ? "most energy to melt, because its intermolecular attractions are strongest" : "least energy to melt, because its intermolecular attractions are weakest") + "?", target.f, ds, "Melting a molecular solid means overcoming the attractions between its molecules, not the covalent bonds inside them. A higher melting point signals stronger intermolecular attractions and a lower melting point signals weaker ones. In this set the melting points run from " + byMp[0].mp + " °C to " + byMp[byMp.length - 1].mp + " °C, and the solid asked for is " + target.f + ".", { substance: target.f, mode: mode });
});

E("u2-25", 2, ["6.5"], 3, "var", varset([
  function () {
    var correct = "Water forms hydrogen bonds between its molecules, which are far stronger than the dispersion forces in methane, so far more energy is needed to separate water molecules";
    var ds = ["Water molecules are held together by ionic attractions, while methane molecules are held by covalent bonds", "Methane has stronger covalent bonds inside its molecules, and bond strength inside the molecule sets the boiling point", "Water boils higher because its molecules are heavier and gravity holds them in the liquid"];
    return mcq("Water boils at 100 °C while methane boils at -161 °C, even though a methane molecule is heavier than a water molecule. Which explanation is correct?", correct, ds, "Boiling separates molecules from each other, so it is the attractions between molecules that matter, not the bonds inside them or the mass alone. Water molecules hydrogen bond to each other, a strong intermolecular attraction. Methane is nonpolar and its molecules attract only by weak dispersion forces, so they escape as a gas at a very low temperature.", {});
  },
  function () {
    var correct = "Ethanol has a hydrogen atom bonded to oxygen, so its molecules hydrogen bond to each other, while dimethyl ether has no hydrogen on oxygen and cannot hydrogen bond to itself";
    var ds = ["Dimethyl ether has stronger covalent bonds, and stronger internal bonds always raise the boiling point", "Ethanol boils higher because it contains more carbon atoms than dimethyl ether", "Dimethyl ether boils lower because its molecules contain no oxygen atoms"];
    return mcq("Ethanol and dimethyl ether have the same molar mass. Ethanol boils at 78 °C and dimethyl ether boils at -24 °C. Which explanation is correct?", correct, ds, "The two substances are isomers, so mass and electron count are nearly the same and dispersion forces are similar. The difference is structural: ethanol has an O-H group, so its molecules form hydrogen bonds. Dimethyl ether has oxygen but no hydrogen bonded to it, so its molecules cannot hydrogen bond to each other and escape much more easily.", {});
  },
  function () {
    var correct = "HF molecules form hydrogen bonds because hydrogen is bonded to fluorine, while HCl molecules have no hydrogen bonding and rely on weaker dipole and dispersion attractions";
    var ds = ["HCl boils lower because chlorine is less reactive than fluorine in chemical reactions", "HF boils higher because each HF molecule contains more electrons than each HCl molecule", "HCl should boil higher because its molecules are heavier, and mass is the only factor in boiling point"];
    return mcq("HF boils at 20 °C while HCl boils at -85 °C, even though HCl molecules are heavier. Which explanation is correct?", correct, ds, "Boiling does not break the covalent bonds inside molecules. HF has hydrogen bonded to fluorine, one of the three atoms that allow hydrogen bonding, so HF molecules attract each other strongly. HCl has no such feature, so its molecules are held only by dipole and dispersion forces and boil away at a much lower temperature.", {});
  },
  function () {
    var correct = "Both are nonpolar, so only dispersion forces act, and iodine has many more electrons in a larger, more easily distorted cloud, giving stronger dispersion forces";
    var ds = ["Iodine forms hydrogen bonds between its molecules, while bromine cannot form any attractions", "Bromine boils lower because its covalent bonds break more easily when it is heated", "Iodine is an ionic solid, so ionic attractions give it the higher boiling point"];
    return mcq("Iodine is a solid at room temperature while bromine is a liquid that boils at 59 °C. Both are diatomic halogen molecules. Which explanation is correct?", correct, ds, "Neither I₂ nor Br₂ is polar and neither can hydrogen bond, so dispersion forces are the only attractions between their molecules. Dispersion forces grow with the number of electrons and the size of the electron cloud. Iodine has far more electrons than bromine, so its molecules attract strongly enough to form a solid at room temperature.", {});
  },
  function () {
    var correct = "Ammonia molecules form hydrogen bonds because hydrogen is bonded to nitrogen, while phosphine molecules have no hydrogen bonding and are held by weaker forces";
    var ds = ["Phosphine boils lower because phosphorus atoms have no electrons available for any attraction", "Ammonia boils higher because its covalent bonds must be broken before it can boil", "Phosphine should boil higher because it is heavier, and no other factor can outweigh mass"];
    return mcq("Ammonia boils at -33 °C while phosphine, PH₃, boils at -88 °C, even though phosphine molecules are heavier. Which explanation is correct?", correct, ds, "In NH₃ each hydrogen is bonded to nitrogen, which is one of the three atoms that support hydrogen bonding, so ammonia molecules attract each other strongly. In PH₃ the hydrogen is bonded to phosphorus, which does not support hydrogen bonding, so only weaker dipole and dispersion forces act and the boiling point is lower despite the greater mass.", {});
  },
  function () {
    var correct = "Pentane has a longer chain with more electrons and more surface contact between neighbouring molecules, so its dispersion forces are stronger than those in methane";
    var ds = ["Pentane forms hydrogen bonds along its carbon chain, while methane cannot form attractions", "Methane boils lower because the covalent bonds in methane are weaker than those in pentane", "Pentane molecules are joined to each other by covalent bonds in the liquid"];
    return mcq("Pentane boils at 36 °C while methane boils at -161 °C. Both are nonpolar alkanes. Which explanation is correct?", correct, ds, "Both substances are nonpolar, so dispersion forces are the only attractions between their molecules. A pentane molecule has many more electrons than a methane molecule and a longer chain, giving more contact with neighbours. Its dispersion forces are therefore much stronger, and more energy is needed to separate its molecules when it boils.", {});
  }
]));

E("u2-26", 2, ["6.5"], 2, "gen", function () {
  var type = pick([0, 1, 2]);
  if (type === 0) {
    var donor = pick(["nitrogen", "oxygen", "fluorine"]), bpA = ri(60, 220), bpB = ri(-100, 20);
    return textq("Substance A contains hydrogen atoms bonded directly to " + donor + " atoms. It boils at " + bpA + " °C. Substance B is a similar sized molecule with no hydrogen bonded to nitrogen, oxygen or fluorine, and it boils at " + bpB + " °C. Name the attraction between molecules of A that is mainly responsible for its much higher boiling point.", ["hydrogen bonding", "hydrogen bonds"], "A hydrogen bonded to " + donor + " is strongly attracted to a lone pair on a neighbouring molecule. That attraction is hydrogen bonding, and it is much stronger than the forces available to substance B, which explains the large gap between " + bpA + " °C and " + bpB + " °C.", { donor: donor });
  }
  if (type === 1) {
    var eA = pick([54, 70, 86, 106, 126]), eB = pick([10, 18, 26, 34]);
    var bpA2 = ri(80, 320), bpB2 = ri(-160, -20);
    return textq("Substance A is nonpolar and has " + eA + " electrons per molecule. It boils at " + bpA2 + " °C. Substance B is also nonpolar and has " + eB + " electrons per molecule. It boils at " + bpB2 + " °C. Name the attraction between molecules that explains why A boils so much higher.", ["london dispersion forces", "dispersion forces", "london dispersion"], "Nonpolar molecules have no permanent dipole and cannot hydrogen bond, so the only attraction between them is London dispersion. Substance A has " + eA + " electrons in a large, easily distorted cloud, compared with " + eB + " electrons for B, so its dispersion forces are far stronger and its boiling point is far higher.", { eA: eA, eB: eB });
  }
  var dA = (rf(15, 30) / 10).toFixed(1), bpA3 = ri(-80, 40), bpB3 = ri(-190, -120);
  return textq("Substance A is a polar molecule with a large dipole, about " + dA + " units on a relative scale, and no hydrogen bonded to nitrogen, oxygen or fluorine. It boils at " + bpA3 + " °C. Substance B is a nonpolar molecule of similar size and boils at " + bpB3 + " °C. Name the attraction between molecules of A, beyond dispersion, that raises its boiling point.", ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], "Substance A is polar, so the positive end of one molecule attracts the negative end of the next. Those dipole dipole attractions add to the dispersion forces that both substances have. A has no hydrogen on nitrogen, oxygen or fluorine, so hydrogen bonding is not available. The extra attraction in A is dipole dipole forces.", { dipole: dA });
});

E("u2-27", 2, ["6.5"], 3, "gen", function () {
  var pairs = [
    { a: "CH₃NH₂", b: "CH₃SH", ans: ["hydrogen bonding", "hydrogen bonds"], why: "methylamine has hydrogen bonded to nitrogen, while CH₃SH does not hydrogen bond to itself" },
    { a: "CH₃CH₂OH", b: "CH₃CH₂SH", ans: ["hydrogen bonding", "hydrogen bonds"], why: "ethanol has hydrogen bonded to oxygen, while the sulfur compound does not hydrogen bond to itself" },
    { a: "HOCH₂CH₂OH", b: "CH₃OCH₂CH₃", ans: ["hydrogen bonding", "hydrogen bonds"], why: "the first substance has two O-H groups, while the ether has no hydrogen on oxygen" },
    { a: "CH₃OH", b: "CH₃Cl", ans: ["hydrogen bonding", "hydrogen bonds"], why: "methanol has hydrogen bonded to oxygen, while CH₃Cl has no hydrogen bonding" },
    { a: "I₂", b: "F₂", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar, and iodine has far more electrons in a much larger cloud" },
    { a: "C₆H₁₄", b: "C₂H₆", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar alkanes, and the longer chain has more electrons and more contact between molecules" },
    { a: "Xe", b: "He", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are single nonpolar atoms, and xenon has far more electrons" },
    { a: "Br₂", b: "F₂", ans: ["london dispersion forces", "dispersion forces", "london dispersion"], why: "both are nonpolar, and bromine has far more electrons in a larger cloud" },
    { a: "CH₃NH₂", b: "CH₄", ans: ["hydrogen bonding", "hydrogen bonds"], why: "methylamine has hydrogen bonded to nitrogen, while methane is nonpolar" },
    { a: "NH₂OH", b: "CH₃F", ans: ["hydrogen bonding", "hydrogen bonds"], why: "hydroxylamine has hydrogen bonded to nitrogen and oxygen, while CH₃F has no hydrogen on fluorine" },
    { a: "HBr", b: "Ar", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "HBr is polar, while argon atoms are nonpolar and have fewer electrons" },
    { a: "CH₃CN", b: "C₃H₈", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "CH₃CN is strongly polar, while propane is nonpolar" },
    { a: "SO₂", b: "CO₂", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "SO₂ is polar and bent, while CO₂ is nonpolar overall" },
    { a: "CHCl₃", b: "CCl₄", ans: ["dipole dipole forces", "dipole dipole attractions", "dipole forces"], why: "CHCl₃ is polar overall, while CCl₄ is nonpolar overall" }
  ];
  var p = pick(pairs), bpA = ri(50, 260), bpB = ri(-120, 30);
  if (bpB >= bpA) bpB = bpA - ri(80, 160);
  return textq("Two substances not covered in class are compared. " + p.a + " boils at " + bpA + " °C and " + p.b + " boils at " + bpB + " °C. Name the main attraction between molecules that accounts for the higher boiling point of " + p.a + ".", p.ans, "Apply the force model to the new pair. The deciding structural difference is that " + p.why + ". That makes the main attraction behind the higher boiling point of " + p.a + " " + p.ans[0] + ".", { a: p.a, b: p.b });
});

// 6.6 Formation of ionic bonds
E("u2-28", 2, ["6.6"], 1, "gen", function () {
  var metals = ["sodium", "magnesium", "calcium", "potassium", "aluminium", "lithium", "barium", "zinc"];
  var nonmetals = ["chlorine", "oxygen", "fluorine", "sulfur", "bromine", "nitrogen", "iodine", "phosphorus"];
  var m = pick(metals), n = pick(nonmetals), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "The " + m + " atoms lose electrons and the " + n + " atoms gain electrons";
    ds = ["The " + n + " atoms lose electrons and the " + m + " atoms gain electrons", "The " + m + " atoms and the " + n + " atoms share pairs of electrons equally", "Both kinds of atoms lose electrons, and the electrons leave the sample as a gas", "Both kinds of atoms gain electrons from the air around the reaction"];
  } else if (q === 1) {
    correct = "Electrons move from the metal, " + m + ", to the nonmetal, " + n;
    ds = ["Electrons move from the nonmetal, " + n + ", to the metal, " + m, "Electrons are shared in pairs between " + m + " and " + n + " and never transfer", "Electrons move from both " + m + " and " + n + " into a shared sea and no ions form"];
  } else {
    correct = m + " forms positive ions and " + n + " forms negative ions";
    ds = [m + " forms negative ions and " + n + " forms positive ions", "Both " + m + " and " + n + " form positive ions", "Both " + m + " and " + n + " form negative ions", "Neither forms ions, because ionic bonds are made by sharing electrons"];
  }
  return mcq("When " + m + " reacts with " + n + " to form an ionic compound, which statement describes the electron transfer correctly?", correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "In ionic bonding a metal gives electrons to a nonmetal. The metal atoms lose electrons and become positive ions, while the nonmetal atoms gain those electrons and become negative ions. Here " + m + " is the metal and " + n + " is the nonmetal, so electrons move from " + m + " to " + n + ".", { metal: m, nonmetal: n, ask: q });
});

E("u2-29", 2, ["6.6"], 2, "gen", function () {
  var atoms = [
    { a: "sodium atom", n: 1, d: "loses" }, { a: "magnesium atom", n: 2, d: "loses" },
    { a: "calcium atom", n: 2, d: "loses" }, { a: "aluminium atom", n: 3, d: "loses" },
    { a: "potassium atom", n: 1, d: "loses" }, { a: "lithium atom", n: 1, d: "loses" },
    { a: "barium atom", n: 2, d: "loses" }, { a: "oxygen atom", n: 2, d: "gains" },
    { a: "sulfur atom", n: 2, d: "gains" }, { a: "chlorine atom", n: 1, d: "gains" },
    { a: "fluorine atom", n: 1, d: "gains" }, { a: "nitrogen atom", n: 3, d: "gains" },
    { a: "bromine atom", n: 1, d: "gains" }, { a: "phosphorus atom", n: 3, d: "gains" }
  ];
  var at = pick(atoms), k = pick([1, 2, 3, 4, 5, 6]), ans = at.n * k;
  var prompt = k === 1
    ? "How many electrons does one " + at.a + " " + (at.d === "loses" ? "lose" : "gain") + " when it forms its usual ion? Give the number of electrons."
    : "A sample contains " + k + " separate " + at.a + "s, and each one forms its usual ion. How many electrons are " + (at.d === "loses" ? "lost" : "gained") + " in total? Give the number of electrons.";
  return numq(prompt, ans, 0.1, "One " + at.a + " " + at.d + " " + at.n + " electron or electrons so that its outer shell matches the nearest noble gas arrangement. For " + k + (k === 1 ? " atom" : " atoms") + " the total is " + at.n + " x " + k + " = " + ans + " electrons.", { atom: at.a, k: k });
});

E("u2-30", 2, ["6.6"], 1, "gen", function () {
  var els = [
    { e: "sodium", sym: "Na", ch: "1+", ion: "Na⁺", grp: "Group 1", ctx: "sodium chloride" },
    { e: "potassium", sym: "K", ch: "1+", ion: "K⁺", grp: "Group 1", ctx: "potassium bromide" },
    { e: "lithium", sym: "Li", ch: "1+", ion: "Li⁺", grp: "Group 1", ctx: "lithium fluoride" },
    { e: "magnesium", sym: "Mg", ch: "2+", ion: "Mg²⁺", grp: "Group 2", ctx: "magnesium oxide" },
    { e: "calcium", sym: "Ca", ch: "2+", ion: "Ca²⁺", grp: "Group 2", ctx: "calcium chloride" },
    { e: "barium", sym: "Ba", ch: "2+", ion: "Ba²⁺", grp: "Group 2", ctx: "barium sulfide" },
    { e: "aluminium", sym: "Al", ch: "3+", ion: "Al³⁺", grp: "Group 13", ctx: "aluminium oxide" },
    { e: "oxygen", sym: "O", ch: "2-", ion: "O²⁻", grp: "Group 16", ctx: "magnesium oxide" },
    { e: "sulfur", sym: "S", ch: "2-", ion: "S²⁻", grp: "Group 16", ctx: "barium sulfide" },
    { e: "chlorine", sym: "Cl", ch: "1-", ion: "Cl⁻", grp: "Group 17", ctx: "sodium chloride" },
    { e: "fluorine", sym: "F", ch: "1-", ion: "F⁻", grp: "Group 17", ctx: "lithium fluoride" },
    { e: "bromine", sym: "Br", ch: "1-", ion: "Br⁻", grp: "Group 17", ctx: "potassium bromide" },
    { e: "nitrogen", sym: "N", ch: "3-", ion: "N³⁻", grp: "Group 15", ctx: "magnesium nitride" },
    { e: "zinc", sym: "Zn", ch: "2+", ion: "Zn²⁺", grp: "a transition metal that commonly forms a 2+ ion", ctx: "zinc chloride" },
    { e: "strontium", sym: "Sr", ch: "2+", ion: "Sr²⁺", grp: "Group 2", ctx: "strontium chloride" },
    { e: "rubidium", sym: "Rb", ch: "1+", ion: "Rb⁺", grp: "Group 1", ctx: "rubidium chloride" },
    { e: "beryllium", sym: "Be", ch: "2+", ion: "Be²⁺", grp: "Group 2", ctx: "beryllium chloride" },
    { e: "iron", sym: "Fe", ch: "2+", ion: "Fe²⁺", grp: "a transition metal that commonly forms a 2+ ion", ctx: "iron(II) chloride" },
    { e: "copper", sym: "Cu", ch: "2+", ion: "Cu²⁺", grp: "a transition metal that commonly forms a 2+ ion", ctx: "copper(II) sulfate" },
    { e: "nickel", sym: "Ni", ch: "2+", ion: "Ni²⁺", grp: "a transition metal that commonly forms a 2+ ion", ctx: "nickel chloride" },
    { e: "silver", sym: "Ag", ch: "1+", ion: "Ag⁺", grp: "a transition metal that commonly forms a 1+ ion", ctx: "silver nitrate" },
    { e: "lead", sym: "Pb", ch: "2+", ion: "Pb²⁺", grp: "a metal that commonly forms a 2+ ion", ctx: "lead(II) nitrate" },
    { e: "tin", sym: "Sn", ch: "2+", ion: "Sn²⁺", grp: "a metal that commonly forms a 2+ ion", ctx: "tin(II) chloride" },
    { e: "phosphorus", sym: "P", ch: "3-", ion: "P³⁻", grp: "Group 15", ctx: "calcium phosphide" },
    { e: "selenium", sym: "Se", ch: "2-", ion: "Se²⁻", grp: "Group 16", ctx: "sodium selenide" },
    { e: "iodine", sym: "I", ch: "1-", ion: "I⁻", grp: "Group 17", ctx: "sodium iodide" },
    { e: "gallium", sym: "Ga", ch: "3+", ion: "Ga³⁺", grp: "Group 13", ctx: "gallium oxide" }
  ];
  var el = pick(els), q = pick([0, 1]);
  if (q === 0) {
    var charges = ["1+", "2+", "3+", "1-", "2-", "3-"];
    var ds = shuffle(charges.filter(function (x) { return x !== el.ch; })).slice(0, 3);
    return mcq("In " + el.ctx + ", what is the charge on the ion formed by " + el.e + ", a " + el.grp + " element?", el.ch, ds, "Atoms form ions that give a complete outer shell. " + el.e + " is in " + el.grp + ", and its atoms reach a stable arrangement by forming the ion " + el.ion + ", which carries a charge of " + el.ch + ".", { element: el.e, ask: q });
  }
  var ions = ["Na⁺", "K⁺", "Mg²⁺", "Ca²⁺", "Al³⁺", "O²⁻", "S²⁻", "Cl⁻", "F⁻", "Br⁻", "N³⁻", "Zn²⁺"];
  var ds2 = shuffle(ions.filter(function (x) { return x !== el.ion; })).slice(0, 3);
  return mcq("Which symbol represents the usual ion formed by " + el.e + ", as found in " + el.ctx + "?", el.ion, ds2, "The ion keeps the element symbol " + el.sym + " and shows the charge gained by reaching a complete outer shell. For " + el.e + " that charge is " + el.ch + ", so the ion is written " + el.ion + ".", { element: el.e, ask: q });
});

E("u2-31", 2, ["6.6"], 2, "gen", function () {
  var pairs = [
    { m: "sodium", ms: "Na", mn: 1, mi: "Na⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "magnesium", ms: "Mg", mn: 2, mi: "Mg²⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "calcium", ms: "Ca", mn: 2, mi: "Ca²⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "potassium", ms: "K", mn: 1, mi: "K⁺", n: "fluorine", ns: "F", nn: 1, ni: "F⁻" },
    { m: "aluminium", ms: "Al", mn: 3, mi: "Al³⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "lithium", ms: "Li", mn: 1, mi: "Li⁺", n: "bromine", ns: "Br", nn: 1, ni: "Br⁻" },
    { m: "barium", ms: "Ba", mn: 2, mi: "Ba²⁺", n: "sulfur", ns: "S", nn: 2, ni: "S²⁻" },
    { m: "magnesium", ms: "Mg", mn: 2, mi: "Mg²⁺", n: "nitrogen", ns: "N", nn: 3, ni: "N³⁻" },
    { m: "sodium", ms: "Na", mn: 1, mi: "Na⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "calcium", ms: "Ca", mn: 2, mi: "Ca²⁺", n: "fluorine", ns: "F", nn: 1, ni: "F⁻" },
    { m: "potassium", ms: "K", mn: 1, mi: "K⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "lithium", ms: "Li", mn: 1, mi: "Li⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "calcium", ms: "Ca", mn: 2, mi: "Ca²⁺", n: "bromine", ns: "Br", nn: 1, ni: "Br⁻" },
    { m: "aluminium", ms: "Al", mn: 3, mi: "Al³⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "potassium", ms: "K", mn: 1, mi: "K⁺", n: "sulfur", ns: "S", nn: 2, ni: "S²⁻" },
    { m: "zinc", ms: "Zn", mn: 2, mi: "Zn²⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "sodium", ms: "Na", mn: 1, mi: "Na⁺", n: "sulfur", ns: "S", nn: 2, ni: "S²⁻" },
    { m: "strontium", ms: "Sr", mn: 2, mi: "Sr²⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "magnesium", ms: "Mg", mn: 2, mi: "Mg²⁺", n: "fluorine", ns: "F", nn: 1, ni: "F⁻" },
    { m: "iron", ms: "Fe", mn: 3, mi: "Fe³⁺", n: "oxygen", ns: "O", nn: 2, ni: "O²⁻" },
    { m: "copper", ms: "Cu", mn: 2, mi: "Cu²⁺", n: "chlorine", ns: "Cl", nn: 1, ni: "Cl⁻" },
    { m: "aluminium", ms: "Al", mn: 3, mi: "Al³⁺", n: "nitrogen", ns: "N", nn: 3, ni: "N³⁻" },
    { m: "sodium", ms: "Na", mn: 1, mi: "Na⁺", n: "phosphorus", ns: "P", nn: 3, ni: "P³⁻" }
  ];
  var p = pick(pairs);
  var gg = p.mn, hh = p.nn; while (hh) { var tt = gg % hh; gg = hh; hh = tt; }
  var sm = p.nn / gg, sn = p.mn / gg;
  var q = (sm > 1 || sn > 1) ? pick([0, 1, 2]) : pick([0, 1]);
  if (q === 0) {
    var correct = "Each " + p.ms + " atom transfers " + p.mn + " electron or electrons to a " + p.ns + " atom, forming " + p.mi + " and " + p.ni + " ions";
    var ds = shuffle([
      "Each " + p.ns + " atom transfers " + p.nn + " electron or electrons to a " + p.ms + " atom, forming " + p.mi + " and " + p.ni + " ions",
      "Each " + p.ms + " atom shares " + p.mn + " pair or pairs of electrons with a " + p.ns + " atom, and no ions form",
      "Each " + p.ms + " atom gains " + p.mn + " electron or electrons and becomes a negative ion, while " + p.ns + " becomes positive",
      "Both atoms lose their outer electrons, which collect as a free electron sea around them"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A Lewis style description is needed for the formation of the ionic compound from " + p.m + " and " + p.n + ". Which description is correct?", correct, ds, "In a Lewis description of ionic formation, dots for the outer electrons of the metal are shown moving to the nonmetal. The " + p.m + " atom loses " + p.mn + " electron or electrons and is written as " + p.mi + ", and the " + p.n + " atom gains electrons and is written as " + p.ni + ". No shared pair is drawn, because the electrons are transferred, not shared.", { metal: p.m, nonmetal: p.n });
  }
  if (q === 2) {
    var subs = { 1: "", 2: "₂", 3: "₃", 4: "₄" };
    var formula = p.ms + subs[sm] + p.ns + subs[sn];
    var cand = [p.ms + p.ns, p.ms + subs[sn] + p.ns + subs[sm], p.ns + subs[sn] + p.ms + subs[sm], p.ms + subs[sm] + p.ns + subs[sn + 1]];
    var seenF = {}, dsF = [];
    cand.forEach(function (x) { if (x !== formula && !seenF[x]) { seenF[x] = 1; dsF.push(x); } });
    return mcq("What is the formula of the ionic compound formed from " + p.m + " and " + p.n + "?", formula, dsF.slice(0, 3), "The ions are " + p.mi + " and " + p.ni + ". The total positive charge must equal the total negative charge, so the compound takes " + sm + " of the " + p.mi + " ions for every " + sn + " of the " + p.ni + " ions (the criss-cross rule, reduced to lowest terms). The formula is " + formula + ".", { metal: p.m, nonmetal: p.n, ask: 2 });
  }
  var correct1 = p.mi + " and " + p.ni;
  var pool = ["Na⁺ and Cl⁻", "Mg²⁺ and O²⁻", "Ca²⁺ and Cl⁻", "K⁺ and F⁻", "Al³⁺ and O²⁻", "Li⁺ and Br⁻", "Ba²⁺ and S²⁻", "Mg²⁺ and N³⁻", "Na⁺ and O²⁻", "Ca²⁺ and F⁻", "Na⁻ and Cl⁺", "Mg⁻ and O⁺", "K⁺ and O²⁻", "Li⁺ and O²⁻", "Ca²⁺ and Br⁻", "Al³⁺ and Cl⁻", "K⁺ and S²⁻", "Zn²⁺ and O²⁻", "Na⁺ and S²⁻", "Sr²⁺ and Cl⁻", "Mg²⁺ and F⁻", "Fe³⁺ and O²⁻", "Cu²⁺ and Cl⁻", "Al³⁺ and N³⁻", "Na⁺ and P³⁻"];
  var ds1 = shuffle(pool.filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("When " + p.m + " reacts with " + p.n + ", which pair of ions is formed?", correct1, ds1, "The metal " + p.m + " loses its outer electrons and becomes " + p.mi + ". The nonmetal " + p.n + " gains electrons until its outer shell is complete and becomes " + p.ni + ". Together they give the pair " + correct1 + ".", { metal: p.m, nonmetal: p.n });
});

E("u2-32", 2, ["6.6"], 3, "gen", function () {
  var sub = function (n) { return String(n).split("").map(function (d) { return "₀₁₂₃₄₅₆₇₈₉"[Number(d)]; }).join(""); };
  var gcd = function (a, b) { return b === 0 ? a : gcd(b, a % b); };
  var metals = [{ s: "Na", c: 1 }, { s: "K", c: 1 }, { s: "Mg", c: 2 }, { s: "Ca", c: 2 }, { s: "Al", c: 3 }, { s: "Zn", c: 2 }];
  var nonmetals = [{ s: "Cl", c: 1 }, { s: "F", c: 1 }, { s: "Br", c: 1 }, { s: "O", c: 2 }, { s: "S", c: 2 }, { s: "N", c: 3 }];
  var m = pick(metals), n = pick(nonmetals), q = pick([0, 1, 2]);
  var g = gcd(m.c, n.c), ms = n.c / g, ns = m.c / g, lcm = m.c * n.c / g;
  var formula = m.s + (ms > 1 ? sub(ms) : "") + n.s + (ns > 1 ? sub(ns) : "");
  if (q === 0) {
    var cand = [
      n.s + (ns > 1 ? sub(ns) : "") + m.s + (ms > 1 ? sub(ms) : ""),
      m.s + (ms + 1 > 1 ? sub(ms + 1) : "") + n.s + (ns > 1 ? sub(ns) : ""),
      m.s + (ms > 1 ? sub(ms) : "") + n.s + (ns + 1 > 1 ? sub(ns + 1) : ""),
      m.s + sub(m.c) + n.s + sub(n.c),
      m.s + n.s
    ];
    var ds = [], ci = 0;
    while (ds.length < 3 && ci < cand.length) { var cv = cand[ci++]; if (cv !== formula && ds.indexOf(cv) < 0) ds.push(cv); }
    return mcq("A metal whose ions carry a charge of " + m.c + "+ has symbol " + m.s + ". A nonmetal whose ions carry a charge of " + n.c + "- has symbol " + n.s + ". What is the formula of the neutral ionic compound they form?", formula, ds, "The total positive charge must equal the total negative charge. The smallest whole numbers that balance are " + ms + " ion or ions of " + m.s + " for every " + ns + " ion or ions of " + n.s + ", found by dividing each charge by their common factor " + g + " and crossing the charges over. The formula is " + formula + ".", { formula: formula });
  }
  if (q === 1) {
    var ds2 = [], offs = [1, -1, 2, 3, -2, 4], oi = 0;
    while (ds2.length < 3 && oi < offs.length) { var v = lcm + offs[oi++]; if (v > 0 && v !== lcm && ds2.indexOf(String(v)) < 0) ds2.push(String(v)); }
    return mcq("Ions of " + m.s + " carry a charge of " + m.c + "+ and ions of " + n.s + " carry a charge of " + n.c + "-. In one formula unit of their compound, how many electrons are transferred from the metal atoms to the nonmetal atoms in total?", String(lcm), ds2, "One formula unit holds " + ms + " metal ion or ions, each losing " + m.c + " electrons, for a total loss of " + ms + " x " + m.c + " = " + lcm + " electrons. The " + ns + " nonmetal ion or ions gain " + ns + " x " + n.c + " = " + lcm + " electrons, so the transfer balances at " + lcm + " electrons.", { formula: formula });
  }
  var ratio = ms + " : " + ns;
  var candR = [ns + " : " + ms, (ms + 1) + " : " + ns, ms + " : " + (ns + 1), "1 : 1", (ms + ns) + " : 1", (ms + 2) + " : " + ns, ms + " : " + (ns + 2)];
  var ds3 = [], ri2 = 0;
  while (ds3.length < 3 && ri2 < candR.length) { var rv = candR[ri2++]; if (rv !== ratio && ds3.indexOf(rv) < 0) ds3.push(rv); }
  return mcq("Ions of " + m.s + " carry a charge of " + m.c + "+ and ions of " + n.s + " carry a charge of " + n.c + "-. What is the ratio of metal ions to nonmetal ions in their neutral compound?", ratio, ds3, "Balance the charges with the smallest whole numbers. Using " + ms + " metal ions gives a total charge of " + ms + " x " + m.c + "+ and using " + ns + " nonmetal ions gives " + ns + " x " + n.c + "-, and the two totals are equal in size. The ratio of metal ions to nonmetal ions is " + ratio + ".", { formula: formula });
});

// 6.7 Structural model of an ionic substance
E("u2-33", 2, ["6.7"], 1, "gen", function () {
  var comps = ["sodium chloride", "magnesium oxide", "calcium chloride", "potassium bromide", "sodium fluoride", "calcium oxide", "aluminium oxide", "potassium iodide", "lithium chloride", "barium sulfate", "zinc chloride", "sodium oxide"];
  var c = pick(comps), ctx = pick(["in a crystal sample", "in a mineral specimen", "in a laboratory sample", "in a single large crystal"]), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "Its ions sit in a regular, repeating three dimensional arrangement called a lattice";
    ds = ["Its ions are grouped into separate molecules, each with a fixed small number of ions", "Its ions are scattered at random with no repeating pattern of any kind", "Its ions form long chains that are not connected to each other"];
  } else if (q === 1) {
    correct = "Each ion is surrounded by ions of the opposite charge, so attractions act in every direction";
    ds = ["Each ion is surrounded only by ions of the same charge, so repulsions act in every direction", "Each ion is bonded to exactly one other ion, forming a separate pair", "Each ion is surrounded by neutral atoms that carry no charge"];
  } else {
    correct = "There are no separate molecules in the solid, only a continuous lattice of ions";
    ds = ["The solid is made of separate " + c + " molecules held together by weak forces", "The solid is one giant molecule in which all ions share electron pairs", "The solid is a mixture of metal atoms and nonmetal atoms that never formed ions"];
  }
  return mcq("Which statement describes the structure of " + c + " " + ctx + "?", correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "An ionic solid is a lattice: a regular, repeating arrangement of ions extending through the whole crystal. Every positive ion is surrounded by negative ions and every negative ion is surrounded by positive ions, so the formula gives a ratio of ions, not a molecule. This describes " + c + " in any sample.", { compound: c, ask: q });
});

E("u2-34", 2, ["6.7"], 2, "gen", function () {
  var comps = [
    { f: "NaCl", cat: 1, an: 1 }, { f: "MgO", cat: 1, an: 1 }, { f: "CaCl₂", cat: 1, an: 2 },
    { f: "Na₂O", cat: 2, an: 1 }, { f: "Al₂O₃", cat: 2, an: 3 }, { f: "MgCl₂", cat: 1, an: 2 },
    { f: "K₂S", cat: 2, an: 1 }, { f: "CaF₂", cat: 1, an: 2 }, { f: "Fe₂O₃", cat: 2, an: 3 },
    { f: "Na₂SO₄", cat: 2, an: 1 }, { f: "Ca₃N₂", cat: 3, an: 2 }, { f: "AlCl₃", cat: 1, an: 3 }
  ];
  var c = pick(comps), q = pick([0, 1, 2]);
  if (q === 2) {
    var correct = "It is the smallest whole number ratio of ions in the lattice, not a separate molecule";
    var ds = shuffle([
      "It is one separate molecule of the compound, held together by shared electron pairs",
      "It is the mass in grams of one mole of the compound",
      "It is a single ion pair that exists on its own inside the crystal"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("What does the formula unit of " + c.f + " represent?", correct, ds, "Ionic solids contain no molecules. A formula unit is a bookkeeping idea: it names the smallest whole number ratio of ions in the lattice. For " + c.f + " that ratio is " + c.cat + " cation unit or units to " + c.an + " anion unit or units, repeated throughout the crystal.", { compound: c.f });
  }
  var total = c.cat + c.an, k = pick([1, 2, 3, 4]);
  var ans = q === 0 ? total : total * k;
  var prompt = q === 0
    ? "How many ions in total are counted in one formula unit of " + c.f + "?"
    : "How many ions in total are counted in " + k + " formula units of " + c.f + "?";
  var ds2 = [], offs = [1, -1, 2, 3], oi = 0;
  while (ds2.length < 3 && oi < offs.length) { var v = ans + offs[oi++]; if (v > 0 && v !== ans && ds2.indexOf(String(v)) < 0) ds2.push(String(v)); }
  return mcq(prompt, String(ans), ds2, "Read the subscripts in " + c.f + ", taking an unwritten subscript as 1. One formula unit contains " + c.cat + " cation unit or units and " + c.an + " anion unit or units, which is " + total + " ions in total. " + (q === 0 ? "That is the value asked for." : "For " + k + " formula units the total is " + total + " x " + k + " = " + ans + " ions."), { compound: c.f, ask: q });
});

E("u2-35", 2, ["6.7"], 2, "var", varset([
  function () {
    var correct = "Shifting a layer moves positive ions next to positive ions and negative ions next to negative ions, and the resulting repulsion pushes the layers apart";
    var ds = ["Shifting a layer breaks the covalent bonds between the ions, and broken bonds cannot reform", "Shifting a layer frees the electrons in the lattice, and the crystal loses its charge balance", "Shifting a layer melts the crystal from the inside, so it collapses into a liquid"];
    return mcq("An ionic crystal cracks cleanly when it is struck and one layer of ions shifts by one ion spacing. Why does the crystal split instead of bending?", correct, ds, "In the lattice each ion is surrounded by oppositely charged ions, and those attractions hold the layers in place. A shift of one spacing lines up ions of the same charge. Like charges repel strongly, so the layers are pushed apart and the crystal splits along that plane instead of sliding smoothly.", {});
  },
  function () {
    var correct = "The strong attractions act in every direction through the lattice, and a shift brings like charges together, so the layers repel and separate";
    var ds = ["The ions are held in separate molecules, and the molecules are too weak to resist the hammer", "The crystal bends until its metallic bonds stretch and then snap", "The hammer adds electrons to the crystal, and the extra charge blows the layers apart"];
    return mcq("Why are ionic solids brittle rather than malleable when hammered?", correct, ds, "A metal can change shape because its layers of ions can slide within an electron sea. An ionic lattice has no such freedom: its layers are locked by attractions in all directions, and sliding brings positive ions against positive ions and negative ions against negative ions. The repulsion separates the layers, so the solid breaks instead of bending.", {});
  },
  function () {
    var correct = "Along the shifted plane, anions now face anions and cations face cations, so repulsion replaces attraction and the plane becomes a crack";
    var ds = ["Along the shifted plane, every ion becomes neutral, so nothing holds the layers together", "Along the shifted plane, the ions share electron pairs and the crystal becomes a gas", "Along the shifted plane, the ions melt, and the liquid layer lets the crystal fall apart"];
    var q = mcq("A diagram shows one layer of an ionic lattice pushed sideways so that ions no longer alternate in charge along one plane. What happens at that plane, and why?", correct, ds, "Before the shift, each ion along the plane faced oppositely charged neighbours and was attracted to them. After a shift of one ion spacing, the facing ions carry the same charge. Like charges repel, so the attraction across the plane is replaced by repulsion and the crystal cleaves there.", {});
    q.figure = chemShiftedLatticeSVG();
    return q;
  },
  function () {
    var correct = "They cannot slide past each other, because sliding would place ions of the same charge side by side and the repulsion would split the solid";
    var ds = ["They cannot slide because each ion is joined to its neighbours by shared pairs of electrons", "They cannot slide because the ions are far too heavy to move at room temperature", "They cannot slide because the crystal contains no ions, only neutral molecules"];
    return mcq("Layers in a metal can slide when the metal is hammered, but layers in an ionic crystal cannot. What property of the ionic lattice explains the difference?", correct, ds, "In a metal the positive ions sit in a sea of electrons that holds them together in any position, so layers can slide. In an ionic crystal the holding force is attraction between oppositely charged neighbours. Sliding by one spacing puts like charges side by side, and their repulsion breaks the crystal apart.", {});
  },
  function () {
    var correct = "The tap shifts a layer by one ion spacing, like charges come together along a plane, and repulsion splits the crystal cleanly along that plane";
    var ds = ["The tap breaks every ionic bond in the crystal at once, and the pieces fall apart randomly", "The tap knocks the electrons off the ions, leaving neutral atoms that no longer attract", "The tap melts a thin layer of the crystal, and the crystal slides apart while it cools"];
    return mcq("A mineral sample of an ionic compound is tapped with a hammer and splits into flat faced pieces. Which sequence of events explains the clean split?", correct, ds, "A clean, flat split follows the planes of the lattice. The tap moves one layer by a single ion spacing, so ions of the same charge face each other along that plane. Their repulsion drives the two sides apart along the plane, leaving flat faces.", {});
  }
]));

E("u2-36", 2, ["6.7"], 2, "gen", function () {
  var comps = [
    { f: "NaCl", cat: "Na⁺", an: "Cl⁻" }, { f: "MgO", cat: "Mg²⁺", an: "O²⁻" },
    { f: "CaCl₂", cat: "Ca²⁺", an: "Cl⁻" }, { f: "KBr", cat: "K⁺", an: "Br⁻" },
    { f: "NaF", cat: "Na⁺", an: "F⁻" }, { f: "CaO", cat: "Ca²⁺", an: "O²⁻" },
    { f: "KI", cat: "K⁺", an: "I⁻" }, { f: "LiCl", cat: "Li⁺", an: "Cl⁻" },
    { f: "ZnCl₂", cat: "Zn²⁺", an: "Cl⁻" }, { f: "Na₂O", cat: "Na⁺", an: "O²⁻" },
    { f: "BaS", cat: "Ba²⁺", an: "S²⁻" }, { f: "MgCl₂", cat: "Mg²⁺", an: "Cl⁻" },
    { f: "NaBr", cat: "Na⁺", an: "Br⁻" }, { f: "LiF", cat: "Li⁺", an: "F⁻" },
    { f: "MgS", cat: "Mg²⁺", an: "S²⁻" }, { f: "CaF₂", cat: "Ca²⁺", an: "F⁻" },
    { f: "Al₂O₃", cat: "Al³⁺", an: "O²⁻" }, { f: "SrCl₂", cat: "Sr²⁺", an: "Cl⁻" },
    { f: "Na₂S", cat: "Na⁺", an: "S²⁻" }, { f: "MgF₂", cat: "Mg²⁺", an: "F⁻" }
  ];
  var c = pick(comps), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "Negative " + c.an + " ions, because every cation in the lattice is surrounded by anions";
    ds = ["Positive " + c.cat + " ions, because ions of the same charge pack together in the lattice", "Neutral " + c.f + " molecules, because the lattice is built from molecules", "Free electrons, because the space around a cation is filled by an electron sea"];
  } else if (q === 1) {
    correct = "Strong attractions to oppositely charged ions act on it from every direction";
    ds = ["A single covalent bond to one neighbouring ion holds it in place", "Gravity alone holds it in place, since ions do not attract each other", "Attractions to ions of the same charge act on it from every direction"];
  } else {
    correct = "If a layer shifts by one ion spacing, " + c.cat + " ions can come to face " + c.cat + " ions and the repulsion can split the crystal";
    ds = ["If a layer shifts by one ion spacing, the ions become neutral and the crystal dissolves", "If a layer shifts by one ion spacing, the ions share electrons and the crystal becomes malleable", "A layer can never shift, because ionic crystals contain no layers of ions"];
  }
  return mcq("Consider the lattice of " + c.f + ", built from " + c.cat + " and " + c.an + " ions. " + (q === 0 ? "Which particles directly surround one " + c.cat + " ion in the lattice?" : q === 1 ? "What holds one ion in its place in the lattice?" : "Which statement about shifting layers in this lattice is correct?"), correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "In the " + c.f + " lattice the ions alternate: every " + c.cat + " ion is surrounded by " + c.an + " ions and every " + c.an + " ion is surrounded by " + c.cat + " ions. Attractions act in all directions and hold each ion in place. A shift of one spacing breaks that pattern and brings like charges together, which is why ionic crystals are brittle.", { compound: c.f, ask: q });
});

// 6.8 Properties of ionic substances
E("u2-37", 2, ["6.8"], 1, "gen", function () {
  var comps = [
    { f: "NaCl", mp: 801 }, { f: "MgO", mp: 2852 }, { f: "CaCl₂", mp: 772 }, { f: "KBr", mp: 734 },
    { f: "NaF", mp: 993 }, { f: "CaO", mp: 2613 }, { f: "Al₂O₃", mp: 2072 }, { f: "KI", mp: 681 },
    { f: "LiCl", mp: 605 }, { f: "BaO", mp: 1923 }, { f: "NaBr", mp: 747 }, { f: "MgCl₂", mp: 714 }
  ];
  var c = pick(comps), q = pick([0, 1]);
  if (q === 0) {
    var correct = "A great deal of energy is needed to overcome the strong attractions between ions throughout the lattice";
    var ds = shuffle([
      "Its molecules are unusually large, so they need more heat to start moving",
      "The covalent bonds inside its molecules are the strongest bonds known",
      "Its free electrons absorb heat and hold the solid together up to high temperatures",
      "It contains heavy atoms, and heavy atoms always need high temperatures to melt"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq(c.f + " melts at " + c.mp + " °C. Why is the melting point of this ionic compound so high?", correct, ds, "Melting an ionic compound means giving its ions enough energy to break free from the lattice. Every ion in " + c.f + " is attracted to oppositely charged neighbours in all directions, so a very large amount of energy is needed, which is why the melting point is " + c.mp + " °C.", { compound: c.f });
  }
  var t = pick([100, 200, 300, 400, 500]);
  var correct1 = "It is still a solid, because " + t + " °C is well below its melting point of " + c.mp + " °C";
  var ds1 = shuffle([
    "It is a liquid, because all ionic compounds melt below 500 °C",
    "It is a gas, because heating any solid to " + t + " °C turns it into a gas",
    "It has dissolved, because heating a solid is the same as dissolving it"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("A sample of " + c.f + ", which melts at " + c.mp + " °C, is heated to " + t + " °C. What is its state, and why?", correct1, ds1, "Compare the temperature reached with the melting point. The sample at " + t + " °C has not reached " + c.mp + " °C, so its ions still lack the energy to leave the lattice and " + c.f + " remains a solid.", { compound: c.f, temp: t });
});

E("u2-38", 2, ["6.8"], 2, "gen", function () {
  var comps = ["NaCl", "KBr", "CaCl₂", "MgO", "NaF", "KI", "LiCl", "NaBr", "MgCl₂", "CaO", "KCl", "BaCl₂"];
  var states = [
    { st: "solid", conducts: false, why: "its ions are locked in fixed positions in the lattice and cannot move to the electrodes" },
    { st: "molten", conducts: true, why: "melting frees its ions from the lattice, so they can move and carry charge" },
    { st: "aqueous solution", conducts: true, why: "dissolving separates its ions and surrounds them with water, so they can move and carry charge" }
  ];
  var c = pick(comps), s = pick(states), q = pick([0, 1]);
  if (q === 0) {
    var correct = s.conducts ? "It conducts, because its ions are free to move and carry charge" : "It does not conduct, because its ions cannot move";
    var ds = shuffle([
      s.conducts ? "It does not conduct, because its ions cannot move" : "It conducts, because its ions are free to move and carry charge",
      "It conducts, because its molecules split into atoms that carry the current",
      "It conducts only if a metal wire is dissolved in it as well",
      "It never conducts in any state, because ionic compounds contain no charged particles"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A sample of the ionic compound " + c + " is in the " + s.st + " state. Which statement about its electrical conductivity is correct?", correct, ds, "Ionic compounds contain charged particles in every state, but current flows only when those ions can move. For " + c + " in the " + s.st + " state, " + s.why + ". Solid ionic compounds never conduct, while molten and dissolved ionic compounds do.", { compound: c, state: s.st });
  }
  var correct1 = "It does not conduct in the solid state, because " + s.why;
  if (s.st !== "solid") correct1 = "It conducts in the " + s.st + " state, because " + s.why;
  var others = [
    "It conducts in every state, because ions carry charge even when they cannot move",
    "It never conducts, because melting or dissolving destroys its ions",
    "It conducts as a solid, because its lattice acts like a metal wire",
    "It conducts only as a gas, because gases contain free electrons"
  ];
  var ds1 = shuffle(others.filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Which statement correctly explains the conductivity behaviour of " + c + " in the " + s.st + " state?", correct1, ds1, "The key question is whether the ions can move. For " + c + " in the " + s.st + " state, " + s.why + ". That is why ionic solids are insulators while their melts and solutions are conductors.", { compound: c, state: s.st });
});

E("u2-39", 2, ["6.8"], 2, "gen", function () {
  var comps = ["sodium chloride", "magnesium oxide", "calcium chloride", "potassium bromide", "sodium fluoride", "potassium iodide", "lithium chloride", "barium oxide", "sodium bromide", "magnesium chloride"];
  var acts = ["struck with a hammer", "dropped on a hard floor", "squeezed in a clamp", "hit with a chisel"];
  var c = pick(comps), a = pick(acts), q = pick([0, 1]);
  if (q === 0) {
    var correct = "It shatters, because shifting layers bring ions of the same charge together and they repel";
    var ds = shuffle([
      "It bends into a new shape, because its layers slide easily over each other",
      "It stretches into a wire, because its ions are held in an electron sea",
      "It dents softly, because weak forces between its molecules let them move aside"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A crystal of " + c + " is " + a + ". What happens, and why?", correct, ds, "Ionic crystals are brittle. The blow shifts a layer of ions by about one spacing, which lines up positive ions with positive ions and negative ions with negative ions. The repulsion between like charges pushes the layers apart, so " + c + " shatters instead of changing shape.", { compound: c });
  }
  var correct1 = "Brittle, because its lattice layers cannot slide without bringing like charges together";
  var ds1 = shuffle([
    "Malleable, because its ions sit in a sea of electrons that lets layers slide",
    "Soft, because only weak attractions between molecules hold it together",
    "Flexible, because its ions are joined in long chains that can bend"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Which word and reason correctly describe the mechanical behaviour of solid " + c + " when it is " + a + "?", correct1, ds1, "The lattice of " + c + " holds each ion with attractions in every direction. Layers cannot slide to a new stable position, because a shift of one spacing puts like charges together and they repel. The solid is therefore brittle and breaks rather than bending.", { compound: c });
});

E("u2-40", 2, ["6.8"], 2, "gen", function () {
  var comps = ["sodium chloride", "potassium nitrate", "sodium nitrate", "potassium chloride", "ammonium chloride", "magnesium sulfate", "calcium chloride", "potassium bromide", "sodium bromide", "lithium chloride"];
  var solvents = [
    { sv: "water", good: true, why: "water molecules are polar and attract the ions strongly, pulling them out of the lattice and surrounding them" },
    { sv: "hexane", good: false, why: "hexane molecules are nonpolar and cannot attract the ions strongly enough to pull them out of the lattice" },
    { sv: "cooking oil", good: false, why: "oil molecules are nonpolar and cannot attract the ions strongly enough to pull them out of the lattice" },
    { sv: "gasoline", good: false, why: "gasoline molecules are nonpolar and cannot attract the ions strongly enough to pull them out of the lattice" }
  ];
  var c = pick(comps), s = pick(solvents), q = pick([0, 1]);
  if (q === 0) {
    var correct = s.good ? "It dissolves readily, because " + s.why : "It stays mostly undissolved, because " + s.why;
    var ds = shuffle([
      s.good ? "It stays mostly undissolved, because " + s.why : "It dissolves readily, because " + s.why,
      "It dissolves readily in every solvent, because ionic compounds dissolve in all liquids",
      "It reacts with the solvent and turns into a metal and a gas",
      "It dissolves only after the solvent is boiled for several hours"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A spoonful of " + c + " is stirred into " + s.sv + ". What is expected to happen, and why?", correct, ds, "An ionic compound dissolves when the solvent can attract its ions strongly enough to replace the attractions in the lattice. For " + c + " in " + s.sv + ", " + s.why + ". Polar water dissolves many ionic compounds, while nonpolar solvents generally cannot.", { compound: c, solvent: s.sv });
  }
  var correct1 = "Water, because its polar molecules attract cations and anions and pull them from the lattice into solution";
  var ds1 = shuffle([
    "Hexane, because its nonpolar molecules attract ions more strongly than water does",
    "Cooking oil, because ions dissolve best in solvents that carry no partial charges",
    "Gasoline, because it evaporates fastest and carries the ions away with it"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Which solvent is the best choice for dissolving " + c + ", and why?", correct1, ds1, "The negative ends of water molecules attract the cations of " + c + " and the positive ends attract its anions. These attractions compete with the lattice attractions and surround each ion, carrying it into solution. Nonpolar solvents cannot attract ions in this way.", { compound: c });
});

E("u2-41", 2, ["6.8"], 3, "gen", function () {
  var comps = ["rubidium chloride", "strontium oxide", "caesium fluoride", "barium bromide", "strontium chloride", "rubidium iodide", "caesium chloride", "barium fluoride", "strontium sulfide", "rubidium bromide", "strontium nitrate", "barium iodide", "caesium bromide", "strontium bromide", "rubidium fluoride", "barium chloride"];
  var c = pick(comps), q = pick([0, 1, 2, 3]);
  var props = [
    { p: "melting point", correct: "High, because strong attractions between ions throughout its lattice take a great deal of energy to overcome", wrong: ["Low, because only weak attractions between its molecules need to be overcome", "Low, because its ions are free to move at room temperature", "About the same as a molecular solid of similar mass, because all solids melt alike"] },
    { p: "conductivity as a solid", correct: "It does not conduct, because its ions are locked in the lattice and cannot move", wrong: ["It conducts well, because its ions move freely through the solid", "It conducts well, because it contains a sea of free electrons", "It conducts, because all substances that contain ions conduct in every state"] },
    { p: "conductivity when molten", correct: "It conducts, because melting frees its ions to move and carry charge", wrong: ["It does not conduct, because melting destroys its ions", "It conducts only after it has been turned into a gas", "It does not conduct, because molten substances contain only neutral molecules"] },
    { p: "response to a hammer blow", correct: "It is brittle and shatters, because shifting layers bring like charges together and they repel", wrong: ["It is malleable and flattens, because its layers slide easily over each other", "It dents softly, because weak forces between its molecules let them move aside", "It stretches into a wire, because its ions sit in an electron sea"] }
  ];
  var pr = props[q];
  return mcq("A compound not studied in class, " + c + ", is confirmed to be ionic, with a lattice of oppositely charged ions. Predict its " + pr.p + ".", pr.correct, shuffle(pr.wrong.slice()).slice(0, 3), "Every property here follows from the lattice model. Ionic lattices have strong attractions in all directions, ions that cannot move in the solid but can move when molten, and layers that repel when shifted into like charge alignment. Applying that model to " + c + " gives the prediction stated in the correct option.", { compound: c, property: pr.p });
});

// 6.9 Metallic bonds
E("u2-42", 2, ["6.9"], 1, "gen", function () {
  var metals = ["iron", "copper", "aluminium", "sodium", "gold", "zinc", "lead", "silver", "nickel", "tin", "magnesium", "titanium"];
  var objs = ["a wire", "a coin", "a cooking pan", "a foil sheet", "a nail", "a bracelet"];
  var m = pick(metals), o = pick(objs), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "Positive metal ions sit in a regular arrangement surrounded by delocalized electrons that move through the whole piece";
    ds = ["Neutral metal atoms are joined in separate molecules held together by weak forces", "Positive and negative metal ions alternate in a lattice like an ionic compound", "Metal atoms share fixed pairs of electrons with their nearest neighbours only"];
  } else if (q === 1) {
    correct = "Electrons that are not tied to any one atom and can move throughout the structure";
    ds = ["Electrons that have been lost from the sample completely during refining", "Electrons locked inside the nucleus of each metal atom", "Electrons shared by exactly two atoms in a single covalent bond"];
  } else {
    correct = "The attraction between the positive ions and the surrounding delocalized electrons, acting in every direction";
    ds = ["The attraction between positive ions and negative ions in alternating positions", "The shared electron pairs in the covalent bonds between neighbouring atoms", "The weak dispersion forces between separate metal molecules"];
  }
  return mcq("The electron sea model is used to describe the metal in " + o + " made of " + m + ". " + (q === 0 ? "Which statement describes the structure of the metal?" : q === 1 ? "What does the term delocalized electrons mean in this model?" : "What holds the particles of the metal together?"), correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "In the electron sea model for " + m + ", the outer electrons of the atoms are delocalized: they belong to the whole structure rather than to one atom. The metal is a lattice of positive ions held together by their attraction to this mobile sea of electrons in every direction.", { metal: m, ask: q });
});

E("u2-43", 2, ["6.9"], 2, "gen", function () {
  var metals = ["copper", "aluminium", "iron", "silver", "gold", "zinc", "nickel", "tin", "lead", "magnesium", "titanium", "sodium"];
  var ctxs = ["used as an electrical cable", "used as an electrode in a circuit", "wound into a heating element coil", "used as a bus bar carrying current", "used as a contact in a switch", "drawn into a long power line"];
  var m = pick(metals), ctx = pick(ctxs), q = pick([0, 1]);
  if (q === 0) {
    var correct = "Its delocalized electrons are free to move through the solid and carry the charge";
    var ds = shuffle([
      "Its positive ions roll through the solid from one end to the other",
      "Its atoms split into ions whenever a battery is connected",
      "Its covalent bonds vibrate and pass charge from atom to atom",
      "It conducts only because it is always coated with a layer of salt water"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq(m.charAt(0).toUpperCase() + m.slice(1) + " is " + ctx + ". Why does this metal conduct electricity in the solid state?", correct, ds, "A current needs mobile charged particles. In solid " + m + " the positive ions are fixed in the lattice, but the delocalized electrons move freely through the whole piece. When a voltage is applied, these electrons drift and carry the charge, which is why metals conduct as solids, unlike ionic solids.", { metal: m });
  }
  var correct1 = "The moving particles are the delocalized electrons, while the positive ions stay in their lattice positions";
  var ds1 = shuffle([
    "The moving particles are the positive ions, while the electrons stay fixed to their atoms",
    "Both the ions and the electrons leave the metal and travel through the external wires",
    "The moving particles are neutral atoms that evaporate from the surface",
    "No particles move at all, because charge travels through empty space inside the metal"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("When " + m + " is " + ctx + " and a current flows, which particles move through the metal?", correct1, ds1, "In the electron sea model the ions of " + m + " are locked in their lattice positions, and the sea of delocalized electrons moves around them. A current is a drift of those electrons through the metal, not a movement of the ions or atoms.", { metal: m });
});

E("u2-44", 2, ["6.9"], 2, "gen", function () {
  var metals = ["copper", "aluminium", "iron", "gold", "silver", "zinc", "tin", "lead", "nickel", "magnesium"];
  var procs = ["hammered into a thin sheet", "drawn out into a wire", "rolled into foil", "bent into a bracket", "stamped into a coin", "folded into a tray"];
  var m = pick(metals), p = pick(procs), q = pick([0, 1]);
  if (q === 0) {
    var correct = "Layers of positive ions slide over each other while the delocalized electrons keep holding the layers together in their new positions";
    var ds = shuffle([
      "The metal melts under the hammer and then freezes again in the new shape",
      "Its atoms break apart and recombine in a different chemical compound",
      "Layers of ions slide, and like charges repel so the metal splits cleanly",
      "Its molecules are soft, so they squash flat under pressure and stay that way"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("A piece of " + m + " is " + p + " without breaking. Which statement explains this malleability?", correct, ds, "In " + m + " the positive ions are held together by the electron sea in all directions, not by attractions to specific neighbours. When a layer of ions slides, the delocalized electrons still surround the ions and hold the layers together in the new arrangement, so the metal changes shape instead of shattering like an ionic crystal.", { metal: m, proc: p });
  }
  var correct1 = "It keeps conducting, because the delocalized electrons can still move through the reshaped metal";
  var ds1 = shuffle([
    "It stops conducting, because bending uses up all of its free electrons",
    "It keeps conducting only if it is melted and cast again in the new shape",
    "It becomes an insulator, because sliding layers turn it into an ionic solid",
    "It conducts only along the direction in which it was hammered, and never across it"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("After a piece of " + m + " has been " + p + ", what happens to its ability to conduct electricity, and why?", correct1, ds1, "Changing the shape of " + m + " slides layers of ions but does not remove the electron sea. The delocalized electrons remain free to move through the whole piece in its new shape, so the reshaped metal still conducts electricity.", { metal: m, proc: p });
});

E("u2-45", 2, ["6.9"], 2, "var", varset([
  function () {
    var correct = "Atoms of a different size disrupt the regular layers, so the layers cannot slide as easily and the alloy is harder than the pure metal";
    var ds = ["The second metal removes electrons from the alloy, leaving a rigid ionic lattice", "The second metal forms covalent molecules inside the alloy that block all movement", "Alloys are softer than pure metals, because mixing always weakens a structure"];
    return mcq("Brass is an alloy of copper and zinc. It is harder than pure copper. Why does adding zinc make the metal harder?", correct, ds, "In a pure metal the ions are all the same size and sit in regular layers that slide fairly easily. Zinc atoms have a different size from copper atoms, so they distort the layers of the brass. Distorted layers cannot slide past each other as readily, which makes the alloy harder while it stays metallic.", {});
  },
  function () {
    var correct = "Carbon atoms sit in the gaps of the iron structure and disrupt its layers, making it harder for the layers to slide";
    var ds = ["Carbon reacts with all of the iron to form a brittle ionic compound with no metallic character", "Carbon removes the electron sea, and the steel is held together by covalent bonds instead", "Steel is harder because it contains more electrons per atom than iron does"];
    return mcq("Steel is an alloy of iron with a small amount of carbon. It is harder than pure iron. Which statement explains this?", correct, ds, "Pure iron has regular layers of same sized ions that can slide. The much smaller carbon atoms fit into gaps in the iron structure and distort the layers around them. With the layers disrupted, sliding is harder, so steel is harder and stronger than pure iron while still behaving as a metal.", {});
  },
  function () {
    var correct = "Bronze is still a metal: it has positive ions in a sea of delocalized electrons, so it conducts electricity and can be shaped";
    var ds = ["Bronze is an ionic compound, so it conducts only when molten", "Bronze is a molecular substance, so it is soft and does not conduct in any state", "Bronze conducts because the tin in it forms negative ions that move through the solid"];
    return mcq("Bronze is an alloy of copper and tin, used for bells and fittings. Which statement about bronze is correct?", correct, ds, "Mixing two metals gives an alloy, which keeps the metallic structure: positive ions of both metals in a shared sea of delocalized electrons. Bronze therefore conducts electricity, is malleable and has the hardness that comes from its disrupted layers.", {});
  },
  function () {
    var correct = "Mixing a second metal changes the structure, in this case giving a mixture that melts at a lower temperature than either pure metal alone";
    var ds = ["Solder melts lower because it is an ionic compound, and ionic compounds melt at low temperatures", "Solder melts lower because its covalent bonds are the weakest bonds known", "Solder is not really a metal, because it is mostly a molecular substance"];
    return mcq("Solder is an alloy used to join wires. It melts at a lower temperature than the pure metals it is made from. Which statement about alloys does this illustrate?", correct, ds, "An alloy is a mixture of metals, and its properties differ from the pure metals in it. Disrupting the regular structure changes melting behaviour as well as hardness. Solder is chosen because its lower melting point lets it melt and join wires without melting the wires themselves.", {});
  },
  function () {
    var correct = "The alloy keeps a sea of delocalized electrons, so it still conducts, and its disrupted layers make it harder than the pure metal";
    var ds = ["The alloy stops conducting, because two kinds of ions cannot share one electron sea", "The alloy becomes brittle like an ionic solid, because it contains two kinds of atoms", "The alloy conducts only in solution, because its ions must be free to move"];
    return mcq("An engineer replaces a pure metal part with an alloy of the same metal and a second metal. Which pair of predictions is correct?", correct, ds, "An alloy is still a metal, with positive ions in a sea of delocalized electrons, so it still conducts electricity in the solid state. The different sized atoms disrupt the regular layers, so sliding is harder and the alloy is usually harder than the pure metal.", {});
  },
  function () {
    var correct = "Sterling silver is mostly silver with some copper mixed in, which disrupts the layers and makes the jewellery harder while keeping the metallic shine and conductivity";
    var ds = ["Sterling silver is a compound of silver and copper ions joined by ionic bonds", "Sterling silver is harder because the copper turns the silver into a molecular solid", "Sterling silver contains no delocalized electrons, which is why it is harder"];
    return mcq("Sterling silver, used for jewellery, is silver alloyed with a small amount of copper. Which statement explains why jewellers prefer it to pure silver?", correct, ds, "Pure silver is quite soft because its regular layers of ions slide easily. Adding copper mixes in atoms of a different size, disrupting the layers of the sterling silver and making it harder and more durable. It remains a metal, with delocalized electrons giving it shine and conductivity.", {});
  }
]));

// 6.10 The dissolving process
E("u2-46", 2, ["6.10"], 1, "gen", function () {
  var pairs = [
    { su: "sugar", sv: "water" }, { su: "sodium chloride", sv: "water" }, { su: "ethanol", sv: "water" },
    { su: "potassium nitrate", sv: "water" }, { su: "glucose", sv: "water" }, { su: "iodine", sv: "hexane" },
    { su: "cooking oil", sv: "hexane" }, { su: "ammonium chloride", sv: "water" }, { su: "wax", sv: "gasoline" },
    { su: "methanol", sv: "water" }, { su: "naphthalene", sv: "hexane" }, { su: "sodium nitrate", sv: "water" },
    { su: "grease", sv: "gasoline" }, { su: "urea", sv: "water" }, { su: "magnesium sulfate", sv: "water" },
    { su: "acetone", sv: "water" }, { su: "potassium chloride", sv: "water" }, { su: "paint resin", sv: "paint thinner" },
    { su: "calcium chloride", sv: "water" }, { su: "benzoic acid in a suitable organic solvent", sv: "ethanol" }
  ];
  var p = pick(pairs), temp = pick([15, 20, 25, 30, 35]), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "Attractions between particles of the " + p.su + " are broken, attractions between particles of the " + p.sv + " are broken, and new attractions form between the solute and the solvent";
    ds = ["Only attractions between particles of the " + p.su + " are broken, and no new attractions form at all", "The covalent or ionic bonds inside the solute particles are broken and the atoms spread out separately", "The solvent particles join the solute particles to form one new compound with a new formula"];
  } else if (q === 1) {
    correct = "The particles of " + p.su + " separate from each other and become surrounded by particles of " + p.sv;
    ds = ["The particles of " + p.su + " melt, and the liquid solute sinks to the bottom of the container", "The particles of " + p.su + " disappear, because dissolving destroys matter", "The particles of " + p.sv + " are absorbed into the solute until the solute doubles in size"];
  } else {
    correct = "Forming new attractions between solute particles and solvent particles, which helps pay the energy cost of separating the original particles";
    ds = ["Breaking the bonds inside each solute molecule, which releases the atoms into the solvent", "Heating the solvent until it boils, which is the only way dissolving can occur", "Stirring the mixture, which is the step that supplies all of the energy for dissolving"];
  }
  return mcq("A sample of " + p.su + " is dissolving in " + p.sv + " at " + temp + " °C. " + (q === 0 ? "Which statement describes the attractions during dissolving?" : q === 1 ? "Which statement describes what happens to the solute particles?" : "Which step helps make dissolving energetically possible?"), correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "Dissolving is a rearrangement of attractions. Particles of " + p.su + " separate from each other and particles of " + p.sv + " move apart, which costs energy, while new solute to solvent attractions form and release energy. The particles themselves stay whole: no bonds inside a molecule are broken and no new compound is made.", { solute: p.su, solvent: p.sv, ask: q });
});

E("u2-47", 2, ["6.10"], 2, "gen", function () {
  var pairs = [
    { su: "sugar", sv: "water" }, { su: "sodium chloride", sv: "water" }, { su: "ethanol", sv: "water" },
    { su: "potassium nitrate", sv: "water" }, { su: "glucose", sv: "water" }, { su: "iodine", sv: "hexane" },
    { su: "cooking oil", sv: "hexane" }, { su: "ammonium chloride", sv: "water" }, { su: "wax", sv: "gasoline" },
    { su: "methanol", sv: "water" }, { su: "naphthalene", sv: "hexane" }, { su: "sodium nitrate", sv: "water" },
    { su: "grease", sv: "gasoline" }, { su: "urea", sv: "water" }, { su: "magnesium sulfate", sv: "water" },
    { su: "acetone", sv: "water" }, { su: "potassium chloride", sv: "water" }, { su: "calcium chloride", sv: "water" },
    { su: "sodium hydroxide pellets", sv: "water" }, { su: "citric acid", sv: "water" }
  ];
  var p = pick(pairs), q = pick([0, 1, 2, 3]);
  var correct, ds, ask;
  if (q === 0) {
    ask = "Which attractions are broken on the solute side during dissolving?";
    correct = "The attractions between neighbouring particles of " + p.su;
    ds = ["The bonds inside each particle of " + p.su, "The attractions between the container and the " + p.su, "No attractions at all are broken on the solute side"];
  } else if (q === 1) {
    ask = "Which attractions are broken on the solvent side during dissolving?";
    correct = "Some of the attractions between neighbouring particles of " + p.sv;
    ds = ["The bonds inside each molecule of " + p.sv, "The attractions between the " + p.sv + " and the air above it only", "No attractions at all are broken on the solvent side"];
  } else if (q === 2) {
    ask = "Which attractions form during dissolving?";
    correct = "New attractions between particles of " + p.su + " and particles of " + p.sv;
    ds = ["New covalent bonds that join " + p.su + " and " + p.sv + " into one compound", "New attractions between the solute particles and the glass of the container", "Attractions between the solute particles and the air above the mixture"];
  } else {
    ask = "Which bonds remain intact when " + p.su + " dissolves in " + p.sv + "?";
    correct = "The bonds inside each molecule or particle of " + p.su + " and of " + p.sv;
    ds = ["Only the attractions between solute particles remain intact", "Every bond and attraction in both substances remains intact", "No bonds of any kind remain intact once dissolving starts"];
  }
  return mcq("When " + p.su + " dissolves in " + p.sv + ", changes happen to the attractions in the mixture. " + ask, correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "Separate the two kinds of forces. Attractions between particles (intermolecular forces, or the lattice attractions in an ionic solute) are broken on both sides and replaced by new solute to solvent attractions. Bonds inside a particle (intramolecular bonds) are far stronger and stay intact, so dissolved particles keep their identity.", { solute: p.su, solvent: p.sv, ask: q });
});

E("u2-48", 2, ["6.10"], 2, "gen", function () {
  var comps = [
    { f: "sodium chloride", cat: "Na⁺", an: "Cl⁻" }, { f: "potassium nitrate", cat: "K⁺", an: "NO₃⁻" },
    { f: "magnesium sulfate", cat: "Mg²⁺", an: "SO₄²⁻" }, { f: "calcium chloride", cat: "Ca²⁺", an: "Cl⁻" },
    { f: "ammonium chloride", cat: "NH₄⁺", an: "Cl⁻" }, { f: "sodium nitrate", cat: "Na⁺", an: "NO₃⁻" },
    { f: "potassium chloride", cat: "K⁺", an: "Cl⁻" }, { f: "lithium chloride", cat: "Li⁺", an: "Cl⁻" },
    { f: "sodium bromide", cat: "Na⁺", an: "Br⁻" }, { f: "potassium sulfate", cat: "K⁺", an: "SO₄²⁻" }
  ];
  var grams = pick([5, 10, 15, 20, 25]), temp = pick([15, 20, 25, 30]);
  var c = pick(comps), q = pick([0, 1, 2]);
  var correct, ds;
  if (q === 0) {
    correct = "The oxygen ends of water molecules face the " + c.cat + " cations, and the hydrogen ends face the " + c.an + " anions";
    ds = ["The hydrogen ends of water molecules face both the cations and the anions", "The oxygen ends of water molecules face both the cations and the anions", "Water molecules keep their distance, because ions and water molecules do not attract each other"];
  } else if (q === 1) {
    correct = "Attractions between water molecules and the ions compete with the attractions in the lattice and pull ions away one by one";
    ds = ["Water molecules melt the surface of the solid, and the liquid compound mixes with the water", "Water molecules break the ions into neutral atoms, which then mix with the water", "The ions dissolve because they evaporate from the surface of the warm solid"];
  } else {
    correct = "Each dissolved ion becomes surrounded by a shell of water molecules, a process called hydration";
    ds = ["Each dissolved ion reacts with water to form a new neutral molecule", "Each dissolved ion collects a shell of other ions of the same charge", "Each dissolved ion loses its charge permanently when it enters the water"];
  }
  return mcq(grams + " g of " + c.f + " is stirred into water at " + temp + " °C and dissolves. " + (q === 0 ? "How do the water molecules arrange themselves around the ions?" : q === 1 ? "Why can water pull the ions out of the lattice?" : "What is the arrangement of water around a dissolved ion called, in descriptive terms?"), correct, shuffle(ds.filter(function (x) { return x !== correct; })).slice(0, 3), "Water is polar: its oxygen end carries a partial negative charge and its hydrogen ends carry partial positive charges. Oxygen ends attract cations such as " + c.cat + " and hydrogen ends attract anions such as " + c.an + ". These attractions compete with the lattice attractions of " + c.f + ", pull ions free, and surround each ion with water in hydration shells.", { compound: c.f, ask: q });
});

E("u2-49", 2, ["6.10"], 2, "gen", function () {
  var oils = ["olive oil", "canola oil", "mineral oil", "motor oil", "coconut oil", "sesame oil"];
  var nonpolars = ["hexane", "gasoline", "wax shavings", "grease", "naphthalene", "turpentine"];
  var ctxs = ["in a salad dressing bottle", "after an oil spill reaches a pond", "in a beaker during a mixing test", "when washing a greasy pan with plain water", "in a jar left standing on a shelf", "in a measuring cup after rinsing with water only", "on the surface of a rain puddle"];
  var o = pick(oils), np = pick(nonpolars), ctx = pick(ctxs), q = pick([0, 1]);
  if (q === 0) {
    var correct = "The molecules of " + o + " are nonpolar and water molecules are polar, so water molecules attract each other far more strongly than they attract the molecules of " + o;
    var ds = shuffle([
      "Oil and water repel because oil molecules carry a full negative charge",
      "Oil molecules are too large to fit between water molecules, whatever their polarity",
      "Water molecules cannot form any attractions, so nothing can mix with water",
      "Oil dissolves in water at first, but the solution separates again as it cools"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Oil and water do not mix, as seen " + ctx + ". Why?", correct, ds, "Mixing needs the new attractions formed to replace the ones broken. Water molecules hydrogen bond strongly to each other. Oil molecules are nonpolar and can offer water only weak dispersion attractions, so water molecules stay with each other and the oil is pushed into a separate layer.", { oil: o });
  }
  var correct1 = np + " dissolves in oil, because both are nonpolar and their molecules attract each other in a similar way";
  var ds1 = shuffle([
    np + " dissolves in water, because water dissolves every substance given enough stirring",
    np + " dissolves in neither, because nonpolar substances cannot dissolve in anything",
    np + " dissolves in water better than in oil, because water has the strongest attractions of any solvent",
    np + " dissolves in oil only after its covalent bonds are broken by the oil"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("A student tests the nonpolar substance " + np + " with two solvents, oil and water, " + ctx + ". Which prediction is correct?", correct1, ds1, "Like dissolves like. " + np + " is nonpolar, so it mixes with the nonpolar oil, where dispersion attractions between the molecules can replace the attractions broken on each side. In water it would have to break strong hydrogen bonds and gain only weak attractions in return, so it stays undissolved.", { substance: np });
});

E("u2-50", 2, ["6.10"], 3, "gen", function () {
  var solutes = [
    { f: "sugar", pol: true }, { f: "ethanol", pol: true }, { f: "glucose", pol: true }, { f: "acetone", pol: true },
    { f: "urea", pol: true }, { f: "methanol", pol: true }, { f: "citric acid", pol: true }, { f: "glycerol", pol: true },
    { f: "iodine", pol: false }, { f: "cooking oil", pol: false }, { f: "hexane", pol: false }, { f: "wax", pol: false },
    { f: "gasoline", pol: false }, { f: "naphthalene", pol: false }, { f: "grease", pol: false }, { f: "sulfur", pol: false }
  ];
  var solvents = [
    { f: "water", pol: true }, { f: "ethanol", pol: true }, { f: "methanol", pol: true },
    { f: "hexane", pol: false }, { f: "cooking oil", pol: false }, { f: "toluene", pol: false }
  ];
  var su = pick(solutes), q = pick([0, 1]);
  if (q === 0) {
    var sv = pick(solvents), ok = su.pol === sv.pol;
    var correct = ok
      ? "It dissolves readily, because solute and solvent are both " + (su.pol ? "polar" : "nonpolar") + ", so the new attractions formed can replace the attractions broken"
      : "It stays mostly undissolved, because the solute is " + (su.pol ? "polar" : "nonpolar") + " and the solvent is " + (sv.pol ? "polar" : "nonpolar") + ", so the new attractions formed are too weak to replace the attractions broken";
    var ds = shuffle([
      ok ? "It stays mostly undissolved, because a solute can never dissolve in a solvent of the same type" : "It dissolves readily, because every solute dissolves in every solvent with enough stirring",
      "It dissolves only after its internal covalent bonds are broken by the solvent",
      "It reacts with the solvent to form a new compound with a new formula",
      "It dissolves readily in every case, because dissolving never depends on polarity"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Predict what happens when " + su.f + ", a " + (su.pol ? "polar" : "nonpolar") + " substance, is stirred into " + sv.f + ", a " + (sv.pol ? "polar" : "nonpolar") + " solvent.", correct, ds, "Use the like dissolves like rule. Dissolving works when the attractions formed between solute and solvent can replace the attractions broken in each pure substance. Here the solute is " + (su.pol ? "polar" : "nonpolar") + " and the solvent is " + (sv.pol ? "polar" : "nonpolar") + ", so the prediction follows from whether their types match.", { solute: su.f, solvent: sv.f });
  }
  var good = solvents.filter(function (x) { return x.pol === su.pol; });
  var bad = solvents.filter(function (x) { return x.pol !== su.pol; });
  var correctSv = pick(good).f;
  var ds2 = bad.map(function (x) { return x.f; });
  return mcq("Which solvent will dissolve " + su.f + ", a " + (su.pol ? "polar" : "nonpolar") + " substance, most readily?", correctSv, ds2, "Choose a solvent of the same type as the solute, so that solute to solvent attractions can replace the attractions broken during dissolving. " + su.f + " is " + (su.pol ? "polar" : "nonpolar") + ", and of the options only " + correctSv + " is of the matching type, following the rule that like dissolves like.", { solute: su.f, solvent: correctSv });
});

// 6.11 Molar solubility
E("u2-51", 2, ["6.11"], 2, "gen", function () {
  var salts = [
    { f: "NaCl", comp: [["Na", 1], ["Cl", 1]] }, { f: "KCl", comp: [["K", 1], ["Cl", 1]] },
    { f: "KBr", comp: [["K", 1], ["Br", 1]] }, { f: "NaBr", comp: [["Na", 1], ["Br", 1]] },
    { f: "NaNO₃", comp: [["Na", 1], ["N", 1], ["O", 3]] }, { f: "KNO₃", comp: [["K", 1], ["N", 1], ["O", 3]] },
    { f: "AgNO₃", comp: [["Ag", 1], ["N", 1], ["O", 3]] }, { f: "CaCl₂", comp: [["Ca", 1], ["Cl", 2]] },
    { f: "MgCl₂", comp: [["Mg", 1], ["Cl", 2]] }, { f: "Na₂SO₄", comp: [["Na", 2], ["S", 1], ["O", 4]] },
    { f: "Ca(NO₃)₂", comp: [["Ca", 1], ["N", 2], ["O", 6]] }, { f: "NH₄Cl", comp: [["N", 1], ["H", 4], ["Cl", 1]] }
  ];
  var s = pick(salts);
  var M = 0; s.comp.forEach(function (c) { M += CHEM_AM[c[0]] * c[1]; });
  var target = pick([0.05, 0.10, 0.20, 0.25, 0.40, 0.50, 0.80, 1.20]);
  var per100 = pick([true, false]);
  var gL = target * M;
  var given = per100 ? iF(gL / 10) + " g per 100 mL" : iF(gL) + " g per L";
  var ans = target;
  return numq("The solubility of " + s.f + " is " + given + " at the stated temperature. The molar mass of " + s.f + " is " + fmtF(M, 2) + " g/mol. Calculate its molar solubility in mol/L.", ans, Math.max(0.01, ans * 0.02), "Convert the mass solubility to a per litre basis first. " + (per100 ? "A solubility of " + iF(gL / 10) + " g per 100 mL is " + iF(gL) + " g in 1000 mL, that is, per litre." : "The solubility is already given per litre as " + iF(gL) + " g/L.") + " Divide the mass per litre by the molar mass: " + iF(gL) + " g / " + fmtF(M, 2) + " g/mol = <b>" + F3(ans) + " mol/L</b>. That is the molar solubility.", { salt: s.f, M: fmtF(M, 2) });
});

E("u2-52", 2, ["6.11"], 2, "gen", function () {
  var salts = [
    { f: "LiCl", comp: [["Li", 1], ["Cl", 1]] }, { f: "NaF", comp: [["Na", 1], ["F", 1]] },
    { f: "KI", comp: [["K", 1], ["I", 1]] }, { f: "MgSO₄", comp: [["Mg", 1], ["S", 1], ["O", 4]] },
    { f: "CaBr₂", comp: [["Ca", 1], ["Br", 2]] }, { f: "ZnCl₂", comp: [["Zn", 1], ["Cl", 2]] },
    { f: "FeCl₂", comp: [["Fe", 1], ["Cl", 2]] }, { f: "CuSO₄", comp: [["Cu", 1], ["S", 1], ["O", 4]] },
    { f: "BaCl₂", comp: [["Ba", 1], ["Cl", 2]] }, { f: "Na₂CO₃", comp: [["Na", 2], ["C", 1], ["O", 3]] }
  ];
  var s = pick(salts);
  var M = 0; s.comp.forEach(function (c) { M += CHEM_AM[c[0]] * c[1]; });
  var target = pick([0.10, 0.15, 0.20, 0.30, 0.40, 0.60, 0.75, 1.20]);
  var temp = pick([20, 25, 30]);
  var g100 = target * M / 10;
  var ans = target;
  return numq("At " + temp + " °C, a saturated solution of " + s.f + " contains " + iF(g100) + " g of the salt in every 100 mL of solution. The molar mass of " + s.f + " is " + fmtF(M, 2) + " g/mol. What is the molar solubility of " + s.f + " in mol/L at this temperature?", ans, Math.max(0.01, ans * 0.02), "Scale the mass up to one litre: " + iF(g100) + " g per 100 mL means 10 x " + iF(g100) + " = " + iF(g100 * 10) + " g per litre. Convert mass to amount by dividing by the molar mass: " + iF(g100 * 10) + " g / " + fmtF(M, 2) + " g/mol = <b>" + F3(ans) + " mol/L</b>. That amount per litre is the molar solubility.", { salt: s.f, M: fmtF(M, 2), temp: temp });
});

E("u2-53", 2, ["6.11"], 3, "gen", function () {
  var salts = [
    { f: "NaCl", comp: [["Na", 1], ["Cl", 1]] }, { f: "KNO₃", comp: [["K", 1], ["N", 1], ["O", 3]] },
    { f: "CuSO₄", comp: [["Cu", 1], ["S", 1], ["O", 4]] }, { f: "MgSO₄", comp: [["Mg", 1], ["S", 1], ["O", 4]] },
    { f: "CaCl₂", comp: [["Ca", 1], ["Cl", 2]] }, { f: "KI", comp: [["K", 1], ["I", 1]] },
    { f: "Na₂SO₄", comp: [["Na", 2], ["S", 1], ["O", 4]] }, { f: "BaCl₂", comp: [["Ba", 1], ["Cl", 2]] },
    { f: "AgNO₃", comp: [["Ag", 1], ["N", 1], ["O", 3]] }, { f: "ZnCl₂", comp: [["Zn", 1], ["Cl", 2]] }
  ];
  var s = pick(salts);
  var M = 0; s.comp.forEach(function (c) { M += CHEM_AM[c[0]] * c[1]; });
  var target = pick([0.20, 0.25, 0.40, 0.50, 0.80, 1.20]);
  var vol = pick([200, 250, 400, 500, 1000]);
  var mass = target * M * vol / 1000;
  var askMoles = pick([true, false]);
  if (askMoles) {
    var ansM = target * vol / 1000;
    return numq("A saturated solution of " + s.f + " is prepared with a volume of " + vol + " mL. It contains " + iF(mass) + " g of dissolved " + s.f + ". The molar mass of " + s.f + " is " + fmtF(M, 2) + " g/mol. How many moles of " + s.f + " are dissolved in the solution?", ansM, Math.max(0.01, ansM * 0.02), "Amount in moles is mass divided by molar mass. The amount dissolved is " + iF(mass) + " g / " + fmtF(M, 2) + " g/mol = <b>" + F3(ansM) + " mol</b>. The volume is not needed for this question, but it is consistent with a molar solubility of " + F3(target) + " mol/L.", { salt: s.f, vol: vol });
  }
  var ans = target;
  var amt = sfR(sfR(mass, 4) / M, 4);
  return numq("A saturated solution of " + s.f + " is prepared with a volume of " + vol + " mL. It contains " + iF(mass) + " g of dissolved " + s.f + ". The molar mass of " + s.f + " is " + fmtF(M, 2) + " g/mol. Calculate the molar solubility of " + s.f + " in mol/L.", ans, Math.max(0.01, ans * 0.02), "First find the amount dissolved: " + iF(mass) + " g / " + fmtF(M, 2) + " g/mol = " + iF(amt) + " mol. Molar solubility is amount per litre of solution, and the volume is " + vol + " mL, which is " + F3(vol / 1000) + " L. Dividing gives " + iF(amt) + " mol / " + F3(vol / 1000) + " L = <b>" + F3(ans) + " mol/L</b>.", { salt: s.f, vol: vol });
});

// 6.12 Effect of solutes on the melting point of ice
E("u2-54", 2, ["6.12"], 2, "gen", function () {
  var salts = ["sodium chloride", "calcium chloride", "magnesium chloride", "potassium chloride"];
  var ctxs = ["spread on a highway before a storm", "scattered on a front step", "packed around an ice cream making canister", "spread on a parking lot", "used in a homemade ice pack", "spread on an airport runway", "scattered on a sidewalk", "mixed with ice in a cooler experiment"];
  var s = pick(salts), ctx = pick(ctxs), q = pick([0, 1]);
  if (q === 0) {
    var correct = "The melting point of the ice is lowered, so the ice can melt at a temperature below 0 °C";
    var ds = shuffle([
      "The melting point of the ice is raised, so the ice becomes harder and colder",
      "The salt heats the ice by reacting with it, and the reaction melts the ice",
      "The salt changes ice into a different compound with a higher melting point",
      "Nothing changes, because a dissolved substance cannot affect the melting point of ice"
    ].filter(function (x) { return x !== correct; })).slice(0, 3);
    return mcq("Salt, for example " + s + ", is " + ctx + " where it mixes with ice or with a thin film of water on ice. What does the dissolved salt do to the ice?", correct, ds, "When " + s + " dissolves in the water film on ice, its particles lower the temperature at which ice and water can stay in balance. Ice can then melt at temperatures below the normal melting point of 0 °C. This is the freezing point depression effect, described qualitatively: dissolved particles lower the melting point.", { salt: s, ctx: ctx });
  }
  var correct1 = "Dissolved particles interfere with water molecules joining the regular ice crystal, so the ice melts and reforms at a lower temperature";
  var ds1 = shuffle([
    "Dissolved particles supply heat to the ice, because every salt releases heat when it touches ice",
    "Dissolved particles make water molecules heavier, so the ice sinks and melts from below",
    "Dissolved particles turn the ice into salt crystals, which have a lower melting point",
    "Dissolved particles remove all attractions between water molecules, so the ice falls apart at any temperature"
  ].filter(function (x) { return x !== correct1; })).slice(0, 3);
  return mcq("Why does ice in contact with a solution of " + s + ", as when salt is " + ctx + ", melt below 0 °C?", correct1, ds1, "Pure ice melts at 0 °C because water molecules leave and join its crystal at equal rates there. Dissolved particles of " + s + " get in the way of water molecules settling into the ordered ice crystal, so the balance point shifts to a lower temperature. The melting point of the ice is depressed by the dissolved solute.", { salt: s, ctx: ctx });
});

E("u2-55", 2, ["6.12"], 2, "gen", function () {
  var solutes = [
    { f: "sugar (does not split into ions)", p: 1 }, { f: "glucose (does not split into ions)", p: 1 },
    { f: "sodium chloride (splits into 2 particles)", p: 2 }, { f: "potassium chloride (splits into 2 particles)", p: 2 },
    { f: "calcium chloride (splits into 3 particles)", p: 3 }, { f: "magnesium chloride (splits into 3 particles)", p: 3 },
    { f: "sodium sulfate (splits into 3 particles)", p: 3 }
  ];
  var concs = [0.5, 1.0, 1.5, 2.0];
  var a = pick(solutes), b = pick(solutes), ca = pick(concs), cb = pick(concs), tries = 0;
  while ((a === b && ca === cb) || a.p * ca === b.p * cb) { b = pick(solutes); cb = pick(concs); if (++tries > 40) { cb = ca === 2.0 ? 0.5 : 2.0; b = solutes[0] === a ? solutes[2] : solutes[0]; } }
  var aWins = a.p * ca > b.p * cb;
  var winner = aWins ? "Solution A" : "Solution B";
  var correct = winner + ", because it has the greater total concentration of dissolved particles";
  var ds = shuffle([
    (aWins ? "Solution B" : "Solution A") + ", because it has the greater total concentration of dissolved particles",
    "Both solutions give the same melting point, because equal volumes of solution always behave the same way",
    "Pure water with no solute, because adding solute always raises the melting point of ice",
    winner + ", because its solute has the greatest molar mass of the two solutes"
  ].filter(function (x) { return x !== correct; })).slice(0, 3);
  return mcq("Solution A is made with " + F3(ca) + " mol/L of " + a.f + ". Solution B is made with " + F3(cb) + " mol/L of " + b.f + ". Equal samples of ice are placed in each solution. Which solution gives the lower melting point for the ice?", correct, ds, "The size of the melting point lowering depends on the total concentration of dissolved particles, counting each ion separately when a solute splits in solution. Solution A has " + F3(ca) + " x " + a.p + " = " + F3(a.p * ca) + " mol/L of particles, and solution B has " + F3(cb) + " x " + b.p + " = " + F3(b.p * cb) + " mol/L of particles. The solution with more particles per litre, " + winner + ", lowers the melting point more.", { a: a.f, b: b.f });
});

E("u2-56", 2, ["6.12"], 3, "var", varset([
  function () {
    var correct = "Calcium chloride gives three dissolved particles per formula unit and keeps working at temperatures where sodium chloride has largely stopped melting ice";
    var ds = ["Calcium chloride is a darker colour, so it absorbs more sunlight and warms the road", "Calcium chloride raises the melting point of ice more than sodium chloride does", "Sodium chloride cannot dissolve in water at all, so it never affects ice"];
    return mcq("Highway crews switch from sodium chloride to calcium chloride during very cold weather. Which statement best explains the switch?", correct, ds, "Both salts work by lowering the melting point of ice, and the effect grows with the number of dissolved particles. One formula unit of calcium chloride produces three ions in solution, compared with two for sodium chloride, and calcium chloride continues to dissolve and depress the melting point at lower temperatures, so it keeps melting ice when sodium chloride is no longer effective.", {});
  },
  function () {
    var correct = "The salt dissolves in the water from the ice and lowers its melting point, so the mixture can stay liquid well below 0 °C and draw heat from the ice cream mixture";
    var ds = ["The salt insulates the canister, keeping outside warmth away from the ice cream", "The salt raises the temperature of the ice by reacting with it and releasing stored sunlight", "The salt turns the ice into a solid with a higher melting point, which feels colder"];
    return mcq("In a hand cranked ice cream maker, ice is mixed with salt around the canister. The mixture gets colder than 0 °C. Why is the salt added?", correct, ds, "Salt dissolves in the film of water on the ice and lowers the melting point of the ice. The ice then melts at a temperature well below 0 °C, and melting draws heat from the surroundings, including the ice cream mixture in the canister. The salty ice bath can therefore reach temperatures low enough to freeze the ice cream.", {});
  },
  function () {
    var correct = "Sand gives grip on the ice surface but does not dissolve, so it cannot lower the melting point of the ice";
    var ds = ["Sand dissolves in the surface water and lowers the melting point more than salt does", "Sand works in exactly the same way as salt, by depressing the melting point of ice", "Sand melts ice by absorbing water from the air and releasing heat"];
    return mcq("Sand is sometimes spread on icy roads along with, or instead of, salt. How does the action of sand differ from the action of salt?", correct, ds, "Salt acts chemically on the melting point: it dissolves in surface water and depresses the melting point of ice, so the ice itself melts below 0 °C. Sand does not dissolve and does not change the melting point at all. It simply sits on the ice and provides traction for tires and shoes.", {});
  },
  function () {
    var correct = "Up to a point, more dissolved salt gives more particles in solution, which depresses the melting point further, but the effect levels off once the solution is saturated";
    var ds = ["Adding more salt always lowers the melting point by the same amount per spoonful, with no limit", "Adding more salt eventually raises the melting point again, because the particles pack the ice tighter", "Only the first few grains of salt matter, and every grain after that has exactly the same effect as the first"];
    return mcq("A student adds salt to ice in stages and measures the lowest temperature reached each time. Which statement describes how the effect changes as more and more salt is added?", correct, ds, "The melting point depression depends on the concentration of dissolved particles. Adding salt raises that concentration and lowers the melting point further, but only while the extra salt can dissolve. Once the solution is saturated at that temperature, extra solid salt adds no more dissolved particles and the lowering levels off.", {});
  },
  function () {
    var correct = "The brine forms a salt solution on the pavement before ice can bond to it, and the dissolved particles keep the surface water from freezing at 0 °C";
    var ds = ["The brine paints the road a dark colour, so the sun melts any ice that forms", "The brine seals the pavement so that no water can ever reach its surface", "The brine raises the melting point of ice, so ice forms as a loose powder instead of a sheet"];
    return mcq("Some road crews spray salt brine on dry pavement before a storm arrives. Why does pre treating the road help?", correct, ds, "The brine leaves a layer of salt solution on the pavement. When snow or freezing rain arrives, the dissolved particles depress the melting point, so a bonded sheet of ice does not form at 0 °C and the snow stays slushy and easier to plow. The treatment works because of the dissolved particles, not the colour or a seal.", {});
  },
  function () {
    var correct = "The salt lowers the melting point of the surface ice, a film of solution forms, and traffic and plows can then break up and clear the weakened ice layer";
    var ds = ["The salt instantly melts the whole ice layer, however thick, as soon as it touches it", "The salt makes the ice expand and crack into pieces by raising its melting point", "The salt dissolves the pavement coating under the ice, so the ice slides off the road"];
    return mcq("Salt spread on an already icy road does not clear the road by itself, but it still helps the plows. Which statement explains its role?", correct, ds, "Salt can only act where it dissolves, at the surface of the ice and in any liquid film present. There it lowers the melting point, producing a solution film that weakens the bond between the ice and the road. Traffic and plow blades can then break up and remove the ice layer mechanically.", {});
  }
]));

// 6.13 Classify substances by their properties
E("u2-57", 2, ["6.13"], 2, "gen", function () {
  var types = [
    { t: "ionic", mp: function () { return ri(700, 1600); }, cs: "does not conduct", cm: "conducts", sol: "dissolves in water" },
    { t: "molecular", mp: function () { return ri(-120, 90); }, cs: "does not conduct", cm: "does not conduct", sol: "varies: some dissolve in water and some do not" },
    { t: "metallic", mp: function () { return ri(400, 1500); }, cs: "conducts", cm: "conducts", sol: "does not dissolve in water" }
  ];
  var ty = pick(types), label = ri(100, 999);
  var mp = ty.mp();
  var others = shuffle(["ionic", "molecular", "metallic", "a covalent network solid"].filter(function (x) { return x !== ty.t; })).slice(0, 3);
  var prompt = "Sample " + label + " is tested in a laboratory. Melting point: " + mp + " °C. Conductivity as a solid: " + ty.cs + ". Conductivity when molten or in aqueous solution: " + ty.cm + ". Solubility in water: " + ty.sol + ". How should sample " + label + " be classified?";
  return mcq(prompt, ty.t, others, "Match the pattern of evidence to a structure type. A solid that conducts in every state has mobile electrons and is metallic. A solid that conducts only when molten or dissolved has ions locked in a lattice and is ionic. A substance that never conducts has neutral molecules and is molecular. Sample " + label + " shows the " + ty.t + " pattern: conductivity as a solid is described as " + ty.cs + " and conductivity when molten or in solution as " + ty.cm + ".", { type: ty.t, mp: mp });
});

E("u2-58", 2, ["6.13"], 2, "gen", function () {
  var types = [
    { t: "ionic", just: "it conducts only when molten or in solution, because its ions are locked in a lattice as a solid" },
    { t: "molecular", just: "it never conducts, because its particles are neutral molecules with no mobile charged particles" },
    { t: "metallic", just: "it conducts as a solid, because its delocalized electrons move through the structure" }
  ];
  var data = {
    ionic: { mp: function () { return ri(650, 1550); }, cs: "none", cm: "strong", sol: "dissolves in water" },
    molecular: { mp: function () { return ri(-100, 110); }, cs: "none", cm: "none", sol: "partly dissolves in water" },
    metallic: { mp: function () { return ri(350, 1450); }, cs: "strong", cm: "strong", sol: "does not dissolve in water" }
  };
  var ty = pick(types), d = data[ty.t], letter = pick(["A", "B", "C", "D"]);
  var correct = "Classify it as " + ty.t + ", because " + ty.just;
  var ds = types.filter(function (x) { return x.t !== ty.t; }).map(function (x) { return "Classify it as " + x.t + ", because " + x.just; });
  ds.push("Classify it as a mixture, because no single test can ever identify a substance type");
  var prompt = "Unknown sample " + letter + " gives these results. Melting point: " + d.mp() + " °C. Conductivity as a solid: " + d.cs + ". Conductivity when molten or in aqueous solution: " + d.cm + ". Solubility in water: " + d.sol + ". Which classification and justification are both correct?";
  return mcq(prompt, correct, shuffle(ds).slice(0, 3), "Each classification carries its own signature in the conductivity tests. Ions conduct only when free to move, metals conduct as solids through delocalized electrons, and molecular substances never conduct. Sample " + letter + " matches the " + ty.t + " signature, since " + ty.just + ".", { type: ty.t });
});

E("u2-59", 2, ["6.13"], 2, "gen", function () {
  var ty = pick(["ionic", "molecular", "metallic"]);
  var solidR, solR, mp, sol;
  if (ty === "ionic") { solidR = "0.00"; solR = fmtF(rf(5, 20), 2); mp = ri(680, 1500); sol = "dissolves in water"; }
  else if (ty === "molecular") { solidR = "0.00"; solR = fmtF(rf(0, 0.02), 2); mp = ri(-110, 100); sol = "may or may not dissolve in water"; }
  else { solidR = fmtF(rf(10, 50), 2); solR = fmtF(rf(8, 40), 2); mp = ri(380, 1400); sol = "does not dissolve in water"; }
  var batch = ri(10, 99);
  var others = shuffle(["ionic", "molecular", "metallic", "a covalent network solid"].filter(function (x) { return x !== ty; })).slice(0, 3);
  var prompt = "Batch " + batch + " is tested with a conductivity meter that reads in relative units. Melting point: " + mp + " °C. Conductivity reading as a solid: " + solidR + ". Conductivity reading when molten or in aqueous solution: " + solR + ". Solubility in water: " + sol + ". How should the substance in batch " + batch + " be classified?";
  return mcq(prompt, ty, others, "Read the pattern, not the size of any one number alone. A reading of about zero in the solid state that rises when molten or dissolved means ions freed from a lattice: an ionic substance. Readings near zero in both states mean neutral molecules: a molecular substance. A strong reading in the solid state means delocalized electrons: a metallic substance. Batch " + batch + " shows the " + ty + " pattern.", { type: ty });
});

E("u2-60", 2, ["6.13"], 3, "gen", function () {
  var types = [
    { t: "ionic", mp: function () { return ri(700, 1600); }, cs: "does not conduct", cm: "conducts", sol: "dissolves in water", extra: "hard and brittle", just: "its ions are locked in a lattice as a solid but move when molten or dissolved" },
    { t: "molecular", mp: function () { return ri(-120, 95); }, cs: "does not conduct", cm: "does not conduct", sol: "varies with the solvent", extra: "soft and easily scratched", just: "it is made of neutral molecules held by weak forces, with no mobile charged particles in any state" },
    { t: "metallic", mp: function () { return ri(400, 1500); }, cs: "conducts", cm: "conducts", sol: "does not dissolve in water", extra: "shiny and malleable", just: "its delocalized electrons carry current through the solid and let its layers slide" }
  ];
  var ty = pick(types), label = ri(200, 899);
  var correct = ty.t + ": " + ty.just;
  var others = types.filter(function (x) { return x.t !== ty.t; }).map(function (x) { return x.t + ": " + x.just; });
  var wrongJust = types.filter(function (x) { return x.t !== ty.t; })[0];
  others.push(ty.t + ": " + wrongJust.just);
  var prompt = "A full property table is collected for sample " + label + ". Melting point: " + ty.mp() + " °C. Conductivity as a solid: " + ty.cs + ". Conductivity when molten or in aqueous solution: " + ty.cm + ". Solubility in water: " + ty.sol + ". Appearance and handling: " + ty.extra + ". Which classification, paired with its correct justification, fits all of the evidence?";
  return mcq(prompt, correct, shuffle(others).slice(0, 3), "Check every row of the table against each structure model. The conductivity pattern fixes the particle type, and the melting point, solubility and handling evidence must agree with it. Sample " + label + " is " + ty.t + ", because " + ty.just + ". Options that pair the right class with the wrong justification, or the wrong class with any justification, fail at least one row of evidence.", { type: ty.t });
});

E("u2-61", 2, ["6.13"], 3, "gen", function () {
  var patterns = {
    ionic: { mp: function () { return ri(700, 1600); }, cs: "does not conduct", cm: "conducts", sol: "dissolves in water" },
    molecular: { mp: function () { return ri(-120, 90); }, cs: "does not conduct", cm: "does not conduct", sol: "varies with the solvent" },
    metallic: { mp: function () { return ri(400, 1500); }, cs: "conducts", cm: "conducts", sol: "does not dissolve in water" }
  };
  var two = shuffle(["ionic", "molecular", "metallic"]).slice(0, 2);
  var A = two[0], B = two[1], pa = patterns[A], pb = patterns[B];
  var correct = "Sample A is " + A + " and sample B is " + B;
  var cand = [
    "Sample A is " + B + " and sample B is " + A,
    "Sample A is " + A + " and sample B is " + A,
    "Sample A is " + B + " and sample B is " + B,
    "Both samples are mixtures and cannot be classified from property evidence"
  ];
  var ds = shuffle(cand.filter(function (x) { return x !== correct; })).slice(0, 3);
  var prompt = "Two samples are tested. Sample A: melting point " + pa.mp() + " °C, conductivity as a solid: " + pa.cs + ", conductivity when molten or in solution: " + pa.cm + ", solubility in water: " + pa.sol + ". Sample B: melting point " + pb.mp() + " °C, conductivity as a solid: " + pb.cs + ", conductivity when molten or in solution: " + pb.cm + ", solubility in water: " + pb.sol + ". Which combined classification is correct?";
  return mcq(prompt, correct, ds, "Classify each sample separately using its conductivity pattern. Sample A shows the pattern of a " + A + " substance (solid conductivity: " + pa.cs + "; molten or solution conductivity: " + pa.cm + "). Sample B shows the pattern of a " + B + " substance (solid conductivity: " + pb.cs + "; molten or solution conductivity: " + pb.cm + "). Combining the two results gives the correct option.", { a: A, b: B });
});
