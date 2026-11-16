// CRMARKS: s9-u2-cr-properties=3
// CRMARKS: s9-u2-cr-atom-model=3
// CRMARKS: s9-u2-cr-symbols=3
// CRMARKS: s9-u2-cr-formulas=3
// CRMARKS: s9-u2-cr-changes=3
// CRMARKS: s9-u2-cr-atomic-history=3
// CRMARKS: s9-u2-cr-gold-foil=3
// CRMARKS: s9-u2-cr-periodic-evidence=3
// CRMARKS: s9-u2-cr-commercial-material=3
// CRMARKS: s9-u2-cr-materials-decision=4
// CRMARKS: s9-u2-cr-design-change=4
// CRMARKS: s9-u2-cr-data-display=3
// CRMARKS: s9-u2-cr-conclusion=3
// CRMARKS: s9-u2-cr-trends=3
// CRMARKS: s9-u2-cr-classify-change=3
// Science 9 Unit 2 bank: Atoms, Elements, and Compounds
// (SC9.4.1 to SC9.6.10), built Nov 15, 2026 to the Atoms
// authoring spec. All entries are original and were written
// new for this app. Existing tests and question banks,
// including teacher masters (Selected Response items 36 to 70
// and the Constructed Response chemistry set), the ESD Grade 9
// Unit 2 Chemistry folder, the MHR ExamView Chapters 1 to 3
// and the strand Core Labs, were reviewed only to gauge the
// expected depth and range of treatment: no source scenario,
// values or wording is carried verbatim.
// Guide discipline: Bohr-Rutherford diagrams cover elements
// 1 to 18 only, with energy levels drawn as levels, not as
// electron paths, and the octet rule is not taught; isotopes
// are not taught in this strand. Compound naming excludes
// multivalent metals and polyatomic ions except calcium
// carbonate and sodium hydroxide; students recognize the
// listed ionic and molecular names and name simple compounds
// from formulas, but are not expected to write formulas for
// ionic or molecular compounds, so no entry asks them to.
// Atomic structure formation of ionic and molecular bonds is
// not taught at this level and is never keyed.
// CORE residue: SC9.6.1 (WHMIS) entries assess scenario
// judgement on handling, disposal and data sheet use; the
// bench performance itself is classroom assessment.
// SC9.6.8 (tools safely) carries one scenario entry on flame
// test technique; handling of apparatus is classroom
// assessment. SC9.5.8 to SC9.5.11 share one guide focus text
// (the Plastics core STSE); entries are keyed distinctly to
// each spreadsheet statement, as the spec records.

function s9u2Fig_props() {
  return "<table style='border-collapse:collapse;font-size:14px'><tr><th style='border:1px solid #999;padding:4px 8px'>Material</th><th style='border:1px solid #999;padding:4px 8px'>Melting point</th><th style='border:1px solid #999;padding:4px 8px'>Conducts heat</th><th style='border:1px solid #999;padding:4px 8px'>Flexible</th></tr>"
    + "<tr><td style='border:1px solid #999;padding:4px 8px'>A</td><td style='border:1px solid #999;padding:4px 8px'>Melts at 90 degrees C</td><td style='border:1px solid #999;padding:4px 8px'>Poorly</td><td style='border:1px solid #999;padding:4px 8px'>Yes</td></tr>"
    + "<tr><td style='border:1px solid #999;padding:4px 8px'>B</td><td style='border:1px solid #999;padding:4px 8px'>No melting below 300 degrees C</td><td style='border:1px solid #999;padding:4px 8px'>Poorly</td><td style='border:1px solid #999;padding:4px 8px'>Yes</td></tr>"
    + "<tr><td style='border:1px solid #999;padding:4px 8px'>C</td><td style='border:1px solid #999;padding:4px 8px'>No melting below 300 degrees C</td><td style='border:1px solid #999;padding:4px 8px'>Poorly</td><td style='border:1px solid #999;padding:4px 8px'>No, cracks when bent</td></tr>"
    + "<tr><td style='border:1px solid #999;padding:4px 8px'>D</td><td style='border:1px solid #999;padding:4px 8px'>Softens at 150 degrees C</td><td style='border:1px solid #999;padding:4px 8px'>Very well</td><td style='border:1px solid #999;padding:4px 8px'>Yes</td></tr></table>";
}
function s9u2Fig_atom() {
  return "<svg viewBox='0 0 300 220' width='100%' style='max-width:300px' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='13'>"
    + "<line x1='30' y1='60' x2='270' y2='60' stroke='#888' stroke-width='1.5'/><line x1='30' y1='110' x2='270' y2='110' stroke='#888' stroke-width='1.5'/><line x1='30' y1='160' x2='270' y2='160' stroke='#888' stroke-width='1.5'/>"
    + "<circle cx='70' cy='60' r='5' fill='#3a7bd5'/><circle cx='120' cy='60' r='5' fill='#3a7bd5'/><circle cx='90' cy='110' r='5' fill='#3a7bd5'/><circle cx='180' cy='110' r='5' fill='#3a7bd5'/><circle cx='230' cy='110' r='5' fill='#3a7bd5'/><circle cx='150' cy='160' r='5' fill='#3a7bd5'/>"
    + "<circle cx='150' cy='110' r='18' fill='#e8b13c' stroke='#8a6a1f' stroke-width='1.5'/>"
    + "<g font-weight='bold'><circle cx='40' cy='34' r='11' fill='#fff' stroke='#333'/><text x='40' y='39' text-anchor='middle'>A</text>"
    + "<circle cx='150' cy='80' r='11' fill='#fff' stroke='#333'/><text x='150' y='85' text-anchor='middle'>B</text>"
    + "<circle cx='262' cy='34' r='11' fill='#fff' stroke='#333'/><text x='262' y='39' text-anchor='middle'>C</text>"
    + "<circle cx='262' cy='186' r='11' fill='#fff' stroke='#333'/><text x='262' y='191' text-anchor='middle'>D</text></g></svg>"
    + "<div style='font-size:13px'>Energy levels are drawn as horizontal lines. Blue dots are electrons. Letter D marks empty space below the lowest drawn level.</div>";
}
function s9u2Fig_ptable() {
  function cell(sym, z) { return "<td style='border:1px solid #999;padding:4px 8px;text-align:center'>" + sym + "<br><span style='font-size:11px'>" + z + "</span></td>"; }
  function empty() { return "<td style='border:1px solid #ddd;padding:4px 8px;background:#f4f4f4'></td>"; }
  return "<table style='border-collapse:collapse;font-size:14px'><tr><td style='padding:4px 8px'></td><th style='padding:4px 8px'>Group 1</th><th style='padding:4px 8px'>Group 2</th><th style='padding:4px 8px'>Group 16</th><th style='padding:4px 8px'>Group 17</th><th style='padding:4px 8px'>Group 18</th></tr>"
    + "<tr><th style='padding:4px 8px'>Period 2</th>" + cell("Li", 3) + cell("Be", 4) + cell("O", 8) + cell("F", 9) + cell("Ne", 10) + "</tr>"
    + "<tr><th style='padding:4px 8px'>Period 3</th>" + cell("Na", 11) + cell("Mg", 12) + cell("S", 16) + cell("Cl", 17) + cell("Ar", 18) + "</tr></table>";
}
function s9u2Fig_particles() {
  function dots(pos, color) { var s = ""; for (var i = 0; i < pos.length; i++) { s += "<circle cx='" + pos[i][0] + "' cy='" + pos[i][1] + "' r='7' fill='" + color + "'/>"; } return s; }
  var solid = [[30,30],[55,30],[80,30],[30,55],[55,55],[80,55],[30,80],[55,80],[80,80]];
  var liquid = [[28,75],[50,60],[75,78],[40,38],[68,42],[88,58],[25,50],[58,82],[85,30]];
  var gas = [[20,20],[95,30],[45,85],[100,90],[70,55],[25,95],[105,60],[55,15],[85,100]];
  return "<svg viewBox='0 0 360 130' width='100%' style='max-width:360px' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='12'>"
    + "<rect x='5' y='5' width='110' height='110' fill='none' stroke='#555'/>" + dots(solid, "#3a7bd5") + "<text x='60' y='128' text-anchor='middle'>Panel 1</text>"
    + "<rect x='125' y='5' width='110' height='110' fill='none' stroke='#555'/><g transform='translate(120,0)'>" + dots(liquid, "#3a7bd5") + "</g><text x='180' y='128' text-anchor='middle'>Panel 2</text>"
    + "<rect x='245' y='5' width='110' height='110' fill='none' stroke='#555'/><g transform='translate(240,0)'>" + dots(gas, "#3a7bd5") + "</g><text x='300' y='128' text-anchor='middle'>Panel 3</text></svg>"
    + "<div style='font-size:13px'>Panel 1, Panel 2 and Panel 3 show the same substance in three different states, in that order in the question's terms.</div>";
}
function s9u2Fig_propsdata() {
  function row(s, a, b, c) { return "<tr><td style='border:1px solid #999;padding:4px 8px'>" + s + "</td><td style='border:1px solid #999;padding:4px 8px'>" + a + "</td><td style='border:1px solid #999;padding:4px 8px'>" + b + "</td><td style='border:1px solid #999;padding:4px 8px'>" + c + "</td></tr>"; }
  return "<table style='border-collapse:collapse;font-size:14px'><tr><th style='border:1px solid #999;padding:4px 8px'>Sample</th><th style='border:1px solid #999;padding:4px 8px'>Conducts electricity</th><th style='border:1px solid #999;padding:4px 8px'>Appearance</th><th style='border:1px solid #999;padding:4px 8px'>When struck</th></tr>"
    + row("A", "No", "Dull", "Shatters") + row("B", "No", "Dull", "Crumbles to powder") + row("C", "Yes", "Shiny", "Bends without breaking") + row("D", "Slightly", "Dull", "Breaks cleanly") + "</table>";
}
function s9u2Fig_trend() {
  return "<svg viewBox='0 0 320 220' width='100%' style='max-width:320px' xmlns='http://www.w3.org/2000/svg' font-family='sans-serif' font-size='12'>"
    + "<line x1='45' y1='15' x2='45' y2='180' stroke='#333'/><line x1='45' y1='180' x2='300' y2='180' stroke='#333'/>"
    + "<path d='M45 165 L100 90 L155 55 L210 42 L265 38 L295 37' fill='none' stroke='#c0392b' stroke-width='2.5'/>"
    + "<text x='170' y='205' text-anchor='middle'>Time (minutes)</text><text x='15' y='100' transform='rotate(-90 15 100)' text-anchor='middle'>Temperature (degrees C)</text>"
    + "<text x='45' y='195' text-anchor='middle'>0</text><text x='295' y='195' text-anchor='middle'>5</text></svg>";
}
function s9u2Fig_flame() {
  function row(s, c) { return "<tr><td style='border:1px solid #999;padding:4px 8px'>" + s + "</td><td style='border:1px solid #999;padding:4px 8px'>" + c + "</td></tr>"; }
  return "<table style='border-collapse:collapse;font-size:14px'><tr><th style='border:1px solid #999;padding:4px 8px'>Sample</th><th style='border:1px solid #999;padding:4px 8px'>Flame colour</th></tr>"
    + row("Lithium standard", "Red") + row("Calcium standard", "Orange") + row("Unknown 1", "Red") + row("Unknown 2", "Orange") + row("Unknown 3", "Pale yellow, unclear") + row("Unknown 4", "Orange, from a long-burning splint whose wood had caught fire") + "</table>";
}


/* ---------- SC9.4.1 ---------- */

E("s9-u2-property-sort", 2, ["SC9.4.1"], 1, "var", varset([
  function () {
    return mcq("Which list contains only physical properties of a substance?",
      "Colour, lustre, density and melting point",
      ["Colour, reactivity, density and melting point", "Flammability, lustre, density and texture", "Colour, lustre, density and ability to burn"],
      "Physical properties can be observed or measured without changing the substance into a new one: colour, lustre, density, melting point and texture are all of this kind. Reactivity, flammability and the ability to burn describe how a substance behaves in a chemical reaction, so they are chemical properties.",
      {});
  }
]), ["Sort each word: can it be checked without making a new substance?", "Anything about burning or reacting belongs in the other group."]);

E("s9-u2-chem-property", 2, ["SC9.4.1"], 1, "var", varset([
  function () {
    return mcq("A fizzing reaction occurs when vinegar is added to a sample of limestone, but nothing happens when vinegar is added to quartz. What does the fizzing show?",
      "Limestone has a chemical property that quartz does not share: it reacts with acid",
      ["Limestone has a lower density than quartz", "Quartz has a physical property that limestone does not share: it reacts with acid", "The vinegar has changed into a new physical state"],
      "Reactivity is a chemical property: it describes how a substance behaves when it meets another substance. The fizzing is evidence of that reaction, and the difference between the two minerals is a difference in chemical properties, not in a measurable physical property such as density.",
      {});
  }
]), ["Fizzing means gases forming in a reaction. Which kind of property covers reacting?", "Compare what each mineral did when the same test was applied."]);

