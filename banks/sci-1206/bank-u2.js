// CRMARKS: sci-u2-cr-naming=4
// CRMARKS: sci-u2-cr-balance=3
// CRMARKS: sci-u2-cr-rates=3
// Science 1206 Unit 2 bank: Chemical Reactions (SC10.8.1 to 8.6).
// Original entries written for this app from the question types in
// the source analysis. Chemistry is the course's generator showcase:
// naming, formulas, balancing and classification are generated from
// the ion and species tables in bank-helpers.js and validated by
// brute-force draws; the balancer solves coefficients by search and
// every generated equation is verified atom by atom before use.

function s6ionName(cat, an) { return cat.name + " " + an.name; }
function s6ionFormula(cat, an) { return s6fsub(s6formula(cat, an)); }

/* ---------- SC10.8.1 Naming and formulas ---------- */

E("sci-u2-name-simple", 2, ["SC10.8.1"], 1, "gen", function () {
  var cat = s6pick(S6_CATIONS), an = s6pick(S6_ANIONS);
  var f = s6ionFormula(cat, an), nm = s6ionName(cat, an);
  var d1 = s6ionName(s6pick(S6_CATIONS.filter(function (c) { return c !== cat; })), an);
  var d2 = s6ionName(cat, s6pick(S6_ANIONS.filter(function (a) { return a !== an; })));
  var d3 = s6ionName(s6pick(S6_CATIONS.filter(function (c) { return c !== cat; })), s6pick(S6_ANIONS.filter(function (a) { return a !== an; })));
  var dis = [d1, d2, d3].filter(function (x, i, a) { return x !== nm && a.indexOf(x) === i; });
  while (dis.length < 3) dis.push("sodium chloride");
  return mcq("What is the name of the compound " + f + "?",
    nm, dis.slice(0, 3),
    "The cation (positive ion) is named first: " + cat.sym + " is " + cat.name + ". The anion is " + an.sym + ", named " + an.name + " (a nonmetal's name ends in -ide in a binary compound). Together: " + nm + ".",
    { f: f, nm: nm });
}, ["Name the positive ion first, then the negative ion with its -ide ending."]);

E("sci-u2-name-advanced", 2, ["SC10.8.1"], 2, "gen", function () {
  var useMulti = Math.random() < 0.5;
  var cat, an;
  if (useMulti) { cat = s6pick(S6_CATIONS_MULTI); an = s6pick(S6_ANIONS.concat(S6_ANIONS_POLY)); }
  else { cat = Math.random() < 0.4 ? S6_NH4 : s6pick(S6_CATIONS); an = s6pick(S6_ANIONS_POLY); }
  var f = s6ionFormula(cat, an), nm = s6ionName(cat, an);
  var dis = [];
  if (useMulti) {
    var sib = S6_CATIONS_MULTI.filter(function (c) { return c.sym === cat.sym && c !== cat; })[0];
    if (sib) dis.push(s6ionName(sib, an));
  }
  dis.push(s6ionName(cat, s6pick(S6_ANIONS.concat(S6_ANIONS_POLY).filter(function (a) { return a !== an; }))));
  dis.push(s6ionName(s6pick(S6_CATIONS.filter(function (c) { return c.name !== cat.name; })), an));
  dis = dis.filter(function (x, i, a) { return x !== nm && a.indexOf(x) === i; });
  while (dis.length < 3) dis.push("iron(II) oxide");
  return mcq("What is the name of the compound " + f + "?",
    nm, dis.slice(0, 3),
    "Read the ions from the formula: the cation is " + cat.name + " (" + cat.sym + ", charge " + cat.chg + "+)" + (useMulti ? "; the Roman numeral is required because this metal forms more than one ion" : "") + ", and the anion is " + an.name + ". Cation first, then anion: " + nm + ".",
    { f: f, nm: nm });
}, ["Check whether the metal is multivalent: if it is, the name must carry the Roman numeral for its charge."]);

E("sci-u2-formula-simple", 2, ["SC10.8.1"], 1, "gen", function () {
  var cat = s6pick(S6_CATIONS), an = s6pick(S6_ANIONS);
  var right = s6ionFormula(cat, an), nm = s6ionName(cat, an);
  var swapped = s6fsub(an.sym + s6sub(cat.chg === 1 && an.chg === 1 ? 1 : an.chg) + cat.sym + s6sub(cat.chg === 1 && an.chg === 1 ? 1 : cat.chg));
  var oneOne = s6fsub(cat.sym + an.sym);
  var unreduced = s6fsub(cat.sym + s6sub(an.chg * 2 === 2 ? 1 : an.chg) + an.sym + s6sub(cat.chg));
  var dis = s6dis(right, [swapped, oneOne, unreduced, s6fsub(cat.sym + s6sub(an.chg + 1) + an.sym + s6sub(cat.chg)), s6fsub(cat.sym + "2" + an.sym + "2"), s6fsub(cat.sym + "3" + an.sym), s6fsub(cat.sym + an.sym + "2")], 3);
  return mcq("What is the chemical formula for " + nm + "?",
    right, dis.slice(0, 3),
    nm + " contains " + cat.name + " ions (" + cat.sym + ", " + cat.chg + "+) and " + an.name + " ions (" + an.sym + ", " + an.chg + "-). The charges must balance to zero: cross the charges down as subscripts and reduce, giving " + right + ". The cation is always written first.",
    { nm: nm, f: right });
}, ["Cross the charges: the cation's charge becomes the anion's subscript and the reverse, then reduce to the smallest whole numbers."]);

E("sci-u2-formula-poly", 2, ["SC10.8.1"], 2, "gen", function () {
  var cat = Math.random() < 0.35 ? S6_NH4 : s6pick(S6_CATIONS.concat(S6_CATIONS_MULTI));
  var an = s6pick(S6_ANIONS_POLY);
  var right = s6ionFormula(cat, an), nm = s6ionName(cat, an);
  var g = s6gcd(cat.chg, an.chg), nc = an.chg / g, na = cat.chg / g;
  var noBracket = s6fsub(cat.sym + s6sub(nc) + an.sym.replace(/\d/g, function (d) { return d; }) + s6sub(na));
  var flatAn = an.sym.replace(/(\d)/g, function (d) { return String(Number(d) * (na > 1 ? na : 1)); });
  var pairCands = [[2, 1], [1, 2], [2, 2], [3, 1], [1, 3], [3, 2], [2, 3]].map(function (pr) {
    var i = pr[0], j = pr[1];
    var anPart = (j > 1 && an.poly) ? "(" + an.sym + ")" + s6sub(j) : an.sym + s6sub(j);
    return s6fsub(cat.sym + s6sub(i) + anPart);
  });
  var dis = s6dis(right, pairCands.concat([
    noBracket,
    s6fsub(cat.sym + s6sub(nc) + flatAn),
    s6fsub(cat.sym + an.sym)
  ]), 3);
  return mcq("What is the chemical formula for " + nm + "?",
    right, dis.slice(0, 3),
    "The ions are " + cat.name + " (" + cat.sym + ", " + cat.chg + "+) and " + an.name + " (" + an.sym + ", " + an.chg + "-). Balancing charges gives " + nc + " cation(s) for every " + na + " anion(s)" + (na > 1 && an.poly ? ", and because more than one " + an.name + " ion is needed, the polyatomic ion goes in brackets with the subscript outside" : "") + ": " + right + ".",
    { nm: nm, f: right });
}, ["Brackets appear only when a polyatomic ion is needed more than once, and the subscript goes outside the bracket."]);

var S6_MOLECULAR = [
  { f: "CO", n: "carbon monoxide" }, { f: "CO2", n: "carbon dioxide" },
  { f: "N2O", n: "dinitrogen monoxide" }, { f: "NO", n: "nitrogen monoxide" },
  { f: "NO2", n: "nitrogen dioxide" }, { f: "SO2", n: "sulfur dioxide" },
  { f: "SO3", n: "sulfur trioxide" }, { f: "PCl3", n: "phosphorus trichloride" },
  { f: "CCl4", n: "carbon tetrachloride" }, { f: "SF6", n: "sulfur hexafluoride" },
  { f: "N2O4", n: "dinitrogen tetroxide" }, { f: "P2O5", n: "diphosphorus pentoxide" },
  { f: "CS2", n: "carbon disulfide" }, { f: "SiO2", n: "silicon dioxide" }
];
E("sci-u2-name-molecular", 2, ["SC10.8.1"], 2, "gen", function () {
  var item = s6pick(S6_MOLECULAR);
  var others = s6shuf(S6_MOLECULAR.filter(function (x) { return x !== item; })).slice(0, 3);
  if (Math.random() < 0.5) {
    return mcq("What is the name of the molecular compound " + s6fsub(item.f) + "?",
      item.n, others.map(function (x) { return x.n; }),
      "Molecular compounds are named with prefixes that state the atom counts (mono, di, tri, tetra, penta, hexa), the first element keeps its name (mono is dropped for it), and the second element's name ends in -ide: " + item.n + ".",
      { f: item.f, n: item.n });
  }
  return mcq("What is the formula for " + item.n + "?",
    s6fsub(item.f), others.map(function (x) { return s6fsub(x.f); }),
    "The prefixes give the atom counts directly: " + item.n + " is " + s6fsub(item.f) + ". No charge balancing is used for molecular compounds; the prefixes are the subscripts.",
    { f: item.f, n: item.n });
}, ["Two nonmetals means prefixes, not charges. The second element always ends in -ide."]);

E("sci-u2-naming-rules", 2, ["SC10.8.1"], 1, "var", varset([
  function () {
    return mcq("In the name of a binary ionic compound, the negative ion's name is changed to end in",
      "-ide (chlorine becomes chloride, oxygen becomes oxide)",
      ["-ite (chlorine becomes chlorite)", "-ate (oxygen becomes oxate)", "-ium (oxygen becomes oxium)"],
      "Binary compounds (two elements) use -ide for the anion: chloride, oxide, sulfide, nitride. The -ite and -ate endings belong to polyatomic ions containing oxygen (sulfite, sulfate), not to single elements.", {});
  },
  function () {
    return mcq("A Roman numeral appears in the name iron(III) chloride because",
      "iron forms ions with more than one possible charge, and the numeral states which one this compound contains",
      ["there are three iron atoms in the formula", "iron is in group 3 of the periodic table", "the compound contains three chlorine atoms"],
      "Multivalent metals need the numeral to give the ion's charge: iron(III) is Fe with a 3+ charge. The numeral says nothing about atom counts, which the formula's subscripts handle.", {});
  },
  function () {
    return mcq("Why does the name sodium chloride need no Roman numeral and no prefixes?",
      "Sodium forms only one ion (Na with a 1+ charge), and ionic compounds are named without prefixes because the charges fix the ratio",
      ["Sodium is not a metal", "The compound is molecular, so prefixes are optional", "Roman numerals are only used for compounds containing oxygen"],
      "One possible charge means no ambiguity to resolve. Prefixes belong to the molecular naming system; in ionic compounds the neutral-charge requirement determines the subscripts on its own.", {});
  },
  function () {
    return mcq("The polyatomic ion SO4 with a 2- charge is named sulfate. In the compound CaSO4, the correct name is",
      "calcium sulfate (the polyatomic ion keeps its own name as a unit)",
      ["calcium sulfite", "calcium sulfur oxide", "calcium sulfide"],
      "Polyatomic ions are named as units and keep their names inside compounds: sulfate stays sulfate. Sulfide is the single sulfur ion (S, 2-), and sulfite is SO3 with a 2- charge, a different ion.", {});
  }
]), ["Three systems, three signal features: -ide for binary anions, Roman numerals for multivalent metals, prefixes for molecules."]);

