// Math 8 Unit 7 Data Analysis and Probability question bank
// Cut verbatim from the standalone bank source
// (math-8-review/bank-src.js, lines 2952 to 3482).
// CRMARKS: u7-apparent-height-ratio=2
// CRMARKS: u7-apply-rule-percent=2
// CRMARKS: u7-fix-the-graph=2
// CRMARKS: u7-name-the-trick=3
// CRMARKS: u7-same-colour-twice=3
// CRMARKS: u7-two-draws-percent=3
// CRMARKS: u7-two-spinners-decimal=3
/* Unit 7: Data Analysis and Probability */
// Unit 7: Data Analysis and Probability (Math 8, NL). Entries only; helpers prefixed u7.

function u7gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a || 1; }
function u7red(n, d) { var g = u7gcd(n, d); return [n / g, d / g]; }
function u7frac(n, d) { var r = u7red(n, d); return "\\(" + FR(r[0], r[1]) + "\\)"; }

// Simple bar chart. If base > 0 the vertical axis is truncated, which is the
// deliberate flaw several critique entries ask about.
function u7bars(labels, vals, base, top) {
  var W = 320, H = 214, x0 = 48, yb = 176, yt = 30, ph = yb - yt;
  var n = vals.length, slot = (W - x0 - 10) / n, bw = Math.min(56, slot * 0.58);
  var out = '<svg viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar graph">';
  var ticks = [base, (base + top) / 2, top];
  for (var i = 0; i < ticks.length; i++) {
    var ty = yb - (ticks[i] - base) / (top - base) * ph;
    out += '<line x1="' + x0 + '" y1="' + fmt(ty, 1) + '" x2="' + (W - 6) + '" y2="' + fmt(ty, 1) + '" stroke="' + FIG_INK + '" stroke-width="0.7"/>';
    out += '<text x="' + (x0 - 5) + '" y="' + fmt(ty, 1) + '" font-size="11" fill="' + FIG_INK + '" text-anchor="end" dominant-baseline="central">' + fmt(ticks[i]) + '</text>';
  }
  out += '<line x1="' + x0 + '" y1="' + yt + '" x2="' + x0 + '" y2="' + yb + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  out += '<line x1="' + x0 + '" y1="' + yb + '" x2="' + (W - 6) + '" y2="' + yb + '" stroke="' + FIG_INK + '" stroke-width="2"/>';
  for (var j = 0; j < n; j++) {
    var bh = (vals[j] - base) / (top - base) * ph;
    var bx = x0 + slot * j + (slot - bw) / 2;
    out += '<rect x="' + fmt(bx, 1) + '" y="' + fmt(yb - bh, 1) + '" width="' + fmt(bw, 1) + '" height="' + fmt(bh, 1) + '" fill="' + FIG_SHADE + '" stroke="' + FIG_INK + '" stroke-width="1.6"/>';
    out += '<text x="' + fmt(bx + bw / 2, 1) + '" y="' + fmt(yb - bh - 10, 1) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + vals[j] + '</text>';
    out += '<text x="' + fmt(bx + bw / 2, 1) + '" y="' + (yb + 15) + '" font-size="12" fill="' + FIG_INK + '" text-anchor="middle">' + labels[j] + '</text>';
  }
  return out + '</svg>';
}

E("u7-same-data-two-graphs", 7, ["11.1"], 1, "var", varset([
  function(){
    return mcq("Sixty students chose a hot lunch. The same results are shown in a circle graph and in a bar graph. Which statement compares the two graphs correctly?",
      {t:"The circle graph shows each choice as a share of all 60 lunches, while the bar graph makes the exact count for each choice easier to compare", fb:"Right: a circle graph stresses shares of a whole, and a bar graph stresses exact values category by category."},
      [{t:"The circle graph shows the exact count for each choice, while the bar graph shows each choice as a share of the whole group of students", fb:"That is backwards: shares of a whole belong to the circle graph, and exact counts belong to the bar graph."},
       {t:"The bar graph shows how the choices changed over the whole school year, while the circle graph shows the count for each choice the students made", fb:"Neither graph shows change over time here; the data are one set of lunch choices, not a time series."},
       {t:"The circle graph compares the choices of two different classes in the school, while the bar graph shows only the total for one class on its own", fb:"Both graphs show the same 60 students; comparing two groups would need a double bar graph."}],
      "For the same data, each graph highlights different information: the circle graph shows <b>shares of the whole</b>, while the bar graph shows <b>exact counts that are easy to compare</b>.",
      {mode:"compare-lunch"});
  },
  function(){
    return mcq("The number of ferry crossings each month for a year is shown in a line graph and in a bar graph. Which statement compares the two graphs correctly?",
      {t:"The line graph shows the rise and fall pattern across the year clearly, while the bar graph makes it easier to read the count for one single month", fb:"Right: a line graph stresses the pattern over time, and separated bars stress individual monthly values."},
      [{t:"The line graph shows each month as a share of the whole year's crossings, while the bar graph shows the rise and fall pattern across the months of the year", fb:"Shares of a whole belong to a circle graph, and the pattern over time belongs to the line graph."},
       {t:"The bar graph connects the months to prove crossings caused the pattern, while the line graph hides every monthly count of crossings for the whole year", fb:"A line graph does not prove a cause, and its points still sit at the monthly counts."},
       {t:"The line graph compares two ferry routes side by side on the same map, while the bar graph shows only the busier of the two routes", fb:"Both graphs show the same single route; side by side comparison of two routes would need a double bar graph."}],
      "For the same data, the line graph highlights <b>the pattern of change over the year</b>, while the bar graph highlights <b>the value for each individual month</b>.",
      {mode:"compare-ferry"});
  },
  function(){
    return mcq("Club membership is shown in a double bar graph, with one bar for Grade 7 and one for Grade 8 in each club, and in a single bar graph of club totals. Which statement compares the two graphs correctly?",
      {t:"The double bar graph compares the two grades inside each club, while the single bar graph shows club totals but hides how each total splits by grade", fb:"Right: paired bars keep the grade split visible, and a single total bar loses that split."},
      [{t:"The single bar graph compares the two grades inside each club, while the double bar graph shows only club totals and hides how the grades split", fb:"That is backwards: the paired bars carry the grade comparison, and the single bars carry only totals."},
       {t:"The double bar graph shows each club as a share of all the members in both grades, while the single bar graph shows change over time in the clubs", fb:"Shares of a whole belong to a circle graph, and neither of these graphs shows change over time."},
       {t:"The single bar graph is misleading because its totals are invented numbers, while the double bar graph uses the real counts for both grades in the school", fb:"Both graphs use the same real counts; they simply highlight different comparisons."}],
      "For the same data, the double bar graph highlights <b>the Grade 7 and Grade 8 comparison inside each club</b>, while the single bar graph highlights <b>club totals only</b>.",
      {mode:"compare-clubs"});
  },
  function(){
    return mcq("Books borrowed in a week are shown in a pictograph, where one book symbol stands for 10 books, and in a bar graph. Which statement compares the two graphs correctly?",
      {t:"The pictograph catches the eye and gives a quick sense of size, while the bar graph gives exact values more easily when counts are not multiples of 10", fb:"Right: pictures are inviting but force part symbols, while a scaled bar axis reads exact values cleanly."},
      [{t:"The pictograph gives exact values more easily for every class in the school, while the bar graph can only show rough sizes for each of the classes", fb:"That is backwards: part symbols make pictograph values rough, and the bar axis gives the exact values."},
       {t:"The bar graph shows each class as a share of all the books borrowed in the week, while the pictograph shows how borrowing changed over the days of the week", fb:"Shares of a whole belong to a circle graph, and neither graph here is built to show change over time."},
       {t:"The pictograph compares two different weeks side by side in the library, while the bar graph shows only the slower of the two weeks", fb:"Both graphs show the same week; side by side comparison would need a double bar graph."}],
      "For the same data, the pictograph highlights <b>a quick, eye catching sense of size</b>, while the bar graph highlights <b>exact values</b>.",
      {mode:"compare-books"});
  }
]), ["Ask what each graph is built to stress: shares of a whole, exact values, change over time, or a comparison between groups.", "Match each graph type to its strength first, then check the statement against both halves."]);