E("s9-u2-glove-choice", 2, ["SC9.4.1"], 2, "var", varset([
  function () {
    var q = mcq("A work crew needs gloves for handling hot trays. Using the data table, which material is the best choice, and why?",
      "Material B, because it resists heat and does not melt at tray temperatures",
      ["Material A, because it is the most flexible material in the table", "Material C, because it is the cheapest material in the table", "Material D, because it conducts heat away from the hands fastest"],
      "Materials are chosen so their properties match the job. Hot trays demand heat resistance and a melting point safely above the tray temperature, which only Material B provides in the table. Flexibility and price matter, but a glove that melts or passes heat to the hand fails the job it was chosen for.",
      {});
    q.figure = s9u2Fig_props();
    return q;
  }
]), ["Match the table columns to the job first: heat is the hazard here.", "A material that conducts heat well is the worst choice for hot work."]);

E("s9-u2-property-cases", 2, ["SC9.4.1"], 2, "gen", function () {
  var cases = [
    { q: "A jeweller chooses a metal for a ring band mainly because it can be hammered and shaped without cracking. Which property is doing the work in this choice?", k: "Malleability, a physical property", w: ["Combustibility, a chemical property", "Reactivity with acids, a chemical property", "Toxicity, a chemical property"], s: "Malleability is the ability to be bent or moulded into shape, observed without changing the metal into a new substance, so it is a physical property. The chemical properties listed all describe behaviour in reactions." },
    { q: "A camp stove fuel is chosen because it burns readily and releases a great deal of heat. Which property is doing the work in this choice?", k: "Combustibility, a chemical property", w: ["Density, a physical property", "Lustre, a physical property", "Melting point, a physical property"], s: "Combustibility describes how a substance behaves when it burns, a chemical reaction producing new substances, so it is a chemical property. Density, lustre and melting point are all measurable without any reaction." },
    { q: "Electrical wire is made of copper largely because current passes through it easily. Which property is doing the work in this choice?", k: "Electrical conductivity, a physical property", w: ["Reactivity, a chemical property", "Flammability, a chemical property", "Combustibility, a chemical property"], s: "Electrical conductivity is listed among the physical properties: it can be measured without the copper becoming a new substance. Reactivity, flammability and combustibility all involve chemical reactions." },
    { q: "A warning label notes that a cleaning powder must never be mixed with acids because the mixture releases a harmful gas. Which property does the label describe?", k: "Reactivity, a chemical property", w: ["Texture, a physical property", "Magnetism, a physical property", "Boiling point, a physical property"], s: "Reactivity describes what a substance does when it meets another substance, here producing a harmful gas in a chemical reaction, so it is a chemical property. Texture, magnetism and boiling point need no reaction to observe." }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w, c.s, {});
}, ["Decide first whether the property needs a reaction to show itself.", "No reaction, physical; reaction behaviour, chemical."]);

E("s9-u2-cr-properties", 2, ["SC9.4.1"], 2, "var", varset([
  function () {
    return textq("A camper must choose between two unlabelled metal cups for cooking over a fire: Cup X is shiny, feels heavy for its size, and does not react with vinegar; Cup Y is dull, light, and slowly darkens in air. Describe the two cups in terms of physical and chemical properties, and state which observations are physical and which are chemical. (3 marks)",
      ["cup X shows physical properties of lustre and high density and the chemical property of low reactivity with acid", "cup Y shows physical properties of dullness and low density and darkening in air is a chemical property", "darkening in air indicates a chemical change producing a new surface substance"],
      "<b>Model answer:</b> Cup X: shiny (lustre, physical), heavy for its size (high density, physical), and unreactive with vinegar (low reactivity, chemical). Cup Y: dull (no lustre, physical), light for its size (low density, physical), and it darkens in air, which is a chemical property in action because a new surface substance is forming. Physical properties are observed without making a new substance; chemical properties describe behaviour in reactions.<br><br><b>Marking points:</b> 1 mark for correctly sorting Cup X's observations into physical (lustre, density) and chemical (reactivity). 1 mark for correctly sorting Cup Y's observations. 1 mark for stating the deciding test: physical properties need no new substance, chemical properties show in reactions such as darkening in air.",
      {});
  }
]), ["Properties you can see or measure without a reaction are one kind.", "Darkening in air means a new substance is forming on the surface."]);


/* ---------- SC9.4.2 ---------- */

E("s9-u2-particle-table", 2, ["SC9.4.2"], 1, "var", varset([
  function () {
    return mcq("Which row correctly describes all three subatomic particles?",
      "Proton: positive charge, in the nucleus; neutron: no charge, in the nucleus; electron: negative charge, in the energy levels around the nucleus",
      ["Proton: no charge, in the nucleus; neutron: positive charge, in the nucleus; electron: negative charge, in the nucleus", "Proton: positive charge, in the energy levels; neutron: no charge, in the nucleus; electron: negative charge, in the nucleus", "Proton: positive charge, in the nucleus; neutron: negative charge, in the nucleus; electron: no charge, around the nucleus"],
      "Protons carry a positive charge and sit in the nucleus with the neutrons, which carry no charge. Electrons carry a negative charge and are found in the energy levels around the nucleus, never inside it. Charge and location together identify each particle.",
      {});
  }
]), ["Two of the three particles share the nucleus. Which two?", "Only one particle is negative, and it is the one outside the nucleus."]);

E("s9-u2-atom-def", 2, ["SC9.4.2"], 2, "var", varset([
  function () {
    return mcq("Which statement best defines an atom?",
      "The smallest particle of an element that still has the properties of that element",
      ["Any small particle of matter, including a grain of dust or sand", "A group of two or more elements chemically joined together", "The smallest piece of a compound that can be divided further"],
      "An atom is the smallest particle of an element that retains that element's properties. A joined group of atoms of different elements belongs to a compound, and everyday grains are enormous collections of atoms, not single atoms.",
      {});
  }
]), ["The definition is tied to one element, not to mixtures or compounds.", "Think smallest piece that is still that element."]);

E("s9-u2-counts-gen", 2, ["SC9.4.2"], 2, "gen", function () {
  var els = [
    { n: "carbon", z: 6, a: 12 }, { n: "oxygen", z: 8, a: 16 }, { n: "sodium", z: 11, a: 23 },
    { n: "aluminum", z: 13, a: 27 }, { n: "chlorine", z: 17, a: 35 }, { n: "calcium", z: 20, a: 40 },
    { n: "iron", z: 26, a: 56 }, { n: "zinc", z: 30, a: 65 }
  ];
  var e = pick(els); var neu = e.a - e.z;
  var mode = pick(["n", "p", "e"]);
  if (mode === "n") {
    var ndis = [e.z === neu ? e.z + 3 : e.z, e.a, neu + 2].filter(function (x) { return x !== neu; });
    var nseen = []; ndis = ndis.filter(function (x) { if (nseen.indexOf(x) >= 0) return false; nseen.push(x); return true; });
    while (ndis.length < 3) { ndis.push(neu + ndis.length + 4); }
    return mcq("An atom of " + e.n + " has an atomic number of " + e.z + " and a mass number of " + e.a + ". How many neutrons does it contain?",
      String(neu), ndis.map(String),
      "Neutrons = mass number - atomic number = " + e.a + " - " + e.z + " = " + neu + ". The atomic number counts protons, and protons plus neutrons make up the mass number.", {});
  } else if (mode === "p") {
    var pdis = [e.a, e.a - e.z + 3, e.z + e.a].filter(function (x) { return x !== e.z; });
    var pseen = []; pdis = pdis.filter(function (x) { if (pseen.indexOf(x) >= 0) return false; pseen.push(x); return true; });
    while (pdis.length < 3) { pdis.push(e.z + pdis.length + 4); }
    return mcq("An atom of " + e.n + " has an atomic number of " + e.z + " and a mass number of " + e.a + ". How many protons does it contain?",
      String(e.z), pdis.map(String),
      "The atomic number is the number of protons, so this atom has " + e.z + " protons. The mass number is not needed for this count; it would be used to find the neutrons.", {});
  }
  var edis = [e.a, e.a - e.z + 3, e.z + 2].filter(function (x) { return x !== e.z; });
  var eseen = []; edis = edis.filter(function (x) { if (eseen.indexOf(x) >= 0) return false; eseen.push(x); return true; });
  while (edis.length < 3) { edis.push(e.z + edis.length + 4); }
  return mcq("A neutral atom of " + e.n + " has an atomic number of " + e.z + " and a mass number of " + e.a + ". How many electrons does it contain?",
    String(e.z), edis.map(String),
    "In a neutral atom the electrons balance the protons, and the atomic number gives the proton count, so there are " + e.z + " electrons. The mass number plays no part in the electron count of a neutral atom.", {});
}, ["Atomic number is the proton count; mass number is protons plus neutrons.", "A neutral atom has equal protons and electrons."]);

E("s9-u2-atom-figure", 2, ["SC9.4.2"], 3, "var", varset([
  function () {
    var q = mcq("In the atom diagram, which letter marks the part of the atom where almost all of the atom's mass is concentrated?",
      "B",
      ["A", "C", "D"],
      "Almost all of an atom's mass sits in its tiny central nucleus, which holds the protons and neutrons; electrons contribute almost no mass. In the diagram the nucleus is the central cluster, marked B. The surrounding energy levels hold only electrons.",
      {});
    q.figure = s9u2Fig_atom();
    return q;
  }
]), ["Mass lives with the protons and neutrons. Where are they drawn?", "The centre of the diagram is the key region."]);

E("s9-u2-cr-atom-model", 2, ["SC9.4.2"], 3, "var", varset([
  function () {
    return textq("Draw or describe a Bohr-Rutherford style model of a sodium atom (atomic number 11, mass number 23), and label the number of protons, neutrons and electrons and where each is found. (3 marks)",
      ["nucleus contains 11 protons and 12 neutrons, found by 23 minus 11", "11 electrons arranged 2 in the first energy level, 8 in the second and 1 in the third", "electrons sit in energy levels around the nucleus, not inside it"],
      "<b>Model answer:</b> The nucleus at the centre holds 11 protons (the atomic number) and 12 neutrons (mass number 23 minus 11 protons). Around the nucleus, 11 electrons fill the energy levels in order: 2 in the first level, 8 in the second, and 1 in the third, which is sodium's valence level. Protons are positive, neutrons carry no charge, and electrons are negative and found only in the levels.<br><br><b>Marking points:</b> 1 mark for 11 protons and 12 neutrons in the nucleus, with the neutron count worked from the mass number. 1 mark for 11 electrons arranged 2, 8, 1 in the energy levels. 1 mark for correct charges and locations (electrons in levels around the nucleus).",
      {});
  }
]), ["Atomic number gives protons directly; mass number minus protons gives neutrons.", "Fill the levels in order: 2, then 8, then what remains."]);


/* ---------- SC9.4.3 ---------- */

E("s9-u2-symbol-gen", 2, ["SC9.4.3"], 1, "gen", function () {
  var els = [
    { n: "sodium", s: "Na", w: ["NA", "So", "Sd"] }, { n: "potassium", s: "K", w: ["Po", "PT", "Ka"] },
    { n: "magnesium", s: "Mg", w: ["MG", "Mn", "Ma"] }, { n: "calcium", s: "Ca", w: ["CA", "Cm", "Cl"] },
    { n: "iron", s: "Fe", w: ["FE", "Ir", "Io"] }, { n: "copper", s: "Cu", w: ["CU", "Co", "Cp"] },
    { n: "zinc", s: "Zn", w: ["ZN", "Zc", "Zi"] }, { n: "silver", s: "Ag", w: ["AG", "Si", "Sv"] },
    { n: "gold", s: "Au", w: ["AU", "Go", "Gd"] }, { n: "lead", s: "Pb", w: ["PB", "Le", "Ld"] }
  ];
  var e = pick(els);
  return mcq("What is the correct chemical symbol for " + e.n + "?",
    e.s, e.w,
    "The symbol for " + e.n + " is " + e.s + ". Symbols use a capital first letter and, when there is a second letter, a lower case one; some symbols, like this one where relevant, preserve an older Latin name rather than the English one. The wrong options break the capitalization rule or invent a different element's symbol.", {});
}, ["One capital letter, then a lower case letter if there is a second.", "Some symbols come from Latin names, not English ones."]);

