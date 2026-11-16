// CRMARKS: s8-u4-cr-living=3
// CRMARKS: s8-u4-cr-cell-division=3
// CRMARKS: s8-u4-cr-levels=3
// CRMARKS: s8-u4-cr-factors=3
// CRMARKS: s8-u4-cr-interdependence=3
// CRMARKS: s8-u4-cr-organelles=3
// CRMARKS: s8-u4-cr-artificial=4
// CRMARKS: s8-u4-cr-community=3
// CRMARKS: s8-u4-cr-decision=3
// CRMARKS: s8-u4-cr-propose=3
// CRMARKS: s8-u4-cr-decision-personal=3
// CRMARKS: s8-u4-cr-microscope=3
// CRMARKS: s8-u4-cr-model-eval=3
// CRMARKS: s8-u4-cr-design-rates=4
// Science 8 Unit 4 bank: Cells, Tissues, Organs and Systems
// (SC8.10.1 to SC8.12.12), built Nov 15, 2026 to the Cells
// authoring spec. All entries are original and were written
// new for this app. Existing tests and question banks,
// including the ESD Unit 4 set (unit test, Lab 12-1B, the
// Artificial Organs STSE), the MHR ExamView chapters 10 to 12
// and the STEAM HeartRateGraph and BreathingRateGraph data
// sets, were reviewed only to gauge the expected depth and
// range of treatment.
// Guide discipline: cell theory at introduction level; mitosis
// without stages; the six systems holistic (no organ-by-organ
// functions, no labelling of system diagrams); interdependence
// limited to the guide's three pairs; size estimation without
// ratio calculations. The cell figure applies the guide's
// textbook erratum: the wall is labelled outside the membrane.
// CORE residue: SC8.12.1 and SC8.12.3 entries assess microscope
// knowledge, sequence and care decisions; handling itself is
// classroom assessment. SC8.12.4 carries one model-accuracy
// entry; the cooperative construction is the residue, recorded
// here and in the catalogue.

/* ---------- SC8.10.1 Cell theory and characteristics of life ---------- */

E("s8-u4-theory-parts", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Which statement is part of the cell theory?",
    "All cells come from other, pre-existing cells",
    ["All cells are surrounded by cell walls", "All cells have a nucleus", "All living things are made up of two or more cells"],
    "The cell theory states that all living things are made of cells, that the cell is the basic unit of life, and that all cells come from other, pre-existing cells. Cell walls and nuclei are found in some cells, not all.", {}); },
  function () { return mcq("Which statement is part of the cell theory?",
    "All living things are made up of one or more cells",
    ["All cells can be seen without a microscope", "All cells carry out photosynthesis", "All living things are made of exactly the same kind of cell"],
    "The cell theory states that all living things are made of one or more cells, that the cell is the basic unit of life, and that cells come from pre-existing cells. Most cells are microscopic, and only some carry out photosynthesis.", {}); },
  function () { return mcq("Which statement is part of the cell theory?",
    "The cell is the basic unit of life",
    ["The cell is the largest unit of life", "Cells can form from non-living material on their own", "Only animal bodies are made of cells"],
    "The cell theory identifies the cell as the basic unit of life: the smallest unit that carries out life processes. Cells come from other cells, and plant bodies are made of cells too.", {}); }
]), ["Think about what all living things share.", "The theory has three main statements about cells."]);

E("s8-u4-living-chars", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("A sunflower turns its leaves toward the Sun as the Sun moves across the sky. Which characteristic of life is the sunflower showing?",
    "Response to stimuli",
    ["Growth", "Movement of the whole organism", "Reproduction"],
    "The sunflower is responding to a stimulus, the light. Responding to changes in the environment is one of the four characteristics of life, along with growth, movement and reproduction.", {}); },
  function () { return mcq("Over one summer, a puppy gains 6 kg and its bones lengthen. Which characteristic of life is this?",
    "Growth",
    ["Movement", "Reproduction", "Response to stimuli"],
    "Getting larger as cells divide and the body develops is growth, one of the four characteristics of life.", {}); },
  function () { return mcq("A single bacterium splits and becomes two bacteria. Which characteristic of life is this?",
    "Reproduction",
    ["Growth", "Movement", "Response to stimuli"],
    "Producing new individuals of the same kind is reproduction, one of the four characteristics of life. A bacterium reproduces by dividing into two cells.", {}); }
]), ["Recall the four characteristics of life.", "Growth, movement, response to stimuli, reproduction."]);

E("s8-u4-nonliving", 4, ["SC8.10.1"], 1, "var", varset([
  function () { return mcq("Which of these is non-living?",
    "A granite rock",
    ["A mushroom", "A yeast cell", "Seaweed"],
    "A rock does not grow, move on its own, respond to stimuli or reproduce, and it is not made of cells. Mushrooms, yeast and seaweed are living organisms made of cells.", {}); },
  function () { return mcq("A candle flame gets bigger, flickers and seems to move. Why is a flame not alive?",
    "It is not made of cells and does not reproduce or respond the way organisms do",
    ["It is simply too hot, as it flickers at the top of the candle, for anything living to survive in it", "It does not need oxygen from the air around it in order to keep burning on the candle", "It gives off light and heat into the room all around it for as long as it burns"],
    "Flames can grow and move, but they are not made of cells, do not reproduce and do not respond to stimuli as organisms do. Living things show all four characteristics and are made of cells.", {}); }
]), ["Check each option against the characteristics of life.", "Living things are made of cells."]);

/* ---------- SC8.10.2 Plant and animal cells ---------- */

E("s8-u4-differences", 4, ["SC8.10.2"], 1, "var", varset([
  function () { return mcq("Which structure is found in plant cells but not in animal cells?",
    "Chloroplasts",
    ["Cell membrane", "Cytoplasm", "Nucleus"],
    "Plant cells have chloroplasts, where photosynthesis happens. Animal cells do not. Both cell types have a membrane, cytoplasm and a nucleus.", {}); },
  function () { return mcq("Which structure is found in plant cells but not in animal cells?",
    "A cell wall",
    ["Mitochondria", "Vacuoles of any size", "A nucleus"],
    "Plant cells have a cell wall outside the membrane, which animal cells lack. Both have mitochondria and a nucleus, and both have vacuoles, though plant vacuoles are larger.", {}); }
]), ["Recall the three differences between plant and animal cells.", "Chloroplasts, cell walls, vacuole size."]);

E("s8-u4-cell-figure", 4, ["SC8.10.2", "SC8.11.3"], 1, "var", varset([
  function () { var q = mcq("The diagram shows a plant cell. Which callout labels the chloroplast?",
    "E", ["A", "C", "D"],
    "Callout E points to a chloroplast, one of the small green structures where photosynthesis takes place. A is the cell wall, C the nucleus and D the vacuole.", {});
    q.figure = s8CellSVG("plant"); return q; },
  function () { var q = mcq("The diagram shows a plant cell. Which callout labels the large vacuole?",
    "D", ["B", "E", "F"],
    "Callout D points to the large central vacuole, which stores water and other materials. Plant cells have fewer and larger vacuoles than animal cells. B is the cell membrane, E a chloroplast and F a mitochondrion.", {});
    q.figure = s8CellSVG("plant"); return q; }
]), ["Find the small green oval structures.", "Chloroplasts carry out photosynthesis."]);

E("s8-u4-vacuole-compare", 4, ["SC8.10.2"], 2, "var", varset([
  function () { return mcq("How do vacuoles differ between plant and animal cells?",
    "Plant cells have fewer and larger vacuoles; animal cells have smaller ones",
    ["Animal cells have one very large vacuole and plant cells have none", "Only animal cells have vacuoles", "Vacuoles are identical in both cell types"],
    "Both cell types have vacuoles, but plant cells have fewer and larger ones, often one large central vacuole, while animal cell vacuoles are smaller.", {}); },
  function () { return mcq("A student looks at two cells. One has a very large central vacuole taking up much of the cell. The cell is most likely a",
    "plant cell, because plant cells have fewer and larger vacuoles",
    ["animal cell, because animal vacuoles are always the largest structure", "bacterium, because bacteria store everything in one vacuole", "fungus cell, because only fungi have vacuoles"],
    "A single large central vacuole is a plant cell feature: plant cells have fewer and larger vacuoles than animal cells.", {}); }
]), ["Recall the vacuole difference from the guide.", "Fewer and larger in plants."]);

E("s8-u4-regular-shape", 4, ["SC8.10.2"], 1, "var", varset([
  function () { return mcq("Plant cells usually keep a regular, fixed shape. What gives them this shape?",
    "The cell wall",
    ["The cell membrane", "The vacuole", "The chloroplasts"],
    "The rigid cell wall outside the membrane holds the plant cell in a regular shape. Animal cells, with no wall, have more varied shapes.", {}); }
]), ["Which plant-only structure is rigid?", "It sits outside the membrane."]);

/* ---------- SC8.10.3 Cell division ---------- */

E("s8-u4-identical", 4, ["SC8.10.3"], 1, "var", varset([
  function () { return mcq("When a body cell divides by mitosis, the result is",
    "two new cells identical to the original cell",
    ["two cells each with half the original material removed permanently", "one large cell and one cell with no nucleus", "cells of a completely different type"],
    "Mitosis produces new cells identical to the original. Your body uses it to grow and to replace worn out or damaged cells.", {}); }
]), ["Think about what identical means here.", "Growth and repair need matching cells."]);

