// CRMARKS: s9-u3-cr-flow-language=3
// CRMARKS: s9-u3-cr-series-parallel-data=3
// CRMARKS: s9-u3-cr-bulb-removed=3
// CRMARKS: s9-u3-cr-power-cost=3
// CRMARKS: s9-u3-cr-efficiency-compare=3
// CRMARKS: s9-u3-cr-energy-path=3
// CRMARKS: s9-u3-cr-safety-design=3
// CRMARKS: s9-u3-cr-efficiency-evaluate=3
// CRMARKS: s9-u3-cr-conservation-plan=3
// CRMARKS: s9-u3-cr-technology-criteria=3
// CRMARKS: s9-u3-cr-energy-decision=4
// CRMARKS: s9-u3-cr-hypothesis=3
// CRMARKS: s9-u3-cr-meter-use=3
// CRMARKS: s9-u3-cr-discrepancy=3
// CRMARKS: s9-u3-cr-graph-interpret=3
// CRMARKS: s9-u3-cr-design-circuit=4
// CRMARKS: s9-u3-cr-applications=3
// CRMARKS: s9-u3-cr-charge-explain=3
// Science 9 Unit 3 bank: Electricity (SC9.7.1 to SC9.9.14, 37
// indicators), built Nov 15, 2026 to the Electricity authoring
// spec. All entries are original and were written new for this
// app. Existing tests and question banks, including the ESD
// Grade 9 Unit 3 Electricity set (unit plan, student outline
// and the Electricity Conservation STSE document; the remaining
// ESD material is SMART Notebook and gallery files, listed in
// the catalogue and not reviewed), the MHR ExamView English
// Chapters 7, 8 and 9, and the core laboratories (CORE LAB
// 8-3D, CORE LAB 9-1F and the CORE STSE Electricity
// Conservation: The New Trend), were reviewed only to gauge
// the expected depth and range of treatment.
// Guide discipline: Ohm's law assessments involve a single
// resistance only; total resistance is keyed qualitatively
// (series raises it, parallel lowers it) and is never calculated;
// combined series and parallel network analysis is out of scope;
// energy is calculated in kilowatt-hours with E = P x t, not in
// joules with seconds; charging by induction is not treated (it
// belongs to Physics 3204), so neutral attraction is keyed by the
// third law of charges only; the isolation transformer is not
// assessed. SC9.9.14 is keyed to the English spreadsheet
// statement (apply criteria for evaluating environmental
// problems of electrical production).
// CORE residue: SC9.9.4 entries assess meter placement, reading
// and calculation from described readings; placing meters in a
// live circuit is bench assessment. SC9.9.9 carries one entry on
// accurate instrument practice; handling is classroom assessment.
// SC9.9.10 carries one entry on safe practice; apparatus handling
// is classroom assessment.
// SC9.9.11 (work cooperatively with team members) is NONE on the
// SC7.3.5 and SC8.9.12 precedent: registered, no entries, and the
// gap is recorded in the Electricity catalogue and spec.

function s9u3Esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }

/* E1: series circuit, drawn once. Battery on the left, a switch and
   two bulbs in one single loop. The figure names nothing beyond the
   standard symbols; items supply the description in words. */
function s9u3SeriesSVG() {
  var s = "<svg viewBox=\"0 0 460 240\" width=\"100%\" style=\"max-width:460px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<rect x=\"60\" y=\"40\" width=\"340\" height=\"150\" fill=\"none\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"52\" y1=\"95\" x2=\"68\" y2=\"95\" stroke=\"#333\" stroke-width=\"4\"/><line x1=\"56\" y1=\"125\" x2=\"64\" y2=\"125\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<circle cx=\"200\" cy=\"40\" r=\"17\" fill=\"#fff\" stroke=\"#333\" stroke-width=\"2\"/><path d=\"M188 28 L212 52 M212 28 L188 52\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<circle cx=\"320\" cy=\"40\" r=\"17\" fill=\"#fff\" stroke=\"#333\" stroke-width=\"2\"/><path d=\"M308 28 L332 52 M332 28 L308 52\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"60\" y1=\"190\" x2=\"110\" y2=\"190\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"110\" y1=\"190\" x2=\"140\" y2=\"168\" stroke=\"#333\" stroke-width=\"2\"/><circle cx=\"110\" cy=\"190\" r=\"3.5\" fill=\"#333\"/><circle cx=\"142\" cy=\"190\" r=\"3.5\" fill=\"#333\"/>";
  s += "</svg>";
  return s;
}

/* E2: parallel circuit, drawn once. Battery on the left, two branches
   each carrying one bulb across the supply. */
function s9u3ParallelSVG() {
  var s = "<svg viewBox=\"0 0 460 260\" width=\"100%\" style=\"max-width:460px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"60\" y1=\"40\" x2=\"400\" y2=\"40\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"60\" y1=\"220\" x2=\"400\" y2=\"220\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"60\" y1=\"40\" x2=\"60\" y2=\"220\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"400\" y1=\"40\" x2=\"400\" y2=\"220\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"52\" y1=\"115\" x2=\"68\" y2=\"115\" stroke=\"#333\" stroke-width=\"4\"/><line x1=\"56\" y1=\"145\" x2=\"64\" y2=\"145\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"180\" y1=\"40\" x2=\"180\" y2=\"220\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"300\" y1=\"40\" x2=\"300\" y2=\"220\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<circle cx=\"180\" cy=\"130\" r=\"17\" fill=\"#fff\" stroke=\"#333\" stroke-width=\"2\"/><path d=\"M168 118 L192 142 M192 118 L168 142\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<circle cx=\"300\" cy=\"130\" r=\"17\" fill=\"#fff\" stroke=\"#333\" stroke-width=\"2\"/><path d=\"M288 118 L312 142 M312 118 L288 142\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "</svg>";
  return s;
}

/* E3: circuit with meter placements, drawn once. An ammeter circle in
   the main line and a voltmeter circle across the bulb. The letters
   in the circles are the meters' own standard symbols. */
function s9u3MeterSVG() {
  var s = "<svg viewBox=\"0 0 480 260\" width=\"100%\" style=\"max-width:480px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">";
  s += "<rect x=\"70\" y=\"50\" width=\"330\" height=\"140\" fill=\"none\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"62\" y1=\"105\" x2=\"78\" y2=\"105\" stroke=\"#333\" stroke-width=\"4\"/><line x1=\"66\" y1=\"135\" x2=\"74\" y2=\"135\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<circle cx=\"235\" cy=\"50\" r=\"17\" fill=\"#fff\" stroke=\"#333\" stroke-width=\"2\"/><text x=\"235\" y=\"55\" text-anchor=\"middle\" font-weight=\"bold\">A</text>";
  s += "<circle cx=\"340\" cy=\"50\" r=\"17\" fill=\"#fff\" stroke=\"#333\" stroke-width=\"2\"/><path d=\"M328 38 L352 62 M352 38 L328 62\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"290\" y1=\"190\" x2=\"290\" y2=\"228\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"390\" y1=\"190\" x2=\"390\" y2=\"228\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"290\" y1=\"228\" x2=\"390\" y2=\"228\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<circle cx=\"340\" cy=\"228\" r=\"17\" fill=\"#fff\" stroke=\"#333\" stroke-width=\"2\"/><text x=\"340\" y=\"233\" text-anchor=\"middle\" font-weight=\"bold\">V</text>";
  s += "</svg>";
  return s;
}

/* E4: voltage-current line graph, generated from the item's own
   values. xs are voltages in volts, ys the matching currents in
   amperes; the line of best fit is the plotted line. */
function s9u3VIGraphSVG(xs, ys) {
  var W = 520, H = 280, base = 230, left = 60, right = W - 25, top = 26;
  var maxX = Math.max.apply(null, xs) * 1.15, maxY = Math.max.apply(null, ys) * 1.2;
  function X(v) { return left + v / maxX * (right - left); }
  function Y(v) { return base - v / maxY * (base - top); }
  var pts = xs.map(function (x, i) { return X(x).toFixed(1) + "," + Y(ys[i]).toFixed(1); });
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:520px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + right + "\" y2=\"" + base + "\" stroke=\"#666\"/><line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + left + "\" y2=\"" + top + "\" stroke=\"#666\"/>";
  for (var g = 0; g <= 4; g++) { var gv = maxY * g / 4; s += "<line x1=\"" + left + "\" y1=\"" + Y(gv) + "\" x2=\"" + right + "\" y2=\"" + Y(gv) + "\" stroke=\"#e3eaee\"/><text x=\"" + (left - 6) + "\" y=\"" + (Y(gv) + 4) + "\" text-anchor=\"end\">" + (Math.round(gv * 100) / 100) + "</text>"; }
  s += "<polyline fill=\"none\" stroke=\"#1a6f8f\" stroke-width=\"2.5\" points=\"" + pts.join(" ") + "\"/>";
  xs.forEach(function (x, i) { s += "<circle cx=\"" + X(x) + "\" cy=\"" + Y(ys[i]) + "\" r=\"3.5\" fill=\"#1a6f8f\"/><text x=\"" + X(x) + "\" y=\"" + (base + 18) + "\" text-anchor=\"middle\">" + x + "</text>"; });
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 4) + "\" text-anchor=\"middle\">Voltage (V)</text>";
  s += "<text x=\"15\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 15 " + (H / 2) + ")\">Current (A)</text></svg>";
  return s;
}

/* E5: static charge scene, drawn once. A charged rod (A) at the knob
   (B) of a metal leaf electroscope, leaves (C) apart. Letter callouts
   only; the figure shows no charge signs and labels no answer. */
function s9u3StaticSVG() {
  var s = "<svg viewBox=\"0 0 460 260\" width=\"100%\" style=\"max-width:460px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"60\" y1=\"60\" x2=\"215\" y2=\"88\" stroke=\"#8a5a2b\" stroke-width=\"10\" stroke-linecap=\"round\"/>";
  s += "<circle cx=\"230\" cy=\"92\" r=\"13\" fill=\"#c9a227\" stroke=\"#7a5f14\" stroke-width=\"2\"/>";
  s += "<line x1=\"230\" y1=\"105\" x2=\"230\" y2=\"150\" stroke=\"#7a5f14\" stroke-width=\"4\"/>";
  s += "<path d=\"M230 150 L205 215 M230 150 L255 215\" stroke=\"#7a5f14\" stroke-width=\"4\" fill=\"none\"/>";
  s += "<rect x=\"175\" y=\"130\" width=\"110\" height=\"105\" fill=\"none\" stroke=\"#999\" stroke-width=\"1.5\" stroke-dasharray=\"5 4\"/>";
  s += "<g font-weight=\"bold\" font-size=\"13\"><circle cx=\"90\" cy=\"34\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"90\" y=\"39\" text-anchor=\"middle\">A</text>";
  s += "<circle cx=\"272\" cy=\"80\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"272\" y=\"85\" text-anchor=\"middle\">B</text>";
  s += "<circle cx=\"272\" cy=\"205\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"272\" y=\"210\" text-anchor=\"middle\">C</text></g></svg>";
  return s;
}

/* E6: energy flow diagram, drawn once. Generating station, step-up
   transformer, transmission lines, step-down transformer, home, in
   sequence with arrows. Stage names are scene labels, not answers. */
function s9u3EnergyFlowSVG() {
  var s = "<svg viewBox=\"0 0 640 170\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"11\">";
  var boxes = [[8, "Generating station"], [140, "Step-up transformer"], [272, "Transmission lines"], [404, "Step-down transformer"], [536, "Home"]];
  boxes.forEach(function (b, i) {
    s += "<rect x=\"" + b[0] + "\" y=\"55\" width=\"96\" height=\"52\" fill=\"#eef4f8\" stroke=\"#5b8db8\" stroke-width=\"1.5\"/>";
    var words = b[1].split(" ");
    if (words.length === 2) { s += "<text x=\"" + (b[0] + 48) + "\" y=\"78\" text-anchor=\"middle\">" + words[0] + "</text><text x=\"" + (b[0] + 48) + "\" y=\"94\" text-anchor=\"middle\">" + words[1] + "</text>"; }
    else { s += "<text x=\"" + (b[0] + 48) + "\" y=\"86\" text-anchor=\"middle\">" + b[1] + "</text>"; }
    if (i < 4) { s += "<line x1=\"" + (b[0] + 96) + "\" y1=\"81\" x2=\"" + (b[0] + 132) + "\" y2=\"81\" stroke=\"#333\" stroke-width=\"2\"/><polygon points=\"" + (b[0] + 132) + ",81 " + (b[0] + 122) + ",75 " + (b[0] + 122) + ",87\" fill=\"#333\"/>"; }
  });
  s += "</svg>";
  return s;
}

/* E7: appliance data table, drawn once as an HTML table figure.
   Yearly energy figures for two models of the same appliance, of
   the kind an Energuide label reports. */
function s9u3ApplianceTable() {
  return "<table style=\"border-collapse:collapse;font-family:sans-serif;font-size:14px\"><tr><th style=\"border:1px solid #888;padding:5px 10px\">Appliance model</th><th style=\"border:1px solid #888;padding:5px 10px\">Energy use per year</th></tr>"
    + "<tr><td style=\"border:1px solid #888;padding:5px 10px\">Model 1</td><td style=\"border:1px solid #888;padding:5px 10px\">420 kW-h</td></tr>"
    + "<tr><td style=\"border:1px solid #888;padding:5px 10px\">Model 2</td><td style=\"border:1px solid #888;padding:5px 10px\">310 kW-h</td></tr></table>";
}

/* E8: cell combinations, drawn once. Left: two cells end to end in
   one column. Right: two cells side by side between common rails.
   No labels; items describe the arrangements in words. */
function s9u3CellsSVG() {
  var s = "<svg viewBox=\"0 0 460 200\" width=\"100%\" style=\"max-width:460px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<rect x=\"40\" y=\"70\" width=\"70\" height=\"34\" fill=\"#fdf3d8\" stroke=\"#333\" stroke-width=\"2\"/><rect x=\"110\" y=\"70\" width=\"70\" height=\"34\" fill=\"#fdf3d8\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"104\" y1=\"87\" x2=\"116\" y2=\"87\" stroke=\"#333\" stroke-width=\"5\"/><line x1=\"40\" y1=\"87\" x2=\"20\" y2=\"87\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"180\" y1=\"87\" x2=\"205\" y2=\"87\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<text x=\"75\" y=\"130\" text-anchor=\"middle\">+</text><text x=\"55\" y=\"130\" text-anchor=\"middle\">-</text><text x=\"145\" y=\"130\" text-anchor=\"middle\">+</text><text x=\"125\" y=\"130\" text-anchor=\"middle\">-</text>";
  s += "<line x1=\"280\" y1=\"50\" x2=\"420\" y2=\"50\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"280\" y1=\"150\" x2=\"420\" y2=\"150\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<rect x=\"300\" y=\"82\" width=\"26\" height=\"36\" fill=\"#fdf3d8\" stroke=\"#333\" stroke-width=\"2\"/><rect x=\"360\" y=\"82\" width=\"26\" height=\"36\" fill=\"#fdf3d8\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "<line x1=\"313\" y1=\"50\" x2=\"313\" y2=\"82\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"313\" y1=\"118\" x2=\"313\" y2=\"150\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"373\" y1=\"50\" x2=\"373\" y2=\"82\" stroke=\"#333\" stroke-width=\"2\"/><line x1=\"373\" y1=\"118\" x2=\"373\" y2=\"150\" stroke=\"#333\" stroke-width=\"2\"/>";
  s += "</svg>";
  return s;
}


E("s9-u3-static-def", 3, ["SC9.7.1"], 1, "var", varset([
  function () {
    return mcq("What is static electricity?",
      "A build-up of electric charge on the surface of an object, where the charge stays in place until it is discharged",
      ["Electric current flowing steadily through the wires of a closed circuit to power a connected device", "The magnetism produced when a coil of wire spins rapidly near a magnet inside a generator at a station", "The energy stored inside a chemical cell before it is connected into a complete circuit and switched on"],
      "Static electricity is charge at rest: electrons build up on a material's surface and stay there. It is different from current electricity, where charge flows continuously through a circuit. The charge stays put until a discharge removes it.",
      {});
  }
]), ["The key word is static. What does static itself suggest about the charge?", "Charge that stays in place, not charge that flows."]);

E("s9-u3-friction-transfer", 3, ["SC9.7.1"], 1, "var", varset([
  function () {
    return mcq("A rubber rod is rubbed with a piece of fur. Afterwards the rod carries a negative charge. What actually moved during the rubbing?",
      "Electrons transferred from the fur onto the rod, leaving the rod with extra electrons and the fur with fewer",
      ["Protons transferred from the fur onto the rod during the rubbing, making the rod negative in charge", "Electrons transferred from the rod onto the fur during the rubbing, leaving the rod negative overall", "Neutral particles split in half during the rubbing, creating new positive and negative charges from nothing"],
      "Only electrons move between materials. Protons sit in the nucleus, are far more massive, and do not transfer. The rod ended up negative, so it must have gained electrons; the fur lost those same electrons and became positive. Charge is transferred, never created.",
      {});
  }
]), ["Only one kind of charge can move between objects. Which kind, and which way must it go to make the rod negative?", "Electrons move; a negative object has gained them."]);

E("s9-u3-charge-states", 3, ["SC9.7.1"], 1, "var", varset([
  function () {
    return mcq("A plastic comb is described before and after it is drawn through dry hair. Which sequence of charge states is possible?",
      "The comb starts neutral, gains electrons from the hair, and ends up negatively charged",
      ["The comb starts neutral, loses protons to the hair, and ends up negatively charged", "The comb starts positive, gains protons, and ends up neutral", "The comb starts neutral and ends up positive after gaining electrons"],
      "Objects start neutral when their electrons and protons balance. Rubbing can move electrons from one material to the other: the material that gains electrons becomes negative, and the material that loses them becomes positive. Protons never transfer, and gaining electrons can never make an object positive.",
      {});
  }
]), ["Track the electrons only. Gaining them gives which sign?", "Gain electrons, negative; lose electrons, positive. Protons stay home."]);