E("s9-u2-name-gen", 2, ["SC9.4.3"], 1, "gen", function () {
  var els = [
    { s: "H", n: "Hydrogen", w: ["Helium", "Hafnium", "Mercury"] }, { s: "He", n: "Helium", w: ["Hydrogen", "Mercury", "Neon"] },
    { s: "N", n: "Nitrogen", w: ["Neon", "Nickel", "Sodium"] }, { s: "O", n: "Oxygen", w: ["Gold", "Osmium", "Nitrogen"] },
    { s: "Ne", n: "Neon", w: ["Nitrogen", "Nickel", "Sodium"] }, { s: "Ni", n: "Nickel", w: ["Neon", "Nitrogen", "Sodium"] },
    { s: "Si", n: "Silicon", w: ["Silver", "Sulfur", "Tin"] }, { s: "Hg", n: "Mercury", w: ["Magnesium", "Hydrogen", "Helium"] },
    { s: "Cl", n: "Chlorine", w: ["Calcium", "Carbon", "Copper"] }, { s: "C", n: "Carbon", w: ["Calcium", "Chlorine", "Copper"] }
  ];
  var e = pick(els);
  return mcq("Which element has the chemical symbol " + e.s + "?",
    e.n, e.w,
    e.s + " is the symbol for " + e.n + ", one of the twenty elements this course expects you to match with their symbols in both directions. Watch for near neighbours: similar-looking symbols belong to different elements.", {});
}, ["Work the twenty course elements in both directions: name to symbol, symbol to name.", "Similar symbols are the trap; check letter by letter."]);

E("s9-u2-case-rule", 2, ["SC9.4.3"], 1, "var", varset([
  function () {
    return mcq("A student writes the symbol for cobalt as CO. Why is that writing wrong?",
      "CO is the formula for carbon monoxide, a compound; cobalt is written Co, with a capital C and a lower case o",
      ["Cobalt must be written with two capital letters because it is a metal", "CO is wrong only because carbon comes first in the alphabet", "Symbols are never allowed to contain the letter O"],
      "Capitalization carries meaning in chemistry. Co, one capital letter followed by a lower case letter, is the single element cobalt. CO, two capital letters, reads as two elements, carbon and oxygen, joined as the compound carbon monoxide.",
      {});
  }
]), ["Read CO as two separate one-letter symbols. What do you get?", "One capital plus one lower case is a single two-letter symbol."]);

E("s9-u2-latin-symbols", 2, ["SC9.4.3"], 2, "var", varset([
  function () {
    return mcq("The symbol for iron is Fe and the symbol for lead is Pb. What explains symbols that do not match the English names?",
      "They come from the elements' older Latin names, ferrum for iron and plumbum for lead",
      ["They are abbreviations of the names of the scientists who found them", "They were assigned randomly when the periodic table ran out of letters", "They come from the elements' French names used only in Canada"],
      "Several symbols preserve Latin names from before the modern naming system: Fe from ferrum (iron), Pb from plumbum (lead), Na from natrium (sodium) and Au from aurum (gold). The international symbol system keeps these so every country uses the same symbols.",
      {});
  }
]), ["Ferrum and plumbum are the giveaway words in the question.", "Symbols are international and historical, not random."]);

E("s9-u2-co-versus-co", 2, ["SC9.4.3"], 2, "var", varset([
  function () {
    return mcq("Which pairing of symbol and meaning is correct?",
      "Na is the element sodium, and NaCl is the compound sodium chloride",
      ["Na is the compound sodium, and NaCl is the element sodium chloride", "Cl is the compound chlorine, and NaCl is the element sodium chloride", "Na is the element sodium, and NaCl is a mixture of two elements"],
      "A symbol with one capital letter, or a capital plus a lower case letter, names one element: Na is sodium and Cl is chlorine. A formula joining symbols of different elements, such as NaCl, names a compound, a substance made of chemically joined elements in a fixed ratio.",
      {});
  }
]), ["Count the different elements named in each case.", "A compound joins symbols; an element is a single symbol."]);

E("s9-u2-cr-symbols", 2, ["SC9.4.3"], 2, "var", varset([
  function () {
    return textq("A student writes these four labels for a display: 'FE' for iron, 'pb' for lead, 'CA' for calcium and 'Co' for cobalt. Only one label is correct. Identify the correct label and rewrite the other three correctly, explaining the rule each error breaks. (3 marks)",
      ["Co for cobalt is the only correct label as written", "iron is Fe, lead is Pb and calcium is Ca, each with a capital first letter and lower case second letter", "two capital letters such as CA or FE read as two separate one-letter element symbols"],
      "<b>Model answer:</b> Co is correct. A two-letter symbol is written with a capital first letter and a lower case second letter, so iron is Fe (not FE), lead is Pb (not pb) and calcium is Ca (not CA). Writing two capitals is not a style choice: CA would read as carbon plus another one-letter symbol, a different meaning entirely, because the international symbol system uses capitalization to separate one element from two.<br><br><b>Marking points:</b> 1 mark for identifying Co as correct. 1 mark for all three corrections (Fe, Pb, Ca). 1 mark for explaining the rule: capital plus lower case is one element, while two capitals read as two elements.",
      {});
  }
]), ["Apply the capital plus lower case pattern to each label in turn.", "Ask what a two-capital label would actually mean if read literally."]);


/* ---------- SC9.4.4 ---------- */

E("s9-u2-metal-props", 2, ["SC9.4.4"], 1, "var", varset([
  function () {
    return mcq("Which set of properties is typical of metals as a group?",
      "Shiny, malleable, ductile, and good conductors of heat and electricity",
      ["Dull, brittle, and poor conductors of heat and electricity", "Shiny, brittle, and good conductors of heat and electricity", "Dull, malleable, ductile, and poor conductors of electricity"],
      "Metals share a recognizable property set: lustre (shine), malleability (they can be hammered into shape), ductility (they can be drawn into wire), and good conduction of heat and electricity. Brittleness and poor conduction describe most non-metals instead.",
      {});
  }
]), ["Think of a copper wire and a metal pan: what can they do?", "Brittle and insulating point away from metals."]);

E("s9-u2-period-family", 2, ["SC9.4.4"], 1, "var", varset([
  function () {
    var q = mcq("Using the periodic table excerpt, which element sits in Period 3 and belongs to the same family as fluorine?",
      "Chlorine",
      ["Sodium", "Argon", "Sulfur"],
      "A period is a horizontal row and a family (group) is a vertical column. Fluorine heads the halogen family, and the member of that family in Period 3 is chlorine. Sodium is in Period 3 but in a different family, and argon and sulfur are not halogens.",
      {});
    q.figure = s9u2Fig_ptable();
    return q;
  }
]), ["Find fluorine's column first, then drop down to the third row.", "Period counts rows; family counts columns."]);

E("s9-u2-locate-gen", 2, ["SC9.4.4"], 2, "gen", function () {
  var cases = [
    { q: "Which element is found in Group 2, Period 3 of the periodic table?", k: "Magnesium", w: ["Sodium", "Calcium", "Aluminum"], s: "Group is the column and period is the row. Group 2 in Period 3 is magnesium. Calcium is Group 2 but Period 4; sodium is Period 3 but Group 1." },
    { q: "Which element is found in Group 17, Period 3 of the periodic table?", k: "Chlorine", w: ["Fluorine", "Bromine", "Argon"], s: "Group 17 is the halogen family. Its Period 3 member is chlorine; fluorine is Period 2 and bromine is Period 4 in the same family." },
    { q: "Which element is found in Group 18, Period 2 of the periodic table?", k: "Neon", w: ["Helium", "Argon", "Nitrogen"], s: "Group 18 is the noble gas family. In Period 2 that position holds neon; helium is Period 1 and argon is Period 3." },
    { q: "Which element is found in Group 1, Period 2 of the periodic table?", k: "Lithium", w: ["Sodium", "Hydrogen", "Beryllium"], s: "Group 1, Period 2 is lithium. Sodium is the Group 1 element one period lower, and beryllium sits beside lithium in Group 2." },
    { q: "Which element is found in Group 16, Period 3 of the periodic table?", k: "Sulfur", w: ["Oxygen", "Selenium", "Chlorine"], s: "Counting to column 16 in the third row gives sulfur. Oxygen heads the same family in Period 2; chlorine is one group further right in Period 3." }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w, c.s, {});
}, ["Group counts columns; period counts rows.", "Fix one coordinate at a time, then check the other."]);

E("s9-u2-metalloid", 2, ["SC9.4.4"], 2, "var", varset([
  function () {
    return mcq("Silicon conducts electricity better than most non-metals but not as well as metals, and it is shiny yet brittle. How is silicon classified?",
      "As a metalloid, because it shows properties of both metals and non-metals",
      ["As a metal, because anything shiny must be a metal", "As a non-metal, because brittle substances are always non-metals", "As a transition metal, because it is used in electronics"],
      "Metalloids sit between metals and non-metals and mix their properties: silicon has a metallic shine and some electrical conduction, but it is brittle like a non-metal. That in-between behaviour is exactly what defines the metalloid group, which also includes boron and arsenic.",
      {});
  }
]), ["One property points each way. Which group is defined by that mix?", "Shine alone does not settle the classification."]);

E("s9-u2-family-props", 2, ["SC9.4.4"], 3, "var", varset([
  function () {
    return mcq("A newly tested element is soft enough to cut with a knife, reacts violently with water, and has one electron in its outer energy level. Which family does it most likely belong to?",
      "The alkali metals",
      ["The noble gases", "The halogens", "The alkaline earth metals"],
      "Softness, violent reaction with water and a single valence electron are the signature of the alkali metals, the Group 1 family that includes sodium and potassium. Noble gases are famously unreactive, and halogens are reactive non-metals with seven valence electrons.",
      {});
  }
]), ["One outer electron plus extreme reactivity with water is a family fingerprint.", "Rule out the unreactive family first."]);


/* ---------- SC9.4.5 ---------- */

E("s9-u2-valence-gen", 2, ["SC9.4.5"], 1, "gen", function () {
  var els = [
    { n: "hydrogen", z: 1, arr: "1", v: 1 }, { n: "carbon", z: 6, arr: "2, 4", v: 4 },
    { n: "nitrogen", z: 7, arr: "2, 5", v: 5 }, { n: "oxygen", z: 8, arr: "2, 6", v: 6 },
    { n: "sodium", z: 11, arr: "2, 8, 1", v: 1 }, { n: "magnesium", z: 12, arr: "2, 8, 2", v: 2 },
    { n: "chlorine", z: 17, arr: "2, 8, 7", v: 7 }, { n: "argon", z: 18, arr: "2, 8, 8", v: 8 }
  ];
  var e = pick(els);
  var dis = [e.v + 1, e.v + 2, e.z - e.v].filter(function (x) { return x !== e.v && x > 0; });
  var seen = []; dis = dis.filter(function (x) { if (seen.indexOf(x) >= 0) return false; seen.push(x); return true; }).slice(0, 3);
  while (dis.length < 3) { dis.push(e.v + dis.length + 3); }
  return mcq("The electrons of " + e.n + " (atomic number " + e.z + ") are arranged " + e.arr + " in its energy levels. How many valence electrons does it have?",
    String(e.v), dis.map(String),
    "Valence electrons are the electrons in the outermost occupied level. The arrangement " + e.arr + " puts " + e.v + " electron(s) in that outer level, so " + e.n + " has " + e.v + " valence electron(s), the count that governs its chemical behaviour.", {});
}, ["Valence means the outermost level only.", "Read the last number in the arrangement."]);

E("s9-u2-bohr-levels", 2, ["SC9.4.5"], 2, "var", varset([
  function () {
    return mcq("For the first 18 elements, which statement about energy levels in a Bohr-Rutherford diagram is correct?",
      "The first level holds at most 2 electrons, the second at most 8, and the third at most 8 in the diagrams used in this course",
      ["Every level holds at most 8 electrons, including the first", "The first level holds at most 8 electrons and the second at most 2", "Electrons are drawn on circles showing the exact paths they follow"],
      "In the Bohr-Rutherford diagrams used for elements 1 to 18, the first energy level holds a maximum of 2 electrons and the second and third levels hold a maximum of 8 each at this level of the course. The diagrams show electrons arranged in levels drawn as horizontal lines; they do not claim electrons travel in circular paths.",
      {});
  }
]), ["Start filling from the level closest to the nucleus.", "The first level is the small one: it fills at two."]);