E("s8-u4-division-count", 4, ["SC8.10.3"], 2, "gen", function () {
  var rounds = pick([2, 3, 4]);
  var cells = Math.pow(2, rounds);
  var dis = s8dis(cells, [cells * 2, rounds * 2, cells + rounds, cells - 2]);
  return mcq("A single cell divides to form two cells, and each of those divides again, and so on. After " + rounds + " rounds of division, how many cells are there?",
    cells + "", dis.map(String),
    "Each round doubles the number of cells: after 1 round there are 2, after 2 rounds 4, doubling each time. After " + rounds + " rounds there are 2 x 2" + (rounds > 2 ? " x 2" : "") + (rounds > 3 ? " x 2" : "") + " = " + cells + " cells.", {});
}, ["Each division doubles the count.", "Multiply by 2 once per round."]);

E("s8-u4-growth-example", 4, ["SC8.10.3"], 2, "var", varset([
  function () { return mcq("You cut your finger. Over the next week the cut heals as new skin covers it. Where did the new skin cells come from?",
    "Existing skin cells divided by mitosis to produce identical new cells",
    ["Ready-made skin cells travelled through the body from the stomach all the way to the cut", "The cut itself produced the new cells out of non-living material in the bandage and the air", "Bone cells from deep in the finger changed themselves into new skin cells at the cut"],
    "Healing is growth and repair by mitosis: skin cells near the cut divide to produce identical new skin cells that cover the wound.", {}); },
  function () { return mcq("Which is an example of cell division serving reproduction rather than growth?",
    "A bacterium dividing into two bacteria",
    ["Skin cells replacing a scrape", "A child's bones lengthening", "Muscle cells increasing after training"],
    "When a bacterium divides, it produces a new organism, so the division is reproduction. The other examples are growth or repair inside one organism.", {}); }
]), ["Growth and repair happen inside one organism.", "A new organism means reproduction."]);

E("s8-u4-cr-cell-division", 4, ["SC8.10.3"], 2, "var", varset([
  function () { return textq("Explain how cell division by mitosis serves two different purposes in living things, one for a many-celled organism and one for a single-celled organism. Give an example of each. (3 marks)",
    ["Mitosis produces identical new cells; in a many-celled organism this allows growth and repair, such as skin cells dividing to heal a cut, while in a single-celled organism such as a bacterium, dividing produces a whole new organism, so it is reproduction."],
    "<b>Model answer:</b> Mitosis is cell division that produces new cells identical to the original cell. In a many-celled organism, mitosis allows growth and repair: skin cells divide to heal a cut, producing more skin cells exactly like the ones that were damaged. In a single-celled organism such as a bacterium, there is no separate body to grow, so when the cell divides into two, it has produced a new organism: division is its reproduction.<br><br><b>Marking points:</b> 1 mark for stating that mitosis produces identical new cells; 1 mark for growth or repair in a many-celled organism with a valid example; 1 mark for division as reproduction in a single-celled organism with a valid example.", {}); }
]), ["Identical cells first, then the two purposes.", "Think skin healing, then a bacterium."]);

/* ---------- SC8.10.4 Levels of organization ---------- */

E("s8-u4-order", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("Which list gives the levels of organization in the correct order, from smallest to largest?",
    "Cells, tissues, organs, organ systems, organisms",
    ["Cells, organs, tissues, organisms, organ systems", "Tissues, cells, organs, organ systems, organisms", "Organisms, organ systems, organs, tissues, cells"],
    "The levels build up: cells group into tissues, tissues into organs, organs into organ systems, and the systems together make up the organism.", {}); }
]), ["Start with the cell.", "Each level is built from the one before."]);

E("s8-u4-example-level", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("A group of similar cells that work together to do the same job is called a",
    "tissue", ["organ", "organ system", "organism"],
    "Similar cells working together form a tissue, the second level of organization. Different tissues combine into organs.", {}); },
  function () { return mcq("The heart is made of muscle tissue, nerve tissue and connective tissue working together. The heart is an example of an",
    "organ", ["organ system", "organism", "cell"],
    "An organ is made of different tissues working together for one main job. The heart works with blood vessels as part of the circulatory system.", {}); }
]), ["Match the definition to the level.", "Similar cells together: one level up from cells."]);

E("s8-u4-analogy", 4, ["SC8.10.4"], 1, "var", varset([
  function () { return mcq("In the building analogy for levels of organization, bricks are cells and walls are tissues. What do the floors of the building represent?",
    "Organ systems",
    ["Organs", "Organisms", "Cells"],
    "In the analogy, bricks (cells) build walls (tissues), walls form rooms (organs), rooms make floors (organ systems), and the whole house is the organism.", {}); }
]), ["Work up the analogy level by level.", "Rooms are organs; the next level up is..."]);

E("s8-u4-cr-levels", 4, ["SC8.10.4"], 2, "var", varset([
  function () { return textq("Name the five levels of organization in a many-celled organism, in order from smallest to largest, and give one body example for the tissue level and one for the organ level. (3 marks)",
    ["The levels are cells, tissues, organs, organ systems and organisms; muscle tissue is a tissue example, and the heart (or stomach, or lung) is an organ example."],
    "<b>Model answer:</b> From smallest to largest, the levels are cells, tissues, organs, organ systems and organisms. A tissue is a group of similar cells doing the same job, such as muscle tissue. An organ is made of different tissues working together, such as the heart.<br><br><b>Marking points:</b> 1 mark for all five levels in the correct order; 1 mark for a valid tissue example; 1 mark for a valid organ example.", {}); }
]), ["Five levels, smallest first.", "Tissue: similar cells. Organ: tissues together."]);

/* ---------- SC8.10.5 Basic needs of cells and organisms ---------- */

E("s8-u4-needs", 4, ["SC8.10.5"], 1, "var", varset([
  function () { return mcq("Cells and whole organisms share the same basic necessities. Which list names them?",
    "Oxygen, nutrients and the removal of wastes",
    ["Sunlight, soil to root in and shelter from the weather", "A bony skeleton, working muscles and a network of nerves", "Seeds, eggs and the young offspring produced each season"],
    "Every cell needs oxygen and nutrients, and needs its wastes removed, exactly as the whole organism does. The body's systems exist to meet those cell needs.", {}); }
]), ["Think about what a single cell must take in and give off.", "The list has three items."]);

E("s8-u4-needs-apply", 4, ["SC8.10.5"], 2, "var", varset([
  function () { return mcq("Why does a muscle cell die if its oxygen supply is cut off for long enough, even though the cell itself is microscopic?",
    "Cells have the same basic necessities as the whole organism, including oxygen",
    ["Muscle cells are too large to survive without lungs inside them", "Oxygen is only needed by organs, so the cell borrows it from the heart", "The cell stops because the brain sends it a signal to shut down"],
    "A single cell needs oxygen, nutrients and waste removal just as the whole organism does. Cut off the oxygen and the cell cannot carry on its life processes.", {}); }
]), ["Apply the shared-necessities idea to one cell.", "What does every cell need?"]);

E("s8-u4-needs-system", 4, ["SC8.10.5", "SC8.10.7"], 3, "var", varset([
  function () { return mcq("A cell deep in your leg muscle needs nutrients that entered your body through a meal. Which pairing of systems gets the nutrients from the meal to that cell?",
    "The digestive system breaks down the food and absorbs the nutrients, and the circulatory system carries them in the blood to the cell",
    ["The respiratory system absorbs the nutrients from the meal and the nervous system carries them in signals to the cell", "The excretory system absorbs the nutrients from the meal and the muscular system squeezes them through the body to the cell", "The digestive system carries the absorbed nutrients itself, through its own tubes, directly to every cell in the leg"],
    "Nutrients pass through the wall of the small intestine into the blood, and the circulatory system transports them to cells throughout the body. The two systems depend on each other to meet the cells' needs.", {}); }
]), ["Two systems share this job.", "Absorption first, then transport."]);

/* ---------- SC8.10.6 Factors affecting systems ---------- */

E("s8-u4-factor-positive", 4, ["SC8.10.6"], 1, "var", varset([
  function () { return mcq("Which lifestyle factor improves the efficiency of the circulatory and respiratory systems?",
    "Regular exercise",
    ["Smoking", "A sedentary lifestyle with little movement", "Skipping meals regularly"],
    "Regular exercise strengthens the heart and improves breathing capacity, so both systems work more efficiently. Smoking and inactivity reduce their efficiency.", {}); }
]), ["Positive effects only in this question.", "Think fitness."]);

E("s8-u4-factor-effect", 4, ["SC8.10.6"], 2, "var", varset([
  function () { return mcq("How does smoking most directly harm the respiratory system?",
    "It damages the lungs and airways, so gas exchange becomes less efficient",
    ["It makes the trachea in the throat grow longer and wider than it should be over time", "It increases the number of alveoli in the lungs, giving more surface for gas exchange", "It strengthens the muscles used in breathing, so the lungs work harder with each breath"],
    "Smoke damages the lungs and airways, reducing the surface and the efficiency of gas exchange, so the respiratory system delivers less oxygen to the blood.", {}); },
  function () { return mcq("A diet consistently high in fat most directly puts strain on which system, and why?",
    "The circulatory system, because fatty deposits narrow blood vessels and make the heart work harder",
    ["The nervous system, because fatty deposits block the signals travelling along the nerves", "The excretory system, because fat in the blood cannot be filtered out by the kidneys at all", "The muscular system, because stored fat replaces healthy muscle tissue completely over time"],
    "Fatty deposits narrow the vessels, raising the heart's workload and reducing the circulatory system's efficiency over time.", {}); }
]), ["Name the system the factor acts on.", "Then say how its efficiency changes."]);

