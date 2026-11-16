/* Science 9 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/sci-9/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-u1.js ----- */
// CRMARKS: s9-u1-cr-apparent=3
// CRMARKS: s9-u1-cr-thinkers=3
// CRMARKS: s9-u1-cr-classify=3
// CRMARKS: s9-u1-cr-solar=3
// CRMARKS: s9-u1-cr-universe=3
// CRMARKS: s9-u1-cr-components=3
// CRMARKS: s9-u1-cr-tech-science=3
// CRMARKS: s9-u1-cr-evidence=3
// CRMARKS: s9-u1-cr-distance=3
// CRMARKS: s9-u1-cr-space-decision=4
// CRMARKS: s9-u1-cr-method=3
// CRMARKS: s9-u1-cr-data=3
// CRMARKS: s9-u1-cr-design-mission=4
// CRMARKS: s9-u1-cr-process=3
// Science 9 Unit 1 bank: Space (SC9.1.1 to SC9.3.8), built Nov 15, 2026
// to the Space authoring spec. All entries are original and were
// written new for this app. Existing tests and question banks,
// including teacher masters (Space portions), the ESD Grade 9
// Unit 1 Space set including the Celestial Navigation STSE, the
// MHR ExamView Chapters 10, 11 and 12, the core laboratories
// (Strolling Through the Solar System, Designing a Space Station)
// and the DesignYourOwnPlanet STEAM context, were reviewed only
// to gauge the expected depth and range of treatment. No
// verbatim source text, values or scenarios are carried.
// Guide discipline: Kepler's Laws of Planetary Motion are not
// assessed (the guide states students do not need to know them);
// distances between planets and stars are compared and converted by
// proportion only (the guide states students do not need to
// calculate distances between planets and stars); the Sun is limited
// to sunspots, solar flares and solar prominences; nebula types are
// not detailed; religious based accounts of origins are outside the
// course and are not assessed; the reviewed SR master item 2 key
// was not carried (see the harvest catalogue for the judgement).
// CORE residue: SC9.3.5 carries one entry judging a described case
// of a team member receiving, understanding and acting on another's
// idea; the interpersonal performance itself is the recorded
// residue and belongs to classroom assessment. SC9.3.6 carries no
// entries: working cooperatively with team members is a live group
// performance with no honest selected or constructed response form
// in this bank, on the SC7.3.5 and SC8.9.12 precedent. Core Lab
// performance itself (laying out the stroll, running the station
// design) is classroom assessment; the SC9.3.1 to SC9.3.4 and
// SC9.3.8 entries assess the selecting, measuring, organising,
// evaluating and process judging around that performance.
// Sean O'Neill's rules applied throughout: distractors are written
// at the key's register in length and precision, the key is never
// padded, and ordering of numeric and text options is left to the
// shell.


/* ---------- Figures (local to this file, s9u1 prefix) ---------- */
function s9u1ConstellationSVG() {
  return "<svg viewBox=\"0 0 640 300\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">"
    + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#0b1026\"/>"
    + "<circle cx=\"90\" cy=\"200\" r=\"7\" fill=\"#ffffff\"/><circle cx=\"170\" cy=\"215\" r=\"6\" fill=\"#ffffff\"/>"
    + "<circle cx=\"250\" cy=\"205\" r=\"6\" fill=\"#ffffff\"/><circle cx=\"255\" cy=\"130\" r=\"7\" fill=\"#ffffff\"/>"
    + "<circle cx=\"360\" cy=\"105\" r=\"6\" fill=\"#ffffff\"/><circle cx=\"460\" cy=\"80\" r=\"6\" fill=\"#ffffff\"/>"
    + "<circle cx=\"560\" cy=\"55\" r=\"7\" fill=\"#ffffff\"/>"
    + "<polyline points=\"90,200 170,215 250,205 255,130 360,105 460,80 560,55\" fill=\"none\" stroke=\"#8fa8d8\" stroke-width=\"2\"/>"
    + "<text x=\"320\" y=\"285\" fill=\"#cdd8f0\" text-anchor=\"middle\">Star pattern diagram (unlabelled)</text></svg>";
}
function s9u1OrbitSVG() {
  return "<svg viewBox=\"0 0 640 300\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">"
    + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"300\" fill=\"#ffffff\"/>"
    + "<ellipse cx=\"320\" cy=\"150\" rx=\"230\" ry=\"95\" fill=\"none\" stroke=\"#33507a\" stroke-width=\"2\"/>"
    + "<circle cx=\"320\" cy=\"150\" r=\"26\" fill=\"#e8a33d\"/>"
    + "<circle cx=\"550\" cy=\"150\" r=\"11\" fill=\"#33507a\"/>"
    + "<text x=\"320\" y=\"292\" text-anchor=\"middle\" fill=\"#333333\">Orbit diagram (unlabelled)</text></svg>";
}
function s9u1PlanetTableSVG() {
  return "<svg viewBox=\"0 0 640 210\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"14\">"
    + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"210\" fill=\"#ffffff\"/>"
    + "<text x=\"20\" y=\"35\" font-weight=\"bold\">Planet</text><text x=\"150\" y=\"35\" font-weight=\"bold\">Relative size</text><text x=\"300\" y=\"35\" font-weight=\"bold\">Density</text><text x=\"450\" y=\"35\" font-weight=\"bold\">Orbital period</text>"
    + "<text x=\"20\" y=\"85\">P</text><text x=\"150\" y=\"85\">Small</text><text x=\"300\" y=\"85\">High</text><text x=\"450\" y=\"85\">Short</text>"
    + "<text x=\"20\" y=\"135\">Q</text><text x=\"150\" y=\"135\">Very large</text><text x=\"300\" y=\"135\">Low</text><text x=\"450\" y=\"135\">Long</text>"
    + "<line x1=\"10\" y1=\"50\" x2=\"630\" y2=\"50\" stroke=\"#999999\"/><line x1=\"10\" y1=\"155\" x2=\"630\" y2=\"155\" stroke=\"#999999\"/>"
    + "<text x=\"20\" y=\"190\" fill=\"#555555\">Data table: two planets compared (no classification given)</text></svg>";
}
function s9u1DistanceSVG() {
  return "<svg viewBox=\"0 0 640 260\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">"
    + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"260\" fill=\"#ffffff\"/>"
    + "<text x=\"20\" y=\"45\">Earth to Moon</text><rect x=\"170\" y=\"30\" width=\"8\" height=\"18\" fill=\"#33507a\"/>"
    + "<text x=\"20\" y=\"105\">Earth to Sun (1 AU)</text><rect x=\"170\" y=\"90\" width=\"60\" height=\"18\" fill=\"#33507a\"/>"
    + "<text x=\"20\" y=\"165\">Nearest star (about 4.2 ly)</text><rect x=\"170\" y=\"150\" width=\"440\" height=\"18\" fill=\"#b3543d\"/>"
    + "<text x=\"20\" y=\"225\" fill=\"#555555\">Bar lengths are schematic, drawn to show relative scale only</text></svg>";
}
function s9u1StarTableSVG() {
  return "<svg viewBox=\"0 0 640 230\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"14\">"
    + "<rect x=\"0\" y=\"0\" width=\"640\" height=\"230\" fill=\"#ffffff\"/>"
    + "<text x=\"20\" y=\"35\" font-weight=\"bold\">Object</text><text x=\"170\" y=\"35\" font-weight=\"bold\">Size of emitting region</text><text x=\"430\" y=\"35\" font-weight=\"bold\">Relative output</text>"
    + "<text x=\"20\" y=\"85\">Object 1</text><text x=\"170\" y=\"85\">Galaxy wide</text><text x=\"430\" y=\"85\">Moderate</text>"
    + "<text x=\"20\" y=\"135\">Object 2</text><text x=\"170\" y=\"135\">Tiny central region</text><text x=\"430\" y=\"135\">Exceeds its whole galaxy</text>"
    + "<text x=\"20\" y=\"185\">Object 3</text><text x=\"170\" y=\"185\">Single star</text><text x=\"430\" y=\"185\">Moderate</text>"
    + "<line x1=\"10\" y1=\"50\" x2=\"630\" y2=\"50\" stroke=\"#999999\"/>"
    + "<text x=\"20\" y=\"218\" fill=\"#555555\">Data table: objects compared by region size and output (unlabelled)</text></svg>";
}


E("s9-u1-constellation-figure", 1, ["SC9.1.1"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a familiar star pattern: seven bright stars forming a ladle shape, with a handle curving away from a bowl. Which statement about this pattern is correct?",
      "It is an asterism called the Big Dipper, found within the constellation Ursa Major",
      ["It is a constellation called the Big Dipper, separate from Ursa Major", "It is an asterism called the Little Dipper, found within Ursa Minor", "It is the belt of Orion, an asterism within the constellation Orion"],
      "A constellation is a recognised region and pattern of the sky, while an asterism is a smaller, well known pattern inside a constellation. The ladle pattern is the Big Dipper, an asterism inside Ursa Major, the Great Bear. The Little Dipper sits in Ursa Minor, and Orion's belt is a line of three stars, not a ladle.",
      {});
    q.figure = s9u1ConstellationSVG();
    return q;
  }
]), ["First decide whether the named pattern is a whole constellation or a pattern inside one.", "The ladle shape belongs to the Great Bear."]);

E("s9-u1-orbit-meaning", 1, ["SC9.1.1"], 1, "var", varset([
  function () {
    var q = mcq("The diagram shows a body following a closed, repeating path around a larger body. What holds the moving body in that path?",
      "Gravity between the two bodies keeps it in its orbit",
      ["A stream of solar wind pushes it around the larger body", "The spin of the larger body drags it around by friction", "Light pressure from the larger body holds it on the path"],
      "Celestial bodies move in cyclic paths called orbits, and those orbits result from gravitational forces. Gravity pulls the moving body toward the larger body while its forward motion carries it onward, so it keeps following the same closed path.",
      {});
    q.figure = s9u1OrbitSVG();
    return q;
  }
]), ["Look for the force the guide names as the cause of orbits.", "Orbits result from gravitational forces."]);

E("s9-u1-moon-motion", 1, ["SC9.1.1"], 3, "var", varset([
  function () {
    return mcq("Over one month, an observer records the Moon rising later each night and changing shape in a repeating cycle, while the background stars stay in the same patterns. Which explanation fits all of these observations together?",
      "The Moon revolves around Earth while Earth rotates, so its position and lit face change night by night",
      ["The stars revolve around the Moon once a month, so their patterns should change steadily night by night", "The Moon rotates in place without revolving around Earth, and that spinning alone changes the lit face we see", "Earth revolves around the Moon once a month, carrying the observer past it and shifting the lit face we see"],
      "The Moon revolves around Earth in about a month. Earth's rotation carries the observer around each day, and the Moon's steady revolution shifts where and when it appears, while the changing Sun, Earth and Moon geometry changes the lit part we see. The distant stars are not carried around the Moon, so their patterns stay fixed.",
      {});
  }
]), ["Separate the daily motion (Earth rotating) from the monthly motion (the Moon revolving).", "Ask which body is doing the revolving in the Earth and Moon pair."]);

E("s9-u1-motion-cause", 1, ["SC9.1.1"], 1, "gen", function () {
  var cases = [
    { d: "the Sun appears to rise in the east and cross the sky during the day", k: "Earth rotates on its axis from west to east", w: ["The Sun revolves around Earth once a day", "Earth revolves around the Sun once a day", "The Sun rotates on its axis once a day"] },
    { d: "the stars appear to wheel across the night sky from east to west", k: "Earth rotates on its axis, carrying the observer with it", w: ["The stars revolve around Earth once a night", "Earth revolves around the Moon once a night", "The stars rotate around the Sun once a night"] },
    { d: "different constellations are visible in the evening sky in different seasons", k: "Earth revolves around the Sun, so the night side faces different stars through the year", w: ["The constellations move around Earth once a year", "Earth rotates faster in some seasons than in others", "The Sun blocks the same constellations all year"] }
  ];
  var c = pick(cases);
  return mcq("Which motion best explains this apparent motion: " + c.d + "?",
    c.k, c.w,
    "Apparent motion is how motion looks from Earth, and most of it is produced by Earth's own movements. Earth's rotation on its axis from west to east makes the Sun and stars appear to cross the sky daily. Earth's revolution around the Sun changes which stars the night side faces through the year, so the evening constellations change with the seasons.",
    {});
}, ["Daily patterns point to rotation; yearly patterns point to revolution.", "Ask which of Earth's two motions matches the timescale in the case."]);

E("s9-u1-wander", 1, ["SC9.1.1"], 2, "gen", function () {
  var cases = [
    { p: "Mars", d: "shifts position noticeably against the background stars over several weeks, even appearing to loop backward for a time" },
    { p: "Jupiter", d: "moves steadily against the background stars over several months, changing which constellation it appears in" },
    { p: "Venus", d: "appears in the evening sky for a season, vanishes, then reappears in the morning sky" }
  ];
  var c = pick(cases);
  return mcq("Observers track " + c.p + ", which " + c.d + ". Why do planets show this kind of motion when stars do not?",
    "Earth and the planets all move in their own orbits around the Sun, so our viewpoint on a planet keeps changing",
    ["Planets are pulled around Earth in large circles while the stars stay fixed to Earth and never shift",
     "Planets reflect sunlight unevenly as they spin, which makes them look as if they move against the stars",
     "Stars move in exactly the same way as planets, but they shine too brightly for their motion to be tracked"],
    "The word planet comes from a word meaning wanderer. Stars are so distant that their pattern stays fixed over human timescales, but the planets are fellow travellers around the Sun: as Earth and a planet move in their separate orbits, the planet's direction as seen from Earth shifts against the star background, and an outer planet can even appear to loop backward when Earth overtakes it.",
    {});
}, ["Stars hold their pattern; planets do not. What is different about planets?", "Both Earth and the planet are moving. The viewpoint is moving too."]);

E("s9-u1-cr-apparent", 1, ["SC9.1.1"], 2, "var", varset([
  function () {
    return textq("A student watches the sky over one evening and writes: 'The stars moved across the sky, the Moon moved too, and one bright planet was in a different place compared with last month.' Explain each of the three observations, naming the real motion behind each apparent motion. (3 marks)",
      ["Earth rotates on its axis, so the stars appear to cross the sky", "the Moon revolves around Earth as well as being carried by Earth's rotation", "the planet and Earth both orbit the Sun, so the planet shifts against the stars"],
      "<b>Model answer:</b> The stars appear to cross the sky because Earth rotates on its axis from west to east, carrying the observer around; the stars themselves hold a fixed pattern. The Moon shares that daily apparent motion from Earth's rotation, and in addition it really revolves around Earth, which shifts its position and phase over the month. The planet appears in a different place against the stars because both the planet and Earth are moving in their own orbits around the Sun, so the line of sight to the planet changes. All celestial bodies move in cyclic paths called orbits, held by gravity.<br><br><b>Marking points:</b> 1 mark for the stars' apparent motion explained by Earth's rotation. 1 mark for the Moon's revolution around Earth added to the daily motion. 1 mark for the planet's shift explained by both Earth and the planet orbiting the Sun.",
      {});
  }
]), ["Take the three observations one at a time; each has a different real motion behind it.", "Daily motion belongs to Earth's rotation. Monthly shifts need a second motion."]);

E("s9-u1-thinker-match", 1, ["SC9.1.2"], 1, "var", varset([
  function () {
    return mcq("Which thinker is correctly matched with their contribution to understanding celestial motion?",
      "Copernicus proposed that Earth and the planets revolve around the Sun",
      ["Aristotle proposed that Earth revolves around the Sun", "Galileo determined that planets follow elliptical paths", "Ptolemy proposed that Earth and the planets revolve around the Sun"],
      "Copernicus proposed the Sun-centred arrangement in 1543. Aristotle and Ptolemy placed Earth at the centre, Kepler determined that planets follow elliptical paths, and Galileo used telescopic observations, including moons orbiting Jupiter, to support the Sun-centred view.",
      {});
  }
]), ["Check each name against the model they are known for: Earth-centred or Sun-centred.", "Copernicus is the Sun-centred name on the list."]);

E("s9-u1-geo-helio", 1, ["SC9.1.2"], 1, "var", varset([
  function () {
    return mcq("What is the central difference between the geocentric and heliocentric descriptions of the solar system?",
      "The geocentric description places Earth at the centre; the heliocentric description places the Sun at the centre",
      ["The geocentric description has circular orbits; the heliocentric description has no orbits at all", "The geocentric description includes the Moon; the heliocentric description leaves the Moon out", "The geocentric description is about stars; the heliocentric description is about planets only"],
      "Geocentric means Earth-centred: in that description the Sun, Moon, planets and stars were held to move around Earth. Heliocentric means Sun-centred: Earth and the other planets revolve around the Sun. The difference is what sits at the centre.",
      {});
  }
]), ["Break the two words down: geo means Earth, helio means Sun.", "The centre is the whole difference."]);

E("s9-u1-kepler-galileo", 1, ["SC9.1.2"], 2, "var", varset([
  function () {
    return mcq("A class timeline gives two entries: one thinker showed that planets follow elliptical paths, and another was the first to apply careful telescopic observation to astronomy and found moons orbiting Jupiter. Which pairing is correct?",
      "Kepler: elliptical paths; Galileo: telescopic observation and Jupiter's moons",
      ["Galileo: elliptical paths; Kepler: telescopic observation and Jupiter's moons", "Kepler: elliptical paths; Newton: telescopic observation and Jupiter's moons", "Newton: elliptical paths; Galileo: telescopic observation and Jupiter's moons"],
      "Kepler determined that planets follow an elliptical path. Galileo applied a careful scientific method to astronomy with the telescope and observed moons orbiting Jupiter, evidence that not everything orbits Earth. Newton came later and explained the motion with gravity.",
      {});
  }
]), ["One name belongs to orbit shape, the other to the telescope.", "Ellipses go with Kepler; Jupiter's moons go with Galileo."]);

E("s9-u1-models-judgement", 1, ["SC9.1.2"], 3, "var", varset([
  function () {
    return mcq("A student argues that the geocentric description should still be taught as equally supported because it can be drawn to match where planets appear in the sky. Which response best applies how scientific descriptions are judged?",
      "A description earns support by matching new and precise observations; telescopic evidence such as Jupiter's moons and the phases of Venus fits the Sun-centred description and strains the Earth-centred one",
      ["Any description that can be drawn to match where planets appear is equally supported, so both should be kept and taught as equals, and telescopic evidence should not change that judgement", "The older description should be kept as equally supported because it was accepted for far longer, and a description trusted for so many centuries should not be set aside for new observations", "The Sun-centred description wins only because Copernicus published his version first, and whichever description appears first in print keeps its standing regardless of later evidence"],
      "Descriptions are judged against evidence. Moons seen orbiting Jupiter show that Earth is not the centre of all motion, and the full set of phases of Venus fits a Sun-centred arrangement. Long acceptance and neat drawings do not outweigh observations that a description cannot explain naturally.",
      {});
  }
]), ["Judge the claim by evidence, not by age or by how a diagram looks.", "Ask what each description does with Jupiter's moons and the phases of Venus."]);

E("s9-u1-cr-thinkers", 1, ["SC9.1.2"], 2, "var", varset([
  function () {
    return textq("Describe how the contributions of Copernicus, Galileo and Kepler together changed the description of the solar system from the Earth centred account of Aristotle and Ptolemy. Refer to all three contributors. (3 marks)",
      ["Copernicus proposed the Sun centred arrangement", "Galileo used telescopic observations, including Jupiter's moons", "Kepler determined that planets follow elliptical paths"],
      "<b>Model answer:</b> Aristotle and Ptolemy described an Earth centred system with bodies moving in perfect circles around Earth. Copernicus proposed in 1543 that Earth and the planets revolve around the Sun instead. Galileo applied careful telescopic observation to astronomy and found moons orbiting Jupiter, direct evidence that not everything orbits Earth, which supported the Sun centred account. Kepler determined that the planets follow elliptical paths rather than perfect circles, correcting the shape of the orbits in the new description.<br><br><b>Marking points:</b> 1 mark for Copernicus and the Sun centred proposal. 1 mark for Galileo, the telescope and Jupiter's moons as evidence. 1 mark for Kepler and elliptical orbits replacing perfect circles.",
      {});
  }
]), ["Give each contributor one clear job in the change.", "Centre, evidence, orbit shape: one for each name."]);

E("s9-u1-sun-makeup", 1, ["SC9.1.3"], 1, "var", varset([
  function () {
    return mcq("What is the Sun mostly made of, and which features belong to it?",
      "Mostly hydrogen and helium gas, with sunspots, solar flares and prominences",
      ["Mostly molten rock and iron, with sunspots, solar flares and prominences", "Mostly hydrogen and oxygen liquid, with craters, rings and prominences", "Mostly helium and carbon solid, with sunspots, rings and craters"],
      "The Sun is a star made mostly of hydrogen and helium. The guide limits discussion of the Sun to its characteristics: sunspots (cooler, darker patches), solar flares (sudden releases of energy) and solar prominences (great loops and arcs of gas). Rings and craters belong to planets and moons, not to the Sun.",
      {});
  }
]), ["The Sun is a star, so think gases, not rock.", "Two light gases make up most of the Sun."]);

E("s9-u1-planet-groups", 1, ["SC9.1.3"], 1, "var", varset([
  function () {
    return mcq("Which comparison of the two planet groups is correct?",
      "Terrestrial planets are small, rocky and dense, close to the Sun; Jovian planets are large, gaseous and less dense, far from the Sun",
      ["Jovian planets are small, rocky and dense, close to the Sun; terrestrial planets are large and gaseous", "Terrestrial planets are large, gaseous and less dense, far from the Sun; Jovian planets are small and rocky", "Both groups are the same size and density; only their distances from the Sun differ"],
      "The four inner terrestrial planets are small, rocky, dense and relatively warm, with small orbits close to the Sun. The four outer Jovian planets are large, composed mainly of gas, less dense and cold, with large orbits far from the Sun. Size, composition, density, temperature and distance all separate the groups the same way.",
      {});
  }
]), ["Line up the contrasts: inner means small and rocky, outer means large and gaseous.", "Distance, size, composition and density all point the same way."]);

E("s9-u1-planet-table-figure", 1, ["SC9.1.3"], 1, "var", varset([
  function () {
    var q = mcq("The table gives data for two planets. Planet P is small with a high density and a short orbital period; Planet Q is very large with a low density and a long orbital period. Which classification fits?",
      "P is terrestrial and Q is Jovian",
      ["P is Jovian and Q is terrestrial", "Both planets are terrestrial, because both have solid surfaces", "Both planets are Jovian, because both orbit the same star"],
      "Density is the giveaway in the table. A small, dense planet with a short period is rocky and close to its star: terrestrial. A very large, low density planet with a long period is gaseous and far out: Jovian. The data rows, not the letters, carry the classification.",
      {});
    q.figure = s9u1PlanetTableSVG();
    return q;
  }
]), ["Read the density row first, then check size and period against it.", "High density means rocky; low density at large size means gas."]);

E("s9-u1-dwarf-pluto", 1, ["SC9.1.3"], 1, "var", varset([
  function () {
    return mcq("Why is Pluto classified as a dwarf planet rather than a planet?",
      "It is small and shares its orbital neighbourhood with many other icy bodies instead of dominating it",
      ["It has no moons of its own, while every planet has at least one moon travelling with it", "It is made of gas throughout, while every planet is made of rock throughout, with no gas at all", "It does not orbit the Sun at all, while every planet follows a regular orbit around the Sun"],
      "Pluto orbits the Sun and is round under its own gravity, but it is small and its orbital zone is shared with many other icy bodies of the Kuiper region; it does not dominate its neighbourhood the way the eight planets do. That is why astronomers reclassified it as a dwarf planet. Pluto does have moons, so that option fails on fact.",
      {});
  }
]), ["Pluto passes some planet tests and fails one. Which one?", "Think about what else shares Pluto's orbital neighbourhood."]);

