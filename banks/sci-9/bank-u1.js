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
      ["The stars revolve around the Moon, so their patterns should change nightly", "The Moon rotates in place without revolving, which changes its lit face", "Earth revolves around the Moon once a month, carrying the observer past it"],
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
    ["Planets are pulled around Earth in circles while stars stay fixed to Earth",
     "Planets reflect sunlight unevenly, which makes them look as if they move",
     "Stars move in exactly the same way but are too bright to track"],
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
      ["Any description that can be drawn is equally supported, so both should be kept", "The older description should be kept because it was accepted for longer", "The Sun-centred description wins only because Copernicus published first"],
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
      ["It has no moons, while every planet has at least one moon", "It is made of gas, while every planet is made of rock", "It does not orbit the Sun, while every planet orbits the Sun"],
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
      ["Both are short period comets, because both eventually return", "Halley's is a long period comet because 76 years is a long human lifetime", "Periodicity describes how bright a comet is at its closest approach"],
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
      ["An aurora, produced when moonlight reflects off ice crystals in clouds", "A solar prominence, produced when gas loops off the Sun's surface", "A meteor shower, produced when debris burns up over a wide area"],
      "Auroras are the northern lights (aurora borealis) and southern lights (aurora australis). Charged particles carried by the solar wind are channelled by Earth's magnetic field toward the poles, where they interact with gases high in the atmosphere and make them glow. Stronger solar activity makes auroras stronger and visible farther from the poles.",
      {});
  }
]), ["The lights are high, polar and linked to solar activity.", "Charged particles plus upper atmosphere gases, near the poles."]);

E("s9-u1-comms-effect", 1, ["SC9.1.4"], 3, "var", varset([
  function () {
    return mcq("A period of intense sunspot and flare activity is followed by radio interference, satellite problems and a bright aurora. A student claims the events must be coincidence because the Sun is too far away to affect technology. Which evaluation is correct?",
      "The claim is wrong: solar activity affects Earth systems, disturbing radio communications and satellites and driving auroras, as the guide describes",
      ["The claim is right: the Sun affects Earth only through light and heat", "The claim is wrong only about auroras; communications cannot be affected", "The claim is right, because sunspots are cooler patches and cooler means weaker"],
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
      ["The universe has always existed at its present size and is not changing", "The universe expands to a maximum size and then contracts into a Big Crunch", "Galaxies formed first and then exploded outward from a single galaxy"],
      "The Big Bang Theory rests on evidence for an expanding universe: if galaxies are moving apart now, the universe must have been more compact earlier. Scientists estimate the present matter of the universe was compressed into a hot, dense mass about 13.7 billion years ago and began moving outward, and the expansion continues today.",
      {});
  }
]), ["Anchor on two numbers and one direction: 13.7 billion years, expanding.", "Still expanding now is the Big Bang picture in this course."]);

E("s9-u1-oscillating", 1, ["SC9.1.5"], 2, "var", varset([
  function () {
    return mcq("How does the Oscillating Theory differ from the Big Bang Theory in its account of the universe's future?",
      "The Oscillating Theory has expansion eventually reversing under gravity into contraction (a Big Crunch) followed by another expansion; the Big Bang account has expansion continuing",
      ["The Oscillating Theory says the universe will shrink without ever having expanded", "The Big Bang Theory has the universe contracting now; the Oscillating Theory has it expanding now", "The two theories differ only in the age they give for the universe"],
      "Both theories start from an expanding universe. They part on the future. In the Oscillating Theory, gravitational attraction among stars and galaxies eventually halts the expansion and pulls the universe back into contraction, ending in a Big Crunch that may be followed by another Big Bang, in cycles. The Big Bang account as presented has the expansion continuing.",
      {});
  }
]), ["Both agree on the past. The difference is the future.", "Cycles of expansion and contraction are the oscillating idea."]);