E("s8-u4-sedentary", 4, ["SC8.10.6"], 3, "var", varset([
  function () { return mcq("Two students have similar diets. One is active daily; the other is sedentary. After a year, the sedentary student tires much faster climbing stairs. The best explanation is that",
    "without regular activity, the heart and breathing muscles stay less efficient, so oxygen reaches the muscles more slowly during effort",
    ["the sedentary student's lungs have stopped exchanging gases with the air even while the student is at rest", "Being active permanently enlarges the heart of the active student, and only of that student, over the year", "the sedentary student's blood has lost its ability to carry oxygen from the lungs to the muscles at all"],
    "Exercise keeps the circulatory and respiratory systems efficient. Without it, the heart pumps less effectively and breathing capacity is lower, so during effort the muscles get oxygen more slowly and tire sooner.", {}); }
]), ["Compare the two systems' efficiency.", "Oxygen delivery during effort is the key."]);

E("s8-u4-cr-factors", 4, ["SC8.10.6"], 3, "var", varset([
  function () { return textq("Choose two lifestyle factors from the guide's list (diet, nutrition, exercise, stress, smoking, alcohol, sedentary lifestyle). For each, explain its effect on the function or efficiency of a named body system. (3 marks)",
    ["Regular exercise strengthens the heart so the circulatory system delivers oxygen more efficiently, while smoking damages the lungs and airways so the respiratory system exchanges gases less efficiently (any two guide factors with a named system and a correct efficiency effect are acceptable)."],
    "<b>Model answer:</b> Exercise: regular exercise strengthens the heart muscle, so the circulatory system pumps blood and delivers oxygen to cells more efficiently. Smoking: smoke damages the lungs and airways, so the respiratory system exchanges oxygen and carbon dioxide less efficiently, and the blood carries less oxygen to the body.<br><br><b>Marking points:</b> 1 mark for each factor correctly tied to a named system with a correct effect on its function or efficiency (2 marks), and 1 mark for one effect explained as a change in efficiency (more or less effective delivery, exchange or removal).", {}); }
]), ["Two factors, two systems.", "Say how efficiency changes, not just that it is bad."]);

/* ---------- SC8.10.7 Interdependence of systems ---------- */

E("s8-u4-pair-circ-resp", 4, ["SC8.10.7"], 1, "var", varset([
  function () { return mcq("How do the circulatory and respiratory systems depend on each other?",
    "The lungs take in oxygen and pass it to the blood, and the blood carries it to the cells and brings carbon dioxide back",
    ["The heart is the organ that breathes air in, and the lungs then pump that air around the whole body", "The blood itself makes the oxygen while it is in the lungs and then stores the oxygen in the heart", "The lungs do the job of filtering wastes out of the blood in the place of the kidneys in the body"],
    "The respiratory system exchanges the gases and the circulatory system transports them: oxygen from the lungs to the cells, carbon dioxide from the cells back to the lungs.", {}); }
]), ["One system exchanges, the other transports.", "Follow the oxygen, then the carbon dioxide."]);

E("s8-u4-pair-dig-circ", 4, ["SC8.10.7"], 1, "var", varset([
  function () { return mcq("Where do nutrients from digested food pass into the blood?",
    "Through the wall of the small intestine",
    ["Through the wall of the stomach", "Through the trachea", "Through the skin over the abdomen"],
    "The digestive system breaks food down and nutrients are absorbed through the wall of the small intestine into the blood, which the circulatory system then carries to the cells.", {}); }
]), ["Absorption happens in one named organ.", "It is part of the digestive tract, after the stomach."]);

E("s8-u4-pair-nerv-musc", 4, ["SC8.10.7"], 2, "var", varset([
  function () { return mcq("When you are cold, you shiver. Which two systems are working together in shivering, and how?",
    "The nervous system detects the cold and signals the muscular system to contract rapidly, producing heat",
    ["The digestive system detects the cold and the excretory system produces the heat", "The respiratory system detects the cold and the circulatory system shakes the muscles", "The muscular system detects the cold itself and answers without any signal"],
    "Sense organs and the nervous system detect the temperature change and signal muscles to contract rapidly. Shivering is the nervous and muscular systems depending on each other.", {}); },
  function () { return mcq("On a hot day, your face flushes red. What has happened between systems?",
    "The nervous system signalled tiny muscles in the skin's blood vessels to relax, letting more blood flow near the surface and release heat",
    ["The digestive system sent extra blood up to the vessels of the face, where the blood is stored until the body needs it elsewhere", "The excretory system pushed the sweat it produced into the blood vessels of the skin, which carried the sweat to the face", "The respiratory system pumped fresh air from the lungs directly into the tiny blood vessels in the skin of the face"],
    "The nervous system coordinates the response: muscles in the vessel walls relax under its signals, blood flow near the skin rises, and heat escapes. The nervous, muscular and circulatory systems are interacting.", {}); }
]), ["One system senses and signals; another acts.", "Shivering is muscle work ordered by nerves."]);

E("s8-u4-interdependence-why", 4, ["SC8.10.7"], 3, "var", varset([
  function () { return mcq("During a sprint, a runner's breathing rate and heart rate both rise sharply. Why must both rise together?",
    "Working muscles need much more oxygen and produce more carbon dioxide; the lungs must exchange gases faster while the heart transports them faster, so neither system can meet the need alone",
    ["The heart rate rises first at the start of the sprint, and the pressure it builds up in the chest forces the lungs to follow along behind it at the same rate", "Breathing rate rises during a sprint mainly in order to cool the runner's blood down, and the heart rate rises only to move that cooled blood around the body to the skin", "Both rates are controlled by the runner's body to rise by exactly the same fixed amount, beat for beat, in every situation that a runner meets on the track"],
    "The systems are interdependent: the respiratory system can only load oxygen as fast as the blood carries it away, and the heart can only deliver what the lungs load. Sprinting raises the cells' demand, so both must increase together.", {}); }
]), ["Neither system can do the whole job alone.", "Demand at the cells drives both."]);

E("s8-u4-cr-interdependence", 4, ["SC8.10.7"], 3, "var", varset([
  function () { return textq("Choose one pair of body systems from this unit (circulatory and respiratory, digestive and circulatory, or nervous and muscular). Explain how the two systems depend on each other, using a specific example from the body. (3 marks)",
    ["The circulatory and respiratory systems depend on each other: the lungs exchange gases with the blood, taking in oxygen and removing carbon dioxide, and the heart and vessels transport those gases between the lungs and the cells, so neither system can supply the cells on its own (the digestive/circulatory or nervous/muscular pair explained with its guide example is equally acceptable)."],
    "<b>Model answer:</b> The respiratory system brings air into the lungs, where oxygen passes into the blood and carbon dioxide passes out. On its own, that oxygen would stay in the lungs. The circulatory system completes the job: the heart pumps the oxygen-rich blood to every cell and returns carbon dioxide to the lungs to be breathed out. Each system depends on the other; if breathing stopped, the blood would have no oxygen to carry, and if the heart stopped, the oxygen in the lungs would never reach the cells.<br><br><b>Marking points:</b> 1 mark for naming a valid pair from the unit; 1 mark for explaining what each system contributes; 1 mark for a specific body example showing the dependence.", {}); }
]), ["Pick one of the three guide pairs.", "Say what each system contributes."]);

E("s8-u4-cr-living", 4, ["SC8.10.1"], 2, "var", varset([
  function () { return textq("A student argues that a seed is not alive because it does not move. Use the characteristics of life and the cell theory to explain why a seed is a living thing. (3 marks)",
    ["A seed is made of cells, and movement is only one of the four characteristics of life (growth, movement, response to stimuli and reproduction); a seed grows into a plant, responds to conditions such as water and warmth by germinating, and was produced by reproduction, so it is living even while dormant."],
    "<b>Model answer:</b> A seed is made of cells, and the cell theory states that all living things are made of cells. Movement is only one of the four characteristics of life. A seed shows the others: it grows into a new plant, it responds to stimuli such as water and warmth by germinating, and it exists because of reproduction. An organism does not need to show all four characteristics at every moment to be alive.<br><br><b>Marking points:</b> 1 mark for noting the seed is made of cells; 1 mark for naming characteristics of life beyond movement; 1 mark for applying at least one of them to the seed (growth on germination, or response to water and warmth).", {}); }
]), ["Movement is only one of four characteristics.", "What else does a seed do?"]);

/* ---------- SC8.11.1 Early ideas about living things ---------- */