E("s9-u3-electroscope-detect", 3, ["SC9.7.1"], 3, "var", varset([
  function () {
    var q = mcq("A student touches a charged rod to the knob of an uncharged metal leaf electroscope and the two leaves spread apart, as shown in the diagram (A marks the rod, B the knob and C the leaves). What does the spreading show, and what can the student conclude about the sign of the rod's charge from this test alone?",
      "The spreading shows the rod carried a charge, because charge spread onto both leaves and like charges repel; the test alone does not identify the sign",
      ["The spreading shows the rod was positive, because only positive charge can spread through metal onto the leaves and push them apart like this", "The spreading shows the rod was neutral, because neutral objects attract the leaves of an electroscope and pull them apart from each other", "The spreading shows the exact amount of charge on the rod, measured in coulombs from the angle of the leaves, and identifies its sign as well"],
      "An electroscope detects the presence of charge. Charge from the rod spreads through the metal onto both leaves; both leaves carry the same sign of charge, and like charges repel, so the leaves separate. Either sign of charge produces the same spreading, so identifying the sign takes further testing, exactly the caution the guide gives.",
      {});
    q.figure = s9u3StaticSVG();
    return q;
  }
]), ["Why do the leaves separate at all? Which law of charges is working?", "Same charge on both leaves means repulsion. Would a negative rod look any different?"]);

E("s9-u3-discharge", 3, ["SC9.7.1"], 2, "var", varset([
  function () {
    var q = mcq("After shuffling across a carpet in dry weather, a student reaches for a metal doorknob and feels a small shock just before touching it. Which term and explanation fit the shock?",
      "Electric discharge: the charge built up on the student is suddenly removed as electrons jump between the student and the knob",
      ["Electric current: a steady, controlled flow of charge begins circulating through the student's body and the knob", "Charging by friction: the doorknob rubs against the student's hand as it turns and rubs charge onto the skin directly", "Neutralization by protons: protons flow out of the metal knob into the hand and cancel the student's charge exactly"],
      "Electric discharge is the removal of electric charge from an object. The carpet built up a static charge on the student; near the conducting knob, that charge is suddenly released in one quick jump, felt as a shock. Lightning is the same event on a far larger scale. No steady circuit current is involved.",
      {});
    return q;
  }
]), ["The charge leaves all at once, not in a steady flow. There is a single word for that removal.", "Discharge means the built-up charge is removed suddenly."]);

/* Added November 19, 2026: closes the Unit 3 Test 1 CR denomination
   gap in the test blueprint. The test's three indicators (SC9.7.1,
   SC9.7.2, SC9.7.3) held no CR entries between them against a 3-mark
   target; this entry is attributed to SC9.7.1. See
   Junior-Science-Blueprint-Depth-Queue-2026-11-19.md. */
E("s9-u3-cr-charge-explain", 3, ["SC9.7.1"], 2, "var", varset([
  function () { return textq("A student touches the knob of an uncharged electroscope with a negatively charged rod, and the leaves spread apart and stay apart after the rod is taken away. The student then touches the knob with a finger, and the leaves fall back together. Explain all three observations in terms of the movement of electrons. (3 marks)",
    ["Touching the knob with the negative rod transfers electrons onto the electroscope, so both leaves carry extra electrons; like charges repel, so the leaves spread. The charge stays on the metal after the rod leaves, so the leaves stay apart. Touching the knob with a finger lets the extra electrons flow away through the student's body to the ground, so the leaves become neutral and fall together."],
    "<b>Model answer:</b> The rod is negative, so it carries extra electrons. When it touches the knob, electrons transfer by contact onto the metal of the electroscope and spread onto both leaves. Both leaves now carry the same (negative) charge, and like charges repel, so the leaves push apart. Metal holds the transferred charge after the rod is removed, so the leaves stay apart. When the student touches the knob, the extra electrons have a path away through the student's body to the ground: the electroscope is discharged, the leaves are neutral again, and with no repulsion they fall back together.<br><br><b>Marking points:</b> 1 mark for electrons transferring from the rod onto the electroscope by contact. 1 mark for both leaves carrying like charge and repelling, and the charge remaining after the rod is removed. 1 mark for the finger providing a path for the electrons to leave (discharging, or grounding), so the leaves become neutral and fall.", {}); },
  function () { return textq("A student rubs a balloon against her hair. The balloon then sticks to a painted wall, but after several minutes it falls off. Explain each part of this in terms of electric charge: how the balloon became charged, why it sticks to the neutral wall, and why it eventually falls. (3 marks)",
    ["Rubbing transfers electrons from the hair onto the balloon, so the balloon becomes negatively charged. The charged balloon attracts the neutral wall, because a charged object attracts some neutral objects. Over time the balloon's extra electrons leak away into the air and the wall, so the balloon discharges, the attraction fades and the balloon falls."],
    "<b>Model answer:</b> Rubbing is charging by friction: electrons transfer from the hair onto the balloon, leaving the balloon with extra electrons, so it is negatively charged (and the hair, short of electrons, is positive). The wall is neutral, but a charged object attracts some neutral objects: the balloon's charge draws the opposite charges in the wall's surface closer and pushes the like charges back, so the near surface of the wall attracts the balloon strongly enough to hold it. The balloon does not keep its charge forever: the extra electrons gradually leak away to the air and the wall, the balloon discharges toward neutral, the attraction weakens, and gravity pulls the balloon down.<br><br><b>Marking points:</b> 1 mark for electrons transferring from hair to balloon by friction, making the balloon negative. 1 mark for the charged balloon attracting the neutral wall. 1 mark for the charge leaking away over time (discharge), ending the attraction.", {}); }
]), ["Only electrons move. Track where they go at each step.", "Spreading leaves and a sticking balloon are both repulsion and attraction doing their work."]);

E("s9-u3-laws-charges", 3, ["SC9.7.2"], 1, "gen", function () {
  var cases = [
    { q: "Which statement gives the laws of electric charges correctly?", k: "Like charges repel each other, unlike charges attract each other, and charged objects attract some neutral objects", w: ["Like charges attract each other, unlike charges repel each other, and charged objects repel neutral objects", "Like charges attract each other, unlike charges attract each other, and neutral objects are never affected", "Charges interact only when the objects touch, and neutral objects always repel charged ones"] },
    { q: "A negatively charged rod is brought near a second rod, and the two rods move apart. What can be concluded about the second rod?", k: "It is negatively charged, because repulsion happens only between like charges", w: ["It is positively charged, because opposite charges push apart", "It is neutral, because neutral objects are repelled by charged ones", "Nothing can be concluded, because attraction and repulsion give the same information"] },
    { q: "A positively charged strip is held near an uncharged pith ball, and the ball swings toward the strip. Which law does the ball's motion demonstrate?", k: "Charged objects attract some neutral objects", w: ["Like charges repel each other", "Unlike charges attract each other", "Neutral objects repel charged objects"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The laws of electric charges have three parts: like charges repel, unlike charges attract, and a charged object attracts some neutral objects. Repulsion is the decisive observation, because it happens only between like charges; attraction can mean an unlike charge or a neutral object.",
    {});
}, ["There are three parts to the laws: like, unlike, and charged with neutral.", "Repel for like, attract for unlike, attract for some neutrals."]);

E("s9-u3-pith-balls", 3, ["SC9.7.2"], 1, "var", varset([
  function () {
    return mcq("Two suspended pith balls are touched with the same charged rod, then released. They swing away from each other and stay apart. Which law explains their behaviour?",
      "Like charges repel: both balls carry the same charge from the rod, so they push each other away",
      ["Unlike charges attract: the balls carry opposite charges, so they push each other away", "Charged objects attract neutral objects: the balls are neutral, so they repel", "Electric discharge: the balls are losing charge to the air, which drives them apart"],
      "Both balls received the same kind of charge from the same rod. Objects carrying like charges repel each other, so the balls separate and remain apart while the charge lasts. Attraction would pull them together, not push them apart.",
      {});
  }
]), ["Same rod, same charge on both balls. What do like charges do?", "Like charges repel."]);

E("s9-u3-balloon-wall", 3, ["SC9.7.2"], 1, "var", varset([
  function () {
    return mcq("A balloon rubbed on a sweater sticks to a neutral painted wall and stays there. Which part of the laws of electric charges does this demonstrate?",
      "A charged object can attract a neutral object",
      ["Like charges repel each other", "Unlike charges attract each other", "A neutral object can repel a charged object"],
      "The wall is neutral, yet the charged balloon is attracted to it and clings. That is the third law of electric charges: charged objects attract some neutral ones. The guide uses this exact demonstration, and it deliberately stops there: the deeper explanation involving induced charge separation belongs to a later physics course.",
      {});
  }
]), ["The wall has no net charge. So which law is left that involves a neutral object?", "Charged attracts neutral."]);

E("s9-u3-attract-repel-test", 3, ["SC9.7.2"], 2, "var", varset([
  function () {
    return mcq("A student wants to find out whether an unknown charged strip carries a positive or a negative charge. She already has a strip known to be negative. Which test gives her the answer, and why is simple attraction not enough on its own?",
      "Bring the known negative strip near the unknown: repulsion proves the unknown is also negative, because only like charges repel; attraction alone could mean an unlike charge or a neutral object",
      ["Attraction to the known strip proves the unknown is positive, because attraction only ever happens between opposite charges, and a neutral object could not be attracted at all", "If the unknown strip is attracted to a neutral object it must be positive, because neutral objects are attracted only by positive charges and never by negative ones in any test", "Repulsion from the known strip proves the unknown is positive, because positive charges push negative charges away from themselves whenever the two are brought near each other"],
      "Repulsion is the decisive test: it happens only between like charges, so if the unknown strip is repelled by a known negative strip, it is negative for certain. Attraction is ambiguous, because a charged object attracts both an oppositely charged object and some neutral objects, so attraction alone cannot identify the sign.",
      {});
  }
]), ["One of the two interactions can only happen one way. Which one is unambiguous?", "Attraction has two possible causes; repulsion has only one."]);

E("s9-u3-charge-interactions", 3, ["SC9.7.2"], 3, "var", varset([
  function () {
    return mcq("Three pairs of objects are tested. Pair 1: two negatively charged rods repel. Pair 2: a positive rod and a negative rod attract. Pair 3: a charged rod attracts an uncharged metal leaf. A student claims pair 3 breaks the laws of charges because 'a neutral object has no charge to attract with.' Which evaluation is correct?",
      "The claim is wrong: the laws include charged objects attracting some neutral objects, so all three pairs follow the laws",
      ["The claim is right: pair 3 must involve a hidden charge, because neutral objects cannot be attracted", "The claim is wrong because pair 3 is actually repulsion seen from the other side", "The claim is right for pair 3 but wrong for pairs 1 and 2, which follow a different set of laws"],
      "All three observations are the three laws in action: like charges repel (pair 1), unlike charges attract (pair 2), and charged objects attract some neutral objects (pair 3). The student's error is leaving the third law out. Neutral means equal positive and negative charge overall, not an absence of charge, so there is no contradiction.",
      {});
  }
]), ["Count the laws: the student's version is missing one of the three.", "Pair 3 is the third law, not an exception to the laws."]);

E("s9-u3-static-vs-current", 3, ["SC9.7.3"], 1, "var", varset([
  function () {
    return mcq("Which comparison of static electricity and electric current is correct?",
      "Static electricity is charge built up in one place and released in a sudden discharge; electric current is a continuous, controlled flow of charge through a circuit",
      ["Static electricity flows continuously through wires; electric current builds up on surfaces and discharges suddenly in a single spark, exactly like lightning", "Static electricity can power household devices for hours at a time; electric current lasts only a fraction of a second before it is gone and cannot be restarted", "Static electricity involves protons moving between objects; electric current involves electrons flowing, and the two charges move in the two kinds of electricity"],
      "The contrast is about control and duration. A static charge sits on a surface and leaves in one uncontrolled discharge, like the doorknob shock or lightning. Electric current is charge flowing steadily through a conductor in a circuit, which is what makes it useful for running devices. In both cases the moving charge is electrons.",
      {});
  }
]), ["Ask two questions of each: does the charge stay or flow, and can it be controlled?", "Static builds up and discharges; current flows on demand."]);

E("s9-u3-static-not-harnessed", 3, ["SC9.7.3"], 1, "var", varset([
  function () {
    return mcq("A student asks why the static shock from a doorknob cannot be used to run a flashlight, even though the shock clearly involves moving electrons. Which answer is correct?",
      "The discharge is over almost instantly and cannot be controlled or sustained, so it cannot supply the continuous flow of charge a device needs",
      ["Static shocks involve protons moving rather than electrons, and flashlights and other devices run only on electrons in motion through wires", "The shock's electrons move far too slowly through the air to carry any useful energy across to a device like a flashlight switched on", "Static electricity is not real electricity at all, so it can never interact with a device or with the charges inside one in any way"],
      "Static electricity is real electricity, but it is a one-moment event: the built-up charge escapes in a single rapid discharge and then it is gone. A flashlight needs charge flowing continuously through its circuit for as long as it is switched on. That is why static electricity cannot be harnessed as a useful energy source, while current electricity can.",
      {});
  }
]), ["Compare how long each kind lasts and whether you can turn it on and off.", "A device needs a sustained flow, not a single spark."]);

E("s9-u3-compare-table", 3, ["SC9.7.3"], 2, "var", varset([
  function () {
    return mcq("A class is sorting observations into two columns, static electricity and electric current. Which observation belongs in the electric current column?",
      "Charge flows through the filament of a lamp for as long as the switch stays closed",
      ["A spark jumps from a fingertip to a doorknob after walking on carpet", "A balloon clings to a wall after being rubbed on hair", "Lightning strikes a lightning rod during a storm"],
      "Three of the observations are static events: a spark discharge, a clinging balloon, and lightning, each a build-up released or held in place. The lamp is current electricity: charge flows continuously through a circuit for as long as the path is complete, which is the qualitative difference this indicator targets.",
      {});
  }
]), ["Three of the four are over in an instant or stay in place. Find the one that keeps flowing.", "Look for the closed circuit and the sustained flow."]);

E("s9-u3-voltage-def", 3, ["SC9.7.4"], 1, "var", varset([
  function () {
    return mcq("Which pairing of term, definition and unit is correct?",
      "Electric potential difference (voltage): the difference in electric potential energy per unit of charge between two points, measured in volts (V)",
      ["Electric current: the difference in electric potential energy between two points in a circuit, measured in volts (V) like voltage", "Electric charge: the flow of electrons past a point each second through a wire in a circuit at any moment, measured in coulombs (C)", "Electric potential difference: the total amount of charge stored inside a chemical cell, measured in coulombs (C) before use"],
      "Voltage is electric potential difference: how much potential energy each unit of charge gains at the source or loses at a load, and its unit is the volt. Current is a flow rate, measured in amperes, and charge itself is measured in coulombs. Keeping the three quantities and their units separate is the precise language this indicator requires.",
      {});
  }
]), ["Three quantities are in play: charge, current, voltage. Match each to its unit: C, A, V.", "Voltage goes with volts, and it is about potential energy per charge."]);

E("s9-u3-circuit-parts", 3, ["SC9.7.4"], 1, "var", varset([
  function () {
    return mcq("A simple circuit contains a cell pack, a small motor, connecting wires and a switch. Which matching of parts to circuit roles is correct?",
      "Source: the cell pack. Load: the motor. Conductor: the wires. Control: the switch",
      ["Source: the motor. Load: the cell pack. Conductor: the switch. Control: the wires", "Source: the wires. Load: the switch. Conductor: the cell pack. Control: the motor", "Source: the switch. Load: the wires. Conductor: the motor. Control: the cell pack"],
      "Every complete circuit has the same four roles. The source supplies electrical energy (the cells convert chemical energy to electrical energy), the load converts electrical energy to another form (the motor, to motion), the conductors carry the charge around the loop, and the control (switch) opens or closes the path.",
      {});
  }
]), ["Ask of each part: does it supply energy, use energy, carry charge, or open and close the path?", "Source supplies, load uses, wires carry, switch controls."]);

E("s9-u3-cell-how", 3, ["SC9.7.4"], 2, "var", varset([
  function () {
    return mcq("How does an electrochemical cell supply electric charge to a circuit?",
      "Two electrodes of different materials sit in an electrolyte, and chemical reactions at the electrodes separate charge, producing a potential difference between the terminals",
      ["A magnet spins inside the cell on a tiny shaft, generating charge by its motion, and the charge collects on the two terminals for use in a circuit connected outside", "The cell stores loose electrons in a small tank inside it, and they pour out through the terminals as soon as a wire is attached to the circuit by the user", "Friction between the two electrodes, as the electrolyte flows past them, rubs electrons from one electrode onto the other inside the cell continuously while it works"],
      "An electrochemical cell needs two electrodes made of different materials and an electrolyte, the conducting substance they sit in. Chemical reactions involving the electrodes and the electrolyte drive electrons toward one terminal and away from the other, so a potential difference appears across the cell. It is a conversion of chemical energy to electrical energy, not stored loose electrons and not a generator.",
      {});
  }
]), ["Name the cell's three ingredients first: two different electrodes and one more substance.", "Different electrodes plus an electrolyte, with chemistry doing the separating."]);

E("s9-u3-coulomb", 3, ["SC9.7.4"], 3, "var", varset([
  function () {
    return mcq("One coulomb of charge corresponds to about 6.25 x 10^18 electrons added to or removed from an object. A lamp draws a current of 0.50 A. Using current as charge passing per second, about how many electrons pass through the lamp each second?",
      "About 3.1 x 10^18 electrons per second",
      ["About 6.25 x 10^18 electrons per second", "About 1.25 x 10^19 electrons per second", "About 3.1 x 10^17 electrons per second"],
      "A current of 1 A means 1 coulomb of charge passes each second. At 0.50 A, the charge passing each second is 0.50 C. Multiply by the electrons in one coulomb: 0.50 x 6.25 x 10^18 = 3.125 x 10^18, about 3.1 x 10^18 electrons per second (rounded to two significant figures). The guide gives the scale this way: roughly a coulomb a second passes through a 100 W bulb.",
      {});
  }
]), ["First turn the current into coulombs per second, then use the electrons-per-coulomb figure.", "Half an ampere means half a coulomb each second."]);

E("s9-u3-cr-flow-language", 3, ["SC9.7.4"], 2, "var", varset([
  function () {
    return textq("A student writes: 'The battery gives the circuit 6 volts of current, and the bulb uses up the current so less comes back.' Rewrite the student's meaning using precise language: state what the source provides, what flows around the whole circuit, and what the bulb actually converts. (3 marks)",
      ["the source provides a potential difference (voltage) of 6 V, not current", "current is the flow of charge and is not used up; the same current returns to the source", "the bulb converts electrical energy to light and heat; the potential difference drops across the bulb"],
      "<b>Model answer:</b> The source provides an electric potential difference of 6 V: it gives each unit of charge potential energy. What flows around the circuit is electric current, the movement of charge, and current is not used up: the charge that leaves the source returns to it, so the current is the same coming back as going out. What the bulb uses is energy, not current: the charge gives up its potential energy in the bulb, which converts electrical energy into light energy and heat energy, and that loss of potential energy per unit charge is the voltage drop across the bulb.<br><br><b>Marking points:</b> 1 mark for voltage correctly assigned to the source as potential difference in volts. 1 mark for current described as flowing charge that is conserved around the loop. 1 mark for the bulb converting energy, with the voltage drop located at the bulb.",
      {});
  }
]), ["Separate the three ideas the student has merged: voltage, current and energy.", "The source provides one of them, the wires carry another, and the bulb converts the third."]);

E("s9-u3-series-identify", 3, ["SC9.7.5"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows one battery, a switch and two bulbs connected so that all the charge must pass through both bulbs in turn along a single path. Which description fits the circuit, and what happens if one bulb is unscrewed?",
      "A series circuit: unscrewing one bulb breaks the only path, so the other bulb goes out as well",
      ["A parallel circuit: unscrewing one bulb leaves the other lit, because each has its own path", "A series circuit: unscrewing one bulb makes the other bulb brighter, because it gets all the voltage", "A parallel circuit: unscrewing one bulb breaks every path, so both bulbs go out"],
      "A single path for charge is the definition of a series connection. Every component sits on that one path, so opening the path anywhere, by a switch or by removing a bulb, stops the current everywhere and both bulbs go out. Circuits where each bulb keeps working when another is removed are parallel circuits, with a separate path for each branch.",
      {});
    q.figure = s9u3SeriesSVG();
    return q;
  }
]), ["Count the paths. One path means which connection?", "A break anywhere in a single path stops everything on it."]);