E("u7-choose-graph-basic", 7, ["11.3"], 1, "var", varset([
  function(){
    return mcq("A class records the outdoor temperature every hour during one school day and wants to show how it changed. Which graph is the best choice?",
      {t:"Line graph, because the data show change over time", fb:"Right: points joined in time order make rises and falls easy to follow."},
      [{t:"Circle graph, because the data show change over time", fb:"A circle graph shows shares of a whole, not how a value moves from hour to hour."},
       {t:"Pictograph, because the data show change over time", fb:"A pictograph compares amounts with pictures; it does not trace change over time well."},
       {t:"Double bar graph, because the data show change over time", fb:"A double bar graph compares two groups; there is only one temperature record here."}],
      "Data collected over time are shown best with a <b>line graph</b>, because the joined points display the change directly.",
      {mode:"choose-temperature"});
  },
  function(){
    return mcq("A student wants to show how her 20 dollars of allowance is split among snacks, savings and games. Which graph is the best choice?",
      {t:"Circle graph, because the parts add up to one whole amount of money", fb:"Right: each slice is a share of the same 20 dollars, which is what a circle graph shows."},
      [{t:"Line graph, because the parts add up to one whole amount of money", fb:"A line graph shows change over time; nothing here changes over time."},
       {t:"Bar graph, because the parts add up to one whole amount of money", fb:"A bar graph compares separate amounts well, but shares of one whole are the circle graph strength."},
       {t:"Pictograph, because the parts add up to one whole amount of money", fb:"A pictograph compares counts with pictures; it does not show shares of a whole clearly."}],
      "When the parts make up one whole, a <b>circle graph</b> is the best choice, because each slice shows a share of the 20 dollars.",
      {mode:"choose-allowance"});
  },
  function(){
    return mcq("A teacher wants to compare how many students joined each of five different lunch clubs. Which graph is the best choice?",
      {t:"Bar graph, because separate categories are being compared by count", fb:"Right: one bar per club makes the counts easy to compare at a glance."},
      [{t:"Circle graph, because separate categories are being compared by count", fb:"A circle graph stresses shares of a whole; the teacher asked for a comparison of counts."},
       {t:"Line graph, because separate categories are being compared by count", fb:"A line graph shows change over time; club categories have no time order."},
       {t:"Double bar graph, because separate categories are being compared by count", fb:"A double bar graph needs two groups to compare; only one count per club is given."}],
      "Comparing counts across separate categories is the job of a <b>bar graph</b>, with one bar per club.",
      {mode:"choose-clubs"});
  },
  function(){
    return mcq("A coach wants to compare how many Grade 7 and Grade 8 students play each of four sports. Which graph is the best choice?",
      {t:"Double bar graph, because two groups are compared inside every category", fb:"Right: paired bars let the reader compare the grades sport by sport."},
      [{t:"Circle graph, because two groups are compared inside every category", fb:"A circle graph shows shares of one whole; it cannot hold two groups for each sport."},
       {t:"Line graph, because two groups are compared inside every category", fb:"A line graph shows change over time; sports categories have no time order."},
       {t:"Pictograph, because two groups are compared inside every category", fb:"A pictograph with two symbol sets gets confusing; paired bars keep the comparison clean."}],
      "Comparing two groups inside each category is the job of a <b>double bar graph</b>.",
      {mode:"choose-sports"});
  },
  function(){
    return mcq("A librarian makes a poster for young children showing how many picture books, comics and novels were borrowed, and wants the amounts shown with pictures. Which graph is the best choice?",
      {t:"Pictograph, because picture symbols make amounts friendly and quick to grasp", fb:"Right: symbols suit a young audience and give an instant sense of which amount is biggest."},
      [{t:"Line graph, because picture symbols make amounts friendly and quick to grasp", fb:"A line graph shows change over time; these are three separate categories."},
       {t:"Circle graph, because picture symbols make amounts friendly and quick to grasp", fb:"A circle graph shows shares of a whole with slices, not with picture symbols."},
       {t:"Double bar graph, because picture symbols make amounts friendly and quick to grasp", fb:"A double bar graph compares two groups; only one set of amounts is shown."}],
      "Amounts shown with picture symbols for a young audience call for a <b>pictograph</b>.",
      {mode:"choose-poster"});
  }
]), ["Decide what the data are doing first: changing over time, splitting a whole, comparing categories, or comparing two groups.", "Match that job to the graph built for it: line, circle, bar, double bar, or pictograph."]);

E("u7-product-rule-intro", 7, ["12.3"], 1, "gen", function () {
  var attempt = 0, cfg = null;
  while (attempt < 60 && !cfg) {
    attempt++;
    var useSpinner = ri(0, 1) === 1;
    var S = useSpinner ? pick([4, 6, 8, 10, 12]) : 2;
    var F = useSpinner ? ri(1, S - 1) : 1;
    var G = ri(1, 5);
    var nums = shuffle([1, 2, 3, 4, 5, 6]).slice(0, G).sort(function (a, b) { return a - b; });
    var p = u7red(F * G, S * 6), s1 = u7red(F, S), s2 = u7red(G, 6), ad = u7red(F * 6 + G * S, S * 6);
    var texts = [p.join("/"), s1.join("/"), s2.join("/"), ad.join("/")];
    if (new Set(texts).size === 4) cfg = { S: S, F: F, G: G, nums: nums, useSpinner: useSpinner, p: p };
  }
  if (!cfg) cfg = { S: 8, F: 3, G: 2, nums: [2, 4], useSpinner: true, p: u7red(6, 48) };
  var colour = pick(["red", "blue", "green", "gold", "purple", "orange"]);
  var side = pick(["heads", "tails"]);
  var ev1 = cfg.useSpinner
    ? "A spinner has " + cfg.S + " equal sections and " + cfg.F + " of them are " + colour + ". The spinner is spun and a fair die is rolled."
    : "A coin is tossed and a fair die is rolled.";
  var ev1name = cfg.useSpinner ? ("landing on " + colour) : side;
  var prompt = ev1 + " What is the probability of " + ev1name + " and rolling one of the numbers " + cfg.nums.join(", ") + "?";
  var f1 = cfg.useSpinner ? u7frac(cfg.F, cfg.S) : "\\(\\frac{1}{2}\\)";
  var sol = "For independent events, multiply the two probabilities: \\[ \\begin{aligned} P &= " + (cfg.useSpinner ? FR(cfg.F, cfg.S) : FR(1, 2)) + " \\times " + FR(cfg.G, 6) + " \\\\ &= " + FR(cfg.F * cfg.G, cfg.S * 6) + " \\\\ &= " + FR(cfg.p[0], cfg.p[1]) + " \\end{aligned} \\] So the probability is <b>\\(" + FR(cfg.p[0], cfg.p[1]) + "\\)</b>.";
  return mcq(prompt,
    { t: u7frac(cfg.p[0], cfg.p[1]), fb: "Right: the two events are independent, so their probabilities multiply and the result is reduced." },
    [{ t: u7frac(F2A(cfg), F2B(cfg)), fb: "That adds the two probabilities; independent events that must both happen use multiplication, not addition." },
     { t: f1, fb: "That is the probability of the first event only; the die roll must be included as well." },
     { t: u7frac(cfg.G, 6), fb: "That is the probability of the die event only; the first event must be included as well." }],
    sol, { mode: "product-intro", S: cfg.S, F: cfg.F, G: cfg.G });
  function F2A(c) { return u7red(c.F * 6 + c.G * c.S, c.S * 6)[0]; }
  function F2B(c) { return u7red(c.F * 6 + c.G * c.S, c.S * 6)[1]; }
}, ["Independent events do not affect each other, so the probability that both happen is a product.", "Find the probability of each event on its own first, then multiply the two fractions."]);