E("s8-u4-early-modern", 4, ["SC8.11.1"], 2, "var", varset([
  function () { return mcq("Ancient peoples explained living things using ideas about air, water and fire. How does the modern cell theory differ most from those early ideas?",
    "It is built on observations made with microscopes, which showed that living things are made of cells",
    ["It rejects every observation made of living things and relies only on tradition handed down over the years", "It explains all living things using a set of four elements, instead of the three the ancient peoples used", "It was fully developed long before any tools for observing very small things had been invented by anyone"],
    "Early explanations were guesses about the world without ways to observe the very small. The cell theory came from systematic observation once microscopes let scientists see that every living thing is made of cells.", {}); }
]), ["What tool changed what could be observed?", "The microscope is the turning point."]);

E("s8-u4-dynamic", 4, ["SC8.11.1", "SC8.11.2"], 3, "var", varset([
  function () { return mcq("Early scientists could not agree on whether tiny organisms seen through early microscopes were really alive. The disagreement was settled mainly because",
    "improved microscopes gave clearer observations, showing the organisms were made of cells with the characteristics of life",
    ["the scientists of the time settled the disagreement by voting on the question at a meeting", "the tiny organisms themselves grew larger over time until everyone could agree that they were alive", "the early scientists simply stopped studying the question and moved on to other problems instead"],
    "Science is dynamic: as tools improved, observations became clearer and theories were revised. Better lenses showed cell structures and life processes, settling what the organisms were.", {}); }
]), ["What changed: the tools or the organisms?", "Better observations revise theories."]);

/* ---------- SC8.11.2 The microscope as a developing technology ---------- */

E("s8-u4-micro-development", 4, ["SC8.11.2"], 1, "var", varset([
  function () { return mcq("Leeuwenhoek's microscope used a single small lens, yet he was the first to observe bacteria. Later microscopes, up to the scanning electron microscope, revealed far more. What pattern does this history show?",
    "Optical technology developed through steady improvements, and each improvement let scientists observe more and revise their ideas",
    ["Each new and better microscope that was built made all of the previous discoveries with older ones worthless", "Microscopes were perfected all at once, in a single step, by the first person who built one", "Better microscopes brought scientific disagreement about cells to a complete end, once and for all"],
    "Microscope development was a long process of trial and improvement in lenses and design. Each advance extended what could be observed, and cell science advanced with it.", {}); }
]), ["Think about the sequence of tools.", "Better tools, better observations, revised ideas."]);

E("s8-u4-micro-parts", 4, ["SC8.11.2", "SC8.12.1"], 1, "var", varset([
  function () { var q = mcq("On the microscope diagram, which callout labels the objective lens?",
    "B", ["A", "C", "F"],
    "Callout B is the objective lens, held by the revolving nosepiece close to the specimen. A is the eyepiece, C the stage and F the light source.", {});
    q.figure = s8MicroscopeSVG(); return q; },
  function () { var q = mcq("On the microscope diagram, which callout labels the stage?",
    "C", ["B", "D", "G"],
    "Callout C is the stage, the flat platform that holds the slide. B is the objective lens, D the coarse adjustment knob and G the arm.", {});
    q.figure = s8MicroscopeSVG(); return q; }
]), ["The objective sits just above the slide.", "The stage is the platform holding the slide."]);

/* ---------- SC8.11.3 Organelles, using proper terms ---------- */

E("s8-u4-organelle-figure", 4, ["SC8.11.3"], 2, "var", varset([
  function () { var q = mcq("The diagram shows an animal cell. Which callout labels the nucleus?",
    "B", ["A", "D", "E"],
    "Callout B is the nucleus, the structure that contains the cell's genetic material and controls the cell's activities. A is the cell membrane, D a mitochondrion and E a vacuole.", {});
    q.figure = s8CellSVG("animal"); return q; },
  function () { var q = mcq("The diagram shows an animal cell. Which callout labels the cell membrane?",
    "A", ["B", "C", "E"],
    "Callout A is the cell membrane, the boundary that controls what enters and leaves the cell. An animal cell has no cell wall outside it. B is the nucleus, C the cytoplasm and E a vacuole.", {});
    q.figure = s8CellSVG("animal"); return q; }
]), ["The nucleus is the large round control centre.", "The membrane is the outer boundary."]);

E("s8-u4-organelle-function", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("What is the role of the mitochondria in a cell?",
    "They release energy from food for the cell to use",
    ["They make food using sunlight", "They store the cell's genetic material", "They hold the cell's shape rigidly"],
    "Mitochondria release energy from food so the cell can carry out its activities. Making food is the chloroplast's role, and genetic material is held in the nucleus.", {}); },
  function () { return mcq("What is the role of the chloroplast in a plant cell?",
    "It uses sunlight to make food for the cell",
    ["It releases energy from food", "It controls what enters and leaves the cell", "It stores water and wastes"],
    "Chloroplasts carry out photosynthesis, using sunlight to make food. Mitochondria release energy from that food, and vacuoles store water and other materials.", {}); }
]), ["Match each organelle to its one job.", "Mitochondria: energy release. Chloroplast: food making."]);

E("s8-u4-organelle-match", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("Which organelle controls the movement of food, wastes and other substances into and out of the cell?",
    "The cell membrane",
    ["The cell wall", "The cytoplasm", "The vacuole"],
    "The cell membrane is the gatekeeper: it controls what enters and leaves. The cell wall gives support and shape, and the cytoplasm is the jelly-like substance where the organelles sit.", {}); },
  function () { return mcq("Which organelle contains the cell's genetic material and controls the cell's activities?",
    "The nucleus",
    ["The mitochondria", "The chloroplast", "The cell wall"],
    "The nucleus holds the genetic material and acts as the control centre of the cell.", {}); }
]), ["Gatekeeper or control centre?", "Membrane controls movement; nucleus controls the cell."]);

E("s8-u4-organelle-plant", 4, ["SC8.11.3"], 1, "var", varset([
  function () { return mcq("A student must label a plant cell diagram using proper terms. Which set of labels belongs only on the plant cell, not on an animal cell diagram?",
    "Cell wall and chloroplast",
    ["Cell membrane and nucleus", "Cytoplasm and mitochondria", "Nucleus and vacuole"],
    "Cell walls and chloroplasts are plant-only structures at this level. Membranes, nuclei, cytoplasm, mitochondria and vacuoles appear in both cell types.", {}); }
]), ["Use the three plant/animal differences.", "Two of them are structures."]);

E("s8-u4-organelle-term", 4, ["SC8.11.3"], 2, "var", varset([
  function () { return mcq("Which comparison of plant and animal cells uses the proper terms correctly?",
    "Both have a cell membrane, but only the plant cell has a cell wall outside it, and the plant cell's vacuole is larger",
    ["Both kinds of cell have a cell wall around them, but only the animal cell has a cell membrane inside it", "The plant cell's membrane lies outside its cell wall, unlike the arrangement found in the animal cell", "Animal cells carry chloroplasts scattered in their cytoplasm, while plant cells have no chloroplasts at all"],
    "Every cell has a membrane; plant cells add a wall outside the membrane, and their vacuoles are fewer and larger. (Note: the textbook's plant cell diagram on page 405 prints two labels swapped; A is the cell wall and C is the cell membrane.)", {}); }
]), ["Wall outside, membrane inside it.", "Check each claim against the differences."]);

E("s8-u4-cr-organelles", 4, ["SC8.11.3"], 2, "var", varset([
  function () { return textq("Using proper terms, explain the role of each of these cell structures: cell membrane, nucleus and mitochondria. Then name one structure found in plant cells but not animal cells and state its role. (3 marks)",
    ["The cell membrane controls what enters and leaves the cell; the nucleus contains the genetic material and controls the cell's activities; the mitochondria release energy from food; the cell wall (or chloroplast) is plant-only, giving support and shape (or carrying out photosynthesis)."],
    "<b>Model answer:</b> The cell membrane controls the movement of substances into and out of the cell. The nucleus contains the genetic material and controls the cell's activities. The mitochondria release energy from food for the cell to use. The cell wall is found in plant cells only: it supports the cell and gives it a regular shape. (The chloroplast, which makes food by photosynthesis, is an equally valid plant-only structure.)<br><br><b>Marking points:</b> 1 mark for two of the three named roles correct; 1 mark for all three correct; 1 mark for a plant-only structure with its correct role.", {}); }
]), ["Three roles, then one plant-only structure.", "Membrane, nucleus, mitochondria."]);

/* ---------- SC8.11.4 and SC8.11.5 Technologies from scientific knowledge ---------- */

E("s8-u4-tech-examples", 4, ["SC8.11.4"], 1, "var", varset([
  function () { return mcq("Which technology assists or replaces the work of an unhealthy organ?",
    "A dialysis machine, which filters the blood when the kidneys fail",
    ["A stethoscope, which listens to the sounds of the heart beating inside the chest", "An X-ray machine, which takes images of the bones inside a patient's body at a hospital", "A thermometer, which measures the temperature of the body or of a liquid in a lab"],
    "Dialysis does the kidney's job of cleaning the blood when the kidneys cannot. The other devices observe or measure; they do not assist or replace an organ's work.", {}); },
  function () { return mcq("An insulin pump is worn by a person with diabetes. Which organ's work is it assisting?",
    "The pancreas, by regulating insulin levels in the blood",
    ["The liver, by storing extra glucose from food", "The kidney, by filtering insulin out of the blood", "The heart, by pumping insulin around the body in the blood"],
    "The insulin pump regulates insulin in the blood, assisting the pancreas, the organ that normally produces insulin.", {}); }
]), ["Does the device do the organ's job?", "Dialysis filters blood, like a kidney."]);