E("s9-u3-parallel-identify", 3, ["SC9.7.5"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a battery with two bulbs, each bulb on its own branch so charge can reach either bulb without passing through the other. One bulb burns out. What happens to the other bulb, and why?",
      "It stays lit at the same brightness, because its own branch is still a complete path across the battery",
      ["It goes out at once, because the burnt bulb breaks the circuit's only complete path to the battery", "It becomes brighter than before, because all the battery's voltage now goes to the one remaining bulb", "It becomes dimmer than before, because the broken branch keeps draining charge from the battery steadily"],
      "In a parallel circuit each branch is a complete circuit across the source on its own. Each branch receives the full source voltage, so a bulb on an intact branch is unaffected when another branch opens. That independence is exactly why household lights are wired in parallel.",
      {});
    q.figure = s9u3ParallelSVG();
    return q;
  }
]), ["Each branch stands alone across the battery. What does one branch care about the other?", "An intact branch keeps its full voltage and its own complete path."]);

E("s9-u3-series-current-rule", 3, ["SC9.7.5"], 1, "gen", function () {
  var cases = [
    { q: "An ammeter is moved to three different positions in a series circuit containing a battery and two bulbs. What will the three readings show?", k: "The same current at every position, because charge has only one path and the same flow passes every point", w: ["A smaller current after each bulb, because each bulb uses up part of the current to make its light and heat", "A larger current near the battery, falling steadily to zero at the far end of the circuit loop and back", "Different currents at the three positions that add up together to the current leaving the battery"] },
    { q: "In a series circuit the ammeter next to the battery reads 0.40 A. A second ammeter is placed on the far side of the second bulb. What does it read?", k: "0.40 A, because the current is the same everywhere in a series circuit", w: ["Less than 0.40 A, because the two bulbs have used some of the current", "0.80 A, because the currents through the two bulbs add together", "0 A, because the current is finished once it has passed both bulbs"] },
    { q: "A student claims the current entering a bulb in a series circuit is larger than the current leaving it, because the bulb uses current to make light. Which correction is right?", k: "The currents are equal: the bulb converts electrical energy to light and heat, but charge itself flows through unchanged in amount", w: ["The claim is right: light is made out of the current itself, which disappears into the bulb as it shines each second", "The leaving current is larger than the entering current, because the bulb adds its own energy to the charge passing through", "Both currents are zero until the bulb has warmed up fully, and only then does any charge begin to flow through it"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Current is not used up by loads; energy is. In a series circuit there is one path, so the same charge per second passes the battery, each bulb and every point between them. Ammeters placed anywhere in that single loop read the same value, while the bulb converts the charge's energy into light and heat.",
    {});
}, ["Current is conserved: charge cannot pile up or vanish in the loop.", "One path, one current value, everywhere."]);

E("s9-u3-gen-series-voltage", 3, ["SC9.7.5"], 2, "gen", function () {
  var Vt = pick([6, 9, 12]);
  var V1 = pick([2, 3, 4]);
  var V2 = Vt - V1;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { if (cand[i] !== key && cand[i] > 0 && out.indexOf(cand[i]) < 0) out.push(cand[i]); } return out.map(function (d) { return d + " V"; }); }
  return mcq("Two bulbs are connected in series across a " + Vt + " V battery. A voltmeter across the first bulb reads " + V1 + " V. What does a voltmeter across the second bulb read?",
    V2 + " V", dis3(V2, [Vt, V1, Vt + V1, V2 + 2]),
    "In a series circuit the voltage drops across the loads add up to the source voltage: V(total) = V1 + V2. So V2 = " + Vt + " V - " + V1 + " V = " + V2 + " V. The source's potential difference is shared between the series loads, never duplicated and never lost.",
    {});
}, ["The drops across series loads share out the source voltage. Add them and compare with the total.", "V2 is what is left of the total after the first bulb's drop."]);

E("s9-u3-gen-parallel-current", 3, ["SC9.7.5"], 2, "gen", function () {
  var I1 = pick([0.3, 0.4, 0.5, 0.6]);
  var I2 = pick([0.2, 0.3, 0.4]);
  var It = Math.round((I1 + I2) * 100) / 100;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { var cv = Math.round(cand[i] * 100) / 100; if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv); } return out.map(function (d) { return d + " A"; }); }
  return mcq("Two bulbs are connected in parallel. An ammeter in the first branch reads " + I1 + " A and an ammeter in the second branch reads " + I2 + " A. What current does an ammeter in the main line, next to the battery, read?",
    It + " A", dis3(It, [I1, I2, Math.abs(I1 - I2), It * 2, It + 0.2, I1 * 2, I2 * 2 + 0.1]),
    "In a parallel circuit the branch currents add up to the main line current: I(total) = " + I1 + " A + " + I2 + " A = " + It + " A. The charge flowing out of the battery splits between the branches and recombines on the way back, so the main line carries the sum (values rounded to two decimal places).",
    {});
}, ["Branch currents split the main current between them. How do they recombine?", "Main line current is the sum of the branch currents."]);

E("s9-u3-total-resistance", 3, ["SC9.7.5"], 2, "var", varset([
  function () {
    return mcq("Resistors are added to a circuit in two separate trials. In trial 1 a second resistor is added in series; in trial 2 a second resistor is added in parallel. What happens to the total resistance in each trial?",
      "Trial 1: total resistance increases. Trial 2: total resistance decreases",
      ["Trial 1: total resistance increases. Trial 2: total resistance increases", "Trial 1: total resistance decreases. Trial 2: total resistance decreases", "Trial 1: total resistance decreases. Trial 2: total resistance increases"],
      "Adding a resistor in series lengthens the single path charge must push through, so total resistance rises. Adding a resistor in parallel opens an extra path for charge, giving it more ways through, so total resistance falls. This course asks for the direction of the change only; calculating a total resistance value is beyond its scope.",
      {});
  }
]), ["Series means a longer single path; parallel means an extra path. What does each do to opposition to flow?", "Longer path, more resistance; extra path, less resistance."]);

E("s9-u3-parallel-voltage-rule", 3, ["SC9.7.5"], 3, "var", varset([
  function () {
    return mcq("A 9 V battery powers two different bulbs connected in parallel. Bulb P is rated to draw a larger current than bulb Q. Which statement about the voltages is correct?",
      "Both bulbs have 9 V across them; the different currents come from their different resistances, not from different voltages",
      ["Bulb P has more than 9 V across it, because it draws the larger current of the two bulbs in the circuit shown", "The 9 V of the battery is shared out between the two bulbs in proportion to the currents each one draws from it", "Bulb Q has the full 9 V across it and bulb P has less, because P uses its voltage up faster than Q does in the circuit"],
      "Each parallel branch connects directly across the source, so every branch has the full source voltage across it, 9 V here, whatever its resistance. The bulbs differ in resistance, so by Ohm's law they draw different currents at that same voltage. Sharing out the voltage is the series behaviour, not the parallel behaviour.",
      {});
  }
]), ["In parallel, what is the same for every branch, and what is allowed to differ?", "Voltage is the shared quantity in parallel; current is the one that differs."]);

E("s9-u3-cr-series-parallel-data", 3, ["SC9.7.5"], 2, "var", varset([
  function () {
    return textq("A student builds two circuits with identical bulbs and a 6 V source. Circuit A (series): both bulbs glow dimly and the ammeter reads 0.30 A everywhere. Circuit B (parallel): both bulbs glow brightly, each branch ammeter reads 0.60 A, and the main line ammeter reads 1.20 A. Explain both sets of observations using current, voltage and resistance. (3 marks)",
      ["in series the 6 V is shared, the current is the same everywhere, and total resistance is higher, so bulbs are dim", "in parallel each bulb has the full 6 V, branch currents add to the main current, and total resistance is lower", "brightness follows from the voltage each bulb actually receives"],
      "<b>Model answer:</b> In Circuit A the bulbs are in series, so the 6 V is shared between them (about 3 V each) and the same 0.30 A flows through both. The series path also has the higher total resistance, which keeps the current low. Each bulb gets only part of the voltage at a low current, so both glow dimly. In Circuit B each bulb sits directly across the source with the full 6 V across it, so each draws its full 0.60 A and glows brightly. The branch currents add: 0.60 A + 0.60 A = 1.20 A in the main line. The parallel arrangement has the lower total resistance because charge has two paths through.<br><br><b>Marking points:</b> 1 mark for the series explanation (shared voltage, single current value, higher total resistance, dim bulbs). 1 mark for the parallel voltage and brightness (full 6 V per bulb, bright). 1 mark for the parallel currents adding to the main line value, tied to the lower total resistance of two paths.",
      {});
  }
]), ["Work circuit by circuit: what is shared, what is the same, and what adds up in each?", "Brightness is the visible clue to the voltage each bulb receives."]);

E("s9-u3-cr-bulb-removed", 3, ["SC9.7.5"], 3, "var", varset([
  function () {
    return textq("Two strings of identical bulbs are tested with the same source. In string 1, unscrewing any one bulb puts out every bulb on the string. In string 2, unscrewing one bulb leaves the rest lit at unchanged brightness. Identify each string's connection type and explain both results, including what happens to total resistance when the bulb is removed in each case. (3 marks)",
      ["string 1 is series: one path, so a break stops all current; removing a bulb opens the circuit entirely", "string 2 is parallel: each bulb has its own branch, so the others keep their full voltage and brightness", "in parallel, removing a branch removes a path, so total resistance rises; in series the open circuit passes no current at all"],
      "<b>Model answer:</b> String 1 is a series string: all the bulbs share one path, so unscrewing one bulb opens that path and the current stops everywhere; every bulb goes out. String 2 is a parallel string: each bulb has its own branch directly across the source, so removing one bulb opens only its own branch. The remaining bulbs still have the full source voltage across their intact branches, so they stay lit at unchanged brightness. Removing a parallel branch removes one path for charge, so the circuit's total resistance increases (fewer paths, more opposition overall), while in the series string the removal does not just change the resistance, it breaks the circuit completely.<br><br><b>Marking points:</b> 1 mark for identifying string 1 as series with the single-path explanation. 1 mark for identifying string 2 as parallel with the independent-branch and full-voltage explanation. 1 mark for the resistance statements (parallel total resistance rises when a branch is removed; series removal opens the circuit).",
      {});
  }
]), ["The removal test is the classic identifier. Ask what a break does in each arrangement.", "One path versus many paths decides everything, including the resistance change."]);

E("s9-u3-energy-def", 3, ["SC9.7.6"], 1, "var", varset([
  function () {
    return mcq("Which set of definitions and units is correct?",
      "Electrical energy is the energy transferred by moving charge, measured in joules (J); electrical power is the rate at which that energy is transferred, measured in watts (W)",
      ["Electrical energy is measured in watts (W), the rate unit; electrical power is measured in joules (J), the amount unit, in every case without exception in the guide's usage", "Electrical energy and electrical power are the same quantity under two names, and both are measured in joules (J) whenever they are reported in this course and in the guide", "Electrical power is the total energy a device will ever use in its lifetime, measured in kilowatt-hours, the unit printed on energy labels for appliances"],
      "Energy and power are related but different. Energy is the amount transferred, and its unit is the joule. Power is how fast the transfer happens, energy per unit time, and its unit is the watt: 1 W = 1 J/s. A kilowatt-hour is a larger unit of energy, not of power.",
      {});
  }
]), ["One quantity is an amount, the other is a rate. Amount first, then rate.", "Joules measure energy; watts measure the rate of transfer."]);

E("s9-u3-cost-factors", 3, ["SC9.7.6"], 1, "var", varset([
  function () {
    return mcq("According to the guide, the cost of operating an electrical device depends on three factors. Which set names them?",
      "The voltage across the device, the current through it, and the time it operates",
      ["The colour of the device, its mass, and the time it operates", "The resistance of the wires only, the season, and the size of the home", "The number of outlets in the room, the voltage, and the brand of the device"],
      "Electrical energy cost builds from three factors: the voltage drop, the electrical current and the operating time, combined in P = V x I and energy = power x time. That is why a baseboard heater on 240 V drawing a large current costs far more to run than a radio on 120 V drawing a small one, even for the same time.",
      {});
  }
]), ["The three factors are the ingredients of P = V x I, plus one more about duration.", "Voltage, current, and time."]);

E("s9-u3-power-meaning", 3, ["SC9.7.6"], 2, "var", varset([
  function () {
    return mcq("Two kettles are plugged into the same 120 V supply. Kettle A is rated 1500 W and kettle B is rated 900 W. Both are used to heat the same amount of water. Which statement is correct?",
      "Kettle A transfers electrical energy faster, so it does the same heating job in less time; run for the same time, it would use more energy",
      ["Kettle B transfers energy faster than kettle A, because a lower wattage means less resistance to the flow of energy through it", "Both kettles transfer energy at exactly the same rate, because they are plugged into the same 120 V supply in the kitchen at home", "Kettle A uses less total energy for the whole job because it finishes sooner, whatever the exact time difference between them may be"],
      "Power is a rate: the 1500 W kettle converts about 1500 joules every second, the 900 W kettle about 900 joules every second, so the higher-rated kettle heats the same water faster. Energy used is power multiplied by time, so the faster kettle's shorter run and the slower kettle's longer run must both be counted before total energies can be compared; the rating alone settles the rate, not the total.",
      {});
  }
]), ["Watts are joules per second. Compare the rates first, then think about totals.", "Higher wattage means faster transfer, not automatically more or less total energy."]);

E("s9-u3-gen-power-vi", 3, ["SC9.7.6"], 2, "gen", function () {
  var pairs = [[120, 2], [120, 5], [120, 10], [240, 5], [240, 10], [120, 12.5], [240, 6.25], [120, 0.5]];
  var pr = pick(pairs); var V = pr[0], I = pr[1], P = V * I;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { if (cand[i] !== key && cand[i] > 0 && out.indexOf(cand[i]) < 0) out.push(cand[i]); } return out.map(function (d) { return d + " W"; }); }
  return mcq("A household device operates at " + V + " V and draws a current of " + I + " A. What is its electrical power?",
    P + " W", dis3(P, [Math.round(V / I), V + I, P / 2, P * 2]),
    "Power is voltage multiplied by current: P = V x I = " + V + " V x " + I + " A = " + P + " W. Dividing voltage by current would give a resistance, not a power, which is why that option is a distractor.",
    {});
}, ["Power combines the two electrical quantities. Multiply or divide?", "P = V x I: volts times amperes give watts."]);

E("s9-u3-cr-power-cost", 3, ["SC9.7.6"], 2, "var", varset([
  function () {
    return textq("A home has two heaters. Heater 1 runs on 240 V and draws 10 A. Heater 2 runs on 120 V and draws 5 A. Both run for the same number of hours. (a) Calculate each heater's power. (b) State which heater costs more to operate and explain why, naming the factors that decide the cost. (3 marks)",
      ["heater 1 power is 2400 W from P = V x I", "heater 2 power is 600 W from P = V x I", "heater 1 costs more because cost follows energy used, which follows power and time, and its power is four times as great for equal time"],
      "<b>Model answer:</b> (a) Heater 1: P = V x I = 240 V x 10 A = 2400 W. Heater 2: P = V x I = 120 V x 5 A = 600 W. (b) Heater 1 costs more to operate. The cost of electrical energy depends on the energy used, and energy used is power multiplied by time. Both heaters run for the same time, so the comparison is decided by power alone: at 2400 W, Heater 1 transfers energy four times as fast as Heater 2 at 600 W, so it uses four times the energy in the same hours and costs about four times as much. Its higher voltage and its higher current both contribute to that greater power.<br><br><b>Marking points:</b> 1 mark for both power calculations using P = V x I. 1 mark for the cost conclusion (Heater 1 costs more). 1 mark for the reasoning through energy = power x time with time held equal.",
      {});
  }
]), ["Calculate both powers first; the cost argument is built on them.", "With time equal, the larger power wins the larger bill."]);