E("u7-advantages-disadvantages", 7, ["11.2"], 1, "var", varset([
  function(){
    return mcq("A manager needs the exact number of tickets sold in each of six seat sections, so she can compare sections precisely. Which statement gives an advantage and a disadvantage of using a circle graph for this data?",
      {t:"Advantage: it shows each section share of total sales at a glance. Disadvantage: exact counts are hard to read from slice sizes", fb:"Right: slices stress shares, but precise counts are exactly what slices show poorly."},
      [{t:"Advantage: it shows the exact count in each section clearly on the graph. Disadvantage: it cannot show shares of total sales at all", fb:"Both halves are reversed: slices are weak on exact counts and strong on shares."},
       {t:"Advantage: it shows how sales changed over the whole season of selling. Disadvantage: it uses too many colours for the six sections", fb:"A circle graph does not show change over time at all, so the stated advantage is false."},
       {t:"Advantage: it compares two different seasons side by side in one graph. Disadvantage: exact counts are hard to read from slice sizes", fb:"One circle graph holds one set of shares; comparing two seasons would need two graphs or paired bars."}],
      "A circle graph is strong on <b>shares of a whole</b> and weak on <b>exact values</b>, so it suits this ticket data poorly when precise counts matter.",
      {mode:"adv-circle"});
  },
  function(){
    return mcq("Classes record recycling counts of 37, 52 and 48 items for a pictograph where one symbol stands for 10 items. Which statement gives an advantage and a disadvantage of the pictograph here?",
      {t:"Advantage: the symbols are eye catching and easy for young students to grasp. Disadvantage: counts like 37 need part symbols, so exact values are hard to show", fb:"Right: pictures invite readers in, but values between multiples of 10 force awkward part symbols."},
      [{t:"Advantage: it gives exact values for every count in each of the classes. Disadvantage: the symbols are dull and hard for young students to grasp at first glance", fb:"Both halves are reversed: part symbols make values inexact, and symbols are the inviting part."},
       {t:"Advantage: it shows each class share of all the recycling in the school. Disadvantage: part symbols are needed whenever a count like 37 has to be shown", fb:"A pictograph compares amounts with symbols; shares of a whole are the circle graph job."},
       {t:"Advantage: the symbols are eye catching for every reader of the school poster. Disadvantage: it cannot be used at all when there are only three categories to show", fb:"Three categories are fine in a pictograph; the real weakness is part symbols for in-between counts."}],
      "A pictograph is strong on <b>visual appeal</b> and weak on <b>exact values that fall between symbol steps</b>.",
      {mode:"adv-pictograph"});
  },
  function(){
    return mcq("A student uses a line graph to display favourite ice cream flavours in a class: chocolate, vanilla, strawberry and mint. Which statement gives an advantage and a disadvantage of this choice?",
      {t:"Advantage: the points are quick to plot in order. Disadvantage: joining the points suggests a change from flavour to flavour that does not exist", fb:"Right: flavours have no time order, so the joined line invents a trend between unrelated categories."},
      [{t:"Advantage: it shows each flavour share of the whole class clearly. Disadvantage: joining the points suggests a change that does not really exist", fb:"Shares of a whole are shown by a circle graph, not by points on a line graph."},
       {t:"Advantage: the points are quick to plot in order along the axis. Disadvantage: a line graph can never be drawn for category data of any kind at all", fb:"A line graph can be drawn, but it is a poor choice here because the line suggests a false trend."},
       {t:"Advantage: it compares two classes flavour by flavour in the survey. Disadvantage: the axis needs a scale for the counts in each class as well", fb:"Only one class is shown, so there is no two-group comparison in this graph."}],
      "A line graph is built for <b>change over time</b>; using it on unrelated categories creates a <b>false suggestion of a trend</b>.",
      {mode:"adv-line"});
  },
  function(){
    return mcq("A librarian uses a double bar graph to compare book loans this year and last year across eight genres. Which statement gives an advantage and a disadvantage of this choice?",
      {t:"Advantage: the two years sit side by side inside each genre, so changes are easy to spot. Disadvantage: with eight genres the graph gets crowded and harder to read", fb:"Right: paired bars excel at two-group comparisons, and many categories make the pairs cluttered."},
      [{t:"Advantage: it shows each genre share of all the loans in the library. Disadvantage: with eight genres the graph gets crowded and much harder to read", fb:"Paired bars compare counts; shares of a whole are the circle graph job."},
       {t:"Advantage: the two years sit side by side in each genre on the graph. Disadvantage: a double bar graph cannot show counts, only shares of the whole, never the actual counts", fb:"Paired bars show counts on a scale like any bar graph; the disadvantage given here is false."},
       {t:"Advantage: it traces loans continuously across the two years of records. Disadvantage: genres have no time order, so nothing can be traced across the years", fb:"Bars do not trace anything continuously; the side by side comparison is the advantage."}],
      "A double bar graph is strong on <b>comparing two groups inside each category</b> and weak when <b>many categories make it crowded</b>.",
      {mode:"adv-doublebar"});
  },
  function(){
    return mcq("A weather club uses a bar graph to display monthly rainfall over three full years, hoping readers will see the long term pattern. Which statement gives an advantage and a disadvantage of this choice?",
      {t:"Advantage: each month total can be read exactly from the scale. Disadvantage: 36 separate bars make the overall pattern harder to follow than a line would", fb:"Right: bars give exact monthly values, but a long run of bars hides the flow of the pattern."},
      [{t:"Advantage: the bars connect into a smooth trend across the three years. Disadvantage: monthly totals cannot be read from the scale of the graph at all", fb:"Both halves are wrong: bars stay separate, and their totals read off the scale directly."},
       {t:"Advantage: each month share of the yearly rain is clear on the graph. Disadvantage: 36 separate bars make the overall pattern hard to follow at a glance", fb:"Shares of a whole belong to a circle graph; these bars show monthly amounts."},
       {t:"Advantage: each month total reads exactly from the scale on the axis. Disadvantage: bar graphs are not allowed to show more than one year of data on one graph", fb:"Bar graphs may show any number of months; the real weakness is pattern reading over a long run."}],
      "A bar graph is strong on <b>exact values</b> and weak on <b>showing a pattern across a long time run</b>, where a line graph works better.",
      {mode:"adv-bar-rain"});
  }
]), ["Judge the graph against the job: what must the reader do with this data, exactly compare, see shares, or follow a pattern?", "Check both halves of each statement; a correct answer needs a true advantage and a true disadvantage."]);