E("sci-u2-ionic-molecular", 2, ["SC10.8.1"], 1, "var", varset([
  function () {
    return mcq("A compound is made of a metal and a nonmetal. It conducts electricity when melted but not as a solid. The compound is",
      "ionic: its ions are locked in place in the solid but move freely when melted",
      ["molecular: its molecules break apart when melted", "a metal alloy", "an acid"],
      "Conductivity that switches on when a solid melts is the ionic signature: the charged particles exist in the solid but cannot move until the lattice breaks down. Molecular compounds do not conduct in either state.", {});
  },
  function () {
    return mcq("Which compound is molecular (covalent) rather than ionic?",
      "Carbon dioxide, CO2: two nonmetals sharing electrons",
      ["Sodium chloride, NaCl", "Magnesium oxide, MgO", "Calcium fluoride, CaF2"],
      "Metal plus nonmetal means ionic in this course's compounds. Carbon and oxygen are both nonmetals, so CO2 is molecular, named with prefixes and existing as separate molecules.", {});
  },
  function () {
    return mcq("Which property set belongs to ionic compounds?",
      "High melting points, brittle crystals, conduct when molten or dissolved",
      ["Low melting points, soft, never conduct in any state", "Gases at room temperature, conduct as solids", "High melting points, malleable like metals"],
      "The strong attraction throughout an ionic lattice gives high melting points and brittleness, and the ions conduct once they can move (molten or in solution). Malleability is a metal property, not an ionic one.", {});
  }
]), ["Metal plus nonmetal, think ionic. Then let the conductivity behaviour confirm it."]);

E("sci-u2-formula-atoms", 2, ["SC10.8.1"], 2, "gen", function () {
  var items = [
    { f: "Ca(OH)2", el: "oxygen", n: 2, parse: "The brackets multiply everything inside: Ca(OH)2 has 2 OH units, so 2 oxygen atoms (and 2 hydrogen)." },
    { f: "Ca(OH)2", el: "hydrogen", n: 2, parse: "The subscript 2 outside the brackets doubles the H inside: 2 hydrogen atoms." },
    { f: "Al2(SO4)3", el: "oxygen", n: 12, parse: "Each SO4 unit holds 4 oxygens and there are 3 units: 3 x 4 = 12 oxygen atoms." },
    { f: "Al2(SO4)3", el: "sulfur", n: 3, parse: "There are 3 sulfate units, each with 1 sulfur: 3 sulfur atoms." },
    { f: "Mg(NO3)2", el: "nitrogen", n: 2, parse: "Two nitrate units, one nitrogen each: 2 nitrogen atoms." },
    { f: "Mg(NO3)2", el: "oxygen", n: 6, parse: "Two nitrate units with 3 oxygens each: 2 x 3 = 6 oxygen atoms." },
    { f: "(NH4)3PO4", el: "hydrogen", n: 12, parse: "Three ammonium units with 4 hydrogens each: 3 x 4 = 12 hydrogen atoms." },
    { f: "(NH4)3PO4", el: "nitrogen", n: 3, parse: "Three ammonium units, one nitrogen each: 3 nitrogen atoms." },
    { f: "Fe2(SO4)3", el: "oxygen", n: 12, parse: "Three sulfate units with 4 oxygens each: 12 oxygen atoms." },
    { f: "Ca3(PO4)2", el: "phosphorus", n: 2, parse: "Two phosphate units, one phosphorus each: 2 phosphorus atoms." },
    { f: "Ca3(PO4)2", el: "oxygen", n: 8, parse: "Two phosphate units with 4 oxygens each: 8 oxygen atoms." },
    { f: "CuSO4", el: "oxygen", n: 4, parse: "No brackets and no subscript after the sulfate unit as a whole: the 4 belongs to oxygen inside SO4, giving 4 oxygen atoms." }
  ];
  var it = s6pick(items);
  return mcq("How many " + it.el + " atoms are shown in one formula unit of " + s6fsub(it.f) + "?",
    String(it.n), s6numDist(it.n, [it.n + 1, it.n - 1 > 0 ? it.n - 1 : it.n + 2, it.n * 2], ""),
    it.parse, { f: it.f, el: it.el, n: it.n });
}, ["Multiply inside-out: the subscript outside brackets applies to everything inside them."]);

/* ---------- SC10.8.2 Balancing and conservation of mass ---------- */

var S6_SPECIES = {
  "H2": { H: 2 }, "O2": { O: 2 }, "H2O": { H: 2, O: 1 }, "H2O2": { H: 2, O: 2 },
  "CH4": { C: 1, H: 4 }, "CO2": { C: 1, O: 2 }, "CO": { C: 1, O: 1 }, "C": { C: 1 },
  "Mg": { Mg: 1 }, "MgO": { Mg: 1, O: 1 }, "Na": { Na: 1 }, "Cl2": { Cl: 2 },
  "NaCl": { Na: 1, Cl: 1 }, "Fe": { Fe: 1 }, "Fe2O3": { Fe: 2, O: 3 },
  "Al": { Al: 1 }, "Al2O3": { Al: 2, O: 3 }, "Ca": { Ca: 1 }, "CaO": { Ca: 1, O: 1 },
  "Zn": { Zn: 1 }, "HCl": { H: 1, Cl: 1 }, "ZnCl2": { Zn: 1, Cl: 2 },
  "N2": { N: 2 }, "NH3": { N: 1, H: 3 }, "KClO3": { K: 1, Cl: 1, O: 3 }, "KCl": { K: 1, Cl: 1 },
  "S": { S: 1 }, "SO2": { S: 1, O: 2 }, "Cu": { Cu: 1 }, "CuO": { Cu: 1, O: 1 }, "Ag": { Ag: 1 },
  "CaCO3": { Ca: 1, C: 1, O: 3 }, "NaOH": { Na: 1, O: 1, H: 1 }, "H2SO4": { H: 2, S: 1, O: 4 },
  "Na2SO4": { Na: 2, S: 1, O: 4 }, "CH4O": { C: 1, H: 4, O: 1 }
};
function s6balance(reactants, products) {
  var species = reactants.concat(products);
  var els = {};
  species.forEach(function (s) { Object.keys(S6_SPECIES[s]).forEach(function (e) { els[e] = 1; }); });
  var elList = Object.keys(els);
  var n = species.length, coefs = new Array(n).fill(1);
  function totals() {
    var t = {};
    species.forEach(function (s, i) { Object.keys(S6_SPECIES[s]).forEach(function (e) { t[e] = (t[e] || 0) + S6_SPECIES[s][e] * coefs[i] * (i < reactants.length ? 1 : -1); }); });
    return elList.every(function (e) { return (t[e] || 0) === 0; });
  }
  function search(pos) {
    if (pos === n) return totals();
    for (var c = 1; c <= 4; c++) { coefs[pos] = c; if (search(pos + 1)) return true; }
    coefs[pos] = 1; return false;
  }
  if (!search(0)) return null;
  var g = coefs.reduce(function (a, b) { return s6gcd(a, b); });
  return coefs.map(function (c) { return c / g; });
}
function s6eqText(reactants, products, coefs, blankIdx) {
  function side(list, offset) {
    return list.map(function (s, i) {
      var c = coefs[offset + i];
      var coef = (blankIdx === offset + i) ? "__ " : (c > 1 ? c + " " : "");
      return coef + s6fsub(s);
    }).join(" + ");
  }
  return side(reactants, 0) + " → " + side(products, reactants.length);
}
var S6_REACTIONS_SD = [
  { r: ["Mg", "O2"], p: ["MgO"] }, { r: ["H2", "O2"], p: ["H2O"] },
  { r: ["Na", "Cl2"], p: ["NaCl"] }, { r: ["H2O2"], p: ["H2O", "O2"] },
  { r: ["KClO3"], p: ["KCl", "O2"] }, { r: ["CaCO3"], p: ["CaO", "CO2"] },
  { r: ["Fe", "O2"], p: ["Fe2O3"] }, { r: ["N2", "H2"], p: ["NH3"] },
  { r: ["Al", "O2"], p: ["Al2O3"] }, { r: ["S", "O2"], p: ["SO2"] },
  { r: ["H2O"], p: ["H2", "O2"] }, { r: ["Cu", "O2"], p: ["CuO"] }
];
function s6balDraw(pool) {
  for (var t = 0; t < 40; t++) {
    var rx = s6pick(pool);
    var co = s6balance(rx.r, rx.p);
    if (co) return { rx: rx, co: co };
  }
  return { rx: pool[0], co: s6balance(pool[0].r, pool[0].p) };
}
E("sci-u2-balance-sd", 2, ["SC10.8.2"], 2, "gen", function () {
  var d = s6balDraw(S6_REACTIONS_SD);
  var species = d.rx.r.concat(d.rx.p);
  var idx = s6ri(0, species.length - 1);
  var key = d.co[idx];
  var full = s6eqText(d.rx.r, d.rx.p, d.co, -1);
  return mcq("When the equation " + s6eqText(d.rx.r, d.rx.p, d.co, idx) + " is balanced with the smallest whole-number coefficients, what is the coefficient of " + s6fsub(species[idx]) + "?",
    String(key), s6numDist(key, [key + 1, key === 1 ? 3 : key - 1, key + 2], ""),
    "Balancing this equation gives " + full + ". Count atoms on both sides to check: every element appears the same number of times on each side, which is what balancing requires. The coefficient of " + s6fsub(species[idx]) + " is " + key + ".",
    { eq: full, idx: idx, key: key });
}, ["Balance one element at a time, leaving single elements (like O2) for last, and never change a subscript."]);

var S6_REACTIONS_CR = [
  { r: ["CH4", "O2"], p: ["CO2", "H2O"] }, { r: ["C", "O2"], p: ["CO2"] },
  { r: ["Zn", "HCl"], p: ["ZnCl2", "H2"] }, { r: ["Fe", "HCl"], p: ["FeCl2x", "H2"] },
  { r: ["Mg", "HCl"], p: ["MgCl2x", "H2"] }, { r: ["CH4O", "O2"], p: ["CO2", "H2O"] },
  { r: ["H2SO4", "NaOH"], p: ["Na2SO4", "H2O"] }
];
S6_SPECIES["FeCl2x"] = { Fe: 1, Cl: 2 }; S6_SPECIES["MgCl2x"] = { Mg: 1, Cl: 2 };
var S6_DISPLAY = { "FeCl2x": "FeCl2", "MgCl2x": "MgCl2" };
function s6disp(s) { return s6fsub(S6_DISPLAY[s] || s); }
function s6eqText2(reactants, products, coefs, blankIdx) {
  function nm(s) { return s6fsub(S6_DISPLAY[s] || s); }
  function side(list, offset) {
    return list.map(function (s, i) {
      var c = coefs[offset + i];
      var coef = (blankIdx === offset + i) ? "__ " : (c > 1 ? c + " " : "");
      return coef + nm(s);
    }).join(" + ");
  }
  return side(reactants, 0) + " → " + side(products, reactants.length);
}
E("sci-u2-balance-cr", 2, ["SC10.8.2"], 2, "gen", function () {
  var d = s6balDraw(S6_REACTIONS_CR);
  var species = d.rx.r.concat(d.rx.p);
  var idx = s6ri(0, species.length - 1);
  var key = d.co[idx];
  var full = s6eqText2(d.rx.r, d.rx.p, d.co, -1);
  var dispName = s6fsub(S6_DISPLAY[species[idx]] || species[idx]);
  return mcq("When the equation " + s6eqText2(d.rx.r, d.rx.p, d.co, idx) + " is balanced with the smallest whole-number coefficients, what is the coefficient of " + dispName + "?",
    String(key), s6numDist(key, [key + 1, key === 1 ? 3 : key - 1, key + 2], ""),
    "The balanced equation is " + full + ". Verify by counting: each element's atoms match on the two sides. The coefficient of " + dispName + " is " + key + ".",
    { eq: full, idx: idx, key: key });
}, ["Balance metals first, then nonmetals, then hydrogen and oxygen. Check by counting every atom on both sides."]);

E("sci-u2-eq-atoms", 2, ["SC10.8.2"], 3, "gen", function () {
  var d = s6balDraw(S6_REACTIONS_SD.concat(S6_REACTIONS_CR));
  var species = d.rx.r.concat(d.rx.p);
  var els = {};
  species.forEach(function (s) { Object.keys(S6_SPECIES[s]).forEach(function (e) { els[e] = 1; }); });
  var el = s6pick(Object.keys(els));
  var side = Math.random() < 0.5 ? 0 : 1;
  var list = side === 0 ? d.rx.r : d.rx.p, offset = side === 0 ? 0 : d.rx.r.length;
  var total = 0;
  list.forEach(function (s, i) { total += (S6_SPECIES[s][el] || 0) * d.co[offset + i]; });
  var full = s6eqText2(d.rx.r, d.rx.p, d.co, -1);
  return mcq("In the balanced equation " + full + ", how many " + el + " atoms are shown on the " + (side === 0 ? "reactants" : "products") + " side?",
    String(total), s6numDist(total, [total + 2, total > 2 ? total - 2 : total + 3, total + 4], ""),
    "Multiply each formula's subscript for " + el + " by its coefficient and add across the " + (side === 0 ? "reactants" : "products") + " side: the total is " + total + ". (The other side must give the same count; that is the point of balancing.)",
    { eq: full, el: el, total: total });
}, ["Coefficient times subscript, summed over every substance on the side. Both sides must agree."]);