E("s8-u4-tech-match", 4, ["SC8.11.4"], 1, "var", varset([
  function () { return mcq("A pacemaker is implanted in a patient's chest. What does it do?",
    "It sends electrical impulses that keep the heart beating in a steady rhythm",
    ["It filters all of the wastes out of the patient's blood as the blood passes through the chest", "It pumps the patient's blood around the body in place of the heart, doing the heart's whole job", "It produces insulin inside the patient's body and releases it on a regular daily schedule"],
    "A pacemaker replaces the heart's faulty electrical signals with steady impulses, so the heart keeps a regular beat. Filtering blood is dialysis; regulating insulin is an insulin pump.", {}); },
  function () { return mcq("A cochlear implant assists which sense organ, and how?",
    "The ear, by converting sound into electrical signals the nerves can carry",
    ["The eye, by focusing the light that enters it onto the retina at the back of the eyeball", "The skin, by sensing changes in pressure against its surface and sending signals to the brain", "The tongue, by detecting the chemicals dissolved in the food and drink that pass over it"],
    "Cochlear implants pick up sound and turn it into electrical impulses for the auditory nerve, assisting a damaged inner ear.", {}); }
]), ["Match the device to the organ it assists.", "Pacemaker: heart rhythm. Cochlear: hearing."]);

E("s8-u4-cr-artificial", 4, ["SC8.11.4"], 3, "var", varset([
  function () { return textq("Choose one technology that assists or replaces an unhealthy organ or system (for example a dialysis machine, an insulin pump, an artificial heart valve or a pacemaker). Explain the science of the organ it assists: what the organ does, what goes wrong, and how the technology applies scientific knowledge to do or support that job. (4 marks)",
    ["A dialysis machine assists the kidneys: the kidneys filter wastes such as urea from the blood and balance its water and salts; when kidneys fail, wastes build up and poison the body; dialysis applies knowledge of filtration, passing the blood across a membrane that removes wastes and restores balance, several times a week (any guide technology explained at this depth is acceptable)."],
    "<b>Model answer:</b> The kidneys clean the blood: their nephrons remove wastes such as urea, keep the right balance of water and salts, and help hold blood pH steady. When both kidneys fail, wastes accumulate and the person becomes seriously ill. A dialysis machine applies what science knows about filtration: blood is passed across a membrane beside a special fluid, wastes diffuse out of the blood into the fluid, and the cleaned blood returns to the body. It does the kidney's filtering job from outside the body, usually for several hours at a time, several times a week.<br><br><b>Marking points:</b> 1 mark for naming the technology and the organ; 1 mark for what the healthy organ does; 1 mark for what goes wrong when it fails; 1 mark for how the technology applies scientific knowledge to do or support the job.", {}); }
]), ["Organ first: what does it do?", "Then the failure, then the technology."]);

E("s8-u4-knowledge-tech", 4, ["SC8.11.5"], 2, "var", varset([
  function () { return mcq("Which is the clearest example of scientific knowledge resulting in a technology?",
    "Understanding that the heart is coordinated by electrical signals led to the pacemaker",
    ["Building a hospital led to the discovery of the heart", "Using a stethoscope led to the discovery of blood", "Inventing the thermometer led to the discovery of body temperature as a concept"],
    "Knowledge came first: once scientists understood the heart's electrical control, engineers could build a device that supplies the signal. In the other options the direction of the claim is reversed or wrong.", {}); }
]), ["Which came first, knowledge or device?", "Understanding signals, then the pacemaker."]);

E("s8-u4-knowledge-tech2", 4, ["SC8.11.5"], 3, "var", varset([
  function () { return mcq("Artificial heart valves are made of materials the body tolerates and shaped to open and close with blood flow. Which chain best explains how this technology came to exist?",
    "Knowledge of how heart valves work and of suitable materials was applied to design a replacement part",
    ["The working valves were discovered growing naturally inside the body and were copied exactly as found", "Surgeons needed the replacement part, so the part simply appeared for them without any research behind it", "Knowledge of red blood cells alone, and nothing else, was enough for engineers to produce the valve"],
    "Technologies grow out of combined scientific knowledge: valve function, blood flow and material behaviour all had to be understood before a working replacement could be designed.", {}); }
]), ["Several kinds of knowledge combine.", "Function plus materials plus flow."]);

/* ---------- SC8.11.6 Community needs ---------- */

E("s8-u4-community-need", 4, ["SC8.11.6"], 2, "var", varset([
  function () { return mcq("A community has many residents whose kidneys have failed, but the nearest dialysis unit is hours away. A dialysis unit is built in the local hospital. This is an example of",
    "a community's needs leading to a development in applied science and technology",
    ["a new technology creating a need in the community that had not existed there before it arrived", "scientific knowledge from outside experts replacing the input of the community in every decision", "a community choosing to avoid the use of modern medical technology in its local hospital altogether"],
    "The need existed first: patients needed regular dialysis to survive. The community's need drove the development and placement of the technology.", {}); }
]), ["Which came first, the need or the technology?", "Patients needed treatment close to home."]);

E("s8-u4-cr-community", 4, ["SC8.11.6"], 2, "var", varset([
  function () { return textq("Describe one example of a community need that led to a development in science or technology connected to body systems. Explain the need, the development it produced, and how the development answers the need. (3 marks)",
    ["When many people in a community develop diabetes, the need for steady insulin control without constant injections led to the development of the insulin pump, a small device that delivers insulin on a schedule and keeps blood insulin levels steadier (any clear need-to-development example tied to body systems is acceptable)."],
    "<b>Model answer:</b> Many people in every community live with diabetes and must keep their blood sugar controlled all day. Injections several times a day are hard to keep steady, and poor control damages organs over time. That community need drove the development of the insulin pump: a small wearable device that delivers insulin continuously on a programmed schedule, keeping levels steadier than injections alone and freeing patients from constant needle routines.<br><br><b>Marking points:</b> 1 mark for a real community need tied to body systems; 1 mark for the development it produced; 1 mark for explaining how the development answers the need.", {}); }
]), ["Need, development, fit.", "Diabetes and the insulin pump is one model."]);

/* ---------- SC8.11.7, SC8.11.8, SC8.11.10 Decisions and courses of action ---------- */

E("s8-u4-decision-sr", 4, ["SC8.11.7"], 2, "var", varset([
  function () { return mcq("A town is deciding whether to fund a new dialysis unit. Which consideration is an environmental one?",
    "The unit produces medical waste that must be disposed of safely",
    ["Patients would no longer travel hours for treatment", "Nurses would be hired locally", "Families could visit patients more easily"],
    "Medical waste disposal affects the environment. Travel time, jobs and visiting are social considerations. An informed decision weighs both kinds.", {}); }
]), ["Environmental means effects on the surroundings.", "Waste, water, energy: environmental."]);

E("s8-u4-cr-decision", 4, ["SC8.11.7"], 3, "var", varset([
  function () { return textq("A health authority can fund either more dialysis machines in one city hospital or a smaller dialysis unit in a rural community whose patients now travel three hours each way. Make an informed decision: state your choice, give one social advantage and one social disadvantage of it, and one environmental consideration. (3 marks)",
    ["Fund the rural unit: socially, patients keep their treatment near home and family, though the smaller unit serves fewer patients per machine than the city site; environmentally, far less travel fuel is burned, though the new unit adds medical waste to dispose of locally (either choice, defended with a genuine social advantage, disadvantage and environmental consideration, is acceptable)."],
    "<b>Model answer:</b> I would fund the rural unit. Social advantage: patients receive life-sustaining treatment near home, keeping families together and avoiding exhausting travel while ill. Social disadvantage: a small unit serves fewer patients per machine, so the city wait list grows more slowly relieved. Environmental consideration: eliminating three-hour trips for many patients every week cuts fuel use and emissions greatly, though the new unit's medical waste must be handled safely.<br><br><b>Marking points:</b> 1 mark for a clear decision; 1 mark for a genuine social advantage and disadvantage of the chosen option; 1 mark for a genuine environmental consideration.", {}); }
]), ["Decide, then weigh both sides.", "Social: people. Environmental: surroundings."]);

E("s8-u4-propose-sr", 4, ["SC8.11.8"], 2, "var", varset([
  function () { return mcq("A school is proposing a course of action on energy drinks being sold to students under 18. Which proposal best takes human and environmental needs into account?",
    "Restrict sales to under-18s near schools, with the health evidence explained to students and retailers",
    ["Ban every kind of drink in the school building entirely, including the water students carry with them", "Ignore the issue completely, because the sale of the drinks raises money that the school can spend", "Let each student in the school decide for themselves, with no information about the drinks provided to anyone"],
    "A sound proposal acts on the health evidence (human needs) in a proportionate way and explains itself. Blanket bans on everything and doing nothing both fail the test.", {}); }
]), ["Proportionate, evidence-based, explained.", "Human needs include students' health."]);