E("u7-misleading-format", 7, ["11.4"], 1, "var", varset([
  function(){
    var q = mcq("An arena poster uses this bar graph to claim the South rink is far busier than the North rink. Which feature of the graph format may lead readers to misinterpret the data?",
      {t:"The vertical axis starts at 80 instead of 0, so a small difference in attendance looks large", fb:"Right: both bars are measured from 80, so the visible heights exaggerate the gap between 92 and 96."},
      [{t:"The two bars have different widths, so the wider bar looks more important than the other bar", fb:"The bars have the same width; the distortion comes from where the axis starts."},
       {t:"The categories are listed in the wrong order on the axis, so the smaller value comes first in the graph", fb:"Category order does not distort size here; the axis starting at 80 does."},
       {t:"The graph has no title at the top, so readers cannot tell what is being measured in the graph", fb:"A title would help, but the values still read clearly; the misleading feature is the axis starting at 80."}],
      "When a vertical axis starts above zero, bar heights no longer match the values. Starting at <b>80</b> makes 96 look far bigger than 92, which is the misleading feature.",
      {mode:"mislead-truncated"});
    q.figure = u7bars(["North", "South"], [92, 96], 80, 100);
    return q;
  },
  function(){
    return mcq("A line graph of daily bus riders marks its vertical axis 0, 10, 15, then 40 riders. Which feature of the graph format may lead readers to misinterpret the data?",
      {t:"The intervals on the vertical axis are uneven, so equal steps on the page stand for different amounts", fb:"Right: jumps of 10, 5 and 25 in one axis stretch some changes and squeeze others."},
      [{t:"The line is drawn in a very dark colour, so readers notice the highest point on the line first", fb:"Line colour does not change the values; the uneven spacing of the scale does."},
       {t:"The graph plots days along the bottom axis, so the weekends look less important than the weekdays", fb:"Plotting days in order is normal for change over time; the scale spacing is the problem."},
       {t:"The highest point is labelled with its value, so readers may think it is the average for the week", fb:"Labelling a point does not distort the scale; uneven intervals do."}],
      "A scale must use equal steps. <b>Uneven intervals</b> on the axis stretch and squeeze changes, so the picture misrepresents the data.",
      {mode:"mislead-intervals"});
  },
  function(){
    return mcq("A charity draws its spending shares as a 3-D circle graph, with the front slices tilted toward the reader. Which feature of the graph format may lead readers to misinterpret the data?",
      {t:"The 3-D effect makes the front slices look bigger than slices of the same share at the back", fb:"Right: tilting and depth add area that has nothing to do with the share each slice represents."},
      [{t:"The slices are arranged from largest to smallest, so the first slice gets the most attention", fb:"Ordering slices is a normal choice and does not change their relative sizes."},
       {t:"The graph uses percents instead of dollar amounts, so the total amount of spending is hidden", fb:"Percents are a fair way to show shares; the visual distortion comes from the 3-D tilt."},
       {t:"The charity name is printed above the graph, so readers trust the slices too quickly at first", fb:"Trust in the source is not a format distortion; the 3-D effect changes how big slices look."}],
      "In a circle graph, slice area must match share. A <b>3-D effect</b> adds fake area to the front slices, so readers misjudge the shares.",
      {mode:"mislead-3d"});
  },
  function(){
    return mcq("In a pictograph of pets owned, the symbol for dogs is drawn twice as tall and twice as wide as the symbol for cats, and one symbol stands for 10 pets in both rows. Which feature may lead readers to misinterpret the data?",
      {t:"The dog symbols cover about four times the area, so dogs look far more numerous than the counts say", fb:"Right: doubling height and width multiplies area by four, even though one symbol still means 10 pets."},
      [{t:"The rows are stacked vertically on the page, so the top row of symbols is read first by everyone", fb:"Reading order does not change the amounts; symbol area does the distorting here."},
       {t:"One symbol stands for 10 pets in each row, so small counts of pets need part symbols to be shown", fb:"Part symbols are a real pictograph weakness, but the distortion here is the unequal symbol size."},
       {t:"The graph lists dogs before cats in its rows, so readers favour the first category they come to", fb:"Category order does not inflate a count; the oversized symbols do."}],
      "Pictograph symbols must all be the same size. Making one symbol <b>larger in both directions</b> multiplies its area and misrepresents the count.",
      {mode:"mislead-symbols"});
  },
  function(){
    var q = mcq("A school poster uses this bar graph to suggest the bake sale grew much faster than the book fair. Which feature of the graph format may lead readers to misinterpret the data?",
      {t:"The vertical axis starts at 40 instead of 0, so the gap between the two totals looks much bigger than it is", fb:"Right: measured from 40, the visible bar heights are 14 and 22, a much bigger ratio than 54 to 62."},
      [{t:"The book fair bar is shaded in a darker colour, so readers think it earned more money than the other events shown", fb:"Both bars use the same shading; the distortion comes from the axis starting at 40."},
       {t:"The totals are written above each of the bars, so readers skip the axis entirely when they read it", fb:"Value labels actually help accuracy; the misleading feature is the truncated axis."},
       {t:"Only two events are shown on the whole poster, so readers cannot compare them fairly with each other", fb:"Two categories compare fairly on a proper axis; starting the axis at 40 is the distortion."}],
      "Bar heights must be measured from zero to match values. An axis starting at <b>40</b> exaggerates the difference between 54 and 62.",
      {mode:"mislead-truncated2"});
    q.figure = u7bars(["Bake sale", "Book fair"], [54, 62], 40, 70);
    return q;
  }
]), ["Look at how the picture is built: where the axis starts, how its steps are spaced, and whether size effects add area.", "Compare the visual size of the bars or slices with the numbers they stand for; a mismatch names the flaw."]);