E("sci-u2-mass-basic", 2, ["SC10.8.2"], 2, "gen", function () {
  var mode = s6pick(["findproduct", "findreactant", "gas"]);
  var a = s6ri(12, 68), b = s6ri(8, 44), dec = function (x) { return (Math.round(x * 10) / 10).toFixed(1); };
  var skins = [
    { r1: "magnesium", r2: "oxygen", p: "magnesium oxide", verb: "burns in" },
    { r1: "zinc", r2: "hydrochloric acid solution", p: "zinc chloride solution and hydrogen gas", verb: "reacts with" },
    { r1: "calcium carbonate", r2: "heat (it decomposes)", p: "calcium oxide and carbon dioxide", verb: "is heated strongly" }
  ];
  var sk = s6pick(skins);
  if (mode === "findproduct") {
    var tot = a + b;
    return mcq("In a sealed container, " + dec(a) + " g of reactant A reacts completely with " + dec(b) + " g of reactant B. No other substances are involved. What mass of products forms?",
      dec(tot) + " g", s6numDist(tot, [tot - a / 2, tot + b, Math.abs(a - b)], " g").map(function (s) { return dec(parseFloat(s)) + " g"; }),
      "Conservation of mass: in a closed system the total mass of the products equals the total mass of the reactants, " + dec(a) + " + " + dec(b) + " = " + dec(tot) + " g. Atoms are rearranged, never created or destroyed.",
      { mode: mode, tot: tot });
  }
  if (mode === "findreactant") {
    var tot2 = a + b;
    return mcq("A reaction in a sealed flask produces " + dec(tot2) + " g of products in total. One reactant had a mass of " + dec(a) + " g. What was the mass of the other reactant?",
      dec(b) + " g", s6numDist(b, [tot2, a, b + 10], " g").map(function (s) { return dec(parseFloat(s)) + " g"; }),
      "Mass is conserved: reactants total " + dec(tot2) + " g, so the second reactant is " + dec(tot2) + " - " + dec(a) + " = " + dec(b) + " g.",
      { mode: mode, tot: tot2 });
  }
  var before = a + b, esc = s6ri(3, 18), after = before - esc;
  return mcq("A student reacts " + dec(a) + " g of a carbonate with " + dec(b) + " g of acid in an open beaker. When the fizzing stops, the beaker's contents have a mass " + dec(esc) + " g less than the starting total. The missing mass",
    "escaped into the air as carbon dioxide gas; counted with the gas, the mass is still conserved",
    ["was destroyed by the reaction", "turned into heat and no longer exists as matter", "is an error: mass can never change in any container"],
    "The reaction produced a gas that left the open beaker. Conservation of mass applies to everything, including the escaped gas: " + dec(before) + " g of reactants gave " + dec(after) + " g in the beaker plus " + dec(esc) + " g of carbon dioxide in the air.",
    { mode: mode, esc: esc });
}, ["Sealed system: totals must match exactly. Open system: ask what left or entered before doubting conservation."]);

E("sci-u2-conservation-why", 2, ["SC10.8.2"], 2, "var", varset([
  function () {
    return mcq("The law of conservation of mass holds in chemical reactions because",
      "the atoms are only rearranged: every atom present before the reaction is present after it",
      ["atoms change into energy and back again during reactions", "products are always heavier than reactants by the mass of the heat released", "mass is created to balance the equation"],
      "In a chemical reaction bonds break and form, but atoms themselves are unchanged and uncounted nowhere: same atoms in, same atoms out, so the mass is the same. (Mass-energy conversion is a nuclear process, not chemistry.)", {});
  },
  function () {
    return mcq("A log burns down to a small pile of ash weighing far less than the log. This does not break the conservation of mass because",
      "most of the log's mass left as carbon dioxide and water vapour in the smoke and gases",
      ["burning destroys the mass of the wood", "the ash absorbed the missing mass as heat", "conservation of mass does not apply to burning"],
      "The ash is only the part that stayed. The gases carried the rest away; weigh the log, the oxygen it consumed, and all the products (ash plus gases) and the totals match.", {});
  },
  function () {
    return mcq("Which change would let a student prove conservation of mass for a fizzing antacid tablet reaction?",
      "Run the reaction in a sealed container (or trap the gas in a balloon) so no product escapes before weighing",
      ["Use a bigger beaker", "Weigh the products while they are still fizzing", "Repeat the reaction three times and average"],
      "The apparent mass loss is gas escaping. Sealing the system keeps every product in the weighing, and then the totals match. Bigger glassware and averaging do nothing about the escaping gas.", {});
  }
]), ["Atoms are neither created nor destroyed in chemistry. If the scale disagrees, hunt for what crossed the container's boundary."]);

E("sci-u2-word-equation", 2, ["SC10.8.2"], 2, "var", varset([
  function () {
    return mcq("The word equation for the reaction of methane with oxygen is: methane + oxygen → carbon dioxide + water. Which statement about this reaction is correct?",
      "The reactants are methane and oxygen, and carbon dioxide and water are the products",
      ["The products are methane and oxygen", "Water is a reactant because it appears in the equation", "Carbon dioxide is a catalyst"],
      "In any equation the substances before the arrow are the reactants (starting materials) and those after it are the products (new substances formed).", {});
  },
  function () {
    return mcq("\"Hydrogen peroxide decomposes into water and oxygen\" written as a word equation is",
      "hydrogen peroxide → water + oxygen",
      ["water + oxygen → hydrogen peroxide", "hydrogen peroxide + water → oxygen", "oxygen → hydrogen peroxide + water"],
      "The starting substance (hydrogen peroxide) goes on the left of the arrow and the substances formed (water and oxygen) go on the right. Reversing the arrow describes the reverse reaction, which is not what the sentence says.", {});
  },
  function () {
    return mcq("In the word equation zinc + hydrochloric acid → zinc chloride + hydrogen, the zinc chloride is",
      "a product: a new substance formed by the reaction",
      ["a reactant left over from the start", "a catalyst speeding the reaction", "the solvent the reaction happens in"],
      "Zinc chloride does not exist in the beaker until the reaction makes it; it appears on the products side of the arrow. Hydrochloric acid provides the medium but is itself a reactant that gets used up.", {});
  }
]), ["Left of the arrow: what you start with. Right of the arrow: what you make."]);

E("sci-u2-reaction-evidence", 2, ["SC10.8.3"], 1, "var", varset([
  function () {
    return mcq("Which observation is the strongest evidence that a chemical reaction (not just a physical change) has occurred?",
      "A new substance with different properties has formed, such as a precipitate appearing when two clear solutions mix",
      ["The mixture became warmer while it was stirred over a flame", "A solid dissolved and the solution changed colour slightly", "Bubbles appeared while a liquid boiled"],
      "A chemical reaction makes new substances. A precipitate from two clear solutions is a new solid that was not there before. Dissolving, boiling and warming over a flame can all happen with no new substance at all.", {});
  },
  function () {
    return mcq("Fizzing is observed in four situations. In which one is the gas certainly from a chemical reaction?",
      "An antacid tablet in water producing gas while the tablet's material is used up and the water's acidity falls",
      ["Soda water releasing bubbles when the bottle is opened", "Water boiling on a stove", "Dry ice producing fog in warm air"],
      "The antacid's fizz comes from a reaction between the tablet and the acid, consuming reactants and changing the solution. The others are physical: released dissolved gas, a change of state, and condensing vapour.", {});
  },
  function () {
    return mcq("Which list contains only reliable signs that a chemical change may have occurred?",
      "Formation of a precipitate, production of a gas in a mixture at room temperature, a permanent colour change, an unexpected temperature change",
      ["Melting, dissolving, breaking, evaporating", "A change of shape, a change of state, a change of size", "Boiling, condensing, freezing, dissolving"],
      "Each item in the correct list points to a new substance forming. The other lists are physical changes, where the substance itself stays the same.", {});
  }
]), ["The test is always the same: is a NEW substance there at the end?"]);

/* ---------- SC10.8.3 Classification ---------- */

var S6_CLASSIFY = [
  { r: ["Mg", "O2"], p: ["MgO"], t: "synthesis", note: "Two substances (an element and an element) combine into a single product: synthesis, A + B → AB." },
  { r: ["N2", "H2"], p: ["NH3"], t: "synthesis", note: "Two reactants join into one product: synthesis." },
  { r: ["CaO", "H2O"], p: ["CaOH2x"], t: "synthesis", note: "Two compounds combine into a single product: synthesis." },
  { r: ["H2O2"], p: ["H2O", "O2"], t: "decomposition", note: "One reactant breaks down into two products: decomposition, AB → A + B." },
  { r: ["KClO3"], p: ["KCl", "O2"], t: "decomposition", note: "A single compound splits into two simpler substances: decomposition." },
  { r: ["CaCO3"], p: ["CaO", "CO2"], t: "decomposition", note: "One reactant, two products: decomposition (driven here by heat)." },
  { r: ["Zn", "HCl"], p: ["ZnCl2"], t: "single replacement", extra: ["H2"], note: "An element (Zn) takes the place of another element (H) in a compound: single replacement, A + BC → AC + B." },
  { r: ["Fe", "CuSO4x"], p: ["FeSO4x", "Cu"], t: "single replacement", note: "Iron displaces copper from its compound: a more reactive element replaces a less reactive one, single replacement." },
  { r: ["Cu", "AgNO3x"], p: ["CuNO32x", "Ag"], t: "single replacement", note: "Copper displaces silver from silver nitrate solution: single replacement." },
  { r: ["AgNO3x", "NaCl"], p: ["AgClx", "NaNO3x"], t: "double replacement", note: "The two compounds swap partners: the positive ions trade negative ions, double replacement (here forming the precipitate AgCl)." },
  { r: ["BaCl2x", "Na2SO4"], p: ["BaSO4x", "NaCl"], t: "double replacement", note: "Partner swap between two compounds, forming the precipitate BaSO4: double replacement." },
  { r: ["CH4", "O2"], p: ["CO2", "H2O"], t: "combustion", note: "A fuel reacts with oxygen to give carbon dioxide and water: combustion." },
  { r: ["C", "O2"], p: ["CO2"], t: "combustion", note: "Carbon burning in oxygen is combustion (it also fits the synthesis pattern, but a substance burning in oxygen is classified as combustion)." }
];
S6_SPECIES["CaOH2x"] = { Ca: 1, O: 2, H: 2 };
S6_SPECIES["CuSO4x"] = { Cu: 1, S: 1, O: 4 }; S6_SPECIES["FeSO4x"] = { Fe: 1, S: 1, O: 4 };
S6_SPECIES["AgNO3x"] = { Ag: 1, N: 1, O: 3 }; S6_SPECIES["CuNO32x"] = { Cu: 1, N: 2, O: 6 };
S6_SPECIES["AgClx"] = { Ag: 1, Cl: 1 }; S6_SPECIES["NaNO3x"] = { Na: 1, N: 1, O: 3 };
S6_SPECIES["BaCl2x"] = { Ba: 1, Cl: 2 }; S6_SPECIES["BaSO4x"] = { Ba: 1, S: 1, O: 4 };
S6_DISPLAY["CaOH2x"] = "Ca(OH)2"; S6_DISPLAY["CuSO4x"] = "CuSO4"; S6_DISPLAY["FeSO4x"] = "FeSO4";
S6_DISPLAY["AgNO3x"] = "AgNO3"; S6_DISPLAY["CuNO32x"] = "Cu(NO3)2"; S6_DISPLAY["AgClx"] = "AgCl";
S6_DISPLAY["NaNO3x"] = "NaNO3"; S6_DISPLAY["BaCl2x"] = "BaCl2"; S6_DISPLAY["BaSO4x"] = "BaSO4";
var S6_TYPES = ["synthesis", "decomposition", "single replacement", "double replacement", "combustion"];
function s6classDraw(filter) {
  var pool = S6_CLASSIFY.filter(filter);
  for (var t = 0; t < 40; t++) {
    var item = s6pick(pool);
    var prods = item.extra ? item.p.concat(item.extra) : item.p;
    var co = s6balance(item.r, prods);
    if (co) return { item: item, co: co, prods: prods };
  }
  var it0 = pool[0]; var pr0 = it0.extra ? it0.p.concat(it0.extra) : it0.p;
  return { item: it0, co: s6balance(it0.r, pr0), prods: pr0 };
}
function s6classQ(d) {
  var eq = s6eqText2(d.item.r, d.prods, d.co, -1);
  var others = s6shuf(S6_TYPES.filter(function (x) { return x !== d.item.t; })).slice(0, 3);
  return mcq("Classify the reaction: " + eq + ". What type of reaction is it?",
    d.item.t, others,
    d.item.note + " The balanced equation is " + eq + ".",
    { eq: eq, t: d.item.t });
}
E("sci-u2-classify-basic", 2, ["SC10.8.3"], 2, "gen", function () {
  return s6classQ(s6classDraw(function (x) { return x.t === "synthesis" || x.t === "decomposition"; }));
}, ["Count the substances on each side first: many-to-one is synthesis, one-to-many is decomposition."]);
E("sci-u2-classify-replacement", 2, ["SC10.8.3"], 2, "gen", function () {
  return s6classQ(s6classDraw(function (x) { return x.t !== "synthesis" && x.t !== "decomposition"; }));
}, ["Look for the swap: one element trading places is single replacement; two compounds trading partners is double. Burning in oxygen is combustion."]);