E("s9-u2-noble-full", 2, ["SC9.4.5"], 2, "var", varset([
  function () {
    return mcq("Why are the noble gases so unreactive compared with other elements?",
      "Their outer energy level is full, so they neither gain, lose nor share electrons readily",
      ["They have no electrons in any energy level", "They have the largest atoms of any family", "Their nuclei contain no neutrons to react with"],
      "Chemical reactivity is driven by the outer (valence) energy level. Noble gases have a full outer level, the stable arrangement other atoms move toward when they react, so noble gases have no tendency to gain, lose or share electrons and stay unreactive.",
      {});
  }
]), ["Stability is the key word: what arrangement is stable?", "Reactions are about electrons, not about neutrons."]);

E("s9-u2-same-family-why", 2, ["SC9.4.5"], 3, "var", varset([
  function () {
    return mcq("Sodium and potassium behave very similarly in reactions, while sodium and magnesium behave quite differently. What explains this pattern?",
      "Sodium and potassium are in the same family and share the same number of valence electrons, while magnesium has a different number",
      ["Sodium and potassium have nearly the same atomic mass", "Sodium and magnesium are in the same period, which forces different behaviour", "Potassium and magnesium have identical energy level diagrams"],
      "Elements in the same family share the same number of electrons in their outer energy level, and that number governs how an atom reacts. Sodium and potassium each have one valence electron, so their chemistry matches; magnesium has two, so its chemistry differs.",
      {});
  }
]), ["Reactions are run by the outer level. Count valence electrons.", "Same column on the table means same outer arrangement."]);

E("s9-u2-energy-level-def", 2, ["SC9.4.5"], 3, "var", varset([
  function () {
    return mcq("Which statement correctly uses the terms energy level and valence?",
      "The valence energy level is the outermost level holding electrons, and its electrons are the valence electrons",
      ["The valence energy level is the level closest to the nucleus", "Valence electrons are the electrons found inside the nucleus", "An energy level is the exact circular path of one electron"],
      "Energy levels are the spaces around the nucleus where electrons may be found. The level furthest from the nucleus that holds electrons is the valence energy level, and the electrons in it, the valence electrons, are the ones involved in chemical reactions.",
      {});
  }
]), ["Valence always points outward, to the last occupied level.", "Nothing about electrons belongs inside the nucleus."]);


/* ---------- SC9.4.6 ---------- */

E("s9-u2-atoms-in-formula", 2, ["SC9.4.6"], 1, "gen", function () {
  var cases = [
    { f: "H2O", ask: "hydrogen", n: 2, w: [1, 3, 4], s: "The subscript 2 after H means two hydrogen atoms in each molecule of water, H2O; the oxygen carries no subscript, so there is one oxygen atom." },
    { f: "CO2", ask: "oxygen", n: 2, w: [1, 3, 4], s: "In CO2 the subscript 2 belongs to the O, so each molecule holds two oxygen atoms and one carbon atom." },
    { f: "CH4", ask: "hydrogen", n: 4, w: [1, 2, 5], s: "The subscript 4 after H in CH4 counts four hydrogen atoms joined to the single carbon atom." },
    { f: "CaCO3", ask: "oxygen", n: 3, w: [1, 2, 5], s: "In CaCO3 the subscript 3 belongs to the O, giving three oxygen atoms, with one calcium and one carbon atom." },
    { f: "C3H8", ask: "carbon", n: 3, w: [1, 8, 11], s: "The subscript 3 after C in propane, C3H8, counts three carbon atoms; the 8 counts the hydrogens." },
    { f: "H2O2", ask: "oxygen", n: 2, w: [1, 3, 4], s: "Both elements in H2O2 carry a subscript 2, so there are two hydrogen atoms and two oxygen atoms." },
    { f: "C12H22O11", ask: "hydrogen", n: 22, w: [11, 12, 45], s: "Subscripts can be two-digit numbers: in sucrose, C12H22O11, the 22 after H counts twenty-two hydrogen atoms." }
  ];
  var c = pick(cases);
  return mcq("How many atoms of " + c.ask + " are there in one unit of the compound " + c.f + "?",
    String(c.n), c.w.map(String), c.s, {});
}, ["A subscript counts the element written just before it.", "No subscript means exactly one atom."]);

E("s9-u2-ionic-or-molecular", 2, ["SC9.4.6"], 1, "var", varset([
  function () {
    return mcq("Which pairing of compound and type is correct?",
      "Calcium chloride, formed from a metal and a non-metal, is ionic; carbon dioxide, formed from non-metals only, is molecular",
      ["Calcium chloride, formed from a metal and a non-metal, is molecular; carbon dioxide is ionic", "Water, formed from non-metals only, is ionic; sodium chloride is molecular", "Methane, formed from non-metals only, is ionic; calcium chloride is molecular"],
      "The quick test at this level is who is joining whom. Ionic compounds typically form between a metal and a non-metal, as calcium (metal) joins chlorine (non-metal). Molecular (covalent) compounds form between non-metals only, as in carbon dioxide, water and methane.",
      {});
  }
]), ["Check the ingredients: metal plus non-metal, or non-metals only?", "Calcium is the metal in the first pair; that settles its side."]);

E("s9-u2-compound-name-gen", 2, ["SC9.4.6"], 2, "gen", function () {
  var cases = [
    { q: "What is the correct name of the compound K2S?", k: "Potassium sulfide", w: ["Potassium sulfur", "Dipotassium sulfide", "Potassium sulfide oxide"], s: "Simple ionic compounds are named with the metal first and the non-metal with an -ide ending, and no number prefixes: K2S is potassium sulfide. Prefixes belong to molecular naming, not to simple ionic names." },
    { q: "What is the correct name of the compound SO3?", k: "Sulfur trioxide", w: ["Sulfur oxide", "Sulfur(III) oxide", "Trisulfur oxide"], s: "Simple molecular compounds use prefixes for the second element's count: three oxygens give trioxide, so SO3 is sulfur trioxide. The first element takes a prefix only when it has more than one atom." },
    { q: "What is the correct name of the compound CO?", k: "Carbon monoxide", w: ["Carbon oxide", "Carbon dioxide", "Monocarbon monoxide"], s: "One oxygen in a molecular name is monoxide: CO is carbon monoxide. Dioxide would need two oxygens, and the first element is not given a mono- prefix." },
    { q: "What is the correct name of the compound MgCl2?", k: "Magnesium chloride", w: ["Magnesium dichloride", "Magnesium chlorine", "Dimagnesium chloride"], s: "MgCl2 is ionic (metal plus non-metal), and simple ionic names use no prefixes: magnesium chloride. The subscript is already carried by the formula; the name does not repeat it." },
    { q: "What is the correct name of the compound N2O4?", k: "Dinitrogen tetroxide", w: ["Nitrogen oxide", "Dinitrogen oxide", "Nitrogen tetroxide"], s: "Molecular names prefix both elements when counts exceed one on the first element: two nitrogens give dinitrogen and four oxygens give tetroxide, so N2O4 is dinitrogen tetroxide." }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w, c.s, {});
}, ["Ionic names take no prefixes; molecular names prefix the counts.", "The -ide ending belongs on the second element."]);

E("s9-u2-recognize-names", 2, ["SC9.4.6"], 3, "var", varset([
  function () {
    return mcq("Which name and formula pairing is one of the set this course expects you to recognize on sight?",
      "Sodium hydroxide, NaOH",
      ["Iron(III) oxide, Fe2O3", "Magnesium sulfate, MgSO4", "Calcium nitrate, Ca(NO3)2"],
      "The recognition set in this course is small and named in the guide: sodium chloride (NaCl), calcium carbonate (CaCO3) and sodium hydroxide (NaOH) among ionic compounds. Compounds with multivalent metals such as iron in Fe2O3, and polyatomic compounds beyond the two named exceptions, are left for high school science.",
      {});
  }
]), ["Three ionic names are in the recognition set. One option is among them.", "Anything with brackets or a multivalent metal is beyond this course."]);

E("s9-u2-cr-formulas", 2, ["SC9.4.6"], 2, "var", varset([
  function () {
    return textq("For each formula, name the compound type (ionic or molecular) and state how many atoms of each element one unit of the compound contains: (a) CaCl2, (b) CH4, (c) NaCl. (3 marks)",
      ["CaCl2 is ionic with one calcium atom and two chlorine atoms", "CH4 is molecular with one carbon atom and four hydrogen atoms", "NaCl is ionic with one sodium atom and one chlorine atom in a 1 to 1 ratio"],
      "<b>Model answer:</b> (a) CaCl2 is ionic (a metal, calcium, joined to a non-metal, chlorine) and contains 1 calcium atom and 2 chlorine atoms. (b) CH4 is molecular (non-metals only) and contains 1 carbon atom and 4 hydrogen atoms. (c) NaCl is ionic (metal plus non-metal) and contains sodium and chlorine in a 1 to 1 ratio. Subscripts give the count for the element just before them; no subscript means one.<br><br><b>Marking points:</b> 1 mark for each compound with both the correct type and the correct atom counts (3 marks total).",
      {});
  }
]), ["Metal plus non-metal points one way; non-metals only points the other.", "A missing subscript still counts: it means exactly one atom."]);


/* ---------- SC9.4.7 ---------- */

E("s9-u2-change-sort", 2, ["SC9.4.7"], 1, "gen", function () {
  var cases = [
    { q: "Which event is a chemical change?", k: "Fruit ripening on the counter", w: ["Ice melting in a drink", "Paper being cut into strips", "Salt dissolving in soup"], s: "Ripening changes the substances inside the fruit, producing new flavours, colours and sugars, so it is chemical. Melting, cutting and dissolving leave the substance itself unchanged, so they are physical." },
    { q: "Which event is a physical change?", k: "Dry ice subliming to make stage fog", w: ["Iron rusting on a fence", "Wood burning in a stove", "Food being digested"], s: "Subliming dry ice changes solid carbon dioxide directly to its gas; the substance is still carbon dioxide, so the change is physical. Rusting, burning and digestion all produce new substances." },
    { q: "Which event is a chemical change?", k: "A fizzing tablet reacting in water", w: ["Water boiling in a kettle", "Glass shattering on the floor", "Butter melting in a pan"], s: "The fizz is a gas produced by a reaction, evidence of a new substance forming, so the change is chemical. Boiling, shattering and melting change state or shape only." },
    { q: "Which event is a physical change?", k: "Clothes drying on a line", w: ["An egg cooking in a pan", "A candle wick burning", "Milk turning sour"], s: "Drying is water evaporating out of the clothes; the clothes and the water are the same substances throughout, so the change is physical. Cooking, burning and souring all create new substances." }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w, c.s, {});
}, ["Ask whether a new substance exists at the end.", "State changes and shape changes are physical."]);

E("s9-u2-evidence-change", 2, ["SC9.4.7"], 2, "var", varset([
  function () {
    return mcq("A student mixes two clear solutions and the mixture turns cloudy, forms a solid, and feels warmer. Which conclusion is best supported?",
      "A chemical change has likely occurred, because a precipitate formed and heat was released",
      ["A physical change has occurred, because the two liquids are still present", "No change has occurred, because both starting materials were clear", "A chemical change is ruled out, because temperature changes are physical"],
      "The recognized evidence for a chemical change includes a precipitate forming, heat being produced or absorbed, a new colour appearing, a gas being produced, and a change that is difficult to reverse. This mixture shows two of those signs at once, a precipitate and released heat, so a new substance has likely formed.",
      {});
  }
]), ["Count the signs from the evidence list the course uses.", "Cloudiness here is a new solid, not just mixing."]);

E("s9-u2-new-substance", 2, ["SC9.4.7"], 3, "var", varset([
  function () {
    return mcq("What is the deciding difference between a chemical change and a physical change?",
      "A chemical change produces one or more new substances; a physical change does not",
      ["A chemical change always produces heat, and a physical change never does", "A physical change can be reversed, and a chemical change never can", "A chemical change alters the state of a substance, and a physical change does not"],
      "The test is the product, not the drama of the event. Rusting joins iron and oxygen into a new substance, rust, so it is chemical. Melting, cutting, dissolving and changing state rearrange or reshape the same substance, so they are physical, whether or not they are easy to undo.",
      {});
  }
]), ["Ask one question: is the stuff at the end a different substance?", "Some physical changes are hard to reverse; that is not the test."]);