E("u7-name-the-trick", 7, ["11.5"], 1, "var", varset([
  function(){
    return textq("A bar graph shows quiz averages of 48, 52 and 55 for three classes. Its vertical axis starts at 40, so the bar for 55 towers over the bar for 48. Name the formatting choice that misrepresents the data.",
      ["truncated axis", "truncated vertical axis", "axis truncated", "vertical axis does not start at zero", "axis does not start at zero", "axis starts at 40", "axis starts above zero", "broken axis", "not starting at zero", "starting the axis at 40", "axis does not start at 0", "axis starts at a nonzero value"],
      "The bars are measured from 40 instead of from zero, so their heights no longer match the averages. The formatting choice is a <b>truncated axis (an axis that does not start at zero)</b>.",
      {mode:"trick-axis"});
  },
  function(){
    return textq("A line graph of evening temperatures marks its vertical axis 0, 5, 20 and 45 degrees, so a small rise looks steep. Name the formatting choice that misrepresents the data.",
      ["uneven intervals", "unequal intervals", "inconsistent intervals", "uneven scale", "unequal scale", "inconsistent scale", "intervals are uneven", "the scale is uneven", "uneven axis intervals", "non-uniform scale", "nonuniform scale"],
      "Equal steps on the page stand for jumps of 5, 15 and 25 degrees, so changes are stretched unevenly. The formatting choice is <b>uneven intervals</b> on the axis.",
      {mode:"trick-intervals"});
  },
  function(){
    return textq("A town draws its budget shares as a 3-D circle graph. The front slice, for parks, looks much larger than a back slice with the same share. Name the formatting choice that misrepresents the data.",
      ["3-d effect", "3d effect", "three-dimensional effect", "three dimensional effect", "3-d pie chart", "3d pie chart", "using 3-d", "using 3d", "3-d graph", "3d graph"],
      "Tilting the graph adds depth and area to the front slices that has nothing to do with their shares. The formatting choice is the <b>3-D effect</b>.",
      {mode:"trick-3d"});
  },
  function(){
    return textq("A pictograph shows lunches sold, with one symbol standing for 10 lunches in every row. The symbols in the pizza row are drawn twice as tall and twice as wide as the symbols in the soup row. Name the formatting choice that misrepresents the data.",
      ["different sized symbols", "different symbol sizes", "symbols different sizes", "unequal symbol sizes", "icons different sizes", "different sized icons", "picture sizes", "unequal picture sizes", "different sized pictures", "symbols are different sizes", "visual representation", "larger symbols"],
      "Each symbol still means 10 lunches, but the pizza symbols cover about four times the area. The formatting choice is <b>using symbols of different sizes</b>.",
      {mode:"trick-symbols"});
  },
  function(){
    return textq("A gym advertises with a line graph of new members that shows only the three busiest months of the year, when membership spiked, and leaves out the other nine months. Name the formatting choice that misrepresents the data.",
      ["cherry-picked data", "cherry picked data", "cherry-picking", "cherry picking", "only showing part of the data", "showing only part of the data", "selective data", "selecting only the best months", "omitting data", "leaving out data", "only showing the best months", "partial data", "showing a selected range"],
      "The graph hides the nine quieter months, so the spike looks like the whole story. The formatting choice is <b>cherry-picked data (showing only a selected part of the data)</b>.",
      {mode:"trick-cherry"});
  }
]), ["Name the built-in feature doing the damage: axis start, axis spacing, depth effects, symbol size, or missing data.", "Describe the feature in plain words; a short name for the feature is enough."]);

E("u7-false-conclusion", 7, ["11.6"], 2, "var", varset([
  function(){
    return mcq("Library loans were: Monday 120, Tuesday 135, Wednesday 128, Thursday 150, Friday 142. Which conclusion goes against this data?",
      {t:"Loans rose every single day of the week", fb:"Right: loans fell from Tuesday 135 to Wednesday 128, so they did not rise every day."},
      [{t:"Thursday had the most loans of the week", fb:"That matches the data: 150 on Thursday is the largest value listed."},
       {t:"Friday loans were higher than Monday loans", fb:"That matches the data: 142 on Friday is greater than 120 on Monday."},
       {t:"Wednesday loans were lower than Tuesday loans", fb:"That matches the data: 128 is less than 135, so this conclusion is consistent."}],
      "Check each claim against every value. Loans dipped on Wednesday, so the conclusion that goes against the data is <b>loans rose every single day</b>.",
      {mode:"false-loans"});
  },
  function(){
    return mcq("A circle graph shows how students get to school: bus 40%, walk 35%, car 25%. Which conclusion goes against this data?",
      {t:"Most students travel to school by bus", fb:"Right: 40% is the largest share, but most means more than half, and 40% is under half."},
      [{t:"More students ride the bus than walk", fb:"That matches the data: 40% is greater than 35%."},
       {t:"Walking and car rides together account for 60% of students", fb:"That matches the data: 35% plus 25% equals 60%."},
       {t:"The car is the least common way listed to get to school", fb:"That matches the data: 25% is the smallest share listed."}],
      "The bus share is the largest but it is not a majority. The conclusion that goes against the data is <b>most students travel by bus</b>, because 40% is less than half.",
      {mode:"false-bus"});
  },
  function(){
    return mcq("Rainfall at a weather station was 30 mm in April, 22 mm in May and 18 mm in June. Which conclusion goes against this data?",
      {t:"Rainfall increased steadily through the spring", fb:"Right: the values fall from 30 to 22 to 18, so rainfall decreased, not increased."},
      [{t:"April was the wettest of the three months", fb:"That matches the data: 30 mm in April is the largest value."},
       {t:"June rainfall was 12 mm less than April rainfall", fb:"That matches the data: 30 minus 18 equals 12."},
       {t:"Total rainfall over the three months was 70 mm", fb:"That matches the data: 30 plus 22 plus 18 equals 70."}],
      "The amounts drop month by month. The conclusion that goes against the data is <b>rainfall increased steadily</b>.",
      {mode:"false-rain"});
  },
  function(){
    return mcq("A double bar graph shows club members: chess has 18 Grade 7 and 12 Grade 8 students; robotics has 10 Grade 7 and 16 Grade 8 students. Which conclusion goes against this data?",
      {t:"Grade 8 has more members than Grade 7 in both clubs", fb:"Right: in chess, Grade 8 has 12, which is fewer than Grade 7 with 18, so the claim fails for chess."},
      [{t:"Chess has more Grade 7 members than robotics has Grade 7 members", fb:"That matches the data: 18 is greater than 10."},
       {t:"Robotics has more Grade 8 members than chess has Grade 8 members", fb:"That matches the data: 16 is greater than 12."},
       {t:"The two clubs have 56 members in total between them", fb:"That matches the data: 18 plus 12 plus 10 plus 16 equals 56."}],
      "A claim about both clubs must hold in each club. Chess breaks it, so the conclusion that goes against the data is <b>Grade 8 has more members in both clubs</b>.",
      {mode:"false-clubs"});
  },
  function(){
    return mcq("Four students report practice time and quiz score: Ana practised 3 hours and scored 70, Ben practised 1 hour and scored 78, Cora practised 2 hours and scored 74, Dan practised 4 hours and scored 82. Which conclusion goes against this data?",
      {t:"More practice always gives a higher score", fb:"Right: Ben practised the least yet outscored Ana and Cora, so more practice did not always mean a higher score here."},
      [{t:"Dan practised the most and earned the highest score", fb:"That matches the data: 4 hours and 82 are both the largest values."},
       {t:"Ben scored higher than Ana even though he practised less", fb:"That matches the data directly: 78 beats 70 with 1 hour against 3 hours."},
       {t:"The four scores range from 70 to 82", fb:"That matches the data: the lowest score is 70 and the highest is 82."}],
      "One counterexample breaks an always claim. Ben practised least and still beat two classmates, so the conclusion that goes against the data is <b>more practice always gives a higher score</b>.",
      {mode:"false-practice"});
  }
]), ["Test each conclusion against every number given, not just the first ones you notice.", "Watch for strong words like most, always and every; they need more than half, or every case, to hold."]);