E("sci-u2-types-def", 2, ["SC10.8.3"], 1, "var", varset([
  function () {
    return mcq("Which general pattern describes a decomposition reaction?",
      "AB → A + B: one compound breaks into simpler substances",
      ["A + B → AB", "A + BC → AC + B", "AB + CD → AD + CB"],
      "Decomposition is the one-to-many pattern: a single reactant splits apart. The other patterns are synthesis, single replacement and double replacement respectively.", {});
  },
  function () {
    return mcq("A reaction in which a fuel burns in oxygen to produce carbon dioxide and water is classified as",
      "combustion",
      ["synthesis", "neutralization", "decomposition"],
      "Combustion is defined by the fuel plus oxygen reactants and the carbon dioxide plus water products (for a hydrocarbon fuel). It is its own class in this course's five-type scheme.", {});
  },
  function () {
    return mcq("In a single replacement reaction, the element doing the replacing must be",
      "more reactive than the element it displaces from the compound",
      ["less reactive than the element it displaces", "a nonmetal in every case", "present in a larger mass than the whole compound"],
      "Displacement is a competition: the more reactive element wins the partner. A less reactive element cannot push another out, and the reaction simply does not occur.", {});
  }
]), ["Five patterns: learn the shapes (many-to-one, one-to-many, one swap, two swaps, burn)."]);

/* ---------- SC10.8.4 and 8.5 Acids, bases, salts, neutralization ---------- */

E("sci-u2-acid-properties", 2, ["SC10.8.4"], 1, "var", varset([
  function () {
    return mcq("Which list of properties belongs to acids?",
      "Sour taste, turn blue litmus red, react with metals to produce hydrogen gas, conduct electricity in solution",
      ["Bitter taste, slippery feel, turn red litmus blue", "Neutral taste, never conduct electricity, feel slippery", "Sour taste, turn red litmus blue, feel slippery"],
      "Acids: sour, blue litmus to red, fizz with active metals, and their solutions conduct (they form ions). Bitter and slippery with red-to-blue litmus is the base profile, the mirror image.", {});
  },
  function () {
    return mcq("A solution turns blue litmus paper red and has a pH of 3. The solution is",
      "acidic",
      ["basic", "neutral", "a salt with no ions"],
      "Blue litmus turning red and a pH below 7 are two independent acid tests agreeing with each other. Neutral solutions sit at pH 7 and leave litmus unchanged.", {});
  },
  function () {
    return mcq("Which substance is an acid, judging by its formula and behaviour?",
      "Vinegar (ethanoic acid): it tastes sour and turns blue litmus red",
      ["Baking soda solution: it feels slippery and turns red litmus blue", "Table salt solution: it leaves both litmus papers unchanged", "Soap solution: it is bitter and slippery"],
      "Judge by behaviour, not by the household name: sour plus blue-to-red litmus is the acid pattern. Baking soda and soap solutions are bases; salt solution is neutral.", {});
  }
]), ["Acids: sour, blue to red, pH under 7. Keep the mirror image (bases) straight by contrast."]);

E("sci-u2-base-properties", 2, ["SC10.8.4"], 1, "var", varset([
  function () {
    return mcq("Which list of properties belongs to bases?",
      "Bitter taste, slippery soapy feel, turn red litmus blue, conduct electricity in solution",
      ["Sour taste, turn blue litmus red, produce hydrogen with metals", "No taste, no feel, never conduct in any form", "Bitter taste, turn blue litmus red, pH below 7"],
      "Bases are the mirror image of acids: bitter, slippery, red litmus to blue, pH above 7. The distractors each borrow one acid property, which is exactly the confusion to avoid.", {});
  },
  function () {
    return mcq("A cleaning solution has a pH of 11 and feels slippery. It is classified as",
      "a base (alkaline solution)",
      ["an acid", "a neutral salt solution", "pure water"],
      "pH 11 is well above 7 and the slippery feel is the classic base cue: an alkaline cleaner such as ammonia solution or oven cleaner behaves this way.", {});
  },
  function () {
    return mcq("A solution of sodium hydroxide is a base. Which test result confirms a solution is basic rather than acidic?",
      "It turns red litmus paper blue",
      ["It turns blue litmus paper red", "It leaves both litmus papers unchanged", "It produces hydrogen gas with zinc"],
      "Red to blue is the base direction. Blue to red is the acid direction, unchanged means neutral, and hydrogen with a metal is an acid reaction.", {});
  }
]), ["Bases: bitter, slippery, red to blue, pH over 7."]);

E("sci-u2-ph-scale", 2, ["SC10.8.4"], 1, "var", varset([
  function () {
    return mcq("On the pH scale, a solution with pH 7 is",
      "neutral: neither acidic nor basic (pure water at room temperature)",
      ["a strong acid", "a weak base", "a concentrated salt"],
      "The scale runs 0 to 14 with 7 as the neutral midpoint. Below 7 is acidic, above 7 is basic (alkaline).", {});
  },
  function () {
    return mcq("Which list orders the solutions from most acidic to most basic?",
      "Lemon juice (pH 2), then rainwater (pH 5.6), then seawater (pH 8), then oven cleaner (pH 13)",
      ["Oven cleaner (pH 13), then seawater (pH 8), then rainwater (pH 5.6), then lemon juice (pH 2)", "Rainwater (pH 5.6), then lemon juice (pH 2), then oven cleaner (pH 13), then seawater (pH 8)", "Seawater (pH 8), then lemon juice (pH 2), then rainwater (pH 5.6), then oven cleaner (pH 13)"],
      "Lower pH means more acidic. Reading the values in increasing order gives lemon juice, rainwater (slightly acidic from dissolved carbon dioxide), seawater (slightly basic), oven cleaner (strongly basic).", {});
  },
  function () {
    return mcq("A soil sample tests at pH 5.2. For most garden plants this soil is",
      "slightly acidic",
      ["strongly basic", "exactly neutral", "strongly acidic"],
      "5.2 is below 7 but not far: slightly (weakly) acidic. Garden lime is the usual treatment to nudge it toward neutral, an everyday neutralization.", {});
  }
]), ["Under 7 acidic, 7 neutral, over 7 basic. Distance from 7 tells the strength of the character, not just the direction."]);

E("sci-u2-ph-compare", 2, ["SC10.8.4"], 2, "var", varset([
  function () {
    return mcq("Solution A has pH 3 and Solution B has pH 5. How do their acidities compare?",
      "A is 100 times as acidic as B: each pH step is a factor of 10, and the solutions differ by 2 steps",
      ["A is twice as acidic as B", "A is 2 times as acidic as B because 5 - 3 = 2", "B is 100 times as acidic as A"],
      "The pH scale is logarithmic: one unit means ten times the hydrogen ion concentration. Two units of difference means 10 x 10 = 100 times. Subtracting the pH values directly is the classic error.", {});
  },
  function () {
    return mcq("Adding water to dilute an acid with pH 2 will move its pH",
      "upward toward 7, because the hydrogen ions are spread through more water (lower concentration)",
      ["downward toward 0", "past 7 into the basic range", "nowhere: dilution does not change pH"],
      "Dilution lowers the ion concentration, so the pH of an acid rises toward 7, but dilution alone can never carry it past neutral into basic territory.", {});
  },
  function () {
    return mcq("Stomach acid has a pH near 2, and an antacid raises it toward pH 4. By what factor has the hydrogen ion concentration changed?",
      "It has fallen by a factor of about 100",
      ["It has fallen by a factor of 2", "It has doubled", "It has fallen by a factor of 20"],
      "Two pH units of change is 10 squared: the hydrogen ion concentration drops to about one hundredth of its starting value. That is the arithmetic behind antacid relief.", {});
  }
]), ["Every pH step is a tenfold step. Two steps is not two times, it is a hundred times."]);

E("sci-u2-indicators", 2, ["SC10.8.4"], 2, "var", varset([
  function () {
    return mcq("Phenolphthalein is colourless in an unknown solution and turns pink when a few drops of sodium hydroxide solution are added. The colour change shows that",
      "the mixture has become basic: phenolphthalein is colourless in acids and neutral solutions and pink in bases",
      ["the mixture has become acidic", "the unknown was a strong acid all along", "phenolphthalein reacts with water to make pink dye"],
      "Phenolphthalein's job is to signal the acid-base state: colourless at and below neutral, pink in base. The pink appears because the added base carried the mixture past neutral.", {});
  },
  function () {
    return mcq("A student tests three solutions with both litmus papers. Solution X turns blue litmus red; Solution Y turns red litmus blue; Solution Z changes neither. The classifications are",
      "X acidic, Y basic, Z neutral",
      ["X basic, Y acidic, Z neutral", "X acidic, Y neutral, Z basic", "X neutral, Y basic, Z acidic"],
      "Blue to red means acid, red to blue means base, and no change to either paper means neutral. The three results map one-to-one onto the three classes.", {});
  },
  function () {
    return mcq("Red cabbage juice turns red-pink in vinegar, purple in tap water and green in a baking soda solution. Cabbage juice is useful here because it is",
      "a natural indicator: a substance whose colour depends on whether the solution is acidic, neutral or basic",
      ["an acid that reacts with all three solutions", "a base that neutralizes the other solutions", "a salt that precipitates in vinegar"],
      "An indicator reports the solution's character through its own colour change without taking part as a reactant in any important way. Plant pigments like cabbage juice do this across a range of colours.", {});
  }
]), ["An indicator is a reporter, not a player: its colour tells you which side of neutral the solution is on."]);