E("s9-u2-cr-changes", 2, ["SC9.4.7"], 2, "var", varset([
  function () {
    return textq("A candle is lit. The wax near the flame melts and runs down the side, the wick blackens and burns away, and the flame gives off heat and light. Separate these observations into a physical change and a chemical change, and give the evidence that supports your sorting. (3 marks)",
      ["melting and running wax is a physical change because the wax is still wax, only liquid", "burning wick is a chemical change producing new substances such as ash, gases and soot", "heat and light given off are evidence that a chemical change is occurring"],
      "<b>Model answer:</b> The melting wax is a physical change: liquid wax is the same substance as solid wax, changed only in state, and it can solidify again. The burning wick is a chemical change: the wick is consumed and new substances (ash, soot and gases) form, and the heat and light released are recognized evidence of chemical change. One candle shows both kinds of change at once, sorted by whether a new substance forms.<br><br><b>Marking points:</b> 1 mark for classifying melting as physical with the same-substance reason. 1 mark for classifying burning as chemical with new substances named. 1 mark for citing heat and light as supporting evidence of the chemical change.",
      {});
  }
]), ["Sort by one test: is a new substance there at the end?", "Heat and light belong to the evidence list for one kind of change."]);


/* ---------- SC9.5.1 ---------- */

E("s9-u2-matter-or-not", 2, ["SC9.5.1"], 1, "var", varset([
  function () {
    return mcq("Which list contains only examples of matter?",
      "Air, water and aluminum foil",
      ["Air, light and water", "Heat, water and aluminum foil", "Air, sound and water"],
      "Matter is anything that has mass and takes up space. Air, water and aluminum foil all qualify, even though air is invisible. Light, heat and sound are forms of energy: they have no mass and occupy no space, so they are not matter.",
      {});
  }
]), ["Apply the two-part test: mass, and takes up space.", "Energy travels and transfers, but it is not stuff."]);

E("s9-u2-particle-view", 2, ["SC9.5.1"], 2, "var", varset([
  function () {
    var q = mcq("The particle diagrams show the same substance in three states. Which statement correctly reads the diagrams?",
      "The particles are closest and most ordered in the solid, further apart and freer in the liquid, and far apart and fast-moving in the gas",
      ["The particles themselves grow larger as the substance changes from solid to gas", "The gas particles have stopped moving, which is why the gas spreads out", "The liquid particles are arranged in a fixed pattern like the solid particles"],
      "Changing state changes the spacing, order and motion of the particles, never the particles themselves. Solids hold particles in a tight, ordered arrangement; liquids keep them close but able to slide past one another; gases separate them widely with rapid motion.",
      {});
    q.figure = s9u2Fig_particles();
    return q;
  }
]), ["Look at spacing and order in each panel, not particle size.", "The particles are identical in all three panels by design."]);

E("s9-u2-earlier-ideas", 2, ["SC9.5.1"], 3, "var", varset([
  function () {
    return mcq("How does the early Greek idea of matter differ most importantly from the modern view?",
      "The Greek four-element idea (earth, air, fire and water) rested on reasoning alone, while the modern view rests on experimental evidence",
      ["The Greeks believed matter could be divided forever, and modern science agrees completely", "The modern view still lists earth, air, fire and water as the four elements", "The Greek idea was based on microscope observations of atoms"],
      "Empedocles and Aristotle taught that all matter was made of earth, air, fire and water, an idea accepted for about 2000 years without experimental testing. Modern atomic ideas were built and revised through experiments, which is why they changed as evidence accumulated.",
      {});
  }
]), ["Ask what each view is built on: argument, or tests?", "Two thousand years of acceptance is not the same as evidence."]);


/* ---------- SC9.5.2 ---------- */

E("s9-u2-law-theory", 2, ["SC9.5.2"], 1, "var", varset([
  function () {
    return mcq("Which statement best distinguishes a scientific law from a scientific theory, as this course presents them?",
      "A law is supported by robust, repeated experimental evidence describing what happens; a theory is an explanation that is less fully supported and open to further testing",
      ["A theory is simply a guess, and a law is a theory that scientists voted to accept", "A law explains why something happens, and a theory only describes measurements", "Laws and theories mean exactly the same thing in every science"],
      "In this course's treatment, the words signal confidence in the evidence. Laws rest on different and robust experimental support and describe regular patterns. Theories explain, but with less complete support, so further evidence can revise them; neither word means a guess.",
      {});
  }
]), ["Confidence in evidence is the dividing line the guide draws.", "A theory is not a guess; it is an explanation awaiting fuller support."]);

E("s9-u2-confidence", 2, ["SC9.5.2"], 2, "var", varset([
  function () {
    return mcq("A classmate says, 'It is only a theory, so scientists are just guessing.' Which reply is most accurate?",
      "A theory is a supported explanation built from evidence; it is called a theory because the supporting evidence is not yet as complete and robust as the evidence behind a law",
      ["The classmate is right: theories are guesses with no evidence behind them", "A theory becomes a law automatically after one hundred years", "Theories apply only to biology, never to chemistry or physics"],
      "Theories, such as the particle theory of matter, organize a great deal of evidence into an explanation. The law and theory labels reflect how complete and robust that support is, not whether any support exists. Guessing plays no part in either label.",
      {});
  }
]), ["Name what a theory is built from before judging the label.", "Particle theory is the course's own example of an evidence-based theory."]);


/* ---------- SC9.5.3 ---------- */

E("s9-u2-model-order", 2, ["SC9.5.3"], 1, "var", varset([
  function () {
    return mcq("Which sequence gives the atomic models in the order they were proposed?",
      "Dalton's solid sphere, Thomson's raisin bun, Rutherford's nuclear model, Bohr's energy level model",
      ["Thomson's raisin bun, Dalton's solid sphere, Bohr's energy level model, Rutherford's nuclear model", "Rutherford's nuclear model, Bohr's energy level model, Dalton's solid sphere, Thomson's raisin bun", "Dalton's solid sphere, Rutherford's nuclear model, Thomson's raisin bun, Bohr's energy level model"],
      "The order follows the evidence. Dalton pictured a solid, indivisible sphere; Thomson placed negative electrons inside a positive sphere (the raisin bun); Rutherford's work put the mass in a tiny nucleus; Bohr placed the electrons in energy levels around that nucleus.",
      {});
  }
]), ["Anchor the ends: Dalton first, Bohr last.", "Each model answered a problem in the one before it."]);

E("s9-u2-scientist-match", 2, ["SC9.5.3"], 2, "var", varset([
  function () {
    return mcq("Which scientist and contribution pairing is correct?",
      "Rutherford: showed that an atom's mass is concentrated in a small, positive nucleus",
      ["Dalton: discovered the electron inside the atom", "Thomson: proposed that electrons orbit in fixed energy levels", "Bohr: argued that matter is made of earth, air, fire and water"],
      "Rutherford's experiments replaced the spread-out positive sphere with a tiny, dense, positive nucleus. Dalton proposed the solid sphere atom, Thomson discovered the electron and proposed the raisin bun model, and Bohr added the energy levels.",
      {});
  }
]), ["Match each name to the model the course attaches to it.", "The nucleus belongs to one scientist on this list."]);

E("s9-u2-model-change-why", 2, ["SC9.5.3"], 3, "var", varset([
  function () {
    return mcq("Why did the atomic model keep changing between Dalton's time and Bohr's?",
      "Each new model was forced by new experimental evidence that the previous model could not explain",
      ["Scientists changed the model each generation to keep textbooks current", "Atoms themselves changed structure over those two centuries", "Each scientist worked alone and never saw the earlier models"],
      "The atom did not change; the evidence did. Cathode ray work forced electrons into the model, the gold foil experiment forced in the nucleus, and energy level evidence shaped Bohr's version. Models are revised, and sometimes discarded, as new data arrive.",
      {});
  }
]), ["The grid did not change; the observations did. Same idea here.", "Look for the cause that acts on models: evidence."]);

E("s9-u2-cr-atomic-history", 2, ["SC9.5.3"], 2, "var", varset([
  function () {
    return textq("Trace the atomic model from Dalton to Bohr in order. For each step, name the scientist, describe the model in one phrase, and state what new evidence or idea forced the change from the model before it. (3 marks)",
      ["Dalton proposed the solid indivisible sphere as the starting model", "Thomson discovered the electron and proposed the raisin bun model, then Rutherford's gold foil results required a small dense nucleus, then Bohr placed electrons in energy levels"],
      "<b>Model answer:</b> Dalton: the atom is a solid, indivisible sphere. Thomson: experiments with cathode rays revealed the electron, a negative particle inside the atom, giving the raisin bun model of electrons in a positive sphere. Rutherford: in the gold foil experiment a few alpha particles bounced back, which a spread-out positive sphere cannot explain, so the model gained a tiny, dense, positive nucleus with mostly empty space around it. Bohr: electrons occupy set energy levels around the nucleus. Each change was driven by evidence the earlier model could not explain.<br><br><b>Marking points:</b> 1 mark for the correct order with all four scientists named. 1 mark for an accurate one-phrase description of each model. 1 mark for the evidence forcing at least the Thomson and Rutherford changes (electron discovery; gold foil bounce-backs).",
      {});
  }
]), ["Order first: Dalton, Thomson, Rutherford, Bohr.", "For each change ask: what was seen that the old model could not explain?"]);


/* ---------- SC9.5.4 ---------- */

E("s9-u2-foil-result", 2, ["SC9.5.4"], 1, "var", varset([
  function () {
    return mcq("In Rutherford's gold foil experiment, most alpha particles passed straight through the foil, but a few bounced back at large angles. What did the bounce-back show?",
      "Atoms contain a tiny, dense, positively charged nucleus that can repel a close-passing alpha particle",
      ["Atoms are solid spheres with no empty space inside", "Electrons are spread evenly through a positive sphere", "Gold atoms are much larger than all other atoms"],
      "If positive charge were spread thinly through the whole atom, as Thomson proposed, nothing could turn a fast alpha particle around. The rare sharp bounce-backs require a concentrated positive charge in a very small volume: the nucleus. The many straight passes show the rest of the atom is mostly empty space.",
      {});
  }
]), ["Rare but extreme deflections need something small and concentrated.", "Straight-through passes and bounce-backs must both be explained."]);

E("s9-u2-foil-inference", 2, ["SC9.5.4"], 2, "var", varset([
  function () {
    return mcq("Why could Rutherford perform his experiment when Dalton, a century earlier, could not have?",
      "Rutherford had technology Dalton lacked, including sources of alpha particles and vacuum equipment, which made probing inside the atom possible",
      ["Dalton was not interested in the inside of the atom at all", "Gold foil had not been invented in Dalton's time", "Rutherford worked in a larger laboratory building than Dalton"],
      "Scientific reach follows available technology. The equipment behind the gold foil work, such as particle sources and vacuum tubes, did not exist for earlier scientists, and today's particle accelerators let scientists collect data Rutherford could not. Each generation's questions are limited by its tools.",
      {});
  }
]), ["Compare the toolkits, not the curiosity, of the two scientists.", "New instruments are what opened the atom's interior to testing."]);

E("s9-u2-cr-gold-foil", 2, ["SC9.5.4"], 3, "var", varset([
  function () {
    return textq("Describe Rutherford's gold foil experiment and explain how its results tested Thomson's model. Your answer should state what Thomson's model predicted, what was actually observed, and what Rutherford concluded. (3 marks)",
      ["alpha particles were fired at thin gold foil and most passed straight through while a few deflected sharply or bounced back", "Thomson's spread-out positive charge predicted only slight deflections, so the bounce-backs contradicted his model", "Rutherford concluded the atom is mostly empty space with mass and positive charge concentrated in a tiny nucleus"],
      "<b>Model answer:</b> Rutherford's team fired fast, positive alpha particles at a very thin gold foil and watched where they emerged. Thomson's model, with positive charge spread through the whole atom, predicted that all particles would pass through with at most slight bending. Instead, most passed straight through, showing the atom is mostly empty space, but about 1 in 8000 bounced back at large angles, which spread-out charge cannot cause. Rutherford concluded that the atom's positive charge and nearly all its mass sit in a tiny central nucleus. The episode also shows technology at work: particle sources and vacuum equipment that earlier scientists lacked made the test possible.<br><br><b>Marking points:</b> 1 mark for an accurate description of the setup. 1 mark for Thomson's prediction and how the observations contradicted it. 1 mark for Rutherford's conclusion (empty space plus a tiny dense positive nucleus).",
      {});
  }
]), ["Structure your answer as prediction, observation, conclusion.", "The rare bounce-backs carry the conclusion; do not leave them out."]);


/* ---------- SC9.5.5 ---------- */

E("s9-u2-settings", 2, ["SC9.5.5"], 1, "var", varset([
  function () {
    return mcq("Which example best shows chemistry-related scientific work done by an individual working alone?",
      "A home cook testing how baking soda affects a recipe's rise in their own kitchen",
      ["A university research team publishing a joint paper on atomic structure", "Thirty students testing water samples together on a field trip", "A national laboratory staff running a particle accelerator in shifts"],
      "Atomic and chemical investigation happens in many settings. Cooking experiments at home are individual work; university teams, classes and national laboratories are group settings. Thomson, Crookes and Rutherford themselves built on each other's work in university group settings.",
      {});
  }
]), ["Count the workers in each example.", "One of these has a team of exactly one."]);