E("s8-u4-cr-propose", 4, ["SC8.11.8"], 3, "var", varset([
  function () { return textq("Adults smoking in cars with children present is a social issue connected to the respiratory system. Propose a course of action on this issue. Your proposal must state the action, the human need it protects, and one objection people might raise with your answer to it. (3 marks)",
    ["Propose that smoking in a vehicle with children be prohibited and enforced with fines: it protects children's developing lungs from second-hand smoke, which damages airways and worsens asthma; the objection that it interferes with adults' freedom in their own car is answered by the child's inability to choose or leave (any workable action with a stated human need and a fairly answered objection is acceptable)."],
    "<b>Model answer:</b> Action: prohibit smoking in any vehicle carrying children, enforced the way seatbelt laws are. Human need protected: children breathe second-hand smoke in a small closed space, and smoke damages airways and the lungs' ability to exchange gases, worsening asthma and infections; children cannot choose to leave. Objection: adults may say their car is private. Answer: the law already limits private behaviour in cars (seatbelts, car seats) when children's health is at stake, and the child's need for clean air outweighs the inconvenience.<br><br><b>Marking points:</b> 1 mark for a clear, workable action; 1 mark for the human or environmental need it protects, tied to body systems; 1 mark for a fair objection with a reasoned answer.", {}); }
]), ["Action, need, objection, answer.", "Tie the need to the respiratory system."]);

E("s8-u4-personal-decision", 4, ["SC8.11.10"], 2, "var", varset([
  function () { return mcq("A young athlete is offered steroids to build muscle faster. Which reasoning is an informed personal decision based on body systems?",
    "Refuse: steroids can damage the heart, liver and hormone systems, trading long-term health for short-term muscle gain",
    ["Accept them: the size of an athlete's muscles is the only measure that matters of a healthy muscular system", "Refuse the offer only because the steroids cost more money than the athlete can afford to spend", "Accept the offer if a friend at the gym has used the same steroids without any obvious harm showing yet"],
    "An informed decision weighs the science: steroids affect several systems (circulatory, excretory organs such as the liver, and hormonal control), so the personal advantage is outweighed by real disadvantages.", {}); }
]), ["Weigh advantage against system damage.", "Short term gain, long term cost."]);

E("s8-u4-cr-decision-personal", 4, ["SC8.11.10"], 3, "var", varset([
  function () { return textq("Make an informed decision about this application of science and technology: a fitness company markets a machine that promises strong muscles with no exercise, using electrical stimulation while the user sits. State your decision about using it, one personal advantage claimed or real, one personal or social disadvantage, and the body-systems science behind your decision. (3 marks)",
    ["I would not rely on the machine: its claimed advantage is convenience, but electrical stimulation does not train the heart and lungs the way real activity does, and unused fitness still declines; socially, marketing such devices can mislead people away from effective exercise, and the muscular system works with the circulatory and respiratory systems, which the machine leaves untrained (either decision defended with a real advantage, a real disadvantage and correct systems science is acceptable)."],
    "<b>Model answer:</b> I would not use the machine as a substitute for exercise. Its real advantage is convenience, and stimulation can contract muscles. But fitness is not one system: real exercise trains the muscular system together with the circulatory and respiratory systems, strengthening the heart and improving gas exchange. A seated device leaves those systems untrained, so overall health gains are small, and socially such marketing can mislead people into skipping activity that works.<br><br><b>Marking points:</b> 1 mark for a clear decision; 1 mark for a genuine personal advantage and a personal or social disadvantage; 1 mark for correct body-systems science supporting the decision.", {}); }
]), ["Decide, then support with systems science.", "Muscles do not work alone."]);

/* ---------- SC8.11.9 Careers ---------- */

E("s8-u4-careers", 4, ["SC8.11.9"], 1, "var", varset([
  function () { return mcq("Which career is directly associated with the health of body systems?",
    "Physiotherapist",
    ["Accountant", "Electrician", "Journalist"],
    "Physiotherapists help patients recover movement and strength after injury or illness, working directly with the muscular and nervous systems. Lab and x-ray technicians, nutritionists, doctors and public health nurses are other examples from the guide.", {}); }
]), ["Which job treats body systems daily?", "Think rehabilitation after injury."]);

E("s8-u4-careers-match", 4, ["SC8.11.9"], 1, "var", varset([
  function () { return mcq("A public health nurse's work connects to body systems mainly by",
    "promoting healthy habits and preventing illness in the whole community",
    ["operating on damaged organs inside patients in the operating room of a hospital", "designing artificial organs in a laboratory for patients whose own organs have failed", "fitting artificial limbs to patients who have lost an arm or a leg in an accident"],
    "Public health nurses work at community level: vaccination, screening and health education that keep body systems healthy. The other roles belong to surgeons, biomedical engineers and prosthetists.", {}); },
  function () { return mcq("Which career works with the digestive system by advising patients on diet?",
    "Nutritionist",
    ["X-ray technician", "Coach", "Lab technician"],
    "Nutritionists advise on diet and nutrition, which directly affects the digestive system and, through it, every other system.", {}); }
]), ["Match the career to its systems role.", "Prevention at community level: public health nurse."]);

/* ---------- SC8.12.1 and SC8.12.3 Microscope use and care (CORE) ---------- */

E("s8-u4-focus-sequence", 4, ["SC8.12.1"], 1, "var", varset([
  function () { return mcq("Which sequence correctly brings a slide into focus?",
    "Start on low power, focus with the coarse adjustment, then switch to medium power and finish with the fine adjustment",
    ["Start the viewing on the highest power objective and focus the image using the coarse adjustment knob", "Focus with the fine adjustment knob first, and only afterwards turn to the coarse adjustment knob", "Switch the objective to medium power before the prepared slide is placed on the stage of the microscope"],
    "Correct technique starts on low power with the coarse adjustment knob, then moves to medium power and sharpens with the fine adjustment. High power use is not required at this level, and the coarse knob is for low and medium power focusing.", {}); }
]), ["Low power first.", "Coarse, then fine."]);

E("s8-u4-parts-action", 4, ["SC8.12.1"], 1, "var", varset([
  function () { return mcq("The image under the microscope is too dim to see the cells clearly. Which part should be adjusted?",
    "The iris diaphragm, which controls the amount of light reaching the specimen",
    ["The coarse adjustment knob, which opens and closes to control the light reaching the specimen", "The revolving nosepiece, which is adjusted to control the amount of light reaching the specimen", "The base, which is turned to control the amount of light that reaches the specimen on the stage"],
    "The iris diaphragm opens and closes to control light. The coarse knob changes focus, the nosepiece changes objectives, and the base is only support.", {}); },
  function () { return mcq("What does the revolving nosepiece do?",
    "It rotates to bring a different objective lens into position",
    ["It holds the prepared slide firmly in place on the stage while the slide is viewed", "It focuses the image sharply when the microscope is used at its high power setting", "It adjusts the brightness of the light source that shines up through the specimen"],
    "The nosepiece holds the objective lenses and rotates to switch between them. Slides sit on the stage, focusing is done with the adjustment knobs, and the diaphragm controls light.", {}); }
]), ["Dim image means a light problem.", "Diaphragm for light; nosepiece for lenses."]);

E("s8-u4-cr-microscope", 4, ["SC8.12.1", "SC8.12.3"], 2, "var", varset([
  function () { return textq("A new student is about to use the compound microscope for the first time. Describe how to carry and set up the microscope, and the focusing steps to obtain a clear image of cells on low and then medium power. (3 marks)",
    ["Carry the microscope with one hand under the base and one gripping the arm; place it away from the table edge, plug in and switch on the light; place the slide on the stage, start with the low power objective, focus with the coarse adjustment knob, then rotate the nosepiece to medium power and sharpen the image with the fine adjustment knob only."],
    "<b>Model answer:</b> Carry the microscope with two hands, one under the base and one on the arm, and set it down away from the edge of the table. Switch on the light and place the slide on the stage. Always begin with the low power objective in place: look through the eyepiece and turn the coarse adjustment knob until the cells are in focus. Then rotate the nosepiece to the medium power objective and use only the fine adjustment knob to sharpen the image. When finished, return to low power, remove the slide, and store the microscope covered.<br><br><b>Marking points:</b> 1 mark for safe carrying and setup (two hands, base and arm); 1 mark for starting on low power and focusing with the coarse adjustment; 1 mark for switching to medium power and finishing with the fine adjustment only.", {}); }
]), ["Carry, set up, focus low, then medium.", "Coarse on low power; fine to finish."]);

E("s8-u4-care", 4, ["SC8.12.3"], 1, "var", varset([
  function () { return mcq("Which practice shows proper care of the compound microscope?",
    "Carrying it with one hand under the base and the other on the arm, and storing it covered on low power",
    ["Carrying it around the laboratory by its tube, held in one hand while walking", "Storing it away in the cupboard with a prepared slide still left sitting on its stage", "Cleaning the lenses of its objectives with an ordinary paper towel from the bench"],
    "Two-handed carrying (base and arm), removing slides, returning to low power and covering the microscope for storage are the care standards. Lenses are cleaned only with lens paper.", {}); }
]), ["Two hands, covered, low power, no slide.", "Lens paper only for lenses."]);

E("s8-u4-care-error", 4, ["SC8.12.3"], 2, "var", varset([
  function () { return mcq("A student finishes a lab and puts the microscope away with the medium power objective in place, a slide still on the stage, and no cover. How many care errors is that?",
    "Three: it should be stored on low power, with no slide, and covered",
    ["None: that is the correct storage state", "One: only the missing cover matters", "Two: the slide and the cover, but the objective does not matter"],
    "Storage standard: low power objective in place, slide removed, microscope covered. The described state breaks all three parts of the standard.", {}); }
]), ["Compare each detail with the storage standard.", "Low power, no slide, covered."]);