E("sci-u2-acid-formulas", 2, ["SC10.8.4"], 2, "gen", function () {
  var items = [
    { show: "HCl", cls: "an acid", why: "Hydrogen at the front of the formula and it produces H+ ions in water: hydrochloric acid, a strong acid." },
    { show: "H2SO4", cls: "an acid", why: "Sulfuric acid: the leading hydrogen marks it as an acid, and it is a common laboratory acid." },
    { show: "HNO3", cls: "an acid", why: "Nitric acid: an acid by its leading hydrogen and its behaviour in solution." },
    { show: "NaOH", cls: "a base", why: "Sodium hydroxide: a metal hydroxide, and metal hydroxides are bases (the OH group is the giveaway)." },
    { show: "Ca(OH)2", cls: "a base", why: "Calcium hydroxide: a metal hydroxide, used as lime; bases carry the hydroxide group." },
    { show: "KOH", cls: "a base", why: "Potassium hydroxide: a metal hydroxide and a strong base." },
    { show: "NaCl", cls: "a salt", why: "Sodium chloride: a metal cation with a non-hydroxide anion and no leading hydrogen: a salt, the product type made in neutralizations." },
    { show: "KNO3", cls: "a salt", why: "Potassium nitrate: metal plus polyatomic anion, no leading H and no OH: a salt." },
    { show: "CaCO3", cls: "a salt", why: "Calcium carbonate: a salt (the compound in limestone and antacid tablets); it reacts with acids but is classed as a salt." },
    { show: "NH3", cls: "a base", why: "Ammonia forms a basic solution in water (it produces hydroxide ions there), so it is classed with the bases in this course." }
  ];
  var it = s6pick(items);
  var others = ["an acid", "a base", "a salt"].filter(function (c) { return c !== it.cls; });
  return mcq("Classify the substance " + s6fsub(it.show) + ": it is",
    it.cls, others.concat(["a molecular element"]),
    it.why, { show: it.show, cls: it.cls });
}, ["Formula clues: leading H usually means acid, OH in a metal compound means base, metal plus anion with neither means salt."]);

E("sci-u2-salts", 2, ["SC10.8.4"], 2, "var", varset([
  function () {
    return mcq("In this course, a salt is best defined as",
      "an ionic compound whose positive ion comes from a base and whose negative ion comes from an acid; it is what neutralization produces along with water",
      ["any white crystalline solid", "a compound that always tastes salty", "an acid that has lost its hydrogen to a metal"],
      "Table salt (NaCl) is one example of a huge class: salts are the ionic products of neutralization, pairing the base's cation with the acid's anion. Many are not white and none should ever be tasted in a lab.", {});
  },
  function () {
    return mcq("When hydrochloric acid is neutralized by potassium hydroxide, the salt formed is",
      "potassium chloride",
      ["potassium hydroxide", "hydrogen chloride", "sodium chloride"],
      "Take the base's cation (potassium) and the acid's anion (chloride): potassium chloride, plus water. Naming the salt is a naming-system question wearing a reaction costume.", {});
  },
  function () {
    return mcq("Which substance is a salt used as a fertilizer, formed from nitric acid and ammonia?",
      "Ammonium nitrate",
      ["Sodium nitrate", "Ammonium chloride", "Potassium sulfate"],
      "The acid supplies nitrate and the base (ammonia) supplies ammonium: ammonium nitrate. The name of a neutralization salt is always cation-from-base plus anion-from-acid.", {});
  }
]), ["A salt's name is its recipe: cation from the base, anion from the acid."]);

var S6_NEUT = [
  { acid: "HCl", base: "NaOH", salt: "NaCl", saltName: "sodium chloride", water: 1, note: "HCl + NaOH → NaCl + H2O. One hydrogen and one hydroxide make one water." },
  { acid: "HCl", base: "KOH", salt: "KCl", saltName: "potassium chloride", water: 1, note: "HCl + KOH → KCl + H2O." },
  { acid: "HNO3", base: "NaOH", salt: "NaNO3", saltName: "sodium nitrate", water: 1, note: "HNO3 + NaOH → NaNO3 + H2O." },
  { acid: "H2SO4", base: "Ca(OH)2", salt: "CaSO4", saltName: "calcium sulfate", water: 2, note: "H2SO4 + Ca(OH)2 → CaSO4 + 2 H2O. Two hydrogens and two hydroxides make two waters; the equation is already balanced with ones elsewhere." },
  { acid: "HCl", base: "Mg(OH)2", salt: "MgCl2", saltName: "magnesium chloride", water: 2, note: "2 HCl + Mg(OH)2 → MgCl2 + 2 H2O. The magnesium needs two chlorides, so two acid units are required." },
  { acid: "H2SO4", base: "NaOH", salt: "Na2SO4", saltName: "sodium sulfate", water: 2, note: "H2SO4 + 2 NaOH → Na2SO4 + 2 H2O. Two sodiums are needed for the sulfate salt, so two base units and two waters." }
];
E("sci-u2-neut-equation", 2, ["SC10.8.5"], 2, "gen", function () {
  var it = s6pick(S6_NEUT);
  var ask = s6pick(["salt", "water"]);
  if (ask === "salt") {
    var others = s6shuf(S6_NEUT.filter(function (x) { return x !== it; })).slice(0, 3);
    return mcq("An acid and a base react: " + s6fsub(it.acid) + " + " + s6fsub(it.base) + " → ? + ? What salt is formed (along with water)?",
      it.saltName + " (" + s6fsub(it.salt) + ")", others.map(function (x) { return x.saltName + " (" + s6fsub(x.salt) + ")"; }),
      "Neutralization swaps the partners: the base's cation joins the acid's anion. " + it.note,
      { ask: ask, salt: it.salt });
  }
  return mcq("An acid and a base react: " + s6fsub(it.acid) + " + " + s6fsub(it.base) + " → salt + water. When the equation is balanced, the coefficient of water is",
    String(it.water), s6numDist(it.water, [1, 2, 3].filter(function (x) { return x !== it.water; }).concat([4]), ""),
    "Count the hydrogens the acid supplies and the hydroxides the base supplies: each H with an OH makes one H2O. " + it.note,
    { ask: ask, water: it.water });
}, ["Build the salt from the base's cation and the acid's anion; the waters come from matching H with OH."]);

E("sci-u2-neut-apps", 2, ["SC10.8.5"], 2, "var", varset([
  function () {
    return mcq("Antacid tablets contain bases such as magnesium hydroxide. They relieve heartburn by",
      "neutralizing some of the excess hydrochloric acid in the stomach, raising its pH toward a comfortable level",
      ["coating the stomach so acid cannot touch it", "stopping the stomach from producing acid permanently", "diluting the acid with the water in the tablet"],
      "Heartburn is excess stomach acid reaching the esophagus. The antacid base reacts with the acid (neutralization), consuming hydrogen ions and lifting the pH. It treats the excess, not the acid production itself.", {});
  },
  function () {
    return mcq("Farmers spread crushed limestone (calcium carbonate) on fields with acidic soil. The limestone helps because it",
      "reacts with and neutralizes some of the soil's acidity, moving the pH toward neutral where crops grow best",
      ["adds acid to balance the soil", "kills all organisms in the soil", "changes the soil's colour so it absorbs more sunlight"],
      "Limestone is a base in this context (a carbonate that consumes hydrogen ions). Liming is an industrial-scale neutralization, the same chemistry as the antacid, applied to a field.", {});
  },
  function () {
    return mcq("A factory must treat acidic wastewater before releasing it into a river. The correct treatment is to",
      "add a base in controlled amounts until the wastewater is near neutral (pH around 7)",
      ["add more acid so the river cannot change it further", "heat the wastewater until the acid evaporates", "release it at night when fewer organisms are active"],
      "Neutralization is the only option that removes the acidity itself: base plus acid gives a salt plus water. Dilution and timing do not change the total acid load the river receives.", {});
  },
  function () {
    return mcq("Bee stings inject a mild acid, and a traditional remedy applies baking soda paste. Wasp stings are alkaline, and vinegar is applied. The logic in both cases is",
      "neutralization: apply the opposite character (a mild base for the acid sting, a mild acid for the alkaline sting)",
      ["the paste smothers the sting so air cannot reach it", "both remedies work by cooling the skin", "the remedies dissolve the sting under the skin"],
      "Acid sting plus mild base, alkaline sting plus mild acid: each remedy is a small neutralization chosen to oppose the sting's chemistry.", {});
  }
]), ["Every application is the same reaction in different clothes: acid plus base, chosen to oppose the problem's character."]);

E("sci-u2-neut-reason", 2, ["SC10.8.5"], 3, "var", varset([
  function () {
    return mcq("Acid rain (pH about 4.5) falls on a limestone lake bed and the lake's pH stays near 6.5, while a nearby granite-bed lake falls to pH 5.0. The limestone lake is protected because",
      "the carbonate in the limestone neutralizes incoming acid, consuming hydrogen ions before they can lower the lake's pH much",
      ["limestone reflects the rain back into the clouds", "granite produces extra acid that adds to the rain", "the limestone lake is deeper, and depth alone sets pH"],
      "This is buffering by neutralization: CaCO3 reacts with the acid (producing a calcium salt, water and carbon dioxide), spending the acid on the rock instead of on the lake. Granite has no such chemistry to offer.", {});
  },
  function () {
    return mcq("A student neutralizes 25 mL of an acid with a base and reports the products are 'just water'. The report is wrong because",
      "a salt is also formed and remains dissolved in the water; evaporating the water would leave it behind",
      ["neutralization produces no water at all", "the acid disappears completely from the universe", "the base is still present unchanged at the end"],
      "Acid plus base gives salt plus water, always both. The salt is invisible only because it is dissolved; evaporation reveals it. Matter is conserved, so the acid's anion and the base's cation must be somewhere: they are the salt.", {});
  },
  function () {
    return mcq("Equal volumes of two acids are tested: Acid X at pH 1 and Acid Y at pH 3. Equal volumes of the same base are added to each. Which result is expected?",
      "Acid X needs roughly 100 times as much base to neutralize, so the added base will neutralize Y but leave X still strongly acidic",
      ["Both are neutralized, because equal volumes of base neutralize equal volumes of any acid", "Acid Y needs more base because weaker acids resist neutralization", "Neither can be predicted from pH at all"],
      "pH 1 versus pH 3 is a hundredfold difference in hydrogen ion concentration (two logarithmic steps). The base supply that handles Y is nowhere near enough for X. Equal volumes do not mean equal amounts of acid.", {});
  }
]), ["Neutralization is quantitative: count the hydrogen ions and the hydroxides, and remember the salt in the beaker."]);

/* ---------- SC10.8.6 Reaction rates ---------- */

E("sci-u2-rates-factors", 2, ["SC10.8.6"], 1, "var", varset([
  function () {
    return mcq("Which change would make a reaction between a solid and a liquid proceed FASTER?",
      "Crush the solid into a powder, increasing its surface area",
      ["Use one large lump of the solid", "Cool the mixture in ice", "Dilute the liquid with extra water"],
      "Powder exposes far more surface for collisions per second. A lump hides most of its particles inside, cooling slows particles down, and diluting spreads the liquid's particles thinner: all three slow the reaction.", {});
  },
  function () {
    return mcq("The five factors that change reaction rate studied in this course are",
      "temperature, surface area, concentration, catalyst and the nature of the reactants (including light for some reactions)",
      ["mass, volume, colour, density and pressure only", "the size of the container and the brand of chemicals", "stirring speed alone"],
      "Rate is controlled by anything that changes how often and how effectively particles collide: hotter (faster particles), more surface, more concentrated, a catalyst's lower-energy pathway, and the reactants' own nature.", {});
  },
  function () {
    return mcq("Milk sours faster on a warm counter than in a refrigerator. The best explanation is",
      "higher temperature: the particles move faster, collide more often and collide with more energy, so the souring reactions run faster",
      ["the refrigerator's darkness stops all chemistry", "cold milk has fewer bacteria because cold kills instantly at 4 °C", "warm air pushes the milk particles apart"],
      "Temperature is the rate factor at work. Refrigeration does not stop reactions or sterilize the milk; it slows particle motion enough that the same reactions take much longer.", {});
  }
]), ["Rate rises with anything that makes collisions more frequent or more effective."]);

E("sci-u2-collision", 2, ["SC10.8.6"], 2, "var", varset([
  function () {
    return mcq("According to collision theory, a reaction happens when particles",
      "collide with enough energy and the right orientation to break and rearrange bonds",
      ["touch each other gently at any speed", "collide any number of times, regardless of energy", "are heated until they melt"],
      "Most collisions do nothing: the particles bounce off unchanged. Only collisions with energy at or above the activation energy, and a workable orientation, rearrange bonds into products.", {});
  },
  function () {
    return mcq("Raising the concentration of a reactant speeds a reaction because",
      "with more particles in the same volume, collisions happen more frequently",
      ["each particle gains extra energy from its neighbours", "the activation energy of the reaction drops", "the particles become smaller"],
      "Concentration works through collision frequency alone: same energy per particle, same activation energy, but more encounters per second means more successful reactions per second.", {});
  },
  function () {
    return mcq("A catalyst speeds up a reaction by",
      "providing an alternative pathway with a lower activation energy, and it is not used up in the reaction",
      ["being consumed and turning into extra product", "raising the temperature of the mixture automatically", "increasing the concentration of the reactants permanently"],
      "The catalyst opens an easier route over a lower energy barrier, so a bigger fraction of collisions succeed. It emerges unchanged at the end, which is why a small amount can process a lot of reactant.", {});
  }
]), ["Collisions are the currency: rate factors all work by changing collision frequency, collision energy, or the energy a collision needs."]);