E("s9-u2-settings-cases", 2, ["SC9.5.5"], 2, "gen", function () {
  var cases = [
    { q: "Which setting is the best example of group scientific work on atomic structure?", k: "A university research group whose members build on each other's published results", w: ["A student sketching an atom alone for homework", "A cook adjusting a recipe alone at home", "One technician reading a meter alone on a night shift"], s: "Group settings are defined by collaboration: the university group members use and extend each other's discoveries, as Crookes, Thomson and Rutherford did. The other examples are individual work, valuable but not group work." },
    { q: "Which setting is the best example of individual scientific work related to chemistry?", k: "A student testing soil samples from their own garden with a home kit", w: ["A hospital laboratory team running blood tests together", "A class of thirty sharing one set of flame test results", "A national research council operating a particle accelerator"], s: "The garden soil testing is one person working alone with chemical tests. Teams in hospitals and classes, and national facilities with large staffs, are group settings." },
    { q: "A pharmaceutical company assigns a whole department to develop a new medicine. Which statement about this setting is correct?", k: "It is a group setting, and it still depends on earlier work done by other scientists elsewhere", w: ["It is an individual setting because the company has one name", "It is not scientific work because it happens in a company", "It owes nothing to earlier scientists because it is modern"], s: "Scientific and technological work on atomic structure and chemistry happens in companies as well as universities, and group work there, like group work anywhere, builds on discoveries made by others. Setting and dependence on prior work are separate questions." }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w, c.s, {});
}, ["Count collaborators, and remember work builds on earlier work.", "Individual and group are about who works together, not where."]);


/* ---------- SC9.5.6 ---------- */

E("s9-u2-precise-word", 2, ["SC9.5.6"], 1, "var", varset([
  function () {
    return mcq("Why does it matter in science that the word element has one agreed meaning?",
      "So that scientists everywhere mean the same thing, a substance made of only one kind of atom, and can compare results without confusion",
      ["So that students can be marked wrong for using everyday words", "Because everyday words are banned from science classrooms", "So that element can also mean a heating coil without confusion"],
      "Scientifically appropriate words carry one precise meaning shared by everyone who uses them. Element means a substance consisting of only one kind of atom; using it loosely, for any ingredient or part, would make reports and comparisons unreliable.",
      {});
  }
]), ["Precision is about shared meaning across people and countries.", "Think about what goes wrong when two readers picture different things."]);

E("s9-u2-element-def", 2, ["SC9.5.6"], 1, "var", varset([
  function () {
    return mcq("A sample is tested and found to contain two kinds of atoms chemically joined in a fixed ratio. Which term correctly names the sample?",
      "A compound, because an element contains only one kind of atom",
      ["An element, because every pure substance is an element", "A mixture, because joined atoms are always a mixture", "An atom, because the sample is very small"],
      "Definitions decide the classification. An element contains only one kind of atom; two or more kinds chemically joined in a fixed ratio make a compound. A mixture is not chemically joined and has no fixed ratio, so it does not fit either.",
      {});
  }
]), ["One kind of atom versus two kinds joined: that is the fork.", "Fixed ratio plus chemical joining points one way."]);


/* ---------- SC9.5.7 ---------- */

E("s9-u2-mendeleev", 2, ["SC9.5.7"], 2, "var", varset([
  function () {
    return mcq("What were Mendeleev's two main contributions to the development of the periodic table?",
      "He organized the known elements by their properties and chemical behaviour, and he left gaps for elements that had not yet been discovered",
      ["He discovered all of the elements known in his time, and he numbered them by mass", "He arranged the elements alphabetically, and he predicted the noble gases exactly", "He built the first table alone, and no other scientist worked on organizing elements"],
      "Mendeleev's first contribution was ordering the known elements so that similar properties lined up in families. His second, and most important, was trusting that order enough to leave empty spaces and predict that undiscovered elements would fill them, which they did. Other scientists also worked on tables; his evidence-based gaps set his apart.",
      {});
  }
]), ["Two contributions: an ordering, and a bold use of empty spaces.", "The gaps were predictions, not mistakes."]);

E("s9-u2-gaps", 2, ["SC9.5.7"], 3, "var", varset([
  function () {
    return mcq("Why did the elements discovered after Mendeleev's death strengthen confidence in his table?",
      "They were found with properties close to the ones his gaps had predicted for them",
      ["They proved that no further elements remained to be found", "They showed that atomic mass never matters in organizing elements", "They filled the gaps in alphabetical order of their names"],
      "Mendeleev left spaces and described the properties the missing elements should have. When elements were later discovered matching those descriptions, the match between prediction and evidence confirmed that his organization captured a real pattern in the elements.",
      {});
  }
]), ["A prediction that comes true is evidence for the system behind it.", "Focus on properties, not on names or completeness."]);

E("s9-u2-cr-periodic-evidence", 2, ["SC9.5.7"], 2, "var", varset([
  function () {
    return textq("Explain how Mendeleev used evidence, pattern-finding and explanation to build the periodic table, and why the discovery of gallium after his death counted as a success for his work. (3 marks)",
      ["Mendeleev collected evidence on the properties of the known elements and arranged them so elements with similar properties fell into families", "he proposed an explanation in the form of a repeating periodic pattern and left gaps where the pattern required undiscovered elements", "gallium was later discovered with properties matching his prediction for a gap element, confirming the pattern"],
      "<b>Model answer:</b> Mendeleev gathered the evidence available on the known elements, their properties and chemical behaviour, and searched it for relationships, arranging the elements so that similar properties lined up in families. The pattern he found was periodic: properties repeated in a regular way. Trusting the pattern, he proposed that the gaps in his table were elements not yet discovered and predicted their properties. Gallium was later found with properties close to his prediction, so the discovery confirmed both the pattern and the explanations built on it. Science advanced here by exactly the route this indicator names: evidence collected, relationships found, explanations proposed and then tested by the future.<br><br><b>Marking points:</b> 1 mark for evidence collection and organizing by properties. 1 mark for the periodic pattern and the deliberate gaps as predictions. 1 mark for gallium's matching properties as confirmation.",
      {});
  }
]), ["Use the three verbs in the indicator: collect, relate, explain.", "A prediction confirmed later is the strongest part of the story."]);


/* ---------- SC9.5.8 ---------- */

E("s9-u2-chem-products", 2, ["SC9.5.8"], 1, "var", varset([
  function () {
    return mcq("Which list consists only of commercial materials developed through knowledge of chemistry?",
      "Medicines, fertilizers, suntan lotion and petrochemical plastics",
      ["Medicines, carved wooden bowls, suntan lotion and river stones", "Fertilizers, knitted wool blankets, plastics and clay pots", "Medicines, fertilizers, suntan lotion and woven cotton shirts"],
      "Chemistry underlies the making of medicines, fertilizers, cosmetics such as suntan lotion, and the petrochemical products behind plastics. Carved wood, knitted wool, clay and cotton goods are worked natural materials, not products of chemical development in this sense.",
      {});
  }
]), ["Ask of each item: was it developed by applying chemical knowledge?", "Natural materials shaped by hand are the distractors here."]);

E("s9-u2-household-chem", 2, ["SC9.5.8"], 2, "var", varset([
  function () {
    return mcq("Why must bleach and some toilet bowl cleaners never be mixed, and what does the warning illustrate?",
      "Mixing them can produce poisonous chlorine gas; it illustrates that everyday products involve real chemical reactions with real hazards",
      ["Mixing them makes both cleaners stop working; it illustrates that cleaners are expensive", "Mixing them produces a stronger cleaner; it illustrates efficient chemistry", "Mixing them changes only the colour; it illustrates chemical properties are harmless"],
      "Some household chemicals react together to form chlorine gas, which is poisonous. The warning is a daily-life reminder that the substances under the sink are chemicals whose reactions, useful or dangerous, follow from their properties, which is why labels and WHMIS information matter.",
      {});
  }
]), ["A new gas forming is a chemical change with a safety consequence.", "The hazard, not the cleaning power, is the point of the warning."]);

E("s9-u2-cr-commercial-material", 2, ["SC9.5.8"], 3, "var", varset([
  function () {
    return textq("Choose one commercial material that exists because of chemistry knowledge (for example a medicine, a fertilizer, a plastic or a cleaning product). Explain what need it serves, what chemical knowledge made it possible, and one disadvantage or risk that must be managed. (3 marks)",
      ["a named commercial material clearly developed through chemistry, such as a medicine, fertilizer, plastic or cleaning product", "the need it serves and the chemical knowledge behind it are both explained", "a genuine disadvantage or risk is identified, such as persistence in the environment, toxicity or a dangerous reaction"],
      "<b>Model answer:</b> Example (plastics): Society needed cheap, light, mouldable materials for packaging, medical supplies and household goods. Chemistry supplied them by building long-chain molecules from petroleum chemicals, producing materials that can be shaped once and then hold their form, resist water and stay light. The disadvantage to manage is the flip side of those properties: discarded plastic persists in the environment for a very long time, so recycling and disposal decisions matter. (Other materials earn full marks on the same pattern: a named product, the need, the chemistry, and one managed risk.)<br><br><b>Marking points:</b> 1 mark for a clearly chemistry-based commercial material. 1 mark for the need and the chemical knowledge that made it possible. 1 mark for a real disadvantage or risk with how it is managed.",
      {});
  }
]), ["Pick one material and stay with it for all three parts.", "The disadvantage usually grows out of the same property as the advantage."]);


/* ---------- SC9.5.9 ---------- */

E("s9-u2-need-drives", 2, ["SC9.5.9"], 2, "var", varset([
  function () {
    return mcq("Hospitals needed a reliable heart medicine, and a chemical found in the foxglove plant, digitoxin, was developed into one. What does this example show?",
      "A need in society can drive chemical research that turns a natural substance into a useful product",
      ["Plants are always safer than laboratory-made chemicals", "Society's needs have no effect on what scientists study", "Heart medicine was developed with no testing of the plant chemical"],
      "The foxglove example, drawn from Newfoundland and Labrador's own flora, shows demand guiding development: a medical need led researchers to isolate and standardize a plant chemical into a medicine. Needs such as health, food production and materials repeatedly steer chemistry in this way.",
      {});
  }
]), ["Trace the chain: need first, then research, then product.", "The plant supplied the chemical; the need supplied the reason."]);

E("s9-u2-plastics-need", 2, ["SC9.5.9"], 3, "var", varset([
  function () {
    return mcq("Plastics were developed and spread rapidly during the twentieth century. Which explanation best fits the STSE pattern in this unit?",
      "Society needed cheap, light, mouldable materials for countless products, and chemistry supplied them from petroleum",
      ["Plastics spread because they are natural materials that need no processing", "Plastics were developed before any use for them existed", "Society resisted plastics, so governments forced their adoption"],
      "The core STSE of this strand, Plastics and Modern Life, follows the pattern of need meeting chemistry: demand for inexpensive, versatile materials drove the development of plastics from petroleum chemicals. Their spread then created new questions about waste and environment that the same pattern must answer.",
      {});
  }
]), ["Need on one side, petroleum chemistry on the other.", "Plastics are manufactured, not gathered."]);


/* ---------- SC9.5.10 ---------- */

E("s9-u2-tech-analysis", 2, ["SC9.5.10"], 1, "var", varset([
  function () {
    return mcq("A plastic kayak is light, does not rust, and can be moulded in one piece, but it becomes brittle after years of sunlight. Analyzing this technology means weighing which pairing?",
      "How its material properties make it work well for its purpose, against the limits those same properties impose over its lifetime",
      ["Its price against the price of a wooden kayak only", "Its colour against the colours offered by other makers", "Its weight in kilograms against its length in metres only"],
      "Analyzing a technology's design means connecting how it functions to its impact in daily life. The kayak's plastic gives lightness, corrosion resistance and one-piece moulding, real advantages for paddlers, while sunlight brittleness is a genuine lifetime cost. Both sides come from the material's properties.",
      {});
  }
]), ["Function and impact: the analysis needs both.", "Price and colour are not how the technology works."]);

E("s9-u2-design-impact", 2, ["SC9.5.10"], 2, "var", varset([
  function () {
    return mcq("Insulated plastic foam cups keep drinks hot and are cheap, but they persist in landfills for a very long time. Which statement is a fair analysis?",
      "The same trapped-air structure that insulates also makes the foam slow to break down, so the design trades daily convenience against a long environmental cost",
      ["The cups are a poor design because they keep drinks too hot", "The landfill problem is unrelated to the cups' design", "Foam cups prove that insulation does not work in practice"],
      "Good analysis ties the benefit and the drawback to the design itself. Trapped air pockets insulate the drink and also make the material resistant to breaking down, so convenience today and persistence in the environment are two faces of one design choice.",
      {});
  }
]), ["Find the single feature that produces both effects.", "Analysis connects design to impact, not just opinion to product."]);