E("s9-u3-gen-energy-kwh", 3, ["SC9.7.7"], 1, "gen", function () {
  var pairs = [[0.1, 10], [0.06, 50], [1.5, 4], [2.0, 3], [0.5, 8], [1.2, 5], [0.25, 12], [2.4, 2.5]];
  var pr = pick(pairs); var P = pr[0], t = pr[1], En = Math.round(P * t * 100) / 100;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { var cv = Math.round(cand[i] * 100) / 100; if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv); } return out.map(function (d) { return d + " kW-h"; }); }
  return mcq("An appliance rated at " + P + " kW runs for " + t + " h. How much electrical energy does it use?",
    En + " kW-h", dis3(En, [P + t, En * 2, Math.round(P / t * 100) / 100, En / 2]),
    "Energy consumption is power multiplied by time: E = P x t = " + P + " kW x " + t + " h = " + En + " kW-h (rounded to two decimal places where needed). The kilowatt-hour is the convenient household unit for this energy, the unit on the utility bill.",
    {});
}, ["Energy is power multiplied by time, with power in kilowatts and time in hours.", "E = P x t, and the answer unit is kW-h."]);

E("s9-u3-gen-cost", 3, ["SC9.7.7"], 2, "gen", function () {
  var pairs = [[12, 10], [20, 12], [45, 10], [8, 15], [60, 10], [25, 12], [150, 10], [30, 12]];
  var pr = pick(pairs); var En = pr[0], rate = pr[1], cost = Math.round(En * rate) / 100;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { var cv = Math.round(cand[i] * 100) / 100; if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv); } return out.map(function (d) { return "$" + d.toFixed(2); }); }
  return mcq("A household used " + En + " kW-h of electrical energy in a billing period. The utility charges " + rate + " cents for each kW-h. What is the cost of the energy used?",
    "$" + cost.toFixed(2), dis3(cost, [cost * 2, cost / 2, Math.round(En * rate) / 10, En]),
    "Cost is energy multiplied by the rate: " + En + " kW-h x " + rate + " cents per kW-h = " + (En * rate) + " cents = $" + cost.toFixed(2) + " (converted from cents to dollars and rounded to the nearest cent). The rate applies once for each kilowatt-hour used.",
    {});
}, ["Multiply the energy used by the price of one kilowatt-hour, then convert cents to dollars.", "Watch the units: the multiplication gives cents, the answer is asked in dollars."]);

E("s9-u3-energuide", 3, ["SC9.7.7"], 3, "var", varset([
  function () {
    var q = mcq("The data table shows the Energuide figures for two models of the same appliance: model 1 uses 420 kW-h in a year of typical use and model 2 uses 310 kW-h per year. Electricity costs 12 cents per kW-h. About how much money does model 2 save in a year?",
      "About $13.20 per year",
      ["About $1.32 per year", "About $50.40 per year", "About $37.20 per year"],
      "Find the difference in energy first: 420 kW-h - 310 kW-h = 110 kW-h saved per year. Then cost the saving: 110 kW-h x 12 cents per kW-h = 1320 cents = $13.20 (rounded to the nearest cent). Energuide labels exist so this comparison can be made before buying: the label's kilowatt-hours per year turn straight into dollars at the local rate.",
      {});
    q.figure = s9u3ApplianceTable();
    return q;
  }
]), ["Two steps: subtract the energies, then multiply the difference by the rate.", "110 kW-h saved; now price one kilowatt-hour at 12 cents."]);

E("s9-u3-gen-efficiency", 3, ["SC9.7.8"], 1, "gen", function () {
  var pairs = [[2, 10], [5, 20], [3, 12], [9, 30], [4, 25], [7, 35], [1.5, 10], [6, 24]];
  var pr = pick(pairs); var out = pr[0], inp = pr[1], eff = Math.round(out / inp * 100);
  function dis3(key, cand) { var out2 = []; for (var i = 0; i < cand.length && out2.length < 3; i++) { if (cand[i] !== key && cand[i] > 0 && cand[i] <= 100 && out2.indexOf(cand[i]) < 0) out2.push(cand[i]); } return out2.map(function (d) { return d + "%"; }); }
  return mcq("An electrical appliance takes in " + inp + " kW-h of electrical energy and delivers " + out + " kW-h of useful heat energy. What is its efficiency?",
    eff + "%", dis3(eff, [100 - eff, Math.round(inp / out * 10), eff * 2, Math.round(eff / 2)]),
    "Efficiency is useful output energy divided by input energy, as a percent: (" + out + " kW-h / " + inp + " kW-h) x 100% = " + eff + "% (rounded to the nearest percent). The rest of the input energy was converted to forms that were not useful for the appliance's job.",
    {});
}, ["Efficiency compares what you got out with what you put in, as a percent.", "Output over input, times 100. Output can never exceed input."]);

E("s9-u3-efficiency-meaning", 3, ["SC9.7.8"], 2, "var", varset([
  function () {
    return mcq("A heater is described as 100 percent efficient at converting electrical energy to heat in a room, while a lamp is described as 6 percent efficient at producing light. A student says the lamp figure must be wrong because 'no device wastes 94 percent of its energy.' Which response is correct?",
      "The lamp figure is reasonable: the other 94 percent of its input energy is converted to heat, which is wasted for a device whose job is making light, while the heater's job is exactly that heat",
      ["The student is right: an efficiency below 50 percent is impossible for any electrical device, because at least half of every input must always reach the useful form of energy in the end", "The lamp figure is wrong because the lamp's heat counts as useful output for a lamp, exactly as a heater's heat does, so the lamp is nearly fully efficient as well in its room", "The heater figure is wrong because no device of any kind can convert energy at 100 percent, and every device wastes at least a small share of its input as sound or vibration instead"],
      "Efficiency measures the share of input energy converted to the useful form for the device's purpose. An incandescent lamp turns most of its input into heat and only about 6 percent into light, so as a lamp it is inefficient, even though the energy is not destroyed, just converted to the wrong form. A room heater wants heat, so nearly all of its input counts as useful. The guide's own comparison makes the same point with incandescent and compact fluorescent lamps.",
      {});
  }
]), ["Useful depends on the job. What is useful output for a lamp, and what for a heater?", "The lamp's heat is real energy, but it is not the output the lamp is for."]);

E("s9-u3-efficiency-heat-loss", 3, ["SC9.7.8"], 2, "var", varset([
  function () {
    return mcq("A kettle takes in 0.30 kW-h of electrical energy to boil water, and 0.24 kW-h of that energy ends up as heat in the water. Which statement accounts for the full 0.30 kW-h?",
      "0.24 kW-h heated the water and the remaining 0.06 kW-h heated the kettle and the surrounding air and produced sound, so the kettle's efficiency for heating water is 80 percent",
      ["0.24 kW-h heated the water and the remaining 0.06 kW-h was destroyed in the boiling, leaving only the 0.24 kW-h in existence afterwards, so the efficiency is 80 percent", "0.24 kW-h heated the water and the remaining 0.06 kW-h stayed stored as electricity in the kettle, unused, until the kettle is switched on again at a later time", "The efficiency is 125 percent, because the input is divided by the output, 0.30 divided by 0.24, and that quotient is greater than one, as efficiencies are meant to be"],
      "Energy is converted, never destroyed. Efficiency = output / input x 100% = 0.24 / 0.30 x 100% = 80%. The other 0.06 kW-h did not vanish: it heated the kettle body and the air around it and made the sounds of boiling, all conversions to forms that were not the job at hand.",
      {});
  }
]), ["Account for every part of the input. Where can the missing share have gone?", "Converted, not destroyed: look for the other forms around the kettle."]);

E("s9-u3-cr-efficiency-compare", 3, ["SC9.7.8"], 3, "var", varset([
  function () {
    return textq("Over the same week, an incandescent lamp uses 7.0 kW-h of electrical energy to supply 0.4 kW-h of light energy, and a compact fluorescent lamp uses 2.0 kW-h to supply the same 0.4 kW-h of light. (a) Calculate each lamp's efficiency. (b) Explain what happens to the rest of each lamp's input energy. (3 marks)",
      ["incandescent efficiency about 6 percent from 0.4 divided by 7.0 times 100", "compact fluorescent efficiency 20 percent from 0.4 divided by 2.0 times 100", "the remaining input energy is converted mainly to heat, which is why the fluorescent lamp does the same lighting job with far less input"],
      "<b>Model answer:</b> (a) Incandescent: efficiency = (0.4 kW-h / 7.0 kW-h) x 100% = about 6% (rounded to the nearest percent). Compact fluorescent: efficiency = (0.4 kW-h / 2.0 kW-h) x 100% = 20%. (b) Neither lamp destroys energy. The input energy that does not become light is converted mainly to heat energy in and around the lamp. The incandescent lamp converts about 94 percent of its input to heat, which is wasted for a lighting device, so it needs 7.0 kW-h of input to do a job the fluorescent lamp does with 2.0 kW-h.<br><br><b>Marking points:</b> 1 mark for the incandescent efficiency (about 6 percent). 1 mark for the fluorescent efficiency (20 percent). 1 mark for accounting for the remaining energy as conversion to heat rather than loss or destruction.",
      {});
  }
]), ["Same useful output for both lamps. Divide it by each lamp's input in turn.", "Efficiency is output over input. The leftover energy changes form; it does not disappear."]);

E("s9-u3-generator-parts", 3, ["SC9.7.9"], 1, "var", varset([
  function () {
    return mcq("Which description of an electrical generator is correct?",
      "A coil of wire and magnets move in relation to each other, and that motion generates electrical energy",
      ["A coil of wire burns fuel directly to release electrical energy stored in the wire", "Magnets inside the generator store charge, which drains out through the coil as current", "The generator creates energy from nothing whenever the coil is connected to a circuit"],
      "A generator converts another form of energy into electrical energy. Its two key components are a coil of wire and magnets; when one moves in relation to the other, electrical energy is generated in the coil. Something must supply the motion, which is why generating stations need falling water, steam or wind to turn their generators. Energy is converted, never created from nothing.",
      {});
  }
]), ["Two components, and one thing that must happen between them.", "Coil plus magnets, moving relative to each other."]);

E("s9-u3-station-types", 3, ["SC9.7.9"], 1, "var", varset([
  function () {
    return mcq("Which matching of generating station type to its energy source is correct?",
      "Hydroelectric: falling water. Thermal: heat from burning fuel. Nuclear: heat from nuclear reactions",
      ["Hydroelectric: heat from burning fuel. Thermal: falling water. Nuclear: wind", "Hydroelectric: sunlight. Thermal: falling water. Nuclear: heat from burning fuel", "Hydroelectric: falling water. Thermal: sunlight stored in panels. Nuclear: falling water"],
      "All three station types end at the same place, a generator, but they get their motion differently. Hydroelectric stations use falling water (Churchill Falls in Labrador is the provincial example). Thermal stations burn fuel to make steam. Nuclear stations use heat from nuclear reactions to make steam. In Newfoundland and Labrador a significant share of electricity still comes from burning fossil fuels at Holyrood alongside the hydroelectric supply.",
      {});
  }
]), ["Each name points at its source: hydro means water, thermal means heat.", "Match hydro to water first, then separate the two heat sources."]);

E("s9-u3-transmission", 3, ["SC9.7.9"], 2, "var", varset([
  function () {
    var q = mcq("The diagram traces electrical energy from a generating station to a home. Electrical energy is transmitted over long distances at high voltage and low current, then stepped down before it enters homes at 120 V and 240 V. Which device makes the stepping up and stepping down possible?",
      "The transformer, which increases (steps up) or decreases (steps down) voltage",
      ["The generator, which adjusts its output voltage for each part of the journey", "The circuit breaker, which lowers voltage whenever current passes through it", "The electrochemical cell, which absorbs the extra voltage at the home"],
      "Transformers do the voltage changing in the transmission system: step-up transformers raise the voltage for the long journey from the generating station, and step-down transformers lower it for safe domestic use at 120 V and 240 V. The adaptor for an electronic device is a small transformer doing the same stepping down. Generators generate; breakers protect; neither changes voltage for transmission.",
      {});
    q.figure = s9u3EnergyFlowSVG();
    return q;
  }
]), ["One device, two directions: up for the journey, down for the home.", "Transformer: step up or step down."]);

E("s9-u3-cr-energy-path", 3, ["SC9.7.9"], 3, "var", varset([
  function () {
    return textq("Trace the energy conversions and transfers for electricity used by a porch light, starting at a hydroelectric generating station and ending at the light. Name each stage and the form of energy at that stage. (3 marks)",
      ["gravitational potential energy of stored water converts to kinetic energy of falling water, turning the generator", "the generator converts the motion to electrical energy, which is transmitted at high voltage and stepped down by transformers", "electrical energy reaches the home at domestic voltage and the lamp converts it to light energy (and heat)"],
      "<b>Model answer:</b> Water stored behind the dam holds gravitational potential energy. Released, it falls and gains kinetic energy, and its motion turns the turbine and the generator. In the generator, the moving coil and magnets convert that mechanical energy into electrical energy. The electrical energy is transmitted over utility lines at high voltage and low current, and transformers step the voltage down, first for distribution and finally to the 120 V supplied to the home. At the porch light, the electrical energy is converted into light energy, with some converted to heat energy as well. A wind example follows the same pattern: kinetic energy of wind, generator, utility lines, then the light.<br><br><b>Marking points:</b> 1 mark for the source energy and its conversion to motion at the station. 1 mark for the generator converting motion to electrical energy. 1 mark for transmission with step-down transformation and the final conversion to light at the lamp.",
      {});
  }
]), ["Follow one unit of energy the whole way: source, generator, lines, home, lamp.", "Name the energy form at each stage, not just the place."]);

E("s9-u3-static-tech", 3, ["SC9.8.1"], 1, "var", varset([
  function () {
    return mcq("Which technology works by putting static electricity to deliberate use?",
      "An electrostatic air cleaner, which charges airborne particles so they are attracted to collecting plates and removed from the air",
      ["A circuit breaker, which uses built-up static charge on its contacts to detect overloaded circuits in a home and trip", "A transformer, which uses static charge stored in its coils to step voltage up and down for transmission over distance", "A hydroelectric turbine, which uses static charge gathered from the falling water to turn its generator at the station"],
      "Knowledge of static electricity has been turned into working technologies: electrostatic air cleaners and precipitators charge dust and smoke particles so they collect on plates, photocopiers use static charge to place toner where the image belongs, and lightning rods give a static discharge a safe path. Breakers, transformers and turbines work on current electricity, not static charge.",
      {});
  }
]), ["The technology must depend on charge sitting on surfaces and attracting other things.", "Air cleaners, photocopiers and lightning rods are the guide's family."]);

E("s9-u3-lightning-rod", 3, ["SC9.8.1"], 1, "var", varset([
  function () {
    return mcq("What is the purpose of a lightning rod on a building?",
      "To give a lightning discharge a controlled, conducting path to the ground so the building is protected",
      ["To repel lightning away from the building by charging the whole roof with the opposite charge to its own", "To store lightning's energy in the building's wiring so the household can use it later for free", "To attract extra lightning to the neighbourhood so nearby buildings are hit instead of this one"],
      "A lightning rod does not repel lightning or store it. It provides a deliberate metal path from the top of the building to the ground, so when a discharge does occur, the charge travels down the conductor instead of through the building's structure, where it would cause fire and damage. It is applied knowledge of electric discharge.",
      {});
  }
]), ["The rod offers the discharge something: a safer route than the building itself.", "A controlled path to ground."]);

E("s9-u3-photocopier", 3, ["SC9.8.1"], 2, "var", varset([
  function () {
    return mcq("A photocopier makes copies using static electricity. Which part of the copying process depends on static charge?",
      "A charged drum attracts toner particles to the places that form the image, and the toner is then transferred to paper",
      ["Static charge heats the paper as it passes through, so the ink soaks into it evenly on every copy made", "Static charge powers the bright lamp that scans the original page at the start of the process each time", "Static charge holds the finished copies in a neat stack on the tray by magnetism between the sheets of paper"],
      "In a photocopier, the image is first formed as a pattern of static charge on a drum. Fine toner particles are attracted to the charged parts of that pattern, exactly the charged-attracts-other-material behaviour from the static electricity work, and the toner is then transferred and fixed to the paper. The scanning lamp and the stacking need no static charge.",
      {});
  }
]), ["Which step needs attraction between charged and uncharged material?", "Toner is placed by static attraction."]);

E("s9-u3-careers-match", 3, ["SC9.8.2"], 1, "var", varset([
  function () {
    return mcq("Which pairing of worker and electricity-related job is correct for a Newfoundland and Labrador community?",
      "A linesperson employed by the provincial utility, maintaining the distribution lines that carry electricity to homes",
      ["A photocopier technician, whose job is generating electricity at a hydroelectric station in the province for the grid", "An electrician, whose job is designing wind turbines for offshore sites only, and nothing on land at all", "A meter reader, whose job is manufacturing electrochemical cells in a factory for the utility company"],
      "Electricity careers in a community span production, delivery, installation and service: utility linespeople maintain the lines, electricians install and repair wiring in buildings, and photocopier technicians service one of the static electricity technologies. Each distractor hands a real worker the wrong job.",
      {});
  }
]), ["Match each worker to the work they actually do with electricity.", "Generation, delivery, installation and repair are different careers."]);

E("s9-u3-careers-range", 3, ["SC9.8.2"], 3, "var", varset([
  function () {
    return mcq("A student says the only electricity career is 'electrician.' Which response best corrects the claim using this strand's content?",
      "Electricity supports many careers: generation station operators, utility linespeople, electricians, electrical engineers and service technicians for devices such as photocopiers, among others",
      ["The student is right: every other electricity job, from the generating station to the photocopier, is simply a kind of electrician working under a different title in the community", "The only other electricity career besides electrician is the engineer who designs generating stations, and every other worker in the system is support staff for those two roles alone", "Careers in electricity ended completely once the provincial grid was built and connected, since a finished grid needs no workers to run, repair or extend it anywhere in the province"],
      "The strand follows electricity from the generating station to the device on the desk, and people work at every stage: producing it, transmitting it, installing it safely in buildings, designing the systems, and servicing the technologies that use it, down to the photocopier technician named in the guide. One job title cannot cover that range.",
      {});
  }
]), ["Follow the electricity from station to desk and count the workplaces on the way.", "Production, transmission, installation, design and service are all careers."]);

