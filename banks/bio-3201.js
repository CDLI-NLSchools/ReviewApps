/* Biology 3201 bank module for the unified review app shell.
   Assembled by assemble-bank.py from banks/bio-3201/; edit the
   per-unit sources there, not this file. Entries register through
   the shell's E(id, unit, indicators, level, kind, gen). */

/* ----- bank-u1.js ----- */
// CRMARKS: bio-u1-cr-q01=4
// CRMARKS: bio-u1-cr-q02=4
// CRMARKS: bio-u1-cr-q03=3
// Biology 3201 Unit 1 bank: Cell Reproduction and the Continuity of Life.
// All 131 selected-response questions and the 3 constructed-response
// practice items from the Mid-Course Exam Review book for Unit 1
// (practice questions by Marsha Curtis and Peter Bishop, CDLI 2026),
// converted Nov 12, 2026 by convert-u1.py from the extracted book.
// Stems, options and keys are the book's, verbatim. Each book Hint
// panel is the entry's hint and each Solution panel its worked
// solution; the books' Help panels (video pointers) have no slot in
// the app and are not carried. Levels are the calibrated tags in
// bio3201-levels.json. House-style fixes, kept minimal: em dashes in
// the book text become commas, colons or periods, and the 18
// solutions that pointed at the book's option letters now name the
// options' content, because the shell re-sorts option order.
// (Letters that label structures on a diagram, as in the two 5.6
// flower questions, are the book's own and stay.) Diagrams travel
// with their questions as figure images under banks/bio-3201/assets/.
// The constructed-response items close the file; their marks are in
// the CRMARKS manifest above (4 + 4 + 3 = 11 of the mid-course
// blueprint's 12 CR marks).

/* ---------- 5.1 Mitosis and the Cell Cycle ---------- */
E("bio-u1-51-q01",1,["5.1"],1,"var",varset([
  function(){
    return mcq("How is genetic material organized in a eukaryotic nucleus when the cell is not actively dividing?",
      "As chromatin dispersed throughout the nucleus",
      ["As chromosomes lined up at the equator","As daughter chromosomes moving to poles","As spindle fibers attached to centromeres"],
      "Between divisions, the DNA is kept in its loose, thread-like form, chromatin, spread through the nucleus so the cell can access its genes. It only condenses into visible chromosomes when the cell gets ready to divide.",
      {});
  }
]),["When a cell is not dividing, does it need its DNA tightly packed for transport, or spread out so its genes can be read and used?"]);
E("bio-u1-51-q02",1,["5.1"],1,"var",varset([
  function(){
    return mcq("Why is maintaining the correct chromosome number important in somatic cells?",
      "It ensures proper genetic information is passed during cell division",
      ["It allows cells to produce gametes directly","It prevents DNA replication during interphase","It reduces the need for cytokinesis"],
      "Mitosis is how the body grows and repairs itself, and every new somatic cell needs the complete set of instructions to function. Keeping the chromosome number correct ensures the proper genetic information is passed on at each division.",
      {});
  }
]),["Think about what each new body cell needs in order to do the same job as the cell it came from."]);
E("bio-u1-51-q03",1,["5.1"],2,"var",varset([
  function(){
    var q=mcq("What phase of mitosis is observed in the diagram below?",
      "Anaphase",
      ["Metaphase","Prophase","Telophase"],
      "The sister chromatids in the diagram have separated and are being pulled toward opposite poles of the cell. That separation is the defining event of anaphase.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-51-q03.png" alt="Diagram of a cell in mitosis, with separated chromatids being pulled toward opposite poles" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at where the chromatids are and which direction they are moving: are they gathering, lining up, or being pulled apart?"]);
E("bio-u1-51-q04",1,["5.1"],2,"var",varset([
  function(){
    return mcq("A skin cell contains 46 chromosomes before DNA replication. How many sister chromatids will be present after S phase is completed?",
      "92",
      ["23","46","184"],
      "In S phase each of the 46 chromosomes is replicated, and each replicated chromosome consists of two sister chromatids joined at the centromere. After S phase the cell still has 46 chromosomes, but 46 \u00d7 2 = 92 sister chromatids.",
      {});
  }
]),["S phase copies every chromosome. Count chromatids, not chromosomes: how many chromatids make up one copied chromosome?"]);
E("bio-u1-51-q05",1,["5.1"],2,"var",varset([
  function(){
    var q=mcq("A student observes cells going through mitosis. What does structure X indicate?",
      "Cell plate is forming between daughter cells",
      ["Anaphase is about to commence","Cleavage furrow formation is occurring","Nuclear membranes have completely disappeared"],
      "X points to the new partition forming across the middle of a plant cell: a cell plate. Plant cells cannot pinch inward because of their rigid cell wall, so material collects at the equator and builds a cell plate that becomes the new wall between the daughter cells. A cleavage furrow, the pinching seen in animal cells, is a different structure.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-51-q05.png" alt="Micrograph of dividing plant cells, with structure X marking the new partition forming between two daughter cells" style="max-width:100%;height:auto">';
    return q;
  }
]),["These are plant cells with rigid walls. Can a plant cell pinch in from the sides the way an animal cell does, and what is X building between the two new nuclei instead?"]);
E("bio-u1-51-q06",1,["5.1"],2,"var",varset([
  function(){
    return mcq("A laboratory chemical prevents spindle fibers from attaching to centromeres. Which stage of mitosis would be most directly affected?",
      "Anaphase",
      ["Cytokinesis","Interphase","Telophase"],
      "Spindle fibres attach to centromeres so they can pull sister chromatids apart. Anaphase is the phase in which that pulling happens, so it is the stage most directly blocked when the fibres cannot attach.",
      {});
  }
]),["Spindle fibres do one main pulling job in mitosis. Which phase cannot happen until that pulling starts?"]);
E("bio-u1-51-q07",1,["5.1"],2,"var",varset([
  function(){
    return mcq("A mutation prevents cytokinesis but not mitosis. What would most likely result?",
      "Cells containing two nuclei",
      ["Cells containing half the normal DNA","Cells producing only gametes","Cells remaining permanently in G1"],
      "Mitosis divides the nucleus; cytokinesis divides the cytoplasm into separate cells. If cytokinesis fails, the cell keeps both new nuclei inside one shared cytoplasm, a single cell containing two nuclei.",
      {});
  }
]),["If the nucleus divides but the cytoplasm never splits, where do the two new nuclei end up?"]);
E("bio-u1-51-q08",1,["5.1"],1,"var",varset([
  function(){
    return mcq("In metaphase of mitosis, chromosomes would be:",
      "lined up on the metaphase plate (center of the cell)",
      ["lined up on opposite poles","formed in tetrads","coiled and ready for duplication of DNA"],
      "In metaphase, the chromosomes line up single file along the equator of the cell, the metaphase plate, so that each daughter cell can receive one copy of each chromosome. Tetrads belong to meiosis, not mitosis.",
      {});
  }
]),["The phase name points to position: \"meta\" suggests the middle. Where do the chromosomes sit during this phase?"]);
E("bio-u1-51-q09",1,["5.1"],2,"var",varset([
  function(){
    return mcq("How would the genetic material of daughter cells compare to its parents if interphase did not take place during the cell cycle?",
      "Half",
      ["Identical","One quarter","Twice"],
      "Without interphase there is no S phase and no DNA replication. The parent's existing DNA would simply be split between the two daughter cells, so each daughter cell would end up with half the parent's genetic material.",
      {});
  }
]),["Interphase includes the S phase, when DNA is copied. If that copying never happened, how much DNA would each daughter cell get compared with the parent?"]);
E("bio-u1-51-q10",1,["5.1"],1,"var",varset([
  function(){
    return mcq("Which of the following best explains why somatic cells must maintain a constant, diploid chromosome number during cell division?",
      "It ensures that every new cell receives an identical and complete set of genetic instructions",
      ["It allows new cells to specialize into gametes for sexual reproduction","It halves the amount of DNA in each generation of cells to maximize structural efficiency","It increases genetic variation within the individual's body tissues to help adapt to environmental stress"],
      "Somatic cells maintain a constant diploid number so that every new cell receives an identical and complete set of genetic instructions. That completeness is what lets body tissues grow, be maintained, and be repaired. Mitosis does not create variation: variation is a product of meiosis.",
      {});
  }
]),["Every tissue in the body runs on the same instruction set. What happens to a tissue if its new cells receive only part of that set?"]);
E("bio-u1-51-q11",1,["5.1"],1,"var",varset([
  function(){
    return mcq("In what phase do cells spend most of their time during the cell cycle?",
      "Interphase",
      ["Anaphase","Prophase","Telophase"],
      "Cells spend most of the cell cycle in interphase, growing, carrying out their normal functions, and replicating their DNA in preparation for division. The phases of mitosis make up only a small fraction of the cycle.",
      {});
  }
]),["Mitosis itself is short. What is the long working phase called, when the cell grows, does its job, and copies its DNA?"]);
E("bio-u1-51-q12",1,["5.1"],1,"var",varset([
  function(){
    return mcq("Which of the following shows the stages of the cell cycle?",
      "Interphase, Mitosis, Cytokinesis",
      ["Prophase, Interphase, Cytokinesis","Interphase, Meiosis, Cytokinesis","Mitosis, Meiosis, Cytokinesis"],
      "For a somatic cell, the cycle runs interphase, then mitosis, then cytokinesis. Meiosis is not part of this cycle: it occurs only in germ cells producing gametes, which rules out the two options that include meiosis.",
      {});
  }
]),["Watch for the options that sneak in the wrong kind of division for body cells."]);
E("bio-u1-51-q13",1,["5.1"],2,"var",varset([
  function(){
    return mcq("Which description best describes a difference between plant and animal cells after mitosis?",
      "Animal cells form a cleavage furrow; Plant cells form a cell plate",
      ["Animal cells form a cell plate; Plant cells form a cleavage furrow","Animal cells form a cell wall; Plant cells form centrioles","Animal cells form a cleavage furrow; Plant cells form centrioles"],
      "Animal cells pinch inward with a cleavage furrow. Plant cells, boxed in by a rigid cell wall, build a cell plate across the middle instead. Only one option pairs the two correctly; the others reverse the pairing or swap in the wrong structure.",
      {});
  }
]),["Match the structure to the cell type: which cell has a wall that must be built across the middle, and which cell can simply pinch in two?"]);

/* ---------- 8.1 (STSE) Scientific Questions and Technological Problems ---------- */
E("bio-u1-81-q01",1,["8.1"],2,"var",varset([
  function(){
    return mcq("A research team investigates why mutations in a specific gene increase cancer risk. This activity is best classified as:",
      "Investigating a scientific question",
      ["Developing a technological solution","Evaluating a medical treatment","Manufacturing a medical device"],
      "The team is asking why a gene mutation raises cancer risk, a question about how the cell cycle and cancer are related. Investigating a question like that is scientific inquiry. Designing a therapy to act on the answer would be the technological problem.",
      {});
  }
]),["Is the team building or testing a product, or are they trying to explain why something happens in nature?"]);

/* ---------- 5.2 The Cell Cycle and Cancer ---------- */
E("bio-u1-52-q01",1,["5.2"],1,"var",varset([
  function(){
    return mcq("What is a mutation?",
      "A permanent change in DNA sequence",
      ["A temporary change in protein shape","A type of cytokinesis","A variation in chromosome number caused by meiosis"],
      "A mutation is a permanent change in a cell's DNA sequence. Because DNA carries the instructions for the cell, a lasting change to the sequence can alter how the cell behaves, including how it divides.",
      {});
  }
]),["Focus on two things: which molecule is changed, and whether the change is lasting or temporary."]);
E("bio-u1-52-q02",1,["5.2"],2,"var",varset([
  function(){
    return mcq("A tissue sample contains cells that continue progressing through the cell cycle even when neighboring cells signal them to stop dividing. Which genetic change would best explain this observation?",
      "A mutation disabling genes that regulate cell cycle checkpoints",
      ["A mutation increasing the production of digestive enzymes","A mutation preventing ribosomes from assembling proteins","A mutation reducing the permeability of the cell membrane"],
      "Cells that keep progressing through the cycle despite stop signals have lost their braking system. A mutation that disables the genes regulating the cell cycle checkpoints removes those brakes, so division continues unchecked, the behaviour seen in this tissue sample, and the link between the cell cycle and cancer.",
      {});
  }
]),["Healthy cells stop dividing when neighbours signal \"stop.\" Which kind of gene would have to fail for a cell to ignore that signal and keep going?"]);
E("bio-u1-52-q03",1,["5.2"],2,"var",varset([
  function(){
    return mcq("A tumor is found to consist of genetically similar cells. Which explanation best accounts for this observation?",
      "All cells arose from repeated mitotic divisions of one mutated cell",
      ["Cells were produced through meiosis","Multiple unrelated mutations occurred simultaneously","The cells avoided DNA replication"],
      "A tumour starts from a single mutated cell. Repeated mitotic divisions copy that cell, mutation included, so the tumour ends up as a mass of genetically similar cells, all descended from the original mutated cell.",
      {});
  }
]),["A tumour grows out of one cell that went wrong. What kind of division copies that one cell over and over?"]);
E("bio-u1-52-q04",1,["5.2"],1,"var",varset([
  function(){
    return mcq("Cancer is best described as which of the following?",
      "Uncontrolled cell division",
      ["Bacterial cell infection","Premature cell death","Viral gene replication"],
      "Cancer is uncontrolled cell division: cells keep dividing without the normal signals and checkpoint controls, producing growths that can invade surrounding tissue.",
      {});
  }
]),["Strip it down to basics: what are cancer cells doing that healthy cells only do when signalled?"]);

/* ---------- 8.2 (STSE) Cancer Therapies ---------- */
E("bio-u1-82-q01",1,["8.2"],1,"var",varset([
  function(){
    return mcq("A patient receives high-energy radiation aimed directly at a tumor. What is the primary goal of this treatment?",
      "Destroy rapidly dividing cancer cells",
      ["Antibody production stimulation","Increase red blood cell production","Prevent fertilization"],
      "High-energy radiation is aimed at the tumour to destroy its rapidly dividing cancer cells: cells that divide constantly are especially vulnerable to DNA damage. Destroying those cells is the primary goal of radiation therapy.",
      {});
  }
]),["Radiation damages DNA. Which cells in the body are copying their DNA most often, and are therefore hit hardest by DNA damage?"]);
E("bio-u1-82-q02",1,["8.2"],1,"var",varset([
  function(){
    return mcq("A medical treatment that trains or boosts your body's own immune system to recognize and destroy harmful cells best describes what?",
      "Immunotherapy",
      ["Chemotherapy","Hormone therapy","Targeted therapy"],
      "A treatment that trains or boosts the body's own immune system to recognize and destroy harmful cells is immunotherapy. Chemotherapy and radiation attack the cancer cells directly; immunotherapy works through the immune system.",
      {});
  }
]),["The key phrase is \"your body's own.\" Which therapy works by recruiting a body system instead of attacking the tumour directly with drugs or rays?"]);
E("bio-u1-82-q03",1,["8.2"],1,"var",varset([
  function(){
    return mcq("Which type of cancer treatment may use X-Rays or Gamma rays to treat a tumor.",
      "Radiation therapy",
      ["Chemotherapy","Hormone therapy","Immunotherapy"],
      "X-rays and gamma rays are radiation, so a treatment that uses them to treat a tumour is radiation therapy.",
      {});
  }
]),["X-rays and gamma rays are both forms of high-energy radiation. Match the tool to the therapy named after it."]);

/* ---------- 5.3 Treatment Decisions and Values ---------- */
E("bio-u1-53-q01",1,["5.3"],2,"var",varset([
  function(){
    return mcq("Two patients with the same cancer choose different treatment plans after consulting their physicians. Which explanation best accounts for this difference?",
      "Medical decisions are influenced by personal values and therapeutic outcomes",
      ["Cell cycles operate differently in each patient","Mitosis occurs at different rates in healthy tissues","Mutations are identical in every cancer case"],
      "Treatment decisions are not made on biology alone. Personal values and the likely therapeutic outcomes, side effects, quality of life, chances of success, influence what each patient and physician choose, so two patients with the same cancer can reasonably choose different treatment plans.",
      {});
  }
]),["The two patients have the same disease and access to the same medical advice. If the biology is essentially the same, what else differs from person to person?"]);

/* ---------- 5.4 Meiosis ---------- */
E("bio-u1-54-q01",1,["5.4"],1,"var",varset([
  function(){
    return mcq("In which type of cell does meiosis normally occur?",
      "germ cell",
      ["muscle cell","nerve cell","skin cell"],
      "Meiosis occurs in germ cells, the cells in the testes and ovaries that give rise to sperm and eggs. Muscle, nerve, and skin cells are somatic cells and divide by mitosis.",
      {});
  }
]),["Three of the options are ordinary body cells. Which cell type exists specifically to produce gametes?"]);
E("bio-u1-54-q02",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A scientist discovers a species in which homologous chromosomes fail to separate during meiosis I. What is the most likely consequence?",
      "chromosome numbers in gametes may be abnormal",
      ["all gametes will be genetically identical","crossing over will increase significantly","mitosis will no longer occur"],
      "If homologous chromosomes fail to separate in meiosis I (nondisjunction), one cell receives both partners and the other receives none. The gametes produced therefore have abnormal chromosome numbers, extra copies in some, missing copies in others.",
      {});
  }
]),["Homologous pairs are supposed to split between two cells in meiosis I. If both partners go to the same side, what do the gametes end up with, too many, too few, or just right?"]);
E("bio-u1-54-q03",1,["5.4"],2,"var",varset([
  function(){
    return mcq("A mutation prevents crossing over but does not affect chromosome separation. What would be the most likely effect?",
      "less genetic variation among gametes",
      ["fewer chromosomes in somatic cells","increased mitotic activity","loss of cytokinesis"],
      "Crossing over exchanges segments between homologous chromosomes, creating new allele combinations in gametes. Preventing it leaves chromosome separation intact but removes a major source of variation, so the gametes show less genetic variation.",
      {});
  }
]),["Crossing over shuffles alleles between homologous chromosomes. If the shuffle never happens, what happens to the variety of gametes produced?"]);
E("bio-u1-54-q04",1,["5.4"],1,"var",varset([
  function(){
    return mcq("At which stage of meiosis do all the tetrads line up at the equator of the cell?",
      "Metaphase I",
      ["Anaphase I","Anaphase II","Metaphase II"],
      "Tetrads, paired homologous chromosomes, line up at the equator during metaphase I. By metaphase II the homologs have already been separated, and only single chromosomes remain to line up.",
      {});
  }
]),["Tetrads exist only while homologs are still paired, which is a meiosis I structure. Which \"meta\" phase lines structures up at the equator?"]);
E("bio-u1-54-q05",1,["5.4"],2,"var",varset([
  function(){
    return mcq("If a pig liver cell contains 46 chromosomes, how many chromosomes are found in a pig sperm cell?",
      "23",
      ["21","46","47"],
      "The liver cell is a diploid somatic cell with 46 chromosomes. Meiosis halves the chromosome number to produce gametes, so a sperm cell carries 46 \u00f7 2 = 23 chromosomes.",
      {});
  }
]),["A liver cell is diploid and a sperm cell is haploid. What does meiosis do to the number 46?"]);
E("bio-u1-54-q06",1,["5.4"],1,"var",varset([
  function(){
    return mcq("When does separation of homologous chromosomes occur?",
      "Meiosis I",
      ["Fertilization","Meiosis II","Mitosis"],
      "Homologous chromosomes separate during meiosis I: that is the reduction division. Meiosis II separates sister chromatids, much as mitosis does.",
      {});
  }
]),["Ask what each division separates: one division separates homologous partners, the other separates sister chromatids."]);
E("bio-u1-54-q07",1,["5.4"],2,"var",varset([
  function(){
    var q=mcq("Which of the following describes the process in the image below?",
      "It creates genetic variation in the resulting gametes",
      ["It doubles the total chromosome number in the cell","It ensures the exact cloning of parental genotypes","It repairs damaged DNA strands before cell division completes"],
      "The image shows crossing over: non-sister chromatids of homologous chromosomes exchange segments, so the resulting chromosomes carry new combinations of alleles (note the swapped tips in the \"after\" pair). That creates genetic variation in the resulting gametes. It does not change the chromosome number or clone the parents.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-54-q07.png" alt="Diagram of two homologous chromosomes, one blue and one red, exchanging segments, with the two recombinant chromosomes shown after the exchange" style="max-width:100%;height:auto">';
    return q;
  }
]),["Follow the colours: the two homologous chromosomes swap pieces. What does swapping segments do to the allele combinations carried by the final gametes?"]);
E("bio-u1-54-q08",1,["5.4"],1,"var",varset([
  function(){
    return mcq("During which stage of meiosis does crossing over occur?",
      "prophase I",
      ["metaphase I","prophase II","metaphase II"],
      "Crossing over occurs in prophase I, while homologous chromosomes are paired in synapsis as tetrads. It cannot occur in prophase II because the homologs have already been separated into different cells.",
      {});
  }
]),["Crossing over needs homologs paired up in tetrads. In which prophase are tetrads present?"]);
E("bio-u1-54-q09",1,["5.4"],2,"var",varset([
  function(){
    var q=mcq("Which phase of mitosis is illustrated in the image below?",
      "Telophase",
      ["Anaphase","Metaphase","Prophase"],
      "The image shows two new nuclei re-formed at opposite poles while the cell pinches inward: that is telophase, the final phase of mitosis, as cytokinesis gets underway.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-54-q09.png" alt="Diagram of a cell pinching into two daughter cells, each with a re-formed nucleus containing two chromosomes" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look for the finishing signs of mitosis: two nuclei re-forming at opposite ends and a cell beginning to pinch into two."]);
E("bio-u1-54-q10",1,["5.4"],2,"var",varset([
  function(){
    var q=mcq("If anaphase I did not occur in a human cell, how many chromosomes would be present in the four daughter cells produced by meiosis?",
      "B",
      ["A","C","D"],
      "Anaphase I is when homologous chromosomes separate. Without it, all 46 chromosomes end up on one side, so meiosis II produces two daughter cells with 46 chromosomes and two with none, row B of the table (0, 0, 46, 46).",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-54-q10.png" alt="Table giving the chromosome numbers of four cells under four options: row a: 0, 0, 23, 23; row b: 0, 0, 46, 46; row c: 22, 22, 24, 24; row d: 45, 45, 47, 47" style="max-width:100%;height:auto">';
    return q;
  }
]),["If anaphase I never happens, the homologs are never pulled apart, so all 46 chromosomes stay on one side of the cell. Which row of the table shows what the four cells end up with after meiosis II?"]);
E("bio-u1-54-q11",1,["5.4"],1,"var",varset([
  function(){
    return mcq("How do cells at the completion of meiosis compare with the diploid cell from which they were produced?",
      "Half the number of chromosomes and half the amount of DNA",
      ["Half the number of chromosomes and the same amount of DNA","The same number of chromosomes and half the amount of DNA","The same number of chromosomes and the same amount of DNA"],
      "The cells produced by meiosis are haploid: they carry half the number of chromosomes and half the amount of DNA of the diploid cell they were produced from. That is why fertilization, the fusion of two haploid gametes, is needed to restore the full set.",
      {});
  }
]),["Meiosis is called the reduction division. Decide what happens to the chromosome number first, then ask whether the total amount of DNA follows the same pattern."]);
E("bio-u1-54-q12",1,["5.4"],1,"var",varset([
  function(){
    return mcq("Meiosis halves the chromosome number. How can this be restored?",
      "Fertilization",
      ["Synapsis","Mitosis","Replication"],
      "Fertilization restores the chromosome number: a haploid sperm and a haploid egg fuse, combining their chromosome sets into a single diploid zygote.",
      {});
  }
]),["The missing half-set has to come from another cell. Which event joins two haploid cells into one diploid cell?"]);
E("bio-u1-54-q13",1,["5.4"],1,"var",varset([
  function(){
    return mcq("Which of the following correctly describes how genetic material is organized in a eukaryotic nucleus?",
      "DNA forms chromatin, which condenses into chromosomes for cell division",
      ["Chromatin is the X-shaped structure visible during cell division, while chromosomes are the relaxed DNA strands","Human cells contain 22 pairs of sex chromosomes and 1 pair of autosomes","Sex chromosomes are found in the cytoplasm and transport autosomes"],
      "DNA is organized as chromatin, the loose working form in the nucleus, and condenses into compact chromosomes when the cell divides. The claim that chromatin is the X-shaped structure reverses the two terms, and the claim of 22 pairs of sex chromosomes reverses the human counts: human cells have 22 pairs of autosomes and 1 pair of sex chromosomes.",
      {});
  }
]),["One option swaps the two key terms. Remember the direction of change: loose in a working nucleus, condensed for division."]);

/* ---------- 5.5 Spermatogenesis and Oogenesis ---------- */
E("bio-u1-55-q01",1,["5.5"],1,"var",varset([
  function(){
    return mcq("Which structure develops into a mature ovum?",
      "Primary oocyte",
      ["Oogonium","Polar body","Spermatozoon"],
      "In oogenesis, the oogonium develops into a primary oocyte, and it is the primary oocyte that goes through meiosis to produce the mature ovum. Polar bodies are the small cells discarded during those divisions, not the egg's source.",
      {});
  }
]),["Work through the oogenesis chain: oogonium \u2192 ? \u2192 ovum. Which stage is the last one before the mature egg?"]);
E("bio-u1-55-q02",1,["5.5"],1,"var",varset([
  function(){
    return mcq("Which characteristic is typical of human sperm cells?",
      "streamlined shape for movement",
      ["large nutrient reserve","non-motile structure","produced in relatively small numbers"],
      "Sperm are small, streamlined cells with a flagellum, built for movement toward the egg. They are produced in very large numbers and carry almost no nutrient reserves, the reverse of the claims that they carry a large nutrient reserve or are produced in relatively small numbers.",
      {});
  }
]),["Sperm have one job that requires travel. What design suits a cell built to swim?"]);
E("bio-u1-55-q03",1,["5.5"],2,"var",varset([
  function(){
    return mcq("A researcher compares mature sperm and egg cells. Which observation would most likely be correct?",
      "egg cells contain greater energy reserves than sperm",
      ["egg cells are smaller and more motile than sperm","sperm contain more stored nutrients than eggs","sperm are larger than egg cells"],
      "The egg is the large, nutrient-stocked gamete: it contains far greater energy reserves (its cytoplasm and stored food) than a sperm, which carries little more than DNA, a motor, and enzymes. The claims that egg cells are smaller and more motile than sperm, that sperm contain more stored nutrients than eggs, and that sperm are larger than egg cells all reverse the actual sizes, stores, or motility of the two cells.",
      {});
  }
]),["One gamete must supply everything the early embryo lives on until implantation. Which gamete is stocked for that job?"]);
E("bio-u1-55-q04",1,["5.5"],2,"var",varset([
  function(){
    var q=mcq("Which is true of oogenesis and spermatogenesis?",
      "C",
      ["A","B","D"],
      "Row C is the only row of the table that is correct for both processes: oogenesis produces one egg cell, and spermatogenesis produces four sperm cells. The other rows each get a fact backwards: oogenesis involves unequal division (not equal), occurs in females (not males), and eggs are non-motile while sperm swim (not the reverse).",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-55-q04.png" alt="Table comparing oogenesis and spermatogenesis: the oogenesis column reads equal cell division, occurs in males, one egg cell is produced, produces motile cells; the spermatogenesis column reads unequal cell division, occurs in females, four sperm cells are produced, produces non-motile cells" style="max-width:100%;height:auto">';
    return q;
  }
]),["Check each row of the table against both processes: a row counts only if both of its columns are right. Watch which process divides unequally and which type of cell ends up motile."]);
E("bio-u1-55-q05",1,["5.5"],1,"var",varset([
  function(){
    return mcq("Which cell is most similar to a spermatogonium?",
      "Oogonium",
      ["Oocyte","Ovum","Zygote"],
      "The oogonium is the female counterpart of the spermatogonium: both are the diploid starting cells of gamete formation, in the ovaries and the testes respectively.",
      {});
  }
]),["A spermatogonium is the starting cell on the male side. What is the matching starting cell on the female side?"]);
E("bio-u1-55-q06",1,["5.5"],1,"var",varset([
  function(){
    return mcq("In spermatogenesis, a spermatogonium functions primarily to:",
      "Produce sperm cells",
      ["Release sperm cells","Store sperm cells","Support sperm cells"],
      "A spermatogonium is the starting cell of spermatogenesis, and its primary function is to produce sperm cells, through growth and mitotic divisions followed by meiosis. Storing and releasing sperm are jobs of structures such as the epididymis and vas deferens.",
      {});
  }
]),["Break the word down: \"spermato-\" plus \"-gonium,\" a seed cell. What does the seed cell of the testes exist to do?"]);
E("bio-u1-55-q07",1,["5.5"],2,"var",varset([
  function(){
    return mcq("Which comparison of sperm and egg mitochondria is correct?",
      "Egg cells contain many mitochondria; sperm cells contain relatively few mitochondria",
      ["Sperm cells contain many mitochondria; egg cells contain relatively few mitochondria","Egg cells and sperm cells contain roughly equal numbers of mitochondria","Sperm cells contain no mitochondria; egg cells contain many mitochondria"],
      "The course notes put numbers on it: a sperm's midpiece holds about 50 to 100 mitochondria to power its tail, while the egg's cytoplasm holds about 140,000. So the egg has many and the sperm relatively few: the claim that sperm contain many and eggs relatively few states it backwards, and the claim that sperm contain none overcorrects, because sperm do have some, in the midpiece. And since the sperm contributes almost no cytoplasm at fertilization, the zygote's mitochondria effectively all come from the egg, which is why mitochondrial DNA is inherited only from the mother.",
      {});
  }
]),["Which gamete contributes almost all of the cytoplasm to the zygote, and which one is stripped down to little more than a nucleus and a tail for swimming?"]);
E("bio-u1-55-q08",1,["5.5"],2,"var",varset([
  function(){
    return mcq("How do structural differences between sperm and egg cells support their different roles in reproduction?",
      "Egg cells provide nutrients; sperm cells deliver DNA",
      ["Egg cells store DNA; sperm cells store nutrients","Sperm cells produce nutrients; egg cells move to fertilize","Sperm cells survive longer; egg cells travel farther"],
      "The division of labour is built into their structures: the egg is large and stocked with nutrients to support the early embryo, while the small, streamlined sperm is built to deliver DNA to the egg. Each of the other options swaps those roles.",
      {});
  }
]),["Match each gamete to its delivery problem: one gamete must travel to reach the other, and one must feed the embryo at the start. Which structure serves which job?"]);

/* ---------- 5.6 Reproductive Strategies ---------- */
E("bio-u1-56-q01",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Which reproductive strategy involves the production of genetically identical offspring from a single parent?",
      "Asexual reproduction",
      ["Cross-fertilization","Double fertilization","Sexual reproduction"],
      "Producing genetically identical offspring from a single parent, without fertilization, is asexual reproduction. The other strategies involve gametes: cross-fertilization and double fertilization are sexual processes.",
      {});
  }
]),["One parent, and offspring that are copies. What is the umbrella term for reproduction that does not involve gametes fusing?"]);
E("bio-u1-56-q02",1,["5.6"],2,"var",varset([
  function(){
    var q=mcq("What reproductive strategy is shown in the image below?",
      "Vegetative reproduction",
      ["Binary fission","Budding","Fragmentation"],
      "The photo shows a strawberry plant sending out horizontal runners (stolons) that root where they touch the soil and grow into new plantlets. Producing new plants from the stems, leaves, or roots of a parent plant is vegetative reproduction.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-56-q02.png" alt="Photograph of a strawberry plant spreading by runners (stolons) that root where they touch the soil, with two young plants growing in small pots" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at how the new plantlets are connected to the parent plant, are they coming from seeds, spores, flowers, or stems?"]);
E("bio-u1-56-q03",1,["5.6"],1,"var",varset([
  function(){
    return mcq("A population of bacteria rapidly increases in size under ideal conditions. Which reproductive strategy is primarily responsible?",
      "Binary fission",
      ["Budding","Fragmentation","Sporulation"],
      "Bacteria reproduce by binary fission: one cell copies its DNA and splits into two identical cells. Under ideal conditions that doubling happens very quickly, which accounts for the rapid population growth.",
      {});
  }
]),["Bacteria are single cells with no gametes. How does one bacterium become two?"]);
E("bio-u1-56-q04",1,["5.6"],1,"var",varset([
  function(){
    return mcq("A virus inserts its genetic material into a host cell's DNA and remains inactive for an extended period. Which viral cycle is being described?",
      "Lysogenic cycle",
      ["Budding cycle","Fragmentation cycle","Lytic cycle"],
      "A virus that inserts its genetic material into the host cell's DNA and remains inactive is in the lysogenic cycle. In the lytic cycle the virus takes over the cell immediately, makes copies of itself, and bursts the cell open.",
      {});
  }
]),["The virus's genes sit quietly inside the host's DNA for a long time. Which cycle is the \"hiding\" one, and which is the \"burst out now\" one?"]);
E("bio-u1-56-q05",1,["5.6"],2,"var",varset([
  function(){
    return mcq("A flowering plant species experiences a sudden environmental change. Why might sexual reproduction provide an advantage over asexual reproduction?",
      "Offspring show greater genetic variation",
      ["Offspring develop more rapidly","Reproduction requires less energy","Reproduction occurs without gamete"],
      "Sexual reproduction produces offspring with greater genetic variation. In a suddenly changed environment, that variety means some offspring are more likely to carry traits that fit the new conditions; genetically identical offspring would all share the parent's vulnerability.",
      {});
  }
]),["Conditions have just changed suddenly. Which kind of offspring, identical copies of the parent, or a varied set, gives a population more chances that at least some individuals will suit the new conditions?"]);
E("bio-u1-56-q06",1,["5.6"],1,"var",varset([
  function(){
    return mcq("A flowering plant produces seeds after pollination. Which event directly results in the formation of triploid endosperm?",
      "fusion of two polar nuclei with a sperm nucleus",
      ["fertilization of the egg by a sperm nucleus","mitosis of the zygote","production of microspores"],
      "The triploid (3n) endosperm forms when one sperm nucleus fuses with the two polar nuclei of the central cell: 1n + 1n + 1n = 3n. The other sperm nucleus fertilizes the egg to form the 2n zygote: the two fusions together are double fertilization.",
      {});
  }
]),["Endosperm is 3n, three sets of chromosomes. Count the nuclei that must fuse: an egg plus a sperm makes 2n, so what extra nucleus joins for the food tissue?"]);
E("bio-u1-56-q07",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Which statement best describes asexual reproduction",
      "One parent produces identical offspring",
      ["One parent produces varied offspring","Two parents produce identical offspring","Two parents produce varied offspring"],
      "Asexual reproduction means one parent produces offspring that are genetically identical to itself. Any option with two parents, or with varied offspring, is describing sexual reproduction.",
      {});
  }
]),["Test each option against two facts: the number of parents, and whether the offspring match the parent genetically."]);
E("bio-u1-56-q08",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Which statement best describes sexual reproduction?",
      "Two parents produce varied offspring",
      ["One parent produces identical offspring","One parent produces varied offspring","Two parents produce identical offspring"],
      "Sexual reproduction combines gametes from two parents, so the offspring are genetically varied: each one is a new combination of the two parents' genes.",
      {});
  }
]),["Apply the same two checks: how many parents contribute, and are the offspring identical or varied?"]);
E("bio-u1-56-q09",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Why does sexual reproduction increase genetic variation compared to asexual reproduction?",
      "Genes are combined from two parents",
      ["Genes are copied from one parent","Genes are destroyed during division","Genes are unchanged during division"],
      "Sexual reproduction increases variation because genes are combined from two parents: each offspring receives a mix of alleles from both parents, rather than a copy of one parent's set.",
      {});
  }
]),["Variation needs new combinations. Where do new combinations come from when two sets of genes meet in one offspring?"]);
E("bio-u1-56-q10",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Which of the following would be correct?",
      "Meiosis \u2192 Haploid gametes \u2192 Fertilization \u2192 Diploid Zygote",
      ["Diploid zygote \u2192 Fertilization \u2192 Haploid gametes \u2192 Meiosis","Fertilization \u2192 Diploid Zygote \u2192 Haploid gametes \u2192 Meiosis","Haploid gametes \u2192 Fertilization \u2192 Meiosis \u2192 Diploid Zygote"],
      "The human life cycle runs: meiosis in the adult produces haploid gametes; fertilization fuses two gametes into a diploid zygote; the zygote then grows by mitosis. The sequence meiosis, then haploid gametes, then fertilization, then diploid zygote is the only one in that order; each other sequence puts an event before something it depends on.",
      {});
  }
]),["Build the chain in order: the adult is diploid, so which event must happen first to make haploid cells, and which event joins them back into a diploid cell?"]);
E("bio-u1-56-q11",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Which example shows vegetative reproduction?",
      "Potato producing tubers",
      ["Fern releasing spores","Hydra forming buds","Yeast dividing cells"],
      "A potato tuber is a modified stem, and its \"eyes\" can grow into complete new plants: vegetative reproduction. The fern example is reproduction by spores and the hydra example is budding; only the tuber is a plant part growing into a new plant.",
      {});
  }
]),["Run through the options: which one grows a whole new plant from a part of the parent plant?"]);
E("bio-u1-56-q12",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Why may parthenogenesis be a disadvantage?",
      "Creates genetically identical offspring",
      ["Eliminates all reproduction cycles","Requires two parents always","Stops all genetic mutation"],
      "Parthenogenesis produces offspring that are genetically identical (or nearly so) to the mother. That lack of variation is the disadvantage: if conditions change or a disease arrives, the whole population shares the same vulnerabilities.",
      {});
  }
]),["Parthenogenesis produces offspring from unfertilized eggs. Genetically, what are those offspring like, and why can sameness be a problem?"]);
E("bio-u1-56-q13",1,["5.6"],1,"var",varset([
  function(){
    return mcq("What best describes the lytic cycle?",
      "Host cell produces viruses then bursts",
      ["Host DNA is permanently altered","Virus remains inactive in host","Virus replicates without host"],
      "In the lytic cycle, the virus takes over the host cell and forces it to produce new viruses, and then the cell bursts (lyses), releasing them. A virus hiding in the host's DNA describes the lysogenic cycle instead, and no virus can replicate without a host.",
      {});
  }
]),["Think of the word \"lytic\": it relates to lysis, bursting. What happens to the host cell at the end of this cycle?"]);
E("bio-u1-56-q14",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Why would a lysogenic infection be harder to detect early?",
      "Virus remains inactive initially",
      ["Host cell is quickly destroyed","Virus replicates outside host","Virus stops all metabolism"],
      "In a lysogenic infection, the viral DNA sits inactive inside the host cell's DNA and is copied quietly as the cell divides. Because the virus is not actively destroying cells at first, there is little damage to notice, and the infection is harder to detect early.",
      {});
  }
]),["If the host cell is not being damaged or burst open, what signs of infection would there be early on?"]);
E("bio-u1-56-q15",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Which stage is diploid in both moss and cnidarians?",
      "Zygote stage",
      ["Gamete stage","Spore stage","Sporophyte stage"],
      "The zygote, formed when two haploid gametes fuse, is diploid in both life cycles. Gametes and spores are haploid stages, and the sporophyte generation belongs to the plant alternation-of-generations cycle rather than being a stage common to both organisms.",
      {});
  }
]),["Gametes and spores are the haploid stages in these life cycles. Which stage is guaranteed diploid in every sexual life cycle, in a moss and in a cnidarian alike?"]);
E("bio-u1-56-q16",1,["5.6"],2,"var",varset([
  function(){
    var q=mcq("According to the diagram below, where would fertilization take place?",
      "D",
      ["A","B","C"],
      "Letter D points to the ovary at the base of the pistil, which contains the ovules. Fertilization takes place inside an ovule, when a sperm nucleus delivered down the pollen tube fuses with the egg. A and B point to anthers, where pollen is produced, and C points to a filament.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-56-q16.png" alt="Diagram of a lily flower cut in half lengthwise, with four labels: A points to yellow pollen grains spilling from a split dark red sac, B points to a similar dark red sac, C points to one of the thin pale stalks, and D points to the green chamber at the base of the flower, which holds rows of small white oval bodies" style="max-width:100%;height:auto">';
    return q;
  }
]),["Fertilization in a flower happens deep inside the pistil, where the egg waits inside an ovule. Which letter points to the base of the pistil?"]);
E("bio-u1-56-q17",1,["5.6"],2,"var",varset([
  function(){
    var q=mcq("According to the diagram below, which is the sticky structure where pollen is deposited?",
      "E",
      ["A","D","F"],
      "Letter E is the stigma, the sticky top of the pistil where pollen is deposited. Its sticky surface holds the pollen grain in place so that a pollen tube can grow down toward the ovule. (A and B are anthers, D is the ovary, F is the style.)",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-56-q17.png" alt="Diagram of a lily flower cut in half lengthwise, with six labels: A points to yellow pollen grains spilling from a split dark red sac, B points to a similar dark red sac, C points to one of the thin pale stalks, D points to the green chamber at the base of the flower, E points to the knob at the top of the central green column, and F points to the central green column itself" style="max-width:100%;height:auto">';
    return q;
  }
]),["Pollen lands on the very top of the pistil, not the stalk, and not the ovary at the bottom. Which letter sits at the top of the central pistil?"]);
E("bio-u1-56-q18",1,["5.6"],1,"var",varset([
  function(){
    return mcq("How is the triploid endosperm formed?",
      "2 polar nuclei + 1 sperm nucleus",
      ["2 polar nuclei + 2 pollen grains","2 eggs + 1 sperm nucleus","2 sperm nuclei + egg"],
      "The endosperm forms from two polar nuclei (1n + 1n) plus one sperm nucleus (1n), three sets of chromosomes, which is why the endosperm is triploid (3n). It becomes the food tissue that nourishes the embryo.",
      {});
  }
]),["Do the ploidy math: the endosperm is triploid (3n). Which combination of 1n parts adds up to three sets?"]);
E("bio-u1-56-q19",1,["5.6"],1,"var",varset([
  function(){
    return mcq("What is the main function of the endosperm?",
      "Provide nutrients to embryo",
      ["Protect developing embryo","Produce pollen grains","Store genetic variation"],
      "The endosperm is the food tissue of the seed: its main function is to provide nutrients to the developing embryo until the seedling can photosynthesize on its own.",
      {});
  }
]),["A growing embryo inside a seed cannot photosynthesize yet. What does it live on, and which tissue is its packed food supply?"]);
E("bio-u1-56-q20",1,["5.6"],1,"var",varset([
  function(){
    return mcq("Why is the term double fertilization used to describe the process in plants?",
      "One sperm fertilizes egg; second fertilizes polar nuclei",
      ["Two sperm cells fertilize one egg cell","One sperm forms embryo; second forms endosperm","Two pollen grains fertilize two egg cells"],
      "The name counts the fusions: one sperm nucleus fertilizes the egg (forming the zygote, which becomes the embryo), and a second sperm nucleus fertilizes the polar nuclei (forming the endosperm). The claim that one sperm forms the embryo and the second forms the endosperm describes the products of those events rather than the two fertilization events the term names.",
      {});
  }
]),["Count the fertilization events, not the pollen grains: one sperm goes to the egg. Where does the second sperm go?"]);
E("bio-u1-56-q21",1,["5.6"],1,"var",varset([
  function(){
    return mcq("What specific benefit do organisms that reproduce sexually have that asexual organisms do not?",
      "It creates genetic variation through mechanisms like crossing over and independent assortment.",
      ["It allows for the exact replication of parental DNA to ensure traits are perfectly preserved.","It eliminates the need for fertilization, allowing reproduction to happen much faster.","It ensures that 100% of the parent's genes are passed on to every single offspring."],
      "The unique benefit of sexual reproduction is genetic variation, created through crossing over and independent assortment during meiosis and by combining two parents' genes at fertilization. Exact replication of parental DNA is what asexual reproduction does, and only half of each parent's genes pass to an offspring, not 100%.",
      {});
  }
]),["Three of the options describe speed, exact copying, or skipping fertilization. Which option names something asexual reproduction simply cannot produce?"]);
E("bio-u1-56-q22",1,["5.6"],1,"var",varset([
  function(){
    return mcq("What is a disadvantage of asexual reproduction?",
      "Low genetic variation",
      ["High genetic variation","Requires two parents","Slow reproduction rate"],
      "The main disadvantage of asexual reproduction is low genetic variation: the offspring are copies of a single parent, so the population has little raw material for adaptation when conditions change or disease strikes. Asexual reproduction is actually fast and needs only one parent.",
      {});
  }
]),["Flip the benefit of sexual reproduction around: if the advantage of sex is variety, what is asexual reproduction missing?"]);

/* ---------- 8.3 (STSE) Analyzing Natural Systems ---------- */
E("bio-u1-83-q01",1,["8.3"],2,"var",varset([
  function(){
    return mcq("A species reproduces both sexually and asexually depending on environmental conditions. What advantage does this provide?",
      "ability to balance genetic variation and rapid population growth",
      ["elimination of all genetic mutations","prevention of natural selection","reduction of chromosome number in adults"],
      "A species that can switch strategies gets both advantages: asexual reproduction for rapid population growth when conditions are favourable, and sexual reproduction to generate genetic variation when conditions become challenging. It balances rapid growth with genetic variation. Mutations and natural selection continue regardless.",
      {});
  }
]),["Think of it as holding two strategies at once: one is fast, the other is varied. What does having both let a species do that either strategy alone cannot?"]);

/* ---------- 5.7 Human Reproductive Systems ---------- */
E("bio-u1-57-q01",1,["5.7"],1,"var",varset([
  function(){
    return mcq("Which structure is the site of sperm maturation in the male reproductive system?",
      "Epididymis",
      ["Prostate gland","Seminiferous tubules","Vas deferens"],
      "Sperm finish maturing, and are stored, in the epididymis, the coiled tube on the surface of each testis. They are produced in the seminiferous tubules, but it is in the epididymis that they gain the ability to swim.",
      {});
  }
]),["Sperm are produced in one structure but stored and finished in another. Which coiled tube sitting on the testis is where they mature?"]);
E("bio-u1-57-q02",1,["5.7"],2,"var",varset([
  function(){
    var q=mcq("What is the primary function of the cells produced by structure X?",
      "Fertilization of an ovum",
      ["Buffers the pH of semen","Causes widening of hips at puberty","Maintains constant temperature"],
      "Structure X is the testis, and the cells it produces are sperm. A sperm cell's primary function is to reach and fertilize an ovum. The other options are jobs belonging to different structures: the prostate gland contributes the alkaline fluid that buffers the pH of semen, and the scrotum maintains the correct temperature for sperm production.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-57-q02.png" alt="Diagram of the male reproductive system in side view, with X pointing to an oval organ hanging in a pouch below the body" style="max-width:100%;height:auto">';
    return q;
  }
]),["Structure X is the testis. What cells does the testis produce, and what is their one essential job once they are released?"]);
E("bio-u1-57-q03",1,["5.7"],2,"var",varset([
  function(){
    var q=mcq("Which structure receives the fertilized egg and supports embryonic development?",
      "B",
      ["A","C","D"],
      "Structure B is the uterus. After fertilization in the oviduct, the developing embryo implants in the uterus, in its lining, the endometrium, and the uterus supports embryonic and fetal development until birth.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-57-q03.png" alt="Diagram of the female reproductive system in front view, with four labels: A points to one of the two curved tubes at the top, B points to the central pear-shaped organ, C points to the narrow neck at the bottom of that organ, and D points to the canal below it" style="max-width:100%;height:auto">';
    return q;
  }
]),["Follow the egg's journey past the oviduct: which labelled structure is the organ the embryo implants into and grows in for nine months?"]);
E("bio-u1-57-q04",1,["5.7"],2,"var",varset([
  function(){
    var q=mcq("Which structure helps to maintain the correct temperature of sperm?",
      "D",
      ["A","B","C"],
      "Structure D is the scrotum, the sac that holds the testes outside the body cavity. It maintains the testes at a temperature slightly below body temperature, which sperm production requires. (On this diagram: A = penis, B = seminal vesicle, C = prostate gland, D = scrotum.)",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-57-q04.png" alt="Diagram of the male reproductive system in side (sagittal) view, with four labels: A points to the external organ at the front, B points to a small gland behind the bladder, C points to the round gland below the bladder, and D points to the pouch at the bottom holding an oval organ" style="max-width:100%;height:auto">';
    return q;
  }
]),["Sperm production needs a temperature slightly below core body temperature. Which labelled structure holds the testes outside the body cavity to keep them cooler?"]);
E("bio-u1-57-q05",1,["5.7"],2,"var",varset([
  function(){
    var q=mcq("A man is producing seminal fluid that is not able to neutralize the acidity of the female reproductive tract. Which structure is being affected?",
      "C",
      ["A","B","D"],
      "Structure C is the prostate gland. Its alkaline secretion is the part of seminal fluid that neutralizes the acidity of the female reproductive tract, so a problem with the prostate best explains semen that cannot do that job. (On this diagram: A = penis, B = seminal vesicle, C = prostate gland, D = scrotum.)",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-57-q05.png" alt="Diagram of the male reproductive system in side (sagittal) view, with four labels: A points to the external organ at the front, B points to a small gland behind the bladder, C points to the round gland below the bladder, and D points to the pouch at the bottom holding an oval organ" style="max-width:100%;height:auto">';
    return q;
  }
]),["Use the same labelled diagram: the gland whose alkaline fluid does this neutralizing sits just below the bladder, wrapped around the urethra. Which letter is it?"]);
E("bio-u1-57-q06",1,["5.7"],2,"var",varset([
  function(){
    var q=mcq("Where would fertilization occur in the diagram below?",
      "A",
      ["B","C","D"],
      "Structure A is the oviduct (fallopian tube). Fertilization normally occurs in the oviduct, after the fimbriae at its open end sweep the ovulated egg inside.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-57-q06.png" alt="Diagram of the female reproductive system in front view, with four labels: A points to one of the two curved tubes at the top, B points to the thick wall of the central organ, C points to the narrow neck at the bottom of that organ, and D points to the canal below it" style="max-width:100%;height:auto">';
    return q;
  }
]),["Fertilization normally happens in the tube that carries the egg from the ovary toward the uterus. Which letter marks that tube?"]);
E("bio-u1-57-q07",1,["5.7"],2,"var",varset([
  function(){
    var q=mcq("Which indicates the location of the cervix?",
      "C",
      ["A","B","D"],
      "Structure C is the cervix, the narrow lower end of the uterus that connects the uterus to the vagina.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-57-q07.png" alt="Diagram of the female reproductive system in front view, with four labels: A points to one of the two curved tubes at the top, B points to the thick wall of the central organ, C points to the narrow neck at the bottom of that organ, and D points to the canal below it" style="max-width:100%;height:auto">';
    return q;
  }
]),["The cervix is the narrow neck at the lower end of the uterus, where the uterus opens into the vagina. Find the uterus first, then look at its base."]);
E("bio-u1-57-q08",1,["5.7"],2,"var",varset([
  function(){
    return mcq("A blockage occurs in the vas deferens of a male. Which process would be most directly affected?",
      "Movement of sperm from the testes toward the urethra",
      ["Production of testosterone by interstitial cells","Secretion of hormones by the pituitary gland","Storage of sperm within the epididymis"],
      "The vas deferens is a transport tube: it carries sperm from the testes (via the epididymis) toward the urethra. A blockage there most directly stops that movement; sperm production, storage, and hormone secretion all happen in other structures and would continue.",
      {});
  }
]),["A blockage stops traffic, not production. Trace what normally moves through the vas deferens, and in which direction."]);
E("bio-u1-57-q09",1,["5.7"],2,"var",varset([
  function(){
    return mcq("A patient has damage to the fimbriae following an infection. What reproductive complication is most likely?",
      "Difficulty capturing the ovulated egg",
      ["Inability to produce progesterone","Loss of sperm motility","Prevention of menstruation"],
      "The fimbriae sweep over the surface of the ovary and capture the ovulated egg, guiding it into the oviduct. Damaged fimbriae mean the egg may not be picked up at all, even though hormone production and menstruation are unaffected.",
      {});
  }
]),["The fimbriae are the finger-like fringe at the oviduct's open end. What do they do in the moments right after ovulation?"]);
E("bio-u1-57-q10",1,["5.7"],1,"var",varset([
  function(){
    return mcq("Which sequence correctly traces the path of sperm from production to ejaculation?",
      "seminiferous tubules \u2192 epididymis \u2192 vas deferens \u2192 urethra",
      ["epididymis \u2192 seminiferous tubules \u2192 vas deferens \u2192 urethra","seminiferous tubules \u2192 vas deferens \u2192 epididymis \u2192 urethra","vas deferens \u2192 epididymis \u2192 seminiferous tubules \u2192 urethra"],
      "The path of sperm is: seminiferous tubules (production) \u2192 epididymis (maturation and storage) \u2192 vas deferens (transport) \u2192 urethra (exit during ejaculation). That is the only sequence in that order.",
      {});
  }
]),["Sperm are made in the tubules, mature in the structure next door, then travel the long duct to the urethra. Put production, maturation, and the duct in that order."]);
E("bio-u1-57-q11",1,["5.7"],1,"var",varset([
  function(){
    return mcq("Which sequence correctly traces the path of an egg after ovulation?",
      "ovary \u2192 oviduct \u2192 uterus \u2192 cervix",
      ["ovary \u2192 uterus \u2192 oviduct \u2192 cervix","ovary \u2192 vagina \u2192 uterus \u2192 oviduct","ovary \u2192 cervix \u2192 uterus \u2192 oviduct"],
      "After ovulation the egg travels ovary \u2192 oviduct \u2192 uterus \u2192 cervix: it is captured by the fimbriae into the oviduct, transported to the uterus, and would leave through the cervix. It is the only order that puts the oviduct before the uterus.",
      {});
  }
]),["After ovulation, the egg is picked up by the oviduct first. It only reaches the uterus days later. Which sequence puts the oviduct right after the ovary?"]);
E("bio-u1-57-q12",1,["5.7"],1,"var",varset([
  function(){
    return mcq("Which describes the pathway of sperm to the egg?",
      "Vagina \u27f6 cervix \u27f6 uterus \u27f6 oviduct",
      ["Cervix \u27f6 vagina \u27f6 uterus \u27f6 oviduct","Cervix \u27f6 uterus \u27f6 oviduct \u27f6 uterus","Vagina \u27f6 cervix \u27f6 oviduct \u27f6 uterus"],
      "Sperm deposited in the vagina swim through the cervix, across the uterus, and into the oviduct, where fertilization occurs: vagina \u2192 cervix \u2192 uterus \u2192 oviduct. The other sequences backtrack or skip a structure.",
      {});
  }
]),["Sperm enter through the vagina and must finish at the oviduct, where the egg waits. Work from the entry point to the target without skipping the uterus."]);
E("bio-u1-57-q13",1,["5.7"],2,"var",varset([
  function(){
    return mcq("A physician discovers that a patient's ovaries are no longer producing progesterone. Which outcome is most likely?",
      "Menstruation would become irregular or stop",
      ["Fertilization would be significantly reduced","Ovulation would no longer occur","Oviducts would become non-functional"],
      "Progesterone produced by the ovaries (from the corpus luteum) maintains the uterine lining through the cycle. If the ovaries stop producing it, that maintenance fails and menstruation becomes irregular or stops. Ovulation is triggered by LH, not progesterone, so the claim that ovulation would no longer occur is not the direct outcome.",
      {});
  }
]),["Progesterone's main job in the cycle is maintaining the endometrium. If it disappears, what happens to the lining it was maintaining?"]);
E("bio-u1-57-q14",1,["5.7"],2,"var",varset([
  function(){
    return mcq("A patient is diagnosed with a bacterial STI. Why is early treatment important?",
      "Bacterial STIs can often be cured before reproductive damage occurs",
      ["Bacterial STIs always become viral infections","Infertility occurs immediately after infection","Treatment is only effective during adolescence"],
      "Bacterial STIs can usually be cured with antibiotics, so early treatment can eliminate the infection before it causes lasting reproductive damage such as scarring or infertility. The danger of waiting is the gradual damage, not an instant effect, and a bacterial infection does not turn into a viral one.",
      {});
  }
]),["Bacterial STIs can be cured with antibiotics. What makes catching one early so much better than catching it late?"]);
E("bio-u1-57-q15",1,["5.7"],2,"var",varset([
  function(){
    return mcq("A patient leaves an STI untreated for several years. Which long-term consequence could result?",
      "Infertility caused by reproductive system damage",
      ["Increased chromosome number","Permanent suppression of meiosis","Uncontrolled mitosis in all body cells"],
      "An STI left untreated for years can scar and block reproductive structures, for example, the oviducts or the sperm ducts, causing infertility. The other options invent effects on chromosome number, meiosis, or mitosis that STIs do not cause.",
      {});
  }
]),["Years of untreated infection means years of inflammation and scarring inside reproductive structures. What long-term ability does that scarring destroy?"]);
E("bio-u1-57-q16",1,["5.7"],1,"var",varset([
  function(){
    return mcq("Which of the following can be treated with antibiotics?",
      "Chlamydia",
      ["AIDS","Herpes","HIV"],
      "Chlamydia is a bacterial STI, so it can be treated and cured with antibiotics. AIDS and HIV are the same viral infection, and herpes is also viral: antibiotics do not work on viral infections.",
      {});
  }
]),["Antibiotics work only on bacteria. Which of these four infections is caused by a bacterium rather than a virus?"]);

/* ---------- 5.8 The Human Reproductive Cycle ---------- */
E("bio-u1-58-q01",1,["5.8"],1,"var",varset([
  function(){
    return mcq("Which hormone surge directly triggers ovulation?",
      "Luteinizing hormone (LH)",
      ["Estrogen","Follicle-stimulating hormone (FSH)","Progesterone"],
      "The surge of luteinizing hormone (LH) is the direct trigger for ovulation: it causes the mature follicle to rupture and release the egg. FSH stimulates follicle growth earlier in the cycle, and progesterone dominates afterward.",
      {});
  }
]),["One hormone spikes sharply right before the egg is released. Which surge is the trigger itself, rather than the preparation for it?"]);
E("bio-u1-58-q02",1,["5.8"],1,"var",varset([
  function(){
    return mcq("Which of the following hormones has similar effects in both males and females?",
      "Follicle stimulating hormone",
      ["Luteinizing hormone","Inhibin","Progesterone"],
      "Follicle-stimulating hormone (FSH) has similar effects in both males and females: it stimulates gamete production, follicle development in the ovaries and sperm production in the testes.",
      {});
  }
]),["Ask what each hormone does in both sexes: stimulating gamete production is a shared job, while the remaining options have more specialized roles."]);
E("bio-u1-58-q03",1,["5.8"],1,"var",varset([
  function(){
    return mcq("During the luteal phase, which structure secretes large amounts of progesterone?",
      "Corpus luteum",
      ["Follicle","Oviduct","Pituitary gland"],
      "After ovulation, the ruptured follicle becomes the corpus luteum, and during the luteal phase it secretes large amounts of progesterone to maintain the endometrium in case of pregnancy.",
      {});
  }
]),["After ovulation, the emptied follicle changes into a temporary gland. What is that structure called, and which hormone is it known for secreting?"]);
E("bio-u1-58-q04",1,["5.8"],2,"var",varset([
  function(){
    return mcq("A patient has a condition that prevents the hypothalamus from releasing normal amounts of GnRH. Which change would most likely occur?",
      "decreased FSH and LH production",
      ["decreased estrogen production only","increased ovulation frequency","increased testosterone production"],
      "GnRH from the hypothalamus is the signal that causes the pituitary gland to release FSH and LH. With too little GnRH, production of both FSH and LH decreases, a wider effect than the drop in estrogen alone.",
      {});
  }
]),["GnRH sits at the top of a chain: hypothalamus \u2192 pituitary \u2192 gonads. If the first signal drops, what happens to the pituitary hormones that depend on it?"]);
E("bio-u1-58-q05",1,["5.8"],2,"var",varset([
  function(){
    var q=mcq("Which hormone in the graph below causes the rupture of the follicle?",
      "A",
      ["B","C","D"],
      "Hormone A is the one that surges dramatically at mid-cycle: that is LH, and its surge causes the rupture of the follicle (ovulation). The other hormones on the graph rise more gradually or peak later in the cycle.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-58-q05.png" alt="Graph titled Hormone Levels During the Regular Menstrual Cycle, plotting relative hormone level across 28 days with four labelled curves: A spikes sharply at day 14, B rises after day 14 and stays high through the luteal phase, C peaks just before day 14 and rises moderately during the luteal phase, and D shows a small peak just before day 14" style="max-width:100%;height:auto">';
    return q;
  }
]),["Find the hormone whose line spikes sharply just before ovulation on the graph. That spike is the one that bursts the follicle."]);
E("bio-u1-58-q06",1,["5.8"],3,"var",varset([
  function(){
    var q=mcq("What is the most likely cause of the hormone levels observed on day 28?",
      "Successful implantation and the continued support of pregnancy",
      ["Degeneration of the corpus luteum and decreased hormone secretion","Initiation of menstruation due to declining ovarian hormones","Release of FSH triggering development of a new follicle"],
      "If no pregnancy occurs, the corpus luteum breaks down, hormone levels fall, and menstruation begins; the degeneration of the corpus luteum and the initiation of menstruation both describe that path. Hormone levels remaining high at day 28 mean something is maintaining the corpus luteum: hCG released by a successfully implanted embryo. The data point to successful implantation and the continued support of pregnancy.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-58-q06.png" alt="Graph of relative hormone concentration over 28 days for four unidentified hormones, with a dashed line at day 14: Hormone A and Hormone B rise around day 14 and remain high, Hormone C peaks just before day 14 and then falls to a low level, and Hormone D shows only a small rise around days 11 to 14" style="max-width:100%;height:auto">';
    return q;
  }
]),["At day 28 of a cycle with no pregnancy, progesterone and estrogen should be falling and menstruation starting. If the levels are staying high instead, what must be keeping the corpus luteum alive?"]);
E("bio-u1-58-q07",1,["5.8"],2,"var",varset([
  function(){
    var q=mcq("Which hormone represents follicle stimulating hormone?",
      "D",
      ["A","B","C"],
      "On this graph, hormone D represents FSH: it is elevated during the follicular phase, when it stimulates the developing follicle, while the dramatic mid-cycle surge on the graph belongs to LH.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-58-q07.png" alt="Graph of relative hormone concentration over 28 days for four unidentified hormones, with a dashed line at day 14: Hormone A and Hormone B rise around day 14 and remain high, Hormone C peaks just before day 14 and then falls to a low level, and Hormone D shows only a small rise around days 11 to 14" style="max-width:100%;height:auto">';
    return q;
  }
]),["FSH does its main work early, stimulating a follicle to grow during the first half of the cycle. Look for the hormone that rises early rather than spiking sharply at mid-cycle."]);
E("bio-u1-58-q08",1,["5.8"],2,"var",varset([
  function(){
    return mcq("A woman does not become pregnant after ovulation. Which event most directly leads to menstruation?",
      "progesterone levels decrease",
      ["hCG begins to increase","LH reaches its highest concentration","the ovary releases another egg"],
      "When no pregnancy occurs, the corpus luteum degenerates and progesterone levels decrease. Without progesterone, the endometrium cannot be maintained and is shed: that drop in progesterone is the event that most directly leads to menstruation.",
      {});
  }
]),["Menstruation is the shedding of a lining that is no longer being maintained. Which hormone's withdrawal removes that maintenance?"]);
E("bio-u1-58-q09",1,["5.8"],1,"var",varset([
  function(){
    return mcq("Which hormone slows the production of sperm?",
      "Inhibin",
      ["FSH","LH","Testosterone"],
      "Inhibin, released by the testes, feeds back to the pituitary gland and reduces FSH release, which slows the production of sperm. It is the male reproductive system's main \"slow down\" signal.",
      {});
  }
]),["The testes have a brake pedal as well as an accelerator. Which hormone do the testes release specifically to tell the pituitary to ease off?"]);

/* ---------- 5.9 Human Development ---------- */
E("bio-u1-59-q01",1,["5.9"],1,"var",varset([
  function(){
    return mcq("What is formed immediately after fertilization occurs?",
      "Zygote",
      ["Blastocyst","Embryo","Morula"],
      "Immediately after fertilization, the single diploid cell is a zygote. It then divides to form the morula and later the blastocyst: those stages come after, not first.",
      {});
  }
]),["Before there is a ball of cells or a hollow ball, there is a single cell. What is that just-fertilized single cell called?"]);
E("bio-u1-59-q02",1,["5.9"],1,"var",varset([
  function(){
    return mcq("What is the correct order of early human development after fertilization?",
      "Zygote \u2192 cleavage \u2192 morula \u2192 blastocyst",
      ["Cleavage \u2192 blastocyst \u2192 morula \u2192 zygote","Cleavage \u2192 morula \u2192 zygote \u2192 blastocyst","Zygote \u2192 morula \u2192 blastocyst \u2192 cleavage"],
      "The order is zygote \u2192 cleavage (the rapid early divisions) \u2192 morula (a solid ball of cells) \u2192 blastocyst (the hollow ball that implants). It is the only sequence that starts with the zygote and places cleavage before the morula.",
      {});
  }
]),["Start with the zygote and end with the hollow ball. Between them come rapid division first, then a solid ball of cells."]);
E("bio-u1-59-q03",1,["5.9"],1,"var",varset([
  function(){
    return mcq("What occurs during cleavage?",
      "Cells divide without growth",
      ["Cell size increases rapidly","Germ layers form directly","Organs begin forming"],
      "Cleavage is a series of rapid mitotic divisions without growth: the zygote is partitioned into more and more, smaller and smaller cells. Germ layers and organs form later, at gastrulation and beyond.",
      {});
  }
]),["During cleavage the embryo is not growing: it is subdividing. If the total size stays the same while the number of cells doubles, what happens to each cell?"]);
E("bio-u1-59-q04",1,["5.9"],2,"var",varset([
  function(){
    var q=mcq("What process is occurring in the diagram below?",
      "Cleavage",
      ["Differentiation","Gastrulation","Neurulation"],
      "The diagram shows a mulberry-like solid ball of cells, a morula, produced by cleavage, the rapid early divisions of the zygote. Differentiation, gastrulation, and neurulation all occur after this stage.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-59-q04.png" alt="Scanning electron micrograph of an early embryo: a solid ball of many rounded cells" style="max-width:100%;height:auto">';
    return q;
  }
]),["The image shows a solid ball of many small, similar cells, with no layers or organs yet. Which early process produces a ball like that?"]);
E("bio-u1-59-q05",1,["5.9"],2,"var",varset([
  function(){
    var q=mcq("Which structure implants into the endometrium?",
      "B",
      ["A","C","D"],
      "Structure B is the blastocyst, the hollow ball of cells. The blastocyst is the stage that implants into the endometrium; on the diagram, A is the morula, C is the gastrula, and D is a later embryo.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-59-q05.png" alt="Diagram of embryonic development as a sequence: a fertilized egg divides into two cells, then four cells, then stages labelled A (a solid ball of cells), B (a hollow ball of cells), C (a layered cup-shaped stage), and D (a formed embryo), ending with an adult mouse" style="max-width:100%;height:auto">';
    return q;
  }
]),["Use the sequence diagram: implantation happens at the hollow-ball stage, before any germ layers form. Which letter sits on that stage?"]);
E("bio-u1-59-q06",1,["5.9"],2,"var",varset([
  function(){
    var q=mcq("Which of the following is the point at which gastrulation occurs?",
      "C",
      ["A","B","D"],
      "Point C is the gastrula: the stage where the embryo folds inward and gastrulation establishes the primary germ layers, ectoderm, mesoderm, and endoderm.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-59-q06.png" alt="Diagram of embryonic development as a sequence: a fertilized egg divides into two cells, then four cells, then stages labelled A (a solid ball of cells), B (a hollow ball of cells), C (a layered cup-shaped stage), and D (a formed embryo), ending with an adult mouse" style="max-width:100%;height:auto">';
    return q;
  }
]),["On the same sequence, gastrulation is where the ball of cells folds inward and the germ layers begin to form. Which letter shows that in-folding?"]);
E("bio-u1-59-q07",1,["5.9"],1,"var",varset([
  function(){
    return mcq("Which germ layer gives rise primarily to the nervous system and skin?",
      "Ectoderm",
      ["Endoderm","Mesoderm","Trophoblast"],
      "The ectoderm, the outer germ layer, gives rise primarily to the nervous system and the skin. The mesoderm forms muscle, bone, and blood, while the endoderm lines the digestive and respiratory tracts. The trophoblast is not a germ layer: it helps form the placenta.",
      {});
  }
]),["Link the layer to its position: the outer layer covers the outside of the body, and also builds the body's signalling system."]);
E("bio-u1-59-q08",1,["5.9"],2,"var",varset([
  function(){
    return mcq("A mutation disrupts mesoderm development during gastrulation. Which structure would most likely be affected?",
      "muscle tissue",
      ["digestive tract lining","nervous tissue","skin epidermis"],
      "Muscle tissue develops from the mesoderm, the middle germ layer, the same layer that forms bone, blood, and the heart. A disruption of the mesoderm would therefore affect muscle tissue of the options given.",
      {});
  }
]),["Run the derivatives: gut lining belongs to the endoderm, and nerves and skin to the ectoderm. What major tissue group is left for the middle layer?"]);
E("bio-u1-59-q09",1,["5.9"],2,"var",varset([
  function(){
    return mcq("A researcher observes a developing embryo with a beating heart but no evidence of viability outside the uterus. Which trimester is most likely represented?",
      "First trimester",
      ["Early fourth trimester","Late second trimester","Third trimester"],
      "The heart begins beating during the first trimester, but the fetus is not viable outside the uterus until much later (late second trimester onward). A beating heart with no viability points to the first trimester, and there is no fourth trimester.",
      {});
  }
]),["Use two milestones: a heartbeat appears very early in development, while viability, surviving outside the uterus, is not reached until much later. Where does \"beating heart but not viable\" land?"]);
E("bio-u1-59-q10",1,["5.9"],1,"var",varset([
  function(){
    return mcq("A developing fetus receives oxygen and nutrients through which pathway?",
      "placenta \u2192 umbilical cord \u2192 fetus",
      ["amnion \u2192 chorion \u2192 fetus","uterus \u2192 cervix \u2192 fetus","yolk sac \u2192 trophoblast \u2192 fetus"],
      "Oxygen and nutrients pass from the mother's blood in the placenta and then travel to the fetus through the umbilical cord: placenta \u2192 umbilical cord \u2192 fetus. The amnion is a protective sac, not an exchange route.",
      {});
  }
]),["There is one organ built specifically for exchange between mother and fetus, and one cord connecting that organ to the fetus. Chain them in order."]);
E("bio-u1-59-q11",1,["5.9"],1,"var",varset([
  function(){
    return mcq("Why is the amnion important in development?",
      "Protects the embryo with fluid",
      ["Forms digestive system","Forms neural tissue","Supplies oxygen directly"],
      "The amnion forms the fluid-filled sac that surrounds the embryo. The amniotic fluid inside cushions and protects the embryo, keeping it moist and buffered against shocks and temperature changes. It does not form organs or supply oxygen.",
      {});
  }
]),["The amnion is the innermost membrane, forming the sac immediately around the embryo. What fills that sac, and what does it do for the embryo inside?"]);
E("bio-u1-59-q12",1,["5.9"],1,"var",varset([
  function(){
    return mcq("What is a primary function of the placenta",
      "Gas and nutrient exchange",
      ["Germ layer formation","Neural tube formation","Zygote division control"],
      "The placenta's primary function is gas and nutrient exchange between the mother's and the fetus's blood (together with waste removal and hormone production). It does not form germ layers or control the zygote's divisions.",
      {});
  }
]),["Only one option is about exchange between two blood supplies. The others are events of earlier developmental stages."]);
E("bio-u1-59-q13",1,["5.9"],1,"var",varset([
  function(){
    return mcq("Which event results in identical twins?",
      "A single fertilized egg splits into two during early development",
      ["A fertilized egg into a single embryo that does not separate","Two separate eggs are each fertilized by different sperm cells","Two sperm fertilize the same egg cell at the same time"],
      "Identical (monozygotic) twins result when a single fertilized egg splits into two during early development, so both embryos share the same genome. Two separate eggs fertilized by different sperm produce fraternal twins instead.",
      {});
  }
]),["Identical means the same genome, so both twins must come from the same fertilized egg. Which option starts with one egg and one sperm?"]);
E("bio-u1-59-q14",1,["5.9"],2,"var",varset([
  function(){
    var q=mcq("Which combination would result in fraternal twins?",
      "D",
      ["A","B","C"],
      "Fraternal (dizygotic) twins develop when two separate eggs are released and each is fertilized by its own sperm, row D of the table: 2 fertilized eggs and 2 sperm. A single egg fertilized once, even if it later splits, gives identical twins.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-59-q14.png" alt="Table with columns Number of Fertilized Eggs and Number of Sperm: row a: 1 and 1; row b: 1 and 2; row c: 2 and 1; row d: 2 and 2" style="max-width:100%;height:auto">';
    return q;
  }
]),["Fraternal twins come from two separate fertilizations. Count what that requires in the table: how many eggs, and how many sperm to fertilize them?"]);
E("bio-u1-59-q15",1,["5.9"],1,"var",varset([
  function(){
    return mcq("During the dilation stage of parturition, what is occurring?",
      "Cervical opening increases to allow passage of the baby",
      ["Milk production begins","Placental tissues are expelled","The umbilical cord detaches"],
      "During the dilation stage, contractions push the baby against the cervix and the cervical opening widens (dilates) to allow passage of the baby. Expulsion of the baby and delivery of the placenta are the second and third stages.",
      {});
  }
]),["The three stages of labour are named for what is happening: opening, pushing out, and delivering the afterbirth. Which stage is the opening?"]);
E("bio-u1-59-q16",1,["5.9"],2,"var",varset([
  function(){
    return mcq("Why is oxytocin considered part of a positive feedback mechanism during labor?",
      "Oxytocin increases contractions, which increases oxytocin.",
      ["Oxytocin decreases contractions as labor progresses.","Oxytocin inhibits cervical dilation.","Oxytocin suppresses uterine muscle activity"],
      "Oxytocin works through positive feedback: it increases uterine contractions, and the contractions (with the stretching of the cervix) trigger the release of more oxytocin, which strengthens contractions further until birth. A negative feedback loop would damp the process down rather than build it up.",
      {});
  }
]),["Positive feedback amplifies instead of correcting. Check which option describes a loop in which the response makes the stimulus stronger."]);
E("bio-u1-59-q17",1,["5.9"],1,"var",varset([
  function(){
    return mcq("What best describes a teratogen?",
      "A factor that harms fetal development",
      ["A hormone that supports pregnancy","A nutrient needed for growth","A structure that protects the fetus"],
      "A teratogen is any factor, such as alcohol, cigarette smoke, certain medications, infectious diseases, or radiation, that harms fetal development, especially during the embryonic stage when organs are forming.",
      {});
  }
]),["Three options describe things a healthy pregnancy needs or uses. Which term names anything, a drug, a chemical, an infection, radiation, that can damage development?"]);
E("bio-u1-59-q18",1,["5.9"],2,"var",varset([
  function(){
    return mcq("A pregnant individual consumes alcohol regularly during embryonic development. Why is this particularly concerning?",
      "alcohol is a known teratogen that interferes with development",
      ["alcohol can prevent implantation","alcohol causes all fetal cells to stop dividing","alcohol triggers premature parturition in all pregnancies"],
      "Alcohol is a known teratogen, and the embryonic stage is when organs and body systems are forming. Exposure during that window can interfere with normal development, as in fetal alcohol spectrum disorder, which is why regular drinking during embryonic development is particularly concerning.",
      {});
  }
]),["Why does the timing matter? The embryonic stage is when organs are being built. What does a harmful agent do to structures that are under construction?"]);
E("bio-u1-59-q19",1,["5.9"],1,"var",varset([
  function(){
    return mcq("A pregnant person is exposed to cigarette smoke regularly. What is a possible effect on fetal development?",
      "Decreased oxygen supply",
      ["Increased fetal growth","Reduced maternal blood flow","Shortened pregnancy length"],
      "Cigarette smoke reduces the oxygen supply available to the fetus: carbon monoxide in the smoke binds to hemoglobin in place of oxygen, and nicotine constricts blood vessels. The keyed effect is a decreased oxygen supply to the developing fetus.",
      {});
  }
]),["Smoke affects the cargo that the blood carries. What does the fetus receive less of when the blood carries carbon monoxide in place of some of its usual load?"]);

/* ---------- 8.4 (STSE) Prenatal Screening Technologies ---------- */
E("bio-u1-84-q01",1,["8.4"],2,"var",varset([
  function(){
    return mcq("A physician recommends cell-free DNA screening rather than amniocentesis as an initial test. What is one advantage?",
      "It is less invasive and poses less risk to the pregnancy",
      ["It directly repairs genetic abnormalities","It eliminates the need for follow-up testing","It provides a complete fetal genome sequence"],
      "Cell-free DNA screening analyzes fragments of fetal DNA found in the mother's blood, so it is less invasive and poses less risk to the pregnancy than amniocentesis, which inserts a needle into the amniotic sac. It is a screening test: it neither repairs abnormalities nor reads the complete fetal genome, and a positive result still needs follow-up.",
      {});
  }
]),["Compare how the two tests get fetal material: one analyzes DNA fragments already floating in the mother's blood, the other uses a needle into the uterus. Which approach avoids the needle?"]);
E("bio-u1-84-q02",1,["8.4"],1,"var",varset([
  function(){
    return mcq("Why might families make different decisions after the same screening result?",
      "Personal values differ",
      ["Fetal development differs","Genetic information changes","Medical options disappear"],
      "Families make different decisions after the same screening result because personal values differ: beliefs, circumstances, and views about risk shape what each family chooses. The genetic information itself does not change from one family to the next.",
      {});
  }
]),["The result is the same and the medicine is the same. What differs from family to family when a hard decision follows a result?"]);
E("bio-u1-84-q03",1,["8.4"],2,"var",varset([
  function(){
    var q=mcq("What prenatal screening technology is shown?",
      "Amniocentesis",
      ["Chorionic villi sampling","Fetoscopy","Ultrasound"],
      "The image shows a needle drawing amniotic fluid from around the fetus: amniocentesis. Ultrasound uses sound waves and involves no needle, and chorionic villi sampling takes tissue from the placenta rather than fluid.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u1-84-q03.png" alt="Diagram of a prenatal procedure: a side view of a pregnant abdomen with a needle inserted through the abdominal wall into the amniotic sac around the fetus to withdraw fluid" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the instrument and where it goes: a needle through the abdomen into the amniotic sac, drawing out fluid. Which test samples amniotic fluid?"]);

/* ---------- 5.10 Reproductive Technologies ---------- */
E("bio-u1-510-q01",1,["5.10"],1,"var",varset([
  function(){
    return mcq("What is infertility?",
      "Inability to conceive after time",
      ["Lack of sexual development","Permanent loss of all hormones","Reduced physical growth"],
      "Infertility is the inability to conceive after a period of trying (clinically, about a year of regular attempts). It is a conception problem, not a failure of sexual development or a permanent loss of hormones.",
      {});
  }
]),["Infertility is about conception not happening over a period of trying, not about development, growth, or hormones disappearing."]);
E("bio-u1-510-q02",1,["5.10"],1,"var",varset([
  function(){
    return mcq("Which condition can contribute to male infertility?",
      "Blocked sperm ducts",
      ["Increased testosterone","Normal sperm production","Regular hormone levels"],
      "Blocked sperm ducts contribute to male infertility because sperm cannot travel from the testes to be ejaculated, even if they are produced normally. Normal sperm production and regular hormone levels are healthy findings, not causes of infertility.",
      {});
  }
]),["If sperm cannot get out, production can be perfectly normal while delivery fails. Which option blocks the delivery route?"]);
E("bio-u1-510-q03",1,["5.10"],1,"var",varset([
  function(){
    return mcq("Which prevents sperm cells from reaching an egg?",
      "Blocked oviduct",
      ["Damaged eggs","Endometriosis","Low sperm count"],
      "A blocked oviduct prevents sperm cells from reaching an egg: the oviduct is the passage the sperm must travel and the site where fertilization normally occurs, so a blockage cuts off the route for both gametes.",
      {});
  }
]),["Think plumbing on the female side: which structure, if blocked, strands the sperm and the egg on opposite sides of the blockage?"]);
E("bio-u1-510-q04",1,["5.10"],2,"var",varset([
  function(){
    return mcq("A couple is unable to conceive because the male partner produces very few sperm cells. Which technology would most directly address this challenge?",
      "Artificial insemination",
      ["Cryopreservation","Hormonal contraception","Surrogacy"],
      "With a very low sperm count, artificial insemination most directly addresses the challenge: collected sperm are placed directly into the uterus, shortening the distance the few sperm must travel to reach the egg. Cryopreservation stores cells for later, and surrogacy replaces the carrier: different problems.",
      {});
  }
]),["The problem is numbers, not the uterus or timing. Which technology concentrates the few available sperm and places them where they are needed?"]);
E("bio-u1-510-q05",1,["5.10"],1,"var",varset([
  function(){
    return mcq("Which reproductive technology involves freezing reproductive cells or tissues for future use?",
      "Cryopreservation",
      ["Artificial insemination","Superovulation","Surrogacy"],
      "Cryopreservation is the freezing of reproductive cells or tissues, sperm, eggs, or embryos, for future use. The other technologies work with fresh material at the time of treatment.",
      {});
  }
]),["Freezing is the defining act. Which technology's name connects to \"cryo,\" the prefix for cold?"]);
E("bio-u1-510-q06",1,["5.10"],2,"var",varset([
  function(){
    return mcq("A woman has healthy ovaries but cannot carry a pregnancy due to uterine damage. Which reproductive technology would most directly address this situation?",
      "Surrogacy",
      ["Artificial insemination","Cryopreservation","In vitro fertilization"],
      "Surrogacy is the match: her ovaries are healthy, so her own eggs can be used, but uterine damage means she cannot carry a pregnancy: a surrogate carries it for her. IVF by itself still requires a uterus able to sustain a pregnancy.",
      {});
  }
]),["Break the problem in two: her eggs and fertilization are fine; carrying the pregnancy is not. Which option moves the pregnancy to someone who can carry it?"]);
E("bio-u1-510-q07",1,["5.10"],2,"var",varset([
  function(){
    return mcq("Which technology is the best choice for a woman with infrequent ovulation that wants to carry her own child?",
      "Superovulation",
      ["artificial insemination","Cryopreservation","Surrogacy"],
      "Superovulation uses fertility drugs to stimulate the ovaries to release eggs (often several at once), which directly addresses infrequent ovulation, and she can still carry her own child. The other options either store cells for later or replace the carrier.",
      {});
  }
]),["She ovulates too rarely, but she can carry a pregnancy herself. Which technology's job is to make the ovaries release eggs?"]);
E("bio-u1-510-q08",1,["5.10"],2,"var",varset([
  function(){
    return mcq("A fertility clinic transfers several embryos during IVF. What is a potential consequence of this practice?",
      "Increased likelihood of multiple births",
      ["Decreased chance of implantation","Increased fertilization rejection","Suppression of embryo development"],
      "Transferring several embryos raises the chance that two or more of them implant and develop, so a multiple birth, twins, triplets, or more, becomes more likely. That is a well-known consequence of IVF practice.",
      {});
  }
]),["More embryos transferred means more chances that more than one of them implants. What family outcome becomes more likely?"]);

/* ---------- 8.5 (STSE) Making the Case ---------- */
E("bio-u1-85-q01",1,["8.5"],1,"var",varset([
  function(){
    return mcq("Which conception prevention method works primarily by creating a physical barrier between sperm and egg?",
      "Female condoms",
      ["Birth control pills","IUDs","Surgical sterilization"],
      "Female condoms work primarily as a physical barrier, lining the vagina so that sperm cannot reach the egg. Birth control pills act hormonally, and surgical sterilization blocks the tubes permanently.",
      {});
  }
]),["A barrier method physically blocks the meeting of sperm and egg. Which option works like a lining rather than like hormones or surgery?"]);
E("bio-u1-85-q02",1,["8.5"],2,"var",varset([
  function(){
    return mcq("A patient wants a highly effective but reversible form of contraception. Which option would best meet this goal?",
      "Contraceptive implant",
      ["Spermicidal foam","Tubal ligation","Vasectomy"],
      "A contraceptive implant is highly effective, among the most effective methods available, and fully reversible: it can be removed and fertility returns. Tubal ligation and vasectomy are permanent, and spermicidal foam on its own is far less effective.",
      {});
  }
]),["Two requirements at once: very effective AND reversible. Cross off the permanent surgeries first, then compare what remains."]);
E("bio-u1-85-q03",1,["8.5"],1,"var",varset([
  function(){
    return mcq("Which method best reduces both STI transmission and pregnancy risk for sexually active people of reproductive age?",
      "Condom",
      ["Abstinence","Implant","IUD"],
      "The condom is the only listed method that reduces both risks: as a physical barrier it prevents pregnancy and blocks the exchange of fluids that transmits STIs. Implants and IUDs are excellent contraception but offer no protection against STIs.",
      {});
  }
]),["Two requirements: prevent pregnancy AND block infections. Note the stem specifies sexually active people, which sets one option aside; of the rest, only one forms a barrier that pathogens cannot cross."]);
E("bio-u1-85-q04",1,["8.5"],2,"var",varset([
  function(){
    return mcq("A couple has completed their family and wants a permanent, highly effective contraceptive option. Which is most appropriate?",
      "Tubal ligation",
      ["Condom","Hormonal implant","Withdrawal"],
      "Tubal ligation is the permanent, highly effective option: the oviducts are cut or blocked so that the egg and sperm cannot meet. Condoms and implants are temporary methods, and withdrawal is unreliable.",
      {});
  }
]),["The couple's family is complete and they used the word \"permanent.\" Which option is a one-time surgical solution?"]);

/* ---------- 8.7 (STSE) Funding Decisions ---------- */
E("bio-u1-87-q01",1,["8.7"],3,"var",varset([
  function(){
    return mcq("A region experiences rapid population growth and shortages of food and housing. Which argument would most strongly support funding population-control research?",
      "reducing population growth may lessen pressure on limited resources",
      ["birth rates should always be reduced regardless of circumstances","controlling population growth eliminates all environmental problems","research funding should be distributed randomly among projects"],
      "The strongest argument is that reducing population growth may lessen pressure on limited resources such as food and housing. The other options claim absolutes (\"always,\" \"eliminates all environmental problems\") or abandon reasoned funding decisions altogether.",
      {});
  }
]),["If food and housing are already short, what pressure would slower population growth relieve? Look for the option that claims a partial, realistic effect rather than a total fix."]);

/* ---------- 8.6 (STSE) Risks and Benefits to Society ---------- */
E("bio-u1-86-q01",1,["8.6"],2,"var",varset([
  function(){
    return mcq("Which of the following is NOT a risk of reproductive technology use?",
      "Permitting infertile couples to reproduce",
      ["Ethical debates over embryo selection","Higher risk of pre-term births","Potential maternal complications"],
      "Permitting infertile couples to reproduce is the purpose and the benefit of reproductive technology, not a risk of it. The genuine risks in the list are the ethical debates over embryo selection, the higher risk of pre-term births, and potential maternal complications.",
      {});
  }
]),["Three options name genuine costs or concerns of reproductive technology. One option describes the whole point of the technology: is achieving the goal itself a \"risk\"?"]);
E("bio-u1-86-q02",1,["8.6"],3,"var",varset([
  function(){
    return mcq("The government is considering increased funding for IVF programs. Which argument best reflects a potential benefit to society?",
      "IVF provides additional reproductive options for families",
      ["IVF completely eliminates infertility","IVF guarantees healthy offspring","IVF removes the need for adoption"],
      "The defensible benefit is that IVF provides additional reproductive options for families who could not otherwise conceive. It does not completely eliminate infertility, guarantee healthy offspring, or remove the need for adoption; the other three claims all overclaim.",
      {});
  }
]),["A strong funding argument claims a real benefit without overpromising. Which option claims something modest and true rather than a guarantee?"]);

/* ---------- 8.8 (STSE) Stem Cells and Society ---------- */
E("bio-u1-88-q01",1,["8.8"],1,"var",varset([
  function(){
    return mcq("Which type of stem cell is typically classified as pluripotent?",
      "embryonic stem cell",
      ["adult stem cell","muscle stem cell","neural stem cell"],
      "Embryonic stem cells are classified as pluripotent: they can develop into almost every cell type of the body. Adult stem cells, such as muscle or neural stem cells, are more limited in range (multipotent).",
      {});
  }
]),["\"Pluri-\" means many: these cells can become almost any cell type in the body. Which source produces cells with that range, very early in development?"]);
E("bio-u1-88-q02",1,["8.8"],2,"var",varset([
  function(){
    return mcq("How do multipotent stem cells differ from pluripotent stem cells?",
      "multipotent cells form a more limited range of cell types",
      ["multipotent cells cannot divide","pluripotent cells occur only in adults","pluripotent cells produce gametes"],
      "Multipotent stem cells can form only a more limited range of cell types, typically the cell types of their own tissue, while pluripotent cells can form nearly all body cell types. Both kinds can divide; the difference is range, and pluripotent cells come from embryos, not adults.",
      {});
  }
]),["Compare the ranges: both types can divide and specialize, but one has a much shorter list of cell types it can become. Which type has the shorter list?"]);
E("bio-u1-88-q03",1,["8.8"],3,"var",varset([
  function(){
    return mcq("Researchers are testing stem-cell-based therapies for patients with spinal cord injuries. Which argument provides the strongest justification for continued funding of this research?",
      "Regaining lost function in damaged cells",
      ["Elimination of mutations from all body cells","Prevention of specialized cell formation","Reduction of genetic diversity in populations"],
      "The strongest justification is the therapeutic goal itself: regaining lost function in damaged cells, for spinal cord injury patients, potentially restoring movement or sensation. The other options are impossible claims (eliminating all mutations), the opposite of how stem cells work (preventing specialization), or outcomes nobody is seeking.",
      {});
  }
]),["Judge each argument by whether it names a benefit stem cells could actually deliver to these patients. Which one states a real therapeutic goal?"]);

/* ---------- Constructed-Response Practice ---------- */
E("bio-u1-cr-q01",1,["5.1", "5.4"],2,"var",varset([
  function(){
    return textq("A skin cell and a cell in the testes both divide, but the two divisions serve different purposes. Compare mitotic division in the skin cell with meiotic division in the testes cell. In your answer, refer to: where each division occurs, the number of daughter cells produced, the chromosome number of the daughter cells compared with the parent cell, and whether the daughter cells are genetically identical to the parent cell.",
      ["Mitosis in skin (body) cells produces two genetically identical diploid daughter cells; meiosis in the testes produces four genetically different haploid daughter cells","Mitosis produces 2 identical diploid daughter cells; meiosis produces 4 different haploid daughter cells"],
      "<b>Model answer:</b> Mitosis occurs in somatic (body) cells such as skin cells, where it serves growth and repair. One parent cell produces two daughter cells, each diploid (46 chromosomes in humans), with the same chromosome number as the parent, and the daughter cells are genetically identical to the parent. Meiosis occurs only in germ cells, such as those in the testes, where it produces gametes. One parent cell produces four daughter cells, each haploid (23 chromosomes), half the parent's chromosome number, and the daughter cells are genetically different from the parent and from each other because of crossing over and independent assortment.<br><br><b>Marking points:</b> 1 mark for location/purpose (mitosis in body cells for growth and repair; meiosis in gonads/germ cells for gamete production). 1 mark for daughter cell number (2 vs. 4). 1 mark for chromosome number (diploid/same as parent vs. haploid/half). 1 mark for genetic identity (identical vs. genetically varied, with a cause such as crossing over or independent assortment).",
      {});
  }
]));
E("bio-u1-cr-q02",1,["5.8"],3,"var",varset([
  function(){
    return textq("A researcher measures two hormones in a volunteer's blood over one 28-day menstrual cycle. Hormone A stays low for the first 13 days, spikes sharply to its highest level on day 14, then falls again. Hormone B stays low until about day 15, rises, remains high until day 26, and then falls. (a) Identify hormone A and hormone B. (b) Explain which event hormone A's spike triggers, and explain why hormone B falls around day 26 when no pregnancy occurs.",
      ["Hormone A is LH (luteinizing hormone) and hormone B is progesterone","A is LH and B is progesterone"],
      "<b>Model answer:</b> (a) Hormone A is luteinizing hormone (LH); hormone B is progesterone. (b) The sharp LH spike on day 14 triggers ovulation, the rupture of the mature follicle and release of the egg. After ovulation, the emptied follicle becomes the corpus luteum, which secretes the progesterone that keeps hormone B high. If no pregnancy occurs, there is no hCG to maintain the corpus luteum, so it degenerates around day 26; progesterone production stops, hormone B falls, and without progesterone support the endometrium is shed as menstruation.<br><br><b>Marking points:</b> 1 mark for identifying A as LH and B as progesterone. 1 mark for linking the LH spike to ovulation (follicle rupture/egg release). 1 mark for identifying the corpus luteum as the source of progesterone after ovulation. 1 mark for explaining the fall: no hCG in the absence of pregnancy \u2192 corpus luteum degenerates \u2192 progesterone drops (\u2192 menstruation).",
      {});
  }
]));
E("bio-u1-cr-q03",1,["8.4"],3,"var",varset([
  function(){
    return textq("A couple is offered prenatal screening. One partner wants to start with cell-free DNA screening; the other wants to go straight to amniocentesis \"to be certain.\" Evaluate the choice: give one advantage of each approach, then make a recommendation and support it with a reason.",
      ["Start with cell-free DNA screening: it is non-invasive, and follow up with amniocentesis only if the screening result is high-risk","Go straight to amniocentesis: it gives a diagnostic result rather than a probability"],
      "<b>Model answer:</b> Cell-free DNA screening analyzes fetal DNA fragments in the mother's blood, so it is non-invasive and carries no risk to the pregnancy; however, it is a screening test: it gives probabilities, not a diagnosis, and a high-risk result still needs confirmation. Amniocentesis tests fetal cells from the amniotic fluid, so it can give a diagnostic (certain) result, but it is invasive and carries a small risk of miscarriage. A reasonable recommendation is to start with cell-free DNA screening, since it provides useful risk information with no risk to the pregnancy, and to follow up with amniocentesis only if the screening result is high-risk, reserving the invasive test for the cases where diagnostic certainty is actually needed. (The reverse recommendation can also earn full credit if it is supported with a valid reason, such as the family's need for a definite answer.)<br><br><b>Marking points:</b> 1 mark for an accurate advantage of cell-free DNA screening (non-invasive/no risk to pregnancy; accept \"can be done early\" if linked to the blood-test nature of the test). 1 mark for an accurate advantage of amniocentesis (diagnostic certainty rather than probability). 1 mark for a clear recommendation supported by a reason that weighs risk against certainty (either direction acceptable if the reasoning is sound).",
      {});
  }
]));

/* ----- bank-u2.js ----- */
// CRMARKS: bio-u2-62-cr1=4
// CRMARKS: bio-u2-64-cr2=4
// Biology 3201 Unit 2 bank: Genetic Basis of Heredity
// Converted from the two Unit 2 review books on nlesd.h5p.com: the
// Mid-Course book (indicators 6.1 to 6.4, STSE 9.1 and 9.2, and the
// Constructed-Response Practice chapter) and the Final Review book
// for Unit 2: Molecular Genetics (a DNA Discovery chapter coded 6.1,
// then 6.5 to 6.8 and the shared 6.9/6.10 chapter). Stems, options
// and keys are the books', each book Solution panel is the worked
// solution and each Hint panel is the first hint stage; the books'
// Help panels (video pointers) have no slot in the app and are not
// carried. Levels are the Nov 12, 2026 tagging pass
// (bio3201-levels.json). Conversion fixes, kept minimal: em dashes
// become commas, colons or periods (house style); the final book's
// solutions end with a checkmark echo of the key, which is stripped
// because the shell already identifies the correct option; four
// solutions that pointed at the book's option letters (6.2 q02 and
// q16 in this file's numbering, 6.4 q01, 6.7 q09) now name the
// options' content, because the shell re-sorts option order; and
// the two mandated repairs from bio3201-fixes.json are applied
// (6.7 q06: corrected solution; 6.8 q03: the keyed option reads
// AAG AGA CCC, the unique silent mutation, with a corrected
// solution). Entries for 6.5 to 6.10 are flagged postMid at the
// end of this file: the mid-course table of specifications stops
// at 6.4, so the Mid preset holds them out.

/* ---------- 6.1 Mendel and the Concept of the Gene ---------- */

E("bio-u2-61-q01",2,["6.1"],1,"var",varset([
  function(){
    return mcq("Which observation from Mendel's pea plant experiments led him to propose the idea of dominant and recessive traits?",
      "F1 offspring displayed only one of the parental traits",
      ["F1 offspring displayed both parental traits equally","F2 offspring were genetically identical to the parents","Pea plants produced only one type of gamete"],
      "When Mendel crossed pure-breeding plants with contrasting traits, every F1 offspring showed only one parent's trait. The trait that appeared he called dominant; the one that was hidden (but returned in the F2) he called recessive.",
      {});
  }
]),["Think about what the first-generation (F1) offspring of a cross between two pure-breeding parents actually looked like. Did both parents' traits show up, or did one seem to disappear?"]);

E("bio-u2-61-q02",2,["6.1"],2,"var",varset([
  function(){
    return mcq("A 3:1 ratio in offspring from a monohybrid cross is best explained by:",
      "Dominance",
      ["Incomplete dominance","Independent assortment","Mutation"],
      "In a monohybrid cross (Aa × Aa), the genotypes come out 1 AA : 2 Aa : 1 aa. Because A is dominant, both AA and Aa offspring show the dominant trait, giving 3 showing the dominant trait for every 1 showing the recessive trait, a 3:1 phenotypic ratio explained by dominance.",
      {});
  }
]),["In a cross between two heterozygotes, three quarters of the offspring show one trait and one quarter shows the other. Which idea explains why the larger group all look the same even though they carry two different genotypes?"]);

E("bio-u2-61-q03",2,["6.1"],1,"var",varset([
  function(){
    return mcq("Which characteristic made pea plants a good organism for Mendel's studies?",
      "They have short generation times and easily controlled crosses",
      ["Their chromosomes are easily visible without a microscope","They produce only one offspring per generation","They reproduce only asexually"],
      "Pea plants grow and reproduce quickly, producing many offspring per cross, and their flowers let Mendel control pollination, he could self-pollinate plants or cross specific parents. That combination made it possible to track traits over several generations in a short time.",
      {});
  }
]),["Mendel needed many generations of results in a few years, and he needed to control exactly which plants were crossed. Which option gives him both?"]);

E("bio-u2-61-q04",2,["6.1"],2,"var",varset([
  function(){
    return mcq("If Mendel had only observed the F1 generation and never produced an F2 generation, what major conclusion would have been difficult to support?",
      "Recessive traits can reappear in later generations",
      ["Organisms inherit one allele from each parent","Some traits are dominant over others","Traits are controlled by genes"],
      "The F1 showed only the dominant trait, so on F1 evidence alone the recessive trait might have been destroyed or blended away. It was the F2, where the recessive trait reappeared in about one quarter of the offspring, that proved the recessive factor was still present, unchanged, in the F1 plants.",
      {});
  }
]),["In the F1, the recessive trait seems to vanish completely. What did the F2 generation show that the F1 never could?"]);

/* ---------- 6.1 DNA Discovery (from the final review book) ---------- */

E("bio-u2-61-q05",2,["6.1"],1,"var",varset([
  function(){
    return mcq("What contribution did Friedrich Miescher make to the understanding of heredity?",
      "He discovered a substance called nuclein in cell nuclei.",
      ["He identified DNA as the transforming principle.","He proposed the double-helix structure of DNA.","He showed that DNA replication is semi-conservative."],
      "Friedrich Miescher was the first to isolate DNA (called nuclein ) from white blood cells. He found it in the cell nucleus, which is where it gets its name. He didn't yet know its function, but proved a unique substance existed in the nucleus.",
      {});
  }
]),["Miescher found a substance inside cell nuclei that was not protein."]);

E("bio-u2-61-q06",2,["6.1"],1,"var",varset([
  function(){
    return mcq("How did Phoebus Levene contribute to the understanding of DNA structure?",
      "He identified the basic components of nucleotides.",
      ["He discovered the relationship between genes and proteins.","He proved DNA carried hereditary information","He used X-ray diffraction to study DNA."],
      "Levene identified the three components of a nucleotide: a phosphate group, a five-carbon sugar (ribose or deoxyribose), and a nitrogenous base. He also identified the different sugars in RNA (ribose) and DNA (deoxyribose).",
      {});
  }
]),["Levene broke nucleotides down into their three parts. What are the three chemical components that make up a single nucleotide?"]);

E("bio-u2-61-q07",2,["6.1"],1,"var",varset([
  function(){
    return mcq("What conclusion can be drawn from Griffith's transformation experiment?",
      "Genetic information can be transferred between cells.",
      ["Bacteria reproduce through mitosis.","Proteins are the hereditary material.","Viruses can alter bacterial DNA."],
      "Griffith's transformation experiment showed that heat-killed virulent bacteria transferred something to living harmless bacteria, making them virulent. We now know that 'something' was DNA, proving genetic information can transfer between cells.",
      {});
  }
]),["Griffith mixed heat-killed bacteria with live harmless bacteria and something changed. What does it tell us when a trait can 'pass' from dead cells to living ones?"]);

E("bio-u2-61-q08",2,["6.1"],2,"var",varset([
  function(){
    return mcq("Why were Avery, MacLeod, and McCarty able to conclude that DNA was the transforming principle?",
      "DNA was the only molecule that remained functional after proteins were destroyed.",
      ["DNA was observed under an electron microscope.","DNA was shown to contain amino acids.","DNA was visible during cell division."],
      "Avery's team destroyed molecules one at a time (proteins, RNA, carbohydrates). Transformation only stopped when DNA was destroyed, proving DNA was the transforming principle, not protein as previously thought.",
      {});
  }
]),["They destroyed proteins first, then RNA, then carbohydrates, transformation kept happening. What was the only thing left that could still cause transformation?"]);

E("bio-u2-61-q09",2,["6.1"],1,"var",varset([
  function(){
    var q=mcq("Which two scientists determined this structure?",
      "Watson and Crick",
      ["Avery and Chargaff","Griffith and Miescher","Hershey and Chase"],
      "Watson and Crick built the double helix model in 1953, using Rosalind Franklin's X-ray diffraction images (Photo 51) and Chargaff's base-pairing rules as key evidence.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-61-q09.png" alt="Illustration of the DNA double helix: two twisted strands joined by coloured base pair rungs" style="max-width:100%;height:auto">';
    return q;
  }
]),["This question is about the famous 1953 double helix model. Whose X-ray images were used as key evidence to build it?"]);

E("bio-u2-61-q10",2,["6.1"],2,"var",varset([
  function(){
    return mcq("DNA sample contains 28% adenine. According to Chargaff's rules, what percentage of cytosine should be present?",
      "22%",
      ["28%","44%","56%"],
      "Chargaff's rules: A pairs with T, C pairs with G. If A = 28%, then T = 28%. Remaining = 44% for G+C. Since G = C, each = 22%.",
      {});
  }
]),["Chargaff's rule: A always pairs with T, and C always pairs with G. If A = 28%, then T = 28%. What percentage is left for G and C together?"]);

E("bio-u2-61-q11",2,["6.1"],1,"var",varset([
  function(){
    return mcq("How did Rosalind Franklin's X-ray diffraction images contribute to the discovery of DNA structure?",
      "They provided evidence that DNA has a helical shape.",
      ["They revealed that DNA contains uracil.","They showed how proteins are synthesized.","They demonstrated DNA replication."],
      "Franklin's Photo 51 showed an X-shaped diffraction pattern characteristic of a helix. This was critical evidence Watson and Crick used to determine DNA's helical structure.",
      {});
  }
]),["Franklin's X-ray diffraction image (Photo 51) showed a specific pattern. What shape does that X-pattern indicate a molecule has?"]);

/* ---------- 6.2 Mendelian Genetics and Crosses ---------- */

E("bio-u2-62-q01",2,["6.2"],1,"var",varset([
  function(){
    return mcq("Which genotype represents a heterozygous individual?",
      "Aa",
      ["aa","AA","bb"],
      "A heterozygous individual carries two different alleles for a gene, one dominant and one recessive. Aa is the only option with two different alleles; AA and aa (and bb) are homozygous.",
      {});
  }
]),["\"Heterozygous\" means the two alleles for the gene are not the same. Which genotype has two different alleles?"]);

E("bio-u2-62-q02",2,["6.2"],1,"var",varset([
  function(){
    return mcq("Which term refers to the observable characteristics of an organism?",
      "Phenotype",
      ["Allele","Genotype","Trait"],
      "The phenotype is the observable characteristic, what the organism looks like or how it functions (for example, tall or short). The genotype is the allele combination behind it, and an allele is one version of a gene.",
      {});
  }
]),["One of these terms names the genetic makeup you cannot see directly, and one names what you can actually observe. Which one is the observable side?"]);

E("bio-u2-62-q03",2,["6.2"],1,"var",varset([
  function(){
    return mcq("What is the purpose of a Punnett square?",
      "predict inheritance outcomes",
      ["determine DNA sequence","measure mutation rate","show protein structure"],
      "A Punnett square is a prediction tool: it combines the possible gametes from each parent to show the genotypes (and phenotypes) the offspring can have, and in what proportions. It does not measure or sequence anything.",
      {});
  }
]),["A Punnett square is filled in before any offspring exist. Is it measuring something in a lab, or working out what a cross is likely to produce?"]);

E("bio-u2-62-q04",2,["6.2"],2,"var",varset([
  function(){
    return mcq("In pea plants, tall (T) is dominant to short (t). Two heterozygous plants are crossed. What is the probability of producing a short offspring?",
      "25%",
      ["0%","50%","75%"],
      "Cross: Tt × Tt × | T | t T | TT | Tt t | Tt | tt Genotypes: TT = 25%, Tt = 50%, tt = 25%. Short plants must be tt, so the probability is 25%.",
      {});
  }
]),["First write out the gametes each heterozygous (Tt) parent can make. A short offspring needs the recessive allele from both parents, how often does that combination land in the square?"]);

E("bio-u2-62-q05",2,["6.2"],2,"var",varset([
  function(){
    return mcq("What is the phenotypic ratio for the following monohybrid cross Tt x Tt?",
      "3:1",
      ["1:1","4:0","1:2:1"],
      "From the Punnett square for Tt × Tt: TT, Tt, and Tt are all tall (T is dominant), and only tt is short. That is 3 tall : 1 short, a phenotypic ratio of 3:1. (1:2:1 is the genotypic ratio, the trap in this question.)",
      {});
  }
]),["Build the Punnett square for Tt × Tt, but this time group the offspring by what they look like, not by genotype. How many boxes show the dominant trait?"]);

E("bio-u2-62-q06",2,["6.2"],2,"var",varset([
  function(){
    return mcq("Two heterozygous purple-flowered plants (Pp) are crossed. What proportion of offspring are expected to be heterozygous?",
      "50%",
      ["0%","25%","75%"],
      "Cross: Pp × Pp × | P | p P | PP | Pp p | Pp | pp Heterozygous offspring = Pp = 2 out of 4 boxes = 50%.",
      {});
  }
]),["Build the Pp × Pp square. This time count only the boxes with one dominant and one recessive allele, the heterozygotes."]);

E("bio-u2-62-q07",2,["6.2"],2,"var",varset([
  function(){
    return mcq("In fruit flies, long wings are dominant to short wings. A cross between heterozygous long winged fly and a short winged fly produces 4000 offspring. According to Mendelian ratios, how many of the offspring would be heterozygous long winged?",
      "2000",
      ["0","1000","3000"],
      "Cross: Ll × ll × | l | l L | Ll | Ll l | ll | ll 50% Ll (heterozygous long) and 50% ll (short). 0.50 × 4000 = 2000 heterozygous long-winged offspring.",
      {});
  }
]),["The short-winged parent can only pass on the recessive allele. What fraction of the square ends up heterozygous, then apply that fraction to 4000?"]);

E("bio-u2-62-q08",2,["6.2"],2,"var",varset([
  function(){
    return mcq("A genetic trait follows complete dominance. Two parents with genotypes Aa and aa have offspring. What is the expected phenotypic ratio of the offspring?",
      "1 dominant : 1 recessive",
      ["All dominant","1 dominant : 3 recessive","3 dominant : 1 recessive"],
      "Cross: Aa × aa × | a | a A | Aa | Aa a | aa | aa Phenotypes: 50% show the dominant trait (Aa) and 50% show the recessive trait (aa), a ratio of 1 dominant : 1 recessive.",
      {});
  }
]),["One parent always passes on a recessive allele; the other passes on A half the time and a half the time. Fill the square and group by appearance."]);

E("bio-u2-62-q09",2,["6.2"],3,"var",varset([
  function(){
    return mcq("Brown eyes are dominant to blue eyes. A blue-eyed man mates with a brown-eyed woman, whose father was brown-eyed and whose mother was blue-eyed. What are the possible genotypes of their offspring?",
      "Bb and bb",
      ["Bb only","bb only","BB, Bb, and bb"],
      "Blue-eyed man = bb. The woman is brown-eyed, but her mother was blue-eyed (bb), so the woman must have received b from her mother and B from her father, she is Bb. Cross: Bb × bb × | b | b B | Bb | Bb b | bb | bb Possible offspring genotypes: Bb and bb.",
      {});
  }
]),["Work out the woman's genotype first: she is brown-eyed, but her mother was blue-eyed (bb), what allele must the woman have received from her mother? Then set up her cross with the blue-eyed man."]);

E("bio-u2-62-q10",2,["6.2"],1,"var",varset([
  function(){
    return mcq("What is the purpose of a test cross?",
      "Determine whether an individual is homozygous or heterozygous",
      ["Increase genetic variation","Identify dominant alleles only","Produce purebred offspring"],
      "A test cross breeds an individual showing the dominant trait (genotype unknown, A?) with a homozygous recessive (aa). If any offspring show the recessive trait, the tested parent must carry the recessive allele, the offspring reveal what appearance alone cannot.",
      {});
  }
]),["An organism showing the dominant trait could be AA or Aa, you cannot tell by looking. A test cross is designed to reveal which one it is. How?"]);

E("bio-u2-62-q11",2,["6.2"],2,"var",varset([
  function(){
    return mcq("A tall pea plant has the genotype T?. A test cross with a short plant produces 50% tall and 50% short offspring. What is the genotype of the tall parent?",
      "Tt",
      ["Cannot be determined","tt","TT"],
      "Test cross = T? × tt × | t | t T | Tt | Tt t | tt | tt A 1:1 ratio (50% tall, 50% short) occurs only if the unknown parent is heterozygous, a TT parent could never produce short offspring. The tall parent is Tt.",
      {});
  }
]),["In a test cross the short parent (tt) can only donate t. Short offspring must have received a t from the tall parent as well, what does that tell you about the tall parent's second allele?"]);

E("bio-u2-62-q12",2,["6.2"],1,"var",varset([
  function(){
    return mcq("Which statement best describes the Law of Segregation?",
      "Alleles separate during gamete formation",
      ["Dominant alleles replace recessive alleles","Genes on different chromosomes are linked","Traits blend during inheritance"],
      "The Law of Segregation states that the two alleles for a gene separate during gamete formation, so each gamete carries only one allele. Fertilization then restores the pair. Nothing is replaced or blended, recessive alleles survive separation intact, which is why they can reappear in later generations.",
      {});
  }
]),["\"Segregation\" means separating. Mendel's first law describes what happens to the two alleles of a gene when gametes are made, each gamete ends up with how many?"]);

E("bio-u2-62-q13",2,["6.2"],1,"var",varset([
  function(){
    return mcq("In snapdragons, red flowers (RR) crossed with white flowers (WW) produce pink flowers (RW). What inheritance pattern is illustrated?",
      "Incomplete dominance",
      ["Co-dominance","Complete dominance","Polygenic inheritance"],
      "Pink is an intermediate blend of red and white, so neither allele is fully dominant, this is incomplete dominance. In co-dominance both traits would appear distinctly side by side (as in roan cattle), not blended into a new in-between colour.",
      {});
  }
]),["The heterozygote is neither red nor white, it is a blend of the two. Compare that with co-dominance, where both traits show up separately (think roan coats or AB blood)."]);

E("bio-u2-62-q14",2,["6.2"],2,"var",varset([
  function(){
    return mcq("Two pink snapdragons are crossed. What proportion of offspring are expected to be pink?",
      "50%",
      ["25%","75%","100%"],
      "Cross: RW × RW × | R | W R | RR | RW W | RW | WW Phenotypes: 25% red (RR), 50% pink (RW), 25% white (WW). The pink proportion is 50%.",
      {});
  }
]),["Pink flowers are the heterozygotes (RW). Set up RW × RW and count how many boxes are RW, remember, with incomplete dominance each genotype has its own phenotype."]);

E("bio-u2-62-q15",2,["6.2"],2,"var",varset([
  function(){
    return mcq("In Flovell flowers, yellow petals and red petals are incompletely dominant, producing peach petals. What is the phenotypic ratio of a cross between a yellow and a peach flower?",
      "50% peach, 50% yellow",
      ["25% peach, 50% yellow, 25% red","50% peach 25% yellow, 25% red","75% peach, 25% yellow"],
      "Let YY = yellow, RR = red, YR = peach. Cross: YY × YR × | Y | R Y | YY | YR Y | YY | YR Results: 50% yellow (YY) and 50% peach (YR). Phenotypic ratio: 50% peach, 50% yellow. (No red offspring are possible, the yellow parent contributes no R allele.)",
      {});
  }
]),["Assign genotypes first: yellow = YY, red = RR, peach = YR. Then cross yellow (YY) with peach (YR), what gametes can each parent make?"]);

E("bio-u2-62-q16",2,["6.2"],1,"var",varset([
  function(){
    return mcq("In cattle, red coat colour (RR) and white coat colour (WW) are co-dominant. What phenotype results from genotype RW?",
      "Roan coat with both red and white hairs",
      ["Pink coat","Red coat","White coat"],
      "With co-dominance, both alleles show. An RW animal produces both red hairs and white hairs, giving a roan coat. A pink coat would be a blended result, and blending is incomplete dominance, as in the snapdragons.",
      {});
  }
]),["Co-dominance means both alleles are fully expressed at the same time, not blended. What would a coat look like if some hairs followed one allele and the rest followed the other?"]);

E("bio-u2-62-q17",2,["6.2"],2,"var",varset([
  function(){
    return mcq("Two roan cattle are crossed. What proportion of offspring are expected to be white?",
      "25%",
      ["0%","50%","75%"],
      "Cross: RW × RW × | R | W R | RR | RW W | RW | WW Phenotypes: 25% red (RR), 50% roan (RW), 25% white (WW). The white proportion is 25%.",
      {});
  }
]),["Roan cattle are RW. In the RW × RW square, white offspring are the WW box, how many of the four boxes is that?"]);

E("bio-u2-62-q18",2,["6.2"],2,"var",varset([
  function(){
    return mcq("A plant heterozygous for two traits (RrYy) produces which set of gametes?",
      "RY, Ry, rY, ry",
      ["RY only","RR, Rr, rr, YY","RY and ry only"],
      "Each gamete receives one allele from each gene. The possible combinations are: RY, Ry, rY, and ry, four gamete types, produced in equal proportions because the two genes assort independently.",
      {});
  }
]),["Each gamete receives one allele from the R pair and one from the Y pair. List every way of picking one from each pair, there should be more than two."]);

E("bio-u2-62-q19",2,["6.2"],2,"var",varset([
  function(){
    return mcq("Two heterozygous dihybrid parents (RrYy × RrYy) are crossed. Assuming independent assortment, what phenotypic ratio is expected?",
      "9:3:3:1",
      ["1:2:1","3:1","1:1:1:1"],
      "Each trait on its own gives a 3:1 phenotypic ratio. Combining two independent 3:1 ratios gives (3:1) × (3:1) = 9:3:3:1, 9 offspring showing both dominant traits, 3 showing dominant R with recessive y, 3 showing recessive r with dominant Y, and 1 showing both recessive traits.",
      {});
  }
]),["Treat the cross as two monohybrid crosses running at the same time. Each one gives 3 dominant-looking : 1 recessive-looking, what happens when you combine the two 3:1 ratios?"]);

/* ---------- 6.3 Chromosomes and the Extensions of Mendel ---------- */

E("bio-u2-63-q01",2,["6.3"],1,"var",varset([
  function(){
    return mcq("According to the Sutton-Boveri chromosome theory, genes are located on:",
      "Chromosomes",
      ["Cell membranes","Ribosomes","Vacuoles"],
      "The Sutton-Boveri chromosome theory proposed that genes are carried on chromosomes, the behaviour of Mendel's hereditary factors in crosses matches the behaviour of chromosomes in meiosis. Morgan later refined this into the gene-chromosome theory.",
      {});
  }
]),["Sutton and Boveri noticed that genes and one particular cell structure behave the same way in meiosis, separating into gametes in pairs. Which structure?"]);

E("bio-u2-63-q02",2,["6.3"],1,"var",varset([
  function(){
    return mcq("Why are genes located close together on the same chromosome often inherited together?",
      "Gene linkage",
      ["Co-dominance","Incomplete dominance","Mutation"],
      "Genes on the same chromosome are physically linked, so they tend to be inherited together as a unit, this is gene linkage. Only crossing over can separate them, and the closer two genes are, the less likely a crossover falls between them.",
      {});
  }
]),["Genes on the same chromosome travel into gametes as a package unless crossing over separates them, and the closer together they sit, the less likely that is. What is that package effect called?"]);

E("bio-u2-63-q03",2,["6.3"],2,"var",varset([
  function(){
    return mcq("Why does crossing over increase genetic variation?",
      "It exchanges genetic material between homologous chromosomes",
      ["It creates additional chromosomes","It changes chromosome number","It guarantees dominant traits"],
      "During crossing over, homologous chromosomes exchange corresponding segments, producing chromatids with new combinations of alleles that neither parent chromosome carried. Chromosome number does not change, it is the reshuffling of alleles that increases variation in the gametes.",
      {});
  }
]),["Crossing over happens between non-sister chromatids in prophase I. Think about what the chromatids look like afterwards, are the allele combinations on them the same as before?"]);

E("bio-u2-63-q04",2,["6.3"],2,"var",varset([
  function(){
    return mcq("In fruit flies, white eyes are a recessive, sex-linked trait. If a white-eyed female fruit fly is crossed with a red-eyed male fruit fly, how many white-eyed offspring can they possibly have?",
      "2/4",
      ["1/4","3/4","4/4"],
      "Let X^r = white eyes (recessive) and X^R = red eyes (dominant). White-eyed female = X^r X^r; red-eyed male = X^R Y. Cross: × | X^R | Y X^r | X^R X^r | X^r Y X^r | X^R X^r | X^r Y Results: 2/4 red-eyed carrier daughters (X^R X^r) and 2/4 white-eyed sons (X^r Y). White-eyed offspring = 2/4.",
      {});
  }
]),["Set up the sex chromosomes first: the mother is X^r X^r and the father is X^R Y. Which parent gives sons their X, and what does that make every son?"]);

E("bio-u2-63-q05",2,["6.3"],2,"var",varset([
  function(){
    return mcq("Colour blindness is an X-linked recessive trait. A carrier female and a male with normal colour vision have children. What is the probability of producing a colour-blind son?",
      "25%",
      ["0%","50%","75%"],
      "Let X^N = normal vision and X^n = colour blindness. Mother = X^N X^n; father = X^N Y. Cross: × | X^N | Y X^N | X^N X^N | X^N Y X^n | X^N X^n | X^n Y The colour-blind son (X^n Y) appears in 1 out of 4 boxes, the probability is 25% of all children (equivalently, half of the sons).",
      {});
  }
]),["The mother is X^N X^n and the father is X^N Y. A colour-blind son must be X^n Y, he needs the X^n from his mother and the Y from his father. How many of the four boxes give that?"]);

E("bio-u2-63-q06",2,["6.3"],2,"var",varset([
  function(){
    return mcq("A father is colour blind and the mother is homozygous for normal colour vision. Which statement is correct?",
      "All daughters will be carriers",
      ["All sons will be colour blind","Half of all children will be colour blind","No daughters will inherit the allele"],
      "Father = X^n Y; mother = X^N X^N. Cross: × | X^n | Y X^N | X^N X^n | X^N Y X^N | X^N X^n | X^N Y Results: all daughters are X^N X^n, carriers with normal vision, because each received her father's X^n. All sons are X^N Y, normal, because sons receive their X from their mother.",
      {});
  }
]),["Every daughter receives her father's only X chromosome, and his carries the colour-blindness allele. What does that make every daughter, even though she can see normally?"]);

E("bio-u2-63-q07",2,["6.3"],1,"var",varset([
  function(){
    return mcq("Why are males more likely to express X-linked recessive traits?",
      "they have only one X chromosome",
      ["they have two X chromosomes","they mutate faster","they receive two Y chromosomes"],
      "Males are XY, so they have only one X chromosome. A single recessive allele on that X is expressed because there is no second X carrying a dominant allele to mask it. Females (XX) must inherit the recessive allele on both X chromosomes to express the trait; with one copy they are carriers.",
      {});
  }
]),["A female with one recessive allele on an X usually has a normal allele on her other X to mask it. Does a male have that second copy?"]);

E("bio-u2-63-q08",2,["6.3"],3,"var",varset([
  function(){
    return mcq("Colour blindness is an X-linked recessive trait. A woman who is normal for colour vision, has a mother who is colourblind. If she mates with a man who is colourblind, what is the probability that they will have a child who is colourblind?",
      "1/2",
      ["0","1/16","1/4"],
      "The woman's mother was X^n X^n, so the woman inherited X^n from her mother and X^N from her father, she is a carrier, X^N X^n. The man is X^n Y. Cross: × | X^n | Y X^N | X^N X^n | X^N Y X^n | X^n X^n | X^n Y Results: X^n X^n = colourblind daughter; X^n Y = colourblind son. Two out of four children are colourblind, probability 1/2.",
      {});
  }
]),["Deduce the woman's genotype first: her mother was colourblind (X^n X^n), so which X must the woman have received from her? Then cross her with a colour-blind man (X^n Y) and count the colour-blind boxes, both sexes this time."]);

E("bio-u2-63-q09",2,["6.3"],1,"var",varset([
  function(){
    return mcq("What blood type is genotype ii?",
      "O",
      ["A","AB","B"],
      "The ABO system has three alleles: I^A, I^B, and i. The i allele is recessive and produces no antigen, so a person with genotype ii has neither antigen and has blood type O.",
      {});
  }
]),["The i allele produces no antigen on the red blood cells. Which blood type is defined by having neither the A nor the B antigen?"]);

E("bio-u2-63-q10",2,["6.3"],2,"var",varset([
  function(){
    return mcq("What is the probability of having a child with the genotype I^A I^B, if the following cross takes place: I^A i x I^B i?",
      "25%",
      ["0%","50%","75%"],
      "Cross: I^A i × I^B i × | I^B | i I^A | I^A I^B | I^A i i | I^B i | ii I^A I^B appears once out of four boxes, the probability is 25%.",
      {});
  }
]),["List each parent's gametes, the first parent can give I^A or i; the second can give I^B or i. Which single combination builds I^A I^B, and how many combinations are there in total?"]);

E("bio-u2-63-q11",2,["6.3"],1,"var",varset([
  function(){
    return mcq("What is the ABO blood group an example of?",
      "Multiple alleles",
      ["Polygenic inheritance","Sex linkage","X-linked traits"],
      "The ABO blood group is controlled by one gene with three alleles, I^A, I^B, and i. A gene with more than two allele forms in the population is an example of multiple alleles. (Polygenic inheritance is different: many genes affecting one trait, as with height.)",
      {});
  }
]),["Count the versions of the ABO gene in the population: I^A, I^B, and i. When a gene has more than two possible alleles, what is that called?"]);

E("bio-u2-63-q12",2,["6.3"],2,"var",varset([
  function(){
    return mcq("A cross between 2 individuals who are heterozygous for blood types A and B could produce which of the following?",
      "all types",
      ["A only","AB only","O only"],
      "Cross: I^A i × I^B i × | I^B | i I^A | I^A I^B | I^A i i | I^B i | ii Phenotypes: AB, A, B, and O, all types are possible.",
      {});
  }
]),["\"Heterozygous for blood type A\" means I^A i, and \"heterozygous for type B\" means I^B i. Run the cross and list every phenotype that appears even once."]);

E("bio-u2-63-q13",2,["6.3"],2,"var",varset([
  function(){
    return mcq("A person with blood type AB mates with a person with blood type O. Which blood types are possible among their children?",
      "A and B only",
      ["A, B, AB, and O","AB and O only","O only"],
      "Type AB = I^A I^B; type O = ii. Cross: × | i | i I^A | I^A i | I^A i I^B | I^B i | I^B i Phenotypes: type A and type B only. No child can be AB (that needs I^A and I^B together, but the O parent contributes neither) or O (that needs i from both parents).",
      {});
  }
]),["The type O parent (ii) can only hand down i. So every child gets i from that side, can any child end up AB, or O?"]);

E("bio-u2-63-q14",2,["6.3"],2,"var",varset([
  function(){
    return mcq("A woman who is heterozygous for both Type A blood and the Rh factor has a child with a man who has Type O, Rh-negative blood. What is the probability that their child will have Type A, Rh-negative blood?",
      "25%",
      ["0%","50%","75%"],
      "Blood type and Rh factor: Rh-positive (R) is dominant to Rh-negative (r). Mother = I^A i Rr, with gametes I^A R, I^A r, iR, ir. Father = ii rr, with gamete ir only. Mother's gamete | Child (× father's ir) | Phenotype I^A R | I^A i Rr | A positive I^A r | I^A i rr | A negative iR | ii Rr | O positive ir | ii rr | O negative Type A, Rh-negative (I^A i rr) appears once out of four, the probability is 25%.",
      {});
  }
]),["Handle both traits at once: the mother is I^A i Rr and the father is ii rr (Rh-positive R is dominant to Rh-negative r). The mother makes four gamete types; the father makes only one. Which of the four outcomes is type A and Rh-negative?"]);

E("bio-u2-63-q15",2,["6.3"],3,"var",varset([
  function(){
    return mcq("What are possible genotypes of a couple that produced children with blood types A, B, and O?",
      "I^A i and I^B i",
      ["I^A I^A and I^B I^B","ii and I^A I^B","I^A I^B and I^B i"],
      "To produce a type O child, both parents must carry i. To produce type A and type B children, one parent must provide I^A and the other I^B. Only I^A i and I^B i meet both conditions. Cross: I^A i × I^B i × | I^B | i I^A | I^A I^B | I^A i i | I^B i | ii Produces A, B, AB, and O, including the three types observed.",
      {});
  }
]),["Reason backwards from the children. A type O child (ii) means both parents must carry i, check which option gives every parent an i allele while still supplying both I^A and I^B between them."]);

E("bio-u2-63-q16",2,["6.3"],1,"var",varset([
  function(){
    return mcq("Why is human height often cited as a polygenic trait?",
      "Influenced by multiple genes and environmental factors",
      ["Controlled by a single dominant gene","Controlled by genes on the Y chromosome","Inherited only from the mother"],
      "Height is influenced by many genes working together, that is what \"polygenic\" means, and it is also affected by environmental factors such as nutrition. The combined effect of many genes is why height varies continuously instead of falling into two or three neat categories.",
      {});
  }
]),["Height does not come in two distinct forms the way Mendel's traits did, it forms a smooth range. What kind of genetic control produces a continuous range like that?"]);

E("bio-u2-63-q17",2,["6.3"],2,"var",varset([
  function(){
    return mcq("Two siblings inherit similar genes for height, yet one grows significantly taller due to nutrition differences. What does this illustrate?",
      "Environmental effects on gene expression",
      ["Gene linkage","Independent assortment","Sex-linked inheritance"],
      "The siblings' similar genotypes produced different phenotypes because of different environments, nutrition changed how the height genes were expressed. This illustrates environmental effects on gene expression: phenotype is genotype expressed in an environment, not genotype alone.",
      {});
  }
]),["The genes are nearly the same; the outcomes are not. What changed between the two siblings, their DNA, or the conditions their DNA was expressed in?"]);

E("bio-u2-63-q18",2,["6.3"],3,"var",varset([
  function(){
    var q=mcq("The table below shows the gene pairs involved in determining eye colour. One pair codes for pigment in the front of the iris and the other for pigment in the back of the iris. If a man with black-brown eyes and a woman with dark blue eyes mate, what are the expected phenotypes of their offspring?",
      "Brown-green flecked and light brown",
      ["Black-brown and dark blue","Black-brown and brown-green flecked","Brown-green flecked and dark blue"],
      "From the table: father = AABB, gametes AB only. Mother = aaBb, gametes aB and ab. × | aB | ab AB | AaBB | AaBb Phenotypes: AaBB = brown-green flecked; AaBb = light brown. So the expected offspring phenotypes are brown-green flecked and light brown.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-63-q18.png" alt="Table of genotypes and eye colour phenotypes for two gene pairs: AABB black-brown, AABb dark brown, AAbb brown, AaBB brown-green flecked, AaBb light brown, Aabb grey-blue, aaBB green, aaBb dark blue, aabb light blue" style="max-width:100%;height:auto">';
    return q;
  }
]),["Read each parent's genotype off the table first: the black-brown man is AABB, and the dark blue woman is aaBb. The father makes only one gamete type, what are the mother's two?"]);

/* ---------- 6.4 Pedigrees and Genetic Disorders ---------- */

E("bio-u2-64-q01",2,["6.4"],1,"var",varset([
  function(){
    var q=mcq("What is the name of the diagram?",
      "Pedigree chart",
      ["Family tree","Genetic chart","Punnett square"],
      "A diagram that tracks a trait through the generations of a family, with squares for males, circles for females and shading for affected individuals, is a pedigree chart. A Punnett square predicts the offspring of a single cross; it does not map a family.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-64-q01.png" alt="Pedigree chart of a family across three generations, with 21 numbered individuals; individuals 7, 12, 19 and 21 are shaded (affected)" style="max-width:100%;height:auto">';
    return q;
  }
]),["The diagram uses squares, circles, and shading to track a trait through several generations of one family. Which term is the precise genetics name for that kind of diagram?"]);

E("bio-u2-64-q02",2,["6.4"],3,"var",varset([
  function(){
    var q=mcq("What type of inheritance pattern is illustrated?",
      "Autosomal recessive",
      ["Autosomal dominant","Co-dominance","Sex-Linked"],
      "Step 1: In this pedigree, unaffected parents have affected children. That rules out a dominant pattern: a dominant trait cannot hide and then reappear, because anyone carrying the dominant allele would show it. The trait must be recessive. Step 2: Affected individuals include both males and females in roughly similar numbers, which points to a gene on an autosome rather than a sex chromosome. Conclusion: autosomal recessive.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-64-q01.png" alt="Pedigree chart of a family across three generations, with 21 numbered individuals; individuals 7, 12, 19 and 21 are shaded (affected)" style="max-width:100%;height:auto">';
    return q;
  }
]),["Work through the pedigree in order: (1) Can two unaffected parents have an affected child under a dominant pattern? (2) Are affected individuals of both sexes, scattered through the family, or mostly one sex?"]);

E("bio-u2-64-q03",2,["6.4"],3,"var",varset([
  function(){
    var q=mcq("What would be the genotype of individual 20?",
      "Aa",
      ["AA","aa","unknown"],
      "Step 1: The pattern is autosomal recessive, and individual 20 is unaffected, so she must be AA or Aa. Step 2: Her son, individual 21, is affected, so his genotype is aa. Step 3: He inherited one a allele from his father and one from his mother. Step 4: Since individual 20 supplied an a allele, she must carry one: her genotype is Aa. (The answer is not \"unknown\", the child's genotype settles it.)",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-64-q01.png" alt="Pedigree chart of a family across three generations, with 21 numbered individuals; individuals 7, 12, 19 and 21 are shaded (affected)" style="max-width:100%;height:auto">';
    return q;
  }
]),["Individual 20 is unaffected, so under a recessive pattern she is A_. Now look at her children, one of them is affected (aa). An aa child needs an \"a\" from each parent. Where did his second \"a\" come from?"]);

E("bio-u2-64-q04",2,["6.4"],1,"var",varset([
  function(){
    return mcq("What is the primary purpose of a pedigree?",
      "Illustrate inheritance patterns across generations",
      ["Determine chromosome number","Measure mutation rates","Predict environmental influences"],
      "A pedigree records which members of a family show a trait across several generations, so the pattern of inheritance, dominant or recessive, autosomal or sex-linked, can be worked out from real family data. That pattern is what the questions around this one have been using the pedigrees for.",
      {});
  }
]),["A pedigree is the main tool geneticists use when they cannot run controlled crosses, for example, with human families. What does it let them see about a trait?"]);

E("bio-u2-64-q05",2,["6.4"],2,"var",varset([
  function(){
    return mcq("In a pedigree, two unaffected parents have an affected child. Which inheritance pattern is most likely?",
      "Autosomal recessive",
      ["Autosomal dominant","Mitochondrial inheritance","Y-linked"],
      "Two unaffected parents producing an affected child is the classic signature of a recessive pattern: both parents are carriers (Aa), and the child inherited the recessive allele from each (aa). A dominant trait cannot skip a generation this way, because any individual carrying a dominant allele would show the trait.",
      {});
  }
]),["If the trait were dominant, could it skip the parents entirely and appear in their child? Which pattern allows two carriers to look unaffected themselves?"]);

E("bio-u2-64-q06",2,["6.4"],3,"var",varset([
  function(){
    var q=mcq("Which inheritance pattern is shown in the pedigree?",
      "X-linked recessive",
      ["Autosomal dominant","Autosomal recessive","Y-linked dominant"],
      "Step 1: The trait skips generations: unaffected parents have affected children, so it is recessive, not dominant. Step 2: The affected individuals are (almost) all male, which is not expected for an autosomal trait. Step 3: Affected males receive the trait from their mothers, who are unaffected carriers, and no father passes the trait to a son, a father gives his son a Y chromosome, not an X. Conclusion: the gene sits on the X chromosome and the trait is X-linked recessive.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-64-q06.png" alt="Three-generation pedigree with carriers marked by a dot inside the circle: affected individuals are I-2, II-1, II-3 and III-2; II-2 and III-3 are marked as carriers" style="max-width:100%;height:auto">';
    return q;
  }
]),["Check three things in order: (1) Does the trait skip generations? (2) Who is mostly affected, males, females, or both equally? (3) Does any affected father pass the trait to his sons? (Fathers give sons a Y, never an X.)"]);

E("bio-u2-64-q07",2,["6.4"],2,"var",varset([
  function(){
    var q=mcq("If individual III-3 has children with an unaffected male, what is the probability that their sons will be affected by the trait?",
      "50%",
      ["0%","25%","100%"],
      "Step 1: The pedigree shows III-3 is an unaffected carrier, X^N X^n, and her partner is an unaffected male, X^N Y. Step 2: Sons receive their X chromosome from their mother and Y from their father. Step 3: Half the time she passes X^N (son unaffected, X^N Y) and half the time X^n (son affected, X^n Y, he has no second X to mask it). Conclusion: 50% of their sons are expected to be affected.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-64-q06.png" alt="Three-generation pedigree with carriers marked by a dot inside the circle: affected individuals are I-2, II-1, II-3 and III-2; II-2 and III-3 are marked as carriers" style="max-width:100%;height:auto">';
    return q;
  }
]),["From the pedigree, III-3 is a carrier (X^N X^n), the trait is X-linked recessive. Every son receives his X from his mother. What are the two X chromosomes she can pass on, and what happens with each?"]);

/* ---------- Constructed-Response Practice (mid-course book) ----------
   The two prompts from the Mid-Course book's Constructed-Response
   Practice chapter, 4 marks each, with the book's model answer and
   marking points as the solution. */

E("bio-u2-62-cr1",2,["6.2"],2,"var",varset([
  function(){
    return textq("In guinea pigs, black coat colour (B) is dominant to white (b), and rough coat (R) is dominant to smooth (r). A breeder crosses a guinea pig that is heterozygous for both traits (BbRr) with a white, smooth guinea pig (bbrr). Predict the phenotypes of the offspring and the proportion expected for each. Justify your prediction with the gametes each parent can produce and a Punnett square or an equivalent analysis.",
      ["Black rough, black smooth, white rough and white smooth, in a 1:1:1:1 ratio (25% each)","1:1:1:1","1:1:1:1 ratio"],
      "Model answer: The BbRr parent produces four gamete types in equal proportions, BR, Br, bR, br, because the two genes assort independently. The bbrr parent produces only br gametes. × | br BR | BbRr, black, rough Br | Bbrr, black, smooth bR | bbRr, white, rough br | bbrr, white, smooth Each class makes up 1 of the 4 equally likely combinations, so the expected phenotypes are black rough, black smooth, white rough, and white smooth in a 1:1:1:1 ratio (25% each). Because the recessive parent contributes only recessive alleles, each offspring's phenotype directly reveals which gamete it received from the heterozygous parent. Marking points (4 marks): 1 mark: four gametes (BR, Br, bR, br) identified for the heterozygous parent, with independent assortment stated or clearly used. 1 mark: the recessive parent's single gamete type (br) identified, and the cross set up correctly (Punnett square or equivalent working). 1 mark: all four offspring phenotypes correct, black rough, black smooth, white rough, white smooth. 1 mark: proportions given as 1:1:1:1 (25% each), with the justification tied to the equal likelihood of the four gamete combinations.",
      {});
  }
]));

E("bio-u2-64-cr2",2,["6.4"],3,"var",varset([
  function(){
    return textq("A family pedigree shows the following. In generation I, an unaffected man and an unaffected woman have three children: an affected son, an unaffected daughter, and an unaffected son. In generation II, the unaffected daughter has children with an unrelated unaffected man; they have an affected son and an unaffected daughter (generation III). No females in the family are affected, and the trait does not appear in every generation. (a) Identify the most likely inheritance pattern, and give two observations from the pedigree that support your call. (b) Explain why the unaffected daughter in generation II must be a carrier. (c) The unaffected daughter in generation III later has a child with an unaffected man. What is the probability that a son of theirs would be affected? Show your reasoning.",
      ["X-linked recessive; a son of the generation III daughter has a 1/4 (25%) chance of being affected","X-linked recessive","1/4","25%"],
      "Model answer: (a) X-linked recessive. Justification: first, unaffected parents (generation I) have an affected son, so the trait is recessive, a dominant trait could not skip both parents. Second, only males are affected, and affected sons are born to unaffected mothers, which fits a gene on the X chromosome: a son receives his X from his mother, and a single recessive allele on that X is expressed because he has no second X to mask it. (An autosomal recessive call earns partial credit only if both observations are addressed, the all-male pattern is the evidence that rules it out as the best answer.) (b) The generation II daughter has an affected son. Her son received his X chromosome from her, so she must carry the recessive allele on one of her X chromosomes. She is unaffected because her other X carries the normal dominant allele, she is a carrier (X^N X^n). (c) The generation III daughter has a 1/2 chance of being a carrier, since her mother is X^N X^n. If she is a carrier, each son has a 1/2 chance of receiving her X^n and being affected. Overall probability = 1/2 × 1/2 = 1/4 (25%). Marking points (4 marks): 1 mark: pattern correctly identified as X-linked recessive. 1 mark: two distinct supporting observations (recessive because unaffected parents have an affected child; X-linked because only males are affected / affected sons have unaffected carrier mothers / no father-to-son transmission). 1 mark: carrier explanation for the generation II daughter, her affected son's X came from her, so she must carry the allele while her normal allele keeps her unaffected. 1 mark: probability reasoning for (c), 1/2 (daughter of a carrier is a carrier) × 1/2 (a carrier's son is affected) = 1/4 or 25%.",
      {});
  }
]));


/* ---------- 6.5 DNA and RNA Structure ---------- */

E("bio-u2-65-q01",2,["6.5"],1,"var",varset([
  function(){
    return mcq("Which of the following correctly pairs a DNA base with its complementary base?",
      "Adenine - Thymine",
      ["Adenine - Cytosine","Cytosine - Thymine","Guanine - Adenine"],
      "DNA base pairing: Adenine ↔ Thymine, Cytosine ↔ Guanine. In RNA, Uracil replaces Thymine. These pairs are held by hydrogen bonds.",
      {});
  }
]),["In DNA: Adenine pairs with _____, and Cytosine pairs with _____. Remember: A-T, C-G."]);

E("bio-u2-65-q02",2,["6.5"],1,"var",varset([
  function(){
    return mcq("Which of the following describes RNA?",
      "Base: uracil Structure: single stranded",
      ["Base: thymine Structure: double stranded","Base: thymine Structure: single stranded","Base: uracil Structure: double stranded"],
      "RNA is single-stranded and uses uracil (U) instead of thymine (T). DNA is double-stranded and uses thymine. Both use adenine, cytosine, and guanine. RNA also uses ribose sugar while DNA uses deoxyribose.",
      {});
  }
]),["RNA is single-stranded and uses a different base instead of thymine. Which base replaces thymine in RNA?"]);

E("bio-u2-65-q03",2,["6.5"],1,"var",varset([
  function(){
    return mcq("How does the sugar found in DNA differ from the sugar found in RNA?",
      "DNA contains deoxyribose, while RNA contains ribose.",
      ["DNA contains ribose, while RNA contains deoxyribose.","DNA contains glucose, while RNA contains ribose.","DNA contains fructose, while RNA contains glucose."],
      "'Deoxy' means without oxygen. Deoxyribose (in DNA) has one fewer -OH group than ribose (in RNA). This structural difference affects each molecule's stability, DNA is more stable, suited for long-term storage; RNA is more reactive.",
      {});
  }
]),["The 'deoxy' in deoxyribose means it's missing something compared to ribose. What is it missing?"]);

E("bio-u2-65-q04",2,["6.5"],1,"var",varset([
  function(){
    return mcq("What is meant by the term \"antiparallel\" when describing DNA?",
      "One strand runs 3′→5′ while the other runs 5′→3′.",
      ["Both strands contain different genes.","Both strands run in the same direction.","One strand is longer than the other."],
      "The two DNA strands run in opposite directions: one 5’→3’, the other 3’→5’, like two lanes of traffic going opposite directions. This antiparallel arrangement is essential for replication and transcription.",
      {});
  }
]),["One strand runs 5' to 3'. The other strand runs in the opposite direction. What direction does the complementary strand run?"]);

E("bio-u2-65-q05",2,["6.5"],2,"var",varset([
  function(){
    return mcq("If one DNA strand has the sequence 5′-ATCGGA-3′, what is the complementary strand?",
      "3′-TAGCCT-5′",
      ["3′-ATCGGA-5′","5′-TAGCCT-3′","5′-UAGCCU-3′"],
      "Apply base pairing (A↔T, C↔G) and flip the direction (antiparallel): 5'-A T C G G A-3' → 3'-T A G C C T-5'",
      {});
  }
]),["Match each base to its complement (A↔T, C↔G), then write the strand in the OPPOSITE direction (antiparallel)."]);

E("bio-u2-65-q06",2,["6.5"],1,"var",varset([
  function(){
    return mcq("A researcher identifies a mutation within a gene. Which biological structure has been directly altered?",
      "DNA nucleotide sequence",
      ["Chromosome number","Protein structure","Ribosome composition"],
      "A gene is a specific DNA nucleotide sequence. A mutation directly alters that sequence. Whether the protein changes depends on mutation type (silent, missense, or nonsense).",
      {});
  }
]),["A gene is a specific section of what molecule? A mutation changes the sequence of what?"]);

E("bio-u2-65-q07",2,["6.5"],2,"var",varset([
  function(){
    var q=mcq("Which of the following statements is true of the image?",
      "region C indicates a portion of a chromosome and contains deoxyribose sugar",
      ["region A indicates a portion of a chromosome and contains ribose sugar","region B indicates the genome, and contains ribose sugar","region D indicates the genome, and contains deoxyribose sugar"],
      "Chromosomes are made of DNA, which contains deoxyribose sugar. Region C in the diagram represents a chromosomal segment, which is double-stranded DNA with deoxyribose.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-65-q07.png" alt="Diagram of gene expression with labelled regions: A is the nucleus with its chromosomes, B is a single chromosome, C is a section of DNA, D is messenger RNA, E is a ribosome, and F is the finished protein" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at region C in the diagram. Chromosomes are made of DNA. What sugar does DNA contain, ribose or deoxyribose?"]);

/* ---------- 6.6 DNA Replication ---------- */

E("bio-u2-66-q01",2,["6.6"],1,"var",varset([
  function(){
    return mcq("During DNA replication, which is true of initiation?",
      "complementary bases are separated by helicase",
      ["complementary bases are added by helicase","complementary bases are added by DNA polymerase","complementary bases are separated by DNA polymerase"],
      "During initiation, helicase unwinds and separates the DNA strands by breaking hydrogen bonds at the origin of replication. DNA polymerase then adds nucleotides, but only after helicase opens the strands.",
      {});
  }
]),["During initiation, the double helix must be opened up. Which enzyme breaks the hydrogen bonds between base pairs to unzip the DNA strands?"]);

E("bio-u2-66-q02",2,["6.6"],2,"var",varset([
  function(){
    return mcq("What would most likely happen if primase were unable to function during replication?",
      "New DNA strands could not begin synthesis.",
      ["DNA strands could not unwind.","Okazaki fragments would become longer.","Replication would occur faster."],
      "Primase creates the RNA primer that gives DNA polymerase its starting point (a free 3'-OH group). Without a primer, DNA polymerase cannot initiate synthesis, no primer, no new strand.",
      {});
  }
]),["Enzyme roles: helicase (unwinds), primase (lays RNA primer), DNA polymerase (adds nucleotides 5'→3' only), DNA ligase (joins Okazaki fragments). Leading strand = continuous; lagging strand = Okazaki fragments."]);

E("bio-u2-66-q03",2,["6.6"],2,"var",varset([
  function(){
    return mcq("A mutation causes DNA ligase to become nonfunctional. What would be the most likely consequence?",
      "Okazaki fragments would remain unjoined.",
      ["DNA strands could not separate.","Primers could not form.","RNA would not be transcribed."],
      "DNA ligase joins Okazaki fragments on the lagging strand into a continuous strand. Without it, the fragments remain separate and unjoined, leaving an incomplete lagging strand.",
      {});
  }
]),["The lagging strand is made in short pieces. Which enzyme is responsible for joining those pieces into one continuous strand?"]);

E("bio-u2-66-q04",2,["6.6"],1,"var",varset([
  function(){
    return mcq("Why is DNA replication described as semi-conservative?",
      "Each new DNA molecule contains one original strand and one newly synthesized strand.",
      ["Only half of the DNA molecule is replicated.","One daughter cell receives all original DNA.","Replication occurs during half of the cell cycle."],
      "'Semi-conservative': each daughter molecule keeps one original strand and gains one new strand. Proven by the Meselson-Stahl experiment using nitrogen isotopes. 'Semi' = half original; 'conservative' = original is preserved.",
      {});
  }
]),["Each new DNA molecule keeps one original strand. What does 'semi' mean, and what is 'conserved' in this process?"]);

E("bio-u2-66-q05",2,["6.6"],2,"var",varset([
  function(){
    return mcq("Scientists compare two DNA samples. One sample contains many short DNA fragments that must later be joined together, while the other is synthesized continuously. What explains this difference?",
      "One strand is the lagging strand and the other is the leading strand.",
      ["One strand is a coding strand and the other is a template strand.","One strand contains mutations and the other does not.","One strand is RNA and the other is DNA."],
      "The lagging strand is made in Okazaki fragments because DNA polymerase can only add nucleotides 5'→3', and the lagging strand template runs antiparallel to the replication fork direction. The leading strand is made continuously.",
      {});
  }
]),["The lagging strand is copied in short fragments because DNA polymerase can only work in one direction. What are these short fragments called?"]);

/* ---------- 6.7 Protein Synthesis ---------- */

E("bio-u2-67-q01",2,["6.7"],1,"var",varset([
  function(){
    return mcq("What is the primary function of transcription?",
      "Copying genetic information from DNA into mRNA",
      ["Converting amino acids into proteins","Joining DNA fragments together","Producing ATP for cellular activities"],
      "Transcription copies genetic instructions from DNA into messenger RNA (mRNA) in the nucleus, allowing the code to leave the nucleus and reach the ribosome where proteins are made.",
      {});
  }
]),["Transcription happens in the nucleus and produces a molecule that carries the genetic code out of the nucleus. What type of molecule is produced?"]);

E("bio-u2-67-q02",2,["6.7"],1,"var",varset([
  function(){
    return mcq("During transcription, which enzyme synthesizes the mRNA molecule?",
      "RNA polymerase",
      ["DNA ligase","DNA polymerase","Ribosomal RNA"],
      "RNA polymerase binds to the promoter region, unwinds the DNA, and builds a complementary mRNA strand. Unlike DNA polymerase, it doesn't need a primer and incorporates uracil (U) instead of thymine (T).",
      {});
  }
]),["This enzyme reads the DNA template and builds a complementary strand of RNA. It is NOT DNA polymerase, what is it?"]);

E("bio-u2-67-q03",2,["6.7"],2,"var",varset([
  function(){
    return mcq("If a DNA template strand contains the sequence 3′-TAC GAA CCG-5′, what mRNA sequence would be produced?",
      "5′-AUG CUU GGC-3′",
      ["5′-ATG CTT GGC-3′","5′-TAC GAA CCG-3′","5′-UAC GAA CCG-3′"],
      "RNA polymerase reads template 3'→5' and builds mRNA 5'→3'. Apply base pairing (T→A/U, A→U, C→G, G→C): Template 3'-T A C G A A C C G-5' → mRNA 5'-A U G C U U G G C-3'",
      {});
  }
]),["RNA polymerase reads the template 3'→5' and builds mRNA 5'→3'. Replace each DNA base with its RNA complement (remember: T in DNA → A in RNA, A → U)."]);

E("bio-u2-67-q04",2,["6.7"],1,"var",varset([
  function(){
    return mcq("What is the function of transfer RNA (tRNA) during translation?",
      "It carries amino acids to the ribosome.",
      ["It copies DNA sequences.","It joins Okazaki fragments.","It stores genetic information."],
      "tRNA carries specific amino acids to the ribosome during translation, using its anticodon to match the complementary mRNA codon, placing the correct amino acid in the growing protein chain.",
      {});
  }
]),["tRNA is the molecule that brings something to the ribosome. What does it bring, and how does its anticodon help it place that thing in the right spot?"]);

E("bio-u2-67-q05",2,["6.7"],1,"var",varset([
  function(){
    return mcq("A student determines that the mRNA sequence AUG-GGC-UUU codes for a specific sequence of amino acids. During which process is this information being interpreted?",
      "Translation",
      ["DNA replication","Meiosis","Transcription"],
      "Using mRNA codons at a ribosome to assemble amino acids into a protein is translation . Transcription produces mRNA from DNA. DNA replication copies DNA. Meiosis is cell division.",
      {});
  }
]),["This process uses mRNA codons at a ribosome to assemble amino acids. Is this transcription or translation?"]);

E("bio-u2-67-q06",2,["6.7"],2,"var",varset([
  function(){
    return mcq("A DNA coding strand contains the sequence 5′-ATG GAA TTT-3′. Which mRNA sequence will be produced?",
      "5′-AUG GAA UUU-3′",
      ["3′-AUG GAA UUU-5′","5′-TAC CUU AAA-3′","5′-UAC CUU AAA-3′"],
      "The coding strand has the same sequence as the mRNA, except that DNA uses T where RNA uses U. RNA polymerase reads the template strand, which is the complement of the coding strand (3'-TAC CTT AAA-5'), and builds the mRNA to match the coding strand. Replacing each T with U gives the mRNA: 5'-AUG GAA UUU-3'.",
      {});
  }
]),["The coding strand has the same sequence as mRNA (but with T instead of U). The template strand is its complement. RNA polymerase reads the template, what mRNA does that produce?"]);

E("bio-u2-67-q07",2,["6.7"],2,"var",varset([
  function(){
    var q=mcq("What amino acids will result from the DNA template strand TAC CCG TCT?",
      "methionine, glycine, arginine",
      ["leucine, glycine, cysteine","methionine, proline, threonine","tyrosine, proline, serine"],
      "Transcribe template to mRNA (T→U, A→U, C→G, G→C): TAC → AUG, CCG → GGC, TCT → AGA Use codon table: AUG = Methionine (start), GGC = Glycine, AGA = Arginine",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-67-q07.jpg" alt="Codon table titled \'Amino Acids coded by RNA Codons\', giving the amino acid for each RNA codon by its first, second and third letters" style="max-width:100%;height:auto">';
    return q;
  }
]),["Step 1: Convert the DNA template to mRNA (T→U, A→U, C→G, G→C). Step 2: Use your codon table to find each amino acid."]);

E("bio-u2-67-q08",2,["6.7"],2,"var",varset([
  function(){
    var q=mcq("What amino acid would be found attached to tRNA anticodon GUC?",
      "Glutamine",
      ["Arginine","Aspartate","Valine"],
      "tRNA anticodon GUC pairs with mRNA codon CAG (antiparallel). Using the codon table: CAG = Glutamine (Gln).",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-67-q07.jpg" alt="Codon table titled \'Amino Acids coded by RNA Codons\', giving the amino acid for each RNA codon by its first, second and third letters" style="max-width:100%;height:auto">';
    return q;
  }
]),["The tRNA anticodon pairs with the mRNA codon. GUC is the anticodon, what mRNA codon is complementary to GUC? (Remember antiparallel: G-C, U-A, C-G). Then look it up in the codon table."]);

E("bio-u2-67-q09",2,["6.7"],3,"var",varset([
  function(){
    var q=mcq("Which DNA sequence could have produced the following sequence of amino acids: alanine - proline - valine?",
      "CGA GGG CAC",
      ["CGA GGG GAT","GCU CCC GUG","GCU CCC CUA"],
      "Work backwards using the codon table to find mRNA codons for the given amino acids, then convert to the DNA template strand. Check the sequence CGA GGG CAC against your codon chart: it gives alanine, proline and valine in order, through the mRNA codons GCU, CCC and GUG.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-67-q07.jpg" alt="Codon table titled \'Amino Acids coded by RNA Codons\', giving the amino acid for each RNA codon by its first, second and third letters" style="max-width:100%;height:auto">';
    return q;
  }
]),["Work backwards: look up each amino acid in the codon table to find a possible mRNA codon, then convert that mRNA codon to the DNA template strand (A↔T, U↔A, C↔G)."]);

/* ---------- 6.8 Mutations ---------- */

E("bio-u2-68-q01",2,["6.8"],2,"var",varset([
  function(){
    return mcq("A government is reviewing an application to approve a genetically modified salmon that grows faster than conventional salmon. Which group would most likely place the greatest emphasis on the potential effects on natural ecosystems?",
      "Organizations concerned about biodiversity and wild fish populations",
      ["Biotechnology companies interested in developing new products","Commercial fish farmers interested in increasing production","Consumer advocacy groups focused on food labeling"],
      "Biotechnology companies care about new products (profit). Fish farmers care about production. Consumer groups care about labeling. Only organizations focused on biodiversity and wild fish populations would primarily emphasize the ecological effects on natural ecosystems.",
      {});
  }
]),["Think about which group's PRIMARY concern is the natural environment and wild species, not profit, not production efficiency, and not food labeling."]);

E("bio-u2-68-q02",2,["6.8"],2,"var",varset([
  function(){
    return mcq("A patient is diagnosed with a form of skin cancer resulting from prolonged UV exposure. Years later, the patient has a child. Which of the following statements about the mutation is correct?",
      "somatic mutation; will not be inherited by the child",
      ["germline mutation; may be inherited by the child","germline mutation; will not be inherited by the child","somatic mutation; may be inherited by the child"],
      "Skin cells are somatic (body) cells. UV damage to somatic cell DNA cannot be passed to offspring, only mutations in germ cells (eggs/sperm) are heritable.",
      {});
  }
]),["Skin cells are body cells, not reproductive cells. What type of mutation occurs in body cells, somatic or germline? Can it be passed to children?"]);

E("bio-u2-68-q03",2,["6.8"],3,"var",varset([
  function(){
    return mcq("A scientist has isolated a strand of DNA with the sequence: AAA AGA CCC. Which of the following DNA sequences illustrates a silent mutation of the original strand?",
      "AAG AGA CCC",
      ["AAA ACA CCC","AAA AAC CCC","AAC ACA CCC"],
      "A silent mutation changes a codon without changing the amino acid it codes for. The original sequence AAA AGA CCC codes for lysine, arginine, proline. In AAG AGA CCC the first codon changes from AAA to AAG, and both code for lysine; the other two codons are unchanged, so the protein produced is identical. Every other option changes at least one amino acid: AAA ACA CCC and AAC ACA CCC change the second codon AGA (arginine) to ACA (threonine), and AAA AAC CCC changes it to AAC (asparagine).",
      {});
  }
]),["A silent mutation changes the codon but NOT the amino acid. The original first codon is AAA (lysine). Look up AAA and AAG in your codon table, do they both code for the same amino acid?"]);

E("bio-u2-68-q04",2,["6.8"],1,"var",varset([
  function(){
    return mcq("Which best describes a frameshift mutation?",
      "results from the addition or deletion of a single nucleotide",
      ["does not create a change in the polypeptide produced","results from non-disjunction","results only in silent mutations"],
      "A frameshift occurs when nucleotides are inserted or deleted (not in multiples of 3), shifting the reading frame of all downstream codons. A substitution is NOT a frameshift.",
      {});
  }
]),["A frameshift shifts the reading frame of every codon after the mutation. Which type of change, substitution or insertion/deletion, causes this?"]);

E("bio-u2-68-q05",2,["6.8"],2,"var",varset([
  function(){
    return mcq("A substitution mutation changes a DNA codon from AAA to AAC. What type of mutation has occurred?",
      "Missense mutation",
      ["Frameshift mutation","Nonsense mutation","Silent mutation"],
      "AAA = lysine; AAC = asparagine, a different amino acid. Substituting one amino acid for another = missense mutation. Nonsense = introduces stop codon. Silent = same amino acid. Frameshift = insertion/deletion.",
      {});
  }
]),["AAA codes for lysine. Look up AAC in your codon table. Is the amino acid the same or different? That tells you what type of mutation it is."]);

E("bio-u2-68-q06",2,["6.8"],1,"var",varset([
  function(){
    return mcq("Which process results in Jacob’s syndrome?",
      "Nondisjunction",
      ["Deletion","Insertion","Translocation"],
      "Jacob's syndrome (47,XYY) results from nondisjunction, chromosomes fail to separate properly during meiosis, producing sperm with an extra Y chromosome. Deletion, insertion, translocation are structural mutations.",
      {});
  }
]),["Silent = same amino acid. Missense = different amino acid. Nonsense = stop codon. Frameshift = insertion/deletion (not multiple of 3) shifts reading frame. Somatic mutations not inherited; germline mutations are."]);

E("bio-u2-68-q07",2,["6.8"],1,"var",varset([
  function(){
    return mcq("When a person inherits only a single X chromosome they are said to have this syndrome?",
      "Turner Syndrome",
      ["Down Syndrome","Jacob’s Syndrome","Klienfelter Syndrome"],
      "Turner syndrome (45,X), only one X chromosome. Results from nondisjunction. Individuals are phenotypically female with some developmental differences.",
      {});
  }
]),["A single X chromosome (45,X), which syndrome does that describe? Think about which syndromes you studied that affect the number of sex chromosomes."]);

E("bio-u2-68-q08",2,["6.8"],2,"var",varset([
  function(){
    var q=mcq("Which type of chromosome mutation is shown?",
      "Duplication",
      ["Deletion","Inversion","translocation"],
      "Look at the diagram: if a segment appears copied and present twice in the same chromosome, that's a duplication. Check for a repeated sequence within the chromosome shown.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-68-q08.png" alt="Diagram of a banded chromosome before and after a change: after the change the chromosome is longer, with the yellow banded segment repeated (duplication)" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the diagram carefully. Is a segment missing? Present twice? Flipped? Moved to a different chromosome? Match what you see to: deletion, duplication, inversion, or translocation."]);

E("bio-u2-68-q09",2,["6.8"],2,"var",varset([
  function(){
    var q=mcq("What type of mutation is demonstrated in the image?",
      "Inversion",
      ["Deletion","Duplication","Translocation"],
      "An inversion: a chromosomal segment breaks off, flips 180°, and reinserts in the reversed orientation. Look for a sequence that is backwards compared to the original chromosome.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-68-q09.png" alt="Diagram of chromosome segments labelled A B C D E F before, and A B D C E F after, with segments C and D swapped in order (inversion)" style="max-width:100%;height:auto">';
    return q;
  }
]),["An inversion flips a segment backwards within the same chromosome. A translocation moves a segment to a different chromosome. Which does the image show?"]);

E("bio-u2-68-q10",2,["6.8"],1,"var",varset([
  function(){
    return mcq("During chromosome analysis, a section of DNA is found to have broken off one chromosome and attached to a non-homologous chromosome. Which mutation is represented?",
      "Translocation",
      ["Deletion","Duplication","Inversion"],
      "Translocation: a segment of one chromosome breaks off and attaches to a non-homologous chromosome. Different from deletion (lost entirely), inversion (flipped same chromosome), or duplication.",
      {});
  }
]),["When a piece of chromosome breaks off and attaches to a DIFFERENT chromosome, what is this type of mutation called?"]);

E("bio-u2-68-q11",2,["6.8"],2,"var",varset([
  function(){
    var q=mcq("What condition is represented by the karyotype?",
      "Male with Down Syndrome",
      ["Female with Down Syndrome","Female with Edward Syndrome","Male with Edward Syndrome"],
      "A karyotype showing 47 chromosomes with trisomy 21 = Down Syndrome. Check sex chromosomes: XY = male. Male with trisomy 21 = Male with Down Syndrome.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u2-68-q11.png" alt="Karyotype showing three copies of chromosome 21 and one X and one Y chromosome" style="max-width:100%;height:auto">';
    return q;
  }
]),["Count the chromosomes in the karyotype. Are there 47? Look at which chromosome pair has an extra copy. Trisomy 21 = Down, Trisomy 13 = Patau, Trisomy 18 = Edwards."]);

E("bio-u2-68-q12",2,["6.8"],1,"var",varset([
  function(){
    return mcq("A hospital worker is exposed to radiation during an accident. Which type of mutagen is responsible for the increased risk of DNA mutations?",
      "Physical mutagen",
      ["Biological mutagen","Chemical mutagen","Genetic mutagen"],
      "Radiation (UV, X-rays) is a physical mutagen, it uses physical energy to damage DNA. Chemical mutagens chemically alter DNA bases. Biological mutagens include viruses that insert DNA.",
      {});
  }
]),["Mutagens are classified as physical, chemical, or biological. Radiation, like UV or X-rays, transfers energy. Which category of mutagen fits?"]);

/* ---------- 6.9 and 6.10 Mutagens and Genetic Technologies ---------- */

E("bio-u2-69-q01",2,["6.9","6.10"],2,"var",varset([
  function(){
    return mcq("A researcher discovers a DNA sequence in several patients who share the same inherited disorder. The researcher compares the sequence to information collected through the Human Genome Project. How does the Human Genome Project help in this situation?",
      "It provides a reference map of human genes that can help identify mutations associated with disease.",
      ["It allows scientists to clone healthy organs for patients.","It automatically corrects mutations in affected individuals.","It provides a collection of human DNA samples for medical testing."],
      "The Human Genome Project mapped all human genes, providing a reference that researchers use to find disease-associated sequences and develop targeted treatments.",
      {});
  }
]),["The Human Genome Project created a complete map of all human genes. How would having that map help a researcher studying a disease-related DNA sequence?"]);

E("bio-u2-69-q02",2,["6.9","6.10"],2,"var",varset([
  function(){
    return mcq("A scientist finds only a few molecules of DNA at a crime scene. Which technology would be most useful for producing enough DNA for analysis?",
      "PCR",
      ["DNA sequencing","Gel electrophoresis","Restriction digestion"],
      "PCR (Polymerase Chain Reaction) amplifies tiny amounts of DNA millions of times. It's the standard technique for forensics and diagnosis when only trace DNA is available.",
      {});
  }
]),["This technique copies (amplifies) a tiny amount of DNA millions of times so it can be studied. It uses repeated heating and cooling cycles. What is it called?"]);

E("bio-u2-69-q03",2,["6.9","6.10"],1,"var",varset([
  function(){
    return mcq("A scientist wants to insert a human insulin gene into a bacterial plasmid. What is the role of restriction enzymes in this process?",
      "Cut DNA at specific sequences",
      ["Copy the insulin gene","Join DNA fragments together","Separate DNA fragments by size"],
      "Restriction enzymes recognize specific DNA sequences and cut them, creating sticky ends that can be joined with the target gene using DNA ligase to create recombinant DNA.",
      {});
  }
]),["To insert a gene into a plasmid, you need to cut the DNA at a specific location. Which enzymes act like molecular scissors to cut DNA at specific sequences?"]);

E("bio-u2-69-q04",2,["6.9","6.10"],1,"var",varset([
  function(){
    return mcq("Which biotechnology would be most useful if a scientist wanted to directly change the sequence of a gene?",
      "CRISPR",
      ["DNA sequencing","Gel electrophoresis","PCR"],
      "CRISPR-Cas9 is a precise gene-editing system that can target, cut, and modify specific DNA sequences within a genome. It's used to correct mutations and develop therapies.",
      {});
  }
]),["PCR amplifies DNA. Restriction enzymes cut at specific sequences. CRISPR edits specific genes. Gel electrophoresis separates DNA by size."]);

/* ---------- STSE 9.1 How Science Explains ---------- */

E("bio-u2-91-q01",2,["9.1"],1,"var",varset([
  function(){
    return mcq("How does science differ from early explanations of inheritance based on tradition or belief?",
      "Science relies on observations and evidence to test ideas",
      ["Science accepts explanations without experimentation","Science assumes explanations cannot change","Science relies on authority figures to determine truth"],
      "Scientific explanations are built on observations and evidence and are tested against new data, Mendel's counted crosses are the example here. Traditional explanations rested on belief or authority and were not tested, so they could not be confirmed or corrected the way scientific ideas can.",
      {});
  }
]),["Ask what Mendel did that earlier explanations of inheritance never did, he counted, compared, and tested. Which option describes that approach?"]);

/* ---------- STSE 9.2 Evidence, Theories and Paradigms ---------- */

E("bio-u2-92-q01",2,["9.2"],2,"var",varset([
  function(){
    return mcq("Why is Mendel's work considered a major change in how scientists understood heredity?",
      "It showed that traits are passed on as separate units rather than blending together",
      ["It proved that all traits are controlled by one gene","It replaced chromosome theory with gene theory","It showed that traits are inherited randomly"],
      "Mendel showed that hereditary factors are passed on as separate, stable units, they do not blend, and a recessive factor can pass through a generation unchanged and reappear later. That replaced the old blending model of inheritance and laid the foundation for the gene concept.",
      {});
  }
]),["Before Mendel, the leading idea was that offspring traits were a blend of the parents', like mixing paint. What did the reappearance of recessive traits in the F2 prove about how traits are actually passed on?"]);

/* ============ mid-course scope ============ */
/* Mid-course scope (PEP Table of Specifications, verified Nov 12,
   2026): the mid-course exam samples Unit 2 only through indicator
   6.4, so the entries for 6.5 to 6.10 (the final review book's
   molecular genetics chapters) are flagged postMid and held out
   whenever the Mid preset is active. Picking Unit 2 directly still
   serves the full unit. */
BANK.forEach(function(e){if(e.id==="bio-u2-65-q01"||e.id==="bio-u2-65-q02"||e.id==="bio-u2-65-q03"||e.id==="bio-u2-65-q04"||e.id==="bio-u2-65-q05"||e.id==="bio-u2-65-q06"||e.id==="bio-u2-65-q07"||e.id==="bio-u2-66-q01"||e.id==="bio-u2-66-q02"||e.id==="bio-u2-66-q03"||e.id==="bio-u2-66-q04"||e.id==="bio-u2-66-q05"||e.id==="bio-u2-67-q01"||e.id==="bio-u2-67-q02"||e.id==="bio-u2-67-q03"||e.id==="bio-u2-67-q04"||e.id==="bio-u2-67-q05"||e.id==="bio-u2-67-q06"||e.id==="bio-u2-67-q07"||e.id==="bio-u2-67-q08"||e.id==="bio-u2-67-q09"||e.id==="bio-u2-68-q01"||e.id==="bio-u2-68-q02"||e.id==="bio-u2-68-q03"||e.id==="bio-u2-68-q04"||e.id==="bio-u2-68-q05"||e.id==="bio-u2-68-q06"||e.id==="bio-u2-68-q07"||e.id==="bio-u2-68-q08"||e.id==="bio-u2-68-q09"||e.id==="bio-u2-68-q10"||e.id==="bio-u2-68-q11"||e.id==="bio-u2-68-q12"||e.id==="bio-u2-69-q01"||e.id==="bio-u2-69-q02"||e.id==="bio-u2-69-q03"||e.id==="bio-u2-69-q04")e.postMid=true;});

/* Final-scope cap (Jason's ruling, Nov 12, 2026): the final preset
   starts Unit 2 at indicator 6.5, so every Unit 2 entry in the
   classical half (6.1 to 6.4, plus STSE 9.1 and 9.2) is flagged
   preFinal, and poolFor holds flagged entries out whenever the
   final scope is composed. bank-gen-pedigree.js, the last bio
   slice in the assembly order, repeats this flagging so the
   generator entries for 6.2 to 6.4 are covered too. */
BANK.forEach(function(e){if(e.unit===2&&e.indicators.some(function(c){return ["6.1","6.2","6.3","6.4","9.1","9.2"].indexOf(c)>=0;}))e.preFinal=true;});

/* ----- bank-u3.js ----- */
// Biology 3201 Unit 3 bank: Evolutionary Change and Biodiversity
// No CRMARKS entries in this file (selected response only).

/* ---------- Conversion notes (Nov 12, 2026) ----------
   The 82 questions of the Final Exam Review book for Unit 3,
   converted faithfully: stems, options and keys as in the book;
   each book Solution panel is the worked solution and each Hint
   panel is the first hint stage. The books' Help panels (video
   pointers) have no slot in the app and are not carried. Levels
   are the authoritative tags from the level pass
   (bio3201-levels.json). The two shared chapters carry both of
   their indicator codes on every entry. Conversion fixes, kept
   minimal: em dashes in the book text become commas (house
   style); the one solution that pointed at the book's option
   letters (7.10 q08) now names the options' content, because
   the shell re-sorts option order; and the cytochrome c
   question (7.3 & 7.4 q07) carries the book's data table as its
   figure, per bio3201-fixes.json, because the table sits in the
   book as an H5P.Table element rather than as question media.
   The book solutions end with a check mark and a short
   restatement of the answer; per Jason's Nov 12, 2026
   consistency ruling those recaps are stripped (Units 1
   and 2 do not carry them), except the cytochrome c
   question, whose recap gloss is kept as a closing
   sentence. One keyed option's spelling is corrected
   (Archea to Archaea) per bio3201-fixes.json. */

/* ---------- 7.1 Natural Selection & Biodiversity ---------- */

E("bio-u3-71-q01",3,["7.1"],2,"var",varset([
  function(){
    return mcq("Charles Darwin was heavily influenced by Charles Lyell’s principles of geology. Which of the following best describes their relationship?",
      "It demonstrates that new scientific theories often build upon ideas in other disciplines.",
      ["It shows that scientific disciplines operate completely independently of one another.","It proves that biological observations are inherently less reliable than geological data.","It illustrates that Darwin had to disprove geology in order to establish biology."],
      "Lyell's uniformitarianism showed Earth was far older than previously thought, old enough for gradual evolution. Darwin's new theory built on this existing geological knowledge from another field.",
      {});
  }
]),["Lyell showed that Earth was very old (uniformitarianism). How did knowing Earth was old help Darwin develop his theory of natural selection?"]);

E("bio-u3-71-q02",3,["7.1"],1,"var",varset([
  function(){
    return mcq("Which of the following statements provides the most accurate definition of evolution?",
      "The relative change in genetic traits of populations that occurs over successive generations.",
      ["The guaranteed, progressive drive of a species to become more complex, perfect, and powerful over time.","The process by which an individual organism alters its physical traits to better suit its environment during its own lifespan.","The sudden, massive mutation in a single organism's DNA that instantly creates a brand-new species."],
      "Evolution is a population-level phenomenon, it is the change in allele frequencies within a population over generations. Individual organisms do not evolve; populations do.",
      {});
  }
]),["Evolution happens to populations, not to individual organisms. Which answer describes change in a population's genetic makeup over generations?"]);

E("bio-u3-71-q03",3,["7.1"],1,"var",varset([
  function(){
    return mcq("What is microevolution?",
      "Change in genetic traits in a population over generations",
      ["Change in species over geologic time","Extinction of species","Sudden creation of new species"],
      "Microevolution is small-scale change in allele frequencies within a population over generations, within a species. Example: antibiotic resistance increasing in a bacterial population.",
      {});
  }
]),["Micro = small scale. Microevolution is change within a species. Which answer describes change in allele frequencies within a population over time?"]);

E("bio-u3-71-q04",3,["7.1"],1,"var",varset([
  function(){
    return mcq("Which condition increases genetic variation in populations?",
      "Mutation",
      ["Asexual reproduction","Inbreeding","Stabilizing selection"],
      "Mutation is the only source of genuinely new alleles. Sexual reproduction shuffles existing alleles; selection and drift reduce diversity; mutation creates new variation.",
      {});
  }
]),["Genetic variation can come from reshuffling existing alleles OR from creating brand new alleles. Which answer creates truly NEW alleles that didn't exist before?"]);

E("bio-u3-71-q05",3,["7.1"],2,"var",varset([
  function(){
    return mcq("Why is crossing over during meiosis critical to the evolution of a population?",
      "It increases genetic diversity by creating new combinations of alleles on a single chromosome.",
      ["It doubles the total number of chromosomes in the gametes to make offspring more robust.","It ensures that every gamete produced contains an identical set of genetic information.","It fixes harmful mutations that occur during DNA replication so that organisms remain healthy."],
      "Crossing over shuffles alleles between homologous chromosomes, creating new combinations in gametes, increasing genetic diversity available for natural selection to act on.",
      {});
  }
]),["Crossing over shuffles gene combinations on chromosomes. How does producing new combinations of alleles benefit a population that faces changing environments?"]);

E("bio-u3-71-q06",3,["7.1"],1,"var",varset([
  function(){
    return mcq("Which situation best illustrates artificial selection?",
      "Farmers breeding cattle with higher milk production",
      ["Bacteria becoming resistant to antibiotics","Finches evolving different beak shapes on islands","Predators removing weaker individuals from a population"],
      "Artificial selection = humans deliberately choosing which organisms breed. Farmers selecting cattle for milk production is the classic example, humans are the selecting agent.",
      {});
  }
]),["Artificial selection = humans choosing which organisms breed. Which example shows a human deliberately selecting for a specific trait over many generations?"]);

E("bio-u3-71-q07",3,["7.1"],2,"var",varset([
  function(){
    return mcq("Why can artificial selection reduce genetic diversity within a population?",
      "Desired traits are often selected from a limited number of individuals",
      ["Artificial selection prevents mutations from occurring","Organisms lose chromosomes during selective breeding","Recessive alleles are eliminated from all future generations"],
      "Only individuals with desired traits are bred, excluding most of the gene pool. Over generations, the genetic diversity narrows to alleles associated with the desired trait.",
      {});
  }
]),["If only individuals with one specific trait are bred, what happens to all the other genetic variants in the population over many generations?"]);

E("bio-u3-71-q08",3,["7.1"],2,"var",varset([
  function(){
    return mcq("A physician notices that an antibiotic is becoming less effective against a bacterial infection. Which explanation best accounts for this observation?",
      "Resistant bacteria survived and reproduced.",
      ["Bacteria intentionally adapted to survive.","Humans became resistant to the antibiotic.","The antibiotic increased bacterial reproduction."],
      "Before antibiotic use, a few bacteria already had resistance mutations. The antibiotic killed sensitive bacteria; resistant ones survived and reproduced, passing on resistance, classic natural selection.",
      {});
  }
]),["Before the antibiotic was used, a few bacteria already had resistance genes. What happens to those resistant bacteria when the antibiotic kills all the sensitive ones?"]);

E("bio-u3-71-q09",3,["7.1"],2,"var",varset([
  function(){
    var q=mcq("This data was collected for a population of peppered moths between 1848 and 1858. Which of the following best describes the data?",
      "Environmental changes caused dark colored moths to have a selective advantage",
      ["Environmental changes caused light colored moths to have a selective advantage","Environmental changes caused spontaneous mutations in light colored moths","Environmental changes caused spontaneous mutations in dark colored moths"],
      "Between 1848–1858, industrial pollution darkened tree bark in England. Light-colored moths became more visible to predators on dark bark, while dark moths were camouflaged. Dark moths had a selective advantage, their frequency increased. This is industrial melanism, a classic example of directional natural selection driven by environmental change.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u3-71-q09.png" alt="Data table of peppered moths captured over 10 years: light moths captured fall from 565 to 56 while dark moths captured rise from 64 to 637" style="max-width:100%;height:auto">';
    return q;
  }
]),["The data shows moth population changes from 1848–1858 during industrial pollution. Which color moth would be better camouflaged on soot-darkened trees?"]);

E("bio-u3-71-q10",3,["7.1"],1,"var",varset([
  function(){
    return mcq("A small island bird population is unable to adapt quickly enough to a rapidly changing environment and disappears from the island. This outcome is best described as:",
      "Extirpation",
      ["Adaptive radiation","Gene flow","Speciation"],
      "Extirpation = local extinction (species disappears from a specific area but survives elsewhere). Extinction = global disappearance. If only the island population dies out, that's extirpation.",
      {});
  }
]),["If a population disappears from one specific location but still exists elsewhere, that's different from full extinction. What word describes local disappearance of a species?"]);

/* ---------- 7.2 History of Evolutionary Thought ---------- */

E("bio-u3-72-q01",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Prior to the sixteenth century, what was the dominant western paradigm regarding species?",
      "Species were created simultaneously and remained unchanged",
      ["Species changed through acquired characteristics","Species evolved through natural selection","Species originated from common ancestors"],
      "Before the scientific revolution, the dominant western view was that species were created simultaneously by God and remained fixed and unchanging, this is called the doctrine of special creation or fixity of species. It wasn't until the 1800s that naturalists like Lamarck and Darwin proposed that species could change over time.",
      {});
  }
]),["Think about what people believed about life on Earth BEFORE Darwin, Lamarck, or the scientific revolution changed those ideas. What was the traditional religious and philosophical view about whether species could change?"]);

E("bio-u3-72-q02",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Which scientist proposed catastrophism to explain patterns observed in the fossil record?",
      "Georges Cuvier",
      ["Charles Darwin","Charles Lyell","Jean Baptiste Lamarck"],
      "Georges Cuvier proposed catastrophism, periodic sudden catastrophic events caused mass extinctions, after which new species appeared. He studied French fossil records and noticed abrupt species changes between rock layers.",
      {});
  }
]),["Catastrophism explains why different species appear in different rock layers. Which scientist proposed that sudden disasters (like floods) wiped out species, leaving gaps in the fossil record?"]);

E("bio-u3-72-q03",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Mary Anning's discoveries contributed most directly to:",
      "Evidence from fossils supporting extinction and change over time",
      ["Development of genetic engineering","Hardy-Weinberg calculations","Understanding DNA structure"],
      "Anning discovered key marine reptile fossils in 19th-century England. Her finds showed past organisms looked radically different from modern ones, supporting extinction and biological change over time.",
      {});
  }
]),["Anning found fossils of creatures that no longer existed. What do fossils of extinct organisms tell us about life on Earth over time?"]);

E("bio-u3-72-q04",3,["7.2"],1,"var",varset([
  function(){
    return mcq("What best describes Darwin’s theory of evolution?",
      "Natural selection",
      ["Inheritance of acquired characteristics","Molecular inheritance","Particulate inheritance"],
      "The correct answer is: Natural selection Review your class notes and textbook for this topic.",
      {});
  }
]),["Lamarck: use/disuse + acquired characteristics (wrong mechanism). Darwin/Wallace: natural selection (correct). Lyell: uniformitarianism (Earth is old). Cuvier: catastrophism. Anning: fossil discoveries. Malthus: competition for resources."]);

E("bio-u3-72-q05",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Which principle proposed by Charles Lyell influenced Darwin's thinking?",
      "Uniformitarianism",
      ["Acquired characteristics","Competition among populations","Use and disuse"],
      "Uniformitarianism: geological processes operate slowly and uniformly, the same processes today operated in the past. This implied Earth was vastly old, giving sufficient time for gradual evolution.",
      {});
  }
]),["Darwin read Lyell's geology book on his voyage. Lyell argued that slow, consistent processes shape Earth. What principle is this, and how did it affect Darwin's thinking about the timescale of evolution?"]);

E("bio-u3-72-q06",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Why has Lamarck’s theory of evolution been rejected by modern biologists?",
      "The characteristics an organism acquires during its lifetime cannot be passed on to its offspring.",
      ["His theory provided a genetic mechanism for how evolutionary change occurred.","His theory was based on special creation.","The selection experiments he conducted on giraffe’s necks involved artificial and not natural selection."],
      "The correct answer is: The characteristics an organism acquires during its lifetime cannot be passed on to its offspring. Review your class notes and textbook for this topic.",
      {});
  }
]),["Lamarck: use/disuse + acquired characteristics (wrong mechanism). Darwin/Wallace: natural selection (correct). Lyell: uniformitarianism (Earth is old). Cuvier: catastrophism. Anning: fossil discoveries. Malthus: competition for resources."]);

E("bio-u3-72-q07",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Which observation most influenced Darwin's development of natural selection?",
      "Individuals within populations show variation in traits",
      ["Mutations occur at predictable rates","Organisms inherit acquired characteristics","Species remain unchanged over time"],
      "Darwin observed heritable variation within populations. Combined with Malthus's insight about competition for limited resources, he realized advantageous variants would survive and reproduce more, natural selection.",
      {});
  }
]),["Darwin noticed that individuals within the same species aren't identical. What did he observe that was the starting point for his theory?"]);

E("bio-u3-72-q08",3,["7.2"],1,"var",varset([
  function(){
    return mcq("Which scientist proposed the theory of acquired characteristics?",
      "Lamarck",
      ["Darwin","Lyell","Wallace"],
      "Jean-Baptiste Lamarck proposed the theory of acquired characteristics (use and disuse) in the early 1800s. While his mechanism was wrong, he was among the first to formally propose that species change over time.",
      {});
  }
]),["This scientist believed organisms developed new traits by using or not using body parts, and passed those changes to offspring. Who was this early evolutionary thinker?"]);

E("bio-u3-72-q09",3,["7.2"],2,"var",varset([
  function(){
    return mcq("A population of insects contains both pesticide-resistant and pesticide-sensitive individuals. After several generations of pesticide use, resistant insects make up most of the population. Which statement best explains this change?",
      "Natural selection increased the frequency of resistant alleles.",
      ["Individual insects developed resistance because they needed it.","The pesticide caused all insects to mutate.","Resistant insects reproduced less successfully."],
      "Before pesticide use, resistance mutations existed in a few individuals. The pesticide killed sensitive insects; resistant ones survived and reproduced. The resistance allele became more common, directional natural selection.",
      {});
  }
]),["Before the pesticide, resistance mutations already existed in a few insects. When the pesticide was applied, what happened to the sensitive insects vs. the resistant ones?"]);

E("bio-u3-72-q10",3,["7.2"],1,"var",varset([
  function(){
    return mcq("What is the primary purpose of peer review?",
      "To ensure scientific work is evaluated by experts before publication",
      ["To eliminate competing theories","To guarantee that scientific conclusions are correct","To prevent scientific theories from changing"],
      "Peer review is evaluation of scientific work by independent experts before publication. It ensures methods are sound, conclusions are supported by evidence, and results are valid, the key quality-control mechanism in science.",
      {});
  }
]),["Peer review is a quality check in science. Who reviews the work, and what does this process ensure before results are published?"]);

E("bio-u3-72-q11",3,["7.2"],2,"var",varset([
  function(){
    return mcq("Which statement best contrasts Lamarck's and Darwin's theories of evolution?",
      "Lamarck believed individuals adapt during their lifetime, while Darwin believed nature selects pre-existing variations.",
      ["Lamarck argued that evolution happens across populations, while Darwin argued that individuals change their own DNA.","Lamarck stated that traits are inherited by pure chance, while Darwin stated that organisms choose their traits.","Lamarck noted that only the strongest organisms pass on genes, while Darwin noted all organisms have equal fitness."],
      "Lamarck: individuals adapt via use/disuse then pass changes to offspring. Darwin: heritable variation already exists; natural selection acts on that existing variation over generations, populations change, not individuals.",
      {});
  }
]),["Lamarck: giraffes stretched their necks during their lifetime and offspring inherited longer necks. Darwin: giraffes with naturally longer necks survived better and had more offspring. What's the key difference?"]);

E("bio-u3-72-q12",3,["7.2"],2,"var",varset([
  function(){
    return mcq("A population of birds gradually develops stronger beaks because birds with naturally stronger beaks survive drought conditions more successfully. What theory does this best support?",
      "Darwin's theory",
      ["Lamarck's theory","Spontaneous generation","Use and disuse"],
      "Slow, continuous generational change where stronger-beaked birds survive better matches Darwin's theory of evolution by natural selection operating gradually over many generations.",
      {});
  }
]),["This describes slow, steady evolutionary change across many generations. Which evolutionary model, gradualism or punctuated equilibrium, fits this pattern?"]);

/* ---------- 7.3 & 7.4 Evidence for Evolution ---------- */

E("bio-u3-73-q01",3,["7.3","7.4"],1,"var",varset([
  function(){
    return mcq("Scientists discover a fossil with both reptilian and avian characteristics. Why is this fossil important evidence for evolution?",
      "It represents a transitional form between major groups.",
      ["It demonstrates artificial selection.","It proves evolution occurs rapidly.","It shows that species never become extinct."],
      "A fossil showing features of two different groups (like Archaeopteryx) is a transitional fossil, direct evidence of common ancestry and evolutionary change between major groups.",
      {});
  }
]),["A fossil showing features of TWO major animal groups is evidence of a link between them. What is the term for this type of in-between fossil?"]);

E("bio-u3-73-q02",3,["7.3","7.4"],1,"var",varset([
  function(){
    return mcq("Which type of fossil is most useful for correlating the relative ages of rock layers?",
      "Index fossil",
      ["Cast fossil","Petrified fossil","Trace fossil"],
      "Index fossils: (1) short geological time period, (2) geographically widespread, (3) easily identified. These properties make them ideal for dating and correlating rock layers at different locations worldwide.",
      {});
  }
]),["An index fossil must have three qualities: existed for a short time, was widespread, and is easily recognized. Which type of fossil fits all three?"]);

E("bio-u3-73-q03",3,["7.3","7.4"],1,"var",varset([
  function(){
    return mcq("Two species living on different continents share many structural similarities despite geographic separation. Which evidence for evolution does this primarily represent?",
      "Biogeography",
      ["Comparative embryology","Fossil succession","Radiometric dating"],
      "Biogeography studies species distribution. Species on separated continents sharing structural similarities reflects shared ancestry when those continents were joined (Pangaea), supporting common descent.",
      {});
  }
]),["These species are now separated by an ocean, but they share structural features. What study of species distribution explains this by looking at ancient continental positions?"]);

E("bio-u3-73-q04",3,["7.3","7.4"],1,"var",varset([
  function(){
    return mcq("Which pair of structures is most likely homologous?",
      "Human arm and whale flipper",
      ["Bird wing and insect wing","Octopus eye and human eye","Shark fin and dolphin fin"],
      "Homologous structures share the same bone arrangement due to common ancestry. Human arm and whale flipper both have humerus-radius-ulna-carpals-phalanges, same origin, different function. Butterfly and bird wings look similar but evolved independently (analogous).",
      {});
  }
]),["Homologous structures have the same basic bone arrangement from a common ancestor, even if they're used differently. Which pair comes from the same ancestral limb structure?"]);

E("bio-u3-73-q05",3,["7.3","7.4"],1,"var",varset([
  function(){
    return mcq("While examining embryos, scientists notice that fish, birds, and mammals all possess pharyngeal slits during development. What does this observation suggest?",
      "These organisms share a common ancestor.",
      ["All vertebrates are identical species.","Embryological structures never change.","Evolution occurs through artificial selection."],
      "The remarkable similarity between early embryos of fish, birds, and mammals (including gill slits and tails) reflects their shared evolutionary heritage, all descended from a common ancestor.",
      {});
  }
]),["Early embryos of very different animals look remarkably similar. What does this similarity suggest about their evolutionary history?"]);

E("bio-u3-73-q06",3,["7.3","7.4"],1,"var",varset([
  function(){
    return mcq("Which of the following illustrates the relationship between bird, butterfly and bat wings?",
      "Analogous structures",
      ["Homologous structures","Relative structures","Vestigial structures"],
      "Bird wings and butterfly wings both enable flight but evolved completely independently in unrelated lineages. Same function, different origin = analogous structures (convergent evolution).",
      {});
  }
]),["These wings look similar and all allow flight, but evolved completely independently. What term describes structures that have the same function but different evolutionary origins?"]);

E("bio-u3-73-q07",3,["7.3","7.4"],2,"var",varset([
  function(){
    var q=mcq("Cytochrome C is a protein that is present in many living organisms. Based on the information below, which two species are least closely related?",
      "Species A and D",
      ["Species A and B","Species B and C","Species B and D"],
      "The number of amino acid differences in cytochrome c indicates evolutionary distance, fewer differences = more closely related. From the table, Species A and D have the most differences (12), making them the most distantly related (least closely related) pair among the options. Most differences = least closely related.",
      {});
    q.figure='<table><caption>Number of Amino Acid Differences in Cytochrome c</caption><tr><th>Species</th><th>Species A</th><th>Species B</th><th>Species C</th><th>Species D</th></tr><tr><th>Species A</th><td>-</td><td>1</td><td>5</td><td>12</td></tr><tr><th>Species B</th><td>1</td><td>-</td><td>4</td><td>11</td></tr><tr><th>Species C</th><td>5</td><td>4</td><td>-</td><td>10</td></tr><tr><th>Species D</th><td>12</td><td>11</td><td>10</td><td>-</td></tr></table>';
    return q;
  }
]),["The table shows amino acid differences in cytochrome C between species. MORE differences = MORE evolutionary distance. Which pair of species has the MOST differences?"]);

E("bio-u3-73-q08",3,["7.3","7.4"],2,"var",varset([
  function(){
    return mcq("A fossil record shows that the earliest animals lacked specialized tissues, while later groups possessed nervous and digestive systems. Which conclusion is best supported?",
      "Animal evolution shows increasing structural complexity over time.",
      ["All animal groups evolved simultaneously.","Early animals were more complex than modern animals.","Specialized tissues decreased evolutionary fitness."],
      "The fossil record shows a general trend from simple, undifferentiated organisms to increasingly complex, specialized ones. This is one of the major patterns documented in the fossil record supporting evolutionary theory.",
      {});
  }
]),["Look at the progression in the fossil record from simple to complex animals. What trend does this show about how animal body plans have changed over time?"]);

/* ---------- 7.5 How Species Evolve ---------- */

E("bio-u3-75-q01",3,["7.5"],2,"var",varset([
  function(){
    return mcq("A conservation program uses cloning to increase the population size of an endangered species. What is a potential evolutionary concern associated with this strategy?",
      "Cloning will reduce genetic diversity within the population, leaving it highly vulnerable to disease.",
      ["Cloning increases adaptive mutation rates, disrupting local food webs.","It will trigger the reproductive isolation and speciation of competing species.","The cloned individuals will undergo rapid gene transfer with local bacteria."],
      "Clones are genetically identical. A population of clones has near-zero genetic diversity, all individuals are equally vulnerable to pathogens or environmental changes, making the population highly susceptible to disease or extinction.",
      {});
  }
]),["If all individuals in a population are genetically identical clones, what happens when they encounter a new disease or environmental change?"]);

E("bio-u3-75-q02",3,["7.5"],1,"var",varset([
  function(){
    return mcq("A crop has been genetically engineered to resist insect pests. Which benefit is most likely?",
      "Reduced crop losses due to insect damage",
      ["Increased pesticide use","Increased species extinction","Reduced genetic variation within all wild plants"],
      "The most direct benefit of pest resistance: fewer insects destroy the crop → reduced crop losses → higher yields. This is the primary agricultural benefit of the technology.",
      {});
  }
]),["A crop that kills its own pests means farmers use fewer pesticides and lose fewer plants. What is the most direct agricultural benefit of this modification?"]);

E("bio-u3-75-q03",3,["7.5"],2,"var",varset([
  function(){
    return mcq("A genetically modified salmon grows faster than wild salmon and escapes into natural waterways. Which evolutionary consequence is most likely to concern scientists?",
      "Increased gene flow into wild populations",
      ["Increased index fossil formation","Reduced mutation rates","Stabilizing selection in all fish species"],
      "GM salmon breeding with wild salmon introduces GM genes into the wild gene pool, this is gene flow. The concern is that faster-growing GM genes spread through wild populations, altering their genetic makeup.",
      {});
  }
]),["If GM salmon breed with wild salmon in rivers, their genes enter the wild population. What is it called when genes move from one population into another?"]);

E("bio-u3-75-q04",3,["7.5"],1,"var",varset([
  function(){
    return mcq("Two frog species breed in the same pond but at different times of the year. What is this an example of?",
      "temporal isolation",
      ["behavioural isolation","gametic isolation","mechanical isolation"],
      "When species in the same habitat breed at different times, they can't mate, temporal isolation. This is a prezygotic barrier preventing interbreeding despite sharing the same habitat.",
      {});
  }
]),["These species share the same habitat (pond) but breed at different times of year. What type of reproductive barrier prevents them from interbreeding?"]);

E("bio-u3-75-q05",3,["7.5"],1,"var",varset([
  function(){
    return mcq("What is represented when male birds of two closely related species perform different courtship displays, preventing mating?",
      "behavioural isolation",
      ["hybrid sterility","mechanical isolation","temporal isolation"],
      "Different courtship displays mean individuals don't recognize each other as potential mates, behavioural isolation. This is a prezygotic barrier where different mating behaviors prevent interbreeding.",
      {});
  }
]),["When two species have different courtship songs or dances, individuals don't recognize each other as potential mates. What type of reproductive barrier is this?"]);

E("bio-u3-75-q06",3,["7.5"],2,"var",varset([
  function(){
    return mcq("Which best illustrates geographic isolation?",
      "Pine martin in Labrador and pine martin on the island of Newfoundland",
      ["Fall-mating leopard frogs and spring-mating leopard frogs","Pine martin in southern Labrador and pine martin in northern Labrador","Winter-mating red squirrels and summer-mating red squirrels"],
      "Pine martins in Labrador vs. Newfoundland are separated by the Strait of Belle Isle, a physical barrier preventing gene flow between populations. This is allopatric speciation in progress.",
      {});
  }
]),["Geographic isolation requires a physical barrier that separates two populations of the same species. Which answer involves a physical separation between two groups?"]);

E("bio-u3-75-q07",3,["7.5"],1,"var",varset([
  function(){
    return mcq("What type of reproductive barrier occurs when two species successfully mate and produce offspring, but the offspring cannot reproduce?",
      "hybrid sterility",
      ["gametic isolation","hybrid breakdown","hybrid inviability"],
      "Postzygotic barriers act after fertilization. Hybrid sterility = the hybrid offspring is viable but infertile (like mules from horse × donkey), preventing gene flow between species.",
      {});
  }
]),["This barrier occurs AFTER mating, the offspring are born but can't reproduce. What is the term for hybrid offspring that are sterile?"]);

E("bio-u3-75-q08",3,["7.5"],2,"var",varset([
  function(){
    return mcq("Two populations of the same species become separated by a newly formed canyon. Thousands of years later they can no longer interbreed. What was the initial mechanism that led to speciation?",
      "Geographic isolation",
      ["Behavioural isolation","Gametic isolation","Temporal isolation"],
      "A physical barrier forms → populations can't interbreed → they evolve independently → potential speciation. Starting point of allopatric speciation is geographic isolation.",
      {});
  }
]),["When a physical barrier divides one population into two, they can no longer share genes. What is the first step in this process called?"]);

E("bio-u3-75-q09",3,["7.5"],1,"var",varset([
  function(){
    return mcq("Which is an example of postzygotic isolation?",
      "Hybrid offspring are sterile",
      ["Courtship behaviors don’t match","Gametes can’t fuse","Mating seasons differ"],
      "Postzygotic barriers activate after fertilization. Sterile hybrid offspring (like mules) prevent gene flow, a zygote formed and developed, but the offspring can't reproduce.",
      {});
  }
]),["Postzygotic barriers act AFTER fertilization. Which answer describes something that happens to the offspring (not before mating)?"]);

E("bio-u3-75-q10",3,["7.5"],1,"var",varset([
  function(){
    return mcq("Sharks are cartilaginous fish while dolphins are mammals, yet both have similar shaped bodies. What best describes this?",
      "Convergence",
      ["Coevolution","Divergence","transformation"],
      "Sharks and dolphins look similar (streamlined bodies, fins) but are unrelated. They independently evolved similar body plans as adaptations to the same aquatic environment, convergent evolution.",
      {});
  }
]),["Sharks and dolphins look similar and both swim, but they evolved from very different ancestors. What term describes when unrelated species independently evolve similar traits?"]);

/* ---------- 7.6 & 7.7 Pace of Evolution & Hardy-Weinberg ---------- */

E("bio-u3-76-q01",3,["7.6","7.7"],1,"var",varset([
  function(){
    return mcq("Which example best illustrates coevolution?",
      "Flower shape changing alongside pollinator feeding structures",
      ["Antibiotic resistance in bacteria","Camouflage in moth populations","Mutation rates increasing in isolated populations"],
      "Coevolution = two or more species reciprocally shape each other's evolution. Flower shape and pollinator feeding structures changing together is the classic example, each species drives the other's evolutionary change.",
      {});
  }
]),["Coevolution means two species are shaping each other's evolution over time. Which example shows two different species influencing each other's traits across generations?"]);

E("bio-u3-76-q02",3,["7.6","7.7"],1,"var",varset([
  function(){
    return mcq("Why have biological classification systems changed over time?",
      "New evidence and technologies reveal relationships that were previously unknown.",
      ["Classification systems are based solely on habitat.","Organisms frequently change kingdoms during their lifetimes.","Scientists periodically rename organisms to simplify learning."],
      "As molecular biology and new fossils emerge, scientists discover that organisms previously grouped together aren't as closely related as thought. Classification is revised to better reflect actual evolutionary (phylogenetic) relationships.",
      {});
  }
]),["Classification systems are based on evolutionary relationships. When new DNA evidence shows species are more or less related than thought, what happens to the classification?"]);

E("bio-u3-76-q03",3,["7.6","7.7"],1,"var",varset([
  function(){
    return mcq("Which statement best describes gradualism?",
      "Evolution occurs through slow, continuous change over long periods.",
      ["Evolution occurs through long periods of stability interrupted by rapid change.","Evolution only occurs following mass extinctions.","Species appear suddenly without ancestors."],
      "Gradualism (Darwin's original model): evolution proceeds through slow, continuous, incremental changes over vast time periods. Small generational changes accumulate over millions of years to produce significant differences.",
      {});
  }
]),["Gradualism is Darwin's original model. Does it describe evolution happening slowly and steadily, or in sudden bursts with long stable periods in between?"]);

E("bio-u3-76-q04",3,["7.6","7.7"],2,"var",varset([
  function(){
    return mcq("The fossil record shows a species remaining relatively unchanged for millions of years before undergoing rapid evolutionary change. What does this pattern support?",
      "Punctuated equilibrium",
      ["Adaptive radiation","Gradualism","Uniformitarianism"],
      "Punctuated equilibrium (Eldredge & Gould): long periods of stasis punctuated by rapid evolutionary bursts. This matches fossil records showing species appearing suddenly, remaining stable, then changing again.",
      {});
  }
]),["This evolutionary model shows long stable periods (stasis) interrupted by rapid change. What model is this, gradualism or punctuated equilibrium?"]);

E("bio-u3-76-q05",3,["7.6","7.7"],1,"var",varset([
  function(){
    return mcq("Which of the following best defines population genetics?",
      "The study of allele frequencies and how they change within a group over time.",
      ["The study of how individual organisms clone their somatic cells.","The study of how traits are passed exclusively from two parents to their offspring.","The study of the physical structure and chemical bonding of DNA molecules."],
      "Population genetics studies how allele frequencies change within populations over time, bridging Mendelian genetics with evolutionary biology, including Hardy-Weinberg, genetic drift, and gene flow.",
      {});
  }
]),["Population genetics is the study of how evolution works at the level of genes in a group. Which answer focuses on allele frequencies changing over time?"]);

E("bio-u3-76-q06",3,["7.6","7.7"],1,"var",varset([
  function(){
    return mcq("In Hardy-Weinberg equilibrium, what must be true?",
      "No natural selection occurs",
      ["Mutation rates must increase","Populations must grow","There must be gene flow"],
      "H-W equilibrium requires ALL five: large population, random mating, no mutation, no gene flow, no natural selection. No natural selection is one of the five required conditions.",
      {});
  }
]),["Hardy-Weinberg equilibrium has FIVE required conditions. The population must be large, mating must be random, and there must be no mutation, no gene flow, and no ___?"]);

E("bio-u3-76-q07",3,["7.6","7.7"],2,"var",varset([
  function(){
    return mcq("In a population, 16% of individuals are homozygous dominant for tongue rolling. What percentage of individuals are heterozygous for tongue rolling?",
      "48%",
      ["40%","60%","84%"],
      "p² = 0.16 → p = 0.4. q = 1 − 0.4 = 0.6. Heterozygous = 2pq = 2(0.4)(0.6) = 0.48 = 48% .",
      {});
  }
]),["If p² = 0.16, find p by taking the square root. Then q = 1 − p. The heterozygous frequency = 2pq. Try it step by step."]);

E("bio-u3-76-q08",3,["7.6","7.7"],2,"var",varset([
  function(){
    return mcq("If 49% of the individuals in a population are homozygous dominant for a trait, what percentage of individuals in the population will be homozygous recessive for the same trait?",
      "9%",
      ["30%","42%","51%"],
      "p² = 0.49 → p = 0.7. q = 0.3. Homozygous recessive = q² = (0.3)² = 0.09 = 9% .",
      {});
  }
]),["If p² = 0.49, find p (square root). Then q = 1 − p. The question asks for q² (homozygous recessive). Try it step by step."]);

E("bio-u3-76-q09",3,["7.6","7.7"],2,"var",varset([
  function(){
    return mcq("A population is in Hardy Weinberg equilibrium. If a gene pool contains 20 alleles where 6 of the alleles are recessive, what proportion of the population shows the dominant phenotype?",
      "91%",
      ["9%","30%","70%"],
      "q = 6/20 = 0.3; p = 0.7. Dominant phenotype = p² + 2pq = 0.49 + 0.42 = 0.91 = 91% .",
      {});
  }
]),["6 out of 20 alleles are recessive: q = 6/20 = 0.3. Then p = 1 − q. The dominant phenotype frequency = p² + 2pq. Try it step by step."]);

/* ---------- 7.8 Causes of Gene Pool Change ---------- */

E("bio-u3-78-q01",3,["7.8"],2,"var",varset([
  function(){
    return mcq("Researchers observe that allele frequencies in a population have remained unchanged for many generations. What is the most reasonable conclusion?",
      "The population is likely in Hardy-Weinberg equilibrium.",
      ["Gene flow is increasing.","Speciation is occurring.","The population is experiencing directional selection."],
      "Constant allele frequencies over generations = population is NOT evolving = Hardy-Weinberg equilibrium. All five conditions are being met.",
      {});
  }
]),["If allele frequencies stay the same over many generations, is the population evolving? What term describes a population where allele frequencies are stable?"]);

E("bio-u3-78-q02",3,["7.8"],1,"var",varset([
  function(){
    return mcq("A population develops a genetic trait that has never been seen before. Which process most likely produced this new allele?",
      "Mutation",
      ["Genetic drift","Gene flow","Stabilizing selection"],
      "Only mutation creates genuinely new alleles. Gene flow brings existing alleles from elsewhere. Selection and drift change frequencies; mutation creates new variation.",
      {});
  }
]),["Gene flow, selection, and drift change the frequency of EXISTING alleles. Which agent of change creates brand new alleles that didn't exist in the population before?"]);

E("bio-u3-78-q03",3,["7.8"],2,"var",varset([
  function(){
    return mcq("A population experiences a sudden reduction in size after a hurricane. The surviving individuals represent only a small portion of the original gene pool. Which evolutionary mechanism is illustrated?",
      "Genetic drift",
      ["Gene flow","Mutation","Natural selection"],
      "A random event dramatically reduces the population. Survivors' allele frequencies may differ from the original by chance, genetic drift (specifically the bottleneck effect).",
      {});
  }
]),["A random event (not natural selection) dramatically reduces population size. The survivors happen to carry a non-representative sample of alleles. What is this type of random change called?"]);

E("bio-u3-78-q04",3,["7.8"],2,"var",varset([
  function(){
    return mcq("Humans hunted the northern elephant seal population to fewer than 100 individuals. The population has since rebounded to over 100,000 but the genetic diversity of the population is low. Which of the following best describes this?",
      "The bottleneck effect",
      ["Disruptive selection","Gene flow","The founder effect"],
      "Bottleneck effect: population reduced to few survivors → small sample of alleles survives → recovered population has much less genetic diversity. Northern elephant seals are the textbook example.",
      {});
  }
]),["The seal population was reduced to ~100 survivors, then recovered. What happens to genetic diversity when a population crashes and rebuilds from a tiny group?"]);

E("bio-u3-78-q05",3,["7.8"],1,"var",varset([
  function(){
    return mcq("Which situation is an example of non-random mating?",
      "Individuals choose mates with elaborate displays.",
      ["Individuals mate completely by chance.","Migrants enter a population.","Natural disasters alter population size."],
      "Choosing mates based on elaborate displays (peacock tails, bird dances) is sexual selection, a type of non-random mating where phenotype influences mate choice.",
      {});
  }
]),["Random mating means any individual can mate with any other. Which answer shows individuals choosing mates based on a specific trait (making mating non-random)?"]);

E("bio-u3-78-q06",3,["7.8"],2,"var",varset([
  function(){
    return mcq("A hurricane leaves only a small number of individuals alive in a population. Which process best explains the resulting change in allele frequencies?",
      "bottleneck effect",
      ["directional selection","founder effect","stabilizing selection"],
      "Disaster reduces large population to few survivors who rebuild the population, the resulting population has reduced genetic diversity. This is the bottleneck effect (a form of genetic drift).",
      {});
  }
]),["When a natural disaster reduces a large population to just a few survivors who then rebuild the population, which genetic drift effect is this?"]);

E("bio-u3-78-q07",3,["7.8"],1,"var",varset([
  function(){
    return mcq("Which statement best describes the founder effect?",
      "A new population is established by a small number of individuals.",
      ["A large population experiences a sudden reduction in size.","Individuals preferentially select mates with similar traits.","Mutations rapidly accumulate within a population."],
      "Founder effect: a small group leaves the main population to start a new colony. They carry only a subset of the original gene pool, reducing genetic diversity in the new population.",
      {});
  }
]),["The founder effect occurs when a SMALL group leaves to start a NEW population elsewhere. What happens to the genetic diversity of that new population?"]);

E("bio-u3-78-q08",3,["7.8"],1,"var",varset([
  function(){
    return mcq("What type of selection is shown when individuals with intermediate traits are favored?",
      "Stabilizing",
      ["Disruptive","Directional","Sexual"],
      "Stabilizing selection favours the intermediate phenotype and selects against both extremes. Example: human birth weight, very small and very large babies have higher mortality.",
      {});
  }
]),["Look at which individuals survive best: those at the extremes, the middle, or both extremes. If the middle (average) individuals survive best, what type of selection is this?"]);

E("bio-u3-78-q09",3,["7.8"],2,"var",varset([
  function(){
    var q=mcq("A population of mice in a field was captured and counted annually for three years to track changes in coat color. Based on the data, what form of selection is occurring in the population?",
      "Disruptive selection",
      ["Artificial selection","Directional selection","Stabilizing selection"],
      "The data shows the intermediate coat colour (brown) decreased from 50 to 15, while both extremes (light brown and dark brown) increased significantly. When both extreme phenotypes are favoured and the intermediate is selected against, this is disruptive selection . The two extreme colours may be advantageous in different microhabitats within the same field.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u3-78-q09.png" alt="Table titled Mouse Population Coat Color, with counts over three years: light brown rises from 2 to 36, brown falls from 50 to 15, and dark brown rises from 5 to 40" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the data: light brown started at 2 and ended at 36; dark brown started at 5 and ended at 40; intermediate brown started at 50 and dropped to 15. Which type of selection favours BOTH extremes while selecting AGAINST the intermediate coat colour?"]);

E("bio-u3-78-q10",3,["7.8"],2,"var",varset([
  function(){
    var q=mcq("This graph shows the change in a finch population after a drought. What type of selection has occurred?",
      "Directional",
      ["Disruptive","Stabilizing","Sexual"],
      "After drought leaving only large hard seeds, large-beaked birds survived; small-beaked didn't. The population shifted toward one extreme (large beaks) = directional selection.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u3-78-q10.png" alt="Graph of finch beak length distributions before and after a drought: the original population peaks near 8.5 mm and the surviving population peaks near 11 mm" style="max-width:100%;height:auto">';
    return q;
  }
]),["After the drought, only large hard seeds remained. Which beak size could crack those seeds? If one extreme is favoured, what type of selection is occurring?"]);

E("bio-u3-78-q11",3,["7.8"],2,"var",varset([
  function(){
    return mcq("In some fisheries, larger fish are consistently caught and removed from the population. Over time, the average size of the fish decreases. Which concept best explains this change?",
      "Artificial selection pressure affecting evolution",
      ["Convergent evolution","Genetic equilibrium","Punctuated equilibrium"],
      "Consistently removing the largest fish = selection pressure against large body size. Smaller fish survive and reproduce more; average fish size decreases over generations, artificial selection pressure driving evolution.",
      {});
  }
]),["Humans are consistently removing one extreme (large fish) from the population. Over generations, what happens to average fish size? Is this natural or artificial selection?"]);

E("bio-u3-78-q12",3,["7.8"],1,"var",varset([
  function(){
    return mcq("Which human activity is most likely to reduce genetic diversity by fragmenting populations?",
      "Constructing roads through habitats",
      ["Building wildlife corridors","Protecting endangered species","Restoring wetlands"],
      "Roads through habitats divide populations into isolated fragments. Small isolated populations experience inbreeding and genetic drift, reducing genetic diversity within each fragment.",
      {});
  }
]),["When a habitat is divided into smaller patches, populations become isolated in each patch. What happens to genetic diversity in small, isolated populations?"]);

/* ---------- 7.9 Taxonomy & Classification ---------- */

E("bio-u3-79-q01",3,["7.9"],2,"var",varset([
  function(){
    var q=mcq("Using the table, which is the correct binomial nomenclature for a blue mussel?",
      "Mytillus edulis",
      ["Animalia edulis","edulis Animalia","edulis Mytillus"],
      "Binomial nomenclature = Genus + species. From the table: Genus = Mytillus , Species = edulis . Therefore the correct scientific name is Mytillus edulis . Always capitalize the genus, lowercase the species, and italicize both.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u3-79-q01.png" alt="Classification table: Kingdom Animalia, Phylum Mollusca, Class Bivalvia, Order Mytilida, Family Mytilidae, Genus Mytilus, Species edulis" style="max-width:100%;height:auto">';
    return q;
  }
]),["Binomial nomenclature uses TWO names: Genus first (capitalized), species second (lowercase). Look at the classification table, which row gives the Genus name and which gives the Species name?"]);

E("bio-u3-79-q02",3,["7.9"],1,"var",varset([
  function(){
    return mcq("If two organisms are in the same order, which of the following do they also share?",
      "Class",
      ["Family","Genus","Species"],
      "Taxonomy broad→specific: Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species. Sharing Order means they also share Class and all broader ranks.",
      {});
  }
]),["Remember the order of taxonomy levels from broadest to most specific: Domain, Kingdom, Phylum, Class, Order, Family, Genus, Species. If they share Order, which broader levels must they also share?"]);

E("bio-u3-79-q03",3,["7.9"],1,"var",varset([
  function(){
    return mcq("Which is the correct order of taxonomic ranks from most general to most specific?",
      "Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species",
      ["Species → Genus → Family → Order → Class → Phylum → Kingdom → Domain","Kingdom → Domain → Phylum → Class → Order → Family → Species → Genus","Domain → Phylum → Kingdom → Class → Order → Family → Genus → Species"],
      "Domain → Kingdom → Phylum → Class → Order → Family → Genus → Species. Memory: Dear King Philip Came Over For Good Soup.",
      {});
  }
]),["Use the memory device: Dear King Philip Came Over For Good Soup. What does each first letter stand for?"]);

E("bio-u3-79-q04",3,["7.9"],1,"var",varset([
  function(){
    return mcq("Which characteristic best distinguishes organisms in Domain Bacteria from those in Domain Eukarya?",
      "Lack of a nucleus",
      ["Ability to reproduce","Presence of DNA","Presence of ribosomes"],
      "Bacteria lack a membrane-bound nucleus, DNA floats freely in cytoplasm. Eukaryotes have a true nucleus. This is the most fundamental distinction between these domains.",
      {});
  }
]),["Think about the most fundamental difference between a bacterium and a human cell. Bacteria are prokaryotes, what is the key structural feature that eukaryotic cells have that prokaryotic cells completely lack?"]);

E("bio-u3-79-q05",3,["7.9"],1,"var",varset([
  function(){
    return mcq("A scientist from Canada and a scientist from Japan are studying the same species. Why is binomial nomenclature a good system for these researchers?",
      "It provides a single, universally accepted scientific name of the organism.",
      ["It describes the exact geographic origin and native habitat of the organism.","It describes the lifespan and reproductive rate of the organism.","It translates regional common names into a standardized format."],
      "Binomial nomenclature gives every species one universal scientific name in Latin, recognized by scientists worldwide regardless of language. A species called 'sea otter' in English and by a different name in Japanese is Enhydra lutris everywhere. This eliminates confusion caused by regional common names and allows international scientific communication.",
      {});
  }
]),["The two scientists speak different languages and would use different common names for the same organism. What does binomial nomenclature give every species that common names cannot?"]);

E("bio-u3-79-q06",3,["7.9"],2,"var",varset([
  function(){
    return mcq("An organism is found living in a Hot deep-sea vent which is single-celled, lacks a nucleus and does not contain a cell wall. Into which domain should this organism be classified?",
      "Archaea",
      ["Bacteria","Eukarya","Protista"],
      "Single-celled extremophiles in extreme environments (hot vents, high pressure) that are not bacteria belong to Domain Archaea. Archaea resemble bacteria in size but are genetically and biochemically distinct.",
      {});
  }
]),["Organisms that thrive in extreme environments (very hot, acidic, or salty) are extremophiles. Single-celled extremophiles that are NOT bacteria belong to which domain?"]);

E("bio-u3-79-q07",3,["7.9"],1,"var",varset([
  function(){
    return mcq("Which kingdom includes organisms that are multicellular, heterotrophic, and have cell walls made of chitin?",
      "Fungi",
      ["Animalia","Plantae","Protista"],
      "Kingdom Fungi: multicellular (usually), heterotrophic (absorptive feeders), cell walls of chitin, reproduce by spores. Examples: mushrooms, molds, yeasts.",
      {});
  }
]),["This kingdom includes mushrooms, molds, and yeasts. They absorb nutrients from their surroundings and have cell walls made of chitin. Which kingdom is this?"]);

E("bio-u3-79-q08",3,["7.9"],1,"var",varset([
  function(){
    return mcq("What feature is shared by all prokaryotes?",
      "Lack of membrane-bound organelles",
      ["Membrane-bound nucleus","Linear chromosomes","Multicellularity"],
      "Prokaryotes (Bacteria and Archaea) lack membrane-bound organelles, no nucleus, no mitochondria, no ER. This is their defining feature and fundamental distinction from eukaryotes.",
      {});
  }
]),["Both bacteria and archaea are prokaryotes. What do they all lack that eukaryotic cells have, specifically in terms of cell organization?"]);

E("bio-u3-79-q09",3,["7.9"],1,"var",varset([
  function(){
    return mcq("Which statement best explains why viruses are difficult to classify?",
      "They can only exist inside host cells and lack characteristics of life",
      ["They are too small to be seen","They contain both plant and animal features","They reproduce sexually and asexually"],
      "Viruses lack cells, cannot carry out metabolism independently, and can only reproduce inside a host cell using the host's ribosomes and enzymes. This puts them in a grey zone between living and non-living, making them impossible to fit neatly into the classification system designed for cellular organisms.",
      {});
  }
]),["Think about the characteristics of life: cells, metabolism, growth, reproduction. Viruses can reproduce, but only by hijacking another cell. What do viruses lack that ALL living things are supposed to have?"]);

E("bio-u3-79-q10",3,["7.9"],2,"var",varset([
  function(){
    var q=mcq("A student collects a small organism from a local pond and observes it under a magnifying glass. The organism has segmented legs, two pairs of wings, and noticeably long antennae. Using the dichotomous key provided, identify the correct taxonomic order of this organism.",
      "Order Odonata",
      ["Order Ephemeroptera","Order Coleoptera","Class Crustacea"],
      "Follow the key: The organism has segmented legs (→ step 2), it has wings (→ step 3), and it has long antennae (→ Order Odonata). Odonata includes dragonflies and damselflies.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u3-79-q10.png" alt="Dichotomous key for common pond invertebrates, with paired steps on segmented legs, wings, antennae length, leg number and body type, leading to orders, a class and phyla" style="max-width:100%;height:auto">';
    return q;
  }
]),["Work through the key step by step. The organism has segmented legs, so go to step 2. It has wings, so go to step 3. Now check: are the antennae long or short?"]);

E("bio-u3-79-q11",3,["7.9"],1,"var",varset([
  function(){
    return mcq("Which tool is most useful for identifying an unknown organism?",
      "Dichotomous key",
      ["DNA polymerase","Electron microscope","Gel electrophoresis"],
      "A dichotomous key presents paired choices at each step based on observable characteristics. Following the correct path leads to the organism's identity, the standard biological identification tool.",
      {});
  }
]),["Scientists use a tool that works through a series of paired questions (two choices at each step) to identify organisms. What is this identification tool called?"]);

/* ---------- 7.10 Vertebrate Anatomy & Physiology ---------- */

E("bio-u3-710-q01",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which of the following illustrates the evolutionary trend in symmetry across the animal kingdom?",
      "Asymmetry to radial to bilateral",
      ["Asymmetry to bilateral to radial","Radial to asymmetry to bilateral","Radial to bilateral to asymmetry"],
      "The evolutionary trend in animal symmetry: asymmetry (sponges/Porifera, simplest, no symmetry) → radial symmetry (cnidarians like jellyfish and sea anemones) → bilateral symmetry (most complex animals including worms, insects, fish, and all vertebrates). Bilateral symmetry is associated with cephalization and more complex directional movement.",
      {});
  }
]),["The simplest animals (sponges) have no symmetry, they are asymmetrical. Slightly more complex animals (jellyfish) have radial symmetry. The most complex animals (insects, fish, humans) have bilateral symmetry. What order does this progression suggest?"]);

E("bio-u3-710-q02",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which is a feature of bilateral symmetry?",
      "Identical left and right sides",
      ["Body parts arranged in a circle","No symmetry","Uneven distribution of parts"],
      "Bilateral symmetry: body divisible into matching left and right halves, like humans, fish, and insects. Contrast with radial symmetry (sea stars, jellyfish).",
      {});
  }
]),["Bilateral symmetry means the body can be divided into two matching halves. Along which axis is the body divided, and what are the two matching sides?"]);

E("bio-u3-710-q03",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which animal group lacks true tissues?",
      "Porifera",
      ["Annelida","Arthropoda","Cnidaria"],
      "Porifera (sponges) are the simplest animals, no true tissues (no organized muscle, nerve, or epithelial tissue). All other animal phyla have at least two tissue layers.",
      {});
  }
]),["The simplest animals have no true tissues, their cells are loosely organized but not arranged into muscle, nerve, or skin layers. Which animal phylum is this?"]);

E("bio-u3-710-q04",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which group contains organisms that have bilateral symmetry, but do not have a true body cavity?",
      "Platyhelminthes",
      ["Arthropoda","Cnidaria","Porifora"],
      "Platyhelminthes (flatworms) are bilaterally symmetrical and acoelomate, no body cavity at all. Include tapeworms and planarians.",
      {});
  }
]),["Flatworms (platyhelminthes) are bilaterally symmetrical but have no body cavity at all. What term describes an animal with no coelom?"]);

E("bio-u3-710-q05",3,["7.10"],2,"var",varset([
  function(){
    return mcq("Which of the following body plan characteristics distinguishes the phylum Platyhelminthes from the phylum Nematoda?",
      "Platyhelminthes are acoelomate, while Nematoda are pseudocoelomate.",
      ["Platyhelminthes are triploblastic, while Nematoda are diploblastic.","Platyhelminthes show bilateral symmetry, while Nematoda show radial symmetry.","Platyhelminthes undergo molting, while Nematoda do not."],
      "Platyhelminthes = acoelomate (no body cavity). Nematoda = pseudocoelomate (partial body cavity). True coelom (fully lined by mesoderm) appears in annelids, mollusks, vertebrates.",
      {});
  }
]),["Platyhelminthes have no body cavity (acoelomate). Nematoda have a partial body cavity (pseudocoelomate). What is the key structural difference between these two?"]);

E("bio-u3-710-q06",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which trait is found in all chordates?",
      "Notochord",
      ["Compound eyes","Exoskeleton","Radial symmetry"],
      "All chordates at some developmental stage have: notochord, hollow dorsal nerve cord, pharyngeal slits, post-anal tail. The notochord is the defining feature of Phylum Chordata.",
      {});
  }
]),["All animals in phylum Chordata share four features at some point in their development. One is a flexible rod-like structure. What is it called, and where is it located?"]);

E("bio-u3-710-q07",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which adaptation allowed vertebrates to reproduce away from water?",
      "Amniotic egg",
      ["Cartilage skeleton","External fertilization","Gills"],
      "The amniotic egg (with protective membranes and shell) prevents desiccation, allowing eggs to be laid on land. This freed reptiles and birds from needing water for reproduction.",
      {});
  }
]),["Amphibians must return to water to lay eggs. What feature of reptile (and bird) eggs allows them to be laid on dry land without the embryo drying out?"]);

E("bio-u3-710-q08",3,["7.10"],2,"var",varset([
  function(){
    var q=mcq("Which of the following options correctly describes the skeleton, circulatory system, and chordate group of the organism?",
      "Cartilage and bone skeleton | 2-chambered heart | Osteichthyes",
      ["Cartilage skeleton | 3-chambered heart | Amphibia","Cartilage skeleton | 2-chambered heart | Chondrichthyes","Cartilage and bone skeleton | 3-chambered heart | Mammalia"],
      "Looking at the image, the presence of a bony gill cover (operculum) tells you this is a bony fish (Osteichthyes). Because it is a bony fish, its skeleton is made of cartilage and bone, and like all true fish, it relies on a 2-chambered heart to pump blood. This rules out the two cartilage-skeleton options, the one pairing a 3-chambered heart with Amphibia and the one pairing a 2-chambered heart with Chondrichthyes, and the cartilage and bone skeleton paired with a 3-chambered heart and Mammalia, leaving the cartilage and bone skeleton with a 2-chambered heart as the correct choice.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u3-710-q08.png" alt="Underwater photograph of a cod, a bony fish with a mottled body, a small chin barbel and a bony gill cover, swimming over a rocky, kelp-covered seabed" style="max-width:100%;height:auto">';
    return q;
  }
]),["Look at the image of the organism. Identify its skeleton type (cartilage or bone), how many chambers its heart has, and match those features to a chordate group in the table."]);

E("bio-u3-710-q09",3,["7.10"],1,"var",varset([
  function(){
    return mcq("Which adaptation was most important for vertebrate transition from water to land?",
      "Development of lungs and limbs for terrestrial movement",
      ["Gills replacing lungs","Loss of skeletal structures","Reduction in nervous system complexity"],
      "If the organism shown has four limbs and lungs, it likely represents an early tetrapod. Development of lungs (air breathing) and limbs (terrestrial movement) were the key adaptations enabling the transition from water to land.",
      {});
  }
]),["The amniotic egg was key for reproduction on land. But for movement and breathing on land, what two anatomical features were also necessary?"]);

E("bio-u3-710-q10",3,["7.10"],3,"var",varset([
  function(){
    var q=mcq("Which of the following statements is true?",
      "Species F and G share a more recent common ancestry than E and F",
      ["Species A and I are very closely related","Species B and C are more closely related to A than they are to each other","Species D and I are more closely related than G and H"],
      "On a cladogram, species F and G share a branching node that is more recent (closer to the tips of the tree) than the node shared by species E and F. This means F and G diverged from their common ancestor more recently, so F and G are more closely related to each other than either is to E.",
      {});
    q.figure='<img src="banks/bio-3201/assets/u3-710-q10.png" alt="Cladogram of species A to I plotted against time in millions of years before the present day, with branching nodes; species G and H share the most recent node" style="max-width:100%;height:auto">';
    return q;
  }
]),["On a cladogram, species that share a more RECENT branching node are more closely related. Find the node where each pair of species listed diverged from a common ancestor, which pair branches most recently?"]);

/* ----- bank-gen-crosses.js ----- */
// Biology 3201 generator bank: Mendelian crosses and Hardy-Weinberg
// Written for the unified review app, Nov 12, 2026. These are
// parameterized families (kind "gen"), not conversions from the
// review books: each draw randomizes the trait context, the parents
// and the target, then builds the Punnett square by enumeration, so
// the keyed answer is computed from the actual cross every time.
// Families: monohybrid probability (6.2), incomplete dominance and
// codominance probability (6.2), dihybrid probability and phenotypic
// ratio (6.2/6.3), test cross inference (6.3, Level 3), and
// Hardy-Weinberg allele frequencies, carrier frequency and expected
// genotype counts (7.7, Unit 3). Probability answers are fractions
// in the cross families and decimals in the Hardy-Weinberg families,
// consistent within each entry. Every entry passes its drawn
// parameters in the mcq params object (kind, parents, target) so a
// harness can recompute the key independently.

/* ---------- shared helpers (bxg prefix, this file only) ---------- */

function bxgGcd(a, b) { return b ? bxgGcd(b, a % b) : a; }

function bxgFrac(n, d) {
  if (n === 0) return "0";
  var g = bxgGcd(n, d); n = n / g; d = d / g;
  return d === 1 ? String(n) : n + "/" + d;
}

/* Gametes a genotype can make: one allele per locus, all combinations. */
function bxgGametes(g) {
  var loci = [], i;
  for (i = 0; i < g.length; i += 2) loci.push([g[i], g[i + 1]]);
  var out = [""];
  loci.forEach(function (L) {
    var next = [];
    out.forEach(function (s) { next.push(s + L[0]); next.push(s + L[1]); });
    out = next;
  });
  return out;
}

/* One locus of an offspring genotype: dominant (uppercase) allele
   first; if both alleles have the same case, alphabetical order. */
function bxgPair(a, b) {
  var au = a === a.toUpperCase(), bu = b === b.toUpperCase();
  if (au !== bu) return au ? a + b : b + a;
  return a <= b ? a + b : b + a;
}

function bxgCross(p1, p2) {
  var counts = {}, total = 0;
  bxgGametes(p1).forEach(function (a) {
    bxgGametes(p2).forEach(function (b) {
      var o = "", i;
      for (i = 0; i < a.length; i++) o += bxgPair(a[i], b[i]);
      counts[o] = (counts[o] || 0) + 1; total++;
    });
  });
  return { counts: counts, total: total };
}

/* Phenotype key under complete dominance: per locus, "D" if any
   dominant allele is present, else "R". */
function bxgPhenoKey(geno) {
  var k = "", i;
  for (i = 0; i < geno.length; i += 2) {
    var pair = geno.slice(i, i + 2);
    k += (pair[0] === pair[0].toUpperCase() || pair[1] === pair[1].toUpperCase()) ? "D" : "R";
  }
  return k;
}

function bxgPhenoCount(cross, key) {
  var n = 0;
  Object.keys(cross.counts).forEach(function (g) {
    if (bxgPhenoKey(g) === key) n += cross.counts[g];
  });
  return n;
}

/* Three distractor strings for a probability key: plausible error
   fractions first (supplied by the caller as [num, den] pairs),
   generic fillers after; never a duplicate of the key or each other. */
function bxgDistr(key, cands) {
  var out = [], seen = {}; seen[key] = 1;
  var all = cands.concat([[1, 3], [2, 3], [1, 5], [4, 5], [1, 6], [5, 6], [1, 8], [7, 8], [3, 8], [5, 8]]);
  for (var i = 0; i < all.length && out.length < 3; i++) {
    var s = bxgFrac(all[i][0], all[i][1]);
    if (!seen[s]) { seen[s] = 1; out.push(s); }
  }
  return out;
}

function bxgGenoWord(g) {
  if (g[0] === g[1]) return g[0] === g[0].toUpperCase() ? "homozygous dominant" : "homozygous recessive";
  return "heterozygous";
}

/* Genotype ratio text for a one-locus cross, in AA, Aa, aa order. */
function bxgRatio1(cross, dom, rec) {
  var order = [dom + dom, dom + rec, rec + rec], parts = [];
  order.forEach(function (g) { if (cross.counts[g]) parts.push(cross.counts[g] + " " + g); });
  return parts.join(" : ");
}

/* ---------- trait pool: monohybrid contexts (6.2, 6.3) ---------- */

var BXG_MONO = [
  { intro: "In pea plants, the allele for round seeds (R) is dominant to the allele for wrinkled seeds (r).",
    dom: "R", rec: "r", domPheno: "round seeds", recPheno: "wrinkled seeds", noun: "plant" },
  { intro: "In pea plants, the allele for purple flowers (P) is dominant to the allele for white flowers (p).",
    dom: "P", rec: "p", domPheno: "purple flowers", recPheno: "white flowers", noun: "plant" },
  { intro: "In pea plants, the allele for green pods (G) is dominant to the allele for yellow pods (g).",
    dom: "G", rec: "g", domPheno: "green pods", recPheno: "yellow pods", noun: "plant" },
  { intro: "In humans, the allele for free earlobes (E) is dominant to the allele for attached earlobes (e).",
    dom: "E", rec: "e", domPheno: "free earlobes", recPheno: "attached earlobes", noun: "individual" },
  { intro: "In humans, the allele for being able to roll the tongue (T) is dominant to the allele for being unable to roll the tongue (t).",
    dom: "T", rec: "t", domPheno: "the ability to roll the tongue", recPheno: "the inability to roll the tongue", noun: "individual" },
  { intro: "In humans, the allele for a widow's peak hairline (W) is dominant to the allele for a straight hairline (w).",
    dom: "W", rec: "w", domPheno: "a widow's peak hairline", recPheno: "a straight hairline", noun: "individual" },
  { intro: "In rabbits, the allele for black fur (B) is dominant to the allele for brown fur (b).",
    dom: "B", rec: "b", domPheno: "black fur", recPheno: "brown fur", noun: "rabbit" }
];

/* Template genotype ("AA", "Aa", "aa") in a trait's own letters. */
function bxgTG(t, tpl) {
  return tpl.split("").map(function (ch) { return ch === "A" ? t.dom : t.rec; }).join("");
}

function bxgCrossSentence(t, tpl1, tpl2) {
  var g1 = bxgTG(t, tpl1), g2 = bxgTG(t, tpl2);
  return "A " + bxgGenoWord(g1) + " " + t.noun + " (" + g1 + ") is crossed with a " +
    bxgGenoWord(g2) + " " + t.noun + " (" + g2 + ").";
}

/* ---------- 6.2 monohybrid: dominant phenotype probability ---------- */

E("bio-u2-62-g01", 2, ["6.2"], 2, "gen", function () {
  var t = pick(BXG_MONO), tpl = pick([["Aa", "Aa"], ["Aa", "aa"]]);
  var g1 = bxgTG(t, tpl[0]), g2 = bxgTG(t, tpl[1]);
  var cross = bxgCross(g1, g2), total = cross.total;
  var nDom = bxgPhenoCount(cross, "D"), nRec = cross.total - nDom;
  var key = bxgFrac(nDom, total);
  var cands = [[nRec, total],
    [cross.counts[bxgTG(t, "Aa")] || 0, total],
    [cross.counts[bxgTG(t, "AA")] || 0, total],
    [cross.counts[bxgTG(t, "aa")] || 0, total],
    [3, 4], [1, 4], [1, 1], [0, 1]];
  var sol = "Work the cross as a Punnett square. " + g1 + " x " + g2 + " gives the genotypes " +
    bxgRatio1(cross, t.dom, t.rec) + ", out of " + total + " boxes. Every offspring with at least one " +
    t.dom + " allele shows " + t.domPheno + ": that is " + nDom + " of the " + total +
    " boxes. The probability is " + key + ".";
  return mcq(t.intro + " " + bxgCrossSentence(t, tpl[0], tpl[1]) +
    " What is the probability that an offspring will show the dominant trait (" + t.domPheno + ")?",
    key, bxgDistr(key, cands), sol,
    { kind: "mono", p1: g1, p2: g2, ask: "domPheno" });
}, ["Set up the Punnett square for the cross. Any offspring with at least one dominant allele shows the dominant trait, so count those boxes."]);

/* ---------- 6.2 monohybrid: recessive phenotype probability ---------- */

E("bio-u2-62-g02", 2, ["6.2"], 2, "gen", function () {
  var t = pick(BXG_MONO), tpl = pick([["Aa", "Aa"], ["Aa", "aa"]]);
  var g1 = bxgTG(t, tpl[0]), g2 = bxgTG(t, tpl[1]);
  var cross = bxgCross(g1, g2), total = cross.total;
  var nRec = bxgPhenoCount(cross, "R"), nDom = cross.total - nRec;
  var key = bxgFrac(nRec, total);
  var cands = [[nDom, total],
    [cross.counts[bxgTG(t, "Aa")] || 0, total],
    [cross.counts[bxgTG(t, "AA")] || 0, total],
    [cross.counts[bxgTG(t, "aa")] || 0, total],
    [3, 4], [1, 4], [1, 1], [0, 1]];
  var sol = "Work the cross as a Punnett square. " + g1 + " x " + g2 + " gives the genotypes " +
    bxgRatio1(cross, t.dom, t.rec) + ", out of " + total + " boxes. Only the " + bxgTG(t, "aa") +
    " offspring show " + t.recPheno + ", because the recessive trait appears only with two recessive alleles: that is " +
    nRec + " of the " + total + " boxes. The probability is " + key + ".";
  return mcq(t.intro + " " + bxgCrossSentence(t, tpl[0], tpl[1]) +
    " What is the probability that an offspring will show the recessive trait (" + t.recPheno + ")?",
    key, bxgDistr(key, cands), sol,
    { kind: "mono", p1: g1, p2: g2, ask: "recPheno" });
}, ["Only offspring with two recessive alleles show the recessive trait. Find that genotype in the Punnett square and count its boxes."]);

/* ---------- 6.2 monohybrid: specific genotype probability ---------- */

E("bio-u2-62-g03", 2, ["6.2"], 2, "gen", function () {
  var t = pick(BXG_MONO);
  var draw = pick([["Aa", "Aa", "AA"], ["Aa", "Aa", "Aa"], ["Aa", "Aa", "aa"],
    ["AA", "Aa", "AA"], ["AA", "Aa", "Aa"], ["Aa", "aa", "Aa"], ["Aa", "aa", "aa"]]);
  var g1 = bxgTG(t, draw[0]), g2 = bxgTG(t, draw[1]), target = bxgTG(t, draw[2]);
  var cross = bxgCross(g1, g2), total = cross.total;
  var nT = cross.counts[target] || 0, key = bxgFrac(nT, total);
  var others = ["AA", "Aa", "aa"].filter(function (x) { return x !== draw[2]; });
  var cands = others.map(function (x) { return [cross.counts[bxgTG(t, x)] || 0, total]; })
    .concat([[bxgPhenoCount(cross, "D"), total], [bxgPhenoCount(cross, "R"), total],
      [3, 4], [1, 4], [1, 2], [1, 1], [0, 1]]);
  var sol = "Work the cross as a Punnett square. " + g1 + " x " + g2 + " gives the genotypes " +
    bxgRatio1(cross, t.dom, t.rec) + ", out of " + total + " boxes. The genotype " + target +
    " fills " + nT + " of the " + total + " boxes. The probability is " + key + ".";
  return mcq(t.intro + " " + bxgCrossSentence(t, draw[0], draw[1]) +
    " What is the probability that an offspring will have the genotype " + target + "?",
    key, bxgDistr(key, cands), sol,
    { kind: "mono", p1: g1, p2: g2, ask: "geno", geno: target });
}, ["Set up the Punnett square and count the boxes that hold exactly the genotype named in the question, out of all the boxes."]);

/* ---------- 6.2 incomplete dominance and codominance ---------- */

var BXG_BLEND = [
  { mode: "incomplete dominance",
    intro: "In snapdragons, flower colour shows incomplete dominance. A plant with two R alleles has red flowers, a plant with two W alleles has white flowers, and a plant with one of each (RW) has pink flowers, a blend of the two.",
    a1: "R", a2: "W", pheno: { RR: "red flowers", RW: "pink flowers", WW: "white flowers" } },
  { mode: "incomplete dominance",
    intro: "In four o'clock plants, flower colour shows incomplete dominance. A plant with two R alleles has red flowers, a plant with two W alleles has white flowers, and a plant with one of each (RW) has pink flowers, a blend of the two.",
    a1: "R", a2: "W", pheno: { RR: "red flowers", RW: "pink flowers", WW: "white flowers" } },
  { mode: "codominance",
    intro: "In cattle, coat colour shows codominance. An animal with two R alleles has a red coat and one with two W alleles has a white coat, while an animal with one of each (RW) has a roan coat, with red and white hairs showing side by side.",
    a1: "R", a2: "W", pheno: { RR: "a red coat", RW: "a roan coat", WW: "a white coat" } },
  { mode: "codominance",
    intro: "The MN blood group in humans shows codominance. A person with genotype MM has type M blood and a person with genotype NN has type N blood, while a person with genotype MN has type MN blood, because both alleles are expressed.",
    a1: "M", a2: "N", pheno: { MM: "type M blood", MN: "type MN blood", NN: "type N blood" } }
];

E("bio-u2-62-g04", 2, ["6.2"], 2, "gen", function () {
  var c = pick(BXG_BLEND);
  var homo1 = c.a1 + c.a1, homo2 = c.a2 + c.a2, het = bxgPair(c.a1, c.a2);
  var p1 = het, p2 = pick([het, homo1, homo2]);
  var cross = bxgCross(p1, p2), total = cross.total;
  var targets = Object.keys(c.pheno).filter(function (g) { return (cross.counts[g] || 0) > 0; });
  var target = pick(targets), nT = cross.counts[target], key = bxgFrac(nT, total);
  var cands = [[3, 4]].concat(
    Object.keys(c.pheno).filter(function (g) { return g !== target; })
      .map(function (g) { return [cross.counts[g] || 0, total]; }),
    [[1, 3], [1, 1], [0, 1], [1, 8]]);
  var ratioParts = [homo1, het, homo2].filter(function (g) { return cross.counts[g]; })
    .map(function (g) { return cross.counts[g] + " " + g; });
  var modeNote = c.mode === "incomplete dominance"
    ? "neither allele is fully dominant, so the heterozygote shows a blend and each genotype has its own phenotype"
    : "both alleles are expressed in the heterozygote, so each genotype has its own phenotype";
  var sol = "The cross " + p1 + " x " + p2 + " gives the genotypes " + ratioParts.join(" : ") +
    ", out of " + total + " boxes. This is " + c.mode + ": " + modeNote + ". Offspring with " +
    c.pheno[target] + " have the genotype " + target + ", which fills " + nT + " of the " + total +
    " boxes. The probability is " + key + ".";
  return mcq(c.intro + " One parent has genotype " + p1 + " and the other has genotype " + p2 +
    ". What is the probability that an offspring will have " + c.pheno[target] + "?",
    key, bxgDistr(key, cands), sol,
    { kind: "blend", p1: p1, p2: p2, pheno: c.pheno, ask: c.pheno[target] });
}, ["Do the Punnett square first. Here the heterozygote does not match either homozygote: it has the in-between or combined phenotype described in the introduction."]);

/* ---------- dihybrid contexts (6.2/6.3) ---------- */

var BXG_DI = [
  { intro: "In pea plants, round seeds (R) are dominant to wrinkled seeds (r), and yellow seeds (Y) are dominant to green seeds (y).",
    noun: "plant", plural: "plants",
    loci: [{ dom: "R", rec: "r", domPheno: "round seeds", recPheno: "wrinkled seeds" },
           { dom: "Y", rec: "y", domPheno: "yellow seeds", recPheno: "green seeds" }] },
  { intro: "In fruit flies, a grey body (E) is dominant to an ebony body (e), and normal wings (V) are dominant to vestigial wings (v).",
    noun: "fly", plural: "flies",
    loci: [{ dom: "E", rec: "e", domPheno: "a grey body", recPheno: "an ebony body" },
           { dom: "V", rec: "v", domPheno: "normal wings", recPheno: "vestigial wings" }] },
  { intro: "In rabbits, black fur (B) is dominant to brown fur (b), and short fur (S) is dominant to long fur (s).",
    noun: "rabbit", plural: "rabbits",
    loci: [{ dom: "B", rec: "b", domPheno: "black fur", recPheno: "brown fur" },
           { dom: "S", rec: "s", domPheno: "short fur", recPheno: "long fur" }] }
];

function bxgDiHetero(c) { return c.loci.map(function (L) { return L.dom + L.rec; }).join(""); }
function bxgDiRec(c) { return c.loci.map(function (L) { return L.rec + L.rec; }).join(""); }

function bxgDiCrossSentence(c, testCross) {
  var het = bxgDiHetero(c);
  if (testCross) return "A " + c.noun + " heterozygous for both genes (" + het + ") is crossed with a " +
    c.noun + " that shows both recessive traits (" + bxgDiRec(c) + ").";
  return "Two " + c.plural + " heterozygous for both genes (" + het + ") are crossed.";
}

function bxgComboPhrase(c, combo) {
  return c.loci.map(function (L, i) { return combo[i] ? L.domPheno : L.recPheno; }).join(" and ");
}

/* ---------- 6.2/6.3 dihybrid: phenotype combination probability ---------- */

E("bio-u2-63-g01", 2, ["6.2", "6.3"], 2, "gen", function () {
  var c = pick(BXG_DI), testCross = pick([false, true]);
  var p1 = bxgDiHetero(c), p2 = testCross ? bxgDiRec(c) : p1;
  var cross = bxgCross(p1, p2), total = cross.total;
  var combo = [pick([true, false]), pick([true, false])];
  var key0 = combo.map(function (d) { return d ? "D" : "R"; }).join("");
  var nT = bxgPhenoCount(cross, key0), key = bxgFrac(nT, total);
  var combos = [["D", "D"], ["D", "R"], ["R", "D"], ["R", "R"]]
    .filter(function (k) { return k.join("") !== key0; });
  var cands = combos.map(function (k) { return [bxgPhenoCount(cross, k.join("")), total]; })
    .concat([[9, 16], [3, 4], [1, 2], [3, 16], [1, 16]]);
  /* Per-locus probabilities for the worked solution. */
  var locText = c.loci.map(function (L, i) {
    var lc = bxgCross(p1.slice(2 * i, 2 * i + 2), p2.slice(2 * i, 2 * i + 2));
    var dN = bxgPhenoCount(lc, "D"), rN = lc.total - dN;
    return "for the " + (i === 0 ? "first" : "second") + " gene, " + p1.slice(2 * i, 2 * i + 2) + " x " +
      p2.slice(2 * i, 2 * i + 2) + " gives " + bxgFrac(dN, lc.total) + " showing " + L.domPheno + " and " +
      bxgFrac(rN, lc.total) + " showing " + L.recPheno;
  });
  var f1 = bxgFrac(combo[0] ? bxgPhenoCount(bxgCross(p1.slice(0, 2), p2.slice(0, 2)), "D") : bxgPhenoCount(bxgCross(p1.slice(0, 2), p2.slice(0, 2)), "R"), 4);
  var f2 = bxgFrac(combo[1] ? bxgPhenoCount(bxgCross(p1.slice(2, 4), p2.slice(2, 4)), "D") : bxgPhenoCount(bxgCross(p1.slice(2, 4), p2.slice(2, 4)), "R"), 4);
  var sol = "Treat the two genes one at a time: " + locText.join("; ") + ". The genes assort independently, " +
    "so the probability of the combination is the product, " + f1 + " x " + f2 + " = " + key +
    ". Counting boxes in the full Punnett square agrees: " + nT + " of the " + total +
    " boxes show " + bxgComboPhrase(c, combo) + ".";
  return mcq(c.intro + " " + bxgDiCrossSentence(c, testCross) +
    " What is the probability that an offspring will have " + bxgComboPhrase(c, combo) + "?",
    key, bxgDistr(key, cands), sol,
    { kind: "di", p1: p1, p2: p2, ask: "phenoCombo", combo: combo });
}, ["The two genes assort independently. Work out the probability for each gene on its own, then multiply the two probabilities."]);

/* ---------- 6.2/6.3 dihybrid: genotype combination probability ---------- */

E("bio-u2-63-g02", 2, ["6.2", "6.3"], 2, "gen", function () {
  var c = pick(BXG_DI);
  var p1 = bxgDiHetero(c), p2 = p1;
  var cross = bxgCross(p1, p2), total = cross.total;
  var tpl = pick(["AABB", "AABb", "AAbb", "AaBB", "AaBb", "Aabb", "aaBB", "aaBb", "aabb"]);
  /* Build the target in the context's own letters, locus by locus:
     an uppercase template letter takes the locus's dominant allele. */
  var target = [0, 1].map(function (li) {
    var pair = tpl.slice(2 * li, 2 * li + 2), L = c.loci[li];
    return pair.split("").map(function (ch) { return ch === ch.toUpperCase() ? L.dom : L.rec; }).join("");
  }).join("");
  var nT = cross.counts[target] || 0, key = bxgFrac(nT, total);
  var cands = [[9, 16], [1, 4], [1, 8], [1, 2], [3, 16], [1, 16], [3, 4]];
  var locParts = [0, 1].map(function (li) {
    var lp1 = p1.slice(2 * li, 2 * li + 2), lp2 = p2.slice(2 * li, 2 * li + 2);
    var lc = bxgCross(lp1, lp2), lt = target.slice(2 * li, 2 * li + 2);
    return "P(" + lt + ") from " + lp1 + " x " + lp2 + " is " + bxgFrac(lc.counts[lt] || 0, lc.total);
  });
  var sol = "Treat the two genes one at a time: " + locParts.join(" and ") +
    ". The genes assort independently, so multiply the two probabilities to get " + key +
    ". The full Punnett square agrees: " + nT + " of the " + total + " boxes hold the genotype " + target + ".";
  return mcq(c.intro + " " + bxgDiCrossSentence(c, false) +
    " What is the probability that an offspring will have the genotype " + target + "?",
    key, bxgDistr(key, cands), sol,
    { kind: "di", p1: p1, p2: p2, ask: "geno", geno: target });
}, ["Treat the genes separately: find the probability of the named genotype at the first gene and at the second gene, then multiply."]);

/* ---------- 6.3 dihybrid: expected phenotypic ratio ---------- */

E("bio-u2-63-g03", 2, ["6.3"], 2, "gen", function () {
  var c = pick(BXG_DI), testCross = pick([false, true]);
  var p1 = bxgDiHetero(c), p2 = testCross ? bxgDiRec(c) : p1;
  var cross = bxgCross(p1, p2);
  var classes = [["D", "D"], ["D", "R"], ["R", "D"], ["R", "R"]].map(function (k) {
    return { key: k.join(""), n: bxgPhenoCount(cross, k.join("")),
      phrase: bxgComboPhrase(c, [k[0] === "D", k[1] === "D"]) };
  }).filter(function (cl) { return cl.n > 0; });
  var g = classes.reduce(function (acc, cl) { return bxgGcd(acc, cl.n); }, 0);
  var ordered = classes.slice().sort(function (a, b) {
    return b.n - a.n || (a.key < b.key ? -1 : 1);
  });
  var ratio = ordered.map(function (cl) { return cl.n / g; }).join(":");
  var others = ["9:3:3:1", "1:1:1:1", "3:1", "1:2:1"].filter(function (r) { return r !== ratio; });
  var sol = "Group the " + cross.total + " boxes of the Punnett square by phenotype: " +
    ordered.map(function (cl) { return cl.n + " show " + cl.phrase; }).join(", ") +
    ". Dividing each count by " + g + " gives the expected phenotypic ratio " + ratio + ".";
  return mcq(c.intro + " " + bxgDiCrossSentence(c, testCross) +
    " The offspring fall into four phenotype groups. What is the expected phenotypic ratio of these groups?",
    ratio, others, sol,
    { kind: "di", p1: p1, p2: p2, ask: "ratio" });
}, ["A two-gene Punnett square has 16 boxes when both parents are heterozygous. Group the boxes by phenotype and count how many fall in each of the four groups."]);

/* ---------- 6.3 test cross: infer the unknown genotype (Level 3) ---------- */

E("bio-u2-63-g04", 2, ["6.3"], 3, "gen", function () {
  var t = pick(BXG_MONO);
  var hetCase = pick([true, false]);
  var N = pick([16, 20, 24, 30, 36, 40]);
  var AA = bxgTG(t, "AA"), Aa = bxgTG(t, "Aa"), aa = bxgTG(t, "aa");
  var unknown = hetCase ? Aa : AA;
  var outcome, sol;
  if (hetCase) {
    var k = ri(Math.floor(N * 0.4), Math.ceil(N * 0.6));
    outcome = "Of the " + N + " offspring, " + k + " show " + t.recPheno +
      " and the rest show " + t.domPheno + ".";
    sol = "In a test cross, the homozygous recessive partner can pass on only a recessive allele, so each " +
      "offspring's phenotype reveals which allele the unknown parent contributed. Some offspring show " +
      t.recPheno + ": those offspring received a recessive allele from both parents, so the unknown parent " +
      "must carry a recessive allele. Because the unknown parent itself shows " + t.domPheno + ", its other " +
      "allele is dominant. The unknown parent is " + Aa + " (heterozygous).";
  } else {
    outcome = "All " + N + " offspring show " + t.domPheno + "; none show " + t.recPheno + ".";
    sol = "In a test cross, the homozygous recessive partner can pass on only a recessive allele, so each " +
      "offspring's phenotype reveals which allele the unknown parent contributed. Every one of the " + N +
      " offspring shows the dominant trait, so the unknown parent passed on a dominant allele every time and " +
      "has no recessive allele to give. The unknown parent is " + AA + " (homozygous dominant).";
  }
  var opts = {};
  opts[AA] = AA + " (homozygous dominant)";
  opts[Aa] = Aa + " (heterozygous)";
  opts[aa] = aa + " (homozygous recessive)";
  var key = opts[unknown];
  var distr = [opts[hetCase ? AA : Aa], opts[aa], "It cannot be determined from a test cross"];
  var artA = /^[aeiou]/i.test(t.noun) ? "An" : "A";
  var artLow = /^[aeiou]/i.test(t.noun) ? "an" : "a";
  return mcq(t.intro + " " + artA + " " + t.noun + " showing " + t.domPheno + " is crossed with " + artLow + " " + t.noun +
    " showing " + t.recPheno + ", a test cross. " + outcome +
    " What is the genotype of the parent that shows " + t.domPheno + "?",
    key, distr, sol,
    { kind: "testcross", unknown: unknown });
}, ["The recessive partner can only pass on a recessive allele, so an offspring showing the recessive trait must have received a recessive allele from the unknown parent too."]);

/* ---------- 7.7 Hardy-Weinberg (Unit 3) ---------- */

var BXG_HW = [
  { tpl: "In a large population of meadow plants, {F} of the plants have white flowers. White is the recessive form of the flower-colour trait; purple flowers are dominant." },
  { tpl: "In a population of fruit flies, {F} of the flies have vestigial (very short) wings, a recessive trait. Normal wings are dominant." },
  { tpl: "In a large human population, {F} of people have a recessive genetic condition that appears only in individuals who carry two copies of the recessive allele." },
  { tpl: "In a population of garden snails, {F} of the snails have an unbanded shell, a recessive trait. A banded shell is dominant." }
];
var BXG_Q2 = [0.04, 0.09, 0.16, 0.36, 0.49];

function bxgHwSetup() {
  var c = pick(BXG_HW), q2 = pick(BXG_Q2);
  var q = Math.round(Math.sqrt(q2) * 100) / 100, p = Math.round((1 - q) * 100) / 100;
  var asPct = pick([true, false]);
  var fStr = asPct ? Math.round(q2 * 100) + "%" : fmt(q2, 2);
  return { intro: c.tpl.replace("{F}", fStr), q2: q2, q: q, p: p };
}

E("bio-u3-77-g01", 3, ["7.7"], 2, "gen", function () {
  var s = bxgHwSetup();
  var askP = pick([true, false]);
  var key = fmt(askP ? s.p : s.q, 2);
  var distr = [fmt(askP ? s.q : s.p, 2), fmt(s.q2, 2), fmt(2 * s.p * s.q, 2)];
  var sol = askP
    ? "The recessive phenotype appears only in homozygous recessive (qq) individuals, so q^2 = " + fmt(s.q2, 2) +
      ". Taking the square root gives the recessive allele frequency, q = " + fmt(s.q, 2) +
      ". Allele frequencies add to 1 (p + q = 1), so the dominant allele frequency is p = 1 - " + fmt(s.q, 2) +
      " = " + fmt(s.p, 2) + "."
    : "The recessive phenotype appears only in homozygous recessive (qq) individuals, so q^2 = " + fmt(s.q2, 2) +
      ". The recessive allele frequency is the square root of that value: q = " + fmt(s.q, 2) + ".";
  return mcq(s.intro + " Assuming the population is in Hardy-Weinberg equilibrium, what is the frequency of the " +
    (askP ? "dominant" : "recessive") + " allele in the population?",
    key, distr, sol,
    { kind: "hw", q2: s.q2, ask: askP ? "p" : "q" });
}, ["The recessive phenotype frequency is q^2. Take its square root to get q, then use p + q = 1 if you need p."]);

E("bio-u3-77-g02", 3, ["7.7"], 3, "gen", function () {
  var s = bxgHwSetup();
  var key = fmt(2 * s.p * s.q, 2);
  var distr = [fmt(s.p * s.p, 2), fmt(s.q2, 2), fmt(s.p, 2)];
  var sol = "Start from the recessive phenotype: q^2 = " + fmt(s.q2, 2) + ", so q = " + fmt(s.q, 2) +
    " (the square root). Then p = 1 - q = 1 - " + fmt(s.q, 2) + " = " + fmt(s.p, 2) +
    ". Carriers are heterozygotes, and their frequency is 2pq = 2 x " + fmt(s.p, 2) + " x " + fmt(s.q, 2) +
    " = " + key + ".";
  return mcq(s.intro + " Assuming the population is in Hardy-Weinberg equilibrium, what proportion of the population " +
    "are carriers of the recessive allele, that is, heterozygotes who show the dominant trait but carry the recessive allele?",
    key, distr, sol,
    { kind: "hw", q2: s.q2, ask: "2pq" });
}, ["Carriers are the heterozygotes, with frequency 2pq. Find q from the recessive phenotype frequency first, then p, then combine them."]);

E("bio-u3-77-g03", 3, ["7.7"], 3, "gen", function () {
  var s = bxgHwSetup();
  var N = pick([200, 400, 500, 1000, 2000, 5000, 10000]);
  var askAa = pick([true, false]);
  var freq = askAa ? 2 * s.p * s.q : s.p * s.p;
  var keyN = Math.round(freq * N);
  var counts = { AA: Math.round(s.p * s.p * N), Aa: Math.round(2 * s.p * s.q * N), aa: Math.round(s.q2 * N) };
  var cands = [counts.AA, counts.Aa, counts.aa, Math.round(s.q * N), Math.round(s.p * N)]
    .filter(function (n) { return n !== keyN; });
  var distr = [], seen = {};
  cands.forEach(function (n) { if (!seen[n] && distr.length < 3) { seen[n] = 1; distr.push(String(n)); } });
  var askText = askAa
    ? "be carriers (heterozygous, showing the dominant trait but carrying the recessive allele)"
    : "have the homozygous dominant genotype";
  var sol = "First get the allele frequencies. q^2 = " + fmt(s.q2, 2) + ", so q = " + fmt(s.q, 2) +
    " and p = 1 - " + fmt(s.q, 2) + " = " + fmt(s.p, 2) + ". The " +
    (askAa ? "carrier (heterozygote) frequency is 2pq = 2 x " + fmt(s.p, 2) + " x " + fmt(s.q, 2) + " = " + fmt(freq, 2)
           : "homozygous dominant frequency is p^2 = " + fmt(s.p, 2) + "^2 = " + fmt(freq, 2)) +
    ". Multiply by the population size: " + fmt(freq, 2) + " x " + N + " = " + keyN + " individuals.";
  return mcq(s.intro + " The population has " + N + " individuals. Assuming Hardy-Weinberg equilibrium, " +
    "how many of them are expected to " + askText + "?",
    String(keyN), distr, sol,
    { kind: "hw", q2: s.q2, ask: askAa ? "countAa" : "countAA", N: N });
}, ["Find the genotype frequency first (p^2 for homozygous dominant, 2pq for carriers), starting from q^2, then multiply that frequency by the population size."]);

/* ----- bank-gen-seq.js ----- */
// Biology 3201 DNA-sequence generator families (indicators 6.6, 6.7,
// 6.8). Each E entry is one parameterized family in the "gen" idiom:
// sequences are drawn fresh on every call, so students can practise
// the same skill with new bases. Conventions follow the corrected
// book questions (bio3201-fixes.json): the coding strand matches the
// mRNA except T for U, and a silent mutation changes a codon without
// changing the amino acid. All eight entries sit after the mid-course
// table of specifications (which stops at 6.4), so the trailing block
// flags them postMid, the same mechanism bank-u2.js uses.

/* ---------- shared sequence machinery ---------- */

// Mini codon table: the standard genetic code. SQ_AA_ORDER holds the
// one-letter amino acid for all 64 mRNA codons in U,C,A,G index order
// (first base slowest), "*" for stop; SQ_NAMES expands the letters.
var SQ_AA_ORDER = "FFLLSSSSYY**CC*WLLLLPPPPHHQQRRRRIIIMTTTTNNKKSSRRVVVVAAAADDEEGGGG";
var SQ_BASE_ORDER = "UCAG";
var SQ_NAMES = { F: "phenylalanine", L: "leucine", S: "serine", Y: "tyrosine",
  C: "cysteine", W: "tryptophan", P: "proline", H: "histidine", Q: "glutamine",
  R: "arginine", I: "isoleucine", M: "methionine", T: "threonine",
  N: "asparagine", K: "lysine", V: "valine", A: "alanine", D: "aspartate",
  E: "glutamate", G: "glycine", "*": "stop" };
function sqAAName(mrnaCodon) {
  var i = SQ_BASE_ORDER.indexOf(mrnaCodon.charAt(0)) * 16 +
          SQ_BASE_ORDER.indexOf(mrnaCodon.charAt(1)) * 4 +
          SQ_BASE_ORDER.indexOf(mrnaCodon.charAt(2));
  return SQ_NAMES[SQ_AA_ORDER.charAt(i)];
}

// Codon pool: 40 mRNA codons covering all 20 amino acids, no stops.
// DNA forms come from swapping U for T.
var SQ_POOL = ["AUG","GCU","GCC","GGU","GGC","CCU","CCC","GUU","GUC","UUU",
  "UUC","AAA","AAG","AGA","AGG","CGU","CGC","ACU","ACC","UCU","UCC","GAA",
  "GAG","CAA","CAG","CAU","CAC","AAU","AAC","GAU","GAC","UAU","UAC","CUU",
  "CUC","AUU","AUC","UGG","UGU","UGC"];
function sqDNA(codon) { return codon.replace(/U/g, "T"); }
function sqRNA(codon) { return codon.replace(/T/g, "U"); }
var SQ_POOL_DNA = SQ_POOL.map(sqDNA);

function sqDraw(pool, n) {
  var p = pool.slice(), out = [];
  for (var i = 0; i < n; i++) out.push(p.splice(Math.floor(Math.random() * p.length), 1)[0]);
  return out;
}
var SQ_COMP_DNA = { A: "T", T: "A", C: "G", G: "C" };
var SQ_COMP_DNA_RNA = { A: "U", T: "A", C: "G", G: "C" };
var SQ_COMP_RNA = { A: "U", U: "A", C: "G", G: "C" };
function sqMapCodons(codons, map) {
  return codons.map(function (cd) {
    return cd.split("").map(function (b) { return map[b]; }).join("");
  });
}
function sqFmt(codons, left, right) { return left + codons.join(" ") + right; }
function sqPairs(a, b) {
  return a.map(function (cd, i) { return cd + " \u2192 " + b[i]; }).join(", ");
}
// Three distinct distractor strings for a sequence question: the
// caller's classic-error candidates first, then structural pads
// (codon swap, reversed order, one base flipped), all deduped
// against the correct string.
function sqD3(correctStr, candStrs, correctCodons, left, right, flipMap) {
  var seen = {}, out = [];
  seen[correctStr] = 1;
  function add(s) { if (!seen[s] && out.length < 3) { seen[s] = 1; out.push(s); } }
  candStrs.forEach(add);
  if (correctCodons.length > 1) {
    var sw = correctCodons.slice(); var t = sw[0]; sw[0] = sw[1]; sw[1] = t;
    add(sqFmt(sw, left, right));
    add(sqFmt(correctCodons.slice().reverse(), left, right));
  }
  var fl = correctCodons.slice();
  fl[0] = flipMap[fl[0].charAt(0)] + fl[0].slice(1);
  add(sqFmt(fl, left, right));
  return out;
}
// Three distinct distractor lists for an amino acid sequence
// question, padded by swapping one position's amino acid.
function sqD3AA(correctNames, candLists) {
  var key = correctNames.join(", "), seen = {}, out = [];
  seen[key] = 1;
  function add(list) {
    var s = list.join(", ");
    if (!seen[s] && out.length < 3) { seen[s] = 1; out.push(s); }
  }
  candLists.forEach(add);
  var poolNames = ["alanine","arginine","glycine","leucine","lysine","proline","serine","threonine","valine"];
  for (var pos = correctNames.length - 1; pos >= 0 && out.length < 3; pos--) {
    for (var k = 0; k < poolNames.length && out.length < 3; k++) {
      if (poolNames[k] === correctNames[pos]) continue;
      var v = correctNames.slice(); v[pos] = poolNames[k]; add(v);
    }
  }
  return out;
}
var SQ_CODON_TABLE_FIGURE = '<img src="banks/bio-3201/assets/u2-67-q07.jpg" alt="Codon table titled \'Amino Acids coded by RNA Codons\', giving the amino acid for each RNA codon by its first, second and third letters" style="max-width:100%;height:auto">';
function sqWithTable(q) { q.figure = SQ_CODON_TABLE_FIGURE; return q; }

/* ---------- 6.6 DNA replication ---------- */

E("bio-gen-66-rep", 2, ["6.6"], 2, "gen", function () {
  var template = sqDraw(SQ_POOL_DNA, ri(3, 4));
  var newStrand = sqMapCodons(template, SQ_COMP_DNA);
  var correct = sqFmt(newStrand, "5\u2032-", "-3\u2032");
  var rnaVersion = newStrand.map(sqRNA);
  var distractors = sqD3(correct, [
    sqFmt(template, "5\u2032-", "-3\u2032"),
    sqFmt(rnaVersion, "5\u2032-", "-3\u2032"),
    sqFmt(newStrand.slice().reverse(), "5\u2032-", "-3\u2032")
  ], newStrand, "5\u2032-", "-3\u2032", SQ_COMP_DNA);
  return mcq("One strand of a DNA molecule has the sequence 3\u2032-" + template.join(" ") +
    "-5\u2032. During replication, which sequence is built on this template strand?",
    correct, distractors,
    "The new strand is built antiparallel to the template, pairing A with T and C with G, and DNA contains T, never U. Pairing base by base: " +
    sqPairs(template, newStrand) + ". Reading the template 3' to 5' gives the new strand 5'-" +
    newStrand.join(" ") + "-3'.",
    { template: template, answer: newStrand });
}, ["The new strand pairs with the template base by base: A with T, C with G. It runs antiparallel, so a template written 3' to 5' produces a new strand written 5' to 3'."]);

E("bio-gen-66-mrna", 2, ["6.6"], 2, "gen", function () {
  var template = sqDraw(SQ_POOL_DNA, ri(3, 4));
  var mrna = sqMapCodons(template, SQ_COMP_DNA_RNA);
  var dnaVersion = sqMapCodons(template, SQ_COMP_DNA);
  var correct = sqFmt(mrna, "5\u2032-", "-3\u2032");
  var distractors = sqD3(correct, [
    sqFmt(dnaVersion, "5\u2032-", "-3\u2032"),
    sqFmt(template.map(sqRNA), "5\u2032-", "-3\u2032"),
    sqFmt(mrna, "3\u2032-", "-5\u2032")
  ], mrna, "5\u2032-", "-3\u2032", SQ_COMP_RNA);
  return mcq("A template strand of DNA has the sequence 3\u2032-" + template.join(" ") +
    "-5\u2032. Which mRNA sequence is transcribed from this template?",
    correct, distractors,
    "RNA polymerase reads the template 3' to 5' and builds the mRNA 5' to 3', pairing A with U, T with A, C with G and G with C. Pairing base by base: " +
    sqPairs(template, mrna) + ". The mRNA is 5'-" + mrna.join(" ") +
    "-3'. It contains U where DNA would have T, and it is the complement of the template, not a copy of it.",
    { template: template, answer: mrna });
}, ["Transcription pairs each template base with an RNA base: A with U, T with A, C with G, G with C. The mRNA is built 5' to 3' and contains U instead of T."]);

/* ---------- 6.7 protein synthesis ---------- */

E("bio-gen-67-mrna", 2, ["6.7"], 2, "gen", function () {
  var coding = sqDraw(SQ_POOL_DNA, ri(3, 4));
  var mrna = coding.map(sqRNA);
  var templateRNA = sqMapCodons(coding, SQ_COMP_DNA_RNA);
  var correct = sqFmt(mrna, "5\u2032-", "-3\u2032");
  var distractors = sqD3(correct, [
    sqFmt(templateRNA, "5\u2032-", "-3\u2032"),
    sqFmt(coding, "5\u2032-", "-3\u2032"),
    sqFmt(mrna, "3\u2032-", "-5\u2032")
  ], mrna, "5\u2032-", "-3\u2032", SQ_COMP_RNA);
  return mcq("A DNA coding strand contains the sequence 5\u2032-" + coding.join(" ") +
    "-3\u2032. Which mRNA sequence will be produced?",
    correct, distractors,
    "The coding strand has the same sequence as the mRNA, except that DNA uses T where RNA uses U. RNA polymerase reads the template strand, which is the complement of the coding strand (3'-" +
    sqMapCodons(coding, SQ_COMP_DNA).join(" ") +
    "-5'), and builds the mRNA to match the coding strand. Replacing each T with U gives the mRNA: 5'-" +
    mrna.join(" ") + "-3'.",
    { coding: coding, answer: mrna });
}, ["The coding strand has the same sequence as the mRNA (but with T instead of U). The template strand is its complement. RNA polymerase reads the template, so what mRNA does that produce?"]);

E("bio-gen-67-aa", 2, ["6.7"], 2, "gen", function () {
  var mrna = sqDraw(SQ_POOL, ri(3, 4));
  var names = mrna.map(sqAAName);
  var antiNames = sqMapCodons(mrna, SQ_COMP_RNA).map(sqAAName);
  var reversedNames = mrna.map(function (cd) { return cd.split("").reverse().join(""); }).map(sqAAName);
  var altCodon = mrna[1].split("");
  altCodon[0] = { U: "C", C: "A", A: "G", G: "U" }[altCodon[0]];
  var misread = names.slice(); misread[1] = sqAAName(altCodon.join(""));
  var distractors = sqD3AA(names, [antiNames, reversedNames, misread]);
  var q = mcq("Using the codon table, what amino acid sequence is produced from the mRNA sequence 5\u2032-" +
    mrna.join(" ") + "-3\u2032?",
    names.join(", "), distractors,
    "Read the mRNA in codons of three bases and look each one up in the codon table: " +
    mrna.map(function (cd) { return cd + " = " + sqAAName(cd); }).join(", ") +
    ". The amino acid sequence is " + names.join(", ") + ".",
    { mrna: mrna, answer: names });
  return sqWithTable(q);
}, ["Read the mRNA in codons of three bases, in order, and look each codon up in the codon table."]);

E("bio-gen-67-anti", 2, ["6.7"], 2, "gen", function () {
  var mrna = sqDraw(SQ_POOL, ri(2, 3));
  var anti = sqMapCodons(mrna, SQ_COMP_RNA);
  var correct = sqFmt(anti, "3\u2032-", "-5\u2032");
  var distractors = sqD3(correct, [
    sqFmt(anti, "5\u2032-", "-3\u2032"),
    sqFmt(mrna, "3\u2032-", "-5\u2032"),
    sqFmt(anti.map(sqDNA), "3\u2032-", "-5\u2032")
  ], anti, "3\u2032-", "-5\u2032", SQ_COMP_RNA);
  return mcq("An mRNA molecule contains the codons 5\u2032-" + mrna.join(" ") +
    "-3\u2032. Which tRNA anticodon sequence pairs with these codons during translation?",
    correct, distractors,
    "Anticodons pair antiparallel with codons, base by base, with A pairing U, U pairing A, C pairing G and G pairing C. Pairing base by base: " +
    sqPairs(mrna, anti) + ". Written beneath the codons, the anticodons run 3'-" +
    anti.join(" ") + "-5', and because tRNA is RNA they contain U, not T.",
    { mrna: mrna, answer: anti });
}, ["Anticodons pair antiparallel with codons: A pairs with U, U with A, C with G, G with C. The anticodon sits beneath the codon, so it is written 3' to 5'."]);

/* ---------- 6.8 mutations ---------- */

// Every single-base substitution of a coding sequence, classified by
// its effect on the one codon it touches.
function sqSubstitutions(codingMRNA) {
  var coding = codingMRNA.map(sqDNA), out = [];
  var bases = ["A", "C", "G", "T"];
  coding.forEach(function (cd, ci) {
    for (var j = 0; j < 3; j++) {
      bases.forEach(function (b) {
        if (b === cd.charAt(j)) return;
        var mut = cd.slice(0, j) + b + cd.slice(j + 1);
        var before = sqAAName(codingMRNA[ci]), after = sqAAName(sqRNA(mut));
        var effect = after === "stop" ? "nonsense" : (after === before ? "silent" : "missense");
        out.push({ codonIndex: ci, baseIndex: j, from: cd.charAt(j), to: b,
                   origCodon: cd, mutCodon: mut, before: before, after: after, effect: effect });
      });
    }
  });
  return out;
}
var SQ_EFFECT_LABEL = { silent: "Silent mutation", missense: "Missense mutation",
  nonsense: "Nonsense mutation", frameshift: "Frameshift mutation" };

E("bio-gen-68-sub", 2, ["6.8"], 2, "gen", function () {
  var effect = pick(["silent", "missense", "nonsense"]);
  var codingMRNA = null, sub = null, mutated = null;
  for (var tries = 0; tries < 200 && !sub; tries++) {
    codingMRNA = sqDraw(SQ_POOL, 4);
    var matches = sqSubstitutions(codingMRNA).filter(function (s) { return s.effect === effect; });
    if (matches.length) {
      sub = pick(matches);
      mutated = codingMRNA.map(sqDNA);
      mutated[sub.codonIndex] = sub.mutCodon;
    }
  }
  var coding = codingMRNA.map(sqDNA);
  var distractors = ["silent", "missense", "nonsense", "frameshift"]
    .filter(function (e) { return e !== effect; }).map(function (e) { return SQ_EFFECT_LABEL[e]; });
  var detail;
  if (effect === "silent") detail = "The amino acid is unchanged, so the protein produced is identical: the mutation is silent. Only one codon is affected, so the reading frame does not shift.";
  else if (effect === "nonsense") detail = "The mutated codon is a stop signal, so translation ends early and the protein is cut short: the mutation is nonsense. Only one codon is affected, so the reading frame does not shift.";
  else detail = "One amino acid is swapped for a different one, so the protein changes at a single position: the mutation is missense. Only one codon is affected, so the reading frame does not shift.";
  var q = mcq("A section of the coding strand of a gene reads 5\u2032-" + coding.join(" ") +
    "-3\u2032. In a mutated copy, codon " + (sub.codonIndex + 1) + " changes from " + sub.origCodon +
    " to " + sub.mutCodon + ", giving 5\u2032-" + mutated.join(" ") +
    "-3\u2032. Which type of mutation is this?",
    SQ_EFFECT_LABEL[effect], distractors,
    "Only codon " + (sub.codonIndex + 1) + " changes. The original codon " + sub.origCodon +
    " gives the mRNA codon " + sqRNA(sub.origCodon) + ", which codes for " + sub.before +
    ". The mutated codon " + sub.mutCodon + " gives the mRNA codon " + sqRNA(sub.mutCodon) +
    ", which codes for " + sub.after + ". " + detail,
    { coding: coding, mutated: mutated, codonIndex: sub.codonIndex, effect: effect });
  return sqWithTable(q);
}, ["Translate just the changed codon in both versions, using the codon table. Compare the two amino acids: the same, different, or a stop?"]);

E("bio-gen-68-indel", 2, ["6.8"], 3, "gen", function () {
  var bases = ["A", "C", "G", "T"];
  var coding = null, mutatedBases = "", kind = "", pos = 0, base = "";
  for (var tries = 0; tries < 200 && !coding; tries++) {
    var draw = sqDraw(SQ_POOL, 5).map(sqDNA);
    var flat = draw.join("");
    var p = ri(4, 10);
    var mut;
    if (Math.random() < 0.5) { kind = "insertion"; base = pick(bases); mut = flat.slice(0, p + 1) + base + flat.slice(p + 1); pos = p + 1; }
    else { kind = "deletion"; base = flat.charAt(p); mut = flat.slice(0, p) + flat.slice(p + 1); pos = p; }
    var regrouped = [];
    for (var i = 0; i + 3 <= mut.length; i += 3) regrouped.push(mut.slice(i, i + 3));
    var aas = regrouped.map(function (cd) { return sqAAName(sqRNA(cd)); });
    var origAAs = draw.map(function (cd) { return sqAAName(sqRNA(cd)); });
    var changed = aas.some(function (a, i2) { return a !== origAAs[i2]; });
    if (aas.indexOf("stop") < 0 && changed) { coding = draw; mutatedBases = mut; }
  }
  var mutCodons = [];
  for (var k = 0; k < mutatedBases.length; k += 3) mutCodons.push(mutatedBases.slice(k, k + 3));
  var changeText = kind === "insertion"
    ? "a single base, " + base + ", is inserted after base " + pos
    : "the base at position " + (pos + 1) + ", " + base + ", is deleted";
  var distractors = ["silent", "missense", "nonsense"].map(function (e) { return SQ_EFFECT_LABEL[e]; });
  return mcq("A section of the coding strand of a gene reads 5\u2032-" + coding.join(" ") +
    "-3\u2032. In a mutated copy, " + changeText + ", giving 5\u2032-" + mutCodons.join(" ") +
    "-3\u2032. Which type of mutation is this?",
    SQ_EFFECT_LABEL.frameshift, distractors,
    "The sequence changes by one base, and one is not a multiple of three, so every codon after the change is regrouped. The codons before the change are read as before, but from the change onward the codons become " +
    mutCodons.slice(Math.floor(pos / 3)).join(", ") +
    " instead of " + coding.slice(Math.floor(pos / 3)).join(", ") +
    ", so the amino acid sequence changes from that point on. A shift of the reading frame like this is a frameshift mutation.",
    { coding: coding, mutated: mutCodons, kind: kind, pos: pos });
}, ["Count the bases added or removed. If the number is not a multiple of three, every codon after the change point is regrouped and read differently."]);

E("bio-gen-68-aa", 2, ["6.8"], 3, "gen", function () {
  var codingMRNA = null, sub = null, mutated = null;
  for (var tries = 0; tries < 200 && !sub; tries++) {
    codingMRNA = sqDraw(SQ_POOL, 4);
    var matches = sqSubstitutions(codingMRNA).filter(function (s) { return s.effect === "missense"; });
    if (matches.length) {
      sub = pick(matches);
      mutated = codingMRNA.map(sqDNA);
      mutated[sub.codonIndex] = sub.mutCodon;
    }
  }
  var coding = codingMRNA.map(sqDNA);
  var mutNames = mutated.map(function (cd) { return sqAAName(sqRNA(cd)); });
  var origNames = codingMRNA.map(sqAAName);
  var templateNames = sqMapCodons(mutated, SQ_COMP_DNA).map(function (cd) { return sqAAName(sqRNA(cd)); });
  var distractors = sqD3AA(mutNames, [origNames, templateNames]);
  var q = mcq("A section of the coding strand of a gene reads 5\u2032-" + coding.join(" ") +
    "-3\u2032. In a mutated copy, codon " + (sub.codonIndex + 1) + " changes from " + sub.origCodon +
    " to " + sub.mutCodon + ", giving 5\u2032-" + mutated.join(" ") +
    "-3\u2032. Using the codon table, what amino acid sequence does the mutated gene produce?",
    mutNames.join(", "), distractors,
    "Translate the mutated coding strand codon by codon, swapping T for U to get each mRNA codon: " +
    mutated.map(function (cd) { return cd + " \u2192 " + sqRNA(cd) + " = " + sqAAName(sqRNA(cd)); }).join(", ") +
    ". Only codon " + (sub.codonIndex + 1) + " differs from the original: " + sub.before +
    " is replaced by " + sub.after + ". The mutated amino acid sequence is " + mutNames.join(", ") + ".",
    { coding: coding, mutated: mutated, codonIndex: sub.codonIndex, answer: mutNames });
  return sqWithTable(q);
}, ["Translate the original sequence first. Then change only the one codon named in the question and translate again; every other amino acid stays the same."]);

// Held out of the Mid preset: the PEP mid-course scope stops at 6.4.
BANK.forEach(function (e) {
  if (["bio-gen-66-rep","bio-gen-66-mrna","bio-gen-67-mrna","bio-gen-67-aa","bio-gen-67-anti","bio-gen-68-sub","bio-gen-68-indel","bio-gen-68-aa"].indexOf(e.id) >= 0) e.postMid = true;
});

/* ----- bank-gen-pedigree.js ----- */
/* Biology 3201 Unit 2 bank slice: pedigree generator, indicator 6.4.
   One entry per question type: identify the mode of inheritance,
   find a forced genotype, and find a probability for a named couple.
   Every draw builds a fresh family tree and a fresh pedigree diagram
   (squares are males, circles are females, filled symbols are
   affected, labels are Roman-numeral generations numbered left to
   right).

   Source and validation: adapted from the pedigree prototype in the
   Biology 3201 working files (pedigree-prototype/pedigree.js),
   which was validated standalone before being accepted: 2,142
   generated trees and 750 generated questions (250 per type) checked
   by an independently written brute-force consistency checker, zero
   failures. The genetics core below is that prototype, unchanged:
   choose a mode of inheritance, assign founder genotypes, simulate
   Mendelian inheritance down the tree, derive the phenotypes from
   the genotypes, and serve a question only when an exhaustive
   consistency checker proves the keyed answer is the only one the
   drawn phenotypes allow.

   X-linked recessive mode questions keep the prototype's documented
   serving basis. Pure logic cannot separate X-linked recessive from
   autosomal recessive (every X-linked recessive pedigree is also
   consistent with autosomal recessive inheritance), so those
   questions are served only when the tree is consistent with exactly
   those two modes AND shows the textbook X-linked signature: at
   least two affected males, a carrier path through an unaffected
   mother, and no father-to-son transmission. That is the same basis
   the review book's own X-linked pedigree item is keyed on.

   Changes from the prototype, all in the question text layer (the
   genetics, the checker, the tree builder and the SVG renderer are
   untouched):
   - Solutions are rebuilt from the drawn tree: they name the
     individuals and state the deduction (which relative forces which
     allele), instead of shorter generic closers.
   - A genotype question is served only when a concrete deduction of
     that kind exists for its target; otherwise the draw is skipped
     and a new tree is generated. A founder mother whose carrier
     status is settled by a grandchild gets a two-step deduction
     through her carrier daughter.
   - The finished question is passed through the shell's mcq()
     builder, so option order follows the house rule (numeric
     ascending, otherwise alphabetical) like every other entry.

   Levels: mode identification is Level 3 (weigh the whole tree, rule
   patterns in and out). The forced genotype is Level 3: the prompt
   does not state the mode, so the student must first identify the
   pattern and then run the deduction through the target's
   relatives, the same demand as the book's own genotype item
   (bio-u2-64-q03, tagged Level 3). Probability is Level 3: both
   parents' genotypes must be forced from the tree before the
   Punnett square can even be set up.

   Wiring: assemble-bank.py currently lists bank-u1.js, bank-u2.js
   and bank-u3.js for bio-3201; add "bank-gen-pedigree.js" to that
   list (after bank-u2.js) to include this slice in the assembled
   bank. PED64 is the only global this file adds. */

var PED64 = (function () {
"use strict";

/* ---------------- seeded RNG (mulberry32) ---------------- */
function RNG(seed) {
  var a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    var t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------------- genetics model ----------------
   Autosomal genotypes are allele pairs over {A, a} stored sorted, so
   "AA", "Aa", "aa". For X-linked, females are pairs over {A, a} read as
   X^A X^A, X^A X^a, X^a X^a, and males are single letters read as
   X^A Y / X^a Y. Phenotype: AD affected iff at least one A (A is the
   disease allele); AR affected iff aa; XLR affected iff female aa or
   male a. */
var MODES = {
  AD:  { label: "Autosomal dominant",  kind: "auto" },
  AR:  { label: "Autosomal recessive", kind: "auto" },
  XLR: { label: "X-linked recessive",  kind: "x" }
};
var MODE_KEYS = ["AD", "AR", "XLR"];

function genotypeDomain(mode, sex) {
  if (MODES[mode].kind === "auto") return ["AA", "Aa", "aa"];
  return sex === "M" ? ["A", "a"] : ["AA", "Aa", "aa"];
}
function phenotypeOf(mode, sex, g) {
  if (mode === "AD") return g.indexOf("A") >= 0;
  if (mode === "AR") return g === "aa";
  /* XLR */
  if (sex === "M") return g === "a";
  return g === "aa";
}
function genotypeText(mode, sex, g) {
  if (MODES[mode].kind === "auto") return g;
  if (sex === "M") return g === "A" ? "X\u1D2C Y" : "X\u1D43 Y";
  if (g === "AA") return "X\u1D2C X\u1D2C";
  if (g === "Aa") return "X\u1D2C X\u1D43";
  return "X\u1D43 X\u1D43";
}
function gametes(mode, sex, g) {
  if (MODES[mode].kind === "x" && sex === "M") return [g]; /* his only X */
  return [g.charAt(0), g.charAt(1)];
}
function childGenotype(mode, father, mother, childSex, rnd) {
  var fg = gametes(mode, "M", father), mg = gametes(mode, "F", mother);
  var fa = fg[Math.floor(rnd() * fg.length)];
  var ma = mg[Math.floor(rnd() * mg.length)];
  if (MODES[mode].kind === "x") {
    if (childSex === "M") return ma;            /* son gets mother's X */
    var pair = [fa, ma].sort().join("");        /* daughter: X from each */
    return pair === "aA" ? "Aa" : pair;
  }
  var p = [fa, ma].sort().join("");
  return p === "aA" ? "Aa" : p;
}
function punnett(mode, father, mother) {
  /* All equally likely child genotypes: list of {sex, g}. */
  var out = [], fg = gametes(mode, "M", father), mg = gametes(mode, "F", mother), i, j;
  for (i = 0; i < fg.length; i++) for (j = 0; j < mg.length; j++) {
    ["M", "F"].forEach(function (sex) {
      var fa = fg[i], ma = mg[j], g;
      if (MODES[mode].kind === "x") {
        if (sex === "M") g = ma;
        else { var pr = [fa, ma].sort().join(""); g = pr === "aA" ? "Aa" : pr; }
      } else { var p2 = [fa, ma].sort().join(""); g = p2 === "aA" ? "Aa" : p2; }
      out.push({ sex: sex, g: g });
    });
  }
  return out;
}

/* ---------------- tree generation ----------------
   One founder couple (generation I), their children (II), some of whom
   have partners and children (III). Partners marry in as founders. */
var nextId = 1;
function person(sex, gen, father, mother) {
  return { id: nextId++, sex: sex, gen: gen, father: father, mother: mother,
           partner: null, genotype: null, affected: false, label: "" };
}
function founderGenotype(mode, sex, rnd, wantCarrierRich) {
  var r = rnd();
  if (mode === "AD")  return r < 0.30 ? "Aa" : "aa";      /* A = disease allele */
  if (mode === "AR")  return r < (wantCarrierRich ? 0.55 : 0.35) ? "Aa" : (r < 0.62 ? "aa" : "AA");
  /* XLR */
  if (sex === "M") return r < 0.25 ? "a" : "A";
  return r < 0.45 ? "Aa" : (r < 0.52 ? "aa" : "AA");
}
function generateTree(mode, rnd) {
  nextId = 1;
  var people = [], byId = {};
  function add(p) { people.push(p); byId[p.id] = p; return p; }
  var f = add(person("M", 0, null, null)), m = add(person("F", 0, null, null));
  f.partner = m.id; m.partner = f.id;
  f.genotype = founderGenotype(mode, "M", rnd, true);
  m.genotype = founderGenotype(mode, "F", rnd, true);
  var couples = [{ a: f, b: m }];
  function kids(couple, n, gen) {
    var out = [];
    for (var i = 0; i < n; i++) {
      var sex = rnd() < 0.5 ? "M" : "F";
      var dad = couple.a.sex === "M" ? couple.a : couple.b;
      var mom = couple.a.sex === "F" ? couple.a : couple.b;
      var c = add(person(sex, gen, dad.id, mom.id));
      c.genotype = childGenotype(mode, dad.genotype, mom.genotype, sex, rnd);
      out.push(c);
    }
    return out;
  }
  var genII = kids(couples[0], 2 + Math.floor(rnd() * 3), 1);   /* 2-4 children */
  var shuffled = genII.slice();
  for (var i = shuffled.length - 1; i > 0; i--) { var j = Math.floor(rnd() * (i + 1)); var t = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = t; }
  var nFam = genII.length === 2 ? 2 : (rnd() < 0.6 ? 2 : 1);
  for (var k = 0; k < nFam && k < shuffled.length; k++) {
    var blood = shuffled[k];
    var partner = add(person(blood.sex === "M" ? "F" : "M", 1, null, null));
    partner.genotype = founderGenotype(mode, partner.sex, rnd, false);
    blood.partner = partner.id; partner.partner = blood.id;
    var couple = { a: blood, b: partner };
    couples.push(couple);
    kids(couple, 2 + Math.floor(rnd() * 2), 2);                  /* 2-3 children */
  }
  people.forEach(function (p) { p.affected = phenotypeOf(mode, p.sex, p.genotype); });
  return { people: people, byId: byId, couples: couples };
}
function treeQuality(t) {
  var aff = t.people.filter(function (p) { return p.affected; }).length;
  if (t.people.length < 9) return false;
  if (aff < 1 || aff > Math.ceil(t.people.length * 0.45)) return false;
  return true;
}

/* ---------------- consistency checker ----------------
   Enumerates genotype assignments consistent with the observed
   phenotypes and Mendelian inheritance under a candidate mode, by
   backtracking in parent-before-child order. Returns, per person, the
   set of genotypes they take in any consistent assignment, or null if
   the mode admits no assignment at all. Y-linked is checked by its
   own rule (affected males only, and every son of an affected male
   affected; an affected male's father must be affected). */
function consistentGenotypes(people, byId, mode) {
  if (mode === "YL") {
    for (var i = 0; i < people.length; i++) {
      var p = people[i];
      if (p.affected && p.sex !== "M") return null;
      if (p.affected && p.father != null && !byId[p.father].affected) return null;
      if (!p.affected && p.sex === "M" && p.father != null && byId[p.father].affected) return null;
    }
    var any = {}; people.forEach(function (q) { any[q.id] = new Set(["-"]); });
    return any;
  }
  var order = people.slice().sort(function (a, b) { return a.gen - b.gen || a.id - b.id; });
  var possible = {}, solutions = 0, CAP = 4000;
  order.forEach(function (p) { possible[p.id] = new Set(); });
  var assign = {};
  function childOK(child, g) {
    var dad = byId[child.father], mom = byId[child.mother];
    if (!(dad.id in assign) || !(mom.id in assign)) return true; /* checked later */
    var combos = punnett(mode, assign[dad.id], assign[mom.id]);
    return combos.some(function (c) { return c.sex === child.sex && c.g === g; });
  }
  function parentsOK(p, g) {
    if (p.father == null) return true;
    var dad = byId[p.father], mom = byId[p.mother];
    if (!(dad.id in assign) || !(mom.id in assign)) return true;
    var combos = punnett(mode, assign[dad.id], assign[mom.id]);
    return combos.some(function (c) { return c.sex === p.sex && c.g === g; });
  }
  function bt(idx) {
    if (solutions >= CAP) return;
    if (idx === order.length) {
      solutions++;
      order.forEach(function (p) { possible[p.id].add(assign[p.id]); });
      return;
    }
    var p = order[idx];
    var dom = genotypeDomain(mode, p.sex).filter(function (g) {
      return phenotypeOf(mode, p.sex, g) === p.affected;
    });
    for (var i = 0; i < dom.length; i++) {
      var g = dom[i];
      if (!parentsOK(p, g)) continue;
      assign[p.id] = g;
      /* children already assigned (none: parents come first), so only
         this person's own parent constraint matters here. */
      bt(idx + 1);
      delete assign[p.id];
      if (solutions >= CAP) return;
    }
  }
  bt(0);
  if (solutions === 0) return null;
  return possible;
}
function consistentModes(t) {
  var out = [];
  ["AD", "AR", "XLR", "YL"].forEach(function (mode) {
    if (consistentGenotypes(t.people, t.byId, mode)) out.push(mode);
  });
  return out;
}

/* ---------------- layout and SVG rendering ----------------
   Tidy layout: a mating unit is as wide as its children's units or
   two slots, whichever is wider; partners sit side by side centred
   over their children. Labels are Roman generation numerals, numbered
   left to right within a generation. */
var ROMAN = ["I", "II", "III", "IV"];
function layout(t) {
  var byId = t.byId;
  /* children map per couple key */
  function childrenOf(a, b) {
    return t.people.filter(function (p) {
      return (p.father === a.id && p.mother === b.id) || (p.father === b.id && p.mother === a.id);
    }).sort(function (x, y) { return x.id - y.id; });
  }
  var widthMemo = {};
  function unitWidth(p) {                     /* p is the blood parent */
    if (widthMemo[p.id] != null) return widthMemo[p.id];
    var w = 1;
    if (p.partner != null) {
      var kids = childrenOf(p, byId[p.partner]);
      if (kids.length) {
        var sum = 0;
        kids.forEach(function (c) { sum += unitWidth(c); });
        w = Math.max(2, sum);
      } else w = 2;
    }
    widthMemo[p.id] = w; return w;
  }
  var pos = {};                               /* id -> slot x */
  function place(p, left) {                   /* p heads a unit at slot left */
    var w = unitWidth(p);
    if (p.partner == null) { pos[p.id] = left; return; }
    var partner = byId[p.partner], kids = childrenOf(p, partner);
    if (!kids.length) { pos[p.id] = left; pos[partner.id] = left + 1; return; }
    var sum = 0; kids.forEach(function (c) { sum += unitWidth(c); });
    var coupleLeft = left + Math.max(0, (sum - 2) / 2);
    /* blood parent keeps the side matching birth order position: put
       the blood parent on the left for fathers, right for mothers is
       not standard; standard is male left, female right. */
    var dad = p.sex === "M" ? p : partner, mom = p.sex === "M" ? partner : p;
    pos[dad.id] = coupleLeft; pos[mom.id] = coupleLeft + 1;
    var cx = left;
    kids.forEach(function (c) { place(c, cx); cx += unitWidth(c); });
  }
  var founders = t.people.filter(function (p) { return p.gen === 0; });
  var root = founders[0];
  place(root, 0);
  /* labels: sort each generation by x */
  var gens = {};
  t.people.forEach(function (p) { (gens[p.gen] = gens[p.gen] || []).push(p); });
  Object.keys(gens).forEach(function (g) {
    gens[g].sort(function (a, b) { return pos[a.id] - pos[b.id]; });
    gens[g].forEach(function (p, i) { p.label = ROMAN[g] + "-" + (i + 1); });
  });
  return pos;
}
function renderSVG(t, opts) {
  opts = opts || {};
  var pos = layout(t), byId = t.byId;
  var SLOT = 46, SYM = 26, ROWH = 92, TOP = 26, LEFT = 30;
  var maxSlot = 0;
  t.people.forEach(function (p) { if (pos[p.id] > maxSlot) maxSlot = pos[p.id]; });
  var W = LEFT * 2 + (maxSlot + 1) * SLOT, H = TOP * 2 + 3 * ROWH;
  function cx(p) { return LEFT + pos[p.id] * SLOT + SLOT / 2; }
  function cy(p) { return TOP + p.gen * ROWH + SYM / 2; }
  var s = ['<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + " " + H + '" width="' + W + '" height="' + H + '" role="img" aria-label="Pedigree chart">'];
  s.push('<rect x="0" y="0" width="' + W + '" height="' + H + '" fill="#ffffff"/>');
  /* mating and descent lines first */
  var drawnCouples = {};
  t.people.forEach(function (p) {
    if (p.partner == null) return;
    var key = Math.min(p.id, p.partner) + "-" + Math.max(p.id, p.partner);
    if (drawnCouples[key]) return; drawnCouples[key] = 1;
    var a = p, b = byId[p.partner], y = cy(a);
    s.push('<line x1="' + cx(a) + '" y1="' + y + '" x2="' + cx(b) + '" y2="' + y + '" stroke="#222" stroke-width="2"/>');
    var kids = t.people.filter(function (c) {
      return (c.father === a.id && c.mother === b.id) || (c.father === b.id && c.mother === a.id);
    });
    if (!kids.length) return;
    var midX = (cx(a) + cx(b)) / 2, kidY = cy(kids[0]);
    var xs = kids.map(function (c) { return cx(c); });
    var sibY = y + ROWH / 2;
    s.push('<line x1="' + midX + '" y1="' + y + '" x2="' + midX + '" y2="' + sibY + '" stroke="#222" stroke-width="2"/>');
    s.push('<line x1="' + Math.min.apply(null, xs.concat([midX])) + '" y1="' + sibY + '" x2="' + Math.max.apply(null, xs.concat([midX])) + '" y2="' + sibY + '" stroke="#222" stroke-width="2"/>');
    kids.forEach(function (c) {
      s.push('<line x1="' + cx(c) + '" y1="' + sibY + '" x2="' + cx(c) + '" y2="' + (kidY - SYM / 2) + '" stroke="#222" stroke-width="2"/>');
    });
  });
  /* symbols */
  t.people.forEach(function (p) {
    var x = cx(p), y = cy(p), fill = p.affected ? "#1f4e79" : "#ffffff";
    if (p.sex === "M") {
      s.push('<rect x="' + (x - SYM / 2) + '" y="' + (y - SYM / 2) + '" width="' + SYM + '" height="' + SYM + '" fill="' + fill + '" stroke="#222" stroke-width="2"/>');
    } else {
      s.push('<circle cx="' + x + '" cy="' + y + '" r="' + (SYM / 2) + '" fill="' + fill + '" stroke="#222" stroke-width="2"/>');
    }
    if (opts.carrierDots && p.sex === "F" && !p.affected && p.genotype === "Aa" && MODES[opts.mode].kind === "x") {
      s.push('<circle cx="' + x + '" cy="' + y + '" r="3.2" fill="#222"/>');
    }
    s.push('<text x="' + x + '" y="' + (y + SYM / 2 + 16) + '" font-family="Arial, sans-serif" font-size="12" text-anchor="middle" fill="#222">' + p.label + "</text>");
  });
  s.push("</svg>");
  return s.join("");
}

/* ---------------- question builders ---------------- */
function orderOptions(opts) {
  var numeric = opts.every(function (o) { return /^-?[\d.]+%$/.test(o.t); });
  var arr = opts.slice();
  arr.sort(function (a, b) {
    if (numeric) return parseFloat(a.t) - parseFloat(b.t);
    return a.t < b.t ? -1 : a.t > b.t ? 1 : 0;
  });
  return arr;
}
function toMCQ(prompt, correct, distractors, solution, figure) {
  var seen = {}, opts = [{ t: correct, ok: true }];
  distractors.forEach(function (d) {
    if (d !== correct && !seen[d]) { seen[d] = 1; opts.push({ t: d, ok: false }); }
  });
  var ordered = orderOptions(opts);
  return { prompt: prompt, type: "mc",
           options: ordered.map(function (o) { return o.t; }),
           correct: ordered.findIndex(function (o) { return o.ok; }),
           solution: solution, figure: figure };
}
function pedKids(t, p) {
  return t.people.filter(function (c) { return c.father === p.id || c.mother === p.id; });
}
function joinLbl(labels) {
  if (labels.length <= 1) return labels.join("");
  if (labels.length === 2) return labels[0] + " and " + labels[1];
  return labels.slice(0, -1).join(", ") + " and " + labels[labels.length - 1];
}
function xlrExclusion(t) {
  /* Sound local facts that rule out an X-linked reading of the drawn
     phenotypes, each checked against the tree before it is stated. */
  var byId = t.byId, i, c;
  for (i = 0; i < t.people.length; i++) {
    c = t.people[i];
    if (c.affected && c.sex === "F" && c.father != null && !byId[c.father].affected) {
      return "It is not X-linked either: " + c.label + " is an affected female, and a daughter receives one X chromosome from her father. Her father " + byId[c.father].label + " is unaffected, so the X he passed on carries the normal allele, and she could not be affected under an X-linked pattern.";
    }
  }
  for (i = 0; i < t.people.length; i++) {
    c = t.people[i];
    if (!c.affected && c.sex === "M" && c.mother != null && byId[c.mother].affected) {
      return "It is not X-linked either: " + c.label + " is an unaffected male whose mother " + byId[c.mother].label + " is affected. A son receives his X chromosome from his mother, so under an X-linked pattern he would have received the affected X and shown the trait himself.";
    }
  }
  for (i = 0; i < t.people.length; i++) {
    c = t.people[i];
    if (!c.affected && c.father != null && byId[c.father].affected && byId[c.mother].affected) {
      return "It is not X-linked either: " + byId[c.father].label + " and " + byId[c.mother].label + " are both affected, yet their child " + c.label + " is unaffected. Under an X-linked pattern an affected mother passes the allele to every child and an affected father passes it to every daughter, so no child of theirs could be unaffected.";
    }
  }
  return null;
}
function autosomalNote(t) {
  var f = null, m = null, i;
  for (i = 0; i < t.people.length; i++) {
    if (!t.people[i].affected) continue;
    if (t.people[i].sex === "F" && !f) f = t.people[i];
    if (t.people[i].sex === "M" && !m) m = t.people[i];
  }
  if (f && m) return "Affected individuals include females as well as males (" + f.label + " and " + m.label + " are both affected), which fits a gene carried on an autosome rather than a sex chromosome.";
  if (f) return "Affected individuals include a female (" + f.label + "), which fits a gene carried on an autosome rather than a sex chromosome.";
  return "The pattern fits a gene carried on an autosome rather than a sex chromosome.";
}
function modeClue(t, mode) {
  /* Solution text for the mode question, rebuilt for the review app:
     every fact stated is read off the drawn tree (named individuals
     and the deduction they force), never generic filler. The caller
     appends the pattern name. */
  var byId = t.byId, i, c, p;
  if (mode === "AR") {
    for (i = 0; i < t.people.length; i++) {
      c = t.people[i];
      if (c.affected && c.father != null && !byId[c.father].affected && !byId[c.mother].affected) {
        var excl = xlrExclusion(t);
        return byId[c.father].label + " and " + byId[c.mother].label + " are both unaffected, yet their child " + c.label + " is affected. A dominant trait cannot appear from two unaffected parents, because anyone carrying a dominant allele would show it, so the trait must be recessive, with both parents as carriers who each passed the recessive allele to " + c.label + ". " + (excl || autosomalNote(t));
      }
    }
    return "Two unaffected parents have an affected child, so the trait must be recessive, and affected individuals of both sexes point to an autosome.";
  }
  if (mode === "AD") {
    var txt = null;
    for (i = 0; i < t.people.length; i++) {
      c = t.people[i];
      if (!c.affected && c.father != null && byId[c.father].affected && byId[c.mother].affected) {
        txt = byId[c.father].label + " and " + byId[c.mother].label + " are both affected, yet their child " + c.label + " is unaffected. If the trait were recessive, two affected parents (aa and aa) could only have affected children, so the trait cannot be recessive: " + c.label + " received the recessive allele from both parents, which means each affected parent carries one copy of it.";
        break;
      }
    }
    if (!txt) {
      for (i = 0; i < t.people.length; i++) {
        c = t.people[i];
        if (c.affected && c.father != null && (byId[c.father].affected || byId[c.mother].affected)) {
          p = byId[c.father].affected ? byId[c.father] : byId[c.mother];
          txt = c.label + " is affected, as is " + (p.sex === "M" ? "his father " : "her mother ") + p.label + ", and throughout the pedigree the trait passes directly from affected parents to their children.";
          break;
        }
      }
    }
    if (!txt) txt = "Every affected individual in the pedigree has an affected parent, and affected parents pass the trait to about half of their children.";
    var f = null;
    for (i = 0; i < t.people.length; i++) if (t.people[i].affected && t.people[i].sex === "F") { f = t.people[i]; break; }
    if (f) txt += " Affected females such as " + f.label + " rule out Y-linked inheritance, because females have no Y chromosome.";
    var everyGen = [0, 1, 2].every(function (g) {
      return t.people.some(function (q) { return q.gen === g && q.affected; });
    });
    if (everyGen) txt += " The trait appears in every generation.";
    return txt;
  }
  /* XLR: served on the textbook signature (see xlrSignature): at
     least two affected males, a carrier path through an unaffected
     mother, and no father-to-son transmission. Each fact below is
     verified against the drawn tree before it is stated. */
  var affM = t.people.filter(function (q) { return q.affected && q.sex === "M"; });
  var affF = t.people.filter(function (q) { return q.affected && q.sex === "F"; });
  if (!affM.length) return "The trait passes through unaffected carrier females to their children and never from a father to a son.";
  var verb = affM.length === 1 ? " is" : " are";
  var out;
  if (!affF.length) {
    out = "Every affected individual in the pedigree is male: " + joinLbl(affM.map(function (q) { return q.label; })) + verb + " affected.";
  } else {
    out = "The affected individuals are almost all male: " + joinLbl(affM.map(function (q) { return q.label; })) + verb + " affected, with a single affected female, " + affF[0].label + ".";
    if (affF[0].father != null && byId[affF[0].father].affected) {
      out += " " + affF[0].label + " is the daughter of an affected father, " + byId[affF[0].father].label + ", as this pattern requires: she received his only X chromosome.";
    }
  }
  for (i = 0; i < t.people.length; i++) {
    p = t.people[i];
    if (p.affected && p.sex === "M" && p.mother != null && !byId[p.mother].affected) {
      out += " " + p.label + " is affected even though his mother " + byId[p.mother].label + " is not: a son receives his X chromosome from his mother, so she must be an unaffected carrier who passed the affected X on to him.";
      break;
    }
  }
  var fts = t.people.some(function (q) {
    return q.affected && q.sex === "M" && q.father != null && byId[q.father].affected;
  });
  if (!fts) out += " No affected father passes the trait to a son, which fits: a father gives his sons a Y chromosome, never an X.";
  return out;
}
function genotypeSolution(t, mode, target, possible) {
  /* Worked solution for the genotype question: the mode, the range
     the target's own phenotype allows, then the one relative whose
     phenotype settles which allele the target must carry. Returns
     null when no concrete deduction of that kind exists for this
     target, and the caller then does not serve the question: a
     generated question never ships with a generic solution. */
  var byId = t.byId, p = target.person, g = target.genotype;
  var kids = pedKids(t, p);
  var dad = p.father != null ? byId[p.father] : null;
  var mom = p.mother != null ? byId[p.mother] : null;
  var gText = genotypeText(mode, p.sex, g);
  var open = "The pedigree shows " + MODES[mode].label.toLowerCase() + " inheritance. ";
  if (mode === "AR") open += p.label + " is unaffected, so the genotype is either AA or Aa. ";
  else if (mode === "AD") open += p.label + " is affected, so the genotype is either AA or Aa. ";
  else open += p.label + " is unaffected, so the genotype is either " + genotypeText(mode, "F", "AA") + " or " + genotypeText(mode, "F", "Aa") + ". ";
  var step = null, i, c;
  if (mode === "AR" || mode === "XLR") {
    for (i = 0; i < kids.length; i++) {
      c = kids[i];
      if (!c.affected) continue;
      if (mode === "AR") step = c.label + " is affected (aa), so " + c.label + " received an a allele from each parent, including one from " + p.label + ". That settles it: " + p.label + " carries an a allele.";
      else if (c.sex === "M") step = c.label + " is an affected son (" + genotypeText(mode, "M", "a") + "). A son receives his X chromosome from his mother, so " + p.label + " must carry the affected X.";
      else step = c.label + " is an affected daughter (" + genotypeText(mode, "F", "aa") + "), so she received an affected X from each parent, including one from her mother " + p.label + ".";
      break;
    }
  }
  if (!step && mode === "AD") {
    for (i = 0; i < kids.length; i++) {
      c = kids[i];
      if (c.affected) continue;
      step = c.label + " is unaffected, and under a dominant pattern an unaffected individual is aa, so " + c.label + " received an a allele from each parent, including one from " + p.label + ". So " + p.label + " carries an a allele even though the dominant allele is the one that shows.";
      break;
    }
  }
  if (!step && (mode === "AR" || mode === "XLR")) {
    if (dad && dad.affected) {
      if (mode === "AR") step = p.label + "'s father " + dad.label + " is affected (aa), so " + p.label + " received an a allele from him.";
      else step = p.label + "'s father " + dad.label + " is affected (" + genotypeText(mode, "M", "a") + "). A daughter receives her father's only X chromosome, so " + p.label + " received the affected X from him.";
    } else if (mom && mom.affected) {
      if (mode === "AR") step = p.label + "'s mother " + mom.label + " is affected (aa), so " + p.label + " received an a allele from her.";
      else step = p.label + "'s mother " + mom.label + " is affected (" + genotypeText(mode, "F", "aa") + "), so every X chromosome she passes on carries the allele, and " + p.label + " received one of them.";
    }
  }
  if (!step && mode === "AD") {
    var up = (dad && !dad.affected) ? dad : (mom && !mom.affected) ? mom : null;
    var op = up === dad ? mom : dad;
    if (up) step = p.label + "'s " + (up.sex === "M" ? "father " : "mother ") + up.label + " is unaffected (aa), so the only allele " + up.label + " could pass on is a. " + p.label + " is affected, so the allele from " + (op ? op.label : "the other parent") + " must be A.";
  }
  if (!step && mode === "XLR") {
    for (i = 0; i < kids.length; i++) {
      var d = kids[i];
      if (d.sex !== "F") continue;
      var dset = Array.from(possible[d.id]);
      if (dset.length !== 1 || dset[0] !== "Aa") continue;
      var dk = pedKids(t, d), gc = null, j;
      for (j = 0; j < dk.length; j++) if (dk[j].affected) { gc = dk[j]; break; }
      var df = d.father != null ? byId[d.father] : null;
      if (gc && df && !df.affected) {
        step = "Her daughter " + d.label + " must be a carrier too: " + d.label + "'s " + (gc.sex === "M" ? "son " : "daughter ") + gc.label + " is affected, so " + d.label + " carries the affected X. But " + d.label + "'s father " + df.label + " is an unaffected male (" + genotypeText(mode, "M", "A") + "), so that X cannot have come from him. It came from " + d.label + "'s mother, " + p.label + ".";
        break;
      }
    }
  }
  if (!step) return null;
  return open + step + " So " + p.label + "'s genotype is forced: <b>" + gText + "</b>.";
}
function probBreakdown(mode, dadG, momG) {
  var kids = punnett(mode, dadG, momG), counts = {}, order = [];
  kids.forEach(function (k) {
    var key = MODES[mode].kind === "x" ? (k.sex + "|" + k.g) : k.g;
    if (!(key in counts)) { counts[key] = 0; order.push({ sex: k.sex, g: k.g }); }
    counts[key]++;
  });
  var per4 = kids.length / 4;
  if (MODES[mode].kind === "x") {
    var rank = { AA: 0, Aa: 1, aa: 2, A: 0, a: 1 };
    order.sort(function (a, b) {
      var sa = a.sex === "M" ? 0 : 1, sb = b.sex === "M" ? 0 : 1;
      return sa - sb || rank[a.g] - rank[b.g];
    });
  }
  var parts = order.map(function (o) {
    var n = counts[(MODES[mode].kind === "x" ? (o.sex + "|" + o.g) : o.g)] / per4;
    var num = String(Math.round(n));
    if (MODES[mode].kind === "x") {
      var who = o.sex === "M" ? (n === 1 ? "son" : "sons") : (n === 1 ? "daughter" : "daughters");
      var tag = phenotypeOf(mode, o.sex, o.g) ? ", affected" : (o.g === "Aa" ? (n === 1 ? ", a carrier" : ", carriers") : "");
      return num + " " + who + " " + genotypeText(mode, o.sex, o.g) + tag;
    }
    var tagA = phenotypeOf(mode, "M", o.g) ? ", affected" : (o.g === "Aa" ? (n === 1 ? ", an unaffected carrier" : ", unaffected carriers") : ", unaffected");
    return num + " " + o.g + tagA;
  });
  return "Out of every 4 children, the Punnett square gives " + joinLbl(parts) + ".";
}
function probabilitySolution(t, mode, pa) {
  var txt = "The pedigree forces both parents' genotypes: " + pa.dad.label + " is " + genotypeText(mode, "M", pa.dadG) + " and " + pa.mom.label + " is " + genotypeText(mode, "F", pa.momG) + ". ";
  var kids = t.people.filter(function (c) {
    return (c.father === pa.dad.id && c.mother === pa.mom.id) || (c.father === pa.mom.id && c.mother === pa.dad.id);
  });
  var aff = kids.filter(function (c) { return c.affected; });
  if (aff.length && mode === "AR" && pa.dadG === "Aa" && pa.momG === "Aa") {
    txt += "Their child " + aff[0].label + " is affected (aa), which is how the pedigree settles it: each parent must carry an a allele to have passed one on. ";
  } else if (aff.length && mode === "XLR" && pa.momG === "Aa") {
    var c0 = aff[0];
    if (c0.sex === "M") txt += "Their son " + c0.label + " is affected, which is how the pedigree settles " + pa.mom.label + "'s genotype: a son's X comes from his mother, so she must carry the affected X. ";
    else txt += "Their daughter " + c0.label + " is affected (" + genotypeText(mode, "F", "aa") + "), so she received an affected X from each parent. ";
  }
  txt += probBreakdown(mode, pa.dadG, pa.momG) + " ";
  txt += "The outcome asked for (" + pa.ask.text.replace(/^have /, "") + ") covers " + (pa.ask.pct / 25) + " of those 4, so the probability is <b>" + pa.ask.pct + "%</b>.";
  return txt;
}

function xlrSignature(t) {
  /* The textbook signature that separates X-linked recessive from
     autosomal recessive in practice (the two are not separable by
     pure logic: every X-linked recessive pedigree is also consistent
     with autosomal recessive inheritance). Required: at least two
     affected males, no father-to-son transmission, at least one
     affected male with an unaffected mother in the tree (the carrier
     path made visible), and no affected female whose father is in
     the tree and unaffected. The review book's own X-linked item
     (its question 49) is keyed on exactly this kind of evidence. */
  var byId = t.byId, affM = 0, carrierPath = false, i, p;
  for (i = 0; i < t.people.length; i++) {
    p = t.people[i];
    if (!p.affected) continue;
    if (p.sex === "M") {
      affM++;
      if (p.father != null && byId[p.father].affected) return false;
      if (p.mother != null && !byId[p.mother].affected) carrierPath = true;
    } else {
      if (p.father != null && !byId[p.father].affected) return false;
    }
  }
  return affM >= 2 && carrierPath;
}
function servable(t, mode) {
  var possible = consistentGenotypes(t.people, t.byId, mode);
  if (!possible) return null;
  var out = { possible: possible, genotypeTargets: [], probabilityCouples: [] };
  /* Mode servability: logically unique across the four candidate
     modes, or the X-linked recessive signature case (consistent with
     AR and XLR only, with the textbook X-linked signature present). */
  var modes = consistentModes(t);
  out.modeUnique = modes.length === 1;
  out.modeServable = out.modeUnique ||
    (mode === "XLR" && modes.length === 2 && modes.indexOf("AR") >= 0 &&
     modes.indexOf("XLR") >= 0 && xlrSignature(t));
  /* genotype targets: forced, and not simply read off the phenotype.
     Restricted to three-genotype domains (autosomal, or X-linked
     females) so the option set is AA / Aa / aa plus "cannot tell". */
  t.people.forEach(function (p) {
    if (MODES[mode].kind === "x" && p.sex === "M") return;
    var set = Array.from(possible[p.id]);
    if (set.length !== 1) return;
    var g = set[0];
    var trivial = (mode === "AD" && !p.affected) || (mode === "AR" && p.affected) ||
                  (mode === "XLR" && p.affected);
    if (!trivial) out.genotypeTargets.push({ person: p, genotype: g });
  });
  /* probability couples: both partners forced */
  t.couples.forEach(function (c) {
    var ga = Array.from(possible[c.a.id]), gb = Array.from(possible[c.b.id]);
    if (ga.length === 1 && gb.length === 1) {
      out.probabilityCouples.push({ a: c.a, b: c.b, ga: ga[0], gb: gb[0] });
    }
  });
  return out;
}
function probabilityAsk(mode, couple, rnd) {
  var dad = couple.a.sex === "M" ? couple.a : couple.b;
  var mom = couple.a.sex === "M" ? couple.b : couple.a;
  var dadG = couple.a.sex === "M" ? couple.ga : couple.gb;
  var momG = couple.a.sex === "M" ? couple.gb : couple.ga;
  var kids = punnett(mode, dadG, momG);
  function frac(pred) {
    var n = kids.filter(pred).length;
    return Math.round(100 * n / kids.length);
  }
  var asks = [];
  if (mode === "AR") {
    asks.push({ text: "have a child who is affected", pct: frac(function (k) { return phenotypeOf(mode, k.sex, k.g); }) });
    asks.push({ text: "have a child who is a carrier", pct: frac(function (k) { return k.g === "Aa"; }) });
  } else if (mode === "AD") {
    asks.push({ text: "have a child who is affected", pct: frac(function (k) { return phenotypeOf(mode, k.sex, k.g); }) });
  } else {
    asks.push({ text: "have a son who is affected", pct: frac(function (k) { return k.sex === "M" && phenotypeOf(mode, k.sex, k.g); }) });
    asks.push({ text: "have a daughter who is a carrier", pct: frac(function (k) { return k.sex === "F" && k.g === "Aa"; }) });
    asks.push({ text: "have a daughter who is affected", pct: frac(function (k) { return k.sex === "F" && phenotypeOf(mode, k.sex, k.g); }) });
  }
  var ask = asks[Math.floor(rnd() * asks.length)];
  return { dad: dad, mom: mom, dadG: dadG, momG: momG, ask: ask };
}
function snap(t) {
  return t.people.map(function (p) {
    return { id: p.id, sex: p.sex, gen: p.gen, father: p.father, mother: p.mother,
             affected: p.affected, genotype: p.genotype, label: p.label };
  });
}
function makePedigreeQuestion(rnd, wantType) {
  for (var attempt = 0; attempt < 600; attempt++) {
    var mode = MODE_KEYS[Math.floor(rnd() * MODE_KEYS.length)];
    var t = generateTree(mode, rnd);
    if (!treeQuality(t)) continue;
    var s = servable(t, mode);
    if (!s) continue;
    var type = wantType;
    if (type === "mode" && !s.modeServable) continue;
    if (type === "genotype" && !s.genotypeTargets.length) continue;
    if (type === "probability" && !s.probabilityCouples.length) continue;
    layout(t);
    if (type === "mode") {
      var others = ["AD", "AR", "XLR", "YL"].filter(function (m2) { return m2 !== mode; })
        .map(function (m2) { return m2 === "YL" ? "Y-linked" : MODES[m2].label; });
      var q = toMCQ("Which inheritance pattern is shown in the pedigree?", MODES[mode].label, others,
        modeClue(t, mode) + " The pattern is <b>" + MODES[mode].label.toLowerCase() + "</b>.",
        renderSVG(t, { mode: mode, carrierDots: false }));
      q.meta = { type: type, mode: mode, people: t.people.length, tree: snap(t) };
      return q;
    }
    if (type === "genotype") {
      var carriers = s.genotypeTargets.filter(function (x) { return x.genotype === "Aa"; });
      var pool = carriers.length ? carriers : s.genotypeTargets;
      var target = pool[Math.floor(rnd() * pool.length)];
      var gsol = genotypeSolution(t, mode, target, s.possible);
      if (!gsol) continue;
      var dom = genotypeDomain(mode, target.person.sex)
        .map(function (g) { return genotypeText(mode, target.person.sex, g); });
      var correct = genotypeText(mode, target.person.sex, target.genotype);
      var ds = dom.filter(function (x) { return x !== correct; });
      ds.push("Cannot be determined");
      var q2 = toMCQ("What is the genotype of individual " + target.person.label + "?",
        correct, ds,
        gsol,
        renderSVG(t, { mode: mode, carrierDots: false }));
      q2.meta = { type: type, mode: mode, people: t.people.length, target: target.person.label, genotype: target.genotype, tree: snap(t) };
      return q2;
    }
    /* probability */
    var couple = s.probabilityCouples[Math.floor(rnd() * s.probabilityCouples.length)];
    var pa = probabilityAsk(mode, couple, rnd);
    var pctSet = ["0%", "25%", "50%", "75%", "100%"];
    var correctP = pa.ask.pct + "%";
    var dsP = pctSet.filter(function (x) { return x !== correctP; });
    while (dsP.length > 3) dsP.splice(Math.floor(rnd() * dsP.length), 1);
    var dotsNote = mode === "XLR" ? " Females marked with a dot are carriers." : "";
    var q3 = toMCQ("Individuals " + pa.dad.label + " and " + pa.mom.label + " have children together. What is the probability that they will " + pa.ask.text + "?" + dotsNote,
      correctP, dsP,
      probabilitySolution(t, mode, pa),
      renderSVG(t, { mode: mode, carrierDots: mode === "XLR" }));
    q3.meta = { type: type, mode: mode, people: t.people.length, pct: pa.ask.pct, tree: snap(t) };
    return q3;
  }
  return null;
}

function toBank(q) {
  /* Convert the generator's raw question to the shell's shape: run
     it through mcq() (which dedupes and orders the options by the
     house rule) and attach the pedigree SVG as the figure. */
  var correct = q.options[q.correct];
  var ds = q.options.filter(function (o, i) { return i !== q.correct; });
  var out = mcq(q.prompt, correct, ds, q.solution, {});
  out.figure = q.figure;
  return out;
}

  return { make: makePedigreeQuestion, toBank: toBank, RNG: RNG,
    MODES: MODES, MODE_KEYS: MODE_KEYS,
    consistentGenotypes: consistentGenotypes, consistentModes: consistentModes,
    punnett: punnett, phenotypeOf: phenotypeOf,
    genotypeText: genotypeText, genotypeDomain: genotypeDomain };
})();

/* ---------- 6.4 Pedigrees and Genetic Disorders: generator ---------- */

E("bio-u2-64-gen-mode", 2, ["6.4"], 3, "gen", function () {
  var q = null;
  for (var k = 0; k < 30 && !q; k++) q = PED64.make(Math.random, "mode");
  return PED64.toBank(q);
}, ["Start with the parents of an affected child: if two unaffected parents have an affected child, the trait cannot be dominant. Then look at who shows the trait, males only or both sexes, and whether any affected father has an affected son."]);

E("bio-u2-64-gen-genotype", 2, ["6.4"], 3, "gen", function () {
  var q = null;
  for (var k = 0; k < 30 && !q; k++) q = PED64.make(Math.random, "genotype");
  return PED64.toBank(q);
}, ["First decide the inheritance pattern from the whole tree. Then look at the named individual's closest relatives: an affected child, or an affected parent, can reveal an allele the individual must carry even when their own shading does not show it."]);

E("bio-u2-64-gen-probability", 2, ["6.4"], 3, "gen", function () {
  var q = null;
  for (var k = 0; k < 30 && !q; k++) q = PED64.make(Math.random, "probability");
  return PED64.toBank(q);
}, ["Work out both parents' genotypes from the pedigree before building the Punnett square: a relative such as an affected child can force a parent to be a carrier. Then count the outcomes that match the question, keeping sons and daughters separate for an X-linked trait."]);


/* Final-scope cap flagging (Jason's ruling, Nov 12, 2026): this is
   the last Biology 3201 slice in the assembly order, so this pass
   covers every bank entry, including the generator slices. Every
   Unit 2 entry in the classical half (6.1 to 6.4, plus STSE 9.1
   and 9.2) is flagged preFinal; poolFor holds flagged entries out
   whenever the final scope is composed. bank-u2.js carries the
   same flagging for the fixed entries. */
BANK.forEach(function(e){if(e.unit===2&&e.indicators.some(function(c){return ["6.1","6.2","6.3","6.4","9.1","9.2"].indexOf(c)>=0;}))e.preFinal=true;});

/* ============ Constructed-response marks (generated) ============ */
/* Built by assemble-bank.py from the CRMARKS manifests at the top of
   each unit file. Exam Section B draws only from these entries. */
window.__BANK_CRMARKS={"bio-u1-cr-q01":4,"bio-u1-cr-q02":4,"bio-u1-cr-q03":3,"bio-u2-62-cr1":4,"bio-u2-64-cr2":4};
