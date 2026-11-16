// CRMARKS: s8-u3-cr-properties=3
// CRMARKS: s8-u3-cr-em=3
// CRMARKS: s8-u3-cr-reflection=3
// CRMARKS: s8-u3-cr-diffuse=3
// CRMARKS: s8-u3-cr-refraction=3
// CRMARKS: s8-u3-cr-speed=3
// CRMARKS: s8-u3-cr-words=3
// CRMARKS: s8-u3-cr-fibre=4
// CRMARKS: s8-u3-cr-research=3
// CRMARKS: s8-u3-cr-mirror-lab=3
// CRMARKS: s8-u3-cr-conclusion=3
// CRMARKS: s8-u3-cr-estimate=3
// CRMARKS: s8-u3-cr-design-refraction=4
// CRMARKS: s8-u3-cr-predict=3
// CRMARKS: s8-u3-cr-identify-medium=3
// Science 8 Unit 3 bank: Optics (SC8.7.1 to SC8.9.14), built
// Nov 15, 2026 to the Optics authoring spec. All entries are
// original and were written new for this app. Existing tests
// and question banks, including the ESD optics set (review set,
// mirror and lens assignments, core labs, the Fibre Optics
// STSE), the MHR ExamView chapters 4 to 6 and the optics
// dynamic bank, were reviewed only to gauge the expected depth
// and range of treatment.
// Guide discipline: curved mirror image characteristics are
// read off given ray diagrams, never memorized; lens ray
// diagram construction is not part of the strand, so lens items
// are qualitative; Snell's law is named in the guide as not
// expected and is never keyed.
// CORE residue: SC8.9.3 entries assess image characteristics,
// the special rays and lab data interpretation; mirror handling
// and hand construction are not assessed. SC8.9.6 carries one
// entry on safe practice; apparatus handling is classroom
// assessment. SC8.9.10 entries assess procedure judgement and
// method; conducting the experiment is not assessed.
// SC8.9.12 (work cooperatively and collaboratively with others)
// is NONE on the SC7.3.5 precedent: registered, no entries, and
// the gap is recorded in the Optics catalogue and spec, not
// smoothed over.

/* ---------- SC8.7.1 Properties of visible light ---------- */

E("s8-u3-properties", 3, ["SC8.7.1"], 1, "gen", function () {
  var cases = [
    { q: "A hand held in front of a projector beam casts a sharp shadow with clear detail, down to the ring on one finger. Which property of light does the sharp shadow demonstrate?", k: "Light travels in a straight line (rectilinear propagation)", w: ["Light disperses into its constituent colours", "Light refracts when it passes into a new medium", "Light travels only through a vacuum"] },
    { q: "A beam from a ray box strikes a prism and fans out into a band of colours on the screen. Which property of light is on display?", k: "Dispersion: white light separates into its constituent colours", w: ["Reflection: light bouncing off a surface", "Rectilinear propagation: light travelling in a straight line", "Refraction into a single colour"] },
    { q: "Sunlight bouncing off a car's dusty windshield scatters in every direction, while sunlight off a clean mirror bounces in one direction. Both cases show which property of light?", k: "Reflection", w: ["Dispersion", "Refraction", "Travel through a vacuum"] },
    { q: "A stir stick standing in a beaker of water looks broken at the water's surface. Which property of light causes the effect?", k: "Refraction: light bends as it passes from one medium to another", w: ["Dispersion: light separates into colours", "Reflection: light bounces off the water", "Rectilinear propagation: light travels straight"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide's six properties of light each have a signature demonstration: straight-line travel makes sharp shadows, reflection bounces light off surfaces (in one direction off a mirror, scattered off dust), refraction bends light between media (the broken-looking stick), and dispersion separates white light into its colours in a prism.",
    {});
}, ["Match the demonstration to the property it shows.", "Shadow means straight lines; colours from a prism mean dispersion; a bent-looking stick means refraction."]);

E("s8-u3-materials", 3, ["SC8.7.1"], 1, "gen", function () {
  var cases = [
    { q: "Which material is correctly classified by how much light it lets through?", k: "A frosted window is translucent: some light passes, but it is scattered so no clear image forms", w: ["A wooden door is translucent: some light passes through it", "A clear window pane is opaque: no light passes through it", "A frosted window is transparent: light passes and images stay sharp"] },
    { q: "A student holds three materials in a projector beam: a glass pane, a pair of sunglasses, and a book. Which ordering by light passed is correct?", k: "Glass pane (most), then sunglasses, then the book (none)", w: ["Book (most), then sunglasses, then the glass pane (none)", "Sunglasses (most), then the glass pane, then the book", "All three pass the same amount of light"] },
    { q: "Which example matches its category?", k: "A lampshade is translucent: it passes some light while scattering it", w: ["A brick wall is transparent", "A mirror is translucent", "Frosted glass is opaque"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Materials sort by how much light they pass. Transparent materials (a window pane) pass light with a clear image; translucent materials (a frosted window, a lampshade, sunglasses) pass some light but scatter it; opaque materials (a door, a book, a wall) pass none.",
    {});
}, ["Three categories: all light clearly, some light scattered, no light.", "Frosted and tinted materials are the translucent giveaway."]);

E("s8-u3-spectrum-order", 3, ["SC8.7.1"], 1, "var", varset([
  function () {
    return mcq("White light dispersed by a prism separates into its constituent colours. Listed by degree of refraction, from least refracted to most refracted, what is the correct order?",
      "Red, orange, yellow, green, blue, indigo, violet",
      ["Violet, indigo, blue, green, yellow, orange, red",
       "Red, yellow, orange, violet, blue, green, indigo",
       "Green, blue, indigo, violet, red, orange, yellow"],
      "The spectrum runs ROY G BIV. Red is refracted the least and violet the most, which is also the wavelength order: red has the longest wavelength of the visible colours and violet the shortest. The acronym in the guide is ordered by exactly this, degree of refraction.",
      {});
  }
]), ["ROY G BIV, and red bends least.", "Least refracted first: start at red."]);

E("s8-u3-dispersion", 3, ["SC8.7.1"], 3, "var", varset([
  function () {
    return mcq("A teacher shines two beams through the same prism: white light from a ray box, and the single-colour light of a red laser. The white light fans into a spectrum, but the laser beam only bends, staying red. Which explanation is correct?",
      "Dispersion separates a mixture of colours; the laser's light is a single wavelength, so there is nothing to separate, though it still refracts",
      ["The prism disperses only light that enters at low angles, and the laser entered too steeply",
       "Laser light cannot refract, so it passes through unchanged in direction",
       "The prism was used up by the white light and could not disperse a second beam"],
      "The two results separate refraction from dispersion. Both beams refract (bend) at the prism's surfaces. Only the white light disperses, because it is a combination of all the visible wavelengths, each refracting by a different amount. The laser is one wavelength only: it bends as one and stays one colour.",
      {});
  }
]), ["Two things happen in a prism: bending, and separating. Which beam can do both?", "One wavelength cannot fan out into many."]);

E("s8-u3-shadow", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return mcq("A student moves a cardboard shape closer to a lamp, keeping the screen fixed, and its shadow grows larger and stays sharp. Which statement explains both observations?",
      "Light travels in straight lines from the lamp; a closer object blocks a wider cone of those straight rays, so the shadow grows, and the straight paths keep its edges sharp",
      ["Light curves around the cardboard, and the curving grows as the object nears the lamp",
       "The lamp's light speeds up near the cardboard, stretching the shadow",
       "The shadow grows because the cardboard absorbs more colours when it is closer"],
      "Shadows are the straight-line property at work. Rays travel straight from the source; the object blocks a cone of them, and the nearer the object sits to the lamp, the wider the cone it blocks, so the shadow is larger. Because the rays do not bend around the edges, the shadow stays sharp.",
      {});
  }
]), ["Shadows exist because light does not bend around things.", "Closer to the source means blocking a wider spread of straight rays."]);

E("s8-u3-vacuum", 3, ["SC8.7.1"], 1, "var", varset([
  function () {
    return mcq("Light from the Sun and stars reaches Earth across the emptiness of space, and the light inside a clear bulb crosses the near-vacuum around its filament. What property of light do both cases demonstrate?",
      "Light can travel through a vacuum: it does not require a medium",
      ["Light requires a medium, and space is filled with invisible matter",
       "Light travels only through transparent solids and liquids",
       "Light slows to a stop when no medium is present"],
      "Unlike sound, light needs nothing to travel through. It crosses the vacuum of space from the Sun and stars, and the evacuated space inside a bulb, which is why the bulb pops when broken and the vacuum is lost. Travelling without a medium is one of the guide's six properties.",
      {});
  }
]), ["Sound needs a medium. Does light?", "Starlight crossing empty space is the proof."]);

E("s8-u3-colour-seen", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return mcq("A green sweater is viewed in white light. Using what the guide says about wavelengths and objects, why does the sweater look green?",
      "The sweater absorbs the other wavelengths of white light and reflects the wavelength our brain interprets as green",
      ["The sweater produces green light of its own in daylight",
       "The sweater absorbs the green wavelength and reflects all the others",
       "White light turns green whenever it strikes any fabric"],
      "Objects do not hand us their colour; they select it. White light carries all the visible wavelengths; the sweater's material absorbs most of them and reflects the green wavelength to our eyes. A red object reflects red, a white object reflects nearly all, and a black object absorbs nearly all.",
      {});
  }
]), ["We see only the wavelengths that bounce back to our eyes.", "Absorbed wavelengths disappear; reflected ones are the colour."]);

E("s8-u3-cr-properties", 3, ["SC8.7.1"], 2, "var", varset([
  function () {
    return textq("A class demonstration shows two effects in one tank of water: (a) a stir stick in the water looks bent at the surface, and (b) a beam shone through the water with a few drops of milk in it fans out into colours. For each effect, name the property of light responsible and explain what the light is doing. (3 marks)",
      ["the bent stick is refraction, light bending between media", "the colour fan is dispersion, white light separating", "each explanation tied to the behaviour of the light"],
      "<b>Model answer:</b> (a) The bent stick is refraction. Light from the stick changes direction as it passes from the water into the air on its way to our eyes, so the brain, which assumes light travelled straight, places the underwater part of the stick in the wrong position: it looks bent or broken at the surface. (b) The colour fan is dispersion. White light is a combination of wavelengths; passing through the water and milk mixture, the wavelengths separate, spreading the beam into its constituent colours, the same separation a prism produces.<br><br><b>Marking points:</b> 1 mark for refraction named and tied to the bending between media for the stick. 1 mark for dispersion named for the colour fan. 1 mark for explaining that white light is a mixture of wavelengths that separate.",
      {});
  }
]), ["One effect is about bending between media; the other is about white light being a mixture.", "Name the property, then say what the light does."]);

/* ---------- SC8.7.2 The electromagnetic spectrum ---------- */