/* ---------- SC8.12.2 Estimating cell size ---------- */

E("s8-u4-estimate-gen", 4, ["SC8.12.2"], 2, "gen", function () {
  var cases = [[2, 5], [3, 6], [1.6, 4], [2.4, 8], [4, 10], [2.5, 5], [1.8, 6], [3.2, 8]];
  var c = pick(cases), F = c[0], N = c[1], est = Math.round(F / N * 100) / 100;
  var dis = s8dis(est, [est * 2, F, Math.round((est + 0.3) * 100) / 100, Math.round(est / 2 * 100) / 100]);
  return mcq("Under the microscope, the field of view is " + F + " mm across. About " + N + " cells of a specimen fit side by side across the field. Estimate the width of one cell.",
    est + " mm", dis.map(function (v) { return v + " mm"; }),
    "Divide the field of view by the number of cells that fit across it: " + F + " mm / " + N + " = " + est + " mm. This is an estimate, the method the core lab uses, not an exact measurement.", {});
}, ["Share the field among the cells.", "Field of view divided by cells across."]);

E("s8-u4-estimate-compare", 4, ["SC8.12.2"], 1, "var", varset([
  function () { return mcq("A student switches from the low power objective to the medium power objective. What happens to the field of view?",
    "It gets smaller, so fewer cells are visible but each appears larger",
    ["It gets larger as the power rises, so more of the cells on the slide become visible", "It stays exactly the same size as it was under the low power objective before", "It disappears from view entirely until the coarse adjustment knob is turned again"],
    "Higher magnification narrows the field of view: you see a smaller area in greater detail. That is why size estimates must use the field of view for the objective in use.", {}); }
]), ["More magnification, less area.", "The field shrinks as power rises."]);

E("s8-u4-estimate-scenario", 4, ["SC8.12.2"], 2, "var", varset([
  function () { return mcq("The field of view on medium power is 1.2 mm. A student sees about 4 onion cells side by side across the field. The best estimate for one cell's width is",
    "about 0.3 mm",
    ["about 4.8 mm", "about 1.2 mm", "about 0.03 mm"],
    "Share the field among the cells: 1.2 mm / 4 = 0.3 mm per cell. Estimates like this are approximate by design; no ratio calculation beyond the sharing is expected.", {}); }
]), ["Divide the field by the count.", "1.2 shared by 4 cells."]);

/* ---------- SC8.12.4 and SC8.12.5 Cell models ---------- */

E("s8-u4-model-accuracy", 4, ["SC8.12.4"], 2, "var", varset([
  function () { return mcq("A group's model of an animal cell is a flat paper disc with chloroplasts drawn on it. Which two changes would most improve the model's accuracy?",
    "Make the model three-dimensional, and remove the chloroplasts",
    ["Colour the disc green, and add a cell wall", "Label the disc with the cell's name, and make it larger", "Add more chloroplasts, and flatten it further"],
    "Cells are three-dimensional, which is why the guide uses 3-D models, and animal cells have no chloroplasts. A cell wall would also be wrong for an animal cell.", {}); }
]), ["Cells are not flat.", "Animal cells lack chloroplasts and walls."]);

E("s8-u4-eval-process", 4, ["SC8.12.5"], 3, "var", varset([
  function () { return mcq("A class builds cell models, then evaluates each group's process. Which evaluation is the fairest and most useful?",
    "Judge against a checklist the class agreed on before building (accuracy of parts, teamwork, use of time), with evidence noted for each point",
    ["Give the highest mark in the class to whichever model looks the best finished, regardless of the process its group used", "Let each group in the class mark its own work by itself, with no criteria given to anyone beforehand", "Rank all of the groups in the class from first place to last place, with no explanation given for the order"],
    "Evaluating a process needs criteria set in advance and evidence against them. Judging only the final product ignores the process being evaluated, and criteria-free marking cannot be fair or useful.", {}); }
]), ["Criteria first, evidence second.", "Process, not just product."]);

E("s8-u4-cr-model-eval", 4, ["SC8.12.5"], 2, "var", varset([
  function () { return textq("Your group built a three-dimensional cell model. Evaluate your group's process: name one thing the group did well, one weakness in how you worked, and one specific change you would make next time. Judge your process against criteria, not just the finished model. (3 marks)",
    ["Our group divided the organelles among members and checked each part against the textbook diagram before assembling, which kept the model accurate; our weakness was leaving the assembly to the final class, so two parts were rushed; next time we would set an earlier deadline for parts and use the class checklist to review progress halfway through (any honest evaluation with a strength, a weakness and a concrete improvement earns the marks)."],
    "<b>Model answer:</b> Strength: we split the organelles among the four of us and each person checked their part against the diagram before we assembled, so the finished model was accurate. Weakness: we spent too long choosing materials and left assembly to the last class, so the vacuole was rushed and undersized. Change: next time we would set a deadline for all parts one class earlier and use the class checklist at the halfway point to catch problems while there is time to fix them.<br><br><b>Marking points:</b> 1 mark for a genuine strength of the group's process; 1 mark for a genuine weakness in the process (not just the product); 1 mark for a specific, workable improvement.", {}); }
]), ["Strength, weakness, improvement.", "Judge the process, not the product."]);

/* ---------- SC8.12.6 to SC8.12.9 The activity experiment ---------- */

E("s8-u4-variables", 4, ["SC8.12.6", "SC8.12.9"], 2, "var", varset([
  function () { return mcq("In the heart rate experiment, a student measures her rate at rest, after walking, and after running. What is the manipulated (independent) variable, and what must be controlled?",
    "Activity level is manipulated; the same person, the same counting method and the same timing must be kept the same",
    ["Heart rate is the variable manipulated; the activity level must be kept the same throughout", "Activity level is manipulated; a different person should be used at each level of activity in the experiment", "Breathing rate is the variable manipulated; the heart rate must be kept the same at every level"],
    "The experimenter changes the activity level and measures the response (heart rate). Fair comparison requires the same subject, the same 15 second count multiplied by 4, and the same timing at every level.", {}); }
]), ["What does the experimenter change?", "Everything else stays the same."]);

E("s8-u4-protocol", 4, ["SC8.12.6"], 1, "var", varset([
  function () { return mcq("In Core Lab 12-1B, resting heart rate is measured by counting the pulse for 15 seconds and multiplying by 4. Why is the count repeated three times and averaged?",
    "Averaging three trials gives a more reliable resting value than a single count",
    ["Three trials are needed so that the average reaches exactly the true resting value of the pulse", "The first two of the three counts are only practice attempts and are thrown away unused", "Multiplying the count by 4 gives a rate only when the count is made after three full trials"],
    "Single counts vary with small timing and counting errors. Repeating and averaging reduces the effect of any one faulty count, giving a more trustworthy resting rate.", {}); }
]), ["One count can be off.", "Repeats plus an average: reliability."]);

E("s8-u4-cr-design-rates", 4, ["SC8.12.6"], 3, "var", varset([
  function () { return textq("Design an experiment to compare heart rate and breathing rate at rest and after two levels of activity. State the question, the variable you will change, two variables you will control, how you will measure both rates, and how you will make the results reliable. (4 marks)",
    ["Question: how do heart rate and breathing rate change with activity level? Change the activity (rest, walking for one minute, step-ups for one minute). Control the person tested and the time between stopping and measuring. Measure heart rate by counting the wrist pulse for 15 seconds times 4, and breathing rate by counting breaths for 15 seconds times 4. Repeat each measurement and average, or repeat the whole experiment, to make results reliable."],
    "<b>Model answer:</b> Question: how do heart rate and breathing rate change as activity level rises? Manipulated variable: the activity level (sitting at rest, walking for 1 minute, running step-ups for 1 minute). Controlled variables: the same person throughout, the same activity time of 1 minute each, and the same delay before measuring. Measurements: heart rate from the wrist pulse counted for 15 seconds and multiplied by 4; breathing rate from breaths counted for 15 seconds and multiplied by 4. Reliability: take each resting measurement three times and average, and repeat the full set on another day to compare.<br><br><b>Marking points:</b> 1 mark for a clear question and the manipulated variable; 1 mark for two sensible controlled variables; 1 mark for a workable measurement method for both rates; 1 mark for a reliability step (repeats or averaging).", {}); }
]), ["Question, variables, method, reliability.", "Use the 15 second count from the core lab."]);

E("s8-u4-testable", 4, ["SC8.12.7"], 2, "var", varset([
  function () { return mcq("Which rephrasing turns the topic into a testable question about fitness and health?",
    "Does resting heart rate decrease after six weeks of daily running?",
    ["Is running, in general, a good activity for people of all ages to take part in?", "Why is exercise considered by everyone to be the best of all physical activities?", "Do the students in the school like running as an activity more than they like walking?"],
    "A testable question names something measurable (resting heart rate) and a change to test (six weeks of running). The others ask for opinions or general judgements that cannot be measured as stated.", {}); }
]), ["Look for something measurable.", "A variable you can count or time."]);