E("s9-u1-comet-tail", 1, ["SC9.1.3"], 2, "var", varset([
  function () {
    return mcq("A comet is faintest and has no visible tail when far from the Sun, then grows a bright tail as it approaches the Sun. What causes the tail?",
      "Solar radiation heats the comet, and dust and ice are driven off it to form the tail",
      ["Earth's gravity pulls loose ice off the comet as it passes nearby", "The comet collides with asteroids, and the debris trails behind it", "The comet spins faster near the Sun, and loose material flies off it"],
      "A comet is often compared to a dirty snowball of ice and dust. Far from the Sun it stays frozen and faint. Near the Sun, solar radiation heats it, ice and dust are lost from it, and that material forms one or more tails. The tail is a product of heating, not of collisions or gravity from Earth.",
      {});
  }
]), ["The tail appears with closeness to the Sun. What does the Sun do to ice?", "Dirty snowball plus heat: material leaves the comet."]);

E("s9-u1-small-bodies", 1, ["SC9.1.3"], 3, "var", varset([
  function () {
    return mcq("A bright streak flashes across the sky and burns out, while on the same night a telescope shows a rocky body orbiting between Mars and Jupiter. Which identification is correct?",
      "The streak is a meteor: a meteoroid burning in the atmosphere; the orbiting body is an asteroid",
      ["The streak is an asteroid burning in the atmosphere; the orbiting body is a meteor", "Both are meteorites, because both are made of rock", "Both are comets, because both are seen moving in the sky"],
      "The three terms are separated by location. Meteoroids are debris travelling in space. A meteor is the trail seen when a meteoroid enters the atmosphere and burns. A meteorite is the portion that survives and reaches the ground. Asteroids are larger rocky bodies in orbit, most of them in the belt between Mars and Jupiter.",
      {});
  }
]), ["Sort by location: in space, in the atmosphere, on the ground, or in the belt.", "A streak in the sky is the atmosphere stage of the sequence."]);

E("s9-u1-comet-period", 1, ["SC9.1.3"], 3, "var", varset([
  function () {
    return mcq("Halley's Comet returns about every 76 years and its return was the first to be predicted, while another comet is not expected back for thousands of years. Which statement correctly uses periodicity for these comets?",
      "Halley's is a short period comet and the other is a long period comet; periodicity is the regular interval between a comet's returns",
      ["Both are short period comets, because both eventually return to the inner solar system on a regular cycle that observers can record", "Halley's is a long period comet because 76 years is a long human lifetime, and the categories are set by how the interval feels to people", "Periodicity describes how bright a comet becomes at its closest approach to the Sun, when its tail is at its longest and brightest"],
      "Periodicity is the repeating pattern in a comet's passage by the Sun and Earth. Comets are separated into short period and long period categories on that interval, which also reflects their origin and composition. A return measured in decades is short on the comet scale; one measured in thousands of years is long.",
      {});
  }
]), ["Periodicity is about the interval between returns, not brightness.", "76 years against thousands of years: short against long."]);

E("s9-u1-classify-gen", 1, ["SC9.1.3"], 2, "gen", function () {
  var cases = [
    { d: "a planet with a diameter of 12,000 km, a density of 5.2 g/cm3, a rocky surface and an orbital period of 1.1 years", k: "Terrestrial: small, dense and rocky, with a short orbital period close to the Sun", w: ["Jovian: large, low density and gaseous, with a long orbital period", "A dwarf planet: it has not cleared its orbital neighbourhood", "Terrestrial: large, low density and gaseous, with a long orbital period"] },
    { d: "a planet with a diameter of 140,000 km, a density of 0.7 g/cm3, no solid surface and an orbital period of 11.9 years", k: "Jovian: large, low density and gaseous, with a long orbital period far from the Sun", w: ["Terrestrial: small, dense and rocky, with a short orbital period", "A dwarf planet: it is round but shares its orbit with many bodies", "Jovian: small, dense and rocky, with a short orbital period"] },
    { d: "a planet with a diameter of 6,800 km, a density of 3.9 g/cm3, a rocky surface and an orbital period of 1.9 years", k: "Terrestrial: small, dense and rocky, with a short orbital period close to the Sun", w: ["Jovian: large, low density and gaseous, with a long orbital period", "A dwarf planet: it has not cleared its orbital neighbourhood", "Terrestrial: large, low density and gaseous, with a long orbital period"] }
  ];
  var c = pick(cases);
  return mcq("Use the supplied data to classify this planet: " + c.d + ". Which classification and reasoning are correct?",
    c.k, c.w,
    "Classification uses the whole data set together, in the spirit of the Design Your Own Planet comparison of inner and outer planets. Terrestrial planets are small, dense, rocky and close to the Sun with short periods. Jovian planets are large, low density, gaseous and far out with long periods. Density and composition decide first; size and period confirm.",
    {});
}, ["Density is the deciding measurement: high means rocky, low at large size means gas.", "Check that size, density, surface and period all tell the same story."]);

E("s9-u1-cr-classify", 1, ["SC9.1.3"], 2, "var", varset([
  function () {
    return textq("A newly described planet is smaller than Saturn, much denser than Saturn, rocky, and closer to its star with a shorter orbital period. Classify the planet as terrestrial or Jovian and justify the classification with two reasons drawn from the data. (3 marks)",
      ["terrestrial", "higher density means rocky and metallic composition", "smaller size and shorter period close to the star fit the terrestrial pattern"],
      "<b>Model answer:</b> The planet is terrestrial. Its much higher density points to a rocky and metallic composition, since Jovian planets like Saturn are mostly gas and have low densities. Its smaller size also fits the terrestrial pattern, because Jovian planets are large. Its position closer to its star, with a shorter orbital period, matches the inner terrestrial planets rather than the distant Jovian group. (Any two of the density, size and distance reasons, developed, earn the justification marks.)<br><br><b>Marking points:</b> 1 mark for the terrestrial classification. 1 mark for the density and composition reason. 1 mark for a second reason (size, or distance and period) tied to the group pattern.",
      {});
  }
]), ["Classify first, then mine the data for two reasons that point the same way.", "Density is the strongest reason. Find one more."]);

E("s9-u1-solar-wind", 1, ["SC9.1.4"], 1, "var", varset([
  function () {
    return mcq("What is the solar wind?",
      "A stream of charged particles flowing outward from the Sun",
      ["A movement of air in the Sun's visible surface layer", "Radiation pressure that pushes comets into new orbits", "A wind in Earth's upper atmosphere caused by tides"],
      "The solar wind is a stream of charged particles flowing out from the Sun in all directions. When those particles reach Earth, Earth's magnetic field guides many of them toward the polar regions. It is a particle stream from the Sun, not a wind in any atmosphere.",
      {});
  }
]), ["The name is misleading: nothing here is air.", "Charged particles, flowing outward from the Sun."]);

E("s9-u1-aurora", 1, ["SC9.1.4"], 2, "var", varset([
  function () {
    return mcq("On a night of strong solar activity, observers in Newfoundland see shimmering curtains of light high in the sky. What is this phenomenon and what produces it?",
      "An aurora (the aurora borealis in the north), produced when charged particles from the Sun interact with gases in Earth's upper atmosphere",
      ["An aurora, produced when moonlight reflects off ice crystals in high clouds and spreads into curtains of colour", "A solar prominence, produced when great loops of glowing gas rise off the Sun's surface and hang in space above it", "A meteor shower, produced when debris from a comet burns up high in the atmosphere over a wide area on a single night"],
      "Auroras are the northern lights (aurora borealis) and southern lights (aurora australis). Charged particles carried by the solar wind are channelled by Earth's magnetic field toward the poles, where they interact with gases high in the atmosphere and make them glow. Stronger solar activity makes auroras stronger and visible farther from the poles.",
      {});
  }
]), ["The lights are high, polar and linked to solar activity.", "Charged particles plus upper atmosphere gases, near the poles."]);

E("s9-u1-comms-effect", 1, ["SC9.1.4"], 3, "var", varset([
  function () {
    return mcq("A period of intense sunspot and flare activity is followed by radio interference, satellite problems and a bright aurora. A student claims the events must be coincidence because the Sun is too far away to affect technology. Which evaluation is correct?",
      "The claim is wrong: solar activity affects Earth systems, disturbing radio communications and satellites and driving auroras, as the guide describes",
      ["The claim is right: the Sun affects Earth only through the light and heat that reach us, and nothing else the Sun does can touch systems on Earth", "The claim is wrong only about auroras, which solar activity can produce, while radio communications and satellites are far too well shielded to be affected", "The claim is right, because sunspots are cooler patches on the Sun, and a cooler patch means a weaker Sun whose activity cannot reach as far as Earth"],
      "The Sun influences almost all natural phenomena on Earth and reaches technology as well. Solar flares and the solar wind disturb electromagnetic conditions around Earth, which interferes with radio and television signals and with satellites, and the same activity drives auroras. Sunspots mark an active Sun, and their roughly 11 year cycle of activity is part of the pattern.",
      {});
  }
]), ["The question itself lists three effects arriving together. Coincidence has to explain all three.", "Solar activity travels: particles and radiation both reach Earth."]);

E("s9-u1-cr-solar", 1, ["SC9.1.4"], 2, "var", varset([
  function () {
    return textq("Explain how solar phenomena reach Earth and affect life and technology here. Refer to solar radiation, the solar wind and auroras in your answer. (3 marks)",
      ["solar radiation supplies the energy that drives life and weather on Earth", "the solar wind carries charged particles that can disturb communications", "auroras occur when charged particles interact with the upper atmosphere near the poles"],
      "<b>Model answer:</b> Solar radiation is the Sun's energy reaching Earth; it is the energy source for green plants and drives weather, so almost all life depends on it. The solar wind streams charged particles outward from the Sun; when activity is strong, those particles and the disturbances with them interfere with radio and other electromagnetic communications and with satellites. Some particles are guided by Earth's magnetic field toward the poles, where they interact with gases high in the atmosphere and produce auroras, the northern and southern lights.<br><br><b>Marking points:</b> 1 mark for solar radiation as Earth's energy source for life (and weather). 1 mark for the solar wind's charged particles disturbing communications or satellites. 1 mark for auroras correctly produced near the poles by particles meeting upper atmosphere gases.",
      {});
  }
]), ["One mark rides on each named phenomenon. Give each its own sentence or two.", "Radiation feeds life; the wind disturbs technology; together they light the poles."]);

E("s9-u1-bigbang", 1, ["SC9.1.5"], 1, "var", varset([
  function () {
    return mcq("Which statement describes the Big Bang Theory as the guide presents it?",
      "About 13.7 billion years ago all the matter of the universe was compressed into a hot, dense mass, which then expanded, and the universe is still expanding",
      ["The universe has always existed at exactly its present size and is not changing in any way, with the same matter spread through the same space forever", "The universe expands from a cool, thin beginning to a maximum size and then contracts again into a hot Big Crunch, after which nothing remains", "Galaxies formed first, fully made, and then exploded outward in every direction from a single central galaxy, with the universe beginning at that explosion"],
      "The Big Bang Theory rests on evidence for an expanding universe: if galaxies are moving apart now, the universe must have been more compact earlier. Scientists estimate the present matter of the universe was compressed into a hot, dense mass about 13.7 billion years ago and began moving outward, and the expansion continues today.",
      {});
  }
]), ["Anchor on two numbers and one direction: 13.7 billion years, expanding.", "Still expanding now is the Big Bang picture in this course."]);

E("s9-u1-oscillating", 1, ["SC9.1.5"], 2, "var", varset([
  function () {
    return mcq("How does the Oscillating Theory differ from the Big Bang Theory in its account of the universe's future?",
      "The Oscillating Theory has expansion eventually reversing under gravity into contraction (a Big Crunch) followed by another expansion; the Big Bang account has expansion continuing",
      ["The Oscillating Theory says the universe will shrink steadily toward a final collapse without ever having expanded; the Big Bang account describes the same one-way shrinking throughout", "The Big Bang Theory has the universe contracting now toward an eventual Big Crunch; the Oscillating Theory has it expanding now and continuing to expand at a steady rate forever", "The two theories differ only in the age they give for the universe, the Big Bang account placing its beginning much earlier; on the universe's future the two accounts agree completely"],
      "Both theories start from an expanding universe. They part on the future. In the Oscillating Theory, gravitational attraction among stars and galaxies eventually halts the expansion and pulls the universe back into contraction, ending in a Big Crunch that may be followed by another Big Bang, in cycles. The Big Bang account as presented has the expansion continuing.",
      {});
  }
]), ["Both agree on the past. The difference is the future.", "Cycles of expansion and contraction are the oscillating idea."]);

E("s9-u1-expansion-evidence", 1, ["SC9.1.5"], 3, "var", varset([
  function () {
    return mcq("A teacher inflates a balloon dotted with marker spots and asks what the model shows and where it misleads. Which answer is best?",
      "It shows galaxies (the spots) moving apart as the universe expands; it misleads if students think the universe expands into the room around the balloon, since the model only represents the surface",
      ["It shows galaxies growing larger as the universe expands; the spots themselves stretch and swell, and it misleads only if students think real galaxies stay the same size as they move apart", "It shows the universe expanding outward from the balloon's centre point into the room around it, and it misleads only about how fast the expansion happens, not about its pattern of galaxies moving apart", "It misleads in every respect, because a real universe has no surface and no centre, so the model should not be used in teaching at all and students should rely on diagrams of galaxies instead"],
      "In the balloon model the spots stand for galaxies and the stretching surface stands for expanding space: every spot moves away from every other as inflation proceeds, matching the evidence that galaxies recede from one another. The model misleads about a centre and about expanding into something outside; in the theory the expansion is of the universe itself, and the spots should not grow, only their separations do.",
      {});
  }
]), ["In the model, what grows: the spots, or the distances between them?", "Distances grow; galaxies themselves do not inflate."]);

E("s9-u1-cr-universe", 1, ["SC9.1.5"], 2, "var", varset([
  function () {
    return textq("Describe the Big Bang Theory and the Oscillating Theory, and state one way the two theories agree and one way they differ. (3 marks)",
      ["Big Bang: the universe began hot and dense about 13.7 billion years ago and has expanded since", "Oscillating: expansion reverses into contraction and a Big Crunch, in cycles", "they agree the universe is expanding now; they differ on the future"],
      "<b>Model answer:</b> The Big Bang Theory holds that the matter of the universe was compressed into a hot, dense mass about 13.7 billion years ago, that it began expanding, and that the universe is still expanding today, as the movement of galaxies apart shows. The Oscillating Theory accepts an expanding phase but holds that gravity will eventually halt it and pull the universe back into contraction, ending in a Big Crunch that may be followed by another expansion, in repeating cycles. The theories agree that the universe expanded from a compact beginning and is expanding now; they differ on the future, endless expansion against eventual contraction.<br><br><b>Marking points:</b> 1 mark for the Big Bang description with its hot, dense beginning and continuing expansion. 1 mark for the Oscillating description with contraction and cycles. 1 mark for a correct agreement and a correct difference.",
      {});
  }
]), ["Structure the answer as two descriptions, then one agreement and one difference.", "Both start the same way. Only the ending separates them."]);

E("s9-u1-nebular", 1, ["SC9.1.6"], 1, "var", varset([
  function () {
    return mcq("Which statement describes the Nebular Hypothesis for the formation of the solar system?",
      "The solar system formed from a great cloud of gas and dust (a nebula) that contracted under gravity, spun, flattened, and formed the Sun and planets",
      ["The solar system formed when a passing star pulled a stream of hot material out of the Sun, and that material cooled into the planets", "The solar system formed when two stars collided head on, and the debris from the collision settled into orbit as the Sun and planets", "The planets formed first, wandering alone in space, and then captured the Sun as it passed by and settled into orbit around it together"],
      "The Nebular Hypothesis is the present leading account: a nebula of gas and dust contracted under its own gravity, spun faster as it shrank, flattened into a disc, and formed the Sun at the centre with the planets forming from the disc material around it. The collision accounts are the older alternatives.",
      {});
  }
]), ["Nebular points to a nebula: a cloud. Follow the cloud's story.", "Cloud, contraction, spin, disc, Sun and planets."]);

E("s9-u1-stellar-collision", 1, ["SC9.1.6"], 1, "var", varset([
  function () {
    return mcq("Which statement describes the Stellar Collision Theory?",
      "A passing or colliding star's gravity drew material out of the Sun, and that material formed the planets",
      ["A cloud of gas and dust contracted under gravity and formed the Sun and planets together", "The planets condensed directly from a nebula without any star being involved", "Two nebulae merged and their combined gas formed two solar systems"],
      "The Stellar Collision Theory is an earlier account in which a star passing close to, or colliding with, the Sun pulled out a stream of material that cooled and formed the planets. It differs from the Nebular Hypothesis, in which the Sun and planets form together from one contracting cloud.",
      {});
  }
]), ["Collision means another star must be in the story.", "Ask where the planet material comes from in each option."]);

E("s9-u1-nebular-evidence", 1, ["SC9.1.6"], 2, "var", varset([
  function () {
    return mcq("Which observation is most naturally explained by the Nebular Hypothesis?",
      "All the planets revolve around the Sun in the same direction and in nearly the same flat plane",
      ["Each planet revolves in a different direction and in a randomly tilted plane", "The planets are arranged with the largest planet closest to the Sun", "No planet rotates on its axis; all keep the same face to the Sun"],
      "A disc explains a flat, orderly system. If the Sun and planets formed from one spinning, flattened cloud, the planets should inherit the disc's motion: revolution in the same direction, in nearly the same plane. That shared pattern is exactly what is observed, and a chance collision account does not predict it as naturally.",
      {});
  }
]), ["A flattened spinning disc leaves a fingerprint on the finished system. What is it?", "Same direction, same plane: the disc's signature."]);

E("s9-u1-theories-change", 1, ["SC9.1.6"], 3, "var", varset([
  function () {
    return mcq("The Stellar Collision Theory was once seriously considered and is now set aside in favour of the Nebular Hypothesis. Which statement best explains what that change shows about scientific theories?",
      "Theories are reworked or abandoned when new observations cannot be fitted into them, and kept while they explain the evidence well",
      ["Theories are abandoned whenever a newer one is proposed by a respected scientist, regardless of how the evidence compares", "The change proves the earlier scientists were careless in their work and that their observations were never worth trusting", "Once a theory is printed in a textbook it can no longer be changed, because printing fixes it as settled knowledge for good"],
      "Theories about the origin of the solar system change and evolve as evidence accumulates. Observations are checked for accuracy; if new information can be incorporated, the theory is reworked, and if it cannot, the theory is abandoned for one that explains both the old and the new observations. Being replaced is how science corrects itself, not evidence of carelessness.",
      {});
  }
]), ["Follow the evidence rule: fit the new observations, or be replaced.", "A theory's job is to explain observations, old and new alike."]);

E("s9-u1-nebula", 1, ["SC9.1.7"], 1, "var", varset([
  function () {
    return mcq("What is a nebula, in the classification of the universe's components?",
      "A cloud of dust, hydrogen gas and plasma from which stars generally form",
      ["A galaxy with spiral arms extending from a central bulge", "A collapsed core in which gravity is too strong for light to escape", "A distant, extremely bright object powered by a supermassive black hole"],
      "A nebula is a great cloud of dust, hydrogen gas and plasma. Stars generally form from the material of nebulae as gravity draws the cloud together. Galaxies are far larger collections of stars, black holes are collapsed objects, and quasars are brilliant distant objects at galaxy centres.",
      {});
  }
]), ["Nebula is the starting material in the star story.", "Clouds of gas and dust come first; stars form from them."]);

E("s9-u1-galaxy-types", 1, ["SC9.1.7"], 1, "var", varset([
  function () {
    return mcq("Which pairing of galaxy type with its description is correct?",
      "Spiral galaxy: a flat rotating disc with arms extending from a central bulge, like the Milky Way; elliptical galaxy: a smooth oval collection of stars without spiral arms",
      ["Elliptical galaxy: a flat rotating disc with arms extending from a central bulge; spiral galaxy: a smooth oval collection of stars without spiral arms, spread evenly throughout", "Spiral galaxy: a single large star surrounded by a family of planets; elliptical galaxy: a loose cloud of gas and dust from which stars have yet to form", "Both types are identical in shape and structure, built the same way throughout, except for the colour of their stars and the age of those stars"],
      "Galaxies are massive collections of stars, gas and dust held together by gravity. Spiral galaxies, including our Milky Way, have a central bulge and arms winding out through a flat disc. Elliptical galaxies are smooth, oval systems without arms and typically hold older stars.",
      {});
  }
]), ["The Milky Way is the named example. Which type is it?", "Arms mean spiral; a smooth oval means elliptical."]);

E("s9-u1-quasar", 1, ["SC9.1.7"], 3, "var", varset([
  function () {
    var q = mcq("The table lists objects by relative size and energy output. One entry is galaxy sized in its surroundings yet outshines its whole galaxy from a tiny central region. Which component of the universe fits that entry, and why?",
      "A quasar: an extremely bright, distant object powered by a supermassive black hole at a galaxy's centre",
      ["A low mass star: a small, long lived star that outshines its whole galaxy from its position at the centre", "A nebula: a vast gas cloud that outshines its whole galaxy as it collapses inward under gravity", "An intermediate mass star: a Sun like star sitting at a galaxy's centre and outshining everything around it"],
      "Quasars are among the most powerful objects in the universe: tiny central regions, powered by supermassive black holes, that emit enormous amounts of energy and can outshine the entire galaxy around them. No single ordinary star, of any mass class, outshines a galaxy, and a nebula is a dim cloud by comparison. The table's combination of small size and extreme output is the quasar signature.",
      {});
    q.figure = s9u1StarTableSVG();
    return q;
  }
]), ["Small region, galaxy beating output: no ordinary star does that.", "The energy source named for quasars is a supermassive black hole."]);

E("s9-u1-star-life", 1, ["SC9.1.7"], 3, "var", varset([
  function () {
    return mcq("Star A has many times the Sun's mass and burns through its fuel quickly. Star B has less mass than the Sun and burns its fuel very slowly. Which futures fit the two stars?",
      "A ends in a supernova and may leave a black hole; B lives for billions of years and ends quietly as a white dwarf",
      ["A ends quietly as a white dwarf after a long life; B ends in a supernova and may leave a black hole", "Both end in supernovae, because all stars end in exactly the same way whatever their mass or fuel supply", "Both become quasars, because quasars are the end stage that every star of every mass eventually reaches"],
      "Mass decides a star's life. High mass stars burn fuel fast, live short lives, and end in supernova explosions, potentially leaving black holes. Low mass stars burn slowly, live for billions of years, and end as white dwarfs. Intermediate mass stars like the Sun also end as white dwarfs after shedding their outer layers. The futures swap if the masses swap, which is the error in the reversed option.",
      {});
  }
]), ["Mass sets both the pace of burning and the ending.", "Big and fast burning goes with the violent ending."]);