E("sci-u2-rate-scenarios", 2, ["SC10.8.6"], 2, "gen", function () {
  var sc = [
    { setup: "Two identical antacid tablets are dropped into equal volumes of water. One tablet is whole; the other is crushed to powder first. Both fizz until they disappear.",
      ask: "Which tablet finishes first, and why?",
      key: "The crushed tablet: powdering hugely increases surface area, so far more particles are exposed to collisions each second",
      dis: ["The whole tablet: its particles are packed tighter, which speeds reactions", "They finish together: the masses are equal, so the rates must be equal", "The whole tablet: powder particles dissolve into the water and are lost"],
      why: "Equal masses can react at very different rates. Surface area decides how many solid particles are available at the surface for collisions, and the powder wins by a wide margin despite identical mass and temperature." },
    { setup: "Zinc reacts with hydrochloric acid, producing hydrogen gas. Trial 1 uses acid labelled 1.0 mol/L; Trial 2 uses acid labelled 3.0 mol/L, with everything else identical.",
      ask: "Which trial bubbles faster at the start?",
      key: "Trial 2: the more concentrated acid packs three times as many acid particles into each volume, so collisions with the zinc are far more frequent",
      dis: ["Trial 1: dilute acid soaks into the metal better", "Both start equally: the zinc amount is the same in each", "Trial 1: concentrated acid particles crowd each other and cannot move"],
      why: "Concentration is collision frequency. Triple the particles per litre means roughly triple the collision rate at the metal surface, so hydrogen forms faster from the first seconds." },
    { setup: "Hydrogen peroxide decomposes slowly in a dark bottle, releasing oxygen. The rate is much slower in the dark than on a sunny windowsill, even at the same temperature.",
      ask: "What factor explains the difference?",
      key: "Light: for this reaction, light energy helps particles clear the activation energy, so decomposition speeds up in sunlight",
      dis: ["Concentration: sunlight concentrates the peroxide", "A catalyst: the glass bottle catalyzes the reaction in light", "Surface area: the windowsill exposes more of the bottle"],
      why: "Some reactions are light-sensitive: photons supply activation energy. That is why peroxide is sold in dark bottles. Temperature, concentration and amount are all unchanged between the two spots." },
    { setup: "A glow stick glows brightly in warm water and dimly in ice water.",
      ask: "What does this show about temperature and reaction rate?",
      key: "The reaction inside runs faster when warm: brighter glow means product (and light) forming faster, matching collision theory's prediction for hotter, faster particles",
      dis: ["Warm water melts the chemicals so they can finally mix", "Cold water absorbs the light before it can escape", "The glow chemicals evaporate in warm water and glow in the air"],
      why: "Brightness tracks the rate of the light-producing reaction. Warmth speeds the particles, raising both collision frequency and collision energy; ice water slows both, and the glow fades accordingly." }
  ];
  var it = s6pick(sc);
  return mcq(it.setup + " " + it.ask, it.key, it.dis, it.why, { setup: it.setup.slice(0, 40) });
}, ["Name the factor first (temperature, surface area, concentration, catalyst, light, nature), then tell the collision story."]);

E("sci-u2-rates-curve", 2, ["SC10.8.6"], 3, "gen", function () {
  var specs = [
    { name: "crushed solid, concentrated acid, warm", k: 3.4 },
    { name: "crushed solid, dilute acid, warm", k: 2.2 },
    { name: "lumps, concentrated acid, warm", k: 1.2 },
    { name: "lumps, dilute acid, cold", k: 0.5 }
  ];
  var L = s6shuf(["A", "B", "C", "D"]);
  var lines = specs.map(function (s, i) {
    var kk = s.k;
    return { fn: function (x) { return 60 * (1 - Math.exp(-kk * x / 40)); }, col: [S6_INK, S6_ACC, S6_ALT, S6_BLUE][i], label: L[i], labelPt: [38, 60 * (1 - Math.exp(-kk * 38 / 40)) + 3] };
  });
  var fig = s6GraphSVG({ xMax: 40, yMax: 70, xStep: 10, yStep: 10, xLab: "time (s)", yLab: "gas produced (mL)", lines: lines });
  var mode = s6pick(["fastest", "conditions", "plateau"]);
  var fastestLetter = L[0], slowestLetter = L[3];
  var q;
  if (mode === "fastest") {
    q = mcq("Four trials of the same gas-producing reaction were run under different conditions. Which curve shows the FASTEST reaction?",
      "Curve " + fastestLetter, ["Curve " + L[1], "Curve " + L[2], "Curve " + slowestLetter],
      "The fastest reaction produces gas quickest, so its curve climbs steepest and levels off first. Curve " + fastestLetter + " (" + specs[0].name + ") rises fastest; curve " + slowestLetter + " (" + specs[3].name + ") is the slowest combination.", { mode: mode });
  } else if (mode === "conditions") {
    q = mcq("Curve " + slowestLetter + " is the slowest of the four trials. Which conditions does it most likely represent?",
      "Lumps of solid in dilute acid, kept cold",
      ["Powdered solid in concentrated acid, kept warm", "Powdered solid in dilute acid, kept warm", "Lumps of solid in concentrated acid, kept warm"],
      "The slowest curve combines every rate-lowering choice: least surface area (lumps), lowest concentration (dilute) and lowest temperature (cold). Curve " + slowestLetter + " climbs the most gently of the four.", { mode: mode });
  } else {
    q = mcq("All four curves level off at the same height (about 60 mL). What does the shared plateau mean?",
      "Each trial produced the same total amount of gas: the same amount of reactant was used up in each; only the speed differed",
      ["The reactions stopped because the containers filled with pressure", "The measuring cylinders all broke at 60 mL", "Each reaction reversed at 60 mL and began consuming gas"],
      "The plateau is the finish line: reactant exhausted. Conditions change how fast the line is reached, not where it sits, because each trial started with the same amount of the limiting reactant.", { mode: mode });
  }
  q.figure = fig;
  return q;
}, ["Steepness is speed on a product-versus-time graph. The plateau height is the total amount, set by how much reactant you started with."]);

E("sci-u2-catalyst-curve", 2, ["SC10.8.6"], 3, "gen", function () {
  var w = 380, h = 240, x0 = 50, y0 = 200, x1 = 350, y1 = 30;
  function X(f) { return x0 + (x1 - x0) * f; }
  function Y(v) { return y0 - (y0 - y1) * (v / 100); }
  var s = '<svg viewBox="0 0 ' + w + ' ' + h + '" width="380" role="img" aria-label="Energy diagram with and without catalyst">';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x1 + '" y2="' + y0 + '" stroke="#888"/>';
  s += '<line x1="' + x0 + '" y1="' + y0 + '" x2="' + x0 + '" y2="' + y1 + '" stroke="#888"/>';
  s += s6txt(X(0.99), y0 + 16, "reaction progress", 11, false, "end");
  s += s6txt(x0 - 6, Y(98), "energy", 11, false, "end");
  s += '<path d="M ' + X(0.02) + ' ' + Y(38) + ' C ' + X(0.25) + ' ' + Y(38) + ', ' + X(0.33) + ' ' + Y(88) + ', ' + X(0.5) + ' ' + Y(90) + ' C ' + X(0.68) + ' ' + Y(92) + ', ' + X(0.75) + ' ' + Y(60) + ', ' + X(0.97) + ' ' + Y(58) + '" fill="none" stroke="' + S6_INK + '" stroke-width="2.4"/>';
  s += '<path d="M ' + X(0.02) + ' ' + Y(38) + ' C ' + X(0.25) + ' ' + Y(38) + ', ' + X(0.35) + ' ' + Y(62) + ', ' + X(0.5) + ' ' + Y(64) + ' C ' + X(0.66) + ' ' + Y(66) + ', ' + X(0.75) + ' ' + Y(60) + ', ' + X(0.97) + ' ' + Y(58) + '" fill="none" stroke="' + S6_ACC + '" stroke-width="2.4" stroke-dasharray="6 4"/>';
  s += s6txt(X(0.30), Y(95), "without catalyst", 11);
  s += s6txt(X(0.30), Y(48), "with catalyst (dashed)", 11, false, "middle", S6_ACC);
  s += s6txt(X(0.06), Y(30), "reactants", 11);
  s += s6txt(X(0.82), Y(70), "products", 11);
  s += "</svg>";
  var mode = s6pick(["barrier", "energy"]);
  var q;
  if (mode === "barrier") {
    q = mcq("The diagram shows the energy pathway of a reaction with and without a catalyst. The catalyst works because the dashed pathway",
      "has a lower hump (lower activation energy), so more collisions have enough energy to succeed",
      ["starts from higher-energy reactants", "ends at lower-energy products", "removes the hump completely so no energy is needed"],
      "A catalyst changes the route, not the endpoints: reactants and products sit at the same energies on both curves. Only the barrier between them drops, letting a larger fraction of collisions succeed.", { mode: mode });
  } else {
    q = mcq("On the energy diagram, the reactants and products sit at exactly the same heights on both the solid and dashed curves. This shows that a catalyst",
      "does not change the overall energy change of the reaction, only how fast equilibrium amounts are reached",
      ["makes the reaction release more energy overall", "turns an endothermic reaction into an exothermic one", "stores the saved energy inside itself permanently"],
      "Endpoints identical means the energy difference between reactants and products is identical. The catalyst is a shortcut over the hill, not a change of destination, and it is regenerated unchanged.", { mode: mode });
  }
  q.figure = s;
  return q;
}, ["On an energy diagram, compare the hump (activation energy) and the endpoints (overall change). A catalyst moves only the hump."]);

E("sci-u2-rates-experiment", 2, ["SC10.8.6"], 3, "var", varset([
  function () {
    return mcq("A student times how long magnesium ribbon takes to disappear in acid. In Trial 1 the acid is at 20 °C; in Trial 2 at 40 °C; in Trial 3 at 40 °C but the ribbon is cut into small pieces. Which comparison isolates the effect of surface area alone?",
      "Trial 2 versus Trial 3: same temperature and acid, only the ribbon's form changes",
      ["Trial 1 versus Trial 2: only temperature changes there", "Trial 1 versus Trial 3: the biggest difference shows the biggest effect", "All three trials compared at once give the cleanest answer"],
      "A fair test changes one variable at a time. Trials 2 and 3 share temperature and acid concentration, differing only in the ribbon's surface area, so any time difference belongs to surface area alone. Trial 1 versus 3 changes two variables at once and proves nothing cleanly.", {});
  },
  function () {
    return mcq("Enzymes in the human body are catalysts. A high fever is dangerous partly because",
      "at temperatures well above 37 °C, enzyme molecules lose their shape and stop catalyzing, so essential reactions slow drastically",
      ["enzymes evaporate from the blood", "all reactions stop instantly at 40 °C", "the body runs out of activation energy"],
      "Biological catalysts are proteins folded into precise shapes; the pathway they offer depends on that shape. Excess heat unfolds (denatures) them, removing the low-energy route for reactions the body cannot do without. Rate and catalyst shape are the same story told twice.", {});
  }
]), ["Design questions are variable questions: find the pair of trials that differ in exactly one factor."]);

/* ---------- WHMIS (Unit 2 safety, tagged with 8.1 per the analysis) ---------- */