E("s9-u3-lights-uses", 3, ["SC9.8.3"], 1, "var", varset([
  function () {
    return mcq("Household lights are wired in parallel, while an older string of decorative lights goes dark entirely when one bulb fails. Which conclusion follows?",
      "The household lights use parallel connections so each light works independently; the decorative string uses a series connection, so one failure opens the whole string",
      ["Both use series connections throughout, and the household lights stay on when one fails only because their bulbs are stronger than the decorative bulbs in the string", "Both use parallel connections throughout, and the decorative string fails all at once only because its bulbs are older and weaker than the household bulbs", "The household lights use series connections along a single path, which is why each one can be switched on and off independently of all the others in the house"],
      "The failure test identifies the wiring. Independent operation, each light with its own path and full voltage, is parallel wiring, the household choice. A whole string dying with one bulb is the series signature: one path, opened by the failed bulb. The guide gives exactly this pair of examples.",
      {});
  }
]), ["Use the removal test from the Knowledge work: what does one failure do in each type?", "Independent means parallel; all-out means series."]);

E("s9-u3-series-use-case", 3, ["SC9.8.3"], 1, "var", varset([
  function () {
    return mcq("In which situation is a series connection of resistors the deliberate, useful choice?",
      "A string of small decorative bulbs designed so that each bulb takes only a share of the supply voltage, letting low-voltage bulbs run on a higher-voltage supply",
      ["Wiring the lights in the different rooms of a house along one shared path so that each light can fail without affecting any of the others in the house", "Connecting a home's outlets in one long chain so a device keeps working at full power when another device on the chain is unplugged or fails at any point", "Wiring a flashlight's spare bulb into the same single path so it lights automatically at full brightness when the main bulb fails on a trip outdoors"],
      "Series connections share the source voltage between the loads, and that sharing is sometimes the point: a series string lets many low-voltage bulbs divide a larger supply voltage between them. The other situations all need the opposite property, independent branches, which is parallel wiring.",
      {});
  }
]), ["Series has one useful signature here: the voltage is shared out. Who would want that?", "Sharing voltage suits a string of small bulbs on one supply."]);

E("s9-u3-parallel-use-case", 3, ["SC9.8.3"], 2, "var", varset([
  function () {
    return mcq("A school adds a second heater to a classroom circuit wired in parallel with the first. A student predicts the first heater will now get less voltage 'because it has to share.' Which evaluation is correct?",
      "The prediction is wrong: in parallel each heater keeps the full supply voltage; what increases is the total current drawn from the supply",
      ["The prediction is right: parallel loads share out the supply voltage between them just as series loads do in their circuits", "The prediction is wrong because the first heater's voltage doubles as soon as the second branch is added beside it in parallel", "The prediction is right about the voltage, and the total current drawn from the supply stays exactly the same as well as before"],
      "Parallel branches each connect directly across the source, so each keeps the full voltage regardless of the other branches. Adding a branch adds another current path: the branch currents add, so the main line current rises, which is why adding too many parallel loads can overload a circuit and trip its breaker. Sharing voltage is the series pattern.",
      {});
  }
]), ["In parallel, what stays the same per branch and what adds up overall?", "Full voltage per branch; currents add in the main line."]);