E("s9-u1-star-mass-gen", 1, ["SC9.1.7"], 2, "gen", function () {
  var cases = [
    { d: "a star with 15 times the mass of the Sun", k: "A high mass star: it burns fuel quickly, shines very brightly and has a short life", w: ["A low mass star: it burns fuel slowly and lives for billions of years", "An intermediate mass star: it burns fuel at a moderate rate like the Sun", "A quasar: it is powered by a supermassive black hole"] },
    { d: "a star with about the same mass as the Sun", k: "An intermediate mass star: it burns fuel at a moderate rate and ends as a white dwarf", w: ["A high mass star: it burns fuel quickly and ends in a supernova", "A low mass star: it is far smaller than the Sun and burns slowest of all", "A black hole: its gravity lets no light escape"] },
    { d: "a star with half the mass of the Sun", k: "A low mass star: it burns fuel very slowly and can live for billions of years", w: ["A high mass star: it burns fuel quickly and has a short life", "An intermediate mass star: it matches the Sun in mass and lifespan", "A nebula: it is a cloud of gas and dust from which stars form"] }
  ];
  var c = pick(cases);
  return mcq("Classify this star and state its expected behaviour: " + c.d + ".",
    c.k, c.w,
    "Stars are classified by mass, and mass sets the pace of a star's life. High mass stars burn through their fuel quickly, shine brightly and live briefly. Intermediate mass stars like the Sun burn at a moderate rate. Low mass stars burn so slowly that they can live for billions of years. Bigger means brighter and shorter lived, which is the opposite of the first guess many students make.",
    {});
}, ["Compare the mass with the Sun first: well above, about equal, or below.", "More mass means faster burning and a shorter life."]);

E("s9-u1-cr-components", 1, ["SC9.1.7"], 2, "var", varset([
  function () {
    return textq("Classify the major components of the universe by describing a nebula, the two galaxy types, and the three star mass classes, and state where black holes and quasars fit. (3 marks)",
      ["a nebula is a cloud of gas and dust where stars form", "spiral galaxies have arms and a central bulge; elliptical galaxies are smooth ovals", "high, intermediate and low mass stars differ in burning rate and lifespan; black holes are collapsed remnants and quasars are brilliant galaxy centres"],
      "<b>Model answer:</b> A nebula is a cloud of dust, hydrogen gas and plasma from which stars form. Galaxies are great collections of stars: spiral galaxies have a flat disc with arms extending from a central bulge (the Milky Way is one), while elliptical galaxies are smooth oval systems without arms. Stars are classed by mass: high mass stars burn fuel quickly and end in supernovae, intermediate mass stars like the Sun burn moderately and end as white dwarfs, and low mass stars burn slowest and live longest. Black holes are regions where gravity is so strong that light cannot escape, formed from collapsed massive stars (and, at galaxy centres, supermassive ones), and quasars are the extremely bright objects powered by those central supermassive black holes.<br><br><b>Marking points:</b> 1 mark for the nebula and both galaxy types described. 1 mark for the three star mass classes contrasted. 1 mark for black holes and quasars placed correctly.",
      {});
  }
]), ["Work from the largest structures down, in a set order.", "Cloud, galaxies, stars by mass, then the collapsed and brilliant extremes."]);

E("s9-u1-nav-personal", 1, ["SC9.2.1"], 1, "var", varset([
  function () {
    return mcq("For centuries, sailors crossing the Atlantic used the positions of stars to find their direction and latitude. Which statement best relates that endeavour to everyday life today?",
      "Celestial navigation is the same knowledge of celestial motion that modern travellers still rely on through satellite positioning, which is fixed by reference to objects beyond Earth",
      ["Celestial navigation ended completely with the age of sail and has no connection to any present activity, since modern travellers find their way without any reference to the sky", "Star positions are now used only by astronomers studying the sky and by no one else at all, since ordinary travellers have no reason to look beyond Earth for finding their way", "Modern navigation uses only land based signals from towers and stations, with no reference to space at all, so the old star knowledge plays no part in it today for travellers"],
      "The Core STSE on celestial navigation connects a personal and practical activity, finding your way, to a scientific endeavour built on the apparent motion of celestial bodies. Satellite positioning is its direct descendant: the same need, met by space based technology whose positions are known relative to the wider sky. The endeavour did not vanish; it changed instruments.",
      {});
  }
]), ["The activity is finding your way. What carries it today?", "Old method: stars. New method: satellites in space."]);

E("s9-u1-endeavour-link", 1, ["SC9.2.1"], 2, "var", varset([
  function () {
    return mcq("A student checks a weather forecast before a fishing trip, glances at a satellite image of an approaching storm, and later uses a positioning app to return to a favourite fishing mark. Which statement best describes these activities?",
      "Each activity depends on a space based scientific or technological endeavour: weather satellites supply the images and positioning satellites supply the location",
      ["Only the positioning app counts, because forecasts and storm images come from local weather offices alone, working from their own ground observations", "None of them counts as using a space endeavour, because the student never left the ground and handled no space technology during the trip at all", "Each activity depends only on the student's own observations of the sky and the weather, gathered from the shore with no instruments in space involved"],
      "Relating personal activities to scientific and technological endeavours means tracing the hidden space contribution. The forecast's storm image comes from weather satellites, and the positioning fix comes from navigation satellites. Ground offices distribute the products, but the data originate in space based systems the student uses without thinking about them.",
      {});
  }
]), ["Trace each product back to where its data comes from.", "Forecast images and position fixes both start with satellites."]);

E("s9-u1-telescope-science", 1, ["SC9.2.2"], 1, "var", varset([
  function () {
    return mcq("Which statement describes the science underlying a reflecting telescope?",
      "Mirrors gather light and bring it to a focus, using the properties of light, so faint and distant objects can be observed",
      ["Lenses bend radio waves to a focus, using the properties of sound, so silent objects in space can be heard", "Mirrors gather heat from the object and store it, using chemical reactions, so cold objects slowly warm up", "A motor spins the tube steadily so that gravity itself focuses the light arriving from distant objects"],
      "Telescopes rest on the science of light. A reflecting telescope uses a curved mirror to gather light from a faint object and bring it to a focus; a refracting telescope does the same job with lenses. Radio telescopes apply the same gathering idea to radio waves, a different part of the electromagnetic radiation family. Each technology is an application of the properties of light and radiation.",
      {});
  }
]), ["Name the science first: this instrument is about light.", "Mirrors and lenses both work on light."]);

E("s9-u1-propulsion-science", 1, ["SC9.2.2"], 3, "var", varset([
  function () {
    return mcq("A rocket rises because hot gases are expelled downward at high speed. Which statement best describes the science underlying rocket propulsion, drawing on the disciplines the guide names?",
      "Chemistry supplies the energetic reaction that produces the gas, and physics (forces) explains the thrust that pushes the rocket opposite to the exhaust",
      ["Biology supplies the organisms that produce the fuel, and optics, the science of light, explains the thrust that lifts the rocket off the pad", "Chemistry explains the thrust directly through its reactions alone, and no forces of any kind are involved in lifting the rocket off the ground", "Physics produces the exhaust gas in the combustion chamber, and chemistry explains the direction the rocket travels as it rises into the sky"],
      "Rocket propulsion is the guide's example of disciplines combining. The propellant's chemical reaction releases energy and produces a large volume of hot gas; the physics of forces does the rest, as the exhaust is forced downward and the rocket is pushed upward. Neither discipline alone accounts for the whole technology.",
      {});
  }
]), ["Two sciences, two jobs: making the gas, and explaining the push.", "Reaction from chemistry; thrust from forces in physics."]);

E("s9-u1-cr-tech-science", 1, ["SC9.2.2"], 2, "var", varset([
  function () {
    return textq("Choose two technologies designed to explore space and describe the science underlying each one. (3 marks)",
      ["any two of rocket propulsion, telescopes, radio telescopes, satellites, probes, rovers, space suits", "the science correctly stated for each chosen technology"],
      "<b>Model answer:</b> Rocket propulsion rests on chemistry and physics: a chemical reaction produces a large volume of hot gas, and the force that expels the gas downward thrusts the rocket upward. A reflecting telescope rests on the properties of light: a curved mirror gathers light from a faint, distant object and brings it to a focus so the object can be studied. (Other pairings earn full credit when the science is right: radio telescopes and electromagnetic radiation, space suits and pressure, temperature and gases, probes and rovers and the sciences of their instruments.)<br><br><b>Marking points:</b> 1 mark for two suitable technologies named. 1 mark for the science underlying the first, correctly described. 1 mark for the science underlying the second, correctly described.",
      {});
  }
]), ["Pick technologies whose science you can state precisely.", "Name the technology, then name its science, twice."]);

E("s9-u1-canadarm", 1, ["SC9.2.3"], 1, "var", varset([
  function () {
    return mcq("Which set names Canadian contributions to space research and exploration?",
      "Canadarm, Canadarm2 (the Space Station Remote Manipulator System) and Dextre (the Special Purpose Dexterous Manipulator)",
      ["The Hubble Space Telescope, the Apollo lunar module and the Voyager probes that left the solar system for deep space", "Canadarm, the Apollo lunar module flown to the Moon, and Dextre, the station's dexterous manipulator in orbit", "The International Space Station alone, designed, built and operated by Canada entirely by itself, with no partners"],
      "Canada's signature contributions are robotic: Canadarm flew on the space shuttles, Canadarm2 is the Space Station Remote Manipulator System that assembled and services the International Space Station, and Dextre is the station's dexterous manipulator, sometimes called Canadahand. The station itself is an international partnership, not a Canadian solo project.",
      {});
  }
]), ["Canada's space signature is robotics. Look for the arm family.", "Canadarm, Canadarm2, Dextre: one family of contributions."]);

E("s9-u1-astronauts", 1, ["SC9.2.3"], 2, "var", varset([
  function () {
    return mcq("A poster claims Canada's role in space is minor because Canada has never launched its own crewed spacecraft. Which response best corrects the poster using this indicator's examples?",
      "Canada contributes through partnership: Canadian astronauts such as Roberta Bondar, Marc Garneau and Chris Hadfield have flown, and Canadian robotics are essential to the International Space Station",
      ["The poster is correct, because partnership work does not count as real involvement in space, and only countries that launch their own crewed spacecraft play a genuine role in exploration", "Canada's role is major because it operates the International Space Station alone, supplying its crew, its funding and all of its robotics without any partner countries taking part", "The poster is wrong because Canada launches its own crewed spacecraft every year from its own spaceport, sending Canadian crews into orbit on Canadian rockets on regular missions"],
      "Participating in space exploration does not require launching your own crewed missions. Canada, through the Canadian Space Agency, is a partner in the International Space Station, supplies its robotics, and has sent astronauts including Roberta Bondar (the first Canadian woman in space), Marc Garneau (the first Canadian in space) and Chris Hadfield. Partnership is the form Canada's major role takes.",
      {});
  }
]), ["The correction needs examples, not just disagreement.", "Astronauts plus robotics plus the station partnership."]);

E("s9-u1-tech-id", 1, ["SC9.2.4"], 1, "var", varset([
  function () {
    return mcq("Which list contains only technologies designed to explore space?",
      "Probes, rovers, satellites, optical telescopes and radio telescopes",
      ["Probes, rovers, satellites, microscopes and radio telescopes", "Probes, submarines, satellites, optical telescopes and rovers", "Rovers, satellites, weather vanes, probes and optical telescopes"],
      "The guide's list of space exploration technologies is rocket propulsion, space suits, satellites, probes, rovers, optical telescopes and radio telescopes. Microscopes, submarines and weather vanes are built for Earth based work, however scientific they are.",
      {});
  }
]), ["Check every item on each list, not just the first.", "One wrong item disqualifies the whole list."]);

E("s9-u1-suit", 1, ["SC9.2.4"], 2, "var", varset([
  function () {
    return mcq("Why must a space suit be pressurised, insulated and supplied with oxygen as a single sealed system?",
      "Because space has no breathable air, no air pressure and extreme temperatures, so the suit must carry the astronaut's life support with it",
      ["Because gravity in space would otherwise pull the astronaut apart piece by piece during a long spacewalk outside the station", "Because sunlight in space is too dim for an astronaut to work safely without a sealed lamp and heating system built into the suit", "Because a suit's only job is protection from micrometeorites striking it, and everything else in its design is padding for comfort"],
      "A space suit is a personal spacecraft. Outside a station there is no air to breathe, no pressure to keep body fluids in their normal state, and temperatures swing between extremes in sunlight and shadow. The suit therefore supplies oxygen, holds pressure and insulates, all in one sealed system, which is why suit design draws on several sciences at once.",
      {});
  }
]), ["List what space does not provide. The suit must provide all of it.", "No air, no pressure, extreme temperatures: three gaps, one suit."]);

E("s9-u1-rover-probe-gen", 1, ["SC9.2.4"], 1, "gen", function () {
  var cases = [
    { d: "a craft that lands on a planet's surface and drives across it, testing rocks as it goes", k: "A rover", w: ["A probe", "A satellite", "A radio telescope"] },
    { d: "a craft that travels to a distant planet, flies past it or enters orbit around it, and sends data back without driving on the surface", k: "A probe", w: ["A rover", "A space suit", "An optical telescope"] },
    { d: "a craft placed in orbit around Earth that relays communications and observes the planet below", k: "A satellite", w: ["A probe", "A rover", "A space suit"] }
  ];
  var c = pick(cases);
  return mcq("Which space technology is described here: " + c.d + "?",
    c.k, c.w,
    "Each technology has a defining job. A rover lands and drives on a surface. A probe travels to its target and investigates from a flyby or orbit, sending data home. A satellite orbits a planet, usually Earth, on a continuing task such as communications or observation. Telescopes stay pointed at the sky; suits protect people.",
    {});
}, ["Ask where the craft works: driving on a surface, travelling to a target, or orbiting on task.", "Driving on the surface is the rover's signature."]);

E("s9-u1-remote-data", 1, ["SC9.2.5"], 1, "var", varset([
  function () {
    return mcq("Why do astronomical theories depend so heavily on new evidence from better instruments?",
      "Because astronomical data are collected remotely, from light and other radiation that reaches us, so better instruments literally supply new information about distant objects",
      ["Because astronomers are not permitted to state a theory about distant objects until a new and better telescope has been built to check it first, by rule of the profession", "Because distant objects change completely every few years, so every measurement ever taken of them must be discarded and the objects remeasured from the start", "Because theories about the universe are guesses that do not rest on data at all, and a new instrument simply gives astronomers a chance to guess again"],
      "Unlike bench sciences, astronomy cannot bring its objects into a lab. Its theories rest on data collected remotely, mainly the light and other radiation that arrives from distant objects. A better telescope, on Earth or in space, gathers more and sharper data, and that new evidence is what continually tests and revises theories about the composition and origin of the universe.",
      {});
  }
]), ["Key phrase: collected remotely. What follows from it?", "No samples, only signals: instruments are the supply line."]);

E("s9-u1-cr-evidence", 1, ["SC9.2.5"], 2, "var", varset([
  function () {
    return textq("Early photographs from a visiting spacecraft seemed to show a face on the surface of Mars. Later missions with better instruments showed a natural rock formation instead. Explain what this episode shows about the need for new evidence in astronomy. (3 marks)",
      ["astronomical data are collected remotely, so early data can be limited and misleading", "better instruments supplied clearer evidence", "theories and interpretations are retested and revised when new evidence arrives"],
      "<b>Model answer:</b> Astronomy collects its data remotely, from the light and images that reach our instruments, so early, low resolution evidence can support a mistaken interpretation, as the face like image did. When later spacecraft returned sharper images, the new evidence showed an ordinary rock formation lit at an angle, and the earlier interpretation was abandoned. The episode shows why existing ideas about the composition and origin of objects in the universe must be continually tested against new evidence: better instruments do not just add detail, they can overturn what the old evidence seemed to say.<br><br><b>Marking points:</b> 1 mark for remote data collection and its limits. 1 mark for better instruments supplying the decisive new evidence. 1 mark for the general conclusion: interpretations are retested and revised against new evidence.",
      {});
  }
]), ["Tell the episode in order, then state the general lesson it teaches.", "Old image, better image, changed conclusion: then generalise."]);

E("s9-u1-distance-chart-figure", 1, ["SC9.2.6"], 3, "var", varset([
  function () {
    var q = mcq("The chart places three distances on a common scale: Earth to the Moon (a small fraction of an AU), Earth to the Sun (1 AU), and Earth to the nearest star beyond the Sun (about 4.2 light years, roughly 270,000 AU). A student concludes that light years are only needed for science fiction, since AU worked for the first two distances. Which evaluation is correct?",
      "The conclusion fails at the third distance: expressing star distances in AU needs numbers in the hundreds of thousands, which is why the light year, the distance light travels in one year, is the practical unit beyond the solar system",
      ["The conclusion is correct, because AU and light years measure entirely different quantities, the AU measuring time and the light year measuring brightness, so the two can never be compared on one chart like this", "The conclusion fails because the Moon distance should be measured in light years instead of AU, since light years are the proper unit for every distance beyond Earth itself, including the nearest ones in space", "The conclusion is correct, because the nearest star is only a few AU away from Earth, well within the range where AU gives small, readable numbers, so no larger unit is ever needed for it or for any star"],
      "Both units measure distance. Within the solar system the AU, the average Earth to Sun distance, keeps numbers manageable. Beyond it, AU counts explode into the hundreds of thousands, so astronomers switch to the light year. The chart's third bar is the counterexample to the student's claim: the unit must fit the scale of the distance.",
      {});
    q.figure = s9u1DistanceSVG();
    return q;
  }
]), ["Compare the sizes of the numbers each unit forces on the third bar.", "A unit is practical when its numbers stay readable."]);

E("s9-u1-unit-choice-gen", 1, ["SC9.2.6"], 1, "gen", function () {
  var cases = [
    { d: "the distance from Earth to Mars at its closest approach", k: "Astronomical units, because the distance lies inside our solar system", w: ["Light years, because every space distance needs the largest unit", "Astronomical units, because Mars is outside our solar system", "Light years, because light years measure time in space"] },
    { d: "the distance from Earth to a star in a neighbouring part of the galaxy", k: "Light years, because the distance lies far outside our solar system", w: ["Astronomical units, because the star is inside our solar system", "Light years, because a light year is a unit of time", "Astronomical units, because AU always gives the smallest number"] },
    { d: "the distance from the Sun to Neptune", k: "Astronomical units, because the distance lies inside our solar system", w: ["Light years, because Neptune is the most distant planet", "Astronomical units, because Neptune is outside our solar system", "Light years, because planets are measured in light years"] }
  ];
  var c = pick(cases);
  return mcq("Which unit is the better choice for measuring " + c.d + ", and why?",
    c.k, c.w,
    "The two units divide space by scale. The astronomical unit, the average distance from Earth to the Sun, suits distances inside our solar system, where it gives readable numbers. The light year, the distance light travels in one year (about 9.46 trillion kilometres), suits the far larger distances between stars and galaxies. A light year is a distance, never a time.",
    {});
}, ["First locate the distance: inside the solar system, or beyond it?", "AU for the solar system's own distances; light years beyond it."]);

E("s9-u1-au-ly-gen", 1, ["SC9.2.6"], 2, "gen", function () {
  var cases = [
    { au: 4, ly: 0, note: "a Kuiper belt object 4 AU from the Sun" },
    { au: 30, ly: 0, note: "Neptune, about 30 AU from the Sun" },
    { au: 8, ly: 0, note: "an asteroid group about 8 AU from the Sun" }
  ];
  var c = pick(cases);
  var mins = Math.round(c.au * 8.3);
  return mcq("Light takes about 8.3 minutes to travel 1 AU. " + "A signal is sent toward " + c.note + ". About how long does the signal, travelling at the speed of light, take to arrive?",
    "About " + mins + " minutes",
    ["About " + Math.round(mins / 2) + " minutes", "About " + (mins + 25) + " minutes", "About " + (mins * 10) + " minutes"],
    "The travel time scales with the distance in AU. At 8.3 minutes per AU, a distance of " + c.au + " AU takes " + c.au + " x 8.3, which is about " + mins + " minutes. This is why the light we receive from distant objects left them long ago: looking far into space is looking back in time.",
    {});
}, ["Multiply the AU distance by 8.3 minutes per AU.", "The time grows in direct proportion to the AU distance."]);

E("s9-u1-cr-distance", 1, ["SC9.2.6"], 2, "var", varset([
  function () {
    return textq("A student writes: 'The nearest star beyond the Sun is about 4.2 away, and Neptune is about 30 away, so the star is much closer than Neptune.' Correct the statement by supplying the missing units, defining each unit, and explaining why the two distances use different units. (3 marks)",
      ["Neptune is about 30 AU away; the star is about 4.2 light years away", "an AU is the average Earth to Sun distance; a light year is the distance light travels in one year", "different units suit different scales, and 4.2 light years is roughly 270,000 AU"],
      "<b>Model answer:</b> Neptune is about 30 AU from the Sun, where one astronomical unit is the average distance from Earth to the Sun, a unit sized for distances inside the solar system. The nearest star is about 4.2 light years away, where one light year is the distance light travels in one year, about 9.46 trillion kilometres. The star is vastly farther than Neptune: 4.2 light years is roughly 270,000 AU. Different units are used because a unit must keep numbers readable at its scale; AU counts become unmanageable between stars, just as light years would give tiny fractions inside the solar system.<br><br><b>Marking points:</b> 1 mark for both units correctly supplied and the error identified. 1 mark for both units correctly defined. 1 mark for the scale explanation, including that the star is far beyond Neptune (about 270,000 AU).",
      {});
  }
]), ["Numbers without units say nothing. Supply each unit, then define it.", "Convert at the end: one light year is about 63,000 AU, so 4.2 of them dwarf 30 AU."]);

E("s9-u1-careers", 1, ["SC9.2.7"], 1, "var", varset([
  function () {
    return mcq("Which list contains only careers associated with space exploration in Canada?",
      "Astronaut, astrophysicist, aerospace engineer, astrobiologist and lens maker",
      ["Astronaut, astrophysicist, marine biologist, aerospace engineer and pilot", "Astrophysicist, astronaut, deep sea diver, technician and doctor", "Astrobiologist, astronaut, volcanologist, lens maker and pilot"],
      "Space work is team work across many professions: astronauts, scientists, engineers, doctors, pilots, technicians, astrophysicists, computer programmers, astrobiologists and lens makers all appear in the guide's list. Marine biology, deep sea diving and volcanology are Earth science careers, valuable but not space careers.",
      {});
  }
]), ["One Earth bound career disqualifies a list.", "Check each career: does its work point at space?"]);

E("s9-u1-career-path", 1, ["SC9.2.7"], 2, "var", varset([
  function () {
    return mcq("A student who loves building and testing mechanical systems asks which space career preparation fits best. Which advice is soundest?",
      "Aim at engineering or technician training, since missions need people who design, build and maintain the hardware, and check the specific program requirements",
      ["Only astronaut training matters, since astronauts do all the technical work on a mission themselves, from repairs to experiments, with no support team behind them", "Careers in space require no specific preparation beyond a general science credit earned at school, since every space job trains its workers from the beginning", "Lens making is the only technical route into space work, because every space mission depends above all on the lenses ground for its telescopes and cameras"],
      "Most space workers are not astronauts. Engineers and technicians design, build, test and maintain rockets, rovers, arms and instruments, and each route has its own educational requirements, which is why the guide has students research the background a chosen career requires. Matching the student's interest in mechanical systems to engineering or technician preparation is the sound advice.",
      {});
  }
]), ["Most of the team never flies. Who builds what flies?", "Match the interest (building systems) to the team role that does it."]);