E("s8-u4-testable2", 4, ["SC8.12.7"], 1, "var", varset([
  function () { return mcq("Which question is already in testable form?",
    "How does breathing rate change when a student climbs stairs for one minute?",
    ["Is being fit and active important for teenagers in their everyday lives at school?", "What is the single best sport in the world for a person's health and fitness overall?", "Why do competitive athletes spend so many hours training for their sport each week?"],
    "The first question can be answered by measurement: breathing rate before and after a defined activity. The others call for opinions or explanations too broad to test directly.", {}); }
]), ["Measurable as written?", "Breathing rate can be counted."]);

E("s8-u4-hypothesis", 4, ["SC8.12.8"], 2, "var", varset([
  function () { return mcq("A student observes that classmates breathe faster after gym class. Which is a proper hypothesis based on that pattern?",
    "If activity level increases, then breathing rate increases, because the muscles need more oxygen",
    ["Taking regular exercise is a healthy thing for everyone to do, whatever their age", "Breathing is simply one part of the work done by the respiratory system of the body", "Students in the school enjoy their gym classes more than they enjoy their math classes"],
    "A hypothesis is a testable prediction linking the variables, ideally with a reason. The others are a general claim, a fact and an opinion, none of them a prediction to test.", {}); }
]), ["A prediction linking two variables.", "If... then... because..."]);

E("s8-u4-hypothesis-basis", 4, ["SC8.12.8"], 1, "var", varset([
  function () { return mcq("A hypothesis should be based on",
    "background information or an observed pattern",
    ["the result the student hopes to get", "a guess made with no information at all", "the conclusion of a different experiment"],
    "Hypotheses grow out of what is already known or noticed: background reading or a pattern in observations. Hoping for a result is not a basis.", {}); }
]), ["What comes before the hypothesis?", "Knowledge or a noticed pattern."]);

E("s8-u4-control", 4, ["SC8.12.9"], 2, "var", varset([
  function () { return mcq("During the activity experiment, one partner counts her pulse at her wrist while the other counts at his neck, and they compare results. What is wrong with this procedure?",
    "The measurement method is not controlled, so the two sets of results are not fairly comparable",
    ["Nothing is wrong with it: any pulse point on the body gives identical results in an experiment", "The pulse at the wrist cannot be felt at all by anyone while the exercise is being done", "Partners working together in the lab are simply not allowed to compare their data with each other"],
    "Controlling the major variables includes using the same measurement method for every trial and every person. Different pulse points and techniques introduce differences that are not caused by the activity.", {}); }
]), ["Fair tests keep methods identical.", "Same method for everyone."]);

E("s8-u4-control-error", 4, ["SC8.12.9"], 3, "var", varset([
  function () { return mcq("A group tests activity levels this way: Person A rests, Person B walks, Person C runs, and they compare the three heart rates to decide the effect of activity. Why can they not conclude anything about activity from these results?",
    "Different people have different resting rates, so the person is an uncontrolled variable tangled up with the activity level",
    ["Using only three people in total is far too few for any experiment of this kind to mean anything", "A person's heart rate cannot be measured at all in the minutes after they finish running", "The three activities should simply have been done by the group in the opposite order to theirs"],
    "The design confounds two variables: activity and person. A fitter person's running rate can be lower than an unfit person's resting rate, so the comparison says nothing reliable about activity. One person should do all three levels.", {}); }
]), ["Two things changed at once.", "Person and activity are tangled."]);

/* ---------- SC8.12.10 to SC8.12.12 Displaying and organizing data ---------- */

E("s8-u4-graph-choice", 4, ["SC8.12.10"], 2, "var", varset([
  function () { return mcq("A student records heart rate every 30 seconds for 5 minutes after exercise, to show how it recovers. Which display best fits this data?",
    "A line graph of heart rate against time",
    ["A bar graph of the five classmates' names", "A pie chart of the activity levels", "A table of contents"],
    "Recovery is a change over time, which a line graph shows as a trend. Bar graphs compare categories; the recovery data is a continuous change.", {}); }
]), ["Change over time: which graph type?", "Line graphs show trends."]);

E("s8-u4-rates-figure", 4, ["SC8.12.10"], 1, "var", varset([
  function () { var q = mcq("The bar graph shows resting heart rates for five animals. Which animal has the lowest resting heart rate?",
    "Whale", ["Cat", "Dog", "Mouse"],
    "The whale's bar is by far the shortest at 8 beats per minute. The mouse, the smallest animal, has the highest rate at 450.", {});
    q.figure = s8BarSVG(["Mouse", "Hamster", "Cat", "Dog", "Whale"], [450, 300, 120, 70, 8], "Resting heart rate (beats per minute)"); return q; }
]), ["Find the shortest bar.", "Read the value above it."]);

E("s8-u4-recovery-figure", 4, ["SC8.12.10", "SC8.12.6"], 3, "var", varset([
  function () { var q = mcq("The graph shows a student's heart rate during recovery after intense exercise. Her resting rate is about 72 beats per minute. After how many minutes does her heart rate first fall below 90 beats per minute?",
    "4 minutes", ["2 minutes", "3 minutes", "5 minutes"],
    "Reading the plotted points: 138, 120, 106 and 94 beats per minute at minutes 0 to 3 are all above 90; at minute 4 the rate is 84, the first reading below 90, as it settles back toward the resting rate of about 72.", {});
    q.figure = s8LineGraphSVG([0, 1, 2, 3, 4, 5], [138, 120, 106, 94, 84, 78], "Minutes since exercise stopped", "Heart rate (beats per minute)"); return q; }
]), ["Follow the points minute by minute.", "First point under 90."]);

E("s8-u4-variation-explain", 4, ["SC8.12.11"], 2, "var", varset([
  function () { return mcq("A class repeats the activity experiment on a second day. One student's resting heart rate is 76 on day one and 84 on day two. Which is a reasonable explanation for the variation?",
    "He had rushed up the stairs just before the day two measurement, so his rate had not settled to true rest",
    ["A person's resting heart rate never changes from day to day, so one of the two counts must have been fabricated", "The student's heart itself grew noticeably larger in the time between the two days of measuring", "The multiplication of the 15 second count by 4 works properly only on the first day of an experiment"],
    "Resting measurements vary with recent activity, stress, counting errors and time of day. A rate taken right after rushing upstairs is not a true resting rate, which is exactly why repeats and settling time matter.", {}); }
]), ["What differed between the two days?", "True rest must be settled."]);

E("s8-u4-animal-pattern", 4, ["SC8.12.11", "SC8.10.6"], 3, "var", varset([
  function () { var q = mcq("The bar graph shows resting heart rates for five animals. Which statement best explains the pattern?",
    "Smaller animals have much higher resting heart rates; their bodies must circulate blood and deliver oxygen at a faster rate for their size",
    ["Larger animals have higher resting heart rates than smaller animals do, because their much bigger bodies hold a great deal more blood", "The resting heart rate of an animal is completely unrelated to the size of the animal's body or to the kind of life it lives", "The whale's resting rate is the lowest of the five animals only because the whale lives its whole life in cold ocean water"],
    "Across the data the pattern is consistent: mouse 450, hamster 300, cat 120, dog 70, whale 8 beats per minute. The smaller the animal, the higher its resting heart rate, because its cells' needs must be met by a faster circulation relative to its size.", {});
    q.figure = s8BarSVG(["Mouse", "Hamster", "Cat", "Dog", "Whale"], [450, 300, 120, 70, 8], "Resting heart rate (beats per minute)"); return q; }
]), ["Order the animals by size, then by rate.", "The trend runs opposite to size."]);

E("s8-u4-organize", 4, ["SC8.12.12"], 1, "var", varset([
  function () { return mcq("Two partners each measure heart rate and breathing rate at three activity levels. Which format best organizes the data for comparison?",
    "A table with rows for each person and activity level, and columns for heart rate and breathing rate, including the averages",
    ["A paragraph of writing describing in words the busiest of the days on which the class did the activities", "A single long list of all of the numbers the two partners recorded, written down in the order they were measured", "A labelled drawing of the school gym, showing where the class carried out each of the activity measurements"],
    "A structured table keeps each measurement tied to its person, activity and rate type, and the averages column the lab requires. A loose list loses which number belongs to what.", {}); }
]), ["Comparison needs structure.", "Rows and columns with labels."]);

E("s8-u4-organize-avg", 4, ["SC8.12.12"], 2, "var", varset([
  function () { return mcq("A data table for the resting measurements has three trial columns and an average column. Why does the lab organize the data this way?",
    "Showing the trials and their average makes the data transparent and the resting value more trustworthy",
    ["The column for the average is there to hide away any trials that disagree with the rest of the data", "Three separate trials are required in the table simply so that the columns fill up the whole page", "Averages are calculated in the lab in order to change the results into the values the class wanted"],
    "Organizing trials beside their average lets anyone see the spread of the measurements and judge the resting value. Nothing is hidden: the trials stay on display.", {}); }
]), ["Transparency and trust.", "Trials visible, average beside them."]);

/* Design CR exclusion (shell v1.2.0): flagged entries are never dealt into a
   composed paper (unit tests and other compositions), while practice draws and
   explicit teacher picks keep them. The design-an-experiment item is practice
   and teacher-picked only, per Jason's ruling of Nov 15, 2026. */
var NO_COMPOSE_U4 = {
  "s8-u4-cr-design-rates": true
};
BANK.forEach(function (e) { if (NO_COMPOSE_U4[e.id]) { e.noCompose = true; } });