E("s9-u3-cells-flashlight", 3, ["SC9.8.4"], 1, "gen", function () {
  var cases = [
    { q: "Most flashlights stack their cells end to end, positive to negative, in a single column. Why is that series arrangement chosen?", k: "The cells' voltages add, so two 1.5 V cells give the bulb the 3.0 V it is designed for", w: ["The cells' voltages cancel, keeping the bulb safe from overvoltage", "Stacking cells in series makes the flashlight run longer without making it brighter", "Series cells give each bulb its own independent path, like household lights"] },
    { q: "A camping lantern is built with its two 1.5 V cells side by side in parallel instead of stacked. What does the bulb receive, and what is gained?", k: "The bulb receives 1.5 V, and the gain is a longer running time, because the cells share the load", w: ["The bulb receives 3.0 V, and the gain is a brighter light for the same time", "The bulb receives 3.0 V, and the lantern also runs longer than a series lantern", "The bulb receives 0.75 V, because the cells split their voltage between them"] },
    { q: "A device needs 4.5 V and runs on 1.5 V cells. How must the cells be connected, and how many are needed?", k: "Three cells in series, because series voltages add: 1.5 V + 1.5 V + 1.5 V = 4.5 V", w: ["Three cells in parallel, because parallel voltages add to 4.5 V", "Four cells in parallel, to round the voltage up past 4.5 V", "One cell only, because a cell's voltage rises to meet the device's need"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Cells in series add their voltages, which is why a flashlight stacks them: two 1.5 V cells give 3.0 V. Cells in parallel hold the voltage at one cell's value and instead lengthen the running time, the choice for remote devices such as a lighthouse supply. The arrangement is chosen by which quantity the device needs.",
    {});
}, ["End to end means voltages add; side by side means life lengthens.", "Series for more volts; parallel for more time."]);

E("s9-u3-cells-lighthouse", 3, ["SC9.8.4"], 2, "var", varset([
  function () {
    return mcq("A remote navigation light must keep working for months between service visits, but it needs only the voltage of a single cell. Which connection of cells should its designer choose, and why?",
      "Parallel: the voltage stays at one cell's voltage, but the supply lasts much longer because the cells share the load",
      ["Series: the voltage adds up, and a brighter light is always safer for navigation", "Parallel: the voltage adds up while also lasting longer, giving both advantages at once", "Series: the supply lasts longer because each cell is used one after the other automatically"],
      "The design brief asks for duration at a fixed voltage, which is the parallel pattern: cells side by side hold the effective voltage at one cell's value while sharing the work, so the battery life is lengthened. Series would raise the voltage, which the light does not need and might not tolerate. The guide's example is the same: a hard to access device, such as a lighthouse supply, favours parallel cells.",
      {});
  }
]), ["The brief wants same voltage, longer life. Which arrangement gives exactly that?", "Parallel keeps voltage and extends life."]);

E("s9-u3-fuse-breaker", 3, ["SC9.8.5"], 1, "var", varset([
  function () {
    return mcq("What job do fuses and circuit breakers do in a home's wiring?",
      "They open the circuit when the current grows too large, stopping the flow before wires overheat",
      ["They raise the voltage when too many devices are switched on", "They store spare current and release it when a device needs more", "They convert alternating current from the supply into direct current for devices"],
      "A fuse contains a strip that melts when the current exceeds its rating, and a breaker is a switch that trips open at its rated current, the meaning of the number such as 15 printed on it. Either way the circuit is opened before an overload can heat the wiring to a dangerous temperature. They are protective devices, not supply devices.",
      {});
  }
]), ["The number on a breaker is a current limit. What happens when the limit is passed?", "Too much current, circuit opens: that is the protection."]);

E("s9-u3-grounding-prong", 3, ["SC9.8.5"], 2, "var", varset([
  function () {
    return mcq("Many plugs have a third, round prong, and the appliance's metal case is connected to it. What protection does that grounding terminal provide?",
      "If a fault connects the case to the live wiring, the ground connection gives the current a low-resistance path to earth instead of a path through a person touching the case",
      ["The third prong supplies extra voltage from the outlet to the appliance so that it can run at its full rated power at all times without dropping under load", "The third prong stores the static charge that builds up on the appliance during use, holding it safely so it cannot build up to a shock for the user at the case", "The third prong balances the plug in the outlet so it cannot work loose or fall out while the appliance is running in the kitchen or workshop at home"],
      "Grounding is a safety design. A fault inside an appliance can make its metal case live; without a ground, the next path for that current could be the body of whoever touches it. The grounding terminal connects the case to earth through the wiring, giving fault current a deliberate, low-resistance route away and usually tripping the breaker. It is not about power, storage or plug balance.",
      {});
  }
]), ["Picture the fault: the case becomes live. Where should that current go instead of through you?", "A deliberate path to earth beats a path through a person."]);

E("s9-u3-cr-safety-design", 3, ["SC9.8.5"], 2, "var", varset([
  function () {
    return textq("A kitchen has one 15 A circuit. In one evening the family runs a 12 A kettle and a 10 A toaster on that circuit at the same time, and the breaker trips. Analyse what happened: calculate the total current, explain the breaker's response, and state what the family should do differently, and why the design protects the home. (3 marks)",
      ["the total current is 22 A from adding the two device currents on the shared circuit", "22 A exceeds the 15 A rating, so the breaker opens the circuit as designed", "the family should run the devices at different times or on different circuits, because sustained overload current overheats wiring and creates a fire risk"],
      "<b>Model answer:</b> Devices on the same household circuit draw their currents together through the same wiring, so the circuit carries 12 A + 10 A = 22 A. The breaker is rated at 15 A, so at 22 A it trips and opens the circuit, cutting off the current entirely. That is the design working as intended: current beyond the wiring's safe level heats the conductors, and sustained overheating can damage insulation and start a fire. The family's fix is to respect the rating: run the kettle and the toaster at different times, or plug one of them into an outlet on a different circuit, so the total stays at or below 15 A.<br><br><b>Marking points:</b> 1 mark for the total current calculation (22 A). 1 mark for explaining the trip as the rated protection operating (22 A exceeds 15 A, circuit opens). 1 mark for the corrective action tied to the overheating and fire risk.",
      {});
  }
]), ["Add the currents first; then compare the total with the number printed on the breaker.", "The breaker tripping is the protection succeeding, not failing."]);

E("s9-u3-gen-cells-voltage", 3, ["SC9.8.6"], 1, "gen", function () {
  var n = pick([2, 3, 4]);
  var mode = pick(["series", "parallel"]);
  var each = 1.5, eff = (mode === "series") ? n * each : each;
  var other = (mode === "series") ? each : n * each;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { if (cand[i] !== key && cand[i] > 0 && out.indexOf(cand[i]) < 0) out.push(cand[i]); } return out.map(function (d) { return d + " V"; }); }
  var qtext = (mode === "series")
    ? n + " identical 1.5 V cells are connected in series to power a device. What is the effective voltage of the combination?"
    : n + " identical 1.5 V cells are connected in parallel to power a device. What is the effective voltage of the combination?";
  var sol = (mode === "series")
    ? "Cells in series add their voltages: " + n + " x 1.5 V = " + eff + " V. The trade-off is that the combination's life is no longer than one cell's, because the same current drains every cell in the chain."
    : "Cells in parallel keep the effective voltage at one cell's value: " + eff + " V, however many cells are added. The trade-off runs the other way: the voltage does not rise, but the battery life is lengthened because the cells share the load.";
  return mcq(qtext, eff + " V", dis3(eff, [other, each * 2, n * each * 2, eff + 3, 0.75, eff * 3]), sol, {});
}, ["Ask what the connection does to voltage before counting cells.", "Series adds voltages; parallel holds the voltage and extends life."]);

E("s9-u3-cells-tradeoff", 3, ["SC9.8.6"], 2, "var", varset([
  function () {
    var q = mcq("The diagram sketches the two ways cells can be combined, without labels. Which statement gives the trade-off between series and parallel connections of cells correctly?",
      "Series raises the effective voltage but the battery life is no longer than a single cell's; parallel keeps the voltage at one cell's value but lengthens the battery life",
      ["Series raises the voltage and lengthens the life; parallel lowers the voltage below one cell's value, giving the worst of both arrangements to the device using it", "Series and parallel connections both raise the effective voltage of the pack; they differ only in how the cells are drawn on the diagram of the circuit", "Parallel raises the voltage but shortens the life; series keeps the voltage and lengthens the life; each connection does the opposite of the other in every respect"],
      "Each connection buys one thing and gives up the other. Series cells add their voltages, which is what a device needing more voltage requires, but every cell carries the full current, so the pack lasts no longer than one cell would. Parallel cells share the current, so the pack lasts longer, but the voltage stays at a single cell's 1.5 V. Neither arrangement gives both advantages at once.",
      {});
    q.figure = s9u3CellsSVG();
    return q;
  }
]), ["Each arrangement wins on one measure and not the other. Which wins on voltage, and which on life?", "Series: voltage up, life unchanged. Parallel: voltage unchanged, life up."]);

E("s9-u3-lighting-evaluate", 3, ["SC9.8.7"], 1, "var", varset([
  function () {
    return mcq("A homeowner replaces incandescent bulbs with compact fluorescent bulbs that give the same light. Judged on efficiency, which evaluation is correct?",
      "The change is an improvement: the fluorescent bulbs convert a larger share of their input energy to light (about 20 percent against about 6 percent), so the same lighting job uses far less electrical energy",
      ["The change makes no difference to the home's energy use: all bulbs, whatever their design, convert exactly the same share of their input energy to light and the rest to heat in the room", "The change is a step backwards for the home: incandescent bulbs are the more efficient lighting technology, and the fluorescent bulbs waste more of their input as heat every hour", "Efficiency cannot be compared for lighting at all, because light is not a form of energy and so no share of input can ever be assigned to it in any comparison of bulbs like this one"],
      "The guide's worked comparison gives the incandescent lamp about 6 percent efficiency for light and the compact fluorescent about 20 percent, with the rest converted mainly to heat in both cases. Same useful output, much smaller input: that is what a better efficiency means, and it is why the replacement lowers both energy use and operating cost.",
      {});
  }
]), ["Compare the useful share, not the total energy. Which bulb wastes less as heat?", "About 6 percent against about 20 percent for the same light."]);

E("s9-u3-efficiency-design", 3, ["SC9.8.7"], 2, "var", varset([
  function () {
    return mcq("Two space heaters both draw 1500 W. Heater A warms a room's air noticeably faster than heater B, while heater B's casing becomes much hotter to touch. Which design judgement is best supported?",
      "Heater A is the better design for its purpose: more of its input energy is delivered as heat to the room's air, while more of heater B's input is spent heating its own casing",
      ["Heater B is the better design for the room, because a casing too hot to touch proves it produces more heat overall than heater A can manage in the same time", "Both heaters are equally efficient in every respect that matters, because both draw exactly 1500 W from the supply for every second they run in the room being heated", "Neither judgement is possible from these observations, because efficiency applies only to lighting devices and never to heaters or other appliances in a home"],
      "Equal input power does not mean equal useful output. The heater's job is warming the room, so energy spent heating the casing is energy diverted from the job. Heater A delivers more of the same 1500 W input to the room air, which is the efficiency judgement this indicator asks for: designs are evaluated by how much of the input reaches the intended use.",
      {});
  }
]), ["The job defines the useful output. For a heater, where should the heat end up?", "Same watts in; judge by how much reaches the room."]);

E("s9-u3-cr-efficiency-evaluate", 3, ["SC9.8.7"], 3, "var", varset([
  function () {
    return textq("A school can buy lamp type X (uses 5.0 kW-h per week to supply 0.5 kW-h of light) or lamp type Y (uses 2.5 kW-h per week to supply the same 0.5 kW-h of light). Evaluate the two designs in terms of efficiency: calculate each efficiency, state which lamp the school should choose for its lighting purpose, and give one reason beyond efficiency that a buyer might still consider. (3 marks)",
      ["type X efficiency is 10 percent and type Y efficiency is 20 percent, from output divided by input times 100", "type Y is the better lighting design because it does the same job on half the input energy", "a further consideration such as purchase cost, bulb life, or disposal and materials concerns"],
      "<b>Model answer:</b> Type X: efficiency = (0.5 kW-h / 5.0 kW-h) x 100% = 10%. Type Y: efficiency = (0.5 kW-h / 2.5 kW-h) x 100% = 20%. For the lighting purpose, the school should choose type Y: it supplies exactly the same light while using half the electrical energy, so it also halves the running cost and the environmental load of generating that energy. Efficiency is not the only criterion, though: a buyer might still weigh the purchase price of the lamps, how long each type lasts before replacement, or the materials in them and their disposal.<br><br><b>Marking points:</b> 1 mark for both efficiency calculations (10 percent and 20 percent). 1 mark for the choice of type Y justified by equal output on half the input. 1 mark for a sensible additional criterion (cost, lifetime, materials or disposal).",
      {});
  }
]), ["Calculate first, judge second, then look past the single number.", "Efficiency decides the recommendation; a good evaluation names its limits too."]);

E("s9-u3-past-current", 3, ["SC9.8.8"], 1, "var", varset([
  function () {
    return mcq("Which comparison of past and current technology for the same need is accurate?",
      "Early electric irons were heavy, heated unevenly and had no temperature control; modern irons heat evenly, hold a set temperature and shut off automatically, doing the same job with better control and safety",
      ["Early electric toasters used more electricity than modern ones because they ran on static charge stored in their elements; modern toasters run on electric current from the outlet in the wall", "Past technologies used no electricity at all in the home; every heated appliance in use today, from the iron to the toaster, is a current invention of this generation of designers", "Modern appliances always use more energy than the models they replaced, in every case, because they have more features and larger motors than the older models ever had in the past"],
      "The comparison this indicator asks for holds the need constant and compares how the technology met it. Irons and toasters are the guide's examples: the same heating job done across generations, with modern designs adding even heating, thermostatic control and automatic shut-off. Efficiency comparisons belong with those design changes, and modern models are often, not always, the more efficient ones, which is what Energuide labels help buyers check.",
      {});
  }
]), ["Hold the need fixed: same job, two generations. What changed in how well it is done?", "Compare control, safety and efficiency for the same task."]);

E("s9-u3-energuide-purpose", 3, ["SC9.8.8"], 2, "var", varset([
  function () {
    return mcq("What is the purpose of the Energuide label on a new appliance?",
      "To tell the buyer how much energy the appliance is expected to use in a year, so models meeting the same need can be compared before purchase",
      ["To guarantee that the appliance will never need any repair during the whole of its working life in the home of its buyer", "To state the voltage of the home, and the country, in which the appliance was manufactured for sale to buyers in that market", "To certify that the appliance is the cheapest model in its whole category at every store in the province that sells it to the public"],
      "An Energuide label reports the appliance's estimated yearly energy consumption in kilowatt-hours, measured under standard conditions. That lets a buyer compare two models that do the same job and fold the running cost into the decision, instead of judging by purchase price alone. It guarantees nothing about repairs or price; it informs the energy comparison.",
      {});
  }
]), ["The label carries one key number in kW-h per year. What decision does it feed?", "Yearly energy use, for comparing models that do the same job."]);

E("s9-u3-reduce-action", 3, ["SC9.8.9"], 1, "var", varset([
  function () {
    return mcq("Which proposed action would genuinely reduce a home's electrical energy consumption?",
      "Air drying clothes instead of running the electric dryer for every load",
      ["Running the electric dryer for longer on a lower heat so it feels gentler", "Leaving lights on all day so they are never switched on and off", "Heating unused rooms to the same temperature as the living areas"],
      "Each distractor increases or holds consumption; only air drying removes a large appliance's energy use entirely for that load. The guide's own list of actions has the same shape: improve insulation for electrically heated homes, turn off lights when not required, use energy-efficient bulbs, and air dry clothes when possible. A real reduction removes or shortens an actual use of energy.",
      {});
  }
]), ["Ask of each action: does any appliance run less, or not at all?", "Only one option takes an appliance out of use."]);

E("s9-u3-bill-compare", 3, ["SC9.8.9"], 2, "var", varset([
  function () {
    return mcq("Two similar homes on the same street have very different winter electricity bills. Home P heats with electric baseboard heaters and leaves its windows unsealed; home Q heats with the same heaters but has sealed windows and added insulation. Which explanation of the difference is best supported?",
      "Home Q loses less heat to the outside, so its heaters run less to hold the same indoor temperature, and it uses fewer kilowatt-hours",
      ["Home P's heaters must be the more efficient ones, because they use more energy each month to heat the home through the winter", "The difference must be a billing error, because identical heaters in identical homes always use identical energy every month of winter", "Home Q's bill is lower because its added insulation lowers the voltage supplied to its baseboard heaters by the utility each day"],
      "The heaters convert electrical energy to heat at the same rate in both homes; what differs is how fast the home loses that heat. Sealing and insulation slow the loss, so home Q's heaters cycle on for less time to maintain the same temperature, and energy, being power multiplied by time, falls. Improving the insulating factor of electrically heated homes is one of the guide's named reduction strategies.",
      {});
  }
]), ["Same heaters, same power. Which factor of energy use does insulation change?", "Less heat lost means fewer heater hours, and hours are half the energy calculation."]);

E("s9-u3-cr-conservation-plan", 3, ["SC9.8.9"], 2, "var", varset([
  function () {
    return textq("A family's winter electricity use is high. Their home is heated electrically, a dryer runs daily, and lights are often left on in empty rooms. Propose a course of action with three specific changes to reduce their electrical energy consumption, and for each change explain how it reduces the energy used. (3 marks)",
      ["a change aimed at heating loss, such as sealing drafts or adding insulation, reducing heater running time", "a change removing or shortening a large appliance's use, such as air drying clothes when possible", "a change cutting wasted lighting time or switching to efficient bulbs, each tied to energy equals power times time"],
      "<b>Model answer:</b> Any three well-explained changes earn the marks; for example: (1) Seal drafts around windows and doors and add insulation where practical. The electrically heated home loses heat more slowly, so the baseboard heaters run for fewer hours to hold the same temperature, and since energy is power multiplied by time, the kilowatt-hours fall. (2) Air dry clothes on a rack when possible instead of running the dryer daily. The dryer is a large heating appliance; each load dried without it removes that energy use entirely. (3) Turn off lights in empty rooms and replace the most-used bulbs with energy-efficient ones. Switching off cuts the time factor to zero for those bulbs, and efficient bulbs deliver the same light at a lower power for every hour they do run.<br><br><b>Marking points:</b> 1 mark for each specific change with its mechanism for reducing energy used (heating time, appliance use removed, lighting time or power), to a maximum of 3 marks.",
      {});
  }
]), ["Give each change its mechanism: which factor, power or time, does it cut, and how?", "Three changes, three explanations. Vague advice without a mechanism earns nothing."]);

E("s9-u3-approaches", 3, ["SC9.8.10"], 3, "var", varset([
  function () {
    return mcq("A town must decide how to cut its electricity use. Group 1 surveys households and graphs their energy use. Group 2 builds a model home display showing insulation options. Group 3 interviews the utility about peak demand times. What does this situation illustrate?",
      "Different approaches can be taken to answer questions, solve problems and make decisions about the same issue",
      ["Only one of the three groups is doing science, because only one approach to a problem can ever be the correct one", "The three groups are wasting their effort, because a sound decision needs a single investigation carried out one way only", "The survey group must finish all of its work before the other approaches are allowed to start on theirs at all"],
      "The Core STSE on electricity conservation is built on this point: the same problem can be approached by gathering usage data, by demonstrating and testing design options, and by consulting the people who run the system. The approaches produce different kinds of evidence, and a sound decision can draw on all of them. There is no rule that one approach must be the only correct one.",
      {});
  }
]), ["Three groups, one problem, three different kinds of evidence. Is that a flaw or a feature?", "Different approaches are expected, and they can complement each other."]);

E("s9-u3-approach-fit", 3, ["SC9.8.10"], 2, "var", varset([
  function () {
    return mcq("A student team asks: 'Which of three insulation materials keeps a model house warmest for the longest time?' Which approach fits the question, and why do the other approaches fit less well?",
      "A controlled test: build identical model houses differing only in insulation material, heat them equally, and compare how their temperatures fall",
      ["A survey of homeowners about which material they prefer for their own houses, because opinions gathered widely settle performance questions like this one", "An interview with a utility spokesperson about the materials, because an authority's word settles performance questions without any testing", "A poster of the three materials pinned up in the classroom, because displaying them side by side compares their performance for the class"],
      "The question asks for a measured comparison of performance, so the approach must produce measurements under controlled conditions: same houses, same heating, only the material changed, temperatures compared over time. Surveys gather opinions and interviews gather testimony; neither measures how the materials perform. Matching the approach to the kind of question is the skill this indicator names.",
      {});
  }
]), ["The question demands a measurement. Which approach actually measures anything?", "Performance questions need controlled tests, not opinions."]);

E("s9-u3-criteria-analysis", 3, ["SC9.8.11"], 1, "var", varset([
  function () {
    return mcq("A class analyses a proposal to replace a school's lighting. Which set of criteria fits an analysis of the technology's design and function on the basis of cost and impact?",
      "Purchase and running cost, effect on the school's daily routine during installation, and the change in the school's energy use for the surrounding community's generating load",
      ["The colour of the new light fixtures, the installer's favourite brand of fixture, and the age and condition of the old fixtures being replaced in the school", "Cost alone, in dollars, because a proper technology analysis considers only money and nothing about the people who use the building each day or the community", "The number of letters in the technology's name, the country it was manufactured in, and the year its maker was founded as a company in business long ago"],
      "Analysing a technology against identified criteria means judging its design and function by named measures: what it costs to buy and to run, how it affects daily life for the people using the building, and its wider impact, such as the generating load it removes from the community's supply. The guide names cost and impact on daily life and the community as the example criteria. Preferences and trivia are not criteria.",
      {});
  }
]), ["Criteria are the yardsticks named before judging: cost, daily life impact, community impact.", "A criterion must be something the technology can actually be measured against."]);

E("s9-u3-criteria-apply", 3, ["SC9.8.11"], 3, "var", varset([
  function () {
    return mcq("Judged against the criterion of running cost alone, a heat pump costs a homeowner less per winter than baseboard heaters. Judged against the criterion of purchase and installation cost, the baseboard heaters are cheaper. What does this show about analysing a technology?",
      "A technology can score differently against different criteria, so the criteria must be named and weighed before a conclusion is drawn",
      ["One of the two judgements must be an error in the analysis, because a technology is simply good or bad overall in every respect", "Running cost is the only legitimate criterion in any analysis, so the heat pump wins the comparison automatically every time", "Criteria should be chosen after the conclusion is reached, to support whichever technology the analyst already preferred from the start"],
      "Criterion-based analysis separates the judgements on purpose. The heat pump genuinely wins on running cost and genuinely loses on upfront cost; neither judgement cancels the other. A sound analysis states its criteria first, reports the technology's standing on each, and only then weighs them into a recommendation. Choosing criteria afterwards to fit a preferred answer reverses the process.",
      {});
  }
]), ["Can both judgements be true at once? What does that require of the conclusion?", "Different criteria, different winners: name and weigh them openly."]);

E("s9-u3-cr-technology-criteria", 3, ["SC9.8.11"], 2, "var", varset([
  function () {
    return textq("Analyse the design of a household circuit breaker panel as a technology, using two criteria: safety and impact on daily life. For each criterion, describe how the technology functions and judge how well it meets the criterion. (3 marks)",
      ["safety: the breakers open circuits automatically when current exceeds the rating, preventing overheated wiring and fire risk", "daily life impact: a trip cuts power only to the affected circuit and resetting is quick, though a trip is an interruption and overloaded circuits limit appliance use", "each criterion judged from how the technology actually functions, not just named"],
      "<b>Model answer:</b> Safety: each breaker monitors the current on its circuit and opens the circuit automatically when the current passes its rating, such as 15 A. That function directly prevents the main electrical hazard in a home, wiring overheated by overload current, so on the safety criterion the design performs strongly: it acts on its own, in time, and fails safe by cutting power. Impact on daily life: the panel divides the home into separate circuits, so a trip darkens one circuit rather than the whole house, and resetting a breaker is a quick lever flip, far easier than replacing a fuse. The cost to daily life is real but small: a trip interrupts whatever was running, and the rating limits how many large appliances one circuit can carry at once, which households must plan around. Overall the design trades a minor inconvenience for a major safety function.<br><br><b>Marking points:</b> 1 mark for the safety analysis tied to the breaker's actual function. 1 mark for the daily life analysis (localized trips, easy reset, the interruption and capacity limits). 1 mark for judgements that follow from the stated criteria.",
      {});
  }
]), ["Name the criterion, describe the function that bears on it, then judge. Twice.", "A criterion without a judgement is a heading, not an analysis."]);

E("s9-u3-decision-balance", 3, ["SC9.8.12"], 1, "var", varset([
  function () {
    return mcq("A community is choosing between expanding a hydroelectric site and building a new thermal plant. Which approach counts as making an informed decision in this strand's sense?",
      "Weighing the environmental and social advantages and disadvantages of both options against evidence before choosing",
      ["Choosing whichever option the loudest group at the public meeting supports most strongly that evening in town", "Choosing the option with the lower construction cost and considering nothing else about either option at all", "Refusing to decide the question until one of the options has no disadvantages of any kind at all remaining"],
      "An informed decision in the STSE sense weighs advantages and disadvantages on more than one side of the ledger: environmental effects and social effects, not cost alone and not volume of support. Every real option carries some disadvantages, so waiting for a disadvantage-free option is a refusal to decide, not a standard of care.",
      {});
  }
]), ["Informed means evidence weighed on several sides: environmental and social, for and against.", "One criterion is not a weighing. Look for the balance."]);

E("s9-u3-decision-evidence", 3, ["SC9.8.12"], 2, "var", varset([
  function () {
    return mcq("A student supports wind generation for her town and writes only about its advantages. Her teacher asks her to strengthen the work before it can count as an informed decision. What is missing?",
      "The disadvantages of wind generation and the advantages of the alternatives, so the choice is weighed rather than promoted",
      ["A larger title on the first page and more pictures of turbines turning in the wind at sunset, across the report", "A firm statement that wind generation has no disadvantages worth mentioning in the work at any point or anywhere", "The names and addresses of the companies that sell wind turbines to towns like hers in the province and beyond"],
      "Promoting one side is advocacy, not decision making. An informed decision sets the chosen option's disadvantages honestly beside its advantages, and does the same for the realistic alternatives, because the decision is between options, not between an option and nothing. Presentation and supplier lists add no weighing.",
      {});
  }
]), ["What would the other side of the ledger contain?", "A decision needs both columns, for the choice and for the alternatives."]);

E("s9-u3-cr-energy-decision", 3, ["SC9.8.12"], 2, "var", varset([
  function () {
    return textq("A coastal town in the province must add generating capacity. The two realistic options are a wind farm on a nearby headland and an expansion of an existing oil-fired thermal plant. Make an informed decision: state your recommendation, give one environmental advantage and one environmental or social disadvantage of your chosen option, give one advantage of the option you did not choose, and name one piece of evidence you would want before finalizing the decision. (4 marks)",
      ["a clear recommendation stated", "an environmental advantage and a disadvantage of the chosen option, both accurate", "an advantage of the rejected option acknowledged", "a specific further evidence need named, such as wind measurements at the site, emissions data, or cost per kilowatt-hour over the plant's life"],
      "<b>Model answer:</b> Recommendation: build the wind farm. Environmental advantage: wind generation produces electricity with no fuel burned, so it adds no greenhouse gas emissions during operation and does not add to the fossil fuel demand the conservation STSE warns about. Disadvantage of the chosen option: the headland site is visible and audible to nearby homes, turbines affect birds and the coastal landscape, and the wind does not blow on demand, so the town still needs backup capacity for calm periods. Advantage of the rejected option: the thermal expansion uses an existing site and proven equipment and can generate at full output whenever it is needed, whatever the weather. Evidence still wanted: a year of measured wind speeds at the headland to confirm the site can actually deliver the expected energy, together with a lifetime cost per kilowatt-hour for both options. (A recommendation of the thermal expansion earns the marks equally if its advantages, disadvantages, the wind option's advantage and the evidence need are handled with the same honesty.)<br><br><b>Marking points:</b> 1 mark for a clear recommendation. 1 mark for an accurate environmental advantage of the chosen option. 1 mark for an honest disadvantage of the chosen option together with an advantage of the rejected option. 1 mark for a specific, relevant evidence need.",
      {});
  }
]), ["Decide, then argue against yourself honestly: your option's weakness and the other option's strength.", "The fourth mark is for the evidence you still want. Name something measurable."]);

E("s9-u3-alternative-sources", 3, ["SC9.8.13"], 1, "var", varset([
  function () {
    return mcq("Which set lists alternative sources of electrical energy in the guide's sense?",
      "Wind generators, solar energy and fuel cells",
      ["Hydroelectric dams, thermal plants and nuclear stations", "Coal, oil and natural gas burned in thermal plants", "Batteries, transformers and transmission lines"],
      "Alternative sources are the generation options outside the established large-scale set: wind, solar and fuel cells are the guide's three examples. Hydroelectric, thermal and nuclear stations are the established generating types from the Knowledge work. Fuels are energy sources for thermal plants, and batteries, transformers and lines store or move electricity rather than generating it as a source.",
      {});
  }
]), ["Alternative means outside the established station types. Which set is all outsiders?", "Wind, solar, fuel cells."]);

E("s9-u3-source-region", 3, ["SC9.8.13"], 2, "var", varset([
  function () {
    return mcq("A windy coastal community with modest sunlight considers solar panels and a wind generator for its community hall. Which reasoning is sound?",
      "The wind generator fits the region's reliable resource; the availability of the energy resource in a region usually decides which sources make sense there",
      ["Solar panels are always the better choice in every region, because the sun shines everywhere on Earth with exactly equal strength all year", "Neither device can work for the hall, because alternative sources cannot generate real electricity of the kind a building can use each day", "The community should choose by which device is larger in size, since the size of a device decides its output everywhere it is installed in the world"],
      "Alternative sources are not interchangeable: each depends on a local resource. A windy coast offers the wind generator a strong, frequent input, while modest sunlight limits what solar panels can collect there. The guide's generalization is that the availability of energy resources in a region usually dictates the types of energy used in that region.",
      {});
  }
]), ["Match the device to the resource the place actually has in quantity.", "Local availability decides: wind where the wind is."]);

E("s9-u3-constraints", 3, ["SC9.8.14"], 1, "var", varset([
  function () {
    return mcq("Which set names factors that constrain the development of alternative sources of electrical energy?",
      "Cost, availability of materials, and the properties of the materials available",
      ["The colour of the equipment, the season it is installed in, and the installer's schedule", "Public opinion only, because technical factors never limit a proven source", "Distance from the equator only, because all other factors can be engineered away"],
      "The guide names the constraint set directly: developing an alternative source is limited by what it costs, by whether the materials it needs can be obtained, and by whether those materials have the properties the design requires. A source can be scientifically sound and still be held back by any of the three, which is why promising sources develop unevenly from place to place.",
      {});
  }
]), ["Three constraints, all practical: money, materials, and what the materials can do.", "Cost, availability of materials, properties of materials."]);

E("s9-u3-constraint-case", 3, ["SC9.8.14"], 3, "var", varset([
  function () {
    return mcq("A solar project in a northern community is delayed: the panel glass that survives the local winters is expensive, and the supplier can deliver only a few panels each season. Which constraints from the guide are at work?",
      "Cost and availability of materials, with the glass's required properties driving both",
      ["No constraints are at work, because sunlight itself is free", "Only public opinion, because the technology is already proven", "The constraint is the sun's properties, which the community cannot change"],
      "Free sunlight does not make a free power plant. The project is constrained exactly as the guide describes: the material must have a property (surviving northern winters), suitable glass with that property costs more, and its limited supply restricts how fast the project can grow. Cost, availability of materials and properties of materials are one connected constraint in this case.",
      {});
  }
]), ["Free fuel, expensive plant. Which two named constraints are visible in the story?", "The glass's properties drive its cost and its scarcity."]);

E("s9-u3-constraint-evaluate", 3, ["SC9.8.14"], 3, "var", varset([
  function () {
    return mcq("A fuel cell supplier argues: 'Our cells are proven and clean, so every community should adopt them immediately; cost is no objection because the technology works.' Which evaluation best applies the guide's account of how alternative sources develop?",
      "The argument ignores the guide's constraints: development is limited by cost, by availability of materials and by materials' properties, so a working technology can still spread slowly and unevenly",
      ["The supplier is right in full: once a technology has been shown to work, no factor of any kind can legitimately slow its adoption by any community anywhere in the province or beyond it", "The supplier is wrong only on one point: fuel cells are not a real alternative source of electrical energy at all, and so the whole argument fails on that ground alone in the guide", "The argument fails only because public support for fuel cells, the sole constraint on any new source, has not yet been measured in the communities named by the supplier or anyone else"],
      "A technology working in a demonstration settles the science, not the development. The guide's account is that alternative sources develop under constraint: what they cost, whether the materials can be had, and whether the materials perform as the design needs. Fuel cells are one of the guide's own alternative sources, so the source is not the problem; the claim that no constraint applies is.",
      {});
  }
]), ["The guide gives a three-part test for any 'adopt it now' claim. Apply all three parts.", "Working is necessary. It is not sufficient."]);

E("s9-u3-symbols", 3, ["SC9.9.1"], 1, "var", varset([
  function () {
    return mcq("In a circuit diagram, a student draws a long thin rectangle for one component, a circle containing the letter A for another, and a circle containing the letter V for a third. Which matching is correct?",
      "Rectangle: resistor. Circle with A: ammeter. Circle with V: voltmeter",
      ["Rectangle: cell. Circle with A: voltmeter. Circle with V: ammeter", "Rectangle: switch. Circle with A: bulb. Circle with V: battery", "Rectangle: resistor. Circle with A: voltmeter. Circle with V: ammeter"],
      "Circuit diagrams use a shared symbol language so any reader can rebuild the circuit. The resistor is drawn as a rectangle (or zigzag in some conventions), meters are circles lettered for what they measure: A for the ammeter, which measures current, and V for the voltmeter, which measures potential difference. A cell and a battery are drawn differently again: a battery is a collection of cells, a distinction the diagram language keeps.",
      {});
  }
]), ["The meter circles are lettered by their quantity. Which letter measures current?", "A measures amperes of current; V measures volts."]);

E("s9-u3-resistance-factors", 3, ["SC9.9.1"], 2, "var", varset([
  function () {
    return mcq("Four wires are tested. Wire 1 is long and thin, wire 2 is short and thin, wire 3 is short and thick, and all are the same material at the same temperature. Which ordering of resistance, greatest to least, is correct?",
      "Wire 1, then wire 2, then wire 3: length adds resistance, and a thicker wire offers less resistance",
      ["Wire 3, then wire 2, then wire 1: thicker wires always resist the flow of charge more than thin ones", "Wire 2, then wire 1, then wire 3: shorter wires always resist more than longer ones of the same thickness", "All three wires are equal in resistance, because resistance depends only on the material the wire is made of"],
      "Resistance in a wire depends on four factors: length, diameter, type of material and temperature. With material and temperature held the same here, length and thickness decide: a longer wire gives the charge more material to push through (more resistance), and a thicker wire gives it more room (less resistance). So the long thin wire resists most and the short thick wire least. The ohm is the unit of resistance.",
      {});
  }
]), ["Two factors are changing: length and thickness. Settle each one's direction separately.", "Longer means more resistance; thicker means less."]);

E("s9-u3-gen-ohm-resistance", 3, ["SC9.9.2"], 2, "gen", function () {
  var pairs = [[6, 2], [12, 3], [9, 1.5], [4.5, 0.5], [24, 4], [10, 2.5], [7.5, 1.5], [18, 6]];
  var pr = pick(pairs); var V = pr[0], I = pr[1], R = Math.round(V / I * 100) / 100;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { var cv = Math.round(cand[i] * 100) / 100; if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv); } return out.map(function (d) { return d + " \u03a9"; }); }
  return mcq("Before an Ohm's law investigation, a student predicts the resistance of a single resistor from a trial run: the voltage across it was " + V + " V and the current through it was " + I + " A. What resistance does Ohm's law give?",
    R + " \u03a9", dis3(R, [Math.round(V * I * 100) / 100, Math.round(I / V * 100) / 100, R * 2, R / 2]),
    "Ohm's law rearranged for resistance: R = V / I = " + V + " V / " + I + " A = " + R + " \u03a9 (rounded to two decimal places where needed). The investigation involves this single resistor only, which is the scope the guide sets for Ohm's law work. Multiplying V by I would give a power in watts, not a resistance.",
    {});
}, ["Resistance is the ratio in Ohm's law. Which way does the division go?", "R = V / I: volts divided by amperes give ohms."]);