E("u7-fix-the-graph", 7, ["11.4"], 1, "var", varset([
  function(){
    return textq("A bar graph of team points starts its vertical axis at 60, making one team look far ahead of the others. What single change would make the graph represent the data fairly? Answer in a short phrase.",
      ["start the axis at zero", "start the vertical axis at zero", "start the axis at 0", "begin the axis at zero", "start at zero", "start the axis from zero", "use an axis starting at zero", "start axis at zero", "make the axis start at zero", "start the scale at zero"],
      "Bar heights only match values when measured from zero. The fix is to <b>start the axis at zero</b>.",
      {mode:"fix-axis"});
  },
  function(){
    return textq("A line graph of ticket sales uses axis steps of 0, 10, 15 and 40, so one small jump looks huge. What single change would make the graph represent the data fairly? Answer in a short phrase.",
      ["use equal intervals", "use even intervals", "use consistent intervals", "make the intervals equal", "use the same interval size", "equal intervals", "use equal steps", "make the scale even", "use a consistent scale", "space the intervals evenly"],
      "Every step on an axis must stand for the same amount. The fix is to <b>use equal intervals</b>.",
      {mode:"fix-intervals"});
  },
  function(){
    return textq("A 3-D circle graph makes the front slice of a budget look larger than an equal slice at the back. What single change would make the graph represent the data fairly? Answer in a short phrase.",
      ["use a flat graph", "use a flat circle graph", "use a flat pie chart", "use a 2-d graph", "use a 2d graph", "use a two-dimensional graph", "remove the 3-d effect", "remove the 3d effect", "draw it flat", "use 2-d", "use 2d", "make it flat", "use a flat chart"],
      "Depth adds area that does not belong to any share. The fix is to <b>use a flat (2-D) circle graph</b>.",
      {mode:"fix-3d"});
  },
  function(){
    return textq("A sales graph shows only the three holiday months, when sales spiked, and hides the rest of the year. What single change would make the graph represent the data fairly? Answer in a short phrase.",
      ["show all the data", "show all months", "include all months", "show the whole year", "show the full year", "use the full data set", "show all of the data", "include all the data", "show the complete data", "show every month"],
      "A selected slice of the year tells only the spiking part of the story. The fix is to <b>show all the data (the whole year)</b>.",
      {mode:"fix-range"});
  }
]), ["Think of the one repair that removes the distortion you can see in the description.", "State the repair as a short action phrase, such as what the axis or the data range should become."]);

E("u7-context-for-probability", 7, ["12.2"], 2, "var", varset([
  function(){
    return mcq("Which context gives a probability of \\(\\frac{1}{12}\\)?",
      {t:"Toss a coin and roll a die; getting heads and a 6", fb:"Right: \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\), so this context matches the value."},
      [{t:"Roll two dice; getting a 6 on both dice", fb:"That gives \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}\\), not the stated value."},
       {t:"Toss two coins; getting heads on both coins", fb:"That gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), not the stated value."},
       {t:"Spin a 4-section spinner and toss a coin; landing on red, 1 of the 4 sections, and heads", fb:"That gives \\(\\frac{1}{4} \\times \\frac{1}{2} = \\frac{1}{8}\\), not the stated value."}],
      "Multiply in each context and compare. Only heads and a 6 gives \\(\\frac{1}{2} \\times \\frac{1}{6} = \\frac{1}{12}\\), so the matching context is <b>tossing a coin and rolling a die, getting heads and a 6</b>.",
      {mode:"context-12th"});
  },
  function(){
    return mcq("Which context gives a probability of \\(\\frac{1}{4}\\)?",
      {t:"Toss two coins; getting tails on both coins", fb:"Right: \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), so this context matches the value."},
      [{t:"Spin an 8-section spinner and toss a coin; landing on blue, 2 of the 8 sections, and heads", fb:"That gives \\(\\frac{2}{8} \\times \\frac{1}{2} = \\frac{1}{8}\\), not the stated value."},
       {t:"Roll a die and toss a coin; rolling a number less than 5 and getting heads", fb:"That gives \\(\\frac{4}{6} \\times \\frac{1}{2} = \\frac{1}{3}\\), not the stated value."},
       {t:"Draw a card from 4 equal letter cards twice with replacement; getting the letter A both times", fb:"That gives \\(\\frac{1}{4} \\times \\frac{1}{4} = \\frac{1}{16}\\), not the stated value."}],
      "Multiply in each context and compare. Only two tails gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), so the matching context is <b>tossing two coins and getting tails on both</b>.",
      {mode:"context-quarter"});
  },
  function(){
    return mcq("Which context gives a probability of \\(\\frac{3}{20}\\)?",
      {t:"Spin a 10-section spinner and toss a coin; landing on red, 3 of the 10 sections, and heads", fb:"Right: \\(\\frac{3}{10} \\times \\frac{1}{2} = \\frac{3}{20}\\), so this context matches the value."},
      [{t:"Spin a 5-section spinner and toss a coin; landing on red, 3 of the 5 sections, and heads", fb:"That gives \\(\\frac{3}{5} \\times \\frac{1}{2} = \\frac{3}{10}\\), not the stated value."},
       {t:"Spin a 10-section spinner and roll a die; landing on red, 3 of the 10 sections, and rolling a 6", fb:"That gives \\(\\frac{3}{10} \\times \\frac{1}{6} = \\frac{1}{20}\\), not the stated value."},
       {t:"Toss two coins; getting heads on both coins", fb:"That gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), not the stated value."}],
      "Multiply in each context and compare. Only red on the 10-section spinner with heads gives \\(\\frac{3}{10} \\times \\frac{1}{2} = \\frac{3}{20}\\), so that is the matching context.",
      {mode:"context-320"});
  },
  function(){
    return mcq("Which context gives a probability of \\(\\frac{1}{9}\\)?",
      {t:"Spin a 3-section spinner twice; landing on the star section both times", fb:"Right: \\(\\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{9}\\), so this context matches the value."},
      [{t:"Spin a 3-section spinner and toss a coin; landing on the star section and heads", fb:"That gives \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), not the stated value."},
       {t:"Spin a 6-section spinner twice; landing on red, 1 of the 6 sections, both times", fb:"That gives \\(\\frac{1}{6} \\times \\frac{1}{6} = \\frac{1}{36}\\), not the stated value."},
       {t:"Toss two coins; getting heads on both coins", fb:"That gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), not the stated value."}],
      "Multiply in each context and compare. Only the star section twice gives \\(\\frac{1}{3} \\times \\frac{1}{3} = \\frac{1}{9}\\), so that is the matching context.",
      {mode:"context-ninth"});
  },
  function(){
    return mcq("Which context gives a probability of \\(\\frac{1}{6}\\)?",
      {t:"Spin a 3-section spinner and toss a coin; landing on blue, 1 of the 3 sections, and tails", fb:"Right: \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), so this context matches the value."},
      [{t:"Toss two coins; getting heads on both coins", fb:"That gives \\(\\frac{1}{2} \\times \\frac{1}{2} = \\frac{1}{4}\\), not the stated value."},
       {t:"Spin a 4-section spinner and toss a coin; landing on blue, 1 of the 4 sections, and tails", fb:"That gives \\(\\frac{1}{4} \\times \\frac{1}{2} = \\frac{1}{8}\\), not the stated value."},
       {t:"Roll a die and spin a 4-section spinner; rolling a 6 and landing on blue, 1 of the 4 sections", fb:"That gives \\(\\frac{1}{6} \\times \\frac{1}{4} = \\frac{1}{24}\\), not the stated value."}],
      "Multiply in each context and compare. Only blue on the 3-section spinner with tails gives \\(\\frac{1}{3} \\times \\frac{1}{2} = \\frac{1}{6}\\), so that is the matching context.",
      {mode:"context-sixth"});
  }
]), ["Work out the probability inside each context; exactly one context will match the stated value.", "For two independent events, multiply the two single probabilities before comparing."]);