E("s9-u2-function-basis", 2, ["SC9.5.10"], 3, "var", varset([
  function () {
    return mcq("A smoke detector uses a tiny amount of a radioactive element whose particles ionize air inside a chamber. Which basis of its functioning is being described?",
      "Its operation rests on a property of an element's atoms, applied to a daily-life safety task",
      ["Its operation rests on the colour of its plastic case", "Its operation rests on the price of its battery", "Its operation rests on the shape of the room it hangs in"],
      "Some everyday technologies work because of atomic-level properties. The detector's sensing depends on what the element's atoms do to the air in its chamber; the case, battery and room are supporting details, not the scientific basis of the device.",
      {});
  }
]), ["Ask what makes the sensing happen at all.", "Case, cost and room shape do not detect anything."]);


/* ---------- SC9.5.11 ---------- */

E("s9-u2-decision-balance", 2, ["SC9.5.11"], 2, "var", varset([
  function () {
    return mcq("A town must choose a material for new water bottles for its arena canteen. Which approach makes the decision an informed one?",
      "Compare the environmental and social advantages and disadvantages of each material, then choose and be able to defend the choice",
      ["Choose the cheapest material, since cost is the only real factor", "Choose the newest material, since new means better", "Let one person decide without examining any evidence"],
      "Informed decisions about applications of science weigh advantages and disadvantages on more than one side: environmental effects such as waste and recycling, and social effects such as cost, health and convenience. A defensible choice shows that weighing, even when no option wins on every count.",
      {});
  }
]), ["Informed means evidence weighed on several sides.", "One factor alone, whether price or novelty, is not a weighing."]);

E("s9-u2-plastics-tradeoff", 2, ["SC9.5.11"], 3, "var", varset([
  function () {
    return mcq("Which statement about plastics best models a balanced STSE judgement?",
      "Plastics give light, durable, inexpensive products and medical and food-safety benefits, while their persistence as waste and their petroleum source are real costs that decisions must manage",
      ["Plastics are entirely beneficial and should never be questioned", "Plastics are entirely harmful and have no legitimate uses", "Plastics have advantages only for manufacturers, never for users"],
      "A balanced judgement holds both sides at once. Plastics serve medicine, food safety and everyday convenience because of their properties, and those same properties make discarded plastic persist, while production draws on petroleum. Decisions about plastics manage that trade-off rather than denying either side.",
      {});
  }
]), ["Look for the option that keeps advantages and disadvantages together.", "Entirely good or entirely bad is a slogan, not a judgement."]);

E("s9-u2-cr-materials-decision", 2, ["SC9.5.11"], 3, "var", varset([
  function () {
    return textq("A school canteen is replacing single-use drink containers. Option 1 is a plastic bottle: light, cheap and shatterproof, but made from petroleum and often thrown away. Option 2 is an aluminum can: heavier to ship and costlier, but widely recycled and often made partly from recycled metal. Make a recommendation for the canteen, weighing environmental and social advantages and disadvantages of both options, and state one condition that could change your recommendation. (4 marks)",
      ["environmental advantages and disadvantages of both options are weighed, including petroleum use and litter persistence against recycling rates and shipping weight", "social advantages and disadvantages of both options are weighed, including cost, safety and convenience for students", "a clear recommendation is made and defended from the weighing, with one stated condition that could change it"],
      "<b>Model answer:</b> Environmentally, the plastic bottle draws on petroleum and, when thrown away, persists as litter for a very long time, though its lightness saves fuel in shipping. The aluminum can costs more energy to produce at first, but it is recycled at high rates and recycled aluminum needs far less energy than new metal, while its greater weight raises shipping impact. Socially, the bottle is cheaper and shatterproof, which suits a busy canteen budget and student safety; the can costs more per drink but its recycling stream is simple for a school to run. Recommendation: choose the aluminum can, provided the canteen actually operates a return and recycling collection, because its environmental cost is the one the school can actively shrink. If no recycling collection were possible, the recommendation would flip, since an unrecycled can carries the higher production cost with none of the recovery benefit.<br><br><b>Marking points:</b> 1 mark for environmental weighing of both options. 1 mark for social weighing of both options (cost, safety, convenience). 1 mark for a clear recommendation defended from the weighing. 1 mark for a genuine condition that could change the recommendation.",
      {});
  }
]), ["Weigh both options on both sides before recommending either.", "A condition that could flip your choice shows the decision is really informed."]);


/* ---------- SC9.6.1 ---------- */

E("s9-u2-whmis-action", 2, ["SC9.6.1"], 1, "var", varset([
  function () {
    return mcq("Before using a lab chemical, a student checks its safety data sheet and finds the spill procedure and first aid information. What is the student demonstrating?",
      "Knowledge of WHMIS standards applied to handling that material safely",
      ["A physical property of the chemical", "A delay that should be skipped to save lab time", "The chemical's position on the periodic table"],
      "WHMIS practice includes using the safety data sheet (the MSDS) for a chemical before work begins: it gives the safety precautions, spill procedures and first aid requirements for that material. Checking it first is the standard applied, not wasted time.",
      {});
  }
]), ["The data sheet exists for exactly this check.", "Safety information is gathered before the chemical is handled."]);

E("s9-u2-msds-use", 2, ["SC9.6.1"], 1, "var", varset([
  function () {
    return mcq("A small amount of a chemical splashes near a student's hand. Which response follows proper WHMIS-based technique?",
      "Stop, tell the teacher, and follow the spill and first aid steps given for that chemical on its safety data sheet",
      ["Wipe it up quickly with a paper towel and say nothing", "Pour water over the whole bench to dilute everything at once", "Move the chemical bottle to another bench and continue working"],
      "Proper technique is specific, not improvised: the teacher is informed and the chemical's own data sheet directs the spill procedure and any first aid. Guessing with water or hiding the spill ignores the information WHMIS provides for exactly this moment.",
      {});
  }
]), ["The data sheet, plus the teacher, outrank improvisation.", "Hiding a spill is the opposite of the standard."]);


/* ---------- SC9.6.2 ---------- */

E("s9-u2-hypothesis-form", 2, ["SC9.6.2"], 1, "var", varset([
  function () {
    return mcq("Which statement is a proper hypothesis for an investigation of whether heating changes how a metal sample reacts with vinegar?",
      "If the metal sample is heated before the vinegar is added, then it will produce bubbles faster, because heating increases how vigorously substances react",
      ["Metals and vinegar are interesting to study", "The metal will do something when the vinegar is added", "Heating is part of the procedure we will follow on Friday"],
      "A hypothesis is a testable statement linking a change to an expected result, with a reason: if the sample is heated, then bubbling will be faster, because heating affects reaction vigour. It grows out of background information and an observed pattern, and the investigation can support or refute it.",
      {});
  }
]), ["Look for if, then, and because in one statement.", "Interesting and scheduled are not testable claims."]);

E("s9-u2-cr-design-change", 2, ["SC9.6.2"], 2, "var", varset([
  function () {
    return textq("Design an investigation to determine whether warming a metal strip changes how it reacts with vinegar. State your prediction and hypothesis, the variable you will change, the variables you will keep the same, what you will observe or measure, and how you will stay safe. (4 marks)",
      ["a prediction and hypothesis in if-then-because form linking warming the metal to the speed or amount of reaction with vinegar", "the changed variable is the temperature of the metal or vinegar and the measured result is an observable sign of reaction such as bubbling rate or time to first bubbles", "controlled variables are named, such as the same metal, same vinegar volume and concentration, and same strip size", "a safety step appropriate to heating and acid handling is included"],
      "<b>Model answer:</b> Hypothesis: if the metal strip is warmed before it is placed in vinegar, then bubbles will form faster, because heating increases how vigorously substances react. Method: use identical strips of the same metal, cut to the same size. Keep the vinegar the same in volume and concentration, in identical containers. Change only the temperature: one strip at room temperature, others warmed to set temperatures in a water bath (no open flame near vinegar). Measure the time until bubbling starts, or count bubbles in the first minute, for each temperature, and repeat each trial. Safety: wear eye protection, handle warmed containers with tongs, and follow the vinegar's safety data sheet for spills and first aid. Comparing bubble rates across temperatures, with everything else held constant, lets the data support or refute the hypothesis.<br><br><b>Marking points:</b> 1 mark for a prediction and hypothesis in if-then-because form. 1 mark for one clearly changed variable and a measurable observation. 1 mark for at least two controlled variables named. 1 mark for an appropriate safety step.",
      {});
  }
]), ["This is the design CR: hypothesis, one changed variable, controls, measurement, safety.", "Warm with a water bath in your design; flames and acids do not mix."]);


/* ---------- SC9.6.3 ---------- */

E("s9-u2-data-table-fig", 2, ["SC9.6.3"], 1, "var", varset([
  function () {
    var q = mcq("A class tested four samples and recorded the results in the table. Which sample is most likely a metal?",
      "Sample C, because it conducts electricity, is shiny, and can be bent without breaking",
      ["Sample A, because it does not conduct electricity and shatters when struck", "Sample B, because it is dull and crumbles into a powder", "Sample D, because it conducts electricity slightly but is dull and brittle"],
      "The table's columns are the property tests. Metals conduct electricity, show lustre, and are malleable, and only Sample C passes all three. Sample D's slight conduction with dullness and brittleness fits a metalloid pattern instead, and Samples A and B read as non-metals.",
      {});
    q.figure = s9u2Fig_propsdata();
    return q;
  }
]), ["Run each sample against the metal checklist: conduct, shine, bend.", "One sample passes every test; find it column by column."]);

E("s9-u2-display-choice", 2, ["SC9.6.3"], 1, "var", varset([
  function () {
    return mcq("A group has recorded the melting points of six substances in a list. Which next step best compiles and displays their data?",
      "Build a labelled table (or bar graph) with substance names in one column and melting points, with units, in the other, so values can be compared at a glance",
      ["Rewrite the list in neater handwriting in the same order", "Memorize the six values and discard the list", "Draw a picture of each substance beside its name"],
      "Compiling and displaying data means organizing it so patterns can be seen: a table or bar graph with clear labels and units lets a reader compare all six melting points at once. A neater copy of a list keeps the data just as hard to compare.",
      {});
  }
]), ["The goal is comparison at a glance.", "Labels and units are part of a real display."]);

E("s9-u2-cr-data-display", 2, ["SC9.6.3"], 2, "var", varset([
  function () {
    return textq("In the properties investigation, a group tested five samples and recorded these notes in order: 'Sample 1 shiny, bent easily, conducted. Sample 2 dull, crumbled, no conduction. Sample 3 shiny, snapped, conducted a little. Sample 4 dull, bent a little, no conduction. Sample 5 shiny, bent easily, conducted.' Present these results as a proper data display, and state one pattern the display makes visible that the notes hide. (3 marks)",
      ["results presented as a table with one row per sample and one column per property test", "entries are consistent across cells so samples can be compared directly", "a pattern is stated, such as conduction matching lustre in most samples, or Sample 3 breaking the pattern as a possible metalloid"],
      "<b>Model answer:</b> Display: a table with rows Sample 1 to Sample 5 and columns Lustre, Behaviour when struck or bent, and Conducts electricity. Sample 1: shiny, bent easily, yes. Sample 2: dull, crumbled, no. Sample 3: shiny, snapped, a little. Sample 4: dull, bent a little, no. Sample 5: shiny, bent easily, yes. Pattern made visible: shininess and conduction travel together in Samples 1 and 5 (metal-like in every column), while Sample 3 breaks the pattern, shiny and slightly conducting but brittle, which is the metalloid pattern. In note form, that exception is buried mid-list; in the table it stands out at a glance.<br><br><b>Marking points:</b> 1 mark for a table structure with samples as rows and tests as columns. 1 mark for consistent, complete entries for all five samples. 1 mark for a correct pattern statement that the display reveals.",
      {});
  }
]), ["Rows are samples, columns are tests; keep the wording in each column consistent.", "Look for the sample that breaks the pattern the others set."]);


/* ---------- SC9.6.4 ---------- */