E("s9-u3-cr-hypothesis", 3, ["SC9.9.2"], 2, "var", varset([
  function () {
    return textq("A student observes that adding a second identical bulb in series makes both bulbs dimmer, and that the ammeter reading falls. State a prediction and a hypothesis for a follow-up test in which the student doubles the supply voltage on the original single-bulb circuit, and explain how the test would check the hypothesis. (3 marks)",
      ["a prediction that the current will increase (about double) when the voltage doubles, with resistance unchanged", "a hypothesis grounded in Ohm's law: current is directly related to voltage for a fixed resistance", "the test described: measure current at the original and doubled voltages with the same bulb and compare, keeping the resistor the same"],
      "<b>Model answer:</b> Prediction: with the same single bulb in the circuit, doubling the supply voltage will increase the current, to about twice its original value. Hypothesis: for a fixed resistance, current is directly proportional to voltage, as Ohm's law states (I = V / R); if R stays the same, doubling V must double I. Test: build the single-bulb circuit with an ammeter in series and a voltmeter across the bulb. Record the current at the original voltage, then connect the doubled supply and record the current again, changing nothing else. If the second current is about double the first, the hypothesis is supported; a clearly different pattern would send the student back to check the resistance and the readings. The observation that started this, dimmer bulbs when series resistance rose, is the same law seen from the resistance side.<br><br><b>Marking points:</b> 1 mark for a clear prediction about the current when voltage doubles. 1 mark for the hypothesis tied to Ohm's law with resistance fixed. 1 mark for a workable test that changes only the voltage and compares measured currents.",
      {});
  }
]), ["A prediction says what will happen; a hypothesis says why, in law form. Keep them separate.", "One variable changes (voltage), one is measured (current), one is held (resistance)."]);

E("s9-u3-gen-ohm-current", 3, ["SC9.9.3"], 2, "gen", function () {
  var pairs = [[12, 4], [6, 3], [9, 3], [24, 6], [10, 5], [15, 5], [8, 4], [20, 4]];
  var pr = pick(pairs); var V = pr[0], R = pr[1], I = Math.round(V / R * 100) / 100;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { var cv = Math.round(cand[i] * 100) / 100; if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv); } return out.map(function (d) { return d + " A"; }); }
  return mcq("Working with a single resistor, a student measures a voltage drop of " + V + " V across a resistance of " + R + " \u03a9. What current flows through the resistor?",
    I + " A", dis3(I, [V * R, Math.round(R / V * 100) / 100, I * 2, I / 2]),
    "Ohm's law: I = V / R = " + V + " V / " + R + " \u03a9 = " + I + " A (rounded to two decimal places where needed). Voltage and current are directly related for a fixed resistance: raise the voltage and the current rises in proportion. This is a single-resistance calculation, the scope the guide sets.",
    {});
}, ["Cover the I in the Ohm's law triangle: what is left is V over R.", "Current equals voltage divided by resistance."]);

E("s9-u3-gen-ohm-voltage", 3, ["SC9.9.3"], 3, "gen", function () {
  var pairs = [[0.5, 12], [2, 6], [1.5, 8], [0.25, 20], [3, 4], [0.75, 16], [2.5, 10], [1.2, 15]];
  var pr = pick(pairs); var I = pr[0], R = pr[1], V = Math.round(I * R * 100) / 100;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { var cv = Math.round(cand[i] * 100) / 100; if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv); } return out.map(function (d) { return d + " V"; }); }
  return mcq("A new question arises from a lab result: a current of " + I + " A flows through a single resistor of " + R + " \u03a9. What voltage drop must there be across the resistor?",
    V + " V", dis3(V, [Math.round(I / R * 100) / 100, Math.round(R / I * 100) / 100, V * 2, V / 2]),
    "Ohm's law rearranged for voltage: V = I x R = " + I + " A x " + R + " \u03a9 = " + V + " V (rounded to two decimal places where needed). Checking by division returns the starting current: " + V + " V / " + R + " \u03a9 = " + I + " A. Single resistor, as the guide requires for Ohm's law assessments.",
    {});
}, ["Voltage is the product form of Ohm's law: current times resistance.", "V = I x R. Multiply, then check by dividing back."]);

E("s9-u3-meter-placement", 3, ["SC9.9.4"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a battery, a bulb, and two meters. Meter A is connected in the main line of the circuit and meter V is connected directly across the bulb. Which statement about the meters is correct?",
      "Meter A is the ammeter, correctly in series to measure the current through the bulb; meter V is the voltmeter, correctly in parallel across the bulb to measure its voltage drop",
      ["Meter A is the voltmeter, correctly connected in series in the main line; meter V is the ammeter, correctly connected across the bulb to read its current directly", "Both meters are ammeters of different ranges, and either connection shown would measure the current through the bulb correctly in this circuit as drawn", "Both meters should be connected directly across the bulb, one on each side, because all electrical measurements are properly made in parallel in a circuit"],
      "The two meters connect in opposite ways because they measure different things. An ammeter measures the current flowing through a component, so it must sit in the path, in series, where all the charge passes through it. A voltmeter measures the potential difference between two points, so it connects across the component, in parallel. Swapping them is the classic circuit error.",
      {});
    q.figure = s9u3MeterSVG();
    return q;
  }
]), ["One meter must sit in the flow; the other must sit across two points. Which is which?", "Ammeter in series for current; voltmeter in parallel for voltage."]);

E("s9-u3-gen-meter-read", 3, ["SC9.9.4"], 2, "gen", function () {
  var V = pick([3, 4.5, 6, 7.5, 9]);
  var I = pick([0.3, 0.5, 0.6, 1.0, 1.5]);
  var R = Math.round(V / I * 100) / 100;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { var cv = Math.round(cand[i] * 100) / 100; if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv); } return out.map(function (d) { return d + " \u03a9"; }); }
  return mcq("A student measures a single bulb circuit: the voltmeter across the bulb reads " + V + " V and the ammeter in the main line reads " + I + " A. What is the bulb's resistance while it is operating?",
    R + " \u03a9", dis3(R, [Math.round(V * I * 100) / 100, Math.round(I / V * 100) / 100, R * 2, R + 2]),
    "The two meter readings are exactly the pair Ohm's law needs: R = V / I = " + V + " V / " + I + " A = " + R + " \u03a9 (rounded to two decimal places where needed). The ammeter had to be in series to read the bulb's current and the voltmeter in parallel across the bulb to read its voltage drop.",
    {});
}, ["Two readings, one law: resistance is their ratio.", "Divide the voltmeter reading by the ammeter reading."]);

E("s9-u3-cr-meter-use", 3, ["SC9.9.4"], 2, "var", varset([
  function () {
    return textq("Describe how to set up and use an ammeter and a voltmeter to measure the current through a bulb and the voltage across it in a working circuit. Your answer must state where each meter connects and why, and one precaution for each meter. (3 marks)",
      ["the ammeter connects in series in the bulb's path so all the current through the bulb passes through it", "the voltmeter connects in parallel directly across the bulb so it measures the potential difference between the bulb's two ends", "a correct precaution for each meter, such as starting on a high range and checking polarity or never connecting an ammeter directly across a source"],
      "<b>Model answer:</b> Ammeter: break the circuit at one point in the bulb's path and insert the ammeter there, in series, with its terminals the correct way round for the current's direction. It must be in series because it measures the charge flowing through the bulb, and in series all of that charge passes through the meter. Start on a high range and step down so the needle or display is not driven past its limit. Voltmeter: connect it in parallel, one lead to each side of the bulb, without breaking the circuit. It must be across the bulb because it measures the potential difference between those two points. Check the polarity and range as with the ammeter. Read both meters at eye level and repeat each reading, because small reading differences between observers are a known source of variation in this lab.<br><br><b>Marking points:</b> 1 mark for the ammeter's series placement with its reason. 1 mark for the voltmeter's parallel placement with its reason. 1 mark for a sound precaution for each meter.",
      {});
  }
]), ["Placement first, reason second, precaution third, for each meter in turn.", "In the path versus across the component: that contrast carries the answer."]);

E("s9-u3-error-sources", 3, ["SC9.9.5"], 1, "var", varset([
  function () {
    return mcq("Two students measure the same bulb voltage and record 1.12 V and 1.13 V. Which account of the difference is correct?",
      "Small reading differences like this are expected random error in reading a meter; taking several readings and averaging them reduces the effect",
      ["One student must have connected the voltmeter wrongly to the circuit, because correctly connected meters never disagree by any amount at all", "The difference proves the bulb's voltage itself changed between the two readings, rising or falling in the time between them by that amount", "The readings should both be reported to more and more decimal places, estimated beyond the scale, until the two values agree exactly"],
      "The guide names this exact case: one student records 1.12 V, another 1.13 V, for the same measurement. Reading a scale involves judgement about where the needle sits, so small variations are normal random error, not misconduct or equipment failure. The standard response is repeated readings and an average, not inventing extra decimal places.",
      {});
  }
]), ["A hundredth of a volt apart, same setup. Error, or expected variation?", "Random reading error: repeat and average."]);

E("s9-u3-error-meters-change", 3, ["SC9.9.5"], 3, "var", varset([
  function () {
    return mcq("After a voltmeter is added across a bulb, a class notices the circuit's current drops very slightly. Which statement best identifies this as a source of error to be aware of?",
      "Adding a meter changes the circuit slightly, because the meter itself has resistance, so the measured circuit is not quite the original circuit",
      ["The current dropped because the voltmeter used up some of the circuit's current permanently, consuming it as it measured the voltage", "The drop proves the ammeter in the circuit was faulty, and all of its readings from the whole investigation should be discarded at once", "Meters never affect the circuits they measure in any way, so the drop must be a coincidence that the class should ignore entirely"],
      "Meters are components too. Adding a voltmeter across the bulb adds its resistance to the circuit, so the total resistance and the current shift slightly from the unmeasured circuit's values. The guide flags this effect and notes its full treatment is beyond this course; what is expected here is recognizing it as a potential source of error when readings are compared, not discarding sound data.",
      {});
  }
]), ["The meter joins the circuit when it measures it. What property of the meter matters?", "Every added component brings resistance with it."]);

E("s9-u3-discrepancy-cause", 3, ["SC9.9.6"], 3, "var", varset([
  function () {
    return mcq("A group's Ohm's law data gives resistances of 10.1, 9.8 and 10.3 ohms for the same resistor, but one trial gives 14.6 ohms. Which first response is scientifically sound?",
      "Treat the three close values as the pattern and investigate the one trial: check that trial's connections and readings for a loose contact, a misread meter or a changed setting before accepting it",
      ["Average all four values together into one result, because every measurement ever taken counts equally whatever happened during its trial in the lab that day, without exception", "Discard the three close values as faulty, because the single unusual result is the real discovery of the investigation and the others must be mistaken readings by the group", "Report 14.6 ohms as the resistance, because the last trial of any set is always the most careful one and its value overrides all the trials before it in the set of readings"],
      "Three trials agreeing closely describe the resistor; one trial far away describes something that happened in that trial. Sound practice investigates the discrepancy first: a loose connection adds resistance, a misread scale inflates a value, a range change alters precision. Averaging a faulty trial into good ones corrupts the result, and a single outlier is not a discovery until it survives checking.",
      {});
  }
]), ["Three values agree and one does not. Which one needs explaining?", "Investigate the outlier's trial before touching the data."]);

E("s9-u3-cr-discrepancy", 3, ["SC9.9.6"], 3, "var", varset([
  function () {
    return textq("In an Ohm's law investigation, a group expects a current of 0.50 A at 6.0 V for their resistor, but their ammeter reads 0.38 A. Their voltmeter, checked across the supply, reads 6.0 V. Suggest two explanations for the discrepancy that fit the evidence, and for each, state a check the group could make. (3 marks)",
      ["an explanation located in the circuit, such as added resistance from a loose or corroded connection, with a check such as remaking the connections and repeating", "an explanation located in the measurement, such as a misread scale, wrong range or meter resistance effect, with a check such as rereading at eye level, changing range or swapping meters", "the explanations must respect the confirmed 6.0 V supply reading, ruling out a flat supply as the whole story"],
      "<b>Model answer:</b> The supply voltage is confirmed at 6.0 V, so the missing current must come from the circuit or the measurement. Explanation 1 (circuit): an extra resistance is in the loop, for example a loose or dirty connection at one terminal. Extra resistance at the same voltage means less current, exactly the direction of the discrepancy. Check: switch off, remake every connection firmly, and repeat the trial; if the current rises toward 0.50 A, the connection was the cause. Explanation 2 (measurement): the ammeter was misread or used on an unsuitable range, or the meters' own resistance is slightly altering the circuit, an effect the guide notes. Check: reread the meter squarely at eye level on the most precise suitable range, or swap in a second ammeter and compare readings on the same circuit. Either explanation fits a current that is low while the voltage is right; a flat or faulty supply does not, because the voltmeter confirms the supply.<br><br><b>Marking points:</b> 1 mark for a circuit-side explanation with its check. 1 mark for a measurement-side explanation with its check. 1 mark for using the confirmed voltage reading to narrow the possibilities.",
      {});
  }
]), ["The voltmeter has already cleared one suspect. Aim the explanations at what is left.", "One explanation in the circuit, one in the measuring, each with a test."]);

E("s9-u3-gen-graph-resistance", 3, ["SC9.9.7"], 2, "gen", function () {
  var R = pick([5, 10, 20, 4, 8]);
  var xs = [1, 2, 3, 4, 5];
  var ys = xs.map(function (v) { return Math.round(v / R * 100) / 100; });
  var qv = pick([3, 4]);
  var qi = Math.round(qv / R * 100) / 100;
  function dis3(key, cand) { var out = []; for (var i = 0; i < cand.length && out.length < 3; i++) { var cv = Math.round(cand[i] * 100) / 100; if (cv !== key && cv > 0 && out.indexOf(cv) < 0) out.push(cv); } return out.map(function (d) { return d + " A"; }); }
  var q = mcq("The graph shows a line of best fit for voltage and current data from a single resistor. What current corresponds to a voltage of " + qv + " V on this graph?",
    qi + " A", dis3(qi, [qv * R, Math.round(qv / (R * 2) * 100) / 100, Math.round((qv + 1) / R * 100) / 100]),
    "The plotted points follow I = V / R with R = " + R + " \u03a9: each voltage divided by " + R + " gives its current, and the line of best fit runs through those points. At " + qv + " V the line gives I = " + qv + " / " + R + " = " + qi + " A (rounded to two decimal places). Read the line, not a single possibly scattered data point.",
    {});
  q.figure = s9u3VIGraphSVG(xs, ys);
  return q;
}, ["Read the line of best fit at the given voltage, or use the steady ratio the line shows.", "The line's ratio is constant: voltage divided by current is the resistance."]);