E("u7-two-draws-percent", 7, ["12.1"], 1, "gen", function () {
  var triples = [["red", "blue", "green"], ["red", "yellow", "blue"], ["white", "black", "orange"], ["purple", "green", "yellow"], ["blue", "orange", "pink"]];
  var pair = null;
  for (var t = 0; t < 60 && !pair; t++) {
    var ca = ri(2, 5), cb = ri(2, 5);
    if (ca + cb <= 9) pair = [ca, cb];
  }
  if (!pair) pair = [3, 3];
  var cols = pick(triples).slice();
  var item = pick(["marbles", "counters", "beads", "tiles"]);
  var ans = pair[0] * pair[1];
  var third = 10 - pair[0] - pair[1];
  var prompt = "A bag holds " + pair[0] + " " + cols[0] + ", " + pair[1] + " " + cols[1] + " and " + third + " " + cols[2] + " " + item + ". One is drawn, replaced, and another is drawn. What is the probability of drawing " + cols[0] + " first and then " + cols[1] + "? Give your answer as a percent.";
  var sol = "Multiply for independent events, then check by counting outcomes: \\[ \\begin{aligned} P &= " + FR(pair[0], 10) + " \\times " + FR(pair[1], 10) + " \\\\ &= " + FR(ans, 100) + " \\\\ &= " + ans + "\\% \\end{aligned} \\] Counting check: there are \\(10 \\times 10 = 100\\) equally likely ordered pairs, and \\(" + pair[0] + " \\times " + pair[1] + " = " + ans + "\\) of them match, which agrees. So the probability is <b>" + ans + "%</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "two-draws", a: pair[0], b: pair[1] });
}, ["Replacement keeps the bag the same for the second draw, so the two draws are independent.", "Write each draw as a fraction out of 10, multiply, then convert to a percent."]);

E("u7-two-spinners-decimal", 7, ["12.4"], 1, "gen", function () {
  var S1 = pick([4, 5, 10, 20]), S2 = pick([4, 5, 10, 20]);
  var F1 = ri(1, S1 - 1), F2 = ri(1, S2 - 1);
  var c1 = pick(["red", "blue", "green", "gold"]), c2 = pick(["purple", "orange", "white", "black"]);
  if (c2 === c1) c2 = "purple";
  var num = F1 * F2, den = S1 * S2, ans = num / den;
  var prompt = "At a school fair game, one spinner has " + S1 + " equal sections with " + F1 + " coloured " + c1 + ", and a second spinner has " + S2 + " equal sections with " + F2 + " coloured " + c2 + ". Both spinners are spun. What is the probability of landing on " + c1 + " on the first spinner and " + c2 + " on the second? Give your answer as a decimal.";
  var sol = "The spins are independent, so multiply: \\[ \\begin{aligned} P &= " + FR(F1, S1) + " \\times " + FR(F2, S2) + " \\\\ &= " + FR(num, den) + " \\\\ &= " + fmt(ans, 4) + " \\end{aligned} \\] So the probability is <b>" + fmt(ans, 4) + "</b>.";
  return numq(prompt, ans, 0.0001, sol, { mode: "two-spinners", S1: S1, F1: F1, S2: S2, F2: F2 });
}, ["Two spins do not affect each other, so this is a product of two single probabilities.", "Write the probability for each spinner first, then multiply and convert to a decimal."]);

E("u7-apply-rule-percent", 7, ["12.3"], 1, "gen", function () {
  var S = pick([4, 5, 8, 10]);
  var F = ri(1, S - 1);
  var colour = pick(["red", "blue", "green", "gold", "purple", "orange"]);
  var side = pick(["heads", "tails"]);
  var ans = F / S * 50;
  var prompt = "A coin is tossed and a spinner with " + S + " equal sections, " + F + " of them " + colour + ", is spun. Using the rule for independent events, what is the probability of getting " + side + " and landing on " + colour + "? Give your answer as a percent.";
  var r = u7red(F, S * 2);
  var sol = "Apply the multiplication rule for independent events: \\[ \\begin{aligned} P &= " + FR(1, 2) + " \\times " + FR(F, S) + " \\\\ &= " + FR(r[0], r[1]) + " \\\\ &= " + fmt(ans) + "\\% \\end{aligned} \\] So the probability is <b>" + fmt(ans) + "%</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "apply-rule", S: S, F: F });
}, ["The rule for independent events says multiply the separate probabilities.", "The coin contributes one half; multiply it by the spinner fraction and convert to a percent."]);

E("u7-same-colour-twice", 7, ["12.4", "12.1"], 3, "gen", function () {
  var triples = [["red", "blue", "green"], ["red", "yellow", "blue"], ["white", "black", "orange"], ["purple", "green", "yellow"], ["blue", "orange", "pink"]];
  var counts = null;
  for (var t = 0; t < 80 && !counts; t++) {
    var a = ri(1, 8), b = ri(1, 9 - a);
    var c = 10 - a - b;
    if (c >= 1) counts = [a, b, c];
  }
  if (!counts) counts = [4, 3, 3];
  var cols = pick(triples).slice();
  var item = pick(["marbles", "counters", "beads"]);
  var ans = counts[0] * counts[0] + counts[1] * counts[1] + counts[2] * counts[2];
  var prompt = "A bag holds " + counts[0] + " " + cols[0] + ", " + counts[1] + " " + cols[1] + " and " + counts[2] + " " + cols[2] + " " + item + ". One is drawn, replaced, and another is drawn. What is the probability that the two drawn " + item + " are the same colour as each other? Give your answer as a percent.";
  var sol = "Same colour can happen three ways, and the draws are independent: \\[ \\begin{aligned} P &= " + FR(counts[0], 10) + " \\times " + FR(counts[0], 10) + " + " + FR(counts[1], 10) + " \\times " + FR(counts[1], 10) + " + " + FR(counts[2], 10) + " \\times " + FR(counts[2], 10) + " \\\\ &= " + FR(counts[0] * counts[0], 100) + " + " + FR(counts[1] * counts[1], 100) + " + " + FR(counts[2] * counts[2], 100) + " \\\\ &= " + FR(ans, 100) + " = " + ans + "\\% \\end{aligned} \\] Counting check: of the 100 ordered pairs, \\(" + counts[0] * counts[0] + " + " + counts[1] * counts[1] + " + " + counts[2] * counts[2] + " = " + ans + "\\) match in colour. So the probability is <b>" + ans + "%</b>.";
  return numq(prompt, ans, 0.01, sol, { mode: "same-colour", counts: counts.join("-") });
}, ["Same colour is not one event; list every colour that could match on both draws.", "For each colour, multiply its fraction by itself, then add the three results."]);