E("s9-u1-expansion-evidence", 1, ["SC9.1.5"], 3, "var", varset([
  function () {
    return mcq("A teacher inflates a balloon dotted with marker spots and asks what the model shows and where it misleads. Which answer is best?",
      "It shows galaxies (the spots) moving apart as the universe expands; it misleads if students think the universe expands into the room around the balloon, since the model only represents the surface",
      ["It shows galaxies growing larger as the universe expands; the spots themselves stretch", "It shows the universe expanding from the balloon's centre point in the room", "It misleads in every respect and should not be used as a model at all"],
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
      ["The solar system formed when a passing star pulled material out of the Sun", "The solar system formed when two stars collided and their debris became planets", "The planets formed first and then captured the Sun as it passed by"],
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
      ["Theories are abandoned whenever a newer one is proposed, regardless of evidence", "The change proves the earlier scientists were careless in their work", "Once a theory is printed in a textbook it can no longer be changed"],
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
      ["Elliptical galaxy: a flat disc with spiral arms; spiral galaxy: a smooth oval without arms", "Spiral galaxy: a single star surrounded by planets; elliptical galaxy: a cloud of gas and dust", "Both types are identical except for the colour of their stars"],
      "Galaxies are massive collections of stars, gas and dust held together by gravity. Spiral galaxies, including our Milky Way, have a central bulge and arms winding out through a flat disc. Elliptical galaxies are smooth, oval systems without arms and typically hold older stars.",
      {});
  }
]), ["The Milky Way is the named example. Which type is it?", "Arms mean spiral; a smooth oval means elliptical."]);

E("s9-u1-quasar", 1, ["SC9.1.7"], 3, "var", varset([
  function () {
    var q = mcq("The table lists objects by relative size and energy output. One entry is galaxy sized in its surroundings yet outshines its whole galaxy from a tiny central region. Which component of the universe fits that entry, and why?",
      "A quasar: an extremely bright, distant object powered by a supermassive black hole at a galaxy's centre",
      ["A low mass star: a small star that outshines its galaxy from its centre", "A nebula: a gas cloud that outshines its galaxy as it collapses", "An intermediate mass star: a Sun like star at a galaxy's centre"],
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
      ["A ends quietly as a white dwarf; B ends in a supernova and may leave a black hole", "Both end in supernovae, because all stars end the same way", "Both become quasars, because quasars are the end stage of every star"],
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
      ["Celestial navigation ended completely and has no connection to any present activity", "Star positions are now used only by astronomers and by no one else", "Modern navigation uses only land based signals, with no reference to space"],
      "The Core STSE on celestial navigation connects a personal and practical activity, finding your way, to a scientific endeavour built on the apparent motion of celestial bodies. Satellite positioning is its direct descendant: the same need, met by space based technology whose positions are known relative to the wider sky. The endeavour did not vanish; it changed instruments.",
      {});
  }
]), ["The activity is finding your way. What carries it today?", "Old method: stars. New method: satellites in space."]);

E("s9-u1-endeavour-link", 1, ["SC9.2.1"], 2, "var", varset([
  function () {
    return mcq("A student checks a weather forecast before a fishing trip, glances at a satellite image of an approaching storm, and later uses a positioning app to return to a favourite fishing mark. Which statement best describes these activities?",
      "Each activity depends on a space based scientific or technological endeavour: weather satellites supply the images and positioning satellites supply the location",
      ["Only the positioning app counts, because forecasts come from local weather offices alone", "None of them counts, because the student never left the ground", "Each activity depends only on the student's own observations of the sky"],
      "Relating personal activities to scientific and technological endeavours means tracing the hidden space contribution. The forecast's storm image comes from weather satellites, and the positioning fix comes from navigation satellites. Ground offices distribute the products, but the data originate in space based systems the student uses without thinking about them.",
      {});
  }
]), ["Trace each product back to where its data comes from.", "Forecast images and position fixes both start with satellites."]);

E("s9-u1-telescope-science", 1, ["SC9.2.2"], 1, "var", varset([
  function () {
    return mcq("Which statement describes the science underlying a reflecting telescope?",
      "Mirrors gather light and bring it to a focus, using the properties of light, so faint and distant objects can be observed",
      ["Lenses bend radio waves to a focus, using sound properties, so silent objects can be heard", "Mirrors gather heat and store it, using chemical reactions, so cold objects warm up", "A motor spins the tube so that gravity focuses the light from distant objects"],
      "Telescopes rest on the science of light. A reflecting telescope uses a curved mirror to gather light from a faint object and bring it to a focus; a refracting telescope does the same job with lenses. Radio telescopes apply the same gathering idea to radio waves, a different part of the electromagnetic radiation family. Each technology is an application of the properties of light and radiation.",
      {});
  }
]), ["Name the science first: this instrument is about light.", "Mirrors and lenses both work on light."]);