E("sci-u2-whmis-symbols", 2, ["SC10.8.1"], 1, "var", varset([
  function () {
    return mcq("A container in the lab carries a WHMIS pictogram showing a flame. The hazard is that the contents are",
      "flammable: they can catch fire easily and must be kept away from heat and sparks",
      ["corrosive to skin and metal", "a health hazard affecting the lungs over time", "compressed gas under pressure"],
      "The flame pictogram means flammable (gases, liquids or solids, and materials that can ignite in air). Each WHMIS pictogram is a picture of its hazard: flame for fire, test tubes dripping for corrosion, a cylinder for compressed gas.", {});
  },
  function () {
    return mcq("The WHMIS pictogram showing a picture of a skull and crossbones means",
      "acute toxicity: the substance can cause death or serious harm from a small exposure",
      ["the substance is explosive", "the substance is harmful only to fish and aquatic life", "the substance is a mild skin irritant only"],
      "Skull and crossbones is the most serious immediate-health warning in the system: fatal or toxic if swallowed, inhaled or absorbed through skin. It demands the strictest handling in the room.", {});
  },
  function () {
    return mcq("A pictogram shows liquid dripping from test tubes onto a hand and a surface, eating into both. This warns that the substance is",
      "corrosive: it can burn skin and eyes and damage materials on contact",
      ["flammable", "an oxidizer that feeds fires", "radioactive"],
      "The corrosion pictogram shows the damage itself: drips eating into skin and metal. Corrosives like strong acids and bases carry it, which ties straight back to the acids and bases work in this unit.", {});
  },
  function () {
    return mcq("The exclamation mark pictogram on a lab container indicates",
      "a less severe health hazard, such as skin or eye irritation or skin sensitization",
      ["an explosive material", "a gas under pressure", "a substance fatal in small doses"],
      "The exclamation mark flags the lower-severity health hazards: irritation, allergic skin reaction, drowsiness. It still means read the label and handle with care, but it is a step below the skull and crossbones.", {});
  }
]), ["Read the picture literally: each WHMIS pictogram draws its own hazard."]);

E("sci-u2-whmis-safety", 2, ["SC10.8.1"], 1, "var", varset([
  function () {
    return mcq("Before using any chemical in the lab, the first safety step is to",
      "read its label (and SDS when needed) for the WHMIS pictograms, hazard statements and precautions",
      ["smell it cautiously to identify it", "mix a small amount with water to see what happens", "check its colour against a wall chart"],
      "The label is the contract: pictograms, signal word, hazard and precautionary statements tell you the risks and the handling before you open the container. Never identify a chemical by smell or taste, and never test-react an unknown.", {});
  },
  function () {
    return mcq("A student gets a splash of a corrosive liquid on their skin. The correct immediate action is to",
      "flush the skin with plenty of water at the safety station right away and tell the teacher",
      ["wipe it off with a paper towel and continue working", "apply a neutralizing chemical from the shelf to the skin", "wait until the end of class to mention it"],
      "Water, immediately and in quantity, dilutes and carries the corrosive away; seconds matter with burns. Neutralizers are for benches and spills under teacher direction, never for skin, and delay makes chemical burns worse.", {});
  }
]), ["Label first, water first: the two reflexes that prevent most lab injuries."]);

/* ---------- Unit 2 CR ---------- */

E("sci-u2-cr-naming", 2, ["SC10.8.1"], 2, "var", varset([
  function () {
    return textq("Naming and formulas (4 marks)\n(a) Write the chemical formula for calcium nitrate. (1)\n(b) Write the name of the compound with the formula FeCl3. (1)\n(c) Write the chemical formula for copper(II) sulfate. (1)\n(d) A binary molecular compound has the formula P2O5. Write its full name. (1)", ["(a) Ca(NO3)2: calcium is Ca2+ and nitrate is NO3- (charge 1), so two nitrate groups in brackets balance one calcium."], 
      "(a) Ca(NO3)2: calcium is Ca2+ and nitrate is NO3- (charge 1), so two nitrate groups in brackets balance one calcium. (b) Iron(III) chloride: iron is multivalent, and three Cl- (total -3) mean the iron is Fe3+, which the name must state. (c) CuSO4: Cu2+ with SO4 2- cancel one-to-one. (d) Diphosphorus pentoxide: prefixes di- (2) and penta- (5), with the second element ending in -ide.", 
      {});
  },
  function () {
    return textq("Naming and formulas (4 marks)\n(a) Write the chemical formula for ammonium phosphate. (1)\n(b) Write the name of the compound with the formula SnO2. (1)\n(c) Write the chemical formula for magnesium hydroxide. (1)\n(d) A compound has the formula Cu2O. Write its name, including the charge on the metal. (1)", ["(a) (NH4)3PO4: three NH4+ balance one PO4 3-, with brackets around the ammonium."], 
      "(a) (NH4)3PO4: three NH4+ balance one PO4 3-, with brackets around the ammonium. (b) Tin(IV) oxide: two O2- (total -4) require Sn4+. (c) Mg(OH)2: Mg2+ needs two OH- groups, shown with brackets and a subscript 2. (d) Copper(I) oxide: two copper ions balance one O2-, so each copper is Cu+.", 
      {});
  },
  function () {
    return textq("A fictional element (4 marks)\nAvalonium (symbol Av) is a fictional metal that behaves like the Group 2 metals: its atoms form ions with a 2+ charge. Portium (symbol Po) is a fictional nonmetal that behaves like the halogens: its atoms form ions with a 1- charge.\n(a) Write the chemical formula for avalonium chloride. (1)\n(b) Write the chemical formula for avalonium oxide. (1)\n(c) Write the chemical formula for the compound of avalonium with portium, and write its full name. (1)\n(d) State the rule you used to decide each formula. (1)",
      ["(a) AvCl2. (b) AvO. (c) AvPo2, avalonium portide. (d) The total positive charge must equal the total negative charge: cross the ion charges down as subscripts and reduce"],
      "(a) AvCl2: one Av2+ needs two Cl- to balance. (b) AvO: Av2+ and O2- balance one-to-one, and the crossed subscripts (2 and 2) reduce to 1 and 1. (c) AvPo2, named avalonium portide: one Av2+ with two Po-, the nonmetal's name ending in -ide. (d) In every ionic formula the charges must sum to zero: the cation's charge becomes the anion's subscript and the anion's charge becomes the cation's subscript (the cross-over), then subscripts are reduced to the lowest whole-number ratio. The fictional symbols change nothing: the rule is about charges, not about which real elements are involved.",
      {});
  }
]), ["Formulas are written with the cross-over of charges, in lowest terms, with brackets around repeated polyatomic groups."]);

E("sci-u2-cr-balance", 2, ["SC10.8.2", "SC10.8.3"], 3, "var", varset([
  function () {
    return textq("Balancing and classifying (3 marks)\nConsider the unbalanced equation: ___ C3H8 + ___ O2 → ___ CO2 + ___ H2O (propane burning in a barbecue).\n(a) Balance the equation. (1)\n(b) Classify the reaction type and state the evidence. (1)\n(c) Explain, in terms of atoms, why the balanced equation obeys the law of conservation of mass. (1)", ["(a) C3H8 + 5 O2 → 3 CO2 + 4 H2O."], 
      "(a) C3H8 + 5 O2 → 3 CO2 + 4 H2O. (b) Combustion: a fuel reacts with oxygen to produce carbon dioxide and water (it is also an exothermic reaction releasing heat and light). (c) Counting atoms: left side C 3, H 8, O 10; right side C 3, H 8, O 6 + 4 = 10. Identical atom counts on both sides mean nothing is created or destroyed, only rearranged, so the total mass is unchanged.", 
      {});
  },
  function () {
    return textq("Balancing and classifying (3 marks)\nConsider the unbalanced equation: ___ Al + ___ CuCl2 → ___ AlCl3 + ___ Cu.\n(a) Balance the equation. (1)\n(b) Classify the reaction type and explain which element replaces which. (1)\n(c) A student claims the products will weigh less than the reactants because a shiny new metal appears 'from nowhere'. Correct the claim. (1)", ["(a) 2 Al + 3 CuCl2 → 2 AlCl3 + 3 Cu."], 
      "(a) 2 Al + 3 CuCl2 → 2 AlCl3 + 3 Cu. (b) Single replacement: aluminum, the more reactive element, displaces copper from copper(II) chloride; the copper appears as a solid coating. (c) The copper was always there, dissolved as copper ions in the CuCl2. Atoms are conserved (Al 2, Cu 3, Cl 6 on both sides), so the total mass of products equals the total mass of reactants exactly; the metal changed form, not amount.", 
      {});
  }
]), ["Balance by changing coefficients only, never subscripts. Classification evidence comes from the pattern of reactants and products."]);

E("sci-u2-cr-rates", 2, ["SC10.8.6"], 3, "var", varset([
  function () {
    return textq("Reaction rates investigation (3 marks)\nA group investigates how temperature affects the reaction of marble chips (calcium carbonate) with hydrochloric acid, which produces carbon dioxide gas.\n(a) State the factor being changed, and two variables that must be kept the same for a fair test. (1)\n(b) Describe one way to measure the rate of this reaction. (1)\n(c) Using collision theory, explain why the warm acid reacts faster than the cold acid. (1)", ["(a) Changed: temperature of the acid."], 
      "(a) Changed: temperature of the acid. Kept the same (any two): mass and size of marble chips, volume and concentration of acid, same apparatus and timing method. (b) Measure the volume of CO2 collected in a gas syringe over time (or the mass lost on a balance as gas escapes), and compare how much forms in the first minute. (c) In warm acid the particles move faster: they collide with the marble surface more often, and a greater fraction of collisions carry at least the activation energy, so more collisions per second succeed in reacting.", 
      {});
  },
  function () {
    return textq("Reaction rates in the kitchen and the cold room (3 marks)\nFood spoils because of slow reactions driven by microbes and enzymes.\n(a) Explain, using two rate factors, why food kept in a refrigerator spoils more slowly than food left on the counter. (2)\n(b) A cook wants a marinade to flavour meat quickly. Suggest one change, based on rate factors, and explain why it works. (1)", ["(a) Factor 1, temperature: cold particles move slowly, collisions are less frequent and less energetic, so spoilage reactions crawl."], 
      "(a) Factor 1, temperature: cold particles move slowly, collisions are less frequent and less energetic, so spoilage reactions crawl. Factor 2, nature of reactants / catalyst action: cold also keeps microbial enzymes working far below their best rate, slowing the catalyzed spoilage reactions. (Full credit needs the collision story for temperature plus the enzyme point, or an equivalent second mechanism.) (b) Any one: warm the marinade slightly (temperature), cut the meat into smaller pieces (surface area), or use a more concentrated marinade: each raises collision frequency or energy between marinade and meat surfaces.", 
      {});
  }
]), ["Every rate explanation needs the collision story: frequency, energy, or the activation energy barrier."]);

/* ---------- Inventory additions: WHMIS pictogram images, predicting products, identifying unknowns ---------- */