E("s9-u3-best-fit", 3, ["SC9.9.7"], 1, "var", varset([
  function () {
    var q = mcq("A student's voltage and current points for a resistor, shown in the graph, scatter slightly around a straight line through the origin. Which treatment of the graph is correct?",
      "Draw a line of best fit through the scatter, passing through the origin, and use the line (not any single point) to state the relationship",
      ["Connect the points dot to dot in the order they were plotted, because a proper line must touch every single measurement on the graph", "Discard the points that fall farthest from a straight line and plot only the remaining ones, the ones that fit the pattern neatly", "Draw the line wherever on the page it makes the calculated resistance come out to a neat whole number of ohms for the report"],
      "Real meter data always scatter a little, from the reading variations this strand discusses. A line of best fit represents the pattern of all the points at once: for an ohmic resistor it is straight and passes through the origin, showing current directly proportional to voltage. Connecting dot to dot would draw the errors into the result, and deleting awkward points falsifies the data.",
      {});
    q.figure = s9u3VIGraphSVG([2,4,6,8],[0.2,0.4,0.6,0.8]);
    return q;
  }
]), ["The line represents all the points together. Should it chase each point or summarize them?", "Best fit summarizes; dot to dot just traces the scatter."]);

E("s9-u3-cr-graph-interpret", 3, ["SC9.9.7"], 3, "var", varset([
  function () {
    return textq("A group graphs voltage (horizontal axis) against current (vertical axis) for a resistor and gets a straight line of best fit through the origin. At 6.0 V the line gives 0.60 A, and at 3.0 V it gives 0.30 A. (a) State the relationship between voltage and current that the graph shows. (b) Calculate the resistance from the graph. (c) Predict the current at 9.0 V and justify the prediction from the graph's pattern. (3 marks)",
      ["the graph shows current directly proportional to voltage for this resistor", "the resistance is 10 ohms from voltage divided by current using points on the line", "the predicted current at 9.0 V is 0.90 A, extending the same proportional pattern"],
      "<b>Model answer:</b> (a) The straight line through the origin shows that current is directly proportional to voltage for this resistor: doubling the voltage doubles the current, which is Ohm's law in graph form. (b) Using points on the line of best fit (not single scattered readings): R = V / I = 6.0 V / 0.60 A = 10 ohms, confirmed by the second point, 3.0 V / 0.30 A = 10 ohms. The constant ratio is the resistance. (c) Extending the same proportion, at 9.0 V the current is I = V / R = 9.0 V / 10 ohms = 0.90 A. The prediction is justified because the line's constant ratio has held at every measured voltage, so the pattern is extended, not guessed.<br><br><b>Marking points:</b> 1 mark for the direct proportion relationship stated. 1 mark for the resistance calculated from line points (10 ohms). 1 mark for the 0.90 A prediction justified by the constant ratio.",
      {});
  }
]), ["The line's shape is part (a), its ratio is part (b), and part (c) is the ratio used once more.", "Points on the line, not raw points, give the cleanest ratio."]);

E("s9-u3-variables", 3, ["SC9.9.8"], 1, "var", varset([
  function () {
    return mcq("A student investigates whether the number of cells in series changes a bulb's brightness. She builds circuits with one, two and three cells in series with the same bulb, and measures the current each time. Which variable assignment is correct?",
      "Changed variable: the number of cells in series. Measured variable: the current. Controlled variables: the bulb, the wires and the meter setup",
      ["Changed variable: the current. Measured variable: the number of cells. Controlled variables: the room temperature only", "Changed variable: the bulb. Measured variable: the brightness judged by eye. Controlled variables: the number of cells", "All three quantities are changed variables, because all three differ between trials"],
      "A controlled investigation changes one thing deliberately, measures one thing in response, and holds everything else that could matter the same. Here the cell count is what she sets, the current is what she reads, and the bulb and apparatus stay fixed so the comparison between trials is fair. Brightness judged by eye would be a weaker measured variable than the ammeter reading she actually takes.",
      {});
  }
]), ["What does she set by hand, what does she read, and what must not change between trials?", "Set, read, hold: one of each."]);

E("s9-u3-cr-design-circuit", 3, ["SC9.9.8"], 3, "var", varset([
  function () {
    return textq("Design an investigation to determine whether connecting identical bulbs in series or in parallel gives the brighter bulbs, using one 6 V supply, identical bulbs, an ammeter, a voltmeter and connecting wires. Your design must state the question, the circuits to build, what you will measure and where each meter goes, the variables you will control, and how you will decide which connection gives brighter bulbs. (4 marks)",
      ["a clear question comparing bulb brightness in series and parallel circuits on the same supply", "both circuits described or diagrammed with the same bulbs and the same 6 V supply", "measurements stated with meter placement: ammeter in series in each arrangement and voltmeter across a bulb in each arrangement", "controls named (same supply, same bulbs, same wires) and a decision rule based on the voltage across each bulb and the current, since brightness follows the power each bulb receives"],
      "<b>Model answer:</b> Question: on the same 6 V supply, do identical bulbs glow brighter connected in series or in parallel? Circuits: build circuit A with two identical bulbs in series across the 6 V supply; build circuit B with the same two bulbs in parallel across the same supply. Measurements: in each circuit, connect the ammeter in series to measure the current through a bulb, and the voltmeter in parallel across one bulb to measure the voltage across it; also record a brightness observation for each bulb as supporting evidence. Controls: the same supply (6 V), the same pair of bulbs, the same wires and meters, and the same room lighting for observations; only the connection arrangement changes. Decision: the connection whose bulbs receive the greater voltage across each bulb at the greater current is delivering more power to each bulb (P = V x I) and gives the brighter bulbs. The expected result is parallel: each bulb there gets the full 6 V, while in series the bulbs share the 6 V between them.<br><br><b>Marking points:</b> 1 mark for the question and both circuits built from the same components and supply. 1 mark for measurements with correct meter placement (ammeter in series, voltmeter across a bulb). 1 mark for the controlled variables named. 1 mark for a decision rule based on the voltage and current each bulb actually receives.",
      {});
  }
]), ["Build the answer in the order a lab is planned: question, circuits, measurements, controls, decision.", "Brightness follows the power each bulb receives, so measure what each bulb actually gets."]);

E("s9-u3-instrument-use", 3, ["SC9.9.9"], 2, "var", varset([
  function () {
    var q = mcq("A student is taking readings from the bulb circuit shown in the diagram. Which practice shows the meter being used effectively and accurately in this strand's lab work?",
      "Selecting the suitable range before reading, reading the scale squarely at eye level, and repeating the reading to check it agrees with itself",
      ["Reading the scale from a sharp angle while the circuit is being rebuilt on the bench, and recording the first value seen each time", "Using the highest available range for every measurement taken, so the needle barely moves on the scale, in the name of safety", "Recording every reading to as many decimal places as the student can invent on the spot, in the name of precision in the lab"],
      "Accurate instrument use is a technique, not a hope: choose the range that puts the reading well up the scale without over-ranging, read at eye level to avoid parallax error, and repeat readings so random variation shows itself and can be averaged. A barely moving needle wastes the scale's precision, and invented decimal places are not precision at all. The bench handling itself is assessed in the classroom; this entry assesses the judgement behind it.",
      {});
    q.figure = s9u3MeterSVG();
    return q;
  }
]), ["Three habits separate a trustworthy reading from a careless one. Which option has all three?", "Right range, eye level, repeat: accuracy is a routine."]);

E("s9-u3-safe-practice", 3, ["SC9.9.10"], 1, "var", varset([
  function () {
    return mcq("Which set of practices is the safe way to work with the circuits and apparatus of this strand?",
      "Build and change circuits with the supply switched off or disconnected, check connections before switching on, and report damaged wires or hot components instead of continuing",
      ["Change the connections while the circuit is still live and powered, so the effect of each change can be seen immediately as it is made by the student", "Hold a resistor that has become hot during the investigation in the bare hand to check whether it is still working properly or not in the circuit", "Bypass a breaker that keeps tripping during the work so the investigation can continue without interruption to its end in the laboratory with the class"],
      "Low-voltage school circuits are forgiving, but the habits are the real curriculum: work on a dead circuit, inspect before energizing, and treat heat, damage or a repeatedly tripping protection device as a stop signal, not an obstacle to defeat. Each distractor normalizes exactly the habit that causes injuries with larger apparatus later. Safe handling at the bench is classroom assessed; this entry assesses recognizing the safe practice.",
      {});
  }
]), ["One option treats every warning sign as information. The others treat them as inconveniences.", "Off while building, check before switching on, stop at damage or heat."]);

E("s9-u3-testable-rephrase", 3, ["SC9.9.12"], 1, "var", varset([
  function () {
    return mcq("Which rephrasing turns a loose wondering into a testable question about cells in series and parallel?",
      "Loose: 'Are batteries better in a row or side by side?' Testable: 'With identical cells and the same bulb, does connecting two cells in series or in parallel produce the greater voltage across the bulb?'",
      ["Loose: 'Do batteries last a long time in toys?' Testable: 'Why do batteries exist in the world at all, and who first thought of making them for devices like these?'", "Loose: 'Which battery is best for a flashlight?' Testable: 'Which battery do most students in the class like best for their own flashlights at home, and why?'", "Loose: 'How do cells work inside a flashlight?' Testable: 'What is the history of the electric cell, from its first invention to the present day in detail?'"],
      "A testable question names what will be changed, what will be measured, and what will be held the same, in a form an investigation can answer. The correct rephrasing changes only the connection (series against parallel), measures the voltage across the same bulb, and holds the cells identical. Preferences and history questions cannot be settled by a circuit measurement.",
      {});
  }
]), ["A testable question can be handed to a lab bench. Which one names a change, a measurement and a control?", "Changed: connection. Measured: voltage. Held: cells and bulb."]);

E("s9-u3-testable-judge", 3, ["SC9.9.12"], 2, "var", varset([
  function () {
    return mcq("A student proposes three questions for a cells investigation: (1) 'Do series cells make a bulb brighter than parallel cells with the same cells?' (2) 'Who invented the first cell?' (3) 'Is series or parallel more popular in toys?' Which judgement is correct?",
      "Only question 1 is testable in this investigation: it compares a measurable outcome between the two connections with the cells held the same; questions 2 and 3 are answered by research and surveys, not by circuit measurements",
      ["All three questions are testable in this investigation, because all three can be investigated somehow by someone, in some way, using the equipment in the room and the library down the hall", "Only question 3 is testable in this investigation, because the popularity of a connection can be counted in a survey of toy owners carried out by the class this term at school", "None of the three questions is testable here, because the brightness of a bulb cannot be measured or compared in any way with the equipment available to the class in this lab"],
      "Testable in this context means answerable by the circuit investigation at hand. Question 1 sets up a fair measurement: same cells, two connections, brightness compared (and it can be backed by meter readings). Question 2 is historical research and question 3 is a survey; both are legitimate questions, but neither is a testable question for a series and parallel cells experiment, which is the distinction this indicator targets.",
      {});
  }
]), ["Testable here means testable on this bench, with these circuits. Sort the three by evidence type.", "One is measured, one is looked up, one is surveyed."]);

E("s9-u3-applications", 3, ["SC9.9.13"], 3, "var", varset([
  function () {
    return mcq("A class finds that in their model circuits, bulbs in parallel stay bright when one is removed, while series bulbs share voltage. Which statement correctly identifies an application of that finding?",
      "Homes are wired in parallel so each light and outlet works independently at full supply voltage, which is the finding applied at building scale",
      ["The finding applies only inside the classroom where it was found, because real buildings use a completely different kind of electricity from school circuits", "The finding shows series wiring should be used for homes instead, since sharing the voltage between lights saves energy in every room", "The finding has no application anywhere until the class repeats the whole investigation with larger bulbs and a larger supply in the lab"],
      "Findings earn their keep in applications. The parallel result, independent branches at full voltage, is exactly the property a home needs, and it is why household wiring is parallel. The classroom circuit runs on the same electricity as the building around it; scale changes the components, not the principles.",
      {});
  }
]), ["Where in daily life is 'independent branches at full voltage' exactly what is needed?", "The home is the application: parallel wiring, chosen for this finding's reason."]);

E("s9-u3-cr-applications", 3, ["SC9.9.13"], 2, "var", varset([
  function () {
    return textq("A student heats water with an electric element and finds that some of the electrical energy heats the container and the air rather than the water, and that the element glows, producing light as well as heat. Evaluate two applications of this finding: (a) a kettle designer deciding where insulation matters, and (b) a cook choosing between an element that glows brightly and one that stays dark at the same power. (3 marks)",
      ["the finding restated accurately: electrical energy converts to several forms at once, and only the heat reaching the water is useful for the task", "the kettle application evaluated: insulation around the container keeps converted heat directed to the water, raising useful efficiency", "the cook application evaluated: at equal power, the dark element puts no less energy in overall, but the glowing element visibly diverts some energy to light, so the dark element directs more of its energy to heat for the pan"],
      "<b>Model answer:</b> The finding is that an electrical device converts energy into several forms at once: the element's electrical energy becomes heat in the water, but also heat in the container and surrounding air, and light from the glow. Only the heat delivered to the water is useful output for the task. (a) For the kettle designer, the application is direct: insulation around the container, and a shape that keeps the element's heat in contact with the water, reduce the share converted to heating the surroundings, so more of every kilowatt-hour does the intended job and the kettle's efficiency rises. (b) For the cook, at the same power the two elements take in the same energy per second. The glowing element visibly converts part of that energy to light, energy that leaves the pan area; the dark element converts essentially all of its input to heat at the element, where the pan can collect it. On this finding, the dark element is the better application for cooking, and the glow is a visible sign of energy going somewhere other than the food.<br><br><b>Marking points:</b> 1 mark for the finding stated as simultaneous conversion to several forms with useful output defined by the task. 1 mark for the kettle application evaluated from the finding. 1 mark for the cook's choice evaluated from the finding at equal power.",
      {});
  }
]), ["One finding, two decisions. State the finding once, then spend it twice.", "Glowing is not extra energy; it is energy visibly going to the wrong form."]);

E("s9-u3-env-criteria", 3, ["SC9.9.14"], 1, "var", varset([
  function () {
    return mcq("Which set gives the criteria this indicator names for evaluating environmental problems associated with electrical energy production?",
      "Safety, cost of production, and degree of environmental impact",
      ["Popularity, colour of emissions, and distance from the capital", "Cost of production only, because environmental problems are economic problems", "The age of the plant, the number of employees, and the fuel's country of origin"],
      "The indicator names its criteria in its own statement: safety, cost of production, and degree of environmental impact. A proper evaluation of a generating option runs it against all three, because an option can be cheap and still unsafe, or safe and still heavily damaging to the environment. Note the registry wording: this indicator is keyed to the spreadsheet statement about evaluating environmental problems of electrical production.",
      {});
  }
]), ["The indicator itself lists three criteria. Find the option carrying all three.", "Safety, cost of production, environmental impact."]);

E("s9-u3-env-apply", 3, ["SC9.9.14"], 2, "var", varset([
  function () {
    return mcq("A proposed generating project is cheap to build and run, and its design meets all safety standards, but it would flood a large area of forest and a community's traditional hunting land. Applying this indicator's criteria, which evaluation is complete?",
      "The project scores well on cost of production and safety, but poorly on degree of environmental impact, and a complete evaluation reports all three standings rather than a single verdict",
      ["The project is acceptable as proposed, because meeting every safety standard in its design settles the environmental question completely, with nothing left to report", "The project is acceptable as proposed, because its low cost outweighs every other criterion in the evaluation automatically, whatever the other standings show in detail", "The project must be rejected on cost grounds alone, because flooding the land counts as a production cost and cost is the criterion that decides every evaluation of this kind"],
      "Criteria are applied one at a time and reported honestly. Cost: favourable. Safety: favourable. Degree of environmental impact: unfavourable, since flooding forest and hunting land is a major impact. Collapsing that into 'acceptable because it is safe and cheap' abandons the third criterion, which exists precisely for projects whose costs are paid by the environment and the community rather than the builder.",
      {});
  }
]), ["Score the project three times, once per criterion. Does one good score erase a bad one?", "Report all three standings; no criterion votes the others down."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-a-circuit item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U3 = {
  "s9-u3-cr-design-circuit": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U3[e.id]) { e.noCompose = true; } });

/* Topic tags for SC9.7.5 (Nov 19, 2026, decision D3 in the
   test-shaped practice spec): the test blueprint splits SC9.7.5
   across Electricity Test 2, qualified "Ohm's Law", and Test 3,
   qualified "circuits", so entries named here carry e.topic for
   the test-shaped composer to scope the indicator by topic.
   "ohm" marks the circuit-rules entries: the series current
   rule, series voltage sharing, parallel branch currents adding,
   and the parallel voltage rule, whose solution explains the
   differing branch currents by Ohm's law. "circuits" marks the
   entries that identify or describe series and parallel circuits
   and their behaviour. s9-u3-total-resistance was flagged as
   ambiguous (it judges a total-resistance change qualitatively,
   applying no circuit law and identifying no circuit); the
   owner ruled it "ohm" on Nov 19, 2026, its subject governing. */
var TOPIC_U3 = {
  "s9-u3-series-current-rule": "ohm",
  "s9-u3-gen-series-voltage": "ohm",
  "s9-u3-gen-parallel-current": "ohm",
  "s9-u3-parallel-voltage-rule": "ohm",
  "s9-u3-total-resistance": "ohm",
  "s9-u3-series-identify": "circuits",
  "s9-u3-parallel-identify": "circuits",
  "s9-u3-cr-series-parallel-data": "circuits",
  "s9-u3-cr-bulb-removed": "circuits"
};
BANK.forEach(function (e) { if (TOPIC_U3[e.id]) { e.topic = TOPIC_U3[e.id]; } });

