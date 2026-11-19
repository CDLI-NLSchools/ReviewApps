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
// CRMARKS: s9-u4-cr-meiosis-explain=3
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

/* Added November 19, 2026: closes the Unit 4 Test 3 CR denomination
   gap in the test blueprint. The test's only CR entry was a single
   4-mark entry, which cannot make the 3-mark target; this 3-mark
   entry is attributed to SC9.10.5, which held no CR entry. See
   Junior-Science-Blueprint-Depth-Queue-2026-11-19.md. */
E("s9-u4-cr-meiosis-explain", 4, ["SC9.10.5"], 2, "var", varset([
  function () { return textq("A body cell of a dog contains 78 chromosomes. (a) How many chromosomes does a sperm cell from a male dog contain, and why? (b) Describe how meiosis produces cells with that number. (c) Explain why a puppy is not identical to either parent even though half its chromosomes come from each. (3 marks)",
    ["A sperm cell contains 39 chromosomes, half of 78, because meiosis halves the number so that fertilization restores the full number. In meiosis, the original cell divides twice to produce four cells, each carrying half the chromosomes, one from each pair. A puppy receives one set of 39 chromosomes from its father through the sperm and one set of 39 from its mother through the egg; this new combination of two parents' chromosomes makes it genetically different from either parent."],
    "<b>Model answer:</b> (a) A sperm cell contains 39 chromosomes. Gametes are produced by meiosis, which halves the chromosome number, so each sperm carries one chromosome from each of the 39 pairs in a body cell. (b) In meiosis, a cell with the full number of chromosomes divides twice in succession, producing four cells. Each of the four cells ends up with half the original number of chromosomes, 39, and each is a gamete. (c) At fertilization, the sperm's 39 chromosomes join the egg's 39, restoring 78 in the zygote. Because the puppy's chromosomes are a combination drawn from two different parents, the puppy is genetically different from both of them.<br><br><b>Marking points:</b> 1 mark for 39 chromosomes, tied to meiosis halving the number. 1 mark for two divisions producing four cells with half the number. 1 mark for the new combination of two parents' chromosomes at fertilization.", {}); },
  function () { return textq("A body cell of a horse contains 64 chromosomes. (a) How many chromosomes does an egg cell from a mare contain, and why? (b) Describe how meiosis produces cells with that number. (c) Explain why a foal is not identical to either parent even though half its chromosomes come from each. (3 marks)",
    ["An egg cell contains 32 chromosomes, half of 64, because meiosis halves the number so that fertilization restores the full number. In meiosis, the original cell divides twice to produce four cells, each carrying half the chromosomes, one from each pair. A foal receives one set of 32 chromosomes from its mother through the egg and one set of 32 from its father through the sperm; this new combination of two parents' chromosomes makes it genetically different from either parent."],
    "<b>Model answer:</b> (a) An egg cell contains 32 chromosomes. Gametes are produced by meiosis, which halves the chromosome number, so each egg carries one chromosome from each of the 32 pairs in a body cell. (b) In meiosis, a cell with the full number of chromosomes divides twice in succession, producing four cells. Each of the four cells ends up with half the original number of chromosomes, 32, and each is a gamete. (c) At fertilization, the egg's 32 chromosomes join the sperm's 32, restoring 64 in the zygote. Because the foal's chromosomes are a combination drawn from two different parents, the foal is genetically different from both of them.<br><br><b>Marking points:</b> 1 mark for 32 chromosomes, tied to meiosis halving the number. 1 mark for two divisions producing four cells with half the number. 1 mark for the new combination of two parents' chromosomes at fertilization.", {}); }
]), ["Halve the body-cell number for any gamete; fertilization puts the halves back together.", "Two divisions, four cells, half the chromosomes in each."]);

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