E("s9-u1-propulsion-science", 1, ["SC9.2.2"], 3, "var", varset([
  function () {
    return mcq("A rocket rises because hot gases are expelled downward at high speed. Which statement best describes the science underlying rocket propulsion, drawing on the disciplines the guide names?",
      "Chemistry supplies the energetic reaction that produces the gas, and physics (forces) explains the thrust that pushes the rocket opposite to the exhaust",
      ["Biology supplies the fuel organisms, and optics explains the thrust", "Chemistry explains the thrust directly, and no forces are involved", "Physics produces the exhaust gas, and chemistry explains the rocket's direction"],
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
      ["The Hubble Space Telescope, the Apollo lunar module and the Voyager probes", "Canadarm, the Apollo lunar module and Dextre", "The International Space Station alone, built and operated by Canada by itself"],
      "Canada's signature contributions are robotic: Canadarm flew on the space shuttles, Canadarm2 is the Space Station Remote Manipulator System that assembled and services the International Space Station, and Dextre is the station's dexterous manipulator, sometimes called Canadahand. The station itself is an international partnership, not a Canadian solo project.",
      {});
  }
]), ["Canada's space signature is robotics. Look for the arm family.", "Canadarm, Canadarm2, Dextre: one family of contributions."]);

E("s9-u1-astronauts", 1, ["SC9.2.3"], 2, "var", varset([
  function () {
    return mcq("A poster claims Canada's role in space is minor because Canada has never launched its own crewed spacecraft. Which response best corrects the poster using this indicator's examples?",
      "Canada contributes through partnership: Canadian astronauts such as Roberta Bondar, Marc Garneau and Chris Hadfield have flown, and Canadian robotics are essential to the International Space Station",
      ["The poster is correct, because partnership work does not count as involvement", "Canada's role is major because it operates the International Space Station alone", "The poster is wrong because Canada launches crewed spacecraft every year"],
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
      ["Because gravity in space would otherwise pull the astronaut apart", "Because sunlight in space is too dim for an astronaut to work without a lamp system", "Because a suit's only job is protection from micrometeorites, and the rest is padding"],
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
      ["Because astronomers are not permitted to state a theory until a new telescope is built", "Because distant objects change completely every few years and must be remeasured", "Because theories about the universe are guesses that do not rest on data at all"],
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
      ["The conclusion is correct, because AU and light years measure different quantities", "The conclusion fails because the Moon distance should be measured in light years instead", "The conclusion is correct, because the nearest star is only a few AU away"],
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
      ["Only astronaut training matters, since astronauts do all the technical work on a mission", "Careers in space require no specific preparation beyond a general science credit", "Lens making is the only technical route into space work"],
      "Most space workers are not astronauts. Engineers and technicians design, build, test and maintain rockets, rovers, arms and instruments, and each route has its own educational requirements, which is why the guide has students research the background a chosen career requires. Matching the student's interest in mechanical systems to engineering or technician preparation is the sound advice.",
      {});
  }
]), ["Most of the team never flies. Who builds what flies?", "Match the interest (building systems) to the team role that does it."]);

E("s9-u1-benefits-risks", 1, ["SC9.2.8"], 1, "var", varset([
  function () {
    return mcq("Which pairing gives a genuine benefit and a genuine risk of space exploration, as this indicator frames them?",
      "Benefit: satellite monitoring of weather and environment; risk: the hazards of launch and space travel to crews",
      ["Benefit: satellite monitoring of weather; risk: telescopes becoming more powerful", "Benefit: space travel becoming routine; risk: satellite monitoring of weather", "Benefit: lower launch costs; risk: new medical knowledge from space research"],
      "Defending a position on space exploration starts from an honest ledger. Benefits named in the guide include medical, industrial, agricultural and meteorological gains, such as weather and environmental monitoring by satellite. Risks include the real hazards of launch, radiation and travel for crews. A benefit cannot be entered as a risk, or the ledger argues with itself.",
      {});
  }
]), ["Sort each item: good outcome or harm? The pairing needs one of each.", "Weather monitoring helps; launch hazards harm."]);