E("s9-u1-benefits-risks", 1, ["SC9.2.8"], 1, "var", varset([
  function () {
    return mcq("Which pairing gives a genuine benefit and a genuine risk of space exploration, as this indicator frames them?",
      "Benefit: satellite monitoring of weather and environment; risk: the hazards of launch and space travel to crews",
      ["Benefit: satellite monitoring of weather and environment; risk: telescopes becoming steadily more powerful", "Benefit: space travel becoming routine and safe; risk: satellite monitoring of weather and environment", "Benefit: lower launch costs for every mission; risk: new medical knowledge gained from space research"],
      "Defending a position on space exploration starts from an honest ledger. Benefits named in the guide include medical, industrial, agricultural and meteorological gains, such as weather and environmental monitoring by satellite. Risks include the real hazards of launch, radiation and travel for crews. A benefit cannot be entered as a risk, or the ledger argues with itself.",
      {});
  }
]), ["Sort each item: good outcome or harm? The pairing needs one of each.", "Weather monitoring helps; launch hazards harm."]);

E("s9-u1-stakeholder", 1, ["SC9.2.8"], 2, "var", varset([
  function () {
    return mcq("A town hall debates funding a Canadian space partnership. One speaker counts only the launch cost; another counts launch cost, the medical and weather spinoffs, the jobs, and the risk to crews. Which speaker is evaluating the issue as this indicator requires?",
      "The second speaker, because a defensible position weighs benefits and negative consequences across scientific and social perspectives, not cost alone",
      ["The first speaker, because cost is the only factor a citizen may properly consider when a town debates spending public money on space", "Both equally, because any single factor, considered on its own, is enough to defend a position on a question of public funding like this one", "Neither, because positions on space exploration cannot be defended with reasons at all and must be settled by a simple vote of the town hall"],
      "This indicator asks students to defend a position on societal support for space exploration, viewing it as Canadian citizens and as world citizens. That requires the full ledger the second speaker uses: scientific and social benefits (medical, industrial, agricultural, meteorological), negative consequences, and the risks of exploration, set against the costs. Cost alone cannot carry a defended position.",
      {});
  }
]), ["A defended position needs the whole ledger, not one line of it.", "Benefits, consequences, risks and costs: count how many each speaker uses."]);

E("s9-u1-cr-space-decision", 1, ["SC9.2.8"], 3, "var", varset([
  function () {
    return textq("Canada must decide whether to renew its partnership funding for an international space station programme. Defend a position on whether Canada should renew the funding. Your answer must weigh at least two benefits, at least one negative consequence or risk, and the cost, and must state a clear decision. (4 marks)",
      ["a clear decision stated", "at least two benefits weighed, such as medical, industrial, agricultural or meteorological gains", "at least one negative consequence or risk weighed", "the cost addressed and the weighing made explicit"],
      "<b>Model answer:</b> Canada should renew the funding. The partnership returns benefits that reach daily life: medical research and technology developed for the station, industrial work for Canadian firms building and servicing robotics such as Canadarm2 and Dextre, and meteorological and environmental monitoring from orbit that supports forecasting and agriculture. Against this stand real costs and risks: the funding is large and could serve needs on Earth, and crewed exploration carries genuine hazards, as the history of launch and re-entry accidents shows. On balance the benefits are continuing and widely shared while the risks are managed within the programme, and withdrawal would surrender Canada's astronaut flights and robotics role for a saving that is small beside the programme's returns. (A defended decision against renewal earns full credit on the same terms: clear decision, two benefits honestly weighed, a consequence or risk, and cost addressed.)<br><br><b>Marking points:</b> 1 mark for a clear decision stated. 1 mark for two benefits weighed (not merely listed). 1 mark for a negative consequence or risk weighed. 1 mark for the cost addressed and an explicit overall weighing. This item is marked by the prose self-check: the student compares their defended position against the marking points.",
      {});
  }
]), ["Write the decision first, then earn it with the weighing.", "A list is not a defence. Weigh each point as you use it."]);

E("s9-u1-scale-method", 1, ["SC9.3.1"], 1, "var", varset([
  function () {
    return mcq("For the Core Lab Strolling Through the Solar System, a class must lay out planet distances along a school field. Which method and tool choice is most appropriate?",
      "Choose a scale that fits the field, then measure out each planet's scaled distance with a tape or trundle wheel",
      ["Use the actual distances in kilometres and pace them out by eye", "Choose the largest scale possible and estimate the longest distances without measuring", "Measure only the first planet carefully and guess the rest from its position"],
      "Selecting appropriate methods and tools is the skill. A scale model needs a scale chosen so the whole system fits the available space, and a measuring tool suited to the distances, such as a tape or trundle wheel. Pacing by eye and guessing surrender the accuracy the lab exists to show: how empty the solar system mostly is.",
      {});
  }
]), ["The lab's point is accurate spacing. Which choice protects it?", "Fit the scale to the field, then measure every distance."]);

E("s9-u1-cr-method", 1, ["SC9.3.1"], 2, "var", varset([
  function () {
    return textq("A class is planning the Strolling Through the Solar System lab on a 100 metre field. Neptune's real distance is about 30 AU. Select a scale and a measuring tool for the lab, and justify each choice with a calculation or a practical reason. (3 marks)",
      ["a scale that fits: for example 1 AU = 3 m gives 90 m for Neptune, inside the field", "a suitable measuring tool such as a trundle wheel or long tape", "a justification tied to fitting the field or measuring accurately"],
      "<b>Model answer:</b> Choose a scale of 1 AU = 3 m. Neptune at about 30 AU then sits at 90 m, inside the 100 m field with room for the Sun marker at one end; a larger scale such as 1 AU = 5 m would need 150 m and cannot fit. Measure the distances with a trundle wheel (or a long tape), because the distances run to tens of metres and must be placed accurately for the model to show the solar system's spacing honestly. (Any scale that demonstrably fits the field earns the scale mark.)<br><br><b>Marking points:</b> 1 mark for a scale with the fitting calculation shown. 1 mark for a suitable measuring tool. 1 mark for a justification linking the choices to accuracy or fit.",
      {});
  }
]), ["Work backwards from the longest distance and the field length.", "Neptune sets the scale: 30 AU must fit inside 100 m."]);

E("s9-u1-instrument-use", 1, ["SC9.3.2"], 1, "var", varset([
  function () {
    return mcq("During the solar system stroll lab, a group's trundle wheel clicks every metre, but the group counts clicks while walking a curved path between markers. What is the instrument error and the fix?",
      "The curved path measures longer than the straight line distance; the fix is to measure along a straight line between markers",
      ["There is no error at all, because the wheel counts metres accurately wherever it happens to roll, curve or straight", "The wheel undercounts whenever it rolls on curves; the fix is to walk the path faster so the clicks keep up", "The error is in the scale the group chose; the fix is to choose a different planet order for the markers along the field"],
      "Using an instrument effectively means measuring what the plan defines. The lab's distances are straight line distances from the Sun marker. A curved roll adds extra metres the model does not intend, so the planets land too far out. Measuring along a straight line restores the intended distances.",
      {});
  }
]), ["The instrument counted honestly. What did the group measure wrongly?", "A curved path is longer than the straight distance it replaces."]);

E("s9-u1-scale-read-gen", 1, ["SC9.3.2"], 2, "gen", function () {
  var cases = [
    { scale: 10, planet: "the fourth planet", dist: 15 },
    { scale: 10, planet: "the second planet", dist: 11 },
    { scale: 5, planet: "the fifth planet", dist: 39 }
  ];
  var c = pick(cases);
  var field = c.scale * c.dist;
  return mcq("In a stroll lab the scale is 1 AU = " + c.scale + " m of field. " + "The marker for " + c.planet + ", at " + c.dist + " AU from the Sun marker in the model data the class is using, must be placed using a trundle wheel. At what field distance should the marker go?",
    field + " m from the Sun marker",
    [(field - c.scale) + " m from the Sun marker", (field + c.scale * 2) + " m from the Sun marker", (c.dist + c.scale) + " m from the Sun marker"],
    "Using the scale accurately is the instrument skill: field distance equals scale multiplied by AU distance, " + c.scale + " m per AU x " + c.dist + " AU = " + field + " m. Adding the two numbers instead of multiplying, or stopping one scale step short, misplaces the planet and spoils the model's spacing.",
    {});
}, ["Field distance is scale times AU distance. Multiply, do not add.", "Check the units: metres per AU times AU gives metres."]);

E("s9-u1-data-format", 1, ["SC9.3.3"], 1, "var", varset([
  function () {
    return mcq("A group has measured scaled distances and diameters for eight planets. Which format best organises the data for comparing the planets?",
      "A table with one row per planet and columns for distance and diameter",
      ["A paragraph describing each planet in the order the group remembers it", "A list of distances alone, with the diameters written on a separate loose page", "Eight separate slips of paper, one per planet, kept in a pile"],
      "Organising data means choosing a format fitted to the task. A table aligns each planet with its values, so distances and diameters can be compared down columns and across rows. Prose, split lists and loose slips all bury the comparisons the data were collected to make.",
      {});
  }
]), ["The task is comparison. Which format puts values side by side?", "Rows for planets, columns for measures: a table."]);

E("s9-u1-planet-data-gen", 1, ["SC9.3.3"], 3, "gen", function () {
  var rows = [
    { p: "Planet R", dist: 0.7, diam: 12100 },
    { p: "Planet S", dist: 9.6, diam: 120500 },
    { p: "Planet T", dist: 1.5, diam: 6800 }
  ];
  var c = pick(rows);
  var order = rows.slice().sort(function (a, b) { return a.dist - b.dist; });
  var names = order.map(function (r) { return r.p; }).join(", ");
  return mcq("A data table lists: Planet R, distance 0.7 AU, diameter 12,100 km; Planet S, distance 9.6 AU, diameter 120,500 km; Planet T, distance 1.5 AU, diameter 6,800 km. A student must reorganise the table in order of distance from the Sun, nearest first, and state which planet is largest. Starting from " + c.p + "'s row, which combined answer is correct?",
    "Order: " + names + "; largest: Planet S",
    ["Order: Planet S, Planet T, Planet R; largest: Planet S",
     "Order: " + names + "; largest: Planet R",
     "Order: Planet T, Planet R, Planet S; largest: Planet T"],
    "Organising data means sorting it on the stated key. By distance the order is R (0.7 AU), T (1.5 AU), S (9.6 AU). By diameter the largest is S at 120,500 km, far beyond R (12,100 km) and T (6,800 km). Sorting on one column and reading the other is the table skill this indicator names.",
    {});
}, ["Sort on distance first, then read the diameter column separately.", "Nearest is the smallest AU value; largest is the biggest diameter."]);

E("s9-u1-cr-data", 1, ["SC9.3.3"], 2, "var", varset([
  function () {
    return textq("A group records these stroll lab results on loose notes: Mars 1.5 AU at 4.5 m, Jupiter 5.2 AU at 15.6 m, Earth 1.0 AU at 3.0 m, Venus 0.7 AU at 2.1 m. Reorganise the results into an appropriate format, in order from the Sun, and state one comparison the reorganised data makes easy. (3 marks)",
      ["a table format with planets ordered by distance", "the four planets correctly ordered: Venus, Earth, Mars, Jupiter", "a valid comparison, such as Jupiter lying more than three times as far out as Mars"],
      "<b>Model answer:</b> In a table with one row per planet and columns for distance in AU and field distance in metres, ordered from the Sun: Venus, 0.7 AU, 2.1 m; Earth, 1.0 AU, 3.0 m; Mars, 1.5 AU, 4.5 m; Jupiter, 5.2 AU, 15.6 m. Ordered this way, the table makes comparisons immediate: for example, Jupiter lies more than three times as far from the Sun as Mars, and the inner planets are crowded into the first few metres while the outer spacing opens out.<br><br><b>Marking points:</b> 1 mark for an appropriate organising format (a table or equivalent ordered display). 1 mark for all four planets in correct distance order with their values. 1 mark for a correct comparison read from the organised data.",
      {});
  }
]), ["Order by AU distance; the field distances will order themselves.", "A good format does work: end by reading a comparison off it."]);

E("s9-u1-prototype", 1, ["SC9.3.4"], 1, "var", varset([
  function () {
    return mcq("A prototype Mars rover keeps tipping on steep test slopes. In evaluating the design, which judgement is properly about function, reliability and materials?",
      "The wheelbase is too narrow for the slopes (function), the axle joints loosen after repeated runs (reliability), and a lighter frame material would lower the centre of mass (materials)",
      ["The rover is the wrong colour for Mars (function), its name is hard to pronounce (reliability), and its frame paint adds weight that a lighter colour would avoid (materials)", "The rover tipped once on a test slope, so the whole design should be discarded without any further testing and the team should start again from nothing, whatever the cause", "The tipping is a materials problem only, so only the frame material should change, and neither the wheelbase nor the loosening joints need any attention from the team"],
      "Evaluating a design separates three questions. Function: does it do its job, here staying upright on slopes, which the narrow wheelbase fails. Reliability: does it keep working, which loosening joints fail. Materials: are the materials suited, here frame weight and centre of mass. Colour and naming are not evaluation criteria under this indicator.",
      {});
  }
]), ["Sort the judgements into the three named criteria.", "Function, reliability, materials: find one of each."]);

E("s9-u1-design-judge", 1, ["SC9.3.4"], 3, "var", varset([
  function () {
    return mcq("Two probe lander designs are tested. Design A lands successfully in 9 of 10 drops but its sample arm jams in cold tests. Design B lands in 6 of 10 drops and its arm works in all conditions. A mission can tolerate a jammed arm (samples are a bonus) but not a failed landing. Which evaluation and choice is best supported?",
      "Choose A: landing is the mission critical function, A is far more reliable at it, and the arm weakness should be recorded and improved in the next prototype round",
      ["Choose B: a design that fails 4 landings in 10 is acceptable as long as its sample arm is perfect, because the arm is what the mission is really for", "Choose neither: any weakness in any part of a design, however minor, disqualifies that design entirely, so both must be rejected and the tests begun again", "Choose A only if its materials happen to be cheaper than B's materials, since cost of materials is the deciding test for a lander design like this"],
      "Evaluation weighs criteria by what the task demands. The mission states its priority plainly: landing failure ends everything, an arm jam only loses a bonus. A wins the critical function decisively (9 of 10 against 6 of 10), so A is chosen, with the cold weather arm fault recorded as the target for the next prototype round. Perfection in a secondary system cannot rescue failure in the primary one.",
      {});
  }
]), ["Rank the criteria by the mission's own stated tolerance first.", "Critical function first: 9 of 10 beats 6 of 10 where it matters."]);

E("s9-u1-materials-gen", 1, ["SC9.3.4"], 2, "gen", function () {
  var cases = [
    { d: "a lander leg made of a foam that crushes on landing and cannot be reused for a second test drop", k: "A reliability limit: the material does its job once, so the evaluation should require either a stronger material or spare legs for retesting", w: ["A function success with no limits worth recording, because the leg worked once and a single success settles the evaluation", "A colour problem, because crushed foam looks untidy after a landing and a tidier leg would present the design better to judges", "No evaluation is possible until the leg has actually been flown to Mars and tested in a real landing there first, whatever the tests show"] },
    { d: "a rover wheel made of a plastic that turns brittle at the lowest night temperature in the test chamber", k: "A materials failure for the intended conditions: the evaluation should reject this plastic for wheels or require insulation", w: ["A reliability strength, because brittle wheels are lighter and lighter wheels always serve a rover better", "A function success, because the wheel is round and rolls smoothly in the warm test chamber at the start", "No evaluation is possible here, because temperature is not a material property and cannot enter a materials judgement"] },
    { d: "a habitat panel made of a material that blocks radiation well but is so heavy that the launch mass limit is exceeded", k: "A materials trade off: protection is strong, but the mass fails a design requirement, so a lighter shielding arrangement must be found", w: ["A clear success, because radiation protection is the only criterion that a habitat panel should ever be judged against", "A clear failure with no trade off to weigh, because heavy materials are always the wrong choice for any part of a spacecraft", "An evaluation error, because launch mass is not part of design evaluation and should never be raised against a material"] }
  ];
  var c = pick(cases);
  return mcq("Evaluate this design detail: " + c.d + ". Which evaluation is correct?",
    c.k, c.w,
    "Evaluating designs and prototypes turns on function, reliability and use of materials under the real conditions of use. A material that works once, turns brittle in the cold the device will actually face, or protects well but breaks the mass budget each raises a specific, evidence based judgement, and each points to the next design step. Appearance and single criterion thinking are not evaluation.",
    {});
}, ["Test the material against the conditions it will actually face.", "Name the criterion at stake: function, reliability, or materials."]);

E("s9-u1-act-on-idea", 1, ["SC9.3.5"], 2, "var", varset([
  function () {
    return mcq("During a space station design task, one team member suggests moving the water recycling unit beside the greenhouse so cleaned water can feed the plants directly. A second member redraws the plan with the units adjacent, labels the connecting pipe, and notes the suggestion's source in the margin. Which judgement of the second member's work is most accurate?",
      "The member received, understood and acted on the idea: the redrawn plan adopts it, connects it properly and credits it",
      ["The member only received the idea, because redrawing a plan does not count as acting", "The member acted without understanding, because the pipe should never connect the two units", "The member's work cannot be judged from a described plan at all"],
      "This indicator is met in performance: receiving an idea, understanding it, and acting on it. The described work shows all three: the suggestion was taken up, its point (short, direct water reuse) was understood well enough to draw the connection, and the plan itself changed. Judging that described performance is what this item assesses; the performance itself belongs to classroom work.",
      {});
  }
]), ["Count the three verbs: receive, understand, act. Find each in the description.", "The plan changed because of the idea: that is acting on it."]);

E("s9-u1-alternatives", 1, ["SC9.3.7"], 1, "var", varset([
  function () {
    return mcq("A habitat design team must keep drinking water supplied if the main recycling unit fails. Which response proposes genuine alternative solutions, as this indicator requires?",
      "Carry stored reserve water, add a smaller backup recycling unit, and plan resupply drops, then compare the three",
      ["Use the main recycling unit as the only supply, but check it more often than the schedule requires each week", "Hope the main unit does not fail during the mission, since it is new and newly tested equipment rarely breaks down", "Recycle water, recycle water more carefully than usual, and recycle water every day without fail on board"],
      "Alternative solutions must be genuinely different routes to the same goal. Stored reserves, a backup unit and resupply are three distinct plans with different costs and risks, ready to be compared and chosen among. Checking the same unit more often, or restating one plan three ways, offers no alternative at all.",
      {});
  }
]), ["Count distinct routes to the goal, not restatements of one route.", "Three different plans beat one plan said three ways."]);

E("s9-u1-plan-steps", 1, ["SC9.3.7"], 2, "var", varset([
  function () {
    return mcq("A team selects stored reserve water as its backup plan. Which set turns that selection into a developed plan?",
      "Decide how many days the reserve must cover, calculate the volume, choose sealed containers, set a rotation schedule so stored water stays fresh, and assign who checks it",
      ["Write 'keep extra water' at the top of the plan in large letters and move on to the next design problem without working out any amounts or responsibilities", "Buy the largest tank available, fill it once before launch, and treat that single filling as the complete reserve plan, with no schedule for checking or replacing the water", "Store the reserve water in any open containers that come to hand, set near the habitat door where the crew passes most often, and top them up when noticed by anyone"],
      "Developing a plan means working the chosen solution into steps that can be carried out: a quantity derived from a stated need, suitable containers, freshness maintained by rotation, and a named responsibility for checks. A slogan, an oversized single purchase and open containers each leave the plan undeveloped or unsafe.",
      {});
  }
]), ["A developed plan answers how much, in what, maintained how, checked by whom.", "Look for quantity, containers, upkeep and responsibility together."]);

E("s9-u1-cr-design-mission", 1, ["SC9.3.7"], 3, "var", varset([
  function () {
    return textq("A design brief: a small uncrewed lander must survive one night on the Moon, where the night lasts about 14 Earth days, temperatures fall far below freezing, and no sunlight reaches solar panels during the night. Propose two alternative solutions for keeping the lander's instruments warm and powered through the night, select one, and develop a plan for the selected solution. (4 marks)",
      ["two genuinely alternative solutions proposed", "one solution selected with a reason", "a plan with concrete steps for the selected solution"],
      "<b>Model answer:</b> Alternative one: carry large rechargeable batteries charged during the lunar day, sized to run heaters and instruments through the 14 day night, with the lander sleeping in a low power mode between scheduled wake ups. Alternative two: use a radioisotope heater unit, which gives steady heat from a small radioactive source regardless of sunlight, paired with smaller batteries for the instruments' electrical power. Selected: alternative one, because it uses proven, non radioactive hardware a small programme can test fully on Earth. Plan: calculate the night energy budget from the instruments' draw and heater needs; size the battery pack with a safety margin; insulate the instrument bay and fit thermostat controlled heaters; programme a sleep and wake schedule; and test the whole lander in a cold chamber for a simulated 14 day night before launch, revising insulation or battery size from the test results. (The radioisotope alternative, selected and developed to the same depth, earns full credit.)<br><br><b>Marking points:</b> 1 mark for two genuinely different alternatives. 1 mark for a selection with a reason tied to the brief. 1 mark for concrete plan steps (sizing, insulation, schedule or testing). 1 mark for the plan addressing the brief's stated constraints (14 day night, extreme cold, no solar input).",
      {});
  }
]), ["Two different routes first; then commit to one and plan it properly.", "The brief's numbers are the plan's constraints: 14 days, deep cold, no sunlight."]);

E("s9-u1-process-eval", 1, ["SC9.3.8"], 1, "var", varset([
  function () {
    return mcq("After finishing a space station model, a group notes: 'We spent two meetings arguing about the colour scheme and ran out of time to test the airlock, which then failed.' Which evaluation of their process is most accurate?",
      "Their planning process was weak: time went to a low priority decision while a critical test was left undone",
      ["Their process was strong throughout, because they identified the failure honestly once the task was over", "Their only problem was the airlock design itself, and nothing about how their group planned or used its time", "Groups should never evaluate their process after a task, since only the finished product can be judged"],
      "Evaluating individual and group processes means judging how the work was planned and carried out, not only the product. The group's own note shows the process fault: decision time was spent on appearance while testing a critical system was crowded out. Naming the failure afterwards is the start of evaluation, but it does not make the process that produced it strong.",
      {});
  }
]), ["Separate the product (the airlock) from the process (how time was used).", "Two meetings on colour, no time to test: that is a planning judgement."]);

E("s9-u1-cr-process", 1, ["SC9.3.8"], 2, "var", varset([
  function () {
    return textq("A space station design group finishes its model but its airlock jams during the class demonstration. Looking back, the group had divided the work so that no member checked another's section, and the airlock builder had run out of material and improvised on the final evening. Evaluate the group's process and state two changes that would improve it next time. (3 marks)",
      ["the process faults identified: no cross checking and materials not secured in advance", "the improvisation linked to the planning failure, not just bad luck", "two concrete process changes proposed"],
      "<b>Model answer:</b> The group's process, not only its airlock, failed. Dividing the work with no cross checking meant faults in one section could survive to demonstration day, and leaving materials to chance forced a rushed improvisation on the final evening, which is when the jamming fault was most likely built in. Two changes follow directly: build in a checking step in which each section is tested by a member who did not build it, well before the deadline; and list and secure all materials at the planning stage, with a mid project check that the build matches the plan. Both changes evaluate and repair the process that produced the product.<br><br><b>Marking points:</b> 1 mark for the process faults correctly identified. 1 mark for linking the demonstration failure to the process rather than to luck. 1 mark for two concrete, process level improvements.",
      {});
  }
]), ["Evaluate how the group worked, not only what it built.", "No checking plus last minute improvisation: name both, then fix both."]);