E("u7-apparent-height-ratio", 7, ["11.4"], 3, "gen", function () {
  var contexts = [
    { name: "quiz averages", labels: ["Class A", "Class B"], bases: [70, 80], scale: 1, cap: 100, unit: "points" },
    { name: "ferry passengers on two Saturdays (in hundreds)", labels: ["First Sat", "Second Sat"], bases: [300, 400], scale: 20, cap: 700, unit: "passengers" },
    { name: "pairs of shoes sold in two weeks", labels: ["Week 1", "Week 2"], bases: [40, 50], scale: 2, cap: 120, unit: "pairs" },
    { name: "laps swum by two teams", labels: ["Team Red", "Team Blue"], bases: [60, 80], scale: 2, cap: 160, unit: "laps" }
  ];
  var cfg = null;
  for (var t = 0; t < 80 && !cfg; t++) {
    var ctx = pick(contexts);
    var B = pick(ctx.bases);
    var a0 = pick([2, 4, 5, 10]);
    var r = pick([1.5, 2, 2.5, 3, 4]);
    var b0 = a0 * r;
    if (b0 !== Math.round(b0)) continue;
    var v1 = B + a0 * ctx.scale, v2 = B + b0 * ctx.scale;
    if (v2 > ctx.cap) continue;
    cfg = { ctx: ctx, B: B, a0: a0, r: r, v1: v1, v2: v2 };
  }
  if (!cfg) { var c0 = contexts[0]; cfg = { ctx: c0, B: 80, a0: 5, r: 3, v1: 85, v2: 95 }; }
  var top = cfg.v2 + 2 * cfg.ctx.scale;
  var prompt = "A poster graphs " + cfg.ctx.name + ". The vertical axis starts at " + cfg.B + " instead of 0. The values are " + cfg.v1 + " and " + cfg.v2 + " " + cfg.ctx.unit + ". Judging only by the heights of the bars in the graph, how many times as tall does the taller bar look compared with the shorter bar? Give your answer as a decimal.";
  var sol = "Bar heights are measured from the axis start, not from the values themselves: \\[ \\begin{aligned} \\text{shorter height} &= " + cfg.v1 + " - " + cfg.B + " = " + (cfg.v1 - cfg.B) + " \\\\ \\text{taller height} &= " + cfg.v2 + " - " + cfg.B + " = " + (cfg.v2 - cfg.B) + " \\\\ \\text{apparent ratio} &= " + FR(cfg.v2 - cfg.B, cfg.v1 - cfg.B) + " = " + fmt(cfg.r) + " \\end{aligned} \\] The actual values are nearly equal, but the taller bar looks <b>" + fmt(cfg.r) + " times</b> as tall.";
  var q = numq(prompt, cfg.r, 0.01, sol, { mode: "apparent-ratio", B: cfg.B, v1: cfg.v1, v2: cfg.v2 });
  q.figure = u7bars(cfg.ctx.labels, [cfg.v1, cfg.v2], cfg.B, top);
  return q;
}, ["Do not compare the printed values; compare the bar heights, which start at the axis value.", "Subtract the axis start from each value first, then divide the taller height by the shorter height."]);

E("u7-deep-critique", 7, ["11.6", "11.5"], 3, "var", varset([
  function(){
    return mcq("A juice stand advert uses a bar graph with its axis starting at 90. Sales were 94 glasses in January and 98 glasses in February, and the advert claims sales doubled in February. Which critique is fully correct?",
      {t:"The axis starting at 90 exaggerates the gap, and 98 is only slightly more than 94, so the doubled claim misrepresents the data", fb:"Right: both the format flaw and the false claim are named, and each is checked against the values."},
      [{t:"The axis starting at 90 is fine for this data, and the doubled claim is fair because the February bar looks twice as tall as the other", fb:"Bar looks are exactly the trap: heights measured from 90 do not match the values 94 and 98."},
       {t:"The doubled claim is wrong because sales fell in February from January, and the axis should start at 100 instead of at zero", fb:"Sales rose slightly from 94 to 98, and an axis should start at 0, not at 100."},
       {t:"The only problem is that the bars are different widths on the page, so the claim cannot be judged at all from the graph", fb:"No width problem is described; the axis start and the claim can both be judged from the values."}],
      "A full critique checks both the picture and the words: the <b>truncated axis</b> exaggerates, and <b>98 against 94 is a small rise, not a doubling</b>.",
      {mode:"deep-juice"});
  },
  function(){
    return mcq("A headline says most students want an earlier school start. Its 3-D circle graph shows 45% for earlier, 35% for the same time and 20% for later. Which critique is fully correct?",
      {t:"45% is the largest share but not a majority, and the 3-D effect can make the front slice look bigger than its share", fb:"Right: most needs over 50%, and the tilt adds a second distortion on top of the headline error."},
      [{t:"The headline is correct because 45% is the largest share, and the 3-D effect does not change any of the slice sizes", fb:"Largest is not the same as most, and a 3-D tilt does change how large slices appear."},
       {t:"The headline is wrong because later has the strongest support, and circle graphs cannot show percents in their slices", fb:"Earlier has the largest share at 45%, and circle graphs show percents properly when drawn flat."},
       {t:"The only problem is the order of the slices around the circle, since the percents add to 100 as they should", fb:"The percents do add to 100, but the headline claim and the 3-D distortion are the real problems."}],
      "A full critique checks both the claim and the format: <b>45% is not most</b>, and the <b>3-D effect</b> misrepresents the slice sizes.",
      {mode:"deep-headline"});
  },
  function(){
    return mcq("A poster claims recycling rose all term. Its line graph shows only weeks 5 to 8, when amounts rose. The class log shows amounts fell during weeks 1 to 4. Which critique is fully correct?",
      {t:"The graph cherry-picks the rising weeks and hides the falling weeks, so the all term claim goes against the full data", fb:"Right: the selected range supports the claim only by leaving out the weeks that contradict it."},
      [{t:"The claim is correct because the graph rises, and weeks 1 to 4 are too early to count at all", fb:"Weeks 1 to 4 are part of the term, and their fall contradicts the all term claim."},
       {t:"The only problem is the colour of the line on the graph, since the chosen weeks are all drawn accurately", fb:"The chosen weeks may be accurate, but omitting the falling weeks is the misrepresentation."},
       {t:"The claim fails because amounts in weeks 5 to 8 actually fell over the term, and a bar graph was required instead of a line graph", fb:"Amounts rose in weeks 5 to 8 as stated; no graph type is required, the missing weeks are the issue."}],
      "A full critique checks the claim against all the data: <b>showing only weeks 5 to 8</b> hides the fall in weeks 1 to 4, so the <b>all term claim is inconsistent</b> with the record.",
      {mode:"deep-recycling"});
  },
  function(){
    return mcq("A pet poster uses a pictograph where cat symbols are drawn much larger than bird symbols, one symbol standing for 10 pets in each row. Counts are 40 cats and 30 birds, and the poster claims cats are twice as popular as birds. Which critique is fully correct?",
      {t:"The larger cat symbols exaggerate the difference, and 40 against 30 is not twice as many, so the claim misrepresents the data", fb:"Right: the symbol sizes distort the picture, and the counts themselves refute the doubled claim."},
      [{t:"The claim is fair because the cat symbols on the poster look about twice the size of the bird symbols beside them in the rows", fb:"Symbol size is the distortion, not evidence; popularity must be judged from the counts 40 and 30."},
       {t:"The claim is wrong because birds are actually more popular than cats, and all pictographs are misleading in exactly this same way", fb:"Cats lead 40 to 30, so birds are not ahead, and a pictograph with equal symbols is fair."},
       {t:"The only problem is that one symbol stands for 10 pets in each row, which makes small counts of pets hard to show exactly in a row", fb:"Part symbols are a minor weakness here; unequal symbol sizes and the false claim are the real problems."}],
      "A full critique checks both the picture and the words: <b>unequal symbol sizes</b> exaggerate, and <b>40 is not twice 30</b>.",
      {mode:"deep-pets"});
  }
]), ["A complete critique checks two things: how the graph is built, and whether the words match the numbers.", "Test the claim with the actual values first, then name the format feature that pushes readers the same wrong way."]);