E("s9-u2-organize-format", 2, ["SC9.6.4"], 1, "var", varset([
  function () {
    return mcq("Which format is most appropriate for recording the results of testing eight materials for conductivity, lustre and reaction with vinegar?",
      "A table with one row per material and one column per test, using consistent symbols or words in every cell",
      ["A paragraph describing the materials in the order they were tested", "A sketch of the bench showing where each material sat", "A list of the materials ranked by personal preference"],
      "A row-and-column table matches the structure of the task: the same set of tests applied to every material. Consistent entries make missing results obvious and comparisons direct, which a paragraph or sketch cannot do.",
      {});
  }
]), ["Same tests, many materials: that structure is a table.", "Preference is not data."]);

E("s9-u2-units-heading", 2, ["SC9.6.4"], 1, "var", varset([
  function () {
    return mcq("A student's data table lists temperatures as 20, 35, 50 with no other information in the heading. What is missing for the data to be properly organized?",
      "The quantity name and its unit in the column heading, such as Temperature (degrees C)",
      ["A title page for the lab report", "The names of the student's lab partners", "A conclusion paragraph under the table"],
      "Organized data must be readable by someone who was not there. A column heading naming the quantity and its unit, Temperature (degrees C), makes every number in the column interpretable; bare numbers could be any quantity in any unit.",
      {});
  }
]), ["Numbers without a named quantity and unit cannot be used by a reader.", "Headings carry meaning; partners and conclusions live elsewhere."]);


/* ---------- SC9.6.5 ---------- */

E("s9-u2-conclusion-match", 2, ["SC9.6.5"], 1, "var", varset([
  function () {
    return mcq("A student predicted that a shiny metal strip would not react with vinegar. After a day in vinegar the strip is dull and the vinegar has turned slightly blue. Which conclusion is correct?",
      "The evidence refutes the prediction: the strip reacted, shown by the colour change in the vinegar and the changed surface",
      ["The evidence supports the prediction, because the strip is still in one piece", "No conclusion is possible, because the test lasted a whole day", "The prediction was about a different strip, so it still stands"],
      "A conclusion compares the evidence with the initial idea. Dullness on the strip and a new colour in the vinegar are signs of a chemical reaction, so the prediction of no reaction is refuted, and the conclusion must say so plainly.",
      {});
  }
]), ["Let the observations vote on the prediction.", "Surviving the test is not the same as not reacting."]);

E("s9-u2-cr-conclusion", 2, ["SC9.6.5"], 2, "var", varset([
  function () {
    return textq("A group hypothesized that all shiny solids conduct electricity. They tested six shiny solids: four conducted, one conducted slightly, and one (a polished mineral sample) did not conduct at all. Write the conclusion this group should state, explaining how the evidence supports or refutes their initial idea and what revised idea the evidence suggests. (3 marks)",
      ["the conclusion states that the hypothesis as written is refuted, because one shiny solid did not conduct and another conducted only slightly", "the evidence is cited specifically, four of six conducting, one slight and one not at all", "a revised idea is offered, such as most shiny metals conduct well while shininess alone does not guarantee conduction, as metalloids and minerals show"],
      "<b>Model answer:</b> Conclusion: our hypothesis that all shiny solids conduct electricity is refuted by our results. Four of the six shiny solids conducted, but one conducted only slightly and the polished mineral did not conduct at all, so shininess by itself does not guarantee conduction. The evidence supports a revised idea: the shiny metals conduct well, while other shiny materials, such as metalloids and minerals, may conduct slightly or not at all, so conductivity must be tested directly rather than predicted from appearance alone.<br><br><b>Marking points:</b> 1 mark for stating plainly that the hypothesis is refuted. 1 mark for citing the actual counts as evidence. 1 mark for a revised idea that fits all of the evidence, including the exceptions.",
      {});
  }
]), ["A conclusion must judge the original hypothesis, not just repeat the results.", "The exceptions are data too; your revised idea must cover them."]);


/* ---------- SC9.6.6 ---------- */

E("s9-u2-new-question-pt", 2, ["SC9.6.6"], 1, "var", varset([
  function () {
    return mcq("After learning that elements in a family share properties, which question is a genuine new question raised by the periodic table?",
      "Would an undiscovered element in the halogen family also be a reactive non-metal, and how could that prediction be checked?",
      ["What is the chemical symbol for chlorine?", "How many periods are drawn on our classroom table?", "Who first organized the periodic table?"],
      "Using the table to identify new questions means pushing past facts it already states. Predicting an unknown family member's behaviour from the family pattern, and asking how to check it, is a new question the learning itself creates; symbols, counts and history are already answered on or behind the table.",
      {});
  }
]), ["A new question reaches beyond what the table already tells you.", "If the table answers it at a glance, it is not new."]);


/* ---------- SC9.6.7 ---------- */

E("s9-u2-trend-graph", 2, ["SC9.6.7"], 1, "var", varset([
  function () {
    var q = mcq("The graph shows how the temperature of a reacting mixture changed over five minutes. Which statement correctly interprets the trend?",
      "The temperature rose quickly at first and then levelled off, showing the reaction was most vigorous at the start and slowed as it proceeded",
      ["The temperature fell steadily for the whole five minutes", "The temperature stayed exactly constant, so no reaction occurred", "The temperature rose and fell in a repeating cycle each minute"],
      "Reading a trend means describing the shape in words and tying it to the process. A steep early rise that flattens out means energy was released fastest at the start and the reaction slowed over time, a common pattern as reacting materials are used up.",
      {});
    q.figure = s9u2Fig_trend();
    return q;
  }
]), ["Describe the curve's shape first, then say what it means.", "Levelling off is information, not missing data."]);

E("s9-u2-valence-trend", 2, ["SC9.6.7"], 2, "var", varset([
  function () {
    return mcq("Across Period 3, the number of valence electrons rises steadily from sodium to argon. What does this trend explain?",
      "Why properties change in a regular way across the period, with reactivity patterns repeating in the next period when the count restarts",
      ["Why every element in Period 3 has the same properties", "Why atomic mass decreases across the period", "Why Period 3 elements are all metals"],
      "Patterns in the table are patterns in electron arrangement. As valence electrons increase across a period, properties shift in a regular sequence; when a new period restarts the count, the sequence of properties repeats, which is the periodic pattern Mendeleev's table first exposed.",
      {});
  }
]), ["Valence count is the variable; properties are what it drives.", "Repeating patterns are the heart of the word periodic."]);

E("s9-u2-cr-trends", 2, ["SC9.6.7"], 3, "var", varset([
  function () {
    return textq("Sodium (1 valence electron) reacts violently with water. Magnesium (2 valence electrons), in the same period, reacts slowly. Chlorine (7 valence electrons) is a very reactive non-metal, and argon (8 valence electrons, a full outer level) does not react at all. Explain the relationship between valence electrons and reactivity that these four elements illustrate, and use it to predict how potassium (1 valence electron, next period) will react with water. (3 marks)",
      ["reactivity is linked to the valence arrangement, with atoms having one or seven valence electrons being highly reactive", "a full outer level of eight valence electrons gives stability and no reactivity, as argon shows", "potassium is predicted to react violently with water like sodium because it shares the one valence electron arrangement in the same family"],
      "<b>Model answer:</b> The pattern runs through the valence level. Atoms with a single valence electron (sodium) or with seven (chlorine) sit one electron away from a full or empty stable level, so they react strongly to get there. Magnesium, with two, is further from that point in this comparison and reacts slowly. Argon already has a full outer level, the stable arrangement, and does not react at all. Potassium has one valence electron, the same arrangement as sodium and in the same family, so it is predicted to react violently with water in the same way, which it does.<br><br><b>Marking points:</b> 1 mark for linking high reactivity to one or seven valence electrons. 1 mark for the full level explaining argon's stability. 1 mark for the potassium prediction with its family and valence reasoning.",
      {});
  }
]), ["Distance from a full outer level is the thread connecting all four.", "Predict potassium from its valence count and family, not from its size."]);


/* ---------- SC9.6.8 ---------- */

E("s9-u2-flame-safety", 2, ["SC9.6.8"], 1, "var", varset([
  function () {
    return mcq("During a flame test, how should the wooden splint be used to work safely and get a readable result?",
      "Hold the splint in the flame for only two or three seconds and observe the colour immediately, so the wood itself does not catch fire and mask the colour",
      ["Leave the splint in the flame until the wood is burning well, then read the colour", "Hold the splint with bare fingers close to the flame for better control", "Wave the burning splint over the bench to spread the colour"],
      "Safe flame test technique is brief and deliberate: two or three seconds in the flame shows the ion's colour before the wood catches fire and its own flame hides the result. Longer burning is both a hazard and bad observation; known samples are tested first to build a colour standard for comparison.",
      {});
  }
]), ["Short exposure protects both the student and the reading.", "Once the wood burns, you are reading the wood, not the sample."]);


/* ---------- SC9.6.9 ---------- */

E("s9-u2-new-question-change", 2, ["SC9.6.9"], 1, "var", varset([
  function () {
    return mcq("After watching magnesium burn brightly in air, which question is a new question arising from the investigation?",
      "Does magnesium burn the same way in pure oxygen as in air, and what would that show about what burning needs?",
      ["What colour was the magnesium flame we just saw?", "What is the chemical symbol for magnesium?", "Who demonstrated the burning magnesium today?"],
      "New questions grow out of results. The bright burning raises a testable follow-up about the role of oxygen in burning, which the original investigation did not answer. The other options ask for observations or facts already in hand.",
      {});
  }
]), ["A new question cannot be answered from today's notes.", "Follow the variable the result points at: the air itself."]);

E("s9-u2-follow-up-q", 2, ["SC9.6.9"], 2, "var", varset([
  function () {
    return mcq("A group finds that one metal fizzes in vinegar while another does not. Which follow-up question best arises from their investigation of physical and chemical changes?",
      "Would warming the vinegar change which metals fizz, and would that change be evidence about reaction conditions rather than the metals alone?",
      ["What were the names of the two metals we tested?", "Did everyone in the group see the fizzing happen?", "What page of the textbook describes vinegar?"],
      "Strong follow-up questions test the conditions behind a result. Asking whether temperature changes the outcome separates a property of the metals from a condition of the test, which is exactly the kind of question an investigation should generate.",
      {});
  }
]), ["Vary a condition and see if the result moves.", "Names and page numbers are lookups, not investigations."]);


/* ---------- SC9.6.10 ---------- */

E("s9-u2-flame-table", 2, ["SC9.6.10"], 1, "var", varset([
  function () {
    var q = mcq("Using the flame test results table, which unknown sample most likely contains the same ion as the calcium standard?",
      "Unknown 2, because it produced the same orange flame as the calcium standard",
      ["Unknown 1, because it produced a red flame like the lithium standard", "Unknown 3, because it produced no clear colour at all", "Unknown 4, because it burned the longest of all the samples"],
      "Flame tests identify by matching colours against known standards tested the same way. The calcium standard burned orange, and Unknown 2 matched that orange, so it most likely contains the calcium ion. Red points to the lithium standard instead, and burning time is not an identifying property.",
      {});
    q.figure = s9u2Fig_flame();
    return q;
  }
]), ["Match colours to the standards row by row.", "Identification here is colour matching, nothing else."]);

E("s9-u2-cr-classify-change", 2, ["SC9.6.10"], 2, "var", varset([
  function () {
    return textq("A student investigates two events. Event 1: a white powder is stirred into water and disappears; when the water is evaporated, the same white powder is recovered unchanged. Event 2: a strip of metal in a clear liquid produces a steady stream of bubbles and the liquid changes colour permanently. Classify each event as a physical or chemical change and defend each classification from the experimental data. (3 marks)",
      ["Event 1 is a physical change because dissolving made no new substance, proven by recovering the same powder unchanged", "Event 2 is a chemical change because gas production and a permanent colour change are evidence of a new substance forming", "the classifications are defended from the observations rather than from the materials' names"],
      "<b>Model answer:</b> Event 1 is a physical change. Dissolving spread the powder through the water, but evaporation recovered the identical powder, which proves no new substance was formed; dissolving and evaporating are state and mixing changes only. Event 2 is a chemical change. A steady stream of bubbles means a gas is being produced, and the permanent colour change shows the liquid itself has changed; both are recognized evidence that a new substance has formed. The verdicts rest on the data: recovery unchanged in the first case, gas plus lasting colour change in the second.<br><br><b>Marking points:</b> 1 mark for Event 1 classified physical with the recovery evidence. 1 mark for Event 2 classified chemical with gas and colour evidence. 1 mark for explicitly tying each verdict to the observations.",
      {});
  }
]), ["Recovery unchanged is the strongest physical-change evidence there is.", "Bubbles plus a lasting colour change: count the chemical signs."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-investigation
   item is practice and teacher-picked only, per Jason's ruling of
   Nov 15, 2026. */
var NO_COMPOSE_U2 = {
  "s9-u2-cr-design-change": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U2[e.id]) { e.noCompose = true; } });