var NO_COMPOSE_U1 = {
  "s9-u1-cr-design-mission": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U1[e.id]) { e.noCompose = true; } });

/* ----- bank-u2.js ----- */
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
      ["Cobalt must be written with two capital letters because it is a metal, and metals take two capitals", "CO is wrong only because carbon comes before cobalt in the alphabet, so the order of the letters is the fault", "Symbols are never allowed to contain the letter O, because O is reserved for writing out full compound names"],
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
      ["Every level holds at most 8 electrons, including the first level, and a level must be completely full before the next begins", "The first level holds at most 8 electrons and the second at most 2, with the third holding whatever electrons remain", "Electrons are drawn on circles showing the exact curved paths they follow as they travel around the nucleus"],
      "In the Bohr-Rutherford diagrams used for elements 1 to 18, the first energy level holds a maximum of 2 electrons and the second and third levels hold a maximum of 8 each at this level of the course. The diagrams show electrons arranged in levels drawn as horizontal lines; they do not claim electrons travel in circular paths.",
      {});
  }
]), ["Start filling from the level closest to the nucleus.", "The first level is the small one: it fills at two."]);

E("s9-u2-noble-full", 2, ["SC9.4.5"], 2, "var", varset([
  function () {
    return mcq("Why are the noble gases so unreactive compared with other elements?",
      "Their outer energy level is full, so they neither gain, lose nor share electrons readily",
      ["They have no electrons in any energy level, so there is nothing for another atom to attract", "They have the largest atoms of any family in the table, too large for other atoms to approach", "Their nuclei contain no neutrons for other atoms to react with in any reaction"],
      "Chemical reactivity is driven by the outer (valence) energy level. Noble gases have a full outer level, the stable arrangement other atoms move toward when they react, so noble gases have no tendency to gain, lose or share electrons and stay unreactive.",
      {});
  }
]), ["Stability is the key word: what arrangement is stable?", "Reactions are about electrons, not about neutrons."]);

E("s9-u2-same-family-why", 2, ["SC9.4.5"], 3, "var", varset([
  function () {
    return mcq("Sodium and potassium behave very similarly in reactions, while sodium and magnesium behave quite differently. What explains this pattern?",
      "Sodium and potassium are in the same family and share the same number of valence electrons, while magnesium has a different number",
      ["Sodium and potassium have nearly the same atomic mass, and elements of similar mass always behave alike in reactions", "Sodium and magnesium are in the same period of the table, and sharing a period is what forces their behaviour to differ", "Potassium and magnesium have identical energy level diagrams, and sodium matches magnesium in exactly the same way"],
      "Elements in the same family share the same number of electrons in their outer energy level, and that number governs how an atom reacts. Sodium and potassium each have one valence electron, so their chemistry matches; magnesium has two, so its chemistry differs.",
      {});
  }
]), ["Reactions are run by the outer level. Count valence electrons.", "Same column on the table means same outer arrangement."]);

E("s9-u2-energy-level-def", 2, ["SC9.4.5"], 3, "var", varset([
  function () {
    return mcq("Which statement correctly uses the terms energy level and valence?",
      "The valence energy level is the outermost level holding electrons, and its electrons are the valence electrons",
      ["The valence energy level is the level closest to the nucleus, and its electrons are the valence electrons", "Valence electrons are the electrons found inside the nucleus, packed among the protons and neutrons there", "An energy level is the exact circular path that one electron follows as it travels around the nucleus"],
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
      ["Calcium chloride, formed from a metal and a non-metal, is molecular; carbon dioxide, formed from non-metals only, is ionic", "Water, formed from non-metals only, is ionic; sodium chloride, formed from a metal and a non-metal, is molecular", "Methane, formed from non-metals only, is ionic; calcium chloride, formed from a metal and a non-metal, is molecular"],
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
      ["The particles themselves grow larger as the substance changes from solid to gas, swelling as they take in heat from the surroundings", "The gas particles have stopped moving altogether, which is why the gas spreads out evenly to fill its whole container", "The liquid particles are arranged in a fixed, repeating pattern exactly like the solid particles in the diagram"],
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
      ["The Greeks believed matter could be divided forever without limit, and modern science agrees completely with that view today", "The modern view still lists earth, air, fire and water as the four true elements, and every substance is a mixture of those four", "The Greek idea was based on microscope observations of atoms moving in samples of earth, air, fire and water taken at the time"],
      "Empedocles and Aristotle taught that all matter was made of earth, air, fire and water, an idea accepted for about 2000 years without experimental testing. Modern atomic ideas were built and revised through experiments, which is why they changed as evidence accumulated.",
      {});
  }
]), ["Ask what each view is built on: argument, or tests?", "Two thousand years of acceptance is not the same as evidence."]);


/* ---------- SC9.5.2 ---------- */

E("s9-u2-law-theory", 2, ["SC9.5.2"], 1, "var", varset([
  function () {
    return mcq("Which statement best distinguishes a scientific law from a scientific theory, as this course presents them?",
      "A law is supported by robust, repeated experimental evidence describing what happens; a theory is an explanation that is less fully supported and open to further testing",
      ["A theory is simply a guess with nothing behind it, and a law is a theory that scientists voted to accept after debating it at a meeting of the profession", "A law explains why something happens in nature, and a theory only describes the measurements taken of it, offering no explanation of its own at all for anyone", "Laws and theories mean exactly the same thing in every science, and the two words are used interchangeably in every textbook and laboratory without distinction"],
      "In this course's treatment, the words signal confidence in the evidence. Laws rest on different and robust experimental support and describe regular patterns. Theories explain, but with less complete support, so further evidence can revise them; neither word means a guess.",
      {});
  }
]), ["Confidence in evidence is the dividing line the guide draws.", "A theory is not a guess; it is an explanation awaiting fuller support."]);

E("s9-u2-confidence", 2, ["SC9.5.2"], 2, "var", varset([
  function () {
    return mcq("A classmate says, 'It is only a theory, so scientists are just guessing.' Which reply is most accurate?",
      "A theory is a supported explanation built from evidence; it is called a theory because the supporting evidence is not yet as complete and robust as the evidence behind a law",
      ["The classmate is right: theories are guesses with no evidence behind them at all, and scientists use the word theory for any idea they have not yet tested in any way", "A theory becomes a law automatically after one hundred years have passed, whatever evidence has or has not been gathered for it in that time, by the calendar alone", "Theories apply only to biology, the study of living things, and never to chemistry or physics, where every accepted explanation is called a law instead, without exception"],
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
      ["Dalton: discovered the electron inside the atom with his cathode ray work", "Thomson: proposed that electrons orbit the nucleus in fixed energy levels", "Bohr: argued that all matter is made of earth, air, fire and water combined"],
      "Rutherford's experiments replaced the spread-out positive sphere with a tiny, dense, positive nucleus. Dalton proposed the solid sphere atom, Thomson discovered the electron and proposed the raisin bun model, and Bohr added the energy levels.",
      {});
  }
]), ["Match each name to the model the course attaches to it.", "The nucleus belongs to one scientist on this list."]);

E("s9-u2-model-change-why", 2, ["SC9.5.3"], 3, "var", varset([
  function () {
    return mcq("Why did the atomic model keep changing between Dalton's time and Bohr's?",
      "Each new model was forced by new experimental evidence that the previous model could not explain",
      ["Scientists changed the model each generation simply to keep the textbooks looking current", "Atoms themselves changed their structure over those two centuries of study, growing more complex", "Each scientist worked entirely alone and never saw or read about the earlier models at all"],
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
      ["Atoms are solid spheres with no empty space inside, filled completely from centre to surface", "Electrons are spread evenly through a positive sphere, and that sphere is the whole atom", "Gold atoms are much larger than all other atoms, which is why the foil blocked the particles"],
      "If positive charge were spread thinly through the whole atom, as Thomson proposed, nothing could turn a fast alpha particle around. The rare sharp bounce-backs require a concentrated positive charge in a very small volume: the nucleus. The many straight passes show the rest of the atom is mostly empty space.",
      {});
  }
]), ["Rare but extreme deflections need something small and concentrated.", "Straight-through passes and bounce-backs must both be explained."]);