E("s8-u3-em-order", 3, ["SC8.7.2"], 1, "gen", function () {
  var cases = [
    { q: "Which list gives the types of electromagnetic radiation in order of decreasing wavelength?", k: "Radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays", w: ["Gamma rays, X-rays, ultraviolet, visible light, infrared, microwaves, radio waves", "Radio waves, infrared, microwaves, visible light, X-rays, ultraviolet, gamma rays", "Microwaves, radio waves, visible light, infrared, ultraviolet, gamma rays, X-rays"] },
    { q: "On the electromagnetic spectrum strip shown, which type sits between infrared and ultraviolet?", k: "Visible light", w: ["Microwaves", "Radio waves", "X-rays"] },
    { q: "Which type of electromagnetic radiation has the longest wavelength of all?", k: "Radio waves", w: ["Gamma rays", "Microwaves", "Ultraviolet"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "The spectrum in decreasing wavelength runs: radio waves, microwaves, infrared, visible light, ultraviolet, X-rays, gamma rays. Visible light, the only part our eyes detect, sits in the middle, between infrared and ultraviolet.",
    {});
  if (c.q.indexOf("strip shown") >= 0) q.figure = s8EMSpectrumSVG();
  return q;
}, ["The order is fixed: radio longest, gamma shortest, visible in the middle.", "Decreasing wavelength means starting at radio waves."]);

E("s8-u3-em-uses", 3, ["SC8.7.2"], 1, "gen", function () {
  var cases = [
    { q: "Which pairing of radiation type and use matches the guide's examples?", k: "Infrared: motion sensors; ultraviolet: sun tanning; gamma rays: radiation therapy for cancer", w: ["Microwaves: medical X-ray imaging; radio waves: cooking food; X-rays: telecommunications", "Ultraviolet: cooking food; infrared: cancer therapy; gamma rays: remote controls", "X-rays: sun tanning; microwaves: motion sensors; radio waves: medical detection"] },
    { q: "A hospital uses one type of electromagnetic radiation to see broken bones and another to treat cancer. Which pairing is correct?", k: "X-rays for medical detection of the bones; gamma rays for radiation therapy", w: ["Microwaves for the bones; radio waves for the therapy", "Infrared for the bones; ultraviolet for the therapy", "Gamma rays for the bones; X-rays for the therapy"] },
    { q: "Which use belongs to microwaves in the guide's list?", k: "Cooking food", w: ["Medical detection of broken bones", "Radiation therapy for cancer", "Sun tanning"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The guide's use list: radio waves for telecommunications, microwaves for cooking food, infrared for motion sensors, visible light for the microscope, ultraviolet for sun tanning, X-rays for medical detection, and gamma rays for radiation therapy for cancer.",
    {});
}, ["Work through the guide's list type by type.", "Cooking is microwaves; bones are X-rays; therapy is gamma."]);

E("s8-u3-em-compare", 3, ["SC8.7.2"], 3, "var", varset([
  function () {
    var q = mcq("Compared with visible light, radio waves have which combination of wavelength, frequency and energy?",
      "Longer wavelength, lower frequency, and lower energy",
      ["Shorter wavelength, higher frequency, and higher energy",
       "Longer wavelength, higher frequency, and the same energy",
       "The same wavelength, but lower frequency and lower energy"],
      "Radio waves sit at the far end of the spectrum from gamma rays. Moving from visible light toward radio waves, wavelength increases while frequency and energy both decrease: the three quantities move together in a fixed pattern, longer wavelength always meaning lower frequency and lower energy.",
      {});
    q.figure = s8EMSpectrumSVG();
    return q;
  }
]), ["Find radio and visible on the strip, then apply the pattern: longer wavelength, lower frequency, lower energy.", "The three quantities never move independently."]);

E("s8-u3-em-devices", 3, ["SC8.7.2"], 1, "var", varset([
  function () {
    return mcq("A class lists devices in the room that send or receive information without using visible light. Which device belongs on the list?",
      "A television remote control, which signals with infrared radiation",
      ["A desk lamp, which signals with visible light",
       "A printed poster, which is read by reflected visible light",
       "A window, which passes visible light"],
      "The guide's point is that electromagnetic radiation surrounds us in forms we cannot see. Radios, cell phones, television signals, wireless internet and remote controls all work on radiation outside the visible band; the remote uses infrared. The lamp, poster and window are visible light at work.",
      {});
  }
]), ["The list is for radiation our eyes cannot detect.", "Remote controls whisper in infrared."]);

E("s8-u3-em-energy", 3, ["SC8.7.2"], 1, "var", varset([
  function () {
    return mcq("Which type of electromagnetic radiation carries the most energy, and which carries the least?",
      "Gamma rays carry the most energy; radio waves carry the least",
      ["Radio waves carry the most energy; gamma rays carry the least",
       "Visible light carries the most; microwaves carry the least",
       "All types carry the same energy; only their uses differ"],
      "Energy follows the spectrum's order: it rises steadily from radio waves through microwaves, infrared, visible light and ultraviolet to X-rays, and peaks at gamma rays. That is also why the high-energy end is the dangerous end.",
      {});
  }
]), ["Energy rises along the spectrum toward gamma rays.", "Most energy and most danger live at the same end."]);

E("s8-u3-em-detection", 3, ["SC8.7.2"], 2, "var", varset([
  function () {
    return mcq("Electromagnetic radiation of many types is passing through the classroom right now, yet students notice only the light from the windows and lamps. Why does so much radiation go undetected by their senses?",
      "Our eyes detect only the visible band; the other types have wavelengths too long (like infrared) or too short (like ultraviolet) for our eyes to register",
      ["The other types of radiation exist only inside machines and never travel through rooms",
       "The other types are blocked completely by the classroom walls",
       "Our eyes detect all radiation, but the brain ignores most of it on purpose"],
      "Detection is a wavelength question. The radiation is continuously present, from radio signals to ultraviolet, but the human eye registers only the narrow visible band. Wavelengths longer than visible (infrared) or shorter (ultraviolet) pass unnoticed without instruments.",
      {});
  }
]), ["The radiation is there. What limits our detection of it?", "Our eyes are tuned to one narrow band only."]);

E("s8-u3-cr-em", 3, ["SC8.7.2"], 3, "var", varset([
  function () {
    return textq("Choose two types of electromagnetic radiation from different ends of the spectrum (for example, radio waves and gamma rays). Compare them on wavelength, frequency and energy, and give the guide's example use for each. (3 marks)",
      ["a correct comparison of wavelength, frequency and energy", "the two types at clearly different spectrum positions", "a correct use for each type"],
      "<b>Model answer:</b> Radio waves and gamma rays sit at opposite ends of the spectrum. Radio waves have the longest wavelengths, the lowest frequencies and the lowest energies of all the types; they are used for telecommunications. Gamma rays have the shortest wavelengths, the highest frequencies and the highest energies; they are used in radiation therapy for cancer. The comparison shows the spectrum's pattern: as wavelength decreases across the spectrum, frequency and energy both increase. (Any two types at different positions, compared correctly with their guide uses, earn the marks.)<br><br><b>Marking points:</b> 1 mark for the wavelength comparison. 1 mark for frequency and energy compared consistently with it. 1 mark for a correct guide use for each type.",
      {});
  }
]), ["Pick two types far apart so the comparison has room to show.", "Wavelength, frequency and energy move in a fixed pattern: state it once, apply it to both."]);

/* ---------- SC8.7.3 Laws of reflection ---------- */

E("s8-u3-law", 3, ["SC8.7.3"], 1, "var", varset([
  function () {
    return mcq("What does the law of reflection state?",
      "The angle of incidence equals the angle of reflection, both measured from the normal",
      ["The angle of incidence equals the angle of reflection, both measured from the mirror's surface",
       "The angle of reflection is always twice the angle of incidence",
       "Light reflects off a surface at the same angle it arrives, measured from the surface"],
      "The law of reflection: the angle of incidence is equal to the angle of reflection. Both angles are measured from the normal, the line perpendicular to the surface at the point where the ray strikes, not from the surface itself. Core Lab 5-2B exists to let students arrive at this law from their own measurements.",
      {});
  }
]), ["The law is an equality between two angles, both measured from the same reference line.", "From the normal, not from the surface."]);

E("s8-u3-angle-calc", 3, ["SC8.7.3"], 2, "gen", function () {
  var ang = pick([25, 30, 35, 40, 45, 50, 55, 60]);
  var mode = pick(["reflect", "surface", "between"]);
  function dis3(keyVal, cand) {
    var out = [];
    for (var i = 0; i < cand.length && out.length < 3; i++) {
      if (cand[i] !== keyVal && cand[i] > 0 && cand[i] < 180 && out.indexOf(cand[i]) < 0) out.push(cand[i]);
    }
    return out.map(function (d) { return d + " degrees"; });
  }
  var q, key, dis, sol;
  if (mode === "reflect") {
    key = ang + " degrees";
    dis = dis3(ang, [90 - ang, ang + 15, ang - 15, ang + 5, 2 * ang, 90 - ang + 5]);
    sol = "By the law of reflection, the angle of reflection equals the angle of incidence: " + ang + " degrees, both measured from the normal.";
    q = mcq("The diagram shows a ray striking a plane mirror with an angle of incidence of " + ang + " degrees. What is the angle of reflection?", key, dis, sol, {});
  } else if (mode === "surface") {
    key = (90 - ang) + " degrees";
    dis = dis3(90 - ang, [ang, 90 - ang + 10, 90 - ang - 10, 90 - ang + 15, ang + 5]);
    sol = "The diagram's " + ang + " degrees is measured from the mirror's surface. Angles of incidence are measured from the normal, and the normal is 90 degrees to the surface, so the angle of incidence is 90 - " + ang + " = " + (90 - ang) + " degrees.";
    q = mcq("A ray strikes a plane mirror so that the ray makes an angle of " + ang + " degrees with the mirror's surface, as shown. What is the angle of incidence?", key, dis, sol, {});
  } else {
    key = (180 - 2 * ang) + " degrees";
    dis = dis3(180 - 2 * ang, [2 * ang, 90 - ang, 180 - ang, 180 - 2 * ang + 10, 180 - 2 * ang - 10]);
    sol = "The angle of reflection equals the angle of incidence, " + ang + " degrees. On the straight line along the normal's side, the angle between the incoming and outgoing rays is 180 - " + ang + " - " + ang + " = " + (180 - 2 * ang) + " degrees.";
    q = mcq("A ray reflects off a plane mirror with an angle of incidence of " + ang + " degrees, as shown. What is the angle between the incident ray and the reflected ray?", key, dis, sol, {});
  }
  q.figure = s8ReflectSVG(ang, false);
  return q;
}, ["Both angles are measured from the normal. Read the diagram's angle carefully: is it from the normal or from the surface?", "The law gives the reflection angle directly; surface angles need a 90 degree conversion first."]);

E("s8-u3-specular-diffuse", 3, ["SC8.7.3"], 1, "gen", function () {
  var cases = [
    { q: "A photograph printed with a glossy finish shows glare spots under a lamp, while the same photograph in a matte finish does not. Which explanation uses the two kinds of reflection correctly?", k: "The glossy surface reflects specularly, sending rays in one direction to form glare; the matte surface reflects diffusely, scattering rays so no glare forms", w: ["The glossy surface reflects diffusely, and the matte surface reflects specularly", "Both surfaces reflect specularly; the matte print is simply darker", "The matte surface absorbs all light, so nothing reflects from it"] },
    { q: "Which application is correctly matched to its kind of reflection?", k: "Car wax produces a specular finish: a smooth surface reflecting in one direction for shine", w: ["Matte paint is chosen for its specular reflection and high luster", "Glazed ceramics are examples of diffuse reflection", "A dusty windshield produces specular reflection like a mirror"] },
    { q: "Why does a calm lake mirror the mountains while a wind-rippled lake shows only a glittering blur?", k: "The calm surface reflects specularly, in one direction, forming an image; the rippled surface reflects diffusely, scattering rays in many directions", w: ["The rippled lake absorbs the light that would form the image", "The calm lake refracts the light into an image", "Wind changes the water's surface into a convex mirror"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Specular reflection happens off smooth surfaces: parallel rays reflect in one direction and an image or glare can form. Diffuse reflection happens off rough surfaces: rays scatter in many directions and no image forms. Matte versus glossy paint, waxed cars, glazed ceramics and dusty windshields are the guide's everyday cases.",
    {});
}, ["Smooth and one direction means specular; rough and scattered means diffuse.", "An image or glare can only come from the specular kind."]);

E("s8-u3-mirror-types", 3, ["SC8.7.3"], 1, "gen", function () {
  var cases = [
    { q: "Which set of examples matches the guide's three mirror types?", k: "Plane: a bathroom mirror. Concave: the inside of a metal spoon. Convex: the safety mirror on the front of a school bus", w: ["Plane: the inside of a spoon. Concave: a bathroom mirror. Convex: a shop's security mirror", "Plane: a school bus safety mirror. Concave: a bathroom mirror. Convex: the inside of a spoon", "Plane: a bathroom mirror. Concave: a bus safety mirror. Convex: the inside of a spoon"] },
    { q: "The outside of a polished metal spoon bulges toward the object it reflects. Which type of mirror does it act as?", k: "A convex mirror", w: ["A concave mirror", "A plane mirror", "A diffuse mirror"] },
    { q: "A store mounts a large rounded mirror high in a corner so staff can see down every aisle. Which mirror type is it, and why is it chosen?", k: "Convex: its bulging surface gives a wide field of view", w: ["Concave: its hollow surface magnifies shoppers", "Plane: its flat surface shows the aisles at true size", "Convex: it inverts the image so thieves are easier to spot"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The three mirror types: plane (flat, like a bathroom mirror), concave (curved inward, like the inside of a spoon) and convex (curved outward, like a school bus safety mirror or a store security mirror). Convex mirrors are chosen where a wide field of view matters.",
    {});
}, ["Flat, hollowed in, bulging out: plane, concave, convex.", "The spoon gives both curved types: inside concave, outside convex."]);

E("s8-u3-plane-spot", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows an object arrow in front of a plane mirror and its image. Which set of image properties (SPOT) is correct for a plane mirror?",
      "Same size as the object, same distance behind the mirror as the object is in front, upright, and virtual",
      ["Larger than the object, farther behind the mirror, upright, and real",
       "Same size as the object, same distance behind the mirror, inverted, and real",
       "Smaller than the object, closer to the mirror, upright, and virtual"],
      "Plane mirror images are the strand's reference case: Size the same, Position as far behind the mirror as the object is in front, Orientation upright, Type virtual (the rays only appear to meet behind the mirror, which is why the image arrow is dashed). Lateral inversion, the left-right reversal, is the one extra feature.",
      {});
    q.figure = s8PlaneMirrorSVG();
    return q;
  }
]), ["SPOT: Size, Position, Orientation, Type. Plane mirrors are the 'everything equal' case.", "Same, same, upright, virtual."]);

E("s8-u3-lateral", 3, ["SC8.7.3"], 3, "var", varset([
  function () {
    return mcq("The word AMBULANCE is printed in reverse on the front of the vehicle so that drivers ahead can read it in their rear-view mirrors. Which property of plane mirror images makes this work, and what exactly does the mirror do to the lettering?",
      "Lateral inversion: the mirror reverses the image left-to-right, so the reversed printing reads correctly in the mirror",
      ["Magnification: the mirror enlarges the lettering until it becomes readable",
       "The mirror rotates the lettering 180 degrees, turning it right side up",
       "The mirror reverses the lettering top-to-bottom, which the brain corrects"],
      "A plane mirror image is laterally inverted: left and right are swapped, while top and bottom are not. Printing the word backwards on the vehicle means the mirror's left-right swap turns it into ordinary readable text for the driver ahead. It is the same effect that makes text held to a bathroom mirror unreadable.",
      {});
  }
]), ["The mirror swaps one pair of directions. Which pair?", "Left-right, not top-bottom: that is lateral inversion."]);

E("s8-u3-cr-reflection", 3, ["SC8.7.3"], 2, "var", varset([
  function () {
    return textq("A periscope uses two plane mirrors to let a sailor in a submarine see above the water's surface. Explain how the periscope works, using the law of reflection and the properties of plane mirror images. (3 marks)",
      ["light from the scene strikes the top mirror and reflects down the tube", "the law of reflection governs each bounce, with equal angles at each mirror", "the second mirror reflects the light into the eye, and two reflections restore the image's orientation"],
      "<b>Model answer:</b> Light from the scene above the surface travels horizontally into the top of the periscope and strikes the first plane mirror, set at 45 degrees. By the law of reflection, the angle of incidence equals the angle of reflection at that mirror, so the light is turned exactly 90 degrees and travels straight down the tube. At the bottom it strikes the second plane mirror, also at 45 degrees, and the law applies again: the light turns another 90 degrees and travels horizontally into the sailor's eye. Because the light has reflected twice, the left-right reversal of a single mirror image is cancelled, and the sailor sees the scene upright and correctly oriented, as a plane mirror image the same size as the scene itself.<br><br><b>Marking points:</b> 1 mark for the law of reflection applied at the first mirror to turn the light down the tube. 1 mark for the law applied again at the second mirror into the eye. 1 mark for the image outcome (two reflections cancel the lateral inversion; the view is upright and true to size).",
      {});
  }
]), ["Two mirrors, two applications of the same law, and one orientation puzzle to explain.", "Each 45 degree mirror turns the light exactly 90 degrees."]);

E("s8-u3-cr-diffuse", 3, ["SC8.7.3"], 3, "var", varset([
  function () {
    return textq("A student objects: 'If the law of reflection is true, a sheet of paper should act like a mirror, since light reflects off it too. But I can't see my face in paper.' Answer the objection: explain why paper gives no image even though every ray striking it obeys the law of reflection. (3 marks)",
      ["the law holds for each individual ray at its own point on the surface", "paper's surface is rough, so the normals point in many directions and rays scatter", "a mirror's smooth surface keeps the reflected rays ordered, so an image forms"],
      "<b>Model answer:</b> The law of reflection is never broken; it applies ray by ray. On a mirror, the surface is smooth, so the normal points the same way at every point, and rays from one point of your face reflect in an orderly pattern that preserves the image. Paper's surface is rough at the microscopic level: its tiny facets face in many directions, so the normal at each point points a different way. Each ray still reflects with its angle of reflection equal to its angle of incidence at its own facet, but the reflected rays scatter in all directions (diffuse reflection), and the order that makes an image is destroyed. That is why paper shows light, but no face.<br><br><b>Marking points:</b> 1 mark for the law applying to each ray at its own point of contact. 1 mark for the rough surface giving many normal directions and scattered reflected rays. 1 mark for the contrast with a smooth surface preserving the rays' order so an image forms.",
      {});
  }
]), ["The law is about each ray and its own normal. What differs between paper and mirror is the surface, not the law.", "Many normals, scattered rays, no image: that is diffuse reflection."]);

/* ---------- SC8.7.4 Refraction, qualitatively ---------- */

E("s8-u3-refraction-def", 3, ["SC8.7.4"], 1, "var", varset([
  function () {
    return mcq("Which set of refraction terms is defined correctly?",
      "The incident ray is the incoming ray, the refracted ray is the ray after it bends at the boundary, and the angles of incidence and refraction are measured from the normal",
      ["The incident ray is the ray after bending, and the angle of refraction is measured from the surface",
       "The refracted ray is the ray that bounces back, and the normal is the surface itself",
       "The angle of incidence is measured from the surface, and the refracted ray never changes direction"],
      "Refraction is the bending of light as it crosses a boundary between media. The incident ray arrives, the refracted ray leaves into the new medium, and both angles, of incidence and of refraction, are measured from the normal at the boundary point, exactly as in reflection.",
      {});
  }
]), ["Same angle convention as reflection: everything from the normal.", "Incident in, refracted through, normal as the reference."]);

E("s8-u3-bent-stick", 3, ["SC8.7.4"], 2, "var", varset([
  function () {
    return mcq("A popsicle stick standing in a beaker of water looks bent at the surface, though it is straight. Which explanation is correct?",
      "Light from the underwater part of the stick bends (refracts) as it leaves the water for the air, and our brain, assuming the light travelled straight, misplaces that part of the stick",
      ["The water physically bends the stick, which straightens again when removed",
       "The stick reflects the light at the surface, doubling its image",
       "The water disperses the light, and the colours shift the stick's apparent shape"],
      "The bent stick is the guide's introduction to refraction. Light from the submerged part changes direction at the water-air boundary; the brain traces the rays back in straight lines, so the underwater part appears shifted from where it is, and the stick looks broken at the surface.",
      {});
  }
]), ["The stick is fine. What happens to its light at the surface?", "Refraction at the boundary plus a brain that assumes straight travel."]);

E("s8-u3-speed-density", 3, ["SC8.7.4"], 3, "var", varset([
  function () {
    return mcq("A ray of light passes at an angle from air into glass, and separately from glass back into air. Using the guide's speed and density account, which statement is correct?",
      "Light slows down entering the denser glass and bends; entering the less dense air it speeds up and bends the other way",
      ["Light speeds up entering the denser glass, which is why it bends",
       "Light keeps the same speed in both media; only its colour changes",
       "Light bends only when it speeds up, never when it slows down"],
      "Refraction is caused by a speed change at the boundary. Light travels more slowly in a medium of greater density (glass) than in air, and the speed change at an angle is what swings the ray's direction. Returning to the less dense air, it speeds up and bends back. The guide's car-on-a-sandy-shoulder analogy models exactly this: slow one side first, and the direction veers.",
      {});
  }
]), ["Bending is a speed change in disguise. Denser medium, slower light.", "Slow down entering glass; speed up leaving it."]);

E("s8-u3-lenses", 3, ["SC8.7.4"], 1, "gen", function () {
  var cases = [
    { q: "Which description of a convex lens is correct?", k: "It is thicker across the middle than at the edges, and it causes parallel light rays to converge (come together)", w: ["It is thinner across the middle than at the edges, and it causes rays to diverge", "It is thicker across the middle, and it causes rays to diverge (spread apart)", "It has one flat side, and it reflects rays instead of refracting them"] },
    { q: "A lens spreads a parallel beam of light so the rays diverge, as if coming from a point behind the lens. Which lens is it, and what is its shape?", k: "A concave lens: thinner across the middle and thicker at the edges", w: ["A convex lens: thicker across the middle and thinner at the edges", "A concave lens: thicker across the middle and thinner at the edges", "A convex lens: thinner across the middle and thicker at the edges"] },
    { q: "Which statement about lenses and light is correct?", k: "Lenses work by refraction: light bends at each surface of the lens, which is what brings rays together or spreads them apart", w: ["Lenses work by reflection: light bounces off the lens surfaces", "Lenses work by dispersion: they separate light into colours that form the image", "Lenses work by absorbing the rays that would blur the image"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "A lens is a curved piece of transparent material that refracts light. A convex lens is thicker in the middle and converges rays; a concave lens is thinner in the middle and diverges rays. The diagram shows the convex case: parallel rays brought together through the focal point.",
    {});
  if (c.q.indexOf("convex lens is correct") >= 0) q.figure = s8LensSVG("convex");
  return q;
}, ["Thick middle converges; thin middle diverges.", "Lenses bend light (refraction), they do not bounce it."]);

E("s8-u3-vision", 3, ["SC8.7.4"], 2, "gen", function () {
  var cases = [
    { q: "A student is near-sighted: her eye's lens refracts light too much, so images of distant objects form in front of her retina. Which lens corrects her vision, and how?", k: "A concave lens, which diverges the light slightly before it enters the eye, so the eye's lens brings it to a focus on the retina", w: ["A convex lens, which converges the light more so it focuses sooner", "A concave lens, which converges the light so it focuses on the retina", "A convex lens, which diverges the light before it enters the eye"] },
    { q: "A student is far-sighted: his eye's lens does not refract light enough, so images would form behind his retina. Which lens corrects his vision?", k: "A convex lens, which begins converging the light before it enters the eye, making up for the eye lens's shortfall", w: ["A concave lens, which diverges the light so the eye can catch up", "A convex lens, which diverges the light slightly before the eye", "A concave lens, which adds the missing convergence"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Vision correction adds the lens the eye is missing. Near-sightedness is too much refraction (image in front of the retina), corrected by a concave, diverging lens. Far-sightedness is too little (image would fall behind the retina), corrected by a convex, converging lens. The guide's memory check: concave lenses make eyes look smaller behind the glasses, convex make them look larger.",
    {});
}, ["Too much bending needs a spreader; too little needs a converger.", "Near-sighted: concave. Far-sighted: convex."]);

E("s8-u3-lens-examples", 3, ["SC8.7.4"], 1, "var", varset([
  function () {
    var q = mcq("Which example is correctly matched to its lens type?",
      "A magnifying glass is a convex lens, used to converge light and produce an enlarged view",
      ["A magnifying glass is a concave lens, used to diverge light",
       "Eyeglasses for near-sightedness use convex lenses",
       "A camera's viewfinder peephole uses a convex lens to shrink the view"],
      "The guide's examples: magnifying glasses are convex lenses, and eyeglasses come in both kinds, concave for near-sightedness and convex for far-sightedness. The diagram shows the concave case, its rays diverging as if from the focal point on the near side.",
      {});
    q.figure = s8LensSVG("concave");
    return q;
  }
]), ["The magnifying glass is the convex exemplar.", "Glasses can be either kind; the magnifier is always convex."]);

E("s8-u3-cr-refraction", 3, ["SC8.7.4"], 3, "var", varset([
  function () {
    return textq("A fish under the water appears to be higher (closer to the surface) than it really is, which is why a heron must aim below the fish it sees. Explain the fish's apparent position using refraction, and state the direction the light bends at the surface. (3 marks)",
      ["light from the fish refracts as it leaves the water for the air", "leaving the denser medium it bends away from the normal", "the brain traces the rays straight back, placing the fish shallower than it is"],
      "<b>Model answer:</b> Light reflected from the fish travels up through the water and crosses into the air. Water is the denser medium, so as the light leaves it for the less dense air it speeds up and bends away from the normal at the surface. The heron's brain (like ours) assumes light has travelled in a straight line, so it traces the bent rays back along straight paths, and those paths meet at a point above the fish's true position. The fish therefore appears shallower than it is, and a strike aimed at the seen fish passes above the real one.<br><br><b>Marking points:</b> 1 mark for refraction at the water-air boundary. 1 mark for the bending direction (away from the normal when leaving the denser medium). 1 mark for the straight-line assumption placing the apparent fish above the real fish.",
      {});
  }
]), ["Trace one ray from the fish to the eye, and mark where it bends and which way.", "Away from the normal leaving water; the brain's straight lines do the rest."]);

/* ---------- SC8.8.1 Ideas and theories of light in the past ---------- */

E("s8-u3-history", 3, ["SC8.8.1"], 1, "gen", function () {
  var cases = [
    { q: "Which historical idea about light is correctly matched to its thinker?", k: "Pythagoras believed light consisted of beams of particles travelling from the eye... ", w: ["Galileo measured the speed of light exactly using two telescopes", "Michelson believed light was made of waves on water", "Pythagoras believed light travelled as waves through air"] },
    { q: "What was Galileo's contribution to the study of light's speed?", k: "He attempted an experiment to determine whether light's speed could be measured, using lanterns over a distance", w: ["He calculated the speed of light exactly as 3 x 10^8 m/s", "He proved light travels instantaneously and has no speed", "He invented the telescope to measure light's speed"] },
    { q: "What should students know about Michelson's experiment?", k: "It was conducted to calculate the speed of light, and it succeeded in measuring it; the details are not required", w: ["It proved light has no measurable speed", "It showed light travels at the speed of sound", "It was an attempt that failed completely and measured nothing"] }
  ];
  var c = pick(cases);
  if (c.k.indexOf("travelling from the eye") >= 0) c.k = "Pythagoras believed light consisted of beams of particles";
  return mcq(c.q, c.k, c.w,
    "The guide's three historical anchors: Pythagoras held that light consisted of beams of particles; Galileo tried to determine light's speed with an experiment (his method could not resolve so fast a speed); and Michelson's experiment was conducted for the purpose of calculating the speed of light, which it did. Students need the purpose and the outcome, not the apparatus details.",
    {});
}, ["Particles belong to Pythagoras; the speed attempts belong to Galileo and Michelson.", "Michelson measured it; Galileo tried."]);

E("s8-u3-speed-light", 3, ["SC8.8.1"], 1, "var", varset([
  function () {
    return mcq("Which statement about the speeds of light and sound is correct?",
      "Light travels at 300,000,000 m/s (3 x 10^8 m/s), enormously faster than sound at about 330 m/s, which is why we see lightning before we hear its thunder",
      ["Light and sound travel at the same speed, about 330 m/s",
       "Sound travels faster than light, which is why thunder arrives first",
       "Light travels at 300,000 m/s, only slightly faster than sound"],
      "The speed of light is 3 x 10^8 m/s, about 300,000 km/s. Sound manages roughly 330 m/s. In a storm the flash's light reaches us almost instantly while the thunder dawdles behind: the guide's rule of thumb is that every 3 seconds of delay means the strike was about 1 km away.",
      {});
  }
]), ["Light's speed has an exact value to know: 3 x 10^8 m/s.", "Three seconds of thunder delay is about one kilometre."]);

E("s8-u3-cr-speed", 3, ["SC8.8.1"], 2, "var", varset([
  function () {
    return textq("A student watches a distant star and reads that its light left it 40 years ago. She asks: 'If the star exploded last year, why do I still see it shining?' Answer her using the speed of light, and connect your answer to why astronomers say telescopes look into the past. (3 marks)",
      ["light travels at a finite speed, 3 x 10^8 m/s, so distant light is old when it arrives", "the light from last year's explosion has not reached Earth yet", "we always see distant objects as they were when their light left them"],
      "<b>Model answer:</b> Light is fast but not instantaneous: it travels at 3 x 10^8 m/s, and the star is so far away that its light takes 40 years to cross the distance. The light arriving tonight left the star 40 years ago, so the student is seeing the star as it was then, still shining. The explosion happened only a year ago by our calendar, and its light has 39 more years of travel before it reaches Earth; until then, the old light keeps arriving and the star appears unchanged. That is the sense in which telescopes look into the past: every distant object is seen as it was when its light set out.<br><br><b>Marking points:</b> 1 mark for light's finite speed applied to the distance. 1 mark for the arriving light being 40 years old, so the star is seen as it was. 1 mark for the explosion's light not yet having arrived, generalizing to seeing the past.",
      {});
  }
]), ["Light's speed is huge but finite. Forty years of travel means forty-year-old news.", "We never see distant things 'now'; we see their light's departure time."]);

/* ---------- SC8.8.2 Early technologies from light knowledge ---------- */

E("s8-u3-early-tech", 3, ["SC8.8.2"], 1, "var", varset([
  function () {
    return mcq("How did scientific knowledge of light lead to the early microscope and telescope?",
      "Understanding how lenses refract light let makers combine lenses so distant and tiny objects could be magnified and studied",
      ["Understanding reflection let makers polish mirrors until objects looked bigger",
       "The devices came first, and no knowledge of light was involved in making them",
       "Understanding dispersion let makers separate light into colours for viewing"],
      "The microscope and telescope are the guide's examples of knowledge becoming technology: once lens makers understood that shaped glass refracts light in predictable ways, they could arrange lenses to magnify what the eye cannot resolve, near and far. The strand returns to their development again under trial and error.",
      {});
  }
]), ["Lenses plus refraction knowledge equals magnification.", "The science came first; the instruments were built on it."]);

E("s8-u3-telescope-types", 3, ["SC8.8.2"], 2, "var", varset([
  function () {
    return mcq("A reflecting telescope and a refracting telescope collect light from distant objects in different ways. Which description is correct?",
      "A reflecting telescope uses a large concave mirror to collect and focus the light; a refracting telescope uses lenses",
      ["A reflecting telescope uses lenses; a refracting telescope uses a concave mirror",
       "Both use concave mirrors; they differ only in size",
       "A reflecting telescope uses a convex mirror, which is why its images are smaller"],
      "The names say it: reflecting telescopes reflect, using a concave primary mirror (the Keck telescope's mirror is 10 m across) to gather light; refracting telescopes refract, using lenses. Binoculars are two small refracting telescopes mounted side by side.",
      {});
  }
]), ["Reflecting means mirrors, refracting means lenses.", "The big dish-shaped collector is a concave mirror."]);

/* ---------- SC8.8.3 Using frequency and wavelength correctly ---------- */

E("s8-u3-freq-wave", 3, ["SC8.8.3"], 1, "var", varset([
  function () {
    return mcq("Which definitions of frequency and wavelength are correct?",
      "Wavelength is the distance between two neighbouring crests (or troughs); frequency is the number of waves passing a point in a given time, such as one second",
      ["Wavelength is the number of waves per second; frequency is the distance between crests",
       "Wavelength is the height of a crest; frequency is the speed of the wave",
       "Frequency and wavelength are two names for the same measurement"],
      "The guide insists on the words because they are easy to swap. Wavelength measures a length: crest to crest. Frequency measures a rate: how many waves pass a point per second. The stadium wave analogy helps: the spacing of the standing sections is like wavelength; how often they rise per minute is like frequency.",
      {});
  }
]), ["One is a distance, the other is a rate. Which is which?", "Wavelength: crest to crest. Frequency: waves per second."]);

E("s8-u3-freq-relation", 3, ["SC8.8.3"], 2, "var", varset([
  function () {
    return mcq("A radio station broadcasts at 94.7 MHz and another at 95.9 MHz. A student says the second station's waves must have the longer wavelength 'because its number is bigger.' Correct the student using the frequency and wavelength relationship.",
      "The student has it backwards: higher frequency means shorter wavelength, so the 95.9 MHz waves are the shorter ones",
      ["The student is right: frequency and wavelength grow together",
       "Neither station has a wavelength, because radio waves are not light",
       "The wavelengths are identical, because all radio waves share one wavelength"],
      "Frequency and wavelength are inversely related for waves travelling at the same speed: high frequency waves have short wavelengths, and low frequency waves have long wavelengths. Radio stations are identified by frequency (the guide's example is OZ FM at 94.7 MHz on the Avalon Peninsula), so the bigger frequency number means the shorter wavelength.",
      {});
  }
]), ["The relationship is inverse: one up, the other down.", "Bigger frequency number, shorter waves."]);

E("s8-u3-cr-words", 3, ["SC8.8.3"], 2, "var", varset([
  function () {
    return textq("A classmate writes: 'Red light has a high frequency because its wavelength is the longest of the visible colours, and violet has a low frequency because it bends the most in a prism.' The classmate has tangled the terms. Untangle the statement: correct each error and give the true relationships for red and violet light. (3 marks)",
      ["red has the longest wavelength and therefore the lowest frequency", "violet has the shortest wavelength and the highest frequency", "bending in a prism follows wavelength: violet bends most, red least"],
      "<b>Model answer:</b> Two errors are tangled together. First, frequency and wavelength move in opposite directions: a long wavelength means a low frequency, never a high one. Red light has the longest wavelength of the visible colours, so it has the lowest frequency, not the highest. Second, violet's strong bending in a prism goes with its short wavelength: violet has the shortest wavelength, the highest frequency, and the greatest refraction, while red, with the longest wavelength, refracts the least. Corrected, the statement reads: red, longest wavelength, lowest frequency, least refraction; violet, shortest wavelength, highest frequency, greatest refraction.<br><br><b>Marking points:</b> 1 mark for the inverse frequency-wavelength relationship stated. 1 mark for red corrected (longest wavelength, lowest frequency, least refraction). 1 mark for violet corrected (shortest wavelength, highest frequency, greatest refraction).",
      {});
  }
]), ["One relationship fixes both errors: frequency and wavelength move oppositely.", "Red and violet are the two ends of every ordering in this strand."]);

/* ---------- SC8.8.4 Effects of EM technologies ---------- */

E("s8-u3-effects", 3, ["SC8.8.4"], 3, "gen", function () {
  var cases = [
    { q: "Which analysis of a technology's effects is best supported?", k: "X-ray machines give doctors a way to detect injuries without surgery (positive), but each exposure adds a dose of higher-energy radiation, so exposures are limited and shielded (negative)", w: ["X-ray machines have only positive effects, because they are medical", "Microwave ovens are dangerous in the same way as gamma sources, because all radiation is equally harmful", "Cell phones have no effects worth discussing, positive or negative"] },
    { q: "A safety pamphlet is being written about ultraviolet radiation. Which statement belongs in it?", k: "Ultraviolet is higher-energy radiation that can damage skin and eyes with overexposure, so protection such as sunscreen and sunglasses is advised, even though moderate exposure has uses such as tanning", w: ["Ultraviolet is the lowest-energy radiation and needs no precautions", "Ultraviolet exposure is beneficial in unlimited amounts", "Sunglasses protect the eyes from gamma radiation at the beach"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Technologies built on electromagnetic radiation carry both signs of effect, and the guide's rule organizes them: generally, higher energy radiation is more harmful to humans. X-rays and ultraviolet reward care and shielding; radio waves and microwaves at ordinary levels are far less hazardous. A sound analysis names a real benefit and a real cost for the same technology.",
    {});
}, ["Look for the answer that holds a benefit and a cost for the same technology.", "Higher energy means more harm: that rule sorts the claims."]);

E("s8-u3-harm-energy", 3, ["SC8.8.4"], 1, "var", varset([
  function () {
    return mcq("Generally, which electromagnetic radiation is the most dangerous to humans, and which is the least?",
      "Gamma rays (high frequency, short wavelength, high energy) are generally the most dangerous; radio waves (low frequency, long wavelength, low energy) are the least",
      ["Radio waves are the most dangerous; gamma rays are the least",
       "Visible light is the most dangerous, because we are exposed to it constantly",
       "All types are equally dangerous at any exposure"],
      "The guide's general rule: exposure to high frequency, short wavelength radiation, such as gamma rays, is generally more dangerous, and low frequency, long wavelength radiation, such as radio waves, is generally less dangerous. High frequency waves are the high energy waves, and energy is what does the damage.",
      {});
  }
]), ["Danger follows energy, and energy follows frequency upward.", "Gamma end: dangerous. Radio end: comparatively safe."]);

E("s8-u3-atmosphere", 3, ["SC8.8.4"], 3, "var", varset([
  function () {
    return mcq("Astronauts outside Earth's atmosphere face a harsher radiation environment than people on the surface, even at the same distance from the Sun. Which explanation is correct?",
      "Earth's atmosphere blocks or absorbs much of the dangerous higher-energy radiation from space, and that protection is missing outside it",
      ["Space contains more radiation because astronauts are closer to the stars",
       "The atmosphere generates radiation that cancels the Sun's radiation at the surface",
       "Spacesuits attract radiation, which is the whole problem"],
      "The guide ties habitability to shielding: Earth's atmosphere protects us from some of the more dangerous electromagnetic radiation present in space, which is part of what makes the surface safe for humans adapted to these conditions. Remove the atmosphere, as in space or on another planet, and the exposure rises sharply.",
      {});
  }
]), ["Same Sun, same distance. What does the surface have that orbit lacks?", "The atmosphere is a radiation shield, not just air to breathe."]);

/* ---------- SC8.8.5 Trial-and-error development (Core STSE: Fibre Optics) ---------- */

E("s8-u3-trial-error", 3, ["SC8.8.5"], 2, "var", varset([
  function () {
    return mcq("The Fibre Optics core STSE traces light communication from polished-shield signals and heliographs, through Bell's photophone, to lasers, and finally to fibre optic cable. Which statement best describes the development pattern the story shows?",
      "Each generation solved a problem the previous one exposed, and progress waited on materials: fibre optics became possible only when very pure glass could be drawn into hair-thin strands that guide light by reflection",
      ["Fibre optics were invented in a single step by one inventor who foresaw the whole design",
       "The photophone failed because its inventors did not understand light at all",
       "Development was random: each device was unrelated to the ones before it"],
      "The STSE's pattern is systematic trial and error under material constraints. Heliographs needed sun and line of sight; the photophone (1880) carried voice on light but weather and interference defeated it; lasers gave a concentrated beam but fog and buildings still blocked it; the answer was to guide the light inside a cable, which required glass pure and fine enough to serve as the core. Two companies, Corning and Siemens, combined their fibre and cabling work for the first cable in 1977.",
      {});
  }
]), ["Each device answers the previous device's failure. What finally had to exist before fibre could work?", "Pure, hair-thin glass is the material constraint at the story's end."]);

E("s8-u3-materials-constraint", 3, ["SC8.8.5"], 1, "var", varset([
  function () {
    return mcq("Contact lenses could only become practical once a material existed that was transparent, shaped to refract light correctly, and safe and comfortable against the eye for hours. Which statement about optical technology does this example illustrate?",
      "Optical technologies develop through trial and error constrained by the optical properties of the available materials",
      ["Optical technologies appear as soon as the idea for them is written down",
       "The material used in an optical device has no effect on its design",
       "Contact lenses work by reflection, so their material does not refract"],
      "The guide's framing for this indicator: advances in optical technology follow the development of materials suited to the application. Lenses of any kind are hostage to their material's optical properties; contact lenses waited on a material that could be worn on the eye itself.",
      {});
  }
]), ["The idea was old. What was missing until the material arrived?", "No suitable material, no technology: that is the constraint."]);

E("s8-u3-cr-fibre", 3, ["SC8.8.5"], 3, "var", varset([
  function () {
    return textq("Using the Fibre Optics story, explain how an optical technology develops through systematic trial and error. Your answer should trace at least two steps in the chain from early light signalling to the fibre optic cable, name the problem each step exposed, and identify the material property that finally made fibre optics practical. (4 marks)",
      ["a chain of attempts, each answering a problem the last one exposed", "problems such as weather, interference and line of sight for open-air light signals", "very pure glass drawn hair-thin, guiding light by repeated reflection inside the core", "development as systematic and collaborative rather than a single leap"],
      "<b>Model answer:</b> Light communication began with reflected sunlight: polished shields, then the Mance Heliograph, which could signal 50 km but only in sunshine and clear air. Bell's photophone (1880) carried a voice on a vibrating mirror's reflected sunlight, a genuine advance, but clouds and interference could not be shut out, and Bell abandoned it. The laser in the late 1950s gave a concentrated beam that could carry far more information, yet fog, rain and buildings still blocked open-air paths. Each failure defined the next problem precisely: the light needed a protected path. The solution used two known properties of light, that it passes through glass and reflects off glass at the right angle, but it waited on a material: glass pure enough, drawn into strands as thin as a hair, so light reflects repeatedly inside the core and travels the cable's length. Corning's fibre and Siemens' cabling combined into the first fibre optic cable in 1977, a group achievement built from a century of other people's trials.<br><br><b>Marking points:</b> 1 mark for a chain of at least two steps with the problem each exposed. 1 mark for the specific problems of open-air light signalling (weather, interference, line of sight). 1 mark for the material property (very pure glass, hair-thin, guiding light by internal reflection). 1 mark for characterizing the process as systematic trial and error, carried out by many workers and groups.",
      {});
  }
]), ["Tell it as a chain: attempt, problem, next attempt. End at the material that made it possible.", "The glass is the climax: pure, thin, and reflective inside."]);

/* ---------- SC8.8.6 Optical technologies enabling research ---------- */

E("s8-u3-research-tech", 3, ["SC8.8.6"], 1, "gen", function () {
  var cases = [
    { q: "Which example shows an optical technology enabling scientific research?", k: "Astronomy teams use large telescopes to survey the universe and gather light from objects too faint for the eye", w: ["A hockey player wears a face shield during a game", "A driver uses headlights on a dark road", "A student reads a book under a lamp"] },
    { q: "Which personal activity is directly related to the optical technologies researchers use?", k: "Using a magnifying glass or a backyard telescope to observe specimens and the night sky", w: ["Wearing sunglasses at the beach", "Watching a movie at a theatre", "Using a microwave to heat lunch"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The indicator pairs two directions: optical technologies enable research (telescopes surveying the universe, microscopes opening the microscopic world), and the same technologies appear in personal activities (a magnifying glass, a hobby telescope), which is how the guide asks students to relate the two.",
    {});
}, ["Research means gathering new knowledge with the device, not just using light.", "Telescopes and microscopes are the research pair."]);

E("s8-u3-personal-optics", 3, ["SC8.8.6"], 1, "var", varset([
  function () {
    return mcq("Which list contains only optical technologies, of the kind this strand studies?",
      "Face shields on hockey helmets, car headlights, flashlights, magnifying glasses, eyeglasses, contact lenses, microscopes, telescopes and cameras",
      ["Face shields, headlights, radios, magnifying glasses and telescopes",
       "Eyeglasses, contact lenses, microwave ovens and cameras",
       "Flashlights, telescopes, cell phones and microscopes"],
      "Every item on the correct list works by reflection or refraction of light, and the list is the guide's own example set for this indicator. Radios, microwaves and cell phones belong to the wider EM spectrum study, but they are not optical technologies.",
      {});
  }
]), ["Optical means light-bending or light-bouncing devices only.", "If it works on radio or microwaves, it is out."]);

E("s8-u3-cr-research", 3, ["SC8.8.6"], 2, "var", varset([
  function () {
    return textq("Choose one optical technology (microscope, telescope, or fibre optics in medicine and communications). Explain how it enables scientific research: what can researchers observe or do with it that they could not without it, and which property of light makes it work. (3 marks)",
      ["the technology named with a research capability it creates", "the observation or measurement that was impossible before it", "the property of light it depends on"],
      "<b>Model answer:</b> The telescope enables astronomy. Distant objects send so little light to Earth that the unaided eye detects only the brightest stars; a telescope's large concave mirror or lenses collect light from a wide area and focus it, so researchers can observe faint galaxies, measure the light of individual distant stars, and survey the universe systematically, building the modern picture of its size and history. The property at work is reflection (for a reflecting telescope): the law of reflection lets a precisely curved mirror gather parallel rays to a focus. (The microscope, extending refraction to the microscopic world, or fibre optics, carrying light into the body and across oceans for research data, treated the same way, also earn full marks.)<br><br><b>Marking points:</b> 1 mark for the research capability the technology creates. 1 mark for what was impossible or impractical without it. 1 mark for the property of light it depends on.",
      {});
  }
]), ["Capability, gap, property: three moves.", "Name what researchers can do now that they could not do before."]);

/* ---------- SC8.8.7 Individual and group work in optics ---------- */

E("s8-u3-individual-group", 3, ["SC8.8.7"], 1, "var", varset([
  function () {
    return mcq("Which pairing correctly illustrates individual and group scientific and technological activity in optics?",
      "Individual: a lens maker grinding and testing lenses in a workshop. Group: an astronomy team surveying the universe with a shared observatory",
      ["Individual: the international Hubble telescope programme. Group: a single student with a magnifying glass",
       "Individual and group work never both occur in the same field",
       "Individual: an astronomy team. Group: a lone inventor"],
      "The guide's own contrast: some optics work is done by individuals, such as lens makers, and some by groups, such as astronomy teams investigating and surveying the universe. Modern flagships like the Hubble telescope are group work on the largest scale, while the craft tradition of the individual lens maker continues.",
      {});
  }
]), ["One pair has the scale right in both halves. Check each half separately.", "Lens maker alone; astronomy team together."]);

E("s8-u3-corning-siemens", 3, ["SC8.8.7"], 2, "var", varset([
  function () {
    return mcq("The first fibre optic cable, in 1977, combined Corning's fibre technology with Siemens' cabling technology. What does this example illustrate about scientific and technological activity?",
      "Major technologies often result from groups and organizations combining different expertise, not from a single worker",
      ["Companies never share expertise in developing technology",
       "The cable was the work of one individual at one company",
       "Fibre optics required no scientific knowledge, only manufacturing"],
      "Neither company held the whole solution: one had the fibre, the other the cable. Their joint work is the STSE's clearest case of technological activity as a group enterprise, set beside individual workers like lens makers elsewhere in the strand.",
      {});
  }
]), ["Two companies, two halves of the solution. What kind of activity is that?", "Group work at the scale of organizations."]);

E("s8-u3-hubble", 3, ["SC8.8.7"], 2, "var", varset([
  function () {
    return mcq("The Hubble Space Telescope was designed, built, launched and operated by large teams across many institutions and countries, and its mirror flaw was corrected by a servicing mission planned by still more teams. Which conclusion about optics work does Hubble best support?",
      "Modern optical research is predominantly group activity, building cumulatively on earlier workers' knowledge from Galileo and Newton onward",
      ["One individual can still complete a flagship optical instrument alone",
       "Hubble shows that group work produces flawed results and should be avoided",
       "Optics knowledge was complete by Newton's time and has not changed since"],
      "The guide presents the line from Galileo to Newton to Hubble and laser technologies as knowledge under continuous, collective development: today's understanding is not stagnant and will be extended. Hubble's scale, and the team effort that repaired it, are the modern face of that group activity.",
      {});
  }
]), ["Scale is the evidence: count the institutions a flagship needs.", "Cumulative and collective: knowledge handed on and built up."]);

/* ---------- SC8.9.1 New questions arising from what was learned ---------- */

E("s8-u3-new-questions", 3, ["SC8.9.1"], 2, "var", varset([
  function () {
    return mcq("After studying the electromagnetic spectrum, a class brainstorms new questions that arise from what they learned. Which question genuinely arises from the spectrum material?",
      "If ultraviolet radiation is invisible and can damage skin, how much ultraviolet reaches us on a cloudy day, and does sunscreen block all of it?",
      ["Why is the sky blue on some days and grey on others?",
       "How do plants make food from sunlight?",
       "What is the capital of every country that uses X-rays?"],
      "A question arises from what was learned when it grows out of the material itself: the spectrum study establishes that ultraviolet is invisible, energetic and harmful, and the question pushes exactly there. The other questions are fine questions, but they belong to other topics and other courses.",
      {});
  }
]), ["The new question must grow out of the spectrum study itself.", "Invisible plus harmful suggests a measurement question about ultraviolet."]);

E("s8-u3-new-problem", 3, ["SC8.9.1"], 1, "var", varset([
  function () {
    return mcq("Studying fibre optics raises a practical problem for a school board: older buildings have copper wiring that is slow for the school's network. Which statement frames the problem the new learning creates?",
      "Can fibre optic cable be installed in the older buildings, and would its light-based signals solve the speed problem the copper creates?",
      ["Why did the school board not invent fibre optics itself?",
       "Copper wiring should be banned everywhere immediately",
       "The school's network is a problem with no connection to optics"],
      "New learning creates new problems when it reveals a better possibility: knowing that fibre carries signals as light, quickly and without electrical interference, turns the old copper installation into a defined problem with a testable solution.",
      {});
  }
]), ["The problem exists because the learning showed a better way.", "Fibre's advantages define the copper problem."]);

/* ---------- SC8.9.2 Operational definitions ---------- */

E("s8-u3-definitions", 3, ["SC8.9.2"], 1, "gen", function () {
  var cases = [
    { q: "In a reflection diagram, what is the normal?", k: "The line drawn perpendicular (at 90 degrees) to the surface at the point where the ray strikes it", w: ["The line along the mirror's surface at the point of reflection", "The incoming ray itself", "The line halfway between the surface and the reflected ray"] },
    { q: "Which term names the ray that travels toward a mirror and strikes it?", k: "The incident ray", w: ["The reflected ray", "The normal", "The refracted ray"] },
    { q: "What is the angle of incidence, operationally?", k: "The angle between the incident ray and the normal, measured at the point of incidence", w: ["The angle between the incident ray and the mirror's surface", "The angle between the reflected ray and the surface", "The angle between the two mirrors in a periscope"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The reflection vocabulary is operational: the incident ray arrives, the reflected ray leaves, the normal stands perpendicular to the surface at the point of contact, and both angles are measured from the normal. These definitions are what Core Lab 5-2B's measurements mean.",
    {});
}, ["Every angle in reflection hangs off the normal.", "Incident arrives; reflected leaves; normal stands at 90 degrees."]);

E("s8-u3-definitions-figure", 3, ["SC8.9.2"], 3, "var", varset([
  function () {
    var q = mcq("The diagram shows a reflection with parts labelled A, B, C and D. Which labelling is correct?",
      "A is the incident ray, B is the reflected ray, C is the normal, and D is the mirror",
      ["A is the reflected ray, B is the incident ray, C is the mirror, and D is the normal",
       "A is the normal, B is the incident ray, C is the reflected ray, and D is the mirror",
       "A is the incident ray, B is the normal, C is the reflected ray, and D is the mirror"],
      "Read the geometry: A is the ray travelling in toward the mirror (incident), B is the ray travelling away after the bounce (reflected), C is the dashed line at 90 degrees to the surface (the normal), and D is the reflecting surface itself (the mirror).",
      {});
    q.figure = s8ReflectSVG(40, true);
    return q;
  }
]), ["Trace the light's path first: in, bounce, out. The dashed line is the normal.", "Direction of travel separates incident from reflected."]);

E("s8-u3-operational", 3, ["SC8.9.2"], 2, "var", varset([
  function () {
    return mcq("A class watches a tennis ball bounce off the floor at several angles and maps its path, then does the same with a ray box and mirror. Which statement best formulates the operational definition they are building toward?",
      "For both the ball and the light ray, the angle at which the path meets the normal before the bounce equals the angle at which it leaves after the bounce",
      ["Balls and light always bounce straight back the way they came",
       "The bounce angle depends only on how hard the ball is thrown",
       "Light obeys the bounce pattern only when a protractor is present"],
      "Operational definitions come from operations: doing the bouncing and measuring. Ball and ray behave the same way, which is why the guide introduces reflection through the ball demonstration: measure against the normal on both sides, and the equality is the definition in action.",
      {});
  }
]), ["The definition is built by measuring, not by memorizing.", "Ball and ray share one bounce rule."]);

/* ---------- SC8.9.3 Using mirrors to investigate images (CORE-adjacent) ---------- */

E("s8-u3-protractor", 3, ["SC8.9.3"], 1, "var", varset([
  function () {
    return mcq("In Core Lab 5-2B, a group keeps getting angles of reflection a few degrees off their angles of incidence. Which practice most improves their accuracy?",
      "Draw the normal carefully at the exact point of incidence, place the protractor's centre on that point, and measure both angles from the normal",
      ["Measure the incidence angle from the normal and the reflection angle from the mirror's surface",
       "Estimate the angles by eye and average the group's guesses",
       "Measure from the surface for both angles, since the surface is easier to see"],
      "Accurate mirror work is a chain of small disciplines: the rays drawn straight with a ruler from marked dots, the normal drawn at the point of incidence, the protractor centred on that point, and both angles read from the normal. Mixing references (normal for one angle, surface for the other) manufactures exactly the few-degrees error described.",
      {});
  }
]), ["Same point, same reference line, both angles: that is the accuracy chain.", "Most lab error here is a reference error, not a reading error."]);

E("s8-u3-concave-rays", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    return mcq("Which pair of statements correctly describes the two special rays used in concave mirror ray diagrams?",
      "A ray travelling parallel to the principal axis reflects through the focal point; a ray travelling through the focal point reflects parallel to the principal axis",
      ["A ray parallel to the axis reflects back on itself; a ray through the focal point is absorbed",
       "A ray parallel to the axis reflects through the centre of curvature; a ray through the focal point reflects through the centre too",
       "Both special rays reflect through the focal point, whatever their incoming path"],
      "The two rays are mirror images of one rule: parallel in, through the focal point out; through the focal point in, parallel out. Those two reflected rays are enough to locate an image, which is why the guide builds every curved mirror diagram from them (the textbook's third ray through the optical centre is not required).",
      {});
  }
]), ["The two rays swap roles: parallel and focal point trade places.", "In parallel, out through F. In through F, out parallel."]);

E("s8-u3-concave-spot", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    var q = mcq("The ray diagram shows an object placed beyond the centre of curvature of a concave mirror. Reading the diagram (not from memory), what are the image's properties?",
      "Smaller than the object, between the focal point and the centre of curvature, inverted, and real",
      ["Larger than the object, beyond the centre of curvature, inverted, and real",
       "Smaller than the object, behind the mirror, upright, and virtual",
       "The same size as the object, at the centre of curvature, inverted, and real"],
      "Read the drawing: the two reflected rays actually meet in front of the mirror, between F and C, so the image is real and located there; the image arrow is shorter than the object arrow (smaller) and points down (inverted). The guide is explicit that these characteristics are identified from a specific ray diagram, not memorized.",
      {});
    q.figure = s8ConcaveSVG("beyond");
    return q;
  },
  function () {
    var q = mcq("The ray diagram shows an object placed between the focal point and the centre of curvature of a concave mirror. Reading the diagram, what are the image's properties?",
      "Larger than the object, beyond the centre of curvature, inverted, and real",
      ["Smaller than the object, between the focal point and the centre, inverted, and real",
       "Larger than the object, behind the mirror, upright, and virtual",
       "The same size as the object, upright, and virtual"],
      "In the drawing the reflected rays meet beyond C, and the image arrow stands taller than the object arrow and points down: larger, beyond the centre of curvature, inverted, and real (formed where the rays actually meet, in front of the mirror). Moving the object changed every property, which is the lesson of the three positions.",
      {});
    q.figure = s8ConcaveSVG("between");
    return q;
  },
  function () {
    var q = mcq("The ray diagram shows an object placed between the focal point and a concave mirror. Reading the diagram, what are the image's properties?",
      "Larger than the object, behind the mirror, upright, and virtual",
      ["Smaller than the object, in front of the mirror, inverted, and real",
       "Larger than the object, in front of the mirror, inverted, and real",
       "The same size as the object, behind the mirror, upright, and virtual"],
      "Here the reflected rays spread apart in front of the mirror and never meet; their dashed extensions meet behind the mirror, where the image arrow stands: larger, upright, and virtual. It is the magnifying case, the shaving or makeup mirror position.",
      {});
    q.figure = s8ConcaveSVG("inside");
    return q;
  }
]), ["Let the drawing answer: where do the rays meet, and how does the image arrow compare?", "Dashed image means virtual; meeting rays mean real."]);

E("s8-u3-convex-spot", 3, ["SC8.9.3"], 1, "var", varset([
  function () {
    var q = mcq("The ray diagram shows an object in front of a convex mirror. Which properties does the diagram show the image to have?",
      "Smaller than the object, closer to the mirror than the object, upright, and virtual",
      ["Larger than the object, farther from the mirror, inverted, and real",
       "Smaller than the object, in front of the mirror, upright, and real",
       "The same size as the object, the same distance away, upright, and virtual"],
      "The convex case never varies: the reflected rays diverge, their extensions meet behind the mirror, and the image is always smaller, closer, upright and virtual. That reliability, plus the wide field of view, is why convex mirrors serve as safety and security mirrors.",
      {});
    q.figure = s8ConvexSVG();
    return q;
  }
]), ["Convex images are the strand's one fixed pattern. Read it off the diagram.", "Smaller, closer, upright, virtual: every time."]);

E("s8-u3-real-virtual", 3, ["SC8.9.3"], 1, "var", varset([
  function () {
    return mcq("On a ray diagram, how do you distinguish a real image from a virtual image?",
      "A real image forms in front of the mirror where the reflected rays actually meet; a virtual image forms behind the mirror where the rays' extensions appear to meet",
      ["A real image is always larger; a virtual image is always smaller",
       "A real image is upright; a virtual image is inverted",
       "A real image can be seen only in photographs; a virtual image only in person"],
      "The guide limits the distinction to location on the diagram, and that is enough: rays actually converging in front of the mirror make a real image (it could be caught on a screen); rays that must be extrapolated backward to a meeting point behind the mirror make a virtual one. Size and orientation vary independently.",
      {});
  }
]), ["Location decides: rays meeting, or extensions meeting?", "In front and actual means real; behind and apparent means virtual."]);

E("s8-u3-cr-mirror-lab", 3, ["SC8.9.3"], 2, "var", varset([
  function () {
    return textq("In Core Lab 5-2B, Part B, a group places an arrow 6 cm in front of a plane mirror, draws the ray diagram, and locates the image 6 cm behind the mirror, the same height as the arrow. A second group uses 10 cm and finds the image 10 cm behind. A third group reports its image at 8 cm behind for an object 12 cm in front, and its drawn rays do not meet at one point. State the conclusion the first two groups' data supports, and evaluate the third group's result. (3 marks)",
      ["image distance equals object distance in a plane mirror", "image size equals object size", "the third group's diagram has a construction error, since its rays should meet at 12 cm behind"],
      "<b>Model answer:</b> The agreeing data supports the plane mirror conclusion: the image forms as far behind the mirror as the object is in front (6 cm and 6 cm; 10 cm and 10 cm), and the image is the same size as the object, upright and virtual. The third group's result does not fit the pattern its classmates established, and its own evidence betrays it: properly drawn reflected rays from a point meet at a single image point, so rays that fail to meet mean the construction, not the mirror, is at fault, most likely a normal drawn at the wrong point or angles measured from the surface. The group should redraw carefully and remeasure rather than report 8 cm as a finding.<br><br><b>Marking points:</b> 1 mark for the conclusion (image distance equals object distance, same size). 1 mark for judging the third result against the pattern. 1 mark for identifying the construction error from the non-meeting rays.",
      {});
  }
]), ["Two groups agree on a pattern; the third disagrees and its own diagram shows why.", "Equal distances is the conclusion; non-meeting rays are the tell."]);

/* ---------- SC8.9.4 Defining and delimiting questions ---------- */

E("s8-u3-delimit", 3, ["SC8.9.4"], 2, "var", varset([
  function () {
    return mcq("A student's investigation question reads: 'Everything about how mirrors work.' Which revision properly defines and delimits it for an investigation?",
      "How does the angle of incidence of a ray on a plane mirror compare with its angle of reflection, for angles between 20 and 60 degrees?",
      ["How do mirrors work in the universe?",
       "Why are mirrors interesting?",
       "What is the complete history of mirrors?"],
      "Delimiting narrows a topic to a measurable question with boundaries: one mirror type, two named angles to compare, and a stated range. The original and the other options have no variables and no edges, so no investigation could finish them.",
      {});
  }
]), ["A delimited question names its variables and its limits.", "One mirror, two angles, a stated range."]);

E("s8-u3-delimit-problem", 3, ["SC8.9.4"], 1, "var", varset([
  function () {
    return mcq("A team wants to investigate why the school gymnasium's windows produce glare on the floor during morning classes. Which problem statement is delimited well enough to investigate?",
      "Between 9 and 10 a.m., sunlight reflecting off the gym's east windows creates glare patches on the floor; the team will test which window covering removes the glare while keeping the gym usable",
      ["The gym is too bright sometimes and something should be done",
       "Sunlight is a problem for all schools everywhere",
       "The team will solve glare in every building in the province"],
      "A delimited problem names the place, the time, the phenomenon and the test to run. Province-wide and someday statements cannot be investigated by a school team; the first option can be, in a week of mornings.",
      {});
  }
]), ["Place, time, phenomenon, test: a problem small enough to actually run.", "If the team cannot finish it, it is not delimited."]);

/* ---------- SC8.9.5 Predictions and hypotheses ---------- */

E("s8-u3-hypothesis", 3, ["SC8.9.5"], 2, "var", varset([
  function () {
    return mcq("Before Core Lab 5-2B, a student must state a hypothesis about reflection. Which statement is a proper hypothesis for the lab?",
      "If a ray strikes a plane mirror at a measured angle of incidence, then the angle of reflection will equal it, because the law of reflection governs every ray at a smooth surface",
      ["Mirrors are fun to work with and the lab will be interesting",
       "The angle of reflection might do something when we shine the light",
       "Reflection was discovered a long time ago by scientists"],
      "A hypothesis is a testable statement with a reason attached: it predicts the measurable outcome (equal angles) and grounds the prediction (the law). Opinions, vague gestures and history are not hypotheses because the lab cannot test them.",
      {});
  }
]), ["A hypothesis predicts a measurable result and says why.", "If-then plus a reason: that is the shape."]);

E("s8-u3-prediction", 3, ["SC8.9.5"], 1, "var", varset([
  function () {
    return mcq("A group has measured angles of incidence and reflection of 20 and 20, 35 and 35, and 50 and 50 degrees. Based on the pattern, what is the sound prediction for a new trial at 65 degrees incidence, and what is it based on?",
      "The angle of reflection will be 65 degrees, based on the observed pattern that the two angles are always equal",
      ["The angle of reflection will be 25 degrees, because the angles must add to 90",
       "No prediction is possible from only three trials",
       "The angle of reflection will be 130 degrees, doubling as the trials proceed"],
      "A prediction extends an observed pattern: three trials all show equality, so the next trial is predicted to show it too. Predictions are only as good as the pattern behind them, which is why the lab collects several angles instead of one.",
      {});
  }
]), ["Extend the pattern the data already shows.", "Equal, equal, equal: predict equal."]);

/* ---------- SC8.9.6 Using tools and apparatus safely (CORE) ---------- */

E("s8-u3-safety", 3, ["SC8.9.6"], 1, "var", varset([
  function () {
    return mcq("Which practice is the safe and correct way to work with the ray box and mirrors in the optics labs?",
      "Never look directly into the ray box beam or shine it toward anyone's eyes, and handle mirrors by their edges to avoid cuts from chipped glass",
      ["Look along the beam to check it is straight before measuring",
       "Shine the beam at a partner's mirror to test their reflexes",
       "Carry mirrors loosely in one hand while moving around the room"],
      "Optics apparatus has two standing hazards: beams aimed at eyes, and glass that can chip or break. The safe habits are to keep beams on the bench and away from eyes, and to handle mirrors carefully by their edges. Bench skill is classroom assessment; this entry carries the safety knowledge.",
      {});
  }
]), ["Beams away from eyes; glass handled by its edges.", "The beam is for the paper, never for a face."]);

/* ---------- SC8.9.7 Conclusions from experimental data ---------- */

E("s8-u3-conclusion", 3, ["SC8.9.7"], 2, "var", varset([
  function () {
    return mcq("A group's reflection data read: incidence 15, reflection 15; incidence 30, reflection 29; incidence 45, reflection 46; incidence 60, reflection 60. Which conclusion is properly based on this data?",
      "The angle of reflection equals the angle of incidence, within the small measurement errors expected from protractor work",
      ["The law of reflection is disproved, because two trials are off by one degree",
       "The angle of reflection is sometimes larger and sometimes smaller, so no pattern exists",
       "The group should change the two off values to match the law exactly"],
      "Conclusions respect both the pattern and the instrument. Three exact matches and two misses of a single degree, the width of a pencil line on a protractor, support the law with measurement error named. Fudging the numbers to perfection would corrupt the data; declaring the law dead over one degree would ignore how measurement works.",
      {});
  }
]), ["Judge the pattern against the instrument's precision.", "One degree is protractor noise, not a refutation."]);

E("s8-u3-evidence", 3, ["SC8.9.7"], 2, "var", varset([
  function () {
    return mcq("A student began the refraction unit predicting that light bends toward the normal when it speeds up. After Core Lab 5-1D, her diagrams show rays bending toward the normal as they enter water, where light travels more slowly. Which statement correctly relates her evidence to her initial idea?",
      "The evidence refutes her initial idea: bending toward the normal happens when light slows down entering a denser medium, the opposite of her prediction",
      ["The evidence supports her idea, because the rays did bend toward the normal as she said",
       "The evidence is unrelated to her idea, because diagrams are not evidence",
       "Her idea and the evidence agree, since water is less dense than air"],
      "Evidence work means comparing the claim with the result on the claim's own terms. She predicted the bend would accompany speeding up; the lab shows the bend toward the normal accompanying slowing down in the denser medium. The direction she named was right and the mechanism she attached to it was wrong, so the idea as stated is refuted and must be revised.",
      {});
  }
]), ["Compare the whole claim, mechanism included, with what the data show.", "Right direction, wrong reason still counts as refuted."]);

E("s8-u3-cr-conclusion", 3, ["SC8.9.7"], 3, "var", varset([
  function () {
    return textq("A class tests whether the angle of refraction depends on the liquid, shining a ray at 40 degrees incidence from air into three liquids. Their measured angles of refraction are: water 29 degrees, vegetable oil 26 degrees, 30 percent sugar solution 27 degrees. One group also recorded glycerol at 41 degrees. (a) State a conclusion the class data supports about liquids and refraction. (b) Evaluate the glycerol result. (3 marks)",
      ["the denser liquids bend the ray more toward the normal, giving smaller refraction angles", "oil and sugar solution bend more than water in this data", "the glycerol value breaks the pattern and exceeds the incidence angle, so it should be remeasured"],
      "<b>Model answer:</b> (a) All three reliable results show the ray bending toward the normal (refraction angle smaller than the 40 degree incidence angle), and the amount of bending differs by liquid: the oil bent the ray most (26 degrees), then the sugar solution (27), then water (29). The supported conclusion is that the medium affects the angle of refraction, with the denser liquids in this set bending light more strongly toward the normal. (b) The glycerol result, 41 degrees, is larger than the angle of incidence, which would mean the ray bent away from the normal while entering a denser liquid, contradicting every other measurement and the bending rule. It is almost certainly a measurement or recording error (for example, measuring from the surface instead of the normal) and the group should remeasure it rather than report it.<br><br><b>Marking points:</b> 1 mark for the conclusion that the medium affects the refraction angle, with the ordering from the data. 1 mark for noting all angles are smaller than the incidence angle (bending toward the normal). 1 mark for evaluating the glycerol value as an error against the pattern and prescribing remeasurement.",
      {});
  }
]), ["Conclude from the three agreeing values; judge the fourth against the pattern and the rule.", "An angle bigger than the incidence angle, entering a denser liquid, cannot stand."]);

/* ---------- SC8.9.8 Questions about refraction from practical problems ---------- */

E("s8-u3-fish-question", 3, ["SC8.9.8"], 2, "var", varset([
  function () {
    return mcq("A fisher notices that a trout under the water is never quite where it appears to be. Which question turns this practical problem into an investigation of refraction?",
      "By how much does the apparent depth of an object under water differ from its real depth, and does the difference grow as the viewing angle changes?",
      ["Why do trout avoid being caught?",
       "Is fishing better in the morning or the evening?",
       "Who first noticed that fish look displaced?"],
      "The practical problem is the displacement. The investigable version measures it (apparent versus real depth) and varies a condition (viewing angle). The bent stick and the fish are the guide's own examples of refraction questions arising from practical problems.",
      {});
  }
]), ["The investigation must measure the displacement, not just admire it.", "Apparent versus real, with one condition varied."]);

E("s8-u3-coin-question", 3, ["SC8.9.8"], 1, "var", varset([
  function () {
    return mcq("A coin at the bottom of an empty opaque cup is hidden by the cup's rim. When water is poured in, the coin appears, as if it floated up. Which question should the class investigate from this demonstration?",
      "How does the water change the path of light from the coin so that it reaches the eye over the rim?",
      ["Why did the coin not really float?",
       "What is the coin made of?",
       "How much water does the cup hold?"],
      "The demonstration's puzzle is optical: the coin did not move, its light's path did. The investigable question targets the refraction that bends the light at the surface, the same apparent-position effect as the bent stick and the fish.",
      {});
  }
]), ["The coin stayed put. What travelled differently?", "The light's path is the investigation."]);

/* ---------- SC8.9.9 Estimating angles of incidence and refraction ---------- */

E("s8-u3-estimate-bend", 3, ["SC8.9.9"], 2, "gen", function () {
  var cases = [
    { mode: "toward", q: "The diagram shows a ray passing from air into water. Which estimate of the angle of refraction, compared with the angle of incidence, is correct?", k: "The angle of refraction is smaller: entering the denser medium, the ray bends toward the normal", w: ["The angle of refraction is larger: the ray bends away from the normal", "The angles are equal: refraction never changes the angle", "The angle of refraction is zero: the ray stops at the surface"] },
    { mode: "away", q: "The diagram shows a ray passing from water into air. Which estimate of the angle of refraction, compared with the angle of incidence, is correct?", k: "The angle of refraction is larger: leaving the denser medium, the ray bends away from the normal", w: ["The angle of refraction is smaller: the ray bends toward the normal", "The angles are equal: the ray continues straight", "The angle of refraction is 90 degrees: the ray runs along the surface"] }
  ];
  var c = pick(cases);
  var q = mcq(c.q, c.k, c.w,
    "Estimating refraction angles starts with direction, and direction follows density. Entering a medium of greater density, light slows and bends toward the normal, so the refraction angle is the smaller one. Leaving for a less dense medium, it speeds up and bends away, so the refraction angle is the larger one. The dashed line in the diagram is the path the ray would have taken with no bending.",
    {});
  q.figure = s8RefractSVG(c.mode, true);
  return q;
}, ["Direction first: toward the normal entering denser, away leaving it.", "The dashed line is the no-bend path; the real ray sits on the normal side of it, or the far side."]);

E("s8-u3-estimate-compare", 3, ["SC8.9.9"], 3, "var", varset([
  function () {
    return mcq("Two rays strike a water surface from the air, one at 20 degrees incidence and one at 55 degrees. A student estimates both refraction angles. Which estimate pattern is sound?",
      "Both refraction angles are smaller than their incidence angles, and the 55 degree ray bends by more degrees than the 20 degree ray",
      ["Both refraction angles are larger than their incidence angles",
       "The 20 degree ray bends more than the 55 degree ray, because shallow rays bend most",
       "Neither ray bends, because both start in air"],
      "Entering water, every ray bends toward the normal, so every refraction angle is smaller than its incidence angle. The amount of bending grows with the incidence angle: a ray arriving nearly along the normal barely bends, and a steep ray bends the most, which the core lab's changing-angle observations show.",
      {});
  }
]), ["Two rules combine: always toward the normal here, and more bending at steeper incidence.", "A near-normal ray is nearly unbent; that anchors the comparison."]);

E("s8-u3-cr-estimate", 3, ["SC8.9.9"], 2, "var", varset([
  function () {
    return textq("For each crossing, estimate whether the angle of refraction will be larger or smaller than the angle of incidence, and justify the estimate: (a) a ray travelling from air into a block of glass at 45 degrees incidence; (b) the same ray travelling from the glass back into air at 30 degrees incidence inside the glass. (3 marks)",
      ["into glass the refraction angle is smaller, bending toward the normal", "out of glass the refraction angle is larger, bending away from the normal", "justifications tied to density and speed change"],
      "<b>Model answer:</b> (a) Glass is denser than air, so the ray slows as it enters and bends toward the normal: the angle of refraction is smaller than 45 degrees. (b) Leaving the glass for the less dense air, the ray speeds up and bends away from the normal: the angle of refraction is larger than 30 degrees. The two estimates are the same rule read in opposite directions: bending follows the density change at the boundary, toward the normal when entering the denser medium and away when leaving it.<br><br><b>Marking points:</b> 1 mark for the first estimate with its justification. 1 mark for the second estimate with its justification. 1 mark for tying both to the density and speed change at the boundary.",
      {});
  }
]), ["One rule, read forward then backward. Density decides the direction both times.", "Toward entering denser; away entering less dense."]);

/* ---------- SC8.9.10 Conducting the refraction experiment (CORE) ---------- */

E("s8-u3-conduct", 3, ["SC8.9.10"], 2, "var", varset([
  function () {
    return mcq("In Core Lab 5-1D, students trace a refracted ray through a transparent block. Which procedure produces a trustworthy ray path?",
      "Mark two dots in the middle of the incident beam and two in the refracted beam, remove the ray box, and join the dots with a ruler, tracing the block's outline first",
      ["Draw the ray freehand while the beam shines, estimating where it goes",
       "Trace the block after measuring, and guess the ray's path from memory",
       "Mark one dot in each beam and connect them to the corner of the block"],
      "The core lab's method is built for accuracy: the block's outline is traced so it can be replaced exactly, dots mark the beams' centres (two per beam define a line), and a ruler joins them after the apparatus is removed. The guide stresses the process: careful marking is what makes the resulting angles worth measuring.",
      {});
  }
]), ["Dots define the ray; the ruler draws it; the outline replaces the block.", "Two dots per beam, or the line is a guess."]);

E("s8-u3-method-steps", 3, ["SC8.9.10"], 1, "var", varset([
  function () {
    return mcq("Which sequence correctly orders the steps for describing a refracted ray's path through a transparent medium?",
      "Set up the ray and medium, mark the incident and refracted beams, draw the normal at the boundary point, then measure the angles of incidence and refraction",
      ["Measure the angles first, then set up the ray to match them",
       "Draw the normal last, after the angles are recorded",
       "Remove the medium, guess the path, and check with the ray afterward"],
      "Method order matters because each step feeds the next: the beams must exist before they can be marked, the normal must be drawn at the true boundary point before angles can be measured from it, and measurement comes last. Angles measured before the normal exists have no reference.",
      {});
  }
]), ["Beams, marks, normal, measures: each step needs the one before.", "The normal must exist before any angle can be measured from it."]);

/* ---------- SC8.9.11 Designing an experiment and identifying variables ---------- */

E("s8-u3-variables", 3, ["SC8.9.11"], 3, "var", varset([
  function () {
    return mcq("A group designs an experiment to test whether the type of liquid affects how much a ray bends. They shine a ray from air into water, vegetable oil and sugar solution at the same 40 degree angle, and measure each angle of refraction. Which identification of the variables is correct?",
      "Changed variable: the liquid. Measured variable: the angle of refraction. Kept the same: the angle of incidence, the ray source and the container",
      ["Changed variable: the angle of refraction. Measured variable: the liquid. Kept the same: the container only",
       "Changed variable: the angle of incidence. Measured variable: the liquid. Kept the same: the angle of refraction",
       "There are no variables to identify, because the liquids are not alive"],
      "Design begins with the variable roles. The group deliberately changes the liquid, measures the refraction angle as the outcome, and holds the incidence angle and apparatus constant so the comparison among liquids is fair. Swapping the changed and measured roles is the classic design error this indicator targets.",
      {});
  }
]), ["What they set, what they read, what they froze: assign each before judging.", "The liquid is set by hand; the angle is read off. That settles the roles."]);

E("s8-u3-cr-design-refraction", 3, ["SC8.9.11"], 3, "var", varset([
  function () {
    return textq("Design an experiment to determine whether a ray bends more when it enters vegetable oil or a 30 percent sugar solution from air. Your design must state the question being tested, the method (including how the ray's path will be recorded), the variable you will change, the variable you will measure, at least two variables you will keep the same, and how you will decide which liquid bends the ray more. (4 marks)",
      ["a clear testable question comparing the two liquids", "a ray-tracing method with dots, outline and ruler, and the normal drawn", "the liquid changed, the angle of refraction measured", "incidence angle and apparatus kept the same, with the decision rule stated"],
      "<b>Model answer:</b> Question: at the same angle of incidence, does a ray from air bend more entering vegetable oil or entering a 30 percent sugar solution? Method: fill a rectangular transparent container with the first liquid, shine a single ray from a ray box into it at 40 degrees to the normal, mark two dots in the incident beam and two in the refracted beam, trace the container's outline, remove the apparatus, join the dots with a ruler, draw the normal at the boundary point, and measure the angle of refraction. Repeat identically with the second liquid. The variable changed is the liquid. The variable measured is the angle of refraction. Kept the same: the angle of incidence (40 degrees), the ray box and container, and the measuring procedure. Decision: the liquid with the smaller angle of refraction bent the ray more toward the normal, so it is the stronger bender; repeat each liquid twice to check the measurements agree.<br><br><b>Marking points:</b> 1 mark for the testable question and a workable ray-tracing method. 1 mark for the changed and measured variables correctly named. 1 mark for at least two variables kept the same. 1 mark for the decision rule (smaller refraction angle means more bending) with a repeatability step.",
      {});
  }
]), ["Build it on the core lab's method, then make the variable roles and the decision rule explicit.", "Smaller refraction angle at the same incidence means more bending: that is the verdict rule."]);

/* ---------- SC8.9.13 The bending rule ---------- */

E("s8-u3-bend-rule", 3, ["SC8.9.13"], 1, "gen", function () {
  var cases = [
    { q: "A light ray travels from air into water at an angle. Which way does it bend?", k: "Toward the normal, because water is denser than air and the light slows down", w: ["Away from the normal, because water is denser than air", "Toward the normal, because the light speeds up in water", "It does not bend, because bending happens only in glass"] },
    { q: "A light ray travels from glass into air at an angle. Which way does it bend?", k: "Away from the normal, because air is less dense than glass and the light speeds up", w: ["Toward the normal, because air is less dense than glass", "Away from the normal, because the light slows down in air", "Along the normal, because glass always straightens rays"] },
    { q: "Which statement states the bending rule correctly?", k: "Into a medium of greater density, light bends toward the normal; into a medium of lesser density, it bends away from the normal", w: ["Into a medium of greater density, light bends away from the normal; into a lesser density, toward it", "Light always bends toward the normal, whatever the media", "Light always bends away from the normal, whatever the media"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "The rule this indicator names: a ray entering a medium of greater density slows and bends toward the normal; a ray entering a medium of lesser density speeds up and bends away from the normal. Density direction and bending direction are locked together.",
    {});
}, ["Denser ahead means toward; less dense ahead means away.", "Say the density change first, the bend follows."]);

E("s8-u3-bend-figure", 3, ["SC8.9.13"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows a ray crossing from air into water, with the dashed line showing the path it would take if it did not bend. Which description of the solid refracted ray is correct?",
      "It bends toward the normal, ending closer to the normal than the dashed path",
      ["It bends away from the normal, ending farther from the normal than the dashed path",
       "It follows the dashed path exactly, because water does not bend light",
       "It reflects back into the air along the dashed path"],
      "Water is denser than air, so the ray slows and bends toward the normal: the solid ray sits between the normal and the dashed unbent path. The diagram is the rule drawn, and the rule is the diagram explained.",
      {});
    q.figure = s8RefractSVG("toward", true);
    return q;
  },
  function () {
    var q = mcq("The diagram shows a ray crossing from water into air, with the dashed line showing the path it would take if it did not bend. Which description of the solid refracted ray is correct?",
      "It bends away from the normal, ending farther from the normal than the dashed path",
      ["It bends toward the normal, ending closer to the normal than the dashed path",
       "It follows the dashed path exactly, because air does not bend light",
       "It stops at the surface and travels along it"],
      "Leaving the denser water for the less dense air, the ray speeds up and bends away from the normal: the solid ray sits farther from the normal than the dashed unbent path. The two diagrams in this family are mirror images of one rule.",
      {});
    q.figure = s8RefractSVG("away", true);
    return q;
  }
]), ["Compare the solid ray with the dashed one: which side of the dashed path is it on?", "Toward means between the dashed path and the normal."]);

E("s8-u3-bend-straight", 3, ["SC8.9.13"], 2, "var", varset([
  function () {
    var q = mcq("The diagram shows a ray travelling straight down along the normal as it passes from air into water. What happens to the ray at the boundary?",
      "It slows down but does not bend, continuing straight along the normal",
      ["It bends toward the normal, since entering water always bends light",
       "It bends away from the normal, because it speeds up at the surface",
       "It reflects back along the normal into the air"],
      "Bending needs an angle. A ray arriving along the normal (zero angle of incidence) has no sideways component to swing: it changes speed in the water but keeps its direction exactly, which the guide's wheel-and-axle analogy shows: hit the rough surface straight on, and you slow without veering.",
      {});
    q.figure = s8RefractSVG("straight", false);
    return q;
  }
]), ["Zero angle of incidence is the exception case. What survives: speed change or direction change?", "Straight on means slow down, no veer."]);

E("s8-u3-bend-two-boundary", 3, ["SC8.9.13"], 3, "var", varset([
  function () {
    return mcq("A ray passes from air into a glass block, travels through it, and exits the parallel opposite face back into air. Which description of the ray's full path is correct?",
      "It bends toward the normal entering the glass, travels straight through, then bends away from the normal leaving, emerging parallel to its original direction but shifted sideways",
      ["It bends away from the normal entering, then toward the normal leaving, emerging along its original line",
       "It bends toward the normal at both faces and keeps bending inside the glass",
       "It does not bend at either face, because the two faces cancel out before the ray arrives"],
      "Each boundary applies the rule independently. Entering the denser glass: toward the normal. Leaving for the less dense air: away from the normal, by the same amount, because the faces are parallel. The two bends cancel in direction but not in position: the ray emerges parallel to its start, displaced sideways, the classic block result from the core lab family.",
      {});
  }
]), ["Treat the two faces as two separate crossings, each with its own density change.", "Toward in, away out, parallel but shifted."]);

/* ---------- SC8.9.14 Predicting media effects on refraction ---------- */

E("s8-u3-predict-media", 3, ["SC8.9.14"], 2, "gen", function () {
  var cases = [
    { q: "A ray enters three liquids from air at the same angle of incidence: water, vegetable oil, and a 30 percent sugar solution. Knowing that oil and the sugar solution are denser than water, which prediction is sound?", k: "The ray bends more toward the normal in the oil and the sugar solution than in the water, so their angles of refraction are smaller", w: ["The ray bends most in the water, because it is the least dense", "All three bend identically, because the incidence angle is the same", "The ray bends away from the normal in the denser liquids"] },
    { q: "A student predicts that a ray entering glycerol (denser than water) from air will have a larger angle of refraction than the same ray entering water. Evaluate the prediction.", k: "It is backwards: the denser medium bends the ray more toward the normal, giving a smaller angle of refraction", w: ["It is correct: denser media always give larger refraction angles", "It cannot be evaluated without knowing the temperature", "It is correct, because glycerol is thicker and pushes the ray wider"] }
  ];
  var c = pick(cases);
  return mcq(c.q, c.k, c.w,
    "Prediction follows the density rule: at the same incidence, a denser medium bends the ray more toward the normal, which means a smaller angle of refraction. The guide names the test set itself: vegetable oil, water and 30 percent sugar solution, with water the least dense of the three.",
    {});
}, ["More density, more bending, smaller angle: chain the three.", "The comparison is at equal incidence; only the medium changes."]);

E("s8-u3-cr-predict", 3, ["SC8.9.14"], 2, "var", varset([
  function () {
    return textq("A ray is shone from air into an unknown clear liquid at 50 degrees incidence, and the angle of refraction is measured at 31 degrees. For water at the same incidence, the angle of refraction is 35 degrees. Predict, with your reasoning, whether the unknown liquid is denser or less dense than water, and predict what would happen to the angle of refraction if the experiment were repeated with the ray entering at 30 degrees incidence instead. (3 marks)",
      ["the unknown liquid is denser than water, because it bent the ray more toward the normal", "a smaller refraction angle at the same incidence means stronger bending and greater density", "at 30 degrees incidence the refraction angle would shrink further, still below the incidence angle"],
      "<b>Model answer:</b> The unknown liquid bent the ray more than water did: at the same 50 degrees incidence, its refraction angle (31 degrees) is smaller than water's (35 degrees), meaning the ray sits closer to the normal. Stronger bending toward the normal is the signature of a denser medium, so the unknown liquid is denser than water. At 30 degrees incidence, the ray arrives closer to the normal, so it bends less in absolute degrees; the angle of refraction would be smaller than 31 degrees but still smaller than the 30 degree incidence angle, because entering a denser medium always bends the ray toward the normal.<br><br><b>Marking points:</b> 1 mark for the density prediction (denser than water). 1 mark for the reasoning from the smaller refraction angle at equal incidence. 1 mark for the second prediction (refraction angle falls, remaining below the incidence angle).",
      {});
  }
]), ["Compare at equal incidence: smaller refraction angle means more bending means denser.", "Then run the same rule at a shallower incidence."]);

E("s8-u3-cr-identify-medium", 3, ["SC8.9.14"], 3, "var", varset([
  function () {
    return textq("A forensic technician notes that the guide for this strand says the degree of refraction can help identify an unknown material. A ray entering a clear fragment from air at 60 degrees incidence refracts at 35 degrees; the same test on known glass gives 35 degrees, and on a known clear plastic gives 39 degrees. State the technician's conclusion, explain the reasoning from the bending rule, and name one thing the technician must hold the same across the tests for the conclusion to be fair. (3 marks)",
      ["the fragment matches glass, not the plastic, on this test", "equal incidence with equal refraction angle means equal bending, the denser-match signature", "the angle of incidence (and the ray setup) held the same"],
      "<b>Model answer:</b> The fragment behaves exactly as the known glass does: at the same 60 degrees incidence, both bend the ray to a 35 degree refraction angle, while the plastic bends it less (39 degrees). Bending strength at a boundary is a property of the medium, set by its density and index of refraction: the more the ray bends toward the normal, the greater the medium's refractive effect. Matching the glass's bending exactly, and differing from the plastic's, the fragment is identified as glass, on this evidence. The comparison is only fair because the angle of incidence was held the same in every test (with the same ray box and setup); change the incidence and the refraction angles would change for every material.<br><br><b>Marking points:</b> 1 mark for the conclusion (the fragment matches glass). 1 mark for the reasoning (equal bending at equal incidence identifies the medium; the plastic bends less). 1 mark for the controlled condition (same angle of incidence and setup).",
      {});
  }
]), ["Identification means matching a known material's bending under identical conditions.", "Same incidence in, compare refraction out."]);

/* Compose exclusion (Nov 15, 2026): entries named here carry noCompose, and
   composeExam leaves them out of every composed paper (unit tests, mid-course
   and final reviews, custom compositions) while practice draws, prerequisite
   checks and explicit teacher picks keep them. The design-an-investigation item
   is practice and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U3 = {
  "s8-u3-cr-design-refraction": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U3[e.id]) { e.noCompose = true; } });