E("s9-u1-stakeholder", 1, ["SC9.2.8"], 2, "var", varset([
  function () {
    return mcq("A town hall debates funding a Canadian space partnership. One speaker counts only the launch cost; another counts launch cost, the medical and weather spinoffs, the jobs, and the risk to crews. Which speaker is evaluating the issue as this indicator requires?",
      "The second speaker, because a defensible position weighs benefits and negative consequences across scientific and social perspectives, not cost alone",
      ["The first speaker, because cost is the only factor a citizen may consider", "Both equally, because any single factor is enough to defend a position", "Neither, because positions on space exploration cannot be defended with reasons"],
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
      ["There is no error, because the wheel counts metres wherever it rolls", "The wheel undercounts on curves; the fix is to walk faster", "The error is in the scale; the fix is to choose a different planet order"],
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
      ["The rover is the wrong colour for Mars (function), and its name is hard to pronounce (reliability)", "The rover tipped once, so the whole design should be discarded without testing", "The tipping is a materials problem only, so only the frame should change"],
      "Evaluating a design separates three questions. Function: does it do its job, here staying upright on slopes, which the narrow wheelbase fails. Reliability: does it keep working, which loosening joints fail. Materials: are the materials suited, here frame weight and centre of mass. Colour and naming are not evaluation criteria under this indicator.",
      {});
  }
]), ["Sort the judgements into the three named criteria.", "Function, reliability, materials: find one of each."]);

E("s9-u1-design-judge", 1, ["SC9.3.4"], 3, "var", varset([
  function () {
    return mcq("Two probe lander designs are tested. Design A lands successfully in 9 of 10 drops but its sample arm jams in cold tests. Design B lands in 6 of 10 drops and its arm works in all conditions. A mission can tolerate a jammed arm (samples are a bonus) but not a failed landing. Which evaluation and choice is best supported?",
      "Choose A: landing is the mission critical function, A is far more reliable at it, and the arm weakness should be recorded and improved in the next prototype round",
      ["Choose B: a design that fails 4 landings in 10 is acceptable if its arm is perfect", "Choose neither: any weakness in any part disqualifies a design entirely", "Choose A only if its materials are cheaper than B's"],
      "Evaluation weighs criteria by what the task demands. The mission states its priority plainly: landing failure ends everything, an arm jam only loses a bonus. A wins the critical function decisively (9 of 10 against 6 of 10), so A is chosen, with the cold weather arm fault recorded as the target for the next prototype round. Perfection in a secondary system cannot rescue failure in the primary one.",
      {});
  }
]), ["Rank the criteria by the mission's own stated tolerance first.", "Critical function first: 9 of 10 beats 6 of 10 where it matters."]);

E("s9-u1-materials-gen", 1, ["SC9.3.4"], 2, "gen", function () {
  var cases = [
    { d: "a lander leg made of a foam that crushes on landing and cannot be reused for a second test drop", k: "A reliability limit: the material does its job once, so the evaluation should require either a stronger material or spare legs for retesting", w: ["A function success with no limits, because the leg worked once", "A colour problem, because crushed foam looks untidy", "No evaluation is possible until the leg is flown to Mars"] },
    { d: "a rover wheel made of a plastic that turns brittle at the lowest night temperature in the test chamber", k: "A materials failure for the intended conditions: the evaluation should reject this plastic for wheels or require insulation", w: ["A reliability strength, because brittle wheels are lighter", "A function success, because the wheel is round", "No evaluation is possible, because temperature is not a material property"] },
    { d: "a habitat panel made of a material that blocks radiation well but is so heavy that the launch mass limit is exceeded", k: "A materials trade off: protection is strong, but the mass fails a design requirement, so a lighter shielding arrangement must be found", w: ["A clear success, because radiation protection is the only criterion", "A clear failure with no trade off, because heavy materials are always wrong", "An evaluation error, because launch mass is not part of design evaluation"] }
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
      ["Use the main recycling unit, but check it more often", "Hope the main unit does not fail, since it is new", "Recycle water, recycle water carefully, and recycle water daily"],
      "Alternative solutions must be genuinely different routes to the same goal. Stored reserves, a backup unit and resupply are three distinct plans with different costs and risks, ready to be compared and chosen among. Checking the same unit more often, or restating one plan three ways, offers no alternative at all.",
      {});
  }
]), ["Count distinct routes to the goal, not restatements of one route.", "Three different plans beat one plan said three ways."]);

E("s9-u1-plan-steps", 1, ["SC9.3.7"], 2, "var", varset([
  function () {
    return mcq("A team selects stored reserve water as its backup plan. Which set turns that selection into a developed plan?",
      "Decide how many days the reserve must cover, calculate the volume, choose sealed containers, set a rotation schedule so stored water stays fresh, and assign who checks it",
      ["Write 'keep extra water' at the top of the plan and move on", "Buy the largest tank available and fill it once", "Store water in any open containers near the habitat door"],
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
      ["Their process was strong, because they identified the failure afterwards", "Their only problem was the airlock design, not their process", "Groups should never evaluate their process after a task"],
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