function s6WhmisSVG(kind) {
  var glyph = "";
  if (kind === "flame") {
    glyph = '<path d="M100 62 C 88 84, 76 94, 76 112 a24 22 0 0 0 48 0 C 124 94, 112 84, 100 62 Z M100 96 C 94 106, 90 110, 90 117 a10 9 0 0 0 20 0 C 110 110, 106 106, 100 96 Z" fill="#111"/>';
  } else if (kind === "skull") {
    glyph = '<circle cx="100" cy="88" r="26" fill="#111"/><rect x="86" y="104" width="28" height="10" fill="#111"/>' +
      '<circle cx="90" cy="86" r="6" fill="#fff"/><circle cx="110" cy="86" r="6" fill="#fff"/><rect x="97" y="94" width="6" height="8" fill="#fff"/>' +
      '<line x1="72" y1="126" x2="128" y2="144" stroke="#111" stroke-width="6"/><line x1="128" y1="126" x2="72" y2="144" stroke="#111" stroke-width="6"/>' +
      '<circle cx="70" cy="124" r="6" fill="#111"/><circle cx="130" cy="124" r="6" fill="#111"/><circle cx="70" cy="146" r="6" fill="#111"/><circle cx="130" cy="146" r="6" fill="#111"/>';
  } else if (kind === "corrosion") {
    glyph = '<g stroke="#111" stroke-width="5" fill="none"><path d="M58 58 L88 78"/><path d="M142 58 L112 78"/></g>' +
      '<rect x="50" y="48" width="16" height="8" fill="#111"/><rect x="134" y="48" width="16" height="8" fill="#111"/>' +
      '<circle cx="92" cy="92" r="4" fill="#111"/><circle cx="108" cy="92" r="4" fill="#111"/>' +
      '<rect x="56" y="116" width="40" height="10" fill="#111"/><rect x="104" y="116" width="40" height="10" fill="#111"/>' +
      '<path d="M64 126 l4 14 M84 126 l-2 12 M112 126 l2 12 M132 126 l-4 14" stroke="#111" stroke-width="4"/>';
  } else {
    glyph = '<rect x="94" y="58" width="12" height="56" rx="4" fill="#111"/><circle cx="100" cy="132" r="8" fill="#111"/>';
  }
  var pts = [];
  for (var i = 0; i < 8; i++) {
    var a = Math.PI / 8 + i * Math.PI / 4;
    pts.push((100 + 78 * Math.cos(a)).toFixed(1) + "," + (100 + 78 * Math.sin(a)).toFixed(1));
  }
  return '<svg viewBox="0 0 200 200" width="170" role="img" aria-label="WHMIS pictogram"><polygon points="' + pts.join(" ") + '" fill="#fff" stroke="#d42a24" stroke-width="10"/>' + glyph + "</svg>";
}
var S6_WHMIS_IMG = [
  { kind: "flame", ans: "Flammable: the contents can catch fire easily", others: ["Corrosive: the contents eat into skin and metal on contact", "Acute toxicity: a small exposure can be fatal", "Health hazard: the contents irritate skin and eyes"], why: "The flame inside the red octagon is the flammable pictogram: keep the material away from heat, sparks and open flame." },
  { kind: "skull", ans: "Acute toxicity: even a small exposure can cause death or serious harm", others: ["Flammable: the contents can catch fire easily", "Corrosive: the contents eat into skin and metal on contact", "Health hazard: the contents irritate skin and eyes"], why: "Skull and crossbones is the most serious immediate warning in WHMIS: fatal or toxic if swallowed, inhaled or absorbed." },
  { kind: "corrosion", ans: "Corrosive: the contents can burn skin and eyes and damage materials", others: ["Flammable: the contents can catch fire easily", "Acute toxicity: even a small exposure can be fatal", "Explosive: the contents can detonate"], why: "The pictogram shows liquid dripping from test tubes and eating into a surface and a hand: corrosion." },
  { kind: "exclaim", ans: "Health hazard: the contents can irritate skin or eyes or cause an allergic skin reaction", others: ["Acute toxicity: even a small exposure can be fatal", "Flammable: the contents can catch fire easily", "Corrosive: the contents eat into skin and metal on contact"], why: "The exclamation mark flags the less severe health hazards: irritation and sensitization. Serious does not mean ignorable; it means read the label and handle with care." }
];
E("sci-u2-whmis-images", 2, ["SC10.8.1"], 1, "gen", function () {
  var it = s6pick(S6_WHMIS_IMG);
  var q = mcq("A container in the science lab carries the WHMIS pictogram shown. It warns that",
    it.ans, it.others, it.why, { kind: it.kind });
  q.figure = s6WhmisSVG(it.kind);
  return q;
}, ["Match the picture to the hazard it draws: flame, skull, dripping tubes, exclamation mark."]);

E("sci-u2-products", 2, ["SC10.8.3"], 2, "gen", function () {
  var d = s6classDraw(function () { return true; });
  var left = s6eqText2(d.item.r, [], d.co, -1).replace(/\s*→\s*$/, "");
  var rightTxt = s6eqText2([], d.prods, d.co, -1).replace(/^\s*→\s*/, "");
  var right = d.co.slice(d.item.r.length).map(function (c, i) {
    var nm = s6disp(d.prods[i]);
    return (c > 1 ? c + " " : "") + nm;
  }).join(" + ");
  var wrongSets = [];
  var others = s6shuf(S6_CLASSIFY.filter(function (x) { return x !== d.item; }));
  for (var i = 0; i < others.length && wrongSets.length < 3; i++) {
    var o = others[i];
    var opr = o.extra ? o.p.concat(o.extra) : o.p;
    var oc = s6balance(o.r, opr);
    if (!oc) continue;
    var ot = oc.slice(o.r.length).map(function (c, j) { return (c > 1 ? c + " " : "") + s6disp(opr[j]); }).join(" + ");
    if (ot !== right && wrongSets.indexOf(ot) < 0) wrongSets.push(ot);
  }
  var eqFull = s6eqText2(d.item.r, d.prods, d.co, -1);
  return mcq("Predict the products: " + left + " → ? The reaction is a " + d.item.t + " reaction. The products are",
    right, wrongSets,
    "Follow the " + d.item.t + " pattern and balance: the full equation is " + eqFull + ".",
    { left: left, t: d.item.t });
}, ["Read the reaction type off the reactants, build the products from the pattern, then check the balance."]);

E("sci-u2-identify", 2, ["SC10.8.1"], 2, "var", varset([
  function () {
    return mcq("An unknown white solid does not conduct electricity as a solid OR when dissolved in water, and it melts at a low temperature. The compound is most likely",
      "a molecular compound (such as sugar): its neutral molecules carry no charge in any state",
      ["an ionic compound: its ions are locked in place until it melts", "a metal: its electrons are shared in a lattice", "an acid: it must produce hydrogen ions in water"],
      "No conduction in either state rules out ions entirely: ionic compounds conduct once their ions are free (molten or dissolved). Charge-free molecules explain both observations and the low melting point fits weak intermolecular forces.", {});
  },
  function () {
    return mcq("A dissolved sample is tested: it conducts electricity, turns blue litmus red, and fizzes with magnesium ribbon. The sample is",
      "an acid solution (such as dilute hydrochloric acid)",
      ["a base solution (such as sodium hydroxide)", "a salt solution (such as sodium chloride)", "a molecular compound that does not ionize (such as sugar)"],
      "Three tests, one conclusion: conduction says ions are present, blue-to-red litmus says acid, and hydrogen gas from a metal confirms it. A salt solution conducts but leaves litmus unchanged; a base flips litmus the other way.", {});
  },
  function () {
    return mcq("Two unlabelled bottles hold white powders: sodium chloride and glucose (a molecular compound). The safest distinguishing test is to",
      "dissolve each in distilled water and test the solutions with a conductivity tester: the salt solution conducts, the glucose solution does not",
      ["taste a tiny amount of each", "heat both until they decompose and compare the smells", "add acid to both and watch for fizzing"],
      "Ionic versus molecular shows up cleanly in solution conductivity: NaCl releases ions, glucose stays as neutral molecules. Tasting unknown chemicals is never an option, and both powders survive gentle tests without telling you anything as clear.", {});
  }
]), ["Let the properties vote: conduction sorts ionic from molecular, litmus sorts acid from base from neutral."]);

/* ---------- Unit 2 top-ups ---------- */

E("sci-u2-symbolic-read", 2, ["SC10.8.2"], 2, "var", varset([
  function () {
    return mcq("The equation 2 H2 + O2 → 2 H2O is read aloud correctly as",
      "'Two molecules of hydrogen react with one molecule of oxygen to produce two molecules of water'",
      ["'Two atoms of hydrogen react with oxygen to produce water'", "'Hydrogen and oxygen produce hydrogen peroxide'", "'Two grams of hydrogen react with one gram of oxygen'"],
      "Coefficients count molecules (or moles) of each substance, not atoms and not grams: the 2 in front of H2 doubles the whole H2 molecule. Subscripts belong to the formulas and are never read as quantities reacting.", {});
  },
  function () {
    return mcq("In the equation CH4 + 2 O2 → CO2 + 2 H2O, the coefficient 2 in front of O2 means",
      "two molecules of oxygen take part for every one molecule of methane burned",
      ["each oxygen molecule contains two atoms", "two grams of oxygen are needed", "the oxygen is twice as reactive as the methane"],
      "Coefficients are the recipe ratio between substances. The subscript in O2 (the 2 inside the formula) is the one that says two atoms per molecule; the coefficient outside multiplies whole molecules.", {});
  }
]), ["Coefficients count whole molecules in the recipe; subscripts live inside a formula and describe its makeup."]);

E("sci-u2-states", 2, ["SC10.8.2"], 1, "var", varset([
  function () {
    return mcq("In the equation AgNO3(aq) + NaCl(aq) → AgCl(s) + NaNO3(aq), the state symbols tell you that",
      "the silver chloride forms as a solid precipitate, while the other substances are dissolved in water (aqueous)",
      ["all four substances are gases", "the (s) substance is a solution", "the (aq) substances are pure liquids"],
      "(aq) means aqueous: dissolved in water. (s) is solid, and a solid appearing from two clear solutions is a precipitate, the visual evidence of this double replacement reaction.", {});
  },
  function () {
    return mcq("Which state symbol set is written correctly?",
      "H2O(l) for liquid water, CO2(g) for carbon dioxide gas, NaCl(s) for solid salt, NaCl(aq) for salt solution",
      ["H2O(g) for the water in a beaker", "CO2(s) for the gas in a soda", "NaCl(aq) for dry table salt in a shaker"],
      "(s), (l), (g) and (aq) describe the physical state in the reaction as written: beaker water is liquid, soda bubbles are gas, shaker salt is a dry solid, and (aq) requires actual water as the solvent.", {});
  }
]), ["State symbols: (s) solid, (l) liquid, (g) gas, (aq) dissolved in water."]);

E("sci-u2-acid-rain", 2, ["SC10.8.5"], 3, "var", varset([
  function () {
    return mcq("Acid rain forms when sulfur dioxide and nitrogen oxides from burning fossil fuels react with water in the atmosphere to make sulfuric and nitric acids. In Newfoundland and Labrador the damage is worse than the emissions alone would suggest because",
      "much of the province's bedrock is granite with little carbonate, so soils and lakes have almost no natural base to neutralize the incoming acid",
      ["the province receives more rain than anywhere else on Earth", "the acids become stronger in cold climates", "local lakes contain no organisms to absorb the acid"],
      "Neutralization capacity (buffering) is geology: limestone country spends the acid on rock, granite country cannot. The same deposition that a limestone lake shrugs off acidifies a granite-bed lake, which is why monitoring here watches lake pH closely.", {});
  },
  function () {
    return mcq("A lake's pH has fallen from 6.5 to 5.0 over twenty years of acid deposition. The hydrogen ion concentration has",
      "increased by a factor of about 30 (1.5 pH units of change, at tenfold per unit)",
      ["increased by a factor of 1.5", "decreased by a factor of 30", "stayed the same: only the reading changed"],
      "Each pH unit is a tenfold step: 1 unit is x10, and the extra half unit multiplies by about 3 more, giving roughly x30. Small-looking pH changes are large chemistry changes, which is why a drop of 1.5 units transforms a lake's biology.", {});
  }
]), ["Acid rain is a neutralization problem written across a whole landscape: the damage depends on what base the land can offer."]);

E("sci-u2-ion-count", 2, ["SC10.8.1"], 2, "gen", function () {
  var items = [
    { f: "Ca(OH)2", ion: "hydroxide ions", n: 2, why: "The subscript 2 outside the brackets applies to the whole OH group: 2 hydroxide ions per formula unit (and 1 calcium ion)." },
    { f: "Al2(SO4)3", ion: "sulfate ions", n: 3, why: "The bracket subscript gives 3 sulfate ions; the Al subscript gives 2 aluminum ions." },
    { f: "(NH4)3PO4", ion: "ammonium ions", n: 3, why: "Three NH4+ groups balance the one PO4 3-: 3 ammonium ions per formula unit." },
    { f: "Mg(NO3)2", ion: "nitrate ions", n: 2, why: "Two nitrate groups for the one Mg2+: the bracket subscript 2 is the count." },
    { f: "Na2CO3", ion: "sodium ions", n: 2, why: "The subscript on Na is 2: two sodium ions for each carbonate." },
    { f: "Fe2O3", ion: "iron ions", n: 2, why: "The subscript 2 after Fe counts 2 iron ions (each Fe3+, balancing 3 O2-)." }
  ];
  var it = s6pick(items);
  return mcq("How many " + it.ion + " are in one formula unit of " + s6fsub(it.f) + "?",
    String(it.n), s6numDist(it.n, [it.n + 1, it.n + 2, Math.max(1, it.n - 1)], ""),
    it.why + " Bracket subscripts multiply everything inside the brackets; plain subscripts multiply only their own element or ion.", { f: it.f, n: it.n });
}, ["Read brackets as packages: the outside subscript counts whole packages."]);