E("s9-u2-foil-inference", 2, ["SC9.5.4"], 2, "var", varset([
  function () {
    return mcq("Why could Rutherford perform his experiment when Dalton, a century earlier, could not have?",
      "Rutherford had technology Dalton lacked, including sources of alpha particles and vacuum equipment, which made probing inside the atom possible",
      ["Dalton was not interested in the inside of the atom at all, and never attempted any experiment that might have revealed it to anyone", "Gold foil had not been invented in Dalton's time, and no thin metal sheet of any kind could be made with the tools then available", "Rutherford worked in a larger laboratory building than Dalton had, and the extra room is what allowed the experiment to be set up"],
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
    { q: "Which setting is the best example of group scientific work on atomic structure?", k: "A university research group whose members build on each other's published results", w: ["A student sketching an atom alone for homework at the kitchen table after school", "A cook adjusting a recipe alone at home, working without any partner or team", "One technician reading a meter alone on a night shift in an empty plant room"], s: "Group settings are defined by collaboration: the university group members use and extend each other's discoveries, as Crookes, Thomson and Rutherford did. The other examples are individual work, valuable but not group work." },
    { q: "Which setting is the best example of individual scientific work related to chemistry?", k: "A student testing soil samples from their own garden with a home kit", w: ["A hospital laboratory team running blood tests together on a shared bench", "A class of thirty students sharing one set of flame test results together", "A national research council operating a particle accelerator with a large staff"], s: "The garden soil testing is one person working alone with chemical tests. Teams in hospitals and classes, and national facilities with large staffs, are group settings." },
    { q: "A pharmaceutical company assigns a whole department to develop a new medicine. Which statement about this setting is correct?", k: "It is a group setting, and it still depends on earlier work done by other scientists elsewhere", w: ["It is an individual setting because the company has one name on the building outside", "It is not scientific work at all because it happens inside a company rather than a university", "It owes nothing to earlier scientists because it is modern work done with modern equipment"], s: "Scientific and technological work on atomic structure and chemistry happens in companies as well as universities, and group work there, like group work anywhere, builds on discoveries made by others. Setting and dependence on prior work are separate questions." }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w, c.s, {});
}, ["Count collaborators, and remember work builds on earlier work.", "Individual and group are about who works together, not where."]);


/* ---------- SC9.5.6 ---------- */

E("s9-u2-precise-word", 2, ["SC9.5.6"], 1, "var", varset([
  function () {
    return mcq("Why does it matter in science that the word element has one agreed meaning?",
      "So that scientists everywhere mean the same thing, a substance made of only one kind of atom, and can compare results without confusion",
      ["So that students can be marked wrong whenever they use an everyday word in place of the proper scientific one in a report", "Because everyday words are banned from science classrooms, and students may use only the agreed scientific terms in their work", "So that element can also mean a heating coil, a part or an ingredient without any confusion arising between readers of a report"],
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
      ["He discovered all of the elements known in his time by his own experiments, and he numbered them in order by mass in his laboratory", "He arranged the elements alphabetically by name, and he predicted the noble gases exactly, one by one, in advance of their discovery", "He built the first table entirely alone, and no other scientist of his time worked on organizing the elements at all in any way"],
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
      ["Mixing them makes both cleaners stop working at once; it illustrates that cleaners are expensive and should never be wasted", "Mixing them produces a stronger, faster cleaner than either alone; it illustrates efficient chemistry at work under the sink", "Mixing them changes only the colour of the cleaners; it illustrates that chemical properties are harmless in daily use"],
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
      ["Plants are always safer than laboratory-made chemicals, whatever the plant and whatever the dose", "Society's needs have no effect at all on what scientists choose to study or develop in their work", "Heart medicine was developed with no testing of the plant chemical at any stage of the work"],
      "The foxglove example, drawn from Newfoundland and Labrador's own flora, shows demand guiding development: a medical need led researchers to isolate and standardize a plant chemical into a medicine. Needs such as health, food production and materials repeatedly steer chemistry in this way.",
      {});
  }
]), ["Trace the chain: need first, then research, then product.", "The plant supplied the chemical; the need supplied the reason."]);

E("s9-u2-plastics-need", 2, ["SC9.5.9"], 3, "var", varset([
  function () {
    return mcq("Plastics were developed and spread rapidly during the twentieth century. Which explanation best fits the STSE pattern in this unit?",
      "Society needed cheap, light, mouldable materials for countless products, and chemistry supplied them from petroleum",
      ["Plastics spread because they are natural materials gathered ready-made, needing no processing of any kind", "Plastics were developed before any use for them existed, and manufacturers had to search for products to make from them", "Society resisted plastics from the start, so governments had to force their adoption on an unwilling public"],
      "The core STSE of this strand, Plastics and Modern Life, follows the pattern of need meeting chemistry: demand for inexpensive, versatile materials drove the development of plastics from petroleum chemicals. Their spread then created new questions about waste and environment that the same pattern must answer.",
      {});
  }
]), ["Need on one side, petroleum chemistry on the other.", "Plastics are manufactured, not gathered."]);


/* ---------- SC9.5.10 ---------- */

E("s9-u2-tech-analysis", 2, ["SC9.5.10"], 1, "var", varset([
  function () {
    return mcq("A plastic kayak is light, does not rust, and can be moulded in one piece, but it becomes brittle after years of sunlight. Analyzing this technology means weighing which pairing?",
      "How its material properties make it work well for its purpose, against the limits those same properties impose over its lifetime",
      ["Its price against the price of a wooden kayak only, with no attention to how either boat actually performs in use", "Its colour against the range of colours offered by other makers of similar kayaks for sale, this season and last", "Its weight in kilograms against its length in metres only, as if two measurements could settle the whole analysis of the design"],
      "Analyzing a technology's design means connecting how it functions to its impact in daily life. The kayak's plastic gives lightness, corrosion resistance and one-piece moulding, real advantages for paddlers, while sunlight brittleness is a genuine lifetime cost. Both sides come from the material's properties.",
      {});
  }
]), ["Function and impact: the analysis needs both.", "Price and colour are not how the technology works."]);

E("s9-u2-design-impact", 2, ["SC9.5.10"], 2, "var", varset([
  function () {
    return mcq("Insulated plastic foam cups keep drinks hot and are cheap, but they persist in landfills for a very long time. Which statement is a fair analysis?",
      "The same trapped-air structure that insulates also makes the foam slow to break down, so the design trades daily convenience against a long environmental cost",
      ["The cups are a poor design simply because they keep drinks too hot for too long, and a cup that insulates this well has failed at its real job of serving drinks", "The landfill problem is unrelated to the cups' design in any way, since waste and disposal have nothing to do with how a product is designed or made at all", "Foam cups prove that insulation does not work in practice, since drinks in them eventually cool to room temperature like drinks in any other cup at all"],
      "Good analysis ties the benefit and the drawback to the design itself. Trapped air pockets insulate the drink and also make the material resistant to breaking down, so convenience today and persistence in the environment are two faces of one design choice.",
      {});
  }
]), ["Find the single feature that produces both effects.", "Analysis connects design to impact, not just opinion to product."]);

E("s9-u2-function-basis", 2, ["SC9.5.10"], 3, "var", varset([
  function () {
    return mcq("A smoke detector uses a tiny amount of a radioactive element whose particles ionize air inside a chamber. Which basis of its functioning is being described?",
      "Its operation rests on a property of an element's atoms, applied to a daily-life safety task",
      ["Its operation rests on the colour of the plastic case it is sold in, chosen by the maker", "Its operation rests on the price of the battery fitted inside it at the factory that year", "Its operation rests on the shape and size of the room in which it happens to hang on the wall"],
      "Some everyday technologies work because of atomic-level properties. The detector's sensing depends on what the element's atoms do to the air in its chamber; the case, battery and room are supporting details, not the scientific basis of the device.",
      {});
  }
]), ["Ask what makes the sensing happen at all.", "Case, cost and room shape do not detect anything."]);


/* ---------- SC9.5.11 ---------- */

E("s9-u2-decision-balance", 2, ["SC9.5.11"], 2, "var", varset([
  function () {
    return mcq("A town must choose a material for new water bottles for its arena canteen. Which approach makes the decision an informed one?",
      "Compare the environmental and social advantages and disadvantages of each material, then choose and be able to defend the choice",
      ["Choose the cheapest material on offer, since cost is the only real factor that a decision like this ever needs to weigh", "Choose the newest material on the market, since new always means better and older materials need no consideration at all", "Let one person decide the matter alone, quickly, without examining any evidence about any of the materials on offer"],
      "Informed decisions about applications of science weigh advantages and disadvantages on more than one side: environmental effects such as waste and recycling, and social effects such as cost, health and convenience. A defensible choice shows that weighing, even when no option wins on every count.",
      {});
  }
]), ["Informed means evidence weighed on several sides.", "One factor alone, whether price or novelty, is not a weighing."]);

E("s9-u2-plastics-tradeoff", 2, ["SC9.5.11"], 3, "var", varset([
  function () {
    return mcq("Which statement about plastics best models a balanced STSE judgement?",
      "Plastics give light, durable, inexpensive products and medical and food-safety benefits, while their persistence as waste and their petroleum source are real costs that decisions must manage",
      ["Plastics are entirely beneficial in every use and should never be questioned, since their advantages settle every decision about them in advance, whatever the waste involved", "Plastics are entirely harmful in every use and have no legitimate uses at all, so every plastic product should be withdrawn from daily life at once, without exception or replacement", "Plastics have advantages only for the manufacturers who sell them, and never for the users who buy them, whose interests play no part in any decision about plastics at all"],
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
      ["A physical property of the chemical being used in the laboratory", "A delay in starting the work that should be skipped to save lab time", "The chemical's position on the periodic table of the elements chart"],
      "WHMIS practice includes using the safety data sheet (the MSDS) for a chemical before work begins: it gives the safety precautions, spill procedures and first aid requirements for that material. Checking it first is the standard applied, not wasted time.",
      {});
  }
]), ["The data sheet exists for exactly this check.", "Safety information is gathered before the chemical is handled."]);

E("s9-u2-msds-use", 2, ["SC9.6.1"], 1, "var", varset([
  function () {
    return mcq("A small amount of a chemical splashes near a student's hand. Which response follows proper WHMIS-based technique?",
      "Stop, tell the teacher, and follow the spill and first aid steps given for that chemical on its safety data sheet",
      ["Wipe it up quickly with a paper towel, throw the towel in the bin, and say nothing to anyone about it at all", "Pour water over the whole bench and the floor around it to dilute everything at once, then carry on with the lab", "Move the chemical bottle to another bench, wipe the sleeve dry, and continue working as if nothing had happened"],
      "Proper technique is specific, not improvised: the teacher is informed and the chemical's own data sheet directs the spill procedure and any first aid. Guessing with water or hiding the spill ignores the information WHMIS provides for exactly this moment.",
      {});
  }
]), ["The data sheet, plus the teacher, outrank improvisation.", "Hiding a spill is the opposite of the standard."]);


/* ---------- SC9.6.2 ---------- */

E("s9-u2-hypothesis-form", 2, ["SC9.6.2"], 1, "var", varset([
  function () {
    return mcq("Which statement is a proper hypothesis for an investigation of whether heating changes how a metal sample reacts with vinegar?",
      "If the metal sample is heated before the vinegar is added, then it will produce bubbles faster, because heating increases how vigorously substances react",
      ["Metals and vinegar are interesting to study together, and the class expects the investigation of the two to be enjoyable on Friday afternoon", "The metal will do something noticeable when the vinegar is added to it in the beaker, though nothing more specific can be said in advance about it", "Heating is part of the procedure we will follow on Friday afternoon, when the class carries out the investigation in the laboratory together"],
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
      ["Rewrite the list in neater handwriting in the same order as before, taking care only that every value can be read more clearly by the teacher", "Memorize the six values as a set of numbers and discard the list they were written on, keeping the results in memory only for the report", "Draw a careful picture of each substance beside its name in the list, coloured to show how each one looked during the test, and nothing more"],
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
      ["A paragraph describing the materials one by one in the order they happened to be tested on the bench", "A sketch of the bench showing where each material sat while its turn for testing came around in the lab", "A list of the materials ranked by the personal preference of the student doing the testing that day"],
      "A row-and-column table matches the structure of the task: the same set of tests applied to every material. Consistent entries make missing results obvious and comparisons direct, which a paragraph or sketch cannot do.",
      {});
  }
]), ["Same tests, many materials: that structure is a table.", "Preference is not data."]);

E("s9-u2-units-heading", 2, ["SC9.6.4"], 1, "var", varset([
  function () {
    return mcq("A student's data table lists temperatures as 20, 35, 50 with no other information in the heading. What is missing for the data to be properly organized?",
      "The quantity name and its unit in the column heading, such as Temperature (degrees C)",
      ["A title page prepared for the front of the lab report submitted as a whole", "The names of the student's lab partners written at the top of the page neatly", "A conclusion paragraph written under the table at the end of the report itself"],
      "Organized data must be readable by someone who was not there. A column heading naming the quantity and its unit, Temperature (degrees C), makes every number in the column interpretable; bare numbers could be any quantity in any unit.",
      {});
  }
]), ["Numbers without a named quantity and unit cannot be used by a reader.", "Headings carry meaning; partners and conclusions live elsewhere."]);


/* ---------- SC9.6.5 ---------- */

E("s9-u2-conclusion-match", 2, ["SC9.6.5"], 1, "var", varset([
  function () {
    return mcq("A student predicted that a shiny metal strip would not react with vinegar. After a day in vinegar the strip is dull and the vinegar has turned slightly blue. Which conclusion is correct?",
      "The evidence refutes the prediction: the strip reacted, shown by the colour change in the vinegar and the changed surface",
      ["The evidence supports the prediction, because the strip is still in one piece and a reacted strip would have dissolved away entirely", "No conclusion is possible from this test, because the test lasted a whole day and long tests cannot settle anything", "The prediction was about a different strip from the one tested, so it still stands untouched by this result entirely"],
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
      ["What is the chemical symbol for chlorine as printed in the table on the classroom wall, to copy down?", "How many periods are drawn on the periodic table hanging on our classroom wall, counting them one by one?", "Who first organized the periodic table into the arrangement of rows and columns used in schools and textbooks?"],
      "Using the table to identify new questions means pushing past facts it already states. Predicting an unknown family member's behaviour from the family pattern, and asking how to check it, is a new question the learning itself creates; symbols, counts and history are already answered on or behind the table.",
      {});
  }
]), ["A new question reaches beyond what the table already tells you.", "If the table answers it at a glance, it is not new."]);


/* ---------- SC9.6.7 ---------- */

E("s9-u2-trend-graph", 2, ["SC9.6.7"], 1, "var", varset([
  function () {
    var q = mcq("The graph shows how the temperature of a reacting mixture changed over five minutes. Which statement correctly interprets the trend?",
      "The temperature rose quickly at first and then levelled off, showing the reaction was most vigorous at the start and slowed as it proceeded",
      ["The temperature fell steadily downward for the whole five minutes of the test, from its first reading to its last, without pause", "The temperature stayed exactly constant at its starting value, so no reaction of any kind occurred in the mixture at all", "The temperature rose and fell in a repeating cycle, climbing and dropping once in each minute of the five minutes in turn"],
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
      ["Why every element in Period 3 has exactly the same properties, reacting in the same way in every test in the laboratory", "Why atomic mass decreases steadily across the period from the first element to the last one listed in the row of the table", "Why the elements of Period 3 are all metals, every one of them, from the first element of the row to the last in the period"],
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
      ["Leave the splint in the flame until the wood itself is burning well and brightly, and only then read the colour the flame has taken at that point", "Hold the splint with bare fingers as close to the flame as possible for better control of its position throughout the test each time", "Wave the burning splint back and forth over the bench to spread the colour across a wider area for the class to see from their seats"],
      "Safe flame test technique is brief and deliberate: two or three seconds in the flame shows the ion's colour before the wood catches fire and its own flame hides the result. Longer burning is both a hazard and bad observation; known samples are tested first to build a colour standard for comparison.",
      {});
  }
]), ["Short exposure protects both the student and the reading.", "Once the wood burns, you are reading the wood, not the sample."]);


/* ---------- SC9.6.9 ---------- */

E("s9-u2-new-question-change", 2, ["SC9.6.9"], 1, "var", varset([
  function () {
    return mcq("After watching magnesium burn brightly in air, which question is a new question arising from the investigation?",
      "Does magnesium burn the same way in pure oxygen as in air, and what would that show about what burning needs?",
      ["What colour was the magnesium flame that the class just saw during the demonstration this morning?", "What is the chemical symbol for magnesium as it appears in the classroom periodic table chart?", "Who demonstrated the burning magnesium to the class during the lesson in the laboratory this morning?"],
      "New questions grow out of results. The bright burning raises a testable follow-up about the role of oxygen in burning, which the original investigation did not answer. The other options ask for observations or facts already in hand.",
      {});
  }
]), ["A new question cannot be answered from today's notes.", "Follow the variable the result points at: the air itself."]);

E("s9-u2-follow-up-q", 2, ["SC9.6.9"], 2, "var", varset([
  function () {
    return mcq("A group finds that one metal fizzes in vinegar while another does not. Which follow-up question best arises from their investigation of physical and chemical changes?",
      "Would warming the vinegar change which metals fizz, and would that change be evidence about reaction conditions rather than the metals alone?",
      ["What were the names of the two metals the group tested during the investigation earlier in the lesson, written in the notebook?", "Did everyone in the group see the fizzing happen with their own eyes while the test was being carried out at the bench this afternoon?", "What page of the textbook describes vinegar and its uses in the chapter on acids and everyday chemicals at the back of the book?"],
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

/* ----- bank-u3.js ----- */
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

/* ----- bank-u4.js ----- */
// CRMARKS: s9-u4-cr-mutation=3
// CRMARKS: s9-u4-cr-mitosis-stages=3
// CRMARKS: s9-u4-cr-methods=3
// CRMARKS: s9-u4-cr-reproduction-choice=4
// CRMARKS: s9-u4-cr-technology=3
// CRMARKS: s9-u4-cr-condition=3
// CRMARKS: s9-u4-cr-shifts=3
// CRMARKS: s9-u4-cr-canadian=3
// CRMARKS: s9-u4-cr-graph-reading=3
// CRMARKS: s9-u4-cr-design-yeast=4
// CRMARKS: s9-u4-cr-trends=3
// CRMARKS: s9-u4-cr-communicate=3
// CRMARKS: s9-u4-cr-evaluate=3
// Science 9 Unit 4 bank: Reproduction (SC9.10.1 to SC9.12.10),
// built Nov 15, 2026 to the Reproduction authoring spec. Sources
// reviewed: the current Science 9 guide sections for the strand,
// the ESD Grade 9 Unit 4 Reproduction set (unit plan, student
// outline, Appendix A STSE Genetic Engineering), ExamView
// Chapters 4, 5 and 6, and the STEAM MapOfMe and CreateAMutant
// activities. Existing tests and question banks were reviewed
// only to gauge the expected depth and range of treatment. All
// entries are original and were written new for this app: no
// source text, values or scenarios are used verbatim.
// Guide discipline: no DNA composition (nucleotides) and no DNA
// replication detail; gene mutation limited to a change in the
// order of chemicals in a portion of a gene, with mutation types
// and effect classes out of scope; mitosis at the guide's four
// phase descriptions with no centriole, centromere or spindle
// detail and no early or late prophase split; meiosis at phase
// names with brief descriptions, centred on four haploid cells;
// moss and flowering plant treatment limited as the guide limits
// it; intercourse distinguished from sexual reproduction.
// SC9.10.3 and SC9.10.5 treatment: the spreadsheet statements
// are materially identical, so the indicators are keyed to their
// own guide sections and never merged. SC9.10.3 carries the
// cell cycle, mitosis and cytokinesis. SC9.10.5 carries sexual
// reproduction, meiosis, gamete, fertilization, zygote, embryo,
// diploid, haploid, interkinesis and the mitosis comparison.
// The duplication is flagged for the SME pass in the catalogue,
// the spec and the build report.
// CORE residue: SC9.12.3 entries assess investigation design,
// safety and accuracy decisions; growing and handling the yeast
// cultures themselves is classroom assessment. SC9.12.9 (work
// cooperatively with team members) carries zero entries on the
// SC7.3.5 and SC8.9.12 precedent and is recorded as NONE in the
// catalogue, the spec and the build report. SC9.12.8 is CORE at
// one scenario entry judging how a team member takes up and
// acts on another's idea; the cooperative work itself is the
// residue.

function s9u4Esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
function s9u4StagesSVG() {
  var s = "<svg viewBox=\"0 0 640 210\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  var cx = [80, 240, 400, 560];
  for (var i = 0; i < 4; i++) {
    s += "<circle cx=\"" + cx[i] + "\" cy=\"100\" r=\"62\" fill=\"#fdf6ec\" stroke=\"#8a7a52\" stroke-width=\"2\"/>";
  }
  s += "<g stroke=\"#7b241c\" stroke-width=\"4\" stroke-linecap=\"round\">";
  s += "<path d=\"M60 80 q20 18 40 4 M58 112 q22 -14 44 2\"/>";
  s += "<path d=\"M216 100 h48 M216 88 h48 M216 112 h48\" stroke=\"#1a5276\"/>";
  s += "<path d=\"M352 78 q24 22 44 40 M444 78 q-24 22 -44 40\" stroke=\"#1a5276\"/>";
  s += "<path d=\"M522 84 q16 14 30 4 M524 118 q14 -12 28 0\" stroke=\"#7b241c\"/>";
  s += "</g>";
  s += "<circle cx=\"545\" cy=\"100\" r=\"26\" fill=\"none\" stroke=\"#8a7a52\" stroke-width=\"1.5\"/>";
  s += "<g font-weight=\"bold\" font-size=\"13\">";
  var lab = ["A", "B", "C", "D"];
  for (var j = 0; j < 4; j++) { s += "<circle cx=\"" + cx[j] + "\" cy=\"182\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"" + cx[j] + "\" y=\"187\" text-anchor=\"middle\">" + lab[j] + "</text>"; }
  s += "</g></svg>";
  return s;
}
function s9u4NucleusSVG() {
  var s = "<svg viewBox=\"0 0 640 300\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<ellipse cx=\"300\" cy=\"150\" rx=\"260\" ry=\"120\" fill=\"#eef6fb\" stroke=\"#5b8db8\" stroke-width=\"2\"/>";
  s += "<circle cx=\"300\" cy=\"150\" r=\"72\" fill=\"#fdecea\" stroke=\"#7b241c\" stroke-width=\"2\"/>";
  s += "<g stroke=\"#7b241c\" stroke-width=\"5\" stroke-linecap=\"round\"><path d=\"M262 118 q14 16 4 32 M296 108 q16 20 6 40 M332 118 q12 14 4 30\"/></g>";
  s += "<g stroke=\"#1a5276\" stroke-width=\"3\" stroke-linecap=\"round\"><path d=\"M282 132 q8 8 2 18\"/></g>";
  s += "<ellipse cx=\"120\" cy=\"90\" rx=\"30\" ry=\"14\" fill=\"#d5e8d4\" stroke=\"#3a7d44\"/>";
  s += "<ellipse cx=\"490\" cy=\"210\" rx=\"34\" ry=\"16\" fill=\"#d5e8d4\" stroke=\"#3a7d44\"/>";
  function co(x, y, t) { return "<circle cx=\"" + x + "\" cy=\"" + y + "\" r=\"11\" fill=\"#fff\" stroke=\"#333\"/><text x=\"" + x + "\" y=\"" + (y + 5) + "\" text-anchor=\"middle\" font-weight=\"bold\" font-size=\"13\">" + t + "</text>"; }
  s += co(560, 40, "A") + co(300, 150, "B") + co(288, 138, "C") + co(120, 90, "D") + co(490, 210, "E");
  s += "<g stroke=\"#333\" stroke-width=\"1\"><line x1=\"549\" y1=\"48\" x2=\"520\" y2=\"70\"/><line x1=\"311\" y1=\"150\" x2=\"352\" y2=\"150\"/><line x1=\"131\" y1=\"97\" x2=\"160\" y2=\"110\"/><line x1=\"479\" y1=\"203\" x2=\"450\" y2=\"185\"/></g>";
  return s + "</svg>";
}
function s9u4LineSVG(xs, ys, xLabel, yLabel) {
  var W = 540, H = 280, base = 232, left = 58, right = W - 25, top = 28;
  var maxX = Math.max.apply(null, xs), maxY = Math.max.apply(null, ys) * 1.15;
  function X(v) { return left + v / maxX * (right - left); }
  function Y(v) { return base - v / maxY * (base - top); }
  var pts = xs.map(function (x, i) { return X(x).toFixed(1) + "," + Y(ys[i]).toFixed(1); });
  var s = "<svg viewBox=\"0 0 " + W + " " + H + "\" width=\"100%\" style=\"max-width:540px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + right + "\" y2=\"" + base + "\" stroke=\"#666\"/><line x1=\"" + left + "\" y1=\"" + base + "\" x2=\"" + left + "\" y2=\"" + top + "\" stroke=\"#666\"/>";
  for (var g = 0; g <= 4; g++) { var gv = maxY * g / 4; s += "<line x1=\"" + left + "\" y1=\"" + Y(gv) + "\" x2=\"" + right + "\" y2=\"" + Y(gv) + "\" stroke=\"#e3eaee\"/><text x=\"" + (left - 6) + "\" y=\"" + (Y(gv) + 4) + "\" text-anchor=\"end\">" + Math.round(gv) + "</text>"; }
  s += "<polyline fill=\"none\" stroke=\"#1a6f8f\" stroke-width=\"2.5\" points=\"" + pts.join(" ") + "\"/>";
  xs.forEach(function (x, i) { s += "<circle cx=\"" + X(x) + "\" cy=\"" + Y(ys[i]) + "\" r=\"3.5\" fill=\"#1a6f8f\"/><text x=\"" + X(x) + "\" y=\"" + (base + 18) + "\" text-anchor=\"middle\">" + x + "</text>"; });
  s += "<text x=\"" + (W / 2) + "\" y=\"" + (H - 4) + "\" text-anchor=\"middle\">" + s9u4Esc(xLabel) + "</text>";
  s += "<text x=\"15\" y=\"" + (H / 2) + "\" text-anchor=\"middle\" transform=\"rotate(-90 15 " + (H / 2) + ")\">" + s9u4Esc(yLabel) + "</text></svg>";
  return s;
}
function s9u4BarSVG(labels, values, yLabel) {
  var max = Math.max.apply(null, values) * 1.15, base = 285, top = 45, plotH = base - top;
  var s = "<svg viewBox=\"0 0 640 340\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"12\">";
  s += "<line x1=\"70\" y1=\"" + base + "\" x2=\"610\" y2=\"" + base + "\" stroke=\"#33475b\"/><line x1=\"70\" y1=\"" + top + "\" x2=\"70\" y2=\"" + base + "\" stroke=\"#33475b\"/>";
  s += "<text x=\"22\" y=\"170\" text-anchor=\"middle\" transform=\"rotate(-90 22 170)\">" + s9u4Esc(yLabel) + "</text>";
  var bw = Math.min(64, 480 / values.length), gap = 500 / values.length;
  for (var i = 0; i < values.length; i++) { var h = values[i] / max * plotH, x = 95 + i * gap; s += "<rect x=\"" + x + "\" y=\"" + (base - h) + "\" width=\"" + bw + "\" height=\"" + h + "\" fill=\"#7fb3d5\" stroke=\"#2e6da4\"/><text x=\"" + (x + bw / 2) + "\" y=\"" + (base - h - 6) + "\" text-anchor=\"middle\" font-weight=\"bold\">" + values[i] + "</text><text x=\"" + (x + bw / 2) + "\" y=\"" + (base + 20) + "\" text-anchor=\"middle\">" + s9u4Esc(labels[i]) + "</text>"; }
  return s + "</svg>";
}
function s9u4TableSVG() {
  var s = "<svg viewBox=\"0 0 640 230\" width=\"100%\" style=\"max-width:640px\" xmlns=\"http://www.w3.org/2000/svg\" font-family=\"sans-serif\" font-size=\"13\">";
  s += "<rect x=\"20\" y=\"20\" width=\"600\" height=\"190\" fill=\"#fff\" stroke=\"#33475b\"/>";
  s += "<g stroke=\"#b9c8d4\"><line x1=\"20\" y1=\"68\" x2=\"620\" y2=\"68\"/><line x1=\"20\" y1=\"116\" x2=\"620\" y2=\"116\"/><line x1=\"20\" y1=\"164\" x2=\"620\" y2=\"164\"/><line x1=\"220\" y1=\"20\" x2=\"220\" y2=\"210\"/><line x1=\"420\" y1=\"20\" x2=\"420\" y2=\"210\"/></g>";
  s += "<text x=\"34\" y=\"50\" font-weight=\"bold\">Method</text><text x=\"234\" y=\"50\" font-weight=\"bold\">Parents</text><text x=\"434\" y=\"50\" font-weight=\"bold\">Offspring match parent</text>";
  s += "<text x=\"34\" y=\"98\">Budding</text><text x=\"234\" y=\"98\">One</text><text x=\"434\" y=\"98\">Identical</text>";
  s += "<text x=\"34\" y=\"146\">Seed after pollination</text><text x=\"234\" y=\"146\">Two (gametes)</text><text x=\"434\" y=\"146\">Varied</text>";
  s += "<text x=\"34\" y=\"194\">Runners</text><text x=\"234\" y=\"194\">One</text><text x=\"434\" y=\"194\">Identical</text>";
  return s + "</svg>";
}

E("s9-u4-nucleus-role", 4, ["SC9.10.1"], 1, "var", varset([
  function () { return mcq("What is the main role of the nucleus in a cell?", "It contains the genetic information and controls the processes of the cell", ["It stores water and dissolved food for the cell in a large sap-filled space", "It makes food for the cell by photosynthesis in the light of the sun", "It holds the whole cell in a fixed, rigid shape at all times in the body"], "The nucleus contains the genetic information of the cell. From that information it directs the processes of the cell, including growth and cell division.", {}); }
]), ["Think about what is stored inside the nucleus.", "It directs, not digests or feeds."]);

E("s9-u4-traits-heredity", 4, ["SC9.10.1"], 1, "var", varset([
  function () { return mcq("Which statement defines heredity correctly?", "The passing of genetic information from parents to offspring", ["The changing of a trait during an organism's lifetime", "The sorting of offspring into groups by size", "The loss of genetic information as cells divide"], "Heredity is the passing of genetic information from parents to offspring. The traits an offspring shows, such as eye colour, come from that inherited information.", {}); }
]), ["Think parents to offspring.", "It is about passing information on."]);

E("s9-u4-trait-example", 4, ["SC9.10.1"], 1, "var", varset([
  function () { return mcq("A student lists four features. Which one is a trait carried in genetic information?", "Eye colour", ["A deep scar", "A haircut", "A suntan"], "Eye colour is a trait determined by genetic information in the nucleus. A scar, a haircut and a suntan are acquired during life and are not carried in the genetic information. This item is rewritten from the MapOfMe not-a-trait selection shape.", {}); }
]), ["Ask which feature was present from the start.", "Inherited, not acquired."]);

E("s9-u4-nucleus-division", 4, ["SC9.10.1"], 1, "var", varset([
  function () { return mcq("A skin cell is about to divide to heal a small cut. Which structure directs the division and passes a full set of genetic information to each new cell?", "The nucleus", ["The cell membrane", "The cytoplasm alone", "The vacuole"], "The nucleus holds the genetic information and determines cellular processes, including cell division. Each new cell receives its own nucleus with a full set of that information.", {}); }
]), ["Which structure holds the instructions?", "Division is directed from inside."]);

E("s9-u4-mutagen-define", 4, ["SC9.10.2"], 1, "var", varset([
  function () { return mcq("What is a mutagen?", "A factor that can cause a change in genetic information", ["A gene that has already changed its chemical order once", "A cell produced by meiosis during reproduction in the body", "A protein made by a chromosome inside the cell nucleus"], "A mutagen is a factor that can cause a change in a cell's genetic information. A change in the genetic information itself is called a gene mutation.", {}); }
]), ["One word names the cause, the other the change.", "Cause first: mutagen."]);

E("s9-u4-mutation-define", 4, ["SC9.10.2"], 1, "var", varset([
  function () { return mcq("A gene mutation is best described as", "a change in the order of chemicals that make up a portion of a gene", ["a doubling of every chromosome in the nucleus of the cell at once", "the movement of a whole gene from one cell to a different cell", "the division of one parent cell into two new daughter cells by mitosis"], "In this course a gene mutation is a change in the order of chemicals that make up a portion of a gene. It is a change within the gene, not a change in chromosome number or cell number.", {}); }
]), ["Stay inside the gene.", "A change in order, in a portion of one gene."]);

E("s9-u4-mutagen-sources", 4, ["SC9.10.2"], 1, "var", varset([
  function () { return mcq("Which list contains only factors that can act as mutagens?", "Solar radiation, radioactive gases and certain chemicals", ["Sunlight for photosynthesis, water and carbon dioxide", "Pollen, seeds and spores", "Warmth, food and shelter"], "Natural factors such as solar radiation and radioactive gases, and human-made factors such as certain chemicals and nuclear radiation, can change genetic information. The other lists name ordinary needs or reproductive structures, not mutagens.", {}); }
]), ["Sort causes of change from ordinary needs.", "Radiation and chemicals appear in the key."]);

E("s9-u4-cell-cycle", 4, ["SC9.10.3"], 1, "var", varset([
  function () { return mcq("What is the cell cycle?", "The repeating sequence of growth and division in the life of a cell", ["The movement of a cell from one tissue of the body to another tissue", "The path of a chromosome as it moves around the inside of the nucleus", "The full life span of a whole organism, from birth to death in years"], "The cell cycle is the repeating sequence a cell follows as it grows and then divides. Mitosis and cytokinesis are the dividing part of that cycle.", {}); }
]), ["Think of a repeating sequence, not a journey.", "Growth, then division, then repeat."]);

E("s9-u4-mitosis-result", 4, ["SC9.10.3"], 1, "var", varset([
  function () { return mcq("Mitosis followed by cytokinesis produces", "two daughter cells, each genetically identical to the parent cell", ["four daughter cells with half the genetic material", "one daughter cell with double the genetic material", "two daughter cells with completely new genetic information"], "Mitosis divides the contents of the nucleus so that each daughter cell receives a full, identical set of genetic information, and cytokinesis then divides the cell into two. The body uses this for growth and cell replacement.", {}); }
]), ["Count the cells, then compare their information.", "Two cells, identical information."]);

E("s9-u4-metaphase", 4, ["SC9.10.3"], 1, "var", varset([
  function () { var q = mcq("The diagram shows four cells in the stages of mitosis, labelled A to D. Which callout shows metaphase, when the chromosomes line up across the middle of the cell?", "B", ["A", "C", "D"], "In the diagram, callout B shows the chromosomes lined up across the middle of the cell, which is metaphase. A shows prophase, C anaphase and D telophase.", {}); q.figure = s9u4StagesSVG(); return q; }
]), ["Find the cell with chromosomes in a line.", "Meta: think middle."]);

E("s9-u4-cytokinesis", 4, ["SC9.10.3"], 1, "var", varset([
  function () { return mcq("What happens during cytokinesis?", "The cell itself divides into two, after the nucleus has divided", ["The chromosomes line up in a row across the middle of the cell", "The nuclear membrane around the nucleus fades away completely", "Homologous chromosomes pair up side by side in the cell first"], "Cytokinesis is the division of the cell itself, following mitosis, so that each new nucleus ends up in its own cell. It completes the production of two daughter cells.", {}); }
]), ["It follows the nuclear division.", "The cell splits; the nucleus already divided."]);

E("s9-u4-asex-define", 4, ["SC9.10.4"], 1, "var", varset([
  function () { return mcq("Asexual reproduction is reproduction in which", "one parent produces offspring genetically identical to itself", ["two parents combine gametes to produce offspring", "a fertilized egg develops into an embryo", "pollen is transferred to the female part of a flower"], "Asexual reproduction involves one parent, and the offspring are genetically identical to that parent, so there is much less variation. Sexual reproduction combines gametes from two parents in the majority of cases.", {}); }
]), ["Count the parents.", "One parent, identical offspring."]);

E("s9-u4-vegetative", 4, ["SC9.10.4"], 1, "var", varset([
  function () { var q = mcq("The table compares three ways organisms reproduce. Which row describes a sexual method?", "Seed after pollination", ["Budding", "Runners", "All three rows in the table"], "Only the seed row involves two parents contributing gametes, so only it is sexual. Budding and runners each involve one parent and produce identical offspring, so both are asexual.", {}); q.figure = s9u4TableSVG(); return q; }
]), ["Look for two parents and gametes.", "Identical offspring means asexual here."]);

E("s9-u4-moss-water", 4, ["SC9.10.4"], 1, "var", varset([
  function () { return mcq("Why does sexual reproduction in moss require water?", "The gametes must be able to reach each other through water for fertilization to occur", ["Moss flowers must be pollinated under water whenever the plant reproduces sexually", "Moss seeds can only germinate and begin to grow when they are under water in a pond", "The spores of the moss dissolve at once if they are allowed to dry out in the air"], "For moss, the guide limits the discussion to three points: sexual reproduction needs water so the gametes can meet, moss can also reproduce asexually by spores, and the moss plant has specific male and female parts. Moss has no flowers or seeds.", {}); }
]), ["Keep to the guide's three moss points.", "Gametes meeting is the key step."]);

E("s9-u4-metamorphosis", 4, ["SC9.10.4"], 1, "var", varset([
  function () { return mcq("A grasshopper hatches as a small nymph that looks much like the adult and grows through a series of moults. A butterfly hatches as a caterpillar and later forms a pupa. Which statement is correct?", "The grasshopper shows incomplete metamorphosis and the butterfly shows complete metamorphosis", ["Both show complete metamorphosis", "The grasshopper shows complete metamorphosis and the butterfly shows incomplete metamorphosis", "Neither insect undergoes metamorphosis"], "Incomplete metamorphosis, as in the grasshopper, has a nymph stage that resembles the adult. Complete metamorphosis, as in the butterfly, has distinct larva and pupa stages very different from the adult.", {}); }
]), ["Look for a pupa stage.", "Pupa present: complete."]);

E("s9-u4-gamete-define", 4, ["SC9.10.5"], 1, "var", varset([
  function () { return mcq("A gamete is", "a sex cell, such as an egg cell or a sperm cell", ["a fertilized egg", "a body cell with a full set of chromosomes", "the structure that holds a plant embryo"], "Gametes are the sex cells, egg cells and sperm cells. Each gamete is haploid: it carries half the genetic content of a body cell. A fertilized egg is a zygote, not a gamete.", {}); }
]), ["Egg and sperm are the examples.", "Half the genetic content."]);

E("s9-u4-meiosis-result", 4, ["SC9.10.5"], 1, "var", varset([
  function () { return mcq("Meiosis produces", "four daughter cells, each with half the genetic material of the parent cell", ["two daughter cells, each genetically identical to the parent cell in full", "one daughter cell containing double the genetic material of the parent", "four daughter cells, each identical in every way to the parent cell itself"], "Meiosis is the division that produces sex cells. It produces four daughter cells, and each one contains half the number of chromosomes, half the genetic material, of the parent cell.", {}); }
]), ["Four cells, half the material.", "Compare with mitosis: two and full."]);

E("s9-u4-diploid-haploid", 4, ["SC9.10.5"], 1, "var", varset([
  function () { return mcq("A body cell of an organism is diploid and a gamete of the same organism is haploid. This means the gamete has", "half the genetic content of the body cell", ["twice the genetic content of the body cell", "exactly the same genetic content as the body cell", "no genetic content at all"], "Diploid means genetic content equal to the parent cell; haploid means half the genetic content. Gametes are haploid so that fertilization restores the full, diploid content in the zygote.", {}); }
]), ["Diploid: full. Haploid: half.", "Fertilization adds the two halves."]);

E("s9-u4-interkinesis", 4, ["SC9.10.5"], 1, "var", varset([
  function () { return mcq("Interkinesis is the stage of meiosis in which", "the cell grows and makes various proteins between the two divisions", ["homologous chromosomes pair up", "chromosomes line up at the equator for the second time", "four haploid gametes are finally released"], "Interkinesis is the interval between meiosis I and meiosis II, in which the cell grows and makes various proteins. Pairing of homologous chromosomes is prophase I; the final four gametes appear at telophase II.", {}); }
]), ["Between the two divisions.", "Growth and protein making, in between."]);

E("s9-u4-compare-division", 4, ["SC9.10.5"], 1, "var", varset([
  function () { return mcq("Which comparison of mitosis and meiosis is correct?", "Mitosis produces two identical daughter cells for growth and replacement; meiosis produces four haploid gametes for sexual reproduction", ["Mitosis produces the gametes used in reproduction; meiosis produces body cells used for growth and repair of tissues", "Both processes produce four haploid daughter cells from each parent cell that divides, whatever the cell type", "Both processes produce two identical daughter cells from each parent cell that divides, whatever the cell type involved"], "The guide's comparison rests on three points: the types of cells involved, the number of daughter cells produced (two in mitosis, four in meiosis), and the amount of genetic material in each daughter cell (full and identical in mitosis, half in meiosis).", {}); }
]), ["Use the guide's three comparison points.", "Cells, number, amount of material."]);

E("s9-u4-variation-compare", 4, ["SC9.10.6"], 1, "var", varset([
  function () { return mcq("Which mode of reproduction generally produces the greater variety of traits in offspring?", "Sexual reproduction", ["Asexual reproduction", "Both produce exactly equal variety", "Neither produces any variety"], "Sexual reproduction combines genetic information from two parents, so a greater variety of traits is possible in the offspring. Asexual offspring are genetically identical to the single parent, and significant difference generally requires a mutation.", {}); }
]), ["Two parents mix information.", "Variety follows the mixing."]);

E("s9-u4-asex-advantage", 4, ["SC9.10.6"], 1, "var", varset([
  function () { return mcq("A plant population lives in a stable pond environment that rarely changes. Reproducing asexually is an advantage here mainly because", "it requires only one parent and less energy, and the offspring are already well suited to the unchanged environment", ["it guarantees every offspring a brand new combination of traits from two parents, in every generation", "it requires two parents to find each other and come together before any offspring can be produced at all", "it produces the greatest possible genetic variety among all the offspring in the population over time"], "Asexual reproduction needs one parent and less energy, and it passes on a combination that already works in a stable environment. Its cost, low variety, matters most when conditions change. Sexual reproduction is the mode that mixes traits.", {}); }
]), ["Match the mode to the environment.", "Stable conditions favour the proven copy."]);

E("s9-u4-sex-cost", 4, ["SC9.10.6"], 1, "var", varset([
  function () { return mcq("Which pairing states a genuine disadvantage of sexual reproduction and a genuine disadvantage of asexual reproduction?", "Sexual: two parents and more energy are usually required. Asexual: offspring show very little variation", ["Sexual: offspring are always identical. Asexual: two parents are required", "Sexual: no parental care is ever possible. Asexual: offspring always vary widely", "Sexual: it can only occur in water. Asexual: it cannot occur in plants"], "The guide compares the modes on energy required, parental care and genetic variety. Sexual reproduction usually needs two parents and more energy; asexual reproduction produces offspring with very little variation, which is a risk when the environment changes.", {}); }
]), ["Use the guide's three criteria.", "Energy, care, variety."]);

E("s9-u4-gene-chromosome", 4, ["SC9.11.1"], 1, "var", varset([
  function () { var q = mcq("The diagram shows a cell with its nucleus enlarged in view. Callout B marks the whole nucleus, C marks one chromosome inside it, and A, D and E mark other cell structures. Which callout marks a single gene?", "None of them: a gene is a segment within a chromosome, too small to be a separate callout at this scale", ["B", "C", "A"], "A gene is a segment of DNA within a chromosome, so it is part of what callout C marks, not a separate structure. B is the whole nucleus and C is one whole chromosome, which contains numerous genes.", {}); q.figure = s9u4NucleusSVG(); return q; }
]), ["A gene sits inside a chromosome.", "Part of C, not a separate label."]);

E("s9-u4-levels-order", 4, ["SC9.11.1"], 1, "var", varset([
  function () { return mcq("Which sequence correctly orders the levels from the whole organism down to the gene?", "Organism, organ systems, organs, tissues, cells, nucleus, chromosome, gene", ["Organism, cells, tissues, organs, nucleus, gene, chromosome, organ systems", "Gene, chromosome, nucleus, cells, tissues, organs, organ systems, organism", "Organism, organs, organ systems, cells, tissues, gene, nucleus, chromosome"], "The guide's flow runs organism, organ systems, organs, tissues, cells, nucleus, chromosome, gene. Each step moves to a smaller part, ending with the gene inside the chromosome inside the nucleus of the cell.", {}); }
]), ["Work from largest to smallest.", "End inside the nucleus."]);

E("s9-u4-gene-protein", 4, ["SC9.11.1"], 1, "var", varset([
  function () { return mcq("What does a gene instruct the nucleus to do?", "Produce a specific protein, and the proteins produced determine traits", ["Divide the whole cell into four gametes ready for reproduction at once", "Build a complete new chromosome from scratch inside the nucleus of the cell", "Move the nucleus from the centre to the edge of the cell and hold it there"], "A gene instructs the nucleus to produce a specific protein. The types of proteins produced determine the traits that appear in the individual, whether structural traits such as eye colour or process traits such as growth rate.", {}); }
]), ["Gene to protein to trait.", "The instruction is for one protein."]);

E("s9-u4-tech-example", 4, ["SC9.11.2"], 3, "var", varset([
  function () { return mcq("Which is an example of knowledge of cellular functions leading to a technology?", "Developing new wheat and potato varieties through breeding and genetic work", ["Building a taller office tower in the centre of a large city downtown", "Designing a faster snowmobile for winter travel across the snow and ice", "Charting a new shipping route for cargo ships across the ocean to port"], "Work on heredity and cell function has produced new crop varieties, including wheat and potato varieties, along with livestock breeding programs. The other choices do not grow out of knowledge of cellular functions.", {}); }
]), ["Look for heredity applied.", "Crops and livestock are the guide contexts."]);

E("s9-u4-tech-medicine", 4, ["SC9.11.2"], 3, "var", varset([
  function () { return mcq("A laboratory uses knowledge of genes to produce a medicine that a patient's own cells cannot make in sufficient quantity. This is an application of", "genetic engineering", ["metamorphosis", "vegetative reproduction", "cytokinesis"], "Using knowledge of genes and cellular functions to direct cells to produce a needed product is genetic engineering, the strand's core STSE topic. It applies cell knowledge as a technology.", {}); }
]), ["Genes used as a tool.", "Engineering, not a life cycle stage."]);

E("s9-u4-condition-examples", 4, ["SC9.11.3"], 3, "var", varset([
  function () { return mcq("Which list names genetic conditions the guide gives as not curable with present scientific and technological knowledge?", "Down syndrome, cystic fibrosis and Allderdice Syndrome", ["Influenza, the common cold and food poisoning", "A broken bone, a sprain and a sunburn", "Allergies, asthma and eczema"], "The guide names Down syndrome, cystic fibrosis and Allderdice Syndrome as genetic conditions that cannot be cured using scientific and technological knowledge at the present time. Allderdice Syndrome is the local example, first identified in the Sandy Point population.", {}); }
]), ["All three are genetic conditions.", "One is a Newfoundland and Labrador example."]);

E("s9-u4-allderdice", 4, ["SC9.11.3"], 3, "var", varset([
  function () { return mcq("Allderdice Syndrome was first identified in a geographically isolated community in Newfoundland and Labrador. Why do isolated populations help genetic researchers?", "A small, isolated population shares ancestry, so genetic conditions and their patterns stand out more clearly for study", ["Isolated populations have no genetic conditions at all, because isolation protects them from every inherited disorder", "Isolation removes all mutations from a population over time, leaving its genetic information completely unchanged for good", "Researchers can cure genetic conditions far more easily in such places than anywhere else in the province or country"], "Newfoundland and Labrador populations descended from small founding groups share ancestry, so a genetic condition appears in recognizable patterns across families. That clarity is why researchers consider the province a good population for studying genetic conditions. Allderdice Syndrome, caused by an inverted insertion of a chromosome, was identified this way.", {}); }
]), ["Shared ancestry makes patterns visible.", "Founder populations clarify inheritance."]);

E("s9-u4-mendel-shift", 4, ["SC9.11.4"], 3, "var", varset([
  function () { return mcq("What shift in understanding came from Mendel's experiments?", "They gave a scientific explanation for heredity, suggesting that dominant and recessive factors pass traits from one generation to the next", ["They showed the double helix structure of DNA and explained how its chemical order carries genetic information in every cell of the body", "They mapped every gene in the human genome and published the complete sequence for researchers everywhere, in full detail", "They proved that traits are never passed from one generation to the next, and that offspring resemble their parents by chance alone"], "Mendel's experiments provided a scientific explanation for heredity and suggested the involvement of dominant and recessive factors in transmitting traits. The double helix model came from Watson and Crick, and mapping the genome was the Human Genome Project, both much later.", {}); }
]), ["Earliest of the guide's shifts.", "Pea plants and factors."]);

E("s9-u4-hgp-shift", 4, ["SC9.11.4"], 3, "var", varset([
  function () { return mcq("What did the Human Genome Project add to the understanding of genetics?", "Greater insight into how and why certain medical conditions occur and how they might be treated", ["Proof that genes do not affect medical conditions in any person, whatever their family history", "The first observation of a chromosome under a microscope in a dividing cell of any kind", "A method for cloning whole organisms quickly and safely in the school classroom lab for students"], "The Human Genome Project provided greater insights into how and why certain medical conditions occur and how to treat them. It also raised concerns about the potential of genetically engineering people.", {}); }
]), ["Genome mapped, conditions understood better.", "Insight, plus new concerns."]);

E("s9-u4-canadian-apple", 4, ["SC9.11.5"], 2, "var", varset([
  function () { return mcq("The McIntosh apple, developed in Canada and now grown worldwide from grafted cuttings of the original tree, is an example of", "a Canadian contribution to heredity and plant breeding", ["a genetic condition that cannot be cured at present", "a stage in the cell cycle of an apple tree cell dividing", "a human-made mutagen acting on the trees in orchards"], "The guide names the development of the McIntosh apple among Canadian contributions connected to heredity, alongside wheat and potato varieties and livestock breeding programs. Every McIntosh tree is a vegetative copy of the original, which is why the fruit stays true to type.", {}); }
]), ["A named Canadian variety.", "Breeding and vegetative copying."]);

E("s9-u4-source-select", 4, ["SC9.12.1"], 2, "var", varset([
  function () { return mcq("A student is examining chromosomes for a report and finds one website with no author or date, a current textbook section and a recent article from a science magazine. Which approach best fits this indicator?", "Select information from the textbook and the magazine article, check that they agree, and integrate both rather than relying on the undated site alone", ["Use only the website with no author or date, because it was the first source the search turned up, and ignore the other two entirely", "Copy the longest of the three sources word for word into the report, without checking it against either of the other two before submitting", "Use whichever of the three sources happens to be shortest, because a short source is quicker to read and easier to copy into the report"], "This indicator asks students to select and integrate information from various print and electronic sources. Comparing sources, favouring identified and current ones, and combining what agrees is the selecting and integrating the indicator names.", {}); }
]), ["Various sources, checked against each other.", "Integrate, do not just copy."]);

E("s9-u4-chromosome-visible", 4, ["SC9.12.1"], 2, "var", varset([
  function () { return mcq("Chromosomes are not normally visible under a light microscope. When can they be observed?", "When the cell being observed is in the process of dividing", ["At any time in any resting cell of the body, under the microscope", "Only after the cell being observed has died and dried out completely", "Only in gametes, and never in the body cells of the organism"], "The guide notes that chromosomes become visible when a cell is dividing, which is why prepared slides of dividing cells, such as onion root tips, are used to observe them in each stage of mitosis.", {}); }
]), ["Division makes them visible.", "Look at dividing cells, such as root tips."]);

E("s9-u4-yeast-safety", 4, ["SC9.12.3"], 2, "var", varset([
  function () { return mcq("Before a yeast investigation, a group lays out its apparatus. Which practice fits using tools and apparatus safely and accurately?", "Check glassware for cracks, measure volumes carefully and follow the lab safety procedures for heating and handling cultures", ["Heat the culture directly over the open flame of the burner to save time during the investigation in class", "Estimate all the volumes by eye instead of measuring them, to finish the setup faster and save time in the lab", "Share one thermometer between all the groups in the room without cleaning it between cultures at the bench"], "Safe and accurate bench work means sound apparatus, careful measurement and the lab's safety procedures. The investigation itself, growing the yeast cultures, is hands-on work assessed in the classroom; this item carries its safety and accuracy decisions.", {}); }
]), ["Safety and accuracy together.", "Check, measure, follow procedure."]);

E("s9-u4-communicate-result", 4, ["SC9.12.5"], 2, "var", varset([
  function () { return mcq("A yeast investigation finds the warm, fed culture grew most. Which communication of the result is complete?", "A statement of the conclusion naming the best condition, supported by the measured growth values for every condition tested", ["A brief statement that the experiment worked well and that the group was pleased with how it went in class", "The raw numbers from the notebook page, copied out neatly, with no conclusion drawn from them at all by the group", "A conclusion naming as best a condition that was never tested during the investigation at any point in the lab"], "Communicating results means stating what was found and supporting it with the investigation's own data: the best condition, named, with the measured values for all conditions so the claim can be checked.", {}); }
]), ["Conclusion plus supporting data.", "Every condition, with values."]);

E("s9-u4-organize-choice", 4, ["SC9.12.6"], 2, "var", varset([
  function () { return mcq("A group has final chromosome counts for mitosis and meiosis: cells produced, and genetic content per cell. Which format best organizes this data for comparison?", "A comparison table with a row for each process and columns for cells produced and genetic content", ["A flow chart showing the steps of the yeast investigation in order from start to finish", "A scatter plot of unrelated measurements taken from other investigations in the course", "A paragraph of writing with the numbers included in the order they were written down in the notebook"], "Organizing data in a format appropriate to the task means matching the format to the comparison: a table with rows for the two processes and columns for the two compared features. The guide's own mitosis and meiosis comparison is organized exactly this way.", {}); }
]), ["Comparison calls for a table.", "Rows: processes. Columns: features."]);

E("s9-u4-organize-flow", 4, ["SC9.12.6"], 2, "var", varset([
  function () { return mcq("Which data is best organized as a flow chart rather than a table or graph?", "The sequence of stages in meiosis I followed by meiosis II", ["Final yeast counts measured under four different conditions", "Resting measurements recorded across three separate trials", "The measured sizes of five different cells under the microscope"], "A flow chart displays a sequence of steps or stages, so the ordered stages of meiosis fit it. Counts and measurements for comparison belong in tables or graphs.", {}); }
]), ["Sequence: flow chart.", "Stages happen in order."]);

E("s9-u4-team-idea", 4, ["SC9.12.8"], 2, "var", varset([
  function () { return mcq("During a mitosis and meiosis comparison lab, one team member suggests sketching meiosis II beside mitosis because the two are easy to confuse. Her partner listens, checks the idea against the task, adds the paired sketches to their poster and credits the suggestion when they present. What does the partner's response show?", "Receiving, understanding and acting on the idea of another person", ["Working alone on a separate poster to avoid any disagreement", "Copying another team's finished poster without their knowledge", "Rejecting a partner's idea at once without hearing it out fully"], "The partner received the idea, understood it well enough to check it against the task, and acted on it by building it into the team's work. That is the full receive, understand and act sequence this indicator names. The cooperative poster work itself happens in the classroom; this scenario carries the judgement of the response.", {}); }
]), ["Three steps: receive, understand, act.", "The idea changed the team's work."]);

E("s9-u4-evaluate-claim", 4, ["SC9.12.10"], 2, "var", varset([
  function () { return mcq("A website claims a genetically engineered food is completely safe because one company study found no problems. Which evaluation is strongest?", "The evidence is weak on its own: check the date, the intended audience and the author's intent, and look for independent studies before deciding", ["Accept the claim at face value because it appears on a website, and ask no questions about who wrote the page or why it was posted online", "Reject all genetic engineering claims automatically, whatever evidence any of them offers, without examining a single one of them in detail", "Accept the claim because the one study agrees with the website's headline, and treat that agreement as all the checking the claim needs"], "Evaluating information on genetics and genetic engineering means weighing date, audience and author intent, and testing one interested study against independent evidence. Neither automatic acceptance nor automatic rejection is evaluation.", {}); }
]), ["Who wrote it, when, and for whom?", "One interested study is not enough."]);

E("s9-u4-evaluate-sources", 4, ["SC9.12.10"], 2, "var", varset([
  function () { return mcq("Two articles argue opposite positions on labelling genetically modified foods. Article A is a recent government review summarizing many studies. Article B is an undated advocacy pamphlet citing no studies. For a class position paper, the best use of the pair is to", "rely mainly on Article A for evidence, and use Article B as an example of a position held, noting its lack of cited evidence", ["average the two articles' positions and treat both articles as equally strong evidence for the paper being written", "use only Article B for the paper because it is shorter and clearer to read than Article A for students", "discard both articles entirely because the two of them disagree with each other on the question of labelling"], "Evaluation weighs the evidence behind each source: a recent review summarizing many studies carries more weight than an undated pamphlet citing none. The pamphlet still documents that a position exists, which is a legitimate, limited use.", {}); }
]), ["Weigh evidence, not just positions.", "Recent, sourced review outweighs a pamphlet."]);

E("s9-u4-gen-division-count", 4, ["SC9.10.3"], 2, "gen", function () {
  var rounds = pick([2, 3, 4, 5]);
  var start = pick([1, 3]);
  var cells = start * Math.pow(2, rounds);
  var dis = [cells * 2, start * rounds * 2, cells + start, cells - start].filter(function (v) { return v !== cells; }).slice(0, 3);
  return mcq("A culture begins with " + start + " cell(s). Every cell divides by mitosis each round. After " + rounds + " rounds of division, how many cells are there?",
    cells + "", dis.map(String),
    "Each round doubles the population. Starting from " + start + ", after " + rounds + " rounds the count is " + start + " doubled " + rounds + " times, which is " + cells + " cells.", {});
}, ["Each round doubles the count.", "Double once per round."]);

E("s9-u4-gen-gamete-number", 4, ["SC9.10.5"], 2, "gen", function () {
  var dip = pick([8, 12, 20, 46]);
  var hap = dip / 2;
  var dis = [dip, dip * 2, hap + 2].filter(function (v) { return v !== hap; });
  return mcq("A body cell of an organism has " + dip + " chromosomes. How many chromosomes does one of its gametes have after meiosis?",
    hap + "", dis.map(String),
    "Meiosis produces haploid gametes with half the genetic content of the diploid body cell. Half of " + dip + " is " + hap + " chromosomes.", {});
}, ["Gametes are haploid.", "Take half the body cell number."]);

E("s9-u4-gen-population", 4, ["SC9.12.2"], 2, "gen", function () {
  var start = pick([2, 4, 5]);
  var gens = pick([3, 4]);
  var cells = start * Math.pow(2, gens);
  var dis = [cells * 2, cells + start * gens, start * gens * 2].filter(function (v) { return v !== cells; }).slice(0, 3);
  return mcq("A theoretical cell population starts at " + start + " cells and doubles every generation. What is the population after " + gens + " generations?",
    cells + "", dis.map(String),
    "Doubling from " + start + " for " + gens + " generations gives " + cells + " cells. Each generation multiplies the population by 2.", {});
}, ["Multiply by 2 each generation.", "Doubling is not adding."]);

E("s9-u4-gen-population-graph", 4, ["SC9.12.2"], 2, "gen", function () {
  var start = pick([3, 6]);
  var xs = [0, 1, 2, 3, 4];
  var ys = xs.map(function (g) { return start * Math.pow(2, g); });
  var target = start * Math.pow(2, 6);
  var dis = [start * Math.pow(2, 5), target * 2, start * 6 * 2].filter(function (v) { return v !== target; }).slice(0, 3);
  var q = mcq("The graph shows a theoretical cell population doubling every generation from " + start + " cells. Extrapolating the pattern, what is the predicted population at generation 6?",
    target + "", dis.map(String),
    "The graphed values double each generation, reaching " + ys[4] + " at generation 4. Continuing the pattern gives generation 5 and then generation 6 at " + target + " cells. Predicting beyond the graphed range is extrapolation.", {});
  q.figure = s9u4LineSVG(xs, ys, "Generation", "Cells");
  return q;
}, ["Continue the doubling past the graph.", "Beyond the range: extrapolation."]);

E("s9-u4-gen-yeast-graph", 4, ["SC9.12.4"], 2, "gen", function () {
  var start = pick([2, 3, 4, 5]);
  var rate = pick([3, 4, 5, 6]);
  var askH = pick([2, 3, 4]);
  var xs = [0, 1, 2, 3, 4];
  var ys = xs.map(function (h) { return start + rate * h; });
  var atH = start + rate * askH;
  var dis = [atH - rate, atH + rate, atH + 2 * rate].filter(function (v) { return v !== atH; });
  var q = mcq("The graph shows a yeast population that starts at " + start + " million cells per millilitre and grows by " + rate + " million each hour in a warm, fed culture. What is the population, in millions of cells per millilitre, at hour " + askH + "?",
    atH + "", dis.map(String),
    "Reading the plotted line at hour " + askH + " gives " + atH + " million cells per millilitre. The population rises by " + rate + " million each hour from a start of " + start + " million.", {});
  q.figure = s9u4LineSVG(xs, ys, "Time (hours)", "Yeast (millions per mL)");
  return q;
}, ["Find the asked hour, then read across and down.", "Read the point, not the trend word."]);

E("s9-u4-gen-conditions-chart", 4, ["SC9.12.7"], 2, "gen", function () {
  var warm = pick([42, 48, 54, 60]);
  var cold = pick([9, 11, 13, 15]);
  var nofood = pick([3, 4, 5]);
  var coldnofood = pick([1, 2]);
  var labels = ["Warm, fed", "Warm, no food", "Cold, fed", "Cold, no food"];
  var values = [warm, nofood, cold, coldnofood];
  var q = mcq("The bar chart displays final yeast populations under four conditions. The cold, fed culture reached " + cold + " million cells per millilitre, and the warm culture without food reached " + nofood + " million. Which condition produced the largest population, and what was its value?",
    "Warm, fed, at " + warm + " million cells per millilitre",
    ["Cold, fed, at " + cold + " million cells per millilitre", "Warm, no food, at " + nofood + " million cells per millilitre", "Cold, no food, at " + coldnofood + " million cells per millilitre"],
    "The tallest bar is the warm, fed condition at " + warm + " million cells per millilitre. Food made the largest difference, and warmth added growth when food was present.", {});
  q.figure = s9u4BarSVG(labels, values, "Yeast (millions per mL)");
  return q;
}, ["Find the tallest bar.", "Read its value from the top of the bar."]);

E("s9-u4-display-line", 4, ["SC9.12.7"], 2, "var", varset([
  function () { return mcq("A student records a growing yeast population every hour for six hours to show how it changes. Which display best fits this data?", "A line graph of population against time", ["A bar graph comparing four unrelated conditions", "A flow chart of the lab steps", "A pie chart of the apparatus used"], "Change over time is shown as a trend on a line graph, with time on the horizontal axis and population on the vertical axis. Bar graphs compare separate categories.", {}); }
]), ["Change over time points to one graph type.", "Line graphs show trends."]);

E("s9-u4-display-diagram", 4, ["SC9.12.7"], 2, "var", varset([
  function () { return mcq("Which display is the best choice for showing the position of chromosomes in each stage of mitosis?", "A labelled diagram for each stage", ["A scatter plot of stage numbers", "A bar graph of stage durations only", "A data table with no drawings"], "Diagrams display the arrangement of chromosomes at each stage, which numbers alone cannot show. The guide lists diagrams among the display formats for this kind of data.", {}); }
]), ["The data is positions, not just numbers.", "Draw what the chromosomes are doing."]);

E("s9-u4-trend-reading", 4, ["SC9.12.4"], 2, "var", varset([
  function () { return mcq("A yeast culture kept cold grows slowly all week, while an identical culture kept warm grows quickly for three days and then levels off when its food runs out. Which statement correctly interprets the trend?", "Warmth sped growth while food lasted; growth levelled off when food became the limiting condition", ["Temperature had no effect of any kind on the growth of either culture during the week observed", "The cold culture grew faster than the warm one because it used up less of its food each day", "Levelling off in the warm culture proves the yeast in it had all died by the third day of the week"], "The warm culture's faster rise shows the temperature effect, and its levelling off when food ran out shows food limiting growth. Trends are interpreted by matching changes in the data to changes in the variables.", {}); }
]), ["Match each change to a variable.", "Rise: warmth. Plateau: food gone."]);

E("s9-u4-graph-purpose", 4, ["SC9.12.2"], 2, "var", varset([
  function () { return mcq("Why do students graph the theoretical growth of a cell population instead of only listing the numbers?", "The graph makes the doubling pattern visible and lets them interpolate and extrapolate populations", ["Graphs are required in the course because tables of numbers are not allowed in student work at all", "The graph itself changes the population values as they are plotted on the page by the student", "Listing the numbers in a column hides the starting value of the population from the reader entirely"], "A graph displays the exponential doubling pattern as a curve, and from it students can read values between plotted points (interpolation) and predict values beyond them (extrapolation), which is the work of this indicator.", {}); }
]), ["Pattern visible, values readable.", "Between points and beyond points."]);

E("s9-u4-cr-mutation", 4, ["SC9.10.2"], 2, "var", varset([
  function () { return textq("A student reads two claims about mutations. Claim 1: time outdoors in strong sunlight can change the genetic information in skin cells. Claim 2: nothing humans do can ever change genetic information. Evaluate both claims, define gene mutation and mutagen in your answer, and give one natural and one human-made factor that can change genetic information. (3 marks)",
    ["Gene mutation is a change in the order of chemicals that make up a portion of a gene, and a mutagen is a factor that causes such a change; solar radiation is a natural mutagen, and certain chemicals or nuclear radiation are human-made mutagens, so Claim 1 is supported and Claim 2 is false."],
    "<b>Model answer:</b> A gene mutation is a change in the order of chemicals that make up a portion of a gene. A mutagen is a factor that can cause such a change. Claim 1 is supported: solar radiation is a natural mutagen and can change the genetic information in skin cells. Claim 2 is false: human activity also produces mutagens, such as certain chemicals and nuclear radiation. Both nature and human activity can change a cell's genetic information.<br><br><b>Marking points:</b> 1 mark for defining gene mutation and mutagen correctly; 1 mark for a valid natural factor (solar radiation or radioactive gases) applied to Claim 1; 1 mark for a valid human-made factor (chemicals or nuclear radiation) used to reject Claim 2.", {}); }
]), ["Define both terms first.", "One natural factor, one human-made factor."]);

E("s9-u4-cr-mitosis-stages", 4, ["SC9.10.3"], 2, "var", varset([
  function () { return textq("Describe what happens to the chromosomes and the nuclear membrane in prophase, metaphase, anaphase and telophase of mitosis, and state what cytokinesis then does. (3 marks)",
    ["In prophase the double-stranded chromosomes shorten and thicken and the nuclear membrane begins to fade; in metaphase the chromosomes line up across the middle of the cell; in anaphase the chromosomes are pulled to opposite poles; in telophase a set of chromosomes at each pole forms two nuclei; cytokinesis then divides the cell into two daughter cells."],
    "<b>Model answer:</b> Prophase: the double-stranded chromosomes shorten and thicken, and the nuclear membrane begins to fade. Metaphase: the chromosomes line up across the middle of the cell. Anaphase: the chromosomes are pulled to opposite poles of the cell. Telophase: the set of chromosomes at each pole forms two nuclei, and the cell is ready to divide. Cytokinesis then divides the cell itself into two daughter cells, each with its own nucleus.<br><br><b>Marking points:</b> 1 mark for prophase and metaphase described correctly; 1 mark for anaphase and telophase described correctly; 1 mark for cytokinesis dividing the cell into two daughter cells.", {}); }
]), ["Four phases in order, then the split.", "Chromosomes and membrane in each phase."]);

E("s9-u4-cr-methods", 4, ["SC9.10.4"], 2, "var", varset([
  function () { return textq("A strawberry patch spreads by runners, a hydra grows a bud that breaks away, and a flowering plant produces seeds after pollination. Classify each case as asexual or sexual reproduction and justify each classification. (3 marks)",
    ["Runners are asexual vegetative reproduction from one parent; budding in hydra is asexual reproduction from one parent; seed production after pollination is sexual reproduction because it involves fertilization, the fusion of gametes, producing a fertilized egg that becomes the seed."],
    "<b>Model answer:</b> Strawberry runners: asexual reproduction. A runner is a vegetative structure of one parent plant that grows into a new plant, with no gametes or fertilization. Hydra bud: asexual reproduction. The bud is an outgrowth of one parent that enlarges and separates. Flowering plant seeds: sexual reproduction. Pollination transfers pollen from the male part to the female part of the flower, fertilization fuses the gametes, and the fertilized egg becomes the seed.<br><br><b>Marking points:</b> 1 mark for each case correctly classified with a justification tied to one parent and no fertilization (asexual cases) or to gametes and fertilization (sexual case).", {}); }
]), ["Classify, then justify each one.", "One parent or gametes and fertilization?"]);

E("s9-u4-cr-reproduction-choice", 4, ["SC9.10.6"], 2, "var", varset([
  function () { return textq("A coastal plant population faces a changing environment: winters are becoming milder and a new insect pest has arrived. The plant can reproduce both sexually by seed and asexually by cuttings. Argue which mode better serves the population's survival in the changing environment, and state one cost of the mode you choose. (4 marks)",
    ["Sexual reproduction better serves survival in a changing environment because combining genetic information from two parents produces a greater variety of traits, so some offspring are more likely to carry traits that suit the milder winters or resist the new pest; its cost is that it usually requires two parents and more energy, and offspring are not guaranteed to match a parent that was already well suited."],
    "<b>Model answer:</b> Sexual reproduction by seed is the better choice in a changing environment. It combines genetic information from two parents, producing offspring with a greater variety of traits. In a population facing milder winters and a new pest, variety means some offspring are more likely to have traits that fit the new conditions or resist the pest, so the population can adapt over generations. Asexual cuttings would copy the parents exactly, including any vulnerability to the pest. The cost of the sexual mode is that it usually requires two parents and more energy, and a well suited parent's exact combination is not preserved.<br><br><b>Marking points:</b> 1 mark for choosing sexual reproduction for a changing environment; 1 mark for variety of traits as the reason; 1 mark for applying variety to the stated change (milder winters or the new pest) and contrasting with identical asexual copies; 1 mark for a genuine cost of the chosen mode (two parents, more energy, or loss of a proven combination).", {}); }
]), ["Changing conditions reward variety.", "Name a cost of your choice too."]);

E("s9-u4-cr-technology", 4, ["SC9.11.2"], 2, "var", varset([
  function () { return textq("Choose one technology that grew out of knowledge of cellular functions and heredity (for example, a new crop variety, a livestock breeding program, or a genetic engineering product). Explain the cell or heredity knowledge behind it and what the technology achieves. (3 marks)",
    ["Knowledge that the nucleus holds genetic information determining traits allows breeders and genetic engineers to select or alter the traits passed to offspring; a new wheat variety bred for disease resistance passes the resistance trait to every generation of the crop."],
    "<b>Model answer:</b> Example: a new wheat variety bred for resistance to a fungal disease. The knowledge behind it is that the nucleus contains the genetic information that determines traits, and that traits are passed from parents to offspring by heredity. Breeders cross plants showing resistance and select offspring that carry the trait, generation after generation, until the variety reliably carries it. The technology achieves a crop that keeps the resistance in every planting, reducing losses without relying only on sprays. Livestock breeding programs and genetic engineering products earn the marks on the same pattern.<br><br><b>Marking points:</b> 1 mark for a valid technology example; 1 mark for the cell or heredity knowledge behind it (nucleus, genetic information, traits passed on); 1 mark for what the technology achieves.", {}); }
]), ["Name it, give the knowledge, give the payoff.", "Traits are passed on: use that."]);

E("s9-u4-cr-condition", 4, ["SC9.11.3"], 2, "var", varset([
  function () { return textq("Pick one genetic condition named in this unit that cannot be cured at present (Down syndrome, cystic fibrosis or Allderdice Syndrome). State what is known about its genetic basis as given in the guide, and explain why present science can manage or study it without curing it. (3 marks)",
    ["Allderdice Syndrome is caused by an inverted insertion of a chromosome, is carried by females in the affected population with about a 31 percent likelihood per pregnancy, and involves a change in the chromosome structure present in the body's cells, which present technology cannot rewrite throughout the body."],
    "<b>Model answer:</b> Example: Allderdice Syndrome. It is caused by an inverted insertion of a chromosome, and in the population where it was identified, Sandy Point, resettled to St. George's, the female is the carrier, with about a 31 percent likelihood of occurrence per pregnancy. Its features include low birth weight, hand and facial abnormalities and psychomotor dysfunction. Present science can identify the condition, study its pattern in families and support those affected, but the changed chromosome structure is present in the cells of the body, and no present technology can correct it in every cell, so it cannot be cured at this time. Down syndrome and cystic fibrosis earn the marks on the same pattern, keyed to their own guide facts.<br><br><b>Marking points:</b> 1 mark for naming a valid condition; 1 mark for a correct guide fact about its genetic basis; 1 mark for explaining why a change carried in the body's cells cannot presently be corrected throughout the body.", {}); }
]), ["Guide facts only for your condition.", "Present in the cells: why that blocks a cure."]);

E("s9-u4-cr-shifts", 4, ["SC9.11.4"], 3, "var", varset([
  function () { return textq("Describe two major shifts in the scientific understanding of genetics from this unit, and for each one state what scientists could explain or do after the shift that they could not before. (3 marks)",
    ["Mendel's experiments explained heredity through dominant and recessive factors; Watson and Crick's double helix model of DNA helped explain how and why mutations occur; the Human Genome Project gave insight into how and why certain medical conditions occur and how to treat them."],
    "<b>Model answer:</b> Any two of the following, fully explained. Mendel's experiments: heredity gained a scientific explanation, with dominant and recessive factors transmitting traits between generations, where before there was no tested mechanism. Watson and Crick's double helix model of DNA: the model paved the way for explaining how and why mutations occur, because a structure for DNA made changes in it thinkable and testable. The Human Genome Project: mapping the genome gave greater insight into how and why certain medical conditions occur and how to treat them. Genetic engineering: applying gene knowledge to foods and medicine became possible, raising new concerns inside and outside science.<br><br><b>Marking points:</b> 1 mark for each shift correctly identified (maximum 2 marks); 1 mark for a correct new explanation or capability attached to one of the shifts, or half marks per shift at teacher discretion totalling the third mark.", {}); }
]), ["Two shifts, each with a new capability.", "What could science do afterwards?"]);

E("s9-u4-cr-canadian", 4, ["SC9.11.5"], 3, "var", varset([
  function () { return textq("Give two Canadian contributions to science and technology related to heredity or genetic engineering from this unit, and explain the heredity idea each one depends on. (3 marks)",
    ["Canadian contributions include the development of wheat and potato varieties, livestock breeding programs, the McIntosh apple, and the work of Aqua Bounty Farms in Newfoundland and Labrador in genetic engineering; each depends on traits being determined by genetic information and passed from parents to offspring."],
    "<b>Model answer:</b> Any two of the following. Wheat and potato varieties: breeders selected plants carrying desired traits, depending on heredity, the passing of genetic information determining traits from parents to offspring. Livestock breeding programs: the same selection idea applied to animals. The McIntosh apple: a selected variety kept true by vegetative grafting, depending on asexual copies carrying identical genetic information. Aqua Bounty Farms in Newfoundland and Labrador: genetic engineering work that depends on genes determining traits and being open to deliberate change.<br><br><b>Marking points:</b> 1 mark for each valid Canadian contribution (maximum 2 marks); 1 mark for the heredity idea (traits determined by genetic information, passed on or copied) correctly tied to at least one contribution.", {}); }
]), ["Two contributions, one shared idea.", "Selection, copying or engineering of traits."]);

E("s9-u4-cr-graph-reading", 4, ["SC9.12.2"], 3, "var", varset([
  function () { return textq("A theoretical cell population starts at 5 cells and doubles every generation. A student graphs the population for generations 0 to 4. State the population at generation 3, the population the graph predicts at generation 6, and whether each value is found by interpolation or extrapolation. (3 marks)",
    ["Generation 3 is 40 cells, found on the graphed range; generation 6 is 320 cells, found by extending the doubling pattern beyond the graphed range, which is extrapolation."],
    "<b>Model answer:</b> Doubling from 5 gives 5, 10, 20, 40 and 80 cells at generations 0 to 4. At generation 3 the population is 40 cells; reading a value inside the graphed range is interpolation. Continuing the pattern, generation 5 is 160 and generation 6 is 320 cells; predicting beyond the graphed range is extrapolation.<br><br><b>Marking points:</b> 1 mark for 40 cells at generation 3; 1 mark for 320 cells at generation 6 by continued doubling; 1 mark for interpolation and extrapolation correctly assigned.", {}); }
]), ["Double step by step.", "Inside the range versus beyond it."]);

E("s9-u4-cr-design-yeast", 4, ["SC9.12.3"], 3, "var", varset([
  function () { return textq("Design an investigation to determine the best conditions for yeast reproduction. Your design must state the question in testable form, the variable you will change, the variable you will measure and how, at least two variables you will control, and one safety or accuracy practice. (4 marks)",
    ["Change one condition such as temperature or food supply while measuring yeast population growth the same way in every trial, control yeast amount, water and time, and follow safe, accurate apparatus practice."],
    "<b>Model answer:</b> Question: under which temperature does a yeast culture grow fastest? Changed variable: the temperature of the cultures (for example, cold room, room temperature and warm water bath). Measured variable: population growth, measured the same way in every trial, for example by counting cells in a fixed microscope field or by measuring the gas produced in a fixed time. Controlled variables: the same amount of yeast, the same food supply and water volume, the same container and the same growth time for every trial. Safety and accuracy: check glassware for cracks, measure volumes carefully and follow lab procedures for heating and handling cultures. A design changing food supply instead of temperature earns full marks on the same pattern.<br><br><b>Marking points:</b> 1 mark for a testable question naming the condition and growth; 1 mark for one changed variable and one measured variable with a consistent measurement method; 1 mark for at least two sensible controlled variables; 1 mark for a safety or accuracy practice.", {}); }
]), ["One change, one measurement, controls held.", "This is the design item: plan before bench work."]);

E("s9-u4-cr-trends", 4, ["SC9.12.4"], 3, "var", varset([
  function () { return textq("In a yeast investigation, cultures with a food supply grow steadily faster as temperature rises from 10 to 30 degrees, then growth falls sharply at 40 degrees. Cultures without food barely grow at any temperature. State the trend, and infer the relationship among food, temperature and growth that explains both parts of the data. (3 marks)",
    ["Growth increases with temperature up to an optimum near 30 degrees and falls beyond it, and food is required for growth at every temperature, so temperature and food both limit yeast reproduction."],
    "<b>Model answer:</b> Trend: with food, growth rises as temperature increases from 10 to 30 degrees, then falls sharply at 40 degrees. Without food, growth stays near zero at all temperatures. Inference: yeast reproduction needs food at every temperature, so food is a limiting condition; temperature helps up to an optimum around 30 degrees and harms growth beyond it, so the best conditions combine an adequate food supply with a warm but not excessive temperature. The two variables act together, not separately.<br><br><b>Marking points:</b> 1 mark for the rising then falling temperature trend with food; 1 mark for the near-zero growth without food at all temperatures; 1 mark for the inference that both food and a suitable temperature are required and act together.", {}); }
]), ["Describe first, infer second.", "Both variables, acting together."]);

E("s9-u4-cr-communicate", 4, ["SC9.12.5"], 3, "var", varset([
  function () { return textq("A group investigated yeast growth under four conditions and measured these final populations, in millions of cells per millilitre: warm with food 48, warm without food 3, cold with food 11, cold without food 2. Write the results communication for this investigation: a conclusion, the evidence for it, and one limitation or next step. (3 marks)",
    ["The best condition was warm with food at 48 million cells per millilitre, far above cold with food at 11 and the two no-food conditions at 3 and 2, showing both warmth and food were needed."],
    "<b>Model answer:</b> Conclusion: yeast grew best in the warm condition with food. Evidence: the warm, fed culture reached 48 million cells per millilitre, compared with 11 for cold with food, and 3 and 2 for the two cultures without food, so food made the larger difference and warmth added further growth when food was present. Limitation and next step: each condition was measured once, so the group should repeat each condition and average the results before treating the ranking as settled.<br><br><b>Marking points:</b> 1 mark for a conclusion naming warm with food as best; 1 mark for evidence quoting at least two values in comparison; 1 mark for a sensible limitation or next step, such as repeating trials.", {}); }
]), ["Conclusion, evidence with values, next step.", "Quote the numbers, do not just name the winner."]);

E("s9-u4-cr-evaluate", 4, ["SC9.12.10"], 3, "var", varset([
  function () { return textq("A pamphlet opposing genetic engineering states that engineered foods have never been tested and that scientists all oppose them. Evaluate these two claims as evidence on the topic of genetic engineering. (3 marks)",
    ["Both claims fail evaluation: testing and research exist and can be checked by date, audience and author intent, and positions among scientists and organizations vary, which the guide's STSE treatment shows through its range of viewpoints."],
    "<b>Model answer:</b> Neither claim stands as evidence. The testing claim can be checked: genetic engineering is an active research field with published studies and reviews, so an absolute claim of no testing collapses once dated, identified sources are consulted. The agreement claim also fails: the strand's STSE material presents a range of positions held by scientists, researchers and organizations, not a single view. The pamphlet is useful evidence that this position exists and how it argues, judged by its date, its intended audience and its author's intent, but its two absolute claims should not be relied on.<br><br><b>Marking points:</b> 1 mark for testing the first claim against checkable sources; 1 mark for noting the range of scientific positions against the second claim; 1 mark for an evaluation move naming date, audience or author intent, or for the limited legitimate use of the pamphlet.", {}); }
]), ["Test absolutes against sources.", "A pamphlet proves a position exists, not its claims."]);

/* Design CR exclusion (shell v1.2.0): flagged entries are never dealt into a
   composed paper (unit tests and other compositions), while practice draws and
   explicit teacher picks keep them. The design-an-investigation item is practice
   and teacher-picked only, on the Science 8 pattern. */
var NO_COMPOSE_U4 = {
  "s9-u4-cr-design-yeast": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U4[e.id]) { e.noCompose = true; } });

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"s9-u1-cr-apparent":3,"s9-u1-cr-classify":3,"s9-u1-cr-components":3,"s9-u1-cr-data":3,"s9-u1-cr-design-mission":4,"s9-u1-cr-distance":3,"s9-u1-cr-evidence":3,"s9-u1-cr-method":3,"s9-u1-cr-process":3,"s9-u1-cr-solar":3,"s9-u1-cr-space-decision":4,"s9-u1-cr-tech-science":3,"s9-u1-cr-thinkers":3,"s9-u1-cr-universe":3,"s9-u2-cr-atom-model":3,"s9-u2-cr-atomic-history":3,"s9-u2-cr-changes":3,"s9-u2-cr-classify-change":3,"s9-u2-cr-commercial-material":3,"s9-u2-cr-conclusion":3,"s9-u2-cr-data-display":3,"s9-u2-cr-design-change":4,"s9-u2-cr-formulas":3,"s9-u2-cr-gold-foil":3,"s9-u2-cr-materials-decision":4,"s9-u2-cr-periodic-evidence":3,"s9-u2-cr-properties":3,"s9-u2-cr-symbols":3,"s9-u2-cr-trends":3,"s9-u3-cr-applications":3,"s9-u3-cr-bulb-removed":3,"s9-u3-cr-conservation-plan":3,"s9-u3-cr-design-circuit":4,"s9-u3-cr-discrepancy":3,"s9-u3-cr-efficiency-compare":3,"s9-u3-cr-efficiency-evaluate":3,"s9-u3-cr-energy-decision":4,"s9-u3-cr-energy-path":3,"s9-u3-cr-flow-language":3,"s9-u3-cr-graph-interpret":3,"s9-u3-cr-hypothesis":3,"s9-u3-cr-meter-use":3,"s9-u3-cr-power-cost":3,"s9-u3-cr-safety-design":3,"s9-u3-cr-series-parallel-data":3,"s9-u3-cr-technology-criteria":3,"s9-u4-cr-canadian":3,"s9-u4-cr-communicate":3,"s9-u4-cr-condition":3,"s9-u4-cr-design-yeast":4,"s9-u4-cr-evaluate":3,"s9-u4-cr-graph-reading":3,"s9-u4-cr-methods":3,"s9-u4-cr-mitosis-stages":3,"s9-u4-cr-mutation":3,"s9-u4-cr-reproduction-choice":4,"s9-u4-cr-shifts":3,"s9-u4-cr-technology":3,"s9-u4-cr-trends":3};
